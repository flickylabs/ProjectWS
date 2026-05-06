#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const {
  readJson,
  ensureDir,
  findFileRecursiveByName,
  cleanSentence,
  paragraph,
  truthLevelFromState,
  stanceFromState,
  deriveSubjectRole,
} = require('./lib/scripted-korean-utils.cjs')

const ROOT = path.join(__dirname, '..')
const CASE_ID = 'spouse-11'
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

const PARTNER_REF = {
  a: '제 남편',
  b: '제 아내',
}

const DISPUTE_FRAMES = {
  'd-1': {
    title: '무단 접속과 자료 반출',
    core: '접속 권한을 넘은 행동이 어디까지였는지가 핵심입니다',
    fact: '접속 기록과 공사중지 요청은 한 흐름으로 이어집니다',
    motive: '확인 목적이었다고 해도 관리자 메뉴와 자료 반출까지 가면 계산된 행동으로 읽힙니다',
    empathy: '불안과 추적 욕구를 이해하더라도 권한 침해를 지우지는 못합니다',
    aOwn: '제 쪽이 경계선을 넘은 것은 맞지만, 당시에는 복구 지연 경위를 직접 확인해야 한다고 봤습니다',
    bOwn: '제 쪽이 권한 관리와 공유 범위를 느슨하게 둔 책임은 남습니다',
    aOther: '제 남편 쪽은 현장 승인권과 계정 관리 책임을 함께 쥐고 있었습니다',
    bOther: '제 아내 쪽은 확인을 넘어서 공사중지와 자료 반출까지 직접 움직였습니다',
    aClose: '권한 침해와 복구 지연을 분리해서 봐 주십시오',
    bClose: '경계 붕괴와 현장 관리 책임을 함께 봐 주십시오',
  },
  'd-2': {
    title: '복구 지연과 권한 조정',
    core: '긴급 복구를 늦춘 조치와 승인권 재조정이 함께 남아 있습니다',
    fact: '제습기 중단, 긴급복구 지연, 승인권 변경이 같은 묶음으로 이어집니다',
    motive: '현장을 장악하려는 계산이 있었다면 단순 실수보다 무겁게 봐야 합니다',
    empathy: '급했다는 말만으로는 복구보다 통제를 우선한 선택을 덮기 어렵습니다',
    aOwn: '제 쪽이 감정적으로 대응한 부분은 있어도 복구 지연의 결정권은 없었습니다',
    bOwn: '제 쪽이 복구보다 통제를 먼저 잡으려 한 것은 부인하기 어렵습니다',
    aOther: '제 남편 쪽은 긴급 대응을 말하면서도 실제 조치를 미뤘습니다',
    bOther: '제 아내 쪽은 그 틈을 이용해 무단 접속과 자료 확보로 밀어붙였습니다',
    aClose: '복구 지연 책임과 무단 접속 책임은 따로 계산해 주십시오',
    bClose: '현장 통제의 과잉과 상대방의 침범을 함께 보셔야 합니다',
  },
  'd-3': {
    title: '대규모 피해의 원인',
    core: '하자 자체보다 과장된 구도와 늦어진 복구가 피해 규모를 키웠는지가 핵심입니다',
    fact: '잘린 캡처와 늦어진 복구 기록이 같이 놓일 때 피해 프레임이 달라집니다',
    motive: '원래 하자만 강조하면 각자 만든 확대 요소가 가려집니다',
    empathy: '억울함과 공포를 이해해도 피해를 더 크게 보이게 한 선택은 남습니다',
    aOwn: '제 쪽이 장면 배열을 제 쪽에 맞게 고른 책임은 인정합니다',
    bOwn: '제 쪽이 복구를 늦춘 탓에 피해가 더 번진 책임은 피하기 어렵습니다',
    aOther: '제 남편 쪽은 긴급 복구를 미루며 하자 규모를 키웠습니다',
    bOther: '제 아내 쪽은 잘린 화면과 사진 순서를 이용해 인상을 밀어 올렸습니다',
    aClose: '하자 자체와 확대된 인상을 구분해 주십시오',
    bClose: '원래 하자와 뒤늦은 확대 설계를 나눠서 봐 주십시오',
  },
  'd-4': {
    title: '보험금으로 적자를 메우려 한 공동 계산',
    core: '보험금으로 공사 적자와 입주 지연 비용을 메우려는 공동 계산이 있었는지가 핵심입니다',
    fact: '메신저 대화와 초안 정리는 한쪽 단독 계획이 아니라 공동 계산을 보여 줍니다',
    motive: '생계 압박이 있었다고 해도 청구 범위를 넓히는 설계는 별도 문제입니다',
    empathy: '버텨야 했다는 사정과 허용되는 청구 범위는 분리해서 봐야 합니다',
    aOwn: '제 쪽도 보험금으로 숨통을 틔워 보려는 계산을 했습니다',
    bOwn: '제 쪽도 적자와 연체를 보험금으로 메우자는 말을 먼저 꺼낸 적이 있습니다',
    aOther: '제 남편 쪽은 생활 압박을 이유로 청구 범위를 넓히는 데 동의했습니다',
    bOther: '제 아내 쪽도 사진과 자료를 제 쪽에 맞게 정리해 금액을 키우려 했습니다',
    aClose: '생계 압박과 청구 설계를 한 덩어리로 보지는 말아 주십시오',
    bClose: '버티기 위한 계산과 허용 범위를 넘는 설계를 구분해 주십시오',
  },
  'd-5': {
    title: '지급 보류의 실제 사유',
    core: '지급 보류가 감정적 보복인지, 누적된 데이터 충돌 때문인지가 핵심입니다',
    fact: '조사 예정 통지와 기관 보고는 보복보다 불일치 누적을 가리킵니다',
    motive: '보복 프레임은 강하지만 실제 기관 판단은 기록 충돌을 먼저 봅니다',
    empathy: '억울함은 이해해도 보류 사유를 감정 하나로 닫기는 어렵습니다',
    aOwn: '제 쪽도 자료 배열과 청구 설계로 불일치를 키운 책임이 있습니다',
    bOwn: '제 쪽도 복구 지연과 보고 축소로 의심을 키운 책임이 있습니다',
    aOther: '제 남편 쪽의 지연 조치가 기관 의심을 키운 것은 분명합니다',
    bOther: '제 아내 쪽의 과장된 자료 정리가 보류 판단을 밀어 올렸습니다',
    aClose: '보복 감정과 기관 판단의 근거를 따로 봐 주십시오',
    bClose: '누가 먼저 미웠느냐보다 누가 불일치를 키웠는지 봐 주십시오',
  },
}

