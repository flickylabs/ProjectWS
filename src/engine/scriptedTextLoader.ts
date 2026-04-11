/**
 * ScriptedText 로더.
 * 사전 생성된 NPC 대사 번들을 로드하고,
 * 키 기반으로 적절한 variant를 선택한다.
 * LLM 호출 없이 즉시 응답할 수 있는 "스크립트 우선 경로"의 핵심.
 */
import type {
  ScriptedTextBundle,
  ScriptedVariant,
  ScriptedLieState,
  ScriptedInterrogationQuestionType,
  ScriptedSubjectRole,
  ScriptedWitnessDepth,
  ScriptedLieBand,
} from '../types/scriptedText'
import {
  buildInterrogationKey,
  buildEvidencePresentKey,
  buildDossierKey,
  buildWitnessKey,
  toScriptedLieBand,
} from '../types/scriptedText'
import type { PartyId } from '../types'
import { normalizeCaseKey } from '../utils/caseHelpers'

// 캐시: caseId → bundle
const bundleCache = new Map<string, ScriptedTextBundle>()

// 최근 사용 스크립트 ID 추적 (반복 방지)
const recentScriptIds = new Map<string, string[]>()  // caseId → 최근 사용 variant IDs
const recentScriptContexts = new Map<string, SelectedScriptContext[]>() // caseId → 최근 선택된 메타

const MAX_RECENT = 20
const MAX_CONTEXT = 12

interface VariantTagMap {
  [key: string]: string
}

interface SelectedScriptContext {
  variantId: string
  key: string
  channel: 'interrogation' | 'evidence_present' | 'dossier' | 'witness' | 'aftermath'
  speaker?: string
  emotion?: string
  continuity?: string
  reveal?: string
  questionType?: string
  disputeId?: string
  evidenceId?: string
  witnessId?: string
}

interface VariantSelectionContext {
  key: string
  channel: SelectedScriptContext['channel']
  questionType?: string
  disputeId?: string
  evidenceId?: string
  witnessId?: string
}

type ScriptedLookupChannel = SelectedScriptContext['channel']

// Vite dynamic import — 빌드 시 정적 분석됨
const scriptMods = import.meta.glob<true, string, { default?: ScriptedTextBundle }>(
  '../data/scriptedText/*.json',
  { eager: true },
)

/** case bundle load (동기 — eager glob 사용) */
function loadBundle(caseId: string): ScriptedTextBundle | null {
  const normalizedId = normalizeCaseKey(caseId)
  if (bundleCache.has(normalizedId)) return bundleCache.get(normalizedId)!
  if (bundleCache.has(caseId)) return bundleCache.get(caseId)!

  const candidateIds = [...new Set([normalizedId, caseId].filter(Boolean))]
  for (const candidateId of candidateIds) {
    const path = `../data/scriptedText/${candidateId}.json`
    const mod = scriptMods[path]
    if (!mod) continue
    const bundle = ((mod as any).default ?? mod) as ScriptedTextBundle
    if (bundle.schemaVersion !== 1) return null
    bundleCache.set(normalizedId, bundle)
    bundleCache.set(candidateId, bundle)
    return bundle
  }
  return null
}

export function hasScriptedTextBundle(caseId: string): boolean {
  const normalizedId = normalizeCaseKey(caseId)
  return Boolean(scriptMods[`../data/scriptedText/${normalizedId}.json`] || scriptMods[`../data/scriptedText/${caseId}.json`])
}

function parseTags(tags?: string[]): VariantTagMap {
  const map: VariantTagMap = {}
  for (const raw of tags || []) {
    const idx = raw.indexOf(':')
    if (idx <= 0) continue
    const key = raw.slice(0, idx)
    const value = raw.slice(idx + 1)
    map[key] = value
  }
  return map
}

function getRecentContexts(caseId: string): SelectedScriptContext[] {
  return recentScriptContexts.get(caseId) ?? []
}

