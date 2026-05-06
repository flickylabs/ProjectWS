const fs = require('fs')
const path = require('path')
const { enrichRuntimeFile } = require('./lib/runtime-gameplay-enricher.cjs')

const ROOT = path.resolve(__dirname, '..')
const CASE_ID = 'spouse-v2-01'
const RUNTIME_CASE_ID = `case-${CASE_ID}`
const TITLE = '새벽 통화기록'
const REF_DIR = path.join(ROOT, 'docs', 'ref', '리뉴얼참고')
const RUNTIME_OUT_PATH = path.join(ROOT, 'src', 'data', 'cases', 'generated', `${CASE_ID}.json`)
const V3_JSON_OUT_PATH = path.join(REF_DIR, `${CASE_ID}-v3-game-loop-data.json`)
const V3_TS_OUT_PATH = path.join(REF_DIR, `${CASE_ID}-v3-game-loop-data.ts`)

const HOOK =
  '남편 카드 명세서에 여성 생리대, 스타킹이 찍혀 있고, 퇴근 뒤엔 늘 같은 오피스텔에 두 시간씩 머문다. 게다가 새벽마다 같은 번호와 통화한다. 아내는 딴살림을 확신한다.'
const ANCHOR_TRUTH =
  '박지연은 남편이 딴살림을 차렸다고 믿고 이혼 대비로 집 돈 2,000만 원을 따로 빼두려다 투자 사기에 당했다. 이준호는 외도가 아니라 친형과 중2 조카를 몰래 돌보고 있었지만 시댁 불화를 피하려고 숨겼고, 끝내 공동 적금 3,000만 원을 깨 형 빚을 갚아 줬다.'
const MID_TWIST =
  '초반에는 카드값, 오피스텔 출입, 새벽 통화기록이 너무 선명해서 이준호의 딴살림처럼 보인다. 그러나 e-4가 열리면 그 오피스텔에는 친형과 조카딸이 살고 있었고, 생리대와 스타킹 역시 조카의 생필품이었다는 사실이 드러난다. 이후 공동 적금 3,000만 원 해지와 2,000만 원 송금이 연달아 열리면서, 사건의 핵심은 외도가 아니라 서로에게 말하지 않고 가정 돈을 움직인 부부의 비밀과 공포였다는 방향으로 뒤집힌다.'
const DILEMMA =
  '형과 조카를 지키려다 가정 돈 3,000만 원을 상의 없이 써 버린 남편과, 배신당했다고 믿고 자기 몫을 지키려다 집 돈 2,000만 원을 사기에 날린 아내 중 누가 더 나쁜가. 남편은 가족을 지키려 했지만 배우자 동의를 버렸고, 아내는 자기 자신을 지키려 했지만 실제로 돈을 먼저 따로 움직였다.'

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

function dossierQuestion({ id, text, attackVector, requiredLieState, revealAtom, lockedHint }) {
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
  }
}

const disputes = [
  {
    id: 'd-1',
    name: '오피스텔 출입은 딴살림인가, 가족 돌봄인가',
    truth: true,
    truthDescription:
      '오피스텔 출입은 외도를 위한 별도 생활이 아니라, 친형과 조카를 돌보러 간 가족 돌봄이었다. 다만 이준호는 시댁 불화가 다시 터질까 두려워 그 사실을 배우자에게 숨겼다.',
    quadrant: 'b_only',
    requiredEvidence: ['e-2', 'e-3', 'e-4'],
    correctResponsibility: { a: 25, b: 75 },
    ambiguity: 'low',
    weight: 'high',
    mediationLink: '가족돌봄과 침묵',
    legitimacyIssue: false,
    judgmentStatement: '오피스텔 방문의 실체는 가족 돌봄이었다.',
  },
  {
    id: 'd-2',
    name: '공동 적금 3,000만 원 해지는 급한 가족 구제인가, 배우자 몰래 한 월권인가',
    truth: true,
    truthDescription:
      '이준호는 형네를 지키기 위한 가족 구제라고 주장하지만, 배우자 동의 없이 공동 적금 3,000만 원 전액을 해지해 형 빚으로 보낸 책임은 피할 수 없다.',
    quadrant: 'b_only',
    requiredEvidence: ['e-5'],
    correctResponsibility: { a: 15, b: 85 },
    ambiguity: 'low',
    weight: 'high',
    mediationLink: '공동재산 통제',
    legitimacyIssue: true,
    judgmentStatement: '공동 적금 3,000만 원 독단 사용은 남편 책임이 더 크다.',
  },
  {
    id: 'd-3',
    name: '아내의 2,000만 원 이체는 자기방어인가, 이혼 대비 은닉 시도인가',
    truth: true,
    truthDescription:
      '박지연은 배신당했다고 믿고 자기 몫을 먼저 지키려 했다. 그러나 남편의 진실을 확인하기 전에 2,000만 원을 따로 움직여 투자방에 보낸 선택은 자기방어이면서 동시에 은닉 시도였다.',
    quadrant: 'a_only',
    requiredEvidence: ['e-6'],
    correctResponsibility: { a: 80, b: 20 },
    ambiguity: 'low',
    weight: 'high',
    mediationLink: '자기방어와 은닉',
    legitimacyIssue: true,
    judgmentStatement: '2,000만 원 비밀 송금의 책임은 아내 쪽이 더 크다.',
  },
  {
    id: 'd-4',
    name: '누가 먼저 부부의 신뢰를 깼는가',
    truth: true,
    truthDescription:
      '숨긴 돌봄은 이준호 쪽에서 먼저 시작됐고, 비밀 송금 실행은 박지연 쪽이 먼저였다. 누가 먼저 신뢰를 깼는지와 누가 먼저 돈을 움직였는지는 서로 다른 축으로 갈라진다.',
    quadrant: 'shared_misconception',
    requiredEvidence: ['e-7'],
    correctResponsibility: { a: 50, b: 50 },
    ambiguity: 'high',
    weight: 'high',
    mediationLink: '신뢰 파괴 순서',
    legitimacyIssue: true,
    judgmentStatement: '먼저 시작된 비밀과 먼저 실행된 송금은 서로 다르다.',
  },
]

