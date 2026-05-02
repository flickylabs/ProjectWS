// @ts-nocheck — 대규모 파일, 점진적 타입 정리 예정
import { useCallback } from 'react'
import { useGameStore } from '../store/useGameStore'
import { resolveDialogue, generateDynamicFallback } from '../engine/dialogueResolver'
import { resolveLLMDialogue } from '../engine/llmDialogueResolver'
import { pp을를, pp과와, pp이가, pp은는 } from '../engine/koreanPostposition'
import { generateWitnessTestimony, canCallWitness, determineTestimonyDepth, getDepthSystemMessage } from '../engine/witnessEngine'
import type { PlayerAction, PartyId, QuestionType, DialogueNode } from '../types'
import { playEvidencePresent, playEvidenceUnlock, playEvidenceUpgrade, playSeparation } from '../engine/soundEngine'
import { v4Effects } from '../engine/presentationEngine'
import { iga, eunneun } from '../utils/korean'
import { showToast, showLLMErrorBanner } from '../components/common/Toast'
import { getAffinityScore, getAffinityGrade } from '../data/actionAffinity'
import { getOptimalPath, getNarrativeExpansion } from '../data/caseEnrichment'
import { normalizeCaseKey } from '../utils/caseHelpers'
import { getConfession } from '../data/confessionScripts'
import { detectStatementChange } from '../engine/contradictionEngine'
import { getScriptedEvidenceDiscovery } from '../engine/scriptedTextLoader'
import { extractDisputeSubject } from '../engine/judgeQuestionEngine'
import {
  getScriptedContradictionPursuit,
  getScriptedInterjection,
  getScriptedEmotionalOverload,
  getScriptedTrustAction,
  getScriptedJudgeQuestion,
  getScriptedJudgeContradiction,
} from '../engine/scriptedTextLoader'
import { runDiscoveryChecks, updateCascadeTargets } from './useDiscoveryIntegration'
import {
  clearNextConfidential,
  clearNextEvasionReading,
  consumeDossierQuestionOverride,
  getNextConfidential,
  getNextEvasionReading,
  setDossierQuestionOverride,
  setNextConfidential,
  setNextEvasionReading,
  setSkipNextJudgeQuestion,
  shouldSkipJudgeQuestion,
} from '../engine/dialogueRuntimeFlags'
import { emitStateTransitionEvent, getTransitionLabel } from '../engine/stateTransitionHelper'
// ── V2 스크립트 전환 엔진 ──
import { hasV2Data, hasStructureV2, getBeatLibrary, getBeatRuntimeState, recordBeatUsed, getActiveLayer, getDisputeRole, getDisputeV2 } from '../engine/v2DataLoader'
import { evaluateQuestionFatigue, commitQuestionFatigue, getSessionFatigueState, setSessionFatigueState } from '../engine/questionFatigueEngine'
import { selectTurnPresentation, deriveAngleTag, deriveResponseIntent } from '../engine/beatSelectorV2'
import { deriveActionQuality, resolveNpcReaction, applyReactionToBlueprint } from '../engine/npcReactionV2'
import { recordRevealedAtom, recordTurnStyle, recordKeyMoment, recordResolvedLink } from '../engine/phase3LogCollector'
import {
  isMisconceptionDispute, attemptMisconceptionTransition, getMisconceptionState,
  deriveTriggerFromQuestion, deriveTriggerFromEvidence, deriveTriggerFromInterjection,
  deriveTriggerFromLink, applyMisconceptionTrigger, matchTrapSignal, shouldFeedLinkIntoMisconception,
} from '../engine/misconceptionEngine'
import { evaluateLinkEdges } from '../engine/linkEdgeEngine'
import type { BeatScriptV2 } from '../types'
import { toTrustWindowBand } from '../types'
import { getAllTransitionBeats } from '../engine/v3GameLoopLoader'
import { selectHint, markHintShown, ARCHETYPE_META } from '../engine/archetypeHintEngine'
import { getInterrogationMicroVfx } from '../engine/vfxHierarchyEngine'
import { hasContradictionComparison } from '../utils/contradiction'
import { getAvailableSlots } from '../engine/witnessTestimonyResolver'
import { evaluateTruthBreakthroughGate } from '../engine/truthBreakthroughEngine'

/** LLM 모드 — AI 필수: 항상 true */
const useLLMMode = true
export function setLLMMode(_enabled: boolean) { /* AI 필수 — 항상 활성 */ }
export function isLLMMode() { return true }

/** 다음 질문에 적용할 토글 모디파이어 */
/** 다음 resolveAndApply 호출에서 재판관 질문 생성을 스킵 (모순 추궁 등 이미 직접 추가한 경우) */
export { setSkipNextJudgeQuestion, shouldSkipJudgeQuestion }

/** 사건카드 질문 텍스트 — LLM에 직접 전달하여 맥락 유지 */
export { setDossierQuestionOverride, consumeDossierQuestionOverride }

export { setNextConfidential, setNextEvasionReading }

let globalDispatchLock = false

function buildWitnessGameState(state: ReturnType<typeof useGameStore.getState>) {
  return {
    disputeVisibility: state.discovery.disputeVisibility,
    disputeLieState: Object.fromEntries(
      (state.caseData?.disputes ?? []).map(d => {
        const a = state.agentA.lieStateMap[d.id]?.currentState ?? 'S0'
        const b = state.agentB.lieStateMap[d.id]?.currentState ?? 'S0'
        return [d.id, a > b ? a : b]
      }),
    ),
  }
}

// ── V4 전략적 차별화: 모듈 레벨 상태 (Zustand state에 붙이면 setState 시 유실) ──
const _contradictionTokens: Record<string, number> = {}
const _empathyAttempts: Record<string, number> = {}

const LIE_STATE_RANK_FOR_UNLOCK: Record<string, number> = { S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5 }

const EMOTION_PHASE_LABELS: Record<string, string> = {
  defensive: '방어',
  confident: '자신감',
  shaken: '동요',
  angry: '격앙',
  resigned: '체념',
}

function formatEmotionPhaseLabel(phase: string | undefined): string {
  if (!phase) return '미확인'
  const normalized = String(phase).toLowerCase()
  return EMOTION_PHASE_LABELS[normalized] ?? phase
}

function formatLieStateStepLabel(state: string | undefined): string {
  const match = /^S([0-5])$/.exec(state ?? '')
  return match ? `${match[1]}단계` : (state ?? '미확인')
}

const shownLockoutNoticeKeys = new Set<string>()

function getPartyName(state: ReturnType<typeof useGameStore.getState>, party: PartyId, fallback = '당사자'): string {
  return party === 'a'
    ? state.caseData?.duo.partyA.name ?? fallback
    : state.caseData?.duo.partyB.name ?? fallback
}

function getOtherPartyName(state: ReturnType<typeof useGameStore.getState>, party: PartyId): string {
  return getPartyName(state, party === 'a' ? 'b' : 'a', '상대')
}

function addAngryLockoutNotice(
  state: ReturnType<typeof useGameStore.getState>,
  party: PartyId,
  relatedDisputes: string[],
  blockedActionLabel: string,
): boolean {
  const lockoutUntil = state.emotionalLockoutUntil?.[party] ?? 0
  if (lockoutUntil <= state.turnCount) return false

  const key = `${state.caseData?.caseId ?? 'case'}:${party}:${state.turnCount}:${lockoutUntil}:${blockedActionLabel}`
  if (shownLockoutNoticeKeys.has(key)) return false
  shownLockoutNoticeKeys.add(key)

  const targetName = getPartyName(state, party)
  const otherName = getOtherPartyName(state, party)
  const remainingTurns = Math.min(2, Math.max(1, lockoutUntil - state.turnCount))
  state.addDialogue({
    speaker: 'system',
    text: `🔒 ${targetName}${pp이가(targetName)} 격앙 상태입니다. ${remainingTurns}턴 동안 ${blockedActionLabel} 수 없습니다. ${otherName}에게 진행하거나 다른 행동을 선택해 주세요.`,
    relatedDisputes,
    turn: state.turnCount,
  })
  return true
}

function buildAngryRefusalLine(state: ReturnType<typeof useGameStore.getState>, party: PartyId): string {
  const caseId = normalizeCaseKey(state.caseData?.caseId ?? '')
  const map: Record<string, string> = {
    'spouse-01:a': '그만 몰아붙이세요. 지금은 더 말하고 싶지 않습니다.',
    'spouse-01:b': '그만하십시오. 지금은 더 대답하지 않겠습니다.',
    'family-01:a': '잠깐만요. 지금은 더 묻지 마십시오.',
    'family-01:b': '지금은 여기서 멈추겠습니다. 더 답하지 않겠습니다.',
    'friend-01:a': '그만해 주세요. 지금은 더 말하면 제가 더 세게 말할 것 같아요.',
    'friend-01:b': '지금은 답 못 하겠습니다. 더 캐묻지 말아 주세요.',
  }
  return map[`${caseId}:${party}`] ?? '지금은 더 대답하지 않겠습니다.'
}

function getEvidenceDisplayName(def: any, runtimeState?: { deepInvestigated?: boolean } | null): string {
  if (!def) return ''
  return runtimeState?.deepInvestigated ? (def.name ?? def.id) : (def.surfaceName ?? def.name ?? def.id)
}

function normalizeEvidenceDisplayLabel(name: string): string {
  return (name ?? '').replace(/\s*\(/g, ' (').replace(/\s+\)/g, ')').replace(/\s+/g, ' ').trim()
}

function getEvidencePresentationStageLabel(evidence: any, evidenceRuntime: any): string {
  const stages = Array.isArray(evidence?.investigationStages) ? evidence.investigationStages : []
  const investigated = Array.isArray(evidenceRuntime?.investigatedActions) ? evidenceRuntime.investigatedActions : []
  const latestStage = stages
    .filter((stage: any) => investigated.includes(stage.revealKey))
    .sort((a: any, b: any) => (a.stage ?? 0) - (b.stage ?? 0))
    .at(-1)
  return latestStage?.stage ? `조사 ${latestStage.stage}단계` : '기초 확인'
}

function polishEvidencePresentationQuestion(questionText: string, displayName: string): string {
  const text = questionText.replace(/\s+/g, ' ').trim()
  const evidenceHint = `${displayName} ${text}`
  if (/영수증|품목|물품|구입|구매|참고서|틴트|스타킹/.test(evidenceHint)) {
    if (/품목들이\s+가리키는\s+상대/.test(text)) {
      return '이 품목들은 누구를 위해 구입한 것입니까?'
    }
    if (/물품들은\s+누구를\s+위해\s+구매/.test(text)) {
      return '이 물품들은 누구를 위해 구입한 것입니까?'
    }
    if (/참고서는\s+누구를\s+위해\s+산/.test(text)) {
      return '참고서는 누구를 위해 산 것입니까?'
    }
  }
  return text
}

function getEvidencePresentationQuestionText(evidence: any, evidenceRuntime: any, target: PartyId, displayName: string): string {
  const stages = Array.isArray(evidence?.investigationStages) ? evidence.investigationStages : []
  const investigated = Array.isArray(evidenceRuntime?.investigatedActions) ? evidenceRuntime.investigatedActions : []
  const latestStage = stages
    .filter((stage: any) => investigated.includes(stage.revealKey))
    .sort((a: any, b: any) => (a.stage ?? 0) - (b.stage ?? 0))
    .at(-1)
  const questionText = latestStage?.question?.text
    ?? evidence?.partyContext?.[target]?.questionAngle
    ?? '이 증거와 관련해 설명해 주시겠습니까?'
  return polishEvidencePresentationQuestion(questionText, displayName)
}

function buildEvidencePresentationQuestion(
  state: ReturnType<typeof useGameStore.getState>,
  target: PartyId,
  evidence: any,
  evidenceRuntime: any,
  displayName: string,
): string {
  const targetName = getPartyName(state, target)
  const questionText = getEvidencePresentationQuestionText(evidence, evidenceRuntime, target, displayName)

  return `${targetName} 씨, ${questionText}`
}

function buildEvidencePresentationMeta(displayName: string, stageLabel: string) {
  const evidenceName = normalizeEvidenceDisplayLabel(displayName)
  return {
    evidenceName,
    stageLabel,
    label: `${evidenceName} - ${stageLabel}를 제시합니다.`,
  }
}

function getEvidenceCurrentLieRank(evidence: any, lieStates: Record<string, { currentState?: string }> | undefined): number {
  const proves = Array.isArray(evidence?.proves) && evidence.proves.length > 0 ? evidence.proves : []
  const ranks = proves.map((id: string) => LIE_STATE_RANK_FOR_UNLOCK[lieStates?.[id]?.currentState ?? 'S0'] ?? 0)
  return ranks.length > 0 ? Math.max(...ranks) : 0
}

