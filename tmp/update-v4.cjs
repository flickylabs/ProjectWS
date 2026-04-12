const fs = require('fs');
const data = JSON.parse(fs.readFileSync('d:/ProjectWS/src/data/cases/generated/spouse-v4-01.json', 'utf8'));

// 1. caseId
data.caseId = 'case-spouse-v4-01';

// 2. meta
data.meta.anchorTruth = '박지연은 남편이 딴살림을 차렸다고 확신한 뒤 위임장을 조작하여 공동 적금 2,000만원을 해지했고, 투자 사기로 전액 손실했다. 이준호는 외도가 아니라 개인회생 중인 친형의 조카(중2)를 돌보고 있었고, 비자금에서 3,000만원을 현금으로 형에게 전달했다.';
data.meta.emotionalBait = '남편 차에서 발견된 영수증 5장 묶음: 편의점 컵라면, 올리브영 머리끈/틴트/헤어롤, 서점 중학교 참고서. 매일 퇴근 뒤 오피스텔에 머무는 남편. 새벽의 통화. 아내는 남편의 딴살림을 확신한다.';
data.meta.resolutionDilemma = '개인회생 중인 형과 조카를 지키려다 비자금 3,000만원을 현금으로 전달한 남편과, 배신당했다고 확신하고 위임장을 조작하여 공동 적금 2,000만원을 해지한 뒤 투자 사기로 날린 아내 중 누가 더 무거운 책임을 져야 하는가. 숨김은 남편이 먼저, 계좌 감시는 아내가 먼저, 범죄 행위는 아내가 저질렀다.';

// 3. disputes
// d-1
const d1 = data.disputes.find(d => d.id === 'd-1');
d1.name = '오피스텔 방문과 새벽 전화';
d1.truthDescription = '오피스텔 방문은 친형 오피스텔에서 조카(중2)를 돌보는 것이었다. 새벽 전화는 형과의 긴급 연락.';
d1.v3Visibility = 'initial';
d1.hidden = false;

// d-2
const d2 = data.disputes.find(d => d.id === 'd-2');
d2.name = '비자금 3,000만원 출금';
d2.truthDescription = '이준호는 개인 비자금에서 3,000만원을 출금하여 형에게 현금으로 전달했다. 형이 개인회생 중이라 계좌 입금이 불가능했다.';
d2.hidden = false;
d2.v3Visibility = 'hidden';
d2.unlockCondition = { requireDispute: { id: 'd-1', party: 'a', minState: 'S3' } };
d2.v3UnlockPlan = { runtimeRule: 'A d-1 S3 도달 시 (목돈 출금 언급)', authoredRule: 'A가 d-1 심문에서 S3에 도달하면 목돈 출금 발견으로 새 쟁점 부상' };
d2.mediationLink = '비자금 현금 전달과 개인회생';
d2.judgmentStatement = '비자금 3,000만원 현금 전달은 남편 책임이 더 크다.';

// h-d3
const hd3 = data.disputes.find(d => d.id === 'h-d3');
hd3.name = '공동 적금 2,000만원 해지';
hd3.truthDescription = '박지연은 위임장을 조작하여 공동 적금 2,000만원을 해지했다. 이는 범죄 행위이며, 해지한 돈을 투자방에 넣었다가 사기로 전액 손실했다.';
hd3.hidden = true;
hd3.v3Visibility = 'hidden';
hd3.unlockCondition = { requireDispute: { id: 'd-2', minState: 'S1' }, note: 'd-2 발견 후 B가 역공 시' };
hd3.v3UnlockPlan = { runtimeRule: 'd-2 발견 후 B 역공 시 해금', authoredRule: 'd-2 발견 후 B가 "그쪽도 적금 건드린 거 아니냐" 역공하면 생성' };
hd3.mediationLink = '위임장 조작과 투자 사기';
hd3.judgmentStatement = '공동 적금 2,000만원 위임장 조작 해지는 아내 책임이 더 크다.';

