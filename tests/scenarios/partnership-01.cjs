/**
 * partnership-01 시나리오: 법인계좌 예치금 갈등
 * 이서준(partyA, cold_logic) vs 윤해나(partyB, confrontational)
 * 원본: tests/partnership-01-playthrough.cjs
 */
module.exports = {
  caseId: 'partnership-01',
  title: '법인계좌 예치금 갈등',

  casePath: 'src/data/cases/generated/partnership-01.json',
  atomsPath: 'docs/ref/리뉴얼참고/gpt-batch/partnership-01/partnership-01-v2-atoms.json',

  turns: [
    // 1~3턴: 이서준 d-1 S1
    { label: '이서준 d-1 S1 사실추궁', party: 'a', dispute: 'd-1', state: 'S1', action: 'fact_pursuit', question: '이서준 씨, 법인 준비금 계좌에서 송금한 건에 대해 사실 여부를 확인하겠습니다.' },
    { label: '이서준 d-1 S1 동기탐색', party: 'a', dispute: 'd-1', state: 'S1', action: 'motive_search', question: '이서준 씨, 동업자 서면 승인 없이 송금한 이유가 무엇입니까?' },
    { label: '이서준 d-1 S1 공감접근', party: 'a', dispute: 'd-1', state: 'S1', action: 'empathy_approach', question: '이서준 씨, 회사 자금 문제로 동업자와 갈등이 생겼을 때 어떤 심정이셨습니까?' },

    // 4~5턴: 윤해나 d-1/d-2 S1
    { label: '윤해나 d-1 S1 사실추궁', party: 'b', dispute: 'd-1', state: 'S1', action: 'fact_pursuit', question: '윤해나 씨, 동업자가 법인 준비금을 송금한 사실을 언제 알게 되셨습니까?' },
    { label: '윤해나 d-2 S1 사실추궁', party: 'b', dispute: 'd-2', state: 'S1', action: 'fact_pursuit', question: '윤해나 씨, 예치금이 동업자의 개인 채무 상환이라고 판단한 근거가 무엇입니까?' },

    // 6~7턴: 증거 e-1 양측
    { label: '이서준 e-1 증거제시', party: 'a', dispute: 'd-1', state: 'S1', action: 'evidence_present', question: '이서준 씨, 이 법인계좌 송금 내역서에 대해 입장을 밝혀 주십시오.', evidenceId: 'e-1' },
    { label: '윤해나 e-1 증거제시', party: 'b', dispute: 'd-1', state: 'S1', action: 'evidence_present', question: '윤해나 씨, 이 송금 내역서를 보시고 어떻게 생각하십니까?', evidenceId: 'e-1' },

    // 8~9턴: 이서준 d-1 S2
    { label: '이서준 d-1 S2 사실추궁', party: 'a', dispute: 'd-1', state: 'S2', action: 'fact_pursuit', question: '이서준 씨, 송금 금액의 용처에 대해 좀 더 구체적으로 말씀해 주십시오.' },
    { label: '이서준 d-1 S2 동기탐색', party: 'a', dispute: 'd-1', state: 'S2', action: 'motive_search', question: '이서준 씨, 왜 서면 승인 없이 먼저 집행하셨습니까? 당시 어떤 판단이 있었습니까?' },

    // 10~11턴: 윤해나 d-2 S2
    { label: '윤해나 d-2 S2 사실추궁', party: 'b', dispute: 'd-2', state: 'S2', action: 'fact_pursuit', question: '윤해나 씨, 예치금 성격에 대해 좀 더 구체적으로 말씀해 주십시오.' },
    { label: '윤해나 d-2 S2 공감접근', party: 'b', dispute: 'd-2', state: 'S2', action: 'empathy_approach', question: '윤해나 씨, 회사 자금이 승인 없이 빠져나갔다는 걸 알았을 때 어떤 심정이셨습니까?' },

    // 12~13턴: 증거 e-2/e-3
    { label: '이서준 e-2 증거제시 S2', party: 'a', dispute: 'd-1', state: 'S2', action: 'evidence_present', question: '이서준 씨, 이 브리지 투자 예치계약 초안에 대해 입장을 밝혀 주십시오.', evidenceId: 'e-2' },
    { label: '윤해나 e-3 증거제시', party: 'b', dispute: 'd-2', state: 'S2', action: 'evidence_present', question: '윤해나 씨, 이 크롭된 메신저 캡처에 대해 설명해 주십시오.', evidenceId: 'e-3' },

    // 14~15턴: 이서준 d-1 S3
    { label: '이서준 d-1 S3 사실추궁(blame)', party: 'a', dispute: 'd-1', state: 'S3', action: 'fact_pursuit', question: '이서준 씨, 사실관계가 분명하지 않습니다. 다시 설명해 주십시오.' },
    { label: '이서준 d-1 S3 동기탐색(partial)', party: 'a', dispute: 'd-1', state: 'S3', action: 'motive_search', question: '이서준 씨, 왜 그런 판단을 내리셨는지 아직 납득이 되지 않습니다.' },

    // 16~17턴: 윤해나 d-2/d-3 S3
    { label: '윤해나 d-2 S3 사실추궁', party: 'b', dispute: 'd-2', state: 'S3', action: 'fact_pursuit', question: '윤해나 씨, 예치금 관련 판단에 대해 다시 정리해 주십시오.' },
    { label: '윤해나 d-3 S1 사실추궁', party: 'b', dispute: 'd-3', state: 'S1', action: 'fact_pursuit', question: '윤해나 씨, 2주년 회식 때 구두로 동의하신 사실이 있습니까?' },

    // 18~19턴: 이서준 S4 + 증거
    { label: '이서준 d-1 S4 공감접근(emotional)', party: 'a', dispute: 'd-1', state: 'S4', action: 'empathy_approach', question: '이서준 씨, 당시 심정을 충분히 듣겠습니다. 솔직하게 말씀해 주십시오.' },
    { label: '이서준 e-4 증거제시', party: 'a', dispute: 'd-3', state: 'S1', action: 'evidence_present', question: '이서준 씨, 이 2주년 회식 후 원본 단톡과 음성메모에 대해 입장을 밝혀 주십시오.', evidenceId: 'e-4' },

    // 20턴: 이서준 S5
    { label: '이서준 d-1 S5 사실추궁(confess)', party: 'a', dispute: 'd-1', state: 'S5', action: 'fact_pursuit', question: '이서준 씨, 이제 사실대로 말씀해 주십시오.' },
  ],

  sections: [
    { before: 0, title: '1~3턴: 이서준 d-1 S1 초기 심문' },
    { before: 3, title: '4~5턴: 윤해나 d-1/d-2 S1 초기 심문' },
    { before: 5, title: '6~7턴: 증거 e-1 제시' },
    { before: 7, title: '8~9턴: 이서준 d-1 S2 부분 인정' },
    { before: 9, title: '10~11턴: 윤해나 d-2 S2' },
    { before: 11, title: '12~13턴: 증거 e-2/e-3 제시' },
    { before: 13, title: '14~15턴: 이서준 d-1 S3' },
    { before: 15, title: '16~17턴: 윤해나 d-2/d-3 S3' },
    { before: 17, title: '18~19턴: 이서준 S4 + 증거' },
    { before: 19, title: '20턴: 이서준 d-1 S5 고백' },
  ]
}
