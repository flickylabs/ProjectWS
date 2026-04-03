export const workplace03V3GameLoopData = {
  "caseId": "workplace-03",
  "dossierCards": [
    {
      "id": "dossier-1",
      "name": "잘린 장면과 첫 전파",
      "description": "잘린 회식 클립과 다음 날 DM 전파를 함께 묶어, 최초 해석과 전파 책임을 가른다.",
      "evidenceIds": [
        "e-1",
        "e-2"
      ],
      "relatedDisputes": [
        "d-1",
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
              "text": "강도윤 씨, 이 19초 클립에서 직접 나온 '라인 타고 들어온 HJ' 표현 자체는 부인하십니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "workplace-03:a:d-1:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q2",
              "text": "공식 정정 전 팀 회의에서 '팀 명예'를 꺼낸 말이 희주 씨를 떠올리게 한 건 아니었습니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "workplace-03:a:d-5:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q3",
              "text": "잘린 영상만 탓하시기 전에, 그 표현이 내부 인원을 떠올리게 할 위험을 왜 바로 정정하지 않으셨습니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "workplace-03:a:d-1:unlock:s3:0",
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
              "text": "최희주 씨, 오전 7시 42분부터 이어진 DM 전송을 보면 이미 단정 문장이 들어가 있는데도 확인 단계였다고 하시겠습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "workplace-03:b:d-2:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q2",
              "text": "최희주 씨, 정식 정정보다 먼저 멘토방과 동료 둘에게 해석을 공유한 건 소문전이 아니라고 보십니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "workplace-03:b:d-5:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q3",
              "text": "최희주 씨, 19초 자동 하이라이트만으로 HJ가 자기 자신이라고 확신한 근거가 무엇이었습니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "workplace-03:b:d-3:unlock:s2:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-2",
      "name": "약어의 실제 대상과 암시 효과",
      "description": "약어 메모와 좌석 맥락을 붙여, 누가 누구를 어떻게 잘못 읽었는지와 암시의 파장을 검증한다.",
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
              "text": "강도윤 씨, 회식 직전 대화가 외부 후보 한재균 이야기였다는 걸 알고도 왜 내부 인원을 떠올리게 하는 표현을 쓰셨습니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "workplace-03:a:d-1:unlock:s4:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q2",
              "text": "강도윤 씨, 직접 희주 씨를 지목하지 않았더라도 관리자 위치에서 위험한 평판 발언이었다는 점은 인정하십니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "workplace-03:a:d-1:unlock:s5:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q3",
              "text": "강도윤 씨, 이름을 말하지 않았다는 이유로 팀 회의 암시 발언의 파장을 가볍게 보신 건 아닙니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "workplace-03:a:d-5:unlock:s3:0",
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
              "text": "최희주 씨, 이 공유노트의 HJ 메모를 보면 외부 후보 한재균인데도 왜 직접 겨냥이라고 계속 단정하셨습니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "workplace-03:b:d-3:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q2",
              "text": "최희주 씨, 당시 같은 테이블에 없었고 실시간으로 듣지도 못했는데 어떻게 의도까지 확정하셨습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "workplace-03:b:d-3:unlock:s4:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q3",
              "text": "최희주 씨, 확인 요청이 아니라 '공개 비하' 서사로 주변에 고정시킨 건 맞지 않습니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "workplace-03:b:d-5:unlock:s3:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-3",
      "name": "선제 조치와 원본 복원",
      "description": "HR 조치 기록과 원본 메타데이터를 묶어, 선제 불이익과 잘린 맥락 복원을 동시에 압박한다.",
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
              "text": "강도윤 씨, 희주 씨 면담 전날 밤 HR에 '평판 리스크' 메모를 먼저 입력하신 사실은 인정하십니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "workplace-03:a:d-4:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q2",
              "text": "강도윤 씨, 관리자 평판이 무너질까 두려워 확인보다 통제를 먼저 택하신 건 아닙니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "workplace-03:a:d-4:unlock:s4:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q3",
              "text": "강도윤 씨, 해명도 듣기 전에 메모와 발표 배제를 진행해 평판 불이익을 키운 책임은 인정하시겠습니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "workplace-03:a:d-4:unlock:s5:0",
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
              "text": "최희주 씨, 원본 메타데이터까지 보면 잘린 앞 8초에 외부 후보 HJ 맥락이 있는데도 직접 겨냥이라고 계속 보시겠습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "workplace-03:b:d-3:unlock:s5:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q2",
              "text": "최희주 씨, 뒤로 갈수록 '내 얘기 맞다'로 강도가 올라간 DM 흐름을 보면 단순 확인이었다고만 볼 수 있습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "workplace-03:b:d-2:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q3",
              "text": "최희주 씨, 억울함이 있었더라도 공식 확인 전에 단정 메시지로 소문전에 가담한 책임은 인정하십니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "workplace-03:b:d-5:unlock:s5:0",
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
            "id": "workplace-03:a:d-1:unlock:s2:0",
            "factText": "도윤은 19초 클립 구간에서 실제로 '라인 타고 들어온 HJ'라는 표현을 사용했다.",
            "tags": [
              "quote",
              "act"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "phrase": {
                "exact": "라인 타고 들어온 HJ",
                "neutral": "그 표현"
              },
              "moment": {
                "exact": "회식 2차 19초 클립 구간",
                "neutral": "그 구간",
                "period": "그날 늦은 술자리"
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
            "id": "workplace-03:a:d-1:unlock:s3:0",
            "factText": "도윤은 발언 직전 대화가 외부 후보 한재균 이야기였다는 점을 알면서도, 내부 인원을 떠올리게 하는 위험성을 바로 정정하지 않았다.",
            "tags": [
              "context",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "exact": "한재균",
                "neutral": "다른 HJ",
                "fullName": "한재균",
                "judgeRef": "외부 후보"
              },
              "phrase": {
                "exact": "내부 인원을 떠올리게 하는 표현",
                "neutral": "그 표현"
              },
              "moment": {
                "exact": "클립 시작 직전 8초",
                "neutral": "그 앞부분",
                "period": "발언 직전"
              }
            },
            "stanceHints": [
              "blame",
              "evidence_present"
            ]
          }
        ],
        "S4": [
          {
            "id": "workplace-03:a:d-1:unlock:s4:0",
            "factText": "도윤은 자신의 말이 희주를 직접 지목한 것은 아니어도 관리자 평판 발언으로 들릴 만큼 위험했다는 점을 감정적으로 인식한다.",
            "tags": [
              "emotion",
              "harm"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "exact": "최희주",
                "neutral": "그 팀원",
                "fullName": "최희주",
                "judgeRef": "희주 씨"
              },
              "risk": {
                "exact": "관리자 평판 발언",
                "neutral": "그 위험한 말"
              },
              "moment": {
                "exact": "회식 다음 날 해명 국면",
                "neutral": "그 뒤 상황",
                "period": "다음 날"
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
            "id": "workplace-03:a:d-1:unlock:s5:0",
            "factText": "도윤은 직접 겨냥 의도는 아니었더라도, 특정인을 연상시키는 회식 발언으로 상처와 소문을 만든 책임을 인정한다.",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "exact": "최희주",
                "neutral": "상대방",
                "fullName": "최희주",
                "judgeRef": "희주 씨"
              },
              "phrase": {
                "exact": "특정인을 연상시키는 회식 발언",
                "neutral": "그 발언"
              },
              "harm": {
                "exact": "상처와 소문",
                "neutral": "그 피해"
              }
            },
            "stanceHints": [
              "confession",
              "emotional"
            ]
          }
        ]
      },
      "d-4": {
        "S2": [
          {
            "id": "workplace-03:a:d-4:unlock:s2:0",
            "factText": "도윤은 희주의 면담 전날 밤 HR 화면에 '평판 리스크가 큰 인원'이라는 비공식 메모를 먼저 남겼다.",
            "tags": [
              "evidence",
              "act"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "institution": {
                "exact": "HR 비공식 메모",
                "neutral": "그 메모"
              },
              "phrase": {
                "exact": "평판 리스크가 큰 인원",
                "neutral": "그 표현"
              },
              "moment": {
                "exact": "희주 면담 전날 밤",
                "neutral": "그 전날",
                "period": "면담 전"
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
            "id": "workplace-03:a:d-4:unlock:s3:0",
            "factText": "도윤의 메모는 공식 징계는 아니었지만, 다음 날 발표 리허설 배정 변경과 붙어 사실상 선제 불이익처럼 작동했다.",
            "tags": [
              "rule",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "institution": {
                "exact": "발표 리허설 배정 변경",
                "neutral": "그 배정 변경"
              },
              "moment": {
                "exact": "다음 날 오전",
                "neutral": "그 다음 시점",
                "period": "다음 날"
              },
              "effect": {
                "exact": "사실상 선제 불이익",
                "neutral": "그 불이익"
              }
            },
            "stanceHints": [
              "blame",
              "evidence_present"
            ]
          }
        ],
        "S4": [
          {
            "id": "workplace-03:a:d-4:unlock:s4:0",
            "factText": "도윤은 관리자 평판이 무너질까 두려워 사실확인보다 먼저 통제 조치를 택했다는 심리 동기를 드러낸다.",
            "tags": [
              "fear",
              "motive"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "fear": {
                "exact": "관리자 평판 상실",
                "neutral": "그 두려움"
              },
              "institution": {
                "exact": "통제 조치",
                "neutral": "그 선제 조치"
              },
              "person": {
                "exact": "최희주",
                "neutral": "그 팀원",
                "fullName": "최희주",
                "judgeRef": "희주 씨"
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
            "id": "workplace-03:a:d-4:unlock:s5:0",
            "factText": "도윤은 희주의 설명을 듣기 전에 HR 메모와 발표 배제를 진행해 평판 불이익을 키운 책임을 인정한다.",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "institution": {
                "exact": "HR 메모와 발표 배제",
                "neutral": "그 선제 조치"
              },
              "person": {
                "exact": "최희주",
                "neutral": "상대방",
                "fullName": "최희주",
                "judgeRef": "희주 씨"
              },
              "harm": {
                "exact": "평판 불이익",
                "neutral": "그 피해"
              }
            },
            "stanceHints": [
              "confession",
              "emotional"
            ]
          }
        ]
      },
      "d-5": {
        "S2": [
          {
            "id": "workplace-03:a:d-5:unlock:s2:0",
            "factText": "도윤은 정식 정정 전 팀 회의에서 '어제 일로 팀 명예가 흔들렸다'는 표현으로 특정인을 떠올리게 했다.",
            "tags": [
              "quote",
              "act"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "phrase": {
                "exact": "어제 일로 팀 명예가 흔들렸다",
                "neutral": "그 팀 명예 발언"
              },
              "moment": {
                "exact": "정식 정정 전 팀 회의",
                "neutral": "그 회의",
                "period": "정정 전"
              },
              "person": {
                "exact": "최희주",
                "neutral": "특정 팀원",
                "fullName": "최희주",
                "judgeRef": "희주 씨"
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
            "id": "workplace-03:a:d-5:unlock:s3:0",
            "factText": "도윤의 암시성 발언은 이름을 직접 말하지 않았어도 희주를 의심 대상으로 고정하는 데 기여했다.",
            "tags": [
              "context",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "exact": "최희주",
                "neutral": "상대방",
                "fullName": "최희주",
                "judgeRef": "희주 씨"
              },
              "phrase": {
                "exact": "암시성 발언",
                "neutral": "그 말"
              },
              "harm": {
                "exact": "의심 대상 고정",
                "neutral": "그 효과"
              }
            },
            "stanceHints": [
              "blame",
              "evidence_present"
            ]
          }
        ],
        "S4": [
          {
            "id": "workplace-03:a:d-5:unlock:s4:0",
            "factText": "도윤은 자신이 먼저 상처받았다는 프레임으로 소문 책임을 희석하려 했다는 정서적 방어를 드러낸다.",
            "tags": [
              "emotion",
              "self_justification"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "emotion": {
                "exact": "제가 더 상처받았습니다",
                "neutral": "그 피해자 프레임"
              },
              "harm": {
                "exact": "소문 책임 희석",
                "neutral": "그 방어"
              },
              "moment": {
                "exact": "정정 전 대응",
                "neutral": "그 대응",
                "period": "정정 전"
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
            "id": "workplace-03:a:d-5:unlock:s5:0",
            "factText": "도윤은 공식 확인 전에 암시성 발언으로 소문전에 가담했고, 팀장으로서 그 책임을 절반 이상 져야 한다고 인정한다.",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "institution": {
                "exact": "팀장 위치",
                "neutral": "그 자리"
              },
              "moment": {
                "exact": "공식 확인 전",
                "neutral": "그 전 단계",
                "period": "정정 전"
              },
              "harm": {
                "exact": "소문전 가담",
                "neutral": "그 참여"
              }
            },
            "stanceHints": [
              "confession",
              "emotional"
            ]
          }
        ]
      }
    },
    "b": {
      "d-2": {
        "S2": [
          {
            "id": "workplace-03:b:d-2:unlock:s2:0",
            "factText": "희주는 회식 다음 날 오전 7시 42분부터 18분 사이 멘토방과 동료 둘에게 단정 메시지를 연속 전송했다.",
            "tags": [
              "timeline",
              "act"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "moment": {
                "exact": "오전 7시 42분부터 18분 사이",
                "neutral": "그 시간대",
                "dateExact": "회식 다음 날 오전"
              },
              "channel": {
                "exact": "멘토방과 동료 둘",
                "neutral": "몇몇 수신자"
              },
              "phrase": {
                "exact": "팀장이 내 채용 배경을 씹었다",
                "neutral": "그 단정 문장"
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
            "id": "workplace-03:b:d-2:unlock:s3:0",
            "factText": "희주의 메시지는 처음엔 확인성 질문처럼 시작했지만 뒤로 갈수록 '내 얘기 맞다'는 단정으로 강도가 올라갔다.",
            "tags": [
              "context",
              "threshold"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "phrase": {
                "exact": "내 얘기 맞다",
                "neutral": "그 단정 표현"
              },
              "channel": {
                "exact": "연속 DM",
                "neutral": "그 메시지 흐름"
              },
              "moment": {
                "exact": "같은 오전 대화 후반",
                "neutral": "그 후반부",
                "period": "전송 후반"
              }
            },
            "stanceHints": [
              "blame",
              "evidence_present"
            ]
          }
        ],
        "S4": [
          {
            "id": "workplace-03:b:d-2:unlock:s4:0",
            "factText": "희주는 억울함과 창피함이 커질수록 '확인'과 '전파'의 경계를 스스로 좁혀 해석했다.",
            "tags": [
              "shame",
              "motive"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "emotion": {
                "exact": "억울함과 창피함",
                "neutral": "그 감정"
              },
              "channel": {
                "exact": "확인과 전파의 경계",
                "neutral": "그 선"
              },
              "person": {
                "exact": "강도윤",
                "neutral": "상대방",
                "fullName": "강도윤",
                "judgeRef": "강도윤 씨"
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
            "id": "workplace-03:b:d-2:unlock:s5:0",
            "factText": "희주는 사적 조언을 구한다는 말로 범위를 좁혔지만, 실제로는 팀장 비방 단정 메시지를 퍼뜨린 책임을 인정한다.",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "channel": {
                "exact": "사적 조언 명목의 전송",
                "neutral": "그 명목"
              },
              "phrase": {
                "exact": "팀장 비방 단정 메시지",
                "neutral": "그 메시지"
              },
              "person": {
                "exact": "강도윤",
                "neutral": "상대방",
                "fullName": "강도윤",
                "judgeRef": "강도윤 씨"
              }
            },
            "stanceHints": [
              "confession",
              "emotional"
            ]
          }
        ]
      },
      "d-3": {
        "S2": [
          {
            "id": "workplace-03:b:d-3:unlock:s2:0",
            "factText": "희주는 19초 자동 하이라이트와 최근 전배 맥락만으로 HJ가 자신을 가리킨다고 확신했다.",
            "tags": [
              "identity",
              "context"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "phrase": {
                "exact": "19초 자동 하이라이트",
                "neutral": "그 짧은 클립"
              },
              "person": {
                "exact": "최희주",
                "neutral": "자기 자신",
                "fullName": "최희주",
                "judgeRef": "희주 씨"
              },
              "moment": {
                "exact": "회식 다음 날 아침",
                "neutral": "그 직후",
                "period": "다음 날"
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
            "id": "workplace-03:b:d-3:unlock:s3:0",
            "factText": "공유노트 초안에는 HJ가 외부 연계 후보 한재균을 뜻한다는 메모가 이미 회식 전부터 남아 있었다.",
            "tags": [
              "evidence",
              "identity"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "exact": "한재균",
                "neutral": "다른 HJ",
                "fullName": "한재균",
                "judgeRef": "외부 후보"
              },
              "institution": {
                "exact": "인력배치 공유노트 초안",
                "neutral": "그 노트"
              },
              "phrase": {
                "exact": "Han Jae-gyun/partner shortlist",
                "neutral": "그 약어 메모"
              }
            },
            "stanceHints": [
              "blame",
              "evidence_present"
            ]
          }
        ],
        "S4": [
          {
            "id": "workplace-03:b:d-3:unlock:s4:0",
            "factText": "희주는 문제 발언이 나온 순간 같은 테이블에 없어서 실시간 청취가 아니라 잘린 영상으로만 상황을 이해했다.",
            "tags": [
              "timeline",
              "uncertainty"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "moment": {
                "exact": "다른 테이블",
                "neutral": "그 자리 밖",
                "period": "발언 당시"
              },
              "phrase": {
                "exact": "실시간 청취 부재",
                "neutral": "직접 듣지 못한 상태"
              },
              "person": {
                "exact": "최희주",
                "neutral": "당사자",
                "fullName": "최희주",
                "judgeRef": "희주 씨"
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
            "id": "workplace-03:b:d-3:unlock:s5:0",
            "factText": "희주는 HJ가 자신이 아니라 한재균이었다는 원본 맥락을 받아들이고, 직접 겨냥 명예훼손이라고 단정한 책임을 인정한다.",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "exact": "한재균",
                "neutral": "다른 HJ",
                "fullName": "한재균",
                "judgeRef": "외부 후보"
              },
              "phrase": {
                "exact": "직접 겨냥 명예훼손 단정",
                "neutral": "그 단정"
              },
              "harm": {
                "exact": "오해 확산",
                "neutral": "그 파장"
              }
            },
            "stanceHints": [
              "confession",
              "emotional"
            ]
          }
        ]
      },
      "d-5": {
        "S2": [
          {
            "id": "workplace-03:b:d-5:unlock:s2:0",
            "factText": "희주는 정식 정정 전에 멘토방과 동료 둘에게 자신의 해석을 공유하며 비공식 평판전에 들어갔다.",
            "tags": [
              "act",
              "relationship"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "channel": {
                "exact": "멘토방과 동료 둘",
                "neutral": "주변 사람들"
              },
              "moment": {
                "exact": "정식 정정 전",
                "neutral": "그 전 단계",
                "period": "정정 전"
              },
              "phrase": {
                "exact": "자신의 해석 공유",
                "neutral": "그 메시지"
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
            "id": "workplace-03:b:d-5:unlock:s3:0",
            "factText": "희주의 전달은 확인 요청을 넘어 '팀장이 나를 공개 비하했다'는 서사를 주변에 고정시키는 효과를 냈다.",
            "tags": [
              "harm",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "phrase": {
                "exact": "팀장이 나를 공개 비하했다",
                "neutral": "그 서사"
              },
              "channel": {
                "exact": "주변 전파 효과",
                "neutral": "그 확산"
              },
              "person": {
                "exact": "강도윤",
                "neutral": "상대방",
                "fullName": "강도윤",
                "judgeRef": "강도윤 씨"
              }
            },
            "stanceHints": [
              "blame",
              "evidence_present"
            ]
          }
        ],
        "S4": [
          {
            "id": "workplace-03:b:d-5:unlock:s4:0",
            "factText": "희주는 창피함과 입지 상실 공포 때문에 정식 창구보다 먼저 가까운 사람들에게 의지했다.",
            "tags": [
              "fear",
              "motive"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "emotion": {
                "exact": "창피함과 입지 상실 공포",
                "neutral": "그 불안"
              },
              "channel": {
                "exact": "가까운 사람들",
                "neutral": "주변 인맥"
              },
              "institution": {
                "exact": "정식 창구보다 먼저",
                "neutral": "그 순서"
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
            "id": "workplace-03:b:d-5:unlock:s5:0",
            "factText": "희주는 공식 확인 전에 단정 메시지로 소문전에 가담했고, 억울함이 있어도 그 선택은 자신의 잘못이라고 인정한다.",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "phrase": {
                "exact": "단정 메시지",
                "neutral": "그 메시지"
              },
              "moment": {
                "exact": "공식 확인 전",
                "neutral": "그 전 단계",
                "period": "정정 전"
              },
              "harm": {
                "exact": "소문전 가담",
                "neutral": "그 참여"
              }
            },
            "stanceHints": [
              "confession",
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
        "id": "workplace-03:contradiction:0",
        "targetParty": "a",
        "trigger": "강도윤이 d-1을 전면 부인한 직후 e-1 또는 e-4가 제시될 때",
        "text": "방금 전까지는 없었다고 하셨는데, 클립과 좌석 기록에는 HJ 표현과 그 직전 맥락이 함께 남아 있습니다.",
        "relatedDisputes": [
          "d-1",
          "d-3"
        ],
        "evidenceIds": [
          "e-1",
          "e-4"
        ]
      },
      {
        "id": "workplace-03:contradiction:1",
        "targetParty": "b",
        "trigger": "최희주가 d-2를 '확인성 질문'으로만 축소할 때",
        "text": "확인이라기에는 수신 범위와 후반 문장 강도가 이미 단정 쪽으로 넘어가 있습니다.",
        "relatedDisputes": [
          "d-2",
          "d-5"
        ],
        "evidenceIds": [
          "e-2"
        ]
      },
      {
        "id": "workplace-03:contradiction:2",
        "targetParty": "a",
        "trigger": "강도윤이 d-4를 단순 운영 조정이라고 주장할 때",
        "text": "운영 조정이라기에는 면담 전 메모와 발표 배정 변경의 순서가 너무 선행돼 있습니다.",
        "relatedDisputes": [
          "d-4"
        ],
        "evidenceIds": [
          "e-5"
        ]
      },
      {
        "id": "workplace-03:contradiction:3",
        "targetParty": "b",
        "trigger": "최희주가 d-3에서 직접 겨냥 주장을 끝까지 유지할 때",
        "text": "공유노트의 HJ 표기와 원본 로그를 합치면, 직접 겨냥이라는 결론은 더 이상 유지되기 어렵습니다.",
        "relatedDisputes": [
          "d-3"
        ],
        "evidenceIds": [
          "e-3",
          "e-6"
        ]
      }
    ],
    "interjections": [
      {
        "id": "workplace-03:interjection:0",
        "speaker": "a",
        "trigger": "최희주가 d-3에서 고의적 명예훼손을 반복 단정할 때",
        "text": "저를 바로 사람 깎아내리는 상사로 몰아가면, 저는 어디서 설명해야 합니까.",
        "relatedDisputes": [
          "d-1",
          "d-3"
        ]
      },
      {
        "id": "workplace-03:interjection:1",
        "speaker": "b",
        "trigger": "강도윤이 d-4를 운영 조정이라고 계속 축소할 때",
        "text": "설명도 듣기 전에 빼 놓고 운영이라고 하시면, 저는 뭘 믿어야 합니까.",
        "relatedDisputes": [
          "d-4"
        ]
      },
      {
        "id": "workplace-03:interjection:2",
        "speaker": "judge",
        "trigger": "양측이 d-5에서 상대 책임만 반복하며 버틸 때",
        "text": "두 분 다 상대 탓으로만 버티지 말고, 정정 전에 자신이 먼저 한 행동부터 말씀하십시오.",
        "relatedDisputes": [
          "d-5"
        ]
      }
    ],
    "emotionalOutbursts": [
      {
        "id": "workplace-03:outburst:a:0",
        "party": "a",
        "trigger": "강도윤이 d-1과 d-4에서 동시에 몰릴 때",
        "text": "제가 무슨 괴물입니까, 실수 하나로 사람을 그렇게 단정하시면 안 되잖아요.",
        "relatedDisputes": [
          "d-1",
          "d-4"
        ]
      },
      {
        "id": "workplace-03:outburst:a:1",
        "party": "a",
        "trigger": "강도윤이 d-5 소문전 책임을 정면으로 추궁받을 때",
        "text": "저도 이미 충분히 상처받았습니다. 팀장이라는 이유로 제가 한 말만 남는 게 너무 억울합니다.",
        "relatedDisputes": [
          "d-5"
        ]
      },
      {
        "id": "workplace-03:outburst:b:0",
        "party": "b",
        "trigger": "최희주가 d-3 오인 가능성을 받아들이기 직전",
        "text": "그 말이 제 얘기처럼 들릴 수밖에 없었다는 걸 아무도 안 보셨잖아요.",
        "relatedDisputes": [
          "d-1",
          "d-3"
        ]
      },
      {
        "id": "workplace-03:outburst:b:1",
        "party": "b",
        "trigger": "최희주가 d-2와 d-5 전파 책임을 함께 지적받을 때",
        "text": "제가 무서워서 사람들에게 먼저 물은 게 왜 전부 악의가 돼야 합니까.",
        "relatedDisputes": [
          "d-2",
          "d-5"
        ]
      }
    ]
  },
  "transitionBeats": [
    {
      "id": "workplace-03:transition:a:d-1:s0_s1",
      "caseId": "workplace-03",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "dinner_comment_question",
      "line": "제가 더 상처받았습니다만, 그날 회식 분위기에서 나온 말을 전부 악의로 보실 필요는 없다고 생각합니다.",
      "behaviorHint": "초반에는 억울함을 강조하며 손을 펴 보인다."
    },
    {
      "id": "workplace-03:transition:a:d-1:s1_s2",
      "caseId": "workplace-03",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-1_presented",
      "line": "그 클립이 나오면 HJ라는 표현을 제가 쓴 건 부인하지 않겠습니다. 다만 누구를 지목했는지는 그 영상만으로 단정하기 어렵습니다.",
      "behaviorHint": "헛웃음을 지우고 자세를 바로잡는다."
    },
    {
      "id": "workplace-03:transition:a:d-1:s2_s3",
      "caseId": "workplace-03",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "who_hj_question",
      "line": "그 질문을 받으니 더 숨길 수는 없네요. 표현은 제 실수였지만 희주 씨 쪽도 잘린 영상으로 너무 빨리 결론 냈습니다.",
      "behaviorHint": "잠깐 침묵한 뒤 상대를 한 번 보고 시선을 거둔다."
    },
    {
      "id": "workplace-03:transition:a:d-1:s3_s5",
      "caseId": "workplace-03",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-4_or_responsibility_question",
      "line": "좌석과 직전 대화까지 확인되면 제가 위험한 발언을 했다는 책임을 인정하겠습니다. 제 잘못입니다.",
      "behaviorHint": "어깨가 내려앉고 고개를 천천히 끄덕인다."
    },
    {
      "id": "workplace-03:transition:a:d-4:s0_s1",
      "caseId": "workplace-03",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "hr_note_question",
      "line": "HR에 상황을 말한 건 맞아도 징계처럼 하려던 건 아니었습니다. 저는 단지 상황이 더 번질까 봐 겁이 났습니다.",
      "behaviorHint": "손가락을 모아 쥐고 변명하듯 속도를 늦춘다."
    },
    {
      "id": "workplace-03:transition:a:d-4:s1_s2",
      "caseId": "workplace-03",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-5_presented",
      "line": "그 기록이 맞다면 제가 '평판 리스크'라는 표현을 먼저 쓴 건 인정하겠습니다. 다만 바로 배제로 이어질 줄은 생각 못 했습니다.",
      "behaviorHint": "입술을 한 번 깨물고 재판관을 본다."
    },
    {
      "id": "workplace-03:transition:a:d-4:s2_s4",
      "caseId": "workplace-03",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S2",
      "toState": "S4",
      "trigger": "nonjudgmental_question_about_reputation_damage",
      "line": "관리자 평판이 무너질까 두려워 제가 과민하게 움직였습니다. 그게 희주 씨에게 낙인처럼 갔다는 말은 이제 이해됩니다.",
      "behaviorHint": "시선이 흔들리며 목소리가 낮아진다."
    },
    {
      "id": "workplace-03:transition:a:d-4:s4_s5",
      "caseId": "workplace-03",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S4",
      "toState": "S5",
      "trigger": "rehearsal_exclusion_or_responsibility_question",
      "line": "희주 씨 발표를 빼고 HR 메모를 남긴 건 제 선제 조치였습니다. 변명하더라도 책임은 제게 있습니다.",
      "behaviorHint": "깊게 숨을 들이쉰 뒤 또렷하게 인정한다."
    },
    {
      "id": "workplace-03:transition:a:d-5:s0_s1",
      "caseId": "workplace-03",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "rumor_management_question",
      "line": "저는 팀 명예를 지키려던 거라고 생각했습니다. 다만 지금 보니 그 말이 너무 돌려 말해졌던 것 같습니다.",
      "behaviorHint": "손바닥을 위로 펼치고 짧게 한숨 쉰다."
    },
    {
      "id": "workplace-03:transition:a:d-5:s1_s2",
      "caseId": "workplace-03",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "team_meeting_phrase_followup",
      "line": "제가 '어제 일로 팀 명예가 흔들렸다'고 말한 건 맞습니다. 그래도 이름을 찍지는 않았다는 점만 말씀드리고 싶습니다.",
      "behaviorHint": "말끝에서 시선을 피한다."
    },
    {
      "id": "workplace-03:transition:a:d-5:s2_s3",
      "caseId": "workplace-03",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "named_person_question",
      "line": "그렇게 돌려 말한 방식 자체가 희주 씨를 떠올리게 했겠죠. 하지만 희주 씨 쪽도 DM으로 먼저 일을 크게 만든 건 사실입니다.",
      "behaviorHint": "손을 무릎에 올리고 건조하게 마무리한다."
    },
    {
      "id": "workplace-03:transition:a:d-5:s3_s5",
      "caseId": "workplace-03",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "shared_responsibility_question",
      "line": "상대가 먼저였든 아니든 제가 소문전에 가담한 건 맞습니다. 팀장인 제가 그러면 안 됐습니다.",
      "behaviorHint": "고개를 숙인 채 마지막 문장을 낮게 말한다."
    },
    {
      "id": "workplace-03:transition:b:d-2:s0_s1",
      "caseId": "workplace-03",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "dm_forward_question",
      "line": "정확히 말하면 퍼뜨린 게 아니라 확인하려던 쪽에 가까웠습니다. 저는 그 차이를 분명히 하고 싶었습니다.",
      "behaviorHint": "손가락으로 보낸 범위를 작게 그려 보인다."
    },
    {
      "id": "workplace-03:transition:b:d-2:s1_s2",
      "caseId": "workplace-03",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-2_presented",
      "line": "그 캡처가 원본이면 제가 몇 사람에게 보낸 건 맞습니다. 다만 그때는 정말 제 이야기라고 믿었습니다.",
      "behaviorHint": "문장 사이를 짧게 끊으며 인정 폭을 조금 넓힌다."
    },
    {
      "id": "workplace-03:transition:b:d-2:s2_s3",
      "caseId": "workplace-03",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "mentor_room_scope_question",
      "line": "멘토방과 동료 둘까지 간 건 가볍지 않았습니다. 그래도 강도윤 씨 쪽 발언이 먼저 불을 붙인 것도 사실이라고 봅니다.",
      "behaviorHint": "표정 변화 없이 턱만 살짝 당긴다."
    },
    {
      "id": "workplace-03:transition:b:d-2:s3_s5",
      "caseId": "workplace-03",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "recipient_count_or_responsibility_question",
      "line": "수신 범위와 시각이 다 맞다면 제가 단정 메시지를 전파한 책임을 인정하겠습니다. 제 잘못입니다.",
      "behaviorHint": "메모를 내려놓고 재판관을 정면으로 본다."
    },
    {
      "id": "workplace-03:transition:b:d-3:s0_s1",
      "caseId": "workplace-03",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "targeted_me_claim",
      "line": "저는 그때 제 이야기라고 들을 수밖에 없었습니다. 다만 지금처럼 따져 보니 다른 해석 가능성도 완전히 지울 수는 없습니다.",
      "behaviorHint": "단정적인 톤을 조금 낮추고 눈썹을 찌푸린다."
    },
    {
      "id": "workplace-03:transition:b:d-3:s1_s2",
      "caseId": "workplace-03",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-1_presented",
      "line": "그 19초만 놓고 제가 확신을 키운 건 맞습니다. 영상이 짧다는 점도 이제는 인정합니다.",
      "behaviorHint": "짧게 숨을 들이쉬고 말수를 줄인다."
    },
    {
      "id": "workplace-03:transition:b:d-3:s2_s3",
      "caseId": "workplace-03",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "e-3_presented",
      "line": "공유노트에 외부 후보 HJ 표기가 있었다면 제 결론이 성급했던 겁니다. 그래도 강도윤 씨 표현이 모호했던 책임은 남습니다.",
      "behaviorHint": "평평한 목소리로도 불만이 남아 있음을 드러낸다."
    },
    {
      "id": "workplace-03:transition:b:d-3:s3_s5",
      "caseId": "workplace-03",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-6_presented",
      "line": "원본 로그까지 보면 제가 잘린 클립만으로 직접 겨냥이라고 단정한 게 맞습니다. 그 판단은 제 책임입니다.",
      "behaviorHint": "어깨를 펴고 담담하게 결론을 인정한다."
    },
    {
      "id": "workplace-03:transition:b:d-5:s0_s1",
      "caseId": "workplace-03",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "rumor_spread_question",
      "line": "저는 소문을 퍼뜨렸다기보다 도움을 구했다고 생각했습니다. 그래도 지금 보니 그 경계가 흐렸습니다.",
      "behaviorHint": "차갑게 말하지만 손끝이 한 번 떨린다."
    },
    {
      "id": "workplace-03:transition:b:d-5:s1_s2",
      "caseId": "workplace-03",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "small_admission_about_hurt",
      "line": "네, 제가 너무 상처받아서 여러 사람에게 말을 꺼낸 건 맞습니다. 다만 그때는 정식 창구를 바로 믿지 못했습니다.",
      "behaviorHint": "한 번 고개를 숙였다가 다시 든다."
    },
    {
      "id": "workplace-03:transition:b:d-5:s2_s3",
      "caseId": "workplace-03",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "why_not_hr_first_question",
      "line": "먼저 HR로 갔어야 했다는 지적은 맞습니다. 그래도 강도윤 씨 쪽도 팀 회의에서 저를 떠올리게 하며 압박했습니다.",
      "behaviorHint": "표정은 평평하지만 문장 끝이 날카로워진다."
    },
    {
      "id": "workplace-03:transition:b:d-5:s3_s5",
      "caseId": "workplace-03",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "shared_responsibility_question",
      "line": "공식 확인 전에 사람들에게 단정 메시지를 돌린 건 제 선택이었습니다. 억울해도 그렇게 하면 안 됐습니다.",
      "behaviorHint": "천천히 숨을 내쉬고 딱 끊어 말한다."
    }
  ]
}