// h-d4
const hd4 = data.disputes.find(d => d.id === 'h-d4');
hd4.name = '누가 먼저 숨기고 움직였는가';
hd4.truthDescription = '숨김은 B가 먼저(비자금+형 상황 은폐), 계좌 감시는 A가 먼저(신혼 초), 돈 실행은 동시기(B 4개월 전, A 6주 전), 범죄 행위는 A(위임장 조작).';
hd4.hidden = true;
hd4.v3Visibility = 'hidden';
hd4.unlockCondition = { requireDispute: [{ id: 'd-2', minState: 'S1' }, { id: 'h-d3', minState: 'S1' }], note: 'd-2 + h-d3 모두 공개 후 자동' };
hd4.v3UnlockPlan = { runtimeRule: 'd-2 + h-d3 모두 공개 후 자동 해금', authoredRule: 'd-2와 h-d3 모두 공개된 후 자동 발현' };
hd4.mediationLink = '숨김과 실행의 선후';
hd4.judgmentStatement = '숨김의 선후와 범죄 행위의 유무는 서로 다른 차원이다.';

// 4. evidence updates
// e-1
const e1 = data.evidence.find(e => e.id === 'e-1');
e1.name = '영수증 묶음 (5장)';
e1.surfaceName = '영수증 묶음 5장';
e1.description = 'B의 차에서 발견된 영수증 5장: (1)편의점 컵라면/삼각김밥 (2)올리브영 머리끈/틴트/헤어롤(여성/청소년) (3)서점 중학교 참고서(핵심) (4)꽃집 화분 (5)주유소';
e1.surfaceDescription = '영수증 묶음 5장이 존재한다.';
e1.type = 'log';
e1.investigationResults = {
  request_original: '5장 영수증 중 편의점과 올리브영 영수증이 먼저 눈에 들어온다. 머리끈, 틴트, 헤어롤은 여성 혹은 청소년 물품이다.',
  check_metadata: '서점 영수증에 중학교 참고서, 꽃집 영수증에 화분, 주유소 영수증이 추가로 확인된다. 참고서는 중학교 2학년용이다.',
  restore_context: '중학교 2학년 참고서가 결정적 단서이다. 조카(중2) 돌봄을 위한 구매로 재맥락화된다.'
};
e1.investigationStages = [
  { stage: 0, revealKey: 'request_original', question: { text: '이 영수증들, 누가 무엇을 산 것입니까?', attackVector: 'authenticity' } },
  { stage: 1, revealKey: 'check_metadata', question: { text: '서점에서 산 중학교 참고서는 누구를 위한 것입니까?', attackVector: 'context' } },
  { stage: 2, revealKey: 'restore_context', question: { text: '이 참고서가 중학교 2학년용이라는 것은 무엇을 의미합니까?', attackVector: 'responsibility' } }
];
e1.partyContext = {
  a: { questionAngle: '이 영수증들이 왜 딴살림 확신으로 이어졌는지 설명해 주십시오.', implication: '머리끈/틴트가 외도 의심의 출발점이다.' },
  b: { questionAngle: '이 영수증의 물품들은 누구를 위해 구매한 것인지 설명해 주십시오.', implication: '참고서가 조카 돌봄의 결정적 단서가 된다.' }
};
e1.subjectParty = 'b';
e1.meta.name = '영수증 묶음 5장';
e1.meta.type = 'log';
e1.meta.viewerType = 'log';
e1.v3DepthPlan = [
  { id: 'stub', label: 'Stub', summary: '영수증 묶음 5장 존재만 보임' },
  { id: 'excerpt', label: 'Excerpt', summary: '편의점, 올리브영 영수증: 머리끈, 틴트, 헤어롤 항목만 보임' },
  { id: 'original', label: 'Original', summary: '서점 중학교 참고서, 꽃집, 주유소 영수증 추가 확인' },
  { id: 'context', label: 'Context', summary: '참고서가 중학교 2학년용이라는 결정적 디테일' },
  { id: 'established', label: 'Established', summary: '조카 돌봄을 위한 구매로 확인됨' }
];
if (e1.viewerData && e1.viewerData.meta) {
  e1.viewerData.meta.name = '영수증 묶음 5장';
  e1.viewerData.meta.type = 'log';
  e1.viewerData.meta.viewerType = 'log';
}

