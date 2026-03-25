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
    const { resources } = get()
    if (resources[resource] < amount) return false
    set({ resources: { ...resources, [resource]: resources[resource] - amount } })
    return true
  },

  gain: (resource, amount) => {
    const { resources } = get()
    set({ resources: { ...resources, [resource]: resources[resource] + amount } })
  },

  canAfford: (resource, amount) => {
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
