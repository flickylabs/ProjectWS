// @ts-check-enabled — 타입 체크 활성화 (2026-04-14)
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createPhaseSlice, type PhaseSlice } from './slices/phaseSlice'
import { createAgentSlice, type AgentSlice } from './slices/agentSlice'
import { createResourceSlice, type ResourceSlice } from './slices/resourceSlice'
import { createEvidenceSlice, type EvidenceSlice } from './slices/evidenceSlice'
import { createDialogueSlice, type DialogueSlice } from './slices/dialogueSlice'
import { createVerdictSlice, type VerdictSlice } from './slices/verdictSlice'
import { createDiscoverySlice, type DiscoverySlice } from './slices/discoverySlice'
import { createCombinationLabSlice, type CombinationLabSlice } from './slices/combinationLabSlice'
import { createMinigameSlice, type MinigameSlice } from './slices/minigameSlice'
import type { CaseData, ProcessMetrics, PartyId } from '../types'
import type { TestimonyAnalysis } from '../engine/llmTestimonyAnalysis'
import { GamePhase } from '../types'
import { snapshotForSession, clearSessionSnapshot } from '../api/agentManager'
// ── V4 활성 사건 등록 ──
import { registerSpouse01Data } from '../data/claimPolicies/spouse-01'
import { registerFamily01Data } from '../data/claimPolicies/family-01'
import { registerFriend01Data } from '../data/claimPolicies/friend-01'
import { aggregateReadiness, resetEmergenceCount } from '../engine/readinessEngine'
import { normalizeCaseKey } from '../utils/caseHelpers'
import { resetTellTracker } from '../engine/tellValidator'
import { resetHintTracker } from '../engine/archetypeHintEngine'
import { getReadinessSets } from '../engine/evidenceChallengeEngine'
import { createInitialMeterState, resolveQuestionEffect, getMeterEffects, type QuestionMeterState, type QuestionEffectResult } from '../engine/questionEffectEngine'
import { loadJudgePerks } from '../data/leaderboard'
import { getPerkById } from '../engine/judgePerks'
import type { PerkId } from '../engine/judgePerks'
import { evaluateEventTriggers, resetEventTriggerState, type GameEventTrigger, type TurnSnapshot } from '../engine/gameEventTriggerEngine'
import { resetV3State } from '../engine/v3GameLoopLoader'
import { resetV2State } from '../engine/v2DataLoader'
import { resetSessionFatigueState } from '../engine/questionFatigueEngine'
import { resetSessionInterjectionTracker } from '../engine/interjectionV2'
import { resetPhase3Log } from '../engine/phase3LogCollector'
import { resetMisconceptionState } from '../engine/misconceptionEngine'
import { resetActivatedLinks } from '../engine/linkEdgeEngine'
import { resetQuestionRotation } from '../engine/judgeQuestionEngine'
import type { QuestionType, EmotionTier, Stance } from '../types'

const EMPTY_METRICS: ProcessMetrics = {
  questionsAsked: 0, lieTransitions: 0, liesCollapsed: 0,
  evidenceDiscovered: 0, evidenceEffective: 0, skillsUsedEffective: 0,
  freeQuestionsRelevant: 0, togglesUsed: 0, bothSidesQuestioned: false, confidentialUsed: 0,
  combinationDossierUnlocked: 0, counterQuestionUsed: 0, bothSidesS3Plus: false,
  // v2
  affinityHits: 0, affinityMisses: 0, requiredPathsCovered: 0, bonusPathsCovered: 0,
  deepTruthsUnlocked: 0, sameActionRepeats: 0, unsupportedCollapses: 0, immediateAnswerUsed: 0, trustActionsUsed: 0,
  interjectionAllowed: 0,
  // v3: 재판관 성향 추적
  effectiveFactCount: 0, effectiveEmpathyCount: 0,
  factQuestionsAsked: 0, motiveQuestionsAsked: 0, empathyQuestionsAsked: 0,
  collapseViaTrustOrEmpathy: 0,
}

