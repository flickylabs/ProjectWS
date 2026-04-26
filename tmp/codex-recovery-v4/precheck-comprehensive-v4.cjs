#!/usr/bin/env node
'use strict'
const { runComprehensivePrecheck } = require('./recovery-v4.cjs')
const args = new Set(process.argv.slice(2))
const report = runComprehensivePrecheck({
  buildPassed: args.has('--build-passed'),
  tscPassed: args.has('--tsc-passed'),
  requireBuild: args.has('--require-build'),
})
console.log(JSON.stringify(report, null, 2))
process.exit(report.passed ? 0 : 1)
