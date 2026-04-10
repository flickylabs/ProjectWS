#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const SOURCE_CANDIDATES = [
  path.join(ROOT, 'src', 'data', 'cases', 'generated', 'tenant-02.json'),
  path.join(ROOT, 'src', 'data', 'cases', 'original', 'tenant-02.json'),
]
const OUT_PATH = path.join(ROOT, 'src', 'data', 'cases', 'generated', 'tenant-02.json')

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

function findSourcePath() {
  for (const candidate of SOURCE_CANDIDATES) {
    if (fs.existsSync(candidate)) return candidate
  }
  throw new Error('missing tenant-02 source case JSON')
}

function main() {
  const sourcePath = findSourcePath()
  const runtime = readJson(sourcePath)
  runtime.generatedAt = new Date().toISOString()
  runtime.pipelineNotes = [
    'tenant-02 runtime materialized for salvage pilot pipeline.',
    'This runtime step intentionally preserves the existing case structure.',
  ]
  if (!Array.isArray(runtime.baseEvidenceIds) || runtime.baseEvidenceIds.length !== 3) {
    runtime.baseEvidenceIds = deriveBaseEvidenceIds(runtime)
  }
  writeJson(OUT_PATH, runtime)
  process.stdout.write(`[build-pilot-tenant-02-runtime] wrote ${path.relative(ROOT, OUT_PATH).replace(/\\/g, '/')}\n`)
}

main()
