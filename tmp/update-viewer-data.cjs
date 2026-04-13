const fs = require('fs');
const path = './src/data/cases/generated/spouse-01.json';
const data = JSON.parse(fs.readFileSync(path, 'utf-8'));

// e-1: 영수증 묶음 (5장) — bank viewer (receipt list)
data.evidence[0].viewerData = {
  meta: data.evidence[0].viewerData.meta,
  bank: [
    { date: '2026.02.18', desc: 'CU 편의점 (컵라면 2, 삼각김밥 1)', amount: '-5,400원', balance: '', suspicious: false },
    { date: '2026.02.18', desc: '교보문고 — 중학교 2학년 수학 참고서', amount: '-18,000원', balance: '', suspicious: true },
    { date: '2026.02.20', desc: '올리브영 — 여성용 스타킹, 핸드크림', amount: '-12,800원', balance: '', suspicious: true },
    { date: '2026.02.22', desc: '이마트 (식재료, 반찬거리)', amount: '-34,200원', balance: '', suspicious: false },
    { date: '2026.02.23', desc: '세븐일레븐 (음료수, 과자류)', amount: '-8,900원', balance: '', suspicious: false },
  ]
};

// e-2: 블랙박스 GPS / 네비 즐겨찾기 — device viewer
data.evidence[1].viewerData = {
  meta: data.evidence[1].viewerData.meta,
  device: {
    ownerName: '이준호',
    sections: [
      {
        title: '네비 즐겨찾기', id: 'favorites', items: [
          { text: '\u2605 집 \u2014 서울시 마포구 \u25CB\u25CB아파트', suspicious: false },
          { text: '\u2605 회사 \u2014 서울시 강서구 \u25CB\u25CB전자', suspicious: false },
          { text: '\u2605 즐겨찾기3 \u2014 서울시 관악구 \u25CB\u25CB오피스텔 302호', suspicious: true },
        ]
      },
      {
        title: 'GPS 이동기록 (최근 30일)', id: 'gps_log', items: [
          { text: '02.05 (수) 19:42 \u2192 관악구 오피스텔 도착 / 22:15 출발', suspicious: true },
          { text: '02.07 (금) 18:55 \u2192 관악구 오피스텔 도착 / 21:30 출발', suspicious: true },
          { text: '02.10 (월) 19:10 \u2192 관악구 오피스텔 도착 / 22:05 출발', suspicious: true },
          { text: '02.12 (수) 19:30 \u2192 관악구 오피스텔 도착 / 23:10 출발', suspicious: true },
          { text: '02.14 (금) 18:40 \u2192 관악구 오피스텔 도착 / 21:50 출발', suspicious: true },
          { text: '02.17 (월) 19:05 \u2192 관악구 오피스텔 도착 / 22:20 출발', suspicious: true },
          { text: '02.19 (수) 19:20 \u2192 관악구 오피스텔 도착 / 22:40 출발', suspicious: true },
          { text: '... 이하 유사 패턴 반복 (주 3~4회)', suspicious: false },
        ]
      },
      {
        title: '블랙박스 상시녹화', id: 'dashcam', items: [
          { text: '02.12 19:28 \u2014 오피스텔 지하주차장 진입', suspicious: true },
          { text: '02.12 23:08 \u2014 오피스텔 지하주차장 출차', suspicious: false },
          { text: '02.14 18:38 \u2014 동일 주차장 진입', suspicious: true },
        ]
      }
    ]
  }
};

