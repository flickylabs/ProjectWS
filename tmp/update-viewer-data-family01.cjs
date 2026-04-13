const fs = require('fs');
const path = './src/data/cases/generated/family-01.json';
const data = JSON.parse(fs.readFileSync(path, 'utf-8'));

// e-1: 60:40 유서 사본 (type=contract) — 공증된 유서
data.evidence[0].viewerData = {
  meta: {
    name: '60:40 유서 사본',
    type: 'contract',
    viewerType: 'contract',
    trustLevel: 'high',
    trustLabel: '높음',
    source: 'org',
    sourceLabel: '기관 (공증)',
    legality: 'ok',
    legalLabel: '적법',
    stage: 1,
    stageLabel: '초기 공개'
  },
  contract: {
    title: '유   언   장',
    subtitle: '공증사무소 제2026-0183호 \u2014 2025\uB144 11\uC6D4 5\uC77C',
    rows: [
      { date: '\uC720\uC5B8\uC790', content: '\uC724\u25CB\u25CB (\uBAA8\uCE5C, 1948\uB144\uC0DD)', amount: '', missing: false },
      { date: '\uC0C1\uC18D\uC778 1', content: '\uC724\uC815\uD6C4 (차남) \u2014 \uC804\uCCB4 \uC7AC\uC0B0\uC758 60%', amount: '60%', missing: false },
      { date: '\uC0C1\uC18D\uC778 2', content: '\uC724\uD0DC\uC131 (장남) \u2014 \uC804\uCCB4 \uC7AC\uC0B0\uC758 40%', amount: '40%', missing: false },
      { date: '', content: '', amount: '', missing: false },
      { date: '\uBD80\uB3D9\uC0B0', content: '\uB9C8\uD3EC\uAD6C \u25CB\u25CB\uB85C 24 \uC544\uD30C\uD2B8 (\uC2DC\uAC00 4\uC5B5 \uCD94\uC815)', amount: '4\uC5B5', missing: false },
      { date: '\uC608\uAE08', content: '\u25CB\u25CB\uC740\uD589 \uC815\uAE30\uC608\uAE08 + \uBCF4\uD1B5\uC608\uAE08', amount: '1.2\uC5B5', missing: false },
      { date: '\uAE30\uD0C0', content: '\uADC0\uAE08\uC18D\uB958 \uBC0F \uB3D9\uC0B0', amount: '\uBBF8\uC0B0\uC815', missing: false },
      { date: '', content: '', amount: '', missing: false },
      { date: '\uACF5\uC99D', content: '\uACF5\uC99D\uC778 \uBC30\u25CB\u25CB \uBC30\uC11D / \uC99D\uC778 2\uBA85 \uC785\uD68C', amount: '', missing: false },
      { date: '\uBE44\uACE0', content: '\u201C\uC815\uD6C4\uAC00 \uB098\uB97C \uB9C8\uC9C0\uB9C9\uAE4C\uC9C0 \uBCF4\uC0B4\uD3C8\uC73C\uB2C8 \uB9C8\uB545\uD558\uB2E4\u201D', amount: '', missing: false },
    ],
    signature: '\uC720\uC5B8\uC790: \uC724\u25CB\u25CB (\uC778) \u2014\u2014\u2014 \uACF5\uC99D\uC778: \uBC30\u25CB\u25CB \u2014\u2014\u2014 \uC99D\uC778: \uAE40\u25CB\u25CB, \uBC15\u25CB\u25CB'
  }
};

