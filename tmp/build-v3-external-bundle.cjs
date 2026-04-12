#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { compileScriptedBundle } = require('../scripts/lib/compile-scripted-bundle.cjs')
const { normalizeScriptedBundle } = require('../scripts/lib/scripted-semantic-normalizer.cjs')
const { applyReleaseReadyScriptedHotfix } = require('../scripts/lib/release-ready-scripted-hotfix.cjs')

const ROOT = path.join(__dirname, '..')
const DOSSIER_BAND_MAP = {
  unlock: 'early',
  pressure: 'mid',
  collapse: 'late',
  early: 'early',
  mid: 'mid',
  late: 'late',
}
const CASE_FALLBACKS = {
  'family-v3-01': {
    interrogation: [
      'a|d-2|S3|motive_search',
      'a|h-d3|S5|empathy_approach',
      'a|h-d3|S5|fact_pursuit',
      'a|h-d3|S5|motive_search',
      'b|d-1|S0|empathy_approach',
      'b|d-1|S1|empathy_approach',
      'b|d-5|S1|empathy_approach',
      'b|d-5|S1|fact_pursuit',
      'b|h-d3|S1|motive_search',
      'b|h-d3|S2|empathy_approach',
      'b|h-d3|S4|empathy_approach',
      'b|h-d3|S5|empathy_approach',
      'b|h-d3|S5|fact_pursuit',
      'b|h-d3|S5|motive_search',
      'b|h-d4|S4|empathy_approach',
    ],
    witness: ['w-3|full'],
  },
  'friend-v3-01': {
    interrogation: [
      'a|d-1|S4|motive_search',
      'a|d-4|S5|empathy_approach',
      'b|d-4|S2|empathy_approach',
      'b|d-5|S3|empathy_approach',
      'b|d-5|S3|fact_pursuit',
      'b|d-5|S3|motive_search',
      'b|d-5|S4|empathy_approach',
      'b|d-5|S4|motive_search',
      'b|h-d2|S3|empathy_approach',
    ],
    evidence_present: [
      'a|e-1|late|other',
      'a|e-1|mid|other',
      'a|e-2|late|self',
      'a|e-2|mid|self',
      'a|e-3|late|other',
      'a|e-3|mid|other',
      'a|e-4|late|other',
      'a|e-5|early|other',
      'a|e-5|late|other',
      'a|e-5|mid|other',
      'a|e-6|early|other',
      'a|e-6|late|other',
      'a|e-6|mid|other',
      'a|e-7|late|other',
      'a|e-7|mid|other',
      'b|e-1|mid|self',
      'b|e-2|late|other',
      'b|e-2|mid|other',
      'b|e-3|late|self',
      'b|e-3|mid|self',
      'b|e-4|late|self',
      'b|e-4|mid|self',
      'b|e-5|mid|self',
      'b|e-6|early|self',
      'b|e-6|late|self',
      'b|e-6|mid|self',
      'b|e-7|early|self',
      'b|e-7|late|self',
      'b|e-7|mid|self',
    ],
    dossier: ['a|dc-5.a.q1|mid'],
    witness: ['w-3|full'],
  },
}

function parseOption(argv, name) {
  const inline = argv.find((item) => item.startsWith(`${name}=`))
  if (inline) return inline.slice(`${name}=`.length)
  const idx = argv.indexOf(name)
  if (idx >= 0 && argv[idx + 1]) return argv[idx + 1]
  return null
}

function hasFlag(argv, name) {
  return argv.includes(name)
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''))
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value))
}

function getSessionPaths(inputDir) {
  return {
    session1: path.join(inputDir, 'session-1-interrogation-a.json'),
    session2: path.join(inputDir, 'session-2-interrogation-b.json'),
    session3: path.join(inputDir, 'session-3-evidence-dossier.json'),
    session4: path.join(inputDir, 'session-4-witness-aftermath-system.json'),
  }
}

function getVariantTexts(rawVariants) {
  assert(Array.isArray(rawVariants), 'raw variants must be an array')
  return rawVariants.map((variant) => {
    if (typeof variant === 'string') return variant.trim()
    if (variant && typeof variant.text === 'string') return variant.text.trim()
    throw new Error('raw variant must be a string or an object with text')
  })
}

function replaceVariantTexts(baseEntry, rawVariants, channelName, key) {
  const texts = getVariantTexts(rawVariants)
  assert(Array.isArray(baseEntry?.variants), `missing base variants for ${channelName}:${key}`)
  assert(
    baseEntry.variants.length === texts.length,
    `variant count mismatch for ${channelName}:${key} (${texts.length} !== ${baseEntry.variants.length})`,
  )

  baseEntry.variants = baseEntry.variants.map((variant, index) => ({
    ...variant,
    text: texts[index],
  }))
}

