const fs = require('fs')
const path = require('path')
const util = require('util')
const createJiti = require('jiti')

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return
  const content = fs.readFileSync(filePath, 'utf8')
  for (const line of content.split(/\r?\n/)) {
    if (!line || /^\s*#/.test(line)) continue
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/)
    if (!match) continue
    const key = match[1]
    let value = match[2]
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    if (process.env[key] === undefined) process.env[key] = value
  }
}

loadEnvFile(path.join(__dirname, '..', '.env'))
loadEnvFile(path.join(__dirname, '..', '.env.local'))

function createStorage() {
  const store = new Map()
  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null
    },
    setItem(key, value) {
      store.set(key, String(value))
    },
    removeItem(key) {
      store.delete(key)
    },
    clear() {
      store.clear()
    },
  }
}

if (!globalThis.sessionStorage) globalThis.sessionStorage = createStorage()
if (!globalThis.localStorage) globalThis.localStorage = createStorage()
if (!globalThis.document) {
  globalThis.document = {
    addEventListener() {},
    removeEventListener() {},
    body: {},
  }
}
if (!globalThis.window) {
  class SilentAudioContext {
    createBuffer() { return {} }
    createBufferSource() { return { connect() {}, start() {}, buffer: null } }
    createOscillator() { return { connect() {}, start() {}, stop() {}, type: 'sine', frequency: { value: 0 } } }
    createGain() { return { connect() {}, gain: { value: 0, exponentialRampToValueAtTime() {} } } }
    get destination() { return {} }
    get currentTime() { return 0 }
    resume() { return Promise.resolve() }
  }
  globalThis.window = {
    addEventListener() {},
    removeEventListener() {},
    AudioContext: SilentAudioContext,
    webkitAudioContext: SilentAudioContext,
    open() {},
  }
}
if (!globalThis.navigator) {
  globalThis.navigator = { userAgent: 'node' }
}
if (!globalThis.Audio) {
  globalThis.Audio = class {
    constructor() {
      this.volume = 0
      this.currentTime = 0
      this.loop = false
      this.paused = true
    }
    play() {
      this.paused = false
      return Promise.resolve()
    }
    pause() {
      this.paused = true
    }
  }
}

const ROOT = path.join(__dirname, '..')
const TRANSCRIPT_DIR = path.join(__dirname, 'transcripts')
const QUICK_REPORT = path.join(__dirname, '84-llm-quality-report-v3-quick.md')
const FULL_REPORT = path.join(__dirname, '84-llm-quality-report-v3.md')
const jiti = createJiti(__filename)

const { useGameStore } = jiti(path.join(ROOT, 'src/store/useGameStore.ts'))
const { resolveLLMDialogue } = jiti(path.join(ROOT, 'src/engine/llmDialogueResolver.ts'))
const { GamePhase } = jiti(path.join(ROOT, 'src/types/index.ts'))

const TURN_DELAY_MS = 1500
const CASE_DELAY_MS = 3000

const QUICK_CASES = [
  'family-01',
  'spouse-01',
  'spouse-04',
  'spouse-12',
  'tenant-11',
  'partnership-04',
  'workplace-06',
  'friend-01',
  'neighbor-10',
  'neighbor-12',
  'workplace-04',
  'workplace-05',
  'workplace-08',
  'family-05',
  'partnership-06',
  'family-02',
  'friend-06',
  'friend-03',
  'neighbor-01',
]

const FULL_MAIN_CASES = [
  'workplace-07',
  'family-08',
  'spouse-04',
  'family-01',
  'family-05',
  'neighbor-10',
  'neighbor-12',
  'partnership-05',
  'partnership-06',
  'workplace-04',
  'workplace-05',
  'workplace-06',
  'family-03',
  'family-04',
  'family-06',
  'family-09',
  'family-10',
  'family-12',
  'friend-01',
  'friend-04',
  'neighbor-06',
  'partnership-04',
  'partnership-08',
  'partnership-10',
  'partnership-11',
  'spouse-01',
  'spouse-03',
  'spouse-08',
  'tenant-01',
  'tenant-03',
  'tenant-04',
  'tenant-05',
  'tenant-06',
  'tenant-07',
  'tenant-08',
  'tenant-09',
  'tenant-10',
  'tenant-11',
  'tenant-12',
  'workplace-02',
  'workplace-08',
  'friend-08',
  'spouse-06',
  'spouse-12',
  'workplace-03',
]

const SENTINEL_CASES = ['friend-06', 'friend-03', 'neighbor-01', 'family-02']

