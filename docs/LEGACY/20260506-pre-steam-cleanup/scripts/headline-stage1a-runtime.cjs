#!/usr/bin/env node
const path = require('path')
const { compileHeadlineRuntime } = require('./lib/headline-spec-compiler.cjs')

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
  console.error('missing caseId. usage: node scripts/headline-stage1a-runtime.cjs --case headline-02')
  process.exit(1)
}

const result = compileHeadlineRuntime(ROOT, caseId)
console.log(`[headline-stage1a-runtime] wrote ${path.relative(ROOT, result.outPath)}`)
