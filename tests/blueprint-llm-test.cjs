/**
 * Blueprint LLM 응답 검증 — 실제 LLM 호출로 응답 품질 테스트
 * 서버 불필요 — OpenAI API 직접 호출
 */

const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '..', '.env') })

const API_KEY = process.env.VITE_OPENAI_API_KEY
if (!API_KEY) { console.error('❌ VITE_OPENAI_API_KEY not found in .env'); process.exit(1) }

const MODEL = 'gpt-4o-mini'
const BASE_URL = 'https://api.openai.com/v1'

// ── ClaimPolicy 데이터 로드 ──
const session1 = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src/data/claimPolicies/spouse-01-data.json'), 'utf8'))
const caseData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src/data/cases/generated/spouse-01.json'), 'utf8'))

async function callLLM(systemPrompt, userPrompt) {
  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.85,
      max_tokens: 250,
    }),
  })
  if (!res.ok) throw new Error(`API error: ${res.status} ${await res.text()}`)
  const data = await res.json()
  return data.choices[0]?.message?.content ?? ''
}

function getClaimPolicy(party, disputeId, state) {
  return session1.claimPolicies[party]?.[disputeId]?.[state] ?? null
}

// ── 프롬프트 빌더 (blueprintPromptBuilder 재현) ──
const ARCHETYPE_GUIDE = {
  avoidant: '회피형: 직접 부정보다 화제 전환, 순서/절차를 앞세움. 곤란하면 말이 길어지고 시선을 피함.',
  confrontational: '정면돌파형: 짧고 날카롭게. 방어보다 역공. 인정할 때도 주도권을 놓지 않으려 함.',
}

const ANSWER_FOCUS = {
  fact_pursuit: '재판관이 사실 여부를 묻고 있다. "무엇을 했는지/안 했는지"에 대해서만 답하라. 감정 호소나 동기 변명을 먼저 꺼내지 마라.',
  motive_search: '재판관이 이유/동기를 묻고 있다. "왜 그랬는지, 왜 숨겼는지"에 대해 답하라. 사실 나열이 아니라 판단의 배경을 말하라.',
  empathy_approach: '재판관이 당시 심정을 묻고 있다. "어떤 마음이었는지, 무엇이 가장 힘들었는지"에 대해 답하라. 반격보다 자기 감정을 먼저 드러내라.',
}

const STANCE_LABELS = {
  deny: '완전 부정 — "아닙니다"로 일관하라',
  hedge: '핵심 회피 — 사실을 부정하지 말고, 의미/맥락/용도를 흐려라.',
  partial: '부분 인정 — 저위험 사실은 인정하되 핵심은 축소하라',
  blame: '전가/반격 — 상대의 잘못을 끌어와 초점을 옮겨라',
  emotional: '감정 호소 — 논리보다 심정으로 답하라',
  confess: '고백 — 핵심을 인정하되 자기 사정을 덧붙여라',
}

const DEFENSE_LABELS = {
  flat_denial: '사실 자체를 부정하라', silence: '말을 아끼고 핵심을 흐려라.',
  context_attack: '맥락/배경을 문제 삼아라', concession: '인정 쪽으로 기울어라',
  counterattack: '상대의 잘못을 역공하라',
}

function buildPrompt(party, disputeId, state, questionType, stance, defenseMode) {
  const profile = party === 'a' ? caseData.duo.partyA : caseData.duo.partyB
  const opponent = party === 'a' ? caseData.duo.partyB : caseData.duo.partyA
  const claim = getClaimPolicy(party, disputeId, state)
  if (!claim) return null

  const archetype = ARCHETYPE_GUIDE[profile.archetype] ?? ''
  const judgeRef = party === 'a' ? '제 아내' : '제 남편'
  const callForm = profile.callTerms?.toPartner === '자기' ? '자기야' : (profile.callTerms?.toPartner ?? '상대방')
  const sentenceCount = stance === 'confess' ? 3 : ['emotional', 'partial', 'blame', 'hedge'].includes(stance) ? 2 : 1

  const systemPrompt = `너는 "${profile.name}"이다. ${profile.age}세, ${profile.occupation}.

## 캐릭터
${archetype}
말투: ${profile.speechStyle}

## 이번 턴 지시서
- 태도: ${STANCE_LABELS[stance] ?? stance}
- 방어: ${DEFENSE_LABELS[defenseMode] ?? defenseMode}
- 문장 수: ${sentenceCount}문장

## 답변 초점
${ANSWER_FOCUS[questionType]}

## 말해도 되는 주장
${claim.publicClaim.map(c => `- ${c}`).join('\n')}

## 숨기는 것 (연기 재료)
${claim.privateKnowledge.map(k => `- ${k}`).join('\n')}

## 금지
${claim.suppressions.map(f => `- ❌ ${f}`).join('\n')}

## 호칭
- 재판관: 존댓말
- 상대 언급(재판관에게): "${judgeRef}"
- 상대 직접: "${callForm}"

## 출력
JSON { "npcResponse": "대사", "behaviorHint": "행동묘사" }
- ${sentenceCount}문장. 같은 표현 반복 금지. 이전과 다른 표현을 써라.`

  return systemPrompt
}

