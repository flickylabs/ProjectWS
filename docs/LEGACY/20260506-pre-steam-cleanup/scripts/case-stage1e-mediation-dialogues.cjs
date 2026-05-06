#!/usr/bin/env node
const path = require('path')
const { compileMediationDialogues } = require('./lib/mediation-dialogue-builder.cjs')

function parseCaseId(argv) {
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--case') return argv[i + 1]
  }
  return null
}

const caseKey = parseCaseId(process.argv.slice(2))
if (!caseKey) {
  throw new Error('usage: node scripts/case-stage1e-mediation-dialogues.cjs --case <case-id>')
}

const ROOT = path.join(__dirname, '..')
const result = compileMediationDialogues(ROOT, caseKey)

console.log(`[case-stage1e-mediation-dialogues] caseId=${result.caseId}`)
console.log(`[case-stage1e-mediation-dialogues] out=${path.relative(ROOT, result.outPath).replace(/\\/g, '/')}`)
