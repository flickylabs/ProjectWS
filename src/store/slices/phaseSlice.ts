import type { StateCreator } from 'zustand'
import { GamePhase, Phase } from '../../types'
import type { VerdictMode } from '../../types'
import { PHASE_ORDER } from '../../utils/constants'
import { checkVerdictEligible, checkForcedVerdict } from '../../engine/readinessEngine'
import { normalizeCaseKey } from '../../utils/caseHelpers'
import { triggerConfessionModalIfReady } from '../../engine/confessionTrigger'
import { getVerdictDisputeGate } from '../../engine/verdictAdvanceGate'
import { emitPhaseEnter, emitPhaseExit } from '../../telemetry/wirePoints'
import type { UnsafeAny } from '../../types/lint'


let phaseEnteredAt = Date.now()

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

    if (
      currentPhase === Phase.Interrogation &&
      (nextPhase === Phase.Mediation || nextPhase === Phase.Verdict) &&
      !getVerdictDisputeGate(get() as UnsafeAny).hasMinimumVisibleDisputes
    ) {
      return
    }

    const rootBefore = get() as UnsafeAny
    emitPhaseExit(
      currentPhase,
      (Date.now() - phaseEnteredAt) / 1000,
      rootBefore.phaseTurnCount ?? 0,
      rootBefore.caseData?.caseId,
    )

    // Phase 전환: separationTarget/separationTurns는 GameStore 루트 상태이지만
    // Zustand 슬라이스 간 상태 공유를 위해 여기서 직접 리셋 (의도적 타입 캐스트)
    set((state) => ({
      currentPhase: nextPhase,
      phaseHistory: [...state.phaseHistory, state.currentPhase],
      phaseTurnCount: 0,
      separationTarget: null,
      separationTurns: 0,
    } as Partial<typeof state>))

    phaseEnteredAt = Date.now()
    const rootAfter = get() as UnsafeAny
    emitPhaseEnter(
      nextPhase,
      rootAfter.turnCount ?? rootBefore.turnCount ?? 0,
      currentPhase,
      rootAfter.caseData?.caseId ?? rootBefore.caseData?.caseId,
    )

    // Phase 3 진입 시 브리지 자동 적용
    if (nextPhase === Phase.Interrogation) {
      const fullState = get() as UnsafeAny
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

    // [Phase C-2 새 기획] 셧다운 만료 시 emotion 자동 체념(85+)으로 진입 + 자백 유도 모달.
    const after = get() as UnsafeAny
    for (const party of ['a', 'b'] as const) {
      const lockoutUntil = after.emotionalLockoutUntil?.[party] ?? 0
      if (lockoutUntil > 0 && lockoutUntil === after.turnCount) {
        const agent = party === 'a' ? after.agentA : after.agentB
        const emotionVal = agent?.emotionalState?.internalValue ?? 0
        const partyName = party === 'a'
          ? after.caseData?.duo?.partyA?.name ?? '당사자'
          : after.caseData?.duo?.partyB?.name ?? '당사자'
        if (emotionVal < 85 && after.changeEmotion) {
          // 셧다운 만료 → 체념(87)으로 자동 진입
          after.changeEmotion(party, 87 - emotionVal)
          if (after.addDialogue) {
            after.addDialogue({
              speaker: 'system',
              text: `${partyName}의 저항이 무너졌습니다. 자백을 유도할 수 있는 상태입니다.`,
              relatedDisputes: [],
              turn: after.turnCount,
            })
          }
          // [Phase C-3] 자백 유도 모달 enqueue
          // 체념 진입 시점에 lastFocusedDisputeId 기준 자백 가능한지 확인 + 모달 1회 트리거
          triggerConfessionModalIfReady(party, after)
        }
      }
    }

    // 매 턴 끝: readiness 자동 갱신
    const fullState = get() as UnsafeAny
    if (fullState.updateReadiness) fullState.updateReadiness()

    // 최대 턴 초과 시 강제 판결 전환 (readinessEngine canonical)
    const state = get() as UnsafeAny
    const { turnCount, currentPhase, advancePhase, setVerdictMode } = state
    const interrogationPhases = [
      Phase.Interrogation,
      GamePhase.Phase4_Evidence,
      GamePhase.Phase5_ReExamination,
    ]
    if (interrogationPhases.includes(currentPhase) && state.readinessState) {
      const { forced, verdictMode } = checkForcedVerdict(turnCount, state.readinessState)
      if (forced && getVerdictDisputeGate(state).hasMinimumVisibleDisputes) {
        setVerdictMode(verdictMode)
        advancePhase(Phase.Mediation)
      }
    }
  },

  canAdvancePhase: () => {
    const state = get() as UnsafeAny // GameStore 전체 접근 (readinessState 포함)
    const { currentPhase } = state

    // Phase 3 통합 심문: readinessEngine에서 판결 가능 여부 확인
    if (currentPhase === Phase.Interrogation) {
      if (!getVerdictDisputeGate(state).hasMinimumVisibleDisputes) {
        return false
      }
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
    const rootBefore = get() as UnsafeAny
    const previousPhase = rootBefore.currentPhase
    emitPhaseExit(
      previousPhase,
      (Date.now() - phaseEnteredAt) / 1000,
      rootBefore.phaseTurnCount ?? 0,
      rootBefore.caseData?.caseId,
    )

    set((state) => ({
      currentPhase: phase,
      phaseHistory: [...state.phaseHistory, state.currentPhase],
      phaseTurnCount: 0,
    }))
    phaseEnteredAt = Date.now()
    const rootAfter = get() as UnsafeAny
    emitPhaseEnter(
      phase,
      rootAfter.turnCount ?? rootBefore.turnCount ?? 0,
      previousPhase,
      rootAfter.caseData?.caseId ?? rootBefore.caseData?.caseId,
    )
  },

  setVerdictMode: (mode) => {
    set({ verdictMode: mode })
  },
  setMediationChoice: (choice) => {
    set({ mediationChoice: choice })
  },
})