const EVIDENCE_FRAMES = {
  'e-1': {
    direct: '공사 포털 접속과 관리자 메뉴 접근이 하나의 흐름으로 남아 있습니다',
    early: '접속 자체는 보이지만 동기와 범위는 더 따져야 합니다',
    mid: '확인 목적이었다는 말만으로는 관리자 메뉴 접근을 설명하기 어렵습니다',
    late: '접속 범위와 자료 반출 책임을 함께 묻는 자료가 됩니다',
  },
  'e-2': {
    direct: '제습기 중단과 긴급복구 지연, 승인권 변경이 시간 순서대로 묶여 있습니다',
    early: '당장의 급함만으로는 설명되지 않는 공백이 보입니다',
    mid: '복구보다 통제를 먼저 잡은 선택이라는 의심이 커집니다',
    late: '지연 조치가 실제 손해 확대에 얼마나 기여했는지까지 연결됩니다',
  },
  'e-3': {
    direct: '잘린 CCTV 캡처와 원본 요청 메모가 함께 남아 있어 함정 증거의 성격이 강합니다',
    early: '한 장면만으로 전체 피해를 확정하기는 어렵습니다',
    mid: '누가 어떤 장면을 골라 내밀었는지가 더 중요해집니다',
    late: '원본을 빼고 잘린 화면만 돌린 선택 자체가 이미 책임으로 읽힙니다',
  },
  'e-4': {
    direct: '부부 메신저 보험 계산 대화와 적자 메모에는 공동 계산의 흔적이 남아 있습니다',
    early: '불안한 대화처럼 보여도 계산의 방향은 분명합니다',
    mid: '보험금으로 적자를 메우려는 말이 한쪽만의 발상은 아니라는 점이 드러납니다',
    late: '생계 사정과 허용 범위를 넘는 청구 설계를 함께 따져야 하는 자료입니다',
  },
  'e-5': {
    direct: '보험 청구 초안과 손해사정 데이터 불일치 보고가 과장 또는 설계 흔적을 정리합니다',
    early: '기관 자료라서 표면 인상보다 근거 구조가 더 중요합니다',
    mid: '사진 순서와 복구 지연, 초안 설계가 서로 맞물린다는 점이 선명해집니다',
    late: '공동 설계와 데이터 충돌을 함께 묶어 책임 비율을 다시 보게 합니다',
  },
  'e-6': {
    direct: '조사예정 통지와 복구업체 현장 진술은 지급 보류의 사유를 기관 쪽 언어로 적어 둡니다',
    early: '외부 제보보다 기록 충돌과 초기 복구 지연이 먼저 보입니다',
    mid: '감정적 보복이라는 설명만으로는 기관 판단의 무게를 넘기 어렵습니다',
    late: '보류 사유를 누가 키웠는지까지 연결해서 봐야 하는 자료입니다',
  },
}

