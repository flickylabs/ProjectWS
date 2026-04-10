#!/usr/bin/env node
const path = require('path')
const { compileScriptedBundle } = require('./lib/compile-scripted-bundle.cjs')

function parseCaseId(argv) {
  const argCase = argv.find((item) => item.startsWith('--case='))
  if (argCase) return argCase.slice('--case='.length)
  const idx = argv.indexOf('--case')
  if (idx >= 0 && argv[idx + 1]) return argv[idx + 1]
  return argv[0] || null
}

const ROOT = path.join(__dirname, '..')
const caseId = parseCaseId(process.argv.slice(2))

if (!caseId) {
  console.error('missing caseId. usage: node scripts/headline-stage2-scripted-bootstrap.cjs --case headline-02')
  process.exit(1)
}

const result = compileScriptedBundle({ root: ROOT, caseId })
console.log(`[headline-stage2-scripted-bootstrap] wrote ${path.relative(ROOT, result.outPath).replace(/\\/g, '/')}`)
