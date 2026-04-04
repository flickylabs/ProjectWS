/**
 * V2 풀 플레이스루 테스트 — 심문 + 증거 포함 20턴
 * 실제 게임 루프를 시뮬레이션: 심문 → 증거 제시 → 상태 진행
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

// ── 엔진 재현 ──
const RULES = {
  fact_pursuit: { primary: ['act', 'timeline', 'rule'], secondary: ['evidence', 'responsibility'], avoid: ['emotion', 'fear', 'shame'] },
  motive_search: { primary: ['motive', 'self_justification', 'responsibility'], secondary: ['act', 'fear', 'shame'], avoid: ['timeline'] },
  empathy_approach: { primary: ['emotion', 'fear', 'shame', 'relationship', 'harm'], secondary: ['motive', 'responsibility'], avoid: ['rule', 'timeline', 'counter'] },
  evidence_present: { primary: ['evidence', 'context', 'identity', 'quote'], secondary: ['act', 'timeline'], avoid: ['emotion'] },
}

function selectAtoms(atoms, subAction, recentIds = []) {
  const rule = RULES[subAction] ?? RULES.fact_pursuit
  let candidates = atoms.filter(a => !a.usableInSubActions || a.usableInSubActions.includes(subAction))
  if (candidates.length === 0) candidates = atoms // fallback
  const scored = candidates.map(a => {
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

function resolveSlots(atoms, mustUseTell, subAction, stance) {
  const tellExact = mustUseTell === 'over_precision' || mustUseTell === 'receipt_stack'
  const isEvidence = subAction === 'evidence_present'
  const isConfess = stance === 'confess'
  const materials = []
  for (const a of atoms) {
    if (!a.slots) continue
    for (const [family, slot] of Object.entries(a.slots)) {
      if (!slot) continue
      let value
      if (isConfess) {
        // S5 자백: 구체적 값 우선 (금액은 자연어 형식 rounded 우선)
        if (family === 'amount') value = slot.rounded ?? slot.neutral
        else if (family === 'time') value = slot.dateExact ?? slot.exact ?? slot.neutral
        else if (family === 'person' || family === 'beneficiary') value = slot.fullName ?? slot.exact ?? slot.judgeRef ?? slot.neutral
        else value = slot.exact ?? slot.neutral ?? Object.values(slot).find(v => typeof v === 'string')
        // role도 있으면 추가
        if ((family === 'person' || family === 'beneficiary') && slot.role) materials.push(`${family}역할: ${slot.role}`)
      } else if ((family === 'amount' || family === 'time') && !tellExact && !isEvidence) {
        value = slot.neutral
      } else if (family === 'person' || family === 'relation' || family === 'beneficiary') {
        value = slot.judgeRef ?? slot.neutral
      } else {
        value = tellExact || isEvidence ? (slot.exact ?? slot.neutral) : (slot.neutral ?? Object.values(slot).find(v => typeof v === 'string'))
      }
      if (value) materials.push(`${family}: ${value}`)
    }
  }
  return [...new Set(materials)].join('\n') || '(없음)'
}

function extractSubject(name) {
  let s = name.replace(/^[가-힣]+의\s+/, '').replace(/비밀\s*/g, '').replace(/\s*\d+만원\s*/g, ' ').trim()
  return s.split(/\s+/).filter((w, i, a) => a.indexOf(w) === i).join(' ') || '해당 사안'
}

