const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '..', 'src', 'data', 'scriptedText', 'spouse-01.json')
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

const replacements = {
  'a|d-1|S5|fact_pursuit#4': '쟁점의 실체를 바로 말씀드리겠습니다. 제가 공동계좌에서 280만원을 보내 추석 연휴 간병을 선예약했고, 받는 사람은 최민정 상담팀장이었습니다. 그 사실을 아내에게 늦게 알린 책임은 제게 있습니다.',
  'a|d-1|S5|fact_pursuit#5': '결론만 말하면 그렇습니다. 280만원은 간병 예약금이었고, 저는 그 돈을 최민정 상담팀장에게 직접 송금했습니다. 절차를 어기고 혼자 처리한 부분은 제가 감당하겠습니다.',
  'a|d-1|S5|motive_search#5': '제가 붙잡고 있던 건 체면이 아니라 시간 압박이었습니다. 오미숙 님 일을 급히 막겠다고 280만원 예약금을 먼저 보냈고, 결국 그 급함으로 약속을 어겼습니다. 사정이 있었다고 해도 제 선택의 책임은 남습니다.',
}

let updated = 0
for (const entry of data.channels.interrogation.entries) {
  for (const variant of entry.variants) {
    if (!replacements[variant.id]) continue
    variant.text = replacements[variant.id]
    updated += 1
  }
}

fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
console.log(`updated ${updated} interrogation variants`)