function rememberVariant(caseId: string, variant: ScriptedVariant, context: VariantSelectionContext): void {
  const recent = recentScriptIds.get(caseId) ?? []
  recentScriptIds.set(caseId, [...recent, variant.id].slice(-MAX_RECENT))

  const tagMap = parseTags(variant.tags)
  const history = getRecentContexts(caseId)
  const snapshot: SelectedScriptContext = {
    variantId: variant.id,
    key: context.key,
    channel: context.channel,
    speaker: tagMap.speaker,
    emotion: tagMap.emotion,
    continuity: tagMap.continuity,
    reveal: tagMap.reveal,
    questionType: context.questionType || tagMap.questionType,
    disputeId: context.disputeId,
    evidenceId: context.evidenceId,
    witnessId: context.witnessId,
  }
  recentScriptContexts.set(caseId, [...history, snapshot].slice(-MAX_CONTEXT))
}

function continuityMatches(previous?: string, current?: string): boolean {
  if (!previous || !current) return false
  if (previous === current) return true
  const preferredNext: Record<string, string[]> = {
    opening_guard: ['opening_pressure', 'surface'],
    opening_pressure: ['partial_slip', 'surface'],
    surface: ['surface', 'partial_slip'],
    partial_slip: ['counter_blame', 'confession_pivot', 'partial_slip'],
    counter_blame: ['counter_blame', 'confession_pivot'],
    confession_pivot: ['confession_pivot'],
    surface_scope: ['surface_scope', 'clarify_scope'],
  }
  return (preferredNext[previous] || []).includes(current)
}

function revealDistance(previous?: string, current?: string): number {
  const rank: Record<string, number> = { none: 0, hint: 1, partial: 2, full: 3 }
  if (!previous || !current) return 0
  return Math.abs((rank[previous] ?? 0) - (rank[current] ?? 0))
}

function scoreVariant(
  variant: ScriptedVariant,
  caseId: string,
  context: VariantSelectionContext,
): number {
  let score = 0
  const recentIds = recentScriptIds.get(caseId) ?? []
  const history = getRecentContexts(caseId)
  const last = history[history.length - 1]
  const recentWindow = history.slice(-3)
  const tags = parseTags(variant.tags)

  if (!recentIds.includes(variant.id)) score += 10
  else score -= recentIds.lastIndexOf(variant.id) === recentIds.length - 1 ? 6 : 2

  if (!last) return score

  if (last.channel === context.channel) score += 2
  if (last.speaker && tags.speaker && last.speaker === tags.speaker) score += 2
  if (continuityMatches(last.continuity, tags.continuity)) score += 3
  if (last.emotion && tags.emotion && last.emotion === tags.emotion) score += 1

  const revealGap = revealDistance(last.reveal, tags.reveal)
  if (revealGap === 0) score += 1
  else if (revealGap === 1) score += 0.5
  else score -= 1

  if (context.disputeId && last.disputeId && context.disputeId === last.disputeId) score += 2
  if (context.evidenceId && last.evidenceId && context.evidenceId === last.evidenceId) score += 2
  if (context.witnessId && last.witnessId && context.witnessId === last.witnessId) score += 2
  if (context.questionType && last.questionType && context.questionType === last.questionType) score += 1
  if (last.key === context.key) score -= 1

  const repeatedEmotion = tags.emotion
    ? recentWindow.filter((item) => item.emotion && item.emotion === tags.emotion).length
    : 0
  const repeatedContinuity = tags.continuity
    ? recentWindow.filter((item) => item.continuity && item.continuity === tags.continuity).length
    : 0
  const repeatedReveal = tags.reveal
    ? recentWindow.filter((item) => item.reveal && item.reveal === tags.reveal).length
    : 0

  if (repeatedEmotion >= 2) score -= 2
  else if (repeatedEmotion === 1) score -= 0.5

  if (repeatedContinuity >= 2) score -= 2.5
  else if (repeatedContinuity === 1) score -= 0.5

  if (last.key === context.key && tags.reveal && last.reveal && tags.reveal === last.reveal) score -= 1.5
  if (repeatedReveal >= 3) score -= 1

  const sameLaneRecent = recentWindow.filter((item) =>
    (context.disputeId && item.disputeId === context.disputeId) ||
    (context.evidenceId && item.evidenceId === context.evidenceId) ||
    (context.witnessId && item.witnessId === context.witnessId),
  )
  if (sameLaneRecent.length >= 2 && tags.continuity && sameLaneRecent.some((item) => item.continuity === tags.continuity)) {
    score -= 1
  }

  return score
}

