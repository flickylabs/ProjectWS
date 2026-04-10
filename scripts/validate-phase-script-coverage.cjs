const fs = require('fs')
const path = require('path')

const ROOT = 'D:/ProjectWS'
const MANIFEST_PATH = path.join(ROOT, 'src', 'data', 'cases', 'refined', 'manifest.json')
const PHASE1_DIR = path.join(ROOT, 'src', 'data', 'dialogues', 'phase1')
const PHASE2_DIR = path.join(ROOT, 'src', 'data', 'dialogues', 'phase2')
const OUTPUT_PATH = path.join(ROOT, 'tmp', 'phase-script-coverage-report.json')

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function main() {
  const manifest = readJson(MANIFEST_PATH)
  const refined = Array.isArray(manifest.refined) ? manifest.refined : []
  const missing = []

  for (const caseKey of refined) {
    const hasPhase1 = fs.existsSync(path.join(PHASE1_DIR, `${caseKey}.json`))
    const hasPhase2 = fs.existsSync(path.join(PHASE2_DIR, `${caseKey}.json`))
    if (!hasPhase1 || !hasPhase2) {
      missing.push({ caseKey, hasPhase1, hasPhase2 })
    }
  }

  const report = {
    generatedAt: new Date().toISOString(),
    refinedCount: refined.length,
    missingCount: missing.length,
    missing,
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(report, null, 2), 'utf8')
  console.log(JSON.stringify({
    outputPath: OUTPUT_PATH,
    refinedCount: refined.length,
    missingCount: missing.length,
  }, null, 2))
}

main()