// e-3: 통화기록 — log viewer
data.evidence[2].viewerData = {
  meta: data.evidence[2].viewerData.meta,
  log: {
    rows: [
      { date: '02.05 00:12', type: 'out', typeLabel: '발신', target: '010-****-3847', duration: '4분 22초', suspicious: true },
      { date: '02.07 23:48', type: 'in', typeLabel: '수신', target: '010-****-3847', duration: '6분 08초', suspicious: true },
      { date: '02.10 12:15', type: 'out', typeLabel: '발신', target: '010-****-3847', duration: '1분 30초', suspicious: false },
      { date: '02.10 00:35', type: 'out', typeLabel: '발신', target: '010-****-3847', duration: '8분 15초', suspicious: true },
      { date: '02.12 13:20', type: 'out', typeLabel: '발신', target: '010-****-3847', duration: '2분 05초', suspicious: false },
      { date: '02.12 01:10', type: 'in', typeLabel: '수신', target: '010-****-3847', duration: '11분 42초', suspicious: true },
      { date: '02.14 23:55', type: 'out', typeLabel: '발신', target: '010-****-3847', duration: '7분 33초', suspicious: true },
      { date: '02.17 12:40', type: 'out', typeLabel: '발신', target: '010-****-3847', duration: '1분 15초', suspicious: false },
      { date: '02.19 00:22', type: 'out', typeLabel: '발신', target: '010-****-3847', duration: '9분 50초', suspicious: true },
      { date: '02.20 14:05', type: 'in', typeLabel: '수신', target: '\uBC15\uC9C0\uC5F0', duration: '0분 45초', suspicious: false },
      { date: '02.20 14:10', type: 'miss', typeLabel: '\uBD80\uC7AC\uC911', target: '\uBC15\uC9C0\uC5F0', duration: '\u2014', suspicious: false },
      { date: '02.22 01:05', type: 'out', typeLabel: '발신', target: '010-****-3847', duration: '5분 18초', suspicious: true },
    ],
    note: '\uCD5C\uADFC 3\uC8FC\uAC04 010-****-3847 \uBC88\uD638 \uC9D1\uC911 \u2014 \uC0C8\uBCBD \uC2DC\uAC04\uB300 6\uD68C, \uB0AE \uC2DC\uAC04 \uC9E7\uC740 \uD1B5\uD654 4\uD68C. \uD1B5\uD654 \uC0C1\uB300 1\uBA85. \uC544\uB0B4 \uBC15\uC9C0\uC5F0\uACFC\uC758 \uD1B5\uD654\uB294 2\uAC74\uBFD0.'
  }
};

// e-4: 형 문자 스레드 — chat viewer
data.evidence[3].viewerData = {
  meta: data.evidence[3].viewerData.meta,
  chat: {
    header: '\uC774\uC900\uD638 \u2194 010-****-3847 \uBB38\uC790 \uAE30\uB85D \u2014 2026.01~02',
    messages: [
      { side: 'right', sender: '\uC774\uC900\uD638', text: '\uD615, \uC624\uB298\uB3C4 7\uC2DC\uCDA4 \uAC08\uAC8C' },
      { side: 'left', sender: '\uD615', text: '\uACE0\uB9C8\uC6CC. \uAC00\uC740\uC774 \uD559\uC6D0 \uC219\uC81C \uC880 \uBD10\uC918' },
      { side: 'right', sender: '\uC774\uC900\uD638', text: '\uCC38\uACE0\uC11C \uC0AC\uAC08\uAE4C? \uC218\uD559 \uC5B4\uB514\uAE4C\uC9C0 \uD588\uC5B4?' },
      { side: 'left', sender: '\uD615', text: '2\uD559\uAE30 \uD568\uC218 \uB4E4\uC5B4\uAC14\uB300. \uBD80\uD0C1\uD55C\uB2E4' },
      { side: 'right', sender: '\uC774\uC900\uD638', text: '\uC54C\uACA0\uC5B4. \uBC25\uC740?' },
      { side: 'left', sender: '\uD615', text: '\uB0C9\uC7A5\uACE0\uC5D0 \uC788\uB294 \uAC78\uB85C \uD574\uC918. \uBBF8\uC548\uD558\uB2E4' },
      { type: 'read', text: '\uC774\uC900\uD638 \u2014 \uC77D\uC74C' },
      { side: 'left', sender: '\uD615', text: '\uC624\uB298 \uD63C\uC790 \uC788\uC73C\uB2C8 \uBC25 \uC880 \uBD80\uD0C1' },
      { side: 'right', sender: '\uC774\uC900\uD638', text: '\uAC00\uC740\uC774 \uAC10\uAE30 \uAD1C\uCC2E\uC544?' },
      { side: 'left', sender: '\uD615', text: '\uC880 \uB098\uC544\uC84C\uC5B4. \uC2A4\uD0C0\uD0B9 \uD558\uB098\uB9CC \uC0AC\uB2E4 \uC918, \uD559\uAD50\uC5D0 \uC2E0\uACE0 \uAC08 \uAC70\uB798' },
      { side: 'right', sender: '\uC774\uC900\uD638', text: '\uC54C\uACA0\uC5B4 \uC62C\uB9AC\uBE0C\uC601 \uB4E4\uB97C\uAC8C' },
      { side: 'left', sender: '\uD615', text: '\uC9C0\uC5F0\uC774\uD55C\uD14C\uB294 \uC544\uC9C1 \uB9D0\uD558\uC9C0 \uB9C8. \uB0B4 \uC0AC\uC815 \uC54C\uB824\uC9C0\uBA74...' },
      { side: 'right', sender: '\uC774\uC900\uD638', text: '\uC54C\uC544. \uAC71\uC815 \uB9C8' },
    ]
  }
};

