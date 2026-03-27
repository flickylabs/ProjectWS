/**
 * 상점 & 자원 충전 시스템.
 * - 돋보기(조사 토큰): 1시간마다 1개 자동 충전, 최대 10개. 광고로도 충전 가능.
 * - 번개(스킬 포인트): 이벤트 보상 전용, 최대 10개. 광고로 2회/일 충전 가능.
 */
import type { StateCreator } from 'zustand'

export interface ShopSlice {
  /** 글로벌 돋보기 보유량 (게임 외부, 영구) */
  globalInvestTokens: number
  /** 글로벌 번개 보유량 */
  globalSkillPoints: number
  /** 돋보기 최대 */
  maxInvestTokens: number
  /** 번개 최대 */
  maxSkillPoints: number
  /** 마지막 돋보기 충전 시각 (ms) */
  lastInvestRechargeAt: number
  /** 오늘 광고 시청 횟수 (돋보기) */
  adWatchCountInvest: number
  /** 오늘 광고 시청 횟수 (번개) */
  adWatchCountSkill: number
  /** 광고 횟수 리셋 날짜 (YYYY-MM-DD) */
  adResetDate: string

  /** 돋보기 자동 충전 체크 (1시간마다) */
  tickInvestRecharge: () => void
  /** 광고 보고 돋보기 충전 */
  watchAdForInvest: () => boolean
  /** 광고 보고 번개 충전 */
  watchAdForSkill: () => boolean
  /** 이벤트 보상으로 번개 획득 */
  grantSkillReward: (amount: number, reason: string) => void
  /** 게임 시작 시 글로벌 자원에서 인게임 자원으로 차감 */
  consumeForGame: (investAmount: number, skillAmount: number) => { invest: number; skill: number }
  /** 오늘 날짜 기준 광고 횟수 리셋 */
  checkAdReset: () => void
  /** 다음 충전까지 남은 시간 (초) */
  getNextRechargeCountdown: () => number
}

const RECHARGE_INTERVAL_MS = 60 * 60 * 1000 // 1시간
const MAX_AD_INVEST = 5 // 하루 광고 최대 5회 (돋보기)
const MAX_AD_SKILL = 2  // 하루 광고 최대 2회 (번개)

function getTodayString(): string {
  return new Date().toISOString().slice(0, 10)
}

export const createShopSlice: StateCreator<ShopSlice, [], [], ShopSlice> = (set, get) => ({
  globalInvestTokens: 6,
  globalSkillPoints: 5,
  maxInvestTokens: 10,
  maxSkillPoints: 10,
  lastInvestRechargeAt: Date.now(),
  adWatchCountInvest: 0,
  adWatchCountSkill: 0,
  adResetDate: getTodayString(),

  tickInvestRecharge: () => {
    const { lastInvestRechargeAt, globalInvestTokens, maxInvestTokens } = get()
    const now = Date.now()
    const elapsed = now - lastInvestRechargeAt
    const charges = Math.floor(elapsed / RECHARGE_INTERVAL_MS)
    if (charges > 0 && globalInvestTokens < maxInvestTokens) {
      const newTokens = Math.min(globalInvestTokens + charges, maxInvestTokens)
      set({
        globalInvestTokens: newTokens,
        lastInvestRechargeAt: lastInvestRechargeAt + charges * RECHARGE_INTERVAL_MS,
      })
    }
  },

  watchAdForInvest: () => {
    const { adWatchCountInvest, globalInvestTokens, maxInvestTokens } = get()
    get().checkAdReset()
    if (adWatchCountInvest >= MAX_AD_INVEST) return false
    if (globalInvestTokens >= maxInvestTokens) return false
    set({
      globalInvestTokens: Math.min(globalInvestTokens + 1, maxInvestTokens),
      adWatchCountInvest: adWatchCountInvest + 1,
    })
    return true
  },

  watchAdForSkill: () => {
    const { adWatchCountSkill, globalSkillPoints, maxSkillPoints } = get()
    get().checkAdReset()
    if (adWatchCountSkill >= MAX_AD_SKILL) return false
    if (globalSkillPoints >= maxSkillPoints) return false
    set({
      globalSkillPoints: Math.min(globalSkillPoints + 1, maxSkillPoints),
      adWatchCountSkill: adWatchCountSkill + 1,
    })
    return true
  },

  grantSkillReward: (amount, _reason) => {
    const { globalSkillPoints, maxSkillPoints } = get()
    set({ globalSkillPoints: Math.min(globalSkillPoints + amount, maxSkillPoints) })
  },

  consumeForGame: (investAmount, skillAmount) => {
    const { globalInvestTokens, globalSkillPoints } = get()
    const actualInvest = Math.min(investAmount, globalInvestTokens)
    const actualSkill = Math.min(skillAmount, globalSkillPoints)
    set({
      globalInvestTokens: globalInvestTokens - actualInvest,
      globalSkillPoints: globalSkillPoints - actualSkill,
    })
    return { invest: actualInvest, skill: actualSkill }
  },

  checkAdReset: () => {
    const today = getTodayString()
    if (get().adResetDate !== today) {
      set({ adWatchCountInvest: 0, adWatchCountSkill: 0, adResetDate: today })
    }
  },

  getNextRechargeCountdown: () => {
    const { lastInvestRechargeAt } = get()
    const nextAt = lastInvestRechargeAt + RECHARGE_INTERVAL_MS
    const remaining = Math.max(0, nextAt - Date.now())
    return Math.ceil(remaining / 1000)
  },
})
