#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const {
  readJson,
  ensureDir,
  findFileRecursiveByName,
  cleanSentence,
  sentence,
  paragraph,
  topic,
  object,
  truthLevelFromState,
  stanceFromState,
  deriveSubjectRole,
} = require('./lib/scripted-korean-utils.cjs')

const ROOT = path.join(__dirname, '..')
const CASE_ID = 'headline-02'
const CASE_PATH = path.join(ROOT, 'src', 'data', 'cases', 'generated', `${CASE_ID}.json`)
const OUT_PATH = path.join(ROOT, 'src', 'data', 'scriptedText', `${CASE_ID}.json`)

const STATES = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5']
const BANDS = ['early', 'mid', 'late']
const QTYPES = ['fact_pursuit', 'motive_search', 'empathy_approach']
const WITNESS_DEPTHS = ['vague', 'partial', 'full']
const RESULT_CLASSES = ['a_primary_fault', 'b_primary_fault', 'shared_fault', 'protective_resolution', 'procedural_caution']
const SYSTEM_KEYS = [
  { context: 'interrogation', eventType: 'repeat_warning' },
  { context: 'evidence', eventType: 'new_unlock' },
  { context: 'evidence', eventType: 'trap_notice' },
  { context: 'dossier', eventType: 'challenge_cleared' },
  { context: 'witness', eventType: 'credibility_shift' },
  { context: 'verdict', eventType: 'profile_update' },
]

const runtimeCase = readJson(CASE_PATH)
const v3Path = findFileRecursiveByName(path.join(ROOT, 'docs', 'ref'), `${CASE_ID}-v3-game-loop-data.json`)
if (!v3Path) throw new Error(`missing file: ${CASE_ID}-v3-game-loop-data.json`)
const v3 = readJson(v3Path)

const PARTY_LABELS = {
  a: { self: '아티스트 측', other: '현장 책임자 쪽' },
  b: { self: '현장 책임자 측', other: '아티스트 쪽' },
}

const DISPUTE_FRAMES = {
  'd-1': {
    title: '비공개 사진 단서와 외부 힌트의 결합',
    core: '비공개 사진 단서와 외부 힌트가 같은 시점에 겹치며 접근 위험이 커졌습니다.',
    fact: '한쪽의 단독 행동만으로는 접근 경로를 설명할 수 없습니다.',
    motive: '유출 경로를 확인하려는 조급함과 현장 혼선을 줄이려는 계산이 동시에 작동했습니다.',
    empathy: '공포와 현장 압박을 분리해 읽어야 책임 비율이 왜곡되지 않습니다.',
    aOwn: '저는 차단보다 확인을 먼저 택한 조급함이 있었습니다.',
    bOwn: '저는 비공식 힌트의 위험을 가볍게 본 잘못이 있었습니다.',
    aOther: '현장 책임자 쪽은 비공개 이동 정보를 너무 느슨하게 다뤘습니다.',
    bOther: '아티스트 쪽의 직접 확인 시도도 사건을 키운 요인이었습니다.',
    aProtect: '보호 필요성과 제 과실을 함께 보십시오.',
    bProtect: '관리 책임과 상대의 직접 접촉을 함께 보십시오.',
  },
  'd-2': {
    title: '팬 커뮤니티와의 비공식 정보 거래',
    core: '팬 커뮤니티 운영자와의 비공식 소통이 주소가 아니더라도 실질적 힌트로 기능했습니다.',
    fact: '차량 교체 시점과 대기 범위만으로도 충분한 단서가 됩니다.',
    motive: '우호적 여론과 현장 편의를 얻으려는 계산이 개입됐습니다.',
    empathy: '관행이라는 말로 위험 감수의 책임까지 지울 수는 없습니다.',
    aOwn: '저는 의심만 품고 정식 문제 제기를 미룬 책임이 있습니다.',
    bOwn: '저는 주소가 아니었다는 말로 힌트 제공을 과소평가했습니다.',
    aOther: '현장 책임자 쪽은 관행을 이유로 금지선을 넘었습니다.',
    bOther: '아티스트 쪽도 의심을 알고 있었지만 즉시 공식 문제 제기를 하지 않았습니다.',
    aProtect: '정식 절차를 미룬 제 잘못과 거래 구조의 위험을 분리해 보십시오.',
    bProtect: '관행과 금지선은 같은 말이 아니라는 점을 봐 주십시오.',
  },
  'd-3': {
    title: '문제 계정과의 직접 접촉',
    core: '문제 계정과의 직접 접촉은 확인 목적이었더라도 통한다는 신호로 읽혔습니다.',
    fact: '차단보다 확인을 먼저 택한 흔적이 기록으로 남습니다.',
    motive: '공포를 통제 가능한 정보로 바꾸려는 선택이 결과적으로 역효과를 냈습니다.',
    empathy: '두려움 속 판단 착오와 고의적 협조는 엄밀히 구분해야 합니다.',
    aOwn: '저는 누가 새는지 확인하려다 경계선을 넘었습니다.',
    bOwn: '저는 그 위험을 알고도 강한 차단 절차를 먼저 세우지 못했습니다.',
    aOther: '현장 책임자 쪽은 위험을 알고도 보호선을 단단히 세우지 못했습니다.',
    bOther: '아티스트 쪽은 확인 목적이라는 말로 직접 접촉의 결과를 줄여 말할 수 없습니다.',
    aProtect: '공포 속 실수와 고의적 공모를 같은 선에 놓지는 말아 주십시오.',
    bProtect: '확인 목적이었더라도 직접 접촉의 결과는 별도로 보셔야 합니다.',
  },
  'd-4': {
    title: '보안 사고 축소 보고와 지연 대응',
    core: '초기 보안 보고가 축소되고 공식 신고가 늦어지며 대응선이 무너졌습니다.',
    fact: '보호 명분과 별개로 축소 보고와 지연 대응은 기록으로 남습니다.',
    motive: '컴백 일정과 책임 회피가 판단을 누른 면이 있었습니다.',
    empathy: '불안을 낮추려는 의도와 보고 축소의 책임은 분리해서 봐야 합니다.',
    aOwn: '저는 조용한 정리를 원한다는 말로 즉시 신고를 밀어붙이지 못했습니다.',
    bOwn: '저는 보호를 명분으로 보고와 신고를 늦춘 책임이 있습니다.',
    aOther: '현장 책임자 쪽은 공식 대응보다 일정 관리와 자기 방어를 앞세웠습니다.',
    bOther: '아티스트 쪽도 초기에 비공개 정리를 원하며 대응을 늦추는 신호를 보냈습니다.',
    aProtect: '보호 의도와 축소 보고의 무게를 따로 재십시오.',
    bProtect: '상대의 불안정과 제 지연 대응을 분리해서 보셔야 합니다.',
  },
}