// e-5: 이준호의 계좌 출금 내역 — bank viewer
data.evidence[4].viewerData = {
  meta: data.evidence[4].viewerData.meta,
  bank: [
    { date: '2025.10.15', desc: '\uAE09\uC5EC \uC785\uAE08', amount: '+310\uB9CC\uC6D0', balance: '4,820\uB9CC', suspicious: false },
    { date: '2025.10.20', desc: 'ATM \uD604\uAE08\uC778\uCD9C (\uAD00\uC545\uC9C0\uC810)', amount: '-500\uB9CC\uC6D0', balance: '4,320\uB9CC', suspicious: true },
    { date: '2025.11.15', desc: '\uAE09\uC5EC \uC785\uAE08', amount: '+310\uB9CC\uC6D0', balance: '4,630\uB9CC', suspicious: false },
    { date: '2025.11.22', desc: 'ATM \uD604\uAE08\uC778\uCD9C (\uAD00\uC545\uC9C0\uC810)', amount: '-800\uB9CC\uC6D0', balance: '3,830\uB9CC', suspicious: true },
    { date: '2025.12.15', desc: '\uAE09\uC5EC \uC785\uAE08', amount: '+310\uB9CC\uC6D0', balance: '4,140\uB9CC', suspicious: false },
    { date: '2025.12.28', desc: 'ATM \uD604\uAE08\uC778\uCD9C (\uAD00\uC545\uC9C0\uC810)', amount: '-700\uB9CC\uC6D0', balance: '3,440\uB9CC', suspicious: true },
    { date: '2026.01.15', desc: '\uAE09\uC5EC \uC785\uAE08', amount: '+310\uB9CC\uC6D0', balance: '3,750\uB9CC', suspicious: false },
    { date: '2026.01.25', desc: 'ATM \uD604\uAE08\uC778\uCD9C (\uAD00\uC545\uC9C0\uC810)', amount: '-1,000\uB9CC\uC6D0', balance: '2,750\uB9CC', suspicious: true },
    { date: '2026.02.03', desc: '\uC774\uC790 \uC785\uAE08', amount: '+2,100\uC6D0', balance: '2,750\uB9CC', suspicious: false },
  ]
};

// e-6: 투자방 카톡 + 송금 기록 — chat viewer
data.evidence[5].viewerData = {
  meta: data.evidence[5].viewerData.meta,
  chat: {
    header: '\uCE74\uCE74\uC624\uD1A1 \uC624\uD508\uCC44\uD305 "VIP \uD22C\uC790\uD074\uB7FD" \u2014 2026.01~02',
    messages: [
      { side: 'left', sender: '\uC6B4\uC601\uC790(\uC81C\uC774\uC2A8)', text: '\uC774\uBC88 \uB2EC \uC218\uC775\uB960 180% \uB2EC\uC131. \uC9C0\uAE08 \uB4E4\uC5B4\uC624\uC2DC\uBA74 \uC6D0\uAE08 \uBCF4\uC7A5 \uC774\uBCA4\uD2B8 \uC801\uC6A9\uB429\uB2C8\uB2E4' },
      { side: 'left', sender: '\uAE40** \uB2D8', text: '\uC800 \uC9C0\uB09C\uB2EC 500 \uB123\uC5B4\uC11C 1,400 \uB410\uC5B4\uC694 \u3137\u3137' },
      { side: 'left', sender: '\uC774** \uB2D8', text: '\uC9C4\uC9DC \uB300\uBC15... \uB098\uB3C4 \uCD94\uAC00 \uC785\uAE08\uD568' },
      { side: 'right', sender: '\uBC15\uC9C0\uC5F0', text: '2,000\uB9CC\uC6D0 \uC785\uAE08\uD558\uB824\uBA74 \uC5B4\uB514\uB85C \uBCF4\uB0B4\uBA74 \uB418\uB098\uC694?' },
      { side: 'left', sender: '\uC6B4\uC601\uC790(\uC81C\uC774\uC2A8)', text: '\uC544\uB798 \uACC4\uC88C\uB85C \uC1A1\uAE08\uD574 \uC8FC\uC138\uC694. 24\uC2DC\uAC04 \uB0B4 \uD22C\uC790\uAE08 \uBC18\uC601\uB429\uB2C8\uB2E4' },
      { type: 'deleted', text: '\uC0AD\uC81C\uB41C \uBA54\uC2DC\uC9C0 1\uAC74 (\uACC4\uC88C\uBC88\uD638 \uCD94\uC815)' },
      { side: 'right', sender: '\uBC15\uC9C0\uC5F0', text: '\uC1A1\uAE08 \uC644\uB8CC\uD588\uC2B5\uB2C8\uB2E4. \uD655\uC778 \uBD80\uD0C1\uB4DC\uB824\uC694' },
      { side: 'left', sender: '\uC6B4\uC601\uC790(\uC81C\uC774\uC2A8)', text: '\uD655\uC778\uB410\uC2B5\uB2C8\uB2E4. 3\uC77C \uB0B4 \uCCAB \uC218\uC775\uAE08 \uC785\uAE08 \uC608\uC815' },
      { type: 'read', text: '\uBC15\uC9C0\uC5F0 \u2014 \uC77D\uC74C' },
      { side: 'right', sender: '\uBC15\uC9C0\uC5F0', text: '3\uC77C \uC9C0\uB0AC\uB294\uB370 \uC544\uC9C1 \uC785\uAE08\uC774 \uC548 \uB410\uC5B4\uC694' },
      { side: 'right', sender: '\uBC15\uC9C0\uC5F0', text: '\uC81C\uC774\uC2A8\uB2D8? \uB2F5 \uC880 \uD574\uC8FC\uC138\uC694' },
      { side: 'right', sender: '\uBC15\uC9C0\uC5F0', text: '\uC65C \uC77D\uC529\uC774\uC5D0\uC694??' },
      { type: 'deleted', text: '\uC6B4\uC601\uC790\uAC00 \uCC44\uD305\uBC29\uC744 \uB098\uAC14\uC2B5\uB2C8\uB2E4' },
    ]
  }
};

