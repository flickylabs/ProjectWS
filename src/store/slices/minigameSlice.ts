/**
 * 미니게임 슬라이스 — 3종 미니게임 진행 상태 추적
 */
import type { StateCreator } from 'zustand'
import type { MiniGameType, MiniGameProgress, MiniGameConfig } from '../../types/minigame'
import { MINIGAME_MAX_ROUNDS, MINIGAME_TOKEN_MAP } from '../../types/minigame'

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

export const createMinigameSlice: StateCreator<any, [], [], MinigameSlice> = (set, get) => ({
  minigameProgress: {
    memory_match: { ...EMPTY_PROGRESS },
    skill_runner: { ...EMPTY_PROGRESS },
    whack_a_mole: { ...EMPTY_PROGRESS },
  },
  activeMinigame: null,

  startMinigame: (type) => {
    const progress = get().minigameProgress[type] as MiniGameProgress
    if (progress.completedRounds >= MINIGAME_MAX_ROUNDS) return // 이미 5회 완료
    set({
      activeMinigame: {
        type,
        round: progress.completedRounds + 1,
      },
    })
  },

  completeMinigame: (success) => {
    const config = get().activeMinigame as MiniGameConfig | null
    if (!config) return

    if (success) {
      const progress = get().minigameProgress[config.type] as MiniGameProgress
      const tokenType = MINIGAME_TOKEN_MAP[config.type]

      // 토큰 지급
      const resourceKey = tokenType === 'investigation' ? 'investigationTokens'
        : tokenType === 'skill' ? 'skillPoints'
        : 'courtControl'
      ;(get() as any).gain(resourceKey, 1)

      // 진행도 업데이트
      set({
        minigameProgress: {
          ...get().minigameProgress,
          [config.type]: {
            completedRounds: progress.completedRounds + 1,
            totalEarned: progress.totalEarned + 1,
          },
        },
        activeMinigame: null,
      })

      // 토큰 획득 이벤트 발화
      window.dispatchEvent(new CustomEvent('pc:token-gain', { detail: { type: tokenType, amount: 1 } }))
    } else {
      // 실패: activeMinigame 유지 (같은 회차 재도전 가능)
      // UI에서 재도전/스킵 선택
    }
  },

  cancelMinigame: () => {
    set({ activeMinigame: null })
  },
})
