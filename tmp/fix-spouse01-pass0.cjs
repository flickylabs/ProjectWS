const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'src', 'data', 'scriptedText', 'spouse-01.json');
let text = fs.readFileSync(filePath, 'utf8');

const replacements = [
  ['고스란히 찍혀 있다.', '고스란히 찍혀 있습니다.'],
  ['직인이 찍혀 있다.', '직인이 찍혀 있습니다.'],
  ['보여준다.', '보여줍니다.'],
  ['드러난다.', '드러납니다.'],
  ['세린도 가족 쪽 급한 돈 문제를 지석씨한테 바로 꺼내진 않으려 했고요.', '세린도 가족 쪽 급한 돈 문제를 지석씨한테 바로 꺼내려 하지는 않았습니다.'],
  ['시각은 밤 9시 14분.', '시각은 밤 9시 14분입니다.'],
  ['먼저 깬 사람이 저였으니까요.', '먼저 깬 사람이 저였기 때문입니다.'],
  ['지석씨도 뭔가 혼자 챙기는 눈치였고, 세린도 저한테 말을 다 못 하더군요.', '지석씨도 뭔가 혼자 챙기는 눈치였고, 세린도 저한테 말을 다 못 하는 듯했습니다.'],
  ['재판관님, 제 자식이라고 감싸고 싶어도 사실은 사실이지요.', '재판관님, 제 자식이라고 감싸고 싶어도 사실은 사실입니다.'],
];

for (const [from, to] of replacements) {
  text = text.split(from).join(to);
}

fs.writeFileSync(filePath, text, 'utf8');
console.log(`applied ${replacements.length} replacements`);
