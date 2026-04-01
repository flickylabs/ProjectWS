/**
 * V3 통합 테스트 — 실제 TypeScript 엔진 임포트
 * ─────────────────────────────────
 * tsx로 실행: npx tsx tests/v3-integration-test.ts
 *
 * 테스트 항목:
 *  1. questionEffectEngine 실제 함수 호출
 *  2. v3GameLoopLoader 등록 → 조회 → DossierCard 해결
 *  3. atomSelectionEngine V3 unlock atom 병합
 *  4. gameEventTriggerEngine 실제 evaluateEventTriggers
 */

import {
  createInitialMeterState,
  resolveQuestionEffect,
  getMeterEffects,
} from '../src/engine/questionEffectEngine'
import {
  registerV3GameLoopData,
  resetV3State,
  getDossierCards,
  getAvailableDossierQuestions,
  resolveDossierQuestion,
  getUnlockedAtoms,
  getEarlyRevealedAtoms,
  getTransitionBeat,
  getEventTexts,
} from '../src/engine/v3GameLoopLoader'
import {
  evaluateEventTriggers,
  resetEventTriggerState,
  type TurnSnapshot,
} from '../src/engine/gameEventTriggerEngine'
import { spouse01V3GameLoopData } from '../docs/ref/리뉴얼참고/spouse-01-v3-game-loop-data'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 간이 프레임워크
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let passed = 0, failed = 0, total = 0
const failures: { name: string; error: string }[] = []

function test(name: string, fn: () => void) {
  total++
  try { fn(); passed++; console.log(`  ✅ ${name}`) }
  catch (e: any) { failed++; failures.push({ name, error: e.message }); console.log(`  ❌ ${name}: ${e.message}`) }
}
function assert(c: boolean, m?: string) { if (!c) throw new Error(m || 'Assertion failed') }
function assertEqual(a: any, b: any, m?: string) { if (a !== b) throw new Error(`${m || ''}Expected ${b}, got ${a}`) }

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Setup
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

registerV3GameLoopData(spouse01V3GameLoopData as any)

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. questionEffectEngine 실제 함수 호출
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n═══ 1. questionEffectEngine 실제 호출 ═══')

test('createInitialMeterState 반환 구조', () => {
  const m = createInitialMeterState()
  assertEqual(m.contradictionTokens, 0)
  assertEqual(m.leakMeter, 0)
  assertEqual(m.trustWindow, 0)
})

test('사실추궁 → 모순토큰 증가', () => {
  const meter = createInitialMeterState()
  const { result, updatedMeter } = resolveQuestionEffect(
    'fact_pursuit', 'a', 'd-1', 'S0', 'deny', 'calm', meter,
  )
  assertEqual(result.meter, 'contradiction')
  assert(updatedMeter.contradictionTokens > 0, 'tokens should increase')
  assert(result.delta > 0, 'delta should be positive')
})

test('동기탐색 → 누설미터 증가', () => {
  const meter = createInitialMeterState()
  const { result, updatedMeter } = resolveQuestionEffect(
    'motive_search', 'a', 'd-1', 'S1', 'hedge', 'agitated', meter,
  )
  assertEqual(result.meter, 'leak')
  assert(updatedMeter.leakMeter > 0, 'leak should increase')
})

test('공감접근 → 신뢰창구 증가', () => {
  const meter = createInitialMeterState()
  const { result, updatedMeter } = resolveQuestionEffect(
    'empathy_approach', 'a', 'd-1', 'S3', 'partial', 'agitated', meter,
  )
  assertEqual(result.meter, 'trust')
  assert(updatedMeter.trustWindow > 0, 'trust should increase')
})

test('연속 사실추궁 3회 → diminishing 적용', () => {
  let meter = createInitialMeterState()
  for (let i = 0; i < 3; i++) {
    const { updatedMeter } = resolveQuestionEffect(
      'fact_pursuit', 'a', 'd-1', 'S0', 'deny', 'calm', meter,
    )
    meter = updatedMeter
  }
  // 3회째는 diminishing → 토큰이 1+2+1(dim)=4가 아니라 좀 줄어야
  assert(meter.contradictionTokens <= 5, 'should respect max')
  assert(meter.consecutiveSameType === 3, `consecutive should be 3, got ${meter.consecutiveSameType}`)
})

test('evidence_present는 none meter', () => {
  const meter = createInitialMeterState()
  const { result } = resolveQuestionEffect(
    'evidence_present', 'a', 'd-1', 'S2', 'partial', 'calm', meter,
  )
  assertEqual(result.meter, 'none')
})

