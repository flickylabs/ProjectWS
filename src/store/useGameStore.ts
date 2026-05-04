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
import { createCharacterTagSlice, type CharacterTagSlice } from './slices/characterTagSlice'
import { createEventFeedbackSlice, type EventFeedbackSlice, type EventFeedbackCourtBeat } from './slices/eventFeedbackSlice'
import { createJudgeObservationSlice, type JudgeObservationSlice } from './slices/judgeObservationSlice'
import { createJudgeNotebookSlice, type JudgeNotebookSlice } from './slices/judgeNotebookSlice'
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
import { evaluateEventTriggers, markInterjectionUsed, resetEventTriggerState, type GameEventTrigger, type TurnSnapshot } from '../engine/gameEventTriggerEngine'
import { resetV3State } from '../engine/v3GameLoopLoader'
import { resetV2State } from '../engine/v2DataLoader'
import { resetSessionFatigueState } from '../engine/questionFatigueEngine'
import { resetPhase3Log } from '../engine/phase3LogCollector'
import { resetMisconceptionState } from '../engine/misconceptionEngine'
import { resetActivatedLinks } from '../engine/linkEdgeEngine'
import { resetQuestionRotation } from '../engine/judgeQuestionEngine'
import { resetVfxHierarchyState } from '../engine/vfxHierarchyEngine'
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

const ENABLE_AUTOMATIC_CRITICAL_LEAK = false

function ensureQuestionMeterState(meter?: Partial<QuestionMeterState>): QuestionMeterState {
  return {
    contradictionTokens: meter?.contradictionTokens ?? 0,
    contradictionTokensByDispute: meter?.contradictionTokensByDispute ?? {},
    leakMeter: meter?.leakMeter ?? 0,
    trustWindow: meter?.trustWindow ?? 0,
    lastQuestionType: meter?.lastQuestionType ?? null,
    consecutiveSameType: meter?.consecutiveSameType ?? 0,
  }
}

const SPOUSE01_COMBINE2_OUTPUT_ID = 'dc-6'
const SPOUSE01_COMBINE2_LABEL = 'dc-6 가족 쪽 정황'
const SPOUSE01_COMBINE2_DISCOVERY_TEXT = '영수증 묶음 속 중학교 참고서와 문자에 섞인 학교 알림이 가족 쪽 정황으로 맞물린다.'
const SPOUSE01_COMBINE2_SUMMARY = '영수증의 참고서와 문자 속 학교 알림을 함께 보며 가족 쪽 정황을 분리하는 카드'
const SPOUSE01_COMBINE2_NOTE = '가족 쪽 정황'
const SPOUSE01_COMBINE2_JUDGE_HINT = '문자와 구매 품목이 같은 가족 쪽 정황을 가리킵니다. 누구와 관련된 일인지와 왜 숨겼는지를 따로 확인해야 합니다.'
const SPOUSE01_STALE_COMBINE2_JUDGE_LINE = '오피스텔의 사람을 짚어야겠습니다'

function spouse01Combine2Node() {
  return {
    id: SPOUSE01_COMBINE2_OUTPUT_ID,
    type: 'derived_note',
    label: SPOUSE01_COMBINE2_LABEL,
    linkedDisputeIds: ['d-1', 'd-2'],
    linkedEvidenceIds: ['e-1', 'e-4'],
    visibility: 'derived',
  }
}

function spouse01Combine2Output() {
  return {
    id: SPOUSE01_COMBINE2_OUTPUT_ID,
    label: SPOUSE01_COMBINE2_LABEL,
    summary: SPOUSE01_COMBINE2_SUMMARY,
    nodeType: 'derived_note',
    noteText: SPOUSE01_COMBINE2_NOTE,
    effects: [
      {
        kind: 'unlock_note',
        unlockNodeId: SPOUSE01_COMBINE2_OUTPUT_ID,
      },
      {
        kind: 'upgrade_evidence',
        evidenceUpgrade: {
          evidenceId: 'e-4',
          toReliability: 'hard',
        },
      },
    ],
    judgeHint: SPOUSE01_COMBINE2_JUDGE_HINT,
  }
}

function dedupeStrings(values: unknown): string[] {
  return Array.from(new Set(Array.isArray(values) ? values.filter((value): value is string => typeof value === 'string') : []))
}

