import type { StateCreator } from 'zustand'
import type {
  CaseData,
  CombinationLabConfig,
  CombinationLabNode,
  CombinationLabOutput,
  CombinationLabRecipe,
  Dispute,
  EvidenceNode,
} from '../../types'

export interface CombinationLabHistoryEntry {
  recipeId: string
  outputId: string
  summary: string
  turn: number
}

export interface CombinationLabRuntimeState {
  config: CombinationLabConfig | null
  analysisPoints: number
  discoveredNodeIds: string[]
  appliedRecipeIds: string[]
  unlockedNotes: Record<string, string>
  unlockedQuestions: Record<string, { text: string; tier?: 'advanced' | 'pressure' | 'closing' }>
  unlockedStatements: Record<string, { text: string; targetParty?: 'a' | 'b' | 'both' }>
  unlockedWitnessAngles: Record<string, string>
  unlockedMediationHints: Record<string, string>
  evidenceTransforms: Record<string, string>
  disputeTransforms: Record<string, string>
  history: CombinationLabHistoryEntry[]
}

const EMPTY_RUNTIME: CombinationLabRuntimeState = {
  config: null,
  analysisPoints: 0,
  discoveredNodeIds: [],
  appliedRecipeIds: [],
  unlockedNotes: {},
  unlockedQuestions: {},
  unlockedStatements: {},
  unlockedWitnessAngles: {},
  unlockedMediationHints: {},
  evidenceTransforms: {},
  disputeTransforms: {},
  history: [],
}

function dedupePush(list: string[], value: string): string[] {
  return list.includes(value) ? list : [...list, value]
}

function upsertEvidenceInCase(caseData: CaseData, node: EvidenceNode): CaseData {
  const exists = caseData.evidence.some((item) => item.id === node.id)
  return exists
    ? {
        ...caseData,
        evidence: caseData.evidence.map((item) => (item.id === node.id ? { ...item, ...node } : item)),
      }
    : {
        ...caseData,
        evidence: [...caseData.evidence, node],
      }
}

function upsertDisputesInCase(caseData: CaseData, disputes: Dispute[]): CaseData {
  const byId = new Map(caseData.disputes.map((item) => [item.id, item]))
  for (const dispute of disputes) {
    byId.set(dispute.id, { ...(byId.get(dispute.id) ?? {}), ...dispute } as Dispute)
  }
  return { ...caseData, disputes: Array.from(byId.values()) }
}

export interface CombinationLabSlice {
  combinationLabRuntime: CombinationLabRuntimeState
  initCombinationLab: (caseData: CaseData) => void
  resetCombinationLab: () => void
  getCombinationNode: (nodeId: string) => CombinationLabNode | undefined
  getCombinationOutput: (outputId: string) => CombinationLabOutput | undefined
  canRunCombinationRecipe: (recipeId: string) => boolean
  getAvailableCombinationRecipes: () => CombinationLabRecipe[]
  runCombinationRecipe: (recipeId: string) => { ok: boolean; reason?: string; outputId?: string }
}

