const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '..', 'src', 'data', 'scriptedText', 'spouse-01.json')
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

const targetIds = new Set([
  'a|d-1|S5|fact_pursuit#5',
  'a|d-1|S5|motive_search#2',
  'a|d-1|S5|motive_search#4',
  'a|d-1|S5|empathy_approach#2',
  'a|d-1|S5|empathy_approach#4',
  'a|d-2|S5|motive_search#2',
  'a|d-2|S5|motive_search#4',
  'a|d-2|S5|empathy_approach#2',
  'a|d-2|S5|empathy_approach#3',
  'a|d-3|S5|fact_pursuit#2',
  'a|d-3|S5|fact_pursuit#3',
  'a|d-3|S5|motive_search#2',
  'a|d-3|S5|empathy_approach#2',
  'a|d-3|S5|empathy_approach#3',
  'a|d-3|S5|empathy_approach#4',
  'a|d-4|S5|motive_search#3',
  'a|d-4|S5|motive_search#4',
  'a|d-4|S5|motive_search#5',
  'a|d-4|S5|empathy_approach#2',
  'a|d-4|S5|empathy_approach#3',
  'a|d-4|S5|empathy_approach#4',
  'a|d-4|S5|empathy_approach#5',
  'a|d-5|S5|motive_search#3',
  'a|d-5|S5|motive_search#4',
  'a|d-5|S5|motive_search#5',
  'a|d-5|S5|empathy_approach#2',
  'a|d-5|S5|empathy_approach#3',
  'a|d-5|S5|empathy_approach#4',
  'a|d-5|S5|empathy_approach#5',
  'b|d-1|S5|fact_pursuit#3',
  'b|d-1|S5|fact_pursuit#4',
  'b|d-1|S5|motive_search#2',
  'b|d-1|S5|motive_search#4',
  'b|d-1|S5|motive_search#5',
  'b|d-1|S5|empathy_approach#2',
  'b|d-2|S5|fact_pursuit#3',
  'b|d-2|S5|motive_search#2',
  'b|d-2|S5|empathy_approach#2',
  'b|d-3|S5|fact_pursuit#3',
  'b|d-3|S5|empathy_approach#2',
  'b|d-4|S5|fact_pursuit#2',
  'b|d-4|S5|fact_pursuit#3',
  'b|d-4|S5|fact_pursuit#5',
  'b|d-4|S5|motive_search#2',
  'b|d-4|S5|motive_search#4',
  'b|d-4|S5|empathy_approach#2',
  'b|d-5|S5|fact_pursuit#3',
  'b|d-5|S5|motive_search#2',
  'b|d-5|S5|motive_search#4',
  'b|d-5|S5|empathy_approach#2',
])

function splitSentences(text) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean)
}

function joinSentences(parts) {
  return parts.join(' ')
}

function amountFor(id) {
  if (id.startsWith('a|d-1|') || id.startsWith('b|d-1|')) return '280만원'
  if (id.startsWith('a|d-4|') || id.startsWith('b|d-4|') || id.startsWith('b|d-5|')) return '150만원'
  if (id.startsWith('a|d-5|')) return '280만원'
  return null
}

function extraSentence(id) {
  const amount = amountFor(id)
  const party = id[0]
  if (id.includes('|fact_pursuit')) {
    if (amount) {
      return party === 'a'
        ? `문제가 된 금액은 ${amount}이고, 그 판단의 책임도 제가 받아들이겠습니다.`
        : `제가 확인하거나 인정하는 액수도 ${amount}이며, 그 사실은 더 이상 피하지 않겠습니다.`
    }
    return party === 'a'
      ? '그 지점까지 포함해 제 몫의 책임을 인정합니다.'
      : '그 판단이 잘못이었다는 점도 제 책임으로 남습니다.'
  }
  if (id.includes('|motive_search')) {
    if (amount) {
      return party === 'a'
        ? `결국 문제가 된 액수는 ${amount}이었고, 저는 그 선택을 변명하지 않겠습니다.`
        : `결국 숨기거나 먼저 움직인 액수는 ${amount}이었고, 그 선택의 책임은 제게 있습니다.`
    }
    return party === 'a'
      ? '그 과정이 결국 더 큰 상처를 남겼다는 점도 압니다.'
      : '그 조급함이 제 판단을 더 나쁘게 만들었다는 점도 인정합니다.'
  }
  if (amount) {
    return party === 'a'
      ? `결국 ${amount}을 둘러싼 비밀이 상처를 키웠고, 그 결과를 인정합니다.`
      : `결국 ${amount}을 둘러싼 선택이 상처를 키웠고, 그 책임은 제게 있습니다.`
  }
  return party === 'a'
    ? '그렇게 생긴 상처를 두 사람 모두 감당하게 됐습니다.'
    : '그 성급함과 상처를 지금은 함께 인정합니다.'
}

function ensureAmount(text, id) {
  const amount = amountFor(id)
  if (!amount) return text
  if (text.includes(amount)) return text
  return `${text} ${extraSentence(id)}`
}

let updated = 0
for (const entry of data.channels.interrogation.entries) {
  for (const variant of entry.variants) {
    if (!targetIds.has(variant.id)) continue
    let text = variant.text.trim()
    text = ensureAmount(text, variant.id)
    let parts = splitSentences(text)
    while (parts.length < 3) {
      parts.push(extraSentence(variant.id))
    }
    variant.text = joinSentences(parts)
    updated += 1
  }
}

fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
console.log(`updated ${updated} interrogation variants`)
