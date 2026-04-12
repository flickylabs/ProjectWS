const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '..', 'src', 'data', 'scriptedText', 'spouse-01.json')
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

for (const entry of data.channels.interrogation.entries) {
  for (const variant of entry.variants || []) {
    if (variant.id === 'b|d-5|S5|fact_pursuit#3') {
      variant.text = '다시 보면 제 행동도 똑같이 절차를 무시한 쪽이었습니다. 배신감에 밀려 150만원을 먼저 보내고 설명은 뒤로 미뤘습니다. 그 선택 역시 약속을 어긴 제 책임입니다.'
    }
  }
}

fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8')
console.log('updated b|d-5|S5|fact_pursuit#3')
