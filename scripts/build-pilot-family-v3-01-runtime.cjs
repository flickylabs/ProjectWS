const path = require('path')
const { enrichRuntimeFile } = require('./lib/runtime-gameplay-enricher.cjs')
const { atom, derivedNode, depthStage, dossierQuestion, evidenceNode, interpretationChoice, pascal, stage, statementNode, trustState, witnessAngleNode, writeJson, writeTs } = require('./lib/thread-g-v3-builder-utils.cjs')

const ROOT = path.resolve(__dirname, '..')
const CASE_ID = 'family-v3-01'
const RUNTIME_CASE_ID = `case-${CASE_ID}`
const TITLE = '치매 어머니의 유서'
const REF_DIR = path.join(ROOT, 'docs', 'ref', '리뉴얼참고')
const RUNTIME_OUT_PATH = path.join(ROOT, 'src', 'data', 'cases', 'generated', `${CASE_ID}.json`)
const V3_JSON_OUT_PATH = path.join(REF_DIR, `${CASE_ID}-v3-game-loop-data.json`)
const V3_TS_OUT_PATH = path.join(REF_DIR, `${CASE_ID}-v3-game-loop-data.ts`)

const HOOK = '배다른 동생을 평생 못마땅해하던 형은, 치매 어머니가 남긴 유서에서 자기 몫이 40퍼센트라는 걸 보고 무너진다. 동생은 끝까지 담담하다. 그래서 더 수상해 보인다.'
const ANCHOR_TRUTH = '윤정후는 말년의 어머니 곁을 자주 드나들며 유서 문제에 개입했고 실제로 60대 40 유서를 만들었다. 그러나 그 조작은 자기 몫을 늘리는 방향이 아니라 줄이는 방향이었고, 그 배경에는 20년 생활비 지원과 형 윤태성의 출생 비밀을 끝까지 막으려 한 보호가 겹쳐 있었다.'
const MID_TWIST = '초반에는 요양원 방문기록과 보호사 음성, 60대 40 유서가 모두 동생의 유산 개입처럼 겹친다. 그러나 공증사무실 보관본과 90대 10 원본 유서가 열리면 조작 방향이 뒤집히고, 20년 송금 내역과 어머니 일기장 사진이 이어지면서 사건의 중심은 유산 다툼에서 형의 출생 비밀을 둘러싼 보호와 왜곡으로 이동한다.'
const DILEMMA = '유서를 직접 손댄 책임은 분명히 윤정후에게 있다. 하지만 그 조작은 자기 몫을 줄인 조작이었고, 형과 어머니를 떠받쳐 온 시간이 배경으로 붙어 있다. 윤태성은 진실을 몰랐기에 억울하지만, 마지막까지 어머니 뜻보다 자기 자리 상실 공포를 먼저 읽을 위험도 함께 안고 있다.'

const evidenceDepthLegend = [
  depthStage('stub', 'Stub', '존재만 보임'),
  depthStage('excerpt', 'Excerpt', '제출된 일부만 열람'),
  depthStage('original', 'Original', '원본과 전체본 확보'),
  depthStage('context', 'Context', '앞뒤 맥락까지 복원'),
  depthStage('established', 'Established', '공식기록에 채택'),
]

const evidenceTrustLegend = [
  trustState('submitted', '제출됨', '당사자 또는 재판관에 의해 올라온 상태'),
  trustState('verifying', '검증 중', '원본 대조와 맥락 확인이 진행 중'),
  trustState('authenticated', '인증됨', '핵심 진본성이 확인됨'),
  trustState('challenged', '이의 제기됨', '상대가 의미나 범위를 다툼'),
  trustState('misread', '조작/오독 판정', '자료 자체와 해석이 분리됨'),
]

const disputes = [
  { id: 'd-1', name: '말년의 어머니는 유서를 제대로 판단할 수 있었는가', truth: true, truthDescription: 'B는 말년의 어머니 곁을 자주 드나들며 유서 문제에 실제로 개입했다.', quadrant: 'b_only', requiredEvidence: ['e-1', 'e-2', 'e-3'], correctResponsibility: { a: 30, b: 70 }, ambiguity: 'mid', weight: 'high', mediationLink: '말년 접근과 유서 개입', legitimacyIssue: true, judgmentStatement: 'B가 말년의 어머니 곁에서 유서 문제를 밀어붙인 사실은 남는다.', hidden: false, v3Visibility: 'initial' },
  { id: 'd-2', name: '60대 40 유서는 정말 어머니의 마지막 뜻이었는가', truth: true, truthDescription: 'B는 60대 40 유서를 직접 만들었지만 자기 몫을 늘린 것이 아니라 줄였다.', quadrant: 'b_only', requiredEvidence: ['e-1', 'e-4', 'e-5'], correctResponsibility: { a: 20, b: 80 }, ambiguity: 'low', weight: 'high', mediationLink: '감액 조작의 성격', legitimacyIssue: true, judgmentStatement: '60대 40 유서는 B가 손댄 최종본이지만 조작 방향은 증액이 아니라 감액이었다.', hidden: false, v3Visibility: 'initial' },
  { id: 'd-5', name: '누가 정말 어머니를 이용했는가', truth: true, truthDescription: 'A는 진실을 모르고 B를 미워했고, B는 형을 지키려다 어머니 뜻까지 손댔다.', quadrant: 'shared_misconception', requiredEvidence: ['e-3', 'e-6', 'e-7'], correctResponsibility: { a: 50, b: 50 }, ambiguity: 'high', weight: 'high', mediationLink: '보호와 이용의 경계', legitimacyIssue: true, judgmentStatement: '두 사람 모두 어머니를 완전히 있는 그대로 두지 못했다.', hidden: false, v3Visibility: 'initial' },
  { id: 'h-d3', name: '왜 원래 유서는 90대 10이었는가, 그리고 그 비율은 무엇에 대한 보답이었는가', truth: true, truthDescription: '어머니가 B에게 90을 주려 했던 이유는 20년 생활비와 A의 사업을 살린 돈 때문이었다.', quadrant: 'b_only', requiredEvidence: ['e-5', 'e-6'], correctResponsibility: { a: 35, b: 65 }, ambiguity: 'mid', weight: 'high', mediationLink: '오랜 지원의 금전 근거', legitimacyIssue: false, judgmentStatement: '90대 10에는 분명한 지원 근거가 있었다.', hidden: true, v3Visibility: 'hidden', unlockCondition: { requireEvidence: 'e-5' }, v3UnlockPlan: { runtimeRule: 'e-5 제시 시 해금', authoredRule: 'e-5가 Original 이상이 되거나 e-4와 e-5로 Reframe Lead가 생기면 생성' } },
  { id: 'h-d4', name: '60대 40 조작이 막으려 한 더 큰 비밀은 무엇인가', truth: true, truthDescription: 'B는 A의 출생 비밀이 터지는 걸 막으려고 90을 60으로 낮췄다.', quadrant: 'b_only', requiredEvidence: ['e-6', 'e-7'], correctResponsibility: { a: 30, b: 70 }, ambiguity: 'high', weight: 'high', mediationLink: '출생 비밀과 감액 조작', legitimacyIssue: true, judgmentStatement: '60대 40 조작의 핵심 동기에는 출생 비밀 보호가 얽혀 있었다.', hidden: true, v3Visibility: 'hidden', unlockCondition: { requireEvidence: 'e-7' }, v3UnlockPlan: { runtimeRule: 'e-7 제시 시 해금', authoredRule: 'e-7이 Excerpt 이상이 되거나 e-6과 e-7로 Context/Reframe Lead가 완성되면 생성' } },
]

