import type { CaseData, ClearanceItem, ClearanceResult, ProcessMetrics } from '../types'
import type { DialogueEntry } from '../types'
import type { EvidenceRuntimeState } from './evidenceEngine'
import { getDossierCards, getUsedDossierQuestionIds } from './v3GameLoopLoader'
import { normalizeCaseKey } from '../utils/caseHelpers'

const LIE_RANK: Record<string, number> = {
  S0: 0,
  S1: 1,
  S2: 2,
  S3: 3,
  S4: 4,
  S5: 5,
}

const MINIGAME_MAX_ROUNDS = 5

type LieStateMap = Record<string, { currentState: string }>

type WitnessSession = {
  heardSlots: string[]
  lastChoice: string | null
  summonCount: number
}

type MiniGameProgressState = {
  completedRounds: number
  totalEarned: number
}

type CombinationLabRuntimeState = {
  config: CaseData['combinationLab'] | null
  appliedRecipeIds: string[]
}

export interface ClearanceTrackerState {
  caseData: CaseData | null
  evidenceStates: Record<string, EvidenceRuntimeState>
  triggeredCombinations: string[]
  combinationLabRuntime: CombinationLabRuntimeState
  calledWitnesses: string[]
  witnessSessions: Record<string, WitnessSession>
  processMetrics: ProcessMetrics
  discovery: {
    disputeVisibility: Record<string, { visibility: string }>
  }
  agentA: {
    lieStateMap: LieStateMap
  }
  agentB: {
    lieStateMap: LieStateMap
  }
  minigameProgress: Record<string, MiniGameProgressState>
  dialogueLog: DialogueEntry[]
}

function clampCount(value: number, target: number): number {
  return Math.max(0, Math.min(value, target))
}

function shouldStartHidden(dispute: CaseData['disputes'][number]): boolean {
  return (
    dispute.hidden === true
    || dispute.v3Visibility === 'hidden'
    || (
      (dispute.quadrant === 'neither_knows' || dispute.quadrant === 'shared_misconception')
      && dispute.weight === 'high'
    )
  )
}

function getInvestigationTargetCount(state: EvidenceRuntimeState | undefined, evidence: CaseData['evidence'][number]): number {
  if (!state) return 1
  const stageCount = evidence.investigationStages?.length ?? 0
  if (stageCount > 0) return stageCount
  return Object.keys(evidence.investigationResults ?? {}).length > 0 ? 1 : 0
}

function getMaxLieRank(disputeId: string, ...maps: LieStateMap[]): number {
  return Math.max(
    ...maps.map((map) => LIE_RANK[map[disputeId]?.currentState ?? 'S0'] ?? 0),
  )
}

function findDossierUsageCount(caseKey: string): { usedCardIds: Set<string>; target: number } {
  const cards = getDossierCards(caseKey)
  const usedQuestions = getUsedDossierQuestionIds(caseKey)
  const usedCardIds = new Set<string>()

  for (const card of cards) {
    const wasUsed = card.challenges.some((challenge) =>
      challenge.questions.some((question) => usedQuestions.has(question.id)),
    )
    if (wasUsed) usedCardIds.add(card.id)
  }

  return { usedCardIds, target: cards.length }
}

function buildMissedConnections(state: ClearanceTrackerState): ClearanceResult['missedConnections'] {
  const caseData = state.caseData
  if (!caseData) return []

  const evidenceNameById = new Map(caseData.evidence.map((item) => [item.id, item.surfaceName ?? item.name]))
  const missed: ClearanceResult['missedConnections'] = []

  const triggeredKeys = new Set(state.triggeredCombinations)
  for (const combination of caseData.evidenceCombinations) {
    const comboKey = combination.requires.join('+')
    if (triggeredKeys.has(comboKey)) continue

    const labels = combination.requires.map((id) => evidenceNameById.get(id) ?? id)
    missed.push({
      a: labels[0] ?? combination.requires[0] ?? '-',
      b: labels.slice(1).join(' + ') || labels[0] || '-',
      label: `자동 조합: ${labels.join(' + ')}`,
    })
  }

  const config = state.combinationLabRuntime.config
  if (!config) return missed

  const appliedRecipeIds = new Set(state.combinationLabRuntime.appliedRecipeIds)
  const nodeLabelById = new Map(config.nodes.map((node) => [node.id, node.label]))

  for (const recipe of config.recipes) {
    if (appliedRecipeIds.has(recipe.id)) continue

    const output = config.outputs.find((item) => item.id === recipe.outputId)
    const labels = recipe.inputs.map((id) => nodeLabelById.get(id) ?? evidenceNameById.get(id) ?? id)
    missed.push({
      a: labels[0] ?? recipe.id,
      b: labels.slice(1).join(' + ') || labels[0] || recipe.id,
      label: `수동 조합: ${output?.label ?? recipe.discoveryText}`,
    })
  }

  return missed
}

