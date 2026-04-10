export const FamilyNew03V3GameLoopData = {
  "caseId": "family-new-03",
  "dossierCards": [
    {
      "id": "dossier-1",
      "name": "실버타운 입주는 정말 즉시 필요한 상황이었…",
      "description": "실버타운 입주는 정말 즉시 필요한 상황이었는가과 B는 왜 같은 날 계약금 일부를 월세 공백 메우기에 먼저 썼는가를 함께 검토하는 카드입니다.",
      "evidenceIds": [
        "e-1",
        "e-4"
      ],
      "relatedDisputes": [
        "d-1",
        "d-2"
      ],
      "subjectParty": "both",
      "challenges": [
        {
          "targetParty": "a",
          "questions": [
            {
              "id": "dossier-1.a.q1",
              "text": "실버타운 입주는 정말 즉시 필요한 상황이었는가과 관련해 지금 가장 먼저 정리해야 할 누락 사실은 무엇입니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "family-new-03:a:d-1:S2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q2",
              "text": "B는 왜 같은 날 계약금 일부를 월세 공백 메우기에 먼저 썼는가을 따로 떼어 설명하려는 이유는 무엇입니까?",
              "attackVector": "responsibility",
              "onSuccess": {
                "blockVector": "responsibility",
                "revealAtom": "family-new-03:a:d-2:S3:0",
                "lieAdvance": true
              }
            }
          ]
        },
        {
          "targetParty": "b",
          "questions": [
            {
              "id": "dossier-1.b.q1",
              "text": "실버타운 입주는 정말 즉시 필요한 상황이었는가과 관련해 지금 가장 먼저 정리해야 할 누락 사실은 무엇입니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "family-new-03:b:d-1:S2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q2",
              "text": "B는 왜 같은 날 계약금 일부를 월세 공백 메우기에 먼저 썼는가을 따로 떼어 설명하려는 이유는 무엇입니까?",
              "attackVector": "responsibility",
              "onSuccess": {
                "blockVector": "responsibility",
                "revealAtom": "family-new-03:b:d-2:S3:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-2",
      "name": "B는 왜 같은 날 계약금 일부를 월세 공백…",
      "description": "B는 왜 같은 날 계약금 일부를 월세 공백 메우기에 먼저 썼는가과 A의 안전위험 자료는 실제 경고였는가, 강제입주용 편집이었는가를 함께 검토하는 카드입니다.",
      "evidenceIds": [
        "e-2",
        "e-5"
      ],
      "relatedDisputes": [
        "d-2",
        "d-3"
      ],
      "subjectParty": "both",
      "challenges": [
        {
          "targetParty": "a",
          "questions": [
            {
              "id": "dossier-2.a.q1",
              "text": "B는 왜 같은 날 계약금 일부를 월세 공백 메우기에 먼저 썼는가과 관련해 지금 가장 먼저 정리해야 할 누락 사실은 무엇입니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "family-new-03:a:d-2:S2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q2",
              "text": "A의 안전위험 자료는 실제 경고였는가, 강제입주용 편집이었는가을 따로 떼어 설명하려는 이유는 무엇입니까?",
              "attackVector": "responsibility",
              "onSuccess": {
                "blockVector": "responsibility",
                "revealAtom": "family-new-03:a:d-3:S3:0",
                "lieAdvance": true
              }
            }
          ]
        },
        {
          "targetParty": "b",
          "questions": [
            {
              "id": "dossier-2.b.q1",
              "text": "B는 왜 같은 날 계약금 일부를 월세 공백 메우기에 먼저 썼는가과 관련해 지금 가장 먼저 정리해야 할 누락 사실은 무엇입니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "family-new-03:b:d-2:S2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q2",
              "text": "A의 안전위험 자료는 실제 경고였는가, 강제입주용 편집이었는가을 따로 떼어 설명하려는 이유는 무엇입니까?",
              "attackVector": "responsibility",
              "onSuccess": {
                "blockVector": "responsibility",
                "revealAtom": "family-new-03:b:d-3:S3:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-3",
      "name": "A의 안전위험 자료는 실제 경고였는가, 강…",
      "description": "A의 안전위험 자료는 실제 경고였는가, 강제입주용 편집이었는가과 어머니의 자율성과 자녀의 보호 논리는 어디서 충돌하는가를 함께 검토하는 카드입니다.",
      "evidenceIds": [
        "e-3",
        "e-6"
      ],
      "relatedDisputes": [
        "d-3",
        "d-4"
      ],
      "subjectParty": "both",
      "challenges": [
        {
          "targetParty": "a",
          "questions": [
            {
              "id": "dossier-3.a.q1",
              "text": "A의 안전위험 자료는 실제 경고였는가, 강제입주용 편집이었는가과 관련해 지금 가장 먼저 정리해야 할 누락 사실은 무엇입니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "family-new-03:a:d-3:S2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q2",
              "text": "어머니의 자율성과 자녀의 보호 논리는 어디서 충돌하는가을 따로 떼어 설명하려는 이유는 무엇입니까?",
              "attackVector": "responsibility",
              "onSuccess": {
                "blockVector": "responsibility",
                "revealAtom": "family-new-03:a:d-4:S3:0",
                "lieAdvance": true
              }
            }
          ]
        },
        {
          "targetParty": "b",
          "questions": [
            {
              "id": "dossier-3.b.q1",
              "text": "A의 안전위험 자료는 실제 경고였는가, 강제입주용 편집이었는가과 관련해 지금 가장 먼저 정리해야 할 누락 사실은 무엇입니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "family-new-03:b:d-3:S2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q2",
              "text": "어머니의 자율성과 자녀의 보호 논리는 어디서 충돌하는가을 따로 떼어 설명하려는 이유는 무엇입니까?",
              "attackVector": "responsibility",
              "onSuccess": {
                "blockVector": "responsibility",
                "revealAtom": "family-new-03:b:d-4:S3:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-4",
      "name": "어머니의 자율성과 자녀의 보호 논리는 어디…",
      "description": "어머니의 자율성과 자녀의 보호 논리는 어디서 충돌하는가과 어머니의 자율성과 자녀의 보호 논리는 어디서 충돌하는가를 함께 검토하는 카드입니다.",
      "evidenceIds": [
        "e-4",
        "e-7"
      ],
      "relatedDisputes": [
        "d-4"
      ],
      "subjectParty": "both",
      "challenges": [
        {
          "targetParty": "a",
          "questions": [
            {
              "id": "dossier-4.a.q1",
              "text": "어머니의 자율성과 자녀의 보호 논리는 어디서 충돌하는가과 관련해 지금 가장 먼저 정리해야 할 누락 사실은 무엇입니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "family-new-03:a:d-4:S2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-4.a.q2",
              "text": "어머니의 자율성과 자녀의 보호 논리는 어디서 충돌하는가을 따로 떼어 설명하려는 이유는 무엇입니까?",
              "attackVector": "responsibility",
              "onSuccess": {
                "blockVector": "responsibility",
                "revealAtom": "family-new-03:a:d-4:S3:0",
                "lieAdvance": true
              }
            }
          ]
        },
        {
          "targetParty": "b",
          "questions": [
            {
              "id": "dossier-4.b.q1",
              "text": "어머니의 자율성과 자녀의 보호 논리는 어디서 충돌하는가과 관련해 지금 가장 먼저 정리해야 할 누락 사실은 무엇입니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "family-new-03:b:d-4:S2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-4.b.q2",
              "text": "어머니의 자율성과 자녀의 보호 논리는 어디서 충돌하는가을 따로 떼어 설명하려는 이유는 무엇입니까?",
              "attackVector": "responsibility",
              "onSuccess": {
                "blockVector": "responsibility",
                "revealAtom": "family-new-03:b:d-4:S3:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    }
  ],
  "stateUnlockAtoms": {
    "a": {
      "d-1": {
        "S2": [
          {
            "id": "family-new-03:a:d-1:S2:0",
            "factText": "실버타운 입주는 정말 즉시 필요한 상황이었… 카드에서 A측이 숨기던 설명 조각이 더 드러난다.",
            "tags": [
              "thread-e",
              "family-new-03",
              "d-1",
              "dossier-1"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "summary": {
                "default": "실버타운 입주는 정말 즉시 필요한 상황이었… 카드에서 추가로 열린 사실입니다."
              }
            },
            "stanceHints": [
              "partial",
              "blame",
              "confess"
            ]
          }
        ]
      },
      "d-2": {
        "S3": [
          {
            "id": "family-new-03:a:d-2:S3:0",
            "factText": "실버타운 입주는 정말 즉시 필요한 상황이었… 카드에서 A측이 숨기던 설명 조각이 더 드러난다.",
            "tags": [
              "thread-e",
              "family-new-03",
              "d-2",
              "dossier-1"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "summary": {
                "default": "실버타운 입주는 정말 즉시 필요한 상황이었… 카드에서 추가로 열린 사실입니다."
              }
            },
            "stanceHints": [
              "partial",
              "blame",
              "confess"
            ]
          }
        ],
        "S2": [
          {
            "id": "family-new-03:a:d-2:S2:0",
            "factText": "B는 왜 같은 날 계약금 일부를 월세 공백… 카드에서 A측이 숨기던 설명 조각이 더 드러난다.",
            "tags": [
              "thread-e",
              "family-new-03",
              "d-2",
              "dossier-2"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "summary": {
                "default": "B는 왜 같은 날 계약금 일부를 월세 공백… 카드에서 추가로 열린 사실입니다."
              }
            },
            "stanceHints": [
              "partial",
              "blame",
              "confess"
            ]
          }
        ]
      },
      "d-3": {
        "S3": [
          {
            "id": "family-new-03:a:d-3:S3:0",
            "factText": "B는 왜 같은 날 계약금 일부를 월세 공백… 카드에서 A측이 숨기던 설명 조각이 더 드러난다.",
            "tags": [
              "thread-e",
              "family-new-03",
              "d-3",
              "dossier-2"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "summary": {
                "default": "B는 왜 같은 날 계약금 일부를 월세 공백… 카드에서 추가로 열린 사실입니다."
              }
            },
            "stanceHints": [
              "partial",
              "blame",
              "confess"
            ]
          }
        ],
        "S2": [
          {
            "id": "family-new-03:a:d-3:S2:0",
            "factText": "A의 안전위험 자료는 실제 경고였는가, 강… 카드에서 A측이 숨기던 설명 조각이 더 드러난다.",
            "tags": [
              "thread-e",
              "family-new-03",
              "d-3",
              "dossier-3"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "summary": {
                "default": "A의 안전위험 자료는 실제 경고였는가, 강… 카드에서 추가로 열린 사실입니다."
              }
            },
            "stanceHints": [
              "partial",
              "blame",
              "confess"
            ]
          }
        ]
      },
      "d-4": {
        "S3": [
          {
            "id": "family-new-03:a:d-4:S3:0",
            "factText": "A의 안전위험 자료는 실제 경고였는가, 강… 카드에서 A측이 숨기던 설명 조각이 더 드러난다.",
            "tags": [
              "thread-e",
              "family-new-03",
              "d-4",
              "dossier-3"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "summary": {
                "default": "A의 안전위험 자료는 실제 경고였는가, 강… 카드에서 추가로 열린 사실입니다."
              }
            },
            "stanceHints": [
              "partial",
              "blame",
              "confess"
            ]
          },
          {
            "id": "family-new-03:a:d-4:S3:0",
            "factText": "어머니의 자율성과 자녀의 보호 논리는 어디… 카드에서 A측이 숨기던 설명 조각이 더 드러난다.",
            "tags": [
              "thread-e",
              "family-new-03",
              "d-4",
              "dossier-4"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "summary": {
                "default": "어머니의 자율성과 자녀의 보호 논리는 어디… 카드에서 추가로 열린 사실입니다."
              }
            },
            "stanceHints": [
              "partial",
              "blame",
              "confess"
            ]
          }
        ],
        "S2": [
          {
            "id": "family-new-03:a:d-4:S2:0",
            "factText": "어머니의 자율성과 자녀의 보호 논리는 어디… 카드에서 A측이 숨기던 설명 조각이 더 드러난다.",
            "tags": [
              "thread-e",
              "family-new-03",
              "d-4",
              "dossier-4"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "summary": {
                "default": "어머니의 자율성과 자녀의 보호 논리는 어디… 카드에서 추가로 열린 사실입니다."
              }
            },
            "stanceHints": [
              "partial",
              "blame",
              "confess"
            ]
          }
        ]
      }
    },
    "b": {
      "d-1": {
        "S2": [
          {
            "id": "family-new-03:b:d-1:S2:0",
            "factText": "실버타운 입주는 정말 즉시 필요한 상황이었… 카드에서 B측이 숨기던 설명 조각이 더 드러난다.",
            "tags": [
              "thread-e",
              "family-new-03",
              "d-1",
              "dossier-1"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "summary": {
                "default": "실버타운 입주는 정말 즉시 필요한 상황이었… 카드에서 추가로 열린 사실입니다."
              }
            },
            "stanceHints": [
              "partial",
              "blame",
              "confess"
            ]
          }
        ]
      },
      "d-2": {
        "S3": [
          {
            "id": "family-new-03:b:d-2:S3:0",
            "factText": "실버타운 입주는 정말 즉시 필요한 상황이었… 카드에서 B측이 숨기던 설명 조각이 더 드러난다.",
            "tags": [
              "thread-e",
              "family-new-03",
              "d-2",
              "dossier-1"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "summary": {
                "default": "실버타운 입주는 정말 즉시 필요한 상황이었… 카드에서 추가로 열린 사실입니다."
              }
            },
            "stanceHints": [
              "partial",
              "blame",
              "confess"
            ]
          }
        ],
        "S2": [
          {
            "id": "family-new-03:b:d-2:S2:0",
            "factText": "B는 왜 같은 날 계약금 일부를 월세 공백… 카드에서 B측이 숨기던 설명 조각이 더 드러난다.",
            "tags": [
              "thread-e",
              "family-new-03",
              "d-2",
              "dossier-2"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "summary": {
                "default": "B는 왜 같은 날 계약금 일부를 월세 공백… 카드에서 추가로 열린 사실입니다."
              }
            },
            "stanceHints": [
              "partial",
              "blame",
              "confess"
            ]
          }
        ]
      },
      "d-3": {
        "S3": [
          {
            "id": "family-new-03:b:d-3:S3:0",
            "factText": "B는 왜 같은 날 계약금 일부를 월세 공백… 카드에서 B측이 숨기던 설명 조각이 더 드러난다.",
            "tags": [
              "thread-e",
              "family-new-03",
              "d-3",
              "dossier-2"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "summary": {
                "default": "B는 왜 같은 날 계약금 일부를 월세 공백… 카드에서 추가로 열린 사실입니다."
              }
            },
            "stanceHints": [
              "partial",
              "blame",
              "confess"
            ]
          }
        ],
        "S2": [
          {
            "id": "family-new-03:b:d-3:S2:0",
            "factText": "A의 안전위험 자료는 실제 경고였는가, 강… 카드에서 B측이 숨기던 설명 조각이 더 드러난다.",
            "tags": [
              "thread-e",
              "family-new-03",
              "d-3",
              "dossier-3"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "summary": {
                "default": "A의 안전위험 자료는 실제 경고였는가, 강… 카드에서 추가로 열린 사실입니다."
              }
            },
            "stanceHints": [
              "partial",
              "blame",
              "confess"
            ]
          }
        ]
      },
      "d-4": {
        "S3": [
          {
            "id": "family-new-03:b:d-4:S3:0",
            "factText": "A의 안전위험 자료는 실제 경고였는가, 강… 카드에서 B측이 숨기던 설명 조각이 더 드러난다.",
            "tags": [
              "thread-e",
              "family-new-03",
              "d-4",
              "dossier-3"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "summary": {
                "default": "A의 안전위험 자료는 실제 경고였는가, 강… 카드에서 추가로 열린 사실입니다."
              }
            },
            "stanceHints": [
              "partial",
              "blame",
              "confess"
            ]
          },
          {
            "id": "family-new-03:b:d-4:S3:0",
            "factText": "어머니의 자율성과 자녀의 보호 논리는 어디… 카드에서 B측이 숨기던 설명 조각이 더 드러난다.",
            "tags": [
              "thread-e",
              "family-new-03",
              "d-4",
              "dossier-4"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "summary": {
                "default": "어머니의 자율성과 자녀의 보호 논리는 어디… 카드에서 추가로 열린 사실입니다."
              }
            },
            "stanceHints": [
              "partial",
              "blame",
              "confess"
            ]
          }
        ],
        "S2": [
          {
            "id": "family-new-03:b:d-4:S2:0",
            "factText": "어머니의 자율성과 자녀의 보호 논리는 어디… 카드에서 B측이 숨기던 설명 조각이 더 드러난다.",
            "tags": [
              "thread-e",
              "family-new-03",
              "d-4",
              "dossier-4"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "summary": {
                "default": "어머니의 자율성과 자녀의 보호 논리는 어디… 카드에서 추가로 열린 사실입니다."
              }
            },
            "stanceHints": [
              "partial",
              "blame",
              "confess"
            ]
          }
        ]
      }
    }
  },
  "events": {
    "contradictions": [
      {
        "id": "family-new-03-contradiction-1",
        "statementA": "최민아은 실버타운 입주는 정말 즉시 필요한 상황이었는가에서 자신이 더 조심스러웠다고 말한다.",
        "statementB": "최성재은 같은 장면을 상대가 먼저 밀어붙인 결과라고 설명한다.",
        "options": {
          "point_out": {
            "label": "정면으로 짚는다",
            "effect": "두 사람의 경위 설명이 더 선명하게 갈린다."
          },
          "let_go": {
            "label": "다른 축으로 넘긴다",
            "effect": "당장 충돌은 줄지만 구조 책임이 남는다."
          }
        },
        "npcReaction": "양측 모두 자신에게 유리한 순서로 사건을 다시 정렬하려 한다."
      },
      {
        "id": "family-new-03-contradiction-2",
        "statementA": "가스경보기 원본 연속샷 14장 중 가장 위험해 보이는 3장만 제출해 강제 입주 논리를 만든 것",
        "statementB": "실버타운 계약금 일부를 어머니 아파트 월세 미납과 관리비 공백 메우기에 먼저 돌린 것",
        "options": {
          "point_out": {
            "label": "숨김을 직접 겨눈다",
            "effect": "숨긴 사실과 방어 논리가 동시에 흔들린다."
          },
          "let_go": {
            "label": "판단을 유보한다",
            "effect": "감정 폭발은 줄지만 해석 충돌이 남는다."
          }
        },
        "npcReaction": "양측 모두 자기 숨김보다 상대의 선행 잘못을 먼저 강조한다."
      }
    ],
    "interjections": [
      {
        "id": "family-new-03-interjection-a",
        "interruptor": "a",
        "interjectionLine": "최민아은 지금 질문이 사건 구조를 너무 단순하게 자른다고 항의한다.",
        "options": {
          "allow": {
            "label": "계속 말하게 둔다",
            "effect": "A측 감정선과 자기정당화가 더 드러난다."
          },
          "block": {
            "label": "다시 질문으로 돌린다",
            "effect": "핵심 경위를 빠르게 고정한다."
          }
        }
      },
      {
        "id": "family-new-03-interjection-b",
        "interruptor": "b",
        "interjectionLine": "최성재은 상대가 더 큰 계산을 숨긴 채 자신만 몰고 간다고 반발한다.",
        "options": {
          "allow": {
            "label": "계속 반박하게 둔다",
            "effect": "B측 방어 논리와 공격 포인트가 드러난다."
          },
          "block": {
            "label": "증거로 다시 묶는다",
            "effect": "감정선을 줄이고 자료 중심으로 되돌린다."
          }
        }
      }
    ],
    "emotionalOutbursts": [
      {
        "id": "family-new-03-outburst-a",
        "party": "a",
        "outburstLine": "최민아은 자신만 계산적으로 몰리는 순간 강하게 반발한다.",
        "options": {
          "press": {
            "label": "더 압박한다",
            "effect": "A측이 숨기던 정당화가 빨리 무너진다."
          },
          "calm": {
            "label": "정리할 시간을 준다",
            "effect": "A측이 조금 더 차분하게 경위를 설명한다."
          }
        }
      },
      {
        "id": "family-new-03-outburst-b",
        "party": "b",
        "outburstLine": "최성재은 상대가 먼저 판을 설계했는데 자신만 더 무겁게 보인다고 폭발한다.",
        "options": {
          "press": {
            "label": "구체 책임을 묻는다",
            "effect": "B측의 반격 논리와 자기 숨김이 함께 흔들린다."
          },
          "calm": {
            "label": "감정을 눌러 정리한다",
            "effect": "B측이 구조 책임을 설명할 공간이 생긴다."
          }
        }
      }
    ]
  },
  "transitionBeats": [
    {
      "id": "family-new-03-beat-a",
      "caseId": "family-new-03",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S1",
      "toState": "S2",
      "primaryBeatType": "evidence_hit",
      "line": "최민아의 설명에서 빠졌던 연결 고리가 증거와 함께 붙는다.",
      "behaviorHint": "답변 길이가 짧아지고 누락된 부분이 방어 대신 인정 쪽으로 기울기 시작한다."
    },
    {
      "id": "family-new-03-beat-b",
      "caseId": "family-new-03",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S2",
      "toState": "S3",
      "primaryBeatType": "counter_shift",
      "line": "최성재은 자기 책임 일부를 인정하면서도 상대의 선행 선택을 다시 끌어온다.",
      "behaviorHint": "상대 비난 문장이 늘고 자기 설명은 더 짧고 단단해진다."
    }
  ]
} as const
