/**
 * 84개 사건의 caseName을 AI로 생성.
 * context.description → 사건 핵심을 1~2문장(40자 이내)으로 요약.
 */
const fs = require('fs')
const path = require('path')

let API_KEY = process.env.VITE_OPENAI_API_KEY
if (!API_KEY) {
  try {
    const env = fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf8')
    const match = env.match(/VITE_OPENAI_API_KEY=(.+)/)
    if (match) API_KEY = match[1].trim()
  } catch {}
}
if (!API_KEY) { console.error('API key required'); process.exit(1) }

const casesDir = path.join(__dirname, '..', 'src', 'data', 'cases', 'generated')
const files = fs.readdirSync(casesDir).filter(f => f.endsWith('.json')).sort()

async function generateName(description, disputes, nameA, nameB) {
  const disputeNames = disputes.map(d => d.name).join(', ')
  const prompt = `아래 사건을 한 줄(30자 이내)로 요약하세요. 사건명만 보고 무슨 분쟁인지 알 수 있어야 합니다.

당사자: ${nameA} vs ${nameB}
배경: ${description.slice(0, 200)}
쟁점: ${disputeNames}

규칙:
- 30자 이내
- "~사건", "~분쟁" 등으로 끝나도 좋음
- 핵심 갈등 포인트를 담을 것
- 예: "추석 간병비 비밀 송금 분쟁"
- 예: "공동계좌 무단 인출과 외도 의심"

사건명만 출력하세요.`

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 40,
    }),
  })
  const data = await res.json()
  return data.choices?.[0]?.message?.content?.trim().replace(/^["']|["']$/g, '') ?? ''
}

async function main() {
  let generated = 0
  for (const file of files) {
    const filePath = path.join(casesDir, file)
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    const name = await generateName(
      data.context?.description ?? '',
      data.disputes ?? [],
      data.duo?.partyA?.name ?? 'A',
      data.duo?.partyB?.name ?? 'B',
    )
    if (name) {
      data.context.caseName = name
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
      generated++
      console.log(`[OK] ${file}: ${name}`)
    }
    await new Promise(r => setTimeout(r, 200))
  }
  console.log(`\n완료: ${generated}개 사건명 생성`)
}

main().catch(console.error)
