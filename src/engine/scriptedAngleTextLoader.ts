import type { PartyId } from '../types'
import type {
  ScriptedAngleAnswersBundle,
  ScriptedAngleCatalogBundle,
  ScriptedAngleDefinition,
  ScriptedAngleJudgeQuestionsBundle,
} from '../types/scriptedAngleText'
import type { ScriptedInterrogationQuestionType, ScriptedLieState, ScriptedVariant } from '../types/scriptedText'
import type { LocaleCode } from '../i18n/locales'
import { getRuntimeScriptLocale } from '../i18n/scriptLocale.ts'
import { normalizeCaseKey } from '../utils/caseHelpers.ts'

export const GENERAL_SCRIPTED_ANGLE = 'general'

interface RuntimeEvidenceState {
  unlocked?: boolean
  investigatedActions?: string[]
  presented?: boolean
}

export interface ScriptedAngleRuntimeContext {
  caseId: string
  disputeId: string
  evidenceStates?: Record<string, RuntimeEvidenceState>
  calledWitnesses?: string[]
}

export interface ScriptedAngleQuestionOption {
  id: string
  text: string
  behaviorHint: string
  answerAngle: string
  disputeId: string
  questionType: string
  depth: number
  targetParty?: PartyId
}

export interface ScriptedAngleAnswerLookup {
  key: string
  angleIds: string[]
  variants: ScriptedVariant[]
}

const angleMods = typeof (import.meta as ImportMeta & { glob?: ImportMeta['glob'] }).glob === 'function'
  ? import.meta.glob<true, string, { default?: unknown }>(
    '../data/scriptedAngles/*.json',
    { eager: true },
  ) : {}

const catalogMods = angleMods as Record<string, { default?: ScriptedAngleCatalogBundle }>
const judgeQuestionMods = angleMods as Record<string, { default?: ScriptedAngleJudgeQuestionsBundle }>
const answerMods = angleMods as Record<string, { default?: ScriptedAngleAnswersBundle }>

export function hasScriptedAngleData(caseId: string): boolean {
  const normalized = normalizeCaseKey(caseId)
  return Boolean(
    catalogMods[`../data/scriptedAngles/${normalized}_angle_catalog.json`] ||
    judgeQuestionMods[`../data/scriptedAngles/${normalized}_judge_questions.json`] ||
    answerMods[`../data/scriptedAngles/${normalized}_interrogation_answers.json`],
  )
}

export function getScriptedAngleCatalog(caseId: string): ScriptedAngleCatalogBundle | null {
  return readBundle(catalogMods, caseId, 'angle_catalog')
}

export function getScriptedAngleDefinitions(caseId: string, disputeId: string): ScriptedAngleDefinition[] {
  const catalog = getScriptedAngleCatalog(caseId)
  if (!catalog?.angles?.length) return []
  return catalog.angles.filter((angle) => angle.disputeId === disputeId)
}

export function getScriptedAngleLabel(caseId: string, disputeId: string, angleId?: string | null): string | null {
  if (!angleId) return null
  const found = getScriptedAngleDefinitions(caseId, disputeId).find((angle) => angle.angleId === angleId)
  return found?.label ?? null
}

export function getUnlockedScriptedAngleIds(context: ScriptedAngleRuntimeContext): string[] {
  const definitions = getScriptedAngleDefinitions(context.caseId, context.disputeId)
  if (!definitions.length) return []

  const unlocked = new Set<string>()
  for (const definition of definitions) {
    const condition = definition.unlockCondition
    const evidenceIds = condition?.evidenceIds ?? []
    const witnessIds = condition?.witnessIds ?? []
    const defaultUnlocked = definition.angleId === GENERAL_SCRIPTED_ANGLE || Boolean(condition?.defaultUnlocked)

    if (defaultUnlocked) {
      unlocked.add(definition.angleId)
      continue
    }

    const evidenceSatisfied = evidenceIds.some((id) => {
      const state = context.evidenceStates?.[id]
      return Boolean(state?.unlocked || state?.presented || (state?.investigatedActions?.length ?? 0) > 0)
    })
    const witnessSatisfied = witnessIds.some((id) => context.calledWitnesses?.includes(id))

    if (evidenceSatisfied || witnessSatisfied) unlocked.add(definition.angleId)
  }

  if (unlocked.size === 0 && definitions.some((definition) => definition.angleId === GENERAL_SCRIPTED_ANGLE)) {
    unlocked.add(GENERAL_SCRIPTED_ANGLE)
  }
  return [...unlocked]
}

