const path = require('path')
const { enrichRuntimeFile } = require('./lib/runtime-gameplay-enricher.cjs')
const { atom, derivedNode, depthStage, dossierQuestion, evidenceNode, interpretationChoice, pascal, stage, statementNode, trustState, witnessAngleNode, writeJson, writeTs } = require('./lib/thread-g-v3-builder-utils.cjs')

const ROOT = path.resolve(__dirname, '..')
const CASE_ID = 'friend-v3-01'
const RUNTIME_CASE_ID = `case-${CASE_ID}`
const TITLE = '손절한 절친'
const REF_DIR = path.join(ROOT, 'docs', 'ref', '리뉴얼참고')
const RUNTIME_OUT_PATH = path.join(ROOT, 'src', 'data', 'cases', 'generated', `${CASE_ID}.json`)
const V3_JSON_OUT_PATH = path.join(REF_DIR, `${CASE_ID}-v3-game-loop-data.json`)
const V3_TS_OUT_PATH = path.join(REF_DIR, `${CASE_ID}-v3-game-loop-data.ts`)

const HOOK = '손절한 전 절친이 내 예비신랑에게 계속 연락한다. 결혼 3주 전, 그 장면만 보면 누구라도 친구가 선을 넘었다고 생각한다.'
const ANCHOR_TRUTH = '최수민의 반복 연락은 집착이 아니라 경고였다. 예비신랑이 먼저 선을 넘었고, 송다은의 아버지는 과거에도 B에게, 현재는 예비신랑에게 비슷한 방식으로 돈을 뜯어내려 했다. 그러나 최수민은 두 번 다 진실을 직접 말하지 못한 채 악역이 되는 쪽을 택했고, 송다은은 직접 확인 없이 먼저 친구를 문제 인물로 만들었다.'
const MID_TWIST = '초반에는 연락기록과 단톡방 캡처가 모두 B의 집착을 가리킨다. 그러나 예비신랑의 선넘는 메시지와 아버지의 돈 접근이 열리면 현재 사건은 경고 실패로, 과거 손절은 오래된 사기와 침묵 구조로 재맥락화된다. 마지막에는 과거와 현재가 같은 패턴이라는 대조표가 열리며 사건의 중심이 친구의 집착이 아니라 두 번 반복된 악역 서사로 뒤집힌다.'
const DILEMMA = '최수민은 친구를 지키려 했지만 이번에도 우회하고 숨겼고, 그래서 더 큰 오해를 만들었다. 송다은은 직접 확인도 없이 친구를 매도했지만, 아버지의 진실을 모른 채 결혼이 무너질까 두려워 반응한 사람이기도 하다.'

const evidenceDepthLegend = [
  depthStage('stub', 'Stub', '존재만 보임'),
  depthStage('excerpt', 'Excerpt', '제출된 일부만 열람'),
  depthStage('original', 'Original', '원본과 전체 흐름 확보'),
  depthStage('context', 'Context', '앞뒤 맥락까지 복원'),
  depthStage('established', 'Established', '공식기록에 채택'),
]

const evidenceTrustLegend = [
  trustState('submitted', '제출됨', '당사자나 재판관을 통해 올라온 상태'),
  trustState('verifying', '검증 중', '원본과 맥락을 대조하는 단계'),
  trustState('authenticated', '인증됨', '핵심 진본성이 확인됨'),
  trustState('challenged', '이의 제기됨', '상대가 의미나 범위를 다툼'),
  trustState('misread', '조작/오독 판정', '자료 자체와 해석이 분리됨'),
]

const disputes = [
  { id: 'd-1', name: 'B의 연락은 예비신랑 집착인가, 뭔가를 전하려는 경고인가', truth: true, truthDescription: 'B의 반복 연락은 집착처럼 보였지만 실제 목적은 경고였다.', quadrant: 'b_only', requiredEvidence: ['e-1', 'e-4'], correctResponsibility: { a: 30, b: 70 }, ambiguity: 'mid', weight: 'high', mediationLink: '표면 집착과 실제 경고', legitimacyIssue: false, judgmentStatement: '반복 연락 사실은 남지만 의도는 집착이 아니라 경고 쪽으로 기운다.', hidden: false, v3Visibility: 'initial' },
  { id: 'd-4', name: '예전 손절 사건도 정말 B의 변심 때문이었는가', truth: true, truthDescription: '과거 손절의 진짜 시작은 B의 변심이 아니라 A 아버지의 사기와 B의 침묵이었다.', quadrant: 'b_only', requiredEvidence: ['e-3', 'e-6'], correctResponsibility: { a: 45, b: 55 }, ambiguity: 'high', weight: 'high', mediationLink: '과거 손절의 시작점', legitimacyIssue: false, judgmentStatement: '예전 손절은 설명되지 않은 돈 문제와 침묵 위에서 굳어진 오해였다.', hidden: false, v3Visibility: 'initial' },
  { id: 'd-5', name: '이번 사건에서 B의 명예를 먼저 무너뜨린 건 누구인가', truth: true, truthDescription: 'A는 직접 확인 없이 단톡방에서 먼저 B를 문제 인물로 만들었다.', quadrant: 'a_only', requiredEvidence: ['e-2'], correctResponsibility: { a: 75, b: 25 }, ambiguity: 'low', weight: 'high', mediationLink: '사회적 낙인과 명예 훼손', legitimacyIssue: true, judgmentStatement: '이번 사건에서 B를 먼저 낙인찍은 쪽은 A였다.', hidden: false, v3Visibility: 'initial' },
  { id: 'h-d2', name: '예비신랑이 먼저 B에게 선을 넘었는가', truth: true, truthDescription: '먼저 선을 넘은 쪽은 예비신랑이었다.', quadrant: 'b_only', requiredEvidence: ['e-4'], correctResponsibility: { a: 20, b: 80 }, ambiguity: 'low', weight: 'high', mediationLink: '선넘기와 침묵의 비용', legitimacyIssue: false, judgmentStatement: '예비신랑이 먼저 B에게 선을 넘는 메시지를 보냈다.', hidden: true, v3Visibility: 'hidden', unlockCondition: { requireEvidence: 'e-4' }, v3UnlockPlan: { runtimeRule: 'e-4 제시 시 해금', authoredRule: 'e-4가 Excerpt 이상이 되거나 e-1과 B 발언으로 Contradiction Lead가 생기면 생성' } },
  { id: 'h-d3', name: 'A 아버지의 돈 접근은 과거와 현재가 같은 패턴인가', truth: true, truthDescription: 'A 아버지는 과거에도 B에게, 현재는 예비신랑에게 비슷한 방식으로 돈을 요구했다.', quadrant: 'third_party', requiredEvidence: ['e-5', 'e-6'], correctResponsibility: { a: 35, b: 65 }, ambiguity: 'mid', weight: 'high', mediationLink: '반복되는 제3자 패턴', legitimacyIssue: true, judgmentStatement: '과거와 현재의 돈 접근은 같은 패턴으로 반복됐다.', hidden: true, v3Visibility: 'hidden', unlockCondition: { requireEvidence: 'e-5' }, v3UnlockPlan: { runtimeRule: 'e-5 제시 시 해금', authoredRule: 'e-5가 Excerpt 이상이 되거나 e-5와 e-6으로 Third-party Lead가 생성되면 생성' } },
]