/** 퍼크 효과를 게임 초기 상태에 반영 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function applyPerks(set: (partial: any) => void): void {
  const saved = loadJudgePerks()
  const perkIds = [saved.major, saved.minor].filter(Boolean) as PerkId[]
  if (perkIds.length === 0) return

  const state = useGameStore.getState()
  const perksState: GameStore['activePerks'] = {
    majorPerk: (saved.major as PerkId) ?? null,
    minorPerk: (saved.minor as PerkId) ?? null,
    freeSummaryRemaining: 0, evidencePreviewRemaining: 0, skillRefundRemaining: 0,
    burstWarningEnabled: false,
    penaltyBufferUsesRemaining: 0, firstTargetContradictionBonus: 0,
    relationBufferQuestionAvailable: 0, angleSwitchOpportunity: 0,
    legalityHintEnabled: false, interjectionLevelBoost: 0,
    compareLockerAvailable: 0, privateCheckAvailable: 0,
    precedentHintAvailable: 0, reorganizeDeclareAvailable: 0,
  }

  // 미터 수정 (contradiction, leak, trust)
  let meterA = { ...state.questionMeters.a }
  let meterB = { ...state.questionMeters.b }

  for (const pid of perkIds) {
    const perk = getPerkById(pid)
    if (!perk) continue
    const eff = perk.effect

    // 즉시 적용: 조사 토큰 → 로컬 리소스에 직접 반영
    if (eff.extraInvestTokens) {
      state.gain('investigationTokens', eff.extraInvestTokens)
    }
    // 미터 초기값 수정
    if (eff.firstTargetContradictionBonus) {
      perksState.firstTargetContradictionBonus = eff.firstTargetContradictionBonus
    }
    if (eff.startLeakBoost) {
      meterA.leakMeter += eff.startLeakBoost
      meterB.leakMeter += eff.startLeakBoost
    }
    if (eff.relationBufferQuestionAvailable) {
      perksState.relationBufferQuestionAvailable = eff.relationBufferQuestionAvailable
    }
    // 세션 플래그
    if (eff.freeSummaryCount) perksState.freeSummaryRemaining = eff.freeSummaryCount
    if (eff.evidencePreviewCount) perksState.evidencePreviewRemaining = eff.evidencePreviewCount
    if (eff.skillRefundCount) perksState.skillRefundRemaining = eff.skillRefundCount
    if (eff.burstWarningTurns) perksState.burstWarningEnabled = true
    if (eff.penaltyBufferUsesRemaining) perksState.penaltyBufferUsesRemaining = eff.penaltyBufferUsesRemaining
    if (eff.legalityHintEnabled) perksState.legalityHintEnabled = true
    if (eff.interjectionLevelBoost) perksState.interjectionLevelBoost = eff.interjectionLevelBoost
    if (eff.angleSwitchOpportunity) perksState.angleSwitchOpportunity = eff.angleSwitchOpportunity
    if (eff.compareLockerAvailable) perksState.compareLockerAvailable = eff.compareLockerAvailable
    if (eff.privateCheckAvailable) perksState.privateCheckAvailable = eff.privateCheckAvailable
    if (eff.precedentHintAvailable) perksState.precedentHintAvailable = eff.precedentHintAvailable
    if (eff.reorganizeDeclareAvailable) perksState.reorganizeDeclareAvailable = eff.reorganizeDeclareAvailable
  }

  set({
    questionMeters: { a: meterA, b: meterB },
    activePerks: perksState,
  })
}

export type GameStore = PhaseSlice & AgentSlice & ResourceSlice & EvidenceSlice & DialogueSlice & VerdictSlice & DiscoverySlice & CombinationLabSlice & MinigameSlice & {
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
  /** 소환 가능하도록 해금된 증인 ID 목록 (unlockedByDossier 게이팅 사용) */
  unlockedWitnessIds: string[]
  addUnlockedWitness: (witnessId: string) => void
  /** 증인 다층 증언 세션 상태 (witnessId → session) */
  witnessSessions: Record<string, { heardSlots: string[]; lastChoice: string | null; summonCount: number }>
  updateWitnessSession: (witnessId: string, slotId: string) => void
  /** 증인 주제 선택 대기 */
  pendingWitnessChoice: { witnessId: string; witnessName: string; slots: import('../types/witnessTestimony').TestimonySlot[]; isResummon: boolean } | null
  setPendingWitnessChoice: (choice: GameStore['pendingWitnessChoice']) => void
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
  /** V2 끼어들기 대기 — GameEventModal에서 allow/block 선택 */
  pendingInterjectionV2: import('../engine/interjectionV2').InterjectionOpportunityV2 | null
  setPendingInterjectionV2: (v: GameStore['pendingInterjectionV2']) => void
  /** 최근 사용된 atom ID (반복 방지, party별 최근 N개) */
  recentAtomIds: Record<string, string[]>
  trackUsedAtoms: (party: 'a' | 'b', atomIds: string[]) => void
  getRecentAtomIds: (party: 'a' | 'b') => string[]
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
  /** V2: Phase 3 feature flags — 스크립트 전환 롤아웃 제어 */
  phase3Flags: { useBeatSelectorV2: boolean; useQuestionFatigueV2: boolean }
  setPhase3Flags: (flags: Partial<GameStore['phase3Flags']>) => void
  /** V2: Phase 3→6 프롬프트 브릿지 캐시 */
  phase3PromptBridge: import('../engine/phase3LogCollector').Phase3PromptBridgeV2 | null
  setPhase3PromptBridge: (bridge: GameStore['phase3PromptBridge']) => void
  /** V2 하이브리드: LLM에 주입할 V2 엔진 판정 결과 (턴마다 갱신) */
  _v2Context: {
    layer: string
    issueRole: string
    angleTag: string
    responseIntent: string
    fatigueLevel: string
    npcReaction: string
    appliedStance: string
    effectMultiplier: number
    misconceptionState: string | null
  } | null
  /** V3: 질문 효과 미터 (파티별) */
  questionMeters: { a: QuestionMeterState; b: QuestionMeterState }
  applyQuestionEffect: (questionType: QuestionType, party: 'a' | 'b', disputeId: string, stance: Stance, emotionTier: EmotionTier, options?: import('../engine/questionEffectEngine').ResolveQuestionEffectOptions) => QuestionEffectResult | null
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
  /** 최근 집중한 쟁점 ID (심문/증거 제시 시 갱신) */
  lastFocusedDisputeId: string | null
  setLastFocusedDisputeId: (id: string | null) => void
  pcTargetParty: PartyId
  setPcTargetParty: (party: PartyId) => void
  pcSummaryUnlocked: boolean
  setPcSummaryUnlocked: (value: boolean) => void
  /** PC 증거 상세 뷰어: 열려있는 증거 ID */
  pendingEvidenceView: string | null
  setPendingEvidenceView: (id: string | null) => void
  /** 퍼크 시스템: 현재 세션에 적용된 퍼크 효과 */
  activePerks: {
    majorPerk: PerkId | null
    minorPerk: PerkId | null
    freeSummaryRemaining: number
    evidencePreviewRemaining: number
    skillRefundRemaining: number
    burstWarningEnabled: boolean
    penaltyBufferUsesRemaining: number
    firstTargetContradictionBonus: number
    relationBufferQuestionAvailable: number
    angleSwitchOpportunity: number
    legalityHintEnabled: boolean
    interjectionLevelBoost: number
    compareLockerAvailable: number
    privateCheckAvailable: number
    precedentHintAvailable: number
    reorganizeDeclareAvailable: number
  }
  /** 퍼크 선택 모달 대기 상태 */
  pendingPerkChoice: {
    type: 'penalty_buffer'
    evidenceId: string
    target: import('../types').PartyId
  } | {
    type: 'fatigue_extend'
    party: import('../types').PartyId
    disputeId: string
  } | null
  setPendingPerkChoice: (choice: GameStore['pendingPerkChoice']) => void
  /** 퍼크 사용 횟수 차감 */
  consumePerkUse: (key: 'penaltyBufferUsesRemaining' | 'relationBufferQuestionAvailable' | 'angleSwitchOpportunity' | 'compareLockerAvailable' | 'privateCheckAvailable' | 'precedentHintAvailable' | 'reorganizeDeclareAvailable') => void
  /** 상태 전이 후 전략 선택 모달 대기 */
  pendingTransitionChoice: {
    label: 'cracked' | 'cornered' | 'opening'
    party: import('../types').PartyId
    disputeId: string
    from: import('../types').LieState
    to: import('../types').LieState
  } | null
  setPendingTransitionChoice: (choice: GameStore['pendingTransitionChoice']) => void
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

