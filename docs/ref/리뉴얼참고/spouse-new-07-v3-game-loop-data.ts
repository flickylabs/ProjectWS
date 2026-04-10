export const SpouseNew07V3GameLoopData = {
  "caseId": "spouse-new-07",
  "dossierCards": [
    {
      "id": "dossier-1",
      "name": "A의 프리랜서 소득은 일시적이었는가, 고의…",
      "description": "A의 프리랜서 소득은 일시적이었는가, 고의 은폐였는가과 B의 회사·은행 통보는 불가피한 신고였는가, 선제 책임전가였는가를 함께 검토하는 카드입니다.",
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
              "text": "A의 프리랜서 소득은 일시적이었는가, 고의 은폐였는가과 관련해 지금 가장 먼저 정리해야 할 누락 사실은 무엇입니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "spouse-new-07:a:d-1:S2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q2",
              "text": "B의 회사·은행 통보는 불가피한 신고였는가, 선제 책임전가였는가을 따로 떼어 설명하려는 이유는 무엇입니까?",
              "attackVector": "responsibility",
              "onSuccess": {
                "blockVector": "responsibility",
                "revealAtom": "spouse-new-07:a:d-2:S3:0",
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
              "text": "A의 프리랜서 소득은 일시적이었는가, 고의 은폐였는가과 관련해 지금 가장 먼저 정리해야 할 누락 사실은 무엇입니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "spouse-new-07:b:d-1:S2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q2",
              "text": "B의 회사·은행 통보는 불가피한 신고였는가, 선제 책임전가였는가을 따로 떼어 설명하려는 이유는 무엇입니까?",
              "attackVector": "responsibility",
              "onSuccess": {
                "blockVector": "responsibility",
                "revealAtom": "spouse-new-07:b:d-2:S3:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-2",
      "name": "B의 회사·은행 통보는 불가피한 신고였는가…",
      "description": "B의 회사·은행 통보는 불가피한 신고였는가, 선제 책임전가였는가과 피부양자 구조로 실제 이익을 본 사람은 누구였는가를 함께 검토하는 카드입니다.",
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
              "text": "B의 회사·은행 통보는 불가피한 신고였는가, 선제 책임전가였는가과 관련해 지금 가장 먼저 정리해야 할 누락 사실은 무엇입니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "spouse-new-07:a:d-2:S2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q2",
              "text": "피부양자 구조로 실제 이익을 본 사람은 누구였는가을 따로 떼어 설명하려는 이유는 무엇입니까?",
              "attackVector": "responsibility",
              "onSuccess": {
                "blockVector": "responsibility",
                "revealAtom": "spouse-new-07:a:d-3:S3:0",
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
              "text": "B의 회사·은행 통보는 불가피한 신고였는가, 선제 책임전가였는가과 관련해 지금 가장 먼저 정리해야 할 누락 사실은 무엇입니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "spouse-new-07:b:d-2:S2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q2",
              "text": "피부양자 구조로 실제 이익을 본 사람은 누구였는가을 따로 떼어 설명하려는 이유는 무엇입니까?",
              "attackVector": "responsibility",
              "onSuccess": {
                "blockVector": "responsibility",
                "revealAtom": "spouse-new-07:b:d-3:S3:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-3",
      "name": "피부양자 구조로 실제 이익을 본 사람은 누…",
      "description": "피부양자 구조로 실제 이익을 본 사람은 누구였는가과 친정 재활비 지원을 왜 공동재정에서 숨겼는가를 함께 검토하는 카드입니다.",
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
              "text": "피부양자 구조로 실제 이익을 본 사람은 누구였는가과 관련해 지금 가장 먼저 정리해야 할 누락 사실은 무엇입니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "spouse-new-07:a:d-3:S2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q2",
              "text": "친정 재활비 지원을 왜 공동재정에서 숨겼는가을 따로 떼어 설명하려는 이유는 무엇입니까?",
              "attackVector": "responsibility",
              "onSuccess": {
                "blockVector": "responsibility",
                "revealAtom": "spouse-new-07:a:d-4:S3:0",
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
              "text": "피부양자 구조로 실제 이익을 본 사람은 누구였는가과 관련해 지금 가장 먼저 정리해야 할 누락 사실은 무엇입니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "spouse-new-07:b:d-3:S2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q2",
              "text": "친정 재활비 지원을 왜 공동재정에서 숨겼는가을 따로 떼어 설명하려는 이유는 무엇입니까?",
              "attackVector": "responsibility",
              "onSuccess": {
                "blockVector": "responsibility",
                "revealAtom": "spouse-new-07:b:d-4:S3:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-4",
      "name": "친정 재활비 지원을 왜 공동재정에서 숨겼는가",
      "description": "친정 재활비 지원을 왜 공동재정에서 숨겼는가과 법적 신고 의무와 배우자 정보 보호 중 어디까지가 정당한가를 함께 검토하는 카드입니다.",
      "evidenceIds": [
        "e-4",
        "e-6"
      ],
      "relatedDisputes": [
        "d-4",
        "d-5"
      ],
      "subjectParty": "both",
      "challenges": [
        {
          "targetParty": "a",
          "questions": [
            {
              "id": "dossier-4.a.q1",
              "text": "친정 재활비 지원을 왜 공동재정에서 숨겼는가과 관련해 지금 가장 먼저 정리해야 할 누락 사실은 무엇입니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "spouse-new-07:a:d-4:S2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-4.a.q2",
              "text": "법적 신고 의무와 배우자 정보 보호 중 어디까지가 정당한가을 따로 떼어 설명하려는 이유는 무엇입니까?",
              "attackVector": "responsibility",
              "onSuccess": {
                "blockVector": "responsibility",
                "revealAtom": "spouse-new-07:a:d-5:S3:0",
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
              "text": "친정 재활비 지원을 왜 공동재정에서 숨겼는가과 관련해 지금 가장 먼저 정리해야 할 누락 사실은 무엇입니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "spouse-new-07:b:d-4:S2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-4.b.q2",
              "text": "법적 신고 의무와 배우자 정보 보호 중 어디까지가 정당한가을 따로 떼어 설명하려는 이유는 무엇입니까?",
              "attackVector": "responsibility",
              "onSuccess": {
                "blockVector": "responsibility",
                "revealAtom": "spouse-new-07:b:d-5:S3:0",
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
            "id": "spouse-new-07:a:d-1:S2:0",
            "factText": "A의 프리랜서 소득은 일시적이었는가, 고의… 카드에서 A측이 숨기던 설명 조각이 더 드러난다.",
            "tags": [
              "thread-e",
              "spouse-new-07",
              "d-1",
              "dossier-1"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "summary": {
                "default": "A의 프리랜서 소득은 일시적이었는가, 고의… 카드에서 추가로 열린 사실입니다."
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
            "id": "spouse-new-07:a:d-2:S3:0",
            "factText": "A의 프리랜서 소득은 일시적이었는가, 고의… 카드에서 A측이 숨기던 설명 조각이 더 드러난다.",
            "tags": [
              "thread-e",
              "spouse-new-07",
              "d-2",
              "dossier-1"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "summary": {
                "default": "A의 프리랜서 소득은 일시적이었는가, 고의… 카드에서 추가로 열린 사실입니다."
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
            "id": "spouse-new-07:a:d-2:S2:0",
            "factText": "B의 회사·은행 통보는 불가피한 신고였는가… 카드에서 A측이 숨기던 설명 조각이 더 드러난다.",
            "tags": [
              "thread-e",
              "spouse-new-07",
              "d-2",
              "dossier-2"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "summary": {
                "default": "B의 회사·은행 통보는 불가피한 신고였는가… 카드에서 추가로 열린 사실입니다."
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
            "id": "spouse-new-07:a:d-3:S3:0",
            "factText": "B의 회사·은행 통보는 불가피한 신고였는가… 카드에서 A측이 숨기던 설명 조각이 더 드러난다.",
            "tags": [
              "thread-e",
              "spouse-new-07",
              "d-3",
              "dossier-2"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "summary": {
                "default": "B의 회사·은행 통보는 불가피한 신고였는가… 카드에서 추가로 열린 사실입니다."
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
            "id": "spouse-new-07:a:d-3:S2:0",
            "factText": "피부양자 구조로 실제 이익을 본 사람은 누… 카드에서 A측이 숨기던 설명 조각이 더 드러난다.",
            "tags": [
              "thread-e",
              "spouse-new-07",
              "d-3",
              "dossier-3"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "summary": {
                "default": "피부양자 구조로 실제 이익을 본 사람은 누… 카드에서 추가로 열린 사실입니다."
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
            "id": "spouse-new-07:a:d-4:S3:0",
            "factText": "피부양자 구조로 실제 이익을 본 사람은 누… 카드에서 A측이 숨기던 설명 조각이 더 드러난다.",
            "tags": [
              "thread-e",
              "spouse-new-07",
              "d-4",
              "dossier-3"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "summary": {
                "default": "피부양자 구조로 실제 이익을 본 사람은 누… 카드에서 추가로 열린 사실입니다."
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
            "id": "spouse-new-07:a:d-4:S2:0",
            "factText": "친정 재활비 지원을 왜 공동재정에서 숨겼는가 카드에서 A측이 숨기던 설명 조각이 더 드러난다.",
            "tags": [
              "thread-e",
              "spouse-new-07",
              "d-4",
              "dossier-4"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "summary": {
                "default": "친정 재활비 지원을 왜 공동재정에서 숨겼는가 카드에서 추가로 열린 사실입니다."
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
      "d-5": {
        "S3": [
          {
            "id": "spouse-new-07:a:d-5:S3:0",
            "factText": "친정 재활비 지원을 왜 공동재정에서 숨겼는가 카드에서 A측이 숨기던 설명 조각이 더 드러난다.",
            "tags": [
              "thread-e",
              "spouse-new-07",
              "d-5",
              "dossier-4"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "summary": {
                "default": "친정 재활비 지원을 왜 공동재정에서 숨겼는가 카드에서 추가로 열린 사실입니다."
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
            "id": "spouse-new-07:b:d-1:S2:0",
            "factText": "A의 프리랜서 소득은 일시적이었는가, 고의… 카드에서 B측이 숨기던 설명 조각이 더 드러난다.",
            "tags": [
              "thread-e",
              "spouse-new-07",
              "d-1",
              "dossier-1"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "summary": {
                "default": "A의 프리랜서 소득은 일시적이었는가, 고의… 카드에서 추가로 열린 사실입니다."
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
            "id": "spouse-new-07:b:d-2:S3:0",
            "factText": "A의 프리랜서 소득은 일시적이었는가, 고의… 카드에서 B측이 숨기던 설명 조각이 더 드러난다.",
            "tags": [
              "thread-e",
              "spouse-new-07",
              "d-2",
              "dossier-1"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "summary": {
                "default": "A의 프리랜서 소득은 일시적이었는가, 고의… 카드에서 추가로 열린 사실입니다."
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
            "id": "spouse-new-07:b:d-2:S2:0",
            "factText": "B의 회사·은행 통보는 불가피한 신고였는가… 카드에서 B측이 숨기던 설명 조각이 더 드러난다.",
            "tags": [
              "thread-e",
              "spouse-new-07",
              "d-2",
              "dossier-2"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "summary": {
                "default": "B의 회사·은행 통보는 불가피한 신고였는가… 카드에서 추가로 열린 사실입니다."
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
            "id": "spouse-new-07:b:d-3:S3:0",
            "factText": "B의 회사·은행 통보는 불가피한 신고였는가… 카드에서 B측이 숨기던 설명 조각이 더 드러난다.",
            "tags": [
              "thread-e",
              "spouse-new-07",
              "d-3",
              "dossier-2"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "summary": {
                "default": "B의 회사·은행 통보는 불가피한 신고였는가… 카드에서 추가로 열린 사실입니다."
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
            "id": "spouse-new-07:b:d-3:S2:0",
            "factText": "피부양자 구조로 실제 이익을 본 사람은 누… 카드에서 B측이 숨기던 설명 조각이 더 드러난다.",
            "tags": [
              "thread-e",
              "spouse-new-07",
              "d-3",
              "dossier-3"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "summary": {
                "default": "피부양자 구조로 실제 이익을 본 사람은 누… 카드에서 추가로 열린 사실입니다."
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
            "id": "spouse-new-07:b:d-4:S3:0",
            "factText": "피부양자 구조로 실제 이익을 본 사람은 누… 카드에서 B측이 숨기던 설명 조각이 더 드러난다.",
            "tags": [
              "thread-e",
              "spouse-new-07",
              "d-4",
              "dossier-3"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "summary": {
                "default": "피부양자 구조로 실제 이익을 본 사람은 누… 카드에서 추가로 열린 사실입니다."
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
            "id": "spouse-new-07:b:d-4:S2:0",
            "factText": "친정 재활비 지원을 왜 공동재정에서 숨겼는가 카드에서 B측이 숨기던 설명 조각이 더 드러난다.",
            "tags": [
              "thread-e",
              "spouse-new-07",
              "d-4",
              "dossier-4"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "summary": {
                "default": "친정 재활비 지원을 왜 공동재정에서 숨겼는가 카드에서 추가로 열린 사실입니다."
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
      "d-5": {
        "S3": [
          {
            "id": "spouse-new-07:b:d-5:S3:0",
            "factText": "친정 재활비 지원을 왜 공동재정에서 숨겼는가 카드에서 B측이 숨기던 설명 조각이 더 드러난다.",
            "tags": [
              "thread-e",
              "spouse-new-07",
              "d-5",
              "dossier-4"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "summary": {
                "default": "친정 재활비 지원을 왜 공동재정에서 숨겼는가 카드에서 추가로 열린 사실입니다."
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
        "id": "spouse-new-07-contradiction-1",
        "statementA": "배수진은 A의 프리랜서 소득은 일시적이었는가, 고의 은폐였는가에서 자신이 더 조심스러웠다고 말한다.",
        "statementB": "박현우은 같은 장면을 상대가 먼저 밀어붙인 결과라고 설명한다.",
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
        "id": "spouse-new-07-contradiction-2",
        "statementA": "프리랜서 소득과 친정 지원 지출을 숨겨 피부양자·대출 구조를 유지한 것",
        "statementB": "A의 소득 정보를 회사 HR과 은행에 넘기고, 그동안은 그 구조로 회사 복지 혜택을 받아온 것",
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
        "id": "spouse-new-07-interjection-a",
        "interruptor": "a",
        "interjectionLine": "배수진은 지금 질문이 사건 구조를 너무 단순하게 자른다고 항의한다.",
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
        "id": "spouse-new-07-interjection-b",
        "interruptor": "b",
        "interjectionLine": "박현우은 상대가 더 큰 계산을 숨긴 채 자신만 몰고 간다고 반발한다.",
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
        "id": "spouse-new-07-outburst-a",
        "party": "a",
        "outburstLine": "배수진은 자신만 계산적으로 몰리는 순간 강하게 반발한다.",
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
        "id": "spouse-new-07-outburst-b",
        "party": "b",
        "outburstLine": "박현우은 상대가 먼저 판을 설계했는데 자신만 더 무겁게 보인다고 폭발한다.",
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
      "id": "spouse-new-07-beat-a",
      "caseId": "spouse-new-07",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S1",
      "toState": "S2",
      "primaryBeatType": "evidence_hit",
      "line": "배수진의 설명에서 빠졌던 연결 고리가 증거와 함께 붙는다.",
      "behaviorHint": "답변 길이가 짧아지고 누락된 부분이 방어 대신 인정 쪽으로 기울기 시작한다."
    },
    {
      "id": "spouse-new-07-beat-b",
      "caseId": "spouse-new-07",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S2",
      "toState": "S3",
      "primaryBeatType": "counter_shift",
      "line": "박현우은 자기 책임 일부를 인정하면서도 상대의 선행 선택을 다시 끌어온다.",
      "behaviorHint": "상대 비난 문장이 늘고 자기 설명은 더 짧고 단단해진다."
    }
  ]
} as const
