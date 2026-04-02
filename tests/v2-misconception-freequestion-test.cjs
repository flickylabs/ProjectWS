/**
 * Misconception V2 + FreeQuestion V2 엔진 설계 검증 테스트
 * ─────────────────────────────────
 * TS 모듈을 CJS에서 직접 require 불가하므로 핵심 로직을 인라인 재현.
 *
 * 실행: node tests/v2-misconception-freequestion-test.cjs
 */

let passed = 0, failed = 0

function test(name, fn) {
  try { fn(); passed++; console.log(`  ✅ ${name}`) }
  catch (e) { failed++; console.log(`  ❌ ${name}: ${e.message}`) }
}

function assert(cond, msg) { if (!cond) throw new Error(msg || 'assertion failed') }

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. Misconception 전이 로직 재현 (인라인)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const THRESHOLD = { suspects: 2, misbelief: 1, weaponizes: 1, knows: 2 }

function resolveBelief(modes) {
  if (modes.includes('weaponizes')) return 'weaponizes'
  if (modes.includes('misbelief')) return 'misbelief'
  if (modes.includes('suspects')) return 'suspects'
  return 'knows'
}

function createEntry(disputeId, beliefDriver) {
  return {
    disputeId, state: 'M0', beliefDriver,
    progress: {
      focusCount: 0, reinforcementCount: 0,
      trapSignalsSeen: [], truthExitEvidenceSeen: [],
      resolvedLinkIds: [], coreContextConfirmCount: 0,
    },
  }
}

function pushUnique(arr, val) {
  if (!val) return arr
  return arr.includes(val) ? arr : [...arr, val]
}

function canResolve(entry) {
  return entry.progress.truthExitEvidenceSeen.length > 0 &&
    (entry.progress.coreContextConfirmCount >= 1 || entry.progress.resolvedLinkIds.length >= 1)
}

function misconceptionToTrap(state) {
  if (state === 'M0' || state === 'M1') return 'suspected'
  if (state === 'M2' || state === 'M3') return 'active'
  return 'clarified'
}

