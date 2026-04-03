export const spouse01BeatsV2Full = {
  "caseId": "spouse-01",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 57,
    "byActionFamily": {
      "question": 20,
      "evidence": 5,
      "free_question": 5,
      "fatigue": 15,
      "interjection": 12
    },
    "byParty": {
      "a": 35,
      "b": 22
    },
    "byIssueRole": {
      "core_truth": 20,
      "sub_truth": 22,
      "shared_misconception": 15
    },
    "beatsPerDispute": {
      "d-1": 11,
      "d-2": 11,
      "d-3": 15,
      "d-4": 11,
      "d-5": 9
    },
    "fatiguePerDispute": {
      "d-1": 3,
      "d-2": 3,
      "d-3": 3,
      "d-4": 3,
      "d-5": 3
    },
    "interjectionInfoLevels": {
      "emotional_only": 4,
      "detail_rebuttal": 4,
      "misbelief_escalation": 4
    }
  },
  "beats": [
    {
      "id": "spouse01:beat_v2:a:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "9월 20일 기준으로 2,800,000원이 움직인 사실만으로 그 돈을 부정한 관계 자금처럼 몰아갈 수는 없습니다. 받는 사람 이름 하나가 낯설다고 해서 제가 가정을 등진 데 돈을 썼다고 단정하는 건 순서가 아닙니다. 제가 바로 용도를 다 말하지 못했다고 해도, 그 송금 자체가 잘못된 곳으로 간 건 아닙니다.",
      "behaviorHint": "불편한 질문이 올수록 숫자가 정밀해진다.",
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
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.movement_only",
          "d1.illicit_intent_denial",
          "d1.purpose_withhold"
        ],
        "forbidAtomIds": [
          "d1.breach_full_confess",
          "d1.care_reservation_confess"
        ]
      },
      "weight": 6,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:timeline",
      "coverageKey": "a:d-1:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse01:beat_v2:a:d-1:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "공동계좌에서 2,800,000원을 보낸 건 제가 맞습니다. 다만 그 돈의 용도에는 설명 순서가 있고, 이름만 보고 외도 자금처럼 말하는 건 과합니다. 미리 상의하지 못한 건 제 잘못이지만, 그 돈이 부정한 데 쓰인 건 아닙니다.",
      "behaviorHint": "불편한 질문이 올수록 숫자가 정밀해진다.",
      "applicableStates": [
        "S1"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "identity",
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
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.recipient_name_overread",
          "d1.prior_consult_missed",
          "d1.purpose_withhold"
        ],
        "forbidAtomIds": [
          "d1.breach_full_confess",
          "d1.care_reservation_confess"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:identity",
      "coverageKey": "a:d-1:surface:early:pressure:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse01:beat_v2:a:d-1:surface:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "그 송금은 제가 한 게 맞고, 다른 여자에게 생활비를 빼돌린 돈도 아닙니다. 가족 쪽 급한 일 때문에 먼저 움직인 돈이었는데, 제가 설명을 늦췄습니다. 약속을 어긴 책임은 인정하지만, 상대를 속여 딴 데 쓴 돈처럼 보시는 건 다릅니다.",
      "behaviorHint": "의도를 추궁당하면 답 대신 되묻는다.",
      "applicableStates": [
        "S2"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "evidence_response",
      "angleTag": "identity",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.professional_link_generic",
          "d1.unlock.s2.recipient_is_center_side",
          "d1.family_need_generic"
        ],
        "forbidAtomIds": [
          "d1.breach_full_confess",
          "d1.care_reservation_confess"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:evidence:identity",
      "coverageKey": "a:d-1:surface:mid:evidence:identity",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:evidence_shown"
      ],
      "tags": [
        "cold"
      ]
    },
    {
      "id": "spouse01:beat_v2:a:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "counter",
      "line": "왜 2,800,000원 숫자만 붙들고 계십니까. 그 전에 왜 제 폰을 열어보고, 왜 바로 외도부터 단정했는지도 같이 보셔야 합니다. 가족 문제를 혼자 막으려다 설명이 늦어진 건데, 저만 계획적으로 속인 사람처럼 세우면 저도 방어적으로 될 수밖에 없습니다. 송금 경위는 설명하겠습니다만, 그걸 외도 프레임으로 밀어붙인 쪽 책임도 분명히 있습니다.",
      "behaviorHint": "의도를 추궁당하면 답 대신 되묻는다.",
      "applicableStates": [
        "S3"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "responsibility",
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
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.unlock.s3.suspicion_hardened_silence",
          "d1.partner_suspicion_counter",
          "d1.transfer_ack"
        ],
        "forbidAtomIds": [
          "d1.breach_full_confess",
          "d1.care_reservation_confess"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:pressure:responsibility",
      "coverageKey": "a:d-1:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-1:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-1:surface:evidence_shown"
      ]
    },
    {
      "id": "spouse01:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "emotion",
      "line": "솔직히 말씀드리면, 처가 살림도 제대로 못 챙기는 사람처럼 보일까 봐 그 말을 못 꺼냈습니다. 돈은 다른 여자에게 간 게 아니라 가족 쪽 급한 일로 쓴 겁니다. 숨긴 건 잘못이지만, 적어도 가정을 배반하는 데 쓴 돈은 아니었습니다.",
      "behaviorHint": "본론에 다가갈수록 업무 동선을 길게 늘어놓는다.",
      "applicableStates": [
        "S4"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "question",
      "questionTypes": [
        "empathy_approach"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.provider_shame",
          "d1.unlock.s4.investment_failure_echo",
          "d1.unlock.s4.handle_inlaw_alone"
        ],
        "forbidAtomIds": [
          "d1.breach_full_confess",
          "d1.care_reservation_confess"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-1:core:emotion_named"
      ],
      "tags": [
        "cold"
      ],
      "requiresFlags": [
        "d-1:motive:responsibility_named"
      ]
    },
    {
      "id": "spouse01:beat_v2:a:d-1:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confess",
      "line": "그 2,800,000원은 최민정 상담팀장을 통해 잡은 추석 연휴 간병 예약금이었습니다. 대상자는 장모님 오미숙 씨였고, 제가 미리 상의하지 않은 건 명백한 약속 위반입니다. 외도가 아니라는 점과, 제가 자존심 때문에 숨겼다는 점까지 인정하겠습니다.",
      "behaviorHint": "본론에 다가갈수록 업무 동선을 길게 늘어놓는다.",
      "applicableStates": [
        "S5"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "free_question",
      "questionTypes": [
        "empathy_approach"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.provider_shame",
          "d1.breach_full_confess",
          "d1.care_reservation_confess"
        ],
        "forbidAtomIds": [
          "d1.breach_full_confess",
          "d1.care_reservation_confess"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:emotion_named"
      ],
      "tags": [
        "cold"
      ],
      "requiresFlags": [
        "d-1:core:emotion_named"
      ]
    },
    {
      "id": "spouse01:beat_v2:a:d-1:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "fatigue_irritation",
      "line": "같은 280만원 얘기만 반복하시면 저도 답이 거칠어집니다. 방금 말한 비밀 송금부터 정리해 주세요.",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "timeline",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.transfer_ack",
          "d1.family_need_generic",
          "d1.illicit_intent_denial"
        ],
        "forbidAtomIds": [
          "d1.breach_full_confess",
          "d1.care_reservation_confess"
        ]
      },
      "weight": 3,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:timeline",
      "coverageKey": "a:d-1:motive:mid:fatigue:timeline",
      "variantTarget": 1,
      "setFlags": [
        "d-1:motive:fatigue_warned"
      ],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "spouse01:beat_v2:a:d-1:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "fatigue_block",
      "line": "280만원를 세 번째 같은 톤으로 묻는 건 답을 짜내는 방식처럼 들립니다. 지금은 더는 같은 방식으로 답하지 않겠습니다.",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "S3",
        "S4"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.unlock.s3.suspicion_hardened_silence",
          "d1.partner_suspicion_counter",
          "d1.transfer_ack"
        ],
        "forbidAtomIds": [
          "d1.breach_full_confess",
          "d1.care_reservation_confess"
        ]
      },
      "weight": 3,
      "priority": 16,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:responsibility",
      "coverageKey": "a:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-1:motive:fatigue_blocked"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-1:motive:fatigue_warned"
      ]
    },
    {
      "id": "spouse01:beat_v2:a:d-1:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "fatigue_counter",
      "line": "계속 이렇게 몰아붙이면 저도 되묻고 싶습니다. 왜 비밀 송금 맥락은 빼고 280만원만 확대하십니까?",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.prior_consult_missed",
          "d1.transfer_ack",
          "d1.unlock.s4.investment_failure_echo"
        ],
        "forbidAtomIds": [
          "d1.breach_full_confess",
          "d1.care_reservation_confess"
        ]
      },
      "weight": 3,
      "priority": 14,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:responsibility",
      "coverageKey": "a:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-1:motive:fatigue_countered"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-1:motive:fatigue_blocked"
      ]
    },
    {
      "id": "spouse01:beat_v2:b:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "제가 폰을 본 건 결과적으로 확인하려던 행동이었습니다. 먼저 저를 그 지경까지 몰아넣은 정황을 빼고 그 장면만 떼어 말하면 안 됩니다. 숨긴 사람이 따로 있는데 저만 선 넘은 사람으로 남을 수는 없어요.",
      "behaviorHint": "증거 한 장이면 충분하다는 듯 캡처를 흔들며 '이게 다예요, 이게 전부입니다'라고 단정 짓는다.",
      "applicableStates": [
        "S0"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "context",
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
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.trigger_transfer_message",
          "d2.cause_first",
          "d2.confirmation_need"
        ],
        "forbidAtomIds": [
          "d2.privacy_line_confess",
          "d2.third_party_share_confess"
        ]
      },
      "weight": 6,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:context",
      "coverageKey": "b:d-2:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse01:beat_v2:b:d-2:surface:pressure:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "새벽에 폰을 본 건 잘못일 수 있습니다. 하지만 280만원 송금과 그 메시지를 보고도 아무것도 묻지 말라는 건 더 말이 안 됩니다. 저는 이유 없는 의심을 한 게 아닙니다.",
      "behaviorHint": "증거 한 장이면 충분하다는 듯 캡처를 흔들며 '이게 다예요, 이게 전부입니다'라고 단정 짓는다.",
      "applicableStates": [
        "S1"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "legality",
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
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.phone_access_ack",
          "d2.action_wrong_but_triggered",
          "d2.no_reasonless_suspicion"
        ],
        "forbidAtomIds": [
          "d2.privacy_line_confess",
          "d2.third_party_share_confess"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:legality",
      "coverageKey": "b:d-2:surface:early:pressure:legality",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:legality_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse01:beat_v2:b:d-2:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "네, 제가 제 남편 폰을 열어본 건 사실입니다. 다만 그때 저는 이미 숨겨진 송금과 이상한 메시지를 본 상태였고, 확인이 필요하다고 생각했습니다. 행동은 잘못이지만 불안의 원인까지 지워지진 않습니다.",
      "behaviorHint": "행동 하나에서 의도를 곧바로 단정짓는다.",
      "applicableStates": [
        "S2"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "evidence_response",
      "angleTag": "legality",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.phone_access_ack",
          "d2.unlock.s2.captured_before_asking",
          "d2.unlock.s2.checked_while_he_slept"
        ],
        "forbidAtomIds": [
          "d2.privacy_line_confess",
          "d2.third_party_share_confess"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:evidence:legality",
      "coverageKey": "b:d-2:surface:mid:evidence:legality",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:evidence_shown"
      ],
      "tags": [
        "cold"
      ]
    },
    {
      "id": "spouse01:beat_v2:b:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "counter",
      "line": "왜 저한테만 '왜 폰 봤냐'고 세 번, 네 번 묻습니까. 그전에 왜 그렇게 보이게 만들었는지는 안 묻고요? 제가 한 행동을 가볍게 보자는 게 아니라, 원인을 잘라내고 저만 몰아세우지 말라는 겁니다.",
      "behaviorHint": "행동 하나에서 의도를 곧바로 단정짓는다.",
      "applicableStates": [
        "S3"
      ],
      "layer": "motive",
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.action_wrong_but_triggered",
          "d2.only_me_counter",
          "d2.phone_access_ack"
        ],
        "forbidAtomIds": [
          "d2.privacy_line_confess",
          "d2.third_party_share_confess"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:pressure:responsibility",
      "coverageKey": "b:d-2:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-2:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-2:surface:evidence_shown"
      ]
    },
    {
      "id": "spouse01:beat_v2:b:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "emotion",
      "line": "새벽 두 시에 남편 폰을 여는 아내가 되고 싶었던 사람은 없습니다. 그런데도 제가 그렇게 한 건, 또 속고 있는 건 아닐까 하는 두려움이 너무 컸기 때문입니다. 그래도 그 방식이 선을 넘었다는 건 인정합니다.",
      "behaviorHint": "상대의 긴 해명에서 가장 불리한 세 단어만 골라 반복한다.",
      "applicableStates": [
        "S4"
      ],
      "layer": "core",
      "issueRole": "sub_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "question",
      "questionTypes": [
        "empathy_approach"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.fool_wife_fear",
          "d2.unlock.s4.inlaw_table_fear",
          "d2.unlock.s4.anger_masked_shame"
        ],
        "forbidAtomIds": [
          "d2.privacy_line_confess",
          "d2.third_party_share_confess"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:core:rapport:emotion",
      "coverageKey": "b:d-2:core:late:rapport:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-2:core:emotion_named"
      ],
      "tags": [
        "cold"
      ],
      "requiresFlags": [
        "d-2:motive:responsibility_named"
      ]
    },
    {
      "id": "spouse01:beat_v2:b:d-2:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confess",
      "line": "제가 새벽에 지석 씨 폰을 무단으로 열어본 건 명백히 잘못이었습니다. 그 잘린 캡처를 제3자에게 보내 외도냐고 확인받으려 한 것도 선을 넘었습니다. 숨긴 정황이 있었다고 해도, 확인보다 침해가 먼저 간 제 책임을 인정합니다.",
      "behaviorHint": "상대의 긴 해명에서 가장 불리한 세 단어만 골라 반복한다.",
      "applicableStates": [
        "S5"
      ],
      "layer": "core",
      "issueRole": "sub_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "free_question",
      "questionTypes": [
        "empathy_approach"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.fool_wife_fear",
          "d2.unlock.s5.wanted_confirmation_not_truth",
          "d2.cropped_capture_ignore"
        ],
        "forbidAtomIds": [
          "d2.privacy_line_confess",
          "d2.third_party_share_confess"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:core:rapport:emotion",
      "coverageKey": "b:d-2:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-2:core:emotion_named"
      ],
      "tags": [
        "cold"
      ],
      "requiresFlags": [
        "d-2:core:emotion_named"
      ]
    },
    {
      "id": "spouse01:beat_v2:b:d-2:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "fatigue_irritation",
      "line": "같은 새벽 2시 얘기만 반복하시면 저도 답이 거칠어집니다. 방금 말한 휴대폰 열람부터 정리해 주세요.",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "sub_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "timeline",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.phone_access_ack",
          "d2.action_wrong_but_triggered",
          "d2.only_me_counter"
        ],
        "forbidAtomIds": [
          "d2.privacy_line_confess",
          "d2.third_party_share_confess"
        ]
      },
      "weight": 3,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:fatigue:timeline",
      "coverageKey": "b:d-2:motive:mid:fatigue:timeline",
      "variantTarget": 1,
      "setFlags": [
        "d-2:motive:fatigue_warned"
      ],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "spouse01:beat_v2:b:d-2:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "fatigue_block",
      "line": "새벽 2시를 세 번째 같은 톤으로 묻는 건 답을 짜내는 방식처럼 들립니다. 지금은 더는 같은 방식으로 답하지 않겠습니다.",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "S3",
        "S4"
      ],
      "layer": "motive",
      "issueRole": "sub_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.action_wrong_but_triggered",
          "d2.only_me_counter",
          "d2.phone_access_ack"
        ],
        "forbidAtomIds": [
          "d2.privacy_line_confess",
          "d2.third_party_share_confess"
        ]
      },
      "weight": 3,
      "priority": 16,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:fatigue:responsibility",
      "coverageKey": "b:d-2:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-2:motive:fatigue_blocked"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-2:motive:fatigue_warned"
      ]
    },
    {
      "id": "spouse01:beat_v2:b:d-2:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "fatigue_counter",
      "line": "계속 이렇게 몰아붙이면 저도 되묻고 싶습니다. 왜 휴대폰 열람 맥락은 빼고 새벽 2시만 확대하십니까?",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "motive",
      "issueRole": "sub_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.action_wrong_but_triggered",
          "d2.unlock.s4.anger_masked_shame",
          "d2.phone_access_ack"
        ],
        "forbidAtomIds": [
          "d2.privacy_line_confess",
          "d2.third_party_share_confess"
        ]
      },
      "weight": 3,
      "priority": 14,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:fatigue:responsibility",
      "coverageKey": "b:d-2:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-2:motive:fatigue_countered"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-2:motive:fatigue_blocked"
      ]
    },
    {
      "id": "spouse01:beat_v2:a:d-3:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "9시 12분 메시지 하나와 골목 이미지로 외도를 단정하는 건 너무 빠릅니다. 그 문장은 사적인 만남을 뜻하는 표현이 아니었습니다. 최민정 씨를 그저 '낯선 여자'로 부르며 결론부터 내리면 사실이 틀어집니다.",
      "behaviorHint": "불편한 질문이 올수록 숫자가 정밀해진다.",
      "applicableStates": [
        "M0"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "identity",
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
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.affair_denial",
          "d3.cropped_chat_context_missing",
          "d3.explanation_order_withhold"
        ],
        "forbidAtomIds": [
          "d3.care_context_full",
          "d3.contact_ack"
        ]
      },
      "weight": 6,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:pressure:identity",
      "coverageKey": "a:d-3:surface:early:pressure:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-3:surface:identity_pressed"
      ],
      "tags": [
        "hot",
        "red_herring"
      ]
    },
    {
      "id": "spouse01:beat_v2:a:d-3:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "메시지가 오간 사실은 맞지만 외도는 아닙니다. 그 만남에는 설명 순서가 있고, 캡처 한 장으로는 맥락이 전혀 보이지 않습니다. 제가 바로 말 못 한 건 별개로, 관계 자체를 의심받을 내용은 아닙니다.",
      "behaviorHint": "불편한 질문이 올수록 숫자가 정밀해진다.",
      "applicableStates": [
        "M1"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
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
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.cropped_chat_context_missing",
          "d3.affair_denial",
          "d3.contact_ack"
        ],
        "forbidAtomIds": [
          "d3.care_context_full",
          "d3.contact_ack"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:pressure:context",
      "coverageKey": "a:d-3:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-3:surface:context_pressed"
      ],
      "tags": [
        "hot",
        "red_herring"
      ]
    },
    {
      "id": "spouse01:beat_v2:a:d-3:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "사적으로 숨어 만난 게 아니라 가족 일 때문에 조용한 장소를 잡은 겁니다. 최민정 씨는 제가 바람난 상대가 아니라 업무로 연결된 사람입니다. 다만 제가 그 설명을 늦게 한 탓에 오해가 커졌습니다.",
      "behaviorHint": "의도를 추궁당하면 답 대신 되묻는다.",
      "applicableStates": [
        "M2",
        "M3"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "evidence_response",
      "angleTag": "context",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.unlock.s2.alley_misread_layout",
          "d3.unlock.s2.consult_not_date",
          "d3.work_contact_generic"
        ],
        "forbidAtomIds": [
          "d3.care_context_full",
          "d3.contact_ack"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:evidence:context",
      "coverageKey": "a:d-3:surface:mid:evidence:context",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:evidence_shown"
      ],
      "tags": [
        "cold",
        "red_herring"
      ]
    },
    {
      "id": "spouse01:beat_v2:a:d-3:motive:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "counter",
      "line": "왜 계속 외도라는 단어부터 붙이십니까. 캡처를 잘라놓고 골목만 보고 그렇게 몰아가면 누구라도 왜곡됩니다. 그날 동선과 장소를 다 들으면 이야기가 달라집니다. 저를 숨은 남자로 만들기 전에, 그 자료가 얼마나 불완전한지부터 봐주셔야 합니다.",
      "behaviorHint": "의도를 추궁당하면 답 대신 되묻는다.",
      "applicableStates": [
        "M3"
      ],
      "layer": "motive",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
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
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.evidence_incomplete_counter",
          "d3.work_contact_generic",
          "d3.family_reason_generic"
        ],
        "forbidAtomIds": [
          "d3.care_context_full",
          "d3.contact_ack"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:pressure:context",
      "coverageKey": "a:d-3:motive:mid:pressure:context",
      "variantTarget": 4,
      "setFlags": [
        "d-3:motive:context_named"
      ],
      "tags": [
        "mid",
        "red_herring"
      ],
      "requiresFlags": [
        "d-3:surface:evidence_shown"
      ]
    },
    {
      "id": "spouse01:beat_v2:a:d-3:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "emotion",
      "line": "사실 제일 숨기고 싶었던 건 여자가 아니라 장모님 간병 얘기를 제가 혼자 떠안으려 했다는 점이었습니다. 그래서 '조용한 데서 보자' 같은 말도 굳이 풀어 설명하지 못했습니다. 외도는 아니지만, 오해를 부를 방식으로 숨긴 건 제 잘못입니다.",
      "behaviorHint": "본론에 다가갈수록 업무 동선을 길게 늘어놓는다.",
      "applicableStates": [
        "M4"
      ],
      "layer": "core",
      "issueRole": "shared_misconception",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "question",
      "questionTypes": [
        "empathy_approach"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.motherinlaw_shame",
          "d3.unlock.s4.health_topic_shame",
          "d3.unlock.s4.pity_from_wife_fear"
        ],
        "forbidAtomIds": [
          "d3.care_context_full",
          "d3.contact_ack"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:rapport:emotion",
      "coverageKey": "a:d-3:core:late:rapport:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-3:core:emotion_named"
      ],
      "tags": [
        "cold",
        "red_herring"
      ],
      "requiresFlags": [
        "d-3:motive:context_named"
      ]
    },
    {
      "id": "spouse01:beat_v2:a:d-3:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confess",
      "line": "최민정 씨는 재가돌봄센터 상담팀장입니다. 그날 밤 만남은 추석 연휴 장모님 간병 일정을 상담동 후문에서 잡은 것이고, 외도는 아니었습니다. 제가 자존심 때문에 그 맥락을 숨겨 외도처럼 보이게 만든 책임은 인정합니다.",
      "behaviorHint": "본론에 다가갈수록 업무 동선을 길게 늘어놓는다.",
      "applicableStates": [
        "M4"
      ],
      "layer": "core",
      "issueRole": "shared_misconception",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "free_question",
      "questionTypes": [
        "empathy_approach"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.delay_fault_ack",
          "d3.care_context_full",
          "d3.contact_ack"
        ],
        "forbidAtomIds": [
          "d3.care_context_full",
          "d3.contact_ack"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:rapport:emotion",
      "coverageKey": "a:d-3:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-3:core:emotion_named"
      ],
      "tags": [
        "cold",
        "red_herring"
      ],
      "requiresFlags": [
        "d-3:core:emotion_named"
      ]
    },
    {
      "id": "spouse01:beat_v2:a:d-3:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "fatigue_irritation",
      "line": "같은 최민정 얘기만 반복하시면 저도 답이 거칠어집니다. 방금 말한 외도 상대부터 정리해 주세요.",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "M1",
        "M2"
      ],
      "layer": "motive",
      "issueRole": "shared_misconception",
      "responseIntent": "fatigue_response",
      "angleTag": "timeline",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.contact_ack",
          "d3.work_contact_generic",
          "d3.evidence_incomplete_counter"
        ],
        "forbidAtomIds": [
          "d3.care_context_full",
          "d3.contact_ack"
        ]
      },
      "weight": 3,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:fatigue:timeline",
      "coverageKey": "a:d-3:motive:mid:fatigue:timeline",
      "variantTarget": 1,
      "setFlags": [
        "d-3:motive:fatigue_warned"
      ],
      "tags": [
        "fatigue",
        "red_herring"
      ]
    },
    {
      "id": "spouse01:beat_v2:a:d-3:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "fatigue_block",
      "line": "최민정를 세 번째 같은 톤으로 묻는 건 답을 짜내는 방식처럼 들립니다. 지금은 더는 같은 방식으로 답하지 않겠습니다.",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "M2",
        "M3"
      ],
      "layer": "motive",
      "issueRole": "shared_misconception",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.suspicion_frame_counter",
          "d3.unlock.s3.let_crop_mislead",
          "d3.contact_ack"
        ],
        "forbidAtomIds": [
          "d3.care_context_full",
          "d3.contact_ack"
        ]
      },
      "weight": 3,
      "priority": 16,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:fatigue:responsibility",
      "coverageKey": "a:d-3:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-3:motive:fatigue_blocked"
      ],
      "tags": [
        "fatigue",
        "red_herring"
      ],
      "requiresFlags": [
        "d-3:motive:fatigue_warned"
      ]
    },
    {
      "id": "spouse01:beat_v2:a:d-3:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "fatigue_counter",
      "line": "계속 이렇게 몰아붙이면 저도 되묻고 싶습니다. 왜 외도 상대 맥락은 빼고 최민정만 확대하십니까?",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "M3",
        "M4"
      ],
      "layer": "motive",
      "issueRole": "shared_misconception",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.delay_fault_ack",
          "d3.affair_denial",
          "d3.family_reason_generic"
        ],
        "forbidAtomIds": [
          "d3.care_context_full",
          "d3.contact_ack"
        ]
      },
      "weight": 3,
      "priority": 14,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:fatigue:responsibility",
      "coverageKey": "a:d-3:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-3:motive:fatigue_countered"
      ],
      "tags": [
        "fatigue",
        "red_herring"
      ],
      "requiresFlags": [
        "d-3:motive:fatigue_blocked"
      ]
    },
    {
      "id": "spouse01:beat_v2:b:d-4:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "제 150만원은 급해서 다른 계좌를 거친 겁니다. 그걸 무슨 음흉한 우회 송금처럼 부풀리는 건 과합니다. 가족 일 때문에 급히 막아야 할 돈이었지, 숨겨서 즐기려던 돈이 아니었어요.",
      "behaviorHint": "증거 한 장이면 충분하다는 듯 캡처를 흔들며 '이게 다예요, 이게 전부입니다'라고 단정 짓는다.",
      "applicableStates": [
        "S0"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
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
      "truthEnvelope": {
        "allowAtomIds": [
          "d4.route_temporary_frame",
          "d4.family_emergency_frame",
          "d4.not_pleasure_money"
        ],
        "forbidAtomIds": [
          "d4.amount_move_ack",
          "d4.friend_route_full"
        ]
      },
      "weight": 6,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:surface:pressure:timeline",
      "coverageKey": "b:d-4:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-4:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse01:beat_v2:b:d-4:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "150만원이 움직인 건 맞습니다. 다만 저는 급한 가족 문제를 막으려고 임시로 다른 계좌를 쓴 겁니다. 그걸 지석 씨 280만원 비밀 송금과 똑같이 볼 수는 없습니다.",
      "behaviorHint": "증거 한 장이면 충분하다는 듯 캡처를 흔들며 '이게 다예요, 이게 전부입니다'라고 단정 짓는다.",
      "applicableStates": [
        "S1"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "context",
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
      "truthEnvelope": {
        "allowAtomIds": [
          "d4.route_temporary_frame",
          "d4.not_pleasure_money",
          "d4.amount_move_ack"
        ],
        "forbidAtomIds": [
          "d4.amount_move_ack",
          "d4.friend_route_full"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:surface:pressure:context",
      "coverageKey": "b:d-4:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-4:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse01:beat_v2:b:d-4:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "네, 제가 150만원을 바로 보내지 않고 다른 계좌를 거치게 한 건 사실입니다. 동생 문제라 급했고, 남편한테는 추석 지나고 말하려고 했습니다. 사정은 있었지만 숨긴 방식까지 깨끗했다고 말하진 않겠습니다.",
      "behaviorHint": "행동 하나에서 의도를 곧바로 단정짓는다.",
      "applicableStates": [
        "S2"
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d4.intermediary_ack",
          "d4.unlock.s2.eviction_notice_pressure",
          "d4.family_need_generic"
        ],
        "forbidAtomIds": [
          "d4.amount_move_ack",
          "d4.friend_route_full"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:surface:evidence:context",
      "coverageKey": "b:d-4:surface:mid:evidence:context",
      "variantTarget": 2,
      "setFlags": [
        "d-4:surface:evidence_shown"
      ],
      "tags": [
        "cold"
      ]
    },
    {
      "id": "spouse01:beat_v2:b:d-4:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "counter",
      "line": "제 150만원만 붙들고 계시는데, 자기는 280만원을 이름도 말 안 하고 보낸 사람이잖아요. 저는 적어도 가족 문제를 막으려 한 거지, 바깥으로 돈을 숨긴 게 아닙니다. 제 방식이 잘못이었다고 해도, 지석 씨가 먼저 신뢰를 무너뜨린 건 변하지 않아요.",
      "behaviorHint": "행동 하나에서 의도를 곧바로 단정짓는다.",
      "applicableStates": [
        "S3"
      ],
      "layer": "motive",
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d4.method_not_clean_ack",
          "d4.unlock.s3.equalization_anger",
          "d4.you_started_breach"
        ],
        "forbidAtomIds": [
          "d4.amount_move_ack",
          "d4.friend_route_full"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:motive:pressure:responsibility",
      "coverageKey": "b:d-4:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-4:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-4:surface:evidence_shown"
      ]
    },
    {
      "id": "spouse01:beat_v2:b:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "emotion",
      "line": "동생 월세가 터진 상황에서 또 남편에게 돈 얘기를 꺼내는 게 너무 숨 막혔습니다. 그래서 친구 계좌까지 끌어다 쓰는 비겁한 방법을 택했습니다. 가족을 막으려던 마음이 있었다고 해도, 그 방식이 떳떳하지 않았다는 건 압니다.",
      "behaviorHint": "상대의 긴 해명에서 가장 불리한 세 단어만 골라 반복한다.",
      "applicableStates": [
        "S4"
      ],
      "layer": "core",
      "issueRole": "sub_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "question",
      "questionTypes": [
        "empathy_approach"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d4.money_talk_choke",
          "d4.unlock.s4.sibling_money_shame",
          "d4.family_need_generic"
        ],
        "forbidAtomIds": [
          "d4.amount_move_ack",
          "d4.friend_route_full"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:core:rapport:emotion",
      "coverageKey": "b:d-4:core:late:rapport:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-4:core:emotion_named"
      ],
      "tags": [
        "cold"
      ],
      "requiresFlags": [
        "d-4:motive:responsibility_named"
      ]
    },
    {
      "id": "spouse01:beat_v2:b:d-4:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confess",
      "line": "제가 정우성 계좌를 거쳐 150만원을 동생 월세 쪽으로 보낸 건 사실입니다. 추석 지나고 말하겠다고 하며 남편에게 숨긴 것도 맞습니다. 급한 가족 일이었다는 사정은 있어도, 우회 송금이라는 방식 자체는 제 책임으로 인정합니다.",
      "behaviorHint": "상대의 긴 해명에서 가장 불리한 세 단어만 골라 반복한다.",
      "applicableStates": [
        "S5"
      ],
      "layer": "core",
      "issueRole": "sub_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "free_question",
      "questionTypes": [
        "empathy_approach"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d4.method_not_clean_ack",
          "d4.sibling_rent_full",
          "d4.unlock.s5.three_month_rent_full"
        ],
        "forbidAtomIds": [
          "d4.amount_move_ack",
          "d4.friend_route_full"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:core:rapport:emotion",
      "coverageKey": "b:d-4:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-4:core:emotion_named"
      ],
      "tags": [
        "cold"
      ],
      "requiresFlags": [
        "d-4:core:emotion_named"
      ]
    },
    {
      "id": "spouse01:beat_v2:b:d-4:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "fatigue_irritation",
      "line": "같은 150만원 얘기만 반복하시면 저도 답이 거칠어집니다. 방금 말한 정우성부터 정리해 주세요.",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "sub_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "timeline",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d4.amount_move_ack",
          "d4.family_need_generic",
          "d4.method_not_clean_ack"
        ],
        "forbidAtomIds": [
          "d4.amount_move_ack",
          "d4.friend_route_full"
        ]
      },
      "weight": 3,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:motive:fatigue:timeline",
      "coverageKey": "b:d-4:motive:mid:fatigue:timeline",
      "variantTarget": 1,
      "setFlags": [
        "d-4:motive:fatigue_warned"
      ],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "spouse01:beat_v2:b:d-4:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "fatigue_block",
      "line": "150만원를 세 번째 같은 톤으로 묻는 건 답을 짜내는 방식처럼 들립니다. 지금은 더는 같은 방식으로 답하지 않겠습니다.",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "S3",
        "S4"
      ],
      "layer": "motive",
      "issueRole": "sub_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d4.method_not_clean_ack",
          "d4.unlock.s3.equalization_anger",
          "d4.you_started_breach"
        ],
        "forbidAtomIds": [
          "d4.amount_move_ack",
          "d4.friend_route_full"
        ]
      },
      "weight": 3,
      "priority": 16,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:motive:fatigue:responsibility",
      "coverageKey": "b:d-4:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-4:motive:fatigue_blocked"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-4:motive:fatigue_warned"
      ]
    },
    {
      "id": "spouse01:beat_v2:b:d-4:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "fatigue_counter",
      "line": "계속 이렇게 몰아붙이면 저도 되묻고 싶습니다. 왜 정우성 맥락은 빼고 150만원만 확대하십니까?",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "motive",
      "issueRole": "sub_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d4.method_not_clean_ack",
          "d4.unlock.s4.used_friend_to_hide",
          "d4.amount_move_ack"
        ],
        "forbidAtomIds": [
          "d4.amount_move_ack",
          "d4.friend_route_full"
        ]
      },
      "weight": 3,
      "priority": 14,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:motive:fatigue:responsibility",
      "coverageKey": "b:d-4:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-4:motive:fatigue_countered"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-4:motive:fatigue_blocked"
      ]
    },
    {
      "id": "spouse01:beat_v2:a:d-5:surface:pressure:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "100만원 넘는 돈은 미리 말하자는 약속이 있었던 건 맞습니다. 다만 이번 일을 숫자 하나로만 묶으면 각 지출의 성격이 가려집니다. 제 쪽 지출이 가정 밖으로 새는 돈은 아니었다는 점은 구분해 주셔야 합니다.",
      "behaviorHint": "불편한 질문이 올수록 숫자가 정밀해진다.",
      "applicableStates": [
        "S0"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "legality",
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
      "truthEnvelope": {
        "allowAtomIds": [
          "d5a.intent_rule_split",
          "d5a.rule_exists",
          "d5a.self_breach_withhold"
        ],
        "forbidAtomIds": [
          "d5a.rule_exists",
          "d5a.first_breach_ack"
        ]
      },
      "weight": 6,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:pressure:legality",
      "coverageKey": "a:d-5:surface:early:pressure:legality",
      "variantTarget": 6,
      "setFlags": [
        "d-5:surface:legality_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse01:beat_v2:a:d-5:surface:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "100만원 넘는 돈은 미리 말하자는 약속이 있었고, 제가 그 선을 넘긴 건 사실입니다. 다만 그 약속을 제가 혼자만 깬 것처럼 말하면 틀립니다. 규칙 위반과 돈의 목적은 구분해서 봐야 합니다.",
      "behaviorHint": "불편한 질문이 올수록 숫자가 정밀해진다.",
      "applicableStates": [
        "S1"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "responsibility",
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
      "truthEnvelope": {
        "allowAtomIds": [
          "d5a.rule_exists",
          "d5a.mutual_breach_frame",
          "d5a.self_cross_ack"
        ],
        "forbidAtomIds": [
          "d5a.rule_exists",
          "d5a.first_breach_ack"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:pressure:responsibility",
      "coverageKey": "a:d-5:surface:early:pressure:responsibility",
      "variantTarget": 6,
      "setFlags": [
        "d-5:surface:responsibility_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse01:beat_v2:a:d-5:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "결론적으로 그 약속은 둘 다 어겼습니다. 저는 280만원을 미리 상의하지 못했고, 세린 씨도 150만원을 돌려 보냈습니다. 누가 더 잘했냐의 문제가 아니라, 왜 서로 말을 못 했는지를 같이 봐야 합니다.",
      "behaviorHint": "의도를 추궁당하면 답 대신 되묻는다.",
      "applicableStates": [
        "S2"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "evidence_response",
      "angleTag": "legality",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d5a.intent_rule_split",
          "d5a.rule_exists",
          "d5a.unlock.s2.rule_born_from_loss"
        ],
        "forbidAtomIds": [
          "d5a.rule_exists",
          "d5a.first_breach_ack"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:evidence:legality",
      "coverageKey": "a:d-5:surface:mid:evidence:legality",
      "variantTarget": 2,
      "setFlags": [
        "d-5:surface:evidence_shown"
      ],
      "tags": [
        "cold"
      ]
    },
    {
      "id": "spouse01:beat_v2:a:d-5:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "counter",
      "line": "저만 약속 파기한 사람처럼 세우는 건 받아들이기 어렵습니다. 서로 100만원 넘는 돈을 숨겼는데 한쪽만 배신이라고 부르면 기준이 무너집니다. 이 문제는 쌍방 위반으로 봐야 합니다.",
      "behaviorHint": "의도를 추궁당하면 답 대신 되묻는다.",
      "applicableStates": [
        "S3"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "responsibility",
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
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d5a.mutual_breach_frame",
          "d5a.self_cross_ack",
          "d5a.one_sided_betrayer_reject"
        ],
        "forbidAtomIds": [
          "d5a.rule_exists",
          "d5a.first_breach_ack"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:pressure:responsibility",
      "coverageKey": "a:d-5:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-5:surface:evidence_shown"
      ]
    },
    {
      "id": "spouse01:beat_v2:a:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "emotion",
      "line": "그 약속을 다시 꺼내는 게 사실 제일 창피했습니다. 재작년 투자 실패 뒤에 어렵게 세운 기준인데, 제가 먼저 280만원으로 그 선을 넘겼으니까요. 그래도 세린 씨 역시 150만원을 우회 송금하며 같은 규칙을 깼습니다.",
      "behaviorHint": "본론에 다가갈수록 업무 동선을 길게 늘어놓는다.",
      "applicableStates": [
        "S4"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "question",
      "questionTypes": [
        "empathy_approach"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d5a.unlock.s4.rule_as_pride_guard",
          "d5a.investment_shame",
          "d5a.mutual_breach_frame"
        ],
        "forbidAtomIds": [
          "d5a.rule_exists",
          "d5a.first_breach_ack"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:rapport:emotion",
      "coverageKey": "a:d-5:core:late:rapport:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-5:core:emotion_named"
      ],
      "tags": [
        "cold"
      ],
      "requiresFlags": [
        "d-5:motive:responsibility_named"
      ]
    },
    {
      "id": "spouse01:beat_v2:a:d-5:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confess",
      "line": "100만원 이상은 반드시 상의하기로 한 약속을 제가 먼저 어겼습니다. 그리고 세린 씨도 150만원 우회 송금으로 그 약속을 깼습니다. 방법은 달라도 둘 다 신뢰 규칙을 무너뜨렸다는 점을 인정합니다.",
      "behaviorHint": "본론에 다가갈수록 업무 동선을 길게 늘어놓는다.",
      "applicableStates": [
        "S5"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "motive_response",
      "angleTag": "motive",
      "actionFamily": "free_question",
      "questionTypes": [
        "motive_search"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d5a.first_breach_ack",
          "d5a.partner_150_reference",
          "d5a.rule_exists"
        ],
        "forbidAtomIds": [
          "d5a.rule_exists",
          "d5a.first_breach_ack"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:motive:motive",
      "coverageKey": "a:d-5:core:late:motive:motive",
      "variantTarget": 2,
      "setFlags": [
        "d-5:core:motive_named"
      ],
      "tags": [
        "cold"
      ],
      "requiresFlags": [
        "d-5:core:emotion_named"
      ]
    },
    {
      "id": "spouse01:beat_v2:a:d-5:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "fatigue_irritation",
      "line": "같은 100만원 약속 얘기만 반복하시면 저도 답이 거칠어집니다. 방금 말한 사전 상의부터 정리해 주세요.",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "timeline",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d5a.partner_150_reference",
          "d5a.self_cross_ack",
          "d5a.mutual_breach_frame"
        ],
        "forbidAtomIds": [
          "d5a.rule_exists",
          "d5a.first_breach_ack"
        ]
      },
      "weight": 3,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:fatigue:timeline",
      "coverageKey": "a:d-5:motive:mid:fatigue:timeline",
      "variantTarget": 1,
      "setFlags": [
        "d-5:motive:fatigue_warned"
      ],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "spouse01:beat_v2:a:d-5:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "fatigue_block",
      "line": "100만원 약속를 세 번째 같은 톤으로 묻는 건 답을 짜내는 방식처럼 들립니다. 지금은 더는 같은 방식으로 답하지 않겠습니다.",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "S3",
        "S4"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d5a.mutual_breach_frame",
          "d5a.self_cross_ack",
          "d5a.one_sided_betrayer_reject"
        ],
        "forbidAtomIds": [
          "d5a.rule_exists",
          "d5a.first_breach_ack"
        ]
      },
      "weight": 3,
      "priority": 16,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:fatigue:responsibility",
      "coverageKey": "a:d-5:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-5:motive:fatigue_blocked"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-5:motive:fatigue_warned"
      ]
    },
    {
      "id": "spouse01:beat_v2:a:d-5:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "fatigue_counter",
      "line": "계속 이렇게 몰아붙이면 저도 되묻고 싶습니다. 왜 사전 상의 맥락은 빼고 100만원 약속만 확대하십니까?",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d5a.first_breach_ack",
          "d5a.mutual_breach_frame",
          "d5a.unlock.s4.rule_as_pride_guard"
        ],
        "forbidAtomIds": [
          "d5a.rule_exists",
          "d5a.first_breach_ack"
        ]
      },
      "weight": 3,
      "priority": 14,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:fatigue:responsibility",
      "coverageKey": "a:d-5:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-5:motive:fatigue_countered"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-5:motive:fatigue_blocked"
      ]
    },
    {
      "id": "spouse01:beat_v2:a:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interjection_allow",
      "line": "그 송금을 말하는 순간 제일 먼저 올라오는 건 미안함보다 수치심입니다. 처가 일 하나도 혼자 못 막는 사람처럼 보이기 싫었습니다.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.provider_shame",
          "d1.unlock.s4.investment_failure_echo",
          "d1.unlock.s4.handle_inlaw_alone"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-1:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 1,
      "setFlags": [
        "d-1:surface:interjection_emotional_only"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "spouse01:beat_v2:a:d-1:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interjection_block",
      "line": "수치심 이야기로만 흘리면 280만원의 용도는 또 뒤로 밀립니다. 누구에게 왜 보냈는지부터 답해 주세요.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.provider_shame",
          "d1.unlock.s4.investment_failure_echo",
          "d1.unlock.s4.handle_inlaw_alone"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-1:surface:mid:interjection:emotional_only:block",
      "variantTarget": 1,
      "setFlags": [
        "d-1:surface:interjection_emotional_only"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "spouse01:beat_v2:b:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interjection_allow",
      "line": "새벽 두 시에 폰을 연 사람이 되고 싶었던 건 아닙니다. 또 속는 아내가 될까 봐 겁이 먼저 났습니다.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.fool_wife_fear",
          "d2.unlock.s4.inlaw_table_fear",
          "d2.unlock.s4.anger_masked_shame"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-2:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 1,
      "setFlags": [
        "d-2:surface:interjection_emotional_only"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "spouse01:beat_v2:b:d-2:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interjection_block",
      "line": "그 불안은 알겠지만, 불안만으로 제3자 전송까지 정당화되진 않습니다. 확인보다 침해가 먼저였는지 보죠.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.fool_wife_fear",
          "d2.unlock.s4.inlaw_table_fear",
          "d2.unlock.s4.anger_masked_shame"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-2:surface:mid:interjection:emotional_only:block",
      "variantTarget": 1,
      "setFlags": [
        "d-2:surface:interjection_emotional_only"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "spouse01:beat_v2:a:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interjection_allow",
      "line": "잘린 문장 하나와 골목 간판만으로 외도를 단정하면 안 됩니다. 최민정은 상담팀장이고 만남 장소는 상담동 후문 동선입니다.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "pressure_response",
      "angleTag": "identity",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.work_contact_generic",
          "d3.affair_denial",
          "d3.unlock.s2.consult_not_date"
        ],
        "forbidAtomIds": [
          "d3.delay_fault_ack",
          "d3.care_context_full"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 1,
      "setFlags": [
        "d-3:surface:interjection_detail_rebuttal"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal",
        "red_herring"
      ]
    },
    {
      "id": "spouse01:beat_v2:a:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interjection_block",
      "line": "장소 설명을 길게 늘어놔도 핵심은 같습니다. '조용한 데서 보자'가 상담 문맥이었다는 직접 근거를 내세요.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "pressure_response",
      "angleTag": "context",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.evidence_incomplete_counter",
          "d3.unlock.s2.alley_misread_layout",
          "d3.unlock.s2.consult_not_date"
        ],
        "forbidAtomIds": [
          "d3.delay_fault_ack",
          "d3.care_context_full"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-3:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 1,
      "setFlags": [
        "d-3:surface:interjection_detail_rebuttal"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal",
        "red_herring"
      ]
    },
    {
      "id": "spouse01:beat_v2:b:d-4:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "interjection_allow",
      "line": "150만원은 정우성 계좌를 거쳐 동생 월세로 바로 흘렀습니다. 숨긴 건 맞아도 목적까지 음흉했다고 말하면 과합니다.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "timeline",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d4.unlock.s2.eviction_notice_pressure",
          "d4.amount_move_ack",
          "d4.intermediary_ack"
        ],
        "forbidAtomIds": [
          "d4.method_not_clean_ack",
          "d4.sibling_rent_full"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-4:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 1,
      "setFlags": [
        "d-4:surface:interjection_detail_rebuttal"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "spouse01:beat_v2:b:d-4:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "interjection_block",
      "line": "중간 계좌를 쓴 순간 목적과 별개로 숨길 의도가 읽힙니다. '추석 지나고 말할게' 메시지와 함께 보죠.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "legality",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d4.method_not_clean_ack",
          "d4.amount_move_ack",
          "d4.family_need_generic"
        ],
        "forbidAtomIds": [
          "d4.method_not_clean_ack",
          "d4.sibling_rent_full"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-4:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 1,
      "setFlags": [
        "d-4:surface:interjection_detail_rebuttal"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "spouse01:beat_v2:a:d-3:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interjection_allow",
      "line": "세린 씨가 캡처 한 장에 기대 확신을 키운 건 압니다. 그래서 더 빨리 사실을 풀어 말했어야 했다는 후회도 있습니다.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
      "applicableStates": [
        "M1",
        "M2"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "interjectionStates": [
          "allow_last_turn"
        ],
        "misconceptionStates": [
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.cropped_chat_context_missing",
          "d3.evidence_incomplete_counter",
          "d3.unlock.s2.alley_misread_layout"
        ],
        "forbidAtomIds": [
          "d3.delay_fault_ack",
          "d3.care_context_full"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 1,
      "setFlags": [
        "d-3:surface:interjection_misbelief_escalation"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "misbelief_escalation",
        "red_herring"
      ],
      "beliefMode": "knows"
    },
    {
      "id": "spouse01:beat_v2:a:d-3:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interjection_block",
      "line": "오해를 알면서도 '나중에 말하겠다'는 태도로 버티면 확신만 더 자랍니다. 지금은 외도 부정이 아니라 맥락을 즉시 대라고 봐야 합니다.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
      "applicableStates": [
        "M1",
        "M2"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "interjectionStates": [
          "block_last_turn"
        ],
        "misconceptionStates": [
          "M2",
          "M3"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.cropped_chat_context_missing",
          "d3.evidence_incomplete_counter",
          "d3.unlock.s2.alley_misread_layout"
        ],
        "forbidAtomIds": [
          "d3.delay_fault_ack",
          "d3.care_context_full"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 1,
      "setFlags": [
        "d-3:surface:interjection_misbelief_escalation"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "misbelief_escalation",
        "red_herring"
      ],
      "beliefMode": "knows"
    },
    {
      "id": "spouse01:beat_v2:a:d-3:surface:mid:interjection:allow:03",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interjection_allow",
      "line": "모텔 골목처럼 보이는 외관과 실제 상담동 후문이 겹친 게 함정이었습니다. 그 착시를 인정해야 외도 프레임이 풀립니다.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
      "applicableStates": [
        "M1",
        "M2"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "identity",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "interjectionStates": [
          "allow_last_turn"
        ],
        "misconceptionStates": [
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.work_contact_generic",
          "d3.affair_denial",
          "d3.unlock.s2.consult_not_date"
        ],
        "forbidAtomIds": [
          "d3.delay_fault_ack",
          "d3.care_context_full"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 1,
      "setFlags": [
        "d-3:surface:interjection_misbelief_escalation"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "misbelief_escalation",
        "red_herring"
      ],
      "beliefMode": "knows"
    },
    {
      "id": "spouse01:beat_v2:a:d-3:surface:mid:interjection:block:03",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interjection_block",
      "line": "착시 이야기만 반복하면 또 장소 탓으로 숨습니다. 최민정의 역할과 장모 간병 예약을 한 문장으로 연결하세요.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
      "applicableStates": [
        "M1",
        "M2"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "identity",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "interjectionStates": [
          "block_last_turn"
        ],
        "misconceptionStates": [
          "M2",
          "M3"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.work_contact_generic",
          "d3.affair_denial",
          "d3.unlock.s2.consult_not_date"
        ],
        "forbidAtomIds": [
          "d3.delay_fault_ack",
          "d3.care_context_full"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 1,
      "setFlags": [
        "d-3:surface:interjection_misbelief_escalation"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "misbelief_escalation",
        "red_herring"
      ],
      "beliefMode": "knows"
    }
  ]
} as const;

export default spouse01BeatsV2Full;
