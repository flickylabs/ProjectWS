import type { PartyId } from '../../types'
import type {
  FreeInterrogationIntent,
  FreeInterrogationIntentId,
  FreeInterrogationMapping,
  FreeInterrogationQuestionType,
  FreeInterrogationRuntimeContext,
} from '../../types/freeInterrogation'
import {
  classifyQuestionAnglesFromText,
  GENERAL_QUESTION_ANGLE,
  getUnlockedQuestionAngleIds,
} from '../questionAngleEngine.ts'

const INTENT_TO_QUESTION_TYPE: Record<FreeInterrogationIntentId, FreeInterrogationQuestionType | null> = {
  fact_pursuit: 'fact_pursuit',
  motive_search: 'motive_search',
  empathy_approach: 'empathy_approach',
  evidence_query: 'fact_pursuit',
  relation_query: 'motive_search',
  pre_verdict_summary: 'fact_pursuit',
  off_topic: null,
  public_info: null,
  gameplay_help: null,
  leak_probe: null,
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

  const target = resolveTarget(context, intent.raw)
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
      angleRefs: [],
    }
  }

  return {
    target,
    disputeId,
    interrogationType,
    evidenceRef,
    angleRefs: resolveSafeAngleRefs(context, target, disputeId, intent.raw, evidenceRef),
  }
}

function resolveSafeAngleRefs(
  context: FreeInterrogationRuntimeContext,
  target: PartyId,
  disputeId: string,
  raw: string,
  evidenceRef: string | null,
): string[] {
  const classified = classifyQuestionAnglesFromText(context.caseId, disputeId, raw, evidenceRef)
  const unlocked = new Set(getUnlockedQuestionAngleIds({
    caseId: context.caseId,
    caseData: context.caseData,
    disputeId,
    target,
    evidenceStates: context.evidenceStates,
    calledWitnesses: context.calledWitnesses,
  }))
  const safe = classified.filter((angleId) => angleId === GENERAL_QUESTION_ANGLE || unlocked.has(angleId))
  return safe.length > 0 ? [...new Set(safe)] : [GENERAL_QUESTION_ANGLE]
}

function emptyMapping(): FreeInterrogationMapping {
  return {
    target: null,
    disputeId: null,
    interrogationType: null,
    evidenceRef: null,
    angleRefs: [],
  }
}

function resolveTarget(context: FreeInterrogationRuntimeContext, raw: string): PartyId | null {
  const vocative = resolveDirectVocativeParty(raw, context)
  if (vocative) return vocative

  // The UI target selection is explicit. Names inside the question often refer to
  // the counterpart as an object ("A에게 왜 말하지 않았나") and must not reroute
  // the question away from the selected party.
  if (context.target) return context.target

  const addressed = resolveAddressedParty(raw, context)
  if (addressed) return addressed

  const active = context.activeDisputeId
  if (!active) return null
  if (context.agentA.lieStateMap[active]) return 'a'
  if (context.agentB.lieStateMap[active]) return 'b'
  return null
}

function resolveDirectVocativeParty(raw: string, context: FreeInterrogationRuntimeContext): PartyId | null {
  const partyA = context.caseData.duo.partyA.name
  const partyB = context.caseData.duo.partyB.name
  if (isDirectVocative(raw, partyA)) return 'a'
  if (isDirectVocative(raw, partyB)) return 'b'
  return null
}

function resolveAddressedParty(raw: string, context: FreeInterrogationRuntimeContext): PartyId | null {
  const partyA = context.caseData.duo.partyA.name
  const partyB = context.caseData.duo.partyB.name
  if (isDirectAddress(raw, partyA)) return 'a'
  if (isDirectAddress(raw, partyB)) return 'b'
  return null
}

function isDirectVocative(raw: string, name: string): boolean {
  if (!name.trim()) return false
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`^\\s*${escaped}\\s*(?:씨|님)?\\s*[,，:：]`).test(raw)
}

function isDirectAddress(raw: string, name: string): boolean {
  if (!name.trim()) return false
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`(^|[\\s,])${escaped}\\s*(씨|님|에게|한테|께|야|아|,)`).test(raw)
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
    .split(/[\s/·,()[\]{}"“”'‘’:：-]+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 2)
}

function isSpecificEvidenceToken(token: string): boolean {
  return !GENERIC_EVIDENCE_TOKENS.has(token)
}

function normalize(value: string): string {
  return value.toLowerCase().replace(/\s+/g, '')
}