const evidence = [
  {
    id: 'e-1',
    name: '카드 명세서',
    surfaceName: '카드 명세서',
    description:
      '한 달 동안 같은 오피스텔 근처 편의점에서 생리대, 스타킹, 컵죽, 즉석국이 반복 결제된 내역이다.',
    surfaceDescription: '같은 생활권에서 반복 결제된 카드 사용 내역이다.',
    type: 'bank',
    reliability: 'hard',
    completeness: 'original',
    provenance: 'institutional',
    legitimacy: 'lawful',
    proves: ['d-1'],
    isTrap: false,
    requires: [],
    investigationResults: {
      request_original:
        '명세서 원본에는 같은 오피스텔 근처 편의점에서 생리대, 스타킹, 컵죽, 즉석국이 반복 결제된 흐름이 그대로 남아 있다.',
      check_metadata:
        '결제 시각은 퇴근 뒤 오피스텔 체류 패턴과 겹치며, 생활비 수준을 넘어 특정 누군가를 꾸준히 챙긴 흔적처럼 보인다.',
      restore_context:
        '이준호가 이 구매 목적을 집에서 설명하지 않았기 때문에, 박지연은 외도와 딴살림 정황으로 받아들였다.',
    },
    subjectParty: 'b',
    investigationStages: [
      stage(0, 'request_original', '이 카드 명세서, 본인 카드 사용 내역 맞습니까?', 'authenticity'),
      stage(1, 'check_metadata', '생리대와 스타킹은 누구를 위해 산 겁니까?', 'context'),
      stage(
        2,
        'restore_context',
        '이 구매 패턴이 한 달 내내 반복됐는데, 그동안 아내에게는 뭐라고 설명했습니까?',
        'responsibility',
      ),
    ],
    partyContext: {
      a: {
        questionAngle: '왜 이 카드 내역이 딴살림 정황처럼 보였는지 설명해 주십시오.',
        implication: '박지연이 외도를 확신하게 된 가장 직접적인 출발점이다.',
      },
      b: {
        questionAngle: '왜 이 구매 목적을 조카 돌봄이라고 바로 설명하지 못했는지 설명해 주십시오.',
        implication: '실제론 조카 생필품 구매였지만, 침묵 때문에 외도 정황처럼 굳어진 자료다.',
      },
    },
  },
  {
    id: 'e-2',
    name: '오피스텔 출입 기록',
    surfaceName: '오피스텔 출입 기록',
    description:
      'B의 차량이 평일 저녁마다 같은 오피스텔 지하주차장에 들어가 평균 1시간 40분에서 2시간가량 머문 기록이다.',
    surfaceDescription: '퇴근 뒤 같은 오피스텔을 반복 방문한 기록이다.',
    type: 'log',
    reliability: 'hard',
    completeness: 'original',
    provenance: 'institutional',
    legitimacy: 'lawful',
    proves: ['d-1'],
    isTrap: false,
    requires: [],
    investigationResults: {
      request_original:
        '오피스텔 출입 로그 원본에는 평일 저녁마다 같은 차량이 같은 지하주차장으로 들어간 시간이 남아 있다.',
      check_metadata:
        '체류 시간은 대부분 두 시간 안팎이고, 귀가 전 루틴처럼 반복되어 따로 챙기는 생활이 있는 것처럼 읽힌다.',
      restore_context:
        '이준호는 집에는 다른 설명을 하면서 오피스텔 방문을 숨겼고, 그 공백이 외도 의심을 더 키웠다.',
    },
    subjectParty: 'b',
    investigationStages: [
      stage(0, 'request_original', '이 차량 출입 기록, 본인 차 맞습니까?', 'authenticity'),
      stage(1, 'check_metadata', '왜 퇴근 뒤마다 같은 오피스텔에 갔습니까?', 'context'),
      stage(
        2,
        'restore_context',
        '두 시간 가까이 머무는 동안 집에는 어디라고 말했습니까?',
        'responsibility',
      ),
    ],
    partyContext: {
      a: {
        questionAngle: '같은 오피스텔 반복 방문이 왜 딴살림처럼 보였는지 설명해 주십시오.',
        implication: '카드값과 새벽 통화와 겹치면서 외도 프레임을 굳힌 핵심 이동 기록이다.',
      },
      b: {
        questionAngle: '왜 형네 돌봄이라는 사실 대신 방문 사실 자체를 숨겼는지 설명해 주십시오.',
        implication: '돌봄의 실체와 별개로, 반복 방문을 침묵으로 처리한 책임이 드러난다.',
      },
    },
  },
  {
    id: 'e-3',
    name: '새벽 통화기록',
    surfaceName: '새벽 통화기록',
    description:
      '최근 3주 동안 매일 새벽 5시 전후 같은 번호와 3분에서 7분씩 통화한 내역이며, 그날 저녁마다 e-2의 출입 기록이 이어진다.',
    surfaceDescription: '새벽마다 같은 번호와 짧게 통화한 기록이다.',
    type: 'log',
    reliability: 'hard',
    completeness: 'original',
    provenance: 'institutional',
    legitimacy: 'lawful',
    proves: ['d-1'],
    isTrap: false,
    requires: [],
    investigationResults: {
      request_original:
        '최근 3주 새벽 5시 전후 같은 번호와 3분에서 7분씩 통화한 로그가 원본 그대로 남아 있다.',
      check_metadata:
        '같은 날 저녁 오피스텔 출입이 이어지는 패턴까지 겹쳐, 박지연이 외도 연락처라고 믿기 충분한 모양이 된다.',
      restore_context:
        '이 번호는 실제로 친형 번호였지만, 이준호는 시댁 갈등이 다시 터질까 봐 통화 상대를 끝까지 밝히지 않았다.',
    },
    subjectParty: 'b',
    investigationStages: [
      stage(0, 'request_original', '이 번호와 새벽마다 통화한 사실 맞습니까?', 'authenticity'),
      stage(1, 'check_metadata', '왜 하필 새벽 다섯 시쯤 계속 통화했습니까?', 'context'),
      stage(
        2,
        'restore_context',
        '새벽 통화와 저녁 오피스텔 방문이 같은 날 반복된 이유를 설명해 보십시오.',
        'responsibility',
      ),
    ],
    partyContext: {
      a: {
        questionAngle: '왜 이 통화기록이 딴살림 확신으로 이어졌는지 설명해 주십시오.',
        implication: '카드값과 출입기록을 외도 서사로 묶어 버린 가장 강한 감정 증폭 장치다.',
      },
      b: {
        questionAngle: '왜 같은 번호가 형이라는 사실을 바로 밝히지 못했는지 설명해 주십시오.',
        implication: '번호의 정체를 숨긴 회피가 이후 모든 의심을 폭발시킨다.',
      },
    },
  },
  {
    id: 'e-4',
    name: '형과의 문자 + 조카 학교 알림 문자',
    surfaceName: '형과의 문자 + 조카 학교 알림 문자',
    description:
      '같은 번호가 친형 번호이며, "오늘 민서 혼자 있으니 밥 좀 부탁", "스타킹 하나만 사다 줘", "제수씨는 우리 집 얘기만 나오면 또 싸움 난다, 진짜 말하지 마" 같은 내용이 남아 있다.',
    surfaceDescription: '같은 번호의 정체와 가족 사정이 드러나는 문자다.',
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
      request_original:
        '같은 번호가 친형 번호라는 점과 조카 학교 알림이 함께 붙은 대화 원본이 남아 있다.',
      check_metadata:
        '"민서 혼자 있으니 밥 좀 부탁", "스타킹 하나만 사다 줘"라는 문장이 카드 명세서의 여성용품과 오피스텔 방문 맥락을 한 번에 다시 묶어 준다.',
      restore_context:
        '"제수씨는 우리 집 얘기만 나오면 또 싸움 난다"는 문장은 숨김의 이유가 외도 은폐가 아니라 시댁 불화 공포였다는 축을 직접 드러낸다.',
    },
    subjectParty: 'b',
    investigationStages: [
      stage(0, 'request_original', '이 번호가 친형 번호라는 점, 맞습니까?', 'authenticity'),
      stage(1, 'check_metadata', '문자 속 \'민서\'는 누구고, 왜 당신이 밥과 생필품을 챙겼습니까?', 'context'),
      stage(
        2,
        'restore_context',
        '\'제수씨는 우리 집 얘기만 나오면 또 싸움 난다\'는 말, 아내에게 무엇을 숨겼다는 뜻입니까?',
        'responsibility',
      ),
    ],
    partyContext: {
      a: {
        questionAngle: '왜 이 문자가 외도 정황을 가족 돌봄 정황으로 뒤집는지 설명해 주십시오.',
        implication: '딴살림이라고 믿었던 패턴이 형과 조카를 숨겨 돌본 흔적으로 재해석된다.',
      },
      b: {
        questionAngle: '왜 형 사정을 말하지 않는 편을 택했는지, 그 결정의 책임을 설명해 주십시오.',
        implication: '돌봄의 선의와 숨김의 공포가 동시에 드러나는 결정적 전환점이다.',
      },
    },
  },
  {
    id: 'e-5',
    name: '공동 적금 해지 내역과 계좌이체 기록',
    surfaceName: '공동 적금 해지 내역과 계좌이체 기록',
    description:
      '공동 적금 3,000만 원이 해지된 바로 그날, 같은 액수가 친형 계좌로 한 번에 이체된 내역이다.',
    surfaceDescription: '공동 적금 해지와 형 계좌 이체가 붙어 있는 거래 기록이다.',
    type: 'bank',
    reliability: 'hard',
    completeness: 'original',
    provenance: 'institutional',
    legitimacy: 'lawful',
    proves: ['d-2'],
    isTrap: false,
    requires: ['e-4'],
    requiredLieState: 'S2',
    investigationResults: {
      request_original:
        '공동 적금 3,000만 원 해지와 형 계좌로의 일괄 이체가 같은 날짜와 시각대 안에 묶여 있다.',
      check_metadata:
        '형네 돌봄이 생필품 수준을 넘어 공동 적금 전액 지출로 번졌다는 점이 계좌 흐름으로 확정된다.',
      restore_context:
        '가족 구제 의도와 별개로, 이준호가 배우자 동의 없이 공동 자금을 단독 처분했다는 월권 책임이 선명해진다.',
    },
    subjectParty: 'b',
    investigationStages: [
      stage(0, 'request_original', '이 적금, 두 분이 함께 모으던 돈 맞습니까?', 'authenticity'),
      stage(1, 'check_metadata', '해지한 3,000만 원을 누구에게 보냈습니까?', 'context'),
      stage(
        2,
        'restore_context',
        '가족을 도왔다 해도, 왜 배우자와 상의하지 않고 공동 적금을 깼습니까?',
        'responsibility',
      ),
    ],
    partyContext: {
      a: {
        questionAngle: '왜 이 거래가 단순 돌봄을 넘어 공동재산 침범으로 읽히는지 설명해 주십시오.',
        implication: '박지연의 의심이 돈 문제로 폭발한 직접 계기다.',
      },
      b: {
        questionAngle: '형을 구제하려는 마음과 별개로, 왜 공동 적금을 단독 처분했는지 설명해 주십시오.',
        implication: '선의와 월권이 동시에 붙어 있는 금융 증거다.',
      },
    },
  },
  {
    id: 'e-6',
    name: 'A와 지인 박미라의 카톡 + 송금 영수증',
    surfaceName: 'A와 지인 박미라의 카톡 + 송금 영수증',
    description:
      '박지연이 "남편이 바람이면 내 돈부터 지켜야겠다"고 말한 뒤 투자방 링크를 받고, 이틀 뒤 2,000만 원을 개인 계좌로 보내며 "잠깐 넣어둘게"라고 적은 기록이다.',
    surfaceDescription: '박지연의 투자방 대화와 2,000만 원 송금 영수증이다.',
    type: 'chat',
    reliability: 'hard',
    completeness: 'original',
    provenance: 'self_possessed',
    legitimacy: 'lawful',
    proves: ['d-3'],
    isTrap: false,
    requires: ['e-5'],
    requiredLieState: 'S2',
    investigationResults: {
      request_original:
        '"남편이 바람이면 내 돈부터 지켜야겠다"는 메시지와 2,000만 원 송금 영수증 원본이 함께 남아 있다.',
      check_metadata:
        '송금은 남편 진실이 확인되기 전 실행됐고, 자기 몫을 먼저 빼두려는 계산이 대화 문장 그대로 드러난다.',
      restore_context:
        '박지연은 자기방어라고 말할 수 있지만, 실제 행동은 이혼 대비 은닉과 투자방 사기가 한 덩어리로 섞여 있다.',
    },
    subjectParty: 'a',
    investigationStages: [
      stage(0, 'request_original', '이 2,000만 원 송금, 당신이 한 것 맞습니까?', 'authenticity'),
      stage(1, 'check_metadata', '\'내 돈부터 지켜야겠다\'고 말한 이유가 무엇입니까?', 'context'),
      stage(
        2,
        'restore_context',
        '남편의 진실을 확인하기도 전에 돈을 옮긴 건, 이혼을 대비한 행동이었습니까?',
        'responsibility',
      ),
    ],
    partyContext: {
      a: {
        questionAngle: '왜 이 송금이 자기방어를 넘어 비밀 은닉으로 읽히는지 설명해 주십시오.',
        implication: '박지연이 먼저 돈을 움직였다는 실행 책임을 입증하는 핵심 자료다.',
      },
      b: {
        questionAngle: '왜 이 기록이 배우자에 대한 불신과 돈 선점의 시작으로 보이는지 설명해 주십시오.',
        implication: '이준호가 주장하는 "아내도 먼저 움직였다"는 축을 사실로 바꾸는 자료다.',
      },
    },
  },
  {
    id: 'e-7',
    name: '통화·출입·계좌이체 대조표',
    surfaceName: '통화·출입·계좌이체 대조표',
    description:
      '새벽 통화, 오피스텔 출입, 공동 적금 해지 3,000만 원 이체, A의 2,000만 원 송금이 날짜별로 한 장에 겹쳐져 있어, B의 비밀 돌봄이 먼저 시작됐고 A의 숨긴 송금이 먼저 실행됐다는 순서까지 확정된다.',
    surfaceDescription: '통화, 출입, 두 건의 송금 순서를 한 장에 모은 대조표다.',
    type: 'log',
    reliability: 'hard',
    completeness: 'original',
    provenance: 'institutional',
    legitimacy: 'lawful',
    proves: ['d-4'],
    isTrap: false,
    requires: ['e-4', 'e-5', 'e-6'],
    requiredLieState: 'S3',
    investigationResults: {
      request_original:
        '새벽 통화, 오피스텔 출입, 공동 적금 이체, 2,000만 원 송금이 날짜별로 하나의 표에 대조돼 있다.',
      check_metadata:
        '숨긴 돌봄은 이준호 쪽에서 먼저 시작됐고, 실제 비밀 송금 실행은 박지연 쪽이 먼저였다는 순서가 시간표로 갈라진다.',
      restore_context:
        '신뢰 파괴의 시작과 돈 이동의 시작이 서로 다른 방향으로 갈라지면서, 누가 먼저 배신했는지에 대한 판단이 훨씬 어려워진다.',
    },
    subjectParty: 'both',
    investigationStages: [
      stage(0, 'request_original', '이 표의 날짜와 시각, 틀린 부분 있습니까?', 'authenticity'),
      stage(1, 'check_metadata', '남편의 비밀 방문과 아내의 비밀 송금 중, 실제로 먼저 실행된 건 무엇입니까?', 'timeline'),
      stage(
        2,
        'restore_context',
        '두 분 다 상대에게 숨긴 채 돈을 움직인 시점에, 각자 속으로 무엇을 결심했습니까?',
        'responsibility',
      ),
    ],
    partyContext: {
      a: {
        questionAngle: '왜 이 대조표가 "먼저 의심한 사람"과 "먼저 실행한 사람"을 분리해 보게 만드는지 설명해 주십시오.',
        implication: '박지연의 비밀 송금 시점이 신뢰 파괴 판단에서 별도로 읽히게 만든다.',
      },
      b: {
        questionAngle: '왜 이 대조표가 "먼저 숨긴 사람"과 "먼저 돈을 움직인 사람"을 갈라 놓는지 설명해 주십시오.',
        implication: '이준호의 숨긴 돌봄 시작이 신뢰 파괴의 출발점으로 다시 소환된다.',
      },
    },
  },
]

