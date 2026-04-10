#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const CASE_DIR = path.join(ROOT, 'src', 'data', 'cases', 'generated')
const DOCS_REF_DIR = path.join(ROOT, 'docs', 'ref')
const DRAFT_DIR = path.join(ROOT, 'docs', 'ref', 'scripted-text', 'deterministic-drafts')
const OUT_DIR = path.join(ROOT, 'docs', 'ref', 'scripted-text', 'full-scaffolds')

const LIE_STATES = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5']
const LIE_BANDS = ['early', 'mid', 'late']
const QUESTION_TYPES = ['fact_pursuit', 'motive_search', 'empathy_approach']

function getArgs() {
  const args = process.argv.slice(2)
  const options = { caseId: null }
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === '--case' && args[i + 1]) options.caseId = args[++i]
  }
  return options
}

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) walk(full, files)
    else files.push(full)
  }
  return files
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function byBasename(files, target) {
  return files.find((file) => path.basename(file) === target) || null
}

function toLieBand(lieState) {
  if (lieState === 'S0' || lieState === 'S1') return 'early'
  if (lieState === 'S2' || lieState === 'S3') return 'mid'
  return 'late'
}

function deriveEvidenceSubjectRole(evidence, party) {
  const subjectParty = evidence.subjectParty || 'both'
  if (subjectParty === party) return 'self'
  if (subjectParty === 'both') {
    return evidence.provenance === 'institutional' ? 'institutional' : 'both'
  }
  return evidence.provenance === 'institutional' ? 'institutional' : 'other'
}

function collectDossierQuestionIds(v3Data) {
  const questionIds = []
  for (const card of v3Data.dossierCards || []) {
    for (const challenge of card.challenges || []) {
      for (const question of challenge.questions || []) {
        questionIds.push(question.id)
      }
    }
  }
  return questionIds
}

function buildInterrogationEntries(caseData) {
  const parties = ['a', 'b']
  const disputeIds = (caseData.disputes || []).map((dispute) => dispute.id)
  const entries = []
  for (const party of parties) {
    for (const disputeId of disputeIds) {
      for (const lieState of LIE_STATES) {
        for (const questionType of QUESTION_TYPES) {
          entries.push({
            key: [party, disputeId, lieState, questionType].join('|'),
            party,
            disputeId,
            lieState,
            questionType,
            variants: [],
          })
        }
      }
    }
  }
  return entries
}

function buildEvidenceEntries(caseData) {
  const entries = []
  for (const party of ['a', 'b']) {
    for (const evidence of caseData.evidence || []) {
      for (const lieBand of LIE_BANDS) {
        const subjectRole = deriveEvidenceSubjectRole(evidence, party)
        entries.push({
          key: [party, evidence.id, lieBand, subjectRole].join('|'),
          party,
          evidenceId: evidence.id,
          lieBand,
          subjectRole,
          variants: [],
        })
      }
    }
  }
  return entries
}

function buildDossierEntries(questionIds) {
  const entries = []
  for (const questionId of questionIds) {
    const parts = questionId.split('.')
    const targetParty = parts[1]
    for (const lieBand of LIE_BANDS) {
      entries.push({
        key: [targetParty, questionId, lieBand].join('|'),
        party: targetParty,
        dossierQuestionId: questionId,
        lieBand,
        variants: [],
      })
    }
  }
  return entries
}

function buildCoverage(caseData, questionIds) {
  return {
    interrogation: {
      parties: ['a', 'b'],
      disputes: (caseData.disputes || []).map((dispute) => dispute.id),
      lieStates: LIE_STATES,
      questionTypes: QUESTION_TYPES,
      variantsPerKey: 5,
    },
    evidence_present: {
      parties: ['a', 'b'],
      evidenceIds: (caseData.evidence || []).map((evidence) => evidence.id),
      lieBands: LIE_BANDS,
      variantsPerKey: 5,
    },
    dossier: {
      parties: ['a', 'b'],
      questionIds,
      lieBands: LIE_BANDS,
      variantsPerKey: 3,
    },
    witness: {
      witnessIds: (caseData.duo?.socialGraph || []).map((person) => person.id),
      depths: ['vague', 'partial', 'full'],
      variantsPerKey: 3,
    },
    aftermath: {
      resultClasses: [
        'a_primary_fault',
        'b_primary_fault',
        'shared_fault',
        'trust_rebuild',
        'procedural_caution',
      ],
      variantsPerKey: 2,
    },
    system_message: {
      keys: [
        { context: 'interrogation', eventType: 'repeat_warning' },
        { context: 'evidence', eventType: 'new_unlock' },
        { context: 'evidence', eventType: 'trap_notice' },
        { context: 'dossier', eventType: 'challenge_cleared' },
        { context: 'witness', eventType: 'credibility_shift' },
        { context: 'verdict', eventType: 'profile_update' },
      ],
      variantsPerKey: 2,
    },
  }
}

function buildScaffold(caseId, caseData, v3Data, deterministicDraft) {
  const questionIds = collectDossierQuestionIds(v3Data)
  return {
    schemaVersion: 1,
    caseId,
    generatedAt: new Date().toISOString(),
    notes: [
      'Scaffold only.',
      'interrogation, evidence_present, dossier entries are key-complete but text-empty.',
      'witness, aftermath, system_message were copied from deterministic drafts.',
    ],
    coverage: buildCoverage(caseData, questionIds),
    channels: {
      interrogation: {
        entries: buildInterrogationEntries(caseData),
      },
      evidence_present: {
        entries: buildEvidenceEntries(caseData),
      },
      dossier: {
        entries: buildDossierEntries(questionIds),
      },
      witness: deterministicDraft.channels.witness,
      aftermath: deterministicDraft.channels.aftermath,
      system_message: deterministicDraft.channels.system_message,
    },
  }
}

function main() {
  ensureDir(OUT_DIR)
  const options = getArgs()
  const refFiles = walk(DOCS_REF_DIR)
  const caseIds = options.caseId
    ? [options.caseId]
    : fs.readdirSync(CASE_DIR).filter((name) => name.endsWith('.json')).map((name) => name.replace(/\.json$/u, '')).sort()

  for (const caseId of caseIds) {
    const caseData = loadJson(path.join(CASE_DIR, `${caseId}.json`))
    const v3Path = byBasename(refFiles, `${caseId}-v3-game-loop-data.json`)
    if (!v3Path) throw new Error(`missing v3 game loop json for ${caseId}`)
    const v3Data = loadJson(v3Path)
    const deterministicDraft = loadJson(path.join(DRAFT_DIR, `${caseId}.json`))
    const scaffold = buildScaffold(caseId, caseData, v3Data, deterministicDraft)
    fs.writeFileSync(path.join(OUT_DIR, `${caseId}.json`), `${JSON.stringify(scaffold, null, 2)}\n`, 'utf8')
  }

  console.log(`[generate-scripted-text-scaffolds] cases=${caseIds.length}`)
  console.log(`[generate-scripted-text-scaffolds] outDir=${path.relative(ROOT, OUT_DIR)}`)
}

main()
