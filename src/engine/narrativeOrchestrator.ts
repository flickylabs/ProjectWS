/**
 * Core System — Narrative Orchestrator
 *
 * 권위: feedback-new-dispute-evidence-narrative-justification
 *
 * 책임: narrativeTriggerEngine과 게임 store/dispatch 사이의 brigde.
 *  - 평가 직전 store state → GameStateSnapshot 변환
 *  - fire 결과 → ScriptedText 시퀀스를 dialogue로 발행 + cutscene VFX 큐
 *  - fire 실패 시 caller는 evidence unlock revert (호출자 책임)
 *
 * Phase 4 foundation: dispatch는 단순 dialogue 발행 + 기본 evidence cutscene
 *  재사용. 풍부한 narrative cutscene VFX는 Phase 4-D 이후 확장.
 */

import { useGameStore } from '../store/useGameStore'
import type { EvidenceNode } from '../types/case'
import type {
  PartyId,
  LieState,
  CoreDispute,
  CoreDossierCard,
  CoreWitness,
} from '../types/coreCase'
import type { Speaker } from '../types/dialogue'
import type {
  NarrativeTriggerCandidate,
  NarrativeTriggerFireResult,
} from '../types/narrativeTrigger'
import {
  evaluateNarrativeTriggers,
  evaluateFallback,
  type GameStateSnapshot,
} from './narrativeTriggerEngine'
import { getEmergenceVariantById } from './scriptedTextLoader'
import { localizeRuntimeText } from '../i18n/runtimeText'

// ─────────────────────────────────────────────────────────────────────────────
// Snapshot builder
// ─────────────────────────────────────────────────────────────────────────────

/**
 * 현재 store state로부터 trigger 평가용 snapshot 구성.
 * agent slice의 lieStateMap / distrust / emotionalState를 정규 형태로 추출.
 */
export function buildGameStateSnapshot(): GameStateSnapshot {
  const state = useGameStore.getState() as UnknownGameState
  const lieStateByDispute: GameStateSnapshot['lieStateByDispute'] = {}
  for (const partyKey of ['a', 'b'] as const) {
    const agent = partyKey === 'a' ? state.agentA : state.agentB
    if (!agent?.lieStateMap) continue
    for (const [disputeId, entry] of Object.entries(agent.lieStateMap)) {
      const lieState = (entry as { currentState?: LieState })?.currentState
      if (!lieState) continue
      const slot = lieStateByDispute[disputeId] ?? {}
      slot[partyKey] = lieState
      lieStateByDispute[disputeId] = slot
    }
  }
  return {
    lieStateByDispute,
    partyDistrust: {
      a: extractDistrust(state.agentA),
      b: extractDistrust(state.agentB),
    },
    partyPhase: {
      a: state.agentA?.emotionalState?.phase ?? 'defensive',
      b: state.agentB?.emotionalState?.phase ?? 'defensive',
    },
  }
}

function extractDistrust(agent: { trustState?: { trustTowardJudge?: number } } | undefined): number {
  // trustState는 100 max — 본 게임의 신뢰. distrust = 100 - trustTowardJudge로 환산.
  const trust = agent?.trustState?.trustTowardJudge ?? 50
  return Math.max(0, Math.min(100, 100 - trust))
}

interface UnknownGameState {
  agentA?: { lieStateMap?: Record<string, { currentState?: LieState }>; emotionalState?: { phase?: string }; trustState?: { trustTowardJudge?: number } }
  agentB?: { lieStateMap?: Record<string, { currentState?: LieState }>; emotionalState?: { phase?: string }; trustState?: { trustTowardJudge?: number } }
}

// ─────────────────────────────────────────────────────────────────────────────
// Action context builder
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Action 객체로부터 context 문자열 생성.
 * 형식 예: 'evidence_present.b.d-1', 'question.fact_pursuit.b.d-2'
 *
 * narrativeTrigger preconditions.contextAction의 prefix 매칭에 사용.
 */
export function buildActionContext(action: {
  type: string
  target?: PartyId
  disputeId?: string
  questionType?: string
  evidenceId?: string
}): string {
  const parts: string[] = [action.type]
  if (action.type === 'question' && action.questionType) parts.push(action.questionType)
  if (action.target) parts.push(action.target)
  if (action.disputeId) parts.push(action.disputeId)
  if (action.evidenceId) parts.push(action.evidenceId)
  return parts.join('.')
}

// ─────────────────────────────────────────────────────────────────────────────
// Narrative dispatch
// ─────────────────────────────────────────────────────────────────────────────

/**
 * ScriptedText 시퀀스를 dialogue로 발행. 각 entry의 tags에서 speaker 추출.
 * KO base + locale overlay (en/ja/zh-CN)는 loadBundle이 locale-aware로 처리.
 *
 * 호출자 책임:
 *  - evidence unlock 유지 (revert X)
 *  - markNarrativeFired(emergenceId, fireResult.triggerId) 호출
 *  - 필요 시 별도 cutscene VFX 큐 (Phase 4-D 확장)
 */
