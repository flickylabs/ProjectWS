import type { StateCreator } from 'zustand'
import type { VerdictInput, VerdictScore } from '../../types'
import type { VerdictSummary } from '../../engine/verdictSummaryEngine'

export interface VerdictSlice {
  verdictInput: VerdictInput
  verdictScore: VerdictScore | null
  verdictSummary: VerdictSummary | null

  setFactFinding: (disputeId: string, value: 'true' | 'false' | 'pending') => void
  setResponsibility: (disputeId: string, a: number, b: number) => void
  selectSolution: (solution: string) => void
  removeSolution: (solution: string) => void
  setEvidenceLegality: (evidenceId: string, allowed: boolean) => void
  setVerdictScore: (score: VerdictScore) => void
  setVerdictSummary: (summary: VerdictSummary | null) => void
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
  verdictSummary: null,

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

  setVerdictSummary: (summary) => {
    set({ verdictSummary: summary })
  },

  resetVerdict: () => {
    set({ verdictInput: { ...emptyVerdictInput }, verdictScore: null, verdictSummary: null })
  },
})
