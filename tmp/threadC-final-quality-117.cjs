#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')

const ROOT = path.join(__dirname, '..')
const NEW100 = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'manifests', 'thread-a-current-new100.json'), 'utf8')).cases
const LEGACY17 = [
  'headline-01',
  'headline-02',
  'spouse-05',
  'spouse-11',
  'spouse-12',
  'family-05',
  'family-09',
  'friend-03',
  'friend-07',
  'neighbor-03',
  'neighbor-08',
  'partnership-04',
  'partnership-09',
  'tenant-02',
  'tenant-09',
  'workplace-11',
  'workplace-12',
]
const CASE_IDS = [...NEW100, ...LEGACY17]
const BATCH_SIZE = 20

const LIE_RANK = { S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5 }
const FORMAL_END_RE = /(습니다|습니까|입니다|하십시오|해 주십시오|주시겠습니까|말씀해 주십시오)$/u
const HAEYO_RE = /(해요|해요\.|했어요|예요|이에요|거예요|거에요|거죠|되죠|하셨죠)(?=[.!?\s]|$)/u
const GENERIC_TO_JUDGE_RE = /^(상대방|상대측|해당\s|그 사람|그쪽|그 운영자|해당 운영자|해당 심사자|상대인)/u
const TRANSLATION_RE = [
  /된 것으로 생각됩니다/u,
  /인 측면/u,
  /부득이하게/u,
  /인지하고 있습니다/u,
  /에 기인/u,
  /해당 건에 대해서는/u,
  /하는 바입니다/u,
  /관련 사항/u,
  /여러 가지 상황/u,
]
const META_LEAK_RE = /as an AI|system prompt|instruction|JSON|viewerData|sourceRefs|truthDescription|relatedDisputeIds|monetaryDisputeIds|correctResponsibility|investigationStages|callTerms/i
const JSON_FIELD_LEAK_RE = /(truthDescription|relatedDisputeIds|viewerData|sourceRefs|monetaryDisputeIds|correctResponsibility|investigationStages|callTerms|surfaceDescription|knowledgeScope|attackVector)/i
const MACHINE_PHRASE_RE = /(실제 .+ 부분|실질적 .+였|실질적 .+이었|관련 .+ 여부|해당 쟁점|문제 축|책임 비율|공개 범위|사실선|사건선)/u
const MONETARY_RE = /(송금|이체|계좌|보증금|월세|정산|합의금|배상금|차입|대출|연체|입금|출금|계약금|위약금|비용|금액|원\b|만원|억원)/u
const WITNESS_META_RE = /(증인은 .*?(설명|진술|말)합니다|증인은 .*?알고 있습니다|증인은 .*?기억한다고 진술합니다|증인은 .*?구분해야 한다고 말합니다|증인은 .*?선을 긋습니다|자기 위치에서 확인한 사실까지만|비교적 또렷하게 설명합니다)/u
const SPOILER_SYSTEM_RE = /(정답|진실은|실제로는|결론적으로 .* 잘못|범인은|확실한 책임은)/u
const AFTERMATH_GENERIC_RE = /(재판관은 .* 책임을 더 무겁게 봅니다|이번 결론은 .* 무게를 둡니다|별도로 남겨 두되 판단의 축은|공개 범위와 재발 방지를)/u
const WORD_RE = /[가-힣A-Za-z0-9]+/gu
const CHANNELS = ['interrogation', 'evidence_present', 'dossier', 'witness', 'system_message', 'aftermath']

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function readText(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : ''
}

function casePath(caseId) {
  return path.join(ROOT, 'src', 'data', 'cases', 'generated', `${caseId}.json`)
}

function bundlePath(caseId) {
  return path.join(ROOT, 'src', 'data', 'scriptedText', `${caseId}.json`)
}

function validationLogPath(caseId, kind) {
  return path.join(ROOT, 'tmp', `${caseId}-${kind}-validate.txt`)
}

function splitSentences(text) {
  return (String(text || '').match(/[^.!?]+[.!?]?/gu) || [])
    .map((part) => part.trim())
    .filter((part) => part.length >= 2)
}

function countSentences(text) {
  return splitSentences(text).length
}

