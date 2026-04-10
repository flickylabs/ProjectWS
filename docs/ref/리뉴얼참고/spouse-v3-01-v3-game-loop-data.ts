export const SpouseV301V3GameLoopData = {
  "caseId": "spouse-v3-01",
  "dossierCards": [
    {
      "id": "dc-1",
      "name": "오피스텔의 사람들",
      "description": "외도 서사를 가족 돌봄 서사로 뒤집는 첫 반전 카드다.",
      "evidenceIds": [
        "e-2",
        "e-4"
      ],
      "relatedDisputes": [
        "d-1",
        "h-d4"
      ],
      "subjectParty": "b",
      "leadId": "L-1",
      "successConditionSummary": [
        "e-4가 Original 이상",
        "B에게 공감접근 또는 분리심문 사용"
      ],
      "successEffects": [
        "d-1 핵심 사실 \"외도 아님\" 잠정 인정 가능",
        "B가 시댁 불화와 조카 사정을 직접 언급"
      ],
      "challenges": [
        {
          "targetParty": "b",
          "questions": [
            {
              "id": "dc-1.b.q1",
              "text": "그 오피스텔에 있던 사람이 외도 상대가 아니라 형과 조카라면, 왜 지금까지 한마디도 못 했습니까?",
              "lockedHint": "형 문자와 조카 알림이 원본 수준까지 열려야 질문이 보인다.",
              "attackVector": "context",
              "requiredLieState": "S2",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "spouse-v3-01:b:d-1:S3:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dc-2",
      "name": "시댁 얘기만 나오면 싸움",
      "description": "왜 숨겼는가를 외도 은폐가 아니라 시댁 불화 공포로 정리하는 카드다.",
      "evidenceIds": [
        "e-3",
        "e-4"
      ],
      "relatedDisputes": [
        "d-1"
      ],
      "subjectParty": "b",
      "leadId": "L-2",
      "successConditionSummary": [
        "L-2 완성",
        "정확히 답변하십시오 사용 또는 B의 모호어 제거 상태"
      ],
      "successEffects": [
        "d-1의 왜 숨겼나 칸이 채워진다",
        "민감정보 봉인 해제 없이도 시댁 불화 맥락 일부 확보"
      ],
      "challenges": [
        {
          "targetParty": "b",
          "questions": [
            {
              "id": "dc-2.b.q1",
              "text": "숨긴 이유가 외도가 아니라면, 당신은 아내보다 시댁과의 싸움을 더 두려워한 겁니까?",
              "lockedHint": "B가 모호어를 버리고 숨김의 이유를 설명하기 시작해야 열린다.",
              "attackVector": "context",
              "requiredLieState": "S3",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "spouse-v3-01:b:d-1:S4:1",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dc-3",
      "name": "3,000만 원의 권한",
      "description": "공동 적금 3,000만 원을 혼자 형에게 보낼 권리가 있었는지 정면으로 묻는 카드다.",
      "evidenceIds": [
        "e-4",
        "e-5"
      ],
      "relatedDisputes": [
        "d-2"
      ],
      "subjectParty": "b",
      "leadId": "L-3",
      "successConditionSummary": [
        "L-3 완성",
        "e-5가 Original 이상"
      ],
      "successEffects": [
        "d-2가 S4~S5로 진전",
        "B가 빚 상환 이유와 자기정당화의 한계를 함께 인정"
      ],
      "challenges": [
        {
          "targetParty": "b",
          "questions": [
            {
              "id": "dc-3.b.q1",
              "text": "공동 적금 3,000만 원을 형에게 줄 권리가 정말 당신 혼자에게 있었습니까?",
              "lockedHint": "3,000만 원 해지와 형 계좌 이체가 원본 수준까지 열려야 보인다.",
              "attackVector": "authenticity",
              "requiredLieState": "S3",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "spouse-v3-01:b:d-2:S4:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dc-3.b.q2",
              "text": "가족을 돕는 일이었다 해도, 배우자 동의 없이 공동 적금을 깬 책임은 인정합니까?",
              "lockedHint": "B가 3,000만 원 전액 이체 사실을 이미 인정해야 마지막 질문이 열린다.",
              "attackVector": "context",
              "requiredLieState": "S4",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "spouse-v3-01:b:d-2:S5:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dc-4",
      "name": "2,000만 원의 수치",
      "description": "A가 남편의 진실을 확인하기도 전에 2,000만 원을 옮긴 이유를 정면으로 묻는 카드다.",
      "evidenceIds": [
        "e-6"
      ],
      "relatedDisputes": [
        "h-d3"
      ],
      "subjectParty": "a",
      "leadId": "L-4",
      "successConditionSummary": [
        "L-4 완성",
        "A에게 동기탐색 누적 2회 이상"
      ],
      "successEffects": [
        "h-d3가 생성되거나 심화",
        "A의 수치심과 사기 피해 고백이 열린다"
      ],
      "challenges": [
        {
          "targetParty": "a",
          "questions": [
            {
              "id": "dc-4.a.q1",
              "text": "남편의 진실을 확인하기도 전에 2,000만 원을 먼저 움직인 이유가, 결국 이혼 대비였습니까?",
              "lockedHint": "2,000만 원 송금 축과 A의 방어 발언이 함께 붙어야 열린다.",
              "attackVector": "context",
              "requiredLieState": "S2",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "spouse-v3-01:a:h-d3:S3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dc-4.a.q2",
              "text": "그 2,000만 원을 보내고 사기당한 사실까지 숨긴 건 결국 수치심 때문이었습니까?",
              "lockedHint": "A가 송금 동기를 어느 정도 인정해야 두 번째 질문이 열린다.",
              "attackVector": "authenticity",
              "requiredLieState": "S3",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "spouse-v3-01:a:h-d3:S4:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dc-5",
      "name": "5,000만 원의 순서",
      "description": "누가 먼저 숨겼는지와 누가 먼저 돈을 움직였는지를 같은 질문 안에서 분리해 묻는 최종 카드다.",
      "evidenceIds": [
        "e-5",
        "e-6",
        "e-7"
      ],
      "relatedDisputes": [
        "h-d4"
      ],
      "subjectParty": "both",
      "leadId": "L-5",
      "successConditionSummary": [
        "L-5 완성",
        "e-7이 Original 이상"
      ],
      "successEffects": [
        "h-d4 해금",
        "평의의 무슨 일이 있었나와 왜 숨겼나 두 칸이 함께 채워진다"
      ],
      "challenges": [
        {
          "targetParty": "b",
          "questions": [
            {
              "id": "dc-5.b.q1",
              "text": "숨김은 누가 먼저 시작했고, 돈은 누가 먼저 움직였습니까?",
              "lockedHint": "e-7 시간축이 열려야 순서 질문이 가능하다.",
              "attackVector": "authenticity",
              "requiredLieState": "S2",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "spouse-v3-01:b:h-d4:S3:0",
                "lieAdvance": true
              }
            }
          ]
        },
        {
          "targetParty": "a",
          "questions": [
            {
              "id": "dc-5.a.q1",
              "text": "남편이 먼저 숨겼다고 해도, 실제 비밀 송금 실행은 당신이 먼저였다는 점까지 인정합니까?",
              "lockedHint": "A가 2,000만 원 송금을 일부 인정한 뒤에야 열린다.",
              "attackVector": "context",
              "requiredLieState": "S2",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "spouse-v3-01:a:h-d4:S3:0",
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
      "d-1": {},
      "d-2": {},
      "h-d3": {
        "S3": [
          {
            "id": "spouse-v3-01:a:h-d3:S3:0",
            "factText": "박지연은 남편이 바람이라고 믿었고 그래서 자기 몫을 먼저 지켜야 한다는 마음으로 2,000만 원을 움직였다고 인정한다.",
            "tags": [
              "thread-g",
              "spouse-v3-01",
              "h-d3",
              "dc-4"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "summary": {
                "default": "박지연은 남편이 바람이라고 믿었고 그래서 자기 몫을 먼저 지켜야 한다는 마음으로 2,000만 원을 움직였다고 인정한다."
              }
            },
            "stanceHints": [
              "partial",
              "emotional",
              "confess"
            ]
          }
        ],
        "S4": [
          {
            "id": "spouse-v3-01:a:h-d3:S4:0",
            "factText": "박지연은 2,000만 원 송금에 자기방어와 이혼 대비 은닉 심리가 함께 얽혀 있었다고 인정한다.",
            "tags": [
              "thread-g",
              "spouse-v3-01",
              "h-d3",
              "dc-4"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "summary": {
                "default": "박지연은 2,000만 원 송금에 자기방어와 이혼 대비 은닉 심리가 함께 얽혀 있었다고 인정한다."
              }
            },
            "stanceHints": [
              "partial",
              "emotional",
              "confess"
            ]
          }
        ]
      },
      "h-d4": {
        "S3": [
          {
            "id": "spouse-v3-01:a:h-d4:S3:0",
            "factText": "박지연은 남편이 먼저 숨긴 건 맞지만 실제 비밀 송금 실행은 자신 쪽이 먼저였다는 점을 받아들이기 시작한다.",
            "tags": [
              "thread-g",
              "spouse-v3-01",
              "h-d4",
              "dc-5"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "summary": {
                "default": "박지연은 남편이 먼저 숨긴 건 맞지만 실제 비밀 송금 실행은 자신 쪽이 먼저였다는 점을 받아들이기 시작한다."
              }
            },
            "stanceHints": [
              "partial",
              "emotional",
              "confess"
            ]
          }
        ]
      }
    },
    "b": {
      "d-1": {
        "S3": [
          {
            "id": "spouse-v3-01:b:d-1:S3:0",
            "factText": "이준호는 형네 돌봄 사실을 시댁 불화가 다시 터질까 봐 차마 말하지 못했다고 인정한다.",
            "tags": [
              "thread-g",
              "spouse-v3-01",
              "d-1",
              "dc-1"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "summary": {
                "default": "이준호는 형네 돌봄 사실을 시댁 불화가 다시 터질까 봐 차마 말하지 못했다고 인정한다."
              }
            },
            "stanceHints": [
              "partial",
              "emotional",
              "confess"
            ]
          }
        ],
        "S4": [
          {
            "id": "spouse-v3-01:b:d-1:S4:1",
            "factText": "이준호는 숨김의 이유가 외도 은폐가 아니라 시댁 불화와 체면 공포였다고 더 분명하게 말한다.",
            "tags": [
              "thread-g",
              "spouse-v3-01",
              "d-1",
              "dc-2"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "summary": {
                "default": "이준호는 숨김의 이유가 외도 은폐가 아니라 시댁 불화와 체면 공포였다고 더 분명하게 말한다."
              }
            },
            "stanceHints": [
              "partial",
              "emotional",
              "confess"
            ]
          }
        ]
      },
      "d-2": {
        "S4": [
          {
            "id": "spouse-v3-01:b:d-2:S4:0",
            "factText": "이준호는 공동 적금 3,000만 원이 아니면 형네가 당장 무너질 것 같아 먼저 막았다고 인정한다.",
            "tags": [
              "thread-g",
              "spouse-v3-01",
              "d-2",
              "dc-3"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "summary": {
                "default": "이준호는 공동 적금 3,000만 원이 아니면 형네가 당장 무너질 것 같아 먼저 막았다고 인정한다."
              }
            },
            "stanceHints": [
              "partial",
              "emotional",
              "confess"
            ]
          }
        ],
        "S5": [
          {
            "id": "spouse-v3-01:b:d-2:S5:0",
            "factText": "이준호는 배우자가 반대할 걸 알았고 그래서 더 말하지 못한 채 공동 적금을 혼자 처분했다고 인정한다.",
            "tags": [
              "thread-g",
              "spouse-v3-01",
              "d-2",
              "dc-3"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "summary": {
                "default": "이준호는 배우자가 반대할 걸 알았고 그래서 더 말하지 못한 채 공동 적금을 혼자 처분했다고 인정한다."
              }
            },
            "stanceHints": [
              "partial",
              "emotional",
              "confess"
            ]
          }
        ]
      },
      "h-d3": {},
      "h-d4": {
        "S3": [
          {
            "id": "spouse-v3-01:b:h-d4:S3:0",
            "factText": "이준호는 숨김의 시작은 자신이 먼저였지만 실제 비밀 송금 실행은 박지연 쪽이 먼저였다고 분리해서 인정한다.",
            "tags": [
              "thread-g",
              "spouse-v3-01",
              "h-d4",
              "dc-5"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "summary": {
                "default": "이준호는 숨김의 시작은 자신이 먼저였지만 실제 비밀 송금 실행은 박지연 쪽이 먼저였다고 분리해서 인정한다."
              }
            },
            "stanceHints": [
              "partial",
              "emotional",
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
        "id": "spouse-v3-01-contradiction-1",
        "statementA": "박지연은 카드값, 오피스텔, 새벽 통화가 한 장면으로 묶였기 때문에 딴살림 말고는 설명이 없었다고 말한다.",
        "statementB": "이준호는 같은 패턴이 형과 조카를 숨겨 돌본 흔적일 뿐이었다고 말한다.",
        "options": {
          "point_out": {
            "label": "패턴 충돌을 짚는다",
            "effect": "외도 해석과 가족 돌봄 해석이 정면으로 부딪힌다."
          },
          "let_go": {
            "label": "다음 증거를 기다린다",
            "effect": "초반 오해를 남긴 채 e-4 반전을 준비한다."
          }
        },
        "npcReaction": "같은 반복 패턴이 전혀 다른 서사로 읽히고 있었다는 사실이 드러난다."
      },
      {
        "id": "spouse-v3-01-contradiction-2",
        "statementA": "박지연은 먼저 배신당했다고 믿었기 때문에 2,000만 원을 지켜야 했다고 말한다.",
        "statementB": "이준호는 형과 조카를 지키려다 적금 3,000만 원을 먼저 막아 준 것뿐이라고 말한다.",
        "options": {
          "point_out": {
            "label": "돈의 순서를 겨눈다",
            "effect": "숨김의 시작과 송금의 시작이 다른 질문이라는 점이 드러난다."
          },
          "let_go": {
            "label": "동기를 먼저 듣는다",
            "effect": "각자 자기 정당화 서사가 조금 더 길어진다."
          }
        },
        "npcReaction": "누가 먼저 배신했는지와 누가 먼저 실행했는지가 갈라진다."
      }
    ],
    "interjections": [
      {
        "id": "spouse-v3-01-interjection-a",
        "interruptor": "a",
        "interjectionLine": "박지연은 카드값과 새벽 통화까지 보고 어떻게 외도를 의심하지 않을 수 있느냐고 끼어든다.",
        "options": {
          "allow": {
            "label": "계속 말하게 둔다",
            "effect": "A의 피해자 프레임과 수치심이 더 드러난다."
          },
          "block": {
            "label": "증거로 되돌린다",
            "effect": "감정선 대신 자금 이동과 시간축 질문으로 복귀한다."
          }
        }
      },
      {
        "id": "spouse-v3-01-interjection-b",
        "interruptor": "b",
        "interjectionLine": "이준호는 형네 얘기를 꺼내는 순간 다시 시댁 싸움으로만 몰릴까 봐 끼어든다.",
        "options": {
          "allow": {
            "label": "이유를 더 듣는다",
            "effect": "B의 회피가 단순 거짓말은 아니었다는 결이 드러난다."
          },
          "block": {
            "label": "공동 적금으로 되돌린다",
            "effect": "가족 사정보다 월권 책임이 앞으로 나온다."
          }
        }
      }
    ],
    "emotionalOutbursts": [
      {
        "id": "spouse-v3-01-outburst-a",
        "party": "a",
        "outburstLine": "박지연은 자신만 돈을 숨긴 사람처럼 몰리는 순간 남편의 오피스텔 방문과 새벽 통화를 다시 꺼내며 흔들린다.",
        "options": {
          "press": {
            "label": "송금 실행을 더 묻는다",
            "effect": "A가 2,000만 원 송금 이유를 더 빨리 인정한다."
          },
          "calm": {
            "label": "시간을 준다",
            "effect": "A가 사기당한 수치심을 조금 더 조심스럽게 털어놓는다."
          }
        }
      },
      {
        "id": "spouse-v3-01-outburst-b",
        "party": "b",
        "outburstLine": "이준호는 형네 얘기를 꺼내는 순간 다시 시댁 싸움으로만 몰릴까 봐 말을 끊고 숨을 고른다.",
        "options": {
          "press": {
            "label": "3,000만 원 책임을 겨눈다",
            "effect": "B가 공동 적금 독단 처분을 더 빨리 인정한다."
          },
          "calm": {
            "label": "가족 사정부터 듣는다",
            "effect": "B가 왜 침묵을 택했는지 길게 설명한다."
          }
        }
      }
    ]
  },
  "transitionBeats": [
    {
      "id": "spouse-v3-01-beat-b-d1-s1-s2",
      "caseId": "spouse-v3-01",
      "party": "b",
      "disputeId": "d-1",
      "fromState": "S1",
      "toState": "S2",
      "primaryBeatType": "evidence_hit",
      "line": "이준호는 더 숨기기 어려워졌다는 걸 알면서도 가족 일이라는 말만 먼저 꺼낸다.",
      "behaviorHint": "답이 짧아지고 시선이 아래로 떨어진다."
    },
    {
      "id": "spouse-v3-01-beat-b-d1-s2-s3",
      "caseId": "spouse-v3-01",
      "party": "b",
      "disputeId": "d-1",
      "fromState": "S2",
      "toState": "S3",
      "primaryBeatType": "partial",
      "line": "이준호는 형네 일이었고 시댁 얘기만 꺼내면 더 크게 싸울 게 뻔해서 말을 못 했다고 털어놓는다.",
      "behaviorHint": "변명보다 이유 설명이 길어진다."
    },
    {
      "id": "spouse-v3-01-beat-b-d2-s2-s3",
      "caseId": "spouse-v3-01",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S2",
      "toState": "S3",
      "primaryBeatType": "confession",
      "line": "이준호는 3,000만 원 전부 형 빚을 막는 데 썼다고 인정하지만 그때는 그 방법밖에 없었다고 덧붙인다.",
      "behaviorHint": "숫자를 말하는 목소리는 단단하지만 마지막 문장 끝이 흔들린다."
    },
    {
      "id": "spouse-v3-01-beat-a-hd3-s2-s3",
      "caseId": "spouse-v3-01",
      "party": "a",
      "disputeId": "h-d3",
      "fromState": "S2",
      "toState": "S3",
      "primaryBeatType": "confession",
      "line": "박지연은 혹시 몰라 제 몫을 지키려 2,000만 원을 보냈고 결국 다 날렸다고 인정한다.",
      "behaviorHint": "금액 부분에서 속도가 느려진다."
    },
    {
      "id": "spouse-v3-01-beat-a-hd4-s2-s3",
      "caseId": "spouse-v3-01",
      "party": "a",
      "disputeId": "h-d4",
      "fromState": "S2",
      "toState": "S3",
      "primaryBeatType": "counter_shift",
      "line": "박지연은 먼저 숨긴 쪽은 남편이었다고 되받아치지만 실제 송금이 먼저 실행된 건 자기 쪽이었다는 사실도 부정하지 못한다.",
      "behaviorHint": "상대 비난과 자기 인정이 한 문장 안에서 충돌한다."
    },
    {
      "id": "spouse-v3-01-beat-b-hd4-s2-s3",
      "caseId": "spouse-v3-01",
      "party": "b",
      "disputeId": "h-d4",
      "fromState": "S2",
      "toState": "S3",
      "primaryBeatType": "partial",
      "line": "이준호는 자신이 먼저 숨긴 건 맞지만 먼저 돈을 움직인 건 박지연 쪽이었다고 힘겹게 선을 긋는다.",
      "behaviorHint": "고개를 끄덕인 뒤 바로 반박 문장을 이어 붙인다."
    }
  ],
  "evidenceProgressions": [
    {
      "evidenceId": "e-1",
      "name": "카드 명세서",
      "depthStages": [
        {
          "id": "stub",
          "label": "Stub",
          "summary": "카드 명세서 1건 존재만 보임"
        },
        {
          "id": "excerpt",
          "label": "Excerpt",
          "summary": "생리대, 스타킹, 컵죽, 즉석국 항목만 보임"
        },
        {
          "id": "original",
          "label": "Original",
          "summary": "날짜, 시각, 금액, 지점이 모두 보이는 전체 내역"
        },
        {
          "id": "context",
          "label": "Context",
          "summary": "e-2, e-3와 같은 날 겹치는 흐름이 붙음"
        },
        {
          "id": "established",
          "label": "Established",
          "summary": "반복 구매 자체는 사실로 공식기록 채택"
        }
      ],
      "trustStates": [
        {
          "id": "submitted",
          "label": "제출됨",
          "summary": "A가 캡처 제출"
        },
        {
          "id": "verifying",
          "label": "검증 중",
          "summary": "원본 제출 명령으로 전체 내역 확인"
        },
        {
          "id": "authenticated",
          "label": "인증됨",
          "summary": "카드앱 원본과 문자 시각이 일치"
        },
        {
          "id": "challenged",
          "label": "이의 제기됨",
          "summary": "품목만으로 외도 단정은 오독이라는 이의"
        },
        {
          "id": "misread",
          "label": "조작/오독 판정",
          "summary": "데이터는 인증되지만 외도 해석은 오독 가능"
        }
      ],
      "sealTargets": []
    },
    {
      "evidenceId": "e-2",
      "name": "오피스텔 주차 출입 기록",
      "depthStages": [
        {
          "id": "stub",
          "label": "Stub",
          "summary": "출입기록 1건 존재만 보임"
        },
        {
          "id": "excerpt",
          "label": "Excerpt",
          "summary": "평일 저녁 반복 진입 날짜 목록"
        },
        {
          "id": "original",
          "label": "Original",
          "summary": "차량 번호와 진입/출차 시각, 체류 시간 확보"
        },
        {
          "id": "context",
          "label": "Context",
          "summary": "e-1 결제와 e-3 통화 흐름이 붙음"
        },
        {
          "id": "established",
          "label": "Established",
          "summary": "B의 반복 방문 사실이 공식기록 채택"
        }
      ],
      "trustStates": [
        {
          "id": "submitted",
          "label": "제출됨",
          "summary": "A가 관리실 출력본 제출"
        },
        {
          "id": "verifying",
          "label": "검증 중",
          "summary": "원본대장과 차량번호 대조"
        },
        {
          "id": "authenticated",
          "label": "인증됨",
          "summary": "B 차량번호와 일치"
        },
        {
          "id": "challenged",
          "label": "이의 제기됨",
          "summary": "외도 장소라고 단정할 수 없다는 이의"
        },
        {
          "id": "misread",
          "label": "조작/오독 판정",
          "summary": "장소 데이터는 인증되나 의미 해석은 열려 있음"
        }
      ],
      "sealTargets": []
    },
    {
      "evidenceId": "e-3",
      "name": "새벽 통화기록",
      "depthStages": [
        {
          "id": "stub",
          "label": "Stub",
          "summary": "같은 번호와의 반복 통화 존재 표시"
        },
        {
          "id": "excerpt",
          "label": "Excerpt",
          "summary": "최근 3주 새벽 통화 횟수와 길이만 보임"
        },
        {
          "id": "original",
          "label": "Original",
          "summary": "전체 통화 일시와 번호, 길이 확보"
        },
        {
          "id": "context",
          "label": "Context",
          "summary": "e-2 방문과 e-1 결제가 같은 날 이어짐"
        },
        {
          "id": "established",
          "label": "Established",
          "summary": "반복 통화와 반복 방문의 연동이 공식기록 채택"
        }
      ],
      "trustStates": [
        {
          "id": "submitted",
          "label": "제출됨",
          "summary": "A가 통화목록 캡처 제출"
        },
        {
          "id": "verifying",
          "label": "검증 중",
          "summary": "원본 제출 명령으로 상세내역 대조"
        },
        {
          "id": "authenticated",
          "label": "인증됨",
          "summary": "통신사 상세내역과 일치"
        },
        {
          "id": "challenged",
          "label": "이의 제기됨",
          "summary": "통화 상대 정체가 빠져 있다는 이의"
        },
        {
          "id": "misread",
          "label": "조작/오독 판정",
          "summary": "통화 자체는 인증되지만 외도 해석은 잠정 가설"
        }
      ],
      "sealTargets": []
    },
    {
      "evidenceId": "e-4",
      "name": "형 문자 + 조카 학교 알림 문자",
      "depthStages": [
        {
          "id": "stub",
          "label": "Stub",
          "summary": "같은 번호와의 문자 스레드 존재만 보임"
        },
        {
          "id": "excerpt",
          "label": "Excerpt",
          "summary": "돌봄 요청 문구 일부만 보임"
        },
        {
          "id": "original",
          "label": "Original",
          "summary": "연락처가 친형으로 확인되고 학교 알림까지 연결됨"
        },
        {
          "id": "context",
          "label": "Context",
          "summary": "시댁 불화와 형의 장시간 노동 맥락 복원"
        },
        {
          "id": "established",
          "label": "Established",
          "summary": "오피스텔 방문 대상은 형네였다고 공식기록 채택 가능"
        }
      ],
      "trustStates": [
        {
          "id": "submitted",
          "label": "제출됨",
          "summary": "B 발췌본 또는 재판관 포착"
        },
        {
          "id": "verifying",
          "label": "검증 중",
          "summary": "원본 제출 명령으로 전체 스레드 확인"
        },
        {
          "id": "authenticated",
          "label": "인증됨",
          "summary": "연락처, 날짜, 알림이 e-2, e-3와 부합"
        },
        {
          "id": "challenged",
          "label": "이의 제기됨",
          "summary": "형네 문자라고 해서 3,000만 원까지 정당화되진 않는다는 이의"
        },
        {
          "id": "misread",
          "label": "조작/오독 판정",
          "summary": "외도 서사를 뒤집는 맥락 증거로 전환"
        }
      ],
      "sealTargets": [
        "조카 이름",
        "학교명",
        "학년",
        "생리 관련 직접 표현"
      ]
    },
    {
      "evidenceId": "e-5",
      "name": "공동 적금 해지 내역 + 형 계좌 이체",
      "depthStages": [
        {
          "id": "stub",
          "label": "Stub",
          "summary": "공동 적금 해지 내역 1건 존재만 보임"
        },
        {
          "id": "excerpt",
          "label": "Excerpt",
          "summary": "해지일과 3,000만 원만 보임"
        },
        {
          "id": "original",
          "label": "Original",
          "summary": "형 계좌로 이체된 정확 내역까지 확인"
        },
        {
          "id": "context",
          "label": "Context",
          "summary": "형의 급한 빚 독촉 정황이 붙음"
        },
        {
          "id": "established",
          "label": "Established",
          "summary": "B가 배우자 동의 없이 3,000만 원을 형에게 보냈다고 공식기록 채택"
        }
      ],
      "trustStates": [
        {
          "id": "submitted",
          "label": "제출됨",
          "summary": "A가 통장내역 일부 제출"
        },
        {
          "id": "verifying",
          "label": "검증 중",
          "summary": "계좌 원본 조회와 앱 원본 확인"
        },
        {
          "id": "authenticated",
          "label": "인증됨",
          "summary": "해지와 이체가 동일 날짜로 확인"
        },
        {
          "id": "challenged",
          "label": "이의 제기됨",
          "summary": "B가 빌려준 돈이라고 주장"
        },
        {
          "id": "misread",
          "label": "조작/오독 판정",
          "summary": "데이터는 인증되지만 사용 목적은 맥락과 심문으로 확정"
        }
      ],
      "sealTargets": []
    },
    {
      "evidenceId": "e-6",
      "name": "A의 투자방 카톡 + 2,000만 원 송금 영수증",
      "depthStages": [
        {
          "id": "stub",
          "label": "Stub",
          "summary": "A의 개인 송금 1건 존재만 보임"
        },
        {
          "id": "excerpt",
          "label": "Excerpt",
          "summary": "2,000만 원 영수증과 짧은 문장만 보임"
        },
        {
          "id": "original",
          "label": "Original",
          "summary": "발언, 링크, 송금 계좌 일치까지 확인"
        },
        {
          "id": "context",
          "label": "Context",
          "summary": "사기당한 뒤 숨긴 정황과 수치심이 복원됨"
        },
        {
          "id": "established",
          "label": "Established",
          "summary": "A가 2,000만 원을 따로 움직였다가 잃었다고 공식기록 채택 가능"
        }
      ],
      "trustStates": [
        {
          "id": "submitted",
          "label": "제출됨",
          "summary": "B가 존재를 문제 삼거나 A가 일부만 제출"
        },
        {
          "id": "verifying",
          "label": "검증 중",
          "summary": "분리심문(A)과 원본 제출 명령으로 대조"
        },
        {
          "id": "authenticated",
          "label": "인증됨",
          "summary": "채팅 시각과 송금 시각이 일치"
        },
        {
          "id": "challenged",
          "label": "이의 제기됨",
          "summary": "숨기려 한 건 맞지만 은닉은 아니었다는 이의"
        },
        {
          "id": "misread",
          "label": "조작/오독 판정",
          "summary": "사기 피해 자체는 인증되지만 자기방어인지 은닉인지는 열려 있음"
        }
      ],
      "sealTargets": []
    },
    {
      "evidenceId": "e-7",
      "name": "통화·출입·계좌 이동 대조표",
      "depthStages": [
        {
          "id": "stub",
          "label": "Stub",
          "summary": "비교 대조표 생성 가능 상태만 표시"
        },
        {
          "id": "excerpt",
          "label": "Excerpt",
          "summary": "비밀 방문 시작과 비밀 송금 시점의 거친 순서"
        },
        {
          "id": "original",
          "label": "Original",
          "summary": "정확한 날짜와 시각이 한 장으로 정리됨"
        },
        {
          "id": "context",
          "label": "Context",
          "summary": "각 시점의 핵심 발언과 심리 상태가 붙음"
        },
        {
          "id": "established",
          "label": "Established",
          "summary": "숨김은 B가 먼저, 실제 비밀 송금은 A가 먼저라는 시간축이 공식기록 채택 대상"
        }
      ],
      "trustStates": [
        {
          "id": "submitted",
          "label": "제출됨",
          "summary": "다른 증거 조합을 통해 생성되는 종합 자료"
        },
        {
          "id": "verifying",
          "label": "검증 중",
          "summary": "e-1부터 e-6의 핵심 축이 인증될 때 생성"
        },
        {
          "id": "authenticated",
          "label": "인증됨",
          "summary": "기반 증거 4개 이상이 인증되면 표도 인증"
        },
        {
          "id": "challenged",
          "label": "이의 제기됨",
          "summary": "A와 B 모두 순서가 의미 없다고 이의 가능"
        },
        {
          "id": "misread",
          "label": "조작/오독 판정",
          "summary": "표 자체는 조작 불가이고 해석은 Reframe 선택에 따라 달라짐"
        }
      ],
      "sealTargets": []
    }
  ],
  "leadLines": [
    {
      "id": "L-1",
      "name": "Timeline Lead",
      "leadType": "Timeline",
      "firstInputs": [
        "e-1",
        "e-2"
      ],
      "secondInputs": [
        "L-1",
        "e-4"
      ],
      "dossierCardId": "dc-1",
      "interpretationChoices": [
        {
          "id": "L-1-A",
          "text": "외도 동선이다",
          "implication": "d-1을 외도 의심으로 밀어붙인다."
        },
        {
          "id": "L-1-B",
          "text": "누군가를 돌보는 생활 동선이다",
          "implication": "e-4 반전과 잘 이어진다."
        },
        {
          "id": "L-1-C",
          "text": "단순 심부름일 수 있다",
          "implication": "판단을 유보한다."
        }
      ]
    },
    {
      "id": "L-2",
      "name": "Context Lead",
      "leadType": "Context",
      "firstInputs": [
        "e-3",
        "stmt-b-family"
      ],
      "secondInputs": [
        "L-2",
        "e-4",
        "w-1-angle"
      ],
      "dossierCardId": "dc-2",
      "interpretationChoices": [
        {
          "id": "L-2-A",
          "text": "외도는 아니지만 창피해서 숨겼다",
          "implication": "B의 수치심을 먼저 본다."
        },
        {
          "id": "L-2-B",
          "text": "시댁 불화를 피하려 숨겼다",
          "implication": "관계 공포 축을 연다."
        }
      ]
    },
    {
      "id": "L-3",
      "name": "Beneficiary Lead",
      "leadType": "Beneficiary",
      "firstInputs": [
        "e-4",
        "e-5"
      ],
      "secondInputs": [
        "L-3",
        "stmt-b-repay",
        "w-1-angle"
      ],
      "dossierCardId": "dc-3",
      "interpretationChoices": [
        {
          "id": "L-3-A",
          "text": "형네를 실제로 살리려 한 돈이다",
          "implication": "선의와 구제 논리를 본다."
        },
        {
          "id": "L-3-B",
          "text": "형의 무책임을 대신 떠안은 월권이다",
          "implication": "공동재산 책임을 본다."
        }
      ]
    },
    {
      "id": "L-4",
      "name": "Emotion Lead",
      "leadType": "Emotion",
      "firstInputs": [
        "e-6",
        "stmt-a-protect"
      ],
      "secondInputs": [
        "L-4",
        "w-3-angle"
      ],
      "dossierCardId": "dc-4",
      "interpretationChoices": [
        {
          "id": "L-4-A",
          "text": "배신 공포 속 자기방어다",
          "implication": "A의 공포를 먼저 본다."
        },
        {
          "id": "L-4-B",
          "text": "이혼 대비 은닉이다",
          "implication": "A의 계산을 먼저 본다."
        }
      ]
    },
    {
      "id": "L-5",
      "name": "Reframe Lead",
      "leadType": "Reframe",
      "firstInputs": [
        "e-5",
        "e-6"
      ],
      "secondInputs": [
        "L-5",
        "e-7"
      ],
      "dossierCardId": "dc-5",
      "interpretationChoices": [
        {
          "id": "L-5-A",
          "text": "남편이 더 큰돈을 먼저 무너뜨렸다",
          "implication": "금액 크기 기준 책임 서사다."
        },
        {
          "id": "L-5-B",
          "text": "아내가 먼저 돈을 움직여 신뢰를 깼다",
          "implication": "실행 순서 기준 책임 서사다."
        },
        {
          "id": "L-5-C",
          "text": "거울형 거짓말 구조다",
          "implication": "상호 붕괴와 대칭 구조를 본다."
        }
      ]
    }
  ],
  "authorityPlacements": [
    {
      "action": "원본 제출 명령",
      "recommendedMoment": "d-1 초반 e-1/e-3 Excerpt 시점",
      "purpose": "감정이 아니라 패턴으로 의심을 고정"
    },
    {
      "action": "원본 제출 명령",
      "recommendedMoment": "e-4 등장 직후",
      "purpose": "형 문자와 조카 알림을 원본으로 확보"
    },
    {
      "action": "원본 제출 명령",
      "recommendedMoment": "h-d3 등장 직후 e-6 축",
      "purpose": "A의 2,000만 원 송금을 확정"
    },
    {
      "action": "정확히 답변하십시오",
      "recommendedMoment": "B가 \"가족 쪽 일\" 같은 모호어를 반복할 때",
      "purpose": "형, 조카, 3,000만 원 같은 실체 명사 강제"
    },
    {
      "action": "분리심문",
      "recommendedMoment": "e-4 Original 직후 B",
      "purpose": "avoidant인 B를 더 빨리 무너뜨림"
    },
    {
      "action": "분리심문",
      "recommendedMoment": "e-6 Excerpt 직후 A",
      "purpose": "A의 피해자 프레임을 줄이고 동기를 드러냄"
    },
    {
      "action": "잠정 인정",
      "recommendedMoment": "e-4 인증 후",
      "purpose": "오피스텔 방문 대상은 형네였다고 기록"
    },
    {
      "action": "잠정 인정",
      "recommendedMoment": "e-5 인증 후",
      "purpose": "공동 적금 3,000만 원 이동 기록"
    },
    {
      "action": "잠정 인정",
      "recommendedMoment": "e-6 인증 후",
      "purpose": "A의 2,000만 원 송금 기록"
    },
    {
      "action": "잠정 인정",
      "recommendedMoment": "e-7 Established 후",
      "purpose": "숨김 시작과 송금 실행의 선후 분리 기록"
    },
    {
      "action": "선처 창구",
      "recommendedMoment": "dc-3 또는 dc-4 직후",
      "purpose": "B는 죄책감, A는 수치심을 더 빨리 인정"
    },
    {
      "action": "발언 제지 / 기록 제외",
      "recommendedMoment": "A가 딴살림 단정만 반복하거나 B가 A를 조롱할 때",
      "purpose": "프레임 싸움을 줄이고 공식기록과 가설을 분리"
    },
    {
      "action": "민감정보 봉인 해제",
      "recommendedMoment": "돌봄 해석을 택했지만 실체가 부족할 때 또는 dc-1 직전",
      "purpose": "외도 오해를 확실히 꺾되 미성년자 사생활 리스크 관리"
    }
  ],
  "hiddenDisputePlans": [
    {
      "disputeId": "h-d3",
      "name": "아내의 2,000만 원 송금은 자기방어인가, 이혼 대비 은닉인가",
      "unlockPlan": {
        "runtimeRule": "e-6 제시 시 해금",
        "authoredRule": "e-6이 Excerpt 이상이 되거나 A에게 동기탐색 2회가 누적되면 생성"
      }
    },
    {
      "disputeId": "h-d4",
      "name": "누가 먼저 신뢰를 깼는가",
      "unlockPlan": {
        "runtimeRule": "h-d3 해금 + e-7 제시 시 해금",
        "authoredRule": "h-d3 생성 후 e-7이 Original 이상이 되거나 e-5+e-6으로 Reframe Lead가 생기면 생성"
      }
    }
  ],
  "sensitiveSealTargets": [
    {
      "evidenceId": "e-4",
      "label": "형 문자 + 조카 학교 알림 문자",
      "targets": [
        "조카 이름",
        "학교명",
        "학년",
        "생리 관련 직접 표현"
      ],
      "recommendedTiming": [
        "돌봄 해석을 택했지만 실체가 부족할 때",
        "dc-1 직전"
      ],
      "risks": [
        "공정성은 올라가지만 인도성 점수 하락 가능",
        "너무 이르면 B가 더 깊게 닫힐 수 있음"
      ]
    }
  ],
  "officialRecordRecommendations": [
    "B의 오피스텔 방문 대상은 형과 조카였다.",
    "B는 공동 적금 3,000만 원을 배우자 동의 없이 형에게 보냈다.",
    "A는 남편의 외도를 확신한 뒤 2,000만 원을 따로 송금했다.",
    "숨김은 B가 먼저 시작했고 실제 비밀 송금은 A가 먼저 실행했다.",
    "두 사람 모두 말 못할 이유가 있었지만 둘 다 공동 재산을 혼자 움직였다."
  ]
} as const