function buildBaseMaps(bundle) {
  return {
    interrogation: new Map((bundle.channels?.interrogation?.entries || []).map((entry) => [
      [entry.party, entry.disputeId, entry.lieState, entry.questionType].join('|'),
      entry,
    ])),
    evidence_present: new Map((bundle.channels?.evidence_present?.entries || []).map((entry) => [
      [entry.party, entry.evidenceId, entry.lieBand, entry.audience].filter(Boolean).join('|'),
      entry,
    ])),
    dossier: new Map((bundle.channels?.dossier?.entries || []).map((entry) => [
      [entry.party, entry.dossierQuestionId, entry.lieBand].join('|'),
      entry,
    ])),
    witness: new Map((bundle.channels?.witness?.entries || []).map((entry) => [
      [entry.witnessId, entry.depth].join('|'),
      entry,
    ])),
    aftermath: new Map((bundle.channels?.aftermath?.entries || []).map((entry) => [
      entry.resultClass || entry.key,
      entry,
    ])),
    system_message: new Map((bundle.channels?.system_message?.entries || []).map((entry) => [
      entry.key,
      entry,
    ])),
  }
}

function applyInterrogationEntries(map, party, entries) {
  const updated = new Set()
  for (const entry of entries) {
    const key = [party, entry.disputeId, entry.lieState, entry.questionType].join('|')
    const target = map.get(key)
    assert(target, `missing base interrogation entry: ${key}`)
    replaceVariantTexts(target, entry.variants, 'interrogation', key)
    updated.add(key)
  }
  return updated
}

function applyEvidenceEntries(map, entries) {
  const updated = new Set()
  for (const entry of entries) {
    const key = [entry.party, entry.evidenceId, entry.lieBand, entry.audience].filter(Boolean).join('|')
    const target = map.get(key)
    assert(target, `missing base evidence entry: ${key}`)
    replaceVariantTexts(target, entry.variants, 'evidence_present', key)
    updated.add(key)
  }
  return updated
}

function applyDossierEntries(map, entries) {
  const updated = new Set()
  for (const entry of entries) {
    const band = DOSSIER_BAND_MAP[entry.cardBand || entry.lieBand]
    assert(band, `unsupported dossier band: ${entry.cardBand || entry.lieBand}`)
    const party = entry.party || entry.targetParty
    const key = [party, entry.dossierQuestionId, band].join('|')
    const target = map.get(key)
    assert(target, `missing base dossier entry: ${key}`)
    replaceVariantTexts(target, entry.variants, 'dossier', key)
    updated.add(key)
  }
  return updated
}

function applyWitnessEntries(map, entries) {
  const updated = new Set()
  for (const entry of entries) {
    const key = [entry.witnessId, entry.depth].join('|')
    const target = map.get(key)
    assert(target, `missing base witness entry: ${key}`)
    replaceVariantTexts(target, entry.variants, 'witness', key)
    updated.add(key)
  }
  return updated
}

function applyAftermathEntries(map, entries) {
  const updated = new Set()
  for (const entry of entries) {
    const key = entry.resultClass || entry.key
    const target = map.get(key)
    assert(target, `missing base aftermath entry: ${key}`)
    replaceVariantTexts(target, entry.variants, 'aftermath', key)
    updated.add(key)
  }
  return updated
}

function applySystemEntries(map, entries) {
  const updated = new Set()
  for (const entry of entries) {
    const key = entry.key
    const target = map.get(key)
    assert(target, `missing base system_message entry: ${key}`)
    replaceVariantTexts(target, entry.variants, 'system_message', key)
    updated.add(key)
  }
  return updated
}

function assertFullCoverage(name, updatedKeys, map) {
  assert(
    updatedKeys.size === map.size,
    `${name} coverage mismatch: updated ${updatedKeys.size} of ${map.size}`,
  )
}

function getChannelEntries(bundle, channelName) {
  const entries = bundle.channels?.[channelName]?.entries
  assert(Array.isArray(entries), `missing channel entries: ${channelName}`)
  return entries
}

function restoreEntryFromBase(bundle, baseBundle, channelName, key) {
  const entries = getChannelEntries(bundle, channelName)
  const baseEntries = getChannelEntries(baseBundle, channelName)
  const index = entries.findIndex((entry) => entry.key === key)
  assert(index >= 0, `missing target ${channelName} entry: ${key}`)
  const source = baseEntries.find((entry) => entry.key === key)
  assert(source, `missing base ${channelName} entry: ${key}`)
  entries[index] = cloneJson(source)
}

function applyCaseSpecificPatches(bundle, baseBundle, caseId) {
  const fallbackConfig = CASE_FALLBACKS[caseId]
  if (!fallbackConfig) return

  for (const [channelName, keys] of Object.entries(fallbackConfig)) {
    for (const key of keys) {
      restoreEntryFromBase(bundle, baseBundle, channelName, key)
    }
  }
}