// e-7: 공동 적금 해지 서류 — contract viewer
data.evidence[6].viewerData = {
  meta: data.evidence[6].viewerData.meta,
  contract: {
    title: '\uC815 \uAE30 \uC801 \uAE08   \uD574 \uC9C0 \uC2E0 \uCCAD \uC11C',
    subtitle: '\u25CB\u25CB\uC740\uD589 \uB9C8\uD3EC\uC9C0\uC810 \u2014 2026\uB144 1\uC6D4 18\uC77C',
    rows: [
      { date: '\uACC4\uC88C', content: '\uC815\uAE30\uC801\uAE08 (\uACF5\uB3D9\uBA85\uC758: \uBC15\uC9C0\uC5F0, \uC774\uC900\uD638)', amount: '', missing: false },
      { date: '\uC794\uC561', content: '\uC801\uAE08 \uC6D0\uB9AC\uAE08 \uD569\uACC4', amount: '2,012\uB9CC\uC6D0', missing: false },
      { date: '\uD574\uC9C0', content: '\uC911\uB3C4\uD574\uC9C0 (\uB9CC\uAE30 \uC804 \uD574\uC9C0)', amount: '-2,012\uB9CC\uC6D0', missing: false },
      { date: '\uC218\uB839', content: '\uBC15\uC9C0\uC5F0 \uAC1C\uC778\uACC4\uC88C \uC785\uAE08', amount: '+2,012\uB9CC\uC6D0', missing: false },
      { date: '', content: '', amount: '', missing: false },
      { date: '\uC704\uC784', content: '\uC774\uC900\uD638 \uC704\uC784\uC7A5 \uCCA8\uBD80 \u2014 \uC790\uD544\uC11C\uBA85', amount: '', missing: true },
      { date: '\uBE44\uACE0', content: '\uC704\uC784\uC7A5 \uC11C\uBA85 \uD544\uCCB4 \u2014 \uBCF8\uC778 \uC11C\uBA85\uACFC \uBD88\uC77C\uCE58 \uC758\uC2EC', amount: '', missing: true },
      { date: '', content: '\uC774\uC900\uD638 \uBCF8\uC778 \uBC29\uBB38 \uAE30\uB85D \uC5C6\uC74C (\uBCF8\uC778\uD655\uC778 \uBBF8\uC2E4\uC2DC)', amount: '', missing: true },
    ],
    signature: '\uC2E0\uCCAD\uC778: \uBC15\uC9C0\uC5F0 (\uC778) \u2014\u2014\u2014 \uC704\uC784\uC778: \uC774\uC900\uD638 (\uB300\uB9AC\uC11C\uBA85 \uC758\uC2EC) \u2014\u2014\u2014 \uB2F4\uB2F9: \u25CB\u25CB\uC740\uD589 \uB9C8\uD3EC\uC9C0\uC810'
  }
};

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
console.log('spouse-01.json viewerData updated for all 7 evidence items');
