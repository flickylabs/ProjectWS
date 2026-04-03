export const tenant01V3GameLoopData = {
  "caseId": "tenant-01",
  "dossierCards": [
    {
      "id": "dossier-1",
      "name": "벽지 범위와 공제 폭 비교",
      "description": "입주·퇴거 사진과 비교 견적을 묶어 벽지 손상 범위와 공제 통보 폭을 동시에 겨냥한다.",
      "evidenceIds": [
        "e-1",
        "e-4"
      ],
      "relatedDisputes": [
        "d-2",
        "d-5"
      ],
      "subjectParty": "both",
      "challenges": [
        {
          "targetParty": "a",
          "questions": [
            {
              "id": "dossier-1.a.q1",
              "text": "윤하림 씨, 입주·퇴거 비교 사진과 비교 견적을 함께 보면, 반려묘 흔적이 남은 범위가 거실 한 면 수준이라는 점은 인정합니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "tenant01:a:d-2:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q2",
              "text": "그렇다면 왜 처음에는 '사진 보시면 알아요'라고만 하며 자기 책임 범위를 바로 말하지 않았습니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "tenant01:a:d-2:unlock:s4:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q3",
              "text": "전면 도배 견적과 한 면 보수 견적 차이를 본 뒤에도, 지금도 세입자 부담이 전면 교체 수준이라고 보지는 않는다는 취지입니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "tenant01:a:d-2:unlock:s5:0",
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
              "text": "최상우 씨, 같은 벽 치수 기준으로 받은 비교 견적에서 부분 보수가 직접 기준으로 잡혔는데, 전면 도배까지 먼저 넣은 근거가 무엇입니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "tenant01:b:d-5:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q2",
              "text": "특약상 세입자 부담은 고의·과실 손상과 미납액인데, 노후 수전 교체까지 공제 통보에 넣은 이유는 무엇입니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "tenant01:b:d-5:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q3",
              "text": "사진과 견적을 모두 대조한 지금도, 전면 도배와 노후 수전까지 한꺼번에 넣은 통보가 적정했다고 보십니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "tenant01:b:d-5:unlock:s5:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-2",
      "name": "조건부 약속과 특약 문구 대조",
      "description": "대화 원문과 계약 특약을 함께 들이대어 보증금 반환 약속의 조건부 성격과 왜곡 지점을 겨눈다.",
      "evidenceIds": [
        "e-3",
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
              "id": "dossier-2.a.q1",
              "text": "윤하림 씨, 처음 제출한 카카오톡 캡처가 조건 문장 앞뒤를 잘라 '당일' 부분만 더 강하게 보이게 만든 건 맞습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "tenant01:a:d-4:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q2",
              "text": "중개사 동석 대화의 정확한 취지가 '미납 월세와 실제 복구비만 정산하면 나머지를 그날 송금'이라는 조건부 약속이었던 점은 인정합니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "tenant01:a:d-4:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q3",
              "text": "계약 특약까지 함께 보면, 당신도 약속이 조건부였음을 알면서 날짜 부분만 앞세워 진술한 것 아닙니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "tenant01:a:d-4:unlock:s5:0",
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
              "text": "최상우 씨, 전체 대화 원문을 보면 '정산되면 그날 보내겠다'는 취지의 발언이 남는데, 그 문장을 부인하시겠습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "tenant01:b:d-4:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q2",
              "text": "정산 주도권을 놓치지 않으려고 날짜는 단정적으로 말해 놓고, 나중에는 원칙론으로 물린 것 아닙니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "tenant01:b:d-4:unlock:s4:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q3",
              "text": "특약상 실제 복구비만 공제해야 하는데, 왜 그 범위를 넘어선 항목까지 넣어 당일 반환 약속을 사실상 무력화했습니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "tenant01:b:d-5:unlock:s3:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-3",
      "name": "지연 납부와 누수 기록 교차 검증",
      "description": "계좌 거래내역과 관리실 누수 기록을 맞물려, 각자 숨긴 책임 범위를 직접 겨냥한다.",
      "evidenceIds": [
        "e-2",
        "e-5"
      ],
      "relatedDisputes": [
        "d-1",
        "d-3"
      ],
      "subjectParty": "both",
      "challenges": [
        {
          "targetParty": "a",
          "questions": [
            {
              "id": "dossier-3.a.q1",
              "text": "윤하림 씨, 은행 거래내역상 마지막 월세가 약정일보다 5일 늦게 들어간 점은 인정합니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "tenant01:a:d-1:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q2",
              "text": "새 집 계약금 일정이 걸려 있었기 때문에, 그 5일 지연을 실제보다 작게 말한 것 아닙니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "tenant01:a:d-1:unlock:s4:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q3",
              "text": "같은 주 안에 정리한 사정과 별개로, 지연 책임 자체는 본인 몫이라고 지금은 정리할 수 있습니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "tenant01:a:d-1:unlock:s5:0",
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
              "text": "최상우 씨, 관리실 접수기록상 첫 누수 접수 시점이 하림 씨 입주 전이라는 점을 인정합니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "tenant01:b:d-3:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q2",
              "text": "공실 때 한 번에 고치려는 생각으로 본수리를 미뤘던 것 아닙니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "tenant01:b:d-3:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q3",
              "text": "그렇다면 주된 누수 원인과 수리 책임은 임대인 쪽에 있다고 보아야 하지 않습니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "tenant01:b:d-3:unlock:s5:0",
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
            "id": "tenant01:a:d-1:unlock:s2:0",
            "factText": "은행 거래내역상 마지막 월세는 약정일보다 정확히 5일 뒤 재입금되었다.",
            "tags": [
              "timeline",
              "admission"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "delay": {
                "exact": "5일",
                "neutral": "그 기간",
                "rounded": "5일"
              },
              "time": {
                "exact": "계약 종료 한 달 전 약정일",
                "neutral": "그 시점",
                "period": "계약 종료 한 달 전 약정일"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "tenant01:a:d-1:unlock:s3:0",
            "factText": "지연 원인은 자동이체 한도 문제였고, 같은 주 안에 관리비까지 함께 정리되었다.",
            "tags": [
              "context",
              "self_justification"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "cause": {
                "exact": "자동이체 한도 문제",
                "neutral": "계좌 설정 문제"
              },
              "status": {
                "exact": "같은 주 안에 정리",
                "neutral": "곧 정리된 상태"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S4": [
          {
            "id": "tenant01:a:d-1:unlock:s4:0",
            "factText": "하림은 새 집 계약금을 맞춰야 해 5일 지연이 상습 미납처럼 보일까 두려워했다.",
            "tags": [
              "fear",
              "motive"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "time": {
                "exact": "계약 종료 한 달 전 약정일",
                "neutral": "그 시점",
                "period": "계약 종료 한 달 전 약정일"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "tenant01:a:d-1:unlock:s5:0",
            "factText": "하림은 5일 지연 책임이 자신에게 있음을 받아들이고, 체면 때문에 축소했다는 점까지 인정한다.",
            "tags": [
              "admission",
              "responsibility",
              "shame"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "delay": {
                "exact": "5일",
                "neutral": "그 기간",
                "rounded": "5일"
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
            "id": "tenant01:a:d-2:unlock:s2:0",
            "factText": "거실 한 면의 긁힘은 반려묘 흔적일 가능성이 높아 세입자 부담 범위에 일부 포함된다.",
            "tags": [
              "admission",
              "act"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "area": {
                "exact": "거실 한 면",
                "neutral": "그 부분"
              },
              "cause": {
                "exact": "반려묘 긁힘",
                "neutral": "해당 흔적"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "tenant01:a:d-2:unlock:s3:0",
            "factText": "나머지 변색과 들뜸은 입주 당시 사진에도 보인 기존 상태였다.",
            "tags": [
              "evidence",
              "context"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "condition": {
                "exact": "기존 변색과 들뜸",
                "neutral": "기존 흔적"
              },
              "evidence": {
                "exact": "입주·퇴거 비교 사진",
                "neutral": "사진 자료"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S4": [
          {
            "id": "tenant01:a:d-2:unlock:s4:0",
            "factText": "하림은 반려묘 손상이 드러나면 집 전체를 망가뜨린 사람처럼 보일까 두려워 범위를 급히 줄여 말했다.",
            "tags": [
              "fear",
              "shame"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "cause": {
                "exact": "반려묘 긁힘",
                "neutral": "해당 흔적"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "tenant01:a:d-2:unlock:s5:0",
            "factText": "실제 세입자 책임은 전면 도배가 아니라 거실 한 면의 부분 보수 수준이다.",
            "tags": [
              "rule",
              "responsibility",
              "admission"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "area": {
                "exact": "거실 한 면",
                "neutral": "그 부분"
              },
              "scope": {
                "exact": "전면 도배",
                "neutral": "그 정도 공사"
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
            "id": "tenant01:a:d-4:unlock:s2:0",
            "factText": "중개사 포함 대화의 정확한 취지는 '미납 월세와 실제 복구비만 정산하면 나머지를 이사 당일 송금'이었다.",
            "tags": [
              "quote",
              "rule"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "broker": {
                "exact": "김도현",
                "neutral": "그 중개사",
                "fullName": "김도현 (공인중개사)",
                "judgeRef": "중개사"
              },
              "condition": {
                "exact": "미납 월세와 실제 복구비만 정산 후",
                "neutral": "정산 조건"
              },
              "time": {
                "exact": "이사 당일",
                "neutral": "그날",
                "dateExact": "이사 당일"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "tenant01:a:d-4:unlock:s3:0",
            "factText": "처음 제출된 크롭 캡처는 조건 문장 앞뒤를 잘라 날짜 약속만 더 강하게 보이게 했다.",
            "tags": [
              "evidence",
              "privacy",
              "context"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "channel": {
                "exact": "중개사 포함 대화",
                "neutral": "그 대화"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S4": [
          {
            "id": "tenant01:a:d-4:unlock:s4:0",
            "factText": "하림은 새 집 계약금 일정 때문에 조건보다 '당일'이라는 말에 더 집착했다.",
            "tags": [
              "fear",
              "motive"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "time": {
                "exact": "이사 당일",
                "neutral": "그날",
                "dateExact": "이사 당일"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "tenant01:a:d-4:unlock:s5:0",
            "factText": "하림은 약속의 조건부 성격을 알고도 자신에게 유리한 날짜 부분만 앞세워 설명했다.",
            "tags": [
              "admission",
              "shame"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "condition": {
                "exact": "미납 월세와 실제 복구비만 정산 후",
                "neutral": "정산 조건"
              },
              "time": {
                "exact": "이사 당일",
                "neutral": "그날",
                "dateExact": "이사 당일"
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
      "d-3": {
        "S2": [
          {
            "id": "tenant01:b:d-3:unlock:s2:0",
            "factText": "관리실 접수기록상 첫 누수 접수 시점은 하림 입주 이전이었다.",
            "tags": [
              "timeline",
              "institution"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "time": {
                "exact": "입주 이전 접수 시점",
                "neutral": "그 전 기록",
                "period": "입주 이전"
              },
              "item": {
                "exact": "욕실 수전",
                "neutral": "그 설비"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "tenant01:b:d-3:unlock:s3:0",
            "factText": "상우도 공실 때 고치자는 생각으로 본수리를 미뤘다.",
            "tags": [
              "responsibility",
              "motive"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "item": {
                "exact": "욕실 수전",
                "neutral": "그 설비"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S4": [
          {
            "id": "tenant01:b:d-3:unlock:s4:0",
            "factText": "상우는 노후 설비 비용을 떠안기 싫어 재통지 지연을 더 크게 들이밀었다.",
            "tags": [
              "motive",
              "shame"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "delay": {
                "exact": "재통지 지연",
                "neutral": "늦은 알림"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "tenant01:b:d-3:unlock:s5:0",
            "factText": "누수의 주된 원인은 노후 부품이며, 주된 수리 책임은 임대인에게 있다.",
            "tags": [
              "admission",
              "responsibility",
              "rule"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "cause": {
                "exact": "노후 부품",
                "neutral": "기존 하자"
              },
              "item": {
                "exact": "욕실 수전",
                "neutral": "그 설비"
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
            "id": "tenant01:b:d-4:unlock:s2:0",
            "factText": "상우는 중개사 포함 대화에서 정산이 되면 나머지 보증금을 이사 당일 보내겠다고 말했다.",
            "tags": [
              "quote",
              "timeline"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "broker": {
                "exact": "김도현",
                "neutral": "그 중개사",
                "fullName": "김도현 (공인중개사)",
                "judgeRef": "중개사"
              },
              "time": {
                "exact": "이사 당일",
                "neutral": "그날",
                "dateExact": "이사 당일"
              },
              "condition": {
                "exact": "미납 월세와 실제 복구비만 정산 후",
                "neutral": "정산 조건"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "tenant01:b:d-4:unlock:s3:0",
            "factText": "처음 제출된 캡처에는 '정산 후' 조건과 통화 전후 맥락이 일부 빠져 있었다.",
            "tags": [
              "evidence",
              "privacy"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "channel": {
                "exact": "중개사 포함 대화",
                "neutral": "그 대화"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S4": [
          {
            "id": "tenant01:b:d-4:unlock:s4:0",
            "factText": "상우는 보증금을 바로 내주면 공제 협상에서 밀릴까 봐 말을 애매하게 남기고 싶어 했다.",
            "tags": [
              "fear",
              "motive"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "time": {
                "exact": "이사 당일",
                "neutral": "그날",
                "dateExact": "이사 당일"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "tenant01:b:d-4:unlock:s5:0",
            "factText": "상우는 조건부 당일 반환 약속을 해 놓고도 이후 공제 범위를 넓혀 그 약속과 어긋난 행동을 했다.",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "condition": {
                "exact": "미납 월세와 실제 복구비만 정산 후",
                "neutral": "정산 조건"
              },
              "time": {
                "exact": "이사 당일",
                "neutral": "그날",
                "dateExact": "이사 당일"
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
            "id": "tenant01:b:d-5:unlock:s2:0",
            "factText": "부분 보수 견적은 같은 벽 치수 기준으로 작성돼 전면 도배보다 직접적인 비교 기준이 됐다.",
            "tags": [
              "evidence",
              "rule"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "estimate": {
                "exact": "부분 보수 견적 범위",
                "neutral": "실제 범위"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "tenant01:b:d-5:unlock:s3:0",
            "factText": "상우는 계약상 세입자 부담이 아닌 노후 수전 교체까지 처음 공제 통보에 넣었다.",
            "tags": [
              "responsibility",
              "rule"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "scope": {
                "exact": "전면 도배와 노후 수전 교체",
                "neutral": "넓은 공제 항목"
              },
              "rule": {
                "exact": "고의·과실 손상과 미납액만 세입자 정산",
                "neutral": "계약 기준"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S4": [
          {
            "id": "tenant01:b:d-5:unlock:s4:0",
            "factText": "상우는 '처음엔 세게 잡아야 한다'는 관리 통제 심리로 통보 범위를 일부러 넓혔다.",
            "tags": [
              "motive",
              "fear"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "notice": {
                "exact": "일괄 공제 통보",
                "neutral": "그 통보"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "tenant01:b:d-5:unlock:s5:0",
            "factText": "전면 도배와 노후 수전 교체를 포함한 통보는 실제 필요 범위와 계약 특약을 넘어섰다.",
            "tags": [
              "admission",
              "rule",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "scope": {
                "exact": "전면 도배와 노후 수전 교체",
                "neutral": "넓은 공제 항목"
              },
              "estimate": {
                "exact": "부분 보수 견적 범위",
                "neutral": "실제 범위"
              },
              "rule": {
                "exact": "고의·과실 손상과 미납액만 세입자 정산",
                "neutral": "계약 기준"
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
        "id": "tenant01:contradiction:0",
        "targetParty": "a",
        "trigger": "윤하림이 거실 벽지 책임을 전부 부인한 직후 e-1 또는 e-4가 제시될 때",
        "text": "입주 사진에도 기존 변색이 있고 비교 견적은 한 면 보수를 가리킵니다. 그런데 왜 방금까지 자기 책임 범위를 전혀 말하지 않았습니까?",
        "relatedDisputes": [
          "d-2"
        ],
        "evidenceIds": [
          "e-1",
          "e-4"
        ]
      },
      {
        "id": "tenant01:contradiction:1",
        "targetParty": "a",
        "trigger": "윤하림이 마지막 월세 지연을 축소한 직후 e-2가 제시될 때",
        "text": "계좌 기록에는 약정일보다 정확히 5일 늦은 시각이 남아 있습니다. 같은 주에 정리됐다는 말과 지연 자체의 부인은 서로 다른 얘기 아닙니까?",
        "relatedDisputes": [
          "d-1"
        ],
        "evidenceIds": [
          "e-2"
        ]
      },
      {
        "id": "tenant01:contradiction:2",
        "targetParty": "b",
        "trigger": "최상우가 욕실 수전 누수를 세입자 책임으로 몰아간 직후 e-5가 제시될 때",
        "text": "관리실 기록은 첫 누수 접수가 하림 입주 이전이라고 말합니다. 그렇다면 지금의 책임 설명은 노후 설비 기록과 정면으로 충돌하지 않습니까?",
        "relatedDisputes": [
          "d-3"
        ],
        "evidenceIds": [
          "e-5"
        ]
      },
      {
        "id": "tenant01:contradiction:3",
        "targetParty": "b",
        "trigger": "최상우가 당일 반환 약속을 부인하거나 공제 범위를 정당화한 직후 e-3 또는 e-6이 제시될 때",
        "text": "전체 대화와 특약을 함께 보면 '실제 복구비만 정산 후 당일 송금'이라는 취지가 드러납니다. 그런데 왜 지금은 그 약속보다 넓은 공제 통보를 먼저 정당화하십니까?",
        "relatedDisputes": [
          "d-4",
          "d-5"
        ],
        "evidenceIds": [
          "e-3",
          "e-6"
        ]
      }
    ],
    "interjections": [
      {
        "id": "tenant01:interjection:0",
        "speaker": "a",
        "trigger": "최상우가 반려묘 흔적만 근거로 벽 전체를 세입자 책임처럼 몰아갈 때",
        "text": "그 한 면 말고는 입주 때도 똑같았어요. 다 제 탓처럼 말씀하지 마세요.",
        "relatedDisputes": [
          "d-2",
          "d-5"
        ]
      },
      {
        "id": "tenant01:interjection:1",
        "speaker": "b",
        "trigger": "윤하림이 '당일 반환'만 반복하며 조건을 지우려 할 때",
        "text": "원칙상 정산 후 반환입니다. 날짜만 떼서 말하면 곤란합니다.",
        "relatedDisputes": [
          "d-4"
        ]
      },
      {
        "id": "tenant01:interjection:2",
        "speaker": "judge",
        "trigger": "크롭된 대화 캡처만으로 결론이 서려 할 때",
        "text": "앞뒤 문맥이 빠진 자료는 그대로 믿지 않습니다. 전체 대화와 특약 문구를 함께 보겠습니다.",
        "relatedDisputes": [
          "d-4",
          "d-5"
        ]
      }
    ],
    "emotionalOutbursts": [
      {
        "id": "tenant01:outburst:a:0",
        "party": "a",
        "trigger": "반려묘 손상만으로 집 전체를 망가뜨린 세입자처럼 몰릴 때",
        "text": "고양이가 긁은 한 면까지는 인정하겠는데, 처음부터 집 전체를 제가 망친 사람처럼 말씀하시는 건 너무합니다.",
        "relatedDisputes": [
          "d-2",
          "d-5"
        ]
      },
      {
        "id": "tenant01:outburst:a:1",
        "party": "a",
        "trigger": "퇴거 당일 보증금이 늦어 새 집 계약금이 흔들릴 가능성이 다시 언급될 때",
        "text": "저는 그날 돈이 안 들어오면 이사 자체가 밀릴 상황이었어요. 그래서 날짜에 매달린 거예요.",
        "relatedDisputes": [
          "d-4"
        ]
      },
      {
        "id": "tenant01:outburst:b:0",
        "party": "b",
        "trigger": "노후 수전 책임을 모두 임대인 몫이라며 관리 소홀을 강하게 비난받을 때",
        "text": "건물 관리가 말처럼 단순하지 않습니다. 한 번 기준이 무너지면 다음 정산도 전부 흐트러집니다.",
        "relatedDisputes": [
          "d-3",
          "d-5"
        ]
      },
      {
        "id": "tenant01:outburst:b:1",
        "party": "b",
        "trigger": "당일 반환 약속을 일부러 뒤집었다는 표현이 반복될 때",
        "text": "저도 약속을 가볍게 한 게 아닙니다. 다만 정산 기준 없이 돈부터 내놓는 집주인은 없습니다.",
        "relatedDisputes": [
          "d-4"
        ]
      }
    ]
  },
  "transitionBeats": [
    {
      "id": "tenant01:transition:a:d-1:s0_s1",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "rent_delay_question",
      "line": "크게 밀린 건 아니고 그냥 며칠 차이였어요. 그 주 안에 정리됐습니다.",
      "behaviorHint": "휴대폰을 켰다가 바로 내리며 설명을 짧게 끊는다."
    },
    {
      "id": "tenant01:transition:a:d-1:s1_s2",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-2_presented",
      "line": "거래내역이 그러면… 네, 5일 늦은 건 맞아요. 다만 길게 미룬 건 아닙니다.",
      "behaviorHint": "입술을 누른 채 시선을 계좌 기록 쪽으로 떨어뜨린다."
    },
    {
      "id": "tenant01:transition:a:d-1:s2_s3",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "auto_transfer_limit_question",
      "line": "자동이체 한도 문제였어요. 같은 주 안에 월세랑 관리비를 다 맞췄습니다.",
      "behaviorHint": "손끝으로 날짜를 세듯 탁자를 두드리며 변명을 정리한다."
    },
    {
      "id": "tenant01:transition:a:d-1:s3_s5",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "responsibility_question",
      "line": "결국 그 5일 지연 책임은 제 몫입니다. 체면 때문에 작게 말했어요.",
      "behaviorHint": "짧게 한숨을 쉬고 어깨 힘을 내려놓는다."
    },
    {
      "id": "tenant01:transition:a:d-2:s0_s1",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-2",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "wallpaper_scope_question",
      "line": "딱 문제 되는 건 그 부분 정도예요. 나머지는 입주 때부터 있던 흔적입니다.",
      "behaviorHint": "손으로 벽 한쪽만 그리듯 범위를 좁혀 보인다."
    },
    {
      "id": "tenant01:transition:a:d-2:s1_s2",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-2",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-1_presented",
      "line": "사진까지 보면 한 면 긁힘은 부인 못 하겠네요. 그래도 전면 도배까지는 아니에요.",
      "behaviorHint": "사진 화면을 오래 본 뒤 작게 고개를 끄덕인다."
    },
    {
      "id": "tenant01:transition:a:d-2:s2_s4",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-2",
      "fromState": "S2",
      "toState": "S4",
      "trigger": "nonjudgmental_question_about_cat_damage",
      "line": "고양이 얘기만 나오면 제가 집을 다 망가뜨린 사람처럼 보여서 무서웠어요.",
      "behaviorHint": "목소리가 작아지고 손끝이 옷자락을 만지작거린다."
    },
    {
      "id": "tenant01:transition:a:d-2:s4_s5",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-2",
      "fromState": "S4",
      "toState": "S5",
      "trigger": "e-4_presented",
      "line": "비교 견적까지 보면 한 면 보수 수준이 맞습니다. 그 범위는 제가 부담하겠습니다.",
      "behaviorHint": "견적서를 내려다보다가 마지막 문장을 또렷하게 말한다."
    },
    {
      "id": "tenant01:transition:a:d-4:s0_s1",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "deposit_timing_question",
      "line": "저는 그날 보내준다는 말로 들었어요. 그래서 이사 일정도 그렇게 잡았습니다.",
      "behaviorHint": "조건 문구는 흐리고 날짜 표현만 더 세게 반복한다."
    },
    {
      "id": "tenant01:transition:a:d-4:s1_s2",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-3_presented",
      "line": "…네, '정산 후'라는 조건이 붙어 있긴 했어요. 제가 날짜를 더 앞세웠습니다.",
      "behaviorHint": "캡처를 넘겨보다가 말끝을 낮춘다."
    },
    {
      "id": "tenant01:transition:a:d-4:s2_s5",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S2",
      "toState": "S5",
      "trigger": "e-6_presented",
      "line": "특약까지 같이 보니 제가 날짜만 앞세워 말한 게 맞습니다. 조건부 약속으로 정리하겠습니다.",
      "behaviorHint": "한숨을 누르고 고개를 숙인 뒤 문장을 천천히 고친다."
    },
    {
      "id": "tenant01:transition:b:d-3:s0_s1",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "faucet_repair_question",
      "line": "정확한 원인은 뜯어봐야 압니다. 다만 늦게 알린 책임은 남습니다.",
      "behaviorHint": "표정 변화 없이 문장을 짧게 자른다."
    },
    {
      "id": "tenant01:transition:b:d-3:s1_s2",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-5_presented",
      "line": "입주 전 접수 기록이 있다면, 기존 하자 가능성은 인정하겠습니다.",
      "behaviorHint": "기록 번호를 다시 확인하고 말의 속도를 낮춘다."
    },
    {
      "id": "tenant01:transition:b:d-3:s2_s3",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "previous_tenant_reference",
      "line": "예전부터 노후가 있었고, 본수리를 바로 안 한 제 판단도 있습니다.",
      "behaviorHint": "턱을 조금 내리며 처음으로 자기 쪽 사정을 넣는다."
    },
    {
      "id": "tenant01:transition:b:d-3:s3_s5",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "responsibility_question",
      "line": "주된 원인은 노후 부품이었고, 주된 수리 책임은 제 쪽으로 보겠습니다.",
      "behaviorHint": "숫자 대신 책임 소재를 또박또박 말한다."
    },
    {
      "id": "tenant01:transition:b:d-4:s0_s1",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "same_day_return_question",
      "line": "원칙상 정산 후 반환입니다. 당일이라는 표현이 과하게 받아들여진 겁니다.",
      "behaviorHint": "계약서 특약 부분을 손끝으로 짚으며 시선을 고정한다."
    },
    {
      "id": "tenant01:transition:b:d-4:s1_s2",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-3_presented",
      "line": "메시지 취지를 보면 같은 날 송금하겠다고 말한 건 맞습니다. 다만 조건이 있었습니다.",
      "behaviorHint": "짧게 인정한 뒤 바로 조건 문구를 덧붙인다."
    },
    {
      "id": "tenant01:transition:b:d-4:s2_s5",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S2",
      "toState": "S5",
      "trigger": "broker_reference",
      "line": "중개사까지 같은 취지로 들었다면, 그 약속을 제가 더 무겁게 봤어야 했습니다.",
      "behaviorHint": "잠시 침묵한 뒤 고개를 아주 작게 숙인다."
    },
    {
      "id": "tenant01:transition:b:d-5:s0_s1",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "deduction_scope_question",
      "line": "처음 공제 통보는 넓게 잡습니다. 그래야 정산 기준이 흐트러지지 않습니다.",
      "behaviorHint": "견적서 상단만 보여 주며 원칙을 반복한다."
    },
    {
      "id": "tenant01:transition:b:d-5:s1_s2",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-4_presented",
      "line": "부분 보수 견적이 직접 기준이라는 점은 인정합니다.",
      "behaviorHint": "비교 견적을 다시 읽고 한 문장만 짧게 끊어 말한다."
    },
    {
      "id": "tenant01:transition:b:d-5:s2_s3",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "contract_clause_question",
      "line": "특약 범위를 넘는 항목이 일부 있었던 것도 사실입니다.",
      "behaviorHint": "입꼬리 변화 없이 서류를 넘기며 문장을 낮춘다."
    },
    {
      "id": "tenant01:transition:b:d-5:s3_s5",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-6_presented",
      "line": "계약서까지 보면 전면 도배와 노후 수전 공제는 과했습니다. 통보 범위를 넘겼습니다.",
      "behaviorHint": "양손을 모은 채 건조하게 인정한다."
    }
  ]
}