const evidence = [
  {
    id: 'e-1',
    name: 'B→예비신랑 연락 기록',
    surfaceName: '연락기록 1건',
    description: '최근 9일 동안 예비신랑에게 전화 6번, 문자 11번을 남긴 연락 기록이다.',
    surfaceDescription: '연락기록 1건의 존재만 보인다.',
    type: 'log',
    reliability: 'hard',
    completeness: 'original',
    provenance: 'self_possessed',
    legitimacy: 'lawful',
    proves: ['d-1'],
    isTrap: false,
    requires: [],
    investigationResults: {
      request_original: '날짜, 시각, 미응답 여부와 짧은 답장 흐름이 붙은 원본 연락 로그가 확보된다.',
      check_metadata: '결혼 3주 전이라는 시점과 횟수만 보면 집착처럼 읽히기 쉽다.',
      restore_context: 'e-4와 e-5가 붙으면 반복 연락의 목적이 경고로 재맥락화된다.',
    },
    subjectParty: 'b',
    investigationStages: [
      stage(0, 'request_original', '이 연락 기록, 예비신랑에게 반복 연락한 사실 자체는 맞습니까?', 'authenticity'),
      stage(1, 'check_metadata', '왜 결혼 3주 전 하필 지금 그 사람에게 계속 연락했습니까?', 'context'),
      stage(2, 'restore_context', '이 연락이 집착이 아니라 경고였다면 왜 그런 모습으로 남게 됐습니까?', 'responsibility'),
    ],
    partyContext: {
      a: { questionAngle: '왜 이 연락 기록이 친구가 선을 넘었다는 확신으로 이어졌는지 설명해 주십시오.', implication: '초반 complaint를 고정하는 표면 단서다.' },
      b: { questionAngle: '왜 직접 목적을 말하지 않고 연락 기록만 남는 방식을 택했는지 설명해 주십시오.', implication: '경고 의도와 집착 프레임이 갈린다.' },
    },
    v3DepthPlan: [depthStage('stub', 'Stub', '연락기록 1건 존재만 보임'), depthStage('excerpt', 'Excerpt', '최근 9일 전화 6번, 문자 11번만 보임'), depthStage('original', 'Original', '날짜, 시각, 미응답 여부까지 확보'), depthStage('context', 'Context', '결혼 3주 전이라는 시점과 단톡방 흐름이 붙음'), depthStage('established', 'Established', 'B가 예비신랑에게 반복 연락한 사실이 공식기록 채택 대상이 됨')],
    v3TrustStates: [trustState('submitted', '제출됨', 'A가 캡처 제출'), trustState('verifying', '검증 중', '통신기록 원본 대조'), trustState('authenticated', '인증됨', '횟수와 시각 일치'), trustState('challenged', '이의 제기됨', 'B가 연락 자체와 의도는 별개라고 주장'), trustState('misread', '조작/오독 판정', '연락 사실은 인증되지만 집착 해석은 보류')],
  },
  {
    id: 'e-2',
    name: '공통 친구 단톡방 캡처',
    surfaceName: '단톡방 캡처 1건',
    description: 'A가 공통 친구들에게 B를 문제 인물로 퍼뜨린 단톡방 캡처다.',
    surfaceDescription: '단톡방 캡처 1건의 존재만 보인다.',
    type: 'chat',
    reliability: 'hard',
    completeness: 'original',
    provenance: 'third_party',
    legitimacy: 'lawful',
    proves: ['d-5', 'd-1'],
    isTrap: false,
    requires: [],
    investigationResults: {
      request_original: '원본 단톡방에서 누가 먼저 말했고 누가 맞장구쳤는지 흐름이 확인된다.',
      check_metadata: '"수민이가 또 내 남자한테 연락한다", "예전에도 이래서 손절했다"는 A의 문장이 먼저 고정된다.',
      restore_context: 'B에게 해명 기회가 거의 없었다는 분위기까지 붙으며 사회적 낙인 구조가 드러난다.',
    },
    subjectParty: 'a',
    investigationStages: [
      stage(0, 'request_original', '이 단톡방에서 먼저 B를 문제 인물로 꺼낸 사람이 당신 맞습니까?', 'authenticity'),
      stage(1, 'check_metadata', '왜 직접 확인보다 단톡방 공개를 먼저 택했습니까?', 'context'),
      stage(2, 'restore_context', '예전에도 이랬다는 말로 과거와 현재를 한 문장으로 덮은 이유가 무엇입니까?', 'responsibility'),
    ],
    partyContext: {
      a: { questionAngle: '왜 확인 전에 친구들에게 먼저 말해야 한다고 느꼈는지 설명해 주십시오.', implication: 'premature_summary의 약점이 드러난다.' },
      b: { questionAngle: '왜 단톡방에서 이미 낙인찍힌 뒤에도 즉시 반박 대신 우회하려 했는지 설명해 주십시오.', implication: '사회적 피해와 침묵이 겹친다.' },
    },
    v3DepthPlan: [depthStage('stub', 'Stub', '단톡방 캡처 1건 존재만 보임'), depthStage('excerpt', 'Excerpt', '"수민이가 또 내 남자한테 연락한다" 같은 문장만 보임'), depthStage('original', 'Original', '친구들 반응과 A의 반복 표현까지 확인됨'), depthStage('context', 'Context', 'B에게 해명 기회가 거의 없었다는 분위기까지 복원'), depthStage('established', 'Established', 'A가 먼저 B를 문제 인물로 퍼뜨렸다는 점이 공식기록 채택 대상이 됨')],
    v3TrustStates: [trustState('submitted', '제출됨', 'B 또는 제3자가 제출'), trustState('verifying', '검증 중', '단톡방 원본과 발화 순서 대조'), trustState('authenticated', '인증됨', '원본 대화방과 일치'), trustState('challenged', '이의 제기됨', 'A가 화가 나서 그랬다고 감정 이의'), trustState('misread', '조작/오독 판정', '편집은 없고 전체 맥락이 A에게 더 불리해진다.')],
  },
  {
    id: 'e-3',
    name: '과거 손절 직전 카톡',
    surfaceName: '과거 카톡 1건',
    description: '과거 손절 직전 B가 돈 문제를 혼자 정리하겠다고 말한 카톡이다.',
    surfaceDescription: '과거 카톡 1건의 존재만 보인다.',
    type: 'chat',
    reliability: 'mid',
    completeness: 'excerpt',
    provenance: 'self_possessed',
    legitimacy: 'lawful',
    proves: ['d-4'],
    isTrap: false,
    requires: [],
    investigationResults: {
      request_original: '과거 채팅방 전체와 손절 직전 문장이 함께 확인된다.',
      check_metadata: '발췌만 보면 B가 또 돈 문제에서 말을 흐린 것처럼 읽힌다.',
      restore_context: 'A의 단정과 B의 침묵이 함께 과거 오해를 굳힌 구조가 드러난다.',
    },
    subjectParty: 'b',
    investigationStages: [
      stage(0, 'request_original', '이 과거 카톡, 손절 직전 실제 대화 흐름 맞습니까?', 'authenticity'),
      stage(1, 'check_metadata', '왜 그때도 돈 문제를 당신 혼자 정리하겠다고만 말했습니까?', 'context'),
      stage(2, 'restore_context', '진실을 말하지 않고 오해를 그대로 두는 쪽을 왜 택했습니까?', 'responsibility'),
    ],
    partyContext: {
      a: { questionAngle: '왜 이 과거 카톡이 예전에도 이랬다는 확신을 더 굳혔는지 설명해 주십시오.', implication: '과거 서사의 표면 증거다.' },
      b: { questionAngle: '왜 그때도 설명보다 침묵을 택했는지 설명해 주십시오.', implication: 'd-4의 숨김 이유를 여는 첫 단서다.' },
    },
    v3DepthPlan: [depthStage('stub', 'Stub', '과거 카톡 1건 존재 표시'), depthStage('excerpt', 'Excerpt', 'B가 돈 문제를 알아서 정리하겠다고 한 문장만 보임'), depthStage('original', 'Original', 'A의 단정과 B의 침묵이 모두 확인됨'), depthStage('context', 'Context', '오해가 굳는 구조가 복원됨'), depthStage('established', 'Established', '과거 손절이 돈 문제와 침묵 위에서 벌어졌다는 점이 공식기록 후보가 됨')],
    v3TrustStates: [trustState('submitted', '제출됨', 'A 일부 또는 B 전체 제출'), trustState('verifying', '검증 중', '원본 채팅방 대조'), trustState('authenticated', '인증됨', '날짜와 발신자 일치'), trustState('challenged', '이의 제기됨', 'A가 그때도 설명하지 않았다고 이의'), trustState('misread', '조작/오독 판정', '발췌만 보면 B에게 불리하지만 Context로 갈수록 오독 가능성이 드러난다.')],
  },

  {
    id: 'e-4',
    name: '예비신랑의 선넘는 메시지 + B의 거절 답장',
    surfaceName: '예비신랑과 B의 카톡 스레드',
    description: '예비신랑이 먼저 선을 넘는 메시지를 보내고 B가 선을 긋는 답장을 남긴 카톡 스레드다.',
    surfaceDescription: '예비신랑과 B의 카톡 스레드 존재만 보인다.',
    type: 'chat',
    reliability: 'hard',
    completeness: 'original',
    provenance: 'self_possessed',
    legitimacy: 'lawful',
    proves: ['d-1', 'h-d2'],
    isTrap: false,
    requires: ['e-1'],
    requiredLieState: 'S1',
    investigationResults: {
      request_original: '몇 달간 반복된 접근과 B의 선 긋는 답장이 붙은 원본 대화가 확보된다.',
      check_metadata: '누가 먼저 선을 넘었는지, 왜 B가 연락 채널을 완전히 끊지 않았는지가 함께 보인다.',
      restore_context: 'B가 이 스레드를 경고 채널로 남겨 두었다는 해석이 가능해진다.',
    },
    subjectParty: 'b',
    investigationStages: [
      stage(0, 'request_original', '이 카톡에서 먼저 선을 넘는 메시지를 보낸 쪽이 예비신랑 맞습니까?', 'authenticity'),
      stage(1, 'check_metadata', '왜 그때 A에게 바로 말하지 않고 답장 흐름을 남겨 두었습니까?', 'context'),
      stage(2, 'restore_context', '결국 당신만 집착하는 사람처럼 남게 된 이유를 설명해 보십시오.', 'responsibility'),
    ],
    partyContext: {
      a: { questionAngle: '왜 이 스레드가 예비신랑을 바로 믿고 싶어지는 당신의 마음과 충돌하는지 설명해 주십시오.', implication: 'h-d2를 여는 핵심 반전이다.' },
      b: { questionAngle: '왜 직접 폭로보다 경고 채널을 남기는 방식을 택했는지 설명해 주십시오.', implication: '집착 프레임을 경고 프레임으로 뒤집는 증거다.' },
    },
    meta: { redactions: ['결혼 날짜·장소 표현', '성적 뉘앙스가 강한 문장 일부'] },
    v3DepthPlan: [depthStage('stub', 'Stub', '예비신랑과 B의 카톡 스레드 존재만 보임'), depthStage('excerpt', 'Excerpt', '"커피 한 번 보자", "너 같은 스타일이 내 이상형"과 B의 거절 문장 일부만 보임'), depthStage('original', 'Original', '몇 달간 반복된 접근과 거절 답장이 전체 확보됨'), depthStage('context', 'Context', 'B가 경고용 채널로 남겨 둔 맥락이 붙음'), depthStage('established', 'Established', '먼저 선을 넘은 쪽은 예비신랑이라는 점이 공식기록 후보가 됨')],
    v3TrustStates: [trustState('submitted', '제출됨', 'B 발췌 제출 또는 재판관 원본 요구'), trustState('verifying', '검증 중', '휴대폰 원본 대화와 알림 기록 대조'), trustState('authenticated', '인증됨', '메시지 원본 일치'), trustState('challenged', '이의 제기됨', 'A가 그래도 왜 답장을 이어 갔느냐고 이의'), trustState('misread', '조작/오독 판정', '편집 의심은 해소되고 집착 프레임이 크게 흔들린다.')],
    v3SealTargets: ['결혼 날짜·장소 표현', '성적 뉘앙스가 강한 문장 일부'],
  },
  {
    id: 'e-5',
    name: 'A 아버지와 예비신랑의 문자',
    surfaceName: 'A 아버지와 예비신랑 문자',
    description: 'A 아버지가 예비신랑에게 결혼 전 돈을 도와 달라고 접근한 문자 흐름이다.',
    surfaceDescription: 'A 아버지와 예비신랑 문자 존재만 보인다.',
    type: 'chat',
    reliability: 'hard',
    completeness: 'original',
    provenance: 'third_party',
    legitimacy: 'lawful',
    proves: ['h-d3', 'd-1'],
    isTrap: false,
    requires: ['e-4'],
    investigationResults: {
      request_original: '반복적인 돈 얘기와 사위 될 사람이면 도와야 한다는 압박 표현이 붙은 원본이 확인된다.',
      check_metadata: '현재 사건의 핵심이 친구 관계가 아니라 A 아버지의 돈 접근일 수 있다는 축이 열린다.',
      restore_context: 'B의 연락 시기와 정확히 겹치며 왜 이번에도 경고하려 했는지가 선명해진다.',
    },
    subjectParty: 'b',
    investigationStages: [
      stage(0, 'request_original', '이 문자에서 먼저 돈 얘기를 꺼낸 사람이 A 아버지 맞습니까?', 'authenticity'),
      stage(1, 'check_metadata', '왜 이 흐름을 보고 또 당하게 둘 수 없다고 느꼈습니까?', 'context'),
      stage(2, 'restore_context', '왜 A가 아니라 예비신랑부터 막으려 들었는지 설명해 보십시오.', 'responsibility'),
    ],
    partyContext: {
      a: { questionAngle: '왜 이 문자가 현재 사건의 중심을 친구가 아니라 아버지 쪽으로 이동시키는지 설명해 주십시오.', implication: 'h-d3를 여는 현재 축이다.' },
      b: { questionAngle: '왜 이번에도 아버지 문제를 직접 말하지 못했는지 설명해 주십시오.', implication: '현재와 과거 반복 패턴이 연결된다.' },
    },
    meta: { redactions: ['정확한 돈 액수', '결혼 일정·예식장 정보', '계좌번호'] },
    v3DepthPlan: [depthStage('stub', 'Stub', 'A 아버지와 예비신랑 문자 존재만 보임'), depthStage('excerpt', 'Excerpt', '"결혼 전에 잠깐만 도와주면 금방 돌려준다" 수준만 보임'), depthStage('original', 'Original', '반복적인 돈 요구와 압박 표현까지 열림'), depthStage('context', 'Context', 'B의 연락 시기와 정확히 겹치는 이유가 붙음'), depthStage('established', 'Established', 'A 아버지가 예비신랑에게 돈을 뜯어내려 접근했다는 점이 공식기록 후보가 됨')],
    v3TrustStates: [trustState('submitted', '제출됨', '예비신랑 또는 B가 캡처 제출'), trustState('verifying', '검증 중', '예비신랑 폰 원본 대조'), trustState('authenticated', '인증됨', '문자 원본과 날짜 일치'), trustState('challenged', '이의 제기됨', 'A가 인사 차원이었을 뿐이라고 이의'), trustState('misread', '조작/오독 판정', '돈 부탁 자체는 인증되고 악의 여부는 Context 필요')],
    v3SealTargets: ['정확한 돈 액수', '결혼 일정·예식장 정보', '계좌번호'],
  },
  {
    id: 'e-6',
    name: '과거 송금 영수증 + 아버지 문자',
    surfaceName: '과거 송금 내역 1건',
    description: '과거 A 아버지가 B에게 돈을 요구하고 B가 송금한 뒤 갚지 않은 흐름을 보여 주는 영수증과 문자다.',
    surfaceDescription: '과거 송금 내역 1건의 존재만 보인다.',
    type: 'bank',
    reliability: 'hard',
    completeness: 'original',
    provenance: 'self_possessed',
    legitimacy: 'lawful',
    proves: ['d-4', 'h-d3'],
    isTrap: false,
    requires: ['e-5'],
    requiredLieState: 'S2',
    investigationResults: {
      request_original: '송금 영수증과 "한 달만 쓰고 갚겠다"는 문자 흐름이 한 세트로 확인된다.',
      check_metadata: '과거 손절의 진짜 시작이 B의 변심이 아니라 아버지의 돈 문제였다는 축이 열린다.',
      restore_context: 'B가 왜 A에게 직접 말하지 못하고 혼자 끊어냈는지가 감정 서사와 함께 복원된다.',
    },
    subjectParty: 'b',
    investigationStages: [
      stage(0, 'request_original', '이 과거 송금과 문자 흐름, 모두 실제 있었던 일 맞습니까?', 'authenticity'),
      stage(1, 'check_metadata', '왜 그때 다은이에게 이 사실을 바로 말하지 않았습니까?', 'context'),
      stage(2, 'restore_context', '차라리 당신이 나쁜 사람처럼 남는 쪽을 택한 이유가 무엇입니까?', 'responsibility'),
    ],
    partyContext: {
      a: { questionAngle: '왜 이 과거 송금이 예전 손절 사건을 다시 쓰게 만드는지 설명해 주십시오.', implication: 'd-4가 현재 사건과 연결된다.' },
      b: { questionAngle: '왜 사기 사실보다 침묵 이유를 먼저 설명해야 하는지 설명해 주십시오.', implication: '악역을 택한 이유가 열린다.' },
    },
    meta: { redactions: ['정확한 송금 액수', 'B의 계좌번호'] },
    v3DepthPlan: [depthStage('stub', 'Stub', '과거 송금 내역 1건 존재만 보임'), depthStage('excerpt', 'Excerpt', 'B가 A 아버지에게 돈을 보낸 기록만 보임'), depthStage('original', 'Original', '송금 영수증과 미루는 문자 흐름이 함께 열림'), depthStage('context', 'Context', '왜 진실 대신 오해를 택했는지가 복원됨'), depthStage('established', 'Established', '과거 손절의 핵심 원인에 A 아버지의 사기성 돈 요구가 있었다는 점이 공식기록 후보가 됨')],
    v3TrustStates: [trustState('submitted', '제출됨', 'B가 일부 내역 제출'), trustState('verifying', '검증 중', '송금 영수증과 문자 원본 대조'), trustState('authenticated', '인증됨', '금액, 날짜, 발신자 일치'), trustState('challenged', '이의 제기됨', 'A가 왜 그때 내게 말 안 했냐고 반발'), trustState('misread', '조작/오독 판정', '데이터는 인증되고 왜 침묵했는가는 d-4와 h-d3에서 정리된다.')],
    v3SealTargets: ['정확한 송금 액수', 'B의 계좌번호'],
  },
  {
    id: 'e-7',
    name: '과거·현재 대조표',
    surfaceName: '과거·현재 대조표 생성 가능',
    description: '과거 B 피해 시점과 현재 예비신랑 접근 시점, A의 오해와 단톡 낙인이 날짜별로 정렬된 대조표다.',
    surfaceDescription: '과거·현재 대조표 생성 가능 상태만 보인다.',
    type: 'log',
    reliability: 'hard',
    completeness: 'original',
    provenance: 'derived',
    legitimacy: 'lawful',
    proves: ['d-4', 'd-5', 'h-d3'],
    isTrap: false,
    requires: ['e-5', 'e-6'],
    requiredLieState: 'S3',
    investigationResults: {
      request_original: '과거와 현재의 핵심 시점, 발화, 돈 접근이 한 줄 시간축으로 정리된다.',
      check_metadata: 'A 아버지의 비슷한 접근과 B의 침묵, A의 오해가 두 번 반복된 패턴이라는 점이 드러난다.',
      restore_context: 'B가 두 번 다 A를 지키려다 악역이 된 감정 흐름까지 같이 읽히게 된다.',
    },
    subjectParty: 'b',
    investigationStages: [
      stage(0, 'request_original', '이 대조표가 묶는 핵심 시점들, 원자료와 모두 일치합니까?', 'authenticity'),
      stage(1, 'check_metadata', '과거와 현재가 같은 패턴이라는 말의 핵심은 무엇입니까?', 'context'),
      stage(2, 'restore_context', '이번 사건에서 가장 먼저 잘못 기록된 사람이 누구였는지 분리해서 설명해 보십시오.', 'responsibility'),
    ],
    partyContext: {
      a: { questionAngle: '왜 이 표가 지금까지 믿어 온 친구 배신 서사를 흔드는지 설명해 주십시오.', implication: '가설과 공식기록이 갈라진다.' },
      b: { questionAngle: '왜 두 번 다 진실보다 악역처럼 남는 선택을 했는지 설명해 주십시오.', implication: '최종 reframe을 여는 종합 자료다.' },
    },
    v3DepthPlan: [depthStage('stub', 'Stub', '과거·현재 대조표 생성 가능 상태만 보임'), depthStage('excerpt', 'Excerpt', '과거 피해 시점과 현재 접근 시점의 거친 겹침만 보임'), depthStage('original', 'Original', '아버지의 비슷한 문구, B의 침묵, A의 오해가 날짜별로 정렬됨'), depthStage('context', 'Context', 'B가 두 번 다 A를 지키려다 악역이 된 감정 흐름이 붙음'), depthStage('established', 'Established', '과거와 현재가 같은 패턴이었고 B의 연락은 반복을 막으려는 경고였다는 점이 공식기록 후보가 됨')],
    v3TrustStates: [trustState('submitted', '제출됨', '조합과 검증으로 생성'), trustState('verifying', '검증 중', 'e-4~e-6 핵심 자료가 인증될 때 생성'), trustState('authenticated', '인증됨', '기반 증거가 모두 인증되면 자동 인증'), trustState('challenged', '이의 제기됨', 'A가 그래도 연락 방식은 잘못이라고 이의'), trustState('misread', '조작/오독 판정', '종합표 자체는 조작 불가이고 해석은 Reframe 선택에 따라 달라진다.')],
  },
]

