const fs = require('fs');

const filePath = 'src/data/scriptedText/spouse-03.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

function entryMap(channel) {
  return new Map(data.channels[channel].entries.map((entry) => [entry.key, entry]));
}

const evidence = entryMap('evidence_present');
const dossier = entryMap('dossier');

function setEvidence(key, index, text) {
  evidence.get(key).variants[index].text = text;
}

function setDossier(key, index, text) {
  dossier.get(key).variants[index].text = text;
}

for (const key of [
  'b|e-1|early|institutional',
  'b|e-1|mid|institutional',
  'b|e-1|late|institutional',
]) {
  setEvidence(key, 0, '우선 공동 비상금 계좌 인출내역입니다. 이직 첫 주에 제 아내 명의 인증으로 160만원이 빠져나간 원본 기록입니다.');
  setEvidence(key, 3, '초기 기록으로는 공동 비상금 계좌 인출내역입니다. 제 아내 명의 인증 흔적이 그대로 남아 있습니다.');
}

for (const key of [
  'b|e-4|early|other',
  'b|e-4|mid|other',
  'b|e-4|late|other',
]) {
  setEvidence(key, 1, '먼저 사내 복장 가이드 공지입니다. 복장 기준과 외부 미팅 준비 규정이 함께 적혀 있습니다.');
}

for (const key of ['a|dossier-1.a.q2|mid', 'a|dossier-1.a.q2|late']) {
  setDossier(key, 0, '노유진님, 인출 직후 이어진 정장·구두·정기권 결제가 수습 준비비였다는 점을 구체적으로 설명해 주시기 바랍니다.');
}

for (const key of ['b|dossier-1.b.q1|early', 'b|dossier-1.b.q1|mid', 'b|dossier-1.b.q1|late']) {
  setDossier(key, 0, '황인호님, 이 자료를 보고도 생활비 구멍이 오직 제 아내 때문이었다고 단정하시는 이유를 설명해 주시기 바랍니다.');
}

for (const key of ['b|dossier-2.b.q1|early', 'b|dossier-2.b.q1|mid', 'b|dossier-2.b.q1|late']) {
  setDossier(key, 0, '황인호님, 잘린 승인 알림 묶음만으로 전체 소비를 판단하신 근거를 설명해 주시기 바랍니다.');
}

for (const key of ['b|dossier-3.b.q1|early', 'b|dossier-3.b.q1|mid', 'b|dossier-3.b.q1|late']) {
  setDossier(key, 0, '황인호님, 같은 날 두 건의 금융 조정을 묶어 처리하신 경위를 설명해 주시기 바랍니다.');
}

for (const key of ['b|dossier-3.b.q2|mid', 'b|dossier-3.b.q2|late']) {
  setDossier(key, 0, '황인호님, 메모에 "첫 급여 들어오면 다시 채움"이라고 적어 두고도 왜 제 아내에게는 말하지 않으셨는지 설명해 주시기 바랍니다.');
}

fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
console.log('patched spouse-03 residual evidence/dossier issues');
