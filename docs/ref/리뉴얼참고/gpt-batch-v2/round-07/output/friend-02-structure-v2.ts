export const friend02StructureV2 = {
  "caseId": "friend-02",
  "schemaVersion": "structure_v2",
  "proposedUnlockAtoms": [],
  "disputes": [
    {
      "id": "d-1",
      "name": "민재의 비밀 제3자 전달",
      "truth": true,
      "truthDescription": "민재는 가은이 보낸 비밀 음성메모와 요약 대화를 공통 친구 박서후에게 전달하며 조언을 구했고, 그 자체로 가은의 신뢰를 깼다.",
      "quadrant": "b_only",
      "requiredEvidence": [
        "e-1"
      ],
      "correctResponsibility": {
        "a": 20,
        "b": 80
      },
      "ambiguity": "none",
      "weight": "high",
      "mediationLink": "비밀경계",
      "legitimacyIssue": true,
      "judgmentStatement": "민재는 가은의 비밀을 전달했다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "비밀 음성메모",
        "요약 대화",
        "포워드",
        "박서후",
        "뒤풀이 다음 날",
        "제3자 전달"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "겉으로 드러난 순서와 행동이 보입니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend02:a:d-1:s0:0",
            "friend02:a:d-1:s0:1",
            "friend02:b:d-1:s0:0",
            "friend02:b:d-1:s0:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "왜 숨기거나 밀어붙였는지의 심리가 드러납니다.",
          "lockedSummary": "동기 층은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "friend02:a:d-1:s2:0",
            "friend02:a:d-1:s2:1",
            "friend02:b:d-1:s2:0",
            "friend02:b:d-1:s2:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "실제 책임과 관계 손상이 어디서 갈린 건지 보입니다.",
          "lockedSummary": "핵심 책임은 아직 관계 규칙까지 열어야 보입니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-1:motive:motive_opened"
            ]
          },
          "revealAtomIds": [
            "friend02:a:d-1:s4:0",
            "friend02:a:d-1:s4:1",
            "friend02:b:d-1:s4:0",
            "friend02:b:d-1:s4:1"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-2",
      "name": "가은의 무단 열람과 저격성 스토리",
      "truth": true,
      "truthDescription": "가은은 카페에 남겨진 민재의 태블릿 알림과 단톡 미리보기를 무단으로 확인했고, 그 직후 민재를 겨냥한 듯한 인스타 스토리를 올렸다.",
      "quadrant": "a_only",
      "requiredEvidence": [
        "e-3",
        "e-4"
      ],
      "correctResponsibility": {
        "a": 75,
        "b": 25
      },
      "ambiguity": "low",
      "weight": "high",
      "mediationLink": "디지털경계",
      "legitimacyIssue": true,
      "judgmentStatement": "가은은 민재의 태블릿을 무단 열람했다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "자동 로그인 태블릿",
        "19분 뒤",
        "친한친구 스토리",
        "카페 CCTV",
        "무단 열람",
        "스토리 저격"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "겉으로 드러난 순서와 행동이 보입니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend02:a:d-2:s0:0",
            "friend02:a:d-2:s0:1",
            "friend02:b:d-2:s0:0",
            "friend02:b:d-2:s0:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "왜 숨기거나 밀어붙였는지의 심리가 드러납니다.",
          "lockedSummary": "동기 층은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "friend02:a:d-2:s2:0",
            "friend02:a:d-2:s2:1",
            "friend02:b:d-2:s2:0",
            "friend02:b:d-2:s2:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "실제 책임과 관계 손상이 어디서 갈린 건지 보입니다.",
          "lockedSummary": "핵심 책임은 아직 관계 규칙까지 열어야 보입니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-2:motive:motive_opened"
            ]
          },
          "revealAtomIds": [
            "friend02:a:d-2:s4:0",
            "friend02:a:d-2:s4:1",
            "friend02:b:d-2:s4:0",
            "friend02:b:d-2:s4:1"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-3",
      "name": "익명 폭로글과 댓글의 직접 작성자는 민재인가",
      "truth": false,
      "truthDescription": "민재가 의심받을 만한 단서를 남기긴 했지만, 온라인 커뮤니티의 익명 폭로글과 댓글을 직접 작성한 사람은 민재가 아니라 박서후의 보조 계정이었다.",
      "quadrant": "shared_misconception",
      "requiredEvidence": [
        "e-2",
        "e-5"
      ],
      "correctResponsibility": {
        "a": 45,
        "b": 55
      },
      "ambiguity": "low",
      "weight": "high",
      "mediationLink": "동호회절차복구",
      "legitimacyIssue": true,
      "judgmentStatement": "민재는 익명 폭로글을 작성하지 않았다.",
      "disputeKind": "shared_misconception",
      "disputeAliases": [
        "익명 폭로글",
        "말투 캡처",
        "보조계정",
        "민재 작성?",
        "직접 작성자",
        "황유정 로그"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "양쪽이 같은 자료를 다르게 읽은 외형이 보입니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend02:a:d-3:s0:0",
            "friend02:a:d-3:s0:1",
            "friend02:b:d-3:s0:0",
            "friend02:b:d-3:s0:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "왜 그 해석이 굳어졌는지의 심리가 드러납니다.",
          "lockedSummary": "동기 층은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "friend02:a:d-3:s2:0",
            "friend02:a:d-3:s2:1",
            "friend02:b:d-3:s2:0",
            "friend02:b:d-3:s2:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "오해를 걷어낸 뒤 남는 실제 책임이 보입니다.",
          "lockedSummary": "핵심 책임은 아직 관계 규칙까지 열어야 보입니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-3:motive:motive_opened"
            ]
          },
          "revealAtomIds": [
            "friend02:a:d-3:s4:0",
            "friend02:a:d-3:s4:1",
            "friend02:b:d-3:s4:0",
            "friend02:b:d-3:s4:1"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "misconception": {
        "beliefModeByParty": {
          "a": "misbelief",
          "b": "knows"
        },
        "stages": [
          {
            "state": "M0",
            "summary": "외형상 의심이 먼저 선다.",
            "npcMode": "confused_defensive"
          },
          {
            "state": "M1",
            "summary": "해석을 방어하며 당황한다.",
            "npcMode": "mistaken_certainty"
          },
          {
            "state": "M2",
            "summary": "잘못된 해석을 사실처럼 붙든다.",
            "npcMode": "mistaken_certainty"
          },
          {
            "state": "M3",
            "summary": "맥락이 흔들리며 확신이 약해진다.",
            "npcMode": "doubt_creeping"
          },
          {
            "state": "M4",
            "summary": "오해가 정리되고 책임 층위가 갈린다.",
            "npcMode": "clarified"
          }
        ],
        "trapSignals": [
          "민재 말투처럼 보이는 캡처",
          "마지막 전달자=작성자라는 비약",
          "크롭된 게시 캡처"
        ],
        "truthExitEvidenceIds": [
          "e-5",
          "e-6"
        ],
        "clarifyOutcomeLabel": "오해가 정리되고 책임 층위가 갈린다."
      }
    },
    {
      "id": "d-4",
      "name": "박서후의 배후 개입과 음성파일 편집",
      "truth": true,
      "truthDescription": "박서후는 민재에게서 받은 자료를 바탕으로 가은의 음성메모를 잘라 편집하고, 이를 익명계정과 운영진 제보 파일로 확산시켜 둘 사이를 이간질했다.",
      "quadrant": "neither_knows",
      "requiredEvidence": [
        "e-5",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 35,
        "b": 65
      },
      "ambiguity": "none",
      "weight": "high",
      "mediationLink": "동호회절차복구",
      "legitimacyIssue": true,
      "judgmentStatement": "박서후는 가은의 음성을 편집했다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "박서후",
        "편집 음성파일",
        "보조계정",
        "운영진 제보",
        "배후 개입",
        "복구 로그"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "보조 사실과 연결 고리가 보입니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend02:a:d-4:s0:0",
            "friend02:a:d-4:s0:1",
            "friend02:b:d-4:s0:0",
            "friend02:b:d-4:s0:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "세부 맥락 뒤의 계산과 감정이 드러납니다.",
          "lockedSummary": "동기 층은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-4",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "friend02:a:d-4:s2:0",
            "friend02:a:d-4:s2:1",
            "friend02:b:d-4:s2:0",
            "friend02:b:d-4:s2:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "관계 회복에 필요한 정리 포인트가 보입니다.",
          "lockedSummary": "핵심 책임은 아직 관계 규칙까지 열어야 보입니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-4",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-4:motive:motive_opened"
            ]
          },
          "revealAtomIds": [
            "friend02:a:d-4:s4:0",
            "friend02:a:d-4:s4:1",
            "friend02:b:d-4:s4:0",
            "friend02:b:d-4:s4:1"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-5",
      "name": "비밀 외부화 금지 약속의 쌍방 위반",
      "truth": true,
      "truthDescription": "두 사람은 사적인 비밀을 동호회 평판 싸움에 쓰지 않기로 했지만, 민재는 박서후에게 비밀을 전달했고 가은은 확인되지 않은 확신을 바탕으로 저격성 스토리를 올려 약속을 깨뜨렸다.",
      "quadrant": "both_know",
      "requiredEvidence": [
        "e-1",
        "e-3"
      ],
      "correctResponsibility": {
        "a": 58,
        "b": 42
      },
      "ambiguity": "none",
      "weight": "medium",
      "mediationLink": "친구관계재설계",
      "legitimacyIssue": false,
      "judgmentStatement": "민재와 가은은 약속을 위반했다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "비밀 외부화 금지",
        "작년 겨울 약속",
        "조언 핑계",
        "저격 스토리",
        "친구관계",
        "동호회 채널"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "보조 사실과 연결 고리가 보입니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend02:a:d-5:s0:0",
            "friend02:a:d-5:s0:1",
            "friend02:b:d-5:s0:0",
            "friend02:b:d-5:s0:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "세부 맥락 뒤의 계산과 감정이 드러납니다.",
          "lockedSummary": "동기 층은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-5",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "friend02:a:d-5:s2:0",
            "friend02:a:d-5:s2:1",
            "friend02:b:d-5:s2:0",
            "friend02:b:d-5:s2:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "관계 회복에 필요한 정리 포인트가 보입니다.",
          "lockedSummary": "핵심 책임은 아직 관계 규칙까지 열어야 보입니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-5",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-5:motive:motive_opened"
            ]
          },
          "revealAtomIds": [
            "friend02:a:d-5:s4:0",
            "friend02:a:d-5:s4:1",
            "friend02:b:d-5:s4:0",
            "friend02:b:d-5:s4:1"
          ],
          "uiStyle": "relation_core"
        }
      ]
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
        "grantFlag": "d-5:surface:forward_break_visible"
      },
      "uiLabel": "포워드가 약속 위반으로 연결"
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
        "supportBonus": 10,
        "grantFlag": "d-5:motive:story_backlash_visible"
      },
      "uiLabel": "스토리의 맞대응"
    },
    {
      "id": "link:d-4:d-3:unlocks_layer",
      "fromDisputeId": "d-4",
      "toDisputeId": "d-3",
      "type": "unlocks_layer",
      "when": {
        "minState": "S3",
        "minLayer": "motive"
      },
      "effect": {
        "supportBonus": 13,
        "grantFlag": "d-3:core:real_author_open"
      },
      "uiLabel": "직접 작성자 분리"
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
        "supportBonus": 11,
        "grantFlag": "d-4:surface:seed_forward_confirmed"
      },
      "uiLabel": "전달이 편집의 출발점"
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "name": "민재-박서후 메신저 포워드 내역",
      "description": "민재가 가은의 비밀 음성메모와 요약 문장을 박서후에게 전달하며 '나만 알기엔 너무 무거워'라고 보낸 대화 원본이다.",
      "type": "chat",
      "reliability": "soft",
      "completeness": "original",
      "provenance": "personal_device",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-1",
        "d-5"
      ],
      "isTrap": false,
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
          "fact_pursuit"
        ],
        "preferredAngles": [
          "timeline"
        ],
        "blockedVectorsHelp": [
          "identity",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S1",
            "multiplier": 1.22,
            "note": "최초 전달 사실 확정"
          }
        ]
      }
    },
    {
      "id": "e-2",
      "name": "온라인 커뮤니티 익명 폭로글과 댓글 캡처",
      "description": "가은의 비밀 연애와 동호회 역할 조정 이야기를 암시하는 익명 게시글과 댓글 캡처다.",
      "type": "sns",
      "reliability": "soft",
      "completeness": "cropped",
      "provenance": "third_party",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-3"
      ],
      "isTrap": true,
      "timing": {
        "intent": "disarm_trap",
        "role": "reframe",
        "bestAtStates": [
          "S1",
          "S2"
        ],
        "weakAtStates": [
          "S0"
        ],
        "preferredQuestionTypes": [
          "fact_pursuit"
        ],
        "preferredAngles": [
          "identity"
        ],
        "blockedVectorsHelp": [
          "authenticity",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "S2",
            "multiplier": 1.28,
            "note": "작성자 오판 유도 해소"
          }
        ]
      }
    },
    {
      "id": "e-3",
      "name": "가은의 인스타 친한친구 스토리 보관본",
      "description": "'비밀 팔아 관계 지키는 척하는 사람이 제일 비겁하다'는 문구와 모임 사진이 함께 담긴 가은의 스토리 보관본이다.",
      "type": "sns",
      "reliability": "soft",
      "completeness": "original",
      "provenance": "personal_device",
      "legitimacy": "lawful",
      "proves": [
        "d-2",
        "d-5"
      ],
      "isTrap": false,
      "timing": {
        "intent": "expose",
        "role": "impeach",
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
          "identity"
        ],
        "blockedVectorsHelp": [
          "context",
          "emotion"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-2",
            "state": "S2",
            "multiplier": 1.3,
            "note": "스토리 지목성 판단"
          }
        ]
      }
    },
    {
      "id": "e-4",
      "name": "카페 CCTV와 태블릿 자동로그인 기록",
      "description": "가은이 민재의 태블릿 화면을 확인한 시간대를 보여주는 카페 CCTV 일부와 태블릿 세션 로그, 단톡 미리보기 기록이다.",
      "type": "photo_video",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "mixed",
      "legitimacy": "unlawful",
      "proves": [
        "d-2"
      ],
      "isTrap": false,
      "timing": {
        "intent": "corroborate",
        "role": "establish",
        "bestAtStates": [
          "S1",
          "S2"
        ],
        "weakAtStates": [
          "S0"
        ],
        "preferredQuestionTypes": [
          "fact_pursuit"
        ],
        "preferredAngles": [
          "legality"
        ],
        "blockedVectorsHelp": [
          "timeline",
          "identity"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-2",
            "state": "S1",
            "multiplier": 1.22,
            "note": "무단 열람 경로 확인"
          }
        ]
      }
    },
    {
      "id": "e-5",
      "name": "온라인 커뮤니티 운영자 보존로그와 보조계정 복구정보",
      "description": "익명 게시글·댓글을 올린 계정의 접속 기기, 복구 이메일 일부, 삭제 전 보존 로그가 박서후의 보조 계정과 이어지는 자료다.",
      "type": "platform_log",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-3",
        "d-4"
      ],
      "isTrap": false,
      "timing": {
        "intent": "corroborate",
        "role": "finish",
        "bestAtStates": [
          "S2",
          "S4"
        ],
        "weakAtStates": [
          "S0"
        ],
        "preferredQuestionTypes": [
          "evidence_present"
        ],
        "preferredAngles": [
          "identity"
        ],
        "blockedVectorsHelp": [
          "context",
          "authenticity"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "S3",
            "multiplier": 1.35,
            "note": "보조계정과 작성자 확정"
          }
        ]
      }
    },
    {
      "id": "e-6",
      "name": "운영진 제보 음성파일 원본과 편집 비교 리포트",
      "description": "이소담 운영진에게 전달된 음성파일이 가은의 원래 음성메모 일부를 잘라 재배열한 것임을 보여주는 원본 대조 리포트다.",
      "type": "audio_report",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "mixed",
      "legitimacy": "lawful",
      "proves": [
        "d-4"
      ],
      "isTrap": false,
      "timing": {
        "intent": "corroborate",
        "role": "finish",
        "bestAtStates": [
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
          "context"
        ],
        "blockedVectorsHelp": [
          "identity",
          "motive"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-4",
            "state": "S3",
            "multiplier": 1.35,
            "note": "편집 개입과 배후 동기 정리"
          }
        ]
      }
    }
  ],
  "freeQuestionHooks": [
    {
      "id": "fq:d-1:forward_recipient",
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
          "friend02:a:d-1:s2:0",
          "friend02:b:d-1:s2:0"
        ],
        "preferredAngleTags": [
          "identity"
        ]
      },
      "refusalTemplates": [
        "그 사람 이름부터 바로 못 박고 싶진 않아요.",
        "지금은 대상을 단정해서 말하기 조심스러워요."
      ]
    },
    {
      "id": "fq:d-1:advice_excuse",
      "intentTag": "motive_probe",
      "allowedAtStates": [
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
          "friend02:a:d-1:s2:0",
          "friend02:b:d-1:s2:0"
        ],
        "preferredAngleTags": [
          "motive"
        ]
      },
      "refusalTemplates": [
        "그 마음을 지금 단어 하나로 자르긴 어렵습니다.",
        "동기만 떼면 다른 뜻으로 들릴 수 있어요."
      ]
    },
    {
      "id": "fq:d-2:tablet_boundary",
      "intentTag": "rule_check",
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
          "friend02:a:d-2:s2:0",
          "friend02:b:d-2:s2:0"
        ],
        "preferredAngleTags": [
          "legality"
        ]
      },
      "refusalTemplates": [
        "약속 문장만 따로 떼면 제 의도는 빠져요.",
        "규칙 얘기만 잘라 말하긴 아직 어렵습니다."
      ]
    },
    {
      "id": "fq:d-3:author_split",
      "intentTag": "evidence_origin",
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
          "friend02:a:d-3:s2:0",
          "friend02:b:d-3:s2:0"
        ],
        "preferredAngleTags": [
          "identity"
        ]
      },
      "refusalTemplates": [
        "그 자료 출처를 지금 단정해서 말하긴 조심스러워요.",
        "원본 흐름을 같이 보지 않으면 또 틀어집니다."
      ]
    },
    {
      "id": "fq:d-4:editing_hand",
      "intentTag": "identity_check",
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
          "friend02:a:d-4:s2:0",
          "friend02:b:d-4:s2:0"
        ],
        "preferredAngleTags": [
          "context",
          "identity"
        ]
      },
      "refusalTemplates": [
        "그 사람 이름부터 바로 못 박고 싶진 않아요.",
        "지금은 대상을 단정해서 말하기 조심스러워요."
      ]
    },
    {
      "id": "fq:d-5:story_scope",
      "intentTag": "damage_scope",
      "allowedAtStates": [
        "S2",
        "S3",
        "S4"
      ],
      "allowedIssueRoles": [
        "sub_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-5",
        "allowAtomIds": [
          "friend02:a:d-5:s2:0",
          "friend02:b:d-5:s2:0"
        ],
        "preferredAngleTags": [
          "identity",
          "emotion"
        ]
      },
      "refusalTemplates": [
        "누가 얼마나 봤는지 추정으로 말하고 싶진 않아요.",
        "파장 범위는 제 기억만으론 확답하기 어려워요."
      ]
    },
    {
      "id": "fq:d-5:future_boundary",
      "intentTag": "repair_intent",
      "allowedAtStates": [
        "S4",
        "S5"
      ],
      "allowedIssueRoles": [
        "sub_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-5",
        "allowAtomIds": [
          "friend02:a:d-5:s2:0",
          "friend02:b:d-5:s2:0"
        ],
        "preferredAngleTags": [
          "motive",
          "emotion"
        ]
      },
      "refusalTemplates": [
        "회복 얘기는 사실 정리가 더 된 뒤에 하고 싶어요.",
        "사과 순서까지 지금 약속하긴 아직 감정이 남아 있어요."
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
  }
};
