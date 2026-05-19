import type { StateCreator } from 'zustand'
import type { EvidenceNode, EvidenceCombination } from '../../types'
import {
  createInitialEvidenceStates,
  checkUnlocks,
  checkCombinations,
  isEvidenceFullyInvestigated,
  presentEvidence as presentEv,
  investigateEvidence as investigateEv,
  type EvidenceRuntimeState,
  type SurfaceResult as _SurfaceResult,
} from '../../engine/evidenceEngine'
import type { UnsafeAny } from '../../types/lint'


export interface EvidenceSlice {
  evidenceStates: Record<string, EvidenceRuntimeState>
  evidenceDefinitions: EvidenceNode[]
  evidenceCombinations: EvidenceCombination[]
  triggeredCombinations: string[]

  initEvidence: (evidence: EvidenceNode[], combinations: EvidenceCombination[], baseEvidenceIds?: string[]) => void
  presentEvidence: (evidenceId: string, target: 'a' | 'b') => string[]
  investigateEvidence: (evidenceId: string, subAction: string) => string | null
  /** [TC-F C2 픽스] 마지막 investigateEvidence 호출에서 자동 해금된 증거 ID. handleEvidenceInvestigate가 시스템 메시지 출력에 사용 후 clear */
  lastInvestigateUnlocks: string[]
  consumeLastInvestigateUnlocks: () => string[]
  markEvidenceConfidential: (evidenceId: string) => void
  recommendedEvidenceIds: string[]
  setRecommendedEvidence: (ids: string[]) => void
  clearRecommendedEvidence: () => void
  surfacedEvidenceIds: string[]
  dimmedEvidenceIds: string[]
  evidenceReinforcements: Record<string, string[]>
  setSurfacedEvidence: (result: { surfacedIds: string[]; dimmedIds: string[]; reinforcements: Record<string, string[]> }) => void
  isUnlocked: (evidenceId: string) => boolean
  isPresented: (evidenceId: string) => boolean
  getUnlockedEvidence: () => EvidenceNode[]
  /** 조합 레시피에 포함되어 있고, 해금됐고, 아직 미완료인 증거 ID 집합 */
  getCombinableEvidenceIds: () => Set<string>
  /** 노드별 조합 힌트 — 미완료 레시피 기준 파트너 수/카테고리 */
  getCombinationPartnerHints: () => Map<string, CombinationPartnerHint>
  /** lieState 변화 뒤 잠금 증거 해금 조건을 다시 계산 */
  refreshEvidenceUnlocks: () => string[]
  addDerivedEvidence: (node: EvidenceNode, unlock?: boolean) => void
  patchEvidenceDefinition: (evidenceId: string, patch: Partial<EvidenceNode>) => void
}

export interface CombinationPartnerHint {
  /** 이 노드가 포함된 미완료 레시피 수 */
  recipeCount: number
  /** 즉시 조합 가능한 레시피 수 (다른 입력 전부 준비됨) */
  readyCount: number
  /** 카테고리별 파트너 수 (중복 제외) */
  partnersByCategory: {
    evidence: number
    statement: number
    other: number
  }
}

function collectMaxLieStates(getRoot: () => unknown): Record<string, string> {
  const root = getRoot() as UnsafeAny
  const LIE_RANK: Record<string, number> = { S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5 }
  const lieStates: Record<string, string> = {}

  for (const agent of [root.agentA, root.agentB]) {
    if (!agent?.lieStateMap) continue
    for (const [dId, entry] of Object.entries(agent.lieStateMap)) {
      const st = (entry as UnsafeAny).currentState ?? 'S0'
      lieStates[dId] = (LIE_RANK[st] ?? 0) >= (LIE_RANK[lieStates[dId] ?? 'S0'] ?? 0)
        ? st
        : lieStates[dId]
    }
  }

  return lieStates
}

