// V6에서 회귀한 누설 2건 fix (재판관 채널 "가족을 돌본" 직접 노출)
//
// 1. judgec-d-1-soft-v1: "그 가족을 돌본 일이었다고" → "다른 사정이었다고"
// 2. judgecombo-dc-1-b-q1-hard-v5: "그 가족을 돌본 사실을 인정할지" → "그 안의 사정을 인정할지"
//
// 추가: "같은 사람들을 가리킵니다" → "같은 사람을 가리킵니다" (덜 직설)

const fs = require('fs')
const path = require('path')

const PATCHES = [
  {
    id: 'judgec-d-1-soft-v1',
    before: '이준호 씨, 처음에는 오피스텔 방문을 생활 동선처럼 말씀하셨는데 지금은 그 가족을 돌본 일이었다고 말씀이 달라졌습니다. 그 사이를 차분히 정리해 주십시오.',
    after:  '이준호 씨, 처음에는 오피스텔 방문을 생활 동선처럼 말씀하셨는데 지금은 다른 사정이었다고 말씀이 달라졌습니다. 그 사이를 차분히 정리해 주십시오.',
  },
  {
    id: 'judgecombo-dc-1-b-q1-hard-v5',
    before: '이준호 씨, 두 자료가 같은 밤 같은 사람들을 가리킵니다. 그 가족을 돌본 사실을 인정할지 바로 답하십시오.',
    after:  '이준호 씨, 두 자료가 같은 밤 한 자리를 가리킵니다. 그 안의 사정을 지금 인정해 주십시오.',
  },
]

const filePath = path.resolve(__dirname, '../src/data/scriptedText/spouse-01.json')
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

const stats = { applied: 0, missed: [] }
function walk(o) {
  if (!o) return
  if (Array.isArray(o)) { o.forEach(walk); return }
  if (typeof o === 'object') {
    if (o.id && typeof o.text === 'string') {
      for (const p of PATCHES) {
        if (o.id === p.id && o.text === p.before) {
          o.text = p.after
          stats.applied++
        }
      }
    }
    for (const k of Object.keys(o)) walk(o[k])
  }
}
walk(data)

const appliedIds = PATCHES.filter((p) => stats.applied > 0).map((p) => p.id)
stats.missed = PATCHES.filter((p) => !appliedIds.includes(p.id)).map((p) => p.id)

fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8')
console.log(JSON.stringify(stats, null, 2))
