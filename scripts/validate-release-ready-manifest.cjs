const fs = require('fs')
const path = require('path')

const ROOT = 'D:/ProjectWS'
const MANIFEST_PATH = path.join(ROOT, 'src', 'data', 'cases', 'refined', 'manifest.json')
const OUTPUT_PATH = path.join(ROOT, 'tmp', 'release-ready-manifest-audit-2026-04-10.json')

const REQUIRED_DIRS = {
  generated: path.join(ROOT, 'src', 'data', 'cases', 'generated'),
  scripted: path.join(ROOT, 'src', 'data', 'scriptedText'),
  phase1: path.join(ROOT, 'src', 'data', 'dialogues', 'phase1'),
  phase2: path.join(ROOT, 'src', 'data', 'dialogues', 'phase2'),
  mediation: path.join(ROOT, 'src', 'data', 'dialogues', 'mediation'),
}

const PHASE_TEXT_SCAFFOLD_PATTERN = /(request_|restore_|check_|unlock_|fact_pursuit|motive_search|empathy_approach|timeline|responsibility|legality|attackVector|TODO|FIXME|placeholder|shell|entry\s+\d+|screen\s+\d+|log\s+shell|doc\s+\d+)/i
const TEXT_CORRUPTION_PATTERN = /[�]|\u0000|占\?/i

function readText(filePath) {
  const buffer = fs.readFileSync(filePath)
  if (buffer.length >= 2 && buffer[0] === 0xff && buffer[1] === 0xfe) {
    return buffer.slice(2).toString('utf16le')
  }

  if (buffer.length >= 2 && buffer[0] === 0xfe && buffer[1] === 0xff) {
    const swapped = Buffer.allocUnsafe(buffer.length - 2)
    for (let i = 2; i < buffer.length; i += 2) {
      swapped[i - 2] = buffer[i + 1]
      swapped[i - 1] = buffer[i]
    }
    return swapped.toString('utf16le')
  }

  const utf8 = buffer.toString('utf8')
  const nullCount = (utf8.match(/\u0000/g) || []).length
  if (nullCount > 8) {
    return buffer.toString('utf16le')
  }

  return utf8
}

function readJson(filePath) {
  return JSON.parse(readText(filePath))
}

function exists(filePath) {
  return fs.existsSync(filePath)
}

function parseSummary(text) {
  const match = text.match(/summary=(\{[^\r\n]*\})/)
  if (!match) return null
  try {
    return JSON.parse(match[1])
  } catch {
    return null
  }
}

function validatePhaseDialogues(caseKey, phaseName, filePath) {
  const issues = []
  if (!exists(filePath)) {
    issues.push({ type: 'missing_phase_file', phase: phaseName, filePath })
    return issues
  }

  const data = readJson(filePath)
  const dialogues = Array.isArray(data.dialogues) ? data.dialogues : []
  if (dialogues.length < 4) {
    issues.push({ type: 'too_few_dialogues', phase: phaseName, count: dialogues.length, filePath })
  }

  dialogues.forEach((dialogue, index) => {
    const text = String(dialogue?.text || '').trim()
    if (!text) {
      issues.push({ type: 'empty_dialogue', phase: phaseName, index, filePath })
      return
    }

    if (text.length < 8) {
      issues.push({ type: 'too_short_dialogue', phase: phaseName, index, text, filePath })
    }

    if (PHASE_TEXT_SCAFFOLD_PATTERN.test(text)) {
      issues.push({ type: 'scaffold_token', phase: phaseName, index, text, filePath })
    }

    if (TEXT_CORRUPTION_PATTERN.test(text)) {
      issues.push({ type: 'corrupted_text', phase: phaseName, index, text, filePath })
    }
  })

  return issues
}

function checkValidateLog(caseKey, suffix) {
  const filePath = path.join(ROOT, 'tmp', `${caseKey}-${suffix}.txt`)
  if (!exists(filePath)) {
    return { ok: false, reason: 'missing_log', filePath }
  }

  const text = readText(filePath)
  const summary = parseSummary(text)
  if (!summary) {
    const ok = /PASS/.test(text)
    return { ok, reason: ok ? 'pass' : 'non_pass', filePath, summary: null }
  }

  const failCount = Number(summary.FAIL || 0) + Number(summary.CRITICAL || 0)
  const warnCount = Number(summary.WARN || 0)
  const ok = failCount === 0

  return {
    ok,
    reason: ok ? (warnCount > 0 ? 'pass_with_warn' : 'pass') : 'non_pass',
    filePath,
    summary,
  }
}

function main() {
  const manifest = readJson(MANIFEST_PATH)
  const refined = Array.isArray(manifest.refined) ? manifest.refined : []

  const report = {
    auditedAt: new Date().toISOString(),
    caseCount: refined.length,
    passCount: 0,
    failCount: 0,
    cases: [],
  }

  for (const caseKey of refined) {
    const caseReport = {
      caseKey,
      files: {},
      phaseIssues: [],
      logs: {},
      ok: true,
    }

    for (const [kind, dirPath] of Object.entries(REQUIRED_DIRS)) {
      const filePath = path.join(dirPath, `${caseKey}.json`)
      caseReport.files[kind] = { filePath, exists: exists(filePath) }
      if (!caseReport.files[kind].exists) {
        caseReport.ok = false
      }
    }

    caseReport.phaseIssues.push(
      ...validatePhaseDialogues(caseKey, 'phase1', caseReport.files.phase1.filePath),
      ...validatePhaseDialogues(caseKey, 'phase2', caseReport.files.phase2.filePath),
    )
    if (caseReport.phaseIssues.length > 0) {
      caseReport.ok = false
    }

    caseReport.logs.semantic = checkValidateLog(caseKey, 'semantic-validate')
    caseReport.logs.stage3 = checkValidateLog(caseKey, 'stage3-validate')
    if (!caseReport.logs.semantic.ok || !caseReport.logs.stage3.ok) {
      caseReport.ok = false
    }

    if (caseReport.ok) report.passCount += 1
    else report.failCount += 1

    report.cases.push(caseReport)
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(report, null, 2), 'utf8')
  console.log(JSON.stringify({
    outputPath: OUTPUT_PATH,
    caseCount: report.caseCount,
    passCount: report.passCount,
    failCount: report.failCount,
  }, null, 2))

  if (report.failCount > 0) process.exitCode = 1
}

main()
