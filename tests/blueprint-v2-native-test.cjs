/**
 * V2 네이티브 atom LLM 테스트
 * 실제 V2 claimAtoms 데이터로 atom 선택 → slot 해석 → 프롬프트 → LLM 호출
 */
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '..', '.env') })

const API_KEY = process.env.VITE_OPENAI_API_KEY
const MODEL = 'gpt-4o-mini'
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

// ── atom 선택 엔진 재현 ──
const RULES = {
  fact_pursuit: { primary: ['act', 'timeline', 'rule'], secondary: ['evidence', 'responsibility'], avoid: ['emotion', 'fear', 'shame'], exactDefault: false },
  motive_search: { primary: ['motive', 'self_justification', 'responsibility'], secondary: ['act', 'fear', 'shame'], avoid: ['timeline'], exactDefault: false },
  empathy_approach: { primary: ['emotion', 'fear', 'shame', 'relationship', 'harm'], secondary: ['motive', 'responsibility'], avoid: ['rule', 'timeline', 'counter'], exactDefault: false },
  evidence_present: { primary: ['evidence', 'context', 'identity', 'quote'], secondary: ['act', 'timeline'], avoid: ['emotion'], exactDefault: true },
}

function selectAtoms(atoms, subAction, recentIds = []) {
  const rule = RULES[subAction] ?? RULES.fact_pursuit
  const scored = atoms.filter(a => {
    if (a.usableInSubActions && !a.usableInSubActions.includes(subAction)) return false
    return true
  }).map(a => {
    let score = 0
    for (const t of rule.primary) if (a.tags.includes(t)) score += 100
    for (const t of rule.secondary) if (a.tags.includes(t)) score += 40
    if (rule.avoid) for (const t of rule.avoid) if (a.tags.includes(t)) score -= 200
    if (recentIds.includes(a.id)) score -= (a.repeatPenalty ?? 60)
    return { ...a, score }
  })
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, 2)
}

function resolveSlots(atoms, mustUseTell, subAction) {
  const tellExact = mustUseTell === 'over_precision' || mustUseTell === 'receipt_stack'
  const rule = RULES[subAction]
  const materials = []
  for (const a of atoms) {
    if (!a.slots) continue
    for (const [family, slot] of Object.entries(a.slots)) {
      if (!slot) continue
      let value
      if ((family === 'amount' || family === 'time') && !tellExact && !rule?.exactDefault) {
        value = slot.neutral
      } else if (family === 'person' || family === 'relation' || family === 'beneficiary') {
        value = slot.judgeRef ?? slot.neutral
      } else {
        value = slot.exact ?? slot.neutral ?? Object.values(slot).find(v => typeof v === 'string')
      }
      if (value) materials.push(`${family}: ${value}`)
    }
  }
  return materials.length > 0 ? materials.join('\n') : '(없음)'
}

// ── 프롬프트 ──
const ARCHETYPE = { avoidant: '회피형: 화제 전환, 순서/절차 앞세움. 말이 길어짐.', confrontational: '정면돌파형: 짧고 날카로움. 역공 선호.' }
const FOCUS = {
  fact_pursuit: '사실 여부를 묻고 있다. "무엇을 했는지/안 했는지"만 답하라.',
  motive_search: '이유를 묻고 있다. "왜 그랬는지, 왜 숨겼는지" 답하라. 사실 나열 금지.',
  empathy_approach: '심정을 묻고 있다. "어떤 마음이었는지" 답하라. 반격보다 감정 먼저.',
}
const STANCE = { deny: '"아닙니다"로 일관', hedge: '사실 부정 말고 의미/맥락을 흐려라', partial: '저위험 인정, 핵심 축소', blame: '상대 잘못으로 초점 이동', emotional: '논리보다 심정', confess: '핵심 인정 + 사정 설명' }
const DEFENSE = { flat_denial: '사실 부정', silence: '말 아끼고 핵심 흐림', concession: '인정 쪽으로', counterattack: '역공' }

