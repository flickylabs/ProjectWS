const fs = require('fs');

// ═══ spouse-01 ═══
const s1 = JSON.parse(fs.readFileSync('./src/data/cases/generated/spouse-01.json', 'utf-8'));

s1.disputes.find(d => d.id === 'd-1').verdictOptions = {
  wrong: '이준호의 오피스텔 방문은 딴집 살림 때문이었다.',
  partial: '오피스텔 방문은 딴집 살림까지는 아니지만, 외도일 가능성이 높다.',
  truth: '오피스텔 방문의 실체는 외도가 아니라 가족 돌봄이었다.',
  defer: '현재로서는 실체를 알 수가 없다. 판단을 유보한다.',
};

s1.disputes.find(d => d.id === 'd-2').verdictOptions = {
  wrong: '비자금 3,000만원은 이준호가 개인 유흥에 쓴 돈이다.',
  partial: '비자금 출금은 사실이지만, 정확한 사용처는 불확실하다.',
  truth: '비자금 3,000만원은 개인회생 중인 형에게 현금으로 전달한 돈이었다.',
  defer: '사용처를 특정할 수 없다. 판단을 유보한다.',
};

s1.disputes.find(d => d.id === 'h-d3').verdictOptions = {
  wrong: '공동 적금 2,000만원은 이준호가 몰래 해지하여 비자금으로 빼돌렸다.',
  partial: '공동 적금이 해지된 건 맞지만, 누가 해지했는지는 불분명하다.',
  truth: '박지연이 위임장을 조작하여 해지했고, 그 돈을 투자 사기로 전액 잃었다.',
  defer: '해지 경위가 불분명하다. 판단을 유보한다.',
};

s1.disputes.find(d => d.id === 'h-d4').verdictOptions = {
  wrong: '이준호가 먼저 비밀을 만들었으므로, 박지연의 행동은 자구책이었다.',
  partial: '양쪽 모두 숨긴 것이 있지만, 선후 관계를 특정하기 어렵다.',
  truth: '숨김은 이준호가 먼저, 계좌 감시는 박지연이 먼저. 범죄 행위(위임장 조작)는 박지연 쪽이다.',
  defer: '누가 먼저인지 판단할 근거가 부족하다. 유보한다.',
};

fs.writeFileSync('./src/data/cases/generated/spouse-01.json', JSON.stringify(s1, null, 2), 'utf-8');
console.log('spouse-01 완료');

// ═══ friend-01 ═══
const f1 = JSON.parse(fs.readFileSync('./src/data/cases/generated/friend-01.json', 'utf-8'));

f1.disputes.find(d => d.id === 'd-1').verdictOptions = {
  wrong: '최수민이 예비신랑에게 집착하며 반복적으로 연락한 것이다.',
  partial: '최수민이 연락한 건 맞지만, 집착인지 다른 의도인지는 불분명하다.',
  truth: '최수민은 송다은 아버지의 돈 접근 패턴을 경고하려 예비신랑에게 연락했다.',
  defer: '연락의 실체를 판단할 근거가 부족하다. 유보한다.',
};

f1.disputes.find(d => d.id === 'd-2').verdictOptions = {
  wrong: '최수민이 먼저 예비신랑에게 접근했고, 예비신랑은 피해자다.',
  partial: '양쪽 다 연락이 있었지만, 누가 선을 넘었는지는 애매하다.',
  truth: '예비신랑이 먼저 선넘는 메시지를 보냈고, 최수민은 거절했다.',
  defer: '선후 관계를 특정할 수 없다. 유보한다.',
};

f1.disputes.find(d => d.id === 'd-3').verdictOptions = {
  wrong: '송다은 아버지는 예비신랑에게 인사차 안부를 전했을 뿐이다.',
  partial: '돈 이야기가 오간 것 같지만 구체적 내용은 확인이 안 된다.',
  truth: '송다은 아버지가 예비신랑에게 돈을 빌려달라고 접근했고, 최수민은 과거 같은 패턴을 겪은 적이 있다.',
  defer: '대화의 실체를 확인할 수 없다. 유보한다.',
};

