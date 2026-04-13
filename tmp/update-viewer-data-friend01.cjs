const fs = require('fs');
const path = './src/data/cases/generated/friend-01.json';
const data = JSON.parse(fs.readFileSync(path, 'utf-8'));

// e-1: B->예비신랑 연락 기록 (type=log) — 9일간 전화6번 문자11번
data.evidence[0].viewerData = {
  meta: data.evidence[0].viewerData.meta,
  log: {
    rows: [
      { date: '03.01 19:22', type: 'out', typeLabel: '발신', target: '김태윤 (예비신랑)', duration: '0분 12초 (끊김)', suspicious: true },
      { date: '03.01 19:35', type: 'out', typeLabel: '문자', target: '김태윤', duration: '"태윤 씨, 수민입니다. 잠깐만 통화할 수 있을까요"', suspicious: false },
      { date: '03.02 10:15', type: 'out', typeLabel: '문자', target: '김태윤', duration: '"중요한 얘기가 있어요. 다은이 아버지 건으로요"', suspicious: true },
      { date: '03.02 18:40', type: 'out', typeLabel: '발신', target: '김태윤', duration: '부재중', suspicious: false },
      { date: '03.03 09:08', type: 'out', typeLabel: '문자', target: '김태윤', duration: '"전화 좀 받아주세요. 결혼 전에 꼭 아셔야 할 게 있어요"', suspicious: true },
      { date: '03.04 12:30', type: 'out', typeLabel: '발신', target: '김태윤', duration: '0분 08초 (끊김)', suspicious: false },
      { date: '03.04 12:45', type: 'out', typeLabel: '문자', target: '김태윤', duration: '"피하지 마세요. 다은이한테 못 하는 말이라 이러는 거예요"', suspicious: true },
      { date: '03.05 21:10', type: 'out', typeLabel: '문자', target: '김태윤', duration: '"한 번만 만나서 얘기하면 다 이해할 거예요"', suspicious: true },
      { date: '03.06 08:50', type: 'out', typeLabel: '발신', target: '김태윤', duration: '1분 42초', suspicious: true },
      { date: '03.07 14:20', type: 'out', typeLabel: '문자', target: '김태윤', duration: '"저도 이러고 싶지 않아요. 제발 한 번만"', suspicious: false },
      { date: '03.08 17:30', type: 'out', typeLabel: '발신', target: '김태윤', duration: '부재중', suspicious: false },
      { date: '03.08 17:45', type: 'out', typeLabel: '문자', target: '김태윤', duration: '"마지막으로 부탁드려요. 예전에 같은 일이 있었거든요"', suspicious: true },
      { date: '03.09 11:00', type: 'out', typeLabel: '발신', target: '김태윤', duration: '부재중 (차단 추정)', suspicious: true },
      { date: '03.09 11:15', type: 'out', typeLabel: '문자', target: '김태윤', duration: '"차단하셨나 봐요. 다은이 때문에 그런 거 이해해요. 미안해요"', suspicious: false },
    ],
    note: '9일간 발신 전화 6회 (연결 1회), 문자 11회. 답장 0건. 최종일 차단 추정. 문자 내용상 \u201C다은이 아버지\u201D \u201C예전에 같은 일\u201D 등 경고성 언급이 반복됨.'
  }
};

// e-2: 공통 친구 단톡방 캡처 (type=chat)
data.evidence[1].viewerData = {
  meta: data.evidence[1].viewerData.meta,
  chat: {
    header: '카카오톡 단체채팅 "우리반 여자들" \u2014 2026.03.06',
    messages: [
      { side: 'right', sender: '송다은', text: '얘들아 나 진짜 미치겠어' },
      { side: 'right', sender: '송다은', text: '수민이가 또 내 남자한테 연락하고 있어' },
      { side: 'left', sender: '유진', text: '뭐?? 진짜??' },
      { side: 'right', sender: '송다은', text: '태윤이 전화기 보니까 수민이가 전화 문자 엄청 했더라고' },
      { side: 'left', sender: '하은', text: '아 걔 진짜 또?' },
      { side: 'right', sender: '송다은', text: '예전에 내 소개팅남한테도 그랬잖아. 그때도 정리 안 됐었는데' },
      { side: 'left', sender: '유진', text: '수민이는 왜 맨날 남의 남자한테 집착하는 건지' },
      { side: 'left', sender: '소연', text: '차단하게 해. 결혼 준비하는데 방해만 되지' },
      { side: 'right', sender: '송다은', text: '벌써 차단함. 근데 진짜 열받아서 여기 쓴다' },
      { side: 'left', sender: '하은', text: '그냥 걔 완전 손절해. 예전 일이랑 똑같은 패턴이잖아' },
      { side: 'left', sender: '소연', text: '맞아 걔는 진짜 변하질 않네' },
    ]
  }
};