const truthTable = [
  { id: 't-1', fact: 'B는 예비신랑에게 반복 연락했다.', isTrue: true, weight: 9, quadrant: 'b_only' },
  { id: 't-2', fact: '예비신랑이 먼저 B에게 선을 넘는 메시지를 보냈다.', isTrue: true, weight: 10, quadrant: 'b_only' },
  { id: 't-3', fact: 'A는 단톡방에서 먼저 B를 문제 인물로 퍼뜨렸다.', isTrue: true, weight: 10, quadrant: 'a_only' },
  { id: 't-4', fact: 'A 아버지는 과거와 현재 모두 비슷한 방식으로 돈 접근을 시도했다.', isTrue: true, weight: 10, quadrant: 'third_party' },
  { id: 't-5', fact: 'B는 두 번 다 A를 지키려다 직접 말하지 못했고, 그 대가로 두 번 다 악역이 되었다.', isTrue: true, weight: 9, quadrant: 'shared_misconception' },
]

const lieConfigA = [
  { disputeId: 'd-5', lieType: 'LT-2', lieIntensity: 'L2', lieMotive: 'self_protection', initialState: 'S0', collapseViaTrust: true, transitions: [{ from: 'S0', to: 'S1', trigger: 'd-5_a_groupchat_question' }, { from: 'S1', to: 'S2', trigger: 'hard_evidence' }, { from: 'S2', to: 'S3', trigger: 'e-2_presented' }, { from: 'S3', to: 'S4', trigger: 'd-5_a_fear_question' }, { from: 'S4', to: 'S5', trigger: 'd-5_a_confession' }] },
]

