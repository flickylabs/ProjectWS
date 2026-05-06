#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const repoRoot = path.resolve(path.dirname(__filename), '..')
const allowedRoot = path.resolve(repoRoot, 'tmp/case-generation')

const ACTIVE_SCRIPTED_CHANNELS = [
  'interrogation',
  'evidence_present',
  'dossier',
  'witness',
  'aftermath',
  'system_message',
  'contradiction_pursuit',
  'interjection',
  'emotional_overload',
  'evidence_discovery',
  'trust_action',
  'mediation',
  'judge_question',
  'judge_contradiction',
  'judge_evidence_combo',
  'judge_witness_summon',
  'rapport_milestone',
  'contradict_milestone',
]

const REQUIRED_REFERENCES = [
  'docs/case-generation/README.md',
  'docs/case-generation/schemas.md',
  'docs/case-generation/quality-rules.md',
  'docs/case-generation/scripted-text-channels.md',
  'docs/case-generation/regeneration-policy.md',
  'docs/disclosure-policy.md',
  'docs/information-surface-policy.md',
  'docs/app-flow-design.md',
  'src/data/cases/generated/spouse-01.json',
  'src/data/cases/generated/family-01.json',
  'src/data/cases/generated/friend-01.json',
  'src/data/scriptedText/spouse-01.json',
  'src/data/scriptedText/family-01.json',
  'src/data/scriptedText/friend-01.json',
  'src/data/dialogues/phase1',
  'src/data/witnessTestimonyData',
  'src/data/claimPolicies',
  'tmp/qa-runtime-gate-manifests',
  'tmp/qa-route-simulator-manifests',
]

const usage = `Usage:
  node scripts/generate-case-draft.mjs --case-id <id> --relationship <type> --brief <path> --out tmp/case-generation [--dry-run] [--force]

Example:
  node scripts/generate-case-draft.mjs --case-id spouse-pilot-01 --relationship spouse --brief docs/case-generation/pilot-case-brief-template.md --out tmp/case-generation --dry-run`

function parseArgs(argv) {
  const args = {
    dryRun: false,
    force: false,
  }

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg === '--dry-run') {
      args.dryRun = true
    } else if (arg === '--force') {
      args.force = true
    } else if (arg === '--case-id') {
      args.caseId = argv[++i]
    } else if (arg === '--relationship') {
      args.relationship = argv[++i]
    } else if (arg === '--brief') {
      args.brief = argv[++i]
    } else if (arg === '--out') {
      args.out = argv[++i]
    } else if (arg === '--help' || arg === '-h') {
      console.log(usage)
      process.exit(0)
    } else {
      throw new Error(`Unknown argument: ${arg}`)
    }
  }

  return args
}

function assertRequiredArgs(args) {
  const missing = ['caseId', 'relationship', 'brief', 'out'].filter((key) => !args[key])
  if (missing.length > 0) {
    throw new Error(`Missing required argument(s): ${missing.map((key) => `--${key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`).join(', ')}\n\n${usage}`)
  }

  if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*-\d{2}$|^[a-z][a-z0-9]*(?:-[a-z0-9]+)*-pilot-\d{2}$/.test(args.caseId)) {
    throw new Error(`Invalid --case-id "${args.caseId}". Use a lowercase id like spouse-pilot-01 or spouse-02.`)
  }

  if (!/^[a-z][a-z0-9_-]*$/.test(args.relationship)) {
    throw new Error(`Invalid --relationship "${args.relationship}". Use a lowercase relationship type.`)
  }
}

function assertInsideAllowedRoot(candidatePath, label) {
  const resolved = path.resolve(repoRoot, candidatePath)
  if (resolved !== allowedRoot && !resolved.startsWith(`${allowedRoot}${path.sep}`)) {
    throw new Error(`${label} must be inside tmp/case-generation. Received: ${candidatePath}`)
  }
  return resolved
}

function relativeFromRoot(absPath) {
  return path.relative(repoRoot, absPath).replaceAll(path.sep, '/')
}

function readJsonIfFile(relPath) {
  const absPath = path.resolve(repoRoot, relPath)
  if (!fs.existsSync(absPath) || !fs.statSync(absPath).isFile()) return null
  return JSON.parse(fs.readFileSync(absPath, 'utf8'))
}

function collectReferenceCheck() {
  return REQUIRED_REFERENCES.map((relPath) => {
    const absPath = path.resolve(repoRoot, relPath)
    const exists = fs.existsSync(absPath)
    const stat = exists ? fs.statSync(absPath) : null
    return {
      path: relPath,
      exists,
      type: !stat ? null : stat.isDirectory() ? 'directory' : 'file',
      size: stat?.isFile() ? stat.size : null,
    }
  })
}

