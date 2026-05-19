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
import { isEvidenceFullyInvestigated } from '../../engine/evidenceEngine'
import { getRuntimeTextLocale } from '../../i18n/runtimeText'
import type { LocaleCode } from '../../i18n/locales'
import { emitCombinationAttempt, emitCombinationFail, emitCombinationSuccess } from '../../telemetry/wirePoints'
import type { UnsafeAny } from '../../types/lint'


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

const SPOUSE01_COMBINE2_OUTPUT_ID = 'dc-6'
const SPOUSE01_STALE_COMBINE2_JUDGE_LINE = '오피스텔의 사람을 짚어야겠습니다'

const SPOUSE01_COMBINE2_COPY: Record<LocaleCode, {
  label: string
  discoveryText: string
  summary: string
  note: string
  judgeHint: string
}> = {
  ko: {
    label: 'dc-6 가족 쪽 정황',
    discoveryText: '영수증 묶음 속 중학교 참고서와 문자에 섞인 학교 알림이 가족 쪽 정황으로 맞물린다.',
    summary: '영수증의 참고서와 문자 속 학교 알림을 함께 보며 가족 쪽 정황을 분리하는 카드',
    note: '가족 쪽 정황',
    judgeHint: '문자와 구매 품목이 같은 가족 쪽 정황을 가리킵니다. 누구와 관련된 일인지와 왜 숨겼는지를 따로 확인해야 합니다.',
  },
  en: {
    label: 'dc-6 Family-side context',
    discoveryText: 'The middle-school workbook in the receipt bundle and the school notice mixed into the text messages point to a family-side context.',
    summary: 'A card that separates the family-side context by reading the workbook receipt together with the school notice in the messages.',
    note: 'Family-side context',
    judgeHint: 'The messages and purchased items point to the same family-side context. Confirm who it concerns and why it was hidden separately.',
  },
  ja: {
    label: 'dc-6 家族側の事情',
    discoveryText: '領収書束の中学校参考書と、メッセージに混じった学校通知が、家族側の事情としてつながります。',
    summary: '領収書の参考書とメッセージ内の学校通知を合わせて見て、家族側の事情を切り分けるカード。',
    note: '家族側の事情',
    judgeHint: 'メッセージと購入品は同じ家族側の事情を示しています。誰に関することか、なぜ隠したのかを別々に確認する必要があります。',
  },
  'zh-CN': {
    label: 'dc-6 家庭方面的情况',
    discoveryText: '收据包里的初中参考书和短信中夹杂的学校通知，指向同一条家庭方面的情况。',
    summary: '将收据中的参考书与短信里的学校通知合并查看，用来区分家庭方面情况的卡片。',
    note: '家庭方面的情况',
    judgeHint: '短信和购买物品指向同一条家庭方面的情况。需要分别确认这与谁有关，以及为什么被隐瞒。',
  },
}

function spouse01Combine2Copy() {
  return SPOUSE01_COMBINE2_COPY[getRuntimeTextLocale()] ?? SPOUSE01_COMBINE2_COPY.ko
}

function normalizeCaseKeyLocal(caseId?: string | null): string {
  return String(caseId ?? '').replace(/^case-/, '')
}

function spouse01Combine2Node(): CombinationLabNode {
  const copy = spouse01Combine2Copy()
  return {
    id: SPOUSE01_COMBINE2_OUTPUT_ID,
    type: 'derived_note',
    label: copy.label,
    linkedDisputeIds: ['d-1', 'd-2'],
    linkedEvidenceIds: ['e-1', 'e-4'],
    visibility: 'derived',
  }
}

function spouse01Combine2Output(): CombinationLabOutput {
  const copy = spouse01Combine2Copy()
  return {
    id: SPOUSE01_COMBINE2_OUTPUT_ID,
    label: copy.label,
    summary: copy.summary,
    nodeType: 'derived_note',
    noteText: copy.note,
    effects: [
      {
        kind: 'unlock_note',
        unlockNodeId: SPOUSE01_COMBINE2_OUTPUT_ID,
      },
      {
        kind: 'upgrade_evidence',
        evidenceUpgrade: {
          evidenceId: 'e-4',
          toReliability: 'hard',
        },
      },
    ],
    judgeHint: copy.judgeHint,
  }
}

