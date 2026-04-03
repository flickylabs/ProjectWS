export const tenant_07_structure_v2 = {
  "caseId": "tenant-07",
  "schemaVersion": "structure_v2",
  "disputes": [
    {
      "id": "d-1",
      "name": "4% 인상 재계약 사전 합의의 존재",
      "truth": true,
      "truthDescription": "도형과 하나는 중개사 입회 아래 4% 인상과 2년 재계약 방향을 이미 먼저 정리했고, 남은 것은 서명과 자동이체 날짜 맞춤에 가까웠다.",
      "quadrant": "both_know",
      "requiredEvidence": [
        "e-2",
        "e-5"
      ],
      "correctResponsibility": {
        "a": 35,
        "b": 65
      },
      "ambiguity": "low",
      "weight": "high",
      "mediationLink": "증액합의복구",
      "legitimacyIssue": false,
      "judgmentStatement": "도형과 하나는 4% 인상 합의했다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "4% 인상",
        "2년 재계약",
        "4%에서 정리",
        "중개사 사무실",
        "갱신 초안 PDF",
        "서류만 맞추자",
        "사전 합의"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "「4% 인상 재계약 사전 합의의 존재」의 겉으로 드러난 주장과 시간순서를 본다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "tenant07:a:d-1:act:2",
            "tenant07:a:d-1:rule:3",
            "tenant07:b:d-1:act:2",
            "tenant07:a:d-1:rule:2",
            "tenant07:a:d-1:context:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "「4% 인상 재계약 사전 합의의 존재」 뒤에 깔린 체면, 방어, 압박을 드러낸다.",
          "lockedSummary": "왜 그렇게 해석하고 밀어붙였는지는 아직 흐릿합니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "tenant07:a:d-1:act:4",
            "tenant07:a:d-1:rule:4",
            "tenant07:a:d-1:context:2",
            "tenant07:b:d-1:motive:2",
            "tenant07:b:d-1:motive:3"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "「4% 인상 재계약 사전 합의의 존재」이 다른 쟁점과 어떻게 이어지는지 본다.",
          "lockedSummary": "관계의 핵심 고리까지는 아직 닿지 못했습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-1:motive:responsibility_named",
              "d-5:core:prior_agreement_confirmed"
            ]
          },
          "revealAtomIds": [
            "tenant07:a:d-1:act:5",
            "tenant07:a:d-1:rule:5",
            "tenant07:a:d-1:context:3",
            "tenant07:a:d-1:context:4",
            "tenant07:a:d-1:rule:2",
            "tenant07:b:d-1:act:5"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-2",
      "name": "진우가 말한 고액 새 임차인 문의의 실체",
      "truth": false,
      "truthDescription": "진우가 전한 12% 인상 수용 문의는 실제 예약금이나 확정 의사가 없는 탐색 수준이었고, 도형은 이를 거의 성사된 대안처럼 받아들여 기존 합의를 흔들었다.",
      "quadrant": "neither_knows",
      "requiredEvidence": [
        "e-4",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 30,
        "b": 70
      },
      "ambiguity": "low",
      "weight": "high",
      "mediationLink": "제3자개입정리",
      "legitimacyIssue": false,
      "judgmentStatement": "진우의 문의는 탐색 수준이었다.",
      "disputeKind": "red_herring",
      "disputeAliases": [
        "12% 문의",
        "권진우",
        "공실 문의표",
        "예약금 없음",
        "가예약 없음",
        "새 임차인",
        "시세 압박"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "「진우가 말한 고액 새 임차인 문의의 실체」의 겉으로 드러난 주장과 시간순서를 본다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "tenant07:a:d-2:context:3",
            "tenant07:a:d-2:counter:2",
            "tenant07:b:d-2:context:2",
            "tenant07:b:d-2:self_justification:2",
            "tenant07:b:d-2:fear:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "「진우가 말한 고액 새 임차인 문의의 실체」 뒤에 깔린 체면, 방어, 압박을 드러낸다.",
          "lockedSummary": "왜 그렇게 해석하고 밀어붙였는지는 아직 흐릿합니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "tenant07:b:d-2:context:4",
            "tenant07:b:d-2:self_justification:4",
            "tenant07:b:d-2:fear:2",
            "tenant07:a:d-2:fear:1",
            "tenant07:a:d-2:fear:3",
            "tenant07:b:d-2:fear:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "「진우가 말한 고액 새 임차인 문의의 실체」이 다른 쟁점과 어떻게 이어지는지 본다.",
          "lockedSummary": "관계의 핵심 고리까지는 아직 닿지 못했습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-2:motive:misbelief_named",
              "d-5:motive:alternative_offer_deflated"
            ]
          },
          "revealAtomIds": [
            "tenant07:b:d-2:context:5",
            "tenant07:b:d-2:self_justification:5",
            "tenant07:b:d-2:fear:3",
            "tenant07:b:d-2:fear:4",
            "tenant07:a:d-2:counter:5",
            "tenant07:b:d-2:context:2",
            "tenant07:b:d-2:self_justification:2",
            "tenant07:b:d-2:fear:0",
            "tenant07:b:d-2:context:3",
            "tenant07:b:d-2:self_justification:3",
            "tenant07:b:d-2:fear:1"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "misconception": {
        "beliefModeByParty": {
          "a": "suspects",
          "b": "weaponizes"
        },
        "stages": [
          {
            "state": "M0",
            "summary": "외형상 의심",
            "npcMode": "confused_defensive"
          },
          {
            "state": "M1",
            "summary": "방어/당황",
            "npcMode": "mistaken_certainty"
          },
          {
            "state": "M2",
            "summary": "잘못된 해석 고착",
            "npcMode": "mistaken_certainty"
          },
          {
            "state": "M3",
            "summary": "혼란/확신 약화",
            "npcMode": "doubt_creeping"
          },
          {
            "state": "M4",
            "summary": "오해 해소",
            "npcMode": "clarified"
          }
        ],
        "trapSignals": [
          "예약금 없는 탐색 문의를 곧바로 대체 계약처럼 부름",
          "문의표 일부만 붙여 고액 인상안의 정당화 근거처럼 씀",
          "시세 일반론을 문의 강도와 의도적으로 섞어 말함"
        ],
        "truthExitEvidenceIds": [
          "e-4",
          "e-6"
        ],
        "clarifyOutcomeLabel": "오해 해소"
      }
    },
    {
      "id": "d-3",
      "name": "하나의 재계약 서명본 전달 지연",
      "truth": true,
      "truthDescription": "하나는 보증인 변경 상담과 자동이체 조정 문제로 중개사가 요청한 서명본을 사흘 늦게 보냈다.",
      "quadrant": "a_only",
      "requiredEvidence": [
        "e-1",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 70,
        "b": 30
      },
      "ambiguity": "none",
      "weight": "medium",
      "mediationLink": "재계약절차복구",
      "legitimacyIssue": false,
      "judgmentStatement": "하나는 서명본을 사흘 늦게 보냈다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "사흘 지연",
        "서명본",
        "보증인 상담",
        "자동이체 날짜",
        "메일 헤더",
        "초안 수신 후 사흘",
        "발송 기록"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "「하나의 재계약 서명본 전달 지연」의 겉으로 드러난 주장과 시간순서를 본다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "tenant07:a:d-3:timeline:2",
            "tenant07:a:d-3:responsibility:2",
            "tenant07:a:d-3:shame:0",
            "tenant07:a:d-3:responsibility:3",
            "tenant07:a:d-3:timeline:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "「하나의 재계약 서명본 전달 지연」 뒤에 깔린 체면, 방어, 압박을 드러낸다.",
          "lockedSummary": "왜 그렇게 해석하고 밀어붙였는지는 아직 흐릿합니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "tenant07:a:d-3:timeline:4",
            "tenant07:a:d-3:responsibility:4",
            "tenant07:a:d-3:shame:2",
            "tenant07:a:d-3:shame:1",
            "tenant07:a:d-3:shame:3"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "「하나의 재계약 서명본 전달 지연」이 다른 쟁점과 어떻게 이어지는지 본다.",
          "lockedSummary": "관계의 핵심 고리까지는 아직 닿지 못했습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "S4"
              },
              {
                "id": "d-1",
                "minState": "S3"
              }
            ],
            "requireFlags": [
              "d-3:motive:responsibility_named",
              "d-1:motive:delay_gap_named"
            ]
          },
          "revealAtomIds": [
            "tenant07:a:d-3:timeline:5",
            "tenant07:a:d-3:responsibility:5",
            "tenant07:a:d-3:shame:3",
            "tenant07:a:d-3:shame:4",
            "tenant07:a:d-3:responsibility:2",
            "tenant07:a:d-3:timeline:2",
            "tenant07:a:d-3:shame:0",
            "tenant07:a:d-3:timeline:3",
            "tenant07:a:d-3:responsibility:3",
            "tenant07:a:d-3:shame:1"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-4",
      "name": "과거 자전거·분리배출 경고의 현재 효력",
      "truth": true,
      "truthDescription": "2년 전 복도 자전거 주차와 분리배출 경고는 한 차례 있었지만 이후 재발 기록은 없었다. 하나가 '전혀 없었다'고 말하는 것도, 도형이 '반복 문제였다'고 말하는 것도 모두 과장이다.",
      "quadrant": "both_know",
      "requiredEvidence": [
        "e-3"
      ],
      "correctResponsibility": {
        "a": 45,
        "b": 55
      },
      "ambiguity": "low",
      "weight": "medium",
      "mediationLink": "과거분리",
      "legitimacyIssue": true,
      "judgmentStatement": "경고 이후 재발 기록은 없다.",
      "disputeKind": "shared_misconception",
      "disputeAliases": [
        "복도 자전거",
        "분리배출 경고",
        "2년 전 여름",
        "종결 기록",
        "재접수 없음",
        "한 차례"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "「과거 자전거·분리배출 경고의 현재 효력」의 겉으로 드러난 주장과 시간순서를 본다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "tenant07:a:d-4:context:2",
            "tenant07:b:d-4:context:2",
            "tenant07:a:d-4:counter:2",
            "tenant07:a:d-4:shame:0",
            "tenant07:a:d-4:context:3",
            "tenant07:a:d-4:counter:3",
            "tenant07:a:d-4:shame:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "「과거 자전거·분리배출 경고의 현재 효력」 뒤에 깔린 체면, 방어, 압박을 드러낸다.",
          "lockedSummary": "왜 그렇게 해석하고 밀어붙였는지는 아직 흐릿합니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-4",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "tenant07:a:d-4:context:4",
            "tenant07:a:d-4:counter:4",
            "tenant07:a:d-4:shame:2",
            "tenant07:b:d-4:context:4",
            "tenant07:b:d-4:self_justification:4",
            "tenant07:b:d-4:fear:2",
            "tenant07:a:d-4:shame:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "「과거 자전거·분리배출 경고의 현재 효력」이 다른 쟁점과 어떻게 이어지는지 본다.",
          "lockedSummary": "관계의 핵심 고리까지는 아직 닿지 못했습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-4",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-4:motive:misbelief_named",
              "d-5:motive:legacy_issue_separated"
            ]
          },
          "revealAtomIds": [
            "tenant07:a:d-4:context:5",
            "tenant07:a:d-4:counter:5",
            "tenant07:a:d-4:shame:3",
            "tenant07:a:d-4:shame:4",
            "tenant07:b:d-4:context:5",
            "tenant07:b:d-4:self_justification:5",
            "tenant07:b:d-4:fear:3",
            "tenant07:b:d-4:fear:4",
            "tenant07:a:d-4:counter:2",
            "tenant07:a:d-4:context:2",
            "tenant07:a:d-4:shame:0"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "misconception": {
        "beliefModeByParty": {
          "a": "misbelief",
          "b": "weaponizes"
        },
        "stages": [
          {
            "state": "M0",
            "summary": "외형상 의심",
            "npcMode": "confused_defensive"
          },
          {
            "state": "M1",
            "summary": "방어/당황",
            "npcMode": "mistaken_certainty"
          },
          {
            "state": "M2",
            "summary": "잘못된 해석 고착",
            "npcMode": "mistaken_certainty"
          },
          {
            "state": "M3",
            "summary": "혼란/확신 약화",
            "npcMode": "doubt_creeping"
          },
          {
            "state": "M4",
            "summary": "오해 해소",
            "npcMode": "clarified"
          }
        ],
        "trapSignals": [
          "2년 전 한 차례 경고를 현재 신뢰 문제처럼 다시 호명함",
          "\"전혀 없었다\"는 전면 부정으로 스스로 방어 틈을 넓힘",
          "현재 증액 요구와 과거 생활 민원을 한 문장으로 묶음"
        ],
        "truthExitEvidenceIds": [
          "e-3"
        ],
        "clarifyOutcomeLabel": "오해 해소"
      }
    },
    {
      "id": "d-5",
      "name": "도형의 12% 인상·추가 조건 통보",
      "truth": true,
      "truthDescription": "도형이 사전 합의 뒤 다시 요구한 12% 인상, 주차비 별도 요금, 부분 도배 선납 조건은 기존 합의와 갱신 흐름을 넘어서는 일방 변경이었다.",
      "quadrant": "b_only",
      "requiredEvidence": [
        "e-1",
        "e-2",
        "e-5"
      ],
      "correctResponsibility": {
        "a": 20,
        "b": 80
      },
      "ambiguity": "none",
      "weight": "high",
      "mediationLink": "증액합의복구",
      "legitimacyIssue": false,
      "judgmentStatement": "도형의 12% 인상 요구는 일방 변경이다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "12% 인상",
        "주차비 별도",
        "부분 도배 선납",
        "번복 통보",
        "기존 합의",
        "추가 조건",
        "재협상"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "「도형의 12% 인상·추가 조건 통보」의 겉으로 드러난 주장과 시간순서를 본다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "tenant07:a:d-5:act:2",
            "tenant07:a:d-5:rule:3",
            "tenant07:b:d-5:act:2",
            "tenant07:b:d-5:self_justification:2",
            "tenant07:b:d-5:fear:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "「도형의 12% 인상·추가 조건 통보」 뒤에 깔린 체면, 방어, 압박을 드러낸다.",
          "lockedSummary": "왜 그렇게 해석하고 밀어붙였는지는 아직 흐릿합니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-5",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "tenant07:b:d-5:act:4",
            "tenant07:b:d-5:self_justification:4",
            "tenant07:b:d-5:fear:2",
            "tenant07:a:d-5:fear:1",
            "tenant07:a:d-5:fear:3",
            "tenant07:b:d-5:fear:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "「도형의 12% 인상·추가 조건 통보」이 다른 쟁점과 어떻게 이어지는지 본다.",
          "lockedSummary": "관계의 핵심 고리까지는 아직 닿지 못했습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-5",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-5:motive:responsibility_named",
              "d-5:core:prior_agreement_confirmed"
            ]
          },
          "revealAtomIds": [
            "tenant07:b:d-5:act:5",
            "tenant07:b:d-5:self_justification:5",
            "tenant07:b:d-5:fear:3",
            "tenant07:b:d-5:fear:4",
            "tenant07:b:d-5:act:2",
            "tenant07:b:d-5:self_justification:2",
            "tenant07:b:d-5:fear:0",
            "tenant07:a:d-5:act:5",
            "tenant07:a:d-5:rule:2"
          ],
          "uiStyle": "relation_core"
        }
      ]
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "name": "기존 임대차계약서와 갱신 초안",
      "description": "현재 계약서 원본과, 중개사가 작성해 보낸 재계약 초안 PDF 및 서명란 메모다.",
      "type": "contract",
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
        "request_original": "원본 계약서와 중개사 발송 PDF 원문이 모두 제출돼 문구를 바로 대조할 수 있었다.",
        "check_metadata": "갱신 초안은 합의 당일 저녁에 생성됐고, 서명란만 비어 있는 상태로 저장돼 있었다.",
        "restore_context": "초안에는 4% 인상 금액과 시작일 후보가 적혀 있어 협의가 단순 문의 단계를 넘겼음을 보여준다.",
        "verify_source": "중개사 메일 헤더와 계약서 서명, 도장이 실제 보관본과 일치한다.",
        "check_edits": "문장 덧씌움이나 재작성 흔적 없이 최초 발송본 상태가 유지돼 있다.",
        "question_acquisition": "당사자 계약 관련 문서라 제출 절차상 정당성 문제는 낮다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "유하나에게: \"하나의 재계약 서명본 전달 지연\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 유하나의 \"하나의 재계약 서명본 전달 지연\" 쟁점과 관련된다. 유하나은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "권도형에게: \"도형의 12% 인상·추가 조건 통보\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 권도형의 \"도형의 12% 인상·추가 조건 통보\" 쟁점과 관련된다. 권도형은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "contextualize",
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
          "legality",
          "context"
        ],
        "blockedVectorsHelp": [
          "legality",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "S2",
            "multiplier": 1.25,
            "note": "하나의 재계약 서명본 전달 지연을 legality 축에서 정리할 때 효율이 높습니다."
          },
          {
            "disputeId": "d-5",
            "state": "S3",
            "multiplier": 1.3,
            "note": "도형의 12% 인상·추가 조건 통보을 context 축에서 정리할 때 효율이 높습니다."
          }
        ]
      }
    },
    {
      "id": "e-2",
      "name": "중개사 3자 카카오톡 캡처",
      "description": "하나, 도형, 중개사가 함께 있던 대화방에서 인상률과 재계약 일정이 오간 일부 캡처다.",
      "type": "chat",
      "reliability": "soft",
      "completeness": "cropped",
      "provenance": "personal_device",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-1",
        "d-5"
      ],
      "isTrap": true,
      "requires": [],
      "investigationResults": {
        "request_original": "처음엔 각자 자신에게 유리한 부분만 잘라 제출했고, 이후 전체 대화 일부가 추가됐다.",
        "check_metadata": "캡처 생성 시각은 인상 번복 통보 직후로 남아 있어 사후 정리용 편집 가능성을 먼저 점검해야 했다.",
        "restore_context": "전체 문맥에는 '4%에서 정리하고 서류만 맞추자'는 문장이 앞뒤로 이어져 있어 단순 문의처럼만 볼 수 없었다.",
        "verify_source": "세 사람의 단말에서 메시지 순서와 읽음 시각이 대체로 일치한다.",
        "check_edits": "본문 편집 흔적은 없지만 앞뒤 몇 줄이 빠져 해석이 달라지는 선택적 크롭이 확인됐다.",
        "question_acquisition": "당사자와 중개사가 함께 있는 대화라 제3자 발언 공유에는 사생활 주의가 필요하다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "유하나에게: \"4% 인상 재계약 사전 합의의 존재\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 유하나의 \"4% 인상 재계약 사전 합의의 존재\" 쟁점과 관련된다. 유하나은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "권도형에게: \"도형의 12% 인상·추가 조건 통보\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 권도형의 \"도형의 12% 인상·추가 조건 통보\" 쟁점과 관련된다. 권도형은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "disarm_trap",
        "role": "impeach",
        "bestAtStates": [
          "S2",
          "S3"
        ],
        "weakAtStates": [
          "S0"
        ],
        "preferredQuestionTypes": [
          "evidence_present",
          "fact_pursuit"
        ],
        "preferredAngles": [
          "identity",
          "context"
        ],
        "blockedVectorsHelp": [
          "identity",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S2",
            "multiplier": 1.25,
            "note": "4% 인상 재계약 사전 합의의 존재을 identity 축에서 정리할 때 효율이 높습니다."
          },
          {
            "disputeId": "d-5",
            "state": "S3",
            "multiplier": 1.3,
            "note": "도형의 12% 인상·추가 조건 통보을 context 축에서 정리할 때 효율이 높습니다."
          }
        ]
      }
    },
    {
      "id": "e-3",
      "name": "관리사무소 과거 민원 종결 기록",
      "description": "복도 자전거 주차와 분리배출 경고가 한 번 접수된 뒤 사과와 정리 후 종결됐다는 관리사무소 기록이다.",
      "type": "record",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-4"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "민원대장 원본과 종결 메모가 함께 제출돼 접수와 종료 흐름을 확인할 수 있었다.",
        "check_metadata": "접수일은 2년 전 여름 한 차례뿐이고 이후 같은 항목 재접수는 없었다.",
        "restore_context": "기록은 '복도 자전거 이동 및 분리배출 재안내' 수준으로 적혀 있어 상습 문제와는 거리가 있다.",
        "verify_source": "관리사무소 문서등록번호와 당시 안내문 사본이 서로 일치했다.",
        "check_edits": "종결 메모 덧붙임이나 삭제 흔적은 보이지 않았다.",
        "question_acquisition": "건물 관리기록이라 분쟁 해결 목적 범위에서 적법성 문제는 낮다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "유하나에게: \"과거 자전거·분리배출 경고의 현재 효력\" 관련 해명 요구 (방어 동기: 수치심 회피)",
          "implication": "이 증거는 유하나의 \"과거 자전거·분리배출 경고의 현재 효력\" 쟁점과 관련된다. 유하나은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "권도형에게: \"과거 자전거·분리배출 경고의 현재 효력\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 권도형의 \"과거 자전거·분리배출 경고의 현재 효력\" 쟁점과 관련된다. 권도형은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "corroborate",
        "role": "reframe",
        "bestAtStates": [
          "S2",
          "S3"
        ],
        "weakAtStates": [
          "S0"
        ],
        "preferredQuestionTypes": [
          "evidence_present",
          "fact_pursuit"
        ],
        "preferredAngles": [
          "timeline",
          "legality"
        ],
        "blockedVectorsHelp": [
          "timeline",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-4",
            "state": "S2",
            "multiplier": 1.25,
            "note": "과거 자전거·분리배출 경고의 현재 효력을 timeline 축에서 정리할 때 효율이 높습니다."
          }
        ]
      }
    },
    {
      "id": "e-4",
      "name": "진우-중개사 문자와 공실 문의표",
      "description": "진우가 중개사에게 더 높은 금액 문의를 전달한 문자와, 실제로는 예약금이 없는 탐색 문의만 적힌 공실 문의표다.",
      "type": "chat",
      "reliability": "soft",
      "completeness": "original",
      "provenance": "personal_device",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-2"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "진우 휴대폰 메시지 원본과 중개사 문의표 사진이 함께 제출됐다.",
        "check_metadata": "문자 발신 시각은 도형의 증액 번복 통보 두 시간 전으로 확인된다.",
        "restore_context": "문의표에는 '가능 금액 문의'만 있을 뿐 계약 의사 확인이나 가예약 표시가 없다.",
        "verify_source": "중개사 일정표와 진우의 메시지 기록 시간이 서로 맞아떨어진다.",
        "check_edits": "메시지 본문 조작 흔적은 없고 문의표도 원본 촬영 파일이다.",
        "question_acquisition": "가족과 중개사 사이 사적 대화라 공개 범위는 분쟁 관련 부분으로 제한돼야 한다."
      },
      "subjectParty": "b",
      "timing": {
        "intent": "expose",
        "role": "reframe",
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
          "context",
          "identity"
        ],
        "blockedVectorsHelp": [
          "identity",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-2",
            "state": "S2",
            "multiplier": 1.25,
            "note": "진우가 말한 고액 새 임차인 문의의 실체을 context 축에서 정리할 때 효율이 높습니다."
          }
        ]
      }
    },
    {
      "id": "e-5",
      "name": "중개사 상담 녹음 요약과 일정표",
      "description": "재계약 협의 직후 남서희가 남긴 음성메모 요약과, 4% 인상안으로 서류를 보내기로 적힌 일정표다.",
      "type": "record",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "personal_device",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-1",
        "d-5"
      ],
      "isTrap": false,
      "requires": [
        "e-2"
      ],
      "investigationResults": {
        "request_original": "중개사의 음성메모 원본과 일정표 캘린더 파일이 모두 제출됐다.",
        "check_metadata": "메모와 일정표는 같은 저녁 연속으로 생성돼 협의 직후 정리본임이 확인된다.",
        "restore_context": "녹음 요약에는 '4%로 먼저 묶고 서명본 받기'라는 표현이 들어 있어 사전 합의의 성격을 강하게 뒷받침한다.",
        "verify_source": "캘린더 기록과 중개사 사무실 PC 일정 로그가 일치한다.",
        "check_edits": "오디오 컷 편집 흔적은 없고 캘린더 수정 이력도 없다.",
        "question_acquisition": "제3자인 중개사 개인 메모라 활용 범위에 신중함이 필요하지만, 분쟁 핵심과 직접 관련된다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "유하나에게: \"4% 인상 재계약 사전 합의의 존재\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 유하나의 \"4% 인상 재계약 사전 합의의 존재\" 쟁점과 관련된다. 유하나은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "권도형에게: \"도형의 12% 인상·추가 조건 통보\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 권도형의 \"도형의 12% 인상·추가 조건 통보\" 쟁점과 관련된다. 권도형은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
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
          "evidence_present",
          "fact_pursuit"
        ],
        "preferredAngles": [
          "timeline",
          "context"
        ],
        "blockedVectorsHelp": [
          "timeline",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S2",
            "multiplier": 1.25,
            "note": "4% 인상 재계약 사전 합의의 존재을 timeline 축에서 정리할 때 효율이 높습니다."
          },
          {
            "disputeId": "d-5",
            "state": "S3",
            "multiplier": 1.3,
            "note": "도형의 12% 인상·추가 조건 통보을 context 축에서 정리할 때 효율이 높습니다."
          }
        ]
      }
    },
    {
      "id": "e-6",
      "name": "서명본 발송 메일 기록과 신규 예약금 부재 확인서",
      "description": "하나가 서명본을 보낸 이메일 시각과, 문제의 고액 문의에 실제 예약금이 없었다는 중개사 확인서다.",
      "type": "record",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-2",
        "d-3"
      ],
      "isTrap": false,
      "requires": [
        "e-4"
      ],
      "investigationResults": {
        "request_original": "이메일 헤더 원본과 중개사 날인 확인서가 함께 제출됐다.",
        "check_metadata": "하나의 서명본 발송은 초안 수신 후 정확히 사흘 뒤였고, 고액 문의에는 그 전후로 어떤 예약금도 들어오지 않았다.",
        "restore_context": "서명 지연은 실제로 있었지만, 도형이 말한 '이미 다른 사람과 거의 됐다'는 상황은 확인되지 않았다.",
        "verify_source": "메일 서버 기록과 중개사 회계 장부의 예약금 부재 내역이 서로 맞는다.",
        "check_edits": "발송 시각과 파일 첨부 이력에 편집 흔적이 없다.",
        "question_acquisition": "기관 확인서와 당사자 메일 기록이라 적법성 문제는 낮다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "유하나에게: \"하나의 재계약 서명본 전달 지연\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 유하나의 \"하나의 재계약 서명본 전달 지연\" 쟁점과 관련된다. 유하나은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "권도형에게: \"진우가 말한 고액 새 임차인 문의의 실체\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 권도형의 \"진우가 말한 고액 새 임차인 문의의 실체\" 쟁점과 관련된다. 권도형은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
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
          "evidence_present",
          "fact_pursuit"
        ],
        "preferredAngles": [
          "timeline",
          "context"
        ],
        "blockedVectorsHelp": [
          "timeline",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-2",
            "state": "S2",
            "multiplier": 1.25,
            "note": "진우가 말한 고액 새 임차인 문의의 실체을 timeline 축에서 정리할 때 효율이 높습니다."
          },
          {
            "disputeId": "d-3",
            "state": "S3",
            "multiplier": 1.3,
            "note": "하나의 재계약 서명본 전달 지연을 context 축에서 정리할 때 효율이 높습니다."
          }
        ]
      }
    }
  ],
  "linkEdges": [
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
        "supportBonus": 12,
        "grantFlag": "d-5:core:prior_agreement_confirmed"
      },
      "uiLabel": "기존 합의 확인"
    },
    {
      "id": "link:d-2:d-5:weakens_counter",
      "fromDisputeId": "d-2",
      "toDisputeId": "d-5",
      "type": "weakens_counter",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "counterPenalty": 10,
        "grantFlag": "d-5:motive:alternative_offer_deflated"
      },
      "uiLabel": "고액 문의 약화"
    },
    {
      "id": "link:d-3:d-1:retaliation",
      "fromDisputeId": "d-3",
      "toDisputeId": "d-1",
      "type": "retaliation",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 7,
        "grantFlag": "d-1:motive:delay_gap_named"
      },
      "uiLabel": "사흘 지연 틈"
    },
    {
      "id": "link:d-4:d-5:weakens_counter",
      "fromDisputeId": "d-4",
      "toDisputeId": "d-5",
      "type": "weakens_counter",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "counterPenalty": 8,
        "grantFlag": "d-5:motive:legacy_issue_separated"
      },
      "uiLabel": "과거 민원 분리"
    }
  ],
  "freeQuestionHooks": [
    {
      "id": "fq:d-1:recipient_identity",
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
          "tenant07:a:d-1:rule:2",
          "tenant07:b:d-1:responsibility:2"
        ],
        "preferredAngleTags": [
          "identity"
        ]
      },
      "refusalTemplates": [
        "4% 인상 재계약 사전 합의의 존재 쪽은 지금 단계에선 더 단정해 말하고 싶지 않습니다.",
        "그 부분은 먼저 자료 흐름이 정리돼야 답할 수 있습니다."
      ]
    },
    {
      "id": "fq:d-1:sequence_probe",
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
          "tenant07:a:d-1:act:2",
          "tenant07:b:d-1:act:2"
        ],
        "preferredAngleTags": [
          "timeline",
          "context"
        ]
      },
      "refusalTemplates": [
        "4% 인상 재계약 사전 합의의 존재 쪽은 지금 단계에선 더 단정해 말하고 싶지 않습니다.",
        "그 부분은 먼저 자료 흐름이 정리돼야 답할 수 있습니다."
      ]
    },
    {
      "id": "fq:d-5:liability_split",
      "intentTag": "liability_check",
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
          "tenant07:a:d-5:rule:3",
          "tenant07:b:d-5:act:2",
          "tenant07:b:d-5:self_justification:2",
          "tenant07:b:d-5:fear:0"
        ],
        "preferredAngleTags": [
          "legality",
          "responsibility"
        ]
      },
      "refusalTemplates": [
        "도형의 12% 인상·추가 조건 통보 쪽은 지금 단계에선 더 단정해 말하고 싶지 않습니다.",
        "그 부분은 먼저 자료 흐름이 정리돼야 답할 수 있습니다."
      ]
    },
    {
      "id": "fq:d-3:scope_check",
      "intentTag": "context_check",
      "allowedAtStates": [
        "S2",
        "S3",
        "S4"
      ],
      "allowedIssueRoles": [
        "sub_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-3",
        "allowAtomIds": [
          "tenant07:a:d-3:shame:0",
          "tenant07:b:d-3:motive:0"
        ],
        "preferredAngleTags": [
          "context"
        ]
      },
      "refusalTemplates": [
        "하나의 재계약 서명본 전달 지연 쪽은 지금 단계에선 더 단정해 말하고 싶지 않습니다.",
        "그 부분은 먼저 자료 흐름이 정리돼야 답할 수 있습니다."
      ]
    },
    {
      "id": "fq:d-5:emotion_followup",
      "intentTag": "emotion_check",
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
          "tenant07:a:d-5:fear:3",
          "tenant07:b:d-5:fear:3"
        ],
        "preferredAngleTags": [
          "emotion"
        ]
      },
      "refusalTemplates": [
        "도형의 12% 인상·추가 조건 통보 쪽은 지금 단계에선 더 단정해 말하고 싶지 않습니다.",
        "그 부분은 먼저 자료 흐름이 정리돼야 답할 수 있습니다."
      ]
    },
    {
      "id": "fq:d-2:misread_context",
      "intentTag": "context_check",
      "allowedAtStates": [
        "S2",
        "S3",
        "S4",
        "S5"
      ],
      "allowedIssueRoles": [
        "red_herring"
      ],
      "answerEnvelope": {
        "disputeId": "d-2",
        "allowAtomIds": [
          "tenant07:a:d-2:context:3",
          "tenant07:b:d-2:context:2"
        ],
        "preferredAngleTags": [
          "context",
          "emotion"
        ]
      },
      "refusalTemplates": [
        "진우가 말한 고액 새 임차인 문의의 실체 쪽은 지금 단계에선 더 단정해 말하고 싶지 않습니다.",
        "그 부분은 먼저 자료 흐름이 정리돼야 답할 수 있습니다."
      ]
    }
  ],
  "phase3LogHints": {
    "relationCoreDisputes": [
      "d-1",
      "d-5"
    ],
    "playerStyleTagCandidates": [
      "pressure_heavy",
      "rapport_heavy",
      "evidence_closer",
      "trap_chaser"
    ]
  },
  "proposedUnlockAtoms": [
    {
      "id": "tenant07:a:d-1:unlock:s2:0",
      "factText": "중개사 일정표에는 4% 인상안과 2년 재계약 서류 발송이 이미 같은 저녁에 잡혀 있었다.",
      "tags": [
        "context",
        "evidence"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "amount": {
          "exact": "4% 인상",
          "rounded": "약 4%",
          "neutral": "그 인상률"
        },
        "term": {
          "exact": "2년 재계약",
          "neutral": "그 재계약 기간"
        },
        "time": {
          "exact": "협의 당일 저녁",
          "dateExact": "협의 당일",
          "period": "그날 저녁",
          "neutral": "그 시점"
        },
        "person": {
          "exact": "남서희",
          "fullName": "남서희 공인중개사",
          "judgeRef": "중개사",
          "neutral": "그 중개사"
        },
        "document": {
          "exact": "상담 일정표",
          "neutral": "그 일정표"
        }
      },
      "stanceHints": [
        "partial",
        "emotional"
      ],
      "party": "a",
      "disputeId": "d-1"
    },
    {
      "id": "tenant07:a:d-1:unlock:s3:0",
      "factText": "하나는 보증인 상담 때문에 서명본 발송을 사흘 늦췄고 그 사이 도형의 표현이 '정리'에서 '다시 봐야 한다'로 바뀌었다.",
      "tags": [
        "timeline",
        "responsibility"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "delay": {
          "exact": "사흘 지연",
          "neutral": "그 지연"
        },
        "procedure": {
          "exact": "보증인 상담",
          "neutral": "그 상담 사정"
        },
        "time": {
          "exact": "표현 변경 시점",
          "period": "그 사이",
          "neutral": "그 변화 시점"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ],
      "party": "a",
      "disputeId": "d-1"
    },
    {
      "id": "tenant07:a:d-1:unlock:s4:0",
      "factText": "하나는 서명 지연 때문에 합의가 깨질까 봐 4% 합의를 거의 완료된 계약처럼 더 단정적으로 말해 왔다.",
      "tags": [
        "fear",
        "self_justification"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "amount": {
          "exact": "4% 합의",
          "neutral": "그 합의"
        },
        "delay": {
          "exact": "서명 지연",
          "neutral": "그 지연"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ],
      "party": "a",
      "disputeId": "d-1"
    },
    {
      "id": "tenant07:a:d-1:unlock:s5:0",
      "factText": "핵심 합의는 실재했지만 하나도 자신의 절차 지연이 만든 틈을 줄여 말했다.",
      "tags": [
        "admission",
        "responsibility"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "amount": {
          "exact": "4% 인상 재계약",
          "neutral": "그 재계약 조건"
        },
        "delay": {
          "exact": "절차 지연",
          "neutral": "그 절차 문제"
        }
      },
      "stanceHints": [
        "confess",
        "emotional"
      ],
      "party": "a",
      "disputeId": "d-1"
    },
    {
      "id": "tenant07:a:d-3:unlock:s2:0",
      "factText": "초안 수신 후 사흘 뒤 발송된 메일 헤더로 서명본 전달 시각이 확인된다.",
      "tags": [
        "evidence",
        "timeline"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "delay": {
          "exact": "사흘 지연",
          "neutral": "그 지연"
        },
        "document": {
          "exact": "메일 헤더 원본",
          "neutral": "그 메일 기록"
        },
        "time": {
          "exact": "초안 수신 후 사흘 뒤",
          "dateExact": "사흘 뒤",
          "period": "발송 시점",
          "neutral": "그때"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ],
      "party": "a",
      "disputeId": "d-3"
    },
    {
      "id": "tenant07:a:d-3:unlock:s3:0",
      "factText": "지연 사유는 보증인 상담과 자동이체 일정 조정이었고, 하나는 그 사정을 미리 길게 설명하지 못했다.",
      "tags": [
        "context",
        "responsibility"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "procedure": {
          "exact": "보증인 상담 및 자동이체 일정 조정",
          "neutral": "그 절차 사정"
        },
        "delay": {
          "exact": "사흘 지연",
          "neutral": "그 지연"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ],
      "party": "a",
      "disputeId": "d-3"
    },
    {
      "id": "tenant07:a:d-3:unlock:s4:0",
      "factText": "하나는 체면 때문에 그 사흘 지연을 '별일 아님'처럼 축소했다.",
      "tags": [
        "shame",
        "emotion"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "delay": {
          "exact": "사흘 지연",
          "neutral": "그 지연"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ],
      "party": "a",
      "disputeId": "d-3"
    },
    {
      "id": "tenant07:a:d-3:unlock:s5:0",
      "factText": "하나는 미리 충분히 설명하지 못한 절차상 책임을 인정한다.",
      "tags": [
        "admission",
        "responsibility"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "procedure": {
          "exact": "사전 설명 부족",
          "neutral": "그 설명 누락"
        },
        "delay": {
          "exact": "절차상 책임",
          "neutral": "그 책임"
        }
      },
      "stanceHints": [
        "confess",
        "emotional"
      ],
      "party": "a",
      "disputeId": "d-3"
    },
    {
      "id": "tenant07:a:d-4:unlock:s2:0",
      "factText": "관리사무소 기록에는 2년 전 복도 자전거와 분리배출 경고 한 차례, 그리고 종결 메모만 남아 있다.",
      "tags": [
        "evidence",
        "timeline"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "time": {
          "exact": "2년 전 여름",
          "dateExact": "2년 전 여름",
          "period": "그때",
          "neutral": "그 과거 시점"
        },
        "issue": {
          "exact": "복도 자전거와 분리배출",
          "neutral": "그 생활 민원"
        },
        "document": {
          "exact": "민원 종결 기록",
          "neutral": "그 기록"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ],
      "party": "a",
      "disputeId": "d-4"
    },
    {
      "id": "tenant07:a:d-4:unlock:s3:0",
      "factText": "이후 같은 항목의 재접수는 없었고, 현재까지 남은 건 단발성 기록뿐이다.",
      "tags": [
        "counter",
        "context"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "result": {
          "exact": "재접수 없음",
          "neutral": "그 이후 상황"
        },
        "document": {
          "exact": "관리사무소 기록",
          "neutral": "그 기록"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ],
      "party": "a",
      "disputeId": "d-4"
    },
    {
      "id": "tenant07:a:d-4:unlock:s4:0",
      "factText": "하나는 문제 세입자로 찍힐까 봐 그 한 번의 경고 자체를 부정했다.",
      "tags": [
        "shame",
        "fear"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "time": {
          "exact": "한 차례 경고",
          "neutral": "그 경고"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ],
      "party": "a",
      "disputeId": "d-4"
    },
    {
      "id": "tenant07:a:d-4:unlock:s5:0",
      "factText": "하나는 경고가 한 번 있었다는 사실을 인정하고, 그 기록을 현재 증액 협상과는 분리해 달라고 말한다.",
      "tags": [
        "admission",
        "rule"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "time": {
          "exact": "2년 전 한 차례",
          "neutral": "그 과거 기록"
        },
        "issue": {
          "exact": "현재 증액 협상",
          "neutral": "그 현재 협상"
        }
      },
      "stanceHints": [
        "confess",
        "emotional"
      ],
      "party": "a",
      "disputeId": "d-4"
    },
    {
      "id": "tenant07:b:d-2:unlock:s2:0",
      "factText": "진우가 가져온 문의표에는 예약금이나 가예약 표시가 없었다.",
      "tags": [
        "evidence",
        "context"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "document": {
          "exact": "공실 문의표",
          "neutral": "그 문의표"
        },
        "money": {
          "exact": "예약금 없음",
          "neutral": "그 부재 사실"
        },
        "person": {
          "exact": "권진우",
          "fullName": "권진우",
          "judgeRef": "아드님",
          "neutral": "그 가족"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ],
      "party": "b",
      "disputeId": "d-2"
    },
    {
      "id": "tenant07:b:d-2:unlock:s3:0",
      "factText": "도형은 그 문의를 받은 지 두 시간 만에 12% 인상안을 다시 꺼냈다.",
      "tags": [
        "timeline",
        "act"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "time": {
          "exact": "문의 후 두 시간",
          "dateExact": "증액 번복 직전",
          "period": "그 짧은 간격",
          "neutral": "그 사이"
        },
        "amount": {
          "exact": "12% 인상안",
          "neutral": "그 인상안"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ],
      "party": "b",
      "disputeId": "d-2"
    },
    {
      "id": "tenant07:b:d-2:unlock:s4:0",
      "factText": "도형은 아들이 가져온 시세 압박을 놓치면 약한 집주인으로 보일까 봐 조급해졌다.",
      "tags": [
        "fear",
        "motive"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "person": {
          "exact": "권진우",
          "fullName": "권진우",
          "judgeRef": "아드님",
          "neutral": "그 가족"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ],
      "party": "b",
      "disputeId": "d-2"
    },
    {
      "id": "tenant07:b:d-2:unlock:s5:0",
      "factText": "도형은 탐색 문의를 거의 성사된 대안처럼 부풀려 협상 지렛대로 썼다.",
      "tags": [
        "admission",
        "self_justification"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "document": {
          "exact": "탐색 문의",
          "neutral": "그 문의"
        },
        "money": {
          "exact": "예약금 없음",
          "neutral": "그 부재 사실"
        }
      },
      "stanceHints": [
        "confess",
        "emotional"
      ],
      "party": "b",
      "disputeId": "d-2"
    },
    {
      "id": "tenant07:b:d-4:unlock:s2:0",
      "factText": "도형이 기대는 공식 기록도 실제로는 2년 전 한 차례뿐이다.",
      "tags": [
        "evidence",
        "timeline"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "time": {
          "exact": "2년 전 한 차례",
          "dateExact": "2년 전 여름",
          "period": "그때",
          "neutral": "그 과거 기록"
        },
        "document": {
          "exact": "관리사무소 기록",
          "neutral": "그 기록"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ],
      "party": "b",
      "disputeId": "d-4"
    },
    {
      "id": "tenant07:b:d-4:unlock:s3:0",
      "factText": "도형은 그 종결된 민원을 반복 문제처럼 말해 현재 신뢰 문제로 다시 포장했다.",
      "tags": [
        "counter",
        "self_justification"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "issue": {
          "exact": "종결된 민원",
          "neutral": "그 과거 민원"
        },
        "time": {
          "exact": "현재 재계약 국면",
          "neutral": "그 현재 상황"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ],
      "party": "b",
      "disputeId": "d-4"
    },
    {
      "id": "tenant07:b:d-4:unlock:s4:0",
      "factText": "도형은 세입자 관리에 끌려다니는 집주인처럼 보일까 봐 예전 경고를 크게 불렸다.",
      "tags": [
        "fear",
        "motive"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "issue": {
          "exact": "예전 경고",
          "neutral": "그 경고"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ],
      "party": "b",
      "disputeId": "d-4"
    },
    {
      "id": "tenant07:b:d-4:unlock:s5:0",
      "factText": "도형은 과거 민원을 현재 증액 명분으로 재활용한 점을 인정한다.",
      "tags": [
        "admission",
        "responsibility"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "issue": {
          "exact": "과거 민원",
          "neutral": "그 민원"
        },
        "amount": {
          "exact": "현재 증액 명분",
          "neutral": "그 현재 명분"
        }
      },
      "stanceHints": [
        "confess",
        "emotional"
      ],
      "party": "b",
      "disputeId": "d-4"
    },
    {
      "id": "tenant07:b:d-5:unlock:s2:0",
      "factText": "기존 4% 초안 뒤에 12% 인상, 주차비 별도, 부분 도배 선납이 새로 붙었다.",
      "tags": [
        "act",
        "evidence"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "amount": {
          "exact": "12% 인상",
          "neutral": "그 인상률"
        },
        "conditionA": {
          "exact": "주차비 별도",
          "neutral": "그 추가 조건"
        },
        "conditionB": {
          "exact": "부분 도배 선납",
          "neutral": "그 선납 조건"
        },
        "document": {
          "exact": "갱신 초안 대비 변경",
          "neutral": "그 변경 사항"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ],
      "party": "b",
      "disputeId": "d-5"
    },
    {
      "id": "tenant07:b:d-5:unlock:s3:0",
      "factText": "그 추가 조건은 서명 지연과 새 문의가 겹친 뒤 한꺼번에 통보됐다.",
      "tags": [
        "timeline",
        "context"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "delay": {
          "exact": "사흘 지연",
          "neutral": "그 지연"
        },
        "time": {
          "exact": "새 문의 직후",
          "period": "그 직후",
          "neutral": "그 시점"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ],
      "party": "b",
      "disputeId": "d-5"
    },
    {
      "id": "tenant07:b:d-5:unlock:s4:0",
      "factText": "도형은 시세를 놓친 집주인처럼 보일까 봐 손실 회피에 매달렸다.",
      "tags": [
        "fear",
        "motive"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "amount": {
          "exact": "시세 반영 실패",
          "neutral": "그 체면 문제"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ],
      "party": "b",
      "disputeId": "d-5"
    },
    {
      "id": "tenant07:b:d-5:unlock:s5:0",
      "factText": "도형은 기존 합의를 넘어선 일방 변경이었다는 점을 인정한다.",
      "tags": [
        "admission",
        "responsibility"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "amount": {
          "exact": "12% 인상과 추가 조건",
          "neutral": "그 변경안"
        },
        "document": {
          "exact": "기존 4% 합의",
          "neutral": "그 기존 합의"
        }
      },
      "stanceHints": [
        "confess",
        "emotional"
      ],
      "party": "b",
      "disputeId": "d-5"
    }
  ]
} as const;
