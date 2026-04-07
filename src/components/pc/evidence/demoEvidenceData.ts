/**
 * Demo evidence viewer content — spouse-01 case data
 * Later this will come from actual case JSON files.
 */

// ── Common meta types ──
export type TrustLevel = 'high' | 'mid' | 'low'
export type SourceType = 'a' | 'b' | 'org' | 'third'
export type LegalStatus = 'ok' | 'sus' | 'unlawful'

export interface EvidenceMeta {
  name: string
  type: 'bank' | 'chat' | 'contract' | 'testimony' | 'cctv' | 'log' | 'device' | 'sns'
  trustLevel: TrustLevel
  trustLabel: string
  source: SourceType
  sourceLabel: string
  legality: LegalStatus
  legalLabel: string
  stage: number
}

// ── Bank ──
export interface BankRow {
  date: string
  desc: string
  amount: string
  balance: string
  suspicious: boolean
}

// ── Chat ──
export interface ChatMessage {
  side?: 'left' | 'right'
  sender?: string
  text: string
  type?: 'deleted' | 'read'
}

// ── Contract ──
export interface ContractRow {
  date: string
  content: string
  amount: string
  missing: boolean
}

// ── Testimony ──
export interface TestimonyData {
  witnessName: string
  witnessDesc: string
  quote: string
  confidence: 'high' | 'mid' | 'low'
  confidenceLabel: string
  bias: 'a' | 'neutral' | 'b'
  biasLabel: string
  directWitness: boolean
  relatedRef: string
}

// ── CCTV ──
export interface CCTVEvent {
  time: string
  pct: number
  label: string
  desc: string
  suspicious: boolean
}

// ── Log ──
export interface LogRow {
  date: string
  type: 'out' | 'in' | 'miss'
  typeLabel: string
  target: string
  duration: string
  suspicious: boolean
}

// ── Device ──
export interface DeviceSection {
  title: string
  id: string
  items: { text: string; suspicious: boolean }[]
}

// ── SNS ──
export interface SNSData {
  username: string
  handle: string
  date: string
  privacy: string
  text: string
  hashtags: string[]
  likes: number
  comments: { name: string; text: string }[]
  warnings: string[]
}

// ── Master data map ──
export interface EvidenceViewerData {
  meta: EvidenceMeta
  bank?: BankRow[]
  chat?: { header: string; messages: ChatMessage[] }
  contract?: { title: string; subtitle: string; rows: ContractRow[]; signature: string }
  testimony?: TestimonyData
  cctv?: CCTVEvent[]
  log?: { rows: LogRow[]; note: string }
  device?: { ownerName: string; sections: DeviceSection[] }
  sns?: SNSData
}

