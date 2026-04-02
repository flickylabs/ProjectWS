export const family10V3GameLoopData = {
  "caseId": "family-10",
  "dossierCards": [
    {
      "id": "dossier-1",
      "name": "도착 문구와 통보 시각",
      "description": "잘린 단톡 캡처와 원본 일정 기록을 대조해 약속 문구와 늦은 통보의 핵심을 가른다.",
      "evidenceIds": [
        "e-1",
        "e-2"
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
              "text": "유다은 씨, 잘린 캡처를 원문보다 먼저 내민 이유가 무엇입니까. '되면'과 '안 되면 토요일 아침' 구절을 보고도 왜 금요일 밤 확정이라고 단정했는지 답하십시오.",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d1.a.unlock.s2.conditional_clause",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q2",
              "text": "재판관은 해석이 아니라 인식 과정을 묻습니다. 그 조건부 문장이 언제부터 본인 안에서 '확정 약속'으로 굳어졌습니까.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d1.a.unlock.s3.expectation_fixation",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q3",
              "text": "금요일 밤 약속이 깨졌다는 분노가 실제로는 어떤 노동 부담과 연결되어 있었습니까. 감정의 원점을 말씀하십시오.",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "d1.a.unlock.s4.symbolic_abandonment",
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
              "text": "유민재 씨, 원문이 조건부였다면 왜 상대가 확정처럼 받아들일 표현을 그대로 놔두었습니까.",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d1.b.unlock.s2.cropped_context",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q2",
              "text": "마지막 거래처 일정이 끝난 뒤에도 금요일 밤 가능성을 유지한 사유를 시각 순서대로 답하십시오.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d2.b.unlock.s2.knew_by_evening",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q3",
              "text": "실망시킬까 두려워 연락을 늦춘 것이라면, 그 두려움이 실제 통보 지연의 원인이었는지 분명히 답하십시오.",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "d2.b.unlock.s4.didnt_want_to_disappoint",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-2",
      "name": "장보기 확대와 20만원의 의미",
      "description": "추가 주문 기록과 송금 내역을 묶어 메뉴 확대와 비용 해석의 비약을 가른다.",
      "evidenceIds": [
        "e-3",
        "e-4"
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
              "id": "dossier-2.a.q1",
              "text": "유다은 씨, 추가 주문 시점이 저녁 6시 무렵이라면 민재의 최종 통보 이전에 이미 메뉴를 키운 이유가 무엇입니까.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d3.a.unlock.s2.added_order_before_notice",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q2",
              "text": "차례상, 가족 식사, 친척 간식을 구분하지 않고 묶어 말한 것이 비용 범위를 흐리게 한 것 아닙니까.",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d3.a.unlock.s3.scope_blurred",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q3",
              "text": "20만원이 어머니 계좌로 가고 답장도 용돈이라면, 여전히 재료비 분담으로 본 판단의 출발점을 설명하십시오.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d4.a.unlock.s2.transfer_went_to_mother",
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
              "text": "유민재 씨, 이 영수증 흐름을 보면 유다은이 메뉴를 키운 사실 자체는 분명합니다. 그 점을 먼저 인정합니까.",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d3.b.unlock.s2.expansion_confirmed",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q2",
              "text": "20만원이 용돈이었다면 왜 누나에게 그 항목을 선명하게 적지 않았습니까. 오해를 방치한 이유를 답하십시오.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d4.b.unlock.s3.left_label_implicit",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q3",
              "text": "돈을 보냈고 아침에 갔다는 사정이 전체 책임을 면하게 한다고 생각했습니까. 그 논리를 인정합니까.",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "d4.b.unlock.s4.partial_credit_shield",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-3",
      "name": "작년 역할표와 올해 공동 실패",
      "description": "상담 메모, 역할표, 당일 체크리스트를 통해 올해 규칙이 어디서 무너졌는지 추적한다.",
      "evidenceIds": [
        "e-5",
        "e-6"
      ],
      "relatedDisputes": [
        "d-5"
      ],
      "subjectParty": "both",
      "challenges": [
        {
          "targetParty": "a",
          "questions": [
            {
              "id": "dossier-3.a.q1",
              "text": "유다은 씨, 작년 역할표 권고를 알고도 올해 다시 업데이트하지 않은 이유를 답하십시오.",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "d5.a.unlock.s2.role_sheet_not_updated",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q2",
              "text": "당일 체크리스트에는 준비 기록이 많지만 메뉴·비용 변경 공유 흔적은 없습니다. 그 공백을 인정합니까.",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d5.a.unlock.s3.i_also_broke_rule",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q3",
              "text": "이번 분노가 올해 하루의 문제가 아니라 반복 패턴에서 온 것이라면, 그 감정의 누적을 인정합니까.",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "d5.a.unlock.s4.left_alone_pattern",
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
              "text": "유민재 씨, 작년 역할표 원칙을 알면서도 올해 한 줄 문장으로 다시 못 박지 않은 이유가 무엇입니까.",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "d5.b.unlock.s2.no_clear_sentence",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q2",
              "text": "마지막 순간에 맞추면 된다고 생각해 규칙 확인을 뒤로 미룬 것인지, 그 판단을 분명히 답하십시오.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d5.b.unlock.s3.i_relied_on_last_minute",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q3",
              "text": "가족을 실망시키고 싶지 않아 확인 절차 자체를 피했다는 진술을 재판부는 받아들여도 됩니까.",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "d5.b.unlock.s4.didnt_want_to_disappoint_family",
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
            "id": "d1.a.unlock.s2.conditional_clause",
            "factText": "원문 메시지에는 금요일 밤 도착이 조건부였다는 문장이 함께 있었다.",
            "tags": [
              "context",
              "quote",
              "timeline"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "person": {
                "fullName": "유민재",
                "judgeRef": "동생",
                "neutral": "상대"
              },
              "time": {
                "fallback": "토요일 아침",
                "neutral": "그 시점",
                "exact": "금요일 밤"
              },
              "evidence": {
                "original": "가족 단톡 원본",
                "neutral": "그 메시지",
                "exact": "잘린 가족 단톡 캡처"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "d1.a.unlock.s3.expectation_fixation",
            "factText": "나는 조건 문장을 알고도 밤 준비 부담 때문에 금요일 밤 기대를 사실상 확정 약속으로 굳혔다.",
            "tags": [
              "motive",
              "responsibility",
              "counter"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "fullName": "유민재",
                "judgeRef": "동생",
                "neutral": "상대"
              },
              "time": {
                "fallback": "토요일 아침",
                "neutral": "그 시점",
                "exact": "금요일 밤"
              },
              "evidence": {
                "original": "가족 단톡 원본",
                "neutral": "그 메시지",
                "exact": "잘린 가족 단톡 캡처"
              }
            },
            "stanceHints": [
              "partial",
              "blame"
            ]
          }
        ],
        "S4": [
          {
            "id": "d1.a.unlock.s4.symbolic_abandonment",
            "factText": "민재의 늦은 도착은 내게 단순 시간 문제가 아니라 명절 노동을 또 혼자 떠안는 상징처럼 느껴졌다.",
            "tags": [
              "emotion",
              "harm",
              "relationship"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "fullName": "유민재",
                "judgeRef": "동생",
                "neutral": "상대"
              },
              "time": {
                "fallback": "토요일 아침",
                "neutral": "그 시점",
                "exact": "금요일 밤"
              },
              "evidence": {
                "original": "가족 단톡 원본",
                "neutral": "그 메시지",
                "exact": "잘린 가족 단톡 캡처"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "d1.a.unlock.s5.shared_misread",
            "factText": "금요일 밤 확정 약속은 아니었지만, 애매한 문장과 내 해석이 겹쳐 오해가 굳어졌다.",
            "tags": [
              "admission",
              "context",
              "relationship"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "fullName": "유민재",
                "judgeRef": "동생",
                "neutral": "상대"
              },
              "time": {
                "fallback": "토요일 아침",
                "neutral": "그 시점",
                "exact": "금요일 밤"
              },
              "evidence": {
                "original": "가족 단톡 원본",
                "neutral": "그 메시지",
                "exact": "잘린 가족 단톡 캡처"
              }
            },
            "stanceHints": [
              "confess"
            ]
          }
        ]
      },
      "d-2": {
        "S2": [
          {
            "id": "d2.a.unlock.s2.notice_gap",
            "factText": "민재의 일정 종료 시각과 실제 통보 시각 사이에는 몇 시간의 공백이 있었다.",
            "tags": [
              "timeline",
              "evidence",
              "context"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "person": {
                "fullName": "유민재",
                "judgeRef": "동생",
                "neutral": "상대"
              },
              "time": {
                "workEnd": "18시 08분",
                "notice": "22시 41분",
                "neutral": "그날 저녁"
              },
              "evidence": {
                "id": "e-2",
                "name": "가족 단톡 원본과 민재의 일정표·통행 기록"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "d2.a.unlock.s3.prep_loss",
            "factText": "22시 41분 통보는 내가 장보기와 준비 규모를 줄일 마지막 기회를 지나고 난 뒤였다.",
            "tags": [
              "harm",
              "responsibility",
              "timeline"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "fullName": "유민재",
                "judgeRef": "동생",
                "neutral": "상대"
              },
              "time": {
                "workEnd": "18시 08분",
                "notice": "22시 41분",
                "neutral": "그날 저녁"
              },
              "evidence": {
                "id": "e-2",
                "name": "가족 단톡 원본과 민재의 일정표·통행 기록"
              }
            },
            "stanceHints": [
              "partial",
              "blame"
            ]
          }
        ],
        "S4": [
          {
            "id": "d2.a.unlock.s4.left_alone_feeling",
            "factText": "늦은 통보는 단순 지연이 아니라 내가 새벽 준비를 혼자 떠안는다는 감정을 폭발시켰다.",
            "tags": [
              "emotion",
              "harm",
              "relationship"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "fullName": "유민재",
                "judgeRef": "동생",
                "neutral": "상대"
              },
              "time": {
                "workEnd": "18시 08분",
                "notice": "22시 41분",
                "neutral": "그날 저녁"
              },
              "evidence": {
                "id": "e-2",
                "name": "가족 단톡 원본과 민재의 일정표·통행 기록"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "d2.a.unlock.s5.delay_is_core",
            "factText": "이번 다툼의 핵심은 민재가 금요일 저녁 출발이 어렵다는 사실을 알고도 늦게 알렸다는 점이다.",
            "tags": [
              "admission",
              "responsibility",
              "context"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "fullName": "유민재",
                "judgeRef": "동생",
                "neutral": "상대"
              },
              "time": {
                "workEnd": "18시 08분",
                "notice": "22시 41분",
                "neutral": "그날 저녁"
              },
              "evidence": {
                "id": "e-2",
                "name": "가족 단톡 원본과 민재의 일정표·통행 기록"
              }
            },
            "stanceHints": [
              "confess"
            ]
          }
        ]
      },
      "d-3": {
        "S2": [
          {
            "id": "d3.a.unlock.s2.added_order_before_notice",
            "factText": "나는 민재의 최종 통보보다 앞선 저녁 6시 무렵 이미 추가 주문과 메뉴 확대를 해 두었다.",
            "tags": [
              "admission",
              "timeline",
              "evidence"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "person": {
                "fullName": "유민재",
                "judgeRef": "동생",
                "neutral": "상대"
              },
              "time": {
                "additionalOrder": "저녁 6시 무렵",
                "neutral": "추가 주문 시점"
              },
              "items": {
                "exact": "과일·고기·전 종류·반찬가게 주문",
                "neutral": "늘어난 메뉴"
              },
              "evidence": {
                "id": "e-3",
                "name": "정육점 예약표와 반찬가게 추가 주문 영수증"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "d3.a.unlock.s3.scope_blurred",
            "factText": "나는 차례상, 가족 식사, 친척 간식용 구분을 흐리며 늘어난 메뉴 범위를 스스로도 크게 뭉뚱그렸다.",
            "tags": [
              "context",
              "self_justification",
              "counter"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "fullName": "유민재",
                "judgeRef": "동생",
                "neutral": "상대"
              },
              "time": {
                "additionalOrder": "저녁 6시 무렵",
                "neutral": "추가 주문 시점"
              },
              "items": {
                "exact": "과일·고기·전 종류·반찬가게 주문",
                "neutral": "늘어난 메뉴"
              },
              "evidence": {
                "id": "e-3",
                "name": "정육점 예약표와 반찬가게 추가 주문 영수증"
              }
            },
            "stanceHints": [
              "partial",
              "blame"
            ]
          }
        ],
        "S4": [
          {
            "id": "d3.a.unlock.s4.control_through_labor",
            "factText": "상차림이 허전해 보이거나 내가 덜 한 사람처럼 보일까 두려워 메뉴를 더 키웠다.",
            "tags": [
              "emotion",
              "fear",
              "motive"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "fullName": "유민재",
                "judgeRef": "동생",
                "neutral": "상대"
              },
              "time": {
                "additionalOrder": "저녁 6시 무렵",
                "neutral": "추가 주문 시점"
              },
              "items": {
                "exact": "과일·고기·전 종류·반찬가게 주문",
                "neutral": "늘어난 메뉴"
              },
              "evidence": {
                "id": "e-3",
                "name": "정육점 예약표와 반찬가게 추가 주문 영수증"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "d3.a.unlock.s5.no_reconsent",
            "factText": "나는 메뉴를 키우고도 민재와 비용 항목별 합의를 다시 하지 않았다.",
            "tags": [
              "admission",
              "responsibility",
              "rule"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "fullName": "유민재",
                "judgeRef": "동생",
                "neutral": "상대"
              },
              "time": {
                "additionalOrder": "저녁 6시 무렵",
                "neutral": "추가 주문 시점"
              },
              "items": {
                "exact": "과일·고기·전 종류·반찬가게 주문",
                "neutral": "늘어난 메뉴"
              },
              "evidence": {
                "id": "e-3",
                "name": "정육점 예약표와 반찬가게 추가 주문 영수증"
              }
            },
            "stanceHints": [
              "confess"
            ]
          }
        ]
      },
      "d-4": {
        "S2": [
          {
            "id": "d4.a.unlock.s2.transfer_went_to_mother",
            "factText": "문제가 된 20만원은 다은이 아니라 어머니 계좌로 들어갔고 답장도 용돈으로 남아 있었다.",
            "tags": [
              "admission",
              "beneficiary",
              "evidence"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "person": {
                "fullName": "유민재",
                "judgeRef": "동생",
                "neutral": "상대"
              },
              "beneficiary": {
                "fullName": "유옥희",
                "judgeRef": "어머니",
                "neutral": "어머니"
              },
              "amount": {
                "exact": "20만원",
                "neutral": "그 돈"
              },
              "time": {
                "transfer": "명절 이틀 전 아침",
                "replyGap": "4분 뒤",
                "neutral": "그 무렵"
              },
              "evidence": {
                "id": "e-4",
                "name": "20만원 송금 내역과 어머니 답장 문자"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "d4.a.unlock.s3.merged_labor_and_settlement",
            "factText": "나는 정산 문제와 노동 인정 문제를 한 덩어리로 묶으면서 20만원의 의미를 더 크게 만들었다.",
            "tags": [
              "self_justification",
              "context",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "fullName": "유민재",
                "judgeRef": "동생",
                "neutral": "상대"
              },
              "beneficiary": {
                "fullName": "유옥희",
                "judgeRef": "어머니",
                "neutral": "어머니"
              },
              "amount": {
                "exact": "20만원",
                "neutral": "그 돈"
              },
              "time": {
                "transfer": "명절 이틀 전 아침",
                "replyGap": "4분 뒤",
                "neutral": "그 무렵"
              },
              "evidence": {
                "id": "e-4",
                "name": "20만원 송금 내역과 어머니 답장 문자"
              }
            },
            "stanceHints": [
              "partial",
              "blame"
            ]
          }
        ],
        "S4": [
          {
            "id": "d4.a.unlock.s4.clung_to_help_sign",
            "factText": "밤새 쓴 돈과 노동이 억울해 보여서 나는 그 송금을 분담의 표시로 붙잡고 싶었다.",
            "tags": [
              "emotion",
              "motive",
              "harm"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "fullName": "유민재",
                "judgeRef": "동생",
                "neutral": "상대"
              },
              "beneficiary": {
                "fullName": "유옥희",
                "judgeRef": "어머니",
                "neutral": "어머니"
              },
              "amount": {
                "exact": "20만원",
                "neutral": "그 돈"
              },
              "time": {
                "transfer": "명절 이틀 전 아침",
                "replyGap": "4분 뒤",
                "neutral": "그 무렵"
              },
              "evidence": {
                "id": "e-4",
                "name": "20만원 송금 내역과 어머니 답장 문자"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "d4.a.unlock.s5.not_cost_share",
            "factText": "그 20만원은 사전에 합의된 재료비 분담금이 아니라 어머니 용돈에 가까웠다.",
            "tags": [
              "admission",
              "beneficiary",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "fullName": "유민재",
                "judgeRef": "동생",
                "neutral": "상대"
              },
              "beneficiary": {
                "fullName": "유옥희",
                "judgeRef": "어머니",
                "neutral": "어머니"
              },
              "amount": {
                "exact": "20만원",
                "neutral": "그 돈"
              },
              "time": {
                "transfer": "명절 이틀 전 아침",
                "replyGap": "4분 뒤",
                "neutral": "그 무렵"
              },
              "evidence": {
                "id": "e-4",
                "name": "20만원 송금 내역과 어머니 답장 문자"
              }
            },
            "stanceHints": [
              "confess"
            ]
          }
        ]
      },
      "d-5": {
        "S2": [
          {
            "id": "d5.a.unlock.s2.role_sheet_not_updated",
            "factText": "올해 명절에는 작년 역할표를 다시 업데이트하지 않았고 메뉴·비용 변경도 따로 적지 않았다.",
            "tags": [
              "rule",
              "legacy_sentence",
              "admission"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "person": {
                "fullName": "유민재",
                "judgeRef": "동생",
                "neutral": "상대"
              },
              "rule": {
                "exact": "도착 시간·음식 종류·비용 항목",
                "neutral": "작년 역할표 원칙"
              },
              "reference": {
                "exact": "작년 추석 직후",
                "neutral": "그때"
              },
              "evidence": {
                "id": "e-5/e-6",
                "name": "가족상담센터 권고 메모·작년 역할표·당일 체크리스트·주방 사진"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "d5.a.unlock.s3.i_also_broke_rule",
            "factText": "민재의 늦은 통보와 별개로 나 역시 메뉴와 비용 변경 공유 규칙을 어겼다.",
            "tags": [
              "responsibility",
              "rule",
              "admission"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "fullName": "유민재",
                "judgeRef": "동생",
                "neutral": "상대"
              },
              "rule": {
                "exact": "도착 시간·음식 종류·비용 항목",
                "neutral": "작년 역할표 원칙"
              },
              "reference": {
                "exact": "작년 추석 직후",
                "neutral": "그때"
              },
              "evidence": {
                "id": "e-5/e-6",
                "name": "가족상담센터 권고 메모·작년 역할표·당일 체크리스트·주방 사진"
              }
            },
            "stanceHints": [
              "partial",
              "blame"
            ]
          }
        ],
        "S4": [
          {
            "id": "d5.a.unlock.s4.left_alone_pattern",
            "factText": "이번 다툼은 이번 한 번의 문제가 아니라 예전부터 혼자 남겨졌다고 느낀 패턴이 다시 터진 것이었다.",
            "tags": [
              "emotion",
              "relationship",
              "legacy_sentence"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "fullName": "유민재",
                "judgeRef": "동생",
                "neutral": "상대"
              },
              "rule": {
                "exact": "도착 시간·음식 종류·비용 항목",
                "neutral": "작년 역할표 원칙"
              },
              "reference": {
                "exact": "작년 추석 직후",
                "neutral": "그때"
              },
              "evidence": {
                "id": "e-5/e-6",
                "name": "가족상담센터 권고 메모·작년 역할표·당일 체크리스트·주방 사진"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "d5.a.unlock.s5.shared_failure_full",
            "factText": "올해 명절 분담 원칙은 민재와 나 둘 다 제대로 지키지 못했다.",
            "tags": [
              "admission",
              "rule",
              "relationship"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "fullName": "유민재",
                "judgeRef": "동생",
                "neutral": "상대"
              },
              "rule": {
                "exact": "도착 시간·음식 종류·비용 항목",
                "neutral": "작년 역할표 원칙"
              },
              "reference": {
                "exact": "작년 추석 직후",
                "neutral": "그때"
              },
              "evidence": {
                "id": "e-5/e-6",
                "name": "가족상담센터 권고 메모·작년 역할표·당일 체크리스트·주방 사진"
              }
            },
            "stanceHints": [
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
            "id": "d1.b.unlock.s2.cropped_context",
            "factText": "잘린 캡처에서는 빠졌지만, 원문에는 금요일 밤과 토요일 아침을 함께 둔 조건 문장이 있었다.",
            "tags": [
              "context",
              "quote",
              "evidence"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "person": {
                "fullName": "유다은",
                "judgeRef": "누나",
                "neutral": "상대"
              },
              "time": {
                "fallback": "토요일 아침",
                "neutral": "그 시점",
                "exact": "금요일 밤"
              },
              "evidence": {
                "original": "가족 단톡 원본",
                "neutral": "그 메시지",
                "exact": "잘린 가족 단톡 캡처"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "d1.b.unlock.s3.ambiguous_reassurance",
            "factText": "나는 확정 약속은 아니라고 생각하면서도 누나가 안심할 표현을 더 크게 남겼다.",
            "tags": [
              "responsibility",
              "motive",
              "counter"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "fullName": "유다은",
                "judgeRef": "누나",
                "neutral": "상대"
              },
              "time": {
                "fallback": "토요일 아침",
                "neutral": "그 시점",
                "exact": "금요일 밤"
              },
              "evidence": {
                "original": "가족 단톡 원본",
                "neutral": "그 메시지",
                "exact": "잘린 가족 단톡 캡처"
              }
            },
            "stanceHints": [
              "partial",
              "blame"
            ]
          }
        ],
        "S4": [
          {
            "id": "d1.b.unlock.s4.shame_delay",
            "factText": "약속을 못 지키는 동생처럼 보일까 창피해서 금요일 밤 기대를 바로 접지 못했다.",
            "tags": [
              "shame",
              "emotion",
              "fear"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "fullName": "유다은",
                "judgeRef": "누나",
                "neutral": "상대"
              },
              "time": {
                "fallback": "토요일 아침",
                "neutral": "그 시점",
                "exact": "금요일 밤"
              },
              "evidence": {
                "original": "가족 단톡 원본",
                "neutral": "그 메시지",
                "exact": "잘린 가족 단톡 캡처"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "d1.b.unlock.s5.expectation_induced",
            "factText": "확정 약속은 아니었지만, 내가 금요일 밤처럼 기대하게 말한 책임은 남는다.",
            "tags": [
              "admission",
              "responsibility",
              "relationship"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "fullName": "유다은",
                "judgeRef": "누나",
                "neutral": "상대"
              },
              "time": {
                "fallback": "토요일 아침",
                "neutral": "그 시점",
                "exact": "금요일 밤"
              },
              "evidence": {
                "original": "가족 단톡 원본",
                "neutral": "그 메시지",
                "exact": "잘린 가족 단톡 캡처"
              }
            },
            "stanceHints": [
              "confess"
            ]
          }
        ]
      },
      "d-2": {
        "S2": [
          {
            "id": "d2.b.unlock.s2.knew_by_evening",
            "factText": "나는 오후 늦게에는 이미 금요일 밤 출발이 어려워졌다는 걸 알고 있었다.",
            "tags": [
              "timeline",
              "admission",
              "evidence"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "person": {
                "fullName": "유다은",
                "judgeRef": "누나",
                "neutral": "상대"
              },
              "time": {
                "workEnd": "18시 08분",
                "notice": "22시 41분",
                "neutral": "그날 저녁"
              },
              "evidence": {
                "id": "e-2",
                "name": "가족 단톡 원본과 민재의 일정표·통행 기록"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "d2.b.unlock.s3.kept_hope_story",
            "factText": "나는 교통과 거래처 핑계를 먼저 붙이며 늦은 통보라는 핵심을 흐렸다.",
            "tags": [
              "counter",
              "self_justification",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "fullName": "유다은",
                "judgeRef": "누나",
                "neutral": "상대"
              },
              "time": {
                "workEnd": "18시 08분",
                "notice": "22시 41분",
                "neutral": "그날 저녁"
              },
              "evidence": {
                "id": "e-2",
                "name": "가족 단톡 원본과 민재의 일정표·통행 기록"
              }
            },
            "stanceHints": [
              "partial",
              "blame"
            ]
          }
        ],
        "S4": [
          {
            "id": "d2.b.unlock.s4.didnt_want_to_disappoint",
            "factText": "실망시키는 말을 바로 보내기 싫어 연락을 미루는 쪽을 택했다.",
            "tags": [
              "emotion",
              "fear",
              "shame"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "fullName": "유다은",
                "judgeRef": "누나",
                "neutral": "상대"
              },
              "time": {
                "workEnd": "18시 08분",
                "notice": "22시 41분",
                "neutral": "그날 저녁"
              },
              "evidence": {
                "id": "e-2",
                "name": "가족 단톡 원본과 민재의 일정표·통행 기록"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "d2.b.unlock.s5.admit_2241_delay",
            "factText": "나는 아침 출발 가능성이 커진 걸 알고도 22시 41분까지 알리지 않았다.",
            "tags": [
              "admission",
              "timeline",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "fullName": "유다은",
                "judgeRef": "누나",
                "neutral": "상대"
              },
              "time": {
                "workEnd": "18시 08분",
                "notice": "22시 41분",
                "neutral": "그날 저녁"
              },
              "evidence": {
                "id": "e-2",
                "name": "가족 단톡 원본과 민재의 일정표·통행 기록"
              }
            },
            "stanceHints": [
              "confess"
            ]
          }
        ]
      },
      "d-3": {
        "S2": [
          {
            "id": "d3.b.unlock.s2.expansion_confirmed",
            "factText": "정육점 예약표와 반찬가게 영수증은 누나가 추가 주문으로 메뉴를 키운 흐름을 보여 준다.",
            "tags": [
              "evidence",
              "context",
              "timeline"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "person": {
                "fullName": "유다은",
                "judgeRef": "누나",
                "neutral": "상대"
              },
              "time": {
                "additionalOrder": "저녁 6시 무렵",
                "neutral": "추가 주문 시점"
              },
              "items": {
                "exact": "과일·고기·전 종류·반찬가게 주문",
                "neutral": "늘어난 메뉴"
              },
              "evidence": {
                "id": "e-3",
                "name": "정육점 예약표와 반찬가게 추가 주문 영수증"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "d3.b.unlock.s3.my_delay_background",
            "factText": "그래도 내 늦은 통보가 누나의 불안을 키워 메뉴 확대의 배경이 되었다.",
            "tags": [
              "responsibility",
              "context",
              "admission"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "fullName": "유다은",
                "judgeRef": "누나",
                "neutral": "상대"
              },
              "time": {
                "additionalOrder": "저녁 6시 무렵",
                "neutral": "추가 주문 시점"
              },
              "items": {
                "exact": "과일·고기·전 종류·반찬가게 주문",
                "neutral": "늘어난 메뉴"
              },
              "evidence": {
                "id": "e-3",
                "name": "정육점 예약표와 반찬가게 추가 주문 영수증"
              }
            },
            "stanceHints": [
              "partial",
              "blame"
            ]
          }
        ],
        "S4": [
          {
            "id": "d3.b.unlock.s4.cost_as_moral_judgment",
            "factText": "늘어난 장보기가 전부 내 무책임의 증거처럼 읽히는 게 억울하고 방어적이었다.",
            "tags": [
              "emotion",
              "harm",
              "relationship"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "fullName": "유다은",
                "judgeRef": "누나",
                "neutral": "상대"
              },
              "time": {
                "additionalOrder": "저녁 6시 무렵",
                "neutral": "추가 주문 시점"
              },
              "items": {
                "exact": "과일·고기·전 종류·반찬가게 주문",
                "neutral": "늘어난 메뉴"
              },
              "evidence": {
                "id": "e-3",
                "name": "정육점 예약표와 반찬가게 추가 주문 영수증"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "d3.b.unlock.s5.both_fueled_cost_conflict",
            "factText": "누나는 메뉴를 키워 공유하지 않았고, 나는 그 갈등이 커질 배경을 만들었다.",
            "tags": [
              "admission",
              "relationship",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "fullName": "유다은",
                "judgeRef": "누나",
                "neutral": "상대"
              },
              "time": {
                "additionalOrder": "저녁 6시 무렵",
                "neutral": "추가 주문 시점"
              },
              "items": {
                "exact": "과일·고기·전 종류·반찬가게 주문",
                "neutral": "늘어난 메뉴"
              },
              "evidence": {
                "id": "e-3",
                "name": "정육점 예약표와 반찬가게 추가 주문 영수증"
              }
            },
            "stanceHints": [
              "confess"
            ]
          }
        ]
      },
      "d-4": {
        "S2": [
          {
            "id": "d4.b.unlock.s2.allowance_not_material_cost",
            "factText": "20만원 송금은 어머니 용돈으로 기록돼 있고 재료비로 합의된 적은 없다.",
            "tags": [
              "beneficiary",
              "evidence",
              "admission"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "person": {
                "fullName": "유다은",
                "judgeRef": "누나",
                "neutral": "상대"
              },
              "beneficiary": {
                "fullName": "유옥희",
                "judgeRef": "어머니",
                "neutral": "어머니"
              },
              "amount": {
                "exact": "20만원",
                "neutral": "그 돈"
              },
              "time": {
                "transfer": "명절 이틀 전 아침",
                "replyGap": "4분 뒤",
                "neutral": "그 무렵"
              },
              "evidence": {
                "id": "e-4",
                "name": "20만원 송금 내역과 어머니 답장 문자"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "d4.b.unlock.s3.left_label_implicit",
            "factText": "나는 그 돈의 항목을 누나에게 선명하게 적지 않아 오해 여지를 남겼다.",
            "tags": [
              "responsibility",
              "context",
              "counter"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "fullName": "유다은",
                "judgeRef": "누나",
                "neutral": "상대"
              },
              "beneficiary": {
                "fullName": "유옥희",
                "judgeRef": "어머니",
                "neutral": "어머니"
              },
              "amount": {
                "exact": "20만원",
                "neutral": "그 돈"
              },
              "time": {
                "transfer": "명절 이틀 전 아침",
                "replyGap": "4분 뒤",
                "neutral": "그 무렵"
              },
              "evidence": {
                "id": "e-4",
                "name": "20만원 송금 내역과 어머니 답장 문자"
              }
            },
            "stanceHints": [
              "partial",
              "blame"
            ]
          }
        ],
        "S4": [
          {
            "id": "d4.b.unlock.s4.partial_credit_shield",
            "factText": "무책임한 동생으로 몰리기 싫어서 나는 20만원 송금과 아침 도착을 전체 책임 면제처럼 내세웠다.",
            "tags": [
              "emotion",
              "self_justification",
              "fear"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "fullName": "유다은",
                "judgeRef": "누나",
                "neutral": "상대"
              },
              "beneficiary": {
                "fullName": "유옥희",
                "judgeRef": "어머니",
                "neutral": "어머니"
              },
              "amount": {
                "exact": "20만원",
                "neutral": "그 돈"
              },
              "time": {
                "transfer": "명절 이틀 전 아침",
                "replyGap": "4분 뒤",
                "neutral": "그 무렵"
              },
              "evidence": {
                "id": "e-4",
                "name": "20만원 송금 내역과 어머니 답장 문자"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "d4.b.unlock.s5.ambiguity_helped_me",
            "factText": "20만원은 용돈이었고, 내가 그 애매함을 제 방어에 활용한 면이 있다.",
            "tags": [
              "admission",
              "responsibility",
              "emotion"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "fullName": "유다은",
                "judgeRef": "누나",
                "neutral": "상대"
              },
              "beneficiary": {
                "fullName": "유옥희",
                "judgeRef": "어머니",
                "neutral": "어머니"
              },
              "amount": {
                "exact": "20만원",
                "neutral": "그 돈"
              },
              "time": {
                "transfer": "명절 이틀 전 아침",
                "replyGap": "4분 뒤",
                "neutral": "그 무렵"
              },
              "evidence": {
                "id": "e-4",
                "name": "20만원 송금 내역과 어머니 답장 문자"
              }
            },
            "stanceHints": [
              "confess"
            ]
          }
        ]
      },
      "d-5": {
        "S2": [
          {
            "id": "d5.b.unlock.s2.no_clear_sentence",
            "factText": "올해는 도착 시간, 메뉴, 비용 항목을 한 줄 문장으로 다시 고정하지 못했다.",
            "tags": [
              "rule",
              "admission",
              "context"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "person": {
                "fullName": "유다은",
                "judgeRef": "누나",
                "neutral": "상대"
              },
              "rule": {
                "exact": "도착 시간·음식 종류·비용 항목",
                "neutral": "작년 역할표 원칙"
              },
              "reference": {
                "exact": "작년 추석 직후",
                "neutral": "그때"
              },
              "evidence": {
                "id": "e-5/e-6",
                "name": "가족상담센터 권고 메모·작년 역할표·당일 체크리스트·주방 사진"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "d5.b.unlock.s3.i_relied_on_last_minute",
            "factText": "나는 마지막 순간에 상황을 맞추면 된다고 생각하며 규칙 확인을 계속 뒤로 미뤘다.",
            "tags": [
              "responsibility",
              "self_justification",
              "motive"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "fullName": "유다은",
                "judgeRef": "누나",
                "neutral": "상대"
              },
              "rule": {
                "exact": "도착 시간·음식 종류·비용 항목",
                "neutral": "작년 역할표 원칙"
              },
              "reference": {
                "exact": "작년 추석 직후",
                "neutral": "그때"
              },
              "evidence": {
                "id": "e-5/e-6",
                "name": "가족상담센터 권고 메모·작년 역할표·당일 체크리스트·주방 사진"
              }
            },
            "stanceHints": [
              "partial",
              "blame"
            ]
          }
        ],
        "S4": [
          {
            "id": "d5.b.unlock.s4.didnt_want_to_disappoint_family",
            "factText": "가족을 실망시키기 싫다는 마음이 오히려 확인 절차를 피하게 만들었다.",
            "tags": [
              "emotion",
              "fear",
              "relationship"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "fullName": "유다은",
                "judgeRef": "누나",
                "neutral": "상대"
              },
              "rule": {
                "exact": "도착 시간·음식 종류·비용 항목",
                "neutral": "작년 역할표 원칙"
              },
              "reference": {
                "exact": "작년 추석 직후",
                "neutral": "그때"
              },
              "evidence": {
                "id": "e-5/e-6",
                "name": "가족상담센터 권고 메모·작년 역할표·당일 체크리스트·주방 사진"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "d5.b.unlock.s5.shared_failure_full",
            "factText": "도착 시간, 음식 규모, 비용 항목을 명확히 적지 않아 결국 올해 규칙은 둘 다 실패했다.",
            "tags": [
              "admission",
              "rule",
              "relationship"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "fullName": "유다은",
                "judgeRef": "누나",
                "neutral": "상대"
              },
              "rule": {
                "exact": "도착 시간·음식 종류·비용 항목",
                "neutral": "작년 역할표 원칙"
              },
              "reference": {
                "exact": "작년 추석 직후",
                "neutral": "그때"
              },
              "evidence": {
                "id": "e-5/e-6",
                "name": "가족상담센터 권고 메모·작년 역할표·당일 체크리스트·주방 사진"
              }
            },
            "stanceHints": [
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
        "id": "ctr-1",
        "text": "유다은은 '금요일 밤 확정 약속'을 주장하지만, 원본 단톡에는 '되면 금요일 밤, 안 되면 토요일 아침'이라는 조건 문장이 함께 남아 있다.",
        "trigger": "e-1와 e-2를 함께 제시했을 때",
        "linkedDisputes": [
          "d-1"
        ]
      },
      {
        "id": "ctr-2",
        "text": "유민재는 늦은 통보를 '조금 늦어진 것'으로 줄여 말하지만, 일정 종료 18시 08분과 실제 통보 22시 41분 사이 공백이 확인된다.",
        "trigger": "e-2 제시 직후",
        "linkedDisputes": [
          "d-2"
        ]
      },
      {
        "id": "ctr-3",
        "text": "유다은은 20만원을 재료비 분담으로 묶지만, 수신 계좌와 어머니의 '용돈' 답장이 그 해석을 무너뜨린다.",
        "trigger": "e-4 제시 직후",
        "linkedDisputes": [
          "d-4"
        ]
      },
      {
        "id": "ctr-4",
        "text": "두 사람 모두 작년 역할표 원칙을 기억한다고 말하지만, 올해는 도착 시간·메뉴·비용 항목을 새로 고정한 흔적이 없다.",
        "trigger": "e-5와 e-6 비교 시",
        "linkedDisputes": [
          "d-5"
        ]
      }
    ],
    "interjections": [
      {
        "id": "int-1",
        "speaker": "a",
        "text": "그 말 하려면 왜 열 시 넘어서 보냈는데? 그 몇 시간이 제일 중요했다니까.",
        "trigger": "유민재가 교통·거래처 사정부터 길게 설명할 때",
        "linkedDisputes": [
          "d-2"
        ]
      },
      {
        "id": "int-2",
        "speaker": "b",
        "text": "누나, 추가 주문은 내가 아침에 간다고 말하기 전부터 넣었잖아. 그건 내 통보만으로 설명 안 돼.",
        "trigger": "유다은이 늘어난 장보기를 전부 민재 책임으로 돌릴 때",
        "linkedDisputes": [
          "d-3"
        ]
      },
      {
        "id": "int-3",
        "speaker": "a",
        "text": "돈 보낸 걸로 다 한 것처럼 말하지 마. 용돈이랑 재료비를 왜 같이 묶어.",
        "trigger": "유민재가 20만원 송금과 아침 도착을 함께 방어할 때",
        "linkedDisputes": [
          "d-4",
          "d-5"
        ]
      }
    ],
    "emotionalOutbursts": [
      {
        "id": "emo-a-1",
        "party": "a",
        "text": "결국 또 내가 다 했지. 밤에 전 부치고 아침에 과일 깎고 상 차리는 사람 마음은 아무도 안 보잖아요.",
        "behaviorHint": "목이 잠기고 품목을 한 호흡에 쏟아낸다.",
        "trigger": "d-1과 d-2가 연속 추궁될 때",
        "linkedDisputes": [
          "d-1",
          "d-2"
        ]
      },
      {
        "id": "emo-a-2",
        "party": "a",
        "text": "제가 덜 했다는 뜻이에요? 정산 얘기만 나오면 왜 제 고생이 통째로 지워지는 것 같죠.",
        "behaviorHint": "눈가가 붉어지고 질문을 되받아친다.",
        "trigger": "d-3 또는 d-4에서 비용 항목을 세분화할 때",
        "linkedDisputes": [
          "d-3",
          "d-4"
        ]
      },
      {
        "id": "emo-b-1",
        "party": "b",
        "text": "돈도 보냈고 아침엔 갔잖아요. 저를 아예 안 온 사람처럼 몰아가면 저도 할 말이 없죠.",
        "behaviorHint": "숫자를 먼저 던지고 턱을 굳힌다.",
        "trigger": "유다은이 민재를 전면 포기한 사람처럼 몰아갈 때",
        "linkedDisputes": [
          "d-4",
          "d-5"
        ]
      },
      {
        "id": "emo-b-2",
        "party": "b",
        "text": "또 약속 못 지키는 동생으로만 보이는 게 싫어서 그랬어요. 그렇다고 제가 일부러 숨긴 사람은 아니잖아요.",
        "behaviorHint": "목소리가 순간 높아졌다가 끝에서 꺾인다.",
        "trigger": "d-1 또는 d-2에서 무책임한 동생 이미지가 직접 지적될 때",
        "linkedDisputes": [
          "d-1",
          "d-2"
        ]
      }
    ]
  },
  "transitionBeats": [
    {
      "id": "family10:transition:a:d-3:s0_s1",
      "caseId": "family-10",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "shopping_scale_question",
      "line": "조금 보탠 건 있어도 따로 다시 합의할 정도는 아니었어요. 가족 먹을 걸 챙긴 걸 메뉴 확대라고까지 보긴 어렵죠.",
      "behaviorHint": "초기 부정을 접고 표현 범위를 좁히며 말꼬리를 조정한다."
    },
    {
      "id": "family10:transition:a:d-3:s1_s2",
      "caseId": "family-10",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-3_presented",
      "line": "과일이랑 고기, 전 종류를 조금 늘린 건 맞아요. 차례상, 가족 식사, 친척 간식이 한꺼번에 겹쳐서 그랬어요.",
      "behaviorHint": "증거가 들어오자 핵심 일부를 인정하되 해석은 붙잡는다.",
      "revealAtom": "d3.a.unlock.s2.added_order_before_notice"
    },
    {
      "id": "family10:transition:a:d-3:s2_s3",
      "caseId": "family-10",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "menu_change_followup",
      "line": "제가 더 산 건 맞지만 민재가 늦게 알려 현장에서 더 챙길 수밖에 없었습니다. 혼자 비어 보이면 결국 제가 다 감당해야 했어요.",
      "behaviorHint": "부분 인정 뒤에 상대 책임과 사정 설명을 덧댄다.",
      "revealAtom": "d3.a.unlock.s3.scope_blurred"
    },
    {
      "id": "family10:transition:a:d-3:s3_s5",
      "caseId": "family-10",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "responsibility_question",
      "line": "처음 계획보다 메뉴와 장보기를 키웠고, 그걸 민재와 비용 항목별로 다시 합의하지 않았습니다. 그 부분은 제 책임입니다.",
      "behaviorHint": "더는 버티기 어렵다고 판단해 핵심 사실과 자기 책임을 시인한다.",
      "revealAtom": "d3.a.unlock.s5.no_reconsent"
    },
    {
      "id": "family10:transition:a:d-4:s0_s1",
      "caseId": "family-10",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "transfer_meaning_question",
      "line": "적어도 분담 의사가 있는 신호라고는 봤어요. 용돈만이라고 들은 적은 없었습니다.",
      "behaviorHint": "초기 부정을 접고 표현 범위를 좁히며 말꼬리를 조정한다."
    },
    {
      "id": "family10:transition:a:d-4:s1_s2",
      "caseId": "family-10",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-4_presented",
      "line": "어머니 계좌로 간 건 맞아요. 그래도 명절 이틀 전 시점이라 저는 재료비가 일부라도 섞인다고 받아들였습니다.",
      "behaviorHint": "증거가 들어오자 핵심 일부를 인정하되 해석은 붙잡는다.",
      "revealAtom": "d4.a.unlock.s2.transfer_went_to_mother"
    },
    {
      "id": "family10:transition:a:d-4:s2_s3",
      "caseId": "family-10",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "mother_reply_followup",
      "line": "제가 오해한 건 맞아도 민재가 용돈과 재료비를 분리해 말하지 않아 그런 겁니다. 노동량과 정산이 한꺼번에 제 몫이 되니까 더 그렇게 봤어요.",
      "behaviorHint": "부분 인정 뒤에 상대 책임과 사정 설명을 덧댄다.",
      "revealAtom": "d4.a.unlock.s3.merged_labor_and_settlement"
    },
    {
      "id": "family10:transition:a:d-4:s3_s5",
      "caseId": "family-10",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "cost_responsibility_question",
      "line": "그 20만원은 사전에 합의된 재료비 분담금이 아니라 어머니 용돈이었습니다. 제가 제 부담을 설명하려고 그 의미를 분담금 쪽으로 끌고 간 겁니다.",
      "behaviorHint": "더는 버티기 어렵다고 판단해 핵심 사실과 자기 책임을 시인한다.",
      "revealAtom": "d4.a.unlock.s5.not_cost_share"
    },
    {
      "id": "family10:transition:a:d-5:s0_s1",
      "caseId": "family-10",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "shared_rule_question",
      "line": "완벽하진 않아도 저는 현장에서 맞추려 했습니다. 문제의 시작은 민재가 시간을 못 박지 않은 데 있었어요.",
      "behaviorHint": "초기 부정을 접고 표현 범위를 좁히며 말꼬리를 조정한다."
    },
    {
      "id": "family10:transition:a:d-5:s1_s4",
      "caseId": "family-10",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S1",
      "toState": "S4",
      "trigger": "nonjudgmental_question_about_feeling_left_alone",
      "line": "또 혼자 남겨졌다는 느낌이 올라와서 제가 어긴 부분은 뒤로 미뤘어요. 사실 관계보다 서운함을 먼저 붙들었습니다.",
      "behaviorHint": "비난이 아닌 공감 질문에 감정 방어가 먼저 무너진다.",
      "revealAtom": "d5.a.unlock.s4.left_alone_pattern"
    },
    {
      "id": "family10:transition:a:d-5:s4_s3",
      "caseId": "family-10",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S4",
      "toState": "S3",
      "trigger": "e-5_presented",
      "line": "둘 다 놓친 부분은 있지만 저는 메뉴와 비용을 현장에서 메운 쪽이고, 민재는 통보를 늦춘 쪽입니다. 책임이 완전히 반반은 아니라고 봅니다.",
      "behaviorHint": "감정 고백 뒤 다시 책임 배분 논리로 내려와 설명을 정리한다.",
      "revealAtom": "d5.a.unlock.s3.i_also_broke_rule"
    },
    {
      "id": "family10:transition:a:d-5:s3_s5",
      "caseId": "family-10",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "shared_responsibility_question",
      "line": "민재는 통보를 늦췄고 저는 메뉴·비용 변경을 공유하지 않았습니다. 결국 올해는 작년 역할표 원칙을 둘 다 제대로 못 지켰습니다.",
      "behaviorHint": "더는 버티기 어렵다고 판단해 핵심 사실과 자기 책임을 시인한다.",
      "revealAtom": "d5.a.unlock.s5.shared_failure_full"
    },
    {
      "id": "family10:transition:b:d-2:s0_s1",
      "caseId": "family-10",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "late_notice_question",
      "line": "상황이 정리된 뒤 바로 말한 편이에요. 교통까지 봐야 해서 확답이 늦었습니다.",
      "behaviorHint": "초기 부정을 접고 표현 범위를 좁히며 말꼬리를 조정한다."
    },
    {
      "id": "family10:transition:b:d-2:s1_s2",
      "caseId": "family-10",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-2_presented",
      "line": "오후 늦게 아침 출발 쪽으로 기운 건 맞아요. 그래도 끝까지 밤 출발 가능성을 보느라 바로 못 보냈습니다.",
      "behaviorHint": "증거가 들어오자 핵심 일부를 인정하되 해석은 붙잡는다.",
      "revealAtom": "d2.b.unlock.s2.knew_by_evening"
    },
    {
      "id": "family10:transition:b:d-2:s2_s3",
      "caseId": "family-10",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "afternoon_schedule_followup",
      "line": "18시 08분에 일정이 끝났다고 바로 판단이 끝나는 건 아니었습니다. 차 막힘이랑 거래처 정리가 남아 있어 미룬 겁니다.",
      "behaviorHint": "부분 인정 뒤에 상대 책임과 사정 설명을 덧댄다.",
      "revealAtom": "d2.b.unlock.s3.kept_hope_story"
    },
    {
      "id": "family10:transition:b:d-2:s3_s5",
      "caseId": "family-10",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "responsibility_question",
      "line": "금요일 저녁에 이미 어렵다는 걸 알면서도 22시 41분까지 미룬 건 제 잘못입니다. 그 지연 때문에 누나 부담이 커졌습니다.",
      "behaviorHint": "더는 버티기 어렵다고 판단해 핵심 사실과 자기 책임을 시인한다.",
      "revealAtom": "d2.b.unlock.s5.admit_2241_delay"
    },
    {
      "id": "family10:transition:b:d-1:s0_s1",
      "caseId": "family-10",
      "party": "b",
      "disputeId": "d-1",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "arrival_promise_question",
      "line": "금요일 밤을 우선 본 거지 단정한 게 아니에요. 상황이 안 되면 아침이라고 이미 붙여 놨습니다.",
      "behaviorHint": "초기 부정을 접고 표현 범위를 좁히며 말꼬리를 조정한다."
    },
    {
      "id": "family10:transition:b:d-1:s1_s2",
      "caseId": "family-10",
      "party": "b",
      "disputeId": "d-1",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-1_presented",
      "line": "잘린 캡처만 보면 제가 확정한 것처럼 보일 수는 있어요. 원문은 조건부였습니다.",
      "behaviorHint": "증거가 들어오자 핵심 일부를 인정하되 해석은 붙잡는다.",
      "revealAtom": "d1.b.unlock.s2.cropped_context"
    },
    {
      "id": "family10:transition:b:d-1:s2_s3",
      "caseId": "family-10",
      "party": "b",
      "disputeId": "d-1",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "full_chat_followup",
      "line": "조건부 문장이었는데 누나가 확정 약속처럼 받아들였어요. 저도 그 기대를 바로 끊지는 못했습니다.",
      "behaviorHint": "부분 인정 뒤에 상대 책임과 사정 설명을 덧댄다.",
      "revealAtom": "d1.b.unlock.s3.ambiguous_reassurance"
    },
    {
      "id": "family10:transition:b:d-1:s3_s5",
      "caseId": "family-10",
      "party": "b",
      "disputeId": "d-1",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-2_presented",
      "line": "무조건 금요일 밤이라고 한 건 아니었습니다. 하지만 금요일 밤처럼 기대하게 말해 놓고 수정도 늦게 해서 오해를 키웠습니다.",
      "behaviorHint": "더는 버티기 어렵다고 판단해 핵심 사실과 자기 책임을 시인한다.",
      "revealAtom": "d1.b.unlock.s5.expectation_induced"
    },
    {
      "id": "family10:transition:b:d-5:s0_s1",
      "caseId": "family-10",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "shared_rule_question",
      "line": "올해 역할표를 다시 적진 못했어도 큰 틀은 알고 움직였습니다. 서로 현장에서 맞춘 부분도 있었어요.",
      "behaviorHint": "초기 부정을 접고 표현 범위를 좁히며 말꼬리를 조정한다."
    },
    {
      "id": "family10:transition:b:d-5:s1_s4",
      "caseId": "family-10",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S1",
      "toState": "S4",
      "trigger": "nonjudgmental_question_about_not_wanting_to_disappoint",
      "line": "실망시키기 싫어서 미루다 보니 규칙 자체를 다시 확인할 타이밍을 놓쳤습니다. 그래서 사소한 애매함이 다 크게 번졌어요.",
      "behaviorHint": "비난이 아닌 공감 질문에 감정 방어가 먼저 무너진다.",
      "revealAtom": "d5.b.unlock.s4.didnt_want_to_disappoint_family"
    },
    {
      "id": "family10:transition:b:d-5:s4_s3",
      "caseId": "family-10",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S4",
      "toState": "S3",
      "trigger": "e-5_presented",
      "line": "저는 늦게 알렸고 누나는 메뉴를 공유하지 않았습니다. 서로 한쪽만 지킨 상태였어요.",
      "behaviorHint": "감정 고백 뒤 다시 책임 배분 논리로 내려와 설명을 정리한다.",
      "revealAtom": "d5.b.unlock.s3.i_relied_on_last_minute"
    },
    {
      "id": "family10:transition:b:d-5:s3_s5",
      "caseId": "family-10",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "shared_responsibility_question",
      "line": "작년 규칙을 이번엔 둘 다 제대로 실행하지 못했습니다. 도착 시간, 음식 규모, 비용 항목을 명확히 적지 않은 공동 실패였습니다.",
      "behaviorHint": "더는 버티기 어렵다고 판단해 핵심 사실과 자기 책임을 시인한다.",
      "revealAtom": "d5.b.unlock.s5.shared_failure_full"
    }
  ]
}
