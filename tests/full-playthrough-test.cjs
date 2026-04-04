/**
 * 풀 플레이스루 테스트 — spouse-01
 * Phase 3 심문을 시뮬레이션하여 다양한 조합을 수십 차례 실행
 *
 * 테스트 시나리오:
 * 1. 한지석 중심 심문 (d-1, d-3, d-5 × 3가지 액션)
 * 2. 오세린 중심 심문 (d-2, d-4, d-5 × 3가지 액션)
 * 3. 교차 심문 (양측 번갈아)
 * 4. 깊이 테스트 (같은 조합 4턴 연속)
 * 5. 상태 진행 테스트 (S1 → S2 → S3 → S4 → S5)
 */
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '..', '.env') })

const API_KEY = process.env.VITE_OPENAI_API_KEY
const MODEL = 'gpt-4o'
const BASE_URL = 'https://api.openai.com/v1'

const v2Data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src/data/claimPolicies/spouse-01-v2-atoms.json'), 'utf8'))
const caseData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src/data/cases/generated/spouse-01.json'), 'utf8'))

async function callLLM(sys, usr) {
  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
    body: JSON.stringify({ model: MODEL, messages: [{ role: 'system', content: sys }, { role: 'user', content: usr }], temperature: 0.85, max_tokens: 250 }),
  })
  if (!res.ok) throw new Error(`API ${res.status}`)
  return (await res.json()).choices[0]?.message?.content ?? ''
}

// ── 엔진 재현 (간소화) ──
const RULES = {
  fact_pursuit: { primary: ['act', 'timeline', 'rule'], secondary: ['evidence', 'responsibility'], avoid: ['emotion', 'fear', 'shame'] },
  motive_search: { primary: ['motive', 'self_justification', 'responsibility'], secondary: ['act', 'fear', 'shame'], avoid: ['timeline'] },
  empathy_approach: { primary: ['emotion', 'fear', 'shame', 'relationship', 'harm'], secondary: ['motive', 'responsibility'], avoid: ['rule', 'timeline', 'counter'] },
  evidence_present: { primary: ['evidence', 'context', 'identity', 'quote'], secondary: ['act', 'timeline'], avoid: ['emotion'] },
}

function selectAtoms(atoms, subAction, recentIds = []) {
  const rule = RULES[subAction] ?? RULES.fact_pursuit
  const scored = atoms.filter(a => !a.usableInSubActions || a.usableInSubActions.includes(subAction))
    .map(a => {
      let score = 0
      for (const t of rule.primary) if (a.tags.includes(t)) score += 100
      for (const t of (rule.secondary || [])) if (a.tags.includes(t)) score += 40
      if (rule.avoid) for (const t of rule.avoid) if (a.tags.includes(t)) score -= 200
      if (recentIds.includes(a.id)) score -= (a.repeatPenalty ?? 60)
      return { ...a, score }
    })
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, 2)
}

function resolveSlots(atoms, mustUseTell, subAction) {
  const tellExact = mustUseTell === 'over_precision' || mustUseTell === 'receipt_stack'
  const isEvidence = subAction === 'evidence_present'
  const materials = []
  for (const a of atoms) {
    if (!a.slots) continue
    for (const [family, slot] of Object.entries(a.slots)) {
      if (!slot) continue
      let value
      if ((family === 'amount' || family === 'time') && !tellExact && !isEvidence) value = slot.neutral
      else if (family === 'person' || family === 'relation' || family === 'beneficiary') value = slot.judgeRef ?? slot.neutral
      else value = tellExact ? (slot.exact ?? slot.neutral) : (slot.neutral ?? slot.exact ?? Object.values(slot).find(v => typeof v === 'string'))
      if (value) materials.push(`${family}: ${value}`)
    }
  }
  return materials.length > 0 ? [...new Set(materials)].join('\n') : '(없음)'
}

