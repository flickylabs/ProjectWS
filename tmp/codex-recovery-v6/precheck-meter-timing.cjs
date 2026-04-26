#!/usr/bin/env node
'use strict'
const { runMeterTimingPrecheck } = require('./recovery-v6.cjs')
const report = runMeterTimingPrecheck()
console.log(JSON.stringify({
  passed: report.passed,
  issueCount: report.issueCount ?? report.hardIssueCount ?? (report.hardIssues ? report.hardIssues.length : 0),
  candidateIssueCount: report.candidateIssueCount ?? (report.candidateIssues ? report.candidateIssues.length : 0),
}, null, 2))
process.exit(report.passed ? 0 : 1)
