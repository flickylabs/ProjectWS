export const tenant09V3GameLoopData = {
  "caseId": "tenant-09",
  "dossierCards": [
    {
      "id": "dossier-1",
      "name": "계약금 흐름 재구성 카드",
      "description": "계약서 버전과 실제 송금 흐름을 같은 선상에 놓아 보증금 귀속을 가르는 카드.",
      "evidenceIds": [
        "e-1",
        "e-2"
      ],
      "relatedDisputes": [
        "d-1",
        "d-5"
      ],
      "subjectParty": "both",
      "challenges": [
        {
          "targetParty": "a",
          "questions": [
            {
              "id": "dossier-1.a.q1",
              "text": "김세라 씨, 계약서에는 8천만원이 적혀 있는데 실제로 박태윤 씨 계좌에 먼저 들어간 돈은 얼마였습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "tenant09:a:d-1:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q2",
              "text": "그렇다면 같은 날 14분 차이로 우석 측 계좌로 간 2천만원은 임대보증금이 아니라 무엇으로 이해하셨습니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "tenant09:a:d-1:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q3",
              "text": "계약서 숫자와 실제 귀속이 다르다는 걸 알면서도 8천만원 전액 반환 주장을 유지한 이유를, 가족 자금 사정까지 포함해 답하십시오.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "tenant09:a:d-1:unlock:s5:0",
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
              "text": "박태윤 씨, 본인 계좌 거래내역상 실제 수령액이 6천만원뿐이라는 점은 부인하지 않으시죠?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "tenant09:b:d-1:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q2",
              "text": "나머지 2천만원이 우석 쪽으로 빠진 걸 보셨다면, 왜 그 자리에서 최종 계약서 숫자를 멈추지 못했습니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "tenant09:b:d-1:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q3",
              "text": "초안 6천만원과 최종본 8천만원이 갈린 문서를 직접 대조하지 않은 책임은 어디까지 본인 몫입니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "tenant09:b:d-5:unlock:s2:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-2",
      "name": "허위 정리비 공모 카드",
      "description": "카카오톡과 회계전표를 붙여 2천만원이 누구의 이익으로 설계됐는지 드러내는 카드.",
      "evidenceIds": [
        "e-3",
        "e-4"
      ],
      "relatedDisputes": [
        "d-2",
        "d-1"
      ],
      "subjectParty": "both",
      "challenges": [
        {
          "targetParty": "a",
          "questions": [
            {
              "id": "dossier-2.a.q1",
              "text": "김세라 씨, 최종 스캔 30분 전 대화에서 '큰 숫자가 정책자금에 낫다'는 말을 듣고도 왜 구조를 멈추지 않았습니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "tenant09:a:d-2:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q2",
              "text": "우석 씨가 가져간 2천만원이 결국 본인과 우석 씨 모두에게 이익이 된다는 점을 알고 있었습니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "tenant09:a:d-2:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q3",
              "text": "컨설팅비 세금계산서와 회계전표가 남았는데도, 여전히 그 2천만원을 보증금 정리라고 부르실 겁니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "tenant09:a:d-2:unlock:s5:0",
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
              "text": "박태윤 씨, 지금 자료를 보면 세라 씨와 우석 씨가 8천만원 숫자에서 같이 이익을 봤다는 정황이 보이는데, 언제 처음 이상함을 느끼셨습니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "tenant09:b:d-1:unlock:s4:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q2",
              "text": "그 이상함을 느끼고도 왜 우석 씨에게 최종 파일과 2천만원 귀속을 끝까지 확인하지 않으셨습니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "tenant09:b:d-5:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q3",
              "text": "본인이 피해자라는 말과 별개로, '중개사가 정리하겠지' 하고 넘긴 태도도 분쟁을 키운 것 아닙니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "tenant09:b:d-5:unlock:s4:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-3",
      "name": "반환 지연과 미정산 분리 카드",
      "description": "스캔 로그와 정산표를 묶어 확인 소홀, 실제 미정산, 과장 공제를 분리하는 카드.",
      "evidenceIds": [
        "e-5",
        "e-6"
      ],
      "relatedDisputes": [
        "d-3",
        "d-4",
        "d-5"
      ],
      "subjectParty": "both",
      "challenges": [
        {
          "targetParty": "a",
          "questions": [
            {
              "id": "dossier-3.a.q1",
              "text": "김세라 씨, 마지막 월세 일부가 약정일보다 9일 늦었다는 점은 인정하십니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "tenant09:a:d-4:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q2",
              "text": "외부 간판 철거비가 명도 뒤에야 정산된 이유를, 당시 자금 사정과 함께 설명하십시오.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "tenant09:a:d-4:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q3",
              "text": "그 비용들이 제한적이었다고 해도 실제 미정산이 있었음을 체면 문제와 분리해서 인정하실 수 있습니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "tenant09:a:d-4:unlock:s5:0",
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
              "text": "박태윤 씨, 다투지 않는 6천만원 부분을 먼저 떼어 반환하지 않고 5주 넘게 묶어 둔 이유가 정확히 무엇입니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "tenant09:b:d-3:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q2",
              "text": "공실손실과 에어컨 세척비는 원본 견적 없이 정산표에 크게 들어갔는데, 그것이 실제 공제입니까 아니면 협상용 압박입니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "tenant09:b:d-3:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q3",
              "text": "세라 씨 미정산과 별개로, 반환 지연과 과장 공제는 본인 감정이 만든 부분도 있었다고 인정하십니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "tenant09:b:d-3:unlock:s5:0",
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
            "id": "tenant09:a:d-1:unlock:s2:0",
            "factText": "태윤 계좌 입금은 6천만원뿐이고, 같은 날 14분 차이로 2천만원이 우석 측 계좌로 따로 빠져나갔다.",
            "tags": [
              "act",
              "evidence"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "received_amount": {
                "exact": "6천만원",
                "neutral": "실수령액",
                "rounded": "6천"
              },
              "broker_amount": {
                "exact": "2천만원",
                "neutral": "그 차액",
                "rounded": "2천"
              },
              "time": {
                "exact": "같은 날 14분 차이",
                "neutral": "그때",
                "dateExact": "같은 날 14분 차이",
                "period": "계약 당일"
              }
            },
            "stanceHints": [
              "partial",
              "evidence"
            ]
          }
        ],
        "S3": [
          {
            "id": "tenant09:a:d-1:unlock:s3:0",
            "factText": "세라는 그 2천만원이 임대보증금으로 보관되지 않고 정리비 명목으로 처리된다는 점을 알고 있었다.",
            "tags": [
              "responsibility",
              "context"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "broker_amount": {
                "exact": "2천만원",
                "neutral": "그 차액",
                "rounded": "2천"
              },
              "broker_person": {
                "exact": "오우석",
                "neutral": "중개사",
                "fullName": "오우석",
                "judgeRef": "우석 씨"
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
            "id": "tenant09:a:d-1:unlock:s4:0",
            "factText": "가족 투자금과 정책자금 압박 때문에 세라는 8천만원 숫자를 포기하지 못했고, 그 감정이 사실 확인을 눌렀다.",
            "tags": [
              "emotion",
              "fear"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "contract_amount": {
                "exact": "8천만원",
                "neutral": "계약서상 보증금",
                "rounded": "8천"
              },
              "institution": {
                "exact": "소상공인정책자금 상담",
                "neutral": "정책자금 상담",
                "fullName": "문정인",
                "judgeRef": "심사역"
              }
            },
            "stanceHints": [
              "emotional",
              "partial"
            ]
          }
        ],
        "S5": [
          {
            "id": "tenant09:a:d-1:unlock:s5:0",
            "factText": "세라는 태윤이 실제로 6천만원만 받았다는 걸 알면서도 계약서상 8천만원 전액 반환 주장을 밀어붙였다.",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "received_amount": {
                "exact": "6천만원",
                "neutral": "실수령액",
                "rounded": "6천"
              },
              "contract_amount": {
                "exact": "8천만원",
                "neutral": "계약서상 보증금",
                "rounded": "8천"
              }
            },
            "stanceHints": [
              "confess",
              "admission"
            ]
          }
        ]
      },
      "d-2": {
        "S2": [
          {
            "id": "tenant09:a:d-2:unlock:s2:0",
            "factText": "카카오톡 전체 문맥에는 큰 보증금 숫자가 정책자금 상담과 이후 협상에 유리하다는 계산이 함께 들어 있다.",
            "tags": [
              "evidence",
              "motive"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "contract_amount": {
                "exact": "8천만원",
                "neutral": "부풀린 보증금 액수",
                "rounded": "8천"
              },
              "institution": {
                "exact": "소상공인정책자금 상담",
                "neutral": "정책자금 상담",
                "fullName": "문정인",
                "judgeRef": "심사역"
              },
              "time": {
                "exact": "최종 계약 스캔 30분 전",
                "neutral": "그 대화 시점",
                "dateExact": "최종 계약 스캔 30분 전",
                "period": "서명 직전"
              }
            },
            "stanceHints": [
              "partial",
              "evidence"
            ]
          }
        ],
        "S3": [
          {
            "id": "tenant09:a:d-2:unlock:s3:0",
            "factText": "세라는 우석과 함께 8천만원 숫자가 서로에게 이익이 된다는 점을 알고도 최종 스캔 직전까지 구조를 유지했다.",
            "tags": [
              "beneficiary",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "contract_amount": {
                "exact": "8천만원",
                "neutral": "부풀린 보증금 액수",
                "rounded": "8천"
              },
              "broker_person": {
                "exact": "오우석",
                "neutral": "중개사",
                "fullName": "오우석",
                "judgeRef": "우석 씨"
              },
              "time": {
                "exact": "최종 계약 스캔 30분 전",
                "neutral": "그 대화 시점",
                "dateExact": "최종 계약 스캔 30분 전",
                "period": "서명 직전"
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
            "id": "tenant09:a:d-2:unlock:s4:0",
            "factText": "세라는 가족 투자금과 정책자금 심사 앞에서 실패한 점주로 보일까 두려워 허위 구조를 멈추지 못했다.",
            "tags": [
              "emotion",
              "shame"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "institution": {
                "exact": "소상공인정책자금 상담",
                "neutral": "정책자금 상담",
                "fullName": "문정인",
                "judgeRef": "심사역"
              },
              "contract_amount": {
                "exact": "8천만원",
                "neutral": "부풀린 보증금 액수",
                "rounded": "8천"
              }
            },
            "stanceHints": [
              "emotional",
              "partial"
            ]
          }
        ],
        "S5": [
          {
            "id": "tenant09:a:d-2:unlock:s5:0",
            "factText": "2천만원은 임대보증금이 아니라 허위 정리비·컨설팅비로 처리돼 우석 측 일반 수익으로 남았다.",
            "tags": [
              "admission",
              "institution"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "broker_amount": {
                "exact": "2천만원",
                "neutral": "허위 정리비 금액",
                "rounded": "2천"
              },
              "invoice": {
                "exact": "컨설팅비 세금계산서",
                "neutral": "그 세금계산서"
              }
            },
            "stanceHints": [
              "confess",
              "admission"
            ]
          }
        ]
      },
      "d-4": {
        "S2": [
          {
            "id": "tenant09:a:d-4:unlock:s2:0",
            "factText": "마지막 월세 일부는 약정일보다 9일 늦게 입금됐다.",
            "tags": [
              "evidence",
              "timeline"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "rent_item": {
                "exact": "마지막 월세 일부",
                "neutral": "그 월세 일부"
              },
              "delay": {
                "exact": "약정일보다 9일 뒤",
                "neutral": "그 며칠 뒤",
                "dateExact": "약정일보다 9일 뒤",
                "period": "폐업 직전"
              }
            },
            "stanceHints": [
              "partial",
              "evidence"
            ]
          }
        ],
        "S3": [
          {
            "id": "tenant09:a:d-4:unlock:s3:0",
            "factText": "외부 간판 철거비는 명도 뒤에야 따로 정산됐다.",
            "tags": [
              "act",
              "context"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "sign_item": {
                "exact": "외부 간판 철거비",
                "neutral": "그 철거비"
              },
              "handover": {
                "exact": "명도 뒤",
                "neutral": "그 이후",
                "period": "명도 직후"
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
            "id": "tenant09:a:d-4:unlock:s4:0",
            "factText": "폐업 직전 자금 압박과 수치심 때문에 세라는 미정산 항목을 스스로도 축소해 말했다.",
            "tags": [
              "emotion",
              "shame"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "delay": {
                "exact": "약정일보다 9일 뒤",
                "neutral": "그 며칠 뒤",
                "dateExact": "약정일보다 9일 뒤",
                "period": "폐업 직전"
              },
              "time": {
                "exact": "폐업 직전",
                "neutral": "그 시기",
                "period": "폐업 직전"
              }
            },
            "stanceHints": [
              "emotional",
              "partial"
            ]
          }
        ],
        "S5": [
          {
            "id": "tenant09:a:d-4:unlock:s5:0",
            "factText": "세라는 금액이 크지 않더라도 마지막 월세 일부와 간판 철거비가 실제 미정산이었다는 점을 인정한다.",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "rent_item": {
                "exact": "마지막 월세 일부",
                "neutral": "그 월세 일부"
              },
              "sign_item": {
                "exact": "외부 간판 철거비",
                "neutral": "그 철거비"
              }
            },
            "stanceHints": [
              "confess",
              "admission"
            ]
          }
        ]
      }
    },
    "b": {
      "d-5": {
        "S2": [
          {
            "id": "tenant09:b:d-5:unlock:s2:0",
            "factText": "태윤은 6천만원으로 다시 맞춰 달라는 통화 뒤 올라온 최종 8천만원 스캔본을 직접 대조하지 않았다.",
            "tags": [
              "evidence",
              "responsibility"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "draft_amount": {
                "exact": "6천만원",
                "neutral": "초안 보증금",
                "rounded": "6천"
              },
              "final_amount": {
                "exact": "8천만원",
                "neutral": "최종본 보증금",
                "rounded": "8천"
              },
              "time": {
                "exact": "통화 뒤 19분 후",
                "neutral": "그 직후",
                "dateExact": "통화 뒤 19분 후",
                "period": "서명 당일"
              }
            },
            "stanceHints": [
              "partial",
              "evidence"
            ]
          }
        ],
        "S3": [
          {
            "id": "tenant09:b:d-5:unlock:s3:0",
            "factText": "복합기 로그상 통화 19분 후 업로드된 파일이 그대로 최종 계약본이 되었지만, 태윤은 그 파일을 열어보지 않았다.",
            "tags": [
              "timeline",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "doc_final": {
                "exact": "최종 스캔본",
                "neutral": "그 최종본"
              },
              "time": {
                "exact": "통화 뒤 19분 후",
                "neutral": "그 직후",
                "dateExact": "통화 뒤 19분 후",
                "period": "서명 당일"
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
            "id": "tenant09:b:d-5:unlock:s4:0",
            "factText": "공실과 세금 부담이 겹친 날이라는 사정은 있었지만, 태윤은 그 조급함을 이유로 최종 확인을 남에게 넘겼다.",
            "tags": [
              "emotion",
              "self_justification"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "broker_person": {
                "exact": "오우석",
                "neutral": "중개사",
                "fullName": "오우석",
                "judgeRef": "우석 씨"
              },
              "time": {
                "exact": "서명 당일",
                "neutral": "그날",
                "period": "바쁜 서명일"
              }
            },
            "stanceHints": [
              "emotional",
              "partial"
            ]
          }
        ],
        "S5": [
          {
            "id": "tenant09:b:d-5:unlock:s5:0",
            "factText": "태윤은 마지막 출력본과 실제 입금 내역을 직접 맞춰보지 않은 채 서명과 날인을 넘겼다.",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "doc_final": {
                "exact": "최종 스캔본",
                "neutral": "그 최종본"
              },
              "draft_amount": {
                "exact": "6천만원",
                "neutral": "초안 보증금",
                "rounded": "6천"
              }
            },
            "stanceHints": [
              "confess",
              "admission"
            ]
          }
        ]
      },
      "d-3": {
        "S2": [
          {
            "id": "tenant09:b:d-3:unlock:s2:0",
            "factText": "태윤은 다투지 않는 6천만원 부분도 즉시 반환하지 않고 명도 뒤 5주 넘게 묶어 두었다.",
            "tags": [
              "evidence",
              "timeline"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "received_amount": {
                "exact": "6천만원",
                "neutral": "다투지 않는 보증금",
                "rounded": "6천"
              },
              "delay": {
                "exact": "명도 뒤 5주 넘게",
                "neutral": "그 지연 기간",
                "period": "반환 지연 기간"
              }
            },
            "stanceHints": [
              "partial",
              "evidence"
            ]
          }
        ],
        "S3": [
          {
            "id": "tenant09:b:d-3:unlock:s3:0",
            "factText": "공실손실과 에어컨 세척비는 원본 견적 없이 정산표에 크게 들어가 반환 지연의 명분으로 쓰였다.",
            "tags": [
              "harm",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "item_vacancy": {
                "exact": "공실손실",
                "neutral": "그 손실 항목"
              },
              "item_cleaning": {
                "exact": "에어컨 세척비",
                "neutral": "그 청소비"
              },
              "settlement": {
                "exact": "정산표",
                "neutral": "그 정산표"
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
            "id": "tenant09:b:d-3:unlock:s4:0",
            "factText": "태윤은 자신이 더 손해 봤다는 피해의식 때문에 반환 기준을 실제보다 넓게 잡았다.",
            "tags": [
              "emotion",
              "self_justification"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "item_vacancy": {
                "exact": "공실손실",
                "neutral": "그 손실 항목"
              },
              "received_amount": {
                "exact": "6천만원",
                "neutral": "다투지 않는 보증금",
                "rounded": "6천"
              }
            },
            "stanceHints": [
              "emotional",
              "partial"
            ]
          }
        ],
        "S5": [
          {
            "id": "tenant09:b:d-3:unlock:s5:0",
            "factText": "실제 미정산 항목과 별개로, 반환 지연과 과장 공제에 대한 태윤의 책임이 남는다.",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "received_amount": {
                "exact": "6천만원",
                "neutral": "다투지 않는 보증금",
                "rounded": "6천"
              },
              "settlement": {
                "exact": "정산표",
                "neutral": "그 정산표"
              }
            },
            "stanceHints": [
              "confess",
              "admission"
            ]
          }
        ]
      },
      "d-1": {
        "S2": [
          {
            "id": "tenant09:b:d-1:unlock:s2:0",
            "factText": "태윤 계좌로 실제 들어온 보증금은 6천만원뿐이었다.",
            "tags": [
              "evidence",
              "act"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "received_amount": {
                "exact": "6천만원",
                "neutral": "실수령액",
                "rounded": "6천"
              },
              "time": {
                "exact": "같은 날 14분 차이",
                "neutral": "그때",
                "dateExact": "같은 날 14분 차이",
                "period": "계약 당일"
              }
            },
            "stanceHints": [
              "partial",
              "evidence"
            ]
          }
        ],
        "S3": [
          {
            "id": "tenant09:b:d-1:unlock:s3:0",
            "factText": "나머지 2천만원을 우석이 정리한다고 하자 태윤은 직접 확인하지 않은 채 계약서 문구를 그대로 뒀다.",
            "tags": [
              "responsibility",
              "relationship"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "broker_amount": {
                "exact": "2천만원",
                "neutral": "그 차액",
                "rounded": "2천"
              },
              "broker_person": {
                "exact": "오우석",
                "neutral": "중개사",
                "fullName": "오우석",
                "judgeRef": "우석 씨"
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
            "id": "tenant09:b:d-1:unlock:s4:0",
            "factText": "세금과 공실 부담 속에서 태윤은 계약 구조를 깊게 따질 여유가 없다고 스스로 합리화했다.",
            "tags": [
              "emotion",
              "self_justification"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "time": {
                "exact": "계약 체결 무렵",
                "neutral": "그 무렵",
                "period": "공실 압박기"
              },
              "broker_person": {
                "exact": "오우석",
                "neutral": "중개사",
                "fullName": "오우석",
                "judgeRef": "우석 씨"
              }
            },
            "stanceHints": [
              "emotional",
              "partial"
            ]
          }
        ],
        "S5": [
          {
            "id": "tenant09:b:d-1:unlock:s5:0",
            "factText": "태윤도 8천만원 문구와 실수령 6천만원의 차이를 방치해 분쟁의 틈을 키웠다.",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "contract_amount": {
                "exact": "8천만원",
                "neutral": "계약서상 보증금",
                "rounded": "8천"
              },
              "received_amount": {
                "exact": "6천만원",
                "neutral": "실수령액",
                "rounded": "6천"
              }
            },
            "stanceHints": [
              "confess",
              "admission"
            ]
          }
        ]
      }
    }
  },
  "events": {
    "contradictions": [
      {
        "id": "tenant09:contradiction:0",
        "targetParty": "a",
        "trigger": "세라가 계약서상 8천만원 전액이 곧바로 박태윤에게 귀속됐다고 말할 때",
        "text": "계좌기록상 박태윤 계좌에는 6천만원만 들어가고 2천만원은 우석 측으로 빠졌습니다. 계약서 숫자와 실제 귀속 중 어느 쪽을 사실로 보아야 합니까?",
        "relatedDisputes": [
          "d-1",
          "d-2"
        ],
        "evidenceIds": [
          "e-2",
          "e-4"
        ]
      },
      {
        "id": "tenant09:contradiction:1",
        "targetParty": "b",
        "trigger": "태윤이 최종 계약서를 충분히 확인했다고 말할 때",
        "text": "초안은 6천만원, 최종 스캔본은 8천만원이며 통화 19분 후 파일이 올라갔습니다. 그런데 왜 마지막 출력본 대조를 안 했습니까?",
        "relatedDisputes": [
          "d-5",
          "d-1"
        ],
        "evidenceIds": [
          "e-1",
          "e-5"
        ]
      },
      {
        "id": "tenant09:contradiction:2",
        "targetParty": "b",
        "trigger": "태윤이 정산이 끝날 때까지 한 푼도 돌려줄 수 없었다고 말할 때",
        "text": "실제 미정산 항목이 있더라도 다투지 않는 6천만원 부분을 먼저 분리하지 않은 이유가 설명되지 않습니다. 반환 지연과 공제 확대가 같은 결정이었습니까?",
        "relatedDisputes": [
          "d-3",
          "d-4"
        ],
        "evidenceIds": [
          "e-6"
        ]
      },
      {
        "id": "tenant09:contradiction:3",
        "targetParty": "a",
        "trigger": "세라가 월세와 간판 비용은 모두 정리됐다고 말할 때",
        "text": "마지막 월세 일부는 9일 늦었고 간판 철거비도 명도 뒤에 정산됐습니다. 제한적이었다는 주장과 실제 미정산 존재를 분리해서 답하십시오.",
        "relatedDisputes": [
          "d-4"
        ],
        "evidenceIds": [
          "e-6"
        ]
      }
    ],
    "interjections": [
      {
        "id": "tenant09:interjection:0",
        "speaker": "a",
        "trigger": "태윤이 공실비와 세금 이야기를 길게 늘어놓아 보증금 귀속 질문을 흐릴 때",
        "text": "지금 묻는 건 총손실이 아니라, 실제로 누가 얼마를 받았는지 아닙니까.",
        "relatedDisputes": [
          "d-1",
          "d-3"
        ]
      },
      {
        "id": "tenant09:interjection:1",
        "speaker": "b",
        "trigger": "세라가 2천만원을 단순한 서류 정리처럼 축소할 때",
        "text": "서류 정리가 아니라 제 계좌로 안 들어온 돈 아닙니까. 그걸 왜 자꾸 종이 문제처럼만 말합니까?",
        "relatedDisputes": [
          "d-1",
          "d-2"
        ]
      },
      {
        "id": "tenant09:interjection:2",
        "speaker": "judge",
        "trigger": "두 사람이 동시에 우석 탓만 하며 자기 책임을 밀어낼 때",
        "text": "중개사 책임은 따로 보겠습니다. 지금은 각자 알고도 넘긴 지점과 확인하지 않은 지점을 분리해 답하십시오.",
        "relatedDisputes": [
          "d-1",
          "d-2",
          "d-5"
        ]
      }
    ],
    "emotionalOutbursts": [
      {
        "id": "tenant09:outburst:a:0",
        "party": "a",
        "trigger": "가족 투자금과 정책자금 얘기가 동시에 나오며 세라의 동기가 정면으로 지적될 때",
        "text": "네, 숫자에 매달렸습니다. 그런데 그게 다 망해 가는 가게 살려보겠다는 마음이었지, 처음부터 누구 돈을 훔치겠다는 건 아니었어요.",
        "relatedDisputes": [
          "d-1",
          "d-2"
        ]
      },
      {
        "id": "tenant09:outburst:a:1",
        "party": "a",
        "trigger": "세라가 월세와 간판 비용까지 전부 거짓말했다는 식으로 몰릴 때",
        "text": "작은 비용을 못 끝낸 건 제 잘못이지만, 그걸로 몇 주를 끌어도 된다는 뜻은 아니잖아요.",
        "relatedDisputes": [
          "d-3",
          "d-4"
        ]
      },
      {
        "id": "tenant09:outburst:b:0",
        "party": "b",
        "trigger": "태윤이 2천만원을 떼먹은 건물주처럼 단정될 때",
        "text": "제가 받은 건 6천만원뿐이었습니다. 저를 도둑처럼 부르면, 중개사가 만든 틈과 제가 놓친 틈이 다 한데 섞여 버립니다.",
        "relatedDisputes": [
          "d-1",
          "d-5"
        ]
      },
      {
        "id": "tenant09:outburst:b:1",
        "party": "b",
        "trigger": "최종 계약서 확인 소홀을 반복해서 지적받아 체면이 무너질 때",
        "text": "압니다. 한 번만 제대로 봤어도 됐다는 거요. 그걸 못 한 게 제일 창피해서 계속 길게 변명한 겁니다.",
        "relatedDisputes": [
          "d-5"
        ]
      }
    ]
  },
  "transitionBeats": [
    {
      "id": "tenant09:transition:a:d-1:s0_s1",
      "caseId": "tenant-09",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "재판관이 실제 입금 계좌와 실수령액을 직접 묻는 순간",
      "line": "태윤 사장님 계좌와 우석 쪽 정리 계좌가 따로 움직인 건 맞지만, 당시엔 다 계약 정리 과정으로 이해했습니다. 저는 총액만 맞으면 된다고 들었습니다.",
      "behaviorHint": "짧게 버티다가 핵심 단어를 스스로 다시 꺼낸다."
    },
    {
      "id": "tenant09:transition:a:d-1:s1_s2",
      "caseId": "tenant-09",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "보증금 분할 송금 내역과 우석 측 수령증이 제시되는 순간",
      "line": "태윤 사장님 계좌로는 6천만원이 들어간 게 맞습니다. 다만 나머지 2천만원도 저는 계약을 맞추기 위한 정리금처럼 이해했습니다.",
      "behaviorHint": "증거를 보고 시선을 피했다가 다시 맞추며 문장을 고쳐 말한다."
    },
    {
      "id": "tenant09:transition:a:d-1:s2_s3",
      "caseId": "tenant-09",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "왜 우석 계좌로 2천만원을 보냈는지 후속 추궁이 이어지는 순간",
      "line": "솔직히 말하면 2천만원이 태윤 사장님 보증금 계좌로 안 들어간다는 건 알고 있었습니다. 우석이 나중에 정리해도 계약서는 남으니 문제 없다고 해서 그 말을 탔습니다.",
      "behaviorHint": "짧게 버티다가 핵심 단어를 스스로 다시 꺼낸다."
    },
    {
      "id": "tenant09:transition:a:d-1:s3_s5",
      "caseId": "tenant-09",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "초안 6천만원과 최종본 8천만원이 함께 제시되는 순간",
      "line": "네, 태윤 사장님이 실제로 받은 보증금은 6천만원뿐이었습니다. 저는 그걸 알면서도 우석과 만든 2천만원 구조를 숨긴 채 계약서상 8천만원 전체를 제 기준으로 붙잡고 있었습니다.",
      "behaviorHint": "증거를 보고 시선을 피했다가 다시 맞추며 문장을 고쳐 말한다."
    },
    {
      "id": "tenant09:transition:a:d-2:s0_s1",
      "caseId": "tenant-09",
      "party": "a",
      "disputeId": "d-2",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "세라와 우석의 공모 여부를 정면으로 묻는 순간",
      "line": "정책자금 상담 때문에 계약서 숫자를 크게 두면 편하다는 얘기는 들었습니다. 하지만 그걸 바로 공모라고 묶는 건 다릅니다.",
      "behaviorHint": "짧게 버티다가 핵심 단어를 스스로 다시 꺼낸다."
    },
    {
      "id": "tenant09:transition:a:d-2:s1_s2",
      "caseId": "tenant-09",
      "party": "a",
      "disputeId": "d-2",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "카카오톡과 음성메모가 제시되는 순간",
      "line": "카카오톡에 큰 보증금 숫자가 정책자금에 낫다는 취지의 대화가 있는 건 맞습니다. 다만 저는 그때도 2천만원이 결국 정리비처럼 처리될 거라고만 생각했습니다.",
      "behaviorHint": "증거를 보고 시선을 피했다가 다시 맞추며 문장을 고쳐 말한다."
    },
    {
      "id": "tenant09:transition:a:d-2:s2_s3",
      "caseId": "tenant-09",
      "party": "a",
      "disputeId": "d-2",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "정책자금·가족 투자 동기를 후속 질문으로 찌르는 순간",
      "line": "네, 우석 씨와 저는 8천만원 숫자가 남아 있으면 서로 편해진다는 걸 알고 있었습니다. 저는 가족 투자금 설명과 정책자금 상담 때문에, 우석은 2천만원을 별도 수익으로 처리할 수 있어서 그 구조를 밀었습니다.",
      "behaviorHint": "짧게 버티다가 핵심 단어를 스스로 다시 꺼낸다."
    },
    {
      "id": "tenant09:transition:a:d-2:s3_s5",
      "caseId": "tenant-09",
      "party": "a",
      "disputeId": "d-2",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "회계전표와 컨설팅비 세금계산서가 제시되는 순간",
      "line": "맞습니다. 저는 우석과 상의해 실제보다 큰 8천만원 계약을 유지했고, 2천만원이 허위 정리비와 컨설팅비 명목으로 빠져나가는 구조를 알고도 이용했습니다. 그건 정책자금 상담과 이후 협상에 유리하다고 봤기 때문입니다.",
      "behaviorHint": "증거를 보고 시선을 피했다가 다시 맞추며 문장을 고쳐 말한다."
    },
    {
      "id": "tenant09:transition:a:d-4:s0_s1",
      "caseId": "tenant-09",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "마지막 월세 일부와 간판 철거비를 직접 묻는 순간",
      "line": "정확히는 폐업 정리 막바지라 며칠 밀린 항목이 있었습니다. 그래도 바로 메우려고 했고, 태윤 사장님이 말하는 식의 큰 체납은 아니었습니다.",
      "behaviorHint": "짧게 버티다가 핵심 단어를 스스로 다시 꺼낸다."
    },
    {
      "id": "tenant09:transition:a:d-4:s1_s2",
      "caseId": "tenant-09",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "정산표와 계좌기록이 나란히 제시되는 순간",
      "line": "네, 마지막 월세 일부는 약정일보다 9일 늦게 냈습니다. 간판 철거비도 명도 뒤에 정산됐습니다. 다만 규모가 크진 않았습니다.",
      "behaviorHint": "증거를 보고 시선을 피했다가 다시 맞추며 문장을 고쳐 말한다."
    },
    {
      "id": "tenant09:transition:a:d-4:s2_s4",
      "caseId": "tenant-09",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S2",
      "toState": "S4",
      "trigger": "폐업 압박을 비난 없이 묻는 공감 질문이 들어오는 순간",
      "line": "폐업 직전에 통장에 남는 돈이 거의 없었습니다. 그래서 마지막 월세 일부와 간판 철거비를 바로 못 끝냈고, 그걸 인정하는 게 너무 창피해서 계속 '거의 정리됐다'고 말했습니다.",
      "behaviorHint": "방어 자세가 조금 풀리며 한숨 뒤에 속내가 새어 나온다."
    },
    {
      "id": "tenant09:transition:a:d-4:s4_s5",
      "caseId": "tenant-09",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S4",
      "toState": "S5",
      "trigger": "간판 철거비 정산 시점을 구체적으로 되묻는 순간",
      "line": "맞습니다. 마지막 월세 일부는 9일 늦었고, 외부 간판 철거비도 명도 뒤에야 정산했습니다. 금액은 제한적이었지만 실제 미정산이 있었고, 저는 그걸 체면 때문에 축소했습니다.",
      "behaviorHint": "짧게 버티다가 핵심 단어를 스스로 다시 꺼낸다."
    },
    {
      "id": "tenant09:transition:b:d-5:s0_s1",
      "caseId": "tenant-09",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "최종 계약서 확인 여부를 직접 묻는 순간",
      "line": "6천만원으로 다시 맞춰 달라고는 분명히 말했습니다. 그래서 우석이가 정리한 최종본도 그렇게 돼 있을 거라고 믿었습니다.",
      "behaviorHint": "짧게 버티다가 핵심 단어를 스스로 다시 꺼낸다."
    },
    {
      "id": "tenant09:transition:b:d-5:s1_s2",
      "caseId": "tenant-09",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "초안 6천만원과 최종본 8천만원이 함께 제시되는 순간",
      "line": "초안이 6천만원이었다는 건 압니다. 그런데 최종 스캔본이 8천만원으로 올라간 걸 저는 그 자리에서 직접 못 봤습니다. 아니, 안 봤다고 해야 맞겠네요.",
      "behaviorHint": "증거를 보고 시선을 피했다가 다시 맞추며 문장을 고쳐 말한다."
    },
    {
      "id": "tenant09:transition:b:d-5:s2_s4",
      "caseId": "tenant-09",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S2",
      "toState": "S4",
      "trigger": "바쁜 서명일 상황을 비난 없이 설명해 보라고 묻는 순간",
      "line": "그날은 공실 문의도 겹치고 세금 얘기도 머리에 차 있었어요. 그래서 '6천으로 다시 맞췄다'는 말만 듣고 마지막 종이를 직접 안 봤습니다. 그게 제일 창피합니다.",
      "behaviorHint": "방어 자세가 조금 풀리며 한숨 뒤에 속내가 새어 나온다."
    },
    {
      "id": "tenant09:transition:b:d-5:s4_s5",
      "caseId": "tenant-09",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S4",
      "toState": "S5",
      "trigger": "스캔 로그와 통화요약이 함께 제시되는 순간",
      "line": "맞습니다. 저는 보증금 액수와 실제 입금 내역을 마지막 출력본과 직접 맞춰보지 않은 채 서명과 날인을 넘겼습니다. 그 틈을 우석이 이용해 8천만원 표기를 굳혔고, 제 확인 소홀이 분쟁의 한 축이 됐습니다.",
      "behaviorHint": "증거를 보고 시선을 피했다가 다시 맞추며 문장을 고쳐 말한다."
    },
    {
      "id": "tenant09:transition:b:d-3:s0_s1",
      "caseId": "tenant-09",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "보증금 반환을 왜 늦췄는지 정면으로 묻는 순간",
      "line": "반환이 빨랐다고는 못 하겠지만, 미납 월세와 철거비, 시설 상태를 먼저 정리해야 했습니다. 그 과정에서 금액을 넉넉하게 잡은 건 안전하게 보려던 겁니다.",
      "behaviorHint": "짧게 버티다가 핵심 단어를 스스로 다시 꺼낸다."
    },
    {
      "id": "tenant09:transition:b:d-3:s1_s2",
      "caseId": "tenant-09",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "정산표와 계좌기록이 나란히 제시되는 순간",
      "line": "네, 반환이 명도 뒤 5주를 넘긴 건 맞습니다. 하지만 그때는 미납 월세와 철거비가 실제로 있었고, 저는 공실손실까지 한 번에 잡아야 한다고 생각했습니다.",
      "behaviorHint": "증거를 보고 시선을 피했다가 다시 맞추며 문장을 고쳐 말한다."
    },
    {
      "id": "tenant09:transition:b:d-3:s2_s3",
      "caseId": "tenant-09",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "다투지 않는 6천만원을 왜 먼저 돌려주지 않았는지 후속 추궁하는 순간",
      "line": "지금 돌아보면, 다투지 않는 6천만원 부분은 먼저 떼어 반환할 수도 있었습니다. 저는 제가 더 손해 봤다는 마음에 공실손실과 세척비를 너무 넓게 걸었습니다.",
      "behaviorHint": "짧게 버티다가 핵심 단어를 스스로 다시 꺼낸다."
    },
    {
      "id": "tenant09:transition:b:d-3:s3_s5",
      "caseId": "tenant-09",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "실제 미정산과 과장 공제를 분리해 공동 책임을 묻는 순간",
      "line": "맞습니다. 실제 미정산 항목은 있었지만, 저는 다투지 않는 6천만원 부분도 바로 나누어 돌려주지 않았고 반환을 5주 넘게 끌었습니다. 공실손실과 에어컨 세척비도 근거보다 넓게 잡았습니다.",
      "behaviorHint": "짧게 버티다가 핵심 단어를 스스로 다시 꺼낸다."
    },
    {
      "id": "tenant09:transition:b:d-1:s0_s1",
      "caseId": "tenant-09",
      "party": "b",
      "disputeId": "d-1",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "계약서 8천만원과 실수령액 차이를 직접 묻는 순간",
      "line": "제 계좌에 먼저 들어온 건 6천만원이 맞습니다. 하지만 우석이가 나머지도 정리된다고 해서 전체 구조가 8천으로 맞는 줄 알았습니다.",
      "behaviorHint": "짧게 버티다가 핵심 단어를 스스로 다시 꺼낸다."
    },
    {
      "id": "tenant09:transition:b:d-1:s1_s2",
      "caseId": "tenant-09",
      "party": "b",
      "disputeId": "d-1",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "초안 6천만원과 최종본 8천만원이 함께 제시되는 순간",
      "line": "네, 제 계좌로 실제 받은 돈은 6천만원뿐이었습니다. 다만 그때는 우석이가 나머지 2천만원도 계약 정리 안에서 움직인다고 해서 깊게 따지지 못했습니다.",
      "behaviorHint": "증거를 보고 시선을 피했다가 다시 맞추며 문장을 고쳐 말한다."
    },
    {
      "id": "tenant09:transition:b:d-1:s2_s3",
      "caseId": "tenant-09",
      "party": "b",
      "disputeId": "d-1",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "최종본 업로드 시각과 확인 누락을 이어서 추궁하는 순간",
      "line": "솔직히 말하면 저는 6천만원만 받은 상태에서 서류가 8천만원으로 굳는 걸 막지 못했습니다. 우석이가 정리해 준다고 하니 그대로 믿고 넘긴 제 책임도 있습니다.",
      "behaviorHint": "짧게 버티다가 핵심 단어를 스스로 다시 꺼낸다."
    },
    {
      "id": "tenant09:transition:b:d-1:s3_s5",
      "caseId": "tenant-09",
      "party": "b",
      "disputeId": "d-1",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "우석 탓을 제외하고 본인 책임 범위를 답하라고 묻는 순간",
      "line": "맞습니다. 제가 실제로 받은 보증금은 6천만원뿐이었습니다. 나머지 2천만원이 우석 쪽으로 빠진 걸 제대로 확인하지 않은 채 계약서 8천만원 문구를 방치했고, 그 모순을 뒤늦게 제 방패로도 썼습니다.",
      "behaviorHint": "짧게 버티다가 핵심 단어를 스스로 다시 꺼낸다."
    }
  ]
}

