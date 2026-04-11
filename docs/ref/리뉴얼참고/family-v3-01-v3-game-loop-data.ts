export const FamilyV301V3GameLoopData = {
  "caseId": "family-v3-01",
  "dossierCards": [
    {
      "id": "dc-1",
      "name": "마지막 몇 달",
      "description": "말년 접근과 유서 개입을 시간축으로 압박하는 카드다.",
      "evidenceIds": [
        "e-1",
        "e-2",
        "e-3"
      ],
      "relatedDisputes": [
        "d-1"
      ],
      "subjectParty": "b",
      "leadId": "L-1",
      "successConditionSummary": [
        "L-1 완성",
        "B에게 동기탐색 또는 정확히 답변하십시오 사용"
      ],
      "successEffects": [
        "d-1이 강하게 전진",
        "B의 담담함 뒤 긴장과 서두름이 처음 드러남"
      ],
      "challenges": [
        {
          "targetParty": "b",
          "questions": [
            {
              "id": "dc-1.b.q1",
              "text": "형이 보기엔 당신이 말년을 파고든 것처럼 보입니다. 실제로 그 몇 달 동안 어머니에게 무엇을 반복해서 말했습니까?",
              "lockedHint": "L-1이 완성되고 e-3가 충분히 열려야 질문이 보인다.",
              "attackVector": "context",
              "requiredLieState": "S2",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "family-v3-01:b:d-1:S3:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dc-2",
      "name": "줄인 조작",
      "description": "감액 조작의 이유를 정면으로 묻는 카드다.",
      "evidenceIds": [
        "e-1",
        "e-4",
        "e-5"
      ],
      "relatedDisputes": [
        "d-2"
      ],
      "subjectParty": "b",
      "leadId": "L-2",
      "successConditionSummary": [
        "L-2 완성",
        "e-5가 Original 이상"
      ],
      "successEffects": [
        "d-2가 자백 직전까지 진전",
        "왜 자기 몫을 줄였는지 질문이 고정됨"
      ],
      "challenges": [
        {
          "targetParty": "b",
          "questions": [
            {
              "id": "dc-2.b.q1",
              "text": "유서를 고친 건 맞는데, 왜 자기 몫을 늘리는 쪽이 아니라 줄이는 쪽으로 바꿨습니까?",
              "lockedHint": "공증사무실 보관본과 90대 10 원본이 모두 열려야 보인다.",
              "attackVector": "authenticity",
              "requiredLieState": "S3",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "family-v3-01:b:d-2:S4:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dc-3",
      "name": "어머니 돈인 줄 알았던 돈",
      "description": "90대 10의 금전 근거와 숨은 지원 서사를 묻는 카드다.",
      "evidenceIds": [
        "e-5",
        "e-6"
      ],
      "relatedDisputes": [
        "h-d3"
      ],
      "subjectParty": "b",
      "leadId": "L-3",
      "successConditionSummary": [
        "L-3 완성",
        "e-6이 Original 이상"
      ],
      "successEffects": [
        "h-d3가 공식 쟁점으로 고정",
        "A의 기존 서사가 크게 흔들림"
      ],
      "challenges": [
        {
          "targetParty": "b",
          "questions": [
            {
              "id": "dc-3.b.q1",
              "text": "형이 평생 어머니 돈인 줄 알고 받았던 그 돈, 사실은 당신 돈이었습니까?",
              "lockedHint": "e-6이 원본 수준으로 열리고 B의 회피가 한 번 꺾여야 열린다.",
              "attackVector": "authenticity",
              "requiredLieState": "S2",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "family-v3-01:b:h-d3:S3:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dc-4",
      "name": "20년 침묵",
      "description": "오랫동안 도우면서도 왜 끝까지 말하지 않았는지를 묻는 카드다.",
      "evidenceIds": [
        "e-6",
        "e-7"
      ],
      "relatedDisputes": [
        "h-d3",
        "d-5"
      ],
      "subjectParty": "b",
      "leadId": "L-4",
      "successConditionSummary": [
        "L-4 완성",
        "B에게 공감접근 누적 2회 이상"
      ],
      "successEffects": [
        "B의 affect_flattening이 깨지기 시작함",
        "d-5의 왜 숨겼나 칸이 강하게 채워짐"
      ],
      "challenges": [
        {
          "targetParty": "b",
          "questions": [
            {
              "id": "dc-4.b.q1",
              "text": "20년을 도왔으면서 왜 단 한 번도 형에게 말하지 않았습니까?",
              "lockedHint": "지원 흐름과 B의 감정 고백 축이 함께 붙어야 열린다.",
              "attackVector": "context",
              "requiredLieState": "S3",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "family-v3-01:b:h-d3:S4:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dc-5",
      "name": "60대 40의 진짜 이유",
      "description": "유산 문제를 출생 비밀 보호 문제로 재정의하는 최종 카드다.",
      "evidenceIds": [
        "e-6",
        "e-7"
      ],
      "relatedDisputes": [
        "h-d4"
      ],
      "subjectParty": "b",
      "leadId": "L-5",
      "successConditionSummary": [
        "L-5 완성",
        "e-7이 Original 이상"
      ],
      "successEffects": [
        "h-d4가 완성",
        "출생 비밀 보호와 감액 조작의 연결이 자백 수준으로 열림"
      ],
      "challenges": [
        {
          "targetParty": "b",
          "questions": [
            {
              "id": "dc-5.b.q1",
              "text": "60대 40으로 바꾸지 않았다면, 형은 돈 말고 무엇을 잃게 됐습니까?",
              "lockedHint": "L-5와 e-7 원본이 모두 열려야 질문이 보인다.",
              "attackVector": "context",
              "requiredLieState": "S3",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "family-v3-01:b:h-d4:S3:0",
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
            "id": "family-v3-01:a:d-5:S3:0",
            "factText": "윤태성은 자신이 진실을 모른 채 정후를 악의로만 읽어 왔다는 사실을 처음 받아들이기 시작한다.",
            "tags": [
              "thread-g",
              "family-v3-01",
              "d-5"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "summary": {
                "default": "윤태성은 자신이 진실을 모른 채 정후를 악의로만 읽어 왔다는 사실을 처음 받아들이기 시작한다."
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
            "id": "family-v3-01:b:d-1:S3:0",
            "factText": "윤정후는 말년 몇 달 동안 어머니를 설득하고 서류를 서두르게 한 건 맞다고 인정한다.",
            "tags": [
              "thread-g",
              "family-v3-01",
              "d-1",
              "dc-1"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "summary": {
                "default": "윤정후는 말년 몇 달 동안 어머니를 설득하고 서류를 서두르게 한 건 맞다고 인정한다."
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
            "id": "family-v3-01:b:d-2:S4:0",
            "factText": "윤정후는 더 가지려고가 아니라 줄이려고 60대 40으로 바꿨다고 분명히 말한다.",
            "tags": [
              "thread-g",
              "family-v3-01",
              "d-2",
              "dc-2"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "summary": {
                "default": "윤정후는 더 가지려고가 아니라 줄이려고 60대 40으로 바꿨다고 분명히 말한다."
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
            "id": "family-v3-01:b:h-d3:S3:0",
            "factText": "윤정후는 형이 어머니 돈인 줄 알고 받아 온 흐름 상당수가 사실은 자신의 돈이었다고 인정한다.",
            "tags": [
              "thread-g",
              "family-v3-01",
              "h-d3",
              "dc-3"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "summary": {
                "default": "윤정후는 형이 어머니 돈인 줄 알고 받아 온 흐름 상당수가 사실은 자신의 돈이었다고 인정한다."
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
            "id": "family-v3-01:b:h-d3:S4:0",
            "factText": "윤정후는 형 자존심이 무너질까 봐 20년 지원 사실을 끝까지 말하지 못했다고 인정한다.",
            "tags": [
              "thread-g",
              "family-v3-01",
              "h-d3",
              "dc-4"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "summary": {
                "default": "윤정후는 형 자존심이 무너질까 봐 20년 지원 사실을 끝까지 말하지 못했다고 인정한다."
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
            "id": "family-v3-01:b:h-d4:S3:0",
            "factText": "윤정후는 형의 출생 비밀이 터지는 걸 막으려고 90을 60으로 낮췄다고 인정한다.",
            "tags": [
              "thread-g",
              "family-v3-01",
              "h-d4",
              "dc-5"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "summary": {
                "default": "윤정후는 형의 출생 비밀이 터지는 걸 막으려고 90을 60으로 낮췄다고 인정한다."
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
        "id": "family-v3-01-fallback-contradiction-1",
        "statementA": "윤태성은 ‘말년의 어머니는 유서를 제대로 판단할 수 있었는가’ 문제를 자기 쪽 피해로 먼저 고정하려 한다.",
        "statementB": "윤정후은 ‘말년의 어머니는 유서를 제대로 판단할 수 있었는가’ 문제는 결과보다 경위를 같이 봐야 한다고 맞선다.",
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
        "npcReaction": "‘말년의 어머니는 유서를 제대로 판단할 수 있었는가’ 문제를 두고 결과 해석과 경위 해석이 갈라진다."
      },
      {
        "id": "family-v3-01-fallback-contradiction-2",
        "statementA": "윤태성은 ‘60대 40 유서는 정말 어머니의 마지막 뜻이었는가’ 문제까지 보면 상대 설명이 더 수상해진다고 말한다.",
        "statementB": "윤정후은 ‘60대 40 유서는 정말 어머니의 마지막 뜻이었는가’ 문제를 떼어 내면 판단이 기울어진다고 반박한다.",
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
        "npcReaction": "‘60대 40 유서는 정말 어머니의 마지막 뜻이었는가’ 문제가 앞선 갈등과 이어지면서 한쪽 주장만으로 정리하기 어려워진다."
      }
    ],
    "interjections": [
      {
        "id": "family-v3-01-fallback-interjection-a",
        "interruptor": "a",
        "interjectionLine": "윤태성은 ‘말년의 어머니는 유서를 제대로 판단할 수 있었는가’ 문제에서 자기 억울함이 빠졌다고 끼어든다.",
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
        "id": "family-v3-01-fallback-interjection-b",
        "interruptor": "b",
        "interjectionLine": "윤정후은 ‘60대 40 유서는 정말 어머니의 마지막 뜻이었는가’ 문제까지 같이 봐야 한다고 말을 자른다.",
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
        "id": "family-v3-01-fallback-outburst-a",
        "party": "a",
        "outburstLine": "윤태성은 ‘누가 정말 어머니를 이용했는가’ 문제까지 전부 악의로만 읽히는 순간 감정이 크게 흔들린다.",
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
        "id": "family-v3-01-fallback-outburst-b",
        "party": "b",
        "outburstLine": "윤정후은 ‘60대 40 유서는 정말 어머니의 마지막 뜻이었는가’ 문제의 숨긴 이유까지 단정당하자 말끝이 크게 흔들린다.",
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
      "id": "family-v3-01-fallback-beat-a-d-5-S2-S3-0",
      "caseId": "family-v3-01",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S2",
      "toState": "S3",
      "primaryBeatType": "partial",
      "secondaryBeatType": "partial",
      "line": "윤태성은 자신이 진실을 모른 채 정후를 악의로만 읽어 왔다는 사실을 처음 받아들이기 시작한다.",
      "behaviorHint": "‘누가 정말 어머니를 이용했는가’ 문제를 끝까지 피하지 못하고 핵심 사실 일부를 인정하기 시작한다."
    },
    {
      "id": "family-v3-01-fallback-beat-b-d-1-S2-S3-0",
      "caseId": "family-v3-01",
      "party": "b",
      "disputeId": "d-1",
      "fromState": "S2",
      "toState": "S3",
      "primaryBeatType": "partial",
      "secondaryBeatType": "partial",
      "line": "윤정후는 말년 몇 달 동안 어머니를 설득하고 서류를 서두르게 한 건 맞다고 인정한다.",
      "behaviorHint": "‘말년의 어머니는 유서를 제대로 판단할 수 있었는가’ 문제를 끝까지 피하지 못하고 핵심 사실 일부를 인정하기 시작한다."
    },
    {
      "id": "family-v3-01-fallback-beat-b-d-2-S3-S4-0",
      "caseId": "family-v3-01",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S3",
      "toState": "S4",
      "primaryBeatType": "partial",
      "secondaryBeatType": "partial",
      "line": "윤정후는 더 가지려고가 아니라 줄이려고 60대 40으로 바꿨다고 분명히 말한다.",
      "behaviorHint": "‘60대 40 유서는 정말 어머니의 마지막 뜻이었는가’ 문제에서 버티던 논리가 무너지며 숨긴 동기를 더 직접적으로 털어놓는다."
    },
    {
      "id": "family-v3-01-fallback-beat-b-h-d3-S2-S3-0",
      "caseId": "family-v3-01",
      "party": "b",
      "disputeId": "h-d3",
      "fromState": "S2",
      "toState": "S3",
      "primaryBeatType": "partial",
      "secondaryBeatType": "partial",
      "line": "윤정후는 형이 어머니 돈인 줄 알고 받아 온 흐름 상당수가 사실은 자신의 돈이었다고 인정한다.",
      "behaviorHint": "‘왜 원래 유서는 90대 10이었는가, 그리고 그 비율은 무엇에 대한 보답이었는가’ 문제를 끝까지 피하지 못하고 핵심 사실 일부를 인정하기 시작한다."
    },
    {
      "id": "family-v3-01-fallback-beat-b-h-d3-S3-S4-0",
      "caseId": "family-v3-01",
      "party": "b",
      "disputeId": "h-d3",
      "fromState": "S3",
      "toState": "S4",
      "primaryBeatType": "partial",
      "secondaryBeatType": "partial",
      "line": "윤정후는 형 자존심이 무너질까 봐 20년 지원 사실을 끝까지 말하지 못했다고 인정한다.",
      "behaviorHint": "‘왜 원래 유서는 90대 10이었는가, 그리고 그 비율은 무엇에 대한 보답이었는가’ 문제에서 버티던 논리가 무너지며 숨긴 동기를 더 직접적으로 털어놓는다."
    },
    {
      "id": "family-v3-01-fallback-beat-b-h-d4-S2-S3-0",
      "caseId": "family-v3-01",
      "party": "b",
      "disputeId": "h-d4",
      "fromState": "S2",
      "toState": "S3",
      "primaryBeatType": "partial",
      "secondaryBeatType": "partial",
      "line": "윤정후는 형의 출생 비밀이 터지는 걸 막으려고 90을 60으로 낮췄다고 인정한다.",
      "behaviorHint": "‘60대 40 조작이 막으려 한 더 큰 비밀은 무엇인가’ 문제를 끝까지 피하지 못하고 핵심 사실 일부를 인정하기 시작한다."
    }
  ]
} as const