// e-3: 과거 손절 직전 카톡 (type=chat)
data.evidence[2].viewerData = {
  meta: data.evidence[2].viewerData.meta,
  chat: {
    header: '송다은 \u2194 최수민 1:1 카톡 \u2014 2024.08 (과거 기록)',
    messages: [
      { side: 'right', sender: '송다은', text: '수민아, 아빠가 너한테 돈 얘기를 했다는 게 무슨 뜻이야?' },
      { side: 'left', sender: '최수민', text: '...' },
      { side: 'right', sender: '송다은', text: '뭘 숨기는 건데? 똑바로 말해' },
      { side: 'left', sender: '최수민', text: '돈 문제는 내가 알아서 정리할게' },
      { side: 'right', sender: '송다은', text: '뭘 정리해? 아빠가 뭘 했는데?' },
      { side: 'left', sender: '최수민', text: '그냥... 나한테 급하다고 빌린 거야' },
      { side: 'right', sender: '송다은', text: '넌 돈만 엮이면 사람이 달라진다' },
      { side: 'left', sender: '최수민', text: '그게 아니라...' },
      { side: 'right', sender: '송다은', text: '됐어. 더 이상 무슨 말을 해도 믿기 힘들어' },
      { type: 'read', text: '최수민 \u2014 읽음' },
      { side: 'left', sender: '최수민', text: '미안해 다은아. 진짜 너한테 말하고 싶었는데...' },
      { type: 'read', text: '송다은 \u2014 읽음 (답장 없음)' },
    ]
  }
};

// e-4: 예비신랑의 선넘는 메시지 + B의 거절 (type=chat)
data.evidence[3].viewerData = {
  meta: data.evidence[3].viewerData.meta,
  chat: {
    header: '김태윤(예비신랑) \u2194 최수민 카톡 \u2014 2026.02',
    messages: [
      { side: 'left', sender: '김태윤', text: '수민 씨 인스타 잘 봤어요. 필라테스 강사시구나' },
      { side: 'right', sender: '최수민', text: '네 감사합니다. 다은이 친구분이시죠?' },
      { side: 'left', sender: '김태윤', text: '다은이 몰래 커피 한 번 보자. 물어볼 게 있어서' },
      { side: 'right', sender: '최수민', text: '무슨 얘긴지 여기서 하시면 될 것 같은데요' },
      { side: 'left', sender: '김태윤', text: '너 같은 스타일이 원래 내 이상형이야 ㅋㅋ 농담이고' },
      { side: 'right', sender: '최수민', text: '태윤 씨, 다은이 예비신랑이잖아요. 이러지 마세요' },
      { side: 'left', sender: '김태윤', text: '너무 딱딱하네. 그냥 가볍게 얘기하자고' },
      { side: 'right', sender: '최수민', text: '친구 남자친구한테 이런 말 듣고 싶지 않아요. 여기까지 할게요' },
      { type: 'read', text: '김태윤 \u2014 읽음 (답장 없음)' },
    ]
  }
};

// e-5: A 아버지와 예비신랑의 문자 (type=chat)
data.evidence[4].viewerData = {
  meta: data.evidence[4].viewerData.meta,
  chat: {
    header: '송 아버지 \u2194 김태윤(예비신랑) 문자 \u2014 2026.02~03',
    messages: [
      { side: 'left', sender: '송 아버지', text: '태윤아, 결혼 준비 잘 되고 있지?' },
      { side: 'right', sender: '김태윤', text: '네 아버님, 잘 진행 중입니다' },
      { side: 'left', sender: '송 아버지', text: '사위 될 사람한테 부탁하기 좀 그렇지만' },
      { side: 'left', sender: '송 아버지', text: '결혼 전에 잠깐만 도와주면 금방 돌려준다' },
      { side: 'right', sender: '김태윤', text: '네? 무슨 말씀이신지...' },
      { side: 'left', sender: '송 아버지', text: '사위 될 사람이면 이 정도는 믿어야지. 3천만 원만 잠깐' },
      { side: 'left', sender: '송 아버지', text: '2달이면 갚을 수 있어. 사업 자금이 급해서 그래' },
      { side: 'right', sender: '김태윤', text: '좀 생각해볼게요...' },
      { side: 'left', sender: '송 아버지', text: '다은이한테는 아직 말하지 마. 걱정시키기 싫으니까' },
      { type: 'read', text: '김태윤 \u2014 읽음' },
    ]
  }
};

