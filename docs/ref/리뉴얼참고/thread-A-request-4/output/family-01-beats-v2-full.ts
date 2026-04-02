/* Auto-generated export */
export const family01BeatsV2Full = {
  "caseId": "family-01",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 60,
    "actionFamilyCounts": {
      "evidence": 8,
      "fatigue": 12,
      "question": 40
    },
    "coverageKeyCounts": {
      "a.d1.surface.early.pressure.timeline": 6,
      "b.d2.surface.early.pressure.timeline": 6,
      "a.d3.surface.early.trap.context": 6,
      "a.d1.core.late.rapport.emotion": 4,
      "b.d2.core.late.rapport.emotion": 4,
      "a.d5.surface.mid.pressure.responsibility": 4,
      "b.d5.surface.mid.pressure.responsibility": 4,
      "b.d4.surface.early.pressure.context": 2,
      "a.d1.surface.mid.evidence.context": 2,
      "b.d2.surface.mid.evidence.context": 2,
      "a.d3.core.clarify.evidence.context": 2,
      "b.d4.surface.mid.evidence.context": 2,
      "a.d1.surface.mid.fatigue.timeline": 3,
      "b.d2.surface.mid.fatigue.timeline": 3,
      "a.d5.surface.mid.fatigue.responsibility": 3,
      "b.d5.surface.mid.fatigue.responsibility": 3,
      "a.d2.surface.mid.interjection.allow": 1,
      "b.d3.surface.mid.interjection.allow": 1,
      "a.d1.surface.mid.interjection.block": 1,
      "b.d5.surface.mid.interjection.block": 1
    },
    "actualTruthEnvelopeIdsUsed": [
      "d1.boundary_collapse_confess",
      "d1.brother_numbers_only",
      "d1.card_insurance_paid_first",
      "d1.dutiful_daughter_fear",
      "d1.greed_framing_denial",
      "d1.house_must_not_stop",
      "d1.household_crisis_generic",
      "d1.mother_care_rollcall",
      "d1.not_simple_private_outflow",
      "d1.parent_account_movement",
      "d1.personal_account_first",
      "d1.personal_debt_cover_confess",
      "d1.relabel_as_care_expense",
      "d1.self_finance_fear",
      "d1.transfer_ack",
      "d2.direct_drug_payment_exists",
      "d2.full_abandonment_reject",
      "d2.gap_burden_confess",
      "d2.kept_saying_delayed_only",
      "d2.left_sister_alone_feeling",
      "d2.not_total_absence",
      "d2.not_unpaid_just_delayed",
      "d2.one_shift_gap_ack",
      "d2.payments_do_not_cancel_delay",
      "d2.shift_adjustment_not_abandon",
      "d2.sister_gap_exaggeration",
      "d2.twelve_day_delay_ack",
      "d3.authority_expansion_confess",
      "d3.brother_cuts_one_line",
      "d3.line_as_time_marker",
      "d3.memo_line_quote",
      "d3.memo_photo_reason",
      "d3.noninheritance_ack",
      "d3.not_greed_only",
      "d3.not_legal_will_ack",
      "d3.role_recognition_read",
      "d3.tax_hospital_context",
      "d4.cost_pressure_real",
      "d4.failed_to_check_process",
      "d4.first_month_not_all_private",
      "d4.guidance_record_confirms",
      "d4.info_scope_limit",
      "d4.initial_210_estimate",
      "d4.judgment_inaccurate_ack",
      "d4.ninetyeight_possible",
      "d4.no_visible_alternative_then",
      "d4.not_only_sister_fault",
      "d4.retrospective_judgment_reject",
      "d5a.broke_first_and_bigger",
      "d5a.brother_late_drug_logs",
      "d5a.hidden_1800_ack",
      "d5a.mutual_breach_frame",
      "d5a.only_traitor_frame_reject",
      "d5a.rule_not_denied",
      "d5b.equalizing_weights_reject",
      "d5b.face_protection_confess",
      "d5b.mutual_breach_not_equal",
      "d5b.my_late_logs_ack",
      "d5b.not_fully_compliant",
      "d5b.not_rule_inside_afterall",
      "d5b.scale_type_difference",
      "d5b.sister_1800_biggest"
    ],
    "proposedTruthEnvelopeIdsUsed": [
      "d3a.unlock.m0.one_line_reads_like_inheritance",
      "d3a.unlock.m1.role_and_property_blurred",
      "d3a.unlock.m2.cropped_note_hardens_claim",
      "d3a.unlock.m3.full_scan_shakes_authority",
      "d3a.unlock.m4.inheritance_false_role_pain_remains"
    ]
  },
  "beats": [
    {
      "id": "family01.a.d1.surface.early.pressure.timeline.01",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "부모 관리계좌에서 1,800만원이 움직였다는 기록만으로 저를 곧장 탐욕스러운 사람처럼 세우면 너무 빠릅니다. 지금 보이는 건 이동 사실이지, 그 무렵 집안이 얼마나 무너지고 있었는지까지는 아닙니다.",
      "behaviorHint": "금액을 짚다가 '집안'에서야 숨을 길게 내쉰다.",
      "applicableStates": [
        "S0"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "timeline",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "fresh",
          "wary"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a.d1.surface.pressure.timeline",
      "coverageKey": "a.d1.surface.early.pressure.timeline",
      "variantTarget": 6,
      "setFlags": [
        "d1.surface.money_pressed"
      ],
      "tags": [
        "hot",
        "number_first"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.parent_account_movement",
          "d1.greed_framing_denial"
        ],
        "forbidAtomIds": [
          "d1.personal_debt_cover_confess",
          "d1.boundary_collapse_confess"
        ]
      }
    },
    {
      "id": "family01.a.d1.surface.early.pressure.timeline.02",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "1,800만원 숫자만 떼어 두시면 저도 나빠 보이겠죠. 그런데 병원 접수, 식사 챙김, 집안 비용이 한꺼번에 몰린 시점을 빼면 그 숫자는 반쪽입니다.",
      "behaviorHint": "희생 목록을 한 호흡에 늘어놓고 마지막 문장을 눌러 마무리한다.",
      "applicableStates": [
        "S0"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "timeline",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "fresh",
          "wary"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a.d1.surface.pressure.timeline",
      "coverageKey": "a.d1.surface.early.pressure.timeline",
      "variantTarget": 6,
      "setFlags": [
        "d1.surface.money_pressed"
      ],
      "tags": [
        "hot",
        "number_first"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.parent_account_movement",
          "d1.household_crisis_generic"
        ],
        "forbidAtomIds": [
          "d1.personal_debt_cover_confess",
          "d1.boundary_collapse_confess"
        ]
      }
    },
    {
      "id": "family01.a.d1.surface.early.pressure.timeline.03",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "돈이 제 쪽으로 먼저 온 건 맞습니다. 다만 그걸 순수한 사적 인출이라고 잘라 버리면, 부모 일과 집안 비용이 겹친 맥락은 전부 잘려 나갑니다.",
      "behaviorHint": "첫 문장은 짧게 인정하고 두 번째에서 말수를 늘린다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "timeline",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "fresh",
          "wary"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a.d1.surface.pressure.timeline",
      "coverageKey": "a.d1.surface.early.pressure.timeline",
      "variantTarget": 6,
      "setFlags": [
        "d1.surface.money_pressed"
      ],
      "tags": [
        "hot",
        "number_first"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.transfer_ack",
          "d1.not_simple_private_outflow"
        ],
        "forbidAtomIds": [
          "d1.personal_debt_cover_confess",
          "d1.boundary_collapse_confess"
        ]
      }
    },
    {
      "id": "family01.a.d1.surface.early.pressure.timeline.04",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "제가 바로 설명을 다 못 드린 건 인정하겠습니다. 그래도 그 선이체를 욕심 한 단어로 덮어버리면, 그 시기 집안이 굴러가던 방식은 하나도 안 남습니다.",
      "behaviorHint": "눈을 한 번 감았다 뜬 뒤 '욕심'에서만 목소리가 굳는다.",
      "applicableStates": [
        "S1"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "timeline",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "fresh",
          "wary"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a.d1.surface.pressure.timeline",
      "coverageKey": "a.d1.surface.early.pressure.timeline",
      "variantTarget": 6,
      "setFlags": [
        "d1.surface.money_pressed"
      ],
      "tags": [
        "hot",
        "number_first"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.transfer_ack",
          "d1.household_crisis_generic"
        ],
        "forbidAtomIds": [
          "d1.personal_debt_cover_confess",
          "d1.boundary_collapse_confess"
        ]
      }
    },
    {
      "id": "family01.a.d1.surface.early.pressure.timeline.05",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "네, 1,800만원이 제 계좌로 먼저 들어온 건 숨길 수 없습니다. 하지만 그 순간 제 앞에는 부모 돌봄과 집안 비용이 동시에 쏟아지고 있었고, 저는 그걸 먼저 막아야 한다고 생각했습니다.",
      "behaviorHint": "인정 뒤에 곧바로 사정을 붙이며 손가락으로 항목을 접어 나간다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "timeline",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "fresh",
          "wary"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a.d1.surface.pressure.timeline",
      "coverageKey": "a.d1.surface.early.pressure.timeline",
      "variantTarget": 6,
      "setFlags": [
        "d1.surface.money_pressed"
      ],
      "tags": [
        "hot",
        "number_first"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.transfer_ack",
          "d1.household_crisis_generic",
          "d1.mother_care_rollcall"
        ],
        "forbidAtomIds": [
          "d1.personal_debt_cover_confess",
          "d1.boundary_collapse_confess"
        ]
      }
    },
    {
      "id": "family01.a.d1.surface.early.pressure.timeline.06",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "제 동생은 늘 1,800만원만 앞에 세웁니다. 병원 접수, 어머니 약, 집안 공백을 누가 메웠는지는 빼고 숫자만 들이밀면, 저를 욕심낸 장녀로 만드는 건 정말 쉽겠죠.",
      "behaviorHint": "희생 목록을 먼저 쏟아내고 마지막 문장에 비웃음 섞인 힘을 준다.",
      "applicableStates": [
        "S2"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "timeline",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "fresh",
          "wary"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a.d1.surface.pressure.timeline",
      "coverageKey": "a.d1.surface.early.pressure.timeline",
      "variantTarget": 6,
      "setFlags": [
        "d1.surface.money_pressed"
      ],
      "tags": [
        "hot",
        "number_first"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.brother_numbers_only",
          "d1.mother_care_rollcall"
        ],
        "forbidAtomIds": [
          "d1.personal_debt_cover_confess",
          "d1.boundary_collapse_confess"
        ]
      }
    },
    {
      "id": "family01.b.d2.surface.early.pressure.timeline.01",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "6월 14일 퇴원, 6월 18일 제 몫 60만원 확정, 6월 30일 입금. 네, 늦었습니다. 그렇다고 그걸 '아예 안 냈다'로 부르면 기록부터 틀어집니다.",
      "behaviorHint": "날짜와 금액을 짧게 쌓은 뒤 마지막 문장을 칼같이 자른다.",
      "applicableStates": [
        "S0"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "timeline",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "fresh",
          "wary"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b.d2.surface.pressure.timeline",
      "coverageKey": "b.d2.surface.early.pressure.timeline",
      "variantTarget": 6,
      "setFlags": [
        "d2.surface.delay_pressed"
      ],
      "tags": [
        "hot",
        "receipt_stack"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.not_unpaid_just_delayed",
          "d2.full_abandonment_reject"
        ],
        "forbidAtomIds": [
          "d2.gap_burden_confess",
          "d2.payments_do_not_cancel_delay"
        ]
      }
    },
    {
      "id": "family01.b.d2.surface.early.pressure.timeline.02",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "야간 칸 하나 비었다고 저를 통째로 빠진 사람처럼 정리하시면 안 됩니다. 출장 때문에 한 차례 밀린 건 맞지만, 그 한 칸으로 전부를 말할 수는 없습니다.",
      "behaviorHint": "표를 보듯 허공을 한 번 짚고 말끝을 짧게 접는다.",
      "applicableStates": [
        "S0"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "timeline",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "fresh",
          "wary"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b.d2.surface.pressure.timeline",
      "coverageKey": "b.d2.surface.early.pressure.timeline",
      "variantTarget": 6,
      "setFlags": [
        "d2.surface.delay_pressed"
      ],
      "tags": [
        "hot",
        "receipt_stack"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.shift_adjustment_not_abandon",
          "d2.full_abandonment_reject"
        ],
        "forbidAtomIds": [
          "d2.gap_burden_confess",
          "d2.payments_do_not_cancel_delay"
        ]
      }
    },
    {
      "id": "family01.b.d2.surface.early.pressure.timeline.03",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "60만원이 제때 안 들어간 건 사실입니다. 다만 누나가 말하듯 '전부 방치'까지는 아니었고, 제가 직접 처리한 항목도 있었습니다.",
      "behaviorHint": "인정과 축소를 두 문장으로 딱 나눈다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "timeline",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "fresh",
          "wary"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b.d2.surface.pressure.timeline",
      "coverageKey": "b.d2.surface.early.pressure.timeline",
      "variantTarget": 6,
      "setFlags": [
        "d2.surface.delay_pressed"
      ],
      "tags": [
        "hot",
        "receipt_stack"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.twelve_day_delay_ack",
          "d2.not_total_absence"
        ],
        "forbidAtomIds": [
          "d2.gap_burden_confess",
          "d2.payments_do_not_cancel_delay"
        ]
      }
    },
    {
      "id": "family01.b.d2.surface.early.pressure.timeline.04",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "정확히는 미납이라기보다 늦은 입금이었습니다. 그 차이를 자꾸 고집하는 게 비겁해 보일 수 있어도, 저한테는 그 구분이 무너지면 바로 불효자 낙인처럼 느껴졌습니다.",
      "behaviorHint": "앞 문장은 건조하게, 뒷문장은 조금 느리게 떼어 낸다.",
      "applicableStates": [
        "S1"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "timeline",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "fresh",
          "wary"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b.d2.surface.pressure.timeline",
      "coverageKey": "b.d2.surface.early.pressure.timeline",
      "variantTarget": 6,
      "setFlags": [
        "d2.surface.delay_pressed"
      ],
      "tags": [
        "hot",
        "receipt_stack"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.twelve_day_delay_ack",
          "d2.not_total_absence"
        ],
        "forbidAtomIds": [
          "d2.gap_burden_confess",
          "d2.payments_do_not_cancel_delay"
        ]
      }
    },
    {
      "id": "family01.b.d2.surface.early.pressure.timeline.05",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "네, 60만원을 12일 늦게 낸 건 인정합니다. 야간 교대 한 번 비운 것도요. 그래도 그 표에는 제가 직접 낸 약값과 이동시간도 같이 있으니, 누나가 말하는 그림이 전부는 아닙니다.",
      "behaviorHint": "숫자를 먼저 읊고 마지막 문장에서만 억울함이 묻어난다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "timeline",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "fresh",
          "wary"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b.d2.surface.pressure.timeline",
      "coverageKey": "b.d2.surface.early.pressure.timeline",
      "variantTarget": 6,
      "setFlags": [
        "d2.surface.delay_pressed"
      ],
      "tags": [
        "hot",
        "receipt_stack"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.twelve_day_delay_ack",
          "d2.one_shift_gap_ack",
          "d2.direct_drug_payment_exists"
        ],
        "forbidAtomIds": [
          "d2.gap_burden_confess",
          "d2.payments_do_not_cancel_delay"
        ]
      }
    },
    {
      "id": "family01.b.d2.surface.early.pressure.timeline.06",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "누나는 12일 지연이랑 빈 야간칸만 확대합니다. 같은 표에 찍힌 약값 결제와 이동시간은 싹 빼버리고 저를 계산 밖 사람처럼 세우죠.",
      "behaviorHint": "표를 접어 버리듯 손을 접고 마지막에 시선을 올린다.",
      "applicableStates": [
        "S2"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "timeline",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "fresh",
          "wary"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b.d2.surface.pressure.timeline",
      "coverageKey": "b.d2.surface.early.pressure.timeline",
      "variantTarget": 6,
      "setFlags": [
        "d2.surface.delay_pressed"
      ],
      "tags": [
        "hot",
        "receipt_stack"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.sister_gap_exaggeration",
          "d2.direct_drug_payment_exists"
        ],
        "forbidAtomIds": [
          "d2.gap_burden_confess",
          "d2.payments_do_not_cancel_delay"
        ]
      }
    },
    {
      "id": "family01.a.d3.surface.early.trap.context.01",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "그 잘린 수첩 사진 한 장만으로 제가 유산 욕심을 냈다고 정하시면 너무 쉽습니다. 그 문장은 아버지가 제게 맡긴 자리의 흔적이었지, 탐욕의 증거 한 줄이 아니었습니다.",
      "behaviorHint": "사진을 감싸듯 손을 오므렸다가 마지막에 턱을 든다.",
      "applicableStates": [
        "S0"
      ],
      "layer": "surface",
      "issueRole": "red_herring",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit",
        "evidence_present"
      ],
      "conditions": {
        "trapStates": [
          "suspected",
          "active"
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ],
        "fatigueLevels": [
          "fresh",
          "wary",
          "high"
        ]
      },
      "weight": 7,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a.d3.surface.trap.context",
      "coverageKey": "a.d3.surface.early.trap.context",
      "variantTarget": 6,
      "setFlags": [
        "d3.red_herring_pressed"
      ],
      "tags": [
        "hot",
        "trap",
        "red_herring"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d3a.unlock.m0.one_line_reads_like_inheritance",
          "d3.memo_line_quote"
        ],
        "forbidAtomIds": [
          "d3.tax_hospital_context",
          "d3.authority_expansion_confess"
        ]
      },
      "beliefMode": "weaponizes"
    },
    {
      "id": "family01.a.d3.surface.early.trap.context.02",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "‘집 일은 서아가 맡아’ 그 한 줄이 왜 저한테 남았는지는 보지 않고, 상속 욕심으로만 바로 뛰어가시면 안 됩니다. 그건 제가 해 온 역할을 한 줄로 붙잡은 겁니다.",
      "behaviorHint": "한 줄을 되읽듯 천천히 말하다가 마지막 문장에서만 힘을 준다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "red_herring",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit",
        "evidence_present"
      ],
      "conditions": {
        "trapStates": [
          "suspected",
          "active"
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ],
        "fatigueLevels": [
          "fresh",
          "wary",
          "high"
        ]
      },
      "weight": 7,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a.d3.surface.trap.context",
      "coverageKey": "a.d3.surface.early.trap.context",
      "variantTarget": 6,
      "setFlags": [
        "d3.red_herring_pressed"
      ],
      "tags": [
        "hot",
        "trap",
        "red_herring"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.memo_line_quote",
          "d3.role_recognition_read",
          "d3a.unlock.m1.role_and_property_blurred"
        ],
        "forbidAtomIds": [
          "d3.tax_hospital_context",
          "d3.authority_expansion_confess"
        ]
      },
      "beliefMode": "weaponizes"
    },
    {
      "id": "family01.a.d3.surface.early.trap.context.03",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "상속 지정처럼 법적으로 완성된 문장이라고까지는 저도 못 하겠습니다. 그래도 그 한 줄을 제 자리와 떼어 놓으라고 하면, 제가 해 온 시간이 통째로 잘려 나가는 기분입니다.",
      "behaviorHint": "법적이라는 단어에서 잠깐 멈칫하고 뒷문장에서 감정을 밀어 넣는다.",
      "applicableStates": [
        "S1"
      ],
      "layer": "surface",
      "issueRole": "red_herring",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit",
        "evidence_present"
      ],
      "conditions": {
        "trapStates": [
          "suspected",
          "active"
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ],
        "fatigueLevels": [
          "fresh",
          "wary",
          "high"
        ]
      },
      "weight": 7,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a.d3.surface.trap.context",
      "coverageKey": "a.d3.surface.early.trap.context",
      "variantTarget": 6,
      "setFlags": [
        "d3.red_herring_pressed"
      ],
      "tags": [
        "hot",
        "trap",
        "red_herring"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.memo_line_quote",
          "d3.role_recognition_read",
          "d3.not_greed_only"
        ],
        "forbidAtomIds": [
          "d3.tax_hospital_context",
          "d3.authority_expansion_confess"
        ]
      },
      "beliefMode": "weaponizes"
    },
    {
      "id": "family01.a.d3.surface.early.trap.context.04",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "사진이 잘린 상태라는 건 압니다. 그런데도 저는 그 한 줄을 그냥 넘길 수가 없었습니다. 아버지와 어머니 일을 맡아온 시간이 제 쪽에 있었으니까요.",
      "behaviorHint": "불리한 점을 먼저 받아들인 뒤 바로 역할 서사를 덧붙인다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "layer": "surface",
      "issueRole": "red_herring",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit",
        "evidence_present"
      ],
      "conditions": {
        "trapStates": [
          "suspected",
          "active"
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ],
        "fatigueLevels": [
          "fresh",
          "wary",
          "high"
        ]
      },
      "weight": 7,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a.d3.surface.trap.context",
      "coverageKey": "a.d3.surface.early.trap.context",
      "variantTarget": 6,
      "setFlags": [
        "d3.red_herring_pressed"
      ],
      "tags": [
        "hot",
        "trap",
        "red_herring"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.memo_photo_reason",
          "d3.role_recognition_read",
          "d3a.unlock.m2.cropped_note_hardens_claim"
        ],
        "forbidAtomIds": [
          "d3.tax_hospital_context",
          "d3.authority_expansion_confess"
        ]
      },
      "beliefMode": "weaponizes"
    },
    {
      "id": "family01.a.d3.surface.early.trap.context.05",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "유언장 같은 문장은 아니라는 건 인정합니다. 하지만 그 사진을 낸 이유가 순수한 탐욕만은 아니었고, 저는 그 말을 제 자리의 표시처럼 붙들었습니다.",
      "behaviorHint": "인정 뒤에 곧바로 자기 해석을 붙이며 시선을 피한다.",
      "applicableStates": [
        "S2"
      ],
      "layer": "surface",
      "issueRole": "red_herring",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit",
        "evidence_present"
      ],
      "conditions": {
        "trapStates": [
          "suspected",
          "active"
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ],
        "fatigueLevels": [
          "fresh",
          "wary",
          "high"
        ]
      },
      "weight": 7,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a.d3.surface.trap.context",
      "coverageKey": "a.d3.surface.early.trap.context",
      "variantTarget": 6,
      "setFlags": [
        "d3.red_herring_pressed"
      ],
      "tags": [
        "hot",
        "trap",
        "red_herring"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.not_legal_will_ack",
          "d3.line_as_time_marker",
          "d3a.unlock.m2.cropped_note_hardens_claim"
        ],
        "forbidAtomIds": [
          "d3.tax_hospital_context",
          "d3.authority_expansion_confess"
        ]
      },
      "beliefMode": "weaponizes"
    },
    {
      "id": "family01.a.d3.surface.early.trap.context.06",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "제 동생은 늘 한 줄만 잘라서 제가 욕심냈다고 말합니다. 그렇게 해석해 버리면 제가 부모 일 붙들어 온 시간은 다 사라지고, 남는 건 탐욕이라는 단어 하나뿐이죠.",
      "behaviorHint": "끝말을 세게 잘라 되받아치고 마지막에 짧게 웃는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "red_herring",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit",
        "evidence_present"
      ],
      "conditions": {
        "trapStates": [
          "suspected",
          "active"
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ],
        "fatigueLevels": [
          "fresh",
          "wary",
          "high"
        ]
      },
      "weight": 7,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a.d3.surface.trap.context",
      "coverageKey": "a.d3.surface.early.trap.context",
      "variantTarget": 6,
      "setFlags": [
        "d3.red_herring_pressed"
      ],
      "tags": [
        "hot",
        "trap",
        "red_herring"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.brother_cuts_one_line",
          "d3.not_greed_only",
          "d3a.unlock.m1.role_and_property_blurred"
        ],
        "forbidAtomIds": [
          "d3.tax_hospital_context",
          "d3.authority_expansion_confess"
        ]
      },
      "beliefMode": "weaponizes"
    },
    {
      "id": "family01.a.d1.core.late.rapport.emotion.01",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "사실 저는 간병비보다 먼저 제 카드값과 보험료부터 막았다는 말을 제 입으로 꺼내는 게 제일 무섭습니다. 그 순간부터 저는 효녀가 아니라 부모 돈에 손댄 장녀로만 남을 것 같았거든요.",
      "behaviorHint": "문장 중간에 숨이 한번 걸리고 마지막에서 목소리가 가늘어진다.",
      "applicableStates": [
        "S4"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "question",
      "questionTypes": [
        "empathy_approach",
        "motive_search"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "explosive",
          "shutdown"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "fresh",
          "wary",
          "high"
        ]
      },
      "weight": 6,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a.d1.core.rapport.emotion",
      "coverageKey": "a.d1.core.late.rapport.emotion",
      "variantTarget": 4,
      "setFlags": [
        "d1.core.relationship_open"
      ],
      "tags": [
        "mid",
        "core",
        "emotion"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.self_finance_fear",
          "d1.dutiful_daughter_fear"
        ],
        "forbidAtomIds": [
          "d1.boundary_collapse_confess"
        ]
      }
    },
    {
      "id": "family01.a.d1.core.late.rapport.emotion.02",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "제가 두려웠던 건 돈을 썼다는 사실만이 아니었습니다. 제가 무너지면 부모 돌봄도 같이 무너진다고 믿었고, 그래서 먼저 제 형편부터 붙든 걸 끝까지 합리화했습니다.",
      "behaviorHint": "첫 문장은 낮고 단단하게, 두 번째에서만 고개가 조금 숙는다.",
      "applicableStates": [
        "S4"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "question",
      "questionTypes": [
        "empathy_approach",
        "motive_search"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "explosive",
          "shutdown"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "fresh",
          "wary",
          "high"
        ]
      },
      "weight": 6,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a.d1.core.rapport.emotion",
      "coverageKey": "a.d1.core.late.rapport.emotion",
      "variantTarget": 4,
      "setFlags": [
        "d1.core.relationship_open"
      ],
      "tags": [
        "mid",
        "core",
        "emotion"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.self_finance_fear",
          "d1.house_must_not_stop"
        ],
        "forbidAtomIds": [
          "d1.boundary_collapse_confess"
        ]
      }
    },
    {
      "id": "family01.a.d1.core.late.rapport.emotion.03",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confess",
      "line": "네, 결국 저는 부모 돌봄을 지킨다는 명분으로 제 카드대금과 보험료를 먼저 막았습니다. 장녀라는 자리를 잃을까 무서워서, 부모 돈과 제 사정을 같은 통 안에 넣어 버렸습니다.",
      "behaviorHint": "정확한 사실을 또박또박 말하다가 마지막 문장에서 어깨가 꺼진다.",
      "applicableStates": [
        "S5"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "question",
      "questionTypes": [
        "empathy_approach",
        "motive_search"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "explosive",
          "shutdown"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "fresh",
          "wary",
          "high"
        ]
      },
      "weight": 6,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a.d1.core.rapport.emotion",
      "coverageKey": "a.d1.core.late.rapport.emotion",
      "variantTarget": 4,
      "setFlags": [
        "d1.core.relationship_open"
      ],
      "tags": [
        "mid",
        "core",
        "emotion"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.personal_debt_cover_confess",
          "d1.boundary_collapse_confess"
        ]
      }
    },
    {
      "id": "family01.a.d1.core.late.rapport.emotion.04",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confess",
      "line": "그 1,800만원은 집안을 버티게 하려는 돈이기도 했지만, 동시에 제가 무너지지 않으려는 돈이기도 했습니다. 저는 그 둘을 구분해야 할 순간에 일부러 섞었습니다.",
      "behaviorHint": "마지막 단어를 삼키듯 천천히 끊는다.",
      "applicableStates": [
        "S5"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "question",
      "questionTypes": [
        "empathy_approach",
        "motive_search"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "explosive",
          "shutdown"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "fresh",
          "wary",
          "high"
        ]
      },
      "weight": 6,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a.d1.core.rapport.emotion",
      "coverageKey": "a.d1.core.late.rapport.emotion",
      "variantTarget": 4,
      "setFlags": [
        "d1.core.relationship_open"
      ],
      "tags": [
        "mid",
        "core",
        "emotion"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.personal_debt_cover_confess",
          "d1.relabel_as_care_expense",
          "d1.boundary_collapse_confess"
        ]
      }
    },
    {
      "id": "family01.b.d2.core.late.rapport.emotion.01",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "저는 계속 '안 낸 건 아니야, 늦은 거야'라고만 붙들었습니다. 그 말을 놓는 순간, 제가 누나를 혼자 남겨 둔 사람이라는 게 너무 선명해질 것 같아서요.",
      "behaviorHint": "짧은 부정문을 반복하다가 마지막에서 겨우 속도를 늦춘다.",
      "applicableStates": [
        "S4"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "question",
      "questionTypes": [
        "empathy_approach",
        "motive_search"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "explosive",
          "shutdown"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "fresh",
          "wary",
          "high"
        ]
      },
      "weight": 6,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b.d2.core.rapport.emotion",
      "coverageKey": "b.d2.core.late.rapport.emotion",
      "variantTarget": 4,
      "setFlags": [
        "d2.core.relationship_open"
      ],
      "tags": [
        "mid",
        "core",
        "emotion"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.kept_saying_delayed_only",
          "d2.left_sister_alone_feeling"
        ],
        "forbidAtomIds": [
          "d2.gap_burden_confess"
        ]
      }
    },
    {
      "id": "family01.b.d2.core.late.rapport.emotion.02",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "제가 직접 낸 약값을 계속 들이미는 것도 결국은 겁이었어요. 그걸 말하지 않으면, 남는 건 12일 지연과 빈 야간칸뿐이니까요.",
      "behaviorHint": "건조하게 시작했다가 '겁'에서만 목이 잠긴다.",
      "applicableStates": [
        "S4"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "question",
      "questionTypes": [
        "empathy_approach",
        "motive_search"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "explosive",
          "shutdown"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "fresh",
          "wary",
          "high"
        ]
      },
      "weight": 6,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b.d2.core.rapport.emotion",
      "coverageKey": "b.d2.core.late.rapport.emotion",
      "variantTarget": 4,
      "setFlags": [
        "d2.core.relationship_open"
      ],
      "tags": [
        "mid",
        "core",
        "emotion"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.direct_drug_payment_exists",
          "d2.kept_saying_delayed_only"
        ],
        "forbidAtomIds": [
          "d2.gap_burden_confess"
        ]
      }
    },
    {
      "id": "family01.b.d2.core.late.rapport.emotion.03",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confess",
      "line": "맞습니다. 제가 60만원을 늦게 내고 야간 교대를 비운 시간의 부담은 결국 누나에게 갔습니다. 약값을 직접 낸 적이 있다고 해도 그 지연 책임은 없어지지 않았습니다.",
      "behaviorHint": "숫자를 짚은 뒤 마지막 문장은 체념하듯 낮게 떨어뜨린다.",
      "applicableStates": [
        "S5"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "question",
      "questionTypes": [
        "empathy_approach",
        "motive_search"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "explosive",
          "shutdown"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "fresh",
          "wary",
          "high"
        ]
      },
      "weight": 6,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b.d2.core.rapport.emotion",
      "coverageKey": "b.d2.core.late.rapport.emotion",
      "variantTarget": 4,
      "setFlags": [
        "d2.core.relationship_open"
      ],
      "tags": [
        "mid",
        "core",
        "emotion"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.gap_burden_confess",
          "d2.payments_do_not_cancel_delay"
        ]
      }
    },
    {
      "id": "family01.b.d2.core.late.rapport.emotion.04",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confess",
      "line": "제가 끝까지 계산으로만 버틴 건, 불효자처럼 보이는 순간을 미루고 싶어서였습니다. 그런데 그렇게 미룬 시간 자체가 누나한테는 더 큰 짐이 됐죠.",
      "behaviorHint": "말 끝을 짧게 치다가 마지막 문장에서 처음으로 길게 숨을 내쉰다.",
      "applicableStates": [
        "S5"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "question",
      "questionTypes": [
        "empathy_approach",
        "motive_search"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "explosive",
          "shutdown"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "fresh",
          "wary",
          "high"
        ]
      },
      "weight": 6,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b.d2.core.rapport.emotion",
      "coverageKey": "b.d2.core.late.rapport.emotion",
      "variantTarget": 4,
      "setFlags": [
        "d2.core.relationship_open"
      ],
      "tags": [
        "mid",
        "core",
        "emotion"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.left_sister_alone_feeling",
          "d2.gap_burden_confess"
        ]
      }
    },
    {
      "id": "family01.a.d5.surface.mid.pressure.responsibility.01",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "공유표 원칙을 제가 지켰다고 말하진 않겠습니다. 그렇지만 1,800만원만 문제 삼고 도현이 늦게 올린 약값과 보호사 비용을 전부 예외로 빼면, 그건 규칙이 아니라 사람 골라 적용하는 잣대입니다.",
      "behaviorHint": "규칙이라는 단어에 힘을 주고 마지막 문장을 또렷하게 끊는다.",
      "applicableStates": [
        "S2"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "responsibility",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated",
          "explosive"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "fresh",
          "wary"
        ]
      },
      "weight": 6,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a.d5.surface.pressure.responsibility",
      "coverageKey": "a.d5.surface.mid.pressure.responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d5.mutual_breach_pressed"
      ],
      "tags": [
        "mid",
        "rule",
        "responsibility"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d5a.rule_not_denied",
          "d5a.hidden_1800_ack",
          "d5a.brother_late_drug_logs"
        ],
        "forbidAtomIds": [
          "d5a.broke_first_and_bigger"
        ]
      }
    },
    {
      "id": "family01.a.d5.surface.mid.pressure.responsibility.02",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "네, 저도 공유표 바깥에서 움직였습니다. 하지만 저만 규칙 파괴자로 세우고 도현의 늦은 기록은 작은 실수처럼 접어 버리면, 저는 끝까지 배신자 역할만 맡게 됩니다.",
      "behaviorHint": "첫 문장을 인정하고 둘째 문장에서 감정을 실어 밀어붙인다.",
      "applicableStates": [
        "S2"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "responsibility",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated",
          "explosive"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "fresh",
          "wary"
        ]
      },
      "weight": 6,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a.d5.surface.pressure.responsibility",
      "coverageKey": "a.d5.surface.mid.pressure.responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d5.mutual_breach_pressed"
      ],
      "tags": [
        "mid",
        "rule",
        "responsibility"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d5a.mutual_breach_frame",
          "d5a.only_traitor_frame_reject"
        ],
        "forbidAtomIds": [
          "d5a.broke_first_and_bigger"
        ]
      }
    },
    {
      "id": "family01.a.d5.surface.mid.pressure.responsibility.03",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "제 동생은 늘 제가 먼저 더 크게 어겼다는 말만 하고 싶어 하죠. 그런데 약값이랑 보호사 비용을 뒤늦게 올린 건 또 기록 위반이 아니라고 하면, 그건 계산이 아니라 편들기입니다.",
      "behaviorHint": "표를 넘기듯 손을 한번 흔들며 냉소를 섞는다.",
      "applicableStates": [
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "responsibility",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated",
          "explosive"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "fresh",
          "wary"
        ]
      },
      "weight": 6,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a.d5.surface.pressure.responsibility",
      "coverageKey": "a.d5.surface.mid.pressure.responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d5.mutual_breach_pressed"
      ],
      "tags": [
        "mid",
        "rule",
        "responsibility"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d5a.brother_late_drug_logs",
          "d5a.only_traitor_frame_reject"
        ],
        "forbidAtomIds": [
          "d5a.broke_first_and_bigger"
        ]
      }
    },
    {
      "id": "family01.a.d5.surface.mid.pressure.responsibility.04",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "규칙을 말하실 거면 둘 다 그 안에 세워야 합니다. 저만 '1,800만원 숨긴 사람'으로 남기고 도현은 '좀 늦은 사람'으로 정리하면, 애초에 같은 표를 왜 만들었겠습니까.",
      "behaviorHint": "마지막 질문에서 시선을 곧게 든다.",
      "applicableStates": [
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "responsibility",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated",
          "explosive"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "fresh",
          "wary"
        ]
      },
      "weight": 6,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a.d5.surface.pressure.responsibility",
      "coverageKey": "a.d5.surface.mid.pressure.responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d5.mutual_breach_pressed"
      ],
      "tags": [
        "mid",
        "rule",
        "responsibility"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d5a.mutual_breach_frame",
          "d5a.only_traitor_frame_reject"
        ],
        "forbidAtomIds": [
          "d5a.broke_first_and_bigger"
        ]
      }
    },
    {
      "id": "family01.b.d5.surface.mid.pressure.responsibility.01",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "공유표 원칙을 제가 완벽히 지켰다고는 못 하겠습니다. 다만 늦은 기록 몇 건과 1,800만원 선이체 은닉을 같은 칸에 넣어 버리면, 무게가 전혀 안 보입니다.",
      "behaviorHint": "수치를 말할 때는 건조하고 마지막 단어만 낮게 깎는다.",
      "applicableStates": [
        "S2"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "responsibility",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated",
          "explosive"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "fresh",
          "wary"
        ]
      },
      "weight": 6,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b.d5.surface.pressure.responsibility",
      "coverageKey": "b.d5.surface.mid.pressure.responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d5.weight_difference_pressed"
      ],
      "tags": [
        "mid",
        "rule",
        "responsibility"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d5b.not_fully_compliant",
          "d5b.scale_type_difference"
        ],
        "forbidAtomIds": [
          "d5b.face_protection_confess"
        ]
      }
    },
    {
      "id": "family01.b.d5.surface.mid.pressure.responsibility.02",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "네, 제 약값과 보호사 비용 기록도 늦었습니다. 그래도 누나의 1,800만원 선이체가 가장 큰 위반이라는 판단까지 지우라고 하면, 저는 다시 숫자로밖에 말할 수가 없습니다.",
      "behaviorHint": "앞 문장을 짧게 인정하고 곧바로 규모 차이를 들이민다.",
      "applicableStates": [
        "S2"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "responsibility",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated",
          "explosive"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "fresh",
          "wary"
        ]
      },
      "weight": 6,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b.d5.surface.pressure.responsibility",
      "coverageKey": "b.d5.surface.mid.pressure.responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d5.weight_difference_pressed"
      ],
      "tags": [
        "mid",
        "rule",
        "responsibility"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d5b.my_late_logs_ack",
          "d5b.sister_1800_biggest"
        ],
        "forbidAtomIds": [
          "d5b.face_protection_confess"
        ]
      }
    },
    {
      "id": "family01.b.d5.surface.mid.pressure.responsibility.03",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "누나는 늘 '둘 다 어겼다'는 말로 무게를 평평하게 만들고 싶어 합니다. 하지만 기록 지연과 부모 관리계좌에서 1,800만원을 먼저 빼 쓴 일은, 같은 규칙 위반이어도 계산부터 다릅니다.",
      "behaviorHint": "차갑게 숫자를 또박또박 말하고 마지막을 짧게 닫는다.",
      "applicableStates": [
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "responsibility",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated",
          "explosive"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "fresh",
          "wary"
        ]
      },
      "weight": 6,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b.d5.surface.pressure.responsibility",
      "coverageKey": "b.d5.surface.mid.pressure.responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d5.weight_difference_pressed"
      ],
      "tags": [
        "mid",
        "rule",
        "responsibility"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d5b.mutual_breach_not_equal",
          "d5b.scale_type_difference"
        ],
        "forbidAtomIds": [
          "d5b.face_protection_confess"
        ]
      }
    },
    {
      "id": "family01.b.d5.surface.mid.pressure.responsibility.04",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "제가 규칙 안쪽 사람처럼 굴었다는 비판은 이해합니다. 그렇다고 제 늦은 기록을 근거로 누나의 선이체까지 희석시키는 건 또 다른 왜곡입니다.",
      "behaviorHint": "인정의 기색을 보이다가 두 번째 문장에서 다시 선을 긋는다.",
      "applicableStates": [
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "responsibility",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated",
          "explosive"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "fresh",
          "wary"
        ]
      },
      "weight": 6,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b.d5.surface.pressure.responsibility",
      "coverageKey": "b.d5.surface.mid.pressure.responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d5.weight_difference_pressed"
      ],
      "tags": [
        "mid",
        "rule",
        "responsibility"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d5b.not_rule_inside_afterall",
          "d5b.sister_1800_biggest"
        ],
        "forbidAtomIds": [
          "d5b.face_protection_confess"
        ]
      }
    },
    {
      "id": "family01.b.d4.surface.early.pressure.context.01",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "퇴원 직후 제가 본 예상비용은 210만원 수준이었습니다. 그때는 사비와 즉시 현금 말고 다른 대안이 눈에 들어오지 않았고, 그 압박은 실제였습니다.",
      "behaviorHint": "금액을 먼저 딱 짚고 마지막 문장을 낮게 붙인다.",
      "applicableStates": [
        "S0"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "context",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit",
        "motive_search"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "fresh",
          "wary"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b.d4.surface.pressure.context",
      "coverageKey": "b.d4.surface.early.pressure.context",
      "variantTarget": 2,
      "setFlags": [
        "d4.surface.no_alternative_pressed"
      ],
      "tags": [
        "cold",
        "procedure"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d4.initial_210_estimate",
          "d4.no_visible_alternative_then",
          "d4.cost_pressure_real"
        ],
        "forbidAtomIds": [
          "d4.ninetyeight_possible",
          "d4.first_month_not_all_private"
        ]
      }
    },
    {
      "id": "family01.b.d4.surface.early.pressure.context.02",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "지금 와서 다른 절차가 있었다고 말하는 건 쉽죠. 하지만 당시 제가 받은 정보 범위에서는 바로 메우는 수밖에 없다고 판단했고, 그 판단 자체를 사후적으로만 재단하진 말아 주셨으면 합니다.",
      "behaviorHint": "앞 문장은 건조하게, 뒷문장은 신경질을 누르듯 짧게 끊는다.",
      "applicableStates": [
        "S1"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "context",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit",
        "motive_search"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "fresh",
          "wary"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b.d4.surface.pressure.context",
      "coverageKey": "b.d4.surface.early.pressure.context",
      "variantTarget": 2,
      "setFlags": [
        "d4.surface.no_alternative_pressed"
      ],
      "tags": [
        "cold",
        "procedure"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d4.info_scope_limit",
          "d4.retrospective_judgment_reject"
        ],
        "forbidAtomIds": [
          "d4.ninetyeight_possible",
          "d4.first_month_not_all_private"
        ]
      }
    },
    {
      "id": "family01.a.d1.surface.mid.evidence.context.01",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "그 원본 거래내역까지 보셨다면, 네, 1,800만원이 제 개인계좌로 먼저 들어온 건 더는 숨길 수 없습니다. 그래도 그 기록 한 장으로 '순수한 탐욕'까지 바로 확정하실 수는 없습니다.",
      "behaviorHint": "원본 내역을 보는 순간 입술이 굳고 마지막 문장에서만 방어적으로 고개를 든다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "evidence_response",
      "angleTag": "context",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated",
          "explosive"
        ],
        "fatigueLevels": [
          "fresh",
          "wary",
          "high"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a.d1.surface.evidence.context",
      "coverageKey": "a.d1.surface.mid.evidence.context",
      "variantTarget": 2,
      "setFlags": [
        "d1.household_crisis_challenged"
      ],
      "tags": [
        "evidence",
        "mid"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.transfer_ack",
          "d1.personal_account_first"
        ],
        "forbidAtomIds": [
          "d1.personal_debt_cover_confess",
          "d1.boundary_collapse_confess"
        ]
      },
      "afterEvidence": "e-1"
    },
    {
      "id": "family01.a.d1.surface.mid.evidence.context.02",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "복원 메모까지 나오면, 제가 나중에 간병비처럼 맞춰 보려 했다는 건 부정하기 어렵습니다. 그게 떳떳한 건 아니지만, 그때 제 형편과 집안 압박이 엉켜 있었다는 말까지 지워지진 않습니다.",
      "behaviorHint": "메모의 문장을 읽는 순간 시선을 피하고, 끝에서만 숨을 삼킨다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "evidence_response",
      "angleTag": "context",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated",
          "explosive"
        ],
        "fatigueLevels": [
          "fresh",
          "wary",
          "high"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a.d1.surface.evidence.context",
      "coverageKey": "a.d1.surface.mid.evidence.context",
      "variantTarget": 2,
      "setFlags": [
        "d1.household_crisis_challenged"
      ],
      "tags": [
        "evidence",
        "mid"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.card_insurance_paid_first",
          "d1.relabel_as_care_expense"
        ],
        "forbidAtomIds": [
          "d1.boundary_collapse_confess"
        ]
      },
      "afterEvidence": "e-2"
    },
    {
      "id": "family01.b.d2.surface.mid.evidence.context.01",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "그 원본 스케줄표까지 보셨다면, 60만원이 12일 늦은 건 더 줄여 말하기 어렵습니다. 야간 공백도 남아 있죠. 다만 같은 표에 찍힌 직접 결제 항목까지 함께 보셔야 제 책임 범위가 정확해집니다.",
      "behaviorHint": "표를 쳐다보다가 날짜와 금액을 먼저 말하고 마지막 문장을 낮게 깎는다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "evidence_response",
      "angleTag": "context",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated",
          "explosive"
        ],
        "fatigueLevels": [
          "fresh",
          "wary",
          "high"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b.d2.surface.evidence.context",
      "coverageKey": "b.d2.surface.mid.evidence.context",
      "variantTarget": 2,
      "setFlags": [
        "d2.delay_frame_pressed"
      ],
      "tags": [
        "evidence",
        "mid"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.twelve_day_delay_ack",
          "d2.one_shift_gap_ack",
          "d2.direct_drug_payment_exists"
        ],
        "forbidAtomIds": [
          "d2.gap_burden_confess"
        ]
      },
      "afterEvidence": "e-3"
    },
    {
      "id": "family01.b.d2.surface.mid.evidence.context.02",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "기록이 한 장으로 붙으면, 제가 계속 '미뤘다'고만 버틴 이유도 더 초라해집니다. 그렇다고 직접 낸 약값이 아예 없던 일이 되는 건 아니니, 그 부분까지 같이 보셔야 합니다.",
      "behaviorHint": "억울함을 참듯 턱을 잠깐 굳혔다가 마지막에만 천천히 풀어낸다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "evidence_response",
      "angleTag": "context",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated",
          "explosive"
        ],
        "fatigueLevels": [
          "fresh",
          "wary",
          "high"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b.d2.surface.evidence.context",
      "coverageKey": "b.d2.surface.mid.evidence.context",
      "variantTarget": 2,
      "setFlags": [
        "d2.delay_frame_pressed"
      ],
      "tags": [
        "evidence",
        "mid"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.kept_saying_delayed_only",
          "d2.direct_drug_payment_exists"
        ],
        "forbidAtomIds": [
          "d2.gap_burden_confess"
        ]
      },
      "afterEvidence": "e-3"
    },
    {
      "id": "family01.a.d3.core.clarify.evidence.context.01",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "그 잘린 사진만 놓고 보면 상속처럼 읽힐 수 있다는 건 압니다. 그래서 제가 그 한 줄을 더 크게 붙들었던 것도 사실이고요. 하지만 그 사진 한 장이 전부라고는 끝까지 말할 수 없습니다.",
      "behaviorHint": "사진 끝을 만지듯 손가락을 모으고 마지막 문장에서만 속도를 늦춘다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
      ],
      "layer": "core",
      "issueRole": "red_herring",
      "responseIntent": "evidence_response",
      "angleTag": "context",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated",
          "explosive"
        ],
        "fatigueLevels": [
          "fresh",
          "wary",
          "high"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a.d3.core.evidence.context",
      "coverageKey": "a.d3.core.clarify.evidence.context",
      "variantTarget": 2,
      "setFlags": [
        "d3.red_herring_disproved"
      ],
      "tags": [
        "evidence",
        "red_herring",
        "clarify"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.memo_photo_reason",
          "d3a.unlock.m2.cropped_note_hardens_claim"
        ],
        "forbidAtomIds": [
          "d3.tax_hospital_context",
          "d3.authority_expansion_confess"
        ]
      },
      "beliefMode": "weaponizes",
      "afterEvidence": "e-4"
    },
    {
      "id": "family01.a.d3.core.clarify.evidence.context.02",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "변호사 확인서와 전체 스캔까지 나오면, 네, 그 한 줄이 상속 지정은 아니었다는 건 더는 부정할 수 없습니다. 그래도 제가 그 문장을 권한처럼 붙들었던 이유까지 탐욕 한 단어로 끝내진 말아 주십시오.",
      "behaviorHint": "전체 스캔 앞에서 고개가 조금 숙고, 마지막 문장에서만 감정이 남는다.",
      "applicableStates": [
        "S3",
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "red_herring",
      "responseIntent": "evidence_response",
      "angleTag": "context",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated",
          "explosive"
        ],
        "fatigueLevels": [
          "fresh",
          "wary",
          "high"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a.d3.core.evidence.context",
      "coverageKey": "a.d3.core.clarify.evidence.context",
      "variantTarget": 2,
      "setFlags": [
        "d3.red_herring_disproved"
      ],
      "tags": [
        "evidence",
        "red_herring",
        "clarify"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.noninheritance_ack",
          "d3.tax_hospital_context",
          "d3a.unlock.m3.full_scan_shakes_authority",
          "d3a.unlock.m4.inheritance_false_role_pain_remains"
        ],
        "forbidAtomIds": [
          "d3.authority_expansion_confess"
        ]
      },
      "beliefMode": "weaponizes",
      "afterEvidence": "e-5"
    },
    {
      "id": "family01.b.d4.surface.mid.evidence.context.01",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "사회복지사 기록까지 나오면, 첫 달을 무조건 210만원 사비로만 막아야 했다고 단정한 건 틀렸습니다. 제가 절차를 끝까지 확인하지 못한 채 현금부터 떠올린 것도 인정합니다.",
      "behaviorHint": "문서를 보고 말수가 줄어들고 마지막 인정 문장을 건조하게 떼어 낸다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "evidence_response",
      "angleTag": "context",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated",
          "explosive"
        ],
        "fatigueLevels": [
          "fresh",
          "wary",
          "high"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b.d4.surface.evidence.context",
      "coverageKey": "b.d4.surface.mid.evidence.context",
      "variantTarget": 2,
      "setFlags": [
        "d4.no_emergency_monopoly"
      ],
      "tags": [
        "evidence",
        "mid"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d4.guidance_record_confirms",
          "d4.judgment_inaccurate_ack",
          "d4.failed_to_check_process"
        ],
        "forbidAtomIds": [
          "d4.first_month_not_all_private"
        ]
      },
      "afterEvidence": "e-6"
    },
    {
      "id": "family01.b.d4.surface.mid.evidence.context.02",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "98만원 수준까지 낮아질 수 있었다는 계산표가 붙으면, 더는 '다른 길이 없었다'고만 버틸 수 없습니다. 다만 그걸 몰랐던 제 판단 착오와, 누나가 1,800만원을 먼저 당긴 일은 구분해서 봐야 합니다.",
      "behaviorHint": "숫자를 또박또박 읽고 마지막 문장에서만 선을 다시 긋는다.",
      "applicableStates": [
        "S3",
        "S4",
        "S5"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "evidence_response",
      "angleTag": "context",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated",
          "explosive"
        ],
        "fatigueLevels": [
          "fresh",
          "wary",
          "high"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b.d4.surface.evidence.context",
      "coverageKey": "b.d4.surface.mid.evidence.context",
      "variantTarget": 2,
      "setFlags": [
        "d4.no_emergency_monopoly"
      ],
      "tags": [
        "evidence",
        "mid"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d4.ninetyeight_possible",
          "d4.first_month_not_all_private",
          "d4.not_only_sister_fault"
        ]
      },
      "afterEvidence": "e-6"
    },
    {
      "id": "family01.a.d1.surface.mid.fatigue.timeline.01",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "재판관님, 같은 각도로 두 번째입니다. 1,800만원 이동 사실과 제 계좌 경유는 이미 말씀드렸고, 그다음은 왜 제가 그렇게까지 숨겼는지의 문제입니다.",
      "behaviorHint": "참는 숨이 먼저 나오고 마지막 문장에서만 초점을 좁힌다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "timeline",
      "actionFamily": "fatigue",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "fatigueLevels": [
          "wary",
          "high",
          "exhausted"
        ],
        "requiresFlags": [
          "d1.surface.money_pressed"
        ]
      },
      "weight": 6,
      "priority": 23,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a.d1.fatigue.timeline",
      "coverageKey": "a.d1.surface.mid.fatigue.timeline",
      "variantTarget": 3,
      "setFlags": [
        "d1.fatigue_triggered"
      ],
      "tags": [
        "fatigue",
        "timeline"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.transfer_ack"
        ],
        "forbidAtomIds": [
          "d1.personal_debt_cover_confess"
        ]
      }
    },
    {
      "id": "family01.a.d1.surface.mid.fatigue.timeline.02",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "계속 금액만 돌리시면 저는 또 숫자 뒤에 숨어 버리게 됩니다. 지금은 '왜 그 순서를 택했나' 쪽으로 질문이 넘어가야 할 것 같습니다.",
      "behaviorHint": "손끝으로 허공에 작은 원을 그리다 끊어 낸다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "timeline",
      "actionFamily": "fatigue",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "fatigueLevels": [
          "wary",
          "high",
          "exhausted"
        ],
        "requiresFlags": [
          "d1.surface.money_pressed"
        ]
      },
      "weight": 6,
      "priority": 23,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a.d1.fatigue.timeline",
      "coverageKey": "a.d1.surface.mid.fatigue.timeline",
      "variantTarget": 3,
      "setFlags": [
        "d1.fatigue_triggered"
      ],
      "tags": [
        "fatigue",
        "timeline"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.transfer_ack",
          "d1.household_crisis_generic"
        ],
        "forbidAtomIds": [
          "d1.personal_debt_cover_confess"
        ]
      }
    },
    {
      "id": "family01.a.d1.surface.mid.fatigue.timeline.03",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "계속 1,800만원만 붙들면 제 동생이 원하는 그림대로 갑니다. 저를 욕심낸 장녀로만 세우는 각도라면, 저는 더 방어적으로 굴 수밖에 없습니다.",
      "behaviorHint": "말끝이 거칠어지고 마지막에 턱이 조금 올라간다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "timeline",
      "actionFamily": "fatigue",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "fatigueLevels": [
          "wary",
          "high",
          "exhausted"
        ],
        "requiresFlags": [
          "d1.surface.money_pressed"
        ]
      },
      "weight": 6,
      "priority": 23,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a.d1.fatigue.timeline",
      "coverageKey": "a.d1.surface.mid.fatigue.timeline",
      "variantTarget": 3,
      "setFlags": [
        "d1.fatigue_triggered"
      ],
      "tags": [
        "fatigue",
        "timeline"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.brother_numbers_only"
        ],
        "forbidAtomIds": [
          "d1.personal_debt_cover_confess"
        ]
      }
    },
    {
      "id": "family01.b.d2.surface.mid.fatigue.timeline.01",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "같은 각도는 이미 충분히 들었습니다. 12일 지연과 야간 공백은 인정했으니, 이제는 왜 제가 그걸 끝까지 축소했는지로 가셔야 합니다.",
      "behaviorHint": "짧고 건조하게 끊다가 마지막 문장에서만 속도를 늦춘다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "timeline",
      "actionFamily": "fatigue",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "fatigueLevels": [
          "wary",
          "high",
          "exhausted"
        ],
        "requiresFlags": [
          "d2.surface.delay_pressed"
        ]
      },
      "weight": 6,
      "priority": 23,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b.d2.fatigue.timeline",
      "coverageKey": "b.d2.surface.mid.fatigue.timeline",
      "variantTarget": 3,
      "setFlags": [
        "d2.fatigue_triggered"
      ],
      "tags": [
        "fatigue",
        "timeline"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.twelve_day_delay_ack"
        ],
        "forbidAtomIds": [
          "d2.gap_burden_confess"
        ]
      }
    },
    {
      "id": "family01.b.d2.surface.mid.fatigue.timeline.02",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "60만원, 12일, 야간 한 칸. 그 숫자는 이미 남아 있습니다. 같은 숫자를 반복하면 저는 더 짧게 부인하는 쪽으로만 밀립니다.",
      "behaviorHint": "손가락으로 숫자를 세고 마지막에 입술을 꾹 다문다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "timeline",
      "actionFamily": "fatigue",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "fatigueLevels": [
          "wary",
          "high",
          "exhausted"
        ],
        "requiresFlags": [
          "d2.surface.delay_pressed"
        ]
      },
      "weight": 6,
      "priority": 23,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b.d2.fatigue.timeline",
      "coverageKey": "b.d2.surface.mid.fatigue.timeline",
      "variantTarget": 3,
      "setFlags": [
        "d2.fatigue_triggered"
      ],
      "tags": [
        "fatigue",
        "timeline"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.twelve_day_delay_ack",
          "d2.one_shift_gap_ack"
        ],
        "forbidAtomIds": [
          "d2.gap_burden_confess"
        ]
      }
    },
    {
      "id": "family01.b.d2.surface.mid.fatigue.timeline.03",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "계속 같은 표의 같은 칸만 찌르시면, 누나가 하던 방식과 다를 게 없어집니다. 저는 그럴수록 기록 전체를 방패로 삼을 수밖에 없습니다.",
      "behaviorHint": "냉소가 스치듯 지나가고 어조가 더 차가워진다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "timeline",
      "actionFamily": "fatigue",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "fatigueLevels": [
          "wary",
          "high",
          "exhausted"
        ],
        "requiresFlags": [
          "d2.surface.delay_pressed"
        ]
      },
      "weight": 6,
      "priority": 23,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b.d2.fatigue.timeline",
      "coverageKey": "b.d2.surface.mid.fatigue.timeline",
      "variantTarget": 3,
      "setFlags": [
        "d2.fatigue_triggered"
      ],
      "tags": [
        "fatigue",
        "timeline"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.sister_gap_exaggeration"
        ],
        "forbidAtomIds": [
          "d2.gap_burden_confess"
        ]
      }
    },
    {
      "id": "family01.a.d5.surface.mid.fatigue.responsibility.01",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "재판관님, '누가 더 규칙을 어겼나'만 세 번째입니다. 저도 공유표 밖에서 움직인 건 인정했고, 도현도 늦은 기록이 있었다는 말도 이미 했습니다.",
      "behaviorHint": "지친 숨을 짧게 내쉬고 문장을 억지로 정리한다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "fatigueLevels": [
          "wary",
          "high",
          "exhausted"
        ],
        "requiresFlags": [
          "d5.mutual_breach_pressed"
        ]
      },
      "weight": 6,
      "priority": 23,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a.d5.fatigue.responsibility",
      "coverageKey": "a.d5.surface.mid.fatigue.responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d5.fatigue_triggered.a"
      ],
      "tags": [
        "fatigue",
        "responsibility"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d5a.mutual_breach_frame",
          "d5a.hidden_1800_ack"
        ],
        "forbidAtomIds": [
          "d5a.broke_first_and_bigger"
        ]
      }
    },
    {
      "id": "family01.a.d5.surface.mid.fatigue.responsibility.02",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "같은 책임 질문을 반복하면 저는 자꾸 배신자 역할만 방어하게 됩니다. 차라리 왜 제가 그 규칙 바깥으로 나갔는지를 물으셔야 다음 층이 열립니다.",
      "behaviorHint": "마지막 문장에서만 목소리가 가늘어진다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "fatigueLevels": [
          "wary",
          "high",
          "exhausted"
        ],
        "requiresFlags": [
          "d5.mutual_breach_pressed"
        ]
      },
      "weight": 6,
      "priority": 23,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a.d5.fatigue.responsibility",
      "coverageKey": "a.d5.surface.mid.fatigue.responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d5.fatigue_triggered.a"
      ],
      "tags": [
        "fatigue",
        "responsibility"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d5a.mutual_breach_frame"
        ],
        "forbidAtomIds": [
          "d5a.broke_first_and_bigger"
        ]
      }
    },
    {
      "id": "family01.a.d5.surface.mid.fatigue.responsibility.03",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "계속 같은 잣대만 들이밀면 도현은 깨끗한 쪽에 서고 저는 끝없이 설명만 하게 됩니다. 그 구조 자체가 이미 공평하지 않습니다.",
      "behaviorHint": "말끝을 세게 눌러 찍고 시선을 비껴 둔다.",
      "applicableStates": [
        "S3",
        "S4"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "fatigueLevels": [
          "wary",
          "high",
          "exhausted"
        ],
        "requiresFlags": [
          "d5.mutual_breach_pressed"
        ]
      },
      "weight": 6,
      "priority": 23,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a.d5.fatigue.responsibility",
      "coverageKey": "a.d5.surface.mid.fatigue.responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d5.fatigue_triggered.a"
      ],
      "tags": [
        "fatigue",
        "responsibility"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d5a.only_traitor_frame_reject"
        ],
        "forbidAtomIds": [
          "d5a.broke_first_and_bigger"
        ]
      }
    },
    {
      "id": "family01.b.d5.surface.mid.fatigue.responsibility.01",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "같은 책임 질문이 반복되면 저는 다시 규모 차이부터 말하게 됩니다. 제 늦은 기록이 있었다는 건 이미 인정했으니, 이제는 왜 제가 그걸 작게 말했는지를 보셔야 합니다.",
      "behaviorHint": "차갑게 말하다 마지막 문장에서만 한숨이 섞인다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "fatigueLevels": [
          "wary",
          "high",
          "exhausted"
        ],
        "requiresFlags": [
          "d5.weight_difference_pressed"
        ]
      },
      "weight": 6,
      "priority": 23,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b.d5.fatigue.responsibility",
      "coverageKey": "b.d5.surface.mid.fatigue.responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d5.fatigue_triggered.b"
      ],
      "tags": [
        "fatigue",
        "responsibility"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d5b.not_fully_compliant",
          "d5b.my_late_logs_ack"
        ],
        "forbidAtomIds": [
          "d5b.face_protection_confess"
        ]
      }
    },
    {
      "id": "family01.b.d5.surface.mid.fatigue.responsibility.02",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "저도 규칙 안쪽 사람만은 아니었다는 말은 했습니다. 계속 같은 각도로 밀리면 저는 또 숫자로만 제 잘못을 자르려 들 겁니다.",
      "behaviorHint": "건조한 문장 뒤에 짧은 자조가 스친다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "fatigueLevels": [
          "wary",
          "high",
          "exhausted"
        ],
        "requiresFlags": [
          "d5.weight_difference_pressed"
        ]
      },
      "weight": 6,
      "priority": 23,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b.d5.fatigue.responsibility",
      "coverageKey": "b.d5.surface.mid.fatigue.responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d5.fatigue_triggered.b"
      ],
      "tags": [
        "fatigue",
        "responsibility"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d5b.not_rule_inside_afterall"
        ],
        "forbidAtomIds": [
          "d5b.face_protection_confess"
        ]
      }
    },
    {
      "id": "family01.b.d5.surface.mid.fatigue.responsibility.03",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "같은 질문을 반복하면 누나 선이체와 제 늦은 기록을 또 한 줄로 평평하게 접게 됩니다. 그건 정리가 아니라 귀찮은 계산입니다.",
      "behaviorHint": "빈정거림이 얇게 깔리고 마지막 단어를 툭 던진다.",
      "applicableStates": [
        "S3",
        "S4"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "fatigueLevels": [
          "wary",
          "high",
          "exhausted"
        ],
        "requiresFlags": [
          "d5.weight_difference_pressed"
        ]
      },
      "weight": 6,
      "priority": 23,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b.d5.fatigue.responsibility",
      "coverageKey": "b.d5.surface.mid.fatigue.responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d5.fatigue_triggered.b"
      ],
      "tags": [
        "fatigue",
        "responsibility"
      ],
      "truthEnvelope": {
        "allowAtomIds": [
          "d5b.equalizing_weights_reject"
        ],
        "forbidAtomIds": [
          "d5b.face_protection_confess"
        ]
      }
    },
    {
      "id": "family01.a.d2.surface.mid.interjection.allow.01",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "잠깐만요, 60만원 12일만 남기면 제가 밤마다 병원 뛰고 어머니 챙긴 시간은 다 빠집니다. 그 표는 빈칸만 아니라 누가 메웠는지도 같이 보셔야 합니다.",
      "behaviorHint": "말을 끊어 세우듯 끼어들고 '누가 메웠는지'에서 손바닥을 편다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "context",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit",
        "evidence_present"
      ],
      "conditions": {
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a.d2.surface.mid.interjection.allow",
      "variantTarget": 2,
      "setFlags": [
        "interjection.allow.a"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane"
      ]
    },
    {
      "id": "family01.b.d3.surface.mid.interjection.allow.01",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "누나, 잘린 수첩 사진 한 장으로 상속 얘기까지 가실 겁니까. 전체 스캔부터 보게 해 주세요, 그 한 줄만 들고 가면 또 결론부터 납니다.",
      "behaviorHint": "차갑게 말을 끊고 '전체 스캔'에서 문서를 들어 보이듯 턱을 든다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "red_herring",
      "responseIntent": "pressure_response",
      "angleTag": "context",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit",
        "evidence_present"
      ],
      "conditions": {
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b.d3.surface.mid.interjection.allow",
      "variantTarget": 2,
      "setFlags": [
        "interjection.allow.b"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "red_herring"
      ],
      "beliefMode": "suspects"
    },
    {
      "id": "family01.a.d1.surface.mid.interjection.block.01",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "좋습니다, 지금은 끼어들지 않겠습니다. 다만 1,800만원 숫자만 남기고 그때 제가 메우던 자리를 지워 버리진 말아 주십시오.",
      "behaviorHint": "억지로 한발 물러서며 마지막 문장에서만 시선을 든다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit",
        "evidence_present"
      ],
      "conditions": {
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a.d1.surface.mid.interjection.block",
      "variantTarget": 2,
      "setFlags": [
        "interjection.block.a"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane"
      ]
    },
    {
      "id": "family01.b.d5.surface.mid.interjection.block.01",
      "caseId": "family-01",
      "schemaVersion": "beat_v2",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "알겠습니다. 지금은 제 차례가 아니면 닫겠습니다. 그래도 늦은 기록과 1,800만원 선이체를 같은 무게로 접진 말아 주십시오.",
      "behaviorHint": "입술을 굳게 다문 채 물러나고 마지막만 작게 덧붙인다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit",
        "motive_search"
      ],
      "conditions": {
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b.d5.surface.mid.interjection.block",
      "variantTarget": 2,
      "setFlags": [
        "interjection.block.b"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane"
      ]
    }
  ]
} as const
