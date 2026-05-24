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
import type { PartyId, LieState } from '../types/coreCase'
import type {
  NarrativeTriggerFireResult,
  GameStateSnapshot,
} from '../types/narrativeTrigger'
import { evaluateNarrativeTriggers, evaluateFallback } from './narrativeTriggerEngine'
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
 * ScriptedText 시퀀스를 dialogue로 발행. Phase 4 foundation은 단순 dialogue.
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
  const state = useGameStore.getState() as UnknownDialogueDispatcher
  const turn = (state as { turnCount?: number }).turnCount ?? 0
  for (const scriptedId of fireResult.scriptedSequence) {
    // ScriptedText id를 dialogue speaker로 매핑하기 위해 store/script-loader 참조 필요.
    // Phase 4 foundation: 시스템 메시지로 표시 (id를 placeholder text로).
    // Phase 4-E에서 실제 ScriptedText 로드 + speaker 추출로 교체.
    state.addDialogue?.({
      speaker: 'system',
      text: `[narrative:${fireResult.triggerType}] ${scriptedId}`,
      relatedDisputes: options.relatedDisputes ?? [],
      turn,
    })
  }
}

interface UnknownDialogueDispatcher {
  addDialogue?: (entry: { speaker: string; text: string; relatedDisputes?: string[]; turn: number }) => void
}

// ─────────────────────────────────────────────────────────────────────────────
// Unified evaluate-and-dispatch (foundation API)
// ─────────────────────────────────────────────────────────────────────────────

export interface NarrativeAttemptContext {
  evidenceDef: EvidenceNode
  currentTurn: number
  lastActionContext?: string
  lastFiredRecipeId?: string
  /** 이미 fire된 trigger id (재평가 skip). */
  firedTrigger?: string
  /** legacy 조건 만족 turn (fallback 계산용). */
  legacyEligibleTurn?: number
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
  const candidates = ctx.evidenceDef.narrativeTriggers
  if (!candidates || candidates.length === 0) return undefined
  if (ctx.firedTrigger) return null

  const snapshot = buildGameStateSnapshot()
  const fired = evaluateNarrativeTriggers({
    emergenceId: ctx.evidenceDef.id,
    candidates,
    state: snapshot,
    firedTrigger: ctx.firedTrigger,
    legacyEligibleTurn: ctx.legacyEligibleTurn,
    currentTurn: ctx.currentTurn,
    lastActionContext: ctx.lastActionContext,
    lastFiredRecipeId: ctx.lastFiredRecipeId,
  })
  if (fired) {
    dispatchNarrativeSequence(fired, {
      emergenceId: ctx.evidenceDef.id,
      relatedDisputes: ctx.evidenceDef.proves,
    })
    return fired
  }
  return null
}

/**
 * judge_auto_mention fallback 평가 — 매 턴 종료 시 호출.
 * 모든 narrative-gated evidence를 순회하며 legacy eligible + N턴 경과 + 미발동 항목 fire.
 */
export function attemptFallbackForEvidence(
  ctx: NarrativeAttemptContext,
): NarrativeTriggerFireResult | null | undefined {
  const candidates = ctx.evidenceDef.narrativeTriggers
  if (!candidates || candidates.length === 0) return undefined
  if (ctx.firedTrigger) return null
  if (ctx.legacyEligibleTurn === undefined) return null

  const snapshot = buildGameStateSnapshot()
  const fired = evaluateFallback({
    emergenceId: ctx.evidenceDef.id,
    candidates,
    state: snapshot,
    firedTrigger: ctx.firedTrigger,
    legacyEligibleTurn: ctx.legacyEligibleTurn,
    currentTurn: ctx.currentTurn,
    lastActionContext: ctx.lastActionContext,
    lastFiredRecipeId: ctx.lastFiredRecipeId,
  })
  if (fired) {
    dispatchNarrativeSequence(fired, {
      emergenceId: ctx.evidenceDef.id,
      relatedDisputes: ctx.evidenceDef.proves,
    })
    return fired
  }
  return null
}

// re-export for caller convenience
export { localizeRuntimeText }
