export const spouse01V3GameLoopData = {
  "caseId": "spouse-01",
  "dossierCards": [
    {
      "id": "dossier-1",
      "name": "자금 흐름",
      "description": "280만원 송금 내역과 예약서를 겹쳐, 돈의 목적과 숨긴 이유를 함께 캐묻는 카드입니다.",
      "evidenceIds": [
        "e-1",
        "e-2"
      ],
      "relatedDisputes": [
        "d-1",
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
              "text": "이 280만원의 수취인 최민정 씨가 어떤 역할의 사람인지, 자료 기준으로 명확히 말씀하십시오.",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "d1.unlock.s2.recipient_is_center_side"
              }
            },
            {
              "id": "dossier-1.a.q2",
              "text": "송금 직전 돌봄센터 대표번호와 두 차례 통화한 점을 보면, 이 돈이 어떤 공백을 메우려던 것인지 설명하십시오.",
              "attackVector": "context",
              "requiredLieState": 'S2' as const,
              "lockedHint": "상대의 방어가 느슨해지면 열립니다",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d1.unlock.s2.holiday_care_gap_exists"
              }
            },
            {
              "id": "dossier-1.a.q3",
              "text": "이체 내역과 예약서가 모두 기관 원본으로 확인될 경우에도, 여전히 자료 자체를 다투실 겁니까.",
              "attackVector": "authenticity",
              "requiredLieState": 'S3' as const,
              "lockedHint": "더 깊이 파고들면 결정적 질문이 열립니다",
              "onSuccess": {
                "blockVector": "authenticity",
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
              "text": "이 예약서와 영수증이 기관 원본이라는 점이 확인되어도, 여전히 조작 가능성을 주장하십니까.",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q2",
              "text": "대상자란의 오미숙 기재와 상담 사유까지 보신 뒤에도, 외도 의심을 그대로 유지하실 겁니까.",
              "attackVector": "context",
              "requiredLieState": 'S2' as const,
              "lockedHint": "상대의 방어가 느슨해지면 열립니다",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d2.unlock.s4.inlaw_table_fear"
              }
            },
            {
              "id": "dossier-1.b.q3",
              "text": "최민정 씨가 기관 담당자라는 점까지 확인되면, 여전히 '그 여자'라는 표현을 유지하실 겁니까.",
              "attackVector": "identity",
              "requiredLieState": 'S3' as const,
              "lockedHint": "더 깊이 파고들면 결정적 질문이 열립니다",
              "onSuccess": {
                "blockVector": "identity",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-2",
      "name": "잘린 대화",
      "description": "새벽 캡처와 밤 출입기록을 겹쳐, 외도 의심과 사생활 침해의 맥락을 동시에 흔드는 카드입니다.",
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
              "text": "이 캡처의 앞뒤가 잘렸다는 점을 인정하신다면, 왜 그 맥락을 제때 바로잡지 않았는지 말씀하십시오.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d3.unlock.s3.let_crop_mislead"
              }
            },
            {
              "id": "dossier-2.a.q2",
              "text": "이 메시지의 상대가 사적 관계가 아니라 업무상 연락처라는 점을, 지금 분명히 밝히실 수 있습니까.",
              "attackVector": "identity",
              "requiredLieState": 'S2' as const,
              "lockedHint": "상대의 방어가 느슨해지면 열립니다",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "d3.unlock.s2.consult_not_date"
              }
            },
            {
              "id": "dossier-2.a.q3",
              "text": "출입기록과 카페 영수증까지 시각이 맞는데도, 여전히 그날 만남 자체를 흐리게 말씀하실 겁니까.",
              "attackVector": "authenticity",
              "requiredLieState": 'S3' as const,
              "lockedHint": "더 깊이 파고들면 결정적 질문이 열립니다",
              "onSuccess": {
                "blockVector": "authenticity",
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
              "text": "새벽 2시 07분에 잠든 배우자의 휴대폰을 열어 이 자료를 확보한 경위가 정당했다고 보십니까.",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "d2.unlock.s2.captured_before_asking"
              }
            },
            {
              "id": "dossier-2.b.q2",
              "text": "잘린 캡처 한 장만으로 결론을 내린 점은 인정하십니까, 아니면 앞뒤 대화까지 확인하셨습니까.",
              "attackVector": "context",
              "requiredLieState": 'S2' as const,
              "lockedHint": "상대의 방어가 느슨해지면 열립니다",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d2.unlock.s3.third_party_validation_impulse"
              }
            },
            {
              "id": "dossier-2.b.q3",
              "text": "최민정 씨의 정체가 확인되더라도, 여전히 외도 상대라는 판단을 유지하실 겁니까.",
              "attackVector": "identity",
              "requiredLieState": 'S3' as const,
              "lockedHint": "더 깊이 파고들면 결정적 질문이 열립니다",
              "onSuccess": {
                "blockVector": "identity",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-3",
      "name": "우회 송금",
      "description": "정우성 경유 150만원 흐름으로, 세린의 숨김과 부부의 공동 약속 위반을 동시에 겨누는 카드입니다.",
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
              "text": "한지석 씨, 정우성 씨의 계좌 내역과 월세 수납증이 모두 원본이라면, 오세린 씨가 150만원을 지급했다는 점은 더는 부정하지 않으시겠습니까.",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q2",
              "text": "정우성 씨가 단순 전달자였다는 점이 확인되면, 여전히 상대의 지출 목적 전체를 같은 방식으로 몰아가실 겁니까.",
              "attackVector": "identity",
              "requiredLieState": 'S2' as const,
              "lockedHint": "상대의 방어가 느슨해지면 열립니다",
              "onSuccess": {
                "blockVector": "identity",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q3",
              "text": "이 150만원이 동생 월세용이었다는 흐름을 보면, 자신의 280만원과 상대의 150만원을 같은 칸에 올리기 전에 선후관계를 먼저 말하셔야 하는 것 아닙니까.",
              "attackVector": "context",
              "requiredLieState": 'S3' as const,
              "lockedHint": "더 깊이 파고들면 결정적 질문이 열립니다",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d5a.unlock.s5.i_broke_first"
              }
            }
          ]
        },
        {
          "targetParty": "b",
          "questions": [
            {
              "id": "dossier-3.b.q1",
              "text": "정우성 씨를 왜 중간 전달자로 세웠는지, 그리고 최종 수취인이 누구였는지 명확히 말씀하십시오.",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "d4.unlock.s2.husband_would_refuse"
              }
            },
            {
              "id": "dossier-3.b.q2",
              "text": "입금 18분 뒤 월세로 빠져나간 흐름을 보면, 처음부터 추석 뒤 설명까지 미룰 생각으로 짠 우회 송금이 맞습니까.",
              "attackVector": "context",
              "requiredLieState": 'S2' as const,
              "lockedHint": "상대의 방어가 느슨해지면 열립니다",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d4.unlock.s2.eviction_notice_pressure"
              }
            },
            {
              "id": "dossier-3.b.q3",
              "text": "제3자 자료라도 사건 판단 범위에서 제출된 이상, 이 돈 흐름은 전혀 쓸 수 없다고 계속 주장하실 겁니까.",
              "attackVector": "legality",
              "requiredLieState": 'S3' as const,
              "lockedHint": "더 깊이 파고들면 결정적 질문이 열립니다",
              "onSuccess": {
                "blockVector": "legality",
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
            "id": "d1.unlock.s2.holiday_care_gap_exists",
            "factText": "추석 연휴 간병 공백을 메우려 급히 움직였다는 사실",
            "tags": [
              "context",
              "motive",
              "beneficiary",
              "timeline"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "beneficiary": {
                "fullName": "오미숙",
                "judgeRef": "장모님",
                "directRef": "장모님",
                "role": "돌봄 대상자",
                "neutral": "가족 어른"
              },
              "time": {
                "dateExact": "9월 20일",
                "timeExact": "14시 03분",
                "dateTimeExact": "9월 20일 14시 03분",
                "period": "추석 연휴 직전",
                "neutral": "그날"
              }
            },
            "stanceHints": [
              "partial",
              "emotional"
            ]
          },
          {
            "id": "d1.unlock.s2.recipient_is_center_side",
            "factText": "수취인이 개인 친분이 아니라 센터 쪽 실무선이었다는 사실",
            "tags": [
              "identity",
              "institution",
              "context"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "person": {
                "fullName": "최민정",
                "judgeRef": "최민정 씨",
                "directRef": "최민정 씨",
                "role": "재가돌봄센터 상담팀장",
                "neutral": "그 사람"
              },
              "evidence": {
                "fullName": "재가돌봄센터 간병 예약 확인서",
                "shortName": "예약서",
                "neutral": "그 자료"
              }
            },
            "stanceHints": [
              "partial",
              "confess"
            ]
          }
        ],
        "S3": [
          {
            "id": "d1.unlock.s3.suspicion_hardened_silence",
            "factText": "외도 의심이 커진 뒤에는 설명보다 방어가 먼저 나왔다는 사실",
            "tags": [
              "relationship",
              "harm",
              "motive",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "relation": {
                "judgeRef": "제 아내",
                "directRef": "자기",
                "neutral": "상대"
              }
            },
            "stanceHints": [
              "blame",
              "emotional"
            ]
          }
        ],
        "S4": [
          {
            "id": "d1.unlock.s4.investment_failure_echo",
            "factText": "재작년 투자 실패 기억이 다시 떠올라 더 숨겼다는 사실",
            "tags": [
              "shame",
              "fear",
              "context",
              "motive",
              "rule"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "rule": {
                "exact": "100만원 이상은 반드시 상의",
                "shortName": "사전 상의 약속",
                "neutral": "그 약속"
              }
            },
            "stanceHints": [
              "emotional",
              "confess"
            ]
          },
          {
            "id": "d1.unlock.s4.handle_inlaw_alone",
            "factText": "장모 간병 문제만큼은 혼자 해결해 인정받고 싶었다는 속내",
            "tags": [
              "emotion",
              "relationship",
              "beneficiary",
              "motive"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "beneficiary": {
                "fullName": "오미숙",
                "judgeRef": "장모님",
                "directRef": "장모님",
                "role": "돌봄 대상자",
                "neutral": "가족 어른"
              },
              "relation": {
                "judgeRef": "제 아내",
                "directRef": "자기",
                "neutral": "상대"
              }
            },
            "stanceHints": [
              "emotional",
              "confess"
            ]
          }
        ],
        "S5": [
          {
            "id": "d1.unlock.s5.target_is_omisuk_three_days",
            "factText": "오미숙의 추석 연휴 3일 간병 예약이었다는 전면 공개",
            "tags": [
              "admission",
              "beneficiary",
              "institution",
              "timeline"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "beneficiary": {
                "fullName": "오미숙",
                "judgeRef": "장모님",
                "directRef": "장모님",
                "role": "돌봄 대상자",
                "neutral": "가족 어른"
              },
              "person": {
                "fullName": "최민정",
                "judgeRef": "최민정 씨",
                "directRef": "최민정 씨",
                "role": "재가돌봄센터 상담팀장",
                "neutral": "그 사람"
              },
              "time": {
                "period": "추석 연휴 3일",
                "neutral": "연휴 기간"
              }
            },
            "stanceHints": [
              "confess"
            ]
          },
          {
            "id": "d1.unlock.s5.self_authenticated_transfer",
            "factText": "본인 휴대폰과 인증으로 직접 보낸 송금이었다는 전면 인정",
            "tags": [
              "admission",
              "act",
              "evidence",
              "timeline"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "action": {
                "exact": "공동계좌 송금",
                "neutral": "그 송금"
              },
              "time": {
                "dateExact": "9월 20일",
                "timeExact": "14시 03분",
                "dateTimeExact": "9월 20일 14시 03분",
                "period": "추석 연휴 직전",
                "neutral": "그날"
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
            "id": "d3.unlock.s2.consult_not_date",
            "factText": "조용한 만남이 아니라 상담 성격의 일정이었다는 공개",
            "tags": [
              "context",
              "motive",
              "institution",
              "quote"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "message": {
                "quoteExact": "지난번처럼 조용한 데서 보죠",
                "quoteShort": "조용한 데서 보자던 문장",
                "neutral": "그 대화"
              },
              "person": {
                "fullName": "최민정",
                "judgeRef": "최민정 씨",
                "directRef": "최민정 씨",
                "role": "재가돌봄센터 상담팀장",
                "neutral": "그 사람"
              }
            },
            "stanceHints": [
              "partial",
              "emotional"
            ]
          },
          {
            "id": "d3.unlock.s2.alley_misread_layout",
            "factText": "그 골목이 겉보기와 달리 상담동 후문으로 이어진다는 사실",
            "tags": [
              "location",
              "context",
              "evidence"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "place": {
                "exact": "상담동 후문",
                "category": "그 골목 안쪽",
                "neutral": "그곳"
              }
            },
            "stanceHints": [
              "partial",
              "confess"
            ]
          }
        ],
        "S3": [
          {
            "id": "d3.unlock.s3.let_crop_mislead",
            "factText": "잘린 캡처가 오해를 키우는 걸 알면서도 바로잡지 못했다는 책임",
            "tags": [
              "responsibility",
              "privacy",
              "shame",
              "context"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "evidence": {
                "fullName": "지석 휴대폰 메신저 캡처본",
                "shortName": "캡처본",
                "neutral": "그 캡처"
              },
              "message": {
                "quoteExact": "지난번처럼 조용한 데서 보죠",
                "quoteShort": "조용한 데서 보자던 문장",
                "neutral": "그 대화"
              },
              "relation": {
                "judgeRef": "제 아내",
                "directRef": "자기",
                "neutral": "상대"
              }
            },
            "stanceHints": [
              "blame",
              "emotional"
            ]
          }
        ],
        "S4": [
          {
            "id": "d3.unlock.s4.health_topic_shame",
            "factText": "장모 건강과 돌봄 얘기를 꺼내는 것 자체가 수치스러웠다는 감정",
            "tags": [
              "emotion",
              "shame",
              "beneficiary",
              "relationship"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "beneficiary": {
                "fullName": "오미숙",
                "judgeRef": "장모님",
                "directRef": "장모님",
                "role": "돌봄 대상자",
                "neutral": "가족 어른"
              },
              "relation": {
                "judgeRef": "제 아내",
                "directRef": "자기",
                "neutral": "상대"
              }
            },
            "stanceHints": [
              "emotional",
              "confess"
            ]
          },
          {
            "id": "d3.unlock.s4.pity_from_wife_fear",
            "factText": "제 아내에게 또 처가 문제로 불쌍한 남편처럼 보일까 두려웠다는 감정",
            "tags": [
              "fear",
              "relationship",
              "shame"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "relation": {
                "judgeRef": "제 아내",
                "directRef": "자기",
                "neutral": "상대"
              }
            },
            "stanceHints": [
              "emotional",
              "confess"
            ]
          }
        ],
        "S5": [
          {
            "id": "d3.unlock.s5.cafe_then_backdoor_route",
            "factText": "1층 카페를 거쳐 상담동 후문으로 들어간 실제 동선을 공개",
            "tags": [
              "admission",
              "location",
              "timeline",
              "evidence"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "place": {
                "exact": "상담동 후문",
                "category": "그 골목 안쪽",
                "neutral": "그곳"
              },
              "time": {
                "dateExact": "9월 20일",
                "timeExact": "21시 14분",
                "dateTimeExact": "9월 20일 21시 14분",
                "period": "그날 밤",
                "neutral": "그날 밤"
              }
            },
            "stanceHints": [
              "confess"
            ]
          },
          {
            "id": "d3.unlock.s5.quote_meant_consult_room",
            "factText": "'조용한 데서 보자'가 상담실에서 서류를 보자는 뜻이었다는 설명",
            "tags": [
              "quote",
              "context",
              "admission",
              "institution"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "message": {
                "quoteExact": "지난번처럼 조용한 데서 보죠",
                "quoteShort": "조용한 데서 보자던 문장",
                "neutral": "그 대화"
              },
              "person": {
                "fullName": "최민정",
                "judgeRef": "최민정 씨",
                "directRef": "최민정 씨",
                "role": "재가돌봄센터 상담팀장",
                "neutral": "그 사람"
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
            "id": "d5a.unlock.s2.rule_born_from_loss",
            "factText": "사전 상의 약속이 재작년 투자 손실 뒤 생긴 경계선이었다는 설명",
            "tags": [
              "rule",
              "context",
              "shame"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "rule": {
                "exact": "100만원 이상은 반드시 상의",
                "shortName": "사전 상의 약속",
                "neutral": "그 약속"
              }
            },
            "stanceHints": [
              "partial",
              "emotional"
            ]
          },
          {
            "id": "d5a.unlock.s2.knew_threshold_before_send",
            "factText": "송금 전부터 기준을 넘는다는 걸 알면서도 보냈다는 인정",
            "tags": [
              "rule",
              "threshold",
              "responsibility",
              "admission"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "amount": {
                "exact": "2,800,000원",
                "rounded": "280만원",
                "neutral": "해당 금액",
                "thresholdExact": "100만원 이상",
                "thresholdNeutral": "기준 금액"
              },
              "rule": {
                "exact": "100만원 이상은 반드시 상의",
                "shortName": "사전 상의 약속",
                "neutral": "그 약속"
              },
              "action": {
                "exact": "공동계좌 송금",
                "neutral": "그 송금"
              }
            },
            "stanceHints": [
              "partial",
              "confess"
            ]
          }
        ],
        "S3": [
          {
            "id": "d5a.unlock.s3.dragged_her_case_to_survive",
            "factText": "자신만 배신자로 남지 않으려 제 아내의 150만원을 끌어왔다는 사실",
            "tags": [
              "counter",
              "relationship",
              "responsibility",
              "shame"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "relation": {
                "judgeRef": "제 아내",
                "directRef": "자기",
                "neutral": "상대"
              },
              "amount": {
                "exact": "1,500,000원",
                "rounded": "150만원",
                "neutral": "그 돈",
                "thresholdExact": "100만원 이상",
                "thresholdNeutral": "기준 금액"
              }
            },
            "stanceHints": [
              "blame",
              "emotional"
            ]
          }
        ],
        "S4": [
          {
            "id": "d5a.unlock.s4.one_time_exception_self",
            "factText": "가족 일이니 이번만 예외라고 스스로 허락했다는 속내",
            "tags": [
              "self_justification",
              "rule",
              "motive",
              "beneficiary"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "rule": {
                "exact": "100만원 이상은 반드시 상의",
                "shortName": "사전 상의 약속",
                "neutral": "그 약속"
              },
              "beneficiary": {
                "fullName": "오미숙",
                "judgeRef": "장모님",
                "directRef": "장모님",
                "role": "돌봄 대상자",
                "neutral": "가족 어른"
              }
            },
            "stanceHints": [
              "emotional",
              "confess"
            ]
          },
          {
            "id": "d5a.unlock.s4.rule_as_pride_guard",
            "factText": "그 약속이 돈 규칙이 아니라 가장 체면을 붙드는 안전선이었다는 감정",
            "tags": [
              "emotion",
              "shame",
              "rule",
              "fear"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "rule": {
                "exact": "100만원 이상은 반드시 상의",
                "shortName": "사전 상의 약속",
                "neutral": "그 약속"
              }
            },
            "stanceHints": [
              "emotional",
              "confess"
            ]
          }
        ],
        "S5": [
          {
            "id": "d5a.unlock.s5.i_broke_first",
            "factText": "선후관계상 자신이 먼저 약속을 깼다는 시인",
            "tags": [
              "admission",
              "responsibility",
              "rule",
              "timeline"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "amount": {
                "exact": "2,800,000원",
                "rounded": "280만원",
                "neutral": "해당 금액",
                "thresholdExact": "100만원 이상",
                "thresholdNeutral": "기준 금액"
              },
              "rule": {
                "exact": "100만원 이상은 반드시 상의",
                "shortName": "사전 상의 약속",
                "neutral": "그 약속"
              },
              "time": {
                "dateExact": "9월 20일",
                "timeExact": "14시 03분",
                "dateTimeExact": "9월 20일 14시 03분",
                "period": "추석 연휴 직전",
                "neutral": "그날"
              }
            },
            "stanceHints": [
              "confess"
            ]
          },
          {
            "id": "d5a.unlock.s5.my_weight_heavier",
            "factText": "쌍방 위반이지만 규모와 시작점에서 자기 책임이 더 무겁다는 인정",
            "tags": [
              "admission",
              "responsibility",
              "relationship",
              "threshold"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "relation": {
                "judgeRef": "제 아내",
                "directRef": "자기",
                "neutral": "상대"
              },
              "amount": {
                "exact": "2,800,000원",
                "rounded": "280만원",
                "neutral": "해당 금액",
                "thresholdExact": "100만원 이상",
                "thresholdNeutral": "기준 금액"
              },
              "rule": {
                "exact": "100만원 이상은 반드시 상의",
                "shortName": "사전 상의 약속",
                "neutral": "그 약속"
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
      "d-2": {
        "S2": [
          {
            "id": "d2.unlock.s2.captured_before_asking",
            "factText": "직접 묻기보다 먼저 캡처부터 남겼다는 사실",
            "tags": [
              "act",
              "privacy",
              "responsibility",
              "timeline"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "action": {
                "exact": "새벽 휴대폰 열람",
                "neutral": "그 확인"
              },
              "time": {
                "timeExact": "새벽 2시 07분",
                "dateTimeExact": "새벽 2시 07분",
                "period": "새벽",
                "neutral": "그 새벽"
              },
              "evidence": {
                "fullName": "지석 휴대폰 메신저 캡처본",
                "shortName": "캡처본",
                "neutral": "그 캡처"
              }
            },
            "stanceHints": [
              "partial",
              "confess"
            ]
          },
          {
            "id": "d2.unlock.s2.checked_while_he_slept",
            "factText": "잠든 사이를 골라 확인해 반론조차 듣지 않으려 했다는 자각",
            "tags": [
              "privacy",
              "motive",
              "shame",
              "relationship"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "relation": {
                "judgeRef": "제 남편",
                "directRef": "자기",
                "neutral": "상대"
              },
              "time": {
                "timeExact": "새벽 2시 07분",
                "dateTimeExact": "새벽 2시 07분",
                "period": "새벽",
                "neutral": "그 새벽"
              }
            },
            "stanceHints": [
              "partial",
              "emotional"
            ]
          }
        ],
        "S3": [
          {
            "id": "d2.unlock.s3.third_party_validation_impulse",
            "factText": "혼자 감당이 안 돼 제3자 확인으로 기대려 했다는 사실",
            "tags": [
              "motive",
              "relationship",
              "harm",
              "privacy"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "relation": {
                "judgeRef": "제 남편",
                "directRef": "자기",
                "neutral": "상대"
              }
            },
            "stanceHints": [
              "blame",
              "emotional"
            ]
          }
        ],
        "S4": [
          {
            "id": "d2.unlock.s4.inlaw_table_fear",
            "factText": "시댁 앞에서 속고도 모른 척 명절상 차리는 아내가 될까 두려웠다는 감정",
            "tags": [
              "fear",
              "emotion",
              "relationship",
              "harm"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "relation": {
                "judgeRef": "제 남편",
                "directRef": "자기",
                "neutral": "상대"
              }
            },
            "stanceHints": [
              "emotional",
              "confess"
            ]
          },
          {
            "id": "d2.unlock.s4.anger_masked_shame",
            "factText": "들켜도 부끄러운 쪽이 되기 싫어 화를 먼저 냈다는 자각",
            "tags": [
              "emotion",
              "shame",
              "responsibility"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "relation": {
                "judgeRef": "제 남편",
                "directRef": "자기",
                "neutral": "상대"
              }
            },
            "stanceHints": [
              "emotional",
              "confess"
            ]
          }
        ],
        "S5": [
          {
            "id": "d2.unlock.s5.sent_to_sister_before_confirmation",
            "factText": "사실 확인 전에 캡처를 언니에게 보내 외도인지 물었다는 고백",
            "tags": [
              "admission",
              "privacy",
              "relationship",
              "quote"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "evidence": {
                "fullName": "지석 휴대폰 메신저 캡처본",
                "shortName": "캡처본",
                "neutral": "그 캡처"
              },
              "message": {
                "quoteExact": "지난번처럼 조용한 데서 보죠",
                "quoteShort": "조용한 데서 보자던 문장",
                "neutral": "그 대화"
              },
              "relation": {
                "judgeRef": "제 남편",
                "directRef": "자기",
                "neutral": "상대"
              }
            },
            "stanceHints": [
              "confess"
            ]
          },
          {
            "id": "d2.unlock.s5.wanted_confirmation_not_truth",
            "factText": "진실보다 불안을 대신 확정해 줄 답을 찾고 있었다는 고백",
            "tags": [
              "admission",
              "emotion",
              "motive",
              "shame"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "relation": {
                "judgeRef": "제 남편",
                "directRef": "자기",
                "neutral": "상대"
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
            "id": "d4.unlock.s2.eviction_notice_pressure",
            "factText": "동생 월세가 3개월 밀려 내용증명 직전이었다는 사실",
            "tags": [
              "beneficiary",
              "harm",
              "timeline",
              "context"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "beneficiary": {
                "judgeRef": "제 동생",
                "directRef": "동생",
                "role": "최종 수취인",
                "neutral": "가족"
              },
              "time": {
                "period": "명절 직전",
                "neutral": "그 무렵"
              },
              "amount": {
                "exact": "1,500,000원",
                "rounded": "150만원",
                "neutral": "그 돈",
                "thresholdExact": "100만원 이상",
                "thresholdNeutral": "기준 금액"
              }
            },
            "stanceHints": [
              "partial",
              "emotional"
            ]
          },
          {
            "id": "d4.unlock.s2.husband_would_refuse",
            "factText": "제 남편이 안 된다고 할까 봐 정우성 경유를 택했다는 속내",
            "tags": [
              "fear",
              "relationship",
              "motive",
              "identity"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "relation": {
                "judgeRef": "제 남편",
                "directRef": "자기",
                "neutral": "상대"
              },
              "person": {
                "fullName": "정우성",
                "judgeRef": "정우성 씨",
                "directRef": "정우성",
                "neutral": "그 친구"
              }
            },
            "stanceHints": [
              "partial",
              "emotional"
            ]
          }
        ],
        "S3": [
          {
            "id": "d4.unlock.s3.equalization_anger",
            "factText": "자신의 150만원만 문제 삼기 시작하자 280만원 선행 위반을 더 끌어올리게 됐다는 감정",
            "tags": [
              "counter",
              "relationship",
              "emotion",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "relation": {
                "judgeRef": "제 남편",
                "directRef": "자기",
                "neutral": "상대"
              },
              "amount": {
                "exact": "2,800,000원",
                "rounded": "280만원",
                "neutral": "해당 금액",
                "thresholdExact": "100만원 이상",
                "thresholdNeutral": "기준 금액"
              }
            },
            "stanceHints": [
              "blame",
              "emotional"
            ]
          }
        ],
        "S4": [
          {
            "id": "d4.unlock.s4.sibling_money_shame",
            "factText": "동생 돈 문제를 또 꺼내는 게 너무 수치스러워 숨겼다는 감정",
            "tags": [
              "shame",
              "emotion",
              "beneficiary",
              "relationship"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "beneficiary": {
                "judgeRef": "제 동생",
                "directRef": "동생",
                "role": "최종 수취인",
                "neutral": "가족"
              },
              "relation": {
                "judgeRef": "제 남편",
                "directRef": "자기",
                "neutral": "상대"
              }
            },
            "stanceHints": [
              "emotional",
              "confess"
            ]
          },
          {
            "id": "d4.unlock.s4.used_friend_to_hide",
            "factText": "정우성 계좌를 쓴 건 임시 처리이면서 동시에 남편 눈을 피하려는 숨김이었다는 인정",
            "tags": [
              "responsibility",
              "privacy",
              "identity",
              "admission"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "fullName": "정우성",
                "judgeRef": "정우성 씨",
                "directRef": "정우성",
                "neutral": "그 친구"
              },
              "relation": {
                "judgeRef": "제 남편",
                "directRef": "자기",
                "neutral": "상대"
              },
              "action": {
                "exact": "우회 송금",
                "neutral": "그 처리"
              }
            },
            "stanceHints": [
              "emotional",
              "confess"
            ]
          }
        ],
        "S5": [
          {
            "id": "d4.unlock.s5.three_month_rent_full",
            "factText": "150만원의 목적이 동생의 3개월 연체 월세였다는 전면 공개",
            "tags": [
              "admission",
              "beneficiary",
              "harm",
              "context"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "beneficiary": {
                "judgeRef": "제 동생",
                "directRef": "동생",
                "role": "최종 수취인",
                "neutral": "가족"
              },
              "amount": {
                "exact": "1,500,000원",
                "rounded": "150만원",
                "neutral": "그 돈",
                "thresholdExact": "100만원 이상",
                "thresholdNeutral": "기준 금액"
              }
            },
            "stanceHints": [
              "confess"
            ]
          },
          {
            "id": "d4.unlock.s5.eighteen_minute_flow",
            "factText": "입금 18분 뒤 곧바로 임대인에게 빠져나간 흐름을 인정",
            "tags": [
              "admission",
              "timeline",
              "evidence",
              "context"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "amount": {
                "exact": "1,500,000원",
                "rounded": "150만원",
                "neutral": "그 돈",
                "thresholdExact": "100만원 이상",
                "thresholdNeutral": "기준 금액"
              },
              "time": {
                "period": "입금 18분 뒤",
                "neutral": "직후"
              },
              "evidence": {
                "fullName": "정우성→동생 월세 납부 내역",
                "shortName": "월세 납부 내역",
                "neutral": "그 흐름 자료"
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
            "id": "d5b.unlock.s2.rule_bent_by_betrayal",
            "factText": "배신감이 들어 자신의 150만원만 예외로 두고 싶었다는 자각",
            "tags": [
              "emotion",
              "rule",
              "self_justification",
              "relationship"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "rule": {
                "exact": "100만원 이상은 반드시 상의",
                "shortName": "사전 상의 약속",
                "neutral": "그 약속"
              },
              "relation": {
                "judgeRef": "제 남편",
                "directRef": "자기",
                "neutral": "상대"
              },
              "amount": {
                "exact": "1,500,000원",
                "rounded": "150만원",
                "neutral": "그 돈",
                "thresholdExact": "100만원 이상",
                "thresholdNeutral": "기준 금액"
              }
            },
            "stanceHints": [
              "partial",
              "emotional"
            ]
          },
          {
            "id": "d5b.unlock.s2.knew_my_case_crossed_line",
            "factText": "자기 150만원도 기준선은 넘었다는 걸 알고 있었다는 인정",
            "tags": [
              "admission",
              "threshold",
              "rule",
              "responsibility"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "amount": {
                "exact": "1,500,000원",
                "rounded": "150만원",
                "neutral": "그 돈",
                "thresholdExact": "100만원 이상",
                "thresholdNeutral": "기준 금액"
              },
              "rule": {
                "exact": "100만원 이상은 반드시 상의",
                "shortName": "사전 상의 약속",
                "neutral": "그 약속"
              }
            },
            "stanceHints": [
              "partial",
              "confess"
            ]
          }
        ],
        "S3": [
          {
            "id": "d5b.unlock.s3.not_same_order_or_scale",
            "factText": "같은 위반이라도 선후관계와 숨긴 방식이 다르다고 붙들었다는 주장",
            "tags": [
              "context",
              "responsibility",
              "relationship",
              "counter"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "relation": {
                "judgeRef": "제 남편",
                "directRef": "자기",
                "neutral": "상대"
              },
              "amount": {
                "exact": "2,800,000원",
                "rounded": "280만원",
                "neutral": "해당 금액",
                "thresholdExact": "100만원 이상",
                "thresholdNeutral": "기준 금액"
              }
            },
            "stanceHints": [
              "blame",
              "emotional"
            ]
          }
        ],
        "S4": [
          {
            "id": "d5b.unlock.s4.i_first_proposed_rule",
            "factText": "그 약속을 지키자고 먼저 말했던 쪽이 자신이라 더 창피했다는 감정",
            "tags": [
              "shame",
              "rule",
              "emotion"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "rule": {
                "exact": "100만원 이상은 반드시 상의",
                "shortName": "사전 상의 약속",
                "neutral": "그 약속"
              }
            },
            "stanceHints": [
              "emotional",
              "confess"
            ]
          },
          {
            "id": "d5b.unlock.s4.one_exception_for_sibling",
            "factText": "동생 일만큼은 이번 한 번 예외라고 스스로 허락했다는 속내",
            "tags": [
              "self_justification",
              "beneficiary",
              "motive",
              "rule"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "beneficiary": {
                "judgeRef": "제 동생",
                "directRef": "동생",
                "role": "최종 수취인",
                "neutral": "가족"
              },
              "rule": {
                "exact": "100만원 이상은 반드시 상의",
                "shortName": "사전 상의 약속",
                "neutral": "그 약속"
              }
            },
            "stanceHints": [
              "emotional",
              "confess"
            ]
          }
        ],
        "S5": [
          {
            "id": "d5b.unlock.s5.next_morning_after_his_transfer",
            "factText": "남편의 비밀 송금을 안 바로 다음 날 아침 자신의 우회 송금을 시작했다는 인정",
            "tags": [
              "admission",
              "timeline",
              "relationship",
              "act"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "relation": {
                "judgeRef": "제 남편",
                "directRef": "자기",
                "neutral": "상대"
              },
              "time": {
                "dateExact": "9월 21일",
                "timeExact": "10시 22분",
                "dateTimeExact": "9월 21일 10시 22분",
                "period": "다음 날 아침",
                "neutral": "다음 날 아침"
              },
              "amount": {
                "exact": "1,500,000원",
                "rounded": "150만원",
                "neutral": "그 돈",
                "thresholdExact": "100만원 이상",
                "thresholdNeutral": "기준 금액"
              },
              "action": {
                "exact": "우회 송금",
                "neutral": "그 처리"
              }
            },
            "stanceHints": [
              "confess"
            ]
          },
          {
            "id": "d5b.unlock.s5.reason_not_excuse",
            "factText": "배신감이 이유였어도 약속 위반의 면책은 아니라는 인정",
            "tags": [
              "admission",
              "responsibility",
              "emotion",
              "rule"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "rule": {
                "exact": "100만원 이상은 반드시 상의",
                "shortName": "사전 상의 약속",
                "neutral": "그 약속"
              },
              "relation": {
                "judgeRef": "제 남편",
                "directRef": "자기",
                "neutral": "상대"
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
        "id": "contradiction-1",
        "statementA": "한지석은 송금 용도는 아직 설명할 순서가 있다고 말했습니다.",
        "statementB": "그런데 동시에 센터 통화와 가족 쪽 급한 일의 존재를 구체적으로 언급했습니다.",
        "options": {
          "point_out": {
            "label": "이 모순을 지적한다",
            "effect": "d-1에 contradiction token 생성, 한지석의 다음 방어문 1회 축소, 적중 시 lieState +1"
          },
          "let_go": {
            "label": "넘어간다",
            "effect": "현재 추궁은 유지되지만 모순 토큰을 소모하지 않고 넘어감"
          }
        },
        "npcReaction": "…그건, 제가 말을 너무 잘게 잘랐습니다. 다만 외도 쪽으로 몰아가실 일은 아니라고 생각합니다."
      },
      {
        "id": "contradiction-2",
        "statementA": "오세린은 잘린 캡처만으로는 다 말할 수 없다고 인정했습니다.",
        "statementB": "그런데 같은 자료를 근거로 외도에 가까운 결론을 계속 밀어붙였습니다.",
        "options": {
          "point_out": {
            "label": "이 모순을 지적한다",
            "effect": "d-2 또는 d-3에 contradiction token 생성, 오세린의 blame 확률 상승 대신 context 방어 1회 봉쇄"
          },
          "let_go": {
            "label": "넘어간다",
            "effect": "오세린의 공격적 흐름을 유지한 채 현재 쟁점만 계속 진행"
          }
        },
        "npcReaction": "잘렸다고 해도 그 한 줄이 너무 수상했잖아요. 그래도… 네, 제가 보고 싶은 쪽으로 먼저 본 건 있습니다."
      },
      {
        "id": "contradiction-3",
        "statementA": "오세린은 결국 둘 다 약속을 어겼다고 말했습니다.",
        "statementB": "그런데 자신의 150만원은 같은 위반으로 보지 말아 달라고도 했습니다.",
        "options": {
          "point_out": {
            "label": "이 모순을 지적한다",
            "effect": "d-5의 등가화 거부 논리 균열, 다음 사실추궁 성공 시 오세린 lieState +1"
          },
          "let_go": {
            "label": "넘어간다",
            "effect": "배신감 프레임은 유지되지만 신규 해금 없이 턴 종료"
          }
        },
        "npcReaction": "같은 위반인 건 압니다. 그런데 제게 꽂힌 배신감의 시작이 어디였는지는, 그것도 같이 보셔야죠."
      }
    ],
    "interjections": [
      {
        "id": "interjection-1",
        "interruptor": "b",
        "interjectionLine": "잠깐만요, 예약금이면 왜 제 남편이 아니라 '최민정' 이름만 남았는지 그건 빼고 가실 겁니까. 이름만 남겨놓고 저더러 의심하지 말라고 하시는 건가요.",
        "options": {
          "allow": {
            "label": "허용한다",
            "effect": "d-1 신뢰 훼손 hook 1개 획득, 오세린 감정 노출 관련 신규 힌트 해금"
          },
          "block": {
            "label": "제지한다",
            "effect": "현재 focus dispute 유지, 오세린 다음 응답 sentenceCount -1, 재판관 권위 보너스"
          }
        }
      },
      {
        "id": "interjection-2",
        "interruptor": "a",
        "interjectionLine": "재판관님, 폰 본 얘기만 하실 거면 150만원 우회 송금은 왜 빠집니까. 100만원 넘는 돈은 서로 먼저 상의하자고 했던 약속, 그건 둘 다 깼습니다.",
        "options": {
          "allow": {
            "label": "허용한다",
            "effect": "d-5 쌍방 위반 카드 활성화, mutual breach 관련 새 쟁점 핀 추가"
          },
          "block": {
            "label": "제지한다",
            "effect": "현재 d-2 압박 보너스 +1, 한지석의 counterattack 1회 차단"
          }
        }
      },
      {
        "id": "interjection-3",
        "interruptor": "a",
        "interjectionLine": "그 잘린 캡처만 계속 흔들면 또 외도로 갑니다. 앞뒤 대화랑 실제 만난 장소부터 복원하게 해 주십시오.",
        "options": {
          "allow": {
            "label": "허용한다",
            "effect": "dossier-2의 context challenge 1회 무료 개방, d-3 hidden hook 강화"
          },
          "block": {
            "label": "제지한다",
            "effect": "현재 추궁 흐름 유지, 대신 한지석의 억울함 누설 위험 +1"
          }
        }
      }
    ],
    "emotionalOutbursts": [
      {
        "id": "outburst-a-1",
        "party": "a",
        "outburstLine": "내가 안 움직였으면 추석 연휴에 장모님은 누가 봤겠습니까. 돈 이야기만 남기면 저는 또 무능한 사람 되는 겁니다.",
        "options": {
          "press": {
            "label": "더 압박한다",
            "effect": "한지석 emotionalLeakRisk +1, 다음 동기탐색 적중 시 S4 진입 가능"
          },
          "calm": {
            "label": "진정시킨다",
            "effect": "trustTowardJudge +12, d-1 confession window 1턴 개방"
          }
        }
      },
      {
        "id": "outburst-a-2",
        "party": "a",
        "outburstLine": "투자 말아먹은 일 한 번으로 아직도 돈 얘기만 나오면 제가 먼저 고개 숙여야 합니까. 그래서 말을 못 꺼낸 겁니다.",
        "options": {
          "press": {
            "label": "더 압박한다",
            "effect": "d-5 shame atom 우선 해금, 다음 사실추궁 적중 시 방어문 축소"
          },
          "calm": {
            "label": "진정시킨다",
            "effect": "한지석 blame 감소, empathy_approach 효과 상승"
          }
        }
      },
      {
        "id": "outburst-b-1",
        "party": "b",
        "outburstLine": "제가 폰을 안 봤으면 또 모른 척 명절상만 차렸겠죠. 속는 사람만 점잖게 있으라는 얘기는 그만하십시오.",
        "options": {
          "press": {
            "label": "더 압박한다",
            "effect": "오세린의 anger_masked_shame 계열 atom 해금, 다음 턴 blame 확률 상승"
          },
          "calm": {
            "label": "진정시킨다",
            "effect": "trustTowardJudge +12, d-2 confession window 1턴 개방"
          }
        }
      },
      {
        "id": "outburst-b-2",
        "party": "b",
        "outburstLine": "제 동생 일이라고 하면 다들 저를 숨기는 사람으로만 봅니다. 숨긴 건 맞아도, 그때는 진짜 급했어요.",
        "options": {
          "press": {
            "label": "더 압박한다",
            "effect": "d-4의 수치심 원자 1개 즉시 개방, 다음 evidence_present 적중 보너스"
          },
          "calm": {
            "label": "진정시킨다",
            "effect": "오세린 defensive 감소, d-4 motive_search 효과 상승"
          }
        }
      }
    ]
  },
  "transitionBeats": [
    {
      "id": "tb-a-d1-s1-s2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S1",
      "toState": "S2",
      "primaryBeatType": "evidence_hit",
      "secondaryBeatType": "partial",
      "line": "그 예약서의 대상자란까지 보셨다면… 네, 그 돈이 아무 데나 간 건 아니라는 점까지는 숨기기 어렵겠습니다. 다만 사적인 여자 문제로 보실 돈은 아니었고, 가족 쪽 급한 일에 먼저 움직인 돈이었습니다.",
      "behaviorHint": "예약서의 대상자 이름에서 시선이 멈추고, 마지막 문장에서만 낮은 목소리로 사실을 조금 더 푼다."
    },
    {
      "id": "tb-a-d1-s2-s3",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S2",
      "toState": "S3",
      "primaryBeatType": "blame",
      "line": "그런데 왜 저만 추궁받아야 합니까. 새벽에 제 폰을 열어보고 외도라고 먼저 단정한 쪽이 있는데, 제가 어떻게 처음부터 차분히 설명만 하고 있었겠습니까.",
      "behaviorHint": "입술을 한 번 깨문 뒤 고개를 들고, 마지막 문장을 되묻듯 밀어붙인다."
    },
    {
      "id": "tb-a-d1-s3-s4",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S3",
      "toState": "S4",
      "primaryBeatType": "emotional",
      "line": "솔직히 말씀드리면, 장모님 일 앞에서 또 돈 문제로 쩔쩔매는 남편처럼 보이는 게 싫었습니다. 그래서 설명보다 버티는 쪽을 택했습니다.",
      "behaviorHint": "어깨가 내려앉고, 첫 문장 뒤에 짧은 침묵이 생긴다."
    },
    {
      "id": "tb-a-d1-s4-s5",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S4",
      "toState": "S5",
      "primaryBeatType": "confession",
      "line": "그 2,800,000원은 장모님 추석 연휴 간병 예약금이었습니다. 최민정 씨는 돌봄센터 상담팀장이고, 제가 본인 인증으로 직접 보냈습니다. 먼저 말하지 않은 건 제 잘못입니다.",
      "behaviorHint": "정확한 금액과 직함을 또박또박 말하지만 눈은 끝까지 들지 못한다."
    },
    {
      "id": "tb-b-d2-s1-s2",
      "caseId": "spouse-01",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S1",
      "toState": "S2",
      "primaryBeatType": "evidence_hit",
      "secondaryBeatType": "partial",
      "line": "네, 새벽에 제 남편 폰을 본 건 맞습니다. 그 송금과 그 문장을 보고 제가 확인부터 해버린 것도 사실이에요.",
      "behaviorHint": "처음 문장은 짧게 끊고, 두 번째 문장에서만 억울함이 묻어나온다."
    },
    {
      "id": "tb-b-d2-s2-s3",
      "caseId": "spouse-01",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S2",
      "toState": "S3",
      "primaryBeatType": "blame",
      "line": "그런데 왜 제 행동만 떼어 심판하십니까. 그렇게 보이게 숨겨놓고, 제가 불안에 무너진 건 다 제 탓이라고 하시면 더 억울합니다.",
      "behaviorHint": "팔짱을 낀 채 한 박자 쉬었다가, 마지막 문장을 세게 찍어 누른다."
    },
    {
      "id": "tb-b-d2-s3-s4",
      "caseId": "spouse-01",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S3",
      "toState": "S4",
      "primaryBeatType": "emotional",
      "line": "저는 진짜로, 또 속으면서도 모른 척 명절상 차리는 사람이 될까 봐 무서웠습니다. 그래서 들킨 뒤에도 화부터 냈습니다.",
      "behaviorHint": "처음엔 눈을 피하다가 '무서웠습니다'에서만 목이 잠긴다."
    },
    {
      "id": "tb-b-d2-s4-s5",
      "caseId": "spouse-01",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S4",
      "toState": "S5",
      "primaryBeatType": "confession",
      "line": "네, 저는 잘린 캡처를 붙잡고 언니에게까지 외도인지 물었습니다. 확인보다 사생활 침해가 먼저 간 것도 인정합니다. 무서워서 진실보다 확답을 찾았습니다.",
      "behaviorHint": "끝 문장에서야 겨우 어깨 힘이 풀리고, 캡처를 쥔 손이 내려간다."
    }
  ]
} as const;

export default spouse01V3GameLoopData;
