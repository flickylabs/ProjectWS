/**
 * spouse-01 시나리오: 부부 비밀 송금 갈등
 * 한지석(partyA, avoidant) vs 오세린(partyB, confrontational)
 * 원본: tests/full-playthrough-v2.cjs
 */
module.exports = {
  caseId: 'spouse-01',
  title: '부부 비밀 송금 갈등',

  casePath: 'src/data/cases/generated/spouse-01.json',
  atomsPath: 'src/data/claimPolicies/spouse-01-v2-atoms.json',

  turns: [
    // 1~3턴: 한지석 d-1 초기 심문
    { label: '한지석 d-1 사실추궁', party: 'a', dispute: 'd-1', state: 'S1', action: 'fact_pursuit', question: '한지석 씨, 송금 건에 대해 사실 여부를 확인하겠습니다.' },
    { label: '한지석 d-1 동기탐색', party: 'a', dispute: 'd-1', state: 'S1', action: 'motive_search', question: '한지석 씨, 송금 건과 관련하여 그렇게 하신 이유가 무엇입니까?' },
    { label: '한지석 d-1 공감접근', party: 'a', dispute: 'd-1', state: 'S1', action: 'empathy_approach', question: '한지석 씨, 송금 건 당시 어떤 심정이셨는지 말씀해 주시겠습니까?' },

    // 4턴: 오세린 d-2 사실추궁
    { label: '오세린 d-2 사실추궁', party: 'b', dispute: 'd-2', state: 'S1', action: 'fact_pursuit', question: '오세린 씨, 새벽 휴대폰 열람 건에 대해 사실 여부를 확인하겠습니다.' },

    // 5턴: 증거 e-1 → 한지석
    { label: '한지석 e-1 증거제시', party: 'a', dispute: 'd-1', state: 'S1', action: 'evidence_present', question: '한지석 씨, 이 거래 내역서에 대해 입장을 밝혀 주십시오.', evidenceId: 'e-1' },

    // 6턴: 증거 e-1 → 오세린
    { label: '오세린 e-1 증거제시', party: 'b', dispute: 'd-1', state: 'S1', action: 'evidence_present', question: '오세린 씨, 이 거래 내역서를 보시고 어떻게 생각하십니까?', evidenceId: 'e-1' },

    // 7턴: 증거 e-3 → 오세린
    { label: '오세린 e-3 증거제시', party: 'b', dispute: 'd-2', state: 'S1', action: 'evidence_present', question: '오세린 씨, 이 메신저 캡처에 대해 설명해 주십시오.', evidenceId: 'e-3' },

    // 8~9턴: 한지석 d-1 S2
    { label: '한지석 d-1 S2 사실추궁', party: 'a', dispute: 'd-1', state: 'S2', action: 'fact_pursuit', question: '한지석 씨, 송금 건에 대해 좀 더 구체적으로 말씀해 주십시오.' },
    { label: '한지석 d-1 S2 동기탐색', party: 'a', dispute: 'd-1', state: 'S2', action: 'motive_search', question: '한지석 씨, 왜 그런 선택을 하셨습니까? 당시 어떤 판단이 있었습니까?' },

    // 10~11턴: 오세린 d-2 S2
    { label: '오세린 d-2 S2 사실추궁', party: 'b', dispute: 'd-2', state: 'S2', action: 'fact_pursuit', question: '오세린 씨, 새벽 휴대폰 열람 건에 대해 좀 더 구체적으로 말씀해 주십시오.' },
    { label: '오세린 d-2 S2 공감접근', party: 'b', dispute: 'd-2', state: 'S2', action: 'empathy_approach', question: '오세린 씨, 새벽 휴대폰 열람 건 당시 가장 어려웠던 부분이 무엇이었습니까?' },

    // 12턴: 증거 e-2 → 한지석 S2
    { label: '한지석 e-2 증거제시 S2', party: 'a', dispute: 'd-1', state: 'S2', action: 'evidence_present', question: '한지석 씨, 이 예약 확인서에 대해 입장을 밝혀 주십시오.', evidenceId: 'e-2' },

    // 13~14턴: 한지석 d-1 S3
    { label: '한지석 d-1 S3 사실추궁', party: 'a', dispute: 'd-1', state: 'S3', action: 'fact_pursuit', question: '한지석 씨, 사실관계가 분명하지 않습니다. 다시 설명해 주십시오.' },
    { label: '한지석 d-1 S3 동기탐색', party: 'a', dispute: 'd-1', state: 'S3', action: 'motive_search', question: '한지석 씨, 왜 그런 판단을 내리셨는지 아직 납득이 되지 않습니다.' },

    // 15~16턴: 한지석 d-1 S4→S5
    { label: '한지석 d-1 S4 공감접근', party: 'a', dispute: 'd-1', state: 'S4', action: 'empathy_approach', question: '한지석 씨, 당시 심정을 충분히 듣겠습니다. 솔직하게 말씀해 주십시오.' },
    { label: '한지석 d-1 S5 사실추궁', party: 'a', dispute: 'd-1', state: 'S5', action: 'fact_pursuit', question: '한지석 씨, 사실대로 말씀해 주십시오.' },

    // 17~18턴: 오세린 d-2 S3→S5
    { label: '오세린 d-2 S3 blame', party: 'b', dispute: 'd-2', state: 'S3', action: 'fact_pursuit', question: '오세린 씨, 사실관계가 분명하지 않습니다. 다시 설명해 주십시오.' },
    { label: '오세린 d-2 S5 고백', party: 'b', dispute: 'd-2', state: 'S5', action: 'empathy_approach', question: '오세린 씨, 당시 심정을 충분히 듣겠습니다. 솔직하게 말씀해 주십시오.' },

    // 19~20턴: d-5 양측
    { label: '한지석 d-5 사실추궁', party: 'a', dispute: 'd-5', state: 'S1', action: 'fact_pursuit', question: '한지석 씨, 사전 상의 약속 위반 건에 대해 사실 여부를 확인하겠습니다.' },
    { label: '오세린 d-5 사실추궁', party: 'b', dispute: 'd-5', state: 'S1', action: 'fact_pursuit', question: '오세린 씨, 사전 상의 약속 위반 건에 대해 사실 여부를 확인하겠습니다.' },
  ],

  sections: [
    { before: 0, title: '1~3턴: 한지석 d-1 초기 심문' },
    { before: 3, title: '4턴: 오세린 d-2 초기 심문' },
    { before: 4, title: '5턴: 증거 e-1 → 한지석' },
    { before: 5, title: '6턴: 증거 e-1 → 오세린' },
    { before: 6, title: '7턴: 증거 e-3 → 오세린' },
    { before: 7, title: '8~9턴: 한지석 d-1 S2 (부분 인정)' },
    { before: 9, title: '10~11턴: 오세린 d-2 S2' },
    { before: 11, title: '12턴: 증거 e-2 → 한지석 S2' },
    { before: 12, title: '13~14턴: 한지석 d-1 S3' },
    { before: 14, title: '15~16턴: 한지석 d-1 S4→S5' },
    { before: 16, title: '17~18턴: 오세린 d-2 S3→S5' },
    { before: 18, title: '19~20턴: d-5 양측' },
  ]
}