function normalizeSkeleton(text) {
  return String(text || '')
    .replace(/[0-9]/g, '#')
    .replace(/[A-Za-z]+/g, 'A')
    .replace(/[가-힣]{2,}/gu, 'K')
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizeLoose(text) {
  return String(text || '')
    .replace(/[0-9]/g, '#')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function tokenSet(text) {
  return new Set(
    (String(text || '').match(WORD_RE) || [])
      .map((token) => token.trim())
      .filter((token) => token.length >= 2)
  )
}

function similarityByTokens(a, b) {
  const aSet = tokenSet(normalizeLoose(a))
  const bSet = tokenSet(normalizeLoose(b))
  if (!aSet.size || !bSet.size) return 0
  let intersection = 0
  for (const value of aSet) if (bSet.has(value)) intersection += 1
  return intersection / Math.max(aSet.size, bSet.size)
}

function buildVariantIndex(bundle) {
  const index = new Map()
  for (const channelName of CHANNELS) {
    for (const entry of bundle.channels[channelName]?.entries || []) {
      index.set(`key:${channelName}:${entry.key}`, { channel: channelName, entry, text: pickText(entry), variantId: null })
      for (const variant of entry.variants || []) {
        index.set(`variant:${variant.id}`, { channel: channelName, entry, text: variant.text || '', variantId: variant.id })
      }
    }
  }
  return index
}

function pickText(entry, index = 0) {
  return entry?.variants?.[index]?.text || ''
}

function findEntry(bundle, channel, predicate) {
  return (bundle.channels[channel]?.entries || []).find(predicate) || null
}

function findInterrogationEntry(bundle, party, disputeId, lieState, questionType) {
  const key = `${party}|${disputeId}|${lieState}|${questionType}`
  return findEntry(bundle, 'interrogation', (entry) => entry.key === key)
}

function choosePrimaryLane(bundle, caseData) {
  const first = bundle.channels.interrogation?.entries?.[0]
  if (first) return { party: first.party, disputeId: first.disputeId }
  return { party: 'a', disputeId: caseData.disputes?.[0]?.id || 'd-1' }
}

function chooseRepSamples(bundle, caseData) {
  const lane = choosePrimaryLane(bundle, caseData)
  const steps = []
  const pushTurn = (label, state, type, variantIndex = 0) => {
    const entry = findInterrogationEntry(bundle, lane.party, lane.disputeId, state, type)
    if (!entry) return
    steps.push({
      label,
      key: entry.key,
      text: entry.variants?.[variantIndex]?.text || entry.variants?.[0]?.text || '',
    })
  }

  pushTurn('Q1 fact S0', 'S0', 'fact_pursuit', 0)
  pushTurn('Q2 fact repeat', 'S0', 'fact_pursuit', 1)
  pushTurn('Q3 motive S1', 'S1', 'motive_search', 0)
  if (steps.length < 3) pushTurn('Q3 motive S2', 'S2', 'motive_search', 0)
  pushTurn('Q4 empathy S2', 'S2', 'empathy_approach', 0)
  if (steps.length < 4) pushTurn('Q4 empathy S3', 'S3', 'empathy_approach', 0)
  pushTurn('Q5 empathy S4', 'S4', 'empathy_approach', 0)
  if (steps.length < 5) pushTurn('Q5 confession S5', 'S5', 'fact_pursuit', 0)

  while (steps.length < 5) {
    const fallback = bundle.channels.interrogation?.entries?.[steps.length]
    if (!fallback) break
    steps.push({ label: `Q${steps.length + 1}`, key: fallback.key, text: pickText(fallback) })
  }

  const evidenceEntries = []
  const seenEvidenceIds = new Set()
  for (const entry of bundle.channels.evidence_present?.entries || []) {
    if (seenEvidenceIds.has(entry.evidenceId)) continue
    seenEvidenceIds.add(entry.evidenceId)
    evidenceEntries.push({ key: entry.key, text: pickText(entry) })
    if (evidenceEntries.length >= 2) break
  }

  const dossierEntries = (bundle.channels.dossier?.entries || []).slice(0, 2).map((entry) => ({ key: entry.key, text: pickText(entry) }))
  const witnessEntries = {
    vague: pickText(findEntry(bundle, 'witness', (entry) => entry.depth === 'vague')),
    partial: pickText(findEntry(bundle, 'witness', (entry) => entry.depth === 'partial')),
    full: pickText(findEntry(bundle, 'witness', (entry) => entry.depth === 'full')),
  }
  const systemText = pickText(bundle.channels.system_message?.entries?.[0])
  const aftermathText = pickText(bundle.channels.aftermath?.entries?.[0])

  return { lane, steps, evidenceEntries, dossierEntries, witnessEntries, systemText, aftermathText }
}

function parseSummary(output) {
  const match = String(output || '').match(/summary=(\{.*\})/)
  if (!match) return {}
  try {
    return JSON.parse(match[1])
  } catch {
    return {}
  }
}

function parseValidatorIssues(output, variantIndex) {
  const issues = []
  for (const line of String(output || '').split(/\r?\n/)) {
    const match = line.match(/^- \[(\w+)\] ([^ ]+)\s+(.+?):\s+(.+)$/)
    if (!match) continue
    const [, severity, code, location, detail] = match
    const category = /^4-[A-H]/.test(code) ? code.slice(0, 3) : null
    const segments = location.split(' / ').map((segment) => segment.trim()).filter(Boolean)
    const variantId = segments[segments.length - 1]?.includes('#') ? segments[segments.length - 1] : null
    const entryKey = !variantId && segments.length > 1 ? segments[segments.length - 1] : null
    const indexed = variantId
      ? variantIndex.get(`variant:${variantId}`)
      : entryKey && segments[0] ? variantIndex.get(`key:${segments[0]}:${entryKey}`) : null
    issues.push({
      severity,
      code,
      category,
      location,
      detail,
      quote: indexed?.text || '',
    })
  }
  return issues
}

function runValidator(caseId, variantIndex) {
  const result = spawnSync('node', ['tests/validate-scripted-text.cjs', '--case', caseId], {
    cwd: ROOT,
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
  })
  const output = `${result.stdout || ''}${result.stderr || ''}`
  return {
    status: result.status === 0 ? 'PASS' : 'FAIL',
    summary: parseSummary(output),
    raw: output,
    issues: parseValidatorIssues(output, variantIndex),
  }
}

function addIssue(bucket, severity, code, detail, quote = '') {
  bucket.push({ severity, code, detail, quote })
}

function issueStatus(issues) {
  if (issues.some((issue) => issue.severity === 'FAIL' || issue.code.startsWith('FAIL:'))) return 'FAIL'
  if (issues.length) return 'WARN'
  return 'PASS'
}

function hasFormalIssue(text) {
  const sentences = splitSentences(text)
  return sentences.some((sentence) => {
    const normalized = sentence.replace(/[\"'`()\[\]{}]/g, '').replace(/[.!?]+$/g, '').trim()
    if (!normalized) return false
    if (HAEYO_RE.test(normalized)) return true
    return !FORMAL_END_RE.test(normalized)
  })
}

function createInitialEvidenceStates(evidence) {
  const states = {}
  for (const item of evidence || []) {
    states[item.id] = {
      unlocked: (item.requires || []).length === 0 && !item.requiredLieState,
      presented: false,
    }
  }
  return states
}

function checkUnlocks(states, evidence, lieStates = {}) {
  const next = { ...states }
  const newlyUnlocked = []
  for (const item of evidence || []) {
    const current = next[item.id]
    if (!current || current.unlocked) continue
    const reqMet = (item.requires || []).every((reqId) => next[reqId]?.presented || next[reqId]?.unlocked)
    if (!reqMet) continue
    if (item.requiredLieState) {
      const required = LIE_RANK[item.requiredLieState] ?? 0
      const maxRank = Math.max(...(item.proves || []).map((disputeId) => LIE_RANK[lieStates[disputeId] || 'S0'] ?? 0), 0)
      if (maxRank < required) continue
    }
    next[item.id] = { ...current, unlocked: true }
    newlyUnlocked.push(item.id)
  }
  return { next, newlyUnlocked }
}

function presentAllUnlocked(states) {
  const next = { ...states }
  for (const key of Object.keys(next)) next[key] = { ...next[key], presented: next[key].unlocked || next[key].presented }
  return next
}

function checkCombinations(states, combinations) {
  return (combinations || []).filter((combo) => (combo.requires || []).every((id) => states[id]?.presented))
}

function matchTrigger(expected, actual) {
  if (expected === actual) return true
  if (!expected || !actual) return false
  const exp = String(expected)
  const act = String(actual)
  if (exp.includes(act) || act.includes(exp)) return true
  const expParts = exp.split(/_or_|_/)
  const actParts = act.split('_')
  return expParts.filter((chunk) => actParts.some((part) => part.includes(chunk) || chunk.includes(part))).length >= 2
}

function nextState(current) {
  const order = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5']
  const index = order.indexOf(current)
  return index >= 0 && index < order.length - 1 ? order[index + 1] : current
}

function applyTransition(currentState, config, trigger) {
  if (currentState === 'S5') return currentState
  const transition = (config.transitions || []).find((item) => item.from === currentState && matchTrigger(item.trigger, trigger))
  if (transition) return transition.to
  if (config.collapseViaTrust && (trigger.includes('trust') || trigger.includes('confidential') || trigger.includes('empathy'))) return 'S5'
  if (trigger.includes('hard_evidence')) return nextState(currentState)
  return currentState
}

function buildCueTokens(texts) {
  const stop = new Set(['자료', '기록', '문서', '증거', '질문', '대사', '상황', '부분', '내용', '경위', '장면', '사실', '당시'])
  const tokens = new Set()
  for (const text of texts.filter(Boolean)) {
    for (const token of String(text).match(WORD_RE) || []) {
      if (token.length < 2) continue
      if (stop.has(token)) continue
      tokens.add(token)
    }
  }
  return [...tokens]
}

function cueHitCount(text, cueTokens) {
  const normalized = normalizeLoose(text)
  return cueTokens.filter((token) => normalized.includes(token)).length
}

function collectEvidenceCueTokens(caseData, evidenceId) {
  const evidence = (caseData.evidence || []).find((item) => item.id === evidenceId)
  if (!evidence) return []
  return buildCueTokens([
    evidence.name,
    evidence.surfaceName,
    evidence.description,
    evidence.surfaceDescription,
    evidence.investigationResults?.request_original,
    evidence.investigationResults?.restore_context,
    evidence.investigationResults?.check_edits,
    evidence.meta?.sourceNote,
    evidence.viewerData?.meta?.sourceNote,
  ])
}

function collectDisputeCueTokens(caseData, disputeId) {
  const dispute = (caseData.disputes || []).find((item) => item.id === disputeId)
  if (!dispute) return []
  return buildCueTokens([
    dispute.name,
    dispute.truthDescription,
    dispute.anchorTruth,
    dispute.judgmentStatement,
  ])
}

function collectAftermathCueTokens(caseData) {
  return buildCueTokens([
    caseData.duo.partyA?.name,
    caseData.duo.partyB?.name,
    ...(caseData.disputes || []).flatMap((item) => [item.name, item.truthDescription, item.judgmentStatement]),
    ...Object.keys(caseData.solutions || {}),
    ...(Object.values(caseData.solutions || {}).flat()),
  ])
}

function collectSampleScaffolds(caseId, bundle) {
  return {
    caseId,
    interrogation: normalizeSkeleton(pickText(bundle.channels.interrogation?.entries?.[0])),
    evidence: normalizeSkeleton(pickText(bundle.channels.evidence_present?.entries?.[0])),
    dossier: normalizeSkeleton(pickText(bundle.channels.dossier?.entries?.[0])),
    witness: normalizeSkeleton(pickText(findEntry(bundle, 'witness', (entry) => entry.depth === 'full'))),
    aftermath: normalizeSkeleton(pickText(bundle.channels.aftermath?.entries?.[0])),
  }
}

function analyzeLevel4(caseId, caseData, bundle, validator, globalMeta) {
  const issues = {
    '4-A': [],
    '4-B': [],
    '4-C': [],
    '4-D': [],
    '4-E': [],
    '4-F': [],
    '4-G': [],
    '4-H': [],
  }

  const samples = chooseRepSamples(bundle, caseData)
  for (const parsed of validator.issues) {
    if (!parsed.category || !issues[parsed.category]) continue
    const severity = parsed.severity === 'WARN' ? 'WARN' : 'FAIL'
    addIssue(issues[parsed.category], severity, parsed.code, parsed.detail, parsed.quote)
  }

  const toJudgeA = caseData.duo.partyA?.callTerms?.toJudge || ''
  const toJudgeB = caseData.duo.partyB?.callTerms?.toJudge || ''
  if (!toJudgeA || !toJudgeB) {
    addIssue(issues['4-A'], 'FAIL', '4-A1', 'callTerms.toJudge가 비어 있습니다', `A=${toJudgeA || '(empty)'}, B=${toJudgeB || '(empty)'}`)
  } else if (GENERIC_TO_JUDGE_RE.test(toJudgeA) || GENERIC_TO_JUDGE_RE.test(toJudgeB)) {
    addIssue(issues['4-A'], 'FAIL', '4-A1', 'callTerms.toJudge가 관계 호칭이 아니라 generic label입니다', `A=${toJudgeA}, B=${toJudgeB}`)
  }

  for (const entry of bundle.channels.interrogation?.entries || []) {
    const sample = pickText(entry)
    if (hasFormalIssue(sample)) {
      addIssue(issues['4-A'], 'FAIL', '4-A5', '재판관 대상 NPC 대사에 합니다체가 무너지거나 해요체가 섞입니다', sample)
      break
    }
  }

  const translationLeak = (bundle.channels.interrogation?.entries || [])
    .flatMap((entry) => entry.variants || [])
    .find((variant) => TRANSLATION_RE.some((re) => re.test(variant.text || '')) || META_LEAK_RE.test(variant.text || ''))
  if (translationLeak) {
    addIssue(issues['4-A'], 'FAIL', '4-A16', 'NPC 대사에 번역체/메타 누출 패턴이 섞입니다', translationLeak.text || '')
  }

  const monetaryPollution = (bundle.channels.interrogation?.entries || [])
    .find((entry) => {
      const dispute = (caseData.disputes || []).find((item) => item.id === entry.disputeId)
      const disputeText = `${dispute?.name || ''} ${dispute?.truthDescription || ''}`
      return !MONETARY_RE.test(disputeText) && entry.variants?.some((variant) => MONETARY_RE.test(variant.text || ''))
    })
  if (monetaryPollution) {
    addIssue(issues['4-A'], 'FAIL', '4-A19', '비금전 쟁점 대사에 금전 cue가 섞입니다', pickText(monetaryPollution))
  }

  for (const text of [samples.systemText, ...(bundle.channels.system_message?.entries || []).slice(0, 2).map((entry) => pickText(entry))]) {
    if (!text) continue
    if (SPOILER_SYSTEM_RE.test(text)) {
      addIssue(issues['4-C'], 'FAIL', '4-C2', '시스템 메시지가 진실이나 책임을 너무 앞서 공개합니다', text)
      break
    }
  }

  for (const entry of bundle.channels.witness?.entries || []) {
    const text = pickText(entry)
    const sentenceCount = countSentences(text)
    if (entry.depth === 'vague' && sentenceCount !== 1) {
      addIssue(issues['4-D'], 'FAIL', '4-D1', 'witness vague 문장 수가 1문장이 아닙니다', text)
      break
    }
    if (entry.depth === 'partial' && (sentenceCount < 2 || sentenceCount > 3)) {
      addIssue(issues['4-D'], 'FAIL', '4-D1', 'witness partial 문장 수가 2~3문장을 벗어납니다', text)
      break
    }
    if (entry.depth === 'full' && (sentenceCount < 3 || sentenceCount > 5)) {
      addIssue(issues['4-D'], 'FAIL', '4-D1', 'witness full 문장 수가 3~5문장을 벗어납니다', text)
      break
    }
    if (WITNESS_META_RE.test(text)) {
      addIssue(issues['4-D'], 'FAIL', '4-D6', '증인 대사가 직접 진술이 아니라 메타 서술 형식입니다', text)
      break
    }
  }

  const evidenceCueMiss = (bundle.channels.evidence_present?.entries || []).find((entry) => {
    const cueTokens = collectEvidenceCueTokens(caseData, entry.evidenceId)
    return cueTokens.length > 0 && entry.variants?.some((variant) => cueHitCount(variant.text || '', cueTokens) < 2)
  })
  if (evidenceCueMiss) {
    addIssue(issues['4-E'], 'FAIL', '4-E7', 'evidence_present 반응이 증거 실제 내용보다 공통 골격에 가깝습니다', pickText(evidenceCueMiss))
  }

  const dossierCueMiss = (bundle.channels.dossier?.entries || []).find((entry) => {
    const disputeId = entry.key.split('|')[1]?.split('.')[0]?.replace(/^dossier-/, 'd-')
    const cueTokens = collectDisputeCueTokens(caseData, disputeId)
    return cueTokens.length > 0 && entry.variants?.some((variant) => cueHitCount(variant.text || '', cueTokens) < 1)
  })
  if (dossierCueMiss) {
    addIssue(issues['4-E'], 'WARN', '4-E8', 'dossier 반응이 카드/질문 구체 내용보다 범용 방어문에 가깝습니다', pickText(dossierCueMiss))
  }

  const fieldLeak = CHANNELS.flatMap((channel) => bundle.channels[channel]?.entries || [])
    .flatMap((entry) => entry.variants || [])
    .find((variant) => JSON_FIELD_LEAK_RE.test(variant.text || '') || MACHINE_PHRASE_RE.test(variant.text || ''))
  if (fieldLeak) {
    addIssue(issues['4-F'], 'FAIL', '4-F8', 'JSON 필드명이나 기계적 쟁점 조각이 대사에 노출됩니다', fieldLeak.text || '')
  }

  const colloquialIssue = samples.steps.map((step) => step.text).find((text) => {
    const sentences = splitSentences(text)
    if (sentences.length < 2) return false
    const sameEndingRatio = sentences.filter((sentence) => /습니다|였습니다|했습니다/u.test(sentence)).length / sentences.length
    return sameEndingRatio >= 0.9
  })
  if (colloquialIssue) {
    addIssue(issues['4-F'], 'WARN', '4-F10', '구어체 흐름보다 문어체 종결이 과도하게 반복됩니다', colloquialIssue)
  }

  const variantRepetition = (bundle.channels.interrogation?.entries || []).find((entry) => {
    if ((entry.variants || []).length < 5) return true
    const scaffolds = new Set((entry.variants || []).map((variant) => normalizeSkeleton(variant.text)))
    return scaffolds.size <= 2
  })
  if (variantRepetition) {
    addIssue(issues['4-G'], 'FAIL', '4-G4', '같은 key의 5개 variant가 명사만 바뀐 scaffold 반복에 가깝습니다', pickText(variantRepetition))
  }

  const repeatPair = samples.steps[0]?.text && samples.steps[1]?.text ? similarityByTokens(samples.steps[0].text, samples.steps[1].text) : 0
  if (repeatPair >= 0.85) {
    addIssue(issues['4-G'], 'WARN', '4-G1', '반복 질문 variant 차이가 작습니다', `${samples.steps[0].text}\n${samples.steps[1].text}`)
  }

  const aftermathCueMiss = (bundle.channels.aftermath?.entries || []).find((entry) => {
    const cueTokens = collectAftermathCueTokens(caseData)
    return cueTokens.length > 0 && entry.variants?.some((variant) => cueHitCount(variant.text || '', cueTokens) < 2)
  })
  if (aftermathCueMiss) {
    addIssue(issues['4-H'], 'WARN', '4-H2', 'aftermath에 사건 고유 인물/쟁점/해결책 단서가 부족합니다', pickText(aftermathCueMiss))
  }

  const aftermathGeneric = (bundle.channels.aftermath?.entries || []).find((entry) => entry.variants?.some((variant) => AFTERMATH_GENERIC_RE.test(variant.text || '')))
  if (aftermathGeneric) {
    addIssue(issues['4-H'], 'WARN', '4-H4', 'aftermath가 결과 템플릿 골격에 가까운 문장을 유지합니다', pickText(aftermathGeneric))
  }

  const scaffold = globalMeta.scaffolds[caseId]
  if (scaffold) {
    if ((globalMeta.scaffoldMaps.evidence.get(scaffold.evidence) || []).length > 1 && scaffold.evidence) {
      addIssue(issues['4-E'], 'WARN', '4-E7', '대표 evidence_present scaffold가 다른 사건과 반복됩니다', samples.evidenceEntries[0]?.text || '')
    }
    if ((globalMeta.scaffoldMaps.dossier.get(scaffold.dossier) || []).length > 1 && scaffold.dossier) {
      addIssue(issues['4-E'], 'WARN', '4-E8', '대표 dossier scaffold가 다른 사건과 반복됩니다', samples.dossierEntries[0]?.text || '')
    }
    if ((globalMeta.scaffoldMaps.aftermath.get(scaffold.aftermath) || []).length > 1 && scaffold.aftermath) {
      addIssue(issues['4-H'], 'WARN', '4-H4', 'aftermath scaffold가 다른 사건과 반복됩니다', samples.aftermathText)
    }
  }

  const statuses = Object.fromEntries(Object.entries(issues).map(([key, value]) => [key, issueStatus(value)]))
  return { issues, statuses, samples }
}

function analyzeCase(caseId, globalMeta) {
  const caseData = loadJson(casePath(caseId))
  const bundle = loadJson(bundlePath(caseId))
  const variantIndex = buildVariantIndex(bundle)
  const validator = runValidator(caseId, variantIndex)
  const logs = {
    runtimeTemplate: /PASS/.test(readText(validationLogPath(caseId, 'runtime-template'))),
    scriptedTemplate: /PASS/.test(readText(validationLogPath(caseId, 'scripted-template'))),
    semantic: /PASS/.test(readText(validationLogPath(caseId, 'semantic'))),
    stage3: /PASS/.test(readText(validationLogPath(caseId, 'stage3'))),
  }

  const evidence = caseData.evidence || []
  const initialStates = createInitialEvidenceStates(evidence)
  const initialUnlocked = Object.entries(initialStates).filter(([, value]) => value.unlocked).map(([id]) => id)
  let level1 = 'PASS'
  if (!bundle.channels?.interrogation || !bundle.channels?.evidence_present || !bundle.channels?.dossier || !bundle.channels?.witness || !bundle.channels?.aftermath) {
    level1 = 'FAIL'
  } else if (!logs.runtimeTemplate || !logs.scriptedTemplate || !logs.semantic || !logs.stage3) {
    level1 = 'WARN'
  }

  let level2 = 'PASS'
  const lieStates = Object.fromEntries((caseData.disputes || []).map((dispute) => [dispute.id, 'S0']))
  let states = { ...initialStates }
  const unlockByState = {}
  for (const lieState of ['S1', 'S2', 'S3', 'S4', 'S5']) {
    for (const disputeId of Object.keys(lieStates)) lieStates[disputeId] = lieState
    states = presentAllUnlocked(states)
    const { next, newlyUnlocked } = checkUnlocks(states, evidence, lieStates)
    states = next
    unlockByState[lieState] = newlyUnlocked
  }
  const combos = checkCombinations(presentAllUnlocked(states), caseData.evidenceCombinations || [])
  if (initialUnlocked.length < 3 || combos.length < Math.max(1, (caseData.evidenceCombinations || []).length)) {
    level2 = 'WARN'
  }

  let level3 = 'PASS'
  const configs = [
    ...(caseData.lieConfigA || []).map((item) => ({ party: 'a', ...item })),
    ...(caseData.lieConfigB || []).map((item) => ({ party: 'b', ...item })),
  ]
  if (configs.length) {
    const primary = configs[0]
    let current = 'S0'
    const firstTrigger = primary.transitions?.[0]?.trigger || 'fact_question'
    const secondTrigger = primary.transitions?.[1]?.trigger || 'hard_evidence'
    current = applyTransition(current, primary, firstTrigger)
    const repeated = applyTransition(current, primary, firstTrigger)
    const afterHard = applyTransition(current, primary, secondTrigger)
    if (repeated !== current || afterHard === current) level3 = 'WARN'
  }

  let level5 = 'PASS'
  if (!Object.keys(caseData.solutions || {}).length || !(bundle.channels.aftermath?.entries || []).length) level5 = 'WARN'

  const level4 = analyzeLevel4(caseId, caseData, bundle, validator, globalMeta)
  const level4Status = Object.values(level4.statuses).some((status) => status === 'FAIL')
    ? 'FAIL'
    : Object.values(level4.statuses).some((status) => status === 'WARN')
      ? 'WARN'
      : 'PASS'

  const overall = [level1, level2, level3, level4Status, level5].includes('FAIL')
    ? 'FAIL'
    : [level1, level2, level3, level4Status, level5].includes('WARN')
      ? '조건부 PASS'
      : 'PASS'

  return {
    caseId,
    caseData,
    validator,
    logs,
    initialUnlocked,
    unlockByState,
    combos: combos.map((combo) => combo.requires.join('+')),
    levelStatuses: { level1, level2, level3, level4: level4Status, level5 },
    level4,
    overall,
  }
}

function buildGlobalMeta() {
  const scaffolds = {}
  const scaffoldMaps = {
    interrogation: new Map(),
    evidence: new Map(),
    dossier: new Map(),
    witness: new Map(),
    aftermath: new Map(),
  }
  for (const caseId of CASE_IDS) {
    const bundle = loadJson(bundlePath(caseId))
    const sample = collectSampleScaffolds(caseId, bundle)
    scaffolds[caseId] = sample
    for (const key of ['interrogation', 'evidence', 'dossier', 'witness', 'aftermath']) {
      const value = sample[key]
      if (!value) continue
      if (!scaffoldMaps[key].has(value)) scaffoldMaps[key].set(value, [])
      scaffoldMaps[key].get(value).push(caseId)
    }
  }
  return { scaffolds, scaffoldMaps }
}

function summarize(results) {
  const summary = {
    total: results.length,
    levels: {
      level1: { PASS: 0, WARN: 0, FAIL: 0 },
      level2: { PASS: 0, WARN: 0, FAIL: 0 },
      level3: { PASS: 0, WARN: 0, FAIL: 0 },
      level4: { PASS: 0, WARN: 0, FAIL: 0 },
      level5: { PASS: 0, WARN: 0, FAIL: 0 },
    },
    overall: { PASS: 0, '조건부 PASS': 0, FAIL: 0 },
    level4ByCategory: {
      '4-A': { PASS: 0, WARN: 0, FAIL: 0 },
      '4-B': { PASS: 0, WARN: 0, FAIL: 0 },
      '4-C': { PASS: 0, WARN: 0, FAIL: 0 },
      '4-D': { PASS: 0, WARN: 0, FAIL: 0 },
      '4-E': { PASS: 0, WARN: 0, FAIL: 0 },
      '4-F': { PASS: 0, WARN: 0, FAIL: 0 },
      '4-G': { PASS: 0, WARN: 0, FAIL: 0 },
      '4-H': { PASS: 0, WARN: 0, FAIL: 0 },
    },
    validator: { PASS: 0, FAIL: 0 },
  }

  for (const result of results) {
    summary.levels.level1[result.levelStatuses.level1] += 1
    summary.levels.level2[result.levelStatuses.level2] += 1
    summary.levels.level3[result.levelStatuses.level3] += 1
    summary.levels.level4[result.levelStatuses.level4] += 1
    summary.levels.level5[result.levelStatuses.level5] += 1
    summary.overall[result.overall] += 1
    summary.validator[result.validator.status] += 1
    for (const category of Object.keys(summary.level4ByCategory)) {
      summary.level4ByCategory[category][result.level4.statuses[category]] += 1
    }
  }
  return summary
}

function buildGlobalScriptedAudit() {
  const llmResolver = readText(path.join(ROOT, 'src', 'engine', 'llmDialogueResolver.ts'))
  const actionDispatch = readText(path.join(ROOT, 'src', 'hooks', 'useActionDispatch.ts'))
  const witnessEngine = readText(path.join(ROOT, 'src', 'engine', 'witnessEngine.ts'))
  const aftermathResolver = readText(path.join(ROOT, 'src', 'engine', 'aftermathResolver.ts'))
  const verdictScreen = readText(path.join(ROOT, 'src', 'components', 'verdict', 'VerdictScreen.tsx'))

  return {
    questionScripted: /getScriptedInterrogation/.test(llmResolver),
    evidencePresentScripted: /getScriptedEvidencePresent/.test(llmResolver),
    dossierRuntimeWired: /getScriptedDossier/.test(llmResolver) || /getScriptedDossier/.test(actionDispatch),
    witnessScripted: /getScriptedWitness/.test(witnessEngine),
    aftermathScripted: /getScriptedAftermath/.test(aftermathResolver),
    evidenceInvestigateUsesLLM: /handleEvidenceInvestigate/.test(actionDispatch) && /resolveAndApply\(action, target\)/.test(actionDispatch),
    trustActionUsesLLM: /handleTrustAction/.test(actionDispatch) && /resolveAndApply\(action, action.target, isConfidential\)/.test(actionDispatch),
    mediationUsesLLMPath: /action.type === 'mediation'/.test(llmResolver),
    stageMapHasFriendHeadline: /friend:\s*7/.test(verdictScreen) && /headline:\s*7/.test(verdictScreen),
  }
}

function formatIssue(issue) {
  const quote = issue.quote ? ` — "${issue.quote}"` : ''
  return `- ${issue.code}: ${issue.detail}${quote}`
}

function renderCase(result) {
  const lines = []
  lines.push(`## ${result.caseId}`)
  lines.push('')
  lines.push('### Level 1~3, 5')
  lines.push(`- Level 1: ${result.levelStatuses.level1}`)
  lines.push(`- Level 2: ${result.levelStatuses.level2}`)
  lines.push(`- Level 3: ${result.levelStatuses.level3}`)
  lines.push(`- Level 5: ${result.levelStatuses.level5}`)
  lines.push(`- Validator: ${result.validator.status} ${JSON.stringify(result.validator.summary)}`)
  lines.push('')
  lines.push('### Level 4 상세')
  for (const category of ['4-A', '4-B', '4-C', '4-D', '4-E', '4-F', '4-G', '4-H']) {
    lines.push(`- ${category}: ${result.level4.statuses[category]}`)
    for (const issue of result.level4.issues[category].slice(0, 4)) {
      lines.push(`  ${formatIssue(issue)}`)
    }
  }
  lines.push('')
  lines.push('### 대표 심문/증거 원문')
  for (const step of result.level4.samples.steps) lines.push(`- ${step.label}: "${step.text}"`)
  for (const evidence of result.level4.samples.evidenceEntries) lines.push(`- Evidence: "${evidence.text}"`)
  for (const dossier of result.level4.samples.dossierEntries) lines.push(`- Dossier: "${dossier.text}"`)
  if (result.level4.samples.witnessEntries.full) lines.push(`- Witness(full): "${result.level4.samples.witnessEntries.full}"`)
  if (result.level4.samples.aftermathText) lines.push(`- Aftermath: "${result.level4.samples.aftermathText}"`)
  lines.push('')
  lines.push('### 종합')
  lines.push(`- ${result.overall}`)
  lines.push('')
  return lines.join('\n')
}

function renderReport(results, summary, scriptedAudit) {
  const lines = []
  lines.push('# Thread-C Final Quality Test (117 cases)')
  lines.push('')
  lines.push(`- Total: ${summary.total}`)
  lines.push(`- Level 1: ${JSON.stringify(summary.levels.level1)}`)
  lines.push(`- Level 2: ${JSON.stringify(summary.levels.level2)}`)
  lines.push(`- Level 3: ${JSON.stringify(summary.levels.level3)}`)
  lines.push(`- Level 4: ${JSON.stringify(summary.levels.level4)}`)
  lines.push(`- Level 5: ${JSON.stringify(summary.levels.level5)}`)
  lines.push(`- Overall: ${JSON.stringify(summary.overall)}`)
  lines.push(`- Validator: ${JSON.stringify(summary.validator)}`)
  lines.push('')
  lines.push('## Level 4 Category Summary')
  for (const category of ['4-A', '4-B', '4-C', '4-D', '4-E', '4-F', '4-G', '4-H']) {
    lines.push(`- ${category}: ${JSON.stringify(summary.level4ByCategory[category])}`)
  }
  lines.push('')
  lines.push('## Global Scripted / LLM Audit')
  lines.push(`- question scripted: ${scriptedAudit.questionScripted}`)
  lines.push(`- evidence_present scripted: ${scriptedAudit.evidencePresentScripted}`)
  lines.push(`- dossier runtime wired: ${scriptedAudit.dossierRuntimeWired}`)
  lines.push(`- witness scripted: ${scriptedAudit.witnessScripted}`)
  lines.push(`- aftermath scripted: ${scriptedAudit.aftermathScripted}`)
  lines.push(`- evidence_investigate uses resolveAndApply(LLM path): ${scriptedAudit.evidenceInvestigateUsesLLM}`)
  lines.push(`- trust_action uses resolveAndApply(LLM path): ${scriptedAudit.trustActionUsesLLM}`)
  lines.push(`- mediation path still handled in llmDialogueResolver: ${scriptedAudit.mediationUsesLLMPath}`)
  lines.push(`- VerdictScreen stageMap has friend/headline: ${scriptedAudit.stageMapHasFriendHeadline}`)
  lines.push('')
  lines.push('## Cases')
  lines.push('')
  for (const result of results) lines.push(renderCase(result))
  return lines.join('\n')
}

function renderBatch(results, batchIndex) {
  const lines = []
  lines.push(`# Batch ${batchIndex + 1}`)
  lines.push('')
  for (const result of results) {
    lines.push(`## ${result.caseId}`)
    lines.push(`- Level 1: ${result.levelStatuses.level1}`)
    lines.push(`- Level 2: ${result.levelStatuses.level2}`)
    lines.push(`- Level 3: ${result.levelStatuses.level3}`)
    lines.push(`- Level 4: ${result.levelStatuses.level4}`)
    lines.push(`- Level 5: ${result.levelStatuses.level5}`)
    lines.push(`- 4-A: ${result.level4.statuses['4-A']}`)
    lines.push(`- 4-D: ${result.level4.statuses['4-D']}`)
    lines.push(`- 4-E: ${result.level4.statuses['4-E']}`)
    lines.push(`- 4-F: ${result.level4.statuses['4-F']}`)
    lines.push(`- 4-G: ${result.level4.statuses['4-G']}`)
    lines.push(`- 4-H: ${result.level4.statuses['4-H']}`)
    const firstIssue = ['4-A', '4-D', '4-E', '4-F', '4-G', '4-H']
      .flatMap((category) => result.level4.issues[category])
      .find(Boolean)
    if (firstIssue) lines.push(`- 대표 이슈: ${firstIssue.code} / ${firstIssue.detail}`)
    for (const step of result.level4.samples.steps.slice(0, 2)) lines.push(`- 심문: "${step.text}"`)
    for (const evidence of result.level4.samples.evidenceEntries.slice(0, 1)) lines.push(`- 증거: "${evidence.text}"`)
    if (result.level4.samples.witnessEntries.full) lines.push(`- 증인: "${result.level4.samples.witnessEntries.full}"`)
    if (result.level4.samples.aftermathText) lines.push(`- 후일담: "${result.level4.samples.aftermathText}"`)
    lines.push('')
  }
  return lines.join('\n')
}

function main() {
  const globalMeta = buildGlobalMeta()
  const results = CASE_IDS.map((caseId) => analyzeCase(caseId, globalMeta))
  const summary = summarize(results)
  const scriptedAudit = buildGlobalScriptedAudit()

  const jsonPath = path.join(ROOT, 'tmp', 'threadC-final-quality-117-report.json')
  const mdPath = path.join(ROOT, 'tmp', 'threadC-final-quality-117-report.md')
  fs.writeFileSync(jsonPath, JSON.stringify({ generatedAt: new Date().toISOString(), caseIds: CASE_IDS, summary, scriptedAudit, results }, null, 2))
  fs.writeFileSync(mdPath, renderReport(results, summary, scriptedAudit))

  const batches = []
  for (let index = 0; index < results.length; index += BATCH_SIZE) {
    const batch = results.slice(index, index + BATCH_SIZE)
    const batchPath = path.join(ROOT, 'tmp', `threadC-final-quality-117-batch-${Math.floor(index / BATCH_SIZE) + 1}.md`)
    fs.writeFileSync(batchPath, renderBatch(batch, Math.floor(index / BATCH_SIZE)))
    batches.push(batchPath)
  }

  console.log(JSON.stringify({ jsonPath, mdPath, batches }, null, 2))
}

main()