const truthTable = [
  {
    id: 't-1',
    fact: '새벽 통화 상대와 오피스텔 방문 대상은 외도 상대가 아니라 친형과 조카였다.',
    isTrue: true,
    weight: 9,
    quadrant: 'b_only',
  },
  {
    id: 't-2',
    fact: '공동 적금 3,000만 원은 해지 직후 친형 계좌로 한 번에 이체됐다.',
    isTrue: true,
    weight: 10,
    quadrant: 'b_only',
  },
  {
    id: 't-3',
    fact: '박지연은 남편이 바람이라고 믿고 2,000만 원을 먼저 개인 계좌로 움직여 투자방에 보냈다가 잃었다.',
    isTrue: true,
    weight: 10,
    quadrant: 'a_only',
  },
  {
    id: 't-4',
    fact: '숨긴 돌봄은 이준호가 먼저 시작했고, 실제 비밀 송금 실행은 박지연이 먼저 했다.',
    isTrue: true,
    weight: 10,
    quadrant: 'shared_misconception',
  },
  {
    id: 't-5',
    fact: '이 사건의 핵심은 외도가 아니라, 시댁 불화와 불신 속에서 부부가 서로 모르게 가정 돈을 움직인 구조다.',
    isTrue: true,
    weight: 8,
    quadrant: 'both_know',
  },
]