const evidence = [
  {
    id: 'e-1',
    name: '60대 40 유서 사본',
    surfaceName: '유서 1건',
    description: '정후 60, 태성 40 비율과 작성일이 적힌 유서 사본이다.',
    surfaceDescription: '유서 1건의 존재만 먼저 보인다.',
    type: 'contract',
    reliability: 'hard',
    completeness: 'original',
    provenance: 'self_possessed',
    legitimacy: 'lawful',
    proves: ['d-1', 'd-2'],
    isTrap: false,
    requires: [],
    investigationResults: {
      request_original: '공증 도장, 서명, 작성일이 붙은 60대 40 유서 전체 사본이 확보된다.',
      check_metadata: '비율과 날짜만 보면 B가 말년을 파고들어 최종본을 만들었다는 A의 서사가 강해진다.',
      restore_context: 'e-2, e-3과 연결되면 최종본의 의미가 단순 상속 문서에서 말년 개입 질문으로 이동한다.',
    },
    subjectParty: 'b',
    investigationStages: [
      stage(0, 'request_original', '이 60대 40 유서 사본, 실제 최종본으로 제출된 문서 맞습니까?', 'authenticity'),
      stage(1, 'check_metadata', '이 비율이 어머니의 마지막 뜻이라고 지금도 말할 수 있습니까?', 'context'),
      stage(2, 'restore_context', '왜 형이 모르는 사이 이 문서가 먼저 굳어지게 했습니까?', 'responsibility'),
    ],
    partyContext: {
      a: { questionAngle: '왜 이 유서가 동생이 말년을 파고들었다는 확신으로 이어졌는지 설명해 주십시오.', implication: '초반 complaint를 고정하는 표면 문서다.' },
      b: { questionAngle: '왜 이 최종본이 자기 몫을 줄인 조작이었다는 설명을 처음부터 하지 못했는지 설명해 주십시오.', implication: '조작 사실과 조작 방향이 분리된다.' },
    },
    v3DepthPlan: [depthStage('stub', 'Stub', '유서 1건 존재만 보임'), depthStage('excerpt', 'Excerpt', '정후 60, 태성 40 비율과 날짜만 보임'), depthStage('original', 'Original', '공증 도장, 서명, 작성일이 붙은 전체 사본 확보'), depthStage('context', 'Context', 'e-2, e-3과 함께 말년 접근 맥락이 붙음'), depthStage('established', 'Established', '60대 40 유서가 실제 제출된 최종본이었다는 점이 공식기록 채택 대상이 됨')],
    v3TrustStates: [trustState('submitted', '제출됨', 'A가 사본 제출'), trustState('verifying', '검증 중', '공증사무실 사본과 대조'), trustState('authenticated', '인증됨', '도장과 서명이 일치'), trustState('challenged', '이의 제기됨', 'B가 맥락이 빠졌다고 이의'), trustState('misread', '조작/오독 판정', '문서 자체는 인증되지만 의미는 열려 있음')],
  },
  {
    id: 'e-2',
    name: '요양원 방문기록',
    surfaceName: '방문기록 1건',
    description: '공증 전 몇 주 동안 B의 방문이 늘어난 요양원 방문기록이다.',
    surfaceDescription: '방문기록 1건의 존재만 보인다.',
    type: 'log',
    reliability: 'hard',
    completeness: 'original',
    provenance: 'institutional',
    legitimacy: 'lawful',
    proves: ['d-1'],
    isTrap: false,
    requires: [],
    investigationResults: {
      request_original: '방문 시각과 체류 시간이 붙은 원장부가 확보된다.',
      check_metadata: '공증 전 몇 주 동안 B 방문이 늘어난 패턴이 말년 접근처럼 읽힌다.',
      restore_context: 'A의 방문 간격과 e-3 증언이 붙으면 단순 방문이 아니라 유서 개입의 시간축으로 재배열된다.',
    },
    subjectParty: 'b',
    investigationStages: [
      stage(0, 'request_original', '이 방문기록, 공증 전 어머니를 자주 찾아간 사실이 맞습니까?', 'authenticity'),
      stage(1, 'check_metadata', '왜 하필 그 시기에 방문이 급격히 늘었습니까?', 'context'),
      stage(2, 'restore_context', '형보다 먼저 움직여야 했던 이유가 있었다면 무엇입니까?', 'responsibility'),
    ],
    partyContext: {
      a: { questionAngle: '왜 이 방문 패턴이 동생의 개입처럼 보였는지 설명해 주십시오.', implication: '말년 접근의 시간축을 만든다.' },
      b: { questionAngle: '왜 찾아간 사실 자체를 숨기지 않으면서도 이유는 끝까지 말하지 않았는지 설명해 주십시오.', implication: '담담한 방어와 실제 동기가 분리된다.' },
    },
    v3DepthPlan: [depthStage('stub', 'Stub', '방문기록 1건 존재 표시'), depthStage('excerpt', 'Excerpt', '공증 전 몇 주 동안 B 방문이 늘어난 날짜 목록'), depthStage('original', 'Original', '방문 시각, 체류 시간, 보호사 교체 시점 확보'), depthStage('context', 'Context', 'A의 방문 간격과 e-3 증언이 함께 붙음'), depthStage('established', 'Established', 'B가 공증 전 어머니 곁에 자주 있었음이 공식기록 채택 대상이 됨')],
    v3TrustStates: [trustState('submitted', '제출됨', 'A가 출력본 제출'), trustState('verifying', '검증 중', '요양원 원장부 대조'), trustState('authenticated', '인증됨', '출입기록과 CCTV 시간 일치'), trustState('challenged', '이의 제기됨', 'B가 찾아간 것 자체는 죄가 아니라고 반발'), trustState('misread', '조작/오독 판정', '기록은 인증되지만 꼬드김 해석은 보류')],
  },
  {
    id: 'e-3',
    name: '전 요양보호사 음성증언',
    surfaceName: '요양보호사 증언 1건',
    description: '말년 분위기와 B의 말투를 전하는 전 요양보호사 음성증언이다.',
    surfaceDescription: '요양보호사 증언 1건의 존재만 보인다.',
    type: 'testimony',
    reliability: 'mid',
    completeness: 'excerpt',
    provenance: 'third_party',
    legitimacy: 'lawful',
    proves: ['d-1', 'd-5'],
    isTrap: false,
    requires: [],
    investigationResults: {
      request_original: '누가 어떤 상황에서 무슨 말을 했는지 포함된 전체 음성이 확보된다.',
      check_metadata: '"종이를 읽어드렸다", "형 오기 전에 끝내자"는 발언이 감정적으로 A의 의심을 밀어 올린다.',
      restore_context: '보호사 교체 이유와 당시 어머니 컨디션이 붙으면 발언의 의도가 단정이 아니라 관리였을 가능성도 함께 열린다.',
    },
    subjectParty: 'b',
    investigationStages: [
      stage(0, 'request_original', '이 음성증언의 원본, 발언자와 일시가 확인됩니까?', 'authenticity'),
      stage(1, 'check_metadata', '형이 오기 전에 끝내자고 했다는 말은 정확히 무엇을 뜻했습니까?', 'context'),
      stage(2, 'restore_context', '당시 어머니 상태를 감추면서까지 서두른 이유가 무엇입니까?', 'responsibility'),
    ],
    partyContext: {
      a: { questionAngle: '왜 이 증언이 동생이 말년을 밀어붙였다는 확신을 더 강하게 만들었는지 설명해 주십시오.', implication: '감정적으로 d-1을 강화한다.' },
      b: { questionAngle: '왜 이 발언의 의도를 끝까지 추상적으로만 말하려 하는지 설명해 주십시오.', implication: 'affect_flattening의 표면을 흔든다.' },
    },
    meta: { redactions: ['치매 관련 직접 표현', '요양원 내부 개인 정보'] },
    v3DepthPlan: [depthStage('stub', 'Stub', '요양보호사 증언 1건 존재만 보임'), depthStage('excerpt', 'Excerpt', '"종이를 읽어드렸다" 같은 일부 문장만 들림'), depthStage('original', 'Original', '전체 음성과 말투, 상황이 함께 확보됨'), depthStage('context', 'Context', '보호사 교체 이유와 어머니 컨디션, 긴장 분위기까지 복원'), depthStage('established', 'Established', 'B가 공증 전 유서 문제를 실제로 밀어붙였을 가능성이 공식기록 후보로 떠오름')],
    v3TrustStates: [trustState('submitted', '제출됨', 'A가 녹음 파일 제출'), trustState('verifying', '검증 중', '증언자 확인과 녹음 일시 대조'), trustState('authenticated', '인증됨', '증언자와 일시 확인 완료'), trustState('challenged', '이의 제기됨', 'B가 형을 배제한 게 아니라 어머니를 흥분시키지 않으려 한 것이라고 이의'), trustState('misread', '조작/오독 판정', '발언은 인증되지만 의도 해석은 Context 필요')],
    v3SealTargets: ['치매 관련 직접 표현', '요양원 내부 개인 정보'],
  },

  {
    id: 'e-4',
    name: '공증사무실 스캔 보관본',
    surfaceName: '공증사무실 보관본 1건',
    description: '같은 날 두 번 스캔된 90대 10, 60대 40 버전 흐름이 남은 공증사무실 보관본이다.',
    surfaceDescription: '공증사무실 보관본 1건 존재만 보인다.',
    type: 'log',
    reliability: 'hard',
    completeness: 'original',
    provenance: 'institutional',
    legitimacy: 'lawful',
    proves: ['d-2', 'h-d3'],
    isTrap: false,
    requires: ['e-1'],
    requiredLieState: 'S1',
    investigationResults: {
      request_original: '같은 날 두 번 스캔된 기록과 마지막 제출자가 B라는 점이 원본으로 확인된다.',
      check_metadata: '앞본 90대 10, 뒷본 60대 40이 이어지며 조작 사실 자체는 더 이상 피할 수 없게 된다.',
      restore_context: '직원 메모와 급한 재방문 정황이 붙으면 조작 방향보다 조작 이유를 묻게 된다.',
    },
    subjectParty: 'b',
    investigationStages: [
      stage(0, 'request_original', '이 보관본상 마지막 제출자가 당신이라는 점, 인정합니까?', 'authenticity'),
      stage(1, 'check_metadata', '같은 날 두 버전이 연속으로 스캔된 이유가 무엇입니까?', 'context'),
      stage(2, 'restore_context', '왜 더 가져가는 조작이 아니라 비율을 낮추는 조작을 택했습니까?', 'responsibility'),
    ],
    partyContext: {
      a: { questionAngle: '왜 이 보관본이 동생의 직접 개입을 못 박는다고 보는지 설명해 주십시오.', implication: 'd-2의 조작 사실을 확정한다.' },
      b: { questionAngle: '왜 조작 사실을 숨기기보다 조작 방향을 끝까지 숨기려 했는지 설명해 주십시오.', implication: '감액 조작의 이유를 여는 핵심 축이다.' },
    },
    v3DepthPlan: [depthStage('stub', 'Stub', '보관본 1건 존재만 보임'), depthStage('excerpt', 'Excerpt', '같은 날 두 번 스캔된 기록과 서로 다른 비율만 보임'), depthStage('original', 'Original', '90대 10, 60대 40 두 버전과 마지막 제출자 확인'), depthStage('context', 'Context', '직원 메모와 급한 재방문 정황이 붙음'), depthStage('established', 'Established', 'B가 유서를 고친 건 맞다는 점이 공식기록 채택 대상이 됨')],
    v3TrustStates: [trustState('submitted', '제출됨', '재판관 원본 제출 명령으로 확보'), trustState('verifying', '검증 중', '스캔 타임스탬프와 직원 진술 대조'), trustState('authenticated', '인증됨', '시간, 버전, 제출자 흐름 일치'), trustState('challenged', '이의 제기됨', 'B가 더 가지려고 고친 게 아니었다고 주장'), trustState('misread', '조작/오독 판정', '조작은 사실이고 동기는 아직 미확정')],
  },
  {
    id: 'e-5',
    name: '원본 유서 90대 10',
    surfaceName: '이전 버전 유서 존재',
    description: '어머니가 먼저 써 둔 90대 10 원본 유서다.',
    surfaceDescription: '이전 버전 유서의 존재만 먼저 보인다.',
    type: 'contract',
    reliability: 'hard',
    completeness: 'original',
    provenance: 'self_possessed',
    legitimacy: 'lawful',
    proves: ['d-2', 'h-d3'],
    isTrap: false,
    requires: ['e-4'],
    investigationResults: {
      request_original: '정후 90, 태성 10 비율과 더 이른 날짜가 적힌 원본 유서 전체가 확인된다.',
      check_metadata: '조작의 방향이 증액이 아니라 감액이었다는 사실이 선명해진다.',
      restore_context: '왜 이런 비율이 나왔는지 질문이 열리며 20년 지원 서사로 연결된다.',
    },
    subjectParty: 'b',
    investigationStages: [
      stage(0, 'request_original', '이 90대 10 유서가 더 이른 원본이었다는 점, 맞습니까?', 'authenticity'),
      stage(1, 'check_metadata', '원래 90을 받게 되어 있었다면 왜 지금 60이 최종본입니까?', 'context'),
      stage(2, 'restore_context', '어머니가 처음엔 왜 당신에게 90을 남기려 했다고 봅니까?', 'responsibility'),
    ],
    partyContext: {
      a: { questionAngle: '왜 이 문서가 동생의 탐욕이 아니라 더 큰 배경을 의심하게 만드는지 설명해 주십시오.', implication: 'h-d3를 부르는 반전 문서다.' },
      b: { questionAngle: '왜 이 원본을 끝까지 먼저 내놓지 않았는지 설명해 주십시오.', implication: '조작 방향을 뒤집는 첫 관문이다.' },
    },
    v3DepthPlan: [depthStage('stub', 'Stub', '이전 버전 유서 존재만 보임'), depthStage('excerpt', 'Excerpt', '정후 90, 태성 10 숫자만 보임'), depthStage('original', 'Original', '더 이른 날짜와 어머니 서명이 붙은 원본 확보'), depthStage('context', 'Context', '지원 서사와 연결되는 질문이 함께 붙음'), depthStage('established', 'Established', '어머니가 원래는 B에게 훨씬 많이 주려 했다는 점이 공식기록 채택 대상이 됨')],
    v3TrustStates: [trustState('submitted', '제출됨', '어머니 서랍 문서로 제출'), trustState('verifying', '검증 중', '필체, 날짜, 보관 상태 대조'), trustState('authenticated', '인증됨', '어머니 필체와 날짜 확인'), trustState('challenged', '이의 제기됨', 'A가 치매 전후를 더 따져야 한다고 이의'), trustState('misread', '조작/오독 판정', '문서 진본은 인증되고 의미는 h-d3에서 재해석된다.')],
  },
  {
    id: 'e-6',
    name: '20년 송금 내역 묶음',
    surfaceName: '장기 송금 흐름 1건',
    description: 'B가 어머니 통장으로 반복 송금하고 A 사업이 무너질 뻔한 해에 큰돈까지 보낸 내역 묶음이다.',
    surfaceDescription: '장기 송금 흐름 1건의 존재만 보인다.',
    type: 'bank',
    reliability: 'hard',
    completeness: 'original',
    provenance: 'institutional',
    legitimacy: 'lawful',
    proves: ['h-d3', 'h-d4', 'd-5'],
    isTrap: false,
    requires: ['e-5'],
    requiredLieState: 'S2',
    investigationResults: {
      request_original: '매달 생활비 흐름과 사업 실패 해의 큰돈 이동이 한 묶음으로 확인된다.',
      check_metadata: 'A가 평생 어머니 돈인 줄 알았던 흐름 상당수가 사실은 B 지원이었다는 윤곽이 선명해진다.',
      restore_context: 'B가 형 자존심이 무너질까 봐 말하지 않았다는 서사와 연결되며 h-d3가 본격화된다.',
    },
    subjectParty: 'b',
    investigationStages: [
      stage(0, 'request_original', '이 반복 송금 흐름과 큰돈 이동, 모두 당신 돈에서 나온 것 맞습니까?', 'authenticity'),
      stage(1, 'check_metadata', '왜 20년 동안 보내고도 형에게 한 번도 말하지 않았습니까?', 'context'),
      stage(2, 'restore_context', '형 자존심을 지키려 침묵했다는 말이 실제로는 무엇을 감춘 겁니까?', 'responsibility'),
    ],
    partyContext: {
      a: { questionAngle: '왜 이 돈 흐름이 지금까지 믿어 온 형제 서사를 흔드는지 설명해 주십시오.', implication: 'A의 기존 세계관을 무너뜨리는 증거다.' },
      b: { questionAngle: '왜 지원 사실보다 침묵 이유를 먼저 말해야 하는 상황이 됐는지 설명해 주십시오.', implication: 'h-d3와 h-d4를 동시에 여는 축이다.' },
    },
    meta: { redactions: ['정확한 계좌번호', '사업 실패 당시 큰돈 액수'] },
    v3DepthPlan: [depthStage('stub', 'Stub', '장기 송금 흐름 1건 존재만 보임'), depthStage('excerpt', 'Excerpt', '반복 송금 날짜와 횟수만 보임'), depthStage('original', 'Original', '생활비 흐름과 큰돈 이동이 함께 확인됨'), depthStage('context', 'Context', 'A는 어머니 돈인 줄 알았고 B는 말하지 않았다는 서사가 붙음'), depthStage('established', 'Established', '90대 10의 배경에 분명한 돈 근거가 있었다는 점이 공식기록 채택 대상이 됨')],
    v3TrustStates: [trustState('submitted', '제출됨', 'B 일부 제출 또는 재판관 확보'), trustState('verifying', '검증 중', '은행 원본 대조'), trustState('authenticated', '인증됨', '반복 송금과 큰돈 이동 모두 확인'), trustState('challenged', '이의 제기됨', 'A가 도운 것과 유서 조작은 별개라고 이의'), trustState('misread', '조작/오독 판정', '돈 흐름은 인증되며 의미는 Beneficiary 해석에 따라 달라진다.')],
    v3SealTargets: ['정확한 계좌번호', '사업 실패 당시 큰돈 액수'],
  },
  {
    id: 'e-7',
    name: '어머니 일기장 사진',
    surfaceName: '어머니 일기장 사진 1건',
    description: 'A의 출생 비밀과 B가 그 사실을 알고 있었다는 기록이 담긴 어머니 일기장 사진이다.',
    surfaceDescription: '어머니 일기장 사진 1건 존재만 보인다.',
    type: 'device',
    reliability: 'mid',
    completeness: 'original',
    provenance: 'self_possessed',
    legitimacy: 'lawful',
    proves: ['h-d4', 'd-5'],
    isTrap: false,
    requires: ['e-6'],
    requiredLieState: 'S3',
    investigationResults: {
      request_original: '일기장 필체와 작성 시기, 출생 비밀 관련 문장이 포함된 원본 사진 전체가 확보된다.',
      check_metadata: '90대 10으로 남기면 태성이 끝까지 파고들 것 같다는 문장이 감액 조작 이유를 직접 가리킨다.',
      restore_context: 'B가 60을 택한 이유가 돈이 아니라 형의 삶 전체를 지키려는 선택이었다는 맥락이 붙는다.',
    },
    subjectParty: 'b',
    investigationStages: [
      stage(0, 'request_original', '이 일기장 사진의 필체와 작성 시기, 모두 확인됩니까?', 'authenticity'),
      stage(1, 'check_metadata', '왜 90을 60으로 낮추지 않으면 형이 끝까지 파고들 거라고 본 겁니까?', 'context'),
      stage(2, 'restore_context', '형에게 무엇이 무너질까 두려워 그 선택을 했습니까?', 'responsibility'),
    ],
    partyContext: {
      a: { questionAngle: '왜 이 사진이 유산 문제가 아니라 삶의 자리 문제로 쟁점을 뒤집는지 설명해 주십시오.', implication: 'h-d4의 핵심 반전이다.' },
      b: { questionAngle: '왜 가장 무거운 비밀을 알면서도 감액 조작 쪽을 택했는지 설명해 주십시오.', implication: '보호와 월권의 경계가 드러난다.' },
    },
    meta: { redactions: ['A의 출생 비밀 직접 문장', '혈연 여부 표현', '어머니의 치매 전 개인 기록 일부'] },
    v3DepthPlan: [depthStage('stub', 'Stub', '어머니 일기장 사진 1건 존재만 보임'), depthStage('excerpt', 'Excerpt', '"90대 10대로 남기면 태성이 끝까지 파고들 것 같다" 정도만 보임'), depthStage('original', 'Original', '출생 비밀과 B의 인지 사실까지 열림'), depthStage('context', 'Context', '감액 조작이 보호 선택이었다는 맥락이 붙음'), depthStage('established', 'Established', '60대 40 조작이 출생 비밀 보호와 얽혀 있었다는 점이 공식기록 채택 대상이 됨')],
    v3TrustStates: [trustState('submitted', '제출됨', 'B 또는 유품 정리 과정에서 확보'), trustState('verifying', '검증 중', '필체와 작성 시기 대조'), trustState('authenticated', '인증됨', '어머니 필체 확인'), trustState('challenged', '이의 제기됨', 'A가 민감정보 봉인 해제를 거부할 수 있음'), trustState('misread', '조작/오독 판정', '일기장 자체는 인증되고 공개 범위는 Authority 결정에 좌우된다.')],
    v3SealTargets: ['A의 출생 비밀 직접 문장', '혈연 여부 표현', '어머니의 치매 전 개인 기록 일부'],
  },
]

