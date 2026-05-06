#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { applyReleaseReadyScriptedHotfix } = require('./lib/release-ready-scripted-hotfix.cjs')

const root = path.resolve(__dirname, '..')
const caseId = process.argv[2]
if (!caseId) {
  console.error('usage: node scripts/test-release-hotfix-case.cjs <caseId>')
  process.exit(1)
}

const bundlePath = path.join(root, 'src', 'data', 'scriptedText', `${caseId}.json`)
const runtimePath = path.join(root, 'src', 'data', 'cases', 'generated', `${caseId}.json`)
const bundle = JSON.parse(fs.readFileSync(bundlePath, 'utf8'))
const runtimeCase = JSON.parse(fs.readFileSync(runtimePath, 'utf8'))
applyReleaseReadyScriptedHotfix({ bundle, runtimeCase })
const serialized = JSON.stringify(bundle)
const checks = [
  { token: '회의을', count: (serialized.match(/회의을/gu) || []).length },
  { token: '과에는', count: (serialized.match(/과에는/gu) || []).length },
  { token: '와에는', count: (serialized.match(/와에는/gu) || []).length },
  { token: '제 아내은', count: (serialized.match(/제 아내은/gu) || []).length },
  { token: '제 남편는', count: (serialized.match(/제 남편는/gu) || []).length },
]
console.log(JSON.stringify({ caseId, checks }, null, 2))