function applyTrigger(entry, trigger) {
  const from = entry.state
  const threshold = THRESHOLD[entry.beliefDriver] ?? 2
  const effects = []

  switch (trigger.type) {
    case 'focus_first_probe':
      entry.progress.focusCount++
      entry.progress.lastAngleTag = trigger.angleTag
      if (entry.state === 'M0') {
        entry.state = 'M1'
        effects.push({ type: 'set_flag', flag: `${entry.disputeId}.red_herring_pressed` })
      }
      break
    case 'focus_repeat_probe':
    case 'same_angle_loop':
    case 'misbelief_interjection_allowed':
      entry.progress.focusCount++
      entry.progress.reinforcementCount++
      entry.progress.lastAngleTag = trigger.angleTag ?? entry.progress.lastAngleTag
      if (entry.state === 'M0') { entry.state = 'M1'; effects.push({ type: 'set_flag', flag: `${entry.disputeId}.red_herring_pressed` }) }
      if (entry.state === 'M1' && entry.progress.reinforcementCount >= threshold) {
        entry.state = 'M2'; effects.push({ type: 'set_flag', flag: `${entry.disputeId}.trap_active` })
      }
      break
    case 'trap_signal_seen':
      entry.progress.trapSignalsSeen = pushUnique(entry.progress.trapSignalsSeen, trigger.trapSignal)
      if (entry.state === 'M0') { entry.state = 'M1'; effects.push({ type: 'set_flag', flag: `${entry.disputeId}.red_herring_pressed` }) }
      else if (entry.state === 'M1') {
        entry.progress.reinforcementCount = Math.max(entry.progress.reinforcementCount, threshold)
        entry.state = 'M2'; effects.push({ type: 'set_flag', flag: `${entry.disputeId}.trap_active` })
      } else if (entry.state === 'M2' && entry.progress.trapSignalsSeen.length >= 2) {
        entry.state = 'M3'
      }
      break
    case 'truth_exit_evidence_presented':
      entry.progress.truthExitEvidenceSeen = pushUnique(entry.progress.truthExitEvidenceSeen, trigger.evidenceId)
      if (entry.state === 'M0') { entry.state = 'M1'; effects.push({ type: 'set_flag', flag: `${entry.disputeId}.red_herring_pressed` }) }
      if (entry.state === 'M1' || entry.state === 'M2') { entry.state = 'M3' }
      else if (entry.state === 'M3' && canResolve(entry)) { entry.state = 'M4' }
      break
    case 'supporting_context_link_resolved':
      entry.progress.resolvedLinkIds = pushUnique(entry.progress.resolvedLinkIds, trigger.linkId)
      if (entry.state === 'M3' && canResolve(entry)) { entry.state = 'M4' }
      break
    case 'core_context_confirmed':
      entry.progress.coreContextConfirmCount++
      if (entry.state === 'M3' && canResolve(entry)) { entry.state = 'M4' }
      break
  }

  if (from !== entry.state && entry.state === 'M4') {
    effects.push({ type: 'log_disproved_fake_issue', disputeId: entry.disputeId })
  }

  return { changed: from !== entry.state, from, to: entry.state, effects }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. FreeQuestion 분류기 재현 (인라인)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const LIE_RANK = { S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5 }

function canUseFreeQ(input) {
  if (!input.isV2Case) return false
  if (input.turn < 6) return false
  const lieOpen = input.currentLieState ? (LIE_RANK[input.currentLieState] ?? 0) >= 3 : false
  const flagOpen = input.flags.has(`${input.activeDisputeId}.red_herring_pressed`)
  return lieOpen || flagOpen
}

const INTENT_LEXICON = {
  identity_check: ['누구', '정체', '무슨 사람'],
  motive_hidden: ['왜', '숨겼', '말 못'],
  trap_read: ['왜 그렇게 보여', '왜 외도처럼', '오해'],
}

const DISPUTE_ALIAS = {
  'd-3': ['외도', '최민정', '골목', '수첩'],
  'd-1': ['280만원', '비밀 송금'],
}

function classify(question, activeDisputeId, lieState, hooks) {
  const norm = question.toLowerCase().replace(/[?？!！.,]/g, ' ').trim()
  const scores = []

  for (const hook of hooks) {
    if (lieState && !hook.allowedAtStates.includes(lieState)) {
      scores.push({ hookId: hook.id, score: -999 }); continue
    }
    let score = 0
    const intentHits = (INTENT_LEXICON[hook.intentTag] ?? []).filter(k => norm.includes(k)).length
    if (intentHits > 0) score += 4 + intentHits
    const aliases = DISPUTE_ALIAS[hook.answerEnvelope.disputeId] ?? []
    const aliasHits = aliases.filter(k => norm.includes(k)).length
    if (aliasHits > 0) score += 2 + aliasHits
    if (hook.answerEnvelope.disputeId === activeDisputeId) score += 1
    scores.push({ hookId: hook.id, score })
  }

  scores.sort((a, b) => b.score - a.score)
  const top = scores[0]
  if (!top || top.score < 6) return { allowed: false, hookId: null }
  return { allowed: true, hookId: top.hookId }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. 테스트 실행
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n=== Misconception V2: spouse-01 d-3 (misbelief) ===')

test('초기 상태 M0', () => {
  const e = createEntry('d-3', 'misbelief')
  assert(e.state === 'M0')
})

test('M0→M1: 첫 질문', () => {
  const e = createEntry('d-3', 'misbelief')
  const r = applyTrigger(e, { type: 'focus_first_probe', angleTag: 'identity' })
  assert(r.changed && r.to === 'M1')
  assert(r.effects.some(f => f.flag === 'd-3.red_herring_pressed'))
})

test('M1→M2: misbelief threshold=1', () => {
  const e = createEntry('d-3', 'misbelief')
  applyTrigger(e, { type: 'focus_first_probe', angleTag: 'identity' })
  const r = applyTrigger(e, { type: 'same_angle_loop', angleTag: 'identity' })
  assert(r.changed && r.to === 'M2', `expected M2, got ${r.to}`)
})

test('M1→M2: suspects threshold=2 (1회 reinforcement로는 부족)', () => {
  const e = createEntry('d-3', 'suspects')
  applyTrigger(e, { type: 'focus_first_probe', angleTag: 'identity' })
  const r = applyTrigger(e, { type: 'focus_repeat_probe', angleTag: 'context' })
  assert(!r.changed && r.to === 'M1', `suspects: 1회 reinforcement로 M1 유지`)
})

test('suspects threshold=2: 2회 reinforcement로 M2 도달', () => {
  const e = createEntry('d-3', 'suspects')
  applyTrigger(e, { type: 'focus_first_probe', angleTag: 'identity' })
  applyTrigger(e, { type: 'focus_repeat_probe', angleTag: 'context' })
  const r = applyTrigger(e, { type: 'same_angle_loop', angleTag: 'context' })
  assert(r.changed && r.to === 'M2')
})

test('M2→M3: truthExitEvidence', () => {
  const e = createEntry('d-3', 'misbelief')
  applyTrigger(e, { type: 'focus_first_probe', angleTag: 'identity' })
  applyTrigger(e, { type: 'same_angle_loop', angleTag: 'identity' })
  assert(e.state === 'M2')
  const r = applyTrigger(e, { type: 'truth_exit_evidence_presented', evidenceId: 'e-2' })
  assert(r.changed && r.to === 'M3')
})

test('M3→M4: evidence + core_context', () => {
  const e = createEntry('d-3', 'misbelief')
  applyTrigger(e, { type: 'focus_first_probe', angleTag: 'identity' })
  applyTrigger(e, { type: 'same_angle_loop', angleTag: 'identity' })
  applyTrigger(e, { type: 'truth_exit_evidence_presented', evidenceId: 'e-2' })
  assert(e.state === 'M3')
  const r = applyTrigger(e, { type: 'core_context_confirmed', angleTag: 'emotion' })
  assert(r.changed && r.to === 'M4')
  assert(r.effects.some(f => f.type === 'log_disproved_fake_issue'))
})

test('M3→M4: evidence + link resolved', () => {
  const e = createEntry('d-3', 'misbelief')
  applyTrigger(e, { type: 'focus_first_probe', angleTag: 'identity' })
  applyTrigger(e, { type: 'same_angle_loop', angleTag: 'identity' })
  applyTrigger(e, { type: 'truth_exit_evidence_presented', evidenceId: 'e-2' })
  assert(e.state === 'M3')
  const r = applyTrigger(e, { type: 'supporting_context_link_resolved', linkId: 'link.d3.d1' })
  assert(r.changed && r.to === 'M4')
})

test('trap signal: M1→M2 바로 점프 (확신 응고)', () => {
  const e = createEntry('d-3', 'suspects')
  applyTrigger(e, { type: 'focus_first_probe', angleTag: 'identity' })
  assert(e.state === 'M1')
  const r = applyTrigger(e, { type: 'trap_signal_seen', trapSignal: '수첩' })
  assert(r.changed && r.to === 'M2', 'trap signal: M1→M2 점프')
})

test('M4에서 추가 전이 불가', () => {
  const e = createEntry('d-3', 'misbelief')
  e.state = 'M4'
  const r = applyTrigger(e, { type: 'focus_first_probe', angleTag: 'identity' })
  assert(!r.changed && r.to === 'M4')
})

test('misconceptionToTrapState 변환', () => {
  assert(misconceptionToTrap('M0') === 'suspected')
  assert(misconceptionToTrap('M1') === 'suspected')
  assert(misconceptionToTrap('M2') === 'active')
  assert(misconceptionToTrap('M3') === 'active')
  assert(misconceptionToTrap('M4') === 'clarified')
})

console.log('\n=== FreeQuestion V2: 게이트 테스트 ===')

test('V1 사건 → 닫힘', () => {
  assert(!canUseFreeQ({ isV2Case: false, turn: 10, activeDisputeId: 'd-1', flags: new Set() }))
})

test('turn < 6 → 닫힘', () => {
  assert(!canUseFreeQ({ isV2Case: true, turn: 3, activeDisputeId: 'd-1', flags: new Set() }))
})

test('S2 + no flag → 닫힘', () => {
  assert(!canUseFreeQ({ isV2Case: true, turn: 6, activeDisputeId: 'd-1', currentLieState: 'S2', flags: new Set() }))
})

test('S3 + turn 6 → 열림', () => {
  assert(canUseFreeQ({ isV2Case: true, turn: 6, activeDisputeId: 'd-1', currentLieState: 'S3', flags: new Set() }))
})

test('S1 + red_herring_pressed → 열림', () => {
  assert(canUseFreeQ({ isV2Case: true, turn: 6, activeDisputeId: 'd-3', currentLieState: 'S1', flags: new Set(['d-3.red_herring_pressed']) }))
})

console.log('\n=== FreeQuestion V2: 분류기 테스트 ===')

const hooks = [
  { id: 'fq-01', intentTag: 'identity_check', allowedAtStates: ['S3', 'S4', 'S5'], answerEnvelope: { disputeId: 'd-3', preferredAngleTags: ['identity'] }, refusalTemplates: [] },
  { id: 'fq-02', intentTag: 'motive_hidden', allowedAtStates: ['S3', 'S4', 'S5'], answerEnvelope: { disputeId: 'd-1', preferredAngleTags: ['motive'] }, refusalTemplates: [] },
]

test('"최민정이 누구야" → identity_check', () => {
  const r = classify('최민정이 누구야?', 'd-3', 'S3', hooks)
  assert(r.allowed && r.hookId === 'fq-01')
})

test('"왜 숨겼어요" → motive_hidden', () => {
  const r = classify('왜 숨겼어요?', 'd-1', 'S3', hooks)
  assert(r.allowed && r.hookId === 'fq-02')
})

test('무관한 질문 → 불허', () => {
  const r = classify('오늘 날씨가 좋네요', 'd-1', 'S3', hooks)
  assert(!r.allowed)
})

test('state 불허: S1에서 S3+ 요구 hook', () => {
  const r = classify('최민정이 누구야?', 'd-3', 'S1', hooks)
  assert(!r.allowed, 'S1에서 S3+ hook은 state_not_allowed')
})

test('intent + alias 조합: "왜 외도처럼 보여?" → d-3 hook', () => {
  const r = classify('왜 외도처럼 보여?', 'd-3', 'S3', [
    ...hooks,
    { id: 'fq-03', intentTag: 'trap_read', allowedAtStates: ['S3', 'S4'], answerEnvelope: { disputeId: 'd-3', preferredAngleTags: ['context'] }, refusalTemplates: [] },
  ])
  assert(r.allowed && r.hookId === 'fq-03', 'trap_read intent + "외도" alias 조합')
})

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log(`\n${'═'.repeat(50)}`)
console.log(`결과: ${passed}/${passed + failed} PASS, ${failed} FAIL`)
console.log(`${'═'.repeat(50)}`)

if (failed > 0) process.exit(1)
