/**
 * V2 Playthrough Runner -- 공통 인프라
 * full-playthrough-v2.cjs의 고도화된 프롬프트를 그대로 사용
 * 사건별 시나리오에서 require하여 사용
 *
 * v2 수정사항 (2026-04-06):
 * - P0-1: 한국어 조사 함수 인라인
 * - P0-2: 금전/비금전 예시 분기 + monetaryGuard
 * - P1-1: 빈 atoms fallback
 * - P1-2: S5 자백 구조화
 * - P2-1: 번역체 금지 강화
 * - validateResponse() 20항목 전면 재설계
 */
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '..', '.env') })

const API_KEY = process.env.VITE_OPENAI_API_KEY
const MODEL = 'gpt-4o'
const BASE_URL = 'https://api.openai.com/v1'

// ── P0-1: 한국어 조사 인라인 ──

function hasBatchim(char) {
  const code = char.charCodeAt(0)
  if (code >= 0xAC00 && code <= 0xD7A3) return (code - 0xAC00) % 28 !== 0
  return false
}
function pp을를(word) { return hasBatchim(word.charAt(word.length - 1)) ? '을' : '를' }
function pp이가(word) { return hasBatchim(word.charAt(word.length - 1)) ? '이' : '가' }
function pp은는(word) { return hasBatchim(word.charAt(word.length - 1)) ? '은' : '는' }
function pp과와(word) { return hasBatchim(word.charAt(word.length - 1)) ? '과' : '와' }

// ── P0-2: 금전/비금전 분류 ──

const MONETARY_KW = /송금|이체|금액|원\b|돈|비용|계좌|환급|보증금|월세|정산|예치|납부|수당|급여|공제|배상|채무|대출/

function isMonetaryCase(caseData) {
  return (caseData.disputes || []).some(d =>
    MONETARY_KW.test(d.name || '') || MONETARY_KW.test(d.anchorTruth || '') || MONETARY_KW.test(d.truthDescription || '')
  )
}

const MONETARY_EXAMPLES = `
[deny/S1 회피형] "적지 않은 돈이 움직인 건 맞습니다. 그런데 그 숫자만 보고 다른 뜻부터 붙이는 건 순서가 아닙니다."
[hedge/S2] "집안에 급한 일이 생겨 먼저 움직였습니다. 설명을 늦춘 건 제 잘못이지만, 성격이 다른 돈입니다."
[blame/S3] "제가 늦었습니다. 그렇다고 남의 폰을 열고 외도부터 만든 순서까지 사라지진 않습니다."
[emotional/S4] "처가 쪽 돈 앞에서 쩔쩔매는 꼴을 보이기 싫었습니다."
[confess/S5] "280만원은 장모님 추석 연휴 간병 예약금이었습니다. 재가돌봄센터 상담팀장에게 보낸 것이고, 미리 말하지 못한 건 무능해 보일까 두려웠기 때문입니다."
`

const NON_MONETARY_EXAMPLES = `
[deny/S1 회피형] "그날 제가 한 건 맞습니다. 하지만 그게 무슨 뜻인지는 맥락이 있습니다."
[hedge/S2] "상황이 급해서 먼저 움직였습니다. 설명이 늦은 건 제 잘못이지만, 의도한 결과는 아닙니다."
[blame/S3] "제가 늦었습니다. 그렇다고 상대방이 한 행동까지 사라지진 않습니다."
[emotional/S4] "체면 때문에 입을 닫고 있었습니다. 그 자리에서 말하면 더 큰일이 날 것 같아서."
[confess/S5] "(사건별 구체적 사실) — 이걸 숨긴 건 제 잘못입니다. 그때는 들킬까봐 무서웠습니다."
`

// ── 상수 ──