function extractSubject(name) {
  let s = name.replace(/^[가-힣]+의\s+/, '').replace(/비밀\s*/g, '').replace(/\s*\d+만원\s*/g, ' ').trim()
  const words = s.split(/\s+/)
  return words.filter((w, i) => words.indexOf(w) === i).join(' ') || '해당 사안'
}

const ARCHETYPE = { avoidant: '회피형: 화제 전환, 순서/절차 앞세움. 말이 길어짐.', confrontational: '정면돌파형: 짧고 날카로움. 역공 선호.', victim_cosplay: '피해자형: 억울함/상처로 수렴.', cold_logic: '냉정논리형: 기준/금액/순서 앞세움.' }
const FOCUS = { fact_pursuit: '사실 여부를 묻고 있다. "무엇을 했는지/안 했는지"만 답하라.', motive_search: '이유를 묻고 있다. "왜 그랬는지, 왜 숨겼는지" 답하라. 사실 나열 금지.', empathy_approach: '심정을 묻고 있다. "어떤 마음이었는지" 답하라. 반격보다 감정 먼저.' }
const STANCE = { deny: '"아닙니다"로 일관', hedge: '사실 부정 말고 의미/맥락을 흐려라', partial: '저위험 인정, 핵심 축소', blame: '상대 잘못으로 초점 이동', emotional: '논리보다 심정', confess: '핵심 인정 + 사정 설명' }
const DEFENSE = { flat_denial: '사실 부정', silence: '말 아끼고 핵심 흐림', concession: '인정 쪽으로', counterattack: '역공' }

function getStanceDef(lieState, trust) {
  switch (lieState) {
    case 'S0': return { stance: 'deny', defense: 'flat_denial', sent: 1 }
    case 'S1': return { stance: 'hedge', defense: 'silence', sent: 2 }
    case 'S2': return { stance: 'partial', defense: 'concession', sent: 2 }
    case 'S3': return { stance: trust < 40 ? 'blame' : 'partial', defense: trust < 40 ? 'counterattack' : 'concession', sent: 2 }
    case 'S4': return { stance: trust >= 60 ? 'confess' : 'emotional', defense: trust >= 60 ? 'concession' : 'silence', sent: trust >= 60 ? 3 : 2 }
    case 'S5': return { stance: 'confess', defense: 'concession', sent: 3 }
    default: return { stance: 'hedge', defense: 'silence', sent: 2 }
  }
}

const JUDGE_TEMPLATES = {
  fact_pursuit: (name, subject, d) => d >= 3 ? `${name} 씨, ${subject} 건의 사실관계가 분명하지 않습니다. 다시 설명해 주십시오.` : d >= 2 ? `${name} 씨, ${subject} 건에 대해 좀 더 구체적으로 말씀해 주십시오.` : `${name} 씨, ${subject} 건에 대해 사실 여부를 확인하겠습니다.`,
  motive_search: (name, subject, d) => d >= 3 ? `${name} 씨, ${subject} 건을 미리 밝히지 않은 이유가 있다면 지금 말씀하실 기회입니다.` : d >= 2 ? `${name} 씨, ${subject} 건에서 왜 그런 선택을 하셨습니까?` : `${name} 씨, ${subject} 건과 관련하여 그렇게 하신 이유가 무엇입니까?`,
  empathy_approach: (name, subject, d) => d >= 3 ? `${name} 씨, ${subject} 건에서 미리 말하지 못한 것이 어떤 마음 때문이었습니까?` : d >= 2 ? `${name} 씨, ${subject} 건 당시 가장 어려웠던 부분이 무엇이었습니까?` : `${name} 씨, ${subject} 건에 대해 당시 어떤 심정이셨는지 말씀해 주시겠습니까?`,
}

