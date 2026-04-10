export const FriendV201V3GameLoopData = {
  "caseId": "friend-v2-01",
  "dossierCards": [
    {
      "id": "dc-1",
      "name": "예비신랑이 먼저 선을 넘었다면, 왜 그때 바로 A에게 말하지 않았습니까?",
      "description": "d-2가 S3 이상이고 e-4가 열린 뒤 등장하는 카드다. B가 반복해서 침묵을 선택한 이유를 d-4와 직접 연결해 강제로 묻는다.",
      "evidenceIds": [
        "e-4"
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
              "id": "dc-1.b.q1",
              "text": "예비신랑이 먼저 선을 넘었다면, 왜 그때 바로 A에게 말하지 않았습니까?",
              "lockedHint": "예비신랑의 선 넘는 기록이 열려야 침묵의 이유를 정면으로 묻는 질문이 보입니다.",
              "attackVector": "context",
              "requiredLieState": "S3",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "friend-v2-01:b:d-2:S4:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dc-1.b.q2",
              "text": "그때 입을 열면 예전 돈 문제와 A 아버지 이야기까지 함께 터질까 봐, 또 혼자 삼킨 겁니까?",
              "lockedHint": "왜 또 침묵했는지, 과거 손절의 진짜 원인까지 묻는 마지막 질문입니다.",
              "attackVector": "responsibility",
              "requiredLieState": "S4",
              "onSuccess": {
                "blockVector": "responsibility",
                "revealAtom": "friend-v2-01:b:d-4:S5:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dc-2",
      "name": "A 아버지가 또 같은 방식으로 돈 얘기를 꺼냈다면, 당신은 이번에도 왜 혼자 막으려 했습니까?",
      "description": "d-3이 S2 이상이고 e-5가 열린 뒤 등장하는 카드다. B의 보호 본능과 자기희생이 현재 연락과 어떻게 이어졌는지 압박한다.",
      "evidenceIds": [
        "e-5"
      ],
      "relatedDisputes": [
        "d-1",
        "d-3",
        "d-4"
      ],
      "subjectParty": "b",
      "challenges": [
        {
          "targetParty": "b",
          "questions": [
            {
              "id": "dc-2.b.q1",
              "text": "A 아버지가 또 같은 방식으로 돈 얘기를 꺼냈다면, 당신은 이번에도 왜 혼자 막으려 했습니까?",
              "lockedHint": "현재 돈 접근 기록이 열린 뒤에야 B의 선택 이유를 강하게 묻는 카드가 보입니다.",
              "attackVector": "responsibility",
              "requiredLieState": "S2",
              "onSuccess": {
                "blockVector": "responsibility",
                "revealAtom": "friend-v2-01:b:d-3:S3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dc-2.b.q2",
              "text": "그때도 이번에도 왜 다은에게 말하지 않고 예비신랑만 붙잡았습니까?",
              "lockedHint": "돈 접근 패턴을 인정한 뒤에야 연락 방식의 책임을 직접 묻는 질문이 열립니다.",
              "attackVector": "context",
              "requiredLieState": "S3",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "friend-v2-01:b:d-1:S4:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dc-3",
      "name": "직접 확인도 하지 않고 친구를 단톡방에서 먼저 매도한 건 당신 아닙니까?",
      "description": "d-5가 S2 이상이고 e-2가 열린 뒤 등장하는 카드다. A의 조급한 단정과 공개 매도 책임을 정면으로 압박한다.",
      "evidenceIds": [
        "e-2"
      ],
      "relatedDisputes": [
        "d-5"
      ],
      "subjectParty": "a",
      "challenges": [
        {
          "targetParty": "a",
          "questions": [
            {
              "id": "dc-3.a.q1",
              "text": "직접 확인도 하지 않고 친구를 단톡방에서 먼저 매도한 건 당신 아닙니까?",
              "lockedHint": "단톡방 캡처가 열려야 공개 매도 책임을 정면으로 묻는 질문이 보입니다.",
              "attackVector": "authenticity",
              "requiredLieState": "S2",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "friend-v2-01:a:d-5:S3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dc-3.a.q2",
              "text": "예전 일도 제대로 확인하지 않은 채 이번에도 같은 사람으로 몰아간 건 인정합니까?",
              "lockedHint": "과거 손절 서사까지 현재 판단에 가져온 책임을 묻는 마지막 질문입니다.",
              "attackVector": "responsibility",
              "requiredLieState": "S3",
              "onSuccess": {
                "blockVector": "responsibility",
                "revealAtom": "friend-v2-01:a:d-5:S4:0",
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
      "d-3": {},
      "d-4": {},
      "d-5": {
        "S3": [
          {
            "id": "friend-v2-01:a:d-5:S3:0",
            "factText": "송다은은 직접 확인도 하지 않은 채 예전 손절 서사를 끌어와 단톡방에서 최수민을 먼저 악역으로 만들었다는 점을 인정했다.",
            "tags": [
              "thread-g",
              "friend-v2-01",
              "d-5",
              "dc-3"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "summary": {
                "default": "송다은은 직접 확인도 하지 않은 채 예전 손절 서사를 끌어와 단톡방에서 최수민을 먼저 악역으로 만들었다는 점을 인정했다."
              }
            },
            "stanceHints": [
              "partial",
              "blame",
              "confess"
            ]
          }
        ],
        "S4": [
          {
            "id": "friend-v2-01:a:d-5:S4:0",
            "factText": "송다은은 과거에도, 이번에도 자신이 모르는 사정이 있을 수 있다는 생각을 너무 늦게 했고, 그 사이 최수민을 두 번 버렸다고 인정했다.",
            "tags": [
              "thread-g",
              "friend-v2-01",
              "d-5",
              "dc-3"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "summary": {
                "default": "송다은은 과거에도, 이번에도 자신이 모르는 사정이 있을 수 있다는 생각을 너무 늦게 했고, 그 사이 최수민을 두 번 버렸다고 인정했다."
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
        "S4": [
          {
            "id": "friend-v2-01:b:d-1:S4:0",
            "factText": "최수민은 다은에게 직접 말하면 곧바로 소문과 결혼 파탄으로 이어질 것 같아, 이번에도 예비신랑만 붙잡는 길을 택했다고 인정했다.",
            "tags": [
              "thread-g",
              "friend-v2-01",
              "d-1",
              "dc-2"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "summary": {
                "default": "최수민은 다은에게 직접 말하면 곧바로 소문과 결혼 파탄으로 이어질 것 같아, 이번에도 예비신랑만 붙잡는 길을 택했다고 인정했다."
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
        "S4": [
          {
            "id": "friend-v2-01:b:d-2:S4:0",
            "factText": "최수민은 예비신랑이 먼저 선을 넘었다는 사실을 송다은에게 바로 말하지 못했고, 그 침묵이 현재 오해를 키웠다고 인정했다.",
            "tags": [
              "thread-g",
              "friend-v2-01",
              "d-2",
              "dc-1"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "summary": {
                "default": "최수민은 예비신랑이 먼저 선을 넘었다는 사실을 송다은에게 바로 말하지 못했고, 그 침묵이 현재 오해를 키웠다고 인정했다."
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
            "id": "friend-v2-01:b:d-3:S3:0",
            "factText": "최수민은 A 아버지가 예비신랑에게도 예전 자신에게 했던 것과 거의 같은 방식으로 돈 얘기를 꺼냈다고 인정했다.",
            "tags": [
              "thread-g",
              "friend-v2-01",
              "d-3",
              "dc-2"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "summary": {
                "default": "최수민은 A 아버지가 예비신랑에게도 예전 자신에게 했던 것과 거의 같은 방식으로 돈 얘기를 꺼냈다고 인정했다."
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
        "S5": [
          {
            "id": "friend-v2-01:b:d-4:S5:0",
            "factText": "최수민은 과거 손절의 진짜 원인이 A 아버지의 돈 문제였다고 말하면 다은 삶 전체가 무너질까 봐, 차라리 자신이 나쁜 사람으로 남는 쪽을 택했다고 인정했다.",
            "tags": [
              "thread-g",
              "friend-v2-01",
              "d-4",
              "dc-1"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "summary": {
                "default": "최수민은 과거 손절의 진짜 원인이 A 아버지의 돈 문제였다고 말하면 다은 삶 전체가 무너질까 봐, 차라리 자신이 나쁜 사람으로 남는 쪽을 택했다고 인정했다."
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
      "d-5": {}
    }
  },
  "events": {
    "contradictions": [
      {
        "id": "friend-v2-01-contradiction-1",
        "statementA": "송다은은 연락 기록과 새벽 시간대만 보면 최수민이 또 예비신랑에게 집착한 것밖에 아니라고 말한다.",
        "statementB": "최수민은 꼬시려 한 게 아니라 선 넘는 접근과 돈 문제를 경고하려 했다고 말한다.",
        "options": {
          "point_out": {
            "label": "연락 의도와 선 넘는 메시지를 함께 묻는다",
            "effect": "누가 먼저 경계를 넘었는지, 그리고 왜 B가 직접 연락했는지가 한 번에 충돌한다."
          },
          "let_go": {
            "label": "단톡방 낙인부터 묻는다",
            "effect": "외형보다 먼저 명예를 누가 무너뜨렸는지로 초점을 옮긴다."
          }
        },
        "npcReaction": "겉으로는 B가 먼저 다가간 사람처럼 보이지만, 연락 의도와 배경을 분리해서 봐야 한다는 긴장이 선명해진다."
      },
      {
        "id": "friend-v2-01-contradiction-2",
        "statementA": "송다은은 예전 손절도 이번도 결국 수민이 돈 앞에서 변했기 때문이라고 믿어 왔다.",
        "statementB": "최수민은 예전 손절도 지금도 A 아버지의 돈 접근이 시작점이었다고 말한다.",
        "options": {
          "point_out": {
            "label": "과거 돈 거래 기록을 대조한다",
            "effect": "손절의 출발점이 변심인지 사기인지가 정면으로 갈린다."
          },
          "let_go": {
            "label": "이번 연락 동기부터 좁혀 간다",
            "effect": "과거를 잠시 접고 현재 예비신랑 경고의 성격부터 확인한다."
          }
        },
        "npcReaction": "과거 손절 서사가 현재 오해를 굳힌 핵심 전제였다는 사실이 드러나며, 사건 전체의 방향이 흔들린다."
      }
    ],
    "interjections": [
      {
        "id": "friend-v2-01-interjection-a",
        "interruptor": "a",
        "interjectionLine": "송다은은 결혼 3주 전에 또 이런 일이 벌어졌는데 어떻게 친구 편부터 생각하냐며, 먼저 연락한 쪽이 누군지는 너무 분명하다고 몰아붙인다.",
        "options": {
          "allow": {
            "label": "분노를 더 말하게 둔다",
            "effect": "A가 왜 그렇게 빨리 단정했는지 감정의 뿌리가 더 선명해진다."
          },
          "block": {
            "label": "메시지 기록으로 돌린다",
            "effect": "불안의 진폭보다 선 넘는 접근과 돈 문제 증거 쪽으로 초점을 되돌린다."
          }
        }
      },
      {
        "id": "friend-v2-01-interjection-b",
        "interruptor": "b",
        "interjectionLine": "최수민은 아버지 얘기까지 꺼내면 결혼이 깨질까 봐 그랬다며, 끝내 말을 삼키다가도 이번엔 정말 막아야 했다고 낮게 말한다.",
        "options": {
          "allow": {
            "label": "이유를 더 묻는다",
            "effect": "B의 침묵이 단순 회피가 아니라 반복된 자기희생이었다는 방향이 열린다."
          },
          "block": {
            "label": "방법의 책임을 묻는다",
            "effect": "동기와 별개로 왜 예비신랑 직접 연락을 택했는지로 다시 압박한다."
          }
        }
      }
    ],
    "emotionalOutbursts": [
      {
        "id": "friend-v2-01-outburst-a",
        "party": "a",
        "outburstLine": "송다은은 아버지 얘기와 예전 손절 얘기가 한 번에 붙는 순간, 자신이 뭘 모르고 친구를 또 몰아붙인 거냐며 처음으로 목소리가 흔들린다.",
        "options": {
          "press": {
            "label": "단톡방 책임을 계속 묻는다",
            "effect": "A가 공개 매도 책임을 더 분명하게 인정하는 방향으로 밀린다."
          },
          "calm": {
            "label": "예전 손절 기억부터 정리한다",
            "effect": "A가 왜 그 서사를 확신했는지 감정의 뿌리를 더 차분하게 꺼내게 된다."
          }
        }
      },
      {
        "id": "friend-v2-01-outburst-b",
        "party": "b",
        "outburstLine": "최수민은 두 번 다 다은을 지키려 했는데 두 번 다 자신이 나쁜 사람으로 남았다고, 겨우 끝 문장에서만 말하고 고개를 떨군다.",
        "options": {
          "press": {
            "label": "그래도 왜 직접 말하지 않았는지 묻는다",
            "effect": "보호 본능과 방법의 책임이 동시에 드러난다."
          },
          "calm": {
            "label": "과거 돈 문제부터 다시 정리한다",
            "effect": "침묵의 출발점이 개인 감정이 아니라 반복된 돈 문제였다는 축이 더 선명해진다."
          }
        }
      }
    ]
  },
  "transitionBeats": [
    {
      "id": "friend-v2-01-beat-b-d1-s2-s3",
      "caseId": "friend-v2-01",
      "party": "b",
      "disputeId": "d-1",
      "fromState": "S2",
      "toState": "S3",
      "primaryBeatType": "partial",
      "line": "최수민은 연락한 사실은 인정하지만, 예비신랑을 꼬시려 한 게 아니라 경고하려 했다고 처음으로 방향을 바꿔 말한다.",
      "behaviorHint": "감정은 낮게 유지하지만 연락 의도 얘기에서는 문장 끝이 단단해진다."
    },
    {
      "id": "friend-v2-01-beat-b-d2-s2-s3",
      "caseId": "friend-v2-01",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S2",
      "toState": "S3",
      "primaryBeatType": "confession",
      "line": "최수민은 먼저 선을 넘은 건 예비신랑이었다고 인정하고, 자신은 계속 선을 그었다고 말한다.",
      "behaviorHint": "상대 잘못을 말하면서도 목소리는 낮고, 자신의 침묵 책임까지 같이 붙여 말한다."
    },
    {
      "id": "friend-v2-01-beat-b-d3-s2-s3",
      "caseId": "friend-v2-01",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S2",
      "toState": "S3",
      "primaryBeatType": "confession",
      "line": "최수민은 A 아버지가 예비신랑에게도 돈 얘기를 꺼냈고, 그 문장이 예전 자신에게 했던 말과 너무 닮아 있었다고 인정한다.",
      "behaviorHint": "아버지 이야기가 나오면 시선이 아래로 내려가고, 문장은 더 짧아진다."
    },
    {
      "id": "friend-v2-01-beat-b-d4-s3-s4",
      "caseId": "friend-v2-01",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S3",
      "toState": "S4",
      "primaryBeatType": "confession",
      "line": "최수민은 예전 손절이 변심 때문이 아니라 A 아버지가 빌려 간 돈을 갚지 않은 일에서 시작됐다고, 거의 처음으로 사기라는 뜻을 드러낸다.",
      "behaviorHint": "말을 멈추는 간격이 길어지고, 끝 문장에서만 핵심 단어를 겨우 꺼낸다."
    },
    {
      "id": "friend-v2-01-beat-a-d5-s2-s3",
      "caseId": "friend-v2-01",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S2",
      "toState": "S3",
      "primaryBeatType": "counter_shift",
      "line": "송다은은 예전에도, 이번에도 자신이 모르는 사정이 있었을 수 있다는 생각을 너무 늦게 했다고 처음으로 인정한다.",
      "behaviorHint": "단정하던 말투가 끊기고, 단톡방에 올린 순간을 다시 반복해 확인한다."
    },
    {
      "id": "friend-v2-01-beat-a-d5-s4-s5",
      "caseId": "friend-v2-01",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S4",
      "toState": "S5",
      "primaryBeatType": "confession",
      "line": "송다은은 결국 자신이 두 번 다 최수민을 같은 사람으로 몰아가며 먼저 버렸다는 점을 인정한다.",
      "behaviorHint": "변명보다 짧은 인정이 먼저 나오고, 이후 문장이 거의 이어지지 않는다."
    }
  ]
} as const
