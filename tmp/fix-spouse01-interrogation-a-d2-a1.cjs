const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '..', 'src', 'data', 'scriptedText', 'spouse-01.json')
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

for (const entry of data.channels.interrogation.entries) {
  for (const variant of entry.variants || []) {
    if (variant.id === 'a|d-2|S5|empathy_approach#4') {
      variant.text = '불신이 커진 마음은 이해합니다. 그래도 새벽에 휴대폰을 열고 바깥에 보여 준 대응은 상처를 더 벌렸습니다. 제 비밀과 그 대응이 모두 잘못이었다는 점을 함께 인정합니다.'
    }
  }
}

fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8')
console.log('updated a|d-2|S5|empathy_approach#4')