// e-2
const e2 = data.evidence.find(e => e.id === 'e-2');
e2.name = '블랙박스 GPS / 네비 즐겨찾기';
e2.surfaceName = '블랙박스 GPS 기록';
e2.description = '매일 같은 좌표에 정차. 오피스텔 주소 특정. A가 B 차에서 확인.';
e2.surfaceDescription = '차량 GPS에 같은 좌표 반복 정차 기록이 있다.';
e2.type = 'device';
e2.investigationResults = {
  request_original: '블랙박스 GPS에 매일 같은 좌표에 정차한 기록이 남아 있다. 네비 즐겨찾기에도 같은 주소가 저장되어 있다.',
  check_metadata: '정차 빈도는 주 2~3회 이상이며, 체류 시간은 2~3시간이다. 오피스텔 주소로 특정된다.',
  restore_context: '후반에는 형네 오피스텔 방문 동선으로 재맥락화된다.'
};
e2.subjectParty = 'b';
e2.investigationStages = [
  { stage: 0, revealKey: 'request_original', question: { text: '이 GPS 기록, 본인 차 맞습니까?', attackVector: 'authenticity' } },
  { stage: 1, revealKey: 'check_metadata', question: { text: '왜 같은 오피스텔에 매일 갔습니까?', attackVector: 'context' } },
  { stage: 2, revealKey: 'restore_context', question: { text: '그 방문 사실을 왜 배우자에게 말하지 않았습니까?', attackVector: 'responsibility' } }
];
e2.partyContext = {
  a: { questionAngle: '이 GPS 기록이 왜 외도 동선처럼 보였는지 설명해 주십시오.', implication: '장소와 빈도가 의심을 굳혔다.' },
  b: { questionAngle: '이 GPS 기록의 목적지가 어디인지 설명해 주십시오.', implication: '침묵이 더 큰 오해를 만들었다.' }
};
e2.meta.name = '블랙박스 GPS 기록';
e2.meta.type = 'device';
e2.meta.viewerType = 'device';
if (e2.viewerData && e2.viewerData.meta) {
  e2.viewerData.meta.name = '블랙박스 GPS 기록';
  e2.viewerData.meta.type = 'device';
  e2.viewerData.meta.viewerType = 'device';
}
e2.v3DepthPlan = [
  { id: 'stub', label: 'Stub', summary: 'GPS 기록 존재만 보임' },
  { id: 'excerpt', label: 'Excerpt', summary: '같은 좌표 반복 정차 기록' },
  { id: 'original', label: 'Original', summary: '주소, 빈도, 체류 시간 확보' },
  { id: 'context', label: 'Context', summary: '오피스텔 동선과 형네 주소 일치' },
  { id: 'established', label: 'Established', summary: '형네 오피스텔 방문 동선으로 확인' }
];

// e-3
const e3 = data.evidence.find(e => e.id === 'e-3');
e3.name = '통화기록';
e3.surfaceName = '통화기록';
e3.description = '새벽 시간대 같은 번호 반복. 낮에도 짧은 통화 다수. 통화 상대=1명.';
e3.surfaceDescription = '새벽 시간대 같은 번호 반복 통화 기록이 있다.';
e3.type = 'log';
e3.investigationResults = {
  request_original: '새벽 시간대에 같은 번호로 반복 통화한 기록이다. 낮에도 짧은 통화가 다수 있다.',
  check_metadata: '통화 상대는 1명이다. 새벽과 낮 모두 같은 번호이며, 긴급 연락 패턴이다.',
  restore_context: '후반에는 형과의 긴급 연락으로 재맥락화된다.'
};
e3.subjectParty = 'b';
e3.investigationStages = [
  { stage: 0, revealKey: 'request_original', question: { text: '이 통화기록의 상대는 누구입니까?', attackVector: 'authenticity' } },
  { stage: 1, revealKey: 'check_metadata', question: { text: '왜 새벽에 반복적으로 같은 번호에 전화했습니까?', attackVector: 'context' } },
  { stage: 2, revealKey: 'restore_context', question: { text: '이 통화 내용을 왜 배우자에게 숨겼습니까?', attackVector: 'responsibility' } }
];
e3.partyContext = {
  a: { questionAngle: '새벽 통화가 왜 외도 증거처럼 보였는지 설명해 주십시오.', implication: '새벽 시간대가 의심을 키웠다.' },
  b: { questionAngle: '이 통화 상대가 누구인지, 왜 새벽에 전화했는지 설명해 주십시오.', implication: '형과의 긴급 연락이었다.' }
};
e3.meta.name = '통화기록';
e3.meta.type = 'log';
e3.meta.viewerType = 'log';
if (e3.viewerData && e3.viewerData.meta) {
  e3.viewerData.meta.name = '통화기록';
  e3.viewerData.meta.type = 'log';
  e3.viewerData.meta.viewerType = 'log';
}
e3.v3DepthPlan = [
  { id: 'stub', label: 'Stub', summary: '통화기록 존재만 보임' },
  { id: 'excerpt', label: 'Excerpt', summary: '새벽 시간대 같은 번호 반복' },
  { id: 'original', label: 'Original', summary: '통화 상대 1명, 새벽+낮 패턴 확인' },
  { id: 'context', label: 'Context', summary: '형과의 긴급 연락 패턴' },
  { id: 'established', label: 'Established', summary: '형과의 통화로 확인됨' }
];