export const createCombinationLabSlice: StateCreator<any, [], [], CombinationLabSlice> = (set, get) => ({
  combinationLabRuntime: { ...EMPTY_RUNTIME },

  initCombinationLab: (caseData) => {
    const config = caseData.combinationLab ?? null
    const discoveredNodeIds = (config?.nodes ?? [])
      .filter((node) => node.visibility === 'base')
      .map((node) => node.id)

    set({
      combinationLabRuntime: {
        ...EMPTY_RUNTIME,
        config,
        analysisPoints: config?.analysisPointsBase ?? 0,
        discoveredNodeIds,
      },
    })
  },

  resetCombinationLab: () => {
    set({ combinationLabRuntime: { ...EMPTY_RUNTIME } })
  },

  getCombinationNode: (nodeId) => {
    const config = get().combinationLabRuntime.config
    return config?.nodes.find((node: CombinationLabNode) => node.id === nodeId)
  },

  getCombinationOutput: (outputId) => {
    const config = get().combinationLabRuntime.config
    return config?.outputs.find((output: CombinationLabOutput) => output.id === outputId)
  },

  canRunCombinationRecipe: (recipeId) => {
    const state = get().combinationLabRuntime
    const config = state.config
    if (!config) return false
    const recipe = config.recipes.find((item: CombinationLabRecipe) => item.id === recipeId)
    if (!recipe) return false
    if (!recipe.repeatable && state.appliedRecipeIds.includes(recipe.id)) return false
    if (state.analysisPoints < recipe.cost) return false

    const root = get() as any
    return recipe.inputs.every((inputId: string) => {
      const node = config.nodes.find((item: CombinationLabNode) => item.id === inputId)
      if (!node) return false
      if (node.type === 'evidence' || node.type === 'derived_evidence') {
        return !!root.evidenceStates?.[inputId]?.unlocked
      }
      return state.discoveredNodeIds.includes(inputId)
    })
  },

  getAvailableCombinationRecipes: () => {
    const config = get().combinationLabRuntime.config
    if (!config) return []
    return config.recipes.filter((recipe: CombinationLabRecipe) => get().canRunCombinationRecipe(recipe.id))
  },

  runCombinationRecipe: (recipeId) => {
    const root = get() as any
    const runtime = root.combinationLabRuntime as CombinationLabRuntimeState
    const config = runtime.config
    if (!config) return { ok: false, reason: 'no_config' }

    const recipe = config.recipes.find((item: CombinationLabRecipe) => item.id === recipeId)
    if (!recipe) return { ok: false, reason: 'recipe_not_found' }
    if (!root.canRunCombinationRecipe(recipeId)) return { ok: false, reason: 'recipe_locked' }

    const output = config.outputs.find((item: CombinationLabOutput) => item.id === recipe.outputId)
    if (!output) return { ok: false, reason: 'output_not_found' }
    const hiddenRefund = recipe.hidden ? (config.analysisPointRefundOnFirstHidden ?? 0) : 0

    let caseData = root.caseData as CaseData | null
    if (!caseData) return { ok: false, reason: 'no_case' }

    const nextDiscoveredNodeIds = [...runtime.discoveredNodeIds]
    const nextNotes = { ...runtime.unlockedNotes }
    const nextQuestions = { ...runtime.unlockedQuestions }
    const nextStatements = { ...runtime.unlockedStatements }
    const nextWitnessAngles = { ...runtime.unlockedWitnessAngles }
    const nextMediationHints = { ...runtime.unlockedMediationHints }
    const nextEvidenceTransforms = { ...runtime.evidenceTransforms }
    const nextDisputeTransforms = { ...runtime.disputeTransforms }

    const addNode = (nodeId?: string) => {
      if (!nodeId) return
      const next = dedupePush(nextDiscoveredNodeIds, nodeId)
      nextDiscoveredNodeIds.length = 0
      nextDiscoveredNodeIds.push(...next)
    }

    const appendDerivedEvidence = (node: EvidenceNode | undefined) => {
      if (!node) return
      root.addDerivedEvidence(node, true)
      caseData = upsertEvidenceInCase(caseData!, node)
      addNode(node.id)
    }

    const upsertDerivedDisputes = (disputes: Dispute[] | undefined, visibility: 'visible' | 'emerged' = 'emerged') => {
      if (!disputes || disputes.length === 0) return
      caseData = upsertDisputesInCase(caseData!, disputes)
      for (const dispute of disputes) {
        addNode(dispute.id)
        root.upsertDisputeVisibility({
          disputeId: dispute.id,
          visibility,
          relevantParties: ['a', 'b'],
          emergenceRoutes: [],
          emergedAtTurn: root.turnCount ?? 0,
          emergedVia: 'truth_confrontation',
          isNew: true,
        })
      }
    }

    if (output.noteText) {
      const primaryNoteNodeId =
        output.effects.find((effect) => effect.kind === 'unlock_note')?.unlockNodeId
        ?? output.id
      nextNotes[primaryNoteNodeId] = output.noteText
    }
    for (const prompt of output.questionPrompts ?? []) {
      nextQuestions[prompt.id] = { text: prompt.text, tier: prompt.tier }
    }
    for (const entry of output.statementEntries ?? []) {
      nextStatements[entry.id] = { text: entry.text, targetParty: entry.targetParty }
    }
    for (const entry of output.witnessAngles ?? []) {
      nextWitnessAngles[entry.id] = entry.text
    }
    for (const entry of output.mediationHints ?? []) {
      nextMediationHints[entry.id] = entry.text
    }

    for (const effect of output.effects) {
      switch (effect.kind) {
        case 'unlock_note':
        case 'unlock_question':
        case 'unlock_statement':
        case 'unlock_witness_angle':
        case 'unlock_mediation_hint':
          addNode(effect.unlockNodeId ?? output.id)
          break
        case 'unlock_evidence':
          appendDerivedEvidence(output.evidenceNode)
          addNode(effect.unlockNodeId ?? output.id)
          break
        case 'unlock_dispute':
          upsertDerivedDisputes(output.disputeNodes, 'emerged')
          addNode(effect.unlockNodeId ?? output.id)
          break
        case 'upgrade_evidence':
        case 'elevate_reliability':
        case 'reframe_evidence': {
          const evidenceId = effect.evidenceUpgrade?.evidenceId ?? effect.targetId ?? effect.upgradeToId ?? output.evidenceNode?.id
          if (evidenceId) {
            const patch: Partial<EvidenceNode> = {}
            if (effect.evidenceUpgrade?.toReliability) patch.reliability = effect.evidenceUpgrade.toReliability
            if (effect.evidenceUpgrade?.toCompleteness) patch.completeness = effect.evidenceUpgrade.toCompleteness
            if (Object.keys(patch).length > 0) {
              root.patchEvidenceDefinition(evidenceId, patch)
              caseData = {
                ...caseData!,
                evidence: caseData!.evidence.map((item) => (item.id === evidenceId ? { ...item, ...patch } : item)),
              }
            }
            nextEvidenceTransforms[evidenceId] = output.summary
          }
          break
        }
        case 'upgrade_dispute':
        case 'reframe_dispute': {
          const disputeId = effect.disputeUpgrade?.disputeId ?? effect.targetId ?? effect.upgradeToId ?? effect.reframeToId
          if (disputeId) {
            const patch: Partial<Dispute> = {
              ...(effect.disputeUpgrade?.weight ? { weight: effect.disputeUpgrade.weight } : {}),
              ...(effect.disputeUpgrade?.ambiguity ? { ambiguity: effect.disputeUpgrade.ambiguity } : {}),
              ...(typeof effect.disputeUpgrade?.legitimacyIssue === 'boolean' ? { legitimacyIssue: effect.disputeUpgrade.legitimacyIssue } : {}),
            }
            if (Object.keys(patch).length > 0) {
              caseData = {
                ...caseData!,
                disputes: caseData!.disputes.map((item) => (item.id === disputeId ? { ...item, ...patch } : item)),
              }
            }
            nextDisputeTransforms[disputeId] = output.summary
          }
          break
        }
        case 'split_dispute':
        case 'merge_disputes':
          upsertDerivedDisputes(output.disputeNodes, 'emerged')
          if (effect.splitFromId) nextDisputeTransforms[effect.splitFromId] = output.summary
          for (const mergeFromId of effect.mergeFromIds ?? []) {
            nextDisputeTransforms[mergeFromId] = output.summary
          }
          if (effect.mergeToId) nextDisputeTransforms[effect.mergeToId] = output.summary
          break
        case 'upgrade_question':
        case 'reframe_question':
          for (const prompt of output.questionPrompts ?? []) {
            nextQuestions[prompt.id] = { text: prompt.text, tier: prompt.tier }
          }
          break
        default:
          break
      }
    }

    ;(set as (partial: any) => void)({
      caseData,
      combinationLabRuntime: {
        ...runtime,
        analysisPoints: runtime.analysisPoints - recipe.cost + hiddenRefund,
        appliedRecipeIds: dedupePush(runtime.appliedRecipeIds, recipe.id),
        discoveredNodeIds: nextDiscoveredNodeIds,
        unlockedNotes: nextNotes,
        unlockedQuestions: nextQuestions,
        unlockedStatements: nextStatements,
        unlockedWitnessAngles: nextWitnessAngles,
        unlockedMediationHints: nextMediationHints,
        evidenceTransforms: nextEvidenceTransforms,
        disputeTransforms: nextDisputeTransforms,
        history: [
          ...runtime.history,
          {
            recipeId: recipe.id,
            outputId: output.id,
            summary: output.summary,
            turn: root.turnCount ?? 0,
          },
        ],
      },
    })

    return { ok: true, outputId: output.id }
  },
})
