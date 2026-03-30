/**
 * 84개 사건 × 5쟁점 = 420개 판정문을 AI로 생성.
 * truthDescription → 간결한 판정문 (30자 이내, "~이다" 형태)
 *
 * 결과를 각 사건 JSON의 disputes[].judgmentStatement 필드에 저장.
 *
 * 사용법: OPENAI_API_KEY=sk-... node scripts/generate-judgment-questions.cjs
 */
const fs = require('fs')
const path = require('path')

const API_KEY = process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY
if (!API_KEY) {
  // .env에서 읽기
  try {
    const env = fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf8')
    const match = env.match(/VITE_OPENAI_API_KEY=(.+)/)
    if (match) process.env.VITE_OPENAI_API_KEY = match[1].trim()
  } catch {}
}
const FINAL_KEY = process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY
if (!FINAL_KEY) { console.error('API key required'); process.exit(1) }

const casesDir = path.join(__dirname, '..', 'src', 'data', 'cases', 'generated')
const files = fs.readdirSync(casesDir).filter(f => f.endsWith('.json')).sort()

async function generateStatement(disputeName, truthDescription) {
  const prompt = `아래 쟁점의 진실 설명을 읽고, 재판관이 "이것이 사실입니까?"라고 물을 수 있는 간결한 판정문을 작성하세요.

쟁점: ${disputeName}
진실 설명: ${truthDescription}

규칙:
- 30자 이내
- "~이다" 또는 "~했다" 형태로 끝나는 단정적 문장
- 핵심 사실만 담을 것
- 인물명은 유지
- 예: "지석은 280만원을 몰래 송금했다"
- 예: "누수 원인은 건물 하자이다"

판정문만 출력하세요. 따옴표, 설명, 번호 없이.`

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${FINAL_KEY}` },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 50,
    }),
  })
  const data = await res.json()
  return data.choices?.[0]?.message?.content?.trim() ?? ''
}

async function main() {
  let totalDisputes = 0
  let generated = 0
  let skipped = 0

  for (const file of files) {
    const filePath = path.join(casesDir, file)
    const caseData = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    if (!caseData.disputes) continue

    let modified = false
    console.log(`\n=== ${file} (${caseData.disputes.length}개 쟁점) ===`)

    for (const dispute of caseData.disputes) {
      totalDisputes++

      if (dispute.judgmentStatement) {
        skipped++
        console.log(`  [SKIP] ${dispute.id}: ${dispute.judgmentStatement}`)
        continue
      }

      const desc = dispute.truthDescription ?? ''
      if (!desc) {
        console.log(`  [WARN] ${dispute.id}: truthDescription 없음`)
        continue
      }

      try {
        const statement = await generateStatement(dispute.name, desc)
        if (statement && statement.length <= 50) {
          dispute.judgmentStatement = statement
          modified = true
          generated++
          console.log(`  [OK] ${dispute.id}: ${statement}`)
        } else {
          // 너무 길면 수동 잘라서 저장
          const trimmed = (statement || desc.split(/[.!?]/)[0].trim()).slice(0, 40)
          dispute.judgmentStatement = trimmed
          modified = true
          generated++
          console.log(`  [TRIM] ${dispute.id}: ${trimmed}`)
        }
      } catch (err) {
        console.log(`  [ERR] ${dispute.id}: ${err.message}`)
      }

      // Rate limit 방지
      await new Promise(r => setTimeout(r, 200))
    }

    if (modified) {
      fs.writeFileSync(filePath, JSON.stringify(caseData, null, 2), 'utf8')
    }
  }

  console.log(`\n=== 완료 ===`)
  console.log(`총 쟁점: ${totalDisputes}, 생성: ${generated}, 스킵: ${skipped}`)
}

main().catch(console.error)
