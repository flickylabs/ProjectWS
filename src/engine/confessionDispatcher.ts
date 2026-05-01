/**
 * Confession Dispatcher
 * ─────────────────────
 * 체념 진입 + 자백 유도 선택 시 자백 entry 3단계를 NPC 발화로 dispatch.
 * 그리고 '재판관의 수첩'에 자백 등록.
 *
 * 호출 흐름:
 * 1. 체념 진입 → 자백 유도 모달
 * 2. 사용자 "자백 유도" 클릭 → dispatchConfession(party, disputeId)
 * 3. preConfession → confessionMain → postConfession 차례로 addDialogue
 * 4. addNotebookEntry({ category: 'confession', ... })
 * 5. confessionDispatched flag 설정 → 동일 쟁점 1회 제한
 */

import { useGameStore } from '../store/useGameStore'
import { getConfession } from '../data/confessionScripts'
import { normalizeCaseKey } from '../utils/caseHelpers'
import type { PartyId } from '../types'

export interface DispatchConfessionResult {
  ok: boolean
  reason?: 'no_data' | 'already_dispatched' | 'no_case'
}

/**
 * 자백 entry 3단계를 차례로 dispatch.
 * - preConfession: 자백자 발화
 * - confessionMain: 자백자 발화 (핵심)
 * - postConfession: 자백자 발화 (책임 인정)
 * - addNotebookEntry: 수첩에 자백 카테고리 등록
 */
export function dispatchConfession(party: PartyId, disputeId: string): DispatchConfessionResult {
  const state = useGameStore.getState()
  const caseData = state.caseData
  if (!caseData) return { ok: false, reason: 'no_case' }

  // 자백 1회 제한 (Phase C-4)
  const alreadyDispatched = state.confessionDispatched?.[party]?.[disputeId]
  if (alreadyDispatched) return { ok: false, reason: 'already_dispatched' }

  const caseId = normalizeCaseKey(caseData.caseId ?? '')
  const entry = getConfession(caseId, party, disputeId)
  if (!entry) return { ok: false, reason: 'no_data' }

  const partyName = party === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name
  const dispute = caseData.disputes.find((d) => d.id === disputeId)
  const disputeName = dispute?.name ?? disputeId

  // 1. preConfession (자백 직전 침묵 깨기)
  const preDialogueId = state.addDialogue({
    speaker: party,
    text: entry.preConfession,
    relatedDisputes: [disputeId],
    turn: state.turnCount,
    behaviorHint: '한 박자 늦게, 결심한 표정으로 입을 연다.',
    source: 'script',
  })

  // 2. confessionMain (핵심 자백)
  const mainDialogueId = state.addDialogue({
    speaker: party,
    text: entry.confessionMain,
    relatedDisputes: [disputeId],
    turn: state.turnCount,
    behaviorHint: '구체 사실을 차례대로 풀어놓는다.',
    source: 'script',
  })

  // 3. postConfession (자백 후 책임 인정)
  state.addDialogue({
    speaker: party,
    text: entry.postConfession,
    relatedDisputes: [disputeId],
    turn: state.turnCount,
    behaviorHint: '시선을 떨구거나 짧게 숨을 고른다.',
    source: 'script',
  })

  // 4. 재판관의 수첩 등록 (Phase D 슬라이스)
  state.addNotebookEntry?.({
    turnCount: state.turnCount,
    category: 'confession',
    iconId: 'i-key',
    title: `${partyName}의 자백 — ${disputeName}`,
    summary: entry.confessionMain.slice(0, 60) + (entry.confessionMain.length > 60 ? '…' : ''),
    party,
    disputeId,
    linkedDialogueId: mainDialogueId,
  })

  // 5. lieState 강제 S5 (자백 = 진실 도달)
  state.transitionLie?.(party, disputeId, 'confession_dispatched')

  // 6. confessionDispatched flag 설정 (1회 제한)
  state.markConfessionDispatched?.(party, disputeId)

  // 7. preDialogue/main jump 표시용 추가 처리
  void preDialogueId

  return { ok: true }
}