const EVIDENCE_FRAMES = {
  'e-1': {
    direct: '셀카 원본 파일과 반사면 확대 캡처는 숙소 단서를 실제로 남깁니다.',
    early: '셀카 원본 파일과 반사면 확대 캡처만으로 단독 결론을 서두를 수는 없습니다.',
    mid: '셀카 원본 파일과 반사면 확대 캡처는 조급한 확인 시도를 바로 겨눕니다.',
    late: '셀카 원본 파일과 반사면 확대 캡처 앞에서는 단서 노출 책임을 더 미루기 어렵습니다.',
  },
  'e-2': {
    direct: '로비 CCTV, 차량 게이트 로그, 새벽 경호 호출 기록은 접근 시도와 귀가 패턴 인지가 맞물린 시점을 고정합니다.',
    early: '로비 CCTV, 차량 게이트 로그, 새벽 경호 호출 기록만으로 주체를 바로 단정할 수는 없습니다.',
    mid: '로비 CCTV, 차량 게이트 로그, 새벽 경호 호출 기록은 접근 위험이 우연이 아니었음을 보여 줍니다.',
    late: '로비 CCTV, 차량 게이트 로그, 새벽 경호 호출 기록은 이미 누적된 위험을 부인하기 어렵게 만듭니다.',
  },
  'e-3': {
    direct: '매니저-팬사이트 운영자 DM과 대기 동선 메모는 주소 전송이 아니어도 실질적 힌트 제공이 있었음을 보여 줍니다.',
    early: '매니저-팬사이트 운영자 DM과 대기 동선 메모를 곧바로 범의로 읽을 단계는 아닙니다.',
    mid: '매니저-팬사이트 운영자 DM과 대기 동선 메모는 비공식 거래의 선을 드러냅니다.',
    late: '매니저-팬사이트 운영자 DM과 대기 동선 메모 앞에서는 관행이라는 말이 더 버티기 어렵습니다.',
  },
  'e-4': {
    direct: '비공개 모니터링 계정 대화와 로그인 기록은 차단보다 확인을 먼저 택한 흔적을 남깁니다.',
    early: '비공개 모니터링 계정 대화와 로그인 기록만으로 의도 전체를 단정할 수는 없습니다.',
    mid: '비공개 모니터링 계정 대화와 로그인 기록은 직접 접촉의 무게를 숨기기 어렵게 만듭니다.',
    late: '비공개 모니터링 계정 대화와 로그인 기록은 조급한 확인 시도의 책임을 정면으로 겨눕니다.',
  },
  'e-5': {
    direct: '보안업체 1차 보고서와 수정된 회사 내부 메모는 축소 보고 흔적을 나란히 보여 줍니다.',
    early: '보안업체 1차 보고서와 수정된 회사 내부 메모만으로 의도를 단정할 수는 없습니다.',
    mid: '보안업체 1차 보고서와 수정된 회사 내부 메모는 보고선이 어디서 잘렸는지 드러냅니다.',
    late: '보안업체 1차 보고서와 수정된 회사 내부 메모 앞에서는 지연 대응 책임을 숨기기 어렵습니다.',
  },
  'e-6': {
    direct: '팬 커뮤니티 게시물 타임라인과 조합 게시 캡처는 여러 조각이 한 흐름으로 묶였음을 보여 줍니다.',
    early: '팬 커뮤니티 게시물 타임라인과 조합 게시 캡처만으로 한쪽 단독 책임을 말할 단계는 아닙니다.',
    mid: '팬 커뮤니티 게시물 타임라인과 조합 게시 캡처는 결합 구조를 더 분명히 드러냅니다.',
    late: '팬 커뮤니티 게시물 타임라인과 조합 게시 캡처는 양쪽 실수가 어떻게 합쳐졌는지 분명히 보여 줍니다.',
  },
}

