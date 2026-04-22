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
import { stripOutputCodename } from '../../utils/combinationLabels'

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
  /** 대화에서 statement 노드의 따옴표 문구가 실제 발화될 때 discoveredNodeIds에 추가 */
  syncStatementsFromDialogue: (text: string) => void
}

export const createCombinationLabSlice: StateCreator<any, [], [], CombinationLabSlice> = (set, get) => ({
  combinationLabRuntime: { ...EMPTY_RUNTIME },

  initCombinationLab: (caseData) => {
    const config = caseData.combinationLab ?? null
    // base visibility 노드를 등록하되, statement는 해당 발언이 실제 대화에서
    // 발화될 때까지 "아직 발견 전"으로 둔다. 그렇지 않으면 NPC가 말하기도 전에
    // 자동 매칭에 노출되어 조기 스포일러를 유발한다.
    const discoveredNodeIds = (config?.nodes ?? [])
      .filter((node) => node.visibility === 'base' && node.type !== 'statement')
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

  syncStatementsFromDialogue: (text: string) => {
    if (!text) return
    const state = get().combinationLabRuntime
    const config = state.config
    if (!config) return
    const already = new Set(state.discoveredNodeIds)
    const newlyDiscovered: string[] = []
    for (const node of config.nodes) {
      if (node.type !== 'statement') continue
      if (already.has(node.id)) continue
      // statement label 안의 따옴표 문구와 매칭
      const match = node.label?.match(/["“”]([^"“”]+)["“”]/)
      if (!match) continue
      if (text.includes(match[1])) newlyDiscovered.push(node.id)
    }
    if (newlyDiscovered.length === 0) return
    set({
      combinationLabRuntime: {
        ...state,
        discoveredNodeIds: [...state.discoveredNodeIds, ...newlyDiscovered],
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
    // 스킬 포인트 1 이상 필요
    if ((root.resources?.skillPoints ?? 0) < 1) return false
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
    const unlockedDossierForFirstTime = output.id.startsWith('dc-') && !runtime.appliedRecipeIds.includes(recipe.id)

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
        case 'unlock_dispute': {
          upsertDerivedDisputes(output.disputeNodes, 'emerged')
          const disputeId = effect.unlockNodeId ?? effect.targetId
          addNode(disputeId ?? output.id)
          // 기존 hidden 쟁점이면 discovery 상태에서 emerge 처리
          if (disputeId && caseData?.disputes.some((d) => d.id === disputeId)) {
            const visibilityEntry = root.discovery?.disputeVisibility?.[disputeId]
            if (visibilityEntry?.visibility === 'hidden') {
              root.emergeDispute?.(disputeId, 'truth_confrontation', root.turnCount ?? 0, stripOutputCodename(output.label ?? disputeId))
            }
          }
          break
        }
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

    // 스킬 포인트 1 소비 (수동 조합 비용)
    const resources = (root as any).resources
    if (resources && resources.skillPoints >= 1) {
      ;(root as any).spend('skillPoints', 1)
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

    if (unlockedDossierForFirstTime) {
      root.trackMetric?.('combinationDossierUnlocked')
    }

    // 증인 해금 — socialGraph의 unlockedByDossier가 이 dc-*를 포함하면 해금
    if (output.id.startsWith('dc-')) {
      const freshRoot = get() as any
      const currentUnlocked = new Set<string>(freshRoot.unlockedWitnessIds ?? [])
      const newlyUnlocked: { id: string; name: string }[] = []
      for (const tp of caseData!.duo.socialGraph ?? []) {
        if (currentUnlocked.has(tp.id)) continue
        const gate = tp.unlockedByDossier ?? []
        if (gate.includes(output.id)) {
          freshRoot.addUnlockedWitness?.(tp.id)
          newlyUnlocked.push({ id: tp.id, name: tp.name })
        }
      }
      for (const w of newlyUnlocked) {
        freshRoot.addDialogue?.({
          speaker: 'system',
          text: `🧑‍⚖️ 새 증인 '${w.name}' 소환 가능해졌습니다.`,
          relatedDisputes: [],
          turn: freshRoot.turnCount ?? 0,
        })
      }
    }

    return { ok: true, outputId: output.id }
  },
})