/** variant 선택: 최근 사용 회피 + 직전 턴 맥락 가중 */
function selectVariant(
  variants: ScriptedVariant[],
  caseId: string,
  context: VariantSelectionContext,
): ScriptedVariant | null {
  if (!variants.length) return null
  const scored = variants.map((variant, index) => ({
    variant,
    index,
    score: scoreVariant(variant, caseId, context),
  }))
  const maxScore = Math.max(...scored.map((item) => item.score))
  const pool = scored.filter((item) => item.score === maxScore)
  const selected = pool[Math.floor(Math.random() * pool.length)]?.variant ?? variants[0]
  rememberVariant(caseId, selected, context)
  return selected
}

function logScriptedHit(caseId: string, channel: ScriptedLookupChannel, key: string): void {
  console.log(`[Scripted] ${normalizeCaseKey(caseId)}/${channel}/${key}`)
}

function logScriptedMiss(
  caseId: string,
  channel: ScriptedLookupChannel,
  key: string,
  reason: 'bundle_missing' | 'key_missing' | 'variant_missing',
): void {
  console.warn(`[Scripted miss] ${normalizeCaseKey(caseId)}/${channel}/${key} — ${reason}`)
}

/** 심문 응답 스크립트 조회 */
export function getScriptedInterrogation(
  caseId: string,
  party: PartyId,
  disputeId: string,
  lieState: string,
  questionType: string,
): { text: string; behaviorHint: string } | null {
  const key = buildInterrogationKey({
    party,
    disputeId,
    lieState: lieState as ScriptedLieState,
    questionType: questionType as ScriptedInterrogationQuestionType,
  })
  const bundle = loadBundle(caseId)
  if (!bundle) {
    logScriptedMiss(caseId, 'interrogation', key, 'bundle_missing')
    return null
  }
  const entry = bundle.channels.interrogation.entries.find(e => e.key === key)
  if (!entry) {
    logScriptedMiss(caseId, 'interrogation', key, 'key_missing')
    return null
  }
  const variant = selectVariant(entry.variants, caseId, {
    channel: 'interrogation',
    key,
    questionType,
    disputeId,
  })
  if (!variant) {
    logScriptedMiss(caseId, 'interrogation', key, 'variant_missing')
    return null
  }
  logScriptedHit(caseId, 'interrogation', key)
  return { text: variant.text, behaviorHint: variant.behaviorHint }
}

/** 증거 제시 응답 스크립트 조회 */
export function getScriptedEvidencePresent(
  caseId: string,
  party: PartyId,
  evidenceId: string,
  lieState: string,
  subjectRole: string,
): { text: string; behaviorHint: string } | null {
  const lieBand = toScriptedLieBand(lieState as ScriptedLieState)
  const key = buildEvidencePresentKey({
    party,
    evidenceId,
    lieBand,
    subjectRole: subjectRole as ScriptedSubjectRole,
  })
  const bundle = loadBundle(caseId)
  if (!bundle) {
    logScriptedMiss(caseId, 'evidence_present', key, 'bundle_missing')
    return null
  }
  const entry = bundle.channels.evidence_present.entries.find(e => e.key === key)
  if (!entry) {
    logScriptedMiss(caseId, 'evidence_present', key, 'key_missing')
    return null
  }
  const variant = selectVariant(entry.variants, caseId, {
    channel: 'evidence_present',
    key,
    evidenceId,
  })
  if (!variant) {
    logScriptedMiss(caseId, 'evidence_present', key, 'variant_missing')
    return null
  }
  logScriptedHit(caseId, 'evidence_present', key)
  return { text: variant.text, behaviorHint: variant.behaviorHint }
}

