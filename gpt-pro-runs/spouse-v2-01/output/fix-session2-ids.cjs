/**
 * Session 2 id 필드 보강 스크립트
 *
 * 사용법:
 * 1. session-2-raw.json에 GPT Pro 원본 출력을 저장
 * 2. node fix-session2-ids.cjs
 * 3. session-2-fixed.json이 생성됨
 */
const fs = require('fs')
const path = require('path')

const raw = JSON.parse(fs.readFileSync(path.join(__dirname, 'session-2-raw.json'), 'utf-8'))

for (const entry of raw.entries) {
  if (!entry.id && entry.disputeId && entry.lieState && entry.questionType) {
    entry.id = `${entry.disputeId}_${entry.lieState}_${entry.questionType}`
  }
}

fs.writeFileSync(
  path.join(__dirname, 'session-2-fixed.json'),
  JSON.stringify(raw, null, 2),
  'utf-8'
)

console.log(`Fixed ${raw.entries.length} entries. Output: session-2-fixed.json`)
