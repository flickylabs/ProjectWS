const fs = require('fs')
const path = require('path')
const ts = require('typescript')

const ROOT = path.join(__dirname, '..')
const CASES = {
  'spouse-01': {
    testimonyFile: path.join(ROOT, 'src/data/witnessTestimonyData/spouse-01.ts'),
    testimonyExport: 'SPOUSE_01_TESTIMONY',
    v3File: path.join(ROOT, 'docs/ref/리뉴얼참고/spouse-v3-01-v3-game-loop-data.json'),
  },
  'friend-01': {
    testimonyFile: path.join(ROOT, 'src/data/witnessTestimonyData/friend-01.ts'),
    testimonyExport: 'FRIEND_01_TESTIMONY',
    v3TsFile: path.join(ROOT, 'docs/ref/리뉴얼참고/gpt-batch/friend-01/friend-01-v3-game-loop-data.ts'),
    v3Export: 'friend01V3GameLoopData',
  },
  'family-01': {
    testimonyFile: path.join(ROOT, 'src/data/witnessTestimonyData/family-01.ts'),
    testimonyExport: 'FAMILY_01_TESTIMONY',
    v3TsFile: path.join(ROOT, 'docs/ref/리뉴얼참고/gpt-session2/output/family-01-v3-game-loop-data.ts'),
    v3Export: 'family01V3GameLoopData',
  },
}

const REQUIRED_VERDICT_OPTION_KEYS = ['wrong', 'partial', 'truth', 'defer']
const REQUIRED_SPOUSE_VIEWERS = ['receipt', 'gps_log', 'bank', 'chat', 'contract', 'log', 'device']

async function importTsExport(filePath, exportName) {
  const source = fs.readFileSync(filePath, 'utf8')
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText
  const url = `data:text/javascript;base64,${Buffer.from(transpiled).toString('base64')}`
  const mod = await import(url)
  return mod[exportName]
}

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function dataKey(viewerData) {
  return Object.keys(viewerData || {}).find((key) => key !== 'meta' && key !== 'media')
}

function addIssue(issues, level, check, caseId, detail) {
  issues.push({ level, check, caseId, detail })
}

function allPass(checks) {
  return Object.values(checks).every((entry) => entry.pass)
}

function buildEmptyChecks(ids) {
  return Object.fromEntries(ids.map((id) => [id, { pass: true, issues: [] }]))
}

function readViewerSource() {
  return fs.readFileSync(path.join(ROOT, 'src/components/pc/evidence/PCEvidenceViewer.tsx'), 'utf8')
}

function convertDossierLegacyPrefix(dossierQuestionId) {
  if (!dossierQuestionId) return dossierQuestionId
  if (/^dossier-\d+/.test(dossierQuestionId)) {
    return dossierQuestionId.replace(/^dossier-(\d+)/, 'dc-$1')
  }
  if (/^dc-\d+/.test(dossierQuestionId)) {
    return dossierQuestionId.replace(/^dc-(\d+)/, 'dossier-$1')
  }
  return dossierQuestionId
}

function getDossierCandidateIds(dossierQuestionId) {
  const seeds = [...new Set([
    dossierQuestionId,
    convertDossierLegacyPrefix(dossierQuestionId),
  ].filter(Boolean))]
  const candidates = []
  for (const seed of seeds) {
    const parts = seed.split('.')
    candidates.push(seed)
    if (parts.length >= 2) candidates.push(parts.slice(0, 2).join('.'))
    if (parts.length >= 1) candidates.push(parts[0])
  }
  return [...new Set(candidates.filter(Boolean))]
}

async function loadV3Data(cfg) {
  if (cfg.v3TsFile && cfg.v3Export) {
    return importTsExport(cfg.v3TsFile, cfg.v3Export)
  }
  return loadJson(cfg.v3File)
}