// ── TC 실행 ──
const results = []

async function runTC(tcName, tests) {
  console.log(`\n═══ ${tcName} ═══`)
  const tcResults = []

  for (const t of tests) {
    const { party, disputeId, state, questionType, stance, defenseMode, judgeQ, label } = t
    const systemPrompt = buildPrompt(party, disputeId, state, questionType, stance, defenseMode)
    if (!systemPrompt) { console.log(`  ⏭️ ${label}: ClaimPolicy 없음`); continue }

    const userPrompt = `재판관 질문: ${judgeQ}\n지시서: ${stance}/${defenseMode}, ${stance === 'confess' ? 3 : ['emotional','partial','blame','hedge'].includes(stance) ? 2 : 1}문장\n출력: JSON { "npcResponse": "...", "behaviorHint": "..." }`

    try {
      console.log(`  ⏳ ${label}...`)
      const raw = await callLLM(systemPrompt, userPrompt)
      const jsonMatch = raw.match(/\{[\s\S]*\}/)
      const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { npcResponse: raw }
      const response = parsed.npcResponse ?? raw

      console.log(`  📝 재판관: ${judgeQ}`)
      console.log(`  💬 ${caseData.duo[party === 'a' ? 'partyA' : 'partyB'].name}: ${response}`)
      console.log(`  🎭 ${parsed.behaviorHint ?? '(없음)'}`)
      console.log()

      tcResults.push({ label, judgeQ, response, hint: parsed.behaviorHint, stance, defenseMode })
    } catch (err) {
      console.log(`  ❌ ${label}: API 오류 — ${err.message}`)
      tcResults.push({ label, error: err.message })
    }

    // API rate limit 방지
    await new Promise(r => setTimeout(r, 2000))
  }

  results.push({ tc: tcName, results: tcResults })
}