const lieConfigA = [
  {
    disputeId: 'd-3',
    lieType: 'LT-2',
    lieIntensity: 'L2',
    lieMotive: 'self_protection',
    initialState: 'S0',
    collapseViaTrust: false,
    transitions: [
      { from: 'S0', to: 'S1', trigger: 'd-3_a_denial_question' },
      { from: 'S1', to: 'S2', trigger: 'hard_evidence' },
      { from: 'S2', to: 'S3', trigger: 'e-6_presented' },
      { from: 'S3', to: 'S4', trigger: 'd-3_a_self_defense_question' },
      { from: 'S4', to: 'S5', trigger: 'd-3_a_shame_confession' },
    ],
  },
  {
    disputeId: 'd-4',
    lieType: 'LT-1',
    lieIntensity: 'L2',
    lieMotive: 'face_saving',
    initialState: 'S0',
    collapseViaTrust: true,
    transitions: [
      { from: 'S0', to: 'S1', trigger: 'd-4_a_blame_question' },
      { from: 'S1', to: 'S2', trigger: 'hard_evidence' },
      { from: 'S2', to: 'S3', trigger: 'e-7_presented' },
      { from: 'S3', to: 'S4', trigger: 'd-4_a_execution_order_question' },
      { from: 'S4', to: 'S5', trigger: 'shared_finance_confession' },
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
      { from: 'S3', to: 'S4', trigger: 'd-1_b_family_context_question' },
      { from: 'S4', to: 'S5', trigger: 'e-5_presented' },
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
      { from: 'S3', to: 'S4', trigger: 'd-2_b_family_rescue_question' },
      { from: 'S4', to: 'S5', trigger: 'd-2_b_hide_reason_question' },
    ],
  },
  {
    disputeId: 'd-4',
    lieType: 'LT-1',
    lieIntensity: 'L2',
    lieMotive: 'face_saving',
    initialState: 'S0',
    collapseViaTrust: true,
    transitions: [
      { from: 'S0', to: 'S1', trigger: 'd-4_b_betrayal_question' },
      { from: 'S1', to: 'S2', trigger: 'hard_evidence' },
      { from: 'S2', to: 'S3', trigger: 'e-7_presented' },
      { from: 'S3', to: 'S4', trigger: 'd-4_b_reason_question' },
      { from: 'S4', to: 'S5', trigger: 'shared_finance_confession' },
    ],
  },
]
const runtimeCase = {
  caseId: RUNTIME_CASE_ID,
  sensitivityTags: [],
  meta: {
    relationshipType: 'spouse',
    conflictSeed: 'TE-SpouseV201',
    variableModules: ['VM-spouse-v2-a', 'VM-spouse-v2-b'],
    twistModule: 'TW-spouse-v2-1',
    difficulty: 'hard',
    anchorTruth: ANCHOR_TRUTH,
    emotionalBait:
      '카드값, 오피스텔 출입, 새벽 통화가 모두 외도처럼 보인다. 그런데 그 끝에는 친형과 조카를 숨겨 돌본 남편과, 배신당했다고 믿고 2,000만 원을 먼저 움직인 아내의 비밀이 동시에 걸려 있다.',
    resolutionDilemma: DILEMMA,
  },
  duo: {
    duoId: 'duo-spouse-v2-01',
    relationshipType: 'spouse',
    partyA: {
      id: 'a',
      name: '박지연',
      age: 36,
      occupation: '학원 데스크 직원',
      incomeBracket: 'mid',
      archetype: 'victim_cosplay',
      speechStyle:
        '자신도 배신당한 피해자였다고 먼저 말하고, 책임 질문이 들어오면 불안과 수치심을 이유로 설명 범위를 넓힌다.',
      pride: 6,
      fear: '새벽 통화기록에서 자신이 먼저 2,000만 원을 움직였다는 사실이 중심 책임으로 고정되는 것을 두려워한다.',
      riskAppetite: 5,
      digitalHabit: 'messenger_main',
      dailyRoutine:
        '학원 마감 뒤 집에 들어와 카드 내역과 통화기록을 다시 확인하며, 남편이 자신보다 먼저 가정을 버릴지 모른다는 불안을 키웠다.',
      sensitivePoints: [
        '오피스텔 출입은 딴살림인가, 가족 돌봄인가',
        '아내의 2,000만 원 이체는 자기방어인가, 이혼 대비 은닉 시도인가',
        '누가 먼저 부부의 신뢰를 깼는가',
      ],
      verbalTells: [
        {
          type: 'victim_frame',
          trigger: 'cornered',
          pattern: '자신도 이미 배신당한 사람처럼 먼저 위치를 잡는다.',
        },
        {
          type: 'helplessness',
          trigger: 'cornered',
          pattern: '그때는 다른 선택이 없었다는 표현으로 책임의 각도를 흐린다.',
        },
        {
          type: 'soft_confession',
          trigger: 'shame',
          pattern: '작은 인정부터 꺼낸 뒤 가장 수치스러운 선택은 늦게 말한다.',
        },
      ],
      callTerms: {
        toPartner: '준호 씨',
        toJudge: '제 남편',
        angry: '이준호 씨',
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
      speechStyle:
        '직접적인 책임 질문이 오면 한 박자 늦게 답하고, 사실을 완전히 부정하기보다 중요한 부분만 뒤로 미룬다.',
      pride: 6,
      fear: '새벽 통화기록에서 형네를 숨긴 이유와 공동 적금 3,000만 원 해지가 한 덩어리로 묶여 자신 책임만 남는 것을 두려워한다.',
      riskAppetite: 4,
      digitalHabit: 'minimal',
      dailyRoutine:
        '매장 마감 뒤 형네 오피스텔에 들러 조카 저녁과 생필품을 챙기고, 새벽에는 형 사정을 확인한 뒤 아무 일 없던 것처럼 집으로 돌아왔다.',
      sensitivePoints: [
        '오피스텔 출입은 딴살림인가, 가족 돌봄인가',
        '공동 적금 3,000만 원 해지는 급한 가족 구제인가, 배우자 몰래 한 월권인가',
        '누가 먼저 부부의 신뢰를 깼는가',
      ],
      verbalTells: [
        {
          type: 'answer_delay',
          trigger: 'avoiding',
          pattern: '질문을 바로 받지 않고 짧게 시간을 끌며 핵심어를 피한다.',
        },
        {
          type: 'partial_scope',
          trigger: 'cornered',
          pattern: '큰 사실은 인정하되 가장 아픈 이유는 마지막까지 잘라 낸다.',
        },
        {
          type: 'minimize_harm',
          trigger: 'defensive',
          pattern: '선의였다는 말로 절차 위반의 무게를 먼저 낮추려 한다.',
        },
      ],
      callTerms: {
        toPartner: '지연 씨',
        toJudge: '제 아내',
        angry: '박지연 씨',
      },
      pcFaceType: 'man',
    },
    relationshipLedger: [
      {
        id: 'ledger-1',
        category: 'confirmed',
        description: '시댁 이야기가 나오면 부부가 크게 부딪혀 왔고, 이준호는 형네 사정을 꺼내는 것 자체를 두려워해 왔다.',
        isReal: true,
        whoRemembersAccurately: 'both',
        whoDistorts: 'none',
        distortionDirection: '',
        currentlyResolved: 'surface_only',
        emotionalResidue: 'strong',
        connectionToCurrent: 'direct',
      },
      {
        id: 'ledger-2',
        category: 'distorted',
        description:
          '초반에는 카드값, 오피스텔, 새벽 통화가 너무 선명해서 외도처럼 보인다. 그러나 형 문자와 조카 학교 알림이 열리면, 그 패턴은 딴살림이 아니라 형네 돌봄의 흔적으로 다시 읽힌다.',
        isReal: true,
        whoRemembersAccurately: 'both',
        whoDistorts: 'both',
        distortionDirection: '박지연은 외도 의심 쪽으로, 이준호는 가족 돌봄의 숨김 이유 쪽으로 각자 유리한 순서를 붙여 말한다.',
        currentlyResolved: 'unresolved',
        emotionalResidue: 'strong',
        connectionToCurrent: 'direct',
      },
      {
        id: 'ledger-3',
        category: 'silenced',
        description:
          '이준호는 공동 적금 3,000만 원을 깨 형 빚을 막았고, 박지연은 2,000만 원을 투자방에 보냈다가 잃었다. 두 사람 모두 상대에게 말하지 않은 채 가정 돈을 움직였다.',
        isReal: true,
        whoRemembersAccurately: 'both',
        whoDistorts: 'none',
        distortionDirection: '',
        currentlyResolved: 'surface_only',
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
        knowledgeScope:
          '빚 독촉 때문에 새벽부터 밤까지 일했고, 동생에게 "제수씨에겐 말하지 마"라고 먼저 부탁한 장본인이다. 시댁 이야기가 나오면 집안이 뒤집혔다는 배경까지 알고 있다.',
        witnessedDirectly: true,
        bias: 'pro_b',
        distortionRisk: 'strategic',
        surfaceKnowledge: '형네 사정과 이준호의 오피스텔 방문 이유를 알고 있는 가족 증인이다.',
        relatedDisputeIds: ['d-1', 'd-2', 'd-4'],
        witnessProfile: {
          age: 43,
          occupation: '택배 상하차',
          relationToA: '시댁 식구로 알고 지냈지만 자주 부딪힌 사이다.',
          relationToB: '친형이다.',
          sentimentToA: -20,
          sentimentToB: 70,
          speechStyle:
            '생활 사정을 설명할 때는 빠르게 털어놓지만, 동생 책임을 직접 묻는 질문에는 한 박자 늦게 답한다.',
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
        knowledgeScope:
          '삼촌이 저녁마다 와서 밥을 해주고 생리대와 스타킹을 사다준 이유를 직접 알고 있다. 외도 의심과 달리 실제 생활 돌봄이 무엇이었는지를 말할 수 있다.',
        witnessedDirectly: true,
        bias: 'pro_b',
        distortionRisk: 'accurate',
        surfaceKnowledge: '오피스텔 방문의 실제 저녁 풍경을 기억하는 조카 증인이다.',
        relatedDisputeIds: ['d-1'],
        witnessProfile: {
          age: 15,
          occupation: '중학생',
          relationToA: '가끔 명절에만 봤던 큰어머니 쪽 어른이다.',
          relationToB: '삼촌이다.',
          sentimentToA: -10,
          sentimentToB: 80,
          speechStyle: '감정 과장은 없고, 자신이 본 저녁 장면을 짧고 구체적으로 말한다.',
          addressJudge: '재판관님',
          addressA: '아주머니',
          addressB: '삼촌',
        },
      },
      {
        id: 'w-3',
        slot: 'acquaintance_1',
        name: '박미라',
        relationTo: 'a',
        knowledgeScope:
          '박지연이 "혹시 따로 굴릴 데 없냐"고 먼저 물었고, 자신이 투자방 링크를 보냈다는 사실을 알고 있다. 박지연 쪽 2,000만 원 송금 동기와 수치심을 증언할 수 있다.',
        witnessedDirectly: true,
        bias: 'pro_a',
        distortionRisk: 'accurate',
        surfaceKnowledge: '2,000만 원 송금 직전 박지연과 직접 대화한 지인 증인이다.',
        relatedDisputeIds: ['d-3', 'd-4'],
        witnessProfile: {
          age: 37,
          occupation: '반찬가게 운영',
          relationToA: '동네에서 오래 본 지인이다.',
          relationToB: '안면만 있는 사이였다.',
          sentimentToA: 45,
          sentimentToB: 0,
          speechStyle: '선 넘는 과장은 하지 않지만, 먼저 누가 말을 꺼냈는지는 또렷하게 기억한다.',
          addressJudge: '재판관님',
          addressA: '지연 씨',
          addressB: '준호 씨',
          hiddenAgenda: '링크를 보낸 책임이 자신에게도 닿을까 봐 표현을 조심한다.',
        },
      },
    ],
  },
  context: {
    contextType: 'marital_finance_distrust',
    description: HOOK,
    emotionalPressure: 9,
    affects: 'both',
    triggerAmplifier: MID_TWIST,
    caseNumber: 'TE-SpouseV201',
    caseName: TITLE,
  },
  disputes,
  evidence,
  evidenceCombinations: [
    {
      id: 'c-1',
      requires: ['e-1', 'e-3'],
      upgradesTo: 'hard',
      proves: ['d-1'],
      description:
        '"새벽 통화 직후 같은 생활권에서 여성용품을 사는 반복 패턴"이 확정된다. 초반에는 d-1을 외도 쪽으로 강하게 오해하게 만드는 함정 메모가 생성된다.',
    },
    {
      id: 'c-2',
      requires: ['e-4', 'e-5'],
      upgradesTo: 'hard',
      proves: ['d-2'],
      description:
        '"형네 돌봄이 생필품 수준이 아니라 공동 적금 3,000만 원 지출까지 갔다"는 사실이 확정된다. d-2 hard 압박과 DossierCard-2가 해금된다.',
    },
    {
      id: 'c-3',
      requires: ['e-5', 'e-6'],
      upgradesTo: 'hard',
      proves: ['d-3', 'd-4'],
      description:
        '"남편 3,000만 원 + 아내 2,000만 원, 부부 합산 5,000만 원 증발" 전체 그림이 확정된다. d-4의 hard 질문과 최종 타임라인 해석이 강화된다.',
    },
  ],
  truthTable,
  lieConfigA,
  lieConfigB,
  solutions: {
    공동재산복구: [
      '공동 적금 3,000만 원과 2,000만 원 송금의 흐름을 분리 정리하고, 회수 가능 금액과 손실액을 공개 장부로 다시 맞춘다.',
      '형네 지원은 부부 공동재산과 분리된 별도 합의로만 허용한다.',
    ],
    책임분리회복: [
      '이준호의 숨긴 가족 돌봄과 박지연의 비밀 송금 책임을 서로 다른 축으로 명시해 신뢰 파괴와 자금 이동을 따로 판단한다.',
      '시댁 관련 대화 규칙과 공동재산 사전 동의 규칙을 함께 다시 세운다.',
    ],
    관계정리우선: [
      '외도 오해는 해소하되, 공동재산 독단 처분과 비밀 송금은 별도 책임으로 남긴다.',
      '부부 재결합보다 손실 정산과 가족 경계 설정을 우선한다.',
    ],
  },
  activeLedgerEntries: ['ledger-1', 'ledger-2', 'ledger-3'],
  activeThirdParties: ['w-1', 'w-2', 'w-3'],
  baseEvidenceIds: ['e-1', 'e-2', 'e-3'],
  monetaryDisputeIds: ['d-2', 'd-3', 'd-4'],
  combinationLab: {
    analysisPointsBase: 5,
    analysisPointRefundOnFirstHidden: 0,
    nodes: [
      {
        id: 'e-1',
        type: 'evidence',
        label: '카드 명세서의 여성용품 결제',
        sourceRef: 'e-1',
        linkedDisputeIds: ['d-1'],
        linkedEvidenceIds: ['e-1'],
        visibility: 'base',
      },
      {
        id: 'e-2',
        type: 'evidence',
        label: '오피스텔 출입 기록',
        sourceRef: 'e-2',
        linkedDisputeIds: ['d-1'],
        linkedEvidenceIds: ['e-2'],
        visibility: 'base',
      },
      {
        id: 'e-3',
        type: 'evidence',
        label: '새벽 통화기록',
        sourceRef: 'e-3',
        linkedDisputeIds: ['d-1'],
        linkedEvidenceIds: ['e-3'],
        visibility: 'base',
      },
      {
        id: 'e-4',
        type: 'evidence',
        label: '형 문자와 조카 학교 알림',
        sourceRef: 'e-4',
        linkedDisputeIds: ['d-1'],
        linkedEvidenceIds: ['e-4'],
        visibility: 'base',
      },
      {
        id: 'e-5',
        type: 'evidence',
        label: '공동 적금 해지 내역',
        sourceRef: 'e-5',
        linkedDisputeIds: ['d-2', 'd-4'],
        linkedEvidenceIds: ['e-5'],
        visibility: 'base',
      },
      {
        id: 'e-6',
        type: 'evidence',
        label: 'A의 투자방 카톡',
        sourceRef: 'e-6',
        linkedDisputeIds: ['d-3', 'd-4'],
        linkedEvidenceIds: ['e-6'],
        visibility: 'base',
      },
      {
        id: 'cl-note-1',
        type: 'note',
        label: '형 문자 "제수씨는 우리 집 얘기만 나오면 또 싸움 난다"',
        sourceRef: 'e-4',
        linkedDisputeIds: ['d-1', 'd-4'],
        visibility: 'base',
      },
      {
        id: 'cl-statement-1',
        type: 'statement',
        label: 'B의 d-1 발언 "말하면 더 크게 터집니다"',
        sourceRef: 'd-1',
        linkedDisputeIds: ['d-1', 'd-4'],
        visibility: 'base',
      },
      {
        id: 'n-1',
        type: 'derived_note',
        label: '딴살림처럼 보이는 반복 패턴',
        linkedDisputeIds: ['d-1'],
        linkedEvidenceIds: ['e-1', 'e-3'],
        visibility: 'derived',
      },
      {
        id: 'n-2',
        type: 'derived_note',
        label: '오피스텔 방문의 실제 목적은 형네 돌봄',
        linkedDisputeIds: ['d-1'],
        linkedEvidenceIds: ['e-2', 'e-4'],
        visibility: 'derived',
      },
      {
        id: 'n-3',
        type: 'derived_note',
        label: '부부 돈 5,000만 원이 각자 비밀로 사라졌다',
        linkedDisputeIds: ['d-3', 'd-4'],
        linkedEvidenceIds: ['e-5', 'e-6'],
        visibility: 'derived',
      },
      {
        id: 'n-4',
        type: 'derived_note',
        label: '숨김의 이유는 외도 은폐가 아니라 시댁 불화',
        linkedDisputeIds: ['d-1', 'd-4'],
        visibility: 'derived',
      },
    ],
    outputs: [
      {
        id: 'n-1',
        label: '딴살림처럼 보이는 반복 패턴',
        summary:
          '새벽 통화 직후 같은 생활권에서 여성용품을 사는 반복 패턴이 겹치면서, 초반에는 d-1이 외도 쪽으로 강하게 기울도록 만드는 오해의 틀이 완성된다.',
        nodeType: 'derived_note',
        noteText: '딴살림처럼 보이는 반복 패턴',
        effects: [
          {
            kind: 'unlock_note',
            unlockNodeId: 'n-1',
          },
          {
            kind: 'upgrade_dispute',
            disputeUpgrade: {
              disputeId: 'd-1',
              weight: 'high',
              ambiguity: 'high',
              legitimacyIssue: false,
            },
          },
        ],
        judgeHint: '초반 외도 오해가 왜 이렇게 강했는지를 설명하는 조합 메모다.',
      },
      {
        id: 'n-2',
        label: '오피스텔 방문의 실제 목적은 형네 돌봄',
        summary:
          '오피스텔 출입 기록과 형 문자가 겹치면서 d-1이 외도 의심에서 가족 돌봄 축으로 재해석된다.',
        nodeType: 'derived_note',
        noteText: '오피스텔 방문의 실제 목적은 형네 돌봄',
        effects: [
          {
            kind: 'unlock_note',
            unlockNodeId: 'n-2',
          },
          {
            kind: 'reframe_evidence',
            targetId: 'e-2',
            reframeFromId: 'e-2',
            reframeToId: 'n-2',
          },
          {
            kind: 'reframe_dispute',
            targetId: 'd-1',
            reframeFromId: 'd-1',
            reframeToId: 'd-1',
          },
        ],
        judgeHint: '딴살림처럼 보이던 이동 패턴이 가족 돌봄으로 뒤집히는 첫 반전이다.',
      },
      {
        id: 'n-3',
        label: '부부 돈 5,000만 원이 각자 비밀로 사라졌다',
        summary:
          '남편 3,000만 원과 아내 2,000만 원이 각각 비밀로 움직인 전체 그림이 확정되며, d-4 hard 질문과 최종 타임라인 해석이 선명해진다.',
        nodeType: 'derived_note',
        noteText: '부부 돈 5,000만 원이 각자 비밀로 사라졌다',
        questionPrompts: [
          {
            id: 'q-d4-hard-order',
            text: '남편 3,000만 원과 아내 2,000만 원 중, 실제로 먼저 실행된 비밀 송금은 무엇입니까?',
            tier: 'pressure',
          },
        ],
        effects: [
          {
            kind: 'unlock_note',
            unlockNodeId: 'n-3',
          },
          {
            kind: 'unlock_question',
            unlockNodeId: 'n-3',
          },
          {
            kind: 'upgrade_dispute',
            disputeUpgrade: {
              disputeId: 'd-4',
              weight: 'high',
              ambiguity: 'low',
              legitimacyIssue: true,
            },
          },
        ],
        judgeHint: '외도 의심 사건이 아니라 가정 돈 5,000만 원 증발 사건으로 프레임이 바뀌는 조합이다.',
      },
      {
        id: 'n-4',
        label: '숨김의 이유는 외도 은폐가 아니라 시댁 불화',
        summary:
          '형 문자와 B의 발언이 겹치면서, 이준호의 회피가 단순 거짓말이 아니라 시댁 불화가 다시 터질 공포에서 나온 선택이라는 해석이 열린다.',
        nodeType: 'derived_note',
        noteText: '숨김의 이유는 외도 은폐가 아니라 시댁 불화',
        witnessAngles: [
          {
            id: 'wa-1',
            text: '이준호의 침묵은 외도 은폐보다 시댁 갈등 재폭발 공포에 더 가깝다는 각도',
          },
        ],
        effects: [
          {
            kind: 'unlock_note',
            unlockNodeId: 'n-4',
          },
          {
            kind: 'unlock_witness_angle',
            unlockNodeId: 'n-4',
          },
          {
            kind: 'reframe_dispute',
            targetId: 'd-1',
            reframeFromId: 'd-1',
            reframeToId: 'd-1',
          },
        ],
        judgeHint: '숨김의 동기 해석이 외도 은폐에서 관계 공포로 이동하는 조합이다.',
      },
    ],
    recipes: [
      {
        id: 'combo-1',
        inputs: ['e-1', 'e-3'],
        cost: 1,
        discoveryText: '새벽 통화 직후 같은 생활권에서 여성용품을 사는 반복 패턴이 겹친다.',
        outputId: 'n-1',
      },
      {
        id: 'combo-2',
        inputs: ['e-2', 'e-4'],
        cost: 1,
        discoveryText: '오피스텔 이동선이 형 문자와 이어지면서 방문 목적이 외도에서 가족 돌봄 쪽으로 다시 읽힌다.',
        outputId: 'n-2',
      },
      {
        id: 'combo-3',
        inputs: ['e-5', 'e-6'],
        cost: 1,
        discoveryText: '남편 3,000만 원과 아내 2,000만 원이 각자 비밀로 사라진 전체 그림이 한 번에 붙는다.',
        outputId: 'n-3',
      },
      {
        id: 'combo-4',
        inputs: ['cl-note-1', 'cl-statement-1'],
        cost: 2,
        discoveryText: '형 문자와 이준호의 발언이 같은 공포를 가리키며, 숨김의 이유가 외도 은폐가 아니라 시댁 불화였다는 축이 열린다.',
        outputId: 'n-4',
      },
    ],
  },
}
const v3 = {
  caseId: CASE_ID,
  dossierCards: [
    {
      id: 'dc-1',
      name: '새벽 통화 상대가 형이라면, 왜 아내에게 한마디도 못 했습니까?',
      description:
        'd-1이 S2 이상일 때 열리는 카드다. 숨김의 이유가 외도 은폐가 아니라 시댁 불화였다는 축을 강제로 열어 준다.',
      evidenceIds: ['e-3', 'e-4'],
      relatedDisputes: ['d-1', 'd-4'],
      subjectParty: 'b',
      challenges: [
        {
          targetParty: 'b',
          questions: [
            dossierQuestion({
              id: 'dc-1.b.q1',
              text: '새벽 통화 상대가 형이라면, 왜 아내에게 한마디도 못 했습니까?',
              attackVector: 'context',
              requiredLieState: 'S2',
              revealAtom: `${CASE_ID}:b:d-1:S3:0`,
              lockedHint: 'd-1이 더 열리면 숨김의 이유를 직접 묻는 카드가 열린다.',
            }),
            dossierQuestion({
              id: 'dc-1.b.q2',
              text: '시댁 얘기만 나오면 더 크게 싸운다는 이유로, 오해받을 행동을 끝까지 숨긴 겁니까?',
              attackVector: 'responsibility',
              requiredLieState: 'S3',
              revealAtom: `${CASE_ID}:b:d-1:S4:0`,
              lockedHint: '시댁 불화와 숨김의 책임이 함께 열려야 다음 질문이 보인다.',
            }),
          ],
        },
      ],
    },
    {
      id: 'dc-2',
      name: '공동 적금 3,000만 원은 부부 돈인데, 형에게 줄 권리가 정말 당신 혼자에게 있었습니까?',
      description:
        'd-2가 S3 이상일 때 열리는 카드다. 공동재산 독단 처분 책임을 강하게 추궁하며, B의 S4~S5 감정 붕괴를 촉발한다.',
      evidenceIds: ['e-5'],
      relatedDisputes: ['d-2', 'd-4'],
      subjectParty: 'b',
      challenges: [
        {
          targetParty: 'b',
          questions: [
            dossierQuestion({
              id: 'dc-2.b.q1',
              text: '공동 적금 3,000만 원은 부부 돈인데, 형에게 줄 권리가 정말 당신 혼자에게 있었습니까?',
              attackVector: 'responsibility',
              requiredLieState: 'S3',
              revealAtom: `${CASE_ID}:b:d-2:S4:0`,
              lockedHint: '공동 적금 사용 사실이 더 열리면 책임 추궁 카드가 열린다.',
            }),
            dossierQuestion({
              id: 'dc-2.b.q2',
              text: '가족을 돕는 일이었다 해도, 배우자 동의 없이 공동 적금을 깬 책임은 인정합니까?',
              attackVector: 'context',
              requiredLieState: 'S4',
              revealAtom: `${CASE_ID}:b:d-2:S5:0`,
              lockedHint: '가족 구제와 월권 책임이 모두 올라와야 마지막 질문이 열린다.',
            }),
          ],
        },
      ],
    },
    {
      id: 'dc-3',
      name: '남편이 먼저 숨겼다고 해도, 먼저 2,000만 원을 움직인 건 당신이지요?',
      description:
        'd-3이 S3 이상일 때 열리는 카드다. A의 자기방어 서사를 d-4와 직접 연결해, 누가 먼저 실행했는가를 날카롭게 만든다.',
      evidenceIds: ['e-6', 'e-7'],
      relatedDisputes: ['d-3', 'd-4'],
      subjectParty: 'a',
      challenges: [
        {
          targetParty: 'a',
          questions: [
            dossierQuestion({
              id: 'dc-3.a.q1',
              text: '남편이 먼저 숨겼다고 해도, 먼저 2,000만 원을 움직인 건 당신이지요?',
              attackVector: 'responsibility',
              requiredLieState: 'S3',
              revealAtom: `${CASE_ID}:a:d-3:S4:0`,
              lockedHint: '2,000만 원 송금 의도가 더 올라오면 자기방어와 실행 책임을 묻는 카드가 열린다.',
            }),
            dossierQuestion({
              id: 'dc-3.a.q2',
              text: '남편을 믿지 못한 마음과 별개로, 먼저 돈을 움직인 책임은 인정합니까?',
              attackVector: 'context',
              requiredLieState: 'S4',
              revealAtom: `${CASE_ID}:a:d-4:S3:0`,
              lockedHint: '송금 동기와 실행 순서가 함께 드러나야 마지막 질문이 열린다.',
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
      'd-3': {
        S4: [
          atom(
            `${CASE_ID}:a:d-3:S4:0`,
            'S4',
            '박지연은 남편이 바람이라고 믿었고, 그래서 자기 몫을 먼저 지켜야 한다는 마음으로 2,000만 원을 움직였다고 인정한다.',
            ['thread-g', CASE_ID, 'd-3', 'dc-3'],
          ),
        ],
      },
      'd-4': {
        S3: [
          atom(
            `${CASE_ID}:a:d-4:S3:0`,
            'S3',
            '박지연은 남편이 먼저 숨긴 건 맞지만, 실제 비밀 송금 실행은 자신 쪽이 먼저였다는 점까지 받아들이기 시작한다.',
            ['thread-g', CASE_ID, 'd-4', 'dc-3'],
          ),
        ],
      },
    },
    b: {
      'd-1': {
        S3: [
          atom(
            `${CASE_ID}:b:d-1:S3:0`,
            'S3',
            '이준호는 외도를 숨긴 것이 아니라, 시댁 얘기만 나오면 더 크게 싸울까 봐 형네 돌봄 사실을 차마 말하지 못했다고 인정한다.',
            ['thread-g', CASE_ID, 'd-1', 'dc-1'],
          ),
        ],
        S4: [
          atom(
            `${CASE_ID}:b:d-1:S4:0`,
            'S4',
            '이준호는 형이 새벽부터 밤까지 일하던 날마다 조카 저녁과 생필품을 자신이 챙겼다고 더 구체적으로 털어놓는다.',
            ['thread-g', CASE_ID, 'd-1', 'dc-1'],
          ),
        ],
      },
      'd-2': {
        S4: [
          atom(
            `${CASE_ID}:b:d-2:S4:0`,
            'S4',
            '이준호는 공동 적금 3,000만 원이 아니면 형네가 당장 무너질 것 같아 먼저 막았다고 진술한다.',
            ['thread-g', CASE_ID, 'd-2', 'dc-2'],
          ),
        ],
        S5: [
          atom(
            `${CASE_ID}:b:d-2:S5:0`,
            'S5',
            '이준호는 아내가 반대할 걸 알았고, 금액이 커질수록 더 말하지 못했다고 인정한다.',
            ['thread-g', CASE_ID, 'd-2', 'dc-2'],
          ),
        ],
      },
      'd-3': {},
      'd-4': {},
    },
  },
  events: {
    contradictions: [
      {
        id: `${CASE_ID}-contradiction-1`,
        statementA: '박지연은 카드값과 오피스텔, 새벽 통화가 한 장면으로 묶였기 때문에 딴살림 말고는 설명이 없었다고 말한다.',
        statementB: '이준호는 같은 패턴이 형과 조카를 숨겨 돌본 흔적일 뿐이었다고 말한다.',
        options: {
          point_out: {
            label: '패턴을 정면으로 짚는다',
            effect: '외도 의심과 가족 돌봄 해석이 정면으로 충돌한다.',
          },
          let_go: {
            label: '일단 넘긴다',
            effect: '초반 오해는 남지만 다음 증거에서 뒤집을 여지를 남긴다.',
          },
        },
        npcReaction: '두 사람 모두 같은 패턴을 전혀 다른 결론으로 읽고 있었다는 사실이 드러난다.',
      },
      {
        id: `${CASE_ID}-contradiction-2`,
        statementA: '박지연은 먼저 배신당했다고 믿었기 때문에 2,000만 원을 지켜야 했다고 말한다.',
        statementB: '이준호는 형과 조카를 지키려다 적금 3,000만 원을 먼저 막아 준 것뿐이라고 말한다.',
        options: {
          point_out: {
            label: '돈의 순서를 겨눈다',
            effect: '누가 먼저 신뢰를 깨고 누가 먼저 송금했는지가 갈라진다.',
          },
          let_go: {
            label: '동기를 먼저 듣는다',
            effect: '선의와 공포가 뒤섞인 설명이 조금 더 이어진다.',
          },
        },
        npcReaction: '배신의 시작과 송금의 시작이 서로 다른 방향으로 갈라지며 책임 판단이 더 복잡해진다.',
      },
    ],
    interjections: [
      {
        id: `${CASE_ID}-interjection-a`,
        interruptor: 'a',
        interjectionLine: '박지연은 카드값과 새벽 통화까지 보고도 어떻게 외도를 의심하지 않느냐고 반발한다.',
        options: {
          allow: {
            label: '계속 말하게 둔다',
            effect: 'A측의 피해자 프레임과 수치심이 더 드러난다.',
          },
          block: {
            label: '증거로 다시 묶는다',
            effect: '감정선 대신 실행 순서 질문으로 되돌린다.',
          },
        },
      },
      {
        id: `${CASE_ID}-interjection-b`,
        interruptor: 'b',
        interjectionLine: '이준호는 형네 사정을 말하는 순간 다시 시댁 싸움으로만 몰릴까 봐 끼어든다.',
        options: {
          allow: {
            label: '이유를 더 듣는다',
            effect: 'B측의 회피가 단순 거짓말이 아니었다는 결이 드러난다.',
          },
          block: {
            label: '공동 적금으로 되돌린다',
            effect: '선의보다 월권 책임이 앞으로 나온다.',
          },
        },
      },
    ],
    emotionalOutbursts: [
      {
        id: `${CASE_ID}-outburst-a`,
        party: 'a',
        outburstLine: '박지연은 자신만 돈을 숨긴 사람처럼 몰리는 순간, 남편의 오피스텔 방문과 새벽 통화를 다시 꺼내며 크게 흔들린다.',
        options: {
          press: {
            label: '송금 실행을 더 묻는다',
            effect: 'A측이 2,000만 원 송금의 실제 이유를 더 빨리 인정한다.',
          },
          calm: {
            label: '시간을 준다',
            effect: 'A측이 사기당한 수치심을 더 조심스럽게 털어놓는다.',
          },
        },
      },
      {
        id: `${CASE_ID}-outburst-b`,
        party: 'b',
        outburstLine: '이준호는 형네 얘기를 꺼내는 순간 다시 시댁 싸움으로만 몰릴까 봐 말을 끊고 숨을 고른다.',
        options: {
          press: {
            label: '공동 적금 책임을 겨눈다',
            effect: 'B측이 3,000만 원 독단 처분을 더 빨리 인정한다.',
          },
          calm: {
            label: '가족 사정부터 듣는다',
            effect: 'B측이 왜 침묵을 택했는지 조금 더 길게 설명한다.',
          },
        },
      },
    ],
  },
  transitionBeats: [
    {
      id: `${CASE_ID}-beat-b-d1-s1-s2`,
      caseId: CASE_ID,
      party: 'b',
      disputeId: 'd-1',
      fromState: 'S1',
      toState: 'S2',
      primaryBeatType: 'evidence_hit',
      line: '이준호는 더 숨기기 어려워졌다는 걸 알면서도, 일단 가족 일이라는 말만 꺼내고 핵심은 아직 남겨 둔다.',
      behaviorHint: '답이 짧아지고 시선이 아래로 떨어진다.',
    },
    {
      id: `${CASE_ID}-beat-b-d1-s2-s3`,
      caseId: CASE_ID,
      party: 'b',
      disputeId: 'd-1',
      fromState: 'S2',
      toState: 'S3',
      primaryBeatType: 'partial',
      line: '이준호는 형네 일이었고, 시댁 얘기만 꺼내면 더 크게 싸울 게 뻔해서 말을 못 했다고 털어놓는다.',
      behaviorHint: '변명보다 이유 설명이 길어진다.',
    },
    {
      id: `${CASE_ID}-beat-b-d2-s2-s3`,
      caseId: CASE_ID,
      party: 'b',
      disputeId: 'd-2',
      fromState: 'S2',
      toState: 'S3',
      primaryBeatType: 'confession',
      line: '이준호는 3,000만 원 전부 형 빚을 막는 데 썼다고 인정하지만, 그때는 그 방법밖에 없었다는 말도 덧붙인다.',
      behaviorHint: '숫자를 말하는 목소리는 단단하지만 마지막 문장 끝이 흔들린다.',
    },
    {
      id: `${CASE_ID}-beat-a-d3-s2-s3`,
      caseId: CASE_ID,
      party: 'a',
      disputeId: 'd-3',
      fromState: 'S2',
      toState: 'S3',
      primaryBeatType: 'confession',
      line: '박지연은 혹시 몰라 제 몫을 지키려 했다가 투자방에 2,000만 원을 보냈고, 결국 다 날렸다고 인정한다.',
      behaviorHint: '목소리가 낮아지고 마지막 금액 부분에서 속도가 느려진다.',
    },
    {
      id: `${CASE_ID}-beat-a-d4-s2-s3`,
      caseId: CASE_ID,
      party: 'a',
      disputeId: 'd-4',
      fromState: 'S2',
      toState: 'S3',
      primaryBeatType: 'counter_shift',
      line: '박지연은 먼저 숨긴 쪽은 남편이었다고 되받아치지만, 실제 송금 시점이 자신의 손에서 먼저 실행됐다는 사실도 부정하지 못한다.',
      behaviorHint: '상대 비난과 자기 인정이 한 문장 안에서 충돌한다.',
    },
    {
      id: `${CASE_ID}-beat-b-d4-s2-s3`,
      caseId: CASE_ID,
      party: 'b',
      disputeId: 'd-4',
      fromState: 'S2',
      toState: 'S3',
      primaryBeatType: 'partial',
      line: '이준호는 자신이 먼저 숨긴 건 맞지만, 먼저 돈을 움직인 건 박지연 쪽이었다고 힘겹게 선을 긋는다.',
      behaviorHint: '고개를 끄덕인 뒤 바로 반박 문장을 이어 붙인다.',
    },
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
