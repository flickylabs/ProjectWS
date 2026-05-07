#!/usr/bin/env node

const fs = require('node:fs')
const path = require('node:path')

const ROOT = path.resolve(__dirname, '..')
const ACTIVE_CASES = ['spouse-01', 'family-01', 'friend-01']
const SCRIPT_LOCALES = ['en', 'ja', 'zh-CN']
const ACTIVE_MEDIATION = {
  'spouse-01': 'spouse-v3-01',
  'family-01': 'family-v3-01',
  'friend-01': 'friend-v3-01',
}

const args = process.argv.slice(2)
const strict = args.includes('--strict')
const localeArg = readArg('--locale')
const locales = localeArg ? [normalizeLocale(localeArg)] : SCRIPT_LOCALES
const caseArg = readArg('--case') ?? readArg('--case-id')
const cases = caseArg ? [normalizeCaseId(caseArg)] : ACTIVE_CASES
const errors = []
const warnings = []
const stats = {
  policies: 0,
  sidecars: 0,
  checkedStrings: 0,
}
const localePolicies = new Map()
const publicBrandForbidden = {
  en: [/\bProject[ _-]?Solomon\b/i, /\bSolomon(?:'s)?(?:\s+Dilemma)?\b/i, /\bSolomon Court\b/i],
  ja: [/ソロモン法廷/],
  'zh-CN': [/所罗门/, /所羅門/],
}

for (const locale of locales) {
  if (!SCRIPT_LOCALES.includes(locale)) {
    fail(`Unsupported locale "${locale}". Expected one of ${SCRIPT_LOCALES.join(', ')}`)
  }
}

for (const caseId of cases) {
  if (!ACTIVE_CASES.includes(caseId)) {
    fail(`Unsupported case "${caseId}". Expected one of ${ACTIVE_CASES.join(', ')}`)
  }
  validateLocalePolicy(caseId)
  for (const locale of locales) {
    validateScriptedTextOverlay(caseId, locale)
    validateAngleOverlay(caseId, locale, 'angle_catalog')
    validateAngleOverlay(caseId, locale, 'judge_questions')
    validateAngleOverlay(caseId, locale, 'interrogation_answers')
    validateDialogueOverlay(caseId, locale)
    validateMediationOverlay(caseId, ACTIVE_MEDIATION[caseId], locale)
    validateGeneratedCaseOverlay(caseId, locale)
  }
}

for (const warning of warnings) console.warn(`warning: ${warning}`)
if (errors.length > 0) {
  for (const error of errors) console.error(`error: ${error}`)
  process.exitCode = 1
} else {
  console.log(
    `script locale validation ok: policies=${stats.policies}, sidecars=${stats.sidecars}, strings=${stats.checkedStrings}, locales=${locales.join(',')}, strict=${strict ? 'yes' : 'no'}`,
  )
}

function validateLocalePolicy(caseId) {
  const policyPath = `src/data/disclosurePolicy/${caseId}.json`
  const policy = readJson(policyPath)
  const localePolicy = policy.localePolicy
  stats.policies += 1
  if (!localePolicy || typeof localePolicy !== 'object') {
    addError(`${policyPath}: missing localePolicy`)
    return
  }
  localePolicies.set(caseId, localePolicy)
  if (localePolicy.status === 'scaffold') {
    addError(`${policyPath}: localePolicy.status must be promoted before bulk script localization`)
  }
  for (const locale of SCRIPT_LOCALES) {
    if (!Array.isArray(localePolicy.forbiddenLexemes?.[locale])) {
      addError(`${policyPath}: localePolicy.forbiddenLexemes.${locale} must be an array`)
    } else if (localePolicy.forbiddenLexemes[locale].length === 0) {
      addError(`${policyPath}: localePolicy.forbiddenLexemes.${locale} must be populated before bulk script localization`)
    }
    if (!Array.isArray(localePolicy.paraphraseLexemes?.[locale])) {
      addError(`${policyPath}: localePolicy.paraphraseLexemes.${locale} must be an array`)
    } else if (localePolicy.paraphraseLexemes[locale].length === 0) {
      addError(`${policyPath}: localePolicy.paraphraseLexemes.${locale} must be populated before bulk script localization`)
    }
    if (!isPlainObject(localePolicy.uiSurfaceMap?.[locale])) {
      addError(`${policyPath}: localePolicy.uiSurfaceMap.${locale} must be an object`)
    } else if (Object.keys(localePolicy.uiSurfaceMap[locale]).length === 0) {
      addError(`${policyPath}: localePolicy.uiSurfaceMap.${locale} must be populated before bulk script localization`)
    }
  }
}

function validateScriptedTextOverlay(caseId, locale) {
  const basePath = `src/data/scriptedText/${caseId}.json`
  const overlayPath = `src/data/scriptedText/${caseId}.${locale}.json`
  const overlay = readOptionalJson(overlayPath)
  if (!overlay) return warnMissing(overlayPath)

  const base = readJson(basePath)
  registerSidecar(overlayPath, overlay, locale, caseId)
  assertEqual(overlay.caseId, base.caseId, `${overlayPath}: caseId`)
  assertEqual(overlay.overlayKind, 'scriptedText', `${overlayPath}: overlayKind`)

  const baseIds = new Set()
  for (const [channelName, channel] of Object.entries(base.channels ?? {})) {
    for (const entry of channel.entries ?? []) {
      for (const variant of entry.variants ?? []) {
        baseIds.add(`${channelName}|${entry.key}|${variant.id}`)
      }
    }
  }

  const overlayIds = new Set()
  for (const [channelName, channel] of Object.entries(overlay.channels ?? {})) {
    for (const entry of channel.entries ?? []) {
      for (const variant of entry.variants ?? []) {
        const id = `${channelName}|${entry.key}|${variant.id}`
        overlayIds.add(id)
        if (!baseIds.has(id)) addError(`${overlayPath}: unknown scriptedText variant ${id}`)
        validateOptionalText(variant.text, `${overlayPath}:${id}`, locale, caseId, {
          channelName,
          truthStage: entry.lieState ?? variant.lieState,
        })
        validateOptionalText(variant.behaviorHint, `${overlayPath}:${id}:behaviorHint`, locale, caseId, {
          skipCaseLexemes: true,
        })
      }
    }
  }
  if (strict) assertFullCoverage(baseIds, overlayIds, overlayPath)
}

function validateAngleOverlay(caseId, locale, suffix) {
  const basePath = `src/data/scriptedAngles/${caseId}_${suffix}.json`
  const overlayPath = `src/data/scriptedAngles/${caseId}_${suffix}.${locale}.json`
  if (!fs.existsSync(abs(basePath))) return
  const overlay = readOptionalJson(overlayPath)
  if (!overlay) return warnMissing(overlayPath)

  const base = readJson(basePath)
  registerSidecar(overlayPath, overlay, locale, caseId)
  assertEqual(overlay.caseId, base.caseId, `${overlayPath}: caseId`)
  assertEqual(overlay.overlayKind, suffix, `${overlayPath}: overlayKind`)

  if (suffix === 'angle_catalog') {
    const baseIds = new Set((base.angles ?? []).map((item) => `${item.disputeId}|${item.angleId}`))
    const overlayIds = new Set()
    for (const angle of overlay.angles ?? []) {
      const id = `${angle.disputeId}|${angle.angleId}`
      overlayIds.add(id)
      if (!baseIds.has(id)) addError(`${overlayPath}: unknown angle ${id}`)
      validateOptionalText(angle.label, `${overlayPath}:${id}:label`, locale, caseId)
      validateOptionalText(angle.description, `${overlayPath}:${id}:description`, locale, caseId)
      if (angle.keywordsLocale && !Array.isArray(angle.keywordsLocale)) {
        addError(`${overlayPath}:${id}: keywordsLocale must be an array`)
      }
    }
    if (strict) assertFullCoverage(baseIds, overlayIds, overlayPath)
    return
  }

  if (suffix === 'judge_questions') {
    const baseIds = collectAngleVariantIds(base.judgeQuestions, angleJudgeKey)
    const overlayIds = collectAndValidateVariantIds(overlay.judgeQuestions, angleJudgeKey, overlayPath, locale, caseId)
    if (strict) assertFullCoverage(baseIds, overlayIds, overlayPath)
    return
  }

  if (suffix === 'interrogation_answers') {
    const baseIds = collectAngleVariantIds(base.answers, angleAnswerKey)
    const overlayIds = collectAndValidateVariantIds(overlay.answers, angleAnswerKey, overlayPath, locale, caseId)
    if (strict) assertFullCoverage(baseIds, overlayIds, overlayPath)
  }
}

function validateDialogueOverlay(caseId, locale) {
  const basePath = `src/data/dialogues/phase1/${caseId}.json`
  const overlayPath = `src/data/dialogues/phase1/${caseId}.${locale}.json`
  const overlay = readOptionalJson(overlayPath)
  if (!overlay) return warnMissing(overlayPath)

  const base = readJson(basePath)
  registerSidecar(overlayPath, overlay, locale, caseId)
  assertEqual(overlay.caseId, base.caseId, `${overlayPath}: caseId`)
  assertEqual(overlay.overlayKind, 'phase1Dialogue', `${overlayPath}: overlayKind`)

  const baseIds = new Set()
  for (const [index, dialogue] of (base.dialogues ?? []).entries()) {
    const dialogueId = dialogue.id ?? String(index)
    baseIds.add(`dialogue|${dialogueId}`)
    for (const [choiceIndex, choice] of getDialogueOptions(dialogue).entries()) {
      baseIds.add(`choice|${dialogueId}|${choice.id ?? String(choiceIndex)}`)
    }
  }

  const overlayIds = new Set()
  for (const dialogue of overlay.dialogues ?? []) {
    const dialogueId = dialogue.id
    overlayIds.add(`dialogue|${dialogueId}`)
    if (!baseIds.has(`dialogue|${dialogueId}`)) addError(`${overlayPath}: unknown dialogue ${dialogueId}`)
    validateOptionalText(dialogue.text, `${overlayPath}:dialogue:${dialogueId}`, locale, caseId)
    for (const choice of getDialogueOptions(dialogue)) {
      const choiceId = `choice|${dialogueId}|${choice.id}`
      overlayIds.add(choiceId)
      if (!baseIds.has(choiceId)) addError(`${overlayPath}: unknown choice ${choiceId}`)
      validateOptionalText(choice.text, `${overlayPath}:${choiceId}`, locale, caseId)
    }
  }
  if (strict) assertFullCoverage(baseIds, overlayIds, overlayPath)
}

function validateMediationOverlay(caseId, mediationId, locale) {
  const basePath = `src/data/dialogues/mediation/${mediationId}.json`
  const overlayPath = `src/data/dialogues/mediation/${mediationId}.${locale}.json`
  const overlay = readOptionalJson(overlayPath)
  if (!overlay) return warnMissing(overlayPath)

  const base = readJson(basePath)
  registerSidecar(overlayPath, overlay, locale, caseId)
  assertEqual(overlay.caseId, base.caseId, `${overlayPath}: caseId`)
  assertEqual(overlay.overlayKind, 'mediationDialogue', `${overlayPath}: overlayKind`)

  const baseIds = new Set()
  for (const [pathId, pathValue] of Object.entries(base.paths ?? {})) {
    baseIds.add(`judge|${pathId}`)
    for (const [index, dialogue] of (pathValue.dialogues ?? []).entries()) {
      baseIds.add(`dialogue|${pathId}|${dialogue.id ?? String(index)}`)
    }
  }

  const overlayIds = new Set()
  for (const [pathId, pathValue] of Object.entries(overlay.paths ?? {})) {
    overlayIds.add(`judge|${pathId}`)
    if (!baseIds.has(`judge|${pathId}`)) addError(`${overlayPath}: unknown path ${pathId}`)
    validateOptionalText(pathValue.judge, `${overlayPath}:judge:${pathId}`, locale, caseId)
    for (const dialogue of pathValue.dialogues ?? []) {
      const id = `dialogue|${pathId}|${dialogue.id}`
      overlayIds.add(id)
      if (!baseIds.has(id)) addError(`${overlayPath}: unknown mediation dialogue ${id}`)
      validateOptionalText(dialogue.text, `${overlayPath}:${id}`, locale, caseId)
    }
  }
  if (strict) assertFullCoverage(baseIds, overlayIds, overlayPath)
}

function validateGeneratedCaseOverlay(caseId, locale) {
  const overlayPath = `src/data/cases/generated/${caseId}.${locale}.json`
  const overlay = readOptionalJson(overlayPath)
  if (!overlay) return warnMissing(overlayPath)
  registerSidecar(overlayPath, overlay, locale, caseId)
  assertEqual(overlay.caseId, caseId, `${overlayPath}: caseId`)
  assertEqual(overlay.overlayKind, 'generatedCaseSurface', `${overlayPath}: overlayKind`)
  const isFullGeneratedCaseOverlay = overlay.overlayScope === 'full'
  walkStrings(overlay, (value, pointer) => validateOptionalText(value, `${overlayPath}:${pointer}`, locale, caseId, {
    skipCaseLexemes: isFullGeneratedCaseOverlay,
  }))
}

function collectAngleVariantIds(entries, makeKey) {
  const ids = new Set()
  for (const entry of entries ?? []) {
    const entryKey = makeKey(entry)
    for (const variant of entry.variants ?? []) ids.add(`${entryKey}|${variant.id}`)
  }
  return ids
}

function collectAndValidateVariantIds(entries, makeKey, overlayPath, locale, caseId) {
  const ids = new Set()
  for (const entry of entries ?? []) {
    const entryKey = makeKey(entry)
    for (const variant of entry.variants ?? []) {
      const id = `${entryKey}|${variant.id}`
      ids.add(id)
      validateOptionalText(variant.text, `${overlayPath}:${id}`, locale, caseId, {
        truthStage: entry.lieState ?? variant.lieState,
      })
      validateOptionalText(variant.behaviorHint, `${overlayPath}:${id}:behaviorHint`, locale, caseId, {
        skipCaseLexemes: true,
      })
    }
  }
  return ids
}

function angleJudgeKey(entry) {
  return [
    entry.disputeId,
    entry.questionType,
    entry.targetParty ?? '',
    entry.angleId,
  ].join('|')
}

function angleAnswerKey(entry) {
  return [
    entry.party,
    entry.disputeId,
    entry.questionType,
    entry.angleId,
    entry.lieState,
    entry.key ?? '',
  ].join('|')
}

function assertFullCoverage(baseIds, overlayIds, overlayPath) {
  for (const id of baseIds) {
    if (!overlayIds.has(id)) addError(`${overlayPath}: missing strict coverage for ${id}`)
  }
}

function registerSidecar(relativePath, overlay, locale, caseId) {
  stats.sidecars += 1
  if (overlay.locale) assertEqual(overlay.locale, locale, `${relativePath}: locale`)
  walkStrings(overlay, (value, pointer) => {
    validateOptionalText(value, `${relativePath}:${pointer}`, locale, caseId, { skipCaseLexemes: true })
  })
}

function validateOptionalText(value, label, locale, caseId, options = {}) {
  if (typeof value !== 'string' || value === '') return
  stats.checkedStrings += 1
  for (const pattern of publicBrandForbidden[locale] ?? []) {
    if (pattern.test(value)) {
      addError(`${label}: forbidden public brand literal in ${locale} text`)
    }
  }
  if (!options.skipCaseLexemes) validateCaseLexemes(value, label, locale, caseId, options)
}

function validateCaseLexemes(value, label, locale, caseId, options) {
  const localePolicy = localePolicies.get(caseId)
  if (!localePolicy || isTruthLexemeAllowed(options)) return

  for (const lexeme of localePolicy.forbiddenLexemes?.[locale] ?? []) {
    if (containsLexeme(value, lexeme, locale)) {
      addError(`${label}: forbidden ${caseId} truth lexeme before S5 in ${locale}: ${JSON.stringify(lexeme)}`)
    }
  }
  for (const lexeme of localePolicy.paraphraseLexemes?.[locale] ?? []) {
    if (containsLexeme(value, lexeme, locale)) {
      addError(`${label}: forbidden ${caseId} truth paraphrase before S5 in ${locale}: ${JSON.stringify(lexeme)}`)
    }
  }
}

function isTruthLexemeAllowed(options) {
  return options.truthStage === 'S5' || options.truthStage === 's5'
}

function containsLexeme(value, lexeme, locale) {
  if (typeof lexeme !== 'string' || lexeme.trim() === '') return false
  if (locale === 'en') return value.toLocaleLowerCase('en').includes(lexeme.toLocaleLowerCase('en'))
  return value.includes(lexeme)
}

function getDialogueOptions(entry) {
  if (Array.isArray(entry?.options)) return entry.options
  if (Array.isArray(entry?.choices)) return entry.choices
  return []
}

function walkStrings(value, visit, pointer = '$') {
  if (typeof value === 'string') {
    visit(value, pointer)
    return
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => walkStrings(item, visit, `${pointer}[${index}]`))
    return
  }
  if (isPlainObject(value)) {
    for (const [key, child] of Object.entries(value)) {
      walkStrings(child, visit, `${pointer}.${key}`)
    }
  }
}

function warnMissing(relativePath) {
  if (strict) addError(`${relativePath}: missing sidecar`)
  else warnings.push(`${relativePath}: missing sidecar; falling back to KO`)
}

function readArg(name) {
  const inline = args.find((arg) => arg.startsWith(`${name}=`))
  if (inline) return inline.slice(name.length + 1)
  const index = args.indexOf(name)
  if (index >= 0) return args[index + 1]
  return null
}

function normalizeLocale(value) {
  const normalized = String(value).replace('_', '-').toLowerCase()
  if (normalized === 'zh-cn' || normalized === 'zh') return 'zh-CN'
  if (normalized === 'en' || normalized === 'ja') return normalized
  return value
}

function normalizeCaseId(value) {
  return String(value).replace(/^case-/, '')
}

function readOptionalJson(relativePath) {
  const filePath = abs(relativePath)
  if (!fs.existsSync(filePath)) return null
  return readJson(relativePath)
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(abs(relativePath), 'utf8'))
}

function abs(relativePath) {
  return path.join(ROOT, relativePath)
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function assertEqual(actual, expected, label) {
  if (actual !== expected) addError(`${label}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`)
}

function addError(message) {
  errors.push(message)
}

function fail(message) {
  console.error(`error: ${message}`)
  process.exit(1)
}