const AFTERMATH_TEXTS = {
  a_primary_fault: [
    '재판관은 아티스트 쪽의 직접 접촉과 조급한 확인 시도를 더 무겁게 봅니다. 피해자성은 인정되더라도 직접 신호를 보낸 책임까지 사라지지는 않는다는 정리입니다.',
    '이번 결론은 공포 속 판단 착오를 참작하되, 차단보다 추적을 먼저 택한 선택을 핵심 책임으로 적시합니다. 다만 보호 조치는 별도로 우선되어야 한다는 선을 남깁니다.',
  ],
  b_primary_fault: [
    '재판관은 현장 책임자 측의 비공식 정보 거래와 축소 보고를 더 큰 구조 책임으로 봅니다. 내부 유출과 지연 대응이 실제 위험을 키웠다는 정리입니다.',
    '이번 결론은 관행과 보호 논리를 방패로 삼아 금지선을 넘은 대응에 무게를 둡니다. 재발 방지를 위해 공개 시정과 내부 징계가 함께 요구됩니다.',
  ],
  shared_fault: [
    '재판관은 양측 모두 위험을 키운 판단을 했다고 봅니다. 직접 접촉과 비공식 힌트 제공이 결합되며 사건이 폭발했다는 정리입니다.',
    '이번 결론은 누구 한쪽만의 악의보다 서로 다른 잘못이 같은 생태계 안에서 맞물린 결과에 가깝습니다. 책임도 분리하되 동시에 기록됩니다.',
  ],
  protective_resolution: [
    '재판관은 무엇보다 실제 스토킹 피해 방지를 먼저 둡니다. 책임 분리는 하되 공개 범위와 2차 유포 차단을 더 엄격하게 묶는 결론입니다.',
    '이번 결론은 보호와 회복을 우선하면서도 구조 책임을 내부 조치와 제한 공개로 정리하는 방향에 가깝습니다. 추가 노출은 최소화됩니다.',
  ],
  procedural_caution: [
    '재판관은 사실 자체만큼이나 대응 절차가 무너진 점을 중시합니다. 개인 판단, 비공식 거래, 축소 보고가 모두 절차 붕괴의 일부였다는 정리입니다.',
    '이번 결론은 누구를 더 미워할지보다 같은 사건이 다시 생기지 않게 어떤 공식 대응선을 세울지에 초점을 둡니다. 이후 절차 설계가 함께 요구됩니다.',
  ],
}

const SYSTEM_TEXTS = {
  'interrogation|repeat_warning': [
    '같은 축의 질문이 반복되고 있습니다. 사실, 동기, 감정 가운데 다른 각도로 전환해 주십시오.',
    '반복 질문 경고입니다. 지금부터는 같은 장면을 되묻기보다 빠진 맥락을 겨냥해 주십시오.',
  ],
  'evidence|new_unlock': [
    '새 조사 결과가 열렸습니다. 이제 같은 자료라도 출처와 전후 맥락을 함께 읽어 주십시오.',
    '증거 해석 폭이 넓어졌습니다. 방금 열린 자료는 책임 비율과 공개 범위를 동시에 흔듭니다.',
  ],
  'evidence|trap_notice': [
    '이 자료는 표면만 보면 함정이 됩니다. 장면보다 취득 경위와 결합 구조를 먼저 확인해 주십시오.',
    '주의가 필요한 증거입니다. 한 조각만 보고 결론을 내리면 실제 책임 배분이 왜곡될 수 있습니다.',
  ],
  'dossier|challenge_cleared': [
    '카드 질문이 정리되었습니다. 차단된 공격 벡터와 새로 열린 사실 조각이 다음 심문에 반영됩니다.',
    '도시어 카드가 성공적으로 처리되었습니다. 이제 상대가 쓰기 어려워진 변명 축이 생겼습니다.',
  ],
  'witness|credibility_shift': [
    '증인 신뢰도가 갱신되었습니다. 같은 말이라도 지금부터는 무게가 다르게 계산됩니다.',
    '증언 해석 기준이 바뀌었습니다. 관찰과 추정을 더 엄격히 나눠 읽어 주십시오.',
  ],
  'verdict|profile_update': [
    '이번 판단이 재판관 프로필에 반영됩니다. 사실, 절차, 보호 중 어디에 무게를 두었는지가 기록됩니다.',
    '판결 성향이 갱신됩니다. 다음 사건에서는 지금의 책임 분배 습관이 더 선명하게 드러납니다.',
  ],
}

function focusLead(qtype) {
  if (qtype === 'fact_pursuit') return '기록과 시간 순서부터 보십시오'
  if (qtype === 'motive_search') return '선택의 동기부터 분리해 보십시오'
  return '공포와 조급함을 분리해 읽어 주십시오'
}

