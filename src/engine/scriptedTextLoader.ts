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
import { GENERAL_QUESTION_ANGLE } from './questionAngleEngine'
import {
  getScriptedAngleAnswerLookup,
  getScriptedAngleJudgeQuestionOptions,
  getScriptedAngleJudgeQuestionVariants,
} from './scriptedAngleTextLoader.ts'
import { getStageAwareEvidencePresent } from '../data/evidencePresentationScripts'
import type { LocaleCode } from '../i18n/locales'
import { getRuntimeScriptLocale } from '../i18n/scriptLocale.ts'
import type { UnsafeAny } from '../types/lint'


// 캐시: caseId → bundle
const bundleCache = new Map<string, ScriptedTextBundle>()

// 최근 사용 스크립트 ID 추적 (반복 방지)
const recentScriptIds = new Map<string, string[]>()  // caseId → 최근 사용 variant IDs
const recentScriptContexts = new Map<string, SelectedScriptContext[]>() // caseId → 최근 선택된 메타

const MAX_RECENT = 20
const MAX_CONTEXT = 12

function toEvidencePresentLieBand(lieState: ScriptedLieState): ScriptedLieBand {
  // S4는 "거의 무너짐"이지 완전 자백은 아니다. 증거 제시 응답의 full reveal은 S5에서만 쓴다.
  // S0-S2 still deny, S3-S4 only partially yield, and only S5 fully opens.
  if (lieState === 'S0' || lieState === 'S1' || lieState === 'S2') return 'early'
  if (lieState === 'S3' || lieState === 'S4') return 'mid'
  return 'late'
}

interface VariantTagMap {
  [key: string]: string
}

interface SelectedScriptContext {
  variantId: string
  key: string
  channel: 'interrogation' | 'evidence_present' | 'dossier' | 'witness' | 'aftermath' | 'judge_question' | 'judge_contradiction'
  speaker?: string
  emotion?: string
  continuity?: string
  reveal?: string
  answerAngle?: string
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
  evidenceQuestionTerms?: string[]
  witnessId?: string
  archetype?: string
  emotion?: string
  /** [B1·B2 픽스] 호명 라우팅 — judge_question 등 발화의 대상 당사자 */
  targetParty?: 'a' | 'b'
  preferredAnswerAngles?: string[]
}

type ScriptedLookupChannel = SelectedScriptContext['channel']

export interface ScriptedJudgeQuestionOption {
  id: string
  text: string
  behaviorHint: string
  answerAngle: string
  disputeId: string
  questionType: string
  depth: number
  targetParty?: PartyId
}

// Vite dynamic import — eager 로드 (불필요 파일은 _archive로 이동하여 3개만 로드)
const scriptModsLazy = import.meta.glob<true, string, { default?: unknown }>(
  '../data/scriptedText/*.json',
  { eager: true },
)

/** case bundle load (동기 — eager glob 사용) */
function loadBundle(caseId: string, locale: LocaleCode = getRuntimeScriptLocale()): ScriptedTextBundle | null {
  const normalizedId = normalizeCaseKey(caseId)
  const cacheKey = `${normalizedId}:${locale}`
  const rawCacheKey = `${caseId}:${locale}`
  if (bundleCache.has(cacheKey)) return bundleCache.get(cacheKey)!
  if (bundleCache.has(rawCacheKey)) return bundleCache.get(rawCacheKey)!

  const candidateIds = [...new Set([normalizedId, caseId].filter(Boolean))]
  for (const candidateId of candidateIds) {
    const bundle = readScriptedTextModule(`../data/scriptedText/${candidateId}.json`)
    if (!bundle) continue
    if (bundle.schemaVersion !== 1) return null
    const overlay = locale === 'ko'
      ? null
      : readScriptedTextModule(`../data/scriptedText/${candidateId}.${locale}.json`)
    const localizedBundle = overlay ? mergeScriptedTextBundle(bundle, overlay) : bundle
    bundleCache.set(cacheKey, localizedBundle)
    bundleCache.set(rawCacheKey, localizedBundle)
    return localizedBundle
  }
  return null
}

function readScriptedTextModule(path: string): ScriptedTextBundle | null {
  const mod = scriptModsLazy[path]
  const bundle = ((mod as UnsafeAny)?.default ?? mod) as ScriptedTextBundle | null | undefined
  if (!bundle || typeof bundle !== 'object') return null
  return bundle
}

