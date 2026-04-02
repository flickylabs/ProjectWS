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
  test('disputes 5개', () => assert(structure.disputes.length === 5, `got ${structure.disputes.length}`))
  test('evidence 6개', () => assert(structure.evidence.length === 6, `got ${structure.evidence.length}`))

  // d-3 red_herring 확인
  const d3 = structure.disputes.find(d => d.id === 'd-3')
  test('d-3 disputeKind === red_herring', () => assert(d3.disputeKind === 'red_herring', d3.disputeKind))
  test('d-3 misconception 존재', () => assert(d3.misconception != null, 'no misconception'))
  test('d-3 misconception stages 5개 (M0~M4)', () => assert(d3.misconception.stages.length === 5, d3.misconception.stages.length))

  // depthLayers 확인
  const d1 = structure.disputes.find(d => d.id === 'd-1')
  test('d-1 depthLayers 3층', () => assert(d1.depthLayers.length === 3, d1.depthLayers.length))
  test('d-1 layers = surface/motive/core', () => {
    const ids = d1.depthLayers.map(l => l.id)
    assert(ids.includes('surface') && ids.includes('motive') && ids.includes('core'), ids.join(','))
  })

  // linkEdges 확인
  const allLinks = structure.disputes.flatMap(d => d.linkEdges || [])
  test('linkEdges 3~6개', () => assert(allLinks.length >= 3 && allLinks.length <= 6, `got ${allLinks.length}`))

  // evidence timing 확인
  const e1 = structure.evidence.find(e => e.id === 'e-1')
  test('e-1 timing 존재', () => assert(e1.timing != null, 'no timing'))
  test('e-1 timing.intent 존재', () => assert(e1.timing.intent != null, 'no intent'))
  test('e-1 timing.role 존재', () => assert(e1.timing.role != null, 'no role'))

  // freeQuestionHooks 확인
  test('freeQuestionHooks 존재', () => assert(structure.freeQuestionHooks != null && structure.freeQuestionHooks.length > 0, 'no hooks'))
}

console.log('\n─── 테스트 7: spouse-01 beats-v2-full 데이터 구조 ───')
{
  const fs = require('fs')
  const path = require('path')
  const beatsPath = path.join(__dirname, '..', 'src', 'data', 'claimPolicies', 'spouse-01-beats-v2-full.json')
  const beats = JSON.parse(fs.readFileSync(beatsPath, 'utf-8'))

  test('caseId === spouse-01', () => assert(beats.caseId === 'spouse-01', beats.caseId))
  test('beats 40개 이상', () => assert(beats.beats.length >= 40, `got ${beats.beats.length}`))

  // 필수 필드 확인
  const first = beats.beats[0]
  test('beat에 id 존재', () => assert(first.id != null, 'no id'))
  test('beat에 responseIntent 존재', () => assert(first.responseIntent != null, 'no responseIntent'))
  test('beat에 angleTag 존재', () => assert(first.angleTag != null, 'no angleTag'))
  test('beat에 layer 존재', () => assert(first.layer != null, 'no layer'))
  test('beat에 issueRole 존재', () => assert(first.issueRole != null, 'no issueRole'))
  test('beat에 actionFamily 존재', () => assert(first.actionFamily != null, 'no actionFamily'))

  // fatigue beat 존재 확인
  const fatigueBeats = beats.beats.filter(b => b.actionFamily === 'fatigue' || b.responseIntent === 'fatigue_response')
  test('fatigue beats 3개 이상', () => assert(fatigueBeats.length >= 3, `got ${fatigueBeats.length}`))

  // red_herring beat 존재 확인
  const rhBeats = beats.beats.filter(b => b.issueRole === 'red_herring')
  test('red_herring beats 존재', () => assert(rhBeats.length > 0, 'no red_herring beats'))

  // coverageSummary 확인
  test('coverageSummary 존재', () => assert(beats.coverageSummary != null, 'no coverageSummary'))
  test('totalBeats >= 40', () => assert(beats.coverageSummary.totalBeats >= 40, `got ${beats.coverageSummary.totalBeats}`))
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