export const DEMO_EVIDENCE_DATA: Record<string, EvidenceViewerData> = {
  'ev-bank': {
    meta: {
      name: '계좌 이체 내역', type: 'bank',
      trustLevel: 'high', trustLabel: '높음',
      source: 'org', sourceLabel: '기관',
      legality: 'ok', legalLabel: '적법',
      stage: 2,
    },
    bank: [
      { date: '2025.09.01', desc: '급여 입금', amount: '+350만원', balance: '470만', suspicious: false },
      { date: '2025.09.05', desc: 'A\u2192? 이체', amount: '-280만원', balance: '190만', suspicious: true },
      { date: '2025.09.08', desc: '카드 결제 (식비)', amount: '-12만원', balance: '178만', suspicious: false },
      { date: '2025.09.12', desc: 'A\u2192? 이체', amount: '-150만원', balance: '28만', suspicious: true },
      { date: '2025.09.15', desc: '관리비 자동이체', amount: '-15만원', balance: '13만', suspicious: false },
      { date: '2025.09.20', desc: '급여 입금', amount: '+350만원', balance: '363만', suspicious: false },
      { date: '2025.09.25', desc: 'A\u2192? 이체', amount: '-200만원', balance: '163만', suspicious: true },
      { date: '2025.09.28', desc: '카드 결제 (교육비)', amount: '-30만원', balance: '133만', suspicious: false },
    ],
  },

  'ev-chat': {
    meta: {
      name: '카카오톡 대화', type: 'chat',
      trustLevel: 'mid', trustLabel: '보통',
      source: 'a', sourceLabel: 'A측',
      legality: 'sus', legalLabel: '의심',
      stage: 1,
    },
    chat: {
      header: '카카오톡 대화 기록 \u2014 2025.09.10~09.25',
      messages: [
        { side: 'left', sender: '최민준', text: '이번 달 좀 빠듯해' },
        { side: 'right', sender: '박서연', text: '또? 지난달도 그랬잖아' },
        { side: 'left', sender: '최민준', text: '경조사가 좀 있었어' },
        { side: 'right', sender: '박서연', text: '누구 경조사인데?' },
        { side: 'left', sender: '최민준', text: '회사 선배... 결혼이랑 장례식' },
        { type: 'deleted', text: '삭제된 메시지 3건' },
        { side: 'right', sender: '박서연', text: '가계부 좀 보여줘' },
        { type: 'read', text: '최민준 \u2014 읽음' },
        { side: 'right', sender: '박서연', text: '왜 답이 없어?' },
        { side: 'left', sender: '최민준', text: '지금 바빠 나중에 얘기하자' },
        { side: 'right', sender: '박서연', text: '맨날 나중에래' },
      ],
    },
  },

  'ev-book': {
    meta: {
      name: '가계부 사본', type: 'contract',
      trustLevel: 'mid', trustLabel: '보통',
      source: 'a', sourceLabel: 'A측',
      legality: 'ok', legalLabel: '적법',
      stage: 2,
    },
    contract: {
      title: '가 계 부',
      subtitle: '2025년 9월',
      rows: [
        { date: '09/01', content: '식비', amount: '-45만원', missing: false },
        { date: '09/05', content: '[기재 없음]', amount: '', missing: true },
        { date: '09/08', content: '교통비', amount: '-8만원', missing: false },
        { date: '09/10', content: '관리비', amount: '-12만원', missing: false },
        { date: '09/12', content: '[기재 없음]', amount: '', missing: true },
        { date: '09/15', content: '교육비', amount: '-30만원', missing: false },
        { date: '09/18', content: '보험료', amount: '-15만원', missing: false },
        { date: '09/20', content: '식비', amount: '-38만원', missing: false },
        { date: '09/25', content: '[기재 없음]', amount: '', missing: true },
        { date: '09/28', content: '의류', amount: '-7만원', missing: false },
      ],
      signature: '\u2500\u2500\u2500 서명: 최민준 \u2500\u2500\u2500 날짜: 2025.09.30 \u2500\u2500\u2500',
    },
  },

  'ev-witness': {
    meta: {
      name: '동료 증언', type: 'testimony',
      trustLevel: 'mid', trustLabel: '보통',
      source: 'third', sourceLabel: '제3자',
      legality: 'ok', legalLabel: '적법',
      stage: 1,
    },
    testimony: {
      witnessName: '김태호',
      witnessDesc: '직장 동료, 5년 근무',
      quote: '최민준 씨가 9월에 급하게 돈이 필요하다고 했습니다. 경조사라고 했는데, 구체적으로 누구 경조사인지는 말하지 않았습니다. 평소와 달리 좀 초조해 보였고, 점심시간에 자주 전화를 받으러 나갔습니다.',
      confidence: 'high',
      confidenceLabel: '높음',
      bias: 'neutral',
      biasLabel: '중립',
      directWitness: false,
      relatedRef: 'T7 "경조사비 + 영수증"',
    },
  },

  'ev-cctv': {
    meta: {
      name: 'CCTV 캡처', type: 'cctv',
      trustLevel: 'high', trustLabel: '높음',
      source: 'org', sourceLabel: '기관',
      legality: 'ok', legalLabel: '적법',
      stage: 1,
    },
    cctv: [
      { time: '22:10', pct: 0, label: '입장', desc: '최민준이 은행에 입장합니다', suspicious: false },
      { time: '22:15', pct: 33, label: 'ATM 접근', desc: 'ATM 기기 앞에 서있습니다', suspicious: true },
      { time: '22:18', pct: 53, label: '출금', desc: '현금을 인출합니다. 금액: 200만원', suspicious: true },
      { time: '22:20', pct: 67, label: '퇴장', desc: '은행을 떠납니다', suspicious: false },
    ],
  },

  'ev-phone': {
    meta: {
      name: '통화 기록', type: 'log',
      trustLevel: 'high', trustLabel: '높음',
      source: 'org', sourceLabel: '기관',
      legality: 'ok', legalLabel: '적법',
      stage: 2,
    },
    log: {
      rows: [
        { date: '09.05 14:32', type: 'out', typeLabel: '발신', target: '010-****-7821', duration: '3분 12초', suspicious: true },
        { date: '09.05 14:40', type: 'in', typeLabel: '수신', target: '010-****-7821', duration: '1분 05초', suspicious: false },
        { date: '09.10 09:15', type: 'out', typeLabel: '발신', target: '02-***-4560', duration: '0분 42초', suspicious: false },
        { date: '09.12 22:08', type: 'out', typeLabel: '발신', target: '010-****-7821', duration: '8분 33초', suspicious: true },
        { date: '09.12 22:30', type: 'miss', typeLabel: '부재중', target: '박서연', duration: '\u2014', suspicious: false },
        { date: '09.15 11:00', type: 'in', typeLabel: '수신', target: '02-***-4560', duration: '2분 10초', suspicious: false },
        { date: '09.18 19:45', type: 'out', typeLabel: '발신', target: '010-****-7821', duration: '5분 18초', suspicious: false },
        { date: '09.25 13:20', type: 'out', typeLabel: '발신', target: '010-****-7821', duration: '11분 02초', suspicious: true },
      ],
      note: '특이사항: 09.05, 09.12, 09.25 송금일에 동일번호(7821) 집중 통화',
    },
  },

  'ev-device': {
    meta: {
      name: '최민준 휴대폰', type: 'device',
      trustLevel: 'high', trustLabel: '높음',
      source: 'a', sourceLabel: 'A측',
      legality: 'ok', legalLabel: '적법',
      stage: 2,
    },
    device: {
      ownerName: '최민준',
      sections: [
        {
          title: '최근 알림', id: 'notif', items: [
            { text: '뱅킹앱: 이체 완료 (200만원)', suspicious: true },
            { text: '메신저: 새 메시지 1건', suspicious: false },
            { text: '뱅킹앱: 잔액 부족 알림', suspicious: true },
          ],
        },
        {
          title: '앱 사용 기록', id: 'apps', items: [
            { text: '22:14 뱅킹앱 실행', suspicious: true },
            { text: '22:19 뱅킹앱 종료', suspicious: false },
            { text: '22:20 메신저 실행', suspicious: false },
            { text: '22:35 갤러리 실행', suspicious: false },
            { text: '22:48 메신저 종료', suspicious: false },
          ],
        },
        {
          title: '접속 기록', id: 'conn', items: [
            { text: 'Wi-Fi: 자택 (iptime_choi)', suspicious: false },
            { text: '22:10 LTE 전환', suspicious: true },
            { text: '22:25 Wi-Fi 복귀 (자택)', suspicious: false },
            { text: '23:05 LTE 전환', suspicious: false },
          ],
        },
      ],
    },
  },

  'ev-sns': {
    meta: {
      name: 'SNS 게시글', type: 'sns',
      trustLevel: 'low', trustLabel: '낮음',
      source: 'third', sourceLabel: '제3자',
      legality: 'sus', legalLabel: '의심',
      stage: 1,
    },
    sns: {
      username: '최민준',
      handle: '@minjun_choi',
      date: '2025.09.06',
      privacy: '친구만',
      text: '"오늘 좀 큰 결심을 했다. 후회 없이 살자. #새출발"',
      hashtags: ['#새출발'],
      likes: 12,
      comments: [
        { name: '김태호', text: '무슨 결심? \u314B\u314B' },
        { name: '최민준', text: '비밀 \u314E\u314E' },
        { name: '이수빈', text: '응원해!' },
      ],
      warnings: [
        '캡처 범위: 원본 삭제됨, B(박서연)가 캡처 제출',
        '누락 문맥: 이전/이후 게시글 미확보',
      ],
    },
  },
}