const RULES = {
  fact_pursuit: { primary: ['act', 'timeline', 'rule'], secondary: ['evidence', 'responsibility'], avoid: ['emotion', 'fear', 'shame'] },
  motive_search: { primary: ['motive', 'self_justification', 'responsibility'], secondary: ['act', 'fear', 'shame'], avoid: ['timeline'] },
  empathy_approach: { primary: ['emotion', 'fear', 'shame', 'relationship', 'harm'], secondary: ['motive', 'responsibility'], avoid: ['rule', 'timeline', 'counter'] },
  evidence_present: { primary: ['evidence', 'context', 'identity', 'quote'], secondary: ['act', 'timeline'], avoid: ['emotion'] },
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
[발현] 상대의 이전 발언을 공격할 때`,
  receipt_stack: `영수증을 쌓아서 방어하는 버릇
[동작] 물증/기록을 하나씩 꺼내면서 자기 주장을 정당화
[예시] "여기 영수증 있고, 여기 캡처도 있습니다"
[발현] evidence_present에서 강하게`
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

// ── 함수 ──

async function callLLM(sys, usr) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
      body: JSON.stringify({ model: MODEL, messages: [{ role: 'system', content: sys }, { role: 'user', content: usr }], temperature: 0.85, max_tokens: 350 }),
    })
    if (res.status === 429) {
      console.log(`    [429] 30초 대기 후 재시도 (${attempt + 1}/3)`)
      await delay(30000)
      continue
    }
    if (!res.ok) throw new Error(`API ${res.status}`)
    return (await res.json()).choices[0]?.message?.content ?? ''
  }
  throw new Error('API 429 3회 실패')
}

function selectAtoms(atoms, subAction, recentIds = []) {
  const rule = RULES[subAction] ?? RULES.fact_pursuit
  let candidates = atoms.filter(a => !a.usableInSubActions || a.usableInSubActions.includes(subAction))
  if (candidates.length === 0) candidates = atoms
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
        if (family === 'amount') value = slot.rounded ?? slot.neutral
        else if (family === 'time') value = slot.dateExact ?? slot.exact ?? slot.neutral
        else if (family === 'person' || family === 'beneficiary') value = slot.fullName ?? slot.exact ?? slot.judgeRef ?? slot.neutral
        else value = slot.exact ?? slot.neutral ?? Object.values(slot).find(v => typeof v === 'string')
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

function getStance(lieState, trust) {
  switch (lieState) {
    case 'S0': return { stance: 'deny', defense: 'flat_denial', sent: 1 }
    case 'S1': return { stance: 'hedge', defense: 'silence', sent: 2 }
    case 'S2': return { stance: 'partial', defense: 'concession', sent: 2 }
    case 'S3': return { stance: trust < 40 ? 'blame' : 'partial', defense: trust < 40 ? 'counterattack' : 'concession', sent: 2 }
    case 'S4': return { stance: trust >= 60 ? 'confess' : 'emotional', defense: trust >= 60 ? 'concession' : 'silence', sent: trust >= 60 ? 3 : 2 }
    case 'S5': return { stance: 'confess', defense: 'concession', sent: 4 }
    default: return { stance: 'hedge', defense: 'silence', sent: 2 }
  }
}

// ── P0-2 + P1-2 + P2-1: buildPrompt 전면 개편 ──

function buildPrompt(profile, atoms, slotMaterial, stance, defense, subAction, suppression, privateKnowledge, judgeRef, callForm, sent, evidenceInfo, caseData, state) {
  const atomLabels = atoms.map(a => `- ${a.factText}`).join('\n')
  const tellKey = profile.verbalTells?.[0]?.type ?? profile.tells?.[0]
  const tellBlock = tellKey && TELL_HINTS[tellKey]
    ? `\n## 말버릇 (3~4턴에 1회만. 매 턴 넣으면 역효과. 넣지 않는 턴이 더 많아야 자연스럽다)\n${TELL_HINTS[tellKey]}`
    : ''

  const monetary = isMonetaryCase(caseData)
  const examples = monetary ? MONETARY_EXAMPLES : NON_MONETARY_EXAMPLES

  let prompt = `너는 "${profile.name}"이다. ${profile.age}세, ${profile.occupation}.

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
${examples}
나쁜 답 특징: "여러 가지 상황이 얽혀", "~된 것으로 생각됩니다", "사전 상의가 누락된", "해당 건에 대해서는"

★ 절대 규칙:
- 재판관에게는 반드시 합니다체(~습니다, ~입니다). 해요체(~에요, ~해요) 금지.
- 재판관에게 되묻지 마라.`

  // P1-2: S5 자백 구조화
  if (stance === 'confess') {
    prompt += `
★ 자백 필수 구성 (모두 포함해야 유효한 자백):
1. [핵심 행위] 무엇을 했는지 구체적으로 1문장 (표현 재료의 구체적 정보 반드시 사용)
2. [구체적 정보] 금액/인물/기관/날짜 중 해당하는 것을 전부 실명/실수로 말하라
3. [은폐 이유] 왜 숨겼는지 1문장
4. [현재 심정] 지금 어떤 감정인지 1문장 (두려움/후회/체면/체념 중 택1)
- "인정합니다"로만 끝내면 무효. 최소 4문장 이상.
- "감수하겠습니다", "이로 인해", "해당 금액" 금지.`
  } else {
    prompt += `
- 금액은 정확한 숫자로 말하지 마라. "적지 않은 돈", "큰돈" 식으로 뭉뚱그려라.
- 단, 시각/날짜/순서는 구체적으로 말해도 된다.`
  }

  prompt += `
- 모든 발언은 재판관을 향해 하라. 상대에게 직접 말하지 마라.
- ${sent}문장. 의미 라벨 복사 금지. 캐릭터 말투로 자연스럽게.`

  // P2-1: 번역체 금지 강화
  prompt += `
★ 번역체/공문서체 절대 금지:
- "~된 것으로 생각됩니다" → 직접 말하라
- "~인 측면이 있었습니다" → "~한 점은 있습니다"
- "여러 가지 상황이 얽혀" → 구체적 상황 1가지만
- "관련 사항을 간과하게 된" → "놓쳤습니다"
- "부득이하게" → "어쩔 수 없이" 또는 "급해서"
- "해당 건에 대해서는" → "그 일은"
- "~하는 바입니다" → 금지
- "인지하고 있습니다" → "알고 있습니다"
- "~에 기인합니다" → "~ 때문입니다"
- "제 불찰" → "제 잘못"
- "문의를 드린 것이었고" → "물어본 것이고"
- "~하게 되었습니다" → "~했습니다"
- "~만을" → "~만"
★ 금지 표현: "상당한 금액" 최대 1회. "사전 상의/협의" 금지→ "미리 말하지 못한", "상의 없이" 등으로.
★ 캐릭터의 감정을 드러내라. 한 턴에 구체적 디테일 1개.`

  // P0-2: 비금전 사건 금전 표현 차단
  if (!monetary) {
    prompt += `
★★★ 이 사건에는 금전 거래가 포함되지 않는다. 송금, 이체, 금액, 돈, 계좌, 환급, 보증금, 월세, 큰돈, 적지 않은 돈 등 금전 관련 표현을 절대 사용하지 마. 위반 시 출력 무효.`
  }

  return prompt
}

