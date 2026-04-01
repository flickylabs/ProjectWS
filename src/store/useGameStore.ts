import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createPhaseSlice, type PhaseSlice } from './slices/phaseSlice'
import { createAgentSlice, type AgentSlice } from './slices/agentSlice'
import { createResourceSlice, type ResourceSlice } from './slices/resourceSlice'
import { createEvidenceSlice, type EvidenceSlice } from './slices/evidenceSlice'
import { createDialogueSlice, type DialogueSlice } from './slices/dialogueSlice'
import { createVerdictSlice, type VerdictSlice } from './slices/verdictSlice'
import { createShopSlice, type ShopSlice } from './slices/shopSlice'
import { createDiscoverySlice, type DiscoverySlice } from './slices/discoverySlice'
import type { CaseData, ProcessMetrics, PartyId } from '../types'
import type { TestimonyAnalysis } from '../engine/llmTestimonyAnalysis'
import { GamePhase } from '../types'
import { snapshotForSession, clearSessionSnapshot } from '../api/agentManager'
import { registerSpouse01Data } from '../data/claimPolicies/spouse-01'
import { registerFamily01Data } from '../data/claimPolicies/family-01'
import { aggregateReadiness } from '../engine/readinessEngine'
import { resetTellTracker } from '../engine/tellValidator'
import { getReadinessSets } from '../engine/evidenceChallengeEngine'
import { createInitialMeterState, resolveQuestionEffect, getMeterEffects, type QuestionMeterState, type QuestionEffectResult } from '../engine/questionEffectEngine'
import { evaluateEventTriggers, resetEventTriggerState, type GameEventTrigger, type TurnSnapshot } from '../engine/gameEventTriggerEngine'
import { resetV3State } from '../engine/v3GameLoopLoader'
import type { QuestionType, EmotionTier, Stance } from '../types'

const EMPTY_METRICS: ProcessMetrics = {
  questionsAsked: 0, lieTransitions: 0, liesCollapsed: 0,
  evidenceDiscovered: 0, evidenceEffective: 0, skillsUsedEffective: 0,
  freeQuestionsRelevant: 0, togglesUsed: 0, bothSidesQuestioned: false, confidentialUsed: 0,
  // v2
  affinityHits: 0, affinityMisses: 0, requiredPathsCovered: 0, bonusPathsCovered: 0,
  deepTruthsUnlocked: 0, sameActionRepeats: 0, unsupportedCollapses: 0, immediateAnswerUsed: 0, trustActionsUsed: 0,
  interjectionAllowed: 0,
}

