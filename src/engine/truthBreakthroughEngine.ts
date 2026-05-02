import type { AgentState, CaseData, PartyId, ThirdParty } from '../types'
import type { EvidenceRuntimeState } from './evidenceEngine'

export type TruthBreakthroughRoute = 'emotion' | 'trust' | 'explicit' | 'blocked'

export interface TruthBreakthroughGateInput {
  caseData: CaseData | null | undefined
  evidenceStates?: Record<string, EvidenceRuntimeState>
  witnessSessions?: Record<string, { heardSlots: string[]; lastChoice: string | null; summonCount: number }>
  party: PartyId
  disputeId: string
  agent: AgentState
  trigger: string
  bypass?: boolean
}

export interface TruthBreakthroughGateResult {
  canBreakthrough: boolean
  route: TruthBreakthroughRoute
  routeReady: boolean
  conditionReady: boolean
  satisfiedBy: string[]
  holdReason: string | null
}

const TRUST_BREAKTHROUGH_THRESHOLD = 100
const EMOTION_BREAKTHROUGH_VALUE = 84
const DIRECT_BREAKTHROUGH_TRIGGERS = [
  'confession_dispatched',
  'witness_truth_probe',
  'explicit_confession',
  'truth_probe_confirmed',
]

function getRequiredEvidenceIds(caseData: CaseData, disputeId: string): Set<string> {
  const dispute = caseData.disputes.find((item) => item.id === disputeId)
  const ids = new Set(dispute?.requiredEvidence ?? [])
  for (const evidence of caseData.evidence) {
    if (evidence.proves.includes(disputeId)) ids.add(evidence.id)
  }
  return ids
}

function getInvestigationRequirement(caseData: CaseData, evidenceId: string): number {
  const evidence = caseData.evidence.find((item) => item.id === evidenceId)
  const stages = evidence?.investigationStages?.length ?? 0
  if (stages <= 0) return 1
  return Math.min(2, stages)
}

function isEvidenceConditionMet(
  caseData: CaseData,
  evidenceStates: Record<string, EvidenceRuntimeState> | undefined,
  party: PartyId,
  evidenceId: string,
): boolean {
  const state = evidenceStates?.[evidenceId]
  if (!state) return false

  const requiredStage = getInvestigationRequirement(caseData, evidenceId)
  const investigated = state.investigatedActions?.length ?? 0
  const presentedStages = state.presentedStagesByParty?.[party] ?? []
  const maxPresentedStage = presentedStages.length > 0 ? Math.max(...presentedStages) : 0

  return (
    state.deepInvestigated === true ||
    investigated >= requiredStage ||
    maxPresentedStage >= requiredStage ||
    (requiredStage <= 1 && state.presentedTo?.includes(party) === true)
  )
}

function normalizeIdFragment(id: string): string {
  return id.toLowerCase().replace(/[^a-z0-9]/g, '')
}

function slotLooksRelatedToDispute(slotId: string, disputeId: string): boolean {
  const normalizedSlot = normalizeIdFragment(slotId)
  const normalizedDispute = normalizeIdFragment(disputeId)
  if (!normalizedDispute) return false

  return normalizedSlot.includes(normalizedDispute)
}

function slotLooksDecisive(slotId: string): boolean {
  const normalized = slotId.toLowerCase()
  return (
    normalized.includes('core') ||
    normalized.includes('truth') ||
    normalized.includes('confirm') ||
    normalized.includes('final') ||
    normalized.includes('full') ||
    normalized.includes('d3')
  )
}

function isWitnessRelatedToDispute(witness: ThirdParty, disputeId: string): boolean {
  return witness.relatedDisputeIds?.includes(disputeId) === true
}

function getRelevantWitnesses(caseData: CaseData, disputeId: string): ThirdParty[] {
  return caseData.duo.socialGraph.filter((witness) => isWitnessRelatedToDispute(witness, disputeId))
}

function isWitnessConditionMet(
  caseData: CaseData,
  witnessSessions: TruthBreakthroughGateInput['witnessSessions'],
  disputeId: string,
): string[] {
  const relevantWitnesses = getRelevantWitnesses(caseData, disputeId)
  const satisfied: string[] = []

  for (const witness of relevantWitnesses) {
    const session = witnessSessions?.[witness.id]
    if (!session) continue

    const heardSlots = session.heardSlots ?? []
    const relatedSlots = heardSlots.filter((slotId) => slotLooksRelatedToDispute(slotId, disputeId))
    const decisiveSlot = relatedSlots.some(slotLooksDecisive)

    if (decisiveSlot || relatedSlots.length >= 2 || (relatedSlots.length >= 1 && witness.witnessedDirectly && session.summonCount >= 2)) {
      satisfied.push(`witness:${witness.id}`)
    }
  }

  return satisfied
}

function isExplicitBreakthrough(trigger: string): boolean {
  return DIRECT_BREAKTHROUGH_TRIGGERS.some((keyword) => trigger.includes(keyword))
}

function getRoute(agent: AgentState, trigger: string, bypass?: boolean): {
  route: TruthBreakthroughRoute
  routeReady: boolean
} {
  if (bypass || isExplicitBreakthrough(trigger)) {
    return { route: 'explicit', routeReady: true }
  }

  const emotionReady =
    agent.emotionalState.phase === 'resigned' ||
    agent.emotionalState.internalValue >= EMOTION_BREAKTHROUGH_VALUE
  if (emotionReady) return { route: 'emotion', routeReady: true }

  const trustReady = agent.trustState.trustTowardJudge >= TRUST_BREAKTHROUGH_THRESHOLD
  if (trustReady) return { route: 'trust', routeReady: true }

  return { route: 'blocked', routeReady: false }
}

export function evaluateTruthBreakthroughGate(input: TruthBreakthroughGateInput): TruthBreakthroughGateResult {
  const { route, routeReady } = getRoute(input.agent, input.trigger, input.bypass)

  if (route === 'explicit') {
    return {
      canBreakthrough: true,
      route,
      routeReady: true,
      conditionReady: true,
      satisfiedBy: [input.trigger],
      holdReason: null,
    }
  }

  if (!input.caseData) {
    return {
      canBreakthrough: false,
      route,
      routeReady,
      conditionReady: false,
      satisfiedBy: [],
      holdReason: 'case_missing',
    }
  }

  const evidenceIds = Array.from(getRequiredEvidenceIds(input.caseData, input.disputeId))
  const evidenceSatisfiedBy = evidenceIds
    .filter((id) => isEvidenceConditionMet(input.caseData!, input.evidenceStates, input.party, id))
    .map((id) => `evidence:${id}`)
  const witnessSatisfiedBy = isWitnessConditionMet(input.caseData, input.witnessSessions, input.disputeId)
  const satisfiedBy = [...evidenceSatisfiedBy, ...witnessSatisfiedBy]
  const conditionReady = satisfiedBy.length > 0

  return {
    canBreakthrough: routeReady && conditionReady,
    route,
    routeReady,
    conditionReady,
    satisfiedBy,
    holdReason: routeReady
      ? conditionReady ? null : 'condition_not_met'
      : 'route_not_ready',
  }
}
