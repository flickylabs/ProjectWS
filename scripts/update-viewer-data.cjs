/**
 * spouse-01.json viewerData 전면 교체 스크립트
 * e-1: 영수증 5장 (receipt)
 * e-2: GPS 블랙박스 로그 (gps_log)
 * e-3: 통화기록 10건 (log)
 * e-5: 계좌 출금내역 (bank)
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/cases/generated/spouse-01.json');
const d = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// ═══════════════════════════════════════════════════════
// e-1: 영수증 묶음 5장 → receipt 타입
// ═══════════════════════════════════════════════════════
d.evidence[0].viewerData = {
  meta: d.evidence[0].viewerData.meta,
  receipt: [
    {
      storeName: 'CU 관악봉천점',
      storeAddr: '서울 관악구 봉천로 234',
      date: '2026.02.18 (화) 19:23',
      items: [
        { name: '빙그레 바나나맛우유', code: '880104', unitPrice: '1,500', qty: 1, amount: '1,500' },
        { name: '삼각김밥 불고기', code: '880211', unitPrice: '1,500', qty: 2, amount: '3,000' },
        { name: '핫식스 250ml', code: '880309', unitPrice: '900', qty: 1, amount: '900' },
      ],
      subtotal: '5,400',
      tax: '491',
      total: '5,400',
      paymentMethod: '신한카드 (일시불) ****-3892',
      suspicious: false,
    },
    {
      storeName: '올리브영 봉천역점',
      storeAddr: '서울 관악구 봉천로 212 2F',
      date: '2026.02.15 (토) 14:07',
      items: [
        { name: '이니스프리 그린티씨드세럼', code: '410752', unitPrice: '28,000', qty: 1, amount: '28,000' },
        { name: '에뛰드 픽싱틴트 #05', code: '410381', unitPrice: '12,000', qty: 1, amount: '12,000' },
        { name: '쏘내추럴 코튼패드 80매', code: '410104', unitPrice: '3,500', qty: 1, amount: '3,500' },
      ],
      subtotal: '43,500',
      tax: '3,954',
      total: '43,500',
      paymentMethod: '신한카드 (일시불) ****-3892',
      suspicious: true,
    },
    {
      storeName: '교보문고 강남점',
      storeAddr: '서울 서초구 강남대로 465',
      date: '2026.02.12 (수) 18:30',
      items: [
        { name: '초등 수학 6-1 기본+응용', code: '978890', unitPrice: '16,000', qty: 1, amount: '16,000' },
        { name: '독해력 비타민 6단계', code: '978891', unitPrice: '13,000', qty: 1, amount: '13,000' },
      ],
      subtotal: '29,000',
      tax: '0',
      total: '29,000',
      paymentMethod: '현금',
      suspicious: true,
    },
    {
      storeName: 'GS25 관악중앙점',
      storeAddr: '서울 관악구 관악로 142',
      date: '2026.02.08 (토) 21:45',
      items: [
        { name: '컵라면 진라면매운맛', code: '880022', unitPrice: '1,200', qty: 1, amount: '1,200' },
        { name: '삼각김밥 참치마요', code: '880215', unitPrice: '1,500', qty: 1, amount: '1,500' },
        { name: '코카콜라 500ml', code: '880301', unitPrice: '1,800', qty: 1, amount: '1,800' },
        { name: '핫도그 클래식', code: '880401', unitPrice: '2,000', qty: 1, amount: '2,000' },
      ],
      subtotal: '6,500',
      tax: '591',
      total: '6,500',
      paymentMethod: '신한카드 (일시불) ****-3892',
      suspicious: false,
    },
    {
      storeName: '다이소 봉천점',
      storeAddr: '서울 관악구 봉천로 201 1F',
      date: '2026.02.05 (수) 16:12',
      items: [
        { name: '미니 손거울', code: '530101', unitPrice: '2,000', qty: 1, amount: '2,000' },
        { name: '머리끈 세트', code: '530205', unitPrice: '1,000', qty: 2, amount: '2,000' },
        { name: '캐릭터 스티커', code: '530310', unitPrice: '1,000', qty: 3, amount: '3,000' },
        { name: '어린이 지우개 세트', code: '530408', unitPrice: '1,000', qty: 1, amount: '1,000' },
      ],
      subtotal: '8,000',
      tax: '727',
      total: '8,000',
      paymentMethod: '현금',
      suspicious: true,
    },
  ],
};

// ═══════════════════════════════════════════════════════
// e-2: 블랙박스 GPS 로그 → gps_log 타입
// ═══════════════════════════════════════════════════════
d.evidence[1].viewerData = {
  meta: d.evidence[1].viewerData.meta,
  gps_log: [
    { timestamp: '02.18 18:32', lat: '37.5565', lng: '126.9097', speed: '0 km/h', location: '자택 (마포구 망원동)', suspicious: false },
    { timestamp: '02.18 18:45', lat: '37.5412', lng: '126.9119', speed: '42 km/h', location: '여의대로 합류', suspicious: false },
    { timestamp: '02.18 18:58', lat: '37.5185', lng: '126.9278', speed: '35 km/h', location: '노량진역 부근', suspicious: false },
    { timestamp: '02.18 19:05', lat: '37.5092', lng: '126.9310', speed: '28 km/h', location: '상도터널 진입', suspicious: false },
    { timestamp: '02.18 19:12', lat: '37.4985', lng: '126.9448', speed: '15 km/h', location: '관악구 봉천동 진입', suspicious: true },
    { timestamp: '02.18 19:14', lat: '37.4962', lng: '126.9461', speed: '0 km/h', location: '\u2605 봉천동 오피스텔 302호 앞 주차', suspicious: true },
    { timestamp: '02.18 21:47', lat: '37.4962', lng: '126.9461', speed: '0 km/h', location: '(주차 유지 \u2014 2시간 32분)', suspicious: true },
    { timestamp: '02.18 21:48', lat: '37.4968', lng: '126.9455', speed: '8 km/h', location: '봉천동 출발', suspicious: true },
    { timestamp: '02.18 22:02', lat: '37.5092', lng: '126.9310', speed: '45 km/h', location: '상도터널 통과', suspicious: false },
    { timestamp: '02.18 22:15', lat: '37.5258', lng: '126.9138', speed: '38 km/h', location: '여의도 방면', suspicious: false },
    { timestamp: '02.18 22:28', lat: '37.5565', lng: '126.9097', speed: '0 km/h', location: '자택 도착', suspicious: false },
    { timestamp: '02.15 14:01', lat: '37.5565', lng: '126.9097', speed: '0 km/h', location: '자택 출발', suspicious: false },
    { timestamp: '02.15 14:18', lat: '37.4962', lng: '126.9461', speed: '0 km/h', location: '\u2605 봉천동 오피스텔 302호 앞 주차', suspicious: true },
    { timestamp: '02.15 16:42', lat: '37.4962', lng: '126.9461', speed: '0 km/h', location: '(주차 유지 \u2014 2시간 24분)', suspicious: true },
    { timestamp: '02.12 18:05', lat: '37.5565', lng: '126.9097', speed: '0 km/h', location: '자택 출발', suspicious: false },
    { timestamp: '02.12 18:22', lat: '37.4962', lng: '126.9461', speed: '0 km/h', location: '\u2605 봉천동 오피스텔 302호 앞 주차', suspicious: true },
    { timestamp: '02.12 20:55', lat: '37.4962', lng: '126.9461', speed: '0 km/h', location: '(주차 유지 \u2014 2시간 32분)', suspicious: true },
    { timestamp: '02.08 21:20', lat: '37.4962', lng: '126.9461', speed: '0 km/h', location: '\u2605 봉천동 오피스텔 302호 앞 주차', suspicious: true },
  ],
};

// ═══════════════════════════════════════════════════════
// e-3: 통화기록 — 아내/070스팸/직장 추가, 3847은 6개, 총 10개
// ═══════════════════════════════════════════════════════
d.evidence[2].viewerData = {
  meta: d.evidence[2].viewerData.meta,
  log: {
    rows: [
      { date: '02.05 00:12', type: 'out', typeLabel: '발신', target: '010-****-3847', duration: '4분 22초', suspicious: true },
      { date: '02.04 22:35', type: 'in', typeLabel: '수신', target: '010-****-7720 (아내)', duration: '1분 05초', suspicious: false },
      { date: '02.04 19:08', type: 'out', typeLabel: '발신', target: '010-****-3847', duration: '12분 48초', suspicious: true },
      { date: '02.04 14:22', type: 'miss', typeLabel: '부재중', target: '070-7892-3310', duration: '-', suspicious: false },
      { date: '02.03 21:15', type: 'out', typeLabel: '발신', target: '010-****-3847', duration: '8분 33초', suspicious: true },
      { date: '02.03 18:40', type: 'in', typeLabel: '수신', target: '02-3441-**** (직장)', duration: '2분 10초', suspicious: false },
      { date: '02.02 20:50', type: 'out', typeLabel: '발신', target: '010-****-3847', duration: '15분 02초', suspicious: true },
      { date: '02.01 12:15', type: 'miss', typeLabel: '부재중', target: '070-8855-1120', duration: '-', suspicious: false },
      { date: '02.01 09:30', type: 'out', typeLabel: '발신', target: '010-****-3847', duration: '3분 55초', suspicious: true },
      { date: '01.31 23:48', type: 'out', typeLabel: '발신', target: '010-****-3847', duration: '22분 17초', suspicious: true },
    ],
    note: '010-****-3847 번호로의 야간 통화가 반복적으로 확인됨. 통화 시간이 길고 빈도가 높음.',
  },
};

// ═══════════════════════════════════════════════════════
// e-5: 계좌 출금 내역 — 실제 은행 거래내역 형태 + 잡 항목
// ═══════════════════════════════════════════════════════
d.evidence[4].viewerData = {
  meta: d.evidence[4].viewerData.meta,
  bank: [
    { date: '2026.02.01', desc: '급여 입금 \u2014 \u25CB\u25CB전자매장', amount: '+3,100,000', balance: '5,842,300', suspicious: false },
    { date: '2026.02.03', desc: '카드결제 \u2014 GS25 관악중앙', amount: '-4,200', balance: '5,838,100', suspicious: false },
    { date: '2026.02.05', desc: '현금 인출 \u2014 마포지점 ATM', amount: '-5,000,000', balance: '838,100', suspicious: true },
    { date: '2026.02.07', desc: '자동이체 \u2014 SK텔레콤 통신료', amount: '-68,200', balance: '769,900', suspicious: false },
    { date: '2026.02.08', desc: '카드결제 \u2014 CU 관악봉천', amount: '-6,500', balance: '763,400', suspicious: false },
    { date: '2026.02.10', desc: '현금 인출 \u2014 관악지점 ATM', amount: '-8,000,000', balance: '-7,236,600', suspicious: true },
    { date: '2026.02.12', desc: '입금 \u2014 이\u25CB\u25CB (모친)', amount: '+2,000,000', balance: '-5,236,600', suspicious: false },
    { date: '2026.02.15', desc: '현금 인출 \u2014 마포지점 ATM', amount: '-7,000,000', balance: '-12,236,600', suspicious: true },
    { date: '2026.02.18', desc: '자동이체 \u2014 아파트관리비', amount: '-234,500', balance: '-12,471,100', suspicious: false },
    { date: '2026.02.20', desc: '현금 인출 \u2014 강서지점 ATM', amount: '-10,000,000', balance: '-22,471,100', suspicious: true },
    { date: '2026.02.22', desc: '카드결제 \u2014 올리브영 봉천역', amount: '-43,500', balance: '-22,514,600', suspicious: false },
  ],
};

fs.writeFileSync(filePath, JSON.stringify(d, null, 2), 'utf8');
console.log('spouse-01.json viewerData updated: e-1(receipt), e-2(gps_log), e-3(log), e-5(bank)');