// e-2: 요양원 방문기록 (type=log) — 방문 횟수/날짜
data.evidence[1].viewerData = {
  meta: {
    name: '요양원 방문기록',
    type: 'log',
    viewerType: 'log',
    trustLevel: 'high',
    trustLabel: '높음',
    source: 'org',
    sourceLabel: '기관 (요양원)',
    legality: 'ok',
    legalLabel: '적법',
    stage: 1
  },
  log: {
    rows: [
      { date: '09.05', type: 'in', typeLabel: '\uBC29\uBB38', target: '\uC724\uC815\uD6C4', duration: '2\uC2DC\uAC04 10\uBD84', suspicious: false },
      { date: '09.12', type: 'in', typeLabel: '\uBC29\uBB38', target: '\uC724\uC815\uD6C4', duration: '1\uC2DC\uAC04 40\uBD84', suspicious: false },
      { date: '09.20', type: 'in', typeLabel: '\uBC29\uBB38', target: '\uC724\uD0DC\uC131', duration: '45\uBD84', suspicious: false },
      { date: '10.01', type: 'in', typeLabel: '\uBC29\uBB38', target: '\uC724\uC815\uD6C4', duration: '3\uC2DC\uAC04 20\uBD84', suspicious: true },
      { date: '10.08', type: 'in', typeLabel: '\uBC29\uBB38', target: '\uC724\uC815\uD6C4', duration: '2\uC2DC\uAC04', suspicious: true },
      { date: '10.14', type: 'miss', typeLabel: '\uBCC0\uACBD', target: '\uB2F4\uB2F9 \uC694\uC591\uBCF4\uD638\uC0AC \uAD50\uCCB4 (\uAE40\u25CB\u25CB \u2192 \uBC15\u25CB\u25CB)', duration: '\u2014', suspicious: true },
      { date: '10.15', type: 'in', typeLabel: '\uBC29\uBB38', target: '\uC724\uC815\uD6C4', duration: '4\uC2DC\uAC04', suspicious: true },
      { date: '10.18', type: 'in', typeLabel: '\uBC29\uBB38', target: '\uC724\uC815\uD6C4', duration: '2\uC2DC\uAC04 30\uBD84', suspicious: true },
      { date: '10.22', type: 'in', typeLabel: '\uBC29\uBB38', target: '\uC724\uC815\uD6C4 + \uACF5\uC99D\uC778', duration: '1\uC2DC\uAC04', suspicious: true },
      { date: '10.25', type: 'in', typeLabel: '\uBC29\uBB38', target: '\uC724\uC815\uD6C4', duration: '3\uC2DC\uAC04', suspicious: true },
      { date: '11.02', type: 'in', typeLabel: '\uBC29\uBB38', target: '\uC724\uD0DC\uC131', duration: '30\uBD84', suspicious: false },
      { date: '11.05', type: 'in', typeLabel: '\uACF5\uC99D', target: '\uC724\uC815\uD6C4 + \uACF5\uC99D\uC778 + \uC99D\uC778 2\uBA85', duration: '40\uBD84', suspicious: true },
    ],
    note: '10\uC6D4 \uC774\uD6C4 B(\uC724\uC815\uD6C4) \uBC29\uBB38 \uAE09\uC99D (9\uC6D4 2\uD68C \u2192 10\uC6D4 6\uD68C). \uC694\uC591\uBCF4\uD638\uC0AC \uAD50\uCCB4(10.14)\uC640 \uACF5\uC99D(11.05) \uC0AC\uC774 3\uC8FC\uAC04 \uC9D1\uC911 \uBC29\uBB38. A(\uC724\uD0DC\uC131)\uB294 \uAC19\uC740 \uAE30\uAC04 2\uD68C\uBFD0.'
  }
};

// e-3: 전 요양보호사 음성증언 (type=testimony)
data.evidence[2].viewerData = {
  meta: {
    name: '전 요양보호사 증언',
    type: 'testimony',
    viewerType: 'testimony',
    trustLevel: 'mid',
    trustLabel: '보통',
    source: 'third',
    sourceLabel: '제3자',
    legality: 'ok',
    legalLabel: '적법',
    stage: 1
  },
  testimony: {
    witnessName: '\uAE40\u25CB\u25CB',
    witnessDesc: '\uC804 \uB2F4\uB2F9 \uC694\uC591\uBCF4\uD638\uC0AC (2024.03~2025.10.14 \uADFC\uBB34)',
    quote: '\uC815\uD6C4 \uC528\uAC00 \uC5B4\uBA38\uB2D8\uD55C\uD14C \uC885\uC774\uB97C \uC790\uC8FC \uC77D\uC5B4\uB4DC\uB838\uC5B4\uC694. \uB0B4\uC6A9\uC740 \uBABB \uB4E4\uC5C8\uC9C0\uB9CC, \uD615\uB2D8 \uC624\uAE30 \uC804\uC5D0\uB294 \uB054\uB0B4\uC790\uACE0 \uC870\uC2EC\uC2A4\uB7EC\uC6CC\uD558\uC168\uC5B4\uC694. \uC5B4\uBA38\uB2D8\uC774 \uD798\uB4E4\uC5B4\uD558\uC2DC\uBA74 \uADF8\uB9CC\uD558\uC790\uACE0 \uD558\uC168\uACE0, \uC5B4\uBA38\uB2D8\uC774 \uBA3C\uC800 \uB9D0\uC500\uD558\uC2DC\uBA74 \uADF8\uB54C \uB354 \uC5EC\uC92C\uC5B4\uC694. \uADFC\uB370 \uC800\uB294 10\uC6D4\uC5D0 \uAC11\uC790\uAE30 \uAD50\uCCB4\uB410\uC5B4\uC694. \uC774\uC720\uB294 \uC548 \uB4E4\uC5C8\uACE0\uC694.',
    confidence: 'mid',
    confidenceLabel: '\uBCF4\uD1B5',
    bias: 'neutral',
    biasLabel: '\uC911\uB9BD',
    directWitness: true,
    relatedRef: '\uC694\uC591\uBCF4\uD638\uC0AC \uAD50\uCCB4 \uC2DC\uC810 (10.14)  \uACF5\uC99D 3\uC8FC \uC804'
  }
};

