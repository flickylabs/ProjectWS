const fs = require('fs')
const path = require('path')

const ROOT = 'D:/ProjectWS'
const MANIFEST_PATH = path.join(ROOT, 'src', 'data', 'cases', 'refined', 'manifest.json')
const OUTPUT_PATH = path.join(ROOT, 'tmp', 'phase-dialogue-quality-report-2026-04-10.json')

const BAD_PATTERNS = [
  { type: 'meta_dispute_label', regex: /‘[^’]{4,80}’ 문제/u },
  { type: 'scaffold_three_branches', regex: /세 갈래/u },
  { type: 'scaffold_result_side', regex: /결과 쪽/u },
  { type: 'scaffold_process_side', regex: /경위 쪽/u },
  { type: 'broken_particle', regex: /문제[이를과을]\b/u },
  { type: 'truncated_artifact', regex: /… 때문에|연…라는|독… 때문에/u },
]

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function collectDialogueIssues(caseKey, phase, dialogues) {
  const issues = []
  const aOpen = dialogues.find((entry) => entry.speaker === 'a')?.text?.trim() || ''
  const bOpen = dialogues.find((entry) => entry.speaker === 'b')?.text?.trim() || ''
  if (aOpen && bOpen && aOpen === bOpen) {
    issues.push({
      type: 'identical_party_openers',
      phase,
      text: aOpen,
    })
  }

  dialogues.forEach((entry, index) => {
    const text = String(entry?.text || '')
    for (const pattern of BAD_PATTERNS) {
      if (pattern.regex.test(text)) {
        issues.push({
          type: pattern.type,
          phase,
          index,
          speaker: entry?.speaker || 'unknown',
          text,
        })
      }
    }
  })

  return issues
}

function main() {
  const manifest = readJson(MANIFEST_PATH)
  const refined = Array.isArray(manifest.refined) ? manifest.refined : []
  const cases = []

  for (const caseKey of refined) {
    const phase1Path = path.join(ROOT, 'src', 'data', 'dialogues', 'phase1', `${caseKey}.json`)
    const phase2Path = path.join(ROOT, 'src', 'data', 'dialogues', 'phase2', `${caseKey}.json`)
    const phase1 = readJson(phase1Path).dialogues || []
    const phase2 = readJson(phase2Path).dialogues || []
    const issues = [
      ...collectDialogueIssues(caseKey, 'phase1', phase1),
      ...collectDialogueIssues(caseKey, 'phase2', phase2),
    ]
    cases.push({ caseKey, issueCount: issues.length, issues })
  }

  const report = {
    auditedAt: new Date().toISOString(),
    caseCount: cases.length,
    failCount: cases.filter((item) => item.issueCount > 0).length,
    cases,
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(report, null, 2), 'utf8')
  console.log(JSON.stringify({
    outputPath: OUTPUT_PATH,
    caseCount: report.caseCount,
    failCount: report.failCount,
  }, null, 2))

  if (report.failCount > 0) process.exitCode = 1
}

main()
