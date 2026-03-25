import type { StateCreator } from 'zustand'
import type { DialogueEntry, ClaimNode, ClaimStatus } from '../../types'

export interface DialogueSlice {
  dialogueLog: DialogueEntry[]
  claimGraph: ClaimNode[]
  nextDialogueId: number

  addDialogue: (entry: Omit<DialogueEntry, 'id'>) => string
  addClaim: (claim: Omit<ClaimNode, 'id'>) => string
  updateClaimStatus: (claimId: string, status: ClaimStatus) => void
  markConflict: (disputeId: string) => void
  getClaimsForDispute: (disputeId: string) => ClaimNode[]
  clearDialogue: () => void
}

export const createDialogueSlice: StateCreator<DialogueSlice, [], [], DialogueSlice> = (set, get) => ({
  dialogueLog: [],
  claimGraph: [],
  nextDialogueId: 1,

  addDialogue: (entry) => {
    const id = `dlg-${get().nextDialogueId}`
    set((state) => ({
      dialogueLog: [...state.dialogueLog, { ...entry, id }],
      nextDialogueId: state.nextDialogueId + 1,
    }))
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
    set({ dialogueLog: [], claimGraph: [], nextDialogueId: 1 })
  },
})
