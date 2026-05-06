#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function makeInvestigationResults(label, detailA, detailB, detailC) {
  return {
    request_original: `${label} 원본 제출 경위와 보관 위치가 함께 확인됐다.`,
    check_metadata: detailA,
    restore_context: detailB,
    verify_source: `${label}의 출처와 전달 경로가 대조 가능한 형태로 남아 있다.`,
    check_edits: detailC,
    question_acquisition: `${label} 취득 경위와 사용 범위를 함께 따져야 한다.`,
  }
}

function makeEvidenceNode(existingMap, spec) {
  const base = clone(existingMap.get(spec.sourceId || spec.id) || {})
  const node = {
    ...base,
    id: spec.id,
    name: spec.name,
    description: spec.description,
    surfaceName: spec.surfaceName || spec.name,
    surfaceDescription: spec.surfaceDescription || spec.description,
    type: spec.type,
    reliability: spec.reliability || base.reliability || 'hard',
    completeness: spec.completeness || base.completeness || 'original',
    provenance: spec.provenance || base.provenance || 'institutional',
    legitimacy: spec.legitimacy || base.legitimacy || 'lawful',
    proves: spec.proves,
    isTrap: Boolean(spec.isTrap),
    requires: spec.requires || [],
    subjectParty: spec.subjectParty || base.subjectParty || 'both',
    investigationResults: spec.investigationResults || base.investigationResults || makeInvestigationResults(
      spec.name,
      `${spec.name}의 핵심 시점과 작성 흔적이 남아 있다.`,
      `${spec.name} 전후 맥락을 복원하면 표면 설명과 다른 구조가 드러난다.`,
      `${spec.name}에서 삭제·편집 또는 누락 여부를 추가 확인해야 한다.`,
    ),
  }

  if (spec.requiredLieState) node.requiredLieState = spec.requiredLieState
  else delete node.requiredLieState

  delete node.meta
  delete node.viewerData
  delete node.investigationStages
  delete node.partyContext
  return node
}

function applyDisputes(existingDisputes, specs) {
  const existingMap = new Map((existingDisputes || []).map((item) => [item.id, item]))
  return specs.map((spec) => {
    const base = clone(existingMap.get(spec.id) || {})
    return {
      ...base,
      id: spec.id,
      name: spec.name,
      truth: spec.truth,
      weight: spec.weight,
      legitimacyIssue: spec.legitimacyIssue,
    }
  })
}

function applyEvidence(existingEvidence, specs) {
  const existingMap = new Map((existingEvidence || []).map((item) => [item.id, item]))
  return specs.map((spec) => makeEvidenceNode(existingMap, spec))
}