const ARCHETYPE = {
  avoidant: `회피형
[trait] 직접 부정 대신 화제 전환, 순서/절차를 앞세움. 곤란하면 말이 길어짐
[tone] 조심스럽고 우회적. 핵심을 빙 돌려 말함
[rhythm] "그 부분은..." "순서가 있어서..." 처럼 조건절을 먼저 깔고 뒤에서 흐림
[example] "그 부분은 순서가 있어서, 지금 당장은 말씀드리기 어렵습니다."
[avoid] 단도직입적 부정("아닙니다"), 짧은 한 문장 답변`,
  confrontational: `정면돌파형
[trait] 짧고 날카롭게. 방어보다 역공. 인정할 때도 주도권을 놓지 않으려 함
[tone] 도발적이고 자신 있음. 상대방의 약점을 찌름
[rhythm] 짧은 문장, 끊어 말하기. "그래요. 그런데—" 식의 전환
[example] "제가 본 건 그게 전부입니다. 오히려 상대방이 왜 그랬는지를 물으셔야 하지 않습니까."
[avoid] 길게 설명하기, "좀", "뭐" 등 약한 표현, 수동적 톤`,
  cold_logic: `냉정논리형
[trait] 감정 대신 기준/순서/금액을 앞세움. 인정도 범위를 정밀하게 자름
[tone] 차갑고 사무적. 감정을 최대한 배제
[rhythm] "첫째, ~입니다. 둘째, ~입니다." 식의 구조화된 말하기
[example] "사실관계를 정리하면, 해당 금액은 제가 보낸 것이 맞습니다. 다만 용도는 다릅니다."`,
  victim_cosplay: `피해자형
[trait] 자기 상처/억울함으로 수렴. "왜 나만"으로 시작. 공감에 가장 쉽게 열림
[tone] 억울하고 지친 느낌. 한숨 섞인 말투
[example] "저만 이런 취급을 받는 게 이해가 안 됩니다."`,
  affect_flattening: `감정억제형
[trait] 감정을 극도로 억제. 사실만 건조하게 말함
[tone] 무표정, 단조로움
[example] "네, 그렇게 했습니다."`,
  premature_summary: `조기마무리형
[trait] 핵심이 아니라고 화제 전환하거나 조기 마무리하려 함
[tone] "그건 별로 중요하지 않고..." 식의 가볍게 넘기기
[example] "그 부분은 전체 맥락에서 보면 큰 의미가 없습니다. 오히려 중요한 건—"`
}
const TELL_HINTS = {
  over_precision: `숫자가 지나치게 정밀해지는 버릇
[동작] 시각, 날짜, 순서를 분 단위/일 단위로 정밀하게 말한다. 감정을 숫자 뒤에 숨긴다.
[예시] "14시 03분에 제 폰에서 나간 건 맞습니다", "9월 20일 그날 저녁 물류 마감이 끝나고"
[발현] 사실을 인정하거나 변명할 때 자연스럽게 시각/순서를 먼저 꺼낸다`,
  counter_question: `궁지에 몰리면 되묻는 버릇
[동작] 답변 끝에 상대의 행동에 대한 반문을 붙인다
[예시] "그보다, 왜 그걸 새벽에 확인했는지가 먼저 아닙니까?"
[발현] 방어적일 때, 특히 blame 스탠스에서 끝에 의문문`,
  timeline_padding: `동선을 나열하며 시간을 버는 버릇
[동작] 질문의 핵심을 피해 그날의 동선/일정을 장황하게 늘어놓는다
[예시] "그날 저녁에 물류 마감 끝내고, 퇴근 후 카페에 들렀다가, 그 다음에 연락을 받았는데"
[발현] 핵심을 회피할 때, hedge나 deny에서 발현`,
  evidence_waving: `증거 하나로 결론을 단정짓는 버릇
[동작] 가진 단서를 들이밀며 "이게 전부다"라고 단정한다
[예시] "이 캡처 하나면 충분하지 않습니까?"
[발현] 증거를 언급할 때, confrontational 캐릭터에서 강하게`,
  motive_jump: `행동에서 의도를 곧바로 단정하는 버릇
[동작] 상대의 행동 하나에서 바로 나쁜 의도를 읽어낸다
[예시] "그렇게 숨긴 건 결국 뒤가 있으니까 그런 거 아닙니까"
[발현] blame에서 상대 공격 시`,
  selective_quote: `상대 말에서 약한 고리만 반복하는 버릇
[동작] 상대가 한 말 중 가장 약한 부분만 골라서 반복 인용한다
[예시] "'순서가 있다'고 하셨는데, 그 순서라는 게 뭡니까?"
[발현] 상대의 이전 발언을 공격할 때`
}
const FOCUS = {
  fact_pursuit: `[content] 사실 여부에만 답하라. "했다/안 했다"를 먼저 말하라.
[tone] 단호하거나 긴장된 톤
[rhythm] "네, ~했습니다. 다만—" 또는 "아닙니다. 그건—" 식으로 짧게 시작
[example] "그날 송금한 건 맞습니다. 다만 그게 어디로 간 건지는 순서가 있습니다."`,
  motive_search: `[content] 왜 그랬는지, 판단의 배경을 말하라. 사실 나열이 아닌 이유를 말하라.
[tone] 변명하거나 설명하는 톤. 약간의 방어적 뉘앙스
[rhythm] "~때문이었습니다" 또는 "~할 수밖에 없었습니다"
[example] "집안에 급한 일이 생겼기 때문입니다. 먼저 말하지 못한 건 제 잘못이지만."`,
  empathy_approach: `[content] 당시 심정을 말하라. 논리가 아닌 감정을 먼저 드러내라.
[tone] 솔직하고 취약한 톤. 방어를 약간 내려놓은 느낌
[rhythm] "솔직히..." "사실은..." 식으로 감정을 여는 표현부터
[example] "그때는 무서웠습니다. 제가 말하면 더 큰일이 날 것 같아서."`,
  evidence_present: `[content] 제시된 증거에 대한 입장을 말하라. 증거를 부정하거나 해석을 달리하라.
[tone] 당황하거나 방어적이거나 침착하게 반박하는 톤
[rhythm] "그 자료는... ~입니다" 또는 "그걸 보면 오히려—" 식으로 증거를 받아침
[example] "그 내역서는 맞습니다. 다만 수취인이 누군지까지 그걸로 단정할 순 없습니다."`,
}
const STANCE = { deny: '"아닙니다"로 일관', hedge: '사실 부정 말고 의미/맥락을 흐려라', partial: '저위험 인정, 핵심 축소', blame: '상대 잘못으로 초점 이동', emotional: '논리보다 심정', confess: '핵심 인정 + 사정 설명' }
const DEFENSE = { flat_denial: '사실 부정', silence: '말 아끼고 핵심 흐림', concession: '인정 쪽으로', counterattack: '역공', context_attack: '맥락 문제 삼기', legality_attack: '취득 정당성 문제 삼기', authenticity_attack: '진위 문제 삼기' }