const MONETARY_RE = /송금|이체|금액|원\b|돈|비용|계좌|환급|보증금|월세|정산|예치|납부|수당|급여|계약금|위약금|배상금|합의금|채무|대출|융자|임대료|임대인|임차인/
const KOREAN_AMOUNT_RE = /(?<![가-힣A-Za-z0-9])(?:\d[\d,.]*\s*(?:천|백|십)?만?\s*원|[일이삼사오육칠팔구십백천]+(?:\s*(?:천|백|십|만))?\s*원)(?![가-힣A-Za-z0-9])/u
const NON_MONETARY_POLLUTION_RE = /송금|이체|계좌|환급|보증금|월세|정산|예치|납부|수당|급여|계약금|위약금|배상금|합의금|채무|대출|융자|임대료|임대인|임차인|채권자|채무자|금전적|재정적|경제적/
const HAEYO_RE = /(했어요|없어요|있어요|같아요|해요|에요|이에요|거예요|줄게요|할게요|겠어요|왔어요|됐어요|봤어요|났어요|갔어요|줬어요|셨어요|드려요|알아요|몰라요)(?=[,.!?]|\s|$)/
const CLICHE_RE = /미리\s?말씀(?:을\s)?드리지\s?못|미리\s?말씀드리지\s?못|미리\s?말씀/
const SPECIFIC_X_RE = /특정\s+(금액|사람|것|일|경우|상황|장소|시점|사건|인물)/
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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function getArgs() {
  const args = process.argv.slice(2)
  const options = { stage: 'quick', autoFull: false, caseId: null }
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i]
    if (arg === '--stage' && args[i + 1]) options.stage = args[++i]
    if (arg === '--case' && args[i + 1]) options.caseId = args[++i]
    if (arg === '--auto-full') options.autoFull = true
  }
  return options
}

function isMonetaryCase(caseData) {
  return (caseData.disputes || []).some((dispute) =>
    KOREAN_AMOUNT_RE.test([dispute.name, dispute.anchorTruth, dispute.truthDescription].filter(Boolean).join(' ')) ||
    MONETARY_RE.test(dispute.name || '') ||
    MONETARY_RE.test(dispute.anchorTruth || '') ||
    MONETARY_RE.test(dispute.truthDescription || ''),
  )
}

function getDispute(caseData, disputeId) {
  return (caseData.disputes || []).find((dispute) => dispute.id === disputeId) || null
}

function isMonetaryDispute(caseData, disputeId) {
  const dispute = getDispute(caseData, disputeId)
  if (!dispute) return false
  return (
    KOREAN_AMOUNT_RE.test([dispute.name, dispute.anchorTruth, dispute.truthDescription].filter(Boolean).join(' ')) ||
    MONETARY_RE.test(dispute.name || '') ||
    MONETARY_RE.test(dispute.anchorTruth || '') ||
    MONETARY_RE.test(dispute.truthDescription || '')
  )
}

function requiresConcreteAmount(caseData, disputeId) {
  const dispute = getDispute(caseData, disputeId)
  if (!dispute) return false
  const haystack = [dispute.name, dispute.anchorTruth, dispute.truthDescription].filter(Boolean).join(' ')
  return KOREAN_AMOUNT_RE.test(haystack)
}

function getCasePath(caseId) {
  return path.join(ROOT, 'src', 'data', 'cases', 'generated', `${caseId}.json`)
}

function loadCaseData(caseId) {
  const casePath = getCasePath(caseId)
  if (!fs.existsSync(casePath)) {
    throw new Error(`missing case JSON: ${caseId}`)
  }
  return JSON.parse(fs.readFileSync(casePath, 'utf8'))
}

function collectForbiddenNames(caseData, target) {
  const names = []
  const opponentName = target === 'a' ? caseData.duo.partyB.name : caseData.duo.partyA.name
  if (opponentName) names.push(opponentName)
  for (const person of caseData.duo.socialGraph || []) {
    if (person?.name) names.push(person.name)
  }
  return [...new Set(names.filter((name) => typeof name === 'string' && name.length >= 2))]
}

function ensureLieStateEntry(party, disputeId, desiredState) {
  const snapshot = useGameStore.getState()
  const agentKey = party === 'a' ? 'agentA' : 'agentB'
  const configList = party === 'a' ? snapshot.lieConfigsA : snapshot.lieConfigsB
  const existing = snapshot[agentKey]?.lieStateMap?.[disputeId]
  if (existing) return

  const config = (configList || []).find((entry) => entry.disputeId === disputeId)
  const seededEntry = config
    ? {
        disputeId,
        lieType: config.lieType,
        lieIntensity: config.lieIntensity,
        lieMotive: config.lieMotive,
        collapseViaTrust: config.collapseViaTrust,
        currentState: desiredState,
      }
    : {
        disputeId,
        lieType: 'LT-1',
        lieIntensity: 'L1',
        lieMotive: 'self_protection',
        collapseViaTrust: false,
        currentState: desiredState,
      }

  useGameStore.setState({
    [agentKey]: {
      ...snapshot[agentKey],
      lieStateMap: {
        ...snapshot[agentKey].lieStateMap,
        [disputeId]: seededEntry,
      },
    },
  })
}