const CORE6_SPECS = {
  'workplace-11': {
    baseEvidenceIds: ['e-1', 'e-2', 'e-3'],
    monetaryDisputeIds: [],
    witnessRelatedDisputeIds: {
      'tp-1': ['d-1', 'd-4', 'd-5'],
      'tp-2': ['d-2', 'd-3', 'd-4'],
      'tp-3': ['d-2', 'd-3'],
    },
    disputes: [
      { id: 'd-1', name: '발명자 목록 이름 삭제 사유', truth: true, weight: 'high', legitimacyIssue: false },
      { id: 'd-2', name: '브로커 전달 자료의 범위와 선행 제안', truth: true, weight: 'high', legitimacyIssue: true },
      { id: 'd-3', name: '유출은 단순 조회가 아니라 실제 반출인가', truth: true, weight: 'high', legitimacyIssue: false },
      { id: 'd-4', name: '서린은 발명자 삭제를 방패로 공모를 숨겼는가', truth: true, weight: 'high', legitimacyIssue: false },
      { id: 'd-5', name: '기밀 유출과 발명자 권리 분리를 어디까지 볼 것인가', truth: true, weight: 'medium', legitimacyIssue: false },
    ],
    evidence: [
      {
        id: 'e-1',
        name: '잠정출원 초안과 버전 이력',
        description: '출원 마감 직전 저장된 잠정출원 초안과 발명자 표기 변경 이력이 남아 있는 문서 묶음이다.',
        type: 'contract',
        proves: ['d-1', 'd-5'],
        requires: [],
        investigationResults: makeInvestigationResults(
          '잠정출원 초안',
          '권태준 이름만 남은 저장본이 마감 직전 생성됐고 직전 버전에는 노서린 이름이 함께 남아 있다.',
          '발명자 표기만 급하게 바뀌고 청구항 요약은 그대로 유지돼 단순 편집 이상의 의도가 드러난다.',
          '작성자와 수정자가 분리돼 있어 책임 분리가 가능하다.',
        ),
      },
      {
        id: 'e-2',
        name: '연구노트 원본과 실험 데이터 표',
        description: '노서린이 보관한 실험 노트 원본, 원데이터 요약표, 청구항 초안 메모가 함께 있는 연구 기록이다.',
        type: 'contract',
        proves: ['d-1', 'd-2', 'd-5'],
        requires: [],
        investigationResults: makeInvestigationResults(
          '연구노트 원본',
          '청구항 초안의 주요 표현과 실험 파라미터가 그대로 적혀 있다.',
          '단순 참고 메모가 아니라 외부 전달 시 민감한 핵심 데이터가 포함돼 있다.',
          '노트 일부가 외부 공유 가능한 형태로 재정리된 흔적이 확인된다.',
        ),
      },
      {
        id: 'e-3',
        name: '브로커 미팅 일정표와 방문 기록',
        description: '브로커 카페 미팅 일정표, 사전 위치 공유, 출입 확인 기록을 묶은 일정 자료다.',
        type: 'log',
        proves: ['d-2'],
        requires: [],
        investigationResults: makeInvestigationResults(
          '브로커 미팅 일정표',
          '외부 브로커와의 미팅 일정이 출원 마감 하루 전으로 잡혀 있다.',
          '공식 회의가 아닌 개인 미팅이었고 접촉 대상도 회사 외부인으로 확인된다.',
          '일정 공유 대상이 제한돼 있어 사전 공모 정황을 의심할 수 있다.',
        ),
      },
      {
        id: 'e-4',
        name: 'DLP 경보 로그',
        description: '잠정출원 초안과 관련된 자료가 외부 공유 시도로 탐지된 DLP 경보 원본 로그다.',
        type: 'log',
        proves: ['d-2', 'd-3'],
        requires: ['e-1'],
        requiredLieState: 'S1',
      },
      {
        id: 'e-5',
        name: '브로커 카페 영수증과 출입 기록',
        description: '브로커 미팅 당일의 결제 영수증, 출입 기록, 좌석 배치 메모를 묶은 자료다.',
        type: 'record',
        proves: ['d-2', 'd-4'],
        requires: ['e-4'],
        requiredLieState: 'S2',
      },
      {
        id: 'e-6',
        name: '외부 전송 ZIP 메타데이터',
        description: '실험 데이터와 청구항 초안이 담긴 압축파일의 메타데이터와 전송 흔적이다.',
        type: 'device',
        proves: ['d-2', 'd-3', 'd-4'],
        requires: ['e-2', 'e-5'],
        requiredLieState: 'S3',
      },
      {
        id: 'e-7',
        name: '수익 배분 합의 채팅',
        description: '브로커 건이 끝나면 나중에 나눠 갖자는 취지의 수익 배분 합의 대화다.',
        type: 'chat',
        proves: ['d-3', 'd-4', 'd-5'],
        requires: ['e-6'],
        requiredLieState: 'S4',
        subjectParty: 'both',
      },
    ],
    evidenceCombinations: [
      { requires: ['e-1', 'e-2'], upgradesTo: 'hard', proves: ['d-1', 'd-5'] },
      { requires: ['e-4', 'e-6'], upgradesTo: 'hard', proves: ['d-2', 'd-3'] },
      { requires: ['e-5', 'e-7'], upgradesTo: 'hard', proves: ['d-4', 'd-5'] },
    ],
  },
  'partnership-09': {
    baseEvidenceIds: ['e-1', 'e-2', 'e-3'],
    monetaryDisputeIds: ['d-3', 'd-4', 'd-5'],
    witnessRelatedDisputeIds: {
      'tp-1': ['d-1', 'd-5'],
      'tp-2': ['d-2', 'd-3', 'd-4'],
      'tp-3': ['d-1', 'd-2', 'd-5'],
    },
    disputes: [
      { id: 'd-1', name: '누가 공로를 단독 성과처럼 포장했는가', truth: true, weight: 'high', legitimacyIssue: false },
      { id: 'd-2', name: '평가 피드백 캡처 편집은 누가 했는가', truth: true, weight: 'medium', legitimacyIssue: true },
      { id: 'd-3', name: '다음 매장 실적과 절감률은 실제보다 부풀려졌는가', truth: true, weight: 'high', legitimacyIssue: true },
      { id: 'd-4', name: '허위 실적 공모를 누가 먼저 제안했는가', truth: true, weight: 'high', legitimacyIssue: true },
      { id: 'd-5', name: '지원기관 사후 점검을 어떤 방식으로 수습할 것인가', truth: true, weight: 'medium', legitimacyIssue: false },
    ],
    evidence: [
      {
        id: 'e-1',
        name: '기관 보도자료 초안',
        description: '지원금 교부 직후 배포된 보도자료 초안과 다예 단독 인터뷰 문안이다.',
        type: 'log',
        proves: ['d-1'],
        requires: [],
      },
      {
        id: 'e-2',
        name: '인센티브 배분표',
        description: '성과급·홍보 예산 배분 기준을 적어 둔 내부 분배표와 결재 메모다.',
        type: 'contract',
        proves: ['d-1', 'd-2'],
        requires: [],
      },
      {
        id: 'e-3',
        name: '다음 매장 실적 요약표',
        description: '실증 매장 수, 절감률, 다음 오픈 예정 매장 수를 요약한 내부 현황표다.',
        type: 'log',
        proves: ['d-3', 'd-4'],
        requires: [],
      },
      {
        id: 'e-4',
        name: '원본 에너지 대시보드 export',
        description: '실제 에너지 절감률이 기록된 원본 대시보드 export 파일이다.',
        type: 'log',
        proves: ['d-3', 'd-4'],
        requires: ['e-3'],
        requiredLieState: 'S1',
      },
      {
        id: 'e-5',
        name: '지원금 요청 부록 원본',
        description: '지원금 신청 부록 원본과 다음 매장 실적 보정 메모가 함께 남아 있다.',
        type: 'contract',
        proves: ['d-3', 'd-4', 'd-5'],
        requires: ['e-4'],
        requiredLieState: 'S2',
      },
      {
        id: 'e-6',
        name: '편집 전 평가 피드백 메일',
        description: '잘라내기 전 원본 평가 피드백 메일과 첨부 캡처 원본이다.',
        type: 'email',
        proves: ['d-1', 'd-2'],
        requires: ['e-2'],
        requiredLieState: 'S2',
      },
      {
        id: 'e-7',
        name: '이번만 같이 가자 채팅',
        description: '실적을 맞춰 넣고 이번만 같이 가자는 취지의 공동 확인 채팅이다.',
        type: 'chat',
        proves: ['d-3', 'd-4', 'd-5'],
        requires: ['e-5', 'e-6'],
        requiredLieState: 'S4',
        subjectParty: 'both',
      },
    ],
    evidenceCombinations: [
      { requires: ['e-2', 'e-6'], upgradesTo: 'hard', proves: ['d-1', 'd-2'] },
      { requires: ['e-3', 'e-4'], upgradesTo: 'hard', proves: ['d-3', 'd-4'] },
      { requires: ['e-5', 'e-7'], upgradesTo: 'hard', proves: ['d-4', 'd-5'] },
    ],
  },
  'tenant-09': {
    baseEvidenceIds: ['e-1', 'e-2', 'e-3'],
    monetaryDisputeIds: ['d-1', 'd-2', 'd-3', 'd-4', 'd-5'],
    witnessRelatedDisputeIds: {
      'tp-1': ['d-1', 'd-3', 'd-4'],
      'tp-2': ['d-1', 'd-2', 'd-5'],
      'tp-3': ['d-2', 'd-3', 'd-5'],
    },
    disputes: [
      { id: 'd-1', name: '계약서상 8천만원 보증금의 실제 귀속', truth: true, weight: 'high', legitimacyIssue: false },
      { id: 'd-2', name: '세라-우석의 보증금 부풀리기 공모', truth: true, weight: 'high', legitimacyIssue: true },
      { id: 'd-3', name: '태윤의 무항목 반환 지연과 공제', truth: true, weight: 'high', legitimacyIssue: false },
      { id: 'd-4', name: '세라의 실제 미납 월세와 철거비', truth: true, weight: 'medium', legitimacyIssue: false },
      { id: 'd-5', name: '태윤의 최종 계약서 확인 소홀', truth: true, weight: 'medium', legitimacyIssue: false },
    ],
    evidence: [
      { id: 'e-1', name: '최종 계약서와 변경 초안', description: '최종 계약서, 변경 전 초안, 보증금 숫자 수정 흔적이 함께 남아 있는 계약 문서다.', type: 'contract', proves: ['d-1', 'd-5'], requires: [] },
      { id: 'e-2', name: '태윤 계좌 입금 내역', description: '태윤에게 실제로 들어온 금액과 우석 측 수령 내역이 같이 남아 있는 송금 기록이다.', type: 'bank', proves: ['d-1', 'd-2'], requires: [] },
      { id: 'e-3', name: '퇴거 직후 방 상태 사진', description: '퇴거 직후 촬영된 점포 내부 사진, 간판 잔여물, 청소 상태를 보여 주는 자료다.', type: 'device', proves: ['d-4'], requires: [] },
      { id: 'e-4', name: '중개사 정산표 원본', description: '우석 사무실의 정산표 원본과 보증금 분배 메모가 함께 남아 있다.', type: 'record', proves: ['d-1', 'd-2'], requires: ['e-1', 'e-2'], requiredLieState: 'S1' },
      { id: 'e-5', name: '허위 정리비 청구서', description: '허위 정리비 항목과 컨설팅비 세금계산서를 묶은 정산 자료다.', type: 'receipt', proves: ['d-2', 'd-3'], requires: ['e-4'], requiredLieState: 'S2' },
      { id: 'e-6', name: '미납 월세·간판 철거 견적서', description: '실제 미납 월세 산정표와 간판 철거 견적서를 묶은 자료다.', type: 'estimate', proves: ['d-3', 'd-4'], requires: ['e-3'], requiredLieState: 'S2' },
      { id: 'e-7', name: '세라-우석 공모 채팅', description: '보증금을 크게 쓰고 정리비로 맞추자는 취지의 세라-우석 채팅이다.', type: 'chat', proves: ['d-2', 'd-5'], requires: ['e-5'], requiredLieState: 'S4', subjectParty: 'both' },
    ],
    evidenceCombinations: [
      { requires: ['e-1', 'e-2'], upgradesTo: 'hard', proves: ['d-1', 'd-5'] },
      { requires: ['e-4', 'e-5'], upgradesTo: 'hard', proves: ['d-2', 'd-3'] },
      { requires: ['e-3', 'e-6'], upgradesTo: 'hard', proves: ['d-3', 'd-4'] },
    ],
  },
  'spouse-12': {
    baseEvidenceIds: ['e-1', 'e-2', 'e-3'],
    monetaryDisputeIds: [],
    witnessRelatedDisputeIds: {
      'tp-1': ['d-2', 'd-5'],
      'tp-2': ['d-1', 'd-3', 'd-4'],
      'tp-3': ['d-3', 'd-4'],
    },
    disputes: [
      { id: 'd-1', name: '재우의 확인 없는 선제 전파', truth: true, weight: 'high', legitimacyIssue: true },
      { id: 'd-2', name: '세아의 백업 선별 은닉', truth: true, weight: 'medium', legitimacyIssue: false },
      { id: 'd-3', name: '익명 계정과 위조본 제작의 주체', truth: true, weight: 'high', legitimacyIssue: true },
      { id: 'd-4', name: '결정적 캡처는 2026년 위조본인가', truth: true, weight: 'high', legitimacyIssue: true },
      { id: 'd-5', name: '세아의 2006년 실제 행위 범위', truth: true, weight: 'high', legitimacyIssue: false },
    ],
    evidence: [
      { id: 'e-1', name: '익명 계정 업로드 캡처', description: '동창회 직후 익명 계정에 올라온 캡처 묶음과 게시 시간 기록이다.', type: 'sns', proves: ['d-1', 'd-3', 'd-4'], requires: [] },
      { id: 'e-2', name: '동창회 참석 명단', description: '행사 등록 명단, 좌석 배치, 와이파이 접속 사용자 표가 포함된 동창회 자료다.', type: 'contract', proves: ['d-3', 'd-5'], requires: [] },
      { id: 'e-3', name: '사우 채널 전달 로그 3종', description: '재우가 캡처를 각 채널로 전달한 시간표와 대상 목록을 묶은 로그다.', type: 'log', proves: ['d-1'], requires: [] },
      { id: 'e-4', name: '세아 백업 로드 흔적', description: '세아 백업 드라이브와 복원앱 사용 흔적이 남은 로그다.', type: 'device_log', proves: ['d-2', 'd-4'], requires: ['e-3'], requiredLieState: 'S1' },
      { id: 'e-5', name: '이미지 레이어 보고서', description: '문자 이미지와 방명록 캡처의 합성 흔적을 분석한 이미지 레이어 보고서다.', type: 'forensic_report', proves: ['d-3', 'd-4'], requires: ['e-1'], requiredLieState: 'S2' },
      { id: 'e-6', name: '2006년 메모와 동창 진술', description: '생활지도실 메모, 당시 메일 일부, 동창 진술을 묶은 과거 기록이다.', type: 'document', proves: ['d-2', 'd-5'], requires: ['e-4'], requiredLieState: 'S2' },
      { id: 'e-7', name: '위조 작업 DM', description: '캡처를 더 사실처럼 보이게 손보자는 DM과 템플릿 지시가 담긴 자료다.', type: 'chat', proves: ['d-3', 'd-4'], requires: ['e-5'], requiredLieState: 'S4', subjectParty: 'both' },
    ],
    evidenceCombinations: [
      { requires: ['e-1', 'e-5'], upgradesTo: 'hard', proves: ['d-3', 'd-4'] },
      { requires: ['e-4', 'e-6'], upgradesTo: 'hard', proves: ['d-2', 'd-5'] },
      { requires: ['e-3', 'e-7'], upgradesTo: 'hard', proves: ['d-1', 'd-3'] },
    ],
  },
  'family-09': {
    baseEvidenceIds: ['e-1', 'e-2', 'e-3'],
    monetaryDisputeIds: ['d-1', 'd-3', 'd-4', 'd-5'],
    witnessRelatedDisputeIds: {
      'tp-1': ['d-1', 'd-4', 'd-5'],
      'tp-2': ['d-1', 'd-3', 'd-5'],
      'tp-3': ['d-2', 'd-4', 'd-5'],
    },
    disputes: [
      { id: 'd-1', name: '형제의 계약 외 6,600만원 은닉 공모', truth: true, weight: 'high', legitimacyIssue: true },
      { id: 'd-2', name: '민아의 부모 위임장 선서명 유도', truth: true, weight: 'high', legitimacyIssue: true },
      { id: 'd-3', name: '도윤의 차액 선수령과 개인채무 상환', truth: true, weight: 'high', legitimacyIssue: true },
      { id: 'd-4', name: '부모는 보전금 구조까지 알고 동의했는가', truth: false, weight: 'high', legitimacyIssue: true },
      { id: 'd-5', name: '세금·명도비 핑계의 공동 축소 설명', truth: true, weight: 'medium', legitimacyIssue: false },
    ],
    evidence: [
      { id: 'e-1', name: '공식 매매계약서', description: '공식 매매계약서와 잔금 일정표, 표준 설명자료를 묶은 계약 문서다.', type: 'contract', proves: ['d-1', 'd-4', 'd-5'], requires: [] },
      { id: 'e-2', name: '부모 위임장 원본', description: '부모가 서명한 위임장 원본과 법무사 작성 기록, 수정 흔적이 포함돼 있다.', type: 'document', proves: ['d-2', 'd-4'], requires: [] },
      { id: 'e-3', name: '중개사 명도비 정산표', description: '중개사 측 명도비·수수료 정산표와 별도 보전금 메모가 남아 있는 자료다.', type: 'record', proves: ['d-1', 'd-5'], requires: [] },
      { id: 'e-4', name: '보전금 이체 캡처', description: '계약 외 보전금 이체 캡처와 분배 계좌 지시 내역이다.', type: 'bank', proves: ['d-1', 'd-3'], requires: ['e-1'], requiredLieState: 'S1' },
      { id: 'e-5', name: '도윤 채무 상환 내역', description: '도윤이 선수령한 차액 일부를 개인 채무 상환에 쓴 계좌 내역이다.', type: 'bank', proves: ['d-3'], requires: ['e-4'], requiredLieState: 'S2' },
      { id: 'e-6', name: '부모 생활비 메모와 상담 기록', description: '부모 생활비 메모, 상담 예약, 설명 누락 정황이 담긴 상담 기록이다.', type: 'institutional_note', proves: ['d-4', 'd-5'], requires: [], requiredLieState: 'S2' },
      { id: 'e-7', name: '중개사 3자 채팅', description: '민아, 도윤, 중개사가 보전금 구조와 설명 문구를 맞춘 3자 채팅이다.', type: 'chat', proves: ['d-1', 'd-2', 'd-5'], requires: ['e-2', 'e-5'], requiredLieState: 'S4', subjectParty: 'both' },
    ],
    evidenceCombinations: [
      { requires: ['e-1', 'e-4'], upgradesTo: 'hard', proves: ['d-1', 'd-5'] },
      { requires: ['e-2', 'e-7'], upgradesTo: 'hard', proves: ['d-1', 'd-2'] },
      { requires: ['e-5', 'e-6'], upgradesTo: 'hard', proves: ['d-3', 'd-4'] },
    ],
  },
  'neighbor-08': {
    baseEvidenceIds: ['e-1', 'e-2', 'e-3'],
    monetaryDisputeIds: [],
    witnessRelatedDisputeIds: {
      'tp-1': ['d-1', 'd-4', 'd-5'],
      'tp-2': ['d-2', 'd-3', 'd-4'],
      'tp-3': ['d-1', 'd-2', 'd-5'],
    },
    disputes: [
      { id: 'd-1', name: '민석은 초반 촬영각 초과를 즉시 고지하지 않았는가', truth: true, weight: 'high', legitimacyIssue: true },
      { id: 'd-2', name: '하린은 원본 확인 전 공개 낙인과 위조 유포를 했는가', truth: true, weight: 'high', legitimacyIssue: true },
      { id: 'd-3', name: '27초 클립은 원본이 아니라 편집본인가', truth: true, weight: 'high', legitimacyIssue: true },
      { id: 'd-4', name: '카메라는 하린 집 내부를 추적하지 않았는가', truth: true, weight: 'high', legitimacyIssue: false },
      { id: 'd-5', name: '관리실 확인 우선 원칙을 누가 깨뜨렸는가', truth: true, weight: 'medium', legitimacyIssue: false },
    ],
    evidence: [
      { id: 'e-1', name: '설치 직후 프리뷰 캡처', description: '설치 직후 프리뷰 각도와 도어매트 노출 범위를 보여 주는 초기 캡처다.', type: 'device', proves: ['d-1'], requires: [] },
      { id: 'e-2', name: '27초 단체방 유포 클립', description: '주민방에 공유된 27초 편집 클립과 게시 시각 기록이다.', type: 'cctv', proves: ['d-2', 'd-3', 'd-4'], requires: [] },
      { id: 'e-3', name: '관리실 설치 안내문', description: '관리실이 배포한 설치 안내문, 촬영각 기준, 통보 원칙을 묶은 문서다.', type: 'contract', proves: ['d-1', 'd-5'], requires: [] },
      { id: 'e-4', name: 'SD카드 원본 영상', description: '프리뷰와 본촬영이 이어진 원본 SD카드 영상과 기기 타임라인이다.', type: 'device', proves: ['d-3', 'd-4'], requires: ['e-2'], requiredLieState: 'S1' },
      { id: 'e-5', name: '초기 촬영각 조정 로그', description: '이틀간 촬영각을 조정한 서비스 로그와 문의 답변 기록이다.', type: 'log', proves: ['d-1', 'd-5'], requires: ['e-1'], requiredLieState: 'S2' },
      { id: 'e-6', name: '귀가 시간표 게시 캡처', description: '민석이 방어한다며 하린의 귀가 시간표를 주민방에 올린 게시 캡처다.', type: 'sns', proves: ['d-2', 'd-5'], requires: ['e-4'], requiredLieState: 'S2' },
      { id: 'e-7', name: '편집 작업 기록', description: '하린 측 편집본 제작 흔적과 컷 분리 작업 기록이다.', type: 'device_log', proves: ['d-2', 'd-3'], requires: ['e-4'], requiredLieState: 'S4', subjectParty: 'b' },
    ],
    evidenceCombinations: [
      { requires: ['e-2', 'e-4'], upgradesTo: 'hard', proves: ['d-2', 'd-3', 'd-4'] },
      { requires: ['e-1', 'e-5'], upgradesTo: 'hard', proves: ['d-1', 'd-5'] },
      { requires: ['e-4', 'e-6'], upgradesTo: 'hard', proves: ['d-2', 'd-5'] },
    ],
  },
}

