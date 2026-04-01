/**
 * Blueprint V2 LLM 응답 검증 — legacy 합성 atom 경로
 * publicClaim → 자동 atom 합성 → V2 프롬프트 → LLM 호출
 */

const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '..', '.env') })

const API_KEY = process.env.VITE_OPENAI_API_KEY
if (!API_KEY) { console.error('❌ API key not found'); process.exit(1) }

const MODEL = 'gpt-4o-mini'
const BASE_URL = 'https://api.openai.com/v1'

const session1 = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src/data/claimPolicies/spouse-01-data.json'), 'utf8'))
const caseData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src/data/cases/generated/spouse-01.json'), 'utf8'))

async function callLLM(systemPrompt, userPrompt) {
  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
    body: JSON.stringify({ model: MODEL, messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userPrompt }], temperature: 0.85, max_tokens: 250 }),
  })
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`)
  const data = await res.json()
  return data.choices[0]?.message?.content ?? ''
}

// ── atom 합성 (atomSelectionEngine.synthesizeLegacyAtoms 재현) ──
function synthesizeAtoms(publicClaim, disputeId) {
  return publicClaim.map((text, i) => {
    const amountMatch = text.match(/[\d,]+원/)
    const dateMatch = text.match(/\d+월\s*\d+일/)
    const slots = {}
    if (amountMatch) slots.amount = { exact: amountMatch[0], neutral: '해당 금액' }
    if (dateMatch) slots.time = { dateExact: dateMatch[0], neutral: '그 시점' }

    const tags = ['legacy_sentence']
    if (text.includes('맞습니다') || text.includes('사실')) tags.push('act', 'admission')
    if (text.includes('이유') || text.includes('때문') || text.includes('판단')) tags.push('motive')
    if (text.includes('힘들') || text.includes('마음') || text.includes('두려') || text.includes('복잡')) tags.push('emotion')
    if (text.includes('약속') || text.includes('상의')) tags.push('rule')
    if (text.includes('잘못') || text.includes('책임')) tags.push('responsibility')
    if (tags.length === 1) tags.push('act')

    return {
      id: `legacy:${disputeId}:${i}`,
      factText: text.replace(/[\d,]+원/g, '해당 금액').replace(/\d+월\s*\d+일/g, '해당 시점').slice(0, 40),
      tags, slots: Object.keys(slots).length > 0 ? slots : undefined,
    }
  })
}

// ── atom 선택 (subAction 기반) ──
const RULES = {
  fact_pursuit: { primary: ['act', 'timeline', 'rule'], avoid: ['emotion', 'fear', 'shame'] },
  motive_search: { primary: ['motive', 'self_justification', 'responsibility'], avoid: ['timeline'] },
  empathy_approach: { primary: ['emotion', 'fear', 'shame', 'relationship'], avoid: ['rule', 'timeline', 'counter'] },
}

function selectAtoms(atoms, subAction) {
  const rule = RULES[subAction] ?? RULES.fact_pursuit
  const scored = atoms.map(a => {
    let score = 0
    for (const t of rule.primary) if (a.tags.includes(t)) score += 100
    if (rule.avoid) for (const t of rule.avoid) if (a.tags.includes(t)) score -= 200
    return { ...a, score }
  })
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, 2)
}

function resolveSlots(atoms, subAction, mustUseTell) {
  const tellExact = mustUseTell === 'over_precision' || mustUseTell === 'receipt_stack'
  const materials = []
  for (const a of atoms) {
    if (!a.slots) continue
    if (a.slots.amount) {
      materials.push(`금액: ${tellExact ? (a.slots.amount.exact ?? a.slots.amount.neutral) : a.slots.amount.neutral}`)
    }
    if (a.slots.time) {
      materials.push(`시점: ${tellExact ? (a.slots.time.dateExact ?? a.slots.time.neutral) : a.slots.time.neutral}`)
    }
  }
  return materials.length > 0 ? materials.join('\n') : '(특별한 표현 재료 없음)'
}

// ── 프롬프트 빌더 V2 ──
const ARCHETYPE = {
  avoidant: '회피형: 직접 부정보다 화제 전환, 순서/절차를 앞세움. 곤란하면 말이 길어짐.',
  confrontational: '정면돌파형: 짧고 날카롭게. 방어보다 역공. 인정할 때도 주도권을 잡으려 함.',
}
const ANSWER_FOCUS = {
  fact_pursuit: '재판관이 사실 여부를 묻고 있다. "무엇을 했는지/안 했는지"에 대해서만 답하라.',
  motive_search: '재판관이 이유를 묻고 있다. "왜 그랬는지, 왜 숨겼는지"에 대해 답하라. 사실 나열 금지.',
  empathy_approach: '재판관이 심정을 묻고 있다. "어떤 마음이었는지"에 대해 답하라. 반격보다 감정을 먼저.',
}
const STANCE_LABELS = { deny: '"아닙니다"로 일관', hedge: '사실을 부정하지 말고 의미/맥락을 흐려라', partial: '저위험 인정, 핵심 축소', blame: '상대 잘못으로 초점 이동', emotional: '논리보다 심정으로', confess: '핵심 인정 + 사정 설명' }
const DEFENSE_LABELS = { flat_denial: '사실 부정', silence: '말 아끼고 핵심 흐림', concession: '인정 쪽으로', counterattack: '역공', context_attack: '맥락 문제 삼기' }

function buildV2Prompt(profile, atoms, slotMaterial, stance, defenseMode, subAction, suppression, privateKnowledge, judgeRef, callForm, sentenceCount, mustUseTell) {
  const atomLabels = atoms.map(a => `- ${a.factText}`).join('\n')
  const archGuide = ARCHETYPE[profile.archetype] ?? ''
  const tellHint = mustUseTell === 'over_precision' ? '\n## 말버릇\n숫자가 정밀해지는 버릇. 표현 재료의 exact 값을 자연스럽게 넣어라.' :
    mustUseTell === 'counter_question' ? '\n## 말버릇\n되묻는 버릇. 마지막 문장을 의문형으로.' : ''

  return `너는 "${profile.name}"이다. ${profile.age}세, ${profile.occupation}.

