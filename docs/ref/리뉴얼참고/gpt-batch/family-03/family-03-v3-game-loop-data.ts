export const family03V3GameLoopData = {
  "caseId": "family-03",
  "dossierCards": [
    {
      "id": "dossier-1",
      "name": "약속 문맥과 이체 흔들림",
      "description": "잘린 카톡과 은행 원본을 함께 대조해 약속의 범위와 감액 송금 책임을 가르는 카드.",
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
              "text": "최복자 씨, 이 캡처 바깥에 '6개월만 먼저 해보자'는 문장이 있었다는 걸 알고도 일부만 돌리신 겁니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d1.a.unlock.s2.temporary_term_seen",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q2",
              "text": "6개월 약속을 '장남이면 계속 책임져야 한다'는 말과 섞어 더 넓게 받아들이신 건 아닙니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "d1.a.unlock.s3.permanent_obligation_framing",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q3",
              "text": "재판부가 묻는 건 완전 단절인지, 아니면 사전 통보 없는 감액과 지연인지입니다. 복자 씨가 정말 문제 삼는 핵심은 후자 아닙니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d2.a.unlock.s3.no_advance_notice_harm",
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
              "text": "박정우 씨, 원본 대화에선 6개월과 60만원이 함께 적혀 있습니다. 기간과 금액 약속 자체는 인정합니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d1.b.unlock.s2.six_month_context",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q2",
              "text": "셋째 달 자동이체 해지를 본인 인증으로 직접 한 사실, 우발적 누락이 아니라 본인 결정이라는 점을 인정합니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d2.b.unlock.s2.cancelled_auto_transfer",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q3",
              "text": "35만원과 40만원 감액 송금을 '조금 밀린 것'처럼 표현한 건, 무책임한 장남으로 보이기 싫어서 아닙니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "d2.b.unlock.s4.face_saving_minimization",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-2",
      "name": "사용처와 공개 압박",
      "description": "용돈 사용처와 단톡 공개 시점을 한 카드에 묶어 숨긴 전용과 공개 압박의 층위를 가른다.",
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
              "text": "복자 씨, 정우 씨 용돈이 들어온 같은 날 수빈 씨 계좌로 20만원과 25만원이 빠져나간 사실은 부인하지 않으시죠?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d3.a.unlock.s2.same_day_transfers",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q2",
              "text": "그런데도 정우 씨에게는 전부 약값과 공과금이라고 말한 건, 사용처를 감춘 설명 아닙니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d3.a.unlock.s5.false_explanation",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q3",
              "text": "정우 씨에게 직접 다시 묻기 전에 친척과 교회 방에 먼저 올린 것, 상의 이전에 공개 압박의 시작이었다고 봐야 하지 않겠습니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "d4.a.unlock.s2.group_first_upload",
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
              "text": "박정우 씨, 이제는 어머니 설명만이 아니라 같은 날 수빈 씨 계좌로 돈이 이동한 기록도 확인됐습니다. 사용처가 분리되지 않았다는 점 보이십니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d3.b.unlock.s2.same_day_outflow_seen",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q2",
              "text": "당신이 더 문제 삼는 건 누나 지원 자체보다 '전부 약값과 공과금'이라는 설명이 거짓이었다는 점, 맞습니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d3.b.unlock.s3.trust_breach",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q3",
              "text": "친척과 교회 방에 퍼진 뒤 박정우 씨가 받은 피해는 단순 불쾌감이 아니라 공개된 체면 손상이라고 보아야 합니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "d4.b.unlock.s3.public_humiliation_effect",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-3",
      "name": "직접 납부 합의의 붕괴",
      "description": "통화 녹음과 주민센터 상담서를 맞춰 직접 납부 합의의 형성과 양쪽 미이행을 드러내는 카드.",
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
              "text": "복자 씨, 직접 납부로 바꾸자는 합의 뒤에도 다시 현금을 요구하고 영수증 공유를 멈춘 적 있지요?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d5.a.unlock.s2.cash_reversion",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q2",
              "text": "그 방식을 못 버틴 이유가 단순 불편이 아니라, 지출 내역이 드러나는 두려움 때문이었습니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d5.a.unlock.s4.nonjudgmental_fear",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q3",
              "text": "결국 이 합의는 정우 씨만 안 지킨 게 아니라 복자 씨도 다시 현금 방식으로 돌아서며 깨뜨렸다고 보아야 하지 않겠습니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "d5.a.unlock.s5.mutual_nonperformance",
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
              "text": "박정우 씨, 직접 납부로 바꾸자고 해 놓고 실제로는 한 차례만 납부한 것 맞습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d5.b.unlock.s2.one_time_payment_only",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q2",
              "text": "고지서 날짜를 볼 때마다 약속을 못 지킨 부담이 떠올라 확인 자체를 피한 적 있습니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d5.b.unlock.s4.avoided_bill_dates",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q3",
              "text": "따라서 이 합의 실패를 오로지 현금 요구 탓으로 돌릴 수 없고, 본인 실행 실패도 함께 인정해야 하지 않습니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "d5.b.unlock.s5.shared_failure_admission",
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
            "id": "d1.a.unlock.s2.temporary_term_seen",
            "factText": "복자는 원본 대화에 '6개월만 먼저 해보자'는 앞 문장이 있었다는 사실을 알고 있었다.",
            "tags": [
              "evidence",
              "timeline",
              "quote"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "amount": {
                "exact": "60만원",
                "neutral": "해당 금액"
              },
              "duration": {
                "exact": "6개월",
                "neutral": "그 기간"
              },
              "time": {
                "period": "독립 직후",
                "neutral": "그때"
              },
              "partyA": {
                "fullName": "최복자",
                "judgeRef": "복자 씨",
                "neutral": "어머니"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              }
            },
            "stanceHints": [
              "partial",
              "context"
            ]
          }
        ],
        "S3": [
          {
            "id": "d1.a.unlock.s3.permanent_obligation_framing",
            "factText": "복자는 '장남은 다르다'는 옛 말을 덧씌워 6개월 약속을 사실상 계속되는 의무처럼 받아들였다.",
            "tags": [
              "motive",
              "legacy_sentence",
              "relationship"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "amount": {
                "exact": "60만원",
                "neutral": "해당 금액"
              },
              "duration": {
                "exact": "6개월",
                "neutral": "그 기간"
              },
              "time": {
                "period": "독립 직후",
                "neutral": "그때"
              },
              "partyA": {
                "fullName": "최복자",
                "judgeRef": "복자 씨",
                "neutral": "어머니"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              },
              "legacy": {
                "exact": "'장남은 다르다'",
                "neutral": "옛 가족 말"
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
            "id": "d1.a.unlock.s4.burden_and_abandonment_fear",
            "factText": "손목 통증과 줄어든 근무시간 때문에 복자는 그 약속이 흔들릴 때마다 생계와 버림받음의 공포를 함께 느꼈다.",
            "tags": [
              "fear",
              "emotion",
              "context"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "amount": {
                "exact": "60만원",
                "neutral": "해당 금액"
              },
              "duration": {
                "exact": "6개월",
                "neutral": "그 기간"
              },
              "time": {
                "period": "독립 직후",
                "neutral": "그때"
              },
              "partyA": {
                "fullName": "최복자",
                "judgeRef": "복자 씨",
                "neutral": "어머니"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              },
              "health": {
                "exact": "손목 통증",
                "neutral": "건강 문제"
              }
            },
            "stanceHints": [
              "emotional",
              "hurt"
            ]
          }
        ],
        "S5": [
          {
            "id": "d1.a.unlock.s5.promise_was_limited",
            "factText": "복자는 정우의 약속이 실제로는 6개월 한정이었다는 점을 인정한다.",
            "tags": [
              "admission",
              "rule",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "amount": {
                "exact": "60만원",
                "neutral": "해당 금액"
              },
              "duration": {
                "exact": "6개월",
                "neutral": "그 기간"
              },
              "time": {
                "period": "독립 직후",
                "neutral": "그때"
              },
              "partyA": {
                "fullName": "최복자",
                "judgeRef": "복자 씨",
                "neutral": "어머니"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              }
            },
            "stanceHints": [
              "confession",
              "balanced"
            ]
          }
        ]
      },
      "d-2": {
        "S2": [
          {
            "id": "d2.a.unlock.s2.amount_drop_noted",
            "factText": "복자는 셋째 달부터 자동이체가 빠지고 35만원, 40만원이 늦게 들어왔다는 흐름을 알고 있었다.",
            "tags": [
              "act",
              "timeline",
              "threshold"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "autoTransfer": {
                "exact": "자동이체",
                "neutral": "정기 송금"
              },
              "monthRef": {
                "exact": "3개월째",
                "neutral": "그 시점"
              },
              "amount1": {
                "exact": "35만원",
                "neutral": "감액 송금 1"
              },
              "amount2": {
                "exact": "40만원",
                "neutral": "감액 송금 2"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              }
            },
            "stanceHints": [
              "partial",
              "fact"
            ]
          }
        ],
        "S3": [
          {
            "id": "d2.a.unlock.s3.no_advance_notice_harm",
            "factText": "복자가 크게 문제 삼은 핵심은 감액 자체만이 아니라 사전 통보가 전혀 없었다는 점이었다.",
            "tags": [
              "harm",
              "relationship",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "autoTransfer": {
                "exact": "자동이체",
                "neutral": "정기 송금"
              },
              "monthRef": {
                "exact": "3개월째",
                "neutral": "그 시점"
              },
              "amount1": {
                "exact": "35만원",
                "neutral": "감액 송금 1"
              },
              "amount2": {
                "exact": "40만원",
                "neutral": "감액 송금 2"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              }
            },
            "stanceHints": [
              "partial",
              "hurt"
            ]
          }
        ],
        "S4": [
          {
            "id": "d2.a.unlock.s4.date_anxiety",
            "factText": "복자는 같은 날짜에 돈이 들어오지 않는 상황을 생활고보다 먼저 버림의 신호처럼 받아들였다.",
            "tags": [
              "emotion",
              "fear",
              "context"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "autoTransfer": {
                "exact": "자동이체",
                "neutral": "정기 송금"
              },
              "monthRef": {
                "exact": "3개월째",
                "neutral": "그 시점"
              },
              "amount1": {
                "exact": "35만원",
                "neutral": "감액 송금 1"
              },
              "amount2": {
                "exact": "40만원",
                "neutral": "감액 송금 2"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              },
              "date": {
                "exact": "매달 같은 날짜",
                "neutral": "정해진 날짜"
              }
            },
            "stanceHints": [
              "emotional",
              "hurt"
            ]
          }
        ],
        "S5": [
          {
            "id": "d2.a.unlock.s5.late_but_not_zero",
            "factText": "복자는 정우가 전혀 보내지 않은 것은 아니고, 늦고 적게 보냈다는 점을 구분해 인정한다.",
            "tags": [
              "admission",
              "counter",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "autoTransfer": {
                "exact": "자동이체",
                "neutral": "정기 송금"
              },
              "monthRef": {
                "exact": "3개월째",
                "neutral": "그 시점"
              },
              "amount1": {
                "exact": "35만원",
                "neutral": "감액 송금 1"
              },
              "amount2": {
                "exact": "40만원",
                "neutral": "감액 송금 2"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              }
            },
            "stanceHints": [
              "confession",
              "balanced"
            ]
          }
        ]
      },
      "d-3": {
        "S2": [
          {
            "id": "d3.a.unlock.s2.same_day_transfers",
            "factText": "정우의 용돈이 들어온 같은 날 오후, 복자 계좌에서 수빈 계좌로 20만원과 25만원이 2시간 안에 빠져나갔다.",
            "tags": [
              "act",
              "timeline",
              "evidence",
              "beneficiary"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "beneficiary": {
                "fullName": "박수빈",
                "judgeRef": "수빈 씨",
                "neutral": "누나"
              },
              "amount1": {
                "exact": "20만원",
                "neutral": "소액 송금 1"
              },
              "amount2": {
                "exact": "25만원",
                "neutral": "소액 송금 2"
              },
              "time": {
                "period": "용돈 입금 후 2시간 안",
                "neutral": "같은 날 오후"
              },
              "purpose1": {
                "exact": "자격증 학원비",
                "neutral": "학원비"
              },
              "purpose2": {
                "exact": "교통카드 충전",
                "neutral": "교통비"
              },
              "partyA": {
                "fullName": "최복자",
                "judgeRef": "복자 씨",
                "neutral": "어머니"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              }
            },
            "stanceHints": [
              "partial",
              "fact"
            ]
          }
        ],
        "S3": [
          {
            "id": "d3.a.unlock.s3.academy_support",
            "factText": "그 송금의 실제 용도는 식료품 대납이 아니라 수빈의 자격증 학원비와 교통비 보조에 가까웠다.",
            "tags": [
              "motive",
              "context",
              "beneficiary"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "beneficiary": {
                "fullName": "박수빈",
                "judgeRef": "수빈 씨",
                "neutral": "누나"
              },
              "amount1": {
                "exact": "20만원",
                "neutral": "소액 송금 1"
              },
              "amount2": {
                "exact": "25만원",
                "neutral": "소액 송금 2"
              },
              "time": {
                "period": "용돈 입금 후 2시간 안",
                "neutral": "같은 날 오후"
              },
              "purpose1": {
                "exact": "자격증 학원비",
                "neutral": "학원비"
              },
              "purpose2": {
                "exact": "교통카드 충전",
                "neutral": "교통비"
              },
              "partyA": {
                "fullName": "최복자",
                "judgeRef": "복자 씨",
                "neutral": "어머니"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              }
            },
            "stanceHints": [
              "partial",
              "self_justification"
            ]
          }
        ],
        "S4": [
          {
            "id": "d3.a.unlock.s4.shame_about_two_children",
            "factText": "복자는 한 자식에게 받은 돈을 다른 자식에게 돌린 엄마처럼 보일까 두려워 사용처를 숨겼다.",
            "tags": [
              "shame",
              "fear",
              "relationship"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "beneficiary": {
                "fullName": "박수빈",
                "judgeRef": "수빈 씨",
                "neutral": "누나"
              },
              "amount1": {
                "exact": "20만원",
                "neutral": "소액 송금 1"
              },
              "amount2": {
                "exact": "25만원",
                "neutral": "소액 송금 2"
              },
              "time": {
                "period": "용돈 입금 후 2시간 안",
                "neutral": "같은 날 오후"
              },
              "purpose1": {
                "exact": "자격증 학원비",
                "neutral": "학원비"
              },
              "purpose2": {
                "exact": "교통카드 충전",
                "neutral": "교통비"
              },
              "partyA": {
                "fullName": "최복자",
                "judgeRef": "복자 씨",
                "neutral": "어머니"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              }
            },
            "stanceHints": [
              "emotional",
              "shame"
            ]
          }
        ],
        "S5": [
          {
            "id": "d3.a.unlock.s5.false_explanation",
            "factText": "복자는 정우에게 '전부 약값과 공과금에 썼다'고 말했지만, 실제로는 일부를 수빈 지원에 돌려썼음을 인정한다.",
            "tags": [
              "admission",
              "responsibility",
              "quote"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "beneficiary": {
                "fullName": "박수빈",
                "judgeRef": "수빈 씨",
                "neutral": "누나"
              },
              "amount1": {
                "exact": "20만원",
                "neutral": "소액 송금 1"
              },
              "amount2": {
                "exact": "25만원",
                "neutral": "소액 송금 2"
              },
              "time": {
                "period": "용돈 입금 후 2시간 안",
                "neutral": "같은 날 오후"
              },
              "purpose1": {
                "exact": "자격증 학원비",
                "neutral": "학원비"
              },
              "purpose2": {
                "exact": "교통카드 충전",
                "neutral": "교통비"
              },
              "partyA": {
                "fullName": "최복자",
                "judgeRef": "복자 씨",
                "neutral": "어머니"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              }
            },
            "stanceHints": [
              "confession",
              "responsibility"
            ]
          }
        ]
      },
      "d-4": {
        "S2": [
          {
            "id": "d4.a.unlock.s2.group_first_upload",
            "factText": "복자는 정우에게 직접 다시 항의하기 전에 친척 단톡과 교회 소모임에 약속 캡처를 먼저 올렸다.",
            "tags": [
              "timeline",
              "privacy",
              "evidence"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "group1": {
                "exact": "친척 단톡",
                "neutral": "가족 단체방"
              },
              "group2": {
                "exact": "교회 소모임",
                "neutral": "외부 소모임 방"
              },
              "message": {
                "exact": "'장남이 생활비를 끊었다'",
                "neutral": "공개 압박 문구"
              },
              "timing": {
                "exact": "정우에게 직접 항의하기 전",
                "neutral": "먼저"
              },
              "partyA": {
                "fullName": "최복자",
                "judgeRef": "복자 씨",
                "neutral": "어머니"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              }
            },
            "stanceHints": [
              "partial",
              "fact"
            ]
          }
        ],
        "S3": [
          {
            "id": "d4.a.unlock.s3.pressure_intent",
            "factText": "복자가 올린 문장은 중재 요청보다 '장남이 생활비를 끊었다'는 공개 압박 효과가 더 강했다.",
            "tags": [
              "motive",
              "harm",
              "privacy"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "group1": {
                "exact": "친척 단톡",
                "neutral": "가족 단체방"
              },
              "group2": {
                "exact": "교회 소모임",
                "neutral": "외부 소모임 방"
              },
              "message": {
                "exact": "'장남이 생활비를 끊었다'",
                "neutral": "공개 압박 문구"
              },
              "timing": {
                "exact": "정우에게 직접 항의하기 전",
                "neutral": "먼저"
              },
              "partyA": {
                "fullName": "최복자",
                "judgeRef": "복자 씨",
                "neutral": "어머니"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
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
            "id": "d4.a.unlock.s4.face_and_abandonment_fear",
            "factText": "복자는 장남에게 외면당한 어머니로 보일까 두려워 사람들이 보는 자리에서 먼저 증인을 만들려 했다.",
            "tags": [
              "shame",
              "fear",
              "relationship"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "group1": {
                "exact": "친척 단톡",
                "neutral": "가족 단체방"
              },
              "group2": {
                "exact": "교회 소모임",
                "neutral": "외부 소모임 방"
              },
              "message": {
                "exact": "'장남이 생활비를 끊었다'",
                "neutral": "공개 압박 문구"
              },
              "timing": {
                "exact": "정우에게 직접 항의하기 전",
                "neutral": "먼저"
              },
              "partyA": {
                "fullName": "최복자",
                "judgeRef": "복자 씨",
                "neutral": "어머니"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              }
            },
            "stanceHints": [
              "emotional",
              "fear"
            ]
          }
        ],
        "S5": [
          {
            "id": "d4.a.unlock.s5.public_shaming_admission",
            "factText": "복자는 단톡 공유가 하소연을 넘어 공개 압박이자 공개 망신으로 작동했다는 점을 인정한다.",
            "tags": [
              "admission",
              "responsibility",
              "privacy"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "group1": {
                "exact": "친척 단톡",
                "neutral": "가족 단체방"
              },
              "group2": {
                "exact": "교회 소모임",
                "neutral": "외부 소모임 방"
              },
              "message": {
                "exact": "'장남이 생활비를 끊었다'",
                "neutral": "공개 압박 문구"
              },
              "timing": {
                "exact": "정우에게 직접 항의하기 전",
                "neutral": "먼저"
              },
              "partyA": {
                "fullName": "최복자",
                "judgeRef": "복자 씨",
                "neutral": "어머니"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              }
            },
            "stanceHints": [
              "confession",
              "responsibility"
            ]
          }
        ]
      },
      "d-5": {
        "S2": [
          {
            "id": "d5.a.unlock.s2.cash_reversion",
            "factText": "복자는 직접 납부 합의 뒤 다시 현금 지원을 요구했고, 영수증 공유도 중단했다.",
            "tags": [
              "act",
              "rule",
              "responsibility"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "bill1": {
                "exact": "전기료",
                "neutral": "공과금 1"
              },
              "bill2": {
                "exact": "관리비",
                "neutral": "공과금 2"
              },
              "time": {
                "period": "두 번째 감액 송금 다음 날 밤",
                "neutral": "그 무렵"
              },
              "consultationTime": {
                "exact": "통화 이틀 뒤 오후 3시 11분",
                "neutral": "상담 시점"
              },
              "institution": {
                "fullName": "주민센터",
                "judgeRef": "주민센터",
                "neutral": "기관"
              },
              "manager": {
                "fullName": "장민석",
                "judgeRef": "관리소장",
                "neutral": "관리소장"
              },
              "counselor": {
                "fullName": "서주연",
                "judgeRef": "상담사",
                "neutral": "상담사"
              },
              "partyA": {
                "fullName": "최복자",
                "judgeRef": "복자 씨",
                "neutral": "어머니"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              }
            },
            "stanceHints": [
              "partial",
              "fact"
            ]
          }
        ],
        "S3": [
          {
            "id": "d5.a.unlock.s3.control_discomfort",
            "factText": "복자에게 영수증 공유는 투명성 약속이라기보다 아들에게 검사받는 통제처럼 느껴졌다.",
            "tags": [
              "emotion",
              "motive",
              "shame"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "bill1": {
                "exact": "전기료",
                "neutral": "공과금 1"
              },
              "bill2": {
                "exact": "관리비",
                "neutral": "공과금 2"
              },
              "time": {
                "period": "두 번째 감액 송금 다음 날 밤",
                "neutral": "그 무렵"
              },
              "consultationTime": {
                "exact": "통화 이틀 뒤 오후 3시 11분",
                "neutral": "상담 시점"
              },
              "institution": {
                "fullName": "주민센터",
                "judgeRef": "주민센터",
                "neutral": "기관"
              },
              "manager": {
                "fullName": "장민석",
                "judgeRef": "관리소장",
                "neutral": "관리소장"
              },
              "counselor": {
                "fullName": "서주연",
                "judgeRef": "상담사",
                "neutral": "상담사"
              },
              "partyA": {
                "fullName": "최복자",
                "judgeRef": "복자 씨",
                "neutral": "어머니"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              }
            },
            "stanceHints": [
              "partial",
              "self_justification"
            ]
          }
        ],
        "S4": [
          {
            "id": "d5.a.unlock.s4.nonjudgmental_fear",
            "factText": "복자는 지출 내역이 드러나면 자신의 궁색함과 다른 자녀 지원까지 함께 드러날까 두려워했다.",
            "tags": [
              "fear",
              "privacy",
              "context"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "bill1": {
                "exact": "전기료",
                "neutral": "공과금 1"
              },
              "bill2": {
                "exact": "관리비",
                "neutral": "공과금 2"
              },
              "time": {
                "period": "두 번째 감액 송금 다음 날 밤",
                "neutral": "그 무렵"
              },
              "consultationTime": {
                "exact": "통화 이틀 뒤 오후 3시 11분",
                "neutral": "상담 시점"
              },
              "institution": {
                "fullName": "주민센터",
                "judgeRef": "주민센터",
                "neutral": "기관"
              },
              "manager": {
                "fullName": "장민석",
                "judgeRef": "관리소장",
                "neutral": "관리소장"
              },
              "counselor": {
                "fullName": "서주연",
                "judgeRef": "상담사",
                "neutral": "상담사"
              },
              "partyA": {
                "fullName": "최복자",
                "judgeRef": "복자 씨",
                "neutral": "어머니"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              }
            },
            "stanceHints": [
              "emotional",
              "fear"
            ]
          }
        ],
        "S5": [
          {
            "id": "d5.a.unlock.s5.mutual_nonperformance",
            "factText": "복자는 직접 납부 합의가 깨진 데에 자신이 현금 요구로 돌아선 책임도 있다는 점을 인정한다.",
            "tags": [
              "admission",
              "responsibility",
              "relationship"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "bill1": {
                "exact": "전기료",
                "neutral": "공과금 1"
              },
              "bill2": {
                "exact": "관리비",
                "neutral": "공과금 2"
              },
              "time": {
                "period": "두 번째 감액 송금 다음 날 밤",
                "neutral": "그 무렵"
              },
              "consultationTime": {
                "exact": "통화 이틀 뒤 오후 3시 11분",
                "neutral": "상담 시점"
              },
              "institution": {
                "fullName": "주민센터",
                "judgeRef": "주민센터",
                "neutral": "기관"
              },
              "manager": {
                "fullName": "장민석",
                "judgeRef": "관리소장",
                "neutral": "관리소장"
              },
              "counselor": {
                "fullName": "서주연",
                "judgeRef": "상담사",
                "neutral": "상담사"
              },
              "partyA": {
                "fullName": "최복자",
                "judgeRef": "복자 씨",
                "neutral": "어머니"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              }
            },
            "stanceHints": [
              "confession",
              "balanced"
            ]
          }
        ]
      }
    },
    "b": {
      "d-1": {
        "S2": [
          {
            "id": "d1.b.unlock.s2.six_month_context",
            "factText": "원본 대화에는 '6개월만 먼저 해보자' 다음에 '매달 60은 내가 보낼게'가 이어져, 약속의 기간과 금액이 함께 드러난다.",
            "tags": [
              "evidence",
              "timeline",
              "quote"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "amount": {
                "exact": "60만원",
                "neutral": "해당 금액"
              },
              "duration": {
                "exact": "6개월",
                "neutral": "그 기간"
              },
              "time": {
                "period": "독립 직후",
                "neutral": "그때"
              },
              "partyA": {
                "fullName": "최복자",
                "judgeRef": "복자 씨",
                "neutral": "어머니"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              }
            },
            "stanceHints": [
              "partial",
              "fact"
            ]
          }
        ],
        "S3": [
          {
            "id": "d1.b.unlock.s3.ambiguous_silence",
            "factText": "정우는 어머니가 그 약속을 더 긴 의무로 받아들이는 기색을 알면서도 바로 정정하지 않았다.",
            "tags": [
              "motive",
              "relationship",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "amount": {
                "exact": "60만원",
                "neutral": "해당 금액"
              },
              "duration": {
                "exact": "6개월",
                "neutral": "그 기간"
              },
              "time": {
                "period": "독립 직후",
                "neutral": "그때"
              },
              "partyA": {
                "fullName": "최복자",
                "judgeRef": "복자 씨",
                "neutral": "어머니"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              }
            },
            "stanceHints": [
              "partial",
              "self_justification"
            ]
          }
        ],
        "S4": [
          {
            "id": "d1.b.unlock.s4.shame_about_limit",
            "factText": "정우는 장남 책임 이야기가 겹치자 '여기까지다'라는 기간 제한을 분명히 말하는 일을 부끄럽고 잔인하게 느꼈다.",
            "tags": [
              "shame",
              "emotion",
              "legacy_sentence"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "amount": {
                "exact": "60만원",
                "neutral": "해당 금액"
              },
              "duration": {
                "exact": "6개월",
                "neutral": "그 기간"
              },
              "time": {
                "period": "독립 직후",
                "neutral": "그때"
              },
              "partyA": {
                "fullName": "최복자",
                "judgeRef": "복자 씨",
                "neutral": "어머니"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              },
              "legacy": {
                "exact": "장남 책임",
                "neutral": "가족 역할 압박"
              }
            },
            "stanceHints": [
              "emotional",
              "shame"
            ]
          }
        ],
        "S5": [
          {
            "id": "d1.b.unlock.s5.promise_admission",
            "factText": "정우는 독립 당시 6개월 동안 월 60만원을 보내겠다고 분명히 약속한 사실을 인정한다.",
            "tags": [
              "admission",
              "rule",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "amount": {
                "exact": "60만원",
                "neutral": "해당 금액"
              },
              "duration": {
                "exact": "6개월",
                "neutral": "그 기간"
              },
              "time": {
                "period": "독립 직후",
                "neutral": "그때"
              },
              "partyA": {
                "fullName": "최복자",
                "judgeRef": "복자 씨",
                "neutral": "어머니"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              }
            },
            "stanceHints": [
              "confession",
              "responsibility"
            ]
          }
        ]
      },
      "d-2": {
        "S2": [
          {
            "id": "d2.b.unlock.s2.cancelled_auto_transfer",
            "factText": "은행 로그상 정우는 셋째 달에 본인 인증으로 자동이체를 직접 해지했다.",
            "tags": [
              "act",
              "evidence",
              "timeline"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "autoTransfer": {
                "exact": "자동이체",
                "neutral": "정기 송금"
              },
              "monthRef": {
                "exact": "3개월째",
                "neutral": "그 시점"
              },
              "amount1": {
                "exact": "35만원",
                "neutral": "감액 송금 1"
              },
              "amount2": {
                "exact": "40만원",
                "neutral": "감액 송금 2"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              }
            },
            "stanceHints": [
              "partial",
              "fact"
            ]
          }
        ],
        "S3": [
          {
            "id": "d2.b.unlock.s3.reduced_late_amounts",
            "factText": "정우는 이후 35만원과 40만원을 각각 늦게 송금했고, 그 전에 복자에게 미리 설명하지 않았다.",
            "tags": [
              "act",
              "timeline",
              "responsibility",
              "threshold"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "autoTransfer": {
                "exact": "자동이체",
                "neutral": "정기 송금"
              },
              "monthRef": {
                "exact": "3개월째",
                "neutral": "그 시점"
              },
              "amount1": {
                "exact": "35만원",
                "neutral": "감액 송금 1"
              },
              "amount2": {
                "exact": "40만원",
                "neutral": "감액 송금 2"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              }
            },
            "stanceHints": [
              "partial",
              "responsibility"
            ]
          }
        ],
        "S4": [
          {
            "id": "d2.b.unlock.s4.face_saving_minimization",
            "factText": "정우는 자신이 무책임한 장남처럼 보일까 두려워 감액과 지연을 '조금 밀린 것'처럼 축소해 말했다.",
            "tags": [
              "self_justification",
              "shame",
              "fear"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "autoTransfer": {
                "exact": "자동이체",
                "neutral": "정기 송금"
              },
              "monthRef": {
                "exact": "3개월째",
                "neutral": "그 시점"
              },
              "amount1": {
                "exact": "35만원",
                "neutral": "감액 송금 1"
              },
              "amount2": {
                "exact": "40만원",
                "neutral": "감액 송금 2"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              },
              "quote": {
                "exact": "'조금 밀린 거지'",
                "neutral": "축소 표현"
              }
            },
            "stanceHints": [
              "emotional",
              "self_justification"
            ]
          }
        ],
        "S5": [
          {
            "id": "d2.b.unlock.s5.no_notice_admission",
            "factText": "정우는 자동이체 해지와 감액 송금을 사전에 알리지 않은 책임이 자신에게 있음을 인정한다.",
            "tags": [
              "admission",
              "responsibility",
              "relationship"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "autoTransfer": {
                "exact": "자동이체",
                "neutral": "정기 송금"
              },
              "monthRef": {
                "exact": "3개월째",
                "neutral": "그 시점"
              },
              "amount1": {
                "exact": "35만원",
                "neutral": "감액 송금 1"
              },
              "amount2": {
                "exact": "40만원",
                "neutral": "감액 송금 2"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              }
            },
            "stanceHints": [
              "confession",
              "responsibility"
            ]
          }
        ]
      },
      "d-3": {
        "S2": [
          {
            "id": "d3.b.unlock.s2.same_day_outflow_seen",
            "factText": "정우는 통장과 문자 대조를 통해 자신의 용돈 일부가 같은 날 수빈 쪽으로 이동했다는 점을 확인하게 된다.",
            "tags": [
              "evidence",
              "timeline",
              "beneficiary"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "beneficiary": {
                "fullName": "박수빈",
                "judgeRef": "수빈 씨",
                "neutral": "누나"
              },
              "amount1": {
                "exact": "20만원",
                "neutral": "소액 송금 1"
              },
              "amount2": {
                "exact": "25만원",
                "neutral": "소액 송금 2"
              },
              "time": {
                "period": "용돈 입금 후 2시간 안",
                "neutral": "같은 날 오후"
              },
              "purpose1": {
                "exact": "자격증 학원비",
                "neutral": "학원비"
              },
              "purpose2": {
                "exact": "교통카드 충전",
                "neutral": "교통비"
              },
              "partyA": {
                "fullName": "최복자",
                "judgeRef": "복자 씨",
                "neutral": "어머니"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              }
            },
            "stanceHints": [
              "partial",
              "fact"
            ]
          }
        ],
        "S3": [
          {
            "id": "d3.b.unlock.s3.trust_breach",
            "factText": "정우에게 더 큰 상처였던 부분은 수빈 지원 자체보다, 복자가 그 사실을 숨기고 전부 약값과 공과금이라고 말한 점이다.",
            "tags": [
              "relationship",
              "responsibility",
              "quote"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "beneficiary": {
                "fullName": "박수빈",
                "judgeRef": "수빈 씨",
                "neutral": "누나"
              },
              "amount1": {
                "exact": "20만원",
                "neutral": "소액 송금 1"
              },
              "amount2": {
                "exact": "25만원",
                "neutral": "소액 송금 2"
              },
              "time": {
                "period": "용돈 입금 후 2시간 안",
                "neutral": "같은 날 오후"
              },
              "purpose1": {
                "exact": "자격증 학원비",
                "neutral": "학원비"
              },
              "purpose2": {
                "exact": "교통카드 충전",
                "neutral": "교통비"
              },
              "partyA": {
                "fullName": "최복자",
                "judgeRef": "복자 씨",
                "neutral": "어머니"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              }
            },
            "stanceHints": [
              "partial",
              "hurt"
            ]
          }
        ],
        "S4": [
          {
            "id": "d3.b.unlock.s4.sibling_resentment",
            "factText": "정우는 장남 몫이라며 보낸 돈이 상의 없이 형제 지원으로 섞였다는 사실에 오래 눌러둔 불공평함을 느낀다.",
            "tags": [
              "emotion",
              "fear",
              "relationship",
              "legacy_sentence"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "beneficiary": {
                "fullName": "박수빈",
                "judgeRef": "수빈 씨",
                "neutral": "누나"
              },
              "amount1": {
                "exact": "20만원",
                "neutral": "소액 송금 1"
              },
              "amount2": {
                "exact": "25만원",
                "neutral": "소액 송금 2"
              },
              "time": {
                "period": "용돈 입금 후 2시간 안",
                "neutral": "같은 날 오후"
              },
              "purpose1": {
                "exact": "자격증 학원비",
                "neutral": "학원비"
              },
              "purpose2": {
                "exact": "교통카드 충전",
                "neutral": "교통비"
              },
              "partyA": {
                "fullName": "최복자",
                "judgeRef": "복자 씨",
                "neutral": "어머니"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              },
              "legacy": {
                "exact": "장남 몫",
                "neutral": "가족 역할 부담"
              }
            },
            "stanceHints": [
              "emotional",
              "hurt"
            ]
          }
        ],
        "S5": [
          {
            "id": "d3.b.unlock.s5.partial_understanding",
            "factText": "정우는 수빈 지원이 필요할 수는 있어도, 그것이 자신의 생활비 약속과 섞였다면 미리 분리해 말했어야 한다고 인정한다.",
            "tags": [
              "admission",
              "rule",
              "context"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "beneficiary": {
                "fullName": "박수빈",
                "judgeRef": "수빈 씨",
                "neutral": "누나"
              },
              "amount1": {
                "exact": "20만원",
                "neutral": "소액 송금 1"
              },
              "amount2": {
                "exact": "25만원",
                "neutral": "소액 송금 2"
              },
              "time": {
                "period": "용돈 입금 후 2시간 안",
                "neutral": "같은 날 오후"
              },
              "purpose1": {
                "exact": "자격증 학원비",
                "neutral": "학원비"
              },
              "purpose2": {
                "exact": "교통카드 충전",
                "neutral": "교통비"
              },
              "partyA": {
                "fullName": "최복자",
                "judgeRef": "복자 씨",
                "neutral": "어머니"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              }
            },
            "stanceHints": [
              "confession",
              "balanced"
            ]
          }
        ]
      },
      "d-4": {
        "S2": [
          {
            "id": "d4.b.unlock.s2.group_message_timing",
            "factText": "단톡 내보내기 원본상 복자의 공개 글은 정우에게 직접 다시 항의하기보다 먼저 올라갔다.",
            "tags": [
              "evidence",
              "timeline",
              "privacy"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "group1": {
                "exact": "친척 단톡",
                "neutral": "가족 단체방"
              },
              "group2": {
                "exact": "교회 소모임",
                "neutral": "외부 소모임 방"
              },
              "message": {
                "exact": "'장남이 생활비를 끊었다'",
                "neutral": "공개 압박 문구"
              },
              "timing": {
                "exact": "정우에게 직접 항의하기 전",
                "neutral": "먼저"
              },
              "partyA": {
                "fullName": "최복자",
                "judgeRef": "복자 씨",
                "neutral": "어머니"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              }
            },
            "stanceHints": [
              "partial",
              "fact"
            ]
          }
        ],
        "S3": [
          {
            "id": "d4.b.unlock.s3.public_humiliation_effect",
            "factText": "정우는 그 글로 인해 생활비 다툼보다 먼저 친척과 교회 사람들 앞에서 체면이 무너졌다고 느꼈다.",
            "tags": [
              "harm",
              "relationship",
              "privacy"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "group1": {
                "exact": "친척 단톡",
                "neutral": "가족 단체방"
              },
              "group2": {
                "exact": "교회 소모임",
                "neutral": "외부 소모임 방"
              },
              "message": {
                "exact": "'장남이 생활비를 끊었다'",
                "neutral": "공개 압박 문구"
              },
              "timing": {
                "exact": "정우에게 직접 항의하기 전",
                "neutral": "먼저"
              },
              "partyA": {
                "fullName": "최복자",
                "judgeRef": "복자 씨",
                "neutral": "어머니"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              }
            },
            "stanceHints": [
              "partial",
              "hurt"
            ]
          }
        ],
        "S4": [
          {
            "id": "d4.b.unlock.s4.unanswered_calls_context",
            "factText": "정우는 자신의 지연된 답변과 회피가 복자의 불안을 키웠다는 맥락도 알고 있다.",
            "tags": [
              "context",
              "responsibility",
              "emotion"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "group1": {
                "exact": "친척 단톡",
                "neutral": "가족 단체방"
              },
              "group2": {
                "exact": "교회 소모임",
                "neutral": "외부 소모임 방"
              },
              "message": {
                "exact": "'장남이 생활비를 끊었다'",
                "neutral": "공개 압박 문구"
              },
              "timing": {
                "exact": "정우에게 직접 항의하기 전",
                "neutral": "먼저"
              },
              "partyA": {
                "fullName": "최복자",
                "judgeRef": "복자 씨",
                "neutral": "어머니"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
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
            "id": "d4.b.unlock.s5.boundary_rule",
            "factText": "정우는 자신이 빨리 설명하지 못한 잘못과 별개로, 가족 문제를 단톡으로 퍼뜨린 행위는 경계를 넘었다고 정리한다.",
            "tags": [
              "admission",
              "rule",
              "privacy"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "group1": {
                "exact": "친척 단톡",
                "neutral": "가족 단체방"
              },
              "group2": {
                "exact": "교회 소모임",
                "neutral": "외부 소모임 방"
              },
              "message": {
                "exact": "'장남이 생활비를 끊었다'",
                "neutral": "공개 압박 문구"
              },
              "timing": {
                "exact": "정우에게 직접 항의하기 전",
                "neutral": "먼저"
              },
              "partyA": {
                "fullName": "최복자",
                "judgeRef": "복자 씨",
                "neutral": "어머니"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              }
            },
            "stanceHints": [
              "confession",
              "balanced"
            ]
          }
        ]
      },
      "d-5": {
        "S2": [
          {
            "id": "d5.b.unlock.s2.one_time_payment_only",
            "factText": "정우는 직접 납부 방식으로 바꾸자고 한 뒤 실제로는 한 차례만 공과금을 직접 냈다.",
            "tags": [
              "act",
              "timeline",
              "evidence"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "bill1": {
                "exact": "전기료",
                "neutral": "공과금 1"
              },
              "bill2": {
                "exact": "관리비",
                "neutral": "공과금 2"
              },
              "time": {
                "period": "두 번째 감액 송금 다음 날 밤",
                "neutral": "그 무렵"
              },
              "consultationTime": {
                "exact": "통화 이틀 뒤 오후 3시 11분",
                "neutral": "상담 시점"
              },
              "institution": {
                "fullName": "주민센터",
                "judgeRef": "주민센터",
                "neutral": "기관"
              },
              "manager": {
                "fullName": "장민석",
                "judgeRef": "관리소장",
                "neutral": "관리소장"
              },
              "counselor": {
                "fullName": "서주연",
                "judgeRef": "상담사",
                "neutral": "상담사"
              },
              "partyA": {
                "fullName": "최복자",
                "judgeRef": "복자 씨",
                "neutral": "어머니"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              }
            },
            "stanceHints": [
              "partial",
              "fact"
            ]
          }
        ],
        "S3": [
          {
            "id": "d5.b.unlock.s3.receipt_followthrough_gap",
            "factText": "정우는 납부 루틴을 계속 관리하지 않았고, 영수증 공유가 끊겼을 때도 다시 제안하거나 확인하지 않았다.",
            "tags": [
              "responsibility",
              "rule",
              "context"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "bill1": {
                "exact": "전기료",
                "neutral": "공과금 1"
              },
              "bill2": {
                "exact": "관리비",
                "neutral": "공과금 2"
              },
              "time": {
                "period": "두 번째 감액 송금 다음 날 밤",
                "neutral": "그 무렵"
              },
              "consultationTime": {
                "exact": "통화 이틀 뒤 오후 3시 11분",
                "neutral": "상담 시점"
              },
              "institution": {
                "fullName": "주민센터",
                "judgeRef": "주민센터",
                "neutral": "기관"
              },
              "manager": {
                "fullName": "장민석",
                "judgeRef": "관리소장",
                "neutral": "관리소장"
              },
              "counselor": {
                "fullName": "서주연",
                "judgeRef": "상담사",
                "neutral": "상담사"
              },
              "partyA": {
                "fullName": "최복자",
                "judgeRef": "복자 씨",
                "neutral": "어머니"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              }
            },
            "stanceHints": [
              "partial",
              "responsibility"
            ]
          }
        ],
        "S4": [
          {
            "id": "d5.b.unlock.s4.avoided_bill_dates",
            "factText": "정우는 고지서 날짜를 볼 때마다 앞선 약속 실패가 떠올라 확인과 납부를 미루는 회피를 반복했다.",
            "tags": [
              "fear",
              "emotion",
              "self_justification"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "bill1": {
                "exact": "전기료",
                "neutral": "공과금 1"
              },
              "bill2": {
                "exact": "관리비",
                "neutral": "공과금 2"
              },
              "time": {
                "period": "두 번째 감액 송금 다음 날 밤",
                "neutral": "그 무렵"
              },
              "consultationTime": {
                "exact": "통화 이틀 뒤 오후 3시 11분",
                "neutral": "상담 시점"
              },
              "institution": {
                "fullName": "주민센터",
                "judgeRef": "주민센터",
                "neutral": "기관"
              },
              "manager": {
                "fullName": "장민석",
                "judgeRef": "관리소장",
                "neutral": "관리소장"
              },
              "counselor": {
                "fullName": "서주연",
                "judgeRef": "상담사",
                "neutral": "상담사"
              },
              "partyA": {
                "fullName": "최복자",
                "judgeRef": "복자 씨",
                "neutral": "어머니"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              }
            },
            "stanceHints": [
              "emotional",
              "avoidance"
            ]
          }
        ],
        "S5": [
          {
            "id": "d5.b.unlock.s5.shared_failure_admission",
            "factText": "정우는 직접 납부 합의 실패를 복자의 현금 요구만으로 돌릴 수 없고, 자신의 실행 실패도 컸음을 인정한다.",
            "tags": [
              "admission",
              "responsibility",
              "relationship"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "bill1": {
                "exact": "전기료",
                "neutral": "공과금 1"
              },
              "bill2": {
                "exact": "관리비",
                "neutral": "공과금 2"
              },
              "time": {
                "period": "두 번째 감액 송금 다음 날 밤",
                "neutral": "그 무렵"
              },
              "consultationTime": {
                "exact": "통화 이틀 뒤 오후 3시 11분",
                "neutral": "상담 시점"
              },
              "institution": {
                "fullName": "주민센터",
                "judgeRef": "주민센터",
                "neutral": "기관"
              },
              "manager": {
                "fullName": "장민석",
                "judgeRef": "관리소장",
                "neutral": "관리소장"
              },
              "counselor": {
                "fullName": "서주연",
                "judgeRef": "상담사",
                "neutral": "상담사"
              },
              "partyA": {
                "fullName": "최복자",
                "judgeRef": "복자 씨",
                "neutral": "어머니"
              },
              "partyB": {
                "fullName": "박정우",
                "judgeRef": "정우 씨",
                "neutral": "아들"
              }
            },
            "stanceHints": [
              "confession",
              "balanced"
            ]
          }
        ]
      }
    }
  },
  "events": {
    "contradictions": [
      {
        "id": "contradiction-1",
        "text": "복자가 제시한 캡처에는 '매달 60만원'만 남아 있지만, 원본 대화에는 그 앞에 '6개월만 먼저 해보자'가 붙어 있다.",
        "relatedDisputes": [
          "d-1"
        ],
        "evidenceIds": [
          "e-1",
          "e-2"
        ],
        "severity": "high",
        "trigger": "잘린 약속 vs 원본 문맥"
      },
      {
        "id": "contradiction-2",
        "text": "복자는 '끊었다'고 말하지만 은행 원본상 정우는 35만원, 40만원을 늦게 보냈고 쟁점은 단절과 감액·지연의 구분으로 이동한다.",
        "relatedDisputes": [
          "d-2"
        ],
        "evidenceIds": [
          "e-2"
        ],
        "severity": "high",
        "trigger": "끊긴 생활비 vs 늦고 줄어든 송금"
      },
      {
        "id": "contradiction-3",
        "text": "복자는 전부 자신의 약값과 공과금이라고 주장하지만, 같은 날 수빈 계좌로 20만원과 25만원이 이동한 기록이 맞물린다.",
        "relatedDisputes": [
          "d-3"
        ],
        "evidenceIds": [
          "e-3"
        ],
        "severity": "high",
        "trigger": "약값 전부 사용 vs 수빈 계좌 동시 송금"
      },
      {
        "id": "contradiction-4",
        "text": "복자는 단톡 게시를 상의였다고, 정우는 직접 납부는 합의가 아니었다고 말하지만 원본 대화와 상담 확인서는 각각 공개 압박의 선행과 납부 방식 합의를 입증한다.",
        "relatedDisputes": [
          "d-4",
          "d-5"
        ],
        "evidenceIds": [
          "e-4",
          "e-5",
          "e-6"
        ],
        "severity": "medium",
        "trigger": "상의용 공유 vs 직접 납부 합의 존재"
      }
    ],
    "interjections": [
      {
        "id": "interjection-1",
        "speaker": "a",
        "trigger": "b가 수입 변동 설명을 길게 시작할 때",
        "line": "또 출근 시간부터 길게 얘기하네. 돈이 줄고 늦어진 건 사실이잖아요.",
        "behaviorHint": "말을 자르며 손바닥으로 공중을 짧게 친다.",
        "relatedDisputes": [
          "d-1",
          "d-2"
        ]
      },
      {
        "id": "interjection-2",
        "speaker": "b",
        "trigger": "a가 아버지나 장남 의무를 반복할 때",
        "line": "아버지 말까지 지금 가져오면 숫자 얘기가 또 흐려지잖아요.",
        "behaviorHint": "턱을 굳히고 말을 반 박자 빠르게 끊는다.",
        "relatedDisputes": [
          "d-1",
          "d-3"
        ]
      },
      {
        "id": "interjection-3",
        "speaker": "a",
        "trigger": "b가 직접 납부 합의를 '얘기만 한 것'이라 축소할 때",
        "line": "녹음까지 있는데 그걸 그냥 말만 오간 걸로 하면 제가 더 바보가 되죠.",
        "behaviorHint": "의자에서 몸을 앞으로 내밀며 쏘아붙인다.",
        "relatedDisputes": [
          "d-5"
        ]
      }
    ],
    "emotionalOutbursts": [
      {
        "id": "outburst-a-1",
        "party": "a",
        "trigger": "d-4에서 공개망신 여부를 정면으로 지적받을 때",
        "line": "내가 그 방들 말고 어디서 살려 달라 하냐고요. 집에서 혼자 버티는 사람 심정을 아무도 몰라요.",
        "behaviorHint": "목이 잠기고 마지막 문장에서 눈물이 고인다.",
        "relatedDisputes": [
          "d-4"
        ]
      },
      {
        "id": "outburst-a-2",
        "party": "a",
        "trigger": "d-3에서 수빈 지원을 인정한 직후",
        "line": "딸 하나 아들 하나 다 내 자식인데, 제가 누구 하나 버리자고 그런 건 아니었어요.",
        "behaviorHint": "가슴 쪽을 두 번 짚으며 울컥한다.",
        "relatedDisputes": [
          "d-3",
          "d-5"
        ]
      },
      {
        "id": "outburst-b-1",
        "party": "b",
        "trigger": "d-4에서 단톡 내보내기 파일이 제시될 때",
        "line": "친척들 앞에서 이미 사람 만들어 놓고 이제 와 상의였다고 하면 저는 뭐가 됩니까.",
        "behaviorHint": "입술을 깨물다가 결국 목소리가 높아진다.",
        "relatedDisputes": [
          "d-4"
        ]
      },
      {
        "id": "outburst-b-2",
        "party": "b",
        "trigger": "d-1·d-3에서 장남 몫 이야기가 겹칠 때",
        "line": "장남이라는 말로 시작하면 제가 한 약속도, 못 한 설명도 다 평생 빚처럼 남아요.",
        "behaviorHint": "웃음기 없는 표정으로 한 문장을 길게 밀어붙인다.",
        "relatedDisputes": [
          "d-1",
          "d-3"
        ]
      }
    ]
  },
  "transitionBeats": [
    {
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "allowance_use_question",
      "line": "월세도 냈고, 약값도 냈고… 다 집안일에 쓴 돈이었다고요. 따로 뺀 게 아니에요.",
      "behaviorHint": "열거가 빨라지고 눈을 맞추는 시간을 줄인다.",
      "id": "family03:transition:a:d-3:s0_s1"
    },
    {
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-3_presented",
      "line": "조금 보낸 건 맞아요. 그 부분까지 아니라고 하면 안 될 것 같아요.",
      "behaviorHint": "서류를 한 번 보고 입술을 다문 뒤 짧게 인정한다.",
      "id": "family03:transition:a:d-3:s1_s2"
    },
    {
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "sister_support_followup",
      "line": "학원비도 있었고 교통비도 있었어요. 숨긴 건… 체면 때문이었어요. 말하기가 초라해서요.",
      "behaviorHint": "목소리가 낮아지고 말끝이 길어진다.",
      "id": "family03:transition:a:d-3:s2_s3"
    },
    {
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "responsibility_question",
      "line": "약값에만 썼다는 말… 거짓이었어요. 더 이상 살림 핑계를 댈 수가 없어요.",
      "behaviorHint": "한숨 뒤에 시선을 떨어뜨리고 짧게 고백한다.",
      "id": "family03:transition:a:d-3:s3_s5"
    },
    {
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "family_group_chat_question",
      "line": "상의였어요, 상의. 친척들한테 물어본 거지 일부러 퍼뜨린 게 아니에요.",
      "behaviorHint": "되묻는 말투가 늘고 손을 모은다.",
      "id": "family03:transition:a:d-4:s0_s1"
    },
    {
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-4_presented",
      "line": "올린 건 맞아요. 답답해서 그랬어요. 그 마음을 어디다 말해요.",
      "behaviorHint": "서둘러 변명하려다 문장 사이가 끊긴다.",
      "id": "family03:transition:a:d-4:s1_s2"
    },
    {
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "group_size_followup",
      "line": "같은 말을 두 방에 올린 거… 그게 압박처럼 보였겠죠. 저도 알아요.",
      "behaviorHint": "표정이 굳고 손끝을 꼼지락거린다.",
      "id": "family03:transition:a:d-4:s2_s3"
    },
    {
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "privacy_boundary_question",
      "line": "제가 넘었어요. 공개적으로 망신을 준 거나 다름없었다는 거… 받아들여요.",
      "behaviorHint": "말을 멈췄다가 낮게 '제가 넘었어요'라고 말한다.",
      "id": "family03:transition:a:d-4:s3_s5"
    },
    {
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "direct_payment_question",
      "line": "한번 해보자 했던 수준이었어요. 확실하게 정한 건 아니었다고요.",
      "behaviorHint": "단정적인 어조가 조금 풀리고 설명이 길어진다.",
      "id": "family03:transition:a:d-5:s0_s1"
    },
    {
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S1",
      "toState": "S4",
      "trigger": "nonjudgmental_question_about_bill_fear",
      "line": "영수증 보여주는 게… 두려웠어요. 초라하잖아요, 그게. 돈 쓴 거 하나하나 보이는 게요.",
      "behaviorHint": "눈가가 젖고 한숨 뒤에 속내가 나온다.",
      "id": "family03:transition:a:d-5:s1_s4"
    },
    {
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S4",
      "toState": "S3",
      "trigger": "e-5_presented",
      "line": "합의는 했어요. 다만 오래 못 갔어요. 현실적으로 계속 그렇게 하기가 어려웠거든요.",
      "behaviorHint": "감정이 올라왔다가 다시 방어적으로 굳는다.",
      "id": "family03:transition:a:d-5:s4_s3"
    },
    {
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-6_presented",
      "line": "다시 현금으로 달라고 한 건… 제 잘못이에요. 제 몫의 책임까지 인정해요.",
      "behaviorHint": "서류를 보고 체념한 듯 고개를 끄덕인다.",
      "id": "family03:transition:a:d-5:s3_s5"
    },
    {
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "missed_transfer_question",
      "line": "조금 비튼 것 같긴 해요. 날짜가 좀 밀린 건 맞는데요.",
      "behaviorHint": "숫자를 먼저 말하고 문장 끝을 흐린다.",
      "id": "family03:transition:b:d-2:s0_s1"
    },
    {
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-2_presented",
      "line": "자동이체 해지한 건 맞아요. 그 부분은 인정해요.",
      "behaviorHint": "짧게 인정하고 곧바로 해명을 준비한다.",
      "id": "family03:transition:b:d-2:s1_s2"
    },
    {
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "auto_transfer_cancel_reason",
      "line": "수입이 좀 줄었거든요. 말씀드리려다 타이밍을 놓친 것 같아요. 변명처럼 들리겠지만요.",
      "behaviorHint": "답을 순서대로 늘어놓으며 핵심을 뒤로 민다.",
      "id": "family03:transition:b:d-2:s2_s3"
    },
    {
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "responsibility_question",
      "line": "말씀 안 드리고 줄이고, 늦추고… 그건 제 잘못이에요.",
      "behaviorHint": "짧은 사과 후 더는 방향을 틀지 못한다.",
      "id": "family03:transition:b:d-2:s3_s5"
    },
    {
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-1",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "promise_duration_question",
      "line": "평생 드리겠다고 한 건 아니었어요. 몇 달 정도 도움을 드리겠다는 거였는데요.",
      "behaviorHint": "초반은 단정적이고 후반은 길게 이어 말한다.",
      "id": "family03:transition:b:d-1:s0_s1"
    },
    {
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-1",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-1_presented",
      "line": "6개월, 60만원… 네, 그렇게 말한 건 맞아요.",
      "behaviorHint": "짧게 숨을 내쉬고 숫자를 그대로 반복한다.",
      "id": "family03:transition:b:d-1:s1_s2"
    },
    {
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-1",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "full_chat_context_question",
      "line": "장남이니까 분위기를 맞춰야 했거든요. 어머니한테 정리를 안 드린 건… 그건 제가 잘못한 거 맞아요.",
      "behaviorHint": "어깨를 움츠리고 시선을 비껴간다.",
      "id": "family03:transition:b:d-1:s2_s3"
    },
    {
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-1",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-2_presented",
      "line": "약속 자체도, 그걸 흐리게 만든 것도 다 제 책임이에요. 인정해요.",
      "behaviorHint": "더는 순서를 늘이지 못하고 한 번에 답한다.",
      "id": "family03:transition:b:d-1:s3_s5"
    },
    {
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "direct_payment_question",
      "line": "한 번은 직접 낸 적 있어요. 합의가 없었다고까지 하긴 그렇네요.",
      "behaviorHint": "처음 문장은 짧고, 다음 문장은 길어진다.",
      "id": "family03:transition:b:d-5:s0_s1"
    },
    {
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "bill_receipt_question",
      "line": "네, 한 번 직접 낸 건 맞아요. 고지서 받아서 처리한 적 있어요.",
      "behaviorHint": "고개를 끄덕이지만 눈은 맞추지 않는다.",
      "id": "family03:transition:b:d-5:s1_s2"
    },
    {
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "e-5_presented",
      "line": "그 뒤로 루틴을 관리 못 했어요. 다시 정리하려는 시도도 안 했고요.",
      "behaviorHint": "설명 순서가 느려지고 변명과 인정이 섞인다.",
      "id": "family03:transition:b:d-5:s2_s3"
    },
    {
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "shared_responsibility_question",
      "line": "현금 요구만 탓할 수는 없어요. 저도 직접 납부 합의를 놓친 거니까요.",
      "behaviorHint": "짧게 사과한 뒤 문장을 더 붙이지 않는다.",
      "id": "family03:transition:b:d-5:s3_s5"
    }
  ]
}