function escapeAttributeSelectorValue(value: string): string {
  return String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

function enqueueNewEvidenceCutscene(
  evidenceId: string,
  options: {
    body?: string
    subtitle?: string
    autoDismissMs?: number
    tone?: 'gold' | 'green' | 'blue' | 'neutral'
  } = {},
): void {
  const state = useGameStore.getState()
  const def = state.evidenceDefinitions.find((e) => e.id === evidenceId)
  if (!def) return

  const displayName = getEvidenceDisplayName(def, state.evidenceStates[evidenceId])
  const selector = `[data-resonance-target="evidence-${escapeAttributeSelectorValue(evidenceId)}"]`
  const relatedNames = (state.caseData?.disputes ?? [])
    .filter((dispute) => (def.proves ?? []).includes(dispute.id))
    .map((dispute) => dispute.name)
    .slice(0, 2)

  state.enqueueFeedback({
    kind: 'evidence_result',
    eyebrow: '새 증거 확보',
    subtitle: options.subtitle ?? '증거 목록 갱신',
    title: displayName,
    body: options.body ?? '좌측 증거 목록에 새 증거가 추가되었습니다.',
    tone: options.tone ?? 'green',
    tag: 'evidence-unlock',
    meta: relatedNames.length > 0 ? [`관련 쟁점: ${relatedNames.join(', ')}`] : undefined,
    autoDismissMs: options.autoDismissMs ?? 3600,
    convergeTargetSelector: selector,
  })

  window.setTimeout(() => {
    useGameStore.getState().enqueueAura({ targetSelector: selector, style: 'electric' })
  }, 120)
}

// ── ScriptedText 모드 핫바 락 ──
// LLM 모드는 resolveLLMDialogue 호출 동안 isLLMLoading=true로 핫바 차단.
// ScriptedText 분기는 dialogue 추가가 동기적이므로 LLM 락이 안 걸림 →
// 타이핑 reveal(useRevealText, 14ms/char) 동안 핫바를 잠그기 위해
// 텍스트 길이 기반 시간만큼 isLLMLoading을 true로 유지한 뒤 자동 해제.
// (LLM 모드 자체 동작은 변경하지 않음 — ScriptedText 분기에서만 호출)
const TYPING_INTERVAL_MS = 14   // PCDialogueLog.useRevealText와 동일
const TYPING_BUFFER_MS = 220     // 안전 버퍼 (렌더 지연 + 사용자 인지)
const TYPING_MIN_MS = 350        // 최소 락 시간 (짧은 텍스트도 클릭 한 번 막음)
const TYPING_MAX_MS = 4000       // 최대 락 시간 (이상 시 강제 해제 — 영구 락 방지)
let _scriptedLockTimer: ReturnType<typeof setTimeout> | null = null

function lockHotbarForScriptedReveal(text: string, target?: PartyId): void {
  const len = (text ?? '').length
  const computed = len * TYPING_INTERVAL_MS + TYPING_BUFFER_MS
  const lockMs = Math.max(TYPING_MIN_MS, Math.min(TYPING_MAX_MS, computed))
  // 기존 타이머가 있으면 클리어 (중첩 호출 시 가장 최근 reveal 기준)
  if (_scriptedLockTimer) {
    clearTimeout(_scriptedLockTimer)
    _scriptedLockTimer = null
  }
  useGameStore.getState().setLLMLoading(true, target)
  _scriptedLockTimer = setTimeout(() => {
    _scriptedLockTimer = null
    // 그 사이 LLM 흐름이 락을 잡았다면 덮어쓰지 않도록 — 단순화: 항상 false 처리.
    // (이 분기는 LLM 호출 직후가 아니므로 충돌 가능성 거의 없음)
    useGameStore.getState().setLLMLoading(false)
  }, lockMs)
}

// ── Archetype 힌트: NPC 응답 후 재판관 관찰 팝업 (채팅 미삽입) ──
// 해당 캐릭터 태그로 수렴되는 2초 팝업. 커스텀 이벤트로 UI 컴포넌트가 구독.
export const ARCHETYPE_OBSERVATION_EVENT = 'pc:archetype-observation'
export interface ArchetypeObservationDetail {
  party: PartyId
  archetype: string
  hintText: string
  effectiveApproach: 'fact_pursuit' | 'motive_search' | 'empathy_approach'
  turn: number
}

function maybeShowArchetypeHint(target: PartyId, turnNumber: number): void {
  const state = useGameStore.getState()
  const caseData = state.caseData
  if (!caseData) return

  const party = target === 'a' ? caseData.duo.partyA : caseData.duo.partyB
  const archetype = party.archetype ?? 'avoidant'
  const tell = party.verbalTells?.[0]?.type ?? ''

  const hint = selectHint(archetype, tell, turnNumber, target)
  if (!hint) return

  markHintShown(target)
  // 관찰 기록 + glow (최초 관찰이면 태그 신규 등장 — Tier 1 분기의 근거)
  const isFirstObservation = state.observeArchetype(target, archetype)
  const meta = ARCHETYPE_META[archetype]
  const partyName = target === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name

  // Tier 1: 사건당 archetype별 첫 감지만 컷씬 + 공명 애니메이션
  if (isFirstObservation) {
    state.enqueueFeedback({
      kind: 'observation',
      eyebrow: '재판관의 관찰',
      body: hint.text,
      tag: meta?.tagLabel,
      tone: 'gold',
      party: target,
      archetype,
      convergeToTag: true,
    })
  }

  // 관찰 패널 기록 — 메시지 자체가 타이틀, 파티/태그는 서브
  state.addJudgeObservation({
    turnCount: state.turnCount,
    category: 'archetype',
    iconId: 'i-eye',
    title: hint.text,
    summary: `${partyName} · ${meta?.tagLabel ?? archetype}`,
    party: target,
    archetype,
    linkedDialogueId: findLinkedDialogueId(target),
  })
}

// V2 피로도 상태는 questionFatigueEngine.ts의 세션 상태에서 관리
// V2 끼어들기 opportunity/모달/resolveInterjectionV2 경로는 제거됨 —
// 끼어들기는 gameEventTriggerEngine의 V3 경로(PCDiscoveryOverlay interjection 분기)로 일원화.

export function useActionDispatch() {
  const dispatch = useCallback((action: PlayerAction) => {
    if (globalDispatchLock) { console.warn('[dispatch] 이전 액션 처리 중 — 무시'); return }
    const state = useGameStore.getState()

    if (action.type === 'evidence_present') {
      globalDispatchLock = true
      handleEvidencePresent(action).finally(() => { globalDispatchLock = false })
      return
    }
    if (action.type === 'evidence_investigate') {
      globalDispatchLock = true
      handleEvidenceInvestigate(action).finally(() => { globalDispatchLock = false })
      return
    }
    if (action.type === 'call_witness') {
      globalDispatchLock = true
      handleCallWitness(action).finally(() => { globalDispatchLock = false })
      return
    }
    if (action.type === 'question') {
      globalDispatchLock = true
      handleQuestion(action).finally(() => { globalDispatchLock = false })
      return
    }
    if (action.type === 'trust_action') {
      handleTrustAction(action)
      return
    }
    if (action.type === 'mediation') {
      // Phase6_Mediation.tsx에서 직접 처리하므로 여기서는 패스스루
      return
    }
    if (action.type === 'advance_phase') {
      if (state.canAdvancePhase()) state.advancePhase()
      return
    }
  }, [])

  return dispatch
}

// ── 증거 제시 ──
let evidencePresentLock = false
/** 전략 선택 패널에서 실행한 액션 중에는 새 전략 선택을 차단 */
let _suppressTransitionChoice = false
export function suppressTransitionChoice() { _suppressTransitionChoice = true }
export function unsuppressTransitionChoice() { _suppressTransitionChoice = false }
async function handleEvidencePresent(action: Extract<PlayerAction, { type: 'evidence_present' }>) {
  if (evidencePresentLock) return
  evidencePresentLock = true
  try {
  const state = useGameStore.getState()
  if (!state.isUnlocked(action.evidenceId)) { evidencePresentLock = false; return }
  // [Phase B-3] 체념(셧다운) 상태에서 증거 제시도 차단. 카운팅도 안 됨.
  const lockoutUntil = state.emotionalLockoutUntil?.[action.target] ?? 0
  if (lockoutUntil > state.turnCount) {
    addAngryLockoutNotice(state, action.target, [], '증거를 제시할')
    evidencePresentLock = false
    return
  }

  const evDef = state.evidenceDefinitions.find((e) => e.id === action.evidenceId)
  if (!evDef) { evidencePresentLock = false; return }
  const currentEvidenceState = state.evidenceStates[action.evidenceId]
  const presentationStage = currentEvidenceState?.investigatedActions?.length ?? 0
  const presentedStages = currentEvidenceState?.presentedStagesByParty?.[action.target] ?? []
  if (presentationStage <= 0) {
    state.enqueueFeedback({
      kind: 'evidence_result',
      eyebrow: '증거 제시',
      title: '조사 필요',
      body: '증거를 1단계 이상 조사한 뒤 제시할 수 있습니다.',
      tone: 'neutral',
      autoDismissMs: 1800,
    })
    evidencePresentLock = false
    return
  }
  if (presentedStages.includes(presentationStage)) {
    state.enqueueFeedback({
      kind: 'evidence_result',
      eyebrow: '증거 제시',
      title: '이미 답변한 단계',
      body: `조사 ${presentationStage}단계 답변은 이미 받았습니다. 다음 조사 단계가 열리면 다시 제시할 수 있습니다.`,
      tone: 'neutral',
      autoDismissMs: 2000,
    })
    evidencePresentLock = false
    return
  }

  // 증거가 입증하는 첫 번째 쟁점을 포커스로 기록
  if (evDef.proves?.length > 0) {
    state.setLastFocusedDisputeId(evDef.proves[0])
  }

  // 조합 발동 전 스냅샷 (새로 발동된 것만 표시하기 위해)
  const prevTriggeredCount = state.triggeredCombinations.length

  const newUnlocks = state.presentEvidence(action.evidenceId, action.target)
  if (newUnlocks.length > 0) v4Effects.evidenceUnlock()

  playEvidencePresent()
  const stateAfterPresent = useGameStore.getState()
  const evVis = state.discovery.disputeVisibility
  const visibleEvProves = evDef.proves.filter(dId => { const v = evVis[dId]; return !v || v.visibility !== 'hidden' })
  // [Phase F] 증거 시스템 메시지 명칭 — deepInvestigated 전엔 surfaceName(잠금 명칭) 사용.
  const evStateForName = stateAfterPresent.evidenceStates[evDef.id]
  const displayName = getEvidenceDisplayName(evDef, evStateForName)
  const evidenceStageLabel = getEvidencePresentationStageLabel(evDef, evStateForName)
  const judgeEvidenceQuestion = buildEvidencePresentationQuestion(
    state,
    action.target,
    evDef,
    evStateForName,
    displayName,
  )
  state.addDialogue({
    speaker: 'judge',
    text: judgeEvidenceQuestion,
    relatedDisputes: visibleEvProves,
    turn: state.turnCount,
    evidencePresentation: buildEvidencePresentationMeta(displayName, evidenceStageLabel),
  })
  state.pushGameEvent({
    id: state.gameEventLog.length + 1,
    turn: state.turnCount,
    type: 'event_trigger',
    message: `증거 제시: ${displayName}`,
    timestamp: Date.now(),
  })

  const trigger = evDef.reliability === 'hard' ? 'hard_evidence' : 'soft_evidence'
  let evDidTransition = false
  for (const disputeId of evDef.proves) {
    snapshotLieState(action.target, disputeId)
    const transitioned = state.transitionLie(action.target, disputeId, trigger)
    if (transitioned) {
      notifyLieTransition(action.target, disputeId); evDidTransition = true
      const freshAgent = action.target === 'a' ? useGameStore.getState().agentA : useGameStore.getState().agentB
      const newLieState = freshAgent.lieStateMap[disputeId]?.currentState
      // deepTruthsUnlocked: S4+ 도달 시 narrativeExpansion 존재 여부
      if (newLieState && (newLieState === 'S4' || newLieState === 'S5')) {
        const caseKey = normalizeCaseKey(state.caseData?.caseId ?? '')
        if (getNarrativeExpansion(caseKey, disputeId)) state.trackMetric('deepTruthsUnlocked')
      }
      // immediateAnswerUsed: soft_evidence(즉답 요구)로 S5 도달
      if (newLieState === 'S5' && trigger === 'soft_evidence') {
        state.trackMetric('immediateAnswerUsed')
      }
      // unsupportedCollapses: hard_evidence/trust 없이 S5 도달
      if (newLieState === 'S5' && trigger !== 'hard_evidence') {
        state.trackMetric('unsupportedCollapses')
      }
    }
  }
  if (evDidTransition) state.trackMetric('evidenceEffective')

  // V2: 증거 제시 → misconception 전이 시도
  {
    const v2CaseId = normalizeCaseKey(state.caseData?.caseId ?? '')
    if (hasStructureV2(v2CaseId)) {
      for (const disputeId of evDef.proves) {
        if (isMisconceptionDispute(disputeId)) {
          const mcEvTrigger = deriveTriggerFromEvidence({
            disputeId,
            turn: state.turnCount,
            evidenceId: action.evidenceId,
          })
          if (mcEvTrigger) {
            const mcResult = applyMisconceptionTrigger(disputeId, mcEvTrigger)
            if (mcResult?.changed) {
              console.log(`[V2 Misconception via Evidence] ${disputeId}: ${mcResult.from}→${mcResult.to}`)
              const rState = getBeatRuntimeState(v2CaseId)
              for (const eff of mcResult.effects) {
                if (eff.type === 'set_flag') rState.flags.add(eff.flag)
                if (eff.type === 'clear_flag') rState.flags.delete(eff.flag)
              }
            }
          }
        }
      }
    }
  }

  // V3: 증거 결과 토스트 — 전이 여부에 따라 hold/crack/collapse
  {
    const toastState = useGameStore.getState()
    const resultType = !evDidTransition ? 'hold'
      : evDef.reliability === 'hard' ? 'collapse' : 'crack'
    toastState.setPendingEvidenceResult({ type: resultType, evidenceName: displayName, evidenceId: evDef.id })

    // penalty_buffer 퍼크: hold(증거 무효) 시 철회/재프레이밍 선택지
    if (resultType === 'hold' && toastState.activePerks.penaltyBufferUsesRemaining > 0) {
      toastState.setPendingPerkChoice({
        type: 'penalty_buffer',
        evidenceId: action.evidenceId,
        target: action.target,
      })
    }
  }

  changeEmotionWithPhaseTracking(action.target, evDef.reliability === 'hard' ? 15 : 8)

  for (const id of newUnlocks) {
    const def = state.evidenceDefinitions.find((e) => e.id === id)
    if (def) {
      playEvidenceUnlock()
      // [Phase F] 새 증거 메시지 — deepInvestigated 전엔 surfaceName(잠금 명칭) 사용
      const newEvState = state.evidenceStates[def.id]
      const newDisplayName = getEvidenceDisplayName(def, newEvState)
      enqueueNewEvidenceCutscene(def.id, {
        body: `${newDisplayName}${pp이가(newDisplayName)} 좌측 증거 목록에 추가되었습니다.`,
      })
      state.addDialogue({ speaker: 'system', text: `새로운 증거를 손에 넣었다 — ${newDisplayName}`, relatedDisputes: def.proves, turn: state.turnCount })
    }
  }

  // 증거 조합 격상 — 이번에 새로 발동된 것만 표시
  const freshState = useGameStore.getState()
  const newlyTriggered = freshState.triggeredCombinations.slice(prevTriggeredCount)
  if (newlyTriggered.length > 0) {
    const caseData = freshState.caseData
    if (caseData) {
      for (const comboKey of newlyTriggered) {
        const combo = caseData.evidenceCombinations.find((c) => c.requires.join('+') === comboKey)
        if (combo) {
          const names = combo.requires.map((id) => {
            const comboEvidence = caseData.evidence.find((e) => e.id === id)
            return comboEvidence ? getEvidenceDisplayName(comboEvidence, freshState.evidenceStates[id]) : id
          }).join(' + ')
          const comboVis = freshState.discovery.disputeVisibility
          const visibleComboProves = combo.proves.filter(dId => { const v = comboVis[dId]; return !v || v.visibility !== 'hidden' })
          const comboDisputeNames = visibleComboProves.length > 0
            ? visibleComboProves.map(dId => caseData.disputes.find(d => d.id === dId)?.name ?? dId).join(', ')
            : '관련 쟁점'
          playEvidenceUpgrade()
          v4Effects.combineSuccess('upgrade', `${names} → ${comboDisputeNames}`)
          freshState.addDialogue({
            speaker: 'system',
            text: `증거 조합 격상! ${names} → "${comboDisputeNames}" 신뢰도 Hard 확정`,
            relatedDisputes: visibleComboProves,
            turn: freshState.turnCount,
          })
          // 조합 결과로 다음 액션을 가리키는 임팩트 효과 — 핫바의 증인 소환 슬롯 깜빡 (조합→증인 패턴 가정)
          if (typeof document !== 'undefined') {
            const witnessSlot = document.querySelector<HTMLElement>('[data-guide-target="witness-summon"]')
            if (witnessSlot) {
              witnessSlot.classList.remove('pc-hotbar-slot-pulse')
              void witnessSlot.offsetWidth
              witnessSlot.classList.add('pc-hotbar-slot-pulse')
              window.setTimeout(() => witnessSlot.classList.remove('pc-hotbar-slot-pulse'), 3000)
            }
          }
        }
      }
    }
  }

  // NPC 반응 — 증거에 대해 직접 반응하도록 evidence_present 액션 전달
  if (evDef.proves.length > 0) {
    setSkipNextJudgeQuestion(true)
    await resolveAndApply(action, action.target)
  }

  // Discovery 체크 — 진실공방/쟁점발현/감정실수/판단충돌
  runDiscoveryChecks(action.target, evDef.proves[0])

  // ── V3: 증거 제시 후 이벤트 트리거 평가 ──
  {
    const v3State = useGameStore.getState()
    const transitions = []
    for (const dId of evDef.proves) {
      const prev = _lieStateBeforeTransition[`${action.target}:${dId}`]
      const v3Agent = action.target === 'a' ? v3State.agentA : v3State.agentB
      const cur = v3Agent.lieStateMap[dId]?.currentState
      if (prev && cur && prev !== cur) {
        transitions.push({ party: action.target, disputeId: dId, from: prev, to: cur })
        const pName = action.target === 'a' ? v3State.caseData?.duo.partyA.name : v3State.caseData?.duo.partyB.name
        emitStateTransitionEvent(action.target, dId, prev, cur, v3State.turnCount, pName ?? '')

        // 상태 전이 후 전략 선택 모달 (증거 제시 경유, 턴당 1회)
        const transLabel = getTransitionLabel(prev, cur)
        if ((transLabel === 'cracked' || transLabel === 'cornered' || transLabel === 'opening') && !_suppressTransitionChoice) {
          v3State.setPendingTransitionChoice({
            label: transLabel,
            party: action.target,
            disputeId: dId,
            from: prev,
            to: cur,
          })
        }
      }
    }
    // [결함 26·27 부활] 자동 이벤트 트리거 — D 옵션 시스템 메시지 + 클릭형 패턴이 자동 모달을 막아주므로 안전.
    // 모순/끼어들기/감정폭발/새쟁점 모두 시스템 메시지로 등장 → 사용자 클릭 시점에만 모달.
    v3State.evaluateTurnEvents('evidence_present', evDef.proves[0], transitions)
  }

  useGameStore.getState().incrementTurn()
  } finally { evidencePresentLock = false }
}

// ── 증인 소환 ──
async function handleCallWitness(action: Extract<PlayerAction, { type: 'call_witness' }>) {
  const state = useGameStore.getState()
  if (!state.caseData) return

  const witness = state.caseData.duo.socialGraph.find(tp => tp.id === action.witnessId)
  if (!witness) return

  // 다층 증언 데이터 로드 시도
  const caseKey = normalizeCaseKey(state.caseData.caseId ?? '')
  let testimonySlots: import('../types/witnessTestimony').TestimonySlot[] = []
  try {
    if (caseKey === 'spouse-01') {
      const { SPOUSE_01_TESTIMONY } = await import('../data/witnessTestimonyData/spouse-01')
      testimonySlots = SPOUSE_01_TESTIMONY
    } else if (caseKey === 'friend-01') {
      const { FRIEND_01_TESTIMONY } = await import('../data/witnessTestimonyData/friend-01')
      testimonySlots = FRIEND_01_TESTIMONY
    } else if (caseKey === 'family-01') {
      const { FAMILY_01_TESTIMONY } = await import('../data/witnessTestimonyData/family-01')
      testimonySlots = FAMILY_01_TESTIMONY
    }
  } catch { /* 데이터 없으면 기존 방식 */ }

  // 다층 증언 시스템: 사용 가능한 슬롯 확인
  const session = state.witnessSessions[action.witnessId] ?? { heardSlots: [], lastChoice: null, summonCount: 0 }
  const gameStateForWitness = buildWitnessGameState(state)

  let availableSlots: import('../types/witnessTestimony').TestimonySlot[] = []
  if (testimonySlots.length > 0) {
    availableSlots = getAvailableSlots(testimonySlots, action.witnessId, session, gameStateForWitness)
  }

  const hasSlots = availableSlots.length > 0
  const check = canCallWitness(action.witnessId, state.calledWitnesses, state.caseData, hasSlots, state.unlockedWitnessIds)
  if (!check.available) {
    state.enqueueFeedback({
      kind: 'info',
      eyebrow: '증인 심문',
      title: '추가 질문 없음',
      body: check.reason ?? '지금은 이 증인에게 더 물을 내용이 없습니다.',
      tone: 'neutral',
      autoDismissMs: 1800,
    })
    return
  }

  // 비용: 조사 토큰 1개
  if (state.resources.investigationTokens < 1) {
    state.enqueueFeedback({
      kind: 'info',
      eyebrow: '증인 심문',
      title: '조사 토큰 부족',
      body: '증인을 다시 부르려면 조사 토큰이 필요합니다.',
      tone: 'neutral',
      autoDismissMs: 1800,
    })
    return
  }
  state.spend('investigationTokens', 1)

  // 다층 증언이 있으면 주제 선택 모달 표시
  if (hasSlots) {
    if (!state.calledWitnesses.includes(action.witnessId)) {
      state.addCalledWitness(action.witnessId)
    }
    const isResummon = session.summonCount > 0
    // 주제 선택 모달 표시 → UI에서 선택 후 applyWitnessSlot 호출
    state.setPendingWitnessChoice({
      witnessId: action.witnessId,
      witnessName: witness.name,
      slots: availableSlots,
      allSlots: testimonySlots,
      isResummon,
    })
    return
  }

  // 다층 증언 데이터 없음 → 기존 LLM 방식
  state.addCalledWitness(action.witnessId)

  // 소환 연출
  state.addDialogue({
    speaker: 'system',
    text: `증인 ${witness.name} 소환 — 증언이 시작된다.`,
    relatedDisputes: [],
    turn: state.turnCount,
  })

  // 증언 깊이 결정 (lieState 기반 게이팅)
  const depth = determineTestimonyDepth(witness, state.getLieState)

  // 깊이 제한 시 시스템 메시지 표시
  if (depth !== 'full') {
    const depthMsg = getDepthSystemMessage(depth)
    if (depthMsg) {
      state.addDialogue({
        speaker: 'system',
        text: `💬 ${depthMsg}`,
        relatedDisputes: [],
        turn: state.turnCount,
      })
    }
  }

  // 증언 생성 (LLM 또는 폴백, 깊이 게이팅 적용)
  state.setLLMLoading(true)
  try {
    const recentDialogues = state.dialogueLog.slice(-8)
    const testimony = await generateWitnessTestimony(
      witness, state.caseData, state.agentA, state.agentB, recentDialogues, depth,
    )

    const fresh = useGameStore.getState()
    fresh.setLLMLoading(false)

    // 증언 등록
    fresh.addDialogue({
      speaker: 'witness',
      text: testimony.testimony,
      relatedDisputes: testimony.relatedDisputes,
      turn: fresh.turnCount,
      behaviorHint: testimony.behaviorHint,
      witnessName: witness.name,
      witnessFavor: testimony.favorDirection as 'pro_a' | 'pro_b' | 'neutral' | 'mixed',
    })

    // 편향 방향에 따라 NPC 반응
    const favoredParty: PartyId | null =
      testimony.favorDirection === 'pro_a' ? 'a'
      : testimony.favorDirection === 'pro_b' ? 'b'
      : null

    // 유리한 쪽의 신뢰 상승, 불리한 쪽 감정 동요
    if (favoredParty) {
      const unfavored: PartyId = favoredParty === 'a' ? 'b' : 'a'
      changeEmotionWithPhaseTracking(unfavored, 10)

      // 증언이 직접 목격이면 관련 쟁점의 lie state 전이 시도
      if (witness.witnessedDirectly && testimony.relatedDisputes.length > 0) {
        for (const dId of testimony.relatedDisputes) {
          const transitioned = fresh.transitionLie(unfavored, dId, 'witness_testimony')
          if (transitioned) {
            notifyLieTransition(unfavored, dId)
            fresh.trackMetric('lieTransitions')
            const wAgent = unfavored === 'a' ? useGameStore.getState().agentA : useGameStore.getState().agentB
            const wNewState = wAgent.lieStateMap[dId]?.currentState
            // unsupportedCollapses: 증인 증언만으로 S5 도달
            if (wNewState === 'S5') {
              fresh.trackMetric('unsupportedCollapses')
            }
            // deepTruthsUnlocked: S4+ 도달 시 narrativeExpansion 존재 여부
            if (wNewState && (wNewState === 'S4' || wNewState === 'S5')) {
              const caseKey = normalizeCaseKey(fresh.caseData?.caseId ?? '')
              if (getNarrativeExpansion(caseKey, dId)) fresh.trackMetric('deepTruthsUnlocked')
            }
          }
        }
      }
    }

    // 왜곡된 증언이면 시스템 힌트
    if (testimony.distorted) {
      fresh.addDialogue({
        speaker: 'system',
        text: '💭 증언의 일부가 기억에 의존하고 있다. 다른 증거와 대조해볼 필요가 있다.',
        relatedDisputes: testimony.relatedDisputes,
        turn: fresh.turnCount,
      })
    }

    fresh.trackMetric('questionsAsked')

    // ── 증인 증언으로 인한 진실 발견 ──
    // 증인의 knowledgeScope가 truthTable의 사실과 매칭되면 해당 truth를 발견 처리
    if (witness.knowledgeScope) {
      const freshStore = useGameStore.getState()
      const caseData2 = freshStore.caseData!
      const scope = witness.knowledgeScope

      for (let i = 0; i < caseData2.truthTable.length; i++) {
        const truth = caseData2.truthTable[i]
        const truthId = truth.id ?? `t-${i + 1}`

        // 이미 발견된 truth는 스킵
        if (freshStore.discovery.discoveredTruths.includes(truthId)) continue

        // knowledgeScope에서 truth.fact의 핵심 키워드 매칭
        const keywords = truth.fact
          .replace(/[은는이가을를의에서로도만~,.!?]/g, ' ')
          .split(/\s+/)
          .filter(w => w.length >= 3)
        const matchCount = keywords.filter(kw => scope.includes(kw)).length
        const matchRatio = keywords.length > 0 ? matchCount / keywords.length : 0

        // 40% 이상 키워드 매칭 → 이 증인이 이 사실을 알고 있음
        if (matchRatio >= 0.4) {
          freshStore.addDiscoveredTruth(truthId)

          // 시스템 메시지: 새로운 사실 발견 (진실 내용은 노출하지 않음)
          freshStore.addDialogue({
            speaker: 'system',
            text: `💡 증인 증언으로 새로운 단서가 확인되었습니다. 증거 게시판을 확인해 보십시오.`,
            relatedDisputes: testimony.relatedDisputes,
            turn: freshStore.turnCount,
          })
        }
      }
    }

    // Discovery 체크 — 증인 증언 후 (숨겨진 쟁점 발현 포함)
    const favorParty: 'a' | 'b' = testimony.favorDirection === 'pro_a' ? 'a' : 'b'
    runDiscoveryChecks(favorParty)
  } catch {
    const fresh = useGameStore.getState()
    fresh.setLLMLoading(false)
    fresh.gain('investigationTokens', 1)
    fresh.addDialogue({
      speaker: 'system',
      text: '증인 증언 생성에 실패했다.',
      relatedDisputes: [],
      turn: fresh.turnCount,
    })
    showToast('증인 증언 생성에 실패했습니다. 토큰이 반환되었습니다.', 'warn')
  }

  // 증인 소환은 토큰만 소비, 턴 소비 없음
}

// ── 증거 조사 ──
async function handleEvidenceInvestigate(action: Extract<PlayerAction, { type: 'evidence_investigate' }>) {
  const state = useGameStore.getState()
  // 토큰 경제: 첫 조사(투자한 횟수 0)는 무료 열람용, 2·3회차는 토큰 1 소비
  const prevInvestigations = state.evidenceStates[action.evidenceId]?.investigatedActions.length ?? 0
  const nextInvestigationStage = prevInvestigations + 1
  const investigationCost = prevInvestigations === 0 ? 0 : (nextInvestigationStage === 2 ? 2 : 1)
  if (investigationCost > 0) {
    if (!state.spend('investigationTokens', investigationCost)) {
      state.enqueueFeedback({
        kind: 'evidence_result',
        eyebrow: '증거 조사',
        title: '조사 토큰 부족',
        body: `조사 ${nextInvestigationStage}단계에는 조사 토큰 ${investigationCost}개가 필요합니다.`,
        tone: 'neutral',
        autoDismissMs: 1800,
      })
      return
    }
  }
  const result = state.investigateEvidence(action.evidenceId, action.subAction)
  if (result) {
    const def = state.evidenceDefinitions.find((e) => e.id === action.evidenceId)
    const displayName = def ? getEvidenceDisplayName(def, state.evidenceStates[def.id]) : '증거 조사'
    state.enqueueFeedback({
      kind: 'evidence_result',
      eyebrow: '증거 조사',
      title: displayName,
      body: `${result}`,
      tone: 'neutral',
      autoDismissMs: 2400,
    })
  }

  // [TC-F C2 픽스] 조사 결과로 자동 해금된 증거를 시스템 메시지로 알림
  // — '발신자 미상 문자' 같은 신규 해금이 사용자에게 전혀 표시되지 않던 결함 해소
  const newlyUnlocked = state.consumeLastInvestigateUnlocks()
  if (newlyUnlocked.length > 0) {
    const evidenceDefs = state.evidenceDefinitions
    for (const unlockedId of newlyUnlocked) {
      const def = evidenceDefs.find((e) => e.id === unlockedId)
      if (!def) continue
      const displayName = getEvidenceDisplayName(def, state.evidenceStates[def.id])
      enqueueNewEvidenceCutscene(def.id, {
        body: `${displayName}${pp이가(displayName)} 조사 결과로 확보되었습니다.`,
      })
    }
  }

  // [차단] 증거 조사 후 자동 NPC 심문 — 의도되지 않은 액션. 사용자가 명시적으로 심문할 때만 발화.
  // 조사는 정보 획득 액션. 심문은 별개. 자동 심문은 사용자 흐름을 끊고 잘못된 캐릭터에 메시지 발생.
  // 증거 조사는 토큰만 소비, 턴 소비 없음
}

// ── 질문 ──
let questionLock = false

/**
 * [Phase C-4] 자백 후 동일 쟁점 재추궁 시 짧은 재진술/회피 발화 선택.
 * 캐릭터 archetype에 따라 톤 분기.
 */
function pickConfessionRecapLine(caseId: string, party: 'a' | 'b'): string {
  // 사건·party별 archetype 매핑 (간단)
  // spouse-01: A victim_cosplay, B avoidant
  // family-01: A confrontational, B affect_flattening
  // friend-01: A premature_summary, B affect_flattening
  const key = `${caseId.replace(/^case-/, '')}:${party}`
  const map: Record<string, string> = {
    'spouse-01:a': '이미 인정했습니다. 더 무엇을 더 말씀드려야 하나요.',
    'spouse-01:b': '…더 드릴 말씀이 없습니다.',
    'family-01:a': '이미 다 얘기했습니다. 같은 말 반복하고 싶지 않습니다.',
    'family-01:b': '…전에 말씀드린 그대로입니다.',
    'friend-01:a': '그 부분은 이미 말씀드린 그대로입니다.',
    'friend-01:b': '…더 보탤 말이 없습니다.',
  }
  return map[key] ?? '이미 자백한 부분입니다. 더 드릴 말씀이 없습니다.'
}
function dispatchS5ConfessionAnswer(party: PartyId, disputeId: string): boolean {
  const state = useGameStore.getState()
  const caseData = state.caseData
  if (!caseData) return false
  if (state.confessionDispatched?.[party]?.[disputeId]) return false

  const entry = getConfession(normalizeCaseKey(caseData.caseId ?? ''), party, disputeId)
  if (!entry) return false

  const partyName = party === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name
  const dispute = caseData.disputes.find((item) => item.id === disputeId)
  const disputeName = dispute?.name ?? disputeId

  const mainDialogueId = state.addDialogue({
    speaker: party,
    text: entry.confessionMain,
    relatedDisputes: [disputeId],
    turn: state.turnCount,
    behaviorHint: '핵심 사실을 구체적으로 인정한다.',
    source: 'script',
  })

  state.addDialogue({
    speaker: party,
    text: entry.postConfession,
    relatedDisputes: [disputeId],
    turn: state.turnCount,
    behaviorHint: '숨긴 책임을 인정한다.',
    source: 'script',
  })

  state.addNotebookEntry?.({
    turnCount: state.turnCount,
    category: 'confession',
    iconId: 'i-key',
    title: `${partyName}의 자백 - ${disputeName}`,
    summary: entry.confessionMain.slice(0, 80) + (entry.confessionMain.length > 80 ? '...' : ''),
    party,
    disputeId,
    linkedDialogueId: mainDialogueId,
  })

  state.markConfessionDispatched?.(party, disputeId)
  return true
}

async function handleQuestion(action: Extract<PlayerAction, { type: 'question' }>) {
  if (questionLock) return
  questionLock = true
  try {
  const state = useGameStore.getState()
  const freeInterrogation = (action as typeof action & { freeInterrogation?: { rawText?: string } }).freeInterrogation
  const isFreeInterrogation = Boolean(freeInterrogation?.rawText)
  const judgeQuestionText = freeInterrogation?.rawText
    ?? buildQuestionText(action.questionType, action.target, action.disputeId)
  // [감정 과부하 lockout] 차단 만료 turn 까지 질문 거부 — 메시지 1회만 출력
  const lockoutUntil = state.emotionalLockoutUntil?.[action.target] ?? 0
  if (lockoutUntil > state.turnCount) {
    addAngryLockoutNotice(state, action.target, [action.disputeId], '질문할')
    return
  }
  // [Phase C-4] 자백 후 동일 쟁점 재추궁 — 짧은 재진술/회피로 응답. LLM 호출 안 함.
  const alreadyConfessed = state.confessionDispatched?.[action.target]?.[action.disputeId]
  const currentTargetAgent = action.target === 'a' ? state.agentA : state.agentB
  const alreadyAtFullTruth = currentTargetAgent.lieStateMap?.[action.disputeId]?.currentState === 'S5'
  if (alreadyAtFullTruth && !alreadyConfessed) {
    state.addDialogue({
      speaker: 'judge',
      text: judgeQuestionText,
      relatedDisputes: [action.disputeId],
      turn: state.turnCount,
    })
    const emittedConfession = dispatchS5ConfessionAnswer(action.target, action.disputeId)
    if (!emittedConfession) {
      state.addDialogue({
        speaker: action.target,
        text: pickConfessionRecapLine(state.caseData?.caseId ?? '', action.target),
        relatedDisputes: [action.disputeId],
        turn: state.turnCount,
        behaviorHint: '이미 인정한 핵심 사실을 다시 정리한다.',
        source: 'fallback',
      })
    }
    state.incrementTurn()
    return
  }
  if (alreadyConfessed) {
    const targetName = action.target === 'a'
      ? state.caseData?.duo.partyA.name ?? '당사자'
      : state.caseData?.duo.partyB.name ?? '당사자'
    // 캐릭터별 짧은 재진술 발화
    const recapText = pickConfessionRecapLine(state.caseData?.caseId ?? '', action.target)
    state.addDialogue({
      speaker: 'judge',
      text: judgeQuestionText,
      relatedDisputes: [action.disputeId],
      turn: state.turnCount,
    })
    state.addDialogue({
      speaker: action.target,
      text: recapText,
      relatedDisputes: [action.disputeId],
      turn: state.turnCount,
      behaviorHint: '이미 자백한 사항이라 더 보탤 말이 없는 듯하다.',
      source: 'fallback',
    })
    state.addDialogue({
      speaker: 'system',
      text: `${targetName}${pp은는(targetName)} 이 쟁점에 대해 이미 자백했습니다. 다른 쟁점이나 다른 당사자로 진행해 주세요.`,
      relatedDisputes: [action.disputeId],
      turn: state.turnCount,
    })
    state.incrementTurn()
    return
  }
  state.setLastFocusedDisputeId(action.disputeId)

  // ── 토글 모디파이어 소비 ──
  const isConfidential = getNextConfidential()
  clearNextConfidential()
  const evasionTarget = getNextEvasionReading()
  clearNextEvasionReading()

  if (isConfidential) {
    state.changeTrust(action.target, 'trustTowardJudge', 20)
    state.addDialogue({
      speaker: 'system',
      text: '[비공개] 비공개 심문 — 이 답변은 상대에게 공개되지 않는다.',
      relatedDisputes: [], turn: state.turnCount,
    })
    state.trackMetric('confidentialUsed')
    state.trackMetric('togglesUsed')
  }

  // 스크립트 우선 모드: 항상 고정 템플릿으로 재판관 질문 추가
  // NPC 응답은 ScriptedText 우선 → LLM 폴백 (llmDialogueResolver 내부에서 처리)
  state.addDialogue({
    speaker: 'judge',
    text: judgeQuestionText,
    relatedDisputes: [action.disputeId],
    turn: state.turnCount,
  })
  // LLM 폴백 시 재판관 질문 중복 방지
  setSkipNextJudgeQuestion(true)

  // 심문 이력 기록
  state.trackInterrogation(action.target, action.disputeId, action.questionType, state.turnCount)

  // sameActionRepeats: 같은 쟁점에 같은 질문 유형 3회+ 반복 감지 (임계 돌파 시 1회만)
  const updatedHistory = useGameStore.getState().interrogationHistory[action.target]?.[action.disputeId]
  if (updatedHistory) {
    const sameCount = updatedHistory.questionTypes.filter((t: string) => t === action.questionType).length
    if (sameCount === 3) state.trackMetric('sameActionRepeats')
  }

  // 메트릭 추적
  state.trackMetric('questionsAsked')
  // 질문 유형별 카운트 (재판관 성향 추적용)
  if (action.questionType === 'fact_pursuit') state.trackMetric('factQuestionsAsked')
  else if (action.questionType === 'motive_search') state.trackMetric('motiveQuestionsAsked')
  else if (action.questionType === 'empathy_approach') state.trackMetric('empathyQuestionsAsked')
  // bothSidesQuestioned: A와 B 모두 질문한 적 있는지 체크
  if (!state.processMetrics.bothSidesQuestioned) {
    const otherTarget = action.target === 'a' ? 'b' : 'a'
    const otherAsked = state.dialogueLog.some(d => d.speaker === otherTarget)
    if (otherAsked) state.trackMetric('bothSidesQuestioned')
  }

  // ── V4 전략적 차별화: 질문 유형별 다른 메커니즘 ──
  const triggers = questionTypeToTrigger(action.questionType)
  let didTransition = false

  const agent = action.target === 'a' ? state.agentA : state.agentB
  const lieEntry = agent.lieStateMap[action.disputeId]
  const currentLieState = lieEntry?.currentState ?? 'S0'

  // 상성 점수 (archetype 약점 반영)
  const affinityScore = lieEntry ? getAffinityScore(lieEntry.lieMotive, action.questionType) : 1.0
  const affinityGrade = getAffinityGrade(affinityScore)

  if (action.questionType === 'fact_pursuit') {
    // ── 모순에 집중하기: 모순 토큰 축적 → 임계치 도달 시 전이 ──
    // 같은 쟁점에 대해 사실추궁을 반복하면 모순 토큰 축적
    const contradictionKey = `${action.target}:${action.disputeId}:contradiction`
    const prevTokens = _contradictionTokens[contradictionKey] ?? 0
    const tokenGain = affinityGrade === 'strong' ? 2 : affinityGrade === 'weak' ? 0.5 : 1
    const newTokens = prevTokens + tokenGain
    // 임계치: S0~S1은 2회, S2+는 3회
    const threshold = currentLieState <= 'S1' ? 2 : 3

    // 토큰 저장 (모듈 레벨)
    _contradictionTokens[contradictionKey] = newTokens

    if (newTokens >= threshold) {
      // 임계치 도달 → 전이 시도
      _contradictionTokens[contradictionKey] = 0 // 리셋
      snapshotLieState(action.target, action.disputeId)
      for (const trigger of triggers) {
        const transitioned = state.transitionLie(action.target, action.disputeId, trigger)
        if (transitioned) {
          notifyLieTransition(action.target, action.disputeId)
          didTransition = true
          state.trackMetric('lieTransitions')
          state.trackMetric('effectiveFactCount')
          break
        }
      }
    } else {
      // 토큰 축적 중 — 관찰 패널에 기록 (Minor 티커/info 큐 폐기)
      const remaining = Math.ceil(threshold - newTokens)
      void remaining
      const s = useGameStore.getState()
      const tgtName = action.target === 'a' ? s.caseData?.duo.partyA.name : s.caseData?.duo.partyB.name
      s.addJudgeObservation({
        turnCount: s.turnCount,
        category: 'contradiction',
        iconId: 'i-bolt',
        title: '모순이 쌓이고 있다. 조금 더 추궁하면 균열이 생길 것 같다.',
        summary: tgtName ? `${tgtName} · 모순 축적` : '모순 축적',
        party: action.target,
        disputeId: action.disputeId,
        linkedDialogueId: findLinkedDialogueId(action.target),
      })
    }

  } else if (action.questionType === 'motive_search') {
    // ── 숨겨진 쟁점찾기: 전이는 느리지만 숨겨진 쟁점 발견 확률 증가 ──
    // 전이: 50% 확률 (상성 보정)
    const transitionChance = affinityGrade === 'strong' ? 0.7
      : affinityGrade === 'weak' ? 0.3
      : 0.5
    const roll = Math.random()

    if (roll < transitionChance) {
      snapshotLieState(action.target, action.disputeId)
      for (const trigger of triggers) {
        const transitioned = state.transitionLie(action.target, action.disputeId, trigger)
        if (transitioned) {
          notifyLieTransition(action.target, action.disputeId)
          didTransition = true
          state.trackMetric('lieTransitions')
          break
        }
      }
    }

    // 숨겨진 쟁점 발견 부스트: discovery 체크를 강제 실행
    // (runDiscoveryChecks가 이미 턴 끝에 실행되지만, motive_search는 추가 부스트)
    if (state.caseData) {
      const hiddenDisputes = state.caseData.disputes.filter(d => d.hidden && d.v3Visibility === 'hidden')
      for (const hd of hiddenDisputes) {
        // 이미 발견된 쟁점은 스킵
        if (state.discovery?.discoveredDisputes?.includes(hd.id)) continue
        // 동기탐색은 숨겨진 쟁점 발견 확률을 높임 (unlock 조건 완화)
        state.trackMetric('motiveSearchCount')
      }
    }

  } else if (action.questionType === 'empathy_approach') {
    // ── 자백 유도하기: 신뢰도 상승 + S3 이상에서 자발적 자백 가능 ──
    state.incrementEmpathyAtCurrentState(action.target)

    // 신뢰도: +12 base (line 974) + engine trust_boost (0.5x 감정 보너스) 로 통합
    // 여기서는 카운트만 증가, trust 중복 적용 방지

    // S3 이상에서: 같은 상태에서 공감 2회+ 누적되고 신뢰 임계치 도달 시 자발적 자백 (S5로 점프)
    if (currentLieState >= 'S3') {
      const freshAgent = action.target === 'a' ? useGameStore.getState().agentA : useGameStore.getState().agentB
      const trust = freshAgent.trustState.trustTowardJudge
      const empathyAtCurrentState = freshAgent.empathyAtCurrentState
      // 신뢰 70+ 이면 자백 유도 성공 (S5로)
      const gate = evaluateTruthBreakthroughGate({
        caseData: useGameStore.getState().caseData,
        evidenceStates: useGameStore.getState().evidenceStates,
        witnessSessions: useGameStore.getState().witnessSessions,
        party: action.target,
        disputeId: action.disputeId,
        agent: freshAgent,
        trigger: 'empathy_truth_breakthrough',
      })
      if (trust >= 100 && empathyAtCurrentState >= 2 && gate.canBreakthrough) {
        snapshotLieState(action.target, action.disputeId)
        state.forceSetLieState(action.target, action.disputeId, 'S5', {
          allowS5: true,
          breakthroughRoute: gate.route === 'blocked' ? 'trust' : gate.route,
        })
        notifyLieTransition(action.target, action.disputeId)
        didTransition = true
        state.trackMetric('lieTransitions')
        state.trackMetric('liesCollapsed')
        state.trackMetric('collapseViaTrustOrEmpathy')
      } else {
        // 신뢰 부족 — 일반 전이 시도
        snapshotLieState(action.target, action.disputeId)
        for (const trigger of triggers) {
          const transitioned = state.transitionLie(action.target, action.disputeId, trigger)
          if (transitioned) {
            notifyLieTransition(action.target, action.disputeId)
            didTransition = true
            state.trackMetric('lieTransitions')
            state.trackMetric('effectiveEmpathyCount')
            break
          }
        }
      }
    } else {
      // S0~S2: 신뢰 축적 + 3회 연속 실패 시 보장 전이
      const empathyKey = `${action.target}:${action.disputeId}:empathy_attempts`
      const prevAttempts = _empathyAttempts[empathyKey] ?? 0
      const newAttempts = prevAttempts + 1

      // 확률: 기본 50%, 상성 strong 70%. 3회 연속 미전이 시 100%
      const empathyChance = newAttempts >= 3 ? 1.0
        : affinityGrade === 'strong' ? 0.7
        : 0.5
      if (Math.random() < empathyChance) {
        _empathyAttempts[empathyKey] = 0 // 리셋
        snapshotLieState(action.target, action.disputeId)
        for (const trigger of triggers) {
          const transitioned = state.transitionLie(action.target, action.disputeId, trigger)
          if (transitioned) {
            notifyLieTransition(action.target, action.disputeId)
            didTransition = true
            state.trackMetric('lieTransitions')
            state.trackMetric('effectiveEmpathyCount')
            break
          }
        }
      } else {
        _empathyAttempts[empathyKey] = newAttempts
        state.addJudgeObservation({
          turnCount: state.turnCount,
          category: 'state',
          iconId: 'i-heart',
          title: '경계가 조금씩 풀리고 있다.',
          summary: '공감 접근 결과 · 신뢰 경로 단서',
          party: action.target,
          disputeId: action.disputeId,
          linkedDialogueId: findLinkedDialogueId(action.target),
        })
      }
    }
  }

  // S5 도달 후처리 (공통)
  if (didTransition) {
    const freshAgent = action.target === 'a' ? useGameStore.getState().agentA : useGameStore.getState().agentB
    const qNewState = freshAgent.lieStateMap[action.disputeId]?.currentState
    if (qNewState === 'S5') {
      state.trackMetric('liesCollapsed')
    }
    if (qNewState && (qNewState === 'S4' || qNewState === 'S5')) {
      const caseKey = normalizeCaseKey(state.caseData?.caseId ?? '')
      if (getNarrativeExpansion(caseKey, action.disputeId)) state.trackMetric('deepTruthsUnlocked')
    }
  }

  // 상성 메트릭 추적
  if (affinityGrade === 'best' || affinityGrade === 'good') {
    state.trackMetric('affinityHits')
  } else if (affinityGrade === 'weak' || affinityGrade === 'worst') {
    state.trackMetric('affinityMisses')
  }

  if (action.questionType === 'empathy_approach') {
    state.changeTrust(action.target, 'trustTowardJudge', 12)
  }

  // NPC 응답 — V2 structure가 있으면 V2 메커닉 활성화, beat까지 있으면 스크립트 사용
  const v2CaseId = normalizeCaseKey(state.caseData?.caseId ?? '')
  const { useBeatSelectorV2, useQuestionFatigueV2 } = useGameStore.getState().phase3Flags
  const v2StructureAvailable = !isFreeInterrogation && useBeatSelectorV2 && hasStructureV2(v2CaseId)
  const v2BeatAvailable = v2StructureAvailable && hasV2Data(v2CaseId)
  let v2BeatUsed = false

  if (v2StructureAvailable) {
    const v2Agent = action.target === 'a' ? state.agentA : state.agentB
    const v2Lie = v2Agent.lieStateMap[action.disputeId]
    if (v2Lie) {
      const emotionVal = v2Agent.emotionalState.internalValue
      const emotionTier = emotionVal >= 85 ? 'shutdown' : emotionVal >= 65 ? 'explosive' : emotionVal >= 40 ? 'agitated' : 'calm'
      const stanceGuess = ({ S0: 'deny', S1: 'hedge', S2: 'partial', S3: 'blame', S4: 'emotional', S5: 'confess' })[v2Lie.currentState] ?? 'deny'

      // 1. 쟁점 층/역할 판정
      const runtimeState = getBeatRuntimeState(v2CaseId)
      const layer = getActiveLayer(v2CaseId, action.disputeId, v2Lie.currentState, runtimeState.flags, new Set())
      const issueRole = getDisputeRole(v2CaseId, action.disputeId)
      const trustValue = (action.target === 'a' ? state.agentA : state.agentB).trustState.trustTowardJudge

      // 2. angleTag 파생
      const angleTag = deriveAngleTag({
        questionType: action.questionType,
        layer,
        issueRole,
        blockedVectors: [],
        angleTag: undefined,
      } as any)

      // 3. 피로도 선평가
      const fatigueAssessment = evaluateQuestionFatigue({
        turn: state.turnCount,
        party: action.target,
        disputeId: action.disputeId,
        questionType: action.questionType,
        angleTag,
        resetReason: 'none',
      }, getSessionFatigueState())

      // fatigue_extend 퍼크: 교착 시 각도 전환 기회 제공
      if (fatigueAssessment.shouldTriggerFatigueBeat && state.activePerks.angleSwitchOpportunity > 0) {
        state.setPendingPerkChoice({
          type: 'fatigue_extend',
          party: action.target,
          disputeId: action.disputeId,
        })
      }

      // 4. NPC 확률 반응 (E) — blueprint stance를 순응/저항/역공으로 흔든다
      const actionQuality = deriveActionQuality({
        affinityGrade: affinityGrade as any,
        questionType: action.questionType,
        angleTag,
        disputeKind: issueRole,
        fatigueLevel: fatigueAssessment.fatigueLevel,
        trustWindowValue: trustValue,
        blockedVectors: [],
      })
      const npcReaction = resolveNpcReaction({
        turn: state.turnCount,
        party: action.target,
        disputeId: action.disputeId,
        lieState: v2Lie.currentState,
        lieMotive: v2Lie.lieMotive,
        archetype: (action.target === 'a' ? state.caseData?.duo.partyA.archetype : state.caseData?.duo.partyB.archetype) ?? 'avoidant',
        disputeKind: issueRole,
        questionType: action.questionType,
        angleTag,
        fatigueLevel: fatigueAssessment.fatigueLevel,
        trustWindowValue: trustValue,
        blockedVectors: [],
        quality: actionQuality,
      }, { focusDisputeId: action.disputeId, stance: stanceGuess as any, defenseMode: 'flat_denial' as any, allowedClaimAtoms: [], forbiddenClaimAtoms: [], sentenceCount: 2, shouldCounterQuestion: false })

      // 적용된 stance/defenseMode를 beat selector에 전달
      const appliedStance = npcReaction.appliedStance
      const effectMultiplier = fatigueAssessment.finalMultiplier * npcReaction.effectMultiplier

      // 5. 피로도 피드백 시스템 메시지
      if (fatigueAssessment.fatigueLevel === 'high') {
        state.addDialogue({
          speaker: 'system',
          text: '[주의] 같은 접근이 반복되고 있습니다. 다른 질문 유형이나 쟁점을 시도해 보세요.',
          relatedDisputes: [action.disputeId],
          turn: state.turnCount,
        })
      } else if (fatigueAssessment.fatigueLevel === 'exhausted') {
        const qType = 'questionType' in action ? (action as { questionType: string }).questionType : ''
        const alternatives = ['사실 추궁', '동기 탐색', '공감 접근'].filter(t => {
          if (qType === 'fact_pursuit' && t === '사실 추궁') return false
          if (qType === 'motive_search' && t === '동기 탐색') return false
          if (qType === 'empathy_approach' && t === '공감 접근') return false
          return true
        })
        const targetName = action.target === 'a'
          ? (state.caseData?.duo.partyA.name ?? 'A')
          : (state.caseData?.duo.partyB.name ?? 'B')
        const otherPartyName = action.target === 'a'
          ? (state.caseData?.duo.partyB.name ?? '상대')
          : (state.caseData?.duo.partyA.name ?? '상대')
        void targetName
        state.addDialogue({
          speaker: 'system',
          text: `이 접근으로는 더 이상 진전이 어렵습니다. ${alternatives.join(' 또는 ')}으로 전환하거나, ${otherPartyName} 씨를 심문하거나, 다른 쟁점을 시도해 보세요.`,
          relatedDisputes: [action.disputeId],
          turn: state.turnCount,
        })
      }

      // V2 공통 처리: 피로도 커밋 + 미터 + misconception + 로그 (beat 유무와 무관)

      // Phase3 로그 수집: 턴별 스타일
      recordTurnStyle(action.questionType, angleTag)

      // 피로도 커밋
      setSessionFatigueState(commitQuestionFatigue({
        turn: state.turnCount,
        party: action.target,
        disputeId: action.disputeId,
        questionType: action.questionType,
        angleTag,
        resetReason: 'none',
      }, getSessionFatigueState()))

      // V2 미터에 피로도 × 반응 배율 적용
      state.applyQuestionEffect(
        action.questionType, action.target, action.disputeId,
        appliedStance, emotionTier,
        { externalMultiplier: effectMultiplier, bypassLegacyDiminish: true },
      )

      // 역공 시 authority 반영
      if (npcReaction.authorityDelta !== 0) {
        state.changeTrust(action.target, 'trustTowardJudge', npcReaction.authorityDelta * 3)
      }

      // Misconception 전이 시도 (red_herring / shared_misconception 쟁점)
      if (isMisconceptionDispute(action.disputeId)) {
        const lastJudgeLine = state.dialogueLog.filter(d => d.speaker === 'judge').pop()?.text ?? ''
        const matchedTrap = matchTrapSignal(action.disputeId, lastJudgeLine)
        const mcTrigger = deriveTriggerFromQuestion({
          disputeId: action.disputeId,
          turn: state.turnCount,
          questionType: action.questionType,
          angleTag,
          matchedTrapSignal: matchedTrap,
        })
        if (mcTrigger) {
          const mResult = applyMisconceptionTrigger(action.disputeId, mcTrigger)
          if (mResult?.changed) {
            console.log(`[V2 Misconception] ${action.disputeId}: ${mResult.from}→${mResult.to} (${mResult.trigger})`)
            for (const eff of mResult.effects) {
              if (eff.type === 'set_flag') runtimeState.flags.add(eff.flag)
              if (eff.type === 'clear_flag') runtimeState.flags.delete(eff.flag)
            }
          }
        }
      }

      console.log('[V2 Context]', npcReaction.outcome,
        `quality:${npcReaction.quality}`,
        `effect:${npcReaction.effectMultiplier}`,
        `stance:${appliedStance}`,
        `fatigue:${fatigueAssessment.fatigueLevel}`,
        `layer:${layer}`,
        npcReaction.debugNotes.join(' | '))

      // 6. 대사 생성 분기: beat가 있으면 스크립트, 없으면 LLM
      const beatLib = v2BeatAvailable ? getBeatLibrary(v2CaseId) : null
      if (beatLib) {
        const v3Transitions = getAllTransitionBeats(v2CaseId)
        const mergedLib = { beats: beatLib.beats, transitionBeats: v3Transitions }

        const prevLieState = _lieStateBeforeTransition[`${action.target}:${action.disputeId}`] ?? 'S0'
        const pendingTransition = prevLieState !== v2Lie.currentState
          ? { from: prevLieState, to: v2Lie.currentState }
          : null

        const presentation = selectTurnPresentation({
          turn: state.turnCount,
          caseId: v2CaseId,
          party: action.target,
          disputeId: action.disputeId,
          lieState: v2Lie.currentState,
          layer,
          issueRole,
          questionType: action.questionType,
          blueprint: { stance: appliedStance, allowedClaimAtoms: [], forbiddenClaimAtoms: [] },
          emotionTier: emotionTier as any,
          trustWindowValue: trustValue,
          fatigueLevel: fatigueAssessment.fatigueLevel,
          interjectionState: 'none',
          trapState: 'none',
          blockedVectors: [],
          pendingTransition,
          pendingEvent: null,
          flags: runtimeState.flags,
          usedBeatIds: runtimeState.usedBeatIds,
          usedAntiRepeatGroups: runtimeState.usedAntiRepeatGroups,
          beatUseCounts: runtimeState.beatUseCounts,
          cooldownUntilTurn: runtimeState.cooldownUntilTurn,
          angleTag: npcReaction.overrideAngleTag ?? undefined,
        }, mergedLib)

        if (presentation.main) {
          const beat = presentation.main.beat
          const beatLine = 'line' in beat ? beat.line : ''
          const beatHint = 'behaviorHint' in beat ? beat.behaviorHint : ''
          const isTransitionLane = presentation.main.lane === 'transition'

          if (isTransitionLane) {
            // transitionBeat.line은 3인칭 서술체 — 내레이션으로 처리 (당사자 말풍선 아님)
            if (beatLine) {
              state.addDialogue({
                speaker: action.target,
                text: beatLine,
                relatedDisputes: [action.disputeId],
                turn: state.turnCount,
                behaviorHint: beatHint,
              })
            }
            if (!beatLine && beatHint) {
              state.addDialogue({
                speaker: action.target,
                text: beatHint,
                relatedDisputes: [action.disputeId],
                turn: state.turnCount,
                source: 'fallback',
              })
            }
            if (!beatLine && !beatHint) {
              state.addDialogue({
                speaker: action.target,
                text: '지금은 그 부분을 바로 정리하기 어렵습니다. 질문의 범위를 좁혀 주십시오.',
                relatedDisputes: [action.disputeId],
                turn: state.turnCount,
                source: 'fallback',
              })
            }
          } else {
            state.addDialogue({
              speaker: action.target,
              text: beatLine,
              relatedDisputes: [action.disputeId],
              turn: state.turnCount,
              behaviorHint: beatHint,
            })
          }

          // Archetype 힌트: NPC 응답 직후 재판관의 관찰 표시
          maybeShowArchetypeHint(action.target, state.turnCount)

          if ('id' in beat && 'schemaVersion' in beat) {
            recordBeatUsed(v2CaseId, beat as BeatScriptV2, state.turnCount)
            const v2Beat = beat as BeatScriptV2
            if (v2Beat.truthEnvelope?.allowAtomIds) {
              for (const atomId of v2Beat.truthEnvelope.allowAtomIds) recordRevealedAtom(atomId)
            }
          }

          if (presentation.telemetry) {
            console.log('[V2 Beat]', presentation.telemetry.lane, presentation.telemetry.selectedBeatId,
              `score:${presentation.telemetry.selectedScore}`)
          }

          v2BeatUsed = true
        }
      }

      // beat 선택 실패 또는 beat 없음 → V2 컨텍스트를 store에 저장하여 LLM에서 참조
      if (!v2BeatUsed) {
        // V2 판정 결과를 LLM 프롬프트에 주입하기 위해 임시 저장
        useGameStore.getState()._v2Context = {
          layer,
          issueRole,
          angleTag,
          responseIntent: deriveResponseIntent({
            questionType: action.questionType,
            fatigueLevel: fatigueAssessment.fatigueLevel,
            issueRole,
            trapState: 'none',
          } as any),
          fatigueLevel: fatigueAssessment.fatigueLevel,
          npcReaction: npcReaction.outcome,
          appliedStance,
          effectMultiplier,
          misconceptionState: getMisconceptionState(action.disputeId),
        }
      }

      // 끼어들기는 gameEventTriggerEngine.checkInterjection 경로(V3)로 일원화됨
    }
  }

  if (!v2BeatUsed) {
    // 기존 LLM 경로
    await resolveAndApply(action, action.target, isConfidential)
    // Archetype 힌트: NPC 응답 직후 재판관의 관찰 표시
    maybeShowArchetypeHint(action.target, state.turnCount)
  }

  emitInterrogationMicroVfx(action.questionType, action.target, action.disputeId, didTransition)

  // 증거 발견: NPC 응답 이후 — 진술 내용에서 단서가 포착된 것처럼 연출
  if (didTransition) {
    discoverEvidenceFromQuestioning(action.target, action.disputeId, action.questionType)
  }

  // ── 회피 판독: 응답 후 거짓말 불안정도 표시 ──
  if (evasionTarget) {
    state.trackMetric('togglesUsed')
    showEvasionReadingResult(evasionTarget.target, evasionTarget.disputeId)
  }

  // 분리심문 턴 소모
  const sepState = useGameStore.getState()
  if (sepState.separationTarget) {
    const prevTurns = sepState.separationTurns
    sepState.tickSeparation()
    if (prevTurns <= 1) {
      useGameStore.getState().addDialogue({
        speaker: 'system',
        text: '[분리] 분리 심문 종료 — 상대측이 복귀합니다.',
        relatedDisputes: [],
        turn: useGameStore.getState().turnCount,
      })
    }
  }

  // ── 상대방 끼어들기 (구조적 반응 시스템) — V2에서 이미 처리했으면 스킵 ──
  // [차단 P-4 후속] 자동 끼어들기 별도 경로(V2 구조적 반응)도 자동 발동되어 시각 혼란 유발.
  // gameEventTriggerEngine 차단(L369·L1326)과 함께 V2 경로도 차단. 명시적 사용자 액션으로만 끼어들기 발생.
  if (false && !v2BeatUsed) {
  const opponent: PartyId = action.target === 'a' ? 'b' : 'a'
  const freshState = useGameStore.getState()
  const isSeparated = freshState.separationTarget === action.target
  const opponentAgent = opponent === 'a' ? freshState.agentA : freshState.agentB
  const hasOpponentStake = !!opponentAgent.lieStateMap[action.disputeId]

  if (!isSeparated && hasOpponentStake) {
    const opponentName = opponent === 'a' ? freshState.caseData?.duo.partyA.name : freshState.caseData?.duo.partyB.name
    const targetAgent = action.target === 'a' ? freshState.agentA : freshState.agentB
    const targetLie = targetAgent.lieStateMap[action.disputeId]

    // ① 강제 끼어들기: 비밀 탄로 (S4/S5 전이) → 상대 100% 반응
    const secretRevealed = didTransition && targetLie && (targetLie.currentState === 'S4' || targetLie.currentState === 'S5')

    // ② 강제 끼어들기: 상대가 자기를 직접 언급 (책임 전가 S3)
    const blameShifted = didTransition && targetLie?.currentState === 'S3'

    // ③ 확률 끼어들기: 감정 기반 (기존 로직 개선)
    const opponentAngry = opponentAgent.emotionalState.phase === 'angry' || opponentAgent.emotionalState.phase === 'confident'
    const phaseRate: Record<string, number> = { phase3: 0.25, phase4: 0.15, phase5: 0.1 }
    const baseRate = phaseRate[freshState.currentPhase] ?? 0.2
    const probabilisticInterrupt = opponentAngry ? Math.random() < baseRate + 0.25 : Math.random() < baseRate

    const shouldInterrupt = secretRevealed || blameShifted || probabilisticInterrupt

    if (shouldInterrupt) {
      // 끼어들기 유형에 따른 시스템 메시지
      let interruptMsg: string
      if (secretRevealed) {
        interruptMsg = `${iga(opponentName)} 충격을 받고 끼어든다!`
      } else if (blameShifted) {
        interruptMsg = `${iga(opponentName)} 참지 못하고 반박한다!`
      } else {
        interruptMsg = `💬 ${iga(opponentName)} 참지 못하고 끼어든다!`
      }

      freshState.addDialogue({
        speaker: 'system',
        text: interruptMsg,
        relatedDisputes: [action.disputeId],
        turn: freshState.turnCount,
      })

      // 상대 반응 — 끼어들기 맥락을 프롬프트에 전달
      const opponentAction: PlayerAction = {
        type: 'question',
        questionType: secretRevealed ? 'fact_pursuit' : action.questionType,
        target: opponent,
        disputeId: action.disputeId,
      }
      await resolveAndApply(opponentAction, opponent)
    }
  }
  } // end !v2BeatUsed interjection guard

  // ── optimalPath 추적 ──
  trackOptimalPath(action.disputeId, action.questionType)

  // Discovery 체크 — 질문 후
  runDiscoveryChecks(action.target, action.disputeId)

  // ── V2: LinkEdge 평가 ──
  if (v2BeatUsed) {
    const linkState = useGameStore.getState()
    const lieStates: Record<string, import('../types').LieState> = {}
    const activeLayers: Record<string, import('../types').IssueLayer> = {}
    const rState = getBeatRuntimeState(v2CaseId)

    for (const [did, entry] of Object.entries(linkState.agentA.lieStateMap)) {
      lieStates[did] = entry.currentState
      activeLayers[did] = getActiveLayer(v2CaseId, did, entry.currentState, rState.flags, new Set())
    }
    for (const [did, entry] of Object.entries(linkState.agentB.lieStateMap)) {
      if (!lieStates[did]) lieStates[did] = entry.currentState
      if (!activeLayers[did]) activeLayers[did] = getActiveLayer(v2CaseId, did, entry.currentState, rState.flags, new Set())
    }

    const linkResults = evaluateLinkEdges({ caseId: v2CaseId, lieStates, flags: rState.flags, activeLayers })

    // linkEdge → misconception 연결
    if (linkResults) {
      for (const activated of linkResults) {
        if (shouldFeedLinkIntoMisconception(activated.edge.fromDisputeId, activated.edge)) {
          const linkTrigger = deriveTriggerFromLink({
            disputeId: activated.edge.fromDisputeId,
            turn: linkState.turnCount,
            linkId: activated.edge.id,
          })
          if (linkTrigger) {
            const mcResult = applyMisconceptionTrigger(activated.edge.fromDisputeId, linkTrigger)
            if (mcResult?.changed) {
              console.log(`[V2 Misconception via Link] ${activated.edge.fromDisputeId}: ${mcResult.from}→${mcResult.to}`)
              for (const eff of mcResult.effects) {
                if (eff.type === 'set_flag') rState.flags.add(eff.flag)
                if (eff.type === 'clear_flag') rState.flags.delete(eff.flag)
              }
            }
          }
        }
      }
    }
  }

  // ── V3: 질문 효과 미터 적용 (V2에서 이미 적용했으면 스킵) ──
  {
    const v3State = useGameStore.getState()
    const v3Agent = action.target === 'a' ? v3State.agentA : v3State.agentB
    const v3Lie = v3Agent.lieStateMap[action.disputeId]
    if (v3Lie && !v2BeatUsed) {
      const emotionVal = v3Agent.emotionalState.internalValue
      const emotionTier = emotionVal >= 85 ? 'shutdown' : emotionVal >= 65 ? 'explosive' : emotionVal >= 40 ? 'agitated' : 'calm'
      // Blueprint의 stance를 근사 — lieState로 추정
      const stanceGuess = { S0: 'deny', S1: 'hedge', S2: 'partial', S3: 'blame', S4: 'emotional', S5: 'confess' }[v3Lie.currentState] ?? 'deny'
      v3State.applyQuestionEffect(action.questionType, action.target, action.disputeId, stanceGuess, emotionTier)
    }

    // ── V3: 이벤트 트리거 평가 ──
    const prevState = _lieStateBeforeTransition[`${action.target}:${action.disputeId}`] ?? 'S0'
    const newState = v3Lie?.currentState ?? prevState
    const transitions = prevState !== newState
      ? [{ party: action.target, disputeId: action.disputeId, from: prevState, to: newState }]
      : []
    // [결함 26·27 부활] 자동 이벤트 트리거 — D 옵션(시스템 메시지 + 클릭형)으로 모달 자동 표출이 차단된 상태라 안전.
    // 끼어들기 트리거 자체가 호출 안 되던 회귀 결함 해소. DiscoveryFeedbackWatcher가 pendingGameEvent를 D 옵션 클릭형으로 처리.
    // [B3 픽스] action.target을 명시 전달 — UI 탭(pcTargetParty)이 아닌 실제 추궁 대상자 기준으로 evaluateTurnEvents 평가
    v3State.evaluateTurnEvents(action.questionType, action.disputeId, transitions, action.target)

    // ── V3: lieState 전이 시각 피드백 + 전략 선택 모달 ──
    if (prevState !== newState) {
      const pName = action.target === 'a' ? v3State.caseData?.duo.partyA.name : v3State.caseData?.duo.partyB.name
      emitStateTransitionEvent(action.target, action.disputeId, prevState, newState, v3State.turnCount, pName ?? '')

      // 상태 전이 후 전략 선택 모달 (cracked/cornered/opening만, 턴당 1회)
      // 플레이어가 NPC 응답 메시지를 읽을 시간 확보 후 등장 (~2.5초)
      const transLabel = getTransitionLabel(prevState, newState)
      if ((transLabel === 'cracked' || transLabel === 'cornered' || transLabel === 'opening') && !_suppressTransitionChoice) {
        const payload = {
          label: transLabel,
          party: action.target,
          disputeId: action.disputeId,
          from: prevState,
          to: newState,
        } as const
        setTimeout(() => {
          useGameStore.getState().setPendingTransitionChoice(payload)
        }, 2500)
      }
    }
  }

  useGameStore.getState().incrementTurn()
  } finally { questionLock = false }
}

// ── 신뢰/보호 행동 ──
async function handleTrustAction(action: Extract<PlayerAction, { type: 'trust_action' }>) {
  const state = useGameStore.getState()

  state.addDialogue({
    speaker: 'judge',
    text: buildTrustActionText(action.actionType, action.target),
    relatedDisputes: [],
    turn: state.turnCount,
  })

  applyTrustEffect(action.actionType, action.target)
  state.trackMetric('trustActionsUsed')

  // 신뢰 행동도 lie 전이 트리거 가능
  const freshState = useGameStore.getState()
  const agent = action.target === 'a' ? freshState.agentA : freshState.agentB
  for (const [disputeId, entry] of Object.entries(agent.lieStateMap)) {
    if (entry.collapseViaTrust && entry.currentState !== 'S5') {
      const trustTrigger = `trust_${action.actionType}`
      const transitioned = freshState.transitionLie(action.target, disputeId, trustTrigger)
      if (transitioned) {
        notifyLieTransition(action.target, disputeId)
        const tAgent = action.target === 'a' ? useGameStore.getState().agentA : useGameStore.getState().agentB
        const tNewState = tAgent.lieStateMap[disputeId]?.currentState
        // deepTruthsUnlocked: S4+ 도달 시 narrativeExpansion 존재 여부
        if (tNewState && (tNewState === 'S4' || tNewState === 'S5')) {
          const caseKey = normalizeCaseKey(freshState.caseData?.caseId ?? '')
          if (getNarrativeExpansion(caseKey, disputeId)) freshState.trackMetric('deepTruthsUnlocked')
        }
      }
    }
  }

  const isConfidential = action.actionType === 'confidential_protection'

  // trust_action ScriptedText 우선
  const trustCaseKey = normalizeCaseKey(v3State.caseData?.caseId ?? '')
  const trustLieEntry = (action.target === 'a' ? v3State.agentA : v3State.agentB).lieStateMap[action.disputeId ?? '']
  const trustLieState = trustLieEntry?.currentState ?? 'S0'
  const trustScripted = getScriptedTrustAction(trustCaseKey, action.target, action.actionType, trustLieState)
  if (trustScripted) {
    v3State.addDialogue({
      speaker: action.target,
      text: trustScripted.text,
      behaviorHint: trustScripted.behaviorHint,
      relatedDisputes: action.disputeId ? [action.disputeId] : [],
      turn: v3State.turnCount,
      isConfidential,
    })
    // ScriptedText 분기: 타이핑 reveal 동안 핫바 락
    lockHotbarForScriptedReveal(trustScripted.text, action.target)
  } else {
    await resolveAndApply(action, action.target, isConfidential)
  }

  useGameStore.getState().incrementTurn()
}

// ── 공통: LLM 또는 폴백으로 대사 해석 ──
async function resolveAndApply(action: PlayerAction, target: PartyId, isConfidential = false) {
  let node: DialogueNode | null = null
  let llmMeta: { stance?: string; responseMode?: string; answerStyle?: string; mentionedTruthIds?: string[] } = {}
  const preState = useGameStore.getState()

  if (useLLMMode && preState.caseData) {
    preState.setLLMLoading(true, target)
    try {
      const freshState = useGameStore.getState()
      const result = await resolveLLMDialogue(
        action, freshState.agentA, freshState.agentB, freshState.evidenceStates, freshState.caseData!,
      )
      if (result) {
        node = result.node
        llmMeta = {
          stance: result.stance,
          responseMode: result.responseMode,
          answerStyle: result.answerStyle,
          mentionedTruthIds: result.mentionedTruthIds,
        }
      }
    } catch (e) {
      // AI 필수 — 실패 시 게임 중단 + 에러 배너
      console.error('[LLM] resolveAndApply 실패:', e)
      showLLMErrorBanner()
      useGameStore.getState().setLLMLoading(false)
      return
    }
    useGameStore.getState().setLLMLoading(false)
  }

  if (!node) {
    // AI 응답 없음 — 에러 배너 표시하고 중단
    console.error('[LLM] AI 응답 없음 — 게임 진행 중단')
    showLLMErrorBanner()
    return
  }

  applyDialogueNode(node, target, isConfidential)

  // LLM 모드: 주장 자동 등록 (stance 기반)
  if (llmMeta.stance && node.conditions?.disputeId) {
    const stanceToConfidence: Record<string, 'high' | 'medium' | 'low'> = {
      deny: 'high', hedge: 'medium', partial_admit: 'medium', admit: 'low', reframe: 'medium',
    }
    const stanceToStatus: Record<string, string> = {
      deny: 'normal', hedge: 'normal', partial_admit: 'changed', admit: 'collapsed', reframe: 'changed',
    }
    const summary = node.text.length > 60 ? node.text.slice(0, 57) + '...' : node.text
    const freshState = useGameStore.getState()

    // 모순 탐지: 이전 주장과 달라졌는지 체크
    const newClaimData = {
      claimant: target,
      disputeId: node.conditions.disputeId,
      summary,
      confidence: stanceToConfidence[llmMeta.stance] ?? 'medium',
      status: (stanceToStatus[llmMeta.stance] ?? 'normal') as any,
      turn: freshState.turnCount,
      isConfidential,
    }
    // 텍스트 기반 모순 감지 제거 — lie state 전이 기반으로 이동 (notifyLieTransition에서 처리)

    freshState.addClaim(newClaimData)
  }
}

function applyDialogueNode(node: DialogueNode, target: PartyId, isConfidential = false) {
  const state = useGameStore.getState()
  // node.id 패턴으로 출처 구분 — 디버그 배지용
  const source: 'script' | 'llm' | 'fallback' =
    node.id?.startsWith('scripted-') ? 'script'
    : node.id?.startsWith('llm-') ? 'llm'
    : node.id?.startsWith('fallback-') ? 'fallback'
    : 'llm'

  state.addDialogue({
    speaker: node.speaker,
    text: node.text,
    relatedDisputes: node.conditions.disputeId ? [node.conditions.disputeId] : [],
    turn: state.turnCount,
    behaviorHint: node.behaviorHint,
    isConfidential,
    source,
  })

  const effects = node.effects
  if (effects.lieTransition) {
    state.forceSetLieState(target, effects.lieTransition.disputeId, effects.lieTransition.to)
    notifyLieTransition(target, effects.lieTransition.disputeId)
  }
  if (effects.emotionalDelta) changeEmotionWithPhaseTracking(target, effects.emotionalDelta)
  if (effects.trustDelta) state.changeTrust(target, effects.trustDelta.field, effects.trustDelta.delta)
  if (effects.evidenceUnlock) {
    const evStates = state.evidenceStates
    if (evStates[effects.evidenceUnlock] && !evStates[effects.evidenceUnlock].unlocked) {
      useGameStore.setState((prev) => ({
        evidenceStates: {
          ...prev.evidenceStates,
          [effects.evidenceUnlock]: { ...prev.evidenceStates[effects.evidenceUnlock], unlocked: true },
        },
      }))
      playEvidenceUnlock()
      // 비공개 보호 하에 해금된 증거에 confidentialSource 마킹
      if (isConfidential) {
        state.markEvidenceConfidential(effects.evidenceUnlock)
      }
      enqueueNewEvidenceCutscene(effects.evidenceUnlock, {
        body: '발언에서 파생된 새 증거가 좌측 증거 목록에 추가되었습니다.',
      })
    }
  }
  if (effects.claimUpdate) {
    state.addClaim({
      claimant: target,
      disputeId: effects.claimUpdate.disputeId,
      summary: effects.claimUpdate.summary,
      confidence: effects.claimUpdate.confidence,
      status: 'normal',
      turn: state.turnCount,
      isConfidential,
    })
  }
}

const PHASE_LABELS: Record<string, string> = {
  defensive: '방어적',
  confident: '자신만만',
  shaken: '동요',
  angry: '분노',
  resigned: '체념',
}

/**
 * changeEmotion 래퍼 — phase 변경 시 시스템 메시지를 대화 로그에 추가.
 */
function changeEmotionWithPhaseTracking(party: PartyId, delta: number) {
  const state = useGameStore.getState()
  const agent = party === 'a' ? state.agentA : state.agentB
  const prevPhase = agent.emotionalState.phase
  state.changeEmotion(party, delta)
  const newAgent = party === 'a' ? useGameStore.getState().agentA : useGameStore.getState().agentB
  const newPhase = newAgent.emotionalState.phase
  if (newPhase !== prevPhase) {
    const name = party === 'a' ? state.caseData?.duo.partyA.name : state.caseData?.duo.partyB.name
    const prevLabel = PHASE_LABELS[prevPhase] ?? prevPhase
    const newLabel = PHASE_LABELS[newPhase] ?? newPhase

    let emotionText: string
    switch (newPhase) {
      case 'angry':
        emotionText = `${iga(name ?? '')} 폭발 직전이다!`
        break
      case 'shaken':
        emotionText = `${iga(name ?? '')} 흔들리고 있다...`
        break
      case 'resigned':
        emotionText = `${iga(name ?? '')} 지쳐 보인다.`
        break
      case 'confident':
        emotionText = `${iga(name ?? '')} 자신감을 되찾았다.`
        break
      default:
        emotionText = `${name}의 감정 변화: ${prevLabel} → ${newLabel}`
    }

    // 감정 페이즈 변화 — 채팅 배너 대신 관찰 패널에 기록 (재판관이 관찰하는 감정 변화)
    const s = useGameStore.getState()
    s.addJudgeObservation({
      turnCount: s.turnCount,
      category: 'slip',
      iconId: 'i-heart',
      title: emotionText,
      summary: `${name ?? ''} · ${prevLabel} → ${newLabel}`,
      party,
      linkedDialogueId: findLinkedDialogueId(party),
    })
  }
}

/**
 * 심문으로 인한 증거 발견.
 * NPC 응답 이후 호출 — 진술 내용에서 증거 단서가 포착된 것처럼 연출.
 * 거짓말 상태, 감정, 쟁점에 따라 발견 확률과 메시지가 달라짐.
 */
function discoverEvidenceFromQuestioning(party: PartyId, disputeId: string, questionType: QuestionType | 'contradiction_pursuit') {
  const state = useGameStore.getState()
  if (!state.caseData) return null

  // 단순 사실 추궁 반복은 증거 자동 발견 경로를 열지 않는다.
  // 명시적인 증거 조사/제시, 동기 탐색, 공감 접근, 모순 추궁만 별도 조건에서 진행한다.
  if (questionType === 'fact_pursuit') return null

  const name = party === 'a' ? state.caseData.duo.partyA.name : state.caseData.duo.partyB.name
  const agent = party === 'a' ? state.agentA : state.agentB
  const lieEntry = agent.lieStateMap[disputeId]
  const dispute = state.caseData.disputes.find(d => d.id === disputeId)

  // 이 쟁점을 증명하는 잠긴 증거 찾기 (선행 조건 충족된 것만)
  const lockedRelated = state.evidenceDefinitions.filter(e => {
    const rs = state.evidenceStates[e.id]
    if (!rs || rs.unlocked) return false
    if (!e.proves.includes(disputeId)) return false
    if (e.subjectParty && e.subjectParty !== 'both' && e.subjectParty !== party) return false
    // requires 조건 체크: 선행 증거가 모두 해금되어야 함
    if (e.requires && e.requires.length > 0) {
      const allRequiresMet = e.requires.every(reqId => state.evidenceStates[reqId]?.unlocked)
      if (!allRequiresMet) return false
    }
    if (e.requiredLieState) {
      const currentRank = getEvidenceCurrentLieRank(e, agent.lieStateMap)
      const requiredRank = LIE_STATE_RANK_FOR_UNLOCK[e.requiredLieState] ?? 0
      if (currentRank < requiredRank) return false
    }
    return true
  })

  if (lockedRelated.length === 0) return null

  // 발견 확률: 거짓말 상태가 깊을수록 높음
  const chanceByState: Record<string, number> = {
    S0: 0.15, S1: 0.25, S2: 0.40, S3: 0.55, S4: 0.70, S5: 0.90,
  }
  const chance = chanceByState[lieEntry?.currentState ?? 'S0'] ?? 0.2
  if (Math.random() > chance) return null

  const ev = lockedRelated[0]

  // 미니게임 자동 트리거 차단 — 증거 즉시 해금 (유저 결정)
  // 사용되지 않는 값들이지만 향후 복원 가능성 고려해 주석으로 보존
  void lieEntry; void name; void dispute
  actuallyDiscoverEvidence(ev.id, party)
  return ev.id
}

/** 미니게임 성공 시 실제 증거 해금 — 5단 대화 연출 */
export function actuallyDiscoverEvidence(evidenceId: string, partyOverride?: PartyId) {
  const state = useGameStore.getState()
  if (!state.caseData) return

  const ev = state.evidenceDefinitions.find(e => e.id === evidenceId)
  if (!ev) return

  const mg = state.pendingMinigame
  const lieState = mg?.lieState ?? 'S2'
  const party = partyOverride ?? mg?.party ?? (ev.subjectParty === 'a' || ev.subjectParty === 'b' ? ev.subjectParty : 'a')
  const fallbackPartyName = party === 'a' ? state.caseData.duo.partyA.name : state.caseData.duo.partyB.name
  const name = mg?.npcName ?? fallbackPartyName

  const { probe, slip, confirm } = getDiscoveryLines(ev, name, lieState)
  const discoverCaseKey = normalizeCaseKey(state.caseData?.caseId ?? '')

  // 1) 재판관 유도 질문
  const sProbe = getScriptedEvidenceDiscovery(discoverCaseKey, party, evidenceId, 'probe')
  state.addDialogue({ speaker: 'judge', text: sProbe?.text ?? probe, relatedDisputes: ev.proves, turn: state.turnCount })

  // 2) 당사자 실수 대사
  const sSlip = getScriptedEvidenceDiscovery(discoverCaseKey, party, evidenceId, 'slip')
  state.addDialogue({ speaker: party, text: sSlip?.text ?? slip, relatedDisputes: ev.proves, turn: state.turnCount, behaviorHint: sSlip?.behaviorHint ?? getSlipBehavior(lieState) })

  // 3) 시스템: 증거 포착
  const sCapture = getScriptedEvidenceDiscovery(discoverCaseKey, party, evidenceId, 'capture')
  state.addDialogue({ speaker: 'system', text: sCapture?.text ?? `${name}의 말에서 새로운 증거를 확보했다`, relatedDisputes: ev.proves, turn: state.turnCount })

  // 4) 재판관 확인 선언
  const sConfirm = getScriptedEvidenceDiscovery(discoverCaseKey, party, evidenceId, 'confirm')
  state.addDialogue({ speaker: 'judge', text: sConfirm?.text ?? confirm, relatedDisputes: ev.proves, turn: state.turnCount })

  // 5) 시스템: 증거 해금
  useGameStore.setState((prev) => ({
    evidenceStates: {
      ...prev.evidenceStates,
      [evidenceId]: { ...prev.evidenceStates[evidenceId], unlocked: true },
    },
  }))
  playEvidenceUnlock()
  state.trackMetric('evidenceDiscovered')
  const discoveredDisplayName = getEvidenceDisplayName(ev, useGameStore.getState().evidenceStates[ev.id])
  enqueueNewEvidenceCutscene(evidenceId, {
    body: `${discoveredDisplayName}${pp이가(discoveredDisplayName)} 심문 중 새 증거로 확보되었습니다.`,
  })
  state.addDialogue({
    speaker: 'system',
    text: `새 증거: ${discoveredDisplayName}`,
    relatedDisputes: ev.proves,
    turn: state.turnCount,
  })
}

/** 거짓말 상태에 따른 실수 행동 묘사 */
function getSlipBehavior(lieState: string): string {
  const behaviors: Record<string, string> = {
    S0: '무심코 말을 꺼내다 멈칫한다.',
    S1: '말끝이 흔들리며 시선을 피한다.',
    S2: '설명하다 자신도 모르게 말이 새어 나온다.',
    S3: '상대를 탓하다 의도치 않게 단서를 흘린다.',
    S4: '감정이 격해지며 입에서 튀어나온다.',
    S5: '체념한 듯 결국 내뱉는다.',
  }
  return behaviors[lieState] ?? '잠시 말을 멈추더니 다시 이어간다.'
}

/** 증거 유형 + 거짓말 상태에 따른 재판관 유도·당사자 실수·재판관 확인 */
function getDiscoveryLines(
  ev: { name: string; type: string },
  npcName: string,
  lieState: string,
): { probe: string; slip: string; confirm: string } {
  // 거짓말 상태별 실수 맥락 (당사자가 말을 흘리는 방식)
  const slipContext: Record<string, string> = {
    S0: '그때 그 일은… 아, 아닙니다. 그냥 제가 잘못 말했습니다.',
    S1: '그건… 사실 그때…',
    S2: '아니, 그러니까… 그것도 관련이 있긴 한데…',
    S3: '그쪽이야말로! …아, 그건 제가 말할 부분이 아니었는데.',
    S4: '그게 그렇게 된 건 — 아…',
    S5: '… 솔직히 말씀드리면, 그것도 있습니다.',
  }
  const ctx = slipContext[lieState] ?? '…'

  // 증거 유형별 3단 대사 — probe(유도) → slip(실수) → confirm(확인)
  const typeLines: Record<string, { probe: string; slip: string; confirm: string }> = {
    bank: {
      probe: `${npcName} 씨, 당시 금전 흐름에 대해 좀 더 구체적으로 설명해 주시겠습니까.`,
      slip: `${ctx} 그 돈 문제는… 거래 내역을 보시면 아시겠지만…`,
      confirm: `지금 거래 내역을 언급하셨습니다. 해당 금융 기록을 확인하겠습니다.`,
    },
    chat: {
      probe: `${npcName} 씨, 당시 관련 인물과 연락을 주고받은 적이 있습니까.`,
      slip: `${ctx} 그때 주고받은 메시지가 있긴 한데…`,
      confirm: `메시지 기록이 있다고 하셨습니다. 해당 대화 내용을 확보하겠습니다.`,
    },
    cctv: {
      probe: `${npcName} 씨, 그 시간대에 정확히 어디에 계셨는지 다시 한번 말씀해 주십시오.`,
      slip: `${ctx} 그 시간에 거기 있었던 건 맞는데… 카메라가 있는 줄은…`,
      confirm: `그 장소에 있었다고 인정하셨습니다. 영상 기록을 확인하겠습니다.`,
    },
    contract: {
      probe: `${npcName} 씨, 혹시 사전에 서로 합의하거나 약속한 부분이 있었습니까.`,
      slip: `${ctx} 그때 서로 약속한 게 있긴 했습니다…`,
      confirm: `약속이 있었다고 하셨습니다. 관련 문서를 확인하겠습니다.`,
    },
    testimony: {
      probe: `${npcName} 씨, 그 상황을 목격하거나 알고 있는 다른 사람이 있습니까.`,
      slip: `${ctx} 그 자리에 다른 사람도 있었는데…`,
      confirm: `제3자가 있었다고 하셨습니다. 해당 인물의 증언을 확보하겠습니다.`,
    },
    log: {
      probe: `${npcName} 씨, 당시 상황을 뒷받침할 기록이 남아 있습니까.`,
      slip: `${ctx} 기록을 보면 알 수 있을 텐데…`,
      confirm: `기록이 존재한다고 하셨습니다. 해당 로그를 확인하겠습니다.`,
    },
    device: {
      probe: `${npcName} 씨, 그 시점에 휴대폰이나 기기를 사용하신 적이 있습니까.`,
      slip: `${ctx} 그때 폰으로 확인한 건 맞는데…`,
      confirm: `기기를 사용한 사실을 인정하셨습니다. 해당 데이터를 확보하겠습니다.`,
    },
    sns: {
      probe: `${npcName} 씨, 이 건과 관련해 온라인에 게시하거나 공유한 적이 있습니까.`,
      slip: `${ctx} 그게 온라인에 올라간 건 맞지만…`,
      confirm: `온라인 게시 사실을 인정하셨습니다. 해당 게시물을 확인하겠습니다.`,
    },
  }

  return typeLines[ev.type] ?? {
    probe: `${npcName} 씨, 이 부분에 대해 좀 더 자세히 설명해 주시겠습니까.`,
    slip: `${ctx} 그것도 사실 관련이 있긴 합니다…`,
    confirm: `지금 하신 말씀에서 단서가 포착됐습니다. 관련 자료를 확인하겠습니다.`,
  }
}

/** 회피 판독 결과 표시 — 해당 쟁점의 거짓말 불안정도 공개 */
function showEvasionReadingResult(party: PartyId, disputeId: string) {
  const state = useGameStore.getState()
  if (!state.caseData) return
  const agent = party === 'a' ? state.agentA : state.agentB
  const name = party === 'a' ? state.caseData.duo.partyA.name : state.caseData.duo.partyB.name
  const dispute = state.caseData.disputes.find(d => d.id === disputeId)
  const lieEntry = agent.lieStateMap[disputeId]

  if (!lieEntry || !dispute) return

  const intensityLabel = (lieEntry as any).lieIntensity === 'L1' ? '매우 불안정'
    : (lieEntry as any).lieIntensity === 'L2' ? '불안정'
    : '강하게 방어 중'
  const stateLabel: Record<string, string> = {
    S0: '완강히 부정', S1: '동요 중', S2: '일부 인정', S3: '책임 전가', S4: '감정 호소', S5: '인정',
  }

  state.addDialogue({
    speaker: 'system',
    text: `${name}의 속마음 — ${intensityLabel}`,
    relatedDisputes: [disputeId],
    turn: state.turnCount,
  })
}

/** lie state 전이 이전 상태를 추적하기 위한 스냅샷 */
const _lieStateBeforeTransition: Record<string, string> = {}

/** 전이 시도 전에 호출하여 이전 상태 저장 */
export function snapshotLieState(party: PartyId, disputeId: string) {
  const state = useGameStore.getState()
  const agent = party === 'a' ? state.agentA : state.agentB
  const current = agent.lieStateMap[disputeId]?.currentState ?? 'S0'
  _lieStateBeforeTransition[`${party}:${disputeId}`] = current
}

/** 관찰 엔트리와 연결할 직전 NPC 발언 id 찾기 (party 우선, 없으면 any NPC) */
export function findLinkedDialogueId(party?: PartyId): string | undefined {
  const log = useGameStore.getState().dialogueLog
  for (let i = log.length - 1; i >= 0; i -= 1) {
    const e = log[i]
    if (party) {
      if (e.speaker === party) return e.id
    } else {
      if (e.speaker === 'a' || e.speaker === 'b') return e.id
    }
  }
  return undefined
}

function emitInterrogationMicroVfx(
  questionType: QuestionType,
  target: PartyId,
  disputeId: string,
  didTransition: boolean,
): void {
  const meta = getInterrogationMicroVfx(questionType)
  if (!meta) return

  const state = useGameStore.getState()
  if (meta.tone === 'aura') {
    state.enqueueAura({ targetSelector: `[data-resonance-target="trust-${target}"]` })
  } else {
    state.setLastFocusedDisputeId(disputeId)
  }

  const partyName = target === 'a' ? state.caseData?.duo.partyA.name : state.caseData?.duo.partyB.name
  const disputeName = state.caseData?.disputes.find((item) => item.id === disputeId)?.name ?? disputeId

  state.addJudgeObservation({
    turnCount: state.turnCount,
    category: meta.category,
    iconId: meta.iconId,
    title: meta.label,
    summary: partyName ? `${partyName} · ${disputeName}` : disputeName,
    party: target,
    disputeId,
    linkedDialogueId: findLinkedDialogueId(target),
  })

  if (didTransition && meta.tone === 'reveal') {
    state.setLastFocusedDisputeId(disputeId)
  }
}

function notifyLieTransition(party: PartyId, disputeId: string) {
  const state = useGameStore.getState()
  const agent = party === 'a' ? state.agentA : state.agentB
  const name = party === 'a' ? state.caseData?.duo.partyA.name : state.caseData?.duo.partyB.name
  const dispute = state.caseData?.disputes.find((d) => d.id === disputeId)
  const newState = agent.lieStateMap[disputeId]?.currentState
  const prevState = _lieStateBeforeTransition[`${party}:${disputeId}`] ?? 'S0'

  // S4/S5에 도달하면 revealed 마킹
  if (newState && (newState === 'S4' || newState === 'S5')) {
    state.markRevealed(party, disputeId)
  }
  const labels: Record<string, string> = {
    S1: '방어적 태도를 보이기 시작했다',
    S2: '답변에 변화가 감지된다',
    S3: '감정이 동요하고 있다',
    S4: '심리적 압박이 커지고 있다',
    S5: '진실파악 5단계에 도달했다',
  }
  if (newState && labels[newState]) {
    if (newState === 'S5') {
      const currentEmotion = (party === 'a' ? state.agentA : state.agentB).emotionalState.internalValue
      if (currentEmotion < 85) {
        changeEmotionWithPhaseTracking(party, 85 - currentEmotion)
      }
      v4Effects.confession(party, name, {
        turn: state.turnCount,
        caseId: state.caseData?.caseId,
        phase: state.currentPhase,
      })
    }
    // S1~S4: v4 newFact 배너 제거 — 통합 피드백 카드가 대체 (사운드 필요 시 이후 개별 추가)
    if (newState === 'S5') {
      state.addJudgeObservation({
        turnCount: state.turnCount,
        category: 'state',
        iconId: 'i-flame',
        title: '진실파악 5단계에 도달했습니다.',
        summary: name && dispute ? `${name} · ${dispute.name}` : `${name ?? '당사자'} · ${disputeId}`,
        party,
        disputeId,
        linkedDialogueId: findLinkedDialogueId(party),
      })
    } else {
      // S1~S4 상태 변화 — NPC 말풍선 읽은 뒤 관찰 패널에 기록 (Minor 티커 폐기)
      setTimeout(() => {
        const current = useGameStore.getState()
        current.addJudgeObservation({
          turnCount: current.turnCount,
          category: 'state',
          iconId: 'i-person',
          title: labels[newState],
          summary: name ? `${name} · ${prevState} → ${newState}` : `${prevState} → ${newState}`,
          party,
          disputeId,
          linkedDialogueId: findLinkedDialogueId(party),
        })
      }, 1500)
    }

    // S5 도달 시 재판관 유도문만 남기지 않고 당사자 자백/정리 답변까지 보장
    if (newState === 'S5') {
      state.addDialogue({
        speaker: 'judge',
        text: `${name} 씨, 지금 인정한 핵심을 분명히 정리해 주십시오.`,
        relatedDisputes: [disputeId],
        turn: state.turnCount,
      })
      const emittedConfession = dispatchS5ConfessionAnswer(party, disputeId)
      if (!emittedConfession) {
        state.addDialogue({
          speaker: party,
          text: '…맞습니다. 더 숨기지 않겠습니다. 제가 알고 있는 사실을 정리해 말씀드리겠습니다.',
          relatedDisputes: [disputeId],
          turn: state.turnCount,
          behaviorHint: '핵심 사실을 더 이상 부인하지 않는다.',
          source: 'fallback',
        })
      }
    }

    // S5 도달 시 진실 발견 + 정답지 기록
    if (newState === 'S5' && dispute) {
      // 관련 truthTable에서 해당 쟁점의 진실 찾아서 발견 처리
      const caseData = state.caseData
      if (caseData) {
        const disputeIdx = caseData.disputes.findIndex(d => d.id === disputeId)
        if (disputeIdx >= 0) {
          const truthId = caseData.truthTable[disputeIdx]?.id ?? `t-${disputeIdx + 1}`
          const truth = caseData.truthTable[disputeIdx]

          // 진실 발견 기록
          if (!state.discovery.discoveredTruths.includes(truthId)) {
            state.addDiscoveredTruth(truthId)
            // [Phase C-5] 결정적 진술 → 자백은 증거 아닌 발화. 증거 게시판 안내 결함.
            // 재판관의 수첩(JudgeNotebookSlice)에 핵심 발화 등록 + 안내 메시지 변경.
            const truthDispute = caseData.disputes.find((d: { id: string }) => d.id === disputeId)
            const partyName = party === 'a'
              ? caseData.duo.partyA.name
              : caseData.duo.partyB.name
            // 마지막 NPC 발화 id 추출 (수첩 jump용)
            const lastNpcDialogue = [...state.dialogueLog].reverse().find((d: { speaker: string }) => d.speaker === party)
            state.addNotebookEntry?.({
              turnCount: state.turnCount,
              category: 'key_statement',
              iconId: 'i-flame',
              title: `${partyName}의 결정적 진술 - ${truthDispute?.name ?? disputeId}`,
              summary: truth?.summary ?? '',
              party,
              disputeId,
              linkedDialogueId: lastNpcDialogue?.id,
            })
          }

          // 정답지에 자동 기록
          state.setFactFinding(disputeId, dispute.truth ? 'true' : 'false')
        }
      }
    }
  }

  // ── 모순 감지: 부정→인정 전이 시 이전 주장과의 실질적 모순 ──
  // S0/S1(부정) → S2+(인정) 으로 넘어갈 때만 모순 발생 (같은 구간 내 전이는 모순 아님)
  const DENIAL_STATES = ['S0', 'S1']
  const ADMISSION_STATES = ['S2', 'S3', 'S4', 'S5']
  const crossedBoundary = DENIAL_STATES.includes(prevState) && ADMISSION_STATES.includes(newState ?? '')

  if (crossedBoundary && dispute) {
    // 이전 부정 단계에서의 주장 찾기
    const prevClaims = state.claimGraph.filter(
      (c) => c.claimant === party && c.disputeId === disputeId,
    )
    if (prevClaims.length > 0) {
      const previousClaim = prevClaims[prevClaims.length - 1].summary
      const latestTargetLine = [...state.dialogueLog]
        .reverse()
        .find((entry) => entry.speaker === party && entry.relatedDisputes?.includes(disputeId) && entry.text.trim().length > 0)
      const currentClaim = latestTargetLine?.text ?? ''

      const transitionDesc: Record<string, string> = {
        'S0→S2': `말씀이 조금씩 달라지고 있습니다`,
        'S0→S3': `처음과 다르게 흔들리는 모습입니다`,
        'S0→S4': `상당히 다른 이야기를 하고 계십니다`,
        'S0→S5': `처음 입장을 완전히 바꾸셨습니다`,
        'S1→S2': `말씀이 조금씩 달라지고 있습니다`,
        'S1→S3': `처음과 다르게 흔들리는 모습입니다`,
        'S1→S4': `상당히 다른 이야기를 하고 계십니다`,
        'S1→S5': `처음 입장을 완전히 바꾸셨습니다`,
      }
      const desc = transitionDesc[`${prevState}→${newState}`] ?? `처음 하신 말씀과 지금이 다릅니다`

      const contradictionMeta = {
        party,
        disputeId,
        previousClaim,
        currentClaim: currentClaim || desc,
        reason: '이전에는 부인하던 쟁점이 현재 설명에서는 일부 인정되거나 다른 맥락으로 바뀌었습니다.',
        previousLabel: '이전 발언 A',
        currentLabel: '현재 발언 B',
      }

      if (hasContradictionComparison(contradictionMeta)) {
        v4Effects.contradiction(party, previousClaim, desc, disputeId, {
          turn: state.turnCount,
          caseId: state.caseData?.caseId,
          phase: state.currentPhase,
        })
        state.addDialogue({
          speaker: 'system',
          text: `${name}의 진술에서 이전과 다른 점이 발견되었습니다. — 추궁하기`,
          relatedDisputes: [disputeId],
          turn: state.turnCount,
          contradictionMeta,
        })
      }
    }
  }
}

/** lie_collapse 미니게임 성공 시 추가 보상 처리 */
export function applyLieCollapseSuccess(disputeId: string, party: PartyId) {
  const state = useGameStore.getState()
  const agent = party === 'a' ? state.agentA : state.agentB

  // 관련 잠긴 증거 1개 해금 시도
  const lockedEv = state.evidenceDefinitions.find(
    (e) => e.proves.includes(disputeId) && !state.evidenceStates[e.id]?.unlocked
  )

  if (lockedEv) {
    const displayName = getEvidenceDisplayName(lockedEv, state.evidenceStates[lockedEv.id])
    useGameStore.setState((prev) => ({
      evidenceStates: {
        ...prev.evidenceStates,
        [lockedEv.id]: { ...prev.evidenceStates[lockedEv.id], unlocked: true },
      },
    }))
    playEvidenceUnlock()
    enqueueNewEvidenceCutscene(lockedEv.id, {
      body: `${displayName}${pp이가(displayName)} 붕괴 보상으로 확보되었습니다.`,
    })
    state.addDialogue({
      speaker: 'system',
      text: `완벽하게 간파했다! 새 증거가 해금된다 — ${displayName}`,
      relatedDisputes: lockedEv.proves,
      turn: state.turnCount,
    })
  } else {
    state.addDialogue({
      speaker: 'system',
      text: `완벽하게 간파했다! 결정적 순간을 놓치지 않았다.`,
      relatedDisputes: [disputeId],
      turn: state.turnCount,
    })
  }
}

/** lie_collapse 미니게임 실패 시 처리 */
export function applyLieCollapseFail(disputeId: string) {
  const state = useGameStore.getState()
  state.addDialogue({
    speaker: 'system',
    text: `방어가 무너졌지만, 결정적 증거는 놓쳤다...`,
    relatedDisputes: [disputeId],
    turn: state.turnCount,
  })
}

/** contradiction 미니게임 성공 시 처리 */
export function applyContradictionSuccess(disputeId: string, target: PartyId) {
  const state = useGameStore.getState()
  const name = target === 'a' ? state.caseData?.duo.partyA.name : state.caseData?.duo.partyB.name
  const dispute = state.caseData?.disputes.find(d => d.id === disputeId)

  // 모순 짚어냄 메시지
  state.addDialogue({
    speaker: 'system',
    text: `모순을 정확히 짚어냈다!`,
    relatedDisputes: disputeId ? [disputeId] : [],
    turn: state.turnCount,
  })

  // 보상 1: 감정 +15 (큰 동요)
  changeEmotionWithPhaseTracking(target, 15)

  // 보상 2: 거짓말 전이 시도
  const transitioned = state.transitionLie(target, disputeId, 'hard_evidence')
  if (transitioned) {
    notifyLieTransition(target, disputeId)
    state.addDialogue({
      speaker: 'system',
      text: `${name}의 방어가 흔들렸다! 진술이 달라지기 시작한다.`,
      relatedDisputes: [disputeId],
      turn: state.turnCount,
    })
  } else {
    state.addDialogue({
      speaker: 'system',
      text: `💡 ${name}에게 심리적 압박을 가했다.`,
      relatedDisputes: [disputeId],
      turn: state.turnCount,
    })
  }
}

/** contradiction 미니게임 실패 시 처리 */
export function applyContradictionFail(disputeId: string) {
  const state = useGameStore.getState()
  state.addDialogue({
    speaker: 'system',
    text: `모순의 핵심을 놓쳤다...`,
    relatedDisputes: disputeId ? [disputeId] : [],
    turn: state.turnCount,
  })
}

function questionTypeToTrigger(type: QuestionType): string[] {
  const map: Record<QuestionType, string[]> = {
    fact_pursuit: ['direct_question', 'timeline_question'],
    motive_search: ['motive_question', 'context_question'],
    empathy_approach: ['empathy_question', 'provenance_question'],
  }
  return map[type] ?? ['direct_question']
}

function applyTrustEffect(actionType: string, target: PartyId) {
  const s = useGameStore.getState()
  switch (actionType) {
    case 'confidential_protection':
      // 비공개보호: 법정 지배력 1 소비
      if (s.resources.courtControl >= 1) {
        s.spend('courtControl', 1)
        window.dispatchEvent(new CustomEvent('pc:court-control-used', {
          detail: { action: 'confidential_protection', label: '비공개 보호' },
        }))
        s.changeTrust(target, 'trustTowardJudge', 20)
        s.changeTrust(target, 'fearOfExposure', -15)
      } else {
        s.addDialogue({ speaker: 'system', text: `법정 지배력이 부족합니다.`, relatedDisputes: [], turn: s.turnCount })
      }
      break
    case 'separation':
      // 분리심문: 법정 지배력 1 소비, 3턴간 상대 배제
      if (s.resources.courtControl >= 1) {
        s.spend('courtControl', 1)
        window.dispatchEvent(new CustomEvent('pc:court-control-used', {
          detail: { action: 'separation', label: '분리 심문' },
        }))
        s.startSeparation(target, 3)
        playSeparation()
        s.changeTrust(target, 'retaliationWorry', -10)
        s.addDialogue({ speaker: 'system', text: `[분리] 분리 심문 시작 — 3턴간 상대측이 배제됩니다.`, relatedDisputes: [], turn: s.turnCount })
      } else {
        s.addDialogue({ speaker: 'system', text: `법정 지배력이 부족합니다.`, relatedDisputes: [], turn: s.turnCount })
      }
      break
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 재판관 질문 풀 — 6 풀 × 10개 (GPT Pro 작성, 변수: ${myName} ${topic} ${opName})
// 출처: gpt-pro-runs/npc-hook-and-judge-questions/output/proposals-B-judge-questions.json
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const FACT_POOL_SOFT = [
  '${myName} 씨, ${topic} 당시 처음 확인한 사실부터 차례대로 말씀해 주십시오.',
  '${myName} 씨, ${topic}에 대해 처음 어떻게 알게 되었는지 경위를 설명해 주십시오.',
  '${myName} 씨, ${topic} 직전에는 어떤 일이 있었습니까?',
  '${myName} 씨, ${topic} 당시 옆에 있었거나 내용을 들은 사람이 있었습니까?',
  '${myName} 씨, ${topic} 이후에 누구에게 먼저 말했는지 말씀해 주십시오.',
  '${myName} 씨, ${topic}에 관해 직접 본 것과 나중에 들은 것을 나누어 말씀해 주십시오.',
  '${myName} 씨, ${topic}에서 시간 순서가 중요합니다. 먼저 일어난 일부터 짚어 주십시오.',
  '${myName} 씨, ${topic} 관련해서 확인할 수 있는 메시지나 계좌 기록이 있습니까?',
  '${myName} 씨, ${topic}에 대해 ${opName} 씨의 말과 다른 부분이 있습니다. 어느 쪽이 사실입니까?',
  '${myName} 씨, ${topic} 당시 본인이 직접 한 행동만 분명히 말씀해 주십시오.',
]
const FACT_POOL_HARD = [
  '${myName} 씨, ${topic}에 대한 말씀이 앞뒤가 맞지 않습니다. 지금 확인된 사실만 답하십시오.',
  '${myName} 씨, ${topic} 당시의 시간을 더 흐리지 마십시오. 직전과 직후의 행동을 분명히 말하십시오.',
  '${myName} 씨에게 묻습니다, ${topic}에 대해 직접 본 사실과 추측을 섞지 말고 구분하십시오.',
  '${myName} 씨, ${topic} 관련 기록이 남아 있다면 무엇이 남아 있는지 바로 말씀하십시오.',
  '${myName} 씨, ${opName} 씨의 설명과 충돌하는 부분이 있습니다. ${topic}에서 어느 대목을 부인하십니까?',
  '${myName} 씨, ${topic}에 대해 말을 바꾼 이유부터 설명하십시오.',
  '${myName} 씨, ${topic} 당시 누가 있었는지 숨김없이 밝히십시오.',
  '${myName} 씨, ${topic} 전후로 연락한 사람과 내용을 빠짐없이 말씀하십시오.',
  '${myName} 씨, ${topic}에서 본인에게 불리한 부분을 피하고 있습니다. 그 부분까지 답하십시오.',
  '${myName} 씨, ${topic}에 관해 지금 모른다고 넘길 수 없습니다. 알고 있는 사실을 끝까지 말하십시오.',
]
const MOTIVE_POOL_SOFT = [
  '${myName} 씨, ${topic}에 대해 그렇게 판단한 결정적 이유가 무엇이었습니까?',
  '${myName} 씨, ${topic} 당시 다른 선택지를 생각해 보셨습니까?',
  '${myName} 씨, ${topic}에서 왜 하필 그 시점에 움직였는지 설명해 주십시오.',
  '${myName} 씨, ${topic} 관련해서 가장 먼저 지키려 했던 것은 무엇입니까?',
  '${myName} 씨, ${topic}에 대해 누구의 말을 가장 크게 의식했습니까?',
  '${myName} 씨, ${topic} 당시 ${opName} 씨에게 바로 말하지 않은 이유가 있습니까?',
  '${myName} 씨, ${topic}에서 손해를 감수하고도 그렇게 한 이유를 말씀해 주십시오.',
  '${myName} 씨, ${topic}에 대해 숨기거나 미룬 이유가 있었다면 지금 말씀하십시오.',
  '${myName} 씨, ${topic}에 대해 본인이 옳다고 믿은 근거는 무엇이었습니까?',
  '${myName} 씨, ${topic} 당시 가장 피하고 싶었던 결과가 무엇이었습니까?',
]
const MOTIVE_POOL_HARD = [
  '${myName} 씨, ${topic}에 대한 이유를 계속 피해 가고 있습니다. 왜 그렇게 했는지 직접 답하십시오.',
  '${myName} 씨, ${topic}에서 본인을 보호하려 한 겁니까, ${opName} 씨를 속이려 한 겁니까?',
  '${myName} 씨, ${topic} 관련 사실을 숨긴 목적이 무엇이었는지 분명히 말씀하십시오.',
  '${myName} 씨, ${topic} 당시 불리해질 것을 알고도 진행한 이유가 무엇입니까?',
  '${myName} 씨에게 묻습니다, ${topic}에서 책임을 피하려 한 의도가 있었습니까?',
  '${myName} 씨, ${topic}에 대해 선의였다고만 말하지 마십시오. 실제로 얻으려 한 것이 무엇입니까?',
  '${myName} 씨, ${topic}에 대해 지금까지 말하지 않은 이유가 변명인지 사정인지 구분해 말씀하십시오.',
  '${myName} 씨, ${topic}에서 가장 먼저 계산한 것은 돈입니까, 관계입니까, 체면입니까?',
  '${myName} 씨, ${topic} 관련해서 상대가 알면 불리하다고 판단한 대목이 무엇입니까?',
  '${myName} 씨, ${topic}에 대해 지금도 같은 선택을 했을 거라고 보십니까? 그 이유까지 답하십시오.',
]
const EMPATHY_POOL_SOFT = [
  '${myName} 씨, ${topic} 당시 가장 먼저 든 감정이 무엇이었습니까?',
  '${myName} 씨, ${topic} 이후에 밤에는 잠을 제대로 주무셨습니까?',
  '${myName} 씨, ${topic}에 대해 말하지 못한 마음이 있었다면 말씀해 주십시오.',
  '${myName} 씨, ${topic} 당시 누구에게 가장 서운했습니까?',
  '${myName} 씨, ${topic}에서 가장 두려웠던 일이 무엇이었습니까?',
  '${myName} 씨, ${topic} 이야기를 떠올리면 지금도 후회되는 장면이 있습니까?',
  '${myName} 씨, ${topic}에 대해 ${opName} 씨가 알아주길 바랐던 마음이 있었습니까?',
  '${myName} 씨, ${topic} 당시 혼자 감당하려 했던 이유가 있습니까?',
  '${myName} 씨, ${topic} 이야기를 하는 지금 가장 힘든 부분은 무엇입니까?',
  '${myName} 씨, ${topic}에 대해 스스로도 인정하기 어려웠던 감정이 있었습니까?',
]
const EMPATHY_POOL_HARD = [
  '${myName} 씨, ${topic}에 대해 마음이 힘들다는 점은 알겠습니다. 그래도 어떤 감정이 행동으로 이어졌는지 말씀하십시오.',
  '${myName} 씨, ${topic}에 대해 두려웠다는 말만으로는 부족합니다. 무엇이 가장 두려웠는지 정확히 답하십시오.',
  '${myName} 씨, ${topic}에서 상처받은 마음과 숨긴 사실을 나누어 말씀하십시오.',
  '${myName} 씨, ${topic} 때문에 ${opName} 씨를 원망했다면 그 이유를 분명히 말하십시오.',
  '${myName} 씨에게 묻습니다, ${topic} 당시 죄책감이 있었습니까, 아니면 억울함이 더 컸습니까?',
  '${myName} 씨, ${topic}에 대해 감정 뒤에 숨어서는 안 됩니다. 그 감정이 어떤 선택을 낳았습니까?',
  '${myName} 씨, ${topic} 이야기를 떠올리기 싫더라도 지금은 답해야 합니다. 가장 후회되는 대목을 말하십시오.',
  '${myName} 씨, ${topic}에서 본인이 상처받은 만큼 상대도 다쳤다는 점을 알고 있었습니까?',
  '${myName} 씨, ${topic}에 대해 미안함이 있었다면 왜 그때 말하지 않았습니까?',
  '${myName} 씨, ${topic} 당시의 마음을 말하되, 책임질 부분을 흐리지 말고 답하십시오.',
]

function buildQuestionText(type: QuestionType, target: PartyId, disputeId: string): string {
  const s = useGameStore.getState()
  if (!s.caseData) return '말씀해 주십시오.'
  const myName = target === 'a' ? s.caseData.duo.partyA.name : s.caseData.duo.partyB.name
  const opName = target === 'a' ? s.caseData.duo.partyB.name : s.caseData.duo.partyA.name
  const dispute = s.caseData.disputes.find((d) => d.id === disputeId)
  const agent = target === 'a' ? s.agentA : s.agentB
  const lieEntry = agent.lieStateMap[disputeId]
  const lieState = lieEntry?.currentState ?? 'S0'
  const turn = s.turnCount

  // 쟁점명에서 대상 이름을 제거하고 자연스러운 주제로 변환
  const rawTopic = dispute?.name ?? '해당 사안'
  const myGiven = myName.slice(1)
  const opGiven = opName.slice(1)
  let topic = extractDisputeSubject(rawTopic)
  if (topic.includes(myGiven + '의 ')) {
    topic = topic.replace(myGiven + '의 ', '')
  } else if (topic.includes(myGiven + '이 ') || topic.includes(myGiven + '가 ')) {
    topic = topic.replace(new RegExp(myGiven + '[이가] '), '')
  }
  if (topic.includes(opGiven + '의 ')) {
    topic = topic.replace(opGiven + '의 ', `${opName} 씨의 `)
  }

  // soft (S0-S2) / hard (S3+) 풀 선택
  const isHard = lieState >= 'S3'
  const pool = type === 'fact_pursuit' ? (isHard ? FACT_POOL_HARD : FACT_POOL_SOFT)
    : type === 'motive_search' ? (isHard ? MOTIVE_POOL_HARD : MOTIVE_POOL_SOFT)
    : (isHard ? EMPATHY_POOL_HARD : EMPATHY_POOL_SOFT)

  const template = pool[(turn + disputeId.charCodeAt(disputeId.length - 1)) % pool.length]
  return template
    .replace(/\$\{myName\}/g, myName)
    .replace(/\$\{topic\}/g, topic)
    .replace(/\$\{opName\}/g, opName)
}

function buildTrustActionText(actionType: string, target: PartyId): string {
  const s = useGameStore.getState()
  const name = target === 'a' ? s.caseData?.duo.partyA.name : s.caseData?.duo.partyB.name
  const t: Record<string, string> = {
    confidential_protection: `${name} 씨, 지금 하시는 말씀은 다른 당사자에게 공개하지 않겠습니다.`,
    separation: `상대측은 발언을 중단해 주십시오.`,
  }
  return t[actionType] ?? ''
}

/** optimalPath 추적 — 액션이 필수/보너스 경로에 해당하는지 체크 */
function trackOptimalPath(disputeId: string, actionType: string) {
  const state = useGameStore.getState()
  if (!state.caseData) return
  const caseKey = normalizeCaseKey(state.caseData.caseId)
  const path = getOptimalPath(caseKey, disputeId)
  if (!path) return

  // requiredActions 체크 (예: ["fact_pursuit", "evidence_present:e-1"])
  const matchesRequired = path.requiredActions.some(ra => ra === actionType || ra.startsWith(actionType))
  if (matchesRequired) state.trackMetric('requiredPathsCovered')

  // bonusActions 체크
  const matchesBonus = path.bonusActions.some(ba => ba === actionType || ba.startsWith(actionType))
  if (matchesBonus) state.trackMetric('bonusPathsCovered')
}

// ── 모순 추궁 ──
export async function handleContradictionPursue(
  party: PartyId,
  disputeId: string,
  previousClaim: string,
  currentClaim: string,
) {
  if (globalDispatchLock) return
  globalDispatchLock = true
  try {
    const state = useGameStore.getState()
    if (!state.caseData) return

    const npcName = party === 'a'
      ? state.caseData.duo.partyA.name
      : state.caseData.duo.partyB.name
    const dispute = state.caseData.disputes.find(d => d.id === disputeId)

    const lieEntry = (party === 'a' ? state.agentA : state.agentB).lieStateMap[disputeId]
    const currentLieState = lieEntry?.currentState ?? 'S0'
    const beforeEvidenceIds = new Set(
      Object.entries(state.evidenceStates)
        .filter(([, evState]) => evState?.unlocked)
        .map(([id]) => id),
    )
    const beforeEmotion = (party === 'a' ? state.agentA : state.agentB).emotionalState

    // 사건별 스크립트 우선 → 일반 템플릿 폴백
    // target(party) 라우팅 — 추궁 대상에 따라 호명 정확
    const caseKeyForJudge = normalizeCaseKey(state.caseData?.caseId ?? '')
    const tone = resolveContradictionTone(currentLieState)
    const scriptedJudge = getScriptedJudgeContradiction(caseKeyForJudge, disputeId, tone, party)
    const judgeQuestion = scriptedJudge?.text ?? buildContradictionQuestion(npcName, previousClaim, currentClaim, currentLieState)

    state.addDialogue({
      speaker: 'judge',
      text: judgeQuestion,
      relatedDisputes: [disputeId],
      turn: state.turnCount,
    })

    // 모순 맥락을 시스템 메시지로 LLM 컨텍스트에 포함 (UI 표시 안 함, 프롬프트용)
    state.addDialogue({
      speaker: 'system',
      text: `[모순 추궁 맥락] 이전: "${previousClaim.slice(0, 60)}" → 현재: "${currentClaim.slice(0, 60)}". 이 모순에 대해 해명해야 합니다.`,
      relatedDisputes: [disputeId],
      turn: state.turnCount,
      isHidden: true,
    })

    // ScriptedText 우선 → LLM 폴백
    const caseKey = normalizeCaseKey(state.caseData?.caseId ?? '')
    const scripted = getScriptedContradictionPursuit(caseKey, party, disputeId, currentLieState)
    if (scripted) {
      state.addDialogue({
        speaker: party,
        text: scripted.text,
        behaviorHint: scripted.behaviorHint,
        relatedDisputes: [disputeId],
        turn: state.turnCount,
      })
      // ScriptedText 분기: 타이핑 reveal 동안 핫바 락
      lockHotbarForScriptedReveal(scripted.text, party)
    } else {
      setSkipNextJudgeQuestion(true)
      const action: PlayerAction = {
        type: 'question',
        questionType: 'fact_pursuit',
        target: party,
        disputeId,
      }
      await resolveAndApply(action, party)
    }

    // 모순 추궁은 거짓말 전이에 유리 — 추가 전이 시도
    snapshotLieState(party, disputeId)
    const transitioned = state.transitionLie(party, disputeId, 'contradiction_pursuit')
    if (transitioned) {
      notifyLieTransition(party, disputeId)
      state.trackMetric('lieTransitions')
      const freshAgent = party === 'a' ? useGameStore.getState().agentA : useGameStore.getState().agentB
      if (freshAgent.lieStateMap[disputeId]?.currentState === 'S5') {
        state.trackMetric('liesCollapsed')
      }
      discoverEvidenceFromQuestioning(party, disputeId, 'contradiction_pursuit')
    }

    // 감정 상승 (모순 추궁은 압박이 강함)
    changeEmotionWithPhaseTracking(party, 35)

    // Discovery 체크
    runDiscoveryChecks(party, disputeId)

    const afterState = useGameStore.getState()
    const afterAgent = party === 'a' ? afterState.agentA : afterState.agentB
    const afterEmotion = afterAgent.emotionalState
    const afterLieState = afterAgent.lieStateMap[disputeId]?.currentState ?? currentLieState
    const unlockedEvidence = Object.entries(afterState.evidenceStates)
      .filter(([id, evState]) => evState?.unlocked && !beforeEvidenceIds.has(id))
      .map(([id]) => {
        const evDef = afterState.evidenceDefinitions.find((ev) => ev.id === id)
        return evDef ? getEvidenceDisplayName(evDef, afterState.evidenceStates[id]) : id
      })
    const outcomeParts: string[] = []
    if (unlockedEvidence.length > 0) outcomeParts.push(`증거 해금: ${unlockedEvidence.join(', ')}`)
    if (afterLieState !== currentLieState) outcomeParts.push(`진실 파악: ${formatLieStateStepLabel(currentLieState)} → ${formatLieStateStepLabel(afterLieState)}`)
    if (afterEmotion.phase !== beforeEmotion.phase || afterEmotion.internalValue !== beforeEmotion.internalValue) {
      outcomeParts.push(`감정 변화: ${formatEmotionPhaseLabel(beforeEmotion.phase)} ${beforeEmotion.internalValue} → ${formatEmotionPhaseLabel(afterEmotion.phase)} ${afterEmotion.internalValue}`)
    }
    const currentLockout = afterState.emotionalLockoutUntil?.[party] ?? 0
    if (afterEmotion.internalValue >= 65 && afterEmotion.internalValue < 85 && currentLockout <= afterState.turnCount) {
      afterState.setEmotionalLockout(party, afterState.turnCount + 3)
      outcomeParts.push('격앙 진입: 다음 2턴 동안 질문 차단')
      afterState.addDialogue({
        speaker: party,
        text: buildAngryRefusalLine(afterState, party),
        relatedDisputes: [disputeId],
        turn: afterState.turnCount,
        behaviorHint: '목소리가 높아지고, 더 묻지 말라는 태도로 대화를 끊는다.',
        source: 'fallback',
      })
    }
    afterState.addDialogue({
      speaker: 'system',
      text: `추궁 결과: ${outcomeParts.length > 0 ? outcomeParts.join(' / ') : '즉시 해금은 없지만 방어 반응이 흔들렸습니다.'}`,
      relatedDisputes: [disputeId],
      turn: afterState.turnCount,
    })

    useGameStore.getState().incrementTurn()
  } finally {
    globalDispatchLock = false
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 모순 추궁 질문 템플릿 (15종: soft 5 + mid 5 + hard 5)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type ContradictionTone = 'soft' | 'mid' | 'hard'

const CONTRADICTION_TEMPLATES: Record<ContradictionTone, string[]> = {
  soft: [
    '${name} 씨, 방금 전 답변과 지금 말씀이 조금 다른 것 같습니다. 정리해 주시겠습니까?',
    '${name} 씨, 아까 하신 말씀과 지금 말씀 사이에 차이가 있습니다. 혹시 빠뜨린 부분이 있으신 겁니까?',
    '${name} 씨, 이 부분에 대해 처음 답변하셨을 때와 지금 말씀이 좀 다릅니다. 왜 달라졌는지 설명해 주시겠습니까?',
    '${name} 씨, 처음 하신 말씀과 지금 흐름이 좀 다릅니다. 어떤 부분에서 생각이 바뀌신 건지 말씀해 주십시오.',
    '${name} 씨, 같은 사안에 대해 두 번 다르게 말씀하셨습니다. 기억을 정리해 주시겠습니까?',
  ],
  mid: [
    '${name} 씨, 아까 하신 말씀과 지금 하시는 말씀이 맞지 않습니다. 어느 쪽이 사실입니까?',
    '${name} 씨, 진술이 바뀌고 있습니다. 처음 말씀을 유지하시는 겁니까, 지금 말씀이 맞는 겁니까?',
    '${name} 씨, 이 쟁점에 대해 처음 답변과 지금 답변이 다릅니다. 무엇 때문에 바뀐 겁니까?',
    '${name} 씨, 앞뒤가 맞지 않습니다. 정확히 말씀해 주십시오.',
    '${name} 씨, 이전 답변과 지금 답변 사이에 모순이 있습니다. 이 차이를 넘기기 어렵습니다.',
  ],
  hard: [
    '${name} 씨, 지금 하시는 말씀은 아까와 완전히 다릅니다. 어느 쪽이 진실입니까?',
    '${name} 씨, 더 이상 넘어갈 수 없습니다. 처음 하신 말씀과 지금 말씀이 정면으로 충돌합니다.',
    '${name} 씨, 진술이 크게 바뀌었습니다. 왜 달라졌습니까?',
    '${name} 씨, 처음 하신 말과 지금 말 중 어느 쪽이 사실입니까? 분명히 답하십시오.',
    '${name} 씨, 말씀이 계속 바뀌고 있습니다. 이제 정확히 해 주십시오.',
  ],
}

const _contradictionRotation = new Map<string, number>()

function resolveContradictionTone(lieState: string): ContradictionTone {
  if (lieState === 'S0' || lieState === 'S1') return 'soft'
  if (lieState === 'S2') return 'mid'
  return 'hard'
}

function buildContradictionQuestion(
  name: string,
  previousClaim: string,
  currentClaim: string,
  lieState: string,
): string {
  const tone = resolveContradictionTone(lieState)
  const templates = CONTRADICTION_TEMPLATES[tone]
  const key = `contradiction:${name}:${tone}`
  const idx = _contradictionRotation.get(key) ?? 0
  _contradictionRotation.set(key, idx + 1)
  const template = templates[idx % templates.length]

  const prev = previousClaim.length > 20 ? previousClaim.slice(0, 18) + '…' : previousClaim
  const curr = currentClaim.length > 30 ? currentClaim.slice(0, 28) + '…' : currentClaim

  return template
    .replace(/\$\{name\}/g, name)
    .replace(/\$\{prev\}/g, prev)
    .replace(/\$\{curr\}/g, curr)
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 증인 다층 증언 — 슬롯 선택 후 효과 적용
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function getPartyNameForWitnessProbe(state: ReturnType<typeof useGameStore.getState>, party: PartyId): string {
  return party === 'a'
    ? state.caseData?.duo.partyA.name ?? '당사자'
    : state.caseData?.duo.partyB.name ?? '당사자'
}

function inferWitnessProbeTarget(
  caseId: string | undefined,
  disputeId: string,
  slot: import('../types/witnessTestimony').TestimonySlot,
): PartyId {
  const normalizedCaseId = normalizeCaseKey(caseId ?? '')

  if (normalizedCaseId === 'spouse-01') {
    if (disputeId === 'd-1' || disputeId === 'd-2') return 'b'
    if (disputeId === 'h-d3' || disputeId === 'h-d4') return 'a'
  }

  if (slot.effect.favorDirection === 'pro_a') return 'b'
  if (slot.effect.favorDirection === 'pro_b') return 'a'
  return slot.effect.lieStateNudge?.party ?? 'b'
}

function buildWitnessProbeBridgeLine(
  caseId: string | undefined,
  party: PartyId,
  disputeId: string,
): string {
  const normalizedCaseId = normalizeCaseKey(caseId ?? '')

  if (normalizedCaseId === 'spouse-01' && party === 'b' && disputeId === 'd-1') {
    return '…그 증언까지 나왔습니까. 네, 더 숨기기 어렵겠습니다.'
  }
  if (normalizedCaseId === 'spouse-01' && party === 'b' && disputeId === 'd-2') {
    return '…출금 흐름까지 확인됐군요. 제가 설명하겠습니다.'
  }
  if (normalizedCaseId === 'spouse-01' && party === 'a') {
    return '…그 부분까지 확인됐다면, 저도 피하지 않겠습니다.'
  }
  return '…그 부분까지 확인됐습니까. 제가 아는 대로 말씀드리겠습니다.'
}

function buildWitnessProbeHoldLine(
  caseId: string | undefined,
  party: PartyId,
  disputeId: string,
): string {
  const normalizedCaseId = normalizeCaseKey(caseId ?? '')

  if (normalizedCaseId === 'spouse-01' && party === 'b' && disputeId === 'd-1') {
    return '증언이 나왔다는 건 알겠습니다. 다만 지금 그 결론까지 바로 인정하기는 어렵습니다.'
  }
  if (normalizedCaseId === 'spouse-01' && party === 'a') {
    return '그 증언을 못 들은 척하겠다는 뜻은 아닙니다. 그래도 지금은 제 입장을 바로 접지는 못하겠습니다.'
  }
  return '그 증언은 들었습니다. 그래도 지금 바로 결론까지 인정하기는 어렵습니다.'
}

function confirmWitnessTruthProbe(
  target: PartyId,
  disputeId: string,
  witnessName: string,
): void {
  const state = useGameStore.getState()
  const caseData = state.caseData
  if (!caseData) return

  const targetName = getPartyNameForWitnessProbe(state, target)
  const dispute = caseData.disputes.find((item) => item.id === disputeId)
  const disputeName = dispute?.name ?? disputeId
  const targetAgent = target === 'a' ? state.agentA : state.agentB
  const currentState = targetAgent.lieStateMap[disputeId]?.currentState ?? 'S0'
  const gate = evaluateTruthBreakthroughGate({
    caseData,
    evidenceStates: state.evidenceStates,
    witnessSessions: state.witnessSessions,
    party: target,
    disputeId,
    agent: targetAgent,
    trigger: 'witness_support_probe',
  })

  state.addDialogue({
    speaker: 'judge',
    text: `${targetName} 씨, 방금 ${witnessName}의 증언은 "${disputeName}" 쟁점의 핵심과 맞닿아 있습니다. 이 부분을 직접 확인하겠습니다.`,
    relatedDisputes: [disputeId],
    turn: state.turnCount,
  })

  state.addDialogue({
    speaker: target,
    text: gate.canBreakthrough
      ? buildWitnessProbeBridgeLine(caseData.caseId, target, disputeId)
      : buildWitnessProbeHoldLine(caseData.caseId, target, disputeId),
    relatedDisputes: [disputeId],
    turn: state.turnCount,
    behaviorHint: gate.canBreakthrough
      ? '증인 증언에 당황하고, 더 이상 버티기 어렵다는 반응을 보인다.'
      : '핵심 증언에 흔들리지만 아직 자신의 방어를 완전히 내려놓지는 않는다.',
    source: 'fallback',
  })

  if (currentState === 'S5') {
    dispatchS5ConfessionAnswer(target, disputeId)
    return
  }

  if (gate.canBreakthrough) {
    snapshotLieState(target, disputeId)
    state.forceSetLieState(target, disputeId, 'S5', {
      allowS5: true,
      breakthroughRoute: gate.route === 'blocked' ? undefined : gate.route,
    })
    notifyLieTransition(target, disputeId)
    state.addJudgeObservation({
      turnCount: state.turnCount,
      category: 'event',
      iconId: 'i-key',
      title: '증인 진술과 당사자 반응이 맞물려 진실이 확정됐다.',
      summary: `${disputeName} · ${gate.route === 'trust' ? '신뢰 경로' : '감정 경로'}`,
      party: target,
      disputeId,
      linkedDialogueId: findLinkedDialogueId(target),
    })
    return
  }

  const rank = LIE_STATE_RANK_FOR_UNLOCK[currentState] ?? 0
  if (rank < 4) {
    snapshotLieState(target, disputeId)
    state.forceSetLieState(target, disputeId, 'S4')
    notifyLieTransition(target, disputeId)
  }
  state.addJudgeObservation({
    turnCount: state.turnCount,
    category: 'event',
    iconId: 'i-witness',
    title: '증언은 확보됐지만 진실 확정은 보류됐다.',
    summary: gate.holdReason === 'route_not_ready'
      ? '당사자의 감정/신뢰 경로가 아직 열리지 않았습니다.'
      : '이 쟁점을 받칠 추가 증거 또는 증언이 더 필요합니다.',
    party: target,
    disputeId,
    linkedDialogueId: findLinkedDialogueId(target),
  })
}

function enqueueWitnessTruthProbe(
  pending: NonNullable<ReturnType<typeof useGameStore.getState>['pendingWitnessChoice']>,
  slot: import('../types/witnessTestimony').TestimonySlot,
): void {
  const state = useGameStore.getState()
  const caseData = state.caseData
  if (!caseData) return

  const disputeId = slot.effect.relatedDisputes[0]
  if (!disputeId) return

  const dispute = caseData.disputes.find((item) => item.id === disputeId)
  const target = inferWitnessProbeTarget(caseData.caseId, disputeId, slot)
  const targetName = getPartyNameForWitnessProbe(state, target)
  const disputeName = dispute?.name ?? disputeId

  state.addJudgeObservation({
    turnCount: state.turnCount,
    category: 'event',
    iconId: 'i-witness',
    title: '핵심 증언이 포착됐다.',
    summary: `${pending.witnessName} · ${disputeName}`,
    party: target,
    disputeId,
    linkedDialogueId: findLinkedDialogueId(),
  })

  state.enqueueFeedback({
    kind: 'confrontation',
    eyebrow: '핵심 증언 포착',
    title: disputeName,
    body: `${pending.witnessName}의 답변이 이 쟁점의 핵심과 맞닿아 있습니다. ${targetName} 씨에게 직접 확인하시겠습니까?`,
    quote: slot.testimony,
    tone: 'gold',
    actions: [
      {
        label: '기록만 한다',
        tone: 'gray',
        onSelect: () => {
          useGameStore.getState().addJudgeObservation({
            turnCount: useGameStore.getState().turnCount,
            category: 'event',
            iconId: 'i-witness',
            title: '핵심 증언을 보류 기록으로 남겼다.',
            summary: `${pending.witnessName} · ${disputeName}`,
            party: target,
            disputeId,
            linkedDialogueId: findLinkedDialogueId(),
          })
        },
      },
      {
        label: '당사자에게 확인',
        tone: 'gold',
        onSelect: () => {
          window.setTimeout(() => confirmWitnessTruthProbe(target, disputeId, pending.witnessName), 320)
        },
      },
    ],
  })
}

export function applyWitnessSlot(slotId: string): void {
  const state = useGameStore.getState()
  const pending = state.pendingWitnessChoice
  if (!pending) return

  const slot = pending.slots.find(s => s.id === slotId)
  if (!slot) return
  state.setPendingWitnessChoice(null)

  // 재판관 질문
  state.addDialogue({
    speaker: 'judge',
    text: slot.question,
    relatedDisputes: slot.effect.relatedDisputes,
    turn: state.turnCount,
  })

  // 증인 답변
  state.addDialogue({
    speaker: 'witness',
    text: slot.testimony,
    behaviorHint: slot.behaviorHint,
    relatedDisputes: slot.effect.relatedDisputes,
    turn: state.turnCount,
    witnessName: pending.witnessName,
    witnessFavor: slot.effect.favorDirection === 'pro_a' ? 'pro_a' : slot.effect.favorDirection === 'pro_b' ? 'pro_b' : 'neutral',
  })

  // 세션 업데이트를 먼저 반영해야 S5 게이트가 방금 들은 핵심 증언을 support condition으로 볼 수 있다.
  state.updateWitnessSession(pending.witnessId, slotId)

  // 효과 적용
  if (slot.effect.emotionDelta) {
    // 불리한 쪽의 감정 상승
    const unfavored = slot.effect.favorDirection === 'pro_a' ? 'b' : 'a'
    changeEmotionWithPhaseTracking(unfavored as any, slot.effect.emotionDelta)
  }

  if (slot.effect.lieStateNudge) {
    const { party, dispute } = slot.effect.lieStateNudge
    if (slot.depth >= 3) {
      enqueueWitnessTruthProbe(pending, slot)
    } else {
      const transitioned = state.transitionLie(party as any, dispute, 'witness_testimony')
      if (transitioned) {
        notifyLieTransition(party as any, dispute)
        state.trackMetric('lieTransitions')
      }
    }
  } else if (slot.depth >= 3 && slot.effect.relatedDisputes.length > 0) {
    enqueueWitnessTruthProbe(pending, slot)
  }

  if (slot.effect.emergenceTrigger) {
    // Hidden 쟁점 발현 트리거
    state.emergeDispute(slot.effect.emergenceTrigger, 'witness_testimony', state.turnCount, '증인 진술로 숨겨진 쟁점이 드러났습니다.')
    state.addDialogue({
      speaker: 'system',
      text: '💡 새로운 쟁점이 발견되었습니다.',
      relatedDisputes: [slot.effect.emergenceTrigger],
      turn: state.turnCount,
    })
  }
  // 증인 주제 선택은 소환의 일부, 별도 턴 소비 없음
}
