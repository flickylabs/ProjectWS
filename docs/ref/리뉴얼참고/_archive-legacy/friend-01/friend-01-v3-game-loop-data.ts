export const friend01V3GameLoopData = {
  "caseId": "friend-01",
  "dossierCards": [
    {
      "id": "dossier-1",
      "name": "중간 숫자와 원본 로그",
      "description": "중간 캡처가 만든 18만4천원 착시와 원본 로그의 시간차를 대조한다.",
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
              "text": "서도윤, 당신은 18만4천원이 최종액이 아니라고 말합니다. 그렇다면 원본 CSV가 나오기 전에도 그 화면이 중간값이라는 근거를 알고 있었습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d3.a.unlock.s2.mid_screen_not_final",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q2",
              "text": "중간 화면이 오해를 부른다고 알면서도 왜 7만원 차용과 9만2천원 환급을 분리 설명하지 않았습니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d3.a.unlock.s3.frame_and_loan_got_mixed",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q3",
              "text": "원본 확인 전 제3자 해석 금지 약속이 있는데, 김수아에게 상계 얘기를 먼저 한 이유는 무엇입니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "d5.a.unlock.s2.kimsua_side_message",
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
              "text": "정하린, 당신이 본 18만4천원 캡처는 자동분배 완료 전 화면입니다. 원본 로그가 나오면 그 숫자를 최종 정산처럼 말한 근거가 남습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d3.b.unlock.s2.csv_reorders_balance",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q2",
              "text": "원본 없는 중간 캡처를 먼저 김수아에게 보낸 시점에서, 당신이 사실 확인보다 확산을 앞세운 것 아닙니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "d2.b.unlock.s2.capture_shared_first",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q3",
              "text": "도윤의 숨김이 있었다고 해도, 중간 캡처와 해석을 먼저 퍼뜨린 순간 당신도 약속을 깬 것 아닙니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d5.b.unlock.s2.no_spread_rule_broken",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-2",
      "name": "환급과 상계 시도",
      "description": "보증금 환급 시각과 김수아 대화가 상계 판단의 선행 여부를 드러낸다.",
      "evidenceIds": [
        "e-3",
        "e-4"
      ],
      "relatedDisputes": [
        "d-1",
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
              "text": "체크아웃 직후 9만2천원 환급을 확인하고도 왜 정산표와 상대방에게 바로 알리지 않았습니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d1.a.unlock.s2.refund_received",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q2",
              "text": "오후 2시에 '택시값 먼저 빼고 말하자'고 적은 뒤에도, 하린에게는 그 계산 방식을 먼저 묻지 않았지요?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "d1.a.unlock.s3.offset_before_notice",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q3",
              "text": "당신이 남긴 메모대로라면 7만원은 별도 차용입니다. 보증금 환급과 상계할 권한을 누가 당신에게 준 겁니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d4.a.unlock.s2.loan_exists",
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
              "text": "환급 시각이 당신의 중간 캡처보다 앞섭니다. 그렇다면 당신이 본 '도윤의 과다 부담' 장면은 이미 누락된 숫자를 전제로 한 것 아닙니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d1.b.unlock.s2.delay_confirmed",
                "lieAdvance": false
              }
            },
            {
              "id": "dossier-2.b.q2",
              "text": "도윤이 먼저 말하지 않았다는 분노와 별개로, 당신도 그 공백을 의도 단정으로 채운 것 아닙니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d3.b.unlock.s3.hidden_refund_fueled_suspicion",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q3",
              "text": "환급 은닉을 묻는 자리와 공개 공유를 정당화하는 자리는 다릅니다. 그 선을 구분하지 못한 이유가 무엇입니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d5.b.unlock.s3.doyun_also_leaked",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-3",
      "name": "스토리, 영수증, 남은 7만원",
      "description": "저격성 스토리의 지목성과 택시 영수증·차용 메모를 함께 대조해 공개성·채무성을 동시에 건드린다.",
      "evidenceIds": [
        "e-5",
        "e-6"
      ],
      "relatedDisputes": [
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
              "text": "당신은 평판 피해를 말합니다. 그렇다면 왜 7만원 차용을 명확히 갚아 그 약점을 먼저 없애지 않았습니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d4.a.unlock.s4.cashflow_shame",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q2",
              "text": "친한친구 스토리가 지목성 높았다는 건 맞더라도, 당신 역시 비공개 누설을 예외로 여긴 것 아닙니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "d5.a.unlock.s4.fear_of_losing_face",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q3",
              "text": "최종 차액이 2만2천원 수준이라면, 당신이 지금도 붙들고 있는 핵심은 숫자가 아니라 체면 아닙니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "d3.a.unlock.s4.stigma_fear",
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
              "text": "이 스토리는 이름이 없어도 같은 여행 사진과 문구 때문에 대상이 특정됩니다. 아직도 '그냥 감정글'이라고 보십니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "d2.b.unlock.s3.target_was_obvious",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q2",
              "text": "택시비 7만원이 별도 차용으로 남는다고 해도, 그것이 18만4천원 과소비 단정까지 정당화하진 않지요?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d3.b.unlock.s4.shame_clinging_to_number",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q3",
              "text": "양쪽 모두 약속을 깼더라도, 공개성 때문에 당신 쪽 파장이 더 컸다는 점은 부인하기 어렵지 않습니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "d5.b.unlock.s5.shared_breach_needs_repair",
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
            "id": "d1.a.unlock.s2.refund_received",
            "factText": "숙소 보증금이 체크아웃 직후 자신의 개인 계좌로 환급된 사실",
            "tags": [
              "act",
              "timeline",
              "beneficiary"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "amount": {
                "exact": "92,000원",
                "rounded": "9만2천원",
                "neutral": "해당 금액"
              },
              "time": {
                "neutral": "그 시점",
                "period": "체크아웃 직후"
              },
              "person": {
                "fullName": "서도윤",
                "judgeRef": "본인",
                "neutral": "당사자"
              },
              "institution": {
                "name": "박은지",
                "judgeRef": "숙소 운영자",
                "neutral": "호스트"
              }
            },
            "stanceHints": [
              "partial",
              "clarify"
            ]
          }
        ],
        "S3": [
          {
            "id": "d1.a.unlock.s3.offset_before_notice",
            "factText": "김수아에게 택시비를 먼저 빼고 말하자는 취지의 메시지를 남긴 정황",
            "tags": [
              "evidence",
              "quote",
              "self_justification",
              "timeline"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "fullName": "김수아",
                "judgeRef": "공통 친구",
                "neutral": "제3자"
              },
              "time": {
                "neutral": "그 시점",
                "period": "오후 2시"
              },
              "amount": {
                "exact": "70,000원",
                "rounded": "7만원",
                "neutral": "택시비 몫"
              }
            },
            "stanceHints": [
              "blame",
              "counter"
            ]
          }
        ],
        "S4": [
          {
            "id": "d1.a.unlock.s4.reputation_fear",
            "factText": "돈 약속을 어긴 사람으로 보일까 두려워 설명을 늦춘 마음",
            "tags": [
              "emotion",
              "fear",
              "identity",
              "shame"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "fullName": "서도윤",
                "judgeRef": "본인",
                "neutral": "당사자"
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
            "id": "d1.a.unlock.s5.unilateral_offset_admission",
            "factText": "보증금과 택시비 상계 여부를 혼자 정해서는 안 됐다는 인정",
            "tags": [
              "admission",
              "responsibility",
              "rule"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "amount": {
                "exact": "92,000원",
                "rounded": "9만2천원",
                "neutral": "보증금"
              },
              "person": {
                "fullName": "정하린",
                "judgeRef": "상대방",
                "neutral": "상대"
              }
            },
            "stanceHints": [
              "confess",
              "responsibility"
            ]
          }
        ]
      },
      "d-2": {
        "S2": [
          {
            "id": "d2.a.unlock.s2.capture_then_story",
            "factText": "중간 캡처가 전달된 뒤 짧은 간격으로 스토리가 게시된 흐름",
            "tags": [
              "timeline",
              "evidence",
              "context"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "time": {
                "neutral": "그 시점",
                "period": "캡처 공유 14분 뒤"
              },
              "amount": {
                "exact": "184,000원",
                "rounded": "18만4천원",
                "neutral": "중간 차액"
              }
            },
            "stanceHints": [
              "partial",
              "clarify"
            ]
          }
        ],
        "S3": [
          {
            "id": "d2.a.unlock.s3.preconfirmation_spread_broke_rule",
            "factText": "원본 확인 전 제3자에게 정산 해석을 퍼뜨리지 않기로 했던 약속",
            "tags": [
              "rule",
              "relationship",
              "legacy_sentence"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "fullName": "정하린",
                "judgeRef": "상대방",
                "neutral": "상대"
              }
            },
            "stanceHints": [
              "blame",
              "counter"
            ]
          }
        ],
        "S4": [
          {
            "id": "d2.a.unlock.s4.reputation_harm",
            "factText": "중간 숫자 하나로 돈 안 갚는 사람처럼 낙인찍힌 감정",
            "tags": [
              "emotion",
              "harm",
              "identity",
              "fear"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "fullName": "서도윤",
                "judgeRef": "본인",
                "neutral": "당사자"
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
            "id": "d2.a.unlock.s5.correction_needed",
            "factText": "스토리 삭제와 제3자 정정이 함께 이뤄져야 한다는 요구",
            "tags": [
              "responsibility",
              "relationship",
              "harm"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "fullName": "정하린",
                "judgeRef": "상대방",
                "neutral": "상대"
              },
              "person2": {
                "fullName": "김수아",
                "judgeRef": "공통 친구",
                "neutral": "제3자"
              }
            },
            "stanceHints": [
              "confess",
              "responsibility"
            ]
          }
        ]
      },
      "d-3": {
        "S2": [
          {
            "id": "d3.a.unlock.s2.mid_screen_not_final",
            "factText": "정산 앱 중간 화면의 큰 차액은 최종 확정액이 아니라는 주장",
            "tags": [
              "counter",
              "uncertainty",
              "evidence",
              "threshold"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "amount": {
                "exact": "184,000원",
                "rounded": "18만4천원",
                "neutral": "중간 차액"
              },
              "institution": {
                "name": "정산 앱",
                "judgeRef": "정산 앱",
                "neutral": "플랫폼"
              }
            },
            "stanceHints": [
              "partial",
              "clarify"
            ]
          }
        ],
        "S3": [
          {
            "id": "d3.a.unlock.s3.frame_and_loan_got_mixed",
            "factText": "과소비 프레임 속에서 차용금과 공용비 정리가 한꺼번에 섞인 점",
            "tags": [
              "counter",
              "responsibility",
              "context"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "fullName": "정하린",
                "judgeRef": "상대방",
                "neutral": "상대"
              }
            },
            "stanceHints": [
              "blame",
              "counter"
            ]
          }
        ],
        "S4": [
          {
            "id": "d3.a.unlock.s4.stigma_fear",
            "factText": "과소비한 사람으로 낙인찍힐까 봐 숫자 설명에 매달린 마음",
            "tags": [
              "emotion",
              "fear",
              "shame",
              "identity"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "fullName": "서도윤",
                "judgeRef": "본인",
                "neutral": "당사자"
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
            "id": "d3.a.unlock.s5.final_balance_22k",
            "factText": "최종 차액은 작지만 7만원 차용금은 별도 책임으로 남는다는 정리",
            "tags": [
              "admission",
              "responsibility",
              "threshold",
              "context"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "amount": {
                "exact": "22,000원",
                "rounded": "2만2천원",
                "neutral": "최종 차액"
              },
              "amount2": {
                "exact": "70,000원",
                "rounded": "7만원",
                "neutral": "차용금"
              }
            },
            "stanceHints": [
              "confess",
              "responsibility"
            ]
          }
        ]
      },
      "d-4": {
        "S2": [
          {
            "id": "d4.a.unlock.s2.loan_exists",
            "factText": "공항 택시비 중 자신의 몫이 상대방 선결제로 남아 있다는 사실",
            "tags": [
              "act",
              "timeline",
              "beneficiary",
              "evidence"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "amount": {
                "exact": "70,000원",
                "rounded": "7만원",
                "neutral": "자신의 몫"
              },
              "amount2": {
                "exact": "140,000원",
                "rounded": "14만원",
                "neutral": "총 택시비"
              },
              "person": {
                "fullName": "정하린",
                "judgeRef": "상대방",
                "neutral": "상대"
              }
            },
            "stanceHints": [
              "partial",
              "clarify"
            ]
          }
        ],
        "S3": [
          {
            "id": "d4.a.unlock.s3.offset_without_agreement",
            "factText": "보증금이 들어오면 주겠다고 해놓고 상계를 혼자 결정한 경위",
            "tags": [
              "self_justification",
              "quote",
              "rule",
              "context"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "amount": {
                "exact": "70,000원",
                "rounded": "7만원",
                "neutral": "차용금"
              },
              "amount2": {
                "exact": "92,000원",
                "rounded": "9만2천원",
                "neutral": "보증금"
              }
            },
            "stanceHints": [
              "blame",
              "counter"
            ]
          }
        ],
        "S4": [
          {
            "id": "d4.a.unlock.s4.cashflow_shame",
            "factText": "작은 돈도 바로 못 갚는 사람처럼 보일까 두려워 송금을 미룬 부끄러움",
            "tags": [
              "emotion",
              "shame",
              "fear",
              "identity"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "fullName": "서도윤",
                "judgeRef": "본인",
                "neutral": "당사자"
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
            "id": "d4.a.unlock.s5.repay_first_admission",
            "factText": "상계 전에 먼저 갚거나 합의를 구했어야 한다는 인정",
            "tags": [
              "admission",
              "responsibility",
              "rule"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "amount": {
                "exact": "70,000원",
                "rounded": "7만원",
                "neutral": "차용금"
              }
            },
            "stanceHints": [
              "confess",
              "responsibility"
            ]
          }
        ]
      },
      "d-5": {
        "S2": [
          {
            "id": "d5.a.unlock.s2.kimsua_side_message",
            "factText": "김수아에게 보증금과 택시 상계 이야기를 먼저 건넨 정황",
            "tags": [
              "act",
              "privacy",
              "timeline",
              "context"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "person": {
                "fullName": "김수아",
                "judgeRef": "공통 친구",
                "neutral": "제3자"
              },
              "amount": {
                "exact": "70,000원",
                "rounded": "7만원",
                "neutral": "차용금"
              },
              "amount2": {
                "exact": "92,000원",
                "rounded": "9만2천원",
                "neutral": "보증금"
              }
            },
            "stanceHints": [
              "partial",
              "clarify"
            ]
          }
        ],
        "S3": [
          {
            "id": "d5.a.unlock.s3.public_story_is_bigger_breach",
            "factText": "상대의 공개 스토리가 더 큰 파급을 만들었다고 느끼는 비교 감정",
            "tags": [
              "counter",
              "harm",
              "relationship"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "institution": {
                "name": "인스타그램 스토리",
                "judgeRef": "스토리",
                "neutral": "SNS"
              }
            },
            "stanceHints": [
              "blame",
              "counter"
            ]
          }
        ],
        "S4": [
          {
            "id": "d5.a.unlock.s4.fear_of_losing_face",
            "factText": "평판이 흔들릴까 두려워 비공개 누설을 예외처럼 여긴 마음",
            "tags": [
              "emotion",
              "fear",
              "shame",
              "self_justification"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "fullName": "서도윤",
                "judgeRef": "본인",
                "neutral": "당사자"
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
            "id": "d5.a.unlock.s5.private_leak_is_still_breach",
            "factText": "비공개 상담도 제3자 확산 규칙 위반에 포함된다는 인정",
            "tags": [
              "admission",
              "responsibility",
              "rule"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "fullName": "김수아",
                "judgeRef": "공통 친구",
                "neutral": "제3자"
              }
            },
            "stanceHints": [
              "confess",
              "responsibility"
            ]
          }
        ]
      }
    },
    "b": {
      "d-1": {
        "S2": [
          {
            "id": "d1.b.unlock.s2.delay_confirmed",
            "factText": "체크아웃 직후 환급과 실제 공유 사이에 눈에 띄는 시간차가 있다는 판단",
            "tags": [
              "timeline",
              "evidence",
              "context"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "time": {
                "neutral": "그 시점",
                "period": "체크아웃 직후부터 당일 오후까지"
              }
            },
            "stanceHints": [
              "partial",
              "clarify"
            ]
          }
        ],
        "S3": [
          {
            "id": "d1.b.unlock.s3.shared_rule_not_met",
            "factText": "공동 여행 환급금은 원본 확인 뒤 바로 같이 반영해야 한다는 기준",
            "tags": [
              "rule",
              "relationship",
              "legacy_sentence"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "fullName": "정하린",
                "judgeRef": "본인",
                "neutral": "당사자"
              },
              "institution": {
                "name": "정산 앱",
                "judgeRef": "정산표",
                "neutral": "공용 정산"
              }
            },
            "stanceHints": [
              "blame",
              "counter"
            ]
          }
        ],
        "S4": [
          {
            "id": "d1.b.unlock.s4.trust_breach_hurt",
            "factText": "자신이 더 쓴 사람처럼 남을 수 있다는 부담과 상처",
            "tags": [
              "harm",
              "fear",
              "emotion",
              "identity"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "amount": {
                "exact": "184,000원",
                "rounded": "18만4천원",
                "neutral": "캡처상의 차액"
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
            "id": "d1.b.unlock.s5.split_settlement_demand",
            "factText": "보증금 은닉과 택시 차용을 나눠 다시 정산해야 한다는 결론",
            "tags": [
              "responsibility",
              "rule",
              "relationship"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "amount": {
                "exact": "92,000원",
                "rounded": "9만2천원",
                "neutral": "보증금"
              },
              "person": {
                "fullName": "서도윤",
                "judgeRef": "상대방",
                "neutral": "상대"
              }
            },
            "stanceHints": [
              "confess",
              "responsibility"
            ]
          }
        ]
      },
      "d-2": {
        "S2": [
          {
            "id": "d2.b.unlock.s2.capture_shared_first",
            "factText": "정산 확정 전에 중간 캡처를 김수아에게 보내고 저격성 스토리를 올린 사실",
            "tags": [
              "act",
              "timeline",
              "privacy"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "person": {
                "fullName": "김수아",
                "judgeRef": "공통 친구",
                "neutral": "제3자"
              },
              "institution": {
                "name": "인스타그램 스토리",
                "judgeRef": "스토리",
                "neutral": "SNS"
              }
            },
            "stanceHints": [
              "partial",
              "clarify"
            ]
          }
        ],
        "S3": [
          {
            "id": "d2.b.unlock.s3.target_was_obvious",
            "factText": "이름을 직접 쓰지 않았어도 여행 사진과 금액 암시로 대상이 특정된 점",
            "tags": [
              "context",
              "evidence",
              "identity",
              "privacy"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "amount": {
                "exact": "184,000원",
                "rounded": "18만4천원",
                "neutral": "중간 차액"
              }
            },
            "stanceHints": [
              "blame",
              "counter"
            ]
          }
        ],
        "S4": [
          {
            "id": "d2.b.unlock.s4.panic_about_bill",
            "factText": "비용을 혼자 떠안을까 봐 설명을 기다리지 못하고 먼저 반응한 경위",
            "tags": [
              "self_justification",
              "motive",
              "fear"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "fullName": "정하린",
                "judgeRef": "본인",
                "neutral": "당사자"
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
            "id": "d2.b.unlock.s5.delete_and_correct",
            "factText": "스토리 삭제와 제3자 정정까지 해야 쟁점이 정리된다는 인정",
            "tags": [
              "admission",
              "responsibility",
              "relationship"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "fullName": "김수아",
                "judgeRef": "공통 친구",
                "neutral": "제3자"
              },
              "institution": {
                "name": "인스타그램 스토리",
                "judgeRef": "스토리",
                "neutral": "SNS"
              }
            },
            "stanceHints": [
              "confess",
              "responsibility"
            ]
          }
        ]
      },
      "d-3": {
        "S2": [
          {
            "id": "d3.b.unlock.s2.csv_reorders_balance",
            "factText": "원본 CSV와 설정 로그를 보니 자동분배 전 단계와 취소 대기가 섞여 있었다는 사실",
            "tags": [
              "context",
              "evidence",
              "institution",
              "timeline"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "institution": {
                "name": "정산 앱 원본 CSV",
                "judgeRef": "원본 CSV",
                "neutral": "원본"
              },
              "time": {
                "neutral": "그 시점",
                "period": "다음 날 새벽 3시 취소 확정 전"
              }
            },
            "stanceHints": [
              "partial",
              "clarify"
            ]
          }
        ],
        "S3": [
          {
            "id": "d3.b.unlock.s3.hidden_refund_fueled_suspicion",
            "factText": "도윤의 환급 은닉과 차용 미반환이 큰 차액을 더 믿게 만든 심리",
            "tags": [
              "motive",
              "self_justification",
              "context"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "amount": {
                "exact": "92,000원",
                "rounded": "9만2천원",
                "neutral": "보증금"
              },
              "amount2": {
                "exact": "70,000원",
                "rounded": "7만원",
                "neutral": "차용금"
              }
            },
            "stanceHints": [
              "blame",
              "counter"
            ]
          }
        ],
        "S4": [
          {
            "id": "d3.b.unlock.s4.shame_clinging_to_number",
            "factText": "과민한 사람으로 보일까 봐 오히려 숫자에 더 매달린 감정",
            "tags": [
              "emotion",
              "shame",
              "identity",
              "fear"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "fullName": "정하린",
                "judgeRef": "본인",
                "neutral": "당사자"
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
            "id": "d3.b.unlock.s5.withdraw_overspending_claim",
            "factText": "과소비 단정을 거두고 최종 2만2천원 기준으로 재정산하자는 결론",
            "tags": [
              "admission",
              "responsibility",
              "threshold",
              "relationship"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "amount": {
                "exact": "22,000원",
                "rounded": "2만2천원",
                "neutral": "최종 차액"
              }
            },
            "stanceHints": [
              "confess",
              "responsibility"
            ]
          }
        ]
      },
      "d-4": {
        "S2": [
          {
            "id": "d4.b.unlock.s2.loan_memo_exists",
            "factText": "상대방이 보증금이 들어오면 주겠다고 적은 차용 메모가 남아 있다는 점",
            "tags": [
              "quote",
              "evidence",
              "context"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "amount": {
                "exact": "70,000원",
                "rounded": "7만원",
                "neutral": "차용금"
              }
            },
            "stanceHints": [
              "partial",
              "clarify"
            ]
          }
        ],
        "S3": [
          {
            "id": "d4.b.unlock.s3.offset_requires_agreement",
            "factText": "차용금 상계는 당사자 합의가 있어야 한다는 기준",
            "tags": [
              "rule",
              "relationship",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "fullName": "서도윤",
                "judgeRef": "상대방",
                "neutral": "상대"
              }
            },
            "stanceHints": [
              "blame",
              "counter"
            ]
          }
        ],
        "S4": [
          {
            "id": "d4.b.unlock.s4.helper_becomes_fussy",
            "factText": "선결제한 자신이 오히려 돈 밝히는 사람처럼 보인 상처",
            "tags": [
              "emotion",
              "harm",
              "identity",
              "relationship"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "fullName": "정하린",
                "judgeRef": "본인",
                "neutral": "당사자"
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
            "id": "d4.b.unlock.s5.repay_then_settle",
            "factText": "차용금 송금과 보증금 정산을 분리해야 한다는 결론",
            "tags": [
              "responsibility",
              "rule",
              "relationship"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "amount": {
                "exact": "70,000원",
                "rounded": "7만원",
                "neutral": "차용금"
              },
              "amount2": {
                "exact": "92,000원",
                "rounded": "9만2천원",
                "neutral": "보증금"
              }
            },
            "stanceHints": [
              "confess",
              "responsibility"
            ]
          }
        ]
      },
      "d-5": {
        "S2": [
          {
            "id": "d5.b.unlock.s2.no_spread_rule_broken",
            "factText": "원본 확인 전 제3자 공유 금지 약속이 있었는데 캡처와 해석을 먼저 내보낸 사실",
            "tags": [
              "rule",
              "act",
              "privacy",
              "timeline"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "person": {
                "fullName": "김수아",
                "judgeRef": "공통 친구",
                "neutral": "제3자"
              },
              "institution": {
                "name": "인스타그램 스토리",
                "judgeRef": "스토리",
                "neutral": "SNS"
              }
            },
            "stanceHints": [
              "partial",
              "clarify"
            ]
          }
        ],
        "S3": [
          {
            "id": "d5.b.unlock.s3.doyun_also_leaked",
            "factText": "상대방도 김수아에게 환급과 택시 상계 이야기를 먼저 전한 점",
            "tags": [
              "counter",
              "evidence",
              "relationship",
              "context"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "fullName": "서도윤",
                "judgeRef": "상대방",
                "neutral": "상대"
              },
              "person2": {
                "fullName": "김수아",
                "judgeRef": "공통 친구",
                "neutral": "제3자"
              }
            },
            "stanceHints": [
              "blame",
              "counter"
            ]
          }
        ],
        "S4": [
          {
            "id": "d5.b.unlock.s4.anger_override_rule",
            "factText": "배신감이 커지자 약속을 알면서도 예외라고 밀어붙인 분노",
            "tags": [
              "emotion",
              "motive",
              "shame",
              "fear"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "fullName": "정하린",
                "judgeRef": "본인",
                "neutral": "당사자"
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
            "id": "d5.b.unlock.s5.shared_breach_needs_repair",
            "factText": "양쪽 다 위반했지만 자신의 공개 공유는 정정과 삭제 책임까지 따른다는 인정",
            "tags": [
              "admission",
              "responsibility",
              "harm",
              "relationship"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "institution": {
                "name": "인스타그램 스토리",
                "judgeRef": "스토리",
                "neutral": "SNS"
              }
            },
            "stanceHints": [
              "confess",
              "responsibility"
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
        "speaker": "a",
        "trigger": "도윤이 '환급은 아직 확정 전 숫자였다'고 버틸 때 e-3가 제시됨",
        "text": "체크아웃 직후 개인 계좌 입금 시각이 확인되면서, 도윤의 '아직 몰랐다'는 흐름이 무너진다.",
        "relatedDisputes": [
          "d-1"
        ],
        "relatedEvidence": [
          "e-3"
        ]
      },
      {
        "id": "contradiction-2",
        "speaker": "b",
        "trigger": "하린이 '그냥 감정글이었다'고 축소할 때 e-5가 제시됨",
        "text": "같은 여행 사진과 금액 암시, 친한친구 범위가 함께 확인되며 스토리의 지목성이 드러난다.",
        "relatedDisputes": [
          "d-2",
          "d-5"
        ],
        "relatedEvidence": [
          "e-5"
        ]
      },
      {
        "id": "contradiction-3",
        "speaker": "a",
        "trigger": "도윤이 '택시비는 따로 빚이 아니었다'고 말할 때 e-6가 제시됨",
        "text": "7만원 차용 메모와 택시 영수증이 동시에 맞물리며, 상계 전에 별도 차용이 있었다는 점이 튀어나온다.",
        "relatedDisputes": [
          "d-4",
          "d-3"
        ],
        "relatedEvidence": [
          "e-6"
        ]
      },
      {
        "id": "contradiction-4",
        "speaker": "b",
        "trigger": "하린이 18만4천원을 최종 차액처럼 밀어붙일 때 e-2가 제시됨",
        "text": "자동분배 전 단계와 취소 대기 로그가 확인되며, 중간 숫자를 최종 판정처럼 쓴 하린의 해석이 꺾인다.",
        "relatedDisputes": [
          "d-3"
        ],
        "relatedEvidence": [
          "e-2"
        ]
      }
    ],
    "interjections": [
      {
        "id": "interjection-1",
        "speaker": "b",
        "trigger": "도윤이 '그건 합쳐서 봐야 해'로 범위를 넓힐 때",
        "line": "합쳐서 보자는 말로 지금 질문을 또 미루지 마. 환급을 받았으면 왜 바로 말 안 했는지부터 답해.",
        "behaviorHint": "말끝을 자르듯 끼어들며 같은 핵심 문장을 두 번 반복한다."
      },
      {
        "id": "interjection-2",
        "speaker": "a",
        "trigger": "하린이 의도 단정을 먼저 붙일 때",
        "line": "일부러라고 먼저 결론내지 말아줘. 숫자 순서가 꼬인 거랑 의도까지 같은 말은 아니야.",
        "behaviorHint": "낮게 끊어 말하지만 마지막 문장에서 억눌린 짜증이 묻어난다."
      },
      {
        "id": "interjection-3",
        "speaker": "b",
        "trigger": "도윤이 '친구한테 잠깐 말한 정도'라고 축소할 때",
        "line": "잠깐이면 괜찮다는 기준을 누가 정했는데? 원본 전엔 말하지 말자고 같이 정했잖아.",
        "behaviorHint": "상대 말을 덮듯 재차 질문하며 눈을 떼지 않는다."
      }
    ],
    "emotionalOutbursts": [
      {
        "id": "outburst-a-1",
        "party": "a",
        "trigger": "도윤이 '돈 안 갚는 사람'처럼 낙인찍혔다고 느낄 때",
        "line": "나는 숫자 하나 잘못 뜬 걸로 사람 됨됨이까지 정리당한 기분이었어. 그게 제일 견디기 힘들었어.",
        "behaviorHint": "말끝이 떨리지만 울컥한 표정을 숨기려 고개를 돌린다.",
        "cooldownHint": "재판관이 차액과 차용을 분리해 질문하면 진정된다."
      },
      {
        "id": "outburst-a-2",
        "party": "a",
        "trigger": "차용금 미반환이 반복 지적될 때",
        "line": "7만원이 작은 돈 아니라는 거 알아. 그래서 더 창피해서 바로 말을 못 꺼낸 거야.",
        "behaviorHint": "짧게 목소리가 올라갔다가 곧바로 작아진다.",
        "cooldownHint": "비난보다 의도와 두려움을 묻는 공감형 질문에서 S4로 이동하기 쉽다."
      },
      {
        "id": "outburst-b-1",
        "party": "b",
        "trigger": "하린이 '예민하다'는 식으로 읽힌다고 느낄 때",
        "line": "예민한 게 아니라 내가 뒤집어쓸까 봐 무서웠던 거야. 답이 없으니까 더 세게 말한 거고.",
        "behaviorHint": "숨을 크게 들이쉰 뒤 한 문장 안에 사실과 비난을 몰아친다.",
        "cooldownHint": "원본 로그를 먼저 확인해 주면 공격보다 설명 모드로 돌아선다."
      },
      {
        "id": "outburst-b-2",
        "party": "b",
        "trigger": "스토리 문제를 단순 실수로 축소당할 때",
        "line": "실수였다는 말로 끝낼 일이 아니지. 하지만 그때 내가 화로 밀어붙인 것도 맞아.",
        "behaviorHint": "날카롭게 시작했다가 마지막 절반에서 스스로 수습하려는 흔들림이 보인다.",
        "cooldownHint": "삭제·정정 책임을 구체적으로 묻는 질문에서 S5 진입 가능성이 높다."
      }
    ]
  },
  "transitionBeats": [
    {
      "id": "friend01:transition:a:d-1:s0_s1",
      "caseId": "friend-01",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "deposit_refund_question",
      "line": "들어온 정황은 있어도 아직 따로 결론낼 숫자는 아니라고 버틴다. 질문을 받으면 곧바로 '전체 정산'으로 범위를 넓힌다.",
      "behaviorHint": "숫자를 먼저 세고 마지막 단어를 흐리며 직접 인정은 피한다."
    },
    {
      "id": "friend01:transition:a:d-1:s1_s2",
      "caseId": "friend-01",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-3_presented",
      "line": "은행 입금 시각이 제시되자 환급 수령 자체는 인정한다. 다만 곧바로 택시비와 함께 정리하려 했다고 설명을 붙인다.",
      "behaviorHint": "짧게 수긍한 뒤 바로 해석을 덧붙이는 반박형 인정.",
      "revealAtom": "d1.a.unlock.s2.refund_received"
    },
    {
      "id": "friend01:transition:a:d-1:s2_s3",
      "caseId": "friend-01",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "why_not_share_immediately_question",
      "line": "왜 즉시 공유하지 않았냐는 질문을 받으면 '순서가 꼬였다'고 말하면서 하린의 중간 캡처 반응도 함께 문제 삼는다.",
      "behaviorHint": "책임 인정 뒤 곧바로 타이밍과 상대 반응을 끼워 넣는다.",
      "revealAtom": "d1.a.unlock.s3.offset_before_notice"
    },
    {
      "id": "friend01:transition:a:d-1:s3_s5",
      "caseId": "friend-01",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-4_or_responsibility_question",
      "line": "김수아 대화가 나오면 상계 판단을 혼자 했다는 점을 버티지 못하고 시인한다. 마지막엔 '내가 먼저 말했어야 했다'로 수습한다.",
      "behaviorHint": "긴 침묵 뒤 짧게 자인하고 시선을 내린다.",
      "revealAtom": "d1.a.unlock.s5.unilateral_offset_admission"
    },
    {
      "id": "friend01:transition:a:d-3:s0_s1",
      "caseId": "friend-01",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "middle_screen_amount_question",
      "line": "18만4천원은 중간값이라고 주장하지만, 질문이 반복되면 '그렇게 보였을 수는 있다'며 한 단계 물러난다.",
      "behaviorHint": "금액을 다시 읽어주며 숫자 설명으로 시간을 번다."
    },
    {
      "id": "friend01:transition:a:d-3:s1_s2",
      "caseId": "friend-01",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-1_presented",
      "line": "중간 캡처가 실제 제출되면 그 화면이 자동분배 전 단계였다고 설명하며 최종액이 아니었음을 강조한다.",
      "behaviorHint": "캡처의 잘린 범위를 손짓으로 짚으며 맥락 누락을 강조한다.",
      "revealAtom": "d3.a.unlock.s2.mid_screen_not_final"
    },
    {
      "id": "friend01:transition:a:d-3:s2_s3",
      "caseId": "friend-01",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "app_setting_followup",
      "line": "앱 설정과 취소 대기 설명이 이어지면 차용금과 공용비가 섞였다는 점을 인정하면서도 하린의 과소비 프레임을 탓한다.",
      "behaviorHint": "자기 잘못을 말하다가도 곧바로 상대 해석을 묶어 말한다.",
      "revealAtom": "d3.a.unlock.s3.frame_and_loan_got_mixed"
    },
    {
      "id": "friend01:transition:a:d-3:s3_s5",
      "caseId": "friend-01",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-2_or_e-6_presented",
      "line": "원본 CSV와 카드 취소 내역이 겹쳐 제시되면 최종 차액 2만2천원은 인정하고, 7만원 차용을 별도 책임으로 분리한다.",
      "behaviorHint": "숫자를 먼저 또렷하게 읽고 마지막 문장에서 책임을 낮게 인정한다.",
      "revealAtom": "d3.a.unlock.s5.final_balance_22k"
    },
    {
      "id": "friend01:transition:a:d-4:s0_s1",
      "caseId": "friend-01",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "taxi_loan_question",
      "line": "택시비 7만원을 별도 미반환이 아니라 정산 중 금액이라고 주장하다가, 질문이 이어지면 자신의 몫이 남아 있다는 사실까진 인정한다.",
      "behaviorHint": "처음엔 짧게 끊고, 두 번째 질문에서만 문장을 길게 늘인다."
    },
    {
      "id": "friend01:transition:a:d-4:s1_s2",
      "caseId": "friend-01",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-6_presented",
      "line": "택시 영수증과 차용 메모가 나오면 7만원이 자기 몫으로 남아 있다는 사실을 더는 부정하지 못한다.",
      "behaviorHint": "메모 언급에서 눈을 피하고 인정 문장을 짧게 끝낸다.",
      "revealAtom": "d4.a.unlock.s2.loan_exists"
    },
    {
      "id": "friend01:transition:a:d-4:s2_s4",
      "caseId": "friend-01",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S2",
      "toState": "S4",
      "trigger": "nonjudgmental_question_about_offset_intent",
      "line": "비난 없이 '왜 상계라고 생각했는가'를 묻는 순간, 관계를 덜 각박하게 끝내고 싶었다는 진심이 새어 나온다.",
      "behaviorHint": "방어 자세가 풀리고 이유를 설명하는 목소리로 바뀐다.",
      "revealAtom": "d4.a.unlock.s4.cashflow_shame"
    },
    {
      "id": "friend01:transition:a:d-4:s4_s5",
      "caseId": "friend-01",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S4",
      "toState": "S5",
      "trigger": "e-4_or_emotion_threshold",
      "line": "보증금 들어오면 주겠다는 자기 메모까지 확인되면 상계 전 송금이 먼저였다는 점을 시인한다.",
      "behaviorHint": "자기 말을 되풀이하다가 마지막에 짧게 사과 문장을 붙인다.",
      "revealAtom": "d4.a.unlock.s5.repay_first_admission"
    },
    {
      "id": "friend01:transition:a:d-5:s0_s2",
      "caseId": "friend-01",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S0",
      "toState": "S2",
      "trigger": "old_rule_reminder_and_kimsua_question",
      "line": "부산 때 정한 약속과 김수아 대화가 함께 제시되면, 도윤은 '상담처럼 말한 것'이라 둘러대다가도 비공개 누설 자체는 인정한다.",
      "behaviorHint": "한 번은 축소하고 두 번째엔 수긍하는 압축형 전환.",
      "revealAtom": "d5.a.unlock.s2.kimsua_side_message"
    },
    {
      "id": "friend01:transition:a:d-5:s2_s5",
      "caseId": "friend-01",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S2",
      "toState": "S5",
      "trigger": "shared_responsibility_question",
      "line": "양쪽 모두 규칙을 깼다는 질문이 들어오면, 비공개 상담도 위반이라는 점과 자신이 예외를 만든 책임까지 인정한다.",
      "behaviorHint": "공개 저격과 비교하던 어조가 사라지고 자기 책임 문장으로 마무리한다.",
      "revealAtom": "d5.a.unlock.s5.private_leak_is_still_breach"
    },
    {
      "id": "friend01:transition:b:d-2:s0_s1",
      "caseId": "friend-01",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "third_party_share_question",
      "line": "이름을 직접 쓰지 않았다는 부정에서 출발하지만, 질문이 거듭되면 캡처를 김수아에게 보낸 사실까지는 인정한다.",
      "behaviorHint": "처음엔 단호하고, 인정 문장에 들어서면 호흡이 빨라진다."
    },
    {
      "id": "friend01:transition:b:d-2:s1_s2",
      "caseId": "friend-01",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-1_presented",
      "line": "중간 캡처 자체가 제시되면 원본 전 공유를 인정하되 당시엔 자신이 비용을 떠안을까 두려웠다고 해명한다.",
      "behaviorHint": "캡처를 손가락으로 짚으며 정당화와 인정이 한 문장에 붙는다.",
      "revealAtom": "d2.b.unlock.s2.capture_shared_first"
    },
    {
      "id": "friend01:transition:b:d-2:s2_s3",
      "caseId": "friend-01",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "story_post_question",
      "line": "스토리 게시 시점까지 추궁받으면 지목성은 인정하면서도 도윤의 침묵이 먼저였다고 압박을 되돌린다.",
      "behaviorHint": "사실 인정 뒤 바로 상대 동기를 단정하는 톤으로 올라간다.",
      "revealAtom": "d2.b.unlock.s3.target_was_obvious"
    },
    {
      "id": "friend01:transition:b:d-2:s3_s5",
      "caseId": "friend-01",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-5_presented",
      "line": "스토리 보관본과 친한친구 범위가 함께 나오면 '이름은 안 썼다'는 방어를 접고 삭제와 정정 책임까지 인정한다.",
      "behaviorHint": "강하게 버티던 눈빛이 풀리고 문장이 짧아진다.",
      "revealAtom": "d2.b.unlock.s5.delete_and_correct"
    },
    {
      "id": "friend01:transition:b:d-3:s0_s1",
      "caseId": "friend-01",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "actual_balance_question",
      "line": "18만4천원 화면을 사실상 기준으로 삼았다고 버티다가, 질문이 이어지면 '최종처럼 말한 건 빠를 수 있었다'고 한 발 물러난다.",
      "behaviorHint": "처음엔 확신형, 후반엔 조건부 표현으로 톤이 바뀐다."
    },
    {
      "id": "friend01:transition:b:d-3:s1_s2",
      "caseId": "friend-01",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-2_presented",
      "line": "원본 CSV와 설정 로그가 제시되면 큰 차액이 자동분배 전 숫자였음을 인정한다.",
      "behaviorHint": "캡처를 내려놓고 원본 쪽으로 시선을 옮긴다.",
      "revealAtom": "d3.b.unlock.s2.csv_reorders_balance"
    },
    {
      "id": "friend01:transition:b:d-3:s2_s3",
      "caseId": "friend-01",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "duplicate_charge_explanation",
      "line": "중복 승인과 환급 미반영 설명이 붙으면, 자신이 그 숫자를 믿게 된 배경으로 도윤의 환급 은닉과 차용 미반환을 끌어온다.",
      "behaviorHint": "인정한 직후 다시 상대 탓을 덧대며 질문을 되돌리려 한다.",
      "revealAtom": "d3.b.unlock.s3.hidden_refund_fueled_suspicion"
    },
    {
      "id": "friend01:transition:b:d-3:s3_s5",
      "caseId": "friend-01",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-6_or_shared_misconception_question",
      "line": "7만원 차용이 별도라는 점까지 분리되면 과소비 단정은 틀렸다고 인정하고 최종 차액 2만2천원 기준으로 물러선다.",
      "behaviorHint": "큰숨을 한번 내쉰 뒤 숫자를 또렷하게 다시 읽는다.",
      "revealAtom": "d3.b.unlock.s5.withdraw_overspending_claim"
    },
    {
      "id": "friend01:transition:b:d-5:s0_s2",
      "caseId": "friend-01",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S0",
      "toState": "S2",
      "trigger": "e-5_presented",
      "line": "스토리 보관본과 친한친구 범위가 함께 제시되면, 하린은 원본 전 공유가 자신의 위반이었다는 점을 더는 부정하지 못한다.",
      "behaviorHint": "처음 반박하다가 증거를 보는 순간 짧은 인정으로 접는다.",
      "revealAtom": "d5.b.unlock.s2.no_spread_rule_broken"
    },
    {
      "id": "friend01:transition:b:d-5:s2_s5",
      "caseId": "friend-01",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S2",
      "toState": "S5",
      "trigger": "shared_responsibility_and_correction_prompt",
      "line": "양쪽 모두 약속을 깼다는 전제 위에 삭제와 정정 책임을 묻는 순간, 공개성 때문에 자신의 파장이 더 컸다는 점까지 받아들인다.",
      "behaviorHint": "공격적인 톤이 사라지고 수습 문장이 끝까지 완결된다.",
      "revealAtom": "d5.b.unlock.s5.shared_breach_needs_repair"
    }
  ],
  "transitionBeatCoverage": {
    "count": 24,
    "primaryChains": [
      "a:d-1",
      "a:d-3",
      "a:d-4",
      "b:d-2",
      "b:d-3"
    ],
    "compressedSharedDisputes": [
      "a:d-5",
      "b:d-5"
    ],
    "note": "d-5는 medium weight 쌍방 쟁점이라 2단 압축 체인으로 처리하고, 세부 감정·비교 책임은 dossier/stateUnlockAtom에서 확장되도록 구성했다."
  }
}
