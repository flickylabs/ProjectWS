#!/usr/bin/env node
'use strict'
const { runComprehensivePrecheck } = require('./recovery-v5.cjs')
const args = new Set(process.argv.slice(2))
const report = runComprehensivePrecheck({
  buildPassed: args.has('--build-passed'),
  tscPassed: args.has('--tsc-passed'),
  requireBuild: args.has('--require-build'),
})
console.log(JSON.stringify({
  passed: report.passed,
  stageAware: report.stageAware,
  qaCoherence: report.qaCoherence,
  metadataPassed: report.metadata.passed,
  v4PreservationPassed: report.v4Preservation.passed,
  broadPassed: report.broad.passed,
  caseDataUntouched: report.caseDataUntouched,
  build: report.build,
  tsc: report.tsc,
}, null, 2))
process.exit(report.passed ? 0 : 1)
