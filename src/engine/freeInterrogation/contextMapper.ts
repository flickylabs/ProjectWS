import type { PartyId } from '../../types'
import type {
  FreeInterrogationIntent,
  FreeInterrogationIntentId,
  FreeInterrogationMapping,
  FreeInterrogationQuestionType,
  FreeInterrogationRuntimeContext,
} from '../../types/freeInterrogation'

const INTENT_TO_QUESTION_TYPE: Record<FreeInterrogationIntentId, FreeInterrogationQuestionType | null> = {
  fact_pursuit: 'fact_pursuit',
  motive_search: 'motive_search',
  empathy_approach: 'empathy_approach',
  evidence_query: 'fact_pursuit',
  relation_query: 'motive_search',
  pre_verdict_summary: 'fact_pursuit',
  unmapped: null,
}

export function mapFreeInterrogationContext(
  intent: FreeInterrogationIntent,
  context: FreeInterrogationRuntimeContext,
): FreeInterrogationIntent {
  const mapped = buildMapping(intent, context)
  return { ...intent, mapped }
}

function buildMapping(
  intent: FreeInterrogationIntent,
  context: FreeInterrogationRuntimeContext,
): FreeInterrogationMapping {
  const interrogationType = INTENT_TO_QUESTION_TYPE[intent.intent]
  if (!interrogationType) {
    return emptyMapping()
  }

  const target = resolveTarget(context)
  if (!target) {
    return { ...emptyMapping(), interrogationType }
  }

  const evidenceRef = intent.intent === 'evidence_query'
    ? resolveEvidenceRef(intent.raw, context)
    : null

  const disputeId = resolveDisputeId(intent.raw, context, target, evidenceRef)
  if (!disputeId) {
    return {
      target,
      disputeId: null,
      interrogationType,
      evidenceRef,
    }
  }

  return {
    target,
    disputeId,
    interrogationType,
    evidenceRef,
  }
}

function emptyMapping(): FreeInterrogationMapping {
  return {
    target: null,
    disputeId: null,
    interrogationType: null,
    evidenceRef: null,
  }
}

function resolveTarget(context: FreeInterrogationRuntimeContext): PartyId | null {
  if (context.target) return context.target

  const active = context.activeDisputeId
  if (!active) return null
  if (context.agentA.lieStateMap[active]) return 'a'
  if (context.agentB.lieStateMap[active]) return 'b'
  return null
}

function resolveDisputeId(
  raw: string,
  context: FreeInterrogationRuntimeContext,
  target: PartyId,
  evidenceRef: string | null,
): string | null {
  if (evidenceRef) {
    const evidence = context.caseData.evidence.find((item) => item.id === evidenceRef)
    const evidenceDispute = evidence?.proves.find((id) => hasTargetLieState(context, target, id))
      ?? evidence?.proves[0]
    if (evidenceDispute) return evidenceDispute
  }

  const activeDisputeId = context.activeDisputeId ?? null
  if (activeDisputeId && hasTargetLieState(context, target, activeDisputeId)) {
    return activeDisputeId
  }

  const normalizedRaw = normalize(raw)
  const directMatch = context.caseData.disputes.find((dispute) => {
    const candidates = [
      dispute.id,
      dispute.name,
      ...splitMeaningfulTokens(dispute.name),
    ].map(normalize).filter((token) => token.length >= 2)
    return candidates.some((candidate) => normalizedRaw.includes(candidate))
      && hasTargetLieState(context, target, dispute.id)
  })
  if (directMatch) return directMatch.id

  return Object.keys(target === 'a' ? context.agentA.lieStateMap : context.agentB.lieStateMap)[0] ?? null
}

function resolveEvidenceRef(raw: string, context: FreeInterrogationRuntimeContext): string | null {
  const normalizedRaw = normalize(raw)
  const unlockedEvidence = context.caseData.evidence.filter((evidence) => {
    const state = context.evidenceStates[evidence.id]
    return !state || state.unlocked
  })

  const found = unlockedEvidence.find((evidence) => {
    const candidates = [
      evidence.id,
      evidence.surfaceName,
      evidence.name,
      ...splitMeaningfulTokens(evidence.surfaceName ?? evidence.name),
    ].filter((value): value is string => Boolean(value))
      .map(normalize)
      .filter((token) => token.length >= 2)
    return candidates.some((candidate) => normalizedRaw.includes(candidate))
  })

  return found?.id ?? null
}

function hasTargetLieState(context: FreeInterrogationRuntimeContext, target: PartyId, disputeId: string): boolean {
  const agent = target === 'a' ? context.agentA : context.agentB
  return Boolean(agent.lieStateMap[disputeId])
}

function splitMeaningfulTokens(text: string): string[] {
  return text
    .split(/[\s/·,()[\]{}"“”'‘’:：\-]+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 2)
}

function normalize(value: string): string {
  return value.toLowerCase().replace(/\s+/g, '')
}
