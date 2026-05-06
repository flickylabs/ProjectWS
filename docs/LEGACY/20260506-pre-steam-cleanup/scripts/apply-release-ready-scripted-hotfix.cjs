#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { applyReleaseReadyScriptedHotfix } = require('./lib/release-ready-scripted-hotfix.cjs')

const root = path.resolve(__dirname, '..')
const manifestPath = path.join(root, 'src', 'data', 'cases', 'refined', 'manifest.json')
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')).refined || []

for (const caseId of manifest) {
  const bundlePath = path.join(root, 'src', 'data', 'scriptedText', `${caseId}.json`)
  const runtimePath = path.join(root, 'src', 'data', 'cases', 'generated', `${caseId}.json`)
  const bundle = JSON.parse(fs.readFileSync(bundlePath, 'utf8'))
  const runtimeCase = JSON.parse(fs.readFileSync(runtimePath, 'utf8'))
  applyReleaseReadyScriptedHotfix({ bundle, runtimeCase })
  fs.writeFileSync(bundlePath, `${JSON.stringify(bundle, null, 2)}\n`, 'utf8')
  console.log(`[release-hotfix] wrote ${caseId}`)
}