function auditSpouseViewerData(caseData, viewerSource) {
  const checks = buildEmptyChecks(['3-1', '3-2', '3-3', '3-4', '3-5', '3-6', '3-7', '3-8'])
  const evidenceById = Object.fromEntries((caseData.evidence || []).map((item) => [item.id, item]))

  const receiptRows = evidenceById['e-1']?.viewerData?.receipt ?? []
  if (!Array.isArray(receiptRows) || receiptRows.length !== 5 || receiptRows.some((row) => !row.storeName || !row.items || !row.total || !row.paymentMethod)) {
    checks['3-1'].pass = false
    checks['3-1'].issues.push('e-1 receipt 배열/필수 필드 불일치')
  }

  const gpsRows = evidenceById['e-2']?.viewerData?.gps_log ?? []
  if (!Array.isArray(gpsRows) || gpsRows.length !== 18 || gpsRows.some((row) => row.timestamp == null || row.lat == null || row.lng == null || row.speed == null || !row.location)) {
    checks['3-2'].pass = false
    checks['3-2'].issues.push('e-2 gps_log 배열/필수 필드 불일치')
  }

  const logRows = evidenceById['e-3']?.viewerData?.log?.rows ?? []
  if (!Array.isArray(logRows) || logRows.length !== 10 || logRows.some((row) => !['out', 'in', 'miss'].includes(row.type))) {
    checks['3-3'].pass = false
    checks['3-3'].issues.push('e-3 log.rows 배열/통화 타입 불일치')
  }

  const smsRows = evidenceById['e-4']?.viewerData?.chat?.messages ?? []
  if (!Array.isArray(smsRows) || smsRows.length === 0 || smsRows.some((row) => {
    if (row.type === 'read' || row.type === 'deleted') return false
    return !['left', 'right'].includes(row.side)
  })) {
    checks['3-4'].pass = false
    checks['3-4'].issues.push('e-4 chat.messages 구조 불일치')
  }

  const bankRows = evidenceById['e-5']?.viewerData?.bank ?? []
  if (!Array.isArray(bankRows) || bankRows.length !== 11 || bankRows.some((row) => row.amount == null || row.balance == null)) {
    checks['3-5'].pass = false
    checks['3-5'].issues.push('e-5 bank 배열/금액 필드 불일치')
  }

  const kakaoRows = evidenceById['e-6']?.viewerData?.chat?.messages ?? []
  if (!Array.isArray(kakaoRows) || kakaoRows.length === 0) {
    checks['3-6'].pass = false
    checks['3-6'].issues.push('e-6 chat.messages 누락')
  }

  const contractRows = evidenceById['e-7']?.viewerData?.contract?.rows ?? []
  if (!Array.isArray(contractRows) || contractRows.length === 0) {
    checks['3-7'].pass = false
    checks['3-7'].issues.push('e-7 contract.rows 누락')
  }

  const routingCases = REQUIRED_SPOUSE_VIEWERS.filter((key) => !viewerSource.includes(`case '${key}'`))
  if (routingCases.length > 0) {
    checks['3-8'].pass = false
    checks['3-8'].issues.push(`PCEvidenceViewer switch 미지원: ${routingCases.join(', ')}`)
  }

  return checks
}

