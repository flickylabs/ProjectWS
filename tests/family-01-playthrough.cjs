/**
 * family-01 V2 풀 플레이스루 테스트 — 심문 + 증거 포함 20턴
 * 가족 관계 사건: 윤서아(partyA, victim_cosplay) vs 윤도현(partyB, cold_logic)
 * 부모 간병비 갈등 — 5개 쟁점(d-1~d-5), S1~S5, 4종 질문, 증거 제시
 */
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '..', '.env') })

const API_KEY = process.env.VITE_OPENAI_API_KEY
const MODEL = 'gpt-4o'
const BASE_URL = 'https://api.openai.com/v1'

const v2Data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'docs/ref/리뉴얼참고/gpt-session2/output/family-01-v2-atoms.json'), 'utf8'))
const caseData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src/data/cases/generated/family-01.json'), 'utf8'))

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
      else value = tellExact || isEvidence ? (slot.exact ?? slot.neutral) : (slot.neutral ?? Object.values(slot).find(v => typeof v === 'string'))
      if (value) materials.push(`${family}: ${value}`)
    }
  }
  return [...new Set(materials)].join('\n') || '(없음)'
}

function extractSubject(name) {
  let s = name.replace(/^[가-힣]+의\s+/, '').replace(/비밀\s*/g, '').replace(/\s*\d+만원\s*/g, ' ').trim()
  return s.split(/\s+/).filter((w, i, a) => a.indexOf(w) === i).join(' ') || '해당 사안'
}

const ARCHETYPE = { avoidant: '회피형: 화제 전환, 순서/절차 앞세움. 말이 길어짐.', confrontational: '정면돌파형: 짧고 날카로움. 역공 선호.', victim_cosplay: '피해자 행세형: 희생 목록을 먼저 늘어놓아 방어. 감정으로 반박을 잔인하게 만든다.', cold_logic: '냉정논리형: 숫자와 절차로 감정을 차단. 짧고 건조하게 답한다.' }
const FOCUS = {
  fact_pursuit: '사실 여부를 묻고 있다. "무엇을 했는지/안 했는지"만 답하라.',
  motive_search: '이유를 묻고 있다. "왜 그랬는지, 왜 숨겼는지" 답하라. 사실 나열 금지.',
  empathy_approach: '심정을 묻고 있다. "어떤 마음이었는지" 답하라. 반격보다 감정 먼저.',
  evidence_present: '증거가 제시됐다. 이 증거에 대한 입장을 밝혀라. 증거 내용을 정면으로 다뤄라.',
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
  return `너는 "${profile.name}"이다. ${profile.age}세, ${profile.occupation}.

## 캐릭터
${ARCHETYPE[profile.archetype] ?? ''}

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

## 숨기는 것
${privateKnowledge.slice(0, 3).map(k => `- ${k}`).join('\n')}

## 금지
${suppression.slice(0, 3).map(s => `- [X] ${s}`).join('\n')}

## 호칭
- 재판관: 존댓말
- 상대 언급(재판관에게): "${judgeRef}"
- 상대에게 직접: "${callForm}"

## 출력
JSON { "npcResponse": "대사", "behaviorHint": "행동묘사" }

★ 절대 규칙:
- 재판관에게는 반드시 존댓말. 반말 종결 금지.
- 재판관에게 되묻지 마라.
- 금액·날짜를 정확한 숫자로 말하지 마라. "상당한 금액", "그 무렵" 식으로 뭉뚱그려라. (단, 말버릇 지시가 있으면 그때만 허용)
- 모든 발언은 재판관을 향해 하라. 상대에게 직접 말하지 마라.
- ${sent}문장. 의미 라벨 복사 금지. 캐릭터 말투로 자연스럽게.`
}

// ── 테스트 실행 ──
const results = []
let turnNum = 0