const WITNESS_FRAMES = {
  'tp-1': {
    name: '최세모',
    vague: '현장 권한 변경과 공사중지 요청, CCTV 캡처 전달 흐름을 안다고 진술합니다',
    partial: '현장소장으로서 권한 변경과 긴급복구 권고, 캡처 전달 경위를 직접 확인했다고 진술합니다',
    full: '현장 권한 변경, 공사중지 요청, 긴급복구 권고, CCTV 캡처 전달 경위를 시간 순서대로 설명할 수 있다고 진술합니다',
  },
  'tp-2': {
    name: '조민주',
    vague: '지급 보류 사유가 감정적 보복보다 기록 충돌과 연결된다고 진술합니다',
    partial: '손해사정 담당자로서 보험 청구 초안, 데이터 불일치, 지급 보류 사유를 기관 기록 기준으로 설명합니다',
    full: '보험 청구 초안, 손해사정 데이터 불일치, 지급 보류 사유를 기관 기록과 조사 순서에 따라 설명할 수 있다고 진술합니다',
  },
  'tp-3': {
    name: '박은지',
    vague: '예산 압박과 입주 일정 불안을 반복해서 들었다고 진술합니다',
    partial: '가족 입장에서 생활비 압박, 입주 일정 불안, 보험금으로 버텨야 한다는 말을 여러 차례 들었다고 진술합니다',
    full: '가족으로서 예산 압박, 입주 일정 불안, 보험금으로 버티자는 말을 언제 어떤 맥락에서 들었는지까지 설명합니다',
  },
}

const AFTERMATH_TEXTS = {
  a_primary_fault: [
    '재판관은 제 아내 쪽의 무단 접속과 자료 반출을 가장 무겁게 봅니다. 다만 복구 지연과 현장 통제 책임이 따로 남는다는 점도 함께 적습니다.',
    '이번 판단은 제 아내 쪽의 경계 침범을 주된 책임으로 남깁니다. 그와 별개로 상대방의 복구 지연 관리 책임도 후속 조치 대상으로 기록합니다.',
  ],
  b_primary_fault: [
    '재판관은 제 남편 쪽의 복구 지연과 승인권 재조정을 가장 무겁게 봅니다. 다만 상대방의 무단 접속과 자료 반출도 면제하지는 않습니다.',
    '이번 판단은 제 남편 쪽이 긴급 대응보다 통제를 앞세운 책임을 중심에 둡니다. 그렇더라도 상대방의 침범 행위까지 사라지는 것은 아니라고 적습니다.',
  ],
  shared_fault: [
    '재판관은 두 사람 모두가 서로 다른 방식으로 피해를 키웠다고 봅니다. 한쪽은 침범했고 다른 한쪽은 지연했으며, 그 위에 공동 계산이 겹쳤다고 정리합니다.',
    '이번 결론은 단일 빌런보다 결합된 잘못에 가깝습니다. 침범, 지연, 과장 설계가 함께 작동했다는 점을 공동 책임으로 묶습니다.',
  ],
  protective_resolution: [
    '재판관은 추가 확산과 2차 피해 방지를 먼저 둡니다. 책임 비율은 남기되 비공개 정정과 복구 우선 조치로 결론을 좁힙니다.',
    '이번 결론은 처벌 수위보다 실제 복구와 증거 정리를 먼저 요구합니다. 공개 비난은 줄이고 자료 정정, 권한 분리, 복구 재개를 우선합니다.',
  ],
  procedural_caution: [
    '재판관은 사실관계만큼 절차 붕괴를 심각하게 봅니다. 무단 접속, 잘린 캡처 유통, 축소 보고가 다시는 반복되지 않도록 절차를 먼저 세우라고 적습니다.',
    '이번 결론은 누가 더 미웠는가보다 어떤 절차가 무너졌는가에 무게를 둡니다. 권한 관리, 기관 대응, 복구 보고 체계를 다시 세우라는 주문이 함께 남습니다.',
  ],
}

