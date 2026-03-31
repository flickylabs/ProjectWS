/**
 * 상점 & 자원 충전 시스템.
 * - 돋보기(조사 토큰): 1시간마다 1개 자동 충전. 자동 충전 한계 10. 유료 구입은 한계 초과 가능.
 * - 번개(스킬 포인트): 이벤트/광고 보상 전용. 자동 충전 한계 10. 유료 구입은 한계 초과 가능.
 * - 보유량이 10 이상이면 자동 충전 정지. 하나라도 비면(< 10) 재가동.
 */
import type { StateCreator } from 'zustand'

/** 자동 충전 상한 (무료) */
const FREE_CAP_INVEST = 10  // 돋보기 최대
const FREE_CAP_SKILL = 5    // 번개 최대
/** 유료 구입 시 절대 상한 */
const PAID_CAP = 99

export interface ShopSlice {
  /** 글로벌 돋보기 보유량 — FREE_CAP 초과 가능 (유료) */
  globalInvestTokens: number
  /** 글로벌 번개 보유량 — FREE_CAP 초과 가능 (유료) */
  globalSkillPoints: number
  /** 자동 충전 상한 (무료 한계) */
  freeCap: number
  /** 마지막 돋보기 충전 시각 (ms) */
  lastInvestRechargeAt: number
  /** 오늘 광고 시청 횟수 (돋보기) */
  adWatchCountInvest: number
  /** 오늘 광고 시청 횟수 (번개) */
  adWatchCountSkill: number
  /** 광고 횟수 리셋 날짜 (YYYY-MM-DD) */
  adResetDate: string

  /** 돋보기 자동 충전 체크 — 10 미만일 때만 동작 */
  tickInvestRecharge: () => void
  /** 광고 보고 돋보기 충전 — 10까지만 */
  watchAdForInvest: () => boolean
  /** 광고 보고 번개 충전 — 10까지만 */
  watchAdForSkill: () => boolean
  /** 이벤트 보상으로 번개 획득 — 10까지만 */
  grantSkillReward: (amount: number, reason: string) => void
  /** 유료 구입: 10 초과 가능 (PAID_CAP까지) */
  purchaseInvest: (amount: number) => void
  purchaseSkill: (amount: number) => void
  /** 게임 시작 시 차감 */
  consumeForGame: (investAmount: number, skillAmount: number) => { invest: number; skill: number }
  /** 광고 횟수 리셋 */
  checkAdReset: () => void
  /** 다음 충전까지 남은 초 — 10 이상이면 0 */
  getNextRechargeCountdown: () => number
  /** 자동 충전이 활성인지 (10 미만) */
  isRecharging: () => boolean
}

const RECHARGE_INTERVAL_MS = 60 * 60 * 1000 // 1시간
const MAX_AD_INVEST = 5  // 하루 5번
const MAX_AD_SKILL = 2   // 하루 2번

function getTodayString(): string {
  return new Date().toISOString().slice(0, 10)
}

export const createShopSlice: StateCreator<ShopSlice, [], [], ShopSlice> = (set, get) => ({
  globalInvestTokens: 6,
  globalSkillPoints: 5,
  freeCap: FREE_CAP_INVEST,
  lastInvestRechargeAt: Date.now(),
  adWatchCountInvest: 0,
  adWatchCountSkill: 0,
  adResetDate: getTodayString(),

  tickInvestRecharge: () => {
    const { lastInvestRechargeAt, globalInvestTokens } = get()
    // 10 이상이면 충전 안 함
    if (globalInvestTokens >= FREE_CAP_INVEST) return
    const now = Date.now()
    const elapsed = now - lastInvestRechargeAt
    const charges = Math.floor(elapsed / RECHARGE_INTERVAL_MS)
    if (charges > 0) {
      const newTokens = Math.min(globalInvestTokens + charges, FREE_CAP_INVEST)
      set({
        globalInvestTokens: newTokens,
        lastInvestRechargeAt: lastInvestRechargeAt + charges * RECHARGE_INTERVAL_MS,
      })
    }
  },

  watchAdForInvest: () => {
    const { adWatchCountInvest, globalInvestTokens } = get()
    get().checkAdReset()
    if (adWatchCountInvest >= MAX_AD_INVEST) return false
    if (globalInvestTokens >= FREE_CAP_INVEST) return false
    set({
      globalInvestTokens: Math.min(globalInvestTokens + 1, FREE_CAP_INVEST),
      adWatchCountInvest: adWatchCountInvest + 1,
    })
    return true
  },

  watchAdForSkill: () => {
    const { adWatchCountSkill, globalSkillPoints } = get()
    get().checkAdReset()
    if (adWatchCountSkill >= MAX_AD_SKILL) return false
    if (globalSkillPoints >= FREE_CAP_SKILL) return false
    set({
      globalSkillPoints: Math.min(globalSkillPoints + 1, FREE_CAP_SKILL),
      adWatchCountSkill: adWatchCountSkill + 1,
    })
    return true
  },

  grantSkillReward: (amount, _reason) => {
    const { globalSkillPoints } = get()
    // 보상은 FREE_CAP_SKILL까지만
    set({ globalSkillPoints: Math.min(globalSkillPoints + amount, FREE_CAP_SKILL) })
  },

  purchaseInvest: (amount) => {
    const { globalInvestTokens } = get()
    set({ globalInvestTokens: Math.min(globalInvestTokens + amount, PAID_CAP) })
  },

  purchaseSkill: (amount) => {
    const { globalSkillPoints } = get()
    set({ globalSkillPoints: Math.min(globalSkillPoints + amount, PAID_CAP) })
  },

  consumeForGame: (investAmount, skillAmount) => {
    const { globalInvestTokens, globalSkillPoints } = get()
    const actualInvest = Math.min(investAmount, globalInvestTokens)
    const actualSkill = Math.min(skillAmount, globalSkillPoints)
    set({
      globalInvestTokens: globalInvestTokens - actualInvest,
      globalSkillPoints: globalSkillPoints - actualSkill,
    })
    // 소비 후 10 미만이면 충전 타이머 리셋
    if (globalInvestTokens - actualInvest < FREE_CAP_INVEST) {
      set({ lastInvestRechargeAt: Date.now() })
    }
    return { invest: actualInvest, skill: actualSkill }
  },

  checkAdReset: () => {
    const today = getTodayString()
    if (get().adResetDate !== today) {
      set({ adWatchCountInvest: 0, adWatchCountSkill: 0, adResetDate: today })
    }
  },

  getNextRechargeCountdown: () => {
    const { lastInvestRechargeAt, globalInvestTokens } = get()
    if (globalInvestTokens >= FREE_CAP_INVEST) return 0
    const nextAt = lastInvestRechargeAt + RECHARGE_INTERVAL_MS
    const remaining = Math.max(0, nextAt - Date.now())
    return Math.ceil(remaining / 1000)
  },

  isRecharging: () => {
    return get().globalInvestTokens < FREE_CAP_INVEST
  },
})
