/**
 * 84건 헤드리스 플레이스루
 *
 * 사용법:
 *   node tests/run-84-headless.cjs --case spouse-01
 *   node tests/run-84-headless.cjs --category spouse
 *   node tests/run-84-headless.cjs --all
 */
const fs = require('fs')
const path = require('path')
const runner = require('./playthrough-runner.cjs')

const ROOT = path.join(__dirname, '..')
const CASES_DIR = path.join(ROOT, 'src/data/cases/generated')
const TRANSCRIPT_DIR = path.join(__dirname, 'transcripts')
const CATEGORIES = ['spouse', 'family', 'friend', 'neighbor', 'partnership', 'tenant', 'workplace']

// ── 유틸 ──

function findAtomsPath(caseId) {
  const paths = [
    path.join(ROOT, `src/data/claimPolicies/${caseId}-v2-atoms.json`),
    path.join(ROOT, `docs/ref/리뉴얼참고/gpt-batch/${caseId}/${caseId}-v2-atoms.json`),
    path.join(ROOT, `docs/ref/리뉴얼참고/gpt-batch-v2/round-04/${caseId}-v2-atoms.json`),
    path.join(ROOT, `docs/ref/리뉴얼참고/thread-packages/thread-B/gpt-session-B-atoms/session-${caseId}/${caseId}-v2-atoms.json`),
    path.join(ROOT, `docs/ref/리뉴얼참고/gpt-session2/output/${caseId}-v2-atoms.json`),
  ]
  for (const p of paths) {
    if (fs.existsSync(p)) return p
  }
  return null
}

function getCaseIds(filter) {
  const all = fs.readdirSync(CASES_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace('.json', ''))
    .sort()

  if (filter.case) return all.filter(id => id === filter.case)
  if (filter.category) return all.filter(id => id.startsWith(filter.category + '-'))
  return all
}

// ── 증거 질문 헬퍼 (조사 처리) ──

function evQuestion(name, surfaceName, verb) {
  const sn = surfaceName || '증거'
  const josa = runner.pp을를(sn)
  return `${name} 씨, 이 ${sn}${josa} ${verb || '보시고 설명해 주십시오.'}`
}

// ── 자동 시나리오 생성 ──

