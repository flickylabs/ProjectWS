export const partnership07V3GameLoopData = {
  "caseId": "partnership-07",
  "dossierCards": [
    {
      "id": "dossier-1",
      "name": "첨부와 낙인의 출발점",
      "description": "외부 첨부 메일과 초기 지목 메시지를 나란히 대조해 첫 책임 분기를 잡는 카드.",
      "evidenceIds": [
        "e-1",
        "e-2"
      ],
      "relatedDisputes": [
        "d-1",
        "d-2",
        "d-4"
      ],
      "subjectParty": "both",
      "challenges": [
        {
          "targetParty": "a",
          "questions": [
            {
              "id": "dossier-1.a.q1",
              "text": "문태경 씨, 행사 전날 밤 운영사 회신에 final_all_v3 전체 덱을 붙여 보낸 사실부터 인정하십니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "partnership-07:a:d-2:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q2",
              "text": "그 첨부 전에 서 대표에게 재확인 절차를 거쳤는지, 예 또는 아니오로 답하십시오.",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "partnership-07:a:d-2:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q3",
              "text": "운영 목적 예외라고 주장하시려면, 왜 기존 비식별·추적 링크 원칙을 스스로 넘을 수 있다고 봤는지 설명해 보십시오.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "partnership-07:a:d-4:unlock:s2:0",
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
              "text": "서유나 씨, 경쟁사가 같은 정보들을 언급한 직후 바이어와 협회에 문 대표 이름을 먼저 올린 사실을 인정합니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "partnership-07:b:d-1:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q2",
              "text": "그때 확인보다 전 직장 인맥 정황을 앞세워 의심 대상을 좁힌 것 아닙니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "partnership-07:b:d-1:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q3",
              "text": "서 대표 본인이 QR 후속자료 폴더의 redacted 링크를 최신 전체 덱 링크로 바꾼 사람 맞습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "partnership-07:b:d-4:unlock:s2:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-2",
      "name": "캡처의 빈칸과 원본 흐름",
      "description": "크롭된 캡처와 원본 단톡·발신 로그를 맞붙여 내부 배신 서사의 허점을 찌르는 카드.",
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
              "text": "문태경 씨, 이 크롭 캡처만으로는 '저쪽'이 누구인지도 확정되지 않는다는 점에 동의하십니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "partnership-07:a:d-3:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q2",
              "text": "원본 단톡에 '프로젝터 테스트용' 문장이 이어지는데도, 왜 그 맥락을 곧바로 풀어 설명하지 않았습니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "partnership-07:a:d-3:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q3",
              "text": "운영사 백업 파일 가능성을 더 세게 말하지 못한 이유가 자신의 첨부 과실 때문이었습니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "partnership-07:a:d-3:unlock:s4:0",
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
              "text": "서유나 씨, 이 캡처가 원본이 아니라 잘린 조각이라는 점을 알고도 결론 문장부터 던진 것 아닙니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "partnership-07:b:d-3:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q2",
              "text": "원본 단톡과 발신 로그가 나온 뒤에도 왜 내부 배신 서사를 먼저 붙들었습니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "partnership-07:b:d-3:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q3",
              "text": "사실 판단보다 '배신당했다'는 감정이 먼저였던 것 아닙니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "partnership-07:b:d-3:unlock:s4:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-3",
      "name": "보안선 붕괴와 오발송의 끝",
      "description": "링크 수정 이력과 운영사 감사로그를 엮어 자기보호·체면 방어가 사실 판단을 어떻게 왜곡했는지 드러내는 카드.",
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
              "text": "문태경 씨, 계속 '의도와 전달은 다르다'고 선을 그은 데에는 기본 통제 실패를 인정하기 싫은 마음도 있었습니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "partnership-07:a:d-2:unlock:s4:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q2",
              "text": "결국 문 대표의 첨부와 서 대표의 링크 교체가 같은 보안선 위반이라는 점, 지금은 인정하십니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "partnership-07:a:d-4:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q3",
              "text": "마감 압박 속에서 '이번 한 번쯤' 예외를 스스로 허용한 것 아닙니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "partnership-07:a:d-4:unlock:s4:0",
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
              "text": "서유나 씨, 운영사 오발송 가능성이 드러난 뒤에도 문 대표 누설자 프레임을 놓지 못한 데에는 체면 문제도 있었습니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "partnership-07:b:d-1:unlock:s4:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q2",
              "text": "태경 첨부만 문제 삼으면서 자신의 QR 링크 교체는 뒤로 미룬 것 아닙니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "partnership-07:b:d-4:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q3",
              "text": "최신 단가 설명 욕심 때문에 보안선보다 영업 속도를 우선한 것 아닙니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "partnership-07:b:d-4:unlock:s4:0",
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
      "d-2": {
        "S2": [
          {
            "id": "partnership-07:a:d-2:unlock:s2:0",
            "factText": "행사 전날 밤 운영사 회신 메일에 final_all_v3 전체 덱이 그대로 첨부 발송됐다.",
            "tags": [
              "evidence",
              "rule"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "time": {
                "exact": "행사 전날 밤",
                "neutral": "그 전날",
                "dateExact": "행사 전날 밤",
                "period": "행사 직전"
              },
              "file": {
                "exact": "final_all_v3",
                "neutral": "그 첨부파일"
              },
              "person": {
                "exact": "박수민 AE",
                "neutral": "운영사 쪽",
                "fullName": "박수민",
                "judgeRef": "운영사 AE"
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
            "id": "partnership-07:a:d-2:unlock:s3:0",
            "factText": "문태경은 그 첨부 전에 서유나에게 재확인을 구하지 않고 단독으로 보냈다.",
            "tags": [
              "responsibility",
              "relationship"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "exact": "서유나",
                "neutral": "그 사람",
                "fullName": "서유나",
                "judgeRef": "서 대표"
              },
              "file": {
                "exact": "전체 도매단가·팝업 일정 덱",
                "neutral": "전체 자료",
                "judgeRef": "전체 덱"
              }
            },
            "stanceHints": [
              "partial",
              "confess"
            ]
          }
        ],
        "S4": [
          {
            "id": "partnership-07:a:d-2:unlock:s4:0",
            "factText": "문태경이 '의도와 전달은 다르다'는 선을 그은 이유에는 기본 통제 실패를 인정하기 싫은 자기보호가 섞여 있었다.",
            "tags": [
              "self_justification",
              "fear"
            ],
            "unlockedAtState": "S4",
            "slots": {},
            "stanceHints": [
              "emotional",
              "partial"
            ]
          }
        ],
        "S5": [
          {
            "id": "partnership-07:a:d-2:unlock:s5:0",
            "factText": "문태경은 비식별 처리 없는 전체 덱 외부 첨부가 명백한 보안 위반이었다고 받아들인다.",
            "tags": [
              "admission",
              "rule"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "file": {
                "exact": "전체 도매단가·팝업 일정 덱",
                "neutral": "전체 자료",
                "judgeRef": "전체 덱"
              },
              "person": {
                "exact": "박수민 AE",
                "neutral": "운영사 쪽",
                "fullName": "박수민",
                "judgeRef": "운영사 AE"
              }
            },
            "stanceHints": [
              "confess",
              "apology"
            ]
          }
        ]
      },
      "d-3": {
        "S2": [
          {
            "id": "partnership-07:a:d-3:unlock:s2:0",
            "factText": "크롭 캡처에는 바로 아래 이어진 '프로젝터 테스트용' 맥락이 잘려 있어 직접 판매 정황처럼 오해되기 쉬웠다.",
            "tags": [
              "evidence",
              "context"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "evidence": {
                "exact": "크롭된 메신저 캡처",
                "neutral": "그 캡처"
              },
              "file": {
                "exact": "원본 단톡",
                "neutral": "원본 대화"
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
            "id": "partnership-07:a:d-3:unlock:s3:0",
            "factText": "서유나도 같은 단톡 흐름을 읽고 있었지만, 두 사람 모두 배신 서사에 먼저 갇혀 실제 경로 확인이 늦어졌다.",
            "tags": [
              "relationship",
              "harm"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "exact": "서유나",
                "neutral": "그 사람",
                "fullName": "서유나",
                "judgeRef": "서 대표"
              },
              "evidence": {
                "exact": "원본 단톡",
                "neutral": "원본 대화"
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
            "id": "partnership-07:a:d-3:unlock:s4:0",
            "factText": "문태경은 운영사 백업 파일과 후속메일 경로를 의심했지만 자신의 첨부 과실 때문에 그 가능성을 강하게 밀지 못했다.",
            "tags": [
              "fear",
              "context"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "file": {
                "exact": "스피커용 백업 폴더",
                "neutral": "백업 파일"
              },
              "event": {
                "exact": "참석자 follow-up 메일",
                "neutral": "후속메일"
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
            "id": "partnership-07:a:d-3:unlock:s5:0",
            "factText": "실제 경쟁사 유입 경로는 동업자 고의 유출이 아니라 운영사 AE의 후속메일 오발송이었다.",
            "tags": [
              "admission",
              "evidence"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "exact": "박수민 AE",
                "neutral": "운영사 쪽",
                "fullName": "박수민",
                "judgeRef": "운영사 AE"
              },
              "event": {
                "exact": "참석자 follow-up 메일",
                "neutral": "후속메일"
              }
            },
            "stanceHints": [
              "confess",
              "clarify"
            ]
          }
        ]
      },
      "d-4": {
        "S2": [
          {
            "id": "partnership-07:a:d-4:unlock:s2:0",
            "factText": "문태경의 전체 덱 첨부와 서유나의 QR 폴더 교체는 모두 '비식별 축약본과 추적 링크' 원칙 밖이었다.",
            "tags": [
              "admission",
              "rule"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "rule": {
                "exact": "비식별 축약본과 추적 링크만 사용",
                "neutral": "기존 보안 원칙"
              },
              "person": {
                "exact": "서유나",
                "neutral": "그 사람",
                "fullName": "서유나",
                "judgeRef": "서 대표"
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
            "id": "partnership-07:a:d-4:unlock:s3:0",
            "factText": "문태경은 운영 목적 예외라고 스스로 규정하며 승인 절차 없는 첨부를 정당화했다.",
            "tags": [
              "responsibility",
              "self_justification"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "exact": "박수민 AE",
                "neutral": "운영사 쪽",
                "fullName": "박수민",
                "judgeRef": "운영사 AE"
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
            "id": "partnership-07:a:d-4:unlock:s4:0",
            "factText": "마감 압박 속에서 '이번 한 번쯤'이라는 합리화가 문태경의 보안선 이탈을 밀어줬다.",
            "tags": [
              "motive",
              "shame"
            ],
            "unlockedAtState": "S4",
            "slots": {},
            "stanceHints": [
              "emotional",
              "partial"
            ]
          }
        ],
        "S5": [
          {
            "id": "partnership-07:a:d-4:unlock:s5:0",
            "factText": "행사 자료 통제 원칙 위반은 쌍방이었지만, 문태경은 자신의 몫부터 책임져야 한다고 인정한다.",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "rule": {
                "exact": "비식별 축약본과 추적 링크만 사용",
                "neutral": "기존 보안 원칙"
              }
            },
            "stanceHints": [
              "confess",
              "apology"
            ]
          }
        ]
      }
    },
    "b": {
      "d-1": {
        "S2": [
          {
            "id": "partnership-07:b:d-1:unlock:s2:0",
            "factText": "서유나는 경쟁사가 같은 정보를 언급한 뒤 2시간 이내 바이어와 협회 쪽에 문태경 이름을 올렸다.",
            "tags": [
              "timeline",
              "harm"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "time": {
                "exact": "경쟁사가 같은 정보들을 언급한 뒤 2시간 이내",
                "neutral": "그 직후",
                "period": "행사 직후"
              },
              "person": {
                "exact": "문태경",
                "neutral": "그 사람",
                "fullName": "문태경",
                "judgeRef": "문 대표"
              },
              "institution": {
                "exact": "커피산업협회 사무국",
                "neutral": "협회 쪽"
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
            "id": "partnership-07:b:d-1:unlock:s3:0",
            "factText": "서유나는 확인 전부터 태경의 전 직장 인맥을 근거로 누설 의심을 한쪽으로 좁혔다.",
            "tags": [
              "relationship",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "network": {
                "exact": "전 직장 인맥",
                "neutral": "예전 인맥"
              },
              "person": {
                "exact": "문태경",
                "neutral": "그 사람",
                "fullName": "문태경",
                "judgeRef": "문 대표"
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
            "id": "partnership-07:b:d-1:unlock:s4:0",
            "factText": "서유나가 태경을 누설자로 몰아간 데에는 거래처 앞 체면이 무너질까 두려운 감정이 크게 작동했다.",
            "tags": [
              "fear",
              "motive"
            ],
            "unlockedAtState": "S4",
            "slots": {},
            "stanceHints": [
              "emotional",
              "partial"
            ]
          }
        ],
        "S5": [
          {
            "id": "partnership-07:b:d-1:unlock:s5:0",
            "factText": "서유나는 업계에 퍼뜨린 누설자 프레임을 직접 정정하고 사과해야 한다는 사실을 받아들인다.",
            "tags": [
              "admission",
              "harm"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "exact": "문태경",
                "neutral": "그 사람",
                "fullName": "문태경",
                "judgeRef": "문 대표"
              },
              "reputation": {
                "exact": "업계 내 누설자 이미지",
                "neutral": "그 낙인"
              }
            },
            "stanceHints": [
              "confess",
              "apology"
            ]
          }
        ]
      },
      "d-3": {
        "S2": [
          {
            "id": "partnership-07:b:d-3:unlock:s2:0",
            "factText": "서유나는 수신자와 앞뒤 맥락이 잘린 크롭 캡처를 전체 배신 서사의 핵심 증거처럼 키워 해석했다.",
            "tags": [
              "evidence",
              "self_justification"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "evidence": {
                "exact": "크롭된 메신저 캡처",
                "neutral": "그 캡처"
              }
            },
            "stanceHints": [
              "partial",
              "blame"
            ]
          }
        ],
        "S3": [
          {
            "id": "partnership-07:b:d-3:unlock:s3:0",
            "factText": "운영사 메일 흐름을 충분히 보기 전인데도, 서유나는 내부 배신 서사를 먼저 확정해 움직였다.",
            "tags": [
              "responsibility",
              "context"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "event": {
                "exact": "참석자 follow-up 메일",
                "neutral": "후속메일"
              },
              "person": {
                "exact": "박수민 AE",
                "neutral": "운영사 쪽",
                "fullName": "박수민",
                "judgeRef": "운영사 AE"
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
            "id": "partnership-07:b:d-3:unlock:s4:0",
            "factText": "서유나는 '배신당했다'는 감정이 너무 커서 운영사 백업 파일 가능성을 스스로 밀어냈다.",
            "tags": [
              "emotion",
              "fear"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "file": {
                "exact": "스피커용 백업 폴더",
                "neutral": "백업 파일"
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
            "id": "partnership-07:b:d-3:unlock:s5:0",
            "factText": "동업자 중 누군가 고의로 경쟁사에 흘렸다는 믿음은 거짓이었고, 실제 경로는 운영사 오발송이었다.",
            "tags": [
              "admission",
              "evidence"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "exact": "박수민 AE",
                "neutral": "운영사 쪽",
                "fullName": "박수민",
                "judgeRef": "운영사 AE"
              },
              "event": {
                "exact": "참석자 follow-up 메일",
                "neutral": "후속메일"
              }
            },
            "stanceHints": [
              "confess",
              "apology"
            ]
          }
        ]
      },
      "d-4": {
        "S2": [
          {
            "id": "partnership-07:b:d-4:unlock:s2:0",
            "factText": "행사 당일 아침 서유나는 redacted 링크를 끄고 QR 후속자료 폴더를 최신 전체 덱 링크로 교체했다.",
            "tags": [
              "evidence",
              "rule"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "time": {
                "exact": "행사 당일 아침",
                "neutral": "그 아침",
                "dateExact": "행사 당일 아침",
                "period": "행사 준비 시간"
              },
              "folder": {
                "exact": "QR 후속자료 폴더",
                "neutral": "QR 폴더"
              },
              "file": {
                "exact": "전체 도매단가·팝업 일정 덱",
                "neutral": "전체 자료",
                "judgeRef": "전체 덱"
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
            "id": "partnership-07:b:d-4:unlock:s3:0",
            "factText": "서유나는 문태경 첨부만 문제 삼으면서도, 자신의 QR 링크 교체가 같은 종류의 위반이라는 점을 뒤로 미뤘다.",
            "tags": [
              "responsibility",
              "counter"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "exact": "문태경",
                "neutral": "그 사람",
                "fullName": "문태경",
                "judgeRef": "문 대표"
              },
              "folder": {
                "exact": "QR 후속자료 폴더",
                "neutral": "QR 폴더"
              }
            },
            "stanceHints": [
              "partial",
              "confess"
            ]
          }
        ],
        "S4": [
          {
            "id": "partnership-07:b:d-4:unlock:s4:0",
            "factText": "서유나가 최신 전체 덱을 넣은 데에는 영업총괄로 뒤처져 보이고 싶지 않다는 조급함이 있었다.",
            "tags": [
              "motive",
              "fear"
            ],
            "unlockedAtState": "S4",
            "slots": {},
            "stanceHints": [
              "emotional",
              "partial"
            ]
          }
        ],
        "S5": [
          {
            "id": "partnership-07:b:d-4:unlock:s5:0",
            "factText": "보안 원칙 위반은 쌍방이었고, 서유나 역시 자신의 링크 변경 책임을 분명히 져야 한다.",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "rule": {
                "exact": "비식별 축약본과 추적 링크만 사용",
                "neutral": "기존 보안 원칙"
              },
              "folder": {
                "exact": "QR 후속자료 폴더",
                "neutral": "QR 폴더"
              }
            },
            "stanceHints": [
              "confess",
              "apology"
            ]
          }
        ]
      }
    }
  },
  "events": {
    "contradictions": [
      {
        "id": "partnership-07:contradiction:0",
        "targetParty": "a",
        "trigger": "문태경이 '외부 유출이 아니라 운영 절차였다'며 전체 덱 첨부 자체를 축소하려 할 때",
        "text": "운영 절차였다면서 왜 비식별 축약본이 아니라 final_all_v3 전체 덱이 첨부됐는지 설명이 비어 있습니다.",
        "relatedDisputes": [
          "d-2",
          "d-4"
        ],
        "evidenceIds": [
          "e-1"
        ]
      },
      {
        "id": "partnership-07:contradiction:1",
        "targetParty": "b",
        "trigger": "서유나가 자신은 단정하지 않았고 단지 의심만 공유했다고 말할 때",
        "text": "바이어 메시지와 협회 메모의 어조는 단순 경계가 아니라 문태경을 사실상 누설자로 특정한 흐름에 가깝습니다.",
        "relatedDisputes": [
          "d-1",
          "d-3"
        ],
        "evidenceIds": [
          "e-2"
        ]
      },
      {
        "id": "partnership-07:contradiction:2",
        "targetParty": "b",
        "trigger": "서유나가 크롭 캡처를 결정적 증거처럼 다시 밀어붙일 때",
        "text": "크롭본만으로는 경쟁사 전달인지 운영사 테스트인지 구분되지 않고, 원본 단톡은 오히려 그 결론을 약화합니다.",
        "relatedDisputes": [
          "d-2",
          "d-3"
        ],
        "evidenceIds": [
          "e-3",
          "e-4"
        ]
      },
      {
        "id": "partnership-07:contradiction:3",
        "targetParty": "a",
        "trigger": "문태경이 서유나의 위반을 강조하며 자신의 예외 처리를 흐릴 때",
        "text": "QR 링크 교체가 있었다 해도, 최초 외부 첨부와 재확인 생략이 사라지지는 않습니다.",
        "relatedDisputes": [
          "d-2",
          "d-4"
        ],
        "evidenceIds": [
          "e-1",
          "e-5"
        ]
      }
    ],
    "interjections": [
      {
        "id": "partnership-07:interjection:0",
        "speaker": "b",
        "trigger": "문태경이 메일 제목·발신 시각만 길게 나열하며 의도 질문을 미룰 때",
        "text": "결국 누가 보냈는지만 말하면 되잖아. 왜 계속 파일명부터 세는데?",
        "relatedDisputes": [
          "d-2",
          "d-3"
        ]
      },
      {
        "id": "partnership-07:interjection:1",
        "speaker": "a",
        "trigger": "서유나가 캡처 한 장으로 다시 결론을 확정하려 들 때",
        "text": "그 조각 하나로 다 끝난 얘기처럼 말하지 마세요. 원본 흐름이 있습니다.",
        "relatedDisputes": [
          "d-1",
          "d-3"
        ]
      },
      {
        "id": "partnership-07:interjection:2",
        "speaker": "judge",
        "trigger": "양측이 배신 여부만 두고 말싸움을 반복하고 실제 경로 검토가 밀릴 때",
        "text": "의도 단정은 잠시 멈추십시오. 지금 재판관이 보는 건 첨부 경로와 확인 절차입니다.",
        "relatedDisputes": [
          "d-2",
          "d-3",
          "d-5"
        ]
      }
    ],
    "emotionalOutbursts": [
      {
        "id": "partnership-07:outburst:a:0",
        "party": "a",
        "trigger": "전 직장 인맥과 누설자 낙인이 한 문장으로 엮여 반복 언급될 때",
        "text": "그 인맥 얘기만 나오면 제가 이미 팔아넘긴 사람처럼 굳어집니다. 그건 진짜 아닙니다.",
        "relatedDisputes": [
          "d-1",
          "d-3"
        ]
      },
      {
        "id": "partnership-07:outburst:a:1",
        "party": "a",
        "trigger": "문태경의 외부 첨부가 곧 고의 판매였다는 식으로 몰아갈 때",
        "text": "제가 절차를 망친 건 맞아도, 그걸 배신으로 묶는 순간 말이 달라집니다.",
        "relatedDisputes": [
          "d-2",
          "d-4"
        ]
      },
      {
        "id": "partnership-07:outburst:b:0",
        "party": "b",
        "trigger": "거래처 앞 체면 손상과 누설자 프레임 정정을 동시에 요구받을 때",
        "text": "그날 저는 진짜 다 무너지는 줄 알았어요. 그래서 범인부터 붙잡고 싶었던 거예요.",
        "relatedDisputes": [
          "d-1",
          "d-3"
        ]
      },
      {
        "id": "partnership-07:outburst:b:1",
        "party": "b",
        "trigger": "서유나 자신의 QR 링크 교체 책임이 태경의 첨부와 같은 선상에 놓일 때",
        "text": "네, 저도 선 넘었어요. 그런데 그때는 최신본 안 주면 더 큰일 난다고 느꼈다고요.",
        "relatedDisputes": [
          "d-4"
        ]
      }
    ]
  },
  "transitionBeats": [
    {
      "id": "partnership-07:transition:a:d-2:s0_s1",
      "caseId": "partnership-07",
      "party": "a",
      "disputeId": "d-2",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "재판관이 전체 덱 첨부 여부를 직접 추궁할 때",
      "line": "그 표현은 정확히 해야 합니다. 외부 배포가 아니라 운영사 테스트 회신이었으니까요.",
      "behaviorHint": "처음보다 빠르게 말하지만 끝에서 미세하게 입술이 굳는다."
    },
    {
      "id": "partnership-07:transition:a:d-2:s1_s2",
      "caseId": "partnership-07",
      "party": "a",
      "disputeId": "d-2",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-1 메일 원본이 제시될 때",
      "line": "메일 원본이 나오면 부정하긴 어렵죠. 네, 전체 덱이 첨부로 갔습니다.",
      "behaviorHint": "종이를 오래 바라보다가 짧게 인정한다."
    },
    {
      "id": "partnership-07:transition:a:d-2:s2_s3",
      "caseId": "partnership-07",
      "party": "a",
      "disputeId": "d-2",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "유나 재확인 여부를 후속 질문받을 때",
      "line": "그 부분은 제가 건너뛴 겁니다. 다시 묻지 않았어요.",
      "behaviorHint": "건조한 톤이 잠깐 끊기고 손끝이 테이블을 스친다."
    },
    {
      "id": "partnership-07:transition:a:d-2:s3_s5",
      "caseId": "partnership-07",
      "party": "a",
      "disputeId": "d-2",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-4 원본 흐름이나 책임 질문이 겹칠 때",
      "line": "이제는 분리해서 말할 수 없겠습니다. 절차 위반 책임은 제 쪽이 맞습니다.",
      "behaviorHint": "시선을 피하지 않고 짧게 고개를 숙인다."
    },
    {
      "id": "partnership-07:transition:a:d-3:s0_s1",
      "caseId": "partnership-07",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "재판관이 고의 유출 여부를 직접 묻는 순간",
      "line": "지금 단계에서 고의라고까지는 못 박지 않겠습니다. 문맥이 더 필요합니다.",
      "behaviorHint": "손을 모으고 문장을 최대한 짧게 자른다."
    },
    {
      "id": "partnership-07:transition:a:d-3:s1_s2",
      "caseId": "partnership-07",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-3 크롭 캡처가 제시될 때",
      "line": "이 조각만 보면 저도 오해가 왜 생겼는지는 압니다. 그래도 이걸로 공모를 말하긴 어렵습니다.",
      "behaviorHint": "캡처의 잘린 부분을 시선으로 따라가듯 본다."
    },
    {
      "id": "partnership-07:transition:a:d-3:s2_s4",
      "caseId": "partnership-07",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S2",
      "toState": "S4",
      "trigger": "백업 파일 가능성을 비판 없이 묻는 질문이 들어올 때",
      "line": "네, 그쪽 가능성을 저도 버리진 않았습니다. 다만 제 입으로 먼저 꺼내면 변명처럼 들릴까 봤습니다.",
      "behaviorHint": "숨을 길게 내쉬고 처음으로 감정이 섞인 어조를 보인다."
    },
    {
      "id": "partnership-07:transition:a:d-3:s4_s5",
      "caseId": "partnership-07",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S4",
      "toState": "S5",
      "trigger": "e-4 또는 e-6로 실제 경로가 확인될 때",
      "line": "이제는 분명하네요. 내부 배신이 아니라 운영사 후속메일 오발송입니다.",
      "behaviorHint": "어깨가 내려가며 마지막 문장을 단정적으로 마무리한다."
    },
    {
      "id": "partnership-07:transition:a:d-4:s0_s1",
      "caseId": "partnership-07",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "재판관이 행사 보안 원칙 자체를 상기시키며 묻는 때",
      "line": "예외라고 판단한 건 맞습니다. 당시엔 운영 목적이라고 선을 그었습니다.",
      "behaviorHint": "말을 고르느라 잠깐 멈춘 뒤 '예외'를 낮게 반복한다."
    },
    {
      "id": "partnership-07:transition:a:d-4:s1_s2",
      "caseId": "partnership-07",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-5와 함께 쌍방 위반 가능성이 드러날 때",
      "line": "제 첨부도, 유나의 링크 교체도 원칙 밖이었군요. 그건 인정하겠습니다.",
      "behaviorHint": "손가락으로 양쪽을 번갈아 가리키며 인정한다."
    },
    {
      "id": "partnership-07:transition:a:d-4:s2_s3",
      "caseId": "partnership-07",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "공유된 보안선 붕괴를 후속 질문받을 때",
      "line": "결국 둘 다 같은 선을 넘은 겁니다. 방식만 달랐을 뿐이죠.",
      "behaviorHint": "건조한 비아냥이 잠깐 배어나온다."
    },
    {
      "id": "partnership-07:transition:a:d-4:s3_s5",
      "caseId": "partnership-07",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "최종 책임 비율을 직접 묻는 순간",
      "line": "제 예외 처리부터 책임지겠습니다. 변명할 단계는 지났습니다.",
      "behaviorHint": "자세를 바로 세우고 담담하게 인정한다."
    },
    {
      "id": "partnership-07:transition:b:d-1:s0_s1",
      "caseId": "partnership-07",
      "party": "b",
      "disputeId": "d-1",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "재판관이 누구를 지목했는지 구체적으로 묻는 순간",
      "line": "의심을 말한 건 맞아요. 그때는 그렇게 볼 수밖에 없는 정황이었어요.",
      "behaviorHint": "말이 빨라지고 결론 문장을 먼저 던진다."
    },
    {
      "id": "partnership-07:transition:b:d-1:s1_s2",
      "caseId": "partnership-07",
      "party": "b",
      "disputeId": "d-1",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-2 원본 메시지와 협회 메모가 제시될 때",
      "line": "네, 제가 태경 쪽이라고 말했네요. 생각보다 더 직접적이었네요.",
      "behaviorHint": "휴대폰 화면을 한 번 보고 바로 시선을 돌린다."
    },
    {
      "id": "partnership-07:transition:b:d-1:s2_s3",
      "caseId": "partnership-07",
      "party": "b",
      "disputeId": "d-1",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "확인 절차를 밟았는지 재차 추궁받을 때",
      "line": "확인 전에 이름을 올린 건 성급했어요. 그건 부정 못 해요.",
      "behaviorHint": "짧게 같은 문장을 되풀이하다가 결국 수긍한다."
    },
    {
      "id": "partnership-07:transition:b:d-1:s3_s5",
      "caseId": "partnership-07",
      "party": "b",
      "disputeId": "d-1",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-6이나 사과 요구가 겹칠 때",
      "line": "이건 제가 정정해야 합니다. 태경을 누설자처럼 말한 건 제 잘못이었어요.",
      "behaviorHint": "자존심을 삼키듯 숨을 삼킨 뒤 고개를 끄덕인다."
    },
    {
      "id": "partnership-07:transition:b:d-3:s0_s1",
      "caseId": "partnership-07",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "재판관이 sabotage 판단 근거를 캐묻는 때",
      "line": "캡처와 인맥이 한 방향을 가리켰어요. 그래서 내부라고 본 거예요.",
      "behaviorHint": "손가락으로 두 근거를 세듯 말한다."
    },
    {
      "id": "partnership-07:transition:b:d-3:s1_s2",
      "caseId": "partnership-07",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-3 크롭 캡처가 문제 증거로 오를 때",
      "line": "맞아요, 저는 그 캡처를 크게 봤어요. 지금도 왜 흔들렸는지는 설명할 수 있어요.",
      "behaviorHint": "캡처를 집어 들 듯 허공을 움켜쥔다."
    },
    {
      "id": "partnership-07:transition:b:d-3:s2_s4",
      "caseId": "partnership-07",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S2",
      "toState": "S4",
      "trigger": "공동 혼란 가능성을 비판 없이 묻는 질문이 들어올 때",
      "line": "솔직히 배신당한 기분이 먼저였어요. 그래서 다른 경로를 밀어냈어요.",
      "behaviorHint": "목소리가 낮아지고 말끝이 길어진다."
    },
    {
      "id": "partnership-07:transition:b:d-3:s4_s5",
      "caseId": "partnership-07",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S4",
      "toState": "S5",
      "trigger": "e-4 또는 e-6으로 실제 경로가 확인될 때",
      "line": "이제는 인정할게요. 우리 중 누가 판 게 아니라 운영사 오발송이었어요.",
      "behaviorHint": "표정이 굳은 채 마지막 문장을 천천히 끊어 말한다."
    },
    {
      "id": "partnership-07:transition:b:d-4:s0_s1",
      "caseId": "partnership-07",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "재판관이 redacted 링크 원칙을 정확히 짚을 때",
      "line": "최신 설명이 더 중요하다고 봤어요. 그래서 링크를 바꿨죠.",
      "behaviorHint": "한쪽 어깨를 올리며 방어적으로 답한다."
    },
    {
      "id": "partnership-07:transition:b:d-4:s1_s2",
      "caseId": "partnership-07",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-5 수정 이력이 제시될 때",
      "line": "네, 제가 바꿨어요. redacted 링크를 끄고 최신본을 걸었습니다.",
      "behaviorHint": "빠르게 인정한 뒤 입술을 굳게 다문다."
    },
    {
      "id": "partnership-07:transition:b:d-4:s2_s3",
      "caseId": "partnership-07",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "왜 QR 링크를 교체했는지 후속 질문이 들어올 때",
      "line": "태경만 문제 삼았지만, 제 판단도 같은 선을 넘은 거였어요.",
      "behaviorHint": "스스로를 탓하듯 웃음 없는 숨을 내쉰다."
    },
    {
      "id": "partnership-07:transition:b:d-4:s3_s5",
      "caseId": "partnership-07",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "공유 책임을 직접 묻는 질문이 들어올 때",
      "line": "보안 원칙 위반은 쌍방이었어요. 제 변경도 책임으로 적어 주세요.",
      "behaviorHint": "턱을 내리고 단어마다 또박또박 힘을 준다."
    }
  ]
} as const;

