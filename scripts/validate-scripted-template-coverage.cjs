#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { entryMeta } = require('./lib/scripted-metadata-enricher.cjs')

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

function summarize(issues) {
  return issues.reduce((acc, issue) => {
    acc[issue.severity] = (acc[issue.severity] || 0) + 1
    return acc
  }, {})
}

function hasTag(tags, prefix) {
  return Array.isArray(tags) && tags.some((tag) => String(tag).startsWith(prefix))
}

function hasSourceRefPrefix(sourceRefs, prefix) {
  return Array.isArray(sourceRefs) && sourceRefs.some((ref) => String(ref).startsWith(prefix))
}

function hasText(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function expectedEmotionTag(channel, entry) {
  if (channel === 'interrogation') {
    return {
      S0: 'emotion:guarded',
      S1: 'emotion:guarded',
      S2: 'emotion:defensive',
      S3: 'emotion:blaming',
      S4: 'emotion:rattled',
      S5: 'emotion:resigned',
    }[entry.lieState]
  }

  if (channel === 'evidence_present' || channel === 'dossier') {
    return {
      early: 'emotion:guarded',
      mid: 'emotion:defensive',
      late: 'emotion:resigned',
    }[entry.lieBand]
  }

  if (channel === 'witness') {
    return {
      vague: 'emotion:cautious',
      partial: 'emotion:controlled',
      full: 'emotion:steady',
    }[entry.depth]
  }

  if (channel === 'aftermath') return 'emotion:measured'
  if (channel === 'system_message') return 'emotion:neutral'
  return null
}

function validate(bundle, runtimeCase) {
  const issues = []
  for (const [channel, payload] of Object.entries(bundle.channels || {})) {
    for (const entry of payload.entries || []) {
      const expectedMeta = entryMeta(channel, entry, runtimeCase)
      for (const variant of entry.variants || []) {
        const tags = variant.tags || []
        const sourceRefs = variant.sourceRefs || []
        const label = `${channel}:${variant.id}`

        if (!Array.isArray(tags) || tags.length === 0) issues.push({ severity: 'FAIL', message: `${label} missing tags[]` })
        if (!Array.isArray(sourceRefs) || sourceRefs.length === 0) issues.push({ severity: 'FAIL', message: `${label} missing sourceRefs[]` })

        for (const prefix of ['channel:', 'speaker:', 'speakerRole:', 'listener:', 'listenerRole:', 'address:', 'scope:', 'revealScope:', 'register:', 'honorific:', 'audience:', 'tense:', 'emotion:', 'continuity:', 'reveal:', 'revealGuard:', 'disclosure:', 'responseMode:', 'mentionTarget:', 'relationship:', 'judgeAddress:', 'judgeAddressState:', 'callTerm:', 'callTermState:', 'counterpartyRef:', 'counterpartyRefState:']) {
          if (!hasTag(tags, prefix)) {
            issues.push({ severity: 'FAIL', message: `${label} missing ${prefix} tag` })
          }
        }

        for (const expectedTag of expectedMeta.tags || []) {
          if (!tags.includes(expectedTag)) {
            issues.push({ severity: 'FAIL', message: `${label} missing expected tag ${expectedTag}` })
          }
        }
        for (const expectedSourceRef of expectedMeta.sourceRefs || []) {
          if (!sourceRefs.includes(expectedSourceRef)) {
            issues.push({ severity: 'FAIL', message: `${label} missing expected sourceRef ${expectedSourceRef}` })
          }
        }

        if (['interrogation', 'evidence_present', 'dossier', 'witness'].includes(channel)) {
          for (const prefix of ['scope:judge_only', 'revealScope:judge_only', 'register:formal', 'honorific:formal', 'audience:single']) {
            if (!tags.includes(prefix)) {
              issues.push({ severity: 'FAIL', message: `${label} missing ${prefix}` })
            }
          }
        }

        if (['interrogation', 'evidence_present', 'dossier', 'witness'].includes(channel) && tags.includes('judgeAddressState:missing')) {
          issues.push({ severity: 'FAIL', message: `${label} missing usable judge address metadata` })
        }
        if (['interrogation', 'evidence_present', 'dossier', 'witness'].includes(channel) && tags.includes('callTermState:missing')) {
          issues.push({ severity: 'FAIL', message: `${label} missing usable judge call term metadata` })
        }
        if (['interrogation', 'evidence_present', 'dossier', 'witness'].includes(channel) && tags.includes('counterpartyRefState:missing')) {
          issues.push({ severity: 'FAIL', message: `${label} missing usable counterparty reference metadata` })
        }
        if (tags.includes('relationship:unknown')) {
          issues.push({ severity: 'FAIL', message: `${label} relationship tag resolved to unknown` })
        }

        if (channel === 'interrogation') {
          for (const prefix of ['questionType:', 'stance:']) {
            if (!hasTag(tags, prefix)) issues.push({ severity: 'FAIL', message: `${label} missing ${prefix} tag` })
          }
          if (!hasSourceRefPrefix(sourceRefs, 'dispute:')) {
            issues.push({ severity: 'FAIL', message: `${label} missing dispute:* sourceRef` })
          }
        }

        if (channel === 'evidence_present') {
          for (const prefix of ['subjectRole:', 'stance:', 'trust:', 'legality:', 'source:']) {
            if (!hasTag(tags, prefix)) issues.push({ severity: 'FAIL', message: `${label} missing ${prefix} tag` })
          }
          if (!hasSourceRefPrefix(sourceRefs, 'evidence:')) {
            issues.push({ severity: 'FAIL', message: `${label} missing evidence:* sourceRef` })
          }
        }

        if (channel === 'dossier') {
          if (!hasTag(tags, 'stance:')) issues.push({ severity: 'FAIL', message: `${label} missing stance: tag` })
          if (!hasSourceRefPrefix(sourceRefs, 'dossier:')) {
            issues.push({ severity: 'FAIL', message: `${label} missing dossier:* sourceRef` })
          }
        }

        if (channel === 'witness') {
          for (const prefix of ['depth:', 'stance:']) {
            if (!hasTag(tags, prefix)) issues.push({ severity: 'FAIL', message: `${label} missing ${prefix} tag` })
          }
          if (!hasSourceRefPrefix(sourceRefs, 'witness:')) {
            issues.push({ severity: 'FAIL', message: `${label} missing witness:* sourceRef` })
          }
        }

        const expectedEmotion = expectedEmotionTag(channel, entry)
        if (expectedEmotion && !tags.includes(expectedEmotion)) {
          issues.push({ severity: 'FAIL', message: `${label} expected ${expectedEmotion}` })
        }

        if (channel === 'aftermath' && !hasSourceRefPrefix(sourceRefs, 'result:')) {
          issues.push({ severity: 'FAIL', message: `${label} missing result:* sourceRef` })
        }

        if (channel === 'system_message' && !hasSourceRefPrefix(sourceRefs, 'system:')) {
          issues.push({ severity: 'FAIL', message: `${label} missing system:* sourceRef` })
        }
      }
    }
  }

  return issues
}

function main() {
  const root = path.join(__dirname, '..')
  const caseId = parseCaseId(process.argv.slice(2))
  if (!caseId) {
    console.error('missing caseId. usage: node scripts/validate-scripted-template-coverage.cjs --case headline-01')
    process.exit(1)
  }

  const scriptedPath = path.join(root, 'src', 'data', 'scriptedText', `${caseId}.json`)
  const runtimePath = path.join(root, 'src', 'data', 'cases', 'generated', `${caseId}.json`)
  const bundle = readJson(scriptedPath)
  const runtimeCase = readJson(runtimePath)
  const issues = validate(bundle, runtimeCase)
  const summary = summarize(issues)

  console.log(`[scripted-template-coverage] case=${caseId}`)
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
  validateScriptedTemplateCoverage: validate,
}