export function classifyScriptedAnglesFromText(
  caseId: string,
  disputeId: string,
  rawText: string,
  evidenceRef?: string | null,
): string[] {
  const definitions = getScriptedAngleDefinitions(caseId, disputeId)
  if (!definitions.length) return []

  const normalizedText = normalizeText(rawText)
  const matches: string[] = []
  for (const definition of definitions) {
    if (definition.angleId === GENERAL_SCRIPTED_ANGLE) continue
    const evidenceIds = definition.unlockCondition?.evidenceIds ?? []
    if (evidenceRef && evidenceIds.includes(evidenceRef)) {
      matches.push(definition.angleId)
      continue
    }
    if ((definition.keywords ?? []).some((keyword) => normalizedText.includes(normalizeText(keyword)))) {
      matches.push(definition.angleId)
    }
  }

  return [...new Set(matches)]
}

export function getScriptedAngleJudgeQuestionOptions(input: {
  caseId: string
  disputeId: string
  questionType: string
  depth: number
  target?: PartyId
  allowedAngles?: string[]
  limit?: number
  seed?: number
}): ScriptedAngleQuestionOption[] {
  const bundle = readBundle(judgeQuestionMods, input.caseId, 'judge_questions')
  if (!bundle?.judgeQuestions?.length) return []

  const limit = Math.max(1, input.limit ?? 3)
  const allowed = new Set((input.allowedAngles ?? []).filter(Boolean))
  const restrictByAngle = allowed.size > 0
  const candidates: ScriptedAngleQuestionOption[] = []

  for (const entry of bundle.judgeQuestions) {
    if (entry.disputeId !== input.disputeId) continue
    if (entry.questionType !== input.questionType) continue
    if (input.target && entry.targetParty && entry.targetParty !== input.target) continue
    if (restrictByAngle && entry.angleId !== GENERAL_SCRIPTED_ANGLE && !allowed.has(entry.angleId)) continue

    for (const variant of entry.variants ?? []) {
      const tags = parseTags(variant.tags)
      const answerAngle = tags.answerAngle || entry.angleId || GENERAL_SCRIPTED_ANGLE
      if (restrictByAngle && answerAngle !== GENERAL_SCRIPTED_ANGLE && !allowed.has(answerAngle)) continue
      candidates.push({
        id: variant.id,
        text: variant.text,
        behaviorHint: variant.behaviorHint,
        answerAngle,
        disputeId: input.disputeId,
        questionType: input.questionType,
        depth: input.depth,
        targetParty: entry.targetParty ?? (tags.targetParty as PartyId | undefined),
      })
    }
  }

  return shuffleQuestionOptions(dedupeQuestionOptions(candidates), input.seed ?? 0).slice(0, limit)
}

export function getScriptedAngleJudgeQuestionVariants(input: {
  caseId: string
  disputeId: string
  questionType: string
  target?: PartyId
}): ScriptedVariant[] {
  const bundle = readBundle(judgeQuestionMods, input.caseId, 'judge_questions')
  if (!bundle?.judgeQuestions?.length) return []

  const variants: ScriptedVariant[] = []
  for (const entry of bundle.judgeQuestions) {
    if (entry.disputeId !== input.disputeId) continue
    if (entry.questionType !== input.questionType) continue
    if (input.target && entry.targetParty && entry.targetParty !== input.target) continue
    variants.push(...(entry.variants ?? []))
  }
  return variants
}

export function getScriptedAngleAnswerLookup(input: {
  caseId: string
  party: PartyId
  disputeId: string
  lieState: string
  questionType: string
  preferredAngles?: string[]
}): ScriptedAngleAnswerLookup | null {
  const bundle = readBundle(answerMods, input.caseId, 'interrogation_answers')
  if (!bundle?.answers?.length) return null

  const exact = bundle.answers.filter((entry) =>
    entry.party === input.party &&
    entry.disputeId === input.disputeId &&
    entry.lieState === input.lieState &&
    entry.questionType === input.questionType,
  )
  if (!exact.length) return null

  const preferred = [...new Set((input.preferredAngles ?? []).filter(Boolean))]
  const priority = preferred.length > 0 ? preferred : [GENERAL_SCRIPTED_ANGLE]
  const selected: typeof exact = []

  for (const angleId of priority) {
    selected.push(...exact.filter((entry) => entry.angleId === angleId))
  }
  if (!selected.length && !priority.includes(GENERAL_SCRIPTED_ANGLE)) {
    selected.push(...exact.filter((entry) => entry.angleId === GENERAL_SCRIPTED_ANGLE))
  }
  if (!selected.length && preferred.length === 0) {
    selected.push(...exact)
  }
  if (!selected.length) return null

  return {
    key: [
      input.party,
      input.disputeId,
      input.lieState as ScriptedLieState,
      input.questionType as ScriptedInterrogationQuestionType,
      selected.map((entry) => entry.angleId).join('+'),
    ].join('|'),
    angleIds: [...new Set(selected.map((entry) => entry.angleId))],
    variants: selected.flatMap((entry) => entry.variants ?? []),
  }
}

