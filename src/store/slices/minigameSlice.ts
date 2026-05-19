/**
 * Deprecated minigame slice.
 * Kept only to migrate old saved sessions without exposing minigame runtime.
 */
import type { StateCreator } from 'zustand'
import type { MiniGameType, MiniGameProgress, MiniGameConfig } from '../../types/minigame'
import type { UnsafeAny } from '../../types/lint'


export interface MinigameSlice {
  /** 미니게임별 진행도 */
  minigameProgress: Record<MiniGameType, MiniGameProgress>
  /** 현재 진행 중인 미니게임 (null이면 비활성) */
  activeMinigame: MiniGameConfig | null
  /** 미니게임 시작 */
  startMinigame: (type: MiniGameType) => void
  /** 미니게임 결과 처리 */
  completeMinigame: (success: boolean) => void
  /** 미니게임 취소/닫기 */
  cancelMinigame: () => void
}

const EMPTY_PROGRESS: MiniGameProgress = { completedRounds: 0, totalEarned: 0 }

export const createMinigameSlice: StateCreator<UnsafeAny, [], [], MinigameSlice> = (set) => ({
  minigameProgress: {
    memory_match: { ...EMPTY_PROGRESS },
    skill_runner: { ...EMPTY_PROGRESS },
    whack_a_mole: { ...EMPTY_PROGRESS },
  },
  activeMinigame: null,

  startMinigame: () => {
    set({ activeMinigame: null })
  },

  completeMinigame: () => {
    set({ activeMinigame: null })
  },

  cancelMinigame: () => {
    set({ activeMinigame: null })
  },
})
