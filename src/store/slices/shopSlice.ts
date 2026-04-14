/**
 * 상점 슬라이스 — V5에서 글로벌 토큰 폐지, 로컬 resourceSlice로 통일.
 * 충전/광고/구매 시스템은 출시 시 BM 설계에서 재구축 예정.
 * 현재는 인터페이스만 유지 (useGameStore 호환), 구현은 no-op.
 */
import type { StateCreator } from 'zustand'

export interface ShopSlice {
  /** @deprecated 로컬 resources.investigationTokens 사용 */
  globalInvestTokens: number
  /** @deprecated 로컬 resources.skillPoints 사용 */
  globalSkillPoints: number
  freeCap: number
  lastInvestRechargeAt: number
  adWatchCountInvest: number
  adWatchCountSkill: number
  adResetDate: string

  tickInvestRecharge: () => void
  watchAdForInvest: () => boolean
  watchAdForSkill: () => boolean
  grantSkillReward: (amount: number, reason: string) => void
  purchaseInvest: (amount: number) => void
  purchaseSkill: (amount: number) => void
  consumeForGame: (investAmount: number, skillAmount: number) => { invest: number; skill: number }
  checkAdReset: () => void
  getNextRechargeCountdown: () => number
  isRecharging: () => boolean
}

export const createShopSlice: StateCreator<ShopSlice, [], [], ShopSlice> = (_set, _get) => ({
  globalInvestTokens: 0,
  globalSkillPoints: 0,
  freeCap: 0,
  lastInvestRechargeAt: Date.now(),
  adWatchCountInvest: 0,
  adWatchCountSkill: 0,
  adResetDate: new Date().toISOString().slice(0, 10),

  // 모든 액션은 no-op — 로컬 resourceSlice가 단일 진실 원천
  tickInvestRecharge: () => {},
  watchAdForInvest: () => false,
  watchAdForSkill: () => false,
  grantSkillReward: () => {},
  purchaseInvest: () => {},
  purchaseSkill: () => {},
  consumeForGame: () => ({ invest: 0, skill: 0 }),
  checkAdReset: () => {},
  getNextRechargeCountdown: () => 0,
  isRecharging: () => false,
})
