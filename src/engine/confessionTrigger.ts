/**
 * Confession Trigger
 * ──────────────────
 * 체념 진입 시 자백 유도 모달을 enqueue하는 헬퍼.
 * phaseSlice incrementTurn hook에서 호출.
 *
 * store는 인자로 전달받아 순환 의존 회피.
 */

import { getConfession } from '../data/confessionScripts'
import { dispatchConfession } from './confessionDispatcher'
import { normalizeCaseKey } from '../utils/caseHelpers'
import type { PartyId } from '../types'

export function triggerConfessionModalIfReady(party: PartyId, store: any) {
  const caseData = store.caseData
  if (!caseData) return

  const focusedDispute = store.lastFocusedDisputeId
  if (!focusedDispute) return

  // 이미 자백 dispatch 됐거나 모달 띄운 적 있으면 skip (1회 제한)
  if (store.confessionDispatched?.[party]?.[focusedDispute]) return
  if (store.confessionModalShown?.[party]?.[focusedDispute]) return

  const caseId = normalizeCaseKey(caseData.caseId ?? '')
  const entry = getConfession(caseId, party, focusedDispute)
  if (!entry) return  // 해당 쟁점 자백 entry 없으면 모달 안 띄움

  const partyName = party === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name
  const dispute = caseData.disputes.find((d: { id: string }) => d.id === focusedDispute)
  const disputeName = dispute?.name ?? focusedDispute

  store.markConfessionModalShown?.(party, focusedDispute)

  store.enqueueFeedback?.({
    kind: 'transition_choice',
    eyebrow: '자백 유도',
    title: `${partyName}의 자백`,
    subtitle: disputeName,
    body: `${partyName}이(가) 체념 상태에 빠졌습니다. 핵심 진실을 자백받을 수 있습니다. 추가 추궁으로 더 큰 자백을 노릴 수도 있습니다.`,
    tone: 'gold',
    actions: [
      {
        label: '추가 추궁',
        tone: 'gray',
        onSelect: () => {
          // 모달만 dismiss. 다음 추궁에서 다시 트리거 가능 (confessionModalShown은 같은 쟁점 1회만 — 다른 쟁점이 focused가 되면 새 모달).
        },
      },
      {
        label: '자백 유도',
        tone: 'gold',
        onSelect: () => {
          dispatchConfession(party, focusedDispute)
        },
      },
    ],
  })
}