function mergeScriptedTextBundle(base: ScriptedTextBundle, overlay: Partial<ScriptedTextBundle>): ScriptedTextBundle {
  const merged = cloneJson(base)
  const overlayChannels = (overlay as UnsafeAny).channels ?? {}
  for (const [channelName, overlayChannel] of Object.entries<UnsafeAny>(overlayChannels)) {
    const targetChannel = (merged.channels as UnsafeAny)[channelName]
    if (!targetChannel?.entries || !Array.isArray(overlayChannel?.entries)) continue
    mergeChannelEntries(targetChannel.entries, overlayChannel.entries)
  }
  return merged
}

function mergeChannelEntries(targetEntries: UnsafeAny[], overlayEntries: UnsafeAny[]): void {
  const targetByKey = new Map(targetEntries.map((entry) => [entry.key, entry]))
  for (const overlayEntry of overlayEntries) {
    const targetEntry = targetByKey.get(overlayEntry.key)
    if (!targetEntry || !Array.isArray(overlayEntry.variants)) continue
    mergeVariantTexts(targetEntry.variants ?? [], overlayEntry.variants)
  }
}

function mergeVariantTexts(targetVariants: ScriptedVariant[], overlayVariants: Array<Partial<ScriptedVariant> & { id?: string }>): void {
  const targetById = new Map(targetVariants.map((variant) => [variant.id, variant]))
  for (const overlayVariant of overlayVariants) {
    if (!overlayVariant.id) continue
    const target = targetById.get(overlayVariant.id)
    if (!target) continue
    if (hasText(overlayVariant.text)) target.text = overlayVariant.text
    if (hasText(overlayVariant.behaviorHint)) target.behaviorHint = overlayVariant.behaviorHint
  }
}

function hasText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

/** 사건 선택 시 미리 로드 (호환용 — eager이므로 즉시 완료) */
export async function preloadScriptedTextBundle(caseId: string): Promise<void> {
  loadBundle(caseId)
}

