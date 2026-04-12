#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')

const ROOT = path.join(__dirname, '..')
const CURRENT_106 = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'manifests', 'thread-a-current-106.json'), 'utf8')).cases
const LEGACY_15 = [
  'headline-01',
  'headline-02',
  'spouse-01',
  'spouse-02',
  'spouse-03',
  'spouse-04',
  'spouse-11',
  'spouse-12',
  'family-09',
  'friend-03',
  'neighbor-08',
  'partnership-09',
  'tenant-02',
  'tenant-09',
  'workplace-11',
]
const CASE_IDS = [...CURRENT_106, ...LEGACY_15]

const LIE_RANK = { S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5 }
const FORMAL_RE = /(니다|니까|십시오)$/u
const HAEYO_RE = /요(?=[.!?,"'\s]|$)/u

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

function countSentences(text) {
  return (String(text || '').match(/[^.!?]+[.!?]?/gu) || [])
    .map((part) => part.trim())
    .filter((part) => part.length >= 2)
    .length
}

function normalizeSkeleton(text) {
  return String(text || '')
    .replace(/[0-9]/g, '#')
    .replace(/[A-Za-z]+/g, 'A')
    .replace(/[가-힣]{2,}/g, 'K')
    .replace(/\s+/g, ' ')
    .trim()
}

function trigramSimilarity(a, b) {
  const toSet = (value) => {
    const normalized = normalizeSkeleton(value)
    const set = new Set()
    for (let i = 0; i <= normalized.length - 3; i += 1) {
      const tri = normalized.slice(i, i + 3)
      if (tri.trim().length === 3) set.add(tri)
    }
    return set
  }
  const aSet = toSet(a)
  const bSet = toSet(b)
  if (!aSet.size || !bSet.size) return 0
  let intersection = 0
  for (const value of aSet) if (bSet.has(value)) intersection += 1
  const union = new Set([...aSet, ...bSet]).size
  return union ? intersection / union : 0
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
    const reqMet = item.requires.every((reqId) => updated[reqId] && (updated[reqId].presented || updated[reqId].unlocked))
    if (!reqMet) continue
    if (item.requiredLieState) {
      const reqRank = LIE_RANK[item.requiredLieState] ?? 0
      const maxRank = Math.max(...(item.proves || []).map((disputeId) => LIE_RANK[lieStates[disputeId] || 'S0'] ?? 0), 0)
      if (maxRank < reqRank) continue
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
    const main = evidence.find((item) => item.id === surfacedId)
    if (!main?.proves) continue
    const linked = dimmedIds.filter((id) => {
      const candidate = evidence.find((item) => item.id === id)
      return candidate?.proves?.some((disputeId) => main.proves.includes(disputeId))
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
    const overlap = a.filter((chunk) => b.some((target) => target.includes(chunk) || chunk.includes(target))).length
    if (overlap >= 2) return true
  }
  return false
}

function nextState(current) {
  const order = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5']
  const index = order.indexOf(current)
  return index >= 0 && index < order.length - 1 ? order[index + 1] : current
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
  if (trigger === 'witness_testimony' && ['S0', 'S1', 'S2'].includes(currentState)) return nextState(currentState)
  return currentState
}

function determineWitnessDepth(witness, getLieState) {
  const disputeIds = witness.relatedDisputeIds || []
  if (!disputeIds.length) return 'full'
  let maxState = 0
  for (const disputeId of disputeIds) {
    maxState = Math.max(maxState, LIE_RANK[getLieState('a', disputeId) || 'S0'] || 0, LIE_RANK[getLieState('b', disputeId) || 'S0'] || 0)
  }
  if (witness.slot === 'institutional' && maxState >= LIE_RANK.S2) return 'full'
  if (maxState >= LIE_RANK.S4) return 'full'
  if (maxState >= LIE_RANK.S2) return 'partial'
  return 'vague'
}

function getEntry(bundle, channel, predicate) {
  return (bundle.channels[channel]?.entries || []).find(predicate) || null
}

function getEntryByKey(bundle, channel, key) {
  return getEntry(bundle, channel, (entry) => entry.key === key)
}

function pickText(entry, index = 0) {
  return entry?.variants?.[index]?.text || ''
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

function runValidator(caseId) {
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
  }
}

function hasFormalIssue(text) {
  const sentences = (String(text || '').match(/[^.!?]+[.!?]?/gu) || [])
    .map((part) => part.trim())
    .filter(Boolean)
  return sentences.some((sentence) => {
    const normalized = sentence.replace(/[\"'`()\[\]{}]/g, '').replace(/[.!?]+$/g, '').trim()
    if (!normalized) return false
    if (HAEYO_RE.test(normalized)) return true
    return !FORMAL_RE.test(normalized)
  })
}

function buildIssue(code, detail, quote = '') {
  return { code, detail, quote }
}

function categoryStatus(issues) {
  if (issues.some((issue) => issue.code.startsWith('FAIL:'))) return 'FAIL'
  if (issues.length) return 'WARN'
  return 'PASS'
}

function analyzeLevel4(caseId, caseData, bundle, globalMeta) {
  const categories = {
    '4-A': [],
    '4-B': [],
    '4-C': [],
    '4-D': [],
    '4-E': [],
    '4-F': [],
    '4-G': [],
    '4-H': [],
  }

  const aJudge = caseData.duo.partyA.callTerms?.toJudge || ''
  const bJudge = caseData.duo.partyB.callTerms?.toJudge || ''

  const s0A = pickText(getEntryByKey(bundle, 'interrogation', 'a|d-1|S0|fact_pursuit'))
  const s2A = pickText(getEntryByKey(bundle, 'interrogation', 'a|d-1|S2|motive_search'))
  const s5A = pickText(getEntryByKey(bundle, 'interrogation', 'a|d-1|S5|empathy_approach'))
  const s0B = pickText(getEntryByKey(bundle, 'interrogation', 'b|d-1|S0|fact_pursuit'))
  const evidenceSample = pickText(bundle.channels.evidence_present.entries[0])
  const dossierSample = pickText(bundle.channels.dossier.entries[0])
  const witnessFullEntry = getEntry(bundle, 'witness', (entry) => entry.key.endsWith('|full'))
  const witnessFull = pickText(witnessFullEntry)
  const witnessFullCount = countSentences(witnessFull)
  const aftermathSample = pickText(bundle.channels.aftermath.entries[0])
  const systemSample = pickText(bundle.channels.system_message.entries[0])

  if (aJudge === '상대방' || bJudge === '상대방') {
    categories['4-A'].push(buildIssue('FAIL:4-A1', 'callTerms.toJudge가 여전히 "상대방"임', `A=${aJudge}, B=${bJudge}`))
  } else if (/^해당/.test(aJudge) || /^해당/.test(bJudge)) {
    categories['4-A'].push(buildIssue('4-A1', 'callTerms.toJudge가 관계형 호칭이 아니라 generic role label로 생성됨', `A=${aJudge}, B=${bJudge}`))
  }

  for (const sample of [s0A, s2A, s5A, s0B].filter(Boolean)) {
    if (hasFormalIssue(sample)) {
      categories['4-A'].push(buildIssue('4-A2', '재판관 대상 심문 응답에 어체 불안정 가능성', sample))
      break
    }
  }

  const weirdPhraseRe = /(이었는|어느의|정말의|실제의|제도상의|누구의 순서|부분은 아직 사실관계가 확정되지 않았습니다)/u
  for (const sample of [s0A, s2A, s5A, s0B].filter(Boolean)) {
    if (weirdPhraseRe.test(sample)) {
      categories['4-F'].push(buildIssue('4-F5', '문장 골격은 고정된 채 분쟁명 조각이 끼워져 한국어가 어색함', sample))
      break
    }
  }

  if (normalizeSkeleton(s0A) === normalizeSkeleton(s2A) || normalizeSkeleton(s0A) === normalizeSkeleton(s5A)) {
    categories['4-A'].push(buildIssue('4-A8', 'LieState가 달라도 응답 골격이 거의 동일함', `${s0A} / ${s2A}`))
  }

  const firstVariantSet = new Set((bundle.channels.interrogation.entries || []).map((entry) => pickText(entry)))
  const firstVariantRatio = firstVariantSet.size / Math.max(1, (bundle.channels.interrogation.entries || []).length)
  if (firstVariantRatio < 0.25) {
    categories['4-G'].push(buildIssue('4-G1', '케이스 내부 first variant 반복 비율이 높음', `ratio=${firstVariantRatio.toFixed(2)}`))
  }

  const sampleVariants = (getEntryByKey(bundle, 'interrogation', 'a|d-1|S0|fact_pursuit')?.variants || []).map((variant) => variant.text)
  if (new Set(sampleVariants).size < 5) {
    categories['4-G'].push(buildIssue('FAIL:4-G1', '같은 key의 variant 5개가 모두 고유하지 않음'))
  }

  const similarityS0 = trigramSimilarity(s0A, s0B)
  if (similarityS0 >= 0.9) {
    categories['4-G'].push(buildIssue('4-G3', 'A/B 첫 응답의 골격이 지나치게 유사함', `${s0A} / ${s0B}`))
  }

  if (evidenceSample && globalMeta.skeletonMaps.evidence.has(normalizeSkeleton(evidenceSample)) && globalMeta.skeletonMaps.evidence.get(normalizeSkeleton(evidenceSample)).length > 1) {
    categories['4-E'].push(buildIssue('4-E1', '증거 반응이 증거명만 바뀐 동일 골격에 가까움', evidenceSample))
  }
  if (dossierSample && /그 질문은 아직 전제가 너무 앞서 있습니다/u.test(dossierSample)) {
    categories['4-E'].push(buildIssue('4-E2', 'DossierCard 반응이 질문별 정보보다 공통 방어문에 치우침', dossierSample))
  }

  if (witnessFullCount < 3 || witnessFullCount > 5) {
    categories['4-D'].push(buildIssue('FAIL:4-D1', 'witness full 문장 수가 3~5를 벗어남', `${witnessFullCount}문장 | ${witnessFull}`))
  }
  if (globalMeta.skeletonMaps.witness.has(normalizeSkeleton(witnessFull)) && globalMeta.skeletonMaps.witness.get(normalizeSkeleton(witnessFull)).length > 1) {
    categories['4-D'].push(buildIssue('4-D2', '증인 증언이 사건 고유 사실보다 공통 메타 서술에 가까움', witnessFull))
  }

  if (aftermathSample && globalMeta.skeletonMaps.aftermath.has(normalizeSkeleton(aftermathSample)) && globalMeta.skeletonMaps.aftermath.get(normalizeSkeleton(aftermathSample)).length > 1) {
    categories['4-H'].push(buildIssue('4-H2', 'aftermath가 사건 분위기보다 공통 결과 템플릿에 가까움', aftermathSample))
  }

  if (!systemSample) {
    categories['4-C'].push(buildIssue('FAIL:4-C1', 'system_message 샘플이 비어 있음'))
  }

  const samples = {
    interrogation: {
      a_s0: s0A,
      a_s2: s2A,
      a_s5: s5A,
      b_s0: s0B,
    },
    evidence: evidenceSample,
    dossier: dossierSample,
    witnessFull,
    system: systemSample,
    aftermath: aftermathSample,
  }

  return {
    statuses: Object.fromEntries(Object.entries(categories).map(([key, value]) => [key, categoryStatus(value)])),
    issues: categories,
    samples,
    metrics: {
      callTerms: { a: aJudge, b: bJudge },
      witnessFullSentences: witnessFullCount,
      interrogationFirstVariantRatio: Number(firstVariantRatio.toFixed(2)),
      normalizedPairSimilarity: Number(similarityS0.toFixed(2)),
    },
  }
}

function analyzeCase(caseId, globalMeta) {
  const caseData = loadJson(casePath(caseId))
  const bundle = loadJson(bundlePath(caseId))
  const validator = runValidator(caseId)
  const logs = {
    runtimeTemplate: /PASS/.test(readText(validationLogPath(caseId, 'runtime-template'))),
    scriptedTemplate: /PASS/.test(readText(validationLogPath(caseId, 'scripted-template'))),
    semantic: /PASS/.test(readText(validationLogPath(caseId, 'semantic'))),
    stage3: /PASS/.test(readText(validationLogPath(caseId, 'stage3'))),
  }

  const initialStates = createInitialEvidenceStates(caseData.evidence || [])
  const initialUnlocked = Object.entries(initialStates).filter(([, value]) => value.unlocked).map(([id]) => id)
  const surfaced = computeSurfacedEvidence(initialStates, caseData.evidence || [], null, caseData.baseEvidenceIds || [])

  let evidenceStates = { ...initialStates }
  const lieStates = Object.fromEntries((caseData.disputes || []).map((dispute) => [dispute.id, 'S0']))
  const unlockChain = {}
  for (const state of ['S1', 'S2', 'S3', 'S4', 'S5']) {
    for (const disputeId of Object.keys(lieStates)) lieStates[disputeId] = state
    evidenceStates = Object.keys(evidenceStates).reduce((acc, id) => presentEvidence(acc, id), evidenceStates)
    const { updated, newlyUnlocked } = checkUnlocks(evidenceStates, caseData.evidence || [], lieStates)
    evidenceStates = updated
    unlockChain[state] = newlyUnlocked
  }
  evidenceStates = Object.keys(evidenceStates).reduce((acc, id) => presentEvidence(acc, id), evidenceStates)
  const triggeredCombos = checkCombinations(evidenceStates, caseData.evidenceCombinations || [])

  const primaryLie = [...(caseData.lieConfigA || []).map((config) => ({ ...config, party: 'a' })), ...(caseData.lieConfigB || []).map((config) => ({ ...config, party: 'b' }))][0]
  let lieCheck = null
  if (primaryLie) {
    const first = primaryLie.transitions?.[0]?.trigger || ''
    const second = primaryLie.transitions?.[1]?.trigger || ''
    const third = primaryLie.transitions?.[2]?.trigger || ''
    const fourth = primaryLie.transitions?.[3]?.trigger || ''
    const after1 = applyTransition(primaryLie.initialState, primaryLie, first)
    const afterRepeat = applyTransition(after1, primaryLie, first)
    const after2 = second ? applyTransition(afterRepeat, primaryLie, second) : afterRepeat
    const after3 = third ? applyTransition(after2, primaryLie, third) : after2
    const after4 = fourth ? applyTransition(after3, primaryLie, fourth, { trustTowardJudge: 75, retaliationWorry: 20 }) : after3
    lieCheck = {
      party: primaryLie.party,
      disputeId: primaryLie.disputeId,
      triggers: { first, second, third, fourth },
      states: { initial: primaryLie.initialState, after1, afterRepeat, after2, after3, after4 },
    }
  }

  const witnessStateMaps = {
    s0: Object.fromEntries((caseData.disputes || []).map((dispute) => [dispute.id, 'S0'])),
    s2: Object.fromEntries((caseData.disputes || []).map((dispute) => [dispute.id, 'S2'])),
    s4: Object.fromEntries((caseData.disputes || []).map((dispute) => [dispute.id, 'S4'])),
  }
  const witnessSummary = (caseData.duo.socialGraph || []).map((witness) => ({
    id: witness.id,
    slot: witness.slot,
    s0: determineWitnessDepth(witness, (_party, disputeId) => witnessStateMaps.s0[disputeId]),
    s2: determineWitnessDepth(witness, (_party, disputeId) => witnessStateMaps.s2[disputeId]),
    s4: determineWitnessDepth(witness, (_party, disputeId) => witnessStateMaps.s4[disputeId]),
  }))

  const level4 = analyzeLevel4(caseId, caseData, bundle, globalMeta)
  const level4Overall = Object.values(level4.statuses).includes('FAIL')
    ? 'FAIL'
    : Object.values(level4.statuses).includes('WARN')
      ? 'WARN'
      : 'PASS'

  const levelStatuses = {
    level1: logs.runtimeTemplate && logs.scriptedTemplate && logs.semantic && logs.stage3 ? 'PASS' : 'WARN',
    level2: initialUnlocked.length === (caseData.baseEvidenceIds || []).length && triggeredCombos.length === (caseData.evidenceCombinations || []).length ? 'PASS' : 'WARN',
    level3: lieCheck && lieCheck.states.after1 !== lieCheck.states.initial && lieCheck.states.afterRepeat === lieCheck.states.after1 ? 'PASS' : 'WARN',
    level4: level4Overall,
    level5: 'PASS',
  }

  return {
    caseId,
    relationshipType: caseData.meta.relationshipType,
    title: caseData.meta.emotionalBait,
    levelStatuses,
    validator,
    logs,
    level1: {
      caseIdMatches: caseData.caseId === `case-${caseId}`,
      disputes: (caseData.disputes || []).length,
      evidence: (caseData.evidence || []).length,
      baseEvidenceIds: caseData.baseEvidenceIds || [],
      viewer: {
        evidenceId: caseData.evidence?.[0]?.id || '',
        hasViewerData: Boolean(caseData.evidence?.[0]?.viewerData),
        hasMeta: Boolean(caseData.evidence?.[0]?.meta),
        investigationStages: caseData.evidence?.[0]?.investigationStages?.length || 0,
      },
      scriptedChannels: Object.fromEntries(
        Object.entries(bundle.channels).map(([channel, payload]) => [channel, payload.entries.length]),
      ),
    },
    level2: {
      initialUnlocked,
      surfaced,
      unlockChain,
      comboTotal: (caseData.evidenceCombinations || []).length,
      comboTriggered: triggeredCombos.length,
    },
    level3: {
      lieCheck,
      witnessSummary,
    },
    level4,
    level5: {
      mediationOptions: caseData.mediationOptions?.length || 0,
      solutionGroups: Object.keys(caseData.solutions || {}).length,
      stageMapMissing: ['headline', 'friend'].includes(caseData.meta.relationshipType),
    },
  }
}

function computeGlobalMeta() {
  const skeletonMaps = {
    s0: new Map(),
    evidence: new Map(),
    witness: new Map(),
    aftermath: new Map(),
  }

  const add = (map, text, caseId) => {
    const key = normalizeSkeleton(text)
    map.set(key, [...(map.get(key) || []), caseId])
  }

  for (const caseId of CASE_IDS) {
    const bundle = loadJson(bundlePath(caseId))
    add(skeletonMaps.s0, pickText(getEntryByKey(bundle, 'interrogation', 'a|d-1|S0|fact_pursuit')), caseId)
    add(skeletonMaps.evidence, pickText(bundle.channels.evidence_present.entries[0]), caseId)
    add(skeletonMaps.witness, pickText(getEntry(bundle, 'witness', (entry) => entry.key.endsWith('|full'))), caseId)
    add(skeletonMaps.aftermath, pickText(bundle.channels.aftermath.entries[0]), caseId)
  }

  return { skeletonMaps }
}

function buildSummary(results) {
  const summary = {
    total: results.length,
    levels: {},
    level4Categories: {},
    validator: { PASS: 0, FAIL: 0 },
    regressionChecks: {
      callTermsNoCounterparty: results.filter((result) => result.level4.metrics.callTerms.a !== '상대방' && result.level4.metrics.callTerms.b !== '상대방').length,
      genericToJudge: results.filter((result) => /^해당/.test(result.level4.metrics.callTerms.a) || /^해당/.test(result.level4.metrics.callTerms.b)).length,
      rawS0Unique: new Set(results.map((result) => result.level4.samples.interrogation.a_s0)).size,
      normalizedS0Groups: new Set(results.map((result) => normalizeSkeleton(result.level4.samples.interrogation.a_s0))).size,
      witnessFullSentencePass: results.filter((result) => result.level4.metrics.witnessFullSentences >= 3 && result.level4.metrics.witnessFullSentences <= 5).length,
      rawAftermathUnique: new Set(results.map((result) => result.level4.samples.aftermath)).size,
      normalizedAftermathGroups: new Set(results.map((result) => normalizeSkeleton(result.level4.samples.aftermath))).size,
    },
    stageMapMissingCases: results.filter((result) => result.level5.stageMapMissing).map((result) => result.caseId),
  }

  for (const level of ['level1', 'level2', 'level3', 'level4', 'level5']) {
    summary.levels[level] = {}
    for (const result of results) {
      const status = result.levelStatuses[level]
      summary.levels[level][status] = (summary.levels[level][status] || 0) + 1
    }
  }

  for (const category of ['4-A', '4-B', '4-C', '4-D', '4-E', '4-F', '4-G', '4-H']) {
    summary.level4Categories[category] = {}
    for (const result of results) {
      const status = result.level4.statuses[category]
      summary.level4Categories[category][status] = (summary.level4Categories[category][status] || 0) + 1
    }
  }

  for (const result of results) {
    summary.validator[result.validator.status] = (summary.validator[result.validator.status] || 0) + 1
  }

  const previousPath = path.join(ROOT, 'tmp', 'threadC-full-quality-100-report.json')
  if (fs.existsSync(previousPath)) {
    const previous = JSON.parse(fs.readFileSync(previousPath, 'utf8')).summary
    summary.previous100Comparison = {
      level4Categories: {},
      regressionChecks: {
        previousGenericToJudge: previous.regressionChecks.genericToJudge,
        previousNormalizedS0Groups: previous.regressionChecks.normalizedS0Groups,
        previousWitnessFullSentencePass: previous.regressionChecks.witnessFullSentencePass,
        previousNormalizedAftermathGroups: previous.regressionChecks.normalizedAftermathGroups,
      },
    }
    for (const category of Object.keys(summary.level4Categories)) {
      summary.previous100Comparison.level4Categories[category] = {
        previous: previous.level4Categories[category] || {},
        current121: summary.level4Categories[category],
      }
    }
  }

  return summary
}

function buildMarkdown(results, summary) {
  const lines = []
  lines.push('# Thread-C Full Quality Test — 121 Cases')
  lines.push('')
  lines.push(`Generated: ${new Date().toISOString()}`)
  lines.push('')
  lines.push('## Summary')
  lines.push(`- Total: ${summary.total}`)
  lines.push(`- Level 1: ${JSON.stringify(summary.levels.level1)}`)
  lines.push(`- Level 2: ${JSON.stringify(summary.levels.level2)}`)
  lines.push(`- Level 3: ${JSON.stringify(summary.levels.level3)}`)
  lines.push(`- Level 4: ${JSON.stringify(summary.levels.level4)}`)
  lines.push(`- Level 5: ${JSON.stringify(summary.levels.level5)}`)
  lines.push(`- Validator: ${JSON.stringify(summary.validator)}`)
  lines.push(`- Regression 4-A1: literal '상대방' 제거 ${summary.regressionChecks.callTermsNoCounterparty}/${summary.total}, generic '해당...' 잔존 ${summary.regressionChecks.genericToJudge}/${summary.total}`)
  lines.push(`- Regression 4-G1: raw S0 unique ${summary.regressionChecks.rawS0Unique}/${summary.total}, normalized scaffold groups ${summary.regressionChecks.normalizedS0Groups}`)
  lines.push(`- Regression 4-D1: witness full sentence-count pass ${summary.regressionChecks.witnessFullSentencePass}/${summary.total}`)
  lines.push(`- Regression 4-H1: raw aftermath unique ${summary.regressionChecks.rawAftermathUnique}/${summary.total}, normalized scaffold groups ${summary.regressionChecks.normalizedAftermathGroups}`)
  lines.push(`- StageMap missing cases: ${summary.stageMapMissingCases.length}`)
  if (summary.previous100Comparison) {
    lines.push(`- Previous100 comparison: generic toJudge ${summary.previous100Comparison.regressionChecks.previousGenericToJudge} -> ${summary.regressionChecks.genericToJudge}, normalized S0 groups ${summary.previous100Comparison.regressionChecks.previousNormalizedS0Groups} -> ${summary.regressionChecks.normalizedS0Groups}, witness sentence-count pass ${summary.previous100Comparison.regressionChecks.previousWitnessFullSentencePass} -> ${summary.regressionChecks.witnessFullSentencePass}, normalized aftermath groups ${summary.previous100Comparison.regressionChecks.previousNormalizedAftermathGroups} -> ${summary.regressionChecks.normalizedAftermathGroups}`)
  }
  lines.push('')

  for (const result of results) {
    lines.push(`## ${result.caseId}`)
    lines.push(`- Level 1: ${result.levelStatuses.level1}`)
    lines.push(`- Level 2: ${result.levelStatuses.level2}`)
    lines.push(`- Level 3: ${result.levelStatuses.level3}`)
    lines.push(`- Level 4: ${result.levelStatuses.level4}`)
    lines.push(`- Level 5: ${result.levelStatuses.level5}`)
    lines.push(`- Validator: ${result.validator.status} ${JSON.stringify(result.validator.summary)}`)
    for (const category of ['4-A', '4-B', '4-C', '4-D', '4-E', '4-F', '4-G', '4-H']) {
      lines.push(`- ${category}: ${result.level4.statuses[category]}`)
      for (const issue of result.level4.issues[category].slice(0, 2)) {
        lines.push(`  - ${issue.code.replace(/^FAIL:/, '')}: ${issue.detail}${issue.quote ? ` | ${issue.quote}` : ''}`)
      }
    }
    lines.push(`- Samples:`)
    lines.push(`  - A/S0: ${result.level4.samples.interrogation.a_s0}`)
    lines.push(`  - Witness full: ${result.level4.samples.witnessFull}`)
    lines.push(`  - Aftermath: ${result.level4.samples.aftermath}`)
    lines.push('')
  }

  return lines.join('\n')
}

function buildBatchMarkdown(results, batchIndex) {
  const lines = [`# Thread-C Full Quality Test — 121 Cases Batch ${batchIndex}`, '']
  for (const result of results) {
    lines.push(`## ${result.caseId}`)
    lines.push(`- Level 1: ${result.levelStatuses.level1}`)
    lines.push(`- Level 2: ${result.levelStatuses.level2}`)
    lines.push(`- Level 3: ${result.levelStatuses.level3}`)
    lines.push(`- Level 4: ${result.levelStatuses.level4}`)
    lines.push(`- Level 5: ${result.levelStatuses.level5}`)
    lines.push(`- 4-A: ${result.level4.statuses['4-A']} | ${result.level4.issues['4-A'][0]?.detail || ''}`)
    lines.push(`- 4-D: ${result.level4.statuses['4-D']} | ${result.level4.issues['4-D'][0]?.detail || ''}`)
    lines.push(`- 4-E: ${result.level4.statuses['4-E']} | ${result.level4.issues['4-E'][0]?.detail || ''}`)
    lines.push(`- 4-F: ${result.level4.statuses['4-F']} | ${result.level4.issues['4-F'][0]?.detail || ''}`)
    lines.push(`- 4-G: ${result.level4.statuses['4-G']} | ${result.level4.issues['4-G'][0]?.detail || ''}`)
    lines.push(`- 4-H: ${result.level4.statuses['4-H']} | ${result.level4.issues['4-H'][0]?.detail || ''}`)
    lines.push('')
  }
  return lines.join('\n')
}

function main() {
  const globalMeta = computeGlobalMeta()
  const results = CASE_IDS.map((caseId) => analyzeCase(caseId, globalMeta))
  const summary = buildSummary(results)

  const jsonPath = path.join(ROOT, 'tmp', 'threadC-full-quality-121-report.json')
  const mdPath = path.join(ROOT, 'tmp', 'threadC-full-quality-121-report.md')
  fs.writeFileSync(jsonPath, JSON.stringify({ summary, results }, null, 2))
  fs.writeFileSync(mdPath, buildMarkdown(results, summary))

  for (let index = 0; index < Math.ceil(results.length / 20); index += 1) {
    const batch = results.slice(index * 20, (index + 1) * 20)
    const batchPath = path.join(ROOT, 'tmp', `threadC-full-quality-121-batch-${index + 1}.md`)
    fs.writeFileSync(batchPath, buildBatchMarkdown(batch, index + 1))
  }

  console.log(`wrote ${jsonPath}`)
  console.log(`wrote ${mdPath}`)
}

main()
