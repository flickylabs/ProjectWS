#!/usr/bin/env node
'use strict'
const { runStageAwarePrecheck } = require('./recovery-v4.cjs')
const report = runStageAwarePrecheck({ write: true })
console.log(JSON.stringify({
  passed: report.passed,
  totalVariants: report.counts.total,
  remainingChanges: report.remainingChanges,
  failCount: report.issues.filter((issue) => issue.severity === 'FAIL').length,
}, null, 2))
process.exit(report.passed ? 0 : 1)