function buildItems(state: ClearanceTrackerState): ClearanceItem[] {
  const caseData = state.caseData
  if (!caseData) return []

  const uniqueWitnessIds = new Set(state.calledWitnesses)
  const hiddenDisputeIds = caseData.disputes.filter(shouldStartHidden).map((dispute) => dispute.id)
  const hiddenDisputesEmerged = hiddenDisputeIds.filter((id) => state.discovery.disputeVisibility[id]?.visibility !== 'hidden').length
  const allDisputesS3Plus = caseData.disputes.filter((dispute) => getMaxLieRank(dispute.id, state.agentA.lieStateMap, state.agentB.lieStateMap) >= 3).length
  const questionTriadCount = [
    state.processMetrics.factQuestionsAsked > 0,
    state.processMetrics.motiveQuestionsAsked > 0,
    state.processMetrics.empathyQuestionsAsked > 0,
  ].filter(Boolean).length
  const fullyInvestigatedEvidenceCount = caseData.evidence.filter((evidence) => {
    const evState = state.evidenceStates[evidence.id]
    const required = getInvestigationTargetCount(evState, evidence)
    if (required <= 0) return true
    return (evState?.investigatedActions.length ?? 0) >= required
  }).length
  const { usedCardIds, target: dossierTarget } = findDossierUsageCount(normalizeCaseKey(caseData.caseId))
  const witnessDepth3Count = Object.values(state.witnessSessions).filter((session) => session.heardSlots.length >= 3).length
  const separationUsed = state.dialogueLog.some((entry) => entry.text.includes('[분리] 분리 심문 시작'))

  return [
    {
      id: 'evidence-unlocked',
      category: 'evidence',
      label: '모든 증거 해금',
      achieved: caseData.evidence.filter((evidence) => state.evidenceStates[evidence.id]?.unlocked).length >= caseData.evidence.length,
      current: clampCount(caseData.evidence.filter((evidence) => state.evidenceStates[evidence.id]?.unlocked).length, caseData.evidence.length),
      target: caseData.evidence.length,
    },
    {
      id: 'evidence-presented',
      category: 'evidence',
      label: '모든 증거 제시',
      achieved: caseData.evidence.filter((evidence) => state.evidenceStates[evidence.id]?.presented).length >= caseData.evidence.length,
      current: clampCount(caseData.evidence.filter((evidence) => state.evidenceStates[evidence.id]?.presented).length, caseData.evidence.length),
      target: caseData.evidence.length,
    },
    {
      id: 'evidence-investigated',
      category: 'evidence',
      label: '모든 증거 풀조사',
      achieved: fullyInvestigatedEvidenceCount >= caseData.evidence.length,
      current: clampCount(fullyInvestigatedEvidenceCount, caseData.evidence.length),
      target: caseData.evidence.length,
    },
    {
      id: 'combination-auto',
      category: 'combination',
      label: '자동 조합 완수',
      achieved: state.triggeredCombinations.length >= caseData.evidenceCombinations.length,
      current: clampCount(new Set(state.triggeredCombinations).size, caseData.evidenceCombinations.length),
      target: caseData.evidenceCombinations.length,
    },
    {
      id: 'combination-manual',
      category: 'combination',
      label: '수동 조합 완수',
      achieved: state.combinationLabRuntime.appliedRecipeIds.length >= (state.combinationLabRuntime.config?.recipes.length ?? 0),
      current: clampCount(new Set(state.combinationLabRuntime.appliedRecipeIds).size, state.combinationLabRuntime.config?.recipes.length ?? 0),
      target: state.combinationLabRuntime.config?.recipes.length ?? 0,
    },
    {
      id: 'dossier-used',
      category: 'combination',
      label: 'DossierCard 전부 사용',
      achieved: usedCardIds.size >= dossierTarget,
      current: clampCount(usedCardIds.size, dossierTarget),
      target: dossierTarget,
    },
    {
      id: 'witness-called',
      category: 'witness',
      label: '모든 증인 소환',
      achieved: uniqueWitnessIds.size >= caseData.duo.socialGraph.length,
      current: clampCount(uniqueWitnessIds.size, caseData.duo.socialGraph.length),
      target: caseData.duo.socialGraph.length,
    },
    {
      id: 'witness-depth',
      category: 'witness',
      label: '증인 심층 증언 도달',
      achieved: witnessDepth3Count >= caseData.duo.socialGraph.length,
      current: clampCount(witnessDepth3Count, caseData.duo.socialGraph.length),
      target: caseData.duo.socialGraph.length,
    },
    {
      id: 'question-triad',
      category: 'interrogation',
      label: '질문 3유형 모두 사용',
      achieved: questionTriadCount >= 3,
      current: questionTriadCount,
      target: 3,
    },
    {
      id: 'contradiction-success',
      category: 'interrogation',
      label: '모순 추궁 성공',
      achieved: state.processMetrics.liesCollapsed > 0,
      current: state.processMetrics.liesCollapsed > 0 ? 1 : 0,
      target: 1,
    },
    {
      id: 'hidden-emerged',
      category: 'dispute',
      label: '숨은 쟁점 전부 발현',
      achieved: hiddenDisputesEmerged >= hiddenDisputeIds.length,
      current: clampCount(hiddenDisputesEmerged, hiddenDisputeIds.length),
      target: hiddenDisputeIds.length,
    },
    {
      id: 'disputes-s3',
      category: 'dispute',
      label: '모든 쟁점 S3 이상 도달',
      achieved: allDisputesS3Plus >= caseData.disputes.length,
      current: clampCount(allDisputesS3Plus, caseData.disputes.length),
      target: caseData.disputes.length,
    },
    {
      id: 'separation-used',
      category: 'interrogation',
      label: '분리 심문 사용',
      achieved: separationUsed,
      current: separationUsed ? 1 : 0,
      target: 1,
    },
    {
      id: 'confidential-used',
      category: 'interrogation',
      label: '비공개 보호 사용',
      achieved: state.processMetrics.confidentialUsed > 0,
      current: state.processMetrics.confidentialUsed > 0 ? 1 : 0,
      target: 1,
    },
  ]
}

export function evaluateClearance(state: ClearanceTrackerState): ClearanceResult {
  const items = buildItems(state)
  const achieved = items.filter((item) => item.achieved).length
  const total = items.length
  const percent = total > 0 ? Math.round((achieved / total) * 100) : 0

  return {
    items,
    achieved,
    total,
    percent,
    missedConnections: buildMissedConnections(state),
  }
}