f1.disputes.find(d => d.id === 'd-4').verdictOptions = {
  wrong: '과거 손절은 최수민이 변심해서 일방적으로 끊은 것이다.',
  partial: '손절에 돈 문제가 얽혀 있었지만, 정확한 경위는 알 수 없다.',
  truth: '송다은 아버지가 최수민에게 투자 명목으로 돈을 받아간 사기가 원인이었다. 최수민은 차마 말 못하고 악역을 자처했다.',
  defer: '손절의 진짜 원인을 특정하기 어렵다. 유보한다.',
};

f1.disputes.find(d => d.id === 'd-5').verdictOptions = {
  wrong: '최수민이 먼저 예비신랑에게 접근해서 스스로 명예를 무너뜨렸다.',
  partial: '양쪽 모두 상대를 단정한 부분이 있다.',
  truth: '송다은이 확인 없이 단톡방에서 최수민을 매도했고, 최수민은 또 악역이 되는 구조가 반복됐다.',
  defer: '누가 먼저 명예를 훼손했는지 판단하기 어렵다. 유보한다.',
};

fs.writeFileSync('./src/data/cases/generated/friend-01.json', JSON.stringify(f1, null, 2), 'utf-8');
console.log('friend-01 완료');

// ═══ family-01 ═══
const m1 = JSON.parse(fs.readFileSync('./src/data/cases/generated/family-01.json', 'utf-8'));

m1.disputes.find(d => d.id === 'd-1').verdictOptions = {
  wrong: '어머니는 동생의 압박으로 유서를 작성했고, 제대로 판단할 수 없는 상태였다.',
  partial: '어머니의 인지 능력에 의문이 있지만, 완전히 무효라고 단정하긴 어렵다.',
  truth: '윤정후는 말년에 자주 방문하며 유서를 논의했지만, 어머니 의사를 완전히 무시한 건 아니었다.',
  defer: '어머니의 판단 능력 여부를 확인할 수 없다. 유보한다.',
};

m1.disputes.find(d => d.id === 'd-2').verdictOptions = {
  wrong: '동생이 자기 몫을 90%로 늘리기 위해 유서를 조작했다.',
  partial: '유서가 변경된 건 맞지만, 의도가 탐욕인지 보호인지는 불분명하다.',
  truth: '윤정후는 어머니의 90:10 원본 유서를 60:40으로 조작했다. 자기 몫을 줄인 조작이었지만 위조는 위조다.',
  defer: '조작 여부와 그 의도를 판단하기 어렵다. 유보한다.',
};

m1.disputes.find(d => d.id === 'd-3').verdictOptions = {
  wrong: '동생이 생활비를 빌미로 어머니를 통제한 것이다.',
  partial: '생활비를 보낸 건 맞지만, 그 규모와 성격은 확실하지 않다.',
  truth: '윤정후는 20년간 매달 생활비를 보냈고, 형의 공장 부도 때도 큰돈을 대신 갚았다. 어머니 돈처럼 보였던 상당수가 사실 윤정후의 돈이었다.',
  defer: '생활비의 성격과 규모를 판단하기 어렵다. 유보한다.',
};

m1.disputes.find(d => d.id === 'd-4').verdictOptions = {
  wrong: '동생이 출생 비밀을 이용해 형을 유산에서 배제하려 했다.',
  partial: '출생에 관한 비밀이 있는 것 같지만, 그것이 유서 조작과 직접 관련되는지는 불분명하다.',
  truth: '윤태성은 아버지와 혈연이 아니다. 윤정후는 이 사실을 알고도, 형의 삶이 무너질까 봐 유서를 줄여 법정까지 안 가게 하려 했다.',
  defer: '출생 비밀의 존재 여부를 확인할 수 없다. 유보한다.',
};

m1.disputes.find(d => d.id === 'd-5').verdictOptions = {
  wrong: '동생이 어머니를 이용해 유산을 독점하려 했다.',
  partial: '양쪽 모두 어머니와의 관계에서 문제가 있었다.',
  truth: '형은 유산을 당연시했고, 동생은 어머니 뜻을 고쳐 형을 보호하려 했다. 둘 다 어머니를 있는 그대로 두지 못했다.',
  defer: '누가 어머니를 이용했는지 판단하기 어렵다. 유보한다.',
};

fs.writeFileSync('./src/data/cases/generated/family-01.json', JSON.stringify(m1, null, 2), 'utf-8');
console.log('family-01 완료');
