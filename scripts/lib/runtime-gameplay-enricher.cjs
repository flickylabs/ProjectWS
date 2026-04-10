const fs = require('fs')
const path = require('path')
const SUPPORTED_VIEWER_TYPES = new Set(['bank', 'chat', 'contract', 'testimony', 'cctv', 'log', 'device', 'sns'])
const LEGACY_VIEWER_TYPE_MAP = {
  platform_log: 'log',
  cloud_log: 'log',
  device_log: 'log',
  record: 'log',
  delivery_record: 'log',
  repair_record: 'log',
  email: 'chat',
  audio: 'log',
  audio_report: 'log',
  photo: 'cctv',
  photo_video: 'cctv',
  video: 'cctv',
  dashcam: 'cctv',
  estimate: 'contract',
  document: 'contract',
  institutional_note: 'contract',
  medical_record: 'contract',
  financial_record: 'bank',
  receipt: 'bank',
  spreadsheet: 'bank',
  access_log: 'log',
  schedule: 'log',
  inspection_report: 'log',
  complaint_log: 'log',
  security_log: 'log',
  mixed: 'log',
  social_post: 'sns',
}

const STAGE_LABELS = {
  1: '초기 공개',
  2: '추가 해금',
  3: '핵심 공개',
}

const TRUST_LABELS = {
  high: '높음',
  mid: '보통',
  low: '낮음',
}

const SOURCE_LABELS = {
  a: 'A측',
  b: 'B측',
  org: '기관',
  third: '제3자',
}

const LEGAL_LABELS = {
  ok: '적법',
  sus: '의심',
  unlawful: '위법',
}
const AMOUNT_RE = /\d[\d,.\s]*(?:\uC5B5\s*\uC6D0|\uCC9C\uB9CC\s*\uC6D0|\uBC31\uB9CC\s*\uC6D0|\uC2ED\uB9CC\s*\uC6D0|\uB9CC\s*\uC6D0|\uCC9C\s*\uC6D0|\uBC31\s*\uC6D0|\uC6D0)|[일이삼사오육칠팔구십백천]+만?\s*원/u

const SAFE_AMOUNT_RE = /\d[\d,.\s]*(?:\uC5B5\s*\uC6D0|\uCC9C\uB9CC\s*\uC6D0|\uBC31\uB9CC\s*\uC6D0|\uC2ED\uB9CC\s*\uC6D0|\uB9CC\s*\uC6D0|\uCC9C\s*\uC6D0|\uBC31\s*\uC6D0|\uC6D0)/u
const MONETARY_DISPUTE_OVERRIDE_MAP = {
  'family-v2-01': ['d-2', 'd-3', 'd-5'],
  'friend-v2-01': ['d-3', 'd-4'],
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

function uniq(values) {
  return [...new Set((values || []).filter(Boolean))]
}

function cleanText(value) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim()
}

