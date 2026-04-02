export const partnership02V3GameLoopData = {
  "caseId": "partnership02",
  "dossierCards": [
    {
      "id": "dossier-1",
      "name": "리드 기여와 최종 보상안",
      "description": "초기 영업 공로와 최종 보상 문서 사이의 간극을 확인하는 카드",
      "evidenceIds": [
        "e-1",
        "e-2"
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
              "id": "dossier-1.a.q1",
              "text": "박준오, CRM 로그상 최초 리드와 초안은 당신이 맞습니다. 그런데 그 사실만으로 지금도 스스로를 '순수한 피해자'라고 단정하십니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "partnership02:a:d-3:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q2",
              "text": "성과급 승인안에서 이름이 빠진 건 보입니다. 그렇다면 당신은 왜 자신의 다른 행동은 계속 뒤로 미뤘습니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "partnership02:a:d-3:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q3",
              "text": "원천 공로가 인정된다고 해서 이후 판단까지 면책되는 건 아닙니다. 그 점을 지금도 피하고 계신 것 아닙니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "partnership02:a:d-3:unlock:s4:0",
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
              "text": "서민경, 최종 부속문서와 승인안에 당신만 주공로자로 남은 건 사실입니다. 이걸 아직도 단순 제출 책임 정리라고 보십니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "partnership02:b:d-2:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q2",
              "text": "고객사 단일 창구 요청 직후 편집이 바뀌었습니다. 그 시점의 삭제가 우연이라고 설명하시겠습니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "partnership02:b:d-2:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q3",
              "text": "실무 정리라는 표현으로 보상 배분까지 바꿨다면 그건 규칙 정리가 아니라 자기 이익 아닙니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "partnership02:b:d-2:unlock:s4:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-2",
      "name": "크롭 음성메모와 원본 이메일",
      "description": "우회 제안의 진짜 강도와 단일 창구 요청의 배경을 가르는 카드",
      "evidenceIds": [
        "e-3",
        "e-4"
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
              "id": "dossier-2.a.q1",
              "text": "박준오, 캡처본이 아니라 원본 메일과 첨부까지 나왔습니다. 시훈데이터랩 명의 파일럿 가능성을 실제로 물으신 거죠?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "partnership02:a:d-1:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q2",
              "text": "세 달 전 내부에서 유지보수 분리 이야기를 꺼내고도, 왜 공동대표를 참조선에서 뺐습니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "partnership02:a:d-1:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q3",
              "text": "본계약 서명 직전에 사촌 회사 등록증까지 첨부한 행동을, 지금도 '가벼운 탐색'이라고 부르실 겁니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "partnership02:a:d-1:unlock:s5:0",
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
              "text": "서민경, 단일 창구 요청은 고객사 선요청이었습니까, 아니면 당신의 내부 정리 이후였습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "partnership02:b:d-5:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q2",
              "text": "그 요청 배경에 컴플라이언스 우려가 있었다면 왜 내부에는 그 핵심을 빼고 설명했습니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "partnership02:b:d-5:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q3",
              "text": "계약이 흔들릴까 두려웠다는 이유가 있더라도, 그 공백이 결국 당신의 단독 통제에 유리하게 작동한 건 사실 아닙니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "partnership02:b:d-5:unlock:s4:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-3",
      "name": "컴플라이언스 메모와 RACI 편집 로그",
      "description": "공식 규칙 위반과 단일 창구 사유를 최종적으로 봉합하는 카드",
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
              "text": "박준오, 서명된 RACI 6대4 구조를 알고 있었으면서도 외부 라인을 우회한 점은 인정하십니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "partnership02:a:d-4:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q2",
              "text": "당신은 RACI를 공로 문제에서는 방패처럼 들었지만, 자기 우회 행동에는 같은 기준을 늦게 적용한 것 아닙니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "partnership02:a:d-4:unlock:s4:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q3",
              "text": "결국 당신의 우회와 상대의 단독 구조 만들기가 같은 합의를 무너뜨렸다는 점까지 인정하십니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "partnership02:a:d-4:unlock:s5:0",
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
              "text": "서민경, 고객사 검토 메모상 단일 창구의 직접 계기는 준오의 별도 제안과 첨부였습니다. 그 사실을 이제는 분명히 말씀하시겠습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "partnership02:b:d-5:unlock:s5:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q2",
              "text": "RACI와 공동 발표 원칙을 아셨다면, 최종 보고서에서 단독 구조를 만든 건 규정 위반 아닌가요?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "partnership02:b:d-4:unlock:s5:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q3",
              "text": "컴플라이언스 리스크를 핑계 삼아 보상 구조까지 자기 쪽으로 기울인 부분도 인정하십니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "partnership02:b:d-2:unlock:s5:0",
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
            "id": "partnership02:a:d-1:unlock:s2:0",
            "factText": "준오는 시훈데이터랩 명의의 별도 유지보수 파일럿 가능성을 실제 고객사에 문의했다.",
            "tags": [
              "act",
              "relationship"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "company": {
                "exact": "시훈데이터랩",
                "neutral": "제3자 회사",
                "fullName": "시훈데이터랩",
                "judgeRef": "사촌 회사"
              },
              "proposal": {
                "exact": "별도 유지보수 파일럿",
                "neutral": "별도 파일럿"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "partnership02:a:d-1:unlock:s3:0",
            "factText": "세 달 전 내부에서 유지보수 분리 아이디어가 오갔지만, 민경은 위험하다고만 말하고 결론을 미뤘다.",
            "tags": [
              "context",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "time": {
                "exact": "세 달 전",
                "neutral": "이전 시점",
                "dateExact": "세 달 전",
                "period": "수주 전 논의 시기"
              },
              "response": {
                "exact": "위험하다고만 말하고 결론 미룸",
                "neutral": "경고 후 미룸"
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
            "id": "partnership02:a:d-1:unlock:s4:0",
            "factText": "준오는 계약 표지에서 자신의 이름이 사라질까 두려워 우회 제안을 정당화했다.",
            "tags": [
              "fear",
              "motive"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "fear": {
                "exact": "이름 삭제 불안",
                "neutral": "그 불안"
              },
              "action": {
                "exact": "우회 제안 정당화",
                "neutral": "그 선택"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "partnership02:a:d-1:unlock:s5:0",
            "factText": "원본 메일에는 내부 참조자 없이 시훈데이터랩 사업자등록증이 첨부돼 있었다.",
            "tags": [
              "evidence",
              "admission"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "attachment": {
                "exact": "시훈데이터랩 사업자등록증",
                "neutral": "등록증 첨부"
              },
              "channel": {
                "exact": "내부 참조자 공란",
                "neutral": "참조자 없음"
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
            "id": "partnership02:a:d-3:unlock:s2:0",
            "factText": "CRM 기록과 초기 제안서 로그는 준오가 리드를 처음 등록하고 첫 제안 구조를 잡았음을 보여 준다.",
            "tags": [
              "evidence",
              "timeline"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "lead": {
                "exact": "리드 최초 등록",
                "neutral": "초기 등록"
              },
              "draft": {
                "exact": "첫 제안 구조 작성",
                "neutral": "첫 구조 작성"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "partnership02:a:d-3:unlock:s3:0",
            "factText": "준오는 자신의 피해를 앞세워 별도 유지보수 질문을 계속 뒤로 밀어냈다.",
            "tags": [
              "self_justification",
              "counter"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "frame": {
                "exact": "피해자 프레임",
                "neutral": "피해 프레임"
              },
              "topic": {
                "exact": "별도 유지보수 질문",
                "neutral": "그 질문"
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
            "id": "partnership02:a:d-3:unlock:s4:0",
            "factText": "비난 없는 질문이 이어지자 준오는 순수 피해자 서사를 지키려 했던 마음을 털어놓기 시작한다.",
            "tags": [
              "emotion",
              "shame"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "approach": {
                "exact": "비난 없는 질문",
                "neutral": "비판 없는 접근"
              },
              "story": {
                "exact": "순수 피해자 서사",
                "neutral": "피해자 서사"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "partnership02:a:d-3:unlock:s5:0",
            "factText": "준오는 실제 기여자이지만 동시에 별도 유지보수 거래를 시도한 당사자이기도 하다.",
            "tags": [
              "threshold",
              "admission"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "credit": {
                "exact": "실제 기여자",
                "neutral": "실제 기여"
              },
              "proposal": {
                "exact": "별도 유지보수 거래 시도",
                "neutral": "숨긴 거래"
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
            "id": "partnership02:a:d-4:unlock:s2:0",
            "factText": "서명된 RACI 시트 원안에는 원천 영업 6, 최종 협상 4와 공동 외부 발표 원칙이 적혀 있다.",
            "tags": [
              "rule",
              "evidence"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "ratio": {
                "exact": "원천 영업 6 / 최종 협상 4",
                "neutral": "6대4 구조"
              },
              "principle": {
                "exact": "공동 외부 발표 원칙",
                "neutral": "공동 발표 원칙"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "partnership02:a:d-4:unlock:s3:0",
            "factText": "준오의 별도 메일은 공로규칙 문제와 별개로 외부 커뮤니케이션 원칙 자체를 흔들었다.",
            "tags": [
              "act",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "mail": {
                "exact": "별도 유지보수 메일",
                "neutral": "그 메일"
              },
              "rule": {
                "exact": "외부 커뮤니케이션 원칙",
                "neutral": "외부 라인 원칙"
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
            "id": "partnership02:a:d-4:unlock:s4:0",
            "factText": "준오는 RACI를 공로 보호막으로만 쓰고 자신의 우회 행동에는 같은 기준을 늦게 적용했다.",
            "tags": [
              "legacy_sentence",
              "shame"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "rule": {
                "exact": "RACI 보호막",
                "neutral": "규칙 보호막"
              },
              "delay": {
                "exact": "같은 기준의 지연 적용",
                "neutral": "늦은 적용"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "partnership02:a:d-4:unlock:s5:0",
            "factText": "준오는 외부 라인을 우회했고 민경은 단독 공로 구조를 만들었으므로 둘 다 서명한 규칙을 어겼다.",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "aAction": {
                "exact": "외부 라인 우회",
                "neutral": "준오의 우회"
              },
              "bAction": {
                "exact": "단독 공로 구조",
                "neutral": "민경의 단독 구조"
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
            "id": "partnership02:b:d-2:unlock:s2:0",
            "factText": "최종 부속문서와 성과급 승인안에는 민경이 단독 주공로자처럼 배치돼 있다.",
            "tags": [
              "beneficiary",
              "evidence"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "document": {
                "exact": "최종 부속문서와 성과급 승인안",
                "neutral": "문서 묶음"
              },
              "status": {
                "exact": "단독 주공로자 배치",
                "neutral": "단독 배치"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "partnership02:b:d-2:unlock:s3:0",
            "factText": "편집 이력상 고객사 단일 창구 요청 직후 준오 이름과 공동 발표 문구가 빠졌다.",
            "tags": [
              "timeline",
              "evidence"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "time": {
                "exact": "단일 창구 요청 직후",
                "neutral": "그 직후",
                "dateExact": "요청 직후",
                "period": "수주 직후"
              },
              "edit": {
                "exact": "준오 이름과 공동 발표 문구 삭제",
                "neutral": "삭제 편집"
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
            "id": "partnership02:b:d-2:unlock:s4:0",
            "factText": "민경은 '실무 정리'라는 표현으로 공로 축소와 보너스 욕심을 함께 가렸다.",
            "tags": [
              "self_justification",
              "shame"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "phrase": {
                "exact": "실무 정리",
                "neutral": "그 표현"
              },
              "desire": {
                "exact": "공로 축소와 보너스 욕심",
                "neutral": "그 욕심"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "partnership02:b:d-2:unlock:s5:0",
            "factText": "민경은 준오의 원천 영업 기여를 줄여 적고 자신을 단독 수혜자에 가깝게 올렸다.",
            "tags": [
              "admission",
              "beneficiary"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "credit": {
                "exact": "원천 영업 기여 축소",
                "neutral": "초기 공로 축소"
              },
              "benefit": {
                "exact": "단독 수혜자에 가까운 배치",
                "neutral": "단독 수혜"
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
            "id": "partnership02:b:d-5:unlock:s2:0",
            "factText": "고객사의 단일 창구 요청은 민경의 제안이 아니라 고객사 측 선요청이었다.",
            "tags": [
              "institution",
              "timeline"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "request": {
                "exact": "고객사 선요청",
                "neutral": "고객사 먼저 요청"
              },
              "result": {
                "exact": "민경 단독 창구",
                "neutral": "단독 창구"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "partnership02:b:d-5:unlock:s3:0",
            "factText": "민경은 단일 창구 배경을 내부에 설명할 때 핵심 사유인 컴플라이언스 우려를 뺐다.",
            "tags": [
              "privacy",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "hidden": {
                "exact": "컴플라이언스 우려",
                "neutral": "핵심 사유"
              },
              "phrase": {
                "exact": "실무 정리 설명",
                "neutral": "축소 설명"
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
            "id": "partnership02:b:d-5:unlock:s4:0",
            "factText": "민경은 계약 충격을 두려워해 이유를 숨겼고, 그 공백이 자신의 통제 강화에도 쓰였음을 안다.",
            "tags": [
              "fear",
              "motive"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "risk": {
                "exact": "계약 충격",
                "neutral": "계약 충격 우려"
              },
              "gain": {
                "exact": "통제 강화",
                "neutral": "통제 강화"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "partnership02:b:d-5:unlock:s5:0",
            "factText": "고객사 검토 메모는 준오의 별도 유지보수 제안과 사업자등록증 첨부를 단일 창구 지정의 촉발점으로 적는다.",
            "tags": [
              "institution",
              "admission"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "memo": {
                "exact": "고객사 검토 메모",
                "neutral": "검토 메모"
              },
              "cause": {
                "exact": "별도 제안과 등록증 첨부",
                "neutral": "그 제안과 첨부"
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
            "id": "partnership02:b:d-4:unlock:s2:0",
            "factText": "서명된 RACI 시트와 최종 보고서 편집 이력은 민경이 공동 구조를 단독 구조로 바꾼 흔적을 함께 남긴다.",
            "tags": [
              "rule",
              "evidence"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "rule": {
                "exact": "서명된 RACI 시트",
                "neutral": "서명 규칙"
              },
              "edit": {
                "exact": "최종 보고서 편집 이력",
                "neutral": "편집 이력"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "partnership02:b:d-4:unlock:s3:0",
            "factText": "민경은 전체 공로 문제를 '최종 제출 책임'으로 좁혀 자신에게 유리한 구간만 남겼다.",
            "tags": [
              "context",
              "counter"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "scope": {
                "exact": "최종 제출 책임",
                "neutral": "좁힌 범위"
              },
              "benefit": {
                "exact": "유리한 구간만 남김",
                "neutral": "유리한 구간"
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
            "id": "partnership02:b:d-4:unlock:s4:0",
            "factText": "민경은 공동 발표 원칙을 알고도 마지막 문서에서 그 문장을 의도적으로 남기지 않았다.",
            "tags": [
              "shame",
              "rule"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "principle": {
                "exact": "공동 발표 원칙",
                "neutral": "공동 원칙"
              },
              "edit": {
                "exact": "마지막 문서에서 문장 누락",
                "neutral": "문장 누락"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "partnership02:b:d-4:unlock:s5:0",
            "factText": "준오의 우회와 민경의 단독 공로 구조 만들기는 서로 다른 방식의 동일 규칙 위반이었다.",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "aAction": {
                "exact": "준오의 우회",
                "neutral": "상대 우회"
              },
              "bAction": {
                "exact": "민경의 단독 공로 구조",
                "neutral": "자신의 단독 구조"
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
        "id": "partnership02:contradiction:0",
        "targetParty": "a",
        "trigger": "박준오가 자신을 순수한 피해자로만 묘사한 직후",
        "text": "초기 영업 공로는 인정되지만, 사촌 회사 명의 별도 유지보수 타진이 확인되면 '당하기만 한 사람'이라는 진술은 스스로 흔들립니다.",
        "relatedDisputes": [
          "d-1",
          "d-3"
        ],
        "evidenceIds": [
          "e-4"
        ]
      },
      {
        "id": "partnership02:contradiction:1",
        "targetParty": "b",
        "trigger": "서민경이 단일 창구 지정 이유를 운영 일관성으로만 설명할 때",
        "text": "고객사 검토 메모에는 운영 일관성보다 컴플라이언스 우려가 먼저 적혀 있습니다. 설명의 핵심 사유가 바뀌었습니다.",
        "relatedDisputes": [
          "d-5"
        ],
        "evidenceIds": [
          "e-5"
        ]
      },
      {
        "id": "partnership02:contradiction:2",
        "targetParty": "b",
        "trigger": "서민경이 최종 문서 편집을 단순 정리라고 주장할 때",
        "text": "편집 로그에는 준오 이름과 공동 발표 문구를 지운 흔적이 선명합니다. 형식 정리라고 보기엔 삭제 방향이 일관됩니다.",
        "relatedDisputes": [
          "d-2",
          "d-4"
        ],
        "evidenceIds": [
          "e-6"
        ]
      },
      {
        "id": "partnership02:contradiction:3",
        "targetParty": "a",
        "trigger": "박준오가 RACI 위반의 책임을 민경에게만 돌릴 때",
        "text": "RACI를 들고 상대를 비난하면서도 본인은 공식 라인을 우회했습니다. 규칙 위반의 방향만 다를 뿐, 위반 자체는 쌍방입니다.",
        "relatedDisputes": [
          "d-1",
          "d-4"
        ],
        "evidenceIds": [
          "e-4",
          "e-6"
        ]
      }
    ],
    "interjections": [
      {
        "id": "partnership02:interjection:0",
        "speaker": "a",
        "trigger": "서민경이 문서 버전과 결재본만 열거하며 동기를 피할 때",
        "text": "버전 번호 말고, 왜 제 이름을 뺐는지부터 말해보세요. 계속 문서 제목만 읽는다고 핵심이 사라지지 않습니다.",
        "relatedDisputes": [
          "d-2",
          "d-4"
        ]
      },
      {
        "id": "partnership02:interjection:1",
        "speaker": "b",
        "trigger": "박준오가 이동 거리와 밤샘 횟수만 늘어놓으며 side deal 질문을 밀어낼 때",
        "text": "얼마나 뛰었는지는 이미 기록으로 확인됩니다. 지금 묻는 건 왜 공식 라인 밖에서 사촌 회사 명의를 꺼냈느냐는 점입니다.",
        "relatedDisputes": [
          "d-1",
          "d-3"
        ]
      },
      {
        "id": "partnership02:interjection:2",
        "speaker": "judge",
        "trigger": "크롭된 음성메모만으로 결론을 내리려는 흐름이 강해질 때",
        "text": "캡처만으로 단정하지 마십시오. 이 사건은 원본 이메일과 편집 로그를 함께 놓고 봐야 전체 맥락이 드러납니다.",
        "relatedDisputes": [
          "d-1",
          "d-3",
          "d-5"
        ]
      }
    ],
    "emotionalOutbursts": [
      {
        "id": "partnership02:outburst:a:0",
        "party": "a",
        "trigger": "최종 계약 표지에서 자신의 이름이 빠진 장면이 다시 언급될 때",
        "text": "제가 처음 문을 열었는데 마지막 장에 제 이름이 없었습니다. 그 순간엔 제가 회사에서 지워진 줄 알았습니다.",
        "relatedDisputes": [
          "d-2",
          "d-3"
        ]
      },
      {
        "id": "partnership02:outburst:a:1",
        "party": "a",
        "trigger": "사촌 회사 사업자등록증 첨부가 낭독될 때",
        "text": "네, 그게 경솔했습니다. 그런데 그 전부터 저는 제 공이 사라질까 계속 쫓기고 있었다는 점도 좀 봐주십시오.",
        "relatedDisputes": [
          "d-1",
          "d-3"
        ]
      },
      {
        "id": "partnership02:outburst:b:0",
        "party": "b",
        "trigger": "민경이 공로를 훔치려 했다는 표현이 반복될 때",
        "text": "훔친 게 아니라 무너진 거래를 겨우 붙잡은 겁니다. 그 표현 하나로 모든 리스크 정리가 지워지진 않습니다.",
        "relatedDisputes": [
          "d-2",
          "d-5"
        ]
      },
      {
        "id": "partnership02:outburst:b:1",
        "party": "b",
        "trigger": "고객사 컴플라이언스 메모의 존재가 공개되고도 민경이 이유를 숨긴 점이 추궁될 때",
        "text": "그 메모를 그대로 꺼냈다가 계약이 흔들리면 누가 책임집니까. 저는 숨기고 싶어서가 아니라 당장 무너질 걸 막으려 했습니다.",
        "relatedDisputes": [
          "d-4",
          "d-5"
        ]
      }
    ]
  },
  "transitionBeats": [
    {
      "id": "partnership02:transition:a:d-1:s0_s1",
      "caseId": "partnership02",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "maintenance_side_contract_question",
      "line": "본계약과 분리된 후속 운영 옵션을 떠본 건 맞지만, 정식 제안까지 간 건 아니었습니다.",
      "behaviorHint": "자기 고생을 먼저 깔아 두면서도 단정어를 조금 줄인다."
    },
    {
      "id": "partnership02:transition:a:d-1:s1_s2",
      "caseId": "partnership02",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-3_presented",
      "line": "시훈데이터랩 명의의 파일럿 가능성을 고객사에 물어본 건 맞습니다.",
      "behaviorHint": "입술을 깨물고 핵심 사실 하나를 마지못해 내놓는다."
    },
    {
      "id": "partnership02:transition:a:d-1:s2_s3",
      "caseId": "partnership02",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "cousin_company_question",
      "line": "제가 라인을 우회한 건 경솔했지만, 유지보수 분리 아이디어를 회사 안에서 꺼냈을 때 결론이 계속 미뤄진 것도 사실입니다.",
      "behaviorHint": "손을 젓다가 결국 상대 쪽 방치나 삭제를 함께 끌어온다."
    },
    {
      "id": "partnership02:transition:a:d-1:s3_s5",
      "caseId": "partnership02",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-4_presented",
      "line": "저는 계약 서명 8일 전에 고객사에 사촌 회사 사업자등록증까지 붙여 별도 유지보수 파일럿을 타진했습니다.",
      "behaviorHint": "잠깐 눈을 감았다가 우회 사실을 직접 언어로 확정한다."
    },
    {
      "id": "partnership02:transition:a:d-3:s0_s1",
      "caseId": "partnership02",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "credit_theft_question",
      "line": "제가 먼저 리드를 잡고 제안서를 만든 건 분명하고, 다른 행동은 그 뒤에 따라온 일입니다.",
      "behaviorHint": "자기 고생을 먼저 깔아 두면서도 단정어를 조금 줄인다."
    },
    {
      "id": "partnership02:transition:a:d-3:s1_s2",
      "caseId": "partnership02",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-1_presented",
      "line": "피해를 입은 건 맞지만 제 판단이 완전히 깨끗했다고는 못 하겠습니다.",
      "behaviorHint": "입술을 깨물고 핵심 사실 하나를 마지못해 내놓는다."
    },
    {
      "id": "partnership02:transition:a:d-3:s2_s4",
      "caseId": "partnership02",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S2",
      "toState": "S4",
      "trigger": "nonjudgmental_question_about_side_maintenance_spinout",
      "line": "순수한 피해자처럼만 보이고 싶어서 유지보수 이야기를 축소했습니다.",
      "behaviorHint": "호흡이 흔들리고 억울함과 부끄러움이 함께 새어 나온다."
    },
    {
      "id": "partnership02:transition:a:d-3:s4_s5",
      "caseId": "partnership02",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S4",
      "toState": "S5",
      "trigger": "e-4_or_e-5_presented",
      "line": "저는 초기 영업 기여를 한 것도 사실이지만, 별도 유지보수 제안까지 했기 때문에 순수한 피해자라는 말은 성립하지 않습니다.",
      "behaviorHint": "잠깐 눈을 감았다가 우회 사실을 직접 언어로 확정한다."
    },
    {
      "id": "partnership02:transition:a:d-4:s0_s1",
      "caseId": "partnership02",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "raci_rule_question",
      "line": "제가 외부 라인을 살짝 벗어난 건 있어도, 공로 규칙 자체를 뒤엎은 건 아닙니다.",
      "behaviorHint": "자기 고생을 먼저 깔아 두면서도 단정어를 조금 줄인다."
    },
    {
      "id": "partnership02:transition:a:d-4:s1_s2",
      "caseId": "partnership02",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-6_presented",
      "line": "제 별도 문의가 공식 커뮤니케이션 원칙을 건드린 건 인정합니다.",
      "behaviorHint": "입술을 깨물고 핵심 사실 하나를 마지못해 내놓는다."
    },
    {
      "id": "partnership02:transition:a:d-4:s2_s5",
      "caseId": "partnership02",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S2",
      "toState": "S5",
      "trigger": "shared_responsibility_question",
      "line": "저는 공식 라인을 우회했고, 민경은 공로 구조를 단독으로 바꿨습니다. 둘 다 RACI 합의를 어겼습니다.",
      "behaviorHint": "잠깐 눈을 감았다가 우회 사실을 직접 언어로 확정한다."
    },
    {
      "id": "partnership02:transition:b:d-2:s0_s1",
      "caseId": "partnership02",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "final_credit_question",
      "line": "보상안이 제 중심으로 보일 수는 있지만 수주 직후 운영 리스크를 정리한 맥락이 있었습니다.",
      "behaviorHint": "표정을 거의 바꾸지 않고 설명 범위를 좁힌다."
    },
    {
      "id": "partnership02:transition:b:d-2:s1_s2",
      "caseId": "partnership02",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-2_presented",
      "line": "최종 부속문서와 승인안에서 제 이름이 단독 주공로처럼 남은 건 사실입니다.",
      "behaviorHint": "짧게 멈춘 뒤 문서에 남은 사실만 건조하게 인정한다."
    },
    {
      "id": "partnership02:transition:b:d-2:s2_s3",
      "caseId": "partnership02",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "edit_history_question",
      "line": "준오의 원천 영업 기여를 낮춰 잡은 건, 컴플라이언스 이슈 이후 외부 설명선을 통일하려는 판단도 섞여 있었습니다.",
      "behaviorHint": "문장을 항목처럼 잘라 상대 행동을 함께 배치한다."
    },
    {
      "id": "partnership02:transition:b:d-2:s3_s5",
      "caseId": "partnership02",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-6_presented",
      "line": "저는 최종 문서와 보상안에서 준오의 원천 기여를 축소했고, 그 결과 성과급을 단독에 가깝게 가져가려 했습니다.",
      "behaviorHint": "더는 요약으로 피하지 못하고 가장 불리한 문장까지 포함해 말한다."
    },
    {
      "id": "partnership02:transition:b:d-5:s0_s1",
      "caseId": "partnership02",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "official_contact_reason_question",
      "line": "준오 문제만이 전부라고 단정하긴 어렵지만, 외부 접점 관리 이슈가 있었던 건 사실입니다.",
      "behaviorHint": "표정을 거의 바꾸지 않고 설명 범위를 좁힌다."
    },
    {
      "id": "partnership02:transition:b:d-5:s1_s2",
      "caseId": "partnership02",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-2_presented",
      "line": "단일 창구 요청은 고객사가 먼저 했고, 그 직후 문서 정리가 제 중심으로 몰린 것도 맞습니다.",
      "behaviorHint": "짧게 멈춘 뒤 문서에 남은 사실만 건조하게 인정한다."
    },
    {
      "id": "partnership02:transition:b:d-5:s2_s4",
      "caseId": "partnership02",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S2",
      "toState": "S4",
      "trigger": "nonjudgmental_question_about_client_risk",
      "line": "계약이 흔들릴까 봐 단일 창구 사유를 공개하지 못했고, 그 빈칸에 제 욕심도 섞였습니다.",
      "behaviorHint": "한 박자 쉬고 감정을 숨긴 채 핵심 사유의 일부를 내준다."
    },
    {
      "id": "partnership02:transition:b:d-5:s4_s5",
      "caseId": "partnership02",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S4",
      "toState": "S5",
      "trigger": "e-5_presented",
      "line": "고객사가 저를 단독 창구로 지정한 핵심 이유는 준오의 별도 유지보수 제안과 사업자등록증 첨부로 생긴 컴플라이언스 우려였습니다.",
      "behaviorHint": "더는 요약으로 피하지 못하고 가장 불리한 문장까지 포함해 말한다."
    },
    {
      "id": "partnership02:transition:b:d-4:s0_s1",
      "caseId": "partnership02",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "raci_reminder",
      "line": "공동 발표 원칙을 완전히 무시하려던 건 아니고, 고객사 요청에 맞춰 창구를 줄인 측면이 있었습니다.",
      "behaviorHint": "표정을 거의 바꾸지 않고 설명 범위를 좁힌다."
    },
    {
      "id": "partnership02:transition:b:d-4:s1_s2",
      "caseId": "partnership02",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-6_presented",
      "line": "최종 보고서와 보상안에서 공동 공로 구조가 제 단독 구조처럼 바뀐 건 사실입니다.",
      "behaviorHint": "짧게 멈춘 뒤 문서에 남은 사실만 건조하게 인정한다."
    },
    {
      "id": "partnership02:transition:b:d-4:s2_s3",
      "caseId": "partnership02",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "shared_bonus_question",
      "line": "준오의 우회 제안이 규칙을 흔든 뒤라 저도 통제 쪽으로 과하게 쏠렸습니다.",
      "behaviorHint": "문장을 항목처럼 잘라 상대 행동을 함께 배치한다."
    },
    {
      "id": "partnership02:transition:b:d-4:s3_s5",
      "caseId": "partnership02",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "responsibility_question",
      "line": "준오는 외부 라인을 우회했고, 저는 RACI와 공동 발표 원칙을 깨고 단독 공로 구조를 만들었습니다.",
      "behaviorHint": "더는 요약으로 피하지 못하고 가장 불리한 문장까지 포함해 말한다."
    }
  ]
} as const;

export default partnership02V3GameLoopData;
