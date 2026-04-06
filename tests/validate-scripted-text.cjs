#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')

const MONETARY_RE = /송금|이체|금액|원\b|돈|비용|계좌|환급|보증금|월세|정산|예치|납부|수당|급여|계약금|위약금|배상금|합의금|채무|대출|융자|임대료|임대인|임차인/
const KOREAN_AMOUNT_RE = /(?:\d[\d,.]*\s*(?:천|백|십)?만?\s*원|[일이삼사오육칠팔구십백천]+만?\s*원)/
const NON_MONETARY_POLLUTION_RE = /송금|이체|계좌|환급|보증금|월세|정산|예치|납부|수당|급여|계약금|위약금|배상금|합의금|채무|대출|융자|임대료|임대인|임차인|채권자|채무자|금전적|재정적|경제적/
const HAEYO_RE = /(했어요|없어요|있어요|같아요|해요|에요|이에요|거예요|줄게요|할게요|겠어요|왔어요|됐어요|봤어요|났어요|갔어요|줬어요|셨어요|드려요|알아요|몰라요)(?=[,.!?]|\s|$)/
const CLICHE_RE = /미리\s?말씀(?:을\s)?드리지\s?못|미리\s?말씀드리지\s?못|미리\s?말씀/
const TRANSLATION_PATTERNS = [
  /된\s?것으로\s?생각됩니다/,
  /인\s?측면이/,
  /부득이하게/,
  /인지하고\s?있습니다/,
  /에\s?기인(?:하여|합니다|한)/,
  /해당\s?건에\s?대해서는/,
  /하는\s?바입니다/,
  /관련\s?사항을\s?간과/,
  /여러\s?가지\s?상황이\s?얽혀/,
]
const META_LEAK_RE = /I'm sorry|I cannot|I can't|as an AI|system prompt|instruction|역할극|프롬프트|지시서/i
const GENERIC_EVIDENCE_STOPWORDS = new Set([
  '관련', '문서', '자료', '기록', '내역', '원본', '사본', '캡처', '캡처본', '묶음', '화면',
  '파일', '로그', '메모', '대화', '메신저', '영수증', '출입기록', '요청', '이미지', '전체',
  '정리', '복원본', '확인서', '스레드', '대시보드', '표', '사본과', '원본과',
])

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function getArgs() {
  const args = process.argv.slice(2)
  const options = { caseId: 'spouse-01' }
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i]
    if (arg === '--case' && args[i + 1]) options.caseId = args[++i]
  }
  return options
}