function clipText(value, maxLength = 88) {
  const text = cleanText(value)
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength - 1).trim()}…`
}

const INVESTIGATION_KEY_LABELS = {
  request_original: '원본 요청',
  restore_context: '맥락 복원',
  check_metadata: '메타 확인',
  check_edits: '편집 확인',
  check_motive: '동기 확인',
  check_responsibility: '책임 확인',
  check_timeline: '시점 대조',
  check_authenticity: '진위 확인',
  check_source: '출처 확인',
  check_scope: '범위 확인',
  check_identity: '작성자 확인',
  check_sequence: '순서 확인',
  request_backup: '백업 요청',
  compare_versions: '버전 비교',
}

function humanizeInvestigationKey(key) {
  const cleaned = cleanText(key)
  if (!cleaned) return '확인 항목'
  if (INVESTIGATION_KEY_LABELS[cleaned]) return INVESTIGATION_KEY_LABELS[cleaned]
  return cleaned
    .split(/[_\-\s]+/g)
    .filter(Boolean)
    .map((part) => part.length <= 3 ? part.toUpperCase() : part)
    .join(' ')
}

function extractDateLikeLabel(text, index = 0) {
  const haystack = cleanText(text)
  const dated = haystack.match(/\d{4}[.\-/]\d{1,2}[.\-/]\d{1,2}|\d{1,2}월\s*\d{1,2}일/u)
  if (dated) return dated[0]
  const timed = haystack.match(/\d{1,2}:\d{2}/)
  if (timed) return timed[0]
  return `${index + 1}차 확인`
}

function extractAmountLikeLabel(text) {
  const haystack = cleanText(text)
  const matched = haystack.match(SAFE_AMOUNT_RE)
  if (matched) return clipText(matched[0], 16)
  return suspiciousFlag(haystack) ? '검토 필요' : '확인'
}

function compactEvidenceLine(text, maxLength = 52) {
  return clipText(
    cleanText(text)
      .replace(/\brequest_original\b/gi, '원본 요청')
      .replace(/\brestore_context\b/gi, '맥락 복원')
      .replace(/\bcheck_metadata\b/gi, '메타 확인')
      .replace(/\bcheck_edits\b/gi, '편집 확인')
      .replace(/\bcheck_motive\b/gi, '동기 확인')
      .replace(/\bcheck_responsibility\b/gi, '책임 확인'),
    maxLength,
  )
}

function pairKey(ids) {
  return uniq(ids).sort().join('|')
}

function isBaseEvidenceCandidate(node) {
  return Boolean(
    node &&
    Array.isArray(node.requires) &&
    node.requires.length === 0 &&
    !node.requiredLieState,
  )
}

function sentence(value) {
  return String(value || '').replace(/\s+/g, ' ').trim()
}

function normalizeViewerType(rawType) {
  const cleaned = sentence(rawType).toLowerCase()
  if (SUPPORTED_VIEWER_TYPES.has(cleaned)) return cleaned
  return LEGACY_VIEWER_TYPE_MAP[cleaned] || 'log'
}

function getEvidenceIndexMap(evidence) {
  return new Map((evidence || []).map((item, index) => [item.id, index]))
}

function deriveBaseEvidenceIds(runtimeCase) {
  const evidence = runtimeCase.evidence || []
  const explicit = evidence
    .filter((item) => isBaseEvidenceCandidate(item))
    .slice(0, 3)
    .map((item) => item.id)

  if (explicit.length === 3) return explicit

  return evidence
    .slice(0, 3)
    .map((item) => item.id)
}

function getDisputeMap(runtimeCase) {
  return new Map((runtimeCase.disputes || []).map((dispute) => [dispute.id, dispute]))
}

function getRelatedEvidence(runtimeCase, disputeId) {
  return (runtimeCase.evidence || []).filter((node) => Array.isArray(node?.proves) && node.proves.includes(disputeId))
}

function disputeHasConcreteAmount(runtimeCase, disputeId) {
  const dispute = getDisputeMap(runtimeCase).get(disputeId)
  if (!dispute) return false

  const relatedEvidence = getRelatedEvidence(runtimeCase, disputeId)
  const haystack = [
    dispute?.name,
    dispute?.anchorTruth,
    dispute?.truthDescription,
    dispute?.judgmentStatement,
    ...relatedEvidence.flatMap((node) => [
      node?.name,
      node?.description,
      ...(node?.investigationResults ? Object.values(node.investigationResults) : []),
    ]),
  ]
    .filter(Boolean)
    .join(' ')

  return SAFE_AMOUNT_RE.test(haystack)
}

function normalizeMonetaryDisputeIds(runtimeCase) {
  const disputeIds = new Set((runtimeCase.disputes || []).map((dispute) => dispute.id))
  const overrideIds = MONETARY_DISPUTE_OVERRIDE_MAP[runtimeCase?.caseId]
  if (Array.isArray(overrideIds) && overrideIds.length > 0) {
    return uniq(overrideIds).filter((id) => disputeIds.has(id))
  }
  if (Array.isArray(runtimeCase.monetaryDisputeIds)) {
    return uniq(runtimeCase.monetaryDisputeIds)
      .filter((id) => disputeIds.has(id) && disputeHasConcreteAmount(runtimeCase, id))
  }

  return (runtimeCase.disputes || [])
    .filter((dispute) => disputeHasConcreteAmount(runtimeCase, dispute.id))
    .map((dispute) => dispute.id)
}

function prioritizeEvidenceProves(node, monetaryDisputeIds) {
  if (!node || !Array.isArray(node.proves) || node.proves.length <= 1) return
  const monetarySet = new Set(monetaryDisputeIds || [])
  node.proves = uniq(node.proves).sort((left, right) => {
    const leftPriority = monetarySet.has(left) ? 0 : 1
    const rightPriority = monetarySet.has(right) ? 0 : 1
    if (leftPriority !== rightPriority) return leftPriority - rightPriority
    return String(left).localeCompare(String(right))
  })
}

function normalizeBaseEvidenceIds(runtimeCase) {
  const evidence = runtimeCase.evidence || []
  const evidenceMap = new Map(evidence.map((item) => [item.id, item]))
  const explicitBaseEvidenceIds = Array.isArray(runtimeCase.baseEvidenceIds)
    ? uniq(runtimeCase.baseEvidenceIds)
    : []
  const explicitIsValid = explicitBaseEvidenceIds.length === 3 && explicitBaseEvidenceIds.every((id) => {
    const node = evidenceMap.get(id)
    return isBaseEvidenceCandidate(node)
  })

  return explicitIsValid ? explicitBaseEvidenceIds : deriveBaseEvidenceIds(runtimeCase)
}

function ensureEvidenceMeta(node, stageIndex) {
  if (!node.meta || typeof node.meta !== 'object') node.meta = {}
  node.meta.trustLevel = node.meta.trustLevel || 'mid'
  node.meta.trustLabel = node.meta.trustLabel || (node.meta.trustLevel === 'high' ? '높음' : node.meta.trustLevel === 'low' ? '낮음' : '보통')
  node.meta.source = node.meta.source || (node.provenance === 'institutional' ? 'org' : node.subjectParty === 'a' ? 'a' : node.subjectParty === 'b' ? 'b' : 'third')
  node.meta.sourceLabel = node.meta.sourceLabel || (node.meta.source === 'org' ? '기관' : node.meta.source === 'a' ? 'A측' : node.meta.source === 'b' ? 'B측' : '제3자')
  node.meta.legality = node.meta.legality || (node.legitimacy === 'lawful' ? 'ok' : node.legitimacy === 'unlawful' ? 'unlawful' : 'sus')
  node.meta.legalLabel = node.meta.legalLabel || (node.meta.legality === 'ok' ? '적법' : node.meta.legality === 'unlawful' ? '위법' : '소명 필요')
  node.meta.stage = Number.isFinite(node.meta.stage) ? node.meta.stage : stageIndex + 1
  node.meta.stageLabel = node.meta.stageLabel || (node.meta.stage <= 1 ? '초기 공개' : node.meta.stage === 2 ? '중간 공개' : '핵심 공개')
  node.meta.sourceNote = node.meta.sourceNote || `${sentence(node.provenance || 'source')} / ${sentence(node.completeness || 'partial')}`
  node.meta.redactions = Array.isArray(node.meta.redactions) ? node.meta.redactions : []
}

function buildFallbackViewerPayload(node, viewerType) {
  const title = sentence(node.surfaceName || node.name || node.id)
  const summary = sentence(node.surfaceDescription || node.description || '추가 확인이 필요한 자료입니다.')
  const suspicious = Boolean(node.isTrap)

  if (viewerType === 'bank') {
    return [
      { date: '기록', desc: title, amount: '-', balance: '-', suspicious },
    ]
  }

  if (viewerType === 'chat') {
    return {
      header: `${title} 기록`,
      messages: [
        { side: 'left', sender: '기록', text: summary },
      ],
    }
  }

  if (viewerType === 'contract') {
    return {
      title,
      subtitle: '문서 요약',
      rows: [
        { date: '기록', content: summary, amount: '-', missing: false },
      ],
      signature: '원본 대조 필요',
    }
  }

  if (viewerType === 'testimony') {
    return {
      witnessName: '기록 증거',
      witnessDesc: title,
      quote: summary,
      confidence: 'mid',
      confidenceLabel: '보통',
      bias: 'neutral',
      biasLabel: '중립',
      directWitness: false,
      relatedRef: (node.proves || []).join(', ') || '참조',
    }
  }

  if (viewerType === 'cctv') {
    return [
      { time: '기록', pct: 0, label: title, desc: summary, suspicious },
    ]
  }

  if (viewerType === 'device') {
    return {
      ownerName: title,
      sections: [
        {
          title: '기기 기록',
          id: 'summary',
          items: [
            { text: summary, suspicious },
          ],
        },
      ],
    }
  }

  if (viewerType === 'sns') {
    return {
      username: title,
      handle: '@evidence',
      date: '기록',
      privacy: '제한 공개',
      text: summary,
      hashtags: [],
      likes: 0,
      comments: [],
      warnings: [],
    }
  }

  return {
    rows: [
      { date: '기록', type: 'in', typeLabel: '기록', target: title, duration: '-', suspicious },
    ],
    note: summary,
  }
}

function ensureViewerData(node) {
  const rawType = sentence(node.viewerData?.meta?.type || node.type || 'log').toLowerCase()
  const viewerType = normalizeViewerType(node.viewerData?.meta?.viewerType || node.viewerType || rawType)
  if (!node.viewerData || typeof node.viewerData !== 'object') node.viewerData = {}
  if (!node.viewerData.meta || typeof node.viewerData.meta !== 'object') node.viewerData.meta = {}
  node.viewerData.meta = {
    name: sentence(node.surfaceName || node.name || node.id),
    type: rawType,
    viewerType,
    trustLevel: node.meta.trustLevel,
    trustLabel: node.meta.trustLabel,
    source: node.meta.source,
    sourceLabel: node.meta.sourceLabel,
    legality: node.meta.legality,
    legalLabel: node.meta.legalLabel,
    stage: node.meta.stage,
    stageLabel: node.meta.stageLabel,
    sourceNote: node.meta.sourceNote,
    redactions: node.meta.redactions,
    ...(node.viewerData.meta || {}),
    name: sentence(node.surfaceName || node.name || node.id),
    type: rawType,
    viewerType,
  }

  if (!node.viewerData[viewerType]) {
    node.viewerData[viewerType] = buildFallbackViewerPayload(node, viewerType)
  }
}

function findFallbackRequirement(node, evidence, baseEvidenceIds, indexMap) {
  const baseNodes = evidence.filter((item) => baseEvidenceIds.includes(item.id))
  const sharedBase = baseNodes.find((candidate) =>
    (candidate.proves || []).some((disputeId) => (node.proves || []).includes(disputeId)),
  )
  if (sharedBase) return [sharedBase.id]

  const nodeIndex = indexMap.get(node.id) ?? evidence.length
  const previousShared = evidence.find((candidate) => {
    if (candidate.id === node.id) return false
    const candidateIndex = indexMap.get(candidate.id) ?? -1
    if (candidateIndex >= nodeIndex) return false
    return (candidate.proves || []).some((disputeId) => (node.proves || []).includes(disputeId))
  })
  if (previousShared) return [previousShared.id]

  if (baseEvidenceIds[0]) return [baseEvidenceIds[0]]
  return []
}

function ensureEvidenceAccess(runtimeCase) {
  const evidence = runtimeCase.evidence || []
  const baseEvidenceIds = normalizeBaseEvidenceIds(runtimeCase)
  const indexMap = getEvidenceIndexMap(evidence)

  runtimeCase.baseEvidenceIds = baseEvidenceIds
  runtimeCase.monetaryDisputeIds = normalizeMonetaryDisputeIds(runtimeCase)

  for (const [index, node] of evidence.entries()) {
    if (!Array.isArray(node.requires)) node.requires = []
    prioritizeEvidenceProves(node, runtimeCase.monetaryDisputeIds)
    ensureEvidenceMeta(node, index)
    ensureViewerData(node)

    if (baseEvidenceIds.includes(node.id)) {
      node.requires = []
      delete node.requiredLieState
      continue
    }

    if (node.requires.length === 0) {
      node.requires = findFallbackRequirement(node, evidence, baseEvidenceIds, indexMap)
    }

    if (!node.requiredLieState) {
      const sharedProves = (node.proves || []).length
      if ((node.requires || []).length >= 2 || sharedProves >= 2) {
        node.requiredLieState = 'S2'
      } else if ((node.requires || []).length >= 1) {
        node.requiredLieState = 'S1'
      }
    }
  }
}

function buildComboCandidates(runtimeCase) {
  const evidence = runtimeCase.evidence || []
  const candidates = []

  for (let i = 0; i < evidence.length; i += 1) {
    for (let j = i + 1; j < evidence.length; j += 1) {
      const left = evidence[i]
      const right = evidence[j]
      const shared = (left.proves || []).filter((disputeId) => (right.proves || []).includes(disputeId))
      const proves = shared.length > 0 ? shared : uniq([...(left.proves || []), ...(right.proves || [])]).slice(0, 2)
      if (proves.length === 0) continue

      const gatedCount = [left, right].filter((item) => (item.requires || []).length > 0 || item.requiredLieState).length
      candidates.push({
        requires: uniq([left.id, right.id]),
        proves,
        upgradesTo: 'hard',
        score: (shared.length * 10) + (gatedCount * 5) - Math.abs(i - j),
      })
    }
  }

  return candidates.sort((a, b) => b.score - a.score)
}

function ensureEvidenceCombinations(runtimeCase) {
  const combos = Array.isArray(runtimeCase.evidenceCombinations) ? runtimeCase.evidenceCombinations : []
  const normalized = []
  const seen = new Set()

  for (const combo of combos) {
    const requires = uniq(combo.requires)
    if (requires.length < 2) continue
    const key = pairKey(requires)
    if (seen.has(key)) continue
    seen.add(key)
    normalized.push({
      requires,
      upgradesTo: combo.upgradesTo || 'hard',
      proves: uniq(combo.proves),
      ...(combo.description ? { description: combo.description } : {}),
    })
  }

  for (const candidate of buildComboCandidates(runtimeCase)) {
    if (normalized.length >= 2) break
    const key = pairKey(candidate.requires)
    if (seen.has(key)) continue
    seen.add(key)
    normalized.push({
      requires: candidate.requires,
      upgradesTo: candidate.upgradesTo,
      proves: candidate.proves,
    })
  }

  runtimeCase.evidenceCombinations = normalized
}

function lieStateRank(state) {
  return {
    S0: 0,
    S1: 1,
    S2: 2,
    S3: 3,
    S4: 4,
  }[state] ?? 0
}

function normalizeProvenance(value) {
  const raw = String(value || '').toLowerCase()
  if (raw.includes('institution')) return 'institutional'
  if (raw.includes('self') || raw.includes('personal') || raw.includes('device')) return 'self'
  if (raw.includes('third')) return 'third'
  if (raw.includes('anonymous')) return 'anonymous'
  return raw || 'unknown'
}

function normalizeCompleteness(value) {
  const raw = String(value || '').toLowerCase()
  if (raw.includes('original')) return 'original'
  if (raw.includes('context')) return 'context_missing'
  if (raw.includes('edit')) return 'edited'
  if (raw.includes('crop') || raw.includes('partial')) return 'partial'
  return raw || 'partial'
}

function deriveSource(node) {
  const provenance = normalizeProvenance(node.provenance)
  if (provenance === 'institutional') return 'org'
  if (provenance === 'self') {
    if (node.subjectParty === 'a') return 'a'
    if (node.subjectParty === 'b') return 'b'
  }
  return 'third'
}

function deriveTrustLevel(node) {
  const completeness = normalizeCompleteness(node.completeness)
  if (String(node.legitimacy || '').toLowerCase() === 'unlawful') return 'low'
  if (node.reliability === 'hard' && completeness === 'original') return 'high'
  if (completeness === 'edited' || completeness === 'partial' || completeness === 'context_missing') return 'mid'
  return node.reliability === 'hard' ? 'high' : 'mid'
}

function deriveLegality(node) {
  const raw = String(node.legitimacy || '').toLowerCase()
  if (raw.includes('lawful')) return 'ok'
  if (raw.includes('privacy')) return 'sus'
  if (raw.includes('unlawful')) return 'unlawful'
  return 'sus'
}

function normalizeViewerType(type) {
  const raw = String(type || '').toLowerCase()
  if (['bank', 'chat', 'contract', 'testimony', 'cctv', 'log', 'device', 'sns'].includes(raw)) return raw
  if (['platform_log', 'cloud_log', 'device_log', 'record', 'delivery_record', 'repair_record', 'email', 'audio', 'forensic_report', 'audio_report', 'access_log', 'inspection_report', 'complaint_log', 'security_log', 'mixed', 'schedule'].includes(raw)) return 'log'
  if (['photo', 'image', 'photo_video', 'video', 'dashcam'].includes(raw)) return 'cctv'
  if (['estimate', 'document', 'institutional_note', 'medical_record'].includes(raw)) return 'contract'
  if (['financial_record', 'receipt', 'spreadsheet'].includes(raw)) return 'bank'
  if (['social_post'].includes(raw)) return 'sns'
  return 'log'
}

function deriveStage(node) {
  if (node.meta?.stage) return node.meta.stage
  const requiredRank = lieStateRank(node.requiredLieState)
  const requiresCount = Array.isArray(node.requires) ? node.requires.length : 0
  if (requiresCount >= 2 || requiredRank >= 3) return 3
  if (requiresCount >= 1 || requiredRank >= 1) return 2
  return 1
}

function buildSourceNote(node) {
  const completeness = normalizeCompleteness(node.completeness)
  const provenance = normalizeProvenance(node.provenance)
  const fragments = []
  if (provenance === 'institutional') fragments.push('기관 제출본')
  else if (provenance === 'self') fragments.push('당사자 보관본')
  else if (provenance === 'third') fragments.push('제3자 제공본')
  else if (provenance === 'anonymous') fragments.push('익명 제보본')

  if (completeness === 'original') fragments.push('원본 기준')
  else if (completeness === 'edited') fragments.push('편집 흔적 검토 필요')
  else if (completeness === 'partial') fragments.push('부분 발췌본')
  else if (completeness === 'context_missing') fragments.push('맥락 누락 가능')

  if (node.isTrap) fragments.push('함정 증거 가능성')
  return fragments.join(' / ')
}

function buildRedactions(node) {
  const redactions = []
  const legality = deriveLegality(node)
  const completeness = normalizeCompleteness(node.completeness)
  if (legality !== 'ok') redactions.push('개인정보 일부 마스킹')
  if (completeness === 'context_missing' || completeness === 'partial') redactions.push('앞뒤 맥락 일부 누락')
  if (completeness === 'edited') redactions.push('편집 이력 검토 필요')
  return uniq(redactions)
}

function buildEvidenceMeta(node) {
  const trustLevel = deriveTrustLevel(node)
  const source = deriveSource(node)
  const legality = deriveLegality(node)
  const stage = deriveStage(node)
  const rawType = sentence(node.type || 'log').toLowerCase()
  return {
    name: evidenceTitle(node),
    type: rawType,
    viewerType: normalizeViewerType(rawType),
    trustLevel,
    trustLabel: TRUST_LABELS[trustLevel],
    source,
    sourceLabel: SOURCE_LABELS[source],
    legality,
    legalLabel: LEGAL_LABELS[legality],
    stage,
    stageLabel: STAGE_LABELS[stage],
    sourceNote: buildSourceNote(node),
    redactions: buildRedactions(node),
  }
}

function evidenceTitle(node) {
  return cleanText(node.surfaceName || node.name || node.id)
}

function evidenceSummary(node) {
  return cleanText(node.surfaceDescription || node.description || node.name || node.id)
}

function investigationPairs(node) {
  return Object.entries(node.investigationResults || {})
    .map(([key, value]) => ({ key, value: cleanText(value) }))
    .filter((item) => item.value.length > 0)
}

function suspiciousFlag(text) {
  return /(편집|삭제|누락|복구|위반|의심|가림|불일치|사적|함정)/.test(cleanText(text))
}

function viewerBank(node) {
  return investigationPairs(node).slice(0, 4).map((item, index) => ({
    date: extractDateLikeLabel(item.value, index),
    desc: humanizeInvestigationKey(item.key),
    amount: extractAmountLikeLabel(item.value),
    balance: compactEvidenceLine(item.value, 24),
    suspicious: suspiciousFlag(item.value),
  }))
}

function viewerChat(node) {
  const messages = investigationPairs(node).slice(0, 6).map((item, index) => ({
    side: index % 2 === 0 ? 'left' : 'right',
    sender: index % 2 === 0 ? '기록' : '확인',
    text: clipText(item.value, 72),
  }))
  return {
    header: evidenceTitle(node),
    messages: messages.length > 0 ? messages : [{ side: 'left', sender: '기록', text: evidenceSummary(node) }],
  }
}

function viewerContract(node) {
  const rows = investigationPairs(node).slice(0, 5).map((item) => ({
    date: item.key,
    content: clipText(item.value, 44),
    amount: suspiciousFlag(item.value) ? '검토 필요' : '확인',
    missing: suspiciousFlag(item.value),
  }))
  return {
    title: evidenceTitle(node),
    subtitle: clipText(evidenceSummary(node), 48),
    rows: rows.length > 0 ? rows : [{ date: '개요', content: evidenceSummary(node), amount: '확인', missing: false }],
    signature: '출처 메모 확인',
  }
}

function viewerTestimony(node) {
  const source = deriveSource(node)
  return {
    witnessName: evidenceTitle(node),
    witnessDesc: clipText(node.description || node.surfaceDescription || '', 56),
    quote: clipText(investigationPairs(node)[0]?.value || evidenceSummary(node), 140),
    confidence: deriveTrustLevel(node),
    confidenceLabel: TRUST_LABELS[deriveTrustLevel(node)],
    bias: source === 'a' ? 'a' : source === 'b' ? 'b' : 'neutral',
    biasLabel: source === 'a' ? 'A측' : source === 'b' ? 'B측' : '중립',
    directWitness: normalizeProvenance(node.provenance) !== 'anonymous',
    relatedRef: (node.proves || []).join(', ') || node.id,
  }
}

function viewerCctv(node) {
  const pairs = investigationPairs(node).slice(0, 4)
  return (pairs.length > 0 ? pairs : [{ key: '개요', value: evidenceSummary(node) }]).map((item, index, list) => ({
    time: `frame ${index + 1}`,
    pct: Math.round((index / Math.max(list.length - 1, 1)) * 100),
    label: clipText(item.key, 12),
    desc: clipText(item.value, 68),
    suspicious: suspiciousFlag(item.value),
  }))
}

function viewerLog(node) {
  const rows = investigationPairs(node).slice(0, 6).map((item, index) => ({
    date: extractDateLikeLabel(item.value, index),
    type: index % 3 === 0 ? 'out' : index % 3 === 1 ? 'in' : 'miss',
    typeLabel: humanizeInvestigationKey(item.key),
    target: compactEvidenceLine(item.value, 38),
    duration: extractAmountLikeLabel(item.value),
    suspicious: suspiciousFlag(item.value),
  }))
  return {
    rows: rows.length > 0 ? rows : [{ date: '1차 확인', type: 'out', typeLabel: '기록', target: compactEvidenceLine(evidenceTitle(node), 38), duration: '확인', suspicious: false }],
    note: clipText(evidenceSummary(node), 88),
  }
}

function viewerDevice(node) {
  const pairs = investigationPairs(node)
  const items = (pairs.length > 0 ? pairs.slice(0, 4) : [{ key: '개요', value: evidenceSummary(node) }]).map((item) => ({
    text: `${humanizeInvestigationKey(item.key)} | ${compactEvidenceLine(item.value, 54)}`,
    suspicious: suspiciousFlag(item.value),
  }))
  const suspiciousItems = items.filter((item) => item.suspicious).slice(0, 3)
  return {
    ownerName: evidenceTitle(node),
    sections: [
      {
        title: '핵심 요약',
        id: 'summary',
        items: [{ text: clipText(evidenceSummary(node), 88), suspicious: suspiciousFlag(evidenceSummary(node)) }],
      },
      {
        title: '확인 항목',
        id: 'investigation',
        items,
      },
      {
        title: '주의 지점',
        id: 'warnings',
        items: suspiciousItems.length > 0 ? suspiciousItems : [{ text: '표시된 이상 징후는 없지만 세부 항목 확인이 필요하다.', suspicious: false }],
      },
    ],
  }
}

function viewerSns(node) {
  const pairs = investigationPairs(node)
  return {
    username: evidenceTitle(node),
    handle: `#${node.id}`,
    date: node.id,
    privacy: deriveLegality(node) === 'ok' ? '공개' : '제한',
    text: clipText(evidenceSummary(node), 140),
    hashtags: (node.proves || []).map((id) => `#${id}`),
    likes: 0,
    comments: pairs.slice(0, 3).map((item) => ({ name: item.key, text: clipText(item.value, 46) })),
    warnings: buildRedactions(node),
  }
}

