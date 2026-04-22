/**
 * Interjection Resentment Tracker
 * ─────────────────────────────────
 * V2 끼어들기 기회 생성/모달 경로는 제거됨(gameEventTriggerEngine의 V3 경로로 일원화).
 * 이 모듈은 끼어들기 제지 시의 resentment 누적만 관리한다.
 *
 * - 플레이어가 끼어들기를 제지하면 해당 당사자에게 resentment stacks 쌓임
 * - npcReactionV2가 resentment penalty를 조회하여 NPC 응답 가중치(comply/resist)에 반영
 * - resentment는 일정 턴 후 자동 만료
 */

import type { PartyId } from '../types'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 타입
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface InterjectionResentmentState {
  stacks: number
  untilTurn: number
}

export interface InterjectionTrackerState {
  resentmentByParty: Partial<Record<PartyId, InterjectionResentmentState>>
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 상수
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const CONFIG = {
  resentmentStacks: 1,
  resentmentDuration: 3,
  maxPenalty: 10,
  penaltyPerStack: 10,
} as const

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 초기 상태
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function createInitialInterjectionTracker(): InterjectionTrackerState {
  return { resentmentByParty: {} }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 세션 상태 (모듈 레벨)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let _sessionTracker: InterjectionTrackerState = createInitialInterjectionTracker()

export function getSessionInterjectionTracker(): InterjectionTrackerState {
  return _sessionTracker
}

export function setSessionInterjectionTracker(t: InterjectionTrackerState): void {
  _sessionTracker = t
}

export function resetSessionInterjectionTracker(): void {
  _sessionTracker = createInitialInterjectionTracker()
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 공개 API
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** 끼어들기 제지 시 호출 — interruptor(끼어든 당사자)에 resentment 누적 */
export function applyInterjectionBlockResentment(interruptor: PartyId, turn: number): void {
  const next: InterjectionTrackerState = {
    resentmentByParty: { ..._sessionTracker.resentmentByParty },
  }
  // 만료된 resentment 정리
  for (const [party, entry] of Object.entries(next.resentmentByParty)) {
    if (entry && turn > entry.untilTurn) delete next.resentmentByParty[party as PartyId]
  }
  next.resentmentByParty[interruptor] = {
    stacks: CONFIG.resentmentStacks,
    untilTurn: turn + CONFIG.resentmentDuration,
  }
  _sessionTracker = next
}

/** npcReactionV2에서 호출 — party의 현재 resentment penalty (0 ~ maxPenalty) */
export function getResentmentPenalty(
  tracker: InterjectionTrackerState,
  party: PartyId,
  turn: number,
): number {
  const entry = tracker.resentmentByParty[party]
  if (!entry || turn > entry.untilTurn) return 0
  return Math.min(CONFIG.maxPenalty, entry.stacks * CONFIG.penaltyPerStack)
}
