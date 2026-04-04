/**
 * tenant-01 시나리오: 보증금 정산/원상복구 갈등
 * 윤하림(partyA, avoidant) vs 최상우(partyB, cold_logic)
 * 원본: tests/tenant-01-playthrough.cjs
 */
module.exports = {
  caseId: 'tenant-01',
  title: '보증금 정산/원상복구 갈등',

  casePath: 'src/data/cases/generated/tenant-01.json',
  atomsPath: 'docs/ref/리뉴얼참고/gpt-batch/tenant-01/tenant-01-v2-atoms.json',

  turns: [
    // 1~3턴: 윤하림 d-1 S1
    { label: '윤하림 d-1 S1 사실추궁', party: 'a', dispute: 'd-1', state: 'S1', action: 'fact_pursuit', question: '윤하림 씨, 마지막 월세를 5일 늦게 납부한 것이 사실입니까?' },
    { label: '윤하림 d-1 S1 동기탐색', party: 'a', dispute: 'd-1', state: 'S1', action: 'motive_search', question: '윤하림 씨, 월세 납부가 늦어진 이유가 무엇입니까?' },
    { label: '윤하림 d-1 S1 공감접근', party: 'a', dispute: 'd-1', state: 'S1', action: 'empathy_approach', question: '윤하림 씨, 이사를 앞두고 보증금 문제로 어떤 심정이셨습니까?' },

    // 4~5턴: 최상우 d-1/d-2 S1
    { label: '최상우 d-1 S1 사실추궁', party: 'b', dispute: 'd-1', state: 'S1', action: 'fact_pursuit', question: '최상우 씨, 세입자의 월세 지연 납부 사실을 확인하겠습니다.' },
    { label: '최상우 d-2 S1 사실추궁', party: 'b', dispute: 'd-2', state: 'S1', action: 'fact_pursuit', question: '최상우 씨, 거실 벽지 전면 교체가 필요하다고 판단하신 근거가 무엇입니까?' },

    // 6~7턴: 증거 e-1 양측
    { label: '윤하림 e-1 증거제시', party: 'a', dispute: 'd-2', state: 'S1', action: 'evidence_present', question: '윤하림 씨, 이 입주/퇴거 비교 사진에 대해 입장을 밝혀 주십시오.', evidenceId: 'e-1' },
    { label: '최상우 e-1 증거제시', party: 'b', dispute: 'd-2', state: 'S1', action: 'evidence_present', question: '최상우 씨, 이 입주/퇴거 비교 사진을 보시고 어떻게 생각하십니까?', evidenceId: 'e-1' },

    // 8~9턴: 윤하림 d-1 S2 / d-2 S2
    { label: '윤하림 d-1 S2 사실추궁', party: 'a', dispute: 'd-1', state: 'S2', action: 'fact_pursuit', question: '윤하림 씨, 월세 지연 경위에 대해 좀 더 구체적으로 말씀해 주십시오.' },
    { label: '윤하림 d-2 S2 동기탐색', party: 'a', dispute: 'd-2', state: 'S2', action: 'motive_search', question: '윤하림 씨, 반려묘로 인한 벽지 손상을 왜 미리 말씀하지 않으셨습니까?' },

    // 10~11턴: 최상우 d-2 S2
    { label: '최상우 d-2 S2 사실추궁', party: 'b', dispute: 'd-2', state: 'S2', action: 'fact_pursuit', question: '최상우 씨, 전면 교체 견적을 받으신 경위를 구체적으로 말씀해 주십시오.' },
    { label: '최상우 d-2 S2 공감접근', party: 'b', dispute: 'd-2', state: 'S2', action: 'empathy_approach', question: '최상우 씨, 세입자가 집을 손상시켰다고 느꼈을 때 어떤 심정이셨습니까?' },

    // 12~13턴: 증거 e-2/e-3
    { label: '윤하림 e-2 증거제시', party: 'a', dispute: 'd-1', state: 'S2', action: 'evidence_present', question: '윤하림 씨, 이 월세/관리비 입금 내역에 대해 입장을 밝혀 주십시오.', evidenceId: 'e-2' },
    { label: '최상우 e-3 증거제시', party: 'b', dispute: 'd-4', state: 'S1', action: 'evidence_present', question: '최상우 씨, 이 카카오톡 캡처와 통화 녹취 요약에 대해 설명해 주십시오.', evidenceId: 'e-3' },

    // 14~15턴: 윤하림 d-2 S3 / d-3 S1
    { label: '윤하림 d-2 S3 사실추궁(blame)', party: 'a', dispute: 'd-2', state: 'S3', action: 'fact_pursuit', question: '윤하림 씨, 벽지 손상 범위에 대해 사실관계가 분명하지 않습니다. 다시 설명해 주십시오.' },
    { label: '윤하림 d-3 S1 사실추궁', party: 'a', dispute: 'd-3', state: 'S1', action: 'fact_pursuit', question: '윤하림 씨, 욕실 수전 누수에 대해 집주인분께 언제 말씀하셨습니까?' },

    // 16~17턴: 최상우 d-2/d-5 S3
    { label: '최상우 d-2 S3 사실추궁', party: 'b', dispute: 'd-2', state: 'S3', action: 'fact_pursuit', question: '최상우 씨, 벽지 교체 범위에 대해 다시 정리해 주십시오.' },
    { label: '최상우 d-5 S1 사실추궁', party: 'b', dispute: 'd-5', state: 'S1', action: 'fact_pursuit', question: '최상우 씨, 전면 공제를 통보하신 범위가 계약 특약 기준에 맞는지 설명해 주십시오.' },

    // 18~19턴: 윤하림 S4 + 증거
    { label: '윤하림 d-2 S4 공감접근(emotional)', party: 'a', dispute: 'd-2', state: 'S4', action: 'empathy_approach', question: '윤하림 씨, 당시 심정을 충분히 듣겠습니다. 솔직하게 말씀해 주십시오.' },
    { label: '윤하림 e-4 증거제시', party: 'a', dispute: 'd-2', state: 'S2', action: 'evidence_present', question: '윤하림 씨, 이 벽지 부분보수/전면도배 비교 견적서에 대해 입장을 밝혀 주십시오.', evidenceId: 'e-4' },

    // 20턴: 윤하림 S5
    { label: '윤하림 d-1 S5 사실추궁(confess)', party: 'a', dispute: 'd-1', state: 'S5', action: 'fact_pursuit', question: '윤하림 씨, 이제 사실대로 말씀해 주십시오.' },
  ],

  sections: [
    { before: 0, title: '1~3턴: 윤하림 d-1 S1 초기 심문' },
    { before: 3, title: '4~5턴: 최상우 d-1/d-2 S1 초기 심문' },
    { before: 5, title: '6~7턴: 증거 e-1 제시' },
    { before: 7, title: '8~9턴: 윤하림 d-1/d-2 S2 부분 인정' },
    { before: 9, title: '10~11턴: 최상우 d-2 S2' },
    { before: 11, title: '12~13턴: 증거 e-2/e-3 제시' },
    { before: 13, title: '14~15턴: 윤하림 d-2 S3' },
    { before: 15, title: '16~17턴: 최상우 d-2/d-5 S3' },
    { before: 17, title: '18~19턴: 윤하림 S4 + 증거' },
    { before: 19, title: '20턴: 윤하림 d-1 S5 고백' },
  ]
}
