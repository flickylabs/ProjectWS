export const neighbor07V3GameLoopData = {
  "caseId": "neighbor-07",
  "dossierCards": [
    {
      "id": "dossier-1",
      "name": "봉투와 동선 대조",
      "description": "옛 열쇠 메모와 CCTV 동선을 묶어 첫 사용 순간과 순서 위반을 압박한다.",
      "evidenceIds": [
        "e-1",
        "e-2"
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
              "id": "dossier-1.a.q1",
              "text": "박나리 씨, 그 봉투 사진 어디에도 관리사무소 승인 주체나 기간은 없습니다. 무엇을 근거로 공식 허가처럼 받아들이셨습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "neighbor07:a:d-4:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q2",
              "text": "CCTV상 관리실 연락 전에 유모차와 박스를 넣는 동선이 보입니다. 잠금함을 확인만 했다는 말, 그대로 유지하십니까?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "neighbor07:a:d-1:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q3",
              "text": "첫 문자로 관리실 먼저라는 기준을 들은 뒤에도 왜 사용을 멈추지 않았는지, 순서만 답하십시오.",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "neighbor07:a:d-5:unlock:s2:0",
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
              "text": "권성호 씨, 영상을 보기 전에는 박나리 씨가 실제로 언제부터 얼마나 넣었는지 직접 확인하신 건 아니지요?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "neighbor07:b:d-1:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q2",
              "text": "메모가 허가서가 아니라는 판단과 별개로, '원래 803 자리'라는 표현이 오해를 더 키운 건 아니었습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "neighbor07:b:d-4:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q3",
              "text": "관리실 먼저 원칙을 아셨다면, 왜 본인 조치가 먼저 나가도록 두셨습니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "neighbor07:b:d-5:unlock:s2:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-2",
      "name": "허가 기록과 자물쇠",
      "description": "관리 장부와 현장 사진을 맞물려 전용권 오해와 사적 자력조치를 갈라낸다.",
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
              "text": "임시사용 승인대장을 보신 적도 없는데, 왜 그 잠금함을 803 전용처럼 단정하셨습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "neighbor07:a:d-3:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q2",
              "text": "공식 문서가 없다는 걸 알면서도 메모와 스티커를 끝까지 허가처럼 붙든 건 체면 때문이었습니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "neighbor07:a:d-4:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q3",
              "text": "성호 씨가 직접 자물쇠를 단 뒤 그 대응이 과하다고 느끼면서도, 본인 선행 위반은 바로 인정하지 않으셨지요?",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "neighbor07:a:d-2:unlock:s2:0",
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
              "text": "관리실 답변 전 직접 자물쇠를 건 사실, 임시조치라는 말만으로 절차 위반이 사라집니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "neighbor07:b:d-2:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q2",
              "text": "승인대장엔 한시 사용만 적혀 있습니다. 왜 현장 기억만으로 803 전용이라 단정하셨습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "neighbor07:b:d-3:unlock:s2:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q3",
              "text": "장부가 기준이라는 걸 알면서도 설명보다 압박이 먼저였던 이유를 말해 보십시오.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "neighbor07:b:d-4:unlock:s3:0",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-3",
      "name": "문자 순서와 음성 흔들림",
      "description": "첫 안내 문자와 전 세입자 음성을 대조해 서로의 합리화와 감정 폭발 직전을 드러낸다.",
      "evidenceIds": [
        "e-5",
        "e-6"
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
              "id": "dossier-3.a.q1",
              "text": "첫 안내 문자로 관리실 먼저라는 기준을 알았는데도, 왜 '곧 확인하면 된다'고 스스로 기준을 바꾸셨습니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "neighbor07:a:d-5:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q2",
              "text": "윤가영 씨 음성이 공식 기록보다 앞설 수 없다는 점을 느끼면서도, 왜 803 전용처럼 믿고 계셨습니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "neighbor07:a:d-3:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q3",
              "text": "공개 경고 이후 첫 이웃 관계가 깨질까 두려워서, 본인 잘못을 더 작게 말한 것 아닙니까?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "neighbor07:a:d-5:unlock:s4:0",
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
              "text": "관리실 답보다 단지앱 글이 먼저 올라간 순서, 지금도 안전상 불가피했다고만 보십니까?",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "neighbor07:b:d-5:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q2",
              "text": "윤가영 씨 음성 하나로 현재도 803 전용이라고 본 건, 과거 기억을 현재 권리로 착각한 것 아닙니까?",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "neighbor07:b:d-3:unlock:s3:0",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q3",
              "text": "공개 경고가 상대를 곤란하게 만들 걸 알고도 올리셨다면, 그건 안전 조치가 아니라 압박 아닌가요?",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "neighbor07:b:d-2:unlock:s3:0",
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
            "id": "neighbor07:a:d-1:unlock:s2:0",
            "factText": "봉투와 메모만으로는 공식 허가가 아니라는 불안이 있었지만 그냥 열쇠를 썼다.",
            "tags": [
              "context",
              "uncertainty"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "key": {
                "exact": "전 세입자가 남긴 옛 열쇠",
                "neutral": "그 열쇠"
              },
              "marker": {
                "exact": "'803 사용' 메모와 '803' 스티커",
                "neutral": "그 표시"
              }
            },
            "stanceHints": [
              "partial",
              "uncertainty"
            ]
          }
        ],
        "S3": [
          {
            "id": "neighbor07:a:d-1:unlock:s3:0",
            "factText": "관리실 먼저라는 안내를 들은 뒤에도 유모차와 박스를 먼저 잠금함에 넣었다.",
            "tags": [
              "timeline",
              "rule"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "text": {
                "exact": "'그 잠금함은 관리실 먼저 확인해 주세요'라는 첫 문자",
                "neutral": "첫 문자"
              },
              "items": {
                "exact": "유모차와 이사 박스",
                "neutral": "짐"
              },
              "place": {
                "exact": "8층 계단실 잠금함",
                "neutral": "그 잠금함"
              }
            },
            "stanceHints": [
              "partial",
              "admit"
            ]
          }
        ],
        "S4": [
          {
            "id": "neighbor07:a:d-1:unlock:s4:0",
            "factText": "무단침입 취급을 받을까 두려워 열쇠 사용 사실을 또렷하게 말하지 못했다.",
            "tags": [
              "fear",
              "shame"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "key": {
                "exact": "전 세입자가 남긴 옛 열쇠",
                "neutral": "그 열쇠"
              },
              "person": {
                "exact": "권성호",
                "neutral": "그 사람",
                "fullName": "권성호",
                "judgeRef": "권성호 씨"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "neighbor07:a:d-1:unlock:s5:0",
            "factText": "관리실 확인 전에 옛 열쇠로 잠금함을 열어 짐을 넣은 판단 책임을 스스로 인정한다.",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "management": {
                "exact": "관리사무소 확인",
                "neutral": "관리실 확인"
              },
              "key": {
                "exact": "전 세입자가 남긴 옛 열쇠",
                "neutral": "그 열쇠"
              },
              "items": {
                "exact": "유모차와 이사 박스",
                "neutral": "짐"
              }
            },
            "stanceHints": [
              "confess",
              "admit"
            ]
          }
        ]
      },
      "d-2": {
        "S2": [
          {
            "id": "neighbor07:a:d-2:unlock:s2:0",
            "factText": "공개 경고 글을 본 순간 바로 항의하지 못하고 먼저 숨는 쪽을 택했다.",
            "tags": [
              "harm",
              "emotion"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "post": {
                "exact": "'새로 온 803호' 취지의 단지앱 글",
                "neutral": "공개 경고 글"
              },
              "person": {
                "exact": "권성호",
                "neutral": "그 사람",
                "fullName": "권성호",
                "judgeRef": "권성호 씨"
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
            "id": "neighbor07:a:d-2:unlock:s3:0",
            "factText": "성호의 대응이 과했다고 느끼면서도 내 선행 적치가 발단이었다는 점은 안다.",
            "tags": [
              "counter",
              "context"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "exact": "권성호",
                "neutral": "그 사람",
                "fullName": "권성호",
                "judgeRef": "권성호 씨"
              },
              "items": {
                "exact": "유모차와 이사 박스",
                "neutral": "짐"
              },
              "place": {
                "exact": "8층 계단실 잠금함",
                "neutral": "그 잠금함"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S4": [
          {
            "id": "neighbor07:a:d-2:unlock:s4:0",
            "factText": "공개 글 때문에 첫 이웃 관계가 이미 틀어졌다고 느꼈다.",
            "tags": [
              "shame",
              "relationship"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "post": {
                "exact": "'새로 온 803호' 취지의 단지앱 글",
                "neutral": "공개 경고 글"
              },
              "time": {
                "exact": "이사 첫날",
                "neutral": "그날",
                "dateExact": "이사 첫날",
                "period": "이사 직후"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "neighbor07:a:d-2:unlock:s5:0",
            "factText": "성호의 사적 재잠금은 과했지만 내 행동도 갈등을 키웠다고 인정한다.",
            "tags": [
              "admission",
              "relationship"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "padlock": {
                "exact": "성호가 단 자물쇠",
                "neutral": "그 자물쇠"
              },
              "items": {
                "exact": "유모차와 이사 박스",
                "neutral": "짐"
              }
            },
            "stanceHints": [
              "confess",
              "partial"
            ]
          }
        ]
      },
      "d-3": {
        "S2": [
          {
            "id": "neighbor07:a:d-3:unlock:s2:0",
            "factText": "승인대장을 본 적은 없는데도 외형과 전언만으로 803 전용이라고 믿었다.",
            "tags": [
              "uncertainty",
              "institution"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "ledger": {
                "exact": "임시사용 승인대장",
                "neutral": "관리기록"
              },
              "marker": {
                "exact": "'803 사용' 메모와 '803' 스티커",
                "neutral": "그 표시"
              },
              "person": {
                "exact": "윤가영",
                "neutral": "그 사람",
                "fullName": "윤가영",
                "judgeRef": "전 세입자"
              }
            },
            "stanceHints": [
              "partial",
              "uncertainty"
            ]
          }
        ],
        "S3": [
          {
            "id": "neighbor07:a:d-3:unlock:s3:0",
            "factText": "윤가영의 음성도 임시사용 종료를 정확히 기억하지 못한 말일 수 있음을 깨닫는다.",
            "tags": [
              "context",
              "privacy"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "voice": {
                "exact": "윤가영의 음성메시지",
                "neutral": "그 음성"
              },
              "person": {
                "exact": "윤가영",
                "neutral": "그 사람",
                "fullName": "윤가영",
                "judgeRef": "전 세입자"
              }
            },
            "stanceHints": [
              "partial",
              "uncertainty"
            ]
          }
        ],
        "S4": [
          {
            "id": "neighbor07:a:d-3:unlock:s4:0",
            "factText": "새집 적응 불안 때문에 눈앞의 표시를 허가처럼 붙잡았다.",
            "tags": [
              "fear",
              "identity"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "marker": {
                "exact": "'803 사용' 메모와 '803' 스티커",
                "neutral": "그 표시"
              },
              "time": {
                "exact": "이사 첫날",
                "neutral": "그날",
                "dateExact": "이사 첫날",
                "period": "이사 직후"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "neighbor07:a:d-3:unlock:s5:0",
            "factText": "잠금함이 특정 세대 전용이 아니라 공용 비상물품함이었다는 사실을 받아들인다.",
            "tags": [
              "admission",
              "institution"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "place": {
                "exact": "8층 계단실 잠금함",
                "neutral": "그 잠금함"
              },
              "ledger": {
                "exact": "임시사용 승인대장",
                "neutral": "관리기록"
              }
            },
            "stanceHints": [
              "confess",
              "admit"
            ]
          }
        ]
      },
      "d-4": {
        "S2": [
          {
            "id": "neighbor07:a:d-4:unlock:s2:0",
            "factText": "메모에 승인 주체와 기간이 없다는 점을 보면서도 허가처럼 써 버렸다.",
            "tags": [
              "uncertainty",
              "quote"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "marker": {
                "exact": "'803 사용' 메모와 '803' 스티커",
                "neutral": "그 표시"
              },
              "management": {
                "exact": "관리사무소 확인",
                "neutral": "관리실 확인"
              }
            },
            "stanceHints": [
              "partial",
              "uncertainty"
            ]
          }
        ],
        "S3": [
          {
            "id": "neighbor07:a:d-4:unlock:s3:0",
            "factText": "집주인과 전 세입자 말을 방패로 삼아 자기 판단 책임을 흐렸다.",
            "tags": [
              "relationship",
              "self_justification"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "exact": "윤가영",
                "neutral": "그 사람",
                "fullName": "윤가영",
                "judgeRef": "전 세입자"
              },
              "place": {
                "exact": "8층 계단실 잠금함",
                "neutral": "그 잠금함"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S4": [
          {
            "id": "neighbor07:a:d-4:unlock:s4:0",
            "factText": "체면 때문에 '허가 같았다'를 '허가였다'처럼 더 세게 밀었다.",
            "tags": [
              "shame",
              "self_justification"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "marker": {
                "exact": "'803 사용' 메모와 '803' 스티커",
                "neutral": "그 표시"
              },
              "time": {
                "exact": "이사 첫날",
                "neutral": "그날",
                "dateExact": "이사 첫날",
                "period": "이사 직후"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "neighbor07:a:d-4:unlock:s5:0",
            "factText": "메모와 스티커는 공식 허가가 아니라 전 세입자가 남긴 사적 흔적이었다.",
            "tags": [
              "admission",
              "privacy"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "marker": {
                "exact": "'803 사용' 메모와 '803' 스티커",
                "neutral": "그 표시"
              },
              "person": {
                "exact": "윤가영",
                "neutral": "그 사람",
                "fullName": "윤가영",
                "judgeRef": "전 세입자"
              }
            },
            "stanceHints": [
              "confess",
              "admit"
            ]
          }
        ]
      },
      "d-5": {
        "S2": [
          {
            "id": "neighbor07:a:d-5:unlock:s2:0",
            "factText": "관리실 먼저라는 문자를 보고도 짐부터 넣은 건 사실이다.",
            "tags": [
              "rule",
              "timeline"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "text": {
                "exact": "'그 잠금함은 관리실 먼저 확인해 주세요'라는 첫 문자",
                "neutral": "첫 문자"
              },
              "items": {
                "exact": "유모차와 이사 박스",
                "neutral": "짐"
              },
              "place": {
                "exact": "8층 계단실 잠금함",
                "neutral": "그 잠금함"
              }
            },
            "stanceHints": [
              "partial",
              "admit"
            ]
          }
        ],
        "S3": [
          {
            "id": "neighbor07:a:d-5:unlock:s3:0",
            "factText": "곧 확인하면 된다고 스스로 기준을 느슨하게 바꾸며 순서 위반을 합리화했다.",
            "tags": [
              "threshold",
              "self_justification"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "management": {
                "exact": "관리사무소 확인",
                "neutral": "관리실 확인"
              },
              "time": {
                "exact": "이사 첫날",
                "neutral": "그날",
                "dateExact": "이사 첫날",
                "period": "이사 직후"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S4": [
          {
            "id": "neighbor07:a:d-5:unlock:s4:0",
            "factText": "첫 이웃 관계를 깨고 싶지 않아 순서 위반을 작게 말했다.",
            "tags": [
              "relationship",
              "fear"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "exact": "권성호",
                "neutral": "그 사람",
                "fullName": "권성호",
                "judgeRef": "권성호 씨"
              },
              "time": {
                "exact": "이사 첫날",
                "neutral": "그날",
                "dateExact": "이사 첫날",
                "period": "이사 직후"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "neighbor07:a:d-5:unlock:s5:0",
            "factText": "관계 유지를 이유로 잘못을 축소한 점까지 인정한다.",
            "tags": [
              "admission",
              "relationship"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "exact": "권성호",
                "neutral": "그 사람",
                "fullName": "권성호",
                "judgeRef": "권성호 씨"
              },
              "management": {
                "exact": "관리사무소 확인",
                "neutral": "관리실 확인"
              }
            },
            "stanceHints": [
              "confess",
              "admit"
            ]
          }
        ]
      }
    },
    "b": {
      "d-1": {
        "S2": [
          {
            "id": "neighbor07:b:d-1:unlock:s2:0",
            "factText": "CCTV를 보기 전에는 나리가 실제로 언제 짐을 넣었는지 정확히 본 것이 아니었다.",
            "tags": [
              "evidence",
              "uncertainty"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "evidence": {
                "exact": "8층 계단실 CCTV",
                "neutral": "영상"
              },
              "person": {
                "exact": "박나리",
                "neutral": "그 사람",
                "fullName": "박나리",
                "judgeRef": "박나리 씨"
              }
            },
            "stanceHints": [
              "partial",
              "uncertainty"
            ]
          }
        ],
        "S3": [
          {
            "id": "neighbor07:b:d-1:unlock:s3:0",
            "factText": "윤가영 때의 분쟁 기억을 현재 나리에게 덧씌워 비슷한 사람처럼 몰았다.",
            "tags": [
              "legacy_sentence",
              "emotion"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "exact": "윤가영",
                "neutral": "그 사람",
                "fullName": "윤가영",
                "judgeRef": "전 세입자"
              },
              "person2": {
                "exact": "박나리",
                "neutral": "그 사람",
                "fullName": "박나리",
                "judgeRef": "박나리 씨"
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
            "id": "neighbor07:b:d-1:unlock:s4:0",
            "factText": "공용공간을 또 못 막은 사람으로 보일까 겁나 목소리가 더 커졌다.",
            "tags": [
              "fear",
              "institution"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "place": {
                "exact": "8층 비상계단과 복도",
                "neutral": "그 공간"
              },
              "person": {
                "exact": "박나리",
                "neutral": "그 사람",
                "fullName": "박나리",
                "judgeRef": "박나리 씨"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "neighbor07:b:d-1:unlock:s5:0",
            "factText": "나리의 선행 위반은 맞지만 내 몰아붙임도 별도로 과했다.",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "exact": "박나리",
                "neutral": "그 사람",
                "fullName": "박나리",
                "judgeRef": "박나리 씨"
              },
              "place": {
                "exact": "8층 계단실 잠금함",
                "neutral": "그 잠금함"
              }
            },
            "stanceHints": [
              "confess",
              "admit"
            ]
          }
        ]
      },
      "d-2": {
        "S2": [
          {
            "id": "neighbor07:b:d-2:unlock:s2:0",
            "factText": "관리실 답변 전에 자물쇠를 직접 달고 경고문 사진까지 남겼다.",
            "tags": [
              "act",
              "timeline"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "padlock": {
                "exact": "성호가 단 자물쇠",
                "neutral": "그 자물쇠"
              },
              "photo": {
                "exact": "자물쇠 설치 사진과 손글씨 경고문",
                "neutral": "그 사진"
              }
            },
            "stanceHints": [
              "partial",
              "admit"
            ]
          }
        ],
        "S3": [
          {
            "id": "neighbor07:b:d-2:unlock:s3:0",
            "factText": "공개 글이 상대를 곤란하게 만들 걸 알면서도 경고 효과를 앞세워 올렸다.",
            "tags": [
              "harm",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "post": {
                "exact": "'새로 온 803호' 취지의 단지앱 글",
                "neutral": "공개 경고 글"
              },
              "person": {
                "exact": "박나리",
                "neutral": "그 사람",
                "fullName": "박나리",
                "judgeRef": "박나리 씨"
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
            "id": "neighbor07:b:d-2:unlock:s4:0",
            "factText": "또 넘어갈까 봐 '내가 막아야 한다'는 강박이 먼저 튀었다.",
            "tags": [
              "fear",
              "self_justification"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "exact": "박나리",
                "neutral": "그 사람",
                "fullName": "박나리",
                "judgeRef": "박나리 씨"
              },
              "place": {
                "exact": "8층 비상계단과 복도",
                "neutral": "그 공간"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "neighbor07:b:d-2:unlock:s5:0",
            "factText": "안전 명분과 별개로 사적 재잠금과 공개 경고 책임을 인정한다.",
            "tags": [
              "admission",
              "rule"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "padlock": {
                "exact": "성호가 단 자물쇠",
                "neutral": "그 자물쇠"
              },
              "post": {
                "exact": "단지앱 공개 경고 글",
                "neutral": "그 글"
              },
              "management": {
                "exact": "관리사무소 확인",
                "neutral": "관리실 확인"
              }
            },
            "stanceHints": [
              "confess",
              "admit"
            ]
          }
        ]
      },
      "d-3": {
        "S2": [
          {
            "id": "neighbor07:b:d-3:unlock:s2:0",
            "factText": "장부를 보지 않고도 윤가영 말과 흔적으로 803 전용이라고 단정했다.",
            "tags": [
              "uncertainty",
              "context"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "ledger": {
                "exact": "임시사용 승인대장",
                "neutral": "관리기록"
              },
              "voice": {
                "exact": "윤가영의 음성메시지",
                "neutral": "그 음성"
              },
              "marker": {
                "exact": "'803 사용' 메모와 '803' 스티커",
                "neutral": "그 표시"
              }
            },
            "stanceHints": [
              "partial",
              "uncertainty"
            ]
          }
        ],
        "S3": [
          {
            "id": "neighbor07:b:d-3:unlock:s3:0",
            "factText": "임시사용 흔적과 현재 전용권을 혼동했다.",
            "tags": [
              "identity",
              "institution"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "marker": {
                "exact": "'803 사용' 메모와 '803' 스티커",
                "neutral": "그 표시"
              },
              "ledger": {
                "exact": "임시사용 승인대장",
                "neutral": "관리기록"
              }
            },
            "stanceHints": [
              "partial",
              "admit"
            ]
          }
        ],
        "S4": [
          {
            "id": "neighbor07:b:d-3:unlock:s4:0",
            "factText": "과거 악연 때문에 비슷한 장면만 보여도 전용 분쟁으로 먼저 읽었다.",
            "tags": [
              "fear",
              "legacy_sentence"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "exact": "윤가영",
                "neutral": "그 사람",
                "fullName": "윤가영",
                "judgeRef": "전 세입자"
              },
              "person2": {
                "exact": "박나리",
                "neutral": "그 사람",
                "fullName": "박나리",
                "judgeRef": "박나리 씨"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "neighbor07:b:d-3:unlock:s5:0",
            "factText": "잠금함이 한시 허용된 공용 비상물품함이었다는 사실을 수용한다.",
            "tags": [
              "admission",
              "institution"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "place": {
                "exact": "8층 계단실 잠금함",
                "neutral": "그 잠금함"
              },
              "ledger": {
                "exact": "임시사용 승인대장",
                "neutral": "관리기록"
              }
            },
            "stanceHints": [
              "confess",
              "admit"
            ]
          }
        ]
      },
      "d-4": {
        "S2": [
          {
            "id": "neighbor07:b:d-4:unlock:s2:0",
            "factText": "메모가 허가서는 아니라 보면서도 '원래 803 자리'라는 말을 섞어 오해를 키웠다.",
            "tags": [
              "counter",
              "relationship"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "marker": {
                "exact": "'803 사용' 메모와 '803' 스티커",
                "neutral": "그 표시"
              },
              "person": {
                "exact": "박나리",
                "neutral": "그 사람",
                "fullName": "박나리",
                "judgeRef": "박나리 씨"
              }
            },
            "stanceHints": [
              "partial"
            ]
          }
        ],
        "S3": [
          {
            "id": "neighbor07:b:d-4:unlock:s3:0",
            "factText": "결정 기준은 메모가 아니라 관리문서라는 걸 알면서 확인보다 압박이 먼저였다.",
            "tags": [
              "institution",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "ledger": {
                "exact": "임시사용 승인대장",
                "neutral": "관리기록"
              },
              "management": {
                "exact": "관리사무소 확인",
                "neutral": "관리실 확인"
              }
            },
            "stanceHints": [
              "partial",
              "admit"
            ]
          }
        ],
        "S4": [
          {
            "id": "neighbor07:b:d-4:unlock:s4:0",
            "factText": "'또 시작'이라는 감정 때문에 차분한 설명 대신 단정이 먼저 나갔다.",
            "tags": [
              "emotion",
              "legacy_sentence"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "exact": "윤가영",
                "neutral": "그 사람",
                "fullName": "윤가영",
                "judgeRef": "전 세입자"
              },
              "time": {
                "exact": "이사 첫날",
                "neutral": "그날",
                "dateExact": "이사 첫날",
                "period": "이사 직후"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "neighbor07:b:d-4:unlock:s5:0",
            "factText": "메모와 스티커가 비공식 흔적이라는 점과 내 표현 책임을 함께 인정한다.",
            "tags": [
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "marker": {
                "exact": "'803 사용' 메모와 '803' 스티커",
                "neutral": "그 표시"
              },
              "person": {
                "exact": "박나리",
                "neutral": "그 사람",
                "fullName": "박나리",
                "judgeRef": "박나리 씨"
              }
            },
            "stanceHints": [
              "confess",
              "admit"
            ]
          }
        ]
      },
      "d-5": {
        "S2": [
          {
            "id": "neighbor07:b:d-5:unlock:s2:0",
            "factText": "문자와 관리실 의사를 말하면서도 실제론 잠금과 공개 글이 먼저였다.",
            "tags": [
              "rule",
              "timeline"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "text": {
                "exact": "'그 잠금함은 관리실 먼저 확인해 주세요'라는 첫 문자",
                "neutral": "첫 문자"
              },
              "padlock": {
                "exact": "성호가 단 자물쇠",
                "neutral": "그 자물쇠"
              },
              "post": {
                "exact": "단지앱 공개 경고 글",
                "neutral": "그 글"
              }
            },
            "stanceHints": [
              "partial",
              "admit"
            ]
          }
        ],
        "S3": [
          {
            "id": "neighbor07:b:d-5:unlock:s3:0",
            "factText": "공개 경고가 1:1 통보보다 먼저 간 건 내가 순서를 스스로 바꾼 것이다.",
            "tags": [
              "harm",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "post": {
                "exact": "'새로 온 803호' 취지의 단지앱 글",
                "neutral": "공개 경고 글"
              },
              "management": {
                "exact": "관리사무소 확인",
                "neutral": "관리실 확인"
              }
            },
            "stanceHints": [
              "partial",
              "admit"
            ]
          }
        ],
        "S4": [
          {
            "id": "neighbor07:b:d-5:unlock:s4:0",
            "factText": "답을 기다리지 못한 건 못 막은 사람처럼 보이기 싫은 두려움 때문이다.",
            "tags": [
              "fear",
              "identity"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "exact": "박나리",
                "neutral": "그 사람",
                "fullName": "박나리",
                "judgeRef": "박나리 씨"
              },
              "management": {
                "exact": "관리사무소 확인",
                "neutral": "관리실 확인"
              }
            },
            "stanceHints": [
              "emotional"
            ]
          }
        ],
        "S5": [
          {
            "id": "neighbor07:b:d-5:unlock:s5:0",
            "factText": "관리실 우선 원칙을 알면서도 먼저 잠그고 공개 압박한 사실을 인정한다.",
            "tags": [
              "admission",
              "rule"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "management": {
                "exact": "관리사무소 확인",
                "neutral": "관리실 확인"
              },
              "padlock": {
                "exact": "성호가 단 자물쇠",
                "neutral": "그 자물쇠"
              },
              "post": {
                "exact": "'새로 온 803호' 취지의 단지앱 글",
                "neutral": "공개 경고 글"
              }
            },
            "stanceHints": [
              "confess",
              "admit"
            ]
          }
        ]
      }
    }
  },
  "events": {
    "contradictions": [
      {
        "id": "neighbor07:contradiction:0",
        "targetParty": "a",
        "trigger": "박나리가 d-1에서 '열쇠가 맞는지만 봤다'고 말한 뒤 e-2가 제시될 때",
        "text": "잠금함을 확인만 했다면서, 영상엔 유모차와 박스를 넣는 동선이 남습니다.",
        "relatedDisputes": [
          "d-1",
          "d-5"
        ],
        "evidenceIds": [
          "e-2"
        ]
      },
      {
        "id": "neighbor07:contradiction:1",
        "targetParty": "a",
        "trigger": "박나리가 d-4에서 메모를 공식 허가처럼 단정한 뒤 e-3가 제시될 때",
        "text": "그 메모가 허가서라면, 왜 승인대장과 퇴거 반납 공지엔 종료 기록만 남아 있습니까?",
        "relatedDisputes": [
          "d-3",
          "d-4"
        ],
        "evidenceIds": [
          "e-1",
          "e-3"
        ]
      },
      {
        "id": "neighbor07:contradiction:2",
        "targetParty": "b",
        "trigger": "권성호가 d-2에서 안전상 임시조치였다고만 말한 뒤 e-5가 제시될 때",
        "text": "안전조치라면서 관리실 답보다 자물쇠와 공개 글이 먼저였습니다.",
        "relatedDisputes": [
          "d-2",
          "d-5"
        ],
        "evidenceIds": [
          "e-4",
          "e-5"
        ]
      },
      {
        "id": "neighbor07:contradiction:3",
        "targetParty": "b",
        "trigger": "권성호가 d-3에서 803 전용이라고 단정한 뒤 e-3와 e-6이 함께 제시될 때",
        "text": "전 세입자 음성은 기억일 뿐이고, 관리기록은 한시 허가 종료를 가리킵니다.",
        "relatedDisputes": [
          "d-3",
          "d-4"
        ],
        "evidenceIds": [
          "e-3",
          "e-6"
        ]
      }
    ],
    "interjections": [
      {
        "id": "neighbor07:interjection:0",
        "speaker": "a",
        "trigger": "권성호가 규정 단어를 짧게 끊어 몰아붙일 때",
        "text": "그렇게 몰아서 말하시면 제가 설명할 틈이 없어요.",
        "relatedDisputes": [
          "d-1",
          "d-2"
        ]
      },
      {
        "id": "neighbor07:interjection:1",
        "speaker": "b",
        "trigger": "박나리가 전 세입자와 집주인 말을 반복해 책임을 흐릴 때",
        "text": "남이 뭐랬다는 말 말고, 본인이 뭘 했는지만 말하세요.",
        "relatedDisputes": [
          "d-3",
          "d-4"
        ]
      },
      {
        "id": "neighbor07:interjection:2",
        "speaker": "judge",
        "trigger": "양측이 '관리실 먼저' 원칙을 서로에게만 들이밀 때",
        "text": "두 분 모두 그 원칙을 알고도 어긴 정황이 있습니다. 자기 순서부터 답하십시오.",
        "relatedDisputes": [
          "d-5"
        ]
      }
    ],
    "emotionalOutbursts": [
      {
        "id": "neighbor07:outburst:a:0",
        "party": "a",
        "trigger": "단지앱 공개 글과 호수 낙인이 반복 언급될 때",
        "text": "첫날부터 제가 문제 세대처럼 올라간 기분이 얼마나 창피했는지 아세요?",
        "relatedDisputes": [
          "d-2",
          "d-5"
        ]
      },
      {
        "id": "neighbor07:outburst:a:1",
        "party": "a",
        "trigger": "옛 열쇠 사용을 '무단침입'처럼 단정당할 때",
        "text": "저도 겁나서 그랬던 거예요, 처음부터 남의 걸 빼앗으려던 게 아니에요.",
        "relatedDisputes": [
          "d-1",
          "d-4"
        ]
      },
      {
        "id": "neighbor07:outburst:b:0",
        "party": "b",
        "trigger": "전 세입자 사례를 과장이라 지적받을 때",
        "text": "그 자리를 또 그렇게 두면 결국 누가 치웁니까, 저는 그 꼴을 이미 봤어요.",
        "relatedDisputes": [
          "d-1",
          "d-3"
        ]
      },
      {
        "id": "neighbor07:outburst:b:1",
        "party": "b",
        "trigger": "사적 자물쇠와 공개 글이 문제라고 몰릴 때",
        "text": "내가 안 막았으면 또 넘어갔습니다, 가만히 보라고만 할 수는 없었어요.",
        "relatedDisputes": [
          "d-2",
          "d-5"
        ]
      }
    ]
  },
  "transitionBeats": [
    {
      "id": "neighbor07:transition:a:d-1:s0_s1",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "old_key_question",
      "line": "죄송한데, 그 열쇠가 남아 있어서 맞는지만 본 거예요. 그때는 전 세입자 말이 먼저 떠올랐어요.",
      "behaviorHint": "사과를 먼저 깔고 시선을 아래로 내린다."
    },
    {
      "id": "neighbor07:transition:a:d-1:s1_s2",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-1_presented",
      "line": "봉투랑 메모를 믿고 연 건 맞아요. 그래서 잠깐 둬도 되는 줄 알았습니다.",
      "behaviorHint": "증거를 보고 말끝이 짧아진다."
    },
    {
      "id": "neighbor07:transition:a:d-1:s2_s3",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "why_not_check_management_first",
      "line": "맞아요, 관리실 확인보다 제가 먼저 움직였어요. 이삿날이라 급해서 판단이 짧았습니다.",
      "behaviorHint": "한숨 뒤에 어깨를 낮추며 책임을 조금 인정한다."
    },
    {
      "id": "neighbor07:transition:a:d-1:s3_s5",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-2_or_e-5_presented",
      "line": "영상이랑 문자 순서까지 나오면 부정할 수 없네요. 관리실 확인 전에 제가 먼저 열고 넣었습니다.",
      "behaviorHint": "고개를 숙이고 체념한 톤으로 정리한다."
    },
    {
      "id": "neighbor07:transition:a:d-4:s0_s1",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "official_permission_question",
      "line": "공식 서류를 본 건 아니지만, 안쪽 표시가 허가처럼 보였어요.",
      "behaviorHint": "말속도를 늦추며 확신을 한 단계 내린다."
    },
    {
      "id": "neighbor07:transition:a:d-4:s1_s2",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-1_presented",
      "line": "메모를 근거처럼 믿은 건 맞아요. 다만 그때는 그냥 낙서라고는 생각 못 했습니다.",
      "behaviorHint": "봉투 사진을 보며 손을 모은다."
    },
    {
      "id": "neighbor07:transition:a:d-4:s2_s3",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "temporary_permit_followup",
      "line": "임시사용일 수 있다는 질문을 들으니 제가 허가처럼 너무 크게 해석한 것 같아요.",
      "behaviorHint": "시선을 피하고 체면을 의식한 듯 입술을 다문다."
    },
    {
      "id": "neighbor07:transition:a:d-4:s3_s5",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-4",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-3_presented",
      "line": "승인대장이 나오니 분명하네요. 그 메모와 스티커는 공식 허가가 아니었습니다.",
      "behaviorHint": "문서에서 눈을 떼지 못하다가 짧게 시인한다."
    },
    {
      "id": "neighbor07:transition:a:d-5:s0_s1",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "management_first_reminder",
      "line": "관리실이 먼저라는 건 알고 있었어요. 다만 그날은 짐부터 치워야 한다고 생각했습니다.",
      "behaviorHint": "사과 섞인 목소리로 상황 설명을 먼저 꺼낸다."
    },
    {
      "id": "neighbor07:transition:a:d-5:s1_s4",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S1",
      "toState": "S4",
      "trigger": "nonjudgmental_question_about_move_in_stress",
      "line": "첫날부터 규칙 모르는 사람처럼 보일까 겁났어요. 그래서 제 잘못을 자꾸 작게 말했습니다.",
      "behaviorHint": "눈가가 붉어지고 말이 잠시 멈춘다."
    },
    {
      "id": "neighbor07:transition:a:d-5:s4_s5",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S4",
      "toState": "S5",
      "trigger": "e-5_presented",
      "line": "문자와 순서표가 같이 나오면 더는 숨길 수 없네요. 관리실보다 사용이 먼저였습니다.",
      "behaviorHint": "체념한 표정으로 고개를 끄덕인다."
    },
    {
      "id": "neighbor07:transition:b:d-2:s0_s1",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "padlock_question",
      "line": "잠그긴 했죠. 하지만 그건 임시 안전조치였습니다.",
      "behaviorHint": "짧게 자르듯 말하고 턱을 든다."
    },
    {
      "id": "neighbor07:transition:b:d-2:s1_s2",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-4_presented",
      "line": "사진이 그 시점을 보여 주니 내가 먼저 단 건 인정합니다. 다만 방치할 수는 없었습니다.",
      "behaviorHint": "증거를 흘끗 보고 말끝을 세게 눌러 말한다."
    },
    {
      "id": "neighbor07:transition:b:d-2:s2_s3",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "public_naming_followup",
      "line": "공개 글까지 간 건 선을 넘은 대응일 수 있죠. 그래도 그때는 내가 막아야 한다고 봤습니다.",
      "behaviorHint": "손으로 선을 긋듯 제스처하며 일부만 물러선다."
    },
    {
      "id": "neighbor07:transition:b:d-2:s3_s5",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-5_presented",
      "line": "순서표까지 보면 관리실보다 내 조치가 먼저였다는 게 분명합니다. 그건 내 책임입니다.",
      "behaviorHint": "한숨을 내쉬고 문장을 짧게 끊는다."
    },
    {
      "id": "neighbor07:transition:b:d-3:s0_s1",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "ownership_question",
      "line": "장부를 본 건 아니어도 그 자리는 803 관련 자리로 알았습니다.",
      "behaviorHint": "현장 경험을 앞세우며 단정 톤을 유지한다."
    },
    {
      "id": "neighbor07:transition:b:d-3:s1_s2",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-6_presented",
      "line": "윤가영 말까지 들으니 더 그렇게 단정했습니다. 공식 문서를 본 건 아니라도요.",
      "behaviorHint": "음성 언급과 함께 고개를 한번 젖힌다."
    },
    {
      "id": "neighbor07:transition:b:d-3:s2_s3",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "temporary_permit_followup",
      "line": "지금 보니 그건 임시사용 흔적과 전용권을 섞어 본 겁니다.",
      "behaviorHint": "이를 한번 다물고 인정 폭을 넓힌다."
    },
    {
      "id": "neighbor07:transition:b:d-3:s3_s5",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-3_presented",
      "line": "승인대장이 나오면 결론이 나죠. 전용이 아니었습니다.",
      "behaviorHint": "문서에 시선을 고정한 채 낮게 정리한다."
    },
    {
      "id": "neighbor07:transition:b:d-5:s0_s1",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "management_first_reminder",
      "line": "원칙은 알았지만 기다리기엔 늦는다고 봤습니다.",
      "behaviorHint": "짧은 문장으로 예외를 당연한 듯 말한다."
    },
    {
      "id": "neighbor07:transition:b:d-5:s1_s2",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-5_presented",
      "line": "문자와 앱 순서가 나오니 제 조치가 먼저였다는 건 인정합니다.",
      "behaviorHint": "입꼬리를 굳힌 채 마지못해 고개를 끄덕인다."
    },
    {
      "id": "neighbor07:transition:b:d-5:s2_s3",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "why_post_before_reply",
      "line": "관리실 답보다 공개 경고가 먼저 간 건 과했죠.",
      "behaviorHint": "말끝을 짧게 떨어뜨리며 시선을 한번 돌린다."
    },
    {
      "id": "neighbor07:transition:b:d-5:s3_s5",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "shared_responsibility_question",
      "line": "상대 책임과 별개로 내가 원칙을 먼저 깬 건 내 몫입니다.",
      "behaviorHint": "목소리를 낮추고 정면을 본다."
    }
  ]
}