function issue(severity, code, detail, extra = {}) {
  return { severity, code, detail, ...extra }
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function countSentences(text) {
  return text
    .split(/[.!?。]\s*|\n+/)
    .map((part) => part.trim())
    .filter((part) => part.length >= 4)
    .length
}

function normalizeCaseId(caseId) {
  return caseId.replace(/^case-/, '')
}

function getCaseData(caseId) {
  const filePath = path.join(ROOT, 'src', 'data', 'cases', 'generated', `${caseId}.json`)
  if (!fs.existsSync(filePath)) throw new Error(`missing case JSON: ${filePath}`)
  return loadJson(filePath)
}

function getBundle(caseId) {
  const filePath = path.join(ROOT, 'src', 'data', 'scriptedText', `${caseId}.json`)
  if (!fs.existsSync(filePath)) throw new Error(`missing scripted bundle: ${filePath}`)
  return loadJson(filePath)
}

function getDossierData(caseId) {
  const primary = path.join(ROOT, 'docs', 'ref', '리뉴얼참고', `${caseId}-v3-game-loop-data.json`)
  if (fs.existsSync(primary)) return loadJson(primary)
  return { dossierCards: [] }
}

function getDispute(caseData, disputeId) {
  return (caseData.disputes || []).find((dispute) => dispute.id === disputeId) || null
}

function isMonetaryDispute(caseData, disputeId) {
  const dispute = getDispute(caseData, disputeId)
  if (!dispute) return false
  const haystack = [dispute.name, dispute.anchorTruth, dispute.truthDescription].filter(Boolean).join(' ')
  return KOREAN_AMOUNT_RE.test(haystack) || MONETARY_RE.test(haystack)
}

function requiresConcreteAmount(caseData, disputeId) {
  const dispute = getDispute(caseData, disputeId)
  if (!dispute) return false
  const haystack = [dispute.name, dispute.anchorTruth, dispute.truthDescription].filter(Boolean).join(' ')
  return KOREAN_AMOUNT_RE.test(haystack)
}

function collectForbiddenNames(caseData, party) {
  const names = []
  const opponent = party === 'a' ? caseData.duo.partyB : caseData.duo.partyA
  if (opponent?.name) {
    names.push(opponent.name)
    if (opponent.name.length >= 3) names.push(opponent.name.slice(1))
  }
  for (const person of caseData.duo.socialGraph || []) {
    if (person?.name) names.push(person.name)
  }
  return [...new Set(names.filter((name) => typeof name === 'string' && name.length >= 2))]
}

function getPreferredPartnerReference(caseData, party) {
  return party === 'a'
    ? caseData.duo.partyA.callTerms?.toJudge || ''
    : caseData.duo.partyB.callTerms?.toJudge || ''
}

function deriveEvidenceSubjectRole(evidence, party) {
  const subjectParty = evidence.subjectParty || 'both'
  if (subjectParty === party) return 'self'
  if (subjectParty === 'both') {
    return evidence.provenance === 'institutional' ? 'institutional' : 'both'
  }
  return evidence.provenance === 'institutional' ? 'institutional' : 'other'
}

function extractEvidenceKeywords(evidence) {
  const source = [evidence.name, evidence.description]
    .filter(Boolean)
    .join(' ')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
  return [...new Set(
    source
      .split(/\s+/)
      .map((token) => token.trim())
      .filter((token) => token.length >= 2 && !GENERIC_EVIDENCE_STOPWORDS.has(token)),
  )]
}

function trigramSimilarity(a, b) {
  const setA = toCharTrigrams(a)
  const setB = toCharTrigrams(b)
  if (!setA.size || !setB.size) return 0
  let intersection = 0
  for (const item of setA) {
    if (setB.has(item)) intersection += 1
  }
  const union = new Set([...setA, ...setB]).size
  return union ? intersection / union : 0
}

function toCharTrigrams(value) {
  const normalized = value
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
  const set = new Set()
  for (let i = 0; i <= normalized.length - 3; i += 1) {
    const slice = normalized.slice(i, i + 3)
    if (slice.trim().length === 3) set.add(slice)
  }
  return set
}

function expectedSentenceRange(ctx) {
  const stance = ctx.stanceHint || 'answer'
  if (ctx.channel === 'aftermath') return { min: 2, max: 5 }
  if (ctx.channel === 'system_message') return { min: 1, max: 3 }
  if (ctx.channel === 'witness') {
    if (ctx.depth === 'vague') return { min: 1, max: 2 }
    if (ctx.depth === 'partial') return { min: 2, max: 3 }
    return { min: 2, max: 4 }
  }
  if (ctx.lieState === 'S5') return { min: 3, max: 4 }
  if (stance === 'deny' || stance === 'hedge') return { min: 1, max: 2 }
  if (stance === 'partial' || stance === 'blame' || stance === 'emotional') return { min: 2, max: 3 }
  if (stance === 'confess') return { min: 2, max: 3 }
  return { min: 1, max: 3 }
}

function validateBundleShape(bundle, issues) {
  if (bundle.schemaVersion !== 1) {
    issues.push(issue('ERROR', 'SC1', `unsupported schemaVersion: ${bundle.schemaVersion}`))
  }
  if (!bundle.caseId) {
    issues.push(issue('ERROR', 'SC2', 'missing caseId'))
  }
  if (!bundle.coverage || !bundle.channels) {
    issues.push(issue('ERROR', 'SC3', 'bundle must include coverage and channels'))
  }
}

function validateManifest(bundle, caseData, dossierData, issues) {
  const expectedDisputes = (caseData.disputes || []).map((dispute) => dispute.id).sort()
  const expectedEvidence = (caseData.evidence || []).map((evidence) => evidence.id).sort()
  const expectedWitnesses = (caseData.duo.socialGraph || []).map((person) => person.id).sort()
  const expectedDossierQuestions = []

  for (const card of dossierData.dossierCards || []) {
    for (const challenge of card.challenges || []) {
      for (const question of challenge.questions || []) {
        expectedDossierQuestions.push(question.id)
      }
    }
  }

  const actualDisputes = [...(bundle.coverage?.interrogation?.disputes || [])].sort()
  const actualEvidence = [...(bundle.coverage?.evidence_present?.evidenceIds || [])].sort()
  const actualWitnesses = [...(bundle.coverage?.witness?.witnessIds || [])].sort()
  const actualDossierQuestions = [...(bundle.coverage?.dossier?.questionIds || [])].sort()

  if (JSON.stringify(expectedDisputes) !== JSON.stringify(actualDisputes)) {
    issues.push(issue('ERROR', 'CV0', 'interrogation dispute coverage does not match case disputes'))
  }
  if (JSON.stringify(expectedEvidence) !== JSON.stringify(actualEvidence)) {
    issues.push(issue('ERROR', 'CV0', 'evidence coverage does not match case evidence'))
  }
  if (JSON.stringify(expectedWitnesses) !== JSON.stringify(actualWitnesses)) {
    issues.push(issue('ERROR', 'CV0', 'witness coverage does not match socialGraph witness ids'))
  }
  if (expectedDossierQuestions.length > 0 && JSON.stringify([...expectedDossierQuestions].sort()) !== JSON.stringify(actualDossierQuestions)) {
    issues.push(issue('ERROR', 'CV0', 'dossier coverage does not match dossier question ids'))
  }
}

function validateUniqueEntries(entries, issues, channelName) {
  const map = new Map()
  for (const entry of entries) {
    if (map.has(entry.key)) {
      issues.push(issue('ERROR', 'CV2', `duplicate key in ${channelName}: ${entry.key}`, { channel: channelName, key: entry.key }))
    } else {
      map.set(entry.key, entry)
    }
  }
  return map
}

function lintVariantText(text, behaviorHint, ctx, issues) {
  if (!text || typeof text !== 'string' || text.trim().length < 5) {
    issues.push(issue('FAIL', 'QV1', 'variant text is too short', ctx))
    return
  }
  if (!behaviorHint || typeof behaviorHint !== 'string' || !behaviorHint.trim()) {
    issues.push(issue('FAIL', 'QV2', 'missing behaviorHint', ctx))
  }

  if (TRANSLATION_PATTERNS.some((pattern) => pattern.test(text))) {
    issues.push(issue('FAIL', 'A2', '번역체/공문체 잔존', ctx))
  }
  if (CLICHE_RE.test(text)) {
    issues.push(issue('WARN', 'A4', '클리셰: 미리 말씀', ctx))
  }
  if (META_LEAK_RE.test(text)) {
    issues.push(issue('CRITICAL', 'E1', '메타/프롬프트 누출', ctx))
  }

  const sentenceRange = expectedSentenceRange(ctx)
  const sentenceCount = countSentences(text)
  if (sentenceCount < sentenceRange.min || sentenceCount > sentenceRange.max) {
    issues.push(issue('FAIL', 'ST1', `문장 수 불일치 (${sentenceCount}, expected ${sentenceRange.min}-${sentenceRange.max})`, ctx))
  }

  const isLate = ctx.lieState === 'S4' || ctx.lieState === 'S5' || ctx.lieBand === 'late'
  if (!isLate && ['interrogation', 'evidence_present', 'dossier'].includes(ctx.channel) && HAEYO_RE.test(text)) {
    issues.push(issue('FAIL', 'C4', '해요체 잔존', ctx))
  }

  if (ctx.disputeId) {
    const monetary = isMonetaryDispute(ctx.caseData, ctx.disputeId)
    if (!monetary && (KOREAN_AMOUNT_RE.test(text) || NON_MONETARY_POLLUTION_RE.test(text))) {
      issues.push(issue('CRITICAL', 'A1', '비금전 사건 금전 오염', ctx))
    }
    if (
      ctx.channel === 'interrogation' &&
      ['S0', 'S1'].includes(ctx.lieState || '') &&
      requiresConcreteAmount(ctx.caseData, ctx.disputeId) &&
      KOREAN_AMOUNT_RE.test(text)
    ) {
      issues.push(issue('CRITICAL', 'B1', 'S0-S1 금액 조기 노출', ctx))
    }
    if (ctx.channel === 'interrogation' && ['S0', 'S1'].includes(ctx.lieState || '')) {
      const forbiddenNames = collectForbiddenNames(ctx.caseData, ctx.party)
      const leaked = forbiddenNames.filter((name) => new RegExp(escapeRegExp(name)).test(text))
      if (leaked.length > 0) {
        issues.push(issue('CRITICAL', 'B2', `S0-S1 실명 조기 노출: ${leaked.join(', ')}`, ctx))
      }
    }
    if (
      ctx.channel === 'interrogation' &&
      ctx.lieState === 'S5' &&
      requiresConcreteAmount(ctx.caseData, ctx.disputeId) &&
      !KOREAN_AMOUNT_RE.test(text)
    ) {
      issues.push(issue('FAIL', 'B4', 'S5 구체적 금액 미포함', ctx))
    }
  }

  if (ctx.party && ['interrogation', 'evidence_present', 'dossier'].includes(ctx.channel)) {
    const preferred = getPreferredPartnerReference(ctx.caseData, ctx.party)
    const opponent = ctx.party === 'a' ? ctx.caseData.duo.partyB : ctx.caseData.duo.partyA
    const badNames = [opponent?.name, opponent?.name?.slice(1)].filter(Boolean)
    const leakedJudgeReference = badNames.some((name) => new RegExp(escapeRegExp(name)).test(text))
    if (leakedJudgeReference && preferred) {
      issues.push(issue('FAIL', 'H1', `호칭 규칙 위반 가능성: ${preferred} 대신 실명 사용`, ctx))
    }
  }
}

function lintVariantGroup(entry, variants, issues, ctxBase) {
  for (const [index, variant] of variants.entries()) {
    lintVariantText(variant.text, variant.behaviorHint, {
      ...ctxBase,
      variantId: variant.id || `${entry.key}#${index + 1}`,
    }, issues)
  }

  for (let i = 0; i < variants.length; i += 1) {
    for (let j = i + 1; j < variants.length; j += 1) {
      const similarity = trigramSimilarity(variants[i].text, variants[j].text)
      if (similarity >= 0.8) {
        issues.push(issue('WARN', 'D2', `variant 유사도 과다 (${Math.round(similarity * 100)}%)`, {
          ...ctxBase,
          variantId: `${variants[i].id} <> ${variants[j].id}`,
        }))
      }
    }
  }
}

function validateInterrogation(bundle, caseData, issues) {
  const channel = bundle.channels.interrogation
  const coverage = bundle.coverage.interrogation
  const entryMap = validateUniqueEntries(channel.entries || [], issues, 'interrogation')

  for (const party of coverage.parties) {
    for (const disputeId of coverage.disputes) {
      for (const lieState of coverage.lieStates) {
        for (const questionType of coverage.questionTypes) {
          const key = [party, disputeId, lieState, questionType].join('|')
          const entry = entryMap.get(key)
          if (!entry) {
            issues.push(issue('ERROR', 'CV1', `missing interrogation key: ${key}`, { channel: 'interrogation', key }))
            continue
          }
          if (entry.key !== key) {
            issues.push(issue('ERROR', 'CV3', `entry key mismatch: ${entry.key} !== ${key}`, { channel: 'interrogation', key }))
          }
          if (!Array.isArray(entry.variants) || entry.variants.length !== coverage.variantsPerKey) {
            issues.push(issue('FAIL', 'QV0', `interrogation variants must be ${coverage.variantsPerKey}`, { channel: 'interrogation', key }))
            continue
          }
          lintVariantGroup(entry, entry.variants, issues, {
            channel: 'interrogation',
            key,
            caseData,
            party,
            disputeId,
            lieState,
            questionType,
            stanceHint: entry.stanceHint,
          })
        }
      }
    }
  }

  for (const entry of channel.entries || []) {
    const expectedKey = [entry.party, entry.disputeId, entry.lieState, entry.questionType].join('|')
    if (entry.key !== expectedKey) {
      issues.push(issue('ERROR', 'CV3', `unexpected interrogation key payload: ${entry.key}`, { channel: 'interrogation', key: entry.key }))
    }
  }
}

function validateEvidencePresent(bundle, caseData, issues) {
  const channel = bundle.channels.evidence_present
  const coverage = bundle.coverage.evidence_present
  const entryMap = validateUniqueEntries(channel.entries || [], issues, 'evidence_present')

  for (const party of coverage.parties) {
    for (const evidenceId of coverage.evidenceIds) {
      const evidence = (caseData.evidence || []).find((item) => item.id === evidenceId)
      if (!evidence) continue
      const subjectRole = deriveEvidenceSubjectRole(evidence, party)
      for (const lieBand of coverage.lieBands) {
        const key = [party, evidenceId, lieBand, subjectRole].join('|')
        const entry = entryMap.get(key)
        if (!entry) {
          issues.push(issue('ERROR', 'CV1', `missing evidence_present key: ${key}`, { channel: 'evidence_present', key }))
          continue
        }
        if (!Array.isArray(entry.variants) || entry.variants.length !== coverage.variantsPerKey) {
          issues.push(issue('FAIL', 'QV0', `evidence_present variants must be ${coverage.variantsPerKey}`, { channel: 'evidence_present', key }))
          continue
        }
        const evidenceKeywords = extractEvidenceKeywords(evidence)
        lintVariantGroup(entry, entry.variants, issues, {
          channel: 'evidence_present',
          key,
          caseData,
          party,
          disputeId: evidence.proves?.[0] || null,
          lieBand,
          stanceHint: entry.stanceHint,
        })
        for (const variant of entry.variants) {
          const directReaction = evidenceKeywords.some((keyword) => variant.text.includes(keyword))
          if (!directReaction) {
            issues.push(issue('FAIL', 'EV1', 'evidence_present에서 증거 직접 반응 부족', {
              channel: 'evidence_present',
              key,
              variantId: variant.id,
            }))
          }
        }
      }
    }
  }
}

function buildDossierQuestionMap(dossierData) {
  const map = new Map()
  for (const card of dossierData.dossierCards || []) {
    for (const challenge of card.challenges || []) {
      for (const question of challenge.questions || []) {
        map.set(question.id, {
          targetParty: challenge.targetParty,
          relatedDisputes: card.relatedDisputes || [],
        })
      }
    }
  }
  return map
}

function validateDossier(bundle, caseData, dossierData, issues) {
  const channel = bundle.channels.dossier
  const coverage = bundle.coverage.dossier
  const entryMap = validateUniqueEntries(channel.entries || [], issues, 'dossier')
  const questionMap = buildDossierQuestionMap(dossierData)

  for (const questionId of coverage.questionIds) {
    const meta = questionMap.get(questionId)
    if (!meta) {
      issues.push(issue('ERROR', 'CV4', `unknown dossier question id: ${questionId}`, { channel: 'dossier', key: questionId }))
      continue
    }
    for (const lieBand of coverage.lieBands) {
      const key = [meta.targetParty, questionId, lieBand].join('|')
      const entry = entryMap.get(key)
      if (!entry) {
        issues.push(issue('ERROR', 'CV1', `missing dossier key: ${key}`, { channel: 'dossier', key }))
        continue
      }
      if (!Array.isArray(entry.variants) || entry.variants.length !== coverage.variantsPerKey) {
        issues.push(issue('FAIL', 'QV0', `dossier variants must be ${coverage.variantsPerKey}`, { channel: 'dossier', key }))
        continue
      }
      lintVariantGroup(entry, entry.variants, issues, {
        channel: 'dossier',
        key,
        caseData,
        party: meta.targetParty,
        disputeId: meta.relatedDisputes[0] || null,
        lieBand,
        stanceHint: entry.stanceHint,
      })
    }
  }
}

function validateWitness(bundle, caseData, issues) {
  const channel = bundle.channels.witness
  const coverage = bundle.coverage.witness
  const entryMap = validateUniqueEntries(channel.entries || [], issues, 'witness')

  for (const witnessId of coverage.witnessIds) {
    for (const depth of coverage.depths) {
      const key = [witnessId, depth].join('|')
      const entry = entryMap.get(key)
      if (!entry) {
        issues.push(issue('ERROR', 'CV1', `missing witness key: ${key}`, { channel: 'witness', key }))
        continue
      }
      if (!Array.isArray(entry.variants) || entry.variants.length !== coverage.variantsPerKey) {
        issues.push(issue('FAIL', 'QV0', `witness variants must be ${coverage.variantsPerKey}`, { channel: 'witness', key }))
        continue
      }
      lintVariantGroup(entry, entry.variants, issues, {
        channel: 'witness',
        key,
        caseData,
        depth,
        stanceHint: entry.stanceHint,
      })
    }
  }
}

function validateAftermath(bundle, caseData, issues) {
  const channel = bundle.channels.aftermath
  const coverage = bundle.coverage.aftermath
  const entryMap = validateUniqueEntries(channel.entries || [], issues, 'aftermath')

  for (const resultClass of coverage.resultClasses) {
    const key = resultClass
    const entry = entryMap.get(key)
    if (!entry) {
      issues.push(issue('ERROR', 'CV1', `missing aftermath key: ${key}`, { channel: 'aftermath', key }))
      continue
    }
    if (!Array.isArray(entry.variants) || entry.variants.length !== coverage.variantsPerKey) {
      issues.push(issue('FAIL', 'QV0', `aftermath variants must be ${coverage.variantsPerKey}`, { channel: 'aftermath', key }))
      continue
    }
    lintVariantGroup(entry, entry.variants, issues, {
      channel: 'aftermath',
      key,
      caseData,
    })
  }
}

function validateSystemMessage(bundle, caseData, issues) {
  const channel = bundle.channels.system_message
  const coverage = bundle.coverage.system_message
  const entryMap = validateUniqueEntries(channel.entries || [], issues, 'system_message')

  for (const keyMeta of coverage.keys) {
    const key = [keyMeta.context, keyMeta.eventType].join('|')
    const entry = entryMap.get(key)
    if (!entry) {
      issues.push(issue('ERROR', 'CV1', `missing system_message key: ${key}`, { channel: 'system_message', key }))
      continue
    }
    if (!Array.isArray(entry.variants) || entry.variants.length !== coverage.variantsPerKey) {
      issues.push(issue('FAIL', 'QV0', `system_message variants must be ${coverage.variantsPerKey}`, { channel: 'system_message', key }))
      continue
    }
    lintVariantGroup(entry, entry.variants, issues, {
      channel: 'system_message',
      key,
      caseData,
    })
  }
}

function formatIssue(entry) {
  const where = [entry.channel, entry.key, entry.variantId].filter(Boolean).join(' / ')
  return `- [${entry.severity}] ${entry.code}${where ? ` ${where}` : ''}: ${entry.detail}`
}

function summarize(issues) {
  const counts = {}
  for (const entry of issues) {
    counts[entry.severity] = (counts[entry.severity] || 0) + 1
  }
  return counts
}

function main() {
  const { caseId } = getArgs()
  const normalizedCaseId = normalizeCaseId(caseId)
  const issues = []

  let bundle
  let caseData
  let dossierData
  try {
    bundle = getBundle(normalizedCaseId)
    caseData = getCaseData(normalizedCaseId)
    dossierData = getDossierData(normalizedCaseId)
  } catch (error) {
    console.error(`[validate-scripted-text] ${error instanceof Error ? error.message : String(error)}`)
    process.exit(1)
  }

  validateBundleShape(bundle, issues)
  validateManifest(bundle, caseData, dossierData, issues)
  validateInterrogation(bundle, caseData, issues)
  validateEvidencePresent(bundle, caseData, issues)
  validateDossier(bundle, caseData, dossierData, issues)
  validateWitness(bundle, caseData, issues)
  validateAftermath(bundle, caseData, issues)
  validateSystemMessage(bundle, caseData, issues)

  const counts = summarize(issues)
  console.log(`[validate-scripted-text] case=${normalizedCaseId}`)
  console.log(`[validate-scripted-text] summary=${JSON.stringify(counts)}`)
  if (issues.length === 0) {
    console.log('[validate-scripted-text] PASS')
    process.exit(0)
  }

  for (const entry of issues) {
    console.log(formatIssue(entry))
  }

  const hasBlocking = issues.some((entry) => ['ERROR', 'CRITICAL', 'FAIL'].includes(entry.severity))
  process.exit(hasBlocking ? 1 : 0)
}

main()
