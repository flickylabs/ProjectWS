import type { StateCreator } from 'zustand'
import { GamePhase } from '../../types'
import { MIN_TURNS_BEFORE_ADVANCE, PHASE_ORDER } from '../../utils/constants'

export interface PhaseSlice {
  currentPhase: GamePhase
  phaseHistory: GamePhase[]
  turnCount: number
  phaseTurnCount: number

  advancePhase: (skipTo?: GamePhase) => void
  incrementTurn: () => void
  canAdvancePhase: () => boolean
  setPhase: (phase: GamePhase) => void
}

export const createPhaseSlice: StateCreator<PhaseSlice, [], [], PhaseSlice> = (set, get) => ({
  currentPhase: GamePhase.Phase0_CaseIntro,
  phaseHistory: [],
  turnCount: 0,
  phaseTurnCount: 0,

  advancePhase: (skipTo) => {
    const { currentPhase } = get()
    let nextPhase: GamePhase

    if (skipTo) {
      nextPhase = skipTo
    } else {
      const currentIndex = PHASE_ORDER.indexOf(currentPhase)
      if (currentIndex === -1 || currentIndex >= PHASE_ORDER.length - 1) return
      nextPhase = PHASE_ORDER[currentIndex + 1]
    }

    set((state) => ({
      currentPhase: nextPhase,
      phaseHistory: [...state.phaseHistory, state.currentPhase],
      phaseTurnCount: 0,
    }))
  },

  incrementTurn: () => {
    set((state) => ({
      turnCount: state.turnCount + 1,
      phaseTurnCount: state.phaseTurnCount + 1,
    }))
  },

  canAdvancePhase: () => {
    const { currentPhase, phaseTurnCount } = get()
    const minTurns = MIN_TURNS_BEFORE_ADVANCE[currentPhase]
    if (minTurns !== undefined && phaseTurnCount < minTurns) return false
    return true
  },

  setPhase: (phase) => {
    set((state) => ({
      currentPhase: phase,
      phaseHistory: [...state.phaseHistory, state.currentPhase],
      phaseTurnCount: 0,
    }))
  },
})
