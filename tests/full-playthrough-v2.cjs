/**
 * V2 풀 플레이스루 테스트 — 심문 + 증거 포함 20턴
 * 실제 게임 루프를 시뮬레이션: 심문 → 증거 제시 → 상태 진행
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

const ARCHETYPE = { avoidant: '회피형: 화제 전환, 순서/절차 앞세움. 말이 길어짐.', confrontational: '정면돌파형: 짧고 날카로움. 역공 선호.' }
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
${suppression.slice(0, 3).map(s => `- ❌ ${s}`).join('\n')}

## 호칭
- 재판관: 존댓말
- 상대 언급(재판관에게): "${judgeRef}"
- 상대에게 직접: "${callForm}"

## 출력
JSON { "npcResponse": "대사", "behaviorHint": "행동묘사" }

★ 절대 규칙:
- 재판관에게는 반드시 존댓말. 반말 종결 금지.
- 재판관에게 되묻지 마라.
- ${sent}문장. 의미 라벨 복사 금지. 캐릭터 말투로 자연스럽게.`
}

// ── 테스트 실행 ──
const results = []
let turnNum = 0

async function run(label, party, disputeId, state, subAction, judgeQ, evidenceInfo) {
  turnNum++
  const profile = party === 'a' ? caseData.duo.partyA : caseData.duo.partyB
  const policy = v2Data.claimPolicies[party]?.[disputeId]?.[state]
  if (!policy?.claimAtoms) { console.log(`  ⏭️ #${turnNum} ${label}: atoms 없음`); return null }

  const atoms = selectAtoms(policy.claimAtoms, subAction)
  const slotMaterial = resolveSlots(atoms, null, subAction)
  const { stance, defense, sent } = getStance(state, 30)
  const judgeRef = party === 'a' ? '제 아내' : '제 남편'
  const callForm = profile.callTerms?.toPartner === '자기' ? '자기야' : (profile.callTerms?.toPartner ?? '상대방')

  const sys = buildPrompt(profile, atoms, slotMaterial, stance, defense, subAction, policy.suppressions ?? [], policy.privateKnowledge ?? [], judgeRef, callForm, sent, evidenceInfo)
  const usr = `재판관 질문: ${judgeQ}\n${sent}문장으로 연기하라.\n출력: JSON { "npcResponse": "...", "behaviorHint": "..." }`

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