function buildPrompt(profile, atoms, slotMaterial, stance, defense, subAction, suppression, privateKnowledge, judgeRef, callForm, sent, mustUseTell) {
  const atomLabels = atoms.map(a => `- ${a.factText}`).join('\n')
  const tellHint = mustUseTell === 'over_precision' ? '\n## 말버릇\n숫자가 정밀해지는 버릇. 표현 재료의 exact 값을 넣어라.' : mustUseTell === 'counter_question' ? '\n## 말버릇\n되묻기. 마지막 문장을 의문형으로.' : ''

  return `너는 "${profile.name}"이다. ${profile.age}세, ${profile.occupation}.

## 캐릭터
${ARCHETYPE[profile.archetype] ?? ''}

## 이번 턴 지시서
- 태도: ${STANCE[stance] ?? stance}
- 방어: ${DEFENSE[defense] ?? defense}
- 문장 수: ${sent}문장

## 답변 초점
${FOCUS[subAction] ?? '사실에 대해 답하라.'}

## 이번 턴 말할 수 있는 의미
${atomLabels}

## 표현 재료
${slotMaterial}

## 숨기는 것
${privateKnowledge.slice(0, 3).map(k => `- ${k}`).join('\n')}

## 금지
${suppression.slice(0, 3).map(s => `- ❌ ${s}`).join('\n')}
${tellHint}

## 호칭
- 재판관: 존댓말
- 상대 언급(재판관에게): "${judgeRef}"
- 상대에게 직접: "${callForm}"

## 출력
JSON { "npcResponse": "대사", "behaviorHint": "행동묘사" }
- ${sent}문장. 의미 라벨을 복사하지 마라. 캐릭터 말투로 표현.
- 이전 턴과 다른 표현을 써라.`
}

// ── 테스트 시나리오 ──
const allResults = []
let testNum = 0

async function runTurn(label, party, disputeId, state, subAction, depth, mustUseTell, recentAtomIds) {
  testNum++
  const profile = party === 'a' ? caseData.duo.partyA : caseData.duo.partyB
  const policy = v2Data.claimPolicies[party]?.[disputeId]?.[state]
  if (!policy?.claimAtoms) { console.log(`  ⏭️ #${testNum} ${label}: atoms 없음`); return null }

  const atoms = selectAtoms(policy.claimAtoms, subAction, recentAtomIds ?? [])
  const slotMaterial = resolveSlots(atoms, mustUseTell, subAction)
  const { stance, defense, sent } = getStanceDef(state, 30)
  const dispute = caseData.disputes.find(d => d.id === disputeId)
  const subject = dispute ? extractSubject(dispute.name) : '해당 사안'
  const judgeQ = (JUDGE_TEMPLATES[subAction] ?? JUDGE_TEMPLATES.fact_pursuit)(profile.name, subject, depth)
  const judgeRef = party === 'a' ? '제 아내' : '제 남편'
  const callForm = profile.callTerms?.toPartner === '자기' ? '자기야' : (profile.callTerms?.toPartner ?? '상대방')

  const sys = buildPrompt(profile, atoms, slotMaterial, stance, defense, subAction, policy.suppressions ?? [], policy.privateKnowledge ?? [], judgeRef, callForm, sent, mustUseTell)
  const usr = `재판관 질문: ${judgeQ}\n${sent}문장으로 연기하라.\n출력: JSON { "npcResponse": "...", "behaviorHint": "..." }`

  try {
    const raw = await callLLM(sys, usr)
    const parsed = JSON.parse((raw.match(/\{[\s\S]*\}/) ?? ['{}'])[0])
    const resp = parsed.npcResponse ?? raw.slice(0, 200)

    // 자동 검증
    const issues = []
    if (resp.includes('그런 적 없습니다') && stance !== 'deny') issues.push('non-deny에서 deny')
    if (resp.includes('자기가')) issues.push('재판관앞 애칭')
    if (resp.includes('9월 20일 기준으로')) issues.push('"9월20일기준" 패턴')
    if (resp.includes('2,800,000원') && !mustUseTell) issues.push('tell없이 exact금액')
    if (resp.includes('순서가 있') && state !== 'S0' && state !== 'S1') issues.push('"순서" 고착')
    if (resp.length < 10) issues.push('너무짧음')
    if (resp.includes('그런 적 없습니다') && resp.includes('맞지만')) issues.push('자기모순')
    // 호칭 체크
    if (party === 'b' && resp.includes('지석 씨')) issues.push('이름호칭(지석씨)')
    if (party === 'a' && resp.includes('세린 씨')) issues.push('이름호칭(세린씨)')

    const status = issues.length === 0 ? '✅' : '⚠️'
    console.log(`  ${status} #${testNum} ${label} [${state}/${subAction}/${stance}] ${issues.length > 0 ? issues.join(', ') : ''}`)
    console.log(`     재판관: ${judgeQ.slice(0, 60)}`)
    console.log(`     ${profile.name}: ${resp.slice(0, 80)}`)
    if (parsed.behaviorHint) console.log(`     🎭 ${parsed.behaviorHint.slice(0, 40)}`)
    console.log()

    allResults.push({ num: testNum, label, party, disputeId, state, subAction, stance, defense, judgeQ, response: resp, hint: parsed.behaviorHint, issues, atoms: atoms.map(a => a.factText) })
    return { resp, atomIds: atoms.map(a => a.id) }
  } catch (e) {
    console.log(`  ❌ #${testNum} ${label}: ${e.message}`)
    allResults.push({ num: testNum, label, error: e.message })
    return null
  }
}

