export const SpouseV201V3GameLoopData = {
  "caseId": "spouse-v2-01",
  "dossierCards": [
    {
      "id": "dc-1",
      "name": "새벽 통화 상대가 형이라면, 왜 아내에게 한마디도 못 했습니까?",
      "description": "d-1이 S2 이상일 때 열리는 카드다. 숨김의 이유가 외도 은폐가 아니라 시댁 불화였다는 축을 강제로 열어 준다.",
      "evidenceIds": [
        "e-3",
        "e-4"
      ],
      "relatedDisputes": [
        "d-1",
        "d-4"
      ],
      "subjectParty": "b",
      "challenges": [
        {
          "targetParty": "b",
          "questions": [
            {
              "id": "dc-1.b.q1",
              "text": "새벽 통화 상대가 형이라면, 왜 아내에게 한마디도 못 했습니까?",
              "lockedHint": "d-1이 더 열리면 숨김의 이유를 직접 묻는 카드가 열린다.",
              "attackVector": "context",
              "requiredLieState": "S2",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "spouse-v2-01:b:d-1:S3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dc-1.b.q2",
              "text": "시댁 얘기만 나오면 더 크게 싸운다는 이유로, 오해받을 행동을 끝까지 숨긴 겁니까?",
              "lockedHint": "시댁 불화와 숨김의 책임이 함께 열려야 다음 질문이 보인다.",
              "attackVector": "responsibility",
              "requiredLieState": "S3",
              "onSuccess": {
                "blockVector": "responsibility",
                "revealAtom": "spouse-v2-01:b:d-1:S4:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dc-2",
      "name": "공동 적금 3,000만 원은 부부 돈인데, 형에게 줄 권리가 정말 당신 혼자에게 있었습니까?",
      "description": "d-2가 S3 이상일 때 열리는 카드다. 공동재산 독단 처분 책임을 강하게 추궁하며, B의 S4~S5 감정 붕괴를 촉발한다.",
      "evidenceIds": [
        "e-5"
      ],
      "relatedDisputes": [
        "d-2",
        "d-4"
      ],
      "subjectParty": "b",
      "challenges": [
        {
          "targetParty": "b",
          "questions": [
            {
              "id": "dc-2.b.q1",
              "text": "공동 적금 3,000만 원은 부부 돈인데, 형에게 줄 권리가 정말 당신 혼자에게 있었습니까?",
              "lockedHint": "공동 적금 사용 사실이 더 열리면 책임 추궁 카드가 열린다.",
              "attackVector": "responsibility",
              "requiredLieState": "S3",
              "onSuccess": {
                "blockVector": "responsibility",
                "revealAtom": "spouse-v2-01:b:d-2:S4:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dc-2.b.q2",
              "text": "가족을 돕는 일이었다 해도, 배우자 동의 없이 공동 적금을 깬 책임은 인정합니까?",
              "lockedHint": "가족 구제와 월권 책임이 모두 올라와야 마지막 질문이 열린다.",
              "attackVector": "context",
              "requiredLieState": "S4",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "spouse-v2-01:b:d-2:S5:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dc-3",
      "name": "남편이 먼저 숨겼다고 해도, 먼저 2,000만 원을 움직인 건 당신이지요?",
      "description": "d-3이 S3 이상일 때 열리는 카드다. A의 자기방어 서사를 d-4와 직접 연결해, 누가 먼저 실행했는가를 날카롭게 만든다.",
      "evidenceIds": [
        "e-6",
        "e-7"
      ],
      "relatedDisputes": [
        "d-3",
        "d-4"
      ],
      "subjectParty": "a",
      "challenges": [
        {
          "targetParty": "a",
          "questions": [
            {
              "id": "dc-3.a.q1",
              "text": "남편이 먼저 숨겼다고 해도, 먼저 2,000만 원을 움직인 건 당신이지요?",
              "lockedHint": "2,000만 원 송금 의도가 더 올라오면 자기방어와 실행 책임을 묻는 카드가 열린다.",
              "attackVector": "responsibility",
              "requiredLieState": "S3",
              "onSuccess": {
                "blockVector": "responsibility",
                "revealAtom": "spouse-v2-01:a:d-3:S4:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dc-3.a.q2",
              "text": "남편을 믿지 못한 마음과 별개로, 먼저 돈을 움직인 책임은 인정합니까?",
              "lockedHint": "송금 동기와 실행 순서가 함께 드러나야 마지막 질문이 열린다.",
              "attackVector": "context",
              "requiredLieState": "S4",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "spouse-v2-01:a:d-4:S3:0",
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
      "d-3": {
        "S4": [
          {
            "id": "spouse-v2-01:a:d-3:S4:0",
            "factText": "박지연은 남편이 바람이라고 믿었고, 그래서 자기 몫을 먼저 지켜야 한다는 마음으로 2,000만 원을 움직였다고 인정한다.",
            "tags": [
              "thread-g",
              "spouse-v2-01",
              "d-3",
              "dc-3"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "summary": {
                "default": "박지연은 남편이 바람이라고 믿었고, 그래서 자기 몫을 먼저 지켜야 한다는 마음으로 2,000만 원을 움직였다고 인정한다."
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
      "d-4": {
        "S3": [
          {
            "id": "spouse-v2-01:a:d-4:S3:0",
            "factText": "박지연은 남편이 먼저 숨긴 건 맞지만, 실제 비밀 송금 실행은 자신 쪽이 먼저였다는 점까지 받아들이기 시작한다.",
            "tags": [
              "thread-g",
              "spouse-v2-01",
              "d-4",
              "dc-3"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "summary": {
                "default": "박지연은 남편이 먼저 숨긴 건 맞지만, 실제 비밀 송금 실행은 자신 쪽이 먼저였다는 점까지 받아들이기 시작한다."
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
            "id": "spouse-v2-01:b:d-1:S3:0",
            "factText": "이준호는 외도를 숨긴 것이 아니라, 시댁 얘기만 나오면 더 크게 싸울까 봐 형네 돌봄 사실을 차마 말하지 못했다고 인정한다.",
            "tags": [
              "thread-g",
              "spouse-v2-01",
              "d-1",
              "dc-1"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "summary": {
                "default": "이준호는 외도를 숨긴 것이 아니라, 시댁 얘기만 나오면 더 크게 싸울까 봐 형네 돌봄 사실을 차마 말하지 못했다고 인정한다."
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
            "id": "spouse-v2-01:b:d-1:S4:0",
            "factText": "이준호는 형이 새벽부터 밤까지 일하던 날마다 조카 저녁과 생필품을 자신이 챙겼다고 더 구체적으로 털어놓는다.",
            "tags": [
              "thread-g",
              "spouse-v2-01",
              "d-1",
              "dc-1"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "summary": {
                "default": "이준호는 형이 새벽부터 밤까지 일하던 날마다 조카 저녁과 생필품을 자신이 챙겼다고 더 구체적으로 털어놓는다."
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
            "id": "spouse-v2-01:b:d-2:S4:0",
            "factText": "이준호는 공동 적금 3,000만 원이 아니면 형네가 당장 무너질 것 같아 먼저 막았다고 진술한다.",
            "tags": [
              "thread-g",
              "spouse-v2-01",
              "d-2",
              "dc-2"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "summary": {
                "default": "이준호는 공동 적금 3,000만 원이 아니면 형네가 당장 무너질 것 같아 먼저 막았다고 진술한다."
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
            "id": "spouse-v2-01:b:d-2:S5:0",
            "factText": "이준호는 아내가 반대할 걸 알았고, 금액이 커질수록 더 말하지 못했다고 인정한다.",
            "tags": [
              "thread-g",
              "spouse-v2-01",
              "d-2",
              "dc-2"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "summary": {
                "default": "이준호는 아내가 반대할 걸 알았고, 금액이 커질수록 더 말하지 못했다고 인정한다."
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
      "d-3": {},
      "d-4": {}
    }
  },
  "events": {
    "contradictions": [
      {
        "id": "spouse-v2-01-contradiction-1",
        "statementA": "박지연은 카드값과 오피스텔, 새벽 통화가 한 장면으로 묶였기 때문에 딴살림 말고는 설명이 없었다고 말한다.",
        "statementB": "이준호는 같은 패턴이 형과 조카를 숨겨 돌본 흔적일 뿐이었다고 말한다.",
        "options": {
          "point_out": {
            "label": "패턴을 정면으로 짚는다",
            "effect": "외도 의심과 가족 돌봄 해석이 정면으로 충돌한다."
          },
          "let_go": {
            "label": "일단 넘긴다",
            "effect": "초반 오해는 남지만 다음 증거에서 뒤집을 여지를 남긴다."
          }
        },
        "npcReaction": "두 사람 모두 같은 패턴을 전혀 다른 결론으로 읽고 있었다는 사실이 드러난다."
      },
      {
        "id": "spouse-v2-01-contradiction-2",
        "statementA": "박지연은 먼저 배신당했다고 믿었기 때문에 2,000만 원을 지켜야 했다고 말한다.",
        "statementB": "이준호는 형과 조카를 지키려다 적금 3,000만 원을 먼저 막아 준 것뿐이라고 말한다.",
        "options": {
          "point_out": {
            "label": "돈의 순서를 겨눈다",
            "effect": "누가 먼저 신뢰를 깨고 누가 먼저 송금했는지가 갈라진다."
          },
          "let_go": {
            "label": "동기를 먼저 듣는다",
            "effect": "선의와 공포가 뒤섞인 설명이 조금 더 이어진다."
          }
        },
        "npcReaction": "배신의 시작과 송금의 시작이 서로 다른 방향으로 갈라지며 책임 판단이 더 복잡해진다."
      }
    ],
    "interjections": [
      {
        "id": "spouse-v2-01-interjection-a",
        "interruptor": "a",
        "interjectionLine": "박지연은 카드값과 새벽 통화까지 보고도 어떻게 외도를 의심하지 않느냐고 반발한다.",
        "options": {
          "allow": {
            "label": "계속 말하게 둔다",
            "effect": "A측의 피해자 프레임과 수치심이 더 드러난다."
          },
          "block": {
            "label": "증거로 다시 묶는다",
            "effect": "감정선 대신 실행 순서 질문으로 되돌린다."
          }
        }
      },
      {
        "id": "spouse-v2-01-interjection-b",
        "interruptor": "b",
        "interjectionLine": "이준호는 형네 사정을 말하는 순간 다시 시댁 싸움으로만 몰릴까 봐 끼어든다.",
        "options": {
          "allow": {
            "label": "이유를 더 듣는다",
            "effect": "B측의 회피가 단순 거짓말이 아니었다는 결이 드러난다."
          },
          "block": {
            "label": "공동 적금으로 되돌린다",
            "effect": "선의보다 월권 책임이 앞으로 나온다."
          }
        }
      }
    ],
    "emotionalOutbursts": [
      {
        "id": "spouse-v2-01-outburst-a",
        "party": "a",
        "outburstLine": "박지연은 자신만 돈을 숨긴 사람처럼 몰리는 순간, 남편의 오피스텔 방문과 새벽 통화를 다시 꺼내며 크게 흔들린다.",
        "options": {
          "press": {
            "label": "송금 실행을 더 묻는다",
            "effect": "A측이 2,000만 원 송금의 실제 이유를 더 빨리 인정한다."
          },
          "calm": {
            "label": "시간을 준다",
            "effect": "A측이 사기당한 수치심을 더 조심스럽게 털어놓는다."
          }
        }
      },
      {
        "id": "spouse-v2-01-outburst-b",
        "party": "b",
        "outburstLine": "이준호는 형네 얘기를 꺼내는 순간 다시 시댁 싸움으로만 몰릴까 봐 말을 끊고 숨을 고른다.",
        "options": {
          "press": {
            "label": "공동 적금 책임을 겨눈다",
            "effect": "B측이 3,000만 원 독단 처분을 더 빨리 인정한다."
          },
          "calm": {
            "label": "가족 사정부터 듣는다",
            "effect": "B측이 왜 침묵을 택했는지 조금 더 길게 설명한다."
          }
        }
      }
    ]
  },
  "transitionBeats": [
    {
      "id": "spouse-v2-01-beat-b-d1-s1-s2",
      "caseId": "spouse-v2-01",
      "party": "b",
      "disputeId": "d-1",
      "fromState": "S1",
      "toState": "S2",
      "primaryBeatType": "evidence_hit",
      "line": "이준호는 더 숨기기 어려워졌다는 걸 알면서도, 일단 가족 일이라는 말만 꺼내고 핵심은 아직 남겨 둔다.",
      "behaviorHint": "답이 짧아지고 시선이 아래로 떨어진다."
    },
    {
      "id": "spouse-v2-01-beat-b-d1-s2-s3",
      "caseId": "spouse-v2-01",
      "party": "b",
      "disputeId": "d-1",
      "fromState": "S2",
      "toState": "S3",
      "primaryBeatType": "partial",
      "line": "이준호는 형네 일이었고, 시댁 얘기만 꺼내면 더 크게 싸울 게 뻔해서 말을 못 했다고 털어놓는다.",
      "behaviorHint": "변명보다 이유 설명이 길어진다."
    },
    {
      "id": "spouse-v2-01-beat-b-d2-s2-s3",
      "caseId": "spouse-v2-01",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S2",
      "toState": "S3",
      "primaryBeatType": "confession",
      "line": "이준호는 3,000만 원 전부 형 빚을 막는 데 썼다고 인정하지만, 그때는 그 방법밖에 없었다는 말도 덧붙인다.",
      "behaviorHint": "숫자를 말하는 목소리는 단단하지만 마지막 문장 끝이 흔들린다."
    },
    {
      "id": "spouse-v2-01-beat-a-d3-s2-s3",
      "caseId": "spouse-v2-01",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S2",
      "toState": "S3",
      "primaryBeatType": "confession",
      "line": "박지연은 혹시 몰라 제 몫을 지키려 했다가 투자방에 2,000만 원을 보냈고, 결국 다 날렸다고 인정한다.",
      "behaviorHint": "목소리가 낮아지고 마지막 금액 부분에서 속도가 느려진다."
    },
    {
      "id": "spouse-v2-01-beat-a-d4-s2-s3",
      "caseId": "spouse-v2-01",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S2",
      "toState": "S3",
      "primaryBeatType": "counter_shift",
      "line": "박지연은 먼저 숨긴 쪽은 남편이었다고 되받아치지만, 실제 송금 시점이 자신의 손에서 먼저 실행됐다는 사실도 부정하지 못한다.",
      "behaviorHint": "상대 비난과 자기 인정이 한 문장 안에서 충돌한다."
    },
    {
      "id": "spouse-v2-01-beat-b-d4-s2-s3",
      "caseId": "spouse-v2-01",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S2",
      "toState": "S3",
      "primaryBeatType": "partial",
      "line": "이준호는 자신이 먼저 숨긴 건 맞지만, 먼저 돈을 움직인 건 박지연 쪽이었다고 힘겹게 선을 긋는다.",
      "behaviorHint": "고개를 끄덕인 뒤 바로 반박 문장을 이어 붙인다."
    }
  ]
} as const
