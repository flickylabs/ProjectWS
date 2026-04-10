#!/usr/bin/env node
const path = require('path')
const { compileRuntimeCase } = require('./lib/compile-runtime-case.cjs')

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
  console.error('missing caseId. usage: node scripts/case-stage1a-runtime.cjs --case headline-01')
  process.exit(1)
}

const result = compileRuntimeCase({ root: ROOT, caseId })
console.log(`[case-stage1a-runtime] wrote ${path.relative(ROOT, result.outPath).replace(/\\/g, '/')}`)