function dedupeStrings(values: unknown): string[] {
  return Array.from(new Set(Array.isArray(values) ? values.filter((value): value is string => typeof value === 'string') : []))
}

function patchSpouse01CombinationConfig(config: CombinationLabConfig | null): CombinationLabConfig | null {
  if (!config) return config

  let hasDc6Node = false
  const nodes = config.nodes.map((node) => {
    if (node.id === 'dc-1') {
      return {
        ...node,
        linkedDisputeIds: ['d-1'],
        linkedEvidenceIds: ['e-1', 'e-2'],
      }
    }
    if (node.id === SPOUSE01_COMBINE2_OUTPUT_ID) {
      hasDc6Node = true
      return { ...node, ...spouse01Combine2Node() }
    }
    return node
  })
  if (!hasDc6Node) nodes.push(spouse01Combine2Node())

  let hasDc6Output = false
  const outputs = config.outputs.map((output) => {
    if (output.id === SPOUSE01_COMBINE2_OUTPUT_ID) {
      hasDc6Output = true
      return { ...output, ...spouse01Combine2Output() }
    }
    return output
  })
  if (!hasDc6Output) outputs.push(spouse01Combine2Output())

  const recipes = config.recipes.map((recipe) => (
    recipe.id === 'combine-2'
      ? {
          ...recipe,
          inputs: ['e-1', 'e-4'],
          discoveryText: spouse01Combine2Copy().discoveryText,
          outputId: SPOUSE01_COMBINE2_OUTPUT_ID,
        }
      : recipe
  ))

  return { ...config, nodes, outputs, recipes }
}

function patchSpouse01RuntimeState(root: UnsafeAny): Partial<UnsafeAny> | null {
  if (normalizeCaseKeyLocal(root.caseData?.caseId) !== 'spouse-01') return null

  const runtime = root.combinationLabRuntime as CombinationLabRuntimeState | undefined
  const combine2Copy = spouse01Combine2Copy()
  const patchedConfig = patchSpouse01CombinationConfig(runtime?.config ?? root.caseData?.combinationLab ?? null)
  if (!runtime || !patchedConfig) return null

  const appliedRecipeIds = dedupeStrings(runtime.appliedRecipeIds)
  const combine2Applied = appliedRecipeIds.includes('combine-2')
  const discoveredNodeIds = dedupeStrings(runtime.discoveredNodeIds)
  const nextDiscoveredNodeIds = combine2Applied && !discoveredNodeIds.includes(SPOUSE01_COMBINE2_OUTPUT_ID)
    ? [...discoveredNodeIds, SPOUSE01_COMBINE2_OUTPUT_ID]
    : discoveredNodeIds
  const history = Array.isArray(runtime.history)
    ? runtime.history.map((entry) => (
        entry.recipeId === 'combine-2' && entry.outputId === 'dc-1'
          ? { ...entry, outputId: SPOUSE01_COMBINE2_OUTPUT_ID, summary: combine2Copy.summary }
          : entry
      ))
    : []

  const dialogueLog = Array.isArray(root.dialogueLog)
    ? root.dialogueLog
        .filter((entry: UnsafeAny) => !(
          entry?.speaker === 'judge' &&
          typeof entry.text === 'string' &&
          entry.text.includes(SPOUSE01_STALE_COMBINE2_JUDGE_LINE)
        ))
        .map((entry: UnsafeAny) => {
          if (
            typeof entry?.text === 'string' &&
            entry.text.includes('조합 결과: 오피스텔의 사람들') &&
            entry.text.includes('중학교 참고서') &&
            entry.text.includes('학교 알림')
          ) {
            return {
              ...entry,
              text: `조합 결과: ${combine2Copy.note}\n${combine2Copy.discoveryText}`,
            }
          }
          return entry
        })
    : root.dialogueLog

  const judgeObservations = Array.isArray(root.judgeObservations)
    ? root.judgeObservations
        .filter((entry: UnsafeAny) => !(
          typeof entry?.summary === 'string' &&
          entry.summary.includes(SPOUSE01_STALE_COMBINE2_JUDGE_LINE)
        ))
        .map((entry: UnsafeAny) => {
          if (typeof entry?.summary === 'string' && entry.summary.includes('가족 쪽 돌봄 정황')) {
            return { ...entry, summary: entry.summary.replaceAll('가족 쪽 돌봄 정황', '가족 쪽 정황') }
          }
          return entry
        })
    : root.judgeObservations

  return {
    caseData: root.caseData
      ? { ...root.caseData, combinationLab: patchedConfig }
      : root.caseData,
    combinationLabRuntime: {
      ...runtime,
      config: patchedConfig,
      appliedRecipeIds,
      discoveredNodeIds: nextDiscoveredNodeIds,
      unlockedNotes: combine2Applied
        ? { ...(runtime.unlockedNotes ?? {}), [SPOUSE01_COMBINE2_OUTPUT_ID]: combine2Copy.note }
        : (runtime.unlockedNotes ?? {}),
      history,
    },
    dialogueLog,
    judgeObservations,
  }
}