export function hasScriptedTextBundle(caseId: string): boolean {
  const normalizedId = normalizeCaseKey(caseId)
  return Boolean(scriptModsLazy[`../data/scriptedText/${normalizedId}.json`] || scriptModsLazy[`../data/scriptedText/${caseId}.json`])
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
    answerAngle: tagMap.answerAngle || tagMap.angleTag,
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

  // [B1·B2 픽스] 호명 라우팅 강제 필터 — judge_question 등에서
  // tags.targetParty와 호출자 context.targetParty가 다르면 사실상 제외.
  // 박지연 추궁 시 "이준호 씨, ~" 변종이 무차별 선택되는 결함 차단.
  if (tags.targetParty && context.targetParty) {
    if (tags.targetParty !== context.targetParty) return -1000
    score += 30 // 강한 선호 — 일치 변종 우선 채택
  }

  if (!recentIds.includes(variant.id)) score += 10
  else score -= recentIds.lastIndexOf(variant.id) === recentIds.length - 1 ? 6 : 2

  if (context.channel === 'evidence_present' && context.evidenceQuestionTerms?.length) {
    const haystack = `${variant.text} ${variant.behaviorHint ?? ''} ${(variant.tags ?? []).join(' ')}`
      .replace(/\s+/g, ' ')
    const matchedTerms = context.evidenceQuestionTerms.filter((term) => haystack.includes(term))
    score += matchedTerms.length * 16
    if (matchedTerms.length === 0) score -= 8
  }

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
  if (context.channel === 'interrogation' && context.preferredAnswerAngles?.length) {
    const angle = tags.answerAngle || tags.angleTag
    if (angle && context.preferredAnswerAngles.includes(angle)) score += 28
    else if (angle) score -= 4
  }
  if (
    context.channel === 'interrogation' &&
    last.channel === 'judge_question' &&
    context.disputeId && last.disputeId === context.disputeId &&
    context.questionType && last.questionType === context.questionType &&
    last.answerAngle
  ) {
    if (tags.answerAngle === last.answerAngle || tags.angleTag === last.answerAngle) score += 24
    else if (tags.answerAngle || tags.angleTag) score -= 3
  }
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

  // ── v1~v5 변주 가중치 (archetype/emotion) ──
  const vid = variant.id as string
  const vMatch = vid.match(/-(v[1-5])$/)
  const bareVid = vMatch ? vMatch[1] : vid
  if (bareVid.startsWith('v') && bareVid.length === 2) {
    const archetypePrefs: Record<string, string[]> = {
      avoidant: ['v2', 'v5', 'v4', 'v1', 'v3'],
      confrontational: ['v3', 'v1', 'v4', 'v2', 'v5'],
      victim_cosplay: ['v4', 'v2', 'v5', 'v1', 'v3'],
      cold_logic: ['v1', 'v3', 'v4', 'v2', 'v5'],
      affect_flattening: ['v2', 'v1', 'v5', 'v4', 'v3'],
      premature_summary: ['v1', 'v4', 'v3', 'v2', 'v5'],
    }
    const emotionWeights: Record<string, Record<string, number>> = {
      calm: { v2: 1.5, v4: 1.3 },
      angry: { v3: 3, v1: 2 },
      cornered: { v5: 3, v4: 2 },
      ashamed: { v5: 3, v2: 1.5 },
      anxious: { v2: 2, v5: 2 },
      resigned: { v1: 2, v5: 2 },
    }

    // EmotionalPhase → 변주 emotion 매핑
    const phaseToEmotion: Record<string, string> = {
      defensive: 'anxious',
      confident: 'calm',
      shaken: 'cornered',
      angry: 'angry',
      resigned: 'resigned',
    }

    // archetype 선호도 반영
    const archetype = tags.archetype || context.archetype
    const prefs = archetype ? archetypePrefs[archetype] : undefined
    if (prefs) {
      const rank = prefs.indexOf(bareVid)
      if (rank >= 0) score += [4, 3, 2, 1, 0][rank]
    }

    // emotion 가중치 반영 (EmotionalPhase → 변주 emotion 매핑 적용)
    const rawEmotion = tags.emotion || context.emotion
    const emotion = rawEmotion ? (phaseToEmotion[rawEmotion] ?? rawEmotion) : undefined
    const ew = emotion ? emotionWeights[emotion] : undefined
    if (ew && ew[bareVid]) score += ew[bareVid]
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

  const explicitAngles = [...new Set((context.preferredAnswerAngles ?? []).filter(Boolean))]
  let explicitlyLockedVariants = variants
  if (context.channel === 'interrogation' && explicitAngles.length > 0) {
    const matched = variants.filter((variant) => {
      const tags = parseTags(variant.tags)
      const angle = tags.answerAngle || tags.angleTag
      return angle ? explicitAngles.includes(angle) : false
    })
    if (matched.length > 0) explicitlyLockedVariants = matched
  }

  const recentContexts = getRecentContexts(caseId)
  const lastContext = recentContexts[recentContexts.length - 1]
  const recentJudgeAngle = context.channel === 'interrogation' &&
    lastContext?.channel === 'judge_question' &&
    lastContext.disputeId === context.disputeId &&
    lastContext.questionType === context.questionType
    ? lastContext.answerAngle
    : undefined

  let angleLockedVariants = explicitlyLockedVariants
  if (recentJudgeAngle) {
    const matched = explicitlyLockedVariants.filter((variant) => {
      const tags = parseTags(variant.tags)
      return tags.answerAngle === recentJudgeAngle || tags.angleTag === recentJudgeAngle
    })
    if (matched.length > 0) angleLockedVariants = matched
  }

  // [기타1 픽스] hard block 완화 — 사용자 결정: "동일 답변 반복이 스포일러보다 나음"
  // 기존: variant 4개 이상이면 최근 3턴 hard block → 다음 변종이 강제 선택되며 점진적 진실 누설
  // 변경: hard block은 최근 1턴(직전)만 — score 패널티(-6/-2)로 자연스러운 다양성 확보
  let candidates = angleLockedVariants
  if (angleLockedVariants.length >= 2) {
    const recentIds = recentScriptIds.get(caseId) ?? []
    const lastUsed = recentIds[recentIds.length - 1]
    if (lastUsed) {
      const filtered = angleLockedVariants.filter(v => v.id !== lastUsed)
      if (filtered.length > 0) candidates = filtered
    }
  }

  const scored = candidates.map((variant, index) => ({
    variant,
    index,
    score: scoreVariant(variant, caseId, context),
  }))
  const maxScore = Math.max(...scored.map((item) => item.score))
  const pool = scored.filter((item) => item.score === maxScore)
  const selected = pool[Math.floor(Math.random() * pool.length)]?.variant ?? candidates[0]
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

function convertDossierLegacyPrefix(dossierQuestionId: string): string {
  if (!dossierQuestionId) return dossierQuestionId
  if (/^dossier-\d+/.test(dossierQuestionId)) {
    return dossierQuestionId.replace(/^dossier-(\d+)/, 'dc-$1')
  }
  if (/^dc-\d+/.test(dossierQuestionId)) {
    return dossierQuestionId.replace(/^dc-(\d+)/, 'dossier-$1')
  }
  return dossierQuestionId
}

function getDossierCandidateIds(dossierQuestionId: string): string[] {
  const seeds = [...new Set([
    dossierQuestionId,
    convertDossierLegacyPrefix(dossierQuestionId),
  ].filter(Boolean))]
  const candidates: string[] = []
  for (const seed of seeds) {
    const parts = seed.split('.')
    candidates.push(seed)
    if (parts.length >= 2) candidates.push(parts.slice(0, 2).join('.'))
    if (parts.length >= 1) candidates.push(parts[0])
  }
  return [...new Set(candidates.filter(Boolean))]
}

/** 심문 응답 스크립트 조회 */
export function getScriptedInterrogation(
  caseId: string,
  party: PartyId,
  disputeId: string,
  lieState: string,
  questionType: string,
  archetype?: string,
  emotion?: string,
  preferredAnswerAngles?: string[],
): { text: string; behaviorHint: string } | null {
  const normalizedCaseId = normalizeCaseKey(caseId)
  const key = buildInterrogationKey({
    party,
    disputeId,
    lieState: lieState as ScriptedLieState,
    questionType: questionType as ScriptedInterrogationQuestionType,
  })

  const recentContexts = getRecentContexts(normalizedCaseId)
  const lastContext = recentContexts[recentContexts.length - 1]
  const recentJudgeAngle = lastContext?.channel === 'judge_question' &&
    lastContext.disputeId === disputeId &&
    lastContext.questionType === questionType
    ? lastContext.answerAngle
    : undefined
  const anglePreferences = [...new Set([
    ...(preferredAnswerAngles ?? []),
    ...(recentJudgeAngle ? [recentJudgeAngle] : []),
  ].filter(Boolean))]

  const angleLookup = getScriptedAngleAnswerLookup({
    caseId: normalizedCaseId,
    party,
    disputeId,
    lieState,
    questionType,
    preferredAngles: anglePreferences,
  })
  if (angleLookup?.variants.length) {
    const variant = selectVariant(angleLookup.variants, normalizedCaseId, {
      channel: 'interrogation',
      key: angleLookup.key,
      archetype,
      emotion,
      questionType,
      disputeId,
      preferredAnswerAngles: anglePreferences.length > 0 ? anglePreferences : angleLookup.angleIds,
    })
    if (variant) {
      logScriptedHit(normalizedCaseId, 'interrogation', angleLookup.key)
      return { text: variant.text, behaviorHint: variant.behaviorHint }
    }
  }

  const bundle = loadBundle(caseId)
  if (!bundle) {
    logScriptedMiss(caseId, 'interrogation', key, 'bundle_missing')
    return null
  }
  let entry = bundle.channels.interrogation.entries.find(e => e.key === key)
  if (!entry) {
    // 해당 파티 키가 없으면 상대 파티 키로 폴백 시도
    const oppositeParty: PartyId = party === 'a' ? 'b' : 'a'
    const fallbackKey = buildInterrogationKey({
      party: oppositeParty,
      disputeId,
      lieState: lieState as ScriptedLieState,
      questionType: questionType as ScriptedInterrogationQuestionType,
    })
    entry = bundle.channels.interrogation.entries.find(e => e.key === fallbackKey)
    if (!entry) {
      logScriptedMiss(caseId, 'interrogation', key, 'key_missing')
      return null
    }
    logScriptedMiss(caseId, 'interrogation', key, 'key_missing')
  }
  const variant = selectVariant(entry.variants, caseId, {
    channel: 'interrogation',
    key,
    archetype,
    emotion,
    questionType,
    disputeId,
    preferredAnswerAngles: anglePreferences.length > 0 ? anglePreferences : preferredAnswerAngles,
  })
  if (!variant) {
    logScriptedMiss(caseId, 'interrogation', key, 'variant_missing')
    return null
  }
  logScriptedHit(caseId, 'interrogation', key)
  return { text: variant.text, behaviorHint: variant.behaviorHint }
}

function extractEvidenceQuestionTerms(questionText?: string): string[] {
  const text = (questionText ?? '').replace(/\s+/g, ' ').trim()
  if (!text) return []
  const candidates = [
    '참고서',
    '중학생',
    '중학교',
    '아이',
    '학생',
    '틴트',
    '머리끈',
    '헤어롤',
    '영수증',
    '품목',
    '물품',
    '통화',
    '오피스텔',
    'GPS',
    '위치',
    '문자',
    '메시지',
    '카톡',
    '단톡방',
    '아버지',
    '유서',
    '유언장',
    '공증',
    '연습본',
    '자필',
    '일기',
    '요양',
    '방문',
    '녹취록',
    '증언',
    '계좌',
    '송금',
    '출금',
    '입금',
  ]
  return candidates.filter((term) => text.includes(term))
}

/** 증거 제시 응답 스크립트 조회 */
export function getScriptedEvidencePresent(
  caseId: string,
  party: PartyId,
  evidenceId: string,
  lieState: string,
  subjectRole: string,
  questionText?: string,
  investigationStage?: number,
): { text: string; behaviorHint: string } | null {
  const lieBand = toEvidencePresentLieBand(lieState as ScriptedLieState)
  const normalizedCaseId = normalizeCaseKey(caseId)
  const stageAware = getStageAwareEvidencePresent({
    caseId: normalizedCaseId,
    party,
    evidenceId,
    lieBand,
    investigationStage,
  })
  if (stageAware) {
    logScriptedHit(caseId, 'evidence_present', `${party}|${evidenceId}|${lieBand}|stage${investigationStage ?? 1}`)
    return stageAware
  }
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
    evidenceQuestionTerms: extractEvidenceQuestionTerms(questionText),
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
  const bundle = loadBundle(caseId)
  if (!bundle) {
    const key = buildDossierKey({ party, dossierQuestionId, lieBand })
    logScriptedMiss(caseId, 'dossier', key, 'bundle_missing')
    return null
  }
  const candidateIds = getDossierCandidateIds(dossierQuestionId)
  let key = ''
  let entry: typeof bundle.channels.dossier.entries[number] | undefined
  for (const candidateId of candidateIds) {
    key = buildDossierKey({ party, dossierQuestionId: candidateId, lieBand })
    entry = bundle.channels.dossier.entries.find(e => e.key === key)
    if (entry) break
  }
  if (!entry) {
    key = buildDossierKey({ party, dossierQuestionId, lieBand })
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
  if (normalizedPath in scriptModsLazy) return true
  const rawPath = `../data/scriptedText/${caseId}.json`
  return rawPath in scriptModsLazy
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// V4 확장 채널 로더
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** 모순 추궁 응답 */
export function getScriptedContradictionPursuit(
  caseId: string, party: PartyId, disputeId: string, lieState: string,
): { text: string; behaviorHint: string } | null {
  const key = `${party}|${disputeId}|${lieState}`
  return getFromChannel(caseId, 'contradiction_pursuit', key)
}

/** 끼어들기 */
export function getScriptedInterjection(
  caseId: string, party: PartyId, disputeId: string, severity: 'minor' | 'major',
): { text: string; behaviorHint: string } | null {
  const key = `${party}|${disputeId}|${severity}`
  return getFromChannel(caseId, 'interjection', key)
}

/** 감정 과부하 */
export function getScriptedEmotionalOverload(
  caseId: string, party: PartyId, disputeId: string,
): { text: string; behaviorHint: string } | null {
  const key = `${party}|${disputeId}`
  return getFromChannel(caseId, 'emotional_overload', key)
}

/** 증거 발견 시퀀스 */
export function getScriptedEvidenceDiscovery(
  caseId: string, party: PartyId, evidenceId: string, step: 'probe' | 'slip' | 'capture' | 'confirm',
): { text: string; behaviorHint: string } | null {
  const key = `${party}|${evidenceId}|${step}`
  return getFromChannel(caseId, 'evidence_discovery', key)
}

/** 신뢰 행동 응답 */
export function getScriptedTrustAction(
  caseId: string, party: PartyId, actionType: string, lieState: string,
): { text: string; behaviorHint: string } | null {
  // 엔진 actionType → ScriptedText 키 매핑
  const shortType: Record<string, string> = {
    separation: 'separation',
    confidential_protection: 'confidential',
    immediate_answer: 'immediate',
  }
  const mapped = shortType[actionType] ?? actionType
  const key = `${party}|${mapped}|${lieState}`
  return getFromChannel(caseId, 'trust_action', key)
}

/** 중재 단계 대화 */
export function getScriptedMediation(
  caseId: string, party: PartyId, resultClass: string,
): { text: string; behaviorHint: string } | null {
  const key = `${party}|${resultClass}`
  return getFromChannel(caseId, 'mediation', key)
}

/** 재판관 심문 질문 (사건별)
 *  [B1·B2 픽스] target 인자 추가 — 호명 라우팅 강제 필터링용.
 *  scriptedTextLoader.scoreVariant가 tags.targetParty와 매칭. */
export function getScriptedJudgeQuestion(
  caseId: string, disputeId: string, questionType: string, depth: number, target?: 'a' | 'b',
): { text: string; behaviorHint: string } | null {
  const key = `${disputeId}|${questionType}|${depth}`
  const angleVariants = getScriptedAngleJudgeQuestionVariants({
    caseId: normalizeCaseKey(caseId),
    disputeId,
    questionType,
    target,
  })
  if (angleVariants.length > 0) {
    const generalVariants = angleVariants.filter((candidate) => {
      const tags = parseTags(candidate.tags)
      const angle = tags.answerAngle || tags.angleTag
      return angle === GENERAL_QUESTION_ANGLE
    })
    const pool = generalVariants.length > 0 ? generalVariants : angleVariants
    const variant = selectVariant(pool, normalizeCaseKey(caseId), {
      channel: 'judge_question',
      key,
      questionType,
      disputeId,
      targetParty: target,
    })
    if (variant) {
      logScriptedHit(caseId, 'judge_question', key)
      return { text: variant.text, behaviorHint: variant.behaviorHint }
    }
  }
  return getFromChannel(caseId, 'judge_question', key, { targetParty: target })
}

export function getScriptedJudgeQuestionOptions(
  caseId: string,
  disputeId: string,
  questionType: string,
  depth: number,
  target?: 'a' | 'b',
  options?: {
    allowedAngles?: string[]
    limit?: number
    seed?: number
    includeOtherDepths?: boolean
  },
): ScriptedJudgeQuestionOption[] {
  const angleOptions = getScriptedAngleJudgeQuestionOptions({
    caseId: normalizeCaseKey(caseId),
    disputeId,
    questionType,
    depth,
    target,
    allowedAngles: options?.allowedAngles,
    limit: options?.limit,
    seed: options?.seed,
  })
  if (angleOptions.length > 0) return angleOptions

  const bundle = loadBundle(caseId)
  const entries = (bundle?.channels as UnsafeAny)?.judge_question?.entries
  if (!Array.isArray(entries)) return []

  const limit = Math.max(1, options?.limit ?? 5)
  const normalizedDepth = Math.min(Math.max(depth || 1, 1), 5)
  const depthOrder = options?.includeOtherDepths === false
    ? [normalizedDepth]
    : [
        normalizedDepth,
        ...[1, 2, 3, 4, 5].filter((item) => item !== normalizedDepth),
      ]
  const allowedAngles = new Set((options?.allowedAngles ?? []).filter(Boolean))
  const allowByAngle = allowedAngles.size > 0
  const candidates: ScriptedJudgeQuestionOption[] = []

  for (const currentDepth of depthOrder) {
    for (const entry of entries) {
      if (entry?.disputeId !== disputeId) continue
      if (entry?.questionType !== questionType) continue
      if (Number(entry?.depth ?? 0) !== currentDepth) continue
      for (const variant of entry.variants ?? []) {
        const tags = parseTags(variant.tags)
        const targetParty = tags.targetParty as PartyId | undefined
        if (target && targetParty && targetParty !== target) continue
        const answerAngle = tags.answerAngle || tags.angleTag || GENERAL_QUESTION_ANGLE
        candidates.push({
          id: variant.id,
          text: variant.text,
          behaviorHint: variant.behaviorHint,
          answerAngle,
          disputeId,
          questionType,
          depth: currentDepth,
          targetParty,
        })
      }
    }
    if (candidates.length >= limit * 2) break
  }

  const filtered = allowByAngle
    ? candidates.filter((item) => item.answerAngle === GENERAL_QUESTION_ANGLE || allowedAngles.has(item.answerAngle))
    : candidates
  const effective = filtered.length >= Math.min(limit, candidates.length) ? filtered : candidates
  const deduped = dedupeQuestionOptions(effective)
  return shuffleQuestionOptions(deduped, options?.seed ?? 0).slice(0, limit)
}

/** 재판관 모순 추궁 질문 (사건별)
 *  target 인자 추가 — 호명 라우팅 (judgeQuestion과 동일 패턴, B1·B2 픽스 연동) */
export function getScriptedJudgeContradiction(
  caseId: string, disputeId: string, tone: string, target?: 'a' | 'b',
): { text: string; behaviorHint: string } | null {
  const key = `${disputeId}|${tone}`
  return getFromChannel(caseId, 'judge_contradiction', key, { targetParty: target })
}

/** 범용 채널 조회 헬퍼
 *  [B1·B2 픽스] extraContext 옵셔널 — targetParty 등 selector 가중치 제공 */
/**
 * Core narrative — emergence_narrative channel에서 variant id로 직접 entry 조회.
 *
 * 일반 channel은 key + variants 선택 패턴이지만, emergence_narrative는 시퀀스 entries라
 * variant.id로 직접 lookup. 한 emergence(예: e-5)의 17 variants 중 특정 id 반환.
 */
export function getEmergenceVariantById(
  caseId: string, evidenceId: string, variantId: string,
): { id: string; text: string; behaviorHint: string; tags: string[] } | null {
  const bundle = loadBundle(caseId)
  if (!bundle) return null
  const ch = (bundle.channels as UnsafeAny)['emergence_narrative']
  if (!ch?.entries) return null
  const entry = ch.entries.find(
    (e: UnsafeAny) => e.evidenceId === evidenceId || e.key === `emerge-${evidenceId}`,
  )
  if (!entry?.variants?.length) return null
  const variant = entry.variants.find((v: UnsafeAny) => v.id === variantId)
  if (!variant) return null
  return {
    id: variant.id,
    text: variant.text,
    behaviorHint: variant.behaviorHint ?? '',
    tags: Array.isArray(variant.tags) ? variant.tags : [],
  }
}

function getFromChannel(
  caseId: string, channel: string, key: string,
  extraContext?: Partial<VariantSelectionContext>,
): { text: string; behaviorHint: string } | null {
  const bundle = loadBundle(caseId)
  if (!bundle) return null
  const ch = (bundle.channels as UnsafeAny)[channel]
  if (!ch?.entries) return null
  const entry = ch.entries.find((e: UnsafeAny) => e.key === key)
  if (!entry?.variants?.length) return null
  const variant = selectVariant(entry.variants, caseId, { channel, key, ...(extraContext ?? {}) } as UnsafeAny)
  if (!variant) return null
  logScriptedHit(caseId, channel as UnsafeAny, key)
  return { text: variant.text, behaviorHint: variant.behaviorHint }
}

/** 캐시 클리어 */
function dedupeQuestionOptions(options: ScriptedJudgeQuestionOption[]): ScriptedJudgeQuestionOption[] {
  const seen = new Set<string>()
  const result: ScriptedJudgeQuestionOption[] = []
  for (const option of options) {
    const key = option.text.replace(/\s+/g, ' ').trim()
    if (!key || seen.has(key)) continue
    seen.add(key)
    result.push(option)
  }
  return result
}

function shuffleQuestionOptions(options: ScriptedJudgeQuestionOption[], seed: number): ScriptedJudgeQuestionOption[] {
  return [...options].sort((a, b) => {
    const scoreA = stableQuestionScore(`${seed}:${a.id}:${a.text}`)
    const scoreB = stableQuestionScore(`${seed}:${b.id}:${b.text}`)
    return scoreA - scoreB
  })
}

function stableQuestionScore(value: string): number {
  let hash = 2166136261
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

export function clearScriptedCache(): void {
  bundleCache.clear()
  recentScriptIds.clear()
  recentScriptContexts.clear()
}