function collectActiveCaseSummary() {
  return ['spouse-01', 'family-01', 'friend-01'].map((caseId) => {
    const caseJson = readJsonIfFile(`src/data/cases/generated/${caseId}.json`)
    const scripted = readJsonIfFile(`src/data/scriptedText/${caseId}.json`)
    return {
      caseId,
      runtimeCaseId: caseJson?.caseId ?? null,
      relationshipType: caseJson?.meta?.relationshipType ?? caseJson?.duo?.relationshipType ?? null,
      disputes: Array.isArray(caseJson?.disputes) ? caseJson.disputes.length : null,
      evidence: Array.isArray(caseJson?.evidence) ? caseJson.evidence.length : null,
      combinationOutputs: Array.isArray(caseJson?.combinationLab?.outputs) ? caseJson.combinationLab.outputs.length : null,
      scriptedChannels: scripted?.channels ? Object.keys(scripted.channels) : [],
      scriptedEntryCounts: scripted?.channels
        ? Object.fromEntries(
            Object.entries(scripted.channels).map(([key, value]) => [
              key,
              Array.isArray(value?.entries) ? value.entries.length : null,
            ]),
          )
        : {},
    }
  })
}

function makeDraftFiles(args, caseRoot, briefText, referenceCheck, activeCaseSummary) {
  const runtimeCaseId = `case-${args.caseId}`
  const channels = Object.fromEntries(ACTIVE_SCRIPTED_CHANNELS.map((channel) => [channel, { entries: [] }]))

  return new Map([
    ['README.md', `# ${args.caseId} Draft\n\nThis is a draft workspace created by \`scripts/generate-case-draft.mjs\`.\n\n- Relationship: \`${args.relationship}\`\n- Runtime caseId field: \`${runtimeCaseId}\`\n- Source language: Korean\n- Status: scaffold only, not production-ready\n\nDo not copy files from this directory into \`src/data/**\` without controller approval.\n`],
    ['input/brief.md', briefText],
    ['draft/case-data.json', `${JSON.stringify({
      _status: 'scaffold',
      _instructions: [
        'Fill in Korean-first content after controller brief review.',
        'Keep hidden truth out of surfaceName, surfaceDescription, judge/system/dossier text, and early lie states.',
        'Do not promote this file directly without schema and policy review.',
      ],
      caseId: runtimeCaseId,
      sensitivityTags: [],
      meta: {
        relationshipType: args.relationship,
        conflictSeed: '',
        variableModules: [],
        twistModule: null,
        difficulty: 'medium',
        anchorTruth: '',
        emotionalBait: '',
        resolutionDilemma: '',
        title: '',
      },
      duo: {
        duoId: `duo-${args.caseId}`,
        relationshipType: args.relationship,
        partyA: { id: 'a', name: '', age: null, occupation: '', archetype: '', speechStyle: '', callTerms: {} },
        partyB: { id: 'b', name: '', age: null, occupation: '', archetype: '', speechStyle: '', callTerms: {} },
        relationshipLedger: [],
        socialGraph: [],
      },
      context: { contextType: args.relationship, description: '', emotionalPressure: 0, affects: 'both', triggerAmplifier: '' },
      disputes: [],
      evidence: [],
      evidenceCombinations: [],
      truthTable: [],
      lieConfigA: [],
      lieConfigB: [],
      solutions: {},
      activeLedgerEntries: [],
      activeThirdParties: [],
      baseEvidenceIds: [],
      monetaryDisputeIds: [],
      combinationLab: { analysisPointsBase: 0, nodes: [], outputs: [], recipes: [] },
      v3Design: {},
    }, null, 2)}\n`],
    ['draft/scripted-text.json', `${JSON.stringify({
      _status: 'scaffold',
      _instructions: [
        'Active runtime examples use 18 scripted channels.',
        'Fill only reviewed route-critical entries first, then expand coverage.',
      ],
      schemaVersion: 1,
      caseId: args.caseId,
      generatedAt: null,
      notes: ['Draft scaffold only. Korean source text required.'],
      coverage: {},
      channels,
    }, null, 2)}\n`],
    ['draft/phase1-dialogue.json', `${JSON.stringify({
      _status: 'scaffold',
      caseId: runtimeCaseId,
      dialogues: [],
    }, null, 2)}\n`],
    ['draft/witness-testimony.ts', `import type { TestimonySlot } from '../../types/witnessTestimony'\n\nexport const ${args.caseId.toUpperCase().replaceAll('-', '_')}_TESTIMONY: TestimonySlot[] = [\n]\n`],
    ['draft/claim-policy-structure-v2.json', `${JSON.stringify({
      _status: 'scaffold',
      caseId: args.caseId,
      schemaVersion: 'structure_v2',
      disputes: [],
      evidence: [],
    }, null, 2)}\n`],
    ['draft/game-events.json', `${JSON.stringify({
      _status: 'scaffold',
      caseId: args.caseId,
      contradictions: [],
      interjections: [],
      emotionalOutbursts: [],
      transitionBeats: [],
    }, null, 2)}\n`],
    ['qa/route-manifest.stub.json', `${JSON.stringify({
      schemaVersion: 1,
      caseId: args.caseId,
      phase: 'pilot-draft',
      routes: [],
    }, null, 2)}\n`],
    ['manifests/reference-check.json', `${JSON.stringify({
      caseId: args.caseId,
      relationship: args.relationship,
      allowedRoot: relativeFromRoot(allowedRoot),
      caseRoot: relativeFromRoot(caseRoot),
      references: referenceCheck,
      activeCaseSummary,
    }, null, 2)}\n`],
    ['manifests/output-manifest.json', `${JSON.stringify({
      caseId: args.caseId,
      relationship: args.relationship,
      status: 'scaffold',
      files: [
        'README.md',
        'input/brief.md',
        'draft/case-data.json',
        'draft/scripted-text.json',
        'draft/phase1-dialogue.json',
        'draft/witness-testimony.ts',
        'draft/claim-policy-structure-v2.json',
        'draft/game-events.json',
        'qa/route-manifest.stub.json',
        'manifests/reference-check.json',
        'manifests/promotion-checklist.md',
      ],
    }, null, 2)}\n`],
    ['manifests/promotion-checklist.md', `# Promotion Checklist: ${args.caseId}\n\nController approval is required before any production write.\n\n- [ ] Final production case ID confirmed\n- [ ] Korean brief approved\n- [ ] Runtime case JSON reviewed against active examples\n- [ ] Surface names and hidden truth lexemes reviewed\n- [ ] ScriptedText channel coverage reviewed\n- [ ] Phase 1 dialogue reviewed for early truth leakage\n- [ ] Witness knowledge budgets reviewed\n- [ ] Claim policy structure and game events reviewed\n- [ ] QA route manifest integrated in isolated result path\n- [ ] \`npm run build:pc\` passed\n- [ ] \`npm run check:policy\` passed\n- [ ] \`npm run check:sync\` passed\n- [ ] Refined manifest and production registration plan approved\n`],
  ])
}

