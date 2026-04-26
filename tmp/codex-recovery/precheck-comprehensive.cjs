#!/usr/bin/env node
'use strict'

const { runPrecheck } = require('./recovery-v2.cjs')

const report = runPrecheck({ write: true })
console.log(JSON.stringify({
  passed: report.passed,
  totalVariants: report.counts.total,
  residualTotal: report.residual.total,
  failCount: report.issues.filter((issue) => issue.severity === 'FAIL').length,
  warnCount: report.issues.filter((issue) => issue.severity === 'WARN').length,
  knownIssues: report.knownIssues.length,
}, null, 2))
process.exit(report.passed ? 0 : 1)
