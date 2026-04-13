/**
 * 쟁점 판단 4지선다 선택지 생성 스크립트
 * 각 사건의 disputes에 verdictOptions 필드를 추가합니다.
 *
 * verdictOptions: {
 *   wrong: string    // 상대방 주장 (0점) — 진실과 반대
 *   partial: string  // 일부 진실 (60점) — 사실이지만 핵심이 빠짐
 *   truth: string    // 완전한 진실 (100점) — S3+ 해금 시 노출
 *   defer: string    // 보류 (30점) — 항상 고정
 * }
 */
const fs = require('fs');

// ═══ spouse-01 ═══
const spouse01Path = './src/data/cases/generated/spouse-01.json';
const spouse01 = JSON.parse(fs.readFileSync(spouse01Path, 'utf-8'));

const spouse01Options = {
  'd-1': {
    wrong: '남편이 오피스텔에서 외도 상대를 만나고 있었고, 새벽 전화는 그 상대와의 통화였다.',
    partial: '남편이 오피스텔을 방문한 건 사실이지만, 외도 여부는 확인할 수 없다. 새벽 전화의 상대도 불분명하다.',
    truth: '오피스텔 방문은 친형 집에서 조카(중2)를 돌보는 것이었다. 새벽 전화는 형과의 긴급 연락이었다.',
    defer: '보류 — 판단을 유보합니다',
  },
  'd-2': {
    wrong: '남편이 몰래 빼돌린 비자금 3,000만원은 개인 유흥이나 외도 비용으로 쓰였다.',
    partial: '비자금 3,000만원 출금은 사실이지만, 정확한 사용처는 확인되지 않았다.',
    truth: '이준호는 비자금에서 3,000만원을 출금하여 개인회생 중인 형에게 현금으로 전달했다.',
    defer: '보류 — 판단을 유보합니다',
  },
  'h-d3': {
    wrong: '남편이 공동 적금을 몰래 해지하여 자신의 비자금으로 빼돌렸다.',
    partial: '공동 적금이 해지된 건 사실이지만, 누가 해지했는지는 불분명하다.',
    truth: '박지연이 위임장을 조작하여 공동 적금 2,000만원을 해지했다. 해지한 돈은 투자방 사기로 전액 손실됐다.',
    defer: '보류 — 판단을 유보합니다',
  },
  'h-d4': {
    wrong: '남편이 먼저 비밀을 만들고 돈을 움직였으므로, 아내의 행동은 자구책이었다.',
    partial: '양쪽 모두 숨긴 것이 있지만, 누가 먼저인지는 확실하지 않다.',
    truth: '숨김은 남편이 먼저(비자금+형 상황 은폐), 계좌 감시는 아내가 먼저(신혼 초). 돈 실행은 동시기이나, 범죄 행위(위임장 조작)는 아내 쪽이다.',
    defer: '보류 — 판단을 유보합니다',
  },
};

for (const d of spouse01.disputes) {
  if (spouse01Options[d.id]) {
    d.verdictOptions = spouse01Options[d.id];
  }
}
fs.writeFileSync(spouse01Path, JSON.stringify(spouse01, null, 2), 'utf-8');
console.log('spouse-01: verdictOptions 추가 완료');

// ═══ friend-01 ═══
const friend01Path = './src/data/cases/generated/friend-01.json';
const friend01 = JSON.parse(fs.readFileSync(friend01Path, 'utf-8'));

