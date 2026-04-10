#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')

const MONETARY_RE = /송금|이체|금액|원\b|돈|비용|계좌|환급|보증금|월세|정산|예치|납부|수당|급여|계약금|위약금|배상금|합의금|채무|대출|융자|임대료|임대인|임차인/
const KOREAN_AMOUNT_RE = /(?<![가-힣A-Za-z0-9])(?:\d[\d,.]*\s*(?:천|백|십)?만?\s*원|[일이삼사오육칠팔구십백천]+(?:\s*(?:천|백|십|만))?\s*원)(?![가-힣A-Za-z0-9])/u
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
const CLICHE_HARD_RE = /(?:\uC0AC\uC804\s*(?:\uD611\uC758|\uD569\uC758)|\uD2B9\uC815\s*[A-Za-z0-9\uAC00-\uD7A3]+\uB9CC\uC744|\uADF8\s*\uBD80\uBD84\uC5D0\s*\uB300\uD574\uC11C\uB294|\uC5EC\uB7EC\s*\uAC00\uC9C0\s*\uC0C1\uD669\uC744\s*\uC885\uD569|\uC885\uD569\uC801\uC73C\uB85C\s*\uACE0\uB824|\uAD00\uB828\s*\uC0AC\uD56D|\uBD88\uAC00\uD53C\uD558\uAC8C)/u
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

function containsStandaloneNameRef(text, name) {
  const token = String(name || '').trim()
  if (!token || token.length < 2) return false
  const escaped = escapeRegExp(token)
  const boundaryRe = new RegExp(`(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`, 'u')
  const honorificRe = new RegExp(`${escaped}(?=\\s*(?:씨|님|측|쪽|은|는|이|가|을|를|과|와|도|에게|께|의|부터|까지|만|조차|처럼|이라고|이라며))`, 'u')
  return boundaryRe.test(text) || honorificRe.test(text)
}

function countSentences(text) {
  return text
    .split(/[.!?。]\s*|\n+/)
    .map((part) => part.trim())
    .filter((part) => part.length >= 4)
    .length
}

function splitSentences(text) {
  return (text.match(/[^.!?]+[.!?]?/gu) || [])
    .map((part) => part.trim())
    .filter((part) => part.length >= 2)
}

function isJudgeFacingChannel(channel) {
  return ['interrogation', 'evidence_present', 'dossier', 'witness'].includes(channel)
}

