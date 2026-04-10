#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const CASE_ID = 'friend-03'
const SOURCE_PATH = path.join(ROOT, 'src', 'data', 'cases', 'generated', `${CASE_ID}.json`)
const OUT_PATH = SOURCE_PATH

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

function deriveBaseEvidenceIds(runtimeCase) {
  return (runtimeCase.evidence || [])
    .filter((item) =>
      Array.isArray(item.requires) &&
      item.requires.length === 0 &&
      !item.requiredLieState,
    )
    .slice(0, 3)
    .map((item) => item.id)
}

const runtimeCase = readJson(SOURCE_PATH)
runtimeCase.generatedAt = new Date().toISOString()
if (!Array.isArray(runtimeCase.baseEvidenceIds) || runtimeCase.baseEvidenceIds.length !== 3) {
  runtimeCase.baseEvidenceIds = deriveBaseEvidenceIds(runtimeCase)
}
writeJson(OUT_PATH, runtimeCase)
console.log(`[build-pilot-friend-03-runtime] normalized ${path.relative(ROOT, OUT_PATH).replace(/\\/g, '/')}`)