const lieConfigB = [
  { disputeId: 'd-1', lieType: 'LT-6', lieIntensity: 'L2', lieMotive: 'self_protection', initialState: 'S0', collapseViaTrust: false, transitions: [{ from: 'S0', to: 'S1', trigger: 'd-1_b_contact_question' }, { from: 'S1', to: 'S2', trigger: 'hard_evidence' }, { from: 'S2', to: 'S3', trigger: 'e-4_presented' }, { from: 'S3', to: 'S4', trigger: 'd-1_b_warning_question' }, { from: 'S4', to: 'S5', trigger: 'd-1_b_warning_confession' }] },
  { disputeId: 'h-d2', lieType: 'LT-6', lieIntensity: 'L2', lieMotive: 'shame', initialState: 'S0', collapseViaTrust: false, transitions: [{ from: 'S0', to: 'S1', trigger: 'h-d2_b_message_question' }, { from: 'S1', to: 'S2', trigger: 'hard_evidence' }, { from: 'S2', to: 'S3', trigger: 'e-4_presented' }, { from: 'S3', to: 'S4', trigger: 'h-d2_b_shame_question' }, { from: 'S4', to: 'S5', trigger: 'h-d2_b_confession' }] },
  { disputeId: 'h-d3', lieType: 'LT-6', lieIntensity: 'L3', lieMotive: 'self_protection', initialState: 'S0', collapseViaTrust: false, transitions: [{ from: 'S0', to: 'S1', trigger: 'h-d3_b_father_question' }, { from: 'S1', to: 'S2', trigger: 'hard_evidence' }, { from: 'S2', to: 'S3', trigger: 'e-5_presented' }, { from: 'S3', to: 'S4', trigger: 'h-d3_b_pattern_question' }, { from: 'S4', to: 'S5', trigger: 'h-d3_b_pattern_confession' }] },
  { disputeId: 'd-4', lieType: 'LT-1', lieIntensity: 'L3', lieMotive: 'face_saving', initialState: 'S0', collapseViaTrust: true, transitions: [{ from: 'S0', to: 'S1', trigger: 'd-4_b_past_question' }, { from: 'S1', to: 'S2', trigger: 'hard_evidence' }, { from: 'S2', to: 'S3', trigger: 'e-6_presented' }, { from: 'S3', to: 'S4', trigger: 'd-4_b_villain_question' }, { from: 'S4', to: 'S5', trigger: 'd-4_b_confession' }] },
]

