export const spouse_04_structure_v2 = {
  "caseId": "spouse-04",
  "schemaVersion": "structure_v2",
  "disputes": [
    {
      "id": "d-1",
      "name": "하준의 거짓 긴급업무 문자",
      "truth": true,
      "truthDescription": "하준은 18시 12분에 '클라이언트 긴급 호출'이라 문자를 보냈지만, 작업실 퇴실은 18시 07분, 어머니 아파트 입차는 18시 21분이다. 실제 행선지는 시계 케이스가 있는 어머니 집이었다.",
      "quadrant": "a_only",
      "requiredEvidence": [
        "e-1",
        "e-2"
      ],
      "correctResponsibility": {
        "a": 75,
        "b": 25
      },
      "ambiguity": "none",
      "weight": "high",
      "mediationLink": "신뢰회복",
      "legitimacyIssue": false,
      "judgmentStatement": "하준은 거짓 긴급업무 문자를 보냈다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "18시 12분 문자",
        "클라이언트 긴급 호출",
        "18시 07분 퇴실",
        "18시 21분 입차",
        "어머니 아파트",
        "시계 케이스",
        "거짓 핑계"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "하준의 거짓 긴급업무 문자의 겉사실을 정리합니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "spouse04:a:d-1:denial:0",
            "spouse04:a:d-1:uncertainty:1"
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
            "spouse04:a:d-1:responsibility:3",
            "spouse04:a:d-1:admission:2"
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
              "d-1:motive:responsibility_named"
            ]
          },
          "revealAtomIds": [
            "spouse04:a:d-1:emotion:4",
            "spouse04:a:d-1:admission:5"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-2",
      "name": "다은의 태블릿 열람과 선공유",
      "truth": true,
      "truthDescription": "다은은 하준 태블릿에서 '예약 변경 완료' 알림을 캡처하고, 대면 26분 전에 친구 단톡에 먼저 공유했다. 기기 무단 확인과 제3자 선공유, 두 문제가 겹친다.",
      "quadrant": "b_only",
      "requiredEvidence": [
        "e-3"
      ],
      "correctResponsibility": {
        "a": 20,
        "b": 80
      },
      "ambiguity": "none",
      "weight": "high",
      "mediationLink": "사생활경계",
      "legitimacyIssue": true,
      "judgmentStatement": "다은은 하준 태블릿 정보를 선공유했다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "태블릿 캡처",
        "대면 26분 전",
        "친구 단톡",
        "예약 변경 알림",
        "무단 열람",
        "선공유",
        "잠금 화면"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "다은의 태블릿 열람과 선공유의 표면 사실을 확인합니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "spouse04:b:d-2:denial:0",
            "spouse04:b:d-2:uncertainty:1"
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
            "spouse04:b:d-2:responsibility:3",
            "spouse04:b:d-2:admission:2"
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
            "spouse04:b:d-2:emotion:4",
            "spouse04:b:d-2:admission:5"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-3",
      "name": "예약 변경의 실제 요청자",
      "truth": false,
      "truthDescription": "태블릿 알림만 보면 하준이 직접 취소한 것 같지만, 예약센터 통화기록의 발신 번호는 하준 것이 아니다. 코드를 알던 제3자가 전화를 건 것이다.",
      "quadrant": "b_only",
      "requiredEvidence": [
        "e-3",
        "e-4"
      ],
      "correctResponsibility": {
        "a": 30,
        "b": 70
      },
      "ambiguity": "low",
      "weight": "high",
      "mediationLink": "기념일복구",
      "legitimacyIssue": true,
      "judgmentStatement": "하준은 예약 변경을 요청하지 않았다.",
      "disputeKind": "red_herring",
      "disputeAliases": [
        "예약 변경 완료",
        "발신 번호",
        "제3자 요청",
        "예약 코드",
        "픽업지 변경",
        "레스토랑 예약센터",
        "오해 알림",
        "별도 발신자"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "예약 변경의 실제 요청자이 왜 그럴듯하게 보였는지 봅니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "spouse04:b:d-3:denial:0",
            "spouse04:b:d-3:uncertainty:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "오해를 키운 증거 결핍과 단정의 습관이 드러납니다.",
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
            "spouse04:b:d-3:admission:2",
            "spouse04:b:d-3:responsibility:3"
          ],
          "uiStyle": "thread_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "가짜 쟁점을 벗겨 실제 요청자와 실제 맥락을 확인합니다.",
          "lockedSummary": "관계 핵심과 진짜 상처는 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-3:motive:context_named"
            ]
          },
          "revealAtomIds": [
            "spouse04:b:d-3:emotion:4",
            "spouse04:b:d-3:admission:5"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "misconception": {
        "beliefModeByParty": {
          "a": "suspects",
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
          "요청자 정보 없는 예약 변경 알림",
          "발신 번호가 빠진 시간 대조",
          "결과 통지와 실제 요청 주체의 혼동"
        ],
        "truthExitEvidenceIds": [
          "e-3",
          "e-4"
        ],
        "clarifyOutcomeLabel": "실제 맥락과 요청 주체가 드러나는 단계"
      }
    },
    {
      "id": "d-4",
      "name": "기념일 약속의 쌍방 위반",
      "truth": true,
      "truthDescription": "하준은 시계 케이스를 어머니에게 맡겼고, 다은은 브로치를 빌리며 예약 캡처와 코드를 시어머니에게 보냈다. 둘 다 '가족 끼우지 않기' 약속을 어겼지만, 다은은 예약 정보 자체를 넘긴 차이가 크다.",
      "quadrant": "both_know",
      "requiredEvidence": [
        "e-2",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 45,
        "b": 55
      },
      "ambiguity": "none",
      "weight": "medium",
      "mediationLink": "경계재설정",
      "legitimacyIssue": false,
      "judgmentStatement": "하준과 다은은 약속을 위반했다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "가족 끼우지 않기",
        "시계 케이스",
        "케이크 장식",
        "브로치 대여",
        "예약 캡처",
        "코드 공유",
        "첫 결혼기념일",
        "경계 위반"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "기념일 약속의 쌍방 위반의 표면 사실을 확인합니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "spouse04:a:d-4:denial:0",
            "spouse04:a:d-4:uncertainty:1"
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
            "spouse04:a:d-4:responsibility:3",
            "spouse04:a:d-4:admission:2"
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
                "id": "d-4",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-4:motive:responsibility_named"
            ]
          },
          "revealAtomIds": [
            "spouse04:a:d-4:emotion:4",
            "spouse04:a:d-4:admission:5"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-5",
      "name": "강정희의 의도적 개입 여부",
      "truth": true,
      "truthDescription": "강정희는 예약 코드로 레스토랑 시간을 옮기고 픽업지를 자기 집 근처로 바꿨다. 하준에게는 '케이스 찾으러 와라'며 동선을 꺾었고, 다은에게는 변경 알림만 보이게 놔뒀다.",
      "quadrant": "neither_knows",
      "requiredEvidence": [
        "e-4",
        "e-5",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 60,
        "b": 40
      },
      "ambiguity": "low",
      "weight": "high",
      "mediationLink": "제3자차단",
      "legitimacyIssue": false,
      "judgmentStatement": "강정희는 의도적으로 개입했다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "강정희",
        "음성메모",
        "둘만 보내면",
        "제과점 문자",
        "픽업지 변경",
        "의도적 개입",
        "가족단톡",
        "예약 코드"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "강정희의 의도적 개입 여부의 겉사실을 정리합니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "spouse04:a:d-5:denial:0",
            "spouse04:a:d-5:uncertainty:1"
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
                "id": "d-5",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-5:surface:evidence_shown"
            ]
          },
          "revealAtomIds": [
            "spouse04:a:d-5:responsibility:3",
            "spouse04:a:d-5:admission:2"
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
                "id": "d-4",
                "minState": "S4"
              },
              {
                "id": "d-5",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-5:motive:responsibility_named"
            ]
          },
          "revealAtomIds": [
            "spouse04:a:d-5:emotion:4",
            "spouse04:a:d-5:admission:5"
          ],
          "uiStyle": "relation_core"
        }
      ]
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "name": "작업실 출입기록과 클라이언트 납품 캘린더",
      "description": "기념일 당일 작업실 출입 게이트 로그와 납품 캘린더다. 18시 07분 퇴실 뒤 긴급 일정이 비어 있어 '클라이언트 호출' 문자가 거짓이었음을 보여준다.",
      "type": "access_log",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-1"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "스튜디오 출입 게이트 로그 PDF와 납품 캘린더 원본 캡처가 함께 제출됐다. 둘 다 시스템 직접 출력본이다.",
        "check_metadata": "게이트 로그에 18시 07분 퇴실이 있고 이후 긴급 일정은 비어 있다. 호출 문자(18시 12분)보다 퇴실이 5분 앞선다.",
        "restore_context": "'클라이언트 호출' 문자와 납품 캘린더를 대조하면 해당 시간대 긴급 일정이 없다. 거짓 핑계라는 근거가 되지만 동기는 별도로 판단해야 한다.",
        "verify_source": "출입관리 시스템 로그와 캘린더 서버 기록이 서로 일치한다. 독립된 두 시스템이므로 교차검증이 된다.",
        "check_edits": "관리 시스템 직접 추출 로그라 편집 흔적이 없다. 다만 캘린더는 사전 삭제가 가능하므로 수정 이력 확인이 필요하다.",
        "question_acquisition": "하준 본인이 운영하는 스튜디오 자료로, 자발적 제출이라 적법성 문제없다."
      },
      "subjectParty": "a",
      "timing": {
        "intent": "expose",
        "role": "establish",
        "bestAtStates": [
          "S1",
          "S2"
        ],
        "weakAtStates": [
          "S0"
        ],
        "preferredQuestionTypes": [
          "fact_pursuit",
          "evidence_present"
        ],
        "preferredAngles": [
          "timeline",
          "context"
        ],
        "blockedVectorsHelp": [
          "authenticity",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S2",
            "multiplier": 1.37,
            "note": "긴급업무 핑계와 실제 빈 캘린더를 한 번에 깨뜨린다."
          }
        ]
      }
    },
    {
      "id": "e-2",
      "name": "하준-정희 메신저와 아파트 주차기록",
      "description": "하준이 어머니에게 '시계 케이스 찾으러 간다'고 보낸 메신저와 같은 시각대 아파트 입차기록이다. 거짓 문자의 실제 행선지가 어머니 집이었음을 보여준다.",
      "type": "access_log",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "mixed",
      "legitimacy": "lawful",
      "proves": [
        "d-1",
        "d-4"
      ],
      "isTrap": false,
      "requires": [
        "e-1"
      ],
      "investigationResults": {
        "request_original": "메신저 원본 대화와 아파트 지하주차장 입차기록이 함께 제출됐다. 차량 번호가 하준 명의 차와 일치한다.",
        "check_metadata": "입차 18시 21분 — 호출 문자(18시 12분) 9분 뒤, 퇴실(18시 07분) 14분 뒤다. 작업실에서 바로 어머니 집으로 이어지는 동선이다.",
        "restore_context": "메신저를 보면 하준은 당일 오전에 이미 어머니와 케이스 수령 약속을 잡아둔 상태였다. 급하게 불려간 게 아니라 예정된 방문이다.",
        "verify_source": "관리사무소 주차기록과 메신저 서버 백업이 부합한다. 독립된 두 출처라 상호 검증이 가능하다.",
        "check_edits": "메신저에 일부 삭제 흔적이 있으나 '케이스 찾으러 간다'는 핵심 문장은 서버 백업에서 복원됐다.",
        "question_acquisition": "주차기록은 관리사무소 공개 자료이고, 메신저는 당사자 본인 제출이라 위법성은 낮다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "윤하준에게: \"하준의 거짓 긴급업무 문자\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 윤하준의 \"하준의 거짓 긴급업무 문자\" 쟁점과 관련된다. 윤하준은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "백다은에게: \"기념일 약속의 쌍방 위반\" 관련 해명 요구 (방어 동기: 수치심 회피)",
          "implication": "이 증거는 백다은의 \"기념일 약속의 쌍방 위반\" 쟁점과 관련된다. 백다은은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "corroborate",
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
          "timeline",
          "identity"
        ],
        "blockedVectorsHelp": [
          "context",
          "identity"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S3",
            "multiplier": 1.33,
            "note": "어머니 집으로 꺾인 실제 동선을 봉인한다."
          }
        ]
      }
    },
    {
      "id": "e-3",
      "name": "다은이 캡처한 태블릿 예약변경 알림과 친구 단톡 전송본",
      "description": "태블릿의 '예약 변경 완료' 알림 캡처와 다은이 친구 단톡에 보낸 전송 내역이다. 변경 요청자가 누구인지는 알림에 표시되지 않는다.",
      "type": "chat",
      "reliability": "soft",
      "completeness": "cropped",
      "provenance": "personal_device",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-2",
        "d-3"
      ],
      "isTrap": true,
      "requires": [],
      "investigationResults": {
        "request_original": "태블릿 잠금 화면 알림 캡처와 단톡 전송본뿐이다. 변경 요청자·사유 등 상세 내역은 없다.",
        "check_metadata": "캡처 시각은 하준 대면 26분 전이다. 친구 단톡 전달 시각이 서버에 남아 있어 남편보다 먼저 공유한 순서가 확인된다.",
        "restore_context": "알림에는 '예약이 변경되었습니다'라는 결과만 보인다. 요청자 정보가 없어 하준이 취소했다는 오해의 출발점이 됐다.",
        "verify_source": "캡처 파일 기기정보(태블릿 시리얼)와 단톡 전송 시간이 일치한다. 캡처→전송 흐름은 진본이다.",
        "check_edits": "알림 텍스트에 조작 흔적은 없다. 다만 팝업 아래쪽이 잘려 요청자 정보가 크롭됐을 가능성이 있다.",
        "question_acquisition": "하준 계정 동기화 태블릿을 다은이 무단으로 열어 캡처한 자료다. 배우자 간이라도 사생활 침해 소지가 크다."
      },
      "subjectParty": "b",
      "timing": {
        "intent": "disarm_trap",
        "role": "impeach",
        "bestAtStates": [
          "M0",
          "M1",
          "M2"
        ],
        "weakAtStates": [
          "S4",
          "S5",
          "M4"
        ],
        "preferredQuestionTypes": [
          "fact_pursuit"
        ],
        "preferredAngles": [
          "context",
          "identity"
        ],
        "blockedVectorsHelp": [
          "authenticity",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "M1",
            "multiplier": 1.46,
            "note": "결과 알림만으로 요청자를 단정한 오해의 출발점이다."
          }
        ]
      }
    },
    {
      "id": "e-4",
      "name": "레스토랑 예약센터 통화기록 요약과 케이크 픽업 변경대장",
      "description": "예약센터 변경 요청 통화기록과 제과점 픽업지 수정 변경대장이다. 발신 번호와 시각이 남아 있어 '누가 바꿨는지' 추적할 수 있는 핵심 증거다.",
      "type": "institutional_note",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-3",
        "d-5"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "예약센터 통화기록 요약본과 제과점 주문 변경대장 원본이 함께 제출됐다. 양쪽 모두 사업장 관리 문서다.",
        "check_metadata": "변경 요청 통화 시각은 하준이 아직 작업실에 있던 때다. 호출자는 예약 코드와 케이크 문구를 정확히 알고 있었다.",
        "restore_context": "하준 기기에는 변경 결과 알림만 갔다. 발신 번호는 하준 것이 아니며, 코드를 가진 제3자가 요청한 것이다.",
        "verify_source": "예약센터 통화기록과 제과점 변경대장이 부합한다. 독립된 두 업체라 교차검증이 가능하다.",
        "check_edits": "예약 시스템 출력본과 제과점 수기 변경대장 모두 사업장 관리 문서다. 사후 편집 흔적이 없다.",
        "question_acquisition": "양쪽 모두 고객 정보를 비식별 처리한 뒤 제공한 사업장 기록이라 적법하다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "윤하준에게: \"강정희의 의도적 개입 여부\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 윤하준의 \"강정희의 의도적 개입 여부\" 쟁점과 관련된다. 윤하준은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "백다은에게: \"예약 변경의 실제 요청자\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 백다은의 \"예약 변경의 실제 요청자\" 쟁점과 관련된다. 백다은은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "expose",
        "role": "finish",
        "bestAtStates": [
          "M2",
          "M3",
          "S3"
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
          "authenticity"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "M3",
            "multiplier": 1.42,
            "note": "발신 번호와 픽업 변경 대장이 제3자 요청을 확정한다."
          }
        ]
      }
    },
    {
      "id": "e-5",
      "name": "정희의 음성메모 복원본과 제과점 문자",
      "description": "강정희가 딸에게 남긴 음성메모와 제과점에 보낸 픽업지 변경 문자다. 기념일 일정을 의도적으로 자기 집 쪽으로 돌리려 한 동기와 실행이 함께 담겨 있다.",
      "type": "chat",
      "reliability": "soft",
      "completeness": "original",
      "provenance": "personal_device",
      "legitimacy": "lawful",
      "proves": [
        "d-5"
      ],
      "isTrap": false,
      "requires": [
        "e-4"
      ],
      "investigationResults": {
        "request_original": "강정희 기기에서 직접 추출한 음성메모(.m4a)와 제과점 직원에게 보낸 문자 원본이 함께 제출됐다.",
        "check_metadata": "음성메모 생성 시각은 예약센터 변경 통화 종료 9분 뒤다. 변경 결과를 확인한 직후 딸에게 메모를 남긴 흐름이다.",
        "restore_context": "'둘만 보내면 다음부터도 빠질 거다'라는 음성이 녹음돼 있다. 기념일 개입이 우연이 아닌 의도적 행위였음을 뒷받침한다.",
        "verify_source": "음성메모 해시와 문자 발신 번호가 강정희 단말기 정보와 일치한다. 본인이 녹음하고 본인이 보낸 것이다.",
        "check_edits": "삭제 후 복원된 파일이지만 잘림 없이 연속 재생된다. 파형 분석에서도 편집 흔적은 없다.",
        "question_acquisition": "강정희 본인이 자발적으로 제출한 자기 기기 자료다. 다만 딸에게 보낸 사적 메시지라 딸 동의 없이 제출된 점은 논란 여지가 있다."
      },
      "subjectParty": "a",
      "timing": {
        "intent": "corroborate",
        "role": "finish",
        "bestAtStates": [
          "S3",
          "S4",
          "S5"
        ],
        "weakAtStates": [
          "S0"
        ],
        "preferredQuestionTypes": [
          "evidence_present"
        ],
        "preferredAngles": [
          "context",
          "motive"
        ],
        "blockedVectorsHelp": [
          "motive",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-5",
            "state": "S4",
            "multiplier": 1.4,
            "note": "개입이 우연이 아닌 의도였음을 말해 주는 드문 직접 자료다."
          }
        ]
      }
    },
    {
      "id": "e-6",
      "name": "가족단톡 백업본과 브로치 대여 요청 메시지",
      "description": "가족단톡 백업본이다. 다은이 예약 캡처를 시어머니에게 보낸 대화와 하준이 케이스를 맡긴 대화가 남아 있어, 어머니에게 정보가 모인 경로를 보여준다.",
      "type": "chat",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "platform",
      "legitimacy": "lawful",
      "proves": [
        "d-4",
        "d-5"
      ],
      "isTrap": false,
      "requires": [
        "e-2"
      ],
      "investigationResults": {
        "request_original": "메신저 서버 백업본에서 해당 주간 가족단톡 대화가 원본 형태로 추출됐다. 삭제 메시지 포함 전체 스레드가 복원돼 있다.",
        "check_metadata": "다은의 예약 캡처 전송은 행사 이틀 전, 하준의 케이스 부탁은 당일 오전이다. 어머니에게 정보가 모인 순서를 추적할 수 있다.",
        "restore_context": "가족단톡을 시간순으로 보면, 강정희는 당일 기준 예약 코드·체크인 시각·케이크 문구·케이스 위치를 모두 알고 있었다.",
        "verify_source": "서버 백업본과 각 참여자 기기 캡처가 일치한다. 세 명의 기기에서 같은 대화가 확인돼 진본성이 높다.",
        "check_edits": "서버에서 직접 추출한 백업본이라 클라이언트 측 삭제나 재편집이 반영되지 않은 원본 상태다.",
        "question_acquisition": "가족단톡 참여자 중 하준의 동의로 제출됐다. 다른 참여자의 사생활 발언이 포함돼 있어 범위 검토가 필요하다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "윤하준에게: \"기념일 약속의 쌍방 위반\" 관련 해명 요구 (방어 동기: 관계 유지)",
          "implication": "이 증거는 윤하준의 \"기념일 약속의 쌍방 위반\" 쟁점과 관련된다. 윤하준은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "백다은에게: \"기념일 약속의 쌍방 위반\" 관련 해명 요구 (방어 동기: 수치심 회피)",
          "implication": "이 증거는 백다은의 \"기념일 약속의 쌍방 위반\" 쟁점과 관련된다. 백다은은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "contextualize",
        "role": "reframe",
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
          "context",
          "identity"
        ],
        "blockedVectorsHelp": [
          "context",
          "identity"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-4",
            "state": "S2",
            "multiplier": 1.31,
            "note": "코드와 장식 정보가 어떻게 가족 쪽으로 흘렀는지 보여 준다."
          }
        ]
      }
    }
  ],
  "freeQuestionHooks": [
    {
      "id": "fq:d-1:false_work_route",
      "intentTag": "timeline_check",
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
          "spouse04:a:d-1:admission:2",
          "spouse04:a:d-1:responsibility:3"
        ],
        "preferredAngleTags": [
          "timeline",
          "context"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 단정해서 말하면 더 왜곡됩니다.",
        "먼저 연결된 사실부터 맞춰야 그 부분도 답할 수 있습니다."
      ]
    },
    {
      "id": "fq:d-2:tablet_pre_share",
      "intentTag": "identity_check",
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
          "spouse04:b:d-2:admission:2",
          "spouse04:b:d-2:admission:5",
          "spouse04:b:d-2:responsibility:3"
        ],
        "preferredAngleTags": [
          "identity",
          "legality"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 단정해서 말하면 더 왜곡됩니다.",
        "먼저 연결된 사실부터 맞춰야 그 부분도 답할 수 있습니다."
      ]
    },
    {
      "id": "fq:d-3:requestor_identity",
      "intentTag": "causal_link",
      "allowedAtStates": [
        "M2",
        "M3",
        "M4"
      ],
      "allowedIssueRoles": [
        "red_herring"
      ],
      "answerEnvelope": {
        "disputeId": "d-3",
        "allowAtomIds": [
          "spouse04:b:d-3:admission:2",
          "spouse04:b:d-3:admission:5"
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
      "id": "fq:d-4:family_boundary",
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
          "spouse04:a:d-4:admission:2",
          "spouse04:a:d-4:admission:5",
          "spouse04:a:d-4:responsibility:3"
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
      "id": "fq:d-5:mother_interference",
      "intentTag": "third_party_role",
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
        "disputeId": "d-5",
        "allowAtomIds": [
          "spouse04:a:d-5:admission:2",
          "spouse04:a:d-5:admission:5",
          "spouse04:a:d-5:responsibility:3"
        ],
        "preferredAngleTags": [
          "identity",
          "motive"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 단정해서 말하면 더 왜곡됩니다.",
        "먼저 연결된 사실부터 맞춰야 그 부분도 답할 수 있습니다."
      ]
    },
    {
      "id": "fq:d-5:loyalty_cost",
      "intentTag": "emotion_probe",
      "allowedAtStates": [
        "S4",
        "S5"
      ],
      "allowedIssueRoles": [
        "core_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-5",
        "allowAtomIds": [
          "spouse04:a:d-5:responsibility:3",
          "spouse04:a:d-5:admission:2",
          "spouse04:a:d-5:admission:5"
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
      "id": "link:d-1:d-4:supports",
      "fromDisputeId": "d-1",
      "toDisputeId": "d-4",
      "type": "supports",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 12,
        "grantFlag": "d-4:surface:family_detour_seen"
      },
      "uiLabel": "거짓 문자와 가족 경유"
    },
    {
      "id": "link:d-4:d-5:unlocks_layer",
      "fromDisputeId": "d-4",
      "toDisputeId": "d-5",
      "type": "unlocks_layer",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "grantFlag": "d-5:motive:family_info_flow_seen",
        "unlockLayer": "motive"
      },
      "uiLabel": "가족 경계가 연 통로"
    },
    {
      "id": "link:d-3:d-1:weakens_counter",
      "fromDisputeId": "d-3",
      "toDisputeId": "d-1",
      "type": "weakens_counter",
      "when": {
        "minState": "S3",
        "minLayer": "motive"
      },
      "effect": {
        "supportBonus": 10,
        "grantFlag": "d-1:core:direct_cancel_claim_weakened"
      },
      "uiLabel": "직접 취소 단정 약화"
    },
    {
      "id": "link:d-5:d-3:supports",
      "fromDisputeId": "d-5",
      "toDisputeId": "d-3",
      "type": "supports",
      "when": {
        "minState": "S3",
        "minLayer": "motive"
      },
      "effect": {
        "supportBonus": 12,
        "grantFlag": "d-3:core:third_party_requestor_seen"
      },
      "uiLabel": "제3자 요청자 설명"
    },
    {
      "id": "link:d-5:d-1:supports",
      "fromDisputeId": "d-5",
      "toDisputeId": "d-1",
      "type": "supports",
      "when": {
        "minState": "S3",
        "minLayer": "motive"
      },
      "effect": {
        "supportBonus": 9,
        "grantFlag": "d-1:motive:mother_summons_seen"
      },
      "uiLabel": "동선이 꼬인 배경"
    }
  ],
  "proposedUnlockAtoms": []
} as const;
