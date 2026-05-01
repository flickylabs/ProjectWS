import type { StateCreator } from 'zustand'
import type { DialogueEntry, ClaimNode, ClaimStatus } from '../../types'
import type { EventFeedbackItem } from './eventFeedbackSlice'

/**
 * [B-17 D 옵션] 시스템 메시지 기반 수동 트리거 모달
 *
 * 4종 이벤트(emergence/contradiction/interjection/emotional_burst)는
 * 모달을 자동 띄우지 않고, 시스템 메시지에 붙은 pending payload를
 * 플레이어가 직접 클릭했을 때만 enqueueFeedback을 호출한다.
 */
export interface DialoguePendingFeedback {
  payload: Omit<EventFeedbackItem, 'id'>
  createdTurn: number
  /** 5턴 초과 후 자동 비활성화. 명시적 설정 없으면 5 */
  expireAfterTurns?: number
  consumed?: boolean
}

export interface DialogueSlice {
  dialogueLog: DialogueEntry[]
  claimGraph: ClaimNode[]
  nextDialogueId: number
  /** [B-17 D] dialogueId → pendingFeedback 매핑. 시스템 메시지 클릭 시 모달 트리거 */
  dialoguePendingFeedback: Record<string, DialoguePendingFeedback>

  addDialogue: (entry: Omit<DialogueEntry, 'id'>) => string
  addClaim: (claim: Omit<ClaimNode, 'id'>) => string
  updateClaimStatus: (claimId: string, status: ClaimStatus) => void
  markConflict: (disputeId: string) => void
  getClaimsForDispute: (disputeId: string) => ClaimNode[]
  clearDialogue: () => void
  /** [B-17 D] 시스템 메시지에 수동 트리거용 pending feedback 부착 */
  attachDialoguePendingFeedback: (dialogueId: string, payload: Omit<EventFeedbackItem, 'id'>, createdTurn: number, expireAfterTurns?: number) => void
  /** [B-17 D] pending feedback 소모 (클릭 or 턴 경과 만료) */
  consumeDialoguePendingFeedback: (dialogueId: string) => void
}

export const createDialogueSlice: StateCreator<DialogueSlice, [], [], DialogueSlice> = (set, get) => ({
  dialogueLog: [],
  claimGraph: [],
  nextDialogueId: 1,
  dialoguePendingFeedback: {},

  addDialogue: (entry) => {
    const id = `dlg-${get().nextDialogueId}`
    const fullState = get() as any
    const agent = entry.speaker === 'a'
      ? fullState.agentA
      : entry.speaker === 'b'
        ? fullState.agentB
        : null
    const emotionSnapshot = agent?.emotionalState
      ? {
          phase: agent.emotionalState.phase,
          internalValue: agent.emotionalState.internalValue,
        }
      : undefined
    set((state) => ({
      dialogueLog: [...state.dialogueLog, { ...entry, id, emotionSnapshot }],
      nextDialogueId: state.nextDialogueId + 1,
    }))
    // 조합용 statement 노드 동기화 — 당사자 발언에서만 매칭
    if (entry.speaker === 'a' || entry.speaker === 'b') {
      ;(get() as any).syncStatementsFromDialogue?.(entry.text ?? '')
    }
    return id
  },

  addClaim: (claim) => {
    const id = `claim-${get().claimGraph.length + 1}`
    const newClaim: ClaimNode = { ...claim, id }

    // 같은 쟁점의 기존 클레임과 충돌 체크
    const existing = get().claimGraph.filter(
      (c) => c.disputeId === claim.disputeId && c.claimant !== claim.claimant,
    )
    if (existing.length > 0) {
      newClaim.status = 'conflict'
      // 기존 것도 conflict로 업데이트
      set((state) => ({
        claimGraph: [
          ...state.claimGraph.map((c) =>
            c.disputeId === claim.disputeId && c.claimant !== claim.claimant && c.status === 'normal'
              ? { ...c, status: 'conflict' as ClaimStatus }
              : c,
          ),
          newClaim,
        ],
      }))
    } else {
      set((state) => ({
        claimGraph: [...state.claimGraph, newClaim],
      }))
    }

    return id
  },

  updateClaimStatus: (claimId, status) => {
    set((state) => ({
      claimGraph: state.claimGraph.map((c) => (c.id === claimId ? { ...c, status } : c)),
    }))
  },

  markConflict: (disputeId) => {
    set((state) => ({
      claimGraph: state.claimGraph.map((c) =>
        c.disputeId === disputeId && c.status === 'normal' ? { ...c, status: 'conflict' } : c,
      ),
    }))
  },

  getClaimsForDispute: (disputeId) => {
    return get().claimGraph.filter((c) => c.disputeId === disputeId)
  },

  clearDialogue: () => {
    set({ dialogueLog: [], claimGraph: [], nextDialogueId: 1, dialoguePendingFeedback: {} })
  },

  attachDialoguePendingFeedback: (dialogueId, payload, createdTurn, expireAfterTurns = 5) => {
    set((state) => ({
      dialoguePendingFeedback: {
        ...state.dialoguePendingFeedback,
        [dialogueId]: { payload, createdTurn, expireAfterTurns, consumed: false },
      },
    }))
  },

  consumeDialoguePendingFeedback: (dialogueId) => {
    set((state) => {
      const current = state.dialoguePendingFeedback[dialogueId]
      if (!current || current.consumed) return state
      return {
        dialoguePendingFeedback: {
          ...state.dialoguePendingFeedback,
          [dialogueId]: { ...current, consumed: true },
        },
      }
    })
  },
})
