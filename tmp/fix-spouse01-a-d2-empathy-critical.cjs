const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '..', 'src', 'data', 'scriptedText', 'spouse-01.json')
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

for (const entry of data.channels.interrogation.entries) {
  for (const variant of entry.variants) {
    if (variant.id !== 'a|d-2|S5|empathy_approach#4') continue
    variant.text = '불안이 컸다는 점은 압니다. 그래도 제 휴대폰을 열어 본 대응은 별도의 잘못이었습니다. 제 비밀과 그 대응이 함께 관계를 망쳤다고 생각합니다.'
  }
}

fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
console.log('updated a|d-2|S5|empathy_approach#4')
