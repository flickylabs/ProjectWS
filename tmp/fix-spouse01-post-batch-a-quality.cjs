const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '..', 'src', 'data', 'scriptedText', 'spouse-01.json')
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

const replacements = {
  'a|d-1|S5|fact_pursuit#4': '쟁점의 실체를 바로 말씀드리겠습니다. 제가 공동계좌에서 280만원을 보내 추석 연휴 간병을 선예약했고, 받는 사람은 최민정 상담팀장이었습니다. 그 사실을 아내에게 늦게 알린 책임은 제게 있습니다.',
  'a|d-1|S5|motive_search#3': '핵심 동기는 급한 간병 일정이었습니다. 오미숙 님 돌봄이 비는 상황을 메우려다 보니 280만원 예약금을 서둘러 보냈고 설명은 뒤로 밀렸습니다. 그 순서가 잘못됐다는 점은 인정합니다.',
  'a|d-1|S5|motive_search#5': '제가 붙잡고 있던 건 체면이 아니라 시간 압박이었습니다. 오미숙 님 일을 급히 막겠다고 280만원 예약금을 먼저 보냈고, 결국 그 급함으로 약속을 어겼습니다. 사정이 있었다고 해도 제 선택의 책임은 남습니다.',
  'a|d-1|S5|empathy_approach#3': '제 아내 입장에서는 이유보다 배제된 장면이 먼저 남았을 겁니다. 저는 280만원 간병 예약금을 서두르며 돈부터 보냈고, 그 사실을 숨긴 순간 관계의 신뢰를 깼습니다. 그 상처가 남은 건 당연하다고 생각합니다.',
  'a|d-1|S5|empathy_approach#5': '저는 돌봄을 준비했다는 말보다 아내가 느낀 상실감을 먼저 봐야 한다고 생각합니다. 280만원 간병 예약금을 서두른 선택이 결국 비밀 송금으로 남으면서 신뢰를 깨뜨렸기 때문입니다. 그 정서적 손상까지 제가 안고 가겠습니다.',
  'a|d-2|S5|fact_pursuit#4': '새벽 열람과 캡처는 분명 잘못이었습니다. 그렇지만 그 행동을 부른 배경에 제가 감춰 둔 사정과 설명 회피가 있었다는 점도 지워지지 않습니다. 저는 두 사실을 함께 인정합니다.',
  'a|d-2|S5|empathy_approach#4': '불안을 이해한다고 해서 사생활 경계까지 무너져도 된다고 말할 수는 없습니다. 제 비밀이 원인이었고, 아내의 대응은 또 다른 상처가 됐습니다. 지금은 그 얽힌 책임을 함께 받아들이고 있습니다.',
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
