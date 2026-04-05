/**
 * JSON 트랜스크립트 → GPT Pro 분석용 텍스트 변환
 *
 * 사용법:
 *   node tests/format-for-gptpro.cjs --category spouse
 *   node tests/format-for-gptpro.cjs --all
 */
const fs = require('fs')
const path = require('path')

const TRANSCRIPT_DIR = path.join(__dirname, 'transcripts')
const OUTPUT_DIR = path.join(__dirname, 'gptpro-input')
const CATEGORIES = ['spouse', 'family', 'friend', 'neighbor', 'partnership', 'tenant', 'workplace']

function formatCase(transcript) {
  const lines = []
  lines.push(`## ${transcript.caseId} 플레이스루 트랜스크립트`)
  lines.push('')
  lines.push(`### 사건 정보`)
  lines.push(`- 카테고리: ${transcript.category}`)
  lines.push(`- 당사자 A: ${transcript.partyA.name} (${transcript.partyA.archetype})`)
  lines.push(`- 당사자 B: ${transcript.partyB.name} (${transcript.partyB.archetype})`)
  lines.push(`- 쟁점: ${transcript.disputes.map(d => `${d.id}(${d.name})`).join(', ')}`)
  lines.push('')
  lines.push(`### 대화 로그`)

  for (const t of transcript.turns) {
    if (t.error) {
      lines.push(`[턴 ${t.turn}] ERROR: ${t.error}`)
      continue
    }
    if (!t.npcResponse) {
      lines.push(`[턴 ${t.turn}] SKIP: ${t.label}`)
      continue
    }

    lines.push(`[턴 ${t.turn}] 재판관(${t.action}): "${t.judgeQuestion}"`)
    lines.push(`[턴 ${t.turn}] NPC(${t.partyName}/${t.lieState}/${t.stance}): "${t.npcResponse}"`)
    if (t.behaviorHint) lines.push(`[턴 ${t.turn}] hint: ${t.behaviorHint}`)
    if (t.evidenceId) lines.push(`[턴 ${t.turn}] 증거: ${t.evidenceId}`)
    if (t.issues && t.issues.length > 0) lines.push(`[턴 ${t.turn}] ISSUES: ${t.issues.join(', ')}`)
  }

  lines.push('')
  lines.push(`### 턴 요약`)
  if (transcript.summary) {
    lines.push(`- 총 턴: ${transcript.summary.total}`)
    lines.push(`- PASS: ${transcript.summary.passed}, WARN: ${transcript.summary.warned}, ERROR: ${transcript.summary.errors}`)
  }

  // S5 도달 턴 찾기
  const s5turns = transcript.turns.filter(t => t.lieState === 'S5' && t.npcResponse)
  if (s5turns.length > 0) {
    lines.push(`- S5 도달: ${s5turns.map(t => `턴 ${t.turn}(${t.partyName})`).join(', ')}`)
  }

  // 증거 제시 턴
  const evTurns = transcript.turns.filter(t => t.evidenceId && t.npcResponse)
  if (evTurns.length > 0) {
    lines.push(`- 증거 제시: ${evTurns.map(t => `${t.evidenceId}(턴${t.turn})`).join(', ')}`)
  }

  lines.push('')
  lines.push('---')
  lines.push('')
  return lines.join('\n')
}

function processCategory(category) {
  const files = fs.readdirSync(TRANSCRIPT_DIR)
    .filter(f => f.startsWith(category + '-') && f.endsWith('.json'))
    .sort()

  if (files.length === 0) {
    console.log(`  ${category}: 트랜스크립트 없음`)
    return
  }

  const parts = []
  parts.push(`# ${category} 카테고리 플레이스루 트랜스크립트 (${files.length}건)`)
  parts.push('')
  parts.push(`생성일: ${new Date().toISOString()}`)
  parts.push('')

  for (const f of files) {
    try {
      const transcript = JSON.parse(fs.readFileSync(path.join(TRANSCRIPT_DIR, f), 'utf8'))
      parts.push(formatCase(transcript))
    } catch (e) {
      parts.push(`## ${f.replace('.json', '')} — 파싱 오류: ${e.message}\n\n---\n`)
    }
  }

  const outPath = path.join(OUTPUT_DIR, `${category}-transcript.md`)
  fs.writeFileSync(outPath, parts.join('\n'), 'utf8')
  console.log(`  ${category}: ${files.length}건 → ${outPath}`)
}

// ── 메인 ──

const args = process.argv.slice(2)
let categories = []

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--category' && args[i + 1]) categories.push(args[++i])
  if (args[i] === '--all') categories = CATEGORIES
}

if (categories.length === 0) {
  console.log('사용법: node tests/format-for-gptpro.cjs --category spouse')
  console.log('        node tests/format-for-gptpro.cjs --all')
  process.exit(1)
}

console.log('=== GPT Pro 포맷 변환 ===\n')
for (const cat of categories) {
  processCategory(cat)
}
console.log('\n완료.')
