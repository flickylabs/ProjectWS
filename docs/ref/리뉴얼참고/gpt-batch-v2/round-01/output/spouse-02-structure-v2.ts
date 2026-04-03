export const spouse_02_structure_v2 = {
  "caseId": "spouse-02",
  "schemaVersion": "structure_v2",
  "disputes": [
    {
      "id": "d-1",
      "name": "도윤의 상담 종결서 무단 유출",
      "truth": true,
      "truthDescription": "도윤은 희주의 산후 상담 종결서 일부를 아내 동의 없이 학교 측에 건넸다. '학교가 미리 알아야 할 사정'이라는 명분으로 양육 안정성에 의문을 심었다.",
      "quadrant": "b_only",
      "requiredEvidence": [
        "e-4",
        "e-5"
      ],
      "correctResponsibility": {
        "a": 10,
        "b": 90
      },
      "ambiguity": "none",
      "weight": "high",
      "mediationLink": "신뢰회복",
      "legitimacyIssue": true,
      "judgmentStatement": "도윤은 상담 종결서를 무단 유출했다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "상담 종결서",
        "학교 메일",
        "보조 이메일",
        "학부모지원 담당",
        "무단 유출",
        "school_ref",
        "양육 자격",
        "상담 기록"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "도윤의 상담 종결서 무단 유출의 겉사실을 정리합니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "spouse02:b:d-1:denial:0",
            "spouse02:b:d-1:fear:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "왜 숨기거나 밀어붙였는지 동기가 드러납니다.",
          "lockedSummary": "숨긴 이유와 계산은 아직 드러나지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-1:surface:evidence_shown"
            ]
          },
          "revealAtomIds": [
            "spouse02:b:d-1:motive:0",
            "spouse02:b:d-1:admission:0",
            "spouse02:b:d-1:admission:1"
          ],
          "uiStyle": "thread_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "관계 규칙이 어디서 무너졌는지 핵심이 드러납니다.",
          "lockedSummary": "관계 핵심과 진짜 상처는 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-1:motive:motive_named"
            ]
          },
          "revealAtomIds": [
            "spouse02:b:d-1:emotion:0",
            "spouse02:b:d-1:fear:1",
            "spouse02:b:d-1:relationship:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-2",
      "name": "희주의 메일 무단 열람과 연락망 배제 초안",
      "truth": true,
      "truthDescription": "희주는 익명 글 발견 37분 만에 공유 노트북에서 도윤 메일에 접속하고 프린터 기록을 뒤졌다. 밤 11시 52분, 연락망 배제 초안을 작성했지만 발송은 하지 않았다.",
      "quadrant": "a_only",
      "requiredEvidence": [
        "e-1",
        "e-2"
      ],
      "correctResponsibility": {
        "a": 75,
        "b": 25
      },
      "ambiguity": "low",
      "weight": "high",
      "mediationLink": "사생활경계",
      "legitimacyIssue": true,
      "judgmentStatement": "희주는 메일을 무단 열람했다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "공유 노트북",
        "37분 뒤",
        "11시 52분",
        "연락망 제외 초안",
        "무단 열람",
        "프린터 로그",
        "계정 접근",
        "미발송 초안"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "희주의 메일 무단 열람과 연락망 배제 초안의 표면 사실을 확인합니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "spouse02:a:d-2:denial:0",
            "spouse02:a:d-2:fear:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "행동의 계산과 방어 논리가 드러납니다.",
          "lockedSummary": "숨긴 이유와 계산은 아직 드러나지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-2:surface:evidence_shown"
            ]
          },
          "revealAtomIds": [
            "spouse02:a:d-2:responsibility:0",
            "spouse02:a:d-2:admission:0",
            "spouse02:a:d-2:admission:1"
          ],
          "uiStyle": "thread_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "본안과 연결된 책임과 경계 문제가 드러납니다.",
          "lockedSummary": "관계 핵심과 진짜 상처는 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-2:motive:responsibility_named"
            ]
          },
          "revealAtomIds": [
            "spouse02:a:d-2:emotion:0",
            "spouse02:a:d-2:fear:1",
            "spouse02:a:d-2:relationship:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-3",
      "name": "학부모방 익명 경고글 — 누가 올렸나",
      "truth": true,
      "truthDescription": "학부모방 익명 글은 외부인의 오해처럼 포장됐지만, 첨부 이미지 해시값이 도윤의 보조 이메일과 가정용 복합기 스캔 기록으로 이어진다.",
      "quadrant": "b_only",
      "requiredEvidence": [
        "e-3",
        "e-4",
        "e-5"
      ],
      "correctResponsibility": {
        "a": 15,
        "b": 85
      },
      "ambiguity": "low",
      "weight": "high",
      "mediationLink": "학교절차복구",
      "legitimacyIssue": true,
      "judgmentStatement": "도윤이 익명 경고글을 올렸다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "학부모방",
        "익명 경고글",
        "첨부 파일",
        "보조 계정",
        "해시값",
        "오리엔테이션 직후",
        "가정용 복합기",
        "내부 정보"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "학부모방 익명 경고글 — 누가 올렸나의 겉사실을 정리합니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "spouse02:b:d-3:denial:0",
            "spouse02:b:d-3:fear:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "왜 숨기거나 밀어붙였는지 동기가 드러납니다.",
          "lockedSummary": "숨긴 이유와 계산은 아직 드러나지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-3:surface:evidence_shown"
            ]
          },
          "revealAtomIds": [
            "spouse02:b:d-3:responsibility:0",
            "spouse02:b:d-3:admission:0",
            "spouse02:b:d-3:admission:1"
          ],
          "uiStyle": "thread_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "관계 규칙이 어디서 무너졌는지 핵심이 드러납니다.",
          "lockedSummary": "관계 핵심과 진짜 상처는 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-3:motive:responsibility_named"
            ]
          },
          "revealAtomIds": [
            "spouse02:b:d-3:emotion:0",
            "spouse02:b:d-3:fear:1",
            "spouse02:b:d-3:relationship:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-4",
      "name": "과거 기록 비무기화 약속 쌍방 파기",
      "truth": true,
      "truthDescription": "두 사람 모두 '과거 기록을 무기로 쓰지 않겠다'는 약속을 깼다. 도윤은 상담 종결서를 학교에 흘렸고, 희주는 별거 위기 발언을 초안에 넣었다.",
      "quadrant": "both_know",
      "requiredEvidence": [
        "e-2",
        "e-4"
      ],
      "correctResponsibility": {
        "a": 40,
        "b": 60
      },
      "ambiguity": "none",
      "weight": "medium",
      "mediationLink": "과거청산",
      "legitimacyIssue": false,
      "judgmentStatement": "도윤과 희주는 약속을 파기했다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "2023년 약속",
        "과거 기록 비무기화",
        "별거 위기 발언",
        "상담 기록 무기화",
        "과거 상처",
        "쌍방 파기",
        "약속 위반"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "과거 기록 비무기화 약속 쌍방 파기의 표면 사실을 확인합니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "spouse02:a:d-4:denial:0",
            "spouse02:a:d-4:relationship:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "행동의 계산과 방어 논리가 드러납니다.",
          "lockedSummary": "숨긴 이유와 계산은 아직 드러나지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-4",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-4:surface:evidence_shown"
            ]
          },
          "revealAtomIds": [
            "spouse02:a:d-4:admission:0",
            "spouse02:a:d-4:responsibility:0",
            "spouse02:a:d-4:responsibility:1"
          ],
          "uiStyle": "thread_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "본안과 연결된 책임과 경계 문제가 드러납니다.",
          "lockedSummary": "관계 핵심과 진짜 상처는 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S4"
              },
              {
                "id": "d-2",
                "minState": "S4"
              },
              {
                "id": "d-4",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-4:motive:responsibility_named"
            ]
          },
          "revealAtomIds": [
            "spouse02:a:d-4:fear:0",
            "spouse02:a:d-4:emotion:0",
            "spouse02:a:d-4:harm:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-5",
      "name": "입학 파일 보류 — 신고인가 행정 오류인가",
      "truth": true,
      "truthDescription": "입학 파일 보류의 원인은 신고가 아니라 전입 확인서의 구 동호수 행정 오류였다. 보류 시각이 익명 메일 도착보다 앞선다.",
      "quadrant": "neither_knows",
      "requiredEvidence": [
        "e-6"
      ],
      "correctResponsibility": {
        "a": 35,
        "b": 65
      },
      "ambiguity": "none",
      "weight": "high",
      "mediationLink": "학교절차복구",
      "legitimacyIssue": false,
      "judgmentStatement": "입학 파일 보류 원인은 행정 오류이다.",
      "disputeKind": "shared_misconception",
      "disputeAliases": [
        "입학 파일 보류",
        "구 동호수",
        "전입 확인서",
        "관리사무소 정정서",
        "행정 오류",
        "자동 보류",
        "익명 메일 전",
        "학교 메모"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "입학 파일 보류 — 신고인가 행정 오류인가을 둘러싼 오해가 어떻게 생겼는지 봅니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "spouse02:b:d-5:fear:0",
            "spouse02:b:d-5:motive:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "왜 양측이 잘못된 인과를 붙잡았는지 드러납니다.",
          "lockedSummary": "숨긴 이유와 계산은 아직 드러나지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-5",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-5:surface:evidence_shown"
            ]
          },
          "revealAtomIds": [
            "spouse02:b:d-5:context:0",
            "spouse02:b:d-5:evidence:0",
            "spouse02:b:d-5:responsibility:0"
          ],
          "uiStyle": "thread_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "오해를 벗기고 실제 원인과 상처를 분리합니다.",
          "lockedSummary": "관계 핵심과 진짜 상처는 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-5",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-5:motive:context_named"
            ]
          },
          "revealAtomIds": [
            "spouse02:b:d-5:shame:0",
            "spouse02:b:d-5:fear:1",
            "spouse02:b:d-5:relationship:0"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "misconception": {
        "beliefModeByParty": {
          "a": "misbelief",
          "b": "misbelief"
        },
        "stages": [
          {
            "state": "M0",
            "summary": "겉증거가 먼저 눈에 들어온 단계",
            "npcMode": "confused_defensive"
          },
          {
            "state": "M1",
            "summary": "의심을 사실처럼 말하기 시작한 단계",
            "npcMode": "mistaken_certainty"
          },
          {
            "state": "M2",
            "summary": "잘못된 인과를 굳혀 버린 단계",
            "npcMode": "mistaken_certainty"
          },
          {
            "state": "M3",
            "summary": "자료 모순이 보이며 확신이 흔들리는 단계",
            "npcMode": "doubt_creeping"
          },
          {
            "state": "M4",
            "summary": "실제 맥락과 요청 주체가 드러나는 단계",
            "npcMode": "clarified"
          }
        ],
        "trapSignals": [
          "익명 메일보다 앞선 보류 시각",
          "구 동호수 자동보류 규정",
          "학교 설명 부족이 만든 인과 오해"
        ],
        "truthExitEvidenceIds": [
          "e-6"
        ],
        "clarifyOutcomeLabel": "실제 맥락과 요청 주체가 드러나는 단계"
      }
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "name": "공유 프린터에서 나온 학교 메일 초안",
      "description": "공유 프린터 트레이에 남아 있던 출력물이다. '강도윤을 임시 연락망에서 제외해 주십시오'라는 문장, 수신인은 학교 행정실. 밤 11시 52분 출력. 미발송.",
      "type": "document",
      "reliability": "soft",
      "completeness": "partial",
      "provenance": "household_device",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-2"
      ],
      "isTrap": true,
      "requires": [],
      "investigationResults": {
        "request_original": "출력물만 남아 있고 보낸 편지함에 같은 메일은 없다. 발송하지 않은 의도를 어디까지 문제 삼을 수 있는지가 쟁점이다.",
        "check_metadata": "프린터 스풀 로그에 찍힌 출력 시각은 밤 11시 52분이다. 아이가 잠든 뒤, 익명 글을 발견하고 감정이 끓어오르던 시간대와 겹친다.",
        "restore_context": "초안에 '익명 글 확인 후 보호자 권한 재검토 요청'이라는 문구가 있다. 선행 사건에 대응하려 한 흔적이다.",
        "verify_source": "가정용 프린터 출력 로그와 용지 일련번호가 일치한다. 이 집의 이 프린터에서 이 시각에 출력된 문서다.",
        "check_edits": "출력물 위에 손글씨 메모나 수정 흔적은 없다. 작성 후 바로 출력하고 그대로 프린터 위에 둔 것으로 보인다.",
        "question_acquisition": "부부 공유 프린터에서 발견됐으므로 접근은 문제없다. 다만 미발송 초안을 증거로 쓰는 건 사생활 침해 소지가 있다."
      },
      "subjectParty": "a",
      "timing": {
        "intent": "disarm_trap",
        "role": "impeach",
        "bestAtStates": [
          "S0",
          "S1",
          "S2"
        ],
        "weakAtStates": [
          "S4",
          "S5"
        ],
        "preferredQuestionTypes": [
          "fact_pursuit",
          "evidence_present"
        ],
        "preferredAngles": [
          "context",
          "legality"
        ],
        "blockedVectorsHelp": [
          "authenticity",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-2",
            "state": "S2",
            "multiplier": 1.33,
            "note": "미발송 초안이라는 한계를 먼저 분리해야 한다."
          }
        ]
      }
    },
    {
      "id": "e-2",
      "name": "초안 메일 버전기록과 계정 접근 로그",
      "description": "메일 플랫폼의 버전 기록과 로그인 로그다. 초안 미발송 사실과 희주의 도윤 계정 접속이 익명 글 37분 후였음을 시간순으로 보여준다.",
      "type": "cloud_log",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "platform",
      "legitimacy": "lawful",
      "proves": [
        "d-2",
        "d-4"
      ],
      "isTrap": false,
      "requires": [
        "e-1"
      ],
      "investigationResults": {
        "request_original": "메일 초안의 버전 기록과 로그인 IP 원본이 클라우드에 보존돼 있다. 누가, 언제, 어떤 기기에서 접속했는지 시간순으로 추적 가능하다.",
        "check_metadata": "희주의 접근은 익명 글 유포 37분 후다. 글을 보고 곧바로 범인을 찾으러 간 셈이다. 시간차가 선후 관계를 증명한다.",
        "restore_context": "초안은 저장만 됐고 발송하지 않았다. 다음 날 아침 삭제를 시도한 흔적도 남아 있다.",
        "verify_source": "메일 플랫폼 보안 로그(접속 IP, 기기 식별자, 세션 시각)로 출처가 검증된다.",
        "check_edits": "버전 이력에 본문 수정이 두 차례 기록돼 있다. 첫 번째는 문장 다듬기, 두 번째는 삭제 시도. 조작 흔적은 없다.",
        "question_acquisition": "플랫폼 공식 로그이므로 자료 적법성은 높다. 다만 희주의 무단 접속 행위 자체는 별도 위법 소지가 있다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "나희주에게: \"희주의 메일 무단 열람과 연락망 배제 초안\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 나희주의 \"희주의 메일 무단 열람과 연락망 배제 초안\" 쟁점과 관련된다. 나희주은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "강도윤에게: \"과거 기록 비무기화 약속 쌍방 파기\" 관련 해명 요구 (방어 동기: 관계 유지)",
          "implication": "이 증거는 강도윤의 \"과거 기록 비무기화 약속 쌍방 파기\" 쟁점과 관련된다. 강도윤은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "expose",
        "role": "establish",
        "bestAtStates": [
          "S1",
          "S2",
          "S3"
        ],
        "weakAtStates": [
          "S0"
        ],
        "preferredQuestionTypes": [
          "evidence_present"
        ],
        "preferredAngles": [
          "timeline",
          "legality"
        ],
        "blockedVectorsHelp": [
          "authenticity",
          "legality"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-2",
            "state": "S2",
            "multiplier": 1.36,
            "note": "37분 뒤 접근이라는 시간축이 무단 열람을 확정한다."
          }
        ]
      }
    },
    {
      "id": "e-3",
      "name": "입학 예정 학부모방 익명 글 캡처",
      "description": "입학 예정 학부모 채팅방에 올라온 익명 글과 상담서 일부 이미지 캡처다. 희주를 지목하지만 크롭과 블러 처리가 있어 작성자 특정은 불가.",
      "type": "chat",
      "reliability": "soft",
      "completeness": "cropped",
      "provenance": "third_party",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-3"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "관리자 전체 내역은 없고 회원 캡처만 있다. 원본 게시글은 삭제된 상태라 전문을 담고 있는지 확인할 수 없다.",
        "check_metadata": "이미지 생성 시각은 오리엔테이션 명단 공지 직후다. 타이밍을 노린 것으로 보인다.",
        "restore_context": "'보호자 한쪽의 과거 기록을 학교가 알아야 한다' — 가정 내부 사정을 아는 사람이 쓴 문장이다.",
        "verify_source": "채팅방 관리자가 해당 시간대에 익명 글이 실제로 게시됐음을 확인해줬다. 다만 관리자도 작성자 계정을 특정하지는 못했다.",
        "check_edits": "크롭과 블러 처리가 돼 있어 정보가 선별적으로 가려졌다. 원본 글의 전체 맥락을 알 수 없으므로 단독 증거력은 약하다.",
        "question_acquisition": "초대 기반 폐쇄형 학부모방 자료다. 외부 캡처 전달은 커뮤니티 규칙 위반 및 개인정보 침해 소지가 있다."
      },
      "subjectParty": "b",
      "timing": {
        "intent": "disarm_trap",
        "role": "impeach",
        "bestAtStates": [
          "S0",
          "S1",
          "S2"
        ],
        "weakAtStates": [
          "S4",
          "S5"
        ],
        "preferredQuestionTypes": [
          "fact_pursuit"
        ],
        "preferredAngles": [
          "identity",
          "context"
        ],
        "blockedVectorsHelp": [
          "authenticity",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "S1",
            "multiplier": 1.4,
            "note": "익명 글 캡처만으로는 작성자를 특정할 수 없다는 점을 살린다."
          }
        ]
      }
    },
    {
      "id": "e-4",
      "name": "학교 학부모지원 담당의 메일 헤더 회신",
      "description": "학교가 받은 익명 메일의 헤더 전문이다. 복구 이메일과 전화번호가 도윤 정보와 일치하고, 첨부 파일 해시값이 가정용 복합기 스캔본과 동일하다.",
      "type": "email",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-1",
        "d-3",
        "d-4"
      ],
      "isTrap": false,
      "requires": [
        "e-3"
      ],
      "investigationResults": {
        "request_original": "학교 메일 서버에 남아 있는 원본 헤더 전문이 제출됐다. 발신 IP, 보조 계정 정보, 첨부 파일 해시값이 고스란히 남아 있다.",
        "check_metadata": "익명 발신 계정의 복구 이메일 끝자리와 전화번호 뒷네 자리가 도윤의 개인 정보와 일치한다. 익명을 쓰면서도 복구 정보를 바꾸지 않은 것이다.",
        "restore_context": "'학교가 미리 알아야 할 사정이 있습니다'라는 문장 뒤에 희주의 상담 내역 요약이 따라온다. 아이를 지키겠다는 명분 아래 아내를 고발한 구조다.",
        "verify_source": "학교 정보보호 담당자가 서버 원본과 제출 헤더를 대조해 일치를 확인했다. 위·변조 흔적 없음.",
        "check_edits": "학교 메일 서버에서 직접 추출한 원본이다. 전달 과정에서 헤더나 본문이 수정된 흔적은 없다.",
        "question_acquisition": "학교 측이 개인정보 비식별 처리를 거친 뒤 분쟁 해결 목적으로 제공한 자료다. 절차상 적법하다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "나희주에게: \"과거 기록 비무기화 약속 쌍방 파기\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 나희주의 \"과거 기록 비무기화 약속 쌍방 파기\" 쟁점과 관련된다. 나희주은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "강도윤에게: \"도윤의 상담 종결서 무단 유출\" 관련 해명 요구 (방어 동기: 직장/평판 보호)",
          "implication": "이 증거는 강도윤의 \"도윤의 상담 종결서 무단 유출\" 쟁점과 관련된다. 강도윤은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "expose",
        "role": "finish",
        "bestAtStates": [
          "S2",
          "S3",
          "S4"
        ],
        "weakAtStates": [
          "S0"
        ],
        "preferredQuestionTypes": [
          "evidence_present"
        ],
        "preferredAngles": [
          "identity",
          "context"
        ],
        "blockedVectorsHelp": [
          "identity",
          "legality"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S4",
            "multiplier": 1.42,
            "note": "보조 계정과 첨부 해시를 결합해 실제 유출을 봉인한다."
          }
        ]
      }
    },
    {
      "id": "e-5",
      "name": "가정용 복합기 스캔 기록과 가족클라우드 동기화 이력",
      "description": "가정용 복합기에서 도윤 계정으로 스캔된 종결서가 'school_ref'라는 파일명으로 가족클라우드에 동기화된 기록이다. 스캔 시각은 익명 글 게시 사흘 전.",
      "type": "device_log",
      "reliability": "soft",
      "completeness": "original",
      "provenance": "household_device",
      "legitimacy": "lawful",
      "proves": [
        "d-1",
        "d-3"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "복합기 관리자 로그에서 스캔 시각과 파일 경로를 확인했고, 가족클라우드 접속 이력과 일치한다.",
        "check_metadata": "스캔 시각은 익명 글 게시 정확히 3일 전이다. 충동이 아니라 며칠에 걸쳐 준비된 행위임을 시간 차이가 보여준다.",
        "restore_context": "'school_ref'로 파일명을 바꿔 저장한 뒤 자동 동기화됐다. 학교 제출 목적이었음을 파일명 자체가 말해준다.",
        "verify_source": "복합기 관리자 계정(도윤 설정)으로 스캔 이력을 직접 확인했다. 기기 고유 식별번호와 클라우드 업로드 기록이 맞아떨어진다.",
        "check_edits": "종결서 원본 스캔 뒤 일부 페이지만 잘라낸 크롭 흔적이 있다. 본문 조작은 없지만 어떤 부분을 골랐는지가 의도를 드러낸다.",
        "question_acquisition": "공유 장비 기록이라 접근 적법성은 높다. 다만 의료정보가 포함돼 있어 사용 범위를 제한해야 한다."
      },
      "subjectParty": "b",
      "timing": {
        "intent": "corroborate",
        "role": "establish",
        "bestAtStates": [
          "S2",
          "S3"
        ],
        "weakAtStates": [
          "S0"
        ],
        "preferredQuestionTypes": [
          "evidence_present"
        ],
        "preferredAngles": [
          "context",
          "identity"
        ],
        "blockedVectorsHelp": [
          "identity",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "S3",
            "multiplier": 1.31,
            "note": "스캔 흔적과 클라우드 동기화가 익명 글의 내부 출처를 보강한다."
          }
        ]
      }
    },
    {
      "id": "e-6",
      "name": "관리사무소 정정서와 학교 파일 보류 메모",
      "description": "관리사무소 전입 확인서 정정 공문과 학교 내부 메모다. 구 동호수 기재 오류로 자동 보류됐으며, 보류 시각이 익명 메일 도착보다 앞선다.",
      "type": "institutional_note",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-5"
      ],
      "isTrap": false,
      "requires": [
        "e-4"
      ],
      "investigationResults": {
        "request_original": "관리사무소 정정 공문과 학교 행정실 내부 메모 원본이 제출됐다. 두 문서를 나란히 놓으면 보류 원인이 선명해진다.",
        "check_metadata": "파일 보류 시각이 익명 메일 도착보다 앞선다. 보류는 메일 때문이 아니라 그 전에 이미 이루어졌다.",
        "restore_context": "전입 확인서 주소 불일치 시 자동 보류되는 학교 내부 규정이 작동한 것이다. 누군가의 신고가 아니다.",
        "verify_source": "관리사무소 직인이 찍힌 정정 공문과 학교 행정실 담당자 서명이 들어간 메모를 교차 대조했다. 양쪽 기관 모두 같은 사실을 확인해준다.",
        "check_edits": "관리사무소 공문과 학교 메모 모두 기관 공식 문서다. 편집이나 변조 흔적은 없다.",
        "question_acquisition": "아동 입학 행정자료이므로 분쟁 해결 목적으로만 사용해야 한다. 아이 개인정보가 포함돼 있어 외부 유출 불가."
      },
      "subjectParty": "a",
      "timing": {
        "intent": "contextualize",
        "role": "finish",
        "bestAtStates": [
          "S1",
          "S2",
          "S3",
          "S4"
        ],
        "weakAtStates": [
          "S0"
        ],
        "preferredQuestionTypes": [
          "evidence_present"
        ],
        "preferredAngles": [
          "context",
          "legality"
        ],
        "blockedVectorsHelp": [
          "context",
          "legality"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-5",
            "state": "S2",
            "multiplier": 1.45,
            "note": "보류 원인을 제보가 아닌 주소 오류로 분리하는 결정타다."
          }
        ]
      }
    }
  ],
  "freeQuestionHooks": [
    {
      "id": "fq:d-1:leak_channel",
      "intentTag": "identity_check",
      "allowedAtStates": [
        "S2",
        "S3",
        "S4",
        "S5"
      ],
      "allowedIssueRoles": [
        "core_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-1",
        "allowAtomIds": [
          "spouse02:b:d-1:admission:0",
          "spouse02:b:d-1:admission:1",
          "spouse02:b:d-1:admission:2"
        ],
        "preferredAngleTags": [
          "identity",
          "context"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 단정해서 말하면 더 왜곡됩니다.",
        "먼저 연결된 사실부터 맞춰야 그 부분도 답할 수 있습니다."
      ]
    },
    {
      "id": "fq:d-2:access_37min",
      "intentTag": "timeline_check",
      "allowedAtStates": [
        "S2",
        "S3",
        "S4",
        "S5"
      ],
      "allowedIssueRoles": [
        "sub_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-2",
        "allowAtomIds": [
          "spouse02:a:d-2:admission:1",
          "spouse02:a:d-2:responsibility:0",
          "spouse02:a:d-2:admission:0"
        ],
        "preferredAngleTags": [
          "timeline",
          "legality"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 단정해서 말하면 더 왜곡됩니다.",
        "먼저 연결된 사실부터 맞춰야 그 부분도 답할 수 있습니다."
      ]
    },
    {
      "id": "fq:d-3:anonymous_source",
      "intentTag": "causal_link",
      "allowedAtStates": [
        "S2",
        "S3",
        "S4",
        "S5"
      ],
      "allowedIssueRoles": [
        "core_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-3",
        "allowAtomIds": [
          "spouse02:b:d-3:admission:0",
          "spouse02:b:d-3:motive:0",
          "spouse02:b:d-3:admission:1"
        ],
        "preferredAngleTags": [
          "identity",
          "context"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 단정해서 말하면 더 왜곡됩니다.",
        "먼저 연결된 사실부터 맞춰야 그 부분도 답할 수 있습니다."
      ]
    },
    {
      "id": "fq:d-4:past_weaponization",
      "intentTag": "rule_check",
      "allowedAtStates": [
        "S2",
        "S3",
        "S4",
        "S5"
      ],
      "allowedIssueRoles": [
        "sub_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-4",
        "allowAtomIds": [
          "spouse02:a:d-4:rule:0",
          "spouse02:a:d-4:admission:0",
          "spouse02:a:d-4:responsibility:0"
        ],
        "preferredAngleTags": [
          "legality",
          "responsibility"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 단정해서 말하면 더 왜곡됩니다.",
        "먼저 연결된 사실부터 맞춰야 그 부분도 답할 수 있습니다."
      ]
    },
    {
      "id": "fq:d-5:hold_origin",
      "intentTag": "context_check",
      "allowedAtStates": [
        "M2",
        "M3",
        "M4"
      ],
      "allowedIssueRoles": [
        "shared_misconception"
      ],
      "answerEnvelope": {
        "disputeId": "d-5",
        "allowAtomIds": [
          "spouse02:b:d-5:context:0",
          "spouse02:b:d-5:context:1",
          "spouse02:b:d-5:evidence:0"
        ],
        "preferredAngleTags": [
          "context",
          "identity"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 단정해서 말하면 더 왜곡됩니다.",
        "먼저 연결된 사실부터 맞춰야 그 부분도 답할 수 있습니다."
      ]
    },
    {
      "id": "fq:d-5:child_harm",
      "intentTag": "emotion_probe",
      "allowedAtStates": [
        "M3",
        "M4"
      ],
      "allowedIssueRoles": [
        "shared_misconception"
      ],
      "answerEnvelope": {
        "disputeId": "d-5",
        "allowAtomIds": [
          "spouse02:b:d-5:harm:0",
          "spouse02:b:d-5:responsibility:1",
          "spouse02:b:d-5:context:1"
        ],
        "preferredAngleTags": [
          "emotion"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 단정해서 말하면 더 왜곡됩니다.",
        "먼저 연결된 사실부터 맞춰야 그 부분도 답할 수 있습니다."
      ]
    }
  ],
  "phase3LogHints": {
    "relationCoreDisputes": [
      "d-1",
      "d-4"
    ],
    "playerStyleTagCandidates": [
      "pressure_heavy",
      "rapport_heavy",
      "evidence_closer",
      "trap_chaser"
    ]
  },
  "linkEdges": [
    {
      "id": "link:d-1:d-3:supports",
      "fromDisputeId": "d-1",
      "toDisputeId": "d-3",
      "type": "supports",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 13,
        "grantFlag": "d-3:surface:header_chain_seen"
      },
      "uiLabel": "유출 경로 일치"
    },
    {
      "id": "link:d-1:d-4:supports",
      "fromDisputeId": "d-1",
      "toDisputeId": "d-4",
      "type": "supports",
      "when": {
        "minState": "S3",
        "minLayer": "motive"
      },
      "effect": {
        "supportBonus": 12,
        "grantFlag": "d-4:surface:record_weaponized_seen"
      },
      "uiLabel": "비무기화 약속 붕괴"
    },
    {
      "id": "link:d-2:d-4:retaliation",
      "fromDisputeId": "d-2",
      "toDisputeId": "d-4",
      "type": "retaliation",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 8,
        "grantFlag": "d-4:motive:counter_weaponized_seen"
      },
      "uiLabel": "방어적 맞대응"
    },
    {
      "id": "link:d-5:d-3:weakens_counter",
      "fromDisputeId": "d-5",
      "toDisputeId": "d-3",
      "type": "weakens_counter",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 10,
        "grantFlag": "d-3:core:school_hold_decoupled"
      },
      "uiLabel": "보류 원인 분리"
    },
    {
      "id": "link:d-3:d-2:retaliation",
      "fromDisputeId": "d-3",
      "toDisputeId": "d-2",
      "type": "retaliation",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 6,
        "grantFlag": "d-2:motive:pain_trigger_seen"
      },
      "uiLabel": "공포 반응의 기점"
    }
  ],
  "proposedUnlockAtoms": []
} as const;