// e-4
const e4 = data.evidence.find(e => e.id === 'e-4');
e4.name = '형 문자 스레드';
e4.surfaceName = '형 문자 스레드';
e4.description = "'오늘도 부탁해', '가은이 학교 알림' 등. 돌봄 관계 직접 증명.";
e4.surfaceDescription = '문자 스레드가 존재한다.';
e4.type = 'chat';
e4.investigationResults = {
  request_original: "문자 내용에 '오늘도 부탁해', '가은이 학교 알림' 등 돌봄 관련 메시지가 있다.",
  check_metadata: '발신자는 형(이성호)이다. 일상적 돌봄 부탁 내용이 반복된다.',
  restore_context: '조카 돌봄 관계를 직접 증명하는 결정적 증거이다.'
};
e4.subjectParty = 'b';
e4.proves = ['d-1'];
e4.investigationStages = [
  { stage: 0, revealKey: 'request_original', question: { text: '이 문자의 발신자는 누구입니까?', attackVector: 'authenticity' } },
  { stage: 1, revealKey: 'check_metadata', question: { text: '이 문자 내용이 돌봄 부탁이라면 왜 아내에게 보여주지 않았습니까?', attackVector: 'context' } },
  { stage: 2, revealKey: 'restore_context', question: { text: '이 문자 스레드가 오피스텔 방문과 어떤 관계입니까?', attackVector: 'responsibility' } }
];
e4.partyContext = {
  a: { questionAngle: '이 문자를 처음 보십니까? 어떤 의미라고 생각하십니까?', implication: '돌봄 관계의 직접 증거이다.' },
  b: { questionAngle: '이 문자가 형에게 온 것이 맞다면 왜 숨겼습니까?', implication: '시댁 갈등 때문에 숨긴 것이다.' }
};
e4.meta.name = '형 문자 스레드';
e4.meta.type = 'chat';
e4.meta.viewerType = 'chat';
if (e4.viewerData && e4.viewerData.meta) {
  e4.viewerData.meta.name = '형 문자 스레드';
  e4.viewerData.meta.type = 'chat';
  e4.viewerData.meta.viewerType = 'chat';
}
e4.v3DepthPlan = [
  { id: 'stub', label: 'Stub', summary: '문자 스레드 존재만 보임' },
  { id: 'excerpt', label: 'Excerpt', summary: '돌봄 관련 메시지 일부 보임' },
  { id: 'original', label: 'Original', summary: '발신자 확인 + 전체 대화 내용' },
  { id: 'context', label: 'Context', summary: '형의 돌봄 부탁 패턴' },
  { id: 'established', label: 'Established', summary: '조카 돌봄 관계 직접 증명' }
];