function patchSpouse01CombinationConfig(config: any): any {
  if (!config || !Array.isArray(config.nodes) || !Array.isArray(config.outputs) || !Array.isArray(config.recipes)) {
    return config
  }

  let hasDc6Node = false
  const nodes = config.nodes.map((node: any) => {
    if (node?.id === 'dc-1') {
      return {
        ...node,
        linkedDisputeIds: ['d-1'],
        linkedEvidenceIds: ['e-1', 'e-2'],
      }
    }
    if (node?.id === SPOUSE01_COMBINE2_OUTPUT_ID) {
      hasDc6Node = true
      return { ...node, ...spouse01Combine2Node() }
    }
    return node
  })
  if (!hasDc6Node) {
    nodes.push(spouse01Combine2Node())
  }

  let hasDc6Output = false
  const outputs = config.outputs.map((output: any) => {
    if (output?.id === SPOUSE01_COMBINE2_OUTPUT_ID) {
      hasDc6Output = true
      return { ...output, ...spouse01Combine2Output() }
    }
    return output
  })
  if (!hasDc6Output) {
    outputs.push(spouse01Combine2Output())
  }

  const recipes = config.recipes.map((recipe: any) => (
    recipe?.id === 'combine-2'
      ? {
          ...recipe,
          inputs: ['e-1', 'e-4'],
          discoveryText: SPOUSE01_COMBINE2_DISCOVERY_TEXT,
          outputId: SPOUSE01_COMBINE2_OUTPUT_ID,
          resultType: recipe.resultType ?? 'dossier',
        }
      : recipe
  ))

  return { ...config, nodes, outputs, recipes }
}

function patchSpouse01CombinationRuntime(runtime: any): any {
  if (!runtime) return runtime

  const appliedRecipeIds = dedupeStrings(runtime.appliedRecipeIds)
  const combine2Applied = appliedRecipeIds.includes('combine-2')
  const discoveredNodeIds = dedupeStrings(runtime.discoveredNodeIds)
  const nextDiscoveredNodeIds = combine2Applied && !discoveredNodeIds.includes(SPOUSE01_COMBINE2_OUTPUT_ID)
    ? [...discoveredNodeIds, SPOUSE01_COMBINE2_OUTPUT_ID]
    : discoveredNodeIds
  const history = Array.isArray(runtime.history)
    ? runtime.history.map((entry: any) => (
        entry?.recipeId === 'combine-2' && entry.outputId === 'dc-1'
          ? { ...entry, outputId: SPOUSE01_COMBINE2_OUTPUT_ID, summary: SPOUSE01_COMBINE2_SUMMARY }
          : entry
      ))
    : []

  return {
    ...runtime,
    config: patchSpouse01CombinationConfig(runtime.config),
    appliedRecipeIds,
    discoveredNodeIds: nextDiscoveredNodeIds,
    unlockedNotes: combine2Applied
      ? { ...(runtime.unlockedNotes ?? {}), [SPOUSE01_COMBINE2_OUTPUT_ID]: SPOUSE01_COMBINE2_NOTE }
      : (runtime.unlockedNotes ?? {}),
    history,
  }
}

function patchSpouse01CombinationDialogue(dialogueLog: any): any {
  if (!Array.isArray(dialogueLog)) return dialogueLog
  return dialogueLog
    .filter((entry: any) => !(
      entry?.speaker === 'judge' &&
      typeof entry.text === 'string' &&
      entry.text.includes(SPOUSE01_STALE_COMBINE2_JUDGE_LINE)
    ))
    .map((entry: any) => {
      if (
        typeof entry?.text === 'string' &&
        entry.text.includes('조합 결과: 오피스텔의 사람들') &&
        entry.text.includes('중학교 참고서') &&
        entry.text.includes('학교 알림')
      ) {
        return {
          ...entry,
          text: `조합 결과: ${SPOUSE01_COMBINE2_NOTE}\n${SPOUSE01_COMBINE2_DISCOVERY_TEXT}`,
        }
      }
      return entry
    })
}

function patchSpouse01JudgeObservations(judgeObservations: any): any {
  if (!Array.isArray(judgeObservations)) return judgeObservations
  return judgeObservations
    .filter((entry: any) => !(
      typeof entry?.summary === 'string' &&
      entry.summary.includes(SPOUSE01_STALE_COMBINE2_JUDGE_LINE)
    ))
    .map((entry: any) => {
      if (typeof entry?.summary === 'string' && entry.summary.includes('가족 쪽 돌봄 정황')) {
        return {
          ...entry,
          summary: entry.summary.replaceAll('가족 쪽 돌봄 정황', '가족 쪽 정황'),
        }
      }
      return entry
    })
}