// e-4: 공증사무실 스캔 보관본 (type=log) — 두 버전 비교
data.evidence[3].viewerData = {
  meta: {
    name: '공증사무실 스캔본',
    type: 'log',
    viewerType: 'log',
    trustLevel: 'high',
    trustLabel: '높음',
    source: 'org',
    sourceLabel: '기관 (공증)',
    legality: 'ok',
    legalLabel: '적법',
    stage: 2
  },
  log: {
    rows: [
      { date: '11.05 10:12', type: 'in', typeLabel: '\uC2A4\uCE94 1\uCC28', target: '\uC720\uC5B8\uC7A5 \u2014 \uC815\uD6C4 90% / \uD0DC\uC131 10%', duration: '\uC6D0\uBCF8', suspicious: true },
      { date: '11.05 10:38', type: 'out', typeLabel: '\uBC18\uCD9C', target: '\uC724\uC815\uD6C4 \uC528\uAC00 \uC11C\uB958 \uD68C\uC218 \uC694\uCCAD', duration: '\u2014', suspicious: true },
      { date: '11.05 11:05', type: 'in', typeLabel: '\uC2A4\uCE94 2\uCC28', target: '\uC720\uC5B8\uC7A5 \u2014 \uC815\uD6C4 60% / \uD0DC\uC131 40%', duration: '\uBCC0\uACBD\uBCF8', suspicious: true },
      { date: '11.05 11:10', type: 'in', typeLabel: '\uACF5\uC99D', target: '\uCD5C\uC885 \uACF5\uC99D \uCC98\uB9AC (\uBCC0\uACBD\uBCF8 \uAE30\uC900)', duration: '\uD655\uC815', suspicious: false },
      { date: '11.05 11:15', type: 'out', typeLabel: '\uAD50\uBD80', target: '\uC720\uC5B8\uC7A5 \uC0AC\uBCF8 \uC724\uC815\uD6C4 \uC528\uC5D0\uAC8C \uC804\uB2EC', duration: '\u2014', suspicious: false },
    ],
    note: '\uAC19\uC740 \uB0A0 \uAC19\uC740 \uBB38\uC11C\uAC00 \uB450 \uBC88 \uC2A4\uCE94. 1\uCC28: \uC815\uD6C4 90 / \uD0DC\uC131 10. 2\uCC28: \uC815\uD6C4 60 / \uD0DC\uC131 40. \uC0AC\uC774 26\uBD84\uAC04 \uC724\uC815\uD6C4\uAC00 \uC11C\uB958\uB97C \uAC00\uC838\uAC00 \uC218\uC815 \uD6C4 \uB2E4\uC2DC \uC81C\uCD9C. \uC790\uAE30 \uBAB7\uC744 90\uC5D0\uC11C 60\uC73C\uB85C \uC904\uC778 \uC870\uC791.'
  }
};