async function auditCase(caseId) {
  const cfg = CASES[caseId]
  const caseData = loadJson(path.join(ROOT, 'src/data/cases/generated', `${caseId}.json`))
  const scripted = loadJson(path.join(ROOT, 'src/data/scriptedText', `${caseId}.json`))
  const v3Data = await loadV3Data(cfg)
  const testimonySlots = await importTsExport(cfg.testimonyFile, cfg.testimonyExport)

  const disputes = new Set((caseData.disputes || []).map((item) => item.id))
  const evidenceIds = new Set((caseData.evidence || []).map((item) => item.id))
  const activeWitnessIds = new Set(caseData.activeThirdParties || [])
  const testimonyIds = new Set(testimonySlots.map((item) => item.id))
  const v3QuestionIds = new Set((v3Data.dossierCards || []).flatMap((card) => (card.challenges || []).flatMap((challenge) => (challenge.questions || []).map((question) => question.id))))
  const v3CardIds = new Set((v3Data.dossierCards || []).map((card) => card.id))
  const validDossierIds = new Set([
    ...[...v3QuestionIds].flatMap((id) => getDossierCandidateIds(id)),
    ...[...v3CardIds].flatMap((id) => getDossierCandidateIds(id)),
  ])

  const level1 = buildEmptyChecks(['1-1', '1-2', '1-3', '1-4', '1-5'])
  const level2 = buildEmptyChecks(['2-1', '2-2', '2-3', '2-4', '2-5', '2-6', '2-7', '2-8', '2-9', '2-10'])

  for (const ev of caseData.evidence || []) {
    for (const disputeId of ev.proves || []) {
      if (!disputes.has(disputeId)) {
        level1['1-1'].pass = false
        level1['1-1'].issues.push(`${ev.id}.proves -> ${disputeId}`)
      }
    }
    for (const requiredId of ev.requires || []) {
      if (!evidenceIds.has(requiredId)) {
        level1['1-2'].pass = false
        level1['1-2'].issues.push(`${ev.id}.requires -> ${requiredId}`)
      }
    }
  }

  for (const entry of [...(caseData.lieConfigA || []), ...(caseData.lieConfigB || [])]) {
    if (!disputes.has(entry.disputeId)) {
      level1['1-1'].pass = false
      level1['1-1'].issues.push(`lieConfig -> ${entry.disputeId}`)
    }
  }

  for (const evidenceId of caseData.baseEvidenceIds || []) {
    if (!evidenceIds.has(evidenceId)) {
      level1['1-2'].pass = false
      level1['1-2'].issues.push(`baseEvidenceIds -> ${evidenceId}`)
    }
  }

  for (const combo of caseData.evidenceCombinations || []) {
    for (const evidenceId of combo.requires || []) {
      if (!evidenceIds.has(evidenceId)) {
        level1['1-2'].pass = false
        level1['1-2'].issues.push(`evidenceCombinations.requires -> ${evidenceId}`)
      }
    }
  }

  for (const witnessId of activeWitnessIds) {
    if (!testimonySlots.some((slot) => slot.witnessId === witnessId)) {
      level1['1-3'].pass = false
      level1['1-3'].issues.push(`activeThirdParties -> ${witnessId}`)
    }
  }

  for (const dispute of caseData.disputes || []) {
    const missing = REQUIRED_VERDICT_OPTION_KEYS.filter((key) => !dispute.verdictOptions?.[key])
    if (missing.length > 0) {
      level1['1-5'].pass = false
      level1['1-5'].issues.push(`${dispute.id}.verdictOptions -> ${missing.join(', ')}`)
    }
  }

  for (const entry of scripted.channels.interrogation.entries || []) {
    const expected = `${entry.party}|${entry.disputeId}|${entry.lieState}|${entry.questionType}`
    if (entry.key !== expected || !disputes.has(entry.disputeId)) {
      level1['1-4'].pass = false
      level1['1-4'].issues.push(`interrogation ${entry.key}`)
    }
  }
  for (const entry of scripted.channels.evidence_present.entries || []) {
    const expected = `${entry.party}|${entry.evidenceId}|${entry.lieBand}|${entry.subjectRole}`
    if (entry.key !== expected || !evidenceIds.has(entry.evidenceId)) {
      level1['1-4'].pass = false
      level1['1-4'].issues.push(`evidence_present ${entry.key}`)
    }
  }
  for (const entry of scripted.channels.dossier.entries || []) {
    const expected = `${entry.party}|${entry.dossierQuestionId}|${entry.lieBand}`
    if (entry.key !== expected || !validDossierIds.has(entry.dossierQuestionId)) {
      level1['1-4'].pass = false
      level1['1-4'].issues.push(`dossier ${entry.key}`)
    }
  }
  for (const entry of scripted.channels.witness.entries || []) {
    const expected = `${entry.witnessId}|${entry.depth}`
    if (entry.key !== expected || !activeWitnessIds.has(entry.witnessId)) {
      level1['1-4'].pass = false
      level1['1-4'].issues.push(`witness ${entry.key}`)
    }
  }

  const duplicateIds = testimonySlots.map((slot) => slot.id).filter((id, index, arr) => arr.indexOf(id) !== index)
  if (duplicateIds.length > 0) {
    level2['2-1'].pass = false
    level2['2-1'].issues.push(...duplicateIds)
  }

  for (const slot of testimonySlots) {
    if (!/^w-[1-3]$/.test(slot.witnessId) || !activeWitnessIds.has(slot.witnessId)) {
      level2['2-2'].pass = false
      level2['2-2'].issues.push(`${slot.id} -> ${slot.witnessId}`)
    }
    if (![1, 2, 3].includes(slot.depth)) {
      level2['2-3'].pass = false
      level2['2-3'].issues.push(`${slot.id} -> ${slot.depth}`)
    }
    if (slot.conditions?.prevSlotRequired && !testimonyIds.has(slot.conditions.prevSlotRequired)) {
      level2['2-4'].pass = false
      level2['2-4'].issues.push(`${slot.id} -> ${slot.conditions.prevSlotRequired}`)
    }
    if (slot.conditions?.prevChoiceRequired && !testimonyIds.has(slot.conditions.prevChoiceRequired)) {
      level2['2-5'].pass = false
      level2['2-5'].issues.push(`${slot.id} -> ${slot.conditions.prevChoiceRequired}`)
    }
    if (slot.conditions?.disputeState?.id && !disputes.has(slot.conditions.disputeState.id)) {
      level2['2-6'].pass = false
      level2['2-6'].issues.push(`${slot.id} -> ${slot.conditions.disputeState.id}`)
    }
    if (slot.effect?.lieStateNudge?.dispute && !disputes.has(slot.effect.lieStateNudge.dispute)) {
      level2['2-7'].pass = false
      level2['2-7'].issues.push(`${slot.id} -> ${slot.effect.lieStateNudge.dispute}`)
    }
    for (const disputeId of slot.effect?.relatedDisputes || []) {
      if (!disputes.has(disputeId)) {
        level2['2-8'].pass = false
        level2['2-8'].issues.push(`${slot.id} -> ${disputeId}`)
      }
    }
    if (slot.effect?.emergenceTrigger) {
      const dispute = (caseData.disputes || []).find((item) => item.id === slot.effect.emergenceTrigger)
      if (!dispute?.hidden) {
        level2['2-10'].pass = false
        level2['2-10'].issues.push(`${slot.id} -> ${slot.effect.emergenceTrigger}`)
      }
    }
  }

  const slotsByWitness = testimonySlots.reduce((acc, slot) => {
    if (!acc[slot.witnessId]) acc[slot.witnessId] = []
    acc[slot.witnessId].push(slot)
    return acc
  }, {})

  for (const [witnessId, slots] of Object.entries(slotsByWitness)) {
    const depths = new Set(slots.map((slot) => slot.depth))
    if (![1, 2, 3].every((depth) => depths.has(depth))) {
      level2['2-9'].pass = false
      level2['2-9'].issues.push(`${witnessId} -> depth ${[...depths].sort().join(',')}`)
    }
    const missingPrevSlot = slots
      .filter((slot) => slot.depth === 2 && !slot.conditions?.prevSlotRequired)
      .map((slot) => slot.id)
    if (missingPrevSlot.length > 0) {
      level2['2-9'].pass = false
      level2['2-9'].issues.push(`${witnessId} -> ${missingPrevSlot.join(', ')}`)
    }
  }

  return {
    caseId,
    level1,
    level2,
  }
}

