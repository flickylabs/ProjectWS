/**
 * workplace-01 시나리오: 성과 평가 갈등
 * 윤태성(partyA, cold_logic/팀장) vs 박서윤(partyB, confrontational/대리)
 * 원본: tests/workplace-01-playthrough.cjs
 */
module.exports = {
  caseId: 'workplace-01',
  title: '직장 성과 평가 갈등',

  casePath: 'src/data/cases/generated/workplace-01.json',
  atomsPath: 'docs/ref/리뉴얼참고/gpt-batch/workplace-01/workplace-01-v2-atoms.json',

  turns: [
    // 1~3턴: 윤태성 d-1 초기 심문
    { label: '윤태성 d-1 사실추궁', party: 'a', dispute: 'd-1', state: 'S1', action: 'fact_pursuit', question: '윤태성 씨, 보고서 제출 시 실무자 이름을 삭제한 건에 대해 사실 여부를 확인하겠습니다.' },
    { label: '윤태성 d-1 동기탐색', party: 'a', dispute: 'd-1', state: 'S1', action: 'motive_search', question: '윤태성 씨, 실무자 이름을 빼고 제출한 이유가 무엇입니까?' },
    { label: '윤태성 d-1 공감접근', party: 'a', dispute: 'd-1', state: 'S1', action: 'empathy_approach', question: '윤태성 씨, 당시 어떤 심정으로 그런 결정을 내리셨습니까?' },

    // 4턴: 박서윤 d-2 사실추궁
    { label: '박서윤 d-2 사실추궁', party: 'b', dispute: 'd-2', state: 'S1', action: 'fact_pursuit', question: '박서윤 씨, 새벽에 평가 화면을 열람하고 캡처를 돌린 건에 대해 사실 여부를 확인하겠습니다.' },

    // 5턴: 증거 e-1 → 윤태성
    { label: '윤태성 e-1 증거제시', party: 'a', dispute: 'd-1', state: 'S1', action: 'evidence_present', question: '윤태성 씨, 이 프로젝트 초안 이메일과 주간회의록에 대해 입장을 밝혀 주십시오.', evidenceId: 'e-1' },

    // 6턴: 증거 e-1 → 박서윤
    { label: '박서윤 e-1 증거제시', party: 'b', dispute: 'd-1', state: 'S1', action: 'evidence_present', question: '박서윤 씨, 이 이메일 체인과 회의록을 보시고 본인의 입장을 말씀해 주십시오.', evidenceId: 'e-1' },

    // 7턴: 증거 e-5 → 박서윤
    { label: '박서윤 e-5 증거제시', party: 'b', dispute: 'd-2', state: 'S1', action: 'evidence_present', question: '박서윤 씨, 이 슬랙 캡처 묶음에 대해 설명해 주십시오.', evidenceId: 'e-5' },

    // 8~9턴: 윤태성 d-1 S2
    { label: '윤태성 d-1 S2 사실추궁', party: 'a', dispute: 'd-1', state: 'S2', action: 'fact_pursuit', question: '윤태성 씨, 명의 제출 건에 대해 좀 더 구체적으로 말씀해 주십시오.' },
    { label: '윤태성 d-1 S2 동기탐색', party: 'a', dispute: 'd-1', state: 'S2', action: 'motive_search', question: '윤태성 씨, 왜 기여자 표기를 뒤로 미루셨습니까? 당시 어떤 판단이 있었습니까?' },

    // 10~11턴: 박서윤 d-2 S2
    { label: '박서윤 d-2 S2 사실추궁', party: 'b', dispute: 'd-2', state: 'S2', action: 'fact_pursuit', question: '박서윤 씨, 평가 화면 열람 건에 대해 좀 더 구체적으로 말씀해 주십시오.' },
    { label: '박서윤 d-2 S2 공감접근', party: 'b', dispute: 'd-2', state: 'S2', action: 'empathy_approach', question: '박서윤 씨, 새벽에 평가 화면을 열었을 때 어떤 심정이셨습니까?' },

    // 12턴: 증거 e-4 → 윤태성 S2
    { label: '윤태성 e-4 증거제시 S2', party: 'a', dispute: 'd-4', state: 'S2', action: 'evidence_present', question: '윤태성 씨, 이 HR 평가 초안 버전기록과 비공식 코멘트에 대해 입장을 밝혀 주십시오.', evidenceId: 'e-4' },

    // 13~14턴: 윤태성 d-1 S3
    { label: '윤태성 d-1 S3 사실추궁', party: 'a', dispute: 'd-1', state: 'S3', action: 'fact_pursuit', question: '윤태성 씨, 사실관계가 분명하지 않습니다. 다시 설명해 주십시오.' },
    { label: '윤태성 d-1 S3 동기탐색', party: 'a', dispute: 'd-1', state: 'S3', action: 'motive_search', question: '윤태성 씨, 왜 그런 판단을 내리셨는지 아직 납득이 되지 않습니다.' },

    // 15~16턴: 윤태성 d-1 S4→S5
    { label: '윤태성 d-1 S4 공감접근', party: 'a', dispute: 'd-1', state: 'S4', action: 'empathy_approach', question: '윤태성 씨, 당시 심정을 충분히 듣겠습니다. 솔직하게 말씀해 주십시오.' },
    { label: '윤태성 d-1 S5 사실추궁', party: 'a', dispute: 'd-1', state: 'S5', action: 'fact_pursuit', question: '윤태성 씨, 이제 사실대로 말씀해 주십시오.' },

    // 17~18턴: 박서윤 d-2 S3→S5
    { label: '박서윤 d-2 S3 blame', party: 'b', dispute: 'd-2', state: 'S3', action: 'fact_pursuit', question: '박서윤 씨, 사실관계가 분명하지 않습니다. 다시 설명해 주십시오.' },
    { label: '박서윤 d-2 S5 고백', party: 'b', dispute: 'd-2', state: 'S5', action: 'empathy_approach', question: '박서윤 씨, 당시 심정을 충분히 듣겠습니다. 솔직하게 말씀해 주십시오.' },

    // 19~20턴: d-5 양측
    { label: '윤태성 d-5 사실추궁', party: 'a', dispute: 'd-5', state: 'S1', action: 'fact_pursuit', question: '윤태성 씨, 성과 배분 합의 위반 건에 대해 사실 여부를 확인하겠습니다.' },
    { label: '박서윤 d-5 사실추궁', party: 'b', dispute: 'd-5', state: 'S1', action: 'fact_pursuit', question: '박서윤 씨, 성과 배분 합의 위반 건에 대해 사실 여부를 확인하겠습니다.' },
  ],

  sections: [
    { before: 0, title: '1~3턴: 윤태성 d-1 초기 심문 (단독 명의 제출)' },
    { before: 3, title: '4턴: 박서윤 d-2 초기 심문 (인사 화면 무단 열람)' },
    { before: 4, title: '5턴: 증거 e-1 → 윤태성' },
    { before: 5, title: '6턴: 증거 e-1 → 박서윤' },
    { before: 6, title: '7턴: 증거 e-5 → 박서윤' },
    { before: 7, title: '8~9턴: 윤태성 d-1 S2 (부분 인정)' },
    { before: 9, title: '10~11턴: 박서윤 d-2 S2' },
    { before: 11, title: '12턴: 증거 e-4 → 윤태성 S2' },
    { before: 12, title: '13~14턴: 윤태성 d-1 S3' },
    { before: 14, title: '15~16턴: 윤태성 d-1 S4→S5' },
    { before: 16, title: '17~18턴: 박서윤 d-2 S3→S5' },
    { before: 18, title: '19~20턴: d-5 양측 (성과 배분 합의 쌍방 위반)' },
  ]
}
