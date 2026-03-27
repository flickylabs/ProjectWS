/**
 * Phase 1 대사 생성용 사건 정보 추출.
 * GPT에 보낼 입력 데이터를 생성한다.
 *
 * 사용법:
 *   node scripts/extract-phase1-input.cjs spouse-01
 *   node scripts/extract-phase1-input.cjs family     (family-01~12 전체)
 *   node scripts/extract-phase1-input.cjs all        (84개 전체)
 */

const fs = require('fs')
const path = require('path')

const CASES_DIR = path.join(__dirname, '..', 'src', 'data', 'cases', 'generated')
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'data', 'cases', 'phase1-input')

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true })

function extractInput(caseId) {
  const filePath = path.join(CASES_DIR, `${caseId}.json`)
  if (!fs.existsSync(filePath)) {
    console.error(`  ✕ ${caseId}: 파일 없음`)
    return null
  }

  const c = JSON.parse(fs.readFileSync(filePath, 'utf8'))

  const result = {
    caseId: c.caseId,
    relationshipType: c.duo.relationshipType,
    partyA: {
      name: c.duo.partyA.name,
      age: c.duo.partyA.age,
      occupation: c.duo.partyA.occupation,
      archetype: c.duo.partyA.archetype,
      speechStyle: c.duo.partyA.speechStyle,
      fear: c.duo.partyA.fear,
      verbalTells: c.duo.partyA.verbalTells.map(v => ({ trigger: v.trigger, pattern: v.pattern })),
    },
    partyB: {
      name: c.duo.partyB.name,
      age: c.duo.partyB.age,
      occupation: c.duo.partyB.occupation,
      archetype: c.duo.partyB.archetype,
      speechStyle: c.duo.partyB.speechStyle,
      fear: c.duo.partyB.fear,
      verbalTells: c.duo.partyB.verbalTells.map(v => ({ trigger: v.trigger, pattern: v.pattern })),
    },
    context: {
      description: c.context.description,
    },
    disputes: c.disputes.map(d => ({ id: d.id, name: d.name })),
  }

  const outPath = path.join(OUTPUT_DIR, `${caseId}.json`)
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8')
  console.log(`  ✓ ${caseId}`)
  return result
}

// CLI
const arg = process.argv[2]
if (!arg) {
  console.log('사용법: node scripts/extract-phase1-input.cjs <case-id|type|all>')
  process.exit(1)
}

if (arg === 'all') {
  const files = fs.readdirSync(CASES_DIR).filter(f => f.endsWith('.json'))
  console.log(`전체 ${files.length}개 추출:`)
  for (const f of files) extractInput(f.replace('.json', ''))
} else if (!arg.includes('-')) {
  // type만 지정 (family, friend, etc.)
  const files = fs.readdirSync(CASES_DIR).filter(f => f.startsWith(arg) && f.endsWith('.json'))
  console.log(`${arg} 유형 ${files.length}개 추출:`)
  for (const f of files) extractInput(f.replace('.json', ''))
} else {
  extractInput(arg)
}
