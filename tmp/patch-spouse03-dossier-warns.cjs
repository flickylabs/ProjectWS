const fs = require('fs');

const filePath = 'src/data/scriptedText/spouse-03.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const dossier = new Map(data.channels.dossier.entries.map((entry) => [entry.key, entry]));

function setText(key, index, text) {
  dossier.get(key).variants[index].text = text;
}

setText('b|dossier-1.b.q2|early', 1, '황인호님, 그 결제를 처음 본 시점에 왜 확인보다 의심을 먼저 택하셨는지 설명해 주시기 바랍니다.');
setText('b|dossier-1.b.q3|early', 1, '황인호님, 그 지출이 업무 적응과 연결될 가능성은 왜 먼저 검토하지 않으셨는지 설명해 주시기 바랍니다.');
setText('b|dossier-2.b.q2|early', 1, '황인호님, 해당 지출의 사용처를 끝까지 확인하지 않은 이유를 설명해 주시기 바랍니다.');
setText('b|dossier-2.b.q3|early', 1, '황인호님, 일부 알림만 보고 전체 성격을 단정하신 근거를 설명해 주시기 바랍니다.');
setText('b|dossier-3.b.q2|early', 1, '황인호님, 메모에 계획을 적어 두고도 왜 공유는 뒤로 미루셨는지 설명해 주시기 바랍니다.');
setText('b|dossier-3.b.q3|early', 1, '황인호님, 50만원 기준을 알고도 먼저 상의하지 않은 이유를 설명해 주시기 바랍니다.');

fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
console.log('patched spouse-03 dossier warning pairs');