const leadLines = [
  { id: 'L-1', name: 'Contradiction Lead', leadType: 'Contradiction', firstInputs: ['e-1', 'e-2'], secondInputs: ['L-1', 'e-4'], dossierCardId: 'dc-1', interpretationChoices: [interpretationChoice('L-1-A', 'B가 예비신랑에게 집착한다', '집착 서사를 강화한다.'), interpretationChoice('L-1-B', '겉으로는 집착처럼 보여도 빠진 맥락이 있다', '경고 서사를 준비한다.')] },
  { id: 'L-2', name: 'Timeline Lead', leadType: 'Timeline', firstInputs: ['e-2', 'e-3'], secondInputs: ['L-2', 'e-6'], dossierCardId: 'dc-2', interpretationChoices: [interpretationChoice('L-2-A', 'B는 예전에도 비슷한 식으로 문제를 만들었다', 'A의 summary를 유지한다.'), interpretationChoice('L-2-B', '예전에도 설명되지 않은 공백이 있었다', '과거 사건을 다시 쓰게 만든다.')] },
  { id: 'L-3', name: 'Third-party Lead', leadType: 'Third-party', firstInputs: ['e-1', 'e-5'], secondInputs: ['L-3', 'stmt-b-protect'], dossierCardId: 'dc-3', interpretationChoices: [interpretationChoice('L-3-A', 'B는 또 핑계를 만든다', '우회적 변명 서사를 유지한다.'), interpretationChoice('L-3-B', 'B는 A 아버지의 접근을 보고 경고하려 했다', '현재 사건의 진짜 목적을 연다.')] },
  { id: 'L-4', name: 'Context Lead', leadType: 'Context', firstInputs: ['e-6', 'stmt-b-villain'], secondInputs: ['L-4', 'w-3-angle'], dossierCardId: 'dc-4', interpretationChoices: [interpretationChoice('L-4-A', 'B는 늘 말을 비틀어 더 큰 오해를 만든다', '침묵의 비용을 본다.'), interpretationChoice('L-4-B', 'B는 A의 세계가 무너질까 봐 직접 진실을 못 말했다', '보호 동기를 본다.')] },
  { id: 'L-5', name: 'Reframe Lead', leadType: 'Reframe', firstInputs: ['e-5', 'e-6'], secondInputs: ['L-5', 'e-7'], dossierCardId: 'dc-5', interpretationChoices: [interpretationChoice('L-5-A', 'A 아버지의 반복된 돈 접근이 두 사건을 만들었다', '반복 패턴을 중심에 둔다.'), interpretationChoice('L-5-B', '그 패턴을 봐도 B는 항상 더 좋은 방식으로 말했어야 했다', 'B의 우회 책임을 남긴다.')] },
]

const authorityPlacements = [
  { action: '원본 제출 명령', recommendedMoment: 'e-1 확인 직후', purpose: '연락 횟수를 감정이 아니라 원본으로 고정' },
  { action: '원본 제출 명령', recommendedMoment: 'e-4 포착 직후', purpose: '예비신랑 메시지의 전체 흐름 확보' },
  { action: '원본 제출 명령', recommendedMoment: 'e-5, e-6 진입 직후', purpose: '아버지의 현재/과거 돈 접근을 모두 원본으로 확정' },
  { action: '정확히 답변하십시오', recommendedMoment: 'A가 예전에도 이래서만 반복하며 과거와 현재를 덮으려 할 때', purpose: 'premature_summary를 깨고 시점과 사실을 분리' },
  { action: '분리심문', recommendedMoment: 'e-4 Original 직후 B', purpose: 'A 앞에서 닫히는 B의 설명을 먼저 끌어냄' },
  { action: '분리심문', recommendedMoment: 'e-6 Original 직후 A', purpose: '아버지 얘기가 나오면 즉시 방어적인 A를 흔들어 보기' },
  { action: '잠정 인정', recommendedMoment: 'e-1 인증 후', purpose: 'B가 예비신랑에게 반복 연락한 사실을 기록' },
  { action: '잠정 인정', recommendedMoment: 'e-4 인증 후', purpose: '예비신랑이 먼저 선을 넘는 메시지를 보낸 사실을 기록' },
  { action: '잠정 인정', recommendedMoment: 'e-2 인증 후', purpose: 'A가 단톡방에서 먼저 B를 문제 인물로 퍼뜨린 사실을 기록' },
  { action: '잠정 인정', recommendedMoment: 'e-5 또는 e-6 인증 후', purpose: 'A 아버지가 과거와 현재 모두 돈 접근을 시도한 사실을 기록' },
  { action: '선처 창구', recommendedMoment: 'dc-3, dc-4 직후', purpose: 'B가 또 내가 나쁜 사람 되는 쪽을 택했다는 본심을 풀도록 유도' },
  { action: '발언 제지 / 기록 제외', recommendedMoment: 'A가 내 남자 프레임만 반복하거나 B가 예비신랑 잘못만 강조할 때', purpose: '프레임 싸움을 멈추고 사실과 가설을 분리' },
  { action: '민감정보 봉인 해제', recommendedMoment: 'h-d2 또는 h-d3가 열렸지만 마지막 한 걸음이 부족할 때', purpose: '결혼 정보, 성적 뉘앙스, 송금 정보를 필요한 범위에서만 해제' },
]