function stateLead(party, state) {
  const byParty = {
    a: {
      S0: [
        '재판관님, 이 단계에서 제 쪽 과실을 먼저 인정하지는 않겠습니다',
        '재판관님, 지금 바로 제 쪽 책임으로 접을 사안은 아닙니다',
        '재판관님, 아직 제 잘못을 단정할 단계는 아니라고 봅니다',
        '재판관님, 우선은 제 쪽 책임부터 확정하는 순서에 동의하기 어렵습니다',
        '재판관님, 지금 답변에서 제 과실을 먼저 꺼내지는 않겠습니다',
      ],
      S1: [
        '재판관님, 제 대응이 성급했다는 비판은 알지만 그렇게 단순한 사안은 아닙니다',
        '재판관님, 제 쪽 실수만으로 정리하면 빠지는 맥락이 많습니다',
        '재판관님, 일부 오해를 부른 점은 있어도 단독 책임으로 접기는 어렵습니다',
        '재판관님, 비판을 피하겠다는 뜻은 아니지만 구조를 먼저 보셔야 합니다',
        '재판관님, 제 쪽 설명이 부족했다는 점과 전체 책임은 구분해 주십시오',
      ],
      S2: [
        '재판관님, 공포 속에서 차단보다 확인을 앞세운 판단은 제 몫입니다',
        '재판관님, 제 선택이 사건을 어렵게 만든 부분은 인정합니다',
        '재판관님, 그 시점의 조급함이 제 판단을 흐린 점은 부인하지 않겠습니다',
        '재판관님, 제 대응이 더 나았어야 한다는 지적은 받아들이겠습니다',
        '재판관님, 적어도 제 쪽에서 선을 흐린 판단이 있었음은 인정합니다',
      ],
      S3: [
        '재판관님, 제 실수가 있더라도 현장 책임자 쪽 관리 부실이 더 앞선 원인입니다',
        '재판관님, 제 몫이 없다고는 하지 않겠지만 상대의 관리 책임이 더 큽니다',
        '재판관님, 제가 조급했던 것과 별개로 상대의 대응선 붕괴가 먼저였습니다',
        '재판관님, 제 판단은 실수였지만 판을 키운 구조 책임은 상대가 더 큽니다',
        '재판관님, 제 잘못을 지우려는 것이 아니라 상대의 선 넘은 대응을 함께 보자는 뜻입니다',
      ],
      S4: [
        '재판관님, 그때는 실제 공포가 커서 판단이 흔들렸습니다',
        '재판관님, 그 시점의 두려움이 제 선택을 거칠게 만들었습니다',
        '재판관님, 저는 통제감을 되찾고 싶다는 마음에 무리한 선택을 했습니다',
        '재판관님, 감정이 앞선 판단이었다는 점은 숨기지 않겠습니다',
        '재판관님, 그 상황에서는 침착함보다 두려움이 먼저 움직였습니다',
      ],
      S5: [
        '재판관님, 제 조급한 확인 시도가 사건을 키운 점은 피하지 않겠습니다',
        '재판관님, 제가 직접 신호를 보낸 선택이 잘못이었다는 점을 인정합니다',
        '재판관님, 제 확인 욕구가 보호보다 앞섰던 순간이 있었습니다',
        '재판관님, 핵심 책임 중 제 몫을 더는 돌려 말하지 않겠습니다',
        '재판관님, 제가 선을 넘은 판단을 했다는 점은 분명히 인정합니다',
      ],
    },
    b: {
      S0: [
        '재판관님, 모든 책임을 제 쪽 비공식 대응으로 돌리는 데에는 동의하기 어렵습니다',
        '재판관님, 지금 단계에서 제 잘못을 먼저 확정하는 데에는 반대합니다',
        '재판관님, 제 대응만 떼어 단독 원인으로 보는 해석은 받아들이기 어렵습니다',
        '재판관님, 아직 제 쪽 책임부터 고정할 단계는 아니라고 봅니다',
        '재판관님, 지금 답변에서는 제 과실을 먼저 인정하지 않겠습니다',
      ],
      S1: [
        '재판관님, 현장 관행이 잘못 비쳤다는 지적은 알지만 단독 원인으로 볼 일은 아닙니다',
        '재판관님, 제 대응이 거칠었다는 비판은 이해하지만 전체 구조를 함께 보셔야 합니다',
        '재판관님, 제 쪽 판단이 불편하게 보일 수 있어도 사건은 그것만으로 닫히지 않습니다',
        '재판관님, 일부 선을 흐린 점은 있어도 제 쪽 단독 책임으로 접기는 어렵습니다',
        '재판관님, 제 설명이 부족했던 것과 전체 원인은 구분해 주십시오',
      ],
      S2: [
        '재판관님, 비공식 소통이 선을 흐린 점은 인정합니다',
        '재판관님, 제 대응 방식이 위험을 키운 부분은 받아들이겠습니다',
        '재판관님, 제 판단이 더 엄격했어야 한다는 점은 인정합니다',
        '재판관님, 적어도 보고와 소통의 선을 제가 더 분명히 그었어야 했습니다',
        '재판관님, 현장 관리 명분으로 넘지 말아야 할 선이 있었음을 인정합니다',
      ],
      S3: [
        '재판관님, 제 대응이 거칠었더라도 직접 접촉과 확인 시도가 판을 더 키웠습니다',
        '재판관님, 제 몫이 없다고는 하지 않겠지만 상대의 직접 행동도 더 무겁게 보셔야 합니다',
        '재판관님, 제 실수와 별개로 아티스트 쪽의 확인 시도는 결과를 악화시켰습니다',
        '재판관님, 제가 선을 흐린 점은 인정하지만 상대의 선택도 같은 비중으로 봐 주십시오',
        '재판관님, 제 책임을 지우려는 것이 아니라 상대가 만든 신호도 함께 보자는 뜻입니다',
      ],
      S4: [
        '재판관님, 당시에는 사고 확산을 막겠다는 조급함이 앞섰습니다',
        '재판관님, 현장 혼선을 통제해야 한다는 압박이 제 판단을 거칠게 만들었습니다',
        '재판관님, 관리 책임을 지켜야 한다는 강박이 오히려 선을 흐렸습니다',
        '재판관님, 감정이 없었던 것이 아니라 당황을 절차로 덮으려 했습니다',
        '재판관님, 저는 상황 수습을 급히 하려다 공식 절차를 놓쳤습니다',
      ],
      S5: [
        '재판관님, 보고를 줄이고 대응을 늦춘 판단은 제 책임입니다',
        '재판관님, 비공식 힌트 제공과 축소 보고를 더는 부정하지 않겠습니다',
        '재판관님, 제가 관리 책임보다 현장 편의를 앞세운 순간이 있었습니다',
        '재판관님, 핵심 책임 중 제 몫을 돌려 말하지 않겠습니다',
        '재판관님, 공식 대응선을 흐린 판단이 제 쪽에서 나왔음을 인정합니다',
      ],
    },
  }
  return byParty[party][state]
}

