export const partnership_07_structure_v2 = {
  "caseId": "partnership-07",
  "schemaVersion": "structure_v2",
  "disputes": [
    {
      "id": "d-1",
      "name": "유나의 업계 내 누설자 낙인",
      "truth": true,
      "truthDescription": "유나는 바이어와 협회 사무국 쪽에 태경이 경쟁사로 자료를 흘린 것 같다고 반복적으로 말해, 실제 확인 전부터 태경을 사실상 누설자로 낙인찍었다.",
      "quadrant": "b_only",
      "requiredEvidence": [
        "e-2",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 21,
        "b": 79
      },
      "ambiguity": "low",
      "weight": "high",
      "mediationLink": "명예회복",
      "legitimacyIssue": false,
      "judgmentStatement": "유나는 태경을 누설자로 낙인찍었다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "누설자",
        "협회 문의",
        "바이어 메시지",
        "전 직장 인맥",
        "업계 소문",
        "낙인"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "누가 먼저 어떤 행동을 했는지가 보입니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "partnership-07:b:d-1:uncertainty:0",
            "partnership-07:b:d-1:fear:0",
            "partnership-07:a:d-1:harm:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "그 선택을 정당화하거나 몰아붙인 계산이 드러납니다.",
          "lockedSummary": "왜 그런 판단이 나왔는지는 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "partnership-07:b:d-1:relationship:0",
            "partnership-07:b:d-1:admission:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "책임과 상처의 무게가 함께 연결됩니다.",
          "lockedSummary": "핵심 연결은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S3"
              }
            ],
            "requireFlags": [
              "d-1:motive:frame_origin_named"
            ]
          },
          "revealAtomIds": [
            "partnership-07:b:d-1:motive:0",
            "partnership-07:b:d-1:admission:1"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-2",
      "name": "태경의 비식별 없는 전체 덱 외부 전달",
      "truth": true,
      "truthDescription": "태경은 유나에게 다시 묻지 않고 행사 운영사의 프로젝터 점검 요청에 전체 도매단가와 팝업 일정이 포함된 덱을 첨부로 보냈다.",
      "quadrant": "a_only",
      "requiredEvidence": [
        "e-1",
        "e-4"
      ],
      "correctResponsibility": {
        "a": 69,
        "b": 31
      },
      "ambiguity": "none",
      "weight": "high",
      "mediationLink": "행사보안프로토콜",
      "legitimacyIssue": false,
      "judgmentStatement": "태경은 전체 덱을 외부에 전달했다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "전체 덱",
        "final_all_v3",
        "프로젝터 체크",
        "운영사 AE",
        "첨부 발송",
        "비식별 없음"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "겉에서 확인되는 사실과 발화가 정리됩니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "partnership-07:a:d-2:rule:0",
            "partnership-07:a:d-2:context:0",
            "partnership-07:b:d-2:threshold:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "그 선택을 정당화하거나 몰아붙인 계산이 드러납니다.",
          "lockedSummary": "왜 그런 판단이 나왔는지는 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "partnership-07:a:d-2:responsibility:0",
            "partnership-07:a:d-2:admission:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "책임과 상처의 무게가 함께 연결됩니다.",
          "lockedSummary": "핵심 연결은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S3"
              }
            ],
            "requireFlags": [
              "d-2:motive:rule_named"
            ]
          },
          "revealAtomIds": [
            "partnership-07:a:d-2:admission:1",
            "partnership-07:a:d-2:self_justification:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-3",
      "name": "동업자 중 누군가 경쟁사에 고의로 정보를 흘렸는가",
      "truth": false,
      "truthDescription": "두 사람 모두 내부 고의 유출을 의심했지만, 실제 경쟁사 유입 경로는 박수민 AE의 후속메일 오발송이었고 동업자 어느 쪽도 경쟁사에 직접 자료를 넘기지 않았다.",
      "quadrant": "shared_misconception",
      "requiredEvidence": [
        "e-4",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 48,
        "b": 52
      },
      "ambiguity": "low",
      "weight": "high",
      "mediationLink": "대외소통복구",
      "legitimacyIssue": false,
      "judgmentStatement": "동업자는 경쟁사에 정보를 유출하지 않았다.",
      "disputeKind": "shared_misconception",
      "disputeAliases": [
        "크롭 캡처",
        "자료 넘겼어",
        "저쪽도 알 거야",
        "오발송",
        "후속메일",
        "내부 배신"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "겉으로는 그럴듯해 보였던 오해의 표면이 드러납니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "partnership-07:a:d-3:denial:0",
            "partnership-07:a:d-3:uncertainty:0",
            "partnership-07:b:d-3:motive:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "왜 서로 그 오해를 붙들었는지가 드러납니다.",
          "lockedSummary": "왜 그런 판단이 나왔는지는 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "M2"
              },
              {
                "id": "d-1",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "partnership-07:a:d-3:admission:0",
            "partnership-07:a:d-3:relationship:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "오해를 깨는 진짜 연결고리가 보입니다.",
          "lockedSummary": "핵심 연결은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "M3"
              },
              {
                "id": "d-1",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-3:surface:trap_named"
            ]
          },
          "revealAtomIds": [
            "partnership-07:a:d-3:fear:0",
            "partnership-07:a:d-3:admission:1"
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
            "summary": "동업자 중 누군가 경쟁사에 고의로 자료를 흘렸다는 믿음이 겉으로 그럴듯해 보입니다.",
            "npcMode": "confused_defensive"
          },
          {
            "state": "M1",
            "summary": "오해를 사실처럼 붙들며 방어가 빨라집니다.",
            "npcMode": "mistaken_certainty"
          },
          {
            "state": "M2",
            "summary": "잘린 단서와 기억의 편집이 해석을 고착시킵니다.",
            "npcMode": "mistaken_certainty"
          },
          {
            "state": "M3",
            "summary": "앞뒤 맥락이 들어오며 확신이 흔들리기 시작합니다.",
            "npcMode": "doubt_creeping"
          },
          {
            "state": "M4",
            "summary": "외부 경로와 실제 책임선이 정리되며 오해가 해소됩니다.",
            "npcMode": "clarified"
          }
        ],
        "trapSignals": [
          "크롭된 메신저 문장 하나",
          "전 직장 인맥과 경쟁사 연결고리",
          "후속메일 이전/이후 흐름이 잘린 캡처"
        ],
        "truthExitEvidenceIds": [
          "e-4",
          "e-6"
        ],
        "clarifyOutcomeLabel": "외부 경로와 실제 책임선이 정리되며 오해가 해소됩니다."
      }
    },
    {
      "id": "d-4",
      "name": "행사 자료 통제 원칙의 쌍방 위반",
      "truth": true,
      "truthDescription": "태경은 전체 덱을 첨부로 보냈고, 유나는 추적 링크가 걸린 축약본 대신 최신 단가가 포함된 전체 파일을 QR 후속자료 폴더에 올려 기존 행사 보안 원칙을 둘 다 어겼다.",
      "quadrant": "both_know",
      "requiredEvidence": [
        "e-1",
        "e-5"
      ],
      "correctResponsibility": {
        "a": 53,
        "b": 47
      },
      "ambiguity": "none",
      "weight": "medium",
      "mediationLink": "자료통제재설계",
      "legitimacyIssue": false,
      "judgmentStatement": "태경과 유나는 행사 자료를 위반했다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "보안 가이드",
        "추적 링크",
        "QR 폴더",
        "최신 전체 덱",
        "축약본 원칙",
        "자료 통제"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "겉에서 확인되는 사실과 발화가 정리됩니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "partnership-07:a:d-4:uncertainty:0",
            "partnership-07:a:d-4:self_justification:0",
            "partnership-07:b:d-4:uncertainty:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "핵심 갈등을 보강한 배경과 방어 논리가 드러납니다.",
          "lockedSummary": "왜 그런 판단이 나왔는지는 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "partnership-07:a:d-4:responsibility:0",
            "partnership-07:a:d-4:admission:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "관계를 비틀었던 보강 사실의 핵심이 연결됩니다.",
          "lockedSummary": "핵심 연결은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S2"
              },
              {
                "id": "d-4",
                "minState": "S3"
              }
            ],
            "requireFlags": [
              "d-4:motive:protocol_named"
            ]
          },
          "revealAtomIds": [
            "partnership-07:a:d-4:admission:1",
            "partnership-07:a:d-4:shame:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-5",
      "name": "실제 유출 경로는 운영사의 단순 오발송",
      "truth": true,
      "truthDescription": "운영사 AE는 스피커용 백업 폴더를 참석자 follow-up 메일에 잘못 붙였고, 그 결과 경쟁사 바이어도 동일한 파일을 받았다.",
      "quadrant": "neither_knows",
      "requiredEvidence": [
        "e-1",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 45,
        "b": 55
      },
      "ambiguity": "low",
      "weight": "medium",
      "mediationLink": "대외소통복구",
      "legitimacyIssue": false,
      "judgmentStatement": "운영사 AE의 오발송이다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "박수민 AE",
        "후속메일",
        "스피커용 백업",
        "감사로그",
        "사과 메일",
        "경쟁사 수신"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "겉에서 확인되는 사실과 발화가 정리됩니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "partnership-07:a:d-5:context:0",
            "partnership-07:a:d-5:uncertainty:0",
            "partnership-07:b:d-5:uncertainty:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "핵심 갈등을 보강한 배경과 방어 논리가 드러납니다.",
          "lockedSummary": "왜 그런 판단이 나왔는지는 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "partnership-07:a:d-5:evidence:0",
            "partnership-07:a:d-5:threshold:0",
            "partnership-07:b:d-5:admission:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "관계를 비틀었던 보강 사실의 핵심이 연결됩니다.",
          "lockedSummary": "핵심 연결은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S2"
              },
              {
                "id": "d-5",
                "minState": "S3"
              }
            ],
            "requireFlags": [
              "d-5:motive:outside_route_named"
            ]
          },
          "revealAtomIds": [
            "partnership-07:a:d-5:fear:0",
            "partnership-07:a:d-5:admission:0",
            "partnership-07:b:d-5:emotion:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    }
  ],
  "linkEdges": [
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
        "supportBonus": 12,
        "grantFlag": "d-5:surface:backup_route_named"
      },
      "uiLabel": "첨부가 씨앗이 됨"
    },
    {
      "id": "link:d-1:d-3:retaliation",
      "fromDisputeId": "d-1",
      "toDisputeId": "d-3",
      "type": "retaliation",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "retaliationRisk": 8,
        "grantFlag": "d-3:motive:framing_heat"
      },
      "uiLabel": "낙인이 오해를 굳힘"
    },
    {
      "id": "link:d-4:d-2:weakens_counter",
      "fromDisputeId": "d-4",
      "toDisputeId": "d-2",
      "type": "weakens_counter",
      "when": {
        "minState": "S2",
        "minLayer": "motive"
      },
      "effect": {
        "counterPenalty": 10,
        "grantFlag": "d-2:core:protocol_breach_seen"
      },
      "uiLabel": "보안선 붕괴"
    },
    {
      "id": "link:d-5:d-1:unlocks_layer",
      "fromDisputeId": "d-5",
      "toDisputeId": "d-1",
      "type": "unlocks_layer",
      "when": {
        "minState": "S3",
        "minLayer": "motive"
      },
      "effect": {
        "unlockLayer": "core",
        "grantFlag": "d-1:core:reputation_repair_open"
      },
      "uiLabel": "실제 경로 확인"
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "name": "프로젝터 점검 요청 메일과 전체 덱 첨부본",
      "description": "행사 전날 운영사가 요청한 프로젝터 점검 메일, 그리고 태경이 도매단가·백화점 팝업 일정이 모두 들어간 전체 덱을 첨부해 회신한 원본 메일이다.",
      "type": "email",
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
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "문태경에게: \"태경의 비식별 없는 전체 덱 외부 전달\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 문태경의 \"태경의 비식별 없는 전체 덱 외부 전달\" 쟁점과 관련된다. 문태경은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "서유나에게: \"행사 자료 통제 원칙의 쌍방 위반\" 관련 해명 요구 (방어 동기: 직장/평판 보호)",
          "implication": "이 증거는 서유나의 \"행사 자료 통제 원칙의 쌍방 위반\" 쟁점과 관련된다. 서유나은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
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
          "context",
          "legality"
        ],
        "blockedVectorsHelp": [
          "identity",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-2",
            "state": "S2",
            "multiplier": 1.35,
            "note": "부분 인정 직전의 방어를 넘어 실제 실행 주체를 굳히기 좋다."
          }
        ]
      }
    },
    {
      "id": "e-2",
      "name": "유나의 바이어 메시지와 협회 문의 메모",
      "description": "유나가 바이어 두 곳과 협회 사무국에 '태경 쪽에서 샌 것 같다'고 말한 메시지, 그리고 사무국이 남긴 문의 대응 메모다.",
      "type": "mixed",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "mixed",
      "legitimacy": "lawful",
      "proves": [
        "d-1"
      ],
      "isTrap": false,
      "requires": [],
      "subjectParty": "b",
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
          "context",
          "legality"
        ],
        "blockedVectorsHelp": [
          "identity",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S2",
            "multiplier": 1.35,
            "note": "부분 인정 직전의 방어를 넘어 실제 실행 주체를 굳히기 좋다."
          }
        ]
      }
    },
    {
      "id": "e-3",
      "name": "크롭된 메신저 캡처",
      "description": "태경이 '자료 넘겼어. 저쪽도 알 거야'라고 말한 부분만 남은 캡처로, 수신자와 앞뒤 문맥이 잘려 있어 경쟁사 전달처럼 보이게 만든다.",
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
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "문태경에게: \"태경의 비식별 없는 전체 덱 외부 전달\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 문태경의 \"태경의 비식별 없는 전체 덱 외부 전달\" 쟁점과 관련된다. 문태경은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "서유나에게: \"동업자 중 누군가 경쟁사에 고의로 정보를 흘렸는가\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 서유나의 \"동업자 중 누군가 경쟁사에 고의로 정보를 흘렸는가\" 쟁점과 관련된다. 서유나은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "disarm_trap",
        "role": "reframe",
        "bestAtStates": [
          "S1",
          "S2"
        ],
        "weakAtStates": [
          "S4",
          "S5"
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
            "disputeId": "d-3",
            "state": "M2",
            "multiplier": 1.4,
            "note": "잘린 단서를 더 오래 붙들기 전에 맥락을 복원할 때 효율이 가장 높다."
          }
        ]
      }
    },
    {
      "id": "e-4",
      "name": "원본 단톡과 발신메일 로그",
      "description": "문제의 '자료 넘겼어'가 운영사의 프로젝터 체크 요청을 가리킨다는 점, 그리고 유나도 해당 흐름을 읽고 있었다는 원본 단톡과 발신 로그다.",
      "type": "chat",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "platform",
      "legitimacy": "lawful",
      "proves": [
        "d-2",
        "d-3"
      ],
      "isTrap": false,
      "requires": [
        "e-3"
      ],
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "문태경에게: \"태경의 비식별 없는 전체 덱 외부 전달\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 문태경의 \"태경의 비식별 없는 전체 덱 외부 전달\" 쟁점과 관련된다. 문태경은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "서유나에게: \"동업자 중 누군가 경쟁사에 고의로 정보를 흘렸는가\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 서유나의 \"동업자 중 누군가 경쟁사에 고의로 정보를 흘렸는가\" 쟁점과 관련된다. 서유나은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "contextualize",
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
            "state": "M3",
            "multiplier": 1.35,
            "note": "오해가 흔들리기 시작하는 구간에서 제시하면 상대 비난 서사를 빠르게 꺾는다."
          }
        ]
      }
    },
    {
      "id": "e-5",
      "name": "행사 보안 가이드와 QR 후속자료 링크 수정 이력",
      "description": "비식별 축약본과 추적 링크만 쓰기로 한 행사 보안 가이드, 그리고 유나가 QR 후속자료 폴더를 최신 전체 덱 링크로 바꾼 기록이다.",
      "type": "cloud_log",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "platform",
      "legitimacy": "lawful",
      "proves": [
        "d-4"
      ],
      "isTrap": false,
      "requires": [
        "e-1"
      ],
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "문태경에게: \"행사 자료 통제 원칙의 쌍방 위반\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 문태경의 \"행사 자료 통제 원칙의 쌍방 위반\" 쟁점과 관련된다. 문태경은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "서유나에게: \"행사 자료 통제 원칙의 쌍방 위반\" 관련 해명 요구 (방어 동기: 직장/평판 보호)",
          "implication": "이 증거는 서유나의 \"행사 자료 통제 원칙의 쌍방 위반\" 쟁점과 관련된다. 서유나은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "corroborate",
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
          "motive_search"
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
            "disputeId": "d-4",
            "state": "S3",
            "multiplier": 1.25,
            "note": "핵심 쟁점을 보강하거나 외부 변수의 책임선을 정리할 때 힘이 붙는다."
          }
        ]
      }
    },
    {
      "id": "e-6",
      "name": "운영사 AE 사과 메일과 후속메일 감사로그",
      "description": "박수민 AE가 후속메일에 스피커용 백업 폴더를 잘못 첨부했다고 인정한 사과 메일과, 경쟁사 바이어가 동일 첨부파일을 수신한 발송 감사로그다.",
      "type": "email",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "third_party",
      "legitimacy": "lawful",
      "proves": [
        "d-1",
        "d-3",
        "d-5"
      ],
      "isTrap": false,
      "requires": [
        "e-4"
      ],
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "문태경에게: \"동업자 중 누군가 경쟁사에 고의로 정보를 흘렸는가\" 관련 해명 요구 (방어 동기: 관계 유지)",
          "implication": "이 증거는 문태경의 \"동업자 중 누군가 경쟁사에 고의로 정보를 흘렸는가\" 쟁점과 관련된다. 문태경은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "서유나에게: \"유나의 업계 내 누설자 낙인\" 관련 해명 요구 (방어 동기: 복수심)",
          "implication": "이 증거는 서유나의 \"유나의 업계 내 누설자 낙인\" 쟁점과 관련된다. 서유나은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "contextualize",
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
            "state": "M3",
            "multiplier": 1.35,
            "note": "오해가 흔들리기 시작하는 구간에서 제시하면 상대 비난 서사를 빠르게 꺾는다."
          }
        ]
      }
    }
  ],
  "freeQuestionHooks": [
    {
      "id": "fq:d-1:timeline_chain",
      "intentTag": "timeline_check",
      "allowedAtStates": [
        "S2",
        "S3",
        "S4"
      ],
      "allowedIssueRoles": [
        "core_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-1",
        "allowAtomIds": [
          "partnership-07:b:d-1:admission:0",
          "partnership-07:b:d-1:relationship:0"
        ],
        "preferredAngleTags": [
          "timeline"
        ]
      },
      "refusalTemplates": [
        "지금은 누설자 이야기부터 정리해야 합니다.",
        "그 질문은 아직 답할 단계가 아닙니다."
      ]
    },
    {
      "id": "fq:d-1:decision_identity",
      "intentTag": "identity_check",
      "allowedAtStates": [
        "S2",
        "S3",
        "S4"
      ],
      "allowedIssueRoles": [
        "core_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-1",
        "allowAtomIds": [
          "partnership-07:b:d-1:relationship:0",
          "partnership-07:b:d-1:admission:0"
        ],
        "preferredAngleTags": [
          "identity"
        ]
      },
      "refusalTemplates": [
        "지금은 누설자 이야기부터 정리해야 합니다.",
        "그 질문은 아직 답할 단계가 아닙니다."
      ]
    },
    {
      "id": "fq:d-2:frame_origin",
      "intentTag": "contradiction_probe",
      "allowedAtStates": [
        "S2",
        "S3",
        "S4"
      ],
      "allowedIssueRoles": [
        "core_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-2",
        "allowAtomIds": [
          "partnership-07:a:d-2:responsibility:0",
          "partnership-07:a:d-2:admission:0"
        ],
        "preferredAngleTags": [
          "context"
        ]
      },
      "refusalTemplates": [
        "지금은 전체 덱 이야기부터 정리해야 합니다.",
        "그 질문은 아직 답할 단계가 아닙니다."
      ]
    },
    {
      "id": "fq:d-3:misbelief_source",
      "intentTag": "source_check",
      "allowedAtStates": [
        "S2",
        "S3",
        "S4"
      ],
      "allowedIssueRoles": [
        "shared_misconception"
      ],
      "answerEnvelope": {
        "disputeId": "d-3",
        "allowAtomIds": [
          "partnership-07:a:d-3:admission:0",
          "partnership-07:a:d-3:relationship:0"
        ],
        "preferredAngleTags": [
          "context"
        ]
      },
      "refusalTemplates": [
        "지금은 크롭 캡처 이야기부터 정리해야 합니다.",
        "그 질문은 아직 답할 단계가 아닙니다."
      ]
    },
    {
      "id": "fq:d-4:rule_edge",
      "intentTag": "rule_check",
      "allowedAtStates": [
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
          "partnership-07:a:d-4:admission:1",
          "partnership-07:a:d-4:responsibility:0"
        ],
        "preferredAngleTags": [
          "legality"
        ]
      },
      "refusalTemplates": [
        "지금은 보안 가이드 이야기부터 정리해야 합니다.",
        "그 질문은 아직 답할 단계가 아닙니다."
      ]
    },
    {
      "id": "fq:d-5:outside_motive",
      "intentTag": "motive_probe",
      "allowedAtStates": [
        "S3",
        "S4",
        "S5"
      ],
      "allowedIssueRoles": [
        "sub_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-5",
        "allowAtomIds": [
          "partnership-07:a:d-5:fear:0",
          "partnership-07:a:d-5:threshold:0"
        ],
        "preferredAngleTags": [
          "motive"
        ]
      },
      "refusalTemplates": [
        "지금은 박수민 AE 이야기부터 정리해야 합니다.",
        "그 질문은 아직 답할 단계가 아닙니다."
      ]
    },
    {
      "id": "fq:d-1:emotion_tail",
      "intentTag": "emotion_probe",
      "allowedAtStates": [
        "S4",
        "S5"
      ],
      "allowedIssueRoles": [
        "core_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-1",
        "allowAtomIds": [
          "partnership-07:b:d-1:admission:1",
          "partnership-07:b:d-1:motive:0"
        ],
        "preferredAngleTags": [
          "emotion"
        ]
      },
      "refusalTemplates": [
        "지금은 누설자 이야기부터 정리해야 합니다.",
        "그 질문은 아직 답할 단계가 아닙니다."
      ]
    }
  ],
  "phase3LogHints": {
    "relationCoreDisputes": [
      "d-1",
      "d-2"
    ],
    "playerStyleTagCandidates": [
      "pressure_heavy",
      "rapport_heavy",
      "evidence_closer",
      "trap_chaser"
    ]
  },
  "proposedUnlockAtoms": []
} as const;
