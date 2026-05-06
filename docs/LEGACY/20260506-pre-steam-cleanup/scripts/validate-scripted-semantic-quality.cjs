#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const {
  gatherSemanticIssues,
  readJson,
  summarizeIssues,
} = require('./lib/scripted-semantic-rules.cjs')

function parseCaseId(argv) {
  const argCase = argv.find((item) => item.startsWith('--case='))
  if (argCase) return argCase.slice('--case='.length)
  const idx = argv.indexOf('--case')
  if (idx >= 0 && argv[idx + 1]) return argv[idx + 1]
  return argv[0] || null
}

function main() {
  const root = path.join(__dirname, '..')
  const caseId = parseCaseId(process.argv.slice(2))

  if (!caseId) {
    console.error('missing caseId. usage: node scripts/validate-scripted-semantic-quality.cjs --case spouse-11')
    process.exit(1)
  }

  const bundlePath = path.join(root, 'src', 'data', 'scriptedText', `${caseId}.json`)
  const runtimePath = path.join(root, 'src', 'data', 'cases', 'generated', `${caseId}.json`)

  if (!fs.existsSync(bundlePath)) {
    console.error(`[scripted-semantic-quality] missing scripted bundle: ${path.relative(root, bundlePath)}`)
    process.exit(1)
  }
  if (!fs.existsSync(runtimePath)) {
    console.error(`[scripted-semantic-quality] missing runtime case: ${path.relative(root, runtimePath)}`)
    process.exit(1)
  }

  const bundle = readJson(fs, bundlePath)
  const runtimeCase = readJson(fs, runtimePath)
  const issues = gatherSemanticIssues({ bundle, runtimeCase })
  const summary = summarizeIssues(issues)

  console.log(`[scripted-semantic-quality] case=${caseId}`)
  for (const issue of issues) {
    console.log(`${issue.severity} ${issue.code} ${issue.message}`)
  }
  console.log(`summary=${JSON.stringify(summary)}`)
  console.log(summary.FAIL ? 'FAIL' : 'PASS')
  process.exit(summary.FAIL ? 1 : 0)
}

if (require.main === module) {
  main()
}

module.exports = {
  validateScriptedSemanticQuality: gatherSemanticIssues,
}
