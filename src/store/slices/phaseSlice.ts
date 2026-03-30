import type { StateCreator } from 'zustand'
import { GamePhase } from '../../types'
import { MIN_TURNS_BEFORE_ADVANCE, PHASE_ORDER, MAX_TURNS } from '../../utils/constants'

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

    // Phase 전환: separationTarget/separationTurns는 GameStore 루트 상태이지만
    // Zustand 슬라이스 간 상태 공유를 위해 여기서 직접 리셋 (의도적 타입 캐스트)
    set((state) => ({
      currentPhase: nextPhase,
      phaseHistory: [...state.phaseHistory, state.currentPhase],
      phaseTurnCount: 0,
      separationTarget: null,
      separationTurns: 0,
    } as Partial<typeof state>))
  },

  incrementTurn: () => {
    set((state) => ({
      turnCount: state.turnCount + 1,
      phaseTurnCount: state.phaseTurnCount + 1,
    }))
    // 최대 턴 초과 시 Phase6(중재안)으로 자동 전환
    const { turnCount, currentPhase, advancePhase } = get()
    const activePhases = [
      GamePhase.Phase3_Interrogation,
      GamePhase.Phase4_Evidence,
      GamePhase.Phase5_ReExamination,
    ]
    if (turnCount >= MAX_TURNS && activePhases.includes(currentPhase)) {
      advancePhase(GamePhase.Phase6_Mediation)
    }
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
