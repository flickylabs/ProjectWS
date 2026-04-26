#!/usr/bin/env node
'use strict'

const fs = require('fs')
const path = require('path')
const recovery = require('./recovery-v2.cjs')

const ROOT = path.resolve(__dirname, '../..')
const OUT_DIR = path.join(ROOT, 'tmp', 'codex-recovery')
const MAX_TOTAL_ROUNDS = 5

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

const matrix = readJson(path.join(OUT_DIR, 'fact-matrix.json'))
const bundles = recovery.readBundles()
const roundLogPath = path.join(OUT_DIR, 'round-log.json')
const roundLog = readJson(roundLogPath)

let terminationReason = roundLog.terminationReason || 'max_rounds'

while (roundLog.rounds.length < MAX_TOTAL_ROUNDS) {
  const round = roundLog.rounds.length + 1
  const startedAt = new Date().toISOString()
  const proposals = recovery.detectAll(bundles, matrix)
  const detections = recovery.summarizeProposals(proposals)
  const patches = recovery.applyRound(bundles, matrix)
  const afterProposals = recovery.detectAll(bundles, matrix)
  const residual = recovery.residualSummary(afterProposals)
  const crossValidation = {
    round,
    checkedSpecialists: Object.keys(detections),
    newIssues: residual.total,
    residualBySpecialist: residual.detections,
    note: 'Resume round after detector rule refinement.',
  }
  recovery.writeRoundOutputs(round, proposals, patches, residual, crossValidation)
  const endedAt = new Date().toISOString()
  roundLog.rounds.push({
    round,
    startedAt,
    endedAt,
    durationSeconds: Math.max(0, Math.round((Date.parse(endedAt) - Date.parse(startedAt)) / 1000)),
    detections,
    coordinated: patches.length,
    applied: patches.length,
    crossValidationNewIssues: residual.total,
    residual: residual.total,
    convergence: residual.total === 0 || patches.length === 0,
  })
  roundLog.totalApplied = (roundLog.totalApplied || 0) + patches.length

  if (residual.total === 0) {
    terminationReason = 'all_zero'
    roundLog.convergedAt = round
    break
  }
  if (patches.length === 0) {
    terminationReason = 'no_change'
    roundLog.convergedAt = round
    break
  }
}

roundLog.totalRounds = roundLog.rounds.length
roundLog.terminationReason = terminationReason
writeJson(roundLogPath, roundLog)
recovery.writeBundles(bundles)

const precheck = recovery.runPrecheck({ write: true })
const polish = recovery.createPolishCandidates(bundles)
const finalValidationPath = path.join(OUT_DIR, 'final-validation.json')
const finalValidation = fs.existsSync(finalValidationPath)
  ? readJson(finalValidationPath)
  : {}
finalValidation.precheckPassed = precheck.passed
finalValidation.generatedAt = new Date().toISOString()
writeJson(finalValidationPath, finalValidation)

console.log(JSON.stringify({
  terminationReason,
  rounds: roundLog.totalRounds,
  totalApplied: roundLog.totalApplied,
  precheckPassed: precheck.passed,
  residual: precheck.residual.total,
  polishCandidates: polish.length,
}, null, 2))
process.exit(precheck.passed ? 0 : 2)