const runtimeCase = {
  caseId: RUNTIME_CASE_ID,
  sensitivityTags: ['wedding_privacy', 'sexual_boundary', 'family_finance', 'defamation'],
  meta: {
    relationshipType: 'friend',
    conflictSeed: 'TE-FriendV301',
    variableModules: ['VM-friend-v3-a', 'VM-friend-v3-b'],
    twistModule: 'TW-friend-v3-1',
    difficulty: 'hard',
    anchorTruth: ANCHOR_TRUTH,
    emotionalBait: '연락기록과 단톡방 캡처는 친구 집착처럼 보이지만, 예비신랑의 선넘기와 아버지의 돈 접근이 열릴수록 사건은 경고 실패와 반복 패턴으로 재정의된다.',
    resolutionDilemma: DILEMMA,
  },
  duo: {
    duoId: `duo-${CASE_ID}`,
    relationshipType: 'friend',
    partyA: {
      id: 'a',
      name: '송다은',
      age: 31,
      occupation: '온라인 쇼핑몰 CS 직원',
      incomeBracket: 'mid',
      archetype: 'premature_summary',
      speechStyle: '핵심 사실을 확인하기 전에 이미 결론난 이야기처럼 요약하고, 감정이 올라오면 같은 문장을 반복한다.',
      pride: 6,
      fear: '결혼 직전에 모든 게 무너지고 자신이 또 속았다는 사실을 직면하는 걸 두려워한다.',
      blindSpot: '과거와 현재를 한 문장으로 덮는 요약이 오히려 진실을 가린다는 점을 늦게 본다.',
      desireToBeSeen: '불안해서 과하게 반응한 사람이 아니라 정당하게 상처받은 사람으로 보이고 싶어 한다.',
      callTerms: { toOther: '수민아', angry: '최수민!', toJudge: '제 친구' },
    },
    partyB: {
      id: 'b',
      name: '최수민',
      age: 31,
      occupation: '필라테스 강사',
      incomeBracket: 'mid',
      archetype: 'affect_flattening',
      speechStyle: '상대가 감정적으로 몰아칠수록 더 담담하게 말하며, 수치심이 걸린 사실은 끝까지 늦게 꺼낸다.',
      pride: 5,
      fear: '진실을 말하는 순간 다은의 결혼과 가족 세계가 한꺼번에 무너질까 두려워한다.',
      blindSpot: '직접 말하지 않고 악역이 되는 편을 택한 선택이 두 번 다 같은 상처를 남겼다는 점을 과소평가한다.',
      desireToBeSeen: '친구를 노린 사람이 아니라 두 번 다 막으려 했던 사람으로 이해받고 싶어 한다.',
      callTerms: { toOther: '다은아', angry: '송다은!', toJudge: '제 친구' },
    },
    socialGraph: [
      { id: 'w-1', slot: 'friend_1', name: '김세라', relationTo: 'a', knowledgeScope: 'A가 단톡방에서 어떻게 B를 먼저 몰아갔는지 직접 설명할 수 있다.', witnessedDirectly: true, bias: 'pro_a', distortionRisk: 'social_pressure', surfaceKnowledge: '공통 친구로서 d-5의 발화 순서를 안다.', relatedDisputeIds: ['d-5'], witnessProfile: { age: 32, occupation: '미용실 직원', relationToA: '가까운 공통 친구다.', relationToB: '예전엔 자주 봤지만 지금은 어색하다.', sentimentToA: 35, sentimentToB: -10, speechStyle: '분위기를 읽으며 말해 A 쪽으로 약간 기울 수 있다.', addressJudge: '재판관님', addressA: '다은아', addressB: '수민아', hiddenAgenda: '자신도 단톡방에 맞장구친 책임이 드러나는 건 피하고 싶어 한다.' } },
      { id: 'w-2', slot: 'friend_2', name: '박준혁', relationTo: 'b', knowledgeScope: '예비신랑이 술자리 뒤 B를 두고 했던 말과 먼저 연락을 잇고 싶어 한 분위기를 증언할 수 있다.', witnessedDirectly: true, bias: 'neutral', distortionRisk: 'partial', surfaceKnowledge: '회사 후배로서 h-d2의 주변 정황을 본다.', relatedDisputeIds: ['h-d2'], witnessProfile: { age: 34, occupation: '회사원', relationToA: '예비신랑의 지인으로만 안다.', relationToB: '직접 친하진 않지만 이름과 상황을 기억한다.', sentimentToA: 0, sentimentToB: 5, speechStyle: '직접 본 분위기만 말하려 하고 단정은 피한다.', addressJudge: '재판관님', addressA: '다은 씨', addressB: '수민 씨', hiddenAgenda: '회사 쪽 평판 문제가 커지는 건 원치 않는다.' } },
      { id: 'w-3', slot: 'acquaintance_1', name: '오미경', relationTo: 'b', knowledgeScope: '과거 A 아버지와 B의 돈 대화를 목격했고, B가 혼자 울며 나간 장면을 기억한다.', witnessedDirectly: true, bias: 'pro_b', distortionRisk: 'aged_memory', surfaceKnowledge: 'd-4와 h-d3의 감정층을 잇는 제3자 증인이다.', relatedDisputeIds: ['d-4', 'h-d3'], witnessProfile: { age: 58, occupation: '분식집 사장', relationToA: '어릴 때부터 보던 동네 아이였다.', relationToB: '과거에 자주 들르던 손님이었다.', sentimentToA: 10, sentimentToB: 25, speechStyle: '오래전 기억이라 날짜는 흐리지만 분위기와 장면은 선명하게 말한다.', addressJudge: '재판관님', addressA: '다은아', addressB: '수민아', hiddenAgenda: '당시 아버지의 말투가 너무 노골적이었다는 걸 뒤늦게라도 말하고 싶어 한다.' } },
    ],
  },
  context: { contextType: 'friendship_warning_reframe', description: HOOK, emotionalPressure: 9, affects: 'both', triggerAmplifier: MID_TWIST, caseNumber: 'TE-FriendV301', caseName: TITLE },
  disputes,
  evidence,
  evidenceCombinations: [
    { requires: ['e-1', 'e-2'], upgradesTo: 'hard', proves: ['d-1', 'd-5'] },
    { requires: ['e-1', 'e-4'], upgradesTo: 'hard', proves: ['d-1', 'h-d2'] },
    { requires: ['e-2', 'e-3'], upgradesTo: 'hard', proves: ['d-4'] },
    { requires: ['e-5', 'e-6'], upgradesTo: 'hard', proves: ['h-d3', 'd-4'] },
    { requires: ['e-5', 'e-7'], upgradesTo: 'hard', proves: ['h-d3', 'd-5'] },
  ],
  truthTable,
  lieConfigA,
  lieConfigB,
  solutions: {
    기록복구: ['현재 집착 프레임과 실제 경고 의도를 분리해 기록한다.', '과거 손절의 시작점을 다시 써 두 사건의 동일 패턴을 남긴다.'],
    명예회복: ['단톡방 낙인과 직접 확인 없는 매도를 공식기록으로 교정한다.', 'B의 사회적 피해와 A의 불안을 함께 판결 문구에 반영한다.'],
    가족경계: ['A 아버지의 돈 접근을 관계 바깥 제3자 위험으로 명시한다.', '결혼 정보와 송금 정보는 필요한 범위만 공개한다.'],
  },
  activeLedgerEntries: ['ledger-1', 'ledger-2', 'ledger-3', 'ledger-4'],
  activeThirdParties: ['w-1', 'w-2', 'w-3'],
  baseEvidenceIds: ['e-1', 'e-2', 'e-3'],
  monetaryDisputeIds: ['h-d3'],
  combinationLab: {
    analysisPointsBase: 5,
    analysisPointRefundOnFirstHidden: 1,
    nodes: [
      evidenceNode('e-1', 'e-1 B→예비신랑 연락 기록', ['d-1']),
      evidenceNode('e-2', 'e-2 공통 친구 단톡방 캡처', ['d-5', 'd-1']),
      evidenceNode('e-3', 'e-3 과거 손절 직전 카톡', ['d-4']),
      evidenceNode('e-4', 'e-4 예비신랑의 선넘는 메시지 + B의 거절 답장', ['d-1', 'h-d2']),
      evidenceNode('e-5', 'e-5 A 아버지와 예비신랑의 문자', ['h-d3', 'd-1']),
      evidenceNode('e-6', 'e-6 과거 송금 영수증 + 아버지 문자', ['d-4', 'h-d3']),
      evidenceNode('e-7', 'e-7 과거·현재 대조표', ['d-4', 'd-5', 'h-d3']),
      statementNode('stmt-b-protect', 'B의 발언 "또 당하게 둘 수 없었다"', ['h-d3', 'd-1']),
      statementNode('stmt-b-villain', 'B의 발언 "차라리 내가 나쁜 사람이 되는 게 낫다고 생각했다"', ['d-4', 'h-d3']),
      witnessAngleNode('w-3-angle', 'w-3 오미경 증언 축', ['d-4', 'h-d3']),
      derivedNode('L-1', 'L-1 Contradiction Lead', ['d-1', 'h-d2'], ['e-1', 'e-2', 'e-4']),
      derivedNode('L-2', 'L-2 Timeline Lead', ['d-4'], ['e-2', 'e-3', 'e-6']),
      derivedNode('L-3', 'L-3 Third-party Lead', ['h-d3', 'd-1'], ['e-1', 'e-5']),
      derivedNode('L-4', 'L-4 Context Lead', ['d-4', 'h-d3'], ['e-6']),
      derivedNode('L-5', 'L-5 Reframe Lead', ['d-4', 'd-5', 'h-d3'], ['e-5', 'e-6', 'e-7']),
      derivedNode('dc-1', 'dc-1 먼저 선을 넘은 사람', ['d-1', 'h-d2'], ['e-1', 'e-4']),
      derivedNode('dc-2', 'dc-2 손절의 시작점', ['d-4'], ['e-2', 'e-3', 'e-6']),
      derivedNode('dc-3', 'dc-3 이번에도 같은 패턴', ['h-d3', 'd-1'], ['e-1', 'e-5']),
      derivedNode('dc-4', 'dc-4 악역을 택한 이유', ['d-4', 'h-d3'], ['e-6']),
      derivedNode('dc-5', 'dc-5 두 번의 손절', ['d-5', 'h-d3'], ['e-5', 'e-6', 'e-7']),
    ],
    outputs: leadLines.map((lead) => ({ id: lead.id, label: `${lead.id} ${lead.name}`, summary: `${lead.leadType} 리드`, nodeType: 'derived_note', noteText: lead.name, judgeHint: `후속 카드 ${lead.dossierCardId}와 연결된다.`, effects: [{ kind: 'unlock_note', unlockNodeId: lead.id }] })).concat([
      { id: 'dc-1', label: 'dc-1 먼저 선을 넘은 사람', summary: '예비신랑의 선넘기와 B의 경고 실패를 묻는 카드', nodeType: 'derived_note', noteText: '먼저 선을 넘은 사람', effects: [{ kind: 'unlock_note', unlockNodeId: 'dc-1' }, { kind: 'unlock_dispute', unlockNodeId: 'h-d2' }] },
      { id: 'dc-2', label: 'dc-2 손절의 시작점', summary: '과거 손절의 진짜 시작을 묻는 카드', nodeType: 'derived_note', noteText: '손절의 시작점', effects: [{ kind: 'unlock_note', unlockNodeId: 'dc-2' }] },
      { id: 'dc-3', label: 'dc-3 이번에도 같은 패턴', summary: '현재 사건의 제3자 패턴을 묻는 카드', nodeType: 'derived_note', noteText: '이번에도 같은 패턴', effects: [{ kind: 'unlock_note', unlockNodeId: 'dc-3' }, { kind: 'unlock_dispute', unlockNodeId: 'h-d3' }] },
      { id: 'dc-4', label: 'dc-4 악역을 택한 이유', summary: '왜 늘 직접 말하지 못했는지 묻는 카드', nodeType: 'derived_note', noteText: '악역을 택한 이유', effects: [{ kind: 'unlock_note', unlockNodeId: 'dc-4' }] },
      { id: 'dc-5', label: 'dc-5 두 번의 손절', summary: '과거와 현재를 같은 패턴으로 확정하는 카드', nodeType: 'derived_note', noteText: '두 번의 손절', effects: [{ kind: 'unlock_note', unlockNodeId: 'dc-5' }] },
    ]),
    recipes: [
      { id: 'lead-1', inputs: ['e-1', 'e-2'], cost: 1, discoveryText: '집착처럼 보이는 그림과 공개 낙인이 충돌한다.', outputId: 'L-1' },
      { id: 'dossier-1', inputs: ['L-1', 'e-4'], cost: 1, discoveryText: '먼저 선을 넘은 사람을 묻는 카드가 열린다.', outputId: 'dc-1' },
      { id: 'lead-2', inputs: ['e-2', 'e-3'], cost: 1, discoveryText: '예전에도 이랬다는 요약 뒤의 시간축 리드가 생긴다.', outputId: 'L-2' },
      { id: 'dossier-2', inputs: ['L-2', 'e-6'], cost: 1, discoveryText: '손절의 시작점을 다시 묻는 카드가 열린다.', outputId: 'dc-2' },
      { id: 'lead-3', inputs: ['e-1', 'e-5'], cost: 1, discoveryText: '현재 사건의 진짜 제3자를 겨누는 리드가 생긴다.', outputId: 'L-3' },
      { id: 'dossier-3', inputs: ['L-3', 'stmt-b-protect'], cost: 1, discoveryText: '이번에도 같은 패턴이라는 카드가 완성된다.', outputId: 'dc-3' },
      { id: 'lead-4', inputs: ['e-6', 'stmt-b-villain'], cost: 1, discoveryText: '왜 악역을 택했는지 묻는 맥락 리드가 생긴다.', outputId: 'L-4' },
      { id: 'dossier-4', inputs: ['L-4', 'w-3-angle'], cost: 1, discoveryText: '악역을 택한 이유를 직접 묻는 카드가 열린다.', outputId: 'dc-4' },
      { id: 'lead-5', inputs: ['e-5', 'e-6'], cost: 1, discoveryText: '과거와 현재를 한 패턴으로 묶는 리드가 생긴다.', outputId: 'L-5' },
      { id: 'dossier-5', inputs: ['L-5', 'e-7'], cost: 1, discoveryText: '두 번의 손절을 재정의하는 카드가 완성된다.', outputId: 'dc-5' },
    ],
  },
  v3Design: {
    evidenceAxisLegend: { depthStages: evidenceDepthLegend, trustStates: evidenceTrustLegend },
    hiddenDisputes: disputes.filter((item) => item.hidden).map((item) => ({ id: item.id, name: item.name, unlockPlan: item.v3UnlockPlan })),
    leadLines,
    authorityPlacements,
    sensitiveSealTargets: [
      { evidenceId: 'e-4', targets: ['결혼 날짜·장소 표현', '성적 뉘앙스가 강한 문장 일부'], risk: '집착 프레임은 빨리 뒤집히지만 결혼 직전 사생활 침해가 커 보일 수 있다.' },
      { evidenceId: 'e-5', targets: ['정확한 돈 액수', '결혼 일정·예식장 정보', '계좌번호'], risk: '제3자 패턴을 열지만 현재 결혼 준비 정보가 과도하게 노출될 수 있다.' },
      { evidenceId: 'e-6', targets: ['정확한 송금 액수', 'B의 계좌번호'], risk: '과거 사기 구조를 확정하는 대신 가족 수치심이 크게 올라올 수 있다.' },
    ],
    officialRecordRecommendations: [
      'B는 예비신랑에게 반복 연락했다.',
      '예비신랑이 먼저 B에게 선을 넘는 메시지를 보냈다.',
      'A는 단톡방에서 먼저 B를 문제 인물로 퍼뜨렸다.',
      'A 아버지는 과거 B에게, 현재 예비신랑에게 비슷한 방식으로 돈을 요구했다.',
      'B는 두 번 다 A를 지키려다 직접 말하지 못했고, 그 대가로 두 번 다 악역이 되었다.',
    ],
  },
}

