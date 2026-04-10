const fs = require('fs')
const path = require('path')

const ROOT = 'D:/ProjectWS'
const SCRIPTED_DIR = path.join(ROOT, 'src', 'data', 'scriptedText')
const GENERATED_DIR = path.join(ROOT, 'src', 'data', 'cases', 'generated')
const REFINED_MANIFEST_PATH = path.join(ROOT, 'src', 'data', 'cases', 'refined', 'manifest.json')
const OUTPUT_PATH = path.join(ROOT, 'tmp', 'scripted-key-coverage-report.json')
const EXCLUDED_CASE_KEYS = new Set(['neighbor-new-10', 'civic-new-07'])

const LIE_STATES = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5']
const QUESTION_TYPES = ['fact_pursuit', 'motive_search', 'empathy_approach']

function normalizeCaseKey(value) {
  return String(value || '')
    .replace(/^case-/, '')
    .replace(/^work-/, 'workplace-')
    .replace(/^partner-/, 'partnership-')
}

function toLieBand(lieState) {
  if (lieState === 'S0' || lieState === 'S1') return 'early'
  if (lieState === 'S2' || lieState === 'S3') return 'mid'
  return 'late'
}

function buildInterrogationKey(party, disputeId, lieState, questionType) {
  return [party, disputeId, lieState, questionType].join('|')
}

function buildEvidencePresentKey(party, evidenceId, lieBand, subjectRole) {
  return [party, evidenceId, lieBand, subjectRole].join('|')
}

function getExpectedSubjectRole(party, evidence) {
  const subjectParty = evidence.subjectParty ?? 'both'
  if (subjectParty === party) return 'self'
  if (subjectParty === 'both') {
    return evidence.provenance === 'institutional' ? 'institutional' : 'both'
  }
  return evidence.provenance === 'institutional' ? 'institutional' : 'other'
}

function main() {
  const manifest = JSON.parse(fs.readFileSync(REFINED_MANIFEST_PATH, 'utf8'))
  const scriptedCases = fs.readdirSync(SCRIPTED_DIR)
    .filter((file) => file.endsWith('.json'))
    .map((file) => path.basename(file, '.json'))
    .filter((caseKey) => !EXCLUDED_CASE_KEYS.has(caseKey))
    .sort()

  const manifestCases = Array.isArray(manifest.refined) ? manifest.refined.slice().sort() : []
  const manifestOnly = manifestCases.filter((caseKey) => !scriptedCases.includes(caseKey))
  const scriptedOnly = scriptedCases.filter((caseKey) => !manifestCases.includes(caseKey))

  const coverage = []
  for (const caseKey of scriptedCases) {
    const generatedPath = path.join(GENERATED_DIR, `${caseKey}.json`)
    const scriptedPath = path.join(SCRIPTED_DIR, `${caseKey}.json`)
    if (!fs.existsSync(generatedPath)) {
      coverage.push({
        caseKey,
        generatedMissing: true,
        missingInterrogation: [],
        missingEvidencePresent: [],
      })
      continue
    }

    const caseData = JSON.parse(fs.readFileSync(generatedPath, 'utf8'))
    const bundle = JSON.parse(fs.readFileSync(scriptedPath, 'utf8'))
    const interrogationKeys = new Set((bundle.channels?.interrogation?.entries ?? []).map((entry) => entry.key))
    const evidencePresentKeys = new Set((bundle.channels?.evidence_present?.entries ?? []).map((entry) => entry.key))

    const missingInterrogation = []
    const missingEvidencePresent = []

    for (const party of ['a', 'b']) {
      for (const dispute of caseData.disputes ?? []) {
        for (const lieState of LIE_STATES) {
          for (const questionType of QUESTION_TYPES) {
            const key = buildInterrogationKey(party, dispute.id, lieState, questionType)
            if (!interrogationKeys.has(key)) missingInterrogation.push(key)
          }
        }
      }

      for (const evidence of caseData.evidence ?? []) {
        for (const lieState of LIE_STATES) {
          const key = buildEvidencePresentKey(
            party,
            evidence.id,
            toLieBand(lieState),
            getExpectedSubjectRole(party, evidence),
          )
          if (!evidencePresentKeys.has(key)) missingEvidencePresent.push(key)
        }
      }
    }

    coverage.push({
      caseKey,
      caseId: normalizeCaseKey(caseData.caseId),
      bundleCaseId: normalizeCaseKey(bundle.caseId),
      generatedMissing: false,
      missingInterrogation,
      missingEvidencePresent,
    })
  }

  const summary = {
    generatedAt: new Date().toISOString(),
    scriptedCaseCount: scriptedCases.length,
    manifestCaseCount: manifestCases.length,
    manifestOnlyCount: manifestOnly.length,
    scriptedOnlyCount: scriptedOnly.length,
    missingInterrogationCaseCount: coverage.filter((item) => item.missingInterrogation.length > 0).length,
    missingEvidencePresentCaseCount: coverage.filter((item) => item.missingEvidencePresent.length > 0).length,
    totalMissingInterrogationKeys: coverage.reduce((sum, item) => sum + item.missingInterrogation.length, 0),
    totalMissingEvidencePresentKeys: coverage.reduce((sum, item) => sum + item.missingEvidencePresent.length, 0),
    manifestOnly,
    scriptedOnly,
    casesWithIssues: coverage.filter((item) => item.generatedMissing || item.missingInterrogation.length > 0 || item.missingEvidencePresent.length > 0),
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(summary, null, 2), 'utf8')
  console.log(JSON.stringify(summary, null, 2))
}

main()