const truthTable = [
  { id: 't-1', fact: 'B는 말년의 어머니 곁을 자주 드나들며 유서 문제에 개입했다.', isTrue: true, weight: 9, quadrant: 'b_only' },
  { id: 't-2', fact: 'B는 60대 40 유서를 직접 만들었지만 자기 몫을 줄이는 감액 조작을 했다.', isTrue: true, weight: 10, quadrant: 'b_only' },
  { id: 't-3', fact: '원래 90대 10 비율에는 20년 생활비와 사업 지원이 배경으로 있었다.', isTrue: true, weight: 10, quadrant: 'b_only' },
  { id: 't-4', fact: '60대 40 조작의 핵심 동기에는 A의 출생 비밀 보호가 얽혀 있었다.', isTrue: true, weight: 10, quadrant: 'b_only' },
  { id: 't-5', fact: 'A는 진실을 모르고 B를 미워했고, B는 형을 지키려다 어머니 뜻까지 손댔다.', isTrue: true, weight: 9, quadrant: 'shared_misconception' },
]

const lieConfigA = [
  { disputeId: 'd-5', lieType: 'LT-1', lieIntensity: 'L3', lieMotive: 'face_saving', initialState: 'S0', collapseViaTrust: true, transitions: [
    { from: 'S0', to: 'S1', trigger: 'd-5_a_blame_question' }, { from: 'S1', to: 'S2', trigger: 'hard_evidence' }, { from: 'S2', to: 'S3', trigger: 'e-6_presented' }, { from: 'S3', to: 'S4', trigger: 'd-5_a_birth_secret_question' }, { from: 'S4', to: 'S5', trigger: 'd-5_a_ignorance_confession' },
  ] },
]