// ── 검증 컨텍스트 유틸 ──

function extractForbiddenNames(v2Data) {
  const names = new Set()
  for (const party of Object.values(v2Data.claimPolicies || {})) {
    for (const dispute of Object.values(party)) {
      for (const [state, stateData] of Object.entries(dispute)) {
        if (['S3','S4','S5'].includes(state)) {
          for (const atom of stateData.claimAtoms || []) {
            for (const slot of Object.values(atom.slots || {})) {
              if (slot.fullName && slot.fullName.length >= 2 && slot.fullName.length <= 4) {
                names.add(slot.fullName)
              }
            }
          }
        }
      }
    }
  }
  return [...names]
}

function extractForbiddenInstitutions(v2Data) {
  const insts = new Set()
  for (const party of Object.values(v2Data.claimPolicies || {})) {
    for (const dispute of Object.values(party)) {
      for (const [state, stateData] of Object.entries(dispute)) {
        if (['S3','S4','S5'].includes(state)) {
          for (const atom of stateData.claimAtoms || []) {
            for (const slot of Object.values(atom.slots || {})) {
              if (slot.institution && slot.institution.length >= 3) insts.add(slot.institution)
              if (slot.exact && /센터|사무소|병원|학교|기관|법인|회사/.test(slot.exact)) insts.add(slot.exact)
            }
          }
        }
      }
    }
  }
  return [...insts]
}