function ensureSpouse01RuntimePatched(get: () => UnsafeAny, set: (partial: UnsafeAny) => void): CombinationLabRuntimeState {
  const patch = patchSpouse01RuntimeState(get())
  if (patch) set(patch)
  return (patch?.combinationLabRuntime ?? get().combinationLabRuntime) as CombinationLabRuntimeState
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
  migrateCombinationLabRuntime: () => void
  getCombinationNode: (nodeId: string) => CombinationLabNode | undefined
  getCombinationOutput: (outputId: string) => CombinationLabOutput | undefined
  canRunCombinationRecipe: (recipeId: string) => boolean
  runCombinationRecipe: (recipeId: string) => { ok: boolean; reason?: string; outputId?: string; newlyUnlockedWitnesses?: { id: string; name: string }[] }
  /** 대화에서 statement 노드의 따옴표 문구가 실제 발화될 때 discoveredNodeIds에 추가 */
  syncStatementsFromDialogue: (text: string) => void
}

export const createCombinationLabSlice: StateCreator<UnsafeAny, [], [], CombinationLabSlice> = (set, get) => ({
  combinationLabRuntime: { ...EMPTY_RUNTIME },

  initCombinationLab: (caseData) => {
    const config = normalizeCaseKeyLocal(caseData.caseId) === 'spouse-01'
      ? patchSpouse01CombinationConfig(caseData.combinationLab ?? null)
      : (caseData.combinationLab ?? null)
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

  migrateCombinationLabRuntime: () => {
    ensureSpouse01RuntimePatched(get, set as (partial: UnsafeAny) => void)
  },

  getCombinationNode: (nodeId) => {
    const config = ensureSpouse01RuntimePatched(get, set as (partial: UnsafeAny) => void).config
    return config?.nodes.find((node: CombinationLabNode) => node.id === nodeId)
  },

  getCombinationOutput: (outputId) => {
    const config = ensureSpouse01RuntimePatched(get, set as (partial: UnsafeAny) => void).config
    return config?.outputs.find((output: CombinationLabOutput) => output.id === outputId)
  },

  canRunCombinationRecipe: (recipeId) => {
    const state = ensureSpouse01RuntimePatched(get, set as (partial: UnsafeAny) => void)
    const config = state.config
    if (!config) return false
    const recipe = config.recipes.find((item: CombinationLabRecipe) => item.id === recipeId)
    if (!recipe) return false
    if (!recipe.repeatable && state.appliedRecipeIds.includes(recipe.id)) return false
    const output = config.outputs.find((item: CombinationLabOutput) => item.id === recipe.outputId)
    if (output && !recipe.repeatable && state.discoveredNodeIds.includes(output.id)) return false
    if (state.analysisPoints < recipe.cost) return false

    const root = get() as UnsafeAny
    // 스킬 포인트 1 이상 필요
    if ((root.resources?.skillPoints ?? 0) < 1) return false
    const evidenceDefinitions = (root.evidenceDefinitions ?? []) as EvidenceNode[]
    const defById = new Map(evidenceDefinitions.map((d) => [d.id, d]))
    return recipe.inputs.every((inputId: string) => {
      const node = config.nodes.find((item: CombinationLabNode) => item.id === inputId)
      if (!node) return false
      if (node.type === 'evidence' || node.type === 'derived_evidence') {
        const st = root.evidenceStates?.[inputId]
        if (!st?.unlocked) return false
        // investigationStages 미완료 시 조합 차단
        return isEvidenceFullyInvestigated(st, defById.get(inputId))
      }
      return state.discoveredNodeIds.includes(inputId)
    })
  },

  runCombinationRecipe: (recipeId) => {
    const root = get() as UnsafeAny
    const caseId = root.caseData?.caseId
    emitCombinationAttempt(recipeId, caseId)
    const fail = (reason: string) => {
      emitCombinationFail(recipeId, reason, caseId)
      return { ok: false, reason }
    }

    const runtime = ensureSpouse01RuntimePatched(get, set as (partial: UnsafeAny) => void)
    const config = runtime.config
    if (!config) return fail('no_config')

    const recipe = config.recipes.find((item: CombinationLabRecipe) => item.id === recipeId)
    if (!recipe) return fail('recipe_not_found')
    const output = config.outputs.find((item: CombinationLabOutput) => item.id === recipe.outputId)
    if (!output) return fail('output_not_found')
    if (!recipe.repeatable && runtime.appliedRecipeIds.includes(recipe.id)) return fail('recipe_locked')
    if (!recipe.repeatable && runtime.discoveredNodeIds.includes(output.id)) {
      return fail('output_already_discovered')
    }
    if (!root.canRunCombinationRecipe(recipeId)) return fail('recipe_locked')
    const hiddenRefund = recipe.hidden ? (config.analysisPointRefundOnFirstHidden ?? 0) : 0
    const unlockedDossierForFirstTime = output.id.startsWith('dc-') && !runtime.appliedRecipeIds.includes(recipe.id)

    let caseData = root.caseData as CaseData | null
    if (!caseData) return fail('no_case')

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

    const emergeExistingDispute = (disputeId?: string) => {
      if (!disputeId || !caseData?.disputes.some((d) => d.id === disputeId)) return
      const visibilityEntry = root.discovery?.disputeVisibility?.[disputeId]
      if (visibilityEntry?.visibility !== 'hidden') return
      const dispute = caseData.disputes.find((d) => d.id === disputeId)
      root.emergeDispute?.(
        disputeId,
        'truth_confrontation',
        root.turnCount ?? 0,
        dispute?.name ?? stripOutputCodename(output.label ?? disputeId),
      )
    }

    const emergePrerequisiteDisputes = (disputeId?: string) => {
      if (!disputeId || !caseData) return
      const dispute = caseData.disputes.find((d) => d.id === disputeId)
      const required = dispute?.unlockCondition?.requireDispute
      if (!required) return
      const requirements = Array.isArray(required) ? required : [required]
      for (const requirement of requirements) {
        emergeExistingDispute(requirement?.id)
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
          emergePrerequisiteDisputes(disputeId)
          emergeExistingDispute(disputeId)
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
            emergePrerequisiteDisputes(disputeId)
            emergeExistingDispute(disputeId)
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
    const resources = (root as UnsafeAny).resources
    if (resources && resources.skillPoints >= 1) {
      ;(root as UnsafeAny).spend('skillPoints', 1)
    }

    ;(set as (partial: UnsafeAny) => void)({
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
    // dialog는 호출자에서 순서 제어 (시스템 결과 → 재판관 코멘트 → 시스템 증인 알림)
    const newlyUnlockedWitnesses: { id: string; name: string }[] = []
    if (output.id.startsWith('dc-')) {
      const freshRoot = get() as UnsafeAny
      const currentUnlocked = new Set<string>(freshRoot.unlockedWitnessIds ?? [])
      for (const tp of caseData!.duo.socialGraph ?? []) {
        if (currentUnlocked.has(tp.id)) continue
        const gate = tp.unlockedByDossier ?? []
        if (gate.includes(output.id)) {
          freshRoot.addUnlockedWitness?.(tp.id)
          newlyUnlockedWitnesses.push({ id: tp.id, name: tp.name })
        }
      }
    }

    emitCombinationSuccess(recipe.id, output.id, caseId)
    return { ok: true, outputId: output.id, newlyUnlockedWitnesses }
  },
})