const lieConfigB = [
  { disputeId: 'd-1', lieType: 'LT-6', lieIntensity: 'L2', lieMotive: 'self_protection', initialState: 'S0', collapseViaTrust: false, transitions: [{ from: 'S0', to: 'S1', trigger: 'd-1_b_visit_question' }, { from: 'S1', to: 'S2', trigger: 'hard_evidence' }, { from: 'S2', to: 'S3', trigger: 'e-3_presented' }, { from: 'S3', to: 'S4', trigger: 'd-1_b_last_months_question' }, { from: 'S4', to: 'S5', trigger: 'd-1_b_push_confession' }] },
  { disputeId: 'd-2', lieType: 'LT-6', lieIntensity: 'L3', lieMotive: 'financial_preservation', initialState: 'S0', collapseViaTrust: false, transitions: [{ from: 'S0', to: 'S1', trigger: 'd-2_b_denial_question' }, { from: 'S1', to: 'S2', trigger: 'hard_evidence' }, { from: 'S2', to: 'S3', trigger: 'e-4_presented' }, { from: 'S3', to: 'S4', trigger: 'd-2_b_reduce_question' }, { from: 'S4', to: 'S5', trigger: 'd-2_b_reduce_confession' }] },
  { disputeId: 'h-d3', lieType: 'LT-6', lieIntensity: 'L2', lieMotive: 'self_protection', initialState: 'S0', collapseViaTrust: false, transitions: [{ from: 'S0', to: 'S1', trigger: 'h-d3_b_support_question' }, { from: 'S1', to: 'S2', trigger: 'hard_evidence' }, { from: 'S2', to: 'S3', trigger: 'e-6_presented' }, { from: 'S3', to: 'S4', trigger: 'h-d3_b_pride_question' }, { from: 'S4', to: 'S5', trigger: 'h-d3_b_support_confession' }] },
  { disputeId: 'h-d4', lieType: 'LT-1', lieIntensity: 'L3', lieMotive: 'face_saving', initialState: 'S0', collapseViaTrust: true, transitions: [{ from: 'S0', to: 'S1', trigger: 'h-d4_b_diary_question' }, { from: 'S1', to: 'S2', trigger: 'hard_evidence' }, { from: 'S2', to: 'S3', trigger: 'e-7_presented' }, { from: 'S3', to: 'S4', trigger: 'h-d4_b_secret_question' }, { from: 'S4', to: 'S5', trigger: 'h-d4_b_birth_secret_confession' }] },
]