const SYSTEM_TEXTS = {
  'interrogation|repeat_warning': [
    '같은 축의 질문이 반복되고 있습니다. 기록, 동기, 보호 중 다른 각도로 전환해 주십시오.',
    '반복 질문 경고입니다. 지금은 같은 문장을 되풀이하기보다 다른 증거나 다른 동기를 붙이는 편이 유리합니다.',
  ],
  'evidence|new_unlock': [
    '새 조사 결과가 열렸습니다. 이제는 표면 인상보다 취득 경위와 연결 구조를 함께 읽으셔야 합니다.',
    '증거 해석의 폭이 넓어졌습니다. 방금 열린 자료는 책임 비율과 공개 범위를 다시 흔듭니다.',
  ],
  'evidence|trap_notice': [
    '이 자료는 함정 가능성이 있습니다. 화면 한 장보다 원본 여부와 전달 경위를 먼저 점검해 주십시오.',
    '주의가 필요한 증거입니다. 잘린 장면이나 편향된 배열만으로 전체 결론을 닫지 마십시오.',
  ],
  'dossier|challenge_cleared': [
    '카드 질문이 정리되었습니다. 방금 드러난 조각은 다음 심문에서 책임 분리의 근거로 이어집니다.',
    '도전 카드가 해제되었습니다. 이제 숨은 계산과 늦어진 대응을 더 직접적으로 물을 수 있습니다.',
  ],
  'witness|credibility_shift': [
    '증인 신뢰도가 조정되었습니다. 관찰 사실과 추정 진술을 더 엄격하게 나누어 읽어 주십시오.',
    '증언의 무게가 바뀌었습니다. 같은 문장도 지금은 더 좁거나 더 넓은 의미로 해석될 수 있습니다.',
  ],
  'verdict|profile_update': [
    '이번 판단이 재판관 프로필에 반영됩니다. 사실, 절차, 보호 가운데 어디에 더 무게를 두었는지가 기록됩니다.',
    '판결 성향이 갱신됩니다. 이번 사건에서의 책임 분배 방식이 다음 판단의 기준선으로 남습니다.',
  ],
}

function partnerRef(party) {
  return PARTNER_REF[party]
}

function interrogationBehavior(state, qtype, index) {
  const stateHint = {
    S0: '책임 인정을 최대한 늦추며 선을 긋습니다',
    S1: '해명 범위를 좁게 잡고 방어선을 유지합니다',
    S2: '불리한 조각을 제한적으로 받아들입니다',
    S3: '자기 책임과 상대 책임을 분리하며 계산을 드러냅니다',
    S4: '감정이 새지만 문장 자체는 붙잡고 있습니다',
    S5: '제한된 고백과 책임 비율 조정을 함께 시도합니다',
  }[state]
  const qtypeHint = {
    fact_pursuit: '기록과 순서를 기준으로 답합니다',
    motive_search: '왜 그런 선택을 했는지 해석을 붙여 답합니다',
    empathy_approach: '불안과 계산을 분리해 보이려 합니다',
  }[qtype]
  const flavor = [
    '첫 문장을 낮고 단단하게 냅니다',
    '결론을 늦추며 표현을 고릅니다',
    '인정과 반박의 폭을 같이 조절합니다',
    '상대 책임을 더 강하게 부각합니다',
    '끝문장에서 경계와 피로가 함께 묻어납니다',
  ][index]
  return `${stateHint}. ${qtypeHint}. ${flavor}.`
}