function writeDraftFiles(caseRoot, files, force) {
  for (const [relativePath] of files) {
    const target = path.join(caseRoot, relativePath)
    if (fs.existsSync(target) && !force) {
      throw new Error(`Refusing to overwrite existing file without --force: ${relativeFromRoot(target)}`)
    }
  }

  for (const [relativePath, content] of files) {
    const target = path.join(caseRoot, relativePath)
    fs.mkdirSync(path.dirname(target), { recursive: true })
    fs.writeFileSync(target, content, 'utf8')
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2))
  assertRequiredArgs(args)

  const outRoot = assertInsideAllowedRoot(args.out, '--out')
  const caseRoot = assertInsideAllowedRoot(path.join(relativeFromRoot(outRoot), args.caseId), 'case draft root')
  const briefPath = path.resolve(repoRoot, args.brief)

  if (!fs.existsSync(briefPath) || !fs.statSync(briefPath).isFile()) {
    throw new Error(`Brief file does not exist: ${args.brief}`)
  }

  const referenceCheck = collectReferenceCheck()
  const missingReferences = referenceCheck.filter((item) => !item.exists)
  if (missingReferences.length > 0) {
    throw new Error(`Missing required reference(s):\n${missingReferences.map((item) => `- ${item.path}`).join('\n')}`)
  }

  const briefText = fs.readFileSync(briefPath, 'utf8')
  const activeCaseSummary = collectActiveCaseSummary()
  const files = makeDraftFiles(args, caseRoot, briefText, referenceCheck, activeCaseSummary)

  const summary = {
    mode: args.dryRun ? 'dry-run' : 'write',
    caseId: args.caseId,
    relationship: args.relationship,
    brief: relativeFromRoot(briefPath),
    outRoot: relativeFromRoot(outRoot),
    caseRoot: relativeFromRoot(caseRoot),
    files: [...files.keys()],
    referenceCount: referenceCheck.length,
    activeScriptedChannels: ACTIVE_SCRIPTED_CHANNELS.length,
  }

  if (args.dryRun) {
    console.log(JSON.stringify(summary, null, 2))
    console.log('\nNext manual steps:')
    console.log('1. Review the case brief with the controller.')
    console.log('2. Re-run without --dry-run to create the draft workspace under tmp/case-generation/.')
    console.log('3. Fill draft files in staged order and keep production promotion separate.')
    return
  }

  writeDraftFiles(caseRoot, files, args.force)
  console.log(JSON.stringify(summary, null, 2))
  console.log('\nDraft workspace created.')
  console.log('Next manual steps:')
  console.log('1. Fill draft/case-data.json from the approved Korean brief.')
  console.log('2. Review surface aliases and disclosure policy before ScriptedText expansion.')
  console.log('3. Add route-specific QA manifests before proposing production promotion.')
}

try {
  main()
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
}