function main() {
  const argv = process.argv.slice(2)
  const caseId = parseOption(argv, '--case') || argv[0]
  assert(caseId, 'usage: node tmp/build-v3-external-bundle.cjs --case <caseId> [--input-dir <dir>] [--output <file>]')

  const inputDir = path.resolve(parseOption(argv, '--input-dir') || path.join(ROOT, 'gpt-pro-runs', caseId, 'output'))
  const outputPath = path.resolve(parseOption(argv, '--output') || path.join(ROOT, 'src', 'data', 'scriptedText', 'external', `${caseId}.json`))
  const tempBasePath = path.resolve(
    parseOption(argv, '--temp-base') || path.join(ROOT, 'tmp', `${caseId}.external-base.json`),
  )
  const keepTempBase = hasFlag(argv, '--keep-temp-base')

  const sessionPaths = getSessionPaths(inputDir)
  for (const filePath of Object.values(sessionPaths)) {
    assert(fs.existsSync(filePath), `missing session file: ${filePath}`)
  }

  compileScriptedBundle({
    root: ROOT,
    caseId,
    outPath: tempBasePath,
    mode: 'auto',
  })

  const bundle = readJson(tempBasePath)
  const baseBundle = cloneJson(bundle)
  const session1 = readJson(sessionPaths.session1)
  const session2 = readJson(sessionPaths.session2)
  const session3 = readJson(sessionPaths.session3)
  const session4 = readJson(sessionPaths.session4)
  const runtimeCase = readJson(path.join(ROOT, 'src', 'data', 'cases', 'generated', `${caseId}.json`))

  assert(session1.channel === 'interrogation' && session1.party === 'a', 'session-1 shape mismatch')
  assert(session2.channel === 'interrogation' && session2.party === 'b', 'session-2 shape mismatch')
  assert(Array.isArray(session1.entries) && Array.isArray(session2.entries), 'interrogation entries missing')
  assert(Array.isArray(session3?.evidence_present?.entries), 'session-3 evidence_present shape mismatch')
  assert(Array.isArray(session3?.dossier?.entries), 'session-3 dossier shape mismatch')
  assert(Array.isArray(session4?.witness?.entries), 'session-4 witness shape mismatch')
  assert(Array.isArray(session4?.aftermath?.entries), 'session-4 aftermath shape mismatch')
  assert(Array.isArray(session4?.system_message?.entries), 'session-4 system_message shape mismatch')

  const maps = buildBaseMaps(bundle)
  const updated = {
    interrogation: new Set([
      ...applyInterrogationEntries(maps.interrogation, 'a', session1.entries),
      ...applyInterrogationEntries(maps.interrogation, 'b', session2.entries),
    ]),
    evidence_present: applyEvidenceEntries(maps.evidence_present, session3.evidence_present.entries),
    dossier: applyDossierEntries(maps.dossier, session3.dossier.entries),
    witness: applyWitnessEntries(maps.witness, session4.witness.entries),
    aftermath: applyAftermathEntries(maps.aftermath, session4.aftermath.entries),
    system_message: applySystemEntries(maps.system_message, session4.system_message.entries),
  }

  assertFullCoverage('interrogation', updated.interrogation, maps.interrogation)
  assertFullCoverage('evidence_present', updated.evidence_present, maps.evidence_present)
  assertFullCoverage('dossier', updated.dossier, maps.dossier)
  assertFullCoverage('witness', updated.witness, maps.witness)
  assertFullCoverage('aftermath', updated.aftermath, maps.aftermath)
  assertFullCoverage('system_message', updated.system_message, maps.system_message)

  bundle.generatedAt = new Date().toISOString()
  bundle.notes = [
    ...(Array.isArray(bundle.notes) ? bundle.notes : []),
    `External GPT Pro bundle assembled from ${path.relative(ROOT, inputDir).replace(/\\/g, '/')}.`,
  ]

  normalizeScriptedBundle({ bundle: baseBundle, runtimeCase, mode: 'external_scripted_json' })
  applyReleaseReadyScriptedHotfix({ bundle: baseBundle, runtimeCase })
  normalizeScriptedBundle({ bundle, runtimeCase, mode: 'external_scripted_json' })
  applyReleaseReadyScriptedHotfix({ bundle, runtimeCase })
  applyCaseSpecificPatches(bundle, baseBundle, caseId)

  writeJson(outputPath, bundle)

  if (!keepTempBase && fs.existsSync(tempBasePath)) {
    fs.unlinkSync(tempBasePath)
  }

  console.log(`[build-v3-external-bundle] case=${caseId}`)
  console.log(`[build-v3-external-bundle] inputDir=${path.relative(ROOT, inputDir).replace(/\\/g, '/')}`)
  console.log(`[build-v3-external-bundle] output=${path.relative(ROOT, outputPath).replace(/\\/g, '/')}`)
  console.log(`[build-v3-external-bundle] interrogation=${updated.interrogation.size}`)
  console.log(`[build-v3-external-bundle] evidence_present=${updated.evidence_present.size}`)
  console.log(`[build-v3-external-bundle] dossier=${updated.dossier.size}`)
  console.log(`[build-v3-external-bundle] witness=${updated.witness.size}`)
  console.log(`[build-v3-external-bundle] aftermath=${updated.aftermath.size}`)
  console.log(`[build-v3-external-bundle] system_message=${updated.system_message.size}`)
}

main()
