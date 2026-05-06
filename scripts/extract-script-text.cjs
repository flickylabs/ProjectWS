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
const locale = readArg('--locale')
const locales = locale ? [normalizeLocale(locale)] : SCRIPT_LOCALES
const outRoot = path.resolve(ROOT, readArg('--out') ?? 'tmp/locale-bootstrap')
const dryRun = args.includes('--dry-run')

for (const value of locales) {
  if (!SCRIPT_LOCALES.includes(value)) {
    fail(`Unsupported locale "${value}". Expected one of ${SCRIPT_LOCALES.join(', ')}`)
  }
}

const manifest = {
  generatedAt: new Date().toISOString(),
  locales,
  cases: [],
}

for (const currentLocale of locales) {
  for (const caseId of ACTIVE_CASES) {
    const caseSummary = {
      locale: currentLocale,
      caseId,
      files: [],
    }

    addIfExists(caseSummary, currentLocale, `src/data/scriptedText/${caseId}.json`, extractScriptedText)
    for (const suffix of ['angle_catalog', 'judge_questions', 'interrogation_answers', 'special_scripts']) {
      addIfExists(caseSummary, currentLocale, `src/data/scriptedAngles/${caseId}_${suffix}.json`, (data, localeCode) => extractScriptedAngle(data, suffix, localeCode))
    }
    addIfExists(caseSummary, currentLocale, `src/data/dialogues/phase1/${caseId}.json`, extractDialogueBundle)
    addIfExists(caseSummary, currentLocale, `src/data/dialogues/mediation/${ACTIVE_MEDIATION[caseId]}.json`, extractMediationBundle)
    addIfExists(caseSummary, currentLocale, `src/data/cases/generated/${caseId}.json`, extractGeneratedCaseSurface)

    manifest.cases.push(caseSummary)
  }
}

writeOutput('manifest.json', manifest)

const totalFiles = manifest.cases.reduce((sum, item) => sum + item.files.length, 0)
console.log(`script extraction scaffold ${dryRun ? 'dry-run ' : ''}ok: ${totalFiles} files, locales=${locales.join(',')}`)
console.log(`output=${path.relative(ROOT, outRoot).replace(/\\/g, '/')}`)

function addIfExists(summary, currentLocale, relativePath, extractor) {
  const absolutePath = path.join(ROOT, relativePath)
  if (!fs.existsSync(absolutePath)) return

  const source = readJson(absolutePath)
  const overlay = extractor(source, currentLocale)
  const outputPath = toLocaleOutputPath(relativePath, currentLocale)
  writeOutput(outputPath, overlay)
  summary.files.push({
    source: relativePath,
    output: outputPath,
    strings: countStrings(overlay),
  })
}

function extractScriptedText(bundle, currentLocale) {
  const channels = {}
  for (const [channelName, channel] of Object.entries(bundle.channels ?? {})) {
    channels[channelName] = {
      entries: (channel.entries ?? []).map((entry) => ({
        key: entry.key,
        party: entry.party,
        disputeId: entry.disputeId,
        evidenceId: entry.evidenceId,
        dossierQuestionId: entry.dossierQuestionId,
        witnessId: entry.witnessId,
        resultClass: entry.resultClass,
        lieState: entry.lieState,
        lieBand: entry.lieBand,
        questionType: entry.questionType,
        subjectRole: entry.subjectRole,
        depth: entry.depth,
        context: entry.context,
        eventType: entry.eventType,
        variants: (entry.variants ?? []).map((variant) => ({
          id: variant.id,
          text: '',
        })),
      })),
    }
  }
  return {
    schemaVersion: bundle.schemaVersion,
    locale: currentLocale,
    caseId: bundle.caseId,
    overlayKind: 'scriptedText',
    channels,
  }
}

function extractScriptedAngle(bundle, suffix, currentLocale) {
  if (suffix === 'angle_catalog') {
    return {
      schemaVersion: bundle.schemaVersion,
      locale: currentLocale,
      caseId: bundle.caseId,
      overlayKind: suffix,
      angles: (bundle.angles ?? []).map((angle) => ({
        disputeId: angle.disputeId,
        angleId: angle.angleId,
        label: '',
        description: '',
        keywordsLocale: [],
      })),
    }
  }

  if (suffix === 'judge_questions') {
    return {
      schemaVersion: bundle.schemaVersion,
      locale: currentLocale,
      caseId: bundle.caseId,
      overlayKind: suffix,
      judgeQuestions: (bundle.judgeQuestions ?? []).map((entry) => ({
        disputeId: entry.disputeId,
        questionType: entry.questionType,
        targetParty: entry.targetParty,
        angleId: entry.angleId,
        variants: (entry.variants ?? []).map((variant) => ({ id: variant.id, text: '' })),
      })),
    }
  }

  if (suffix === 'interrogation_answers') {
    return {
      schemaVersion: bundle.schemaVersion,
      locale: currentLocale,
      caseId: bundle.caseId,
      overlayKind: suffix,
      answers: (bundle.answers ?? []).map((entry) => ({
        party: entry.party,
        disputeId: entry.disputeId,
        questionType: entry.questionType,
        angleId: entry.angleId,
        lieState: entry.lieState,
        key: entry.key,
        variants: (entry.variants ?? []).map((variant) => ({ id: variant.id, text: '' })),
      })),
    }
  }

  return {
    schemaVersion: bundle.schemaVersion,
    locale: currentLocale,
    caseId: bundle.caseId,
    overlayKind: suffix,
    note: 'Special script extraction is schema-preserving and will be filled in a later pass.',
  }
}

