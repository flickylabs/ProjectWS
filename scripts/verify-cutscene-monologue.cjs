#!/usr/bin/env node

// Verifies Truth-Reveal cutscene monologue JSON files written by Codex
// threads TR1~TR3 against the master brief
// (docs/design/truth-reveal-cutscene/monologue-brief-master.md).
//
// Checks:
//   1. Coverage    — every (case, disputeId) in the truth-leak matrix has a
//                    JSON file under src/data/cutsceneText/.
//   2. Schema      — each file has the 5 required entries (confession_trust,
//                    slip_explosive {phase1, phase2}, admission_witness_trust,
//                    admission_witness_emotion, closure_truth), all 4 locales
//                    non-empty, and self-consistent disputeId/case fields.
//   3. Length      — KO length within brief gates, foreign locales within
//                    +20% of the KO upper bound, lower bound shared with KO.
//   4. Spouse-01   — slip_phase1.ko must not contain '개인회생' / '형사 절차'
//                    / '시댁' (modulo brief §3.3 keyword policy).
//   5. Slip shape  — phase1 KO ends with the ellipsis '…' (or '...'); phase2
//                    KO contains an em dash '—' (the cut-off marker).
//   6. Linked id   — slip_explosive.linkedDisputeId, when present, must
//                    reference another existing dispute in the same case.
//   7. Spoiler     — slip_phase1.ko must not contain any hidden[ko] keyword
//                    of a *different* dispute in the same case (spoiler).
//
// Findings are graded P0 (release-blocking) or P1 (warning). The script
// exits non-zero in --strict mode iff any P0 finding is produced.

const fs = require('node:fs')
const path = require('node:path')

const ROOT = path.resolve(__dirname, '..')
const DEFAULT_MATRIX = path.join(
  ROOT,
  'docs/localization/non-dialogue-extract/truth-leak-matrix.json',
)
const DEFAULT_OUT = path.join(
  ROOT,
  'docs/localization/non-dialogue-extract/cutscene-monologue-report.json',
)
const DEFAULT_DATA_ROOT = path.join(ROOT, 'src/data/cutsceneText')

const LOCALES = ['ko', 'en', 'ja', 'zh-CN']

const REQUIRED_ENTRIES = [
  'confession_trust',
  'admission_witness_trust',
  'admission_witness_emotion',
  'closure_truth',
]

const LENGTH_GATES = {
  confession_trust: { min: 60, max: 120 },
  slip_phase1: { min: 30, max: 60 },
  slip_phase2: { min: 10, max: 25 },
  admission_witness_trust: { min: 40, max: 80 },
  admission_witness_emotion: { min: 40, max: 80 },
  closure_truth: { min: 50, max: 100 },
}

const SPOUSE01_SLIP_PHASE1_KO_FORBIDDEN = ['개인회생', '형사 절차', '시댁']

main()

function main() {
  const args = parseArgs(process.argv.slice(2))
  const matrixPath = path.resolve(ROOT, args.matrix ?? DEFAULT_MATRIX)
  const dataRoot = path.resolve(ROOT, args.dataRoot ?? DEFAULT_DATA_ROOT)
  const output = path.resolve(ROOT, args.out ?? DEFAULT_OUT)

  if (!fs.existsSync(matrixPath)) {
    throw new Error(`Missing truth-leak matrix: ${rel(matrixPath)}`)
  }

  const matrix = JSON.parse(fs.readFileSync(matrixPath, 'utf8'))
  const expectations = expandExpectations(matrix, args.case)
  const findings = []

  for (const expectation of expectations) {
    verifyOne(expectation, dataRoot, matrix, findings)
  }

  const report = buildReport(findings, expectations, {
    matrix: rel(matrixPath),
    dataRoot: rel(dataRoot),
  })

  if (!fs.existsSync(path.dirname(output))) {
    fs.mkdirSync(path.dirname(output), { recursive: true })
  }
  fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n', 'utf8')
  printSummary(report, output)

  if (args.strict && report.summary.p0 > 0) {
    process.exitCode = 1
  }
}

function expandExpectations(matrix, caseFilter) {
  const expectations = []
  for (const caseId of Object.keys(matrix)) {
    if (caseId.startsWith('_')) continue
    if (caseFilter && caseId !== caseFilter) continue
    for (const disputeId of Object.keys(matrix[caseId])) {
      if (disputeId.startsWith('_')) continue
      expectations.push({ caseId, disputeId })
    }
  }
  return expectations
}