export type GameStore = PhaseSlice & AgentSlice & ResourceSlice & EvidenceSlice & DialogueSlice & VerdictSlice & ShopSlice & DiscoverySlice & {
  caseData: CaseData | null
  lieConfigs: { a: CaseData['lieConfigA']; b: CaseData['lieConfigB'] } | null
  isLLMLoading: boolean
  llmLoadingTarget: 'a' | 'b' | null
  setLLMLoading: (loading: boolean, target?: 'a' | 'b') => void
  separationTarget: 'a' | 'b' | null
  separationTurns: number
  startSeparation: (target: 'a' | 'b', turns: number) => void
  tickSeparation: () => void
  processMetrics: ProcessMetrics
  trackMetric: (key: keyof ProcessMetrics, delta?: number) => void
  testimonyAnalysis: TestimonyAnalysis | null
  setTestimonyAnalysis: (analysis: TestimonyAnalysis | null) => void
  calledWitnesses: string[]
  addCalledWitness: (witnessId: string) => void
  /** 미니게임 대기 (UI에서 모달 표시) */
  pendingMinigame:
    | { type: 'evidence_discovery'; evidenceId: string; clues: [string, string, string]; npcName: string; lieState: string; party: PartyId; minigameVariant: 'memory' | 'heartbeat' | 'matching' | 'word_scramble' }
    // TODO: 증거 깊이 해금 트리거 — EvidencePresenter.tsx handleInvestigate 3번째 조사 시 MatchingPuzzle 사용
    | { type: 'evidence_depth'; evidenceId: string; depth: number }
    // TODO: 거짓말 붕괴(S5) 트리거 — lieStateMachine에서 S5 전환 시 HeartbeatDetector 사용
    | { type: 'lie_collapse'; disputeId: string; party: PartyId }
    // TODO: 모순 감지 트리거 — contradictionEngine에서 모순 발견 시 WordScramble 사용
    | { type: 'contradiction'; text: string; disputeId: string; target: PartyId }
    | null
  setPendingMinigame: (mg: GameStore['pendingMinigame']) => void
  /** 끼어들기 대기 */
  pendingInterjection: { party: PartyId; disputeId: string; text: string; followUp: string } | null
  setPendingInterjection: (v: GameStore['pendingInterjection']) => void
  /** 심문 이력: party → disputeId → 질문 기록 */
  interrogationHistory: Record<string, Record<string, { questionTypes: string[]; turns: number[]; revealed: boolean }>>
  trackInterrogation: (party: 'a' | 'b', disputeId: string, questionType: string, turn: number) => void
  markRevealed: (party: 'a' | 'b', disputeId: string) => void
  getInterrogationContext: (party: 'a' | 'b', disputeId: string) => { firstTime: boolean; previousTypes: string[]; otherPartyAsked: boolean; otherPartyRevealed: boolean }
  initializeCase: (caseData: CaseData) => void
  clearSavedGame: () => void
  /** 리뉴얼: 성과 조건 상태 */
  readinessState: import('../types').ReadinessState | null
  updateReadiness: () => void
  /** V3: 질문 효과 미터 (파티별) */
  questionMeters: { a: QuestionMeterState; b: QuestionMeterState }
  applyQuestionEffect: (questionType: QuestionType, party: 'a' | 'b', disputeId: string, stance: Stance, emotionTier: EmotionTier) => QuestionEffectResult | null
  getQuestionMeterEffects: (party: 'a' | 'b') => { contradictionActive: boolean; leakWarning: boolean; leakCritical: boolean; trustWindowOpen: boolean }
  /** V3: 이벤트 로그 (UI 피드백용) */
  gameEventLog: GameEvent[]
  pushGameEvent: (event: GameEvent) => void
  /** V3: 턴 종료 시 이벤트 트리거 평가 */
  evaluateTurnEvents: (questionType: QuestionType, focusDisputeId: string, transitionsThisTurn: { party: 'a' | 'b'; disputeId: string; from: import('../types').LieState; to: import('../types').LieState }[]) => GameEventTrigger | null
  /** V3: 대기 중인 게임 이벤트 */
  pendingGameEvent: GameEventTrigger | null
  setPendingGameEvent: (event: GameEventTrigger | null) => void
  /** V3: 증거 결과 토스트 */
  pendingEvidenceResult: { type: 'hold' | 'crack' | 'collapse'; evidenceName: string } | null
  setPendingEvidenceResult: (r: GameStore['pendingEvidenceResult']) => void
  /** V3: DisputeBoard → ActionPanel 라우팅 */
  disputeBoardAction: { disputeId: string; party: 'a' | 'b' } | null
  setDisputeBoardAction: (a: GameStore['disputeBoardAction']) => void
}

export interface GameEvent {
  id: number
  turn: number
  type: 'question_effect' | 'state_transition' | 'event_trigger' | 'discovery'
  meter?: 'contradiction' | 'leak' | 'trust'
  message: string
  timestamp: number
}

const SAVE_KEY = 'solomon-game-save'

