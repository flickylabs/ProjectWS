export const FriendV301V3GameLoopData = {
  "caseId": "friend-v3-01",
  "dossierCards": [
    {
      "id": "dc-1",
      "name": "먼저 선을 넘은 사람",
      "description": "집착처럼 보인 그림을 예비신랑의 선넘기와 경고 실패 구조로 뒤집는 카드다.",
      "evidenceIds": [
        "e-1",
        "e-4"
      ],
      "relatedDisputes": [
        "d-1",
        "h-d2"
      ],
      "subjectParty": "b",
      "leadId": "L-1",
      "successConditionSummary": [
        "L-1 완성",
        "e-4가 Original 이상"
      ],
      "successEffects": [
        "h-d2 생성",
        "B의 연락 의도를 다시 읽을 수 있게 됨"
      ],
      "challenges": [
        {
          "targetParty": "b",
          "questions": [
            {
              "id": "dc-1.b.q1",
              "text": "먼저 선을 넘은 게 예비신랑이라면, 왜 결국 당신만 집착하는 사람처럼 남았습니까?",
              "lockedHint": "e-4가 원본 수준으로 열려야 질문이 보인다.",
              "attackVector": "context",
              "requiredLieState": "S2",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "friend-v3-01:b:h-d2:S3:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dc-2",
      "name": "손절의 시작점",
      "description": "과거 손절이 정말 변심 때문이었는지 다시 묻는 카드다.",
      "evidenceIds": [
        "e-2",
        "e-3",
        "e-6"
      ],
      "relatedDisputes": [
        "d-4"
      ],
      "subjectParty": "b",
      "leadId": "L-2",
      "successConditionSummary": [
        "L-2 완성",
        "e-6이 Original 이상"
      ],
      "successEffects": [
        "d-4가 과거 오해에서 과거 사기로 크게 이동",
        "A의 성급한 결론 습관이 흔들림"
      ],
      "challenges": [
        {
          "targetParty": "b",
          "questions": [
            {
              "id": "dc-2.b.q1",
              "text": "예전 손절도 정말 당신 변심 때문이었습니까, 아니면 그때도 돈 문제를 숨긴 겁니까?",
              "lockedHint": "e-6 원본과 L-2가 함께 열려야 질문이 보인다.",
              "attackVector": "authenticity",
              "requiredLieState": "S2",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "friend-v3-01:b:d-4:S3:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dc-3",
      "name": "이번에도 같은 패턴",
      "description": "현재 사건의 진짜 목적이 아버지의 돈 접근 차단이었는지 묻는 카드다.",
      "evidenceIds": [
        "e-1",
        "e-5"
      ],
      "relatedDisputes": [
        "h-d3",
        "d-1"
      ],
      "subjectParty": "b",
      "leadId": "L-3",
      "successConditionSummary": [
        "L-3 완성",
        "h-d3 생성"
      ],
      "successEffects": [
        "B가 이번 연락의 진짜 목적을 더 분명히 말함",
        "d-1과 h-d3가 함께 진전"
      ],
      "challenges": [
        {
          "targetParty": "b",
          "questions": [
            {
              "id": "dc-3.b.q1",
              "text": "A 아버지가 예비신랑에게 또 같은 방식으로 접근했다면, 당신은 왜 이번에도 혼자 막으려 했습니까?",
              "lockedHint": "e-5가 충분히 열리고 제3자 패턴이 보이기 시작해야 열린다.",
              "attackVector": "context",
              "requiredLieState": "S2",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "friend-v3-01:b:h-d3:S3:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dc-4",
      "name": "악역을 택한 이유",
      "description": "왜 늘 직접 진실을 말하기보다 악역처럼 남는 쪽을 택했는지 묻는 카드다.",
      "evidenceIds": [
        "e-6"
      ],
      "relatedDisputes": [
        "d-4",
        "h-d3"
      ],
      "subjectParty": "b",
      "leadId": "L-4",
      "successConditionSummary": [
        "L-4 완성",
        "B에게 공감접근 누적 2회 이상"
      ],
      "successEffects": [
        "B의 감정 고백 유도",
        "d-4의 왜 숨겼나 칸 완성"
      ],
      "challenges": [
        {
          "targetParty": "b",
          "questions": [
            {
              "id": "dc-4.b.q1",
              "text": "왜 늘 진실을 말하는 대신, 차라리 당신이 나쁜 사람처럼 보이는 쪽을 택했습니까?",
              "lockedHint": "e-6과 B의 감정 축이 충분히 열려야 질문이 보인다.",
              "attackVector": "context",
              "requiredLieState": "S3",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "friend-v3-01:b:d-4:S4:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dc-5",
      "name": "두 번의 손절",
      "description": "과거와 현재를 같은 패턴으로 확정하고 누가 먼저 잘못 기록됐는지 묻는 최종 카드다.",
      "evidenceIds": [
        "e-5",
        "e-6",
        "e-7"
      ],
      "relatedDisputes": [
        "d-5",
        "h-d3"
      ],
      "subjectParty": "a",
      "leadId": "L-5",
      "successConditionSummary": [
        "L-5 완성",
        "e-7이 Original 이상"
      ],
      "successEffects": [
        "d-5와 h-d3 정리",
        "B의 경고 / A의 낙인 / 아버지의 반복 구조가 공식기록으로 굳음"
      ],
      "challenges": [
        {
          "targetParty": "a",
          "questions": [
            {
              "id": "dc-5.a.q1",
              "text": "과거와 현재가 같은 패턴이었다면, 이번 사건에서 가장 먼저 잘못 기록된 사람은 누구였습니까?",
              "lockedHint": "e-7이 원본 수준으로 열리고 A의 초기 방어가 한 번 꺾여야 열린다.",
              "attackVector": "authenticity",
              "requiredLieState": "S2",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "friend-v3-01:a:d-5:S3:0",
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
      "d-5": {
        "S3": [
          {
            "id": "friend-v3-01:a:d-5:S3:0",
            "factText": "송다은은 직접 확인도 안 하고 수민을 먼저 나쁜 사람으로 만들었다는 사실을 인정하기 시작한다.",
            "tags": [
              "thread-g",
              "friend-v3-01",
              "d-5",
              "dc-5"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "summary": {
                "default": "송다은은 직접 확인도 안 하고 수민을 먼저 나쁜 사람으로 만들었다는 사실을 인정하기 시작한다."
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
            "id": "friend-v3-01:b:d-1:S3:0",
            "factText": "최수민은 반복 연락의 목적이 집착이 아니라 경고였다고 분명히 말하기 시작한다.",
            "tags": [
              "thread-g",
              "friend-v3-01",
              "d-1"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "summary": {
                "default": "최수민은 반복 연락의 목적이 집착이 아니라 경고였다고 분명히 말하기 시작한다."
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
      "h-d2": {
        "S3": [
          {
            "id": "friend-v3-01:b:h-d2:S3:0",
            "factText": "최수민은 먼저 선을 넘은 쪽이 예비신랑이었다고 인정한다.",
            "tags": [
              "thread-g",
              "friend-v3-01",
              "h-d2",
              "dc-1"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "summary": {
                "default": "최수민은 먼저 선을 넘은 쪽이 예비신랑이었다고 인정한다."
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
      "h-d3": {
        "S3": [
          {
            "id": "friend-v3-01:b:h-d3:S3:0",
            "factText": "최수민은 이번 연락의 진짜 이유가 A 아버지의 돈 접근을 또 막으려는 것이었다고 인정한다.",
            "tags": [
              "thread-g",
              "friend-v3-01",
              "h-d3",
              "dc-3"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "summary": {
                "default": "최수민은 이번 연락의 진짜 이유가 A 아버지의 돈 접근을 또 막으려는 것이었다고 인정한다."
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
            "id": "friend-v3-01:b:d-4:S3:0",
            "factText": "최수민은 과거 손절의 시작도 자신의 변심이 아니라 A 아버지의 돈 문제였다고 말한다.",
            "tags": [
              "thread-g",
              "friend-v3-01",
              "d-4",
              "dc-2"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "summary": {
                "default": "최수민은 과거 손절의 시작도 자신의 변심이 아니라 A 아버지의 돈 문제였다고 말한다."
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
            "id": "friend-v3-01:b:d-4:S4:0",
            "factText": "최수민은 차라리 자신이 나쁜 사람처럼 남는 편이 다은의 세계를 무너뜨리지 않는다고 믿었다고 인정한다.",
            "tags": [
              "thread-g",
              "friend-v3-01",
              "d-4",
              "dc-4"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "summary": {
                "default": "최수민은 차라리 자신이 나쁜 사람처럼 남는 편이 다은의 세계를 무너뜨리지 않는다고 믿었다고 인정한다."
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
        "id": "friend-v3-01-fallback-contradiction-1",
        "statementA": "송다은은 ‘B의 연락은 예비신랑 집착인가, 뭔가를 전하려는 경고인가’ 문제를 자기 쪽 피해로 먼저 고정하려 한다.",
        "statementB": "최수민은 ‘B의 연락은 예비신랑 집착인가, 뭔가를 전하려는 경고인가’ 문제는 결과보다 경위를 같이 봐야 한다고 맞선다.",
        "options": {
          "point_out": {
            "label": "충돌을 짚는다",
            "effect": "같은 장면을 두고 서로 다른 해석이 정면으로 부딪힌다."
          },
          "let_go": {
            "label": "다음 실마리를 기다린다",
            "effect": "핵심 충돌을 잠시 보류하고 추가 자료를 더 모은다."
          }
        },
        "npcReaction": "‘B의 연락은 예비신랑 집착인가, 뭔가를 전하려는 경고인가’ 문제를 두고 결과 해석과 경위 해석이 갈라진다."
      },
      {
        "id": "friend-v3-01-fallback-contradiction-2",
        "statementA": "송다은은 ‘예전 손절 사건도 정말 B의 변심 때문이었는가’ 문제까지 보면 상대 설명이 더 수상해진다고 말한다.",
        "statementB": "최수민은 ‘예전 손절 사건도 정말 B의 변심 때문이었는가’ 문제를 떼어 내면 판단이 기울어진다고 반박한다.",
        "options": {
          "point_out": {
            "label": "연결고리를 짚는다",
            "effect": "앞선 다툼과 이번 다툼이 같은 축에서 이어진다는 점이 드러난다."
          },
          "let_go": {
            "label": "지금은 넘긴다",
            "effect": "쟁점 연결은 잠시 미뤄 두고 다음 증거로 넘어간다."
          }
        },
        "npcReaction": "‘예전 손절 사건도 정말 B의 변심 때문이었는가’ 문제가 앞선 갈등과 이어지면서 한쪽 주장만으로 정리하기 어려워진다."
      }
    ],
    "interjections": [
      {
        "id": "friend-v3-01-fallback-interjection-a",
        "interruptor": "a",
        "interjectionLine": "송다은은 ‘B의 연락은 예비신랑 집착인가, 뭔가를 전하려는 경고인가’ 문제에서 자기 억울함이 빠졌다고 끼어든다.",
        "options": {
          "allow": {
            "label": "더 듣는다",
            "effect": "A의 감정선과 자기 해석이 조금 더 길게 드러난다."
          },
          "block": {
            "label": "질문으로 돌린다",
            "effect": "감정 호소를 끊고 사실 확인 질문으로 복귀한다."
          }
        }
      },
      {
        "id": "friend-v3-01-fallback-interjection-b",
        "interruptor": "b",
        "interjectionLine": "최수민은 ‘예전 손절 사건도 정말 B의 변심 때문이었는가’ 문제까지 같이 봐야 한다고 말을 자른다.",
        "options": {
          "allow": {
            "label": "이유를 듣는다",
            "effect": "B가 왜 그 연결을 붙들고 있는지 더 구체적으로 드러난다."
          },
          "block": {
            "label": "범위를 좁힌다",
            "effect": "확인된 사실만 남기고 해석 확장을 잠시 멈춘다."
          }
        }
      }
    ],
    "emotionalOutbursts": [
      {
        "id": "friend-v3-01-fallback-outburst-a",
        "party": "a",
        "outburstLine": "송다은은 ‘이번 사건에서 B의 명예를 먼저 무너뜨린 건 누구인가’ 문제까지 전부 악의로만 읽히는 순간 감정이 크게 흔들린다.",
        "options": {
          "press": {
            "label": "계속 묻는다",
            "effect": "A가 감정 속에서도 자기 책임과 상대 책임의 선을 더 분명히 말하게 된다."
          },
          "calm": {
            "label": "숨을 돌리게 한다",
            "effect": "A가 격앙 대신 경위 설명으로 다시 돌아올 시간을 번다."
          }
        }
      },
      {
        "id": "friend-v3-01-fallback-outburst-b",
        "party": "b",
        "outburstLine": "최수민은 ‘예전 손절 사건도 정말 B의 변심 때문이었는가’ 문제의 숨긴 이유까지 단정당하자 말끝이 크게 흔들린다.",
        "options": {
          "press": {
            "label": "핵심을 더 겨눈다",
            "effect": "B가 감춰 온 동기나 맥락을 더 빨리 꺼내게 된다."
          },
          "calm": {
            "label": "맥락부터 듣는다",
            "effect": "B가 방어를 조금 내려놓고 숨긴 이유를 더 길게 설명한다."
          }
        }
      }
    ]
  },
  "transitionBeats": [
    {
      "id": "friend-v3-01-fallback-beat-a-d-5-S2-S3-0",
      "caseId": "friend-v3-01",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S2",
      "toState": "S3",
      "primaryBeatType": "partial",
      "secondaryBeatType": "partial",
      "line": "송다은은 직접 확인도 안 하고 수민을 먼저 나쁜 사람으로 만들었다는 사실을 인정하기 시작한다.",
      "behaviorHint": "‘이번 사건에서 B의 명예를 먼저 무너뜨린 건 누구인가’ 문제를 끝까지 피하지 못하고 핵심 사실 일부를 인정하기 시작한다."
    },
    {
      "id": "friend-v3-01-fallback-beat-b-d-1-S2-S3-0",
      "caseId": "friend-v3-01",
      "party": "b",
      "disputeId": "d-1",
      "fromState": "S2",
      "toState": "S3",
      "primaryBeatType": "partial",
      "secondaryBeatType": "partial",
      "line": "최수민은 반복 연락의 목적이 집착이 아니라 경고였다고 분명히 말하기 시작한다.",
      "behaviorHint": "‘B의 연락은 예비신랑 집착인가, 뭔가를 전하려는 경고인가’ 문제를 끝까지 피하지 못하고 핵심 사실 일부를 인정하기 시작한다."
    },
    {
      "id": "friend-v3-01-fallback-beat-b-h-d2-S2-S3-0",
      "caseId": "friend-v3-01",
      "party": "b",
      "disputeId": "h-d2",
      "fromState": "S2",
      "toState": "S3",
      "primaryBeatType": "partial",
      "secondaryBeatType": "partial",
      "line": "최수민은 먼저 선을 넘은 쪽이 예비신랑이었다고 인정한다.",
      "behaviorHint": "‘예비신랑이 먼저 B에게 선을 넘었는가’ 문제를 끝까지 피하지 못하고 핵심 사실 일부를 인정하기 시작한다."
    },
    {
      "id": "friend-v3-01-fallback-beat-b-h-d3-S2-S3-0",
      "caseId": "friend-v3-01",
      "party": "b",
      "disputeId": "h-d3",
      "fromState": "S2",
      "toState": "S3",
      "primaryBeatType": "partial",
      "secondaryBeatType": "partial",
      "line": "최수민은 이번 연락의 진짜 이유가 A 아버지의 돈 접근을 또 막으려는 것이었다고 인정한다.",
      "behaviorHint": "‘A 아버지의 돈 접근은 과거와 현재가 같은 패턴인가’ 문제를 끝까지 피하지 못하고 핵심 사실 일부를 인정하기 시작한다."
    },
    {
      "id": "friend-v3-01-fallback-beat-b-d-4-S2-S3-0",
      "caseId": "friend-v3-01",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S2",
      "toState": "S3",
      "primaryBeatType": "partial",
      "secondaryBeatType": "partial",
      "line": "최수민은 과거 손절의 시작도 자신의 변심이 아니라 A 아버지의 돈 문제였다고 말한다.",
      "behaviorHint": "‘예전 손절 사건도 정말 B의 변심 때문이었는가’ 문제를 끝까지 피하지 못하고 핵심 사실 일부를 인정하기 시작한다."
    },
    {
      "id": "friend-v3-01-fallback-beat-b-d-4-S3-S4-0",
      "caseId": "friend-v3-01",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S3",
      "toState": "S4",
      "primaryBeatType": "partial",
      "secondaryBeatType": "partial",
      "line": "최수민은 차라리 자신이 나쁜 사람처럼 남는 편이 다은의 세계를 무너뜨리지 않는다고 믿었다고 인정한다.",
      "behaviorHint": "‘예전 손절 사건도 정말 B의 변심 때문이었는가’ 문제에서 버티던 논리가 무너지며 숨긴 동기를 더 직접적으로 털어놓는다."
    }
  ]
} as const
