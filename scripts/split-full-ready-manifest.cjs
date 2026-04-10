const fs = require('fs')
const path = require('path')

const ROOT = 'D:/ProjectWS'
const MANIFEST_PATH = path.join(ROOT, 'src', 'data', 'cases', 'refined', 'manifest.json')
const PHASE1_DIR = path.join(ROOT, 'src', 'data', 'dialogues', 'phase1')
const PHASE2_DIR = path.join(ROOT, 'src', 'data', 'dialogues', 'phase2')
const TMP_DIR = path.join(ROOT, 'tmp')
const READY_OUT = path.join(ROOT, 'tmp', 'full-ready-16-manifest.json')
const BACKLOG_OUT = path.join(ROOT, 'tmp', 'backlog-101-manifest.json')
const REPORT_OUT = path.join(ROOT, 'tmp', 'full-ready-split-report-2026-04-10.json')

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2), 'utf8')
}

function stage3Pass(caseKey) {
  const filePath = path.join(TMP_DIR, `${caseKey}-stage3-validate.txt`)
  if (!fs.existsSync(filePath)) return false
  const text = fs.readFileSync(filePath, 'utf8')
  return /summary=\{\}/u.test(text) && /PASS/u.test(text)
}

function main() {
  const manifest = readJson(MANIFEST_PATH)
  const refined = Array.isArray(manifest.refined) ? manifest.refined : []
  const ready = []
  const backlog = []

  for (const caseKey of refined) {
    const hasPhase1 = fs.existsSync(path.join(PHASE1_DIR, `${caseKey}.json`))
    const hasPhase2 = fs.existsSync(path.join(PHASE2_DIR, `${caseKey}.json`))
    const isReady = hasPhase1 && hasPhase2 && stage3Pass(caseKey)
    ;(isReady ? ready : backlog).push(caseKey)
  }

  const readyManifest = { refined: ready, lastUpdated: new Date().toISOString().slice(0, 10) }
  const backlogManifest = { pending: backlog, lastUpdated: new Date().toISOString().slice(0, 10) }

  writeJson(READY_OUT, readyManifest)
  writeJson(BACKLOG_OUT, backlogManifest)
  writeJson(MANIFEST_PATH, readyManifest)
  writeJson(REPORT_OUT, {
    generatedAt: new Date().toISOString(),
    readyCount: ready.length,
    backlogCount: backlog.length,
    ready,
    backlog,
  })

  console.log(JSON.stringify({
    manifestPath: MANIFEST_PATH,
    readyOut: READY_OUT,
    backlogOut: BACKLOG_OUT,
    reportOut: REPORT_OUT,
    readyCount: ready.length,
    backlogCount: backlog.length,
  }, null, 2))
}

main()
