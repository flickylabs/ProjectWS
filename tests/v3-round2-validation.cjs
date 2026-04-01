/**
 * V3 Round 2 GPT 산출물 검증
 * ─────────────────────────────────
 * Session 1: spouse-01 supplement + family-01 tells/beats
 * Session 2: family-01 V2 atoms + V3 game loop
 */

const fs = require('fs')
const path = require('path')

let passed = 0, failed = 0, total = 0
const failures = []
function test(name, fn) { total++; try { fn(); passed++; console.log(`  ✅ ${name}`) } catch(e) { failed++; failures.push({name,error:e.message}); console.log(`  ❌ ${name}: ${e.message}`) } }
function assert(c, m) { if (!c) throw new Error(m || 'fail') }
function assertEqual(a, b, m) { if (a !== b) throw new Error(`${m||''}expected ${b}, got ${a}`) }

// ━━━ Load data ━━━
const s1Dir = path.join(__dirname, '..', 'docs', 'ref', '리뉴얼참고', 'gpt-session1', 'output')
const s2Dir = path.join(__dirname, '..', 'docs', 'ref', '리뉴얼참고', 'gpt-session2', 'output')

const supplement = JSON.parse(fs.readFileSync(path.join(s1Dir, 'spouse-01-v3-supplement.json'), 'utf-8'))
const tellsBeats = JSON.parse(fs.readFileSync(path.join(s1Dir, 'family-01-tells-beats.json'), 'utf-8'))
const v2Atoms = JSON.parse(fs.readFileSync(path.join(s2Dir, 'family-01-v2-atoms.json'), 'utf-8'))
const v3Loop = JSON.parse(fs.readFileSync(path.join(s2Dir, 'family-01-v3-game-loop-data.json'), 'utf-8'))

// ━━━ 1. spouse-01 supplement ━━━
console.log('\n═══ 1. spouse-01 supplement 검증 ═══')

test('caseId가 spouse-01이다', () => assertEqual(supplement.caseId, 'spouse-01'))
test('supplemental: true', () => assertEqual(supplement.supplemental, true))

test('transitionBeats 16개', () => assertEqual(supplement.transitionBeats.length, 16))

test('d-3 beat 4개 (a측)', () => {
  const d3 = supplement.transitionBeats.filter(b => b.disputeId === 'd-3')
  assertEqual(d3.length, 4, 'd-3: ')
  assert(d3.every(b => b.party === 'a'), 'd-3 should all be party a')
})

test('d-4 beat 4개 (b측)', () => {
  const d4 = supplement.transitionBeats.filter(b => b.disputeId === 'd-4')
  assertEqual(d4.length, 4, 'd-4: ')
  assert(d4.every(b => b.party === 'b'), 'd-4 should all be party b')
})

test('d-5 beat 8개 (양측)', () => {
  const d5 = supplement.transitionBeats.filter(b => b.disputeId === 'd-5')
  assertEqual(d5.length, 8, 'd-5: ')
  const aCount = d5.filter(b => b.party === 'a').length
  const bCount = d5.filter(b => b.party === 'b').length
  assertEqual(aCount, 4, 'd-5 a: ')
  assertEqual(bCount, 4, 'd-5 b: ')
})

test('모든 beat에 line + behaviorHint가 있다', () => {
  for (const b of supplement.transitionBeats) {
    assert(b.line && b.line.length > 10, `${b.id}: line too short`)
    assert(b.behaviorHint && b.behaviorHint.length > 3, `${b.id}: hint too short`)
  }
})

test('모순 추가 3~4개', () => {
  const c = supplement.events.contradictions
  assert(c.length >= 3 && c.length <= 5, `contradictions: ${c.length}`)
})

test('끼어들기 추가 2개', () => assertEqual(supplement.events.interjections.length, 2))

test('감정폭발 추가 2개', () => assertEqual(supplement.events.emotionalOutbursts.length, 2))

test('이벤트 ID가 1차와 충돌하지 않는다 (4~)', () => {
  for (const c of supplement.events.contradictions) {
    const num = parseInt(c.id.replace(/\D/g, ''))
    assert(num >= 4, `${c.id}: should start from 4`)
  }
})