export function dispatchNarrativeSequence(
  fireResult: NarrativeTriggerFireResult,
  options: { emergenceId: string; relatedDisputes?: string[] },
): void {
  const state = useGameStore.getState() as UnknownDialogueDispatcher & {
    caseData?: { caseId?: string }
    turnCount?: number
  }
  const turn = state.turnCount ?? 0
  const caseId = state.caseData?.caseId
  if (!caseId) return

  for (const scriptedId of fireResult.scriptedSequence) {
    const variant = getEmergenceVariantById(caseId, options.emergenceId, scriptedId)
    if (!variant) continue
    const speaker = extractSpeakerFromTags(variant.tags)
    state.addDialogue?.({
      speaker,
      text: variant.text,
      behaviorHint: variant.behaviorHint || undefined,
      relatedDisputes: options.relatedDisputes ?? [],
      turn,
    })
  }
}

function extractSpeakerFromTags(tags: string[]): Speaker {
  const speakerTag = tags.find((t) => t.startsWith('speaker:'))
  if (!speakerTag) return 'system'
  const value = speakerTag.split(':')[1]
  if (value === 'a' || value === 'b' || value === 'judge' || value === 'witness') return value
  return 'system'
}

interface UnknownDialogueDispatcher {
  addDialogue?: (entry: { speaker: Speaker; text: string; behaviorHint?: string; relatedDisputes?: string[]; turn: number }) => void
}

// ─────────────────────────────────────────────────────────────────────────────
// Unified evaluate-and-dispatch (foundation API)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Cycle 1 evidence emergence 호환 — evidenceDef + 공통 context.
 * Cycle 2 dossier/witness/dispute는 별도 wrapper context 타입 사용.
 */
export interface NarrativeAttemptContext extends NarrativeAttemptCommonContext {
  evidenceDef: EvidenceNode
}

/** evidence/dossier/witness/dispute 공통 context. */
export interface NarrativeAttemptCommonContext {
  currentTurn: number
  lastActionContext?: string
  lastFiredRecipeId?: string
  /** 이미 fire된 trigger id (재평가 skip). */
  firedTrigger?: string
  /** legacy 조건 만족 turn (fallback 계산용). */
  legacyEligibleTurn?: number
}

/**
 * Generic emergence attempt — evidence / dossier / witness / dispute 공통 helper.
 * 호출자 책임: emergenceId, candidates, relatedDisputes 명시.
 */
function attemptNarrativeForEmergence(args: {
  emergenceId: string
  candidates: NarrativeTriggerCandidate[] | undefined
  relatedDisputes: string[]
  ctx: NarrativeAttemptCommonContext
  mode: 'evaluate' | 'fallback'
}): NarrativeTriggerFireResult | null | undefined {
  const { candidates, ctx } = args
  if (!candidates || candidates.length === 0) return undefined
  if (ctx.firedTrigger) return null
  if (args.mode === 'fallback' && ctx.legacyEligibleTurn === undefined) return null

  const snapshot = buildGameStateSnapshot()
  const firedCardIds = collectFiredCardIds()
  const evaluator = args.mode === 'evaluate' ? evaluateNarrativeTriggers : evaluateFallback
  const fired = evaluator({
    emergenceId: args.emergenceId,
    candidates,
    state: snapshot,
    firedTrigger: ctx.firedTrigger,
    legacyEligibleTurn: ctx.legacyEligibleTurn,
    currentTurn: ctx.currentTurn,
    lastActionContext: ctx.lastActionContext,
    lastFiredRecipeId: ctx.lastFiredRecipeId,
    firedCardIds,
  })
  if (fired) {
    dispatchNarrativeSequence(fired, {
      emergenceId: args.emergenceId,
      relatedDisputes: args.relatedDisputes,
    })
    return fired
  }
  return null
}

/**
 * 이미 fire된 카드/증거 ID set 수집.
 *
 * Cycle 2 unified narrativeSlice — evidence / dossier / witness / dispute 모든 emergence
 * 단일 firedEmergences map에서 lookup. cascade_from_card precondition single source.
 *
 * 기존 evidence-only 경로 (evidenceState.narrativeFiredTrigger) 는 fire 시 markNarrativeFiredEmergence
 * 함께 호출되어 narrativeSlice에 동기화됨. 양쪽 모두 anchor로 사용 가능.
 */
function collectFiredCardIds(): ReadonlySet<string> {
  const state = useGameStore.getState() as {
    getFiredEmergenceIds?: () => ReadonlySet<string>
    firedEmergences?: Record<string, { triggerId: string; turn: number }>
    evidenceStates?: Record<string, { narrativeFiredTrigger?: string }>
  }
  const fired = new Set<string>()
  // 1. 통합 narrativeSlice (Cycle 2+)
  const ids = state.getFiredEmergenceIds?.() ?? new Set(Object.keys(state.firedEmergences ?? {}))
  for (const id of ids) fired.add(id)
  // 2. 레거시 evidence-per-state (Cycle 1 evidence 경로가 markNarrativeFiredEmergence를
  //    아직 호출하지 않은 사이클 대비 안전망)
  for (const [id, entry] of Object.entries(state.evidenceStates ?? {})) {
    if (entry?.narrativeFiredTrigger) fired.add(id)
  }
  return fired
}

