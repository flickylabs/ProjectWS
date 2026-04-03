export const spouse12BeatsV2Full = {
  "caseId": "spouse-12",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 58,
    "byActionFamily": {
      "question": 28,
      "evidence": 6,
      "fatigue": 6,
      "free_question": 6,
      "interjection": 12
    },
    "byIssueRole": {
      "core_truth": 38,
      "shared_misconception": 12,
      "sub_truth": 8
    },
    "byParty": {
      "a": 27,
      "b": 31
    },
    "byDispute": {
      "d-1": 16,
      "d-2": 13,
      "d-3": 12,
      "d-4": 9,
      "d-5": 8
    },
    "interjectionInfoLevels": {
      "emotional_only": 4,
      "detail_rebuttal": 4,
      "misbelief_escalation": 4
    },
    "coverageMatrix": {
      "question:early:timeline": 2,
      "question:mid:responsibility": 4,
      "question:late:emotion": 8,
      "question:early:context": 6,
      "red_herring:early:identity": 2,
      "red_herring:late:emotion": 2,
      "question:mid:motive": 4,
      "evidence:mid:context": 3,
      "evidence:early:timeline": 2,
      "evidence:early:identity": 1,
      "fatigue:mid:timeline": 2,
      "fatigue:mid:responsibility": 4,
      "free_question:late:legality": 1,
      "free_question:late:context": 2,
      "free_question:late:identity": 1,
      "free_question:late:motive": 1,
      "free_question:late:emotion": 1,
      "interjection:surface:mid:emotional_only:allow": 2,
      "interjection:surface:mid:emotional_only:block": 2,
      "interjection:surface:mid:detail_rebuttal:allow": 2,
      "interjection:surface:mid:detail_rebuttal:block": 2,
      "interjection:surface:mid:misbelief_escalation:allow": 2,
      "interjection:surface:mid:misbelief_escalation:block": 2
    },
    "coverageChecks": {
      "question early timeline": true,
      "question early identity/context": true,
      "question mid responsibility": true,
      "question mid motive": true,
      "question late emotion": true,
      "evidence early|mid context|identity|legality": true,
      "fatigue mid responsibility|timeline": true,
      "free_question late motive|emotion": true
    }
  },
  "beats": [
    {
      "id": "spouse12:beat_v2:a:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "저는 그 익명 계정을 한 적이 없어요.",
      "behaviorHint": "핵심 사실을 부정하거나 범위를 잘게 쪼개며, 순서와 단어 정의에 매달린다.",
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
          "spouse12:a:d-1:denial:0",
          "spouse12:a:d-1:rule:0"
        ],
        "forbidAtomIds": [
          "spouse12:a:d-1:admission:0",
          "spouse12:a:d-1:emotion:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:timeline",
      "coverageKey": "a:d-1:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "requiresFlags": [],
      "tags": [
        "hot",
        "core_truth"
      ]
    },
    {
      "id": "spouse12:beat_v2:a:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "제가 과거 기록을 다 못 보여 준 건 맞아요.",
      "behaviorHint": "사실 일부를 인정하면서도 책임의 방향을 틀거나, 왜 그렇게 했는지의 사정을 방패처럼 꺼낸다.",
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
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:a:d-1:counter:0",
          "spouse12:a:d-1:quote:0"
        ],
        "forbidAtomIds": [
          "spouse12:a:d-1:admission:0"
        ]
      },
      "weight": 6,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:pressure:responsibility",
      "coverageKey": "a:d-1:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-1:motive:responsibility_pressed"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "mid",
        "core_truth"
      ]
    },
    {
      "id": "spouse12:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "가장 아픈 건, 남편이 저를 먼저 의심한 채 사람들 앞에 내놓았다는 거예요.",
      "behaviorHint": "버티던 톤이 낮아지고, 감정선과 관계 책임이 문장 앞쪽으로 밀려 나온다.",
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
          "shaken",
          "hurt"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "frayed",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:a:d-1:emotion:0",
          "spouse12:a:d-1:admission:0"
        ],
        "forbidAtomIds": [
          "spouse12:a:d-1:denial:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-1:core:emotion_opened"
      ],
      "requiresFlags": [
        "d-1:motive:responsibility_pressed"
      ],
      "tags": [
        "late",
        "core_truth"
      ]
    },
    {
      "id": "spouse12:beat_v2:b:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "저는 몇 명에게 확인 차원으로만 공유했지, 세아 씨를 단정한 건 아닙니다.",
      "behaviorHint": "핵심 사실을 부정하거나 범위를 잘게 쪼개며, 순서와 단어 정의에 매달린다.",
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
          "spouse12:b:d-1:denial:0",
          "spouse12:b:d-1:rule:0"
        ],
        "forbidAtomIds": [
          "spouse12:b:d-1:unlock:s5:0",
          "spouse12:b:d-1:unlock:s4:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:timeline",
      "coverageKey": "b:d-1:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "requiresFlags": [],
      "tags": [
        "hot",
        "core_truth"
      ]
    },
    {
      "id": "spouse12:beat_v2:b:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "운영진 단톡에는 먼저 보냈습니다.",
      "behaviorHint": "사실 일부를 인정하면서도 책임의 방향을 틀거나, 왜 그렇게 했는지의 사정을 방패처럼 꺼낸다.",
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
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:b:d-1:unlock:s2:0",
          "spouse12:b:d-1:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse12:b:d-1:unlock:s5:0"
        ]
      },
      "weight": 6,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:pressure:responsibility",
      "coverageKey": "b:d-1:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-1:motive:responsibility_pressed"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "mid",
        "core_truth"
      ]
    },
    {
      "id": "spouse12:beat_v2:b:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "돌이켜 보면 저는 배우자를 보호한 게 아니라 제 평판부터 방어한 겁니다.",
      "behaviorHint": "버티던 톤이 낮아지고, 감정선과 관계 책임이 문장 앞쪽으로 밀려 나온다.",
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
          "shaken",
          "hurt"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "frayed",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:b:d-1:unlock:s4:0",
          "spouse12:b:d-1:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse12:b:d-1:denial:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:rapport:emotion",
      "coverageKey": "b:d-1:core:late:rapport:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-1:core:emotion_opened"
      ],
      "requiresFlags": [
        "d-1:motive:responsibility_pressed"
      ],
      "tags": [
        "late",
        "core_truth"
      ]
    },
    {
      "id": "spouse12:beat_v2:a:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "저는 옛 자료를 거의 그대로 보여 줬어요.",
      "behaviorHint": "핵심 사실을 부정하거나 범위를 잘게 쪼개며, 순서와 단어 정의에 매달린다.",
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
          "spouse12:a:d-2:denial:0",
          "spouse12:a:d-2:context:0"
        ],
        "forbidAtomIds": [
          "spouse12:a:d-2:unlock:s5:0",
          "spouse12:a:d-2:unlock:s4:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:pressure:context",
      "coverageKey": "a:d-2:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:context_pressed"
      ],
      "requiresFlags": [],
      "tags": [
        "hot",
        "core_truth"
      ]
    },
    {
      "id": "spouse12:beat_v2:a:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "한유진에게 심하게 보낸 메시지 하나는 뺐어요.",
      "behaviorHint": "사실 일부를 인정하면서도 책임의 방향을 틀거나, 왜 그렇게 했는지의 사정을 방패처럼 꺼낸다.",
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
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:a:d-2:unlock:s2:0",
          "spouse12:a:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse12:a:d-2:unlock:s5:0"
        ]
      },
      "weight": 6,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:pressure:responsibility",
      "coverageKey": "a:d-2:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-2:motive:responsibility_pressed"
      ],
      "requiresFlags": [
        "d-2:surface:context_pressed"
      ],
      "tags": [
        "mid",
        "core_truth"
      ]
    },
    {
      "id": "spouse12:beat_v2:a:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "솔직히 그 메시지는 제일 보여 주기 싫었어요.",
      "behaviorHint": "버티던 톤이 낮아지고, 감정선과 관계 책임이 문장 앞쪽으로 밀려 나온다.",
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
          "shaken",
          "hurt"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "frayed",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:a:d-2:unlock:s4:0",
          "spouse12:a:d-2:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse12:a:d-2:denial:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:core:rapport:emotion",
      "coverageKey": "a:d-2:core:late:rapport:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-2:core:emotion_opened"
      ],
      "requiresFlags": [
        "d-2:motive:responsibility_pressed"
      ],
      "tags": [
        "late",
        "core_truth"
      ]
    },
    {
      "id": "spouse12:beat_v2:b:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "세아 씨가 자료를 다 보여 준 건 아니라고 봤습니다.",
      "behaviorHint": "핵심 사실을 부정하거나 범위를 잘게 쪼개며, 순서와 단어 정의에 매달린다.",
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
          "spouse12:b:d-2:evidence:0",
          "spouse12:b:d-2:rule:0"
        ],
        "forbidAtomIds": [
          "spouse12:b:d-2:admission:0",
          "spouse12:b:d-2:emotion:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:context",
      "coverageKey": "b:d-2:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:context_pressed"
      ],
      "requiresFlags": [],
      "tags": [
        "hot",
        "core_truth"
      ]
    },
    {
      "id": "spouse12:beat_v2:b:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "복원 로그를 보니 정말로 메시지 하나를 빼고 보냈더군요.",
      "behaviorHint": "사실 일부를 인정하면서도 책임의 방향을 틀거나, 왜 그렇게 했는지의 사정을 방패처럼 꺼낸다.",
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
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:b:d-2:evidence:1",
          "spouse12:b:d-2:quote:0"
        ],
        "forbidAtomIds": [
          "spouse12:b:d-2:admission:0"
        ]
      },
      "weight": 6,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:pressure:responsibility",
      "coverageKey": "b:d-2:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-2:motive:responsibility_pressed"
      ],
      "requiresFlags": [
        "d-2:surface:context_pressed"
      ],
      "tags": [
        "mid",
        "core_truth"
      ]
    },
    {
      "id": "spouse12:beat_v2:b:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "그 메시지를 보면 누구라도 충격받았을 겁니다.",
      "behaviorHint": "버티던 톤이 낮아지고, 감정선과 관계 책임이 문장 앞쪽으로 밀려 나온다.",
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
          "shaken",
          "hurt"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "frayed",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:b:d-2:emotion:0",
          "spouse12:b:d-2:admission:0"
        ],
        "forbidAtomIds": [
          "spouse12:b:d-2:evidence:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:core:rapport:emotion",
      "coverageKey": "b:d-2:core:late:rapport:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-2:core:emotion_opened"
      ],
      "requiresFlags": [
        "d-2:motive:responsibility_pressed"
      ],
      "tags": [
        "late",
        "core_truth"
      ]
    },
    {
      "id": "spouse12:beat_v2:a:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "misbelief",
      "line": "처음엔 저도 한유진 씨 쪽이 떠오르긴 했어요.",
      "behaviorHint": "부분 단서와 상징을 근거로 오해를 굳히며, 의심의 초점을 더 날카롭게 만든다.",
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
          "spouse12:a:d-3:identity:0",
          "spouse12:a:d-3:uncertainty:0"
        ],
        "forbidAtomIds": [
          "spouse12:a:d-3:institution:0",
          "spouse12:a:d-3:shame:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:identity",
      "coverageKey": "a:d-3:surface:early:trap:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-3:surface:identity_misread"
      ],
      "requiresFlags": [],
      "tags": [
        "hot",
        "shared_misconception",
        "red_herring"
      ]
    },
    {
      "id": "spouse12:beat_v2:a:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "doubt",
      "line": "한유진 씨한테는 너무 잔인한 추측이었어요.",
      "behaviorHint": "잘못된 해석이 풀리며 감정과 후회를 섞어 말하기 시작한다.",
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
          "shaken",
          "hurt"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "frayed",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:a:d-3:shame:0",
          "spouse12:a:d-3:institution:0"
        ],
        "forbidAtomIds": [
          "spouse12:a:d-3:identity:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:trap:emotion",
      "coverageKey": "a:d-3:core:late:trap:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-3:surface:trap_disarmed",
        "d-3:core:emotion_clarified"
      ],
      "requiresFlags": [
        "d-3:surface:identity_misread"
      ],
      "tags": [
        "late",
        "shared_misconception",
        "red_herring"
      ]
    },
    {
      "id": "spouse12:beat_v2:b:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "misbelief",
      "line": "정황상 한유진 씨가 가장 의심스러웠습니다.",
      "behaviorHint": "부분 단서와 상징을 근거로 오해를 굳히며, 의심의 초점을 더 날카롭게 만든다.",
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
          "spouse12:b:d-3:identity:0",
          "spouse12:b:d-3:uncertainty:0"
        ],
        "forbidAtomIds": [
          "spouse12:b:d-3:unlock:s5:0",
          "spouse12:b:d-3:unlock:s4:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:identity",
      "coverageKey": "b:d-3:surface:early:trap:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-3:surface:identity_misread"
      ],
      "requiresFlags": [],
      "tags": [
        "hot",
        "shared_misconception",
        "red_herring"
      ]
    },
    {
      "id": "spouse12:beat_v2:b:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "doubt",
      "line": "생각해 보면 그 추측은 상처받은 사람에게 너무 쉬운 방향으로 칼끝을 돌린 거였습니다.",
      "behaviorHint": "잘못된 해석이 풀리며 감정과 후회를 섞어 말하기 시작한다.",
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
          "shaken",
          "hurt"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "frayed",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:b:d-3:unlock:s4:0",
          "spouse12:b:d-3:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse12:b:d-3:identity:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:trap:emotion",
      "coverageKey": "b:d-3:core:late:trap:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-3:surface:trap_disarmed",
        "d-3:core:emotion_clarified"
      ],
      "requiresFlags": [
        "d-3:surface:identity_misread"
      ],
      "tags": [
        "late",
        "shared_misconception",
        "red_herring"
      ]
    },
    {
      "id": "spouse12:beat_v2:a:d-4:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "저 캡처 묶음은 제 과거처럼 보이게 만들어졌지만, 제가 만든 건 아니에요.",
      "behaviorHint": "핵심 사실을 부정하거나 범위를 잘게 쪼개며, 순서와 단어 정의에 매달린다.",
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
          "spouse12:a:d-4:denial:0",
          "spouse12:a:d-4:rule:0"
        ],
        "forbidAtomIds": [
          "spouse12:a:d-4:unlock:s5:0",
          "spouse12:a:d-4:unlock:s4:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:pressure:context",
      "coverageKey": "a:d-4:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-4:surface:context_pressed"
      ],
      "requiresFlags": [],
      "tags": [
        "hot",
        "core_truth"
      ]
    },
    {
      "id": "spouse12:beat_v2:a:d-4:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "포렌식 보고서를 보고 나서야 확실해졌어요.",
      "behaviorHint": "사실 일부를 인정하면서도 책임의 방향을 틀거나, 왜 그렇게 했는지의 사정을 방패처럼 꺼낸다.",
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
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:a:d-4:unlock:s2:0",
          "spouse12:a:d-4:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse12:a:d-4:unlock:s5:0"
        ]
      },
      "weight": 6,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:motive:motive",
      "coverageKey": "a:d-4:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-4:motive:motive_pressed"
      ],
      "requiresFlags": [
        "d-4:surface:context_pressed"
      ],
      "tags": [
        "mid",
        "core_truth"
      ]
    },
    {
      "id": "spouse12:beat_v2:a:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "emotional",
      "line": "정말 무서웠던 건, 거짓인데도 제 과거 일부가 섞여 있어서 다들 더 쉽게 믿었다는 거예요.",
      "behaviorHint": "버티던 톤이 낮아지고, 감정선과 관계 책임이 문장 앞쪽으로 밀려 나온다.",
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
          "shaken",
          "hurt"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "frayed",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:a:d-4:unlock:s4:0",
          "spouse12:a:d-4:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse12:a:d-4:denial:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:core:rapport:emotion",
      "coverageKey": "a:d-4:core:late:rapport:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-4:core:emotion_opened"
      ],
      "requiresFlags": [
        "d-4:motive:motive_pressed"
      ],
      "tags": [
        "late",
        "core_truth"
      ]
    },
    {
      "id": "spouse12:beat_v2:b:d-4:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "그 캡처는 당시엔 위조처럼 보이지 않았습니다.",
      "behaviorHint": "핵심 사실을 부정하거나 범위를 잘게 쪼개며, 순서와 단어 정의에 매달린다.",
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
          "spouse12:b:d-4:denial:0",
          "spouse12:b:d-4:threshold:0"
        ],
        "forbidAtomIds": [
          "spouse12:b:d-4:unlock:s5:0",
          "spouse12:b:d-4:unlock:s4:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:surface:pressure:context",
      "coverageKey": "b:d-4:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-4:surface:context_pressed"
      ],
      "requiresFlags": [],
      "tags": [
        "hot",
        "core_truth"
      ]
    },
    {
      "id": "spouse12:beat_v2:b:d-4:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "포렌식 자료를 보고 나서는 조작 가능성을 부정할 수 없었습니다.",
      "behaviorHint": "사실 일부를 인정하면서도 책임의 방향을 틀거나, 왜 그렇게 했는지의 사정을 방패처럼 꺼낸다.",
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
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:b:d-4:unlock:s2:0",
          "spouse12:b:d-4:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse12:b:d-4:unlock:s5:0"
        ]
      },
      "weight": 6,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:motive:motive:motive",
      "coverageKey": "b:d-4:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-4:motive:motive_pressed"
      ],
      "requiresFlags": [
        "d-4:surface:context_pressed"
      ],
      "tags": [
        "mid",
        "core_truth"
      ]
    },
    {
      "id": "spouse12:beat_v2:b:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "emotional",
      "line": "사실 저는 위조 여부보다도 '혹시 진짜면 내 공적 신뢰가 같이 무너진다'는 공포에 더 끌려갔습니다.",
      "behaviorHint": "버티던 톤이 낮아지고, 감정선과 관계 책임이 문장 앞쪽으로 밀려 나온다.",
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
          "shaken",
          "hurt"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "frayed",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:b:d-4:unlock:s4:0",
          "spouse12:b:d-4:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse12:b:d-4:denial:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:core:rapport:emotion",
      "coverageKey": "b:d-4:core:late:rapport:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-4:core:emotion_opened"
      ],
      "requiresFlags": [
        "d-4:motive:motive_pressed"
      ],
      "tags": [
        "late",
        "core_truth"
      ]
    },
    {
      "id": "spouse12:beat_v2:a:d-5:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "2006년 일은 거의 누명에 가까웠어요.",
      "behaviorHint": "핵심 사실을 부정하거나 범위를 잘게 쪼개며, 순서와 단어 정의에 매달린다.",
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
          "spouse12:a:d-5:denial:1",
          "spouse12:a:d-5:uncertainty:0"
        ],
        "forbidAtomIds": [
          "spouse12:a:d-5:unlock:s5:0",
          "spouse12:a:d-5:unlock:s4:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:pressure:context",
      "coverageKey": "a:d-5:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-5:surface:context_pressed"
      ],
      "requiresFlags": [],
      "tags": [
        "hot",
        "sub_truth"
      ]
    },
    {
      "id": "spouse12:beat_v2:a:d-5:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "맞아요, 저는 한유진 씨에게 심하게 말했고 공개적으로도 부딪쳤어요.",
      "behaviorHint": "사실 일부를 인정하면서도 책임의 방향을 틀거나, 왜 그렇게 했는지의 사정을 방패처럼 꺼낸다.",
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
          "agitated",
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:a:d-5:unlock:s2:0",
          "spouse12:a:d-5:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse12:a:d-5:unlock:s5:0"
        ]
      },
      "weight": 6,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:motive:motive",
      "coverageKey": "a:d-5:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:motive_pressed"
      ],
      "requiresFlags": [
        "d-5:surface:context_pressed"
      ],
      "tags": [
        "mid",
        "sub_truth"
      ]
    },
    {
      "id": "spouse12:beat_v2:a:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "emotional",
      "line": "제가 가장 숨기고 싶었던 건, 그때 제가 정말 못된 말을 했다는 사실이에요.",
      "behaviorHint": "버티던 톤이 낮아지고, 감정선과 관계 책임이 문장 앞쪽으로 밀려 나온다.",
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
          "shaken",
          "hurt"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "frayed",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:a:d-5:unlock:s4:0",
          "spouse12:a:d-5:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse12:a:d-5:denial:1"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:rapport:emotion",
      "coverageKey": "a:d-5:core:late:rapport:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-5:core:emotion_opened"
      ],
      "requiresFlags": [
        "d-5:motive:motive_pressed"
      ],
      "tags": [
        "late",
        "sub_truth"
      ]
    },
    {
      "id": "spouse12:beat_v2:b:d-5:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "2006년 일을 완전한 누명이라고만 보긴 어렵습니다.",
      "behaviorHint": "핵심 사실을 부정하거나 범위를 잘게 쪼개며, 순서와 단어 정의에 매달린다.",
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
          "spouse12:b:d-5:counter:0",
          "spouse12:b:d-5:admission:0"
        ],
        "forbidAtomIds": [
          "spouse12:b:d-5:admission:1",
          "spouse12:b:d-5:shame:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:pressure:context",
      "coverageKey": "b:d-5:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-5:surface:context_pressed"
      ],
      "requiresFlags": [],
      "tags": [
        "hot",
        "sub_truth"
      ]
    },
    {
      "id": "spouse12:beat_v2:b:d-5:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "원본 메일과 학교 기록을 보면 세아 씨가 거칠게 군 건 맞습니다.",
      "behaviorHint": "사실 일부를 인정하면서도 책임의 방향을 틀거나, 왜 그렇게 했는지의 사정을 방패처럼 꺼낸다.",
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
          "agitated",
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:b:d-5:evidence:0",
          "spouse12:b:d-5:self_justification:0"
        ],
        "forbidAtomIds": [
          "spouse12:b:d-5:admission:1"
        ]
      },
      "weight": 6,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:motive:motive",
      "coverageKey": "b:d-5:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:motive_pressed"
      ],
      "requiresFlags": [
        "d-5:surface:context_pressed"
      ],
      "tags": [
        "mid",
        "sub_truth"
      ]
    },
    {
      "id": "spouse12:beat_v2:b:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "emotional",
      "line": "솔직히 저는 세아 씨 과거를 떠올릴수록 배우자보다 '내가 이런 사람과 엮여 보이면 어떡하나'를 먼저 생각했습니다.",
      "behaviorHint": "버티던 톤이 낮아지고, 감정선과 관계 책임이 문장 앞쪽으로 밀려 나온다.",
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
          "shaken",
          "hurt"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "frayed",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:b:d-5:shame:0",
          "spouse12:b:d-5:admission:1"
        ],
        "forbidAtomIds": [
          "spouse12:b:d-5:counter:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:rapport:emotion",
      "coverageKey": "b:d-5:core:late:rapport:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-5:core:emotion_opened"
      ],
      "requiresFlags": [
        "d-5:motive:motive_pressed"
      ],
      "tags": [
        "late",
        "sub_truth"
      ]
    },
    {
      "id": "spouse12:beat_v2:b:d-1:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "impeach",
      "line": "로그가 저렇게 남아 있으면, 제가 먼저 전달한 사실 자체는 인정해야겠네요.",
      "behaviorHint": "짧게 한숨을 내쉰다.",
      "applicableStates": [
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
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:b:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse12:b:d-1:denial:0"
        ]
      },
      "weight": 6,
      "priority": 35,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:evidence:context",
      "coverageKey": "b:d-1:motive:mid:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:context_evidence_shown"
      ],
      "tags": [
        "cold",
        "evidence",
        "core_truth"
      ],
      "sourceEvidenceIds": [
        "e-1"
      ]
    },
    {
      "id": "spouse12:beat_v2:a:d-2:surface:evidence:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "establish",
      "line": "복원 로그까지 나오면 더는 '정리 중이었다'는 말만으론 못 버팁니다. 뺀 메시지가 있었다는 건 인정해야겠네요.",
      "behaviorHint": "입술을 깨물고 화면을 오래 본다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "evidence_response",
      "angleTag": "timeline",
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
          "spouse12:a:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse12:a:d-2:unlock:s5:0",
          "spouse12:a:d-2:unlock:s4:0"
        ]
      },
      "weight": 6,
      "priority": 35,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:evidence:timeline",
      "coverageKey": "a:d-2:surface:early:evidence:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:timeline_evidence_shown"
      ],
      "tags": [
        "cold",
        "evidence",
        "core_truth"
      ],
      "sourceEvidenceIds": [
        "e-2"
      ]
    },
    {
      "id": "spouse12:beat_v2:b:d-3:surface:trap:identity:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "reframe",
      "line": "캡처만 놓고 너무 빨리 방향을 정했네요. 근거가 약했다는 건 인정합니다.",
      "behaviorHint": "입술을 다문 채 짧게 고개를 끄덕인다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
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
          "spouse12:b:d-3:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse12:b:d-3:unlock:s5:0",
          "spouse12:b:d-3:unlock:s4:0"
        ]
      },
      "weight": 6,
      "priority": 35,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:identity",
      "coverageKey": "b:d-3:surface:early:trap:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-3:surface:identity_evidence_shown",
        "d-3:surface:trap_disarmed"
      ],
      "tags": [
        "cold",
        "evidence",
        "shared_misconception",
        "red_herring"
      ],
      "sourceEvidenceIds": [
        "e-3"
      ]
    },
    {
      "id": "spouse12:beat_v2:b:d-4:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "impeach",
      "line": "포렌식이 이렇게 나오면 조작 가능성을 더는 외면할 수 없네요.",
      "behaviorHint": "어깨가 한번 내려앉는다.",
      "applicableStates": [
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
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:b:d-4:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse12:b:d-4:denial:0"
        ]
      },
      "weight": 6,
      "priority": 35,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:motive:evidence:context",
      "coverageKey": "b:d-4:motive:mid:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-4:motive:context_evidence_shown"
      ],
      "tags": [
        "cold",
        "evidence",
        "core_truth"
      ],
      "sourceEvidenceIds": [
        "e-4"
      ]
    },
    {
      "id": "spouse12:beat_v2:b:d-4:surface:evidence:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "establish",
      "line": "포렌식 보고서는 방명록 배경 레이어와 문자 말풍선이 서로 다른 출처에서 왔고 2026년에 합성됐음을 지적한다.",
      "behaviorHint": "증거가 제시되자 사실 하나를 인정하되 곧바로 해석을 붙인다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "evidence_response",
      "angleTag": "timeline",
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
          "spouse12:b:d-4:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse12:b:d-4:unlock:s5:0",
          "spouse12:b:d-4:unlock:s4:0"
        ]
      },
      "weight": 6,
      "priority": 35,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:surface:evidence:timeline",
      "coverageKey": "b:d-4:surface:early:evidence:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-4:surface:timeline_evidence_shown"
      ],
      "tags": [
        "cold",
        "evidence",
        "core_truth"
      ],
      "sourceEvidenceIds": [
        "e-5"
      ]
    },
    {
      "id": "spouse12:beat_v2:a:d-2:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "impeach",
      "line": "그래도 숨긴 건 숨긴 겁니다. 그 선택 삭제는 제가 떠안아야 할 책임이에요.",
      "behaviorHint": "어깨를 내리고 정면을 바라본다.",
      "applicableStates": [
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
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:a:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse12:a:d-2:denial:0"
        ]
      },
      "weight": 6,
      "priority": 35,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:evidence:context",
      "coverageKey": "a:d-2:motive:mid:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:context_evidence_shown"
      ],
      "tags": [
        "cold",
        "evidence",
        "core_truth"
      ],
      "sourceEvidenceIds": [
        "e-6"
      ]
    },
    {
      "id": "spouse12:beat_v2:b:d-1:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "irritate",
      "line": "같은 대목은 이미 답했습니다. 운영진 단톡에는 먼저 보냈습니다.",
      "behaviorHint": "답을 끊지 않되, 짜증을 눌러 담고 같은 설명을 반복한다.",
      "applicableStates": [
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
        "emotionTiers": [
          "agitated",
          "hurt"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "frayed",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:b:d-1:unlock:s2:0",
          "spouse12:b:d-1:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse12:b:d-1:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:fatigue:timeline",
      "coverageKey": "b:d-1:surface:mid:fatigue:timeline",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:fatigue_warning"
      ],
      "tags": [
        "fatigue",
        "core_truth"
      ]
    },
    {
      "id": "spouse12:beat_v2:b:d-1:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "stonewall",
      "line": "더는 그 질문 방식으로는 못 갑니다. 그때는 세아 씨 개인 문제를 넘어서 제 가족 체면이랑 직장 신뢰까지 걸려 있다고 느꼈습니다.",
      "behaviorHint": "문장을 짧게 자르며 더 같은 프레임으로 묻지 말라는 신호를 준다.",
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
          "hurt"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "frayed",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:b:d-1:unlock:s2:0",
          "spouse12:b:d-1:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse12:b:d-1:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:fatigue:responsibility",
      "coverageKey": "b:d-1:surface:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:fatigue_cutoff"
      ],
      "tags": [
        "fatigue",
        "core_truth"
      ]
    },
    {
      "id": "spouse12:beat_v2:b:d-1:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "retaliate",
      "line": "계속 그 문제만 떼어내면 판이 틀어집니다. 그때는 세아 씨 개인 문제를 넘어서 제 가족 체면이랑 직장 신뢰까지 걸려 있다고 느꼈습니다.",
      "behaviorHint": "피로가 높아지자 방어에서 반격으로 전환해 상대 프레임을 되받아친다.",
      "applicableStates": [
        "S3"
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
          "hurt"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "frayed",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:b:d-1:unlock:s2:0",
          "spouse12:b:d-1:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse12:b:d-1:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:fatigue:responsibility",
      "coverageKey": "b:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-1:motive:fatigue_counter"
      ],
      "tags": [
        "fatigue",
        "core_truth"
      ]
    },
    {
      "id": "spouse12:beat_v2:a:d-2:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "irritate",
      "line": "같은 대목은 이미 답했습니다. 한유진에게 심하게 보낸 메시지 하나는 뺐어요.",
      "behaviorHint": "답을 끊지 않되, 짜증을 눌러 담고 같은 설명을 반복한다.",
      "applicableStates": [
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
        "emotionTiers": [
          "agitated",
          "hurt"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "frayed",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:a:d-2:unlock:s2:0",
          "spouse12:a:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse12:a:d-2:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:fatigue:timeline",
      "coverageKey": "a:d-2:surface:mid:fatigue:timeline",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:fatigue_warning"
      ],
      "tags": [
        "fatigue",
        "core_truth"
      ]
    },
    {
      "id": "spouse12:beat_v2:a:d-2:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "stonewall",
      "line": "더는 그 질문 방식으로는 못 갑니다. 제가 한 건 원자료 조작이 아니라 노출 순서를 바꾼 거예요.",
      "behaviorHint": "문장을 짧게 자르며 더 같은 프레임으로 묻지 말라는 신호를 준다.",
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
          "hurt"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "frayed",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:a:d-2:unlock:s2:0",
          "spouse12:a:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse12:a:d-2:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:fatigue:responsibility",
      "coverageKey": "a:d-2:surface:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:fatigue_cutoff"
      ],
      "tags": [
        "fatigue",
        "core_truth"
      ]
    },
    {
      "id": "spouse12:beat_v2:a:d-2:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "retaliate",
      "line": "계속 그 문제만 떼어내면 판이 틀어집니다. 제가 한 건 원자료 조작이 아니라 노출 순서를 바꾼 거예요.",
      "behaviorHint": "피로가 높아지자 방어에서 반격으로 전환해 상대 프레임을 되받아친다.",
      "applicableStates": [
        "S3"
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
          "hurt"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "frayed",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:a:d-2:unlock:s2:0",
          "spouse12:a:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse12:a:d-2:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:fatigue:responsibility",
      "coverageKey": "a:d-2:motive:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-2:motive:fatigue_counter"
      ],
      "tags": [
        "fatigue",
        "core_truth"
      ]
    },
    {
      "id": "spouse12:beat_v2:b:d-1:core:pressure:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "answer",
      "line": "네, 저는 세아 씨와 충분히 확인하기 전에 외부로 돌렸고 사실상 가해자처럼 말했습니다.",
      "behaviorHint": "정면 대답을 피하지 않으려 하지만, 이유나 감정의 의미를 먼저 고른 뒤 천천히 꺼낸다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "legality",
      "actionFamily": "free_question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "shaken",
          "hurt"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "frayed",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:a:d-1:counter:0",
          "spouse12:b:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse12:b:d-1:denial:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:pressure:legality",
      "coverageKey": "b:d-1:core:late:pressure:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-1:core:legality_free_opened"
      ],
      "requiresFlags": [],
      "tags": [
        "late",
        "free_question",
        "core_truth"
      ],
      "hookId": "fq:d-1:spread_scope"
    },
    {
      "id": "spouse12:beat_v2:a:d-2:core:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "answer",
      "line": "네, 저는 옛 백업에서 제게 가장 불리한 메시지 하나를 숨겼어요.",
      "behaviorHint": "정면 대답을 피하지 않으려 하지만, 이유나 감정의 의미를 먼저 고른 뒤 천천히 꺼낸다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "context",
      "actionFamily": "free_question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "shaken",
          "hurt"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "frayed",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:a:d-2:unlock:s2:0",
          "spouse12:b:d-2:evidence:1"
        ],
        "forbidAtomIds": [
          "spouse12:a:d-2:denial:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:core:pressure:context",
      "coverageKey": "a:d-2:core:late:pressure:context",
      "variantTarget": 3,
      "setFlags": [
        "d-2:core:context_free_opened"
      ],
      "requiresFlags": [],
      "tags": [
        "late",
        "free_question",
        "core_truth"
      ],
      "hookId": "fq:d-2:omitted_message"
    },
    {
      "id": "spouse12:beat_v2:a:d-3:core:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "answer",
      "line": "결론적으로 익명 계정은 한유진 씨 복수가 아니었어요.",
      "behaviorHint": "정면 대답을 피하지 않으려 하지만, 이유나 감정의 의미를 먼저 고른 뒤 천천히 꺼낸다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "core",
      "issueRole": "shared_misconception",
      "responseIntent": "pressure_response",
      "angleTag": "identity",
      "actionFamily": "free_question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "shaken",
          "hurt"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "frayed",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:a:d-3:admission:0",
          "spouse12:b:d-3:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse12:a:d-3:identity:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:pressure:identity",
      "coverageKey": "a:d-3:core:late:pressure:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-3:core:identity_free_opened"
      ],
      "requiresFlags": [],
      "tags": [
        "late",
        "free_question",
        "shared_misconception"
      ],
      "hookId": "fq:d-3:operator_identity"
    },
    {
      "id": "spouse12:beat_v2:b:d-4:core:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "answer",
      "line": "결정적 2006년 증거처럼 돌던 자료는 2026년 위조본이 맞습니다.",
      "behaviorHint": "정면 대답을 피하지 않으려 하지만, 이유나 감정의 의미를 먼저 고른 뒤 천천히 꺼낸다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "context",
      "actionFamily": "free_question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "shaken",
          "hurt"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "frayed",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:a:d-4:unlock:s2:0",
          "spouse12:b:d-4:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse12:b:d-4:denial:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:core:pressure:context",
      "coverageKey": "b:d-4:core:late:pressure:context",
      "variantTarget": 3,
      "setFlags": [
        "d-4:core:context_free_opened"
      ],
      "requiresFlags": [],
      "tags": [
        "late",
        "free_question",
        "core_truth"
      ],
      "hookId": "fq:d-4:forgery_signal"
    },
    {
      "id": "spouse12:beat_v2:a:d-5:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "reflect",
      "line": "2006년에 저는 한유진 씨에게 상처를 줬습니다.",
      "behaviorHint": "정면 대답을 피하지 않으려 하지만, 이유나 감정의 의미를 먼저 고른 뒤 천천히 꺼낸다.",
      "applicableStates": [
        "S3",
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
          "shaken",
          "hurt"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "frayed",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:a:d-5:unlock:s2:0",
          "spouse12:b:d-5:evidence:0"
        ],
        "forbidAtomIds": [
          "spouse12:a:d-5:denial:1"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:motive:motive",
      "coverageKey": "a:d-5:core:late:motive:motive",
      "variantTarget": 3,
      "setFlags": [
        "d-5:core:motive_free_opened"
      ],
      "requiresFlags": [],
      "tags": [
        "late",
        "free_question",
        "sub_truth"
      ],
      "hookId": "fq:d-5:past_vs_present"
    },
    {
      "id": "spouse12:beat_v2:b:d-1:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "reflect",
      "line": "네, 저는 세아 씨와 충분히 확인하기 전에 외부로 돌렸고 사실상 가해자처럼 말했습니다.",
      "behaviorHint": "정면 대답을 피하지 않으려 하지만, 이유나 감정의 의미를 먼저 고른 뒤 천천히 꺼낸다.",
      "applicableStates": [
        "S4",
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
          "shaken",
          "hurt"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "frayed",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:a:d-1:counter:0",
          "spouse12:b:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse12:b:d-1:denial:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:rapport:emotion",
      "coverageKey": "b:d-1:core:late:rapport:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-1:core:emotion_free_opened"
      ],
      "requiresFlags": [],
      "tags": [
        "late",
        "free_question",
        "core_truth"
      ],
      "hookId": "fq:d-1:apology_scope"
    },
    {
      "id": "spouse12:beat_v2:a:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "직업 습관이요? 제 인생이랑 가게가 걸린 일을 그렇게 관성처럼 던졌다는 게 더 끔찍해요.",
      "behaviorHint": "대답 순서를 끊고, 감정이나 세부 반박을 옆에서 밀어 넣는다.",
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
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:a:d-1:emotion:0",
          "spouse12:a:d-1:admission:0"
        ],
        "forbidAtomIds": [
          "spouse12:a:d-1:denial:0"
        ]
      },
      "weight": 5,
      "priority": 31,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-1:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 2,
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
      "id": "spouse12:beat_v2:a:d-5:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "interject",
      "line": "저도 알아요, 제가 상처 준 장면이 있었던 거. 그런데 그걸로 지금의 거짓까지 다 제 얼굴로 덮어버리진 마세요.",
      "behaviorHint": "대답 순서를 끊고, 감정이나 세부 반박을 옆에서 밀어 넣는다.",
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
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:a:d-5:unlock:s4:0",
          "spouse12:a:d-5:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse12:a:d-5:denial:1"
        ]
      },
      "weight": 5,
      "priority": 31,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-5:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-5:surface:interjection_emotional_only_allow"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "spouse12:beat_v2:b:d-1:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "저도 겁났습니다. 배우자 과거 하나가 제 직장 신뢰랑 가족 체면까지 다 무너뜨릴까 봐 정말 무서웠어요.",
      "behaviorHint": "대답 순서를 끊고, 감정이나 세부 반박을 옆에서 밀어 넣는다.",
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
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:b:d-1:unlock:s4:0",
          "spouse12:b:d-1:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse12:b:d-1:denial:0"
        ]
      },
      "weight": 5,
      "priority": 31,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-1:surface:mid:interjection:emotional_only:block",
      "variantTarget": 2,
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
      "id": "spouse12:beat_v2:b:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "알고 있습니다. 그래서 더 창피합니다. 지키겠다고 움직였는데 결국 또 다른 사람한테 상처를 돌렸으니까요.",
      "behaviorHint": "대답 순서를 끊고, 감정이나 세부 반박을 옆에서 밀어 넣는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
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
          "spouse12:b:d-3:unlock:s4:0",
          "spouse12:b:d-3:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse12:b:d-3:identity:0"
        ]
      },
      "weight": 5,
      "priority": 31,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:emotional_only:block",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:interjection_emotional_only_block"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only",
        "red_herring"
      ]
    },
    {
      "id": "spouse12:beat_v2:b:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "확인용이었다면 왜 배우자에게 묻기 9분 전에 운영진 단톡으로 먼저 갔고, 이후 가족과 직장 인맥으로까지 확대됐습니까?",
      "behaviorHint": "대답 순서를 끊고, 감정이나 세부 반박을 옆에서 밀어 넣는다.",
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
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:b:d-1:unlock:s2:0",
          "spouse12:b:d-1:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse12:b:d-1:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 31,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-1:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 2,
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
      "id": "spouse12:beat_v2:a:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "거의 전부였다면 왜 한유진에게 보낸 문제 메시지 1건만 별도 폴더로 이동해 공유 압축파일에서 빠졌습니까?",
      "behaviorHint": "대답 순서를 끊고, 감정이나 세부 반박을 옆에서 밀어 넣는다.",
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
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:a:d-2:unlock:s2:0",
          "spouse12:a:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse12:a:d-2:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 31,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-2:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:interjection_detail_rebuttal_allow"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "spouse12:beat_v2:b:d-3:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "원본 계정도 없는 캡처 추측을 왜 버너계정 복구 메일과 와이파이 접속기록보다 더 믿으셨습니까?",
      "behaviorHint": "대답 순서를 끊고, 감정이나 세부 반박을 옆에서 밀어 넣는다.",
      "applicableStates": [
        "S2",
        "S3"
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
          "spouse12:b:d-3:unlock:s2:0",
          "spouse12:b:d-3:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse12:b:d-3:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 31,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:interjection_detail_rebuttal_block"
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
      "id": "spouse12:beat_v2:b:d-1:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "진짜처럼 보였다는 인상과 실제 원본성은 다릅니다. 포렌식이 합성을 지적한 뒤에도 왜 즉시 정정하지 않았습니까?",
      "behaviorHint": "대답 순서를 끊고, 감정이나 세부 반박을 옆에서 밀어 넣는다.",
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
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:b:d-1:unlock:s2:0",
          "spouse12:b:d-1:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse12:b:d-1:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 31,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-1:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 2,
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
      "id": "spouse12:beat_v2:a:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "처음엔 저도 한유진 씨 쪽이 떠오르긴 했어요.",
      "behaviorHint": "대답 순서를 끊고, 감정이나 세부 반박을 옆에서 밀어 넣는다.",
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
          "spouse12:a:d-3:admission:0",
          "spouse12:a:d-3:self_justification:0"
        ],
        "forbidAtomIds": [
          "spouse12:a:d-3:institution:0"
        ]
      },
      "weight": 5,
      "priority": 31,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:interjection_misbelief_escalation_allow"
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
      "id": "spouse12:beat_v2:b:d-3:surface:mid:interjection:block:03",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "정황상 한유진 씨가 가장 의심스러웠습니다.",
      "behaviorHint": "대답 순서를 끊고, 감정이나 세부 반박을 옆에서 밀어 넣는다.",
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
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:b:d-3:unlock:s2:0",
          "spouse12:b:d-3:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse12:b:d-3:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 31,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:interjection_misbelief_escalation_block"
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
      "id": "spouse12:beat_v2:a:d-3:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "처음엔 저도 한유진 씨 쪽이 떠오르긴 했어요.",
      "behaviorHint": "대답 순서를 끊고, 감정이나 세부 반박을 옆에서 밀어 넣는다.",
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
          "spouse12:a:d-3:admission:0",
          "spouse12:a:d-3:self_justification:0"
        ],
        "forbidAtomIds": [
          "spouse12:a:d-3:institution:0"
        ]
      },
      "weight": 5,
      "priority": 31,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:interjection_misbelief_escalation_allow"
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
      "id": "spouse12:beat_v2:b:d-3:surface:mid:interjection:block:04",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "정황상 한유진 씨가 가장 의심스러웠습니다.",
      "behaviorHint": "대답 순서를 끊고, 감정이나 세부 반박을 옆에서 밀어 넣는다.",
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
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse12:b:d-3:unlock:s2:0",
          "spouse12:b:d-3:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse12:b:d-3:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 31,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:interjection_misbelief_escalation_block"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "misbelief_escalation",
        "red_herring"
      ],
      "beliefMode": "misbelief"
    }
  ]
} as const;

export default spouse12BeatsV2Full;