const leadLines = [
  { id: 'L-1', name: 'Timeline Lead', leadType: 'Timeline', firstInputs: ['e-1', 'e-2'], secondInputs: ['L-1', 'e-3'], dossierCardId: 'dc-1', interpretationChoices: [interpretationChoice('L-1-A', '동생이 말년을 파고들어 유산을 바꿨다', '초반 complaint를 강화한다.'), interpretationChoice('L-1-B', '마지막을 챙긴 사람이 동생이었다', '개입과 돌봄을 함께 보게 만든다.')] },
  { id: 'L-2', name: 'Authenticity Lead', leadType: 'Authenticity', firstInputs: ['e-1', 'e-4'], secondInputs: ['L-2', 'e-5'], dossierCardId: 'dc-2', interpretationChoices: [interpretationChoice('L-2-A', '더 많이 가지려고 바꿨다', '탐욕 서사를 유지한다.'), interpretationChoice('L-2-B', '비율을 다시 조정하려 했다', '감액 조작 질문으로 넘어간다.')] },
  { id: 'L-3', name: 'Beneficiary Lead', leadType: 'Beneficiary', firstInputs: ['e-5', 'e-6'], secondInputs: ['L-3', 'stmt-b-pride'], dossierCardId: 'dc-3', interpretationChoices: [interpretationChoice('L-3-A', '오랜 도움에 대한 보답이다', '어머니 판단의 근거를 본다.'), interpretationChoice('L-3-B', '형을 밀어낸 편애다', 'A의 불공정감이 유지된다.'), interpretationChoice('L-3-C', '형을 대신 떠받친 세월의 계산서다', '지원의 누적값을 본다.')] },
  { id: 'L-4', name: 'Context Lead', leadType: 'Context', firstInputs: ['e-6', 'stmt-b-collapse'], secondInputs: ['L-4', 'w-3-angle'], dossierCardId: 'dc-4', interpretationChoices: [interpretationChoice('L-4-A', '생색을 피했다', '감정 억제와 체면을 본다.'), interpretationChoice('L-4-B', '형의 삶을 보호하려 침묵했다', '보호 동기를 본다.')] },
  { id: 'L-5', name: 'Reframe Lead', leadType: 'Reframe', firstInputs: ['e-6', 'e-7'], secondInputs: ['L-5', 'stmt-b-reduction'], dossierCardId: 'dc-5', interpretationChoices: [interpretationChoice('L-5-A', '형의 돈보다 형의 자리를 지키려 했다', '보호 서사로 재정의한다.'), interpretationChoice('L-5-B', '형을 지킨다는 명분으로 어머니 뜻까지 바꿨다', '월권 책임을 남긴다.')] },
]

const authorityPlacements = [
  { action: '원본 제출 명령', recommendedMoment: 'e-1 확인 직후', purpose: '유서 사본을 전체본으로 끌어올림' },
  { action: '원본 제출 명령', recommendedMoment: 'e-4 등장 직후', purpose: '공증사무실 스캔 보관본 원본 확보' },
  { action: '원본 제출 명령', recommendedMoment: 'e-6 또는 e-7 진입 전', purpose: '돈 흐름과 일기장 진본을 확정' },
  { action: '정확히 답변하십시오', recommendedMoment: 'B가 손댄 건 맞지만 이유는 말 못 한다 수준에 머물 때', purpose: '날짜, 숫자, 이유를 강제로 끌어냄' },
  { action: '분리심문', recommendedMoment: 'e-4 Original 직후 B', purpose: '형 앞에서 닫히는 B의 동기층을 먼저 열기' },
  { action: '분리심문', recommendedMoment: 'e-6 Established 직후 A', purpose: 'A의 공격적 프레임을 잠시 떼어 놓고 흔들림을 보기' },
  { action: '잠정 인정', recommendedMoment: 'e-4 인증 후', purpose: 'B가 60대 40 유서를 직접 제출한 사실을 기록' },
  { action: '잠정 인정', recommendedMoment: 'e-5 인증 후', purpose: '원본 유서는 90대 10이었다는 사실을 기록' },
  { action: '잠정 인정', recommendedMoment: 'e-6 인증 후', purpose: 'B가 20년간 어머니에게 생활비를 보냈다는 사실을 기록' },
  { action: '잠정 인정', recommendedMoment: 'e-7 Original 이후', purpose: '60대 40 감액 조작이 출생 비밀 보호와 연결된다는 사실을 기록' },
  { action: '선처 창구', recommendedMoment: 'dc-2, dc-4, dc-5 직후', purpose: 'B의 자발적 동기 고백을 유도' },
  { action: '발언 제지 / 기록 제외', recommendedMoment: 'A가 배다른 놈 프레임을 반복하거나 B가 너무 차갑게 사실만 던질 때', purpose: '공격적 프레임을 끊고 사실과 가설을 분리' },
  { action: '민감정보 봉인 해제', recommendedMoment: 'h-d4 진입 후 L-5가 완성됐지만 이유가 마지막 한 걸음 부족할 때', purpose: '치매 표현, 출생 비밀, 큰돈 정보의 공개 범위를 통제하며 final reframe을 완성' },
]

