const fs = require('fs')

const path = 'D:/ProjectWS/src/data/scriptedText/spouse-01.json'
const bundle = JSON.parse(fs.readFileSync(path, 'utf8'))

const addendumByQuestionType = {
  fact_pursuit: `다만 그 장면만으로 전체 결론을 닫을 단계는 아닙니다.`,
  motive_search: `그래도 속내 전체를 가장 나쁜 쪽으로만 보실 일은 아닙니다.`,
  empathy_approach: `다만 그 감정선과 배경까지 같이 보셔야 이 선택이 설명됩니다.`,
}

function firstSentence(text) {
  const match = text.match(/^.*?[.!?]/u)
  return match ? match[0].trim() : text.trim()
}

for (const entry of bundle.channels.interrogation.entries) {
  const first = entry.variants[0]
  const fourth = entry.variants[3]
  if (!first || !fourth) continue
  if (first.text !== fourth.text) continue

  const opening = firstSentence(first.text)
  const addendum = addendumByQuestionType[entry.questionType]
  if (!addendum) continue

  fourth.text = `${opening} ${addendum}`
}

fs.writeFileSync(path, `${JSON.stringify(bundle, null, 2)}\n`, 'utf8')
