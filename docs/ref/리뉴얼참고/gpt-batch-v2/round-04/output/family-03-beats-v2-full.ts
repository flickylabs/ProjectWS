export const family03BeatsV2Full = {
  "caseId": "family-03",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 53,
    "byActionFamily": {
      "question": 27,
      "evidence": 6,
      "fatigue": 6,
      "free_question": 2,
      "interjection": 12
    },
    "byResponseIntent": {
      "pressure_response": 26,
      "rapport_response": 10,
      "evidence_response": 6,
      "fatigue_response": 6,
      "motive_response": 5
    },
    "byDispute": {
      "d-1": 20,
      "d-2": 5,
      "d-3": 16,
      "d-4": 7,
      "d-5": 5
    },
    "interjectionInfoLevels": {
      "emotional_only": 6,
      "detail_rebuttal": 6
    },
    "fatigueByDispute": {
      "d-1": 3,
      "d-3": 3
    }
  },
  "beats": [
    {
      "id": "family03:beat_v2:b:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "시점부터 바로잡겠습니다. 제가 평생 60만원씩 책임진다고 한 적은 없습니다. 그건 부풀려진 말입니다.",
      "behaviorHint": "핵심 답을 조금 늦추며 맥락 설명으로 시간을 번다.",
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
      "truthEnvelope": {
        "allowAtomIds": [
          "family03:b:d-1:s2:support:1",
          "family03:b:d-1:s0:surface:0"
        ],
        "forbidAtomIds": [
          "family03:b:d-1:s5:surface:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:timeline",
      "coverageKey": "b:d-1:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "family03:beat_v2:b:d-1:surface:pressure:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "그때 순서를 잘못 잡으면 전부 다르게 보입니다. 도와주자는 말은 했지만, 이사 직후 몇 달 정리하자는 취지였지 끝이 없는 약속은 아니었습니다.",
      "behaviorHint": "핵심 답을 조금 늦추며 맥락 설명으로 시간을 번다.",
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
      "truthEnvelope": {
        "allowAtomIds": [
          "family03:b:d-1:s2:support:1",
          "family03:b:d-1:s0:surface:0"
        ],
        "forbidAtomIds": [
          "family03:b:d-1:s5:surface:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:timeline",
      "coverageKey": "b:d-1:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "family03:beat_v2:b:d-1:surface:pressure:timeline:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "날짜만 떼어 놓고 몰아가면 안 됩니다. 제가 평생 60만원씩 책임진다고 한 적은 없습니다. 그건 부풀려진 말입니다.",
      "behaviorHint": "핵심 답을 조금 늦추며 맥락 설명으로 시간을 번다.",
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
      "truthEnvelope": {
        "allowAtomIds": [
          "family03:b:d-1:s2:support:1",
          "family03:b:d-1:s0:surface:0"
        ],
        "forbidAtomIds": [
          "family03:b:d-1:s5:surface:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:timeline",
      "coverageKey": "b:d-1:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "family03:beat_v2:b:d-1:surface:pressure:timeline:04",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "그 시점에는 그렇게 움직일 수밖에 없었습니다. 도와주자는 말은 했지만, 이사 직후 몇 달 정리하자는 취지였지 끝이 없는 약속은 아니었습니다.",
      "behaviorHint": "핵심 답을 조금 늦추며 맥락 설명으로 시간을 번다.",
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
      "truthEnvelope": {
        "allowAtomIds": [
          "family03:b:d-1:s2:support:1",
          "family03:b:d-1:s0:surface:0"
        ],
        "forbidAtomIds": [
          "family03:b:d-1:s5:surface:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:timeline",
      "coverageKey": "b:d-1:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "family03:beat_v2:b:d-1:surface:pressure:timeline:05",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "시간 순서대로 보면 제 말이 왜곡되진 않습니다. 제가 평생 60만원씩 책임진다고 한 적은 없습니다. 그건 부풀려진 말입니다.",
      "behaviorHint": "핵심 답을 조금 늦추며 맥락 설명으로 시간을 번다.",
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
      "truthEnvelope": {
        "allowAtomIds": [
          "family03:b:d-1:s2:support:1",
          "family03:b:d-1:s0:surface:0"
        ],
        "forbidAtomIds": [
          "family03:b:d-1:s5:surface:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:timeline",
      "coverageKey": "b:d-1:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "family03:beat_v2:b:d-1:surface:pressure:timeline:06",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "앞뒤 시각을 같이 보셔야 합니다. 도와주자는 말은 했지만, 이사 직후 몇 달 정리하자는 취지였지 끝이 없는 약속은 아니었습니다.",
      "behaviorHint": "핵심 답을 조금 늦추며 맥락 설명으로 시간을 번다.",
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
      "truthEnvelope": {
        "allowAtomIds": [
          "family03:b:d-1:s2:support:1",
          "family03:b:d-1:s0:surface:0"
        ],
        "forbidAtomIds": [
          "family03:b:d-1:s5:surface:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:timeline",
      "coverageKey": "b:d-1:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "family03:beat_v2:b:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "책임을 피하려는 건 아니지만 비중은 구분돼야 합니다. 원본 대화 기준으로는 독립 당시 6개월 동안 월 60만원 보내기로 한 건 맞습니다.",
      "behaviorHint": "부분 인정 뒤 다른 사정을 덧붙여 중심 책임을 흐린다.",
      "applicableStates": [
        "S2",
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
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family03:b:d-1:s3:surface:0",
          "d1.b.unlock.s5.promise_admission"
        ],
        "forbidAtomIds": [
          "family03:b:d-1:s5:surface:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:pressure:responsibility",
      "coverageKey": "b:d-1:motive:mid:pressure:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ]
    },
    {
      "id": "family03:beat_v2:b:d-1:motive:pressure:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "잘못이 없다는 말이 아니라, 누구 책임이 어디까지인지 나눠야 합니다. 제가 어머니가 그걸 더 길게 받아들이는 걸 알면서도 바로 선을 긋지 못했습니다.",
      "behaviorHint": "부분 인정 뒤 다른 사정을 덧붙여 중심 책임을 흐린다.",
      "applicableStates": [
        "S2",
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
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family03:b:d-1:s3:surface:0",
          "d1.b.unlock.s5.promise_admission"
        ],
        "forbidAtomIds": [
          "family03:b:d-1:s5:surface:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:pressure:responsibility",
      "coverageKey": "b:d-1:motive:mid:pressure:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ]
    },
    {
      "id": "family03:beat_v2:b:d-1:motive:pressure:responsibility:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "같은 사건이라도 제 몫과 상대 몫은 다르게 봐야 합니다. 원본 대화 기준으로는 독립 당시 6개월 동안 월 60만원 보내기로 한 건 맞습니다.",
      "behaviorHint": "부분 인정 뒤 다른 사정을 덧붙여 중심 책임을 흐린다.",
      "applicableStates": [
        "S2",
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
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family03:b:d-1:s3:surface:0",
          "d1.b.unlock.s5.promise_admission"
        ],
        "forbidAtomIds": [
          "family03:b:d-1:s5:surface:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:pressure:responsibility",
      "coverageKey": "b:d-1:motive:mid:pressure:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ]
    },
    {
      "id": "family03:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "지금은 변명보다 감정을 먼저 말씀드리는 게 맞겠습니다. 손목이 아파 근무를 줄이던 때라 그 말이 흔들리면 버려지는 기분이 컸습니다.",
      "behaviorHint": "울먹이기 직전 한 박자 멈추며 상처를 전면에 둔다.",
      "applicableStates": [
        "S4",
        "S5"
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
          "strained",
          "breaking"
        ],
        "trustWindowBands": [
          "opening",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.a.unlock.s4.burden_and_abandonment_fear",
          "family03:a:d-1:s4:surface:0"
        ],
        "forbidAtomIds": [
          "family03:a:d-1:s0:surface:0"
        ]
      },
      "weight": 5,
      "priority": 23,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:emotion_window"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-1:motive:responsibility_named"
      ]
    },
    {
      "id": "family03:beat_v2:a:d-1:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "여기까지 오면 사실보다 먼저 남는 감정이 있습니다. 정우 약속은 6개월 한정이었고, 저는 그걸 더 길게 받아들이며 몰아붙였습니다.",
      "behaviorHint": "울먹이기 직전 한 박자 멈추며 상처를 전면에 둔다.",
      "applicableStates": [
        "S4",
        "S5"
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
          "strained",
          "breaking"
        ],
        "trustWindowBands": [
          "opening",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.a.unlock.s4.burden_and_abandonment_fear",
          "family03:a:d-1:s4:surface:0"
        ],
        "forbidAtomIds": [
          "family03:a:d-1:s0:surface:0"
        ]
      },
      "weight": 5,
      "priority": 23,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:emotion_window"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-1:motive:responsibility_named"
      ]
    },
    {
      "id": "family03:beat_v2:b:d-1:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "잘린 카톡 기준으로 보면 사람과 경로를 다시 나눠야 합니다. 원본 대화 기준으로는 독립 당시 6개월 동안 월 60만원 보내기로 한 건 맞습니다.",
      "behaviorHint": "자료가 나오면 즉시 부인하진 못하고, 의도와 결과를 분리해 말한다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "evidence_response",
      "angleTag": "identity",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.b.unlock.s3.ambiguous_silence",
          "d1.b.unlock.s2.six_month_context"
        ],
        "forbidAtomIds": [
          "family03:b:d-1:s5:surface:0"
        ]
      },
      "weight": 4,
      "priority": 34,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:evidence:identity",
      "coverageKey": "b:d-1:motive:mid:evidence:identity",
      "variantTarget": 2,
      "setFlags": [
        "d-1:motive:evidence_shown"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ]
    },
    {
      "id": "family03:beat_v2:b:d-1:motive:evidence:identity:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "은행 로그이 나오면 누가 무엇을 했는지 범위를 줄일 수 있습니다. 제가 어머니가 그걸 더 길게 받아들이는 걸 알면서도 바로 선을 긋지 못했습니다.",
      "behaviorHint": "자료가 나오면 즉시 부인하진 못하고, 의도와 결과를 분리해 말한다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "evidence_response",
      "angleTag": "identity",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.b.unlock.s3.ambiguous_silence",
          "d1.b.unlock.s2.six_month_context"
        ],
        "forbidAtomIds": [
          "family03:b:d-1:s5:surface:0"
        ]
      },
      "weight": 4,
      "priority": 34,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:evidence:identity",
      "coverageKey": "b:d-1:motive:mid:evidence:identity",
      "variantTarget": 2,
      "setFlags": [
        "d-1:motive:evidence_shown"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ]
    },
    {
      "id": "family03:beat_v2:b:d-1:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "같은 순서 질문을 몇 번이나 더 해야 합니까. 원본 대화 기준으로는 독립 당시 6개월 동안 월 60만원 보내기로 한 건 맞습니다.",
      "behaviorHint": "같은 질문이 누적되자 답 순서를 더 미루려 하고 짜증이 섞인다.",
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
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.b.unlock.s2.six_month_context"
        ],
        "forbidAtomIds": [
          "family03:b:d-1:s5:surface:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:fatigue:timeline",
      "coverageKey": "b:d-1:surface:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-1:surface:fatigue_2_seen"
      ],
      "tags": [
        "fatigue",
        "second_pass"
      ]
    },
    {
      "id": "family03:beat_v2:b:d-1:surface:fatigue:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "계속 시점만 반복되면 저도 지칠 수밖에 없습니다. 제가 어머니가 그걸 더 길게 받아들이는 걸 알면서도 바로 선을 긋지 못했습니다.",
      "behaviorHint": "같은 질문이 누적되자 답 순서를 더 미루려 하고 짜증이 섞인다.",
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
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.b.unlock.s2.six_month_context"
        ],
        "forbidAtomIds": [
          "family03:b:d-1:s5:surface:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:fatigue:timeline",
      "coverageKey": "b:d-1:surface:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-1:surface:fatigue_3_seen"
      ],
      "tags": [
        "fatigue",
        "third_pass"
      ]
    },
    {
      "id": "family03:beat_v2:b:d-1:surface:fatigue:timeline:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "그 부분은 이미 여러 번 말했습니다. 원본 대화 기준으로는 독립 당시 6개월 동안 월 60만원 보내기로 한 건 맞습니다.",
      "behaviorHint": "같은 질문이 누적되자 답 순서를 더 미루려 하고 짜증이 섞인다.",
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
        "emotionTiers": [
          "strained",
          "breaking"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.b.unlock.s2.six_month_context"
        ],
        "forbidAtomIds": [
          "family03:b:d-1:s5:surface:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:fatigue:timeline",
      "coverageKey": "b:d-1:surface:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-1:surface:fatigue_spike_seen"
      ],
      "tags": [
        "fatigue",
        "high_fatigue"
      ]
    },
    {
      "id": "family03:beat_v2:b:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "책임을 피하려는 건 아니지만 비중은 구분돼야 합니다. 셋째 달에 자동이체를 해지한 건 사실이고, 그 뒤엔 제가 직접 송금했습니다.",
      "behaviorHint": "부분 인정 뒤 다른 사정을 덧붙여 중심 책임을 흐린다.",
      "applicableStates": [
        "S2",
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
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family03:b:d-2:s3:surface:0",
          "d2.b.unlock.s3.reduced_late_amounts"
        ],
        "forbidAtomIds": [
          "family03:b:d-2:s5:surface:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:pressure:responsibility",
      "coverageKey": "b:d-2:motive:mid:pressure:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "family03:beat_v2:b:d-2:motive:pressure:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "잘못이 없다는 말이 아니라, 누구 책임이 어디까지인지 나눠야 합니다. 35만원, 40만원으로 줄여 늦게 보냈으면서도 미리 말하지 않은 건 제 잘못입니다.",
      "behaviorHint": "부분 인정 뒤 다른 사정을 덧붙여 중심 책임을 흐린다.",
      "applicableStates": [
        "S2",
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
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family03:b:d-2:s3:surface:0",
          "d2.b.unlock.s3.reduced_late_amounts"
        ],
        "forbidAtomIds": [
          "family03:b:d-2:s5:surface:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:pressure:responsibility",
      "coverageKey": "b:d-2:motive:mid:pressure:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "family03:beat_v2:b:d-2:motive:pressure:responsibility:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "같은 사건이라도 제 몫과 상대 몫은 다르게 봐야 합니다. 셋째 달에 자동이체를 해지한 건 사실이고, 그 뒤엔 제가 직접 송금했습니다.",
      "behaviorHint": "부분 인정 뒤 다른 사정을 덧붙여 중심 책임을 흐린다.",
      "applicableStates": [
        "S2",
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
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family03:b:d-2:s3:surface:0",
          "d2.b.unlock.s3.reduced_late_amounts"
        ],
        "forbidAtomIds": [
          "family03:b:d-2:s5:surface:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:pressure:responsibility",
      "coverageKey": "b:d-2:motive:mid:pressure:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "family03:beat_v2:a:d-3:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "겉으로만 보면 그렇게 보일 수 있어도 맥락은 다릅니다. 그 돈은 다 제 약값하고 공과금으로 나갔어요. 다른 데 돌린 적 없습니다.",
      "behaviorHint": "희생 목록을 먼저 꺼내며 억울한 사람의 자리를 선점한다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
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
          "family03:a:d-3:s1:surface:0",
          "family03:a:d-3:s0:surface:0"
        ],
        "forbidAtomIds": [
          "family03:a:d-3:s5:surface:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:pressure:context",
      "coverageKey": "a:d-3:surface:early:pressure:context",
      "variantTarget": 4,
      "setFlags": [
        "d-3:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "family03:beat_v2:a:d-3:surface:pressure:context:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "한 장면만 떼면 제가 제일 나빠 보입니다. 가족 안에서 잠깐 돈이 섞여 보였을 수는 있어도 결국 다 집 살림 때문이었습니다.",
      "behaviorHint": "희생 목록을 먼저 꺼내며 억울한 사람의 자리를 선점한다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
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
          "family03:a:d-3:s1:surface:0",
          "family03:a:d-3:s0:surface:0"
        ],
        "forbidAtomIds": [
          "family03:a:d-3:s5:surface:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:pressure:context",
      "coverageKey": "a:d-3:surface:early:pressure:context",
      "variantTarget": 4,
      "setFlags": [
        "d-3:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "family03:beat_v2:a:d-3:surface:pressure:context:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "배경을 빼고 묻는 질문에는 답이 반쪽이 됩니다. 그 돈은 다 제 약값하고 공과금으로 나갔어요. 다른 데 돌린 적 없습니다.",
      "behaviorHint": "희생 목록을 먼저 꺼내며 억울한 사람의 자리를 선점한다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
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
          "family03:a:d-3:s1:surface:0",
          "family03:a:d-3:s0:surface:0"
        ],
        "forbidAtomIds": [
          "family03:a:d-3:s5:surface:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:pressure:context",
      "coverageKey": "a:d-3:surface:early:pressure:context",
      "variantTarget": 4,
      "setFlags": [
        "d-3:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "family03:beat_v2:a:d-3:surface:pressure:context:04",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "그 부분은 상황까지 같이 붙여서 봐야 합니다. 가족 안에서 잠깐 돈이 섞여 보였을 수는 있어도 결국 다 집 살림 때문이었습니다.",
      "behaviorHint": "희생 목록을 먼저 꺼내며 억울한 사람의 자리를 선점한다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
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
          "family03:a:d-3:s1:surface:0",
          "family03:a:d-3:s0:surface:0"
        ],
        "forbidAtomIds": [
          "family03:a:d-3:s5:surface:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:pressure:context",
      "coverageKey": "a:d-3:surface:early:pressure:context",
      "variantTarget": 4,
      "setFlags": [
        "d-3:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "family03:beat_v2:a:d-3:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "제가 왜 그 해석을 붙들었는지까지는 들어보셔야 합니다. 수빈이한테 조금 보낸 건 맞지만, 그때도 집안 급한 숨통을 막으려던 수준이었습니다.",
      "behaviorHint": "자기 고생을 끌어와 책임선을 흐리려다 중간에 감정이 새어 나온다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "motive_response",
      "angleTag": "motive",
      "actionFamily": "question",
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
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.a.unlock.s3.academy_support",
          "family03:a:d-3:s3:support:1"
        ],
        "forbidAtomIds": [
          "family03:a:d-3:s5:surface:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:motive:motive",
      "coverageKey": "a:d-3:motive:mid:motive:motive",
      "variantTarget": 3,
      "setFlags": [
        "d-3:motive:motive_opened"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-3:surface:context_pressed"
      ]
    },
    {
      "id": "family03:beat_v2:a:d-3:motive:motive:motive:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "의도만 따로 떼면 더 나쁘게 보일 수 있지만, 제 동기는 이랬습니다. 학원비랑 교통비가 섞였는데 정우한테 말하면 또 장남 돈으로 딸 챙긴다고 할까 봐 숨겼습니다.",
      "behaviorHint": "자기 고생을 끌어와 책임선을 흐리려다 중간에 감정이 새어 나온다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "motive_response",
      "angleTag": "motive",
      "actionFamily": "question",
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
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.a.unlock.s3.academy_support",
          "family03:a:d-3:s3:support:1"
        ],
        "forbidAtomIds": [
          "family03:a:d-3:s5:surface:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:motive:motive",
      "coverageKey": "a:d-3:motive:mid:motive:motive",
      "variantTarget": 3,
      "setFlags": [
        "d-3:motive:motive_opened"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-3:surface:context_pressed"
      ]
    },
    {
      "id": "family03:beat_v2:a:d-3:motive:motive:motive:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "그 선택의 배경을 말하자면 결국 여기로 옵니다. 수빈이한테 조금 보낸 건 맞지만, 그때도 집안 급한 숨통을 막으려던 수준이었습니다.",
      "behaviorHint": "자기 고생을 끌어와 책임선을 흐리려다 중간에 감정이 새어 나온다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "motive_response",
      "angleTag": "motive",
      "actionFamily": "question",
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
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.a.unlock.s3.academy_support",
          "family03:a:d-3:s3:support:1"
        ],
        "forbidAtomIds": [
          "family03:a:d-3:s5:surface:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:motive:motive",
      "coverageKey": "a:d-3:motive:mid:motive:motive",
      "variantTarget": 3,
      "setFlags": [
        "d-3:motive:motive_opened"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-3:surface:context_pressed"
      ]
    },
    {
      "id": "family03:beat_v2:a:d-3:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "emotional",
      "line": "지금은 변명보다 감정을 먼저 말씀드리는 게 맞겠습니다. 한 자식 돈 받아 다른 자식까지 돌본 엄마처럼 보일까 너무 창피했습니다.",
      "behaviorHint": "울먹이기 직전 한 박자 멈추며 상처를 전면에 둔다.",
      "applicableStates": [
        "S4",
        "S5"
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
          "strained",
          "breaking"
        ],
        "trustWindowBands": [
          "opening",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.a.unlock.s4.shame_about_two_children",
          "family03:a:d-3:s4:surface:0"
        ],
        "forbidAtomIds": [
          "family03:a:d-3:s0:surface:0"
        ]
      },
      "weight": 5,
      "priority": 23,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:rapport:emotion",
      "coverageKey": "a:d-3:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-3:core:emotion_window"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-3:motive:motive_opened"
      ]
    },
    {
      "id": "family03:beat_v2:a:d-3:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "emotional",
      "line": "여기까지 오면 사실보다 먼저 남는 감정이 있습니다. 정우가 보낸 돈 일부를 수빈 지원에 돌려썼고, 전부 약값과 공과금이라고 말한 건 거짓이었습니다.",
      "behaviorHint": "울먹이기 직전 한 박자 멈추며 상처를 전면에 둔다.",
      "applicableStates": [
        "S4",
        "S5"
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
          "strained",
          "breaking"
        ],
        "trustWindowBands": [
          "opening",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.a.unlock.s4.shame_about_two_children",
          "family03:a:d-3:s4:surface:0"
        ],
        "forbidAtomIds": [
          "family03:a:d-3:s0:surface:0"
        ]
      },
      "weight": 5,
      "priority": 23,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:rapport:emotion",
      "coverageKey": "a:d-3:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-3:core:emotion_window"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-3:motive:motive_opened"
      ]
    },
    {
      "id": "family03:beat_v2:a:d-3:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "통장·문자 원본 기준으로 보면 사람과 경로를 다시 나눠야 합니다. 수빈이한테 조금 보낸 건 맞지만, 그때도 집안 급한 숨통을 막으려던 수준이었습니다.",
      "behaviorHint": "증거가 나오면 한숨을 길게 쉬고, 자신이 떠안은 장면을 덧붙인다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "evidence_response",
      "angleTag": "identity",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.a.unlock.s3.academy_support",
          "d3.a.unlock.s2.same_day_transfers"
        ],
        "forbidAtomIds": [
          "family03:a:d-3:s5:surface:0"
        ]
      },
      "weight": 4,
      "priority": 34,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:evidence:identity",
      "coverageKey": "a:d-3:motive:mid:evidence:identity",
      "variantTarget": 2,
      "setFlags": [
        "d-3:motive:evidence_shown"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-3:surface:context_pressed"
      ]
    },
    {
      "id": "family03:beat_v2:a:d-3:motive:evidence:identity:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "통장·문자 원본이 나오면 누가 무엇을 했는지 범위를 줄일 수 있습니다. 학원비랑 교통비가 섞였는데 정우한테 말하면 또 장남 돈으로 딸 챙긴다고 할까 봐 숨겼습니다.",
      "behaviorHint": "증거가 나오면 한숨을 길게 쉬고, 자신이 떠안은 장면을 덧붙인다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "evidence_response",
      "angleTag": "identity",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.a.unlock.s3.academy_support",
          "d3.a.unlock.s2.same_day_transfers"
        ],
        "forbidAtomIds": [
          "family03:a:d-3:s5:surface:0"
        ]
      },
      "weight": 4,
      "priority": 34,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:evidence:identity",
      "coverageKey": "a:d-3:motive:mid:evidence:identity",
      "variantTarget": 2,
      "setFlags": [
        "d-3:motive:evidence_shown"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-3:surface:context_pressed"
      ]
    },
    {
      "id": "family03:beat_v2:a:d-3:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "계속 같은 책임 질문이면 저도 방어적으로 나올 수밖에 없습니다. 수빈이한테 조금 보낸 건 맞지만, 그때도 집안 급한 숨통을 막으려던 수준이었습니다.",
      "behaviorHint": "지친 표정으로 같은 얘기를 반복당한 억울함을 전면에 올린다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family03:a:d-3:s3:surface:0"
        ],
        "forbidAtomIds": [
          "family03:a:d-3:s5:surface:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:fatigue:responsibility",
      "coverageKey": "a:d-3:surface:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-3:surface:fatigue_2_seen"
      ],
      "tags": [
        "fatigue",
        "second_pass"
      ]
    },
    {
      "id": "family03:beat_v2:a:d-3:surface:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "잘못이 없다는 뜻이 아니라, 같은 지점을 또 찌르면 말문이 막힙니다. 학원비랑 교통비가 섞였는데 정우한테 말하면 또 장남 돈으로 딸 챙긴다고 할까 봐 숨겼습니다.",
      "behaviorHint": "지친 표정으로 같은 얘기를 반복당한 억울함을 전면에 올린다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family03:a:d-3:s3:surface:0"
        ],
        "forbidAtomIds": [
          "family03:a:d-3:s5:surface:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:fatigue:responsibility",
      "coverageKey": "a:d-3:surface:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-3:surface:fatigue_3_seen"
      ],
      "tags": [
        "fatigue",
        "third_pass"
      ]
    },
    {
      "id": "family03:beat_v2:a:d-3:surface:fatigue:responsibility:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "더 몰아붙여도 책임선이 달라지진 않습니다. 수빈이한테 조금 보낸 건 맞지만, 그때도 집안 급한 숨통을 막으려던 수준이었습니다.",
      "behaviorHint": "지친 표정으로 같은 얘기를 반복당한 억울함을 전면에 올린다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "strained",
          "breaking"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family03:a:d-3:s3:surface:0"
        ],
        "forbidAtomIds": [
          "family03:a:d-3:s5:surface:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:fatigue:responsibility",
      "coverageKey": "a:d-3:surface:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-3:surface:fatigue_spike_seen"
      ],
      "tags": [
        "fatigue",
        "high_fatigue"
      ]
    },
    {
      "id": "family03:beat_v2:a:d-4:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "책임을 피하려는 건 아니지만 비중은 구분돼야 합니다. 정우한테 다시 따지기 전에 단톡에 약속 캡처를 올린 건 맞습니다.",
      "behaviorHint": "자기 고생을 끌어와 책임선을 흐리려다 중간에 감정이 새어 나온다.",
      "applicableStates": [
        "S2",
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
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family03:a:d-4:s3:surface:0",
          "d4.a.unlock.s3.pressure_intent"
        ],
        "forbidAtomIds": [
          "family03:a:d-4:s5:surface:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:pressure:responsibility",
      "coverageKey": "a:d-4:motive:mid:pressure:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-4:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-4:motive:evidence_shown"
      ]
    },
    {
      "id": "family03:beat_v2:a:d-4:motive:pressure:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "잘못이 없다는 말이 아니라, 누구 책임이 어디까지인지 나눠야 합니다. 표현이 세서 결과적으로 압박처럼 보였고, 그 점은 제가 넘었습니다.",
      "behaviorHint": "자기 고생을 끌어와 책임선을 흐리려다 중간에 감정이 새어 나온다.",
      "applicableStates": [
        "S2",
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
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family03:a:d-4:s3:surface:0",
          "d4.a.unlock.s3.pressure_intent"
        ],
        "forbidAtomIds": [
          "family03:a:d-4:s5:surface:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:pressure:responsibility",
      "coverageKey": "a:d-4:motive:mid:pressure:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-4:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-4:motive:evidence_shown"
      ]
    },
    {
      "id": "family03:beat_v2:a:d-4:motive:pressure:responsibility:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "같은 사건이라도 제 몫과 상대 몫은 다르게 봐야 합니다. 정우한테 다시 따지기 전에 단톡에 약속 캡처를 올린 건 맞습니다.",
      "behaviorHint": "자기 고생을 끌어와 책임선을 흐리려다 중간에 감정이 새어 나온다.",
      "applicableStates": [
        "S2",
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
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family03:a:d-4:s3:surface:0",
          "d4.a.unlock.s3.pressure_intent"
        ],
        "forbidAtomIds": [
          "family03:a:d-4:s5:surface:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:pressure:responsibility",
      "coverageKey": "a:d-4:motive:mid:pressure:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-4:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-4:motive:evidence_shown"
      ]
    },
    {
      "id": "family03:beat_v2:a:d-4:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "단톡 원본을 기준으로 보면 허용된 선과 넘은 선이 갈립니다. 정우한테 다시 따지기 전에 단톡에 약속 캡처를 올린 건 맞습니다.",
      "behaviorHint": "증거가 나오면 한숨을 길게 쉬고, 자신이 떠안은 장면을 덧붙인다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "sub_truth",
      "responseIntent": "evidence_response",
      "angleTag": "legality",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d4.a.unlock.s3.pressure_intent",
          "d4.a.unlock.s2.group_first_upload"
        ],
        "forbidAtomIds": [
          "family03:a:d-4:s5:surface:0"
        ]
      },
      "weight": 4,
      "priority": 34,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:evidence:legality",
      "coverageKey": "a:d-4:motive:mid:evidence:legality",
      "variantTarget": 2,
      "setFlags": [
        "d-4:motive:evidence_shown"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-4:motive:evidence_shown"
      ]
    },
    {
      "id": "family03:beat_v2:a:d-4:motive:evidence:legality:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "단톡 원본이 나오면 절차 위반을 피해 가긴 어렵습니다. 표현이 세서 결과적으로 압박처럼 보였고, 그 점은 제가 넘었습니다.",
      "behaviorHint": "증거가 나오면 한숨을 길게 쉬고, 자신이 떠안은 장면을 덧붙인다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "sub_truth",
      "responseIntent": "evidence_response",
      "angleTag": "legality",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d4.a.unlock.s3.pressure_intent",
          "d4.a.unlock.s2.group_first_upload"
        ],
        "forbidAtomIds": [
          "family03:a:d-4:s5:surface:0"
        ]
      },
      "weight": 4,
      "priority": 34,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:evidence:legality",
      "coverageKey": "a:d-4:motive:mid:evidence:legality",
      "variantTarget": 2,
      "setFlags": [
        "d-4:motive:evidence_shown"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-4:motive:evidence_shown"
      ]
    },
    {
      "id": "family03:beat_v2:a:d-5:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "책임을 피하려는 건 아니지만 비중은 구분돼야 합니다. 직접 납부로 바꾸자고 합의한 뒤에도 제가 다시 현금을 요구하고 영수증 공유를 끊은 건 맞습니다.",
      "behaviorHint": "자기 고생을 끌어와 책임선을 흐리려다 중간에 감정이 새어 나온다.",
      "applicableStates": [
        "S2",
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
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family03:a:d-5:s3:surface:0",
          "d5.a.unlock.s2.cash_reversion"
        ],
        "forbidAtomIds": [
          "family03:a:d-5:s5:surface:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:pressure:responsibility",
      "coverageKey": "a:d-5:motive:mid:pressure:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-5:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "family03:beat_v2:b:d-5:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confess",
      "line": "그 질문이라면 더 숨기지 않겠습니다. 고지서 날짜 볼 때마다 앞선 약속을 못 지킨 생각이 나서 확인 자체를 미뤘습니다.",
      "behaviorHint": "돌려 말하던 습관이 줄고 비교적 바로 답하지만 끝에는 변명 한 줄이 남는다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "sub_truth",
      "responseIntent": "motive_response",
      "angleTag": "motive",
      "actionFamily": "free_question",
      "questionTypes": [
        "motive_search"
      ],
      "conditions": {
        "emotionTiers": [
          "strained",
          "breaking"
        ],
        "trustWindowBands": [
          "opening",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d5.b.unlock.s5.shared_failure_admission",
          "d5.b.unlock.s4.avoided_bill_dates"
        ],
        "forbidAtomIds": [
          "family03:b:d-5:s0:surface:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:motive:motive",
      "coverageKey": "b:d-5:core:late:motive:motive",
      "variantTarget": 2,
      "setFlags": [
        "d-5:core:motive_opened"
      ],
      "tags": [
        "free_question",
        "late"
      ],
      "requiresFlags": [
        "d-5:motive:responsibility_named"
      ]
    },
    {
      "id": "family03:beat_v2:b:d-5:core:motive:motive:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confess",
      "line": "돌려 말하지 않고 동기부터 말씀드리겠습니다. 직접 납부 합의가 깨진 건 어머니의 현금 요구만이 아니라, 저도 루틴을 지키지 못한 탓입니다.",
      "behaviorHint": "돌려 말하던 습관이 줄고 비교적 바로 답하지만 끝에는 변명 한 줄이 남는다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "sub_truth",
      "responseIntent": "motive_response",
      "angleTag": "motive",
      "actionFamily": "free_question",
      "questionTypes": [
        "motive_search"
      ],
      "conditions": {
        "emotionTiers": [
          "strained",
          "breaking"
        ],
        "trustWindowBands": [
          "opening",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d5.b.unlock.s5.shared_failure_admission",
          "d5.b.unlock.s4.avoided_bill_dates"
        ],
        "forbidAtomIds": [
          "family03:b:d-5:s0:surface:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:motive:motive",
      "coverageKey": "b:d-5:core:late:motive:motive",
      "variantTarget": 2,
      "setFlags": [
        "d-5:core:motive_opened"
      ],
      "tags": [
        "free_question",
        "late"
      ],
      "requiresFlags": [
        "d-5:motive:responsibility_named"
      ]
    },
    {
      "id": "family03:beat_v2:a:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "잠깐만요, 손목이 아파 근무를 줄이던 때라 그 말이 흔들리면 버려지는 기분이 컸습니다.",
      "behaviorHint": "말을 끊으며 억울함과 보호 본능을 함께 밀어 넣는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "interjection",
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
          "tired"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.a.unlock.s4.burden_and_abandonment_fear"
        ],
        "forbidAtomIds": [
          "family03:a:d-1:s0:surface:0"
        ]
      },
      "weight": 5,
      "priority": 38,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-1:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 3,
      "setFlags": [
        "d-1:surface:interjection_emotional_only_allow"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "family03:beat_v2:a:d-1:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "그렇게 끊으셔도 감정이 사라지진 않습니다. 손목이 아파 근무를 줄이던 때라 그 말이 흔들리면 버려지는 기분이 컸습니다.",
      "behaviorHint": "말을 끊으며 억울함과 보호 본능을 함께 밀어 넣는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "interjection",
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
          "tired"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.a.unlock.s4.burden_and_abandonment_fear"
        ],
        "forbidAtomIds": [
          "family03:a:d-1:s0:surface:0"
        ]
      },
      "weight": 5,
      "priority": 38,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-1:surface:mid:interjection:emotional_only:block",
      "variantTarget": 3,
      "setFlags": [
        "d-1:surface:interjection_emotional_only_block"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "family03:beat_v2:b:d-1:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "금액과 시각부터 다시 보셔야 합니다. 제가 어머니가 그걸 더 길게 받아들이는 걸 알면서도 바로 선을 긋지 못했습니다.",
      "behaviorHint": "막히면 관계나 맥락을 방패로 삼아 끼어든다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "context",
      "actionFamily": "interjection",
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
          "tired"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.b.unlock.s2.six_month_context"
        ],
        "forbidAtomIds": [
          "family03:b:d-1:s5:surface:0"
        ]
      },
      "weight": 5,
      "priority": 38,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-1:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 3,
      "setFlags": [
        "d-1:surface:interjection_detail_rebuttal_allow"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "family03:beat_v2:b:d-1:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "세부를 끊어도 숫자와 로그는 안 없어집니다. 제가 어머니가 그걸 더 길게 받아들이는 걸 알면서도 바로 선을 긋지 못했습니다.",
      "behaviorHint": "막히면 관계나 맥락을 방패로 삼아 끼어든다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "context",
      "actionFamily": "interjection",
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
          "tired"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.b.unlock.s2.six_month_context"
        ],
        "forbidAtomIds": [
          "family03:b:d-1:s5:surface:0"
        ]
      },
      "weight": 5,
      "priority": 38,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-1:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 3,
      "setFlags": [
        "d-1:surface:interjection_detail_rebuttal_block"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "family03:beat_v2:b:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "잠깐만요, 그걸 큰 약속 파기처럼 인정하면 제가 너무 무책임한 사람처럼 보일까 축소해서 말했습니다.",
      "behaviorHint": "막히면 관계나 맥락을 방패로 삼아 끼어든다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "interjection",
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
          "tired"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.b.unlock.s4.face_saving_minimization"
        ],
        "forbidAtomIds": [
          "family03:b:d-2:s0:surface:0"
        ]
      },
      "weight": 5,
      "priority": 38,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-2:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:interjection_emotional_only_allow"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "family03:beat_v2:b:d-2:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "그렇게 끊으셔도 감정이 사라지진 않습니다. 그걸 큰 약속 파기처럼 인정하면 제가 너무 무책임한 사람처럼 보일까 축소해서 말했습니다.",
      "behaviorHint": "막히면 관계나 맥락을 방패로 삼아 끼어든다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "interjection",
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
          "tired"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.b.unlock.s4.face_saving_minimization"
        ],
        "forbidAtomIds": [
          "family03:b:d-2:s0:surface:0"
        ]
      },
      "weight": 5,
      "priority": 38,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-2:surface:mid:interjection:emotional_only:block",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:interjection_emotional_only_block"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "family03:beat_v2:a:d-3:surface:mid:interjection:allow:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "기록을 같이 놓고 말해야 합니다. 수빈이한테 조금 보낸 건 맞지만, 그때도 집안 급한 숨통을 막으려던 수준이었습니다.",
      "behaviorHint": "말을 끊으며 억울함과 보호 본능을 함께 밀어 넣는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "context",
      "actionFamily": "interjection",
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
          "tired"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.a.unlock.s3.academy_support"
        ],
        "forbidAtomIds": [
          "family03:a:d-3:s5:surface:0"
        ]
      },
      "weight": 5,
      "priority": 38,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 3,
      "setFlags": [
        "d-3:surface:interjection_detail_rebuttal_allow"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "family03:beat_v2:a:d-3:surface:mid:interjection:block:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "이 대목은 짧게 넘길 일이 아닙니다. 수빈이한테 조금 보낸 건 맞지만, 그때도 집안 급한 숨통을 막으려던 수준이었습니다.",
      "behaviorHint": "말을 끊으며 억울함과 보호 본능을 함께 밀어 넣는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "context",
      "actionFamily": "interjection",
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
          "tired"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.a.unlock.s3.academy_support"
        ],
        "forbidAtomIds": [
          "family03:a:d-3:s5:surface:0"
        ]
      },
      "weight": 5,
      "priority": 38,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-3:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 3,
      "setFlags": [
        "d-3:surface:interjection_detail_rebuttal_block"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "family03:beat_v2:a:d-4:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "emotional",
      "line": "그 말만 남기면 너무 억울합니다. 제가 단톡으로 공개 압박을 했고, 그건 가족 경계를 넘은 행동이었습니다.",
      "behaviorHint": "말을 끊으며 억울함과 보호 본능을 함께 밀어 넣는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "interjection",
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
          "tired"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family03:a:d-4:s4:surface:0"
        ],
        "forbidAtomIds": [
          "family03:a:d-4:s0:surface:0"
        ]
      },
      "weight": 5,
      "priority": 38,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-4:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 3,
      "setFlags": [
        "d-4:surface:interjection_emotional_only_allow"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "family03:beat_v2:a:d-4:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "emotional",
      "line": "막으셔도 제가 느낀 억울함은 그대로입니다. 제가 단톡으로 공개 압박을 했고, 그건 가족 경계를 넘은 행동이었습니다.",
      "behaviorHint": "말을 끊으며 억울함과 보호 본능을 함께 밀어 넣는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "interjection",
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
          "tired"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family03:a:d-4:s4:surface:0"
        ],
        "forbidAtomIds": [
          "family03:a:d-4:s0:surface:0"
        ]
      },
      "weight": 5,
      "priority": 38,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-4:surface:mid:interjection:emotional_only:block",
      "variantTarget": 3,
      "setFlags": [
        "d-4:surface:interjection_emotional_only_block"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "family03:beat_v2:b:d-5:surface:mid:interjection:allow:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "기록을 같이 놓고 말해야 합니다. 직접 납부로 바꾸자고 하고 실제로 한 차례만 낸 건 사실입니다.",
      "behaviorHint": "막히면 관계나 맥락을 방패로 삼아 끼어든다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "context",
      "actionFamily": "interjection",
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
          "tired"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d5.b.unlock.s3.receipt_followthrough_gap"
        ],
        "forbidAtomIds": [
          "family03:b:d-5:s5:surface:0"
        ]
      },
      "weight": 5,
      "priority": 38,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-5:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 3,
      "setFlags": [
        "d-5:surface:interjection_detail_rebuttal_allow"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "family03:beat_v2:b:d-5:surface:mid:interjection:block:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "이 대목은 짧게 넘길 일이 아닙니다. 직접 납부로 바꾸자고 하고 실제로 한 차례만 낸 건 사실입니다.",
      "behaviorHint": "막히면 관계나 맥락을 방패로 삼아 끼어든다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "context",
      "actionFamily": "interjection",
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
          "tired"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d5.b.unlock.s3.receipt_followthrough_gap"
        ],
        "forbidAtomIds": [
          "family03:b:d-5:s5:surface:0"
        ]
      },
      "weight": 5,
      "priority": 38,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-5:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 3,
      "setFlags": [
        "d-5:surface:interjection_detail_rebuttal_block"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    }
  ]
} as const;

export default family03BeatsV2Full;