// e-6: 과거 송금 영수증 + 문자 (type=bank)
data.evidence[5].viewerData = {
  meta: data.evidence[5].viewerData.meta,
  bank: [
    { date: '2024.05.12', desc: '\uCD5C\uC218\uBBFC \u2192 \uC1A1\u25CB\u25CB (\uC1A1 \uC544\uBC84\uC9C0) \uC774\uCCB4', amount: '-500\uB9CC\uC6D0', balance: '320\uB9CC', suspicious: true },
    { date: '2024.05.12', desc: '\uBE44\uACE0: "\uAE09\uD55C \uD22C\uC790\uAE08\uC774\uB2C8 \uD55C \uB2EC\uB9CC \uC4F0\uACE0 \uAC11\uACA0\uB2E4"', amount: '', balance: '', suspicious: false },
    { date: '2024.06.15', desc: '\uCD5C\uC218\uBBFC \u2192 \uC1A1\u25CB\u25CB \uC774\uCCB4 (2\uCC28)', amount: '-300\uB9CC\uC6D0', balance: '20\uB9CC', suspicious: true },
    { date: '2024.06.15', desc: '\uBE44\uACE0: "\uC870\uAE08\uB9CC \uB354 \uBD80\uD0C1\uD55C\uB2E4. \uB2E4\uC74C \uB2EC\uC5D0 \uD568\uAED8 \uB3CC\uB824\uC904\uAC8C"', amount: '', balance: '', suspicious: false },
    { date: '2024.07~12', desc: '\uC1A1 \uC544\uBC84\uC9C0 \u2192 \uCD5C\uC218\uBBFC \uC0C1\uD658 \uAE30\uB85D', amount: '\uC5C6\uC74C', balance: '', suspicious: true },
    { date: '2024.08.20', desc: '\uBE44\uACE0: "\uC870\uAE08\uB9CC \uAE30\uB2E4\uB824\uB77C. \uC0AC\uC5C5\uC774 \uC88B\uC544\uC9C0\uBA74 \uBC14\uB85C \uAC11\uB294\uB2E4"', amount: '', balance: '', suspicious: false },
    { date: '2024.10.05', desc: '\uBE44\uACE0: "\uC218\uBBFC\uC544 \uBBF8\uC548\uD558\uB2E4. \uC870\uAE08\uB9CC \uB354. \uB2E4\uC740\uC774\uD55C\uD14C\uB294 \uB9D0\uD558\uC9C0 \uB9C8"', amount: '', balance: '', suspicious: true },
  ]
};

// e-7: 과거-현재 대조표 (type=log) — 타임라인 비교
data.evidence[6].viewerData = {
  meta: data.evidence[6].viewerData.meta,
  log: {
    rows: [
      { date: '2024.05', type: 'out', typeLabel: '\uACFC\uAC70', target: '\uC1A1 \uC544\uBC84\uC9C0 \u2192 B\uC5D0\uAC8C "\uAE09\uD55C \uD22C\uC790\uAE08, \uD55C \uB2EC\uB9CC"', duration: '500\uB9CC\uC6D0', suspicious: true },
      { date: '2026.02', type: 'in', typeLabel: '\uD604\uC7AC', target: '\uC1A1 \uC544\uBC84\uC9C0 \u2192 \uC608\uBE44\uC2E0\uB791\uC5D0\uAC8C "\uC0AC\uC704 \uB420 \uC0AC\uB78C\uC774\uBA74 \uC774 \uC815\uB3C4\uB294"', duration: '3,000\uB9CC\uC6D0 \uC694\uCCAD', suspicious: true },
      { date: '2024.06', type: 'out', typeLabel: '\uACFC\uAC70', target: 'B \uCD94\uAC00 \uC1A1\uAE08 \uC694\uCCAD\uBC1B\uC74C', duration: '300\uB9CC\uC6D0', suspicious: false },
      { date: '2026.03', type: 'in', typeLabel: '\uD604\uC7AC', target: '\uC608\uBE44\uC2E0\uB791 "\uC880 \uC0DD\uAC01\uD574\uBCFC\uAC8C\uC694" \uB2F5\uBCC0', duration: '\uBBF8\uC815', suspicious: false },
      { date: '2024.08', type: 'miss', typeLabel: '\uACFC\uAC70', target: 'B, \uC1A1\uB2E4\uC740\uC5D0\uAC8C \uB9D0 \uBABB \uD558\uACE0 \uC190\uC808\uB2F9\uD568', duration: '\u2014', suspicious: true },
      { date: '2026.03', type: 'miss', typeLabel: '\uD604\uC7AC', target: 'B, \uC608\uBE44\uC2E0\uB791\uC5D0\uAC8C \uACBD\uACE0 \uC2DC\uB3C4 \u2192 \uC9D1\uCC29\uC73C\uB85C \uC624\uD574\uBC1B\uC74C', duration: '\u2014', suspicious: true },
    ],
    note: '\uACFC\uAC70\uC640 \uD604\uC7AC\uC758 \uD328\uD134\uC774 \uAC70\uC758 \uB3D9\uC77C. "\uAE09\uD55C \uB3C8, \uB2E4\uC740\uC774\uD55C\uD14C \uB9D0\uD558\uC9C0 \uB9C8" \u2192 "\uC0AC\uC704 \uB420 \uC0AC\uB78C\uC774\uBA74, \uB2E4\uC740\uC774\uD55C\uD14C \uB9D0\uD558\uC9C0 \uB9C8." B\uB294 \uB450 \uBC88 \uB2E4 \uB9D0\uD558\uC9C0 \uBABB\uD558\uACE0 \uC545\uC5ED\uC744 \uC790\uCC98\uD588\uB2E4.'
  }
};

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
console.log('friend-01.json viewerData updated for all 7 evidence items');
