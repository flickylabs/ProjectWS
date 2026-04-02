export const family05V3GameLoopData = {
  "caseId": "family-05",
  "dossierCards": [
    {
      "id": "dossier-1",
      "name": "출입 로그와 취소 연락",
      "description": "방 출입 기록과 임대인 연락이 하나의 개입 흐름인지 묶어 묻는 카드",
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
              "text": "은주 씨 휴대폰으로 현관이 열리고 곧바로 방 문 센서가 반응한 날, 방 안에서 무엇을 확인했습니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "d1.a.unlock.s2.room-docs",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q2",
              "text": "계약금 송금 47분 뒤 임대인에게 전화를 건 이유가 단순 문의였다면, 직후 취소 요청 문자까지 보낸 경위를 설명해 보십시오.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d1.a.unlock.s3.landlord-pressure",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q3",
              "text": "'가족이 책임 못 진다'는 문장을 넣어 보낸 이상, 임대인에게 가족 분쟁 위험을 직접 전달한 것 아닌가요?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "d5.a.unlock.s3.family-dispute-signal",
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
              "text": "홈앱 로그상 어머니 휴대폰 출입과 방 문 센서 반응이 같은 분 단위로 찍힙니다. 이 기록을 언제, 어떻게 확인했습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d1.b.unlock.s2.log-match",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q2",
              "text": "임대인 태도가 바뀐 시점을 계약금 송금, 어머니 연락, 상담 예약 중 어디로 봅니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d5.b.unlock.s2.tone-change",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q3",
              "text": "당시에는 수입 문제 때문이라 설명했는데, 그 판단이 체면 지키기였다는 점까지 인정합니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "d5.b.unlock.s4.face-saving-reason",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-2",
      "name": "초안 계약과 31초 함정",
      "description": "공유주거 초안과 31초 음성클립의 축소·편집 프레임을 동시에 파고드는 카드",
      "evidenceIds": [
        "e-3",
        "e-4"
      ],
      "relatedDisputes": [
        "d-2",
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
              "text": "소현 씨 설명이 불완전했다 해도, 그 사실만으로 방 출입까지 정당화된다고 본 겁니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "d2.a.unlock.s5.truth-and-limit",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q2",
              "text": "왜 전체 통화가 아니라 편집된 31초 파일만 먼저 제시했습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d3.a.unlock.s2.clip-resave",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q3",
              "text": "상담 후 결정 약속이 있었다면, 상담 전에 확인과 개입을 시작한 스스로의 기준부터 설명해 보십시오.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d4.a.unlock.s2.flexible-rule",
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
              "text": "공유주거 초안과 계약금 이체가 이미 있었는데도 부모에게 단독 원룸처럼 설명한 이유는 무엇입니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d2.b.unlock.s2.shared-draft",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q2",
              "text": "'그 시점만 보면'이라는 말로 룸메이트 조항을 뒤로 미룬 건 사실을 잘게 자른 것 아닌가요?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d2.b.unlock.s3.face-saving",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q3",
              "text": "상담 예약이 잡혀 있던 시점에 계약금을 먼저 보낸 건 약속 파기라는 점을 인정합니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "d4.b.unlock.s2.deposit-hold",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-3",
      "name": "원본 복구와 중재 기록",
      "description": "포렌식 감정과 상담센터 기록으로 최종 책임 배분을 압축해 확인하는 카드",
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
              "text": "포렌식 결과 '엄마 카드' 구절이 7개월 전 다른 통화로 확인됐는데, 이 부분을 언제부터 알고 있었습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d3.a.unlock.s3.old-phrase",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q2",
              "text": "상담센터 기록까지 보면 선개입은 은주 씨, 선계약은 소현 씨로 정리됩니다. 먼저 인정할 부분은 무엇입니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d4.a.unlock.s5.mutual-breach",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q3",
              "text": "임대인 회신메일에 가족이 편집 파일까지 보냈다는 점이 적혀 있는데, 최종 거절 원인을 아직도 소현 수입으로만 보십니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d5.a.unlock.s5.real-cause",
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
              "text": "11분 원본 통화와 포렌식 감정서를 함께 본 뒤, 31초 파일을 어떤 기준으로 위조라고 판단합니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d3.b.unlock.s5.forensic-proof",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q2",
              "text": "상담 후 결정 약속을 알고도 계약금을 넣은 데 대해, 체면 때문이었다는 점까지 말할 수 있습니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "d4.b.unlock.s4.shame-delay",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q3",
              "text": "임대인 회신메일을 본 지금도 수입 문제가 주된 원인이라고 말하겠습니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d5.b.unlock.s5.real-rejection",
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
            "id": "d1.a.unlock.s2.room-docs",
            "factText": "은주는 소현 부재 중 방 안으로 들어가 계약 서류가 눈에 띄는 위치까지 확인했다.",
            "tags": [
              "act",
              "privacy",
              "timeline"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "person": {
                "fullName": "박은주",
                "judgeRef": "은주 씨",
                "neutral": "어머니"
              },
              "otherPerson": {
                "fullName": "박소현",
                "judgeRef": "소현 씨",
                "neutral": "딸"
              },
              "time": {
                "period": "낮 시간",
                "neutral": "그때"
              }
            },
            "stanceHints": [
              "partial",
              "defensive"
            ]
          }
        ],
        "S3": [
          {
            "id": "d1.a.unlock.s3.landlord-pressure",
            "factText": "은주는 계약금 송금 47분 뒤 임대인 최연우에게 직접 전화하고 3분 안에 취소 요청 문자를 보냈다.",
            "tags": [
              "act",
              "timeline",
              "institution",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "fullName": "박은주",
                "judgeRef": "은주 씨",
                "neutral": "어머니"
              },
              "otherPerson": {
                "fullName": "최연우",
                "judgeRef": "임대인",
                "neutral": "임대인"
              },
              "time": {
                "exact": "47분 뒤",
                "neutral": "그 직후"
              },
              "followup": {
                "exact": "3분 안",
                "neutral": "곧바로"
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
            "id": "d1.a.unlock.s4.scam-fear",
            "factText": "은주는 과거 전세사기 직전 사건이 겹쳐 보이자 보호와 통제를 구분하지 못한 채 방 출입을 정당화했다.",
            "tags": [
              "fear",
              "motive",
              "legacy_sentence",
              "self_justification"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "legacy": {
                "exact": "2년 전 전세사기 직전 사건",
                "neutral": "예전 일"
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
            "id": "d1.a.unlock.s5.full-intrusion",
            "factText": "은주는 성인 딸의 방과 계약에 무단 개입했고, 그 결과 임대인에게 계약 중단 압박을 가한 사실을 시인한다.",
            "tags": [
              "admission",
              "responsibility",
              "privacy",
              "institution"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "fullName": "박소현",
                "judgeRef": "소현 씨",
                "neutral": "딸"
              },
              "otherPerson": {
                "fullName": "최연우",
                "judgeRef": "임대인",
                "neutral": "임대인"
              }
            },
            "stanceHints": [
              "confession",
              "emotional"
            ]
          }
        ]
      },
      "d-2": {
        "S2": [
          {
            "id": "d2.a.unlock.s2.shared-clause",
            "factText": "은주는 계약 초안에서 공용 주방과 다른 입주자 조항을 보고 단독 원룸 설명과 다르다고 판단했다.",
            "tags": [
              "evidence",
              "context",
              "counter"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "person": {
                "fullName": "박소현",
                "judgeRef": "소현 씨",
                "neutral": "딸"
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
            "id": "d2.a.unlock.s3.deposit-before-counsel",
            "factText": "은주는 상담 예약 하루 전 저장된 초안과 그날 저녁 계약금 송금을 연결해 소현의 축소 설명을 굳힌다.",
            "tags": [
              "timeline",
              "evidence",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "fullName": "박소현",
                "judgeRef": "소현 씨",
                "neutral": "딸"
              },
              "time": {
                "exact": "상담 예약 하루 전",
                "neutral": "상담 전"
              },
              "amount": {
                "neutral": "계약금"
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
            "id": "d2.a.unlock.s4.deceived-trigger",
            "factText": "은주는 '또 급하게 나간다'는 공포보다 '나를 속였다'는 감정이 통제를 더 세게 만든 점을 깨닫는다.",
            "tags": [
              "emotion",
              "fear",
              "self_justification"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "fullName": "박소현",
                "judgeRef": "소현 씨",
                "neutral": "딸"
              }
            },
            "stanceHints": [
              "emotional",
              "self_reflection"
            ]
          }
        ],
        "S5": [
          {
            "id": "d2.a.unlock.s5.truth-and-limit",
            "factText": "은주는 소현의 축소 설명이 사실이었음을 인정하면서도, 그 사실이 자신의 선넘은 개입을 정당화하지 못한다고 정리한다.",
            "tags": [
              "admission",
              "counter",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "fullName": "박소현",
                "judgeRef": "소현 씨",
                "neutral": "딸"
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
            "id": "d3.a.unlock.s2.clip-resave",
            "factText": "은주는 31초 클립을 전체 파일이 아닌 편집 앱 폴더에서 다시 저장한 상태로 먼저 제시했다.",
            "tags": [
              "evidence",
              "act",
              "timeline"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "audio": {
                "exact": "31초",
                "neutral": "짧은 클립"
              }
            },
            "stanceHints": [
              "partial",
              "defensive"
            ]
          }
        ],
        "S3": [
          {
            "id": "d3.a.unlock.s3.old-phrase",
            "factText": "문제의 '엄마 카드' 구절이 7개월 전 다른 통화에서 온 음성조각이라는 점을 은주도 알고 있었다.",
            "tags": [
              "evidence",
              "timeline",
              "quote",
              "shame"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "time": {
                "exact": "7개월 전",
                "neutral": "예전"
              },
              "quote": {
                "exact": "엄마 카드",
                "neutral": "문제 구절"
              }
            },
            "stanceHints": [
              "partial",
              "shame"
            ]
          }
        ],
        "S4": [
          {
            "id": "d3.a.unlock.s4.panic-send",
            "factText": "은주는 창피함과 불안을 이유로, 편집된 파일을 임대인에게 보내도 된다고 스스로 합리화했다.",
            "tags": [
              "fear",
              "shame",
              "institution",
              "motive"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "otherPerson": {
                "fullName": "최연우",
                "judgeRef": "임대인",
                "neutral": "임대인"
              },
              "audio": {
                "exact": "31초",
                "neutral": "편집 파일"
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
            "id": "d3.a.unlock.s5.fabrication",
            "factText": "은주는 세 통화를 잘라 붙이고 오래된 음성조각까지 넣어, 소현의 자백처럼 보이는 위조본을 만들었다고 시인한다.",
            "tags": [
              "admission",
              "evidence",
              "responsibility",
              "quote"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "count": {
                "exact": "세 통화",
                "neutral": "여러 통화"
              },
              "audio": {
                "exact": "31초",
                "neutral": "해당 클립"
              },
              "subjectPerson": {
                "fullName": "박소현",
                "judgeRef": "소현 씨",
                "neutral": "딸"
              }
            },
            "stanceHints": [
              "confession",
              "admission"
            ]
          }
        ]
      },
      "d-4": {
        "S2": [
          {
            "id": "d4.a.unlock.s2.flexible-rule",
            "factText": "은주는 상담 전 행동 금지 합의를 스스로 '예외가 있는 느슨한 약속'처럼 해석했다.",
            "tags": [
              "rule",
              "self_justification",
              "uncertainty"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "institution": {
                "exact": "청년주거상담센터",
                "judgeRef": "상담센터",
                "neutral": "상담기관"
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
            "id": "d4.a.unlock.s3.pre-counsel-contact",
            "factText": "은주는 상담일이 오기 전에 이미 방 출입과 임대인 연락을 실행했다.",
            "tags": [
              "admission",
              "timeline",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "institution": {
                "exact": "청년주거상담센터",
                "judgeRef": "상담센터",
                "neutral": "상담기관"
              },
              "otherPerson": {
                "fullName": "최연우",
                "judgeRef": "임대인",
                "neutral": "임대인"
              }
            },
            "stanceHints": [
              "partial",
              "admission"
            ]
          }
        ],
        "S4": [
          {
            "id": "d4.a.unlock.s4.old-scam-trigger",
            "factText": "은주는 예전 전세사기 직전 사건이 떠오르면 약속보다 불안이 먼저 움직인다고 털어놓는다.",
            "tags": [
              "fear",
              "legacy_sentence",
              "emotion"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "legacy": {
                "exact": "2년 전 전세사기 직전 사건",
                "neutral": "예전 계약 사고"
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
            "id": "d4.a.unlock.s5.mutual-breach",
            "factText": "은주는 상담 후 결정 약속을 자신이 선개입으로 깼고, 소현은 선계약으로 깼다는 쌍방 책임을 인정한다.",
            "tags": [
              "admission",
              "rule",
              "responsibility",
              "counter"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "institution": {
                "exact": "청년주거상담센터",
                "judgeRef": "상담센터",
                "neutral": "상담기관"
              },
              "otherPerson": {
                "fullName": "박소현",
                "judgeRef": "소현 씨",
                "neutral": "딸"
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
            "id": "d5.a.unlock.s2.contact-risk",
            "factText": "은주는 자신의 취소 연락이 임대인 판단에 부담이 됐을 가능성을 처음 인정한다.",
            "tags": [
              "institution",
              "responsibility",
              "uncertainty"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "otherPerson": {
                "fullName": "최연우",
                "judgeRef": "임대인",
                "neutral": "임대인"
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
            "id": "d5.a.unlock.s3.family-dispute-signal",
            "factText": "은주는 '가족이 책임 못 진다'는 문자와 31초 클립이 집안 분쟁 신호로 읽힐 수 있음을 깨닫는다.",
            "tags": [
              "institution",
              "evidence",
              "context",
              "harm"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "otherPerson": {
                "fullName": "최연우",
                "judgeRef": "임대인",
                "neutral": "임대인"
              },
              "quote": {
                "exact": "가족이 책임 못 진다",
                "neutral": "취소 압박 문구"
              },
              "audio": {
                "exact": "31초",
                "neutral": "편집 파일"
              }
            },
            "stanceHints": [
              "partial",
              "admission"
            ]
          }
        ],
        "S4": [
          {
            "id": "d5.a.unlock.s4.shame-rejection",
            "factText": "은주는 딸 수입보다 자신의 개입이 계약 거절에 더 크게 작용했을지 모른다는 부끄러움을 드러낸다.",
            "tags": [
              "shame",
              "emotion",
              "responsibility"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "otherPerson": {
                "fullName": "박소현",
                "judgeRef": "소현 씨",
                "neutral": "딸"
              }
            },
            "stanceHints": [
              "emotional",
              "self_reflection"
            ]
          }
        ],
        "S5": [
          {
            "id": "d5.a.unlock.s5.real-cause",
            "factText": "은주는 최종 거절의 직접 원인이 딸 수입보다 자신의 취소 연락과 편집 녹취 전달에 더 가까웠다고 인정한다.",
            "tags": [
              "admission",
              "institution",
              "responsibility",
              "evidence"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "otherPerson": {
                "fullName": "최연우",
                "judgeRef": "임대인",
                "neutral": "임대인"
              },
              "subjectPerson": {
                "fullName": "박소현",
                "judgeRef": "소현 씨",
                "neutral": "딸"
              }
            },
            "stanceHints": [
              "confession",
              "admission"
            ]
          }
        ]
      }
    },
    "b": {
      "d-1": {
        "S2": [
          {
            "id": "d1.b.unlock.s2.log-match",
            "factText": "소현은 홈앱 로그에서 은주 휴대폰 출입과 방 문 센서 반응이 같은 분 단위로 이어진다는 점을 확보했다.",
            "tags": [
              "evidence",
              "timeline",
              "privacy"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "person": {
                "fullName": "박은주",
                "judgeRef": "은주 씨",
                "neutral": "어머니"
              },
              "time": {
                "exact": "같은 분 단위",
                "neutral": "연달아"
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
            "id": "d1.b.unlock.s3.autonomy-breach",
            "factText": "소현은 방 출입과 임대인 연락이 한 묶음의 통제 행동이었다고 정리한다.",
            "tags": [
              "responsibility",
              "privacy",
              "institution"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "otherPerson": {
                "fullName": "최연우",
                "judgeRef": "임대인",
                "neutral": "임대인"
              },
              "person": {
                "fullName": "박은주",
                "judgeRef": "은주 씨",
                "neutral": "어머니"
              }
            },
            "stanceHints": [
              "blame",
              "partial"
            ]
          }
        ],
        "S4": [
          {
            "id": "d1.b.unlock.s4.child-treatment",
            "factText": "소현은 과거 실수 하나 때문에 지금도 애 취급당한다는 감정을 폭발시킨다.",
            "tags": [
              "emotion",
              "harm",
              "legacy_sentence",
              "identity"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "age": {
                "exact": "26세",
                "neutral": "성인"
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
            "id": "d1.b.unlock.s5.boundary-rule",
            "factText": "소현은 비밀번호를 정리하지 못한 자신의 허점을 인정하되, 그것이 방 출입 허락은 아니었다고 선을 긋는다.",
            "tags": [
              "admission",
              "rule",
              "privacy"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "fullName": "박소현",
                "judgeRef": "소현 씨",
                "neutral": "딸"
              }
            },
            "stanceHints": [
              "confession",
              "boundary"
            ]
          }
        ]
      },
      "d-2": {
        "S2": [
          {
            "id": "d2.b.unlock.s2.shared-draft",
            "factText": "소현은 룸메이트가 있는 공유주거 초안과 계약금 선송금을 인정한다.",
            "tags": [
              "admission",
              "act",
              "timeline"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "amount": {
                "neutral": "계약금"
              },
              "person": {
                "fullName": "박소현",
                "judgeRef": "소현 씨",
                "neutral": "딸"
              }
            },
            "stanceHints": [
              "partial",
              "admission"
            ]
          }
        ],
        "S3": [
          {
            "id": "d2.b.unlock.s3.face-saving",
            "factText": "소현은 '그 시점만 보면 단독처럼 보였다'는 식으로 범위를 잘라 체면 손상을 줄이려 했다.",
            "tags": [
              "motive",
              "self_justification",
              "uncertainty"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "fullName": "박소현",
                "judgeRef": "소현 씨",
                "neutral": "딸"
              }
            },
            "stanceHints": [
              "blame",
              "hedge"
            ]
          }
        ],
        "S4": [
          {
            "id": "d2.b.unlock.s4.adult-shield",
            "factText": "소현은 스물여섯이라는 나이와 자율성을 방패로 세워 축소 설명 책임을 늦게 인정했다.",
            "tags": [
              "emotion",
              "identity",
              "shame"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "age": {
                "exact": "26세",
                "neutral": "성인"
              }
            },
            "stanceHints": [
              "emotional",
              "defensive"
            ]
          }
        ],
        "S5": [
          {
            "id": "d2.b.unlock.s5.full-minimization",
            "factText": "소현은 부모 갈등을 피하려고 공유주거 사실을 단독 원룸처럼 축소 설명했고, 그 상태에서 계약금을 먼저 넣었다고 시인한다.",
            "tags": [
              "admission",
              "responsibility",
              "context"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "amount": {
                "neutral": "계약금"
              },
              "person": {
                "fullName": "박소현",
                "judgeRef": "소현 씨",
                "neutral": "딸"
              }
            },
            "stanceHints": [
              "confession",
              "admission"
            ]
          }
        ]
      },
      "d-3": {
        "S2": [
          {
            "id": "d3.b.unlock.s2.original-call",
            "factText": "11분 원본 통화에서 소현은 오히려 '엄마 카드 같은 건 안 건드려'라고 말한다.",
            "tags": [
              "evidence",
              "quote",
              "counter"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "audio": {
                "exact": "11분",
                "neutral": "전체 통화"
              },
              "quote": {
                "exact": "엄마 카드 같은 건 안 건드려",
                "neutral": "반대 취지 발화"
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
            "id": "d3.b.unlock.s3.waveform-break",
            "factText": "소현은 포렌식 파형에서 세 구간 절단과 한 차례 음절 대치 흔적이 확인된다는 점을 근거로 든다.",
            "tags": [
              "evidence",
              "context",
              "counter"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "count": {
                "exact": "세 구간",
                "neutral": "여러 구간"
              },
              "replace": {
                "exact": "한 차례",
                "neutral": "일부"
              }
            },
            "stanceHints": [
              "blame",
              "fact"
            ]
          }
        ],
        "S4": [
          {
            "id": "d3.b.unlock.s4.reputation-hit",
            "factText": "소현은 조작된 음성 때문에 임대인에게 문제 있는 사람처럼 보인 굴욕감을 드러낸다.",
            "tags": [
              "emotion",
              "harm",
              "institution"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "otherPerson": {
                "fullName": "최연우",
                "judgeRef": "임대인",
                "neutral": "임대인"
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
            "id": "d3.b.unlock.s5.forensic-proof",
            "factText": "소현은 31초 클립이 위조본이고 11분 원본 및 포렌식 감정서가 이를 직접 입증한다고 정리한다.",
            "tags": [
              "admission",
              "evidence",
              "institution"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "audioShort": {
                "exact": "31초",
                "neutral": "클립"
              },
              "audioLong": {
                "exact": "11분",
                "neutral": "원본"
              }
            },
            "stanceHints": [
              "confession",
              "fact"
            ]
          }
        ]
      },
      "d-4": {
        "S2": [
          {
            "id": "d4.b.unlock.s2.deposit-hold",
            "factText": "소현은 상담 전에 계약금을 보내며 '자리만 묶는 것'이라고 스스로 낮춰 불렀다.",
            "tags": [
              "admission",
              "act",
              "self_justification"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "amount": {
                "neutral": "계약금"
              },
              "institution": {
                "exact": "청년주거상담센터",
                "judgeRef": "상담센터",
                "neutral": "상담기관"
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
            "id": "d4.b.unlock.s3.same-promise-break",
            "factText": "소현은 자신은 선계약, 은주는 선개입 방식으로 같은 약속을 깼다고 정리한다.",
            "tags": [
              "responsibility",
              "rule",
              "counter"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "institution": {
                "exact": "청년주거상담센터",
                "judgeRef": "상담센터",
                "neutral": "상담기관"
              },
              "otherPerson": {
                "fullName": "박은주",
                "judgeRef": "은주 씨",
                "neutral": "어머니"
              }
            },
            "stanceHints": [
              "partial",
              "balanced"
            ]
          }
        ],
        "S4": [
          {
            "id": "d4.b.unlock.s4.shame-delay",
            "factText": "소현은 미성숙해 보일까 두려워 계약금 사실을 늦게 말한 수치심을 인정한다.",
            "tags": [
              "shame",
              "emotion",
              "motive"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "amount": {
                "neutral": "계약금"
              }
            },
            "stanceHints": [
              "emotional",
              "admission"
            ]
          }
        ],
        "S5": [
          {
            "id": "d4.b.unlock.s5.full-breach",
            "factText": "소현은 상담 후 결정 약속을 알고도 먼저 계약금을 넣어 약속을 흔들었다고 시인한다.",
            "tags": [
              "admission",
              "rule",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "institution": {
                "exact": "청년주거상담센터",
                "judgeRef": "상담센터",
                "neutral": "상담기관"
              },
              "amount": {
                "neutral": "계약금"
              }
            },
            "stanceHints": [
              "confession",
              "admission"
            ]
          }
        ]
      },
      "d-5": {
        "S2": [
          {
            "id": "d5.b.unlock.s2.tone-change",
            "factText": "소현은 엄마가 임대인에게 연락한 뒤 계약 분위기가 달라졌다는 점을 체감했다.",
            "tags": [
              "institution",
              "timeline",
              "uncertainty"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "otherPerson": {
                "fullName": "최연우",
                "judgeRef": "임대인",
                "neutral": "임대인"
              },
              "person": {
                "fullName": "박은주",
                "judgeRef": "은주 씨",
                "neutral": "어머니"
              }
            },
            "stanceHints": [
              "partial",
              "admission"
            ]
          }
        ],
        "S3": [
          {
            "id": "d5.b.unlock.s3.email-reason",
            "factText": "소현은 회신메일에서 수입보다 가족 갈등과 편집 파일이 더 큰 부담 사유였다는 점을 확인한다.",
            "tags": [
              "institution",
              "evidence",
              "context"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "otherPerson": {
                "fullName": "최연우",
                "judgeRef": "임대인",
                "neutral": "임대인"
              },
              "audio": {
                "exact": "31초",
                "neutral": "편집 파일"
              }
            },
            "stanceHints": [
              "partial",
              "fact"
            ]
          }
        ],
        "S4": [
          {
            "id": "d5.b.unlock.s4.face-saving-reason",
            "factText": "소현은 '엄마 때문에 깨졌다'고 말하면 더 창피할 것 같아 수입 문제를 앞세웠다고 털어놓는다.",
            "tags": [
              "shame",
              "motive",
              "emotion"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "fullName": "박소현",
                "judgeRef": "소현 씨",
                "neutral": "딸"
              },
              "otherPerson": {
                "fullName": "박은주",
                "judgeRef": "은주 씨",
                "neutral": "어머니"
              }
            },
            "stanceHints": [
              "emotional",
              "admission"
            ]
          }
        ],
        "S5": [
          {
            "id": "d5.b.unlock.s5.real-rejection",
            "factText": "소현은 임대인의 최종 거절이 자신의 수입 불안보다 가족 분쟁 위험 때문이었다는 사실을 받아들인다.",
            "tags": [
              "admission",
              "institution",
              "context"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "otherPerson": {
                "fullName": "최연우",
                "judgeRef": "임대인",
                "neutral": "임대인"
              }
            },
            "stanceHints": [
              "confession",
              "fact"
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
        "targetParty": "a",
        "trigger": "은주가 d-1에서 방 출입을 전면 부인한 상태에서 e-1이 제시될 때",
        "line": "현관 로그와 방 문 센서는 같은 분 단위로 이어집니다. '확인만 했다'는 말과 '들어간 적 없다'는 말은 동시에 성립하지 않습니다.",
        "relatedEvidenceIds": [
          "e-1"
        ],
        "relatedDisputes": [
          "d-1"
        ],
        "revealAtom": "d1.a.unlock.s2.room-docs"
      },
      {
        "id": "ctr-2",
        "targetParty": "b",
        "trigger": "소현이 d-2에서 단독 원룸 후보였다고만 버틸 때",
        "line": "계약서 초안에는 공용 주방과 룸메이트 조항이 있고, 계약금 이체는 이미 끝나 있습니다. '후보'라는 말만으로는 부족합니다.",
        "relatedEvidenceIds": [
          "e-3"
        ],
        "relatedDisputes": [
          "d-2"
        ],
        "revealAtom": "d2.b.unlock.s2.shared-draft"
      },
      {
        "id": "ctr-3",
        "targetParty": "a",
        "trigger": "은주가 d-3에서 31초 클립의 진정성을 주장할 때",
        "line": "편집 앱 재저장 기록, 세 구간 절단 흔적, 7개월 전 음성조각이 한 줄로 이어집니다. 이것은 요약이 아니라 제작에 가깝습니다.",
        "relatedEvidenceIds": [
          "e-4",
          "e-5"
        ],
        "relatedDisputes": [
          "d-3"
        ],
        "revealAtom": "d3.a.unlock.s5.fabrication"
      },
      {
        "id": "ctr-4",
        "targetParty": "both",
        "trigger": "양측이 d-4에서 상담 후 결정 약속을 각자만 지켰다고 주장할 때",
        "line": "계약금은 상담 전에 송금됐고, 임대인 연락과 방 출입도 상담 전에 있었습니다. 방식만 달랐을 뿐 약속을 먼저 깬 쪽은 둘 다입니다.",
        "relatedEvidenceIds": [
          "e-3",
          "e-6"
        ],
        "relatedDisputes": [
          "d-4"
        ],
        "revealAtom": "d4.a.unlock.s5.mutual-breach"
      }
    ],
    "interjections": [
      {
        "id": "int-1",
        "sourceParty": "a",
        "trigger": "소현이 d-1에서 '통제'를 반복하며 은주의 개입을 규정할 때",
        "line": "내가 아니었으면 또 당했어, 그 말은 왜 빼! 위험한 계약 냄새가 났으니까 막은 거야.",
        "behaviorHint": "몸을 앞으로 숙이며 판사 허락 전에 끼어든다."
      },
      {
        "id": "int-2",
        "sourceParty": "b",
        "trigger": "은주가 d-3에서 31초 클립을 '핵심만 잘라낸 것'이라고 말할 때",
        "line": "핵심이 아니라 편집이잖아. 예전 말까지 붙여 놓고 어떻게 그걸 내 자백이라고 해.",
        "behaviorHint": "말을 끊고 빠르게 치고 들어오며 눈을 부릅뜬다."
      },
      {
        "id": "int-3",
        "sourceParty": "a",
        "trigger": "d-5에서 임대인 거절 사유가 전부 은주 책임으로 정리될 때",
        "line": "수입이랑 계약 구조 불안은 없었던 일처럼 말하지 마세요. 나만 연락 안 했어도 무조건 됐다는 식은 아니에요.",
        "behaviorHint": "의자에서 반쯤 일어나듯 몸을 띄우며 반발한다."
      }
    ],
    "emotionalOutbursts": [
      {
        "id": "emo-a-1",
        "party": "a",
        "trigger": "d-1 또는 d-4에서 예전 전세사기 직전 사건이 다시 언급될 때",
        "line": "그때 한 번만 더 밀렸으면 얘 인생이 어떻게 됐을지 아직도 잠이 안 와요. 그래서 손이 먼저 나간 거예요!",
        "behaviorHint": "가슴을 두드리며 목소리가 떨리고 말끝이 높아진다."
      },
      {
        "id": "emo-a-2",
        "party": "a",
        "trigger": "d-3에서 위조 녹취 지적이 확정 단계로 넘어갈 때",
        "line": "그래, 내가 잘못했어도 그날은 진짜 무서웠어. 다들 나만 통제광이라고 하니까 더 미친 사람처럼 굴었어.",
        "behaviorHint": "눈물을 참으려다 분노와 수치가 뒤섞여 울먹인다."
      },
      {
        "id": "emo-b-1",
        "party": "b",
        "trigger": "d-1에서 성인 자녀의 방 출입이 보호였다는 말이 반복될 때",
        "line": "그래서 또 내가 애 취급이잖아. 내 방까지 열어보면 내가 뭘 믿고 독립 준비를 해.",
        "behaviorHint": "양손을 벌리고 허탈하게 웃다가 곧바로 목소리가 갈라진다."
      },
      {
        "id": "emo-b-2",
        "party": "b",
        "trigger": "d-3에서 31초 클립이 임대인에게 전달된 경위가 드러날 때",
        "line": "말까지 잘라 붙여서 내가 도망갈 사람처럼 만들면, 나는 대체 뭘로 나를 증명해요.",
        "behaviorHint": "문장 중간에 숨이 막히듯 멈추고 고개를 숙인다."
      }
    ]
  },
  "transitionBeats": [
    {
      "id": "family05:transition:a:d-1:s0_s1",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "room_entry_question",
      "line": "방 안까지 뒤졌다는 식으로 말하지 마세요. 이상해서 문만 잠깐 본 거예요.",
      "behaviorHint": "반사적으로 목소리를 높였다가 마지막 문장에서만 속도를 늦춘다."
    },
    {
      "id": "family05:transition:a:d-1:s1_s2",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-1_presented",
      "line": "로그가 그렇게 남아 있으면 안 들어갔다고는 못 하겠네요. 계약서가 보여서 본 정도예요.",
      "behaviorHint": "증거를 보는 순간 턱 힘이 풀리고 시선이 아래로 떨어진다.",
      "unlocks": [
        "d1.a.unlock.s2.room-docs"
      ]
    },
    {
      "id": "family05:transition:a:d-1:s2_s3",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "landlord_contact_followup",
      "line": "맞아요, 임대인에게도 연락했어요. 그런데 소현이 단독 원룸처럼 말한 것도 사실이잖아요.",
      "behaviorHint": "인정을 시작하자마자 곧바로 상대 책임을 덧붙인다.",
      "unlocks": [
        "d1.a.unlock.s3.landlord-pressure"
      ]
    },
    {
      "id": "family05:transition:a:d-1:s3_s5",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-2_presented",
      "line": "전화랑 문자까지 남아 있으면 더는 못 버티겠네요. 내가 계약을 멈추게 하려 한 거 맞아요.",
      "behaviorHint": "손으로 입가를 누른 채 짧게 시인한다.",
      "unlocks": [
        "d1.a.unlock.s5.full-intrusion"
      ]
    },
    {
      "id": "family05:transition:a:d-3:s0_s1",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "edited_audio_question",
      "line": "있는 그대로라는 말은, 길이만 줄였다는 뜻이었어요. 핵심은 같다고 봤거든요.",
      "behaviorHint": "파일의 진정성보다 '핵심'이라는 표현을 반복한다."
    },
    {
      "id": "family05:transition:a:d-3:s1_s2",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-4_presented",
      "line": "재저장하고 앞뒤를 자른 건 인정해요. 그래도 그때는 그렇게라도 보여줘야 한다고 생각했어요.",
      "behaviorHint": "화면을 응시하며 짧게 고개를 끄덕인다.",
      "unlocks": [
        "d3.a.unlock.s2.clip-resave"
      ]
    },
    {
      "id": "family05:transition:a:d-3:s2_s3",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "waveform_report_followup",
      "line": "예전 조각이 섞였다는 건 알았어요. 창피했고, 내 말만으론 안 믿길 것 같았어요.",
      "behaviorHint": "입술을 깨물고 인정과 수치를 한 문장에 몰아넣는다.",
      "unlocks": [
        "d3.a.unlock.s3.old-phrase"
      ]
    },
    {
      "id": "family05:transition:a:d-3:s3_s5",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-5_presented",
      "line": "포렌식까지 나오면 숨길 수 없어요. 내가 붙여 만든 파일을 임대인에게 보냈습니다.",
      "behaviorHint": "어깨가 크게 내려앉고 눈을 제대로 마주치지 못한다.",
      "unlocks": [
        "d3.a.unlock.s5.fabrication"
      ]
    },
    {
      "id": "family05:transition:a:d-4:s0_s1",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "counselor_rule_question",
      "line": "그 약속이 모든 행동 금지라는 뜻은 아니라고 생각했어요. 확인 정도는 부모가 할 수 있다고 봤죠.",
      "behaviorHint": "합의문보다 자기 해석을 앞세우며 천천히 말한다."
    },
    {
      "id": "family05:transition:a:d-4:s1_s4",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S1",
      "toState": "S4",
      "trigger": "nonjudgmental_question_about_old_scam_fear",
      "line": "예전 일만 떠오르면 약속이고 뭐고 손이 먼저 나가요. 또 그런 계약이면 어떡하나 싶었어요.",
      "behaviorHint": "방어를 풀고 처음으로 감정을 앞세워 토로한다.",
      "unlocks": [
        "d4.a.unlock.s4.old-scam-trigger"
      ]
    },
    {
      "id": "family05:transition:a:d-4:s4_s3",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S4",
      "toState": "S3",
      "trigger": "e-6_presented",
      "line": "상담센터 기록까지 보면 제 해석이 무리였던 거죠. 상담 전에 움직인 건 제 잘못이에요.",
      "behaviorHint": "감정적으로 열렸다가 기록을 보며 다시 차갑게 정리한다.",
      "unlocks": [
        "d4.a.unlock.s3.pre-counsel-contact"
      ]
    },
    {
      "id": "family05:transition:a:d-4:s3_s5",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "shared_responsibility_question",
      "line": "네, 저는 선개입으로 약속을 깼고 소현은 선계약으로 깼어요. 둘 다 책임이 있습니다.",
      "behaviorHint": "마지막 문장에서만 목소리를 평평하게 낮춘다.",
      "unlocks": [
        "d4.a.unlock.s5.mutual-breach"
      ]
    },
    {
      "id": "family05:transition:b:d-2:s0_s1",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "lease_type_question",
      "line": "처음엔 제 방처럼 보였고 공용 부분은 아직 확정 전이라고 생각했어요. 그래서 그렇게 말했어요.",
      "behaviorHint": "설명 범위를 좁히며 시간 순서를 늘어놓는다."
    },
    {
      "id": "family05:transition:b:d-2:s1_s2",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-3_presented",
      "line": "초안이랑 이체증이 같이 나오면 부정은 못 하죠. 공유주거 초안이 있었고 계약금도 먼저 보냈어요.",
      "behaviorHint": "서류를 흘끗 본 뒤 체념한 듯 고개를 끄덕인다.",
      "unlocks": [
        "d2.b.unlock.s2.shared-draft"
      ]
    },
    {
      "id": "family05:transition:b:d-2:s2_s3",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "roommate_clause_followup",
      "line": "제가 단독 원룸처럼 들리게 말한 책임은 있어요. 다만 엄마가 안 끼어들었으면 정리할 시간은 있었어요.",
      "behaviorHint": "짧게 인정하고 곧바로 억울함을 얹는다.",
      "unlocks": [
        "d2.b.unlock.s3.face-saving"
      ]
    },
    {
      "id": "family05:transition:b:d-2:s3_s5",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "responsibility_question",
      "line": "네, 갈등 피하려고 축소 설명했고 그 상태로 계약금을 넣었어요. 이 부분은 제 책임입니다.",
      "behaviorHint": "목소리를 낮추고 문장을 짧게 끊어 책임을 명시한다.",
      "unlocks": [
        "d2.b.unlock.s5.full-minimization"
      ]
    },
    {
      "id": "family05:transition:b:d-4:s0_s1",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "counselor_rule_question",
      "line": "전부 멈춘다기보다 상담 전까지 정리하는 시간이라고 생각했어요. 계약금은 자리만 묶는 수준이라고 봤고요.",
      "behaviorHint": "주어를 흐리며 판단 수위를 낮춘다."
    },
    {
      "id": "family05:transition:b:d-4:s1_s2",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "deposit_timeline_followup",
      "line": "네, 상담 전에 계약금을 보낸 건 맞아요. 엄마가 먼저 움직일까 봐 서둘렀어요.",
      "behaviorHint": "빠르게 인정한 뒤 사유를 덧붙여 방패를 세운다.",
      "unlocks": [
        "d4.b.unlock.s2.deposit-hold"
      ]
    },
    {
      "id": "family05:transition:b:d-4:s2_s3",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "e-6_presented",
      "line": "기록상으로 보면 저는 선계약, 엄마는 선개입이네요. 둘 다 약속을 깬 건 맞아요.",
      "behaviorHint": "중재기록을 보고 잠시 멈췄다가 담담하게 정리한다.",
      "unlocks": [
        "d4.b.unlock.s3.same-promise-break"
      ]
    },
    {
      "id": "family05:transition:b:d-4:s3_s5",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "shared_responsibility_question",
      "line": "엄마 잘못이 있다고 해도 제가 먼저 계약금을 넣은 책임은 없어지지 않아요. 그건 제가 져야 해요.",
      "behaviorHint": "입술을 깨문 뒤 마지막 문장에서 시선을 고정한다.",
      "unlocks": [
        "d4.b.unlock.s5.full-breach"
      ]
    },
    {
      "id": "family05:transition:b:d-5:s0_s1",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "lease_rejection_reason_question",
      "line": "그분이 가족 얘기를 불편해하긴 했는데, 저는 수입 문제를 더 크게 본 줄 알았어요.",
      "behaviorHint": "말끝을 흐리며 확신 없는 추정을 반복한다."
    },
    {
      "id": "family05:transition:b:d-5:s1_s2",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-2_presented",
      "line": "엄마가 연락한 뒤 분위기가 바뀐 건 맞아요. 그래도 그때까진 수입 문제가 더 큰 줄 알았어요.",
      "behaviorHint": "짧은 인정 뒤 바로 스스로의 해석으로 후퇴한다.",
      "unlocks": [
        "d5.b.unlock.s2.tone-change"
      ]
    },
    {
      "id": "family05:transition:b:d-5:s2_s3",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "full_landlord_email_followup",
      "line": "메일을 보면 가족 갈등과 편집 파일이 더 크게 보였네요. 제가 체면 때문에 수입 얘기만 앞세운 셈이에요.",
      "behaviorHint": "메일 문장을 따라 읽다가 목소리가 급격히 약해진다.",
      "unlocks": [
        "d5.b.unlock.s3.email-reason"
      ]
    },
    {
      "id": "family05:transition:b:d-5:s3_s5",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "timeline_reconstruction",
      "line": "최종 거절은 제 수입 자체보다 가족 분쟁 위험 때문이었어요. 알게 된 뒤에도 덜 창피한 이유만 말했습니다.",
      "behaviorHint": "고개를 숙인 채 두 문장을 빠르게 이어 말한다.",
      "unlocks": [
        "d5.b.unlock.s5.real-rejection"
      ]
    }
  ]
}