// e-5: 어머니 서랍에서 나온 원본 유서 (type=contract)
data.evidence[4].viewerData = {
  meta: {
    name: '원본 유서 (90:10)',
    type: 'contract',
    viewerType: 'contract',
    trustLevel: 'high',
    trustLabel: '높음',
    source: 'b',
    sourceLabel: 'B측 (서랍 발견)',
    legality: 'ok',
    legalLabel: '적법',
    stage: 2
  },
  contract: {
    title: '\uC720   \uC5B8   \uC7A5  (\uC6D0\uBCF8)',
    subtitle: '\uC5B4\uBA38\uB2C8 \uC11C\uB78D\uC5D0\uC11C \uBC1C\uACAC \u2014 \uC791\uC131\uC77C 2025\uB144 10\uC6D4 28\uC77C',
    rows: [
      { date: '\uC720\uC5B8\uC790', content: '\uC724\u25CB\u25CB (\uBAA8\uCE5C)', amount: '', missing: false },
      { date: '\uC0C1\uC18D\uC778 1', content: '\uC724\uC815\uD6C4 (차남) \u2014 \uC804\uCCB4 \uC7AC\uC0B0\uC758 90%', amount: '90%', missing: false },
      { date: '\uC0C1\uC18D\uC778 2', content: '\uC724\uD0DC\uC131 (장남) \u2014 \uC804\uCCB4 \uC7AC\uC0B0\uC758 10%', amount: '10%', missing: false },
      { date: '', content: '', amount: '', missing: false },
      { date: '\uBE44\uACE0', content: '\u201C\uC815\uD6C4\uAC00 20\uB144\uAC04 \uB098\uB97C \uBCF4\uC0B4\uD3B8 \uC544\uC774\uB2E4. \uD0DC\uC131\uC774\uC5D0\uAC8C\uB294 \uBBF8\uC548\uD558\uC9C0\uB9CC\u201D', amount: '', missing: false },
      { date: '', content: '\u201C\uD0DC\uC131\uC774\uB294 \uACF5\uC7A5\uC77C\uC774 \uBC14\uC058 \uB098\uB97C \uBCF4\uB7EC\uC62C \uC5EC\uC720\uAC00 \uC5C6\uC5C8\uC73C\uB2C8\u201D', amount: '', missing: false },
      { date: '', content: '\u201C\uADF8\uB798\uB3C4 \uB458 \uB2E4 \uB0B4 \uC544\uB4E4\uC778 \uAC83\uC740 \uBCC0\uD568\uC5C6\uB2E4\u201D', amount: '', missing: false },
    ],
    signature: '\uC720\uC5B8\uC790: \uC724\u25CB\u25CB (\uC790\uD544) \u2014\u2014\u2014 \uBBF8\uACF5\uC99D / \uC11C\uB78D \uBCF4\uAD00'
  }
};

// e-6: 20년 송금 내역 묶음 (type=bank)
data.evidence[5].viewerData = {
  meta: {
    name: '20\uB144 \uC1A1\uAE08 \uB0B4\uC5ED',
    type: 'bank',
    viewerType: 'bank',
    trustLevel: 'high',
    trustLabel: '\uB192\uC74C',
    source: 'org',
    sourceLabel: '\uAE30\uAD00 (\uC740\uD589)',
    legality: 'ok',
    legalLabel: '\uC801\uBC95',
    stage: 2
  },
  bank: [
    { date: '2005~2024', desc: '\uC724\uC815\uD6C4 \u2192 \uC5B4\uBA38\uB2C8 \uD1B5\uC7A5 (\uB9E4\uC6D4 \uC0DD\uD65C\uBE44)', amount: '\uC6D4 80~150\uB9CC\uC6D0', balance: '\uCD1D 20\uB144\uAC04', suspicious: false },
    { date: '\uB204\uC801\uC561', desc: '\uC1A1\uAE08 \uCD1D\uC561 (\uCD94\uC815)', amount: '\uC57D 2\uC5B5 4\uCC9C\uB9CC\uC6D0', balance: '', suspicious: true },
    { date: '2018.03', desc: '\uC5B4\uBA38\uB2C8 \uD1B5\uC7A5 \u2192 \uC724\uD0DC\uC131 (\uACF5\uC7A5 \uBD80\uB3C4 \uAE34\uAE09\uC790\uAE08)', amount: '-8,000\uB9CC\uC6D0', balance: '', suspicious: true },
    { date: '2018.03', desc: '\uBE44\uACE0: \uC724\uD0DC\uC131\uC740 "\uC5B4\uBA38\uB2C8\uAC00 \uB3C4\uC640\uC900 \uAC83"\uC73C\uB85C \uC778\uC2DD', amount: '', balance: '', suspicious: false },
    { date: '2018.02', desc: '\uC724\uC815\uD6C4 \u2192 \uC5B4\uBA38\uB2C8 \uD1B5\uC7A5 (\uD2B9\uBCC4 \uC785\uAE08)', amount: '+8,500\uB9CC\uC6D0', balance: '', suspicious: true },
    { date: '\uBE44\uACE0', desc: '\uD2B9\uBCC4 \uC785\uAE08(8,500) \u2192 \uD0DC\uC131 \uAE34\uAE09\uC790\uAE08(8,000) \uC2DC\uC810 \uC77C\uCE58', amount: '', balance: '', suspicious: true },
    { date: '2019.11', desc: '\uC5B4\uBA38\uB2C8 \uD1B5\uC7A5 \u2192 \uC724\uD0DC\uC131 (\uACF5\uC7A5 \uCD94\uAC00 \uC6B4\uC601\uC790\uAE08)', amount: '-3,000\uB9CC\uC6D0', balance: '', suspicious: true },
    { date: '2019.10', desc: '\uC724\uC815\uD6C4 \u2192 \uC5B4\uBA38\uB2C8 \uD1B5\uC7A5 (\uD2B9\uBCC4 \uC785\uAE08)', amount: '+3,200\uB9CC\uC6D0', balance: '', suspicious: true },
  ]
};