test('getMeterEffects 임계 판정', () => {
  const meter = { ...createInitialMeterState(), contradictionTokens: 3, leakMeter: 55, trustWindow: 65 }
  const fx = getMeterEffects(meter)
  assertEqual(fx.contradictionActive, true, 'tokens >= 2 should be active')
  assertEqual(fx.leakWarning, true, 'leak >= 50 should warn')
  assertEqual(fx.leakCritical, false, 'leak < 80 should not be critical')
  assertEqual(fx.trustWindowOpen, true, 'trust >= 60 should open')
})

test('공감접근 → 모순토큰 감소 교차 효과', () => {
  let meter = { ...createInitialMeterState(), contradictionTokens: 3 }
  const { updatedMeter } = resolveQuestionEffect(
    'empathy_approach', 'a', 'd-1', 'S2', 'partial', 'calm', meter,
  )
  assertEqual(updatedMeter.contradictionTokens, 2, 'should decrease by 1')
})

test('S4+에서 사실추궁하면 효과 없음 (방어 이미 낮음)', () => {
  const meter = createInitialMeterState()
  const { result } = resolveQuestionEffect(
    'fact_pursuit', 'a', 'd-1', 'S4', 'emotional', 'explosive', meter,
  )
  assertEqual(result.delta, 0, 'no token gain when stance is emotional')
})

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. v3GameLoopLoader 실제 호출
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n═══ 2. v3GameLoopLoader 실제 호출 ═══')

test('getDossierCards 3장 조회', () => {
  const cards = getDossierCards('spouse-01')
  assertEqual(cards.length, 3)
})

test('getAvailableDossierQuestions dossier-1/a 3개', () => {
  const qs = getAvailableDossierQuestions('spouse-01', 'dossier-1', 'a')
  assertEqual(qs.length, 3)
})

test('resolveDossierQuestion 성공 → atom 해금', () => {
  resetV3State('spouse-01')
  const result = resolveDossierQuestion('spouse-01', 'dossier-1.a.q1')
  assert(result !== null, 'should return result')
  assertEqual(result!.blockedVector, 'identity')
  assertEqual(result!.revealedAtomId, 'd1.unlock.s2.recipient_is_center_side')
  assert(result!.revealedAtom !== null, 'should have atom data')
  assert(result!.revealedAtom!.factText.length > 5, 'atom should have factText')
})

test('resolveDossierQuestion 사용 후 중복 불가', () => {
  // dossier-1.a.q1은 이미 사용됨
  const qs = getAvailableDossierQuestions('spouse-01', 'dossier-1', 'a')
  const usedQ = qs.find(q => q.id === 'dossier-1.a.q1')
  assertEqual(usedQ, undefined, 'used question should not appear')
  assertEqual(qs.length, 2, 'should have 2 remaining')
})

test('resolveDossierQuestion lieAdvance 플래그', () => {
  const result = resolveDossierQuestion('spouse-01', 'dossier-1.a.q3')
  assert(result !== null)
  assertEqual(result!.lieAdvance, true)
  assertEqual(result!.revealedAtomId, null, 'q3 has no revealAtom')
})

test('getEarlyRevealedAtoms 조기 해금 추적', () => {
  const revealed = getEarlyRevealedAtoms('spouse-01')
  assert(revealed.has('d1.unlock.s2.recipient_is_center_side'), 'should track revealed atom')
})

test('getUnlockedAtoms S2에서 2개 반환 (a/d-1)', () => {
  const atoms = getUnlockedAtoms('spouse-01', 'a', 'd-1', 'S2')
  assertEqual(atoms.length, 2, `expected 2, got ${atoms.length}`)
})

test('getUnlockedAtoms S5에서 전체 누적 (a/d-1)', () => {
  const atoms = getUnlockedAtoms('spouse-01', 'a', 'd-1', 'S5')
  // S2:2 + S3:1 + S4:2 + S5:2 = 7
  assertEqual(atoms.length, 7, `expected 7, got ${atoms.length}`)
})

test('getTransitionBeat a/d-1 S1→S2 반환', () => {
  resetV3State('spouse-01')
  const beat = getTransitionBeat('spouse-01', 'a', 'd-1', 'S1', 'S2')
  assert(beat !== null, 'should return beat')
  assertEqual(beat!.primaryBeatType, 'evidence_hit')
  assert(beat!.line.length > 20, 'line should be substantial')
})

test('getTransitionBeat 같은 전이 2회 호출 → null', () => {
  const beat2 = getTransitionBeat('spouse-01', 'a', 'd-1', 'S1', 'S2')
  assertEqual(beat2, null, 'should return null on second call')
})