function countSentences(text) {
  return text
    .split(/[.!?。]\s*|\n+/)
    .map((part) => part.trim())
    .filter((part) => part.length >= 4)
    .length
}

function inferPath(logs) {
  if (logs.some((entry) => entry.text.includes('[Blueprint V2]'))) return 'blueprint-v2'
  if (logs.some((entry) => entry.text.includes('[Blueprint]'))) return 'blueprint'
  if (logs.some((entry) => entry.text.includes('[LLM Prompt Debug]'))) return 'parse-path'
  return 'unknown'
}

function detectLlmFallback(logs) {
  return logs.some((entry) =>
    entry.text.includes('[Blueprint Fallback]') ||
    entry.text.includes('[LLM API]') ||
    entry.text.includes('Unauthorized') ||
    entry.text.includes('LLM 호출 실패'),
  )
}

function captureLogs(fn) {
  const entries = []
  const original = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    group: console.group,
    groupEnd: console.groupEnd,
  }

  const sink = (level) => (...args) => {
    const text = args.map((arg) => {
      if (typeof arg === 'string') return arg
      if (arg instanceof Error) return arg.stack || `${arg.name}: ${arg.message}`
      try { return JSON.stringify(arg) } catch { return util.inspect(arg, { depth: 4, breakLength: 160 }) }
    }).join(' ')
    entries.push({ level, text })
  }

  console.log = sink('log')
  console.warn = sink('warn')
  console.error = sink('error')
  console.group = sink('group')
  console.groupEnd = sink('groupEnd')

  return Promise.resolve()
    .then(fn)
    .then((result) => ({ result, logs: entries }))
    .finally(() => {
      console.log = original.log
      console.warn = original.warn
      console.error = original.error
      console.group = original.group
      console.groupEnd = original.groupEnd
    })
}

function generateScenario(caseData) {
  const disputes = caseData.disputes || []
  const evidence = caseData.evidence || []
  const d1 = disputes[0]?.id || 'd-1'
  const d2 = disputes[1]?.id || d1
  const dLast = disputes[disputes.length - 1]?.id || d1

  const turns = [
    { label: 'a-d1-s1-fact', target: 'a', disputeId: d1, state: 'S1', type: 'question', questionType: 'fact_pursuit' },
    { label: 'a-d1-s1-motive', target: 'a', disputeId: d1, state: 'S1', type: 'question', questionType: 'motive_search' },
    { label: 'a-d1-s1-empathy', target: 'a', disputeId: d1, state: 'S1', type: 'question', questionType: 'empathy_approach' },
    { label: 'b-d2-s1-fact', target: 'b', disputeId: d2, state: 'S1', type: 'question', questionType: 'fact_pursuit' },
  ]

  if (evidence[0]) turns.push({ label: 'a-d1-s1-evidence', target: 'a', disputeId: d1, state: 'S1', type: 'evidence_present', evidenceId: evidence[0].id })
  else turns.push({ label: 'b-d2-s1-motive', target: 'b', disputeId: d2, state: 'S1', type: 'question', questionType: 'motive_search' })

  if (evidence[1]) turns.push({ label: 'b-d2-s1-evidence', target: 'b', disputeId: d2, state: 'S1', type: 'evidence_present', evidenceId: evidence[1].id })
  else turns.push({ label: 'b-d2-s1-motive-2', target: 'b', disputeId: d2, state: 'S1', type: 'question', questionType: 'motive_search' })

  turns.push(
    { label: 'a-d1-s2-fact', target: 'a', disputeId: d1, state: 'S2', type: 'question', questionType: 'fact_pursuit' },
    { label: 'a-d1-s2-motive', target: 'a', disputeId: d1, state: 'S2', type: 'question', questionType: 'motive_search' },
    { label: 'b-d2-s2-fact', target: 'b', disputeId: d2, state: 'S2', type: 'question', questionType: 'fact_pursuit' },
    { label: 'b-d2-s2-empathy', target: 'b', disputeId: d2, state: 'S2', type: 'question', questionType: 'empathy_approach' },
  )

  if (evidence[2]) turns.push({ label: 'a-d1-s2-evidence', target: 'a', disputeId: d1, state: 'S2', type: 'evidence_present', evidenceId: evidence[2].id })
  else turns.push({ label: 'a-d1-s2-empathy', target: 'a', disputeId: d1, state: 'S2', type: 'question', questionType: 'empathy_approach' })

  turns.push(
    { label: 'a-d1-s3-fact', target: 'a', disputeId: d1, state: 'S3', type: 'question', questionType: 'fact_pursuit' },
    { label: 'a-d1-s3-motive', target: 'a', disputeId: d1, state: 'S3', type: 'question', questionType: 'motive_search' },
    { label: 'b-d2-s3-fact', target: 'b', disputeId: d2, state: 'S3', type: 'question', questionType: 'fact_pursuit' },
  )

  if (disputes.length > 2) {
    turns.push({ label: 'b-d3-s1-fact', target: 'b', disputeId: disputes[2].id, state: 'S1', type: 'question', questionType: 'fact_pursuit' })
  } else {
    turns.push({ label: 'a-d1-s3-empathy', target: 'a', disputeId: d1, state: 'S3', type: 'question', questionType: 'empathy_approach' })
  }

  turns.push(
    { label: 'a-d1-s4-empathy', target: 'a', disputeId: d1, state: 'S4', type: 'question', questionType: 'empathy_approach' },
    { label: 'a-d1-s5-fact', target: 'a', disputeId: d1, state: 'S5', type: 'question', questionType: 'fact_pursuit' },
    { label: 'b-d2-s5-empathy', target: 'b', disputeId: d2, state: 'S5', type: 'question', questionType: 'empathy_approach' },
    { label: 'a-last-s1-fact', target: 'a', disputeId: dLast, state: 'S1', type: 'question', questionType: 'fact_pursuit' },
    { label: 'b-last-s1-fact', target: 'b', disputeId: dLast, state: 'S1', type: 'question', questionType: 'fact_pursuit' },
  )

  return turns
}