function buildPrompt(profile, atoms, slotMaterial, stance, defenseMode, subAction, suppression, privateKnowledge, judgeRef, callForm, sentenceCount, mustUseTell) {
  const atomLabels = atoms.map(a => `- ${a.factText}`).join('\n')
  const tellHint = mustUseTell === 'over_precision' ? '\n## 말버릇\n숫자가 정밀해지는 버릇. 표현 재료의 exact 값을 넣어라.' : mustUseTell === 'counter_question' ? '\n## 말버릇\n되묻기. 마지막 문장을 의문형으로.' : ''

  return `너는 "${profile.name}"이다. ${profile.age}세, ${profile.occupation}.

## 캐릭터
${ARCHETYPE[profile.archetype] ?? ''}

## 이번 턴 지시서
- 태도: ${STANCE[stance] ?? stance}
- 방어: ${DEFENSE[defenseMode] ?? defenseMode}
- 문장 수: ${sentenceCount}문장

## 답변 초점
${FOCUS[subAction]}

## 이번 턴 말할 수 있는 의미
${atomLabels}

## 표현 재료 (이 단어를 활용하라)
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
- ${sentenceCount}문장. 의미 라벨을 복사하지 마라. 캐릭터 말투로 표현.
- 표현 재료를 활용하되 기계적 나열 금지.
- 이전 턴과 다른 표현을 써라.`
}

// ── 테스트 실행 ──
const results = []

async function run(label, party, disputeId, state, subAction, stance, defenseMode, judgeQ, mustUseTell, recentIds) {
  const profile = party === 'a' ? caseData.duo.partyA : caseData.duo.partyB
  const policy = v2Data.claimPolicies[party]?.[disputeId]?.[state]
  if (!policy?.claimAtoms) { console.log(`  ⏭️ ${label}: V2 atoms 없음`); return null }

  const atoms = selectAtoms(policy.claimAtoms, subAction, recentIds ?? [])
  const slotMaterial = resolveSlots(atoms, mustUseTell, subAction)
  const sentenceCount = stance === 'confess' ? 3 : ['emotional', 'partial', 'blame', 'hedge'].includes(stance) ? 2 : 1
  const judgeRef = party === 'a' ? '제 아내' : '제 남편'
  const callForm = profile.callTerms?.toPartner === '자기' ? '자기야' : (profile.callTerms?.toPartner ?? '상대방')

  const sys = buildPrompt(profile, atoms, slotMaterial, stance, defenseMode, subAction, policy.suppressions, policy.privateKnowledge, judgeRef, callForm, sentenceCount, mustUseTell)
  const usr = `재판관 질문: ${judgeQ}\n${sentenceCount}문장으로 연기하라.\n출력: JSON { "npcResponse": "...", "behaviorHint": "..." }`

  console.log(`  ⏳ ${label}`)
  console.log(`     atoms: ${atoms.map(a => a.factText).join(' | ')}`)
  console.log(`     slots: ${slotMaterial.replace(/\n/g, ', ')}`)

  try {
    const raw = await callLLM(sys, usr)
    const parsed = JSON.parse((raw.match(/\{[\s\S]*\}/) ?? ['{}'])[0])
    const resp = parsed.npcResponse ?? raw
    console.log(`  📝 ${judgeQ}`)
    console.log(`  💬 ${profile.name}: ${resp}`)
    console.log(`  🎭 ${parsed.behaviorHint ?? '-'}\n`)
    results.push({ label, response: resp, hint: parsed.behaviorHint, atoms: atoms.map(a => a.factText), stance, subAction })
    return resp
  } catch (e) { console.log(`  ❌ ${label}: ${e.message}\n`); return null }
}