function disputeFocus(disputeId, qtype) {
  const frame = DISPUTE_FRAMES[disputeId]
  if (qtype === 'fact_pursuit') return frame.fact
  if (qtype === 'motive_search') return frame.motive
  return frame.empathy
}

function buildInterrogationVariants(party, dispute, state, qtype) {
  const frame = DISPUTE_FRAMES[dispute.id]
  const leads = stateLead(party, state)
  const focus = disputeFocus(dispute.id, qtype)
  const own = party === 'a' ? frame.aOwn : frame.bOwn
  const other = party === 'a' ? frame.aOther : frame.bOther
  const closing = party === 'a' ? frame.aProtect : frame.bProtect
  const focusSentence = `${focusLead(qtype)}. ${focus}`

  const variants = []
  for (let i = 0; i < 5; i += 1) {
    const lead = leads[i]
    let text = ''
    if (state === 'S0' || state === 'S1') {
      const options = [
        [lead, focus],
        [lead, frame.core],
        [`재판관님, ${focusLead(qtype)}`, '한쪽만 먼저 고정하지는 말아 주십시오'],
        [lead, other],
        [`재판관님, ${frame.title}은 한 문장으로 닫을 사안이 아닙니다`, focus],
      ]
      text = paragraph(options[i])
    } else if (state === 'S5') {
      const options = [
        [lead, own, closing],
        [lead, frame.core, closing],
        [lead, focus, own],
        [lead, other, '제 몫의 책임도 함께 적어 주십시오'],
        [lead, frame.core, '책임 비율은 분리하되 제 몫은 감추지 않겠습니다'],
      ]
      text = paragraph(options[i])
    } else {
      const options = [
        [lead, frame.core, closing],
        [lead, own, focus],
        [lead, other, '책임 비율은 따로 재어 주십시오'],
        [lead, focus, closing],
        [lead, own, other],
      ]
      text = paragraph(options[i])
    }

    variants.push({
      id: `${party}|${dispute.id}|${state}|${qtype}#${i + 1}`,
      text,
      behaviorHint: interrogationBehavior(state, qtype, i),
    })
  }
  return variants
}

function interrogationBehavior(state, qtype, index) {
  const stateHint = {
    S0: '책임 인정을 최대한 늦추며 선을 긋습니다',
    S1: '해명 여지를 넓혀 두려 합니다',
    S2: '불리한 부분을 제한적으로 받아들입니다',
    S3: '자기 책임과 상대 책임을 강하게 분리합니다',
    S4: '감정이 새지만 문장 구조는 붙잡습니다',
    S5: '핵심 책임을 더는 숨기지 않으려 합니다',
  }[state]
  const focusHint = {
    fact_pursuit: '기록과 시간 순서를 기준으로 답합니다',
    motive_search: '선택의 동기를 설명하려 합니다',
    empathy_approach: '감정과 사실을 분리해 읽히려 합니다',
  }[qtype]
  const flavors = [
    '첫 문장을 낮고 단단하게 냅니다',
    '결론을 늦추며 표현을 고릅니다',
    '반박과 인정의 폭을 같이 조절합니다',
    '상대 책임을 더 강하게 부각합니다',
    '끝문장에서 경계와 피로가 함께 묻어납니다',
  ]
  return `${stateHint}. ${focusHint}. ${flavors[index]}.`
}

function buildEvidenceVariants(party, evidence, band, role) {
  const frame = EVIDENCE_FRAMES[evidence.id]
  const label = cleanSentence(evidence.name)
  const roleLine = {
    self: '이 자료는 제 쪽 판단을 직접 겨눕니다',
    other: '이 자료는 상대 쪽이 줄이려는 축을 붙잡습니다',
    institutional: '이 자료는 기관 기록이라 말보다 무겁게 남습니다',
    both: '이 자료는 양쪽 책임을 함께 흔듭니다',
  }[role]
  const bandLine = band === 'early' ? frame.early : band === 'mid' ? frame.mid : frame.late
  const variants = [
    paragraph([`재판관님, ${topic(label)} 지금 단정의 근거보다 방향을 잡는 자료입니다`, frame.direct]),
    paragraph([`재판관님, ${object(label)} 보면 ${roleLine}`, bandLine]),
    paragraph([`${topic(label)} 취득 경위와 전후 맥락까지 읽어야 합니다`, frame.direct]),
    paragraph([`재판관님, ${topic(label)} 겨누는 지점은 분명합니다`, frame.direct]),
    band === 'late'
      ? paragraph([`재판관님, ${topic(label)} 더는 미룰 수 없는 대목입니다`, frame.direct, '이 자료가 겨누는 책임선은 분리해서 적어 주십시오'])
      : paragraph([`재판관님, ${topic(label)} 아직 해석 폭이 남아 있습니다`, frame.direct]),
  ]
  return variants.map((text, index) => ({
    id: `${party}|${evidence.id}|${band}|${role}#${index + 1}`,
    text,
    behaviorHint: evidenceBehavior(band, role, index),
  }))
}