function patchSpouse01PersistedCombinationState(state: GameStore): GameStore {
  if (normalizeCaseKey(state.caseData?.caseId ?? '') !== 'spouse-01') {
    return state
  }

  return {
    ...state,
    caseData: state.caseData
      ? {
          ...state.caseData,
          combinationLab: patchSpouse01CombinationConfig(state.caseData.combinationLab),
        }
      : state.caseData,
    combinationLabRuntime: patchSpouse01CombinationRuntime((state as any).combinationLabRuntime),
    dialogueLog: patchSpouse01CombinationDialogue((state as any).dialogueLog),
    judgeObservations: patchSpouse01JudgeObservations((state as any).judgeObservations),
  }
}

function buildCriticalLeakSlipText(caseId: string | undefined, party: PartyId, disputeId: string, partyName: string): string {
  const normalizedCaseId = normalizeCaseKey(caseId ?? '')
  if (normalizedCaseId === 'spouse-01' && party === 'b' && disputeId === 'd-1') {
    return '형이 집을 비우는 시간이 길어서 조카 혼자 있는 날이 많았습니다. 제가 아니면... 누가 합니까.'
  }
  return `${partyName} 쪽에서 숨기던 핵심이 말실수로 새어 나왔습니다.`
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

export type GameStore = PhaseSlice & AgentSlice & ResourceSlice & EvidenceSlice & DialogueSlice & VerdictSlice & DiscoverySlice & CombinationLabSlice & MinigameSlice & CharacterTagSlice & EventFeedbackSlice & JudgeObservationSlice & JudgeNotebookSlice & {
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
  pendingWitnessChoice: { witnessId: string; witnessName: string; slots: import('../types/witnessTestimony').TestimonySlot[]; allSlots?: import('../types/witnessTestimony').TestimonySlot[]; isResummon: boolean } | null
  setPendingWitnessChoice: (choice: GameStore['pendingWitnessChoice']) => void
  /** Deprecated: kept only so old saved sessions can be loaded. Runtime no longer opens minigames. */
  pendingMinigame:
    | { type: 'evidence_discovery'; evidenceId: string; clues: [string, string, string]; npcName: string; lieState: string; party: PartyId; minigameVariant: 'memory' | 'heartbeat' | 'matching' | 'word_scramble' }
    // Deprecated legacy payloads
    | { type: 'evidence_depth'; evidenceId: string; depth: number }
    | { type: 'lie_collapse'; disputeId: string; party: PartyId }
    | { type: 'contradiction'; text: string; disputeId: string; target: PartyId }
    | null
  setPendingMinigame: (mg: GameStore['pendingMinigame']) => void
  /** [TC-B1] 최근 사용된 atom ID — party × disputeId 별 분리. 같은 쟁점 내에서만 회피 페널티 적용 */
  recentAtomIds: Record<'a' | 'b', Record<string, string[]>>
  trackUsedAtoms: (party: 'a' | 'b', disputeId: string, atomIds: string[]) => void
  getRecentAtomIds: (party: 'a' | 'b', disputeId: string) => string[]
  /** [감정 과부하 lockout] 셧다운 진입 시 차단 만료 turn 번호. 0 = no lockout. turnCount < lockoutUntil 인 동안 질문 차단 */
  emotionalLockoutUntil: Record<'a' | 'b', number>
  setEmotionalLockout: (party: 'a' | 'b', untilTurn: number) => void
  /** [Phase C-4] 자백 dispatch 추적 — party × disputeId. 자백 1회 제한 + 재진술 분기용 */
  confessionDispatched: Record<'a' | 'b', Record<string, boolean>>
  markConfessionDispatched: (party: 'a' | 'b', disputeId: string) => void
  /** [Phase C-3] 체념 진입 시 자백 모달 1회 트리거 — 이미 트리거된 (party, disputeId)는 다시 띄우지 않음 */
  confessionModalShown: Record<'a' | 'b', Record<string, boolean>>
  markConfessionModalShown: (party: 'a' | 'b', disputeId: string) => void
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
  pendingEvidenceResult: { type: 'hold' | 'crack' | 'collapse'; evidenceName: string; evidenceId?: string; courtBeat?: EventFeedbackCourtBeat } | null
  setPendingEvidenceResult: (r: GameStore['pendingEvidenceResult']) => void
  /** V3: DisputeBoard → ActionPanel 라우팅 */
  disputeBoardAction: { disputeId: string; party: 'a' | 'b' } | null
  setDisputeBoardAction: (a: GameStore['disputeBoardAction']) => void
  /** 최근 집중한 쟁점 ID (심문/증거 제시 시 갱신) */
  lastFocusedDisputeId: string | null
  setLastFocusedDisputeId: (id: string | null) => void
  /** 가장 최근 emerge된 쟁점 ID + 시각 — UI 깜빡 강조용. setRecentlyEmergedDispute 호출 후 일정 시간 후 자동 해제 */
  recentlyEmergedDisputeId: string | null
  recentlyEmergedAt: number | null
  setRecentlyEmergedDispute: (id: string | null) => void
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
    ...createCharacterTagSlice(...args),
    ...createEventFeedbackSlice(...args),
    ...createJudgeObservationSlice(...args),
    ...createJudgeNotebookSlice(...args),

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
    setPendingMinigame: () => set({ pendingMinigame: null }),

    recentAtomIds: { a: {}, b: {} },
    trackUsedAtoms: (party, disputeId, atomIds) => set((prev) => {
      // 기존 localStorage에 배열로 저장된 경우 object로 migration
      const rawPartyMap = prev.recentAtomIds[party]
      const partyMap = rawPartyMap && !Array.isArray(rawPartyMap) ? rawPartyMap : {}
      const current = Array.isArray(partyMap[disputeId]) ? partyMap[disputeId] : []
      // 쟁점별 최근 12개만 유지 (같은 쟁점 반복 추궁 시 3~4턴치)
      const updated = [...current, ...atomIds].slice(-12)
      return {
        recentAtomIds: {
          ...prev.recentAtomIds,
          [party]: { ...partyMap, [disputeId]: updated },
        },
      }
    }),
    getRecentAtomIds: (party, disputeId): string[] => {
      const partyMap = useGameStore.getState().recentAtomIds[party]
      if (!partyMap || Array.isArray(partyMap)) return []
      const list = partyMap[disputeId]
      return Array.isArray(list) ? list : []
    },

    emotionalLockoutUntil: { a: 0, b: 0 },
    setEmotionalLockout: (party, untilTurn) => set((prev) => ({
      emotionalLockoutUntil: { ...prev.emotionalLockoutUntil, [party]: untilTurn },
    })),

    confessionDispatched: { a: {}, b: {} },
    markConfessionDispatched: (party, disputeId) => set((prev) => ({
      confessionDispatched: {
        ...prev.confessionDispatched,
        [party]: { ...prev.confessionDispatched[party], [disputeId]: true },
      },
    })),

    confessionModalShown: { a: {}, b: {} },
    markConfessionModalShown: (party, disputeId) => set((prev) => ({
      confessionModalShown: {
        ...prev.confessionModalShown,
        [party]: { ...prev.confessionModalShown[party], [disputeId]: true },
      },
    })),

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
      const previousLeakMeter = meter.leakMeter
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
            // → 독립 시스템 메시지는 제거 (말풍선 외부 핀 메모로 통합)
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
            break
          }
          case 'suppression_leak': {
            const effectParty = effect.party as 'a' | 'b'
            const partyData = effectParty === 'a' ? state.caseData?.duo.partyA : state.caseData?.duo.partyB
            state.addJudgeObservation({
              turnCount: state.turnCount,
              category: 'slip',
              iconId: 'i-scale',
              title: '숨기던 말이 새고 있습니다.',
              summary: `${partyData?.name ?? '당사자'} · 누설 ${updatedMeter.leakMeter}%`,
              party: effectParty,
              disputeId,
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
            {
              const effectParty = effect.party as 'a' | 'b'
              const latest = useGameStore.getState()
              const partyData = effectParty === 'a' ? latest.caseData?.duo.partyA : latest.caseData?.duo.partyB
              const dispute = latest.caseData?.disputes.find((d) => d.id === effect.hintDisputeId)
              const alreadyRecorded = latest.notebookEntries.some((entry) =>
                entry.category === 'dispute_probe' &&
                entry.party === effectParty &&
                entry.disputeId === effect.hintDisputeId,
              )
              if (!alreadyRecorded) {
                const linkedDialogue = [...latest.dialogueLog].reverse().find((entry) =>
                  entry.turn === latest.turnCount &&
                  (entry.speaker === effectParty || entry.speaker === 'judge') &&
                  (entry.relatedDisputes ?? []).includes(effect.hintDisputeId),
                )
                const partyName = partyData?.name ?? '당사자'
                const disputeName = dispute?.name ?? effect.hintDisputeId
                latest.addNotebookEntry?.({
                  turnCount: latest.turnCount,
                  category: 'dispute_probe',
                  iconId: 'i-eye',
                  title: `쟁점 파악 - ${disputeName}`,
                  summary: `${partyName}의 답변에서 "${disputeName}" 쟁점과 이어질 수 있는 연결고리를 확인했습니다. 아직 결론은 아니며, 증거·증언으로 검증해야 합니다.`,
                  party: effectParty,
                  disputeId: effect.hintDisputeId,
                  linkedDialogueId: linkedDialogue?.id,
                })
              }
            }
            state.addJudgeObservation({
              turnCount: state.turnCount,
              category: 'state',
              iconId: 'i-scale',
              title: '숨겨진 연결고리가 보입니다.',
              summary: '동기 탐색 결과 · 쟁점으로 이어질 수 있는 단서',
              party,
              disputeId: effect.hintDisputeId,
            })
            break
          case 'blame_text_exposed':
            // 동기 탐색: 책임 회피 문구 노출 → 관찰 패널에 낮은 강도로 기록
            state.addJudgeObservation({
              turnCount: state.turnCount,
              category: 'state',
              iconId: 'i-scale',
              title: '책임을 돌리는 말투가 반복됩니다.',
              summary: effect.exposedText,
              party,
              disputeId,
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
                  ? '비공개 확인 경로가 열렸습니다 — 공감 접근으로 자백을 이끌어낼 수 있습니다'
                  : '비공개 확인 경로가 열렸습니다',
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
                message: `상대의 반격 의지가 ${effect.turns}턴간 약화됩니다`,
                timestamp: Date.now(),
              }],
            }))
            break
        }
      }

      if (ENABLE_AUTOMATIC_CRITICAL_LEAK && questionType === 'motive_search' && previousLeakMeter < 100 && updatedMeter.leakMeter >= 100) {
        const partyData = party === 'a' ? state.caseData?.duo.partyA : state.caseData?.duo.partyB
        const dispute = state.caseData?.disputes.find((d) => d.id === disputeId)
        const partyName = partyData?.name ?? '당사자'
        const slipText = buildCriticalLeakSlipText(state.caseData?.caseId, party, disputeId, partyName)
        state.setPendingSlip({
          party,
          sourceDisputeId: disputeId,
          linkedDisputeId: null,
          slipText,
          turn: state.turnCount,
          trigger: 'leak_critical',
          forceConfessionOnReflect: true,
        })
        state.addJudgeObservation({
          turnCount: state.turnCount,
          category: 'slip',
          iconId: 'i-heart',
          title: '말실수가 나왔습니다.',
          summary: `${partyName} · 누설 100% · ${dispute?.name ?? disputeId}`,
          party,
          disputeId,
        })
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
    recentlyEmergedDisputeId: null,
    recentlyEmergedAt: null,
    setRecentlyEmergedDispute: (id: string | null) => set({
      recentlyEmergedDisputeId: id,
      recentlyEmergedAt: id ? Date.now() : null,
    }),
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

    evaluateTurnEvents: (questionType: QuestionType, focusDisputeId: string, transitionsThisTurn: { party: 'a' | 'b'; disputeId: string; from: import('../types').LieState; to: import('../types').LieState }[], actionTarget?: 'a' | 'b') => {
      const s = useGameStore.getState()
      if (!s.caseData) return null

      // [B3 픽스] activeParty 결정 우선순위:
      //   1) 분리심문 중이면 separationTarget (강제)
      //   2) 이번 액션의 실제 target (호출자가 명시한 경우 — 추궁/질문 대상자)
      //   3) UI 탭의 pcTargetParty (폴백)
      const snapshot: TurnSnapshot = {
        caseId: normalizeCaseKey(s.caseData),
        turn: s.turnCount,
        activeParty: s.separationTarget ?? actionTarget ?? s.pcTargetParty ?? 'a',
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

      let trigger = evaluateEventTriggers(snapshot)
      // 끼어들기 차단 조건:
      //   - 분리심문 중 (상대 파티 관찰/반응 완전 봉쇄)
      //   - 감정 과부하 (shutdown tier, emotion ≥ 85) — 본인 또는 상대가 해당되면 끼어들 상황 아님
      if (trigger && trigger.type === 'interjection') {
        const aShutdown = s.agentA.emotionalState.internalValue >= 85
        const bShutdown = s.agentB.emotionalState.internalValue >= 85
        if (s.separationTarget || aShutdown || bShutdown) {
          trigger = null
        }
      }
      if (trigger) {
        // dispute_emergence는 Discovery 경로(pendingEmergence + DisputeEmergenceModal)가 canonical
        // → pendingGameEvent를 설정하지 않고 effects만 적용
        if (trigger.type !== 'dispute_emergence') {
          set({ pendingGameEvent: trigger })
        }

        // 끼어들기는 동일 대사 반복 방지를 위해 사용 기록
        if (trigger.type === 'interjection' && trigger.scriptSlot?.textId) {
          markInterjectionUsed(snapshot.caseId, trigger.scriptSlot.textId)
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
      const hiddenReveals = Object.values(state.discovery?.disputeVisibility ?? {})
        .filter((entry: any) => entry.visibility === 'emerged' || entry.emergedAtTurn !== null)
        .length

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
        recentAtomIds: { a: {}, b: {} },
        emotionalLockoutUntil: { a: 0, b: 0 },
        confessionDispatched: { a: {}, b: {} },
        confessionModalShown: { a: {}, b: {} },
        pendingMinigame: null,
        questionMeters: { a: createInitialMeterState(), b: createInitialMeterState() },
        gameEventLog: [],
        pendingGameEvent: null,
        pendingEvidenceResult: null,
        disputeBoardAction: null,
        pendingPerkChoice: null,
        pendingTransitionChoice: null,
        feedbackQueue: [],
        activeFeedback: null,
        minorStream: [],
        judgeObservations: [],
        observationHistoryOpen: false,
        pendingResonances: [],
        pendingAuras: [],
        lastFocusedDisputeId: null,
        pcTargetParty: 'a',
        pcSummaryUnlocked: false,
        pendingEvidenceView: null,
        // 턴/Phase 완전 초기화
        turnCount: 0,
        phaseTurnCount: 0,
        phaseHistory: [],
        currentPhase: GamePhase.Phase0_CaseIntro,
        verdictMode: 'normal',
        readinessState: null,
        phase3PromptBridge: null,
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
      resetVfxHierarchyState()
      resetEmergenceCount()
      const caseKey2 = normalizeCaseKey(caseData)
      if (caseKey2) {
        resetV3State(caseKey2)
        resetV2State(caseKey2)
      }
      resetSessionFatigueState()
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
  merge: (persistedState, currentState) => {
    const persisted = persistedState as Partial<GameStore> | undefined
    const merged = { ...currentState, ...persisted } as GameStore
    const persistedMeters = persisted?.questionMeters

    if (persistedMeters) {
      merged.questionMeters = {
        a: ensureQuestionMeterState({ ...currentState.questionMeters.a, ...persistedMeters.a }),
        b: ensureQuestionMeterState({ ...currentState.questionMeters.b, ...persistedMeters.b }),
      }
    }

    return patchSpouse01PersistedCombinationState(merged)
  },
  partialize: (state): any => ({
    // phase
    currentPhase: state.currentPhase,
    phaseHistory: state.phaseHistory,
    turnCount: state.turnCount,
    phaseTurnCount: state.phaseTurnCount,
    verdictMode: state.verdictMode,
    readinessState: state.readinessState,
    phase3Flags: state.phase3Flags,
    phase3PromptBridge: state.phase3PromptBridge,
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
    // discovery / event runtime
    discovery: state.discovery,
    questionMeters: state.questionMeters,
    gameEventLog: state.gameEventLog,
    pendingGameEvent: state.pendingGameEvent,
    pendingEvidenceResult: state.pendingEvidenceResult,
    pendingMinigame: state.pendingMinigame,
    disputeBoardAction: state.disputeBoardAction,
    pendingEvidenceView: state.pendingEvidenceView,
    lastFocusedDisputeId: state.lastFocusedDisputeId,
    activePerks: state.activePerks,
    pendingPerkChoice: state.pendingPerkChoice,
    pendingTransitionChoice: state.pendingTransitionChoice,
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
    witnessSessions: state.witnessSessions,
    pendingWitnessChoice: state.pendingWitnessChoice,
    interrogationHistory: state.interrogationHistory,
    recentAtomIds: state.recentAtomIds,
    pcTargetParty: state.pcTargetParty,
    pcSummaryUnlocked: state.pcSummaryUnlocked,
    // 재판관의 관찰 — 세션 내 유지 (리로드 시 복원)
    judgeObservations: state.judgeObservations,
    observationHistoryOpen: state.observationHistoryOpen,
  }),
}))
