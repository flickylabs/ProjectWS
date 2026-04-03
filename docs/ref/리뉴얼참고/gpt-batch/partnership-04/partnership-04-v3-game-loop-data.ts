export const partnership04V3GameLoopData = {
  "caseId": "partnership-04",
  "dossierCards": [
    {
      "id": "dossier-1",
      "name": "원본 흐름과 과거 은폐 대조",
      "description": "주말 이체의 실제 귀속과 2년 전 리베이트 기록을 한 번에 붙여, 현재 의심과 과거 불신이 어떻게 결합됐는지 검증한다.",
      "evidenceIds": [
        "e-1",
        "e-2"
      ],
      "relatedDisputes": [
        "d-2",
        "d-3",
        "d-5"
      ],
      "subjectParty": "both",
      "challenges": [
        {
          "targetParty": "a",
          "questions": [
            {
              "id": "dossier-1.a.q1",
              "text": "오민재 씨, 친구 회사 계약과 정산 메모를 보면 단순 예외 운영보다 비공개 정산이 먼저 보입니다. 그 누락을 언제부터 의도적으로 유지했습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "partnership-04:a:d-2:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q2",
              "text": "그 정산의 실질 수혜자와 특수관계를 숨긴 이유가 운영 편의였습니까, 아니면 체면 보존이었습니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "partnership-04:a:d-2:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q3",
              "text": "원본 이체확인서상 수취계좌가 정산용 계좌라면, 당신은 왜 처음부터 '외부 유출이 아니다'를 구조 설명으로 못 바꾸고 방어 문장으로만 말했습니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "partnership-04:a:d-3:unlock:s2:0",
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
              "text": "김라희 씨, 당신은 세 줄 이체를 세 건 외부유출로 읽었습니다. 그 단정이 원본보다 인상에 먼저 기대고 있었다는 점을 인정합니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "partnership-04:b:d-3:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q2",
              "text": "과거 리베이트 메모를 지금 협상 테이블에 올린 순간, 현재 자료의 약점을 과거 배신 서사로 보강하려 한 것 아닙니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "partnership-04:b:d-2:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q3",
              "text": "원본 자료가 정산용 계좌 귀속을 가리키는데도 큰 손실 숫자를 먼저 붙잡은 이유는, 재무 책임자로서 오판을 되돌리기 싫었기 때문 아닙니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "partnership-04:b:d-5:unlock:s2:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-2",
      "name": "캡처의 출처와 편집 흔적",
      "description": "은행 도장처럼 보이게 만든 PDF 캡처와 실제 편집 로그를 대조해, 누가 무엇을 알고 있었는지 파고든다.",
      "evidenceIds": [
        "e-3",
        "e-4"
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
              "id": "dossier-2.a.q1",
              "text": "오민재 씨, 메타데이터상 은행 발급 PDF가 아니라는 흔적을 본 뒤에도, 당신은 왜 원본 대조 절차보다 방어 문구를 먼저 세웠습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "partnership-04:a:d-1:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q2",
              "text": "그 캡처를 보는 순간 과거 사건이 덮쳐 와 당신 판단도 거칠어졌던 것 아닙니까? 현재 쟁점과 과거 상처를 정말 분리하고 있었습니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "partnership-04:a:d-1:unlock:s4:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q3",
              "text": "편집본이 개인 유용 서사와 겹치자, 당신도 숫자 설명보다 '횡령 아님' 방어를 먼저 세운 것 아닙니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "partnership-04:a:d-3:unlock:s3:0",
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
              "text": "김라희 씨, 이 PDF가 은행 발급본이 아니라 팀 폴더 스프레드시트 산출물이라는 점, 제출 시점에 이미 알고 있었습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "partnership-04:b:d-1:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q2",
              "text": "원본 요청 뒤에도 같은 PDF를 다시 보낸 이유가 정말 '정리본'이어서였습니까, 아니면 협상 압박을 유지하기 위해서였습니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "partnership-04:b:d-1:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q3",
              "text": "직인 이미지까지 삽입된 편집본을 계속 들고 간 행위는, 결국 원본처럼 보이게 하려는 선택이었다고 봐야 하지 않겠습니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "partnership-04:b:d-1:unlock:s5:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-3",
      "name": "원본 요청 메일과 표기 규칙 복구",
      "description": "조정인 메일과 은행 마이그레이션 설명서를 함께 대조해, 과거 사건 재소환과 손실 착시가 어떻게 협상 전술이 되었는지 밝힌다.",
      "evidenceIds": [
        "e-5",
        "e-6"
      ],
      "relatedDisputes": [
        "d-1",
        "d-2",
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
              "text": "오민재 씨, 조정인 메일이 과거 사건과 현재 협상을 분리하라고 요구했는데도, 당신은 왜 계속 '이미 정리된 건'이라는 문장으로만 막았습니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "partnership-04:a:d-4:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q2",
              "text": "은행 설명서가 분리 표기를 풀어 주는데도, 당신은 왜 그 구조를 더 일찍 설명하지 못해 손실 오해를 방치했습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "partnership-04:a:d-5:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q3",
              "text": "이제 과거 리베이트 자료와 조정인 메일까지 모두 나온 상태입니다. 당신의 과거 은폐가 지금 방어 말투까지 오염시켰다는 점을 인정합니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "partnership-04:a:d-2:unlock:s5:0",
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
              "text": "김라희 씨, 조정인에게 '정리본이지만 흐름은 같다'고 회신한 뒤에도 그 자료를 유지한 건, 결국 현재 협상 압박을 놓지 않으려는 선택이었죠?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "partnership-04:b:d-1:unlock:s4:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q2",
              "text": "은행 마이그레이션 설명서가 분리 표기 구조를 밝히는데도 세 건 유출 서사를 계속 붙든 건, 사실 확인보다 감정이 앞섰기 때문 아닙니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "partnership-04:b:d-3:unlock:s4:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q3",
              "text": "지금 이 자료 묶음을 보고도, 과거 배신 사건을 현재 협상 압박 카드로 다시 썼다는 사실을 부정하시겠습니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "partnership-04:b:d-4:unlock:s5:0",
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
            "id": "partnership-04:a:d-1:unlock:s2:0",
            "factText": "오민재가 편집본 사용 자체는 라희 책임으로 보되, 그 배경에 자신의 과거 배신이 있다는 점도 안다는 사실",
            "tags": [
              "responsibility",
              "context"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "issue": {
                "exact": "편집 거래내역 PDF",
                "neutral": "그 자료"
              },
              "time": {
                "exact": "해지 협상 기간",
                "period": "해지 협상 당시",
                "neutral": "그 시점"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "partnership-04:a:d-1:unlock:s3:0",
            "factText": "오민재가 현재 조작 사용과 자신의 과거 신뢰 훼손을 완전히 분리하기 어려워한다는 점",
            "tags": [
              "counter",
              "relationship"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "exact": "한지훈",
                "fullName": "한지훈",
                "judgeRef": "조정인",
                "neutral": "그 중재자"
              },
              "context": {
                "exact": "과거 리베이트 불신",
                "neutral": "그 배경"
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
            "id": "partnership-04:a:d-1:unlock:s4:0",
            "factText": "오민재가 다시 횡령자로 찍힐지 모른다는 공포 때문에 편집본에 과민 반응했다는 점",
            "tags": [
              "emotion",
              "fear"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "context": {
                "exact": "과거 리베이트 불신",
                "neutral": "그 배경"
              },
              "time": {
                "exact": "해지 협상 기간",
                "period": "해지 협상 당시",
                "neutral": "그 시점"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "partnership-04:a:d-1:unlock:s5:0",
            "factText": "오민재가 현재 판단은 원본 은행자료와 메일 원본으로 다시 해야 한다고 받아들인 사실",
            "tags": [
              "institution",
              "rule"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "issue": {
                "exact": "편집 거래내역 PDF",
                "neutral": "그 자료"
              },
              "context": {
                "exact": "과거 리베이트 불신",
                "neutral": "그 배경"
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
            "id": "partnership-04:a:d-2:unlock:s2:0",
            "factText": "오민재가 외주 리베이트 정산을 투명하게 공유하지 않은 것이 사실상 은폐였음을 인정하기 시작한 점",
            "tags": [
              "act",
              "context"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "issue": {
                "exact": "2024년 외주 리베이트 정산",
                "neutral": "그 과거 정산"
              },
              "time": {
                "exact": "2024년 8월~9월",
                "period": "2년 전",
                "neutral": "그때"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "partnership-04:a:d-2:unlock:s3:0",
            "factText": "오민재가 일정 압박을 내세워 자신의 은폐 책임 비율을 낮추려 했다는 점",
            "tags": [
              "motive",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "exact": "친구 회사",
                "neutral": "그 외부 업체"
              },
              "context": {
                "exact": "일정 압박과 품질 이슈",
                "neutral": "당시 배경"
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
            "id": "partnership-04:a:d-2:unlock:s4:0",
            "factText": "오민재가 기술책임자인 동시에 배신자로 기록될까 두려워 과거 사건을 축소해 왔다는 점",
            "tags": [
              "emotion",
              "fear"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "context": {
                "exact": "일정 압박과 품질 이슈",
                "neutral": "당시 배경"
              },
              "time": {
                "exact": "2024년 8월~9월",
                "period": "2년 전",
                "neutral": "그때"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "partnership-04:a:d-2:unlock:s5:0",
            "factText": "오민재가 친구 회사 외주 리베이트성 정산을 숨겼고 그 사실이 현재 불신의 출발점이 됐다는 사실",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "issue": {
                "exact": "2024년 외주 리베이트 정산",
                "neutral": "그 과거 정산"
              },
              "context": {
                "exact": "일정 압박과 품질 이슈",
                "neutral": "당시 배경"
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
            "id": "partnership-04:a:d-3:unlock:s2:0",
            "factText": "오민재가 주말 세 줄 이체를 둘러싼 표기 혼란 자체는 인정하기 시작한 점",
            "tags": [
              "act",
              "institution"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "issue": {
                "exact": "주말 세 줄 이체",
                "neutral": "그 이체 묶음"
              },
              "time": {
                "exact": "주말 심야",
                "period": "문제 주말",
                "neutral": "그 시점"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "partnership-04:a:d-3:unlock:s3:0",
            "factText": "오민재가 라희의 과거 투사 탓을 하면서도 숫자 나열로 본질 질문을 피했다는 점",
            "tags": [
              "counter",
              "context"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "exact": "정산용 계좌",
                "neutral": "그 계좌"
              },
              "context": {
                "exact": "해지 정산용 이동",
                "neutral": "그 정산 흐름"
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
            "id": "partnership-04:a:d-3:unlock:s4:0",
            "factText": "오민재가 또 같은 배신자로 보일까 두려워 즉시 설명보다 자기방어에 매달렸다는 점",
            "tags": [
              "emotion",
              "fear"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "context": {
                "exact": "해지 정산용 이동",
                "neutral": "그 정산 흐름"
              },
              "time": {
                "exact": "주말 심야",
                "period": "문제 주말",
                "neutral": "그 시점"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "partnership-04:a:d-3:unlock:s5:0",
            "factText": "오민재가 세 줄 이체가 환급보증금과 퇴직충당금 이동의 분리 표기였음을 받아들인 사실",
            "tags": [
              "admission",
              "beneficiary"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "issue": {
                "exact": "주말 세 줄 이체",
                "neutral": "그 이체 묶음"
              },
              "context": {
                "exact": "해지 정산용 이동",
                "neutral": "그 정산 흐름"
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
            "id": "partnership-04:a:d-4:unlock:s2:0",
            "factText": "오민재가 과거 배신 사건을 완전히 떼어놓지 못한 채 자신에게 불리한 대목을 축소했다는 점",
            "tags": [
              "act",
              "self_justification"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "issue": {
                "exact": "과거 리베이트 배신 사건",
                "neutral": "그 과거 사건"
              },
              "time": {
                "exact": "2년 전",
                "period": "당시",
                "neutral": "그때"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "partnership-04:a:d-4:unlock:s3:0",
            "factText": "오민재가 봉합 사실을 방패로 삼아 현재 협상에서 평판 손상을 줄이려 했다는 점",
            "tags": [
              "motive",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "exact": "김라희",
                "fullName": "김라희",
                "judgeRef": "상대 대표",
                "neutral": "상대방"
              },
              "context": {
                "exact": "커리어 보존",
                "neutral": "그 방어 이유"
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
            "id": "partnership-04:a:d-4:unlock:s4:0",
            "factText": "오민재가 그 사건이 다시 자신의 이름표가 될까 두려워 '이미 정리된 건'이라고 반복했다는 점",
            "tags": [
              "emotion",
              "fear"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "context": {
                "exact": "커리어 보존",
                "neutral": "그 방어 이유"
              },
              "time": {
                "exact": "2년 전",
                "period": "당시",
                "neutral": "그때"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "partnership-04:a:d-4:unlock:s5:0",
            "factText": "오민재가 과거 배신 사건을 축소하면서도 현재 협상에서 방어 카드로 관리했다는 사실",
            "tags": [
              "admission",
              "motive"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "issue": {
                "exact": "과거 리베이트 배신 사건",
                "neutral": "그 과거 사건"
              },
              "context": {
                "exact": "커리어 보존",
                "neutral": "그 방어 이유"
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
            "id": "partnership-04:a:d-5:unlock:s2:0",
            "factText": "오민재가 분리 표기와 수취인 별칭 축약이 손실 숫자를 키웠을 수 있다고 보기 시작한 점",
            "tags": [
              "institution",
              "beneficiary"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "issue": {
                "exact": "1,240만원 겉보기 손실",
                "rounded": "약 1,200만원 손실",
                "neutral": "그 손실 숫자"
              },
              "time": {
                "exact": "시스템 전환 직후",
                "period": "문제 거래 직전",
                "neutral": "그 무렵"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "partnership-04:a:d-5:unlock:s3:0",
            "factText": "오민재가 숫자 복구보다 자기방어를 먼저 택해 오해를 길게 끌었다는 점",
            "tags": [
              "responsibility",
              "counter"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "exact": "문세정",
                "fullName": "문세정",
                "judgeRef": "은행 담당자",
                "neutral": "그 은행 담당자"
              },
              "context": {
                "exact": "분리 표기와 별칭 축약",
                "neutral": "그 표시 변화"
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
            "id": "partnership-04:a:d-5:unlock:s4:0",
            "factText": "오민재가 숫자 설명을 늦춘 책임을 자책하기 시작한 점",
            "tags": [
              "emotion",
              "shame"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "context": {
                "exact": "분리 표기와 별칭 축약",
                "neutral": "그 표시 변화"
              },
              "time": {
                "exact": "시스템 전환 직후",
                "period": "문제 거래 직전",
                "neutral": "그 무렵"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "partnership-04:a:d-5:unlock:s5:0",
            "factText": "오민재가 은행 표시 방식 변화가 실제보다 1,240만원 큰 손실 착시를 만들었다고 받아들인 사실",
            "tags": [
              "evidence",
              "institution"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "issue": {
                "exact": "1,240만원 겉보기 손실",
                "rounded": "약 1,200만원 손실",
                "neutral": "그 손실 숫자"
              },
              "context": {
                "exact": "분리 표기와 별칭 축약",
                "neutral": "그 표시 변화"
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
            "id": "partnership-04:b:d-1:unlock:s2:0",
            "factText": "김라희가 편집본의 형식 문제를 알면서도 '실질은 같다'는 논리로 버텼다는 점",
            "tags": [
              "act",
              "context"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "issue": {
                "exact": "편집 거래내역 PDF",
                "neutral": "그 정리본"
              },
              "time": {
                "exact": "해지 협상 기간",
                "period": "해지 협상 당시",
                "neutral": "그 시점"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "partnership-04:b:d-1:unlock:s3:0",
            "factText": "김라희가 과거 배신 기억을 현재 편집본 사용의 방패로 세웠다는 점",
            "tags": [
              "motive",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "exact": "한지훈",
                "fullName": "한지훈",
                "judgeRef": "조정인",
                "neutral": "그 중재자"
              },
              "context": {
                "exact": "또 속지 않겠다는 불안",
                "neutral": "그 불안"
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
            "id": "partnership-04:b:d-1:unlock:s4:0",
            "factText": "김라희가 또 놓치면 재무 책임자로 낙인찍힐까 두려워 원본 검증보다 선제 압박에 매달렸다는 점",
            "tags": [
              "emotion",
              "fear"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "context": {
                "exact": "또 속지 않겠다는 불안",
                "neutral": "그 불안"
              },
              "time": {
                "exact": "해지 협상 기간",
                "period": "해지 협상 당시",
                "neutral": "그 시점"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "partnership-04:b:d-1:unlock:s5:0",
            "factText": "김라희가 편집본이라는 사실을 인지한 채 협상 자료로 지속 사용했다는 사실",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "issue": {
                "exact": "편집 거래내역 PDF",
                "neutral": "그 정리본"
              },
              "context": {
                "exact": "또 속지 않겠다는 불안",
                "neutral": "그 불안"
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
            "id": "partnership-04:b:d-2:unlock:s2:0",
            "factText": "김라희가 과거 배신 사실을 현재 협상 프레임에 다시 올린 선택을 인정하는 점",
            "tags": [
              "responsibility",
              "context"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "issue": {
                "exact": "외주 리베이트 은폐",
                "neutral": "그 과거 사건"
              },
              "time": {
                "exact": "2년 전",
                "period": "2024년",
                "neutral": "그때"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "partnership-04:b:d-2:unlock:s3:0",
            "factText": "김라희가 도덕적 우위를 얻기 위해 과거 사건을 길게 소환했다는 점",
            "tags": [
              "counter",
              "relationship"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "exact": "친구 회사",
                "neutral": "그 업체"
              },
              "context": {
                "exact": "현재 불신의 배경",
                "neutral": "그 배경"
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
            "id": "partnership-04:b:d-2:unlock:s4:0",
            "factText": "김라희가 아직도 당시 배신감을 현재형으로 끌고 온다는 점",
            "tags": [
              "emotion",
              "fear"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "context": {
                "exact": "현재 불신의 배경",
                "neutral": "그 배경"
              },
              "time": {
                "exact": "2년 전",
                "period": "2024년",
                "neutral": "그때"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "partnership-04:b:d-2:unlock:s5:0",
            "factText": "김라희가 과거 사실과 현재 증거 검증을 분리해야 한다는 선을 받아들인 사실",
            "tags": [
              "institution",
              "rule"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "issue": {
                "exact": "외주 리베이트 은폐",
                "neutral": "그 과거 사건"
              },
              "context": {
                "exact": "현재 불신의 배경",
                "neutral": "그 배경"
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
            "id": "partnership-04:b:d-3:unlock:s2:0",
            "factText": "김라희가 캡처와 주말 심야라는 인상에 기대어 외부유출 서사를 굳혔다는 점",
            "tags": [
              "act",
              "context"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "issue": {
                "exact": "주말 세 줄 이체",
                "neutral": "그 이체 묶음"
              },
              "time": {
                "exact": "주말 심야",
                "period": "문제 주말",
                "neutral": "그 시점"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "partnership-04:b:d-3:unlock:s3:0",
            "factText": "김라희가 민재의 과거 전력을 현재 해석의 가속 장치로 사용했다는 점",
            "tags": [
              "motive",
              "counter"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "exact": "오민재",
                "fullName": "오민재",
                "judgeRef": "상대 대표",
                "neutral": "상대방"
              },
              "context": {
                "exact": "반복 배신 서사",
                "neutral": "그 서사"
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
            "id": "partnership-04:b:d-3:unlock:s4:0",
            "factText": "김라희가 이번엔 반드시 잡아내야 한다는 감정이 사실 확인보다 앞섰다는 점",
            "tags": [
              "emotion",
              "fear"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "context": {
                "exact": "반복 배신 서사",
                "neutral": "그 서사"
              },
              "time": {
                "exact": "주말 심야",
                "period": "문제 주말",
                "neutral": "그 시점"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "partnership-04:b:d-3:unlock:s5:0",
            "factText": "김라희가 세 줄 이체가 분리 표기였고 자신이 그 오해를 정서적으로 밀어붙였음을 인정한 사실",
            "tags": [
              "admission",
              "beneficiary"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "issue": {
                "exact": "주말 세 줄 이체",
                "neutral": "그 이체 묶음"
              },
              "context": {
                "exact": "반복 배신 서사",
                "neutral": "그 서사"
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
            "id": "partnership-04:b:d-4:unlock:s2:0",
            "factText": "김라희가 과거 배신 사건을 현재 협상에서 자기 입장을 세우는 카드로 다시 올렸다는 점",
            "tags": [
              "act",
              "self_justification"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "issue": {
                "exact": "과거 배신 사건 소환",
                "neutral": "그 과거 호출"
              },
              "time": {
                "exact": "해지 협상 기간",
                "period": "현재 협상 과정",
                "neutral": "그 협상 국면"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "partnership-04:b:d-4:unlock:s3:0",
            "factText": "김라희가 부분 봉합 사실을 알면서도 도덕적 우위를 만들기 위해 반복 소환했다는 점",
            "tags": [
              "motive",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "exact": "오민재",
                "fullName": "오민재",
                "judgeRef": "상대 대표",
                "neutral": "상대방"
              },
              "context": {
                "exact": "도덕적 우위",
                "neutral": "그 우위"
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
            "id": "partnership-04:b:d-4:unlock:s4:0",
            "factText": "김라희가 그 사건을 놓아버리면 자신의 예민함을 설명할 언어가 사라질까 두려워한다는 점",
            "tags": [
              "emotion",
              "fear"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "context": {
                "exact": "도덕적 우위",
                "neutral": "그 우위"
              },
              "time": {
                "exact": "해지 협상 기간",
                "period": "현재 협상 과정",
                "neutral": "그 협상 국면"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "partnership-04:b:d-4:unlock:s5:0",
            "factText": "김라희가 과거 배신 사건을 현재 협상 압박 카드로 재사용했다는 사실",
            "tags": [
              "admission",
              "motive"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "issue": {
                "exact": "과거 배신 사건 소환",
                "neutral": "그 과거 호출"
              },
              "context": {
                "exact": "도덕적 우위",
                "neutral": "그 우위"
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
            "id": "partnership-04:b:d-5:unlock:s2:0",
            "factText": "김라희가 별칭 축약과 분리 표기가 손실을 부풀려 보이게 했을 수 있음을 인정하기 시작한 점",
            "tags": [
              "institution",
              "beneficiary"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "issue": {
                "exact": "1,240만원 겉보기 손실",
                "rounded": "약 1,200만원 손실",
                "neutral": "그 손실 숫자"
              },
              "time": {
                "exact": "시스템 전환 직후",
                "period": "문제 거래 직전",
                "neutral": "그 무렵"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "partnership-04:b:d-5:unlock:s3:0",
            "factText": "김라희가 큰 손실 숫자를 먼저 붙잡아 협상 프레임을 키웠다는 점",
            "tags": [
              "responsibility",
              "counter"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "exact": "문세정",
                "fullName": "문세정",
                "judgeRef": "은행 담당자",
                "neutral": "그 은행 담당자"
              },
              "context": {
                "exact": "표기 방식 변화",
                "neutral": "그 표시 변화"
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
            "id": "partnership-04:b:d-5:unlock:s4:0",
            "factText": "김라희가 놓쳤다는 재무 책임자 평가를 두려워해 큰 수치에 집착했다는 점",
            "tags": [
              "emotion",
              "fear"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "context": {
                "exact": "표기 방식 변화",
                "neutral": "그 표시 변화"
              },
              "time": {
                "exact": "시스템 전환 직후",
                "period": "문제 거래 직전",
                "neutral": "그 무렵"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "partnership-04:b:d-5:unlock:s5:0",
            "factText": "김라희가 은행 표시 방식 변화가 실제보다 1,240만원 큰 손실로 보이게 했다고 받아들인 사실",
            "tags": [
              "evidence",
              "institution"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "issue": {
                "exact": "1,240만원 겉보기 손실",
                "rounded": "약 1,200만원 손실",
                "neutral": "그 손실 숫자"
              },
              "context": {
                "exact": "표기 방식 변화",
                "neutral": "그 표시 변화"
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
        "id": "partnership-04:contradiction:0",
        "targetParty": "b",
        "trigger": "김라희가 편집본을 단순 요약본이라고만 주장하면서 원본 요청 이후 재제출 사실을 부인할 때",
        "text": "원본 여부를 묻는 메일을 받은 뒤에도 같은 PDF를 다시 보냈다면, 그 시점부터는 '몰랐다'보다 '알고도 유지했다'가 더 가깝습니다.",
        "relatedDisputes": [
          "d-1"
        ],
        "evidenceIds": [
          "e-4",
          "e-5"
        ]
      },
      {
        "id": "partnership-04:contradiction:1",
        "targetParty": "a",
        "trigger": "오민재가 과거 리베이트 사건을 단순 운영 예외로 축소하면서 시인 기록의 의미를 낮출 때",
        "text": "친구 회사 계약서와 시인 메모가 함께 존재한다면, 단순 예외 운영이라는 설명은 은폐의 핵심을 빼놓은 축약입니다.",
        "relatedDisputes": [
          "d-2",
          "d-4"
        ],
        "evidenceIds": [
          "e-2",
          "e-5"
        ]
      },
      {
        "id": "partnership-04:contradiction:2",
        "targetParty": "b",
        "trigger": "김라희가 주말 세 줄을 여전히 세 건 외부유출로 단정할 때",
        "text": "은행 원본과 표기 설명서를 같이 보면, 세 줄은 세 건 유출이 아니라 분리 표기입니다. 단정이 유지될수록 오해를 유지한 책임이 커집니다.",
        "relatedDisputes": [
          "d-3",
          "d-5"
        ],
        "evidenceIds": [
          "e-1",
          "e-6"
        ]
      },
      {
        "id": "partnership-04:contradiction:3",
        "targetParty": "a",
        "trigger": "오민재가 현재 쟁점은 과거와 무관하다고만 선을 그으면서 자신의 방어 심리를 부인할 때",
        "text": "과거 배신이 현재 판단을 대신해선 안 되지만, 그 과거가 지금 말투와 방어 반응을 오염시켰다는 점까지 지워지진 않습니다.",
        "relatedDisputes": [
          "d-1",
          "d-2",
          "d-4"
        ],
        "evidenceIds": [
          "e-2",
          "e-5"
        ]
      }
    ],
    "interjections": [
      {
        "id": "partnership-04:interjection:0",
        "speaker": "b",
        "trigger": "오민재가 숫자 구조만 길게 설명하며 감정 배경을 잘라낼 때",
        "text": "숫자만 나열하면 제가 왜 그 문서에 매달렸는지는 또 지워지잖아요.",
        "relatedDisputes": [
          "d-1",
          "d-3"
        ]
      },
      {
        "id": "partnership-04:interjection:1",
        "speaker": "a",
        "trigger": "김라희가 현재 질문마다 과거 배신 사례를 길게 쌓아올릴 때",
        "text": "지금 묻는 건 이번 자료의 진위지, 2년 전 감정의 길이가 아닙니다.",
        "relatedDisputes": [
          "d-2",
          "d-4"
        ]
      },
      {
        "id": "partnership-04:interjection:2",
        "speaker": "judge",
        "trigger": "두 사람이 과거 배신과 현재 자료를 뒤섞어 반복적으로 말할 때",
        "text": "과거 사실과 현재 증거를 분리해 답하십시오. 같은 분노가 같은 사실을 뜻하는 것은 아닙니다.",
        "relatedDisputes": [
          "d-1",
          "d-2",
          "d-3",
          "d-4"
        ]
      }
    ],
    "emotionalOutbursts": [
      {
        "id": "partnership-04:outburst:a:0",
        "party": "a",
        "trigger": "편집본 PDF가 원본처럼 반복 제시되며 오민재에게 횡령 프레임이 씌워질 때",
        "text": "그 캡처 한 장으로 저를 또 돈 빼돌린 사람으로 만들지 마십시오. 이번 건까지 그때랑 똑같다고 몰면 저는 설명할 언어가 없어집니다.",
        "relatedDisputes": [
          "d-1",
          "d-3"
        ]
      },
      {
        "id": "partnership-04:outburst:a:1",
        "party": "a",
        "trigger": "과거 리베이트 사건이 현재 해지 협상 전체를 규정하는 낙인처럼 호출될 때",
        "text": "제가 그때 잘못한 건 맞지만, 그 한 사건으로 지금의 모든 숫자를 재판하면 저는 영원히 같은 문장으로만 남습니다.",
        "relatedDisputes": [
          "d-2",
          "d-4"
        ]
      },
      {
        "id": "partnership-04:outburst:b:0",
        "party": "b",
        "trigger": "김라희가 편집본 사용을 추궁받으며 또 과잉반응자로 몰린다고 느낄 때",
        "text": "저는 또 놓친 사람으로 남고 싶지 않았어요. 그래서 더 세게 붙들었고, 그게 잘못이더라도 그 공포까지 없던 일은 아니에요.",
        "relatedDisputes": [
          "d-1",
          "d-5"
        ]
      },
      {
        "id": "partnership-04:outburst:b:1",
        "party": "b",
        "trigger": "주말 세 줄 오인이 무너지며 복수심이 드러나는 순간",
        "text": "네, 이번엔 반드시 잡아내고 싶었어요. 그 마음이 사실보다 앞섰다는 말까지는 이제 피하지 않겠습니다.",
        "relatedDisputes": [
          "d-3",
          "d-4"
        ]
      }
    ]
  },
  "transitionBeats": [
    {
      "id": "partnership-04:transition:a:d-2:s0_s1",
      "caseId": "partnership-04",
      "party": "a",
      "disputeId": "d-2",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "past_rebate_question",
      "line": "친구 회사가 끼어 있었던 건 맞지만 리베이트라고 단정할 정도로 단순한 건 아니었습니다.",
      "behaviorHint": "자료를 내려다본 채 표현 범위를 좁혀 답한다."
    },
    {
      "id": "partnership-04:transition:a:d-2:s1_s2",
      "caseId": "partnership-04",
      "party": "a",
      "disputeId": "d-2",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-2_presented",
      "line": "일부 정산을 투명하게 공유하지 않은 건 인정합니다.",
      "behaviorHint": "짧게 숨을 고르고 처음으로 일부 사실을 인정한다."
    },
    {
      "id": "partnership-04:transition:a:d-2:s2_s3",
      "caseId": "partnership-04",
      "party": "a",
      "disputeId": "d-2",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "friend_company_followup",
      "line": "제가 숨긴 부분은 분명 있지만 당시 일정 압박과 품질 이슈도 함께 봐야 합니다.",
      "behaviorHint": "어조를 건조하게 유지한 채 배경 설명을 길게 붙인다."
    },
    {
      "id": "partnership-04:transition:a:d-2:s3_s5",
      "caseId": "partnership-04",
      "party": "a",
      "disputeId": "d-2",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-5_or_responsibility_question",
      "line": "저는 2년 전 친구 회사 외주 리베이트성 정산을 숨겼고, 그게 지금 불신의 출발점이 됐습니다.",
      "behaviorHint": "시선을 떨군 채 핵심 사실을 짧고 직접적으로 말한다."
    },
    {
      "id": "partnership-04:transition:a:d-3:s0_s1",
      "caseId": "partnership-04",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "weekend_transfer_question",
      "line": "정확한 귀속은 다시 봐야 해도 외부로 빼돌린 세 건이라는 해석은 과합니다.",
      "behaviorHint": "자료를 내려다본 채 표현 범위를 좁혀 답한다."
    },
    {
      "id": "partnership-04:transition:a:d-3:s1_s2",
      "caseId": "partnership-04",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-3_presented",
      "line": "표기 방식이 사람을 헷갈리게 만든 건 인정합니다.",
      "behaviorHint": "짧게 숨을 고르고 처음으로 일부 사실을 인정한다."
    },
    {
      "id": "partnership-04:transition:a:d-3:s2_s4",
      "caseId": "partnership-04",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S2",
      "toState": "S4",
      "trigger": "nonjudgmental_question_about_settlement_reserve",
      "line": "저도 즉시 설명을 못 해서 의심을 키웠고, 제 이름에 또 횡령 꼬리표가 붙을까 방어적으로 굴었습니다.",
      "behaviorHint": "침묵이 길어지고 방어적 표정 사이로 감정이 새어 나온다."
    },
    {
      "id": "partnership-04:transition:a:d-3:s4_s5",
      "caseId": "partnership-04",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S4",
      "toState": "S5",
      "trigger": "e-1_or_e-6_presented",
      "line": "주말 세 줄은 외부유출 세 건이 아니라 해지 정산용 이동의 분리 표기였습니다.",
      "behaviorHint": "시선을 떨군 채 핵심 사실을 짧고 직접적으로 말한다."
    },
    {
      "id": "partnership-04:transition:a:d-4:s0_s1",
      "caseId": "partnership-04",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "past_incident_reuse_question",
      "line": "완전히 별개라기보다 신뢰 이력 정도지만, 지금 쟁점을 대신할 정도는 아닙니다.",
      "behaviorHint": "자료를 내려다본 채 표현 범위를 좁혀 답한다."
    },
    {
      "id": "partnership-04:transition:a:d-4:s1_s2",
      "caseId": "partnership-04",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-5_presented",
      "line": "저도 제게 불리한 과거를 작게 말하면서 협상에서는 선을 그으려 했습니다.",
      "behaviorHint": "짧게 숨을 고르고 처음으로 일부 사실을 인정한다."
    },
    {
      "id": "partnership-04:transition:a:d-4:s2_s3",
      "caseId": "partnership-04",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "partial_settlement_question",
      "line": "이미 일부 봉합된 사건이라는 걸 알면서도 제 커리어를 지키려 경계를 세웠습니다.",
      "behaviorHint": "어조를 건조하게 유지한 채 배경 설명을 길게 붙인다."
    },
    {
      "id": "partnership-04:transition:a:d-4:s3_s5",
      "caseId": "partnership-04",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "shared_responsibility_question",
      "line": "저는 과거 배신 사건을 축소하면서도 현재 협상에서 제게 유리한 방식으로 관리했습니다.",
      "behaviorHint": "시선을 떨군 채 핵심 사실을 짧고 직접적으로 말한다."
    },
    {
      "id": "partnership-04:transition:b:d-1:s0_s1",
      "caseId": "partnership-04",
      "party": "b",
      "disputeId": "d-1",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "bank_pdf_origin_question",
      "line": "표현이 거칠었을 수는 있어도 그 자료를 낸 이유는 다시 속지 않으려는 확인이었습니다.",
      "behaviorHint": "되묻듯 말하다가 표현을 조금 누그러뜨린다."
    },
    {
      "id": "partnership-04:transition:b:d-1:s1_s2",
      "caseId": "partnership-04",
      "party": "b",
      "disputeId": "d-1",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-3_presented",
      "line": "편집본이라는 형식 문제는 인정하지만, 당시엔 실질이 같다고 믿고 밀었습니다.",
      "behaviorHint": "목이 잠긴 채 일부 사실을 인정하고 곧바로 이유를 붙인다."
    },
    {
      "id": "partnership-04:transition:b:d-1:s2_s3",
      "caseId": "partnership-04",
      "party": "b",
      "disputeId": "d-1",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "original_request_question",
      "line": "원본이 아니라는 걸 알고도 협상장에서 내려놓지 않은 건 맞지만 그 배경엔 누적된 배신감이 있었습니다.",
      "behaviorHint": "상대를 흘겨보며 도덕적 맥락을 함께 끌어온다."
    },
    {
      "id": "partnership-04:transition:b:d-1:s3_s5",
      "caseId": "partnership-04",
      "party": "b",
      "disputeId": "d-1",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-4_or_e-5_presented",
      "line": "저는 편집본이라는 점을 알면서도 그 PDF를 원본처럼 협상 자료로 계속 사용했습니다.",
      "behaviorHint": "잠시 멈춘 뒤 자신에게 불리한 핵심을 힘없이 인정한다."
    },
    {
      "id": "partnership-04:transition:b:d-3:s0_s1",
      "caseId": "partnership-04",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "personal_diversion_question",
      "line": "정확한 귀속을 다 보진 못했어도 정상 흐름이라고 넘기기엔 너무 수상했습니다.",
      "behaviorHint": "되묻듯 말하다가 표현을 조금 누그러뜨린다."
    },
    {
      "id": "partnership-04:transition:b:d-3:s1_s2",
      "caseId": "partnership-04",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-3_presented",
      "line": "PDF와 심야 이체가 겹치면서 제가 그 세 줄을 외부유출로 굳혀 읽은 건 맞습니다.",
      "behaviorHint": "목이 잠긴 채 일부 사실을 인정하고 곧바로 이유를 붙인다."
    },
    {
      "id": "partnership-04:transition:b:d-3:s2_s4",
      "caseId": "partnership-04",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S2",
      "toState": "S4",
      "trigger": "nonjudgmental_question_about_bank_display_confusion",
      "line": "저는 사실을 확인하기보다 이번엔 반드시 잡아내야 한다는 마음이 더 앞섰습니다.",
      "behaviorHint": "숨을 고르지 못하고 감정이 먼저 튀어나온다."
    },
    {
      "id": "partnership-04:transition:b:d-3:s4_s5",
      "caseId": "partnership-04",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S4",
      "toState": "S5",
      "trigger": "e-1_or_e-6_presented",
      "line": "그 세 줄은 외부유출 세 건이 아니라 분리 표기였고, 저는 그 오해를 복수심과 함께 밀어붙였습니다.",
      "behaviorHint": "잠시 멈춘 뒤 자신에게 불리한 핵심을 힘없이 인정한다."
    },
    {
      "id": "partnership-04:transition:b:d-4:s0_s1",
      "caseId": "partnership-04",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "past_betrayal_reuse_question",
      "line": "압박용이라기보다 신뢰 붕괴의 맥락을 보여주려 했습니다.",
      "behaviorHint": "되묻듯 말하다가 표현을 조금 누그러뜨린다."
    },
    {
      "id": "partnership-04:transition:b:d-4:s1_s2",
      "caseId": "partnership-04",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-2_presented",
      "line": "제 입장을 세우려고 그 과거 사건을 다시 협상 테이블에 올린 건 맞습니다.",
      "behaviorHint": "목이 잠긴 채 일부 사실을 인정하고 곧바로 이유를 붙인다."
    },
    {
      "id": "partnership-04:transition:b:d-4:s2_s3",
      "caseId": "partnership-04",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "settlement_closure_followup",
      "line": "일부 정리된 사건임을 알면서도 도덕적 우위를 만들기 위해 반복 소환했습니다.",
      "behaviorHint": "상대를 흘겨보며 도덕적 맥락을 함께 끌어온다."
    },
    {
      "id": "partnership-04:transition:b:d-4:s3_s5",
      "caseId": "partnership-04",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-5_or_shared_responsibility_question",
      "line": "저는 과거 배신 사건을 현재 협상 압박 카드로 다시 사용했습니다.",
      "behaviorHint": "잠시 멈춘 뒤 자신에게 불리한 핵심을 힘없이 인정한다."
    }
  ]
} as const;