function extractDialogueBundle(bundle) {
  return {
    caseId: bundle.caseId,
    overlayKind: 'phase1Dialogue',
    dialogues: (bundle.dialogues ?? []).map((entry, index) => {
      const overlayEntry = {
        id: entry.id ?? String(index),
        speaker: entry.speaker,
        text: '',
      }
      const options = getDialogueOptions(entry)
      if (typeof entry.choiceId === 'string') overlayEntry.choiceId = entry.choiceId
      if (options.length > 0) {
        const optionField = Array.isArray(entry.options) ? 'options' : 'choices'
        overlayEntry[optionField] = options.map((choice, choiceIndex) => ({
          id: choice.id ?? String(choiceIndex),
          text: '',
        }))
      }
      return overlayEntry
    }),
  }
}

function extractMediationBundle(bundle) {
  const paths = {}
  for (const [pathId, pathValue] of Object.entries(bundle.paths ?? {})) {
    paths[pathId] = {
      judge: '',
      dialogues: (pathValue.dialogues ?? []).map((entry, index) => ({
        id: entry.id ?? String(index),
        speaker: entry.speaker,
        text: '',
      })),
    }
  }
  return {
    caseId: bundle.caseId,
    overlayKind: 'mediationDialogue',
    paths,
  }
}

function extractGeneratedCaseSurface(data) {
  return {
    caseId: normalizeRuntimeCaseId(data.caseId),
    overlayKind: 'generatedCaseSurface',
    meta: pickTextFields(data.meta, ['title', 'subtitle', 'summary']),
    context: pickTextFields(data.context, ['description', 'triggerAmplifier']),
    duo: {
      partyA: pickTextFields(data.duo?.partyA, ['name', 'occupation']),
      partyB: pickTextFields(data.duo?.partyB, ['name', 'occupation']),
    },
    disputes: (data.disputes ?? []).map((item) => {
      const dispute = {
        id: item.id,
        name: '',
      }
      if (typeof item.surfaceClaim === 'string') dispute.surfaceClaim = ''
      return dispute
    }),
    evidence: (data.evidence ?? []).map((item) => ({
      id: item.id,
      surfaceName: '',
      surfaceDescription: '',
    })),
  }
}

function getDialogueOptions(entry) {
  if (Array.isArray(entry?.options)) return entry.options
  if (Array.isArray(entry?.choices)) return entry.choices
  return []
}

function pickTextFields(source, fields) {
  const result = {}
  for (const field of fields) {
    if (source && typeof source[field] === 'string') result[field] = ''
  }
  return result
}

function toLocaleOutputPath(relativePath, currentLocale) {
  const parsed = path.parse(relativePath)
  const file = `${parsed.name}.${currentLocale}${parsed.ext}`
  return path.join(currentLocale, parsed.dir, file).replace(/\\/g, '/')
}

function writeOutput(relativePath, data) {
  if (dryRun) return
  const absolutePath = path.join(outRoot, relativePath)
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true })
  fs.writeFileSync(absolutePath, `${JSON.stringify(data, null, 2)}\n`)
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function countStrings(value) {
  let count = 0
  walk(value)
  return count

  function walk(node) {
    if (typeof node === 'string') {
      if (node === '') count += 1
      return
    }
    if (Array.isArray(node)) {
      node.forEach(walk)
      return
    }
    if (node && typeof node === 'object') {
      Object.values(node).forEach(walk)
    }
  }
}

function readArg(name) {
  const direct = args.find((arg) => arg.startsWith(`${name}=`))
  if (direct) return direct.slice(name.length + 1)
  const index = args.indexOf(name)
  return index >= 0 ? args[index + 1] : null
}

function normalizeLocale(value) {
  if (value === 'zh' || value === 'zh-cn' || value === 'zh_CN') return 'zh-CN'
  return value
}

function normalizeRuntimeCaseId(caseId) {
  return typeof caseId === 'string' ? caseId.replace(/^case-/, '') : caseId
}

function fail(message) {
  console.error(message)
  process.exit(1)
}
