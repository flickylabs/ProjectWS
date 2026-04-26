#!/usr/bin/env node
'use strict'
const { detectBroadResiduals } = require('./recovery-v5.cjs')
const report = detectBroadResiduals()
console.log(JSON.stringify({
  passed: report.passed,
  matrix: Object.fromEntries(Object.entries(report.matrix).map(([key, value]) => [key, {
    detected: value.detected,
    patchedOrClean: value.patchedOrClean,
    protectedByV4: value.protectedByV4 || 0,
    residual: value.residual,
    appliedRate: value.appliedRate,
  }])),
}, null, 2))
process.exit(report.passed ? 0 : 1)