/**
 * 단일 evidence emergence에 대해 narrative trigger 평가 + dispatch.
 *
 * 반환:
 *  - fire 성공: NarrativeTriggerFireResult — 호출자는 markNarrativeFired 호출
 *  - fire 실패: null — 호출자는 revertEvidenceUnlock 호출 (legacyEligibleTurn 첫 기록)
 *  - narrativeTriggers 미지정: undefined — 호출자는 legacy 즉시 unlock 흐름 진행
 */
export function attemptNarrativeForEvidence(
  ctx: NarrativeAttemptContext,
): NarrativeTriggerFireResult | null | undefined {
  return attemptNarrativeForEmergence({
    emergenceId: ctx.evidenceDef.id,
    candidates: ctx.evidenceDef.narrativeTriggers,
    relatedDisputes: ctx.evidenceDef.proves,
    ctx,
    mode: 'evaluate',
  })
}

/**
 * judge_auto_mention fallback 평가 — 매 턴 종료 시 호출.
 * 모든 narrative-gated evidence를 순회하며 legacy eligible + N턴 경과 + 미발동 항목 fire.
 */
export function attemptFallbackForEvidence(
  ctx: NarrativeAttemptContext,
): NarrativeTriggerFireResult | null | undefined {
  return attemptNarrativeForEmergence({
    emergenceId: ctx.evidenceDef.id,
    candidates: ctx.evidenceDef.narrativeTriggers,
    relatedDisputes: ctx.evidenceDef.proves,
    ctx,
    mode: 'fallback',
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// Cycle 2 — Dossier / Witness / Dispute emergence (cascade_from_card 지원)
// ─────────────────────────────────────────────────────────────────────────────

export interface DossierNarrativeContext extends NarrativeAttemptCommonContext {
  dossierDef: CoreDossierCard
}

export interface WitnessNarrativeContext extends NarrativeAttemptCommonContext {
  witnessDef: CoreWitness
}

export interface DisputeNarrativeContext extends NarrativeAttemptCommonContext {
  disputeDef: CoreDispute
}

export function attemptNarrativeForDossier(
  ctx: DossierNarrativeContext,
): NarrativeTriggerFireResult | null | undefined {
  return attemptNarrativeForEmergence({
    emergenceId: ctx.dossierDef.id,
    candidates: ctx.dossierDef.narrativeTriggers,
    relatedDisputes: ctx.dossierDef.linkedDisputes,
    ctx,
    mode: 'evaluate',
  })
}

export function attemptFallbackForDossier(
  ctx: DossierNarrativeContext,
): NarrativeTriggerFireResult | null | undefined {
  return attemptNarrativeForEmergence({
    emergenceId: ctx.dossierDef.id,
    candidates: ctx.dossierDef.narrativeTriggers,
    relatedDisputes: ctx.dossierDef.linkedDisputes,
    ctx,
    mode: 'fallback',
  })
}

export function attemptNarrativeForWitness(
  ctx: WitnessNarrativeContext,
): NarrativeTriggerFireResult | null | undefined {
  return attemptNarrativeForEmergence({
    emergenceId: ctx.witnessDef.id,
    candidates: ctx.witnessDef.narrativeTriggers,
    relatedDisputes: ctx.witnessDef.relatedDisputes,
    ctx,
    mode: 'evaluate',
  })
}

export function attemptFallbackForWitness(
  ctx: WitnessNarrativeContext,
): NarrativeTriggerFireResult | null | undefined {
  return attemptNarrativeForEmergence({
    emergenceId: ctx.witnessDef.id,
    candidates: ctx.witnessDef.narrativeTriggers,
    relatedDisputes: ctx.witnessDef.relatedDisputes,
    ctx,
    mode: 'fallback',
  })
}

export function attemptNarrativeForDispute(
  ctx: DisputeNarrativeContext,
): NarrativeTriggerFireResult | null | undefined {
  return attemptNarrativeForEmergence({
    emergenceId: ctx.disputeDef.id,
    candidates: ctx.disputeDef.narrativeTriggers,
    relatedDisputes: [ctx.disputeDef.id],
    ctx,
    mode: 'evaluate',
  })
}

export function attemptFallbackForDispute(
  ctx: DisputeNarrativeContext,
): NarrativeTriggerFireResult | null | undefined {
  return attemptNarrativeForEmergence({
    emergenceId: ctx.disputeDef.id,
    candidates: ctx.disputeDef.narrativeTriggers,
    relatedDisputes: [ctx.disputeDef.id],
    ctx,
    mode: 'fallback',
  })
}

// re-export for caller convenience
export { localizeRuntimeText }
