/**
 * 스트레스 테스트 — 20라운드 × 다양한 조합
 * 심문 전 액션 + 증거 전종 + 상태 S1→S5 + 양측 교차
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
  for (let retry = 0; retry < 3; retry++) {
    try {
      const res = await fetch(`${BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
        body: JSON.stringify({ model: MODEL, messages: [{ role: 'system', content: sys }, { role: 'user', content: usr }], temperature: 0.85, max_tokens: 250 }),
      })
      if (res.status === 429) { console.log('    ⏳ rate limit, waiting 10s...'); await delay(10000); continue }
      if (!res.ok) throw new Error(`API ${res.status}`)
      return (await res.json()).choices[0]?.message?.content ?? ''
    } catch (e) {
      if (retry < 2) { await delay(5000); continue }
      throw e
    }
  }
}

const RULES = {
  fact_pursuit: { primary: ['act', 'timeline', 'rule'], avoid: ['emotion', 'fear', 'shame'] },
  motive_search: { primary: ['motive', 'self_justification', 'responsibility'], avoid: ['timeline'] },
  empathy_approach: { primary: ['emotion', 'fear', 'shame', 'relationship', 'harm'], avoid: ['rule', 'timeline', 'counter'] },
  evidence_present: { primary: ['evidence', 'context', 'identity', 'quote'], avoid: ['emotion'] },
}

function selectAtoms(atoms, sub) {
  const rule = RULES[sub] ?? RULES.fact_pursuit
  let cands = atoms.filter(a => !a.usableInSubActions || a.usableInSubActions.includes(sub))
  if (cands.length === 0) cands = atoms
  const scored = cands.map(a => {
    let s = 0
    for (const t of rule.primary) if (a.tags.includes(t)) s += 100
    if (rule.avoid) for (const t of rule.avoid) if (a.tags.includes(t)) s -= 200
    return { ...a, s }
  })
  scored.sort((a, b) => b.s - a.s)
  return scored.slice(0, 2)
}

function resolveSlots(atoms, tell, sub) {
  const exact = tell === 'over_precision' || sub === 'evidence_present'
  const mats = []
  for (const a of atoms) {
    if (!a.slots) continue
    for (const [f, slot] of Object.entries(a.slots)) {
      if (!slot) continue
      let v
      if ((f === 'amount' || f === 'time') && !exact) v = slot.neutral
      else if (f === 'person' || f === 'relation' || f === 'beneficiary') v = slot.judgeRef ?? slot.neutral
      else v = exact ? (slot.exact ?? slot.neutral) : (slot.neutral ?? Object.values(slot).find(x => typeof x === 'string'))
      if (v) mats.push(`${f}: ${v}`)
    }
  }
  return [...new Set(mats)].join('\n') || '(없음)'
}

const ARCH = { avoidant: '회피형: 화제 전환, 순서 앞세움, 말 길어짐.', confrontational: '정면돌파형: 짧고 날카로움, 역공 선호.' }
const FOCUS = { fact_pursuit: '사실 여부만 답하라.', motive_search: '왜 그랬는지, 왜 숨겼는지 답하라.', empathy_approach: '어떤 마음이었는지 답하라.', evidence_present: '이 증거에 대한 입장을 밝혀라.' }
const ST = { deny: '부정', hedge: '의미 흐림', partial: '부분 인정', blame: '전가', emotional: '감정 호소', confess: '인정' }
const DEF = { flat_denial: '사실 부정', silence: '말 아끼기', concession: '인정', counterattack: '역공' }

function getSD(state, trust) {
  const m = { S0: ['deny','flat_denial',1], S1: ['hedge','silence',2], S2: ['partial','concession',2], S3: [trust<40?'blame':'partial',trust<40?'counterattack':'concession',2], S4: [trust>=60?'confess':'emotional',trust>=60?'concession':'silence',trust>=60?3:2], S5: ['confess','concession',3] }
  const [s,d,c] = m[state] ?? m.S1
  return { stance: s, defense: d, sent: c }
}

function buildP(prof, atoms, slots, stance, defense, sub, supp, priv, jRef, cForm, sent, evInfo) {
  return `너는 "${prof.name}"이다. ${prof.age}세, ${prof.occupation}.
## 캐릭터
${ARCH[prof.archetype] ?? ''}
## 지시서
- 태도: ${ST[stance]}
- 방어: ${DEF[defense] ?? defense}
- ${sent}문장
## 답변 초점
${FOCUS[sub]}
${evInfo ? `## 증거\n${evInfo}` : ''}
## 의미
${atoms.map(a => `- ${a.factText}`).join('\n')}
## 표현 재료
${slots}
## 숨기는 것
${priv.slice(0,2).map(k => `- ${k}`).join('\n')}
## 금지
${supp.slice(0,2).map(s => `- ❌ ${s}`).join('\n')}
## 호칭
- 재판관: 존댓말 / 상대 언급: "${jRef}" / 상대 직접: "${cForm}"
## 출력
JSON { "npcResponse": "대사", "behaviorHint": "행동묘사" }
★ 재판관에게 반드시 존댓말. 반말/되묻기 금지. ${sent}문장. 의미 라벨 복사 금지.`
}

const results = []
let num = 0

async function run(label, party, dId, state, sub, judgeQ, evInfo) {
  num++
  const prof = party === 'a' ? caseData.duo.partyA : caseData.duo.partyB
  const pol = v2Data.claimPolicies[party]?.[dId]?.[state]
  if (!pol?.claimAtoms) { results.push({ num, label, skip: true }); return }

  const atoms = selectAtoms(pol.claimAtoms, sub)
  const slots = resolveSlots(atoms, null, sub)
  const { stance, defense, sent } = getSD(state, 30)
  const jRef = party === 'a' ? '제 아내' : '제 남편'
  const cForm = prof.callTerms?.toPartner === '자기' ? '자기야' : (prof.callTerms?.toPartner ?? '상대방')

  const sys = buildP(prof, atoms, slots, stance, defense, sub, pol.suppressions??[], pol.privateKnowledge??[], jRef, cForm, sent, evInfo)
  const usr = `재판관 질문: ${judgeQ}\n${sent}문장. JSON 출력.`

  try {
    const raw = await callLLM(sys, usr)
    const parsed = JSON.parse((raw.match(/\{[\s\S]*\}/) ?? ['{}'])[0])
    const resp = parsed.npcResponse ?? raw.slice(0, 200)

    const issues = []
    if (resp.includes('그런 적 없습니다') && stance !== 'deny') issues.push('deny오용')
    if (resp.includes('자기가')) issues.push('애칭')
    if (resp.includes('9월 20일 기준으로')) issues.push('9월20일')
    if (resp.match(/2[,.]?800[,.]?000원/) && sub !== 'evidence_present' && !['S4','S5'].includes(state)) issues.push('exact금액')
    if (resp.match(/[해야겠어궁금해생각해]\s*[?？]?\s*$/)) issues.push('반말')
    if (party === 'b' && resp.includes('지석 씨')) issues.push('이름호칭')
    if (resp.includes('그런 적 없습니다') && resp.includes('맞지만')) issues.push('자기모순')

    process.stdout.write(issues.length === 0 ? '✅' : '⚠️')
    results.push({ num, label, party, dId, state, sub, stance, resp: resp.slice(0, 100), issues, ev: !!evInfo })
  } catch (e) {
    process.stdout.write('❌')
    results.push({ num, label, error: e.message })
  }
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)) }

async function main() {
  console.log('═══ 스트레스 테스트 20라운드 ═══')
  console.log(`모델: ${MODEL} | ${new Date().toISOString()}\n`)

  const parties = ['a', 'b']
  const aDisputes = ['d-1', 'd-3', 'd-5']
  const bDisputes = ['d-2', 'd-4', 'd-5']
  const subActions = ['fact_pursuit', 'motive_search', 'empathy_approach']
  const states = ['S1', 'S2', 'S3', 'S4', 'S5']
  const evidence = caseData.evidence

  // ── Round 1~6: 한지석 전 쟁점 × 전 액션 (S1) ──
  console.log('Round 1~9: 한지석 전 쟁점 × 전 액션 (S1)')
  for (const d of aDisputes) {
    for (const s of subActions) {
      await run(`a/${d}/${s}/S1`, 'a', d, 'S1', s, `한지석 씨, ${s === 'fact_pursuit' ? '사실 여부를 확인하겠습니다' : s === 'motive_search' ? '그렇게 하신 이유가 무엇입니까' : '당시 심정을 말씀해 주시겠습니까'}?`)
      await delay(2000)
    }
  }
  console.log()

  // ── Round 10~18: 오세린 전 쟁점 × 전 액션 (S1) ──
  console.log('Round 10~18: 오세린 전 쟁점 × 전 액션 (S1)')
  for (const d of bDisputes) {
    for (const s of subActions) {
      await run(`b/${d}/${s}/S1`, 'b', d, 'S1', s, `오세린 씨, ${s === 'fact_pursuit' ? '사실 여부를 확인하겠습니다' : s === 'motive_search' ? '그렇게 하신 이유가 무엇입니까' : '당시 심정을 말씀해 주시겠습니까'}?`)
      await delay(2000)
    }
  }
  console.log()

  // ── Round 19~28: 한지석 d-1 상태 진행 S1→S5 × 2액션 ──
  console.log('Round 19~28: 한지석 d-1 S1→S5')
  for (const st of states) {
    await run(`a/d-1/fact/${st}`, 'a', 'd-1', st, 'fact_pursuit', '한지석 씨, 사실 여부를 확인하겠습니다.')
    await delay(2000)
    await run(`a/d-1/motive/${st}`, 'a', 'd-1', st, 'motive_search', '한지석 씨, 그렇게 하신 이유가 무엇입니까?')
    await delay(2000)
  }
  console.log()

  // ── Round 29~38: 오세린 d-2 상태 진행 S1→S5 × 2액션 ──
  console.log('Round 29~38: 오세린 d-2 S1→S5')
  for (const st of states) {
    await run(`b/d-2/fact/${st}`, 'b', 'd-2', st, 'fact_pursuit', '오세린 씨, 사실 여부를 확인하겠습니다.')
    await delay(2000)
    await run(`b/d-2/empathy/${st}`, 'b', 'd-2', st, 'empathy_approach', '오세린 씨, 당시 심정을 말씀해 주시겠습니까?')
    await delay(2000)
  }
  console.log()

  // ── Round 39~44: 증거 전종 (e-1 ~ e-6) ──
  console.log('Round 39~44: 증거 전종')
  for (const ev of evidence) {
    const party = (ev.subjectParty === 'b' || ev.proves.some(p => ['d-2','d-4'].includes(p))) ? 'b' : 'a'
    const dId = ev.proves[0] ?? 'd-1'
    const pol = v2Data.claimPolicies[party]?.[dId]
    const state = pol ? 'S2' : 'S1'
    await run(`${party}/${ev.id}/evidence/${state}`, party, dId, state, 'evidence_present',
      `${party === 'a' ? '한지석' : '오세린'} 씨, 이 증거에 대해 입장을 밝혀 주십시오.`,
      `증거: ${ev.name}\n설명: ${ev.description.slice(0, 80)}`)
    await delay(2000)
  }
  console.log()

  // ── Round 45~50: 교차 심문 ──
  console.log('Round 45~50: 교차 심문')
  await run('교차1 a/d-1', 'a', 'd-1', 'S2', 'fact_pursuit', '한지석 씨, 송금 건을 다시 설명해 주십시오.')
  await delay(2000)
  await run('교차2 b/d-2', 'b', 'd-2', 'S2', 'fact_pursuit', '오세린 씨, 휴대폰 열람 건을 다시 설명해 주십시오.')
  await delay(2000)
  await run('교차3 a/d-5', 'a', 'd-5', 'S1', 'motive_search', '한지석 씨, 약속 위반 건의 이유를 말씀해 주십시오.')
  await delay(2000)
  await run('교차4 b/d-5', 'b', 'd-5', 'S1', 'empathy_approach', '오세린 씨, 약속 위반 건 당시 심정을 말씀해 주십시오.')
  await delay(2000)
  await run('교차5 a/d-3', 'a', 'd-3', 'S2', 'fact_pursuit', '한지석 씨, 제3자 관련 사실을 확인하겠습니다.')
  await delay(2000)
  await run('교차6 b/d-4', 'b', 'd-4', 'S2', 'motive_search', '오세린 씨, 우회 송금의 이유를 말씀해 주십시오.')
  console.log()

  // ── 종합 ──
  console.log('\n═══ 종합 리포트 ═══')
  const ok = results.filter(r => !r.error && !r.skip && r.issues.length === 0).length
  const warn = results.filter(r => !r.error && !r.skip && r.issues.length > 0).length
  const err = results.filter(r => r.error).length
  const skip = results.filter(r => r.skip).length
  console.log(`총 ${results.length}턴 | ✅ ${ok} | ⚠️ ${warn} | ❌ ${err} | ⏭️ ${skip}\n`)

  const ic = {}
  for (const r of results) if (r.issues) for (const i of r.issues) ic[i] = (ic[i]??0) + 1
  if (Object.keys(ic).length > 0) {
    console.log('이슈 빈도:')
    for (const [i, c] of Object.entries(ic).sort((a,b) => b[1]-a[1])) console.log(`  ${c}회 — ${i}`)
  }

  // 상태별 톤 변화
  console.log('\n한지석 d-1 상태별 톤:')
  for (const r of results.filter(r => r.party==='a' && r.dId==='d-1' && r.sub==='fact_pursuit' && !r.error && !r.skip)) {
    console.log(`  ${r.state} [${r.stance}]: ${r.resp}`)
  }
  console.log('\n오세린 d-2 상태별 톤:')
  for (const r of results.filter(r => r.party==='b' && r.dId==='d-2' && r.sub==='fact_pursuit' && !r.error && !r.skip)) {
    console.log(`  ${r.state} [${r.stance}]: ${r.resp}`)
  }

  console.log('\n증거 응답:')
  for (const r of results.filter(r => r.ev && !r.error && !r.skip)) {
    console.log(`  ${r.label}: ${r.resp}`)
  }

  fs.writeFileSync(path.join(__dirname, '..', 'docs/ref/리뉴얼참고/stress-test-results.json'), JSON.stringify(results, null, 2))
  // full-playthrough도 갱신
  fs.writeFileSync(path.join(__dirname, '..', 'docs/ref/리뉴얼참고/full-playthrough-results.json'), JSON.stringify(results, null, 2))
  console.log('\n결과 저장 완료')
}

main().catch(console.error)
