#!/usr/bin/env node
'use strict'

const fs = require('node:fs')
const path = require('node:path')

const {
  applyRound,
  buildFactMatrix,
  createPolishCandidates,
  detectAll,
  readBundles,
  residualSummary,
  runPrecheck,
  summarizeProposals,
  writeBundles,
} = require('./recovery-v2.cjs')

const OUT_DIR = __dirname

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

function run() {
  const dir = path.join(OUT_DIR, 'final-hardening')
  fs.mkdirSync(dir, { recursive: true })

  const startedAt = new Date().toISOString()
  const roundLogPath = path.join(OUT_DIR, 'round-log.json')
  const roundLog = readJson(roundLogPath)
  const matrix = fs.existsSync(path.join(OUT_DIR, 'fact-matrix.json'))
    ? readJson(path.join(OUT_DIR, 'fact-matrix.json'))
    : buildFactMatrix()
  const bundles = readBundles()

  const proposalsBefore = detectAll(bundles, matrix)
  const detections = summarizeProposals(proposalsBefore)
  const patches = applyRound(bundles, matrix)
  writeBundles(bundles)

  const proposalsAfter = detectAll(bundles, matrix)
  const residual = residualSummary(proposalsAfter)
  const endedAt = new Date().toISOString()

  writeJson(path.join(dir, 'proposals-before.json'), proposalsBefore)
  writeJson(path.join(dir, 'coordinated-patches.json'), patches)
  writeJson(path.join(dir, 'residual-issues.json'), residual)
  writeJson(path.join(dir, 'cross-validation.json'), {
    checkedSpecialists: Object.keys(proposalsAfter),
    newIssues: residual.total,
    residualBySpecialist: residual.detections,
    note: 'Final hardening keeps the 5-round cap and records detector/patcher safety updates separately.',
  })

  const existingRuns = Array.isArray(roundLog.finalHardeningRuns)
    ? roundLog.finalHardeningRuns
    : roundLog.finalHardening
      ? [roundLog.finalHardening]
      : []
  const currentRun = {
    startedAt,
    endedAt,
    durationSeconds: Math.max(0, Math.round((Date.parse(endedAt) - Date.parse(startedAt)) / 1000)),
    detections,
    coordinated: patches.length,
    applied: patches.length,
    residual: residual.total,
    scope: 'detector hardening for spouse strict-channel leaks, generated Korean particles, and direct behaviorHint leaks',
  }
  roundLog.finalHardeningRuns = [...existingRuns, currentRun]
  const hardeningApplied = roundLog.finalHardeningRuns.reduce((sum, run) => sum + run.applied, 0)
  roundLog.finalHardening = {
    runs: roundLog.finalHardeningRuns.length,
    applied: hardeningApplied,
    residual: residual.total,
    lastRunEndedAt: endedAt,
  }
  roundLog.totalApplied = roundLog.rounds.reduce((sum, round) => sum + round.applied, 0) + hardeningApplied
  roundLog.terminationReason = residual.total === 0 ? 'all_zero_after_final_hardening' : 'max_rounds_with_residual'
  writeJson(roundLogPath, roundLog)

  const precheck = runPrecheck({ write: true })
  const polishCandidates = createPolishCandidates(readBundles())
  const validationPath = path.join(OUT_DIR, 'final-validation.json')
  const validation = fs.existsSync(validationPath) ? readJson(validationPath) : {}
  validation.precheckPassed = precheck.passed
  validation.precheckResidual = precheck.residual.total
  validation.finalHardeningApplied = patches.length
  validation.polishCandidates = polishCandidates.length
  validation.generatedAt = new Date().toISOString()
  writeJson(validationPath, validation)

  console.log(JSON.stringify({
    applied: patches.length,
    residual: residual.total,
    precheckPassed: precheck.passed,
    totalApplied: roundLog.totalApplied,
  }, null, 2))
  process.exit(precheck.passed ? 0 : 2)
}

run()
