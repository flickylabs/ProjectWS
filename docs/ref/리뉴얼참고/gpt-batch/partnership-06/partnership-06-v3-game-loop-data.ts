export const partnership06V3GameLoopData = {
  "caseId": "partnership-06",
  "dossierCards": [
    {
      "id": "dossier-1",
      "name": "초기 변경지시 대조",
      "description": "집기 대체 발주와 카운터 재배치 지시가 각각 어떻게 시작됐는지 맞대어 묻는 카드",
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
              "text": "이가람 씨, 옵션 확보였다고 하셨는데, 통화 14분 뒤 발주서와 PM 로그에 대체 모델 코드가 연속 반영된 이유를 설명하시겠습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "partnership-06:a:d-1:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q2",
              "text": "납기 문제만이었다면 왜 변경 대상이 보라 측이 브랜드 포인트로 고집하던 구역에 집중됐습니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "partnership-06:a:d-1:unlock:s2:1",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q3",
              "text": "공동 승인 시트에 서명해 둔 상태에서 이번 발주만 예외라고 본 근거가 무엇입니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "partnership-06:a:d-1:unlock:s3:0",
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
              "text": "최보라 씨, 디자인 조정이라고 하셨는데, 왜 댓글 안에 카운터 위치와 함께 철거 순서 변경 문구까지 들어가 있습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "partnership-06:b:d-2:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q2",
              "text": "그 댓글 뒤 22분 만에 수정 평면도가 생성된 흐름도 단순 제안이라고 보십니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "partnership-06:b:d-2:unlock:s2:1",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q3",
              "text": "카운터 이동을 브랜드 범주라고 부르더라도, 외부 허가와 일정이 움직였다면 승인 대상 변경 아닌가요?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "partnership-06:b:d-2:unlock:s3:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-2",
      "name": "승인선과 메신저의 밤",
      "description": "공동 승인 원칙과 단톡에서 드러난 현장 권위 경쟁을 연결해 묻는 카드",
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
              "text": "이가람 씨, 관리소 시간 압박이 있었다 해도, 공동 승인선을 스스로 예외처럼 취급한 순간을 인정하십니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "partnership-06:a:d-1:unlock:s4:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q2",
              "text": "결국 보라 최종 확인이 없다는 걸 알고도 집기·조명 대체 발주를 실행한 것 아닙니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "partnership-06:a:d-1:unlock:s5:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q3",
              "text": "지연 원인을 말할 때 보라 책임을 먼저 꺼낸 건, 운영총괄로서의 실패 평가가 두려웠기 때문 아닙니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "partnership-06:a:d-4:unlock:s3:0",
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
              "text": "최보라 씨, 대표님이 보낸 한 줄 정리가 직원 입장에선 또 다른 최종안처럼 읽혔다는 점은 인정하십니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "partnership-06:b:d-5:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q2",
              "text": "단톡 캡처 하나는 약하더라도, 다른 기록과 맞물리면 복수 최종안 전달 구조가 보인다는 점은 부정하기 어렵지 않습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "partnership-06:b:d-5:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q3",
              "text": "정리하려던 의도와 별개로, 그 요약이 실무자에게 또 다른 권위로 작동한 사실을 보십니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "partnership-06:b:d-5:unlock:s4:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-3",
      "name": "지연과 혼선의 최종 로그",
      "description": "기관 기록과 현장일지로 실제 지연 구조와 복수 최종안의 결과를 확정하는 카드",
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
              "text": "이가람 씨, 현장일지가 지연 사유를 대체 발주와 카운터 재이동의 충돌로 나눠 적고 있는데, 아직도 한 사람 탓이라고 보십니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "partnership-06:a:d-4:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q2",
              "text": "리뉴얼 직전 관리소 제약이 생겼을 때 긴급 현장판단의 한계를 다시 정하지 못했다는 점을 인정하십니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "partnership-06:a:d-4:unlock:s4:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q3",
              "text": "결국 실제 지연이 보라 한 사람의 월권이 아니라 두 변경의 충돌이었다는 결론까지 받아들이십니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "partnership-06:a:d-4:unlock:s5:0",
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
              "text": "최보라 씨, 브랜드 일관성이라는 표현으로 일정 개입을 작게 보이게 만든 점을 이제는 인정하십니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "partnership-06:b:d-2:unlock:s4:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q2",
              "text": "가람 재확인 없이 카운터 위치와 철거 순서를 바꾸라고 직접 말한 사실을 명확히 인정하십니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "partnership-06:b:d-2:unlock:s5:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q3",
              "text": "대표님 정리본과 수정 평면도가 직원과 협력업체에 사실상 최종안처럼 전달됐다는 결론도 받아들이십니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "partnership-06:b:d-5:unlock:s5:0",
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
            "id": "partnership-06:a:d-1:unlock:s2:0",
            "factText": "가람 통화 후 14분 안에 대체 모델 코드가 발주서와 PM 로그에 연속 반영됐다.",
            "tags": [
              "evidence",
              "timeline",
              "act"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "time": {
                "exact": "통화 후 14분",
                "neutral": "짧은 간격"
              },
              "institution": {
                "exact": "시공 PM 로그",
                "neutral": "현장 기록"
              }
            },
            "stanceHints": [
              "partial",
              "evidence_hit"
            ]
          },
          {
            "id": "partnership-06:a:d-1:unlock:s2:1",
            "factText": "대체 발주 대상이 보라가 브랜드 포인트로 잡아 둔 구역 품목에 집중돼 있었다.",
            "tags": [
              "identity",
              "context",
              "motive"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "person": {
                "exact": "최보라",
                "neutral": "상대",
                "fullName": "최보라",
                "judgeRef": "상대방"
              },
              "item": {
                "exact": "브랜드 포인트 구역 품목",
                "neutral": "민감 구역"
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
            "id": "partnership-06:a:d-1:unlock:s3:0",
            "factText": "가람도 변경승인 시트에 서명해 공동 승인 원칙을 알고 있었는데, 이번 발주에는 그 선을 적용하지 않았다.",
            "tags": [
              "rule",
              "threshold",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "amount": {
                "exact": "300만원 이상",
                "neutral": "기준 금액 이상의 변경",
                "rounded": "300만원대 이상"
              },
              "item": {
                "exact": "변경승인 시트",
                "neutral": "승인 문서"
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
            "id": "partnership-06:a:d-1:unlock:s4:0",
            "factText": "관리소 시간 제한과 재오픈 압박을 이유로 가람은 승인 누락을 스스로 예외처럼 취급했다.",
            "tags": [
              "context",
              "fear",
              "self_justification"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "institution": {
                "exact": "관리소 시간 제한",
                "neutral": "외부 제약"
              },
              "time": {
                "exact": "재오픈 직전",
                "neutral": "그때"
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
            "id": "partnership-06:a:d-1:unlock:s5:0",
            "factText": "가람은 보라 최종 확인이 없다는 걸 알면서도 집기·조명 대체 발주를 실행했다.",
            "tags": [
              "admission",
              "act",
              "relationship"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "exact": "최보라",
                "neutral": "상대",
                "fullName": "최보라",
                "judgeRef": "상대방"
              },
              "item": {
                "exact": "집기·조명 대체 발주",
                "neutral": "그 발주"
              }
            },
            "stanceHints": [
              "admission",
              "emotional"
            ]
          }
        ]
      },
      "d-2": {
        "S2": [],
        "S3": [],
        "S4": [],
        "S5": []
      },
      "d-3": {
        "S2": [],
        "S3": [],
        "S4": [],
        "S5": []
      },
      "d-4": {
        "S2": [
          {
            "id": "partnership-06:a:d-4:unlock:s2:0",
            "factText": "시공 PM 현장일지는 지연 사유를 '대체 발주'와 '카운터 재이동' 충돌로 분리해 기록하고 있었다.",
            "tags": [
              "evidence",
              "timeline",
              "responsibility"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "item": {
                "exact": "대체 발주·카운터 재이동",
                "neutral": "두 변경"
              },
              "institution": {
                "exact": "시공 PM 현장일지",
                "neutral": "현장 기록"
              }
            },
            "stanceHints": [
              "partial",
              "evidence_hit"
            ]
          }
        ],
        "S3": [
          {
            "id": "partnership-06:a:d-4:unlock:s3:0",
            "factText": "가람은 오픈을 망친 운영총괄로 보일까 두려워 보라 책임을 먼저 밀어 올렸다.",
            "tags": [
              "fear",
              "emotion",
              "self_justification"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "exact": "이가람",
                "neutral": "본인",
                "fullName": "이가람",
                "judgeRef": "본인"
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
            "id": "partnership-06:a:d-4:unlock:s4:0",
            "factText": "리뉴얼 직전 관리소 제약이 생겼을 때 긴급 현장판단의 한계를 다시 정하지 못한 채 공사를 밀어붙였다.",
            "tags": [
              "context",
              "institution",
              "legacy_sentence"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "institution": {
                "exact": "복합상가 관리소",
                "neutral": "외부 관리 주체"
              },
              "time": {
                "exact": "리뉴얼 직전",
                "neutral": "그 무렵"
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
            "id": "partnership-06:a:d-4:unlock:s5:0",
            "factText": "실제 지연은 보라 한 사람의 월권이 아니라, 가람의 대체 발주와 보라의 재지시가 겹친 공동 결과였다.",
            "tags": [
              "admission",
              "responsibility",
              "counter"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "exact": "최보라",
                "neutral": "상대",
                "fullName": "최보라",
                "judgeRef": "상대방"
              },
              "item": {
                "exact": "대체 발주·재지시의 충돌",
                "neutral": "그 충돌"
              }
            },
            "stanceHints": [
              "admission",
              "emotional"
            ]
          }
        ]
      },
      "d-5": {
        "S2": [],
        "S3": [],
        "S4": [],
        "S5": []
      }
    },
    "b": {
      "d-1": {
        "S2": [],
        "S3": [],
        "S4": [],
        "S5": []
      },
      "d-2": {
        "S2": [
          {
            "id": "partnership-06:b:d-2:unlock:s2:0",
            "factText": "보라 계정 댓글에는 카운터 위치 조정뿐 아니라 철거 순서를 먼저 바꾸라는 문구가 함께 남아 있었다.",
            "tags": [
              "evidence",
              "act",
              "timeline"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "person": {
                "exact": "최보라",
                "neutral": "본인",
                "fullName": "최보라",
                "judgeRef": "본인"
              },
              "item": {
                "exact": "카운터 위치 조정·철거 순서 변경",
                "neutral": "그 지시"
              }
            },
            "stanceHints": [
              "partial",
              "evidence_hit"
            ]
          },
          {
            "id": "partnership-06:b:d-2:unlock:s2:1",
            "factText": "해당 댓글 뒤 22분 만에 카운터 재배치가 반영된 수정 평면도가 생성됐다.",
            "tags": [
              "timeline",
              "evidence",
              "act"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "time": {
                "exact": "댓글 후 22분",
                "neutral": "짧은 간격"
              },
              "item": {
                "exact": "수정 평면도",
                "neutral": "그 도면"
              }
            },
            "stanceHints": [
              "partial",
              "evidence_hit"
            ]
          }
        ],
        "S3": [
          {
            "id": "partnership-06:b:d-2:unlock:s3:0",
            "factText": "관리소 허가 변경 접수 시각이 보라 지시 흐름과 맞물려, 디자인 코멘트가 외부 일정 변경으로 이어졌음이 드러난다.",
            "tags": [
              "institution",
              "evidence",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "institution": {
                "exact": "복합상가 관리소",
                "neutral": "외부 관리 주체"
              },
              "item": {
                "exact": "허가 변경 접수",
                "neutral": "외부 일정 변경"
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
            "id": "partnership-06:b:d-2:unlock:s4:0",
            "factText": "보라는 자신의 변경을 '브랜드 일관성 유지'라고 축소해 일정 권한 침범을 작게 보이려 했다.",
            "tags": [
              "self_justification",
              "shame",
              "identity"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "reason": {
                "exact": "브랜드 일관성 유지",
                "neutral": "그 명분"
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
            "id": "partnership-06:b:d-2:unlock:s5:0",
            "factText": "보라는 가람과 재확인하지 않은 채 카운터 위치와 철거 순서를 바꾸라고 직접 말했다.",
            "tags": [
              "admission",
              "act",
              "relationship"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "exact": "이가람",
                "neutral": "상대",
                "fullName": "이가람",
                "judgeRef": "상대방"
              },
              "item": {
                "exact": "카운터 위치·철거 순서",
                "neutral": "그 변경"
              }
            },
            "stanceHints": [
              "admission",
              "emotional"
            ]
          }
        ]
      },
      "d-3": {
        "S2": [],
        "S3": [],
        "S4": [],
        "S5": []
      },
      "d-4": {
        "S2": [],
        "S3": [],
        "S4": [],
        "S5": []
      },
      "d-5": {
        "S2": [
          {
            "id": "partnership-06:b:d-5:unlock:s2:0",
            "factText": "보라의 정리본은 의도와 별개로 직원에게는 새로운 최종안처럼 읽혔다.",
            "tags": [
              "act",
              "context",
              "self_justification"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "item": {
                "exact": "정리본",
                "neutral": "정리본"
              }
            },
            "stanceHints": [
              "partial",
              "evidence_hit"
            ]
          }
        ],
        "S3": [
          {
            "id": "partnership-06:b:d-5:unlock:s3:0",
            "factText": "부매니저 단톡 캡처는 약하지만, e-5와 e-6의 시간 흐름과 맞물리면 복수 최종안 전달 구조가 성립한다.",
            "tags": [
              "evidence",
              "privacy",
              "institution"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "item": {
                "exact": "부매니저 단톡 캡처",
                "neutral": "대화 캡처"
              },
              "institution": {
                "exact": "관리소 기록·PM 일지",
                "neutral": "다른 기록"
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
            "id": "partnership-06:b:d-5:unlock:s4:0",
            "factText": "혼선을 정리하려던 보라의 한 줄 요약은 결과적으로 또 다른 권위가 되어 팀을 더 흔들었다.",
            "tags": [
              "emotion",
              "harm",
              "self_justification"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "item": {
                "exact": "한 줄 요약",
                "neutral": "정리본"
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
            "id": "partnership-06:b:d-5:unlock:s5:0",
            "factText": "보라는 자신의 정리본과 수정 평면도를 직원과 협력업체에 사실상 최종안처럼 전달했다.",
            "tags": [
              "admission",
              "act",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "exact": "최보라",
                "neutral": "본인",
                "fullName": "최보라",
                "judgeRef": "본인"
              },
              "item": {
                "exact": "정리본·수정 평면도",
                "neutral": "그 버전"
              }
            },
            "stanceHints": [
              "admission",
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
        "id": "partnership-06:contradiction:0",
        "targetParty": "a",
        "trigger": "가람이 대체 발주는 옵션 확보였다고 말한 뒤 e-1이 제시될 때",
        "text": "옵션만 잡아둔 것이라면 왜 통화 직후 발주서와 PM 로그에 대체 모델 코드가 연속 반영돼 있습니까?",
        "relatedDisputes": [
          "d-1",
          "d-4"
        ],
        "evidenceIds": [
          "e-1"
        ]
      },
      {
        "id": "partnership-06:contradiction:1",
        "targetParty": "b",
        "trigger": "보라가 카운터 조정은 디자인 범주였다고 축소한 뒤 e-2가 제시될 때",
        "text": "디자인 조정이라고 하셨지만, 댓글에는 철거 순서를 먼저 바꾸라는 문구까지 함께 남아 있습니다.",
        "relatedDisputes": [
          "d-2",
          "d-4"
        ],
        "evidenceIds": [
          "e-2"
        ]
      },
      {
        "id": "partnership-06:contradiction:2",
        "targetParty": "a",
        "trigger": "가람이 지연을 보라 한 사람 탓으로만 돌린 뒤 e-6이 제시될 때",
        "text": "현장일지에는 대체 발주와 카운터 재이동이 각각 어떤 충돌을 만들었는지 나뉘어 기록돼 있습니다.",
        "relatedDisputes": [
          "d-4"
        ],
        "evidenceIds": [
          "e-6"
        ]
      },
      {
        "id": "partnership-06:contradiction:3",
        "targetParty": "b",
        "trigger": "보라가 혼선은 정리 과정의 부산물이라고 말한 뒤 e-5와 e-6이 함께 제시될 때",
        "text": "정리하려고 보냈다는 메시지가 실제로는 외부 기관 기록과 현장일지에서도 별도 최종안처럼 작동한 흔적과 맞물립니다.",
        "relatedDisputes": [
          "d-5",
          "d-2"
        ],
        "evidenceIds": [
          "e-5",
          "e-6"
        ]
      }
    ],
    "interjections": [
      {
        "id": "partnership-06:interjection:0",
        "speaker": "a",
        "trigger": "보라가 운영 월권만을 길게 열거하며 현장 압박을 무시할 때",
        "text": "현장 안 본 사람 말처럼만 들리게 하지는 마세요. 그날 매장 안에 있던 건 저였습니다.",
        "relatedDisputes": [
          "d-1",
          "d-4"
        ]
      },
      {
        "id": "partnership-06:interjection:1",
        "speaker": "b",
        "trigger": "가람이 긴급성만 반복하며 승인 누락 질문을 흘릴 때",
        "text": "긴급함과 승인 누락은 다른 항목입니다. 항목을 나눠서 답해 주세요.",
        "relatedDisputes": [
          "d-1",
          "d-3"
        ]
      },
      {
        "id": "partnership-06:interjection:2",
        "speaker": "judge",
        "trigger": "두 사람이 동시에 상대 한 사람의 월권만을 원인으로 지목할 때",
        "text": "각자 누구에게 어떤 버전을 최종안처럼 전달했는지, 시간순으로 다시 진술하십시오.",
        "relatedDisputes": [
          "d-4",
          "d-5"
        ]
      }
    ],
    "emotionalOutbursts": [
      {
        "id": "partnership-06:outburst:a:0",
        "party": "a",
        "trigger": "e-4와 e-6 이후에도 가람의 무능 평가 두려움을 정면으로 찌를 때",
        "text": "제가 멈칫했으면 그 매장은 더 오래 닫혀 있었어요. 그 압박은 현장에 있던 사람만 압니다.",
        "relatedDisputes": [
          "d-1",
          "d-4"
        ]
      },
      {
        "id": "partnership-06:outburst:a:1",
        "party": "a",
        "trigger": "보라가 현장 판단 자체를 전부 월권으로 몰아갈 때",
        "text": "현장 사진도 안 보고 완성도만 말하면 끝입니까? 매장 문 여는 사람은 결국 저였어요.",
        "relatedDisputes": [
          "d-2",
          "d-4"
        ]
      },
      {
        "id": "partnership-06:outburst:b:0",
        "party": "b",
        "trigger": "e-2와 e-5 뒤에도 보라의 디자인 축소 프레임이 무너지기 시작할 때",
        "text": "카운터 위치 하나가 아니라 브랜드 첫 인상 전체였어요. 그걸 운영 편의처럼 밀어버린 게 더 큰 문제였죠.",
        "relatedDisputes": [
          "d-2",
          "d-4"
        ]
      },
      {
        "id": "partnership-06:outburst:b:1",
        "party": "b",
        "trigger": "직원 혼선이 드러난 뒤에도 가람이 자기 버전만 실무판이었다고 주장할 때",
        "text": "정리되지 않은 지시를 '현장판'이라고 부르면 다 최종안이 됩니다. 그래서 팀이 무너진 거예요.",
        "relatedDisputes": [
          "d-5"
        ]
      }
    ]
  },
  "transitionBeats": [
    {
      "id": "partnership-06:transition:a:d-1:s0_s1",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "fixture_reorder_question",
      "line": "그걸 월권으로만 부르면 현장 사정을 놓칩니다. 저는 우선 납기부터 확인한 겁니다.",
      "behaviorHint": "반박은 빠르지만 눈썹이 잠깐 흔들린다."
    },
    {
      "id": "partnership-06:transition:a:d-1:s1_s2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-1_presented",
      "line": "로그가 그렇게 남아 있다면 대체 모델 얘기를 꺼낸 것 자체는 부정하지 않겠습니다.",
      "behaviorHint": "말끝이 짧아지고 시선이 서류로 떨어진다."
    },
    {
      "id": "partnership-06:transition:a:d-1:s2_s3",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "joint_signoff_followup",
      "line": "네, 제가 밀어붙인 건 맞습니다. 그런데 그 확인이 제때 왔으면 여기까지 안 왔어요.",
      "behaviorHint": "인정 뒤에 곧바로 상대 책임을 붙인다."
    },
    {
      "id": "partnership-06:transition:a:d-1:s3_s5",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-4_or_responsibility_question",
      "line": "결국 제 판단이 승인선을 넘었습니다. 오픈 압박을 이유로 정식 확인을 건너뛴 건 제 몫입니다.",
      "behaviorHint": "어깨가 내려가고 목소리가 낮아진다."
    },
    {
      "id": "partnership-06:transition:a:d-4:s0_s1",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "delay_cause_question",
      "line": "제 발주만으로 지연이 났다고는 못 합니다. 현장을 꼬이게 한 건 그 뒤 변경까지 겹친 순간이었어요.",
      "behaviorHint": "손을 저으며 단정적 어조를 누그러뜨린다."
    },
    {
      "id": "partnership-06:transition:a:d-4:s1_s2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-3_presented",
      "line": "좋습니다. 제 변경도 조율을 더 만든 건 인정하죠. 다만 지연이 커진 건 충돌이 겹쳤기 때문입니다.",
      "behaviorHint": "고개를 끄덕인 뒤 단서를 덧붙인다."
    },
    {
      "id": "partnership-06:transition:a:d-4:s2_s4",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S2",
      "toState": "S4",
      "trigger": "nonjudgmental_question_about_reopen_pressure",
      "line": "사실 저는 문을 못 열까 봐 겁이 났습니다. 그래서 누구 책임이 더 크다는 말부터 붙들고 있었던 겁니다.",
      "behaviorHint": "숨을 길게 내쉬고 시선을 피한다."
    },
    {
      "id": "partnership-06:transition:a:d-4:s4_s5",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S4",
      "toState": "S5",
      "trigger": "e-6_presented",
      "line": "현장일지까지 보면 더는 한 사람 탓으로 못 갑니다. 지연은 제 발주와 보라 재지시가 같이 만든 결과입니다.",
      "behaviorHint": "체념한 표정으로 결론을 말한다."
    },
    {
      "id": "partnership-06:transition:a:d-5:s0_s1",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "conflicting_final_plan_question",
      "line": "현장엔 당장 쓰는 버전이 필요했습니다. 제가 보낸 건 그런 작업판이었다고 본 겁니다.",
      "behaviorHint": "손바닥을 펴 보이며 방어적으로 설명한다."
    },
    {
      "id": "partnership-06:transition:a:d-5:s1_s2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-3_and_staff_log_followup",
      "line": "제 버전이 최종안처럼 읽혔을 수는 있겠네요. 하지만 그때는 누군가 결정을 내려야 했어요.",
      "behaviorHint": "입술을 한 번 다문 뒤 인정한다."
    },
    {
      "id": "partnership-06:transition:a:d-5:s2_s3",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "vendor_instruction_question",
      "line": "네, 저도 제 버전을 더 세게 밀었습니다. 그렇다고 혼선이 저 혼자 만든 건 아닙니다.",
      "behaviorHint": "상대를 보며 속도를 높인다."
    },
    {
      "id": "partnership-06:transition:a:d-5:s3_s5",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-5_or_e-6_presented",
      "line": "결국 저도 최종안처럼 보냈습니다. 직원과 협력업체를 두 버전 사이에 세운 책임이 있습니다.",
      "behaviorHint": "말을 마친 뒤 손끝을 꽉 모은다."
    },
    {
      "id": "partnership-06:transition:b:d-2:s0_s1",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "counter_relocation_question",
      "line": "카운터 위치는 브랜드 구조의 일부였습니다. 저는 그 범주에서 말하고 있다고 생각했습니다.",
      "behaviorHint": "차분히 항목을 나누며 답한다."
    },
    {
      "id": "partnership-06:transition:b:d-2:s1_s2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-2_presented",
      "line": "댓글과 도면이 그렇게 남아 있다면, 위치와 순서에 함께 손댄 건 인정하겠습니다.",
      "behaviorHint": "표정은 유지한 채 문장 길이만 짧아진다."
    },
    {
      "id": "partnership-06:transition:b:d-2:s2_s3",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "permit_change_followup",
      "line": "문제를 디자인이라고 쪼개 말한 건 사실입니다. 실제 영향은 허가와 일정까지 갔습니다.",
      "behaviorHint": "말끝에서 아주 작게 한숨을 쉰다."
    },
    {
      "id": "partnership-06:transition:b:d-2:s3_s5",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-5_presented",
      "line": "맞습니다. 가람 재확인 없이 카운터와 철거 순서를 바꾸라고 말했습니다.",
      "behaviorHint": "더는 수식 없이 핵심만 건조하게 말한다."
    },
    {
      "id": "partnership-06:transition:b:d-4:s0_s1",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "delay_cause_question",
      "line": "지연의 시작을 가람 발주 변경으로 보는 입장은 유지합니다. 다만 제 코멘트도 불편을 더했을 수는 있습니다.",
      "behaviorHint": "눈을 깜빡이지 않고 천천히 말한다."
    },
    {
      "id": "partnership-06:transition:b:d-4:s1_s2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-2_or_e-6_presented",
      "line": "제 재지시도 추가 작업을 만들었습니다. 결국 두 변경이 같은 구간에 겹쳤던 거죠.",
      "behaviorHint": "원인을 하나씩 세듯 정리한다."
    },
    {
      "id": "partnership-06:transition:b:d-4:s2_s3",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "joint_delay_timeline_followup",
      "line": "제가 가람 책임을 더 크게 말한 건, 일정까지 건드렸다는 평가를 피하고 싶었기 때문입니다.",
      "behaviorHint": "어깨는 곧게 두고 시선만 살짝 내린다."
    },
    {
      "id": "partnership-06:transition:b:d-4:s3_s5",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-6_presented",
      "line": "현장일지와 견적서까지 보면 단독 책임이라는 말은 더는 유지하기 어렵습니다. 지연은 공동 결과였습니다.",
      "behaviorHint": "짧고 단단하게 결론을 내린다."
    },
    {
      "id": "partnership-06:transition:b:d-5:s0_s1",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "conflicting_final_plan_question",
      "line": "저는 혼선을 정리하려고 요약한 겁니다. 그때는 정리본이 필요하다고 생각했습니다.",
      "behaviorHint": "메모를 읽듯 짧게 정리한다."
    },
    {
      "id": "partnership-06:transition:b:d-5:s1_s2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-3_presented",
      "line": "제 정리본이 직원들에겐 최종안처럼 읽혔을 수는 있습니다.",
      "behaviorHint": "처음으로 한 문장만 남기고 멈춘다."
    },
    {
      "id": "partnership-06:transition:b:d-5:s2_s4",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S2",
      "toState": "S4",
      "trigger": "nonjudgmental_question_about_staff_confusion",
      "line": "질서를 세우려던 의도였지만, 결과적으로 또 다른 권위가 됐다는 건 압니다.",
      "behaviorHint": "입꼬리를 굳힌 채 천천히 인정한다."
    },
    {
      "id": "partnership-06:transition:b:d-5:s4_s5",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S4",
      "toState": "S5",
      "trigger": "e-5_or_e-6_presented",
      "line": "맞습니다. 제 정리본과 수정 평면도는 사실상 또 다른 최종안이었습니다.",
      "behaviorHint": "목소리를 낮추고 군더더기 없이 말한다."
    }
  ]
} as const;

