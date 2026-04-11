const fs = require('fs')
const path = require('path')
const { enrichRuntimeFile } = require('./lib/runtime-gameplay-enricher.cjs')

const ROOT = path.resolve(__dirname, '..')
const CASE_ID = 'spouse-v3-01'
const RUNTIME_CASE_ID = `case-${CASE_ID}`
const TITLE = '새벽 통화기록'
const REF_DIR = path.join(ROOT, 'docs', 'ref', '리뉴얼참고')
const RUNTIME_OUT_PATH = path.join(ROOT, 'src', 'data', 'cases', 'generated', `${CASE_ID}.json`)
const V3_JSON_OUT_PATH = path.join(REF_DIR, `${CASE_ID}-v3-game-loop-data.json`)
const V3_TS_OUT_PATH = path.join(REF_DIR, `${CASE_ID}-v3-game-loop-data.ts`)

const HOOK =
  '남편 카드 명세서에 여성 생리대, 스타킹이 찍혀 있고, 퇴근 뒤엔 늘 같은 오피스텔에 두 시간씩 머문다. 게다가 새벽마다 같은 번호와 통화한다. 아내는 딴살림을 확신한다.'
const ANCHOR_TRUTH =
  '박지연은 남편이 딴살림을 차렸다고 믿은 뒤 자기 몫을 지키려 2,000만 원을 따로 움직였다가 투자 사기에 당했다. 이준호는 외도가 아니라 친형과 중2 조카를 몰래 돌보고 있었고, 시댁 불화를 피하려 그 사실을 숨긴 채 공동 적금 3,000만 원까지 깨 형 빚을 갚아 줬다.'
const MID_TWIST =
  '초반에는 카드 결제, 오피스텔 출입, 새벽 통화가 한 방향으로만 겹쳐 외도처럼 보인다. 그러나 형 문자와 조카 알림이 열리면 그 패턴은 가족 돌봄으로 재맥락화되고, 공동 적금 3,000만 원과 2,000만 원 송금이 연달아 드러나면서 사건의 중심은 외도가 아니라 서로 말하지 못한 가족 공포와 비밀 송금 순서로 뒤집힌다.'
const DILEMMA =
  '형과 조카를 지키려다 가정 돈 3,000만 원을 독단으로 써 버린 남편과, 배신당했다고 믿고 자기 자신을 지키려다 2,000만 원을 사기에 날린 아내 중 누가 더 무거운 책임을 져야 하는가. 남편은 숨김을 먼저 시작했고, 아내는 실제 돈 이동을 먼저 실행했다.'

function ensureParentDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
}