test('getTransitionBeat b/d-2 S4→S5 confession', () => {
  const beat = getTransitionBeat('spouse-01', 'b', 'd-2', 'S4', 'S5')
  assert(beat !== null)
  assertEqual(beat!.primaryBeatType, 'confession')
  assert(beat!.line.includes('캡처') || beat!.line.includes('언니'), 'should contain key content')
})

test('getEventTexts 이벤트 텍스트 조회', () => {
  const events = getEventTexts('spouse-01')
  assert(events !== null)
  assertEqual(events!.contradictions.length, 3)
  assertEqual(events!.interjections.length, 3)
  assertEqual(events!.emotionalOutbursts.length, 4)
})

test('없는 caseId 조회 → 빈 결과', () => {
  const cards = getDossierCards('nonexistent')
  assertEqual(cards.length, 0)
  const beat = getTransitionBeat('nonexistent', 'a', 'd-1', 'S1', 'S2')
  assertEqual(beat, null)
})

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. gameEventTriggerEngine 실제 호출
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n═══ 3. gameEventTriggerEngine 실제 호출 ═══')

function makeSnapshot(overrides: Partial<TurnSnapshot> = {}): TurnSnapshot {
  return {
    caseId: 'spouse-01',
    turn: 5,
    activeParty: 'a',
    questionType: 'fact_pursuit',
    lieStates: {
      a: { 'd-1': { currentState: 'S1' } },
      b: { 'd-2': { currentState: 'S0' } },
    },
    emotions: {
      a: { phase: 'defensive', internalValue: 30 },
      b: { phase: 'defensive', internalValue: 30 },
    },
    trust: { a: { trustTowardJudge: 30 }, b: { trustTowardJudge: 30 } },
    meters: {
      a: createInitialMeterState(),
      b: createInitialMeterState(),
    },
    disputeVisibility: {},
    transitionsThisTurn: [],
    readiness: null,
    focusDisputeId: 'd-1',
    ...overrides,
  }
}

test('조건 미충족 → null 반환', () => {
  resetEventTriggerState()
  const result = evaluateEventTriggers(makeSnapshot())
  assertEqual(result, null, 'should not trigger')
})

test('모순토큰 3+ → contradiction 트리거', () => {
  resetEventTriggerState()
  const snap = makeSnapshot({
    meters: {
      a: { ...createInitialMeterState(), contradictionTokens: 4 },
      b: createInitialMeterState(),
    },
  })
  const result = evaluateEventTriggers(snap)
  assert(result !== null, 'should trigger')
  assertEqual(result!.type, 'contradiction')
  assertEqual(result!.party, 'a')
  // V3 텍스트가 연결되었는지 확인
  assert(result!.description.length > 10, 'should have description')
})

test('감정폭발 조건: emotion 85+ leakCritical', () => {
  resetEventTriggerState()
  const snap = makeSnapshot({
    turn: 10,
    emotions: {
      a: { phase: 'angry', internalValue: 88 },
      b: { phase: 'defensive', internalValue: 30 },
    },
    meters: {
      a: { ...createInitialMeterState(), leakMeter: 85 },
      b: createInitialMeterState(),
    },
    // 모순 토큰 없으므로 모순 미발동 → 감정폭발 확인
    lieStates: {
      a: { 'd-1': { currentState: 'S3' } }, // S3이면 모순 미발동
      b: { 'd-2': { currentState: 'S0' } },
    },
  })
  const result = evaluateEventTriggers(snap)
  assert(result !== null, 'should trigger')
  assertEqual(result!.type, 'emotional_burst')
  // V3 outburst 텍스트
  assert(result!.scriptSlot?.textId !== undefined, 'should have scriptSlot')
})

test('끼어들기: 상대방 감정 높음 + S1+', () => {
  resetEventTriggerState()
  const snap = makeSnapshot({
    turn: 10,
    activeParty: 'a',
    questionType: 'fact_pursuit',
    lieStates: {
      a: { 'd-1': { currentState: 'S3' } },
      b: { 'd-1': { currentState: 'S2' } },
    },
    emotions: {
      a: { phase: 'defensive', internalValue: 30 },
      b: { phase: 'angry', internalValue: 70 },
    },
  })
  const result = evaluateEventTriggers(snap)
  // 끼어들기가 발생할 수 있음 (모순/감정폭발 조건 미충족 시)
  if (result) {
    assertEqual(result.type, 'interjection')
    assertEqual(result.party, 'b', 'interjector should be other party')
  }
})

