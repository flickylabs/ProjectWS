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

const MIN_CONTEXT_MAPPING_CONFIDENCE = 0.65
const MIN_ACTIVE_DISPUTE_CONFIDENCE = 0.7
const GENERIC_EVIDENCE_TOKENS = new Set([
  '기록',
  '자료',
  '내역',
  '서류',
  '문자',
  '카톡',
  '사진',
  '영상',
  '원본',
  '스캔',
  '보관본',
])

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
  if (intent.intent === 'unmapped' || intent.confidence < MIN_CONTEXT_MAPPING_CONFIDENCE) {
    return emptyMapping()
  }

  const interrogationType = INTENT_TO_QUESTION_TYPE[intent.intent]
  if (!interrogationType) {
    return emptyMapping()
  }

  const target = resolveTarget(context)
  if (!target) {
    return { ...emptyMapping(), interrogationType }
  }

  const evidenceMention = intent.intent === 'evidence_query'
    ? resolveEvidenceMention(intent.raw, context)
    : null
  const evidenceRef = evidenceMention && isEvidenceUnlocked(evidenceMention, context)
    ? evidenceMention
    : null

  const disputeId = resolveDisputeId(intent, context, target, evidenceRef, evidenceMention)
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
  intent: FreeInterrogationIntent,
  context: FreeInterrogationRuntimeContext,
  target: PartyId,
  evidenceRef: string | null,
  evidenceMention: string | null,
): string | null {
  if (evidenceRef) {
    const evidence = context.caseData.evidence.find((item) => item.id === evidenceRef)
    const evidenceDispute = evidence?.proves.find((id) => hasTargetLieState(context, target, id))
      ?? evidence?.proves[0]
    if (evidenceDispute) return evidenceDispute
  }

  if (intent.intent === 'evidence_query' && evidenceMention && !evidenceRef) {
    return null
  }

  const raw = intent.raw
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

  const activeDisputeId = context.activeDisputeId ?? null
  if (
    activeDisputeId &&
    intent.intent !== 'evidence_query' &&
    intent.confidence >= MIN_ACTIVE_DISPUTE_CONFIDENCE &&
    hasTargetLieState(context, target, activeDisputeId)
  ) {
    return activeDisputeId
  }

  return null
}

function resolveEvidenceMention(raw: string, context: FreeInterrogationRuntimeContext): string | null {
  const normalizedRaw = normalize(raw)
  const found = context.caseData.evidence.find((evidence) => {
    const candidates = [
      evidence.id,
      evidence.surfaceName,
      evidence.name,
      ...splitMeaningfulTokens(evidence.surfaceName ?? evidence.name).filter(isSpecificEvidenceToken),
    ].filter((value): value is string => Boolean(value))
      .map(normalize)
      .filter((token) => token.length >= 2)
    return candidates.some((candidate) => normalizedRaw.includes(candidate))
  })

  return found?.id ?? null
}

function isEvidenceUnlocked(evidenceId: string, context: FreeInterrogationRuntimeContext): boolean {
  const state = context.evidenceStates[evidenceId]
  return !state || Boolean(state.unlocked)
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

function isSpecificEvidenceToken(token: string): boolean {
  return !GENERIC_EVIDENCE_TOKENS.has(token)
}

function normalize(value: string): string {
  return value.toLowerCase().replace(/\s+/g, '')
}