async function main() {
  const viewerSource = readViewerSource()
  const cases = Object.keys(CASES)
  const audits = await Promise.all(cases.map(auditCase))
  const spouseCase = loadJson(path.join(ROOT, 'src/data/cases/generated/spouse-01.json'))
  const level3 = auditSpouseViewerData(spouseCase, viewerSource)

  const summary = {
    generatedAt: new Date().toISOString(),
    commit: process.env.GIT_COMMIT || null,
    cases: audits,
    level3,
    pass: audits.every((audit) => allPass(audit.level1) && allPass(audit.level2)) && allPass(level3),
  }

  if (process.argv.includes('--json')) {
    console.log(JSON.stringify(summary, null, 2))
    return
  }

  console.log('Thread Q V5 Audit')
  for (const audit of audits) {
    console.log(`\n[${audit.caseId}]`)
    for (const [level, checks] of Object.entries({ level1: audit.level1, level2: audit.level2 })) {
      console.log(`  ${level}: ${allPass(checks) ? 'PASS' : 'FAIL'}`)
      for (const [checkId, result] of Object.entries(checks)) {
        console.log(`    ${checkId}: ${result.pass ? 'PASS' : 'FAIL'}${result.issues.length ? ` (${result.issues.join('; ')})` : ''}`)
      }
    }
  }

  console.log(`\n[spouse-01 viewerData] ${allPass(level3) ? 'PASS' : 'FAIL'}`)
  for (const [checkId, result] of Object.entries(level3)) {
    console.log(`  ${checkId}: ${result.pass ? 'PASS' : 'FAIL'}${result.issues.length ? ` (${result.issues.join('; ')})` : ''}`)
  }

  console.log(`\nOverall: ${summary.pass ? 'PASS' : 'FAIL'}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
