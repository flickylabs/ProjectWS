export const workplace02V3GameLoopData = {
  "caseId": "workplace-02",
  "dossierCards": [
    {
      "id": "dossier-1",
      "name": "선제 차단과 자기보호 복사",
      "description": "접근권 회수의 선행성과 개인 드라이브·DM 흔적을 함께 묶어 본다.",
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
              "text": "한규원 씨, 공식 조사번호가 생기기 전 접근권을 끊은 근거를, 절차 기준으로 답하십시오.",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "workplace-02:a:d-1:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q2",
              "text": "이 팀 공지가 익명이라면, 왜 실제론 한 사람만 가리키게 되었는지 설명하십시오.",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "workplace-02:a:d-5:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q3",
              "text": "개인 드라이브 흔적이 있었다 해도, 왜 민아 씨 한 사람만 먼저 위험 인물로 봤습니까.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "workplace-02:a:d-1:unlock:s3:0",
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
              "text": "조민아 씨, 개인 드라이브 업로드의 존재와 시점을, 보호 목적과 분리해서 답하십시오.",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "workplace-02:b:d-2:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q2",
              "text": "전 직장 동료 DM에 일부 문장이 회사 밖으로 나간 사실까지 부인하십니까.",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "workplace-02:b:d-2:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q3",
              "text": "단톡에서 스스로를 '희생양'이라 부른 순간부터 여론전을 시작한 것 아닙니까.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "workplace-02:b:d-5:unlock:s2:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-2",
      "name": "링크 재사용과 실제 유출선",
      "description": "공유링크 원본 로그와 전달 캡처를 붙여 실제 반출 경로를 복구한다.",
      "evidenceIds": [
        "e-3",
        "e-4"
      ],
      "relatedDisputes": [
        "d-3"
      ],
      "subjectParty": "both",
      "challenges": [
        {
          "targetParty": "a",
          "questions": [
            {
              "id": "dossier-2.a.q1",
              "text": "한규원 씨, 민아 업로드보다 먼저 열린 링크 경로가 있다면, 초기 단정은 무엇에 기대었습니까.",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "workplace-02:a:d-3:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q2",
              "text": "회수되지 않은 링크 관리가 핵심이었다면, 왜 민아 흔적만 좇았는지 답하십시오.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "workplace-02:a:d-3:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q3",
              "text": "노지원 전달선이 드러난 뒤에도 초기 지목의 책임을 부정하실 겁니까.",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "workplace-02:a:d-3:unlock:s5:0",
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
              "text": "조민아 씨, 개인 드라이브 흔적보다 앞선 링크 경로가 있다는 점을, 규원 실장님 추론과 분리해서 말해 보십시오.",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "workplace-02:b:d-3:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q2",
              "text": "오래 살아 있던 링크와 토큰이 핵심이라면, 왜 처음엔 상대 악의부터 단정했습니까.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "workplace-02:b:d-3:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q3",
              "text": "지금도 개인 프레임업이 전부라고 보십니까, 아니면 제3자 유출선을 인정하십니까.",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "workplace-02:b:d-3:unlock:s5:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-3",
      "name": "선행 낙인과 감사실 동선",
      "description": "HR 접수 메모와 감사실 동선을 연결해 입막음과 오판의 후반부를 밀어붙인다.",
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
              "text": "한규원 씨, HR 메모가 면담보다 먼저 들어간 이유를, 분류가 아닌 의도 차원에서 답하십시오.",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "workplace-02:a:d-4:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q2",
              "text": "비용처리 건을 감사 후로 미룬 지시가 제보 차단이 아니었다면, 다른 보호 장치를 제시해 보십시오.",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "workplace-02:a:d-4:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q3",
              "text": "제3자 반출 동선까지 확인된 뒤에도, 선제 지목과 입막음의 책임을 피할 수 있다고 보십니까.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "workplace-02:a:d-4:unlock:s5:0",
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
              "text": "조민아 씨, 면담 전 HR 메모가 있었다는 점이 드러났습니다. 당신이 느낀 압박이 주관적 오해만은 아니었다는 근거를 답하십시오.",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "workplace-02:b:d-4:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q2",
              "text": "비용 건을 미루라는 지시가 확인된 뒤, 왜 공식 채널 대신 여론전에 더 기대었습니까.",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "workplace-02:b:d-4:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q3",
              "text": "감사실 동선이 제3자 반출을 가리킨 뒤에도 단톡과 주변 말로 반격을 키운 책임을 인정합니까.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "workplace-02:b:d-5:unlock:s5:0",
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
            "id": "workplace-02:a:d-1:unlock:s2:0",
            "factText": "공식 조사 단계 이전에 특정 직원 한 명의 폴더 접근권이 먼저 회수된 사실",
            "tags": [
              "timeline",
              "act"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "mina": {
                "exact": "조민아",
                "neutral": "그 직원",
                "fullName": "조민아",
                "judgeRef": "민아 씨"
              },
              "case52": {
                "exact": "공식 조사번호 생성 52분 전",
                "neutral": "그 시점",
                "period": "감사 직전"
              },
              "hr": {
                "exact": "HR 조사 접수 메모",
                "neutral": "그 메모"
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
            "id": "workplace-02:a:d-1:unlock:s3:0",
            "factText": "특정 직원 한 명만 회수 대상이었고 팀 공지가 사실상 그 사람을 지목한 사실",
            "tags": [
              "identity",
              "harm"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "mina": {
                "exact": "조민아",
                "neutral": "그 직원",
                "fullName": "조민아",
                "judgeRef": "민아 씨"
              },
              "late_download": {
                "exact": "심야 다운로드 직후",
                "neutral": "그 시점",
                "period": "감사 직전"
              },
              "drive": {
                "exact": "개인 드라이브",
                "neutral": "그 저장공간"
              },
              "dm": {
                "exact": "전 직장 동료 DM",
                "neutral": "그 외부 대화"
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
            "id": "workplace-02:a:d-1:unlock:s4:0",
            "factText": "조직 안정과 본부 신뢰를 지키려는 두려움이 절차보다 앞섰던 사실",
            "tags": [
              "fear",
              "motive"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "audit_before": {
                "exact": "감사 직전",
                "neutral": "그때",
                "period": "감사 착수 이틀 전"
              },
              "gyuwon": {
                "exact": "한규원",
                "neutral": "그 상사",
                "fullName": "한규원",
                "judgeRef": "규원 씨"
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
            "id": "workplace-02:a:d-1:unlock:s5:0",
            "factText": "확정 증거 없이 특정 직원을 유출자로 몰고 선제 차단과 낙인을 진행한 사실",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "mina": {
                "exact": "조민아",
                "neutral": "그 직원",
                "fullName": "조민아",
                "judgeRef": "민아 씨"
              },
              "team_notice": {
                "exact": "보안 리스크 인원 공지",
                "neutral": "그 공지"
              },
              "case52": {
                "exact": "공식 조사번호 생성 52분 전",
                "neutral": "그 시점",
                "period": "감사 직전"
              }
            },
            "stanceHints": [
              "confess",
              "emotional"
            ]
          }
        ]
      },
      "d-2": {
        "S2": [
          {
            "id": "workplace-02:a:d-2:unlock:s2:0",
            "factText": "개인 드라이브 업로드는 있었지만 업로드 시각이 익명 유출 소문 이후라는 사실",
            "tags": [
              "timeline",
              "context"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "drive": {
                "exact": "개인 드라이브",
                "neutral": "그 저장공간"
              },
              "late_download": {
                "exact": "심야 다운로드 직후",
                "neutral": "그 시점",
                "period": "감사 직전"
              },
              "mina": {
                "exact": "조민아",
                "neutral": "그 직원",
                "fullName": "조민아",
                "judgeRef": "민아 씨"
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
            "id": "workplace-02:a:d-2:unlock:s3:0",
            "factText": "외부 연락의 범위는 불명확했지만 내부 보호 채널 부재가 자기방어를 부른 사실",
            "tags": [
              "context",
              "motive"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "dm": {
                "exact": "전 직장 동료 DM",
                "neutral": "그 외부 대화"
              },
              "drive": {
                "exact": "개인 드라이브",
                "neutral": "그 저장공간"
              },
              "mina": {
                "exact": "조민아",
                "neutral": "그 직원",
                "fullName": "조민아",
                "judgeRef": "민아 씨"
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
            "id": "workplace-02:a:d-2:unlock:s4:0",
            "factText": "자기방어성 복사와 악의적 유출을 분리하지 못한 판단",
            "tags": [
              "counter",
              "motive"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "mina": {
                "exact": "조민아",
                "neutral": "그 직원",
                "fullName": "조민아",
                "judgeRef": "민아 씨"
              },
              "scapegoat": {
                "exact": "'희생양'",
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
            "id": "workplace-02:a:d-2:unlock:s5:0",
            "factText": "무단 복사 사실은 있었지만 정확한 범위를 모른 채 그것을 유출자 단정의 재료로 사용한 사실",
            "tags": [
              "responsibility",
              "counter"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "drive": {
                "exact": "개인 드라이브",
                "neutral": "그 저장공간"
              },
              "dm": {
                "exact": "전 직장 동료 DM",
                "neutral": "그 외부 대화"
              },
              "mina": {
                "exact": "조민아",
                "neutral": "그 직원",
                "fullName": "조민아",
                "judgeRef": "민아 씨"
              }
            },
            "stanceHints": [
              "confess",
              "emotional"
            ]
          }
        ]
      },
      "d-3": {
        "S2": [
          {
            "id": "workplace-02:a:d-3:unlock:s2:0",
            "factText": "개인 업로드보다 앞선 시점의 접근 경로가 있을 수 있다는 사실",
            "tags": [
              "timeline",
              "evidence"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "old_link": {
                "exact": "회수되지 않은 공유링크",
                "neutral": "그 링크"
              },
              "two_hours_before": {
                "exact": "민아 업로드 2시간 전",
                "neutral": "그보다 앞선 시점",
                "period": "감사 직전"
              },
              "drive": {
                "exact": "개인 드라이브",
                "neutral": "그 저장공간"
              },
              "nojw": {
                "exact": "노지원",
                "neutral": "그 컨설턴트",
                "fullName": "노지원",
                "judgeRef": "노지원 씨"
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
            "id": "workplace-02:a:d-3:unlock:s3:0",
            "factText": "회수되지 않은 공유링크와 외주 전달선이 유출 경로가 될 수 있다는 사실",
            "tags": [
              "context",
              "identity"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "old_link": {
                "exact": "회수되지 않은 공유링크",
                "neutral": "그 링크"
              },
              "vendor": {
                "exact": "외부 번역업체",
                "neutral": "그 외부 업체"
              },
              "nojw": {
                "exact": "노지원",
                "neutral": "그 컨설턴트",
                "fullName": "노지원",
                "judgeRef": "노지원 씨"
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
            "id": "workplace-02:a:d-3:unlock:s4:0",
            "factText": "정확한 로그보다 빠른 범인 특정이 우선이 된 심리",
            "tags": [
              "fear",
              "motive"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "gyuwon": {
                "exact": "한규원",
                "neutral": "그 상사",
                "fullName": "한규원",
                "judgeRef": "규원 씨"
              },
              "audit_before": {
                "exact": "감사 직전",
                "neutral": "그때",
                "period": "감사 착수 이틀 전"
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
            "id": "workplace-02:a:d-3:unlock:s5:0",
            "factText": "실제 원본 반출 경로가 제3자 재사용 경로였다는 사실",
            "tags": [
              "identity",
              "evidence"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "old_link": {
                "exact": "회수되지 않은 공유링크",
                "neutral": "그 링크"
              },
              "token": {
                "exact": "임시다운로드 토큰",
                "neutral": "그 토큰"
              },
              "nojw": {
                "exact": "노지원",
                "neutral": "그 컨설턴트",
                "fullName": "노지원",
                "judgeRef": "노지원 씨"
              },
              "mina": {
                "exact": "조민아",
                "neutral": "그 직원",
                "fullName": "조민아",
                "judgeRef": "민아 씨"
              }
            },
            "stanceHints": [
              "confess",
              "evidence_hit"
            ]
          }
        ]
      },
      "d-4": {
        "S2": [
          {
            "id": "workplace-02:a:d-4:unlock:s2:0",
            "factText": "한 직원 면담 이전에 인사 조사 기록에 위험 메모가 먼저 입력된 사실",
            "tags": [
              "institution",
              "timeline"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "hr": {
                "exact": "HR 조사 접수 메모",
                "neutral": "그 메모"
              },
              "risk_note": {
                "exact": "보안상 위험 인물",
                "neutral": "그 표현"
              },
              "mina": {
                "exact": "조민아",
                "neutral": "그 직원",
                "fullName": "조민아",
                "judgeRef": "민아 씨"
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
            "id": "workplace-02:a:d-4:unlock:s3:0",
            "factText": "비용처리 이상 징후를 공식 채널이 아니라 구두 정리로 묶어 두려 한 사실",
            "tags": [
              "rule",
              "act"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "verbal_only": {
                "exact": "감사 끝날 때까지 구두 정리",
                "neutral": "그 지시"
              },
              "gyuwon": {
                "exact": "한규원",
                "neutral": "그 상사",
                "fullName": "한규원",
                "judgeRef": "규원 씨"
              },
              "mina": {
                "exact": "조민아",
                "neutral": "그 직원",
                "fullName": "조민아",
                "judgeRef": "민아 씨"
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
            "id": "workplace-02:a:d-4:unlock:s4:0",
            "factText": "감사 대응 평판을 지키려는 두려움이 제보 보호보다 앞섰던 사실",
            "tags": [
              "fear",
              "motive"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "gyuwon": {
                "exact": "한규원",
                "neutral": "그 상사",
                "fullName": "한규원",
                "judgeRef": "규원 씨"
              },
              "audit_before": {
                "exact": "감사 직전",
                "neutral": "그때",
                "period": "감사 착수 이틀 전"
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
            "id": "workplace-02:a:d-4:unlock:s5:0",
            "factText": "선행 낙인 메모와 비공식 입막음 지시가 함께 존재했다는 사실",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "risk_note": {
                "exact": "보안상 위험 인물",
                "neutral": "그 표현"
              },
              "hr": {
                "exact": "HR 조사 접수 메모",
                "neutral": "그 메모"
              },
              "verbal_only": {
                "exact": "감사 끝날 때까지 구두 정리",
                "neutral": "그 지시"
              },
              "mina": {
                "exact": "조민아",
                "neutral": "그 직원",
                "fullName": "조민아",
                "judgeRef": "민아 씨"
              }
            },
            "stanceHints": [
              "confess",
              "emotional"
            ]
          }
        ]
      },
      "d-5": {
        "S2": [
          {
            "id": "workplace-02:a:d-5:unlock:s2:0",
            "factText": "익명 공지처럼 보였지만 실제로는 한 사람만 겨냥된 소문 재료였다는 사실",
            "tags": [
              "identity",
              "harm"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "team_notice": {
                "exact": "보안 리스크 인원 공지",
                "neutral": "그 공지"
              },
              "mina": {
                "exact": "조민아",
                "neutral": "그 직원",
                "fullName": "조민아",
                "judgeRef": "민아 씨"
              },
              "rumor_quote": {
                "exact": "'외부랑 붙었다'",
                "neutral": "그 암시"
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
            "id": "workplace-02:a:d-5:unlock:s3:0",
            "factText": "관리자 쪽 암시와 상대 쪽 비공식 대화 발언이 맞물려 소문전이 커진 사실",
            "tags": [
              "relationship",
              "counter"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "group_chat": {
                "exact": "단톡 발언",
                "neutral": "그 말"
              },
              "scapegoat": {
                "exact": "'희생양'",
                "neutral": "그 표현"
              },
              "rumor_quote": {
                "exact": "'외부랑 붙었다'",
                "neutral": "그 암시"
              },
              "mina": {
                "exact": "조민아",
                "neutral": "그 직원",
                "fullName": "조민아",
                "judgeRef": "민아 씨"
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
            "id": "workplace-02:a:d-5:unlock:s4:0",
            "factText": "팀 통제권을 지키려 소문으로 분위기를 선점하려 한 사실",
            "tags": [
              "motive",
              "act"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "gyuwon": {
                "exact": "한규원",
                "neutral": "그 상사",
                "fullName": "한규원",
                "judgeRef": "규원 씨"
              },
              "team_notice": {
                "exact": "보안 리스크 인원 공지",
                "neutral": "그 공지"
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
            "id": "workplace-02:a:d-5:unlock:s5:0",
            "factText": "공식 조사 전 상대를 압박하려는 의도로 소문을 사용한 사실",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "rumor_quote": {
                "exact": "'외부랑 붙었다'",
                "neutral": "그 암시"
              },
              "mina": {
                "exact": "조민아",
                "neutral": "그 직원",
                "fullName": "조민아",
                "judgeRef": "민아 씨"
              },
              "group_chat": {
                "exact": "단톡 발언",
                "neutral": "그 말"
              }
            },
            "stanceHints": [
              "confess",
              "emotional"
            ]
          }
        ]
      }
    },
    "b": {
      "d-1": {
        "S2": [
          {
            "id": "workplace-02:b:d-1:unlock:s2:0",
            "factText": "공식 조사 단계보다 앞서 접근권이 회수된 사실",
            "tags": [
              "timeline",
              "evidence"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "case52": {
                "exact": "공식 조사번호 생성 52분 전",
                "neutral": "그 시점",
                "period": "감사 직전"
              },
              "hr": {
                "exact": "HR 조사 접수 메모",
                "neutral": "그 메모"
              },
              "mina": {
                "exact": "조민아",
                "neutral": "그 직원",
                "fullName": "조민아",
                "judgeRef": "민아 씨"
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
            "id": "workplace-02:b:d-1:unlock:s3:0",
            "factText": "익명 팀 공지가 사실상 한 사람에게만 낙인 효과를 냈던 사실",
            "tags": [
              "harm",
              "identity"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "team_notice": {
                "exact": "보안 리스크 인원 공지",
                "neutral": "그 공지"
              },
              "risk_note": {
                "exact": "보안상 위험 인물",
                "neutral": "그 표현"
              },
              "mina": {
                "exact": "조민아",
                "neutral": "그 직원",
                "fullName": "조민아",
                "judgeRef": "민아 씨"
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
            "id": "workplace-02:b:d-1:unlock:s4:0",
            "factText": "조직 안정 명분 아래 제보 가능성과 유출 의심이 한 사람에게 겹쳐 씌워진 사실",
            "tags": [
              "emotion",
              "harm"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "scapegoat": {
                "exact": "'희생양'",
                "neutral": "그 표현"
              },
              "gyuwon": {
                "exact": "한규원",
                "neutral": "그 상사",
                "fullName": "한규원",
                "judgeRef": "규원 씨"
              },
              "mina": {
                "exact": "조민아",
                "neutral": "그 직원",
                "fullName": "조민아",
                "judgeRef": "민아 씨"
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
            "id": "workplace-02:b:d-1:unlock:s5:0",
            "factText": "확정 증거 없는 선제 지목과 접근 차단이 있었다는 사실",
            "tags": [
              "admission",
              "harm"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "mina": {
                "exact": "조민아",
                "neutral": "그 직원",
                "fullName": "조민아",
                "judgeRef": "민아 씨"
              },
              "team_notice": {
                "exact": "보안 리스크 인원 공지",
                "neutral": "그 공지"
              },
              "case52": {
                "exact": "공식 조사번호 생성 52분 전",
                "neutral": "그 시점",
                "period": "감사 직전"
              }
            },
            "stanceHints": [
              "confess",
              "hurt"
            ]
          }
        ]
      },
      "d-2": {
        "S2": [
          {
            "id": "workplace-02:b:d-2:unlock:s2:0",
            "factText": "익명 유출 정황이 돈 뒤 개인 드라이브에 감사 초안 일부를 올린 사실",
            "tags": [
              "timeline",
              "act"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "drive": {
                "exact": "개인 드라이브",
                "neutral": "그 저장공간"
              },
              "late_download": {
                "exact": "심야 다운로드 직후",
                "neutral": "그 시점",
                "period": "감사 직전"
              },
              "mina": {
                "exact": "조민아",
                "neutral": "그 직원",
                "fullName": "조민아",
                "judgeRef": "민아 씨"
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
            "id": "workplace-02:b:d-2:unlock:s3:0",
            "factText": "외부 상담 과정에서 일부 문장이 실제로 회사 밖으로 전송된 사실",
            "tags": [
              "privacy",
              "act"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "dm": {
                "exact": "전 직장 동료 DM",
                "neutral": "그 외부 대화"
              },
              "drive": {
                "exact": "개인 드라이브",
                "neutral": "그 저장공간"
              },
              "gyuwon": {
                "exact": "한규원",
                "neutral": "그 상사",
                "fullName": "한규원",
                "judgeRef": "규원 씨"
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
            "id": "workplace-02:b:d-2:unlock:s4:0",
            "factText": "희생양 공포가 자기방어성 무단 복사를 부른 사실",
            "tags": [
              "fear",
              "motive"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "scapegoat": {
                "exact": "'희생양'",
                "neutral": "그 표현"
              },
              "drive": {
                "exact": "개인 드라이브",
                "neutral": "그 저장공간"
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
            "id": "workplace-02:b:d-2:unlock:s5:0",
            "factText": "자기보호 목적이었어도 무단 복사와 외부상담이 실제로 있었다는 사실",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "drive": {
                "exact": "개인 드라이브",
                "neutral": "그 저장공간"
              },
              "dm": {
                "exact": "전 직장 동료 DM",
                "neutral": "그 외부 대화"
              },
              "mina": {
                "exact": "조민아",
                "neutral": "그 직원",
                "fullName": "조민아",
                "judgeRef": "민아 씨"
              }
            },
            "stanceHints": [
              "confess",
              "emotional"
            ]
          }
        ]
      },
      "d-3": {
        "S2": [
          {
            "id": "workplace-02:b:d-3:unlock:s2:0",
            "factText": "개인 보관 흔적보다 앞선 외부 경로가 존재할 수 있다는 사실",
            "tags": [
              "timeline",
              "evidence"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "old_link": {
                "exact": "회수되지 않은 공유링크",
                "neutral": "그 링크"
              },
              "two_hours_before": {
                "exact": "민아 업로드 2시간 전",
                "neutral": "그보다 앞선 시점",
                "period": "감사 직전"
              },
              "drive": {
                "exact": "개인 드라이브",
                "neutral": "그 저장공간"
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
            "id": "workplace-02:b:d-3:unlock:s3:0",
            "factText": "실제 핵심이 개인 악의보다 회수되지 않은 링크와 토큰 관리였다는 사실",
            "tags": [
              "evidence",
              "context"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "old_link": {
                "exact": "회수되지 않은 공유링크",
                "neutral": "그 링크"
              },
              "token": {
                "exact": "임시다운로드 토큰",
                "neutral": "그 토큰"
              },
              "gyuwon": {
                "exact": "한규원",
                "neutral": "그 상사",
                "fullName": "한규원",
                "judgeRef": "규원 씨"
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
            "id": "workplace-02:b:d-3:unlock:s4:0",
            "factText": "무고함과 별개로 상대 의도를 단정하며 서사를 키운 사실",
            "tags": [
              "emotion",
              "counter"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "gyuwon": {
                "exact": "한규원",
                "neutral": "그 상사",
                "fullName": "한규원",
                "judgeRef": "규원 씨"
              },
              "mina": {
                "exact": "조민아",
                "neutral": "그 직원",
                "fullName": "조민아",
                "judgeRef": "민아 씨"
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
            "id": "workplace-02:b:d-3:unlock:s5:0",
            "factText": "최초 원본 반출 경로가 제3자 재사용 경로였다는 사실",
            "tags": [
              "identity",
              "evidence"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "old_link": {
                "exact": "회수되지 않은 공유링크",
                "neutral": "그 링크"
              },
              "nojw": {
                "exact": "노지원",
                "neutral": "그 컨설턴트",
                "fullName": "노지원",
                "judgeRef": "노지원 씨"
              },
              "gyuwon": {
                "exact": "한규원",
                "neutral": "그 상사",
                "fullName": "한규원",
                "judgeRef": "규원 씨"
              }
            },
            "stanceHints": [
              "confess",
              "evidence_hit"
            ]
          }
        ]
      },
      "d-4": {
        "S2": [
          {
            "id": "workplace-02:b:d-4:unlock:s2:0",
            "factText": "면담 이전에 위험 인물 취지의 인사 기록이 먼저 입력된 사실",
            "tags": [
              "institution",
              "timeline"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "hr": {
                "exact": "HR 조사 접수 메모",
                "neutral": "그 메모"
              },
              "risk_note": {
                "exact": "보안상 위험 인물",
                "neutral": "그 표현"
              },
              "mina": {
                "exact": "조민아",
                "neutral": "그 직원",
                "fullName": "조민아",
                "judgeRef": "민아 씨"
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
            "id": "workplace-02:b:d-4:unlock:s3:0",
            "factText": "비용처리 이상 징후를 감사 후로 미루라는 지시가 함께 남은 사실",
            "tags": [
              "rule",
              "act"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "hr": {
                "exact": "HR 조사 접수 메모",
                "neutral": "그 메모"
              },
              "verbal_only": {
                "exact": "감사 끝날 때까지 구두 정리",
                "neutral": "그 지시"
              },
              "mina": {
                "exact": "조민아",
                "neutral": "그 직원",
                "fullName": "조민아",
                "judgeRef": "민아 씨"
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
            "id": "workplace-02:b:d-4:unlock:s4:0",
            "factText": "제보 시도가 유출 의심과 결합되며 침묵 압박이 생긴 사실",
            "tags": [
              "fear",
              "harm"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "scapegoat": {
                "exact": "'희생양'",
                "neutral": "그 표현"
              },
              "mina": {
                "exact": "조민아",
                "neutral": "그 직원",
                "fullName": "조민아",
                "judgeRef": "민아 씨"
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
            "id": "workplace-02:b:d-4:unlock:s5:0",
            "factText": "선행 낙인과 구두 정리 지시가 결합된 비공식 입막음 사실",
            "tags": [
              "admission",
              "harm"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "hr": {
                "exact": "HR 조사 접수 메모",
                "neutral": "그 메모"
              },
              "risk_note": {
                "exact": "보안상 위험 인물",
                "neutral": "그 표현"
              },
              "verbal_only": {
                "exact": "감사 끝날 때까지 구두 정리",
                "neutral": "그 지시"
              },
              "gyuwon": {
                "exact": "한규원",
                "neutral": "그 상사",
                "fullName": "한규원",
                "judgeRef": "규원 씨"
              }
            },
            "stanceHints": [
              "confess",
              "hurt"
            ]
          }
        ]
      },
      "d-5": {
        "S2": [
          {
            "id": "workplace-02:b:d-5:unlock:s2:0",
            "factText": "공식 보고 대신 비공식 대화방에서 자신을 희생양이라 부르며 여론전을 시작한 사실",
            "tags": [
              "act",
              "quote"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "group_chat": {
                "exact": "단톡 발언",
                "neutral": "그 말"
              },
              "scapegoat": {
                "exact": "'희생양'",
                "neutral": "그 표현"
              },
              "mina": {
                "exact": "조민아",
                "neutral": "그 직원",
                "fullName": "조민아",
                "judgeRef": "민아 씨"
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
            "id": "workplace-02:b:d-5:unlock:s3:0",
            "factText": "희생양 주장에 상사 비리 추론이 더해져 소문전이 확대된 사실",
            "tags": [
              "relationship",
              "counter"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "group_chat": {
                "exact": "단톡 발언",
                "neutral": "그 말"
              },
              "scapegoat": {
                "exact": "'희생양'",
                "neutral": "그 표현"
              },
              "gyuwon": {
                "exact": "한규원",
                "neutral": "그 상사",
                "fullName": "한규원",
                "judgeRef": "규원 씨"
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
            "id": "workplace-02:b:d-5:unlock:s4:0",
            "factText": "억울함이 커지며 로그 설명과 의도 추론이 섞여 단정이 빨라진 사실",
            "tags": [
              "emotion",
              "quote"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "group_chat": {
                "exact": "단톡 발언",
                "neutral": "그 말"
              },
              "mina": {
                "exact": "조민아",
                "neutral": "그 직원",
                "fullName": "조민아",
                "judgeRef": "민아 씨"
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
            "id": "workplace-02:b:d-5:unlock:s5:0",
            "factText": "자기보호 명분 아래 공식 조사 전 소문 확산에 가담한 사실",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "group_chat": {
                "exact": "단톡 발언",
                "neutral": "그 말"
              },
              "gyuwon": {
                "exact": "한규원",
                "neutral": "그 상사",
                "fullName": "한규원",
                "judgeRef": "규원 씨"
              },
              "mina": {
                "exact": "조민아",
                "neutral": "그 직원",
                "fullName": "조민아",
                "judgeRef": "민아 씨"
              }
            },
            "stanceHints": [
              "confess",
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
        "id": "workplace-02:contradiction:0",
        "targetParty": "a",
        "trigger": "A가 d-1을 표준 조치라고 반복한 뒤 e-1과 e-5가 함께 제시될 때",
        "text": "표준 조치였다면 왜 공식 조사번호보다 52분 먼저, 민아 한 사람만 차단됐습니까.",
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
        "id": "workplace-02:contradiction:1",
        "targetParty": "b",
        "trigger": "B가 d-2에서 외부 전송 자체를 부인한 뒤 e-2가 제시될 때",
        "text": "보호용 메모였다면 왜 일부 문장이 DM을 통해 회사 밖으로 넘어갔습니까.",
        "relatedDisputes": [
          "d-2",
          "d-5"
        ],
        "evidenceIds": [
          "e-2"
        ]
      },
      {
        "id": "workplace-02:contradiction:2",
        "targetParty": "a",
        "trigger": "A가 d-3에서 계속 민아를 실제 유출자로 지목한 뒤 e-3과 e-4가 제시될 때",
        "text": "민아 흔적보다 앞선 링크 접근과 노지원 전달선이 있는데도 왜 같은 결론을 유지합니까.",
        "relatedDisputes": [
          "d-3"
        ],
        "evidenceIds": [
          "e-3",
          "e-4"
        ]
      },
      {
        "id": "workplace-02:contradiction:3",
        "targetParty": "b",
        "trigger": "B가 d-3에서 규원의 고의만으로 모든 경로를 설명하려 할 때 e-3과 e-6이 제시될 때",
        "text": "제3자 반출 동선이 확인됐는데도 상대 의도만으로 전체 흐름을 덮을 수는 없습니다.",
        "relatedDisputes": [
          "d-3",
          "d-5"
        ],
        "evidenceIds": [
          "e-3",
          "e-6"
        ]
      }
    ],
    "interjections": [
      {
        "id": "workplace-02:interjection:0",
        "speaker": "a",
        "trigger": "B가 규원의 선행 낙인과 입막음을 연달아 지적할 때",
        "text": "그때 팀이 얼마나 흔들렸는지까지 같이 보셔야 합니다.",
        "relatedDisputes": [
          "d-1",
          "d-4"
        ]
      },
      {
        "id": "workplace-02:interjection:1",
        "speaker": "b",
        "trigger": "A가 개인 드라이브 업로드만으로 원본 유출을 단정하려 할 때",
        "text": "로그 순서부터 보시죠, 느낌 말고요.",
        "relatedDisputes": [
          "d-2",
          "d-3"
        ]
      },
      {
        "id": "workplace-02:interjection:2",
        "speaker": "judge",
        "trigger": "쌍방이 d-5 책임을 서로에게만 돌릴 때",
        "text": "공식 조사 전에 누가 먼저 여론을 움직였는지는 양쪽 모두 따져 보겠습니다.",
        "relatedDisputes": [
          "d-5"
        ]
      }
    ],
    "emotionalOutbursts": [
      {
        "id": "workplace-02:outburst:a:0",
        "party": "a",
        "trigger": "A가 d-4에서 경력 보전 동기를 직접 추궁받을 때",
        "text": "제가 라인을 지키려 했던 건 맞지만, 그게 다 악의였던 건 아닙니다.",
        "relatedDisputes": [
          "d-4"
        ]
      },
      {
        "id": "workplace-02:outburst:a:1",
        "party": "a",
        "trigger": "A가 d-3에서 실제 유출 경로가 제3자로 기울었음을 받아들여야 할 때",
        "text": "그래도 당시엔 누군가를 바로 세워야 한다고 생각했습니다.",
        "relatedDisputes": [
          "d-1",
          "d-3"
        ]
      },
      {
        "id": "workplace-02:outburst:b:0",
        "party": "b",
        "trigger": "B가 d-1과 d-4가 함께 제시되어 희생양 공포를 설명할 때",
        "text": "저는 제보자도 아니고 유출자도 아닌데 둘 다 된 사람처럼 취급받았습니다.",
        "relatedDisputes": [
          "d-1",
          "d-4"
        ]
      },
      {
        "id": "workplace-02:outburst:b:1",
        "party": "b",
        "trigger": "B가 d-5에서 단톡 발언 책임을 직접 추궁받을 때",
        "text": "살아남으려다 말이 커졌습니다. 그건 변명 못 합니다.",
        "relatedDisputes": [
          "d-5"
        ]
      }
    ]
  },
  "transitionBeats": [
    {
      "id": "workplace-02:transition:a:d-1:s0_s1",
      "caseId": "workplace-02",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "access_suspension_question",
      "line": "차단이라는 표현은 과합니다. 감사 직전에는 접근을 잠깐 묶는 선택도 검토해야 합니다.",
      "behaviorHint": "질문을 바로 받지 않고 호흡을 한 번 늦춘다."
    },
    {
      "id": "workplace-02:transition:a:d-1:s1_s2",
      "caseId": "workplace-02",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-1_presented",
      "line": "기록이 그렇게 남아 있다면, 공식 번호 전 조정 자체는 부인하지 않겠습니다. 다만 그땐 확산을 먼저 막아야 했습니다.",
      "behaviorHint": "서류를 힐끗 보고 시선을 내린다."
    },
    {
      "id": "workplace-02:transition:a:d-1:s2_s3",
      "caseId": "workplace-02",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "why_only_mina_question",
      "line": "왜 민아 씨였느냐고 물으시면, 당시엔 정황이 그 사람 쪽으로만 쌓여 보였다고 답할 수밖에 없습니다.",
      "behaviorHint": "손가락으로 근거를 세듯 나열한다."
    },
    {
      "id": "workplace-02:transition:a:d-1:s3_s5",
      "caseId": "workplace-02",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-5_or_responsibility_question",
      "line": "결국 제가 한 사람을 너무 빨리 확정했습니다. 책임을 피하긴 어렵습니다.",
      "behaviorHint": "어깨가 내려앉고 문장이 짧아진다."
    },
    {
      "id": "workplace-02:transition:a:d-4:s0_s1",
      "caseId": "workplace-02",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "whistleblower_channel_question",
      "line": "제보를 막은 게 아니라 경로를 늦춘 겁니다. 적어도 그땐 그렇게 생각했습니다.",
      "behaviorHint": "손바닥을 펴며 '진정' 제스처를 쓴다."
    },
    {
      "id": "workplace-02:transition:a:d-4:s1_s2",
      "caseId": "workplace-02",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-5_presented",
      "line": "원본 메모가 보이면 선행 입력은 인정해야죠. 다만 그 당시엔 유출 의심과 제보가 겹쳐 보였습니다.",
      "behaviorHint": "말끝을 흐리며 단어를 고쳐 말한다."
    },
    {
      "id": "workplace-02:transition:a:d-4:s2_s4",
      "caseId": "workplace-02",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S2",
      "toState": "S4",
      "trigger": "nonpunitive_question_about_audit_pressure",
      "line": "보복이 아니라 관리라고 믿고 싶었습니다. 하지만 감사 압박이 저를 그쪽으로 밀었습니다.",
      "behaviorHint": "턱을 쓸며 한숨을 삼킨다."
    },
    {
      "id": "workplace-02:transition:a:d-4:s4_s5",
      "caseId": "workplace-02",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S4",
      "toState": "S5",
      "trigger": "retaliation_or_responsibility_question",
      "line": "네, 결과적으로는 입막음이었습니다. 제가 먼저 눌러 버렸습니다.",
      "behaviorHint": "시선을 피하지 못하고 짧게 인정한다."
    },
    {
      "id": "workplace-02:transition:a:d-5:s0_s1",
      "caseId": "workplace-02",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "rumor_spread_question",
      "line": "소문이라고 단정하긴 이릅니다. 저는 팀 불안을 관리하려 했을 뿐입니다.",
      "behaviorHint": "고개를 살짝 젓고 말끝을 올린다."
    },
    {
      "id": "workplace-02:transition:a:d-5:s1_s2",
      "caseId": "workplace-02",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "team_notice_followup",
      "line": "공지와 제 말이 겹치면 민아 씨를 떠올릴 수 있었다는 건 인정합니다.",
      "behaviorHint": "짧게 눈을 감았다 뜬다."
    },
    {
      "id": "workplace-02:transition:a:d-5:s2_s3",
      "caseId": "workplace-02",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "specific_phrase_question",
      "line": "그 표현이 과했더라도 저만 한 건 아닙니다. 민아 씨 쪽도 단톡에서 맞불을 놨습니다.",
      "behaviorHint": "양손을 벌려 쌍방 책임을 강조한다."
    },
    {
      "id": "workplace-02:transition:a:d-5:s3_s5",
      "caseId": "workplace-02",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "shared_responsibility_question",
      "line": "공식 조사 전에 저도 분위기를 만들려 했습니다. 그 점은 책임지겠습니다.",
      "behaviorHint": "입술을 굳힌 채 낮게 마무리한다."
    },
    {
      "id": "workplace-02:transition:b:d-2:s0_s1",
      "caseId": "workplace-02",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "personal_drive_question",
      "line": "정확히 말하면 원본 전체를 옮긴 건 아닙니다. 제 보호용으로 일부를 따로 둔 겁니다.",
      "behaviorHint": "짧게 멈춘 뒤 단어를 정교하게 고른다."
    },
    {
      "id": "workplace-02:transition:b:d-2:s1_s2",
      "caseId": "workplace-02",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-2_presented",
      "line": "기록이 있으면 업로드 자체는 부정하지 않겠습니다. 다만 그 시점과 이유는 분리해서 봐야 합니다.",
      "behaviorHint": "시각과 범위를 먼저 짚으며 말한다."
    },
    {
      "id": "workplace-02:transition:b:d-2:s2_s3",
      "caseId": "workplace-02",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "outside_contact_question",
      "line": "외부 상담도 있었습니다. 그때는 내부에서 저를 보호해 줄 채널이 없다고 느꼈습니다.",
      "behaviorHint": "입을 다문 채 몇 초 쉬었다가 길게 답한다."
    },
    {
      "id": "workplace-02:transition:b:d-2:s3_s5",
      "caseId": "workplace-02",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "data_scope_question",
      "line": "보낸 범위를 좁혀 말하려 했지만, 무단 복사와 외부상담 자체는 인정합니다.",
      "behaviorHint": "어깨를 굳힌 채 결론만 또렷이 말한다."
    },
    {
      "id": "workplace-02:transition:b:d-3:s0_s1",
      "caseId": "workplace-02",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "direct_framing_claim",
      "line": "저를 범인으로 직접 박아 두셨다면, 적어도 시점부터 다시 보셔야 합니다.",
      "behaviorHint": "표정을 굳히고 짧은 문장으로 자른다."
    },
    {
      "id": "workplace-02:transition:b:d-3:s1_s2",
      "caseId": "workplace-02",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-4_presented",
      "line": "그 캡처가 맞다면 제 바깥에 살아 있던 링크가 있었다는 뜻입니다. 흐름이 달라집니다.",
      "behaviorHint": "눈을 한 번 감고 다시 조목조목 말하기 시작한다."
    },
    {
      "id": "workplace-02:transition:b:d-3:s2_s3",
      "caseId": "workplace-02",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "link_timeline_question",
      "line": "핵심은 개인 악의보다 링크와 토큰 관리였습니다. 저도 그 부분을 늦게 봤습니다.",
      "behaviorHint": "로그 순서를 손으로 그리듯 설명한다."
    },
    {
      "id": "workplace-02:transition:b:d-3:s3_s5",
      "caseId": "workplace-02",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-3_or_e-6_presented",
      "line": "이제는 분명합니다. 최초 원본 반출은 제가 아니었고, 제가 과장한 부분만 남습니다.",
      "behaviorHint": "문장을 짧게 끊어 결론부터 말한다."
    },
    {
      "id": "workplace-02:transition:b:d-5:s0_s1",
      "caseId": "workplace-02",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "group_chat_question",
      "line": "하소연은 했습니다. 하지만 이미 먼저 제 이름이 돌고 있었다는 점도 같이 보셔야 합니다.",
      "behaviorHint": "입술을 깨물었다가 차갑게 정리한다."
    },
    {
      "id": "workplace-02:transition:b:d-5:s1_s2",
      "caseId": "workplace-02",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "small_admission_about_fear",
      "line": "맞습니다, 무서웠습니다. 그래서 단톡이 공식 채널보다 빠르다고 착각했습니다.",
      "behaviorHint": "손을 움켜쥔 채 시선을 고정한다."
    },
    {
      "id": "workplace-02:transition:b:d-5:s2_s3",
      "caseId": "workplace-02",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "formal_reporting_question",
      "line": "정식 보고를 믿지 못했고, 그래서 말이 더 밖으로 번졌습니다.",
      "behaviorHint": "잠깐 멈춘 뒤 마지막 단어를 낮게 떨어뜨린다."
    },
    {
      "id": "workplace-02:transition:b:d-5:s3_s5",
      "caseId": "workplace-02",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "responsibility_question",
      "line": "결국 저도 소문전에 가담했습니다. 살아남으려는 마음이 책임을 가리지는 못합니다.",
      "behaviorHint": "변명 없이 고개를 끄덕인다."
    }
  ]
}

