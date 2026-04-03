export const spouse_03_structure_v2 = {
  "caseId": "spouse-03",
  "schemaVersion": "structure_v2",
  "disputes": [
    {
      "id": "d-1",
      "name": "유진의 비상금 160만원 비밀 인출",
      "truth": true,
      "truthDescription": "유진은 인호에게 한마디 상의 없이 공동 비상금에서 160만원을 빼냈다. 수습용 정장, 구두, 3개월 정기권. 목적은 합리적이었지만, 숨긴 것 자체가 약속 위반이다.",
      "quadrant": "a_only",
      "requiredEvidence": [
        "e-1",
        "e-2"
      ],
      "correctResponsibility": {
        "a": 65,
        "b": 35
      },
      "ambiguity": "none",
      "weight": "high",
      "mediationLink": "재정투명화",
      "legitimacyIssue": false,
      "judgmentStatement": "유진은 비상금 160만원을 비밀 인출했다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "160만원",
        "공동 비상금",
        "정장 구두",
        "3개월 정기권",
        "이직 첫 주",
        "생체인증",
        "수습 준비비",
        "비밀 인출"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "유진의 비상금 160만원 비밀 인출의 겉사실을 정리합니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "spouse03:a:d-1:timeline:0",
            "spouse03:a:d-1:act:0"
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
            "spouse03:a:d-1:context:0",
            "spouse03:a:d-1:fear:0",
            "spouse03:a:d-1:context:1"
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
            "spouse03:a:d-1:emotion:0",
            "spouse03:a:d-1:rule:0",
            "spouse03:a:d-1:rule:1"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-2",
      "name": "인호의 적금 두 달치 자동이체 중단",
      "truth": true,
      "truthDescription": "인호는 생활비가 빠듯해지자 적금 자동이체를 두 달 정지하고, 그 돈을 생활비와 건조기 초회금으로 돌려썼다. 유진에게는 한마디도 하지 않았다.",
      "quadrant": "b_only",
      "requiredEvidence": [
        "e-5"
      ],
      "correctResponsibility": {
        "a": 25,
        "b": 75
      },
      "ambiguity": "none",
      "weight": "high",
      "mediationLink": "전환기예산",
      "legitimacyIssue": false,
      "judgmentStatement": "인호는 적금 자동이체를 두 달 중단했다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "적금 두 달",
        "자동이체 중단",
        "건조기 할부",
        "생활비 전용",
        "월 25만원",
        "할부 계약서",
        "숨긴 조정"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "인호의 적금 두 달치 자동이체 중단의 표면 사실을 확인합니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "spouse03:b:d-2:timeline:0",
            "spouse03:b:d-2:act:0"
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
            "spouse03:b:d-2:context:0",
            "spouse03:b:d-2:fear:0",
            "spouse03:b:d-2:context:1"
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
              "d-2:motive:motive_named"
            ]
          },
          "revealAtomIds": [
            "spouse03:b:d-2:emotion:0",
            "spouse03:b:d-2:rule:0",
            "spouse03:b:d-2:rule:1"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-3",
      "name": "백화점 정장 결제 — 사치인가 수습 필수품인가",
      "truth": false,
      "truthDescription": "인호가 의심한 백화점 결제는 대부분 수습 복장 필수품이었다. 정기권과 구두 일부는 익월 복지비로 보전될 항목이었다. 사치가 아니라 출근 준비였다.",
      "quadrant": "b_only",
      "requiredEvidence": [
        "e-3",
        "e-4"
      ],
      "correctResponsibility": {
        "a": 35,
        "b": 65
      },
      "ambiguity": "low",
      "weight": "medium",
      "mediationLink": "신뢰회복",
      "legitimacyIssue": true,
      "judgmentStatement": "인호의 결제는 수습 필수품이다.",
      "disputeKind": "red_herring",
      "disputeAliases": [
        "백화점 승인 알림",
        "정장 필수",
        "복장 가이드",
        "복지비 보전",
        "사치 오해",
        "수습 복장",
        "잠금화면 캡처",
        "교통 준비비"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "백화점 정장 결제 — 사치인가 수습 필수품인가이 왜 그럴듯하게 보였는지 봅니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "spouse03:b:d-3:context:0",
            "spouse03:b:d-3:evidence:0"
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
            "spouse03:b:d-3:relationship:0",
            "spouse03:b:d-3:admission:0",
            "spouse03:b:d-3:evidence:1"
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
            "spouse03:b:d-3:emotion:1",
            "spouse03:b:d-3:shame:0"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "misconception": {
        "beliefModeByParty": {
          "a": "knows",
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
          "잠금 화면 승인 알림 크롭본",
          "품목과 보전 여부가 비어 있는 알림",
          "백화점 상호만 보고 사치로 읽히는 편견"
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
      "name": "50만원 사전 상의 약속 쌍방 위반",
      "truth": true,
      "truthDescription": "유진은 비상금 160만원을 몰래 인출했고, 인호는 적금을 멈추고 건조기 84만원 할부를 혼자 질렀다. 둘 다 50만원 약속을 어겼다. 방법만 달랐을 뿐, 약속을 깬 건 똑같다.",
      "quadrant": "both_know",
      "requiredEvidence": [
        "e-1",
        "e-5",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 55,
        "b": 45
      },
      "ambiguity": "none",
      "weight": "medium",
      "mediationLink": "재정투명화",
      "legitimacyIssue": false,
      "judgmentStatement": "유진과 인호는 약속을 위반했다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "50만원 약속",
        "사전 상의",
        "건조기 84만원",
        "160만원 인출",
        "쌍방 위반",
        "수습 두 달",
        "무단 결정"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "50만원 사전 상의 약속 쌍방 위반의 겉사실을 정리합니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "spouse03:a:d-4:context:0",
            "spouse03:a:d-4:counter:0"
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
                "id": "d-4",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-4:surface:evidence_shown"
            ]
          },
          "revealAtomIds": [
            "spouse03:a:d-4:admission:0",
            "spouse03:a:d-4:rule:0",
            "spouse03:a:d-4:context:1"
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
              }
            ],
            "requireFlags": [
              "d-4:motive:responsibility_named"
            ]
          },
          "revealAtomIds": [
            "spouse03:a:d-4:shame:0",
            "spouse03:a:d-4:rule:1",
            "spouse03:a:d-4:rule:2"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-5",
      "name": "이직 직후 가계 공백 — 누구 한 사람 탓인가",
      "truth": false,
      "truthDescription": "가계 공백은 한쪽 탓이 아니다. 유진의 인출, 인호의 적금 중단과 건조기 할부가 같은 주에 겹쳤고, 급여일 3주 지연이 구멍을 더 키웠다.",
      "quadrant": "shared_misconception",
      "requiredEvidence": [
        "e-1",
        "e-5",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 50,
        "b": 50
      },
      "ambiguity": "none",
      "weight": "high",
      "mediationLink": "전환기예산",
      "legitimacyIssue": false,
      "judgmentStatement": "가계 공백은 유진과 인호 탓이 아니다.",
      "disputeKind": "shared_misconception",
      "disputeAliases": [
        "가계 공백",
        "첫 급여 3주 지연",
        "같은 주 지출",
        "서로 숨김",
        "한 사람 탓",
        "전환기 예산",
        "공통 원인"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "이직 직후 가계 공백 — 누구 한 사람 탓인가을 둘러싼 오해가 어떻게 생겼는지 봅니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "spouse03:b:d-5:timeline:0",
            "spouse03:b:d-5:context:0"
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
            "spouse03:b:d-5:admission:0",
            "spouse03:b:d-5:responsibility:2",
            "spouse03:b:d-5:context:1"
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
                "id": "d-1",
                "minState": "S4"
              },
              {
                "id": "d-2",
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
            "spouse03:b:d-5:emotion:1",
            "spouse03:b:d-5:relationship:0"
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
          "같은 주 지출만 남고 급여 지연이 빠진 계산",
          "한 사람만 원인처럼 묶는 말"
        ],
        "truthExitEvidenceIds": [
          "e-1",
          "e-5",
          "e-6"
        ],
        "clarifyOutcomeLabel": "실제 맥락과 요청 주체가 드러나는 단계"
      }
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "name": "공동 비상금 계좌 인출내역",
      "description": "이직 첫 주, 공동 비상금 계좌에서 160만원이 유진 명의 인증으로 빠져나간 은행 원본 거래내역이다. 인출 시각과 인증 수단이 고스란히 찍혀 있다.",
      "type": "bank",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-1",
        "d-4",
        "d-5"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "은행 시스템 직접 출력 PDF 원본이다. 인출 시각, 인증 수단(유진 명의 생체인증), 금액이 그대로 남아 있다.",
        "check_metadata": "인출 3분 전 유진 폰에서 공동뱅킹 앱에 접속한 기록이 있다. 타인이 대신 인출한 흔적은 없다. 유진 본인이 뺀 돈이다.",
        "restore_context": "인출 다음 날 백화점 결제, 그다음 날 정기권 충전 — 사용처가 시간순으로 이어진다. 수습 준비 목적이었다는 정황이다.",
        "verify_source": "은행 고객센터에 PDF 해시값을 대조한 결과 원본과 일치한다. 위·변조 흔적 없음.",
        "check_edits": "은행 시스템에서 직접 발급한 PDF다. 수정 이력이나 편집 흔적은 없다.",
        "question_acquisition": "부부 공동 비상금 계좌이므로 어느 쪽이든 조회할 권리가 있다. 다만 160만원을 상의 없이 인출한 것 자체가 합의 위반이다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "노유진에게: \"유진의 비상금 160만원 비밀 인출\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 노유진의 \"유진의 비상금 160만원 비밀 인출\" 쟁점과 관련된다. 노유진은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "황인호에게: \"50만원 사전 상의 약속 쌍방 위반\" 관련 해명 요구 (방어 동기: 수치심 회피)",
          "implication": "이 증거는 황인호의 \"50만원 사전 상의 약속 쌍방 위반\" 쟁점과 관련된다. 황인호은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
            "multiplier": 1.34,
            "note": "본인 인증 인출과 사용 흐름을 같은 선상에 올린다."
          }
        ]
      }
    },
    {
      "id": "e-2",
      "name": "온보딩 안내문과 정기권 영수증",
      "description": "온보딩 포털 복장 기준, 3개월 정기권 영수증, 업무복 보전 규정이 하나로 묶인 자료다. 160만원이 어디에 쓰였는지 항목별로 대조할 수 있다.",
      "type": "document",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-1",
        "d-3"
      ],
      "isTrap": false,
      "requires": [
        "e-1"
      ],
      "investigationResults": {
        "request_original": "온보딩 포털 출력 문서와 교통카드 충전 영수증을 대조한 결과 일치한다. 같은 출처, 같은 시기 문서다.",
        "check_metadata": "문서 생성 시각이 모두 비상금 인출 후 48시간 안에 몰려 있다. 인출과 사용이 거의 동시에 이루어졌다.",
        "restore_context": "복장 규정에 '수습 4주간 외부 미팅 시 정장 필수'라고 명시. 교통비 일부는 익월 정산 — 당장 본인이 먼저 써야 하는 구조다.",
        "verify_source": "인사 포털 문서 링크가 유효하고, 인사팀 담당자가 현행 버전임을 확인해줬다.",
        "check_edits": "전자문서 디지털 서명값이 유효하다. 다운로드 이후 한 글자도 수정되지 않았다.",
        "question_acquisition": "사내 문서라 외부 공개에 제한이 있지만, 지출 사유 입증 범위 내에서 제출됐으므로 적법하다."
      },
      "subjectParty": "a",
      "timing": {
        "intent": "contextualize",
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
          "context",
          "motive"
        ],
        "blockedVectorsHelp": [
          "context",
          "identity"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "M3",
            "multiplier": 1.38,
            "note": "사치 프레임을 수습 필수 복장으로 뒤집는 기준 문서다."
          }
        ]
      }
    },
    {
      "id": "e-3",
      "name": "인호가 캡처한 카드 승인 알림 묶음",
      "description": "인호가 새벽 1시 18분에 유진 잠금 화면을 촬영한 이미지다. 백화점 카드 승인 알림이 연달아 보이지만 품목이나 회사 보전 여부는 알 수 없다.",
      "type": "device_log",
      "reliability": "soft",
      "completeness": "cropped",
      "provenance": "personal_device",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-3"
      ],
      "isTrap": true,
      "requires": [],
      "investigationResults": {
        "request_original": "잠금 화면 승인 알림 캡처본뿐이다. 전체 명세서가 없어 구매 품목과 보전 여부는 이것만으로 알 수 없다.",
        "check_metadata": "촬영 시각이 새벽 1시 18분이다. 유진이 잠든 사이에 잠금 화면을 촬영한 것으로 보인다.",
        "restore_context": "금액과 상호는 보이지만 무엇을 샀는지, 회사 보전 항목인지는 알림만으로 알 수 없다.",
        "verify_source": "유진 폰 잠금 화면을 인호가 자기 폰 카메라로 직접 촬영한 것이다. 스크린샷이 아니라 '화면을 찍은 사진'이다.",
        "check_edits": "금액 조작 흔적은 없다. 다만 백화점 건만 골라 크롭한 선택적 편집이 확인된다. 다른 알림은 의도적으로 빠져 있다.",
        "question_acquisition": "새벽에 잠든 배우자의 잠금 화면을 무단 촬영한 자료다. 잠금을 풀지는 않았지만 사생활 침해 소지가 있다."
      },
      "subjectParty": "a",
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
            "multiplier": 1.43,
            "note": "알림만으로 품목과 보전 여부를 알 수 없음을 먼저 짚는다."
          }
        ]
      }
    },
    {
      "id": "e-4",
      "name": "회사 복장 가이드와 복지비 지급 공지",
      "description": "유진의 첫 출근 전날 회사가 보낸 사내 메일이다. 정장·구두 필수가 명시돼 있고, 교통비와 업무복 일부는 익월 복지비로 보전된다고 안내돼 있다.",
      "type": "email",
      "reliability": "soft",
      "completeness": "partial",
      "provenance": "platform",
      "legitimacy": "lawful",
      "proves": [
        "d-3"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "사내 메일 헤더(발신자, 수신자, 시각)와 본문이 회사 메일 서버 원본과 일치한다.",
        "check_metadata": "메일 발송 시각이 첫 출근 전날 오후다. 회사가 사전 안내했고, 유진이 정장을 미리 준비할 이유가 있었다.",
        "restore_context": "정장·구두가 '권장'이 아니라 '외부 미팅 시 필수'로 명시돼 있다. 유진의 결제가 업무 지시에 따른 것이었음을 방증한다.",
        "verify_source": "발신 주소가 회사 공식 도메인이고 정책 문서 링크도 유효하다. 실제 회사가 보낸 공식 안내 메일이다.",
        "check_edits": "유진이 전달한 메일이라 원래 스레드 전체는 없다. 다만 전달된 본문 자체에 조작이나 편집 흔적은 없다.",
        "question_acquisition": "사내 메일이라 외부 제출에 제한이 있지만, 지출 사유 입증 목적에 한정해 제출됐으므로 적법하다."
      },
      "subjectParty": "a",
      "timing": {
        "intent": "corroborate",
        "role": "reframe",
        "bestAtStates": [
          "M2",
          "M3",
          "S2"
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
            "disputeId": "d-3",
            "state": "M3",
            "multiplier": 1.36,
            "note": "권장이 아니라 필수라는 복장 기준을 못 박는다."
          }
        ]
      }
    },
    {
      "id": "e-5",
      "name": "적금 자동이체 변경기록과 건조기 할부 계약서",
      "description": "인호가 적금 자동이체를 두 달 정지한 은행 기록과, 같은 주 84만원 건조기 할부 계약서다. 적금을 멈춘 돈으로 초회금을 낸 흐름이 읽힌다.",
      "type": "contract",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "mixed",
      "legitimacy": "lawful",
      "proves": [
        "d-2",
        "d-4",
        "d-5"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "은행 이체변경 로그에서 정지 시각과 사유가 확인되고, 할부 계약서와 시간순으로 이어진다. 적금을 멈추고 건조기를 산 흐름이 읽힌다.",
        "check_metadata": "자동이체 정지와 건조기 계약이 같은 날 오후, 2시간 간격이다. 적금을 멈춰 현금을 확보하고 바로 계약한 순서다.",
        "restore_context": "인호는 적금을 멈춰 월 25만원 여유를 만들고 건조기 초회금을 결제했다. 충동이 아니라 계산된 판단 — 다만 유진에게 말하지 않았을 뿐.",
        "verify_source": "은행 이체변경 기록과 가전 판매점 할부 계약서를 교차 검증했다. 금액, 날짜, 계약자 이름이 일치한다. 조작 가능성 없음.",
        "check_edits": "은행 변경 로그와 판매점 계약서 모두 기관 원본이다. 편집이나 변조 여지가 없다.",
        "question_acquisition": "인호 본인 명의 은행 기록과 본인이 체결한 할부 계약서를 자발적으로 제출했다. 취득 경위에 문제없다."
      },
      "subjectParty": "b",
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
          "fact_pursuit",
          "evidence_present"
        ],
        "preferredAngles": [
          "timeline",
          "legality"
        ],
        "blockedVectorsHelp": [
          "legality",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-2",
            "state": "S2",
            "multiplier": 1.35,
            "note": "적금 정지와 건조기 할부가 한 흐름이었음을 확정한다."
          }
        ]
      }
    },
    {
      "id": "e-6",
      "name": "생활비 메모장과 건조기 배송 완료 문자",
      "description": "인호 메모앱의 '첫 급여 들어오면 적금 다시 채움, 건조기 할부 3회차부터 정상 납부' 메모와 배송 완료 문자다. 나름의 계획은 있었지만 유진에게는 공유하지 않았다.",
      "type": "chat",
      "reliability": "soft",
      "completeness": "original",
      "provenance": "personal_device",
      "legitimacy": "lawful",
      "proves": [
        "d-2",
        "d-4",
        "d-5"
      ],
      "isTrap": false,
      "requires": [
        "e-5"
      ],
      "investigationResults": {
        "request_original": "인호 폰 메모앱 원본과 배송 완료 문자를 함께 확인했다. 메모 내용과 배송 일자가 시간순으로 맞아떨어진다.",
        "check_metadata": "메모 작성 시각이 적금 정지 당일 밤 11시 47분이다. 멈춘 직후 '어떻게 메울 것인가'를 정리한 것으로 보인다.",
        "restore_context": "메모에 '적금 정지 → 건조기 초회금 → 급여 후 재개' 순서가 적혀 있다. 계획은 있었지만 유진과의 상의는 빠져 있다.",
        "verify_source": "인호 기기 클라우드 백업본과 통신사 문자 서버 기록을 대조한 결과 일치한다. 진본이다.",
        "check_edits": "메모앱 수정 이력에 편집이 두 차례 있지만 금액이나 핵심 문구 변경은 없다. 오탈자 수정 정도다.",
        "question_acquisition": "인호가 자발적으로 제출한 개인 기기 자료다. 취득 경위에 문제없다."
      },
      "subjectParty": "b",
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
          "context",
          "responsibility"
        ],
        "blockedVectorsHelp": [
          "context",
          "responsibility"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-5",
            "state": "S3",
            "multiplier": 1.29,
            "note": "계획은 있었지만 상의가 빠졌다는 구조를 보여 준다."
          }
        ]
      }
    }
  ],
  "freeQuestionHooks": [
    {
      "id": "fq:d-1:onboarding_chain",
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
          "spouse03:a:d-1:context:1",
          "spouse03:a:d-1:admission:0",
          "spouse03:a:d-1:context:0"
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
      "id": "fq:d-2:pause_flow",
      "intentTag": "causal_link",
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
          "spouse03:b:d-2:context:1",
          "spouse03:b:d-2:admission:0",
          "spouse03:b:d-2:context:0"
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
      "id": "fq:d-3:alert_limit",
      "intentTag": "identity_check",
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
          "spouse03:b:d-3:admission:0",
          "spouse03:b:d-3:admission:1",
          "spouse03:b:d-3:context:1"
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
      "id": "fq:d-4:threshold_boundary",
      "intentTag": "rule_check",
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
        "disputeId": "d-4",
        "allowAtomIds": [
          "spouse03:a:d-4:rule:0",
          "spouse03:a:d-4:rule:2",
          "spouse03:a:d-4:admission:0"
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
      "id": "fq:d-5:shared_gap_chain",
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
          "spouse03:b:d-5:context:1",
          "spouse03:b:d-5:relationship:1",
          "spouse03:b:d-5:admission:0"
        ],
        "preferredAngleTags": [
          "context",
          "responsibility"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 단정해서 말하면 더 왜곡됩니다.",
        "먼저 연결된 사실부터 맞춰야 그 부분도 답할 수 있습니다."
      ]
    },
    {
      "id": "fq:d-5:pride_cost",
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
          "spouse03:b:d-5:emotion:0",
          "spouse03:b:d-5:relationship:1",
          "spouse03:b:d-5:responsibility:2"
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
        "grantFlag": "d-4:surface:withdrawal_rule_seen"
      },
      "uiLabel": "160만원이 넘긴 선"
    },
    {
      "id": "link:d-2:d-4:supports",
      "fromDisputeId": "d-2",
      "toDisputeId": "d-4",
      "type": "supports",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 10,
        "grantFlag": "d-4:surface:installment_rule_seen"
      },
      "uiLabel": "적금 정지와 할부"
    },
    {
      "id": "link:d-1:d-5:supports",
      "fromDisputeId": "d-1",
      "toDisputeId": "d-5",
      "type": "supports",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 10,
        "grantFlag": "d-5:surface:withdrawal_gap_seen"
      },
      "uiLabel": "인출이 만든 공백"
    },
    {
      "id": "link:d-2:d-5:supports",
      "fromDisputeId": "d-2",
      "toDisputeId": "d-5",
      "type": "supports",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 10,
        "grantFlag": "d-5:surface:pause_gap_seen"
      },
      "uiLabel": "정지와 할부의 공백"
    },
    {
      "id": "link:d-3:d-5:weakens_counter",
      "fromDisputeId": "d-3",
      "toDisputeId": "d-5",
      "type": "weakens_counter",
      "when": {
        "minState": "S3",
        "minLayer": "motive"
      },
      "effect": {
        "supportBonus": 9,
        "grantFlag": "d-5:motive:luxury_frame_broken"
      },
      "uiLabel": "사치 프레임 붕괴"
    }
  ],
  "proposedUnlockAtoms": []
} as const;
