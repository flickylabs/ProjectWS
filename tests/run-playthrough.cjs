/**
 * 범용 플레이스루 러너
 * 사용법:
 *   node tests/run-playthrough.cjs spouse-01
 *   node tests/run-playthrough.cjs all
 */
const fs = require('fs')
const path = require('path')
const runner = require('./playthrough-runner.cjs')

const ALL_CASES = [
  'spouse-01',
  'family-01',
  'friend-01',
  'neighbor-01',
  'partnership-01',
  'tenant-01',
  'workplace-01',
]

const REPORT_DIR = path.join(__dirname, '..', 'docs/ref/리뉴얼참고/thread-packages/thread-E/reports')

async function runScenario(caseId) {
  // 시나리오 로드
  const scenario = require(`./scenarios/${caseId}.cjs`)

  // 데이터 로드
  const caseData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', scenario.casePath), 'utf8'))
  const v2Data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', scenario.atomsPath), 'utf8'))

  // 실행 컨텍스트 (전역변수 대체)
  const ctx = { results: [], turnNum: 0 }

  // 헤더
  console.log('===================================================================')
  console.log(`  ${scenario.caseId} 풀 플레이스루 — ${scenario.title} — ${scenario.turns.length}턴`)
  console.log(`  당사자: ${caseData.duo.partyA.name} vs ${caseData.duo.partyB.name}`)
  console.log(`  모델: ${runner.MODEL} | ${new Date().toISOString()}`)
  console.log('===================================================================\n')

  // 섹션 인덱스 맵
  const sectionMap = {}
  if (scenario.sections) {
    for (const sec of scenario.sections) {
      sectionMap[sec.before] = sec.title
    }
  }

  // 턴 실행
  for (let i = 0; i < scenario.turns.length; i++) {
    // 섹션 헤더 출력
    if (sectionMap[i]) {
      console.log(`--- ${sectionMap[i]} ---`)
    }

    const turn = scenario.turns[i]

    // 증거 정보 구성
    let evidenceInfo = null
    if (turn.evidenceId) {
      const ev = caseData.evidence.find(e => e.id === turn.evidenceId)
      if (ev) {
        evidenceInfo = `증거: ${ev.name}\n설명: ${(ev.description || '').slice(0, 120)}`
      } else {
        evidenceInfo = `증거: ${turn.evidenceId} (데이터 없음)`
      }
    }

    await runner.run(
      turn.label,
      turn.party,
      turn.dispute,
      turn.state,
      turn.action,
      turn.question,
      evidenceInfo,
      caseData,
      v2Data,
      ctx
    )

    // 마지막 턴이 아니면 딜레이
    if (i < scenario.turns.length - 1) {
      await runner.delay(5000)
    }
  }

  // 리포트 생성
  const reportText = runner.generateReport(ctx.results, caseData)

  // 결과 저장
  const outPath = path.join(REPORT_DIR, `${caseId}-gpt4o-unified.txt`)
  fs.writeFileSync(outPath, reportText)
  console.log(`\n결과 저장: ${outPath}`)

  return ctx.results
}

async function main() {
  const arg = process.argv[2] || 'spouse-01'

  if (arg === 'all') {
    console.log(`=== 전체 ${ALL_CASES.length}건 순차 실행 ===\n`)
    for (let i = 0; i < ALL_CASES.length; i++) {
      const caseId = ALL_CASES[i]
      console.log(`\n[${ i + 1}/${ALL_CASES.length}] ${caseId} 시작...\n`)
      try {
        await runScenario(caseId)
      } catch (e) {
        console.error(`[ERROR] ${caseId}: ${e.message}`)
      }
      // 사건 사이 10초 딜레이 (429 방지)
      if (i < ALL_CASES.length - 1) {
        console.log('\n--- 10초 대기 (429 방지) ---\n')
        await runner.delay(10000)
      }
    }
    console.log('\n=== 전체 실행 완료 ===')
  } else {
    // 단일 사건
    if (!ALL_CASES.includes(arg)) {
      console.error(`알 수 없는 사건 ID: ${arg}`)
      console.error(`사용 가능: ${ALL_CASES.join(', ')}, all`)
      process.exit(1)
    }
    await runScenario(arg)
  }
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
