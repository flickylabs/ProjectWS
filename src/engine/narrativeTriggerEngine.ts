/**
 * Core System — Narrative Trigger Engine
 *
 * 권위: feedback-new-dispute-evidence-narrative-justification
 * Brief: docs/design/core-narrative-cycle1-spouse01-e5-emergence-20260524/
 *
 * 책임:
 *  - emergence(증거 unlock / 쟁점 emerge 등)별 multi-trigger 후보 평가
 *  - First-Fired-Wins: 첫 만족 후보 fire 후 나머지 후보 영구 disabled
 *  - judge_auto_mention fallback: legacy 조건 만족 후 N턴 경과 시 자동 fire
 *
 * 본 engine은 평가 + fire 결과만 반환한다. 실제 narrative dispatch (ScriptedText
 * 시퀀스 재생 + emergence 실행)는 호출자(useActionDispatch 등)가 처리한다.
 *
 * Cycle 1 적용 범위: Evidence emergence. dispute/dossier/witness emergence는
 * Cycle 2+ 확장 시 동일 engine API 재사용 가능.
 */

import type {
  NarrativeTriggerCandidate,
  NarrativeTriggerFireResult,
  NarrativeTriggerPreconditions,
  LieStateThreshold,
} from '../types/narrativeTrigger'
import type { LieState } from '../types/coreCase'

// ─────────────────────────────────────────────────────────────────────────────
// Evaluation context
// ─────────────────────────────────────────────────────────────────────────────

export interface NarrativeTriggerEvaluationContext {
  /** 평가 대상 emergence id (예: 'e-5'). 디버그/telemetry 용. */
  emergenceId: string
  /** emergence에 부착된 multi-trigger 후보. 빈 배열이면 즉시 즉시 unlock (legacy). */
  candidates: NarrativeTriggerCandidate[]
  /** 게임 상태 스냅샷. */
  state: GameStateSnapshot
  /** 이미 fire된 trigger id (set이면 더 이상 평가 skip). */
  firedTrigger?: string
  /** legacy 조건 만족 turn (N턴 fallback 계산용). */
  legacyEligibleTurn?: number
  /** 현재 턴. */
  currentTurn: number
  /** 직전 액션 context 문자열 (preconditions.contextAction과 매칭). */
  lastActionContext?: string
  /** 직전에 발동된 조합 recipeId — combination_result 후보 매칭 전용. */
  lastFiredRecipeId?: string
}