async function run(label, party, disputeId, state, subAction, judgeQ, evidenceInfo) {
  turnNum++
  const profile = party === 'a' ? caseData.duo.partyA : caseData.duo.partyB
  const policy = v2Data.claimPolicies[party]?.[disputeId]?.[state]
  if (!policy?.claimAtoms) { console.log(`  [SKIP] #${turnNum} ${label}: atoms 없음`); return null }

  const atoms = selectAtoms(policy.claimAtoms, subAction)
  const slotMaterial = resolveSlots(atoms, null, subAction)
  const { stance, defense, sent } = getStance(state, 30)

  // 가족 관계 호칭
  const judgeRef = profile.callTerms?.toJudge ?? '상대방'
  const callForm = profile.callTerms?.toPartner ?? '상대방'

  const sys = buildPrompt(profile, atoms, slotMaterial, stance, defense, subAction, policy.suppressions ?? [], policy.privateKnowledge ?? [], judgeRef, callForm, sent, evidenceInfo)
  const usr = `재판관 질문: ${judgeQ}\n${sent}문장으로 연기하라.\n출력: JSON { "npcResponse": "...", "behaviorHint": "..." }`

  try {
    const raw = await callLLM(sys, usr)
    const parsed = JSON.parse((raw.match(/\{[\s\S]*\}/) ?? ['{}'])[0])
    const resp = parsed.npcResponse ?? raw.slice(0, 200)

    const issues = []
    // 배우자 호칭 누출 검사
    if (resp.includes('제 아내') || resp.includes('제 남편') || resp.includes('남편이') || resp.includes('아내가')) issues.push('배우자호칭누출')
    // 재판관 앞에서 반말 애칭
    if (resp.includes('자기가') || resp.includes('자기야')) issues.push('재판관앞_애칭')
    // non-deny 상태에서 전면부정
    if (resp.includes('그런 적 없습니다') && stance !== 'deny') issues.push('non-deny에서_deny')
    // 정확한 금액 노출 (1,800만원 — anchorTruth 핵심 금액)
    if (resp.match(/1[,.]?800만/) && subAction !== 'evidence_present' && stance !== 'confess') issues.push('exact금액_1800만')
    // 반말 종결 / 되묻기
    if (resp.match(/[해야겠어궁금해생각해어떻게]\s*[?？]?\s*$/)) issues.push('반말종결/되묻기')
    // 이름 직접 호칭 (재판관 앞에서)
    if (party === 'a' && resp.match(/도현[이가을를은는]/) && !resp.includes('제 동생')) issues.push('이름직접호칭_A')
    if (party === 'b' && resp.match(/서아[가을를은는]/) && !resp.includes('제 누나')) issues.push('이름직접호칭_B')
    // 존댓말 일관성: 반말 종결어미 탐지
    const banmalEndings = resp.match(/(?:했어|했지|했다|그랬어|아닌데|맞잖아|했잖아|그런데|알아|몰라|싶어|거야|건데|거든|같아서|인데|는데요?)\s*[.!]?\s*$/gm)
    if (banmalEndings && banmalEndings.length > 0) {
      const realBanmal = banmalEndings.filter(m => !m.match(/요\s*[.!]?\s*$/))
      if (realBanmal.length > 0) issues.push('반말종결어미:' + realBanmal[0].trim())
    }
    // 문장 수 검사
    const sentCount = resp.split(/[.!?。]\s*/).filter(s => s.trim().length > 2).length
    if (sentCount > sent + 2) issues.push(`문장초과(${sentCount}/${sent})`)

    const status = issues.length === 0 ? 'PASS' : 'WARN'
    console.log(`  [${status}] #${turnNum} [${state}/${subAction}/${stance}] ${label}`)
    console.log(`     Q: ${judgeQ.slice(0, 60)}`)
    console.log(`     A: ${profile.name}: ${resp}`)
    if (parsed.behaviorHint) console.log(`     hint: ${parsed.behaviorHint}`)
    if (issues.length > 0) console.log(`     ISSUES: ${issues.join(', ')}`)
    console.log()

    results.push({ num: turnNum, label, party, disputeId, state, subAction, stance, defense, judgeQ, response: resp, hint: parsed.behaviorHint, issues, evidence: !!evidenceInfo })
    return resp
  } catch (e) {
    console.log(`  [ERROR] #${turnNum} ${label}: ${e.message}\n`)
    results.push({ num: turnNum, label, error: e.message })
    return null
  }
}

async function delay(ms) { return new Promise(r => setTimeout(r, ms)) }

