/**
 * friend-01 시나리오: 여행비 정산 갈등
 * 서도윤(partyA, avoidant) vs 정하린(partyB, confrontational)
 * 원본: tests/friend-01-playthrough.cjs
 */
module.exports = {
  caseId: 'friend-01',
  title: '여행비 정산 갈등',

  casePath: 'src/data/cases/generated/friend-01.json',
  atomsPath: 'docs/ref/리뉴얼참고/gpt-batch/friend-01/friend-01-v2-atoms.json',

  turns: [
    // Phase 1: d-1 서도윤 S1 (4종 질문)
    { label: '서도윤 d-1 S1 사실추궁', party: 'a', dispute: 'd-1', state: 'S1', action: 'fact_pursuit', question: '서도윤 씨, 숙소 보증금 환급 건에 대해 사실 여부를 확인하겠습니다. 보증금이 본인 계좌로 들어온 것이 맞습니까?' },
    { label: '서도윤 d-1 S1 동기탐색', party: 'a', dispute: 'd-1', state: 'S1', action: 'motive_search', question: '서도윤 씨, 환급금을 바로 정산표에 반영하지 않은 이유가 무엇입니까?' },
    { label: '서도윤 d-1 S1 공감접근', party: 'a', dispute: 'd-1', state: 'S1', action: 'empathy_approach', question: '서도윤 씨, 친구분과 정산 문제로 갈등이 생겼을 때 어떤 심정이셨습니까?' },
    { label: '서도윤 d-1 S1 증거제시', party: 'a', dispute: 'd-1', state: 'S1', action: 'evidence_present', question: '서도윤 씨, 이 보증금 환급 계좌이체 기록에 대해 입장을 밝혀 주십시오.', evidenceId: 'e-3' },

    // Phase 2: d-2 정하린 S1
    { label: '정하린 d-2 S1 사실추궁', party: 'b', dispute: 'd-2', state: 'S1', action: 'fact_pursuit', question: '정하린 씨, 정산이 확정되기 전에 공통 친구에게 정산 캡처를 보낸 것이 사실입니까?' },
    { label: '정하린 d-2 S1 동기탐색', party: 'b', dispute: 'd-2', state: 'S1', action: 'motive_search', question: '정하린 씨, 왜 정산이 끝나기 전에 SNS 스토리를 올리셨습니까?' },
    { label: '정하린 d-2 S1 증거제시', party: 'b', dispute: 'd-2', state: 'S1', action: 'evidence_present', question: '정하린 씨, 이 인스타 스토리 캡처에 대해 설명해 주십시오.', evidenceId: 'e-5' },

    // Phase 3: d-1 서도윤 S2
    { label: '서도윤 d-1 S2 사실추궁', party: 'a', dispute: 'd-1', state: 'S2', action: 'fact_pursuit', question: '서도윤 씨, 보증금이 계좌에 들어온 뒤 상대방에게 알리지 않은 것은 인정하십니까?' },
    { label: '서도윤 d-1 S2 동기탐색', party: 'a', dispute: 'd-1', state: 'S2', action: 'motive_search', question: '서도윤 씨, 택시비와 묶어서 정리하려 했다고 했는데, 그 판단의 근거가 무엇이었습니까?' },

    // Phase 4: d-3 양측 S1
    { label: '서도윤 d-3 S1 사실추궁', party: 'a', dispute: 'd-3', state: 'S1', action: 'fact_pursuit', question: '서도윤 씨, 정산 앱에서 18만4천원 차이가 나타난 부분에 대해 설명해 주십시오.' },
    { label: '정하린 d-3 S1 사실추궁', party: 'b', dispute: 'd-3', state: 'S1', action: 'fact_pursuit', question: '정하린 씨, 정산 앱 중간 화면에서 18만4천원 차액을 보셨을 때 어떻게 판단하셨습니까?' },

    // Phase 5: d-4 서도윤 S1→S3
    { label: '서도윤 d-4 S1 사실추궁', party: 'a', dispute: 'd-4', state: 'S1', action: 'fact_pursuit', question: '서도윤 씨, 공항 택시비 7만원을 상대방이 대신 낸 것이 맞습니까?' },
    { label: '서도윤 d-4 S2 공감접근', party: 'a', dispute: 'd-4', state: 'S2', action: 'empathy_approach', question: '서도윤 씨, 친구분이 대신 낸 택시비를 돌려주지 못한 것에 대해 어떤 마음이셨습니까?' },
    { label: '서도윤 d-4 S3 증거제시', party: 'a', dispute: 'd-4', state: 'S3', action: 'evidence_present', question: '서도윤 씨, 이 공항 택시 영수증과 차용 메모에 대해 입장을 밝혀 주십시오.', evidenceId: 'e-6' },

    // Phase 6: d-2 정하린 S2→S3
    { label: '정하린 d-2 S2 공감접근', party: 'b', dispute: 'd-2', state: 'S2', action: 'empathy_approach', question: '정하린 씨, SNS에 올린 글 때문에 친구분과 사이가 더 나빠졌을 때 어떤 심정이셨습니까?' },
    { label: '정하린 d-2 S3 사실추궁', party: 'b', dispute: 'd-2', state: 'S3', action: 'fact_pursuit', question: '정하린 씨, 김수아에게 보낸 정산 캡처가 확정 전 중간 화면이었다는 점을 알고 계셨습니까?' },

    // Phase 7: d-1 서도윤 S4→S5
    { label: '서도윤 d-1 S4 공감접근', party: 'a', dispute: 'd-1', state: 'S4', action: 'empathy_approach', question: '서도윤 씨, 솔직하게 말씀해 주십시오. 보증금을 바로 말하지 않은 진짜 이유가 무엇이었습니까?' },
    { label: '서도윤 d-1 S5 사실추궁', party: 'a', dispute: 'd-1', state: 'S5', action: 'fact_pursuit', question: '서도윤 씨, 이제 사실대로 정리해 주십시오.' },

    // Phase 8: d-2 정하린 S4→S5
    { label: '정하린 d-2 S4 공감접근', party: 'b', dispute: 'd-2', state: 'S4', action: 'empathy_approach', question: '정하린 씨, 당시 심정을 충분히 듣겠습니다. 솔직하게 말씀해 주십시오.' },
    { label: '정하린 d-2 S5 사실추궁', party: 'b', dispute: 'd-2', state: 'S5', action: 'fact_pursuit', question: '정하린 씨, 마지막으로 이 건에 대해 사실대로 정리해 주십시오.' },

    // Phase 9: d-5 양측 S1→S3
    { label: '서도윤 d-5 S1 사실추궁', party: 'a', dispute: 'd-5', state: 'S1', action: 'fact_pursuit', question: '서도윤 씨, 원본 영수증으로만 정산하기로 한 약속을 지키셨습니까?' },
    { label: '정하린 d-5 S1 사실추궁', party: 'b', dispute: 'd-5', state: 'S1', action: 'fact_pursuit', question: '정하린 씨, 제3자에게 먼저 말하지 않기로 한 약속을 지키셨습니까?' },
    { label: '서도윤 d-5 S3 동기탐색', party: 'a', dispute: 'd-5', state: 'S3', action: 'motive_search', question: '서도윤 씨, 약속을 어긴 이유가 무엇이었습니까? 왜 환급금 설명을 숨기셨습니까?' },
    { label: '정하린 d-5 S3 동기탐색', party: 'b', dispute: 'd-5', state: 'S3', action: 'motive_search', question: '정하린 씨, 약속이 있었는데도 SNS와 공통 친구에게 먼저 말한 이유가 무엇입니까?' },
  ],

  sections: [
    { before: 0, title: 'Phase 1: 서도윤 d-1 S1 초기 심문 (4종 질문)' },
    { before: 4, title: 'Phase 2: 정하린 d-2 S1 초기 심문' },
    { before: 7, title: 'Phase 3: 서도윤 d-1 S2 부분 인정' },
    { before: 9, title: 'Phase 4: d-3 양측 S1 (과소비 오해 쟁점)' },
    { before: 11, title: 'Phase 5: 서도윤 d-4 S1~S3 (택시비 미반환)' },
    { before: 14, title: 'Phase 6: 정하린 d-2 S2~S3 (SNS 저격 심화)' },
    { before: 16, title: 'Phase 7: 서도윤 d-1 S4~S5 (감정 -> 고백)' },
    { before: 18, title: 'Phase 8: 정하린 d-2 S4~S5 (고백)' },
    { before: 20, title: 'Phase 9: d-5 양측 S1~S3 (쌍방 위반 쟁점)' },
  ]
}