test('쿨다운 내 재발동 방지', () => {
  resetEventTriggerState()
  // 첫 번째: 모순 발동
  const snap1 = makeSnapshot({
    turn: 5,
    meters: {
      a: { ...createInitialMeterState(), contradictionTokens: 4 },
      b: createInitialMeterState(),
    },
  })
  const r1 = evaluateEventTriggers(snap1)
  assertEqual(r1?.type, 'contradiction')

  // 바로 다음 턴: 쿨다운으로 미발동
  const snap2 = makeSnapshot({
    turn: 6,
    meters: {
      a: { ...createInitialMeterState(), contradictionTokens: 5 },
      b: createInitialMeterState(),
    },
  })
  const r2 = evaluateEventTriggers(snap2)
  // 모순 쿨다운 2턴이므로 turn 6에서는 미발동
  if (r2) {
    assert(r2.type !== 'contradiction', 'contradiction should be on cooldown')
  }
})

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. 풀 시나리오: 5턴 흐름 시뮬레이션
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n═══ 4. 5턴 풀 시나리오 시뮬레이션 ═══')

test('5턴 흐름: 미터 축적 → 이벤트 발동 → beat 조회', () => {
  resetV3State('spouse-01')
  resetEventTriggerState()

  let meterA = createInitialMeterState()
  const log: string[] = []

  // 턴 1: 사실추궁 → 모순토큰 +1
  {
    const { result, updatedMeter } = resolveQuestionEffect('fact_pursuit', 'a', 'd-1', 'S0', 'deny', 'calm', meterA)
    meterA = updatedMeter
    log.push(`T1: ${result.meter} +${result.delta} (토큰=${meterA.contradictionTokens})`)
    assert(meterA.contradictionTokens >= 1, 'T1 token')
  }

  // 턴 2: 사실추궁 연속 → 모순토큰 축적
  {
    const { result, updatedMeter } = resolveQuestionEffect('fact_pursuit', 'a', 'd-1', 'S0', 'deny', 'calm', meterA)
    meterA = updatedMeter
    log.push(`T2: ${result.meter} +${result.delta} (토큰=${meterA.contradictionTokens})`)
    assert(meterA.contradictionTokens >= 2, 'T2 token')
  }

  // 턴 3: 동기탐색 → 누설미터 축적
  {
    const { result, updatedMeter } = resolveQuestionEffect('motive_search', 'a', 'd-1', 'S1', 'hedge', 'agitated', meterA)
    meterA = updatedMeter
    log.push(`T3: ${result.meter} +${result.delta} (누설=${meterA.leakMeter}%)`)
    assert(meterA.leakMeter > 0, 'T3 leak')
  }

  // 턴 4: 공감접근 → 신뢰 축적
  {
    const { result, updatedMeter } = resolveQuestionEffect('empathy_approach', 'a', 'd-1', 'S2', 'partial', 'agitated', meterA)
    meterA = updatedMeter
    log.push(`T4: ${result.meter} +${result.delta} (신뢰=${meterA.trustWindow}%)`)
    assert(meterA.trustWindow > 0, 'T4 trust')
  }

  // 턴 5: 사실추궁 → 토큰 재축적
  {
    const { result, updatedMeter } = resolveQuestionEffect('fact_pursuit', 'a', 'd-1', 'S2', 'partial', 'calm', meterA)
    meterA = updatedMeter
    log.push(`T5: ${result.meter} +${result.delta} (토큰=${meterA.contradictionTokens})`)
  }

  // 전이 beat 조회 (S1→S2 가정)
  const beat = getTransitionBeat('spouse-01', 'a', 'd-1', 'S1', 'S2')
  // 이미 위 테스트에서 사용됐을 수 있으므로 null 허용
  log.push(`Beat S1→S2: ${beat ? beat.id : '(already used)'}`)

  // DossierCard 질문
  resetV3State('spouse-01')
  const dResult = resolveDossierQuestion('spouse-01', 'dossier-1.a.q2')
  log.push(`Dossier q2: vector=${dResult?.blockedVector}, atom=${dResult?.revealedAtomId}`)
  assert(dResult !== null)
  assertEqual(dResult!.blockedVector, 'context')

  for (const l of log) console.log(`    ${l}`)
})

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 결과
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n' + '═'.repeat(50))
console.log(`결과: ${passed}/${total} PASS, ${failed} FAIL`)
if (failures.length > 0) {
  console.log('\n실패 목록:')
  for (const f of failures) console.log(`  ❌ ${f.name}: ${f.error}`)
}
console.log('═'.repeat(50))

process.exit(failed > 0 ? 1 : 0)