function issue(severity, code, detail, turn, response) {
  return { severity, code, detail, turn, response }
}

function validateTurn(turnRecord, caseData, runCtx) {
  const issues = []
  const text = turnRecord.npcResponse || ''
  const isMonetary = isMonetaryDispute(caseData, turnRecord.disputeId)
  const needsConcreteAmount = requiresConcreteAmount(caseData, turnRecord.disputeId)

  if (!isMonetary) {
    if (KOREAN_AMOUNT_RE.test(text) || NON_MONETARY_POLLUTION_RE.test(text)) {
      issues.push(issue('CRITICAL', 'A1', '비금전 사건 금전 오염', turnRecord.turn, text))
    }
  }

  if (TRANSLATION_PATTERNS.some((pattern) => pattern.test(text))) {
    issues.push(issue('FAIL', 'A2', '번역체/공문체 잔존', turnRecord.turn, text))
  }

  if (CLICHE_RE.test(text)) {
    issues.push(issue('WARN', 'A4', '클리셰: 미리 말씀', turnRecord.turn, text))
  }

  if (SPECIFIC_X_RE.test(text)) {
    issues.push(issue('FAIL', 'A5', '특정X 패턴', turnRecord.turn, text))
  }

  if (['S0', 'S1'].includes(turnRecord.state) && needsConcreteAmount && KOREAN_AMOUNT_RE.test(text)) {
    issues.push(issue('CRITICAL', 'B1', 'S0-S1 금액 조기 노출', turnRecord.turn, text))
  }

  if (['S0', 'S1'].includes(turnRecord.state)) {
    const forbiddenNames = collectForbiddenNames(caseData, turnRecord.target)
    const leaked = forbiddenNames.filter((name) => new RegExp(escapeRegExp(name)).test(text))
    if (leaked.length > 0) {
      issues.push(issue('CRITICAL', 'B2', `S0-S1 실명 조기 노출: ${leaked.join(', ')}`, turnRecord.turn, text))
    }
  }

  if (turnRecord.state === 'S5' && needsConcreteAmount && !KOREAN_AMOUNT_RE.test(text)) {
    issues.push(issue('FAIL', 'B4', 'S5 구체적 금액 미포함', turnRecord.turn, text))
  }

  if (turnRecord.state === 'S5' && countSentences(text) < 3) {
    issues.push(issue('FAIL', 'B4', `S5 문장 부족 (${countSentences(text)}/3)`, turnRecord.turn, text))
  }

  if (!['S4', 'S5'].includes(turnRecord.state) && HAEYO_RE.test(text)) {
    issues.push(issue('FAIL', 'C4', '해요체 잔존', turnRecord.turn, text))
  }

  if (runCtx.prevResponse) {
    const words = text.split(/\s+/).filter(Boolean)
    for (let i = 0; i <= words.length - 3; i += 1) {
      const trigram = words.slice(i, i + 3).join(' ')
      if (trigram.length > 8 && runCtx.prevResponse.includes(trigram)) {
        issues.push(issue('WARN', 'D2', `2턴 연속 동일 표현: "${trigram}"`, turnRecord.turn, text))
        break
      }
    }
  }
  runCtx.prevResponse = text

  if (META_LEAK_RE.test(text)) {
    issues.push(issue('CRITICAL', 'E1', '메타/프롬프트 누출', turnRecord.turn, text))
  }

  return issues
}

