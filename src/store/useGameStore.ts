import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createPhaseSlice, type PhaseSlice } from './slices/phaseSlice'
import { createAgentSlice, type AgentSlice } from './slices/agentSlice'
import { createResourceSlice, type ResourceSlice } from './slices/resourceSlice'
import { createEvidenceSlice, type EvidenceSlice } from './slices/evidenceSlice'
import { createDialogueSlice, type DialogueSlice } from './slices/dialogueSlice'
import { createVerdictSlice, type VerdictSlice } from './slices/verdictSlice'
import { createShopSlice, type ShopSlice } from './slices/shopSlice'
import type { CaseData, ProcessMetrics, PartyId } from '../types'
import type { TestimonyAnalysis } from '../engine/llmTestimonyAnalysis'
import { GamePhase } from '../types'
import { snapshotForSession, clearSessionSnapshot } from '../api/agentManager'

const EMPTY_METRICS: ProcessMetrics = {
  questionsAsked: 0, lieTransitions: 0, liesCollapsed: 0,
  evidenceDiscovered: 0, evidenceEffective: 0, skillsUsedEffective: 0,
  freeQuestionsRelevant: 0, togglesUsed: 0, bothSidesQuestioned: false, confidentialUsed: 0,
  // v2
  affinityHits: 0, affinityMisses: 0, requiredPathsCovered: 0, bonusPathsCovered: 0,
  deepTruthsUnlocked: 0, sameActionRepeats: 0, unsupportedCollapses: 0, immediateAnswerUsed: 0, trustActionsUsed: 0,
  interjectionAllowed: 0,
}

export type GameStore = PhaseSlice & AgentSlice & ResourceSlice & EvidenceSlice & DialogueSlice & VerdictSlice & ShopSlice & {
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

      // 사건 데이터 저장 + 분리심문 초기화
      set({ caseData, lieConfigs: { a: caseData.lieConfigA, b: caseData.lieConfigB }, separationTarget: null, separationTurns: 0, isLLMLoading: false, processMetrics: { ...EMPTY_METRICS }, testimonyAnalysis: null, calledWitnesses: [], interrogationHistory: { a: {}, b: {} }, pendingMinigame: null })

      // Phase 초기화
      store.setPhase(GamePhase.Phase0_CaseIntro)

      // 에이전트 초기화
      store.initializeAgents(
        caseData.lieConfigA,
        caseData.lieConfigB,
        caseData.duo.partyA.archetype,
        caseData.duo.partyB.archetype,
        'defensive',    // A 시작 감정
        'defensive',    // B 시작 감정 (A와 동일, 게임 진행에 따라 자연스럽게 변화)
      )

      // 리소스 초기화
      store.initResources()

      // 증거 초기화
      store.initEvidence(caseData.evidence, caseData.evidenceCombinations)

      // 대화 초기화
      store.clearDialogue()

      // 판결 초기화
      store.resetVerdict()
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
