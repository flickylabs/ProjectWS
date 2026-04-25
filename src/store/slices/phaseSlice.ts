import type { StateCreator } from 'zustand'
import { GamePhase, Phase } from '../../types'
import type { VerdictMode } from '../../types'
import { PHASE_ORDER } from '../../utils/constants'
import { checkVerdictEligible, checkForcedVerdict } from '../../engine/readinessEngine'
import { normalizeCaseKey } from '../../utils/caseHelpers'

export type MediationChoice = 'immediate' | 'conditional' | 'postpone' | 'fact_first' | null

export interface PhaseSlice {
  currentPhase: GamePhase
  phaseHistory: GamePhase[]
  turnCount: number
  phaseTurnCount: number
  /** 판결 모드: normal(정상) / forced_incomplete(불충분 심리) */
  verdictMode: VerdictMode
  /** Phase 6에서 선택한 중재 유형 (Phase 7에서 참조) */
  mediationChoice: MediationChoice

  advancePhase: (skipTo?: GamePhase) => void
  incrementTurn: () => void
  canAdvancePhase: () => boolean
  setPhase: (phase: GamePhase) => void
  setVerdictMode: (mode: VerdictMode) => void
  setMediationChoice: (choice: MediationChoice) => void
}

export const createPhaseSlice: StateCreator<PhaseSlice, [], [], PhaseSlice> = (set, get) => ({
  currentPhase: Phase.Briefing,
  phaseHistory: [],
  turnCount: 0,
  phaseTurnCount: 0,
  verdictMode: 'normal',
  mediationChoice: null,

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
    if (nextPhase === Phase.Interrogation) {
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

    // [Phase B-2] 셧다운(체념) 만료 시 emotion 자동 격앙으로 전환.
    // 만료 직후에도 emotion ≥ 85 유지되면 다음 질문 즉시 다시 셧다운 진입 → 무한 루프.
    // → 만료 턴에 emotion을 격앙 범위(75)로 자동 조정 + 시스템 메시지로 안내.
    const after = get() as any
    for (const party of ['a', 'b'] as const) {
      const lockoutUntil = after.emotionalLockoutUntil?.[party] ?? 0
      if (lockoutUntil > 0 && lockoutUntil === after.turnCount) {
        const agent = party === 'a' ? after.agentA : after.agentB
        const emotionVal = agent?.emotionalState?.internalValue ?? 0
        if (emotionVal >= 85 && after.changeEmotion) {
          // 격앙 영역(75)으로 떨어뜨려 즉시 재진입 방지
          after.changeEmotion(party, -(emotionVal - 75))
          const partyName = party === 'a'
            ? after.caseData?.duo?.partyA?.name ?? '당사자'
            : after.caseData?.duo?.partyB?.name ?? '당사자'
          if (after.addDialogue) {
            after.addDialogue({
              speaker: 'system',
              text: `${partyName}이(가) 호흡을 가라앉히고 다시 답할 수 있는 상태가 되었습니다.`,
              relatedDisputes: [],
              turn: after.turnCount,
            })
          }
        }
      }
    }

    // 매 턴 끝: readiness 자동 갱신
    const fullState = get() as any
    if (fullState.updateReadiness) fullState.updateReadiness()

    // 최대 턴 초과 시 강제 판결 전환 (readinessEngine canonical)
    const state = get() as any
    const { turnCount, currentPhase, advancePhase, setVerdictMode } = state
    const interrogationPhases = [
      Phase.Interrogation,
      GamePhase.Phase4_Evidence,
      GamePhase.Phase5_ReExamination,
    ]
    if (interrogationPhases.includes(currentPhase) && state.readinessState) {
      const { forced, verdictMode } = checkForcedVerdict(turnCount, state.readinessState)
      if (forced) {
        setVerdictMode(verdictMode)
        advancePhase(Phase.Mediation)
      }
    }
  },

  canAdvancePhase: () => {
    const state = get() as any // GameStore 전체 접근 (readinessState 포함)
    const { currentPhase } = state

    // Phase 3 통합 심문: readinessEngine에서 판결 가능 여부 확인
    if (currentPhase === Phase.Interrogation) {
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
  setMediationChoice: (choice) => {
    set({ mediationChoice: choice })
  },
})
