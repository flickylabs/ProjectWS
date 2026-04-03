export const neighbor03BeatsV2Full = {
  "caseId": "neighbor-03",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 58,
    "byActionFamily": {
      "question": 32,
      "evidence": 4,
      "fatigue": 6,
      "free_question": 4,
      "interjection": 12
    },
    "byParty": {
      "a": 29,
      "b": 29
    },
    "byDispute": {
      "d-1": 13,
      "d-3": 7,
      "d-5": 20,
      "d-2": 13,
      "d-4": 5
    },
    "interjectionCount": 12,
    "fatigueCount": 6,
    "freeQuestionCount": 4,
    "coverageKeyCount": 56,
    "coverageKeys": [
      "a:d-1:core:late:motive:motive",
      "a:d-1:core:late:rapport:emotion",
      "a:d-1:motive:mid:fatigue:responsibility",
      "a:d-1:motive:mid:motive:motive",
      "a:d-1:motive:mid:pressure:responsibility",
      "a:d-1:surface:early:pressure:context",
      "a:d-1:surface:early:pressure:identity",
      "a:d-1:surface:early:pressure:timeline",
      "a:d-1:surface:mid:evidence:legality",
      "a:d-1:surface:mid:fatigue:responsibility",
      "a:d-1:surface:mid:fatigue:timeline",
      "a:d-1:surface:mid:interjection:detail_rebuttal:allow",
      "a:d-1:surface:mid:interjection:emotional_only:allow",
      "a:d-3:core:late:trap:emotion",
      "a:d-3:motive:late:trap:context",
      "a:d-3:surface:early:trap:context",
      "a:d-3:surface:early:trap:identity",
      "a:d-3:surface:mid:interjection:trap_signal:allow",
      "a:d-4:surface:mid:interjection:misbelief_escalation:block",
      "a:d-5:core:late:rapport:emotion",
      "a:d-5:motive:mid:motive:motive",
      "a:d-5:motive:mid:pressure:responsibility",
      "a:d-5:surface:early:pressure:context",
      "a:d-5:surface:early:pressure:identity",
      "a:d-5:surface:early:pressure:timeline",
      "a:d-5:surface:mid:evidence:legality",
      "a:d-5:surface:mid:interjection:detail_rebuttal:block",
      "a:d-5:surface:mid:interjection:emotional_only:block",
      "b:d-2:core:late:motive:motive",
      "b:d-2:core:late:rapport:emotion",
      "b:d-2:motive:mid:fatigue:responsibility",
      "b:d-2:motive:mid:motive:motive",
      "b:d-2:motive:mid:pressure:responsibility",
      "b:d-2:surface:early:pressure:context",
      "b:d-2:surface:early:pressure:identity",
      "b:d-2:surface:early:pressure:timeline",
      "b:d-2:surface:mid:evidence:identity",
      "b:d-2:surface:mid:fatigue:responsibility",
      "b:d-2:surface:mid:fatigue:timeline",
      "b:d-2:surface:mid:interjection:detail_rebuttal:allow",
      "b:d-2:surface:mid:interjection:emotional_only:allow",
      "b:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "b:d-3:surface:mid:interjection:trap_signal:block",
      "b:d-4:core:late:trap:emotion",
      "b:d-4:motive:late:trap:context",
      "b:d-4:surface:early:trap:context",
      "b:d-4:surface:early:trap:identity",
      "b:d-5:core:late:rapport:emotion",
      "b:d-5:motive:mid:motive:motive",
      "b:d-5:motive:mid:pressure:responsibility",
      "b:d-5:surface:early:pressure:context",
      "b:d-5:surface:early:pressure:identity",
      "b:d-5:surface:early:pressure:timeline",
      "b:d-5:surface:mid:evidence:legality",
      "b:d-5:surface:mid:interjection:detail_rebuttal:block",
      "b:d-5:surface:mid:interjection:emotional_only:block"
    ]
  },
  "beats": [
    {
      "id": "neighbor03:beat_v2:a:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "세척실 문은 급한 상황에서 잠깐 열린 것뿐이라 무단 사용까지는 아닙니다.",
      "behaviorHint": "답을 짧게 끊고 장면 순서만 남기려 든다.",
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
          "guarded"
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
          "neighbor03:a:d-1:denial:0",
          "neighbor03:a:d-1:timeline:0"
        ],
        "forbidAtomIds": [
          "neighbor03:a:d-1:unlock:s5:0",
          "neighbor03:a:d-1:unlock:s4:0",
          "neighbor03:a:d-1:motive:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:timeline",
      "coverageKey": "a:d-1:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot",
        "hot"
      ]
    },
    {
      "id": "neighbor03:beat_v2:a:d-1:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "그게 직원용 코드였는지부터 따질 문제는 아닙니다. 그 시점엔 문을 열 수밖에 없었다는 얘기입니다.",
      "behaviorHint": "답을 짧게 끊고 장면 순서만 남기려 든다.",
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
          "guarded"
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
          "neighbor03:a:d-1:rule:0",
          "neighbor03:a:d-1:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor03:a:d-1:unlock:s5:0",
          "neighbor03:a:d-1:unlock:s4:0",
          "neighbor03:a:d-1:motive:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:context",
      "coverageKey": "a:d-1:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:context_pressed"
      ],
      "tags": [
        "hot",
        "hot"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ]
    },
    {
      "id": "neighbor03:beat_v2:a:d-1:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 직원용 코드인지보다 그때 잠깐 열 수밖에 있었는지가 더 중요합니다.",
      "behaviorHint": "답을 짧게 끊고 장면 순서만 남기려 든다.",
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
          "guarded"
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
          "neighbor03:a:d-1:rule:0",
          "neighbor03:a:d-1:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor03:a:d-1:unlock:s5:0",
          "neighbor03:a:d-1:unlock:s4:0",
          "neighbor03:a:d-1:motive:0"
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
        "hot",
        "hot"
      ]
    },
    {
      "id": "neighbor03:beat_v2:a:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "로그가 그렇게 찍혔다면 제가 누른 건 맞습니다. 다만 안이 빈 줄 알고 잠깐 연 겁니다.",
      "behaviorHint": "책임선을 좁히며 상대 해석을 밀어낸다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor03:a:d-1:admission:0",
          "neighbor03:a:d-1:context:0",
          "neighbor03:a:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor03:a:d-1:admission:1",
          "neighbor03:a:d-1:unlock:s5:0",
          "neighbor03:a:d-1:motive:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:pressure:responsibility",
      "coverageKey": "a:d-1:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-1:motive:responsibility_named"
      ],
      "tags": [],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ]
    },
    {
      "id": "neighbor03:beat_v2:a:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "justify",
      "line": "마감 직전엔 다들 급하면 그렇게 처리하기도 합니다. 사고를 키운 건 그 뒤 동시 입실입니다.",
      "behaviorHint": "정당화와 섭섭함을 섞어 동기 설명으로 미끄러진다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor03:a:d-1:self_justification:0",
          "neighbor03:a:d-1:counter:0",
          "neighbor03:a:d-1:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "neighbor03:a:d-1:admission:1",
          "neighbor03:a:d-1:unlock:s5:0",
          "neighbor03:a:d-1:motive:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:motive:motive",
      "coverageKey": "a:d-1:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-1:motive:motive_named"
      ],
      "tags": [],
      "requiresFlags": [
        "d-1:surface:context_pressed"
      ]
    },
    {
      "id": "neighbor03:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "직원 권한을 훔쳐 쓴 사람처럼 보이는 게 제일 치욕적입니다. 하지만 그날 문을 먼저 연 건 제 판단 미스였습니다.",
      "behaviorHint": "목소리가 낮아지며 수치심이나 불안을 먼저 내비친다.",
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
          "agitated",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor03:a:d-1:shame:0",
          "neighbor03:a:d-1:responsibility:0",
          "neighbor03:a:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor03:a:d-1:denial:0",
          "neighbor03:a:d-1:rule:0",
          "neighbor03:a:d-1:timeline:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:emotion_named"
      ],
      "tags": [
        "late",
        "late"
      ],
      "requiresFlags": [
        "d-1:motive:motive_named"
      ]
    },
    {
      "id": "neighbor03:beat_v2:a:d-1:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "admit",
      "line": "로그가 그렇게 찍혔다면 제가 누른 건 맞습니다. 다만 안이 빈 줄 알고 잠깐 연 겁니다.",
      "behaviorHint": "자료를 흘끗 본 뒤 인정 범위를 계산해 말을 고른다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "fresh",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor03:a:d-1:admission:0",
          "neighbor03:a:d-1:context:0",
          "neighbor03:a:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor03:a:d-1:unlock:s5:0",
          "neighbor03:a:d-1:unlock:s4:0",
          "neighbor03:a:d-1:motive:0"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:evidence:legality",
      "coverageKey": "a:d-1:surface:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-1:surface:evidence_landed"
      ],
      "tags": [
        "evidence",
        "evidence"
      ]
    },
    {
      "id": "neighbor03:beat_v2:a:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "mistaken",
      "line": "겉으로 보인 건 분명 그쪽이었습니다. 원본 전체를 뽑을 권한이 없어서 보이는 장면만 전달한 겁니다. 취지는 상황 설명이었습니다.",
      "behaviorHint": "겉으로 보인 단서를 진실처럼 움켜쥔 채 해석을 반복한다.",
      "applicableStates": [
        "M0",
        "M1",
        "M2"
      ],
      "layer": "surface",
      "issueRole": "red_herring",
      "responseIntent": "trap_confusion_response",
      "angleTag": "identity",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "guarded"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "fresh",
          "wary"
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor03:a:d-3:denial:0",
          "neighbor03:a:d-3:context:0",
          "neighbor03:a:d-3:rule:0"
        ],
        "forbidAtomIds": [
          "neighbor03:a:d-3:unlock:s5:0",
          "neighbor03:a:d-3:fear:0",
          "neighbor03:a:d-3:unlock:s4:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:identity",
      "coverageKey": "a:d-3:surface:early:trap:identity",
      "variantTarget": 4,
      "setFlags": [
        "d-3:surface:misbelief_identity"
      ],
      "tags": [
        "trap",
        "red_herring"
      ],
      "beliefMode": "knows"
    },
    {
      "id": "neighbor03:beat_v2:a:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "mistaken",
      "line": "겉으로 보인 건 분명 그쪽이었습니다. 원본 전체를 뽑을 권한이 없어서 보이는 장면만 전달한 겁니다. 취지는 상황 설명이었습니다.",
      "behaviorHint": "겉으로 보인 단서를 진실처럼 움켜쥔 채 해석을 반복한다.",
      "applicableStates": [
        "M0",
        "M1",
        "M2"
      ],
      "layer": "surface",
      "issueRole": "red_herring",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "guarded"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "fresh",
          "wary"
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor03:a:d-3:denial:0",
          "neighbor03:a:d-3:context:0",
          "neighbor03:a:d-3:rule:0"
        ],
        "forbidAtomIds": [
          "neighbor03:a:d-3:unlock:s5:0",
          "neighbor03:a:d-3:fear:0",
          "neighbor03:a:d-3:unlock:s4:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:context",
      "coverageKey": "a:d-3:surface:early:trap:context",
      "variantTarget": 4,
      "setFlags": [
        "d-3:surface:misbelief_shaken"
      ],
      "tags": [
        "trap",
        "red_herring"
      ],
      "beliefMode": "knows"
    },
    {
      "id": "neighbor03:beat_v2:a:d-3:motive:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "doubt",
      "line": "그 장면만 떼면 몰라도, 제 쪽에서는 관리사무소 원본이 늦어질 것 같아서 먼저 보낸 겁니다. 서아 씨 행동이 더 직접적으로 보여서 그 부분을 앞세운 겁니다.",
      "behaviorHint": "겉으로 보인 단서를 진실처럼 움켜쥔 채 해석을 반복한다.",
      "applicableStates": [
        "M3",
        "M4"
      ],
      "layer": "motive",
      "issueRole": "red_herring",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "question",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ],
        "misconceptionStates": [
          "M3",
          "M4"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor03:a:d-3:counter:0",
          "neighbor03:a:d-3:evidence:0",
          "neighbor03:a:d-3:fear:0"
        ],
        "forbidAtomIds": [
          "neighbor03:a:d-3:context:0",
          "neighbor03:a:d-3:rule:0",
          "neighbor03:a:d-3:privacy:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:trap:context",
      "coverageKey": "a:d-3:motive:late:trap:context",
      "variantTarget": 2,
      "setFlags": [
        "d-3:motive:context_reframed"
      ],
      "tags": [
        "trap",
        "late",
        "red_herring"
      ],
      "beliefMode": "knows"
    },
    {
      "id": "neighbor03:beat_v2:a:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "clarify",
      "line": "솔직히 말하면 그 장면 하나로 상대를 몰아가면 안 됐다는 건 압니다. 다친 개를 봤을 때 저도 겁이 나서 제 쪽 방어부터 했습니다.",
      "behaviorHint": "겉으로 보인 단서를 진실처럼 움켜쥔 채 해석을 반복한다.",
      "applicableStates": [
        "M3",
        "M4"
      ],
      "layer": "core",
      "issueRole": "red_herring",
      "responseIntent": "trap_confusion_response",
      "angleTag": "emotion",
      "actionFamily": "question",
      "questionTypes": [
        "empathy_approach"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ],
        "misconceptionStates": [
          "M3",
          "M4"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor03:a:d-3:counter:0",
          "neighbor03:a:d-3:evidence:0",
          "neighbor03:a:d-3:fear:0"
        ],
        "forbidAtomIds": [
          "neighbor03:a:d-3:context:0",
          "neighbor03:a:d-3:rule:0",
          "neighbor03:a:d-3:privacy:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:trap:emotion",
      "coverageKey": "a:d-3:core:late:trap:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-3:core:emotion_reframed"
      ],
      "tags": [
        "trap",
        "late",
        "red_herring",
        "late"
      ],
      "beliefMode": "knows"
    },
    {
      "id": "neighbor03:beat_v2:a:d-5:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "절차를 먼저 깬 사람으로 몰릴 정도는 아닙니다. 사고가 난 뒤 영상부터 확인하려 한 것뿐입니다.",
      "behaviorHint": "답을 짧게 끊고 장면 순서만 남기려 든다.",
      "applicableStates": [
        "S0",
        "S1"
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
          "guarded"
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
          "neighbor03:a:d-5:denial:0",
          "neighbor03:a:d-5:context:0"
        ],
        "forbidAtomIds": [
          "neighbor03:a:d-5:admission:1",
          "neighbor03:a:d-5:shame:0",
          "neighbor03:a:d-5:unlock:s5:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:pressure:timeline",
      "coverageKey": "a:d-5:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-5:surface:timeline_pressed"
      ],
      "tags": [
        "hot",
        "hot"
      ]
    },
    {
      "id": "neighbor03:beat_v2:a:d-5:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "그날은 비도 많이 왔고 마감 직전이라 예외가 겹쳤습니다. 그걸 곧바로 절차 위반으로 보긴 어렵습니다.",
      "behaviorHint": "답을 짧게 끊고 장면 순서만 남기려 든다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "identity",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "guarded"
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
          "neighbor03:a:d-5:rule:0",
          "neighbor03:a:d-5:legacy_sentence:0"
        ],
        "forbidAtomIds": [
          "neighbor03:a:d-5:admission:1",
          "neighbor03:a:d-5:shame:0",
          "neighbor03:a:d-5:unlock:s5:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:pressure:identity",
      "coverageKey": "a:d-5:surface:early:pressure:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-5:surface:identity_pressed"
      ],
      "tags": [
        "hot",
        "hot"
      ],
      "requiresFlags": [
        "d-5:surface:timeline_pressed"
      ]
    },
    {
      "id": "neighbor03:beat_v2:a:d-5:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 그날은 비도 많이 왔고 마감 직전이라 예외가 겹친 겁니다. 절차 위반이라고 단정하긴 어렵습니다.",
      "behaviorHint": "답을 짧게 끊고 장면 순서만 남기려 든다.",
      "applicableStates": [
        "S0",
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
          "guarded"
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
          "neighbor03:a:d-5:rule:0",
          "neighbor03:a:d-5:legacy_sentence:0"
        ],
        "forbidAtomIds": [
          "neighbor03:a:d-5:admission:1",
          "neighbor03:a:d-5:shame:0",
          "neighbor03:a:d-5:unlock:s5:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:pressure:context",
      "coverageKey": "a:d-5:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-5:surface:context_pressed"
      ],
      "tags": [
        "hot",
        "hot"
      ]
    },
    {
      "id": "neighbor03:beat_v2:a:d-5:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "예약을 잡지 않고 먼저 들어간 건 맞습니다. 다만 사고 직후엔 상황 파악이 먼저라고 봤습니다.",
      "behaviorHint": "책임선을 좁히며 상대 해석을 밀어낸다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor03:a:d-5:admission:0",
          "neighbor03:a:d-5:context:1",
          "neighbor03:a:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor03:a:d-5:admission:1",
          "neighbor03:a:d-5:unlock:s5:0",
          "neighbor03:a:d-5:relationship:1"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:pressure:responsibility",
      "coverageKey": "a:d-5:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:responsibility_named"
      ],
      "tags": [],
      "requiresFlags": [
        "d-5:surface:timeline_pressed"
      ]
    },
    {
      "id": "neighbor03:beat_v2:a:d-5:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "justify",
      "line": "서아 씨도 원본 확인 전에 단체방부터 돌렸습니다. 절차가 무너진 건 둘 다였습니다.",
      "behaviorHint": "정당화와 섭섭함을 섞어 동기 설명으로 미끄러진다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "sub_truth",
      "responseIntent": "motive_response",
      "angleTag": "motive",
      "actionFamily": "question",
      "questionTypes": [
        "motive_search"
      ],
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor03:a:d-5:counter:0",
          "neighbor03:a:d-5:rule:1",
          "neighbor03:a:d-5:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "neighbor03:a:d-5:admission:1",
          "neighbor03:a:d-5:unlock:s5:0",
          "neighbor03:a:d-5:relationship:1"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:motive:motive",
      "coverageKey": "a:d-5:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:motive_named"
      ],
      "tags": [],
      "requiresFlags": [
        "d-5:surface:identity_pressed"
      ]
    },
    {
      "id": "neighbor03:beat_v2:a:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "emotional",
      "line": "직원 권한을 훔쳐 쓴 사람처럼 보이는 게 제일 치욕적입니다. 하지만 그날 문을 먼저 연 건 제 판단 미스였습니다.",
      "behaviorHint": "목소리가 낮아지며 수치심이나 불안을 먼저 내비친다.",
      "applicableStates": [
        "S4",
        "S5"
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
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor03:a:d-5:shame:0",
          "neighbor03:a:d-5:relationship:0",
          "neighbor03:a:d-5:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor03:a:d-5:denial:0",
          "neighbor03:a:d-5:rule:0",
          "neighbor03:a:d-5:context:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:rapport:emotion",
      "coverageKey": "a:d-5:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-5:core:emotion_named"
      ],
      "tags": [
        "late",
        "late"
      ],
      "requiresFlags": [
        "d-5:motive:motive_named"
      ]
    },
    {
      "id": "neighbor03:beat_v2:a:d-5:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "admit",
      "line": "예약을 잡지 않고 먼저 들어간 건 맞습니다. 다만 사고 직후엔 상황 파악이 먼저라고 봤습니다.",
      "behaviorHint": "자료를 흘끗 본 뒤 인정 범위를 계산해 말을 고른다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "fresh",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor03:a:d-5:admission:0",
          "neighbor03:a:d-5:context:1",
          "neighbor03:a:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor03:a:d-5:admission:1",
          "neighbor03:a:d-5:shame:0",
          "neighbor03:a:d-5:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:evidence:legality",
      "coverageKey": "a:d-5:surface:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-5:surface:evidence_landed"
      ],
      "tags": [
        "evidence",
        "evidence"
      ]
    },
    {
      "id": "neighbor03:beat_v2:b:d-2:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "저는 문만 조금 연 거예요. 안에 누가 그렇게 가까이 서 있을 줄은 몰랐어요.",
      "behaviorHint": "답을 짧게 끊고 장면 순서만 남기려 든다.",
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
          "guarded"
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
          "neighbor03:b:d-2:denial:0",
          "neighbor03:b:d-2:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor03:b:d-2:shame:0",
          "neighbor03:b:d-2:responsibility:0",
          "neighbor03:b:d-2:unlock:s4:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:timeline",
      "coverageKey": "b:d-2:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:timeline_pressed"
      ],
      "tags": [
        "hot",
        "hot"
      ]
    },
    {
      "id": "neighbor03:beat_v2:b:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "잠깐 비 피하려던 거였고 줄도 완전히 푼 건 아니었어요. 너무 순식간이었어요.",
      "behaviorHint": "답을 짧게 끊고 장면 순서만 남기려 든다.",
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
          "guarded"
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
          "neighbor03:b:d-2:context:0",
          "neighbor03:b:d-2:act:0"
        ],
        "forbidAtomIds": [
          "neighbor03:b:d-2:shame:0",
          "neighbor03:b:d-2:responsibility:0",
          "neighbor03:b:d-2:unlock:s4:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:context",
      "coverageKey": "b:d-2:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:context_pressed"
      ],
      "tags": [
        "hot",
        "hot"
      ],
      "requiresFlags": [
        "d-2:surface:timeline_pressed"
      ]
    },
    {
      "id": "neighbor03:beat_v2:b:d-2:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 잠깐 비 피하려던 거였고 줄도 완전히 푼 건 아니었어요. 너무 순식간이었어요.",
      "behaviorHint": "답을 짧게 끊고 장면 순서만 남기려 든다.",
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
          "guarded"
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
          "neighbor03:b:d-2:context:0",
          "neighbor03:b:d-2:act:0"
        ],
        "forbidAtomIds": [
          "neighbor03:b:d-2:shame:0",
          "neighbor03:b:d-2:responsibility:0",
          "neighbor03:b:d-2:unlock:s4:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:identity",
      "coverageKey": "b:d-2:surface:early:pressure:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:identity_pressed"
      ],
      "tags": [
        "hot",
        "hot"
      ]
    },
    {
      "id": "neighbor03:beat_v2:b:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "예약 없이 문을 연 건 맞아요. 그런데 애가 울어서 줄을 바로 못 감았어요.",
      "behaviorHint": "책임선을 좁히며 상대 해석을 밀어낸다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor03:b:d-2:admission:0",
          "neighbor03:b:d-2:emotion:0",
          "neighbor03:b:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor03:b:d-2:admission:2",
          "neighbor03:b:d-2:responsibility:0",
          "neighbor03:b:d-2:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:pressure:responsibility",
      "coverageKey": "b:d-2:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-2:motive:responsibility_named"
      ],
      "tags": [],
      "requiresFlags": [
        "d-2:surface:timeline_pressed"
      ]
    },
    {
      "id": "neighbor03:beat_v2:b:d-2:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "justify",
      "line": "그 장면만 떼면 몰라도, 제 쪽에서는 이미 안쪽에 사람이 서 있는 줄 몰랐고 먼저 들어와 있던 쪽이 한 발만 비켜줬어도 덜 꼬였을 거예요.",
      "behaviorHint": "정당화와 섭섭함을 섞어 동기 설명으로 미끄러진다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor03:b:d-2:counter:0",
          "neighbor03:b:d-2:threshold:0",
          "neighbor03:b:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "neighbor03:b:d-2:admission:2",
          "neighbor03:b:d-2:responsibility:0",
          "neighbor03:b:d-2:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:motive:motive",
      "coverageKey": "b:d-2:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-2:motive:motive_named"
      ],
      "tags": [],
      "requiresFlags": [
        "d-2:surface:context_pressed"
      ]
    },
    {
      "id": "neighbor03:beat_v2:b:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "솔직히 말하면 제가 놀라서 줄을 짧게 못 잡은 건 맞아요. 애가 비명을 지르니까 머리가 하얘졌어요.",
      "behaviorHint": "목소리가 낮아지며 수치심이나 불안을 먼저 내비친다.",
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
          "agitated",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor03:b:d-2:shame:0",
          "neighbor03:b:d-2:admission:1",
          "neighbor03:b:d-2:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor03:b:d-2:uncertainty:0",
          "neighbor03:b:d-2:denial:0",
          "neighbor03:b:d-2:context:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:core:rapport:emotion",
      "coverageKey": "b:d-2:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-2:core:emotion_named"
      ],
      "tags": [
        "late",
        "late"
      ],
      "requiresFlags": [
        "d-2:motive:motive_named"
      ]
    },
    {
      "id": "neighbor03:beat_v2:b:d-2:surface:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "admit",
      "line": "예약 없이 문을 연 건 맞아요. 그런데 애가 울어서 줄을 바로 못 감았어요.",
      "behaviorHint": "자료를 흘끗 본 뒤 인정 범위를 계산해 말을 고른다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "fresh",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor03:b:d-2:admission:0",
          "neighbor03:b:d-2:emotion:0",
          "neighbor03:b:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor03:b:d-2:shame:0",
          "neighbor03:b:d-2:responsibility:0",
          "neighbor03:b:d-2:unlock:s4:0"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:evidence:identity",
      "coverageKey": "b:d-2:surface:mid:evidence:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:evidence_landed"
      ],
      "tags": [
        "evidence",
        "evidence"
      ]
    },
    {
      "id": "neighbor03:beat_v2:b:d-4:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "mistaken",
      "line": "겉으로 보인 건 분명 그쪽이었습니다. 제가 직접 입 안을 본 건 아니어도 장면이 너무 그렇게 보였어요. 누구라도 물림으로 생각했을 거예요.",
      "behaviorHint": "겉으로 보인 단서를 진실처럼 움켜쥔 채 해석을 반복한다.",
      "applicableStates": [
        "M0",
        "M1",
        "M2"
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
          "guarded"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "fresh",
          "wary"
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor03:b:d-4:harm:0",
          "neighbor03:b:d-4:fear:0",
          "neighbor03:b:d-4:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor03:b:d-4:unlock:s5:0",
          "neighbor03:b:d-4:unlock:s4:0",
          "neighbor03:b:d-4:responsibility:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:surface:trap:identity",
      "coverageKey": "b:d-4:surface:early:trap:identity",
      "variantTarget": 4,
      "setFlags": [
        "d-4:surface:misbelief_identity"
      ],
      "tags": [
        "trap",
        "red_herring"
      ],
      "beliefMode": "misbelief"
    },
    {
      "id": "neighbor03:beat_v2:b:d-4:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "mistaken",
      "line": "겉으로 보인 건 분명 그쪽이었습니다. 제가 직접 입 안을 본 건 아니어도 장면이 너무 그렇게 보였어요. 누구라도 물림으로 생각했을 거예요.",
      "behaviorHint": "겉으로 보인 단서를 진실처럼 움켜쥔 채 해석을 반복한다.",
      "applicableStates": [
        "M0",
        "M1",
        "M2"
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
          "guarded"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "fresh",
          "wary"
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor03:b:d-4:harm:0",
          "neighbor03:b:d-4:fear:0",
          "neighbor03:b:d-4:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor03:b:d-4:unlock:s5:0",
          "neighbor03:b:d-4:unlock:s4:0",
          "neighbor03:b:d-4:responsibility:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:surface:trap:context",
      "coverageKey": "b:d-4:surface:early:trap:context",
      "variantTarget": 4,
      "setFlags": [
        "d-4:surface:misbelief_shaken"
      ],
      "tags": [
        "trap",
        "red_herring"
      ],
      "beliefMode": "misbelief"
    },
    {
      "id": "neighbor03:beat_v2:b:d-4:motive:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "doubt",
      "line": "그 장면만 떼면 몰라도, 제 쪽에서는 귀에 난 피와 으르렁거림이 먼저 보여서 제가 물림으로 몰아간 건 있어요. 하지만 그 장면을 만든 동선은 현우 씨 쪽도 컸어요.",
      "behaviorHint": "겉으로 보인 단서를 진실처럼 움켜쥔 채 해석을 반복한다.",
      "applicableStates": [
        "M3",
        "M4"
      ],
      "layer": "motive",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "question",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ],
        "misconceptionStates": [
          "M3",
          "M4"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor03:b:d-4:admission:1",
          "neighbor03:b:d-4:counter:0",
          "neighbor03:b:d-4:shame:0"
        ],
        "forbidAtomIds": [
          "neighbor03:b:d-4:harm:0",
          "neighbor03:b:d-4:context:0",
          "neighbor03:b:d-4:fear:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:motive:trap:context",
      "coverageKey": "b:d-4:motive:late:trap:context",
      "variantTarget": 2,
      "setFlags": [
        "d-4:motive:context_reframed"
      ],
      "tags": [
        "trap",
        "late",
        "red_herring"
      ],
      "beliefMode": "misbelief"
    },
    {
      "id": "neighbor03:beat_v2:b:d-4:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "clarify",
      "line": "솔직히 말하면 애가 비명을 지르는 걸 보고 제가 원인을 확인하기보다 먼저 물렸다고 붙잡았어요. 그게 제 실수였어요.",
      "behaviorHint": "겉으로 보인 단서를 진실처럼 움켜쥔 채 해석을 반복한다.",
      "applicableStates": [
        "M3",
        "M4"
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
          "agitated",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ],
        "misconceptionStates": [
          "M3",
          "M4"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor03:b:d-4:admission:1",
          "neighbor03:b:d-4:counter:0",
          "neighbor03:b:d-4:shame:0"
        ],
        "forbidAtomIds": [
          "neighbor03:b:d-4:harm:0",
          "neighbor03:b:d-4:context:0",
          "neighbor03:b:d-4:fear:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:core:trap:emotion",
      "coverageKey": "b:d-4:core:late:trap:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-4:core:emotion_reframed"
      ],
      "tags": [
        "trap",
        "late",
        "red_herring",
        "late"
      ],
      "beliefMode": "misbelief"
    },
    {
      "id": "neighbor03:beat_v2:b:d-5:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "전 원본도 못 본 채 애부터 안고 있었어요. 절차를 어기려고 한 게 아니라 너무 급했던 거예요.",
      "behaviorHint": "답을 짧게 끊고 장면 순서만 남기려 든다.",
      "applicableStates": [
        "S0",
        "S1"
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
          "guarded"
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
          "neighbor03:b:d-5:denial:0",
          "neighbor03:b:d-5:harm:0"
        ],
        "forbidAtomIds": [
          "neighbor03:b:d-5:unlock:s5:0",
          "neighbor03:b:d-5:unlock:s4:0",
          "neighbor03:b:d-5:shame:1"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:pressure:timeline",
      "coverageKey": "b:d-5:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-5:surface:timeline_pressed"
      ],
      "tags": [
        "hot",
        "hot"
      ]
    },
    {
      "id": "neighbor03:beat_v2:b:d-5:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "관리사무소에 바로 못 간 건 쇼크 때문이었어요. 그때는 애 상태부터 붙잡고 있었어요.",
      "behaviorHint": "답을 짧게 끊고 장면 순서만 남기려 든다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "identity",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "guarded"
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
          "neighbor03:b:d-5:emotion:0",
          "neighbor03:b:d-5:privacy:0"
        ],
        "forbidAtomIds": [
          "neighbor03:b:d-5:unlock:s5:0",
          "neighbor03:b:d-5:unlock:s4:0",
          "neighbor03:b:d-5:shame:1"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:pressure:identity",
      "coverageKey": "b:d-5:surface:early:pressure:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-5:surface:identity_pressed"
      ],
      "tags": [
        "hot",
        "hot"
      ],
      "requiresFlags": [
        "d-5:surface:timeline_pressed"
      ]
    },
    {
      "id": "neighbor03:beat_v2:b:d-5:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 관리사무소에 바로 못 간 건 쇼크 때문이었어요. 단체방도 도움 받으려고 보낸 거지 절차 무시는 아니었어요.",
      "behaviorHint": "답을 짧게 끊고 장면 순서만 남기려 든다.",
      "applicableStates": [
        "S0",
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
          "guarded"
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
          "neighbor03:b:d-5:emotion:0",
          "neighbor03:b:d-5:privacy:0"
        ],
        "forbidAtomIds": [
          "neighbor03:b:d-5:unlock:s5:0",
          "neighbor03:b:d-5:unlock:s4:0",
          "neighbor03:b:d-5:shame:1"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:pressure:context",
      "coverageKey": "b:d-5:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-5:surface:context_pressed"
      ],
      "tags": [
        "hot",
        "hot"
      ]
    },
    {
      "id": "neighbor03:beat_v2:b:d-5:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "원본 확인 전 메시지를 보낸 건 맞아요. 생각이 짧았어요.",
      "behaviorHint": "책임선을 좁히며 상대 해석을 밀어낸다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor03:b:d-5:admission:0",
          "neighbor03:b:d-5:shame:0",
          "neighbor03:b:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor03:b:d-5:privacy:1",
          "neighbor03:b:d-5:admission:1",
          "neighbor03:b:d-5:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:pressure:responsibility",
      "coverageKey": "b:d-5:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:responsibility_named"
      ],
      "tags": [],
      "requiresFlags": [
        "d-5:surface:timeline_pressed"
      ]
    },
    {
      "id": "neighbor03:beat_v2:b:d-5:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "justify",
      "line": "하지만 현우 씨도 예약 규칙을 깨고 먼저 들어갔잖아요. 절차 위반을 저만 한 것처럼 볼 수는 없어요.",
      "behaviorHint": "정당화와 섭섭함을 섞어 동기 설명으로 미끄러진다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "sub_truth",
      "responseIntent": "motive_response",
      "angleTag": "motive",
      "actionFamily": "question",
      "questionTypes": [
        "motive_search"
      ],
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor03:b:d-5:counter:0",
          "neighbor03:b:d-5:relationship:0",
          "neighbor03:b:d-5:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "neighbor03:b:d-5:privacy:1",
          "neighbor03:b:d-5:admission:1",
          "neighbor03:b:d-5:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:motive:motive",
      "coverageKey": "b:d-5:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:motive_named"
      ],
      "tags": [],
      "requiresFlags": [
        "d-5:surface:identity_pressed"
      ]
    },
    {
      "id": "neighbor03:beat_v2:b:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "emotional",
      "line": "제가 먼저 단톡에 쓴 건 부끄럽지만, 잘린 영상 한 장면으로 보호자 자격까지 재단당한 건 너무 억울해요.",
      "behaviorHint": "목소리가 낮아지며 수치심이나 불안을 먼저 내비친다.",
      "applicableStates": [
        "S4",
        "S5"
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
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor03:b:d-5:emotion:1",
          "neighbor03:b:d-5:shame:1",
          "neighbor03:b:d-5:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor03:b:d-5:denial:0",
          "neighbor03:b:d-5:emotion:0",
          "neighbor03:b:d-5:harm:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:rapport:emotion",
      "coverageKey": "b:d-5:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-5:core:emotion_named"
      ],
      "tags": [
        "late",
        "late"
      ],
      "requiresFlags": [
        "d-5:motive:motive_named"
      ]
    },
    {
      "id": "neighbor03:beat_v2:b:d-5:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "admit",
      "line": "원본 확인 전 메시지를 보낸 건 맞아요. 생각이 짧았어요.",
      "behaviorHint": "자료를 흘끗 본 뒤 인정 범위를 계산해 말을 고른다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "fresh",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor03:b:d-5:admission:0",
          "neighbor03:b:d-5:shame:0",
          "neighbor03:b:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor03:b:d-5:unlock:s5:0",
          "neighbor03:b:d-5:unlock:s4:0",
          "neighbor03:b:d-5:shame:1"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:evidence:legality",
      "coverageKey": "b:d-5:surface:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-5:surface:evidence_landed"
      ],
      "tags": [
        "evidence",
        "evidence"
      ]
    },
    {
      "id": "neighbor03:beat_v2:a:d-1:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "irritated",
      "line": "마감 직전엔 다들 급하면 그렇게 처리하기도 합니다. 동시 입실이 겹치며 통제가 무너진 겁니다.",
      "behaviorHint": "같은 질문이 반복되자 표정이 굳고 말수가 눈에 띄게 줄어든다.",
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
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:fatigue:timeline",
      "coverageKey": "a:d-1:surface:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-1:surface:fatigue_warned"
      ],
      "tags": [
        "fatigue",
        "fatigue"
      ]
    },
    {
      "id": "neighbor03:beat_v2:a:d-1:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "block",
      "line": "직원 PIN 얘기는 이미 했습니다. 같은 식으로 몰아붙이면 여기서 더 길게 답하지 않겠습니다.",
      "behaviorHint": "같은 질문이 반복되자 표정이 굳고 말수가 눈에 띄게 줄어든다.",
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
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:fatigue:responsibility",
      "coverageKey": "a:d-1:surface:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-1:surface:fatigue_blocked"
      ],
      "tags": [
        "fatigue",
        "fatigue"
      ]
    },
    {
      "id": "neighbor03:beat_v2:a:d-1:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "retaliate",
      "line": "직원 권한을 훔쳐 쓴 사람처럼 보이는 게 제일 치욕적입니다. 하지만 그날 문을 먼저 연 건 제 판단 미스였습니다.",
      "behaviorHint": "같은 질문이 반복되자 표정이 굳고 말수가 눈에 띄게 줄어든다.",
      "applicableStates": [
        "S3",
        "S4",
        "S5"
      ],
      "layer": "motive",
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
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:responsibility",
      "coverageKey": "a:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:fatigue_countered"
      ],
      "tags": [
        "fatigue",
        "fatigue"
      ],
      "requiresFlags": [
        "d-1:surface:fatigue_warned"
      ]
    },
    {
      "id": "neighbor03:beat_v2:b:d-2:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "irritated",
      "line": "이미 안쪽에 사람이 서 있는 줄 몰랐고 먼저 들어와 있던 쪽이 한 발만 비켜줬어도 덜 꼬였을 거예요.",
      "behaviorHint": "같은 질문이 반복되자 표정이 굳고 말수가 눈에 띄게 줄어든다.",
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
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:fatigue:timeline",
      "coverageKey": "b:d-2:surface:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:fatigue_warned"
      ],
      "tags": [
        "fatigue",
        "fatigue"
      ]
    },
    {
      "id": "neighbor03:beat_v2:b:d-2:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "block",
      "line": "무예약 입실 얘기는 이미 했습니다. 같은 식으로 몰아붙이면 여기서 더 길게 답하지 않겠습니다.",
      "behaviorHint": "같은 질문이 반복되자 표정이 굳고 말수가 눈에 띄게 줄어든다.",
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
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:fatigue:responsibility",
      "coverageKey": "b:d-2:surface:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:fatigue_blocked"
      ],
      "tags": [
        "fatigue",
        "fatigue"
      ]
    },
    {
      "id": "neighbor03:beat_v2:b:d-2:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "retaliate",
      "line": "제가 놀라서 줄을 짧게 못 잡은 건 맞아요. 애가 비명을 지르니까 머리가 하얘졌어요.",
      "behaviorHint": "같은 질문이 반복되자 표정이 굳고 말수가 눈에 띄게 줄어든다.",
      "applicableStates": [
        "S3",
        "S4",
        "S5"
      ],
      "layer": "motive",
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
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:fatigue:responsibility",
      "coverageKey": "b:d-2:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:fatigue_countered"
      ],
      "tags": [
        "fatigue",
        "fatigue"
      ],
      "requiresFlags": [
        "d-2:surface:fatigue_warned"
      ]
    },
    {
      "id": "neighbor03:beat_v2:a:d-1:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "disclose",
      "line": "직원 권한처럼 보이는 행동이 체면 방어와 연결돼 있었다는 사실",
      "behaviorHint": "정당화와 섭섭함을 섞어 동기 설명으로 미끄러진다.",
      "applicableStates": [
        "S4",
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
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor03:a:d-1:unlock:s4:0",
          "neighbor03:a:d-1:unlock:s5:0",
          "neighbor03:a:d-1:shame:0"
        ],
        "forbidAtomIds": [
          "neighbor03:a:d-1:denial:0",
          "neighbor03:a:d-1:rule:0",
          "neighbor03:a:d-1:timeline:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:motive:motive",
      "coverageKey": "a:d-1:core:late:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-1:core:free_motive_opened"
      ],
      "tags": [
        "late",
        "free_question",
        "late"
      ]
    },
    {
      "id": "neighbor03:beat_v2:a:d-5:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "disclose",
      "line": "예약과 원본 확인 절차 붕괴의 출발점이 자신의 선입실이었다는 인정",
      "behaviorHint": "목소리가 낮아지며 수치심이나 불안을 먼저 내비친다.",
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
          "agitated",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor03:a:d-5:unlock:s4:0",
          "neighbor03:a:d-5:unlock:s5:0",
          "neighbor03:a:d-5:shame:0"
        ],
        "forbidAtomIds": [
          "neighbor03:a:d-5:denial:0",
          "neighbor03:a:d-5:rule:0",
          "neighbor03:a:d-5:context:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:rapport:emotion",
      "coverageKey": "a:d-5:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-5:core:free_emotion_opened"
      ],
      "tags": [
        "late",
        "free_question",
        "late"
      ]
    },
    {
      "id": "neighbor03:beat_v2:b:d-2:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "disclose",
      "line": "panic 때문에 기본 안전수칙을 놓쳤다는 감정 인정",
      "behaviorHint": "정당화와 섭섭함을 섞어 동기 설명으로 미끄러진다.",
      "applicableStates": [
        "S4",
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
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor03:b:d-2:unlock:s4:0",
          "neighbor03:b:d-2:unlock:s5:0",
          "neighbor03:b:d-2:shame:0"
        ],
        "forbidAtomIds": [
          "neighbor03:b:d-2:uncertainty:0",
          "neighbor03:b:d-2:denial:0",
          "neighbor03:b:d-2:context:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:core:motive:motive",
      "coverageKey": "b:d-2:core:late:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-2:core:free_motive_opened"
      ],
      "tags": [
        "late",
        "free_question",
        "late"
      ]
    },
    {
      "id": "neighbor03:beat_v2:b:d-5:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "disclose",
      "line": "자신도 예약과 원본 확인 절차를 어겼다는 인정",
      "behaviorHint": "목소리가 낮아지며 수치심이나 불안을 먼저 내비친다.",
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
          "agitated",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor03:b:d-5:unlock:s4:0",
          "neighbor03:b:d-5:unlock:s5:0",
          "neighbor03:b:d-5:emotion:1"
        ],
        "forbidAtomIds": [
          "neighbor03:b:d-5:denial:0",
          "neighbor03:b:d-5:emotion:0",
          "neighbor03:b:d-5:harm:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:rapport:emotion",
      "coverageKey": "b:d-5:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-5:core:free_emotion_opened"
      ],
      "tags": [
        "late",
        "free_question",
        "late"
      ]
    },
    {
      "id": "neighbor03:beat_v2:a:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interjection",
      "line": "직원 권한을 훔쳐 쓴 사람처럼 보이는 게 제일 치욕적입니다. 하지만 그날 문을 먼저 연 건 제 판단 미스였습니다.",
      "behaviorHint": "본 질문 흐름을 끊고 감정이나 디테일만 날카롭게 던진다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "emotion",
      "actionFamily": "interjection",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
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
          "neighbor03:a:d-1:admission:0",
          "neighbor03:a:d-1:context:0"
        ],
        "forbidAtomIds": [
          "neighbor03:a:d-1:admission:1",
          "neighbor03:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-1:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:emotional_only_allow"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "neighbor03:beat_v2:b:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interjection",
      "line": "무예약 입실 얘기만 나오면 아직도 숨이 막힙니다. 그 장면을 그냥 넘길 수가 없었어요.",
      "behaviorHint": "본 질문 흐름을 끊고 감정이나 디테일만 날카롭게 던진다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "emotion",
      "actionFamily": "interjection",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
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
          "neighbor03:b:d-2:admission:0",
          "neighbor03:b:d-2:emotion:0"
        ],
        "forbidAtomIds": [
          "neighbor03:b:d-2:admission:2",
          "neighbor03:b:d-2:responsibility:0"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-2:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:emotional_only_allow"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "neighbor03:beat_v2:a:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "interjection",
      "line": "감정만 세게 올리지 마시고 예약·원본 확인부터 차분히 말해 주세요. 울분으로 순서를 덮으면 더 꼬입니다.",
      "behaviorHint": "본 질문 흐름을 끊고 감정이나 디테일만 날카롭게 던진다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "emotion",
      "actionFamily": "interjection",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
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
          "neighbor03:a:d-5:admission:0",
          "neighbor03:a:d-5:context:1"
        ],
        "forbidAtomIds": [
          "neighbor03:a:d-5:admission:1",
          "neighbor03:a:d-5:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-5:surface:mid:interjection:emotional_only:block",
      "variantTarget": 2,
      "setFlags": [
        "d-5:surface:emotional_only_block"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "neighbor03:beat_v2:b:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "interjection",
      "line": "감정만 세게 올리지 마시고 예약·원본 확인부터 차분히 말해 주세요. 울분으로 순서를 덮으면 더 꼬입니다.",
      "behaviorHint": "본 질문 흐름을 끊고 감정이나 디테일만 날카롭게 던진다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "emotion",
      "actionFamily": "interjection",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
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
          "neighbor03:b:d-5:admission:0",
          "neighbor03:b:d-5:shame:0"
        ],
        "forbidAtomIds": [
          "neighbor03:b:d-5:privacy:1",
          "neighbor03:b:d-5:admission:1"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-5:surface:mid:interjection:emotional_only:block",
      "variantTarget": 2,
      "setFlags": [
        "d-5:surface:emotional_only_block"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "neighbor03:beat_v2:a:d-1:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interjection",
      "line": "직원 PIN 하나만 떼서 보면 안 됩니다. 청소용역 코드하고 21시 47분까지 붙여야 그날 흐름이 맞습니다.",
      "behaviorHint": "본 질문 흐름을 끊고 감정이나 디테일만 날카롭게 던진다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "responsibility",
      "actionFamily": "interjection",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
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
          "neighbor03:a:d-1:admission:0",
          "neighbor03:a:d-1:context:0"
        ],
        "forbidAtomIds": [
          "neighbor03:a:d-1:admission:1",
          "neighbor03:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-1:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:detail_rebuttal_allow"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "neighbor03:beat_v2:b:d-2:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interjection",
      "line": "무예약 입실 하나만 떼서 보면 안 됩니다. 자동줄하고 젖은 바닥까지 붙여야 그날 흐름이 맞습니다.",
      "behaviorHint": "본 질문 흐름을 끊고 감정이나 디테일만 날카롭게 던진다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "responsibility",
      "actionFamily": "interjection",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
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
          "neighbor03:b:d-2:admission:0",
          "neighbor03:b:d-2:emotion:0"
        ],
        "forbidAtomIds": [
          "neighbor03:b:d-2:admission:2",
          "neighbor03:b:d-2:responsibility:0"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-2:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:detail_rebuttal_allow"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "neighbor03:beat_v2:a:d-5:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "interjection",
      "line": "예약·원본 확인 숫자나 한 컷만 들이대지 마세요. 원본 요청 11분 전가 빠지면 또 다른 결론으로 미끄러집니다.",
      "behaviorHint": "본 질문 흐름을 끊고 감정이나 디테일만 날카롭게 던진다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "responsibility",
      "actionFamily": "interjection",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
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
          "neighbor03:a:d-5:admission:0",
          "neighbor03:a:d-5:context:1"
        ],
        "forbidAtomIds": [
          "neighbor03:a:d-5:admission:1",
          "neighbor03:a:d-5:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-5:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 2,
      "setFlags": [
        "d-5:surface:detail_rebuttal_block"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "neighbor03:beat_v2:b:d-5:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "interjection",
      "line": "예약·원본 확인 숫자나 한 컷만 들이대지 마세요. 원본 요청 11분 전가 빠지면 또 다른 결론으로 미끄러집니다.",
      "behaviorHint": "본 질문 흐름을 끊고 감정이나 디테일만 날카롭게 던진다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "responsibility",
      "actionFamily": "interjection",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
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
          "neighbor03:b:d-5:admission:0",
          "neighbor03:b:d-5:shame:0"
        ],
        "forbidAtomIds": [
          "neighbor03:b:d-5:privacy:1",
          "neighbor03:b:d-5:admission:1"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-5:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 2,
      "setFlags": [
        "d-5:surface:detail_rebuttal_block"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "neighbor03:beat_v2:b:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interjection",
      "line": "그때 보인 장면만으로는 누구라도 19초 클립이 원본 그대로라는 오해고 받아들였을 겁니다. 그래서 저도 그 해석을 놓지 못했습니다.",
      "behaviorHint": "본 질문 흐름을 끊고 감정이나 디테일만 날카롭게 던진다.",
      "applicableStates": [
        "M0",
        "M1",
        "M2"
      ],
      "layer": "surface",
      "issueRole": "red_herring",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "interjection",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
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
          "neighbor03:b:d-3:evidence:1",
          "neighbor03:b:d-3:context:0"
        ],
        "forbidAtomIds": [
          "neighbor03:b:d-3:evidence:2",
          "neighbor03:b:d-3:rule:0"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:misbelief_escalation_allow"
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
      "id": "neighbor03:beat_v2:a:d-4:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "interjection",
      "line": "지금 그 해석이 바로 문제입니다. 상처 직접 원인이 물림이라는 오해 쪽으로만 몰리게 하는 단서가 빠져 있잖아요.",
      "behaviorHint": "본 질문 흐름을 끊고 감정이나 디테일만 날카롭게 던진다.",
      "applicableStates": [
        "M2",
        "M3"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "interjection",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
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
          "neighbor03:a:d-4:evidence:0",
          "neighbor03:a:d-4:harm:1"
        ],
        "forbidAtomIds": [
          "neighbor03:a:d-4:responsibility:0",
          "neighbor03:a:d-4:evidence:1"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-4:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 2,
      "setFlags": [
        "d-4:surface:misbelief_escalation_block"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "misbelief_escalation",
        "red_herring"
      ],
      "beliefMode": "suspects"
    },
    {
      "id": "neighbor03:beat_v2:a:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interjection",
      "line": "19초 클립만 먼저 던지면 또 같은 오해가 납니다. 잘린 단서가 결정타처럼 보이기 시작하거든요.",
      "behaviorHint": "본 질문 흐름을 끊고 감정이나 디테일만 날카롭게 던진다.",
      "applicableStates": [
        "M1",
        "M2",
        "M3"
      ],
      "layer": "surface",
      "issueRole": "red_herring",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "interjection",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
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
          "M2",
          "M3"
        ],
        "trapStates": [
          "trap_live"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor03:a:d-3:admission:0",
          "neighbor03:a:d-3:motive:0"
        ],
        "forbidAtomIds": [
          "neighbor03:a:d-3:unlock:s5:0",
          "neighbor03:a:d-3:admission:1"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:trap_signal:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:trap_signal_allow"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "trap_signal",
        "red_herring"
      ],
      "beliefMode": "knows"
    },
    {
      "id": "neighbor03:beat_v2:b:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interjection",
      "line": "19초 클립 하나로 끝난 것처럼 말하지 마세요. 앞뒤 맥락이 비어 있는 자료는 덫이 되기 쉽습니다.",
      "behaviorHint": "본 질문 흐름을 끊고 감정이나 디테일만 날카롭게 던진다.",
      "applicableStates": [
        "M2",
        "M3",
        "M4"
      ],
      "layer": "surface",
      "issueRole": "red_herring",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "interjection",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
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
          "M3",
          "M4"
        ],
        "trapStates": [
          "trap_live",
          "trap_exposed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor03:b:d-3:evidence:1",
          "neighbor03:b:d-3:context:0"
        ],
        "forbidAtomIds": [
          "neighbor03:b:d-3:evidence:2",
          "neighbor03:b:d-3:rule:0"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:trap_signal:block",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:trap_signal_block"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "trap_signal",
        "red_herring"
      ],
      "beliefMode": "misbelief"
    }
  ]
} as const;

export default neighbor03BeatsV2Full;
