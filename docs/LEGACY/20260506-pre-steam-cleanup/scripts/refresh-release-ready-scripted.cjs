#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { compileScriptedBundle } = require('./lib/compile-scripted-bundle.cjs')

const root = path.resolve(__dirname, '..')
const manifestPath = path.join(root, 'src', 'data', 'cases', 'refined', 'manifest.json')
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')).refined || []

for (const caseId of manifest) {
  compileScriptedBundle({ root, caseId })
  console.log(`[release-scripted] rebuilt ${caseId}`)
}
