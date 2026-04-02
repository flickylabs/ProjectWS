/**
 * 성과 조건 엔진 (Readiness Engine)
 * ─────────────────────────────────
 * 턴 수 대신 성과 기반으로 판결 가능 여부를 결정한다.
 *
 * 설계: GPT Pro 5.4 (solomon_5_design_opinions.md 의견 1)
 * 구현: Claude Code
 */

import type { ReadinessState, VerdictMode } from '../types'
import type { LieState } from '../types'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 상수
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** 통합 심문 최대 턴 수 */
export const MAX_INTERROGATION_TURNS = 16

/** 판결 가능 최소 턴 */
const MIN_TURNS_FOR_VERDICT = 8

/** 조기 종료 가능 최소 턴 */
const EARLY_FINISH_MIN_TURNS = 6

/** 판결 가능 최소 readinessScore */
const MIN_READINESS_SCORE = 5

/** 판결 가능 최소 진행 쟁점 수 (S2+) */
const MIN_PROGRESSED_DISPUTES = 2

/** 판결 가능 최소 major breakthrough 수 */
const MIN_MAJOR_BREAKTHROUGHS = 1

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 공개 API
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * readinessScore를 계산한다.
 * 동일 증거에서 나온 investigationSuccess와 fullCollapse는 중복 가산하지 않는다.
 */
export function calculateReadinessScore(state: ReadinessState): number {
  let score = 0
  score += Math.min(state.crackedDisputeCount, 2) * 1
  score += Math.min(state.resolvedDisputeCount, 2) * 2
  score += Math.min(state.investigationSuccessCount, 2) * 1
  score += Math.min(state.fullCollapseCount, 2) * 1
  score += Math.min(state.hiddenDisputeRevealCount, 1) * 1
  score += Math.min(state.confessionCount, 1) * 2
  return score
}

/**
 * 현재 턴에서 판결 가능 여부를 판단한다.
 */
export function checkVerdictEligible(
  turn: number,
  state: ReadinessState,
): { eligible: boolean; reason: string } {
  const score = calculateReadinessScore(state)
  const majorBreakthroughs = getMajorBreakthroughCount(state)
  const progressedDisputes = state.crackedDisputeCount + state.resolvedDisputeCount

  // 조기 종료 예외 체크
  if (turn >= EARLY_FINISH_MIN_TURNS && checkEarlyFinish(state)) {
    return { eligible: true, reason: 'early_finish' }
  }

  // 일반 판결 가능 조건
  if (
    turn >= MIN_TURNS_FOR_VERDICT &&
    score >= MIN_READINESS_SCORE &&
    progressedDisputes >= MIN_PROGRESSED_DISPUTES &&
    majorBreakthroughs >= MIN_MAJOR_BREAKTHROUGHS
  ) {
    return { eligible: true, reason: 'normal' }
  }

  return { eligible: false, reason: 'not_ready' }
}

/**
 * 16턴 초과 시 강제 판결 전환 여부를 판단한다.
 */
export function checkForcedVerdict(
  turn: number,
  state: ReadinessState,
): { forced: boolean; verdictMode: VerdictMode } {
  const { eligible } = checkVerdictEligible(turn, state)

  if (turn >= MAX_INTERROGATION_TURNS) {
    return {
      forced: !eligible,
      verdictMode: eligible ? 'normal' : 'forced_incomplete',
    }
  }

  return { forced: false, verdictMode: 'normal' }
}

/**
 * lieStateMap에서 ReadinessState를 집계한다.
 * evidenceCollapsedIds: 이미 fullCollapse된 증거 ID 집합 (중복 가산 방지)
 */
export function aggregateReadiness(
  lieStateMap: Record<string, { currentState: LieState }>,
  investigationSuccessEvidenceIds: Set<string>,
  fullCollapseEvidenceIds: Set<string>,
  hiddenDisputeRevealCount: number,
): ReadinessState {
  let crackedCount = 0
  let resolvedCount = 0
  let confessionCount = 0

  for (const entry of Object.values(lieStateMap)) {
    const rank = STATE_RANK[entry.currentState]
    if (rank >= 5) confessionCount++
    if (rank >= 4) resolvedCount++
    else if (rank >= 2) crackedCount++
  }

  const state: ReadinessState = {
    crackedDisputeCount: crackedCount,
    resolvedDisputeCount: resolvedCount,
    investigationSuccessCount: investigationSuccessEvidenceIds.size,
    fullCollapseCount: fullCollapseEvidenceIds.size,
    hiddenDisputeRevealCount,
    confessionCount,
    readinessScore: 0,
  }
  state.readinessScore = calculateReadinessScore(state)

  return state
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 내부
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const STATE_RANK: Record<LieState, number> = {
  S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5,
}

function getMajorBreakthroughCount(state: ReadinessState): number {
  return state.resolvedDisputeCount + state.fullCollapseCount + state.confessionCount
}

/**
 * 조기 종료 예외 조건 체크.
 * 아래 중 하나라도 만족하면 turn >= 6부터 판결 가능.
 */
function checkEarlyFinish(state: ReadinessState): boolean {
  // 고백 1회 발생
  if (state.confessionCount >= 1) return true

  // resolved dispute 2개
  if (state.resolvedDisputeCount >= 2) return true

  // resolved 1 + full collapse 1 + investigation success 2
  if (
    state.resolvedDisputeCount >= 1 &&
    state.fullCollapseCount >= 1 &&
    state.investigationSuccessCount >= 2
  ) {
    return true
  }

  return false
}
