/**
 * State Transition Helper — lieState 전이 이벤트 유틸
 * 엔진/훅에서 사용. React 의존 없음.
 */

import type { LieState } from '../types'
import { useGameStore } from '../store/useGameStore'

type TransitionLabel = 'cracked' | 'cornered' | 'opening' | 'confessed' | null

const STATE_RANK: Record<LieState, number> = {
  S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5,
}

const STATE_LABELS: Record<LieState, string> = {
  S0: '완전 부정', S1: '흔들림', S2: '부분 인정', S3: '전가', S4: '감정 호소', S5: '시인',
}

const LABEL_TEXT: Record<NonNullable<TransitionLabel>, string> = {
  cracked: '균열',
  cornered: '궁지',
  opening: '개방',
  confessed: '시인',
}

/** lieState 변화를 TransitionLabel로 변환 */
export function getTransitionLabel(from: LieState, to: LieState): TransitionLabel {
  const fromRank = STATE_RANK[from]
  const toRank = STATE_RANK[to]

  if (fromRank >= toRank) return null

  if (toRank === 5) return 'confessed'
  if (toRank >= 3) return 'cornered'
  if (toRank >= 1) return 'cracked'

  return null
}

/** lieState 전이 시 Store에 이벤트를 푸시하는 헬퍼 */
export function emitStateTransitionEvent(
  party: 'a' | 'b',
  disputeId: string,
  from: LieState,
  to: LieState,
  turn: number,
  partyName: string,
) {
  const label = getTransitionLabel(from, to)
  if (!label) return

  const text = LABEL_TEXT[label]
  const store = useGameStore.getState()
  store.pushGameEvent({
    id: store.gameEventLog.length + 1,
    turn,
    type: 'state_transition',
    message: `${partyName} — ${text}: ${STATE_LABELS[from]} → ${STATE_LABELS[to]}`,
    timestamp: Date.now(),
  })
}