/** 도시어 응답 스크립트 조회 */
export function getScriptedDossier(
  caseId: string,
  party: PartyId,
  dossierQuestionId: string,
  lieState: string,
): { text: string; behaviorHint: string } | null {
  const lieBand = toScriptedLieBand(lieState as ScriptedLieState)
  const key = buildDossierKey({ party, dossierQuestionId, lieBand })
  const bundle = loadBundle(caseId)
  if (!bundle) {
    logScriptedMiss(caseId, 'dossier', key, 'bundle_missing')
    return null
  }
  const entry = bundle.channels.dossier.entries.find(e => e.key === key)
  if (!entry) {
    logScriptedMiss(caseId, 'dossier', key, 'key_missing')
    return null
  }
  const variant = selectVariant(entry.variants, caseId, {
    channel: 'dossier',
    key,
  })
  if (!variant) {
    logScriptedMiss(caseId, 'dossier', key, 'variant_missing')
    return null
  }
  logScriptedHit(caseId, 'dossier', key)
  return { text: variant.text, behaviorHint: variant.behaviorHint }
}

/** 증인 증언 스크립트 조회 */
export function getScriptedWitness(
  caseId: string,
  witnessId: string,
  depth: string,
): { text: string; behaviorHint: string } | null {
  const key = buildWitnessKey({ witnessId, depth: depth as ScriptedWitnessDepth })
  const bundle = loadBundle(caseId)
  if (!bundle) {
    logScriptedMiss(caseId, 'witness', key, 'bundle_missing')
    return null
  }
  const entry = bundle.channels.witness.entries.find(e => e.key === key)
  if (!entry) {
    logScriptedMiss(caseId, 'witness', key, 'key_missing')
    return null
  }
  const variant = selectVariant(entry.variants, caseId, {
    channel: 'witness',
    key,
    witnessId,
  })
  if (!variant) {
    logScriptedMiss(caseId, 'witness', key, 'variant_missing')
    return null
  }
  logScriptedHit(caseId, 'witness', key)
  return { text: variant.text, behaviorHint: variant.behaviorHint }
}

/** 후일담 스크립트 조회 */
export function getScriptedAftermath(
  caseId: string,
  resultClass: string,
): { text: string } | null {
  const bundle = loadBundle(caseId)
  if (!bundle) {
    logScriptedMiss(caseId, 'aftermath', resultClass, 'bundle_missing')
    return null
  }
  const entry = bundle.channels.aftermath.entries.find(e => e.key === resultClass)
  if (!entry) {
    logScriptedMiss(caseId, 'aftermath', resultClass, 'key_missing')
    return null
  }
  const variant = selectVariant(entry.variants, caseId, {
    channel: 'aftermath',
    key: resultClass,
  })
  if (!variant) {
    logScriptedMiss(caseId, 'aftermath', resultClass, 'variant_missing')
    return null
  }
  logScriptedHit(caseId, 'aftermath', resultClass)
  return { text: variant.text }
}

/** 번들 존재 여부 체크 (동기) */
export function hasScriptedBundle(caseId: string): boolean {
  const normalizedId = normalizeCaseKey(caseId)
  if (bundleCache.has(normalizedId) || bundleCache.has(caseId)) return true
  const normalizedPath = `../data/scriptedText/${normalizedId}.json`
  if (normalizedPath in scriptMods) return true
  const rawPath = `../data/scriptedText/${caseId}.json`
  return rawPath in scriptMods
}

/** 캐시 클리어 */
export function clearScriptedCache(): void {
  bundleCache.clear()
  recentScriptIds.clear()
  recentScriptContexts.clear()
}
