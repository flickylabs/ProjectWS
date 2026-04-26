#!/usr/bin/env node
'use strict'
const { runQACoherencePrecheck } = require('./recovery-v4.cjs')
const report = runQACoherencePrecheck({ write: true })
console.log(JSON.stringify({
  passed: report.passed,
  issueCount: report.issues.length,
  checkedDimensions: report.checkedDimensions,
}, null, 2))
process.exit(report.passed ? 0 : 1)