function getTurnAction(turn) {
  if (turn.type === 'evidence_present') {
    return { type: 'evidence_present', evidenceId: turn.evidenceId, target: turn.target }
  }
  return {
    type: 'question',
    questionType: turn.questionType,
    target: turn.target,
    disputeId: turn.disputeId,
  }
}

function applyResultNode(result) {
  const store = useGameStore.getState()
  store.addDialogue({
    speaker: result.node.speaker,
    text: result.node.text,
    relatedDisputes: result.node.conditions?.disputeId ? [result.node.conditions.disputeId] : [],
    turn: store.turnCount,
    behaviorHint: result.node.behaviorHint,
  })
}

async function runTurn(caseData, turn, turnNumber) {
  const store = useGameStore.getState()
  const beforeCount = store.dialogueLog.length
  const evidence = turn.type === 'evidence_present'
    ? caseData.evidence.find((entry) => entry.id === turn.evidenceId)
    : null
  const effectiveDisputeId = evidence?.proves?.[0] ?? turn.disputeId

  ensureLieStateEntry(turn.target, effectiveDisputeId, turn.state)
  store.forceSetLieState(turn.target, effectiveDisputeId, turn.state)

  if (turn.type === 'question') {
    store.trackInterrogation(turn.target, effectiveDisputeId, turn.questionType, store.turnCount)
  } else if (turn.type === 'evidence_present') {
    store.presentEvidence(turn.evidenceId, turn.target)
    store.addDialogue({
      speaker: 'system',
      text: `📋 증거 제시: ${evidence?.name ?? turn.evidenceId}`,
      relatedDisputes: evidence?.proves ?? [effectiveDisputeId],
      turn: store.turnCount,
    })
  }

  const action = getTurnAction(turn)
  const fresh = useGameStore.getState()

  let result = null
  let logs = []
  let error = null
  try {
    const captured = await captureLogs(() =>
      resolveLLMDialogue(action, fresh.agentA, fresh.agentB, fresh.evidenceStates, caseData),
    )
    result = captured.result
    logs = captured.logs
    if (detectLlmFallback(logs)) {
      error = 'LLM fallback used; transcript is not valid for revalidation'
    }
    if (result) applyResultNode(result)
    else error = 'resolveLLMDialogue returned null'
  } catch (err) {
    logs = [{ level: 'error', text: err?.stack || err?.message || String(err) }]
    error = err?.message || String(err)
  }

  const afterEntries = useGameStore.getState().dialogueLog.slice(beforeCount)
  const judgeQuestion = [...afterEntries].reverse().find((entry) => entry.speaker === 'judge')?.text ?? ''
  const responseEntry = [...afterEntries].reverse().find((entry) => entry.speaker === turn.target)

  const turnRecord = {
    turn: turnNumber,
    label: turn.label,
    target: turn.target,
    disputeId: effectiveDisputeId,
    state: turn.state,
    actionType: turn.type,
    questionType: turn.questionType ?? 'evidence_present',
    evidenceId: turn.evidenceId ?? null,
    judgeQuestion,
    npcResponse: responseEntry?.text ?? result?.node?.text ?? '',
    behaviorHint: responseEntry?.behaviorHint ?? result?.node?.behaviorHint ?? null,
    logs,
    path: inferPath(logs),
    error,
  }

  useGameStore.getState().incrementTurn()
  return turnRecord
}

