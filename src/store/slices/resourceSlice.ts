import type { StateCreator } from 'zustand'
import type { Resources } from '../../types'
import { INITIAL_RESOURCES, SKILL_COSTS, SKILL_LIMITS } from '../../utils/constants'
import { loadProgressionState } from '../../data/leaderboard'
import { applyTitleResourceBonuses } from '../../engine/judgeTitleEngine'

export type ResourceRebalanceTarget = keyof Resources

export interface ResourceRebalanceResult {
  ok: boolean
  message: string
}

const RESOURCE_EVENT_TYPE: Record<keyof Resources, 'investigation' | 'skill' | 'court'> = {
  investigationTokens: 'investigation',
  skillPoints: 'skill',
  courtControl: 'court',
}

const RESOURCE_REBALANCE_RULES: Record<ResourceRebalanceTarget, {
  label: string
  cost: Partial<Resources>
  gain: Partial<Resources>
  success: string
  failure: string
}> = {
  investigationTokens: {
    label: '기록 재정리',
    cost: { courtControl: 1 },
    gain: { investigationTokens: 1 },
    success: '법정 장악 1을 써서 기록을 다시 훑고 조사 토큰 1을 회복했습니다.',
    failure: '법정 장악이 부족해 기록 재정리를 진행할 수 없습니다.',
  },
  skillPoints: {
    label: '쟁점 압축',
    cost: { investigationTokens: 1 },
    gain: { skillPoints: 1 },
    success: '조사 토큰 1을 써서 쟁점을 압축하고 스킬 포인트 1을 회복했습니다.',
    failure: '조사 토큰이 부족해 쟁점 압축을 진행할 수 없습니다.',
  },
  courtControl: {
    label: '정숙 선언',
    cost: { skillPoints: 2 },
    gain: { courtControl: 1 },
    success: '스킬 포인트 2를 써서 절차를 정리하고 법정 장악 1을 회복했습니다.',
    failure: '스킬 포인트가 부족해 정숙 선언을 진행할 수 없습니다.',
  },
}

function createInitialResources(): Resources {
  try {
    const progression = loadProgressionState()
    return applyTitleResourceBonuses(
      INITIAL_RESOURCES,
      progression.titleLevels,
      progression.titleLoadout,
    )
  } catch {
    return { ...INITIAL_RESOURCES }
  }
}

function canPay(resources: Resources, cost: Partial<Resources>): boolean {
  return (Object.keys(cost) as Array<keyof Resources>)
    .every((resource) => resources[resource] >= (cost[resource] ?? 0))
}

function applyDelta(resources: Resources, delta: Partial<Resources>, multiplier: 1 | -1): Resources {
  const next = { ...resources }
  for (const resource of Object.keys(delta) as Array<keyof Resources>) {
    next[resource] += (delta[resource] ?? 0) * multiplier
  }
  return next
}

export interface ResourceSlice {
  resources: Resources
  skillUseCounts: Record<string, number>

  initResources: () => void
  spend: (resource: keyof Resources, amount: number) => boolean
  gain: (resource: keyof Resources, amount: number) => void
  rebalanceResource: (target: ResourceRebalanceTarget) => ResourceRebalanceResult
  canAfford: (resource: keyof Resources, amount: number) => boolean
  canUseSkill: (skillType: string) => boolean
  useSkill: (skillType: string) => boolean
}

export const createResourceSlice: StateCreator<ResourceSlice, [], [], ResourceSlice> = (set, get) => ({
  resources: createInitialResources(),
  skillUseCounts: {},

  initResources: () => {
    set({ resources: createInitialResources(), skillUseCounts: {} })
  },

  spend: (resource, amount) => {
    const tokenType = resource === 'investigationTokens' ? 'investigation'
      : resource === 'skillPoints' ? 'skill'
      : resource === 'courtControl' ? 'court' : null

    const { resources } = get()
    if (resources[resource] < amount) {
      window.dispatchEvent(new CustomEvent('pc:resource-shortage', {
        detail: {
          resource,
          type: RESOURCE_EVENT_TYPE[resource],
          required: amount,
          current: resources[resource],
        },
      }))
      return false
    }
    set({ resources: { ...resources, [resource]: resources[resource] - amount } })
    if (tokenType) window.dispatchEvent(new CustomEvent('pc:token-spend', { detail: { type: tokenType, amount } }))
    return true
  },

  gain: (resource, amount) => {
    const { resources } = get()
    set({ resources: { ...resources, [resource]: resources[resource] + amount } })
    window.dispatchEvent(new CustomEvent('pc:token-gain', { detail: { type: RESOURCE_EVENT_TYPE[resource], amount } }))
  },

  rebalanceResource: (target) => {
    const rule = RESOURCE_REBALANCE_RULES[target]
    const { resources } = get()
    if (!canPay(resources, rule.cost)) {
      return { ok: false, message: rule.failure }
    }

    let next = applyDelta(resources, rule.cost, -1)
    next = applyDelta(next, rule.gain, 1)
    set({ resources: next })

    for (const resource of Object.keys(rule.cost) as Array<keyof Resources>) {
      const amount = rule.cost[resource] ?? 0
      if (amount > 0) {
        window.dispatchEvent(new CustomEvent('pc:token-spend', { detail: { type: RESOURCE_EVENT_TYPE[resource], amount } }))
      }
    }
    for (const resource of Object.keys(rule.gain) as Array<keyof Resources>) {
      const amount = rule.gain[resource] ?? 0
      if (amount > 0) {
        window.dispatchEvent(new CustomEvent('pc:token-gain', { detail: { type: RESOURCE_EVENT_TYPE[resource], amount } }))
      }
    }
    window.dispatchEvent(new CustomEvent('pc:resource-rebalance', { detail: { target, label: rule.label } }))
    return { ok: true, message: rule.success }
  },

  canAfford: (resource, amount) => {
    return get().resources[resource] >= amount
  },

  canUseSkill: (skillType) => {
    const { skillUseCounts } = get()
    const cost = SKILL_COSTS[skillType]
    if (!cost) return false
    if (!get().canAfford(cost.resource, cost.amount)) return false
    const limit = SKILL_LIMITS[skillType]
    if (limit !== undefined && (skillUseCounts[skillType] ?? 0) >= limit) return false
    return true
  },

  useSkill: (skillType) => {
    const state = get()
    if (!state.canUseSkill(skillType)) return false
    const cost = SKILL_COSTS[skillType]
    state.spend(cost.resource, cost.amount)
    set({
      skillUseCounts: {
        ...state.skillUseCounts,
        [skillType]: (state.skillUseCounts[skillType] ?? 0) + 1,
      },
    })
    return true
  },
})