const v3 = {
  caseId: CASE_ID,
  dossierCards: [
    { id: 'dc-1', name: '먼저 선을 넘은 사람', description: '집착처럼 보인 그림을 예비신랑의 선넘기와 경고 실패 구조로 뒤집는 카드다.', evidenceIds: ['e-1', 'e-4'], relatedDisputes: ['d-1', 'h-d2'], subjectParty: 'b', leadId: 'L-1', successConditionSummary: ['L-1 완성', 'e-4가 Original 이상'], successEffects: ['h-d2 생성', 'B의 연락 의도를 다시 읽을 수 있게 됨'], challenges: [{ targetParty: 'b', questions: [dossierQuestion({ id: 'dc-1.b.q1', text: '먼저 선을 넘은 게 예비신랑이라면, 왜 결국 당신만 집착하는 사람처럼 남았습니까?', attackVector: 'context', requiredLieState: 'S2', revealAtom: `${CASE_ID}:b:h-d2:S3:0`, lockedHint: 'e-4가 원본 수준으로 열려야 질문이 보인다.' })] }] },
    { id: 'dc-2', name: '손절의 시작점', description: '과거 손절이 정말 변심 때문이었는지 다시 묻는 카드다.', evidenceIds: ['e-2', 'e-3', 'e-6'], relatedDisputes: ['d-4'], subjectParty: 'b', leadId: 'L-2', successConditionSummary: ['L-2 완성', 'e-6이 Original 이상'], successEffects: ['d-4가 과거 오해에서 과거 사기로 크게 이동', 'A의 성급한 결론 습관이 흔들림'], challenges: [{ targetParty: 'b', questions: [dossierQuestion({ id: 'dc-2.b.q1', text: '예전 손절도 정말 당신 변심 때문이었습니까, 아니면 그때도 돈 문제를 숨긴 겁니까?', attackVector: 'authenticity', requiredLieState: 'S2', revealAtom: `${CASE_ID}:b:d-4:S3:0`, lockedHint: 'e-6 원본과 L-2가 함께 열려야 질문이 보인다.' })] }] },
    { id: 'dc-3', name: '이번에도 같은 패턴', description: '현재 사건의 진짜 목적이 아버지의 돈 접근 차단이었는지 묻는 카드다.', evidenceIds: ['e-1', 'e-5'], relatedDisputes: ['h-d3', 'd-1'], subjectParty: 'b', leadId: 'L-3', successConditionSummary: ['L-3 완성', 'h-d3 생성'], successEffects: ['B가 이번 연락의 진짜 목적을 더 분명히 말함', 'd-1과 h-d3가 함께 진전'], challenges: [{ targetParty: 'b', questions: [dossierQuestion({ id: 'dc-3.b.q1', text: 'A 아버지가 예비신랑에게 또 같은 방식으로 접근했다면, 당신은 왜 이번에도 혼자 막으려 했습니까?', attackVector: 'context', requiredLieState: 'S2', revealAtom: `${CASE_ID}:b:h-d3:S3:0`, lockedHint: 'e-5가 충분히 열리고 제3자 패턴이 보이기 시작해야 열린다.' })] }] },
    { id: 'dc-4', name: '악역을 택한 이유', description: '왜 늘 직접 진실을 말하기보다 악역처럼 남는 쪽을 택했는지 묻는 카드다.', evidenceIds: ['e-6'], relatedDisputes: ['d-4', 'h-d3'], subjectParty: 'b', leadId: 'L-4', successConditionSummary: ['L-4 완성', 'B에게 공감접근 누적 2회 이상'], successEffects: ['B의 감정 고백 유도', 'd-4의 왜 숨겼나 칸 완성'], challenges: [{ targetParty: 'b', questions: [dossierQuestion({ id: 'dc-4.b.q1', text: '왜 늘 진실을 말하는 대신, 차라리 당신이 나쁜 사람처럼 보이는 쪽을 택했습니까?', attackVector: 'context', requiredLieState: 'S3', revealAtom: `${CASE_ID}:b:d-4:S4:0`, lockedHint: 'e-6과 B의 감정 축이 충분히 열려야 질문이 보인다.' })] }] },
    { id: 'dc-5', name: '두 번의 손절', description: '과거와 현재를 같은 패턴으로 확정하고 누가 먼저 잘못 기록됐는지 묻는 최종 카드다.', evidenceIds: ['e-5', 'e-6', 'e-7'], relatedDisputes: ['d-5', 'h-d3'], subjectParty: 'a', leadId: 'L-5', successConditionSummary: ['L-5 완성', 'e-7이 Original 이상'], successEffects: ['d-5와 h-d3 정리', 'B의 경고 / A의 낙인 / 아버지의 반복 구조가 공식기록으로 굳음'], challenges: [{ targetParty: 'a', questions: [dossierQuestion({ id: 'dc-5.a.q1', text: '과거와 현재가 같은 패턴이었다면, 이번 사건에서 가장 먼저 잘못 기록된 사람은 누구였습니까?', attackVector: 'authenticity', requiredLieState: 'S2', revealAtom: `${CASE_ID}:a:d-5:S3:0`, lockedHint: 'e-7이 원본 수준으로 열리고 A의 초기 방어가 한 번 꺾여야 열린다.' })] }] },
  ],
  stateUnlockAtoms: {
    a: {
      'd-5': {
        S3: [atom(`${CASE_ID}:a:d-5:S3:0`, 'S3', '송다은은 직접 확인도 안 하고 수민을 먼저 나쁜 사람으로 만들었다는 사실을 인정하기 시작한다.', ['thread-g', CASE_ID, 'd-5', 'dc-5'])],
      },
    },
    b: {
      'd-1': {
        S3: [atom(`${CASE_ID}:b:d-1:S3:0`, 'S3', '최수민은 반복 연락의 목적이 집착이 아니라 경고였다고 분명히 말하기 시작한다.', ['thread-g', CASE_ID, 'd-1'])],
      },
      'h-d2': {
        S3: [atom(`${CASE_ID}:b:h-d2:S3:0`, 'S3', '최수민은 먼저 선을 넘은 쪽이 예비신랑이었다고 인정한다.', ['thread-g', CASE_ID, 'h-d2', 'dc-1'])],
      },
      'h-d3': {
        S3: [atom(`${CASE_ID}:b:h-d3:S3:0`, 'S3', '최수민은 이번 연락의 진짜 이유가 A 아버지의 돈 접근을 또 막으려는 것이었다고 인정한다.', ['thread-g', CASE_ID, 'h-d3', 'dc-3'])],
      },
      'd-4': {
        S3: [atom(`${CASE_ID}:b:d-4:S3:0`, 'S3', '최수민은 과거 손절의 시작도 자신의 변심이 아니라 A 아버지의 돈 문제였다고 말한다.', ['thread-g', CASE_ID, 'd-4', 'dc-2'])],
        S4: [atom(`${CASE_ID}:b:d-4:S4:0`, 'S4', '최수민은 차라리 자신이 나쁜 사람처럼 남는 편이 다은의 세계를 무너뜨리지 않는다고 믿었다고 인정한다.', ['thread-g', CASE_ID, 'd-4', 'dc-4'])],
      },
    },
  },
  evidenceProgressions: evidence.map((node) => ({ evidenceId: node.id, name: node.name, depthStages: node.v3DepthPlan, trustStates: node.v3TrustStates, sealTargets: node.v3SealTargets || [] })),
  leadLines,
  authorityPlacements,
  hiddenDisputePlans: disputes.filter((item) => item.hidden).map((item) => ({ disputeId: item.id, name: item.name, unlockPlan: item.v3UnlockPlan })),
  sensitiveSealTargets: [
    { evidenceId: 'e-4', label: '예비신랑의 선넘는 메시지 + B의 거절 답장', targets: ['결혼 날짜·장소 표현', '성적 뉘앙스가 강한 문장 일부'], recommendedTiming: ['h-d2에서 집착 프레임을 확실히 뒤집어야 할 때'], risks: ['결혼 직전 사생활 침해가 크게 느껴질 수 있음', 'A의 감정 폭발 가능'] },
    { evidenceId: 'e-5', label: 'A 아버지와 예비신랑의 문자', targets: ['정확한 돈 액수', '결혼 일정·예식장 정보', '계좌번호'], recommendedTiming: ['h-d3는 열렸지만 현재 패턴을 강하게 고정해야 할 때'], risks: ['현재 결혼 준비 정보 과다 노출', '아버지 문제로 시선이 급격히 이동'] },
    { evidenceId: 'e-6', label: '과거 송금 영수증 + 아버지 문자', targets: ['정확한 송금 액수', 'B의 계좌번호'], recommendedTiming: ['d-4를 과거 사기 축으로 확정해야 할 때'], risks: ['과거 수치심 급상승', 'B의 방어적 셧다운 가능'] },
  ],
  officialRecordRecommendations: [
    'B는 예비신랑에게 반복 연락했다.',
    '예비신랑이 먼저 B에게 선을 넘는 메시지를 보냈다.',
    'A는 단톡방에서 먼저 B를 문제 인물로 퍼뜨렸다.',
    'A 아버지는 과거 B에게, 현재 예비신랑에게 비슷한 방식으로 돈을 요구했다.',
    'B는 두 번 다 A를 지키려다 직접 말하지 못했고, 그 대가로 두 번 다 악역이 되었다.',
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
