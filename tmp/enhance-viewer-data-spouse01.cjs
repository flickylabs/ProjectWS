const fs = require('fs');
const path = './src/data/cases/generated/spouse-01.json';
const data = JSON.parse(fs.readFileSync(path, 'utf-8'));

// ═══ e-1: 영수증 묶음 (5장) — 실제 영수증처럼 상세하게 ═══
data.evidence[0].viewerData = {
  meta: data.evidence[0].viewerData.meta,
  bank: [
    { date: '2026.02.18 19:23', desc: 'CU 관악봉천점', amount: '-5,400원', balance: '', suspicious: false },
    { date: '2026.02.18 19:41', desc: '교보문고 관악점 — 중2 수학 개념+유형 (참고서)', amount: '-18,000원', balance: '', suspicious: true },
    { date: '2026.02.20 18:15', desc: '올리브영 봉천역점 — 여성용 팬티스타킹 (학생용), 핸드크림', amount: '-12,800원', balance: '', suspicious: true },
    { date: '2026.02.22 11:30', desc: '이마트 관악점 (식재료: 돼지고기, 두부, 파, 계란)', amount: '-34,200원', balance: '', suspicious: false },
    { date: '2026.02.23 20:05', desc: '세븐일레븐 관악오피스텔점 (음료수 2, 초코바 1)', amount: '-8,900원', balance: '', suspicious: false },
  ]
};

// ═══ e-2: 블랙박스 GPS / 네비 즐겨찾기 — 좌표+시간 로그 형태 ═══
data.evidence[1].viewerData = {
  meta: data.evidence[1].viewerData.meta,
  device: {
    ownerName: '이준호',
    sections: [
      {
        title: '네비게이션 즐겨찾기', id: 'nav-fav', items: [
          { text: '★ 자택 — 서울시 마포구 망원동 ○○아파트 (37.5565, 126.9097)', suspicious: false },
          { text: '★ 직장 — 서울시 강서구 ○○전자매장 (37.5509, 126.8495)', suspicious: false },
          { text: '★ 즐겨찾기3 — 서울시 관악구 봉천동 ○○오피스텔 302호 (37.4812, 126.9528)', suspicious: true },
        ]
      },
      {
        title: 'GPS 이동 로그 (최근 30일)', id: 'gps-log', items: [
          { text: '02.05 19:38 출발(마포) → 19:42 도착(37.4812, 126.9528) 관악구 오피스텔', suspicious: true },
          { text: '02.05 22:12 출발(관악) → 22:28 도착(37.5565, 126.9097) 자택 복귀', suspicious: false },
          { text: '02.07 18:51 출발(강서) → 18:55 도착(37.4812, 126.9528) 관악구 오피스텔', suspicious: true },
          { text: '02.07 21:27 출발(관악) → 21:44 도착(37.5565, 126.9097) 자택 복귀', suspicious: false },
          { text: '02.10 19:06 출발(마포) → 19:10 도착(37.4812, 126.9528) 관악구 오피스텔', suspicious: true },
          { text: '02.10 22:02 출발(관악) → 22:18 도착(37.5565, 126.9097) 자택 복귀', suspicious: false },
          { text: '02.12 19:26 출발(마포) → 19:30 도착(37.4812, 126.9528) 관악구 오피스텔', suspicious: true },
          { text: '02.12 23:06 출발(관악) → 23:22 도착(37.5565, 126.9097) 자택 복귀', suspicious: false },
          { text: '02.14 18:36 출발(강서) → 18:40 도착(37.4812, 126.9528) 관악구 오피스텔', suspicious: true },
          { text: '02.14 21:47 출발(관악) → 22:03 도착(37.5565, 126.9097) 자택 복귀', suspicious: false },
          { text: '... 이하 유사 패턴 반복 (주 3~4회, 토/일 방문 없음)', suspicious: false },
        ]
      },
      {
        title: '블랙박스 상시녹화 로그', id: 'dashcam', items: [
          { text: '02.12 19:28:14 [EVENT] 지하주차장 진입 감지 — 관악구 봉천동 ○○오피스텔 B1', suspicious: true },
          { text: '02.12 23:08:41 [EVENT] 지하주차장 출차 감지 — 동일 위치', suspicious: false },
          { text: '02.14 18:38:22 [EVENT] 지하주차장 진입 감지 — 관악구 봉천동 ○○오피스텔 B1', suspicious: true },
          { text: '02.14 21:49:05 [EVENT] 지하주차장 출차 감지 — 동일 위치', suspicious: false },
        ]
      }
    ]
  }
};