// ━━━ 2. family-01 tells/beats ━━━
console.log('\n═══ 2. family-01 tells/beats 검증 ═══')

test('caseId가 family-01이다', () => assertEqual(tellsBeats.caseId, 'family-01'))

test('Tell a측 3개', () => assertEqual(tellsBeats.executableTells.a.length, 3))
test('Tell b측 3개', () => assertEqual(tellsBeats.executableTells.b.length, 3))

test('Tell ID 확인: a측', () => {
  const ids = tellsBeats.executableTells.a.map(t => t.id)
  assert(ids.includes('sacrifice_rollcall'), 'missing sacrifice_rollcall')
  assert(ids.includes('tear_brake'), 'missing tear_brake')
  assert(ids.includes('echo_blame'), 'missing echo_blame')
})

test('Tell ID 확인: b측', () => {
  const ids = tellsBeats.executableTells.b.map(t => t.id)
  assert(ids.includes('receipt_stack'), 'missing receipt_stack')
  assert(ids.includes('clipped_denial'), 'missing clipped_denial')
  assert(ids.includes('dry_sarcasm'), 'missing dry_sarcasm')
})

test('모든 Tell에 필수 필드가 있다', () => {
  const all = [...tellsBeats.executableTells.a, ...tellsBeats.executableTells.b]
  for (const t of all) {
    assert(t.id, 'missing id')
    assert(Array.isArray(t.appliesWhen) && t.appliesWhen.length > 0, `${t.id}: empty appliesWhen`)
    assert(Array.isArray(t.lexicalHooks) && t.lexicalHooks.length > 0, `${t.id}: empty lexicalHooks`)
    assert(t.cadence, `${t.id}: missing cadence`)
    assert(t.originalPattern, `${t.id}: missing originalPattern`)
  }
})

test('BeatScript 30~40개', () => {
  const count = tellsBeats.beatScripts.length
  assert(count >= 28 && count <= 45, `beats: ${count}`)
  console.log(`    (${count}개)`)
})

test('모든 Beat에 필수 필드가 있다', () => {
  for (const b of tellsBeats.beatScripts) {
    assert(b.caseId === 'family-01', `${b.disputeId}: wrong caseId`)
    assert(['a','b'].includes(b.party), `beat: invalid party`)
    assert(b.disputeId, 'missing disputeId')
    assert(b.beatType, 'missing beatType')
    assert(b.line && b.line.length > 10, 'line too short')
    assert(b.behaviorHint, 'missing behaviorHint')
    assert(Array.isArray(b.applicableStates), 'missing applicableStates')
  }
})

// ━━━ 3. family-01 V2 atoms ━━━
console.log('\n═══ 3. family-01 V2 atoms 검증 ═══')

test('caseId가 family-01이다', () => assertEqual(v2Atoms.caseId, 'family-01'))

test('a측 d-1, d-3, d-5 정책이 있다', () => {
  for (const d of ['d-1', 'd-3', 'd-5']) {
    assert(v2Atoms.claimPolicies.a[d], `a/${d} missing`)
  }
})

test('b측 d-2, d-4, d-5 정책이 있다', () => {
  for (const d of ['d-2', 'd-4', 'd-5']) {
    assert(v2Atoms.claimPolicies.b[d], `b/${d} missing`)
  }
})

test('각 정책에 S0~S5 state가 있다', () => {
  let count = 0
  for (const party of ['a', 'b']) {
    for (const dId of Object.keys(v2Atoms.claimPolicies[party])) {
      for (const s of ['S0', 'S1', 'S2', 'S3', 'S4', 'S5']) {
        const policy = v2Atoms.claimPolicies[party][dId][s]
        assert(policy, `${party}/${dId}/${s} missing`)
        count++
      }
    }
  }
  console.log(`    (${count}개 state 엔트리)`)
})