function escapeSvgText(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function svgDataUrl(svg) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

function buildMediaSvg({ title, subtitle, badge, width, height, accent }) {
  const safeTitle = escapeSvgText(title)
  const safeSubtitle = escapeSvgText(subtitle)
  const safeBadge = escapeSvgText(badge)
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#111827" />
          <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>
        <linearGradient id="accent" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stop-color="${accent}" />
          <stop offset="100%" stop-color="#f5d08a" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" rx="24" fill="url(#bg)" />
      <rect x="20" y="20" width="${width - 40}" height="10" rx="5" fill="rgba(255,255,255,0.08)" />
      <rect x="20" y="48" width="${Math.max(120, width * 0.42)}" height="22" rx="11" fill="url(#accent)" opacity="0.9" />
      <text x="28" y="63" font-size="12" font-weight="700" fill="#111827">${safeBadge}</text>
      <rect x="20" y="${height - 96}" width="${width - 40}" height="1" fill="rgba(255,255,255,0.12)" />
      <text x="20" y="${height - 56}" font-size="30" font-weight="800" fill="#f8fafc">${safeTitle}</text>
      <text x="20" y="${height - 28}" font-size="16" fill="#cbd5e1">${safeSubtitle}</text>
    </svg>
  `
  return svgDataUrl(svg)
}

function buildMediaAsset({ title, subtitle, badge, width, height, accent, alt, caption }) {
  const imageUrl = buildMediaSvg({ title, subtitle, badge, width, height, accent })
  return {
    imageUrl,
    thumbnailUrl: imageUrl,
    posterUrl: imageUrl,
    width,
    height,
    alt,
    caption,
  }
}

function splitSvgLines(text, maxLen = 28, maxLines = 4) {
  const words = cleanText(text).split(/\s+/).filter(Boolean)
  if (words.length === 0) return ['']
  const lines = []
  let current = ''
  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    if (next.length > maxLen && current) {
      lines.push(current)
      current = word
      if (lines.length >= maxLines - 1) break
    } else {
      current = next
    }
  }
  if (current && lines.length < maxLines) lines.push(current)
  if (lines.length === maxLines && words.join(' ').length > lines.join(' ').length) {
    lines[lines.length - 1] = clipText(lines[lines.length - 1], Math.max(8, maxLen - 1))
  }
  return lines.slice(0, maxLines)
}

function renderSvgLines(lines, x, y, lineHeight, fill, fontSize = 16, weight = 500) {
  return lines.map((line, index) => (
    `<text x="${x}" y="${y + (index * lineHeight)}" font-size="${fontSize}" font-weight="${weight}" fill="${fill}">${escapeSvgText(line)}</text>`
  )).join('')
}

function buildMediaAssetFromSvg({ svg, width, height, alt, caption }) {
  const imageUrl = svgDataUrl(svg)
  return {
    imageUrl,
    thumbnailUrl: imageUrl,
    posterUrl: imageUrl,
    width,
    height,
    alt,
    caption,
  }
}

function buildReadableBankSvg(title, badge, rows, rawType) {
  const width = 1280
  const height = 880
  const displayRows = (rows || []).slice(0, 6)
  const rowSvg = displayRows.map((row, index) => {
    const y = 188 + (index * 88)
    const fill = row.suspicious ? 'rgba(245,158,11,0.12)' : index % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.015)'
    const amountFill = String(row.amount || '').startsWith('-') ? '#fca5a5' : '#86efac'
    return `
      <rect x="40" y="${y - 34}" width="1200" height="72" rx="14" fill="${fill}" />
      <text x="66" y="${y}" font-size="20" font-weight="600" fill="#e5e7eb">${escapeSvgText(clipText(row.date, 16))}</text>
      <text x="278" y="${y}" font-size="20" font-weight="600" fill="#f8fafc">${escapeSvgText(clipText(row.desc, 28))}</text>
      <text x="860" y="${y}" font-size="20" font-weight="700" fill="${amountFill}" text-anchor="end">${escapeSvgText(clipText(row.amount, 18))}</text>
      <text x="1190" y="${y}" font-size="20" font-weight="600" fill="#cbd5e1" text-anchor="end">${escapeSvgText(clipText(row.balance, 18))}</text>
    `
  }).join('')
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="${width}" height="${height}" rx="30" fill="#0f172a" />
      <rect x="28" y="28" width="${width - 56}" height="${height - 56}" rx="24" fill="#111827" stroke="rgba(255,255,255,0.08)" />
      <rect x="40" y="40" width="240" height="30" rx="15" fill="#f59e0b" opacity="0.92" />
      <text x="58" y="61" font-size="14" font-weight="800" fill="#111827">${escapeSvgText(rawType === 'receipt' ? 'RECEIPT' : badge)}</text>
      <text x="40" y="108" font-size="34" font-weight="800" fill="#f8fafc">${escapeSvgText(title)}</text>
      <rect x="40" y="138" width="1200" height="44" rx="12" fill="rgba(255,255,255,0.06)" />
      <text x="66" y="166" font-size="18" font-weight="700" fill="#94a3b8">DATE</text>
      <text x="278" y="166" font-size="18" font-weight="700" fill="#94a3b8">DETAIL</text>
      <text x="860" y="166" font-size="18" font-weight="700" fill="#94a3b8" text-anchor="end">AMOUNT</text>
      <text x="1190" y="166" font-size="18" font-weight="700" fill="#94a3b8" text-anchor="end">BALANCE</text>
      ${rowSvg}
    </svg>
  `
  return buildMediaAssetFromSvg({ svg, width, height, alt: `${title} financial evidence`, caption: `${title} table preview` })
}

function buildReadableChatSvg(title, badge, chat, rawType) {
  const width = 1080
  const height = 1600
  const displayMessages = (chat?.messages || []).slice(0, 6)
  let y = 180
  const bubbles = displayMessages.map((message, index) => {
    const isRight = message.side === 'right'
    const bubbleWidth = 640
    const x = isRight ? width - bubbleWidth - 54 : 54
    const bubbleFill = message.type === 'deleted'
      ? 'rgba(245,158,11,0.18)'
      : isRight ? '#34d399' : '#1f2937'
    const textFill = isRight ? '#052e16' : '#f8fafc'
    const sender = escapeSvgText(clipText(message.sender || `message ${index + 1}`, 18))
    const timeLabel = `T${String(index + 1).padStart(2, '0')}`
    const textLines = splitSvgLines(message.text || '', 26, 3)
    const bubbleHeight = 74 + (textLines.length * 28)
    const block = `
      <text x="${x}" y="${y}" font-size="18" font-weight="700" fill="#94a3b8">${sender}</text>
      <text x="${x + bubbleWidth - 10}" y="${y}" font-size="15" font-weight="600" fill="#64748b" text-anchor="end">${timeLabel}</text>
      <rect x="${x}" y="${y + 18}" width="${bubbleWidth}" height="${bubbleHeight}" rx="28" fill="${bubbleFill}" />
      ${renderSvgLines(textLines, x + 24, y + 56, 26, textFill, 20, 600)}
      ${message.type === 'deleted' ? `<text x="${x + 24}" y="${y + bubbleHeight + 2}" font-size="16" font-weight="700" fill="#fbbf24">DELETED</text>` : ''}
    `
    y += bubbleHeight + 76
    return block
  }).join('')
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="${width}" height="${height}" rx="40" fill="#0b1220" />
      <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="34" fill="#111827" stroke="rgba(255,255,255,0.08)" />
      <rect x="54" y="54" width="${width - 108}" height="78" rx="22" fill="rgba(255,255,255,0.06)" />
      <text x="82" y="102" font-size="18" font-weight="800" fill="#34d399">${escapeSvgText(rawType === 'email' ? 'EMAIL THREAD' : badge)}</text>
      <text x="82" y="132" font-size="28" font-weight="800" fill="#f8fafc">${escapeSvgText(clipText(title, 28))}</text>
      ${bubbles}
    </svg>
  `
  return buildMediaAssetFromSvg({ svg, width, height, alt: `${title} chat evidence`, caption: `${title} conversation preview` })
}

function buildReadableContractSvg(title, badge, contract) {
  const width = 1280
  const height = 960
  const rows = (contract?.rows || []).slice(0, 5)
  const rowSvg = rows.map((row, index) => {
    const y = 246 + (index * 102)
    return `
      <rect x="66" y="${y - 38}" width="1148" height="80" rx="16" fill="${row.missing ? 'rgba(245,158,11,0.10)' : 'rgba(15,23,42,0.04)'}" />
      <text x="94" y="${y}" font-size="19" font-weight="700" fill="#334155">${escapeSvgText(clipText(row.date, 20))}</text>
      ${renderSvgLines(splitSvgLines(row.content, 34, 2), 284, y - 12, 24, '#0f172a', 18, 600)}
      <text x="1162" y="${y}" font-size="18" font-weight="700" fill="${row.missing ? '#b45309' : '#475569'}" text-anchor="end">${escapeSvgText(clipText(row.amount, 20))}</text>
    `
  }).join('')
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="${width}" height="${height}" rx="24" fill="#e5e7eb" />
      <rect x="40" y="40" width="${width - 80}" height="${height - 80}" rx="18" fill="#fcfcfd" stroke="#cbd5e1" />
      <text x="70" y="94" font-size="16" font-weight="800" fill="#7c3aed">${escapeSvgText(badge)}</text>
      <text x="70" y="136" font-size="34" font-weight="800" fill="#0f172a">${escapeSvgText(clipText(title, 34))}</text>
      <text x="70" y="174" font-size="19" font-weight="600" fill="#64748b">${escapeSvgText(clipText(contract?.subtitle || '', 72))}</text>
      <line x1="70" y1="198" x2="1210" y2="198" stroke="#dbe4ee" />
      ${rowSvg}
      <text x="70" y="894" font-size="18" font-weight="700" fill="#475569">${escapeSvgText(clipText(contract?.signature || '', 72))}</text>
    </svg>
  `
  return buildMediaAssetFromSvg({ svg, width, height, alt: `${title} document evidence`, caption: `${title} document preview` })
}

function buildReadableLogSvg(title, badge, log) {
  const width = 1280
  const height = 900
  const rows = (log?.rows || []).slice(0, 6)
  const rowSvg = rows.map((row, index) => {
    const y = 200 + (index * 88)
    return `
      <rect x="54" y="${y - 34}" width="1172" height="68" rx="14" fill="${row.suspicious ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.03)'}" />
      <text x="78" y="${y}" font-size="18" font-weight="700" fill="#cbd5e1">${escapeSvgText(clipText(row.date, 18))}</text>
      <text x="286" y="${y}" font-size="18" font-weight="800" fill="${row.suspicious ? '#fbbf24' : '#86efac'}">${escapeSvgText(clipText(row.typeLabel, 12))}</text>
      <text x="444" y="${y}" font-size="18" font-weight="600" fill="#f8fafc">${escapeSvgText(clipText(row.target, 34))}</text>
      <text x="1160" y="${y}" font-size="18" font-weight="600" fill="#94a3b8" text-anchor="end">${escapeSvgText(clipText(row.duration, 16))}</text>
    `
  }).join('')
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="${width}" height="${height}" rx="24" fill="#0f172a" />
      <text x="54" y="74" font-size="16" font-weight="800" fill="#22c55e">${escapeSvgText(badge)}</text>
      <text x="54" y="120" font-size="34" font-weight="800" fill="#f8fafc">${escapeSvgText(clipText(title, 34))}</text>
      <text x="54" y="158" font-size="18" font-weight="600" fill="#94a3b8">${escapeSvgText(clipText(log?.note || '', 84))}</text>
      ${rowSvg}
    </svg>
  `
  return buildMediaAssetFromSvg({ svg, width, height, alt: `${title} log evidence`, caption: `${title} log preview` })
}

function buildReadableTestimonySvg(title, testimony) {
  const width = 1080
  const height = 1350
  const quoteLines = splitSvgLines(testimony?.quote || '', 28, 6)
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="${width}" height="${height}" rx="28" fill="#fff1f2" />
      <rect x="34" y="34" width="${width - 68}" height="${height - 68}" rx="24" fill="#ffffff" stroke="#fecdd3" />
      <text x="70" y="92" font-size="16" font-weight="800" fill="#e11d48">TESTIMONY</text>
      <text x="70" y="142" font-size="34" font-weight="800" fill="#111827">${escapeSvgText(clipText(testimony?.witnessName || title, 28))}</text>
      <text x="70" y="182" font-size="19" font-weight="600" fill="#64748b">${escapeSvgText(clipText(testimony?.witnessDesc || '', 70))}</text>
      <rect x="70" y="228" width="${width - 140}" height="430" rx="22" fill="#fff7f7" stroke="#fecaca" />
      ${renderSvgLines(quoteLines, 100, 292, 40, '#111827', 28, 700)}
      <rect x="70" y="706" width="286" height="132" rx="18" fill="#f8fafc" stroke="#e5e7eb" />
      <rect x="398" y="706" width="286" height="132" rx="18" fill="#f8fafc" stroke="#e5e7eb" />
      <rect x="726" y="706" width="286" height="132" rx="18" fill="#f8fafc" stroke="#e5e7eb" />
      <text x="100" y="756" font-size="18" font-weight="700" fill="#64748b">CONFIDENCE</text>
      <text x="100" y="806" font-size="28" font-weight="800" fill="#111827">${escapeSvgText(testimony?.confidenceLabel || '')}</text>
      <text x="428" y="756" font-size="18" font-weight="700" fill="#64748b">BIAS</text>
      <text x="428" y="806" font-size="28" font-weight="800" fill="#111827">${escapeSvgText(testimony?.biasLabel || '')}</text>
      <text x="756" y="756" font-size="18" font-weight="700" fill="#64748b">DIRECT</text>
      <text x="756" y="806" font-size="28" font-weight="800" fill="#111827">${testimony?.directWitness ? 'YES' : 'NO'}</text>
      <text x="70" y="932" font-size="18" font-weight="700" fill="#64748b">RELATED REF</text>
      ${renderSvgLines(splitSvgLines(testimony?.relatedRef || '', 52, 2), 70, 974, 30, '#111827', 22, 700)}
    </svg>
  `
  return buildMediaAssetFromSvg({ svg, width, height, alt: `${title} testimony evidence`, caption: `${title} testimony card` })
}

function buildReadableCctvSvg(title, badge, events) {
  const width = 1280
  const height = 720
  const main = events?.[0] || { time: 'frame 1', label: title, desc: '' }
  const markers = (events || []).slice(0, 4).map((event, index) => {
    const x = 144 + (index * 250)
    return `
      <circle cx="${x}" cy="640" r="14" fill="${event.suspicious ? '#f59e0b' : '#60a5fa'}" />
      <text x="${x}" y="674" font-size="16" font-weight="700" fill="#cbd5e1" text-anchor="middle">${escapeSvgText(clipText(event.time, 10))}</text>
    `
  }).join('')
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="${width}" height="${height}" rx="24" fill="#020617" />
      <rect x="32" y="32" width="${width - 64}" height="${height - 64}" rx="18" fill="#111827" stroke="#334155" />
      <text x="62" y="76" font-size="18" font-weight="800" fill="#f87171">REC</text>
      <text x="150" y="76" font-size="16" font-weight="700" fill="#94a3b8">${escapeSvgText(main.time || '')}</text>
      <text x="1090" y="76" font-size="16" font-weight="700" fill="#8fb2ff" text-anchor="end">${escapeSvgText(badge)}</text>
      <rect x="88" y="142" width="1104" height="370" rx="16" fill="#0f172a" />
      <rect x="284" y="228" width="420" height="160" rx="18" fill="rgba(255,255,255,0.04)" stroke="${main.suspicious ? '#f59e0b' : '#60a5fa'}" stroke-width="4" />
      <text x="88" y="564" font-size="28" font-weight="800" fill="#f8fafc">${escapeSvgText(clipText(title, 42))}</text>
      <text x="88" y="600" font-size="20" font-weight="600" fill="#cbd5e1">${escapeSvgText(clipText(main.label || '', 56))}</text>
      <text x="88" y="632" font-size="18" font-weight="600" fill="#94a3b8">${escapeSvgText(clipText(main.desc || '', 72))}</text>
      <line x1="88" y1="640" x2="1192" y2="640" stroke="rgba(255,255,255,0.12)" />
      ${markers}
    </svg>
  `
  return buildMediaAssetFromSvg({ svg, width, height, alt: `${title} cctv evidence`, caption: `${title} frame preview` })
}

function buildReadableDeviceSvg(title, badge, device) {
  const width = 900
  const height = 1600
  const sectionSvgs = (device?.sections || []).slice(0, 3).map((section, index) => {
    const y = 188 + (index * 360)
    const items = (section.items || []).slice(0, 3)
    const itemSvg = items.map((item, itemIndex) => {
      const itemY = y + 72 + (itemIndex * 72)
      return `
        <text x="132" y="${itemY}" font-size="22" font-weight="600" fill="${item.suspicious ? '#fbbf24' : '#e5e7eb'}">${escapeSvgText(clipText(item.text, 34))}</text>
      `
    }).join('')
    return `
      <rect x="96" y="${y}" width="708" height="292" rx="26" fill="#0f172a" stroke="rgba(255,255,255,0.06)" />
      <text x="132" y="${y + 42}" font-size="24" font-weight="800" fill="#7dd3fc">${escapeSvgText(clipText(section.title, 28))}</text>
      ${itemSvg}
    `
  }).join('')
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="${width}" height="${height}" rx="48" fill="#020617" />
      <rect x="44" y="44" width="${width - 88}" height="${height - 88}" rx="42" fill="#111827" />
      <rect x="334" y="66" width="232" height="28" rx="14" fill="rgba(255,255,255,0.08)" />
      <text x="96" y="132" font-size="18" font-weight="800" fill="#7dd3fc">${escapeSvgText(badge)}</text>
      <text x="96" y="166" font-size="28" font-weight="800" fill="#f8fafc">${escapeSvgText(clipText(title, 28))}</text>
      ${sectionSvgs}
    </svg>
  `
  return buildMediaAssetFromSvg({ svg, width, height, alt: `${title} device evidence`, caption: `${title} device shell` })
}

function buildReadableSnsSvg(title, badge, data) {
  const width = 1080
  const height = 1350
  const commentSvg = (data?.comments || []).slice(0, 2).map((comment, index) => {
    const y = 980 + (index * 92)
    return `
      <text x="150" y="${y}" font-size="18" font-weight="800" fill="#111827">${escapeSvgText(clipText(comment.name, 18))}</text>
      <text x="150" y="${y + 28}" font-size="18" font-weight="600" fill="#334155">${escapeSvgText(clipText(comment.text, 44))}</text>
    `
  }).join('')
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="${width}" height="${height}" rx="28" fill="#f8fafc" />
      <rect x="42" y="42" width="${width - 84}" height="${height - 84}" rx="22" fill="#ffffff" stroke="#e2e8f0" />
      <circle cx="118" cy="118" r="34" fill="#f472b6" />
      <text x="176" y="112" font-size="24" font-weight="800" fill="#111827">${escapeSvgText(clipText(data?.username || title, 22))}</text>
      <text x="176" y="142" font-size="18" font-weight="600" fill="#64748b">${escapeSvgText(clipText(data?.handle || '', 24))}</text>
      <text x="962" y="112" font-size="16" font-weight="700" fill="#f472b6" text-anchor="end">${escapeSvgText(badge)}</text>
      <text x="962" y="142" font-size="16" font-weight="600" fill="#64748b" text-anchor="end">${escapeSvgText(clipText(data?.date || '', 18))}</text>
      ${renderSvgLines(splitSvgLines(data?.text || '', 44, 5), 84, 236, 32, '#111827', 24, 700)}
      <rect x="84" y="470" width="912" height="360" rx="20" fill="#fdf2f8" stroke="#fbcfe8" />
      ${renderSvgLines(splitSvgLines((data?.hashtags || []).join(' '), 42, 3), 110, 548, 30, '#db2777', 22, 800)}
      <text x="110" y="884" font-size="18" font-weight="700" fill="#64748b">COMMENTS</text>
      ${commentSvg}
    </svg>
  `
  return buildMediaAssetFromSvg({ svg, width, height, alt: `${title} social evidence`, caption: `${title} social post preview` })
}

function buildViewerMedia(node, viewerType) {
  const title = evidenceTitle(node)
  const summary = clipText(evidenceSummary(node), 42)
  const badge = String(node.type || viewerType).toUpperCase()
  const rawType = String(node.type || '').toLowerCase()

  if (viewerType === 'bank') {
    const bank = viewerBank(node)
    return buildReadableBankSvg(title, rawType === 'receipt' ? 'RECEIPT' : 'BANK', bank, rawType)
  }

  if (viewerType === 'chat') {
    const chat = viewerChat(node)
    return buildReadableChatSvg(title, rawType === 'email' ? 'EMAIL THREAD' : 'CHAT', chat, rawType)
  }

  if (viewerType === 'contract') {
    const contract = viewerContract(node)
    return buildReadableContractSvg(title, badge, contract)
  }

  if (viewerType === 'log') {
    const log = viewerLog(node)
    return buildReadableLogSvg(title, badge, log)
  }

  if (viewerType === 'testimony') {
    const testimony = viewerTestimony(node)
    return buildReadableTestimonySvg(title, testimony)
  }

  if (viewerType === 'cctv') {
    const events = viewerCctv(node)
    const hero = buildReadableCctvSvg(title, badge, events)
    return {
      ...hero,
      frameImages: (events || []).slice(0, 4).map((event, index) => {
        const frame = buildReadableCctvSvg(
          `${title} ${index + 1}`,
          `${badge} ${index + 1}`,
          [{ ...event, label: event.label || `frame ${index + 1}` }],
        )
        return {
          ...frame,
          caption: `${event.time || `frame ${index + 1}`} ${event.label || ''}`.trim(),
          alt: `${title} frame ${index + 1}`,
        }
      }),
    }
  }

  if (viewerType === 'device') {
    const device = viewerDevice(node)
    const hero = buildReadableDeviceSvg(title, badge, device)
    return {
      ...hero,
      screenshotImages: (device?.sections || []).slice(0, 4).map((section, index) => {
        const media = buildReadableDeviceSvg(
          section.title || `${title} screen ${index + 1}`,
          `SCREEN ${index + 1}`,
          { sections: [section] },
        )
        return {
          ...media,
          caption: section.title || `${title} screen ${index + 1}`,
          alt: `${title} screen ${index + 1}`,
        }
      }),
    }
  }

  if (viewerType === 'sns') {
    const sns = viewerSns(node)
    return buildReadableSnsSvg(title, badge, sns)
  }

  if (viewerType === 'cctv') {
    const events = viewerCctv(node)
    const hero = buildMediaAsset({
      title,
      subtitle: summary,
      badge,
      width: 1280,
      height: 720,
      accent: '#8fb2ff',
      alt: `${title} 미디어 캡처`,
      caption: clipText(events[0]?.desc || summary, 64),
    })
    return {
      ...hero,
      frameImages: events.slice(0, 4).map((event, index) =>
        buildMediaAsset({
          title: event.label,
          subtitle: clipText(event.desc, 36),
          badge: `${badge} ${index + 1}`,
          width: 640,
          height: 360,
          accent: event.suspicious ? '#f59e0b' : '#60a5fa',
          alt: `${title} 프레임 ${index + 1}`,
          caption: `${event.time} ${event.label}`,
        }),
      ),
    }
  }

  if (viewerType === 'device') {
    const device = viewerDevice(node)
    const hero = buildMediaAsset({
      title,
      subtitle: summary,
      badge,
      width: 900,
      height: 1600,
      accent: '#7dd3fc',
      alt: `${title} 기기 화면 캡처`,
      caption: `${title} 스크린샷 요약`,
    })
    return {
      ...hero,
      screenshotImages: device.sections.slice(0, 4).map((section, index) =>
        buildMediaAsset({
          title: section.title,
          subtitle: clipText(section.items[0]?.text || summary, 36),
          badge: `SCREEN ${index + 1}`,
          width: 900,
          height: 1600,
          accent: section.items.some((item) => item.suspicious) ? '#f59e0b' : '#60a5fa',
          alt: `${title} 화면 ${index + 1}`,
          caption: section.title,
        }),
      ),
    }
  }

  if (viewerType === 'sns') {
    return buildMediaAsset({
      title,
      subtitle: summary,
      badge,
      width: 1080,
      height: 1350,
      accent: '#f472b6',
      alt: `${title} 게시물 캡처`,
      caption: `${title} 게시물 이미지`,
    })
  }

  if (viewerType === 'chat') {
    return buildMediaAsset({
      title,
      subtitle: summary,
      badge: rawType === 'email' ? 'EMAIL' : 'CHAT',
      width: 1080,
      height: 1600,
      accent: '#34d399',
      alt: `${title} 대화 캡처`,
      caption: `${title} 대화 스크린샷`,
    })
  }

  if (viewerType === 'bank') {
    return buildMediaAsset({
      title,
      subtitle: summary,
      badge: rawType === 'receipt' ? 'RECEIPT' : 'BANK',
      width: 1280,
      height: 880,
      accent: '#f59e0b',
      alt: `${title} 금융 캡처`,
      caption: `${title} 요약 이미지`,
    })
  }

  if (viewerType === 'contract') {
    const contract = viewerContract(node)
    const hero = buildMediaAsset({
      title,
      subtitle: summary,
      badge,
      width: 1280,
      height: 960,
      accent: '#c084fc',
      alt: `${title} document preview`,
      caption: `${title} document shell`,
    })
    return {
      ...hero,
      screenshotImages: contract.rows.slice(0, 4).map((row, index) =>
        buildMediaAsset({
          title: clipText(row.date || `clause ${index + 1}`, 26),
          subtitle: clipText(row.content || summary, 36),
          badge: `DOC ${index + 1}`,
          width: 1280,
          height: 960,
          accent: row.missing ? '#f59e0b' : '#a78bfa',
          alt: `${title} document page ${index + 1}`,
          caption: row.amount,
        }),
      ),
    }
  }

  if (viewerType === 'log') {
    const log = viewerLog(node)
    const hero = buildMediaAsset({
      title,
      subtitle: summary,
      badge,
      width: 1280,
      height: 900,
      accent: '#22c55e',
      alt: `${title} log preview`,
      caption: `${title} log shell`,
    })
    return {
      ...hero,
      screenshotImages: log.rows.slice(0, 4).map((row, index) =>
        buildMediaAsset({
          title: clipText(row.target || `entry ${index + 1}`, 24),
          subtitle: clipText(`${row.typeLabel} / ${row.duration}`, 36),
          badge: `LOG ${index + 1}`,
          width: 1280,
          height: 900,
          accent: row.suspicious ? '#f59e0b' : '#4ade80',
          alt: `${title} log entry ${index + 1}`,
          caption: row.date,
        }),
      ),
    }
  }

  if (viewerType === 'testimony') {
    const testimony = viewerTestimony(node)
    return buildMediaAsset({
      title: testimony.witnessName || title,
      subtitle: clipText(testimony.quote || summary, 36),
      badge: 'TESTIMONY',
      width: 1080,
      height: 1350,
      accent: '#fb7185',
      alt: `${title} testimony card`,
      caption: testimony.relatedRef || `${title} testimony`,
    })
  }

  return null
}

function buildViewerData(node, meta) {
  const viewer = { meta }
  const rawType = String(node.type || '').toLowerCase()
  const viewerType = normalizeViewerType(node.type)
  let payload
  if (viewerType === 'bank') payload = viewerBank(node)
  else if (viewerType === 'chat') payload = viewerChat(node)
  else if (viewerType === 'contract') payload = viewerContract(node)
  else if (viewerType === 'testimony') payload = viewerTestimony(node)
  else if (viewerType === 'cctv') payload = viewerCctv(node)
  else if (viewerType === 'log') payload = viewerLog(node)
  else if (viewerType === 'device') payload = viewerDevice(node)
  else if (viewerType === 'sns') payload = viewerSns(node)

  if (payload) {
    viewer[viewerType] = payload
    if (rawType && rawType !== viewerType) viewer[rawType] = payload
  }
  const media = buildViewerMedia(node, viewerType)
  if (media) viewer.media = media
  return viewer
}

function mergeViewerData(existing, generated, meta) {
  const merged = { ...(existing || {}) }
  merged.meta = { ...(generated.meta || {}), ...(existing?.meta || {}), ...(meta || {}) }
  for (const [key, value] of Object.entries(generated || {})) {
    if (key === 'meta') continue
    if (key === 'media') {
      if (value) merged[key] = value
      continue
    }
    if (!merged[key] && value) merged[key] = value
  }
  return merged
}

function ensureEvidenceViewerData(runtimeCase) {
  for (const node of runtimeCase.evidence || []) {
    const generatedMeta = buildEvidenceMeta(node)
    node.meta = {
      ...generatedMeta,
      ...(node.meta || {}),
      type: generatedMeta.type,
      viewerType: generatedMeta.viewerType,
      redactions: uniq([...(generatedMeta.redactions || []), ...((node.meta && node.meta.redactions) || [])]),
    }
    node.viewerData = mergeViewerData(node.viewerData, buildViewerData(node, node.meta), node.meta)
  }
}

function sentence(text) {
  return String(text || '').replace(/\s+/g, ' ').trim()
}

function buildInvestigationPrompt(node, attackVector, stage) {
  const label = sentence(node.name || node.id || '해당 증거')
  const proveLabel = sentence((node.proves || []).join(', ')) || '핵심 쟁점'
  if (stage === 0) {
    return `재판관님, ${label}의 원본과 취득 경위를 먼저 확인해 주시겠습니까?`
  }
  if (stage === 1) {
    return `재판관님, ${label}이 ${proveLabel}와 어떻게 이어지는지 빠진 맥락까지 설명해 주시겠습니까?`
  }
  if (attackVector === 'timeline') {
    return `재판관님, ${label}의 시점 차이가 실제 책임 판단을 어떻게 바꾸는지 확인해 주십시오.`
  }
  if (attackVector === 'responsibility') {
    return `재판관님, ${label}이 누구의 관리 책임을 더 무겁게 가리키는지 분리해 주십시오.`
  }
  if (attackVector === 'legality') {
    return `재판관님, ${label}의 취득 방식과 사용 범위를 적법성 기준으로 다시 확인해 주십시오.`
  }
  if (attackVector === 'motive') {
    return `재판관님, ${label}이 드러내는 동기와 계산된 선택을 구분해 주십시오.`
  }
  return `재판관님, ${label}의 핵심 의미와 책임 연결을 다시 정리해 주십시오.`
}

function chooseFinalAttackVector(node) {
  if ((node.proves || []).length >= 2) return 'responsibility'
  if (String(node.kind || '').includes('message') || String(node.kind || '').includes('chat')) return 'motive'
  if (String(node.kind || '').includes('cctv') || String(node.kind || '').includes('timeline')) return 'timeline'
  if (String(node.legality || '').toLowerCase().includes('sus')) return 'legality'
  return 'motive'
}

function ensureInvestigationStages(runtimeCase) {
  for (const node of runtimeCase.evidence || []) {
    if (Array.isArray(node.investigationStages) && node.investigationStages.length === 3) continue
    const finalAttackVector = chooseFinalAttackVector(node)
    node.investigationStages = [
      {
        stage: 0,
        revealKey: 'request_original',
        question: {
          text: buildInvestigationPrompt(node, 'authenticity', 0),
          attackVector: 'authenticity',
        },
      },
      {
        stage: 1,
        revealKey: 'restore_context',
        question: {
          text: buildInvestigationPrompt(node, 'context', 1),
          attackVector: 'context',
        },
      },
      {
        stage: 2,
        revealKey: finalAttackVector === 'motive' ? 'check_motive' : finalAttackVector === 'responsibility' ? 'check_responsibility' : 'check_edits',
        question: {
          text: buildInvestigationPrompt(node, finalAttackVector, 2),
          attackVector: finalAttackVector,
        },
      },
    ]
  }
}

function ensurePartyContext(runtimeCase) {
  for (const node of runtimeCase.evidence || []) {
    if (node.partyContext) continue
    const summary = clipText(node.description || node.surfaceDescription || node.name || node.id, 72)
    node.partyContext = {
      a: {
        questionAngle: 'A측 관점에서 이 자료가 가리키는 책임과 경위를 설명해 주십시오.',
        implication: summary,
      },
      b: {
        questionAngle: 'B측 관점에서 이 자료가 가리키는 책임과 경위를 설명해 주십시오.',
        implication: summary,
      },
    }
  }
}

function ensureHardEvidenceTransitions(runtimeCase) {
  for (const config of [...(runtimeCase.lieConfigA || []), ...(runtimeCase.lieConfigB || [])]) {
    const transitions = Array.isArray(config.transitions) ? config.transitions : []
    if (transitions.some((transition) => String(transition.trigger || '').includes('hard_evidence'))) continue

    const primary = transitions.find((transition) => transition.from === 'S1' && transition.to === 'S2')
    if (primary) {
      primary.trigger = 'hard_evidence'
      continue
    }

    if (transitions[1]) {
      transitions[1].trigger = 'hard_evidence'
    }
  }
}

function enrichRuntimeGameplayLoop(runtimeCase) {
  if (!runtimeCase || typeof runtimeCase !== 'object') return runtimeCase

  ensureEvidenceAccess(runtimeCase)
  ensureEvidenceViewerData(runtimeCase)
  ensureInvestigationStages(runtimeCase)
  ensurePartyContext(runtimeCase)
  ensureEvidenceCombinations(runtimeCase)
  ensureHardEvidenceTransitions(runtimeCase)

  return runtimeCase
}

function enrichRuntimeFile(filePath) {
  const runtimeCase = enrichRuntimeGameplayLoop(readJson(filePath))
  writeJson(filePath, runtimeCase)
  return runtimeCase
}

module.exports = {
  deriveBaseEvidenceIds,
  enrichRuntimeGameplayLoop,
  enrichRuntimeFile,
  normalizeMonetaryDisputeIds,
}
