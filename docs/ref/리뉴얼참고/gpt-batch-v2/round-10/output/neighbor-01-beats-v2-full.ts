export const neighbor01BeatsV2Full = {
  "caseId": "neighbor-01",
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
      "d-3": 5,
      "d-5": 20,
      "d-2": 13,
      "d-4": 7
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
      "a:d-1:surface:mid:evidence:identity",
      "a:d-1:surface:mid:fatigue:responsibility",
      "a:d-1:surface:mid:fatigue:timeline",
      "a:d-1:surface:mid:interjection:detail_rebuttal:allow",
      "a:d-1:surface:mid:interjection:emotional_only:allow",
      "a:d-3:core:late:trap:emotion",
      "a:d-3:motive:late:trap:context",
      "a:d-3:surface:early:trap:context",
      "a:d-3:surface:early:trap:identity",
      "a:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "a:d-4:surface:mid:interjection:trap_signal:block",
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
      "b:d-2:surface:mid:evidence:legality",
      "b:d-2:surface:mid:fatigue:responsibility",
      "b:d-2:surface:mid:fatigue:timeline",
      "b:d-2:surface:mid:interjection:detail_rebuttal:allow",
      "b:d-2:surface:mid:interjection:emotional_only:allow",
      "b:d-4:core:late:trap:emotion",
      "b:d-4:motive:late:trap:context",
      "b:d-4:surface:early:trap:context",
      "b:d-4:surface:early:trap:identity",
      "b:d-4:surface:mid:interjection:misbelief_escalation:block",
      "b:d-4:surface:mid:interjection:trap_signal:allow",
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
      "id": "neighbor01:beat_v2:a:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "저는 상대 현관을 찍으려던 게 아니라 7월 12일 새벽에 물이 떨어지는지 잠깐 확인했을 뿐입니다.",
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
          "neighbor01:a:d-1:act:0"
        ],
        "forbidAtomIds": [
          "neighbor01:a:d-1:admission:1",
          "neighbor01:a:d-1:unlock:s4:0",
          "neighbor01:a:d-1:unlock:s5:0"
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
      "id": "neighbor01:beat_v2:a:d-1:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "촬영이란 말은 과합니다. 길게 둔 것도 아니고 잠깐 확인한 겁니다.",
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
          "neighbor01:a:d-1:evidence:0"
        ],
        "forbidAtomIds": [
          "neighbor01:a:d-1:admission:1",
          "neighbor01:a:d-1:unlock:s4:0",
          "neighbor01:a:d-1:unlock:s5:0"
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
      "id": "neighbor01:beat_v2:a:d-1:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 복도 전체를 오래 찍은 건 아니고 43초 정도 세워 둔 짧은 확인 영상이었습니다.",
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
          "neighbor01:a:d-1:evidence:0"
        ],
        "forbidAtomIds": [
          "neighbor01:a:d-1:admission:1",
          "neighbor01:a:d-1:unlock:s4:0",
          "neighbor01:a:d-1:unlock:s5:0"
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
      "id": "neighbor01:beat_v2:a:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "현관이 같이 들어간 건 맞네요. 그래도 누수 확인 때문에 찍은 겁니다.",
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
          "neighbor01:a:d-1:admission:0",
          "neighbor01:a:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor01:a:d-1:admission:1",
          "neighbor01:a:d-1:unlock:s5:0"
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
      "id": "neighbor01:beat_v2:a:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "justify",
      "line": "문 앞에 통이 놓여 있었으니 그쪽을 볼 수밖에 없었습니다.",
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
          "neighbor01:a:d-1:responsibility:0",
          "neighbor01:a:d-1:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "neighbor01:a:d-1:admission:1",
          "neighbor01:a:d-1:unlock:s5:0"
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
      "id": "neighbor01:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "솔직히 말하면 딸이 깨고 천장에서 물이 떨어지던 밤이라 겁이 나서 확인 방식의 선을 넘었습니다.",
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
          "neighbor01:a:d-1:fear:0",
          "neighbor01:a:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor01:a:d-1:evidence:0",
          "neighbor01:a:d-1:act:0"
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
      "id": "neighbor01:beat_v2:a:d-1:surface:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "admit",
      "line": "현관이 같이 들어간 건 맞네요. 그래도 누수 확인 때문에 찍은 겁니다.",
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
          "neighbor01:a:d-1:admission:0",
          "neighbor01:a:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor01:a:d-1:admission:1",
          "neighbor01:a:d-1:unlock:s4:0",
          "neighbor01:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:evidence:identity",
      "coverageKey": "a:d-1:surface:mid:evidence:identity",
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
      "id": "neighbor01:beat_v2:a:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "mistaken",
      "line": "겉으로 보인 건 분명 그쪽이었습니다. 적어도 당시 제 눈에는 윗집 내부 물이 넘쳐 아래로 번진 상황처럼 보였습니다.",
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
          "neighbor01:a:d-3:evidence:0",
          "neighbor01:a:d-3:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor01:a:d-3:fear:0",
          "neighbor01:a:d-3:unlock:s4:0",
          "neighbor01:a:d-3:unlock:s5:0"
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
      "id": "neighbor01:beat_v2:a:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "mistaken",
      "line": "겉으로 보인 건 분명 그쪽이었습니다. 적어도 당시 제 눈에는 윗집 내부 물이 넘쳐 아래로 번진 상황처럼 보였습니다.",
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
          "neighbor01:a:d-3:evidence:0",
          "neighbor01:a:d-3:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor01:a:d-3:fear:0",
          "neighbor01:a:d-3:unlock:s4:0",
          "neighbor01:a:d-3:unlock:s5:0"
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
      "id": "neighbor01:beat_v2:a:d-3:motive:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "doubt",
      "line": "그 장면만 떼면 몰라도, 제 쪽에서는 다만 그날 복도에 남은 흔적들이 있었으니 제 입장에선 그렇게 연결할 수밖에 없었다고 생각했습니다.",
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
          "neighbor01:a:d-3:context:0",
          "neighbor01:a:d-3:fear:0",
          "neighbor01:a:d-3:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor01:a:d-3:evidence:0",
          "neighbor01:a:d-3:uncertainty:0"
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
      "id": "neighbor01:beat_v2:a:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "clarify",
      "line": "솔직히 말하면 천장 물자국을 보면서 누군가를 바로 특정하지 않으면 피해가 계속될 것 같아 더 집착했습니다.",
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
          "neighbor01:a:d-3:context:0",
          "neighbor01:a:d-3:fear:0",
          "neighbor01:a:d-3:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor01:a:d-3:evidence:0",
          "neighbor01:a:d-3:uncertainty:0"
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
      "id": "neighbor01:beat_v2:a:d-5:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "단체방 글은 공개 비난이 아니라 즉시 확인을 촉구하는 경고였고, 관리사무소에도 이미 말해 둔 상태였습니다.",
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
          "neighbor01:a:d-5:rule:0"
        ],
        "forbidAtomIds": [
          "neighbor01:a:d-5:unlock:s5:0",
          "neighbor01:a:d-5:unlock:s4:0",
          "neighbor01:a:d-5:admission:1"
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
      "id": "neighbor01:beat_v2:a:d-5:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "순서가 완벽하진 않았습니다. 다만 상황이 급해서 메시지가 먼저 나갔습니다.",
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
          "neighbor01:a:d-5:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor01:a:d-5:unlock:s5:0",
          "neighbor01:a:d-5:unlock:s4:0",
          "neighbor01:a:d-5:admission:1"
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
      "id": "neighbor01:beat_v2:a:d-5:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 순서를 아주 어긴 건 아니고, 누수와 소음이 겹쳐서 메시지가 앞당겨졌을 뿐입니다.",
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
          "neighbor01:a:d-5:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor01:a:d-5:unlock:s5:0",
          "neighbor01:a:d-5:unlock:s4:0",
          "neighbor01:a:d-5:admission:1"
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
      "id": "neighbor01:beat_v2:a:d-5:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "제가 504호를 지목한 건 맞습니다.",
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
          "neighbor01:a:d-5:admission:0",
          "neighbor01:a:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor01:a:d-5:unlock:s5:0",
          "neighbor01:a:d-5:admission:1"
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
      "id": "neighbor01:beat_v2:a:d-5:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "justify",
      "line": "지난 약속을 알면서도 반응을 얻으려 공개 채널로 갔습니다.",
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
          "neighbor01:a:d-5:self_justification:0",
          "neighbor01:a:d-5:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "neighbor01:a:d-5:unlock:s5:0",
          "neighbor01:a:d-5:admission:1"
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
      "id": "neighbor01:beat_v2:a:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "emotional",
      "line": "계속 참다가 쓴 겁니다. 매번 관리실만 믿고 기다리면 저희 집 피해는 누가 책임집니까.",
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
          "neighbor01:a:d-5:shame:0",
          "neighbor01:a:d-5:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor01:a:d-5:rule:0",
          "neighbor01:a:d-5:uncertainty:0"
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
      "id": "neighbor01:beat_v2:a:d-5:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "admit",
      "line": "제가 504호를 지목한 건 맞습니다.",
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
          "neighbor01:a:d-5:admission:0",
          "neighbor01:a:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor01:a:d-5:unlock:s5:0",
          "neighbor01:a:d-5:unlock:s4:0",
          "neighbor01:a:d-5:admission:1"
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
      "id": "neighbor01:beat_v2:b:d-2:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "제습기랑 통은 잠깐 둔 거라 적치라고 할 정도는 아니었고, 아래층에도 곧 말하려 했습니다.",
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
          "neighbor01:b:d-2:act:0"
        ],
        "forbidAtomIds": [
          "neighbor01:b:d-2:unlock:s5:0",
          "neighbor01:b:d-2:unlock:s4:0",
          "neighbor01:b:d-2:admission:1"
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
      "id": "neighbor01:beat_v2:b:d-2:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "죄송하긴 한데 잠깐 빼둔 거였어요. 오래 둘 생각은 아니었습니다.",
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
          "neighbor01:b:d-2:self_justification:0"
        ],
        "forbidAtomIds": [
          "neighbor01:b:d-2:unlock:s5:0",
          "neighbor01:b:d-2:unlock:s4:0",
          "neighbor01:b:d-2:admission:1"
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
      ],
      "requiresFlags": [
        "d-2:surface:timeline_pressed"
      ]
    },
    {
      "id": "neighbor01:beat_v2:b:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 죄송하긴 한데 물이 조금 보여서 잠깐 바깥에 뺀 거지, 복도를 막으려던 건 아니었습니다.",
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
          "neighbor01:b:d-2:self_justification:0"
        ],
        "forbidAtomIds": [
          "neighbor01:b:d-2:unlock:s5:0",
          "neighbor01:b:d-2:unlock:s4:0",
          "neighbor01:b:d-2:admission:1"
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
      ]
    },
    {
      "id": "neighbor01:beat_v2:b:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "네, 제습기랑 통, 발판 둔 건 맞습니다.",
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
          "neighbor01:b:d-2:admission:0",
          "neighbor01:b:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor01:b:d-2:unlock:s5:0",
          "neighbor01:b:d-2:admission:1"
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
      "id": "neighbor01:beat_v2:b:d-2:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "justify",
      "line": "문자까지 늦어진 건 포장과 기사 대응이 겹쳤기 때문이에요.",
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
          "neighbor01:b:d-2:timeline:0",
          "neighbor01:b:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "neighbor01:b:d-2:unlock:s5:0",
          "neighbor01:b:d-2:admission:1"
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
        "d-2:surface:identity_pressed"
      ]
    },
    {
      "id": "neighbor01:beat_v2:b:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "죄송하다고 먼저 말한 이유가 있어요. 복도에 꺼내놓은 순간부터 제가 민폐처럼 보일까 겁났거든요.",
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
          "neighbor01:b:d-2:shame:0",
          "neighbor01:b:d-2:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor01:b:d-2:act:0",
          "neighbor01:b:d-2:self_justification:0"
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
      "id": "neighbor01:beat_v2:b:d-2:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "admit",
      "line": "네, 제습기랑 통, 발판 둔 건 맞습니다.",
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
          "neighbor01:b:d-2:admission:0",
          "neighbor01:b:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor01:b:d-2:unlock:s5:0",
          "neighbor01:b:d-2:unlock:s4:0",
          "neighbor01:b:d-2:admission:1"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:evidence:legality",
      "coverageKey": "b:d-2:surface:mid:evidence:legality",
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
      "id": "neighbor01:beat_v2:b:d-4:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "mistaken",
      "line": "겉으로 보인 건 분명 그쪽이었습니다. 죄송하긴 한데 그 시간엔 기사도 있었고 제습기도 돌아서 조금 크게 들렸을 수는 있습니다.",
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
          "neighbor01:b:d-4:denial:0",
          "neighbor01:b:d-4:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor01:b:d-4:unlock:s5:0",
          "neighbor01:b:d-4:fear:0",
          "neighbor01:b:d-4:admission:1"
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
      "beliefMode": "knows"
    },
    {
      "id": "neighbor01:beat_v2:b:d-4:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "mistaken",
      "line": "겉으로 보인 건 분명 그쪽이었습니다. 죄송하긴 한데 그 시간엔 기사도 있었고 제습기도 돌아서 조금 크게 들렸을 수는 있습니다.",
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
          "neighbor01:b:d-4:denial:0",
          "neighbor01:b:d-4:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor01:b:d-4:unlock:s5:0",
          "neighbor01:b:d-4:fear:0",
          "neighbor01:b:d-4:admission:1"
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
      "beliefMode": "knows"
    },
    {
      "id": "neighbor01:beat_v2:b:d-4:motive:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "doubt",
      "line": "그 장면만 떼면 몰라도, 제 쪽에서는 그 밤이 누수 대응이랑 겹쳤으니 소리가 날 수밖에 없었고, 저는 그걸 숨기려 한 건 아닙니다.",
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
          "neighbor01:b:d-4:self_justification:0",
          "neighbor01:b:d-4:fear:0",
          "neighbor01:b:d-4:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor01:b:d-4:denial:0",
          "neighbor01:b:d-4:uncertainty:0"
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
      "beliefMode": "knows"
    },
    {
      "id": "neighbor01:beat_v2:b:d-4:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "clarify",
      "line": "솔직히 말하면 윗집이 또 나를 발망치 이웃으로 볼까 봐 무서워서, 설명보다 사과부터 꺼내게 됐습니다.",
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
          "neighbor01:b:d-4:self_justification:0",
          "neighbor01:b:d-4:fear:0",
          "neighbor01:b:d-4:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor01:b:d-4:denial:0",
          "neighbor01:b:d-4:uncertainty:0"
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
      "beliefMode": "knows"
    },
    {
      "id": "neighbor01:beat_v2:b:d-5:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "관리사무소에는 먼저 말했으니 원칙을 크게 어긴 건 아니고, 아래층 설명만 조금 늦어진 겁니다.",
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
          "neighbor01:b:d-5:rule:0"
        ],
        "forbidAtomIds": [
          "neighbor01:b:d-5:emotion:0",
          "neighbor01:b:d-5:unlock:s5:0",
          "neighbor01:b:d-5:admission:1"
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
      "id": "neighbor01:beat_v2:b:d-5:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "일부러 숨긴 건 아니에요. 다만 직접 설명이 늦었습니다.",
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
          "neighbor01:b:d-5:timeline:0"
        ],
        "forbidAtomIds": [
          "neighbor01:b:d-5:emotion:0",
          "neighbor01:b:d-5:unlock:s5:0",
          "neighbor01:b:d-5:admission:1"
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
      "id": "neighbor01:beat_v2:b:d-5:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 일부러 숨긴 건 아니고 대응이 꼬여서 첫 점검 시간을 놓친 정도입니다.",
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
          "neighbor01:b:d-5:timeline:0"
        ],
        "forbidAtomIds": [
          "neighbor01:b:d-5:emotion:0",
          "neighbor01:b:d-5:unlock:s5:0",
          "neighbor01:b:d-5:admission:1"
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
      "id": "neighbor01:beat_v2:b:d-5:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "첫 점검 시간을 놓친 건 맞아요.",
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
          "neighbor01:b:d-5:admission:0",
          "neighbor01:b:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor01:b:d-5:admission:1",
          "neighbor01:b:d-5:unlock:s5:0"
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
      "id": "neighbor01:beat_v2:b:d-5:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "justify",
      "line": "민원은 먼저 넣고도 문자를 늦게 보낸 건, 제가 겁나서 미뤘기 때문입니다.",
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
          "neighbor01:b:d-5:shame:0",
          "neighbor01:b:d-5:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "neighbor01:b:d-5:admission:1",
          "neighbor01:b:d-5:unlock:s5:0"
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
      "id": "neighbor01:beat_v2:b:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "emotional",
      "line": "죄송하다고 먼저 말한 이유가 있어요. 복도에 꺼내놓은 순간부터 제가 민폐처럼 보일까 겁났거든요.",
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
          "neighbor01:b:d-5:emotion:0",
          "neighbor01:b:d-5:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor01:b:d-5:timeline:0",
          "neighbor01:b:d-5:rule:0"
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
      "id": "neighbor01:beat_v2:b:d-5:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "admit",
      "line": "첫 점검 시간을 놓친 건 맞아요.",
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
          "neighbor01:b:d-5:admission:0",
          "neighbor01:b:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor01:b:d-5:emotion:0",
          "neighbor01:b:d-5:unlock:s5:0",
          "neighbor01:b:d-5:admission:1"
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
      "id": "neighbor01:beat_v2:a:d-1:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "irritated",
      "line": "복도에 제습기와 통이 놓여 있었으니 제 쪽에선 그 장면을 보고 원인을 확인할 수밖에 없다고 여겼습니다.",
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
      "id": "neighbor01:beat_v2:a:d-1:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "block",
      "line": "504호 얘기는 이미 했습니다. 같은 식으로 몰아붙이면 여기서 더 길게 답하지 않겠습니다.",
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
      "id": "neighbor01:beat_v2:a:d-1:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "retaliate",
      "line": "딸이 깨고 천장에서 물이 떨어지던 밤이라 겁이 나서 확인 방식의 선을 넘었습니다.",
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
      "id": "neighbor01:beat_v2:b:d-2:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "irritated",
      "line": "포장 작업이랑 기사 대응이 겹쳐 문자가 늦었고, 그 사이에 상황 설명이 더 꼬였습니다.",
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
      "id": "neighbor01:beat_v2:b:d-2:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "block",
      "line": "제습기 얘기는 이미 했습니다. 같은 식으로 몰아붙이면 여기서 더 길게 답하지 않겠습니다.",
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
      "id": "neighbor01:beat_v2:b:d-2:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "retaliate",
      "line": "죄송하다고 먼저 말한 이유가 있어요. 복도에 꺼내놓은 순간부터 제가 민폐처럼 보일까 겁났거든요.",
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
      "id": "neighbor01:beat_v2:a:d-1:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "disclose",
      "line": "한결은 딸 수면과 누수 불안을 이유로 공식 절차보다 직접 확인을 앞세웠다.",
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
          "neighbor01:a:d-1:unlock:s4:0",
          "neighbor01:a:d-1:unlock:s5:0",
          "neighbor01:a:d-1:fear:0"
        ],
        "forbidAtomIds": [
          "neighbor01:a:d-1:evidence:0",
          "neighbor01:a:d-1:act:0"
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
      "id": "neighbor01:beat_v2:a:d-5:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "disclose",
      "line": "한결은 선통보 약속을 깨고 공개 지목으로 갈등을 키운 점을 인정한다.",
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
          "neighbor01:a:d-5:unlock:s4:0",
          "neighbor01:a:d-5:unlock:s5:0",
          "neighbor01:a:d-5:shame:0"
        ],
        "forbidAtomIds": [
          "neighbor01:a:d-5:rule:0",
          "neighbor01:a:d-5:uncertainty:0"
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
      "id": "neighbor01:beat_v2:b:d-2:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "disclose",
      "line": "민폐 이웃으로 보일까 두려운 마음이 주연의 늦은 공지와 회피를 키웠다.",
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
          "neighbor01:b:d-2:unlock:s4:0",
          "neighbor01:b:d-2:unlock:s5:0",
          "neighbor01:b:d-2:shame:0"
        ],
        "forbidAtomIds": [
          "neighbor01:b:d-2:act:0",
          "neighbor01:b:d-2:self_justification:0"
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
      "id": "neighbor01:beat_v2:b:d-5:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "disclose",
      "line": "주연은 선통보 약속을 지키지 못했고, 그 회피가 분쟁을 더 키웠다고 인정한다.",
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
          "neighbor01:b:d-5:unlock:s4:0",
          "neighbor01:b:d-5:unlock:s5:0",
          "neighbor01:b:d-5:emotion:0"
        ],
        "forbidAtomIds": [
          "neighbor01:b:d-5:timeline:0",
          "neighbor01:b:d-5:rule:0"
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
      "id": "neighbor01:beat_v2:a:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interjection",
      "line": "504호 얘기만 나오면 아직도 숨이 막힙니다. 그 장면을 그냥 넘길 수가 없었어요.",
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
          "neighbor01:a:d-1:admission:0",
          "neighbor01:a:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor01:a:d-1:admission:1",
          "neighbor01:a:d-1:unlock:s5:0"
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
      "id": "neighbor01:beat_v2:b:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interjection",
      "line": "죄송하다고 먼저 말한 이유가 있어요. 복도에 꺼내놓은 순간부터 제가 민폐처럼 보일까 겁났거든요.",
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
          "neighbor01:b:d-2:admission:0",
          "neighbor01:b:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor01:b:d-2:unlock:s5:0",
          "neighbor01:b:d-2:admission:1"
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
      "id": "neighbor01:beat_v2:a:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "interjection",
      "line": "감정만 세게 올리지 마시고 선통보 약속부터 차분히 말해 주세요. 울분으로 순서를 덮으면 더 꼬입니다.",
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
          "neighbor01:a:d-5:admission:0",
          "neighbor01:a:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor01:a:d-5:unlock:s5:0",
          "neighbor01:a:d-5:admission:1"
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
      "id": "neighbor01:beat_v2:b:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "interjection",
      "line": "감정만 세게 올리지 마시고 선통보 약속부터 차분히 말해 주세요. 울분으로 순서를 덮으면 더 꼬입니다.",
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
          "neighbor01:b:d-5:admission:0",
          "neighbor01:b:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor01:b:d-5:admission:1",
          "neighbor01:b:d-5:unlock:s5:0"
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
      "id": "neighbor01:beat_v2:a:d-1:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interjection",
      "line": "504호 하나만 떼서 보면 안 됩니다. 현관 촬영하고 43초까지 붙여야 그날 흐름이 맞습니다.",
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
          "neighbor01:a:d-1:admission:0",
          "neighbor01:a:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor01:a:d-1:admission:1",
          "neighbor01:a:d-1:unlock:s5:0"
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
      "id": "neighbor01:beat_v2:b:d-2:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interjection",
      "line": "제습기 하나만 떼서 보면 안 됩니다. 물받이 통하고 젖은 발판까지 붙여야 그날 흐름이 맞습니다.",
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
          "neighbor01:b:d-2:admission:0",
          "neighbor01:b:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor01:b:d-2:unlock:s5:0",
          "neighbor01:b:d-2:admission:1"
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
      "id": "neighbor01:beat_v2:a:d-5:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "interjection",
      "line": "선통보 약속 숫자나 한 컷만 들이대지 마세요. 단체방 글가 빠지면 또 다른 결론으로 미끄러집니다.",
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
          "neighbor01:a:d-5:admission:0",
          "neighbor01:a:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor01:a:d-5:unlock:s5:0",
          "neighbor01:a:d-5:admission:1"
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
      "id": "neighbor01:beat_v2:b:d-5:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "interjection",
      "line": "선통보 약속 숫자나 한 컷만 들이대지 마세요. 단체방 글가 빠지면 또 다른 결론으로 미끄러집니다.",
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
          "neighbor01:b:d-5:admission:0",
          "neighbor01:b:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor01:b:d-5:admission:1",
          "neighbor01:b:d-5:unlock:s5:0"
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
      "id": "neighbor01:beat_v2:a:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interjection",
      "line": "그때 보인 장면만으로는 누구라도 누수 직접 원인이 윗집 배수라는 오해고 받아들였을 겁니다. 그래서 저도 그 해석을 놓지 못했습니다.",
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
          "neighbor01:a:d-3:admission:0",
          "neighbor01:a:d-3:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor01:a:d-3:unlock:s5:0",
          "neighbor01:a:d-3:admission:1"
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
      "id": "neighbor01:beat_v2:b:d-4:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "interjection",
      "line": "지금 그 해석이 바로 문제입니다. 새벽 소음이 고의 발망치였다는 오해 쪽으로만 몰리게 하는 단서가 빠져 있잖아요.",
      "behaviorHint": "본 질문 흐름을 끊고 감정이나 디테일만 날카롭게 던진다.",
      "applicableStates": [
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
          "block_last_turn"
        ],
        "misconceptionStates": [
          "M2",
          "M3"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor01:b:d-4:admission:0",
          "neighbor01:b:d-4:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor01:b:d-4:unlock:s5:0",
          "neighbor01:b:d-4:admission:1"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-4:surface:mid:interjection:misbelief_escalation:block",
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
      "beliefMode": "knows"
    },
    {
      "id": "neighbor01:beat_v2:b:d-4:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "interjection",
      "line": "발망치만 먼저 던지면 또 같은 오해가 납니다. 잘린 단서가 결정타처럼 보이기 시작하거든요.",
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
          "neighbor01:b:d-4:admission:0",
          "neighbor01:b:d-4:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor01:b:d-4:unlock:s5:0",
          "neighbor01:b:d-4:admission:1"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-4:surface:mid:interjection:trap_signal:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-4:surface:trap_signal_allow"
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
      "id": "neighbor01:beat_v2:a:d-4:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-01",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "interjection",
      "line": "발망치 하나로 끝난 것처럼 말하지 마세요. 앞뒤 맥락이 비어 있는 자료는 덫이 되기 쉽습니다.",
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
          "neighbor01:a:d-4:context:1"
        ],
        "forbidAtomIds": [
          "neighbor01:a:d-4:admission:0"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-4:surface:mid:interjection:trap_signal:block",
      "variantTarget": 2,
      "setFlags": [
        "d-4:surface:trap_signal_block"
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

export default neighbor01BeatsV2Full;
