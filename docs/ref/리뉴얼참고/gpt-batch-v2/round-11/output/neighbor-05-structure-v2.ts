export const neighbor_05_structure_v2 = {
  "caseId": "neighbor-05",
  "schemaVersion": "structure_v2",
  "disputes": [
    {
      "id": "d-1",
      "name": "서윤의 CCTV 캡처 유포와 절도 암시",
      "disputeKind": "core_truth",
      "weight": "high",
      "mediationLink": "사생활경계",
      "legitimacyIssue": true,
      "requiredEvidence": [
        "e-1"
      ],
      "judgmentStatement": "서윤은 CCTV 캡처를 유포했다.",
      "disputeAliases": [
        "흰 상자",
        "CCTV 캡처",
        "제 상자 아닐까요",
        "복도 화면",
        "절도 암시",
        "캡처 유포"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "누가 무엇을 먼저 했는지가 겉으로 드러납니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "neighbor05:a:d-1:act:0",
            "neighbor05:a:d-1:timeline:0",
            "neighbor05:b:d-1:evidence:0",
            "neighbor05:b:d-1:identity:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "행동을 정당화하거나 되갚고 싶어 한 이유가 드러납니다.",
          "lockedSummary": "왜 그 행동에 집착했는지는 아직 가려져 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "neighbor05:a:d-1:motive:0",
            "neighbor05:a:d-1:admission:0",
            "neighbor05:b:d-1:rule:0",
            "neighbor05:b:d-1:emotion:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "감정 비용과 핵심 책임선이 함께 정리됩니다.",
          "lockedSummary": "감정 비용과 핵심 책임선은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-1:motive:opened"
            ]
          },
          "revealAtomIds": [
            "neighbor05:a:d-1:fear:0",
            "neighbor05:a:d-1:shame:0",
            "neighbor05:b:d-1:emotion:1",
            "neighbor05:b:d-1:fear:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-2",
      "name": "재현의 역소문 전파",
      "disputeKind": "core_truth",
      "weight": "high",
      "mediationLink": "평판회복",
      "legitimacyIssue": true,
      "requiredEvidence": [
        "e-2"
      ],
      "judgmentStatement": "재현은 서윤씨에 대한 역소문을 퍼뜨렸다.",
      "disputeAliases": [
        "층 대화방",
        "1:1 대화",
        "남의 택배 먼저 만진다",
        "역소문",
        "몇 사람만",
        "평판성 문구"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "누가 무엇을 먼저 했는지가 겉으로 드러납니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "neighbor05:a:d-2:act:0",
            "neighbor05:a:d-2:timeline:0",
            "neighbor05:b:d-2:denial:0",
            "neighbor05:b:d-2:threshold:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "행동을 정당화하거나 되갚고 싶어 한 이유가 드러납니다.",
          "lockedSummary": "왜 그 행동에 집착했는지는 아직 가려져 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "neighbor05:a:d-2:counter:0",
            "neighbor05:a:d-2:relationship:0",
            "neighbor05:b:d-2:motive:0",
            "neighbor05:b:d-2:responsibility:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "감정 비용과 핵심 책임선이 함께 정리됩니다.",
          "lockedSummary": "감정 비용과 핵심 책임선은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-2:motive:opened"
            ]
          },
          "revealAtomIds": [
            "neighbor05:a:d-2:emotion:0",
            "neighbor05:a:d-2:fear:0",
            "neighbor05:b:d-2:emotion:0",
            "neighbor05:b:d-2:fear:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-3",
      "name": "상대가 내 택배를 가져갔는가",
      "disputeKind": "shared_misconception",
      "weight": "high",
      "mediationLink": "배송사고정리",
      "legitimacyIssue": false,
      "requiredEvidence": [
        "e-4",
        "e-5"
      ],
      "judgmentStatement": "상대는 내 택배를 가져가지 않았다.",
      "disputeAliases": [
        "오배송 완료",
        "선스캔",
        "대리점 보류함",
        "젖은 송장",
        "택배사고",
        "절도 아님"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "서로가 사실이라 믿은 전제가 흔들리기 시작합니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "neighbor05:a:d-3:act:0",
            "neighbor05:a:d-3:timeline:0",
            "neighbor05:b:d-3:act:0",
            "neighbor05:b:d-3:timeline:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "왜 잘못된 전제를 끝까지 붙잡았는지 보입니다.",
          "lockedSummary": "왜 그 행동에 집착했는지는 아직 가려져 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "neighbor05:a:d-3:institution:1",
            "neighbor05:a:d-3:institution:0",
            "neighbor05:b:d-3:institution:0",
            "neighbor05:b:d-3:identity:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "오해를 끝내는 기록과 후폭풍이 하나로 묶입니다.",
          "lockedSummary": "감정 비용과 핵심 책임선은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-3:motive:opened"
            ]
          },
          "revealAtomIds": [
            "neighbor05:a:d-3:shame:0",
            "neighbor05:a:d-3:fear:0",
            "neighbor05:b:d-3:shame:0",
            "neighbor05:b:d-3:fear:0"
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
            "summary": "겉보기 정황만 붙잡는다",
            "npcMode": "confused_defensive"
          },
          {
            "state": "M1",
            "summary": "방어와 단정이 함께 올라온다",
            "npcMode": "mistaken_certainty"
          },
          {
            "state": "M2",
            "summary": "잘못된 해석이 굳어진다",
            "npcMode": "mistaken_certainty"
          },
          {
            "state": "M3",
            "summary": "기록 앞에서 확신이 흔들린다",
            "npcMode": "doubt_creeping"
          },
          {
            "state": "M4",
            "summary": "오해를 접고 정리 국면으로 간다",
            "npcMode": "clarified"
          }
        ],
        "trapSignals": [
          "배송완료 알림과 실제 하차 시각이 어긋난다",
          "둘 다 같은 예외코드로 묶여 있다"
        ],
        "truthExitEvidenceIds": [
          "e-4",
          "e-5"
        ],
        "clarifyOutcomeLabel": "오해를 접고 정리 국면으로 간다"
      }
    },
    {
      "id": "d-4",
      "name": "CCTV 속 흰 상자의 실제 주인",
      "disputeKind": "red_herring",
      "weight": "high",
      "mediationLink": "증거절차",
      "legitimacyIssue": false,
      "requiredEvidence": [
        "e-1",
        "e-3"
      ],
      "judgmentStatement": "흰 상자는 류다은의 배송 박스이다.",
      "disputeAliases": [
        "류다은 상자",
        "파란 스티커",
        "배송완료 사진",
        "흰 상자 주인",
        "정기배송 박스"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "그럴듯해 보였던 단서가 무엇인지 드러납니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "neighbor05:a:d-4:timeline:0",
            "neighbor05:a:d-4:identity:0",
            "neighbor05:b:d-4:context:0",
            "neighbor05:b:d-4:identity:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "표식·캡처·숫자를 왜 진짜처럼 믿었는지 드러납니다.",
          "lockedSummary": "왜 그 행동에 집착했는지는 아직 가려져 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-4",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "neighbor05:a:d-4:evidence:1",
            "neighbor05:a:d-4:legacy_sentence:0",
            "neighbor05:b:d-4:motive:0",
            "neighbor05:b:d-4:self_justification:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "가짜 단서가 본 쟁점을 어떻게 비틀었는지 드러납니다.",
          "lockedSummary": "감정 비용과 핵심 책임선은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-4",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-4:motive:opened"
            ]
          },
          "revealAtomIds": [
            "neighbor05:a:d-4:fear:0",
            "neighbor05:a:d-4:shame:0",
            "neighbor05:b:d-4:shame:0",
            "neighbor05:b:d-4:fear:0"
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
            "summary": "겉보기 정황만 붙잡는다",
            "npcMode": "confused_defensive"
          },
          {
            "state": "M1",
            "summary": "방어와 단정이 함께 올라온다",
            "npcMode": "mistaken_certainty"
          },
          {
            "state": "M2",
            "summary": "잘못된 해석이 굳어진다",
            "npcMode": "mistaken_certainty"
          },
          {
            "state": "M3",
            "summary": "기록 앞에서 확신이 흔들린다",
            "npcMode": "doubt_creeping"
          },
          {
            "state": "M4",
            "summary": "오해를 접고 정리 국면으로 간다",
            "npcMode": "clarified"
          }
        ],
        "trapSignals": [
          "잘린 캡처라 송장과 수취인이 보이지 않는다",
          "파란 스티커 같은 식별점이 빠져 있다"
        ],
        "truthExitEvidenceIds": [
          "e-3"
        ],
        "clarifyOutcomeLabel": "오해를 접고 정리 국면으로 간다"
      }
    },
    {
      "id": "d-5",
      "name": "배송사 확인 전 공개 의심 금지 약속 파기",
      "disputeKind": "sub_truth",
      "weight": "medium",
      "mediationLink": "공동수령규칙",
      "legitimacyIssue": false,
      "requiredEvidence": [
        "e-2",
        "e-6"
      ],
      "judgmentStatement": "서윤과 재현은 약속을 깨트렸다.",
      "disputeAliases": [
        "배송사 확인 먼저",
        "공개 의심 금지",
        "과거 약속",
        "상호대리수령",
        "먼저 깬 쪽"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "주요 갈등을 키운 주변 사실과 순서가 보입니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "neighbor05:a:d-5:timeline:0",
            "neighbor05:a:d-5:denial:0",
            "neighbor05:b:d-5:timeline:0",
            "neighbor05:b:d-5:denial:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "절차와 관계 맥락이 왜 흔들렸는지 보입니다.",
          "lockedSummary": "왜 그 행동에 집착했는지는 아직 가려져 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-5",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "neighbor05:a:d-5:motive:0",
            "neighbor05:a:d-5:responsibility:0",
            "neighbor05:b:d-5:responsibility:0",
            "neighbor05:b:d-5:threshold:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "재발 방지 규칙과 책임의 경계가 또렷해집니다.",
          "lockedSummary": "감정 비용과 핵심 책임선은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-5",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-5:motive:opened"
            ]
          },
          "revealAtomIds": [
            "neighbor05:a:d-5:fear:0",
            "neighbor05:a:d-5:shame:0",
            "neighbor05:b:d-5:emotion:0",
            "neighbor05:b:d-5:fear:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    }
  ],
  "linkEdges": [
    {
      "id": "link:d-4:d-3:weakens_counter",
      "fromDisputeId": "d-4",
      "toDisputeId": "d-3",
      "type": "weakens_counter",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 11,
        "grantFlag": "d-3:surface:identity_false_exposed"
      },
      "uiLabel": "흰 상자 오인"
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
        "supportBonus": 12,
        "grantFlag": "d-5:surface:first_public_breach"
      },
      "uiLabel": "먼저 공개 의심"
    },
    {
      "id": "link:d-2:d-5:retaliation",
      "fromDisputeId": "d-2",
      "toDisputeId": "d-5",
      "type": "retaliation",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 9,
        "grantFlag": "d-5:motive:retaliation_chain"
      },
      "uiLabel": "역소문 반응"
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
        "supportBonus": 13,
        "grantFlag": "d-1:core:theft_premise_collapsed"
      },
      "uiLabel": "절도 전제 붕괴"
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "name": "서윤이 돌린 복도 CCTV 캡처와 전달문구",
      "description": "재현이 흰 박스를 든 CCTV 정지캡처 두 장. 서윤이 '제 상자 아닐까요'라고 덧붙여 보냈지만, 송장이나 수취인은 식별되지 않는다.",
      "type": "cctv",
      "reliability": "soft",
      "completeness": "cropped",
      "provenance": "personal_device",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-1",
        "d-4"
      ],
      "isTrap": true,
      "requires": [],
      "timing": {
        "intent": "disarm_trap",
        "role": "impeach",
        "bestAtStates": [
          "S1",
          "S2"
        ],
        "weakAtStates": [
          "S0",
          "S5"
        ],
        "preferredQuestionTypes": [
          "fact_pursuit",
          "evidence_present"
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
            "multiplier": 1.35,
            "note": "d-1의 전제를 걷어내는 창구"
          },
          {
            "disputeId": "d-4",
            "state": "S2",
            "multiplier": 1.2,
            "note": "d-4의 전제를 걷어내는 창구"
          }
        ]
      }
    },
    {
      "id": "e-2",
      "name": "재현의 1:1 대화와 층 대화방 발언",
      "description": "재현이 3개 대화방에 '서윤씨가 남의 택배를 먼저 챙긴다'며 절도를 암시한 메시지 캡처. 단정은 피했지만 반복 전파됐다.",
      "type": "chat",
      "reliability": "soft",
      "completeness": "original",
      "provenance": "personal_device",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-2",
        "d-5"
      ],
      "isTrap": false,
      "requires": [],
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
          "legality",
          "context"
        ],
        "blockedVectorsHelp": [
          "timeline",
          "legality"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-2",
            "state": "S3",
            "multiplier": 1.35,
            "note": "d-2의 전제를 확정하는 창구"
          },
          {
            "disputeId": "d-5",
            "state": "S3",
            "multiplier": 1.2,
            "note": "d-5의 전제를 확정하는 창구"
          }
        ]
      }
    },
    {
      "id": "e-3",
      "name": "류다은의 배송완료 사진과 실제 수령 상자 대조",
      "description": "류다은 세대의 배송완료 사진과 실물 상자 대조 자료. 모서리 파란 스티커 위치가 일치해 CCTV 속 상자의 실소유자를 특정한다.",
      "type": "delivery_record",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "mixed",
      "legitimacy": "lawful",
      "proves": [
        "d-4"
      ],
      "isTrap": false,
      "requires": [
        "e-1"
      ],
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
          "fact_pursuit",
          "evidence_present"
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
            "disputeId": "d-4",
            "state": "S2",
            "multiplier": 1.35,
            "note": "d-4의 전제를 걷어내는 창구"
          }
        ]
      }
    },
    {
      "id": "e-4",
      "name": "택배대리점 단말 스캔 로그와 배송예외 보고서",
      "description": "대리점 단말 기록. 두 택배가 하차 전 배송완료로 선스캔됐고 젖은 송장 예외코드로 보류함에 남았음을 보여준다.",
      "type": "device_log",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-3"
      ],
      "isTrap": false,
      "requires": [],
      "timing": {
        "intent": "corroborate",
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
          "legality"
        ],
        "blockedVectorsHelp": [
          "context",
          "legality"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "S2",
            "multiplier": 1.35,
            "note": "d-3의 전제를 걷어내는 창구"
          }
        ]
      }
    },
    {
      "id": "e-5",
      "name": "기사 단말 GPS·콜센터 통화요약",
      "description": "기사 GPS 정차기록과 콜센터 통화요약. 문제 시각 차량이 104동 하역장에 있어 102동 택배실엔 하차 자체가 없었음을 증명한다.",
      "type": "institutional_note",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-3",
        "d-4"
      ],
      "isTrap": false,
      "requires": [
        "e-4"
      ],
      "timing": {
        "intent": "corroborate",
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
          "legality"
        ],
        "blockedVectorsHelp": [
          "context",
          "legality"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "S2",
            "multiplier": 1.35,
            "note": "d-3의 전제를 걷어내는 창구"
          },
          {
            "disputeId": "d-4",
            "state": "S2",
            "multiplier": 1.2,
            "note": "d-4의 전제를 걷어내는 창구"
          }
        ]
      }
    },
    {
      "id": "e-6",
      "name": "과거 상호대리수령 약속 대화와 이번 의심 글 순서표",
      "description": "과거 합의 대화 원문과 이번 공개 의심 발신 시간표. 첫 공개 의심이 배송사 문의 접수보다 앞서 있어 약속 파기 순서가 드러난다.",
      "type": "chat",
      "reliability": "soft",
      "completeness": "original",
      "provenance": "mixed",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-5"
      ],
      "isTrap": false,
      "requires": [],
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
          "legality",
          "context"
        ],
        "blockedVectorsHelp": [
          "timeline",
          "legality"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-5",
            "state": "S3",
            "multiplier": 1.35,
            "note": "d-5의 전제를 확정하는 창구"
          }
        ]
      }
    }
  ],
  "freeQuestionHooks": [
    {
      "id": "fq:d-1:timeline_check",
      "intentTag": "timeline_check",
      "allowedAtStates": [
        "S1",
        "S2",
        "S3"
      ],
      "allowedIssueRoles": [
        "core_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-1",
        "allowAtomIds": [
          "neighbor05:a:d-1:timeline:0",
          "neighbor05:b:d-1:evidence:0"
        ],
        "preferredAngleTags": [
          "timeline"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 바로 한 줄로 답하기 어렵습니다.",
        "조금 더 확인된 뒤에야 그 부분은 분명히 말할 수 있습니다."
      ]
    },
    {
      "id": "fq:d-4:identity_check",
      "intentTag": "identity_check",
      "allowedAtStates": [
        "S2",
        "S3",
        "S4"
      ],
      "allowedIssueRoles": [
        "red_herring"
      ],
      "answerEnvelope": {
        "disputeId": "d-4",
        "allowAtomIds": [
          "neighbor05:a:d-4:admission:0",
          "neighbor05:b:d-4:admission:0",
          "neighbor05:b:d-4:motive:0"
        ],
        "preferredAngleTags": [
          "identity"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 바로 한 줄로 답하기 어렵습니다.",
        "조금 더 확인된 뒤에야 그 부분은 분명히 말할 수 있습니다."
      ]
    },
    {
      "id": "fq:d-2:scope_check",
      "intentTag": "scope_check",
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
          "neighbor05:a:d-2:counter:0",
          "neighbor05:b:d-2:counter:0"
        ],
        "preferredAngleTags": [
          "context"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 바로 한 줄로 답하기 어렵습니다.",
        "조금 더 확인된 뒤에야 그 부분은 분명히 말할 수 있습니다."
      ]
    },
    {
      "id": "fq:d-5:rule_check",
      "intentTag": "rule_check",
      "allowedAtStates": [
        "S2",
        "S3",
        "S5"
      ],
      "allowedIssueRoles": [
        "sub_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-5",
        "allowAtomIds": [
          "neighbor05:a:d-5:admission:0",
          "neighbor05:b:d-5:admission:0"
        ],
        "preferredAngleTags": [
          "legality"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 바로 한 줄로 답하기 어렵습니다.",
        "조금 더 확인된 뒤에야 그 부분은 분명히 말할 수 있습니다."
      ]
    },
    {
      "id": "fq:d-3:motive_probe",
      "intentTag": "motive_probe",
      "allowedAtStates": [
        "S3",
        "S4",
        "S5"
      ],
      "allowedIssueRoles": [
        "shared_misconception"
      ],
      "answerEnvelope": {
        "disputeId": "d-3",
        "allowAtomIds": [
          "neighbor05:a:d-3:fear:0",
          "neighbor05:b:d-3:fear:0"
        ],
        "preferredAngleTags": [
          "motive"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 바로 한 줄로 답하기 어렵습니다.",
        "조금 더 확인된 뒤에야 그 부분은 분명히 말할 수 있습니다."
      ]
    },
    {
      "id": "fq:d-1:emotion_probe",
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
          "neighbor05:a:d-1:fear:0",
          "neighbor05:b:d-1:emotion:1"
        ],
        "preferredAngleTags": [
          "emotion"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 바로 한 줄로 답하기 어렵습니다.",
        "조금 더 확인된 뒤에야 그 부분은 분명히 말할 수 있습니다."
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
      "evidence_closer",
      "trap_chaser",
      "rapport_heavy"
    ]
  },
  "proposedUnlockAtoms": []
} as const;
