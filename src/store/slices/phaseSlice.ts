import type { StateCreator } from 'zustand'
import { GamePhase } from '../../types'
import type { VerdictMode } from '../../types'
import { PHASE_ORDER } from '../../utils/constants'
import { checkVerdictEligible, checkForcedVerdict } from '../../engine/readinessEngine'
import { normalizeCaseKey } from '../../utils/caseHelpers'

export interface PhaseSlice {
  currentPhase: GamePhase
  phaseHistory: GamePhase[]
  turnCount: number
  phaseTurnCount: number
  /** 판결 모드: normal(정상) / forced_incomplete(불충분 심리) */
  verdictMode: VerdictMode

  advancePhase: (skipTo?: GamePhase) => void
  incrementTurn: () => void
  canAdvancePhase: () => boolean
  setPhase: (phase: GamePhase) => void
  setVerdictMode: (mode: VerdictMode) => void
}

export const createPhaseSlice: StateCreator<PhaseSlice, [], [], PhaseSlice> = (set, get) => ({
  currentPhase: GamePhase.Phase0_CaseIntro,
  phaseHistory: [],
  turnCount: 0,
  phaseTurnCount: 0,
  verdictMode: 'normal',

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

    // Phase 3 진입 시 브리지 자동 적용
    if (nextPhase === GamePhase.Phase3_Interrogation) {
      const fullState = get() as any
      if (fullState.applyPhase3Bridge && fullState.caseData) {
        const caseId = normalizeCaseKey(fullState.caseData)
        if (caseId) fullState.applyPhase3Bridge(caseId)
      }
    }
  },

  incrementTurn: () => {
    set((state) => ({
      turnCount: state.turnCount + 1,
      phaseTurnCount: state.phaseTurnCount + 1,
    }))

    // 매 턴 끝: readiness 자동 갱신
    const fullState = get() as any
    if (fullState.updateReadiness) fullState.updateReadiness()

    // 최대 턴 초과 시 강제 판결 전환 (readinessEngine canonical)
    const state = get() as any
    const { turnCount, currentPhase, advancePhase, setVerdictMode } = state
    const interrogationPhases = [
      GamePhase.Phase3_Interrogation,
      GamePhase.Phase4_Evidence,
      GamePhase.Phase5_ReExamination,
    ]
    if (interrogationPhases.includes(currentPhase) && state.readinessState) {
      const { forced, verdictMode } = checkForcedVerdict(turnCount, state.readinessState)
      if (forced) {
        setVerdictMode(verdictMode)
        advancePhase(GamePhase.Phase6_Mediation)
      }
    }
  },

  canAdvancePhase: () => {
    const state = get() as any // GameStore 전체 접근 (readinessState 포함)
    const { currentPhase } = state

    // Phase 3 통합 심문: readinessEngine에서 판결 가능 여부 확인
    if (currentPhase === GamePhase.Phase3_Interrogation) {
      // readinessState가 store에 있으면 사용, 없으면 기본 허용
      if (state.readinessState) {
        const { eligible } = checkVerdictEligible(state.turnCount, state.readinessState)
        return eligible
      }
      // 폴백: 기존 로직 (하위 호환)
      const metrics = state.processMetrics
      return (metrics?.lieTransitions ?? 0) >= 2 || state.phaseTurnCount >= 10
    }

    // Phase4, Phase5가 레거시로 진입한 경우에도 처리
    if (currentPhase === GamePhase.Phase4_Evidence || currentPhase === GamePhase.Phase5_ReExamination) {
      return true // 즉시 다음으로 넘김
    }

    return true
  },

  setPhase: (phase) => {
    set((state) => ({
      currentPhase: phase,
      phaseHistory: [...state.phaseHistory, state.currentPhase],
      phaseTurnCount: 0,
    }))
  },

  setVerdictMode: (mode) => {
    set({ verdictMode: mode })
  },
})