// e-7: 어머니 일기장 사진 (type=device) — 일기장 페이지
data.evidence[6].viewerData = {
  meta: {
    name: '\uC5B4\uBA38\uB2C8 \uC77C\uAE30\uC7A5',
    type: 'device',
    viewerType: 'device',
    trustLevel: 'mid',
    trustLabel: '\uBCF4\uD1B5',
    source: 'b',
    sourceLabel: 'B\uCE21 (발견)',
    legality: 'ok',
    legalLabel: '\uC801\uBC95',
    stage: 3
  },
  device: {
    ownerName: '\uC5B4\uBA38\uB2C8 (\uC724\u25CB\u25CB)',
    sections: [
      {
        title: '2024\uB144 8\uC6D4 12\uC77C \uC77C\uAE30', id: 'entry1', items: [
          { text: '\uD0DC\uC131\uC774\uB3C4 \uB0B4 \uBC30\uB85C \uB0B3\uC558\uC9C0\uB9CC \uB124 \uC544\uBC84\uC9C0 \uD53C\uB294 \uC544\uB2C8\uB2E4.', suspicious: true },
          { text: '\uADF8 \uC0AC\uB78C\uC774 \uB5A0\uB098\uACE0 \uB098\uC11C \uD0DC\uC131\uC774\uB97C \uD63C\uC790 \uD0A4\uC6E0\uB2E4.', suspicious: false },
          { text: '\uC815\uD6C4\uB294 \uC544\uBC84\uC9C0\uC640 \uB098 \uC0AC\uC774\uC758 \uC544\uB4E4\uC774\uACE0, \uD0DC\uC131\uC774\uB294...', suspicious: true },
          { text: '\uC774 \uC0AC\uC2E4\uC744 \uD0DC\uC131\uC774\uAC00 \uC54C\uBA74 \uC0B4\uC774 \uBB34\uB108\uC9C8\uAE4C \uBD10 \uD3C9\uC0DD \uC228\uACA8\uC654\uB2E4.', suspicious: true },
        ]
      },
      {
        title: '2025\uB144 2\uC6D4 3\uC77C \uC77C\uAE30', id: 'entry2', items: [
          { text: '\uC815\uD6C4\uAC00 \uC624\uB298 \uC77C\uAE30\uC7A5\uC744 \uBD04 \uAC83 \uAC19\uB2E4. \uD45C\uC815\uC774 \uB2EC\uB77C\uC84C\uB2E4.', suspicious: true },
          { text: '\uADF8 \uC560\uAC00 \uC54C\uACE0\uB3C4 \uD615 \uC9C0\uCF1C\uC8FC\uACA0\uB2E4\uACE0 \uD588\uB2E4.', suspicious: true },
          { text: '\uACE0\uB9C8\uC6B4\uB370 \uBBF8\uC548\uD558\uB2E4. \uB0B4\uAC00 \uB9CC\uB4E0 \uC9D0\uC744 \uC5B4\uB9B0 \uAC83\uC774 \uC84C\uC5B4\uC9C0\uACE0 \uC788\uB2E4.', suspicious: false },
        ]
      },
      {
        title: '2025\uB144 10\uC6D4 20\uC77C \uC77C\uAE30 (\uC720\uC11C \uC791\uC131 \uC9C1\uC804)', id: 'entry3', items: [
          { text: '90\uB300 10\uC73C\uB85C \uB0A8\uAE30\uBA74 \uD0DC\uC131\uC774 \uB05D\uAE4C\uC9C0 \uD30C\uACE0\uB4E4 \uAC83 \uAC19\uC544 \uBB34\uC12D\uB2E4.', suspicious: true },
          { text: '\uADF8\uB7EC\uBA74 \uC9C4\uC2E4\uC774 \uB4DC\uB7EC\uB0A0\uC9C0\uB3C4 \uBAA8\uB974\uACE0... \uADF8\uAC8C \uC81C\uC77C \uBB34\uC12D\uB2E4.', suspicious: true },
          { text: '\uC815\uD6C4\uC5D0\uAC8C \uBBF8\uC548\uD558\uC9C0\uB9CC \uC904\uC5EC\uC11C\uB77C\uB3C4 \uB458 \uB2E4 \uC9C0\uD0A4\uACE0 \uC2F6\uB2E4.', suspicious: false },
        ]
      }
    ]
  }
};

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
console.log('family-01.json viewerData created for all 7 evidence items');