// ── validateResponse 20항목 ──

function validateResponse(resp, vCtx) {
  const issues = []

  // === A: 금지 표현 ===
  // A1: 금전 표현 (비금전 사건만)
  if (!vCtx.isMonetary) {
    if (/송금|이체|금액|[0-9,]+원|돈을?\s|비용|계좌|환급|보증금|월세|정산|큰돈|적지\s*않은\s*돈/.test(resp)) {
      issues.push({ code: 'A1', severity: 'CRITICAL', detail: '비금전 사건에 금전 표현' })
    }
  }

  // A2: 번역체 12패턴
  const translationPatterns = [
    [/된\s*것으로\s*생각/, '번역체:생각됩니다'],
    [/인\s*측면이\s*있었/, '번역체:측면'],
    [/여러\s*가지.*얽혀/, '번역체:여러가지얽혀'],
    [/간과하게\s*된/, '번역체:간과'],
    [/하는\s*바입니다/, '번역체:바입니다'],
    [/에\s*기인/, '번역체:기인'],
    [/부득이하게/, '번역체:부득이'],
    [/해당\s*건에\s*대해서는/, '번역체:해당건'],
    [/인지하고\s*있습니다/, '번역체:인지'],
    [/제\s*불찰/, '번역체:불찰'],
    [/문의를\s*드린/, '번역체:문의드린'],
    [/하게\s*되었습니다/, '번역체:하게되었'],
  ]
  for (const [pat, code] of translationPatterns) {
    if (pat.test(resp)) issues.push({ code: 'A2', severity: 'FAIL', detail: code })
  }

  // A3: "사전 상의/협의" (S0-S2에서만)
  if (['S0','S1','S2'].includes(vCtx.state)) {
    if (/사전\s*(상의|협의)/.test(resp)) {
      issues.push({ code: 'A3', severity: 'FAIL', detail: '사전상의금지' })
    }
  }

  // A4: 클리셰
  if (/미리\s*말씀드리지\s*못한/.test(resp)) {
    issues.push({ code: 'A4', severity: 'WARN', detail: '클리셰:미리말씀' })
  }

  // A5: "특정 X" 패턴
  if (/특정\s*(기관|인|금액|사람|곳|업체|단체)/.test(resp)) {
    issues.push({ code: 'A5', severity: 'FAIL', detail: '특정X패턴' })
  }

  // === B: Truth Throttle ===
  // B1: S0-S1에서 구체적 금액
  if (['S0','S1'].includes(vCtx.state) && vCtx.isMonetary) {
    if (/[0-9,]+만?\s*원|\d{2,}만\s*원/.test(resp)) {
      issues.push({ code: 'B1', severity: 'CRITICAL', detail: 'S0-S1 금액 노출' })
    }
  }

  // B2: S0-S1에서 인물 실명
  if (['S0','S1'].includes(vCtx.state) && vCtx.forbiddenNames) {
    for (const name of vCtx.forbiddenNames) {
      if (resp.includes(name)) {
        issues.push({ code: 'B2', severity: 'CRITICAL', detail: `S0-S1 실명 노출: ${name}` })
      }
    }
  }

  // B3: S0-S1에서 기관 정식명칭
  if (['S0','S1'].includes(vCtx.state) && vCtx.forbiddenInstitutions) {
    for (const inst of vCtx.forbiddenInstitutions) {
      if (resp.includes(inst)) {
        issues.push({ code: 'B3', severity: 'CRITICAL', detail: `S0-S1 기관명 노출: ${inst}` })
      }
    }
  }

  // B4: S5에서 구체적 사실 미포함
  if (vCtx.state === 'S5') {
    const sentences = resp.split(/[.!?]\s*/).filter(s => s.trim().length > 5)
    if (sentences.length < 4) {
      issues.push({ code: 'B4', severity: 'FAIL', detail: `S5 문장 부족(${sentences.length}/4)` })
    }
    if (vCtx.isMonetary && !/[0-9]+만?\s*원/.test(resp)) {
      issues.push({ code: 'B4', severity: 'FAIL', detail: 'S5 구체적 금액 미포함' })
    }
  }

  // === C: 호칭/조사 ===
  // C2: 이중 조사
  if (/이입니다|이습니다/.test(resp)) {
    issues.push({ code: 'C2', severity: 'FAIL', detail: '이중 조사: 이입니다' })
  }
  if (/만을\s/.test(resp)) {
    issues.push({ code: 'C2', severity: 'WARN', detail: '이중 조사: 만을' })
  }

  // C3: 반말 종결
  const banmalEndings = /(?:했어|했지|같아|없어|있어|봐|해줘|할게|거야|잖아|거든)\s*[.!?]?\s*$/m
  if (banmalEndings.test(resp)) {
    issues.push({ code: 'C3', severity: 'FAIL', detail: '재판관에게 반말' })
  }

  // C4: 해요체 잔존 (emotional/confess 제외)
  if (!['emotional','confess'].includes(vCtx.stance)) {
    if (/에요[.!?\s]|해요[.!?\s]|거예요[.!?\s]|했어요[.!?\s]|있어요[.!?\s]|같아요[.!?\s]/.test(resp)) {
      issues.push({ code: 'C4', severity: 'FAIL', detail: '해요체 잔존' })
    }
  }

  // === D: 반복/다양성 ===
  // D1: "상당한 금액" 2회+
  if (resp.includes('상당한 금액')) {
    vCtx.usageCount = vCtx.usageCount || {}
    vCtx.usageCount['상당한금액'] = (vCtx.usageCount['상당한금액'] || 0) + 1
    if (vCtx.usageCount['상당한금액'] > 1) {
      issues.push({ code: 'D1', severity: 'FAIL', detail: '상당한금액 반복' })
    }
  }

  // D2: 같은 표현 2턴 연속 (3어절 이상)
  if (vCtx.prevResponse) {
    const currPhrases = resp.split(/\s+/)
    for (let i = 0; i < currPhrases.length - 2; i++) {
      const tri = currPhrases.slice(i, i + 3).join(' ')
      if (tri.length > 8 && vCtx.prevResponse.includes(tri)) {
        issues.push({ code: 'D2', severity: 'WARN', detail: `2턴 연속: "${tri}"` })
        break
      }
    }
  }
  vCtx.prevResponse = resp

  // D3: 같은 사과 2턴 연속
  const apologyPatterns = ['못 알렸', '혼자 결정', '숨긴 건', '입을 닫', '상의 없이', '알리지 않고', '말을 꺼내지']
  const currentApology = apologyPatterns.find(p => resp.includes(p))
  if (currentApology && vCtx.prevApology === currentApology) {
    issues.push({ code: 'D3', severity: 'WARN', detail: `사과 반복: "${currentApology}"` })
  }
  vCtx.prevApology = currentApology || null

  // === E: Hallucination ===
  // E1: 시스템 거절
  if (/I'm sorry|I cannot|I can't|as an AI|죄송합니다.*제가.*데이터|제공해\s*주시면|지시서를\s*다시/.test(resp)) {
    issues.push({ code: 'E1', severity: 'CRITICAL', detail: '시스템 거절/프롬프트 누출' })
  }

  // E2: 프롬프트 누출
  if (/system prompt|지시서|프롬프트|instruction|역할극|roleplay/i.test(resp)) {
    issues.push({ code: 'E2', severity: 'CRITICAL', detail: '프롬프트 누출' })
  }

  return issues
}