function applyWitnessRelatedDisputeIds(socialGraph, mapping) {
  return (socialGraph || []).map((witness) => ({
    ...witness,
    relatedDisputeIds: Array.isArray(mapping?.[witness.id]) ? clone(mapping[witness.id]) : [],
  }))
}

function applyCore6Redesign(runtimeCase, caseId) {
  const spec = CORE6_SPECS[caseId]
  if (!spec) return runtimeCase
  runtimeCase.caseId = `case-${caseId}`
  runtimeCase.disputes = applyDisputes(runtimeCase.disputes, spec.disputes)
  runtimeCase.evidence = applyEvidence(runtimeCase.evidence, spec.evidence)
  runtimeCase.evidenceCombinations = clone(spec.evidenceCombinations)
  runtimeCase.baseEvidenceIds = clone(spec.baseEvidenceIds)
  runtimeCase.monetaryDisputeIds = clone(spec.monetaryDisputeIds || [])
  runtimeCase.duo = runtimeCase.duo || {}
  runtimeCase.duo.socialGraph = applyWitnessRelatedDisputeIds(
    runtimeCase.duo.socialGraph,
    spec.witnessRelatedDisputeIds,
  )
  runtimeCase.generatedAt = new Date().toISOString()
  runtimeCase.pipelineNotes = [
    ...(runtimeCase.pipelineNotes || []),
    `Core6 redesign applied for ${caseId} from Thread-E phase2 design.`,
  ]
  return runtimeCase
}

function compileCore6Runtime(root, caseId) {
  const outPath = path.join(root, 'src', 'data', 'cases', 'generated', `${caseId}.json`)
  const runtimeCase = applyCore6Redesign(readJson(outPath), caseId)
  writeJson(outPath, runtimeCase)
  return { caseId, outPath, runtimeCase }
}

module.exports = {
  applyCore6Redesign,
  compileCore6Runtime,
}
