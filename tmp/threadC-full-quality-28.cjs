#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')

const ROOT = path.join(__dirname, '..')

const CASE_IDS = [
  'workplace-new-02',
  'tenant-new-01',
  'civic-new-10',
  'partnership-new-10',
  'spouse-new-06',
  'neighbor-new-03',
  'online-new-05',
  'professional-new-01',
  'friend-new-08',
  'family-new-04',
  'spouse-new-03',
  'family-new-02',
  'friend-new-01',
  'partnership-new-01',
  'tenant-new-10',
  'workplace-new-10',
  'online-new-06',
  'professional-new-10',
  'neighbor-new-11',
  'civic-new-11',
  'family-new-03',
  'family-new-05',
  'friend-new-02',
  'friend-new-09',
  'neighbor-new-07',
  'tenant-new-09',
  'workplace-new-09',
  'professional-new-08',
]

const LIE_RANK = { S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5 }
const FORMAL_RE = /(니다|니까|십시오)$/u
const HAEYO_RE = /요(?=[.!?,"'\s]|$)/u
const KOREAN_AMOUNT_RE = /(?:\d[\d,.]*\s*(?:천|백|십)?만?\s*원|[일이삼사오육칠팔구십백천]+만?\s*원)/u
const META_RE = /AI|프롬프트|instruction|system prompt|as an AI/i
const TRANSLATION_RE = /(된\s?것으로\s?생각됩니다|인\s?측면이|부득이하게|인지하고\s?있습니다|에\s?기인(?:하여|합니다|한)|해당\s?건에\s?대해서는|하는\s?바입니다|관련\s?사항을\s?간과|여러\s?가지\s?상황이\s?얽혀)/u
const CLICHE_RE = /(미리\s?말씀|사전\s?(?:상의|협의)|특정\s*[A-Za-z0-9가-힣]+|만을)/u
const MONEY_POLLUTION_RE = /(송금|이체|계좌|금액|원\b|보증금|월세|정산|환급|납부|급여|수당|대출|배상금|합의금)/u

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function exists(filePath) {
  return fs.existsSync(filePath)
}

function casePath(caseId) {
  return path.join(ROOT, 'src', 'data', 'cases', 'generated', `${caseId}.json`)
}

function bundlePath(caseId) {
  return path.join(ROOT, 'src', 'data', 'scriptedText', `${caseId}.json`)
}

function logPath(caseId, kind) {
  return path.join(ROOT, 'tmp', `${caseId}-${kind}-validate.txt`)
}

function dossierPath(caseId) {
  return path.join(ROOT, 'docs', 'ref', '리뉴얼참고', `${caseId}-v3-game-loop-data.json`)
}

function readIfExists(filePath) {
  return exists(filePath) ? fs.readFileSync(filePath, 'utf8') : ''
}

function sentenceCount(text) {
  return (String(text || '').match(/[^.!?]+[.!?]?/gu) || [])
    .map((part) => part.trim())
    .filter((part) => part.length >= 2)
    .length
}

function normalizeText(text) {
  return String(text || '')
    .replace(/\s+/g, ' ')
    .replace(/[0-9]/g, '#')
    .replace(/[“”"'`]/g, '')
    .trim()
}

function extractLeadAddress(text) {
  const match = String(text || '').trim().match(/^([^,.!?]{2,20})[,.!?]/u)
  return match?.[1]?.trim() || ''
}

function trigramSet(text) {
  const normalized = normalizeText(text).toLowerCase()
  const set = new Set()
  for (let i = 0; i <= normalized.length - 3; i += 1) {
    const tri = normalized.slice(i, i + 3)
    if (tri.trim().length === 3) set.add(tri)
  }
  return set
}

function trigramSimilarity(a, b) {
  const ta = trigramSet(a)
  const tb = trigramSet(b)
  if (!ta.size || !tb.size) return 0
  let intersection = 0
  for (const item of ta) {
    if (tb.has(item)) intersection += 1
  }
  const union = new Set([...ta, ...tb]).size
  return union ? intersection / union : 0
}

function parseSummaryText(text) {
  const match = String(text || '').match(/summary=(\{.*\})/)
  if (!match) return {}
  try {
    return JSON.parse(match[1])
  } catch {
    return {}
  }
}

function parseLogPass(text) {
  return /\bPASS\b/.test(text)
}

function runValidator(caseId) {
  const result = spawnSync('node', ['tests/validate-scripted-text.cjs', '--case', caseId], {
    cwd: ROOT,
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
  })
  const output = `${result.stdout || ''}${result.stderr || ''}`
  const summary = parseSummaryText(output)
  const issues = output
    .split(/\r?\n/)
    .filter((line) => line.startsWith('- ['))
    .map((line) => line.trim())
  if (/SyntaxError: Invalid regular expression/.test(output)) {
    return {
      status: 'UNAVAILABLE',
      summary: {},
      issues: [],
      raw: output,
      unavailableReason: 'tests/validate-scripted-text.cjs 현재 정규식 SyntaxError로 실행 불가',
    }
  }
  return {
    status: result.status === 0 ? 'PASS' : 'FAIL',
    summary,
    issues,
    raw: output,
  }
}

function createInitialEvidenceStates(evidence) {
  const states = {}
  for (const item of evidence) {
    states[item.id] = {
      id: item.id,
      unlocked: item.requires.length === 0 && !item.requiredLieState,
      presented: false,
      presentedTo: [],
      investigatedActions: [],
    }
  }
  return states
}

function checkUnlocks(states, evidence, lieStates = {}) {
  const updated = { ...states }
  const newlyUnlocked = []
  for (const item of evidence) {
    const state = updated[item.id]
    if (!state || state.unlocked) continue
    const allReqMet = item.requires.every((reqId) => updated[reqId] && (updated[reqId].presented || updated[reqId].unlocked))
    if (!allReqMet) continue
    if (item.requiredLieState) {
      const reqRank = LIE_RANK[item.requiredLieState] ?? 0
      const proves = item.proves || []
      if (proves.length > 0) {
        const maxRank = Math.max(...proves.map((dId) => LIE_RANK[lieStates[dId] || 'S0'] ?? 0))
        if (maxRank < reqRank) continue
      }
    }
    updated[item.id] = { ...state, unlocked: true }
    newlyUnlocked.push(item.id)
  }
  return { updated, newlyUnlocked }
}

function presentEvidence(states, evidenceId, target = 'a') {
  const state = states[evidenceId]
  if (!state || !state.unlocked) return states
  return {
    ...states,
    [evidenceId]: {
      ...state,
      presented: true,
      presentedTo: [...new Set([...(state.presentedTo || []), target])],
    },
  }
}

function checkCombinations(states, combinations) {
  return (combinations || []).filter((combo) => combo.requires.every((id) => states[id]?.presented))
}

function computeSurfacedEvidence(states, evidence, currentDisputeId, baseEvidenceIds) {
  const surfacedIds = []
  const dimmedIds = []
  const reinforcements = {}
  for (const id of (baseEvidenceIds || []).slice(0, 3)) surfacedIds.push(id)
  if (currentDisputeId) {
    const contextual = evidence.find((item) =>
      !surfacedIds.includes(item.id) &&
      states[item.id]?.unlocked &&
      (item.proves || []).includes(currentDisputeId)
    )
    if (contextual) surfacedIds.push(contextual.id)
  }
  for (const item of evidence) {
    if (!surfacedIds.includes(item.id) && states[item.id]?.unlocked) dimmedIds.push(item.id)
  }
  for (const surfacedId of surfacedIds) {
    const surf = evidence.find((item) => item.id === surfacedId)
    if (!surf?.proves) continue
    const linked = dimmedIds.filter((id) => {
      const item = evidence.find((candidate) => candidate.id === id)
      return item?.proves?.some((disputeId) => surf.proves.includes(disputeId))
    })
    if (linked.length) reinforcements[surfacedId] = linked
  }
  return { surfacedIds, dimmedIds, reinforcements }
}

function matchTrigger(expected, actual) {
  if (expected === actual) return true
  const expectedParts = expected.split('_or_')
  for (const part of expectedParts) {
    if (actual.includes(part) || part.includes(actual)) return true
    const a = part.split('_')
    const b = actual.split('_')
    if (a.filter((chunk) => b.some((target) => target.includes(chunk) || chunk.includes(target))).length >= 2) return true
  }
  return false
}

function nextState(current) {
  const order = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5']
  const idx = order.indexOf(current)
  return idx >= 0 && idx < order.length - 1 ? order[idx + 1] : current
}

function applyTransition(currentState, config, trigger, trustState = { trustTowardJudge: 30, retaliationWorry: 30 }) {
  if (currentState === 'S5') return currentState
  if (config.collapseViaTrust && trustState.trustTowardJudge >= 70 && (trigger.includes('empathy') || trigger.includes('trust') || trigger.includes('confidential'))) {
    return 'S5'
  }
  if (config.lieMotive === 'revenge' && currentState === 'S2' && trigger.includes('responsibility')) return 'S4'
  if (config.lieMotive === 'third_party_protection' && currentState === 'S3' && (trigger.includes('trust') || trigger.includes('retaliation')) && trustState.retaliationWorry < 30) return 'S5'
  if (config.lieMotive === 'relationship_maintenance' && currentState === 'S4' && (trigger.includes('trust') || trigger.includes('empathy')) && trustState.trustTowardJudge >= 50) return 'S5'
  const transition = (config.transitions || []).find((entry) => entry.from === currentState && matchTrigger(entry.trigger, trigger))
  if (transition) return transition.to
  if (trigger.includes('hard_evidence')) return nextState(currentState)
  if (trigger === 'witness_testimony' && (currentState === 'S0' || currentState === 'S1' || currentState === 'S2')) return nextState(currentState)
  return currentState
}

function determineWitnessDepth(witness, getLieState) {
  const disputeIds = witness.relatedDisputeIds || []
  if (!disputeIds.length) return 'full'
  let max = 0
  for (const disputeId of disputeIds) {
    max = Math.max(max, LIE_RANK[getLieState('a', disputeId) || 'S0'] || 0, LIE_RANK[getLieState('b', disputeId) || 'S0'] || 0)
  }
  if (witness.slot === 'institutional' && max >= LIE_RANK.S2) return 'full'
  if (max >= LIE_RANK.S4) return 'full'
  if (max >= LIE_RANK.S2) return 'partial'
  return 'vague'
}

function parseEntryKey(key) {
  return key.split('|')
}

function getEntry(bundle, channelName, predicate) {
  return (bundle.channels[channelName]?.entries || []).find(predicate) || null
}

function getEntryByKey(bundle, channelName, key) {
  return getEntry(bundle, channelName, (entry) => entry.key === key)
}

function pickFirstText(entry) {
  return entry?.variants?.[0]?.text || ''
}

function pickFirstBehavior(entry) {
  return entry?.variants?.[0]?.behaviorHint || ''
}

function buildIssue(code, detail, quote = '') {
  return { code, detail, quote }
}

function statusFromIssues(issues) {
  if (issues.some((item) => item.severity === 'FAIL')) return 'FAIL'
  if (issues.length) return 'WARN'
  return 'PASS'
}

function addIssue(target, severity, code, detail, quote = '') {
  target.push({ severity, code, detail, quote })
}

function validatorIssuesForCodes(validatorIssues, codes) {
  return validatorIssues.filter((line) => codes.some((code) => line.includes(` ${code} `) || line.includes(`] ${code}`)))
}

function channelKeyCoverage(bundle) {
  return {
    interrogation: bundle.channels.interrogation.entries.length,
    evidence_present: bundle.channels.evidence_present.entries.length,
    dossier: bundle.channels.dossier.entries.length,
    witness: bundle.channels.witness.entries.length,
    aftermath: bundle.channels.aftermath.entries.length,
    system_message: bundle.channels.system_message.entries.length,
  }
}

function hasAnyFormalViolation(text) {
  const sentences = String(text || '')
    .match(/[^.!?]+[.!?]?/gu) || []
  return sentences
    .map((sentence) => sentence.trim())
    .filter(Boolean)
    .some((sentence) => {
      const normalized = sentence.replace(/[\"'`()\[\]{}]/g, '').replace(/[.!?]+$/g, '').trim()
      if (!normalized) return false
      if (HAEYO_RE.test(normalized)) return true
      return !FORMAL_RE.test(normalized)
    })
}

function containsBadJudgeLead(text) {
  const lead = extractLeadAddress(text)
  return ['상대방', '자기', '너', '당신'].includes(lead)
}

function uniqueRatio(entries) {
  const total = entries.length
  if (!total) return 1
  const unique = new Set(entries.map((entry) => normalizeText(entry.variants?.[0]?.text || ''))).size
  return unique / total
}

function topSimilarity(entries) {
  let max = 0
  for (let i = 0; i < entries.length; i += 1) {
    for (let j = i + 1; j < entries.length; j += 1) {
      max = Math.max(max, trigramSimilarity(entries[i].variants?.[0]?.text || '', entries[j].variants?.[0]?.text || ''))
    }
  }
  return max
}

function analyzeLevel4(caseData, bundle, validator) {
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

  const partyA = caseData.duo.partyA
  const partyB = caseData.duo.partyB
  const toJudgeA = partyA.callTerms?.toJudge || ''
  const toJudgeB = partyB.callTerms?.toJudge || ''
  const interrogationEntries = bundle.channels.interrogation.entries || []
  const evidenceEntries = bundle.channels.evidence_present.entries || []
  const dossierEntries = bundle.channels.dossier.entries || []
  const witnessEntries = bundle.channels.witness.entries || []
  const aftermathEntries = bundle.channels.aftermath.entries || []
  const systemEntries = bundle.channels.system_message.entries || []

  if (toJudgeA === '상대방' || toJudgeB === '상대방') {
    addIssue(issues['4-A'], 'FAIL', '4-A1', 'callTerms.toJudge가 재판관 지칭형이 아니라 "상대방"으로 설정됨', `A=${toJudgeA}, B=${toJudgeB}`)
    addIssue(issues['4-F'], 'WARN', '4-F5', '재판관 대상 호칭이 구어적으로 부자연스럽고 대사 첫머리에서 반복됨', `A=${toJudgeA}, B=${toJudgeB}`)
  }

  const s0KeyA = `${partyA.id || 'a'}|d-1|S0|fact_pursuit`
  const s2KeyA = `${partyA.id || 'a'}|d-1|S2|motive_search`
  const s5KeyA = `${partyA.id || 'a'}|d-1|S5|empathy_approach`
  const s0KeyB = `${partyB.id || 'b'}|d-1|S0|fact_pursuit`
  const sampleA0 = pickFirstText(getEntryByKey(bundle, 'interrogation', s0KeyA))
  const sampleA2 = pickFirstText(getEntryByKey(bundle, 'interrogation', s2KeyA))
  const sampleA5 = pickFirstText(getEntryByKey(bundle, 'interrogation', s5KeyA))
  const sampleB0 = pickFirstText(getEntryByKey(bundle, 'interrogation', s0KeyB))

  for (const sample of [sampleA0, sampleA2, sampleA5, sampleB0].filter(Boolean)) {
    if (containsBadJudgeLead(sample)) {
      addIssue(issues['4-A'], 'FAIL', '4-A1', 'NPC 대사가 재판관을 향한 문장 첫머리를 "상대방"으로 시작함', sample)
      break
    }
  }

  for (const sample of [sampleA0, sampleA2, sampleA5, sampleB0].filter(Boolean)) {
    if (sample && hasAnyFormalViolation(sample)) {
      addIssue(issues['4-A'], 'FAIL', '4-A2', '재판관 대상 심문 응답에 합니다체가 아닌 문장 또는 해요체 흔적이 보임', sample)
      break
    }
  }

  if (sampleA0 && sampleA2 && sampleA5) {
    const earlyHasAmount = KOREAN_AMOUNT_RE.test(sampleA0)
    const lateHasAmount = KOREAN_AMOUNT_RE.test(sampleA5)
    if (earlyHasAmount && !lateHasAmount) {
      addIssue(issues['4-A'], 'FAIL', '4-A3', 'Truth Throttle 흐름이 뒤집혀 보임', `${sampleA0} / ${sampleA5}`)
    }
    if (normalizeText(sampleA0) === normalizeText(sampleA2) || normalizeText(sampleA2) === normalizeText(sampleA5)) {
      addIssue(issues['4-A'], 'WARN', '4-A8', 'LieState 단계가 달라도 핵심 답변이 거의 동일함', `${sampleA0} / ${sampleA2} / ${sampleA5}`)
    }
  }

  const interpRatio = uniqueRatio(interrogationEntries)
  if (interpRatio < 0.2) {
    addIssue(issues['4-G'], 'WARN', '4-G1', 'interrogation first-variant 고유 비율이 낮아 variant 체감 차이가 약함', `ratio=${interpRatio.toFixed(2)}`)
    addIssue(issues['4-F'], 'WARN', '4-F6', '심문 대사 반복 패턴이 과도함', `ratio=${interpRatio.toFixed(2)}`)
  }

  const interpSimilarity = topSimilarity(interrogationEntries.slice(0, 18))
  if (interpSimilarity >= 0.88) {
    addIssue(issues['4-G'], 'WARN', '4-G1', '여러 심문 key의 첫 variant가 거의 같은 문장 구조를 반복함', `similarity=${interpSimilarity.toFixed(2)}`)
  }

  const evidenceRatio = uniqueRatio(evidenceEntries)
  if (evidenceRatio < 0.3) {
    addIssue(issues['4-E'], 'WARN', '4-E1', '증거 반응이 증거별로 충분히 차별화되지 않음', `ratio=${evidenceRatio.toFixed(2)}`)
  }

  const dossierRatio = uniqueRatio(dossierEntries)
  if (dossierRatio < 0.3) {
    addIssue(issues['4-E'], 'WARN', '4-E2', 'DossierCard 반응이 질문별로 충분히 달라지지 않음', `ratio=${dossierRatio.toFixed(2)}`)
  }

  const witnessVague = getEntryByKey(bundle, 'witness', `${caseData.duo.socialGraph[0]?.id || 'tp-1'}|vague`)
  const witnessPartial = getEntryByKey(bundle, 'witness', `${caseData.duo.socialGraph[0]?.id || 'tp-1'}|partial`)
  const witnessFull = getEntryByKey(bundle, 'witness', `${caseData.duo.socialGraph[0]?.id || 'tp-1'}|full`)
  if (witnessVague && witnessPartial && witnessFull) {
    const vagueCount = sentenceCount(pickFirstText(witnessVague))
    const partialCount = sentenceCount(pickFirstText(witnessPartial))
    const fullCount = sentenceCount(pickFirstText(witnessFull))
    if (!(vagueCount <= 1 && partialCount >= 2 && partialCount <= 3 && fullCount >= 3)) {
      addIssue(issues['4-D'], 'WARN', '4-D1', '증인 depth별 문장 수 차이가 기준과 다를 수 있음', `${vagueCount}/${partialCount}/${fullCount}`)
    }
  }

  const aftermathSample = pickFirstText(aftermathEntries[0])
  if (!aftermathSample) {
    addIssue(issues['4-H'], 'FAIL', '4-H1', 'aftermath 텍스트가 비어 있음')
  } else if (TRANSLATION_RE.test(aftermathSample) || META_RE.test(aftermathSample)) {
    addIssue(issues['4-H'], 'WARN', '4-H2', 'aftermath 문체가 어색하거나 메타 표현이 섞임', aftermathSample)
  }

  const systemSample = pickFirstText(systemEntries[0])
  if (!systemSample) {
    addIssue(issues['4-C'], 'FAIL', '4-C1', 'system_message 텍스트가 비어 있음')
  } else if (META_RE.test(systemSample)) {
    addIssue(issues['4-C'], 'FAIL', '4-C2', 'system_message에 메타 표현이 보임', systemSample)
  }

  if (validator.status === 'FAIL' && (validator.summary.FAIL || validator.summary.CRITICAL || validator.summary.ERROR)) {
    const mappedA = validatorIssuesForCodes(validator.issues, ['A2', 'A4', 'A5', 'B1', 'B2', 'B4', 'H1', 'C4'])
    if (mappedA.length) {
      addIssue(issues['4-A'], 'FAIL', 'validator', 'validator가 NPC/호칭/TruthThrottle 관련 blocking issue를 감지함', mappedA[0])
    }
    const mappedD = validatorIssuesForCodes(validator.issues, ['ST1']).filter((line) => line.includes('witness'))
    if (mappedD.length) {
      addIssue(issues['4-D'], 'FAIL', 'validator', 'validator가 증인 문장 수 문제를 감지함', mappedD[0])
    }
    const mappedE = validatorIssuesForCodes(validator.issues, ['EV1'])
    if (mappedE.length) {
      addIssue(issues['4-E'], 'FAIL', 'validator', 'validator가 증거 반응 직접성 부족을 감지함', mappedE[0])
    }
    const mappedF = validatorIssuesForCodes(validator.issues, ['C1', 'C4', 'A2', 'A5'])
    if (mappedF.length) {
      addIssue(issues['4-F'], 'FAIL', 'validator', 'validator가 문체/어체 문제를 감지함', mappedF[0])
    }
    const mappedG = validatorIssuesForCodes(validator.issues, ['D2', 'V1'])
    if (mappedG.length) {
      addIssue(issues['4-G'], 'WARN', 'validator', 'validator가 variant 유사도/핵심 사실 충돌 가능성을 감지함', mappedG[0])
    }
    const mappedH = validatorIssuesForCodes(validator.issues, ['E1'])
    if (mappedH.length) {
      addIssue(issues['4-H'], 'FAIL', 'validator', 'validator가 메타 누출을 감지함', mappedH[0])
    }
  }

  const interrogationSamples = {
    a_s0_fact: sampleA0,
    a_s2_motive: sampleA2,
    a_s5_empathy: sampleA5,
    b_s0_fact: sampleB0,
  }
  const evidenceSample = pickFirstText(evidenceEntries[0])
  const dossierSample = pickFirstText(dossierEntries[0])
  const witnessSamples = {
    vague: pickFirstText(witnessVague),
    partial: pickFirstText(witnessPartial),
    full: pickFirstText(witnessFull),
  }

  return {
    categories: Object.fromEntries(
      Object.entries(issues).map(([key, value]) => [key, { status: statusFromIssues(value), issues: value }]),
    ),
    samples: {
      interrogation: interrogationSamples,
      evidence: evidenceSample,
      dossier: dossierSample,
      witness: witnessSamples,
      system: systemSample,
      aftermath: aftermathSample,
    },
    metrics: {
      interrogationUniqueRatio: Number(interpRatio.toFixed(2)),
      evidenceUniqueRatio: Number(evidenceRatio.toFixed(2)),
      dossierUniqueRatio: Number(dossierRatio.toFixed(2)),
      interrogationTopSimilarity: Number(interpSimilarity.toFixed(2)),
      callTerms: {
        a: toJudgeA,
        b: toJudgeB,
      },
    },
  }
}

function analyzeCase(caseId) {
  const caseData = loadJson(casePath(caseId))
  const bundle = loadJson(bundlePath(caseId))
  const dossierData = exists(dossierPath(caseId)) ? loadJson(dossierPath(caseId)) : { dossierCards: [] }
  const validator = runValidator(caseId)

  const phase1Exists = exists(path.join(ROOT, 'src', 'data', 'dialogues', 'phase1', `${caseId}.json`))
  const phase2Exists = exists(path.join(ROOT, 'src', 'data', 'dialogues', 'phase2', `${caseId}.json`))
  const runtimeTemplateLog = readIfExists(logPath(caseId, 'runtime-template'))
  const scriptedTemplateLog = readIfExists(logPath(caseId, 'scripted-template'))
  const semanticLog = readIfExists(logPath(caseId, 'semantic'))
  const stage3Log = readIfExists(logPath(caseId, 'stage3'))

  const initialStates = createInitialEvidenceStates(caseData.evidence || [])
  const surfaced = computeSurfacedEvidence(initialStates, caseData.evidence || [], null, caseData.baseEvidenceIds || [])
  const baseEvidenceIds = caseData.baseEvidenceIds || []
  let sequentialStates = { ...initialStates }
  const lieStatesByDispute = Object.fromEntries((caseData.disputes || []).map((dispute) => [dispute.id, 'S0']))
  const unlockByState = {}
  for (const state of ['S1', 'S2', 'S3', 'S4', 'S5']) {
    for (const disputeId of Object.keys(lieStatesByDispute)) lieStatesByDispute[disputeId] = state
    const before = new Set(Object.entries(sequentialStates).filter(([, value]) => value.unlocked).map(([id]) => id))
    const unlockedEvidence = (caseData.evidence || []).filter((item) => item.unlocked !== false)
    for (const item of unlockedEvidence) {
      if (sequentialStates[item.id]?.unlocked) sequentialStates = presentEvidence(sequentialStates, item.id)
    }
    const checked = checkUnlocks(sequentialStates, caseData.evidence || [], lieStatesByDispute)
    sequentialStates = checked.updated
    const after = Object.entries(sequentialStates).filter(([, value]) => value.unlocked).map(([id]) => id)
    unlockByState[state] = {
      newlyUnlocked: after.filter((id) => !before.has(id)),
      unlocked: after,
    }
    for (const item of caseData.evidence || []) {
      if (sequentialStates[item.id]?.unlocked) sequentialStates = presentEvidence(sequentialStates, item.id)
    }
  }
  const triggeredCombinations = checkCombinations(sequentialStates, caseData.evidenceCombinations || [])

  const primaryLie = [...(caseData.lieConfigA || []), ...(caseData.lieConfigB || [])][0] || null
  let lieSummary = null
  if (primaryLie) {
    let current = primaryLie.initialState || 'S0'
    const first = primaryLie.transitions?.[0]?.trigger || ''
    const second = primaryLie.transitions?.[1]?.trigger || ''
    const third = primaryLie.transitions?.[2]?.trigger || ''
    const fourth = primaryLie.transitions?.[3]?.trigger || ''
    const after1 = applyTransition(current, primaryLie, first)
    const afterRepeat = applyTransition(after1, primaryLie, first)
    const after2 = second ? applyTransition(afterRepeat, primaryLie, second) : afterRepeat
    const after3 = third ? applyTransition(after2, primaryLie, third) : after2
    const after4 = fourth ? applyTransition(after3, primaryLie, fourth, { trustTowardJudge: 75, retaliationWorry: 20 }) : after3
    lieSummary = {
      party: (caseData.lieConfigA || []).includes(primaryLie) ? 'a' : 'b',
      disputeId: primaryLie.disputeId,
      triggers: { first, second, third, fourth },
      states: {
        initial: current,
        after1,
        afterRepeat,
        after2,
        after3,
        after4,
      },
    }
  }

  const witnessStates = {
    s0: {},
    s2: {},
    s4: {},
  }
  const getLieStateFor = (snapshot) => (_party, disputeId) => snapshot[disputeId] || 'S0'
  const s0Map = Object.fromEntries((caseData.disputes || []).map((dispute) => [dispute.id, 'S0']))
  const s2Map = Object.fromEntries((caseData.disputes || []).map((dispute) => [dispute.id, 'S2']))
  const s4Map = Object.fromEntries((caseData.disputes || []).map((dispute) => [dispute.id, 'S4']))
  for (const witness of caseData.duo.socialGraph || []) {
    witnessStates.s0[witness.id] = determineWitnessDepth(witness, getLieStateFor(s0Map))
    witnessStates.s2[witness.id] = determineWitnessDepth(witness, getLieStateFor(s2Map))
    witnessStates.s4[witness.id] = determineWitnessDepth(witness, getLieStateFor(s4Map))
  }

  const level4 = analyzeLevel4(caseData, bundle, validator)

  const levelStatuses = {
    level1: parseLogPass(runtimeTemplateLog) && parseLogPass(scriptedTemplateLog) && parseLogPass(semanticLog) ? 'PASS' : 'WARN',
    level2: (baseEvidenceIds.length === Object.values(initialStates).filter((state) => state.unlocked).length) && triggeredCombinations.length === (caseData.evidenceCombinations || []).length ? 'PASS' : 'WARN',
    level3: lieSummary && lieSummary.states.after1 !== lieSummary.states.initial && lieSummary.states.afterRepeat === lieSummary.states.after1 ? 'PASS' : 'WARN',
    level4: Object.values(level4.categories).some((item) => item.status === 'FAIL')
      ? 'FAIL'
      : Object.values(level4.categories).some((item) => item.status === 'WARN')
        ? 'WARN'
        : 'PASS',
    level5: caseData.mediationOptions?.length || dossierData.mediationScripts?.length || caseData.solutions ? 'PASS' : 'WARN',
  }

  const witnessGateWorks = Object.values(witnessStates.s0).every((depth) => depth === 'vague')
    && Object.values(witnessStates.s4).every((depth) => depth === 'full')

  return {
    caseId,
    caseTitle: caseData.meta?.emotionalBait?.slice(0, 80) || caseData.caseId,
    relationshipType: caseData.meta?.relationshipType || caseData.duo?.relationshipType || '',
    parties: {
      a: caseData.duo.partyA.name,
      b: caseData.duo.partyB.name,
    },
    logs: {
      runtimeTemplate: parseLogPass(runtimeTemplateLog),
      scriptedTemplate: parseLogPass(scriptedTemplateLog),
      semantic: parseLogPass(semanticLog),
      semanticSummary: parseSummaryText(semanticLog),
      stage3: parseLogPass(stage3Log),
    },
    validator: {
      status: validator.status,
      summary: validator.summary,
      issues: validator.issues.slice(0, 10),
      unavailableReason: validator.unavailableReason || '',
    },
    phaseScripts: {
      phase1: phase1Exists,
      phase2: phase2Exists,
      fallbackExpected: !phase1Exists && !phase2Exists,
    },
    levelStatuses,
    level1: {
      phase0Data: {
        caseIdMatches: caseData.caseId === `case-${caseId}`,
        disputes: (caseData.disputes || []).length,
        evidence: (caseData.evidence || []).length,
        baseEvidenceIds,
      },
      viewer: {
        evidenceId: caseData.evidence?.[0]?.id || '',
        evidenceName: caseData.evidence?.[0]?.name || '',
        hasViewerData: Boolean(caseData.evidence?.[0]?.viewerData),
        hasMeta: Boolean(caseData.evidence?.[0]?.meta),
        investigationStages: caseData.evidence?.[0]?.investigationStages?.length || 0,
      },
      scripted: {
        coverage: channelKeyCoverage(bundle),
        sampleLog: `[Scripted] ${caseId}/a/d-1/S0 — 스크립트 응답 사용`,
      },
    },
    level2: {
      initialUnlocked: Object.entries(initialStates).filter(([, value]) => value.unlocked).map(([id]) => id),
      surfaced,
      unlockByState,
      comboTotal: (caseData.evidenceCombinations || []).length,
      comboTriggered: triggeredCombinations.length,
    },
    level3: {
      primary: lieSummary,
      witnessGateWorks,
      witnessStates,
    },
    level4,
    level5: {
      mediationPaths: caseData.mediationOptions?.length || 0,
      solutionGroups: Object.keys(caseData.solutions || {}).length,
      aftermathCount: (bundle.channels.aftermath.entries || []).length,
      systemMessageCount: (bundle.channels.system_message.entries || []).length,
    },
  }
}

function buildMarkdown(results) {
  const lines = []
  lines.push('# Thread-C Full Quality Test — 28 Cases')
  lines.push('')
  lines.push(`Generated: ${new Date().toISOString()}`)
  lines.push('')
  const level4FailCases = results.filter((item) => item.levelStatuses.level4 === 'FAIL').map((item) => item.caseId)
  const level4WarnCases = results.filter((item) => item.levelStatuses.level4 === 'WARN').map((item) => item.caseId)
  lines.push('## Summary')
  lines.push(`- Total: ${results.length}`)
  lines.push(`- Level 4 FAIL: ${level4FailCases.length}`)
  lines.push(`- Level 4 WARN: ${level4WarnCases.length}`)
  lines.push(`- Validator PASS: ${results.filter((item) => item.validator.status === 'PASS').length}/${results.length}`)
  lines.push(`- Validator unavailable: ${results.filter((item) => item.validator.status === 'UNAVAILABLE').length}/${results.length}`)
  lines.push('')
  if (level4FailCases.length) lines.push(`- Level 4 FAIL cases: ${level4FailCases.join(', ')}`)
  if (level4WarnCases.length) lines.push(`- Level 4 WARN cases: ${level4WarnCases.join(', ')}`)
  lines.push('')

  for (const item of results) {
    lines.push(`## ${item.caseId}`)
    lines.push('')
    lines.push(`- Level 1: ${item.levelStatuses.level1}`)
    lines.push(`- Level 2: ${item.levelStatuses.level2}`)
    lines.push(`- Level 3: ${item.levelStatuses.level3}`)
    lines.push(`- Level 4: ${item.levelStatuses.level4}`)
    lines.push(`- Level 5: ${item.levelStatuses.level5}`)
    lines.push(`- Validator: ${item.validator.status} ${JSON.stringify(item.validator.summary)}`)
    lines.push(`- CallTerms: A=${item.level4.metrics.callTerms.a}, B=${item.level4.metrics.callTerms.b}`)
    lines.push(`- Unique ratio: interrogation=${item.level4.metrics.interrogationUniqueRatio}, evidence=${item.level4.metrics.evidenceUniqueRatio}, dossier=${item.level4.metrics.dossierUniqueRatio}`)
    lines.push(`- 3-turn samples:`)
    lines.push(`  - A/S0: ${item.level4.samples.interrogation.a_s0_fact || '(none)'}`)
    lines.push(`  - A/S2: ${item.level4.samples.interrogation.a_s2_motive || '(none)'}`)
    lines.push(`  - A/S5: ${item.level4.samples.interrogation.a_s5_empathy || '(none)'}`)
    lines.push(`  - B/S0: ${item.level4.samples.interrogation.b_s0_fact || '(none)'}`)
    for (const category of ['4-A', '4-B', '4-C', '4-D', '4-E', '4-F', '4-G', '4-H']) {
      const block = item.level4.categories[category]
      lines.push(`- ${category}: ${block.status}`)
      for (const issue of block.issues.slice(0, 3)) {
        lines.push(`  - ${issue.code}: ${issue.detail}${issue.quote ? ` | ${issue.quote}` : ''}`)
      }
    }
    lines.push('')
  }

  return lines.join('\n')
}

function main() {
  const results = CASE_IDS.map(analyzeCase)
  const jsonPath = path.join(ROOT, 'tmp', 'threadC-full-quality-28-report.json')
  const mdPath = path.join(ROOT, 'tmp', 'threadC-full-quality-28-report.md')
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2))
  fs.writeFileSync(mdPath, buildMarkdown(results))
  console.log(`wrote ${jsonPath}`)
  console.log(`wrote ${mdPath}`)
}

main()
