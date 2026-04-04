/**
 * neighbor-01 시나리오: 누수/촬영/소음 갈등
 * 정한결(partyA, confrontational) vs 이주연(partyB, avoidant)
 * 원본: tests/neighbor-01-playthrough.cjs
 */
module.exports = {
  caseId: 'neighbor-01',
  title: '누수/촬영/소음 갈등',

  casePath: 'src/data/cases/generated/neighbor-01.json',
  atomsPath: 'docs/ref/리뉴얼참고/gpt-batch/neighbor-01/neighbor-01-v2-atoms.json',

  turns: [
    // 1~3턴: 정한결 d-1 S1
    { label: '정한결 d-1 S1 사실추궁', party: 'a', dispute: 'd-1', state: 'S1', action: 'fact_pursuit', question: '정한결 씨, 504호 현관 앞에서 촬영한 것이 사실입니까?' },
    { label: '정한결 d-1 S1 동기탐색', party: 'a', dispute: 'd-1', state: 'S1', action: 'motive_search', question: '정한결 씨, 새벽에 복도에서 촬영한 이유가 무엇입니까?' },
    { label: '정한결 d-1 S1 공감접근', party: 'a', dispute: 'd-1', state: 'S1', action: 'empathy_approach', question: '정한결 씨, 딸이 새벽에 물소리에 깨는 상황에서 어떤 심정이셨습니까?' },

    // 4~5턴: 이주연 d-1/d-2 S1
    { label: '이주연 d-1 S1 사실추궁', party: 'b', dispute: 'd-1', state: 'S1', action: 'fact_pursuit', question: '이주연 씨, 아래층에서 본인 현관을 촬영했다는 사실을 알고 계셨습니까?' },
    { label: '이주연 d-2 S1 사실추궁', party: 'b', dispute: 'd-2', state: 'S1', action: 'fact_pursuit', question: '이주연 씨, 제습기와 물받이를 복도에 48시간 동안 두었다는 것이 사실입니까?' },

    // 6~7턴: 증거 e-1 양측
    { label: '정한결 e-1 증거제시', party: 'a', dispute: 'd-1', state: 'S1', action: 'evidence_present', question: '정한결 씨, 이 새벽 복도 촬영 영상 캡처에 대해 입장을 밝혀 주십시오.', evidenceId: 'e-1' },
    { label: '이주연 e-1 증거제시', party: 'b', dispute: 'd-1', state: 'S1', action: 'evidence_present', question: '이주연 씨, 이 촬영 캡처를 보시고 어떻게 생각하십니까?', evidenceId: 'e-1' },

    // 8~9턴: 정한결 d-1 S2
    { label: '정한결 d-1 S2 사실추궁', party: 'a', dispute: 'd-1', state: 'S2', action: 'fact_pursuit', question: '정한결 씨, 촬영 횟수와 범위에 대해 좀 더 구체적으로 말씀해 주십시오.' },
    { label: '정한결 d-1 S2 동기탐색', party: 'a', dispute: 'd-1', state: 'S2', action: 'motive_search', question: '정한결 씨, 관리사무소에 먼저 연락하지 않고 직접 촬영한 이유가 무엇입니까?' },

    // 10~11턴: 이주연 d-2 S2
    { label: '이주연 d-2 S2 사실추궁', party: 'b', dispute: 'd-2', state: 'S2', action: 'fact_pursuit', question: '이주연 씨, 아래층에 연락을 31시간 늦게 보낸 경위를 구체적으로 말씀해 주십시오.' },
    { label: '이주연 d-2 S2 공감접근', party: 'b', dispute: 'd-2', state: 'S2', action: 'empathy_approach', question: '이주연 씨, 복도에 물건을 두고 아래층 분에게 연락이 늦어진 것에 대해 어떤 심정이셨습니까?' },

    // 12~13턴: 증거 e-2/e-3
    { label: '정한결 e-2 증거제시', party: 'a', dispute: 'd-3', state: 'S1', action: 'evidence_present', question: '정한결 씨, 이 누수 점검 보고서에 대해 입장을 밝혀 주십시오.', evidenceId: 'e-2' },
    { label: '이주연 e-3 증거제시', party: 'b', dispute: 'd-2', state: 'S2', action: 'evidence_present', question: '이주연 씨, 이 CCTV 기록과 출입대장에 대해 설명해 주십시오.', evidenceId: 'e-3' },

    // 14~15턴: 정한결 d-1 S3 / d-3 S1
    { label: '정한결 d-1 S3 사실추궁(blame)', party: 'a', dispute: 'd-1', state: 'S3', action: 'fact_pursuit', question: '정한결 씨, 촬영 건에 대해 사실관계가 분명하지 않습니다. 다시 설명해 주십시오.' },
    { label: '정한결 d-3 S1 사실추궁', party: 'a', dispute: 'd-3', state: 'S1', action: 'fact_pursuit', question: '정한결 씨, 누수 원인이 윗집이라고 판단하신 근거가 무엇입니까?' },

    // 16~17턴: 이주연 d-2/d-3 S3
    { label: '이주연 d-2 S3 사실추궁', party: 'b', dispute: 'd-2', state: 'S3', action: 'fact_pursuit', question: '이주연 씨, 복도 적치와 연락 지연에 대해 다시 정리해 주십시오.' },
    { label: '이주연 d-3 S1 사실추궁', party: 'b', dispute: 'd-3', state: 'S1', action: 'fact_pursuit', question: '이주연 씨, 누수 원인이 본인 집 배수 문제가 아니라고 생각하시는 이유가 무엇입니까?' },

    // 18~19턴: 정한결 S4 + 증거
    { label: '정한결 d-1 S4 공감접근(emotional)', party: 'a', dispute: 'd-1', state: 'S4', action: 'empathy_approach', question: '정한결 씨, 당시 심정을 충분히 듣겠습니다. 솔직하게 말씀해 주십시오.' },
    { label: '정한결 e-4 증거제시', party: 'a', dispute: 'd-3', state: 'S2', action: 'evidence_present', question: '정한결 씨, 이 옥상 우수관 막힘 사진과 보수 영수증에 대해 입장을 밝혀 주십시오.', evidenceId: 'e-4' },

    // 20턴: 정한결 S5
    { label: '정한결 d-1 S5 사실추궁(confess)', party: 'a', dispute: 'd-1', state: 'S5', action: 'fact_pursuit', question: '정한결 씨, 이제 사실대로 말씀해 주십시오.' },
  ],

  sections: [
    { before: 0, title: '1~3턴: 정한결 d-1 S1 초기 심문' },
    { before: 3, title: '4~5턴: 이주연 d-1/d-2 S1 초기 심문' },
    { before: 5, title: '6~7턴: 증거 e-1 제시' },
    { before: 7, title: '8~9턴: 정한결 d-1 S2 부분 인정' },
    { before: 9, title: '10~11턴: 이주연 d-2 S2' },
    { before: 11, title: '12~13턴: 증거 e-2/e-3 제시' },
    { before: 13, title: '14~15턴: 정한결 d-1 S3' },
    { before: 15, title: '16~17턴: 이주연 d-2/d-3 S3' },
    { before: 17, title: '18~19턴: 정한결 S4 + 증거' },
    { before: 19, title: '20턴: 정한결 d-1 S5 고백' },
  ]
}