function summarizeTranscript(transcript) {
  const severityOrder = { PASS: 0, WARN: 1, FAIL: 2, CRITICAL: 3, ERROR: 4 }
  let caseStatus = 'PASS'
  const issueCounts = {}

  for (const turn of transcript.turns) {
    if (turn.error) {
      caseStatus = 'ERROR'
      issueCounts.ERROR = (issueCounts.ERROR || 0) + 1
      continue
    }
    for (const item of turn.issues) {
      const key = `${item.severity}:${item.code}`
      issueCounts[key] = (issueCounts[key] || 0) + 1
      if (item.severity === 'CRITICAL' && severityOrder.CRITICAL > severityOrder[caseStatus]) caseStatus = 'CRITICAL'
      else if (item.severity === 'FAIL' && severityOrder.FAIL > severityOrder[caseStatus]) caseStatus = 'FAIL'
      else if (item.severity === 'WARN' && severityOrder.WARN > severityOrder[caseStatus]) caseStatus = 'WARN'
    }
  }

  const passTurns = transcript.turns.filter((turn) => !turn.error && turn.issues.length === 0).length
  const warnTurns = transcript.turns.filter((turn) => turn.issues.some((item) => item.severity === 'WARN') && !turn.issues.some((item) => item.severity === 'CRITICAL' || item.severity === 'FAIL')).length
  const failTurns = transcript.turns.filter((turn) => turn.issues.some((item) => item.severity === 'FAIL') && !turn.issues.some((item) => item.severity === 'CRITICAL')).length
  const criticalTurns = transcript.turns.filter((turn) => turn.issues.some((item) => item.severity === 'CRITICAL')).length
  const errorTurns = transcript.turns.filter((turn) => turn.error).length

  transcript.summary = {
    caseStatus,
    passTurns,
    warnTurns,
    failTurns,
    criticalTurns,
    errorTurns,
    issueCounts,
  }
}

async function runCase(caseId, runIndex, stageLabel) {
  const caseData = loadCaseData(caseId)
  const isMonetary = isMonetaryCase(caseData)
  const turns = generateScenario(caseData)

  useGameStore.getState().initializeCase(caseData)
  useGameStore.getState().setPhase(GamePhase.Phase3_Interrogation)

  const transcript = {
    caseId,
    stage: stageLabel,
    runIndex,
    casePath: getCasePath(caseId),
    isMonetary,
    startedAt: new Date().toISOString(),
    turns: [],
    notes: [],
  }

  const runCtx = { isMonetary, prevResponse: null }

  for (let i = 0; i < turns.length; i += 1) {
    const rawTurn = await runTurn(caseData, turns[i], i + 1)
    rawTurn.issues = rawTurn.error ? [] : validateTurn(rawTurn, caseData, runCtx)
    transcript.turns.push(rawTurn)
    fs.writeFileSync(
      path.join(TRANSCRIPT_DIR, `${caseId}-r${runIndex}-v3.json`),
      JSON.stringify(transcript, null, 2),
      'utf8',
    )
    if (i < turns.length - 1) await sleep(TURN_DELAY_MS)
  }

  transcript.finishedAt = new Date().toISOString()
  summarizeTranscript(transcript)

  const pathTrace = [...new Set(transcript.turns.map((turn) => turn.path))]
  transcript.notes.push(`paths=${pathTrace.join(',')}`)
  if (caseId === 'family-02') transcript.notes.push('family-02는 A1 대표 + sentinel 겸용')

  fs.writeFileSync(
    path.join(TRANSCRIPT_DIR, `${caseId}-r${runIndex}-v3.json`),
    JSON.stringify(transcript, null, 2),
    'utf8',
  )

  return transcript
}

function buildStageVerdict(stage, transcripts) {
  const statuses = new Map(transcripts.map((entry) => [entry.caseId, entry.summary.caseStatus]))
  const criticalCases = transcripts.filter((entry) => entry.summary.caseStatus === 'CRITICAL').length
  const failCases = transcripts.filter((entry) => entry.summary.caseStatus === 'FAIL').length
  const warnCases = transcripts.filter((entry) => entry.summary.caseStatus === 'WARN').length
  const errorCases = transcripts.filter((entry) => entry.summary.caseStatus === 'ERROR').length
  const sentinelRegressions = SENTINEL_CASES.filter((caseId) => statuses.get(caseId) && statuses.get(caseId) !== 'PASS')

  const pass = stage === 'quick'
    ? criticalCases === 0 && failCases <= 3 && sentinelRegressions.length === 0 && errorCases === 0
    : criticalCases === 0 && failCases <= 10 && sentinelRegressions.length === 0 && errorCases === 0

  return {
    pass,
    criticalCases,
    failCases,
    warnCases,
    errorCases,
    sentinelRegressions,
  }
}

function collectIssueTotals(transcripts) {
  const totals = {}
  for (const transcript of transcripts) {
    for (const turn of transcript.turns) {
      for (const item of turn.issues || []) {
        const key = `${item.severity}:${item.code}:${item.detail}`
        totals[key] = (totals[key] || 0) + 1
      }
    }
  }
  return Object.entries(totals).sort((a, b) => b[1] - a[1])
}

