import type { StateCreator } from 'zustand'

/**
 * Core narrative wrapper (Cycle 2+) — emergence fire 통합 추적.
 *
 * 책임:
 *  - 모든 emergence type (evidence / dossier / witness / dispute) 의 fire 상태를
 *    단일 slice에 저장. cascade_from_card precondition lookup의 single source.
 *  - 첫 legacy-eligible turn 기록 (judge_auto_mention fallback 평가 기준점).
 *
 * 권위: [[design_core_narrative_cycle_procedure]] / [[design_narrative_cascade_from_card]]
 */
export interface FiredEmergenceEntry {
  triggerId: string
  turn: number
}

export interface NarrativeSlice {
  /** emergenceId (evidence/dossier/witness/dispute 통합) → fire 기록 */
  firedEmergences: Record<string, FiredEmergenceEntry>
  /** emergenceId → 처음 legacy-eligible turn (fallback judge_auto_mention 평가 기준점) */
  narrativeLegacyEligibleTurns: Record<string, number>

  /** fire 성공 시 호출 — 이후 후보 평가 skip + cascade lookup pool 포함 */
  markNarrativeFiredEmergence: (emergenceId: string, triggerId: string, turn: number) => void
  /** 잘못된 fire revert (테스트/디버그 용도) */
  revertNarrativeFiredEmergence: (emergenceId: string) => void
  /** legacy 즉시 surface 조건 만족 시점 첫 기록 (덮어쓰지 않음) */
  markNarrativeLegacyEligible: (emergenceId: string, turn: number) => void
  /** cascade_from_card lookup용 fired emergence id set */
  getFiredEmergenceIds: () => ReadonlySet<string>
  /** 사건 초기화 시 cycle 상태 전체 리셋 */
  resetNarrativeFires: () => void
}

export const createNarrativeSlice: StateCreator<NarrativeSlice, [], [], NarrativeSlice> = (set, get) => ({
  firedEmergences: {},
  narrativeLegacyEligibleTurns: {},

  markNarrativeFiredEmergence: (emergenceId, triggerId, turn) => {
    const { firedEmergences } = get()
    if (firedEmergences[emergenceId]) return
    set({
      firedEmergences: {
        ...firedEmergences,
        [emergenceId]: { triggerId, turn },
      },
    })
  },

  revertNarrativeFiredEmergence: (emergenceId) => {
    const { firedEmergences } = get()
    if (!firedEmergences[emergenceId]) return
    const next = { ...firedEmergences }
    delete next[emergenceId]
    set({ firedEmergences: next })
  },

  markNarrativeLegacyEligible: (emergenceId, turn) => {
    const { narrativeLegacyEligibleTurns } = get()
    if (narrativeLegacyEligibleTurns[emergenceId] !== undefined) return
    set({
      narrativeLegacyEligibleTurns: {
        ...narrativeLegacyEligibleTurns,
        [emergenceId]: turn,
      },
    })
  },

  getFiredEmergenceIds: () => {
    const { firedEmergences } = get()
    return new Set(Object.keys(firedEmergences))
  },

  resetNarrativeFires: () => {
    set({ firedEmergences: {}, narrativeLegacyEligibleTurns: {} })
  },
})
