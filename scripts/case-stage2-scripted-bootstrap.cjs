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

function parseOption(argv, name) {
  const inline = argv.find((item) => item.startsWith(`${name}=`))
  if (inline) return inline.slice(`${name}=`.length)
  const idx = argv.indexOf(name)
  if (idx >= 0 && argv[idx + 1]) return argv[idx + 1]
  return null
}

const ROOT = path.join(__dirname, '..')
const argv = process.argv.slice(2)
const caseId = parseCaseId(argv)
const mode = parseOption(argv, '--mode') || 'auto'
const externalInputPath = parseOption(argv, '--external-input')

if (!caseId) {
  console.error('missing caseId. usage: node scripts/case-stage2-scripted-bootstrap.cjs --case headline-01 [--mode external_scripted_json] [--external-input src/data/scriptedText/external/headline-01.json]')
  process.exit(1)
}

const result = compileScriptedBundle({ root: ROOT, caseId, mode, externalInputPath })
console.log(`[case-stage2-scripted-bootstrap] wrote ${path.relative(ROOT, result.outPath).replace(/\\/g, '/')}`)
console.log(`[case-stage2-scripted-bootstrap] mode=${result.mode}`)
