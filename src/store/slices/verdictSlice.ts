import type { StateCreator } from 'zustand'
import type { VerdictInput, VerdictScore } from '../../types'

export interface VerdictSlice {
  verdictInput: VerdictInput
  verdictScore: VerdictScore | null

  setFactFinding: (disputeId: string, value: 'true' | 'false' | 'pending') => void
  setResponsibility: (disputeId: string, a: number, b: number) => void
  selectSolution: (solution: string) => void
  removeSolution: (solution: string) => void
  setEvidenceLegality: (evidenceId: string, allowed: boolean) => void
  setVerdictScore: (score: VerdictScore) => void
  resetVerdict: () => void
}

const emptyVerdictInput: VerdictInput = {
  factFindings: {},
  responsibility: {},
  selectedSolutions: [],
  evidenceLegality: {},
}

export const createVerdictSlice: StateCreator<VerdictSlice, [], [], VerdictSlice> = (set, get) => ({
  verdictInput: { ...emptyVerdictInput },
  verdictScore: null,

  setFactFinding: (disputeId, value) => {
    set((state) => ({
      verdictInput: {
        ...state.verdictInput,
        factFindings: { ...state.verdictInput.factFindings, [disputeId]: value },
      },
    }))
  },

  setResponsibility: (disputeId, a, b) => {
    set((state) => ({
      verdictInput: {
        ...state.verdictInput,
        responsibility: { ...state.verdictInput.responsibility, [disputeId]: { a, b } },
      },
    }))
  },

  selectSolution: (solution) => {
    const { verdictInput } = get()
    if (!verdictInput.selectedSolutions.includes(solution)) {
      set({
        verdictInput: {
          ...verdictInput,
          selectedSolutions: [...verdictInput.selectedSolutions, solution],
        },
      })
    }
  },

  removeSolution: (solution) => {
    set((state) => ({
      verdictInput: {
        ...state.verdictInput,
        selectedSolutions: state.verdictInput.selectedSolutions.filter((s) => s !== solution),
      },
    }))
  },

  setEvidenceLegality: (evidenceId, allowed) => {
    set((state) => ({
      verdictInput: {
        ...state.verdictInput,
        evidenceLegality: { ...state.verdictInput.evidenceLegality, [evidenceId]: allowed },
      },
    }))
  },

  setVerdictScore: (score) => {
    set({ verdictScore: score })
  },

  resetVerdict: () => {
    set({ verdictInput: { ...emptyVerdictInput }, verdictScore: null })
  },
})
