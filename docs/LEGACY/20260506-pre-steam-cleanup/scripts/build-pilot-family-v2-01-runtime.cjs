const fs = require('fs')
const path = require('path')
const { enrichRuntimeFile } = require('./lib/runtime-gameplay-enricher.cjs')

const ROOT = path.resolve(__dirname, '..')
const CASE_ID = 'family-v2-01'
const TITLE = '치매 어머니의 유서'
const REF_DIR = path.join(ROOT, 'docs', 'ref', '리뉴얼참고')
const RUNTIME_OUT_PATH = path.join(ROOT, 'src', 'data', 'cases', 'generated', `${CASE_ID}.json`)
const V3_JSON_OUT_PATH = path.join(REF_DIR, `${CASE_ID}-v3-game-loop-data.json`)
const V3_TS_OUT_PATH = path.join(REF_DIR, `${CASE_ID}-v3-game-loop-data.ts`)

const HOOK =
  '배다른 동생을 평생 못마땅해하던 형은, 치매 어머니가 남긴 유서에서 자기 몫이 40퍼센트라는 걸 보고 무너진다. 동생은 끝까지 담담하다. 그래서 더 수상해 보인다.'
const ANCHOR_TRUTH =
  '윤정후는 유서를 직접 손댄 건 맞지만 자기 몫을 줄이는 조작을 했고, 20년간 형과 어머니를 몰래 도우며 형의 출생 비밀까지 지켜 왔다. 윤태성은 어머니를 모시고 살았다는 이유로 자신이 더 받아야 한다고 믿으며 평생 윤정후를 깎아내려 왔다.'
const MID_TWIST =
  '초반에는 윤정후가 치매 어머니를 움직여 유서를 유리하게 바꾼 것처럼 보인다. 그러나 공증 스캔본과 원본 유서가 겹치면, 윤정후는 90대 10을 60대 40으로 자기 몫을 줄여 바꾼 것이었음이 드러난다. 이어 20년 송금 내역과 어머니 일기장이 열리면, 사건은 단순한 유산 다툼이 아니라 동생이 형의 삶과 비밀을 함께 떠안아 온 구조로 뒤집힌다.'
const DILEMMA =
  '유서를 직접 손댄 건 분명히 윤정후다. 하지만 그 조작은 자기 몫을 줄인 조작이고, 20년간 형과 어머니를 몰래 떠받쳐 온 것도 윤정후다. 윤태성은 평생 윤정후를 괄시했지만, 그가 무엇을 숨기고 있었는지 몰랐고 자기 출생의 진실조차 모른 채 살아온 피해자이기도 하다.'

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