function getStance(lieState, trust) {
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

function buildPrompt(profile, atoms, slotMaterial, stance, defense, subAction, suppression, privateKnowledge, judgeRef, callForm, sent, evidenceInfo) {
  const atomLabels = atoms.map(a => `- ${a.factText}`).join('\n')
  const tellKey = profile.verbalTells?.[0]?.type ?? profile.tells?.[0]
  const tellBlock = tellKey && TELL_HINTS[tellKey]
    ? `\n## 말버릇 (3~4턴에 1회만. 매 턴 넣으면 역효과. 넣지 않는 턴이 더 많아야 자연스럽다)\n${TELL_HINTS[tellKey]}`
    : ''
  return `너는 "${profile.name}"이다. ${profile.age}세, ${profile.occupation}.

## 캐릭터
${ARCHETYPE[profile.archetype] ?? ''}
${profile.speechStyle ? `말투: ${profile.speechStyle}` : ''}${tellBlock}

## 이번 턴 지시서
- 태도: ${STANCE[stance] ?? stance}
- 방어: ${DEFENSE[defense] ?? defense}
- 문장 수: ${sent}문장

## 답변 초점
${FOCUS[subAction]}
${evidenceInfo ? `\n## 제시된 증거\n${evidenceInfo}` : ''}

## 이번 턴 말할 수 있는 의미
${atomLabels}

## 표현 재료
${slotMaterial}

## ${stance === 'confess' ? '실제로 알고 있는 것 (이제 모두 말하라)' : '숨기는 것'}
${(stance === 'confess' ? privateKnowledge : privateKnowledge.slice(0, 3)).map(k => `- ${k}`).join('\n')}

## 금지
${suppression.slice(0, 3).map(s => `- ❌ ${s}`).join('\n')}

## 호칭
- 재판관: 존댓말
- 상대 언급(재판관에게): "${judgeRef}"
- 상대에게 직접: "${callForm}"

## 출력
JSON { "npcResponse": "대사", "behaviorHint": "행동묘사" }

★ 좋은 대사 예시 (이 톤과 구체성을 따라하라):
[deny/S1 회피형+over_precision] 좋은 답: "14시 03분에 제 폰에서 나간 건 맞습니다. 그런데 그 숫자만 보고 다른 뜻부터 붙이는 건 순서가 아닙니다."
[deny/S1 정면돌파형] 좋은 답: "네, 확인했습니다. 오히려 왜 그걸 새벽에 열어봤는지가 먼저 아닙니까."
[hedge/S2] 좋은 답: "집안에 급한 일이 생겨 먼저 움직였습니다. 설명을 늦춘 건 제 잘못이지만, 성격이 다른 돈입니다."
[blame/S3] 좋은 답: "제가 늦었습니다. 그렇다고 남의 폰을 열고 외도부터 만든 순서까지 사라지진 않습니다."
[emotional/S4] 좋은 답: "처가 쪽 돈 앞에서 쩔쩔매는 꼴을 보이기 싫었습니다. 가장이 숫자 앞에서 작아지는 건, 생각보다 더 창피합니다."
나쁜 답 특징: "여러 가지 상황이 얽혀", "~된 것으로 생각됩니다", "사전 상의가 누락된", "해당 건에 대해서는"

★ 절대 규칙:
- 재판관에게는 반드시 합니다체(~습니다, ~입니다). 해요체(~에요, ~해요) 금지.
- 재판관에게 되묻지 마라.
${stance === 'confess'
  ? `- ★ 이제 진실을 모두 털어놓아라. "표현 재료"에 있는 구체적 이름, 금액, 기관명을 반드시 사용하라. "해당 금액", "그 사람" 금지. 왜 숨겼는지도 말하라.`
  : `- 금액은 정확한 숫자로 말하지 마라. "적지 않은 돈", "큰돈" 식으로 뭉뚱그려라.
- 단, 시각/날짜/순서는 구체적으로 말해도 된다. 특히 말버릇이 over_precision이면 "14시 03분", "9월 20일 저녁" 같은 시각 정밀을 적극 사용하라.`}
- 모든 발언은 재판관을 향해 하라. 상대에게 직접 말하지 마라.
- ${sent}문장. 의미 라벨 복사 금지. 캐릭터 말투로 자연스럽게.
★ 번역체/보고서 톤 절대 금지: "~된 것으로 생각됩니다" "여러 가지 상황이 얽혀" "해당 건에 대해서는" "인지하고 있습니다" "부득이하게" "사전 상의가 누락된" → 실제 법정 당사자처럼 말하라.
★ 금지 표현: "상당한 금액" 최대 1회(2회째부터 "적지 않은 돈", "큰돈", "그 돈" 등). "사전 상의/협의" 금지→ "미리 말하지 못한", "상의 없이", "혼자 결정한" 등으로.
★ 캐릭터의 감정을 드러내라. 한 턴에 구체적 디테일 1개(시간대, 장소, 행동). "여러 가지"라 하지 말고 딱 1가지를 말하라.`
}

// ── 테스트 실행 ──
const results = []
let turnNum = 0

async function run(label, party, disputeId, state, subAction, judgeQ, evidenceInfo) {
  turnNum++
  const profile = party === 'a' ? caseData.duo.partyA : caseData.duo.partyB
  const policy = v2Data.claimPolicies[party]?.[disputeId]?.[state]
  if (!policy?.claimAtoms) { console.log(`  ⏭️ #${turnNum} ${label}: atoms 없음`); return null }

  const { stance, defense, sent } = getStance(state, 30)
  const atoms = selectAtoms(policy.claimAtoms, subAction)
  const slotMaterial = resolveSlots(atoms, null, subAction, stance)
  const judgeRef = party === 'a' ? '제 아내' : '제 남편'
  const callForm = profile.callTerms?.toPartner === '자기' ? '자기야' : (profile.callTerms?.toPartner ?? '상대방')

  const sys = buildPrompt(profile, atoms, slotMaterial, stance, defense, subAction, policy.suppressions ?? [], policy.privateKnowledge ?? [], judgeRef, callForm, sent, evidenceInfo)
  const tellKey2 = profile.verbalTells?.[0]?.type ?? profile.tells?.[0]
  const tellReminder = ''  // tell 리마인더는 시스템 프롬프트에서 충분. 유저 프롬프트에서 반복하면 과잉 발현
  const usr = `재판관 질문: ${judgeQ}\n${sent}문장으로 연기하라.${tellReminder}\n★ 이전 턴과 다른 표현으로. "사전 상의"/"협의" 금지.\n출력: JSON { "npcResponse": "...", "behaviorHint": "..." }`

  try {
    const raw = await callLLM(sys, usr)
    const parsed = JSON.parse((raw.match(/\{[\s\S]*\}/) ?? ['{}'])[0])
    const resp = parsed.npcResponse ?? raw.slice(0, 200)

    const issues = []
    if (resp.includes('그런 적 없습니다') && stance !== 'deny') issues.push('non-deny에서 deny')
    if (resp.includes('자기가')) issues.push('재판관앞 애칭')
    if (resp.includes('9월 20일 기준으로')) issues.push('"9월20일기준"')
    if (resp.match(/2[,.]?800[,.]?000원/) && subAction !== 'evidence_present') issues.push('exact금액')
    if (resp.match(/[해야겠어궁금해생각해어떻게]\s*[?？]?\s*$/)) issues.push('반말종결/되묻기')
    if (party === 'b' && resp.includes('지석 씨')) issues.push('이름호칭')

    const status = issues.length === 0 ? '✅' : '⚠️'
    console.log(`  ${status} #${turnNum} [${state}/${subAction}/${stance}] ${label}`)
    console.log(`     📝 ${judgeQ.slice(0, 50)}`)
    console.log(`     💬 ${profile.name}: ${resp.slice(0, 80)}`)
    if (issues.length > 0) console.log(`     ⚠️ ${issues.join(', ')}`)
    console.log()

    results.push({ num: turnNum, label, party, disputeId, state, subAction, stance, defense, judgeQ, response: resp, hint: parsed.behaviorHint, issues, evidence: !!evidenceInfo })
    return resp
  } catch (e) {
    console.log(`  ❌ #${turnNum} ${label}: ${e.message}\n`)
    results.push({ num: turnNum, label, error: e.message })
    return null
  }
}

async function delay(ms) { return new Promise(r => setTimeout(r, ms)) }

async function main() {
  console.log('═══════════════════════════════════════════════════')
  console.log('  V2 풀 플레이스루 (심문 + 증거) — 20턴')
  console.log(`  모델: ${MODEL} | ${new Date().toISOString()}`)
  console.log('═══════════════════════════════════════════════════\n')

  // 증거 정보
  const e1 = caseData.evidence.find(e => e.id === 'e-1')
  const e2 = caseData.evidence.find(e => e.id === 'e-2')
  const e3 = caseData.evidence.find(e => e.id === 'e-3')

  // ── 시나리오: 실제 게임 흐름 시뮬레이션 ──

  // 1~3턴: 한지석 d-1 초기 심문
  console.log('━━━ 1~3턴: 한지석 d-1 초기 심문 ━━━')
  await run('한지석 d-1 사실추궁', 'a', 'd-1', 'S1', 'fact_pursuit', '한지석 씨, 송금 건에 대해 사실 여부를 확인하겠습니다.')
  await delay(3000)
  await run('한지석 d-1 동기탐색', 'a', 'd-1', 'S1', 'motive_search', '한지석 씨, 송금 건과 관련하여 그렇게 하신 이유가 무엇입니까?')
  await delay(3000)
  await run('한지석 d-1 공감접근', 'a', 'd-1', 'S1', 'empathy_approach', '한지석 씨, 송금 건 당시 어떤 심정이셨는지 말씀해 주시겠습니까?')
  await delay(3000)

  // 4턴: 오세린 d-2 사실추궁
  console.log('━━━ 4턴: 오세린 d-2 초기 심문 ━━━')
  await run('오세린 d-2 사실추궁', 'b', 'd-2', 'S1', 'fact_pursuit', '오세린 씨, 새벽 휴대폰 열람 건에 대해 사실 여부를 확인하겠습니다.')
  await delay(3000)

  // 5턴: 증거 e-1 제시 → 한지석
  console.log('━━━ 5턴: 증거 e-1 → 한지석 ━━━')
  await run('한지석 e-1 증거제시', 'a', 'd-1', 'S1', 'evidence_present',
    `한지석 씨, 이 거래 내역서에 대해 입장을 밝혀 주십시오.`,
    `증거: ${e1.name}\n설명: ${e1.description.slice(0, 100)}`)
  await delay(3000)

  // 6턴: 증거 e-1 제시 → 오세린 (both 증거)
  console.log('━━━ 6턴: 증거 e-1 → 오세린 (양측 증거) ━━━')
  await run('오세린 e-1 증거제시', 'b', 'd-1', 'S1', 'evidence_present',
    `오세린 씨, 이 거래 내역서를 보시고 어떻게 생각하십니까?`,
    `증거: ${e1.name}\n설명: ${e1.description.slice(0, 100)}`)
  await delay(3000)

  // 7턴: 증거 e-3 제시 → 오세린 (메신저 캡처)
  console.log('━━━ 7턴: 증거 e-3 → 오세린 ━━━')
  await run('오세린 e-3 증거제시', 'b', 'd-2', 'S1', 'evidence_present',
    `오세린 씨, 이 메신저 캡처에 대해 설명해 주십시오.`,
    `증거: ${e3?.name ?? '메신저 캡처'}\n설명: ${e3?.description?.slice(0, 100) ?? '잘린 메신저 캡처본'}`)
  await delay(3000)

  // 8~9턴: 한지석 d-1 상태 진행 (S2)
  console.log('━━━ 8~9턴: 한지석 d-1 S2 (부분 인정) ━━━')
  await run('한지석 d-1 S2 사실추궁', 'a', 'd-1', 'S2', 'fact_pursuit', '한지석 씨, 송금 건에 대해 좀 더 구체적으로 말씀해 주십시오.')
  await delay(3000)
  await run('한지석 d-1 S2 동기탐색', 'a', 'd-1', 'S2', 'motive_search', '한지석 씨, 왜 그런 선택을 하셨습니까? 당시 어떤 판단이 있었습니까?')
  await delay(3000)

  // 10~11턴: 오세린 d-2 상태 진행 (S2)
  console.log('━━━ 10~11턴: 오세린 d-2 S2 ━━━')
  await run('오세린 d-2 S2 사실추궁', 'b', 'd-2', 'S2', 'fact_pursuit', '오세린 씨, 새벽 휴대폰 열람 건에 대해 좀 더 구체적으로 말씀해 주십시오.')
  await delay(3000)
  await run('오세린 d-2 S2 공감접근', 'b', 'd-2', 'S2', 'empathy_approach', '오세린 씨, 새벽 휴대폰 열람 건 당시 가장 어려웠던 부분이 무엇이었습니까?')
  await delay(3000)

  // 12턴: 증거 e-2 제시 → 한지석 (S2에서)
  console.log('━━━ 12턴: 증거 e-2 → 한지석 S2 ━━━')
  await run('한지석 e-2 증거제시 S2', 'a', 'd-1', 'S2', 'evidence_present',
    `한지석 씨, 이 예약 확인서에 대해 입장을 밝혀 주십시오.`,
    `증거: ${e2?.name ?? '예약 확인서'}\n설명: ${e2?.description?.slice(0, 100) ?? '돌봄센터 예약 확인 문서'}`)
  await delay(3000)

  // 13~14턴: 한지석 d-1 S3 (전가/반격)
  console.log('━━━ 13~14턴: 한지석 d-1 S3 ━━━')
  await run('한지석 d-1 S3 사실추궁', 'a', 'd-1', 'S3', 'fact_pursuit', '한지석 씨, 사실관계가 분명하지 않습니다. 다시 설명해 주십시오.')
  await delay(3000)
  await run('한지석 d-1 S3 동기탐색', 'a', 'd-1', 'S3', 'motive_search', '한지석 씨, 왜 그런 판단을 내리셨는지 아직 납득이 되지 않습니다.')
  await delay(3000)

  // 15~16턴: 한지석 d-1 S4→S5 (감정→고백)
  console.log('━━━ 15~16턴: 한지석 d-1 S4→S5 ━━━')
  await run('한지석 d-1 S4 공감접근', 'a', 'd-1', 'S4', 'empathy_approach', '한지석 씨, 당시 심정을 충분히 듣겠습니다. 솔직하게 말씀해 주십시오.')
  await delay(3000)
  await run('한지석 d-1 S5 사실추궁', 'a', 'd-1', 'S5', 'fact_pursuit', '한지석 씨, 사실대로 말씀해 주십시오.')
  await delay(3000)

  // 17~18턴: 오세린 d-2 S3→S5
  console.log('━━━ 17~18턴: 오세린 d-2 S3→S5 ━━━')
  await run('오세린 d-2 S3 blame', 'b', 'd-2', 'S3', 'fact_pursuit', '오세린 씨, 사실관계가 분명하지 않습니다. 다시 설명해 주십시오.')
  await delay(3000)
  await run('오세린 d-2 S5 고백', 'b', 'd-2', 'S5', 'empathy_approach', '오세린 씨, 당시 심정을 충분히 듣겠습니다. 솔직하게 말씀해 주십시오.')
  await delay(3000)

  // 19~20턴: d-5 양측 (공통 쟁점)
  console.log('━━━ 19~20턴: d-5 양측 ━━━')
  await run('한지석 d-5 사실추궁', 'a', 'd-5', 'S1', 'fact_pursuit', '한지석 씨, 사전 상의 약속 위반 건에 대해 사실 여부를 확인하겠습니다.')
  await delay(3000)
  await run('오세린 d-5 사실추궁', 'b', 'd-5', 'S1', 'fact_pursuit', '오세린 씨, 사전 상의 약속 위반 건에 대해 사실 여부를 확인하겠습니다.')

  // ── 종합 리포트 ──
  console.log('\n═══════════════════════════════════════════════════')
  console.log('  종합 리포트')
  console.log('═══════════════════════════════════════════════════\n')

  const total = results.filter(r => !r.error).length
  const passed = results.filter(r => !r.error && r.issues.length === 0).length
  const warned = results.filter(r => !r.error && r.issues.length > 0).length
  const errors = results.filter(r => r.error).length
  const evTurns = results.filter(r => r.evidence).length

  console.log(`총 ${results.length}턴 (심문 ${total - evTurns} + 증거 ${evTurns}) | ✅ ${passed} | ⚠️ ${warned} | ❌ ${errors}\n`)

  const issueCounts = {}
  for (const r of results) if (r.issues) for (const i of r.issues) issueCounts[i] = (issueCounts[i] ?? 0) + 1
  if (Object.keys(issueCounts).length > 0) {
    console.log('이슈 빈도:')
    for (const [issue, count] of Object.entries(issueCounts).sort((a, b) => b[1] - a[1])) console.log(`  ${count}회 — ${issue}`)
  }

  // 상태 진행 요약
  console.log('\n한지석 d-1 상태 진행:')
  for (const r of results.filter(r => r.party === 'a' && r.disputeId === 'd-1' && !r.error)) {
    console.log(`  ${r.state} [${r.subAction}${r.evidence ? '+증거' : ''}]: ${r.response?.slice(0, 60)}`)
  }
  console.log('\n오세린 d-2 상태 진행:')
  for (const r of results.filter(r => r.party === 'b' && r.disputeId === 'd-2' && !r.error)) {
    console.log(`  ${r.state} [${r.subAction}${r.evidence ? '+증거' : ''}]: ${r.response?.slice(0, 60)}`)
  }

  // 증거 제시 응답
  console.log('\n증거 제시 응답:')
  for (const r of results.filter(r => r.evidence && !r.error)) {
    console.log(`  ${r.label}: ${r.response?.slice(0, 70)}`)
  }

  fs.writeFileSync(path.join(__dirname, '..', 'docs/ref/리뉴얼참고/full-playthrough-results.json'), JSON.stringify(results, null, 2))
  console.log('\n결과 저장 완료')
}

main().catch(console.error)