// ═══ e-3: 통화기록 — 새벽 통화 강조, 상세 로그 ═══
data.evidence[2].viewerData = {
  meta: data.evidence[2].viewerData.meta,
  log: {
    rows: [
      { date: '02.05 00:12', type: 'out', typeLabel: '발신', target: '010-****-3847', duration: '4분 22초', suspicious: true },
      { date: '02.05 14:30', type: 'out', typeLabel: '발신', target: '010-****-3847', duration: '1분 08초', suspicious: false },
      { date: '02.07 23:48', type: 'in', typeLabel: '수신', target: '010-****-3847', duration: '6분 08초', suspicious: true },
      { date: '02.08 09:15', type: 'out', typeLabel: '발신', target: '02-XXX-4560 (직장)', duration: '0분 42초', suspicious: false },
      { date: '02.10 00:35', type: 'out', typeLabel: '발신', target: '010-****-3847', duration: '8분 15초', suspicious: true },
      { date: '02.10 12:15', type: 'out', typeLabel: '발신', target: '010-****-3847', duration: '1분 30초', suspicious: false },
      { date: '02.12 01:10', type: 'in', typeLabel: '수신', target: '010-****-3847', duration: '11분 42초', suspicious: true },
      { date: '02.12 13:20', type: 'out', typeLabel: '발신', target: '010-****-3847', duration: '2분 05초', suspicious: false },
      { date: '02.14 23:55', type: 'out', typeLabel: '발신', target: '010-****-3847', duration: '7분 33초', suspicious: true },
      { date: '02.17 12:40', type: 'out', typeLabel: '발신', target: '010-****-3847', duration: '1분 15초', suspicious: false },
      { date: '02.19 00:22', type: 'out', typeLabel: '발신', target: '010-****-3847', duration: '9분 50초', suspicious: true },
      { date: '02.20 14:05', type: 'in', typeLabel: '수신', target: '박지연', duration: '0분 45초', suspicious: false },
      { date: '02.20 14:10', type: 'miss', typeLabel: '부재중', target: '박지연', duration: '—', suspicious: false },
      { date: '02.22 01:05', type: 'out', typeLabel: '발신', target: '010-****-3847', duration: '5분 18초', suspicious: true },
      { date: '02.23 13:50', type: 'out', typeLabel: '발신', target: '010-****-3847', duration: '1분 42초', suspicious: false },
    ],
    note: '010-****-3847 집중 — 새벽(00~02시) 통화 6회, 평균 7분. 낮 통화 5회, 평균 1.5분. 아내 박지연과의 통화는 2건(수신 1 + 부재중 1).'
  }
};

// ═══ e-4: 형 문자 스레드 — 그대로 유지 (이미 13건) ═══
// (이미 충분히 디테일함)

// ═══ e-5: 이준호 계좌 출금 내역 — 더 디테일하게 ═══
data.evidence[4].viewerData = {
  meta: data.evidence[4].viewerData.meta,
  bank: [
    { date: '2025.09.15', desc: '급여 입금 — ○○전자매장', amount: '+310만원', balance: '5,130만', suspicious: false },
    { date: '2025.10.15', desc: '급여 입금 — ○○전자매장', amount: '+310만원', balance: '4,820만', suspicious: false },
    { date: '2025.10.20', desc: 'ATM 현금인출 (관악봉천지점) — 1회 한도 출금', amount: '-500만원', balance: '4,320만', suspicious: true },
    { date: '2025.11.15', desc: '급여 입금 — ○○전자매장', amount: '+310만원', balance: '4,630만', suspicious: false },
    { date: '2025.11.22', desc: 'ATM 현금인출 (관악봉천지점)', amount: '-800만원', balance: '3,830만', suspicious: true },
    { date: '2025.12.15', desc: '급여 입금 — ○○전자매장', amount: '+310만원', balance: '4,140만', suspicious: false },
    { date: '2025.12.28', desc: 'ATM 현금인출 (관악봉천지점)', amount: '-700만원', balance: '3,440만', suspicious: true },
    { date: '2026.01.15', desc: '급여 입금 — ○○전자매장', amount: '+310만원', balance: '3,750만', suspicious: false },
    { date: '2026.01.25', desc: 'ATM 현금인출 (관악봉천지점) — 최대 금액', amount: '-1,000만원', balance: '2,750만', suspicious: true },
    { date: '2026.02.03', desc: '이자 입금', amount: '+2,100원', balance: '2,750만', suspicious: false },
    { date: '', desc: '총 현금인출: 3,000만원 (4회, 모두 같은 지점 ATM)', amount: '', balance: '', suspicious: true },
  ]
};

// ═══ e-6: 투자방 카톡 — 그대로 유지 (이미 13건) ═══

// ═══ e-7: 공동 적금 해지 서류 — 더 디테일하게 ═══
data.evidence[6].viewerData = {
  meta: data.evidence[6].viewerData.meta,
  contract: {
    title: '정 기 적 금  해 지 신 청 서',
    subtitle: '○○은행 마포지점 — 2026년 1월 18일 오후 2:14',
    rows: [
      { date: '상품명', content: '○○은행 정기적금 (월 50만원 × 36개월)', amount: '', missing: false },
      { date: '계좌', content: '공동명의: 박지연, 이준호 (계좌번호: 110-XXX-XXXXXX)', amount: '', missing: false },
      { date: '가입일', content: '2023년 7월 15일', amount: '', missing: false },
      { date: '잔액', content: '적금 원리금 합계', amount: '2,012만원', missing: false },
      { date: '해지유형', content: '중도해지 (만기일 2026년 7월 14일 이전)', amount: '-이자 차감', missing: false },
      { date: '수령방법', content: '박지연 개인계좌(○○은행 110-XXX-XXXXXX)로 즉시 입금', amount: '+2,012만원', missing: false },
      { date: '', content: '', amount: '', missing: false },
      { date: '첨부 1', content: '이준호 명의 위임장 — 자필서명 첨부', amount: '', missing: true },
      { date: '확인사항', content: '위임장 서명 필체 — 본인 기존 서명과 일치 여부 미확인', amount: '', missing: true },
      { date: '비고', content: '이준호 본인 방문 기록 없음 / 본인확인 절차 미실시', amount: '', missing: true },
    ],
    signature: '신청인: 박지연 (인) ——— 위임인: 이준호 (대리서명 의심) ——— 담당: ○○은행 마포지점 김○○'
  }
};

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
console.log('spouse-01 viewerData 보강 완료 — 7개 증거');