function readBundle<T extends { caseId: string }>(
  _mods: Record<string, { default?: T }>,
  caseId: string,
  suffix: string,
  locale: LocaleCode = getRuntimeScriptLocale(),
): T | null {
  const normalized = normalizeCaseKey(caseId)
  const base = readAngleModule<T>(`../data/scriptedAngles/${normalized}_${suffix}.json`)
  if (!base) return null
  const overlay = locale === 'ko'
    ? null
    : readAngleModule<Partial<T>>(`../data/scriptedAngles/${normalized}_${suffix}.${locale}.json`)
  return overlay ? mergeAngleBundle(base, overlay, suffix) : base
}

function readAngleModule<T>(path: string): T | null {
  const mod = angleMods[path]
  const bundle = ((mod as any)?.default ?? mod) as T | null | undefined
  if (!bundle || typeof bundle !== 'object') return null
  return bundle
}

function mergeAngleBundle<T extends { caseId: string }>(base: T, overlay: Partial<T>, suffix: string): T {
  const merged = cloneJson(base) as any
  const source = overlay as any
  if (suffix === 'angle_catalog') {
    mergeAngleCatalog(merged.angles ?? [], source.angles ?? [])
  } else if (suffix === 'judge_questions') {
    mergeAngleVariants(merged.judgeQuestions ?? [], source.judgeQuestions ?? [], angleJudgeKey)
  } else if (suffix === 'interrogation_answers') {
    mergeAngleVariants(merged.answers ?? [], source.answers ?? [], angleAnswerKey)
  }
  return merged as T
}

function mergeAngleCatalog(targetAngles: any[], overlayAngles: any[]): void {
  const targetByKey = new Map(targetAngles.map((angle) => [angleCatalogKey(angle), angle]))
  for (const overlayAngle of overlayAngles) {
    const target = targetByKey.get(angleCatalogKey(overlayAngle))
    if (!target) continue
    if (hasText(overlayAngle.label)) target.label = overlayAngle.label
    if (hasText(overlayAngle.description)) target.description = overlayAngle.description
    if (Array.isArray(overlayAngle.keywordsLocale)) target.keywordsLocale = overlayAngle.keywordsLocale
  }
}

function mergeAngleVariants(targetEntries: any[], overlayEntries: any[], makeKey: (entry: any) => string): void {
  const targetByKey = new Map(targetEntries.map((entry) => [makeKey(entry), entry]))
  for (const overlayEntry of overlayEntries) {
    const target = targetByKey.get(makeKey(overlayEntry))
    if (!target || !Array.isArray(overlayEntry.variants)) continue
    mergeVariantTexts(target.variants ?? [], overlayEntry.variants)
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

function angleCatalogKey(entry: { disputeId?: string; angleId?: string }): string {
  return [entry.disputeId ?? '', entry.angleId ?? ''].join('|')
}

function angleJudgeKey(entry: { disputeId?: string; questionType?: string; targetParty?: string; angleId?: string }): string {
  return [
    entry.disputeId ?? '',
    entry.questionType ?? '',
    entry.targetParty ?? '',
    entry.angleId ?? '',
  ].join('|')
}

function angleAnswerKey(entry: {
  party?: string
  disputeId?: string
  questionType?: string
  angleId?: string
  lieState?: string
  key?: string
}): string {
  return [
    entry.party ?? '',
    entry.disputeId ?? '',
    entry.questionType ?? '',
    entry.angleId ?? '',
    entry.lieState ?? '',
    entry.key ?? '',
  ].join('|')
}

function hasText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function parseTags(tags?: string[]): Record<string, string> {
  const result: Record<string, string> = {}
  for (const raw of tags ?? []) {
    const index = raw.indexOf(':')
    if (index <= 0) continue
    result[raw.slice(0, index)] = raw.slice(index + 1)
  }
  return result
}

function normalizeText(value: string): string {
  return value.toLowerCase().replace(/\s+/g, '')
}

function dedupeQuestionOptions(options: ScriptedAngleQuestionOption[]): ScriptedAngleQuestionOption[] {
  const seen = new Set<string>()
  const result: ScriptedAngleQuestionOption[] = []
  for (const option of options) {
    const key = option.text.replace(/\s+/g, ' ').trim()
    if (!key || seen.has(key)) continue
    seen.add(key)
    result.push(option)
  }
  return result
}

function shuffleQuestionOptions(options: ScriptedAngleQuestionOption[], seed: number): ScriptedAngleQuestionOption[] {
  return [...options].sort((a, b) => stableScore(`${seed}:${a.id}:${a.text}`) - stableScore(`${seed}:${b.id}:${b.text}`))
}

function stableScore(value: string): number {
  let hash = 2166136261
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}