async function main() {
  console.log('═══ V2 네이티브 Atom LLM 테스트 ═══')
  console.log(`모델: ${MODEL} | ${new Date().toISOString()}\n`)

  // TC-1: 하위 액션 차별화
  console.log('── TC-1: 한지석 d-1 S1 ──')
  await run('사실추궁', 'a', 'd-1', 'S1', 'fact_pursuit', 'hedge', 'silence', '한지석 씨, 해당 사안에 대해 사실 여부를 확인하겠습니다.', null)
  await new Promise(r => setTimeout(r, 3000))
  await run('동기탐색', 'a', 'd-1', 'S1', 'motive_search', 'partial', 'concession', '한지석 씨, 그렇게 하신 이유가 무엇입니까?', null)
  await new Promise(r => setTimeout(r, 3000))
  await run('공감접근', 'a', 'd-1', 'S1', 'empathy_approach', 'hedge', 'silence', '한지석 씨, 당시 어떤 심정이셨는지 말씀해 주시겠습니까?', null)
  await new Promise(r => setTimeout(r, 3000))

  // TC-2: 캐릭터 차이
  console.log('── TC-2: d-5 S1 사실추궁 ──')
  await run('한지석(avoidant)', 'a', 'd-5', 'S1', 'fact_pursuit', 'hedge', 'silence', '한지석 씨, 해당 사안에 대해 사실 여부를 확인하겠습니다.', null)
  await new Promise(r => setTimeout(r, 3000))
  await run('오세린(confrontational)', 'b', 'd-5', 'S1', 'fact_pursuit', 'hedge', 'silence', '오세린 씨, 해당 사안에 대해 사실 여부를 확인하겠습니다.', null)
  await new Promise(r => setTimeout(r, 3000))

  // TC-5: 반복 방지 ×3
  console.log('── TC-5: 한지석 d-1 S1 ×3 (tell 없음) ──')
  const r1 = await run('1회차', 'a', 'd-1', 'S1', 'fact_pursuit', 'hedge', 'silence', '한지석 씨, 사실 여부를 확인하겠습니다.', null)
  await new Promise(r => setTimeout(r, 3000))
  await run('2회차', 'a', 'd-1', 'S1', 'fact_pursuit', 'hedge', 'silence', '한지석 씨, 좀 더 구체적으로 설명해 주십시오.', null, ['d1.transfer_ack'])
  await new Promise(r => setTimeout(r, 3000))
  await run('3회차', 'a', 'd-1', 'S1', 'fact_pursuit', 'hedge', 'silence', '한지석 씨, 사실관계가 불분명합니다.', null, ['d1.transfer_ack', 'd1.purpose_withhold'])
  await new Promise(r => setTimeout(r, 3000))

  // TC-5b: tell 발동
  console.log('── TC-5b: over_precision tell ──')
  await run('tell 발동', 'a', 'd-1', 'S1', 'fact_pursuit', 'hedge', 'silence', '한지석 씨, 정확한 금액과 시점을 말씀해 주십시오.', 'over_precision')
  await new Promise(r => setTimeout(r, 3000))

  // TC-7: 호칭
  console.log('── TC-7: 오세린 호칭 ──')
  await run('호칭 체크', 'b', 'd-1', 'S1', 'fact_pursuit', 'hedge', 'silence', '오세린 씨, 남편분의 송금에 대해 어떻게 생각하십니까?', null)

  // ── 검증 ──
  console.log('\n═══ 자동 검증 ═══')
  for (const r of results) {
    const issues = []
    if (r.response.includes('그런 적 없습니다') && r.stance !== 'deny') issues.push('non-deny에서 deny')
    if (r.response.includes('자기가')) issues.push('재판관 앞 애칭')
    if (r.response.includes('9월 20일 기준으로')) issues.push('⚠️ "9월 20일 기준으로" 패턴')
    if (r.response.includes('2,800,000원') && r.subAction !== 'evidence_present' && !r.label.includes('tell')) issues.push('⚠️ tell 없이 exact 금액')
    if (r.response.includes('순서가 있') || r.response.includes('순서가 필요')) issues.push('⚠️ "순서" 반복 패턴')
    console.log(`  ${issues.length === 0 ? '✅' : '⚠️'} ${r.label}: ${issues.length === 0 ? 'OK' : issues.join(', ')}`)
  }

  fs.writeFileSync(path.join(__dirname, '..', 'docs/ref/리뉴얼참고/v2-native-llm-test-results.json'), JSON.stringify(results, null, 2))
  console.log('\n결과 저장 완료')
}

main().catch(console.error)
