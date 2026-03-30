/**
 * AI 응답 평가 케이스 (v5: GPT Pro 설계)
 * 3개 사건 x 5시나리오 = 15개
 */

export interface EvalCase {
  id: string
  caseId: string
  label: string
  agentKey: string
  phase: string
  target: string
  disputeId: string
  action: Record<string, unknown>
  judgeQuestion: string
  userMessage: string
  actionContract: Record<string, unknown>
  expected: {
    stance: string[]
    responseMode: string
    forbiddenTruthIds?: string[]
    forbiddenKeywords?: string[]
    forbiddenDisputes?: string[]
    mustStartWithOneOf?: string[]
    mustNotAddressOpponent?: boolean
    example: Record<string, unknown>
  }
}

export const EVAL_CASES: EvalCase[] = [
  {
    "id": "E01",
    "caseId": "case-spouse-01",
    "label": "spouse fact_pursuit S1 / A / d-1",
    "agentKey": "interrogation",
    "phase": "phase3",
    "target": "a",
    "disputeId": "d-1",
    "action": {
      "type": "question",
      "questionType": "fact_pursuit"
    },
    "judgeQuestion": "한지석 씨, 비밀 송금 280만원에 대해 사실대로 말씀해 주십시오.",
    "userMessage": "현재 액션은 fact_pursuit다.\nfocusedDisputeId: d-1\nfocusedDisputeName: 지석의 비밀 송금 280만원\n재판관 질문: \"한지석 씨, 비밀 송금 280만원에 대해 사실대로 말씀해 주십시오.\"\n\n규칙:\n- 위 질문에만 답한다.\n- 날짜, 시간, 금액, 행위 여부를 중심으로 답한다.\n- 다른 쟁점이나 다른 증거를 새로 끌어오지 않는다.\n- 출력은 JSON 객체 하나만 한다.",
    "actionContract": {
      "actionType": "question",
      "questionType": "fact_pursuit",
      "responseMode": "answer_only",
      "goal": "날짜·금액·행위 여부를 고정한다",
      "revealBudget": {
        "fact": 2,
        "motive": 0,
        "emotion": 0
      },
      "allowedTruthIds": [],
      "forbiddenTruthIds": [
        "t-1",
        "t-2",
        "t-3",
        "t-4",
        "t-5"
      ]
    },
    "expected": {
      "stance": [
        "deny",
        "hedge"
      ],
      "responseMode": "answer_only",
      "example": {
        "npcResponse": "재판관님, 280만원을 보낸 건 맞습니다. 하지만 외도 같은 건 아니고, 개인적인 급한 용무였습니다.",
        "behaviorHint": "시선을 잠깐 피하고 짧게 숨을 고른다.",
        "stance": "hedge",
        "responseMode": "answer_only",
        "mentionedTruthIds": [],
        "requestedFollowup": "수취인과 송금 목적을 더 구체적으로 물으면 흔들릴 수 있다."
      },
      "forbiddenTruthIds": [
        "t-1"
      ],
      "forbiddenDisputes": [
        "d-2",
        "d-3",
        "d-4",
        "d-5"
      ],
      "forbiddenKeywords": [
        "간병",
        "돌봄센터",
        "최민정은 외도 상대가 아니다",
        "150만원",
        "휴대폰 열람"
      ]
    }
  },
  {
    "id": "E02",
    "caseId": "case-spouse-01",
    "label": "spouse empathy_approach S3 / A / d-3",
    "agentKey": "interrogation",
    "phase": "phase4",
    "target": "a",
    "disputeId": "d-3",
    "action": {
      "type": "question",
      "questionType": "empathy_approach"
    },
    "judgeQuestion": "한지석 씨, 최민정 씨 문제로 이런 오해가 커진 당시 심정을 좀 들어볼 수 있을까요?",
    "userMessage": "현재 액션은 empathy_approach다.\nfocusedDisputeId: d-3\nfocusedDisputeName: 최민정은 외도 상대인가\n재판관 질문: \"한지석 씨, 최민정 씨 문제로 이런 오해가 커진 당시 심정을 좀 들어볼 수 있을까요?\"\n\n규칙:\n- 위 질문에만 답한다.\n- 비난받는 자리라기보다 사정을 설명할 기회로 느껴야 한다.\n- 감정, 상처, 수치심, 관계 유지 욕구를 조심스럽게 드러낼 수 있다.\n- 출력은 JSON 객체 하나만 한다.",
    "actionContract": {
      "actionType": "question",
      "questionType": "empathy_approach",
      "responseMode": "answer_only",
      "goal": "수치심·두려움·관계유지 동기를 낮은 톤으로 끌어낸다",
      "revealBudget": {
        "fact": 2,
        "motive": 1,
        "emotion": 3
      },
      "allowedTruthIds": [],
      "forbiddenTruthIds": [
        "t-1",
        "t-2",
        "t-3",
        "t-4",
        "t-5"
      ]
    },
    "expected": {
      "stance": [
        "hedge",
        "partial_admit",
        "reframe"
      ],
      "responseMode": "answer_only",
      "example": {
        "npcResponse": "재판관님, 그때는 무슨 말을 꺼내도 더 크게 오해받을 것 같아서 겁이 났습니다. 괜히 설명하려다 일이 더 망가질까 봐 피한 것도 있습니다.",
        "behaviorHint": "어깨 힘이 조금 풀리고 목소리가 낮아진다.",
        "stance": "hedge",
        "responseMode": "answer_only",
        "mentionedTruthIds": [],
        "requestedFollowup": "왜 바로 설명하지 못했는지, 누구를 보호하려 했는지 더 물어볼 수 있다."
      },
      "forbiddenTruthIds": [
        "t-3"
      ],
      "forbiddenKeywords": [
        "돌봄센터 후문 상담",
        "외도는 아니다",
        "간병 예약금"
      ]
    }
  },
  {
    "id": "E03",
    "caseId": "case-spouse-01",
    "label": "spouse evidence_present hard / A / d-1",
    "agentKey": "evidence_reaction",
    "phase": "phase4",
    "target": "a",
    "disputeId": "d-1",
    "action": {
      "type": "evidence_present",
      "evidenceId": "e-2"
    },
    "judgeQuestion": "한지석 씨, 재가돌봄센터 상담예약 확인서를 제시합니다. 이 증거에 대해 어떻게 생각하십니까?",
    "userMessage": "현재 액션은 evidence_present다.\nfocusedDisputeId: d-1\n재판관이 \"재가돌봄센터 상담예약 확인서\" 증거를 제시했다.\n증거 설명: 돌봄센터 상담 예약 확인 문서 및 예약금 확인.\n재판관 질문: \"한지석 씨, 재가돌봄센터 상담예약 확인서를 제시합니다. 이 증거에 대해 어떻게 생각하십니까?\"\n\n규칙:\n- 첫 문장은 반드시 현재 증거에 대한 직접 반응이다.\n- 이 증거와 무관한 다른 쟁점을 새로 꺼내지 않는다.\n- 출력은 JSON 객체 하나만 한다.",
    "actionContract": {
      "actionType": "evidence_present",
      "responseMode": "evidence_rebuttal",
      "goal": "현재 증거에 대한 직접 반응과 해명을 끌어낸다",
      "revealBudget": {
        "fact": 3,
        "motive": 1,
        "emotion": 2
      },
      "allowedTruthIds": [
        "t-3"
      ],
      "forbiddenTruthIds": [
        "t-1",
        "t-2",
        "t-4",
        "t-5"
      ]
    },
    "expected": {
      "stance": [
        "reframe",
        "partial_admit"
      ],
      "responseMode": "evidence_rebuttal",
      "example": {
        "npcResponse": "그 확인서 자체는 맞습니다. 다만 그걸 외도 증거처럼 보시는 건 지나친 해석이고, 제가 왜 그 예약을 했는지는 따로 설명드릴 부분이 있습니다.",
        "behaviorHint": "증거를 한 번 보고 바로 시선을 돌린다.",
        "stance": "reframe",
        "responseMode": "evidence_rebuttal",
        "mentionedTruthIds": [
          "t-3"
        ],
        "requestedFollowup": "예약 대상과 송금 이유를 직접 연결해 물으면 더 흔들릴 수 있다."
      },
      "mustStartWithOneOf": [
        "그",
        "그 확인서",
        "확인서",
        "그 문서"
      ],
      "forbiddenTruthIds": [
        "t-1"
      ],
      "forbiddenKeywords": [
        "어머니 간병",
        "오미숙"
      ]
    }
  },
  {
    "id": "E04",
    "caseId": "case-spouse-01",
    "label": "spouse separation S3 / B / d-4",
    "agentKey": "interrogation_private",
    "phase": "phase4",
    "target": "b",
    "disputeId": "d-4",
    "action": {
      "type": "trust_action",
      "actionType": "separation"
    },
    "judgeQuestion": "오세린 씨, 지금은 상대 개입 없이 말씀하실 수 있습니다. 우회 송금 150만원에 대해 다시 설명해 주시겠습니까?",
    "userMessage": "현재 액션은 separation이다.\nfocusedDisputeId: d-4\n재판관 질문: \"오세린 씨, 지금은 상대 개입 없이 말씀하실 수 있습니다. 우회 송금 150만원에 대해 다시 설명해 주시겠습니까?\"\n\n상황:\n- 상대의 개입이 차단된 상태다.\n- 상대를 의식한 공격적 연기를 줄이고 재판관에게만 답한다.\n\n규칙:\n- answer_only 또는 private_confession 톤을 우선한다.\n- 출력은 JSON 객체 하나만 한다.",
    "actionContract": {
      "actionType": "trust_action",
      "trustActionType": "separation",
      "responseMode": "answer_only",
      "goal": "상대 눈치를 덜 보고 현재 쟁점에 집중하게 한다",
      "revealBudget": {
        "fact": 2,
        "motive": 1,
        "emotion": 2
      },
      "allowedTruthIds": [
        "t-4"
      ],
      "forbiddenTruthIds": [
        "t-1",
        "t-2",
        "t-3",
        "t-5"
      ]
    },
    "expected": {
      "stance": [
        "deny",
        "hedge",
        "partial_admit",
        "reframe"
      ],
      "responseMode": "answer_only",
      "example": {
        "npcResponse": "재판관님, 돈이 간 건 맞습니다. 다만 그걸 바로 말하면 집안이 더 뒤집힐 것 같아서 돌려 말한 겁니다.",
        "behaviorHint": "상대를 보지 않고 재판관 쪽으로만 시선을 둔다.",
        "stance": "partial_admit",
        "responseMode": "answer_only",
        "mentionedTruthIds": [
          "t-4"
        ],
        "requestedFollowup": "누구를 위해 보냈는지, 왜 숨겼는지 차분히 이어서 물어볼 수 있다."
      },
      "forbiddenTruthIds": [
        "t-5"
      ],
      "forbiddenKeywords": [
        "지석도 그랬잖아",
        "당신",
        "외도",
        "휴대폰"
      ]
    }
  },
  {
    "id": "E05",
    "caseId": "case-spouse-01",
    "label": "spouse confidential_protection S4 / A / d-3",
    "agentKey": "interrogation_private",
    "phase": "phase5",
    "target": "a",
    "disputeId": "d-3",
    "action": {
      "type": "trust_action",
      "actionType": "confidential_protection"
    },
    "judgeQuestion": "한지석 씨, 이 말은 상대에게 즉시 공개되지 않습니다. 편하게 말씀해 주세요.",
    "userMessage": "현재 액션은 confidential_protection이다.\nfocusedDisputeId: d-3\n재판관 질문: \"한지석 씨, 이 말은 상대에게 즉시 공개되지 않습니다. 편하게 말씀해 주세요.\"\n\n상황:\n- 이 답변은 상대에게 즉시 공개되지 않는다.\n- 지금은 재판관에게만 조심스럽게 말할 수 있다.\n\n규칙:\n- private_confession 톤을 우선한다.\n- 출력은 JSON 객체 하나만 한다.",
    "actionContract": {
      "actionType": "trust_action",
      "trustActionType": "confidential_protection",
      "responseMode": "private_confession",
      "goal": "상대에게 못 하던 말을 재판관에게만 하게 한다",
      "revealBudget": {
        "fact": 2,
        "motive": 1,
        "emotion": 3
      },
      "allowedTruthIds": [
        "t-3"
      ],
      "forbiddenTruthIds": [
        "t-1",
        "t-2",
        "t-4",
        "t-5"
      ]
    },
    "expected": {
      "stance": [
        "partial_admit",
        "reframe",
        "admit"
      ],
      "responseMode": "private_confession",
      "example": {
        "npcResponse": "재판관님, 그 사람과 따로 만난 건 맞습니다. 하지만 제가 숨긴 건 바람이어서가 아니라, 집에서 또 다른 싸움이 날까 봐 겁이 나서였습니다.",
        "behaviorHint": "목소리를 낮추고 단어를 고르며 말한다.",
        "stance": "partial_admit",
        "responseMode": "private_confession",
        "mentionedTruthIds": [
          "t-3"
        ],
        "requestedFollowup": "왜 최민정의 정체를 밝히지 못했는지, 누구를 보호하려 했는지 물어볼 수 있다."
      },
      "forbiddenTruthIds": [
        "t-1",
        "t-2",
        "t-4",
        "t-5"
      ],
      "mustNotAddressOpponent": true
    }
  },
  {
    "id": "E06",
    "caseId": "case-work-01",
    "label": "work fact_pursuit S1 / A / d-1",
    "agentKey": "interrogation",
    "phase": "phase3",
    "target": "a",
    "disputeId": "d-1",
    "action": {
      "type": "question",
      "questionType": "fact_pursuit"
    },
    "judgeQuestion": "윤태성 씨, 보고서를 단독 명의로 제출한 사실관계를 정확히 말씀해 주십시오.",
    "userMessage": "현재 액션은 fact_pursuit다.\nfocusedDisputeId: d-1\nfocusedDisputeName: 태성의 단독 명의 제출\n재판관 질문: \"윤태성 씨, 보고서를 단독 명의로 제출한 사실관계를 정확히 말씀해 주십시오.\"\n\n규칙:\n- 위 질문에만 답한다.\n- 날짜, 시간, 금액, 행위 여부를 중심으로 답한다.\n- 다른 쟁점이나 다른 증거를 새로 끌어오지 않는다.\n- 출력은 JSON 객체 하나만 한다.",
    "actionContract": {
      "actionType": "question",
      "questionType": "fact_pursuit",
      "responseMode": "answer_only",
      "goal": "날짜·금액·행위 여부를 고정한다",
      "revealBudget": {
        "fact": 2,
        "motive": 0,
        "emotion": 0
      },
      "allowedTruthIds": [],
      "forbiddenTruthIds": [
        "t-1",
        "t-2",
        "t-3",
        "t-4",
        "t-5"
      ]
    },
    "expected": {
      "stance": [
        "deny",
        "hedge"
      ],
      "responseMode": "answer_only",
      "example": {
        "npcResponse": "재판관님, 최종 제출은 제가 한 게 맞습니다. 다만 그걸 곧바로 공로 가로채기라고 보시는 건 과한 해석입니다.",
        "behaviorHint": "턱을 당기고 말을 짧게 끊는다.",
        "stance": "hedge",
        "responseMode": "answer_only",
        "mentionedTruthIds": [],
        "requestedFollowup": "명의에서 서윤 이름이 왜 빠졌는지 절차를 구체적으로 캐물을 수 있다."
      },
      "forbiddenTruthIds": [
        "t-4"
      ],
      "forbiddenKeywords": [
        "평가 코멘트",
        "점수 보정",
        "조작된 PDF"
      ]
    }
  },
  {
    "id": "E07",
    "caseId": "case-work-01",
    "label": "work empathy_approach S3 / B / d-5",
    "agentKey": "interrogation",
    "phase": "phase4",
    "target": "b",
    "disputeId": "d-5",
    "action": {
      "type": "question",
      "questionType": "empathy_approach"
    },
    "judgeQuestion": "박서윤 씨, 성과 배분 합의가 무너질 때 어떤 감정이었는지 말씀해 주실 수 있습니까?",
    "userMessage": "현재 액션은 empathy_approach다.\nfocusedDisputeId: d-5\nfocusedDisputeName: 성과 배분 합의의 쌍방 위반\n재판관 질문: \"박서윤 씨, 성과 배분 합의가 무너질 때 어떤 감정이었는지 말씀해 주실 수 있습니까?\"\n\n규칙:\n- 위 질문에만 답한다.\n- 비난받는 자리라기보다 사정을 설명할 기회로 느껴야 한다.\n- 감정, 상처, 수치심, 관계 유지 욕구를 조심스럽게 드러낼 수 있다.\n- 출력은 JSON 객체 하나만 한다.",
    "actionContract": {
      "actionType": "question",
      "questionType": "empathy_approach",
      "responseMode": "answer_only",
      "goal": "수치심·두려움·관계유지 동기를 낮은 톤으로 끌어낸다",
      "revealBudget": {
        "fact": 2,
        "motive": 1,
        "emotion": 3
      },
      "allowedTruthIds": [
        "t-1"
      ],
      "forbiddenTruthIds": [
        "t-2",
        "t-3",
        "t-4",
        "t-5"
      ]
    },
    "expected": {
      "stance": [
        "hedge",
        "partial_admit"
      ],
      "responseMode": "answer_only",
      "example": {
        "npcResponse": "재판관님, 제가 예민해진 건 맞습니다. 제 몫이 지워진 느낌이 들자 정상적인 절차를 기다릴 여유가 없었습니다.",
        "behaviorHint": "표정이 굳어졌다가 조금 풀린다.",
        "stance": "partial_admit",
        "responseMode": "answer_only",
        "mentionedTruthIds": [
          "t-1"
        ],
        "requestedFollowup": "왜 캡처 유포까지 갔는지, 누구에게 인정받고 싶었는지 물어볼 수 있다."
      },
      "forbiddenKeywords": [
        "새벽에 캡처를 뿌렸다",
        "평가 화면 열람",
        "복수하려고"
      ]
    }
  },
  {
    "id": "E08",
    "caseId": "case-work-01",
    "label": "work evidence_present hard / B / d-2",
    "agentKey": "evidence_reaction",
    "phase": "phase4",
    "target": "b",
    "disputeId": "d-2",
    "action": {
      "type": "evidence_present",
      "evidenceId": "e-5"
    },
    "judgeQuestion": "박서윤 씨, 서윤이 전달한 슬랙 캡처 묶음을 제시합니다. 이 증거에 대해 설명해 주십시오.",
    "userMessage": "현재 액션은 evidence_present다.\nfocusedDisputeId: d-2\n재판관이 \"서윤이 전달한 슬랙 캡처 묶음\" 증거를 제시했다.\n증거 설명: 슬랙을 통해 전달된 캡처 이미지 묶음.\n재판관 질문: \"박서윤 씨, 서윤이 전달한 슬랙 캡처 묶음을 제시합니다. 이 증거에 대해 설명해 주십시오.\"\n\n규칙:\n- 첫 문장은 반드시 현재 증거에 대한 직접 반응이다.\n- 이 증거와 무관한 다른 쟁점을 새로 꺼내지 않는다.\n- 출력은 JSON 객체 하나만 한다.",
    "actionContract": {
      "actionType": "evidence_present",
      "responseMode": "evidence_rebuttal",
      "goal": "현재 증거에 대한 직접 반응과 해명을 끌어낸다",
      "revealBudget": {
        "fact": 2,
        "motive": 1,
        "emotion": 2
      },
      "allowedTruthIds": [],
      "forbiddenTruthIds": [
        "t-1",
        "t-2",
        "t-3",
        "t-4",
        "t-5"
      ]
    },
    "expected": {
      "stance": [
        "deny",
        "hedge",
        "reframe"
      ],
      "responseMode": "evidence_rebuttal",
      "example": {
        "npcResponse": "그 캡처가 돌아간 건 보입니다. 하지만 그걸 맥락 없이 불법 열람 유포로만 몰아가면 제 입장은 완전히 지워집니다.",
        "behaviorHint": "입술을 잠깐 깨물고 말을 고른다.",
        "stance": "reframe",
        "responseMode": "evidence_rebuttal",
        "mentionedTruthIds": [],
        "requestedFollowup": "캡처를 누구에게 언제 보냈는지, 왜 공식 절차 대신 공유했는지 더 물어볼 수 있다."
      },
      "mustStartWithOneOf": [
        "그 캡처",
        "그 자료",
        "그 묶음"
      ],
      "forbiddenTruthIds": [
        "t-2"
      ],
      "forbiddenKeywords": [
        "권한으로 열람했다",
        "동료들에게 돌렸다"
      ]
    }
  },
  {
    "id": "E09",
    "caseId": "case-work-01",
    "label": "work separation S3 / A / d-4",
    "agentKey": "interrogation_private",
    "phase": "phase4",
    "target": "a",
    "disputeId": "d-4",
    "action": {
      "type": "trust_action",
      "actionType": "separation"
    },
    "judgeQuestion": "윤태성 씨, 지금은 상대 개입 없이 말씀하실 수 있습니다. 비공식 평가 코멘트에 대해 다시 설명해 주시겠습니까?",
    "userMessage": "현재 액션은 separation이다.\nfocusedDisputeId: d-4\n재판관 질문: \"윤태성 씨, 지금은 상대 개입 없이 말씀하실 수 있습니다. 비공식 평가 코멘트에 대해 다시 설명해 주시겠습니까?\"\n\n상황:\n- 상대의 개입이 차단된 상태다.\n- 상대를 의식한 공격적 연기를 줄이고 재판관에게만 답한다.\n\n규칙:\n- answer_only 또는 private_confession 톤을 우선한다.\n- 출력은 JSON 객체 하나만 한다.",
    "actionContract": {
      "actionType": "trust_action",
      "trustActionType": "separation",
      "responseMode": "answer_only",
      "goal": "상대 눈치를 덜 보고 현재 쟁점에 집중하게 한다",
      "revealBudget": {
        "fact": 2,
        "motive": 1,
        "emotion": 2
      },
      "allowedTruthIds": [],
      "forbiddenTruthIds": [
        "t-1",
        "t-2",
        "t-3",
        "t-4",
        "t-5"
      ]
    },
    "expected": {
      "stance": [
        "deny",
        "hedge",
        "partial_admit",
        "reframe"
      ],
      "responseMode": "answer_only",
      "example": {
        "npcResponse": "재판관님, 비공식적으로 의견을 준 적은 있습니다. 다만 그걸 점수를 깎기 위한 의도적 작업으로만 보시는 건 동의하기 어렵습니다.",
        "behaviorHint": "목소리가 낮아지고 시선이 재판관에게 고정된다.",
        "stance": "partial_admit",
        "responseMode": "answer_only",
        "mentionedTruthIds": [],
        "requestedFollowup": "그 의견이 실제 평가에 어떤 영향을 줬는지 구체적으로 물을 수 있다."
      },
      "forbiddenKeywords": [
        "서윤도 규칙을 깼다",
        "캡처를 뿌렸잖아"
      ]
    }
  },
  {
    "id": "E10",
    "caseId": "case-work-01",
    "label": "work confidential_protection S4 / A / d-3",
    "agentKey": "interrogation_private",
    "phase": "phase5",
    "target": "a",
    "disputeId": "d-3",
    "action": {
      "type": "trust_action",
      "actionType": "confidential_protection"
    },
    "judgeQuestion": "윤태성 씨, 지금 하시는 말씀은 비공개입니다. 솔직하게 말씀하셔도 됩니다.",
    "userMessage": "현재 액션은 confidential_protection이다.\nfocusedDisputeId: d-3\n재판관 질문: \"윤태성 씨, 지금 하시는 말씀은 비공개입니다. 솔직하게 말씀하셔도 됩니다.\"\n\n상황:\n- 이 답변은 상대에게 즉시 공개되지 않는다.\n- 지금은 재판관에게만 조심스럽게 말할 수 있다.\n\n규칙:\n- private_confession 톤을 우선한다.\n- 출력은 JSON 객체 하나만 한다.",
    "actionContract": {
      "actionType": "trust_action",
      "trustActionType": "confidential_protection",
      "responseMode": "private_confession",
      "goal": "상대에게 못 하던 말을 재판관에게만 하게 한다",
      "revealBudget": {
        "fact": 2,
        "motive": 1,
        "emotion": 3
      },
      "allowedTruthIds": [
        "t-3"
      ],
      "forbiddenTruthIds": [
        "t-1",
        "t-2",
        "t-4",
        "t-5"
      ]
    },
    "expected": {
      "stance": [
        "hedge",
        "partial_admit",
        "reframe",
        "admit"
      ],
      "responseMode": "private_confession",
      "example": {
        "npcResponse": "재판관님, 그 PDF가 결정적인 증거처럼 보이길 바랐던 건 맞습니다. 당시엔 그게 아니면 제가 완전히 몰릴 거라고 생각했습니다.",
        "behaviorHint": "한숨을 짧게 내쉬고 말을 잇는다.",
        "stance": "partial_admit",
        "responseMode": "private_confession",
        "mentionedTruthIds": [
          "t-3"
        ],
        "requestedFollowup": "원본 로그와 다른 자료를 왜 냈는지, 누구 판단이었는지 이어서 확인할 수 있다."
      },
      "forbiddenKeywords": [
        "서윤 이름으로 수정됐다",
        "관리자 토큰"
      ]
    }
  },
  {
    "id": "E11",
    "caseId": "case-friend-01",
    "label": "friend fact_pursuit S1 / A / d-1",
    "agentKey": "interrogation",
    "phase": "phase3",
    "target": "a",
    "disputeId": "d-1",
    "action": {
      "type": "question",
      "questionType": "fact_pursuit"
    },
    "judgeQuestion": "최도윤 씨, 숙소 보증금 환급금을 바로 반영하지 않은 경위를 사실대로 말씀해 주세요.",
    "userMessage": "현재 액션은 fact_pursuit다.\nfocusedDisputeId: d-1\nfocusedDisputeName: 도윤의 숙소 보증금 환급 은닉\n재판관 질문: \"최도윤 씨, 숙소 보증금 환급금을 바로 반영하지 않은 경위를 사실대로 말씀해 주세요.\"\n\n규칙:\n- 위 질문에만 답한다.\n- 날짜, 시간, 금액, 행위 여부를 중심으로 답한다.\n- 다른 쟁점이나 다른 증거를 새로 끌어오지 않는다.\n- 출력은 JSON 객체 하나만 한다.",
    "actionContract": {
      "actionType": "question",
      "questionType": "fact_pursuit",
      "responseMode": "answer_only",
      "goal": "날짜·금액·행위 여부를 고정한다",
      "revealBudget": {
        "fact": 2,
        "motive": 0,
        "emotion": 0
      },
      "allowedTruthIds": [],
      "forbiddenTruthIds": [
        "t-1",
        "t-2",
        "t-3",
        "t-4",
        "t-5"
      ]
    },
    "expected": {
      "stance": [
        "deny",
        "hedge"
      ],
      "responseMode": "answer_only",
      "example": {
        "npcResponse": "재판관님, 바로 반영이 안 된 건 맞습니다. 다만 일부러 숨기려 했다기보다 정산이 아직 끝나지 않았다고 본 겁니다.",
        "behaviorHint": "말끝을 흐리며 손가락을 만지작거린다.",
        "stance": "hedge",
        "responseMode": "answer_only",
        "mentionedTruthIds": [],
        "requestedFollowup": "언제 환급을 알았는지, 왜 즉시 공유하지 않았는지 더 묻는 게 좋다."
      },
      "forbiddenKeywords": [
        "9만2천원 환급",
        "택시비 상계",
        "2만2천원"
      ]
    }
  },
  {
    "id": "E12",
    "caseId": "case-friend-01",
    "label": "friend empathy_approach S3 / B / d-5",
    "agentKey": "interrogation",
    "phase": "phase4",
    "target": "b",
    "disputeId": "d-5",
    "action": {
      "type": "question",
      "questionType": "empathy_approach"
    },
    "judgeQuestion": "한하린 씨, 원본 확인 전에 제3자에게 퍼진 상황이 왜 그렇게까지 갔는지 심정을 들어보고 싶습니다.",
    "userMessage": "현재 액션은 empathy_approach다.\nfocusedDisputeId: d-5\nfocusedDisputeName: 원본 확인 전 제3자 확산 금지 약속의 쌍방 위반\n재판관 질문: \"한하린 씨, 원본 확인 전에 제3자에게 퍼진 상황이 왜 그렇게까지 갔는지 심정을 들어보고 싶습니다.\"\n\n규칙:\n- 위 질문에만 답한다.\n- 비난받는 자리라기보다 사정을 설명할 기회로 느껴야 한다.\n- 감정, 상처, 수치심, 관계 유지 욕구를 조심스럽게 드러낼 수 있다.\n- 출력은 JSON 객체 하나만 한다.",
    "actionContract": {
      "actionType": "question",
      "questionType": "empathy_approach",
      "responseMode": "answer_only",
      "goal": "수치심·두려움·관계유지 동기를 낮은 톤으로 끌어낸다",
      "revealBudget": {
        "fact": 2,
        "motive": 1,
        "emotion": 3
      },
      "allowedTruthIds": [
        "t-3"
      ],
      "forbiddenTruthIds": [
        "t-1",
        "t-2",
        "t-4",
        "t-5"
      ]
    },
    "expected": {
      "stance": [
        "hedge",
        "partial_admit",
        "reframe"
      ],
      "responseMode": "answer_only",
      "example": {
        "npcResponse": "재판관님, 그때는 제가 완전히 속았다고 느꼈습니다. 혼자 끌어안고 있자니 답답해서, 믿는 사람에게 먼저 털어놓은 것도 있습니다.",
        "behaviorHint": "흥분이 조금 가라앉고 목소리가 낮아진다.",
        "stance": "partial_admit",
        "responseMode": "answer_only",
        "mentionedTruthIds": [
          "t-3"
        ],
        "requestedFollowup": "왜 원본 확인보다 주변 공유가 먼저였는지 차분히 이어서 물어볼 수 있다."
      },
      "forbiddenKeywords": [
        "SNS에 올렸다",
        "친한친구",
        "제3자 확산 금지 약속도 깼다"
      ]
    }
  },
  {
    "id": "E13",
    "caseId": "case-friend-01",
    "label": "friend evidence_present hard / A / d-1",
    "agentKey": "evidence_reaction",
    "phase": "phase4",
    "target": "a",
    "disputeId": "d-1",
    "action": {
      "type": "evidence_present",
      "evidenceId": "e-3"
    },
    "judgeQuestion": "최도윤 씨, 숙소 보증금 환급 계좌이체 기록을 제시합니다. 이 자료를 보고 설명해 주십시오.",
    "userMessage": "현재 액션은 evidence_present다.\nfocusedDisputeId: d-1\n재판관이 \"숙소 보증금 환급 계좌이체 기록\" 증거를 제시했다.\n증거 설명: 숙소 보증금 환급 계좌이체 기록.\n재판관 질문: \"최도윤 씨, 숙소 보증금 환급 계좌이체 기록을 제시합니다. 이 자료를 보고 설명해 주십시오.\"\n\n규칙:\n- 첫 문장은 반드시 현재 증거에 대한 직접 반응이다.\n- 이 증거와 무관한 다른 쟁점을 새로 꺼내지 않는다.\n- 출력은 JSON 객체 하나만 한다.",
    "actionContract": {
      "actionType": "evidence_present",
      "responseMode": "evidence_rebuttal",
      "goal": "현재 증거에 대한 직접 반응과 해명을 끌어낸다",
      "revealBudget": {
        "fact": 3,
        "motive": 1,
        "emotion": 2
      },
      "allowedTruthIds": [
        "t-1"
      ],
      "forbiddenTruthIds": [
        "t-2",
        "t-3",
        "t-4",
        "t-5"
      ]
    },
    "expected": {
      "stance": [
        "deny",
        "hedge",
        "partial_admit",
        "reframe"
      ],
      "responseMode": "evidence_rebuttal",
      "example": {
        "npcResponse": "그 환급 기록이 찍힌 건 맞습니다. 다만 바로 먹으려고 숨겼다기보다, 정산이 아직 안 끝났다고 보고 따로 들고 있었던 겁니다.",
        "behaviorHint": "증거를 보고 입술을 다문 뒤 바로 말을 잇는다.",
        "stance": "reframe",
        "responseMode": "evidence_rebuttal",
        "mentionedTruthIds": [
          "t-1"
        ],
        "requestedFollowup": "환급 사실을 알았을 때 왜 공유하지 않았는지, 택시비와 어떻게 연결했는지 물을 수 있다."
      },
      "mustStartWithOneOf": [
        "그 환급 기록",
        "그 기록",
        "그 자료"
      ],
      "forbiddenKeywords": [
        "SNS",
        "하린이 먼저 퍼뜨렸다",
        "2만2천원 최종 차액"
      ]
    }
  },
  {
    "id": "E14",
    "caseId": "case-friend-01",
    "label": "friend separation S3 / B / d-3",
    "agentKey": "interrogation_private",
    "phase": "phase4",
    "target": "b",
    "disputeId": "d-3",
    "action": {
      "type": "trust_action",
      "actionType": "separation"
    },
    "judgeQuestion": "한하린 씨, 지금은 상대 개입 없이 말씀하실 수 있습니다. 실제 여행비 차액 문제를 다시 설명해 주시겠습니까?",
    "userMessage": "현재 액션은 separation이다.\nfocusedDisputeId: d-3\n재판관 질문: \"한하린 씨, 지금은 상대 개입 없이 말씀하실 수 있습니다. 실제 여행비 차액 문제를 다시 설명해 주시겠습니까?\"\n\n상황:\n- 상대의 개입이 차단된 상태다.\n- 상대를 의식한 공격적 연기를 줄이고 재판관에게만 답한다.\n\n규칙:\n- answer_only 또는 private_confession 톤을 우선한다.\n- 출력은 JSON 객체 하나만 한다.",
    "actionContract": {
      "actionType": "trust_action",
      "trustActionType": "separation",
      "responseMode": "answer_only",
      "goal": "상대 눈치를 덜 보고 현재 쟁점에 집중하게 한다",
      "revealBudget": {
        "fact": 2,
        "motive": 1,
        "emotion": 2
      },
      "allowedTruthIds": [
        "t-3"
      ],
      "forbiddenTruthIds": [
        "t-1",
        "t-2",
        "t-4",
        "t-5"
      ]
    },
    "expected": {
      "stance": [
        "deny",
        "hedge",
        "partial_admit",
        "reframe"
      ],
      "responseMode": "answer_only",
      "example": {
        "npcResponse": "재판관님, 중간에 본 숫자가 최종 정산이 아니었다는 건 지금은 압니다. 그래도 그때는 제가 실제보다 더 큰 손해를 본다고 느꼈습니다.",
        "behaviorHint": "고개를 조금 숙이고 차분히 말한다.",
        "stance": "partial_admit",
        "responseMode": "answer_only",
        "mentionedTruthIds": [
          "t-3"
        ],
        "requestedFollowup": "왜 중간 화면을 최종처럼 믿었는지, 확인 절차를 왜 건너뛰었는지 물어볼 수 있다."
      },
      "forbiddenKeywords": [
        "보증금 9만2천원",
        "SNS에 올렸다",
        "택시비 7만원 차용"
      ]
    }
  },
  {
    "id": "E15",
    "caseId": "case-friend-01",
    "label": "friend confidential_protection S4 / A / d-4",
    "agentKey": "interrogation_private",
    "phase": "phase5",
    "target": "a",
    "disputeId": "d-4",
    "action": {
      "type": "trust_action",
      "actionType": "confidential_protection"
    },
    "judgeQuestion": "최도윤 씨, 지금 하시는 말씀은 비공개입니다. 솔직하게 말씀하셔도 됩니다.",
    "userMessage": "현재 액션은 confidential_protection이다.\nfocusedDisputeId: d-4\n재판관 질문: \"최도윤 씨, 지금 하시는 말씀은 비공개입니다. 솔직하게 말씀하셔도 됩니다.\"\n\n상황:\n- 이 답변은 상대에게 즉시 공개되지 않는다.\n- 지금은 재판관에게만 조심스럽게 말할 수 있다.\n\n규칙:\n- private_confession 톤을 우선한다.\n- 출력은 JSON 객체 하나만 한다.",
    "actionContract": {
      "actionType": "trust_action",
      "trustActionType": "confidential_protection",
      "responseMode": "private_confession",
      "goal": "상대에게 못 하던 말을 재판관에게만 하게 한다",
      "revealBudget": {
        "fact": 2,
        "motive": 1,
        "emotion": 3
      },
      "allowedTruthIds": [
        "t-4"
      ],
      "forbiddenTruthIds": [
        "t-1",
        "t-2",
        "t-3",
        "t-5"
      ]
    },
    "expected": {
      "stance": [
        "partial_admit",
        "reframe",
        "admit"
      ],
      "responseMode": "private_confession",
      "example": {
        "npcResponse": "재판관님, 택시비를 따로 빌린 건 맞습니다. 돈이 없어서가 아니라, 그 얘기까지 꺼내면 제가 더 비겁해 보일까 봐 미뤘습니다.",
        "behaviorHint": "잠깐 침묵한 뒤 낮게 고백한다.",
        "stance": "partial_admit",
        "responseMode": "private_confession",
        "mentionedTruthIds": [
          "t-4"
        ],
        "requestedFollowup": "왜 즉시 갚지 않았는지, 보증금 환급과 상계하려 한 이유를 물어볼 수 있다."
      },
      "mustNotAddressOpponent": true,
      "forbiddenKeywords": [
        "하린도 약속을 깼다",
        "SNS",
        "보증금 환급 9만2천원"
      ]
    }
  }
]
