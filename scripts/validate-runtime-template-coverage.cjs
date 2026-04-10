#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const {
  isGenericJudgeReference,
  looksLikeJudgeAddress,
  containsFalseAmountToken,
} = require('./lib/judge-reference-utils.cjs')

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function parseCaseId(argv) {
  const argCase = argv.find((item) => item.startsWith('--case='))
  if (argCase) return argCase.slice('--case='.length)
  const idx = argv.indexOf('--case')
  if (idx >= 0 && argv[idx + 1]) return argv[idx + 1]
  return argv[0] || null
}

function pushIssue(list, severity, message) {
  list.push({ severity, message })
}

function summarize(issues) {
  return issues.reduce((acc, issue) => {
    acc[issue.severity] = (acc[issue.severity] || 0) + 1
    return acc
  }, {})
}

function hasText(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function normalizeViewerType(type) {
  const raw = String(type || '').toLowerCase()
  if (['bank', 'chat', 'contract', 'testimony', 'cctv', 'log', 'device', 'sns'].includes(raw)) return raw
  if (raw === 'platform_log' || raw === 'record') return 'log'
  if (raw === 'photo' || raw === 'image') return 'cctv'
  if (raw === 'estimate') return 'contract'
  return 'log'
}

function hasViewerPayload(node) {
  if (!node.viewerData || typeof node.viewerData !== 'object') return false
  const key = normalizeViewerType(node.type)
  return Boolean(node.viewerData[key])
}

const STRICT_WITNESS_RELATED_DISPUTE_CASES = new Set([
  'workplace-11',
  'partnership-09',
  'neighbor-08',
  'tenant-09',
  'spouse-12',
  'family-09',
])

function validate(caseId, runtimeCase) {
  const issues = []
  const evidence = runtimeCase.evidence || []
  const evidenceIds = new Set(evidence.map((item) => item.id))
  const baseEvidenceIds = runtimeCase.baseEvidenceIds || []
  const monetaryDisputeIds = runtimeCase.monetaryDisputeIds || []
  const disputeIds = new Set((runtimeCase.disputes || []).map((item) => item.id))
  const hardEvidenceCount = [...(runtimeCase.lieConfigA || []), ...(runtimeCase.lieConfigB || [])]
    .flatMap((config) => config.transitions || [])
    .filter((transition) => String(transition.trigger || '').includes('hard_evidence'))
    .length
  const requiredLieStateCount = evidence.filter((item) => item.requiredLieState).length
  const unlockedAtStartCount = evidence.filter((item) =>
    Array.isArray(item.requires) &&
    item.requires.length === 0 &&
    !item.requiredLieState,
  ).length

  if (!runtimeCase.caseId) pushIssue(issues, 'FAIL', 'missing caseId')
  if (!Array.isArray(runtimeCase.disputes) || runtimeCase.disputes.length === 0) pushIssue(issues, 'FAIL', 'missing disputes[]')
  if (!Array.isArray(evidence) || evidence.length === 0) pushIssue(issues, 'FAIL', 'missing evidence[]')
  if (!hasText(runtimeCase.meta?.anchorTruth)) pushIssue(issues, 'FAIL', 'missing meta.anchorTruth')
  if (!hasText(runtimeCase.meta?.emotionalBait)) pushIssue(issues, 'FAIL', 'missing meta.emotionalBait')
  if (!hasText(runtimeCase.meta?.resolutionDilemma)) pushIssue(issues, 'FAIL', 'missing meta.resolutionDilemma')
  if (!hasText(runtimeCase.context?.description)) pushIssue(issues, 'FAIL', 'missing context.description')
  if (!hasText(runtimeCase.context?.triggerAmplifier)) pushIssue(issues, 'FAIL', 'missing context.triggerAmplifier')
  if (!hasText(runtimeCase.duo?.relationshipType)) pushIssue(issues, 'FAIL', 'missing duo.relationshipType')
  if (!hasText(runtimeCase.duo?.partyA?.callTerms?.toJudge)) pushIssue(issues, 'FAIL', 'missing partyA.callTerms.toJudge')
  if (!hasText(runtimeCase.duo?.partyB?.callTerms?.toJudge)) pushIssue(issues, 'FAIL', 'missing partyB.callTerms.toJudge')
  if (
    isGenericJudgeReference(runtimeCase.duo?.partyA?.callTerms?.toJudge) ||
    looksLikeJudgeAddress(runtimeCase.duo?.partyA?.callTerms?.toJudge) ||
    containsFalseAmountToken(runtimeCase.duo?.partyA?.callTerms?.toJudge)
  ) {
    pushIssue(issues, 'FAIL', 'partyA.callTerms.toJudge must be relationship-specific')
  }
  if (
    isGenericJudgeReference(runtimeCase.duo?.partyB?.callTerms?.toJudge) ||
    looksLikeJudgeAddress(runtimeCase.duo?.partyB?.callTerms?.toJudge) ||
    containsFalseAmountToken(runtimeCase.duo?.partyB?.callTerms?.toJudge)
  ) {
    pushIssue(issues, 'FAIL', 'partyB.callTerms.toJudge must be relationship-specific')
  }
  if (!Array.isArray(monetaryDisputeIds)) {
    pushIssue(issues, 'FAIL', 'monetaryDisputeIds must be an array')
  } else {
    for (const id of monetaryDisputeIds) {
      if (!disputeIds.has(id)) pushIssue(issues, 'FAIL', `monetaryDisputeIds includes unknown dispute id: ${id}`)
    }
  }

  if (!Array.isArray(baseEvidenceIds) || baseEvidenceIds.length !== 3) {
    pushIssue(issues, 'FAIL', 'baseEvidenceIds must contain exactly 3 evidence ids')
  } else {
    for (const id of baseEvidenceIds) {
      if (!evidenceIds.has(id)) {
        pushIssue(issues, 'FAIL', `baseEvidenceIds includes unknown evidence id: ${id}`)
        continue
      }
      const node = evidence.find((item) => item.id === id)
      if (!Array.isArray(node.requires)) {
        pushIssue(issues, 'FAIL', `base evidence ${id} is missing requires[]`)
      } else if (node.requires.length !== 0) {
        pushIssue(issues, 'FAIL', `base evidence ${id} must start with requires: []`)
      }
      if (node.requiredLieState) {
        pushIssue(issues, 'FAIL', `base evidence ${id} must not define requiredLieState`)
      }
    }
  }

  for (const node of evidence) {
    if (!Array.isArray(node.requires)) {
      pushIssue(issues, 'FAIL', `evidence ${node.id} missing requires[]`)
    }
    if (!Array.isArray(node.proves)) {
      pushIssue(issues, 'FAIL', `evidence ${node.id} missing proves[]`)
    }
    if (!node.investigationResults || typeof node.investigationResults !== 'object') {
      pushIssue(issues, 'FAIL', `evidence ${node.id} missing investigationResults`)
    }
    if (!node.meta || typeof node.meta !== 'object') {
      pushIssue(issues, 'FAIL', `evidence ${node.id} missing meta`)
    } else {
      if (!hasText(node.meta.name)) pushIssue(issues, 'FAIL', `evidence ${node.id} missing meta.name`)
      if (!hasText(node.meta.type)) pushIssue(issues, 'FAIL', `evidence ${node.id} missing meta.type`)
      if (!hasText(node.meta.trustLevel)) pushIssue(issues, 'FAIL', `evidence ${node.id} missing meta.trustLevel`)
      if (!hasText(node.meta.source)) pushIssue(issues, 'FAIL', `evidence ${node.id} missing meta.source`)
      if (!hasText(node.meta.legality)) pushIssue(issues, 'FAIL', `evidence ${node.id} missing meta.legality`)
      if (!Number.isFinite(node.meta.stage)) pushIssue(issues, 'FAIL', `evidence ${node.id} missing meta.stage`)
      if (!hasText(node.meta.stageLabel)) pushIssue(issues, 'FAIL', `evidence ${node.id} missing meta.stageLabel`)
    }
    if (!node.viewerData || typeof node.viewerData !== 'object') {
      pushIssue(issues, 'FAIL', `evidence ${node.id} missing viewerData`)
    } else {
      if (!node.viewerData.meta || typeof node.viewerData.meta !== 'object') {
        pushIssue(issues, 'FAIL', `evidence ${node.id} missing viewerData.meta`)
      }
      if (!hasViewerPayload(node)) {
        pushIssue(issues, 'FAIL', `evidence ${node.id} missing viewerData.${normalizeViewerType(node.type)}`)
      }
    }
    if (!Array.isArray(node.investigationStages) || node.investigationStages.length !== 3) {
      pushIssue(issues, 'FAIL', `evidence ${node.id} must define 3 investigationStages`)
    } else {
      const stages = node.investigationStages.map((stage) => stage.stage)
      for (const expected of [0, 1, 2]) {
        if (!stages.includes(expected)) {
          pushIssue(issues, 'FAIL', `evidence ${node.id} investigationStages missing stage ${expected}`)
        }
      }
    }
    if (!node.partyContext || typeof node.partyContext !== 'object') {
      pushIssue(issues, 'FAIL', `evidence ${node.id} missing partyContext`)
    } else {
      for (const party of ['a', 'b']) {
        const ctx = node.partyContext[party]
        if (!ctx || !hasText(ctx.questionAngle) || !hasText(ctx.implication)) {
          pushIssue(issues, 'FAIL', `evidence ${node.id} missing partyContext.${party}`)
        }
      }
    }
    const isBaseEvidence = baseEvidenceIds.includes(node.id)
    if (!isBaseEvidence && Array.isArray(node.requires) && node.requires.length === 0 && !node.requiredLieState) {
      pushIssue(issues, 'FAIL', `non-base evidence ${node.id} must have requires[] or requiredLieState`)
    }
  }

  for (const witness of runtimeCase.duo?.socialGraph || []) {
    if (!hasText(witness.witnessProfile?.addressJudge)) pushIssue(issues, 'FAIL', `witness ${witness.id} missing witnessProfile.addressJudge`)
    if (!hasText(witness.witnessProfile?.addressA)) pushIssue(issues, 'FAIL', `witness ${witness.id} missing witnessProfile.addressA`)
    if (!hasText(witness.witnessProfile?.addressB)) pushIssue(issues, 'FAIL', `witness ${witness.id} missing witnessProfile.addressB`)
    if (STRICT_WITNESS_RELATED_DISPUTE_CASES.has(caseId)) {
      if (!Array.isArray(witness.relatedDisputeIds) || witness.relatedDisputeIds.length === 0) {
        pushIssue(issues, 'FAIL', `witness ${witness.id} missing relatedDisputeIds`)
      } else {
        for (const disputeId of witness.relatedDisputeIds) {
          if (!disputeIds.has(disputeId)) {
            pushIssue(issues, 'FAIL', `witness ${witness.id} has unknown relatedDisputeId: ${disputeId}`)
          }
        }
      }
    }
  }

  if (requiredLieStateCount === 0) {
    pushIssue(issues, 'FAIL', 'no evidence uses requiredLieState gating')
  }
  if (!Array.isArray(runtimeCase.evidenceCombinations) || runtimeCase.evidenceCombinations.length <= 1) {
    pushIssue(issues, 'FAIL', 'evidenceCombinations should contain at least 2 entries')
  }
  if (hardEvidenceCount === 0) {
    pushIssue(issues, 'FAIL', 'lieConfig has no hard_evidence transitions')
  }
  if (unlockedAtStartCount > 3) {
    pushIssue(issues, 'WARN', `too many evidence nodes unlock at start (${unlockedAtStartCount}); expected 2~3`)
  }

  return issues
}

function main() {
  const root = path.join(__dirname, '..')
  const caseId = parseCaseId(process.argv.slice(2))
  if (!caseId) {
    console.error('missing caseId. usage: node scripts/validate-runtime-template-coverage.cjs --case headline-01')
    process.exit(1)
  }

  const runtimePath = path.join(root, 'src', 'data', 'cases', 'generated', `${caseId}.json`)
  const runtimeCase = readJson(runtimePath)
  const issues = validate(caseId, runtimeCase)
  const summary = summarize(issues)

  console.log(`[runtime-template-coverage] case=${caseId}`)
  for (const issue of issues) {
    console.log(`${issue.severity} ${issue.message}`)
  }
  console.log(`summary=${JSON.stringify(summary)}`)
  console.log(summary.FAIL ? 'FAIL' : 'PASS')
  process.exit(summary.FAIL ? 1 : 0)
}

if (require.main === module) {
  main()
}

module.exports = {
  validateRuntimeTemplateCoverage: validate,
}