export const createEvidenceSlice: StateCreator<EvidenceSlice, [], [], EvidenceSlice> = (set, get) => ({
  evidenceStates: {},
  evidenceDefinitions: [],
  evidenceCombinations: [],
  triggeredCombinations: [],
  recommendedEvidenceIds: [],
  surfacedEvidenceIds: [],
  dimmedEvidenceIds: [],
  evidenceReinforcements: {},

  initEvidence: (evidence, combinations, baseEvidenceIds) => {
    set({
      evidenceDefinitions: evidence,
      evidenceCombinations: combinations,
      evidenceStates: createInitialEvidenceStates(evidence, baseEvidenceIds),
      triggeredCombinations: [],
      recommendedEvidenceIds: [],
      surfacedEvidenceIds: [],
      dimmedEvidenceIds: [],
      evidenceReinforcements: {},
    })
  },

  presentEvidence: (evidenceId, target) => {
    const { evidenceStates, evidenceDefinitions, evidenceCombinations } = get()

    // 증거 제시 (immutable)
    const afterPresent = presentEv(evidenceStates, evidenceId, target)

    // 잠금 해제 체크 (immutable) — lieState 조건 포함
    const lieStates = collectMaxLieStates(get)
    const { updated, newlyUnlocked } = checkUnlocks(afterPresent, evidenceDefinitions, lieStates)

    // 조합 체크 (이미 발동된 조합은 제외) — investigationStages 미완료 시 조합 차단
    const combos = checkCombinations(updated, evidenceCombinations, evidenceDefinitions)
    const existing = new Set(get().triggeredCombinations)
    const newComboIds = combos.map((c) => c.requires.join('+')).filter(id => !existing.has(id))

    set({
      evidenceStates: updated,
      triggeredCombinations: [...existing, ...newComboIds],
    })

    return newlyUnlocked
  },

  investigateEvidence: (evidenceId, subAction) => {
    const { evidenceStates, evidenceDefinitions } = get()
    const afterInvestigate = investigateEv(evidenceStates, evidenceId, subAction)

    // checkUnlocks 호출: 조사 후 잠금 해제 조건 확인
    const lieStates = collectMaxLieStates(get)
    const { updated, newlyUnlocked } = checkUnlocks(afterInvestigate, evidenceDefinitions, lieStates)

    // [TC-F C2 픽스] 자동 해금된 증거 ID를 transient state에 보관 (handleEvidenceInvestigate가 소비)
    set({ evidenceStates: updated, lastInvestigateUnlocks: newlyUnlocked ?? [] })

    const def = evidenceDefinitions.find((e) => e.id === evidenceId)
    return def?.investigationResults[subAction] ?? null
  },

  lastInvestigateUnlocks: [],
  consumeLastInvestigateUnlocks: () => {
    const ids = get().lastInvestigateUnlocks
    if (ids.length > 0) set({ lastInvestigateUnlocks: [] })
    return ids
  },

  refreshEvidenceUnlocks: () => {
    const { evidenceStates, evidenceDefinitions } = get()
    const lieStates = collectMaxLieStates(get)
    const { updated, newlyUnlocked } = checkUnlocks(evidenceStates, evidenceDefinitions, lieStates)
    if (newlyUnlocked.length > 0) {
      set({ evidenceStates: updated })
    }
    return newlyUnlocked
  },

  setRecommendedEvidence: (ids) => {
    set({ recommendedEvidenceIds: ids })
  },

  clearRecommendedEvidence: () => {
    set({ recommendedEvidenceIds: [] })
  },

  setSurfacedEvidence: (result) => {
    set({
      surfacedEvidenceIds: result.surfacedIds,
      dimmedEvidenceIds: result.dimmedIds,
      evidenceReinforcements: result.reinforcements,
    })
  },

  markEvidenceConfidential: (evidenceId) => {
    const { evidenceStates } = get()
    const state = evidenceStates[evidenceId]
    if (!state) return
    set({
      evidenceStates: {
        ...evidenceStates,
        [evidenceId]: { ...state, confidentialSource: true },
      },
    })
  },

  isUnlocked: (evidenceId) => {
    return get().evidenceStates[evidenceId]?.unlocked ?? false
  },

  isPresented: (evidenceId) => {
    return get().evidenceStates[evidenceId]?.presented ?? false
  },

  getUnlockedEvidence: () => {
    const { evidenceStates, evidenceDefinitions } = get()
    return evidenceDefinitions.filter((e) => evidenceStates[e.id]?.unlocked)
  },

  getCombinableEvidenceIds: () => {
    const { evidenceStates, evidenceCombinations, triggeredCombinations, evidenceDefinitions } = get()
    const triggered = new Set(triggeredCombinations)
    const ids = new Set<string>()
    const defById = new Map(evidenceDefinitions.map((d) => [d.id, d]))
    // 1) evidenceCombinations (구 시스템) — ALL requires 해금 + investigationStages 완료 시에만 shimmer
    for (const combo of evidenceCombinations) {
      const comboKey = combo.requires.join('+')
      if (triggered.has(comboKey)) continue
      const allReady = combo.requires.every((eid) => {
        const st = evidenceStates[eid]
        if (!st?.unlocked) return false
        return isEvidenceFullyInvestigated(st, defById.get(eid))
      })
      if (!allReady) continue
      for (const eid of combo.requires) {
        ids.add(eid)
      }
    }
    // 2) combinationLab.recipes (신 시스템) — ALL inputs 준비 + 증거는 investigationStages 완료 시에만 shimmer
    const labRuntime = (get() as UnsafeAny).combinationLabRuntime as { config: UnsafeAny; appliedRecipeIds: string[]; discoveredNodeIds: string[] } | undefined
    if (labRuntime?.config?.recipes) {
      const applied = new Set(labRuntime.appliedRecipeIds ?? [])
      const discovered = new Set(labRuntime.discoveredNodeIds ?? [])
      const nodes = labRuntime.config.nodes ?? []
      for (const recipe of labRuntime.config.recipes) {
        if (applied.has(recipe.id) && !recipe.repeatable) continue
        const allReady = recipe.inputs.every((inputId: string) => {
          const node = nodes.find((n: UnsafeAny) => n.id === inputId)
          if (node?.type === 'evidence' || node?.type === 'derived_evidence') {
            const st = evidenceStates[inputId]
            if (!st?.unlocked) return false
            return isEvidenceFullyInvestigated(st, defById.get(inputId))
          }
          return discovered.has(inputId)
        })
        if (!allReady) continue
        for (const inputId of recipe.inputs) {
          ids.add(inputId)
        }
      }
    }
    return ids
  },

  getCombinationPartnerHints: () => {
    const { evidenceStates, evidenceDefinitions } = get()
    const hints = new Map<string, CombinationPartnerHint>()
    const labRuntime = (get() as UnsafeAny).combinationLabRuntime as { config: UnsafeAny; appliedRecipeIds: string[]; discoveredNodeIds: string[] } | undefined
    if (!labRuntime?.config?.recipes) return hints

    const applied = new Set(labRuntime.appliedRecipeIds ?? [])
    const discovered = new Set(labRuntime.discoveredNodeIds ?? [])
    const nodes: Array<{ id: string; type: string }> = labRuntime.config.nodes ?? []
    const nodeTypeById = new Map(nodes.map((n) => [n.id, n.type]))
    const defById = new Map(evidenceDefinitions.map((d) => [d.id, d]))
    // 노드별로 만난 파트너 id 집합 (중복 방지)
    const partnersByNode = new Map<string, Set<string>>()

    const isInputReady = (inputId: string): boolean => {
      const type = nodeTypeById.get(inputId)
      if (type === 'evidence' || type === 'derived_evidence') {
        const st = evidenceStates[inputId]
        if (!st?.unlocked) return false
        return isEvidenceFullyInvestigated(st, defById.get(inputId))
      }
      return discovered.has(inputId)
    }

    for (const recipe of labRuntime.config.recipes) {
      if (applied.has(recipe.id) && !recipe.repeatable) continue
      const inputs: string[] = recipe.inputs ?? []
      for (const inputId of inputs) {
        // 이 노드 자체가 이미 준비된 상태일 때만 힌트 제공 (해금 전에는 어차피 UI에 없음)
        if (!isInputReady(inputId)) continue
        const othersReady = inputs.every((other) => other === inputId || isInputReady(other))
        const existing = hints.get(inputId) ?? {
          recipeCount: 0,
          readyCount: 0,
          partnersByCategory: { evidence: 0, statement: 0, other: 0 },
        }
        existing.recipeCount += 1
        if (othersReady) existing.readyCount += 1
        hints.set(inputId, existing)

        // 파트너 카테고리 집계 (이 레시피의 나머지 입력)
        const partnerSet = partnersByNode.get(inputId) ?? new Set<string>()
        for (const other of inputs) {
          if (other === inputId) continue
          if (partnerSet.has(other)) continue
          partnerSet.add(other)
          const otherType = nodeTypeById.get(other)
          if (otherType === 'evidence' || otherType === 'derived_evidence') {
            existing.partnersByCategory.evidence += 1
          } else if (otherType === 'statement') {
            existing.partnersByCategory.statement += 1
          } else {
            existing.partnersByCategory.other += 1
          }
        }
        partnersByNode.set(inputId, partnerSet)
      }
    }
    return hints
  },

  addDerivedEvidence: (node, unlock = true) => {
    const { evidenceDefinitions, evidenceStates } = get()
    if (evidenceDefinitions.some((item) => item.id === node.id)) {
      return
    }

    set({
      evidenceDefinitions: [...evidenceDefinitions, node],
      evidenceStates: {
        ...evidenceStates,
        [node.id]: {
          id: node.id,
          unlocked: unlock,
          presented: false,
          presentedTo: [],
          presentedStagesByParty: { a: [], b: [] },
          investigatedActions: [],
        },
      },
    })
  },

  patchEvidenceDefinition: (evidenceId, patch) => {
    const { evidenceDefinitions } = get()
    const next = evidenceDefinitions.map((item) =>
      item.id === evidenceId ? { ...item, ...patch } : item,
    )
    set({ evidenceDefinitions: next })
  },
})
