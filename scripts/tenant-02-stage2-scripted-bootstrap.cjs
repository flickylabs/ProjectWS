#!/usr/bin/env node
const path = require('path')
const { compileScriptedBundle } = require('./lib/compile-scripted-bundle.cjs')

const ROOT = path.join(__dirname, '..')
const CASE_ID = 'tenant-02'
const OUT_PATH = path.join(ROOT, 'src', 'data', 'scriptedText', `${CASE_ID}.json`)

const result = compileScriptedBundle({ root: ROOT, caseId: CASE_ID, outPath: OUT_PATH })
console.log(`[tenant-02-stage2-scripted-bootstrap] wrote ${path.relative(ROOT, result.outPath).replace(/\\/g, '/')}`)