function verifyOne({ caseId, disputeId }, dataRoot, matrix, findings) {
  const filePath = path.join(dataRoot, caseId, `${disputeId}.json`)
  const fileRef = rel(filePath)

  if (!fs.existsSync(filePath)) {
    findings.push({
      severity: 'P0',
      caseId,
      disputeId,
      check: 'coverage',
      file: fileRef,
      message: 'missing cutscene monologue file',
    })
    return
  }

  let parsed
  try {
    parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch (error) {
    findings.push({
      severity: 'P0',
      caseId,
      disputeId,
      check: 'schema:parse',
      file: fileRef,
      message: `invalid JSON: ${error.message}`,
    })
    return
  }

  if (parsed.case !== caseId) {
    findings.push({
      severity: 'P0',
      caseId,
      disputeId,
      check: 'schema:case',
      file: fileRef,
      message: `case field "${parsed.case}" does not match directory "${caseId}"`,
    })
  }
  if (parsed.disputeId !== disputeId) {
    findings.push({
      severity: 'P0',
      caseId,
      disputeId,
      check: 'schema:disputeId',
      file: fileRef,
      message: `disputeId field "${parsed.disputeId}" does not match file name "${disputeId}"`,
    })
  }

  for (const entryKey of REQUIRED_ENTRIES) {
    const entry = parsed[entryKey]
    verifyMonologueEntry(entry, entryKey, {
      caseId,
      disputeId,
      file: fileRef,
      gate: LENGTH_GATES[entryKey],
      findings,
    })
  }

  verifySlipExplosive(parsed.slip_explosive, {
    caseId,
    disputeId,
    file: fileRef,
    matrix,
    findings,
  })
}

function verifyMonologueEntry(entry, entryKey, ctx) {
  const base = {
    caseId: ctx.caseId,
    disputeId: ctx.disputeId,
    check: `entry:${entryKey}`,
    file: ctx.file,
  }

  if (!entry || typeof entry !== 'object') {
    ctx.findings.push({
      severity: 'P0',
      ...base,
      message: `missing or non-object entry "${entryKey}"`,
    })
    return
  }

  for (const lang of LOCALES) {
    const text = entry[lang]
    if (typeof text !== 'string' || text.trim().length === 0) {
      ctx.findings.push({
        severity: 'P0',
        ...base,
        lang,
        message: `empty or non-string value for ${entryKey}.${lang}`,
      })
      continue
    }
    verifyLength(text, entryKey, lang, { ...ctx, base })
  }
}

function verifyLength(text, entryKey, lang, ctx) {
  const gate = ctx.gate
  if (!gate) return
  const length = countChars(text)
  const maxAllowed = lang === 'ko' ? gate.max : Math.ceil(gate.max * 1.2)
  if (length < gate.min) {
    ctx.findings.push({
      severity: 'P1',
      ...ctx.base,
      lang,
      check: `length:${entryKey}`,
      message: `${entryKey}.${lang} is ${length} chars (min ${gate.min})`,
      snippet: compact(text),
    })
  } else if (length > maxAllowed) {
    ctx.findings.push({
      severity: 'P1',
      ...ctx.base,
      lang,
      check: `length:${entryKey}`,
      message: `${entryKey}.${lang} is ${length} chars (max ${maxAllowed})`,
      snippet: compact(text),
    })
  }
}

function verifySlipExplosive(slip, ctx) {
  const baseRef = {
    caseId: ctx.caseId,
    disputeId: ctx.disputeId,
    file: ctx.file,
    check: 'entry:slip_explosive',
  }
  if (!slip || typeof slip !== 'object') {
    ctx.findings.push({ severity: 'P0', ...baseRef, message: 'missing slip_explosive object' })
    return
  }

  for (const phase of ['phase1', 'phase2']) {
    const entry = slip[phase]
    const entryKey = phase === 'phase1' ? 'slip_phase1' : 'slip_phase2'
    if (!entry || typeof entry !== 'object') {
      ctx.findings.push({
        severity: 'P0',
        caseId: ctx.caseId,
        disputeId: ctx.disputeId,
        file: ctx.file,
        check: `entry:${entryKey}`,
        message: `missing slip_explosive.${phase} object`,
      })
      continue
    }
    for (const lang of LOCALES) {
      const text = entry[lang]
      if (typeof text !== 'string' || text.trim().length === 0) {
        ctx.findings.push({
          severity: 'P0',
          caseId: ctx.caseId,
          disputeId: ctx.disputeId,
          file: ctx.file,
          check: `entry:${entryKey}`,
          lang,
          message: `empty or non-string value for slip_explosive.${phase}.${lang}`,
        })
        continue
      }
      verifyLength(text, entryKey, lang, {
        ...ctx,
        gate: LENGTH_GATES[entryKey],
        base: {
          caseId: ctx.caseId,
          disputeId: ctx.disputeId,
          file: ctx.file,
          check: `entry:${entryKey}`,
        },
      })
    }
  }

  const phase1Ko = slip.phase1?.ko
  if (typeof phase1Ko === 'string' && phase1Ko.trim().length > 0) {
    const endsWithEllipsis = /(…|\.\.\.)\s*$/.test(phase1Ko)
    if (!endsWithEllipsis) {
      ctx.findings.push({
        severity: 'P1',
        caseId: ctx.caseId,
        disputeId: ctx.disputeId,
        file: ctx.file,
        check: 'pattern:slip_phase1_ellipsis',
        lang: 'ko',
        message: 'slip_phase1.ko should end with an ellipsis (…/...) per brief §0.B',
        snippet: compact(phase1Ko),
      })
    }
    if (ctx.caseId === 'spouse-01') {
      for (const forbidden of SPOUSE01_SLIP_PHASE1_KO_FORBIDDEN) {
        if (phase1Ko.includes(forbidden)) {
          ctx.findings.push({
            severity: 'P1',
            caseId: ctx.caseId,
            disputeId: ctx.disputeId,
            file: ctx.file,
            check: 'policy:spouse01_slip_phase1',
            lang: 'ko',
            message: `slip_phase1.ko contains forbidden keyword "${forbidden}" (spouse-01 §3.3)`,
            snippet: compact(phase1Ko),
          })
        }
      }
    }
    verifySpoilerKeywords(phase1Ko, ctx)
  }

  const phase2Ko = slip.phase2?.ko
  if (typeof phase2Ko === 'string' && phase2Ko.trim().length > 0) {
    if (!phase2Ko.includes('—')) {
      ctx.findings.push({
        severity: 'P1',
        caseId: ctx.caseId,
        disputeId: ctx.disputeId,
        file: ctx.file,
        check: 'pattern:slip_phase2_emdash',
        lang: 'ko',
        message: 'slip_phase2.ko should contain an em dash (—) marking the cut-off',
        snippet: compact(phase2Ko),
      })
    }
  }

  if (typeof slip.linkedDisputeId === 'string') {
    const linked = slip.linkedDisputeId
    if (linked === ctx.disputeId) {
      ctx.findings.push({
        severity: 'P0',
        caseId: ctx.caseId,
        disputeId: ctx.disputeId,
        file: ctx.file,
        check: 'linked:self',
        message: `slip_explosive.linkedDisputeId "${linked}" is self-referential`,
      })
    } else if (!ctx.matrix[ctx.caseId] || !ctx.matrix[ctx.caseId][linked]) {
      ctx.findings.push({
        severity: 'P0',
        caseId: ctx.caseId,
        disputeId: ctx.disputeId,
        file: ctx.file,
        check: 'linked:missing',
        message: `slip_explosive.linkedDisputeId "${linked}" not found in matrix for ${ctx.caseId}`,
      })
    }
  }
}

function verifySpoilerKeywords(phase1Ko, ctx) {
  const caseNode = ctx.matrix[ctx.caseId]
  if (!caseNode) return
  for (const otherDisputeId of Object.keys(caseNode)) {
    if (otherDisputeId.startsWith('_')) continue
    if (otherDisputeId === ctx.disputeId) continue
    const hidden = caseNode[otherDisputeId]?.hidden?.ko
    if (!Array.isArray(hidden)) continue
    for (const keyword of hidden) {
      if (!keyword) continue
      if (phase1Ko.includes(keyword)) {
        ctx.findings.push({
          severity: 'P1',
          caseId: ctx.caseId,
          disputeId: ctx.disputeId,
          file: ctx.file,
          check: 'spoiler:other_dispute_hidden',
          lang: 'ko',
          message: `slip_phase1.ko leaks hidden keyword "${keyword}" of unrelated dispute ${otherDisputeId}`,
          snippet: compact(phase1Ko),
        })
      }
    }
  }
}

function buildReport(findings, expectations, meta) {
  const summary = {
    expectations: expectations.length,
    files_checked: countCheckedFiles(findings, expectations),
    total: findings.length,
    p0: 0,
    p1: 0,
    byCheck: {},
    byCase: {},
  }
  for (const finding of findings) {
    if (finding.severity === 'P0') summary.p0 += 1
    else if (finding.severity === 'P1') summary.p1 += 1
    summary.byCheck[finding.check] = (summary.byCheck[finding.check] ?? 0) + 1
    summary.byCase[finding.caseId] = (summary.byCase[finding.caseId] ?? 0) + 1
  }
  return {
    generatedAt: new Date().toISOString(),
    matrix: meta.matrix,
    dataRoot: meta.dataRoot,
    summary,
    findings,
  }
}

function countCheckedFiles(findings, expectations) {
  const missing = new Set(
    findings.filter((f) => f.check === 'coverage').map((f) => `${f.caseId}/${f.disputeId}`),
  )
  return expectations.length - missing.size
}

function printSummary(report, output) {
  console.log(`cutscene monologue verify — ${report.summary.files_checked}/${report.summary.expectations} files present`)
  console.log(`findings P0=${report.summary.p0} P1=${report.summary.p1}`)
  console.log(`byCheck=${JSON.stringify(report.summary.byCheck)}`)
  console.log(`byCase=${JSON.stringify(report.summary.byCase)}`)
  console.log(`report=${rel(output)}`)
}

function parseArgs(args) {
  const result = {}
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index]
    if (arg === '--matrix') result.matrix = args[++index]
    else if (arg === '--out') result.out = args[++index]
    else if (arg === '--case') result.case = args[++index]
    else if (arg === '--data-root') result.dataRoot = args[++index]
    else if (arg === '--strict') result.strict = true
    else throw new Error(`Unknown argument: ${arg}`)
  }
  return result
}

function countChars(text) {
  return Array.from(text.trim()).length
}

function compact(value, maxLength = 180) {
  const text = String(value ?? '').replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim().replace(/\n+/g, ' ')
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength - 3)}...`
}

function rel(file) {
  return path.relative(ROOT, file).replace(/\\/g, '/')
}