const friend01Options = {
  'd-1': {
    wrong: '최수민이 예비신랑에게 집착하여 반복적으로 연락한 것이다.',
    partial: '최수민이 예비신랑에게 연락한 건 사실이지만, 그 이유는 단순 집착인지 다른 의도인지 확실하지 않다.',
    truth: '최수민은 송다은 아버지의 돈 접근 패턴을 경고하려 했지만 직접 말할 길이 없어 예비신랑에게 연락했다.',
    defer: '보류 — 판단을 유보합니다',
  },
  'd-2': {
    wrong: '최수민이 먼저 예비신랑에게 접근했고, 예비신랑은 피해자다.',
    partial: '예비신랑과 최수민 사이에 연락이 있었지만, 누가 먼저인지는 불분명하다.',
    truth: '예비신랑이 먼저 최수민에게 선넘는 메시지를 보냈고, 최수민은 거절했다.',
    defer: '보류 — 판단을 유보합니다',
  },
  'd-3': {
    wrong: '송다은 아버지는 예비신랑에게 단순한 인사를 건넸을 뿐이다.',
    partial: '송다은 아버지와 예비신랑 사이에 돈 관련 대화가 있었지만 구체적 내용은 불확실하다.',
    truth: '송다은 아버지가 예비신랑에게 돈을 빌려달라고 접근했고, 최수민은 과거 같은 패턴을 당한 적이 있어 경고하려 했다.',
    defer: '보류 — 판단을 유보합니다',
  },
  'd-4': {
    wrong: '과거 손절은 최수민이 변심하여 일방적으로 끊은 것이다.',
    partial: '과거 손절에는 돈 문제가 얽혀 있었지만, 정확한 경위는 알 수 없다.',
    truth: '과거 손절의 진짜 원인은 송다은 아버지가 최수민에게 투자 명목으로 돈을 받아간 사기였다. 최수민은 차마 말하지 못하고 악역을 자처했다.',
    defer: '보류 — 판단을 유보합니다',
  },
  'd-5': {
    wrong: '최수민이 먼저 예비신랑에게 접근하여 명예를 스스로 무너뜨렸다.',
    partial: '양쪽 모두 상대에 대해 단정적으로 말한 부분이 있다.',
    truth: '송다은이 확인 없이 단톡방에서 최수민을 매도했고, 최수민은 또다시 악역을 자처하는 구조가 반복됐다.',
    defer: '보류 — 판단을 유보합니다',
  },
};

for (const d of friend01.disputes) {
  if (friend01Options[d.id]) {
    d.verdictOptions = friend01Options[d.id];
  }
}
fs.writeFileSync(friend01Path, JSON.stringify(friend01, null, 2), 'utf-8');
console.log('friend-01: verdictOptions 추가 완료');

// ═══ family-01 ═══
const family01Path = './src/data/cases/generated/family-01.json';
const family01 = JSON.parse(fs.readFileSync(family01Path, 'utf-8'));

const family01Options = {
  'd-1': {
    wrong: '어머니는 동생의 압박에 의해 유서를 작성했고, 스스로 판단할 수 없는 상태였다.',
    partial: '어머니가 유서를 작성할 때 인지 능력에 의문이 있지만, 완전히 무효라고 단정할 수는 없다.',
    truth: '윤정후는 어머니 말년에 자주 방문하며 유서 내용을 논의했다. 어머니 의사를 완전히 무시한 것은 아니었다.',
    defer: '보류 — 판단을 유보합니다',
  },
  'd-2': {
    wrong: '동생이 자기 몫을 90%로 늘리려고 유서를 조작했다.',
    partial: '유서가 조작된 건 사실이지만, 정확한 의도는 파악하기 어렵다.',
    truth: '윤정후는 어머니가 90:10으로 남긴 원본 유서를 60:40으로 조작했다. 자기 몫을 줄인 조작이었지만 위조는 위조다.',
    defer: '보류 — 판단을 유보합니다',
  },
  'd-3': {
    wrong: '동생이 보낸 생활비는 어머니를 통제하기 위한 수단이었다.',
    partial: '동생이 생활비를 보낸 건 사실이지만, 그 규모와 의도는 불분명하다.',
    truth: '윤정후는 20년간 매달 어머니에게 생활비를 보냈고, 형의 공장 부도 때도 큰돈을 대신 갚았다. 어머니 돈처럼 보였던 것의 상당수가 사실 윤정후의 돈이었다.',
    defer: '보류 — 판단을 유보합니다',
  },
  'd-4': {
    wrong: '동생이 출생 비밀을 이용하여 형을 유산에서 배제하려 했다.',
    partial: '출생에 관한 비밀이 존재하는 것 같지만, 구체적 내용은 확인되지 않았다.',
    truth: '윤태성은 아버지와 혈연이 아니다. 윤정후는 일기장에서 이 사실을 알게 됐고, 형의 삶이 무너질까 봐 유서를 90에서 60으로 줄여 법정까지 안 가게 하려 했다.',
    defer: '보류 — 판단을 유보합니다',
  },
  'd-5': {
    wrong: '동생이 어머니를 이용하여 유산을 독점하려 했다.',
    partial: '양쪽 모두 어머니와의 관계에서 문제가 있었지만, 누가 더 이용했는지는 판단하기 어렵다.',
    truth: '형은 유산을 당연시했고, 동생은 어머니 뜻을 고쳐 형을 보호하려 했다. 둘 다 어머니를 있는 그대로 두지 못했다.',
    defer: '보류 — 판단을 유보합니다',
  },
};

for (const d of family01.disputes) {
  if (family01Options[d.id]) {
    d.verdictOptions = family01Options[d.id];
  }
}
fs.writeFileSync(family01Path, JSON.stringify(family01, null, 2), 'utf-8');
console.log('family-01: verdictOptions 추가 완료');