function generateScenario(caseId, caseData) {
  const disputes = caseData.disputes || []
  const evidence = caseData.evidence || []
  const partyA = caseData.duo.partyA
  const partyB = caseData.duo.partyB

  const d1 = disputes[0]?.id || 'd-1'
  const d2 = disputes[1]?.id || d1
  const dLast = disputes[disputes.length - 1]?.id || d1

  const aName = partyA.name
  const bName = partyB.name

  const turns = []

  // --- 턴 1-5: 초기 심문 (S0→S1) ---
  turns.push({ label: `${aName} ${d1} 사실추궁`, party: 'a', dispute: d1, state: 'S1', action: 'fact_pursuit',
    question: `${aName} 씨, 이 건에 대해 사실 여부를 확인하겠습니다.` })
  turns.push({ label: `${aName} ${d1} 동기탐색`, party: 'a', dispute: d1, state: 'S1', action: 'motive_search',
    question: `${aName} 씨, 그렇게 하신 이유가 무엇입니까?` })
  turns.push({ label: `${aName} ${d1} 공감접근`, party: 'a', dispute: d1, state: 'S1', action: 'empathy_approach',
    question: `${aName} 씨, 당시 어떤 심정이셨습니까?` })
  turns.push({ label: `${bName} ${d2} 사실추궁`, party: 'b', dispute: d2, state: 'S1', action: 'fact_pursuit',
    question: `${bName} 씨, 이 건에 대해 사실 여부를 확인하겠습니다.` })

  // 증거 e-1
  if (evidence.length > 0) {
    turns.push({ label: `${aName} e-1 증거제시`, party: 'a', dispute: d1, state: 'S1', action: 'evidence_present',
      question: evQuestion(aName, evidence[0].surfaceName, '보시고 입장을 밝혀 주십시오.'), evidenceId: evidence[0].id })
  } else {
    turns.push({ label: `${bName} ${d2} 동기탐색`, party: 'b', dispute: d2, state: 'S1', action: 'motive_search',
      question: `${bName} 씨, 그렇게 하신 이유가 무엇입니까?` })
  }

  // --- 턴 6-10: 증거 + 동기 (S1→S2) ---
  if (evidence.length > 1) {
    turns.push({ label: `${bName} e-2 증거제시`, party: 'b', dispute: d2, state: 'S1', action: 'evidence_present',
      question: evQuestion(bName, evidence[1].surfaceName, '보시고 설명해 주십시오.'), evidenceId: evidence[1].id })
  } else {
    turns.push({ label: `${bName} ${d2} 동기탐색`, party: 'b', dispute: d2, state: 'S1', action: 'motive_search',
      question: `${bName} 씨, 그렇게 하신 이유가 무엇입니까?` })
  }

  turns.push({ label: `${aName} ${d1} S2 사실추궁`, party: 'a', dispute: d1, state: 'S2', action: 'fact_pursuit',
    question: `${aName} 씨, 좀 더 구체적으로 말씀해 주십시오.` })
  turns.push({ label: `${aName} ${d1} S2 동기탐색`, party: 'a', dispute: d1, state: 'S2', action: 'motive_search',
    question: `${aName} 씨, 왜 그런 선택을 하셨습니까?` })
  turns.push({ label: `${bName} ${d2} S2 사실추궁`, party: 'b', dispute: d2, state: 'S2', action: 'fact_pursuit',
    question: `${bName} 씨, 좀 더 구체적으로 말씀해 주십시오.` })
  turns.push({ label: `${bName} ${d2} S2 공감접근`, party: 'b', dispute: d2, state: 'S2', action: 'empathy_approach',
    question: `${bName} 씨, 당시 가장 어려웠던 부분이 무엇이었습니까?` })

  // --- 턴 11-15: 공감 + 모순 (S2→S3) ---
  if (evidence.length > 2) {
    turns.push({ label: `${aName} e-3 증거제시 S2`, party: 'a', dispute: d1, state: 'S2', action: 'evidence_present',
      question: evQuestion(aName, evidence[2].surfaceName, '보시고 입장을 밝혀 주십시오.'), evidenceId: evidence[2].id })
  } else {
    turns.push({ label: `${aName} ${d1} S2 공감접근`, party: 'a', dispute: d1, state: 'S2', action: 'empathy_approach',
      question: `${aName} 씨, 당시 가장 힘들었던 점은 무엇입니까?` })
  }

  turns.push({ label: `${aName} ${d1} S3 사실추궁`, party: 'a', dispute: d1, state: 'S3', action: 'fact_pursuit',
    question: `${aName} 씨, 사실관계가 분명하지 않습니다. 다시 설명해 주십시오.` })
  turns.push({ label: `${aName} ${d1} S3 동기탐색`, party: 'a', dispute: d1, state: 'S3', action: 'motive_search',
    question: `${aName} 씨, 왜 그런 판단을 내리셨는지 아직 납득이 되지 않습니다.` })
  turns.push({ label: `${bName} ${d2} S3 사실추궁`, party: 'b', dispute: d2, state: 'S3', action: 'fact_pursuit',
    question: `${bName} 씨, 다시 정리해 주십시오.` })
  if (disputes.length > 2) {
    const d3Label = (disputes[2].name || '이 쟁점').replace(/\d[\d,]*만?\s*원/g, '해당 금액').replace(/[가-힣]{2,3}의\s/g, '')
    turns.push({ label: `${bName} ${disputes[2].id} S1 사실추궁`, party: 'b', dispute: disputes[2].id, state: 'S1', action: 'fact_pursuit',
      question: `${bName} 씨, ${d3Label}에 대해 사실 여부를 확인하겠습니다.` })
  } else {
    turns.push({ label: `${aName} ${d1} S3 공감접근`, party: 'a', dispute: d1, state: 'S3', action: 'empathy_approach',
      question: `${aName} 씨, 솔직한 심정을 말씀해 주십시오.` })
  }

  // --- 턴 16-20: 압박 + 자백 (S3→S5) ---
  turns.push({ label: `${aName} ${d1} S4 공감접근`, party: 'a', dispute: d1, state: 'S4', action: 'empathy_approach',
    question: `${aName} 씨, 당시 심정을 충분히 듣겠습니다. 솔직하게 말씀해 주십시오.` })
  turns.push({ label: `${aName} ${d1} S5 사실추궁`, party: 'a', dispute: d1, state: 'S5', action: 'fact_pursuit',
    question: `${aName} 씨, 이제 사실대로 말씀해 주십시오.` })
  turns.push({ label: `${bName} ${d2} S5 고백`, party: 'b', dispute: d2, state: 'S5', action: 'empathy_approach',
    question: `${bName} 씨, 솔직하게 말씀해 주십시오.` })
  // dispute name에서 금액/인물 제거하여 중립화
  const lastDisputeLabel = (disputes[disputes.length - 1]?.name || '마지막 쟁점').replace(/\d[\d,]*만?\s*원/g, '해당 금액').replace(/[가-힣]{2,3}의\s/g, '')
  turns.push({ label: `${aName} ${dLast} S1 사실추궁`, party: 'a', dispute: dLast, state: 'S1', action: 'fact_pursuit',
    question: `${aName} 씨, ${lastDisputeLabel}에 대해 사실 여부를 확인하겠습니다.` })
  turns.push({ label: `${bName} ${dLast} S1 사실추궁`, party: 'b', dispute: dLast, state: 'S1', action: 'fact_pursuit',
    question: `${bName} 씨, ${lastDisputeLabel}에 대해 사실 여부를 확인하겠습니다.` })

  return turns
}