// ── 1턴 실행 ──

async function run(label, party, disputeId, state, subAction, judgeQ, evidenceInfo, caseData, v2Data, ctx) {
  ctx.turnNum++
  const profile = party === 'a' ? caseData.duo.partyA : caseData.duo.partyB
  const policy = v2Data.claimPolicies[party]?.[disputeId]?.[state]

  const { stance, defense, sent } = getStance(state, 30)

  // P1-1: atoms 없으면 fallback
  const rawAtoms = policy?.claimAtoms || []
  const atoms = selectAtoms(rawAtoms, subAction)
  if (atoms.length === 0 || rawAtoms.length === 0) {
    const fallbackResponses = {
      deny: '그 부분은 제가 지금 바로 말씀드리기 어렵습니다.',
      hedge: '여러 사정이 있었습니다. 다만 지금은 정리가 필요합니다.',
      partial: '인정할 부분은 있습니다. 다만 전체를 말씀드리기엔 이릅니다.',
      blame: '제 잘못만은 아닙니다. 상대방도 확인해 보셔야 합니다.',
      emotional: '솔직히 그때는 힘들었습니다.',
      confess: '숨긴 건 사실입니다. 제 잘못입니다.',
    }
    const resp = fallbackResponses[stance] || '답변을 준비하겠습니다.'
    console.log(`  [WARN] #${ctx.turnNum} [${state}/${subAction}/${stance}] ${label} (atoms_fallback)`)
    console.log(`     Q: ${judgeQ.slice(0, 60)}`)
    console.log(`     A: ${profile.name}: ${resp}\n`)
    ctx.results.push({ num: ctx.turnNum, label, party, disputeId, state, subAction, stance, defense, judgeQ, response: resp, hint: 'atoms_empty_fallback', issues: [{ code: 'F1', severity: 'WARN', detail: 'atoms_empty_fallback' }], evidence: !!evidenceInfo })
    return resp
  }

  const slotMaterial = resolveSlots(atoms, null, subAction, stance)
  const judgeRef = profile.callTerms?.toJudge ?? '상대방'
  const callForm = profile.callTerms?.toPartner ?? '상대방'

  const sys = buildPrompt(profile, atoms, slotMaterial, stance, defense, subAction, policy.suppressions ?? [], policy.privateKnowledge ?? [], judgeRef, callForm, sent, evidenceInfo, caseData, state)
  const usr = `재판관 질문: ${judgeQ}\n${sent}문장으로 연기하라.\n★ 이전 턴과 다른 표현으로. "사전 상의"/"협의" 금지.\n출력: JSON { "npcResponse": "...", "behaviorHint": "..." }`

  try {
    const raw = await callLLM(sys, usr)
    const parsed = JSON.parse((raw.match(/\{[\s\S]*\}/) ?? ['{}'])[0])
    const resp = parsed.npcResponse ?? raw.slice(0, 200)

    // 검증 컨텍스트 구성
    if (!ctx._vCtx) {
      ctx._vCtx = {
        caseId: caseData.caseId,
        isMonetary: isMonetaryCase(caseData),
        forbiddenNames: extractForbiddenNames(v2Data),
        forbiddenInstitutions: extractForbiddenInstitutions(v2Data),
        usageCount: {},
        prevResponse: null,
        prevApology: null,
      }
    }
    ctx._vCtx.state = state
    ctx._vCtx.stance = stance

    const issues = validateResponse(resp, ctx._vCtx)

    // severity 기반 상태 결정
    const hasCritical = issues.some(i => i.severity === 'CRITICAL')
    const hasFail = issues.some(i => i.severity === 'FAIL')
    const status = hasCritical ? 'CRITICAL' : hasFail ? 'FAIL' : issues.length > 0 ? 'WARN' : 'PASS'

    console.log(`  [${status}] #${ctx.turnNum} [${state}/${subAction}/${stance}] ${label}`)
    console.log(`     Q: ${judgeQ.slice(0, 60)}`)
    console.log(`     A: ${profile.name}: ${resp}`)
    if (parsed.behaviorHint) console.log(`     hint: ${parsed.behaviorHint}`)
    if (issues.length > 0) console.log(`     ISSUES: ${issues.map(i => `[${i.severity}]${i.code}:${i.detail}`).join(', ')}`)
    console.log()

    ctx.results.push({ num: ctx.turnNum, label, party, disputeId, state, subAction, stance, defense, judgeQ, response: resp, hint: parsed.behaviorHint, issues, evidence: !!evidenceInfo })
    return resp
  } catch (e) {
    console.log(`  [ERROR] #${ctx.turnNum} ${label}: ${e.message}\n`)
    ctx.results.push({ num: ctx.turnNum, label, error: e.message })
    return null
  }
}