function stateOpeners(party, state) {
  const other = partnerRef(party)
  return {
    a: {
      S0: [
        '재판관님, 이 단계에서 제 쪽 책임을 먼저 닫지는 않겠습니다',
        '재판관님, 지금 바로 제 쪽 잘못으로만 접을 사안은 아닙니다',
        '재판관님, 우선은 한쪽의 단독 잘못으로 고정하지 말아 주십시오',
        '재판관님, 제 판단이 거칠었다는 비판은 듣더라도 구조를 먼저 보셔야 합니다',
        '재판관님, 지금은 제 쪽 과실만으로 정리하기 어려운 단계입니다',
      ],
      S1: [
        '재판관님, 제 설명이 부족했다는 점은 인정하지만 아직 결론을 닫기는 이릅니다',
        '재판관님, 제 쪽 방어가 거칠어 보여도 전체 맥락까지 같이 보셔야 합니다',
        '재판관님, 제가 경계선을 흐린 부분은 있어도 단독 책임으로 접히지는 않습니다',
        '재판관님, 비판은 받더라도 제 쪽 설명이 빠진 부분부터 정리해 주십시오',
        `재판관님, ${other} 쪽의 관리 책임까지 빠지면 사실 비율이 틀어집니다`,
      ],
      S2: [
        '재판관님, 제 쪽 선택이 사건을 더 어렵게 만든 점은 인정합니다',
        '재판관님, 확인을 넘어선 행동이 있었다는 지적은 피하지 않겠습니다',
        '재판관님, 제가 선을 넘은 조각이 있었다는 점은 받아들입니다',
        '재판관님, 제 대응이 과했다는 말이 왜 나오는지는 압니다',
        '재판관님, 다만 그 선택이 나온 배경까지 같이 보셔야 합니다',
      ],
      S3: [
        '재판관님, 제 쪽 계산이 있었더라도 상대방의 지연 조치가 먼저 판을 비틀었습니다',
        '재판관님, 제가 제 쪽에 맞는 장면을 고른 것은 맞지만 상대방이 만든 공백도 컸습니다',
        '재판관님, 제 쪽 책임을 줄이려는 뜻은 아닙니다만 상대방 조치가 핵심 원인을 키웠습니다',
        '재판관님, 제가 장면을 정리한 책임과 상대방이 복구를 늦춘 책임은 결이 다릅니다',
        '재판관님, 제 쪽 계산만 남기면 실제 현장 책임은 가려집니다',
      ],
      S4: [
        '재판관님, 그때는 진짜로 버티려면 뭐라도 쥐어야 한다는 마음이 컸습니다',
        '재판관님, 제 선택이 옳았다고 말하지는 않겠습니다만 무너지는 속도가 너무 빨랐습니다',
        '재판관님, 겁이 났고 그래서 확인과 계산을 구분하지 못했습니다',
        '재판관님, 냉정하게만 움직인 것은 아니었습니다',
        '재판관님, 그 시점의 불안과 지금의 평가를 분리해서 봐 주십시오',
      ],
      S5: [
        '재판관님, 제 쪽이 무단 접속과 자료 반출까지 간 책임은 인정합니다',
        '재판관님, 제가 확인을 넘어서 직접 움직였다는 점은 더 미루지 않겠습니다',
        '재판관님, 제 선택이 경계를 넘었다는 말은 맞습니다',
        '재판관님, 제가 상대방을 압박하려고 자료를 쓴 것도 부정하지 않겠습니다',
        '재판관님, 다만 제 고백이 상대방의 지연 책임을 지우는 뜻은 아닙니다',
      ],
    },
    b: {
      S0: [
        '재판관님, 모든 책임이 제 쪽 현장 관리로만 접히는 해석에는 동의하기 어렵습니다',
        '재판관님, 지금은 제 조치만 따로 떼어 단정할 단계가 아닙니다',
        '재판관님, 현장 대응이 거칠었다고 해도 단독 가해처럼 볼 사안은 아닙니다',
        '재판관님, 우선은 제 쪽 조치만으로 판을 닫지 말아 주십시오',
        '재판관님, 상대방의 침범까지 같이 보지 않으면 비율이 틀어집니다',
      ],
      S1: [
        '재판관님, 제 대응이 불편해 보였다는 지적은 듣겠습니다만 전체 책임은 아닙니다',
        '재판관님, 현장을 지키려던 조치가 거칠었다는 말은 들을 수 있습니다',
        '재판관님, 제가 서둘렀다는 점과 제가 주범이라는 말은 다릅니다',
        '재판관님, 제 쪽 설명이 짧았던 탓에 더 나쁘게 보였을 수는 있습니다',
        `재판관님, ${other} 쪽의 침범을 빼면 제 조치의 맥락도 사라집니다`,
      ],
      S2: [
        '재판관님, 제 쪽이 복구보다 통제를 앞세운 조각이 있다는 점은 인정합니다',
        '재판관님, 제 조치가 사건을 더 꼬이게 만든 부분은 받아들입니다',
        '재판관님, 저는 급하다는 말로 모든 판단을 덮을 생각은 없습니다',
        '재판관님, 제 쪽 관리 책임이 남는다는 점은 부정하지 않겠습니다',
        '재판관님, 다만 상대방 침범이 왜 함께 봐야 하는지도 같이 봐 주십시오',
      ],
      S3: [
        '재판관님, 제 쪽 지연 조치가 있었다 해도 상대방의 무단 접속이 사건을 다른 단계로 밀었습니다',
        '재판관님, 제가 통제를 앞세운 책임은 남지만 상대방의 자료 반출도 같은 무게로 보셔야 합니다',
        '재판관님, 제 조치를 비판하셔도 좋지만 상대방 침범을 부수 문제로 돌리지는 말아 주십시오',
        '재판관님, 복구 지연 책임과 무단 접속 책임은 서로 다른 축으로 같이 남습니다',
        '재판관님, 제 쪽 과실만 두드러지면 실제 경계 붕괴는 가려집니다',
      ],
      S4: [
        '재판관님, 그때는 집을 더 망치면 끝이라는 생각이 먼저 들었습니다',
        '재판관님, 제 조치가 과했다는 말은 듣겠습니다만 당시에는 무너지는 속도가 너무 빨랐습니다',
        '재판관님, 저는 버티려고 통제를 쥐었고 그게 더 나쁜 선택이 됐습니다',
        '재판관님, 냉정한 관리라기보다 겁먹은 통제였다는 점은 인정합니다',
        '재판관님, 제 쪽 불안이 잘못을 정당화하지는 않는다는 것도 압니다',
      ],
      S5: [
        '재판관님, 제 쪽이 복구를 늦추고 승인권을 다시 묶은 책임은 인정합니다',
        '재판관님, 제가 현장을 쥐려고 한 조치가 손해를 키운 부분은 부정하지 않겠습니다',
        '재판관님, 긴급 대응보다 통제를 먼저 잡은 판단은 제 책임입니다',
        '재판관님, 제 지연 조치가 기관 의심을 키웠다는 점도 인정합니다',
        '재판관님, 다만 제 고백이 상대방의 침범을 없애는 뜻은 아닙니다',
      ],
    },
  }[party][state]
}

