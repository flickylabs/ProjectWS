export const workplace07V3GameLoopData = {
  "caseId": "workplace-07",
  "dossierCards": [
    {
      "id": "dossier-1",
      "name": "익명 글 초기 파장 카드",
      "description": "익명 게시글 초기 확산과 첫 캡처의 사용 방식에 집중한다.",
      "evidenceIds": [
        "e-1",
        "e-2"
      ],
      "relatedDisputes": [
        "d-1",
        "d-2",
        "d-5"
      ],
      "subjectParty": "both",
      "challenges": [
        {
          "targetParty": "a",
          "questions": [
            {
              "id": "dossier-1.a.q1",
              "text": "장태욱 씨, 익명 글이 올라온 지 두 시간도 안 돼 팀 미팅에서 특정 제보자를 암시하는 표현을 꺼낸 이유가 무엇입니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "workplace-07:a:d-1:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q2",
              "text": "회의 메모만 이어 봐도 팀이 한세린 씨를 떠올릴 수 있는 흐름인데, 그 상태를 방치한 게 사실상 선행 낙인 아닌가요?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "workplace-07:a:d-1:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q3",
              "text": "과거 사건을 떼어 놓는다는 말로 한세린 씨의 문제제기 전체를 과장처럼 보이게 만든 적은 없습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "workplace-07:a:d-5:unlock:s2:0",
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
              "text": "한세린 씨, 이 캡처 묶음을 익명 게시글 본문에 붙여 올린 본인이 맞습니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "workplace-07:b:d-2:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q2",
              "text": "채널명과 타임스탬프를 자른 상태로 멘토와 동료들에게도 전달한 이유가 무엇입니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "workplace-07:b:d-2:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q3",
              "text": "윤리경영 핫라인보다 공개 게시판을 먼저 택한 건 과거 사건을 현재 공격력으로 키우려는 판단이었습니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "workplace-07:b:d-5:unlock:s2:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-2",
      "name": "원본 대조와 과거 회의록 카드",
      "description": "현재 캡처의 진정성과 2년 전 제보 축소 패턴을 함께 대조한다.",
      "evidenceIds": [
        "e-3",
        "e-4"
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
              "id": "dossier-2.a.q1",
              "text": "장태욱 씨, 2년 전 회의록에 '외부 공포를 키우지 말자'며 등급 표현을 낮추자고 한 문구가 있는데, 그 제안을 직접 하신 게 맞습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "workplace-07:a:d-4:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q2",
              "text": "세린 씨의 원안 공개 제기를 만류하고 낮은 등급 문안으로 돌린 뒤 후속 메일까지 관리한 건 절차 문제가 아니라 판단 개입 아닌가요?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "workplace-07:a:d-4:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q3",
              "text": "지금도 과거 사건을 별건처럼 잘라 세린 씨의 현재 진술 신뢰도를 깎아내리는 방식으로 쓰고 계신 것 아닙니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "workplace-07:a:d-5:unlock:s3:0",
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
              "text": "한세린 씨, 메신저 원본 export와 해시 비교표상 이 문장은 올해가 아니라 2년 전 대화에서 나온 것으로 보입니다. 이 점 인정하십니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "workplace-07:b:d-3:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q2",
              "text": "현재 프로젝트 헤더를 붙인 이유가 무엇입니까? 같은 문장을 올해 지시처럼 보이게 하려던 것 아닙니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "workplace-07:b:d-3:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q3",
              "text": "2년 전 실제 억압 경험이 있었다고 해도, 그 기억을 이번 사건의 단일 원본처럼 제시한 건 별개의 문제 아닌가요?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "workplace-07:b:d-5:unlock:s3:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-3",
      "name": "보복 조치와 편집 세션 카드",
      "description": "포렌식 전 보복성 조치와 편집 세션 로그를 함께 압박한다.",
      "evidenceIds": [
        "e-5",
        "e-6"
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
              "id": "dossier-3.a.q1",
              "text": "장태욱 씨, 포렌식 결과 전인데도 세린 씨의 리뷰 참여 제외와 부정적 평가 코멘트를 먼저 입력하신 이유가 무엇입니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "workplace-07:a:d-1:unlock:s4:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q2",
              "text": "익명 제보자 보호가 살아 있어야 하는 시점에 평가권까지 건드린 건 '보호적 분리'가 아니라 보복으로 읽힐 수 있다는 점을 아셨습니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "workplace-07:a:d-1:unlock:s5:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q3",
              "text": "2년 전 제보 축소와 이번 평가 개입이 한 줄기 패턴이라는 책임을 지금 인정하십니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "workplace-07:a:d-4:unlock:s5:0",
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
              "text": "한세린 씨, 편집 PC 로그에 과거 대화 이미지와 현재 채널 상단 바가 같은 세션에서 열린 기록이 남아 있습니다. 직접 합친 것이 맞습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "workplace-07:b:d-3:unlock:s4:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q2",
              "text": "그 편집본을 통해 태욱 씨가 현재 증거인멸을 지시한 것처럼 보이게 만든 책임을 인정하십니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "workplace-07:b:d-3:unlock:s5:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q3",
              "text": "과거에 눌렸던 경험이 사실이더라도, 이번에는 허위 편집 증거로 명예전을 키운 공동 책임을 인정하십니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "workplace-07:b:d-5:unlock:s5:0",
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
            "id": "workplace-07:a:d-1:unlock:s2:0",
            "factText": "익명 글 게시 후 두 시간도 지나지 않아 태욱이 팀 미팅에서 특정 제보자를 암시하는 표현을 꺼냈다는 사실",
            "tags": [
              "timeline",
              "identity"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "time": {
                "exact": "익명 글 게시 후 두 시간 이내",
                "neutral": "그 직후",
                "dateExact": "익명 글 게시 후 두 시간 이내",
                "period": "게시 직후"
              },
              "quote": {
                "exact": "'안에서 이런 식으로 사람 죽이는 글'",
                "neutral": "그 표현"
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
            "id": "workplace-07:a:d-1:unlock:s3:0",
            "factText": "포렌식 결과 전에 세린의 리뷰 참여 제외와 부정적 평가 코멘트 입력이 먼저 진행됐다는 사실",
            "tags": [
              "act",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "exact": "한세린",
                "neutral": "상대방",
                "fullName": "한세린",
                "judgeRef": "한세린 씨"
              },
              "action": {
                "exact": "리뷰 참여 제외와 부정적 평가 코멘트 입력",
                "neutral": "그 조치"
              }
            },
            "stanceHints": [
              "blame",
              "admission"
            ]
          }
        ],
        "S4": [
          {
            "id": "workplace-07:a:d-1:unlock:s4:0",
            "factText": "태욱이 품질총괄 라인에서 신뢰를 잃을까 두려워 익명 제보자 보호보다 자신의 평판 방어를 먼저 택했다는 사실",
            "tags": [
              "fear",
              "motive"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "institution": {
                "exact": "품질총괄 라인",
                "neutral": "상부 라인"
              },
              "harm": {
                "exact": "증거인멸 지시 관리자라는 낙인",
                "neutral": "그 낙인"
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
            "id": "workplace-07:a:d-1:unlock:s5:0",
            "factText": "태욱이 선행 낙인과 역할 배제가 보호 조치가 아니라 보복성 대응이었음을 스스로 인정하는 사실",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "label": {
                "exact": "보호적 분리",
                "neutral": "그 표현"
              },
              "truth": {
                "exact": "보복성 대응",
                "neutral": "실제 성격"
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
            "id": "workplace-07:a:d-4:unlock:s2:0",
            "factText": "2년 전 회의에서 태욱이 결함 등급 표현을 낮추자고 직접 제안했다는 사실",
            "tags": [
              "legacy_sentence",
              "act"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "time": {
                "exact": "2년 전 결함등급 하향 회의",
                "neutral": "그 회의",
                "dateExact": "2년 전",
                "period": "당시"
              },
              "quote": {
                "exact": "'외부 공포를 키우지 말자'",
                "neutral": "그 문장"
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
            "id": "workplace-07:a:d-4:unlock:s3:0",
            "factText": "태욱이 세린의 원안 공개 제기를 만류하고 낮은 등급 문안으로 돌린 뒤 후속 메일까지 관리했다는 사실",
            "tags": [
              "act",
              "rule"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "exact": "한세린",
                "neutral": "상대방",
                "fullName": "한세린",
                "judgeRef": "한세린 씨"
              },
              "document": {
                "exact": "후속 메일 체인",
                "neutral": "그 메일"
              }
            },
            "stanceHints": [
              "blame",
              "admission"
            ]
          }
        ],
        "S4": [
          {
            "id": "workplace-07:a:d-4:unlock:s4:0",
            "factText": "태욱이 고객 공포와 출하 압박을 핑계로 제보 축소를 자기합리화해 왔다는 사실",
            "tags": [
              "motive",
              "fear"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "fear": {
                "exact": "고객 공포와 출하 지연",
                "neutral": "그 부담"
              },
              "label": {
                "exact": "표현 조정",
                "neutral": "그 표현"
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
            "id": "workplace-07:a:d-4:unlock:s5:0",
            "factText": "태욱이 과거 제보 축소와 현재 평가 개입이 한 줄기 보복 패턴이었음을 인정하는 사실",
            "tags": [
              "admission",
              "legacy_sentence"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "time": {
                "exact": "2년 전과 이번 익명 글 이후",
                "neutral": "두 시점",
                "dateExact": "2년 전과 현재",
                "period": "반복된 시기"
              },
              "action": {
                "exact": "제보 축소와 평가 개입",
                "neutral": "그 반복"
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
            "id": "workplace-07:a:d-5:unlock:s2:0",
            "factText": "태욱이 과거 사건을 현재 건과 분리한다는 명분으로 세린의 문제제기 전체를 과장처럼 보이게 만들었다는 사실",
            "tags": [
              "context",
              "identity"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "label": {
                "exact": "현재 건은 현재 건입니다",
                "neutral": "그 선 긋기"
              },
              "person": {
                "exact": "한세린",
                "neutral": "상대방",
                "fullName": "한세린",
                "judgeRef": "한세린 씨"
              }
            },
            "stanceHints": [
              "partial",
              "counter"
            ]
          }
        ],
        "S3": [
          {
            "id": "workplace-07:a:d-5:unlock:s3:0",
            "factText": "태욱이 과거 미종결 사건을 '또 과장한다'는 식의 현재 평가 재료로 재활용했다는 사실",
            "tags": [
              "harm",
              "relationship"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "time": {
                "exact": "이번 익명 글 이후",
                "neutral": "그 뒤",
                "dateExact": "익명 글 이후",
                "period": "현재 대응 국면"
              },
              "quote": {
                "exact": "'또 과장한다'",
                "neutral": "그 프레임"
              }
            },
            "stanceHints": [
              "blame",
              "admission"
            ]
          }
        ],
        "S4": [
          {
            "id": "workplace-07:a:d-5:unlock:s4:0",
            "factText": "태욱이 과거 미종결 사건이 다시 소환될수록 자신의 평판 방어를 위해 더 강하게 선을 그었다는 사실",
            "tags": [
              "fear",
              "context"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "fear": {
                "exact": "품질은폐 관리자라는 평판",
                "neutral": "그 평판"
              },
              "time": {
                "exact": "과거 사건 재소환 국면",
                "neutral": "그 시점",
                "dateExact": "과거 사건 재소환 시점",
                "period": "재조명 국면"
              }
            },
            "stanceHints": [
              "emotional",
              "uncertainty"
            ]
          }
        ],
        "S5": [
          {
            "id": "workplace-07:a:d-5:unlock:s5:0",
            "factText": "태욱이 과거 미종결 사건을 현재 명예전의 방어 논리로 쓴 공동 책임을 인정하는 사실",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "exact": "한세린",
                "neutral": "상대방",
                "fullName": "한세린",
                "judgeRef": "한세린 씨"
              },
              "action": {
                "exact": "현재 명예전의 방어 논리",
                "neutral": "그 용도"
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
      "d-2": {
        "S2": [
          {
            "id": "workplace-07:b:d-2:unlock:s2:0",
            "factText": "세린이 익명 게시글 본문에 문제 캡처를 붙여 올린 장본인이라는 사실",
            "tags": [
              "act",
              "identity"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "evidence": {
                "exact": "익명 게시글과 캡처 묶음",
                "neutral": "그 자료"
              },
              "person": {
                "exact": "한세린",
                "neutral": "상대방",
                "fullName": "한세린",
                "judgeRef": "한세린 씨"
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
            "id": "workplace-07:b:d-2:unlock:s3:0",
            "factText": "세린이 편집 캡처를 멘토와 동료들에게 추가로 재전송해 확산 범위를 넓혔다는 사실",
            "tags": [
              "timeline",
              "harm"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "exact": "멘토와 동료들",
                "neutral": "주변 사람들"
              },
              "action": {
                "exact": "추가 재전송",
                "neutral": "그 확산"
              }
            },
            "stanceHints": [
              "blame",
              "admission"
            ]
          }
        ],
        "S4": [
          {
            "id": "workplace-07:b:d-2:unlock:s4:0",
            "factText": "세린이 허위 제보자 낙인보다 먼저 눌릴 것이라는 두려움 때문에 게시판 확산을 자기보호로 정당화했다는 사실",
            "tags": [
              "fear",
              "self_justification"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "fear": {
                "exact": "허위 제보자 낙인",
                "neutral": "그 낙인"
              },
              "place": {
                "exact": "사내 익명 게시판",
                "neutral": "그 게시판"
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
            "id": "workplace-07:b:d-2:unlock:s5:0",
            "factText": "세린이 장태욱의 현재 범죄행위처럼 보이도록 익명 글과 편집 캡처를 유포한 책임을 인정하는 사실",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "exact": "장태욱",
                "neutral": "상대방",
                "fullName": "장태욱",
                "judgeRef": "장태욱 씨"
              },
              "harm": {
                "exact": "현재 범죄행위처럼 보이게 한 유포",
                "neutral": "그 유포"
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
            "id": "workplace-07:b:d-3:unlock:s2:0",
            "factText": "세린이 현재 프로젝트 헤더와 2년 전 채팅 문장을 한 화면처럼 결합해 사용했다는 사실",
            "tags": [
              "evidence",
              "timeline"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "time": {
                "exact": "현재 프로젝트 헤더와 2년 전 문장",
                "neutral": "서로 다른 시점",
                "dateExact": "현재와 2년 전",
                "period": "이질적 시점"
              },
              "action": {
                "exact": "한 화면처럼 결합",
                "neutral": "그 결합"
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
            "id": "workplace-07:b:d-3:unlock:s3:0",
            "factText": "문제 캡처가 단일 원본이 아니라 절삭과 합성 흔적이 겹친 편집본이라는 사실",
            "tags": [
              "evidence",
              "context"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "evidence": {
                "exact": "절삭과 합성 흔적",
                "neutral": "그 흔적"
              },
              "document": {
                "exact": "단일 원본 캡처",
                "neutral": "원본 주장"
              }
            },
            "stanceHints": [
              "blame",
              "admission"
            ]
          }
        ],
        "S4": [
          {
            "id": "workplace-07:b:d-3:unlock:s4:0",
            "factText": "세린이 자신의 편집 행위를 '맥락 복원'이라고 부르며 현재 허위성을 스스로 축소했다는 사실",
            "tags": [
              "self_justification",
              "shame"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "label": {
                "exact": "맥락 복원",
                "neutral": "그 표현"
              },
              "truth": {
                "exact": "현재 허위성",
                "neutral": "그 문제"
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
            "id": "workplace-07:b:d-3:unlock:s5:0",
            "factText": "세린이 문제 캡처가 태욱의 현 시점 증거인멸 지시 원본이 아니었음을 인정하는 사실",
            "tags": [
              "admission",
              "evidence"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "exact": "장태욱",
                "neutral": "상대방",
                "fullName": "장태욱",
                "judgeRef": "장태욱 씨"
              },
              "evidence": {
                "exact": "현 시점 증거인멸 지시 원본",
                "neutral": "그 원본 주장"
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
            "id": "workplace-07:b:d-5:unlock:s2:0",
            "factText": "세린이 과거 억압 경험을 현재 익명 글의 공격력으로 키우기 위해 앞세웠다는 사실",
            "tags": [
              "context",
              "motive"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "time": {
                "exact": "2년 전 미종결 사건",
                "neutral": "과거 사건",
                "dateExact": "2년 전",
                "period": "미종결 과거"
              },
              "action": {
                "exact": "현재 익명 글의 공격력",
                "neutral": "그 용도"
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
            "id": "workplace-07:b:d-5:unlock:s3:0",
            "factText": "세린이 본부 전체가 보는 게시판을 골라 과거와 현재를 한 덩어리 명예전으로 확산시켰다는 사실",
            "tags": [
              "harm",
              "context"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "place": {
                "exact": "회사 전체가 보는 익명 게시판",
                "neutral": "그 공간"
              },
              "action": {
                "exact": "과거와 현재를 한 덩어리로 확산",
                "neutral": "그 확산"
              }
            },
            "stanceHints": [
              "blame",
              "admission"
            ]
          }
        ],
        "S4": [
          {
            "id": "workplace-07:b:d-5:unlock:s4:0",
            "factText": "세린이 '그때도 묻혔다'는 상처 때문에 핫라인보다 공개 게시판을 먼저 택했다는 사실",
            "tags": [
              "fear",
              "legacy_sentence"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "quote": {
                "exact": "'그때도 묻혔다'",
                "neutral": "그 기억"
              },
              "rule": {
                "exact": "윤리경영 핫라인보다 공개 게시판 선택",
                "neutral": "그 선택"
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
            "id": "workplace-07:b:d-5:unlock:s5:0",
            "factText": "세린이 과거 실제 문제와 현재 편집 증거를 섞어 현재 명예전을 키운 공동 책임을 인정하는 사실",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "truth": {
                "exact": "과거 실제 문제와 현재 편집 증거의 혼합",
                "neutral": "그 혼합"
              },
              "harm": {
                "exact": "현재 명예전 확대",
                "neutral": "그 확대"
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
        "id": "workplace-07:contradiction:0",
        "targetParty": "a",
        "trigger": "장태욱이 특정 제보자 암시를 부인한 뒤 e-1과 e-5가 함께 제시될 때",
        "text": "포렌식 전 부인과 달리, 팀 미팅 메모와 평가 로그의 시간 순서는 한세린 씨를 먼저 의심하고 배제한 흐름과 정확히 맞닿습니다.",
        "relatedDisputes": [
          "d-1",
          "d-4"
        ],
        "evidenceIds": [
          "e-1",
          "e-5"
        ]
      },
      {
        "id": "workplace-07:contradiction:1",
        "targetParty": "b",
        "trigger": "한세린이 캡처가 현재 원본이라고 버틴 뒤 e-2와 e-3이 대조될 때",
        "text": "현재 채널 헤더와 2년 전 메시지 해시가 이어지지 않아, '단일 원본 캡처'라는 설명은 성립하지 않습니다.",
        "relatedDisputes": [
          "d-3"
        ],
        "evidenceIds": [
          "e-2",
          "e-3"
        ]
      },
      {
        "id": "workplace-07:contradiction:2",
        "targetParty": "a",
        "trigger": "장태욱이 과거 개입을 단순 표현 조정이라고 축소한 뒤 e-4가 제시될 때",
        "text": "회의록과 후속 메일은 단순 문구 손질이 아니라 세린 씨의 공개 문제제기를 실제로 낮은 등급으로 돌린 개입을 보여 줍니다.",
        "relatedDisputes": [
          "d-4",
          "d-5"
        ],
        "evidenceIds": [
          "e-4"
        ]
      },
      {
        "id": "workplace-07:contradiction:3",
        "targetParty": "b",
        "trigger": "한세린이 단순 제보였다고 주장한 뒤 e-2와 e-6이 함께 제시될 때",
        "text": "편집 PC 로그와 추가 전송 정황을 합치면, 개인적 경고를 넘어 본부 여론을 움직이려는 확산 행위가 있었다는 쪽이 더 자연스럽습니다.",
        "relatedDisputes": [
          "d-2",
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
        "id": "workplace-07:interjection:0",
        "speaker": "a",
        "trigger": "한세린이 캡처 진위 질문에 계속 과거 상처만 먼저 꺼낼 때",
        "text": "현재 캡처 진위부터 보셔야 합니다. 과거 건을 섞으면 사실관계가 더 흐려집니다.",
        "relatedDisputes": [
          "d-3",
          "d-5"
        ]
      },
      {
        "id": "workplace-07:interjection:1",
        "speaker": "b",
        "trigger": "장태욱이 리뷰 제외를 운영 판단이라고만 반복할 때",
        "text": "그 '운영 판단' 때문에 제가 바로 문제 인원처럼 됐잖아요.",
        "relatedDisputes": [
          "d-1",
          "d-4"
        ]
      },
      {
        "id": "workplace-07:interjection:2",
        "speaker": "judge",
        "trigger": "양측이 과거 억압과 현재 편집 증거를 한 문장으로 묶어 말할 때",
        "text": "과거 제보 축소 여부와 이번 편집 증거의 진정성은 분리해서 답하십시오.",
        "relatedDisputes": [
          "d-3",
          "d-5"
        ]
      }
    ],
    "emotionalOutbursts": [
      {
        "id": "workplace-07:outburst:a:0",
        "party": "a",
        "trigger": "e-5 제시 뒤에도 보복성 평가 개입이 반복 추궁될 때",
        "text": "제가 처음부터 사람 하나 찍어 누르려고 기록을 남긴 사람처럼만 몰리면 억울합니다. 그래도 그때 제가 과민하게 움직인 건 인정합니다.",
        "relatedDisputes": [
          "d-1",
          "d-4"
        ]
      },
      {
        "id": "workplace-07:outburst:a:1",
        "party": "a",
        "trigger": "한세린이 과거 사건을 다시 현재 범죄 프레임과 붙일 때",
        "text": "과거 건까지 전부 묶어서 저를 지금 범죄자처럼 세우는 건 받아들이기 어렵습니다.",
        "relatedDisputes": [
          "d-3",
          "d-5"
        ]
      },
      {
        "id": "workplace-07:outburst:b:0",
        "party": "b",
        "trigger": "장태욱이 캡처 형식만 문제 삼고 과거 억압을 계속 축소할 때",
        "text": "그때도 형식만 보셨고 본질은 안 봤어요. 이번에도 제가 먼저 거짓말쟁이로 찍히는 게 제일 무서웠어요.",
        "relatedDisputes": [
          "d-3",
          "d-4"
        ]
      },
      {
        "id": "workplace-07:outburst:b:1",
        "party": "b",
        "trigger": "장태욱이 리뷰 제외를 '보호적 분리'라고 부를 때",
        "text": "그 '보호적 분리'라는 말 때문에 제가 또 조용히 밀려난 거예요.",
        "relatedDisputes": [
          "d-1",
          "d-5"
        ]
      }
    ]
  },
  "transitionBeats": [
    {
      "id": "workplace-07:transition:a:d-1:s0_s1",
      "caseId": "workplace-07",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "author_identification_question",
      "line": "공식 특정까지 한 건 아닙니다. 다만 익명 글 직후라 누가 이런 흐름을 만들었는지는 따로 봐야 했습니다.",
      "behaviorHint": "자료 순서를 다시 맞추며 표정을 굳힌다."
    },
    {
      "id": "workplace-07:transition:a:d-1:s1_s2",
      "caseId": "workplace-07",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-1_presented",
      "line": "회의 메모까지 나오면 제가 특정 제보자를 암시하는 말을 했다는 점은 피하기 어렵습니다. 그때는 혼선을 막는다고 생각했습니다.",
      "behaviorHint": "메모를 내려다보다가 짧게 한숨을 쉰다."
    },
    {
      "id": "workplace-07:transition:a:d-1:s2_s3",
      "caseId": "workplace-07",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "why_remove_from_review_question",
      "line": "리뷰 제외는 보호적 분리라고 판단했습니다. 그래도 한세린 씨 쪽도 익명 글로 팀을 먼저 흔든 건 사실입니다.",
      "behaviorHint": "손을 맞잡은 채 마지막 문장에서 시선을 올린다."
    },
    {
      "id": "workplace-07:transition:a:d-1:s3_s5",
      "caseId": "workplace-07",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-5_or_responsibility_question",
      "line": "포렌식 전에 한세린 씨를 문제 인원처럼 다루고 평가까지 건드린 건 선을 넘은 겁니다. 그 부분은 제 책임으로 인정합니다.",
      "behaviorHint": "말끝을 낮추고 고개를 숙인다."
    },
    {
      "id": "workplace-07:transition:a:d-4:s0_s1",
      "caseId": "workplace-07",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "past_downgrade_question",
      "line": "당시에는 고객 공포를 막기 위한 문구 조정이라고 봤습니다. 문제를 없던 일로 만들려는 의도라고까지는 생각하지 않았습니다.",
      "behaviorHint": "회의록 표현을 허공에 적듯 손가락을 움직인다."
    },
    {
      "id": "workplace-07:transition:a:d-4:s1_s2",
      "caseId": "workplace-07",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-4_presented",
      "line": "회의록과 메일까지 나오면 제가 등급 표현을 낮추자고 먼저 말한 건 맞습니다. 다만 당시 판단은 외부 파장을 줄이려는 쪽에 가까웠습니다.",
      "behaviorHint": "눈가를 한번 짓누르고 문장을 정리한다."
    },
    {
      "id": "workplace-07:transition:a:d-4:s2_s4",
      "caseId": "workplace-07",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S2",
      "toState": "S4",
      "trigger": "nonjudgmental_question_about_customer_panic",
      "line": "솔직히 말씀드리면 그때는 출하와 고객 반응이 더 무서웠습니다. 그래서 제보를 살리기보다 관리 가능한 표현으로 바꾸려 했습니다.",
      "behaviorHint": "어깨 힘이 빠지며 목소리가 조금 낮아진다."
    },
    {
      "id": "workplace-07:transition:a:d-4:s4_s5",
      "caseId": "workplace-07",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S4",
      "toState": "S5",
      "trigger": "e-5_or_retaliation_question",
      "line": "그 판단이 결국 한세린 씨의 제보를 눌렀고, 이번 평가 개입으로까지 이어졌습니다. 제 잘못입니다.",
      "behaviorHint": "입술을 다문 뒤 짧고 분명하게 마무리한다."
    },
    {
      "id": "workplace-07:transition:a:d-5:s0_s1",
      "caseId": "workplace-07",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "old_case_weaponization_question",
      "line": "저는 현재 판단 기준을 따로 세우려 했을 뿐입니다. 과거 사건을 일부러 꺼내 상대를 깎으려던 건 아니었습니다.",
      "behaviorHint": "의자 등받이에 기대며 선을 긋는 제스처를 쓴다."
    },
    {
      "id": "workplace-07:transition:a:d-5:s1_s2",
      "caseId": "workplace-07",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-4_presented",
      "line": "과거 회의록까지 놓고 보면 제가 '현재 건은 별건'이라는 말을 방패처럼 쓴 건 맞습니다. 그 말이 한세린 씨 신뢰를 깎는 방향으로 작동했습니다.",
      "behaviorHint": "자료를 넘기던 손이 잠깐 멈춘다."
    },
    {
      "id": "workplace-07:transition:a:d-5:s2_s3",
      "caseId": "workplace-07",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "why_call_it_overreaction_question",
      "line": "제가 또 과장한다고 느끼게 만든 건 인정합니다. 하지만 한세린 씨도 과거 일을 현재 허위 캡처와 붙여 사안을 더 키웠습니다.",
      "behaviorHint": "상대 쪽을 본 뒤 곧바로 재판관에게 시선을 돌린다."
    },
    {
      "id": "workplace-07:transition:a:d-5:s3_s5",
      "caseId": "workplace-07",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "shared_responsibility_question",
      "line": "과거 미종결 사건을 제 방어 논리로 쓴 것도 사실입니다. 그 부분은 제가 책임을 피할 수 없습니다.",
      "behaviorHint": "어깨를 낮추고 손을 풀어 놓는다."
    },
    {
      "id": "workplace-07:transition:b:d-2:s0_s1",
      "caseId": "workplace-07",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "anonymous_post_question",
      "line": "제가 올린 글이 완전히 없는 일이라고는 못 하겠어요. 다만 그때는 경고가 먼저였지, 파괴하려는 마음만 있었던 건 아니에요.",
      "behaviorHint": "목이 잠긴 듯 물을 삼키고 시선을 피한다."
    },
    {
      "id": "workplace-07:transition:b:d-2:s1_s2",
      "caseId": "workplace-07",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-2_presented",
      "line": "이 캡처 묶음을 제가 모은 건 맞아요. 그래도 그때는 진실을 보이려면 이렇게라도 해야 한다고 생각했어요.",
      "behaviorHint": "파일을 꼭 쥔 손에 힘이 들어간다."
    },
    {
      "id": "workplace-07:transition:b:d-2:s2_s3",
      "caseId": "workplace-07",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "mentor_and_coworker_share_question",
      "line": "멘토와 동료들에게도 보냈어요. 제가 퍼뜨린 책임은 있지만, 이미 저는 또 눌릴 거라는 공포가 너무 컸어요.",
      "behaviorHint": "한숨을 떨구며 눈시울을 붉힌다."
    },
    {
      "id": "workplace-07:transition:b:d-2:s3_s5",
      "caseId": "workplace-07",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "recipient_scope_question",
      "line": "게시판과 개인 전송까지 제가 확산 범위를 넓힌 건 맞아요. 장태욱 씨를 현재 범죄자처럼 보이게 만든 건 제 책임이에요.",
      "behaviorHint": "고개를 숙인 채 마지막 문장을 분명하게 말한다."
    },
    {
      "id": "workplace-07:transition:b:d-3:s0_s1",
      "caseId": "workplace-07",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "screenshot_authenticity_question",
      "line": "원문 그대로라고만 고집하긴 어려워요. 저는 그 장면이 실제 흐름을 보여 준다고 믿어서 그렇게 냈어요.",
      "behaviorHint": "캡처 파일을 문지르듯 만지다가 말을 잇는다."
    },
    {
      "id": "workplace-07:transition:b:d-3:s1_s2",
      "caseId": "workplace-07",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-3_presented",
      "line": "해시 비교표까지 나오면 현재 헤더와 과거 문장이 섞였다는 점은 인정할 수밖에 없어요. 그때는 그게 맥락 복원이라고 여겼어요.",
      "behaviorHint": "눈을 감았다 뜨며 작게 고개를 끄덕인다."
    },
    {
      "id": "workplace-07:transition:b:d-3:s2_s3",
      "caseId": "workplace-07",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "why_current_header_question",
      "line": "올해 일처럼 보이게 힘을 준 건 맞아요. 다만 저는 장태욱 씨의 과거 방식이 지금도 이어진다고 믿었어요.",
      "behaviorHint": "숨이 가빠졌다가 마지막 문장에서 천천히 말을 고른다."
    },
    {
      "id": "workplace-07:transition:b:d-3:s3_s5",
      "caseId": "workplace-07",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-6_or_responsibility_question",
      "line": "편집 세션 기록까지 나오면 더는 버틸 수 없어요. 그 캡처가 현 시점 원본이 아니었다는 점과, 그렇게 보이게 만든 책임을 인정해요.",
      "behaviorHint": "양손을 모아 쥔 채 시선을 내린다."
    },
    {
      "id": "workplace-07:transition:b:d-5:s0_s1",
      "caseId": "workplace-07",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "why_board_not_hotline_question",
      "line": "핫라인보다 게시판을 먼저 택한 건 맞지만, 그때는 또 묻힐 거라는 생각이 먼저 들었어요. 그래서 공개적으로라도 남겨야 한다고 믿었어요.",
      "behaviorHint": "숨을 고르며 문장 끝마다 떨림이 묻어난다."
    },
    {
      "id": "workplace-07:transition:b:d-5:s1_s2",
      "caseId": "workplace-07",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "small_admission_about_not_being_believed",
      "line": "제가 과거 일을 현재 글에 더 세게 묶은 건 맞아요. 그래도 그 배경 없이 말하면 아무도 안 믿어 줄 거라고 생각했어요.",
      "behaviorHint": "눈을 깜빡이며 손가락을 얽는다."
    },
    {
      "id": "workplace-07:transition:b:d-5:s2_s4",
      "caseId": "workplace-07",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S2",
      "toState": "S4",
      "trigger": "question_about_2024_or_2025_archive_use",
      "line": "2년 전 자료를 다시 끌어온 건 상처가 아직 끝나지 않았기 때문이에요. 그래서 경계선을 넘어 편집까지 하게 된 것도 사실이에요.",
      "behaviorHint": "울음을 참듯 입술을 깨문다."
    },
    {
      "id": "workplace-07:transition:b:d-5:s4_s5",
      "caseId": "workplace-07",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S4",
      "toState": "S5",
      "trigger": "shared_responsibility_question",
      "line": "과거의 실제 문제와 현재의 허위 편집 증거를 제가 한 덩어리로 묶어 버렸어요. 그 때문에 명예전이 커진 책임은 저도 피하지 않겠습니다.",
      "behaviorHint": "고개를 숙였다가 마지막 문장에서만 시선을 든다."
    }
  ]
}

