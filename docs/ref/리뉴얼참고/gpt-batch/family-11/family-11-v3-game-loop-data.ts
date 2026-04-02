export const family11V3GameLoopData = {
  "caseId": "family-11",
  "dossierCards": [
    {
      "id": "dossier-1",
      "name": "잘린 메시지와 바뀐 하원",
      "description": "교사 메시지의 왜곡과 실제 하원 권한 변경이 한 덩어리로 이어졌는지 검증하는 카드.",
      "evidenceIds": [
        "e-1",
        "e-2"
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
              "id": "dossier-1.a.q1",
              "text": "오연숙 씨, 부모 통보보다 앞서 하원자를 바꾼 시점이 맞다면 그것을 단순 보호로만 부를 수 있습니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "d1.unlock.a.s2.pickup_query",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q2",
              "text": "사설 클리닉 신청서의 보호자 체크란은 누가 직접 선택했는지 명확히 답하십시오.",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d1.unlock.a.s3.guardian_check",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q3",
              "text": "담임교사 원문 전체에 생활리듬 정리 문장이 있었다면, 왜 잘린 캡처만 제시했습니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d3.unlock.a.s3.full_context",
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
              "text": "오하린 씨, 긴급 하원을 여러 차례 부탁한 생활 패턴이 조모에게 재량이 있다고 느끼게 한 부분은 없었습니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d1.unlock.b.s2.reliance_blur",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q2",
              "text": "잘린 담임 메시지를 받았을 때 원문을 즉시 확인하지 않은 이유는 무엇입니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d3.unlock.b.s2.left_distortion_unchallenged",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q3",
              "text": "권한 침범을 막으려 했다면, 왜 경계 재설정을 문서로 다시 통보하는 절차는 늦어졌습니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d1.unlock.b.s3.delayed_boundary_reset",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-2",
      "name": "야근 주간과 응급실 메모",
      "description": "현재의 루틴 붕괴와 오래된 응급실 기록이 어떻게 현재 불신으로 이어졌는지 가르는 카드.",
      "evidenceIds": [
        "e-3",
        "e-4"
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
              "id": "dossier-2.a.q1",
              "text": "오연숙 씨, 잦은 긴급돌봄 요청이 있었다고 해서 교육·병원 결정 권한까지 생긴다고 믿게 된 이유는 무엇입니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "d2.unlock.a.s2.entitlement_from_reliance",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q2",
              "text": "응급실 기록상 투약 간격이 짧게 남아 있다면, 그 밤을 단순 고열로만 말해 온 이유를 설명하십시오.",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d4.unlock.a.s2.close_interval",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q3",
              "text": "그 일을 밝히면 위험한 조모로 보일까 두려웠다는 점이 현재의 과잉 개입과 연결됩니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "d4.unlock.a.s4.dangerous_label_fear",
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
              "text": "오하린 씨, '야근 주간만'이라는 설명이 로그 전체와 맞지 않는다면 예외의 반복을 인정하십니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d2.unlock.b.s2.repeated_exceptions",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q2",
              "text": "반복된 예외가 있었다면 그 기준을 왜 다시 적지 않았습니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d2.unlock.b.s3.undocumented_exceptions",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q3",
              "text": "부모로서 그 응급실 밤의 안전 기록을 끝까지 확인하지 않은 책임도 스스로 인정하십니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "d4.unlock.b.s4.safety_check_failure",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-3",
      "name": "약봉투와 동의서",
      "description": "과거 투약 실수와 현재 동의 규칙 문서를 함께 대조해 누가 어떤 방식으로 규칙을 무너뜨렸는지 밝히는 카드.",
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
              "text": "오연숙 씨, 성인용 감기약 구매 영수증과 사진이 같은 밤을 가리킨다면 그 판단이 왜 정당했다고 보십니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d4.unlock.a.s3.adult_syrup_purchase",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q2",
              "text": "조부모 동의서에 부모 동의 우선 문구가 있는데도 이를 느슨하게 본 근거가 무엇입니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "d5.unlock.a.s2.consent_doc",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q3",
              "text": "실무에서 먼저 규칙을 무너뜨린 책임을 지금 여기서 명확히 인정하십니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "d5.unlock.a.s5.practical_break",
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
              "text": "오하린 씨, 상담일지 원문을 기준으로 보면 전문가 방향은 생활리듬 정리인데 왜 강한 개입 인상을 정정하지 않았습니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d3.unlock.b.s3.actual_direction",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q2",
              "text": "교사 메시지를 친척에게 전달한 행위가 규칙 보호가 아니라 지지 확보용이었다는 점을 인정하십니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "d5.unlock.b.s2.message_side",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q3",
              "text": "도움을 받는 딸이면서 경계를 요구하는 모순 때문에 설명 대신 통보를 택한 것 아닙니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d5.unlock.b.s4.ungrateful_fear",
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
            "id": "d1.unlock.a.s2.pickup_query",
            "factText": "연숙은 조기 하원과 상담 문의를 실제 행동으로 옮긴 뒤에도 그것을 '알아본 수준'으로 줄여 말했다.",
            "tags": [
              "act",
              "evidence",
              "admission"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "person": {
                "fullName": "오연숙",
                "judgeRef": "오연숙 씨",
                "neutral": "조모"
              },
              "institution": {
                "exact": "유치원 하원 변경 로그·사설 클리닉 신청서",
                "judgeRef": "하원 로그와 신청서",
                "neutral": "기관 원본"
              },
              "time": {
                "period": "부모에게 알리기 전날",
                "neutral": "그 전날"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "d1.unlock.a.s3.guardian_check",
            "factText": "사설 클리닉 신청서의 보호자 체크란은 연숙이 직접 선택했다.",
            "tags": [
              "act",
              "institution",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "fullName": "오연숙",
                "judgeRef": "오연숙 씨",
                "neutral": "조모"
              },
              "institution": {
                "exact": "사설 언어·집중 상담 클리닉",
                "judgeRef": "사설 클리닉",
                "neutral": "외부 상담기관"
              },
              "evidence": {
                "exact": "유치원 하원 변경 로그·사설 클리닉 신청서",
                "judgeRef": "하원 로그와 신청서",
                "neutral": "기관 원본"
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
            "id": "d1.unlock.a.s4.rescue_fear",
            "factText": "연숙은 손주가 뒤처지거나 아플까 봐 '내가 안 보면 더 큰일'이라는 공포로 선을 넘었다.",
            "tags": [
              "fear",
              "emotion",
              "motive"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "fullName": "서준서",
                "judgeRef": "아이",
                "neutral": "아이"
              },
              "quote": {
                "exact": "내가 안 보면 더 큰일",
                "neutral": "더 큰일"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "d1.unlock.a.s5.role_abuse",
            "factText": "돌봄 공백을 메운 경험이 부모 동의 없는 결정권 행사로 바뀌었다는 점을 연숙이 스스로 인정한다.",
            "tags": [
              "admission",
              "rule",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "fullName": "오연숙",
                "judgeRef": "오연숙 씨",
                "neutral": "조모"
              },
              "person2": {
                "fullName": "오하린",
                "judgeRef": "오하린 씨",
                "neutral": "엄마"
              },
              "quote": {
                "exact": "의료·교육 결정은 부모 동의 후 진행",
                "neutral": "부모 동의 규칙"
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
            "id": "d2.unlock.a.s2.entitlement_from_reliance",
            "factText": "하린의 반복된 긴급 요청은 연숙에게 '의견을 낼 자격이 있다'는 잘못된 감각을 만들었다.",
            "tags": [
              "relationship",
              "identity",
              "admission"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "person": {
                "fullName": "오하린",
                "judgeRef": "오하린 씨",
                "neutral": "엄마"
              },
              "institution": {
                "exact": "업무캘린더·태블릿 로그·긴급돌봄 요청 메시지",
                "judgeRef": "캘린더와 기기 로그",
                "neutral": "생활 로그"
              },
              "time": {
                "period": "최근 두 달 야근 주간",
                "neutral": "그 시기"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "d2.unlock.a.s3.help_not_authority",
            "factText": "도움을 자주 준 사실과 공식 결정권은 별개라는 점을 연숙이 뒤늦게 구분한다.",
            "tags": [
              "rule",
              "admission",
              "relationship"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "fullName": "오연숙",
                "judgeRef": "오연숙 씨",
                "neutral": "조모"
              },
              "person2": {
                "fullName": "오하린",
                "judgeRef": "오하린 씨",
                "neutral": "엄마"
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
            "id": "d2.unlock.a.s4.instrumentalized_family",
            "factText": "필요할 때만 가족으로 불린다는 서운함이 연숙의 통제 욕구를 키웠다.",
            "tags": [
              "emotion",
              "relationship",
              "motive"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "fullName": "오하린",
                "judgeRef": "오하린 씨",
                "neutral": "엄마"
              },
              "person2": {
                "fullName": "오연숙",
                "judgeRef": "오연숙 씨",
                "neutral": "조모"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "d2.unlock.a.s5.truth_not_license",
            "factText": "하린의 루틴 불일치가 사실이어도 그것은 연숙의 학교·병원 결정 권한이 될 수 없었다.",
            "tags": [
              "admission",
              "rule",
              "counter"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "fullName": "오하린",
                "judgeRef": "오하린 씨",
                "neutral": "엄마"
              },
              "person2": {
                "fullName": "오연숙",
                "judgeRef": "오연숙 씨",
                "neutral": "조모"
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
            "id": "d3.unlock.a.s2.cropped_capture",
            "factText": "연숙이 제시한 담임 메시지는 내용이 바뀌진 않았지만 상하가 잘려 의미가 강하게 치우쳤다.",
            "tags": [
              "evidence",
              "privacy",
              "admission"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "person": {
                "fullName": "이선주",
                "judgeRef": "담임교사",
                "neutral": "담임"
              },
              "institution": {
                "exact": "잘린 담임교사 메시지 캡처",
                "judgeRef": "캡처 메시지",
                "neutral": "교사 메시지 일부"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "d3.unlock.a.s3.full_context",
            "factText": "잘린 캡처 바깥 원문에는 '수면·등원 리듬을 먼저 맞추라'는 문장이 이어져 있었다.",
            "tags": [
              "evidence",
              "context",
              "institution"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "fullName": "이선주",
                "judgeRef": "담임교사",
                "neutral": "담임"
              },
              "quote": {
                "exact": "수면·등원 리듬을 먼저 맞추라",
                "neutral": "생활리듬 먼저"
              },
              "institution": {
                "exact": "잘린 담임교사 메시지 캡처",
                "judgeRef": "캡처 메시지",
                "neutral": "교사 메시지 일부"
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
            "id": "d3.unlock.a.s4.pride_and_shame",
            "factText": "예전 교사였던 자존심과 손주 발달 문제에 대한 수치심이 연숙으로 하여금 교사 말을 더 세게 듣게 만들었다.",
            "tags": [
              "shame",
              "emotion",
              "motive"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "fullName": "오연숙",
                "judgeRef": "오연숙 씨",
                "neutral": "조모"
              },
              "person2": {
                "fullName": "서준서",
                "judgeRef": "아이",
                "neutral": "아이"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "d3.unlock.a.s5.justified_with_crop",
            "factText": "연숙은 잘린 메시지를 이용해 자신의 학습·병원 개입을 정당화했다.",
            "tags": [
              "admission",
              "evidence",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "institution": {
                "exact": "잘린 담임교사 메시지 캡처",
                "judgeRef": "캡처 메시지",
                "neutral": "교사 메시지 일부"
              },
              "person": {
                "fullName": "오연숙",
                "judgeRef": "오연숙 씨",
                "neutral": "조모"
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
            "id": "d4.unlock.a.s2.close_interval",
            "factText": "응급실 내원 직전 약 종류와 간격이 짧았다는 흐름이 의료 기록에 남아 있다.",
            "tags": [
              "harm",
              "timeline",
              "evidence"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "institution": {
                "exact": "2020년 소아응급실 기록·트리아지 메모",
                "judgeRef": "응급실 기록",
                "neutral": "의료 기록"
              },
              "time": {
                "dateExact": "2020년 응급실 밤",
                "period": "준서가 두 돌 무렵",
                "neutral": "그 밤"
              },
              "person": {
                "fullName": "서준서",
                "judgeRef": "아이",
                "neutral": "아이"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "d4.unlock.a.s3.adult_syrup_purchase",
            "factText": "연숙 카드로 결제된 성인용 감기약 영수증과 백업 사진이 같은 밤의 구매 흐름을 뒷받침한다.",
            "tags": [
              "harm",
              "evidence",
              "institution"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "fullName": "오연숙",
                "judgeRef": "오연숙 씨",
                "neutral": "조모"
              },
              "institution": {
                "exact": "옛 약봉투 사진·약국 영수증",
                "judgeRef": "약봉투와 영수증",
                "neutral": "과거 약 기록"
              },
              "time": {
                "dateExact": "2020년 응급실 밤",
                "period": "준서가 두 돌 무렵",
                "neutral": "그 밤"
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
            "id": "d4.unlock.a.s4.dangerous_label_fear",
            "factText": "연숙은 자신이 '위험한 조모'로 낙인찍힐까 봐 그 밤을 단순 고열로 눌러 왔다.",
            "tags": [
              "fear",
              "shame",
              "legacy_sentence"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "fullName": "오연숙",
                "judgeRef": "오연숙 씨",
                "neutral": "조모"
              },
              "time": {
                "dateExact": "2020년 응급실 밤",
                "period": "준서가 두 돌 무렵",
                "neutral": "그 밤"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "d4.unlock.a.s5.duplicate_dosing_confess",
            "factText": "성인용 감기시럽과 해열제의 중복 투약, 그리고 이후 축소 설명까지 모두 연숙의 책임으로 묶인다.",
            "tags": [
              "admission",
              "harm",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "fullName": "오연숙",
                "judgeRef": "오연숙 씨",
                "neutral": "조모"
              },
              "time": {
                "dateExact": "2020년 응급실 밤",
                "period": "준서가 두 돌 무렵",
                "neutral": "그 밤"
              },
              "institution": {
                "exact": "2020년 소아응급실 기록·트리아지 메모",
                "judgeRef": "응급실 기록",
                "neutral": "의료 기록"
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
            "id": "d5.unlock.a.s2.consent_doc",
            "factText": "연숙은 '의료·교육 결정은 부모 동의 후'라는 동의서 문구를 알고도 실무 편의에 맞게 느슨하게 해석했다.",
            "tags": [
              "rule",
              "evidence",
              "admission"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "institution": {
                "exact": "아동발달상담센터 상담일지·조부모 동의서",
                "judgeRef": "상담일지와 동의서",
                "neutral": "센터 원본"
              },
              "quote": {
                "exact": "의료·교육 결정은 부모 동의 후 진행",
                "neutral": "부모 동의 규칙"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "d5.unlock.a.s3.direct_contact",
            "factText": "학교와 상담센터에 직접 연락한 순간 연숙도 동의 기반 규칙을 실제로 어겼다.",
            "tags": [
              "act",
              "institution",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "fullName": "오연숙",
                "judgeRef": "오연숙 씨",
                "neutral": "조모"
              },
              "institution": {
                "exact": "아동발달상담센터",
                "judgeRef": "상담센터",
                "neutral": "센터"
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
            "id": "d5.unlock.a.s4.feeling_over_agreement",
            "factText": "가족으로는 쓰이지만 결정권에선 밀려난다는 감정이 합의서보다 앞섰다.",
            "tags": [
              "emotion",
              "relationship",
              "rule"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "fullName": "오하린",
                "judgeRef": "오하린 씨",
                "neutral": "엄마"
              },
              "person2": {
                "fullName": "오연숙",
                "judgeRef": "오연숙 씨",
                "neutral": "조모"
              },
              "quote": {
                "exact": "의료·교육 결정은 부모 동의 후 진행",
                "neutral": "부모 동의 규칙"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "d5.unlock.a.s5.practical_break",
            "factText": "연숙이 먼저 실무에서 규칙을 무너뜨렸고, 그 뒤 하린의 감정적 대응이 갈등을 더 키웠다.",
            "tags": [
              "admission",
              "rule",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "fullName": "오연숙",
                "judgeRef": "오연숙 씨",
                "neutral": "조모"
              },
              "person2": {
                "fullName": "오하린",
                "judgeRef": "오하린 씨",
                "neutral": "엄마"
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
            "id": "d1.unlock.b.s2.reliance_blur",
            "factText": "하린의 잦은 긴급 하원 요청은 조모에게 재량이 있다고 느끼게 하는 회색지대를 만들었다.",
            "tags": [
              "relationship",
              "context",
              "admission"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "person": {
                "fullName": "오하린",
                "judgeRef": "오하린 씨",
                "neutral": "엄마"
              },
              "person2": {
                "fullName": "오연숙",
                "judgeRef": "오연숙 씨",
                "neutral": "조모"
              },
              "institution": {
                "exact": "업무캘린더·태블릿 로그·긴급돌봄 요청 메시지",
                "judgeRef": "캘린더와 기기 로그",
                "neutral": "생활 로그"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "d1.unlock.b.s3.delayed_boundary_reset",
            "factText": "하린은 조모의 실무 역할이 커지는 동안 경계와 권한을 문서로 다시 못 박지 못했다.",
            "tags": [
              "rule",
              "responsibility",
              "admission"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "fullName": "오하린",
                "judgeRef": "오하린 씨",
                "neutral": "엄마"
              },
              "quote": {
                "exact": "의료·교육 결정은 부모 동의 후 진행",
                "neutral": "부모 동의 규칙"
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
            "id": "d1.unlock.b.s4.decision_fear",
            "factText": "하린이 가장 두려워한 것은 '내 아이 결정이 내 손을 떠나는 느낌'이었다.",
            "tags": [
              "fear",
              "emotion",
              "identity"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "fullName": "오하린",
                "judgeRef": "오하린 씨",
                "neutral": "엄마"
              },
              "person2": {
                "fullName": "서준서",
                "judgeRef": "아이",
                "neutral": "아이"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "d1.unlock.b.s5.scope_vs_authority",
            "factText": "도움을 맡긴 범위와 부모 결정권을 분리하지 못한 하린의 관리 실패가 드러난다.",
            "tags": [
              "admission",
              "rule",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "fullName": "오하린",
                "judgeRef": "오하린 씨",
                "neutral": "엄마"
              },
              "person2": {
                "fullName": "오연숙",
                "judgeRef": "오연숙 씨",
                "neutral": "조모"
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
            "id": "d2.unlock.b.s2.repeated_exceptions",
            "factText": "업무캘린더와 태블릿 로그를 겹쳐 보면 '야근 주간만'이라던 예외가 반복 패턴으로 나타난다.",
            "tags": [
              "timeline",
              "evidence",
              "admission"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "institution": {
                "exact": "업무캘린더·태블릿 로그·긴급돌봄 요청 메시지",
                "judgeRef": "캘린더와 기기 로그",
                "neutral": "생활 로그"
              },
              "time": {
                "period": "최근 두 달 야근 주간",
                "neutral": "그 시기"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "d2.unlock.b.s3.undocumented_exceptions",
            "factText": "예외를 허용할 때마다 기준과 범위를 적지 않은 채 당일 처리한 것이 경계 혼란을 키웠다.",
            "tags": [
              "rule",
              "responsibility",
              "admission"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "fullName": "오하린",
                "judgeRef": "오하린 씨",
                "neutral": "엄마"
              },
              "time": {
                "period": "최근 두 달 야근 주간",
                "neutral": "그 시기"
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
            "id": "d2.unlock.b.s4.good_mother_mask",
            "factText": "좋은 엄마처럼 보이고 싶은 체면이 하린으로 하여금 반복 예외를 축소하게 만들었다.",
            "tags": [
              "shame",
              "emotion",
              "motive"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "fullName": "오하린",
                "judgeRef": "오하린 씨",
                "neutral": "엄마"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "d2.unlock.b.s5.filled_gap_with_mother",
            "factText": "일관된 원칙 대신 조모 돌봄으로 빈틈을 메운 선택이 현재 갈등의 토대가 되었다.",
            "tags": [
              "admission",
              "relationship",
              "context"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "fullName": "오연숙",
                "judgeRef": "오연숙 씨",
                "neutral": "조모"
              },
              "person2": {
                "fullName": "오하린",
                "judgeRef": "오하린 씨",
                "neutral": "엄마"
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
            "id": "d3.unlock.b.s2.left_distortion_unchallenged",
            "factText": "하린은 원문 전체를 확인한 뒤에도 잘린 메시지가 만든 왜곡을 즉시 정정하지 않았다.",
            "tags": [
              "evidence",
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "institution": {
                "exact": "잘린 담임교사 메시지 캡처",
                "judgeRef": "캡처 메시지",
                "neutral": "교사 메시지 일부"
              },
              "person": {
                "fullName": "오하린",
                "judgeRef": "오하린 씨",
                "neutral": "엄마"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "d3.unlock.b.s3.actual_direction",
            "factText": "상담일지와 교사 기록을 합치면 전문가의 실제 방향은 생활리듬 정리와 부모-교사 소통 회복이었다.",
            "tags": [
              "evidence",
              "institution",
              "context"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "fullName": "정미란",
                "judgeRef": "상담사",
                "neutral": "센터 담당자"
              },
              "person2": {
                "fullName": "이선주",
                "judgeRef": "담임교사",
                "neutral": "담임"
              },
              "institution": {
                "exact": "아동발달상담센터 상담일지·조부모 동의서",
                "judgeRef": "상담일지와 동의서",
                "neutral": "센터 원본"
              },
              "quote": {
                "exact": "수면·등원 리듬을 먼저 맞추라",
                "neutral": "생활리듬 먼저"
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
            "id": "d3.unlock.b.s4.development_panic",
            "factText": "아이 발달 이슈에 대한 공포가 하린의 해석을 더 단정적이고 공격적으로 만들었다.",
            "tags": [
              "fear",
              "emotion",
              "motive"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "fullName": "서준서",
                "judgeRef": "아이",
                "neutral": "아이"
              },
              "person2": {
                "fullName": "오하린",
                "judgeRef": "오하린 씨",
                "neutral": "엄마"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "d3.unlock.b.s5.used_distortion_to_block",
            "factText": "하린은 왜곡된 메시지 인상이 엄마 제재를 정당화해 준다는 이유로 그것을 방치했다.",
            "tags": [
              "admission",
              "motive",
              "evidence"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "fullName": "오연숙",
                "judgeRef": "오연숙 씨",
                "neutral": "조모"
              },
              "institution": {
                "exact": "잘린 담임교사 메시지 캡처",
                "judgeRef": "캡처 메시지",
                "neutral": "교사 메시지 일부"
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
            "id": "d4.unlock.b.s2.er_note_reveal",
            "factText": "하린은 응급실 기록을 보고서야 그 밤이 단순 고열이 아니었다는 사실을 처음 직면한다.",
            "tags": [
              "evidence",
              "harm",
              "admission"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "institution": {
                "exact": "2020년 소아응급실 기록·트리아지 메모",
                "judgeRef": "응급실 기록",
                "neutral": "의료 기록"
              },
              "time": {
                "dateExact": "2020년 응급실 밤",
                "period": "준서가 두 돌 무렵",
                "neutral": "그 밤"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "d4.unlock.b.s3.receipt_confirms_flow",
            "factText": "약봉투 사진과 카드 영수증이 성인용 감기약 사용 흐름을 의료 기록과 맞물리게 만든다.",
            "tags": [
              "evidence",
              "harm",
              "timeline"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "institution": {
                "exact": "옛 약봉투 사진·약국 영수증",
                "judgeRef": "약봉투와 영수증",
                "neutral": "과거 약 기록"
              },
              "time": {
                "dateExact": "2020년 응급실 밤",
                "period": "준서가 두 돌 무렵",
                "neutral": "그 밤"
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
            "id": "d4.unlock.b.s4.safety_check_failure",
            "factText": "부모였던 하린 자신도 그 밤의 안전 기록을 끝까지 확인하지 않은 책임을 느낀다.",
            "tags": [
              "admission",
              "responsibility",
              "harm"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "fullName": "오하린",
                "judgeRef": "오하린 씨",
                "neutral": "엄마"
              },
              "person2": {
                "fullName": "서준서",
                "judgeRef": "아이",
                "neutral": "아이"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "d4.unlock.b.s5.buried_root",
            "factText": "과거 위험을 함께 묻어 둔 채 현재의 경계 갈등만 다뤄 온 가족 구조가 드러난다.",
            "tags": [
              "context",
              "legacy_sentence",
              "admission"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "time": {
                "dateExact": "2020년 응급실 밤",
                "period": "준서가 두 돌 무렵",
                "neutral": "그 밤"
              },
              "person": {
                "fullName": "오연숙",
                "judgeRef": "오연숙 씨",
                "neutral": "조모"
              },
              "person2": {
                "fullName": "오하린",
                "judgeRef": "오하린 씨",
                "neutral": "엄마"
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
            "id": "d5.unlock.b.s2.notice_over_consult",
            "factText": "하린은 상의보다 통보가 쉬웠기 때문에 픽업 권한을 먼저 끊었다고 인정한다.",
            "tags": [
              "admission",
              "rule",
              "responsibility"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "person": {
                "fullName": "오하린",
                "judgeRef": "오하린 씨",
                "neutral": "엄마"
              },
              "person2": {
                "fullName": "오연숙",
                "judgeRef": "오연숙 씨",
                "neutral": "조모"
              }
            },
            "stanceHints": [
              "partial"
            ]
          },
          {
            "id": "d5.unlock.b.s2.message_side",
            "factText": "교사 메시지를 친척에게 돌린 행위는 상황 설명보다 자기 편을 만들려는 목적이 더 컸다.",
            "tags": [
              "privacy",
              "beneficiary",
              "admission"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "institution": {
                "exact": "잘린 담임교사 메시지 캡처",
                "judgeRef": "캡처 메시지",
                "neutral": "교사 메시지 일부"
              },
              "person": {
                "fullName": "오하린",
                "judgeRef": "오하린 씨",
                "neutral": "엄마"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "d5.unlock.b.s3.process_breach",
            "factText": "센터 동의서를 다시 읽는 순간 하린 자신도 합의 절차를 지키지 않았다는 점이 명확해진다.",
            "tags": [
              "evidence",
              "rule",
              "admission"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "institution": {
                "exact": "아동발달상담센터 상담일지·조부모 동의서",
                "judgeRef": "상담일지와 동의서",
                "neutral": "센터 원본"
              },
              "quote": {
                "exact": "의료·교육 결정은 부모 동의 후 진행",
                "neutral": "부모 동의 규칙"
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
            "id": "d5.unlock.b.s4.ungrateful_fear",
            "factText": "도움을 받는 딸이면서 경계를 요구하는 모순 때문에 하린은 '고맙지 않은 딸'로 보일까 두려워했다.",
            "tags": [
              "fear",
              "relationship",
              "emotion"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "fullName": "오연숙",
                "judgeRef": "오연숙 씨",
                "neutral": "조모"
              },
              "person2": {
                "fullName": "오하린",
                "judgeRef": "오하린 씨",
                "neutral": "엄마"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "d5.unlock.b.s5.joint_break",
            "factText": "절차 없는 권한 차단과 교사 메시지 유포까지 포함해 하린도 동의 기반 돌봄 규칙을 공동으로 무너뜨렸다.",
            "tags": [
              "admission",
              "privacy",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "fullName": "오하린",
                "judgeRef": "오하린 씨",
                "neutral": "엄마"
              },
              "person2": {
                "fullName": "오연숙",
                "judgeRef": "오연숙 씨",
                "neutral": "조모"
              },
              "institution": {
                "exact": "잘린 담임교사 메시지 캡처",
                "judgeRef": "캡처 메시지",
                "neutral": "교사 메시지 일부"
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
        "trigger": "A가 d-3에서 담임이 강한 학습·병원 개입을 권했다고 단정할 때",
        "line": "잘린 캡처에는 '더 봐 달라'만 남아 있지만, 원문과 상담일지에는 '수면·등원 리듬을 먼저 맞추라'는 반대 맥락이 이어진다.",
        "behaviorHint": "재판관이 잘린 화면과 원문을 번갈아 제시하면 양측 모두 잠시 말을 멈춘다.",
        "linkedDisputes": [
          "d-3"
        ],
        "linkedEvidence": [
          "e-1",
          "e-6"
        ]
      },
      {
        "id": "contradiction-2",
        "trigger": "A가 d-1에서 클리닉은 알아만 봤다고 축소할 때",
        "line": "하원 변경 로그와 클리닉 신청서 원본은 '문의'가 아니라 실제 권한 변경과 보호자 체크까지 이어졌음을 보여 준다.",
        "behaviorHint": "하원 시각과 접수번호가 나란히 제시되면 A의 말속도가 급격히 느려진다.",
        "linkedDisputes": [
          "d-1"
        ],
        "linkedEvidence": [
          "e-2"
        ]
      },
      {
        "id": "contradiction-3",
        "trigger": "B가 d-2에서 예외는 극히 드물었다고 주장할 때",
        "line": "업무캘린더, 태블릿 사용시간, 긴급돌봄 요청 메시지를 겹치면 예외가 한 주짜리 사고가 아니라 반복 패턴으로 드러난다.",
        "behaviorHint": "로그를 주 단위로 포개는 순간 B가 스스로 날짜를 읽기 시작한다.",
        "linkedDisputes": [
          "d-2",
          "d-5"
        ],
        "linkedEvidence": [
          "e-3"
        ]
      },
      {
        "id": "contradiction-4",
        "trigger": "양측이 d-4를 단순 고열 기억으로만 붙잡을 때",
        "line": "응급실 메모의 투약 간격 기록과 약봉투 사진·영수증은 그 밤이 단순 고열이 아니라 부적절한 중복 투약과 맞물렸음을 다시 세운다.",
        "behaviorHint": "의료기록과 영수증 시간이 연결되면 두 사람 모두 과거 기억을 수정해야 하는 표정을 짓는다.",
        "linkedDisputes": [
          "d-4"
        ],
        "linkedEvidence": [
          "e-4",
          "e-5"
        ]
      }
    ],
    "interjections": [
      {
        "id": "interjection-a-1",
        "speaker": "a",
        "trigger": "B가 d-2나 d-5에서 로그를 차례로 읽어 내려갈 때",
        "line": "로그만 읽으면 사람이 없어집니다. 그날 저녁을 누가 먹였는지도 같이 보셔야죠.",
        "behaviorHint": "A가 말 중간에 끼어들며 손가락으로 돌봄 항목을 하나씩 접는다.",
        "linkedDisputes": [
          "d-2",
          "d-5"
        ]
      },
      {
        "id": "interjection-b-1",
        "speaker": "b",
        "trigger": "A가 d-1에서 하원, 저녁, 숙제를 한꺼번에 나열하며 무단 개입을 덮으려 할 때",
        "line": "그 양은 감사와 별개고, 허락은 별개입니다. 하원자 변경에 동의받았습니까, 안 받았습니까?",
        "behaviorHint": "B가 A의 나열을 잘라 끊고 핵심 문장을 두 번 반복한다.",
        "linkedDisputes": [
          "d-1",
          "d-5"
        ]
      },
      {
        "id": "interjection-b-2",
        "speaker": "b",
        "trigger": "A가 d-3에서 예전 교사 경험을 끌어올 때",
        "line": "경력은 해석이고 원문은 기록입니다. 담임 원문 전체를 보셨습니까?",
        "behaviorHint": "B가 감정 없이 서류 한 장을 앞으로 미는 식으로 말을 끊는다.",
        "linkedDisputes": [
          "d-3"
        ]
      }
    ],
    "emotionalOutbursts": [
      {
        "id": "outburst-a-1",
        "speaker": "a",
        "trigger": "e-4와 e-5가 이어져 d-4의 성인용 약 흐름이 확정될 때",
        "line": "그 밤을 다시 들추면 제가 무슨 괴물처럼만 남잖아요. 그때도 살리려던 마음밖엔 없었어요.",
        "behaviorHint": "A의 목이 잠기고 눈물이 차오르며, 마지막 문장에서 목소리가 높아진다.",
        "linkedDisputes": [
          "d-4"
        ]
      },
      {
        "id": "outburst-a-2",
        "speaker": "a",
        "trigger": "d-5에서 가족 규칙과 역할 경계가 동시에 추궁될 때",
        "line": "부를 땐 엄마고 외할머니고 다 찾으면서, 결정 얘기만 하면 남처럼 선을 그으니 제가 사람입니까, 도구입니까.",
        "behaviorHint": "A가 몸을 앞으로 숙이며 억울함을 한 번에 쏟아낸다.",
        "linkedDisputes": [
          "d-2",
          "d-5"
        ]
      },
      {
        "id": "outburst-b-1",
        "speaker": "b",
        "trigger": "A가 d-1에서 개입을 계속 돌봄 양으로 바꾸려 할 때",
        "line": "도와준 양이 많다고 제 아이 결정권까지 가져가진 못합니다. 허락 없이 바꾼 건 바꾼 겁니다.",
        "behaviorHint": "B가 평소보다 음량을 올리고 마지막 문장을 또박또박 끊어 말한다.",
        "linkedDisputes": [
          "d-1",
          "d-5"
        ]
      },
      {
        "id": "outburst-b-2",
        "speaker": "b",
        "trigger": "d-4에서 응급실 밤이 단순 고열이 아니었다는 사실을 처음 직면할 때",
        "line": "그걸 제가 지금 처음 아는 게 더 끔찍해요. 저는 아이를 다시 맡기면서도 그 밤을 제대로 몰랐잖아요.",
        "behaviorHint": "B가 기록에서 눈을 떼지 못하다가 짧게 숨을 삼킨 뒤 말을 몰아친다.",
        "linkedDisputes": [
          "d-4"
        ]
      }
    ]
  },
  "transitionBeats": [
    {
      "id": "family11:transition:a:d-1:s0_s1",
      "caseId": "family-11",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "pickup_change_question",
      "line": "하원 변경 질문이 정면으로 들어오면 연숙은 완전 부정에서 물러나 '잠깐 챙긴 것'이라는 임시조치 서사로 이동한다.",
      "behaviorHint": "돌봄 항목을 빠르게 나열한 뒤, '임시로'라는 말을 붙이며 어조를 낮춘다."
    },
    {
      "id": "family11:transition:a:d-1:s1_s2",
      "caseId": "family-11",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-2_presented",
      "line": "하원 로그와 신청서 원본이 제시되면 연숙은 문의와 조기 하원 자체는 인정하되 '영구 권한은 아니었다'는 부분 인정 상태로 후퇴한다.",
      "behaviorHint": "서류를 한 번 보고 시선을 거둔 뒤, 인정 문장과 변명 문장을 한 세트로 말한다."
    },
    {
      "id": "family11:transition:a:d-1:s2_s3",
      "caseId": "family-11",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "guardian_signature_followup",
      "line": "보호자 체크란을 누가 선택했는지 재차 묻는 순간 연숙은 직접 기재 사실을 인정하고, 반복 돌봄이 착각을 낳았다고 설명한다.",
      "behaviorHint": "목이 잠기며 책임을 인정하지만 곧바로 '늘 제가 맡아서'라는 문장을 붙인다."
    },
    {
      "id": "family11:transition:a:d-1:s3_s5",
      "caseId": "family-11",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "responsibility_question",
      "line": "결국 책임을 누구의 것으로 보느냐는 질문이 들어오면 연숙은 도움을 권한처럼 쓴 자신의 잘못을 시인한다.",
      "behaviorHint": "변명성 문장이 줄고, 마지막엔 짧은 사과형 진술로 떨어진다."
    },
    {
      "id": "family11:transition:a:d-3:s0_s1",
      "caseId": "family-11",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "teacher_recommendation_question",
      "line": "담임 권고를 구체적으로 설명하라는 질문이 들어오면 연숙은 단정 대신 '걱정되는 뉘앙스'를 강조하는 해석형 진술로 옮겨 간다.",
      "behaviorHint": "예전 교사 경험을 암시하며 질문형 말끝을 사용한다."
    },
    {
      "id": "family11:transition:a:d-3:s1_s2",
      "caseId": "family-11",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-1_presented",
      "line": "잘린 캡처가 증거로 놓이면 연숙은 캡처가 잘렸다는 사실은 인정하되 여전히 담임의 우려 해석을 붙잡는다.",
      "behaviorHint": "캡처를 보는 순간 말이 짧아지고 '그래도'라는 접속사가 반복된다."
    },
    {
      "id": "family11:transition:a:d-3:s2_s3",
      "caseId": "family-11",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "full_message_followup",
      "line": "원문 전체 문장을 읽어 주면 연숙은 수면·등원 리듬 문구를 인정하고, 자신이 해석을 선택적으로 전달했다고 한 단계 더 물러난다.",
      "behaviorHint": "표정이 굳고, 원문 인용 다음에야 자신의 전달 방식을 설명한다."
    },
    {
      "id": "family11:transition:a:d-3:s3_s5",
      "caseId": "family-11",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-6_presented",
      "line": "상담일지와 동의서까지 맞물리면 연숙은 전문가 권고를 왜곡해 자기 개입을 정당화했다는 결론을 피하지 못한다.",
      "behaviorHint": "센터 문서가 놓이는 순간 체면이 무너지는 표정과 함께 자책형 어조로 바뀐다."
    },
    {
      "id": "family11:transition:a:d-4:s0_s1",
      "caseId": "family-11",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "old_er_night_question",
      "line": "예전 응급실 밤 자체가 언급되면 연숙은 단순 고열 서사를 유지하되 '오래전이라 헷갈린다'는 기억 회피를 덧붙인다.",
      "behaviorHint": "한숨을 길게 쉬며 기억을 더듬는 척 시간을 번다."
    },
    {
      "id": "family11:transition:a:d-4:s1_s2",
      "caseId": "family-11",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-4_presented",
      "line": "응급실 기록과 트리아지 메모가 제시되면 연숙은 연달아 약을 줬을 가능성은 인정하지만, 긴급 상황의 판단이었다고 방어한다.",
      "behaviorHint": "문서를 보는 즉시 목소리가 낮아지고 두 손을 맞잡는다."
    },
    {
      "id": "family11:transition:a:d-4:s2_s3",
      "caseId": "family-11",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "pharmacy_receipt_followup",
      "line": "약국 영수증과 구매 시각이 추궁되면 연숙은 성인용 감기시럽 구매 사실까지 인정하며 수치심이 드러난다.",
      "behaviorHint": "시선을 완전히 내리고 짧은 문장으로만 답한다."
    },
    {
      "id": "family11:transition:a:d-4:s3_s5",
      "caseId": "family-11",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-5_presented",
      "line": "백업 사진과 영수증이 겹쳐 제시되면 연숙은 중복 투약과 이후 축소 설명까지 모두 자신의 실수로 묶어 시인한다.",
      "behaviorHint": "감정이 터지기 직전처럼 목이 메고, 부정형 표현이 사라진다."
    },
    {
      "id": "family11:transition:b:d-2:s0_s1",
      "caseId": "family-11",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "routine_consistency_question",
      "line": "루틴의 일관성을 구체 날짜로 묻는 순간 하린은 전면 부정에서 물러나 '야근 주간만의 예외'라는 좁은 범위 논리로 이동한다.",
      "behaviorHint": "자료를 세우며 예외 범위를 작게 보이도록 같은 표현을 반복한다."
    },
    {
      "id": "family11:transition:b:d-2:s1_s2",
      "caseId": "family-11",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-3_presented",
      "line": "업무캘린더와 태블릿 로그가 나란히 제시되면 하린은 예외의 반복성을 인정하고 버티기용 선택이었다고 말하기 시작한다.",
      "behaviorHint": "날짜를 확인하는 동안 말속도가 일정해지며 사실 인정 문장이 늘어난다."
    },
    {
      "id": "family11:transition:b:d-2:s2_s3",
      "caseId": "family-11",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "tablet_time_followup",
      "line": "태블릿 시간과 긴급 하원 요청을 함께 추궁받으면 하린은 반복 예외를 기록하지 않은 자신의 관리 실패까지 인정한다.",
      "behaviorHint": "책상 위를 보며 마치 사후보고를 하듯 책임 항목을 정리한다."
    },
    {
      "id": "family11:transition:b:d-2:s3_s5",
      "caseId": "family-11",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "responsibility_question",
      "line": "좋은 엄마 이미지와 실제 생활의 간극을 묻는 책임 질문이 들어오면 하린은 체면을 위해 루틴 유지 서사를 붙들었다고 고백한다.",
      "behaviorHint": "건조한 말투가 잠시 무너지고 자조가 섞인다."
    },
    {
      "id": "family11:transition:b:d-3:s0_s1",
      "caseId": "family-11",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "teacher_message_question",
      "line": "담임 메시지를 정확히 어떻게 읽었는지 묻는 순간 하린은 '과장은 아니고 우려가 느껴졌다'는 식의 해석 방어로 한 단계 이동한다.",
      "behaviorHint": "기록을 언급하지만 결론은 여전히 단정적으로 유지한다."
    },
    {
      "id": "family11:transition:b:d-3:s1_s2",
      "caseId": "family-11",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-1_presented",
      "line": "잘린 캡처의 원형이 드러나면 하린은 즉시 검사 권고는 아니었다고 인정하면서도, 왜곡 인상을 바로잡지 않은 자기 책임을 드러낸다.",
      "behaviorHint": "문장 앞은 차갑게 정리하고 뒷부분에서만 짧게 숨을 삼킨다."
    },
    {
      "id": "family11:transition:b:d-3:s2_s3",
      "caseId": "family-11",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "counselor_note_followup",
      "line": "상담일지 원문이 따라오면 하린은 전문가 방향이 루틴 정리였음을 확정하고, 자신의 분노에 유리해 왜곡을 방치했다고 넘어간다.",
      "behaviorHint": "센터 기록을 읽는 동안 표정이 더 굳어지고 자책이 섞인다."
    },
    {
      "id": "family11:transition:b:d-3:s3_s5",
      "caseId": "family-11",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-6_presented",
      "line": "센터 동의서까지 연결되면 하린은 발달 공포 때문에 과장된 해석을 이용해 엄마를 막으려 했다는 자기 동기를 인정한다.",
      "behaviorHint": "차갑던 어조가 흔들리고 마지막은 낮은 고백형으로 마감된다."
    },
    {
      "id": "family11:transition:b:d-5:s0_s1",
      "caseId": "family-11",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "four_party_rule_question",
      "line": "가족 네 사람의 동의 규칙을 묻는 순간 하린은 자신을 규칙 집행자로 두되, 픽업권 차단과 메시지 공유를 안전 조치라고 해명하는 단계로 이동한다.",
      "behaviorHint": "명확한 문구를 먼저 말하고, 자신의 행동은 예외 조치로 분리해 설명한다."
    },
    {
      "id": "family11:transition:b:d-5:s1_s4",
      "caseId": "family-11",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S1",
      "toState": "S4",
      "trigger": "nonjudgmental_question_about_not_feeling_overridden",
      "line": "비난 없이 '그때 얼마나 잠식당했다고 느꼈느냐'를 묻는 질문에는 하린이 처음으로 감사와 분노를 동시에 말하며 감정 상태를 드러낸다.",
      "behaviorHint": "말수는 적지만 목소리가 낮아지고 속에 눌러 둔 감정이 새어 나온다."
    },
    {
      "id": "family11:transition:b:d-5:s4_s3",
      "caseId": "family-11",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S4",
      "toState": "S3",
      "trigger": "e-6_presented",
      "line": "감정이 열린 상태에서 동의서 원문이 제시되면 하린은 자신도 절차를 지키지 않았다는 사실로 다시 냉정한 자기분석 단계에 들어간다.",
      "behaviorHint": "감정 표현 뒤 곧바로 서류를 붙들고 건조하게 자기 위반을 읽어 낸다."
    },
    {
      "id": "family11:transition:b:d-5:s3_s5",
      "caseId": "family-11",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "shared_responsibility_question",
      "line": "공동 책임을 직접 묻는 질문이 들어오면 하린은 절차 없는 차단과 메시지 유포까지 자신의 몫으로 끌어안으며 최종 시인 상태에 도달한다.",
      "behaviorHint": "결론 문장을 짧게 끊어 말하고, 더 이상 엄마 쪽으로 책임을 미루지 않는다."
    }
  ]
}
