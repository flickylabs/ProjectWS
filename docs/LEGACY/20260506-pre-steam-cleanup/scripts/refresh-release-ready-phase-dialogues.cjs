#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { compileReleasePhaseDialogues } = require('./lib/release-phase-dialogue-builder.cjs')
const { compileHeadlinePhaseDialogues } = require('./lib/headline-phase-dialogue-builder.cjs')

const ROOT = path.join(__dirname, '..')
const MANIFEST_PATH = path.join(ROOT, 'src', 'data', 'cases', 'refined', 'manifest.json')

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function main() {
  const manifest = readJson(MANIFEST_PATH)
  const refined = Array.isArray(manifest.refined) ? manifest.refined : []
  const results = []

  for (const caseKey of refined) {
    const result = caseKey.startsWith('headline-')
      ? compileHeadlinePhaseDialogues(ROOT, caseKey)
      : compileReleasePhaseDialogues(ROOT, caseKey)
    results.push({
      caseKey,
      phase1: path.relative(ROOT, result.phase1OutPath).replace(/\\/g, '/'),
      phase2: path.relative(ROOT, result.phase2OutPath).replace(/\\/g, '/'),
    })
  }

  console.log(JSON.stringify({
    refreshedCount: results.length,
    results,
  }, null, 2))
}

main()