// e-5
const e5 = data.evidence.find(e => e.id === 'e-5');
e5.name = 'B 계좌 출금 내역';
e5.surfaceName = 'B 계좌 출금 내역';
e5.description = '비자금 계좌에서 3,000만원 현금 출금 기록.';
e5.surfaceDescription = '비자금 계좌 출금 기록이 있다.';
e5.type = 'bank';
e5.investigationResults = {
  request_original: '비자금 계좌에서 3,000만원이 현금으로 출금된 기록이다.',
  check_metadata: '출금 시점은 4개월 전이며, 오피스텔 방문 시작 시점과 일치한다.',
  restore_context: '형에게 현금으로 전달하기 위한 출금이었다. 형은 개인회생 중이라 계좌 입금 불가.'
};
e5.subjectParty = 'b';
e5.proves = ['d-2'];
e5.investigationStages = [
  { stage: 0, revealKey: 'request_original', question: { text: '이 출금 기록은 본인 계좌 맞습니까?', attackVector: 'authenticity' } },
  { stage: 1, revealKey: 'check_metadata', question: { text: '왜 3,000만원을 현금으로 출금했습니까?', attackVector: 'context' } },
  { stage: 2, revealKey: 'restore_context', question: { text: '현금 출금 후 그 돈은 어디로 갔습니까?', attackVector: 'responsibility' } }
];
e5.partyContext = {
  a: { questionAngle: '이 출금을 어떻게 알게 되었습니까?', implication: '계좌 감시 사실이 노출될 위험이 있다.' },
  b: { questionAngle: '이 돈을 누구에게 왜 전달했습니까?', implication: '형에게 현금 전달한 경위 설명이 필요하다.' }
};
e5.meta.name = 'B 계좌 출금 내역';
e5.meta.type = 'bank';
e5.meta.viewerType = 'bank';
if (e5.viewerData && e5.viewerData.meta) {
  e5.viewerData.meta.name = 'B 계좌 출금 내역';
  e5.viewerData.meta.type = 'bank';
  e5.viewerData.meta.viewerType = 'bank';
}
e5.v3DepthPlan = [
  { id: 'stub', label: 'Stub', summary: '출금 기록 존재만 보임' },
  { id: 'excerpt', label: 'Excerpt', summary: '3,000만원 현금 출금 기록' },
  { id: 'original', label: 'Original', summary: '출금 시점, 금액, 방식 확인' },
  { id: 'context', label: 'Context', summary: '오피스텔 방문 시작 시점과 일치' },
  { id: 'established', label: 'Established', summary: '형에게 현금 전달 목적으로 확인' }
];

// e-6
const e6 = data.evidence.find(e => e.id === 'e-6');
e6.name = '투자방 카톡 + 송금 기록';
e6.surfaceName = '투자방 카톡 기록';
e6.description = 'A의 2,000만원 송금 내역 + 투자방 대화. 사기 경위.';
e6.surfaceDescription = '투자방 카톡 대화와 송금 기록이 있다.';
e6.type = 'chat';
e6.investigationResults = {
  request_original: 'A가 투자방에 2,000만원을 송금한 내역과 카톡 대화 기록이다.',
  check_metadata: '송금 시점은 5주 전이며, 친구 박미라가 보내준 링크를 통해 가입했다.',
  restore_context: '투자방은 사기였으며, 4주 전에 전액 손실이 확정되었다.'
};
e6.subjectParty = 'a';
e6.proves = ['h-d3'];
e6.investigationStages = [
  { stage: 0, revealKey: 'request_original', question: { text: '이 송금 기록은 본인이 보낸 것 맞습니까?', attackVector: 'authenticity' } },
  { stage: 1, revealKey: 'check_metadata', question: { text: '이 투자방에 어떻게 가입하게 되었습니까?', attackVector: 'context' } },
  { stage: 2, revealKey: 'restore_context', question: { text: '이 2,000만원은 현재 어디에 있습니까?', attackVector: 'responsibility' } }
];
e6.partyContext = {
  a: { questionAngle: '이 송금 기록에 대해 설명해 주십시오.', implication: '투자 사기 피해 경위가 드러난다.' },
  b: { questionAngle: '이 기록을 처음 보십니까? 아내가 이런 일을 한 것을 알고 있었습니까?', implication: 'B도 모르던 A의 비밀 행동이다.' }
};
e6.meta.name = '투자방 카톡 기록';
e6.meta.type = 'chat';
e6.meta.viewerType = 'chat';
if (e6.viewerData && e6.viewerData.meta) {
  e6.viewerData.meta.name = '투자방 카톡 기록';
  e6.viewerData.meta.type = 'chat';
  e6.viewerData.meta.viewerType = 'chat';
}
e6.v3DepthPlan = [
  { id: 'stub', label: 'Stub', summary: '카톡 기록 존재만 보임' },
  { id: 'excerpt', label: 'Excerpt', summary: '2,000만원 송금 내역 보임' },
  { id: 'original', label: 'Original', summary: '투자방 대화 + 송금 내역 전체' },
  { id: 'context', label: 'Context', summary: '박미라 링크 전달 경위' },
  { id: 'established', label: 'Established', summary: '투자 사기 전액 손실 확인' }
];