## 캐릭터
${archGuide}
말투: ${profile.speechStyle}

## 이번 턴 지시서
- 태도: ${STANCE_LABELS[stance] ?? stance}
- 방어: ${DEFENSE_LABELS[defenseMode] ?? defenseMode}
- 문장 수: ${sentenceCount}문장

## 답변 초점
${ANSWER_FOCUS[subAction]}

## 이번 턴 말할 수 있는 의미
${atomLabels}

## 표현 재료
${slotMaterial}

## 숨기는 것
${privateKnowledge.map(k => `- ${k}`).join('\n')}

## 금지
${suppression.map(s => `- ❌ ${s}`).join('\n')}
${tellHint}

## 호칭
- 재판관: 존댓말 (~습니다)
- 상대 언급(재판관에게): "${judgeRef}"
- 상대에게 직접: "${callForm}"

## 출력
JSON { "npcResponse": "대사", "behaviorHint": "행동묘사" }
- ${sentenceCount}문장. 의미 라벨을 복사하지 마라. 캐릭터 말투로 자연스럽게 표현하라.
- 표현 재료의 단어를 활용하되 기계적으로 나열하지 마라.
- 이전 턴과 다른 표현을 써라.`
}

// ── TC 실행 ──
const allResults = []

async function runTest(label, party, disputeId, state, subAction, stance, defenseMode, judgeQ, mustUseTell) {
  const profile = party === 'a' ? caseData.duo.partyA : caseData.duo.partyB
  const policy = session1.claimPolicies[party]?.[disputeId]?.[state]
  if (!policy) { console.log(`  ⏭️ ${label}: policy 없음`); return null }

  const atoms = synthesizeAtoms(policy.publicClaim, disputeId)
  const selected = selectAtoms(atoms, subAction)
  const slotMaterial = resolveSlots(selected, subAction, mustUseTell)
  const sentenceCount = stance === 'confess' ? 3 : ['emotional', 'partial', 'blame', 'hedge'].includes(stance) ? 2 : 1

  const judgeRef = party === 'a' ? '제 아내' : '제 남편'
  const callForm = profile.callTerms?.toPartner === '자기' ? '자기야' : (profile.callTerms?.toPartner ?? '상대방')

  const systemPrompt = buildV2Prompt(profile, selected, slotMaterial, stance, defenseMode, subAction, policy.suppressions, policy.privateKnowledge, judgeRef, callForm, sentenceCount, mustUseTell)
  const userPrompt = `재판관 질문: ${judgeQ}\n지시서: ${stance}/${defenseMode}, ${sentenceCount}문장\n출력: JSON { "npcResponse": "...", "behaviorHint": "..." }`

  console.log(`  ⏳ ${label}...`)
  console.log(`     atoms: ${selected.map(a => a.factText).join(' | ')}`)
  console.log(`     slots: ${slotMaterial.replace(/\n/g, ', ')}`)

  try {
    const raw = await callLLM(systemPrompt, userPrompt)
    const jsonMatch = raw.match(/\{[\s\S]*\}/)
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { npcResponse: raw }
    const response = parsed.npcResponse ?? raw

    console.log(`  📝 재판관: ${judgeQ}`)
    console.log(`  💬 ${profile.name}: ${response}`)
    console.log(`  🎭 ${parsed.behaviorHint ?? '(없음)'}`)
    console.log()

    allResults.push({ label, judgeQ, response, hint: parsed.behaviorHint, stance, subAction, atoms: selected.map(a => a.factText) })
    return response
  } catch (err) {
    console.log(`  ❌ ${label}: ${err.message}\n`)
    return null
  }
}

async function main() {
  console.log('═══ V2 Legacy Atom LLM 테스트 ═══')
  console.log(`모델: ${MODEL} | 시각: ${new Date().toISOString()}\n`)

  // TC-1: 하위 액션 차별화
  console.log('── TC-1: 한지석 d-1 S1 — 사실추궁 / 동기탐색 / 공감접근 ──')
  await runTest('사실추궁', 'a', 'd-1', 'S1', 'fact_pursuit', 'hedge', 'silence', '한지석 씨, 해당 사안에 대해 사실 여부를 확인하겠습니다. 말씀해 주십시오.', null)
  await new Promise(r => setTimeout(r, 3000))
  await runTest('동기탐색', 'a', 'd-1', 'S1', 'motive_search', 'partial', 'concession', '한지석 씨, 그렇게 하신 이유가 무엇입니까?', null)
  await new Promise(r => setTimeout(r, 3000))
  await runTest('공감접근', 'a', 'd-1', 'S1', 'empathy_approach', 'hedge', 'silence', '한지석 씨, 당시 어떤 심정이셨는지 말씀해 주시겠습니까?', null)
  await new Promise(r => setTimeout(r, 3000))

  // TC-2: 캐릭터 차이
  console.log('── TC-2: d-5 S1 사실추궁 — 한지석 vs 오세린 ──')
  await runTest('한지석(avoidant)', 'a', 'd-5', 'S1', 'fact_pursuit', 'hedge', 'silence', '한지석 씨, 해당 사안에 대해 사실 여부를 확인하겠습니다.', null)
  await new Promise(r => setTimeout(r, 3000))
  await runTest('오세린(confrontational)', 'b', 'd-5', 'S1', 'fact_pursuit', 'hedge', 'silence', '오세린 씨, 해당 사안에 대해 사실 여부를 확인하겠습니다.', null)
  await new Promise(r => setTimeout(r, 3000))

  // TC-5: 반복 방지 (tell 없이 3회)
  console.log('── TC-5: 한지석 d-1 S1 사실추궁 ×3 (tell 없음) ──')
  await runTest('1회차', 'a', 'd-1', 'S1', 'fact_pursuit', 'hedge', 'silence', '한지석 씨, 사실 여부를 확인하겠습니다.', null)
  await new Promise(r => setTimeout(r, 3000))
  await runTest('2회차', 'a', 'd-1', 'S1', 'fact_pursuit', 'hedge', 'silence', '한지석 씨, 좀 더 구체적으로 설명해 주십시오.', null)
  await new Promise(r => setTimeout(r, 3000))
  await runTest('3회차', 'a', 'd-1', 'S1', 'fact_pursuit', 'hedge', 'silence', '한지석 씨, 사실관계가 불분명합니다. 다시 설명해 주십시오.', null)
  await new Promise(r => setTimeout(r, 3000))

  // TC-5b: tell 있을 때 (over_precision)
  console.log('── TC-5b: 한지석 d-1 S1 사실추궁 (over_precision tell) ──')
  await runTest('tell 발동', 'a', 'd-1', 'S1', 'fact_pursuit', 'hedge', 'silence', '한지석 씨, 정확한 금액과 시점을 말씀해 주십시오.', 'over_precision')
  await new Promise(r => setTimeout(r, 3000))

  // TC-7: 호칭
  console.log('── TC-7: 오세린 d-1 S1 (호칭 체크) ──')
  await runTest('호칭 체크', 'b', 'd-1', 'S1', 'fact_pursuit', 'hedge', 'silence', '오세린 씨, 남편분의 송금에 대해 어떻게 생각하십니까?', null)

  // ── 요약 ──
  console.log('\n═══ 자동 검증 ═══')
  for (const r of allResults) {
    const issues = []
    if (r.response.includes('그런 적 없습니다') && r.stance !== 'deny') issues.push('non-deny에서 deny 표현')
    if (r.response.includes('자기가') || r.response.match(/자기야[,\s]/)) issues.push('재판관 앞 애칭')
    if (r.response.length < 10) issues.push('너무 짧음')
    if (r.response.includes('그런 적 없습니다') && r.response.includes('맞지만')) issues.push('자기모순')
    // V2 핵심: "9월 20일 기준으로" 반복 체크
    if (r.response.includes('9월 20일 기준으로')) issues.push('⚠️ "9월 20일 기준으로" 패턴')
    if (r.response.includes('2,800,000원') && !r.atoms?.some(a => a.includes('exact'))) issues.push('⚠️ exact 금액 노출 (tell 없이)')

    console.log(`  ${issues.length === 0 ? '✅' : '⚠️'} ${r.label}: ${issues.length === 0 ? 'OK' : issues.join(', ')}`)
  }

  const reportPath = path.join(__dirname, '..', 'docs/ref/리뉴얼참고/v2-llm-test-results.json')
  fs.writeFileSync(reportPath, JSON.stringify(allResults, null, 2), 'utf8')
  console.log(`\n결과 저장: ${reportPath}`)
}

main().catch(console.error)