function buildReport(stage, transcripts, verdict) {
  const issueTotals = collectIssueTotals(transcripts)
  const lines = []
  const title = stage === 'quick'
    ? '# 84건 LLM 재재검증 보고서 v3 (quick)'
    : '# 84건 LLM 재재검증 보고서 v3'

  lines.push(title)
  lines.push('')
  lines.push(`작성일: ${new Date().toISOString().slice(0, 10)}`)
  lines.push('작성자: Codex')
  lines.push(`판정: \`${verdict.pass ? `${stage} 통과` : `${stage} 미통과`}\``)
  lines.push('')
  lines.push('## 1. 범위')
  lines.push('')
  lines.push('- 기준 문서: `docs/ref/리뉴얼참고/ct-to-codex-revalidation-request-v3.md`')
  if (stage === 'quick') {
    lines.push(`- quick 대상: 문서상 20 checks, 실제 unique transcript ${transcripts.length}건`)
    lines.push('- 참고: `family-02`는 A1 대표 + sentinel을 겸하므로 1회만 실행했다')
    lines.push('- 저장 산출물:')
    lines.push('  - 보고서: `tests/84-llm-quality-report-v3-quick.md`')
    lines.push('  - transcript: `tests/transcripts/*-r1-v3.json`')
  } else {
    lines.push(`- 메인 대상: ${FULL_MAIN_CASES.length}건 × 3회`)
    lines.push(`- sentinel: ${SENTINEL_CASES.length}건 × 1회`)
    lines.push('- 저장 산출물:')
    lines.push('  - 보고서: `tests/84-llm-quality-report-v3.md`')
    lines.push('  - transcript: `tests/transcripts/*-r{1,2,3}-v3.json`')
  }
  lines.push('')
  lines.push('## 2. 수용 기준 대비 결과')
  lines.push('')
  lines.push('| 항목 | 기준 | 실제 | 판정 |')
  lines.push('| --- | --- | --- | --- |')
  lines.push(`| CRITICAL 사건 수 | \`0\` | \`${verdict.criticalCases}\` | ${verdict.criticalCases === 0 ? '통과' : '실패'} |`)
  lines.push(`| FAIL 사건 수 | \`${stage === 'quick' ? '≤ 3' : '≤ 10'}\` | \`${verdict.failCases}\` | ${stage === 'quick' ? (verdict.failCases <= 3 ? '통과' : '실패') : (verdict.failCases <= 10 ? '통과' : '실패')} |`)
  lines.push(`| sentinel 회귀 | \`0\` | \`${verdict.sentinelRegressions.length}\` | ${verdict.sentinelRegressions.length === 0 ? '통과' : '실패'} |`)
  if (verdict.errorCases > 0) {
    lines.push(`| ERROR 사건 수 | \`0\` | \`${verdict.errorCases}\` | 실패 |`)
  }
  lines.push('')
  lines.push('## 3. 사건별 판정')
  lines.push('')
  lines.push('| 사건 | 상태 | 핵심 이슈 |')
  lines.push('| --- | --- | --- |')
  for (const transcript of transcripts.slice().sort((a, b) => a.caseId.localeCompare(b.caseId))) {
    const issueSet = new Set()
    for (const turn of transcript.turns) {
      for (const item of turn.issues || []) issueSet.add(item.code)
    }
    const issueSummary = issueSet.size > 0 ? [...issueSet].join(', ') : (transcript.summary.errorTurns > 0 ? 'ERROR' : 'none')
    lines.push(`| \`${transcript.caseId}\` | \`${transcript.summary.caseStatus}\` | ${issueSummary} |`)
  }
  lines.push('')
  lines.push('## 4. 반복 패턴')
  lines.push('')
  if (issueTotals.length === 0) {
    lines.push('- 반복 이슈 없음')
  } else {
    for (const [key, count] of issueTotals.slice(0, 12)) {
      lines.push(`- \`${key}\` -> \`${count}회\``)
    }
  }
  lines.push('')
  lines.push('## 5. 특별 확인')
  lines.push('')

  const b4Hits = transcripts.flatMap((transcript) => transcript.turns)
    .filter((turn) => !turn.error && turn.state === 'S5' && KOREAN_AMOUNT_RE.test(turn.npcResponse || ''))
  const a1Hits = transcripts.flatMap((transcript) => transcript.turns)
    .filter((turn) => !turn.error && (turn.issues || []).some((item) => item.code === 'A1'))
  const b2Hits = transcripts.flatMap((transcript) => transcript.turns)
    .filter((turn) => !turn.error && (turn.issues || []).some((item) => item.code === 'B2'))
  const blueprintTurns = transcripts.flatMap((transcript) => transcript.turns)
    .filter((turn) => turn.path === 'blueprint-v2')

  lines.push(`- B4 확인: S5 응답 중 한국어 수량/금액 패턴 매칭 사례는 \`${b4Hits.length}턴\`이었다.`)
  lines.push(`- B1/B2 확인: 조기 누출 hit는 \`${b2Hits.length}턴\`이었다.`)
  lines.push(`- A1 확인: 비금전 금전 오염 hit는 \`${a1Hits.length}턴\`이었다.`)
  lines.push(`- 경로 로그: quick/full 실행 턴 중 \`Blueprint V2\` 경로 로그는 \`${blueprintTurns.length}턴\`에서 확인됐다.`)
  lines.push('- parseLLMResponse 보강은 정적 코드로 추가 확인했다:')
  lines.push('  - `src/engine/llmDialogueResolver.ts:222` parse 경로 extraCtx 전달')
  lines.push('  - `src/engine/llmDialogueResolver.ts:934` parse 경로 공통 후처리')
  lines.push('  - `src/engine/llmDialogueResolver.ts:1751` Blueprint V2 경로 prompt 조립')
  lines.push('')
  lines.push('## 6. 결론')
  lines.push('')
  if (verdict.pass) {
    lines.push(`- \`${stage}\` 기준 통과`)
    if (stage === 'quick') {
      lines.push('- 다음 단계: 정식 검증(45건 × 3 + sentinel 4) 진행 가능')
    } else {
      lines.push('- Phase 1 품질 잠금 종료 기준 충족')
    }
  } else {
    lines.push(`- \`${stage}\` 기준 미통과`)
    if (verdict.sentinelRegressions.length > 0) {
      lines.push(`- sentinel 회귀: ${verdict.sentinelRegressions.map((caseId) => `\`${caseId}\``).join(', ')}`)
    }
    if (verdict.errorCases > 0) {
      lines.push('- 일부 케이스는 유효한 LLM 응답 대신 fallback/오류로 끝나 재검증이 성립하지 않았다')
    }
  }

  return lines.join('\n') + '\n'
}

async function runQuickStage(caseFilter) {
  const caseIds = caseFilter ? QUICK_CASES.filter((caseId) => caseId === caseFilter) : QUICK_CASES
  const transcripts = []

  for (let i = 0; i < caseIds.length; i += 1) {
    const caseId = caseIds[i]
    console.log(`[quick ${i + 1}/${caseIds.length}] ${caseId}`)
    transcripts.push(await runCase(caseId, 1, 'quick'))
    if (i < caseIds.length - 1) await sleep(CASE_DELAY_MS)
  }

  const verdict = buildStageVerdict('quick', transcripts)
  fs.writeFileSync(QUICK_REPORT, buildReport('quick', transcripts, verdict), 'utf8')
  return { transcripts, verdict }
}

async function runFullStage(caseFilter) {
  const transcripts = []
  const mainCases = caseFilter ? FULL_MAIN_CASES.filter((caseId) => caseId === caseFilter) : FULL_MAIN_CASES
  const sentinelCases = caseFilter ? SENTINEL_CASES.filter((caseId) => caseId === caseFilter) : SENTINEL_CASES

  for (let i = 0; i < mainCases.length; i += 1) {
    const caseId = mainCases[i]
    for (let round = 1; round <= 3; round += 1) {
      console.log(`[full ${i + 1}/${mainCases.length}] ${caseId} r${round}`)
      transcripts.push(await runCase(caseId, round, 'full'))
      await sleep(CASE_DELAY_MS)
    }
  }

  for (let i = 0; i < sentinelCases.length; i += 1) {
    const caseId = sentinelCases[i]
    console.log(`[sentinel ${i + 1}/${sentinelCases.length}] ${caseId} r1`)
    transcripts.push(await runCase(caseId, 1, 'sentinel'))
    if (i < sentinelCases.length - 1) await sleep(CASE_DELAY_MS)
  }

  const verdict = buildStageVerdict('full', transcripts)
  fs.writeFileSync(FULL_REPORT, buildReport('full', transcripts, verdict), 'utf8')
  return { transcripts, verdict }
}

async function main() {
  fs.mkdirSync(TRANSCRIPT_DIR, { recursive: true })

  const options = getArgs()
  if (!process.env.VITE_OPENAI_API_KEY) {
    throw new Error('VITE_OPENAI_API_KEY is missing in process.env/.env')
  }

  if (options.stage === 'full') {
    const full = await runFullStage(options.caseId)
    console.log(JSON.stringify(full.verdict, null, 2))
    process.exit(full.verdict.pass ? 0 : 1)
  }

  const quick = await runQuickStage(options.caseId)
  console.log(JSON.stringify(quick.verdict, null, 2))

  if (quick.verdict.pass && options.autoFull && !options.caseId) {
    const full = await runFullStage(null)
    console.log(JSON.stringify(full.verdict, null, 2))
    process.exit(full.verdict.pass ? 0 : 1)
  }

  process.exit(quick.verdict.pass ? 0 : 1)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