function focusLead(qtype) {
  return {
    fact_pursuit: '기록과 시간 순서를 먼저 보십시오',
    motive_search: '왜 그런 선택을 했는지 동기부터 보십시오',
    empathy_approach: '불안과 계산을 분리해서 보십시오',
  }[qtype]
}

function joinedLead(lead, focus) {
  return `${lead.replace(/보십시오$/u, '보시고')} ${focus}`
}

function disputeFocus(frame, qtype) {
  if (qtype === 'fact_pursuit') return frame.fact
  if (qtype === 'motive_search') return frame.motive
  return frame.empathy
}

function buildInterrogationVariants(party, dispute, state, qtype) {
  const frame = DISPUTE_FRAMES[dispute.id]
  const openers = stateOpeners(party, state)
  const focus = disputeFocus(frame, qtype)
  const own = party === 'a' ? frame.aOwn : frame.bOwn
  const other = party === 'a' ? frame.aOther : frame.bOther
  const close = party === 'a' ? frame.aClose : frame.bClose
  const lead = focusLead(qtype)
  const variants = []

  for (let i = 0; i < 5; i += 1) {
    const opener = openers[i]
    let text
    if (state === 'S0' || state === 'S1') {
      const choices = [
        [opener, focus],
        [opener, frame.core],
        [opener, joinedLead(lead, focus)],
        [opener, other],
        [opener, close],
      ]
      text = paragraph(choices[i])
    } else if (state === 'S5') {
      const choices = [
        [opener, own, close],
        [opener, other, '책임 비율은 분리해서 보셔야 합니다'],
        [opener, joinedLead(lead, focus), close],
        [opener, own, other],
        [opener, frame.core, '제 고백이 상대방 책임을 지우는 뜻은 아닙니다'],
      ]
      text = paragraph(choices[i])
    } else {
      const choices = [
        [opener, focus, close],
        [opener, own, close],
        [opener, other, '책임 비율은 따로 계산해 주십시오'],
        [opener, joinedLead(lead, focus), own],
        [opener, frame.core, other],
      ]
      text = paragraph(choices[i])
    }
    variants.push({
      id: `${party}|${dispute.id}|${state}|${qtype}#${i + 1}`,
      text,
      behaviorHint: interrogationBehavior(state, qtype, i),
    })
  }
  return variants
}