function writeJson(filePath, value) {
  ensureParentDir(filePath)
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

function pascal(value) {
  return String(value)
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

function writeTs(filePath, constName, value) {
  ensureParentDir(filePath)
  fs.writeFileSync(filePath, `export const ${constName} = ${JSON.stringify(value, null, 2)} as const\n`, 'utf8')
}

function stage(stageIndex, revealKey, text, attackVector) {
  return {
    stage: stageIndex,
    revealKey,
    question: {
      text,
      attackVector,
    },
  }
}

function atom(id, unlockedAtState, factText, tags, stanceHints = ['partial', 'emotional', 'confess']) {
  return {
    id,
    factText,
    tags,
    unlockedAtState,
    slots: {
      summary: {
        default: factText,
      },
    },
    stanceHints,
  }
}

function dossierQuestion({ id, text, attackVector, requiredLieState, revealAtom, lockedHint, scriptedResponse }) {
  return {
    id,
    text,
    lockedHint,
    attackVector,
    requiredLieState,
    onSuccess: {
      blockVector: attackVector,
      revealAtom,
      lieAdvance: true,
    },
    scriptedResponse,
  }
}

function evidenceNode(id, label, linkedDisputeIds, linkedEvidenceIds = [id]) {
  return {
    id,
    type: 'evidence',
    label,
    sourceRef: id,
    linkedDisputeIds,
    linkedEvidenceIds,
    visibility: 'base',
  }
}

function statementNode(id, label, linkedDisputeIds) {
  return {
    id,
    type: 'statement',
    label,
    sourceRef: id,
    linkedDisputeIds,
    visibility: 'base',
  }
}

function witnessAngleNode(id, label, linkedDisputeIds) {
  return {
    id,
    type: 'witness_angle',
    label,
    sourceRef: id,
    linkedDisputeIds,
    visibility: 'base',
  }
}

function derivedNode(id, label, linkedDisputeIds, linkedEvidenceIds) {
  return {
    id,
    type: 'derived_note',
    label,
    linkedDisputeIds,
    linkedEvidenceIds,
    visibility: 'derived',
  }
}

function depthStage(id, label, summary) {
  return { id, label, summary }
}

function trustState(id, label, summary) {
  return { id, label, summary }
}

function interpretationChoice(id, text, implication) {
  return { id, text, implication }
}

function scriptedTestimony(testimony, behaviorHint, truthLevel) {
  return { testimony, behaviorHint, truthLevel }
}

const evidenceDepthLegend = [
  depthStage('stub', 'Stub', '존재만 보임'),
  depthStage('excerpt', 'Excerpt', '일부만 열람'),
  depthStage('original', 'Original', '원본/전체본 확보'),
  depthStage('context', 'Context', '앞뒤 맥락 복원'),
  depthStage('established', 'Established', '공식기록 채택'),
]

const evidenceTrustLegend = [
  trustState('submitted', '제출됨', '당사자가 제출한 상태'),
  trustState('verifying', '검증 중', '원본 대조 및 맥락 확인 중'),
  trustState('authenticated', '인증됨', '신뢰 가능한 자료로 판단'),
  trustState('challenged', '이의 제기됨', '상대방이 의미나 범위를 다툼'),
  trustState('misread', '조작/오독 판정', '위조 또는 발췌/오독 여부가 판정됨'),
]

const disputes = [
  {
    id: 'd-1',
    name: '오피스텔 출입과 새벽 통화는 딴살림 흔적인가',
    truth: true,
    truthDescription: '오피스텔 출입과 새벽 통화는 외도가 아니라 친형과 조카를 숨겨 돌본 가족 돌봄의 흔적이었다.',
    quadrant: 'b_only',
    requiredEvidence: ['e-2', 'e-3', 'e-4'],
    correctResponsibility: { a: 25, b: 75 },
    ambiguity: 'low',
    weight: 'high',
    mediationLink: '외도 오해와 가족 돌봄',
    legitimacyIssue: false,
    judgmentStatement: '오피스텔 방문의 실체는 외도가 아니라 가족 돌봄이었다.',
    hidden: false,
    v3Visibility: 'initial',
  },
  {
    id: 'd-2',
    name: '공동 적금 3,000만 원은 어디로 갔고, 배우자 동의 없이 움직인 것인가',
    truth: true,
    truthDescription: '이준호는 공동 적금 3,000만 원을 형 계좌로 보냈고, 가족 구제 의도와 별개로 공동 자금을 독단 처분했다.',
    quadrant: 'b_only',
    requiredEvidence: ['e-5'],
    correctResponsibility: { a: 20, b: 80 },
    ambiguity: 'low',
    weight: 'high',
    mediationLink: '공동재산 독단 처분',
    legitimacyIssue: true,
    judgmentStatement: '공동 적금 3,000만 원 독단 이체는 남편 책임이 더 크다.',
    hidden: false,
    v3Visibility: 'initial',
  },
  {
    id: 'h-d3',
    name: '아내의 2,000만 원 송금은 자기방어인가, 이혼 대비 은닉인가',
    truth: true,
    truthDescription: '박지연의 2,000만 원 송금은 자기방어 심리와 이혼 대비 은닉 시도가 겹친 선택이었다.',
    quadrant: 'a_only',
    requiredEvidence: ['e-6'],
    correctResponsibility: { a: 75, b: 25 },
    ambiguity: 'high',
    weight: 'high',
    mediationLink: '자기방어와 은닉의 경계',
    legitimacyIssue: true,
    judgmentStatement: '2,000만 원 송금은 자기방어이면서 은닉 시도였다.',
    hidden: true,
    v3Visibility: 'hidden',
    unlockCondition: {
      requireEvidence: 'e-6',
    },
    v3UnlockPlan: {
      runtimeRule: 'e-6 제시 시 해금',
      authoredRule: 'e-6이 Excerpt 이상이 되거나 A에게 동기탐색 2회가 누적되면 생성',
    },
  },
  {
    id: 'h-d4',
    name: '누가 먼저 신뢰를 깼는가',
    truth: true,
    truthDescription: '숨김은 이준호가 먼저 시작했고 실제 비밀 송금은 박지연이 먼저 실행했다.',
    quadrant: 'shared_misconception',
    requiredEvidence: ['e-5', 'e-6', 'e-7'],
    correctResponsibility: { a: 50, b: 50 },
    ambiguity: 'high',
    weight: 'high',
    mediationLink: '숨김의 시작과 송금의 시작',
    legitimacyIssue: true,
    judgmentStatement: '숨김의 선후와 송금의 선후는 서로 다르다.',
    hidden: true,
    v3Visibility: 'hidden',
    unlockCondition: {
      requireDispute: { id: 'h-d3', minState: 'S1' },
      requireEvidence: 'e-7',
    },
    v3UnlockPlan: {
      runtimeRule: 'h-d3 해금 + e-7 제시 시 해금',
      authoredRule: 'h-d3 생성 후 e-7이 Original 이상이 되거나 e-5+e-6으로 Reframe Lead가 생기면 생성',
    },
  },
]

const evidence = [
  {
    id: 'e-1',
    name: '카드 명세서',
    surfaceName: '카드 명세서 1건',
    description: '생리대, 스타킹, 컵죽, 즉석국이 같은 생활권에서 반복 결제된 카드 내역이다.',
    surfaceDescription: '카드 명세서 1건 존재만 보인다.',
    type: 'bank',
    reliability: 'hard',
    completeness: 'original',
    provenance: 'institutional',
    legitimacy: 'lawful',
    proves: ['d-1'],
    isTrap: false,
    requires: [],
    investigationResults: {
      request_original: '카드앱 원본에는 여성용품과 간편식이 같은 오피스텔 근처에서 반복 결제된 기록이 날짜와 시각까지 남아 있다.',
      check_metadata: '반복 구매 자체는 사실이고, 외도 의심을 밀어 올리는 가장 강한 표면 단서가 된다.',
      restore_context: '후반에는 조카 돌봄을 위한 생필품과 식사 준비 흔적으로 다시 읽힌다.',
    },
    subjectParty: 'b',
    investigationStages: [
      stage(0, 'request_original', '이 카드 명세서, 본인 카드 사용 내역 맞습니까?', 'authenticity'),
      stage(1, 'check_metadata', '왜 같은 곳에서 여성용품과 간편식을 반복 결제했습니까?', 'context'),
      stage(2, 'restore_context', '이 결제 목적을 왜 배우자에게 설명하지 않았습니까?', 'responsibility'),
    ],
    partyContext: {
      a: { questionAngle: '왜 이 카드 명세서가 딴살림 확신으로 이어졌는지 설명해 주십시오.', implication: '외도 오해의 출발점이다.' },
      b: { questionAngle: '왜 이 결제 목적을 조카 돌봄이라고 바로 밝히지 못했는지 설명해 주십시오.', implication: '침묵이 더 큰 오해를 만들었다.' },
    },
    v3DepthPlan: [
      depthStage('stub', 'Stub', '카드 명세서 1건 존재만 보임'),
      depthStage('excerpt', 'Excerpt', '생리대, 스타킹, 컵죽, 즉석국 항목만 보임'),
      depthStage('original', 'Original', '날짜, 시각, 금액, 지점이 모두 보이는 전체 내역'),
      depthStage('context', 'Context', 'e-2, e-3와 같은 날 겹치는 흐름이 붙음'),
      depthStage('established', 'Established', '반복 구매 자체는 사실로 공식기록 채택'),
    ],
    v3TrustStates: [
      trustState('submitted', '제출됨', 'A가 캡처 제출'),
      trustState('verifying', '검증 중', '원본 제출 명령으로 전체 내역 확인'),
      trustState('authenticated', '인증됨', '카드앱 원본과 문자 시각이 일치'),
      trustState('challenged', '이의 제기됨', '품목만으로 외도 단정은 오독이라는 이의'),
      trustState('misread', '조작/오독 판정', '데이터는 인증되지만 외도 해석은 오독 가능'),
    ],
  },
  {
    id: 'e-2',
    name: '오피스텔 주차 출입 기록',
    surfaceName: '오피스텔 출입기록 1건',
    description: '평일 저녁 같은 오피스텔에 반복 진입한 주차 출입 기록이다.',
    surfaceDescription: '반복 진입 날짜 목록만 먼저 보인다.',
    type: 'log',
    reliability: 'hard',
    completeness: 'original',
    provenance: 'institutional',
    legitimacy: 'lawful',
    proves: ['d-1'],
    isTrap: false,
    requires: [],
    investigationResults: {
      request_original: '같은 차량 번호가 평일 저녁마다 같은 오피스텔에 들어간 기록이 원본대장에 남아 있다.',
      check_metadata: '체류 시간과 반복성 때문에 따로 챙기는 생활 동선처럼 읽힌다.',
      restore_context: '후반에는 외도 동선이 아니라 형네 돌봄 동선으로 재맥락화된다.',
    },
    subjectParty: 'b',
    investigationStages: [
      stage(0, 'request_original', '이 차량 출입 기록, 본인 차 맞습니까?', 'authenticity'),
      stage(1, 'check_metadata', '왜 퇴근 뒤마다 같은 오피스텔에 갔습니까?', 'context'),
      stage(2, 'restore_context', '그 방문 사실을 왜 집에서는 다른 말로 덮었습니까?', 'responsibility'),
    ],
    partyContext: {
      a: { questionAngle: '왜 같은 오피스텔 반복 방문이 외도 동선처럼 보였는지 설명해 주십시오.', implication: '장소 축이 의심을 굳혔다.' },
      b: { questionAngle: '왜 형네 돌봄이라는 실체 대신 방문 사실 자체를 숨겼는지 설명해 주십시오.', implication: '방문 목적보다 침묵이 먼저 문제화된다.' },
    },
    v3DepthPlan: [
      depthStage('stub', 'Stub', '출입기록 1건 존재만 보임'),
      depthStage('excerpt', 'Excerpt', '평일 저녁 반복 진입 날짜 목록'),
      depthStage('original', 'Original', '차량 번호와 진입/출차 시각, 체류 시간 확보'),
      depthStage('context', 'Context', 'e-1 결제와 e-3 통화 흐름이 붙음'),
      depthStage('established', 'Established', 'B의 반복 방문 사실이 공식기록 채택'),
    ],
    v3TrustStates: [
      trustState('submitted', '제출됨', 'A가 관리실 출력본 제출'),
      trustState('verifying', '검증 중', '원본대장과 차량번호 대조'),
      trustState('authenticated', '인증됨', 'B 차량번호와 일치'),
      trustState('challenged', '이의 제기됨', '외도 장소라고 단정할 수 없다는 이의'),
      trustState('misread', '조작/오독 판정', '장소 데이터는 인증되나 의미 해석은 열려 있음'),
    ],
  },
  {
    id: 'e-3',
    name: '새벽 통화기록',
    surfaceName: '같은 번호와의 반복 통화',
    description: '최근 3주 동안 새벽 5시 전후 같은 번호와 반복 통화한 내역이다.',
    surfaceDescription: '최근 3주 통화 횟수와 길이만 보인다.',
    type: 'log',
    reliability: 'hard',
    completeness: 'original',
    provenance: 'institutional',
    legitimacy: 'lawful',
    proves: ['d-1'],
    isTrap: false,
    requires: [],
    investigationResults: {
      request_original: '통신사 상세내역에는 새벽 5시 전후 같은 번호와 반복 통화한 로그가 남아 있다.',
      check_metadata: '같은 날 오피스텔 방문이 이어져 외도 연락처처럼 읽힌다.',
      restore_context: '후반에는 친형과의 비상 연락 패턴으로 재맥락화된다.',
    },
    subjectParty: 'b',
    investigationStages: [
      stage(0, 'request_original', '이 번호와 새벽마다 통화한 사실, 맞습니까?', 'authenticity'),
      stage(1, 'check_metadata', '왜 하필 새벽 다섯 시 전후에 같은 번호와 통화했습니까?', 'context'),
      stage(2, 'restore_context', '새벽 통화와 오피스텔 방문이 이어진 이유를 설명해 보십시오.', 'responsibility'),
    ],
    partyContext: {
      a: { questionAngle: '왜 이 새벽 통화가 외도 확신으로 이어졌는지 설명해 주십시오.', implication: '시간축 단서가 감정 서사를 완성했다.' },
      b: { questionAngle: '왜 같은 번호가 친형이라는 사실을 바로 밝히지 못했는지 설명해 주십시오.', implication: '번호의 정체를 숨긴 회피가 오해를 키웠다.' },
    },
    v3DepthPlan: [
      depthStage('stub', 'Stub', '같은 번호와의 반복 통화 존재 표시'),
      depthStage('excerpt', 'Excerpt', '최근 3주 새벽 통화 횟수와 길이만 보임'),
      depthStage('original', 'Original', '전체 통화 일시와 번호, 길이 확보'),
      depthStage('context', 'Context', 'e-2 방문과 e-1 결제가 같은 날 이어짐'),
      depthStage('established', 'Established', '반복 통화와 반복 방문의 연동이 공식기록 채택'),
    ],
    v3TrustStates: [
      trustState('submitted', '제출됨', 'A가 통화목록 캡처 제출'),
      trustState('verifying', '검증 중', '원본 제출 명령으로 상세내역 대조'),
      trustState('authenticated', '인증됨', '통신사 상세내역과 일치'),
      trustState('challenged', '이의 제기됨', '통화 상대 정체가 빠져 있다는 이의'),
      trustState('misread', '조작/오독 판정', '통화 자체는 인증되지만 외도 해석은 잠정 가설'),
    ],
  },
  {
    id: 'e-4',
    name: '형 문자 + 조카 학교 알림 문자',
    surfaceName: '같은 번호와의 문자 스레드',
    description: '같은 번호가 친형 번호이며 조카 돌봄 요청과 학교 알림이 붙어 있는 문자 스레드다.',
    surfaceDescription: '"오늘 혼자 있으니 밥 좀 부탁", "스타킹 하나만 사다 줘" 같은 문구만 일부 보인다.',
    type: 'chat',
    reliability: 'hard',
    completeness: 'original',
    provenance: 'self_possessed',
    legitimacy: 'lawful',
    proves: ['d-1'],
    isTrap: false,
    requires: ['e-3'],
    requiredLieState: 'S1',
    investigationResults: {
      request_original: '같은 번호가 친형 번호이고 조카 학교 알림까지 붙은 대화 원본이 이어져 있다.',
      check_metadata: '조카 돌봄 요청이 e-1과 e-2의 표면 패턴을 한 번에 다시 묶어 준다.',
      restore_context: '"제수씨는 우리 집 얘기만 나오면 또 싸움 난다"는 문장이 숨김의 이유를 드러낸다.',
    },
    subjectParty: 'b',
    investigationStages: [
      stage(0, 'request_original', '이 번호가 친형 번호라는 점, 맞습니까?', 'authenticity'),
      stage(1, 'check_metadata', '문자 속 부탁은 누구를 돌보라는 뜻이었습니까?', 'context'),
      stage(2, 'restore_context', '왜 배우자에게는 형네 사정을 끝까지 숨겼습니까?', 'responsibility'),
    ],
    partyContext: {
      a: { questionAngle: '왜 이 문자가 외도 정황을 가족 돌봄 정황으로 뒤집는지 설명해 주십시오.', implication: '표면 서사가 재맥락화된다.' },
      b: { questionAngle: '왜 형 사정을 말하지 않는 편을 택했는지 설명해 주십시오.', implication: '선의와 공포가 함께 드러나는 전환점이다.' },
    },
    meta: {
      redactions: ['조카 이름 비공개', '학교명 및 학년 마스킹', '생리 관련 직접 표현 봉인'],
    },
    v3DepthPlan: [
      depthStage('stub', 'Stub', '같은 번호와의 문자 스레드 존재만 보임'),
      depthStage('excerpt', 'Excerpt', '돌봄 요청 문구 일부만 보임'),
      depthStage('original', 'Original', '연락처가 친형으로 확인되고 학교 알림까지 연결됨'),
      depthStage('context', 'Context', '시댁 불화와 형의 장시간 노동 맥락 복원'),
      depthStage('established', 'Established', '오피스텔 방문 대상은 형네였다고 공식기록 채택 가능'),
    ],
    v3TrustStates: [
      trustState('submitted', '제출됨', 'B 발췌본 또는 재판관 포착'),
      trustState('verifying', '검증 중', '원본 제출 명령으로 전체 스레드 확인'),
      trustState('authenticated', '인증됨', '연락처, 날짜, 알림이 e-2, e-3와 부합'),
      trustState('challenged', '이의 제기됨', '형네 문자라고 해서 3,000만 원까지 정당화되진 않는다는 이의'),
      trustState('misread', '조작/오독 판정', '외도 서사를 뒤집는 맥락 증거로 전환'),
    ],
    v3SealTargets: ['조카 이름', '학교명', '학년', '생리 관련 직접 표현'],
  },
  {
    id: 'e-5',
    name: '공동 적금 해지 내역 + 형 계좌 이체',
    surfaceName: '공동 적금 해지 내역 1건',
    description: '공동 적금 3,000만 원 해지와 형 계좌 이체가 같은 날 붙은 기록이다.',
    surfaceDescription: '해지일과 3,000만 원 금액만 먼저 보인다.',
    type: 'bank',
    reliability: 'hard',
    completeness: 'original',
    provenance: 'institutional',
    legitimacy: 'lawful',
    proves: ['d-2', 'h-d4'],
    isTrap: false,
    requires: ['e-4'],
    requiredLieState: 'S2',
    investigationResults: {
      request_original: '공동 적금 3,000만 원 해지와 형 계좌 이체가 같은 날짜로 묶여 있다.',
      check_metadata: '돌봄이 생필품 수준을 넘어 공동 적금 전액 지출로 번졌다는 점이 확정된다.',
      restore_context: '가족 구제 의도와 별개로 공동 자금을 독단 처분한 월권 책임이 남는다.',
    },
    subjectParty: 'b',
    investigationStages: [
      stage(0, 'request_original', '이 적금, 두 분이 함께 모으던 돈 맞습니까?', 'authenticity'),
      stage(1, 'check_metadata', '해지한 3,000만 원을 누구에게 보냈습니까?', 'context'),
      stage(2, 'restore_context', '왜 배우자와 상의하지 않고 공동 적금을 깼습니까?', 'responsibility'),
    ],
    partyContext: {
      a: { questionAngle: '왜 이 거래가 공동재산 침범으로 읽히는지 설명해 주십시오.', implication: '외도 의심이 돈 문제로 번진 계기다.' },
      b: { questionAngle: '형을 돕는 일과 별개로 왜 공동 적금을 단독 처분했는지 설명해 주십시오.', implication: '선의와 월권이 한 장에 겹친다.' },
    },
    v3DepthPlan: [
      depthStage('stub', 'Stub', '공동 적금 해지 내역 1건 존재만 보임'),
      depthStage('excerpt', 'Excerpt', '해지일과 3,000만 원만 보임'),
      depthStage('original', 'Original', '형 계좌로 이체된 정확 내역까지 확인'),
      depthStage('context', 'Context', '형의 급한 빚 독촉 정황이 붙음'),
      depthStage('established', 'Established', 'B가 배우자 동의 없이 3,000만 원을 형에게 보냈다고 공식기록 채택'),
    ],
    v3TrustStates: [
      trustState('submitted', '제출됨', 'A가 통장내역 일부 제출'),
      trustState('verifying', '검증 중', '계좌 원본 조회와 앱 원본 확인'),
      trustState('authenticated', '인증됨', '해지와 이체가 동일 날짜로 확인'),
      trustState('challenged', '이의 제기됨', 'B가 빌려준 돈이라고 주장'),
      trustState('misread', '조작/오독 판정', '데이터는 인증되지만 사용 목적은 맥락과 심문으로 확정'),
    ],
  },
  {
    id: 'e-6',
    name: 'A의 투자방 카톡 + 2,000만 원 송금 영수증',
    surfaceName: 'A의 개인 송금 1건',
    description: '박지연이 "내 돈부터 지켜야겠다"는 말 뒤 2,000만 원을 보낸 투자방 카톡과 영수증이다.',
    surfaceDescription: '2,000만 원 송금 영수증과 "잠깐 넣어둘게" 문장만 일부 보인다.',
    type: 'chat',
    reliability: 'hard',
    completeness: 'original',
    provenance: 'self_possessed',
    legitimacy: 'lawful',
    proves: ['h-d3', 'h-d4'],
    isTrap: false,
    requires: ['e-5'],
    requiredLieState: 'S2',
    investigationResults: {
      request_original: '"남편이 바람이면 내 돈부터 지켜야겠다"는 메시지와 2,000만 원 송금 영수증이 함께 남아 있다.',
      check_metadata: '남편 진실이 확인되기 전 실행된 송금이라는 점이 문장과 시각으로 드러난다.',
      restore_context: '자기방어라고 말할 수 있지만 이혼 대비 은닉 심리와 사기 피해가 한 덩어리로 남는다.',
    },
    subjectParty: 'a',
    investigationStages: [
      stage(0, 'request_original', '이 2,000만 원 송금, 당신이 한 것 맞습니까?', 'authenticity'),
      stage(1, 'check_metadata', '"내 돈부터 지켜야겠다"고 말한 이유가 무엇입니까?', 'context'),
      stage(2, 'restore_context', '남편의 진실을 확인하기도 전에 돈을 옮긴 건 이혼 대비였습니까?', 'responsibility'),
    ],
    partyContext: {
      a: { questionAngle: '왜 이 송금이 자기방어를 넘어 비밀 은닉으로 읽히는지 설명해 주십시오.', implication: 'A의 선행 실행 책임을 드러낸다.' },
      b: { questionAngle: '왜 이 기록이 배우자에 대한 불신과 돈 선점의 시작으로 보이는지 설명해 주십시오.', implication: '외도 오해가 실제 자금 이동으로 바뀌는 지점이다.' },
    },
    v3DepthPlan: [
      depthStage('stub', 'Stub', 'A의 개인 송금 1건 존재만 보임'),
      depthStage('excerpt', 'Excerpt', '2,000만 원 영수증과 짧은 문장만 보임'),
      depthStage('original', 'Original', '발언, 링크, 송금 계좌 일치까지 확인'),
      depthStage('context', 'Context', '사기당한 뒤 숨긴 정황과 수치심이 복원됨'),
      depthStage('established', 'Established', 'A가 2,000만 원을 따로 움직였다가 잃었다고 공식기록 채택 가능'),
    ],
    v3TrustStates: [
      trustState('submitted', '제출됨', 'B가 존재를 문제 삼거나 A가 일부만 제출'),
      trustState('verifying', '검증 중', '분리심문(A)과 원본 제출 명령으로 대조'),
      trustState('authenticated', '인증됨', '채팅 시각과 송금 시각이 일치'),
      trustState('challenged', '이의 제기됨', '숨기려 한 건 맞지만 은닉은 아니었다는 이의'),
      trustState('misread', '조작/오독 판정', '사기 피해 자체는 인증되지만 자기방어인지 은닉인지는 열려 있음'),
    ],
  },
  {
    id: 'e-7',
    name: '통화·출입·계좌 이동 대조표',
    surfaceName: '비교 대조표 생성 가능',
    description: '통화, 방문, 적금 해지, 2,000만 원 송금을 한 장에 묶은 종합 대조표다.',
    surfaceDescription: 'B의 비밀 방문 시작과 A의 비밀 송금 시점의 거친 순서만 보인다.',
    type: 'log',
    reliability: 'hard',
    completeness: 'original',
    provenance: 'institutional',
    legitimacy: 'lawful',
    proves: ['h-d4'],
    isTrap: false,
    requires: ['e-5', 'e-6'],
    requiredLieState: 'S3',
    investigationResults: {
      request_original: '핵심 날짜와 시각이 한 장에 정리되어 숨김의 시작과 실행의 순서를 함께 보여 준다.',
      check_metadata: '숨김은 B가 먼저, 실제 송금 실행은 A가 먼저였다는 구조가 시간축으로 분리된다.',
      restore_context: '누가 먼저 배신했는가와 누가 먼저 돈을 움직였는가가 같은 질문이 아니라는 점이 확정된다.',
    },
    subjectParty: 'both',
    investigationStages: [
      stage(0, 'request_original', '이 대조표가 묶는 핵심 시점들, 모두 원자료와 일치합니까?', 'authenticity'),
      stage(1, 'check_metadata', '숨김의 시작과 실제 송금 실행의 순서가 어떻게 다릅니까?', 'context'),
      stage(2, 'restore_context', '누가 먼저 신뢰를 깼는지와 누가 먼저 돈을 움직였는지를 분리해서 설명해 보십시오.', 'responsibility'),
    ],
    partyContext: {
      a: { questionAngle: '왜 남편이 먼저 숨겼다는 말과 자신이 먼저 송금했다는 사실이 동시에 성립하는지 설명해 주십시오.', implication: '감정적 배신과 실행 책임이 갈라진다.' },
      b: { questionAngle: '왜 자신이 먼저 숨겼다는 점을 인정하면서도 송금 실행의 선후는 다르다고 말하는지 설명해 주십시오.', implication: '최종 책임 판단을 시간축으로 정리한다.' },
    },
    v3DepthPlan: [
      depthStage('stub', 'Stub', '비교 대조표 생성 가능 상태만 표시'),
      depthStage('excerpt', 'Excerpt', '비밀 방문 시작과 비밀 송금 시점의 거친 순서'),
      depthStage('original', 'Original', '정확한 날짜와 시각이 한 장으로 정리됨'),
      depthStage('context', 'Context', '각 시점의 핵심 발언과 심리 상태가 붙음'),
      depthStage('established', 'Established', '숨김은 B가 먼저, 실제 비밀 송금은 A가 먼저라는 시간축이 공식기록 채택 대상'),
    ],
    v3TrustStates: [
      trustState('submitted', '제출됨', '다른 증거 조합을 통해 생성되는 종합 자료'),
      trustState('verifying', '검증 중', 'e-1부터 e-6의 핵심 축이 인증될 때 생성'),
      trustState('authenticated', '인증됨', '기반 증거 4개 이상이 인증되면 표도 인증'),
      trustState('challenged', '이의 제기됨', 'A와 B 모두 순서가 의미 없다고 이의 가능'),
      trustState('misread', '조작/오독 판정', '표 자체는 조작 불가이고 해석은 Reframe 선택에 따라 달라짐'),
    ],
  },
]

const truthTable = [
  { id: 't-1', fact: 'B의 오피스텔 방문 대상은 외도 상대가 아니라 친형과 조카였다.', isTrue: true, weight: 10, quadrant: 'b_only' },
  { id: 't-2', fact: 'B는 공동 적금 3,000만 원을 배우자 동의 없이 형에게 보냈다.', isTrue: true, weight: 10, quadrant: 'b_only' },
  { id: 't-3', fact: 'A는 남편 외도를 확신한 뒤 2,000만 원을 따로 송금했다.', isTrue: true, weight: 9, quadrant: 'a_only' },
  { id: 't-4', fact: '숨김은 B가 먼저 시작했고 실제 비밀 송금은 A가 먼저 실행했다.', isTrue: true, weight: 9, quadrant: 'shared_misconception' },
  { id: 't-5', fact: '두 사람 모두 말 못할 이유가 있었지만 둘 다 공동 재산을 혼자 움직였다.', isTrue: true, weight: 8, quadrant: 'both_know' },
]

const lieConfigA = [
  {
    disputeId: 'h-d3',
    lieType: 'LT-2',
    lieIntensity: 'L2',
    lieMotive: 'self_protection',
    initialState: 'S0',
    collapseViaTrust: false,
    transitions: [
      { from: 'S0', to: 'S1', trigger: 'h-d3_a_denial_question' },
      { from: 'S1', to: 'S2', trigger: 'hard_evidence' },
      { from: 'S2', to: 'S3', trigger: 'e-6_presented' },
      { from: 'S3', to: 'S4', trigger: 'h-d3_a_divorce_preparation_question' },
      { from: 'S4', to: 'S5', trigger: 'h-d3_a_scam_confession' },
    ],
  },
  {
    disputeId: 'h-d4',
    lieType: 'LT-1',
    lieIntensity: 'L2',
    lieMotive: 'face_saving',
    initialState: 'S0',
    collapseViaTrust: true,
    transitions: [
      { from: 'S0', to: 'S1', trigger: 'h-d4_a_blame_question' },
      { from: 'S1', to: 'S2', trigger: 'hard_evidence' },
      { from: 'S2', to: 'S3', trigger: 'e-7_presented' },
      { from: 'S3', to: 'S4', trigger: 'h-d4_a_order_question' },
      { from: 'S4', to: 'S5', trigger: 'mirror_finance_confession' },
    ],
  },
]

const lieConfigB = [
  {
    disputeId: 'd-1',
    lieType: 'LT-6',
    lieIntensity: 'L2',
    lieMotive: 'self_protection',
    initialState: 'S0',
    collapseViaTrust: false,
    transitions: [
      { from: 'S0', to: 'S1', trigger: 'd-1_b_officetel_question' },
      { from: 'S1', to: 'S2', trigger: 'hard_evidence' },
      { from: 'S2', to: 'S3', trigger: 'e-4_presented' },
      { from: 'S3', to: 'S4', trigger: 'd-1_b_inlaw_conflict_question' },
      { from: 'S4', to: 'S5', trigger: 'd-1_b_caregiving_confession' },
    ],
  },
  {
    disputeId: 'd-2',
    lieType: 'LT-6',
    lieIntensity: 'L3',
    lieMotive: 'financial_preservation',
    initialState: 'S0',
    collapseViaTrust: false,
    transitions: [
      { from: 'S0', to: 'S1', trigger: 'd-2_b_minimize_question' },
      { from: 'S1', to: 'S2', trigger: 'hard_evidence' },
      { from: 'S2', to: 'S3', trigger: 'e-5_presented' },
      { from: 'S3', to: 'S4', trigger: 'd-2_b_beneficiary_question' },
      { from: 'S4', to: 'S5', trigger: 'd-2_b_hide_reason_question' },
    ],
  },
  {
    disputeId: 'h-d4',
    lieType: 'LT-1',
    lieIntensity: 'L2',
    lieMotive: 'face_saving',
    initialState: 'S0',
    collapseViaTrust: true,
    transitions: [
      { from: 'S0', to: 'S1', trigger: 'h-d4_b_betrayal_question' },
      { from: 'S1', to: 'S2', trigger: 'hard_evidence' },
      { from: 'S2', to: 'S3', trigger: 'e-7_presented' },
      { from: 'S3', to: 'S4', trigger: 'h-d4_b_reason_question' },
      { from: 'S4', to: 'S5', trigger: 'mirror_finance_confession' },
    ],
  },
]

const leadLines = [
  {
    id: 'L-1',
    name: 'Timeline Lead',
    leadType: 'Timeline',
    firstInputs: ['e-1', 'e-2'],
    secondInputs: ['L-1', 'e-4'],
    dossierCardId: 'dc-1',
    interpretationChoices: [
      interpretationChoice('L-1-A', '외도 동선이다', 'd-1을 외도 의심으로 밀어붙인다.'),
      interpretationChoice('L-1-B', '누군가를 돌보는 생활 동선이다', 'e-4 반전과 잘 이어진다.'),
      interpretationChoice('L-1-C', '단순 심부름일 수 있다', '판단을 유보한다.'),
    ],
  },
  {
    id: 'L-2',
    name: 'Context Lead',
    leadType: 'Context',
    firstInputs: ['e-3', 'stmt-b-family'],
    secondInputs: ['L-2', 'e-4', 'w-1-angle'],
    dossierCardId: 'dc-2',
    interpretationChoices: [
      interpretationChoice('L-2-A', '외도는 아니지만 창피해서 숨겼다', 'B의 수치심을 먼저 본다.'),
      interpretationChoice('L-2-B', '시댁 불화를 피하려 숨겼다', '관계 공포 축을 연다.'),
    ],
  },
  {
    id: 'L-3',
    name: 'Beneficiary Lead',
    leadType: 'Beneficiary',
    firstInputs: ['e-4', 'e-5'],
    secondInputs: ['L-3', 'stmt-b-repay', 'w-1-angle'],
    dossierCardId: 'dc-3',
    interpretationChoices: [
      interpretationChoice('L-3-A', '형네를 실제로 살리려 한 돈이다', '선의와 구제 논리를 본다.'),
      interpretationChoice('L-3-B', '형의 무책임을 대신 떠안은 월권이다', '공동재산 책임을 본다.'),
    ],
  },
  {
    id: 'L-4',
    name: 'Emotion Lead',
    leadType: 'Emotion',
    firstInputs: ['e-6', 'stmt-a-protect'],
    secondInputs: ['L-4', 'w-3-angle'],
    dossierCardId: 'dc-4',
    interpretationChoices: [
      interpretationChoice('L-4-A', '배신 공포 속 자기방어다', 'A의 공포를 먼저 본다.'),
      interpretationChoice('L-4-B', '이혼 대비 은닉이다', 'A의 계산을 먼저 본다.'),
    ],
  },
  {
    id: 'L-5',
    name: 'Reframe Lead',
    leadType: 'Reframe',
    firstInputs: ['e-5', 'e-6'],
    secondInputs: ['L-5', 'e-7'],
    dossierCardId: 'dc-5',
    interpretationChoices: [
      interpretationChoice('L-5-A', '남편이 더 큰돈을 먼저 무너뜨렸다', '금액 크기 기준 책임 서사다.'),
      interpretationChoice('L-5-B', '아내가 먼저 돈을 움직여 신뢰를 깼다', '실행 순서 기준 책임 서사다.'),
      interpretationChoice('L-5-C', '거울형 거짓말 구조다', '상호 붕괴와 대칭 구조를 본다.'),
    ],
  },
]

const authorityPlacements = [
  { action: '원본 제출 명령', recommendedMoment: 'd-1 초반 e-1/e-3 Excerpt 시점', purpose: '감정이 아니라 패턴으로 의심을 고정' },
  { action: '원본 제출 명령', recommendedMoment: 'e-4 등장 직후', purpose: '형 문자와 조카 알림을 원본으로 확보' },
  { action: '원본 제출 명령', recommendedMoment: 'h-d3 등장 직후 e-6 축', purpose: 'A의 2,000만 원 송금을 확정' },
  { action: '정확히 답변하십시오', recommendedMoment: 'B가 "가족 쪽 일" 같은 모호어를 반복할 때', purpose: '형, 조카, 3,000만 원 같은 실체 명사 강제' },
  { action: '분리심문', recommendedMoment: 'e-4 Original 직후 B', purpose: 'avoidant인 B를 더 빨리 무너뜨림' },
  { action: '분리심문', recommendedMoment: 'e-6 Excerpt 직후 A', purpose: 'A의 피해자 프레임을 줄이고 동기를 드러냄' },
  { action: '잠정 인정', recommendedMoment: 'e-4 인증 후', purpose: '오피스텔 방문 대상은 형네였다고 기록' },
  { action: '잠정 인정', recommendedMoment: 'e-5 인증 후', purpose: '공동 적금 3,000만 원 이동 기록' },
  { action: '잠정 인정', recommendedMoment: 'e-6 인증 후', purpose: 'A의 2,000만 원 송금 기록' },
  { action: '잠정 인정', recommendedMoment: 'e-7 Established 후', purpose: '숨김 시작과 송금 실행의 선후 분리 기록' },
  { action: '선처 창구', recommendedMoment: 'dc-3 또는 dc-4 직후', purpose: 'B는 죄책감, A는 수치심을 더 빨리 인정' },
  { action: '발언 제지 / 기록 제외', recommendedMoment: 'A가 딴살림 단정만 반복하거나 B가 A를 조롱할 때', purpose: '프레임 싸움을 줄이고 공식기록과 가설을 분리' },
  { action: '민감정보 봉인 해제', recommendedMoment: '돌봄 해석을 택했지만 실체가 부족할 때 또는 dc-1 직전', purpose: '외도 오해를 확실히 꺾되 미성년자 사생활 리스크 관리' },
]

const runtimeCase = {
  caseId: RUNTIME_CASE_ID,
  sensitivityTags: ['minor_privacy', 'health_privacy', 'family_debt', 'shared_finance'],
  meta: {
    relationshipType: 'spouse',
    conflictSeed: 'TE-SpouseV301',
    variableModules: ['VM-spouse-v3-a', 'VM-spouse-v3-b'],
    twistModule: 'TW-spouse-v3-1',
    difficulty: 'hard',
    anchorTruth: ANCHOR_TRUTH,
    emotionalBait: '카드 결제, 오피스텔 출입, 새벽 통화가 모두 외도처럼 보이지만 그 끝에는 가족 돌봄과 거울형 비밀 송금이 함께 걸려 있다.',
    resolutionDilemma: DILEMMA,
  },
  duo: {
    duoId: `duo-${CASE_ID}`,
    relationshipType: 'spouse',
    partyA: {
      id: 'a',
      name: '박지연',
      age: 36,
      occupation: '학원 데스크 직원',
      incomeBracket: 'mid',
      archetype: 'victim_cosplay',
      speechStyle: '배신당한 사람이라는 위치를 먼저 잡고 말하지만, 동기 질문이 들어오면 수치심과 불안을 핑계로 설명 범위를 넓힌다.',
      pride: 6,
      fear: '외도가 아니었는데도 자신이 먼저 2,000만 원을 움직였다는 실행 책임이 중심으로 굳는 것을 두려워한다.',
      riskAppetite: 5,
      digitalHabit: 'messenger_main',
      dailyRoutine: '학원 마감 뒤 집에 돌아와 카드 내역과 통화기록을 반복해 확인하며 남편이 먼저 가정을 버릴지 모른다는 불안을 키웠다.',
      sensitivePoints: ['오피스텔 출입과 새벽 통화는 딴살림 흔적인가', '아내의 2,000만 원 송금은 자기방어인가, 이혼 대비 은닉인가', '누가 먼저 신뢰를 깼는가'],
      verbalTells: [
        { type: 'victim_frame', trigger: 'cornered', pattern: '자신도 이미 배신당한 사람처럼 먼저 위치를 잡는다.' },
        { type: 'helplessness', trigger: 'shame', pattern: '그때는 다른 선택이 없었다는 말로 계산된 선택의 각도를 흐린다.' },
        { type: 'soft_confession', trigger: 'shame', pattern: '작은 인정부터 꺼내고 가장 수치스러운 사실은 마지막에 말한다.' },
      ],
      callTerms: {
        toPartner: '자기',
        toJudge: '제 남편',
        angry: '이준호!',
      },
      pcFaceType: 'woman',
    },
    partyB: {
      id: 'b',
      name: '이준호',
      age: 38,
      occupation: '가전매장 직원',
      incomeBracket: 'mid',
      archetype: 'avoidant',
      speechStyle: '사실을 완전히 부정하기보다 중요한 이유를 뒤로 미루고, 모호어로 시간을 벌다가 압박이 누적되면 한꺼번에 털어놓는다.',
      pride: 6,
      fear: '형네를 숨긴 이유와 공동 적금 3,000만 원 이체가 한 덩어리로 묶여 자기 책임만 남는 상황을 두려워한다.',
      riskAppetite: 4,
      digitalHabit: 'minimal',
      dailyRoutine: '매장 마감 뒤 형네 오피스텔에 들러 조카 저녁과 생필품을 챙기고 새벽에는 형 사정을 확인한 뒤 집으로 돌아왔다.',
      sensitivePoints: ['오피스텔 출입과 새벽 통화는 딴살림 흔적인가', '공동 적금 3,000만 원은 어디로 갔고 배우자 동의 없이 움직인 것인가', '누가 먼저 신뢰를 깼는가'],
      verbalTells: [
        { type: 'answer_delay', trigger: 'avoiding', pattern: '질문을 바로 받지 않고 한 박자 늦게 받아 핵심어를 피한다.' },
        { type: 'partial_scope', trigger: 'cornered', pattern: '큰 사실은 인정하되 가장 아픈 이유는 마지막까지 자른다.' },
        { type: 'minimize_harm', trigger: 'defensive', pattern: '선의였다는 말로 절차 위반의 무게를 먼저 낮추려 한다.' },
      ],
      callTerms: {
        toPartner: '자기',
        toJudge: '제 아내',
        angry: '박지연!',
      },
      pcFaceType: 'man',
    },
    relationshipLedger: [
      {
        id: 'ledger-1',
        category: 'distorted',
        description: '카드 결제, 오피스텔, 새벽 통화가 겹치며 d-1은 외도 의심 프레임으로 굳어졌다.',
        isReal: true,
        whoRemembersAccurately: 'neither',
        whoDistorts: 'both',
        distortionDirection: 'A는 외도 쪽으로, B는 숨김 이유를 말하지 않은 채 생활 패턴만 분리해 기억한다.',
        currentlyResolved: 'surface_only',
        emotionalResidue: 'strong',
        connectionToCurrent: 'direct',
      },
      {
        id: 'ledger-2',
        category: 'silenced',
        description: '시댁 이야기가 나오면 크게 부딪힌다는 기억 때문에 B는 형네 사정을 말하지 않는 쪽을 택했다.',
        isReal: true,
        whoRemembersAccurately: 'both',
        whoDistorts: 'none',
        distortionDirection: '',
        currentlyResolved: 'unresolved',
        emotionalResidue: 'strong',
        connectionToCurrent: 'direct',
      },
      {
        id: 'ledger-3',
        category: 'silenced',
        description: 'B는 공동 적금 3,000만 원을 형에게 보냈고, A는 2,000만 원을 투자방으로 보냈다가 잃었다.',
        isReal: true,
        whoRemembersAccurately: 'both',
        whoDistorts: 'none',
        distortionDirection: '',
        currentlyResolved: 'surface_only',
        emotionalResidue: 'strong',
        connectionToCurrent: 'direct',
      },
      {
        id: 'ledger-4',
        category: 'confirmed',
        description: '숨김의 시작과 실제 송금 실행의 순서는 서로 다르다.',
        isReal: true,
        whoRemembersAccurately: 'both',
        whoDistorts: 'both',
        distortionDirection: '각자 자기에게 유리한 선후만 먼저 강조한다.',
        currentlyResolved: 'unresolved',
        emotionalResidue: 'strong',
        connectionToCurrent: 'direct',
      },
    ],
    socialGraph: [
      {
        id: 'w-1',
        slot: 'family_1',
        name: '이성호',
        relationTo: 'b',
        knowledgeScope: '제수씨에게 말하지 말라고 먼저 부탁했고 빚 독촉과 장시간 노동 때문에 집을 자주 비웠다는 사실을 직접 안다.',
        witnessedDirectly: true,
        bias: 'pro_b',
        distortionRisk: 'strategic',
        surfaceKnowledge: '형네 사정과 이준호의 방문 이유를 알고 있는 가족 증인이다.',
        relatedDisputeIds: ['d-1', 'd-2', 'h-d4'],
        witnessProfile: {
          age: 43,
          occupation: '택배 상하차',
          relationToA: '시댁 식구로 알고 지냈지만 자주 부딪힌 사이다.',
          relationToB: '친형이다.',
          sentimentToA: -20,
          sentimentToB: 70,
          speechStyle: '생활 사정은 빠르게 털어놓지만 동생 책임을 직접 묻는 질문에는 한 박자 늦게 답한다.',
          addressJudge: '재판관님',
          addressA: '지연 씨',
          addressB: '준호야',
          hiddenAgenda: '동생이 적금까지 깬 책임은 줄여 보이고 싶어 한다.',
        },
      },
      {
        id: 'w-2',
        slot: 'family_2',
        name: '이가은',
        relationTo: 'b',
        knowledgeScope: '삼촌이 저녁마다 와서 밥을 해 주고 생리대와 스타킹, 죽을 사다 준 이유를 가장 직관적으로 설명할 수 있다.',
        witnessedDirectly: true,
        bias: 'pro_b',
        distortionRisk: 'accurate',
        surfaceKnowledge: '오피스텔 방문의 실제 저녁 풍경을 기억하는 조카 증인이다.',
        relatedDisputeIds: ['d-1'],
        witnessProfile: {
          age: 15,
          occupation: '중학생',
          relationToA: '가끔 명절에만 보던 큰어른이다.',
          relationToB: '삼촌이다.',
          sentimentToA: -5,
          sentimentToB: 80,
          speechStyle: '짧고 구체적으로 말하고 부끄러운 내용은 직접 표현을 피한다.',
          addressJudge: '재판관님',
          addressA: '아주머니',
          addressB: '삼촌',
          hiddenAgenda: '학교와 몸 상태 얘기는 자세히 말하고 싶지 않다.',
        },
      },
      {
        id: 'w-3',
        slot: 'acquaintance_1',
        name: '박미라',
        relationTo: 'a',
        knowledgeScope: '박지연이 먼저 "남편이 바람이면 내 돈부터 지켜야겠다"고 말했고 자신이 투자방 링크를 보낸 사실을 안다.',
        witnessedDirectly: true,
        bias: 'pro_a',
        distortionRisk: 'strategic',
        surfaceKnowledge: '2,000만 원 송금 직전 박지연과 직접 대화한 동네 지인이다.',
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
          hiddenAgenda: '자신이 링크를 보낸 책임이 불거질까 봐 표현을 조심한다.',
        },
      },
    ],
  },
  context: {
    contextType: 'marital_finance_reframe',
    description: HOOK,
    emotionalPressure: 9,
    affects: 'both',
    triggerAmplifier: MID_TWIST,
    caseNumber: 'TE-SpouseV301',
    caseName: TITLE,
  },
  disputes,
  evidence,
  evidenceCombinations: [
    { requires: ['e-1', 'e-2'], upgradesTo: 'hard', proves: ['d-1'] },
    { requires: ['e-3', 'e-4'], upgradesTo: 'hard', proves: ['d-1'] },
    { requires: ['e-4', 'e-5'], upgradesTo: 'hard', proves: ['d-2'] },
    { requires: ['e-5', 'e-6'], upgradesTo: 'hard', proves: ['h-d4'] },
    { requires: ['e-6', 'e-7'], upgradesTo: 'hard', proves: ['h-d3', 'h-d4'] },
  ],
  truthTable,
  lieConfigA,
  lieConfigB,
  solutions: {
    공동재산회복: [
      '공동 적금 3,000만 원과 2,000만 원 송금의 흐름을 분리 정리하고 회수 가능 금액과 손실액을 다시 맞춘다.',
      '형네 지원은 부부 공동재산과 분리된 별도 합의 절차로만 허용한다.',
    ],
    신뢰순서분리: [
      '숨김의 시작과 실제 송금 실행의 순서를 분리해 기록하고 감정적 배신과 실행 책임을 따로 판단한다.',
      '시댁 관련 대화 규칙과 공동재산 사전 동의 규칙을 동시에 다시 세운다.',
    ],
    봉인정보경계: [
      '미성년자 정보와 건강 관련 민감정보는 필요한 범위까지만 해제한다.',
      '외도 오해는 해소하되 가족 돌봄과 공동재산 월권은 별도 책임으로 남긴다.',
    ],
  },
  activeLedgerEntries: ['ledger-1', 'ledger-2', 'ledger-3', 'ledger-4'],
  activeThirdParties: ['w-1', 'w-2', 'w-3'],
  baseEvidenceIds: ['e-1', 'e-2', 'e-3'],
  monetaryDisputeIds: ['d-2', 'h-d3', 'h-d4'],
  combinationLab: {
    analysisPointsBase: 5,
    analysisPointRefundOnFirstHidden: 1,
    nodes: [
      evidenceNode('e-1', 'e-1 카드 명세서', ['d-1']),
      evidenceNode('e-2', 'e-2 오피스텔 출입 기록', ['d-1']),
      evidenceNode('e-3', 'e-3 새벽 통화기록', ['d-1']),
      evidenceNode('e-4', 'e-4 형 문자 + 조카 학교 알림', ['d-1']),
      evidenceNode('e-5', 'e-5 공동 적금 해지 + 형 계좌 이체', ['d-2', 'h-d4']),
      evidenceNode('e-6', 'e-6 투자방 카톡 + 2,000만 원 송금', ['h-d3', 'h-d4']),
      evidenceNode('e-7', 'e-7 통화·출입·계좌 이동 대조표', ['h-d4']),
      statementNode('stmt-b-family', 'B의 발언 "가족 쪽 일입니다"', ['d-1']),
      statementNode('stmt-b-repay', 'B의 발언 "형이 곧 갚는다고 했습니다"', ['d-2']),
      statementNode('stmt-a-protect', 'A의 발언 "혹시 모르니까 제 몫을 지키려 했어요"', ['h-d3']),
      witnessAngleNode('w-1-angle', 'w-1 이성호 증언 축', ['d-1', 'd-2']),
      witnessAngleNode('w-3-angle', 'w-3 박미라 증언 축', ['h-d3']),
      derivedNode('L-1', 'L-1 Timeline Lead', ['d-1'], ['e-1', 'e-2']),
      derivedNode('L-2', 'L-2 Context Lead', ['d-1'], ['e-3', 'e-4']),
      derivedNode('L-3', 'L-3 Beneficiary Lead', ['d-2'], ['e-4', 'e-5']),
      derivedNode('L-4', 'L-4 Emotion Lead', ['h-d3'], ['e-6']),
      derivedNode('L-5', 'L-5 Reframe Lead', ['h-d4'], ['e-5', 'e-6', 'e-7']),
      derivedNode('dc-1', 'dc-1 오피스텔의 사람들', ['d-1', 'h-d4'], ['e-2', 'e-4']),
      derivedNode('dc-2', 'dc-2 시댁 얘기만 나오면 싸움', ['d-1'], ['e-3', 'e-4']),
      derivedNode('dc-3', 'dc-3 3,000만 원의 권한', ['d-2'], ['e-4', 'e-5']),
      derivedNode('dc-4', 'dc-4 2,000만 원의 수치', ['h-d3'], ['e-6']),
      derivedNode('dc-5', 'dc-5 5,000만 원의 순서', ['h-d4'], ['e-5', 'e-6', 'e-7']),
    ],
    outputs: leadLines.map((lead) => ({
      id: lead.id,
      label: `${lead.id} ${lead.name}`,
      summary: `${lead.leadType} 리드`,
      nodeType: 'derived_note',
      noteText: lead.name,
      judgeHint: `후속 카드 ${lead.dossierCardId}와 연결된다.`,
      effects: [{ kind: 'unlock_note', unlockNodeId: lead.id }],
    })).concat([
      { id: 'dc-1', label: 'dc-1 오피스텔의 사람들', summary: '외도 오해를 형네 돌봄으로 뒤집는 카드', nodeType: 'derived_note', noteText: '오피스텔의 사람들', effects: [{ kind: 'unlock_note', unlockNodeId: 'dc-1' }] },
      { id: 'dc-2', label: 'dc-2 시댁 얘기만 나오면 싸움', summary: '숨김의 이유를 시댁 불화 공포로 정리하는 카드', nodeType: 'derived_note', noteText: '시댁 얘기만 나오면 싸움', effects: [{ kind: 'unlock_note', unlockNodeId: 'dc-2' }] },
      { id: 'dc-3', label: 'dc-3 3,000만 원의 권한', summary: '공동 적금 독단 처분 책임을 묻는 카드', nodeType: 'derived_note', noteText: '3,000만 원의 권한', effects: [{ kind: 'unlock_note', unlockNodeId: 'dc-3' }] },
      { id: 'dc-4', label: 'dc-4 2,000만 원의 수치', summary: 'A의 2,000만 원 송금 동기를 묻는 카드', nodeType: 'derived_note', noteText: '2,000만 원의 수치', effects: [{ kind: 'unlock_note', unlockNodeId: 'dc-4' }, { kind: 'unlock_dispute', unlockNodeId: 'h-d3' }] },
      { id: 'dc-5', label: 'dc-5 5,000만 원의 순서', summary: '숨김의 시작과 실제 송금 실행을 분리하는 카드', nodeType: 'derived_note', noteText: '5,000만 원의 순서', effects: [{ kind: 'unlock_note', unlockNodeId: 'dc-5' }, { kind: 'unlock_dispute', unlockNodeId: 'h-d4' }] },
    ]),
    recipes: [
      { id: 'lead-1', inputs: ['e-1', 'e-2'], cost: 1, discoveryText: '같은 장소와 반복 패턴이 겹친다.', outputId: 'L-1' },
      { id: 'dossier-1', inputs: ['L-1', 'e-4'], cost: 1, discoveryText: '오피스텔의 대상이 형네였다는 카드가 열린다.', outputId: 'dc-1' },
      { id: 'lead-2', inputs: ['e-3', 'stmt-b-family'], cost: 1, discoveryText: '숨김의 이유를 묻는 맥락 리드가 생긴다.', outputId: 'L-2' },
      { id: 'dossier-2', inputs: ['L-2', 'e-4'], cost: 1, discoveryText: '시댁 얘기만 나오면 싸움이라는 카드가 완성된다.', outputId: 'dc-2' },
      { id: 'lead-3', inputs: ['e-4', 'e-5'], cost: 1, discoveryText: '3,000만 원의 수혜자를 묻는 리드가 생긴다.', outputId: 'L-3' },
      { id: 'dossier-3', inputs: ['L-3', 'stmt-b-repay'], cost: 1, discoveryText: '3,000만 원의 권한을 묻는 카드가 열린다.', outputId: 'dc-3' },
      { id: 'lead-4', inputs: ['e-6', 'stmt-a-protect'], cost: 1, discoveryText: 'A의 2,000만 원 송금을 감정 축으로 묶는 리드가 생긴다.', outputId: 'L-4' },
      { id: 'dossier-4', inputs: ['L-4', 'w-3-angle'], cost: 1, discoveryText: '2,000만 원의 수치를 직접 묻는 카드가 열린다.', outputId: 'dc-4' },
      { id: 'lead-5', inputs: ['e-5', 'e-6'], cost: 1, discoveryText: '부부 돈 5,000만 원을 한 프레임에 묶는 리드가 생긴다.', outputId: 'L-5' },
      { id: 'dossier-5', inputs: ['L-5', 'e-7'], cost: 1, discoveryText: '5,000만 원의 순서를 따지는 카드가 완성된다.', outputId: 'dc-5' },
    ],
  },
  v3Design: {
    evidenceAxisLegend: { depthStages: evidenceDepthLegend, trustStates: evidenceTrustLegend },
    hiddenDisputes: disputes.filter((item) => item.hidden).map((item) => ({ id: item.id, name: item.name, unlockPlan: item.v3UnlockPlan })),
    leadLines,
    authorityPlacements,
    sensitiveSealTargets: [
      {
        evidenceId: 'e-4',
        targets: ['조카 이름', '학교명', '학년', '생리 관련 직접 표현'],
        risk: '미성년자 사생활을 너무 일찍 열면 인도성 점수 하락과 B의 추가 셧다운이 발생할 수 있다.',
      },
    ],
    officialRecordRecommendations: [
      'B의 오피스텔 방문 대상은 형과 조카였다.',
      'B는 공동 적금 3,000만 원을 배우자 동의 없이 형에게 보냈다.',
      'A는 남편 외도를 확신한 뒤 2,000만 원을 따로 송금했다.',
      '숨김은 B가 먼저 시작했고 실제 비밀 송금은 A가 먼저 실행했다.',
      '두 사람 모두 말 못할 이유가 있었지만 둘 다 공동 재산을 혼자 움직였다.',
    ],
  },
}
const v3 = {
  caseId: CASE_ID,
  dossierCards: [
    {
      id: 'dc-1',
      name: '오피스텔의 사람들',
      description: '외도 서사를 가족 돌봄 서사로 뒤집는 첫 반전 카드다.',
      evidenceIds: ['e-2', 'e-4'],
      relatedDisputes: ['d-1', 'h-d4'],
      subjectParty: 'b',
      leadId: 'L-1',
      successConditionSummary: ['e-4가 Original 이상', 'B에게 공감접근 또는 분리심문 사용'],
      successEffects: ['d-1 핵심 사실 "외도 아님" 잠정 인정 가능', 'B가 시댁 불화와 조카 사정을 직접 언급'],
      challenges: [
        {
          targetParty: 'b',
          questions: [
            dossierQuestion({
              id: 'dc-1.b.q1',
              text: '그 오피스텔에 있던 사람이 외도 상대가 아니라 형과 조카라면, 왜 지금까지 한마디도 못 했습니까?',
              attackVector: 'context',
              requiredLieState: 'S2',
              revealAtom: `${CASE_ID}:b:d-1:S3:0`,
              lockedHint: '형 문자와 조카 알림이 원본 수준까지 열려야 질문이 보인다.',
            }),
          ],
        },
      ],
    },
    {
      id: 'dc-2',
      name: '시댁 얘기만 나오면 싸움',
      description: '왜 숨겼는가를 외도 은폐가 아니라 시댁 불화 공포로 정리하는 카드다.',
      evidenceIds: ['e-3', 'e-4'],
      relatedDisputes: ['d-1'],
      subjectParty: 'b',
      leadId: 'L-2',
      successConditionSummary: ['L-2 완성', '정확히 답변하십시오 사용 또는 B의 모호어 제거 상태'],
      successEffects: ['d-1의 왜 숨겼나 칸이 채워진다', '민감정보 봉인 해제 없이도 시댁 불화 맥락 일부 확보'],
      challenges: [
        {
          targetParty: 'b',
          questions: [
            dossierQuestion({
              id: 'dc-2.b.q1',
              text: '숨긴 이유가 외도가 아니라면, 당신은 아내보다 시댁과의 싸움을 더 두려워한 겁니까?',
              attackVector: 'context',
              requiredLieState: 'S3',
              revealAtom: `${CASE_ID}:b:d-1:S4:1`,
              lockedHint: 'B가 모호어를 버리고 숨김의 이유를 설명하기 시작해야 열린다.',
            }),
          ],
        },
      ],
    },
    {
      id: 'dc-3',
      name: '3,000만 원의 권한',
      description: '공동 적금 3,000만 원을 혼자 형에게 보낼 권리가 있었는지 정면으로 묻는 카드다.',
      evidenceIds: ['e-4', 'e-5'],
      relatedDisputes: ['d-2'],
      subjectParty: 'b',
      leadId: 'L-3',
      successConditionSummary: ['L-3 완성', 'e-5가 Original 이상'],
      successEffects: ['d-2가 S4~S5로 진전', 'B가 빚 상환 이유와 자기정당화의 한계를 함께 인정'],
      challenges: [
        {
          targetParty: 'b',
          questions: [
            dossierQuestion({
              id: 'dc-3.b.q1',
              text: '공동 적금 3,000만 원을 형에게 줄 권리가 정말 당신 혼자에게 있었습니까?',
              attackVector: 'authenticity',
              requiredLieState: 'S3',
              revealAtom: `${CASE_ID}:b:d-2:S4:0`,
              lockedHint: '3,000만 원 해지와 형 계좌 이체가 원본 수준까지 열려야 보인다.',
            }),
            dossierQuestion({
              id: 'dc-3.b.q2',
              text: '가족을 돕는 일이었다 해도, 배우자 동의 없이 공동 적금을 깬 책임은 인정합니까?',
              attackVector: 'context',
              requiredLieState: 'S4',
              revealAtom: `${CASE_ID}:b:d-2:S5:0`,
              lockedHint: 'B가 3,000만 원 전액 이체 사실을 이미 인정해야 마지막 질문이 열린다.',
            }),
          ],
        },
      ],
    },
    {
      id: 'dc-4',
      name: '2,000만 원의 수치',
      description: 'A가 남편의 진실을 확인하기도 전에 2,000만 원을 옮긴 이유를 정면으로 묻는 카드다.',
      evidenceIds: ['e-6'],
      relatedDisputes: ['h-d3'],
      subjectParty: 'a',
      leadId: 'L-4',
      successConditionSummary: ['L-4 완성', 'A에게 동기탐색 누적 2회 이상'],
      successEffects: ['h-d3가 생성되거나 심화', 'A의 수치심과 사기 피해 고백이 열린다'],
      challenges: [
        {
          targetParty: 'a',
          questions: [
            dossierQuestion({
              id: 'dc-4.a.q1',
              text: '남편의 진실을 확인하기도 전에 2,000만 원을 먼저 움직인 이유가, 결국 이혼 대비였습니까?',
              attackVector: 'context',
              requiredLieState: 'S2',
              revealAtom: `${CASE_ID}:a:h-d3:S3:0`,
              lockedHint: '2,000만 원 송금 축과 A의 방어 발언이 함께 붙어야 열린다.',
            }),
            dossierQuestion({
              id: 'dc-4.a.q2',
              text: '그 2,000만 원을 보내고 사기당한 사실까지 숨긴 건 결국 수치심 때문이었습니까?',
              attackVector: 'authenticity',
              requiredLieState: 'S3',
              revealAtom: `${CASE_ID}:a:h-d3:S4:0`,
              lockedHint: 'A가 송금 동기를 어느 정도 인정해야 두 번째 질문이 열린다.',
            }),
          ],
        },
      ],
    },
    {
      id: 'dc-5',
      name: '5,000만 원의 순서',
      description: '누가 먼저 숨겼는지와 누가 먼저 돈을 움직였는지를 같은 질문 안에서 분리해 묻는 최종 카드다.',
      evidenceIds: ['e-5', 'e-6', 'e-7'],
      relatedDisputes: ['h-d4'],
      subjectParty: 'both',
      leadId: 'L-5',
      successConditionSummary: ['L-5 완성', 'e-7이 Original 이상'],
      successEffects: ['h-d4 해금', '평의의 무슨 일이 있었나와 왜 숨겼나 두 칸이 함께 채워진다'],
      challenges: [
        {
          targetParty: 'b',
          questions: [
            dossierQuestion({
              id: 'dc-5.b.q1',
              text: '숨김은 누가 먼저 시작했고, 돈은 누가 먼저 움직였습니까?',
              attackVector: 'authenticity',
              requiredLieState: 'S2',
              revealAtom: `${CASE_ID}:b:h-d4:S3:0`,
              lockedHint: 'e-7 시간축이 열려야 순서 질문이 가능하다.',
            }),
          ],
        },
        {
          targetParty: 'a',
          questions: [
            dossierQuestion({
              id: 'dc-5.a.q1',
              text: '남편이 먼저 숨겼다고 해도, 실제 비밀 송금 실행은 당신이 먼저였다는 점까지 인정합니까?',
              attackVector: 'context',
              requiredLieState: 'S2',
              revealAtom: `${CASE_ID}:a:h-d4:S3:0`,
              lockedHint: 'A가 2,000만 원 송금을 일부 인정한 뒤에야 열린다.',
            }),
          ],
        },
      ],
    },
  ],
  stateUnlockAtoms: {
    a: {
      'd-1': {},
      'd-2': {},
      'h-d3': {
        S3: [atom(`${CASE_ID}:a:h-d3:S3:0`, 'S3', '박지연은 남편이 바람이라고 믿었고 그래서 자기 몫을 먼저 지켜야 한다는 마음으로 2,000만 원을 움직였다고 인정한다.', ['thread-g', CASE_ID, 'h-d3', 'dc-4'])],
        S4: [atom(`${CASE_ID}:a:h-d3:S4:0`, 'S4', '박지연은 2,000만 원 송금에 자기방어와 이혼 대비 은닉 심리가 함께 얽혀 있었다고 인정한다.', ['thread-g', CASE_ID, 'h-d3', 'dc-4'])],
      },
      'h-d4': {
        S3: [atom(`${CASE_ID}:a:h-d4:S3:0`, 'S3', '박지연은 남편이 먼저 숨긴 건 맞지만 실제 비밀 송금 실행은 자신 쪽이 먼저였다는 점을 받아들이기 시작한다.', ['thread-g', CASE_ID, 'h-d4', 'dc-5'])],
      },
    },
    b: {
      'd-1': {
        S3: [atom(`${CASE_ID}:b:d-1:S3:0`, 'S3', '이준호는 형네 돌봄 사실을 시댁 불화가 다시 터질까 봐 차마 말하지 못했다고 인정한다.', ['thread-g', CASE_ID, 'd-1', 'dc-1'])],
        S4: [atom(`${CASE_ID}:b:d-1:S4:1`, 'S4', '이준호는 숨김의 이유가 외도 은폐가 아니라 시댁 불화와 체면 공포였다고 더 분명하게 말한다.', ['thread-g', CASE_ID, 'd-1', 'dc-2'])],
      },
      'd-2': {
        S4: [atom(`${CASE_ID}:b:d-2:S4:0`, 'S4', '이준호는 공동 적금 3,000만 원이 아니면 형네가 당장 무너질 것 같아 먼저 막았다고 인정한다.', ['thread-g', CASE_ID, 'd-2', 'dc-3'])],
        S5: [atom(`${CASE_ID}:b:d-2:S5:0`, 'S5', '이준호는 배우자가 반대할 걸 알았고 그래서 더 말하지 못한 채 공동 적금을 혼자 처분했다고 인정한다.', ['thread-g', CASE_ID, 'd-2', 'dc-3'])],
      },
      'h-d3': {},
      'h-d4': {
        S3: [atom(`${CASE_ID}:b:h-d4:S3:0`, 'S3', '이준호는 숨김의 시작은 자신이 먼저였지만 실제 비밀 송금 실행은 박지연 쪽이 먼저였다고 분리해서 인정한다.', ['thread-g', CASE_ID, 'h-d4', 'dc-5'])],
      },
    },
  },
  events: {
    contradictions: [
      {
        id: `${CASE_ID}-contradiction-1`,
        statementA: '박지연은 카드값, 오피스텔, 새벽 통화가 한 장면으로 묶였기 때문에 딴살림 말고는 설명이 없었다고 말한다.',
        statementB: '이준호는 같은 패턴이 형과 조카를 숨겨 돌본 흔적일 뿐이었다고 말한다.',
        options: {
          point_out: { label: '패턴 충돌을 짚는다', effect: '외도 해석과 가족 돌봄 해석이 정면으로 부딪힌다.' },
          let_go: { label: '다음 증거를 기다린다', effect: '초반 오해를 남긴 채 e-4 반전을 준비한다.' },
        },
        npcReaction: '같은 반복 패턴이 전혀 다른 서사로 읽히고 있었다는 사실이 드러난다.',
      },
      {
        id: `${CASE_ID}-contradiction-2`,
        statementA: '박지연은 먼저 배신당했다고 믿었기 때문에 2,000만 원을 지켜야 했다고 말한다.',
        statementB: '이준호는 형과 조카를 지키려다 적금 3,000만 원을 먼저 막아 준 것뿐이라고 말한다.',
        options: {
          point_out: { label: '돈의 순서를 겨눈다', effect: '숨김의 시작과 송금의 시작이 다른 질문이라는 점이 드러난다.' },
          let_go: { label: '동기를 먼저 듣는다', effect: '각자 자기 정당화 서사가 조금 더 길어진다.' },
        },
        npcReaction: '누가 먼저 배신했는지와 누가 먼저 실행했는지가 갈라진다.',
      },
    ],
    interjections: [
      {
        id: `${CASE_ID}-interjection-a`,
        interruptor: 'a',
        interjectionLine: '박지연은 카드값과 새벽 통화까지 보고 어떻게 외도를 의심하지 않을 수 있느냐고 끼어든다.',
        options: {
          allow: { label: '계속 말하게 둔다', effect: 'A의 피해자 프레임과 수치심이 더 드러난다.' },
          block: { label: '증거로 되돌린다', effect: '감정선 대신 자금 이동과 시간축 질문으로 복귀한다.' },
        },
      },
      {
        id: `${CASE_ID}-interjection-b`,
        interruptor: 'b',
        interjectionLine: '이준호는 형네 얘기를 꺼내는 순간 다시 시댁 싸움으로만 몰릴까 봐 끼어든다.',
        options: {
          allow: { label: '이유를 더 듣는다', effect: 'B의 회피가 단순 거짓말은 아니었다는 결이 드러난다.' },
          block: { label: '공동 적금으로 되돌린다', effect: '가족 사정보다 월권 책임이 앞으로 나온다.' },
        },
      },
    ],
    emotionalOutbursts: [
      {
        id: `${CASE_ID}-outburst-a`,
        party: 'a',
        outburstLine: '박지연은 자신만 돈을 숨긴 사람처럼 몰리는 순간 남편의 오피스텔 방문과 새벽 통화를 다시 꺼내며 흔들린다.',
        options: {
          press: { label: '송금 실행을 더 묻는다', effect: 'A가 2,000만 원 송금 이유를 더 빨리 인정한다.' },
          calm: { label: '시간을 준다', effect: 'A가 사기당한 수치심을 조금 더 조심스럽게 털어놓는다.' },
        },
      },
      {
        id: `${CASE_ID}-outburst-b`,
        party: 'b',
        outburstLine: '이준호는 형네 얘기를 꺼내는 순간 다시 시댁 싸움으로만 몰릴까 봐 말을 끊고 숨을 고른다.',
        options: {
          press: { label: '3,000만 원 책임을 겨눈다', effect: 'B가 공동 적금 독단 처분을 더 빨리 인정한다.' },
          calm: { label: '가족 사정부터 듣는다', effect: 'B가 왜 침묵을 택했는지 길게 설명한다.' },
        },
      },
    ],
  },
  transitionBeats: [
    { id: `${CASE_ID}-beat-b-d1-s1-s2`, caseId: CASE_ID, party: 'b', disputeId: 'd-1', fromState: 'S1', toState: 'S2', primaryBeatType: 'evidence_hit', line: '이준호는 더 숨기기 어려워졌다는 걸 알면서도 가족 일이라는 말만 먼저 꺼낸다.', behaviorHint: '답이 짧아지고 시선이 아래로 떨어진다.' },
    { id: `${CASE_ID}-beat-b-d1-s2-s3`, caseId: CASE_ID, party: 'b', disputeId: 'd-1', fromState: 'S2', toState: 'S3', primaryBeatType: 'partial', line: '이준호는 형네 일이었고 시댁 얘기만 꺼내면 더 크게 싸울 게 뻔해서 말을 못 했다고 털어놓는다.', behaviorHint: '변명보다 이유 설명이 길어진다.' },
    { id: `${CASE_ID}-beat-b-d2-s2-s3`, caseId: CASE_ID, party: 'b', disputeId: 'd-2', fromState: 'S2', toState: 'S3', primaryBeatType: 'confession', line: '이준호는 3,000만 원 전부 형 빚을 막는 데 썼다고 인정하지만 그때는 그 방법밖에 없었다고 덧붙인다.', behaviorHint: '숫자를 말하는 목소리는 단단하지만 마지막 문장 끝이 흔들린다.' },
    { id: `${CASE_ID}-beat-a-hd3-s2-s3`, caseId: CASE_ID, party: 'a', disputeId: 'h-d3', fromState: 'S2', toState: 'S3', primaryBeatType: 'confession', line: '박지연은 혹시 몰라 제 몫을 지키려 2,000만 원을 보냈고 결국 다 날렸다고 인정한다.', behaviorHint: '금액 부분에서 속도가 느려진다.' },
    { id: `${CASE_ID}-beat-a-hd4-s2-s3`, caseId: CASE_ID, party: 'a', disputeId: 'h-d4', fromState: 'S2', toState: 'S3', primaryBeatType: 'counter_shift', line: '박지연은 먼저 숨긴 쪽은 남편이었다고 되받아치지만 실제 송금이 먼저 실행된 건 자기 쪽이었다는 사실도 부정하지 못한다.', behaviorHint: '상대 비난과 자기 인정이 한 문장 안에서 충돌한다.' },
    { id: `${CASE_ID}-beat-b-hd4-s2-s3`, caseId: CASE_ID, party: 'b', disputeId: 'h-d4', fromState: 'S2', toState: 'S3', primaryBeatType: 'partial', line: '이준호는 자신이 먼저 숨긴 건 맞지만 먼저 돈을 움직인 건 박지연 쪽이었다고 힘겹게 선을 긋는다.', behaviorHint: '고개를 끄덕인 뒤 바로 반박 문장을 이어 붙인다.' },
  ],
  evidenceProgressions: evidence.map((node) => ({
    evidenceId: node.id,
    name: node.name,
    depthStages: node.v3DepthPlan,
    trustStates: node.v3TrustStates,
    sealTargets: node.v3SealTargets || [],
  })),
  leadLines,
  authorityPlacements,
  hiddenDisputePlans: disputes.filter((item) => item.hidden).map((item) => ({ disputeId: item.id, name: item.name, unlockPlan: item.v3UnlockPlan })),
  sensitiveSealTargets: [
    {
      evidenceId: 'e-4',
      label: '형 문자 + 조카 학교 알림 문자',
      targets: ['조카 이름', '학교명', '학년', '생리 관련 직접 표현'],
      recommendedTiming: ['돌봄 해석을 택했지만 실체가 부족할 때', 'dc-1 직전'],
      risks: ['공정성은 올라가지만 인도성 점수 하락 가능', '너무 이르면 B가 더 깊게 닫힐 수 있음'],
    },
  ],
  officialRecordRecommendations: [
    'B의 오피스텔 방문 대상은 형과 조카였다.',
    'B는 공동 적금 3,000만 원을 배우자 동의 없이 형에게 보냈다.',
    'A는 남편의 외도를 확신한 뒤 2,000만 원을 따로 송금했다.',
    '숨김은 B가 먼저 시작했고 실제 비밀 송금은 A가 먼저 실행했다.',
    '두 사람 모두 말 못할 이유가 있었지만 둘 다 공동 재산을 혼자 움직였다.',
  ],
}

function main() {
  writeJson(RUNTIME_OUT_PATH, runtimeCase)
  enrichRuntimeFile(RUNTIME_OUT_PATH)
  writeJson(V3_JSON_OUT_PATH, v3)
  writeTs(V3_TS_OUT_PATH, `${pascal(CASE_ID)}V3GameLoopData`, v3)
  process.stdout.write(`[build-pilot-${CASE_ID}-runtime] wrote src/data/cases/generated/${CASE_ID}.json\n`)
}

main()