async function delay(ms) { return new Promise(r => setTimeout(r, ms)) }

async function main() {
  console.log('═══════════════════════════════════════════════════')
  console.log('  Solomon V2 풀 플레이스루 테스트')
  console.log(`  모델: ${MODEL} | ${new Date().toISOString()}`)
  console.log('═══════════════════════════════════════════════════\n')

  // ── 시나리오 1: 한지석 전 쟁점 × 전 액션 (9턴) ──
  console.log('━━━ 시나리오 1: 한지석 전 쟁점 × 전 액션 ━━━')
  for (const d of ['d-1', 'd-3', 'd-5']) {
    for (const q of ['fact_pursuit', 'motive_search', 'empathy_approach']) {
      await runTurn(`한지석 ${d} ${q}`, 'a', d, 'S1', q, 1, null, [])
      await delay(2500)
    }
  }

  // ── 시나리오 2: 오세린 전 쟁점 × 전 액션 (9턴) ──
  console.log('━━━ 시나리오 2: 오세린 전 쟁점 × 전 액션 ━━━')
  for (const d of ['d-2', 'd-4', 'd-5']) {
    for (const q of ['fact_pursuit', 'motive_search', 'empathy_approach']) {
      await runTurn(`오세린 ${d} ${q}`, 'b', d, 'S1', q, 1, null, [])
      await delay(2500)
    }
  }

  // ── 시나리오 3: 깊이 테스트 — 한지석 d-1 사실추궁 4턴 연속 ──
  console.log('━━━ 시나리오 3: 한지석 d-1 사실추궁 4턴 연속 ━━━')
  let recentIds = []
  for (let i = 1; i <= 4; i++) {
    const r = await runTurn(`d-1 depth=${i}`, 'a', 'd-1', 'S1', 'fact_pursuit', i, null, recentIds)
    if (r) recentIds = [...recentIds, ...r.atomIds].slice(-4)
    await delay(2500)
  }

  // ── 시나리오 4: 상태 진행 — 한지석 d-1 S1→S5 ──
  console.log('━━━ 시나리오 4: 한지석 d-1 상태 진행 S1→S5 ━━━')
  for (const s of ['S1', 'S2', 'S3', 'S4', 'S5']) {
    await runTurn(`d-1 ${s}`, 'a', 'd-1', s, 'fact_pursuit', 1, null, [])
    await delay(2500)
  }

  // ── 시나리오 5: 교차 심문 — 양측 번갈아 ──
  console.log('━━━ 시나리오 5: 교차 심문 ━━━')
  await runTurn('한지석 d-1 fact', 'a', 'd-1', 'S1', 'fact_pursuit', 1, null, [])
  await delay(2500)
  await runTurn('오세린 d-2 fact', 'b', 'd-2', 'S1', 'fact_pursuit', 1, null, [])
  await delay(2500)
  await runTurn('한지석 d-1 motive', 'a', 'd-1', 'S1', 'motive_search', 2, null, [])
  await delay(2500)
  await runTurn('오세린 d-2 empathy', 'b', 'd-2', 'S1', 'empathy_approach', 2, null, [])
  await delay(2500)

  // ── 시나리오 6: tell 발동 비교 ──
  console.log('━━━ 시나리오 6: tell 발동 비교 ━━━')
  await runTurn('tell 없음', 'a', 'd-1', 'S1', 'fact_pursuit', 1, null, [])
  await delay(2500)
  await runTurn('over_precision', 'a', 'd-1', 'S1', 'fact_pursuit', 1, 'over_precision', [])
  await delay(2500)
  await runTurn('counter_question', 'a', 'd-1', 'S1', 'fact_pursuit', 1, 'counter_question', [])
  await delay(2500)

  // ── 시나리오 7: 오세린 상태 진행 d-2 S1→S5 ──
  console.log('━━━ 시나리오 7: 오세린 d-2 상태 진행 S1→S5 ━━━')
  for (const s of ['S1', 'S2', 'S3', 'S4', 'S5']) {
    await runTurn(`d-2 ${s}`, 'b', 'd-2', s, 'fact_pursuit', 1, null, [])
    await delay(2500)
  }

  // ── 종합 리포트 ──
  console.log('\n═══════════════════════════════════════════════════')
  console.log('  종합 리포트')
  console.log('═══════════════════════════════════════════════════\n')

  const total = allResults.filter(r => !r.error).length
  const passed = allResults.filter(r => !r.error && r.issues.length === 0).length
  const failed = allResults.filter(r => !r.error && r.issues.length > 0).length
  const errors = allResults.filter(r => r.error).length

  console.log(`총 ${allResults.length}턴 | ✅ ${passed} PASS | ⚠️ ${failed} WARNING | ❌ ${errors} ERROR\n`)

  // 이슈 집계
  const issueCounts = {}
  for (const r of allResults) {
    if (r.issues) for (const i of r.issues) issueCounts[i] = (issueCounts[i] ?? 0) + 1
  }
  if (Object.keys(issueCounts).length > 0) {
    console.log('이슈 빈도:')
    for (const [issue, count] of Object.entries(issueCounts).sort((a, b) => b[1] - a[1])) {
      console.log(`  ${count}회 — ${issue}`)
    }
  } else {
    console.log('이슈 없음!')
  }

  // 시나리오별 요약
  console.log('\n시나리오별 상태 진행 (한지석 d-1):')
  for (const r of allResults.filter(r => r.label?.startsWith('d-1 S'))) {
    console.log(`  ${r.state}: [${r.stance}] ${r.response?.slice(0, 60) ?? 'N/A'}`)
  }

  console.log('\n시나리오별 상태 진행 (오세린 d-2):')
  for (const r of allResults.filter(r => r.label?.startsWith('d-2 S'))) {
    console.log(`  ${r.state}: [${r.stance}] ${r.response?.slice(0, 60) ?? 'N/A'}`)
  }

  // 저장
  const reportPath = path.join(__dirname, '..', 'docs/ref/리뉴얼참고/full-playthrough-results.json')
  fs.writeFileSync(reportPath, JSON.stringify(allResults, null, 2))
  console.log(`\n결과 저장: ${reportPath}`)
}

main().catch(console.error)
