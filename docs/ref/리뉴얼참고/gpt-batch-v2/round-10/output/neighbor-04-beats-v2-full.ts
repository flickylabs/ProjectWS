export const neighbor04BeatsV2Full = {
  "caseId": "neighbor-04",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 61,
    "byActionFamily": {
      "question": 34,
      "evidence": 5,
      "fatigue": 6,
      "free_question": 4,
      "interjection": 12
    },
    "byParty": {
      "a": 29,
      "b": 32
    },
    "byDispute": {
      "d-1": 13,
      "d-3": 8,
      "d-5": 20,
      "d-2": 13,
      "d-4": 7
    },
    "interjectionCount": 12,
    "fatigueCount": 6,
    "freeQuestionCount": 4,
    "coverageKeyCount": 57,
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
      "a:d-3:surface:mid:interjection:misbelief_escalation:allow",
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
      "b:d-3:surface:mid:interjection:misbelief_escalation:block",
      "b:d-4:core:late:rapport:emotion",
      "b:d-4:motive:mid:motive:motive",
      "b:d-4:motive:mid:pressure:responsibility",
      "b:d-4:surface:early:pressure:context",
      "b:d-4:surface:early:pressure:identity",
      "b:d-4:surface:early:pressure:timeline",
      "b:d-4:surface:mid:evidence:legality",
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
      "id": "neighbor04:beat_v2:a:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "그 시기엔 아버지 재활 때문에 새벽 동선이 계속 바뀌어서, 제가 약속을 대놓고 어겼다고 보긴 어렵습니다. 가끔 몇 분 밀린 날이 있었더라도 그렇게까지 반복 위반처럼 말할 일은 아니었습니다.",
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
          "neighbor04:a:d-1:context:0",
          "neighbor04:a:d-1:denial:0"
        ],
        "forbidAtomIds": [
          "neighbor04:a:d-1:responsibility:1",
          "neighbor04:a:d-1:admission:1",
          "neighbor04:a:d-1:unlock:s5:0"
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
      "id": "neighbor04:beat_v2:a:d-1:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "반환 시각 얘기가 나오면 저는 먼저 아버지 병원 동선부터 설명하게 됩니다. 그때는 예외가 조금 더 이어지는 줄 알았어요.",
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
          "neighbor04:a:d-1:timeline:0",
          "neighbor04:a:d-1:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor04:a:d-1:responsibility:1",
          "neighbor04:a:d-1:admission:1",
          "neighbor04:a:d-1:unlock:s5:0"
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
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ]
    },
    {
      "id": "neighbor04:beat_v2:a:d-1:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 2월 말 이후에도 병원 일정이 완전히 끊긴 건 아니라서, 저도 예외가 조금 더 이어지는 줄 알았습니다. 분 단위까지 딱 잘라 제가 늘 늦었다는 표현은 과장이라고 생각합니다.",
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
          "neighbor04:a:d-1:timeline:0",
          "neighbor04:a:d-1:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor04:a:d-1:responsibility:1",
          "neighbor04:a:d-1:admission:1",
          "neighbor04:a:d-1:unlock:s5:0"
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
      ]
    },
    {
      "id": "neighbor04:beat_v2:a:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "기록이 저 정도면 제가 '가끔'이라고만 말하긴 어렵겠네요. 몇 번 늦어진 건 인정합니다.",
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
          "neighbor04:a:d-1:admission:0",
          "neighbor04:a:d-1:self_justification:0",
          "neighbor04:a:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor04:a:d-1:responsibility:1",
          "neighbor04:a:d-1:admission:1",
          "neighbor04:a:d-1:unlock:s5:0"
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
      "id": "neighbor04:beat_v2:a:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "justify",
      "line": "재활 종료 시점을 제가 모른 건 아닙니다. 다만 그 뒤에 생활을 바로 못 돌린 데엔 도윤 씨 반응도 겹쳤습니다.",
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
          "neighbor04:a:d-1:responsibility:0",
          "neighbor04:a:d-1:counter:0",
          "neighbor04:a:d-1:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "neighbor04:a:d-1:responsibility:1",
          "neighbor04:a:d-1:admission:1",
          "neighbor04:a:d-1:unlock:s5:0"
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
        "d-1:surface:identity_pressed"
      ]
    },
    {
      "id": "neighbor04:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "핑계 아니에요. 끝난 뒤에도 제가 그 생활에서 못 빠져나온 거라고요.",
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
          "neighbor04:a:d-1:emotion:0",
          "neighbor04:a:d-1:fear:0",
          "neighbor04:a:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor04:a:d-1:timeline:0",
          "neighbor04:a:d-1:denial:0",
          "neighbor04:a:d-1:uncertainty:0"
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
      "id": "neighbor04:beat_v2:a:d-1:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "admit",
      "line": "기록이 저 정도면 제가 '가끔'이라고만 말하긴 어렵겠네요. 몇 번 늦어진 건 인정합니다.",
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
          "neighbor04:a:d-1:admission:0",
          "neighbor04:a:d-1:self_justification:0",
          "neighbor04:a:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor04:a:d-1:responsibility:1",
          "neighbor04:a:d-1:admission:1",
          "neighbor04:a:d-1:unlock:s5:0"
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
      "id": "neighbor04:beat_v2:a:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "mistaken",
      "line": "겉으로 보인 건 분명 그쪽이었습니다. 직접 본 건 아니지만, 메모까지 남긴 사람이면 차에 손댔을 가능성도 있다고 봤습니다. 그 전에 생긴 흠집인지까지 제가 바로 알 수는 없었어요.",
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
          "neighbor04:a:d-3:context:0",
          "neighbor04:a:d-3:denial:0",
          "neighbor04:a:d-3:timeline:0"
        ],
        "forbidAtomIds": [
          "neighbor04:a:d-3:unlock:s5:0",
          "neighbor04:a:d-3:admission:1",
          "neighbor04:a:d-3:unlock:s4:0"
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
      "beliefMode": "misbelief"
    },
    {
      "id": "neighbor04:beat_v2:a:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "mistaken",
      "line": "겉으로 보인 건 분명 그쪽이었습니다. 직접 본 건 아니지만, 메모까지 남긴 사람이면 차에 손댔을 가능성도 있다고 봤습니다. 그 전에 생긴 흠집인지까지 제가 바로 알 수는 없었어요.",
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
          "neighbor04:a:d-3:context:0",
          "neighbor04:a:d-3:denial:0",
          "neighbor04:a:d-3:timeline:0"
        ],
        "forbidAtomIds": [
          "neighbor04:a:d-3:unlock:s5:0",
          "neighbor04:a:d-3:admission:1",
          "neighbor04:a:d-3:unlock:s4:0"
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
      "beliefMode": "misbelief"
    },
    {
      "id": "neighbor04:beat_v2:a:d-3:motive:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "doubt",
      "line": "그 장면만 떼면 몰라도, 제 쪽에서는 도윤 씨가 그렇게까지 압박하지 않았으면 저도 범퍼 얘기까지 꺼내진 않았을 겁니다. 제 의심이 과했던 건 인정하지만, 그 상황을 만든 쪽도 도윤 씨였어요.",
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
          "neighbor04:a:d-3:responsibility:0",
          "neighbor04:a:d-3:counter:0",
          "neighbor04:a:d-3:emotion:0"
        ],
        "forbidAtomIds": [
          "neighbor04:a:d-3:context:0",
          "neighbor04:a:d-3:timeline:0",
          "neighbor04:a:d-3:denial:0"
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
      "beliefMode": "misbelief"
    },
    {
      "id": "neighbor04:beat_v2:a:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "clarify",
      "line": "솔직히 말하면 사실 속으로는 그 흠집이 그날 생긴 게 아닐 수도 있다는 생각이 계속 있었어요. 그래도 메모까지 본 뒤엔 제가 완전히 피해자인 것처럼 붙잡고 싶었습니다.",
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
          "neighbor04:a:d-3:responsibility:0",
          "neighbor04:a:d-3:counter:0",
          "neighbor04:a:d-3:emotion:0"
        ],
        "forbidAtomIds": [
          "neighbor04:a:d-3:context:0",
          "neighbor04:a:d-3:timeline:0",
          "neighbor04:a:d-3:denial:0"
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
      "beliefMode": "misbelief"
    },
    {
      "id": "neighbor04:beat_v2:a:d-5:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "저는 괴롭힘받는 상황을 알리려고 단체방에 쓴 거지, 도윤 씨를 먼저 공개 비난하려던 건 아니었습니다. 관리사무소 확인 전 약속을 제가 깼다고만 보긴 어렵습니다.",
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
          "neighbor04:a:d-5:context:0",
          "neighbor04:a:d-5:denial:0"
        ],
        "forbidAtomIds": [
          "neighbor04:a:d-5:responsibility:1",
          "neighbor04:a:d-5:emotion:0",
          "neighbor04:a:d-5:admission:1"
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
      "id": "neighbor04:beat_v2:a:d-5:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "먼저 올린 글이긴 하지만 저는 그걸 구조 요청처럼 생각했습니다. 다 적지 못한 건 맞아도 망신 주려던 건 아니에요.",
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
          "neighbor04:a:d-5:timeline:0",
          "neighbor04:a:d-5:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor04:a:d-5:responsibility:1",
          "neighbor04:a:d-5:emotion:0",
          "neighbor04:a:d-5:admission:1"
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
      "id": "neighbor04:beat_v2:a:d-5:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 사진과 쪽지를 보고 너무 놀라서 도움을 구한 것뿐입니다. 사실관계 전체를 다 못 적은 건 맞지만 먼저 망신주려던 의도는 없었어요.",
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
          "neighbor04:a:d-5:timeline:0",
          "neighbor04:a:d-5:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor04:a:d-5:responsibility:1",
          "neighbor04:a:d-5:emotion:0",
          "neighbor04:a:d-5:admission:1"
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
      "id": "neighbor04:beat_v2:a:d-5:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "순서가 그렇게 나오면 제가 먼저 공개 호소한 건 맞네요. 그때는 콘과 쪽지를 보고 너무 놀랐습니다.",
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
          "neighbor04:a:d-5:admission:0",
          "neighbor04:a:d-5:self_justification:0",
          "neighbor04:a:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor04:a:d-5:unlock:s5:0",
          "neighbor04:a:d-5:admission:1",
          "neighbor04:a:d-5:responsibility:1"
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
      "id": "neighbor04:beat_v2:a:d-5:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "justify",
      "line": "그 장면만 떼면 몰라도, 제 쪽에서는 확인 전 공개글을 올린 건 제가 약속을 어긴 셈입니다. 그래도 도윤 씨가 개인 콘과 쪽지로 먼저 몰아붙인 게 없었다면 그렇게까지 하진 않았을 겁니다.",
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
          "neighbor04:a:d-5:responsibility:0",
          "neighbor04:a:d-5:counter:0",
          "neighbor04:a:d-5:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "neighbor04:a:d-5:unlock:s5:0",
          "neighbor04:a:d-5:admission:1",
          "neighbor04:a:d-5:responsibility:1"
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
      "id": "neighbor04:beat_v2:a:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "emotional",
      "line": "네, 제가 겁먹고 크게 말한 건 맞아요. 그런데 그 쪽지 꽂힌 차를 본 사람이 멀쩡할 수는 없잖아요.",
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
          "neighbor04:a:d-5:emotion:0",
          "neighbor04:a:d-5:fear:0",
          "neighbor04:a:d-5:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor04:a:d-5:timeline:0",
          "neighbor04:a:d-5:denial:0",
          "neighbor04:a:d-5:context:0"
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
      "id": "neighbor04:beat_v2:a:d-5:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "admit",
      "line": "순서가 그렇게 나오면 제가 먼저 공개 호소한 건 맞네요. 그때는 콘과 쪽지를 보고 너무 놀랐습니다.",
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
          "neighbor04:a:d-5:admission:0",
          "neighbor04:a:d-5:self_justification:0",
          "neighbor04:a:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor04:a:d-5:responsibility:1",
          "neighbor04:a:d-5:emotion:0",
          "neighbor04:a:d-5:admission:1"
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
      "id": "neighbor04:beat_v2:b:d-2:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "저는 차를 막으려고 콘을 세운 게 아니라 그 칸이 또 비워지지 않았다는 걸 표시만 해둔 겁니다. 메모도 위협이 아니라 약속 상기 수준이었습니다.",
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
          "neighbor04:b:d-2:context:0",
          "neighbor04:b:d-2:denial:0"
        ],
        "forbidAtomIds": [
          "neighbor04:b:d-2:emotion:0",
          "neighbor04:b:d-2:fear:0",
          "neighbor04:b:d-2:admission:1"
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
      "id": "neighbor04:beat_v2:b:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "콘은 표시였고 메모는 상기였습니다. 다만 감정적으로 보였을 수 있다는 점은 인정합니다.",
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
          "neighbor04:b:d-2:timeline:0",
          "neighbor04:b:d-2:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor04:b:d-2:emotion:0",
          "neighbor04:b:d-2:fear:0",
          "neighbor04:b:d-2:admission:1"
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
      "id": "neighbor04:beat_v2:b:d-2:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 잠깐 두었던 개인 물건이었고, 통행을 완전히 막을 생각은 없었습니다. 감정적으로 보였을 수는 있어도 자력 제재라고까지 할 건 아니라고 봅니다.",
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
          "neighbor04:b:d-2:timeline:0",
          "neighbor04:b:d-2:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor04:b:d-2:emotion:0",
          "neighbor04:b:d-2:fear:0",
          "neighbor04:b:d-2:admission:1"
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
      "id": "neighbor04:beat_v2:b:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "순찰일지까지 있으면 제가 공식 절차 전에 움직인 건 부인하기 어렵군요. 콘과 메모를 둔 건 맞습니다.",
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
          "neighbor04:b:d-2:admission:0",
          "neighbor04:b:d-2:self_justification:0",
          "neighbor04:b:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor04:b:d-2:admission:1",
          "neighbor04:b:d-2:responsibility:1",
          "neighbor04:b:d-2:unlock:s5:0"
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
      "id": "neighbor04:beat_v2:b:d-2:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "justify",
      "line": "관리사무소를 거쳤어야 했다는 건 압니다. 다만 반복 위반이 누적되면서 제 판단이 자력 제재 쪽으로 기울었습니다.",
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
          "neighbor04:b:d-2:responsibility:0",
          "neighbor04:b:d-2:counter:0",
          "neighbor04:b:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "neighbor04:b:d-2:admission:1",
          "neighbor04:b:d-2:responsibility:1",
          "neighbor04:b:d-2:unlock:s5:0"
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
      "id": "neighbor04:beat_v2:b:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "사유화하려던 게 아니라 더는 같은 기록을 쌓고 싶지 않았던 겁니다. 그래도 선 넘은 건 압니다.",
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
          "neighbor04:b:d-2:emotion:0",
          "neighbor04:b:d-2:fear:0",
          "neighbor04:b:d-2:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor04:b:d-2:timeline:0",
          "neighbor04:b:d-2:context:0",
          "neighbor04:b:d-2:uncertainty:0"
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
      "id": "neighbor04:beat_v2:b:d-2:surface:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "admit",
      "line": "순찰일지까지 있으면 제가 공식 절차 전에 움직인 건 부인하기 어렵군요. 콘과 메모를 둔 건 맞습니다.",
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
          "neighbor04:b:d-2:admission:0",
          "neighbor04:b:d-2:self_justification:0",
          "neighbor04:b:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor04:b:d-2:emotion:0",
          "neighbor04:b:d-2:fear:0",
          "neighbor04:b:d-2:admission:1"
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
      "id": "neighbor04:beat_v2:b:d-4:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "지난가을에 서로 편의 보자는 얘기는 있었지만, 저는 그걸 딱 끊기는 계약처럼 받아들이진 않았습니다. 상황이 좀 더 안정될 때까지 유연하게 가는 줄 알았습니다.",
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
          "neighbor04:b:d-4:context:0",
          "neighbor04:b:d-4:denial:0"
        ],
        "forbidAtomIds": [
          "neighbor04:b:d-4:emotion:0",
          "neighbor04:b:d-4:fear:0",
          "neighbor04:b:d-4:responsibility:1"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:surface:pressure:timeline",
      "coverageKey": "b:d-4:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-4:surface:timeline_pressed"
      ],
      "tags": [
        "hot",
        "hot"
      ]
    },
    {
      "id": "neighbor04:beat_v2:b:d-4:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "문자에 종료 시점이 적혀 있었던 건 맞습니다. 다만 저는 실제 운용에선 조금 더 유연하게 가는 줄 알았습니다.",
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
          "neighbor04:b:d-4:timeline:0",
          "neighbor04:b:d-4:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor04:b:d-4:emotion:0",
          "neighbor04:b:d-4:fear:0",
          "neighbor04:b:d-4:responsibility:1"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:surface:pressure:identity",
      "coverageKey": "b:d-4:surface:early:pressure:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-4:surface:identity_pressed"
      ],
      "tags": [
        "hot",
        "hot"
      ],
      "requiresFlags": [
        "d-4:surface:timeline_pressed"
      ]
    },
    {
      "id": "neighbor04:beat_v2:b:d-4:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 문자에 종료 시점이 적혀 있었던 건 맞지만, 실제 생활에선 서로 조금씩 봐주자는 뉘앙스도 있었습니다. 그래서 완전 원상복구 시점을 단정하기 어렵다고 봤습니다.",
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
          "neighbor04:b:d-4:timeline:0",
          "neighbor04:b:d-4:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor04:b:d-4:emotion:0",
          "neighbor04:b:d-4:fear:0",
          "neighbor04:b:d-4:responsibility:1"
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
        "hot",
        "hot"
      ]
    },
    {
      "id": "neighbor04:beat_v2:b:d-4:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "두 차례나 반복 확인됐다면 종료 조건을 알고 있었다는 점은 인정합니다. 제가 해석으로 흐린 부분이 있네요.",
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
          "neighbor04:b:d-4:admission:0",
          "neighbor04:b:d-4:self_justification:0",
          "neighbor04:b:d-4:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor04:b:d-4:responsibility:1",
          "neighbor04:b:d-4:unlock:s5:0",
          "neighbor04:b:d-4:admission:1"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:motive:pressure:responsibility",
      "coverageKey": "b:d-4:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-4:motive:responsibility_named"
      ],
      "tags": [],
      "requiresFlags": [
        "d-4:surface:timeline_pressed"
      ]
    },
    {
      "id": "neighbor04:beat_v2:b:d-4:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "justify",
      "line": "종료를 알면서도 저는 그 기록을 나중에 문제 제기할 근거처럼 붙잡고 있었습니다. 더 빨리 선을 그었어야 했습니다.",
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
          "neighbor04:b:d-4:responsibility:0",
          "neighbor04:b:d-4:counter:0",
          "neighbor04:b:d-4:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "neighbor04:b:d-4:responsibility:1",
          "neighbor04:b:d-4:unlock:s5:0",
          "neighbor04:b:d-4:admission:1"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:motive:motive:motive",
      "coverageKey": "b:d-4:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-4:motive:motive_named"
      ],
      "tags": [],
      "requiresFlags": [
        "d-4:surface:identity_pressed"
      ]
    },
    {
      "id": "neighbor04:beat_v2:b:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "emotional",
      "line": "솔직히 말하면 솔직히 말하면 저는 종료 문구를 알고도, 나중에 분쟁에서 제 입장이 더 또렷해지도록 기록처럼 쥐고 있었습니다. 그걸 그때 바로 대화로 풀기보다 속으로만 계산했습니다.",
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
          "neighbor04:b:d-4:emotion:0",
          "neighbor04:b:d-4:fear:0",
          "neighbor04:b:d-4:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor04:b:d-4:context:0",
          "neighbor04:b:d-4:timeline:0",
          "neighbor04:b:d-4:uncertainty:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:core:rapport:emotion",
      "coverageKey": "b:d-4:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-4:core:emotion_named"
      ],
      "tags": [
        "late",
        "late"
      ],
      "requiresFlags": [
        "d-4:motive:motive_named"
      ]
    },
    {
      "id": "neighbor04:beat_v2:b:d-4:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "admit",
      "line": "두 차례나 반복 확인됐다면 종료 조건을 알고 있었다는 점은 인정합니다. 제가 해석으로 흐린 부분이 있네요.",
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
          "neighbor04:b:d-4:admission:0",
          "neighbor04:b:d-4:self_justification:0",
          "neighbor04:b:d-4:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor04:b:d-4:emotion:0",
          "neighbor04:b:d-4:fear:0",
          "neighbor04:b:d-4:responsibility:1"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:surface:evidence:legality",
      "coverageKey": "b:d-4:surface:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-4:surface:evidence_landed"
      ],
      "tags": [
        "evidence",
        "evidence"
      ]
    },
    {
      "id": "neighbor04:beat_v2:b:d-5:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "공개 비난을 먼저 시작한 건 제가 아니라 서림 씨였습니다. 저는 관리사무소 확인 전에 공개글을 쓰지 말자는 약속을 깨려 한 적 없습니다.",
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
          "neighbor04:b:d-5:context:0",
          "neighbor04:b:d-5:denial:0"
        ],
        "forbidAtomIds": [
          "neighbor04:b:d-5:admission:1",
          "neighbor04:b:d-5:fear:0",
          "neighbor04:b:d-5:unlock:s4:0"
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
      "id": "neighbor04:beat_v2:b:d-5:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "공개글은 서림 씨가 먼저였지만, 제 행동도 현장 압박으로 보일 수 있다는 점은 압니다. 다만 저는 공개 비난과는 구분된다고 생각했습니다.",
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
          "neighbor04:b:d-5:timeline:0",
          "neighbor04:b:d-5:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor04:b:d-5:admission:1",
          "neighbor04:b:d-5:fear:0",
          "neighbor04:b:d-5:unlock:s4:0"
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
      "id": "neighbor04:beat_v2:b:d-5:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 단체방 글이 먼저 올라왔으니, 적어도 공개 망신은 그쪽에서 먼저 시작된 셈입니다. 제 행동은 현장 대응이었지 공개 비난은 아니었습니다.",
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
          "neighbor04:b:d-5:timeline:0",
          "neighbor04:b:d-5:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor04:b:d-5:admission:1",
          "neighbor04:b:d-5:fear:0",
          "neighbor04:b:d-5:unlock:s4:0"
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
      "id": "neighbor04:beat_v2:b:d-5:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "순서표를 보면 제가 먼저 통제하려 한 흔적이 남네요. 자력 제재 금지 약속을 어긴 건 맞습니다.",
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
          "neighbor04:b:d-5:admission:0",
          "neighbor04:b:d-5:self_justification:0",
          "neighbor04:b:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor04:b:d-5:responsibility:1",
          "neighbor04:b:d-5:unlock:s5:0",
          "neighbor04:b:d-5:admission:1"
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
      "id": "neighbor04:beat_v2:b:d-5:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "justify",
      "line": "저는 단체방으로 가기 전에 현장에서 끝내려 했습니다. 하지만 그 판단 자체가 제 방식의 통제였다는 점은 부정하기 어렵습니다.",
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
          "neighbor04:b:d-5:responsibility:0",
          "neighbor04:b:d-5:counter:0",
          "neighbor04:b:d-5:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "neighbor04:b:d-5:responsibility:1",
          "neighbor04:b:d-5:unlock:s5:0",
          "neighbor04:b:d-5:admission:1"
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
      "id": "neighbor04:beat_v2:b:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "emotional",
      "line": "사유화하려던 게 아니라 더는 같은 기록을 쌓고 싶지 않았던 겁니다. 그래도 선 넘은 건 압니다.",
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
          "neighbor04:b:d-5:emotion:0",
          "neighbor04:b:d-5:fear:0",
          "neighbor04:b:d-5:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor04:b:d-5:denial:0",
          "neighbor04:b:d-5:context:0",
          "neighbor04:b:d-5:uncertainty:0"
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
      "id": "neighbor04:beat_v2:b:d-5:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "admit",
      "line": "순서표를 보면 제가 먼저 통제하려 한 흔적이 남네요. 자력 제재 금지 약속을 어긴 건 맞습니다.",
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
          "neighbor04:b:d-5:admission:0",
          "neighbor04:b:d-5:self_justification:0",
          "neighbor04:b:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor04:b:d-5:admission:1",
          "neighbor04:b:d-5:fear:0",
          "neighbor04:b:d-5:unlock:s4:0"
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
      "id": "neighbor04:beat_v2:a:d-1:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "irritated",
      "line": "약속을 더 명확히 다시 정리했어야 했던 건 인정하지만, 도윤 씨도 매번 사람 몰아붙이듯 반응해서 제가 더 버티게 됐습니다. 처음부터 관리사무소를 통했으면 이렇게 꼬이진 않았을 겁니다.",
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
      "id": "neighbor04:beat_v2:a:d-1:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "block",
      "line": "7시 20분 얘기는 이미 했습니다. 같은 식으로 몰아붙이면 여기서 더 길게 답하지 않겠습니다.",
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
      "id": "neighbor04:beat_v2:a:d-1:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "retaliate",
      "line": "핑계 아니에요. 끝난 뒤에도 제가 그 생활에서 못 빠져나온 거라고요.",
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
      "id": "neighbor04:beat_v2:b:d-2:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "irritated",
      "line": "개인 콘을 세운 건 제 잘못이지만, 몇 차례고 같은 일이 반복되다 보니 관리사무소만 기다리기 어렵다고 느꼈습니다. 먼저 약속이 지켜졌다면 저는 그렇게까지 안 했을 겁니다.",
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
      "id": "neighbor04:beat_v2:b:d-2:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "block",
      "line": "개인 콘 얘기는 이미 했습니다. 같은 식으로 몰아붙이면 여기서 더 길게 답하지 않겠습니다.",
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
      "id": "neighbor04:beat_v2:b:d-2:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "retaliate",
      "line": "사유화하려던 게 아니라 더는 같은 기록을 쌓고 싶지 않았던 겁니다. 그래도 선 넘은 건 압니다.",
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
      "id": "neighbor04:beat_v2:a:d-1:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "disclose",
      "line": "서림은 재활이 끝난 뒤에도 배려가 계속될 거라 스스로 믿고 싶어 했고, 규칙 위반자로 보일까 두려워했다.",
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
          "neighbor04:a:d-1:unlock:s4:0",
          "neighbor04:a:d-1:unlock:s5:0",
          "neighbor04:a:d-1:emotion:0"
        ],
        "forbidAtomIds": [
          "neighbor04:a:d-1:timeline:0",
          "neighbor04:a:d-1:denial:0",
          "neighbor04:a:d-1:uncertainty:0"
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
      "id": "neighbor04:beat_v2:a:d-5:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "disclose",
      "line": "서림은 피해자처럼 보이도록 서술을 골라 공개 비난 금지 약속을 먼저 깼다.",
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
          "neighbor04:a:d-5:unlock:s4:0",
          "neighbor04:a:d-5:unlock:s5:0",
          "neighbor04:a:d-5:emotion:0"
        ],
        "forbidAtomIds": [
          "neighbor04:a:d-5:timeline:0",
          "neighbor04:a:d-5:denial:0",
          "neighbor04:a:d-5:context:0"
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
      "id": "neighbor04:beat_v2:b:d-2:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "disclose",
      "line": "도윤은 억울함과 망신주고 싶은 마음을 규정 언어로 감쌌다.",
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
          "neighbor04:b:d-2:unlock:s4:0",
          "neighbor04:b:d-2:unlock:s5:0",
          "neighbor04:b:d-2:emotion:0"
        ],
        "forbidAtomIds": [
          "neighbor04:b:d-2:timeline:0",
          "neighbor04:b:d-2:context:0",
          "neighbor04:b:d-2:uncertainty:0"
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
      "id": "neighbor04:beat_v2:b:d-5:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "disclose",
      "line": "도윤은 공개 확인 전 자력 제재를 하지 않기로 한 약속을 스스로 깼다.",
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
          "neighbor04:b:d-5:unlock:s4:0",
          "neighbor04:b:d-5:unlock:s5:0",
          "neighbor04:b:d-5:emotion:0"
        ],
        "forbidAtomIds": [
          "neighbor04:b:d-5:denial:0",
          "neighbor04:b:d-5:context:0",
          "neighbor04:b:d-5:uncertainty:0"
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
      "id": "neighbor04:beat_v2:a:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interjection",
      "line": "핑계 아니에요. 끝난 뒤에도 제가 그 생활에서 못 빠져나온 거라고요.",
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
          "neighbor04:a:d-1:admission:0",
          "neighbor04:a:d-1:self_justification:0"
        ],
        "forbidAtomIds": [
          "neighbor04:a:d-1:responsibility:1",
          "neighbor04:a:d-1:admission:1"
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
      "id": "neighbor04:beat_v2:b:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interjection",
      "line": "사유화하려던 게 아니라 더는 같은 기록을 쌓고 싶지 않았던 겁니다. 그래도 선 넘은 건 압니다.",
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
          "neighbor04:b:d-2:admission:0",
          "neighbor04:b:d-2:self_justification:0"
        ],
        "forbidAtomIds": [
          "neighbor04:b:d-2:admission:1",
          "neighbor04:b:d-2:responsibility:1"
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
      "id": "neighbor04:beat_v2:a:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "interjection",
      "line": "감정만 세게 올리지 마시고 선확인 약속부터 차분히 말해 주세요. 울분으로 순서를 덮으면 더 꼬입니다.",
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
          "neighbor04:a:d-5:admission:0",
          "neighbor04:a:d-5:self_justification:0"
        ],
        "forbidAtomIds": [
          "neighbor04:a:d-5:unlock:s5:0",
          "neighbor04:a:d-5:admission:1"
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
      "id": "neighbor04:beat_v2:b:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "interjection",
      "line": "감정만 세게 올리지 마시고 선확인 약속부터 차분히 말해 주세요. 울분으로 순서를 덮으면 더 꼬입니다.",
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
          "neighbor04:b:d-5:admission:0",
          "neighbor04:b:d-5:self_justification:0"
        ],
        "forbidAtomIds": [
          "neighbor04:b:d-5:responsibility:1",
          "neighbor04:b:d-5:unlock:s5:0"
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
      "id": "neighbor04:beat_v2:a:d-1:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interjection",
      "line": "7시 20분 하나만 떼서 보면 안 됩니다. 11차례하고 B-7까지 붙여야 그날 흐름이 맞습니다.",
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
          "neighbor04:a:d-1:admission:0",
          "neighbor04:a:d-1:self_justification:0"
        ],
        "forbidAtomIds": [
          "neighbor04:a:d-1:responsibility:1",
          "neighbor04:a:d-1:admission:1"
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
      "id": "neighbor04:beat_v2:b:d-2:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interjection",
      "line": "개인 콘 하나만 떼서 보면 안 됩니다. 와이퍼 메모하고 약속 좀 지키세요까지 붙여야 그날 흐름이 맞습니다.",
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
          "neighbor04:b:d-2:admission:0",
          "neighbor04:b:d-2:self_justification:0"
        ],
        "forbidAtomIds": [
          "neighbor04:b:d-2:admission:1",
          "neighbor04:b:d-2:responsibility:1"
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
      "id": "neighbor04:beat_v2:a:d-5:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "interjection",
      "line": "선확인 약속 숫자나 한 컷만 들이대지 마세요. 민원 9분 전 글가 빠지면 또 다른 결론으로 미끄러집니다.",
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
          "neighbor04:a:d-5:admission:0",
          "neighbor04:a:d-5:self_justification:0"
        ],
        "forbidAtomIds": [
          "neighbor04:a:d-5:unlock:s5:0",
          "neighbor04:a:d-5:admission:1"
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
      "id": "neighbor04:beat_v2:b:d-5:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "interjection",
      "line": "선확인 약속 숫자나 한 컷만 들이대지 마세요. 민원 9분 전 글가 빠지면 또 다른 결론으로 미끄러집니다.",
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
          "neighbor04:b:d-5:admission:0",
          "neighbor04:b:d-5:self_justification:0"
        ],
        "forbidAtomIds": [
          "neighbor04:b:d-5:responsibility:1",
          "neighbor04:b:d-5:unlock:s5:0"
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
      "id": "neighbor04:beat_v2:a:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interjection",
      "line": "그때 보인 장면만으로는 누구라도 범퍼 흠집이 도윤의 당일 보복이라는 오해고 받아들였을 겁니다. 그래서 저도 그 해석을 놓지 못했습니다.",
      "behaviorHint": "본 질문 흐름을 끊고 감정이나 디테일만 날카롭게 던진다.",
      "applicableStates": [
        "M0",
        "M1",
        "M2"
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
          "neighbor04:a:d-3:admission:0",
          "neighbor04:a:d-3:self_justification:0"
        ],
        "forbidAtomIds": [
          "neighbor04:a:d-3:unlock:s5:0",
          "neighbor04:a:d-3:admission:1"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:allow",
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
      "id": "neighbor04:beat_v2:b:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interjection",
      "line": "지금 그 해석이 바로 문제입니다. 범퍼 흠집이 도윤의 당일 보복이라는 오해 쪽으로만 몰리게 하는 단서가 빠져 있잖아요.",
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
          "neighbor04:b:d-3:evidence:0",
          "neighbor04:b:d-3:emotion:0"
        ],
        "forbidAtomIds": [
          "neighbor04:b:d-3:admission:0",
          "neighbor04:b:d-3:context:0"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:misbelief_escalation_block"
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
      "id": "neighbor04:beat_v2:a:d-3:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interjection",
      "line": "그때 보인 장면만으로는 누구라도 범퍼 흠집이 도윤의 당일 보복이라는 오해고 받아들였을 겁니다. 그래서 저도 그 해석을 놓지 못했습니다.",
      "behaviorHint": "본 질문 흐름을 끊고 감정이나 디테일만 날카롭게 던진다.",
      "applicableStates": [
        "M0",
        "M1",
        "M2"
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
          "neighbor04:a:d-3:admission:0",
          "neighbor04:a:d-3:self_justification:0"
        ],
        "forbidAtomIds": [
          "neighbor04:a:d-3:unlock:s5:0",
          "neighbor04:a:d-3:admission:1"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:allow",
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
      "id": "neighbor04:beat_v2:b:d-3:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interjection",
      "line": "지금 그 해석이 바로 문제입니다. 범퍼 흠집이 도윤의 당일 보복이라는 오해 쪽으로만 몰리게 하는 단서가 빠져 있잖아요.",
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
          "neighbor04:b:d-3:evidence:0",
          "neighbor04:b:d-3:emotion:0"
        ],
        "forbidAtomIds": [
          "neighbor04:b:d-3:admission:0",
          "neighbor04:b:d-3:context:0"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:misbelief_escalation_block"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "misbelief_escalation",
        "red_herring"
      ],
      "beliefMode": "suspects"
    }
  ]
} as const;

export default neighbor04BeatsV2Full;
