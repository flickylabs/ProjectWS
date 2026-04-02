export const spouse06V3GameLoopData = {
  "caseId": "spouse-06",
  "dossierCards": [
    {
      "id": "dossier-1",
      "name": "문장과 소품의 경계",
      "description": "크롭된 스토리 캡처와 예약본을 대조해 의도와 연상 가능성을 가른다.",
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
              "text": "전서희 씨, 예약본엔 #연재문장 #fictiondraft가 붙어 있는데, 최종 화면에선 왜 장르 표시가 거의 보이지 않게 밀렸습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "spouse06:a:d-1:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q2",
              "text": "셔츠, 주차권, 행사 배지를 한 화면에 두고도 남편 연상 가능성을 계산하지 않았다는 말을 재판관이 어떻게 받아들여야 합니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "spouse06:a:d-1:unlock:s4:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q3",
              "text": "삭제 전 미리보기와 메모앱 초안이 같은 문장을 가리키는데, 이 게시물이 감정 배출과 창작 초안 사이에서 어떻게 관리됐는지 설명해 보십시오.",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "spouse06:a:d-5:unlock:s2:0",
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
              "text": "정우람 씨, 이 게시물엔 이름과 회사명이 없습니다. 그럼에도 '직접 겨냥'이라고 확정한 근거를 구체적으로 말해 보십시오.",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "spouse06:b:d-1:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q2",
              "text": "예약본과 캡처를 같이 보면 장르 표시는 있었고 최종 화면에선 빠졌습니다. 그 차이를 확인하기 전에 왜 결론부터 잠갔습니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "spouse06:b:d-1:unlock:s4:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q3",
              "text": "크롭된 캡처만 본 상태에서 회사 리스크로 단정한 판단이, 이번 연쇄 오해의 첫 고리였다는 점을 인정합니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "spouse06:b:d-5:unlock:s2:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-2",
      "name": "공개 범위와 첫 전파",
      "description": "친한 친구 로그와 김태훈 메시지 원본으로 범위 관리와 전파 의도를 가른다.",
      "evidenceIds": [
        "e-3",
        "e-4"
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
              "id": "dossier-2.a.q1",
              "text": "전서희 씨, 조회자 로그상 김태훈 계정이 실제로 스토리를 봤습니다. 아직도 '회사 사람은 없었다'고 말하시겠습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "spouse06:a:d-2:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q2",
              "text": "김태훈의 첫 메시지는 질문형입니다. 그 기록 앞에서도 처음부터 악의적 유포였다고 단정하십니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "spouse06:a:d-3:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q3",
              "text": "친한 친구 목록 혼재와 확인 메시지가 이어진 순서를 보면, 오해의 출발점이 하나가 아니었다는 점을 인정합니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "spouse06:a:d-5:unlock:s3:0",
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
              "text": "정우람 씨, 원본 대화 첫 문장이 '혹시 우람 팀장 컨퍼런스 건 얘기예요?'입니다. 이걸 여전히 노골적 폭로로만 보십니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "spouse06:b:d-3:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q2",
              "text": "작년 행사 뒤에 남은 계정이 문제였다면, 그 혼재 사실을 알고도 경계 정리를 미룬 본인 책임은 어디까지입니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "spouse06:b:d-2:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q3",
              "text": "동료의 확인 메시지와 본인의 해석이 결합해 사건이 커졌다면, '가해자 한 명' 서사는 지나친 단순화 아닌가요?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "spouse06:b:d-5:unlock:s3:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-3",
      "name": "확대 해명과 현실 소품",
      "description": "팀채널 기록과 원본 사진 정보로 확대 대응과 소품 사용 책임을 분리한다.",
      "evidenceIds": [
        "e-5",
        "e-6"
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
              "id": "dossier-3.a.q1",
              "text": "전서희 씨, 팀채널 해명문이 배우자 확인 문자보다 6분 빠릅니다. 이 순서를 본 뒤에도 우람 씨 대응이 '불가피한 최소조치'였다고 보십니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "spouse06:a:d-4:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q2",
              "text": "전날 허락 문자까지 받고 소품을 썼다면, 창작 의도와 현실 식별 단서를 왜 같은 프레임에 묶었습니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "spouse06:a:d-1:unlock:s5:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q3",
              "text": "창작 검열 불안과 상대의 평판 공포가 맞부딪쳤다는 점까지 보이면, 이 사건을 공유 오해의 연쇄로 정리할 수 있습니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "spouse06:a:d-5:unlock:s4:0",
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
              "text": "정우람 씨, 해명문과 HR 문의가 모두 배우자 확인 전입니다. 이 기록 앞에서 아직도 '순서상 문제는 없었다'고 하시겠습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "spouse06:b:d-4:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q2",
              "text": "사실 확인 없이 팀채널과 HR을 먼저 택한 선택이 조직 보호가 아니라 소문 확대가 됐다는 점을 인정합니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "spouse06:b:d-4:unlock:s5:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q3",
              "text": "원본 사진 허락 문자와 해명문 기록을 함께 보면, 게시물·오해·방어가 이어진 연쇄라는 결론을 피할 수 있습니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "spouse06:b:d-5:unlock:s5:0",
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
            "id": "spouse06:a:d-1:unlock:s2:0",
            "factText": "셔츠랑 주차권, 배지를 같이 둔 구도 때문에 우람 씨가 떠오를 수 있다는 점은 뒤늦게 인정해요.",
            "tags": [
              "act",
              "admission"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "channel": {
                "exact": "친한 친구 스토리",
                "neutral": "그 게시물"
              },
              "props": {
                "exact": "구겨진 셔츠·호텔 주차권·행사 배지",
                "neutral": "그 소품들"
              },
              "quote": {
                "exact": "거짓말은 늘 미안하단 메시지로 온다",
                "neutral": "그 문장"
              },
              "person": {
                "exact": "정우람",
                "fullName": "정우람",
                "judgeRef": "남편",
                "neutral": "그 사람"
              },
              "time": {
                "exact": "컨퍼런스 직후 주말",
                "dateExact": "컨퍼런스 직후 주말",
                "period": "승진 면담 직전 주말",
                "neutral": "그 주말"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "spouse06:a:d-1:unlock:s3:0",
            "factText": "다만 크롭된 캡처만 따로 돌면 원래의 해시태그나 앞뒤 맥락이 사라져 의도가 더 날카롭게 보이기도 했어요.",
            "tags": [
              "counter",
              "context"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "channel": {
                "exact": "친한 친구 스토리",
                "neutral": "그 게시물"
              },
              "props": {
                "exact": "구겨진 셔츠·호텔 주차권·행사 배지",
                "neutral": "그 소품들"
              },
              "quote": {
                "exact": "거짓말은 늘 미안하단 메시지로 온다",
                "neutral": "그 문장"
              },
              "person": {
                "exact": "정우람",
                "fullName": "정우람",
                "judgeRef": "남편",
                "neutral": "그 사람"
              },
              "time": {
                "exact": "컨퍼런스 직후 주말",
                "dateExact": "컨퍼런스 직후 주말",
                "period": "승진 면담 직전 주말",
                "neutral": "그 주말"
              }
            },
            "stanceHints": [
              "blame"
            ]
          }
        ],
        "S4": [
          {
            "id": "spouse06:a:d-1:unlock:s4:0",
            "factText": "우람 씨가 승진 면담 직전이라 이런 해석에 특히 예민할 수 있다는 걸 알고 있었어요.",
            "tags": [
              "emotion",
              "relationship"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "channel": {
                "exact": "친한 친구 스토리",
                "neutral": "그 게시물"
              },
              "props": {
                "exact": "구겨진 셔츠·호텔 주차권·행사 배지",
                "neutral": "그 소품들"
              },
              "quote": {
                "exact": "거짓말은 늘 미안하단 메시지로 온다",
                "neutral": "그 문장"
              },
              "person": {
                "exact": "정우람",
                "fullName": "정우람",
                "judgeRef": "남편",
                "neutral": "그 사람"
              },
              "time": {
                "exact": "컨퍼런스 직후 주말",
                "dateExact": "컨퍼런스 직후 주말",
                "period": "승진 면담 직전 주말",
                "neutral": "그 주말"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "spouse06:a:d-1:unlock:s5:0",
            "factText": "직접 폭로하려던 건 아니었지만, 남편 물건을 소품으로 쓰고 해시태그를 거의 안 보이게 둔 건 제 부주의였어요.",
            "tags": [
              "responsibility",
              "admission"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "channel": {
                "exact": "친한 친구 스토리",
                "neutral": "그 게시물"
              },
              "props": {
                "exact": "구겨진 셔츠·호텔 주차권·행사 배지",
                "neutral": "그 소품들"
              },
              "quote": {
                "exact": "거짓말은 늘 미안하단 메시지로 온다",
                "neutral": "그 문장"
              },
              "person": {
                "exact": "정우람",
                "fullName": "정우람",
                "judgeRef": "남편",
                "neutral": "그 사람"
              },
              "time": {
                "exact": "컨퍼런스 직후 주말",
                "dateExact": "컨퍼런스 직후 주말",
                "period": "승진 면담 직전 주말",
                "neutral": "그 주말"
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
            "id": "spouse06:a:d-2:unlock:s2:0",
            "factText": "김태훈 씨 계정이 작년 가족행사 뒤에 남아 있었다는 로그를 보니, 목록 관리가 느슨했던 건 인정해요.",
            "tags": [
              "privacy",
              "admission"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "audience": {
                "exact": "친한 친구 목록",
                "neutral": "그 공개 범위"
              },
              "person": {
                "exact": "김태훈",
                "fullName": "김태훈",
                "judgeRef": "남편 동료",
                "neutral": "그 동료"
              },
              "time": {
                "exact": "작년 가족행사 직후",
                "dateExact": "작년 가족행사 직후",
                "period": "예전 가족행사 뒤",
                "neutral": "그때"
              },
              "platform": {
                "exact": "조회자 로그와 목록 export",
                "neutral": "그 로그"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "spouse06:a:d-2:unlock:s3:0",
            "factText": "그래도 그 목록은 북클럽 운영과 개인 지인을 섞어 오래 써 온 거라, 한 번에 업무 인맥까지 걸러지지 않았어요.",
            "tags": [
              "counter",
              "context"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "audience": {
                "exact": "친한 친구 목록",
                "neutral": "그 공개 범위"
              },
              "person": {
                "exact": "김태훈",
                "fullName": "김태훈",
                "judgeRef": "남편 동료",
                "neutral": "그 동료"
              },
              "time": {
                "exact": "작년 가족행사 직후",
                "dateExact": "작년 가족행사 직후",
                "period": "예전 가족행사 뒤",
                "neutral": "그때"
              },
              "platform": {
                "exact": "조회자 로그와 목록 export",
                "neutral": "그 로그"
              }
            },
            "stanceHints": [
              "blame"
            ]
          }
        ],
        "S4": [
          {
            "id": "spouse06:a:d-2:unlock:s4:0",
            "factText": "사생활 통제를 논의하면 검열받는 느낌이 날까 봐 일부러 더 손을 안 댔어요.",
            "tags": [
              "shame",
              "relationship"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "audience": {
                "exact": "친한 친구 목록",
                "neutral": "그 공개 범위"
              },
              "person": {
                "exact": "김태훈",
                "fullName": "김태훈",
                "judgeRef": "남편 동료",
                "neutral": "그 동료"
              },
              "time": {
                "exact": "작년 가족행사 직후",
                "dateExact": "작년 가족행사 직후",
                "period": "예전 가족행사 뒤",
                "neutral": "그때"
              },
              "platform": {
                "exact": "조회자 로그와 목록 export",
                "neutral": "그 로그"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "spouse06:a:d-2:unlock:s5:0",
            "factText": "결국 친한 친구 범위를 제가 제대로 정리하지 않았고, 그 부주의가 첫 문을 연 건 맞아요.",
            "tags": [
              "responsibility",
              "admission"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "audience": {
                "exact": "친한 친구 목록",
                "neutral": "그 공개 범위"
              },
              "person": {
                "exact": "김태훈",
                "fullName": "김태훈",
                "judgeRef": "남편 동료",
                "neutral": "그 동료"
              },
              "time": {
                "exact": "작년 가족행사 직후",
                "dateExact": "작년 가족행사 직후",
                "period": "예전 가족행사 뒤",
                "neutral": "그때"
              },
              "platform": {
                "exact": "조회자 로그와 목록 export",
                "neutral": "그 로그"
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
            "id": "spouse06:a:d-3:unlock:s2:0",
            "factText": "기록을 보니 김태훈 씨 첫 행동이 공개 폭로라기보단 확인 질문에 가까웠다는 건 인정해요.",
            "tags": [
              "motive",
              "admission"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "person": {
                "exact": "김태훈",
                "fullName": "김태훈",
                "judgeRef": "남편 동료",
                "neutral": "그 사람"
              },
              "channel": {
                "exact": "팀 선임 개인 메시지",
                "neutral": "그 대화창"
              },
              "message": {
                "exact": "혹시 우람 팀장 컨퍼런스 건 얘기예요?",
                "neutral": "그 질문"
              },
              "time": {
                "exact": "팀채널 공개 9분 전",
                "dateExact": "팀채널 공개 9분 전",
                "period": "공개 전 시점",
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
            "id": "spouse06:a:d-3:unlock:s3:0",
            "factText": "다만 확인을 하려 했다면 최소한 우람 씨나 저희 쪽에 먼저 묻는 방식이 더 책임 있는 선택이었겠죠.",
            "tags": [
              "counter",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "exact": "김태훈",
                "fullName": "김태훈",
                "judgeRef": "남편 동료",
                "neutral": "그 사람"
              },
              "channel": {
                "exact": "팀 선임 개인 메시지",
                "neutral": "그 대화창"
              },
              "message": {
                "exact": "혹시 우람 팀장 컨퍼런스 건 얘기예요?",
                "neutral": "그 질문"
              },
              "time": {
                "exact": "팀채널 공개 9분 전",
                "dateExact": "팀채널 공개 9분 전",
                "period": "공개 전 시점",
                "neutral": "그 시점"
              }
            },
            "stanceHints": [
              "blame"
            ]
          }
        ],
        "S4": [
          {
            "id": "spouse06:a:d-3:unlock:s4:0",
            "factText": "김태훈 씨가 남편 회사 사람이라는 점이 제 수치심을 더 키웠어요.",
            "tags": [
              "shame",
              "relationship"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "exact": "김태훈",
                "fullName": "김태훈",
                "judgeRef": "남편 동료",
                "neutral": "그 사람"
              },
              "channel": {
                "exact": "팀 선임 개인 메시지",
                "neutral": "그 대화창"
              },
              "message": {
                "exact": "혹시 우람 팀장 컨퍼런스 건 얘기예요?",
                "neutral": "그 질문"
              },
              "time": {
                "exact": "팀채널 공개 9분 전",
                "dateExact": "팀채널 공개 9분 전",
                "period": "공개 전 시점",
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
            "id": "spouse06:a:d-3:unlock:s5:0",
            "factText": "지금 보면 김태훈 씨가 처음부터 악의를 품고 퍼뜨린 건 아니고, 오해한 채 잘못된 확인을 했다고 보는 게 맞아요.",
            "tags": [
              "responsibility",
              "admission"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "exact": "김태훈",
                "fullName": "김태훈",
                "judgeRef": "남편 동료",
                "neutral": "그 사람"
              },
              "channel": {
                "exact": "팀 선임 개인 메시지",
                "neutral": "그 대화창"
              },
              "message": {
                "exact": "혹시 우람 팀장 컨퍼런스 건 얘기예요?",
                "neutral": "그 질문"
              },
              "time": {
                "exact": "팀채널 공개 9분 전",
                "dateExact": "팀채널 공개 9분 전",
                "period": "공개 전 시점",
                "neutral": "그 시점"
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
            "id": "spouse06:a:d-4:unlock:s2:0",
            "factText": "해명문 시각을 보니 저에게 첫 문자를 보내기 6분 전에 이미 회사 안으로 사건을 넓혀 놨더라고요.",
            "tags": [
              "institution",
              "admission"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "channel": {
                "exact": "팀채널 해명문",
                "neutral": "그 해명문"
              },
              "institution": {
                "exact": "HR 윤리담당 문의",
                "neutral": "그 문의"
              },
              "time": {
                "exact": "배우자 확인 문자 6분 전",
                "dateExact": "문자 6분 전",
                "period": "확인 이전",
                "neutral": "그 전"
              },
              "audience": {
                "exact": "팀 협업툴 공개 범위",
                "neutral": "회사 안 범위"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "spouse06:a:d-4:unlock:s3:0",
            "factText": "게다가 '사적 게시물 오해'라고 크게 설명하는 방식이 오히려 더 많은 사람에게 스크린샷 존재를 알렸어요.",
            "tags": [
              "institution",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "channel": {
                "exact": "팀채널 해명문",
                "neutral": "그 해명문"
              },
              "institution": {
                "exact": "HR 윤리담당 문의",
                "neutral": "그 문의"
              },
              "time": {
                "exact": "배우자 확인 문자 6분 전",
                "dateExact": "문자 6분 전",
                "period": "확인 이전",
                "neutral": "그 전"
              },
              "audience": {
                "exact": "팀 협업툴 공개 범위",
                "neutral": "회사 안 범위"
              }
            },
            "stanceHints": [
              "blame"
            ]
          }
        ],
        "S4": [
          {
            "id": "spouse06:a:d-4:unlock:s4:0",
            "factText": "배우자보다 조직을 먼저 향한 선택이 관계 신뢰를 크게 깎았어요.",
            "tags": [
              "emotion",
              "relationship"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "channel": {
                "exact": "팀채널 해명문",
                "neutral": "그 해명문"
              },
              "institution": {
                "exact": "HR 윤리담당 문의",
                "neutral": "그 문의"
              },
              "time": {
                "exact": "배우자 확인 문자 6분 전",
                "dateExact": "문자 6분 전",
                "period": "확인 이전",
                "neutral": "그 전"
              },
              "audience": {
                "exact": "팀 협업툴 공개 범위",
                "neutral": "회사 안 범위"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "spouse06:a:d-4:unlock:s5:0",
            "factText": "우람 씨가 불안해서 급히 움직인 건 이해해도, 저보다 조직을 먼저 향한 대응은 분명 과했고 책임도 커요.",
            "tags": [
              "responsibility",
              "admission"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "channel": {
                "exact": "팀채널 해명문",
                "neutral": "그 해명문"
              },
              "institution": {
                "exact": "HR 윤리담당 문의",
                "neutral": "그 문의"
              },
              "time": {
                "exact": "배우자 확인 문자 6분 전",
                "dateExact": "문자 6분 전",
                "period": "확인 이전",
                "neutral": "그 전"
              },
              "audience": {
                "exact": "팀 협업툴 공개 범위",
                "neutral": "회사 안 범위"
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
            "id": "spouse06:a:d-5:unlock:s2:0",
            "factText": "친한 친구 범위 관리 실패와 실제 소품 사용이 첫 오해를 낳았다는 점은 인정해요.",
            "tags": [
              "context",
              "admission"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "chain": {
                "exact": "모호한 문장→실제 소품→오해 메시지→팀채널 해명",
                "neutral": "그 연쇄"
              },
              "time": {
                "exact": "승진 면담 직전 주말",
                "dateExact": "승진 면담 직전 주말",
                "period": "민감한 시기",
                "neutral": "그 시기"
              },
              "audience": {
                "exact": "친한 친구 목록과 회사 채널",
                "neutral": "그 공개 범위들"
              },
              "emotion": {
                "exact": "창작 검열 불안과 평판 손실 공포",
                "neutral": "서로의 두려움"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "spouse06:a:d-5:unlock:s3:0",
            "factText": "그 뒤엔 김태훈 씨의 오해, 우람 씨의 선제 해명, 회사 분위기가 차례로 덧붙어 사건이 커졌다고 봐요.",
            "tags": [
              "context",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "chain": {
                "exact": "모호한 문장→실제 소품→오해 메시지→팀채널 해명",
                "neutral": "그 연쇄"
              },
              "time": {
                "exact": "승진 면담 직전 주말",
                "dateExact": "승진 면담 직전 주말",
                "period": "민감한 시기",
                "neutral": "그 시기"
              },
              "audience": {
                "exact": "친한 친구 목록과 회사 채널",
                "neutral": "그 공개 범위들"
              },
              "emotion": {
                "exact": "창작 검열 불안과 평판 손실 공포",
                "neutral": "서로의 두려움"
              }
            },
            "stanceHints": [
              "blame"
            ]
          }
        ],
        "S4": [
          {
            "id": "spouse06:a:d-5:unlock:s4:0",
            "factText": "저는 창작이 검열당할까 두려웠고, 우람 씨는 평판 손실을 두려워했어요.",
            "tags": [
              "fear",
              "relationship"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "chain": {
                "exact": "모호한 문장→실제 소품→오해 메시지→팀채널 해명",
                "neutral": "그 연쇄"
              },
              "time": {
                "exact": "승진 면담 직전 주말",
                "dateExact": "승진 면담 직전 주말",
                "period": "민감한 시기",
                "neutral": "그 시기"
              },
              "audience": {
                "exact": "친한 친구 목록과 회사 채널",
                "neutral": "그 공개 범위들"
              },
              "emotion": {
                "exact": "창작 검열 불안과 평판 손실 공포",
                "neutral": "서로의 두려움"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "spouse06:a:d-5:unlock:s5:0",
            "factText": "결국 이번 갈등은 제 게시물 경계 실패와 남편의 과잉 대응이 이어진 공유 오해의 연쇄였어요.",
            "tags": [
              "responsibility",
              "admission"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "chain": {
                "exact": "모호한 문장→실제 소품→오해 메시지→팀채널 해명",
                "neutral": "그 연쇄"
              },
              "time": {
                "exact": "승진 면담 직전 주말",
                "dateExact": "승진 면담 직전 주말",
                "period": "민감한 시기",
                "neutral": "그 시기"
              },
              "audience": {
                "exact": "친한 친구 목록과 회사 채널",
                "neutral": "그 공개 범위들"
              },
              "emotion": {
                "exact": "창작 검열 불안과 평판 손실 공포",
                "neutral": "서로의 두려움"
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
            "id": "spouse06:b:d-1:unlock:s2:0",
            "factText": "예약본 자료를 보니 처음 의도가 연재 문장이었다는 건 알겠지만, 최종 화면에선 그 맥락이 거의 사라졌더군요.",
            "tags": [
              "act",
              "admission"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "channel": {
                "exact": "친한 친구 스토리 캡처",
                "neutral": "그 화면"
              },
              "props": {
                "exact": "구겨진 셔츠·호텔 주차권·행사 배지",
                "neutral": "그 소품들"
              },
              "quote": {
                "exact": "거짓말은 늘 미안하단 메시지로 온다",
                "neutral": "그 문장"
              },
              "person": {
                "exact": "전서희",
                "fullName": "전서희",
                "judgeRef": "배우자",
                "neutral": "그 사람"
              },
              "time": {
                "exact": "승진 면담 직전 주말",
                "dateExact": "승진 면담 직전 주말",
                "period": "민감한 시기",
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
            "id": "spouse06:b:d-1:unlock:s3:0",
            "factText": "저는 그래서 의도 전체를 폭로라고 단정한 건 지나쳤더라도, 적어도 저를 연상시키게 만든 선택은 서희 씨 쪽 책임이라고 봐요.",
            "tags": [
              "counter",
              "context"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "channel": {
                "exact": "친한 친구 스토리 캡처",
                "neutral": "그 화면"
              },
              "props": {
                "exact": "구겨진 셔츠·호텔 주차권·행사 배지",
                "neutral": "그 소품들"
              },
              "quote": {
                "exact": "거짓말은 늘 미안하단 메시지로 온다",
                "neutral": "그 문장"
              },
              "person": {
                "exact": "전서희",
                "fullName": "전서희",
                "judgeRef": "배우자",
                "neutral": "그 사람"
              },
              "time": {
                "exact": "승진 면담 직전 주말",
                "dateExact": "승진 면담 직전 주말",
                "period": "민감한 시기",
                "neutral": "그때"
              }
            },
            "stanceHints": [
              "blame"
            ]
          }
        ],
        "S4": [
          {
            "id": "spouse06:b:d-1:unlock:s4:0",
            "factText": "저는 내용보다 먼저 '사람들이 나를 어떻게 읽을까'를 계산했습니다.",
            "tags": [
              "shame",
              "relationship"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "channel": {
                "exact": "친한 친구 스토리 캡처",
                "neutral": "그 화면"
              },
              "props": {
                "exact": "구겨진 셔츠·호텔 주차권·행사 배지",
                "neutral": "그 소품들"
              },
              "quote": {
                "exact": "거짓말은 늘 미안하단 메시지로 온다",
                "neutral": "그 문장"
              },
              "person": {
                "exact": "전서희",
                "fullName": "전서희",
                "judgeRef": "배우자",
                "neutral": "그 사람"
              },
              "time": {
                "exact": "승진 면담 직전 주말",
                "dateExact": "승진 면담 직전 주말",
                "period": "민감한 시기",
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
            "id": "spouse06:b:d-1:unlock:s5:0",
            "factText": "지금은 직접 폭로라고 단정한 건 과했다고 인정해요. 다만 실제 소품이 노출돼 제가 그렇게 읽은 이유도 분명 있었어요.",
            "tags": [
              "responsibility",
              "admission"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "channel": {
                "exact": "친한 친구 스토리 캡처",
                "neutral": "그 화면"
              },
              "props": {
                "exact": "구겨진 셔츠·호텔 주차권·행사 배지",
                "neutral": "그 소품들"
              },
              "quote": {
                "exact": "거짓말은 늘 미안하단 메시지로 온다",
                "neutral": "그 문장"
              },
              "person": {
                "exact": "전서희",
                "fullName": "전서희",
                "judgeRef": "배우자",
                "neutral": "그 사람"
              },
              "time": {
                "exact": "승진 면담 직전 주말",
                "dateExact": "승진 면담 직전 주말",
                "period": "민감한 시기",
                "neutral": "그때"
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
            "id": "spouse06:b:d-2:unlock:s2:0",
            "factText": "로그를 보니 김태훈이 예전 가족행사 뒤에 계속 남아 있었고, 그건 단순 실수로 넘길 수준이 아니었어요.",
            "tags": [
              "privacy",
              "admission"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "audience": {
                "exact": "친한 친구 목록",
                "neutral": "그 목록"
              },
              "person": {
                "exact": "김태훈",
                "fullName": "김태훈",
                "judgeRef": "회사 동료",
                "neutral": "그 동료"
              },
              "time": {
                "exact": "작년 가족행사 직후",
                "dateExact": "작년 가족행사 직후",
                "period": "예전 행사 뒤",
                "neutral": "그때"
              },
              "platform": {
                "exact": "조회자 로그",
                "neutral": "그 로그"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "spouse06:b:d-2:unlock:s3:0",
            "factText": "다만 솔직히 말하면 저도 그 인연 몇 명이 남아 있다는 걸 알면서 정리 얘길 미뤘어요.",
            "tags": [
              "counter",
              "context"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "audience": {
                "exact": "친한 친구 목록",
                "neutral": "그 목록"
              },
              "person": {
                "exact": "김태훈",
                "fullName": "김태훈",
                "judgeRef": "회사 동료",
                "neutral": "그 동료"
              },
              "time": {
                "exact": "작년 가족행사 직후",
                "dateExact": "작년 가족행사 직후",
                "period": "예전 행사 뒤",
                "neutral": "그때"
              },
              "platform": {
                "exact": "조회자 로그",
                "neutral": "그 로그"
              }
            },
            "stanceHints": [
              "blame"
            ]
          }
        ],
        "S4": [
          {
            "id": "spouse06:b:d-2:unlock:s4:0",
            "factText": "배우자가 내 직장 경계 문제를 가볍게 본다고 느껴졌어요.",
            "tags": [
              "emotion",
              "relationship"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "audience": {
                "exact": "친한 친구 목록",
                "neutral": "그 목록"
              },
              "person": {
                "exact": "김태훈",
                "fullName": "김태훈",
                "judgeRef": "회사 동료",
                "neutral": "그 동료"
              },
              "time": {
                "exact": "작년 가족행사 직후",
                "dateExact": "작년 가족행사 직후",
                "period": "예전 행사 뒤",
                "neutral": "그때"
              },
              "platform": {
                "exact": "조회자 로그",
                "neutral": "그 로그"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "spouse06:b:d-2:unlock:s5:0",
            "factText": "주된 관리 책임은 서희에게 있었지만, 저도 목록 혼재를 알고도 방치한 몫이 있다는 건 인정합니다.",
            "tags": [
              "responsibility",
              "admission"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "audience": {
                "exact": "친한 친구 목록",
                "neutral": "그 목록"
              },
              "person": {
                "exact": "김태훈",
                "fullName": "김태훈",
                "judgeRef": "회사 동료",
                "neutral": "그 동료"
              },
              "time": {
                "exact": "작년 가족행사 직후",
                "dateExact": "작년 가족행사 직후",
                "period": "예전 행사 뒤",
                "neutral": "그때"
              },
              "platform": {
                "exact": "조회자 로그",
                "neutral": "그 로그"
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
            "id": "spouse06:b:d-3:unlock:s2:0",
            "factText": "대화 원본을 보면 처음부터 폭로하려 들었다기보단 정말 확인하려는 뉘앙스가 있었던 건 맞습니다.",
            "tags": [
              "motive",
              "admission"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "person": {
                "exact": "김태훈",
                "fullName": "김태훈",
                "judgeRef": "회사 동료",
                "neutral": "그 사람"
              },
              "channel": {
                "exact": "팀 선임 메시지",
                "neutral": "그 대화"
              },
              "message": {
                "exact": "혹시 우람 팀장 컨퍼런스 건 얘기예요?",
                "neutral": "그 질문"
              },
              "time": {
                "exact": "팀채널 공개 9분 전",
                "dateExact": "팀채널 공개 9분 전",
                "period": "공개 전",
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
            "id": "spouse06:b:d-3:unlock:s3:0",
            "factText": "그래도 그 확인을 굳이 팀 선임에게 붙여서 한 건, 제 입장에선 체면을 깎는 방향으로 작동했어요.",
            "tags": [
              "counter",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "exact": "김태훈",
                "fullName": "김태훈",
                "judgeRef": "회사 동료",
                "neutral": "그 사람"
              },
              "channel": {
                "exact": "팀 선임 메시지",
                "neutral": "그 대화"
              },
              "message": {
                "exact": "혹시 우람 팀장 컨퍼런스 건 얘기예요?",
                "neutral": "그 질문"
              },
              "time": {
                "exact": "팀채널 공개 9분 전",
                "dateExact": "팀채널 공개 9분 전",
                "period": "공개 전",
                "neutral": "그 시점"
              }
            },
            "stanceHints": [
              "blame"
            ]
          }
        ],
        "S4": [
          {
            "id": "spouse06:b:d-3:unlock:s4:0",
            "factText": "승진 심사 전의 불안이 김태훈에 대한 해석을 더 적대적으로 만들었어요.",
            "tags": [
              "shame",
              "relationship"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "exact": "김태훈",
                "fullName": "김태훈",
                "judgeRef": "회사 동료",
                "neutral": "그 사람"
              },
              "channel": {
                "exact": "팀 선임 메시지",
                "neutral": "그 대화"
              },
              "message": {
                "exact": "혹시 우람 팀장 컨퍼런스 건 얘기예요?",
                "neutral": "그 질문"
              },
              "time": {
                "exact": "팀채널 공개 9분 전",
                "dateExact": "팀채널 공개 9분 전",
                "period": "공개 전",
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
            "id": "spouse06:b:d-3:unlock:s5:0",
            "factText": "지금 보면 김태훈의 첫 반응은 악의적 폭로보단 오해 기반의 확인 질문에 가까웠고, 저는 그걸 더 나쁘게 해석했습니다.",
            "tags": [
              "responsibility",
              "admission"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "exact": "김태훈",
                "fullName": "김태훈",
                "judgeRef": "회사 동료",
                "neutral": "그 사람"
              },
              "channel": {
                "exact": "팀 선임 메시지",
                "neutral": "그 대화"
              },
              "message": {
                "exact": "혹시 우람 팀장 컨퍼런스 건 얘기예요?",
                "neutral": "그 질문"
              },
              "time": {
                "exact": "팀채널 공개 9분 전",
                "dateExact": "팀채널 공개 9분 전",
                "period": "공개 전",
                "neutral": "그 시점"
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
            "id": "spouse06:b:d-4:unlock:s2:0",
            "factText": "기록상 제가 배우자에게 문자 보내기 전에 팀채널과 HR에 먼저 올린 건 인정합니다.",
            "tags": [
              "institution",
              "admission"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "channel": {
                "exact": "팀채널 해명문",
                "neutral": "그 해명문"
              },
              "institution": {
                "exact": "HR 윤리담당 문의",
                "neutral": "그 문의"
              },
              "time": {
                "exact": "배우자 확인 문자 6분 전",
                "dateExact": "문자 6분 전",
                "period": "확인 이전",
                "neutral": "그 전"
              },
              "role": {
                "exact": "팀장 입장",
                "neutral": "그 역할"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "spouse06:b:d-4:unlock:s3:0",
            "factText": "다만 승진 심사 직전이었고, 숙박비나 외근비 얘기로 번질 수 있어 역할상 가만있기 어렵다고 느꼈어요.",
            "tags": [
              "institution",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "channel": {
                "exact": "팀채널 해명문",
                "neutral": "그 해명문"
              },
              "institution": {
                "exact": "HR 윤리담당 문의",
                "neutral": "그 문의"
              },
              "time": {
                "exact": "배우자 확인 문자 6분 전",
                "dateExact": "문자 6분 전",
                "period": "확인 이전",
                "neutral": "그 전"
              },
              "role": {
                "exact": "팀장 입장",
                "neutral": "그 역할"
              }
            },
            "stanceHints": [
              "blame"
            ]
          }
        ],
        "S4": [
          {
            "id": "spouse06:b:d-4:unlock:s4:0",
            "factText": "승진 심사 직전의 공포가 제 판단 속도를 왜곡했어요.",
            "tags": [
              "fear",
              "relationship"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "channel": {
                "exact": "팀채널 해명문",
                "neutral": "그 해명문"
              },
              "institution": {
                "exact": "HR 윤리담당 문의",
                "neutral": "그 문의"
              },
              "time": {
                "exact": "배우자 확인 문자 6분 전",
                "dateExact": "문자 6분 전",
                "period": "확인 이전",
                "neutral": "그 전"
              },
              "role": {
                "exact": "팀장 입장",
                "neutral": "그 역할"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "spouse06:b:d-4:unlock:s5:0",
            "factText": "결과적으로 제 해명문은 성급했고, 확인 없는 선제 대응이 오히려 소문 범위를 넓혔습니다.",
            "tags": [
              "responsibility",
              "admission"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "channel": {
                "exact": "팀채널 해명문",
                "neutral": "그 해명문"
              },
              "institution": {
                "exact": "HR 윤리담당 문의",
                "neutral": "그 문의"
              },
              "time": {
                "exact": "배우자 확인 문자 6분 전",
                "dateExact": "문자 6분 전",
                "period": "확인 이전",
                "neutral": "그 전"
              },
              "role": {
                "exact": "팀장 입장",
                "neutral": "그 역할"
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
            "id": "spouse06:b:d-5:unlock:s2:0",
            "factText": "승진 면담 직전 불안이 커서 저는 모호한 게시물을 가장 불리한 의미로 읽었습니다.",
            "tags": [
              "context",
              "admission"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "chain": {
                "exact": "모호한 문장→오해 확인→공개 해명",
                "neutral": "그 연쇄"
              },
              "time": {
                "exact": "승진 면담 직전",
                "dateExact": "승진 면담 직전",
                "period": "민감한 시기",
                "neutral": "그때"
              },
              "audience": {
                "exact": "회사 채널과 친한 친구 범위",
                "neutral": "그 범위들"
              },
              "emotion": {
                "exact": "망신 회피와 평판 방어",
                "neutral": "그 두려움"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "spouse06:b:d-5:unlock:s3:0",
            "factText": "거기에 김태훈의 확인 메시지와 제 공개 해명이 차례로 붙으면서, 개인 오해가 조직 사건처럼 부풀었습니다.",
            "tags": [
              "context",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "chain": {
                "exact": "모호한 문장→오해 확인→공개 해명",
                "neutral": "그 연쇄"
              },
              "time": {
                "exact": "승진 면담 직전",
                "dateExact": "승진 면담 직전",
                "period": "민감한 시기",
                "neutral": "그때"
              },
              "audience": {
                "exact": "회사 채널과 친한 친구 범위",
                "neutral": "그 범위들"
              },
              "emotion": {
                "exact": "망신 회피와 평판 방어",
                "neutral": "그 두려움"
              }
            },
            "stanceHints": [
              "blame"
            ]
          }
        ],
        "S4": [
          {
            "id": "spouse06:b:d-5:unlock:s4:0",
            "factText": "상처를 공격 서사로 바꾸면 제 불안과 수치가 덜 드러난다고 느꼈어요.",
            "tags": [
              "shame",
              "relationship"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "chain": {
                "exact": "모호한 문장→오해 확인→공개 해명",
                "neutral": "그 연쇄"
              },
              "time": {
                "exact": "승진 면담 직전",
                "dateExact": "승진 면담 직전",
                "period": "민감한 시기",
                "neutral": "그때"
              },
              "audience": {
                "exact": "회사 채널과 친한 친구 범위",
                "neutral": "그 범위들"
              },
              "emotion": {
                "exact": "망신 회피와 평판 방어",
                "neutral": "그 두려움"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "spouse06:b:d-5:unlock:s5:0",
            "factText": "이번 갈등은 서희의 모호한 게시물과 제 과잉 방어, 그리고 회사 안의 오해가 이어진 공유 오해의 연쇄였습니다.",
            "tags": [
              "responsibility",
              "admission"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "chain": {
                "exact": "모호한 문장→오해 확인→공개 해명",
                "neutral": "그 연쇄"
              },
              "time": {
                "exact": "승진 면담 직전",
                "dateExact": "승진 면담 직전",
                "period": "민감한 시기",
                "neutral": "그때"
              },
              "audience": {
                "exact": "회사 채널과 친한 친구 범위",
                "neutral": "그 범위들"
              },
              "emotion": {
                "exact": "망신 회피와 평판 방어",
                "neutral": "그 두려움"
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
        "id": "spouse06:contradiction:0",
        "targetParty": "b",
        "trigger": "정우람이 게시물을 '직접 저격'으로 단정하면서도 이름·회사명 부재를 가볍게 넘길 때",
        "text": "직접 겨냥이라면 왜 게시물엔 이름도 회사명도 없었습니까. 단정은 있었지만 지목은 없었다는 점부터 분리해야 합니다.",
        "relatedDisputes": [
          "d-1",
          "d-5"
        ],
        "evidenceIds": [
          "e-1",
          "e-2"
        ]
      },
      {
        "id": "spouse06:contradiction:1",
        "targetParty": "a",
        "trigger": "전서희가 '친한 사람만 봤다'며 공개 범위를 계속 축소할 때",
        "text": "폐쇄 범위였다는 말과 달리 김태훈 계정은 목록에 남아 있었고 실제 조회까지 했습니다. 범위 관리 실패는 이미 로그로 확인됩니다.",
        "relatedDisputes": [
          "d-2",
          "d-5"
        ],
        "evidenceIds": [
          "e-3"
        ]
      },
      {
        "id": "spouse06:contradiction:2",
        "targetParty": "b",
        "trigger": "정우람이 소문 확산 책임을 전부 김태훈에게만 돌릴 때",
        "text": "김태훈의 확인 메시지보다 팀채널 해명문이 더 넓은 범위에 사건을 알렸습니다. 확대의 핵심 고리를 본인이 만든 셈 아닙니까.",
        "relatedDisputes": [
          "d-3",
          "d-4",
          "d-5"
        ],
        "evidenceIds": [
          "e-4",
          "e-5"
        ]
      },
      {
        "id": "spouse06:contradiction:3",
        "targetParty": "a",
        "trigger": "전서희가 '순수 픽션'만 강조하며 현실 단서 사용을 축소할 때",
        "text": "연재 문장이었다 해도 실제 행사 배지와 주차권, 셔츠를 같은 프레임에 둔 이상 현실 지시성이 생깁니다. 창작과 식별 단서가 분리되지 않았습니다.",
        "relatedDisputes": [
          "d-1",
          "d-5"
        ],
        "evidenceIds": [
          "e-2",
          "e-6"
        ]
      }
    ],
    "interjections": [
      {
        "id": "spouse06:interjection:0",
        "speaker": "a",
        "trigger": "정우람이 의도를 확정하는 표현을 반복할 때",
        "text": "그건 글의 화자였어. 사람 이름을 박아 넣은 문장이 아니었다고.",
        "relatedDisputes": [
          "d-1",
          "d-5"
        ]
      },
      {
        "id": "spouse06:interjection:1",
        "speaker": "b",
        "trigger": "전서희가 공개 범위를 '몇 명 안'으로만 축소할 때",
        "text": "몇 명이 봤는지가 아니라 한 명만 회사 사람이어도 저는 끝장이었어요.",
        "relatedDisputes": [
          "d-2",
          "d-5"
        ]
      },
      {
        "id": "spouse06:interjection:2",
        "speaker": "judge",
        "trigger": "양측이 상처와 도덕평가만 주고받고 사실 순서를 놓칠 때",
        "text": "의도와 파급, 그리고 확인 전후의 순서를 분리해 답하십시오.",
        "relatedDisputes": [
          "d-1",
          "d-3",
          "d-4",
          "d-5"
        ]
      }
    ],
    "emotionalOutbursts": [
      {
        "id": "spouse06:outburst:a:0",
        "party": "a",
        "trigger": "친한 친구 목록 방치를 계속 추궁받을 때",
        "text": "사생활 지키겠다고 만든 공간이 이렇게 무너졌다는 게 제일 수치스러워요. 그걸 제가 게을렀다고만 들으면 더 숨이 막혀요.",
        "relatedDisputes": [
          "d-2",
          "d-5"
        ]
      },
      {
        "id": "spouse06:outburst:a:1",
        "party": "a",
        "trigger": "정우람이 팀장 논리로만 해명문을 정당화할 때",
        "text": "내 글을 회사 보고서처럼 취급하지 말아요. 당신이 먼저 회사에 가져간 순간 더 크게 다 퍼진 거잖아요.",
        "relatedDisputes": [
          "d-4",
          "d-5"
        ]
      },
      {
        "id": "spouse06:outburst:b:0",
        "party": "b",
        "trigger": "승진 직전 불안을 사소하게 취급받을 때",
        "text": "승진 면담 직전에 저런 캡처가 돌면 제 평판은 숫자로 바로 깎입니다. 그 공포를 아무도 가볍게 말할 수는 없어요.",
        "relatedDisputes": [
          "d-1",
          "d-5"
        ]
      },
      {
        "id": "spouse06:outburst:b:1",
        "party": "b",
        "trigger": "과잉 대응 비판만 반복되고 조직 압박은 무시될 때",
        "text": "팀장으로 그 상황을 보고 가만히 있으면 무능으로 읽힙니다. 저는 그 꼬리표가 더 무서웠어요.",
        "relatedDisputes": [
          "d-4",
          "d-5"
        ]
      }
    ]
  },
  "transitionBeats": [
    {
      "id": "spouse06:transition:a:d-1:s0_s1",
      "caseId": "spouse-06",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "targeting_question",
      "line": "겨냥했다기보다 그렇게 읽힐 장면을 제가 너무 가볍게 본 것 같아요.",
      "behaviorHint": "단호하던 시선이 잠깐 흔들린다."
    },
    {
      "id": "spouse06:transition:a:d-1:s1_s2",
      "caseId": "spouse-06",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-1_presented",
      "line": "크롭된 화면만 봐도 우람 씨가 떠오를 수 있다는 건 이제 부정하기 어렵네요.",
      "behaviorHint": "캡처를 본 뒤 입술을 깨문다."
    },
    {
      "id": "spouse06:transition:a:d-1:s2_s4",
      "caseId": "spouse-06",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S2",
      "toState": "S4",
      "trigger": "nonjudgmental_question_about_writing_intent",
      "line": "저는 사람을 찌르려기보다 어떤 공기를 문장으로 붙잡고 싶었던 거예요.",
      "behaviorHint": "목소리가 낮아지며 변명보다 감정이 앞선다."
    },
    {
      "id": "spouse06:transition:a:d-1:s4_s5",
      "caseId": "spouse-06",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S4",
      "toState": "S5",
      "trigger": "e-6_or_e-2_presented",
      "line": "창작 의도와 별개로 현실 소품을 쓴 제 선택이 경계를 무너뜨렸어요.",
      "behaviorHint": "고개를 천천히 끄덕인다."
    },
    {
      "id": "spouse06:transition:a:d-2:s0_s1",
      "caseId": "spouse-06",
      "party": "a",
      "disputeId": "d-2",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "audience_question",
      "line": "친한 친구라 안심했지, 실제로 누가 남았는지 끝까지 보진 않았어요.",
      "behaviorHint": "손가락을 꼼지락거리며 말끝을 낮춘다."
    },
    {
      "id": "spouse06:transition:a:d-2:s1_s2",
      "caseId": "spouse-06",
      "party": "a",
      "disputeId": "d-2",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-3_presented",
      "line": "로그가 여기까지 나오면 목록 관리가 느슨했다는 건 인정해야겠네요.",
      "behaviorHint": "표정을 굳힌 채 짧게 인정한다."
    },
    {
      "id": "spouse06:transition:a:d-2:s2_s3",
      "caseId": "spouse-06",
      "party": "a",
      "disputeId": "d-2",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "close_friends_followup",
      "line": "그래도 그 목록은 오래 섞여 굴러온 거라 한 번에 정리되지 않았어요.",
      "behaviorHint": "자책과 변명이 뒤섞인 미소를 짓는다."
    },
    {
      "id": "spouse06:transition:a:d-2:s3_s5",
      "caseId": "spouse-06",
      "party": "a",
      "disputeId": "d-2",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "responsibility_question",
      "line": "결국 정리 버튼을 누르지 않은 건 저였어요. 그 책임은 피할 수 없어요.",
      "behaviorHint": "고개를 숙인 채 조용히 마무리한다."
    },
    {
      "id": "spouse06:transition:a:d-5:s0_s1",
      "caseId": "spouse-06",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "overall_cause_question",
      "line": "처음엔 남편 해명만 크게 보였는데, 제 게시물이 입구였다는 점도 이제는 보여요.",
      "behaviorHint": "날카로운 표정이 조금 풀린다."
    },
    {
      "id": "spouse06:transition:a:d-5:s1_s2",
      "caseId": "spouse-06",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-2_or_e-3_presented",
      "line": "문장, 소품, 목록 로그를 같이 보면 첫 오해가 어디서 시작됐는지 분명하네요.",
      "behaviorHint": "증거를 번갈아 보며 천천히 말한다."
    },
    {
      "id": "spouse06:transition:a:d-5:s2_s3",
      "caseId": "spouse-06",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "question_about_mixed_audience",
      "line": "그 뒤에는 김태훈 씨의 확인과 우람 씨의 대응이 차례로 붙으면서 일이 커졌어요.",
      "behaviorHint": "손가락으로 순서를 세어 보인다."
    },
    {
      "id": "spouse06:transition:a:d-5:s3_s5",
      "caseId": "spouse-06",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "responsibility_question",
      "line": "네, 이건 한 사람의 악의가 아니라 서로의 부주의와 두려움이 이어진 연쇄였어요.",
      "behaviorHint": "체념한 듯 어깨를 내린다."
    },
    {
      "id": "spouse06:transition:b:d-3:s0_s1",
      "caseId": "spouse-06",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "coworker_motive_question",
      "line": "악의라고 단정한 건 감정이 앞섰을 수 있습니다. 그래도 선을 넘은 건 맞다고 봤어요.",
      "behaviorHint": "턱을 쥔 손이 살짝 풀린다."
    },
    {
      "id": "spouse06:transition:b:d-3:s1_s2",
      "caseId": "spouse-06",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-4_presented",
      "line": "이 대화를 보면 시작은 폭로보다 확인 쪽이군요. 그 부분은 제가 과장했습니다.",
      "behaviorHint": "시선을 아래로 떨군다."
    },
    {
      "id": "spouse06:transition:b:d-3:s2_s3",
      "caseId": "spouse-06",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "private_vs_public_followup",
      "line": "다만 확인을 하더라도 사적인 캡처를 회사 선임에게 붙인 건 부주의했습니다.",
      "behaviorHint": "말끝을 단단하게 조인다."
    },
    {
      "id": "spouse06:transition:b:d-3:s3_s5",
      "caseId": "spouse-06",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-5_or_shared_misunderstanding_question",
      "line": "결국 저는 제 망신을 한 사람 악의로 정리하고 싶어서 김태훈을 더 나쁘게 봤습니다.",
      "behaviorHint": "짧게 숨을 고른 뒤 인정한다."
    },
    {
      "id": "spouse06:transition:b:d-4:s0_s1",
      "caseId": "spouse-06",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "team_channel_question",
      "line": "방어가 필요하다고 본 건 맞지만, 확인보다 선조치를 택한 순서는 다시 보게 됩니다.",
      "behaviorHint": "단호한 톤이 조금 느슨해진다."
    },
    {
      "id": "spouse06:transition:b:d-4:s1_s2",
      "caseId": "spouse-06",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-5_presented",
      "line": "기록이 명확하군요. 배우자 확인 전에 이미 팀채널과 HR로 움직였습니다.",
      "behaviorHint": "입술을 굳게 다문다."
    },
    {
      "id": "spouse06:transition:b:d-4:s2_s3",
      "caseId": "spouse-06",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "audience_size_followup",
      "line": "그때는 승진 심사와 팀 평판이 한꺼번에 떠올라 역할을 우선할 수밖에 없다고 느꼈습니다.",
      "behaviorHint": "허리를 세우며 역할론을 붙든다."
    },
    {
      "id": "spouse06:transition:b:d-4:s3_s5",
      "caseId": "spouse-06",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "responsibility_question",
      "line": "하지만 결과만 보면 제 해명문이 더 넓게 사건을 알렸습니다. 그 책임은 제 몫입니다.",
      "behaviorHint": "어깨를 떨군 채 시선을 정면으로 둔다."
    },
    {
      "id": "spouse06:transition:b:d-5:s0_s1",
      "caseId": "spouse-06",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "overall_cause_question",
      "line": "처음엔 원인을 전부 스토리에 돌렸지만, 제 해석이 너무 빨리 닫힌 것도 사실입니다.",
      "behaviorHint": "결론형 말투가 잠시 느려진다."
    },
    {
      "id": "spouse06:transition:b:d-5:s1_s2",
      "caseId": "spouse-06",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "small_admission_about_promotion_anxiety",
      "line": "승진 면담 직전이라는 불안이 저를 가장 불리한 뜻으로 몰아갔습니다.",
      "behaviorHint": "목덜미를 쓸어내리며 한숨을 삼킨다."
    },
    {
      "id": "spouse06:transition:b:d-5:s2_s3",
      "caseId": "spouse-06",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "prop_context_question",
      "line": "그 뒤엔 확인 메시지와 제 해명문이 붙으면서 오해가 조직 사건처럼 커졌죠.",
      "behaviorHint": "손으로 순서를 따라가듯 허공을 가른다."
    },
    {
      "id": "spouse06:transition:b:d-5:s3_s5",
      "caseId": "spouse-06",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "responsibility_question",
      "line": "네, 이번 일은 서희의 모호한 게시물과 제 과잉 방어가 이어진 공유 오해의 연쇄였습니다.",
      "behaviorHint": "눈을 감았다 뜬 뒤 차분히 인정한다."
    }
  ]
} as const;

export default spouse06V3GameLoopData;
