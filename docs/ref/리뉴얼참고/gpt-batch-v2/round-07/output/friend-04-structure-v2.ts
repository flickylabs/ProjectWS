export const friend04StructureV2 = {
  "caseId": "friend-04",
  "schemaVersion": "structure_v2",
  "proposedUnlockAtoms": [],
  "disputes": [
    {
      "id": "d-1",
      "name": "다혜의 비환불 예약금 선지급",
      "truth": true,
      "truthDescription": "다혜는 현우의 최종 확정 문구 없이도 판매자에게 비환불 예약금 3만원을 먼저 보내 거래를 묶었다.",
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
      "mediationLink": "거래복구",
      "legitimacyIssue": false,
      "judgmentStatement": "다혜는 비환불 예약금 3만원을 송금했다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "3만원 예약금",
        "일단 잡아줘",
        "비환불 고지",
        "판매자 압박",
        "확정 아님",
        "한재필"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "겉으로 드러난 순서와 행동이 보입니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend04:a:d-1:s0:hyunwoo_signal_as_consent:0",
            "friend04:a:d-1:s0:seller_pressure:1",
            "friend04:b:d-1:s0:dahye_sent_deposit:0",
            "friend04:b:d-1:s0:no_explicit_confirm:1"
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
            "friend04:a:d-1:s2:deposit_sent:0",
            "friend04:a:d-1:s2:hyunwoo_signal_as_consent:1",
            "friend04:b:d-1:s2:his_positive_signal:0",
            "friend04:b:d-1:s2:dahye_sent_deposit:1"
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
            "friend04:a:d-1:s4:rule_break_admission:0",
            "friend04:a:d-1:s4:seller_pressure:1",
            "friend04:b:d-1:s4:his_positive_signal:0",
            "friend04:b:d-1:s4:no_explicit_confirm:1"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-2",
      "name": "현우의 사실상 구매 의사 표시 후 철회",
      "truth": true,
      "truthDescription": "현우는 단톡과 판매자에게 모두 참여 의사가 있는 듯한 메시지를 보낸 뒤, 픽업 후 상태를 이유로 절반 부담을 철회했다.",
      "quadrant": "b_only",
      "requiredEvidence": [
        "e-1",
        "e-4",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 30,
        "b": 70
      },
      "ambiguity": "low",
      "weight": "high",
      "mediationLink": "거래복구",
      "legitimacyIssue": false,
      "judgmentStatement": "현우는 구매 의사를 철회했다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "반반 가능",
        "픽업 후 40분",
        "철회",
        "재판매 손실 4만원",
        "사진대로면 갈게요",
        "구매 의사"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "겉으로 드러난 순서와 행동이 보입니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend04:a:d-2:s0:hyunwoo_intent_signal:0",
            "friend04:a:d-2:s0:withdrawal_after_pickup:1",
            "friend04:b:d-2:s0:not_explicit_purchase:0",
            "friend04:b:d-2:s0:private_quality_standard:1"
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
            "friend04:a:d-2:s2:late_condition_reason:0",
            "friend04:a:d-2:s2:withdrawal_after_pickup:1",
            "friend04:b:d-2:s2:not_explicit_purchase:0",
            "friend04:b:d-2:s2:private_quality_standard:1"
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
            "friend04:a:d-2:s4:resale_harm:0",
            "friend04:a:d-2:s4:withdrawal_after_pickup:1",
            "friend04:b:d-2:s4:burden_left_to_dahye:0",
            "friend04:b:d-2:s4:not_explicit_purchase:1"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-3",
      "name": "두 사람이 '상태 괜찮음'의 의미를 동일하게 합의했는가",
      "truth": false,
      "truthDescription": "다혜는 찢김과 폴대 파손이 없으면 괜찮다고 이해했고, 현우는 냄새·구성품·방수 상태까지 포함해 괜찮음을 판단해 동일한 조건 합의는 없었다.",
      "quadrant": "shared_misconception",
      "requiredEvidence": [
        "e-1",
        "e-5"
      ],
      "correctResponsibility": {
        "a": 52,
        "b": 48
      },
      "ambiguity": "low",
      "weight": "high",
      "mediationLink": "조건명료화",
      "legitimacyIssue": false,
      "judgmentStatement": "다혜와 현우는 동일한 합의를 하지 않았다.",
      "disputeKind": "shared_misconception",
      "disputeAliases": [
        "상태 괜찮음",
        "냄새",
        "누락 부속품",
        "폴대 파손",
        "크롭 판매글",
        "기준 불일치"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "양쪽이 같은 자료를 다르게 읽은 외형이 보입니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend04:a:d-3:s0:dahye_standard_structure_only:0",
            "friend04:a:d-3:s0:hyunwoo_unstated_broader_standard:1",
            "friend04:b:d-3:s0:private_checklist:0",
            "friend04:b:d-3:s0:not_explicit_in_chat:1"
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
            "friend04:a:d-3:s2:dahye_standard_structure_only:0",
            "friend04:a:d-3:s2:no_shared_definition:1",
            "friend04:b:d-3:s2:not_explicit_in_chat:0",
            "friend04:b:d-3:s2:photos_not_enough:1"
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
            "friend04:a:d-3:s4:dahye_standard_structure_only:0",
            "friend04:a:d-3:s4:cropped_listing:1",
            "friend04:b:d-3:s4:late_scope_narrowing:0",
            "friend04:b:d-3:s4:private_checklist:1"
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
          "잘린 판매글 설명",
          "상태 괜찮음 표현",
          "픽업 후 드러난 냄새·누락 부속품"
        ],
        "truthExitEvidenceIds": [
          "e-2",
          "e-5"
        ],
        "clarifyOutcomeLabel": "오해가 정리되고 책임 층위가 갈린다."
      }
    },
    {
      "id": "d-4",
      "name": "판매자에게 각자 다른 확정 신호를 보내 거래를 혼선시킴",
      "truth": true,
      "truthDescription": "다혜는 '둘이 반반으로 가져간다'고 말했고, 현우도 별도로 '사진대로면 갈게요'라고 보내 판매자가 사실상 확정 거래로 이해하게 만들었다.",
      "quadrant": "both_know",
      "requiredEvidence": [
        "e-1",
        "e-4"
      ],
      "correctResponsibility": {
        "a": 50,
        "b": 50
      },
      "ambiguity": "none",
      "weight": "medium",
      "mediationLink": "조건명료화",
      "legitimacyIssue": false,
      "judgmentStatement": "다혜와 현우는 판매자에게 확정 신호를 보냈다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "둘이 반반",
        "사진대로면 갈게요",
        "판매자 혼선",
        "확정 신호",
        "공동 창구",
        "메신저 대화"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "보조 사실과 연결 고리가 보입니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend04:a:d-4:s0:dahye_told_half_half:0",
            "friend04:a:d-4:s0:hyunwoo_sent_photo_if:1",
            "friend04:b:d-4:s0:meant_as_conditional:0",
            "friend04:b:d-4:s0:photo_if_message:1"
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
            "friend04:a:d-4:s2:dahye_told_half_half:0",
            "friend04:a:d-4:s2:hyunwoo_sent_photo_if:1",
            "friend04:b:d-4:s2:photo_if_message:0",
            "friend04:b:d-4:s2:meant_as_conditional:1"
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
            "friend04:a:d-4:s4:dahye_told_half_half:0",
            "friend04:a:d-4:s4:no_single_spokesperson:1",
            "friend04:b:d-4:s4:did_not_correct:0",
            "friend04:b:d-4:s4:meant_as_conditional:1"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-5",
      "name": "작년 예약금 규칙의 쌍방 위반",
      "truth": true,
      "truthDescription": "두 사람은 비환불 예약금은 명시적 '확정' 뒤에만 넣기로 했지만, 다혜는 모호한 답으로 송금했고 현우는 사실상 구매 신호를 보내놓고 해석 여지를 남겼다.",
      "quadrant": "both_know",
      "requiredEvidence": [
        "e-1",
        "e-3"
      ],
      "correctResponsibility": {
        "a": 55,
        "b": 45
      },
      "ambiguity": "none",
      "weight": "medium",
      "mediationLink": "친구경계",
      "legitimacyIssue": false,
      "judgmentStatement": "다혜는 모호하게 송금했다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "작년 예약금 규칙",
        "페스티벌 티켓",
        "확정 뒤 송금",
        "모호한 답장",
        "비환불",
        "친구 경계"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "보조 사실과 연결 고리가 보입니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend04:a:d-5:s0:old_explicit_rule:0",
            "friend04:a:d-5:s0:hyunwoo_left_escape:1",
            "friend04:b:d-5:s0:shared_rule_memory:0",
            "friend04:b:d-5:s0:dahye_paid_early:1"
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
            "friend04:a:d-5:s2:dahye_broke_rule:0",
            "friend04:a:d-5:s2:hyunwoo_left_escape:1",
            "friend04:b:d-5:s2:hyunwoo_kept_escape_hatch:0",
            "friend04:b:d-5:s2:dahye_paid_early:1"
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
            "friend04:a:d-5:s4:repeated_pattern:0",
            "friend04:a:d-5:s4:dahye_broke_rule:1",
            "friend04:b:d-5:s4:pattern_of_ambiguity:0",
            "friend04:b:d-5:s4:hyunwoo_kept_escape_hatch:1"
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
        "grantFlag": "d-5:surface:deposit_rule_broken"
      },
      "uiLabel": "선지급이 규칙 위반으로 연결"
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
        "grantFlag": "d-5:motive:ambiguous_signal_visible"
      },
      "uiLabel": "모호한 신호가 규칙 붕괴로 연결"
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
        "grantFlag": "d-2:core:criteria_gap_open"
      },
      "uiLabel": "상태 기준 불일치 드러남"
    },
    {
      "id": "link:d-4:d-1:supports",
      "fromDisputeId": "d-4",
      "toDisputeId": "d-1",
      "type": "supports",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 9,
        "grantFlag": "d-1:core:seller_confirm_mix_visible"
      },
      "uiLabel": "판매자 혼선이 선입금 배경이 됨"
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "name": "다혜-현우 공동구매 카카오톡 원본",
      "description": "현우의 '텐트만 멀쩡하면 반반 가능, 일단 잡아줘'와 이후 조건 대화가 담긴 공동구매 카카오톡 원본이다.",
      "type": "chat",
      "reliability": "soft",
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
          "fact_pursuit"
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
            "disputeId": "d-2",
            "state": "S1",
            "multiplier": 1.22,
            "note": "모호한 구매 신호 해석 구간"
          }
        ]
      }
    },
    {
      "id": "e-2",
      "name": "다혜가 저장해 현우에게 보낸 판매글 캡처",
      "description": "외관 사진과 가격 중심으로 저장돼 있고, 냄새·누락 부속품 관련 문구가 빠진 판매글 캡처다.",
      "type": "sns",
      "reliability": "soft",
      "completeness": "cropped",
      "provenance": "personal_device",
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
          "context"
        ],
        "blockedVectorsHelp": [
          "identity",
          "threshold"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "S2",
            "multiplier": 1.28,
            "note": "크롭으로 빠진 상태 기준 복구"
          }
        ]
      }
    },
    {
      "id": "e-3",
      "name": "예약금 3만원 계좌이체 내역",
      "description": "다혜가 판매자에게 보낸 비환불 예약금 3만원의 원본 이체 내역이다.",
      "type": "bank",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
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
          "legality"
        ],
        "blockedVectorsHelp": [
          "timeline",
          "responsibility"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S1",
            "multiplier": 1.22,
            "note": "비환불 예약금 선지급 고정"
          }
        ]
      }
    },
    {
      "id": "e-4",
      "name": "판매자와의 전체 메신저 대화 및 환불 고지",
      "description": "판매자가 비환불 예약금 조건을 알렸고, 다혜와 현우가 각각 거래 의사가 있는 듯한 메시지를 보낸 전체 대화 원본이다.",
      "type": "chat",
      "reliability": "hard",
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
          "timeline"
        ],
        "blockedVectorsHelp": [
          "context",
          "legality"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S2",
            "multiplier": 1.3,
            "note": "판매자에게 간 확정 신호 확인"
          }
        ]
      }
    },
    {
      "id": "e-5",
      "name": "픽업 당시 사진·영상과 상태 체크 메모",
      "description": "텐트 외관, 폴대, 바닥 상태, 누락된 수납주머니와 현장에서 적은 상태 체크 메모가 담긴 사진·영상 자료다.",
      "type": "photo_video",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "mixed",
      "legitimacy": "lawful",
      "proves": [
        "d-3"
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
          "threshold"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "S3",
            "multiplier": 1.35,
            "note": "상태 기준 차이 정리"
          }
        ]
      }
    },
    {
      "id": "e-6",
      "name": "현우의 철회 메시지와 재판매 완료 로그",
      "description": "현우가 냄새와 구성품 문제를 이유로 빠지겠다고 한 메시지, 그리고 다혜가 다음 날 더 낮은 가격으로 재판매를 완료한 플랫폼 로그다.",
      "type": "platform_log",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "mixed",
      "legitimacy": "lawful",
      "proves": [
        "d-2"
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
          "responsibility"
        ],
        "blockedVectorsHelp": [
          "timeline",
          "emotion"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-2",
            "state": "S3",
            "multiplier": 1.35,
            "note": "늦은 철회와 손실 결과 확정"
          }
        ]
      }
    }
  ],
  "freeQuestionHooks": [
    {
      "id": "fq:d-1:deposit_authority",
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
        "disputeId": "d-1",
        "allowAtomIds": [
          "friend04:a:d-1:s2:deposit_sent:0",
          "friend04:b:d-1:s2:his_positive_signal:0"
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
      "id": "fq:d-1:deposit_timing",
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
          "friend04:a:d-1:s2:deposit_sent:0",
          "friend04:b:d-1:s2:his_positive_signal:0"
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
      "id": "fq:d-2:withdrawal_point",
      "intentTag": "responsibility_check",
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
          "friend04:a:d-2:s2:late_condition_reason:0",
          "friend04:b:d-2:s2:not_explicit_purchase:0"
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
      "id": "fq:d-3:condition_definition",
      "intentTag": "threshold_check",
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
          "friend04:a:d-3:s2:dahye_standard_structure_only:0",
          "friend04:b:d-3:s2:not_explicit_in_chat:0"
        ],
        "preferredAngleTags": [
          "context"
        ]
      },
      "refusalTemplates": [
        "그 기준을 한 줄로 자르긴 어렵습니다.",
        "괜찮음의 범위는 상황을 같이 봐야 해요."
      ]
    },
    {
      "id": "fq:d-4:seller_signal",
      "intentTag": "evidence_origin",
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
          "friend04:a:d-4:s2:dahye_told_half_half:0",
          "friend04:b:d-4:s2:photo_if_message:0"
        ],
        "preferredAngleTags": [
          "timeline",
          "identity"
        ]
      },
      "refusalTemplates": [
        "그 자료 출처를 지금 단정해서 말하긴 조심스러워요.",
        "원본 흐름을 같이 보지 않으면 또 틀어집니다."
      ]
    },
    {
      "id": "fq:d-5:old_rule_memory",
      "intentTag": "rule_check",
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
          "friend04:a:d-5:s2:dahye_broke_rule:0",
          "friend04:b:d-5:s2:hyunwoo_kept_escape_hatch:0"
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
      "id": "fq:d-5:next_purchase_rule",
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
          "friend04:a:d-5:s2:dahye_broke_rule:0",
          "friend04:b:d-5:s2:hyunwoo_kept_escape_hatch:0"
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
