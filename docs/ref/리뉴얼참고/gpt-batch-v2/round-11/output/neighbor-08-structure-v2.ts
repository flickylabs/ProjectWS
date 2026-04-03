export const neighbor_08_structure_v2 = {
  "caseId": "neighbor-08",
  "schemaVersion": "structure_v2",
  "disputes": [
    {
      "id": "d-1",
      "name": "민석의 미통보 설치와 초반 촬영각 초과",
      "disputeKind": "core_truth",
      "weight": "high",
      "mediationLink": "촬영범위조정",
      "legitimacyIssue": true,
      "requiredEvidence": [
        "e-2",
        "e-3"
      ],
      "judgmentStatement": "민석은 통보 없이 카메라를 설치했다.",
      "disputeAliases": [
        "미통보 설치",
        "초기 이틀",
        "도어매트",
        "문틀 일부",
        "촬영각 초과",
        "관리실 로그"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "누가 무엇을 먼저 했는지가 겉으로 드러납니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "neighbor08:a:d-1:denial:0",
            "neighbor08:a:d-1:uncertainty:0",
            "neighbor08:b:d-1:act:0",
            "neighbor08:b:d-1:fear:0"
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
            "neighbor08:a:d-1:counter:0",
            "neighbor08:b:d-1:responsibility:0",
            "neighbor08:b:d-1:identity:0"
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
            "neighbor08:a:d-1:shame:0",
            "neighbor08:b:d-1:fear:1",
            "neighbor08:b:d-1:admission:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-2",
      "name": "하린의 공개 낙인과 위조 클립 유포",
      "disputeKind": "core_truth",
      "weight": "high",
      "mediationLink": "평판회복",
      "legitimacyIssue": true,
      "requiredEvidence": [
        "e-1",
        "e-5"
      ],
      "judgmentStatement": "하린은 민석의 평판을 훼손했다.",
      "disputeAliases": [
        "스토킹 낙인",
        "주민방 글",
        "현관 앞을 노리는 사람",
        "공개 평판",
        "위조 클립"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "누가 무엇을 먼저 했는지가 겉으로 드러납니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "neighbor08:a:d-2:timeline:0",
            "neighbor08:a:d-2:harm:0",
            "neighbor08:b:d-2:self_justification:0",
            "neighbor08:b:d-2:relationship:0"
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
            "neighbor08:a:d-2:rule:0",
            "neighbor08:a:d-2:identity:0",
            "neighbor08:b:d-2:admission:0",
            "neighbor08:b:d-2:responsibility:0"
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
            "neighbor08:a:d-2:fear:0",
            "neighbor08:a:d-2:responsibility:0",
            "neighbor08:b:d-2:fear:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-3",
      "name": "27초 클립은 원본 영상인가",
      "disputeKind": "red_herring",
      "weight": "high",
      "mediationLink": "증거절차",
      "legitimacyIssue": true,
      "requiredEvidence": [
        "e-1",
        "e-4"
      ],
      "judgmentStatement": "27초 클립은 위조본이다.",
      "disputeAliases": [
        "27초 클립",
        "가짜 타임스탬프",
        "디지털 줌",
        "좌우 반전",
        "원본 아님",
        "메신저 MP4"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "그럴듯해 보였던 단서가 무엇인지 드러납니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "neighbor08:a:d-3:context:0",
            "neighbor08:a:d-3:evidence:0",
            "neighbor08:b:d-3:denial:0",
            "neighbor08:b:d-3:uncertainty:0"
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
                "id": "d-3",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "neighbor08:a:d-3:responsibility:0",
            "neighbor08:a:d-3:evidence:1",
            "neighbor08:b:d-3:motive:0",
            "neighbor08:b:d-3:admission:0"
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
                "id": "d-3",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-3:motive:opened"
            ]
          },
          "revealAtomIds": [
            "neighbor08:a:d-3:harm:0",
            "neighbor08:a:d-3:admission:0",
            "neighbor08:b:d-3:fear:0"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "misconception": {
        "beliefModeByParty": {
          "a": "knows",
          "b": "weaponizes"
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
          "기기에 없는 줌 효과가 들어간다",
          "프리뷰와 다른 시점 영상이 붙어 있다"
        ],
        "truthExitEvidenceIds": [
          "e-4"
        ],
        "clarifyOutcomeLabel": "오해를 접고 정리 국면으로 간다"
      }
    },
    {
      "id": "d-4",
      "name": "카메라가 하린 집 내부를 추적했는가",
      "disputeKind": "shared_misconception",
      "weight": "high",
      "mediationLink": "촬영범위조정",
      "legitimacyIssue": false,
      "requiredEvidence": [
        "e-3",
        "e-4"
      ],
      "judgmentStatement": "카메라는 하린 집 내부를 추적하지 않았다.",
      "disputeAliases": [
        "실내 추적 아님",
        "고정렌즈 160도",
        "프리뷰 화면",
        "저장 영상",
        "오해된 움직임"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "서로가 사실이라 믿은 전제가 흔들리기 시작합니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "neighbor08:a:d-4:uncertainty:0",
            "neighbor08:a:d-4:denial:0",
            "neighbor08:b:d-4:fear:0",
            "neighbor08:b:d-4:context:0"
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
                "id": "d-4",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "neighbor08:a:d-4:counter:0",
            "neighbor08:a:d-4:admission:0",
            "neighbor08:b:d-4:uncertainty:0",
            "neighbor08:b:d-4:admission:0"
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
                "id": "d-4",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-4:motive:opened"
            ]
          },
          "revealAtomIds": [
            "neighbor08:a:d-4:emotion:0",
            "neighbor08:b:d-4:emotion:0",
            "neighbor08:b:d-4:admission:1"
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
          "문이 열릴 때 빛 번짐이 따라오는 듯 보인다",
          "프리뷰와 저장 화면 차이가 체감 불안을 키운다"
        ],
        "truthExitEvidenceIds": [
          "e-3",
          "e-4"
        ],
        "clarifyOutcomeLabel": "오해를 접고 정리 국면으로 간다"
      }
    },
    {
      "id": "d-5",
      "name": "관리실 확인 우선 원칙의 쌍방 파기",
      "disputeKind": "sub_truth",
      "weight": "medium",
      "mediationLink": "중재절차",
      "legitimacyIssue": false,
      "requiredEvidence": [
        "e-5",
        "e-6"
      ],
      "judgmentStatement": "하린은 합의 위반으로 공개 글을 올렸다.",
      "disputeAliases": [
        "관리실 확인 우선",
        "귀가 시간표",
        "역공 게시물",
        "공개 반박",
        "쌍방 파기"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "주요 갈등을 키운 주변 사실과 순서가 보입니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "neighbor08:a:d-5:fear:0",
            "neighbor08:a:d-5:self_justification:0",
            "neighbor08:b:d-5:motive:0",
            "neighbor08:b:d-5:self_justification:0"
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
            "neighbor08:a:d-5:counter:0",
            "neighbor08:b:d-5:responsibility:0"
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
            "neighbor08:a:d-5:shame:0",
            "neighbor08:b:d-5:shame:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    }
  ],
  "linkEdges": [
    {
      "id": "link:d-3:d-2:weakens_counter",
      "fromDisputeId": "d-3",
      "toDisputeId": "d-2",
      "type": "weakens_counter",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 14,
        "grantFlag": "d-2:surface:clip_unreliable"
      },
      "uiLabel": "위조본 드러남"
    },
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
        "supportBonus": 10,
        "grantFlag": "d-4:surface:wide_angle_seed"
      },
      "uiLabel": "초기 넓은 각도"
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
        "grantFlag": "d-5:motive:counter_post_chain"
      },
      "uiLabel": "낙인 뒤 역공"
    },
    {
      "id": "link:d-4:d-1:unlocks_layer",
      "fromDisputeId": "d-4",
      "toDisputeId": "d-1",
      "type": "unlocks_layer",
      "when": {
        "minState": "S3",
        "minLayer": "motive"
      },
      "effect": {
        "supportBonus": 8,
        "grantFlag": "d-1:core:fear_and_violation_split"
      },
      "uiLabel": "불안과 위반 분리"
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "name": "하린이 돌린 27초 줌 클립",
      "description": "주민방에 퍼진 27초 MP4. 문이 열리자 카메라가 따라붙는 듯 줌이 되지만, 해당 기기에는 줌 기능 자체가 없다.",
      "type": "video",
      "reliability": "soft",
      "completeness": "cropped",
      "provenance": "personal_device",
      "legitimacy": "unlawful",
      "proves": [
        "d-2",
        "d-3",
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
            "disputeId": "d-2",
            "state": "S2",
            "multiplier": 1.35,
            "note": "d-2의 전제를 걷어내는 창구"
          },
          {
            "disputeId": "d-3",
            "state": "S2",
            "multiplier": 1.2,
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
      "id": "e-2",
      "name": "설치 직후 각도 사진과 관리사무소 미통보 기록",
      "description": "설치 기사 촬영 초기 각도 사진과 관리실 접수 로그. 사전 문의 기록이 비어 있어 미통보 설치가 확인된다.",
      "type": "institutional_note",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-1"
      ],
      "isTrap": false,
      "requires": [],
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
          "legality"
        ],
        "blockedVectorsHelp": [
          "context",
          "legality"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S3",
            "multiplier": 1.35,
            "note": "d-1의 전제를 확정하는 창구"
          }
        ]
      }
    },
    {
      "id": "e-3",
      "name": "원본 SD카드 2분 영상과 기기 사양서",
      "description": "SD카드 원본 2분 영상 + 제조사 사양서. 고정렌즈 160도 모델로 팬·틸트 미지원이 확인돼 추적 촬영 불가를 증명한다.",
      "type": "device_log",
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
        "e-2"
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
      "id": "e-4",
      "name": "27초 클립 포렌식 비교 보고서",
      "description": "포렌식 보고서. 유포본과 SD카드 원본·프리뷰 캐시를 대조해 합성·디지털줌·좌우반전·타임스탬프 위조를 확인했다.",
      "type": "forensic_report",
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
        "e-1",
        "e-3"
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
      "id": "e-5",
      "name": "주민 채팅방 캡처와 민석의 역공 게시물",
      "description": "하린의 '현관 앞을 노리는 사람' 주민방 글 + 민석이 올린 하린 귀가 시간표 게시물. 양쪽 모두 관리실 절차보다 공개 공격이 먼저였다.",
      "type": "chat",
      "reliability": "soft",
      "completeness": "original",
      "provenance": "mixed",
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
      "id": "e-6",
      "name": "민원 접수 순서표와 각도 재조정 서비스 로그",
      "description": "관리실·설치기사 기록. 하린의 공개 글이 정식 민원보다 36분 앞서고, 민석의 각도 재조정은 기사 방문 직후 이뤄졌다.",
      "type": "complaint_log",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-1",
        "d-5"
      ],
      "isTrap": false,
      "requires": [],
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
          "legality",
          "context"
        ],
        "blockedVectorsHelp": [
          "context",
          "legality"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S3",
            "multiplier": 1.35,
            "note": "d-1의 전제를 확정하는 창구"
          },
          {
            "disputeId": "d-5",
            "state": "S3",
            "multiplier": 1.2,
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
          "neighbor08:a:d-1:admission:0",
          "neighbor08:b:d-1:fear:0"
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
      "id": "fq:d-3:evidence_source_check",
      "intentTag": "evidence_source_check",
      "allowedAtStates": [
        "S2",
        "S3",
        "S4"
      ],
      "allowedIssueRoles": [
        "red_herring"
      ],
      "answerEnvelope": {
        "disputeId": "d-3",
        "allowAtomIds": [
          "neighbor08:a:d-3:harm:0",
          "neighbor08:b:d-3:admission:0"
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
        "S5"
      ],
      "allowedIssueRoles": [
        "core_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-2",
        "allowAtomIds": [
          "neighbor08:a:d-2:rule:0",
          "neighbor08:b:d-2:responsibility:0"
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
          "neighbor08:a:d-5:admission:0",
          "neighbor08:b:d-5:admission:0"
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
      "id": "fq:d-4:motive_probe",
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
        "disputeId": "d-4",
        "allowAtomIds": [
          "neighbor08:a:d-4:counter:0",
          "neighbor08:b:d-4:emotion:0"
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
          "neighbor08:a:d-1:shame:0",
          "neighbor08:b:d-1:fear:1"
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