function evidenceBehavior(band, role, index) {
  const bandHint = {
    early: '증거 의미 확대를 막으려 합니다',
    mid: '증거를 인정하되 방향은 틀려 합니다',
    late: '증거 앞에서 숨길 수 있는 폭이 줄어듭니다',
  }[band]
  const roleHint = {
    self: '자기 책임으로 이어지는 선을 경계합니다',
    other: '상대 책임을 고정하려는 의도가 보입니다',
    institutional: '기관 기록의 무게를 의식합니다',
    both: '양측 결합 구조를 설명하려 합니다',
  }[role]
  const flavors = [
    '첫 반응은 비교적 정돈되어 있습니다',
    '문장 끝을 낮추며 거리를 둡니다',
    '출처와 맥락을 앞세웁니다',
    '결론보다 해석 폭을 강조합니다',
    '자료의 무게를 인정하면서도 비율을 따지려 합니다',
  ]
  return `${bandHint}. ${roleHint}. ${flavors[index]}.`
}

function buildDossierQuestionMap() {
  const map = []
  for (const card of v3.dossierCards || []) {
    for (const challenge of card.challenges || []) {
      for (const question of challenge.questions || []) {
        map.push({
          id: question.id,
          text: question.text,
          targetParty: challenge.targetParty,
          cardName: card.name,
          relatedDisputes: card.relatedDisputes || [],
        })
      }
    }
  }
  return map
}

function buildDossierVariants(info, band) {
  const prompt = cleanSentence(info.text)
  const related = DISPUTE_FRAMES[info.relatedDisputes[0] || 'd-1']
  const bandLines = {
    early: '이 단계에서는 해명 여지가 남아 있습니다',
    mid: '이제는 빠진 설명이 어디였는지 바로 드러납니다',
    late: '이 질문 앞에서는 책임 비율까지 직접 답해야 합니다',
  }
  const extras = {
    early: related.fact,
    mid: related.motive,
    late: related.empathy,
  }
  const variants = [
    paragraph([`재판관님, 방금 카드 질문의 요지는 "${prompt}"입니다`, bandLines[band]]),
    paragraph([`재판관님, ${info.cardName} 카드가 겨누는 쟁점은 분명합니다`, extras[band]]),
    band === 'late'
      ? paragraph([`재판관님, "${prompt}"라는 질문은 더는 우회할 수 없습니다`, bandLines[band], '사실선과 책임선을 함께 적어 주십시오'])
      : paragraph([`재판관님, "${prompt}"라는 질문은 해명 범위를 좁힙니다`, extras[band]]),
  ]
  return variants.map((text, index) => ({
    id: `${info.targetParty}|${info.id}|${band}#${index + 1}`,
    text,
    behaviorHint: dossierBehavior(band, index),
  }))
}

function dossierBehavior(band, index) {
  const bandHint = {
    early: '카드 질문의 압박을 아직 분산하려 합니다',
    mid: '누락한 설명을 메우려 합니다',
    late: '우회보다 직접 답변으로 넘어갑니다',
  }[band]
  const flavors = [
    '질문의 프레임을 먼저 확인합니다',
    '빠진 맥락을 보태려 합니다',
    '책임 비율까지 같이 조정하려 합니다',
  ]
  return `${bandHint}. ${flavors[index]}.`
}

function knowledgeSentence(text) {
  return `${cleanSentence(text).replace(/안다$/u, '안다고 진술합니다')}`
}

function buildWitnessVariants(witness, depth) {
  const surface = knowledgeSentence(witness.surfaceKnowledge || witness.knowledgeScope)
  const full = knowledgeSentence(witness.knowledgeScope || witness.surfaceKnowledge)
  const variantsByDepth = {
    vague: [
      paragraph([`${witness.name} 증인은 넓은 범위의 흐름만 먼저 진술합니다`, surface]),
      paragraph([`${witness.name} 증인은 직접 본 부분과 들은 부분을 아직 넓게 묶어 말합니다`, surface]),
      paragraph([`${witness.name} 증인은 아직 단정 대신 범위 설명에 머뭅니다`, '핵심 흐름만 짚고 세부 확정은 미룹니다']),
    ],
    partial: [
      paragraph([`${witness.name} 증인은 직접 본 장면과 전해 들은 장면을 나눠 말합니다`, full]),
      paragraph([`${witness.name} 증인은 자기 위치를 숨기지 않은 채 관찰 범위를 제한합니다`, full]),
      paragraph([`${witness.name} 증인은 확실한 장면과 추정을 분리하려 합니다`, '다만 자기 이해관계가 해석에 섞이는 지점도 남습니다']),
    ],
    full: [
      paragraph([`${witness.name} 증인은 본 장면과 이후 정리를 순서대로 설명합니다`, full, '자기 해석과 관찰을 구분해 진술하려 합니다']),
      paragraph([`${witness.name} 증인은 시간 순서에 맞춰 기억을 정리합니다`, full, '이해관계가 있다는 점도 숨기지 않습니다']),
      paragraph([`${witness.name} 증인은 관찰 범위, 보고 흐름, 이후 반응까지 연속해서 진술합니다`, full, '결정적 대목과 추정 대목을 나눠 말합니다']),
    ],
  }
  return variantsByDepth[depth].map((text, index) => ({
    id: `${witness.id}|${depth}#${index + 1}`,
    text,
    behaviorHint: witnessBehavior(depth, index),
  }))
}

