import type { StateCreator } from 'zustand'
import type { Resources } from '../../types'
import { INITIAL_RESOURCES, SKILL_COSTS, SKILL_LIMITS } from '../../utils/constants'

export interface ResourceSlice {
  resources: Resources
  skillUseCounts: Record<string, number>

  initResources: () => void
  spend: (resource: keyof Resources, amount: number) => boolean
  gain: (resource: keyof Resources, amount: number) => void
  canAfford: (resource: keyof Resources, amount: number) => boolean
  canUseSkill: (skillType: string) => boolean
  useSkill: (skillType: string) => boolean
}

export const createResourceSlice: StateCreator<ResourceSlice, [], [], ResourceSlice> = (set, get) => ({
  resources: { ...INITIAL_RESOURCES },
  skillUseCounts: {},

  initResources: () => {
    set({ resources: { ...INITIAL_RESOURCES }, skillUseCounts: {} })
  },

  spend: (resource, amount) => {
    // investigationTokens → 글로벌 돋보기에서 차감
    if (resource === 'investigationTokens') {
      const globalTokens = (get() as any).globalInvestTokens ?? 0
      if (globalTokens < amount) return false
      set({ globalInvestTokens: globalTokens - amount } as any)
      return true
    }
    // skillPoints → 글로벌 번개에서 차감
    if (resource === 'skillPoints') {
      const globalSkill = (get() as any).globalSkillPoints ?? 0
      if (globalSkill < amount) return false
      set({ globalSkillPoints: globalSkill - amount } as any)
      return true
    }
    const { resources } = get()
    if (resources[resource] < amount) return false
    set({ resources: { ...resources, [resource]: resources[resource] - amount } })
    return true
  },

  gain: (resource, amount) => {
    if (resource === 'investigationTokens') {
      const globalTokens = (get() as any).globalInvestTokens ?? 0
      set({ globalInvestTokens: globalTokens + amount } as any)
      return
    }
    if (resource === 'skillPoints') {
      const globalSkill = (get() as any).globalSkillPoints ?? 0
      set({ globalSkillPoints: globalSkill + amount } as any)
      return
    }
    const { resources } = get()
    set({ resources: { ...resources, [resource]: resources[resource] + amount } })
  },

  canAfford: (resource, amount) => {
    if (resource === 'investigationTokens') {
      return ((get() as any).globalInvestTokens ?? 0) >= amount
    }
    if (resource === 'skillPoints') {
      return ((get() as any).globalSkillPoints ?? 0) >= amount
    }
    return get().resources[resource] >= amount
  },

  canUseSkill: (skillType) => {
    const { resources, skillUseCounts } = get()
    const cost = SKILL_COSTS[skillType]
    if (!cost) return false
    if (resources[cost.resource] < cost.amount) return false
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
