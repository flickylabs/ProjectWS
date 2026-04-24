/**
 * V2 피로도 엔진 + legacy bypass 검증 테스트
 * ─────────────────────────────────
 * 피로도 로직을 인라인 재현하여 설계 검증.
 * (TS 모듈을 CJS에서 직접 require 불가하므로 로직 복제)
 *
 * 실행: node tests/v2-fatigue-bypass-test.cjs
 */

let passed = 0
let failed = 0
const failures = []

function test(name, fn) {
  try {
    fn()
    passed++
    console.log(`  ✅ ${name}`)
  } catch (e) {
    failed++
    failures.push({ name, error: e.message })
    console.log(`  ❌ ${name}: ${e.message}`)
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg)
}

function assertClose(actual, expected, tolerance) {
  if (Math.abs(actual - expected) > tolerance) {
    throw new Error(`expected ~${expected}, got ${actual}`)
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 피로도 로직 인라인 (questionFatigueEngine.ts 재현)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const LOCAL_MUL = { 1: 1.0, 2: 0.7, 3: 0.35, 4: 0.1 }
const SPOT_MUL = { 1: 1.0, 2: 0.9, 3: 0.75, 4: 0.6, 5: 0.45 }

function makeKey(party, disputeId, angleTag) {
  return `${party}:${disputeId}:${angleTag}`
}

function createState() {
  return { local: {}, spotlight: { activeParty: null, streak: 0, lastTurn: 0 } }
}

function evaluate(input, state) {
  const key = makeKey(input.party, input.disputeId, input.angleTag)
  const prev = state.local[key]

  let localStreak = 1
  if (prev && input.resetReason === 'none' && input.turn - prev.lastTurn <= 1) {
    localStreak = prev.streak + 1
  }

  let spotStreak = 1
  if (state.spotlight.activeParty === input.party && input.turn - state.spotlight.lastTurn <= 1) {
    spotStreak = state.spotlight.streak + 1
  }

  const localMul = LOCAL_MUL[Math.min(localStreak, 4)] ?? 0.1
  const spotMul = SPOT_MUL[Math.min(spotStreak, 5)] ?? 0.45
  const finalMul = Math.max(0.05, Math.min(1, +(localMul * spotMul).toFixed(2)))

  let level = 'fresh'
  if (finalMul < 0.2) level = 'exhausted'
  else if (finalMul < 0.5) level = 'high'
  else if (finalMul < 0.9) level = 'wary'

  return {
    localStreak, spotlightStreak: spotStreak,
    localMultiplier: localMul, spotlightMultiplier: spotMul,
    finalMultiplier: finalMul, fatigueLevel: level,
    shouldTriggerFatigueBeat: localStreak >= 3 || level === 'high' || level === 'exhausted',
  }
}

function commit(input, state) {
  const next = { local: { ...state.local }, spotlight: { ...state.spotlight } }

  // passive decay
  for (const [key, entry] of Object.entries(next.local)) {
    if (input.turn - entry.lastTurn >= 2) {
      next.local[key] = { streak: Math.max(1, entry.streak - 1), lastTurn: entry.lastTurn }
    }
  }

  const key = makeKey(input.party, input.disputeId, input.angleTag)
  const prev = next.local[key]
  let localStreak = 1
  if (prev && input.resetReason === 'none' && input.turn - prev.lastTurn <= 1) {
    localStreak = prev.streak + 1
  }

  next.local[key] = { streak: localStreak, lastTurn: input.turn }

  if (input.resetReason === 'new_evidence' || input.resetReason === 'layer_unlock') {
    for (const k of Object.keys(next.local)) {
      if (k.startsWith(`${input.party}:${input.disputeId}:`)) {
        next.local[k] = { streak: 1, lastTurn: input.turn }
      }
    }
  }

  if (next.spotlight.activeParty === input.party) {
    next.spotlight = { activeParty: input.party, streak: next.spotlight.streak + 1, lastTurn: input.turn }
  } else {
    next.spotlight = { activeParty: input.party, streak: 1, lastTurn: input.turn }
  }

  if (input.resetReason === 'target_switch' || input.resetReason === 'interjection_allow') {
    next.spotlight.streak = 1
  }

  return next
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 테스트
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n=== V2 피로도 엔진 테스트 ===\n')

console.log('─── 테스트 1: 같은 angleTag 3회 연속 → 35% ───')
{
  let s = createState()
  s = commit({ turn: 1, party: 'a', disputeId: 'd-1', questionType: 'motive_search', angleTag: 'motive', resetReason: 'none' }, s)
  s = commit({ turn: 2, party: 'a', disputeId: 'd-1', questionType: 'motive_search', angleTag: 'motive', resetReason: 'none' }, s)

  const a = evaluate({ turn: 3, party: 'a', disputeId: 'd-1', questionType: 'motive_search', angleTag: 'motive', resetReason: 'none' }, s)

  test('localStreak === 3', () => assert(a.localStreak === 3, `got ${a.localStreak}`))
  test('localMultiplier === 0.35', () => assertClose(a.localMultiplier, 0.35, 0.01))
  test('finalMultiplier ~= 0.35', () => assertClose(a.finalMultiplier, 0.35, 0.1))
  test('shouldTriggerFatigueBeat === true', () => assert(a.shouldTriggerFatigueBeat === true, `got ${a.shouldTriggerFatigueBeat}`))

  // delta 배율 적용 검증
  const rawDelta = 25
  const adjusted = Math.max(0, Math.round(rawDelta * a.finalMultiplier))
  test('adjusted delta ~= 9', () => assertClose(adjusted, 9, 2))
}

console.log('\n─── 테스트 2: angleTag 전환 → 피로 리셋 → 100% ───')
{
  let s = createState()
  s = commit({ turn: 1, party: 'a', disputeId: 'd-1', questionType: 'fact_pursuit', angleTag: 'timeline', resetReason: 'none' }, s)
  s = commit({ turn: 2, party: 'a', disputeId: 'd-1', questionType: 'fact_pursuit', angleTag: 'timeline', resetReason: 'none' }, s)

  const a = evaluate({ turn: 3, party: 'a', disputeId: 'd-1', questionType: 'fact_pursuit', angleTag: 'responsibility', resetReason: 'none' }, s)

  test('localStreak === 1 (새 angleTag)', () => assert(a.localStreak === 1, `got ${a.localStreak}`))
  // local은 리셋이지만 spotlight(같은 대상 a 3연속)은 유지 → 1.0 * 0.75 = 0.75
  test('finalMultiplier ~= 0.75 (local 1.0 × spotlight 0.75)', () => assertClose(a.finalMultiplier, 0.75, 0.1))
  test('shouldTriggerFatigueBeat === false', () => assert(a.shouldTriggerFatigueBeat === false, `got ${a.shouldTriggerFatigueBeat}`))
}

console.log('\n─── 테스트 3: 같은 대상 5회 연속 (spotlight) → 45% ───')
{
  let s = createState()
  s = commit({ turn: 1, party: 'b', disputeId: 'd-2', questionType: 'empathy_approach', angleTag: 'emotion', resetReason: 'none' }, s)
  s = commit({ turn: 2, party: 'b', disputeId: 'd-2', questionType: 'fact_pursuit', angleTag: 'timeline', resetReason: 'none' }, s)
  s = commit({ turn: 3, party: 'b', disputeId: 'd-3', questionType: 'fact_pursuit', angleTag: 'context', resetReason: 'none' }, s)
  s = commit({ turn: 4, party: 'b', disputeId: 'd-5', questionType: 'motive_search', angleTag: 'emotion', resetReason: 'none' }, s)

  const a = evaluate({ turn: 5, party: 'b', disputeId: 'd-2', questionType: 'empathy_approach', angleTag: 'emotion', resetReason: 'none' }, s)

  test('spotlightStreak === 5', () => assert(a.spotlightStreak === 5, `got ${a.spotlightStreak}`))
  test('localStreak === 1 (다른 쟁점 거쳐옴)', () => assert(a.localStreak === 1, `got ${a.localStreak}`))
  test('spotlightMultiplier === 0.45', () => assertClose(a.spotlightMultiplier, 0.45, 0.01))
  test('finalMultiplier ~= 0.45', () => assertClose(a.finalMultiplier, 0.45, 0.1))
}

console.log('\n─── 테스트 4: new_evidence 리셋 ───')
{
  let s = createState()
  s = commit({ turn: 1, party: 'a', disputeId: 'd-1', questionType: 'fact_pursuit', angleTag: 'timeline', resetReason: 'none' }, s)
  s = commit({ turn: 2, party: 'a', disputeId: 'd-1', questionType: 'fact_pursuit', angleTag: 'timeline', resetReason: 'none' }, s)
  // 새 증거 → 리셋
  s = commit({ turn: 3, party: 'a', disputeId: 'd-1', questionType: 'fact_pursuit', angleTag: 'timeline', resetReason: 'new_evidence' }, s)

  const a = evaluate({ turn: 4, party: 'a', disputeId: 'd-1', questionType: 'fact_pursuit', angleTag: 'timeline', resetReason: 'none' }, s)

  test('리셋 후 localStreak <= 2', () => assert(a.localStreak <= 2, `got ${a.localStreak}`))
}

console.log('\n─── 테스트 5: target_switch → spotlight 리셋 ───')
{
  let s = createState()
  s = commit({ turn: 1, party: 'a', disputeId: 'd-1', questionType: 'fact_pursuit', angleTag: 'timeline', resetReason: 'none' }, s)
  s = commit({ turn: 2, party: 'a', disputeId: 'd-1', questionType: 'motive_search', angleTag: 'motive', resetReason: 'none' }, s)
  s = commit({ turn: 3, party: 'a', disputeId: 'd-2', questionType: 'fact_pursuit', angleTag: 'timeline', resetReason: 'none' }, s)

  // 대상 전환
  const a = evaluate({ turn: 4, party: 'b', disputeId: 'd-2', questionType: 'fact_pursuit', angleTag: 'timeline', resetReason: 'target_switch' }, s)

  test('대상 전환 시 spotlightStreak === 1', () => assert(a.spotlightStreak === 1, `got ${a.spotlightStreak}`))
  test('대상 전환 시 finalMultiplier === 1.0', () => assertClose(a.finalMultiplier, 1.0, 0.01))
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// V2 데이터 구조 검증
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n─── 테스트 6: spouse-01 structure-v2 데이터 구조 ───')
{
  const fs = require('fs')
  const path = require('path')
  const structurePath = path.join(__dirname, '..', 'src', 'data', 'claimPolicies', 'spouse-01-structure-v2.json')
  const structure = JSON.parse(fs.readFileSync(structurePath, 'utf-8'))

  test('caseId === spouse-01', () => assert(structure.caseId === 'spouse-01', structure.caseId))
  test('disputes 4개', () => assert(structure.disputes.length === 4, `got ${structure.disputes.length}`))
  test('evidence 7개', () => assert(structure.evidence.length === 7, `got ${structure.evidence.length}`))

  const d1 = structure.disputes.find(d => d.id === 'd-1')
  const hD4 = structure.disputes.find(d => d.id === 'h-d4')
  test('h-d4 disputeKind === shared_misconception', () => assert(hD4?.disputeKind === 'shared_misconception', hD4?.disputeKind))
  test('d-1 depthLayers 3층', () => assert(d1.depthLayers.length === 3, d1.depthLayers.length))
  test('d-1 layers = surface/motive/core', () => {
    const ids = d1.depthLayers.map(l => l.id)
    assert(ids.includes('surface') && ids.includes('motive') && ids.includes('core'), ids.join(','))
  })

  const allLinks = structure.disputes.flatMap(d => d.linkEdges || [])
  test('linkEdges 3~6개', () => assert(allLinks.length >= 3 && allLinks.length <= 6, `got ${allLinks.length}`))

  const e1 = structure.evidence.find(e => e.id === 'e-1')
  test('e-1 timing 존재', () => assert(e1.timing != null, 'no timing'))
  test('e-1 timing.bestPhase 존재', () => assert(e1.timing.bestPhase != null, 'no bestPhase'))
  test('e-1 timing.impactCurve 존재', () => assert(e1.timing.impactCurve != null, 'no impactCurve'))

  test('freeQuestionHooks는 structure-v2에 포함되지 않음', () => assert(structure.freeQuestionHooks == null, 'expected hooks to be absent'))
}

console.log('\n─── 테스트 7: spouse-01 game-events 데이터 구조 ───')
{
  const fs = require('fs')
  const path = require('path')
  const eventsPath = path.join(__dirname, '..', 'src', 'data', 'claimPolicies', 'spouse-01-game-events.json')
  const events = JSON.parse(fs.readFileSync(eventsPath, 'utf-8'))

  test('contradictions 1개 이상', () => assert(events.contradictions.length >= 1, `got ${events.contradictions.length}`))
  test('interjections 1개 이상', () => assert(events.interjections.length >= 1, `got ${events.interjections.length}`))
  test('emotionalOutbursts 1개 이상', () => assert(events.emotionalOutbursts.length >= 1, `got ${events.emotionalOutbursts.length}`))
  test('transitionBeats 8개 이상', () => assert(events.transitionBeats.length >= 8, `got ${events.transitionBeats.length}`))

  const first = events.transitionBeats[0]
  test('transitionBeat에 id 존재', () => assert(first.id != null, 'no id'))
  test('transitionBeat에 caseId 존재', () => assert(first.caseId === 'spouse-01', first.caseId))
  test('transitionBeat에 party/disputeId 존재', () => assert(first.party && first.disputeId, 'missing party/disputeId'))
  test('transitionBeat에 fromState/toState 존재', () => assert(first.fromState && first.toState, 'missing state range'))
  test('transitionBeat에 line 존재', () => assert(first.line != null, 'no line'))
  test('transitionBeat에 behaviorHint 존재', () => assert(first.behaviorHint != null, 'no behaviorHint'))

  const confessionBeats = events.transitionBeats.filter(b => b.toState === 'S5')
  test('S5 confession transitionBeats 존재', () => assert(confessionBeats.length >= 2, `got ${confessionBeats.length}`))
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 결과
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log(`\n=== 결과: ${passed}/${passed + failed} PASS ===`)
if (failures.length > 0) {
  console.log('\n실패 목록:')
  for (const f of failures) console.log(`  - ${f.name}: ${f.error}`)
  process.exit(1)
}