export const useGameStore = create<GameStore>()(persist((...args) => {
  const [set] = args

  return {
    ...createPhaseSlice(...args),
    ...createAgentSlice(...args),
    ...createResourceSlice(...args),
    ...createEvidenceSlice(...args),
    ...createDialogueSlice(...args),
    ...createVerdictSlice(...args),
    ...createShopSlice(...args),
    ...createDiscoverySlice(...args),

    caseData: null,
    lieConfigs: null,
    isLLMLoading: false,
    llmLoadingTarget: null,
    setLLMLoading: (loading: boolean, target?: 'a' | 'b') => set({ isLLMLoading: loading, llmLoadingTarget: loading ? (target ?? null) : null }),
    separationTarget: null,
    separationTurns: 0,
    startSeparation: (target, turns) => set({ separationTarget: target, separationTurns: turns }),
    processMetrics: { ...EMPTY_METRICS },
    testimonyAnalysis: null,
    setTestimonyAnalysis: (analysis) => set({ testimonyAnalysis: analysis }),
    calledWitnesses: [],
    addCalledWitness: (witnessId) => set((prev) => ({ calledWitnesses: [...prev.calledWitnesses, witnessId] })),
    pendingMinigame: null,
    setPendingMinigame: (mg) => set({ pendingMinigame: mg }),
    pendingInterjection: null,
    setPendingInterjection: (v) => set({ pendingInterjection: v }),

    interrogationHistory: { a: {}, b: {} },
    trackInterrogation: (party, disputeId, questionType, turn) => set((prev) => {
      const h = { ...prev.interrogationHistory }
      const ph = { ...h[party] }
      const entry = ph[disputeId] ?? { questionTypes: [], turns: [], revealed: false }
      ph[disputeId] = {
        ...entry,
        questionTypes: [...entry.questionTypes, questionType],
        turns: [...entry.turns, turn],
      }
      h[party] = ph
      return { interrogationHistory: h }
    }),
    markRevealed: (party, disputeId) => set((prev) => {
      const h = { ...prev.interrogationHistory }
      const ph = { ...h[party] }
      const entry = ph[disputeId] ?? { questionTypes: [], turns: [], revealed: false }
      ph[disputeId] = { ...entry, revealed: true }
      h[party] = ph
      return { interrogationHistory: h }
    }),
    getInterrogationContext: (party: 'a' | 'b', disputeId: string): { firstTime: boolean; previousTypes: string[]; otherPartyAsked: boolean; otherPartyRevealed: boolean } => {
      const h: Record<string, Record<string, { questionTypes: string[]; turns: number[]; revealed: boolean }>> = useGameStore.getState().interrogationHistory
      const myHistory: { questionTypes: string[]; turns: number[]; revealed: boolean } | undefined = h[party]?.[disputeId]
      const otherParty = party === 'a' ? 'b' : 'a'
      const otherHistory = h[otherParty]?.[disputeId]
      return {
        firstTime: !myHistory || myHistory.questionTypes.length === 0,
        previousTypes: myHistory?.questionTypes ?? [],
        otherPartyAsked: !!otherHistory && otherHistory.questionTypes.length > 0,
        otherPartyRevealed: !!otherHistory?.revealed,
      }
    },
    trackMetric: (key, delta = 1) => {
      set((prev) => {
        const m = { ...prev.processMetrics }
        if (typeof m[key] === 'boolean') { (m as any)[key] = true }
        else { (m as any)[key] = (m[key] as number) + delta }
        return { processMetrics: m }
      })
    },
    tickSeparation: () => {
      const s = useGameStore.getState()
      if (s.separationTurns <= 1) {
        set({ separationTarget: null, separationTurns: 0 })
      } else {
        set({ separationTurns: s.separationTurns - 1 })
      }
    },

    clearSavedGame: () => {
      sessionStorage.removeItem(SAVE_KEY)
      clearSessionSnapshot()
    },

    readinessState: null,
    questionMeters: { a: createInitialMeterState(), b: createInitialMeterState() },
    gameEventLog: [],

    applyQuestionEffect: (questionType, party, disputeId, stance, emotionTier) => {
      const state = useGameStore.getState()
      const lieState = state.getLieState(party, disputeId)
      if (!lieState) return null

      const meter = state.questionMeters[party]
      const { result, updatedMeter } = resolveQuestionEffect(
        questionType, party, disputeId, lieState, stance, emotionTier, meter,
      )

      // 미터 업데이트
      set({
        questionMeters: { ...state.questionMeters, [party]: updatedMeter },
      })

      // 효과 적용
      for (const effect of result.effects) {
        switch (effect.type) {
          case 'trust_boost':
            state.changeTrust(effect.party as 'a' | 'b', 'trustTowardJudge', effect.amount)
            break
          case 'emotion_shift':
            state.changeEmotion(effect.party as 'a' | 'b', effect.delta)
            break
          case 'lie_transition_bonus':
            // 보너스는 다음 전이 시 참조 (미터에 축적)
            break
        }
      }

      // 이벤트 로그 추가
      if (result.feedback) {
        const eventId = state.gameEventLog.length + 1
        set({
          gameEventLog: [...state.gameEventLog, {
            id: eventId,
            turn: state.turnCount,
            type: 'question_effect',
            meter: result.meter === 'none' ? undefined : result.meter,
            message: result.feedback,
            timestamp: Date.now(),
          }],
        })
      }

      return result
    },

    getQuestionMeterEffects: (party: 'a' | 'b'): { contradictionActive: boolean; leakWarning: boolean; leakCritical: boolean; trustWindowOpen: boolean } => {
      return getMeterEffects(useGameStore.getState().questionMeters[party])
    },

    pushGameEvent: (event: GameEvent) => {
      set((prev) => ({ gameEventLog: [...prev.gameEventLog, event] }))
    },

    pendingGameEvent: null,
    setPendingGameEvent: (event: GameEventTrigger | null) => set({ pendingGameEvent: event }),
    pendingEvidenceResult: null,
    setPendingEvidenceResult: (r: GameStore['pendingEvidenceResult']) => set({ pendingEvidenceResult: r }),
    disputeBoardAction: null,
    setDisputeBoardAction: (a: GameStore['disputeBoardAction']) => set({ disputeBoardAction: a }),

    evaluateTurnEvents: (questionType: QuestionType, focusDisputeId: string, transitionsThisTurn: { party: 'a' | 'b'; disputeId: string; from: import('../types').LieState; to: import('../types').LieState }[]) => {
      const s = useGameStore.getState()
      if (!s.caseData) return null

      const snapshot: TurnSnapshot = {
        caseId: s.caseData.caseId?.replace(/^case-/, '') ?? '',
        turn: s.turnCount,
        activeParty: s.separationTarget ?? 'a',
        questionType,
        lieStates: { a: s.agentA.lieStateMap, b: s.agentB.lieStateMap },
        emotions: {
          a: s.agentA.emotionalState,
          b: s.agentB.emotionalState,
        },
        trust: {
          a: { trustTowardJudge: s.agentA.trustState.trustTowardJudge },
          b: { trustTowardJudge: s.agentB.trustState.trustTowardJudge },
        },
        meters: s.questionMeters,
        disputeVisibility: Object.fromEntries(
          Object.entries(s.discovery.disputeVisibility).map(([id, entry]) => [id, (entry as any).visibility]),
        ),
        transitionsThisTurn,
        readiness: s.readinessState,
        focusDisputeId,
      }

      const trigger = evaluateEventTriggers(snapshot)
      if (trigger) {
        set({ pendingGameEvent: trigger })

        // 이벤트 로그에 기록
        const eventId = s.gameEventLog.length + 1
        set((prev) => ({
          gameEventLog: [...prev.gameEventLog, {
            id: eventId,
            turn: s.turnCount,
            type: 'event_trigger',
            message: `[${trigger.type}] ${trigger.description}`,
            timestamp: Date.now(),
          }],
        }))

        // 효과 자동 적용
        for (const effect of trigger.effects) {
          switch (effect.type) {
            case 'emotion_spike':
              s.changeEmotion(effect.party, effect.delta)
              break
            case 'trust_change':
              s.changeTrust(effect.party, 'trustTowardJudge', effect.delta)
              break
            case 'lie_advance':
              s.transitionLie(effect.party, effect.disputeId, `event_${trigger.type}`)
              break
            case 'reveal_dispute':
              s.emergeDispute(effect.disputeId, effect.via, s.turnCount, trigger.description)
              break
          }
        }
      }

      return trigger
    },

    updateReadiness: () => {
      const state = useGameStore.getState()
      const caseId = state.caseData?.caseId?.replace(/^case-/, '') ?? ''

      // 양측 lieStateMap 병합
      const allLieStates: Record<string, { currentState: import('../types').LieState }> = {}
      for (const [k, v] of Object.entries(state.agentA.lieStateMap)) allLieStates[`a:${k}`] = v as { currentState: import('../types').LieState }
      for (const [k, v] of Object.entries(state.agentB.lieStateMap)) allLieStates[`b:${k}`] = v as { currentState: import('../types').LieState }

      const { investigationSuccessEvidenceIds, fullCollapseEvidenceIds } = getReadinessSets(caseId)
      const hiddenReveals = (state as any).discoveredTruths?.length ?? 0

      const readiness = aggregateReadiness(
        allLieStates, investigationSuccessEvidenceIds, fullCollapseEvidenceIds, hiddenReveals,
      )
      set({ readinessState: readiness })
    },

    initializeCase: (caseData: CaseData) => {
      const store = useGameStore.getState()

      // 사건 데이터 최소 검증
      if (!caseData.disputes || caseData.disputes.length === 0) {
        console.error('[Solomon] 사건에 쟁점이 없습니다:', caseData.caseId)
      }
      if (!caseData.evidence) {
        caseData.evidence = []
      }
      if (!caseData.evidenceCombinations) {
        caseData.evidenceCombinations = []
      }

      // 프롬프트 스냅샷: 세션 시작 시 현재 블록 버전 고정
      snapshotForSession()

      // 이전 세션 데이터 완전 삭제
      sessionStorage.removeItem(SAVE_KEY)

      // 사건 데이터 저장 + 전체 초기화
      set({
        caseData,
        lieConfigs: { a: caseData.lieConfigA, b: caseData.lieConfigB },
        separationTarget: null, separationTurns: 0,
        isLLMLoading: false,
        processMetrics: { ...EMPTY_METRICS },
        testimonyAnalysis: null,
        calledWitnesses: [],
        interrogationHistory: { a: {}, b: {} },
        pendingMinigame: null,
        pendingInterjection: null,
        questionMeters: { a: createInitialMeterState(), b: createInitialMeterState() },
        gameEventLog: [],
        pendingGameEvent: null,
        // 턴/Phase 완전 초기화
        turnCount: 0,
        phaseTurnCount: 0,
        phaseHistory: [],
        currentPhase: GamePhase.Phase0_CaseIntro,
      })

      // 에이전트 초기화
      store.initializeAgents(
        caseData.lieConfigA,
        caseData.lieConfigB,
        caseData.duo.partyA.archetype,
        caseData.duo.partyB.archetype,
        'defensive',    // A 시작 감정
        'defensive',    // B 시작 감정 (A와 동일, 게임 진행에 따라 자연스럽게 변화)
      )

      // 리뉴얼 데이터 등록 (ClaimPolicy/Bridge/EvidenceChallenge/V3)
      resetTellTracker()
      resetEventTriggerState()
      const caseKey2 = caseData.caseId?.replace(/^case-/, '') ?? ''
      if (caseKey2) resetV3State(caseKey2)
      const caseKey = caseData.caseId?.replace(/^case-/, '') ?? ''
      if (caseKey === 'spouse-01') registerSpouse01Data()
      if (caseKey === 'family-01') registerFamily01Data()

      // 리소스 초기화
      store.initResources()

      // 증거 초기화
      store.initEvidence(caseData.evidence, caseData.evidenceCombinations)

      // 대화 초기화
      store.clearDialogue()

      // 판결 초기화
      store.resetVerdict()

      // 디스커버리 초기화
      store.initDiscovery(caseData)
    },
  }
}, {
  name: SAVE_KEY,
  storage: {
    getItem: (name) => {
      const str = sessionStorage.getItem(name)
      return str ? JSON.parse(str) : null
    },
    setItem: (name, value) => sessionStorage.setItem(name, JSON.stringify(value)),
    removeItem: (name) => sessionStorage.removeItem(name),
  },
  partialize: (state): any => ({
    // phase
    currentPhase: state.currentPhase,
    phaseHistory: state.phaseHistory,
    turnCount: state.turnCount,
    phaseTurnCount: state.phaseTurnCount,
    // agents
    agentA: state.agentA,
    agentB: state.agentB,
    archetypeA: state.archetypeA,
    archetypeB: state.archetypeB,
    lieConfigsA: state.lieConfigsA,
    lieConfigsB: state.lieConfigsB,
    // resources
    resources: state.resources,
    skillUseCounts: state.skillUseCounts,
    // evidence
    evidenceStates: state.evidenceStates,
    evidenceDefinitions: state.evidenceDefinitions,
    evidenceCombinations: state.evidenceCombinations,
    triggeredCombinations: state.triggeredCombinations,
    // dialogue
    dialogueLog: state.dialogueLog,
    claimGraph: state.claimGraph,
    nextDialogueId: state.nextDialogueId,
    // verdict
    verdictInput: state.verdictInput,
    verdictScore: state.verdictScore,
    // shop
    globalInvestTokens: state.globalInvestTokens,
    globalSkillPoints: state.globalSkillPoints,
    freeCap: state.freeCap,
    lastInvestRechargeAt: state.lastInvestRechargeAt,
    adWatchCountInvest: state.adWatchCountInvest,
    adWatchCountSkill: state.adWatchCountSkill,
    adResetDate: state.adResetDate,
    // main
    caseData: state.caseData,
    lieConfigs: state.lieConfigs,
    separationTarget: state.separationTarget,
    separationTurns: state.separationTurns,
    processMetrics: state.processMetrics,
    testimonyAnalysis: state.testimonyAnalysis,
    calledWitnesses: state.calledWitnesses,
    interrogationHistory: state.interrogationHistory,
  }),
}))