function evidenceBehavior(band, role, index) {
  const bandHint = {
    early: '증거의 표면 결론을 늦추려 합니다',
    mid: '증거의 무게는 인정하되 방향을 틀려 합니다',
    late: '증거를 피하지 못한 채 책임 비율을 조정하려 합니다',
  }[band]
  const roleHint = {
    self: '자기 책임으로 닿는 선을 경계합니다',
    other: '상대방 책임을 먼저 굳히려 합니다',
    institutional: '기관 기록의 무게를 의식합니다',
    both: '두 사람 책임이 같이 묶이는 점을 부담스러워합니다',
  }[role]
  const flavor = [
    '첫 반응은 비교적 정돈되어 있습니다',
    '문장 끝을 낮추며 거리를 둡니다',
    '출처와 맥락을 앞세웁니다',
    '결론보다 해석 폭을 강조합니다',
    '자료의 무게를 인정하면서도 비율을 따지려 합니다',
  ][index]
  return `${bandHint}. ${roleHint}. ${flavor}.`
}

function buildEvidenceVariants(party, evidence, band, role) {
  const frame = EVIDENCE_FRAMES[evidence.id]
  const label = cleanSentence(evidence.name)
  const roleLine = {
    self: '이 자료는 제 쪽 조치의 경계선을 직접 묻습니다',
    other: '이 자료는 상대방 쪽 조치의 무게를 먼저 겨눕니다',
    institutional: '이 자료는 기관 기록이라 출처 자체가 흔들리지 않습니다',
    both: '이 자료는 두 사람 책임을 한 묶음으로 끌어옵니다',
  }[role]
  const bandLine = frame[band]
  const cautionLine = {
    early: '지금은 한쪽 결론으로 바로 닫을 자료는 아닙니다',
    mid: '이 자료를 두고 누가 먼저 선을 넘었는지 다시 따져야 합니다',
    late: '이 자료는 책임 비율을 다시 나누게 만드는 기준점입니다',
  }[band]
  const variants = [
    paragraph([`재판관님, ${label}는 ${frame.direct}`, bandLine]),
    paragraph([`재판관님, ${label}는 ${roleLine}`, bandLine]),
    paragraph([`${label}는 ${frame.direct}`, roleLine]),
    paragraph([`재판관님, ${label}를 보면 ${roleLine}`, cautionLine]),
    band === 'late'
      ? paragraph([`재판관님, ${label}는 더 미룰 수 없는 자료입니다`, frame.direct, '책임 비율은 나눠서 보셔야 합니다'])
      : paragraph([`재판관님, ${label}는 아직 해석 폭이 남아 있습니다`, frame.direct]),
  ]
  return variants.map((text, index) => ({
    id: `${party}|${evidence.id}|${band}|${role}#${index + 1}`,
    text,
    behaviorHint: evidenceBehavior(band, role, index),
  }))
}

function buildDossierQuestionMap() {
  const list = []
  for (const card of v3.dossierCards || []) {
    for (const challenge of card.challenges || []) {
      for (const question of challenge.questions || []) {
        list.push({
          id: question.id,
          targetParty: challenge.targetParty,
          cardName: card.name,
          relatedDisputes: card.relatedDisputes || [],
          attackVector: question.attackVector || 'context',
        })
      }
    }
  }
  return list
}

function dossierBehavior(band, index) {
  const bandHint = {
    early: '카드 압박을 아직 분산하려 합니다',
    mid: '카드 질문이 비어 있던 맥락을 메웁니다',
    late: '카드 질문을 더는 피하지 못하고 책임 비율까지 끌고 갑니다',
  }[band]
  const flavor = [
    '질문의 프레임을 먼저 확인합니다',
    '빠진 맥락을 덧붙여 정리합니다',
    '책임 비율까지 같이 조정하려 합니다',
  ][index]
  return `${bandHint}. ${flavor}.`
}

function attackVectorLine(vector) {
  return {
    identity: '이 질문은 누가 주도했는지를 바로 겨눕니다',
    authenticity: '이 질문은 자료의 진정성과 누락된 맥락을 겨눕니다',
    context: '이 질문은 선택의 배경과 연결 구조를 겨눕니다',
    legality: '이 질문은 허용 범위와 경계 침해를 겨눕니다',
  }[vector] || '이 질문은 빠진 맥락을 겨눕니다'
}