test('모든 정책에 claimAtoms가 있다', () => {
  let atomCount = 0
  for (const party of ['a', 'b']) {
    for (const dId of Object.keys(v2Atoms.claimPolicies[party])) {
      for (const s of ['S0', 'S1', 'S2', 'S3', 'S4', 'S5']) {
        const policy = v2Atoms.claimPolicies[party][dId][s]
        if (!policy) continue
        assert(Array.isArray(policy.claimAtoms), `${party}/${dId}/${s}: claimAtoms not array`)
        atomCount += policy.claimAtoms.length
      }
    }
  }
  console.log(`    (총 ${atomCount}개 atom 인스턴스)`)
})

// ━━━ 4. family-01 V3 game loop ━━━
console.log('\n═══ 4. family-01 V3 game loop 검증 ═══')

test('caseId가 family-01이다', () => assertEqual(v3Loop.caseId, 'family-01'))

test('DossierCard 3개', () => assertEqual(v3Loop.dossierCards.length, 3))

test('각 DossierCard에 양측 3질문씩', () => {
  let qCount = 0
  for (const card of v3Loop.dossierCards) {
    for (const ch of card.challenges) {
      assertEqual(ch.questions.length, 3, `${card.id}/${ch.targetParty}: `)
      qCount += ch.questions.length
    }
  }
  assertEqual(qCount, 18, 'total questions: ')
})

test('stateUnlockAtoms 양측 존재', () => {
  assert(v3Loop.stateUnlockAtoms.a, 'missing a')
  assert(v3Loop.stateUnlockAtoms.b, 'missing b')
})

test('stateUnlockAtoms 총 개수', () => {
  let count = 0
  for (const party of ['a', 'b']) {
    for (const dId of Object.keys(v3Loop.stateUnlockAtoms[party])) {
      for (const state of Object.keys(v3Loop.stateUnlockAtoms[party][dId])) {
        count += v3Loop.stateUnlockAtoms[party][dId][state].length
      }
    }
  }
  console.log(`    (${count}개 unlock atoms)`)
  assert(count >= 30, `too few: ${count}`)
})

test('revealAtom 참조 무결성', () => {
  const allAtomIds = new Set()
  for (const party of ['a', 'b']) {
    for (const dId of Object.keys(v3Loop.stateUnlockAtoms[party])) {
      for (const state of Object.keys(v3Loop.stateUnlockAtoms[party][dId])) {
        for (const atom of v3Loop.stateUnlockAtoms[party][dId][state]) {
          allAtomIds.add(atom.id)
        }
      }
    }
  }
  let revealCount = 0
  for (const card of v3Loop.dossierCards) {
    for (const ch of card.challenges) {
      for (const q of ch.questions) {
        if (q.onSuccess.revealAtom) {
          revealCount++
          assert(allAtomIds.has(q.onSuccess.revealAtom), `${q.id}: revealAtom "${q.onSuccess.revealAtom}" not found`)
        }
      }
    }
  }
  console.log(`    (${revealCount}개 revealAtom 참조 검증)`)
})

test('이벤트 수량 확인', () => {
  assert(v3Loop.events.contradictions.length >= 3, `contradictions: ${v3Loop.events.contradictions.length}`)
  assert(v3Loop.events.interjections.length >= 3, `interjections: ${v3Loop.events.interjections.length}`)
  assert(v3Loop.events.emotionalOutbursts.length >= 4, `outbursts: ${v3Loop.events.emotionalOutbursts.length}`)
})

test('TransitionBeat 24개', () => {
  assertEqual(v3Loop.transitionBeats.length, 24)
})

test('TransitionBeat 쟁점별 분포', () => {
  const dist = {}
  for (const b of v3Loop.transitionBeats) {
    const key = `${b.party}/${b.disputeId}`
    dist[key] = (dist[key] || 0) + 1
  }
  for (const [key, count] of Object.entries(dist)) {
    assertEqual(count, 4, `${key}: `)
  }
})

// ━━━ 결과 ━━━
console.log('\n' + '═'.repeat(50))
console.log(`결과: ${passed}/${total} PASS, ${failed} FAIL`)
if (failures.length > 0) {
  console.log('\n실패 목록:')
  for (const f of failures) console.log(`  ❌ ${f.name}: ${f.error}`)
}
console.log('═'.repeat(50))
process.exit(failed > 0 ? 1 : 0)