function atom(id, unlockedAtState, factText, tags, stanceHints = ['partial', 'blame', 'confess']) {
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

const disputes = [
  {
    id: 'd-1',
    name: '말년 어머니는 유서를 스스로 판단할 능력이 있었나, B가 그 틈을 탄 건가',
    truth: true,
    truthDescription:
      '윤정후가 말년에 자주 찾아가고 서류를 챙긴 것은 사실이지만, 그 방문 자체만으로 어머니를 이용했다고 단정할 수는 없다. 핵심은 치매 말기의 판단능력과 공증 전후 흐름을 누가 어떻게 조절했는가다.',
    quadrant: 'b_only',
    requiredEvidence: ['e-2', 'e-3', 'e-4'],
    correctResponsibility: { a: 35, b: 65 },
    ambiguity: 'high',
    weight: 'high',
    mediationLink: '말년 돌봄과 판단능력',
    legitimacyIssue: true,
    judgmentStatement: '방문 빈도만으로는 이용 여부가 확정되지 않는다.',
  },
  {
    id: 'd-2',
    name: '60대 40 유서 조작은 자기 몫을 늘리려 한 조작인가, 줄이려 한 조작인가',
    truth: true,
    truthDescription:
      '윤정후는 유서를 조작했다. 다만 방향은 자기 몫을 늘리는 쪽이 아니라 90대 10을 60대 40으로 바꾸며 자기 몫을 줄이는 쪽이었다. 문제는 그 이유와 그 조작의 정당성이다.',
    quadrant: 'b_only',
    requiredEvidence: ['e-4', 'e-5'],
    correctResponsibility: { a: 20, b: 80 },
    ambiguity: 'low',
    weight: 'high',
    mediationLink: '유서 조작의 방향',
    legitimacyIssue: true,
    judgmentStatement: '조작은 맞지만 방향은 탐욕 쪽과 다르다.',
  },
  {
    id: 'd-3',
    name: '20년 생활비와 A 사업 실패 때 돈은 누구 돈이었고 어떤 성격이었나',
    truth: true,
    truthDescription:
      '어머니 이름으로 흘러들어온 생활비와 공장 구제금 상당수는 윤정후 돈이었다. 다만 그 돈을 숨긴 방식이 보호였는지, 형의 판단을 빼앗은 통제였는지가 남는다.',
    quadrant: 'b_only',
    requiredEvidence: ['e-6'],
    correctResponsibility: { a: 40, b: 60 },
    ambiguity: 'high',
    weight: 'high',
    mediationLink: '20년 송금의 성격',
    legitimacyIssue: false,
    judgmentStatement: '돈의 출처가 뒤집히면 상속 구도 전체가 흔들린다.',
  },
  {
    id: 'd-4',
    name: 'A의 출생 비밀을 B는 왜 알고도 숨겼는가',
    truth: true,
    truthDescription:
      '윤정후는 형이 배다른 자식이라는 사실을 어머니 일기와 오래된 정황으로 알고 있었고, 그 비밀이 드러나면 집안 자리와 공장 기반이 함께 무너질 거라고 판단했다. 그래서 유서까지 손댔다.',
    quadrant: 'b_only',
    requiredEvidence: ['e-7'],
    correctResponsibility: { a: 20, b: 80 },
    ambiguity: 'low',
    weight: 'high',
    mediationLink: '출생 비밀과 유서',
    legitimacyIssue: true,
    judgmentStatement: '유서 조작의 끝에는 상속액이 아니라 출생 비밀이 있다.',
  },
  {
    id: 'd-5',
    name: '누가 정말 어머니를 이용했는가',
    truth: true,
    truthDescription:
      '윤태성은 어머니를 모셨다는 이유로 상속과 정당성을 독점하려 했고, 윤정후는 어머니 뜻을 지킨다는 명분으로 유서를 직접 바꿨다. 둘 다 어머니의 침묵을 각자 다른 방식으로 사용했다.',
    quadrant: 'shared_misconception',
    requiredEvidence: ['e-6', 'e-7'],
    correctResponsibility: { a: 50, b: 50 },
    ambiguity: 'high',
    weight: 'high',
    mediationLink: '보호와 이용의 경계',
    legitimacyIssue: true,
    judgmentStatement: '보호와 이용은 이 사건에서 분리되지 않는다.',
  },
]
const evidence = [
  {
    id: 'e-1',
    name: '60대 40 유서 사본',
    surfaceName: '60대 40 유서 사본',
    description:
      '어머니 이름으로 작성된 유서 사본이다. B 60퍼센트, A 40퍼센트로 적혀 있고, 공증 전까지 가장 강한 인상 증거로 작동한다.',
    surfaceDescription: '형 40, 동생 60으로 적힌 유서 사본이다.',
    type: 'contract',
    reliability: 'hard',
    completeness: 'original',
    provenance: 'self_possessed',
    legitimacy: 'lawful',
    proves: ['d-1', 'd-2'],
    isTrap: false,
    requires: [],
    investigationResults: {
      request_original: '유서 사본의 문장과 비율은 명확하다. A 40, B 60이라는 숫자가 사건 첫 인상을 지배한다.',
      check_metadata: '문서가 먼저 준 충격은 명확하지만, 왜 이런 배분이 나왔는지는 이 사본만으로 설명되지 않는다.',
      restore_context: '이 사본만 보면 B가 어머니 말년을 틈타 상속 비율을 바꾼 것처럼 보이게 된다.',
    },
    subjectParty: 'b',
    investigationStages: [
      stage(0, 'request_original', '이 유서가 어머니 사후에 나온 최종본 맞습니까?', 'authenticity'),
      stage(1, 'check_metadata', '형이 40이고 동생이 60인 게, 처음 들었을 때 무엇이 가장 이상했습니까?', 'context'),
      stage(
        2,
        'restore_context',
        '이 유서만 보면 B가 어머니를 움직인 것처럼 보이는데, 그렇게 믿게 된 결정적 이유는 무엇입니까?',
        'responsibility',
      ),
    ],
    partyContext: {
      a: {
        questionAngle: '왜 이 숫자만 보고 동생이 어머니를 이용했다고 확신했는지 설명해 주십시오.',
        implication: 'A의 오래된 반감과 상속 기대가 판단을 어떻게 밀어 올렸는지가 드러난다.',
      },
      b: {
        questionAngle: '이 사본이 처음 나왔을 때 왜 직접 설명하지 않고 버텼는지 말해 주십시오.',
        implication: 'B의 침묵이 탐욕처럼 읽히게 된 출발점이 된다.',
      },
    },
  },
  {
    id: 'e-2',
    name: '요양원 방문기록',
    surfaceName: '요양원 방문기록',
    description:
      '말년의 방문 빈도와 공증 직전 일정이 함께 남아 있는 기록이다. B가 자주 드나든 사실과 보호사 교대 타이밍이 겹친다.',
    surfaceDescription: 'B의 말년 방문 흐름이 남은 로그다.',
    type: 'log',
    reliability: 'hard',
    completeness: 'original',
    provenance: 'institutional',
    legitimacy: 'lawful',
    proves: ['d-1'],
    isTrap: false,
    requires: [],
    investigationResults: {
      request_original: '윤정후의 방문 횟수는 기록으로 남아 있고, 공증 직전 시기와 겹친다.',
      check_metadata: '단순 병문안보다 훨씬 자주 드나든 패턴이라 초반에는 조작 정황처럼 읽힌다.',
      restore_context: '방문 흐름만으로는 돌봄인지 개입인지 갈리지 않지만, 의심이 구조화되는 핵심 기반이 된다.',
    },
    subjectParty: 'b',
    investigationStages: [
      stage(0, 'request_original', 'B가 말년에 자주 찾아간 건 사실입니까?', 'authenticity'),
      stage(1, 'check_metadata', '공증 직전부터 방문 횟수가 더 늘어났다고 보십니까?', 'context'),
      stage(
        2,
        'restore_context',
        '요양보호사 교대 시점까지 겹치는데, 누가 그 흐름을 만들었다고 판단합니까?',
        'responsibility',
      ),
    ],
    partyContext: {
      a: {
        questionAngle: '이 방문 흐름을 왜 곧바로 유서 개입 정황으로 묶었는지 말해 주십시오.',
        implication: 'A는 오래된 반감 위에서 기록을 해석했다는 점이 선명해진다.',
      },
      b: {
        questionAngle: '말년 방문이 왜 그렇게 잦았는지, 그리고 왜 형에게 그 흐름을 감췄는지 설명해 주십시오.',
        implication: 'B의 방문 목적과 침묵의 책임이 동시에 열린다.',
      },
    },
  },
  {
    id: 'e-3',
    name: '전 요양보호사 음성증언',
    surfaceName: '전 요양보호사 음성증언',
    description:
      '정후가 종이를 자주 들고 왔고 어머니를 달래며 조절하려 했다는 증언이다. 초반에는 B를 가장 수상하게 보이게 만든다.',
    surfaceDescription: '정후가 서류를 들고 왔다는 보호사 증언이다.',
    type: 'testimony',
    reliability: 'hard',
    completeness: 'original',
    provenance: 'third_party',
    legitimacy: 'lawful',
    proves: ['d-1'],
    isTrap: false,
    requires: [],
    investigationResults: {
      request_original: '증언은 윤정후가 종이를 들고 오고 어머니를 달래며 조율했다는 장면을 구체적으로 남긴다.',
      check_metadata: '말투만 놓고 보면 보호인지 통제인지 갈린다. 그래서 오히려 양쪽 해석을 모두 낳는다.',
      restore_context: 'B의 행동이 어머니를 살핀 것인지 배제한 것인지, 여기서부터 논쟁의 축이 생긴다.',
    },
    subjectParty: 'b',
    investigationStages: [
      stage(0, 'request_original', "이 증언 속 '종이'가 유서라고 보십니까?", 'authenticity'),
      stage(1, 'check_metadata', '정후가 챙기기 전에 먼저 어머니를 달랬다는 대목, 누구에게 유리한 말입니까?', 'context'),
      stage(
        2,
        'restore_context',
        '그 조절하려는 태도가 어머니를 보호한 건지, 배제한 건지 지금도 단정할 수 있습니까?',
        'responsibility',
      ),
    ],
    partyContext: {
      a: {
        questionAngle: '이 음성증언을 듣고 왜 더 확신하게 됐는지 말해 주십시오.',
        implication: 'A는 정황을 이미 결론이 난 그림으로 읽고 있었다.',
      },
      b: {
        questionAngle: '보호사에게 보인 행동이 왜 통제로 보일 수 있었는지 인정합니까?',
        implication: 'B가 만든 오해의 장면이 스스로의 책임으로 돌아온다.',
      },
    },
  },
  {
    id: 'e-4',
    name: '공증사무실 스캔 보관본',
    surfaceName: '공증사무실 스캔 보관본',
    description:
      '같은 날 두 버전이 스캔된 기록이다. 첫 보관본은 90대 10, 다음 보관본은 60대 40이고 마지막 접수자가 B로 남아 있다.',
    surfaceDescription: '90대 10과 60대 40 두 버전이 남은 스캔 보관본이다.',
    type: 'log',
    reliability: 'hard',
    completeness: 'original',
    provenance: 'institutional',
    legitimacy: 'lawful',
    proves: ['d-1', 'd-2'],
    isTrap: false,
    requires: ['e-1', 'e-2'],
    requiredLieState: 'S2',
    investigationResults: {
      request_original: '한 날짜에 두 버전이 존재한다. 조작이 있었다는 사실 자체는 여기서 확정된다.',
      check_metadata: '윤정후가 다시 제출한 기록이 붙으면서 누가 움직였는지는 숨기기 어려워진다.',
      restore_context: '이제 질문은 조작 여부가 아니라, 왜 90을 60으로 낮췄는가로 이동한다.',
    },
    subjectParty: 'b',
    investigationStages: [
      stage(0, 'request_original', '같은 날 두 버전이 스캔된 사실, 부인할 수 있습니까?', 'authenticity'),
      stage(1, 'check_metadata', '왜 90이 60으로 바뀐 서류를 다시 냈습니까?', 'context'),
      stage(
        2,
        'restore_context',
        '자기 몫을 줄이는 조작까지 하면서, 원래 무엇을 막으려던 겁니까?',
        'responsibility',
      ),
    ],
    partyContext: {
      a: {
        questionAngle: '조작이 확인된 뒤에도 왜 곧바로 탐욕의 방향이라고 확신했는지 설명해 주십시오.',
        implication: 'A의 반감은 사실을 보정하기보다 더 강하게 한쪽으로 기울게 만든다.',
      },
      b: {
        questionAngle: '문서를 다시 낸 사람이 본인인 건 맞습니까. 그렇다면 방향을 왜 그렇게 바꿨습니까.',
        implication: 'B의 침묵이 끝나고 핵심 동기가 드러나기 시작한다.',
      },
    },
  },
  {
    id: 'e-5',
    name: '원본 유서 90대 10',
    surfaceName: '원본 유서 90대 10',
    description:
      '어머니 서랍에서 나온 원본 유서다. 날짜는 더 앞서 있고, 정후 90 태성 10이라는 배분이 적혀 있다.',
    surfaceDescription: '처음 작성된 90대 10 원본 유서다.',
    type: 'contract',
    reliability: 'hard',
    completeness: 'original',
    provenance: 'self_possessed',
    legitimacy: 'lawful',
    proves: ['d-2', 'd-4'],
    isTrap: false,
    requires: ['e-4'],
    requiredLieState: 'S3',
    investigationResults: {
      request_original: '원본은 90대 10이다. 어머니의 초안이 어느 방향이었는지가 명확해진다.',
      check_metadata: '60대 40은 탐욕의 증거가 아니라 오히려 자기 몫을 줄인 흔적이 된다.',
      restore_context: '이제 남는 질문은 왜 그 감소가 필요했는지, 그리고 그 뒤에 무엇이 숨어 있는지다.',
    },
    subjectParty: 'b',
    investigationStages: [
      stage(0, 'request_original', '이 원본 유서, 어머니가 먼저 써 둔 문서 맞습니까?', 'authenticity'),
      stage(1, 'check_metadata', '90대 10이 어머니의 진심이었다면, 누가 굳이 60대 40으로 바꿉니까?', 'context'),
      stage(
        2,
        'restore_context',
        '자기 몫을 깎는 쪽으로 유서를 고친 이유가 돈이 아니라면, 남은 이유는 무엇입니까?',
        'responsibility',
      ),
    ],
    partyContext: {
      a: {
        questionAngle: '원본 비율을 본 뒤에도 동생의 동기를 하나로만 볼 수 있었습니까?',
        implication: 'A의 세계관이 처음으로 크게 흔들리는 지점이다.',
      },
      b: {
        questionAngle: '자기 몫을 줄이면서까지 문서를 바꾼 이유가 정확히 무엇이었는지 답해 주십시오.',
        implication: '출생 비밀과 집안 붕괴 공포가 조작의 실질 동기로 떠오른다.',
      },
    },
  },
  {
    id: 'e-6',
    name: '20년 송금 내역 묶음',
    surfaceName: '20년 송금 내역 묶음',
    description:
      '어머니 통장으로 매달 들어간 생활비와 A 공장 부도 직전 들어간 큰 금액이 묶여 있다. 상당수가 B 돈이라는 흐름이 드러난다.',
    surfaceDescription: '생활비와 공장 구제금의 출처를 묶은 은행 내역이다.',
    type: 'bank',
    reliability: 'hard',
    completeness: 'original',
    provenance: 'institutional',
    legitimacy: 'lawful',
    proves: ['d-3', 'd-5'],
    isTrap: false,
    requires: ['e-5'],
    requiredLieState: 'S2',
    investigationResults: {
      request_original: '매달 반복된 생활비와 공장 구제금이 하나의 흐름으로 묶인다. 우연으로 보기 어렵다.',
      check_metadata: '형이 어머니 돈으로 알던 자금의 상당 부분이 사실 동생 돈이었다는 구조가 드러난다.',
      restore_context: '상속 분쟁이 돈의 출처 문제로 뒤집히면서, 누가 무엇을 떠받쳤는지가 중심으로 올라온다.',
    },
    subjectParty: 'b',
    investigationStages: [
      stage(0, 'request_original', '이 생활비 송금, B가 어머니에게 보낸 것 맞습니까?', 'authenticity'),
      stage(1, 'check_metadata', 'A 사업이 무너질 때마다 같은 이름으로 돈이 들어간 걸 왜 몰랐다고 합니까?', 'context'),
      stage(
        2,
        'restore_context',
        '형이 평생 어머니가 쥐어준 줄 알던 돈, 사실 누가 보낸 겁니까?',
        'responsibility',
      ),
    ],
    partyContext: {
      a: {
        questionAngle: '그 돈의 출처를 왜 한 번도 확인하지 않았는지 말해 주십시오.',
        implication: 'A는 어머니와 자기 권리라는 프레임 안에서 돈의 실체를 묻지 않았다.',
      },
      b: {
        questionAngle: '이 돈을 왜 계속 어머니 이름 뒤에 숨겼는지 설명해 주십시오.',
        implication: 'B가 보호와 통제를 같은 방식으로 수행한 흔적이 보인다.',
      },
    },
  },
  {
    id: 'e-7',
    name: '어머니 일기장 사진',
    surfaceName: '어머니 일기장 사진',
    description:
      '어머니가 태성의 출생 비밀과 정후의 역할을 적어 둔 일기 사진이다. 90대 10과 60대 40의 이유가 여기서 연결된다.',
    surfaceDescription: '출생 비밀과 유서 변경 이유가 적힌 일기 사진이다.',
    type: 'device',
    reliability: 'hard',
    completeness: 'original',
    provenance: 'self_possessed',
    legitimacy: 'lawful',
    proves: ['d-4', 'd-5'],
    isTrap: false,
    requires: ['e-5', 'e-6'],
    requiredLieState: 'S3',
    investigationResults: {
      request_original: '필체와 맥락상 어머니의 기록으로 읽힌다. 숨겨진 가족사가 직접적으로 적혀 있다.',
      check_metadata: '태성이 내 배로 낳지 않았지만 내 자식이라는 문장이 상속 비율의 진짜 공포를 설명한다.',
      restore_context: '60대 40 조작은 욕심의 증거가 아니라, 태성의 자리와 집안 균열을 동시에 막으려 한 잘못된 보호로 재해석된다.',
    },
    subjectParty: 'b',
    investigationStages: [
      stage(0, 'request_original', '이 필체가 어머니 글씨라고 봐도 됩니까?', 'authenticity'),
      stage(
        1,
        'check_metadata',
        "'태성이도 내 배로 낳지 않았지만 내 자식'이라는 문장을 어떻게 받아들여야 합니까?",
        'context',
      ),
      stage(
        2,
        'restore_context',
        '결국 60대 40 조작은 B의 욕심이 아니라 태성의 몫을 지키려는 행동이었습니까?',
        'responsibility',
      ),
    ],
    partyContext: {
      a: {
        questionAngle: '이 일기장을 본 뒤에도 동생의 행동을 전부 탐욕으로만 읽을 수 있습니까?',
        implication: 'A의 정체성 충격과 상속 프레임이 정면으로 충돌한다.',
      },
      b: {
        questionAngle: '이 비밀을 알고도 왜 유서 조작이라는 최악의 방식을 택했는지 설명해 주십시오.',
        implication: 'B의 보호 서사는 마지막까지 정당화될 수 없는 선을 넘었다는 점을 남긴다.',
      },
    },
  },
]
const truthTable = [
  {
    id: 't-1',
    fact: '윤정후는 말년의 방문과 서류 조율을 실제로 했다.',
    isTrue: true,
    weight: 8,
    quadrant: 'b_only',
  },
  {
    id: 't-2',
    fact: '윤정후는 유서를 90대 10에서 60대 40으로 바꾸며 자기 몫을 줄였다.',
    isTrue: true,
    weight: 10,
    quadrant: 'b_only',
  },
  {
    id: 't-3',
    fact: '20년 생활비와 공장 구제금의 상당수는 어머니 돈이 아니라 윤정후 돈이었다.',
    isTrue: true,
    weight: 10,
    quadrant: 'b_only',
  },
  {
    id: 't-4',
    fact: '윤정후는 태성의 출생 비밀이 드러나면 집안과 공장이 함께 무너질 것을 두려워했다.',
    isTrue: true,
    weight: 10,
    quadrant: 'b_only',
  },
  {
    id: 't-5',
    fact: '이 사건의 핵심은 단순한 상속 탐욕이 아니라, 가족이 어머니의 침묵 위에 각자 다른 거짓말을 쌓아 올린 구조다.',
    isTrue: true,
    weight: 8,
    quadrant: 'shared_misconception',
  },
]

const lieConfigA = [
  {
    disputeId: 'd-1',
    lieType: 'LT-3',
    lieIntensity: 'L2',
    lieMotive: 'face_saving',
    initialState: 'S0',
    collapseViaTrust: false,
    transitions: [
      { from: 'S0', to: 'S1', trigger: 'd-1_a_blame_question' },
      { from: 'S1', to: 'S2', trigger: 'hard_evidence' },
      { from: 'S2', to: 'S3', trigger: 'e-3_presented' },
      { from: 'S3', to: 'S4', trigger: 'd-1_a_capacity_question' },
      { from: 'S4', to: 'S5', trigger: 'd-1_a_bias_confession' },
    ],
  },
  {
    disputeId: 'd-5',
    lieType: 'LT-1',
    lieIntensity: 'L2',
    lieMotive: 'face_saving',
    initialState: 'S0',
    collapseViaTrust: true,
    transitions: [
      { from: 'S0', to: 'S1', trigger: 'd-5_a_accusation_question' },
      { from: 'S1', to: 'S2', trigger: 'hard_evidence' },
      { from: 'S2', to: 'S3', trigger: 'e-6_presented' },
      { from: 'S3', to: 'S4', trigger: 'e-7_presented' },
      { from: 'S4', to: 'S5', trigger: 'd-5_a_shared_failure_question' },
    ],
  },
]

const lieConfigB = [
  {
    disputeId: 'd-1',
    lieType: 'LT-7',
    lieIntensity: 'L2',
    lieMotive: 'self_protection',
    initialState: 'S0',
    collapseViaTrust: false,
    transitions: [
      { from: 'S0', to: 'S1', trigger: 'd-1_b_visit_question' },
      { from: 'S1', to: 'S2', trigger: 'hard_evidence' },
      { from: 'S2', to: 'S3', trigger: 'e-3_presented' },
      { from: 'S3', to: 'S4', trigger: 'd-1_b_motive_question' },
      { from: 'S4', to: 'S5', trigger: 'd-1_b_care_confession' },
    ],
  },
  {
    disputeId: 'd-2',
    lieType: 'LT-7',
    lieIntensity: 'L3',
    lieMotive: 'self_protection',
    initialState: 'S0',
    collapseViaTrust: false,
    transitions: [
      { from: 'S0', to: 'S1', trigger: 'd-2_b_will_question' },
      { from: 'S1', to: 'S2', trigger: 'hard_evidence' },
      { from: 'S2', to: 'S3', trigger: 'e-4_presented' },
      { from: 'S3', to: 'S4', trigger: 'e-5_presented' },
      { from: 'S4', to: 'S5', trigger: 'd-2_b_true_reason_question' },
    ],
  },
  {
    disputeId: 'd-3',
    lieType: 'LT-7',
    lieIntensity: 'L2',
    lieMotive: 'face_saving',
    initialState: 'S0',
    collapseViaTrust: false,
    transitions: [
      { from: 'S0', to: 'S1', trigger: 'd-3_b_transfer_question' },
      { from: 'S1', to: 'S2', trigger: 'hard_evidence' },
      { from: 'S2', to: 'S3', trigger: 'e-6_presented' },
      { from: 'S3', to: 'S4', trigger: 'd-3_b_support_question' },
      { from: 'S4', to: 'S5', trigger: 'd-3_b_family_collapse_question' },
    ],
  },
  {
    disputeId: 'd-4',
    lieType: 'LT-7',
    lieIntensity: 'L3',
    lieMotive: 'face_saving',
    initialState: 'S0',
    collapseViaTrust: true,
    transitions: [
      { from: 'S0', to: 'S1', trigger: 'd-4_b_secret_question' },
      { from: 'S1', to: 'S2', trigger: 'hard_evidence' },
      { from: 'S2', to: 'S3', trigger: 'e-7_presented' },
      { from: 'S3', to: 'S4', trigger: 'd-4_b_birth_secret_question' },
      { from: 'S4', to: 'S5', trigger: 'd-4_b_protection_reason_question' },
    ],
  },
]

const relationshipLedger = [
  {
    id: 'ledger-1',
    category: 'confirmed',
    description:
      '윤태성은 어머니를 모시고 살았고, 그 시간이 상속과 도덕성의 근거라고 오래 믿어 왔다. 윤정후는 그 믿음 밖에서 돈과 비밀을 동시에 떠안았다.',
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
      '윤태성은 동생이 평생 더 많이 가져가려 했다고 믿었고, 윤정후는 형이 진실을 알면 집안 자체가 무너질 거라고 믿었다. 같은 유서를 둘 다 전혀 다른 공포로 읽었다.',
    isReal: true,
    whoRemembersAccurately: 'both',
    whoDistorts: 'both',
    distortionDirection: '형은 탐욕의 방향으로, 동생은 붕괴의 방향으로 사건을 기억한다.',
    currentlyResolved: 'unresolved',
    emotionalResidue: 'strong',
    connectionToCurrent: 'direct',
  },
  {
    id: 'ledger-3',
    category: 'silenced',
    description:
      '20년 송금과 출생 비밀은 모두 어머니 침묵 뒤에 숨겨졌다. 그래서 상속 분쟁이 시작되자 가장 늦게 밝혀져야 할 사실들이 맨 마지막에 한꺼번에 터진다.',
    isReal: true,
    whoRemembersAccurately: 'b',
    whoDistorts: 'a',
    distortionDirection: 'A는 돈과 비밀의 출처를 어머니 뜻으로만 묶어 두고 있었다.',
    currentlyResolved: 'surface_only',
    emotionalResidue: 'strong',
    connectionToCurrent: 'direct',
  },
]

const socialGraph = [
  {
    id: 'w-1',
    slot: 'family_1',
    name: '최복순',
    relationTo: 'both',
    knowledgeScope:
      '전 요양보호사로서 말년 방문 빈도, 정후가 들고 온 종이, 어머니가 불안해질 때 누가 먼저 말을 눌렀는지를 가까이서 봤다.',
    witnessedDirectly: true,
    bias: 'neutral',
    distortionRisk: 'accurate',
    surfaceKnowledge: '공증 직전 분위기와 B의 태도를 직접 본 증인이다.',
    relatedDisputeIds: ['d-1', 'd-2'],
    witnessProfile: {
      age: 61,
      occupation: '전 요양보호사',
      relationToA: '어머니를 모시던 보호자 가족으로 보아 왔다.',
      relationToB: '말년에 자주 드나들던 보호자 가족으로 기억한다.',
      sentimentToA: 10,
      sentimentToB: 10,
      speechStyle: '본 사람이 있는 장면만 또렷하게 말하고, 해석이 필요한 부분은 선을 긋는다.',
      addressJudge: '재판장님',
      addressA: '태성 씨',
      addressB: '정후 씨',
    },
  },
  {
    id: 'w-2',
    slot: 'family_2',
    name: '김영수',
    relationTo: 'b',
    knowledgeScope:
      '공증사무실 직원으로 같은 날 두 버전의 문서가 스캔되고 다시 접수된 사실을 기록으로 확인했다. 마지막 접수자가 누구인지도 알고 있다.',
    witnessedDirectly: true,
    bias: 'neutral',
    distortionRisk: 'accurate',
    surfaceKnowledge: '유서 두 버전의 존재와 접수 순서를 설명할 수 있다.',
    relatedDisputeIds: ['d-2'],
    witnessProfile: {
      age: 57,
      occupation: '공증사무실 직원',
      relationToA: '사건 이후 처음 법정에서 본 수준이다.',
      relationToB: '문서 접수인으로만 기억한다.',
      sentimentToA: 0,
      sentimentToB: 0,
      speechStyle: '기록 순서와 문서 상태를 날짜 중심으로 정확히 진술한다.',
      addressJudge: '재판장님',
      addressA: '윤태성 씨',
      addressB: '윤정후 씨',
    },
  },
  {
    id: 'w-3',
    slot: 'acquaintance_1',
    name: '박순애',
    relationTo: 'b',
    knowledgeScope:
      '어머니의 오래된 친구로서, 어머니가 정후가 보내는 돈으로 겨우 버틴다고 말한 적과 태성의 출생 관련 불안을 흘린 적을 기억한다.',
    witnessedDirectly: true,
    bias: 'pro_b',
    distortionRisk: 'accurate',
    surfaceKnowledge: '20년 송금과 어머니의 숨긴 불안을 연결할 수 있는 증인이다.',
    relatedDisputeIds: ['d-3', 'd-4', 'd-5'],
    witnessProfile: {
      age: 69,
      occupation: '어머니의 오래된 친구',
      relationToA: '어릴 때부터 봐 온 집안 아이로 기억한다.',
      relationToB: '어머니 걱정을 대신 들여다보던 아들로 기억한다.',
      sentimentToA: 10,
      sentimentToB: 35,
      speechStyle: '옛일을 천천히 꺼내며, 돈과 체면 얘기 사이의 간격을 함께 설명한다.',
      addressJudge: '재판장님',
      addressA: '태성아',
      addressB: '정후야',
    },
  },
]

const evidenceCombinations = [
  {
    requires: ['e-1', 'e-2'],
    upgradesTo: 'hard',
    proves: ['d-1'],
    description: '말년 방문 흐름과 60대 40 유서가 겹치며, 초반에는 B가 치매 어머니를 움직였다는 의심이 가장 강해진다.',
  },
  {
    requires: ['e-4', 'e-5'],
    upgradesTo: 'hard',
    proves: ['d-2'],
    description: '조작은 맞지만 방향이 반대였다는 사실이 확정되며, 유서 조작의 질문이 탐욕에서 이유로 이동한다.',
  },
  {
    requires: ['e-5', 'e-6'],
    upgradesTo: 'hard',
    proves: ['d-3'],
    description: '원본 유서와 20년 송금이 붙으면서, 90대 10의 배경이 감정이 아니라 장기간의 실제 지원이었음이 굳어진다.',
  },
  {
    requires: ['e-6', 'e-7'],
    upgradesTo: 'hard',
    proves: ['d-4', 'd-5'],
    description: '돈의 출처와 일기장이 묶이며, B가 자기 몫만이 아니라 형의 출생 비밀과 자리를 함께 떠안고 있었다는 전체 그림이 완성된다.',
  },
]

const combinationLab = {
  analysisPointsBase: 5,
  analysisPointRefundOnFirstHidden: 0,
  nodes: [
    evidenceNode('e-1', '유서 60대 40', ['d-1', 'd-2']),
    evidenceNode('e-2', '요양원 방문기록', ['d-1']),
    evidenceNode('e-4', '공증사무실 스캔본', ['d-2']),
    evidenceNode('e-5', '원본 유서 90대 10', ['d-2', 'd-4']),
    evidenceNode('e-6', '20년 송금 내역', ['d-3', 'd-5']),
    evidenceNode('e-7', '어머니 일기장', ['d-4', 'd-5']),
    derivedNode('n-1', '말년 접근과 유산 비율이 맞물린다', ['d-1'], ['e-1', 'e-2']),
    derivedNode('n-2', '조작은 맞다. 그런데 자기 몫을 줄였다', ['d-2'], ['e-4', 'e-5']),
    derivedNode('n-3', 'B는 돈과 비밀 둘 다 떠안고 있었다', ['d-3', 'd-4', 'd-5'], ['e-6', 'e-7']),
  ],
  outputs: [
    {
      id: 'n-1',
      label: '말년 접근과 유산 비율이 맞물린다',
      summary:
        '유서 60대 40과 요양원 방문기록이 함께 놓이면, 초반에는 B가 치매 어머니를 대리 조정했다는 그림이 가장 강하게 굳어진다.',
      nodeType: 'derived_note',
      noteText: '말년 접근과 유산 비율이 맞물린다',
      effects: [
        { kind: 'unlock_note', unlockNodeId: 'n-1' },
        {
          kind: 'upgrade_dispute',
          disputeUpgrade: {
            disputeId: 'd-1',
            weight: 'high',
            ambiguity: 'high',
            legitimacyIssue: true,
          },
        },
      ],
      judgeHint: '초반 오해가 왜 그렇게 설득력 있었는지 설명해 주는 조합 메모다.',
    },
    {
      id: 'n-2',
      label: '조작은 맞다. 그런데 자기 몫을 줄였다',
      summary:
        '공증사무실 스캔본과 원본 유서가 붙으면 조작의 존재는 확정되지만, 방향은 탐욕이 아니라 자기 몫을 줄인 쪽으로 뒤집힌다.',
      nodeType: 'derived_note',
      noteText: '조작은 맞다. 그런데 자기 몫을 줄였다',
      effects: [
        { kind: 'unlock_note', unlockNodeId: 'n-2' },
        { kind: 'reframe_dispute', targetId: 'd-2', reframeFromId: 'd-2', reframeToId: 'd-2' },
      ],
      judgeHint: '유서 조작의 질문이 탐욕인지 아닌지에서, 왜 그런 선택을 했는지로 이동하는 지점이다.',
    },
    {
      id: 'n-3',
      label: 'B는 돈과 비밀 둘 다 떠안고 있었다',
      summary:
        '20년 송금 내역과 어머니 일기장이 결합되면, B는 형 몫과 출생 비밀을 동시에 떠안고 있었고 그 잘못된 보호가 유서 조작으로 이어졌다는 전체 그림이 완성된다.',
      nodeType: 'derived_note',
      noteText: 'B는 돈과 비밀 둘 다 떠안고 있었다',
      effects: [
        { kind: 'unlock_note', unlockNodeId: 'n-3' },
        { kind: 'upgrade_dispute', disputeUpgrade: { disputeId: 'd-3', weight: 'high', ambiguity: 'low', legitimacyIssue: false } },
        { kind: 'upgrade_dispute', disputeUpgrade: { disputeId: 'd-4', weight: 'high', ambiguity: 'low', legitimacyIssue: true } },
        { kind: 'upgrade_dispute', disputeUpgrade: { disputeId: 'd-5', weight: 'high', ambiguity: 'high', legitimacyIssue: true } },
      ],
      judgeHint: '마지막 판단은 탐욕보다 비밀과 보호의 왜곡을 함께 봐야 한다는 조합 노트다.',
    },
  ],
  recipes: [
    {
      id: 'combo-1',
      inputs: ['e-1', 'e-2'],
      cost: 1,
      discoveryText: '말년 방문 흐름과 유산 비율이 붙으면서 초반의 강한 의심 구조가 완성된다.',
      outputId: 'n-1',
    },
    {
      id: 'combo-2',
      inputs: ['e-4', 'e-5'],
      cost: 1,
      discoveryText: '조작은 확정되지만, 그 방향이 오히려 자기 몫을 줄인 쪽이었다는 반전이 열린다.',
      outputId: 'n-2',
    },
    {
      id: 'combo-3',
      inputs: ['e-6', 'e-7'],
      cost: 1,
      discoveryText: '돈의 출처와 일기장의 문장이 맞물리며, B가 돈과 비밀 둘 다 떠안고 있었다는 전체 맥락이 드러난다.',
      outputId: 'n-3',
    },
  ],
}
const runtimeCase = {
  caseId: CASE_ID,
  sensitivityTags: ['family_secret'],
  meta: {
    relationshipType: 'family',
    conflictSeed: 'TE-FamilyV201',
    variableModules: ['VM-family-v2-a', 'VM-family-v2-b'],
    twistModule: 'TW-family-v2-1',
    difficulty: 'hard',
    anchorTruth: ANCHOR_TRUTH,
    emotionalBait:
      '치매 어머니 유서에선 동생 몫이 더 많고, 말년 방문기록까지 동생 쪽에 붙어 있다. 그런데 조작 방향과 20년 송금 내역이 뒤집히면, 사건의 중심은 탐욕이 아니라 숨겨진 가족사와 잘못된 보호가 된다.',
    resolutionDilemma: DILEMMA,
  },
  duo: {
    duoId: 'duo-family-v2-01',
    relationshipType: 'family',
    partyA: {
      id: 'a',
      name: '윤태성',
      age: 48,
      occupation: '주방가구 공장 대표',
      incomeBracket: 'mid',
      archetype: 'confrontational',
      speechStyle:
        '동생 책임을 먼저 몰아붙이고, 자기 상처와 분노를 정당성처럼 앞세운다. 그러나 출생과 돈의 출처가 흔들리면 문장 끝이 갑자기 짧아진다.',
      pride: 8,
      fear: '동생이 더 많이 받은 이유가 어머니 뜻이 아니라 자기 모르는 가족사와 연결돼 있었다는 사실을 두려워한다.',
      riskAppetite: 6,
      digitalHabit: 'minimal',
      dailyRoutine:
        '공장 자금과 집안 일을 동시에 붙들고 살았고, 어머니를 모신 시간 자체가 자기 정당성이라고 믿으며 버텨 왔다.',
      sensitivePoints: [
        '말년 어머니 판단능력과 유서 진정성',
        '왜 동생 몫이 더 많았는가',
        '평생 어머니 돈으로 알던 지원의 실제 출처',
      ],
      verbalTells: [
        { type: 'blame_forward', trigger: 'cornered', pattern: '자기 답보다 먼저 동생이 얼마나 비정했는지부터 길게 말한다.' },
        { type: 'rights_shield', trigger: 'cornered', pattern: '어머니를 모신 사람이라는 명분을 방패처럼 세운다.' },
        { type: 'abrupt_stop', trigger: 'shame', pattern: '출생과 돈의 출처 얘기가 나오면 말끝을 갑자기 끊는다.' },
      ],
      callTerms: {
        toPartner: '정후',
        toJudge: '제 동생',
        angry: '윤정후',
      },
      pcFaceType: 'man',
    },
    partyB: {
      id: 'b',
      name: '윤정후',
      age: 44,
      occupation: '자동차부품 가게 운영',
      incomeBracket: 'mid',
      archetype: 'affect_flattening',
      speechStyle:
        '핵심을 아예 부정하기보다 감정을 눌러 말하고, 가장 무거운 이유는 가장 늦게 꺼낸다. 사실을 말하면서도 체온이 낮은 식으로 정리한다.',
      pride: 6,
      fear: '유서 조작의 이유가 돈이 아니라 형의 출생 비밀과 집안 붕괴 공포였다는 점이 한꺼번에 드러나는 것을 두려워한다.',
      riskAppetite: 4,
      digitalHabit: 'banking_app_heavy',
      dailyRoutine:
        '가게 장부를 닫은 뒤 어머니 통장과 형 공장 자금 흐름까지 챙기며 살았고, 드러나면 집안이 깨질 비밀은 끝까지 뒤로 미뤘다.',
      sensitivePoints: [
        '유서를 왜 직접 손댔는가',
        '20년 송금과 공장 구제금의 실제 출처',
        '형의 출생 비밀을 왜 숨겼는가',
      ],
      verbalTells: [
        { type: 'minimize_heat', trigger: 'cornered', pattern: '유서 조작 같은 장면도 마치 장부를 설명하듯 건조하게 말한다.' },
        { type: 'equalize', trigger: 'cornered', pattern: '자기 잘못과 형의 오해를 한 문장 안에 묶어 무게를 평평하게 만든다.' },
        { type: 'late_core', trigger: 'shame', pattern: '핵심 이유는 끝까지 미루다가 마지막 문장에서만 꺼낸다.' },
      ],
      callTerms: {
        toPartner: '형',
        toJudge: '저희 형',
        angry: '윤태성 형',
      },
      pcFaceType: 'man',
    },
    relationshipLedger,
    socialGraph,
  },
  context: {
    contextType: 'inheritance_dispute',
    description: HOOK,
    emotionalPressure: 9,
    affects: 'both',
    triggerAmplifier: MID_TWIST,
    caseNumber: 'TE-FamilyV201',
    caseName: TITLE,
  },
  disputes,
  evidence,
  evidenceCombinations,
  truthTable,
  lieConfigA,
  lieConfigB,
  solutions: {
    상속정리: [
      '60대 40 유서와 90대 10 원본의 충돌을 조작 책임과 분리해 정리하고, 최종 분할은 어머니 의사와 조작 책임을 함께 반영해 다시 산정한다.',
      '형제 모두 유서 변경 행위와 말년 판단능력 문제를 별도 축으로 받아들여야 한다.',
    ],
    금전정산: [
      '20년 송금과 공장 구제금의 실제 출처를 정리해 숨겨진 부양 기여를 상속 판단에 반영한다.',
      '어머니 계좌를 통해 우회된 자금은 상속과 별도 정산 자료로 남긴다.',
    ],
    가족사처리: [
      '출생 비밀은 상속 공격 카드가 아니라 가족사 정리 의제로 분리한다.',
      '어머니 뜻을 지킨다는 명분으로 타인 인생을 대신 설계한 선택은 누구에게도 정당화되지 않는다는 점을 확인한다.',
    ],
  },
  activeLedgerEntries: ['ledger-1', 'ledger-2', 'ledger-3'],
  activeThirdParties: ['w-1', 'w-2', 'w-3'],
  baseEvidenceIds: ['e-1', 'e-2', 'e-3'],
  monetaryDisputeIds: ['d-2', 'd-3', 'd-5'],
  combinationLab,
}
const dossierCards = [
  {
    id: 'dc-1',
    name: '유서를 고친 건 맞는데, 왜 자기 몫을 더 많이 가져가는 쪽이 아니라 덜 가져가는 쪽으로 바꿨습니까?',
    description:
      'd-2가 S3 이상일 때 열리는 카드다. 조작의 존재를 넘어 조작의 방향과 진짜 동기를 강제로 묻는다.',
    evidenceIds: ['e-5'],
    relatedDisputes: ['d-2', 'd-4'],
    subjectParty: 'b',
    challenges: [
      {
        targetParty: 'b',
        questions: [
          dossierQuestion({
            id: 'dc-1.b.q1',
            text: '유서를 고친 건 맞는데, 왜 자기 몫을 더 많이 가져가는 쪽이 아니라 덜 가져가는 쪽으로 바꿨습니까?',
            attackVector: 'context',
            requiredLieState: 'S3',
            revealAtom: `${CASE_ID}:b:d-2:S4:0`,
            lockedHint: '원본 유서까지 열린 뒤에야 조작의 방향을 정면으로 묻는 질문이 보입니다.',
          }),
          dossierQuestion({
            id: 'dc-1.b.q2',
            text: '그렇게까지 해서라도 형 몫을 남겨야 했던 이유가, 돈보다 더 큰 비밀 때문이었습니까?',
            attackVector: 'responsibility',
            requiredLieState: 'S4',
            revealAtom: `${CASE_ID}:b:d-2:S5:0`,
            lockedHint: '조작 방향의 인정 뒤에야 진짜 이유를 묻는 질문이 열립니다.',
          }),
        ],
      },
    ],
  },
  {
    id: 'dc-2',
    name: '형이 평생 어머니 돈인 줄 알았던 그 돈, 사실은 당신 돈이었습니까?',
    description:
      'd-3이 S2 이상일 때 열리는 카드다. 20년 송금의 출처와, 그 돈을 왜 어머니 이름 뒤에 숨겼는지를 정면으로 추궁한다.',
    evidenceIds: ['e-6'],
    relatedDisputes: ['d-3', 'd-5'],
    subjectParty: 'b',
    challenges: [
      {
        targetParty: 'b',
        questions: [
          dossierQuestion({
            id: 'dc-2.b.q1',
            text: '형이 평생 어머니 돈인 줄 알았던 그 돈, 사실은 당신 돈이었습니까?',
            attackVector: 'authenticity',
            requiredLieState: 'S2',
            revealAtom: `${CASE_ID}:b:d-3:S3:0`,
            lockedHint: '20년 송금 흐름이 열린 뒤에야 돈의 출처를 직접 묻는 질문이 보입니다.',
          }),
          dossierQuestion({
            id: 'dc-2.b.q2',
            text: '그 돈이 형을 살리기 위한 돈이었다면, 왜 20년 동안 형 앞에선 어머니 돈처럼 놔뒀습니까?',
            attackVector: 'responsibility',
            requiredLieState: 'S3',
            revealAtom: `${CASE_ID}:b:d-3:S4:0`,
            lockedHint: '지원 사실을 인정한 뒤에야 숨김의 책임을 묻는 질문이 열립니다.',
          }),
        ],
      },
    ],
  },
  {
    id: 'dc-3',
    name: '60대 40으로 바꾸지 않았다면, 형이 무엇을 잃게 됐습니까?',
    description:
      'd-4가 S3 이상일 때 열리는 카드다. 출생 비밀과 집안 붕괴 공포를 직접 꺼내며, 보호 명분이 왜 유서 조작으로 갔는지를 묻는다.',
    evidenceIds: ['e-7'],
    relatedDisputes: ['d-4', 'd-5'],
    subjectParty: 'b',
    challenges: [
      {
        targetParty: 'b',
        questions: [
          dossierQuestion({
            id: 'dc-3.b.q1',
            text: '60대 40으로 바꾸지 않았다면, 형이 무엇을 잃게 됐습니까?',
            attackVector: 'context',
            requiredLieState: 'S3',
            revealAtom: `${CASE_ID}:b:d-4:S4:0`,
            lockedHint: '일기장 문맥이 열린 뒤에야 형이 잃을 것을 직접 묻는 질문이 보입니다.',
          }),
          dossierQuestion({
            id: 'dc-3.b.q2',
            text: '형이 잃게 될 것이 상속액이 아니라 자리와 출생 비밀이었다면, 어머니 뜻까지 바꿀 권리가 있었다고 생각합니까?',
            attackVector: 'responsibility',
            requiredLieState: 'S4',
            revealAtom: `${CASE_ID}:b:d-4:S5:0`,
            lockedHint: '비밀의 성격을 인정한 뒤에야 조작 책임을 끝까지 묻는 질문이 열립니다.',
          }),
        ],
      },
    ],
  },
]

const stateUnlockAtoms = {
  a: {
    'd-1': {},
    'd-2': {},
    'd-3': {},
    'd-4': {},
    'd-5': {},
  },
  b: {
    'd-1': {},
    'd-2': {
      S4: [
        atom(
          `${CASE_ID}:b:d-2:S4:0`,
          'S4',
          '윤정후는 유서 조작의 방향이 자기 몫을 늘리는 쪽이 아니라 형 몫을 조금이라도 남기는 쪽이었다고 인정한다.',
          ['thread-g', CASE_ID, 'd-2', 'dc-1'],
        ),
      ],
      S5: [
        atom(
          `${CASE_ID}:b:d-2:S5:0`,
          'S5',
          '윤정후는 90대 10이 그대로 나오면 형의 출생 비밀과 집안 기반이 한꺼번에 무너질까 봐 60대 40으로 바꿨다고 털어놓는다.',
          ['thread-g', CASE_ID, 'd-2', 'dc-1'],
        ),
      ],
    },
    'd-3': {
      S3: [
        atom(
          `${CASE_ID}:b:d-3:S3:0`,
          'S3',
          '윤정후는 20년 생활비와 공장 부도 직전의 큰 돈 상당수가 자기 돈이었다고 인정한다.',
          ['thread-g', CASE_ID, 'd-3', 'dc-2'],
        ),
      ],
      S4: [
        atom(
          `${CASE_ID}:b:d-3:S4:0`,
          'S4',
          '윤정후는 그 돈을 어머니 이름으로 흘려보낸 이유가 형 자존심과 집안 균열을 동시에 막으려는 선택이었다고 말한다.',
          ['thread-g', CASE_ID, 'd-3', 'dc-2'],
        ),
      ],
    },
    'd-4': {
      S4: [
        atom(
          `${CASE_ID}:b:d-4:S4:0`,
          'S4',
          '윤정후는 형이 잃게 될 것이 상속액보다 먼저 집안 자리와 출생 비밀이라고 믿었다고 인정한다.',
          ['thread-g', CASE_ID, 'd-4', 'dc-3'],
        ),
      ],
      S5: [
        atom(
          `${CASE_ID}:b:d-4:S5:0`,
          'S5',
          '윤정후는 그 공포 때문에 유서까지 손댔고, 그 선택 자체가 잘못이었다는 점도 받아들인다고 말한다.',
          ['thread-g', CASE_ID, 'd-4', 'dc-3'],
        ),
      ],
    },
    'd-5': {},
  },
}

const events = {
  contradictions: [
    {
      id: `${CASE_ID}-contradiction-1`,
      statementA: '윤태성은 말년 방문기록과 유서 사본이 함께 붙는 순간, 동생이 어머니를 이용한 그림 말고는 설명이 없었다고 말한다.',
      statementB: '윤정후는 같은 방문이 어머니와 집안을 동시에 붙들기 위한 돌봄 흐름이었다고 말한다.',
      options: {
        point_out: {
          label: '방문의 성격을 정면으로 짚는다',
          effect: '이용과 돌봄이라는 두 해석이 같은 기록 위에서 충돌한다.',
        },
        let_go: {
          label: '문서 쪽으로 먼저 간다',
          effect: '방문 해석을 잠시 남겨 두고 유서 조작의 방향부터 확인하게 된다.',
        },
      },
      npcReaction: '두 사람 모두 같은 말년 장면을 전혀 다른 도덕 언어로 설명하고 있었다는 점이 드러난다.',
    },
    {
      id: `${CASE_ID}-contradiction-2`,
      statementA: '윤태성은 60대 40이 동생의 탐욕이라고 확신했다.',
      statementB: '윤정후는 오히려 자기 몫을 줄여 형 자리를 남기려 했다고 주장한다.',
      options: {
        point_out: {
          label: '조작 방향을 부딪친다',
          effect: '사건의 중심 질문이 탐욕인지, 보호의 왜곡인지로 바뀐다.',
        },
        let_go: {
          label: '돈의 출처부터 확인한다',
          effect: '유서보다 오래된 20년 송금 흐름이 먼저 핵심으로 올라온다.',
        },
      },
      npcReaction: '같은 조작 행위를 두고도 동기가 정반대로 설명되자, 상속 분쟁의 방향 자체가 흔들린다.',
    },
  ],
  interjections: [
    {
      id: `${CASE_ID}-interjection-a`,
      interruptor: 'a',
      interjectionLine: '윤태성은 어머니를 모신 사람은 자신인데 왜 동생이 늘 뒤에서 결정권을 쥐고 있었냐며 언성을 높인다.',
      options: {
        allow: {
          label: '분노를 더 말하게 둔다',
          effect: 'A가 상속과 돌봄을 같은 권리로 묶고 있었다는 구조가 더 선명해진다.',
        },
        block: {
          label: '기록으로 되돌린다',
          effect: '감정 대신 방문기록과 유서 흐름으로 다시 시선을 돌린다.',
        },
      },
    },
    {
      id: `${CASE_ID}-interjection-b`,
      interruptor: 'b',
      interjectionLine: '윤정후는 형이 아무것도 모르고 쉽게 말한다고 받아치려다가도, 끝 문장에서만 목소리를 낮춘다.',
      options: {
        allow: {
          label: '계속 말하게 둔다',
          effect: 'B가 오래 눌러 둔 비밀과 체념의 층이 조금 더 드러난다.',
        },
        block: {
          label: '유서 조작 책임으로 고정한다',
          effect: '보호 서사와 별개로 넘은 선의 책임을 다시 전면에 둔다.',
        },
      },
    },
  ],
  emotionalOutbursts: [
    {
      id: `${CASE_ID}-outburst-a`,
      party: 'a',
      outburstLine: '윤태성은 평생 자기 몫과 어머니 뜻을 믿고 버텨 왔는데, 돈 출처와 출생 얘기까지 흔들리자 처음으로 말을 잇지 못한다.',
      options: {
        press: {
          label: '돈 출처를 끝까지 묻는다',
          effect: 'A가 동생을 이해하지 못한 채 명분만 붙들고 있었다는 점이 더 선명해진다.',
        },
        calm: {
          label: '출생 얘기를 천천히 받게 한다',
          effect: '정체성 충격을 드러내면서도 장면을 무너지지 않게 붙든다.',
        },
      },
    },
    {
      id: `${CASE_ID}-outburst-b`,
      party: 'b',
      outburstLine: '윤정후는 형이 무너질까 봐 숨긴 것이 결국 더 크게 무너뜨린 셈이 됐다는 말을 겨우 끊어 내며 인정한다.',
      options: {
        press: {
          label: '유서 조작 책임을 더 묻는다',
          effect: '보호 명분과 불법 조작의 경계가 분명해진다.',
        },
        calm: {
          label: '왜 그렇게까지 떠안았는지 듣는다',
          effect: '동생이 돈과 비밀을 같이 짊어진 구조가 더 또렷해진다.',
        },
      },
    },
  ],
}

const transitionBeats = [
  {
    id: `${CASE_ID}-beat-b-d1-s2-s3`,
    caseId: CASE_ID,
    party: 'b',
    disputeId: 'd-1',
    fromState: 'S2',
    toState: 'S3',
    primaryBeatType: 'partial',
    line: '윤정후는 자주 간 건 맞지만 어머니를 밀어붙이려 간 건 아니었다고, 처음으로 방문 목적을 분리해 말한다.',
    behaviorHint: '감정을 죽인 채 단문으로만 대답하다가, 목적 얘기에서만 문장이 길어진다.',
  },
  {
    id: `${CASE_ID}-beat-b-d2-s2-s3`,
    caseId: CASE_ID,
    party: 'b',
    disputeId: 'd-2',
    fromState: 'S2',
    toState: 'S3',
    primaryBeatType: 'confession',
    line: '윤정후는 최종본에 손댄 건 자기라고 인정하지만, 그 인정조차 감정을 거의 싣지 못한 채 툭 떨어뜨린다.',
    behaviorHint: '조작 사실을 말하는 목소리는 평평하지만, 시선은 끝내 형 쪽을 피한다.',
  },
  {
    id: `${CASE_ID}-beat-b-d2-s3-s4`,
    caseId: CASE_ID,
    party: 'b',
    disputeId: 'd-2',
    fromState: 'S3',
    toState: 'S4',
    primaryBeatType: 'counter_shift',
    line: '윤정후는 늘리려던 게 아니라 줄이려던 거였다고 말하며, 사건의 방향 자체를 뒤집는다.',
    behaviorHint: '숫자를 말하는 순간에만 목소리가 분명해지고, 그 뒤 설명은 다시 낮아진다.',
  },
  {
    id: `${CASE_ID}-beat-b-d3-s2-s3`,
    caseId: CASE_ID,
    party: 'b',
    disputeId: 'd-3',
    fromState: 'S2',
    toState: 'S3',
    primaryBeatType: 'confession',
    line: '윤정후는 어머니 이름으로 들어간 생활비와 공장 돈이 자기 돈이었다는 사실을 더는 부정하지 못한다.',
    behaviorHint: '금액과 기간을 말할 때만 호흡이 짧아지고 어깨가 굳는다.',
  },
  {
    id: `${CASE_ID}-beat-b-d4-s3-s4`,
    caseId: CASE_ID,
    party: 'b',
    disputeId: 'd-4',
    fromState: 'S3',
    toState: 'S4',
    primaryBeatType: 'confession',
    line: '윤정후는 형이 잃게 될 것이 돈만이 아니라는 걸 오래전부터 알고 있었다고, 출생 비밀의 무게를 처음 꺼낸다.',
    behaviorHint: '문장 사이 간격이 길어지고, 끝 단어만 겨우 눌러 말한다.',
  },
  {
    id: `${CASE_ID}-beat-a-d5-s2-s3`,
    caseId: CASE_ID,
    party: 'a',
    disputeId: 'd-5',
    fromState: 'S2',
    toState: 'S3',
    primaryBeatType: 'counter_shift',
    line: '윤태성은 동생이 어머니를 이용했다고만 몰아붙였지만, 돈의 출처가 드러나자 자기 오해 가능성을 처음으로 입에 올린다.',
    behaviorHint: '반박부터 하던 리듬이 깨지고, 자기 문장을 스스로 다시 고친다.',
  },
]

const v3 = {
  caseId: CASE_ID,
  dossierCards,
  stateUnlockAtoms,
  events,
  transitionBeats,
}

function main() {
  writeJson(RUNTIME_OUT_PATH, runtimeCase)
  enrichRuntimeFile(RUNTIME_OUT_PATH)
  writeJson(V3_JSON_OUT_PATH, v3)
  writeTs(V3_TS_OUT_PATH, `${pascal(CASE_ID)}V3GameLoopData`, v3)
  process.stdout.write(`[build-pilot-${CASE_ID}-runtime] wrote src/data/cases/generated/${CASE_ID}.json\n`)
}

main()
