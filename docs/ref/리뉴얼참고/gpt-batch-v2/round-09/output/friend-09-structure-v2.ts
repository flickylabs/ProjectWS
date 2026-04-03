export const friend_09_structure_v2 = {
  "caseId": "friend-09",
  "schemaVersion": "structure_v2",
  "disputes": [
    {
      "id": "d-1",
      "name": "도건의 익명 계정 개설과 최종 폭로글 업로드",
      "summary": "도건은 자신의 보조 메일과 기기를 이용해 익명 커뮤니티 계정을 만들고, 조가람을 겨냥한 최종 폭로글과 첫 댓글을 직접 올렸다.",
      "requiredEvidenceIds": [
        "e-4",
        "e-6"
      ],
      "weight": "high",
      "ambiguity": "none",
      "mediationLink": "커뮤니티절차복구",
      "legitimacyIssue": true,
      "judgmentStatement": "도건은 익명 계정을 개설했다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "익명계정",
        "보조메일",
        "운영로그",
        "첫댓글",
        "업로드",
        "삭제시도",
        "도건기기"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "겉으로 드러난 실행과 부인의 모양이 보인다.",
          "lockedSummary": "겉으로 드러난 실행선만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend09:b:d1:s0:act:0",
            "friend09:b:d1:s0:evidence:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "왜 이 행동을 택했는지와 누구를 겨냥했는지가 드러난다.",
          "lockedSummary": "왜 그런 선택이 겹쳤는지는 아직 보이지 않습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "friend09:b:d1:s2:act:0",
            "friend09:b:d1:s2:evidence:1",
            "friend09:b:d1:s3:act:0",
            "friend09:b:d1:s3:evidence:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "행동, 판단, 사후 책임선이 어떻게 맞물렸는지가 드러난다.",
          "lockedSummary": "관계와 책임이 얽힌 핵심 구조는 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-1:surface:timeline_pressed"
            ]
          },
          "revealAtomIds": [
            "friend09:b:d1:s4:act:0",
            "friend09:b:d1:s4:evidence:1",
            "friend09:b:d1:s5:act:0",
            "friend09:b:d1:s5:evidence:1"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-2",
      "name": "유리의 후기 캡처 편집과 외부 재유포",
      "summary": "유리는 구매자 후기와 DM 일부를 잘라 조가람이 상습 문제 셀러처럼 보이게 편집한 비교 이미지를 만들고, 이를 오픈채팅과 공통 지인에게 따로 퍼뜨렸다.",
      "requiredEvidenceIds": [
        "e-1",
        "e-5"
      ],
      "weight": "high",
      "ambiguity": "none",
      "mediationLink": "게시물정정",
      "legitimacyIssue": true,
      "judgmentStatement": "유리는 후기를 편집해 재유포했다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "콜라주",
        "후기비교",
        "구매자DM",
        "편집앱",
        "오픈채팅",
        "재유포",
        "환불문구",
        "말풍선자르기"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "겉으로 드러난 실행과 부인의 모양이 보인다.",
          "lockedSummary": "겉으로 드러난 실행선만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend09:a:d2:s0:act:0",
            "friend09:a:d2:s0:harm:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "왜 이 행동을 택했는지와 누구를 겨냥했는지가 드러난다.",
          "lockedSummary": "왜 그런 선택이 겹쳤는지는 아직 보이지 않습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "friend09:a:d2:s2:act:0",
            "friend09:a:d2:s2:harm:1",
            "friend09:a:d2:s3:act:0",
            "friend09:a:d2:s3:harm:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "행동, 판단, 사후 책임선이 어떻게 맞물렸는지가 드러난다.",
          "lockedSummary": "관계와 책임이 얽힌 핵심 구조는 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-2:surface:timeline_pressed"
            ]
          },
          "revealAtomIds": [
            "friend09:a:d2:s4:act:0",
            "friend09:a:d2:s4:harm:1",
            "friend09:a:d2:s5:act:0",
            "friend09:a:d2:s5:harm:1"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-3",
      "name": "문제의 명예훼손은 도건의 단독 범행인가",
      "summary": "계정 생성과 최종 업로드는 도건 쪽에서 이뤄졌지만, 문구 설계, 후기 이미지 준비, 확산 타이밍 조율은 유리와 도건이 함께 나눠 맡았다.",
      "requiredEvidenceIds": [
        "e-2",
        "e-4",
        "e-5"
      ],
      "weight": "high",
      "ambiguity": "low",
      "mediationLink": "공모정리",
      "legitimacyIssue": true,
      "judgmentStatement": "명예훼손은 도건과 유리의 공동 범행이다.",
      "disputeKind": "shared_misconception",
      "disputeAliases": [
        "단독범행",
        "혼자올림",
        "공동설계",
        "문구조율",
        "역할분담",
        "판흔들기",
        "혼자폭주"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "겉보기엔 그럴듯한 오해의 모양이 보인다.",
          "lockedSummary": "지금은 오해의 껍데기만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend09:a:d3:s0:responsibility:0",
            "friend09:b:d3:s0:responsibility:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "왜 둘 다 그 오해를 붙잡았는지 드러난다.",
          "lockedSummary": "왜 이 오해가 굳었는지는 아직 보이지 않습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              },
              {
                "id": "d-2",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "friend09:b:d3:s2:responsibility:0",
            "friend09:b:d3:s2:evidence:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "오해를 벗기면 실제 책임 배치가 드러난다.",
          "lockedSummary": "오해 뒤의 실제 구조는 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S4"
              },
              {
                "id": "d-2",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-3:surface:misbelief_shaken"
            ]
          },
          "revealAtomIds": [
            "friend09:b:d3:s4:responsibility:0",
            "friend09:b:d3:s4:evidence:1"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "misconception": {
        "beliefModeByParty": {
          "a": "weaponizes",
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
          "계정 로그만 먼저 보면 도건 단독처럼 보인다.",
          "유리의 피해자식 소명만 보면 자료가 멋대로 악용된 듯 보인다.",
          "잘린 후기 콜라주가 유리 단독 편집보다 도건 업로드만 더 눈에 띄게 만든다."
        ],
        "truthExitEvidenceIds": [
          "e-2",
          "e-4",
          "e-5"
        ],
        "clarifyOutcomeLabel": "오해 해소"
      }
    },
    {
      "id": "d-4",
      "name": "가을 시즌마켓 전 경쟁자 매장 공모",
      "summary": "둘은 시즌마켓 부스 심사 직전에 조가람의 신뢰도를 떨어뜨리려 익명 폭로와 후기 캡처 유통을 역할 분담해 실행했다.",
      "requiredEvidenceIds": [
        "e-2",
        "e-3",
        "e-5"
      ],
      "weight": "high",
      "ambiguity": "none",
      "mediationLink": "공모정리",
      "legitimacyIssue": true,
      "judgmentStatement": "조가람의 신뢰도를 떨어뜨렸다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "시즌마켓",
        "부스심사",
        "판흔들기",
        "경쟁셀러",
        "조가람",
        "공모",
        "심사직전"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "앞뒤 맥락과 후속 조치의 겉면이 보인다.",
          "lockedSummary": "주변 맥락은 아직 흐릿합니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend09:a:d4:s0:motive:0",
            "friend09:a:d4:s0:harm:1",
            "friend09:b:d4:s0:motive:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "체면, 관계, 불안이 왜 개입했는지 드러난다.",
          "lockedSummary": "왜 그 맥락이 중요해졌는지는 아직 보이지 않습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "friend09:a:d4:s2:motive:0",
            "friend09:a:d4:s2:harm:1",
            "friend09:a:d4:s3:motive:0",
            "friend09:a:d4:s3:harm:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "주요 쟁점을 지탱하거나 흔드는 연결 구조가 드러난다.",
          "lockedSummary": "연결된 책임 구조는 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-4",
                "minState": "S4"
              },
              {
                "id": "d-1",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-4:motive:context_open"
            ]
          },
          "revealAtomIds": [
            "friend09:a:d4:s4:motive:0",
            "friend09:a:d4:s4:harm:1"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-5",
      "name": "과거 가람 분쟁을 숨긴 사후 책임전가",
      "summary": "폭로가 들통난 뒤 둘은 8개월 전 가람과의 갈등과 공동 준비 사실을 숨긴 채, 상대가 자신을 끌어들였다고 공통 친구와 운영자에게 각각 다른 이야기를 했다.",
      "requiredEvidenceIds": [
        "e-3",
        "e-6"
      ],
      "weight": "medium",
      "ambiguity": "none",
      "mediationLink": "친구관계재설계",
      "legitimacyIssue": false,
      "judgmentStatement": "가람과의 갈등을 숨겼다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "8개월전",
        "향료라벨",
        "공개지적",
        "소명DM",
        "책임전가",
        "공통친구",
        "다른설명"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "앞뒤 맥락과 후속 조치의 겉면이 보인다.",
          "lockedSummary": "주변 맥락은 아직 흐릿합니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend09:b:d5:s0:legacy_sentence:0",
            "friend09:b:d5:s0:responsibility:1",
            "friend09:a:d5:s0:legacy_sentence:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "체면, 관계, 불안이 왜 개입했는지 드러난다.",
          "lockedSummary": "왜 그 맥락이 중요해졌는지는 아직 보이지 않습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "friend09:b:d5:s2:legacy_sentence:0",
            "friend09:b:d5:s2:responsibility:1",
            "friend09:b:d5:s3:legacy_sentence:0",
            "friend09:b:d5:s3:responsibility:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "주요 쟁점을 지탱하거나 흔드는 연결 구조가 드러난다.",
          "lockedSummary": "연결된 책임 구조는 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-5",
                "minState": "S4"
              },
              {
                "id": "d-1",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-5:motive:context_open"
            ]
          },
          "revealAtomIds": [
            "friend09:a:d5:s4:legacy_sentence:0",
            "friend09:a:d5:s4:responsibility:1",
            "friend09:b:d5:s4:legacy_sentence:0",
            "friend09:b:d5:s4:responsibility:1"
          ],
          "uiStyle": "relation_core"
        }
      ]
    }
  ],
  "linkEdges": [
    {
      "id": "link:d-2:d-3:supports",
      "fromDisputeId": "d-2",
      "toDisputeId": "d-3",
      "type": "supports",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 12,
        "grantFlag": "d-3:surface:shared_design_open"
      },
      "uiLabel": "콜라주가 단독범행론을 약화"
    },
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
        "supportBonus": 12,
        "grantFlag": "d-3:surface:account_role_open"
      },
      "uiLabel": "계정 실행이 공모구조를 드러냄"
    },
    {
      "id": "link:d-4:d-1:unlocks_layer",
      "fromDisputeId": "d-4",
      "toDisputeId": "d-1",
      "type": "unlocks_layer",
      "when": {
        "minState": "S2",
        "minLayer": "motive"
      },
      "effect": {
        "supportBonus": 10,
        "grantFlag": "d-1:core:plot_context_open"
      },
      "uiLabel": "심사 직전 공모 맥락"
    },
    {
      "id": "link:d-4:d-2:unlocks_layer",
      "fromDisputeId": "d-4",
      "toDisputeId": "d-2",
      "type": "unlocks_layer",
      "when": {
        "minState": "S2",
        "minLayer": "motive"
      },
      "effect": {
        "supportBonus": 10,
        "grantFlag": "d-2:core:redistribution_context_open"
      },
      "uiLabel": "확산 의도 연결"
    },
    {
      "id": "link:d-5:d-4:retaliation",
      "fromDisputeId": "d-5",
      "toDisputeId": "d-4",
      "type": "retaliation",
      "when": {
        "minState": "S3",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 8,
        "grantFlag": "d-4:core:blame_shift_seen"
      },
      "uiLabel": "사후 숨김이 공모를 굳힘"
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "name": "커뮤니티에 퍼진 후기 비교 콜라주 캡처",
      "description": "조가람의 후기와 구매자 DM 일부가 한 장에 붙어 있어 상습 문제 셀러처럼 보이게 만드는 콜라주 이미지다.",
      "type": "sns",
      "reliability": "soft",
      "completeness": "cropped",
      "provenance": "third_party",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-2",
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
            "multiplier": 1.35,
            "note": "잘린 첫 인상이 굳기 전에 제시할수록 오해를 빨리 걷어낸다."
          }
        ]
      }
    },
    {
      "id": "e-2",
      "name": "유리-도건 원본 메신저 export와 음성메모",
      "description": "시즌마켓 부스 발표 전 조가람 이슈를 '판 흔들기'로 쓰자며 문구와 업로드 시점을 맞춘 두 사람의 대화 원본이다.",
      "type": "platform_log",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "mixed",
      "legitimacy": "lawful",
      "proves": [
        "d-1",
        "d-3",
        "d-4"
      ],
      "isTrap": false,
      "timing": {
        "intent": "expose",
        "role": "establish",
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
          "timeline",
          "identity"
        ],
        "blockedVectorsHelp": [
          "timeline",
          "identity"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S2",
            "multiplier": 1.3,
            "note": "행위 주체와 시점을 먼저 못 박는 데 가장 강하다."
          }
        ]
      }
    },
    {
      "id": "e-3",
      "name": "8개월 전 조가람 공개 지적 글과 후속 DM",
      "description": "조가람이 유리의 향료 라벨 문제를 공개 지적했던 글과, 그 뒤 유리와 도건이 앙금을 나누는 후속 DM 원본이다.",
      "type": "document",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "mixed",
      "legitimacy": "lawful",
      "proves": [
        "d-4",
        "d-5"
      ],
      "isTrap": false,
      "timing": {
        "intent": "corroborate",
        "role": "finish",
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
          "context",
          "legality"
        ],
        "blockedVectorsHelp": [
          "context",
          "legality"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-4",
            "state": "S2",
            "multiplier": 1.3,
            "note": "이미 열린 진술을 굳히고 후속 책임선을 정리하는 데 좋다."
          }
        ]
      }
    },
    {
      "id": "e-4",
      "name": "커뮤니티 익명계정 가입·로그인·삭제 로그",
      "description": "문제 익명계정이 도건의 보조 메일과 기기에서 생성되어 폭로글과 첫 댓글을 올린 뒤 급히 삭제된 기록이다.",
      "type": "platform_log",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-1",
        "d-3"
      ],
      "isTrap": false,
      "timing": {
        "intent": "expose",
        "role": "establish",
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
          "timeline",
          "identity"
        ],
        "blockedVectorsHelp": [
          "timeline",
          "identity"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S2",
            "multiplier": 1.3,
            "note": "행위 주체와 시점을 먼저 못 박는 데 가장 강하다."
          }
        ]
      }
    },
    {
      "id": "e-5",
      "name": "유리 휴대폰 갤러리 백업과 편집앱 프로젝트 파일",
      "description": "조가람 후기 캡처, 구매자 DM 조각, 콜라주 배치 이력이 남은 유리 휴대폰의 갤러리 백업과 편집앱 프로젝트 파일이다.",
      "type": "platform_log",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "personal_device",
      "legitimacy": "lawful",
      "proves": [
        "d-2",
        "d-3",
        "d-4",
        "d-5"
      ],
      "isTrap": false,
      "timing": {
        "intent": "expose",
        "role": "establish",
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
          "timeline",
          "identity"
        ],
        "blockedVectorsHelp": [
          "timeline",
          "identity"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-2",
            "state": "S2",
            "multiplier": 1.3,
            "note": "행위 주체와 시점을 먼저 못 박는 데 가장 강하다."
          }
        ]
      }
    },
    {
      "id": "e-6",
      "name": "운영자 소명 DM과 둘의 삭제·책임전가 대화",
      "description": "운영자 조사가 시작된 뒤 도건과 유리가 서로 다른 소명서를 보내고, 동시에 게시물 삭제와 책임선을 조율한 대화 원본이다.",
      "type": "chat",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "mixed",
      "legitimacy": "lawful",
      "proves": [
        "d-1",
        "d-5"
      ],
      "isTrap": false,
      "timing": {
        "intent": "corroborate",
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
          "motive_search",
          "evidence_present"
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
            "note": "말의 순서와 뉘앙스를 비교해 책임선을 좁히는 데 유리하다."
          }
        ]
      }
    }
  ],
  "freeQuestionHooks": [
    {
      "id": "fq:d-1:account_identity",
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
          "friend09:b:d1:s2:act:0",
          "friend09:b:d1:s2:evidence:1"
        ],
        "preferredAngleTags": [
          "identity"
        ]
      },
      "refusalTemplates": [
        "지금은 그 주체를 바로 잘라 말하고 싶지 않아요.",
        "누가 먼저였는지까지는 아직 정리해서 말하겠습니다."
      ]
    },
    {
      "id": "fq:d-1:first_comment_cleanup",
      "intentTag": "timeline_check",
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
          "friend09:b:d1:s2:act:0",
          "friend09:b:d1:s2:evidence:1"
        ],
        "preferredAngleTags": [
          "timeline"
        ]
      },
      "refusalTemplates": [
        "그 순서를 다시 꺼내면 얘기가 더 꼬여요.",
        "그 시점은 지금 한 줄로 잘라 답하기 어렵습니다."
      ]
    },
    {
      "id": "fq:d-2:collage_origin",
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
        "disputeId": "d-2",
        "allowAtomIds": [
          "friend09:a:d2:s2:act:0",
          "friend09:a:d2:s2:harm:1"
        ],
        "preferredAngleTags": [
          "identity"
        ]
      },
      "refusalTemplates": [
        "지금은 그 주체를 바로 잘라 말하고 싶지 않아요.",
        "누가 먼저였는지까지는 아직 정리해서 말하겠습니다."
      ]
    },
    {
      "id": "fq:d-2:crop_reason",
      "intentTag": "context_check",
      "allowedAtStates": [
        "S3",
        "S4",
        "S5"
      ],
      "allowedIssueRoles": [
        "core_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-2",
        "allowAtomIds": [
          "friend09:a:d2:s2:act:0",
          "friend09:a:d2:s2:harm:1"
        ],
        "preferredAngleTags": [
          "context"
        ]
      },
      "refusalTemplates": [
        "맥락까지 다 풀면 여기서 끝나지 않아요.",
        "앞뒤를 다 말해야 해서 지금은 짧게 답하기 어렵습니다."
      ]
    },
    {
      "id": "fq:d-4:timing_motive",
      "intentTag": "motive_probe",
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
          "friend09:a:d4:s4:motive:0",
          "friend09:a:d4:s4:harm:1"
        ],
        "preferredAngleTags": [
          "motive"
        ]
      },
      "refusalTemplates": [
        "의도 얘기까지 가면 감정이 너무 섞여요.",
        "왜 그랬는지까지는 아직 바로 말하고 싶지 않습니다."
      ]
    },
    {
      "id": "fq:d-5:old_conflict_hidden",
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
        "disputeId": "d-5",
        "allowAtomIds": [
          "friend09:a:d5:s2:legacy_sentence:0",
          "friend09:a:d5:s2:responsibility:1",
          "friend09:b:d5:s2:legacy_sentence:0",
          "friend09:b:d5:s2:responsibility:1"
        ],
        "preferredAngleTags": [
          "context"
        ]
      },
      "refusalTemplates": [
        "맥락까지 다 풀면 여기서 끝나지 않아요.",
        "앞뒤를 다 말해야 해서 지금은 짧게 답하기 어렵습니다."
      ]
    },
    {
      "id": "fq:d-5:split_story_shame",
      "intentTag": "emotion_probe",
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
          "friend09:a:d5:s4:legacy_sentence:0",
          "friend09:a:d5:s4:responsibility:1",
          "friend09:b:d5:s4:legacy_sentence:0",
          "friend09:b:d5:s4:responsibility:1"
        ],
        "preferredAngleTags": [
          "emotion"
        ]
      },
      "refusalTemplates": [
        "그 감정은 지금 바로 꺼내기 어렵습니다.",
        "그 부분은 말하면 제가 먼저 무너질 것 같아요."
      ]
    }
  ],
  "proposedUnlockAtoms": [
    {
      "id": "friend09:a:d-2:unlock:s2:01",
      "legacySourceId": "d2.unlock.s2.a_collage_origin",
      "party": "a",
      "disputeId": "d-2",
      "unlockedAtState": "S2",
      "factText": "유리가 e-1과 일치하는 후기·DM 콜라주를 자기 휴대폰 편집앱 프로젝트에서 직접 생성했다는 사실",
      "tags": [
        "act",
        "evidence",
        "admission"
      ],
      "slots": {
        "actor": {
          "fullName": "한유리",
          "judgeRef": "유리 씨",
          "neutral": "그 사람"
        },
        "person": {
          "fullName": "조가람",
          "judgeRef": "가람 씨",
          "neutral": "상대 셀러"
        },
        "evidence": {
          "exact": "후기·구매자 DM 비교 콜라주 이미지",
          "judgeRef": "문제 콜라주",
          "neutral": "그 편집본"
        },
        "time": {
          "dateExact": "폭로글 게시 40분 전",
          "period": "게시 직전",
          "neutral": "그 전에"
        },
        "channel": {
          "exact": "오픈채팅과 공통 지인 재전달",
          "judgeRef": "외부 재유포",
          "neutral": "다른 채널 유포"
        }
      },
      "stanceHints": [
        "partial",
        "counter"
      ]
    },
    {
      "id": "friend09:a:d-2:unlock:s3:01",
      "legacySourceId": "d2.unlock.s3.a_selective_crop",
      "party": "a",
      "disputeId": "d-2",
      "unlockedAtState": "S3",
      "factText": "유리가 정상 응대와 환불 완료 문장을 빼고 말풍선과 여백을 조정해 조가람이 상습 문제 셀러처럼 보이게 잘랐다는 사실",
      "tags": [
        "evidence",
        "harm",
        "responsibility"
      ],
      "slots": {
        "actor": {
          "fullName": "한유리",
          "judgeRef": "유리 씨",
          "neutral": "그 사람"
        },
        "person": {
          "fullName": "조가람",
          "judgeRef": "가람 씨",
          "neutral": "상대 셀러"
        },
        "evidence": {
          "exact": "후기·구매자 DM 비교 콜라주 이미지",
          "judgeRef": "문제 콜라주",
          "neutral": "그 편집본"
        },
        "time": {
          "dateExact": "폭로글 게시 40분 전",
          "period": "게시 직전",
          "neutral": "그 전에"
        },
        "channel": {
          "exact": "오픈채팅과 공통 지인 재전달",
          "judgeRef": "외부 재유포",
          "neutral": "다른 채널 유포"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ]
    },
    {
      "id": "friend09:a:d-2:unlock:s4:01",
      "legacySourceId": "d2.unlock.s4.a_grudge_filter",
      "party": "a",
      "disputeId": "d-2",
      "unlockedAtState": "S4",
      "factText": "8개월 전 공개 지적의 앙금 때문에 유리가 불리한 문맥을 의도적으로 남기지 않았다는 감정 동기",
      "tags": [
        "motive",
        "emotion",
        "shame"
      ],
      "slots": {
        "actor": {
          "fullName": "한유리",
          "judgeRef": "유리 씨",
          "neutral": "그 사람"
        },
        "person": {
          "fullName": "조가람",
          "judgeRef": "가람 씨",
          "neutral": "상대 셀러"
        },
        "evidence": {
          "exact": "후기·구매자 DM 비교 콜라주 이미지",
          "judgeRef": "문제 콜라주",
          "neutral": "그 편집본"
        },
        "time": {
          "dateExact": "폭로글 게시 40분 전",
          "period": "게시 직전",
          "neutral": "그 전에"
        },
        "channel": {
          "exact": "오픈채팅과 공통 지인 재전달",
          "judgeRef": "외부 재유포",
          "neutral": "다른 채널 유포"
        },
        "legacy": {
          "exact": "8개월 전 조가람의 공개 지적",
          "judgeRef": "예전 공개 지적",
          "neutral": "그 이전 일"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ]
    },
    {
      "id": "friend09:a:d-2:unlock:s5:01",
      "legacySourceId": "d2.unlock.s5.a_redistribution_confess",
      "party": "a",
      "disputeId": "d-2",
      "unlockedAtState": "S5",
      "factText": "유리가 오픈채팅과 공통 지인에게 편집본을 다시 퍼뜨리며 조가람 해석을 의도적으로 유도했다는 완전 시인",
      "tags": [
        "admission",
        "harm",
        "privacy"
      ],
      "slots": {
        "actor": {
          "fullName": "한유리",
          "judgeRef": "유리 씨",
          "neutral": "그 사람"
        },
        "person": {
          "fullName": "조가람",
          "judgeRef": "가람 씨",
          "neutral": "상대 셀러"
        },
        "evidence": {
          "exact": "후기·구매자 DM 비교 콜라주 이미지",
          "judgeRef": "문제 콜라주",
          "neutral": "그 편집본"
        },
        "time": {
          "dateExact": "폭로글 게시 40분 전",
          "period": "게시 직전",
          "neutral": "그 전에"
        },
        "channel": {
          "exact": "오픈채팅과 공통 지인 재전달",
          "judgeRef": "외부 재유포",
          "neutral": "다른 채널 유포"
        }
      },
      "stanceHints": [
        "confess",
        "responsibility"
      ]
    },
    {
      "id": "friend09:a:d-4:unlock:s2:01",
      "legacySourceId": "d4.unlock.s2.a_timing_calc",
      "party": "a",
      "disputeId": "d-4",
      "unlockedAtState": "S2",
      "factText": "유리가 시즌마켓 부스 심사 직전에 타격이 커질 시점을 계산해 자료를 모았다는 사실",
      "tags": [
        "timeline",
        "context",
        "admission"
      ],
      "slots": {
        "person": {
          "fullName": "조가람",
          "judgeRef": "가람 씨",
          "neutral": "경쟁 셀러"
        },
        "time": {
          "dateExact": "가을 시즌마켓 부스 심사 직전",
          "period": "심사 직전",
          "neutral": "그 시기"
        },
        "institution": {
          "exact": "시즌마켓 셀러존 부스 심사",
          "judgeRef": "부스 심사",
          "neutral": "심사 일정"
        },
        "motive": {
          "exact": "8개월 전 공개 지적과 사업 손실의 앙금",
          "judgeRef": "예전 앙금",
          "neutral": "이전 감정"
        }
      },
      "stanceHints": [
        "partial",
        "counter"
      ]
    },
    {
      "id": "friend09:a:d-4:unlock:s3:01",
      "legacySourceId": "d4.unlock.s3.a_old_grudge",
      "party": "a",
      "disputeId": "d-4",
      "unlockedAtState": "S3",
      "factText": "8개월 전 조가람 공개 지적과 주문 취소 기억이 현재 공모의 직접 동기로 이어졌다는 사실",
      "tags": [
        "motive",
        "legacy_sentence",
        "harm"
      ],
      "slots": {
        "person": {
          "fullName": "조가람",
          "judgeRef": "가람 씨",
          "neutral": "경쟁 셀러"
        },
        "time": {
          "dateExact": "가을 시즌마켓 부스 심사 직전",
          "period": "심사 직전",
          "neutral": "그 시기"
        },
        "institution": {
          "exact": "시즌마켓 셀러존 부스 심사",
          "judgeRef": "부스 심사",
          "neutral": "심사 일정"
        },
        "motive": {
          "exact": "8개월 전 공개 지적과 사업 손실의 앙금",
          "judgeRef": "예전 앙금",
          "neutral": "이전 감정"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ]
    },
    {
      "id": "friend09:a:d-4:unlock:s4:01",
      "legacySourceId": "d4.unlock.s4.a_revenge_intent",
      "party": "a",
      "disputeId": "d-4",
      "unlockedAtState": "S4",
      "factText": "유리가 단순 경고가 아니라 조가람의 신뢰도 자체를 흔들려 했다는 복수 의도를 드러낸 감정 누설",
      "tags": [
        "motive",
        "emotion",
        "harm"
      ],
      "slots": {
        "person": {
          "fullName": "조가람",
          "judgeRef": "가람 씨",
          "neutral": "경쟁 셀러"
        },
        "time": {
          "dateExact": "가을 시즌마켓 부스 심사 직전",
          "period": "심사 직전",
          "neutral": "그 시기"
        },
        "institution": {
          "exact": "시즌마켓 셀러존 부스 심사",
          "judgeRef": "부스 심사",
          "neutral": "심사 일정"
        },
        "motive": {
          "exact": "8개월 전 공개 지적과 사업 손실의 앙금",
          "judgeRef": "예전 앙금",
          "neutral": "이전 감정"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ]
    },
    {
      "id": "friend09:a:d-4:unlock:s5:01",
      "legacySourceId": "d4.unlock.s5.a_joint_plot_confess",
      "party": "a",
      "disputeId": "d-4",
      "unlockedAtState": "S5",
      "factText": "유리가 이미지 제작과 외부 확산 역할을 맡고 도건과 함께 경쟁자 제거형 공모를 실행했다고 시인하는 사실",
      "tags": [
        "admission",
        "responsibility",
        "beneficiary"
      ],
      "slots": {
        "person": {
          "fullName": "조가람",
          "judgeRef": "가람 씨",
          "neutral": "경쟁 셀러"
        },
        "time": {
          "dateExact": "가을 시즌마켓 부스 심사 직전",
          "period": "심사 직전",
          "neutral": "그 시기"
        },
        "institution": {
          "exact": "시즌마켓 셀러존 부스 심사",
          "judgeRef": "부스 심사",
          "neutral": "심사 일정"
        },
        "motive": {
          "exact": "8개월 전 공개 지적과 사업 손실의 앙금",
          "judgeRef": "예전 앙금",
          "neutral": "이전 감정"
        }
      },
      "stanceHints": [
        "confess",
        "responsibility"
      ]
    },
    {
      "id": "friend09:a:d-5:unlock:s2:01",
      "legacySourceId": "d5.unlock.s2.a_old_conflict_hidden",
      "party": "a",
      "disputeId": "d-5",
      "unlockedAtState": "S2",
      "factText": "유리가 운영자 소명과 친구 설명에서 8개월 전 가람 분쟁을 의도적으로 뺐다는 사실",
      "tags": [
        "legacy_sentence",
        "institution",
        "admission"
      ],
      "slots": {
        "person": {
          "fullName": "조가람",
          "judgeRef": "가람 씨",
          "neutral": "그 사람"
        },
        "time": {
          "dateExact": "8개월 전 분쟁 이후~운영자 조사 직후",
          "period": "사후 소명 단계",
          "neutral": "그 뒤"
        },
        "institution": {
          "exact": "운영자 소명 DM과 공통 친구 설명",
          "judgeRef": "소명과 설명",
          "neutral": "사후 해명"
        },
        "legacy": {
          "exact": "과거 가람 분쟁과 공동 준비 사실",
          "judgeRef": "이전 얘기",
          "neutral": "숨긴 전사"
        }
      },
      "stanceHints": [
        "partial",
        "counter"
      ]
    },
    {
      "id": "friend09:a:d-5:unlock:s3:01",
      "legacySourceId": "d5.unlock.s3.a_split_story",
      "party": "a",
      "disputeId": "d-5",
      "unlockedAtState": "S3",
      "factText": "유리가 공통 친구와 운영자에게 서로 다른 설명을 보내 도건 쪽 책임이 더 커 보이게 만든 사실",
      "tags": [
        "responsibility",
        "institution",
        "counter"
      ],
      "slots": {
        "person": {
          "fullName": "조가람",
          "judgeRef": "가람 씨",
          "neutral": "그 사람"
        },
        "time": {
          "dateExact": "8개월 전 분쟁 이후~운영자 조사 직후",
          "period": "사후 소명 단계",
          "neutral": "그 뒤"
        },
        "institution": {
          "exact": "운영자 소명 DM과 공통 친구 설명",
          "judgeRef": "소명과 설명",
          "neutral": "사후 해명"
        },
        "legacy": {
          "exact": "과거 가람 분쟁과 공동 준비 사실",
          "judgeRef": "이전 얘기",
          "neutral": "숨긴 전사"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ]
    },
    {
      "id": "friend09:a:d-5:unlock:s4:01",
      "legacySourceId": "d5.unlock.s4.a_shame_admit",
      "party": "a",
      "disputeId": "d-5",
      "unlockedAtState": "S4",
      "factText": "사적인 앙금이 드러나면 장사보다 인성 문제로 회자될까 두려워 유리가 예전 분쟁을 숨겼다는 감정 누설",
      "tags": [
        "emotion",
        "shame",
        "fear"
      ],
      "slots": {
        "person": {
          "fullName": "조가람",
          "judgeRef": "가람 씨",
          "neutral": "그 사람"
        },
        "time": {
          "dateExact": "8개월 전 분쟁 이후~운영자 조사 직후",
          "period": "사후 소명 단계",
          "neutral": "그 뒤"
        },
        "institution": {
          "exact": "운영자 소명 DM과 공통 친구 설명",
          "judgeRef": "소명과 설명",
          "neutral": "사후 해명"
        },
        "legacy": {
          "exact": "과거 가람 분쟁과 공동 준비 사실",
          "judgeRef": "이전 얘기",
          "neutral": "숨긴 전사"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ]
    },
    {
      "id": "friend09:a:d-5:unlock:s5:01",
      "legacySourceId": "d5.unlock.s5.a_blame_shift_confess",
      "party": "a",
      "disputeId": "d-5",
      "unlockedAtState": "S5",
      "factText": "유리가 공동 준비 사실을 숨긴 채 도건을 단독 주범처럼 세워 책임을 넘겼다고 최종 시인하는 사실",
      "tags": [
        "admission",
        "responsibility",
        "relationship"
      ],
      "slots": {
        "person": {
          "fullName": "조가람",
          "judgeRef": "가람 씨",
          "neutral": "그 사람"
        },
        "time": {
          "dateExact": "8개월 전 분쟁 이후~운영자 조사 직후",
          "period": "사후 소명 단계",
          "neutral": "그 뒤"
        },
        "institution": {
          "exact": "운영자 소명 DM과 공통 친구 설명",
          "judgeRef": "소명과 설명",
          "neutral": "사후 해명"
        },
        "legacy": {
          "exact": "과거 가람 분쟁과 공동 준비 사실",
          "judgeRef": "이전 얘기",
          "neutral": "숨긴 전사"
        }
      },
      "stanceHints": [
        "confess",
        "responsibility"
      ]
    },
    {
      "id": "friend09:b:d-1:unlock:s2:01",
      "legacySourceId": "d1.unlock.s2.b_account_creation",
      "party": "b",
      "disputeId": "d-1",
      "unlockedAtState": "S2",
      "factText": "도건이 자신의 보조 메일과 기기로 문제 익명계정을 만들고 로그인했다는 사실",
      "tags": [
        "act",
        "identity",
        "admission"
      ],
      "slots": {
        "actor": {
          "fullName": "윤도건",
          "judgeRef": "도건 씨",
          "neutral": "그 사람"
        },
        "person": {
          "fullName": "조가람",
          "judgeRef": "가람 씨",
          "neutral": "상대 셀러"
        },
        "account": {
          "exact": "도건의 보조 메일과 기기로 만든 익명 커뮤니티 계정",
          "judgeRef": "문제 익명 계정",
          "neutral": "그 계정"
        },
        "time": {
          "dateExact": "폭로글 게시 당일",
          "period": "게시 두 시간 전~운영자 문의 직후",
          "neutral": "그 시점"
        },
        "institution": {
          "exact": "커뮤니티 운영 로그",
          "judgeRef": "운영자 로그",
          "neutral": "플랫폼 기록"
        }
      },
      "stanceHints": [
        "partial",
        "counter"
      ]
    },
    {
      "id": "friend09:b:d-1:unlock:s3:01",
      "legacySourceId": "d1.unlock.s3.b_first_comment_delete",
      "party": "b",
      "disputeId": "d-1",
      "unlockedAtState": "S3",
      "factText": "도건이 첫 댓글 작성과 삭제 시도까지 직접 했다는 실행 책임 사실",
      "tags": [
        "act",
        "timeline",
        "responsibility"
      ],
      "slots": {
        "actor": {
          "fullName": "윤도건",
          "judgeRef": "도건 씨",
          "neutral": "그 사람"
        },
        "person": {
          "fullName": "조가람",
          "judgeRef": "가람 씨",
          "neutral": "상대 셀러"
        },
        "account": {
          "exact": "도건의 보조 메일과 기기로 만든 익명 커뮤니티 계정",
          "judgeRef": "문제 익명 계정",
          "neutral": "그 계정"
        },
        "time": {
          "dateExact": "폭로글 게시 당일",
          "period": "게시 두 시간 전~운영자 문의 직후",
          "neutral": "그 시점"
        },
        "institution": {
          "exact": "커뮤니티 운영 로그",
          "judgeRef": "운영자 로그",
          "neutral": "플랫폼 기록"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ]
    },
    {
      "id": "friend09:b:d-1:unlock:s4:01",
      "legacySourceId": "d1.unlock.s4.b_panic_cleanup",
      "party": "b",
      "disputeId": "d-1",
      "unlockedAtState": "S4",
      "factText": "운영자 문의 18분 뒤 도건이 유리와 삭제·표현 수정 여부를 상의한 사실",
      "tags": [
        "timeline",
        "institution",
        "emotion"
      ],
      "slots": {
        "actor": {
          "fullName": "윤도건",
          "judgeRef": "도건 씨",
          "neutral": "그 사람"
        },
        "person": {
          "fullName": "조가람",
          "judgeRef": "가람 씨",
          "neutral": "상대 셀러"
        },
        "account": {
          "exact": "도건의 보조 메일과 기기로 만든 익명 커뮤니티 계정",
          "judgeRef": "문제 익명 계정",
          "neutral": "그 계정"
        },
        "time": {
          "dateExact": "폭로글 게시 당일",
          "period": "게시 두 시간 전~운영자 문의 직후",
          "neutral": "그 시점"
        },
        "institution": {
          "exact": "커뮤니티 운영 로그",
          "judgeRef": "운영자 로그",
          "neutral": "플랫폼 기록"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ]
    },
    {
      "id": "friend09:b:d-1:unlock:s5:01",
      "legacySourceId": "d1.unlock.s5.b_upload_confess",
      "party": "b",
      "disputeId": "d-1",
      "unlockedAtState": "S5",
      "factText": "도건이 최종 폭로글 업로드와 첫 댓글 실행을 자기 책임으로 인정하는 완전 시인",
      "tags": [
        "admission",
        "responsibility",
        "act"
      ],
      "slots": {
        "actor": {
          "fullName": "윤도건",
          "judgeRef": "도건 씨",
          "neutral": "그 사람"
        },
        "person": {
          "fullName": "조가람",
          "judgeRef": "가람 씨",
          "neutral": "상대 셀러"
        },
        "account": {
          "exact": "도건의 보조 메일과 기기로 만든 익명 커뮤니티 계정",
          "judgeRef": "문제 익명 계정",
          "neutral": "그 계정"
        },
        "time": {
          "dateExact": "폭로글 게시 당일",
          "period": "게시 두 시간 전~운영자 문의 직후",
          "neutral": "그 시점"
        },
        "institution": {
          "exact": "커뮤니티 운영 로그",
          "judgeRef": "운영자 로그",
          "neutral": "플랫폼 기록"
        }
      },
      "stanceHints": [
        "confess",
        "responsibility"
      ]
    },
    {
      "id": "friend09:b:d-3:unlock:s2:01",
      "legacySourceId": "d3.unlock.s2.b_shared_design",
      "party": "b",
      "disputeId": "d-3",
      "unlockedAtState": "S2",
      "factText": "도건이 유리와 함께 폭로 문구 설계와 확산 타이밍을 맞췄다는 사실",
      "tags": [
        "context",
        "institution",
        "admission"
      ],
      "slots": {
        "person": {
          "fullName": "조가람",
          "judgeRef": "가람 씨",
          "neutral": "상대 셀러"
        },
        "roles": {
          "exact": "유리=이미지·확산 / 도건=계정·업로드",
          "judgeRef": "역할 분담",
          "neutral": "각자 맡은 부분"
        },
        "time": {
          "dateExact": "부스 발표 전날 밤~당일 오전",
          "period": "사전 조율 구간",
          "neutral": "그 준비 단계"
        },
        "institution": {
          "exact": "메신저 export와 플랫폼 로그",
          "judgeRef": "대화 원본",
          "neutral": "원본 기록"
        }
      },
      "stanceHints": [
        "partial",
        "counter"
      ]
    },
    {
      "id": "friend09:b:d-3:unlock:s3:01",
      "legacySourceId": "d3.unlock.s3.b_role_split",
      "party": "b",
      "disputeId": "d-3",
      "unlockedAtState": "S3",
      "factText": "유리=이미지·확산, 도건=계정·업로드라는 역할 분담이 실제로 존재했다는 사실",
      "tags": [
        "responsibility",
        "context",
        "act"
      ],
      "slots": {
        "person": {
          "fullName": "조가람",
          "judgeRef": "가람 씨",
          "neutral": "상대 셀러"
        },
        "roles": {
          "exact": "유리=이미지·확산 / 도건=계정·업로드",
          "judgeRef": "역할 분담",
          "neutral": "각자 맡은 부분"
        },
        "time": {
          "dateExact": "부스 발표 전날 밤~당일 오전",
          "period": "사전 조율 구간",
          "neutral": "그 준비 단계"
        },
        "institution": {
          "exact": "메신저 export와 플랫폼 로그",
          "judgeRef": "대화 원본",
          "neutral": "원본 기록"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ]
    },
    {
      "id": "friend09:b:d-3:unlock:s4:01",
      "legacySourceId": "d3.unlock.s4.b_hide_behind_yuri",
      "party": "b",
      "disputeId": "d-3",
      "unlockedAtState": "S4",
      "factText": "도건이 유리를 앞세워 자신의 결정권과 주도 장면을 축소하려 했다는 감정·책임 누설",
      "tags": [
        "emotion",
        "fear",
        "responsibility"
      ],
      "slots": {
        "person": {
          "fullName": "조가람",
          "judgeRef": "가람 씨",
          "neutral": "상대 셀러"
        },
        "roles": {
          "exact": "유리=이미지·확산 / 도건=계정·업로드",
          "judgeRef": "역할 분담",
          "neutral": "각자 맡은 부분"
        },
        "time": {
          "dateExact": "부스 발표 전날 밤~당일 오전",
          "period": "사전 조율 구간",
          "neutral": "그 준비 단계"
        },
        "institution": {
          "exact": "메신저 export와 플랫폼 로그",
          "judgeRef": "대화 원본",
          "neutral": "원본 기록"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ]
    },
    {
      "id": "friend09:b:d-3:unlock:s5:01",
      "legacySourceId": "d3.unlock.s5.b_collusion_confess",
      "party": "b",
      "disputeId": "d-3",
      "unlockedAtState": "S5",
      "factText": "문제의 명예훼손이 둘의 공동 공모였음을 도건이 완전 시인하는 사실",
      "tags": [
        "admission",
        "responsibility",
        "harm"
      ],
      "slots": {
        "person": {
          "fullName": "조가람",
          "judgeRef": "가람 씨",
          "neutral": "상대 셀러"
        },
        "roles": {
          "exact": "유리=이미지·확산 / 도건=계정·업로드",
          "judgeRef": "역할 분담",
          "neutral": "각자 맡은 부분"
        },
        "time": {
          "dateExact": "부스 발표 전날 밤~당일 오전",
          "period": "사전 조율 구간",
          "neutral": "그 준비 단계"
        },
        "institution": {
          "exact": "메신저 export와 플랫폼 로그",
          "judgeRef": "대화 원본",
          "neutral": "원본 기록"
        }
      },
      "stanceHints": [
        "confess",
        "responsibility"
      ]
    },
    {
      "id": "friend09:b:d-5:unlock:s2:01",
      "legacySourceId": "d5.unlock.s2.b_old_conflict_hidden",
      "party": "b",
      "disputeId": "d-5",
      "unlockedAtState": "S2",
      "factText": "도건도 소명에서 8개월 전 가람 분쟁과 촬영 손실 기억을 의도적으로 빼고 설명했다는 사실",
      "tags": [
        "legacy_sentence",
        "institution",
        "admission"
      ],
      "slots": {
        "person": {
          "fullName": "조가람",
          "judgeRef": "가람 씨",
          "neutral": "그 사람"
        },
        "time": {
          "dateExact": "8개월 전 분쟁 이후~운영자 조사 직후",
          "period": "사후 소명 단계",
          "neutral": "그 뒤"
        },
        "institution": {
          "exact": "운영자 소명 DM과 공통 친구 설명",
          "judgeRef": "소명과 설명",
          "neutral": "사후 해명"
        },
        "legacy": {
          "exact": "과거 가람 분쟁과 공동 준비 사실",
          "judgeRef": "이전 얘기",
          "neutral": "숨긴 전사"
        }
      },
      "stanceHints": [
        "partial",
        "counter"
      ]
    },
    {
      "id": "friend09:b:d-5:unlock:s3:01",
      "legacySourceId": "d5.unlock.s3.b_face_saving_story",
      "party": "b",
      "disputeId": "d-5",
      "unlockedAtState": "S3",
      "factText": "도건이 자신을 끌려간 사람처럼 서사를 짜 체면을 지키려 했다는 사실",
      "tags": [
        "relationship",
        "responsibility",
        "counter"
      ],
      "slots": {
        "person": {
          "fullName": "조가람",
          "judgeRef": "가람 씨",
          "neutral": "그 사람"
        },
        "time": {
          "dateExact": "8개월 전 분쟁 이후~운영자 조사 직후",
          "period": "사후 소명 단계",
          "neutral": "그 뒤"
        },
        "institution": {
          "exact": "운영자 소명 DM과 공통 친구 설명",
          "judgeRef": "소명과 설명",
          "neutral": "사후 해명"
        },
        "legacy": {
          "exact": "과거 가람 분쟁과 공동 준비 사실",
          "judgeRef": "이전 얘기",
          "neutral": "숨긴 전사"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ]
    },
    {
      "id": "friend09:b:d-5:unlock:s4:01",
      "legacySourceId": "d5.unlock.s4.b_shame_admit",
      "party": "b",
      "disputeId": "d-5",
      "unlockedAtState": "S4",
      "factText": "예전 촬영 손실과 옹졸해 보일 두려움 때문에 도건이 공동 준비 사실을 숨겼다는 감정 누설",
      "tags": [
        "emotion",
        "fear",
        "shame"
      ],
      "slots": {
        "person": {
          "fullName": "조가람",
          "judgeRef": "가람 씨",
          "neutral": "그 사람"
        },
        "time": {
          "dateExact": "8개월 전 분쟁 이후~운영자 조사 직후",
          "period": "사후 소명 단계",
          "neutral": "그 뒤"
        },
        "institution": {
          "exact": "운영자 소명 DM과 공통 친구 설명",
          "judgeRef": "소명과 설명",
          "neutral": "사후 해명"
        },
        "legacy": {
          "exact": "과거 가람 분쟁과 공동 준비 사실",
          "judgeRef": "이전 얘기",
          "neutral": "숨긴 전사"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ]
    },
    {
      "id": "friend09:b:d-5:unlock:s5:01",
      "legacySourceId": "d5.unlock.s5.b_blame_shift_confess",
      "party": "b",
      "disputeId": "d-5",
      "unlockedAtState": "S5",
      "factText": "도건이 유리와 함께 서로 다른 소명을 보내 책임전가를 했다고 시인하는 사실",
      "tags": [
        "admission",
        "responsibility",
        "relationship"
      ],
      "slots": {
        "person": {
          "fullName": "조가람",
          "judgeRef": "가람 씨",
          "neutral": "그 사람"
        },
        "time": {
          "dateExact": "8개월 전 분쟁 이후~운영자 조사 직후",
          "period": "사후 소명 단계",
          "neutral": "그 뒤"
        },
        "institution": {
          "exact": "운영자 소명 DM과 공통 친구 설명",
          "judgeRef": "소명과 설명",
          "neutral": "사후 해명"
        },
        "legacy": {
          "exact": "과거 가람 분쟁과 공동 준비 사실",
          "judgeRef": "이전 얘기",
          "neutral": "숨긴 전사"
        }
      },
      "stanceHints": [
        "confess",
        "responsibility"
      ]
    }
  ],
  "phase3LogHints": {
    "relationCoreDisputes": [
      "d-4",
      "d-5"
    ],
    "playerStyleTagCandidates": [
      "pressure_heavy",
      "evidence_closer",
      "trap_chaser",
      "blame_splitter"
    ]
  }
} as const;
