export const neighbor_07_structure_v2 = {
  "caseId": "neighbor-07",
  "schemaVersion": "structure_v2",
  "disputes": [
    {
      "id": "d-1",
      "name": "나리의 옛 열쇠 사용과 잠금함 적치",
      "disputeKind": "core_truth",
      "weight": "high",
      "mediationLink": "공용공간경계",
      "legitimacyIssue": true,
      "requiredEvidence": [
        "e-1",
        "e-2"
      ],
      "judgmentStatement": "나리는 옛 열쇠로 잠금함을 열었다.",
      "disputeAliases": [
        "옛 열쇠",
        "8층 잠금함",
        "유모차",
        "이사 박스",
        "관리실 확인 전",
        "무단 적치"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "누가 무엇을 먼저 했는지가 겉으로 드러납니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "neighbor07:a:d-1:act:0",
            "neighbor07:a:d-1:responsibility:1",
            "neighbor07:b:d-1:act:0",
            "neighbor07:b:d-1:timeline:10"
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
            "neighbor07:a:d-1:motive:31",
            "neighbor07:a:d-1:context:21",
            "neighbor07:b:d-1:counter:30",
            "neighbor07:b:d-1:context:21"
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
            "neighbor07:a:d-1:fear:40",
            "neighbor07:a:d-1:admission:41",
            "neighbor07:b:d-1:emotion:41",
            "neighbor07:b:d-1:responsibility:51"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-2",
      "name": "성호의 사적 재잠금과 공개 경고",
      "disputeKind": "core_truth",
      "weight": "medium",
      "mediationLink": "중재절차",
      "legitimacyIssue": false,
      "requiredEvidence": [
        "e-4",
        "e-5"
      ],
      "judgmentStatement": "성호는 자물쇠를 걸고 경고 글을 올렸다.",
      "disputeAliases": [
        "사적 자물쇠",
        "공개 경고",
        "단지앱 글",
        "새 803호",
        "선제 조치",
        "공개 망신"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "누가 무엇을 먼저 했는지가 겉으로 드러납니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "neighbor07:a:d-2:act:0",
            "neighbor07:a:d-2:timeline:1",
            "neighbor07:b:d-2:act:0",
            "neighbor07:b:d-2:denial:10"
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
            "neighbor07:a:d-2:counter:30",
            "neighbor07:a:d-2:harm:31",
            "neighbor07:b:d-2:harm:31",
            "neighbor07:b:d-2:admission:30"
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
            "neighbor07:a:d-2:relationship:41",
            "neighbor07:a:d-2:shame:40",
            "neighbor07:b:d-2:emotion:41",
            "neighbor07:b:d-2:fear:40"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-3",
      "name": "8층 잠금함은 803호 전용이었는가",
      "disputeKind": "shared_misconception",
      "weight": "high",
      "mediationLink": "열쇠회수절차",
      "legitimacyIssue": false,
      "requiredEvidence": [
        "e-3",
        "e-6"
      ],
      "judgmentStatement": "8층 잠금함은 공용 비상물품함이다.",
      "disputeAliases": [
        "공용 비상물품함",
        "803 전용 아님",
        "임시사용 승인대장",
        "퇴거 종료",
        "한시 허가"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "서로가 사실이라 믿은 전제가 흔들리기 시작합니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "neighbor07:a:d-3:identity:0",
            "neighbor07:a:d-3:context:10",
            "neighbor07:b:d-3:legacy_sentence:1",
            "neighbor07:b:d-3:context:10"
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
            "neighbor07:a:d-3:responsibility:31",
            "neighbor07:a:d-3:context:21",
            "neighbor07:b:d-3:responsibility:31",
            "neighbor07:b:d-3:context:21"
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
            "neighbor07:a:d-3:fear:40",
            "neighbor07:a:d-3:shame:41",
            "neighbor07:b:d-3:emotion:41",
            "neighbor07:b:d-3:fear:40"
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
          "전 세입자 기억이 현재 권리처럼 섞인다",
          "원래 803이라는 말이 경고와 허락 사이로 뒤틀린다"
        ],
        "truthExitEvidenceIds": [
          "e-3",
          "e-6"
        ],
        "clarifyOutcomeLabel": "오해를 접고 정리 국면으로 간다"
      }
    },
    {
      "id": "d-4",
      "name": "'803' 메모·스티커는 공식 허가였는가",
      "disputeKind": "red_herring",
      "weight": "medium",
      "mediationLink": "이사정리",
      "legitimacyIssue": false,
      "requiredEvidence": [
        "e-1",
        "e-3"
      ],
      "judgmentStatement": "'803' 메모·스티커는 사적 흔적이다.",
      "disputeAliases": [
        "803 메모",
        "803 스티커",
        "열쇠 봉투",
        "사적 흔적",
        "허가 아님"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "그럴듯해 보였던 단서가 무엇인지 드러납니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "neighbor07:a:d-4:uncertainty:1",
            "neighbor07:a:d-4:context:10",
            "neighbor07:b:d-4:privacy:1",
            "neighbor07:b:d-4:rule:0"
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
            "neighbor07:a:d-4:admission:30",
            "neighbor07:a:d-4:shame:31",
            "neighbor07:a:d-4:self_justification:21",
            "neighbor07:b:d-4:emotion:31",
            "neighbor07:b:d-4:institution:30"
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
            "neighbor07:a:d-4:fear:40",
            "neighbor07:a:d-4:shame:41",
            "neighbor07:b:d-4:emotion:41",
            "neighbor07:b:d-4:fear:40"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "misconception": {
        "beliefModeByParty": {
          "a": "misbelief",
          "b": "suspects"
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
          "승인 주체와 기간이 빠진 메모다",
          "스티커는 사적 인수인계 흔적일 뿐이다"
        ],
        "truthExitEvidenceIds": [
          "e-1",
          "e-3"
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
        "e-2",
        "e-5"
      ],
      "judgmentStatement": "나리와 성호는 약속을 깨트렸다.",
      "disputeAliases": [
        "관리실 먼저",
        "첫 문자",
        "먼저 열고 먼저 잠금",
        "쌍방 파기",
        "순서 위반"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "주요 갈등을 키운 주변 사실과 순서가 보입니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "neighbor07:a:d-5:context:1",
            "neighbor07:a:d-5:rule:0",
            "neighbor07:b:d-5:timeline:10",
            "neighbor07:b:d-5:rule:0"
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
            "neighbor07:a:d-5:relationship:31",
            "neighbor07:a:d-5:self_justification:21",
            "neighbor07:b:d-5:motive:21",
            "neighbor07:b:d-5:admission:30",
            "neighbor07:b:d-5:shame:31"
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
            "neighbor07:a:d-5:fear:40",
            "neighbor07:a:d-5:shame:41",
            "neighbor07:b:d-5:emotion:41",
            "neighbor07:b:d-5:fear:40"
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
        "supportBonus": 12,
        "grantFlag": "d-3:surface:marker_not_authority"
      },
      "uiLabel": "표식의 허상"
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
        "supportBonus": 11,
        "grantFlag": "d-5:surface:first_opened"
      },
      "uiLabel": "먼저 열고 사용"
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
        "grantFlag": "d-5:motive:padlock_escalation"
      },
      "uiLabel": "먼저 잠그고 경고"
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
        "grantFlag": "d-1:core:exclusive_right_collapsed"
      },
      "uiLabel": "전용권 붕괴"
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "name": "윤가영이 남긴 열쇠 봉투와 '803' 메모",
      "description": "싱크대 서랍 속 열쇠 봉투와 잠금함 안쪽 '803 사용' 메모 사진. 메모에는 '급하면 여기 두세요'만 있고 승인 주체 기재는 없다.",
      "type": "document",
      "reliability": "soft",
      "completeness": "partial",
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
      "name": "8층 계단실 CCTV와 출입 동선 요약",
      "description": "계단실 CCTV 9분 추출본. 나리가 열쇠로 잠금함을 여는 장면 → 유모차·박스 적치 → 성호가 와서 문 상태 확인까지 연속 기록.",
      "type": "cctv",
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
          "identity",
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
    },
    {
      "id": "e-3",
      "name": "임시사용 승인대장과 퇴거 반납 공지",
      "description": "관리사무소 임시사용 승인대장과 퇴거 반납 공지. 사유는 실내 누수 공사 임시보관, 종료일은 퇴거 하루 전이다.",
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
      "name": "성호의 자물쇠 설치 사진과 손글씨 경고문",
      "description": "성호가 건 추가 자물쇠 사진과 나리 물건 위에 붙인 '공용공간 무단사용 금지' 손글씨 경고문. 관리실 공식 회신 28분 전에 설치됐다.",
      "type": "photo",
      "reliability": "soft",
      "completeness": "original",
      "provenance": "personal_device",
      "legitimacy": "lawful",
      "proves": [
        "d-2"
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
          "identity",
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
          }
        ]
      }
    },
    {
      "id": "e-5",
      "name": "이사 첫날 안내 문자와 단지앱 글·통화 순서표",
      "description": "성호의 첫 안내 문자 → 나리 답장 → 단지앱 경고 글 → 관리실 통화 시간표. 경고 글이 관리실 첫 답변보다 11분 앞서 있다.",
      "type": "chat",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "mixed",
      "legitimacy": "lawful",
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
      "name": "윤가영의 음성메시지",
      "description": "윤가영의 46초 음성메시지. '잠깐 쓰던 데라 열쇠를 못 돌려드렸고, 다음 분도 급하면 쓰실 줄 알았다' — 반납 의무를 기억 못 한 채 사적으로 넘긴 정황.",
      "type": "audio",
      "reliability": "soft",
      "completeness": "original",
      "provenance": "personal_device",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-3"
      ],
      "isTrap": false,
      "requires": [],
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
            "disputeId": "d-3",
            "state": "S2",
            "multiplier": 1.35,
            "note": "d-3의 전제를 걷어내는 창구"
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
          "neighbor07:a:d-1:admission:30",
          "neighbor07:a:d-1:motive:31",
          "neighbor07:b:d-1:timeline:10"
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
          "neighbor07:a:d-4:fear:40",
          "neighbor07:b:d-4:admission:21"
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
          "neighbor07:a:d-2:admission:21",
          "neighbor07:b:d-2:fear:40"
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
          "neighbor07:a:d-5:admission:20",
          "neighbor07:b:d-5:admission:30"
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
          "neighbor07:a:d-3:responsibility:51",
          "neighbor07:b:d-3:fear:40"
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
          "neighbor07:a:d-1:fear:40",
          "neighbor07:b:d-1:emotion:41"
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
      "rapport_heavy",
      "evidence_closer",
      "rule_literal"
    ]
  },
  "proposedUnlockAtoms": []
} as const;