async function main() {
  console.log('===================================================================')
  console.log('  family-01 V2 풀 플레이스루 (심문 + 증거) — 20턴')
  console.log(`  사건: 부모 간병비 갈등 (윤서아 vs 윤도현)`)
  console.log(`  모델: ${MODEL} | ${new Date().toISOString()}`)
  console.log('===================================================================\n')

  // 증거 정보
  const e1 = caseData.evidence.find(e => e.id === 'e-1')
  const e2 = caseData.evidence.find(e => e.id === 'e-2')
  const e3 = caseData.evidence.find(e => e.id === 'e-3')
  const e4 = caseData.evidence.find(e => e.id === 'e-4')
  const e5 = caseData.evidence.find(e => e.id === 'e-5')

  // ═══════════════════════════════════════════
  // 1~3턴: 윤서아 d-1 초기 심문 (S0~S1)
  // ═══════════════════════════════════════════
  console.log('--- 1~3턴: 윤서아 d-1 S1 초기 심문 ---')
  await run('윤서아 d-1 S1 사실추궁', 'a', 'd-1', 'S1', 'fact_pursuit',
    '윤서아 씨, 부모님 관리계좌에서 본인 계좌로 이체된 건에 대해 사실 여부를 확인하겠습니다.')
  await delay(2000)
  await run('윤서아 d-1 S1 동기탐색', 'a', 'd-1', 'S1', 'motive_search',
    '윤서아 씨, 부모님 계좌에서 돈을 옮긴 이유가 무엇입니까?')
  await delay(2000)
  await run('윤서아 d-1 S1 공감접근', 'a', 'd-1', 'S1', 'empathy_approach',
    '윤서아 씨, 간병을 혼자 떠안았다는 심정을 말씀해 주시겠습니까?')
  await delay(2000)

  // ═══════════════════════════════════════════
  // 4~5턴: 윤도현 d-1/d-2 초기 심문 (S0~S1)
  // ═══════════════════════════════════════════
  console.log('--- 4~5턴: 윤도현 d-1/d-2 S1 초기 심문 ---')
  await run('윤도현 d-1 S1 사실추궁', 'b', 'd-1', 'S1', 'fact_pursuit',
    '윤도현 씨, 누나분이 부모님 계좌에서 돈을 옮긴 사실을 언제 알게 되셨습니까?')
  await delay(2000)
  await run('윤도현 d-2 S1 사실추궁', 'b', 'd-2', 'S1', 'fact_pursuit',
    '윤도현 씨, 간병비 분담금 입금이 지연된 것이 사실입니까?')
  await delay(2000)

  // ═══════════════════════════════════════════
  // 6~7턴: 증거 e-1 제시 (양측)
  // ═══════════════════════════════════════════
  console.log('--- 6~7턴: 증거 e-1 제시 ---')
  await run('윤서아 e-1 증거제시', 'a', 'd-1', 'S1', 'evidence_present',
    '윤서아 씨, 이 거래내역서에 대해 입장을 밝혀 주십시오.',
    `증거: ${e1.name}\n설명: ${e1.description.slice(0, 120)}`)
  await delay(2000)
  await run('윤도현 e-1 증거제시', 'b', 'd-1', 'S1', 'evidence_present',
    '윤도현 씨, 이 거래내역서를 보시고 어떻게 생각하십니까?',
    `증거: ${e1.name}\n설명: ${e1.description.slice(0, 120)}`)
  await delay(2000)

  // ═══════════════════════════════════════════
  // 8~9턴: 윤서아 d-1 S2 (부분 인정)
  // ═══════════════════════════════════════════
  console.log('--- 8~9턴: 윤서아 d-1 S2 부분 인정 ---')
  await run('윤서아 d-1 S2 사실추궁', 'a', 'd-1', 'S2', 'fact_pursuit',
    '윤서아 씨, 이체한 금액의 용처에 대해 좀 더 구체적으로 말씀해 주십시오.')
  await delay(2000)
  await run('윤서아 d-1 S2 동기탐색', 'a', 'd-1', 'S2', 'motive_search',
    '윤서아 씨, 왜 공유표에 기록하지 않고 먼저 이체하셨습니까?')
  await delay(2000)

  // ═══════════════════════════════════════════
  // 10~11턴: 윤도현 d-2 S2
  // ═══════════════════════════════════════════
  console.log('--- 10~11턴: 윤도현 d-2 S2 ---')
  await run('윤도현 d-2 S2 사실추궁', 'b', 'd-2', 'S2', 'fact_pursuit',
    '윤도현 씨, 간병비 분담금을 12일 늦게 입금한 경위를 구체적으로 말씀해 주십시오.')
  await delay(2000)
  await run('윤도현 d-2 S2 공감접근', 'b', 'd-2', 'S2', 'empathy_approach',
    '윤도현 씨, 누나분이 혼자 간병을 떠안았다고 느꼈을 때 어떤 심정이셨습니까?')
  await delay(2000)

  // ═══════════════════════════════════════════
  // 12~13턴: 증거 e-2/e-3 제시
  // ═══════════════════════════════════════════
  console.log('--- 12~13턴: 증거 e-2/e-3 제시 ---')
  await run('윤서아 e-2 증거제시 S2', 'a', 'd-1', 'S2', 'evidence_present',
    '윤서아 씨, 이 휴대폰 메모 복원본에 대해 입장을 밝혀 주십시오.',
    `증거: ${e2.name}\n설명: ${e2.description.slice(0, 120)}`)
  await delay(2000)
  await run('윤도현 e-3 증거제시', 'b', 'd-2', 'S2', 'evidence_present',
    '윤도현 씨, 이 가족 단톡과 간병 스케줄표를 보시고 설명해 주십시오.',
    `증거: ${e3.name}\n설명: ${e3.description.slice(0, 120)}`)
  await delay(2000)

  // ═══════════════════════════════════════════
  // 14~15턴: 윤서아 d-1 S3 (전가/반격)
  // ═══════════════════════════════════════════
  console.log('--- 14~15턴: 윤서아 d-1 S3 ---')
  await run('윤서아 d-1 S3 사실추궁(blame)', 'a', 'd-1', 'S3', 'fact_pursuit',
    '윤서아 씨, 사실관계가 분명하지 않습니다. 다시 설명해 주십시오.')
  await delay(2000)
  await run('윤서아 d-1 S3 동기탐색(partial)', 'a', 'd-1', 'S3', 'motive_search',
    '윤서아 씨, 왜 그런 판단을 내리셨는지 아직 납득이 되지 않습니다.')
  await delay(2000)

  // ═══════════════════════════════════════════
  // 16~17턴: 윤도현 d-2/d-3 S3
  // ═══════════════════════════════════════════
  console.log('--- 16~17턴: 윤도현 d-2/d-3 S3 ---')
  await run('윤도현 d-2 S3 사실추궁', 'b', 'd-2', 'S3', 'fact_pursuit',
    '윤도현 씨, 간병비 지연과 교대 공백에 대해 다시 한번 정리해 주십시오.')
  await delay(2000)
  await run('윤도현 d-3 S1 사실추궁', 'b', 'd-3', 'S1', 'fact_pursuit',
    '윤도현 씨, 아버지 수첩 메모를 상속 예고로 보신 이유가 무엇입니까?')
  await delay(2000)

  // ═══════════════════════════════════════════
  // 18~19턴: 윤서아 S4 (감정), 증거 e-4/e-5
  // ═══════════════════════════════════════════
  console.log('--- 18~19턴: 윤서아 S4 + 증거 ---')
  await run('윤서아 d-1 S4 공감접근(emotional)', 'a', 'd-1', 'S4', 'empathy_approach',
    '윤서아 씨, 당시 심정을 충분히 듣겠습니다. 솔직하게 말씀해 주십시오.')
  await delay(2000)
  await run('윤서아 e-4 증거제시', 'a', 'd-3', 'S1', 'evidence_present',
    '윤서아 씨, 이 아버지 수첩 메모 사진에 대해 입장을 밝혀 주십시오.',
    `증거: ${e4.name}\n설명: ${e4.description.slice(0, 120)}`)
  await delay(2000)

  // ═══════════════════════════════════════════
  // 20턴: 윤서아 S5 (고백)
  // ═══════════════════════════════════════════
  console.log('--- 20턴: 윤서아 d-1 S5 고백 ---')
  await run('윤서아 d-1 S5 사실추궁(confess)', 'a', 'd-1', 'S5', 'fact_pursuit',
    '윤서아 씨, 이제 사실대로 말씀해 주십시오.')

  // ── 종합 리포트 ──
  console.log('\n===================================================================')
  console.log('  종합 리포트')
  console.log('===================================================================\n')

  const total = results.filter(r => !r.error).length
  const passed = results.filter(r => !r.error && r.issues.length === 0).length
  const warned = results.filter(r => !r.error && r.issues.length > 0).length
  const errors = results.filter(r => r.error).length
  const evTurns = results.filter(r => r.evidence).length

  console.log(`총 ${results.length}턴 (심문 ${total - evTurns} + 증거 ${evTurns}) | PASS ${passed} | WARN ${warned} | ERROR ${errors}\n`)

  // 이슈 빈도
  const issueCounts = {}
  for (const r of results) if (r.issues) for (const i of r.issues) issueCounts[i] = (issueCounts[i] ?? 0) + 1
  if (Object.keys(issueCounts).length > 0) {
    console.log('이슈 빈도:')
    for (const [issue, count] of Object.entries(issueCounts).sort((a, b) => b[1] - a[1])) console.log(`  ${count}회 -- ${issue}`)
    console.log()
  }

  // 호칭 분석
  console.log('--- 호칭 분석 ---')
  for (const r of results.filter(r => !r.error)) {
    const resp = r.response || ''
    const hasSpouseTerms = /아내|남편|배우자/.test(resp)
    const hasFamilyTerms = /동생|누나|언니|형/.test(resp)
    const honorific = !/[해야겠어궁금해알아몰라싶어거야건데거든]$/.test(resp.replace(/\s+/g, ''))
    console.log(`  #${r.num} ${r.label}: spouse=${hasSpouseTerms ? 'LEAK!' : 'ok'} family=${hasFamilyTerms ? 'ok' : '-'} honorific=${honorific ? 'ok' : 'WARN'}`)
  }

  // 상태 진행 요약
  console.log('\n--- 윤서아 d-1 상태 진행 ---')
  for (const r of results.filter(r => r.party === 'a' && r.disputeId === 'd-1' && !r.error)) {
    console.log(`  ${r.state} [${r.subAction}${r.evidence ? '+증거' : ''}]: ${r.response?.slice(0, 80)}`)
  }
  console.log('\n--- 윤도현 d-2 상태 진행 ---')
  for (const r of results.filter(r => r.party === 'b' && r.disputeId === 'd-2' && !r.error)) {
    console.log(`  ${r.state} [${r.subAction}${r.evidence ? '+증거' : ''}]: ${r.response?.slice(0, 80)}`)
  }

  // 증거 제시 응답
  console.log('\n--- 증거 제시 응답 ---')
  for (const r of results.filter(r => r.evidence && !r.error)) {
    console.log(`  ${r.label}: ${r.response?.slice(0, 90)}`)
  }

  // 쟁점 커버리지
  console.log('\n--- 쟁점 커버리지 ---')
  const coveredDisputes = new Set(results.filter(r => !r.error).map(r => r.disputeId))
  const coveredStates = new Set(results.filter(r => !r.error).map(r => r.state))
  const coveredActions = new Set(results.filter(r => !r.error).map(r => r.subAction))
  console.log(`  쟁점: ${[...coveredDisputes].sort().join(', ')}`)
  console.log(`  상태: ${[...coveredStates].sort().join(', ')}`)
  console.log(`  질문유형: ${[...coveredActions].sort().join(', ')}`)

  // 결과 저장
  const outPath = path.join(__dirname, '..', 'docs/ref/리뉴얼참고/thread-packages/thread-E/reports/family-01-playthrough-results.txt')
  const reportLines = results.map(r => {
    if (r.error) return `#${r.num} [ERROR] ${r.label}: ${r.error}`
    return `#${r.num} [${r.issues.length === 0 ? 'PASS' : 'WARN'}] ${r.label} [${r.state}/${r.subAction}/${r.stance}]\n  Q: ${r.judgeQ}\n  A: ${r.response}\n  hint: ${r.hint || ''}\n  issues: ${r.issues.join(', ') || 'none'}`
  }).join('\n\n')
  fs.writeFileSync(outPath, reportLines)
  console.log(`\n결과 저장: ${outPath}`)
}

main().catch(console.error)
