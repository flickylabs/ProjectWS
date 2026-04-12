const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'src', 'data', 'scriptedText', 'spouse-01.json');
const bundle = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const replacements = {
  'a|d-1|S5|motive_search#3': '제가 변명으로 쓰고 싶진 않지만 배경은 분명합니다. 연휴 전에 간병 자리를 놓치면 안 된다고 생각해 280만원 송금을 서둘렀습니다. 그 과정에서 아내를 의사결정 밖으로 밀어낸 건 제 잘못입니다.',
  'a|d-1|S5|empathy_approach#3': '제 선택이 왜 상처가 됐는지는 압니다. 간병 문제를 급히 처리하려던 마음이 있었어도, 280만원을 숨겨 보낸 장면 자체가 배신으로 남았기 때문입니다. 그 무게를 가볍게 말할 생각은 없습니다.',
  'a|d-1|S5|empathy_approach#5': '제가 붙잡고 있는 지점도 같습니다. 급한 간병 수요가 있었다는 점과 별개로, 숨겨진 280만원 송금은 배우자에게 배제감과 불신을 남깁니다. 그 관계 손실을 먼저 감수해야 하는 사람은 저입니다.',
  'a|d-4|S5|fact_pursuit#3': '용처보다 더 문제였던 건 경로와 방식이었습니다. 제 아내는 동생 월세를 위해 150만원을 제3자 계좌로 돌렸고, 저는 그 사실을 뒤늦게 알았습니다. 그 배제의 방식이 신뢰를 무너뜨렸습니다.',
  'a|d-4|S5|fact_pursuit#5': '제가 지적하는 핵심은 지원 자체가 아닙니다. 동생 월세를 돕기 위해 150만원을 정우성 씨 쪽으로 우회한 선택이 더 크게 남았습니다. 배우자인 저를 통째로 빼고 처리했다는 점 때문에 약속 위반이라고 판단합니다.',
  'b|d-4|S5|motive_search#3': '제 선택의 배경은 분명합니다. 동생 집 상황이 급해 보여 150만원부터 돌려 보냈고, 남편과 상의하는 시간조차 아깝다고 여겼습니다. 하지만 그 조급함이 약속을 깨는 이유가 되지는 않습니다.',
  'b|d-5|S5|motive_search#3': '변명 대신 배경을 말씀드리겠습니다. 상처가 커서 저도 같은 기준을 지키고 싶지 않았고, 그래서 150만원 송금이 설명보다 먼저 나갔습니다. 그 조급한 반발이 문제를 키웠습니다.',
};

let updated = 0;
for (const entry of bundle.channels.interrogation.entries) {
  for (const variant of entry.variants) {
    if (!Object.prototype.hasOwnProperty.call(replacements, variant.id)) continue;
    variant.text = replacements[variant.id];
    updated += 1;
  }
}

fs.writeFileSync(filePath, JSON.stringify(bundle, null, 2) + '\n', 'utf8');
console.log(`updated ${updated} interrogation variants`);