// ── 1건 실행 ──

async function runCase(caseId) {
  const casePath = path.join(CASES_DIR, `${caseId}.json`)
  if (!fs.existsSync(casePath)) { console.log(`  [SKIP] ${caseId}: case JSON 없음`); return null }

  const atomsPath = findAtomsPath(caseId)
  if (!atomsPath) { console.log(`  [SKIP] ${caseId}: v2-atoms 없음`); return null }

  const caseData = JSON.parse(fs.readFileSync(casePath, 'utf8'))
  const v2Data = JSON.parse(fs.readFileSync(atomsPath, 'utf8'))

  const turns = generateScenario(caseId, caseData)
  const ctx = { results: [], turnNum: 0 }

  console.log(`\n=== ${caseId} (${caseData.duo.partyA.name} vs ${caseData.duo.partyB.name}) — ${turns.length}턴 ===`)

  const transcript = {
    caseId,
    category: caseId.replace(/-\d+$/, ''),
    isMonetary: runner.isMonetaryCase(caseData),
    partyA: { name: caseData.duo.partyA.name, archetype: caseData.duo.partyA.archetype, tell: caseData.duo.partyA.verbalTells?.[0]?.type || null },
    partyB: { name: caseData.duo.partyB.name, archetype: caseData.duo.partyB.archetype, tell: caseData.duo.partyB.verbalTells?.[0]?.type || null },
    disputes: (caseData.disputes || []).map(d => ({ id: d.id, name: d.name })),
    turns: [],
    startedAt: new Date().toISOString(),
  }

  for (let i = 0; i < turns.length; i++) {
    const turn = turns[i]

    let evidenceInfo = null
    if (turn.evidenceId) {
      const ev = (caseData.evidence || []).find(e => e.id === turn.evidenceId)
      if (ev) evidenceInfo = `증거: ${ev.name}\n설명: ${(ev.description || '').slice(0, 120)}`
    }

    await runner.run(turn.label, turn.party, turn.dispute, turn.state, turn.action, turn.question, evidenceInfo, caseData, v2Data, ctx)

    // 트랜스크립트에 턴 데이터 추가
    const lastResult = ctx.results[ctx.results.length - 1]
    if (lastResult) {
      transcript.turns.push({
        turn: i + 1,
        label: turn.label,
        party: turn.party,
        partyName: turn.party === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name,
        dispute: turn.dispute,
        lieState: turn.state,
        action: turn.action,
        stance: lastResult.stance || null,
        judgeQuestion: turn.question,
        npcResponse: lastResult.response || null,
        behaviorHint: lastResult.hint || null,
        evidenceId: turn.evidenceId || null,
        issues: lastResult.issues || [],
        error: lastResult.error || null,
      })
    }

    // API 딜레이 (429 방지)
    if (i < turns.length - 1) await runner.delay(3000)
  }

  transcript.finishedAt = new Date().toISOString()

  // 요약 통계
  const passed = transcript.turns.filter(t => !t.error && t.issues.length === 0).length
  const warned = transcript.turns.filter(t => !t.error && t.issues.length > 0).length
  const errors = transcript.turns.filter(t => t.error).length
  const skipped = transcript.turns.filter(t => !t.npcResponse && !t.error).length
  transcript.summary = { total: turns.length, passed, warned, errors, skipped }

  // JSON 저장
  fs.writeFileSync(path.join(TRANSCRIPT_DIR, `${caseId}.json`), JSON.stringify(transcript, null, 2), 'utf8')
  console.log(`  → 저장: tests/transcripts/${caseId}.json (PASS ${passed} / WARN ${warned} / ERR ${errors})`)

  return transcript
}

