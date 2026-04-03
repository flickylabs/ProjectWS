export const friend01StructureV2 = {
  "caseId": "friend-01",
  "schemaVersion": "structure_v2",
  "proposedUnlockAtoms": [],
  "disputes": [
    {
      "id": "d-1",
      "name": "도윤의 숙소 보증금 환급 은닉",
      "truth": true,
      "truthDescription": "도윤은 숙소 보증금 환급 9만2천원을 자신의 계좌로 받은 뒤 즉시 하린에게 알리지 않았고, 정산표에도 바로 반영하지 않았다.",
      "quadrant": "a_only",
      "requiredEvidence": [
        "e-3",
        "e-4"
      ],
      "correctResponsibility": {
        "a": 70,
        "b": 30
      },
      "ambiguity": "none",
      "weight": "high",
      "mediationLink": "정산복구",
      "legitimacyIssue": false,
      "judgmentStatement": "도윤은 보증금을 은닉했다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "9만2천원",
        "보증금 환급",
        "개인 계좌",
        "체크아웃 직후",
        "호스트 메시지",
        "박은지"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "겉으로 드러난 순서와 행동이 보입니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend01:a:d-1:S0:refund_received",
            "friend01:a:d-1:S0:delayed_share",
            "friend01:b:d-1:S0:refund_gap",
            "friend01:b:d-1:S0:time_lag"
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
            "friend01:a:d-1:S2:delayed_share",
            "friend01:a:d-1:S2:offset_message",
            "friend01:b:d-1:S2:refund_gap",
            "friend01:b:d-1:S2:shared_rule"
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
            "friend01:a:d-1:S4:reputation_fear",
            "friend01:a:d-1:S4:refund_received",
            "friend01:b:d-1:S4:being_overcharged_fear",
            "friend01:b:d-1:S4:refund_gap"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-2",
      "name": "하린의 공개 저격성 SNS와 공통 친구 공유",
      "truth": true,
      "truthDescription": "하린은 정산이 확정되기 전에 도윤을 겨냥한 듯한 스토리를 올렸고, 공통 친구 김수아에게 중간 정산 캡처를 보내며 도윤이 돈을 안 갚는다는 취지로 말했다.",
      "quadrant": "b_only",
      "requiredEvidence": [
        "e-1",
        "e-5"
      ],
      "correctResponsibility": {
        "a": 25,
        "b": 75
      },
      "ambiguity": "none",
      "weight": "high",
      "mediationLink": "평판회복",
      "legitimacyIssue": true,
      "judgmentStatement": "하린은 도윤을 저격한 SNS를 올렸다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "친한친구 스토리",
        "18만4천원 캡처",
        "김수아",
        "중간 정산",
        "저격글",
        "스토리 삭제"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "겉으로 드러난 순서와 행동이 보입니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend01:a:d-2:S0:preconfirmation_share",
            "friend01:a:d-2:S0:capture_then_story",
            "friend01:b:d-2:S0:capture_and_story",
            "friend01:b:d-2:S0:indirect_targeting"
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
            "friend01:a:d-2:S2:preconfirmation_share",
            "friend01:a:d-2:S2:no_third_party_rule",
            "friend01:b:d-2:S2:indirect_targeting",
            "friend01:b:d-2:S2:fear_of_being_stuck_with_bill"
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
            "friend01:a:d-2:S4:reputation_harm",
            "friend01:a:d-2:S4:preconfirmation_share",
            "friend01:b:d-2:S4:anger_fused_with_fact_check",
            "friend01:b:d-2:S4:capture_and_story"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-3",
      "name": "실제 여행비 차액은 한쪽의 과소비 때문인가",
      "truth": false,
      "truthDescription": "정산 앱 중간 화면의 큰 차액은 미반영된 보증금 환급과 택시 카드 취소 대기 때문에 생긴 착시였고, 최종 차액은 택시 차용분을 포함해 2만2천원 수준이었다.",
      "quadrant": "shared_misconception",
      "requiredEvidence": [
        "e-1",
        "e-2",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 45,
        "b": 55
      },
      "ambiguity": "low",
      "weight": "high",
      "mediationLink": "정산복구",
      "legitimacyIssue": true,
      "judgmentStatement": "실제 여행비 차액은 과소비가 아니다.",
      "disputeKind": "shared_misconception",
      "disputeAliases": [
        "18만4천원",
        "2만2천원",
        "중간 화면",
        "CSV 원본",
        "자동분배 전",
        "과소비 프레임"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "양쪽이 같은 자료를 다르게 읽은 외형이 보입니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend01:a:d-3:S0:mid_screen_not_final",
            "friend01:a:d-3:S0:refund_and_reversal_pending",
            "friend01:b:d-3:S0:capture_as_anchor",
            "friend01:b:d-3:S0:csv_reorders_balance"
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
            "friend01:a:d-3:S2:mid_screen_not_final",
            "friend01:a:d-3:S2:refund_and_reversal_pending",
            "friend01:b:d-3:S2:capture_as_anchor",
            "friend01:b:d-3:S2:csv_reorders_balance"
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
            "friend01:a:d-3:S4:spendthrift_stigma_fear",
            "friend01:a:d-3:S4:overspending_frame",
            "friend01:b:d-3:S4:shame_clinging_to_number",
            "friend01:b:d-3:S4:hidden_refund_fueled_suspicion"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "misconception": {
        "beliefModeByParty": {
          "a": "weaponizes",
          "b": "misbelief"
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
          "18만4천원 중간 캡처",
          "자동분배 전 화면",
          "택시 취소 대기 누락"
        ],
        "truthExitEvidenceIds": [
          "e-2",
          "e-6"
        ],
        "clarifyOutcomeLabel": "오해가 정리되고 책임 층위가 갈린다."
      }
    },
    {
      "id": "d-4",
      "name": "도윤의 공항 택시비 차용금 미반환",
      "truth": true,
      "truthDescription": "도윤은 귀가 길 공항 택시비 중 자신의 몫 7만원을 하린이 대신 내준 뒤, 보증금 환급과 상계하면 된다고 혼자 판단하고 명확히 돌려주지 않았다.",
      "quadrant": "a_only",
      "requiredEvidence": [
        "e-4",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 80,
        "b": 20
      },
      "ambiguity": "none",
      "weight": "high",
      "mediationLink": "정산복구",
      "legitimacyIssue": false,
      "judgmentStatement": "도윤은 택시비 7만원을 미반환했다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "7만원",
        "공항 택시",
        "차용 메모",
        "상계",
        "취소 대기",
        "택시 영수증"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "보조 사실과 연결 고리가 보입니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend01:a:d-4:S0:taxi_loan_exists",
            "friend01:a:d-4:S0:offset_without_agreement",
            "friend01:b:d-4:S0:paid_full_fare",
            "friend01:b:d-4:S0:offset_requires_agreement"
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
            "friend01:a:d-4:S2:offset_without_agreement",
            "friend01:a:d-4:S2:loan_memo_survives",
            "friend01:b:d-4:S2:paid_full_fare",
            "friend01:b:d-4:S2:loan_memo_exists"
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
            "friend01:a:d-4:S4:cashflow_shame",
            "friend01:a:d-4:S4:taxi_loan_exists",
            "friend01:b:d-4:S4:helper_becomes_fussy",
            "friend01:b:d-4:S4:paid_full_fare"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-5",
      "name": "원본 확인 전 제3자 확산 금지 약속의 쌍방 위반",
      "truth": true,
      "truthDescription": "두 사람은 여행비를 원본 영수증으로만 정산하고 제3자에게 먼저 말하지 않기로 했지만, 도윤은 환급금과 차용금 설명을 숨겼고 하린은 중간 캡처와 감정 섞인 해석을 공통 친구와 SNS로 퍼뜨렸다.",
      "quadrant": "both_know",
      "requiredEvidence": [
        "e-4",
        "e-5"
      ],
      "correctResponsibility": {
        "a": 52,
        "b": 48
      },
      "ambiguity": "none",
      "weight": "medium",
      "mediationLink": "신뢰회복",
      "legitimacyIssue": false,
      "judgmentStatement": "도윤은 환급금 설명을 숨겼다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "원본 영수증",
        "48시간 합의",
        "제3자 확산 금지",
        "김수아 공유",
        "비공개 규칙",
        "신뢰 회복"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "보조 사실과 연결 고리가 보입니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend01:a:d-5:S0:old_rule_exists",
            "friend01:a:d-5:S0:kimsua_side_message",
            "friend01:b:d-5:S0:no_spread_rule_broken",
            "friend01:b:d-5:S0:doyun_also_leaked"
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
            "friend01:a:d-5:S2:kimsua_side_message",
            "friend01:a:d-5:S2:public_story_is_bigger_breach",
            "friend01:b:d-5:S2:doyun_also_leaked",
            "friend01:b:d-5:S2:close_friends_not_small_enough"
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
            "friend01:a:d-5:S4:fear_of_losing_face",
            "friend01:a:d-5:S4:old_rule_exists",
            "friend01:b:d-5:S4:anger_override_rule",
            "friend01:b:d-5:S4:no_spread_rule_broken"
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
        "grantFlag": "d-5:surface:first_breach_enabled"
      },
      "uiLabel": "먼저 숨긴 쪽"
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
        "grantFlag": "d-5:motive:retaliation_visible"
      },
      "uiLabel": "공개 대응 반격"
    },
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
        "supportBonus": 11,
        "grantFlag": "d-2:core:overspend_claim_weakened"
      },
      "uiLabel": "과소비 프레임 약화"
    },
    {
      "id": "link:d-4:d-1:supports",
      "fromDisputeId": "d-4",
      "toDisputeId": "d-1",
      "type": "supports",
      "when": {
        "minState": "S3",
        "minLayer": "motive"
      },
      "effect": {
        "supportBonus": 9,
        "grantFlag": "d-1:core:offset_context_open"
      },
      "uiLabel": "상계 판단의 배경"
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "name": "하린이 보낸 정산 앱 중간화면 캡처",
      "description": "도윤이 18만4천원을 더 내야 하는 것처럼 보이는 정산 앱 중간 화면을 하린이 김수아에게 전달한 캡처다.",
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
            "multiplier": 1.28,
            "note": "중간 캡처 착시를 꺾는 구간"
          }
        ]
      }
    },
    {
      "id": "e-2",
      "name": "정산 앱 원본 CSV와 자동분배 설정 로그",
      "description": "여행 공용 비용, 쿠폰 적용, 보증금 환급 반영 순서를 모두 확인할 수 있는 정산 앱 원본 내역이다.",
      "type": "platform_log",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "platform",
      "legitimacy": "lawful",
      "proves": [
        "d-3",
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
          "evidence_present"
        ],
        "preferredAngles": [
          "timeline"
        ],
        "blockedVectorsHelp": [
          "context",
          "identity"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "S3",
            "multiplier": 1.35,
            "note": "최종 정산 수치 확정"
          }
        ]
      }
    },
    {
      "id": "e-3",
      "name": "숙소 보증금 환급 계좌이체 기록",
      "description": "체크아웃 당일 숙소 운영자가 도윤 개인 계좌로 9만2천원을 환급한 은행 원본 내역이다.",
      "type": "bank",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-1"
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
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S1",
            "multiplier": 1.22,
            "note": "환급 확인 시각 고정"
          }
        ]
      }
    },
    {
      "id": "e-4",
      "name": "도윤-숙소 호스트 메시지와 김수아에게 보낸 카톡 원본",
      "description": "도윤이 보증금 환급 사실을 확인받고도 하린에게 바로 말하지 않은 정황과, 택시비와 상계하려 했다는 말을 김수아에게 남긴 대화 원본이다.",
      "type": "chat",
      "reliability": "soft",
      "completeness": "original",
      "provenance": "mixed",
      "legitimacy": "lawful",
      "proves": [
        "d-1",
        "d-4"
      ],
      "isTrap": false,
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
          "evidence_present"
        ],
        "preferredAngles": [
          "legality"
        ],
        "blockedVectorsHelp": [
          "responsibility",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S2",
            "multiplier": 1.3,
            "note": "상계 메시지와 차용금 분리"
          }
        ]
      }
    },
    {
      "id": "e-5",
      "name": "하린의 인스타 스토리와 친한친구 목록 캡처",
      "description": "'여행은 같이 가도 돈 약속은 아무나 못 지킨다'는 문구가 담긴 하린의 스토리와 그 공개 범위를 보여주는 캡처다.",
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
      "id": "e-6",
      "name": "공항 택시 영수증과 차용 메모·취소 내역",
      "description": "귀가 길 택시비 14만원 중 하린이 먼저 결제했고, 도윤이 자신의 몫 7만원을 '보증금 들어오면 주겠다'고 남긴 차용 메모와 초기 중복 승인 취소 내역이다.",
      "type": "receipt",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "mixed",
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
          "legality"
        ],
        "blockedVectorsHelp": [
          "responsibility",
          "timeline"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "S3",
            "multiplier": 1.35,
            "note": "차용금 별도 책임 정리"
          }
        ]
      }
    }
  ],
  "freeQuestionHooks": [
    {
      "id": "fq:d-1:refund_recipient",
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
          "friend01:a:d-1:S2:delayed_share",
          "friend01:b:d-1:S2:refund_gap"
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
      "id": "fq:d-1:offset_authority",
      "intentTag": "rule_check",
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
          "friend01:a:d-1:S2:delayed_share",
          "friend01:b:d-1:S2:refund_gap"
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
      "id": "fq:d-2:story_audience",
      "intentTag": "damage_scope",
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
          "friend01:a:d-2:S2:preconfirmation_share",
          "friend01:b:d-2:S2:indirect_targeting"
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
      "id": "fq:d-3:mid_screen_origin",
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
          "friend01:a:d-3:S2:mid_screen_not_final",
          "friend01:b:d-3:S2:capture_as_anchor"
        ],
        "preferredAngleTags": [
          "context"
        ]
      },
      "refusalTemplates": [
        "그 자료 출처를 지금 단정해서 말하긴 조심스러워요.",
        "원본 흐름을 같이 보지 않으면 또 틀어집니다."
      ]
    },
    {
      "id": "fq:d-4:loan_boundary",
      "intentTag": "responsibility_check",
      "allowedAtStates": [
        "S2",
        "S3",
        "S4"
      ],
      "allowedIssueRoles": [
        "sub_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-4",
        "allowAtomIds": [
          "friend01:a:d-4:S2:offset_without_agreement",
          "friend01:b:d-4:S2:paid_full_fare"
        ],
        "preferredAngleTags": [
          "responsibility"
        ]
      },
      "refusalTemplates": [
        "책임 비율을 지금 한 줄로 못 박고 싶진 않아요.",
        "누가 얼마나 져야 하는지는 더 확인하고 말하겠습니다."
      ]
    },
    {
      "id": "fq:d-5:first_third_party",
      "intentTag": "timeline_check",
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
          "friend01:a:d-5:S2:kimsua_side_message",
          "friend01:b:d-5:S2:doyun_also_leaked"
        ],
        "preferredAngleTags": [
          "timeline"
        ]
      },
      "refusalTemplates": [
        "순서만 떼어 말하면 또 왜곡될 수 있어요.",
        "그 시각만 콕 집어 답하긴 아직 부담돼요."
      ]
    },
    {
      "id": "fq:d-5:repair_sequence",
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
          "friend01:a:d-5:S2:kimsua_side_message",
          "friend01:b:d-5:S2:doyun_also_leaked"
        ],
        "preferredAngleTags": [
          "emotion",
          "motive"
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