function buildWitnessVariants(witness, depth) {
  const surface = knowledgeSentence(witness.surfaceKnowledge || witness.knowledgeScope)
  const full = knowledgeSentence(witness.knowledgeScope || witness.surfaceKnowledge)
  const variantsByDepth = {
    vague: [
      `${witness.name} \uC99D\uC778\uC740 \uB113\uC740 \uBC94\uC704\uC758 \uD750\uB984\uACFC ${surface.replace(/\.$/, '')}\uB9CC \uC6B0\uC120 \uC9C4\uC220\uD569\uB2C8\uB2E4.`,
      `${witness.name} \uC99D\uC778\uC740 \uC9C1\uC811 \uBCF8 \uBD80\uBD84\uACFC \uB4E4\uC740 \uBD80\uBD84\uC744 \uC544\uC9C1 \uB113\uAC8C \uBB36\uC5B4 \uB9D0\uD558\uB418 ${surface.replace(/\.$/, '')}\uB9CC \uC9DA\uACE0 \uB118\uC5B4\uAC11\uB2C8\uB2E4.`,
      `${witness.name} \uC99D\uC778\uC740 \uC544\uC9C1 \uB2E8\uC815 \uB300\uC2E0 \uBC94\uC704 \uC124\uBA85\uC5D0 \uBA38\uBB34\uB974\uBA70 \uD575\uC2EC \uD750\uB984\uB9CC \uC9DA\uACE0 \uC138\uBD80 \uD655\uC815\uC740 \uBBF8\uB8F9\uB2C8\uB2E4.`,
    ],
    partial: [
      paragraph([`${witness.name} \uC99D\uC778\uC740 \uC9C1\uC811 \uBCF8 \uC7A5\uBA74\uACFC \uC804\uD574 \uB4E4\uC740 \uC7A5\uBA74\uC744 \uB098\uB220 \uB9D0\uD569\uB2C8\uB2E4`, full]),
      paragraph([`${witness.name} \uC99D\uC778\uC740 \uC790\uAE30 \uC704\uCE58\uB97C \uC228\uAE30\uC9C0 \uC54A\uC740 \uCC44 \uAD00\uCC30 \uBC94\uC704\uB97C \uC81C\uD55C\uD569\uB2C8\uB2E4`, full]),
      paragraph([`${witness.name} \uC99D\uC778\uC740 \uD655\uC2E4\uD55C \uC7A5\uBA74\uACFC \uCD94\uC815\uC744 \uBD84\uB9AC\uD558\uB824 \uD569\uB2C8\uB2E4`, '\uB2E4\uB9CC \uC790\uAE30 \uC774\uD574\uAD00\uACC4\uAC00 \uD574\uC11D\uC5D0 \uC5B9\uC2DC\uC774 \uC9C0\uC7A5\uC744 \uC8FC\uC5C8\uC74C\uB3C4 \uC778\uC815\uD569\uB2C8\uB2E4']),
    ],
    full: [
      paragraph([`${witness.name} \uC99D\uC778\uC740 \uBCF8 \uC7A5\uBA74\uACFC \uC774\uD6C4 \uC815\uB9AC\uB97C \uC21C\uC11C\uB300\uB85C \uC124\uBA85\uD569\uB2C8\uB2E4`, full, '\uC790\uAE30 \uD574\uC11D\uACFC \uAD00\uCC30\uC744 \uAD6C\uBD84\uD574 \uC9C4\uC220\uD558\uB824 \uD569\uB2C8\uB2E4']),
      paragraph([`${witness.name} \uC99D\uC778\uC740 \uC2DC\uAC04 \uC21C\uC11C\uC5D0 \uB9DE\uCDB0 \uAE30\uC5B5\uC744 \uC815\uB9AC\uD569\uB2C8\uB2E4`, full, '\uC774\uD574\uAD00\uACC4\uAC00 \uC788\uB2E4\uB294 \uC810\uB3C4 \uC228\uAE30\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4']),
      paragraph([`${witness.name} \uC99D\uC778\uC740 \uAD00\uCC30 \uBC94\uC704, \uBCF4\uACE0 \uD750\uB984, \uC774\uD6C4 \uBC18\uC751\uAE4C\uC9C0 \uC5F0\uC18D\uD574\uC11C \uC9C4\uC220\uD569\uB2C8\uB2E4`, full, '\uACB0\uC815\uC801 \uB300\uBAA9\uACFC \uCD94\uC815 \uB300\uBAA9\uC744 \uB098\uB220 \uB9D0\uD569\uB2C8\uB2E4']),
    ],
  }
  return variantsByDepth[depth].map((text, index) => ({
    id: `${witness.id}|${depth}#${index + 1}`,
    text,
    behaviorHint: witnessBehavior(depth, index),
  }))
}