async function delay(ms) { return new Promise(r => setTimeout(r, ms)) }

// ── 종합 리포트 ──

function generateReport(results, caseData) {
  console.log('\n===================================================================')
  console.log('  종합 리포트')
  console.log('===================================================================\n')

  const valid = results.filter(r => !r.error)
  const criticals = valid.filter(r => r.issues?.some(i => i.severity === 'CRITICAL')).length
  const fails = valid.filter(r => !r.issues?.some(i => i.severity === 'CRITICAL') && r.issues?.some(i => i.severity === 'FAIL')).length
  const warns = valid.filter(r => r.issues?.length > 0 && !r.issues.some(i => i.severity === 'CRITICAL' || i.severity === 'FAIL')).length
  const passed = valid.filter(r => !r.issues || r.issues.length === 0).length
  const errors = results.filter(r => r.error).length

  console.log(`총 ${results.length}턴 | PASS ${passed} | WARN ${warns} | FAIL ${fails} | CRITICAL ${criticals} | ERROR ${errors}\n`)

  // 이슈 빈도
  const issueCounts = {}
  for (const r of results) if (r.issues) for (const i of r.issues) {
    const key = `[${i.severity}]${i.code}:${i.detail}`
    issueCounts[key] = (issueCounts[key] ?? 0) + 1
  }
  if (Object.keys(issueCounts).length > 0) {
    console.log('이슈 빈도:')
    for (const [issue, count] of Object.entries(issueCounts).sort((a, b) => b[1] - a[1]).slice(0, 15)) {
      console.log(`  ${count}회 -- ${issue}`)
    }
    console.log()
  }

  return results.map(r => {
    if (r.error) return `#${r.num} [ERROR] ${r.label}: ${r.error}`
    const status = r.issues?.some(i => i.severity === 'CRITICAL') ? 'CRITICAL' : r.issues?.some(i => i.severity === 'FAIL') ? 'FAIL' : r.issues?.length > 0 ? 'WARN' : 'PASS'
    return `#${r.num} [${status}] ${r.label} [${r.state}/${r.subAction}/${r.stance}]\n  Q: ${r.judgeQ}\n  A: ${r.response}\n  issues: ${r.issues?.map(i => `[${i.severity}]${i.detail}`).join(', ') || 'none'}`
  }).join('\n\n')
}

module.exports = {
  MODEL,
  RULES,
  ARCHETYPE,
  TELL_HINTS,
  FOCUS,
  STANCE,
  DEFENSE,
  pp을를,
  pp이가,
  pp은는,
  pp과와,
  isMonetaryCase,
  extractForbiddenNames,
  extractForbiddenInstitutions,
  callLLM,
  selectAtoms,
  resolveSlots,
  extractSubject,
  getStance,
  buildPrompt,
  validateResponse,
  run,
  delay,
  generateReport,
}
