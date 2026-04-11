#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { compilePilotScriptedBundle } = require('./lib/build-pilot-scripted-bundle.cjs')

const ROOT = path.resolve(__dirname, '..')
const TMP_DIR = path.join(ROOT, 'tmp')
const SCRIPTED_DIR = path.join(ROOT, 'src', 'data', 'scriptedText')
const OUTPUT_PATH = path.join(TMP_DIR, 'v3-scripted-fallback-audit.json')
const DEFAULT_CASE_IDS = ['spouse-v3-01', 'family-v3-01', 'friend-v3-01']
const CHANNELS = ['interrogation', 'evidence_present', 'dossier', 'witness', 'aftermath', 'system_message']

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true })
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function buildChannelAudit(referenceBundle, currentBundle, channel) {
  const referenceEntries = referenceBundle.channels?.[channel]?.entries ?? []
  const currentEntries = currentBundle.channels?.[channel]?.entries ?? []
  const referenceKeys = new Set(referenceEntries.map((entry) => entry.key))
  const currentKeys = new Set(currentEntries.map((entry) => entry.key))

  const missingKeys = [...referenceKeys].filter((key) => !currentKeys.has(key)).sort()
  const extraKeys = [...currentKeys].filter((key) => !referenceKeys.has(key)).sort()

  let cause = 'none'
  if (missingKeys.length > 0 && extraKeys.length > 0) cause = 'possible_key_format_mismatch'
  else if (missingKeys.length > 0) cause = 'missing_scripted_entries'
  else if (extraKeys.length > 0) cause = 'unexpected_extra_entries'

  return {
    channel,
    expectedKeyCount: referenceKeys.size,
    actualKeyCount: currentKeys.size,
    missingKeys,
    extraKeys,
    cause,
    status: missingKeys.length === 0 && extraKeys.length === 0 ? 'pass' : 'needs_fix',
  }
}

function readRuntimeWiring() {
  const resolverSource = fs.readFileSync(path.join(ROOT, 'src', 'engine', 'llmDialogueResolver.ts'), 'utf8')
  const witnessSource = fs.readFileSync(path.join(ROOT, 'src', 'engine', 'witnessEngine.ts'), 'utf8')
  const aftermathSource = fs.readFileSync(path.join(ROOT, 'src', 'engine', 'aftermathResolver.ts'), 'utf8')

  return {
    interrogation: resolverSource.includes('getScriptedInterrogation('),
    evidence_present: resolverSource.includes('getScriptedEvidencePresent('),
    dossier: resolverSource.includes('getScriptedDossier(') && resolverSource.includes('questionId'),
    witness: witnessSource.includes('getScriptedWitness('),
    aftermath: aftermathSource.includes('getScriptedAftermath('),
    system_message: false,
  }
}

function auditCase(caseId) {
  const referencePath = path.join(TMP_DIR, `${caseId}.reference.bundle.json`)
  compilePilotScriptedBundle({ root: ROOT, caseId, outPath: referencePath })

  const referenceBundle = readJson(referencePath)
  const currentBundle = readJson(path.join(SCRIPTED_DIR, `${caseId}.json`))
  const channels = Object.fromEntries(
    CHANNELS.map((channel) => [channel, buildChannelAudit(referenceBundle, currentBundle, channel)]),
  )

  const hasIssues = Object.values(channels).some((channelAudit) => channelAudit.status !== 'pass')
  return {
    caseId,
    status: hasIssues ? 'needs_fix' : 'pass',
    channels,
  }
}

function main() {
  ensureDir(TMP_DIR)

  const caseIds = process.argv.slice(2).filter(Boolean)
  const targets = caseIds.length > 0 ? caseIds : DEFAULT_CASE_IDS
  const runtimeWiring = readRuntimeWiring()
  const cases = targets.map(auditCase)
  const failingCases = cases.filter((item) => item.status !== 'pass').map((item) => item.caseId)
  const unwiredChannels = Object.entries(runtimeWiring)
    .filter(([, wired]) => !wired)
    .map(([channel]) => channel)

  const summary = {
    generatedAt: new Date().toISOString(),
    caseIds: targets,
    runtimeWiring,
    unwiredChannels,
    cases,
    overallStatus: failingCases.length === 0 ? 'pass' : 'needs_fix',
    failingCases,
  }

  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(summary, null, 2)}\n`, 'utf8')

  console.log(`[audit] output: ${OUTPUT_PATH}`)
  console.log(`[audit] runtime wiring: ${Object.entries(runtimeWiring).map(([channel, wired]) => `${channel}=${wired ? 'wired' : 'unwired'}`).join(', ')}`)
  for (const item of cases) {
    console.log(`\n[case] ${item.caseId} (${item.status})`)
    for (const channel of CHANNELS) {
      const report = item.channels[channel]
      console.log(`- ${channel}: ${report.status} expected=${report.expectedKeyCount} actual=${report.actualKeyCount} missing=${report.missingKeys.length} extra=${report.extraKeys.length}`)
      if (report.missingKeys.length > 0) {
        console.log(`  missingKeys: ${report.missingKeys.join(', ')}`)
      }
      if (report.extraKeys.length > 0) {
        console.log(`  extraKeys: ${report.extraKeys.join(', ')}`)
      }
    }
  }

  if (summary.overallStatus !== 'pass') process.exitCode = 1
}

main()