export interface GameStateSnapshot {
  /** dispute별 lieState (각 party). */
  lieStateByDispute: Record<string, { a?: LieState; b?: LieState }>
  /** 파티별 distrust (0~100). */
  partyDistrust: { a: number; b: number }
  /** 파티별 emotional phase. */
  partyPhase: { a: string; b: string }
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * 후보 평가 — 첫 만족 후보 반환. 모든 후보 미만족 시 null.
 *
 * 평가 순서: candidates 배열 순서. 우선순위가 있으면 author가 배열 순서로 표시.
 * judge_auto_mention 후보는 별도 평가 (evaluateFallback) — 본 함수는 narrative
 * trigger 후보만 처리.
 */
export function evaluateNarrativeTriggers(
  ctx: NarrativeTriggerEvaluationContext,
): NarrativeTriggerFireResult | null {
  if (ctx.firedTrigger) return null
  for (const candidate of ctx.candidates) {
    if (candidate.type === 'judge_auto_mention') continue
    if (!matchCandidate(candidate, ctx)) continue
    return toFireResult(candidate)
  }
  return null
}

/**
 * judge_auto_mention fallback 평가 — legacy 조건 만족 후 N턴 경과 시 fire.
 *
 * 호출 시점: 매 턴 종료 시 (또는 emergence 평가 사이클 끝). 다른 trigger가
 * 이미 fire했으면 skip.
 */
export function evaluateFallback(
  ctx: NarrativeTriggerEvaluationContext,
): NarrativeTriggerFireResult | null {
  if (ctx.firedTrigger) return null
  if (ctx.legacyEligibleTurn === undefined) return null
  const candidate = ctx.candidates.find((c) => c.type === 'judge_auto_mention')
  if (!candidate) return null
  const preconditionsList = normalizePreconditions(candidate.preconditions)
  const elapsed = ctx.currentTurn - ctx.legacyEligibleTurn
  // OR 묶음 — 하나라도 turnsAfterEligible 만족 시 fire
  const fired = preconditionsList.some((pc) => {
    const required = pc.turnsAfterEligible ?? 0
    return elapsed >= required && matchOtherPreconditions(pc, ctx)
  })
  if (!fired) return null
  return toFireResult(candidate)
}

// ─────────────────────────────────────────────────────────────────────────────
// Matching
// ─────────────────────────────────────────────────────────────────────────────

function matchCandidate(
  candidate: NarrativeTriggerCandidate,
  ctx: NarrativeTriggerEvaluationContext,
): boolean {
  // combination_result 후보: recipeId 일치 필수
  if (candidate.type === 'combination_result') {
    if (!candidate.recipeId) return false
    if (candidate.recipeId !== ctx.lastFiredRecipeId) return false
  }
  const preconditionsList = normalizePreconditions(candidate.preconditions)
  // OR 묶음 — 하나라도 만족 시 fire
  return preconditionsList.some((pc) => matchPreconditions(pc, ctx))
}

function normalizePreconditions(
  pre: NarrativeTriggerPreconditions | NarrativeTriggerPreconditions[],
): NarrativeTriggerPreconditions[] {
  return Array.isArray(pre) ? pre : [pre]
}

function matchPreconditions(
  pc: NarrativeTriggerPreconditions,
  ctx: NarrativeTriggerEvaluationContext,
): boolean {
  return matchOtherPreconditions(pc, ctx)
}

function matchOtherPreconditions(
  pc: NarrativeTriggerPreconditions,
  ctx: NarrativeTriggerEvaluationContext,
): boolean {
  // disputeLieState — 모든 dispute 만족 (AND)
  if (pc.disputeLieState) {
    for (const [disputeId, threshold] of Object.entries(pc.disputeLieState)) {
      const state = ctx.state.lieStateByDispute[disputeId]
      if (!state) return false
      const partyState = state.b ?? state.a // dispute에 lieState가 어느 party든 만족하면 OK (보수적으로 max)
      const candidateA = state.a ? lieStateRank(state.a) : -1
      const candidateB = state.b ? lieStateRank(state.b) : -1
      const maxRank = Math.max(candidateA, candidateB)
      if (maxRank < thresholdRank(threshold)) return false
      void partyState
    }
  }
  // partyDistrust
  if (pc.partyDistrust) {
    for (const [party, req] of Object.entries(pc.partyDistrust)) {
      const value = ctx.state.partyDistrust[party as 'a' | 'b']
      if (value === undefined || value < req.min) return false
    }
  }
  // partyPhase — 각 party의 phase 배열 중 하나만 만족 (파티 내 OR, 파티 간 AND)
  if (pc.partyPhase) {
    for (const [party, allowedPhases] of Object.entries(pc.partyPhase)) {
      const phase = ctx.state.partyPhase[party as 'a' | 'b']
      if (!phase || !allowedPhases.includes(phase as never)) return false
    }
  }
  // contextAction — 마지막 액션 컨텍스트 패턴 매칭 (prefix or exact)
  if (pc.contextAction) {
    const last = ctx.lastActionContext ?? ''
    if (!matchContextAction(pc.contextAction, last)) return false
  }
  // turnsAfterEligible — evaluateFallback에서만 의미. 일반 evaluate는 skip.
  return true
}

function matchContextAction(pattern: string, actual: string): boolean {
  // 단순 prefix 매칭. 예: pattern='evidence_present.b.d-1' actual='evidence_present.b.d-1.e-2'
  // 향후 정교한 패턴 매칭 필요 시 확장 (정규식 / glob).
  return actual === pattern || actual.startsWith(`${pattern}.`)
}

function lieStateRank(s: LieState): number {
  switch (s) {
    case 'S0': return 0
    case 'S1': return 1
    case 'S2': return 2
    case 'S3': return 3
    case 'S4': return 4
    case 'S5': return 5
  }
}

function thresholdRank(t: LieStateThreshold): number {
  switch (t) {
    case 'S0+': return 0
    case 'S1+': return 1
    case 'S2+': return 2
    case 'S3+': return 3
    case 'S4+': return 4
    case 'S5+': return 5
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Result building
// ─────────────────────────────────────────────────────────────────────────────

function toFireResult(candidate: NarrativeTriggerCandidate): NarrativeTriggerFireResult {
  return {
    triggerId: candidate.id,
    scriptedSequence: candidate.scriptedRefs,
    vfxProfile: candidate.vfxProfile ?? 'standard',
    triggerType: candidate.type,
  }
}
