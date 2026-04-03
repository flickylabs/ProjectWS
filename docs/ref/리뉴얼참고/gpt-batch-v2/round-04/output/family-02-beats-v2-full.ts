export const family02BeatsV2Full = {
  "caseId": "family-02",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 53,
    "byActionFamily": {
      "question": 25,
      "evidence": 6,
      "fatigue": 6,
      "free_question": 4,
      "interjection": 12
    },
    "byResponseIntent": {
      "pressure_response": 20,
      "rapport_response": 8,
      "evidence_response": 6,
      "fatigue_response": 6,
      "motive_response": 5,
      "trap_confusion_response": 8
    },
    "byDispute": {
      "d-1": 23,
      "d-2": 10,
      "d-3": 6,
      "d-4": 8,
      "d-5": 6
    },
    "interjectionInfoLevels": {
      "emotional_only": 4,
      "detail_rebuttal": 4,
      "misbelief_escalation": 4
    },
    "fatigueByDispute": {
      "d-1": 3,
      "d-2": 3
    }
  },
  "beats": [
    {
      "id": "family02:beat_v2:b:d-1:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "누가 직접 움직였는지부터 섞지 말아 주십시오. 자료를 밖으로 뿌린 적은 없다.",
      "behaviorHint": "핵심 답을 조금 늦추며 맥락 설명으로 시간을 번다.",
      "applicableStates": [
        "S0",
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
          "family02:b:d-1:act:s0:0",
          "family02:b:d-1:rule:s0:1"
        ],
        "forbidAtomIds": [
          "family02:b:d-1:act:s5:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:identity",
      "coverageKey": "b:d-1:surface:early:pressure:identity",
      "variantTarget": 4,
      "setFlags": [
        "d-1:surface:identity_checked"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "family02:beat_v2:b:d-1:surface:pressure:identity:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "이름을 먼저 찍어 놓고 묻는 방식에는 동의하기 어렵습니다. 민지에게도 정식 자료를 넘긴 건 아니라서, 어머니가 말하는 배신 프레임은 과하다.",
      "behaviorHint": "핵심 답을 조금 늦추며 맥락 설명으로 시간을 번다.",
      "applicableStates": [
        "S0",
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
          "family02:b:d-1:act:s0:0",
          "family02:b:d-1:rule:s0:1"
        ],
        "forbidAtomIds": [
          "family02:b:d-1:act:s5:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:identity",
      "coverageKey": "b:d-1:surface:early:pressure:identity",
      "variantTarget": 4,
      "setFlags": [
        "d-1:surface:identity_checked"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "family02:beat_v2:b:d-1:surface:pressure:identity:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "사람을 특정하기 전에 실제 경유부터 보셔야 합니다. 그건 자료 전달이라기보다 집안 상황을 같이 정리하려고 잠깐 보여준 정도다.",
      "behaviorHint": "핵심 답을 조금 늦추며 맥락 설명으로 시간을 번다.",
      "applicableStates": [
        "S0",
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
          "family02:b:d-1:act:s0:0",
          "family02:b:d-1:rule:s0:1"
        ],
        "forbidAtomIds": [
          "family02:b:d-1:act:s5:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:identity",
      "coverageKey": "b:d-1:surface:early:pressure:identity",
      "variantTarget": 4,
      "setFlags": [
        "d-1:surface:identity_checked"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "family02:beat_v2:b:d-1:surface:pressure:identity:04",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "그걸 곧바로 제 몫이나 제 사람 문제로 묶으면 과합니다. 밖에 말하라고 준 건 아니니 원칙 위반으로까지 몰아가긴 억울하다.",
      "behaviorHint": "핵심 답을 조금 늦추며 맥락 설명으로 시간을 번다.",
      "applicableStates": [
        "S0",
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
          "family02:b:d-1:act:s0:0",
          "family02:b:d-1:rule:s0:1"
        ],
        "forbidAtomIds": [
          "family02:b:d-1:act:s5:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:identity",
      "coverageKey": "b:d-1:surface:early:pressure:identity",
      "variantTarget": 4,
      "setFlags": [
        "d-1:surface:identity_checked"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "family02:beat_v2:b:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "시점부터 바로잡겠습니다. 자료를 밖으로 뿌린 적은 없다.",
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
          "family02:b:d-1:act:s0:0",
          "family02:b:d-1:act:s1:0"
        ],
        "forbidAtomIds": [
          "family02:b:d-1:act:s5:0"
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
      "id": "family02:beat_v2:b:d-1:surface:pressure:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "그때 순서를 잘못 잡으면 전부 다르게 보입니다. 민지에게도 정식 자료를 넘긴 건 아니라서, 어머니가 말하는 배신 프레임은 과하다.",
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
          "family02:b:d-1:act:s0:0",
          "family02:b:d-1:act:s1:0"
        ],
        "forbidAtomIds": [
          "family02:b:d-1:act:s5:0"
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
      "id": "family02:beat_v2:b:d-1:surface:pressure:timeline:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "날짜만 떼어 놓고 몰아가면 안 됩니다. 그건 자료 전달이라기보다 집안 상황을 같이 정리하려고 잠깐 보여준 정도다.",
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
          "family02:b:d-1:act:s0:0",
          "family02:b:d-1:act:s1:0"
        ],
        "forbidAtomIds": [
          "family02:b:d-1:act:s5:0"
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
      "id": "family02:beat_v2:b:d-1:surface:pressure:timeline:04",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "그 시점에는 그렇게 움직일 수밖에 없었습니다. 밖에 말하라고 준 건 아니니 원칙 위반으로까지 몰아가긴 억울하다.",
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
          "family02:b:d-1:act:s0:0",
          "family02:b:d-1:act:s1:0"
        ],
        "forbidAtomIds": [
          "family02:b:d-1:act:s5:0"
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
      "id": "family02:beat_v2:b:d-1:surface:pressure:timeline:05",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "시간 순서대로 보면 제 말이 왜곡되진 않습니다. 자료를 밖으로 뿌린 적은 없다.",
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
          "family02:b:d-1:act:s0:0",
          "family02:b:d-1:act:s1:0"
        ],
        "forbidAtomIds": [
          "family02:b:d-1:act:s5:0"
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
      "id": "family02:beat_v2:b:d-1:surface:pressure:timeline:06",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "앞뒤 시각을 같이 보셔야 합니다. 민지에게도 정식 자료를 넘긴 건 아니라서, 어머니가 말하는 배신 프레임은 과하다.",
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
          "family02:b:d-1:act:s0:0",
          "family02:b:d-1:act:s1:0"
        ],
        "forbidAtomIds": [
          "family02:b:d-1:act:s5:0"
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
      "id": "family02:beat_v2:b:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "책임을 피하려는 건 아니지만 비중은 구분돼야 합니다. 42초 클립은 보냈다. 하지만 맥락 파악하라고 보낸 거지, 밖으로 돌리라고 준 건 아니다.",
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
          "family02:b:d-1:rule:s3:1",
          "family02:b:d1.unlock.s3.0"
        ],
        "forbidAtomIds": [
          "family02:b:d-1:rule:s5:1"
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
      "id": "family02:beat_v2:b:d-1:motive:pressure:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "잘못이 없다는 말이 아니라, 누구 책임이 어디까지인지 나눠야 합니다. 내가 숨기려는 건 유출 의도지, 민지와 상의한 사실 자체는 아니다.",
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
          "family02:b:d-1:rule:s3:1",
          "family02:b:d1.unlock.s3.0"
        ],
        "forbidAtomIds": [
          "family02:b:d-1:rule:s5:1"
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
      "id": "family02:beat_v2:b:d-1:motive:pressure:responsibility:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "같은 사건이라도 제 몫과 상대 몫은 다르게 봐야 합니다. 클립하고 창고 등기, 부채표 링크까지 보낸 건 맞다.",
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
          "family02:b:d-1:rule:s3:1",
          "family02:b:d1.unlock.s3.0"
        ],
        "forbidAtomIds": [
          "family02:b:d-1:rule:s5:1"
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
      "id": "family02:beat_v2:b:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "지금은 변명보다 감정을 먼저 말씀드리는 게 맞겠습니다. 내가 먼저 바로 말 못 한 건, 아내 이야기까지 같이 꺼내는 순간 집안이 더 뒤집힐 것 같았기 때문이다.",
      "behaviorHint": "짧게 인정하고도 관계를 잃을까 봐 방어 문장을 붙인다.",
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
          "family02:b:d1.unlock.s4.0",
          "family02:b:d-1:act:s4:0"
        ],
        "forbidAtomIds": [
          "family02:b:d-1:act:s0:0"
        ]
      },
      "weight": 5,
      "priority": 23,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:rapport:emotion",
      "coverageKey": "b:d-1:core:late:rapport:emotion",
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
      "id": "family02:beat_v2:b:d-1:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "여기까지 오면 사실보다 먼저 남는 감정이 있습니다. 배신한 아들이자 아내도 못 지키는 남편처럼 보일까 봐 시간을 벌었다.",
      "behaviorHint": "짧게 인정하고도 관계를 잃을까 봐 방어 문장을 붙인다.",
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
          "family02:b:d1.unlock.s4.0",
          "family02:b:d-1:act:s4:0"
        ],
        "forbidAtomIds": [
          "family02:b:d-1:act:s0:0"
        ]
      },
      "weight": 5,
      "priority": 23,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:rapport:emotion",
      "coverageKey": "b:d-1:core:late:rapport:emotion",
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
      "id": "family02:beat_v2:b:d-1:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "공유 로그 기준으로 보면 사람과 경로를 다시 나눠야 합니다. 42초 클립은 보냈다. 하지만 맥락 파악하라고 보낸 거지, 밖으로 돌리라고 준 건 아니다.",
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
          "family02:b:d1.unlock.s3.0",
          "family02:b:d1.unlock.s2.0"
        ],
        "forbidAtomIds": [
          "family02:b:d-1:act:s5:0"
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
      "id": "family02:beat_v2:b:d-1:motive:evidence:identity:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "공유 로그이 나오면 누가 무엇을 했는지 범위를 줄일 수 있습니다. 내가 숨기려는 건 유출 의도지, 민지와 상의한 사실 자체는 아니다.",
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
          "family02:b:d1.unlock.s3.0",
          "family02:b:d1.unlock.s2.0"
        ],
        "forbidAtomIds": [
          "family02:b:d-1:act:s5:0"
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
      "id": "family02:beat_v2:b:d-1:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "같은 순서 질문을 몇 번이나 더 해야 합니까. 42초 클립은 보냈다. 하지만 맥락 파악하라고 보낸 거지, 밖으로 돌리라고 준 건 아니다.",
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
          "family02:b:d1.unlock.s2.0"
        ],
        "forbidAtomIds": [
          "family02:b:d-1:act:s5:0"
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
      "id": "family02:beat_v2:b:d-1:surface:fatigue:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "계속 시점만 반복되면 저도 지칠 수밖에 없습니다. 내가 숨기려는 건 유출 의도지, 민지와 상의한 사실 자체는 아니다.",
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
          "family02:b:d1.unlock.s2.0"
        ],
        "forbidAtomIds": [
          "family02:b:d-1:act:s5:0"
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
      "id": "family02:beat_v2:b:d-1:surface:fatigue:timeline:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "그 부분은 이미 여러 번 말했습니다. 클립하고 창고 등기, 부채표 링크까지 보낸 건 맞다.",
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
          "family02:b:d1.unlock.s2.0"
        ],
        "forbidAtomIds": [
          "family02:b:d-1:act:s5:0"
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
      "id": "family02:beat_v2:a:d-2:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "제가 왜 그 해석을 붙들었는지까지는 들어보셔야 합니다. 문의메일과 창고 등기 PDF까지 돌았다면, 선우가 최소한 바깥으로 나갈 길은 열어준 셈이다.",
      "behaviorHint": "가족 서열과 책임을 한 문장에 묶어 압박한다.",
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
          "family02:a:d-2:context:s2:1",
          "family02:a:d2.unlock.s3.0"
        ],
        "forbidAtomIds": [
          "family02:a:d-2:context:s5:1"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:motive:motive",
      "coverageKey": "a:d-2:motive:mid:motive:motive",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:motive_opened"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-2:motive:evidence_shown"
      ]
    },
    {
      "id": "family02:beat_v2:a:d-2:motive:motive:motive:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "의도만 따로 떼면 더 나쁘게 보일 수 있지만, 제 동기는 이랬습니다. 직접 메일을 보낸 손이 아니더라도 자기 쪽 파일 관리 책임까지 없어지는 건 아니다.",
      "behaviorHint": "가족 서열과 책임을 한 문장에 묶어 압박한다.",
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
          "family02:a:d-2:context:s2:1",
          "family02:a:d2.unlock.s3.0"
        ],
        "forbidAtomIds": [
          "family02:a:d-2:context:s5:1"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:motive:motive",
      "coverageKey": "a:d-2:motive:mid:motive:motive",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:motive_opened"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-2:motive:evidence_shown"
      ]
    },
    {
      "id": "family02:beat_v2:a:d-2:motive:motive:motive:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "그 선택의 배경을 말하자면 결국 여기로 옵니다. 직접 거래처에 말한 사람이 선우가 아닐 수는 있어도, 민지 쪽으로 건너간 뒤 외부 문의가 이어진 흐름은 선우가 부른 불씨다.",
      "behaviorHint": "가족 서열과 책임을 한 문장에 묶어 압박한다.",
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
          "family02:a:d-2:context:s2:1",
          "family02:a:d2.unlock.s3.0"
        ],
        "forbidAtomIds": [
          "family02:a:d-2:context:s5:1"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:motive:motive",
      "coverageKey": "a:d-2:motive:mid:motive:motive",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:motive_opened"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-2:motive:evidence_shown"
      ]
    },
    {
      "id": "family02:beat_v2:a:d-2:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "문의메일과 창고 등기 PDF까지 돌았다면, 선우가 최소한 바깥으로 나갈 길은 열어준 셈이다.",
      "behaviorHint": "증거를 마주하면 톤은 낮아지지만 체면을 지키려는 압박이 남아 있다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "evidence_response",
      "angleTag": "context",
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
          "family02:a:d2.unlock.s2.0",
          "family02:a:d-2:context:s3:1"
        ],
        "forbidAtomIds": [
          "family02:a:d-2:context:s5:1"
        ]
      },
      "weight": 4,
      "priority": 34,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:evidence:context",
      "coverageKey": "a:d-2:motive:mid:evidence:context",
      "variantTarget": 2,
      "setFlags": [
        "d-2:motive:evidence_shown"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-2:motive:evidence_shown"
      ]
    },
    {
      "id": "family02:beat_v2:a:d-2:motive:evidence:context:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "직접 메일을 보낸 손이 아니더라도 자기 쪽 파일 관리 책임까지 없어지는 건 아니다.",
      "behaviorHint": "증거를 마주하면 톤은 낮아지지만 체면을 지키려는 압박이 남아 있다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "evidence_response",
      "angleTag": "context",
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
          "family02:a:d2.unlock.s2.0",
          "family02:a:d-2:context:s3:1"
        ],
        "forbidAtomIds": [
          "family02:a:d-2:context:s5:1"
        ]
      },
      "weight": 4,
      "priority": 34,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:evidence:context",
      "coverageKey": "a:d-2:motive:mid:evidence:context",
      "variantTarget": 2,
      "setFlags": [
        "d-2:motive:evidence_shown"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-2:motive:evidence_shown"
      ]
    },
    {
      "id": "family02:beat_v2:a:d-2:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "계속 같은 책임 질문이면 저도 방어적으로 나올 수밖에 없습니다. 문의메일과 창고 등기 PDF까지 돌았다면, 선우가 최소한 바깥으로 나갈 길은 열어준 셈이다.",
      "behaviorHint": "같은 질문이 이어지자 말끝이 더 거칠어지고 권위로 버틴다.",
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
          "family02:a:d-2:context:s3:1"
        ],
        "forbidAtomIds": [
          "family02:a:d-2:context:s5:1"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:fatigue:responsibility",
      "coverageKey": "a:d-2:surface:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:fatigue_2_seen"
      ],
      "tags": [
        "fatigue",
        "second_pass"
      ]
    },
    {
      "id": "family02:beat_v2:a:d-2:surface:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "잘못이 없다는 뜻이 아니라, 같은 지점을 또 찌르면 말문이 막힙니다. 직접 메일을 보낸 손이 아니더라도 자기 쪽 파일 관리 책임까지 없어지는 건 아니다.",
      "behaviorHint": "같은 질문이 이어지자 말끝이 더 거칠어지고 권위로 버틴다.",
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
          "family02:a:d-2:context:s3:1"
        ],
        "forbidAtomIds": [
          "family02:a:d-2:context:s5:1"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:fatigue:responsibility",
      "coverageKey": "a:d-2:surface:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:fatigue_3_seen"
      ],
      "tags": [
        "fatigue",
        "third_pass"
      ]
    },
    {
      "id": "family02:beat_v2:a:d-2:surface:fatigue:responsibility:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "더 몰아붙여도 책임선이 달라지진 않습니다. 직접 거래처에 말한 사람이 선우가 아닐 수는 있어도, 민지 쪽으로 건너간 뒤 외부 문의가 이어진 흐름은 선우가 부른 불씨다.",
      "behaviorHint": "같은 질문이 이어지자 말끝이 더 거칠어지고 권위로 버틴다.",
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
          "family02:a:d-2:context:s3:1"
        ],
        "forbidAtomIds": [
          "family02:a:d-2:context:s5:1"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:fatigue:responsibility",
      "coverageKey": "a:d-2:surface:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:fatigue_spike_seen"
      ],
      "tags": [
        "fatigue",
        "high_fatigue"
      ]
    },
    {
      "id": "family02:beat_v2:a:d-3:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "책임을 피하려는 건 아니지만 비중은 구분돼야 합니다. 화면을 본 건 맞다. 하지만 그건 이미 선우가 자료를 밖으로 돌린 정황이 보여서 확인한 수준이었다.",
      "behaviorHint": "가족 서열과 책임을 한 문장에 묶어 압박한다.",
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
          "family02:a:d-3:relationship:s3:1",
          "family02:a:d-3:relationship:s2:1"
        ],
        "forbidAtomIds": [
          "family02:a:d-3:relationship:s5:1"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:pressure:responsibility",
      "coverageKey": "a:d-3:motive:mid:pressure:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-3:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-3:motive:evidence_shown"
      ]
    },
    {
      "id": "family02:beat_v2:a:d-3:motive:pressure:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "잘못이 없다는 말이 아니라, 누구 책임이 어디까지인지 나눠야 합니다. 그 상황에서 어른들한테 먼저 알린 걸 무단 열람처럼만 몰아붙이는 건 과하다.",
      "behaviorHint": "가족 서열과 책임을 한 문장에 묶어 압박한다.",
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
          "family02:a:d-3:relationship:s3:1",
          "family02:a:d-3:relationship:s2:1"
        ],
        "forbidAtomIds": [
          "family02:a:d-3:relationship:s5:1"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:pressure:responsibility",
      "coverageKey": "a:d-3:motive:mid:pressure:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-3:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-3:motive:evidence_shown"
      ]
    },
    {
      "id": "family02:beat_v2:a:d-3:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "태블릿 로그을 기준으로 보면 허용된 선과 넘은 선이 갈립니다. 화면을 본 건 맞다. 하지만 그건 이미 선우가 자료를 밖으로 돌린 정황이 보여서 확인한 수준이었다.",
      "behaviorHint": "증거를 마주하면 톤은 낮아지지만 체면을 지키려는 압박이 남아 있다.",
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
          "family02:a:d3.unlock.s3.0",
          "family02:a:d3.unlock.s2.0"
        ],
        "forbidAtomIds": [
          "family02:a:d-3:act:s5:0"
        ]
      },
      "weight": 4,
      "priority": 34,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:evidence:legality",
      "coverageKey": "a:d-3:motive:mid:evidence:legality",
      "variantTarget": 2,
      "setFlags": [
        "d-3:motive:evidence_shown"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-3:motive:evidence_shown"
      ]
    },
    {
      "id": "family02:beat_v2:a:d-3:motive:evidence:legality:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "태블릿 로그이 나오면 절차 위반을 피해 가긴 어렵습니다. 그 상황에서 어른들한테 먼저 알린 걸 무단 열람처럼만 몰아붙이는 건 과하다.",
      "behaviorHint": "증거를 마주하면 톤은 낮아지지만 체면을 지키려는 압박이 남아 있다.",
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
          "family02:a:d3.unlock.s3.0",
          "family02:a:d3.unlock.s2.0"
        ],
        "forbidAtomIds": [
          "family02:a:d-3:act:s5:0"
        ]
      },
      "weight": 4,
      "priority": 34,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:evidence:legality",
      "coverageKey": "a:d-3:motive:mid:evidence:legality",
      "variantTarget": 2,
      "setFlags": [
        "d-3:motive:evidence_shown"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-3:motive:evidence_shown"
      ]
    },
    {
      "id": "family02:beat_v2:a:d-4:motive:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "그 단서는 맥락을 빼면 바로 오해로 갑니다. 42초 클립만 놓고 보면 단독 승계처럼 들린다는 내 판단 자체가 완전히 무리한 건 아니다.",
      "behaviorHint": "가족 서열과 책임을 한 문장에 묶어 압박한다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
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
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family02:a:d4.unlock.s3.0",
          "family02:a:d4.unlock.s2.0"
        ],
        "forbidAtomIds": [
          "family02:a:d-4:quote:s5:0"
        ]
      },
      "weight": 4,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:trap:context",
      "coverageKey": "a:d-4:motive:mid:trap:context",
      "variantTarget": 2,
      "setFlags": [
        "d-4:motive:context_pressed"
      ],
      "tags": [
        "mid",
        "red_herring"
      ],
      "beliefMode": "weaponizes"
    },
    {
      "id": "family02:beat_v2:a:d-4:motive:trap:context:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "보이는 장면보다 앞뒤 문맥이 더 큽니다. 문제는 그 클립이 잘려 나가면서 나머지 맥락이 빠졌다는 점이지, 내가 허공에서 만들어 낸 해석만은 아니다.",
      "behaviorHint": "가족 서열과 책임을 한 문장에 묶어 압박한다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
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
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family02:a:d4.unlock.s3.0",
          "family02:a:d4.unlock.s2.0"
        ],
        "forbidAtomIds": [
          "family02:a:d-4:quote:s5:0"
        ]
      },
      "weight": 4,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:trap:context",
      "coverageKey": "a:d-4:motive:mid:trap:context",
      "variantTarget": 2,
      "setFlags": [
        "d-4:motive:context_pressed"
      ],
      "tags": [
        "mid",
        "red_herring"
      ],
      "beliefMode": "weaponizes"
    },
    {
      "id": "family02:beat_v2:b:d-4:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "emotional",
      "line": "오해가 풀리기 시작하니 남는 건 감정뿐입니다. 제가 그 말을 붙잡은 건 욕심도 있지만, 계속 아버지 앞에서 증명해야 한다는 압박이 너무 컸기 때문이다.",
      "behaviorHint": "짧게 인정하고도 관계를 잃을까 봐 방어 문장을 붙인다.",
      "applicableStates": [
        "S3",
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
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
        ],
        "misconceptionStates": [
          "M3",
          "M4"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family02:b:d4.unlock.s4.0",
          "family02:b:d-4:quote:s4:0"
        ],
        "forbidAtomIds": [
          "family02:b:d-4:quote:s0:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:core:trap:emotion",
      "coverageKey": "b:d-4:core:late:trap:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-4:core:emotion_window"
      ],
      "tags": [
        "late",
        "red_herring"
      ],
      "requiresFlags": [
        "d-4:motive:context_pressed"
      ],
      "beliefMode": "misbelief"
    },
    {
      "id": "family02:beat_v2:b:d-4:core:trap:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "emotional",
      "line": "이쯤 되면 확신보다 부끄러움이 먼저 남습니다. 현장을 맡고도 인정받지 못할까 봐, 그 한 문장을 확정처럼 끌어안았다.",
      "behaviorHint": "짧게 인정하고도 관계를 잃을까 봐 방어 문장을 붙인다.",
      "applicableStates": [
        "S3",
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
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
        ],
        "misconceptionStates": [
          "M3",
          "M4"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family02:b:d4.unlock.s4.0",
          "family02:b:d-4:quote:s4:0"
        ],
        "forbidAtomIds": [
          "family02:b:d-4:quote:s0:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:core:trap:emotion",
      "coverageKey": "b:d-4:core:late:trap:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-4:core:emotion_window"
      ],
      "tags": [
        "late",
        "red_herring"
      ],
      "requiresFlags": [
        "d-4:motive:context_pressed"
      ],
      "beliefMode": "misbelief"
    },
    {
      "id": "family02:beat_v2:a:d-5:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "책임을 피하려는 건 아니지만 비중은 구분돼야 합니다. 내 말이 넓어진 건 인정한다. 그래도 시작은 선우가 배우자에게 자료를 준 데서 비롯됐다.",
      "behaviorHint": "가족 서열과 책임을 한 문장에 묶어 압박한다.",
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
          "family02:a:d5.unlock.s3.0",
          "family02:a:d-5:harm:s3:1"
        ],
        "forbidAtomIds": [
          "family02:a:d-5:harm:s5:1"
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
      "id": "family02:beat_v2:a:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "emotional",
      "line": "지금은 감정 쪽을 피하지 않겠습니다. 그때는 공장이 팔린다는 소문이 너무 무서워서라도 누군가 붙잡고 확인하고 싶었다.",
      "behaviorHint": "답을 피하려다도 자신이 지킨 질서를 말할 때는 단호해진다.",
      "applicableStates": [
        "S4",
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
          "family02:a:d5.unlock.s4.0",
          "family02:a:d-5:rule:s4:0"
        ],
        "forbidAtomIds": [
          "family02:a:d-5:harm:s0:1"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:rapport:emotion",
      "coverageKey": "a:d-5:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-5:core:emotion_window"
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
      "id": "family02:beat_v2:a:d-5:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "emotional",
      "line": "그 질문을 받으니 결국 이 마음을 말하게 됩니다. 나는 가족을 지키려는 마음으로 움직였다고 믿고 싶어서 내 잘못을 끝까지 축소했다.",
      "behaviorHint": "답을 피하려다도 자신이 지킨 질서를 말할 때는 단호해진다.",
      "applicableStates": [
        "S4",
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
          "family02:a:d5.unlock.s4.0",
          "family02:a:d-5:rule:s4:0"
        ],
        "forbidAtomIds": [
          "family02:a:d-5:harm:s0:1"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:rapport:emotion",
      "coverageKey": "a:d-5:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-5:core:emotion_window"
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
      "id": "family02:beat_v2:b:d-5:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confess",
      "line": "그 질문이라면 더 숨기지 않겠습니다. 제가 그 원칙을 굳이 예외 처리한 건, 아내 앞에서도 공장 일을 다 숨기면 더 큰 불신이 생길까 두려워서였다.",
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
          "family02:b:d-5:rule:s5:0",
          "family02:b:d5.unlock.s4.0"
        ],
        "forbidAtomIds": [
          "family02:b:d-5:rule:s0:0"
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
      "id": "family02:beat_v2:b:d-5:core:motive:motive:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confess",
      "line": "돌려 말하지 않고 동기부터 말씀드리겠습니다. 가업과 결혼 사이에서 둘 중 하나를 선택하라는 느낌이 들어서 저는 편한 쪽으로 규칙을 바꿨다.",
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
          "family02:b:d-5:rule:s5:0",
          "family02:b:d5.unlock.s4.0"
        ],
        "forbidAtomIds": [
          "family02:b:d-5:rule:s0:0"
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
      "id": "family02:beat_v2:a:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "잠깐만요, 내가 화가 난 건 자료 자체만이 아니라, 선우가 배우자를 사실상 경영 안쪽으로 들여놓고도 숨겼다는 점이다.",
      "behaviorHint": "순간적으로 발언권을 빼앗으려 들며 공개 검증의 어조를 꺼낸다.",
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
          "family02:a:d1.unlock.s4.0"
        ],
        "forbidAtomIds": [
          "family02:a:d-1:act:s0:0"
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
      "id": "family02:beat_v2:b:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "잠깐만요, 내가 먼저 바로 말 못 한 건, 아내 이야기까지 같이 꺼내는 순간 집안이 더 뒤집힐 것 같았기 때문이다.",
      "behaviorHint": "막히면 관계나 맥락을 방패로 삼아 끼어든다.",
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
          "family02:b:d1.unlock.s4.0"
        ],
        "forbidAtomIds": [
          "family02:b:d-1:act:s0:0"
        ]
      },
      "weight": 5,
      "priority": 38,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-1:surface:mid:interjection:emotional_only:allow",
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
      "id": "family02:beat_v2:b:d-1:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "금액과 시각부터 다시 보셔야 합니다. 내가 숨기려는 건 유출 의도지, 민지와 상의한 사실 자체는 아니다.",
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
          "family02:b:d1.unlock.s3.0"
        ],
        "forbidAtomIds": [
          "family02:b:d-1:act:s5:0"
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
      "id": "family02:beat_v2:b:d-2:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "그렇게 끊으셔도 감정이 사라지진 않습니다. 아내 쪽을 바로 말 못 한 건, 제가 배신한 남편이 되는 순간 집안도 결혼도 같이 깨질 것 같았기 때문이다.",
      "behaviorHint": "막히면 관계나 맥락을 방패로 삼아 끼어든다.",
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
          "family02:b:d2.unlock.s4.0"
        ],
        "forbidAtomIds": [
          "family02:b:d-2:evidence:s0:0"
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
      "id": "family02:beat_v2:b:d-2:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "세부를 끊어도 숫자와 로그는 안 없어집니다. 내가 직접 보낸 건 아니라는 말은 분명히 할 수 있고, 그 점 때문에 계속 버틴다.",
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
          "family02:b:d2.unlock.s3.0"
        ],
        "forbidAtomIds": [
          "family02:b:d-2:context:s5:1"
        ]
      },
      "weight": 5,
      "priority": 38,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-2:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:interjection_detail_rebuttal_block"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "family02:beat_v2:a:d-3:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "금액과 시각부터 다시 보셔야 합니다. 그 상황에서 어른들한테 먼저 알린 걸 무단 열람처럼만 몰아붙이는 건 과하다.",
      "behaviorHint": "순간적으로 발언권을 빼앗으려 들며 공개 검증의 어조를 꺼낸다.",
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
          "family02:a:d3.unlock.s3.0"
        ],
        "forbidAtomIds": [
          "family02:a:d-3:act:s5:0"
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
      "id": "family02:beat_v2:a:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "emotional",
      "line": "그렇게 끊으셔도 감정이 사라지진 않습니다. 그 아침엔 남편 건강 얘기, 공장 소문, 며느리 화면이 한꺼번에 겹쳐서 내가 너무 몰려 있었다.",
      "behaviorHint": "순간적으로 발언권을 빼앗으려 들며 공개 검증의 어조를 꺼낸다.",
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
          "family02:a:d3.unlock.s4.0"
        ],
        "forbidAtomIds": [
          "family02:a:d-3:act:s0:0"
        ]
      },
      "weight": 5,
      "priority": 38,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-3:surface:mid:interjection:emotional_only:block",
      "variantTarget": 3,
      "setFlags": [
        "d-3:surface:interjection_emotional_only_block"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "family02:beat_v2:a:d-4:surface:mid:interjection:allow:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "한 줄이나 한 장면만 붙들면 오해가 더 굳습니다. 전체 녹취에 임시 운영 취지 말이 붙어 있는 건 안다.",
      "behaviorHint": "순간적으로 발언권을 빼앗으려 들며 공개 검증의 어조를 꺼낸다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
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
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family02:a:d4.unlock.s3.0"
        ],
        "forbidAtomIds": [
          "family02:a:d-4:quote:s5:0"
        ]
      },
      "weight": 5,
      "priority": 38,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-4:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 3,
      "setFlags": [
        "d-4:surface:interjection_misbelief_escalation_allow"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "misbelief_escalation",
        "red_herring"
      ],
      "beliefMode": "weaponizes"
    },
    {
      "id": "family02:beat_v2:a:d-4:surface:mid:interjection:block:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "막는다고 해서 그 해석이 사실이 되진 않습니다. 42초 클립을 단독 승계 선언처럼 말한 건 내 과장이었다.",
      "behaviorHint": "순간적으로 발언권을 빼앗으려 들며 공개 검증의 어조를 꺼낸다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
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
        ],
        "misconceptionStates": [
          "M2",
          "M3"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family02:a:d4.unlock.s3.0"
        ],
        "forbidAtomIds": [
          "family02:a:d-4:quote:s5:0"
        ]
      },
      "weight": 5,
      "priority": 38,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-4:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 3,
      "setFlags": [
        "d-4:surface:interjection_misbelief_escalation_block"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "misbelief_escalation",
        "red_herring"
      ],
      "beliefMode": "weaponizes"
    },
    {
      "id": "family02:beat_v2:b:d-4:surface:mid:interjection:allow:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "한 줄이나 한 장면만 붙들면 오해가 더 굳습니다. 전체 녹취를 보면 지분이랑 상속은 나중이라 한 건 맞다.",
      "behaviorHint": "막히면 관계나 맥락을 방패로 삼아 끼어든다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
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
        ],
        "misconceptionStates": [
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family02:b:d4.unlock.s2.0"
        ],
        "forbidAtomIds": [
          "family02:b:d-4:quote:s5:0"
        ]
      },
      "weight": 5,
      "priority": 38,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-4:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 3,
      "setFlags": [
        "d-4:surface:interjection_misbelief_escalation_allow"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "misbelief_escalation",
        "red_herring"
      ],
      "beliefMode": "misbelief"
    },
    {
      "id": "family02:beat_v2:b:d-4:surface:mid:interjection:block:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "막는다고 해서 그 해석이 사실이 되진 않습니다. 단독 승계 확정은 아니었다.",
      "behaviorHint": "막히면 관계나 맥락을 방패로 삼아 끼어든다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
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
        ],
        "misconceptionStates": [
          "M3",
          "M4"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family02:b:d4.unlock.s2.0"
        ],
        "forbidAtomIds": [
          "family02:b:d-4:quote:s5:0"
        ]
      },
      "weight": 5,
      "priority": 38,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-4:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 3,
      "setFlags": [
        "d-4:surface:interjection_misbelief_escalation_block"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "misbelief_escalation",
        "red_herring"
      ],
      "beliefMode": "misbelief"
    },
    {
      "id": "family02:beat_v2:a:d-5:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "세부를 끊어도 숫자와 로그는 안 없어집니다. 원칙을 먼저 흔든 사람과 뒤에 대응하다 선을 넘은 사람의 책임까지 같다고 말하긴 어렵다.",
      "behaviorHint": "순간적으로 발언권을 빼앗으려 들며 공개 검증의 어조를 꺼낸다.",
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
          "family02:a:d5.unlock.s2.0"
        ],
        "forbidAtomIds": [
          "family02:a:d-5:rule:s5:0"
        ]
      },
      "weight": 5,
      "priority": 38,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-5:surface:mid:interjection:detail_rebuttal:block",
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

export default family02BeatsV2Full;