/** Typed selector hook — use this in components instead of useGameStore() */
export const useStore = <T>(selector: (state: GameStore) => T): T => useGameStore(selector)

export const useGameStore: import('zustand').UseBoundStore<import('zustand').StoreApi<GameStore>> = create<GameStore>()(persist((...args) => {
  const [set] = args

  return {
    ...createPhaseSlice(...args),
    ...createAgentSlice(...args),
    ...createResourceSlice(...args),
    ...createEvidenceSlice(...args),
    ...createDialogueSlice(...args),
    ...createVerdictSlice(...args),
    ...createDiscoverySlice(...args),
    ...createCombinationLabSlice(...args),
    ...createMinigameSlice(...args),

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
    unlockedWitnessIds: [],
    addUnlockedWitness: (witnessId) => set((prev) => (
      prev.unlockedWitnessIds.includes(witnessId)
        ? prev
        : { unlockedWitnessIds: [...prev.unlockedWitnessIds, witnessId] }
    )),
    pendingWitnessChoice: null,
    setPendingWitnessChoice: (choice) => set({ pendingWitnessChoice: choice }),
    witnessSessions: {},
    updateWitnessSession: (witnessId, slotId) => set((prev) => {
      const existing = prev.witnessSessions[witnessId] ?? { heardSlots: [], lastChoice: null, summonCount: 0 }
      return {
        witnessSessions: {
          ...prev.witnessSessions,
          [witnessId]: {
            heardSlots: [...existing.heardSlots, slotId],
            lastChoice: slotId,
            summonCount: existing.summonCount + 1,
          },
        },
      }
    }),
    pendingMinigame: null,
    setPendingMinigame: (mg) => set({ pendingMinigame: mg }),
    pendingInterjectionV2: null,
    setPendingInterjectionV2: (v) => set({ pendingInterjectionV2: v }),

    recentAtomIds: { a: [], b: [] },
    trackUsedAtoms: (party, atomIds) => set((prev) => {
      const current = prev.recentAtomIds[party] ?? []
      // 최근 20개만 유지 (약 5턴 × 4 atoms)
      const updated = [...current, ...atomIds].slice(-20)
      return { recentAtomIds: { ...prev.recentAtomIds, [party]: updated } }
    }),
    getRecentAtomIds: (party): string[] => useGameStore.getState().recentAtomIds[party] ?? [],

    interrogationHistory: { a: {}, b: {} },
    trackInterrogation: (party: 'a' | 'b', disputeId: string, questionType: string, turn: number) => set((prev) => {
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
    markRevealed: (party: 'a' | 'b', disputeId: string) => set((prev) => {
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
    trackMetric: (key: keyof ProcessMetrics, delta = 1) => {
      set((prev) => {
        const m = { ...prev.processMetrics }
        if (typeof m[key] === 'boolean') { (m as Record<string, number | boolean>)[key] = true }
        else { (m as Record<string, number | boolean>)[key] = (m[key] as number) + delta }
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
    phase3Flags: { useBeatSelectorV2: true, useQuestionFatigueV2: true },
    setPhase3Flags: (flags: Partial<GameStore['phase3Flags']>) => set((s) => ({ phase3Flags: { ...s.phase3Flags, ...flags } })),
    phase3PromptBridge: null,
    setPhase3PromptBridge: (bridge: GameStore['phase3PromptBridge']) => set({ phase3PromptBridge: bridge }),
    _v2Context: null,
    questionMeters: { a: createInitialMeterState(), b: createInitialMeterState() },
    gameEventLog: [],

    applyQuestionEffect: (questionType: QuestionType, party: 'a' | 'b', disputeId: string, stance: Stance, emotionTier: EmotionTier, options?: import('../engine/questionEffectEngine').ResolveQuestionEffectOptions) => {
      const state = useGameStore.getState()
      const lieState = state.getLieState(party, disputeId)
      if (!lieState) return null

      const meter = state.questionMeters[party]
      const { result, updatedMeter } = resolveQuestionEffect(
        questionType, party, disputeId, lieState, stance, emotionTier, meter, options,
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

          // ── 신규 5종 효과 ──
          case 'timeline_lock': {
            // 사실 추궁: 부정 시점 고정
            // → 해당 당사자의 가장 최근 부정 발언을 즐겨찾기에 자동 등록
            // → 시스템 메시지는 알림용(autoPin 아님)
            const lockParty = effect.party as 'a' | 'b'
            const recentDialogue = [...state.dialogueLog]
              .reverse()
              .find((entry) => entry.speaker === lockParty
                && !entry.autoPin
                && (entry.relatedDisputes ?? []).includes(effect.disputeId))
            if (recentDialogue) {
              set((prev) => ({
                dialogueLog: prev.dialogueLog.map((entry) =>
                  entry.id === recentDialogue.id
                    ? { ...entry, autoPin: true, behaviorHint: entry.behaviorHint ?? '진술 시점 고정' }
                    : entry
                ),
              }))
            }
            state.addDialogue({
              speaker: 'system',
              text: '📌 [진술 시점 고정] — 이 부정은 향후 모순 추궁의 근거가 됩니다',
              relatedDisputes: [effect.disputeId],
              turn: state.turnCount,
            })
            break
          }
          case 'hidden_dispute_hook':
            // 동기 탐색: 숨겨진 쟁점 연결고리 → 이벤트 로그(토스트)
            set((prev) => ({
              gameEventLog: [...prev.gameEventLog, {
                id: prev.gameEventLog.length + 1,
                turn: prev.turnCount,
                type: 'question_effect' as const,
                message: '동기 탐색으로 숨겨진 연결고리를 발견했습니다 — 새로운 쟁점이 곧 드러날 수 있습니다',
                timestamp: Date.now(),
              }],
            }))
            state.addDialogue({
              speaker: 'system',
              text: '동기 탐색이 효과를 보이고 있습니다 — 아직 드러나지 않은 쟁점의 단서가 보입니다.',
              relatedDisputes: [effect.hintDisputeId],
              turn: state.turnCount,
            })
            break
          case 'blame_text_exposed':
            // 동기 탐색: 책임 회피 문구 노출 → 대화 로그에 시스템 노트
            state.addDialogue({
              speaker: 'system',
              text: '📋 책임 회피 문구가 기록되었습니다',
              relatedDisputes: [disputeId],
              turn: state.turnCount,
            })
            break
          case 'trust_window_open':
            // 공감: 비공개 자백 경로 개방 → 이벤트 로그(토스트)
            set((prev) => ({
              gameEventLog: [...prev.gameEventLog, {
                id: prev.gameEventLog.length + 1,
                turn: prev.turnCount,
                type: 'question_effect' as const,
                message: effect.privatePath
                  ? '💛 비공개 확인 경로가 열렸습니다 — 공감 접근으로 자백을 이끌어낼 수 있습니다'
                  : '💛 비공개 확인 경로가 열렸습니다',
                timestamp: Date.now(),
              }],
            }))
            break
          case 'counterattack_suppressed':
            // 공감: 반격 억제 → 이벤트 로그(토스트)
            set((prev) => ({
              gameEventLog: [...prev.gameEventLog, {
                id: prev.gameEventLog.length + 1,
                turn: prev.turnCount,
                type: 'question_effect' as const,
                message: `🛡 상대의 반격 의지가 ${effect.turns}턴간 약화됩니다`,
                timestamp: Date.now(),
              }],
            }))
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
    lastFocusedDisputeId: null,
    setLastFocusedDisputeId: (id: string | null) => set({ lastFocusedDisputeId: id }),
    pcTargetParty: 'a',
    setPcTargetParty: (party: PartyId) => set({ pcTargetParty: party }),
    pcSummaryUnlocked: false,
    setPcSummaryUnlocked: (value: boolean) => set({ pcSummaryUnlocked: value }),
    pendingEvidenceView: null,
    setPendingEvidenceView: (id: string | null) => set({ pendingEvidenceView: id }),
    activePerks: {
      majorPerk: null, minorPerk: null,
      freeSummaryRemaining: 0, evidencePreviewRemaining: 0, skillRefundRemaining: 0,
      burstWarningEnabled: false, penaltyBufferUsesRemaining: 0,
      firstTargetContradictionBonus: 0,
      relationBufferQuestionAvailable: 0, angleSwitchOpportunity: 0,
      legalityHintEnabled: false, interjectionLevelBoost: 0,
      compareLockerAvailable: 0, privateCheckAvailable: 0,
      precedentHintAvailable: 0, reorganizeDeclareAvailable: 0,
    },
    pendingPerkChoice: null,
    setPendingPerkChoice: (choice) => set({ pendingPerkChoice: choice }),
    consumePerkUse: (key) => set((prev) => ({
      activePerks: { ...prev.activePerks, [key]: Math.max(0, prev.activePerks[key] - 1) },
    })),
    pendingTransitionChoice: null,
    setPendingTransitionChoice: (choice) => set({ pendingTransitionChoice: choice }),

    evaluateTurnEvents: (questionType: QuestionType, focusDisputeId: string, transitionsThisTurn: { party: 'a' | 'b'; disputeId: string; from: import('../types').LieState; to: import('../types').LieState }[]) => {
      const s = useGameStore.getState()
      if (!s.caseData) return null

      const snapshot: TurnSnapshot = {
        caseId: normalizeCaseKey(s.caseData),
        turn: s.turnCount,
        activeParty: s.separationTarget ?? s.pcTargetParty ?? 'a',
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
        // dispute_emergence는 Discovery 경로(pendingEmergence + DisputeEmergenceModal)가 canonical
        // → pendingGameEvent를 설정하지 않고 effects만 적용
        if (trigger.type !== 'dispute_emergence') {
          set({ pendingGameEvent: trigger })
        }

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
      const caseId = normalizeCaseKey(state.caseData)

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
        unlockedWitnessIds: (caseData.duo.socialGraph ?? [])
          .filter((tp) => !tp.unlockedByDossier || tp.unlockedByDossier.length === 0)
          .map((tp) => tp.id),
        witnessSessions: {},
        pendingWitnessChoice: null,
        interrogationHistory: { a: {}, b: {} },
        recentAtomIds: { a: [], b: [] },
        pendingMinigame: null,
        questionMeters: { a: createInitialMeterState(), b: createInitialMeterState() },
        gameEventLog: [],
        pendingGameEvent: null,
        pendingPerkChoice: null,
        pendingTransitionChoice: null,
        lastFocusedDisputeId: null,
        pcTargetParty: 'a',
        pcSummaryUnlocked: false,
        pendingEvidenceView: null,
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

      // 핵심 상태 초기화 — 리뉴얼 등록보다 먼저 실행 (등록 실패 시에도 게임 가능)
      store.initResources()
      store.initEvidence(caseData.evidence, caseData.evidenceCombinations, caseData.baseEvidenceIds)
      store.clearDialogue()
      store.resetVerdict()

      // 퍼크 적용
      applyPerks(set)
      store.initDiscovery(caseData)
      store.initCombinationLab(caseData)
      console.log('[initializeCase] combinationLab config:', store.combinationLabRuntime.config ? `${store.combinationLabRuntime.config.nodes.length} nodes` : 'NULL', 'discoveredNodeIds:', store.combinationLabRuntime.discoveredNodeIds.length)

      // 리뉴얼 데이터 등록 (ClaimPolicy/Bridge/EvidenceChallenge/V3)
      // try-catch로 감싸서 등록 실패가 게임 진행을 막지 않도록 함
      try {
      resetTellTracker()
      resetHintTracker()
      resetEventTriggerState()
      resetEmergenceCount()
      const caseKey2 = normalizeCaseKey(caseData)
      if (caseKey2) {
        resetV3State(caseKey2)
        resetV2State(caseKey2)
      }
      resetSessionFatigueState()
      resetSessionInterjectionTracker()
      resetPhase3Log()
      resetMisconceptionState()
      resetActivatedLinks()
      resetQuestionRotation()
      set({ phase3PromptBridge: null })
      const caseKey = normalizeCaseKey(caseData)
      // V4 활성 사건
      if (caseKey === 'spouse-01') registerSpouse01Data()
      if (caseKey === 'family-01') registerFamily01Data()
      if (caseKey === 'friend-01') registerFriend01Data()
      } catch (err) {
        console.error('[Solomon] 리뉴얼 데이터 등록 실패 (게임은 계속 진행 가능):', err)
      }
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
    combinationLabRuntime: state.combinationLabRuntime,
    // dialogue
    dialogueLog: state.dialogueLog,
    claimGraph: state.claimGraph,
    nextDialogueId: state.nextDialogueId,
    // verdict
    verdictInput: state.verdictInput,
    verdictScore: state.verdictScore,
    // main
    caseData: state.caseData,
    lieConfigs: state.lieConfigs,
    separationTarget: state.separationTarget,
    separationTurns: state.separationTurns,
    processMetrics: state.processMetrics,
    testimonyAnalysis: state.testimonyAnalysis,
    calledWitnesses: state.calledWitnesses,
    unlockedWitnessIds: state.unlockedWitnessIds,
    interrogationHistory: state.interrogationHistory,
    pcTargetParty: state.pcTargetParty,
    pcSummaryUnlocked: state.pcSummaryUnlocked,
  }),
}))
