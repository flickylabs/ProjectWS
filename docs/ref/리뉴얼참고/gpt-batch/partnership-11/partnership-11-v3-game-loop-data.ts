export const partnership11V3GameLoopData = {
  "caseId": "partnership-11",
  "dossierCards": [
    {
      "id": "dossier-1",
      "name": "성수 계약과 공동기회 합의",
      "description": "성수 위성매장 계약과 공동 승인 절차가 실제로 어떻게 깨졌는지 확인하는 카드",
      "evidenceIds": [
        "e-1",
        "e-2"
      ],
      "relatedDisputes": [
        "d-1",
        "d-3",
        "d-4"
      ],
      "subjectParty": "both",
      "challenges": [
        {
          "targetParty": "a",
          "questions": [
            {
              "id": "dossier-1.a.q1",
              "text": "김재원 씨, 성수 위성매장 임대차계약과 보증금 이체가 이미 끝난 상태였다면 이를 단순 hold라고만 말할 수 있습니까.",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "partnership-11:a:d-1:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q2",
              "text": "공동기회 부속합의서에 서면 승인 전 집행 금지가 적혀 있는데도 예외라고 주장할 근거가 별도로 있었습니까.",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "partnership-11:a:d-1:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q3",
              "text": "결국 대표님은 아린 대표의 최종 동의 없이 본법인 명의 계약과 집행을 했다는 점 자체는 인정하십니까.",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "partnership-11:a:d-1:unlock:s5:0",
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
              "text": "정아린 씨, 승인 시트에 별도 법인도 공동 기회로 묶여 있었다면 대표님도 그 규칙을 알고 계셨던 것 아닙니까.",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "partnership-11:b:d-4:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q2",
              "text": "성수 계약이 드러나기 전부터 백업 구조를 준비했다면, 자신을 순수 피해자라고만 말하는 서사는 수정돼야 하지 않습니까.",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "partnership-11:b:d-3:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q3",
              "text": "재원 대표의 위반을 비판하는 것과 별개로, 대표님이 선행된 출구 설계를 숨긴 점도 함께 답하실 수 있습니까.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "partnership-11:b:d-3:unlock:s3:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-2",
      "name": "별도 법인과 거래처 전환 준비",
      "description": "크롭된 DM과 원본 메일을 대비해 별도 법인 준비의 실제 수준을 가르는 카드",
      "evidenceIds": [
        "e-3",
        "e-4"
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
              "text": "김재원 씨, 아린 대표의 선행 준비를 말하는 취지는 알겠지만 그것을 대표님 계약 책임의 반증처럼 사용해 온 것 아닙니까.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "partnership-11:a:d-3:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q2",
              "text": "상대가 순수 피해자가 아니라는 사실을 알았을 때, 그 분노를 자신의 절차 위반 정당화에 섞어 버린 측면은 없었습니까.",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "partnership-11:a:d-3:unlock:s4:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q3",
              "text": "이 카드가 보여 주는 건 아린 대표의 선행 준비와 동시에 대표님 책임도 남는 구조인데, 그 이중 사실을 함께 인정하십니까.",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "partnership-11:a:d-3:unlock:s5:0",
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
              "text": "정아린 씨, 크롭된 DM만 놓고 보면 여지가 있어도 등기 시점과 원본 메일을 함께 보면 이미 준비가 상당히 진행된 것 아닙니까.",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "partnership-11:b:d-2:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q2",
              "text": "원본 메일에 견적서와 미팅 제안, 납품 일정까지 붙어 있었다면 이를 단순 세무 검토라고만 볼 수 있습니까.",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "partnership-11:b:d-2:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q3",
              "text": "대표님은 이 준비를 살아남기 위한 대비라고 설명하지만, 그 표현이 먼저 움직인 주체라는 사실을 가리는 역할도 하지 않았습니까.",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "partnership-11:b:d-2:unlock:s5:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-3",
      "name": "분리 운영 메모와 실행 불가능성",
      "description": "개별 운영 구상과 기존 계약 제약이 실제로 충돌하는 지점을 확인하는 카드",
      "evidenceIds": [
        "e-5",
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
              "id": "dossier-3.a.q1",
              "text": "김재원 씨, 분리 운영 메모를 공동 승인 보드 밖에서 작성한 시점부터 이미 기존 법인을 우회한 실행 구조를 상정한 것 아닙니까.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "partnership-11:a:d-5:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q2",
              "text": "법률의견서 전에도 공급계약 원문은 있었는데, 결국 대표님이 계약 검토보다 오픈 일정을 앞세운 것 아닙니까.",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "partnership-11:a:d-5:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q3",
              "text": "기존 법인 동의 없는 단독 지점 운영이 위약과 상표 분쟁을 낳는다면, 대표님의 단독 실행 구상은 구조상 불가능했다고 인정하십니까.",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "partnership-11:a:d-5:unlock:s5:0",
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
              "text": "정아린 씨, 개인 폴더의 거래처 이전 우선순위 시트는 공동 승인 보드 밖에서 만든 별도 실행판이라고 봐야 하지 않습니까.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "partnership-11:b:d-4:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q2",
              "text": "피해 감정이 컸더라도, 그 감정이 공동 기회 조항을 대표님에게만 예외로 만들어 주는 근거가 될 수는 없지요.",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "partnership-11:b:d-4:unlock:s4:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q3",
              "text": "결국 대표님의 별도 법인·거래처 준비와 재원 대표의 단독 지점 계약은 같은 합의를 서로 다른 방식으로 동시에 깬 것 아닙니까.",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "partnership-11:b:d-4:unlock:s5:0",
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
            "id": "partnership-11:a:d-1:unlock:s2:0",
            "factText": "성수 위성매장 6개월 임대차계약과 보증금 1,500만원 집행은 이미 본법인 명의로 완료됐고 공동결재 흔적이 없다.",
            "tags": [
              "evidence",
              "act",
              "timeline"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "branch": {
                "exact": "성수 위성매장",
                "neutral": "그 지점"
              },
              "contract": {
                "exact": "6개월 임대차계약",
                "neutral": "그 계약"
              },
              "amount": {
                "exact": "1,500만원",
                "neutral": "보증금 일부",
                "rounded": "1,500만원"
              }
            },
            "stanceHints": [
              "partial",
              "hedge"
            ]
          }
        ],
        "S3": [
          {
            "id": "partnership-11:a:d-1:unlock:s3:0",
            "factText": "2024 공동기회 부속합의서에는 현장 예외 조항이 없고, 서면 승인 전 집행 금지가 그대로 적혀 있다.",
            "tags": [
              "rule",
              "evidence",
              "context"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "rule": {
                "exact": "공동 서면 승인 전 집행 금지",
                "neutral": "기존 승인 절차"
              },
              "addendum": {
                "exact": "2024 공동기회 부속합의서",
                "neutral": "부속합의"
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
            "id": "partnership-11:a:d-1:unlock:s4:0",
            "factText": "재원은 확장 타이밍을 놓치면 운영총괄로 무능해 보일까 두려워 관계적 합의보다 일정과 hold를 앞세웠다.",
            "tags": [
              "fear",
              "motive",
              "emotion"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "exact": "김재원",
                "neutral": "나",
                "fullName": "김재원",
                "judgeRef": "본인"
              },
              "branch": {
                "exact": "성수 위성매장",
                "neutral": "그 지점"
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
            "id": "partnership-11:a:d-1:unlock:s5:0",
            "factText": "재원은 성수 지점 계약과 보증금 집행이 공동승인 위반이었다는 점을 스스로 인정한다.",
            "tags": [
              "admission",
              "responsibility",
              "act"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "branch": {
                "exact": "성수 위성매장",
                "neutral": "그 지점"
              },
              "amount": {
                "exact": "1,500만원",
                "neutral": "보증금 일부",
                "rounded": "1,500만원"
              },
              "rule": {
                "exact": "공동 서면 승인 전 집행 금지",
                "neutral": "기존 승인 절차"
              }
            },
            "stanceHints": [
              "confess",
              "emotional"
            ]
          }
        ]
      },
      "d-3": {
        "S2": [
          {
            "id": "partnership-11:a:d-3:unlock:s2:0",
            "factText": "아린셀렉트F&B 법인 설립일은 성수 지점 계약일보다 19일 빠르고, 핵심 거래처 전환 제안 메일은 지점 계약 공개 전주에 발송됐다.",
            "tags": [
              "timeline",
              "evidence",
              "counter"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "company": {
                "exact": "아린셀렉트F&B",
                "neutral": "별도 법인"
              },
              "time": {
                "exact": "지점 계약일보다 19일 전",
                "neutral": "그보다 먼저",
                "period": "지점 계약 공개 전",
                "dateExact": "지점 계약일보다 19일 전"
              },
              "mail": {
                "exact": "전환 견적서와 미팅 제안 메일",
                "neutral": "전환 준비 자료"
              }
            },
            "stanceHints": [
              "partial",
              "hedge"
            ]
          }
        ],
        "S3": [
          {
            "id": "partnership-11:a:d-3:unlock:s3:0",
            "factText": "재원은 아린의 선행 준비 사실을 자신의 무단 지점 계약 책임을 덜어주는 반증처럼 사용하고 있었다.",
            "tags": [
              "self_justification",
              "responsibility",
              "relationship"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "exact": "정아린",
                "neutral": "상대",
                "fullName": "정아린",
                "judgeRef": "상대방"
              },
              "branch": {
                "exact": "성수 위성매장",
                "neutral": "그 지점"
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
            "id": "partnership-11:a:d-3:unlock:s4:0",
            "factText": "아린이 순수 피해자가 아니라는 사실을 확인한 뒤 재원은 그 분노를 절차 위반의 면죄부처럼 붙잡았다.",
            "tags": [
              "emotion",
              "shame",
              "counter"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "exact": "김재원",
                "neutral": "나",
                "fullName": "김재원",
                "judgeRef": "본인"
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
            "id": "partnership-11:a:d-3:unlock:s5:0",
            "factText": "아린은 순수 피해자가 아니지만, 그렇다고 재원의 독단 계약 책임이 사라지는 것도 아니라는 이중 사실이 드러난다.",
            "tags": [
              "admission",
              "context",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "branch": {
                "exact": "성수 위성매장",
                "neutral": "그 지점"
              },
              "company": {
                "exact": "아린셀렉트F&B",
                "neutral": "별도 법인"
              }
            },
            "stanceHints": [
              "confess",
              "partial"
            ]
          }
        ]
      },
      "d-5": {
        "S2": [
          {
            "id": "partnership-11:a:d-5:unlock:s2:0",
            "factText": "재원의 분리 운영 메모는 공동 승인 보드 밖에서 작성됐고, 핵심 독점 공급처와 겹치는 운영 배분을 전제로 하고 있었다.",
            "tags": [
              "evidence",
              "context",
              "rule"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "memo": {
                "exact": "분리 운영 메모",
                "neutral": "개별 운영 메모"
              },
              "client": {
                "exact": "핵심 도매 거래처 2곳",
                "neutral": "핵심 거래처"
              }
            },
            "stanceHints": [
              "partial",
              "hedge"
            ]
          }
        ],
        "S3": [
          {
            "id": "partnership-11:a:d-5:unlock:s3:0",
            "factText": "법률의견서가 나오기 전에도 기존 도매 독점공급계약 원문은 존재했고, 재원은 이를 끝까지 읽지 않은 채 일정부터 굴렸다.",
            "tags": [
              "timeline",
              "responsibility",
              "rule"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "contract": {
                "exact": "도매 독점공급계약",
                "neutral": "기존 공급계약"
              },
              "opinion": {
                "exact": "상표사용 법률의견서",
                "neutral": "법률의견"
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
            "id": "partnership-11:a:d-5:unlock:s4:0",
            "factText": "재원은 운영을 살려야 한다는 압박 때문에 법적 불가능성을 '나중에 조정할 문제'로 밀어냈다.",
            "tags": [
              "fear",
              "emotion",
              "self_justification"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "branch": {
                "exact": "성수 위성매장",
                "neutral": "그 지점"
              },
              "person": {
                "exact": "김재원",
                "neutral": "나",
                "fullName": "김재원",
                "judgeRef": "본인"
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
            "id": "partnership-11:a:d-5:unlock:s5:0",
            "factText": "기존 법인 동의 없는 단독 지점 운영이나 거래처 분리는 위약과 상표 분쟁을 동시에 일으켜 그대로는 실행 불가능했다.",
            "tags": [
              "admission",
              "rule",
              "threshold"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "contract": {
                "exact": "도매 독점공급계약",
                "neutral": "기존 공급계약"
              },
              "brand": {
                "exact": "동일 브랜드 단독 운영",
                "neutral": "동일 브랜드 운영"
              },
              "opinion": {
                "exact": "상표사용 법률의견서",
                "neutral": "법률의견"
              }
            },
            "stanceHints": [
              "confess",
              "emotional"
            ]
          }
        ]
      }
    },
    "b": {
      "d-2": {
        "S2": [
          {
            "id": "partnership-11:b:d-2:unlock:s2:0",
            "factText": "아린셀렉트F&B는 성수 지점 계약일보다 19일 먼저 설립됐고, 아린 계정 DM과 메일은 지점 계약 공개 전부터 거래처 전환을 준비한 흐름을 보인다.",
            "tags": [
              "timeline",
              "institution",
              "evidence"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "company": {
                "exact": "아린셀렉트F&B",
                "neutral": "별도 법인"
              },
              "time": {
                "exact": "지점 계약일보다 19일 전",
                "neutral": "그보다 먼저",
                "period": "지점 계약 공개 전",
                "dateExact": "지점 계약일보다 19일 전"
              },
              "mail": {
                "exact": "전환 견적서와 미팅 제안 메일",
                "neutral": "전환 준비 자료"
              }
            },
            "stanceHints": [
              "partial",
              "hedge"
            ]
          }
        ],
        "S3": [
          {
            "id": "partnership-11:b:d-2:unlock:s3:0",
            "factText": "원본 메일에는 견적서뿐 아니라 미팅 제안과 납품 일정표까지 붙어 있어 단순 세무 상담 수준을 넘는다.",
            "tags": [
              "evidence",
              "act",
              "threshold"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "mail": {
                "exact": "전환 견적서와 미팅 제안 메일",
                "neutral": "전환 준비 자료"
              },
              "client": {
                "exact": "핵심 도매 거래처 2곳",
                "neutral": "핵심 거래처"
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
            "id": "partnership-11:b:d-2:unlock:s4:0",
            "factText": "아린은 별도 법인 준비를 '살아남기 위한 대비'라는 도덕 언어로 포장하며 먼저 움직인 주체라는 사실을 가렸다.",
            "tags": [
              "self_justification",
              "emotion",
              "shame"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "company": {
                "exact": "아린셀렉트F&B",
                "neutral": "별도 법인"
              },
              "person": {
                "exact": "정아린",
                "neutral": "나",
                "fullName": "정아린",
                "judgeRef": "본인"
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
            "id": "partnership-11:b:d-2:unlock:s5:0",
            "factText": "아린이 두 핵심 도매처에 전환 견적과 미팅 제안을 보낸 사실 자체는 더 이상 다툴 수 없는 확정 사실로 굳는다.",
            "tags": [
              "admission",
              "act",
              "evidence"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "client": {
                "exact": "핵심 도매 거래처 2곳",
                "neutral": "핵심 거래처"
              },
              "mail": {
                "exact": "전환 견적서와 미팅 제안 메일",
                "neutral": "전환 준비 자료"
              }
            },
            "stanceHints": [
              "confess",
              "emotional"
            ]
          }
        ]
      },
      "d-3": {
        "S2": [
          {
            "id": "partnership-11:b:d-3:unlock:s2:0",
            "factText": "아린의 백업 구조 구상은 재원의 지점 계약 공개 전에 이미 법인 설립과 거래처 접촉 단계까지 진입해 있었다.",
            "tags": [
              "timeline",
              "context",
              "evidence"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "company": {
                "exact": "아린셀렉트F&B",
                "neutral": "별도 법인"
              },
              "time": {
                "exact": "지점 계약일보다 19일 전",
                "neutral": "그보다 먼저",
                "period": "지점 계약 공개 전",
                "dateExact": "지점 계약일보다 19일 전"
              }
            },
            "stanceHints": [
              "partial",
              "hedge"
            ]
          }
        ],
        "S3": [
          {
            "id": "partnership-11:b:d-3:unlock:s3:0",
            "factText": "아린의 '순수 피해자' 서사는 별도 법인과 거래처 전환이라는 선행된 출구 설계를 통째로 누락하고 있다.",
            "tags": [
              "identity",
              "counter",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "company": {
                "exact": "아린셀렉트F&B",
                "neutral": "별도 법인"
              },
              "person": {
                "exact": "정아린",
                "neutral": "나",
                "fullName": "정아린",
                "judgeRef": "본인"
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
            "id": "partnership-11:b:d-3:unlock:s4:0",
            "factText": "브랜드를 빼앗길까 두려운 감정이 아린으로 하여금 자신의 선행 준비를 모두 피해 서사 안에 감추게 만들었다.",
            "tags": [
              "fear",
              "emotion",
              "shame"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "brand": {
                "exact": "비건 베이커리 브랜드",
                "neutral": "브랜드"
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
            "id": "partnership-11:b:d-3:unlock:s5:0",
            "factText": "재원의 독단 계약과 아린의 선행된 별도 법인 준비가 함께 있었기 때문에, 아린은 순수 피해자로만 남을 수 없었다.",
            "tags": [
              "admission",
              "context",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "branch": {
                "exact": "성수 위성매장",
                "neutral": "그 지점"
              },
              "company": {
                "exact": "아린셀렉트F&B",
                "neutral": "별도 법인"
              }
            },
            "stanceHints": [
              "confess",
              "emotional"
            ]
          }
        ]
      },
      "d-4": {
        "S2": [
          {
            "id": "partnership-11:b:d-4:unlock:s2:0",
            "factText": "확장 승인 시트는 신규 지점과 별도 법인을 같은 표 안에서 관리하도록 되어 있어, 아린도 별도 법인이 공동 기회 대상임을 알고 있었다.",
            "tags": [
              "evidence",
              "rule",
              "institution"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "approval": {
                "exact": "확장 승인 시트",
                "neutral": "승인 보드"
              },
              "company": {
                "exact": "아린셀렉트F&B",
                "neutral": "별도 법인"
              }
            },
            "stanceHints": [
              "partial",
              "hedge"
            ]
          }
        ],
        "S3": [
          {
            "id": "partnership-11:b:d-4:unlock:s3:0",
            "factText": "아린의 거래처 이전 우선순위 시트는 공동 승인 보드가 아닌 개인 폴더에서 만들어졌고, 핵심 공급처가 우선 대상에 포함돼 있었다.",
            "tags": [
              "evidence",
              "responsibility",
              "context"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "sheet": {
                "exact": "거래처 이전 우선순위 시트",
                "neutral": "개인 시트"
              },
              "client": {
                "exact": "핵심 도매 거래처 2곳",
                "neutral": "핵심 거래처"
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
            "id": "partnership-11:b:d-4:unlock:s4:0",
            "factText": "아린은 피해 감정을 근거로 공동 기회 조항을 자신에게만 예외적으로 유예해도 된다고 느꼈다.",
            "tags": [
              "emotion",
              "self_justification",
              "rule"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "rule": {
                "exact": "2024 공동기회 부속합의서",
                "neutral": "부속합의"
              },
              "brand": {
                "exact": "비건 베이커리 브랜드",
                "neutral": "브랜드"
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
            "id": "partnership-11:b:d-4:unlock:s5:0",
            "factText": "결국 아린의 별도 법인·거래처 준비와 재원의 단독 지점 계약은 같은 공동 기회 조항을 서로 다른 방향에서 동시에 깨뜨린 행동이었다.",
            "tags": [
              "admission",
              "context",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "company": {
                "exact": "아린셀렉트F&B",
                "neutral": "별도 법인"
              },
              "branch": {
                "exact": "성수 위성매장",
                "neutral": "그 지점"
              },
              "rule": {
                "exact": "2024 공동기회 부속합의서",
                "neutral": "부속합의"
              }
            },
            "stanceHints": [
              "confess",
              "emotional"
            ]
          }
        ]
      }
    }
  },
  "events": {
    "contradictions": [
      {
        "id": "partnership-11:contradiction:0",
        "targetParty": "a",
        "trigger": "재원이 성수 계약을 단순 hold라고만 주장하는데 e-1 원본 계약서와 보증금 이체내역이 동시에 제시될 때",
        "text": "선확보라면서 왜 본법인 명의 임대차계약과 보증금 집행이 이미 끝났는지 설명이 충돌합니다.",
        "relatedDisputes": [
          "d-1",
          "d-4"
        ],
        "evidenceIds": [
          "e-1",
          "e-2"
        ]
      },
      {
        "id": "partnership-11:contradiction:1",
        "targetParty": "b",
        "trigger": "아린이 별도 법인은 세무 검토였다고 말하는데 e-4 원본 메일과 견적서가 확인될 때",
        "text": "검토용이었다면 왜 핵심 거래처 두 곳에 전환 견적과 미팅 제안이 실제로 발송됐는지 설명이 맞지 않습니다.",
        "relatedDisputes": [
          "d-2",
          "d-3"
        ],
        "evidenceIds": [
          "e-4"
        ]
      },
      {
        "id": "partnership-11:contradiction:2",
        "targetParty": "a",
        "trigger": "재원이 단독 지점도 조정하면 가능했다고 말하는데 e-6 법률의견서가 제시될 때",
        "text": "조정 가능 문제라면 왜 기존 계약 구조상 위약과 상표 분쟁이 동시에 발생한다는 법률의견이 나오는지 진술이 충돌합니다.",
        "relatedDisputes": [
          "d-5"
        ],
        "evidenceIds": [
          "e-6"
        ]
      },
      {
        "id": "partnership-11:contradiction:3",
        "targetParty": "b",
        "trigger": "아린이 공동 기회 조항 위반을 전면 부인하는데 e-2 승인 시트와 e-5 우선순위 시트가 함께 놓일 때",
        "text": "공동 기회 규칙을 알면서도 개인 폴더에서 핵심 거래처 이전 우선순위를 짠 정황이 동시에 확인돼 진술이 어긋납니다.",
        "relatedDisputes": [
          "d-4",
          "d-5"
        ],
        "evidenceIds": [
          "e-2",
          "e-5"
        ]
      }
    ],
    "interjections": [
      {
        "id": "partnership-11:interjection:0",
        "speaker": "b",
        "trigger": "재원이 d-1 질문에 숫자와 조항만 길게 나열하며 감정 질문을 피할 때",
        "text": "지금도 또 숫자부터 말하시네요. 그 계약서 한 장이 저한텐 어떤 의미였는지는 끝까지 빼놓으시잖아요.",
        "relatedDisputes": [
          "d-1",
          "d-3"
        ]
      },
      {
        "id": "partnership-11:interjection:1",
        "speaker": "a",
        "trigger": "아린이 d-2 질문에 과거 팝업 손실과 브랜딩 기여를 길게 쌓으며 현재 자료 답변을 미룰 때",
        "text": "지금 묻는 건 그 공로가 아니라, 왜 별도 법인과 거래처 전환 메일을 먼저 돌렸는지입니다.",
        "relatedDisputes": [
          "d-2",
          "d-4"
        ]
      },
      {
        "id": "partnership-11:interjection:2",
        "speaker": "judge",
        "trigger": "양측이 작년 팝업 손실 책임 공방만 반복하며 현재 증거 답변을 미룰 때",
        "text": "과거의 감정은 잠시 내려두고, 지금 제시된 문서가 각 대표의 현재 행동과 어떻게 이어지는지부터 답하십시오.",
        "relatedDisputes": [
          "d-1",
          "d-2",
          "d-4"
        ]
      }
    ],
    "emotionalOutbursts": [
      {
        "id": "partnership-11:outburst:a:0",
        "party": "a",
        "trigger": "아린이 성수 지점을 '회사를 가로챈 증거'라고 반복하며 d-1을 밀어붙일 때",
        "text": "가로챈 게 아니라 기회를 놓치지 않으려던 거였습니다. 당신이 계속 미루지만 않았어도 제가 그렇게까지 안 갔습니다.",
        "relatedDisputes": [
          "d-1",
          "d-3"
        ]
      },
      {
        "id": "partnership-11:outburst:a:1",
        "party": "a",
        "trigger": "e-6 제시 후 재원의 독단과 무능을 동시에 몰아붙일 때",
        "text": "무능해서가 아닙니다. 저는 매장을 살리려 했고, 그 과정에서 계약 구조를 끝까지 못 본 겁니다.",
        "relatedDisputes": [
          "d-5"
        ]
      },
      {
        "id": "partnership-11:outburst:b:0",
        "party": "b",
        "trigger": "e-4로 별도 법인 준비가 공개돼 순수 피해자 서사가 직접 흔들릴 때",
        "text": "네, 준비했습니다. 그런데 왜 그렇게까지 대비해야 했는지 그 전에 벌어진 일을 같이 봐야 하지 않겠어요.",
        "relatedDisputes": [
          "d-2",
          "d-3"
        ]
      },
      {
        "id": "partnership-11:outburst:b:1",
        "party": "b",
        "trigger": "e-5와 e-6로 거래처 이전도 구조상 그대로는 실행 불가능했다는 설명이 나올 때",
        "text": "그 말을 이제야 들으니 더 화가 납니다. 저는 살 길을 찾는다고 움직였는데, 그 길이 처음부터 막혀 있었다는 거잖아요.",
        "relatedDisputes": [
          "d-4",
          "d-5"
        ]
      }
    ]
  },
  "transitionBeats": [
    {
      "id": "partnership-11:transition:a:d-1:s0_s1",
      "caseId": "partnership-11",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "branch_lease_question",
      "line": "정식 오픈을 밀어붙인 게 아니라 hold를 놓치지 않으려던 조치였다고 생각했습니다.",
      "behaviorHint": "질문을 받자 곧바로 일정표를 펼친다."
    },
    {
      "id": "partnership-11:transition:a:d-1:s1_s2",
      "caseId": "partnership-11",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-1_presented",
      "line": "계약서와 이체내역까지 나오면 제가 먼저 움직였다는 사실은 부인하기 어렵습니다. 다만 그 판단을 그때는 기회 확보라고 봤습니다.",
      "behaviorHint": "서명 페이지를 본 뒤 말수가 잠시 줄어든다."
    },
    {
      "id": "partnership-11:transition:a:d-1:s2_s3",
      "caseId": "partnership-11",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "joint_approval_followup",
      "line": "공동승인 절차를 안 건너뛴 게 아니라, 아린 답이 늦는 동안 제가 실무를 떠안았다고 느꼈습니다.",
      "behaviorHint": "상대를 보며 말을 끊어 치듯 잇는다."
    },
    {
      "id": "partnership-11:transition:a:d-1:s3_s5",
      "caseId": "partnership-11",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-2_or_responsibility_question",
      "line": "부속합의까지 놓고 보면 예외라고 말할 여지는 없네요. 제가 단독으로 계약과 집행을 한 책임을 인정합니다.",
      "behaviorHint": "서류를 내려놓고 짧게 고개를 숙인다."
    },
    {
      "id": "partnership-11:transition:a:d-3:s0_s1",
      "caseId": "partnership-11",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "sole_aggressor_question",
      "line": "제가 문제였다는 걸 알아도, 아린이 순수 피해자라는 그림은 너무 단순합니다.",
      "behaviorHint": "입술을 굳게 다문 채 문장을 잘라 말한다."
    },
    {
      "id": "partnership-11:transition:a:d-3:s1_s2",
      "caseId": "partnership-11",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-4_presented",
      "line": "등기부와 메일까지 같이 놓이면 아린도 먼저 준비했다는 건 분명해집니다. 한쪽만 피해자였던 건 아닙니다.",
      "behaviorHint": "등기일자를 짚으며 말의 속도가 느려진다."
    },
    {
      "id": "partnership-11:transition:a:d-3:s2_s4",
      "caseId": "partnership-11",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S2",
      "toState": "S4",
      "trigger": "nonjudgmental_question_about_why_you_rushed",
      "line": "저는 그 사실을 알고 더 과하게 버텼습니다. 상대가 순수 피해자가 아니라는 말을 제 면죄부처럼 써버렸습니다.",
      "behaviorHint": "시선을 피하던 자세가 잠시 풀린다."
    },
    {
      "id": "partnership-11:transition:a:d-3:s4_s5",
      "caseId": "partnership-11",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S4",
      "toState": "S5",
      "trigger": "e-1_or_shared_responsibility_question",
      "line": "아린이 순수 피해자가 아닌 것과 제 독단 계약 책임은 다른 문제였습니다. 두 사실을 같이 인정하겠습니다.",
      "behaviorHint": "짧게 숨을 내쉰 뒤 차분히 진술한다."
    },
    {
      "id": "partnership-11:transition:a:d-5:s0_s1",
      "caseId": "partnership-11",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "contract_constraint_question",
      "line": "그때는 계약 제약보다 오픈 일정이 먼저 보였습니다. 조정 가능한 문제라고 가볍게 본 건 맞습니다.",
      "behaviorHint": "법률 문구 대신 일정표를 먼저 넘긴다."
    },
    {
      "id": "partnership-11:transition:a:d-5:s1_s2",
      "caseId": "partnership-11",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-5_presented",
      "line": "분리 운영 메모가 나오면 제가 실행 구조를 너무 쉽게 본 건 숨기기 어렵습니다. 검토가 부족했습니다.",
      "behaviorHint": "메모를 읽으며 한 박자 늦게 대답한다."
    },
    {
      "id": "partnership-11:transition:a:d-5:s2_s3",
      "caseId": "partnership-11",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "did_you_read_appendix_followup",
      "line": "계약 원문을 못 본 건 아니고, 뒤로 미뤘던 겁니다. 오픈 일정에 매달리느라 심각성을 늦게 봤습니다.",
      "behaviorHint": "손끝으로 책상 모서리를 긁는다."
    },
    {
      "id": "partnership-11:transition:a:d-5:s3_s5",
      "caseId": "partnership-11",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-6_presented",
      "line": "법률의견서까지 나오면 단독 운영 가능하다고 버티기 어렵네요. 제 판단이 틀렸고 구조상 실행 불가능했습니다.",
      "behaviorHint": "의견서 문구를 읽고 어깨가 내려간다."
    },
    {
      "id": "partnership-11:transition:b:d-2:s0_s1",
      "caseId": "partnership-11",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "side_corporation_question",
      "line": "법인을 세운 건 맞아도 그때는 혹시 모를 상황을 대비한 구조 검토라고 생각했어요.",
      "behaviorHint": "즉답을 피하며 과거 기여 이야기를 먼저 꺼낸다."
    },
    {
      "id": "partnership-11:transition:b:d-2:s1_s2",
      "caseId": "partnership-11",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-3_presented",
      "line": "그 DM 한 장만으로는 억울하지만, 적어도 제가 백업 구조를 본 건 부정하지 않겠습니다.",
      "behaviorHint": "크롭된 화면을 보고 목을 한 번 가다듬는다."
    },
    {
      "id": "partnership-11:transition:b:d-2:s2_s3",
      "caseId": "partnership-11",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "client_transfer_followup",
      "line": "맞아요, 단순 상상만은 아니었어요. 브랜드를 키운 제가 밀려날 것 같아서 거래처 쪽 출구를 준비했어요.",
      "behaviorHint": "자기 기여를 짚는 손짓이 길어진다."
    },
    {
      "id": "partnership-11:transition:b:d-2:s3_s5",
      "caseId": "partnership-11",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-4_presented",
      "line": "등기부와 원본 메일까지 같이 놓이면 더는 숨길 수 없어요. 제가 별도 법인과 전환 제안을 실제로 준비했습니다.",
      "behaviorHint": "원본 메일 헤더를 본 뒤 시선을 떨군다."
    },
    {
      "id": "partnership-11:transition:b:d-3:s0_s1",
      "caseId": "partnership-11",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "pure_victim_question",
      "line": "저는 피해자라고 느꼈어요. 다만 지금 돌이켜보면 그 말 안에 제 불안이 너무 많이 들어가 있었습니다.",
      "behaviorHint": "말끝에 힘이 들어가지만 곧 시선이 흔들린다."
    },
    {
      "id": "partnership-11:transition:b:d-3:s1_s2",
      "caseId": "partnership-11",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-1_presented",
      "line": "그 계약서가 나온 순간 제가 받은 충격은 진짜였어요. 그래도 그 전에 백업 구조를 본 사실까지 부정하진 못하겠습니다.",
      "behaviorHint": "계약서를 오래 바라보다가 천천히 인정한다."
    },
    {
      "id": "partnership-11:transition:b:d-3:s2_s4",
      "caseId": "partnership-11",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S2",
      "toState": "S4",
      "trigger": "nonjudgmental_question_about_backup_business_structure",
      "line": "저는 먼저 몰린다고 느껴서 출구를 만들었어요. 그걸 피해 서사로만 포장한 건 제 불안 때문이었습니다.",
      "behaviorHint": "어깨를 움츠리며 말을 이어 간다."
    },
    {
      "id": "partnership-11:transition:b:d-3:s4_s5",
      "caseId": "partnership-11",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S4",
      "toState": "S5",
      "trigger": "e-4_or_shared_responsibility_question",
      "line": "재원의 독단 계약도, 제 별도 법인 준비도 둘 다 사실입니다. 순수 피해자라고만 말한 건 제 왜곡이었어요.",
      "behaviorHint": "침묵 후 고개를 끄덕이며 마무리한다."
    },
    {
      "id": "partnership-11:transition:b:d-4:s0_s1",
      "caseId": "partnership-11",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "joint_opportunity_clause_question",
      "line": "그 합의가 있었던 건 알아요. 그래도 당시엔 제가 방어하는 쪽이라고 생각해서 제 행동을 위반으로 보지 않았습니다.",
      "behaviorHint": "손을 움켜쥔 채 방어적으로 앉는다."
    },
    {
      "id": "partnership-11:transition:b:d-4:s1_s2",
      "caseId": "partnership-11",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-2_presented",
      "line": "승인 시트에 지점과 별도 법인이 같이 올라가 있었다면, 제가 그 규칙을 모른 척할 수는 없겠네요.",
      "behaviorHint": "시트의 표를 따라가다 목소리가 낮아진다."
    },
    {
      "id": "partnership-11:transition:b:d-4:s2_s3",
      "caseId": "partnership-11",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "why_no_disclosure_followup",
      "line": "배제된다고 느껴서 공개를 미뤘어요. 재원이 먼저 lease를 움직였다는 생각이 저를 더 숨게 만들었습니다.",
      "behaviorHint": "상대를 한 번 보고 다시 눈을 내린다."
    },
    {
      "id": "partnership-11:transition:b:d-4:s3_s5",
      "caseId": "partnership-11",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-5_or_responsibility_question",
      "line": "제 우선순위 시트까지 놓고 보면 저도 공동 기회 조항을 비켜 간 게 맞습니다. 그 점은 인정할게요.",
      "behaviorHint": "개인 시트 언급에 입술을 깨물고 인정한다."
    }
  ]
} as const;