// ── 메인 ──

async function main() {
  const args = process.argv.slice(2)
  const filter = {}
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--case' && args[i + 1]) filter.case = args[++i]
    if (args[i] === '--category' && args[i + 1]) filter.category = args[++i]
    if (args[i] === '--all') filter.all = true
  }
  if (!filter.case && !filter.category && !filter.all) {
    console.log('사용법: node tests/run-84-headless.cjs --case spouse-01')
    console.log('        node tests/run-84-headless.cjs --category spouse')
    console.log('        node tests/run-84-headless.cjs --all')
    process.exit(1)
  }

  const caseIds = getCaseIds(filter)
  console.log(`\n=== 84건 헤드리스 플레이스루 ===`)
  console.log(`대상: ${caseIds.length}건 | 모델: ${runner.MODEL} | ${new Date().toISOString()}\n`)

  const summary = { total: caseIds.length, success: 0, failed: 0, skipped: 0, errors: [] }
  const startTime = Date.now()

  for (let i = 0; i < caseIds.length; i++) {
    const caseId = caseIds[i]
    console.log(`\n[${i + 1}/${caseIds.length}] ${caseId}`)

    try {
      const result = await runCase(caseId)
      if (result) {
        summary.success++
      } else {
        summary.skipped++
        summary.errors.push({ caseId, error: 'skipped (missing data)' })
      }
    } catch (e) {
      console.error(`  [FATAL] ${caseId}: ${e.message}`)
      summary.failed++
      summary.errors.push({ caseId, error: e.message })
    }

    // 사건 간 딜레이
    if (i < caseIds.length - 1) {
      console.log(`  (5초 대기...)`)
      await runner.delay(5000)
    }
  }

  const elapsed = Math.round((Date.now() - startTime) / 1000)
  summary.elapsedSeconds = elapsed
  summary.finishedAt = new Date().toISOString()

  // 에러 로그 저장
  if (summary.errors.length > 0) {
    fs.writeFileSync(path.join(TRANSCRIPT_DIR, '_errors.json'), JSON.stringify(summary.errors, null, 2), 'utf8')
  }

  // 요약 저장
  fs.writeFileSync(path.join(TRANSCRIPT_DIR, '_summary.json'), JSON.stringify(summary, null, 2), 'utf8')

  console.log(`\n=== 완료 ===`)
  console.log(`성공: ${summary.success} / 실패: ${summary.failed} / 스킵: ${summary.skipped}`)
  console.log(`소요 시간: ${Math.floor(elapsed / 60)}분 ${elapsed % 60}초`)
}

main().catch(e => { console.error(e); process.exit(1) })
