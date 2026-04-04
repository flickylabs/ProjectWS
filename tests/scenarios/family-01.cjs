/**
 * family-01 시나리오: 부모 간병비 갈등
 * 윤서아(partyA, victim_cosplay) vs 윤도현(partyB, cold_logic)
 * 원본: tests/family-01-playthrough.cjs
 */
module.exports = {
  caseId: 'family-01',
  title: '부모 간병비 갈등',

  casePath: 'src/data/cases/generated/family-01.json',
  atomsPath: 'docs/ref/리뉴얼참고/gpt-session2/output/family-01-v2-atoms.json',

  turns: [
    // 1~3턴: 윤서아 d-1 S1 초기 심문
    { label: '윤서아 d-1 S1 사실추궁', party: 'a', dispute: 'd-1', state: 'S1', action: 'fact_pursuit', question: '윤서아 씨, 부모님 관리계좌에서 본인 계좌로 이체된 건에 대해 사실 여부를 확인하겠습니다.' },
    { label: '윤서아 d-1 S1 동기탐색', party: 'a', dispute: 'd-1', state: 'S1', action: 'motive_search', question: '윤서아 씨, 부모님 계좌에서 돈을 옮긴 이유가 무엇입니까?' },
    { label: '윤서아 d-1 S1 공감접근', party: 'a', dispute: 'd-1', state: 'S1', action: 'empathy_approach', question: '윤서아 씨, 간병을 혼자 떠안았다는 심정을 말씀해 주시겠습니까?' },

    // 4~5턴: 윤도현 d-1/d-2 S1
    { label: '윤도현 d-1 S1 사실추궁', party: 'b', dispute: 'd-1', state: 'S1', action: 'fact_pursuit', question: '윤도현 씨, 누나분이 부모님 계좌에서 돈을 옮긴 사실을 언제 알게 되셨습니까?' },
    { label: '윤도현 d-2 S1 사실추궁', party: 'b', dispute: 'd-2', state: 'S1', action: 'fact_pursuit', question: '윤도현 씨, 간병비 분담금 입금이 지연된 것이 사실입니까?' },

    // 6~7턴: 증거 e-1 양측
    { label: '윤서아 e-1 증거제시', party: 'a', dispute: 'd-1', state: 'S1', action: 'evidence_present', question: '윤서아 씨, 이 거래내역서에 대해 입장을 밝혀 주십시오.', evidenceId: 'e-1' },
    { label: '윤도현 e-1 증거제시', party: 'b', dispute: 'd-1', state: 'S1', action: 'evidence_present', question: '윤도현 씨, 이 거래내역서를 보시고 어떻게 생각하십니까?', evidenceId: 'e-1' },

    // 8~9턴: 윤서아 d-1 S2
    { label: '윤서아 d-1 S2 사실추궁', party: 'a', dispute: 'd-1', state: 'S2', action: 'fact_pursuit', question: '윤서아 씨, 이체한 금액의 용처에 대해 좀 더 구체적으로 말씀해 주십시오.' },
    { label: '윤서아 d-1 S2 동기탐색', party: 'a', dispute: 'd-1', state: 'S2', action: 'motive_search', question: '윤서아 씨, 왜 공유표에 기록하지 않고 먼저 이체하셨습니까?' },

    // 10~11턴: 윤도현 d-2 S2
    { label: '윤도현 d-2 S2 사실추궁', party: 'b', dispute: 'd-2', state: 'S2', action: 'fact_pursuit', question: '윤도현 씨, 간병비 분담금을 12일 늦게 입금한 경위를 구체적으로 말씀해 주십시오.' },
    { label: '윤도현 d-2 S2 공감접근', party: 'b', dispute: 'd-2', state: 'S2', action: 'empathy_approach', question: '윤도현 씨, 누나분이 혼자 간병을 떠안았다고 느꼈을 때 어떤 심정이셨습니까?' },

    // 12~13턴: 증거 e-2/e-3
    { label: '윤서아 e-2 증거제시 S2', party: 'a', dispute: 'd-1', state: 'S2', action: 'evidence_present', question: '윤서아 씨, 이 휴대폰 메모 복원본에 대해 입장을 밝혀 주십시오.', evidenceId: 'e-2' },
    { label: '윤도현 e-3 증거제시', party: 'b', dispute: 'd-2', state: 'S2', action: 'evidence_present', question: '윤도현 씨, 이 가족 단톡과 간병 스케줄표를 보시고 설명해 주십시오.', evidenceId: 'e-3' },

    // 14~15턴: 윤서아 d-1 S3
    { label: '윤서아 d-1 S3 사실추궁(blame)', party: 'a', dispute: 'd-1', state: 'S3', action: 'fact_pursuit', question: '윤서아 씨, 사실관계가 분명하지 않습니다. 다시 설명해 주십시오.' },
    { label: '윤서아 d-1 S3 동기탐색(partial)', party: 'a', dispute: 'd-1', state: 'S3', action: 'motive_search', question: '윤서아 씨, 왜 그런 판단을 내리셨는지 아직 납득이 되지 않습니다.' },

    // 16~17턴: 윤도현 d-2/d-3 S3
    { label: '윤도현 d-2 S3 사실추궁', party: 'b', dispute: 'd-2', state: 'S3', action: 'fact_pursuit', question: '윤도현 씨, 간병비 지연과 교대 공백에 대해 다시 한번 정리해 주십시오.' },
    { label: '윤도현 d-3 S1 사실추궁', party: 'b', dispute: 'd-3', state: 'S1', action: 'fact_pursuit', question: '윤도현 씨, 아버지 수첩 메모를 상속 예고로 보신 이유가 무엇입니까?' },

    // 18~19턴: 윤서아 S4 + 증거
    { label: '윤서아 d-1 S4 공감접근(emotional)', party: 'a', dispute: 'd-1', state: 'S4', action: 'empathy_approach', question: '윤서아 씨, 당시 심정을 충분히 듣겠습니다. 솔직하게 말씀해 주십시오.' },
    { label: '윤서아 e-4 증거제시', party: 'a', dispute: 'd-3', state: 'S1', action: 'evidence_present', question: '윤서아 씨, 이 아버지 수첩 메모 사진에 대해 입장을 밝혀 주십시오.', evidenceId: 'e-4' },

    // 20턴: 윤서아 S5
    { label: '윤서아 d-1 S5 사실추궁(confess)', party: 'a', dispute: 'd-1', state: 'S5', action: 'fact_pursuit', question: '윤서아 씨, 이제 사실대로 말씀해 주십시오.' },
  ],

  sections: [
    { before: 0, title: '1~3턴: 윤서아 d-1 S1 초기 심문' },
    { before: 3, title: '4~5턴: 윤도현 d-1/d-2 S1 초기 심문' },
    { before: 5, title: '6~7턴: 증거 e-1 제시' },
    { before: 7, title: '8~9턴: 윤서아 d-1 S2 부분 인정' },
    { before: 9, title: '10~11턴: 윤도현 d-2 S2' },
    { before: 11, title: '12~13턴: 증거 e-2/e-3 제시' },
    { before: 13, title: '14~15턴: 윤서아 d-1 S3' },
    { before: 15, title: '16~17턴: 윤도현 d-2/d-3 S3' },
    { before: 17, title: '18~19턴: 윤서아 S4 + 증거' },
    { before: 19, title: '20턴: 윤서아 d-1 S5 고백' },
  ]
}