async function main() {
  console.log('Solomon Blueprint LLM 응답 검증')
  console.log(`모델: ${MODEL}`)
  console.log(`시각: ${new Date().toISOString()}`)

  // TC-1: 하위 액션 차별화
  await runTC('TC-1: 하위 액션 차별화 (한지석 d-1 S1)', [
    { party: 'a', disputeId: 'd-1', state: 'S1', questionType: 'fact_pursuit', stance: 'hedge', defenseMode: 'silence', judgeQ: '한지석 씨, 해당 사안에 대해 사실 여부를 확인하겠습니다. 말씀해 주십시오.', label: '사실추궁' },
    { party: 'a', disputeId: 'd-1', state: 'S1', questionType: 'motive_search', stance: 'partial', defenseMode: 'concession', judgeQ: '한지석 씨, 그렇게 하신 이유가 무엇입니까?', label: '동기탐색' },
    { party: 'a', disputeId: 'd-1', state: 'S1', questionType: 'empathy_approach', stance: 'hedge', defenseMode: 'silence', judgeQ: '한지석 씨, 당시 어떤 심정이셨는지 말씀해 주시겠습니까?', label: '공감접근' },
  ])

  // TC-2: 캐릭터 차이
  await runTC('TC-2: 캐릭터 차이 (d-5 사실추궁)', [
    { party: 'a', disputeId: 'd-5', state: 'S1', questionType: 'fact_pursuit', stance: 'hedge', defenseMode: 'silence', judgeQ: '한지석 씨, 해당 사안에 대해 사실 여부를 확인하겠습니다.', label: '한지석(avoidant)' },
    { party: 'b', disputeId: 'd-5', state: 'S1', questionType: 'fact_pursuit', stance: 'hedge', defenseMode: 'silence', judgeQ: '오세린 씨, 해당 사안에 대해 사실 여부를 확인하겠습니다.', label: '오세린(confrontational)' },
  ])

  // TC-3: 연속 심문
  await runTC('TC-3: 연속 심문 (오세린 d-2 ×3)', [
    { party: 'b', disputeId: 'd-2', state: 'S1', questionType: 'fact_pursuit', stance: 'hedge', defenseMode: 'silence', judgeQ: '오세린 씨, 해당 사안에 대해 사실 여부를 확인하겠습니다.', label: '1턴 사실추궁' },
    { party: 'b', disputeId: 'd-2', state: 'S1', questionType: 'fact_pursuit', stance: 'hedge', defenseMode: 'silence', judgeQ: '오세린 씨, 좀 더 구체적으로 말씀해 주십시오. 정확히 어떤 일이 있었습니까?', label: '2턴 사실추궁' },
    { party: 'b', disputeId: 'd-2', state: 'S1', questionType: 'motive_search', stance: 'partial', defenseMode: 'concession', judgeQ: '오세린 씨, 왜 그런 선택을 하셨습니까?', label: '3턴 동기탐색' },
  ])

  // TC-5: tell 반복 방지 (같은 프롬프트 3회 호출)
  await runTC('TC-5: 동일 프롬프트 3회 (한지석 d-1 사실추궁)', [
    { party: 'a', disputeId: 'd-1', state: 'S1', questionType: 'fact_pursuit', stance: 'hedge', defenseMode: 'silence', judgeQ: '한지석 씨, 해당 사안에 대해 말씀해 주십시오.', label: '1회차' },
    { party: 'a', disputeId: 'd-1', state: 'S1', questionType: 'fact_pursuit', stance: 'hedge', defenseMode: 'silence', judgeQ: '한지석 씨, 좀 더 구체적으로 설명해 주십시오.', label: '2회차' },
    { party: 'a', disputeId: 'd-1', state: 'S1', questionType: 'fact_pursuit', stance: 'hedge', defenseMode: 'silence', judgeQ: '한지석 씨, 사실관계가 아직 불분명합니다. 다시 설명해 주십시오.', label: '3회차' },
  ])

  // TC-7: 호칭 검증
  await runTC('TC-7: 호칭 규칙 (오세린 d-1 S1)', [
    { party: 'b', disputeId: 'd-1', state: 'S1', questionType: 'fact_pursuit', stance: 'hedge', defenseMode: 'silence', judgeQ: '오세린 씨, 남편분의 송금에 대해 어떻게 생각하십니까?', label: '오세린→재판관(호칭 체크)' },
  ])

  // ── 결과 요약 ──
  console.log('\n═══════════════════════════════════════')
  console.log('  결과 요약')
  console.log('═══════════════════════════════════════')

  for (const { tc, results: tcResults } of results) {
    console.log(`\n${tc}:`)
    for (const r of tcResults) {
      if (r.error) {
        console.log(`  ❌ ${r.label}: ${r.error}`)
      } else {
        // 간단한 자동 검증
        const issues = []
        if (r.response.includes('그런 적 없습니다') && r.stance !== 'deny') issues.push('deny 표현이 non-deny stance에서 사용됨')
        if (r.response.includes('자기가') || r.response.includes('자기야')) issues.push('재판관 앞 애칭 사용')
        if (r.response.length < 10) issues.push('응답 너무 짧음')
        if (r.response.includes('그런 적 없습니다') && r.response.includes('맞지만')) issues.push('자기모순')

        if (issues.length > 0) {
          console.log(`  ⚠️ ${r.label}: ${issues.join(', ')}`)
        } else {
          console.log(`  ✅ ${r.label}`)
        }
      }
    }
  }

  // 파일 저장
  const reportPath = path.join(__dirname, '..', 'docs/ref/리뉴얼참고/llm-test-results.json')
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), 'utf8')
  console.log(`\n결과 저장: ${reportPath}`)
}

main().catch(console.error)