const runtimeCase = {
  caseId: RUNTIME_CASE_ID,
  sensitivityTags: ['medical_privacy', 'inheritance', 'family_secret', 'financial_support'],
  meta: {
    relationshipType: 'family',
    conflictSeed: 'TE-FamilyV301',
    variableModules: ['VM-family-v3-a', 'VM-family-v3-b'],
    twistModule: 'TW-family-v3-1',
    difficulty: 'hard',
    anchorTruth: ANCHOR_TRUTH,
    emotionalBait: '요양원 방문과 말년 유서 개입은 동생의 탐욕처럼 보이지만, 원본이 열릴수록 감액 조작과 오래된 보호가 동시에 드러난다.',
    resolutionDilemma: DILEMMA,
  },
  duo: {
    duoId: `duo-${CASE_ID}`,
    relationshipType: 'family',
    partyA: {
      id: 'a',
      name: '윤태성',
      age: 48,
      occupation: '주방가구 공장 대표',
      incomeBracket: 'mid',
      archetype: 'confrontational',
      speechStyle: '동생을 몰아붙이는 단정형 말투가 빠르고, 불리한 자료가 나오면 더 큰 목소리로 프레임을 반복한다.',
      pride: 8,
      fear: '유서 문제 뒤에 자신의 자리와 정통성을 흔드는 더 큰 비밀이 숨어 있다는 사실을 두려워한다.',
      blindSpot: '어머니를 모시고 살았다는 자기 기여가 모든 판단의 기준이라고 믿는다.',
      desireToBeSeen: '끝까지 집을 지킨 장남으로 인정받고 싶어 한다.',
      callTerms: { toOther: '정후야', angry: '윤정후!', toJudge: '제 동생' },
    },
    partyB: {
      id: 'b',
      name: '윤정후',
      age: 44,
      occupation: '자동차부품 가게 운영',
      incomeBracket: 'mid',
      archetype: 'affect_flattening',
      speechStyle: '사실을 짧게 말하고 감정이나 이유는 끝까지 늦게 꺼내며, 압박이 심해질수록 더 담담한 척한다.',
      pride: 6,
      fear: '형에게 출생 비밀과 오래된 지원 사실이 한꺼번에 터지면 형의 삶 전체가 무너질까 두려워한다.',
      blindSpot: '보호하려는 침묵이 결국 더 큰 왜곡을 만들었다는 점을 늦게 인정한다.',
      desireToBeSeen: '형을 깎아내린 동생이 아니라 끝까지 떠받친 사람으로 이해받고 싶어 한다.',
      callTerms: { toOther: '형', angry: '형!', toJudge: '제 형' },
    },
    socialGraph: [
      { id: 'w-1', slot: 'family_1', name: '최복순', relationTo: 'b', knowledgeScope: '말년 분위기와 B의 말투, 공증 전 긴장 흐름을 설명할 수 있다.', witnessedDirectly: true, bias: 'neutral', distortionRisk: 'careful', surfaceKnowledge: '전 요양보호사로서 d-1의 현장 분위기를 가장 구체적으로 기억한다.', relatedDisputeIds: ['d-1'], witnessProfile: { age: 61, occupation: '전 요양보호사', relationToA: '보호자 중 한 명으로 봤다.', relationToB: '말년 방문자로 자주 봤다.', sentimentToA: 5, sentimentToB: 5, speechStyle: '직접 본 장면은 또렷하게 말하지만 민감한 의료 표현은 조심한다.', addressJudge: '재판관님', addressA: '태성 씨', addressB: '정후 씨', hiddenAgenda: '의료·돌봄 정보 공개 범위를 신중히 지키고 싶어 한다.' } },
      { id: 'w-2', slot: 'family_2', name: '김영수', relationTo: 'b', knowledgeScope: '같은 날 두 버전 유서가 다시 들어온 흐름과 마지막 제출자가 B였다는 점을 확인할 수 있다.', witnessedDirectly: true, bias: 'neutral', distortionRisk: 'accurate', surfaceKnowledge: '공증사무실 직원으로서 d-2의 서류 흐름을 말해 준다.', relatedDisputeIds: ['d-2'], witnessProfile: { age: 57, occupation: '공증사무실 직원', relationToA: '서류 당사자 가족으로만 안다.', relationToB: '문서를 다시 가져온 사람으로 기억한다.', sentimentToA: 0, sentimentToB: 0, speechStyle: '동기는 모르지만 서류 순서와 시간은 또렷하게 말한다.', addressJudge: '재판관님', addressA: '태성 씨', addressB: '정후 씨', hiddenAgenda: '사무실 책임으로 비칠 수 있는 부분은 최소화하고 싶어 한다.' } },
      { id: 'w-3', slot: 'acquaintance_1', name: '박순애', relationTo: 'a', knowledgeScope: '어머니가 정후가 보내 준 돈으로 버틴다고 말한 적과 두 형제 사이 오래된 감정을 안다.', witnessedDirectly: true, bias: 'pro_b', distortionRisk: 'aged_memory', surfaceKnowledge: '오랜 친구로서 h-d3와 d-5의 감정 맥락을 이어 준다.', relatedDisputeIds: ['h-d3', 'd-5'], witnessProfile: { age: 69, occupation: '은퇴', relationToA: '어릴 때부터 본 집안의 장남이다.', relationToB: '어머니 걱정을 묵묵히 챙기던 동생으로 기억한다.', sentimentToA: 10, sentimentToB: 35, speechStyle: '날짜는 흐리지만 정황과 감정선은 분명하게 말한다.', addressJudge: '재판관님', addressA: '태성아', addressB: '정후야', hiddenAgenda: '어머니가 남긴 비밀이 함부로 소비되는 건 원치 않는다.' } },
    ],
  },
  context: { contextType: 'inheritance_secret_reframe', description: HOOK, emotionalPressure: 9, affects: 'both', triggerAmplifier: MID_TWIST, caseNumber: 'TE-FamilyV301', caseName: TITLE },
  disputes,
  evidence,
  evidenceCombinations: [
    { requires: ['e-1', 'e-2'], upgradesTo: 'hard', proves: ['d-1'] },
    { requires: ['e-1', 'e-4'], upgradesTo: 'hard', proves: ['d-2'] },
    { requires: ['e-4', 'e-5'], upgradesTo: 'hard', proves: ['d-2', 'h-d3'] },
    { requires: ['e-5', 'e-6'], upgradesTo: 'hard', proves: ['h-d3'] },
    { requires: ['e-6', 'e-7'], upgradesTo: 'hard', proves: ['h-d4', 'd-5'] },
  ],
  truthTable,
  lieConfigA,
  lieConfigB,
  solutions: {
    기록분리: ['감액 조작 사실과 감액 조작 동기를 분리해 기록한다.', '어머니 뜻과 형 보호라는 두 층의 서사를 따로 정리한다.'],
    금전정리: ['20년 지원과 사업 지원 사실을 공식기록으로 남기되 상속 판단과 분리한다.', '장기 지원 사실은 감사와 책임 문제를 동시에 남긴다.'],
    비밀관리: ['출생 비밀과 치매 표현은 필요한 범위에서만 봉인 해제한다.', '가족 정체성 붕괴를 막기 위한 보호 조치를 합의안에 포함한다.'],
  },
  activeLedgerEntries: ['ledger-1', 'ledger-2', 'ledger-3', 'ledger-4'],
  activeThirdParties: ['w-1', 'w-2', 'w-3'],
  baseEvidenceIds: ['e-1', 'e-2', 'e-3'],
  monetaryDisputeIds: ['h-d3'],
  combinationLab: {
    analysisPointsBase: 5,
    analysisPointRefundOnFirstHidden: 1,
    nodes: [
      evidenceNode('e-1', 'e-1 60대 40 유서 사본', ['d-1', 'd-2']),
      evidenceNode('e-2', 'e-2 요양원 방문기록', ['d-1']),
      evidenceNode('e-3', 'e-3 전 요양보호사 음성증언', ['d-1', 'd-5']),
      evidenceNode('e-4', 'e-4 공증사무실 스캔 보관본', ['d-2', 'h-d3']),
      evidenceNode('e-5', 'e-5 원본 유서 90대 10', ['d-2', 'h-d3']),
      evidenceNode('e-6', 'e-6 20년 송금 내역 묶음', ['h-d3', 'h-d4', 'd-5']),
      evidenceNode('e-7', 'e-7 어머니 일기장 사진', ['h-d4', 'd-5']),
      statementNode('stmt-b-pride', 'B의 발언 "형 자존심이 무너질까 봐"', ['h-d3']),
      statementNode('stmt-b-collapse', 'B의 발언 "형이 알면 무너질까 봐"', ['h-d3', 'h-d4']),
      statementNode('stmt-b-reduction', 'B의 발언 "그래서 60으로 낮췄습니다"', ['d-2', 'h-d4']),
      witnessAngleNode('w-3-angle', 'w-3 박순애 증언 축', ['h-d3', 'd-5']),
      derivedNode('L-1', 'L-1 Timeline Lead', ['d-1'], ['e-1', 'e-2']),
      derivedNode('L-2', 'L-2 Authenticity Lead', ['d-2'], ['e-1', 'e-4', 'e-5']),
      derivedNode('L-3', 'L-3 Beneficiary Lead', ['h-d3'], ['e-5', 'e-6']),
      derivedNode('L-4', 'L-4 Context Lead', ['h-d3', 'd-5'], ['e-6']),
      derivedNode('L-5', 'L-5 Reframe Lead', ['h-d4'], ['e-6', 'e-7']),
      derivedNode('dc-1', 'dc-1 마지막 몇 달', ['d-1'], ['e-1', 'e-2', 'e-3']),
      derivedNode('dc-2', 'dc-2 줄인 조작', ['d-2'], ['e-1', 'e-4', 'e-5']),
      derivedNode('dc-3', 'dc-3 어머니 돈인 줄 알았던 돈', ['h-d3'], ['e-5', 'e-6']),
      derivedNode('dc-4', 'dc-4 20년 침묵', ['h-d3', 'd-5'], ['e-6', 'e-7']),
      derivedNode('dc-5', 'dc-5 60대 40의 진짜 이유', ['h-d4'], ['e-6', 'e-7']),
    ],
    outputs: leadLines.map((lead) => ({ id: lead.id, label: `${lead.id} ${lead.name}`, summary: `${lead.leadType} 리드`, nodeType: 'derived_note', noteText: lead.name, judgeHint: `후속 카드 ${lead.dossierCardId}와 연결된다.`, effects: [{ kind: 'unlock_note', unlockNodeId: lead.id }] })).concat([
      { id: 'dc-1', label: 'dc-1 마지막 몇 달', summary: '말년 접근과 유서 개입을 압박하는 카드', nodeType: 'derived_note', noteText: '마지막 몇 달', effects: [{ kind: 'unlock_note', unlockNodeId: 'dc-1' }] },
      { id: 'dc-2', label: 'dc-2 줄인 조작', summary: '감액 조작의 이유를 묻는 카드', nodeType: 'derived_note', noteText: '줄인 조작', effects: [{ kind: 'unlock_note', unlockNodeId: 'dc-2' }] },
      { id: 'dc-3', label: 'dc-3 어머니 돈인 줄 알았던 돈', summary: '90대 10의 근거와 지원 흐름을 묻는 카드', nodeType: 'derived_note', noteText: '어머니 돈인 줄 알았던 돈', effects: [{ kind: 'unlock_note', unlockNodeId: 'dc-3' }, { kind: 'unlock_dispute', unlockNodeId: 'h-d3' }] },
      { id: 'dc-4', label: 'dc-4 20년 침묵', summary: '왜 끝까지 말하지 않았는지 묻는 카드', nodeType: 'derived_note', noteText: '20년 침묵', effects: [{ kind: 'unlock_note', unlockNodeId: 'dc-4' }] },
      { id: 'dc-5', label: 'dc-5 60대 40의 진짜 이유', summary: '출생 비밀 보호와 감액 조작을 연결하는 카드', nodeType: 'derived_note', noteText: '60대 40의 진짜 이유', effects: [{ kind: 'unlock_note', unlockNodeId: 'dc-5' }, { kind: 'unlock_dispute', unlockNodeId: 'h-d4' }] },
    ]),
    recipes: [
      { id: 'lead-1', inputs: ['e-1', 'e-2'], cost: 1, discoveryText: '말년 접근의 시간축이 겹친다.', outputId: 'L-1' },
      { id: 'dossier-1', inputs: ['L-1', 'e-3'], cost: 1, discoveryText: '마지막 몇 달의 압박 카드가 열린다.', outputId: 'dc-1' },
      { id: 'lead-2', inputs: ['e-1', 'e-4'], cost: 1, discoveryText: '최종본이 누구 손을 거쳤는지 묻는 리드가 생긴다.', outputId: 'L-2' },
      { id: 'dossier-2', inputs: ['L-2', 'e-5'], cost: 1, discoveryText: '감액 조작을 묻는 카드가 열린다.', outputId: 'dc-2' },
      { id: 'lead-3', inputs: ['e-5', 'e-6'], cost: 1, discoveryText: '90대 10의 근거를 묻는 리드가 생긴다.', outputId: 'L-3' },
      { id: 'dossier-3', inputs: ['L-3', 'stmt-b-pride'], cost: 1, discoveryText: '오랫동안 숨긴 돈의 출처를 묻는 카드가 완성된다.', outputId: 'dc-3' },
      { id: 'lead-4', inputs: ['e-6', 'stmt-b-collapse'], cost: 1, discoveryText: '왜 끝까지 말하지 않았는지 묻는 맥락 리드가 생긴다.', outputId: 'L-4' },
      { id: 'dossier-4', inputs: ['L-4', 'w-3-angle'], cost: 1, discoveryText: '20년 침묵을 직접 겨누는 카드가 열린다.', outputId: 'dc-4' },
      { id: 'lead-5', inputs: ['e-6', 'e-7'], cost: 1, discoveryText: '유산 문제를 출생 비밀 문제로 뒤집는 리드가 생긴다.', outputId: 'L-5' },
      { id: 'dossier-5', inputs: ['L-5', 'stmt-b-reduction'], cost: 1, discoveryText: '60대 40의 진짜 이유를 묻는 카드가 완성된다.', outputId: 'dc-5' },
    ],
  },
  v3Design: {
    evidenceAxisLegend: { depthStages: evidenceDepthLegend, trustStates: evidenceTrustLegend },
    hiddenDisputes: disputes.filter((item) => item.hidden).map((item) => ({ id: item.id, name: item.name, unlockPlan: item.v3UnlockPlan })),
    leadLines,
    authorityPlacements,
    sensitiveSealTargets: [
      { evidenceId: 'e-3', targets: ['치매 관련 직접 표현', '요양원 내부 개인 정보'], risk: '돌봄 정보가 너무 일찍 열리면 인도성 점수와 보호사 프라이버시 이슈가 흔들린다.' },
      { evidenceId: 'e-6', targets: ['정확한 계좌번호', '사업 실패 당시 큰돈 액수'], risk: '정확한 금전 정보가 너무 빨리 열리면 상속 싸움만 과열될 수 있다.' },
      { evidenceId: 'e-7', targets: ['A의 출생 비밀 직접 문장', '혈연 여부 표현', '어머니의 치매 전 개인 기록 일부'], risk: '핵심 진실을 여는 동시에 A의 삶 전체를 붕괴시킬 수 있다.' },
    ],
    officialRecordRecommendations: [
      'B는 말년의 어머니 곁에 자주 있었고 유서 문제에 실제로 개입했다.',
      'B는 60대 40 유서를 직접 만들었다.',
      '원래 유서는 90대 10이었다.',
      'B는 20년간 어머니를 돈으로 도왔고, A 사업이 무너질 때도 큰돈을 보탰다.',
      '60대 40 조작의 진짜 이유에는 A의 출생 비밀 보호가 얽혀 있다.',
    ],
  },
}