// e-7
const e7 = data.evidence.find(e => e.id === 'e-7');
e7.name = '공동 적금 해지 서류';
e7.surfaceName = '공동 적금 해지 서류';
e7.description = '위임장 + 해지 기록. A의 위임장 조작 증거.';
e7.surfaceDescription = '공동 적금 해지 서류가 존재한다.';
e7.type = 'contract';
e7.investigationResults = {
  request_original: '위임장과 공동 적금 해지 기록이다. 해지 금액은 2,000만원.',
  check_metadata: '위임장의 서명이 B 본인 것이 아닌 것으로 의심된다. A가 대필한 흔적이 있다.',
  restore_context: 'A가 위임장을 조작하여 B 동의 없이 공동 적금을 해지한 범죄 행위의 증거이다.'
};
e7.subjectParty = 'a';
e7.proves = ['h-d3', 'h-d4'];
e7.investigationStages = [
  { stage: 0, revealKey: 'request_original', question: { text: '이 해지 서류에 있는 서명은 누구 것입니까?', attackVector: 'authenticity' } },
  { stage: 1, revealKey: 'check_metadata', question: { text: '이 위임장의 서명이 본인 것이 아니라면 누가 쓴 것입니까?', attackVector: 'context' } },
  { stage: 2, revealKey: 'restore_context', question: { text: '위임장 조작은 범죄입니다. 이에 대해 어떻게 생각하십니까?', attackVector: 'responsibility' } }
];
e7.partyContext = {
  a: { questionAngle: '이 위임장의 서명에 대해 설명해 주십시오.', implication: '위임장 조작 범죄 사실이 드러난다.' },
  b: { questionAngle: '이 서류를 보신 적이 있습니까? 해지에 동의한 적이 있습니까?', implication: 'B 동의 없는 해지가 확인된다.' }
};
e7.meta.name = '공동 적금 해지 서류';
e7.meta.type = 'contract';
e7.meta.viewerType = 'contract';
if (e7.viewerData && e7.viewerData.meta) {
  e7.viewerData.meta.name = '공동 적금 해지 서류';
  e7.viewerData.meta.type = 'contract';
  e7.viewerData.meta.viewerType = 'contract';
}
e7.v3DepthPlan = [
  { id: 'stub', label: 'Stub', summary: '해지 서류 존재만 보임' },
  { id: 'excerpt', label: 'Excerpt', summary: '위임장 + 2,000만원 해지 기록' },
  { id: 'original', label: 'Original', summary: '서명 대필 흔적 확인' },
  { id: 'context', label: 'Context', summary: '위임장 조작 범죄 증거' },
  { id: 'established', label: 'Established', summary: 'A의 위임장 조작으로 확인' }
];

// 5. Update partyA sensitive points
data.duo.partyA.sensitivePoints = [
  '오피스텔 방문과 새벽 전화는 딴살림 흔적인가',
  '위임장 조작으로 공동 적금 2,000만원을 해지한 것은 범죄인가',
  '누가 먼저 숨기고 움직였는가'
];

// 6. Update partyB sensitive points
data.duo.partyB.sensitivePoints = [
  '오피스텔 방문과 새벽 전화는 딴살림 흔적인가',
  '비자금에서 3,000만원을 현금으로 형에게 전달한 것은 배우자 동의 없는 독단인가',
  '누가 먼저 숨기고 움직였는가'
];

// 7. Update A's fear
data.duo.partyA.fear = '위임장 조작이 범죄로 확정되는 것을 가장 두려워한다.';

// 8. Update B's fear
data.duo.partyB.fear = '형 이야기를 꺼내면 시댁 갈등으로 이혼까지 갈 것이라는 공포.';

// 9. Update context description
data.context.description = '남편 차에서 발견된 영수증 5장 묶음: 편의점 컵라면, 올리브영 머리끈/틴트/헤어롤, 서점 중학교 참고서. 매일 퇴근 뒤 오피스텔에 머무는 남편. 새벽의 통화. 아내는 남편의 딴살림을 확신한다.';

// 10. Update triggerAmplifier
data.context.triggerAmplifier = '초반에는 영수증(머리끈/틴트), 오피스텔 GPS, 새벽 통화가 한 방향으로만 겹쳐 외도처럼 보인다. 그러나 참고서(중2용)와 형 문자가 열리면 그 패턴은 조카 돌봄으로 재맥락화되고, 비자금 3,000만원 현금 출금과 위임장 조작 2,000만원 해지가 연달아 드러나면서 사건의 중심은 외도가 아니라 서로 말하지 못한 가족 공포와 비밀 자금 이동 순서로 뒤집힌다.';

