const fs = require('node:fs')
const path = require('node:path')

const ROOT = path.resolve(__dirname, '..')
const ACTIVE_CASES = ['spouse-01', 'family-01', 'friend-01']
const LOCALES = ['en', 'ja', 'zh-CN']
const PARTIES = ['a', 'b']
const LIE_STATES = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5']
const QUESTION_TYPES = ['fact_pursuit', 'motive_search', 'empathy_approach']
const REQUIRED_SCRIPT_TAG_PREFIXES = [
  'channel',
  'questionType',
  'stance',
  'register',
  'disclosure',
  'responseMode',
]
const REQUIRED_ANSWER_TAG_PREFIXES = [
  'channel',
  'party',
  'disputeId',
  'questionType',
  'lieState',
  'answerAngle',
]

const findings = []
const summaries = []

function readJson(relativePath) {
  const absolutePath = path.join(ROOT, relativePath)
  try {
    return JSON.parse(fs.readFileSync(absolutePath, 'utf8'))
  } catch (error) {
    finding('file', `Cannot read JSON: ${relativePath}`, error.message)
    return null
  }
}

function finding(category, message, detail = '') {
  findings.push({ category, message, detail })
}

function hasText(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function tagsHavePrefix(tags, prefix) {
  return Array.isArray(tags) && tags.some((tag) => typeof tag === 'string' && tag.startsWith(`${prefix}:`))
}

function variantKey(variant) {
  return variant?.id ?? '<missing-id>'
}

function angleCatalogKey(entry) {
  return `${entry.disputeId}|${entry.angleId}`
}

function judgeQuestionKey(entry) {
  return `${entry.targetParty ?? '*'}|${entry.disputeId}|${entry.questionType}|${entry.angleId}`
}

function answerKey(entry) {
  return `${entry.party}|${entry.disputeId}|${entry.lieState}|${entry.questionType}|${entry.angleId}`
}

function verifyOverlayVariants(baseEntries, overlayEntries, makeKey, relPath, collectionName) {
  const overlayByKey = new Map((overlayEntries ?? []).map((entry) => [makeKey(entry), entry]))
  for (const baseEntry of baseEntries ?? []) {
    const key = makeKey(baseEntry)
    const overlayEntry = overlayByKey.get(key)
    if (!overlayEntry) {
      finding('locale_sync', `${relPath} missing ${collectionName} entry`, key)
      continue
    }
    const overlayVariants = new Map((overlayEntry.variants ?? []).map((variant) => [variantKey(variant), variant]))
    for (const baseVariant of baseEntry.variants ?? []) {
      const overlayVariant = overlayVariants.get(variantKey(baseVariant))
      if (!overlayVariant) {
        finding('locale_sync', `${relPath} missing variant`, `${key} / ${variantKey(baseVariant)}`)
      } else if (!hasText(overlayVariant.text)) {
        finding('locale_sync', `${relPath} has empty variant text`, `${key} / ${variantKey(baseVariant)}`)
      }
    }
  }
}

function verifyScriptedText(caseId, caseData) {
  const rel = `src/data/scriptedText/${caseId}.json`
  const bundle = readJson(rel)
  const entries = bundle?.channels?.interrogation?.entries
  if (!Array.isArray(entries)) {
    finding('scripted_text', `${rel} has no channels.interrogation.entries array`)
    return null
  }

  const disputes = (caseData?.disputes ?? []).map((dispute) => dispute.id).filter(Boolean)
  const byKey = new Map()
  let variantTotal = 0

  for (const entry of entries) {
    if (!hasText(entry.key)) {
      finding('scripted_text', `${rel} entry has missing key`)
      continue
    }
    if (byKey.has(entry.key)) finding('scripted_text', `${rel} duplicate entry key`, entry.key)
    byKey.set(entry.key, entry)

    const expectedKey = `${entry.party}|${entry.disputeId}|${entry.lieState}|${entry.questionType}`
    if (entry.key !== expectedKey) {
      finding('scripted_text', `${rel} key does not match fields`, `${entry.key} != ${expectedKey}`)
    }
    if (!Array.isArray(entry.variants) || entry.variants.length === 0) {
      finding('scripted_text', `${rel} entry has no variants`, entry.key)
      continue
    }
    variantTotal += entry.variants.length
    for (const variant of entry.variants) {
      if (!hasText(variant.id)) finding('scripted_text', `${rel} variant missing id`, entry.key)
      if (!hasText(variant.text)) finding('scripted_text', `${rel} variant missing text`, `${entry.key} / ${variantKey(variant)}`)
      if (!hasText(variant.behaviorHint)) {
        finding('scripted_text', `${rel} variant missing behaviorHint`, `${entry.key} / ${variantKey(variant)}`)
      }
      for (const prefix of REQUIRED_SCRIPT_TAG_PREFIXES) {
        if (!tagsHavePrefix(variant.tags, prefix)) {
          finding('tag_consistency', `${rel} variant missing ${prefix}: tag`, `${entry.key} / ${variantKey(variant)}`)
        }
      }
    }
  }

  for (const party of PARTIES) {
    for (const disputeId of disputes) {
      for (const lieState of LIE_STATES) {
        for (const questionType of QUESTION_TYPES) {
          const key = `${party}|${disputeId}|${lieState}|${questionType}`
          if (!byKey.has(key)) finding('scripted_text', `${rel} missing required interrogation entry`, key)
        }
      }
    }
  }

  for (const locale of LOCALES) {
    const overlayRel = `src/data/scriptedText/${caseId}.${locale}.json`
    const overlay = readJson(overlayRel)
    verifyOverlayVariants(entries, overlay?.channels?.interrogation?.entries, (entry) => entry.key, overlayRel, 'interrogation')
  }

  return {
    entries: entries.length,
    expectedEntries: PARTIES.length * disputes.length * LIE_STATES.length * QUESTION_TYPES.length,
    variantTotal,
  }
}

function verifyAngles(caseId, caseData) {
  const catalogRel = `src/data/scriptedAngles/${caseId}_angle_catalog.json`
  const judgeRel = `src/data/scriptedAngles/${caseId}_judge_questions.json`
  const answersRel = `src/data/scriptedAngles/${caseId}_interrogation_answers.json`
  const catalog = readJson(catalogRel)
  const judge = readJson(judgeRel)
  const answers = readJson(answersRel)
  const angles = catalog?.angles
  const judgeQuestions = judge?.judgeQuestions
  const answerEntries = answers?.answers
  const disputes = (caseData?.disputes ?? []).map((dispute) => dispute.id).filter(Boolean)

  if (!Array.isArray(angles)) finding('angle_catalog', `${catalogRel} has no angles array`)
  if (!Array.isArray(judgeQuestions)) finding('judge_questions', `${judgeRel} has no judgeQuestions array`)
  if (!Array.isArray(answerEntries)) finding('interrogation_answers', `${answersRel} has no answers array`)
  if (!Array.isArray(angles) || !Array.isArray(judgeQuestions) || !Array.isArray(answerEntries)) return null

  const disputeSet = new Set(disputes)
  const anglesByDispute = new Map(disputes.map((disputeId) => [disputeId, []]))
  const catalogKeys = new Set()
  for (const angle of angles) {
    const key = angleCatalogKey(angle)
    if (catalogKeys.has(key)) finding('angle_catalog', `${catalogRel} duplicate angle`, key)
    catalogKeys.add(key)
    if (!disputeSet.has(angle.disputeId)) finding('angle_catalog', `${catalogRel} angle uses unknown dispute`, key)
    if (!hasText(angle.angleId)) finding('angle_catalog', `${catalogRel} angle missing angleId`, key)
    if (!hasText(angle.label)) finding('angle_catalog', `${catalogRel} angle missing label`, key)
    if (!hasText(angle.description)) finding('angle_catalog', `${catalogRel} angle missing description`, key)
    if (!Array.isArray(angle.keywords)) finding('angle_catalog', `${catalogRel} angle missing keywords array`, key)
    anglesByDispute.get(angle.disputeId)?.push(angle.angleId)
  }

  for (const disputeId of disputes) {
    const angleIds = anglesByDispute.get(disputeId) ?? []
    if (angleIds.length === 0) finding('angle_catalog', `${catalogRel} has no angles for dispute`, disputeId)
  }

  const answerByKey = new Map()
  let answerVariantTotal = 0
  for (const entry of answerEntries) {
    const key = answerKey(entry)
    if (answerByKey.has(key)) finding('interrogation_answers', `${answersRel} duplicate answer`, key)
    answerByKey.set(key, entry)
    if (!catalogKeys.has(`${entry.disputeId}|${entry.angleId}`)) {
      finding('interrogation_answers', `${answersRel} answer references unknown angle`, key)
    }
    if (!Array.isArray(entry.variants) || entry.variants.length === 0) {
      finding('interrogation_answers', `${answersRel} answer has no variants`, key)
      continue
    }
    answerVariantTotal += entry.variants.length
    for (const variant of entry.variants) {
      if (!hasText(variant.id)) finding('interrogation_answers', `${answersRel} variant missing id`, key)
      if (!hasText(variant.text)) finding('interrogation_answers', `${answersRel} variant missing text`, `${key} / ${variantKey(variant)}`)
      if (!hasText(variant.behaviorHint)) {
        finding('interrogation_answers', `${answersRel} variant missing behaviorHint`, `${key} / ${variantKey(variant)}`)
      }
      for (const prefix of REQUIRED_ANSWER_TAG_PREFIXES) {
        if (!tagsHavePrefix(variant.tags, prefix)) {
          finding('tag_consistency', `${answersRel} variant missing ${prefix}: tag`, `${key} / ${variantKey(variant)}`)
        }
      }
    }
  }

  for (const party of PARTIES) {
    for (const disputeId of disputes) {
      for (const lieState of LIE_STATES) {
        for (const questionType of QUESTION_TYPES) {
          for (const angleId of anglesByDispute.get(disputeId) ?? []) {
            const key = `${party}|${disputeId}|${lieState}|${questionType}|${angleId}`
            if (!answerByKey.has(key)) finding('interrogation_answers', `${answersRel} missing answer`, key)
          }
        }
      }
    }
  }

  const judgeByKey = new Map()
  let judgeVariantTotal = 0
  for (const entry of judgeQuestions) {
    const key = judgeQuestionKey(entry)
    if (judgeByKey.has(key)) finding('judge_questions', `${judgeRel} duplicate judge question`, key)
    judgeByKey.set(key, entry)
    if (!PARTIES.includes(entry.targetParty)) finding('judge_questions', `${judgeRel} targetParty is not active`, key)
    if (!QUESTION_TYPES.includes(entry.questionType)) finding('judge_questions', `${judgeRel} unknown questionType`, key)
    if (!catalogKeys.has(`${entry.disputeId}|${entry.angleId}`)) {
      finding('judge_questions', `${judgeRel} question references unknown angle`, key)
    }
    if (!Array.isArray(entry.variants) || entry.variants.length === 0) {
      finding('judge_questions', `${judgeRel} question has no variants`, key)
      continue
    }
    judgeVariantTotal += entry.variants.length
    for (const variant of entry.variants) {
      if (!hasText(variant.id)) finding('judge_questions', `${judgeRel} variant missing id`, key)
      if (!hasText(variant.text)) finding('judge_questions', `${judgeRel} variant missing text`, `${key} / ${variantKey(variant)}`)
      const answerAngleTag = (variant.tags ?? []).find((tag) => typeof tag === 'string' && tag.startsWith('answerAngle:'))
      const answerAngle = answerAngleTag?.slice('answerAngle:'.length) ?? entry.angleId
      if (!catalogKeys.has(`${entry.disputeId}|${answerAngle}`)) {
        finding('judge_questions', `${judgeRel} variant answerAngle references unknown angle`, `${key} / ${variantKey(variant)} / ${answerAngle}`)
      }
    }
  }

  for (const party of PARTIES) {
    for (const disputeId of disputes) {
      for (const questionType of QUESTION_TYPES) {
        for (const angleId of anglesByDispute.get(disputeId) ?? []) {
          const key = `${party}|${disputeId}|${questionType}|${angleId}`
          if (!judgeByKey.has(key)) finding('judge_questions', `${judgeRel} missing question`, key)
        }
      }
    }
  }

  for (const locale of LOCALES) {
    const catalogOverlayRel = `src/data/scriptedAngles/${caseId}_angle_catalog.${locale}.json`
    const catalogOverlay = readJson(catalogOverlayRel)
    const overlayAngleKeys = new Set((catalogOverlay?.angles ?? []).map(angleCatalogKey))
    for (const angle of angles) {
      if (!overlayAngleKeys.has(angleCatalogKey(angle))) {
        finding('locale_sync', `${catalogOverlayRel} missing angle`, angleCatalogKey(angle))
      }
    }

    const judgeOverlayRel = `src/data/scriptedAngles/${caseId}_judge_questions.${locale}.json`
    const judgeOverlay = readJson(judgeOverlayRel)
    verifyOverlayVariants(judgeQuestions, judgeOverlay?.judgeQuestions, judgeQuestionKey, judgeOverlayRel, 'judgeQuestions')

    const answersOverlayRel = `src/data/scriptedAngles/${caseId}_interrogation_answers.${locale}.json`
    const answersOverlay = readJson(answersOverlayRel)
    verifyOverlayVariants(answerEntries, answersOverlay?.answers, answerKey, answersOverlayRel, 'answers')
  }

  return {
    angles: angles.length,
    judgeQuestions: judgeQuestions.length,
    judgeVariantTotal,
    answers: answerEntries.length,
    expectedAnswers: [...anglesByDispute.values()].reduce(
      (sum, angleIds) => sum + PARTIES.length * LIE_STATES.length * QUESTION_TYPES.length * angleIds.length,
      0,
    ),
    answerVariantTotal,
    spouseB_D2Answers: caseId === 'spouse-01'
      ? answerEntries.filter((entry) => entry.party === 'b' && entry.disputeId === 'd-2').length
      : undefined,
    spouseB_D2AnswerVariants: caseId === 'spouse-01'
      ? answerEntries
        .filter((entry) => entry.party === 'b' && entry.disputeId === 'd-2')
        .reduce((sum, entry) => sum + (entry.variants?.length ?? 0), 0)
      : undefined,
  }
}

function verifyDisclosurePolicy(caseId, caseData) {
  const rel = `src/data/disclosurePolicy/${caseId}.json`
  const policy = readJson(rel)
  if (!policy) return null
  const disputes = (caseData?.disputes ?? []).map((dispute) => dispute.id).filter(Boolean)
  const policyDisputes = policy.surfaceMap?.disputes ?? {}
  const evidenceMap = policy.surfaceMap?.evidence ?? {}

  for (const disputeId of disputes) {
    const entry = policyDisputes[disputeId]
    if (!entry) {
      finding('disclosure_policy', `${rel} missing dispute surface map`, disputeId)
      continue
    }
    for (const field of ['surface', 'truth', 'protectedSurface']) {
      if (!hasText(entry[field])) finding('disclosure_policy', `${rel} dispute missing ${field}`, disputeId)
    }
    if (!Array.isArray(entry.truthLexemes)) {
      finding('disclosure_policy', `${rel} dispute missing truthLexemes array`, disputeId)
    }
  }

  for (const evidence of caseData?.evidence ?? []) {
    const entry = evidenceMap[evidence.id]
    if (!entry) continue
    if (!hasText(entry.surfaceName)) finding('disclosure_policy', `${rel} evidence missing surfaceName`, evidence.id)
    if (!hasText(entry.surfaceDescription)) {
      finding('disclosure_policy', `${rel} evidence missing surfaceDescription`, evidence.id)
    }
    if (!Array.isArray(entry.truthLexemes)) {
      finding('disclosure_policy', `${rel} evidence missing truthLexemes array`, evidence.id)
    }
  }

  for (const field of ['forbiddenLexemes', 'channelAuthority', 'lieStateGate']) {
    if (!policy[field] || typeof policy[field] !== 'object') finding('disclosure_policy', `${rel} missing ${field}`)
  }
  if (!Array.isArray(policy.forbiddenLexemes?.globalTruthLexemes)) {
    finding('disclosure_policy', `${rel} forbiddenLexemes.globalTruthLexemes is not an array`)
  }
  if (!policy.forbiddenLexemes?.surfaceOnlyChannels || typeof policy.forbiddenLexemes.surfaceOnlyChannels !== 'object') {
    finding('disclosure_policy', `${rel} forbiddenLexemes.surfaceOnlyChannels is missing`)
  }

  return {
    disputePolicies: Object.keys(policyDisputes).length,
    evidencePolicies: Object.keys(evidenceMap).length,
  }
}

function verifyRuntimeFlow() {
  const rel = 'src/engine/llmDialogueResolver.ts'
  const source = fs.readFileSync(path.join(ROOT, rel), 'utf8')
  if (/if\s*\(\s*getFreeInterrogationMeta\(action\)\s*\)\s*return\s+null/.test(source)) {
    finding(
      'runtime_flow',
      `${rel} blocks mapped free-interrogation actions before scripted lookup`,
      'Mapped case_dispatch free questions must be allowed to use getScriptedInterrogation.',
    )
  }
  if (!/action\.type\s*!==\s*'question'\s*&&\s*action\.type\s*!==\s*'evidence_present'/.test(source)) {
    finding(
      'runtime_flow',
      `${rel} scripted dialogue path has no active action type guard`,
      'Expected tryScriptedDialoguePath to guard unsupported actions explicitly.',
    )
  }
}

for (const caseId of ACTIVE_CASES) {
  const caseData = readJson(`src/data/cases/generated/${caseId}.json`)
  if (!caseData) continue
  const disputes = (caseData.disputes ?? []).map((dispute) => dispute.id)
  const scriptedSummary = verifyScriptedText(caseId, caseData)
  const angleSummary = verifyAngles(caseId, caseData)
  const disclosureSummary = verifyDisclosurePolicy(caseId, caseData)
  summaries.push({
    caseId,
    disputes,
    scripted: scriptedSummary,
    angles: angleSummary,
    disclosure: disclosureSummary,
  })
}

verifyRuntimeFlow()

for (const summary of summaries) {
  const parts = [
    `${summary.caseId}: disputes=${summary.disputes.length}`,
    `scripted=${summary.scripted?.entries ?? 0}/${summary.scripted?.expectedEntries ?? 0}`,
    `scriptedVariants=${summary.scripted?.variantTotal ?? 0}`,
    `angles=${summary.angles?.angles ?? 0}`,
    `answers=${summary.angles?.answers ?? 0}/${summary.angles?.expectedAnswers ?? 0}`,
    `answerVariants=${summary.angles?.answerVariantTotal ?? 0}`,
    `judgeQuestions=${summary.angles?.judgeQuestions ?? 0}`,
    `disclosureDisputes=${summary.disclosure?.disputePolicies ?? 0}`,
  ]
  if (summary.caseId === 'spouse-01') {
    parts.push(`spouse-b-d2-answers=${summary.angles?.spouseB_D2Answers ?? 0}`)
    parts.push(`spouse-b-d2-answerVariants=${summary.angles?.spouseB_D2AnswerVariants ?? 0}`)
  }
  console.log(parts.join(' | '))
}

if (findings.length > 0) {
  console.error(`\nverify-scripted-mapping: FAIL (${findings.length} findings)`)
  for (const item of findings.slice(0, 80)) {
    console.error(`[${item.category}] ${item.message}${item.detail ? ` :: ${item.detail}` : ''}`)
  }
  if (findings.length > 80) console.error(`... ${findings.length - 80} more findings omitted`)
  process.exit(1)
}

console.log('\nverify-scripted-mapping: PASS')