const v3 = {
  caseId: CASE_ID,
  dossierCards: [
    { id: 'dc-1', name: '마지막 몇 달', description: '말년 접근과 유서 개입을 시간축으로 압박하는 카드다.', evidenceIds: ['e-1', 'e-2', 'e-3'], relatedDisputes: ['d-1'], subjectParty: 'b', leadId: 'L-1', successConditionSummary: ['L-1 완성', 'B에게 동기탐색 또는 정확히 답변하십시오 사용'], successEffects: ['d-1이 강하게 전진', 'B의 담담함 뒤 긴장과 서두름이 처음 드러남'], challenges: [{ targetParty: 'b', questions: [dossierQuestion({ id: 'dc-1.b.q1', text: '형이 보기엔 당신이 말년을 파고든 것처럼 보입니다. 실제로 그 몇 달 동안 어머니에게 무엇을 반복해서 말했습니까?', attackVector: 'context', requiredLieState: 'S2', revealAtom: `${CASE_ID}:b:d-1:S3:0`, lockedHint: 'L-1이 완성되고 e-3가 충분히 열려야 질문이 보인다.' })] }] },
    { id: 'dc-2', name: '줄인 조작', description: '감액 조작의 이유를 정면으로 묻는 카드다.', evidenceIds: ['e-1', 'e-4', 'e-5'], relatedDisputes: ['d-2'], subjectParty: 'b', leadId: 'L-2', successConditionSummary: ['L-2 완성', 'e-5가 Original 이상'], successEffects: ['d-2가 자백 직전까지 진전', '왜 자기 몫을 줄였는지 질문이 고정됨'], challenges: [{ targetParty: 'b', questions: [dossierQuestion({ id: 'dc-2.b.q1', text: '유서를 고친 건 맞는데, 왜 자기 몫을 늘리는 쪽이 아니라 줄이는 쪽으로 바꿨습니까?', attackVector: 'authenticity', requiredLieState: 'S3', revealAtom: `${CASE_ID}:b:d-2:S4:0`, lockedHint: '공증사무실 보관본과 90대 10 원본이 모두 열려야 보인다.' })] }] },
    { id: 'dc-3', name: '어머니 돈인 줄 알았던 돈', description: '90대 10의 금전 근거와 숨은 지원 서사를 묻는 카드다.', evidenceIds: ['e-5', 'e-6'], relatedDisputes: ['h-d3'], subjectParty: 'b', leadId: 'L-3', successConditionSummary: ['L-3 완성', 'e-6이 Original 이상'], successEffects: ['h-d3가 공식 쟁점으로 고정', 'A의 기존 서사가 크게 흔들림'], challenges: [{ targetParty: 'b', questions: [dossierQuestion({ id: 'dc-3.b.q1', text: '형이 평생 어머니 돈인 줄 알고 받았던 그 돈, 사실은 당신 돈이었습니까?', attackVector: 'authenticity', requiredLieState: 'S2', revealAtom: `${CASE_ID}:b:h-d3:S3:0`, lockedHint: 'e-6이 원본 수준으로 열리고 B의 회피가 한 번 꺾여야 열린다.' })] }] },
    { id: 'dc-4', name: '20년 침묵', description: '오랫동안 도우면서도 왜 끝까지 말하지 않았는지를 묻는 카드다.', evidenceIds: ['e-6', 'e-7'], relatedDisputes: ['h-d3', 'd-5'], subjectParty: 'b', leadId: 'L-4', successConditionSummary: ['L-4 완성', 'B에게 공감접근 누적 2회 이상'], successEffects: ['B의 affect_flattening이 깨지기 시작함', 'd-5의 왜 숨겼나 칸이 강하게 채워짐'], challenges: [{ targetParty: 'b', questions: [dossierQuestion({ id: 'dc-4.b.q1', text: '20년을 도왔으면서 왜 단 한 번도 형에게 말하지 않았습니까?', attackVector: 'context', requiredLieState: 'S3', revealAtom: `${CASE_ID}:b:h-d3:S4:0`, lockedHint: '지원 흐름과 B의 감정 고백 축이 함께 붙어야 열린다.' })] }] },
    { id: 'dc-5', name: '60대 40의 진짜 이유', description: '유산 문제를 출생 비밀 보호 문제로 재정의하는 최종 카드다.', evidenceIds: ['e-6', 'e-7'], relatedDisputes: ['h-d4'], subjectParty: 'b', leadId: 'L-5', successConditionSummary: ['L-5 완성', 'e-7이 Original 이상'], successEffects: ['h-d4가 완성', '출생 비밀 보호와 감액 조작의 연결이 자백 수준으로 열림'], challenges: [{ targetParty: 'b', questions: [dossierQuestion({ id: 'dc-5.b.q1', text: '60대 40으로 바꾸지 않았다면, 형은 돈 말고 무엇을 잃게 됐습니까?', attackVector: 'context', requiredLieState: 'S3', revealAtom: `${CASE_ID}:b:h-d4:S3:0`, lockedHint: 'L-5와 e-7 원본이 모두 열려야 질문이 보인다.' })] }] },
  ],
  stateUnlockAtoms: {
    a: {
      'd-5': {
        S3: [atom(`${CASE_ID}:a:d-5:S3:0`, 'S3', '윤태성은 자신이 진실을 모른 채 정후를 악의로만 읽어 왔다는 사실을 처음 받아들이기 시작한다.', ['thread-g', CASE_ID, 'd-5'])],
      },
    },
    b: {
      'd-1': {
        S3: [atom(`${CASE_ID}:b:d-1:S3:0`, 'S3', '윤정후는 말년 몇 달 동안 어머니를 설득하고 서류를 서두르게 한 건 맞다고 인정한다.', ['thread-g', CASE_ID, 'd-1', 'dc-1'])],
      },
      'd-2': {
        S4: [atom(`${CASE_ID}:b:d-2:S4:0`, 'S4', '윤정후는 더 가지려고가 아니라 줄이려고 60대 40으로 바꿨다고 분명히 말한다.', ['thread-g', CASE_ID, 'd-2', 'dc-2'])],
      },
      'h-d3': {
        S3: [atom(`${CASE_ID}:b:h-d3:S3:0`, 'S3', '윤정후는 형이 어머니 돈인 줄 알고 받아 온 흐름 상당수가 사실은 자신의 돈이었다고 인정한다.', ['thread-g', CASE_ID, 'h-d3', 'dc-3'])],
        S4: [atom(`${CASE_ID}:b:h-d3:S4:0`, 'S4', '윤정후는 형 자존심이 무너질까 봐 20년 지원 사실을 끝까지 말하지 못했다고 인정한다.', ['thread-g', CASE_ID, 'h-d3', 'dc-4'])],
      },
      'h-d4': {
        S3: [atom(`${CASE_ID}:b:h-d4:S3:0`, 'S3', '윤정후는 형의 출생 비밀이 터지는 걸 막으려고 90을 60으로 낮췄다고 인정한다.', ['thread-g', CASE_ID, 'h-d4', 'dc-5'])],
      },
    },
  },
  evidenceProgressions: evidence.map((node) => ({ evidenceId: node.id, name: node.name, depthStages: node.v3DepthPlan, trustStates: node.v3TrustStates, sealTargets: node.v3SealTargets || [] })),
  leadLines,
  authorityPlacements,
  hiddenDisputePlans: disputes.filter((item) => item.hidden).map((item) => ({ disputeId: item.id, name: item.name, unlockPlan: item.v3UnlockPlan })),
  sensitiveSealTargets: [
    { evidenceId: 'e-3', label: '전 요양보호사 음성증언', targets: ['치매 관련 직접 표현', '요양원 내부 개인 정보'], recommendedTiming: ['d-1을 더 밀어붙여야 하지만 의료 정보는 아직 과하다고 느껴질 때'], risks: ['인도성 점수 하락', '제3자 프라이버시 침해'] },
    { evidenceId: 'e-6', label: '20년 송금 내역 묶음', targets: ['정확한 계좌번호', '사업 실패 당시 큰돈 액수'], recommendedTiming: ['h-d3는 열렸지만 정확한 돈 흐름이 마지막 한 걸음 부족할 때'], risks: ['상속 분쟁 과열', '가족 간 금전감정 증폭'] },
    { evidenceId: 'e-7', label: '어머니 일기장 사진', targets: ['A의 출생 비밀 직접 문장', '혈연 여부 표현', '어머니의 치매 전 개인 기록 일부'], recommendedTiming: ['h-d4 진입 후 L-5가 완성됐지만 이유가 마지막 한 걸음 부족할 때', 'dc-5 직전'], risks: ['공정성은 오르지만 인도성 점수 크게 하락', 'A의 즉각적 감정 폭발 가능'] },
  ],
  officialRecordRecommendations: [
    'B는 말년의 어머니 곁에 자주 있었고 유서 문제에 실제로 개입했다.',
    'B는 60대 40 유서를 직접 만들었다.',
    '원래 유서는 90대 10이었다.',
    'B는 20년간 어머니를 돈으로 도왔고, A 사업이 무너질 때도 큰돈을 보탰다.',
    '60대 40 조작의 진짜 이유에는 A의 출생 비밀 보호가 얽혀 있다.',
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