// 11. Update relationshipLedger entries
data.duo.relationshipLedger[0].description = '영수증(머리끈/틴트), 오피스텔 GPS, 새벽 통화가 겹치며 d-1은 외도 의심 프레임으로 굳어졌다.';
data.duo.relationshipLedger[2].description = 'B는 비자금에서 3,000만원을 형에게 현금 전달했고, A는 위임장을 조작해 2,000만원을 해지한 뒤 투자방에 넣었다가 잃었다.';

// 12. Update socialGraph - w-1 (오피스텔 경비)
data.duo.socialGraph[0] = {
  id: 'w-1',
  slot: 'acquaintance_1',
  name: '오피스텔 경비',
  relationTo: 'neutral',
  knowledgeScope: '1주일에 2~3번 방문하는 차량을 기억한다. 정확한 호수는 모르지만 그 층에 여자 혼자 사는 집은 없는 것으로 안다.',
  witnessedDirectly: true,
  bias: 'neutral',
  distortionRisk: 'accurate',
  surfaceKnowledge: '오피스텔 출입 빈도와 해당 층 거주 현황을 아는 제3자 증인이다.',
  relatedDisputeIds: ['d-1'],
  witnessProfile: {
    age: 58,
    occupation: '경비원',
    relationToA: '모르는 사이다.',
    relationToB: '차량으로만 안면이 있다.',
    sentimentToA: 0,
    sentimentToB: 0,
    speechStyle: '사실 위주로 간결하게 말하며 개인적 의견은 삼간다.',
    addressJudge: '재판관님',
    addressA: '이쪽 분',
    addressB: '그 차 주인분',
    hiddenAgenda: '없음.'
  }
};

// w-2 (은행 직원)
data.duo.socialGraph[1] = {
  id: 'w-2',
  slot: 'acquaintance_2',
  name: '은행 직원',
  relationTo: 'neutral',
  knowledgeScope: '위임장으로 적금 해지한 건이 있었다. 절차상 이상한 점이 있었지만 처리됐다.',
  witnessedDirectly: true,
  bias: 'neutral',
  distortionRisk: 'accurate',
  surfaceKnowledge: 'A의 위임장 조작 힌트를 제공하는 제3자 증인이다.',
  relatedDisputeIds: ['h-d3', 'h-d4'],
  witnessProfile: {
    age: 32,
    occupation: '은행 직원',
    relationToA: '고객으로만 안다.',
    relationToB: '모르는 사이다.',
    sentimentToA: 0,
    sentimentToB: 0,
    speechStyle: '업무적으로 정확하게 말하며 개인 정보는 조심스럽게 다룬다.',
    addressJudge: '재판관님',
    addressA: '고객님',
    addressB: '명의자분',
    hiddenAgenda: '절차상 확인이 미흡했던 본인 책임이 불거질까 봐 조심한다.'
  }
};

// w-3 (박미라)
data.duo.socialGraph[2] = {
  id: 'w-3',
  slot: 'acquaintance_3',
  name: '박미라',
  relationTo: 'a',
  knowledgeScope: "지연 씨가 '남편이 바람이면 내 돈부터 지키겠다'고 했다. 내가 투자방 링크를 보냈다.",
  witnessedDirectly: true,
  bias: 'pro_a',
  distortionRisk: 'strategic',
  surfaceKnowledge: 'A의 투자 사기 경위와 링크 전달 사실을 아는 지인 증인이다.',
  relatedDisputeIds: ['h-d3', 'h-d4'],
  witnessProfile: {
    age: 37,
    occupation: '카페 운영',
    relationToA: '동네에서 오래 본 지인이다.',
    relationToB: '안면만 있는 사이다.',
    sentimentToA: 40,
    sentimentToB: 0,
    speechStyle: '과장은 하지 않지만 누가 먼저 무슨 말을 했는지는 또렷하게 기억한다.',
    addressJudge: '재판관님',
    addressA: '지연 씨',
    addressB: '준호 씨',
    hiddenAgenda: '자신이 링크를 보낸 책임이 불거질까 봐 표현을 조심한다.'
  }
};

// Write
fs.writeFileSync('d:/ProjectWS/src/data/cases/generated/spouse-v4-01.json', JSON.stringify(data, null, 2), 'utf8');
console.log('Done. File written.');