function sentenceLooksFormal(sentence) {
  const normalized = sentence
    .replace(/[\"'\`()\[\]{}]/g, '')
    .replace(/[.!?]+$/g, '')
    .trim()

  if (!normalized) return true
  if (/요$/u.test(normalized)) return false
  return /(니다|니까|십시오)$/u.test(normalized)
}

function detectLeadingPolarity(text) {
  const firstSentence = splitSentences(text)[0] || ''
  const normalized = firstSentence.replace(/\s+/g, ' ').trim()
  const denyPatterns = [
    /^아닙니다/u,
    /^아니요/u,
    /^그렇지 않습니다/u,
    /^부인하지 않겠습니다/u,
    /^다투지 않겠습니다/u,
    /^거두겠습니다/u,
  ]
  const affirmPatterns = [
    /^맞습니다/u,
    /^네,/u,
    /^네\./u,
    /^인정합니다/u,
    /^받아들이겠습니다/u,
    /^피하지 않겠습니다/u,
  ]
  if (denyPatterns.some((pattern) => pattern.test(normalized))) return 'deny'
  if (affirmPatterns.some((pattern) => pattern.test(normalized))) return 'affirm'
  return 'unknown'
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

function findFileRecursiveByName(dir, targetName) {
  if (!fs.existsSync(dir)) return null
  for (const name of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, name)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      const nested = findFileRecursiveByName(fullPath, targetName)
      if (nested) return nested
    } else if (name === targetName) {
      return fullPath
    }
  }
  return null
}

function getDossierData(caseId) {
  const refDir = path.join(ROOT, 'docs', 'ref')
  const targetName = `${caseId}-v3-game-loop-data.json`
  const located = findFileRecursiveByName(refDir, targetName)
  if (located) return loadJson(located)
  return { dossierCards: [] }
}

function getDispute(caseData, disputeId) {
  return (caseData.disputes || []).find((dispute) => dispute.id === disputeId) || null
}

function isMonetaryDispute(caseData, disputeId) {
  if (Array.isArray(caseData.monetaryDisputeIds)) {
    return caseData.monetaryDisputeIds.includes(disputeId)
  }
  const dispute = getDispute(caseData, disputeId)
  if (!dispute) return false
  const haystack = [dispute.name, dispute.anchorTruth, dispute.truthDescription].filter(Boolean).join(' ')
  return KOREAN_AMOUNT_RE.test(haystack) || MONETARY_RE.test(haystack)
}

function requiresConcreteAmount(caseData, disputeId) {
  if (Array.isArray(caseData.monetaryDisputeIds)) {
    return caseData.monetaryDisputeIds.includes(disputeId)
  }
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

function getSpeakerEntity(caseData, ctx) {
  if (ctx.channel === 'witness') {
    return (caseData?.duo?.socialGraph || []).find((item) => item.id === ctx.witnessId) || null
  }
  if (ctx.party === 'a') return caseData?.duo?.partyA || null
  if (ctx.party === 'b') return caseData?.duo?.partyB || null
  return null
}

function collectForbiddenOrganizationNames(caseData) {
  const set = new Set()
  const orgRe = /[A-Za-z0-9가-힣]+(?:팀|센터|병원|학교|연구소|재단|법인|위원회|사무소|플랫폼|구청|경찰서|법원|소속사|스튜디오|협회|조합|클리닉|대학|학원|기관)/u
  for (const evidence of caseData.evidence || []) {
    const candidates = [
      evidence?.meta?.sourceLabel,
      evidence?.viewerData?.sourceNote,
      evidence?.partyContext?.a?.questionAngle,
      evidence?.partyContext?.b?.questionAngle,
      evidence?.name,
    ].filter(Boolean)
    for (const value of candidates) {
      const match = String(value).match(orgRe)
      if (match?.[0] && match[0].length >= 3) set.add(match[0])
    }
  }
  return [...set]
}

function collectTruthThrottleForbiddenNames(caseData, party) {
  return [
    ...collectForbiddenNames(caseData, party),
    ...collectForbiddenOrganizationNames(caseData),
  ]
}

function getJudgeCallTerm(caseData, party) {
  const speaker = party === 'a' ? caseData?.duo?.partyA : caseData?.duo?.partyB
  const preferred = speaker?.callTerms?.toJudge || ''
  if (preferred && !leadLooksLikeJudgeAddress(preferred)) return preferred
  return fallbackCounterpartyJudgeReference(caseData, party)
}

function fallbackCounterpartyJudgeReference(caseData, party) {
  const relationshipType = caseData?.duo?.relationshipType || caseData?.meta?.relationshipType || ''
  const map = {
    spouse: { a: '\uC81C \uB0A8\uD3B8', b: '\uC81C \uC544\uB0B4' },
    friend: { a: '\uC81C \uCE5C\uAD6C', b: '\uC81C \uCE5C\uAD6C' },
    workplace: { a: '\uC81C \uD300\uC6D0', b: '\uC81C \uD300\uC7A5' },
    tenant: { a: '\uC9D1\uC8FC\uC778', b: '\uC138\uC785\uC790' },
    partnership: { a: '\uC81C \uB3D9\uC5C5\uC790', b: '\uC81C \uB3D9\uC5C5\uC790' },
    family: { a: '\uAC00\uC871', b: '\uAC00\uC871' },
    neighbor: { a: '\uC606\uC9D1 \uC0AC\uB78C', b: '\uC606\uC9D1 \uC0AC\uB78C' },
    headline: { a: '\uADF8 \uC5C5\uC8FC', b: '\uADF8 \uB9AC\uBDF0\uC5B4' },
    professional: { a: '\uC0C1\uB300\uBC29', b: '\uC0C1\uB300\uBC29' },
    civic: { a: '\uC0C1\uB300\uBC29', b: '\uC0C1\uB300\uBC29' },
    online: { a: '\uC0C1\uB300\uBC29', b: '\uC0C1\uB300\uBC29' },
  }
  return map[relationshipType]?.[party] || '\uC0C1\uB300\uBC29'
}

function getForbiddenJudgeAddressTerms(caseData, party) {
  const speaker = party === 'a' ? caseData?.duo?.partyA : caseData?.duo?.partyB
  return [
    speaker?.callTerms?.toPartner,
    speaker?.callTerms?.angry,
  ].filter((value) => typeof value === 'string' && value.trim().length >= 2)
}

function extractLeadAddress(text) {
  const normalized = String(text || '').trim()
  const match = normalized.match(/^([^,.!?]{2,20})[,.!?]/u)
  return match?.[1]?.trim() || ''
}

function normalizeLevel4Text(text) {
  return String(text || '')
    .replace(/[A-Za-z0-9]+/g, ' ')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function tokenizeLevel4(text) {
  return [...new Set(
    normalizeLevel4Text(text)
      .split(/\s+/)
      .map((token) => token.trim())
      .filter((token) => token.length >= 2)
      .filter((token) => !GENERIC_EVIDENCE_STOPWORDS.has(token))
  )]
}

function countCueHits(text, cueTokens) {
  const normalized = normalizeLevel4Text(text)
  return cueTokens.filter((token) => normalized.includes(token)).length
}

function collectEvidenceCueTokens(evidence) {
  return tokenizeLevel4([
    evidence?.name,
    evidence?.surfaceName,
    evidence?.description,
    evidence?.surfaceDescription,
    evidence?.investigationResults?.restore_context,
    evidence?.investigationResults?.check_metadata,
    evidence?.investigationResults?.note_a,
    evidence?.investigationResults?.request_original,
  ].filter(Boolean).join(' '))
}

function collectWitnessCueTokens(caseData, witnessId) {
  const witness = (caseData?.duo?.socialGraph || []).find((item) => item.id === witnessId)
  if (!witness) return []
  const disputeMap = new Map((caseData.disputes || []).map((item) => [item.id, item]))
  const evidenceMap = new Map((caseData.evidence || []).map((item) => [item.id, item]))
  const relatedDisputes = (witness.relatedDisputeIds || [])
    .map((id) => disputeMap.get(id))
    .filter(Boolean)
  const relatedEvidence = (caseData.evidence || []).filter((item) =>
    Array.isArray(item?.proves) && item.proves.some((id) => (witness.relatedDisputeIds || []).includes(id))
  )
  return tokenizeLevel4([
    witness.name,
    witness.knowledgeScope,
    witness.witnessProfile?.occupation,
    witness.witnessProfile?.speechStyle,
    ...relatedDisputes.flatMap((item) => [item.name, item.truthDescription, item.judgmentStatement]),
    ...relatedEvidence.flatMap((item) => [item.name, item.surfaceName]),
  ].filter(Boolean).join(' '))
}

function looksLikeLegacyWitnessScaffold(text) {
  return [
    '사건 흐름을 시점별로 나누어 설명',
    '자신이 직접 확인한 범위',
    '직접 본 장면과 전해 들은 부분을 구분',
    '단계별로 정리합니다',
    '직접 확인한 범위만 말한다고 진술',
  ].some((snippet) => String(text || '').includes(snippet))
}

function looksLikeLegacyEvidenceScaffold(text) {
  return [
    '기록만으로는 결론을 내리기 어렵습니다',
    '출처와 맥락을 먼저 확인해 주십시오',
    '자료가 의심을 키우는 것은 압니다',
    '자료는 해석이 갈릴 수 있습니다',
    '질문이 더 필요한 자료입니다',
  ].some((snippet) => String(text || '').includes(snippet))
}

function looksLikeLegacyDossierScaffold(text) {
  return [
    '그 질문은 아직 전제가 너무 앞서 있습니다',
    '결론을 미리 포함하고 있습니다',
    '순서가 한 칸 빠져 있습니다',
  ].some((snippet) => String(text || '').includes(snippet))
}

function looksLikeLegacyInterrogationScaffold(text) {
  return [
    '부분은 아직 사실관계가 확정되지 않았습니다',
    '의 순서를 기준으로 다시 보아 주십시오',
    '지적은 확인보다 해석이 앞서 있습니다',
    '한쪽만의 책임으로 닫히지 않습니다',
  ].some((snippet) => String(text || '').includes(snippet))
}

function looksLikeLegacyAftermathScaffold(text) {
  return [
    '본인 측 책임을 더 무겁게 적습니다',
    '상대방 측 조치도 별도로 기록합니다',
    '쌍방 책임입니다',
    '보호를 우선합니다',
    '절차 경고 중심입니다',
  ].some((snippet) => String(text || '').includes(snippet))
}

function pushLevel4Issue(issues, code, detail, extra = {}) {
  issues.push(issue('WARN', code, detail, extra))
}

function validateWitnessLevel4(entry, caseData, issues, ctxBase) {
  const cueTokens = collectWitnessCueTokens(caseData, entry.witnessId)
  for (const variant of entry.variants || []) {
    const text = variant.text || ''
    if (looksLikeLegacyWitnessScaffold(text)) {
      pushLevel4Issue(issues, '4-D', '증인 증언이 공통 메타 서술 골격에 치우쳐 있습니다', {
        ...ctxBase,
        variantId: variant.id,
      })
      continue
    }
    if (cueTokens.length > 0 && countCueHits(text, cueTokens) === 0) {
      pushLevel4Issue(issues, '4-D', '증인 증언에 사건 고유 단서가 부족합니다', {
        ...ctxBase,
        variantId: variant.id,
      })
    }
  }
}

function validateEvidenceLevel4(entry, evidence, issues, ctxBase) {
  const cueTokens = collectEvidenceCueTokens(evidence)
  for (const variant of entry.variants || []) {
    const text = variant.text || ''
    if (looksLikeLegacyEvidenceScaffold(text)) {
      pushLevel4Issue(issues, '4-E', '증거 반응이 범용 골격에 치우쳐 있습니다', {
        ...ctxBase,
        variantId: variant.id,
      })
      continue
    }
    if (cueTokens.length > 0 && countCueHits(text, cueTokens) === 0) {
      pushLevel4Issue(issues, '4-E', '증거 반응에 해당 증거의 구체 내용이 부족합니다', {
        ...ctxBase,
        variantId: variant.id,
      })
    }
  }
}

function validateDossierLevel4(entry, meta, issues, ctxBase) {
  const cueTokens = tokenizeLevel4([meta?.text, meta?.hint].filter(Boolean).join(' '))
  for (const variant of entry.variants || []) {
    const text = variant.text || ''
    if (looksLikeLegacyDossierScaffold(text)) {
      pushLevel4Issue(issues, '4-E', 'Dossier 반응이 질문 고유 정보보다 공통 방어문에 치우쳐 있습니다', {
        ...ctxBase,
        variantId: variant.id,
      })
      continue
    }
    if (cueTokens.length > 0 && countCueHits(text, cueTokens) === 0) {
      pushLevel4Issue(issues, '4-E', 'Dossier 반응에 질문 고유 전제가 거의 반영되지 않았습니다', {
        ...ctxBase,
        variantId: variant.id,
      })
    }
  }
}

function validateAftermathLevel4(entry, caseData, issues, ctxBase) {
  const solutionKeys = Object.keys(caseData?.solutions || {})
  const disputeTokens = tokenizeLevel4((caseData?.disputes || []).map((item) => item.name).join(' '))
  for (const variant of entry.variants || []) {
    const text = variant.text || ''
    if (looksLikeLegacyAftermathScaffold(text)) {
      pushLevel4Issue(issues, '4-H', 'aftermath가 공통 결과 템플릿에 가깝습니다', {
        ...ctxBase,
        variantId: variant.id,
      })
      continue
    }
    const cueHits = countCueHits(text, disputeTokens) + solutionKeys.filter((key) => text.includes(key)).length
    if (cueHits === 0) {
      pushLevel4Issue(issues, '4-H', 'aftermath에 사건 고유 결말이나 선택 솔루션이 부족합니다', {
        ...ctxBase,
        variantId: variant.id,
      })
    }
  }
}

function validateInterrogationLevel4(entry, issues, ctxBase) {
  for (const variant of entry.variants || []) {
    if (looksLikeLegacyInterrogationScaffold(variant.text || '')) {
      pushLevel4Issue(issues, '4-F', '분쟁명 조각을 끼워 넣은 구형 interrogation scaffold가 남아 있습니다', {
        ...ctxBase,
        variantId: variant.id,
      })
    }
  }
}

function leadLooksLikeJudgeAddress(leadAddress) {
  const judgeTitles = ['\uC7AC\uD310\uAD00\uB2D8', '\uC7AC\uD310\uC7A5\uB2D8', '\uD310\uC0AC\uB2D8', '\uC7AC\uD310\uBD80', '\uC7AC\uD310\uAD00', '\uC7AC\uD310\uC7A5', '\uD310\uC0AC']
  return judgeTitles.some((term) => leadAddress.includes(term))
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
    if (ctx.depth === 'vague') return { min: 1, max: 1 }
    if (ctx.depth === 'partial') return { min: 2, max: 3 }
    return { min: 3, max: 5 }
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
  if (CLICHE_HARD_RE.test(text)) {
    issues.push(issue('FAIL', 'A5', 'translationese/cliche surface', ctx))
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
  if (!isLate && ['interrogation', 'evidence_present', 'dossier', 'witness'].includes(ctx.channel) && HAEYO_RE.test(text)) {
    issues.push(issue('FAIL', 'C4', '해요체 잔존', ctx))
  }

  if (isJudgeFacingChannel(ctx.channel)) {
    const nonFormalSentence = splitSentences(text).find((sentence) => !sentenceLooksFormal(sentence))
    if (nonFormalSentence) {
      issues.push(issue('FAIL', 'C1', `재판관 대상 합니다체 위반 가능성: ${nonFormalSentence}`, ctx))
    }
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
      const forbiddenNames = collectTruthThrottleForbiddenNames(ctx.caseData, ctx.party)
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
    const preferred = getJudgeCallTerm(ctx.caseData, ctx.party) || getPreferredPartnerReference(ctx.caseData, ctx.party)
    const opponent = ctx.party === 'a' ? ctx.caseData.duo.partyB : ctx.caseData.duo.partyA
    const badNames = [opponent?.name, opponent?.name?.slice(1)].filter(Boolean)
    const leakedJudgeReference = badNames.some((name) => containsStandaloneNameRef(text, name))
    const leadAddress = extractLeadAddress(text)
    const forbiddenLeadTerms = getForbiddenJudgeAddressTerms(ctx.caseData, ctx.party)
    const wrongLead = forbiddenLeadTerms.find((term) => leadAddress.includes(term))
    if (!leadLooksLikeJudgeAddress(leadAddress)) {
      issues.push(issue('FAIL', 'H2', `judge-facing line must open with judge address: ${leadAddress || '<none>'}`, ctx))
    }
    if (preferred && leadAddress.includes(preferred)) {
      issues.push(issue('FAIL', 'H3', `toJudge used as salutation instead of counterparty reference: ${preferred}`, ctx))
    }
    if (wrongLead) {
      issues.push(issue('FAIL', 'H4', `judge-facing address used partner/angry callTerm: ${wrongLead}`, ctx))
    }
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
      if (similarity >= 0.72) {
        issues.push(issue('WARN', 'D2', `variant 유사도 과다 (${Math.round(similarity * 100)}%)`, {
          ...ctxBase,
          variantId: `${variants[i].id} <> ${variants[j].id}`,
        }))
      }
    }
  }
  const leadingPolarities = [...new Set(
    variants
      .map((variant) => detectLeadingPolarity(variant.text))
      .filter((polarity) => polarity !== 'unknown'),
  )]
  if (leadingPolarities.length > 1) {
    issues.push(issue('WARN', 'V1', `variant 핵심 사실 충돌 가능성: ${leadingPolarities.join(' vs ')}`, ctxBase))
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
        const ctxBase = {
          channel: 'interrogation',
          key,
          caseData,
          party,
          disputeId,
          lieState,
          questionType,
          stanceHint: entry.stanceHint,
        }
        lintVariantGroup(entry, entry.variants, issues, ctxBase)
        validateInterrogationLevel4(entry, issues, ctxBase)
      }
    }
  }

  for (const disputeId of coverage.disputes) {
    for (const lieState of coverage.lieStates) {
      for (const questionType of coverage.questionTypes) {
        const entryA = entryMap.get(['a', disputeId, lieState, questionType].join('|'))
        const entryB = entryMap.get(['b', disputeId, lieState, questionType].join('|'))
        if (!entryA || !entryB || !entryA.variants?.[0] || !entryB.variants?.[0]) continue
        const similarity = trigramSimilarity(entryA.variants[0].text, entryB.variants[0].text)
        if (similarity >= 0.68) {
          pushLevel4Issue(issues, '4-G', `A/B 첫 응답 골격이 지나치게 유사합니다 (${Math.round(similarity * 100)}%)`, {
            channel: 'interrogation',
            key: `${disputeId}|${lieState}|${questionType}`,
            caseData,
            variantId: `${entryA.variants[0].id} <> ${entryB.variants[0].id}`,
          })
        }
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
      const ctxBase = {
        channel: 'evidence_present',
        key,
        caseData,
        party,
        disputeId: evidence.proves?.[0] || null,
        lieBand,
        stanceHint: entry.stanceHint,
      }
      lintVariantGroup(entry, entry.variants, issues, ctxBase)
      validateEvidenceLevel4(entry, evidence, issues, ctxBase)
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
          text: question.text || '',
          hint: question.hint || '',
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
      const ctxBase = {
        channel: 'dossier',
        key,
        caseData,
        party: meta.targetParty,
        disputeId: meta.relatedDisputes[0] || null,
        lieBand,
        stanceHint: entry.stanceHint,
      }
      lintVariantGroup(entry, entry.variants, issues, ctxBase)
      validateDossierLevel4(entry, meta, issues, ctxBase)
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
      const ctxBase = {
        channel: 'witness',
        key,
        caseData,
        depth,
        stanceHint: entry.stanceHint,
      }
      lintVariantGroup(entry, entry.variants, issues, ctxBase)
      validateWitnessLevel4(entry, caseData, issues, ctxBase)
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
    const ctxBase = {
      channel: 'aftermath',
      key,
      caseData,
    }
    lintVariantGroup(entry, entry.variants, issues, ctxBase)
    validateAftermathLevel4(entry, caseData, issues, ctxBase)
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
