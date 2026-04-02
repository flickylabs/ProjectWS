export const spouse03V3GameLoopData = {
  "caseId": "spouse-03",
  "dossierCards": [
    {
      "id": "dossier-1",
      "name": "인출 시점과 적응비 확인",
      "description": "비상금 인출 기록과 온보딩 비용 맥락을 함께 대조하는 카드",
      "evidenceIds": [
        "e-1",
        "e-2"
      ],
      "relatedDisputes": [
        "d-1",
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
              "id": "dossier-1.a.q1",
              "text": "노유진 씨, 공동 비상금에서 160만원이 빠져나간 날, 본인 인증으로 처리된 게 맞습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "spouse03:a:d-1:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q2",
              "text": "인출 직후 이어진 정장·구두·정기권 결제가 수습 준비비였다는 점을 구체적으로 설명해 보세요.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "spouse03:a:d-1:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q3",
              "text": "50만원 이상이면 사전 상의하기로 해 놓고 왜 이번엔 자기 예외로 두었습니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "spouse03:a:d-4:unlock:s2:0",
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
              "text": "이 자료를 보고도 생활비 구멍이 오직 유진 씨 때문이었다고 단정하십니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "spouse03:b:d-5:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q2",
              "text": "온보딩 문서를 확인하지 않은 채 백화점 상호만으로 사치라고 판단한 근거는 무엇입니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "spouse03:b:d-3:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q3",
              "text": "복장 적응비라는 사정을 묻기보다 먼저 비난한 데 감정적 이유가 있었습니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "spouse03:b:d-3:unlock:s3:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-2",
      "name": "잘린 알림과 회사 가이드",
      "description": "사치로 보이는 캡처본과 실제 업무 맥락 사이의 간극을 겨누는 카드",
      "evidenceIds": [
        "e-3",
        "e-4"
      ],
      "relatedDisputes": [
        "d-3",
        "d-5"
      ],
      "subjectParty": "both",
      "challenges": [
        {
          "targetParty": "a",
          "questions": [
            {
              "id": "dossier-2.a.q1",
              "text": "노유진 씨, 승인 알림만 보면 사치처럼 보일 수 있다는 걸 알면서도 왜 품목 설명을 먼저 하지 않았습니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "spouse03:a:d-3:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q2",
              "text": "복장 가이드와 복지비 보전 규정을 보여 주지 않은 채 결제만 남겨 둔 이유는 무엇입니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "spouse03:a:d-3:unlock:s4:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q3",
              "text": "사치로 오해받는 게 두려워 맥락을 숨긴 것 아닙니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "spouse03:a:d-3:unlock:s5:0",
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
              "text": "황인호 씨, 잘린 승인 알림 묶음만으로 전체 소비를 판단한 건 자료의 맥락을 훼손한 것 아닌가요?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "spouse03:b:d-3:unlock:s4:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q2",
              "text": "사내 복장 가이드를 본 뒤에도 같은 표현을 유지한다면, 그 판단을 무엇으로 정당화하겠습니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "spouse03:b:d-3:unlock:s5:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q3",
              "text": "상대의 적응 불안을 묻기보다 사치라고 몰아간 데 본인의 체면 문제가 작용했습니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "spouse03:b:d-5:unlock:s4:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-3",
      "name": "적금 정지와 건조기 할부 흐름",
      "description": "현금 흐름 조정과 규칙 위반이 한 묶음이었는지 추적하는 카드",
      "evidenceIds": [
        "e-5",
        "e-6"
      ],
      "relatedDisputes": [
        "d-2",
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
              "text": "노유진 씨, 이 자료를 보고도 생활비 구멍의 절반이 자신의 선택에서 왔다는 점을 부정하십니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "spouse03:a:d-5:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q2",
              "text": "급여 지연과 현금 공백을 둘 다 알고 있었다면 왜 더 일찍 공동 예산을 다시 열지 않았습니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "spouse03:a:d-5:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q3",
              "text": "상대를 안심시키려 했다는 말이 결국 규칙 회피의 명분이 된 것 아닙니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "spouse03:a:d-5:unlock:s4:0",
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
              "text": "황인호 씨, 같은 날 적금 정지와 건조기 계약을 묶어 처리한 건 계획적 조정이지요?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "spouse03:b:d-2:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q2",
              "text": "메모에 '첫 급여 들어오면 다시 채움'이라고 써 두고도 왜 유진 씨에게는 말하지 않았습니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "spouse03:b:d-2:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q3",
              "text": "84만원 할부가 50만원 사전 상의 규칙을 넘는다는 걸 몰랐다고 보긴 어렵지 않습니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "spouse03:b:d-4:unlock:s2:0",
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
            "id": "spouse03:a:d-1:unlock:s2:0",
            "factText": "노유진이 이직 첫 주 공동 비상금 계좌에서 160만원을 인출한 사실",
            "tags": [
              "act",
              "context"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "amount": {
                "exact": "160만원",
                "neutral": "해당 금액",
                "rounded": "160만원"
              },
              "time": {
                "exact": "이직 첫 주",
                "neutral": "그 시점",
                "dateExact": "이직 첫 주",
                "period": "첫 출근 주간"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "spouse03:a:d-1:unlock:s3:0",
            "factText": "인출금 대부분이 수습 기간용 정장·구두·3개월 정기권 결제로 이어진 사정",
            "tags": [
              "context",
              "fear"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "amount": {
                "exact": "160만원",
                "neutral": "해당 금액",
                "rounded": "160만원"
              },
              "time": {
                "exact": "이직 첫 주",
                "neutral": "그 시점",
                "dateExact": "이직 첫 주",
                "period": "첫 출근 주간"
              },
              "item": {
                "exact": "정장·구두·3개월 정기권",
                "neutral": "그 준비비"
              },
              "rule": {
                "exact": "50만원 이상 사전 상의",
                "neutral": "그 규칙"
              }
            },
            "stanceHints": [
              "partial",
              "emotional"
            ]
          }
        ],
        "S4": [
          {
            "id": "spouse03:a:d-1:unlock:s4:0",
            "factText": "새 직장에서 허술해 보일까 두려워 인출 사실을 늦춘 마음",
            "tags": [
              "emotion",
              "shame"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "item": {
                "exact": "정장·구두·3개월 정기권",
                "neutral": "그 준비비"
              },
              "rule": {
                "exact": "50만원 이상 사전 상의",
                "neutral": "그 규칙"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "spouse03:a:d-1:unlock:s5:0",
            "factText": "50만원 이상 지출은 먼저 상의하기로 한 합의가 있었던 점",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "amount": {
                "exact": "160만원",
                "neutral": "해당 금액",
                "rounded": "160만원"
              },
              "time": {
                "exact": "이직 첫 주",
                "neutral": "그 시점",
                "dateExact": "이직 첫 주",
                "period": "첫 출근 주간"
              },
              "item": {
                "exact": "정장·구두·3개월 정기권",
                "neutral": "그 준비비"
              },
              "rule": {
                "exact": "50만원 이상 사전 상의",
                "neutral": "그 규칙"
              }
            },
            "stanceHints": [
              "confess",
              "emotional"
            ]
          }
        ]
      },
      "d-2": {
        "S2": [
          {
            "id": "spouse03:a:d-2:unlock:s2:0",
            "factText": "이체 변경 기록과 할부 계약서가 계획적 조정을 보여 주는 점",
            "tags": [
              "evidence",
              "context"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "time": {
                "exact": "두 달치 정지",
                "neutral": "그 기간",
                "period": "이직 직후 두 달"
              },
              "item": {
                "exact": "건조기 할부",
                "neutral": "그 할부"
              },
              "rule": {
                "exact": "사전 상의 없는 가계 조정",
                "neutral": "그 무단 조정"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "spouse03:a:d-2:unlock:s3:0",
            "factText": "뒤늦게 통보받았을 때 느낀 배신감",
            "tags": [
              "context",
              "emotion"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "item": {
                "exact": "건조기 할부",
                "neutral": "그 할부"
              },
              "rule": {
                "exact": "사전 상의 없는 가계 조정",
                "neutral": "그 무단 조정"
              }
            },
            "stanceHints": [
              "partial",
              "emotional"
            ]
          }
        ],
        "S4": [
          {
            "id": "spouse03:a:d-2:unlock:s4:0",
            "factText": "유진이 이직 직후라 더 투명한 공유를 기대했던 점",
            "tags": [
              "emotion",
              "relationship"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "item": {
                "exact": "건조기 할부",
                "neutral": "그 할부"
              },
              "rule": {
                "exact": "사전 상의 없는 가계 조정",
                "neutral": "그 무단 조정"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "spouse03:a:d-2:unlock:s5:0",
            "factText": "황인호가 두 달치 적금 자동이체를 멈추고 현금 흐름을 돌린 사실",
            "tags": [
              "responsibility",
              "admission"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "time": {
                "exact": "두 달치 정지",
                "neutral": "그 기간",
                "period": "이직 직후 두 달"
              },
              "item": {
                "exact": "적금 자동이체",
                "neutral": "그 자동이체"
              }
            },
            "stanceHints": [
              "partial",
              "emotional"
            ]
          }
        ]
      },
      "d-3": {
        "S2": [
          {
            "id": "spouse03:a:d-3:unlock:s2:0",
            "factText": "백화점 결제가 대부분 수습 기간 복장과 교통 준비비였다는 사실",
            "tags": [
              "act",
              "context"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "item": {
                "exact": "정장·구두·정기권 준비비",
                "neutral": "그 준비비"
              },
              "institution": {
                "exact": "출판사 온보딩 기준",
                "neutral": "그 기관",
                "judgeRef": "새 회사 기준"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "spouse03:a:d-3:unlock:s3:0",
            "factText": "일부 항목이 익월 복지비 보전 대상이었던 사정",
            "tags": [
              "context",
              "fear"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "item": {
                "exact": "익월 복지비 보전 항목",
                "neutral": "그 보전 항목"
              },
              "institution": {
                "exact": "출판사 온보딩 기준",
                "neutral": "그 기관",
                "judgeRef": "새 회사 기준"
              },
              "time": {
                "exact": "첫 출근 전후",
                "neutral": "그 무렵",
                "period": "수습 시작 직전"
              }
            },
            "stanceHints": [
              "partial",
              "emotional"
            ]
          }
        ],
        "S4": [
          {
            "id": "spouse03:a:d-3:unlock:s4:0",
            "factText": "사치처럼 보일까 두려워 회사 적응비라는 말을 숨긴 마음",
            "tags": [
              "emotion",
              "shame"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "item": {
                "exact": "익월 복지비 보전 항목",
                "neutral": "그 보전 항목"
              },
              "time": {
                "exact": "첫 출근 전후",
                "neutral": "그 무렵",
                "period": "수습 시작 직전"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "spouse03:a:d-3:unlock:s5:0",
            "factText": "결제 맥락을 미리 설명하지 않은 점",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "item": {
                "exact": "익월 복지비 보전 항목",
                "neutral": "그 보전 항목"
              },
              "institution": {
                "exact": "출판사 온보딩 기준",
                "neutral": "그 기관",
                "judgeRef": "새 회사 기준"
              },
              "time": {
                "exact": "첫 출근 전후",
                "neutral": "그 무렵",
                "period": "수습 시작 직전"
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
            "id": "spouse03:a:d-4:unlock:s2:0",
            "factText": "노유진도 비상금 인출로 50만원 이상 사전 상의 규칙을 어긴 사실",
            "tags": [
              "rule",
              "responsibility"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "rule": {
                "exact": "50만원 이상 사전 상의",
                "neutral": "그 규칙"
              },
              "amount": {
                "exact": "50만원 초과",
                "neutral": "그 기준 금액",
                "rounded": "50만원대"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "spouse03:a:d-4:unlock:s3:0",
            "factText": "인호의 건조기 할부·적금 정지와 성격은 달라도 둘 다 무단 결정이었던 점",
            "tags": [
              "context",
              "relationship"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "rule": {
                "exact": "50만원 이상 사전 상의",
                "neutral": "그 규칙"
              },
              "amount": {
                "exact": "50만원 초과",
                "neutral": "그 기준 금액",
                "rounded": "50만원대"
              },
              "item": {
                "exact": "비상금 인출과 건조기 할부·적금 정지",
                "neutral": "양쪽 결정"
              },
              "time": {
                "exact": "이직 직후 같은 달",
                "neutral": "그 시기",
                "period": "전환기 초반"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S4": [
          {
            "id": "spouse03:a:d-4:unlock:s4:0",
            "factText": "자신만 예외라고 우긴 이유가 체면이었다는 점",
            "tags": [
              "emotion",
              "shame"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "item": {
                "exact": "비상금 인출과 건조기 할부·적금 정지",
                "neutral": "양쪽 결정"
              },
              "time": {
                "exact": "이직 직후 같은 달",
                "neutral": "그 시기",
                "period": "전환기 초반"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "spouse03:a:d-4:unlock:s5:0",
            "factText": "50만원 이상 사전 상의 합의가 실제로 비워진 점",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "rule": {
                "exact": "50만원 이상 사전 상의",
                "neutral": "그 규칙"
              },
              "amount": {
                "exact": "50만원 초과",
                "neutral": "그 기준 금액",
                "rounded": "50만원대"
              },
              "item": {
                "exact": "비상금 인출과 건조기 할부·적금 정지",
                "neutral": "양쪽 결정"
              },
              "time": {
                "exact": "이직 직후 같은 달",
                "neutral": "그 시기",
                "period": "전환기 초반"
              }
            },
            "stanceHints": [
              "confess",
              "emotional"
            ]
          }
        ]
      },
      "d-5": {
        "S2": [
          {
            "id": "spouse03:a:d-5:unlock:s2:0",
            "factText": "생활비 구멍이 유진의 인출과 인호의 자동이체 중단·건조기 할부가 겹친 결과라는 사실",
            "tags": [
              "context",
              "responsibility"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "item": {
                "exact": "비상금 인출과 자동이체 중단·건조기 할부",
                "neutral": "그 지출들"
              },
              "time": {
                "exact": "첫 급여 전 3주 공백",
                "neutral": "그 공백 기간",
                "period": "이직 직후 전환기"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "spouse03:a:d-5:unlock:s3:0",
            "factText": "첫 급여일 3주 지연이 공백을 더 크게 보이게 한 사정",
            "tags": [
              "context",
              "timeline"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "institution": {
                "exact": "첫 급여일 3주 지연",
                "neutral": "그 일정 변화",
                "judgeRef": "급여 지연"
              },
              "rule": {
                "exact": "서로 숨긴 결정",
                "neutral": "그 숨김"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S4": [
          {
            "id": "spouse03:a:d-5:unlock:s4:0",
            "factText": "숫자로만 버티며 상대 사정을 못 본 점",
            "tags": [
              "emotion",
              "fear"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "institution": {
                "exact": "첫 급여일 3주 지연",
                "neutral": "그 일정 변화",
                "judgeRef": "급여 지연"
              },
              "rule": {
                "exact": "서로 숨긴 결정",
                "neutral": "그 숨김"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "spouse03:a:d-5:unlock:s5:0",
            "factText": "서로 숨김이 공통 원인이 된 점",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "item": {
                "exact": "비상금 인출과 자동이체 중단·건조기 할부",
                "neutral": "그 지출들"
              },
              "time": {
                "exact": "첫 급여 전 3주 공백",
                "neutral": "그 공백 기간",
                "period": "이직 직후 전환기"
              },
              "institution": {
                "exact": "첫 급여일 3주 지연",
                "neutral": "그 일정 변화",
                "judgeRef": "급여 지연"
              },
              "rule": {
                "exact": "서로 숨긴 결정",
                "neutral": "그 숨김"
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
      "d-1": {
        "S2": [
          {
            "id": "spouse03:b:d-1:unlock:s2:0",
            "factText": "은행 인출내역과 온보딩 문서가 인출과 용도를 이어 주는 점",
            "tags": [
              "evidence",
              "context"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "amount": {
                "exact": "160만원",
                "neutral": "해당 금액",
                "rounded": "160만원"
              },
              "item": {
                "exact": "정장·구두·정기권 사정",
                "neutral": "그 사정"
              },
              "rule": {
                "exact": "50만원 이상 사전 상의",
                "neutral": "그 규칙"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "spouse03:b:d-1:unlock:s3:0",
            "factText": "비상금이 혼자 결정으로 쓰였다는 배신감",
            "tags": [
              "context",
              "emotion"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "item": {
                "exact": "정장·구두·정기권 사정",
                "neutral": "그 사정"
              },
              "rule": {
                "exact": "50만원 이상 사전 상의",
                "neutral": "그 규칙"
              }
            },
            "stanceHints": [
              "partial",
              "emotional"
            ]
          }
        ],
        "S4": [
          {
            "id": "spouse03:b:d-1:unlock:s4:0",
            "factText": "도와주고 싶었는데 숨김 때문에 신뢰가 꺾인 점",
            "tags": [
              "emotion",
              "relationship"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "item": {
                "exact": "정장·구두·정기권 사정",
                "neutral": "그 사정"
              },
              "rule": {
                "exact": "50만원 이상 사전 상의",
                "neutral": "그 규칙"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "spouse03:b:d-1:unlock:s5:0",
            "factText": "노유진이 공동 비상금 160만원을 먼저 말 없이 인출한 사실",
            "tags": [
              "responsibility",
              "admission"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "amount": {
                "exact": "160만원",
                "neutral": "해당 금액",
                "rounded": "160만원"
              },
              "item": {
                "exact": "공동 비상금",
                "neutral": "그 돈"
              }
            },
            "stanceHints": [
              "partial",
              "emotional"
            ]
          }
        ]
      },
      "d-2": {
        "S2": [
          {
            "id": "spouse03:b:d-2:unlock:s2:0",
            "factText": "황인호가 적금 자동이체를 두 달 정지하고 현금 흐름에 쓴 사실",
            "tags": [
              "act",
              "context"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "item": {
                "exact": "적금 자동이체",
                "neutral": "그 자동이체"
              },
              "time": {
                "exact": "두 달치 정지",
                "neutral": "그 기간",
                "period": "전환기 두 달"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "spouse03:b:d-2:unlock:s3:0",
            "factText": "같은 날 건조기 초회금과 생활비 압박이 겹친 사정",
            "tags": [
              "context",
              "fear"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "item": {
                "exact": "건조기 초회금",
                "neutral": "그 초회금"
              },
              "time": {
                "exact": "두 달치 정지",
                "neutral": "그 기간",
                "period": "전환기 두 달"
              },
              "rule": {
                "exact": "사전 상의 없는 조정",
                "neutral": "그 무단 조정"
              }
            },
            "stanceHints": [
              "partial",
              "emotional"
            ]
          }
        ],
        "S4": [
          {
            "id": "spouse03:b:d-2:unlock:s4:0",
            "factText": "가계를 못 지탱하는 사람처럼 보일까 두려웠던 마음",
            "tags": [
              "emotion",
              "shame"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "item": {
                "exact": "건조기 초회금",
                "neutral": "그 초회금"
              },
              "rule": {
                "exact": "사전 상의 없는 조정",
                "neutral": "그 무단 조정"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "spouse03:b:d-2:unlock:s5:0",
            "factText": "유진에게 먼저 상의하지 않은 점",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "item": {
                "exact": "건조기 초회금",
                "neutral": "그 초회금"
              },
              "time": {
                "exact": "두 달치 정지",
                "neutral": "그 기간",
                "period": "전환기 두 달"
              },
              "rule": {
                "exact": "사전 상의 없는 조정",
                "neutral": "그 무단 조정"
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
            "id": "spouse03:b:d-3:unlock:s2:0",
            "factText": "실제 결제 대부분이 복장 기준과 교통 준비였던 사정",
            "tags": [
              "evidence",
              "context"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "item": {
                "exact": "수습 기간 복장·정기권 준비비",
                "neutral": "그 준비비"
              },
              "institution": {
                "exact": "회사 복장 가이드",
                "neutral": "그 가이드",
                "judgeRef": "사내 가이드"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "spouse03:b:d-3:unlock:s3:0",
            "factText": "유진의 적응 불안을 묻지 않고 소비 문제로만 본 점",
            "tags": [
              "context",
              "relationship"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "item": {
                "exact": "수습 기간 복장·정기권 준비비",
                "neutral": "그 준비비"
              },
              "institution": {
                "exact": "회사 복장 가이드",
                "neutral": "그 가이드",
                "judgeRef": "사내 가이드"
              }
            },
            "stanceHints": [
              "partial",
              "emotional"
            ]
          }
        ],
        "S4": [
          {
            "id": "spouse03:b:d-3:unlock:s4:0",
            "factText": "가장 노릇 못 하는 사람처럼 보일까 날카롭게 반응한 마음",
            "tags": [
              "emotion",
              "fear"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "item": {
                "exact": "수습 기간 복장·정기권 준비비",
                "neutral": "그 준비비"
              },
              "institution": {
                "exact": "회사 복장 가이드",
                "neutral": "그 가이드",
                "judgeRef": "사내 가이드"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "spouse03:b:d-3:unlock:s5:0",
            "factText": "백화점 승인 알림만으로 사치라고 단정한 판단",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "item": {
                "exact": "백화점 승인 알림",
                "neutral": "그 알림"
              },
              "time": {
                "exact": "새벽 1시 18분 캡처",
                "neutral": "그때",
                "dateExact": "새벽 1시 18분",
                "period": "심야 확인 시점"
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
            "id": "spouse03:b:d-4:unlock:s2:0",
            "factText": "건조기 할부와 적금 조정을 사전 상의 없이 함께 밀어붙인 사실",
            "tags": [
              "rule",
              "responsibility"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "item": {
                "exact": "건조기 할부와 적금 조정",
                "neutral": "그 결정"
              },
              "rule": {
                "exact": "50만원 이상 사전 상의",
                "neutral": "그 규칙"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "spouse03:b:d-4:unlock:s3:0",
            "factText": "빨래 동선 단축을 생활 요령으로 믿었던 사정",
            "tags": [
              "context",
              "relationship"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "item": {
                "exact": "빨래 동선 단축",
                "neutral": "그 생활 편의"
              },
              "rule": {
                "exact": "50만원 이상 사전 상의",
                "neutral": "그 규칙"
              },
              "amount": {
                "exact": "84만원 할부",
                "neutral": "그 할부 금액",
                "rounded": "84만원"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S4": [
          {
            "id": "spouse03:b:d-4:unlock:s4:0",
            "factText": "창피해서 오히려 상식처럼 밀어붙인 마음",
            "tags": [
              "emotion",
              "shame"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "item": {
                "exact": "빨래 동선 단축",
                "neutral": "그 생활 편의"
              },
              "amount": {
                "exact": "84만원 할부",
                "neutral": "그 할부 금액",
                "rounded": "84만원"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "spouse03:b:d-4:unlock:s5:0",
            "factText": "50만원 이상 사전 상의 합의가 깨진 점",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "item": {
                "exact": "빨래 동선 단축",
                "neutral": "그 생활 편의"
              },
              "rule": {
                "exact": "50만원 이상 사전 상의",
                "neutral": "그 규칙"
              },
              "amount": {
                "exact": "84만원 할부",
                "neutral": "그 할부 금액",
                "rounded": "84만원"
              }
            },
            "stanceHints": [
              "confess",
              "emotional"
            ]
          }
        ]
      },
      "d-5": {
        "S2": [
          {
            "id": "spouse03:b:d-5:unlock:s2:0",
            "factText": "생활비 공백이 인호의 조정과 유진의 인출이 겹친 결과라는 사실",
            "tags": [
              "context",
              "responsibility"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "item": {
                "exact": "적금 정지·건조기 할부와 비상금 인출",
                "neutral": "그 숨긴 결정들"
              },
              "time": {
                "exact": "같은 전환기 주간",
                "neutral": "그 시기",
                "period": "첫 급여 전 공백기"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "spouse03:b:d-5:unlock:s3:0",
            "factText": "첫 급여 지연이 둘의 숨김을 더 크게 폭발시킨 사정",
            "tags": [
              "context",
              "timeline"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "institution": {
                "exact": "첫 급여 지연",
                "neutral": "그 일정",
                "judgeRef": "급여 일정"
              },
              "rule": {
                "exact": "한 사람 탓으로 몰기",
                "neutral": "그 단정"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S4": [
          {
            "id": "spouse03:b:d-5:unlock:s4:0",
            "factText": "가장 체면 때문에 한 사람 탓으로 세우려 한 마음",
            "tags": [
              "emotion",
              "fear"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "institution": {
                "exact": "첫 급여 지연",
                "neutral": "그 일정",
                "judgeRef": "급여 일정"
              },
              "rule": {
                "exact": "한 사람 탓으로 몰기",
                "neutral": "그 단정"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "spouse03:b:d-5:unlock:s5:0",
            "factText": "한 사람 탓으로 몰면 공통 원인이 가려지는 점",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "item": {
                "exact": "적금 정지·건조기 할부와 비상금 인출",
                "neutral": "그 숨긴 결정들"
              },
              "time": {
                "exact": "같은 전환기 주간",
                "neutral": "그 시기",
                "period": "첫 급여 전 공백기"
              },
              "institution": {
                "exact": "첫 급여 지연",
                "neutral": "그 일정",
                "judgeRef": "급여 일정"
              },
              "rule": {
                "exact": "한 사람 탓으로 몰기",
                "neutral": "그 단정"
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
        "id": "spouse03:contradiction:0",
        "targetParty": "a",
        "trigger": "노유진이 인출을 '잠깐 메운 일'이라 축소하면서 e-1과 e-2가 같은 주간 연쇄 결제를 함께 보여 줄 때",
        "text": "잠깐 메운 일이라기엔 공동 비상금 160만원 인출 직후 정장·구두·정기권 결제가 이어집니다. 출처와 용도를 동시에 숨긴 설명은 서로 맞물리지 않습니다.",
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
        "id": "spouse03:contradiction:1",
        "targetParty": "b",
        "trigger": "황인호가 적금 정지를 단순 조정이라고 하면서 건조기 할부와 무관하다고 말할 때",
        "text": "자동이체 정지 시각과 건조기 계약 시각이 같은 날 오후로 붙어 있습니다. 우연한 생활 조정이라는 말과 계획적 현금 재배치라는 기록이 충돌합니다.",
        "relatedDisputes": [
          "d-2",
          "d-4",
          "d-5"
        ],
        "evidenceIds": [
          "e-5",
          "e-6"
        ]
      },
      {
        "id": "spouse03:contradiction:2",
        "targetParty": "b",
        "trigger": "황인호가 백화점 결제를 전부 사치라고 단정할 때",
        "text": "승인 알림 캡처는 품목이 잘린 자료이고, 회사 가이드는 정장·구두가 선택이 아닌 준비 항목이라고 말합니다. 사치 단정은 증거의 맥락보다 먼저 나왔습니다.",
        "relatedDisputes": [
          "d-3"
        ],
        "evidenceIds": [
          "e-3",
          "e-4"
        ]
      },
      {
        "id": "spouse03:contradiction:3",
        "targetParty": "b",
        "trigger": "양측 중 한쪽이 생활비 구멍을 한 사람 책임으로 몰아갈 때 e-1, e-5, e-6이 함께 제시될 때",
        "text": "비상금 인출, 적금 정지, 건조기 할부가 모두 같은 전환기 안에서 겹칩니다. 한 사람 탓이라는 진술은 시간표 전체와 맞지 않습니다.",
        "relatedDisputes": [
          "d-5"
        ],
        "evidenceIds": [
          "e-1",
          "e-5",
          "e-6"
        ]
      }
    ],
    "interjections": [
      {
        "id": "spouse03:interjection:0",
        "speaker": "a",
        "trigger": "황인호가 백화점 결제를 반복해서 사치라고 부를 때",
        "text": "상호만 보지 말고 왜 샀는지 좀 보세요. 그걸 다 취미처럼 말하면 저는 더 설명하기 싫어져요.",
        "relatedDisputes": [
          "d-3"
        ]
      },
      {
        "id": "spouse03:interjection:1",
        "speaker": "b",
        "trigger": "노유진이 건조기 할부를 철없는 소비처럼 몰아붙일 때",
        "text": "내가 살림 모르냐. 빨래 한번 직접 돌려 보면 왜 그걸 급하게 잡았는지 알 거야.",
        "relatedDisputes": [
          "d-4",
          "d-5"
        ]
      },
      {
        "id": "spouse03:interjection:2",
        "speaker": "judge",
        "trigger": "양측이 상대의 체면과 인격을 먼저 공격하기 시작할 때",
        "text": "필요성과 무단 결정은 다른 문제입니다. 감정 표현은 잠시 멈추고, 질문에 대한 사실만 답하십시오.",
        "relatedDisputes": [
          "d-1",
          "d-2",
          "d-3",
          "d-4",
          "d-5"
        ]
      }
    ],
    "emotionalOutbursts": [
      {
        "id": "spouse03:outburst:a:0",
        "party": "a",
        "trigger": "노유진이 '사치했다'는 표현을 반복해서 들을 때",
        "text": "사치요? 새 회사에서 허술하게 보이면 바로 밀려나는 자리였어요. 그걸 철없는 쇼핑으로만 들으면 제가 왜 숨겼는지 하나도 안 보이잖아요.",
        "relatedDisputes": [
          "d-3"
        ]
      },
      {
        "id": "spouse03:outburst:a:1",
        "party": "a",
        "trigger": "공동 비상금 인출이 개인 욕심으로만 규정될 때",
        "text": "저도 알아요, 말했어야 했다는 거. 그런데 그때는 진짜 버티는 비용으로 느껴졌어요. 그걸 그냥 욕심이라고만 하면 너무 억울해요.",
        "relatedDisputes": [
          "d-1",
          "d-5"
        ]
      },
      {
        "id": "spouse03:outburst:b:0",
        "party": "b",
        "trigger": "황인호가 가계를 못 지탱한 사람이라는 취지로 몰릴 때",
        "text": "나도 집 굴리려고 한 거야. 나만 무책임한 사람처럼 세우면 더 짧게 말할 수밖에 없어.",
        "relatedDisputes": [
          "d-2",
          "d-5"
        ]
      },
      {
        "id": "spouse03:outburst:b:1",
        "party": "b",
        "trigger": "건조기 할부를 사치 경쟁처럼 단정할 때",
        "text": "건조기도 질투하냐는 말, 웃자고 한 거였어. 근데 그걸로 끝낼 일이 아니었던 건 알아도, 그때는 그게 제일 현실적이라고 믿었어.",
        "relatedDisputes": [
          "d-4"
        ]
      }
    ]
  },
  "transitionBeats": [
    {
      "id": "spouse03:transition:a:d-1:s0_s1",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "withdrawal_question",
      "line": "그걸 전부 숨긴 돈처럼만 보지 말아 주세요. 세부 금액과 시점은 제가 설명할게요.",
      "behaviorHint": "메모를 찾듯 손끝이 바빠진다."
    },
    {
      "id": "spouse03:transition:a:d-1:s1_s2",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-1_presented",
      "line": "은행 내역이 나오면 인출 자체는 부정하지 않겠습니다. 다만 왜 그 주에 그랬는지는 같이 봐 주세요.",
      "behaviorHint": "서류를 한 번 훑고 목소리가 낮아진다."
    },
    {
      "id": "spouse03:transition:a:d-1:s2_s3",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "purpose_followup",
      "line": "정장, 구두, 정기권이 첫 주에 몰렸어요. 제가 겁먹어서 설명을 늦춘 것도 맞고요.",
      "behaviorHint": "손을 모아 쥔 채 말이 느려진다."
    },
    {
      "id": "spouse03:transition:a:d-1:s3_s5",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-2_or_responsibility_question",
      "line": "네, 필요 비용이었어도 공동 비상금을 혼자 정한 건 제 책임이에요.",
      "behaviorHint": "어깨 힘이 빠지고 정면을 본다."
    },
    {
      "id": "spouse03:transition:a:d-3:s0_s1",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "department_store_question",
      "line": "상호만 보면 그렇게 보일 수 있어요. 그런데 실제 항목은 조금 다릅니다.",
      "behaviorHint": "입술을 다문 채 호흡을 고른다."
    },
    {
      "id": "spouse03:transition:a:d-3:s1_s2",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-3_presented",
      "line": "그 알림은 일부만 잘린 거예요. 실제론 출근 준비비가 더 많았어요.",
      "behaviorHint": "자료를 손끝으로 밀어 설명하려 한다."
    },
    {
      "id": "spouse03:transition:a:d-3:s2_s4",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S2",
      "toState": "S4",
      "trigger": "nonjudgmental_question_about_work_adaptation",
      "line": "복장 기준이 생각보다 엄격했고, 철없어 보일까 무서워서 말을 줄였어요.",
      "behaviorHint": "목소리가 작아지며 눈가가 흔들린다."
    },
    {
      "id": "spouse03:transition:a:d-3:s4_s5",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S4",
      "toState": "S5",
      "trigger": "e-4_or_emotion_threshold",
      "line": "사치성 쇼핑은 아니었어요. 그래도 그 맥락을 숨긴 책임은 제가 져야죠.",
      "behaviorHint": "긴 숨 뒤에 단정적으로 말한다."
    },
    {
      "id": "spouse03:transition:a:d-5:s0_s1",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "who_caused_shortage_question",
      "line": "제 선택만으로 구멍이 난 건 아니라는 말이에요. 다만 제 영향이 없었다고도 하진 않겠어요.",
      "behaviorHint": "손바닥을 아래로 내리며 진정시키려 한다."
    },
    {
      "id": "spouse03:transition:a:d-5:s1_s2",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-1_presented",
      "line": "비상금 인출이 공백을 키운 건 맞아요. 그건 숫자로도 부정하기 어렵죠.",
      "behaviorHint": "자료의 금액 부분을 잠깐 응시한다."
    },
    {
      "id": "spouse03:transition:a:d-5:s2_s3",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "first_salary_delay_followup",
      "line": "첫 급여가 늦어진 데다 적금 중단까지 겹쳐서 저는 더 몰린다고 느꼈어요.",
      "behaviorHint": "목소리가 얇아지고 억울함이 섞인다."
    },
    {
      "id": "spouse03:transition:a:d-5:s3_s5",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "shared_budget_question",
      "line": "결국 생활비 공백은 둘의 숨김이 겹친 결과였어요. 한 사람 탓으로 말하긴 어렵습니다.",
      "behaviorHint": "고개를 끄덕이며 결론을 받아들인다."
    },
    {
      "id": "spouse03:transition:b:d-2:s0_s1",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "auto_transfer_question",
      "line": "잠깐 돌린 건 맞아도 없앤 건 아니야. 다시 채울 생각이었다고.",
      "behaviorHint": "헛웃음을 짧게 뱉고 팔짱을 낀다."
    },
    {
      "id": "spouse03:transition:b:d-2:s1_s2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-5_presented",
      "line": "기록까지 나오면 멈춘 건 인정하지. 그날 현금이 비어 보였어.",
      "behaviorHint": "시선이 옆으로 미끄러진다."
    },
    {
      "id": "spouse03:transition:b:d-2:s2_s3",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "cashflow_followup",
      "line": "건조기 초회금까지 겹치니까 내가 먼저 굴린 거야. 말하면 막힐 것 같았고.",
      "behaviorHint": "짧은 문장을 빠르게 던진다."
    },
    {
      "id": "spouse03:transition:b:d-2:s3_s5",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-6_presented",
      "line": "메모까지 나오면 변명 못 해. 숨기고 정한 건 내 책임이야.",
      "behaviorHint": "무릎 위 손을 꼭 쥔다."
    },
    {
      "id": "spouse03:transition:b:d-4:s0_s1",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "appliance_question",
      "line": "건조기는 사치가 아니라 생활 동선 줄이는 거였어. 그렇게 생각해서 밀어붙였지.",
      "behaviorHint": "어깨를 으쓱하며 웃어넘기려 한다."
    },
    {
      "id": "spouse03:transition:b:d-4:s1_s2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "small_admission_about_convenience",
      "line": "그래, 상의는 없었어. 그래도 집 굴리는 데 바로 도움 될 거라 봤어.",
      "behaviorHint": "웃음을 지우고 짧게 인정한다."
    },
    {
      "id": "spouse03:transition:b:d-4:s2_s3",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "installment_term_question",
      "line": "할부까지 묻기 시작하면 내가 규칙을 두 번 건드린 셈이지. 그게 창피했어.",
      "behaviorHint": "말끝이 점점 짧아진다."
    },
    {
      "id": "spouse03:transition:b:d-4:s3_s5",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-6_presented",
      "line": "배송 문자까지 붙으면 더는 상식 운운 못 하지. 규칙 위반은 내가 인정할게.",
      "behaviorHint": "고개를 숙였다가 한 번만 끄덕인다."
    },
    {
      "id": "spouse03:transition:b:d-5:s0_s1",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "who_caused_shortage_question",
      "line": "내 조정이 영향 없었다고는 안 해. 그래도 그땐 유진 쪽이 더 크게 보였어.",
      "behaviorHint": "상체를 앞으로 숙인 채 말끝을 흐린다."
    },
    {
      "id": "spouse03:transition:b:d-5:s1_s2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-1_presented",
      "line": "비상금 내역이 나오면 한쪽만 말하긴 어렵지. 내 쪽도 같이 봐야 해.",
      "behaviorHint": "눈을 한 번 감았다 뜬다."
    },
    {
      "id": "spouse03:transition:b:d-5:s2_s3",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "e-5_presented",
      "line": "적금 정지와 할부가 붙어 있으면 내 책임도 커 보여. 나도 그건 알아.",
      "behaviorHint": "손가락 끝으로 책상을 두드리다 멈춘다."
    },
    {
      "id": "spouse03:transition:b:d-5:s3_s5",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "shared_budget_question",
      "line": "결국 둘 다 숨겨서 생활비 구멍이 난 거야. 한 사람 탓으로 세우던 말은 거둘게.",
      "behaviorHint": "힘이 빠진 듯 등을 기대고 말한다."
    }
  ]
} as const;

export default spouse03V3GameLoopData;
