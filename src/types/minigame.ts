/** 미니게임 시스템 타입 */

export type MiniGameType = 'memory_match' | 'skill_runner' | 'whack_a_mole'

export type TokenRewardType = 'investigation' | 'skill' | 'court'

export const MINIGAME_TOKEN_MAP: Record<MiniGameType, TokenRewardType> = {
  memory_match: 'investigation',
  skill_runner: 'skill',
  whack_a_mole: 'court',
}

export const MINIGAME_LABELS: Record<MiniGameType, string> = {
  memory_match: '짝맞추기',
  skill_runner: '스킬 러너',
  whack_a_mole: '두더지 잡기',
}

export const MINIGAME_MAX_ROUNDS = 5

export interface MiniGameConfig {
  type: MiniGameType
  round: number // 1~5
}

export interface MiniGameResult {
  type: MiniGameType
  round: number
  success: boolean
  score?: number
}

export interface MiniGameProgress {
  completedRounds: number // 0~5
  totalEarned: number     // 획득 토큰 누적
}
