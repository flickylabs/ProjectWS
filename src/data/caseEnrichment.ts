/**
 * 사건 보강 데이터 통합 로더.
 * GPT 배치 재작업 결과를 런타임에서 참조하는 진입점.
 * H 단계(병합)에서 이 파일에 실제 데이터가 채워짐.
 */

// ── 타입 ──

export interface CasePersonalityTags {
  a: string[]
  b: string[]
}

export interface DisputeActionAffinity {
  bestAction: string
  worstAction: string
  actionScores: Record<string, number>
  bestActionHint: string
  worstActionReaction: string
}

export interface DisputeOptimalPath {
  requiredActions: string[]
  bonusActions: string[]
  pathGoal?: string
}

export interface NarrativeExpansionEntry {
  category: string
  deeperReveal: string
  unlockHint: string
  impactDisputes: string[]
}

export interface WitnessSpeechSamples {
  [witnessId: string]: string[]
}

export interface CaseEnrichment {
  personalityTags?: CasePersonalityTags
  contentTags?: Record<string, string[]>
  actionAffinity?: Record<string, DisputeActionAffinity>
  optimalPath?: Record<string, DisputeOptimalPath>
  narrativeExpansion?: Record<string, NarrativeExpansionEntry>
  witnessSpeechSample?: WitnessSpeechSamples
  truthCategory?: Record<string, string>
}

// ── 데이터 저장소 (H 단계에서 채워짐) ──

const ENRICHMENT_DATA: Record<string, CaseEnrichment> = {}

/** 병합 시 데이터 등록 */
export function registerEnrichment(caseId: string, data: CaseEnrichment) {
  ENRICHMENT_DATA[caseId] = data
}

/** 벌크 등록 */
export function registerAllEnrichments(data: Record<string, CaseEnrichment>) {
  Object.assign(ENRICHMENT_DATA, data)
}

// ── 조회 API ──

export function getPersonalityTags(caseId: string): CasePersonalityTags | null {
  return ENRICHMENT_DATA[caseId]?.personalityTags ?? null
}

export function getActionAffinityForDispute(caseId: string, disputeId: string): DisputeActionAffinity | null {
  return ENRICHMENT_DATA[caseId]?.actionAffinity?.[disputeId] ?? null
}

export function getOptimalPath(caseId: string, disputeId: string): DisputeOptimalPath | null {
  return ENRICHMENT_DATA[caseId]?.optimalPath?.[disputeId] ?? null
}

export function getNarrativeExpansion(caseId: string, disputeId: string): NarrativeExpansionEntry | null {
  return ENRICHMENT_DATA[caseId]?.narrativeExpansion?.[disputeId] ?? null
}

export function getWitnessSpeechSamples(caseId: string, witnessId: string): string[] | null {
  return ENRICHMENT_DATA[caseId]?.witnessSpeechSample?.[witnessId] ?? null
}

export function getTruthCategory(caseId: string, truthId: string): string | null {
  return ENRICHMENT_DATA[caseId]?.truthCategory?.[truthId] ?? null
}

export function getContentTags(caseId: string, disputeId: string): string[] | null {
  return ENRICHMENT_DATA[caseId]?.contentTags?.[disputeId] ?? null
}

export function hasEnrichment(caseId: string): boolean {
  return !!ENRICHMENT_DATA[caseId]
}