function buildDossierVariants(info, band) {
  const disputeId = info.relatedDisputes[0] || 'd-1'
  const frame = DISPUTE_FRAMES[disputeId]
  const bandLine = {
    early: '이 단계에서는 해명 여지가 아직 남아 있습니다',
    mid: '이제는 빠진 맥락을 더 직접적으로 채워야 합니다',
    late: '이 질문은 책임 비율까지 바로 끌고 갑니다',
  }[band]
  const focus = {
    early: frame.fact,
    mid: frame.motive,
    late: frame.empathy,
  }[band]
  const variants = [
    paragraph([`재판관님, ${info.cardName} 카드가 겨누는 쟁점은 ${frame.title}입니다`, bandLine]),
    paragraph([`재판관님, ${attackVectorLine(info.attackVector)}`, focus]),
    paragraph([`재판관님, ${info.cardName} 카드에서는 ${focus}`, bandLine]),
  ]
  return variants.map((text, index) => ({
    id: `${info.targetParty}|${info.id}|${band}#${index + 1}`,
    text,
    behaviorHint: dossierBehavior(band, index),
  }))
}

function witnessBehavior(depth, index) {
  const depthHint = {
    vague: '초기 진술답게 범위를 넓게 잡습니다',
    partial: '관찰 사실과 추정을 나누려 합니다',
    full: '기억을 순서대로 정리해 냅니다',
  }[depth]
  const flavor = [
    '조심스럽게 말을 시작합니다',
    '자기 위치를 의식하며 말합니다',
    '확정 가능한 부분을 더 또렷하게 꺼냅니다',
  ][index]
  return `${depthHint}. ${flavor}.`
}

function buildWitnessVariants(witnessId, depth) {
  const frame = WITNESS_FRAMES[witnessId]
  const name = frame.name
  const base = frame[depth]
  const variantsByDepth = {
    vague: [
      paragraph([`${name} 증인은 넓은 범위의 흐름만 먼저 진술합니다`, base]),
      paragraph([`${name} 증인은 직접 본 부분과 들은 부분을 아직 넓게 묶어 말합니다`, base]),
      paragraph([`${name} 증인은 아직 단정 대신 범위 설명에 머뭅니다`, '핵심 흐름만 짚고 세부 확정은 미룹니다']),
    ],
    partial: [
      paragraph([`${name} 증인은 직접 본 흐름과 전해 들은 흐름을 구분해 설명합니다`, base]),
      paragraph([`${name} 증인은 자기 위치를 숨기지 않은 채 관찰 범위를 한정해 진술합니다`, base]),
      paragraph([`${name} 증인은 관찰 사실과 추정을 나누어 말하려 합니다`, base]),
    ],
    full: [
      paragraph([`${name} 증인은 시간 순서에 따라 사건 경위를 정리해 진술합니다`, base, '관찰 범위와 해석 범위를 따로 설명합니다']),
      paragraph([`${name} 증인은 언제 무엇을 봤는지, 무엇은 전해 들었는지까지 분리해 설명합니다`, base, '확정 가능한 지점과 추정 지점을 구분합니다']),
      paragraph([`${name} 증인은 핵심 장면, 보고 경로, 뒤늦게 알게 된 정황까지 이어서 진술합니다`, base, '단정할 수 없는 부분은 단정하지 않겠다고 덧붙입니다']),
    ],
  }
  return variantsByDepth[depth].map((text, index) => ({
    id: `${witnessId}|${depth}#${index + 1}`,
    text,
    behaviorHint: witnessBehavior(depth, index),
  }))
}

const dossierQuestions = buildDossierQuestionMap()

const bundle = {
  schemaVersion: 1,
  caseId: CASE_ID,
  generatedAt: new Date().toISOString(),
  notes: [
    'spouse-11 stage2 scripted bootstrap generated from runtime case data and v3 dossier data.',
    'Generator fills interrogation, evidence_present, dossier, witness, aftermath, and system_message.',
    'This build avoids partner real-name leakage in judge-facing channels and restores formal Korean endings.',
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
      variants: buildWitnessVariants(witness.id, depth),
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
fs.writeFileSync(OUT_PATH, `${JSON.stringify(bundle, null, 2)}\n`, 'utf8')
console.log(`[spouse-11-stage2-scripted-bootstrap] wrote ${path.relative(ROOT, OUT_PATH)}`)