function witnessBehavior(depth, index) {
  const depthHint = {
    vague: '기억 범위를 넓게 잡아 말합니다',
    partial: '관찰과 추정을 분리하려 합니다',
    full: '기억을 순서대로 정리해 냅니다',
  }[depth]
  const flavors = [
    '초기 진술답게 조심스럽습니다',
    '자기 위치를 의식하며 말합니다',
    '확정 가능한 부분을 더 또렷하게 꺼냅니다',
  ]
  return `${depthHint}. ${flavors[index]}.`
}

const dossierQuestions = buildDossierQuestionMap()

const bundle = {
  schemaVersion: 1,
  caseId: CASE_ID,
  generatedAt: new Date().toISOString(),
  notes: [
    'Structured bootstrap-generated headline-02 bundle.',
    'Korean formal judge-facing variants regenerated for validator compatibility.',
  ],
  coverage: {
    interrogation: {
      parties: ['a', 'b'],
      disputes: runtimeCase.disputes.map((item) => item.id),
      lieStates: STATES,
      questionTypes: QTYPES,
      variantsPerKey: 5,
    },
    evidence_present: {
      parties: ['a', 'b'],
      evidenceIds: runtimeCase.evidence.map((item) => item.id),
      lieBands: BANDS,
      variantsPerKey: 5,
    },
    dossier: {
      parties: ['a', 'b'],
      questionIds: dossierQuestions.map((item) => item.id),
      lieBands: BANDS,
      variantsPerKey: 3,
    },
    witness: {
      witnessIds: runtimeCase.duo.socialGraph.map((item) => item.id),
      depths: WITNESS_DEPTHS,
      variantsPerKey: 3,
    },
    aftermath: {
      resultClasses: RESULT_CLASSES,
      variantsPerKey: 2,
    },
    system_message: {
      keys: SYSTEM_KEYS,
      variantsPerKey: 2,
    },
  },
  channels: {
    interrogation: { entries: [] },
    evidence_present: { entries: [] },
    dossier: { entries: [] },
    witness: { entries: [] },
    aftermath: { entries: [] },
    system_message: { entries: [] },
  },
}

for (const party of ['a', 'b']) {
  for (const dispute of runtimeCase.disputes) {
    for (const state of STATES) {
      for (const qtype of QTYPES) {
        bundle.channels.interrogation.entries.push({
          key: `${party}|${dispute.id}|${state}|${qtype}`,
          party,
          disputeId: dispute.id,
          lieState: state,
          questionType: qtype,
          stanceHint: stanceFromState(state),
          truthLevel: truthLevelFromState(state),
          variants: buildInterrogationVariants(party, dispute, state, qtype),
        })
      }
    }
  }
}

for (const party of ['a', 'b']) {
  for (const evidence of runtimeCase.evidence) {
    for (const band of BANDS) {
      const role = deriveSubjectRole(evidence, party)
      bundle.channels.evidence_present.entries.push({
        key: `${party}|${evidence.id}|${band}|${role}`,
        party,
        evidenceId: evidence.id,
        lieBand: band,
        subjectRole: role,
        stanceHint: band === 'early' ? 'hedge' : band === 'mid' ? 'partial' : 'confess',
        truthLevel: band === 'early' ? 'hint' : band === 'mid' ? 'partial' : 'full',
        variants: buildEvidenceVariants(party, evidence, band, role),
      })
    }
  }
}

for (const question of dossierQuestions) {
  for (const band of BANDS) {
    bundle.channels.dossier.entries.push({
      key: `${question.targetParty}|${question.id}|${band}`,
      party: question.targetParty,
      dossierQuestionId: question.id,
      lieBand: band,
      stanceHint: band === 'early' ? 'hedge' : band === 'mid' ? 'partial' : 'confess',
      truthLevel: band === 'early' ? 'hint' : band === 'mid' ? 'partial' : 'full',
      variants: buildDossierVariants(question, band),
    })
  }
}

for (const witness of runtimeCase.duo.socialGraph) {
  for (const depth of WITNESS_DEPTHS) {
    bundle.channels.witness.entries.push({
      key: `${witness.id}|${depth}`,
      witnessId: witness.id,
      depth,
      stanceHint: 'answer',
      truthLevel: depth === 'vague' ? 'hint' : depth === 'partial' ? 'partial' : 'full',
      variants: buildWitnessVariants(witness, depth),
    })
  }
}

for (const resultClass of RESULT_CLASSES) {
  bundle.channels.aftermath.entries.push({
    key: resultClass,
    resultClass,
    variants: AFTERMATH_TEXTS[resultClass].map((text, index) => ({
      id: `${resultClass}#${index + 1}`,
      text,
      behaviorHint: '없음',
    })),
  })
}

for (const item of SYSTEM_KEYS) {
  const key = `${item.context}|${item.eventType}`
  bundle.channels.system_message.entries.push({
    key,
    context: item.context,
    eventType: item.eventType,
    variants: SYSTEM_TEXTS[key].map((text, index) => ({
      id: `${key}#${index + 1}`,
      text,
      behaviorHint: '없음',
    })),
  })
}

ensureDir(OUT_PATH)
fs.writeFileSync(OUT_PATH, JSON.stringify(bundle, null, 2) + '\n', 'utf8')
console.log(`[headline-02-stage2-scripted-bootstrap] wrote ${path.relative(ROOT, OUT_PATH)}`)
