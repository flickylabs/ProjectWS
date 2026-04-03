export const spouse10BeatsV2Full = {
  "caseId": "spouse-10",
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
      "core_truth": 36,
      "shared_misconception": 14,
      "sub_truth": 8
    },
    "byParty": {
      "a": 31,
      "b": 27
    },
    "byDispute": {
      "d-1": 13,
      "d-2": 14,
      "d-3": 14,
      "d-4": 9,
      "d-5": 8
    },
    "interjectionInfoLevels": {
      "emotional_only": 4,
      "detail_rebuttal": 4,
      "misbelief_escalation": 4
    },
    "coverageMatrix": {
      "question:early:timeline": 4,
      "question:mid:responsibility": 6,
      "question:late:emotion": 8,
      "question:early:context": 4,
      "red_herring:early:identity": 2,
      "red_herring:late:emotion": 2,
      "question:mid:motive": 2,
      "evidence:mid:context": 3,
      "evidence:early:timeline": 2,
      "evidence:early:identity": 1,
      "fatigue:mid:timeline": 2,
      "fatigue:mid:responsibility": 4,
      "free_question:late:context": 2,
      "free_question:late:identity": 1,
      "free_question:late:motive": 1,
      "free_question:late:timeline": 1,
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
      "id": "spouse10:beat_v2:a:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "저는 시어머니 쪽 점심이 확정됐다는 말을 듣지 못했습니다. 기현 씨가 저와 마지막 확인도 없이 먼저 말한 거예요.",
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
          "spouse10:a:d-1:denial:0",
          "spouse10:a:d-1:threshold:1"
        ],
        "forbidAtomIds": [
          "spouse10:a:d-1:admission:5",
          "spouse10:a:d-1:fear:4"
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
      "id": "spouse10:beat_v2:a:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "어머니께 먼저 간다고 말한 건 맞지만, 그걸 제가 알고 있었다거나 동의했다고 볼 수는 없습니다.",
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
          "spouse10:a:d-1:responsibility:2",
          "spouse10:a:d-1:counter:3"
        ],
        "forbidAtomIds": [
          "spouse10:a:d-1:admission:5"
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
      "id": "spouse10:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "시어머니 입장에선 제가 약속을 어긴 며느리처럼 보였을까 봐 너무 화가 났어요. 그 감정 때문에 더 세게 몰아붙였습니다.",
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
          "spouse10:a:d-1:fear:4",
          "spouse10:a:d-1:admission:5"
        ],
        "forbidAtomIds": [
          "spouse10:a:d-1:denial:0"
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
      "id": "spouse10:beat_v2:b:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "점심을 확정했다기보다 그냥 먼저 들를 수 있다는 분위기로 말한 겁니다. 정식으로 못 박은 건 아니에요.",
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
          "spouse10:b:d-1:denial:0",
          "spouse10:b:d-1:uncertainty:1"
        ],
        "forbidAtomIds": [
          "spouse10:b:d-1:unlock:s5:0",
          "spouse10:b:d-1:unlock:s4:0"
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
      "id": "spouse10:beat_v2:b:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "어머니께 먼저 간다고 말한 건 맞고, 선물 픽업도 잡았습니다. 다만 그땐 수아도 비슷하게 알고 있는 줄 알았습니다.",
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
          "spouse10:b:d-1:unlock:s2:0",
          "spouse10:b:d-1:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse10:b:d-1:unlock:s5:0"
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
      "id": "spouse10:beat_v2:b:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "어머니한테 먼저 말해 놓고 다시 아니라고 하면 제가 양가 눈치만 보는 사람처럼 보일까 봐 겁이 났습니다.",
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
          "spouse10:b:d-1:unlock:s4:0",
          "spouse10:b:d-1:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse10:b:d-1:denial:0"
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
      "id": "spouse10:beat_v2:a:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "공유캘린더에 ‘토 11시 본가’라고 적었으면 저는 친정을 뜻한 겁니다. 저는 그 표현이 틀렸다고 생각하지 않아요.",
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
          "spouse10:a:d-2:quote:0",
          "spouse10:a:d-2:self_justification:1"
        ],
        "forbidAtomIds": [
          "spouse10:a:d-2:unlock:s5:0",
          "spouse10:a:d-2:unlock:s4:0"
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
      "id": "spouse10:beat_v2:a:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "제가 ‘친정’이라고 명시하지도 않았고, 기현 씨에게 따로 확인 문자를 보낸 것도 없었습니다.",
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
          "spouse10:a:d-2:unlock:s2:0",
          "spouse10:a:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse10:a:d-2:unlock:s5:0"
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
      "id": "spouse10:beat_v2:a:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "친정 일정도 제대로 못 챙기는 딸처럼 보일까 봐, 제가 쓴 표현이 애매했다는 말을 바로 못 했어요.",
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
          "spouse10:a:d-2:unlock:s4:0",
          "spouse10:a:d-2:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse10:a:d-2:quote:0"
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
      "id": "spouse10:beat_v2:b:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "공유캘린더에 ‘토 11시 본가’만 있으면 어느 집인지 바로 확정하기 어렵습니다. 저는 그게 친정 먼저라는 뜻인지 확실하지 않았어요.",
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
          "spouse10:b:d-2:denial:0",
          "spouse10:b:d-2:context:1"
        ],
        "forbidAtomIds": [
          "spouse10:b:d-2:admission:5",
          "spouse10:b:d-2:shame:4"
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
      "id": "spouse10:beat_v2:b:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "애매한 표현이었다는 건 지금도 맞지만, 그래도 제가 바로 물어봤어야 했습니다.",
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
          "spouse10:b:d-2:admission:2",
          "spouse10:b:d-2:counter:3"
        ],
        "forbidAtomIds": [
          "spouse10:b:d-2:admission:5"
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
      "id": "spouse10:beat_v2:b:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "제가 일정도 못 읽는 남편처럼 보일까 봐 애매하다는 말을 꺼내기가 귀찮고 민망했습니다.",
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
          "spouse10:b:d-2:shame:4",
          "spouse10:b:d-2:admission:5"
        ],
        "forbidAtomIds": [
          "spouse10:b:d-2:denial:0"
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
      "id": "spouse10:beat_v2:a:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "misbelief",
      "line": "그날 친정 연락이 계속 뒤로 밀린 걸 보면, 저는 기현 씨가 우리 집 약속을 일부러 가볍게 본 줄 알았습니다.",
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
          "spouse10:a:d-3:denial:0",
          "spouse10:a:d-3:harm:1"
        ],
        "forbidAtomIds": [
          "spouse10:a:d-3:unlock:s5:0",
          "spouse10:a:d-3:unlock:s4:0"
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
      "id": "spouse10:beat_v2:a:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "doubt",
      "line": "친정에 예의 없는 딸처럼 보일까 봐 너무 부끄럽고 화가 났어요. 그래서 의도라고 단정해 버렸습니다.",
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
          "spouse10:a:d-3:unlock:s4:0",
          "spouse10:a:d-3:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse10:a:d-3:denial:0"
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
      "id": "spouse10:beat_v2:b:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "misbelief",
      "line": "장인어른 댁을 일부러 무시한 건 아닙니다. 저는 그날 우리 집 점심을 먼저로 알고 움직였을 뿐이에요.",
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
          "spouse10:b:d-3:denial:0",
          "spouse10:b:d-3:uncertainty:1"
        ],
        "forbidAtomIds": [
          "spouse10:b:d-3:unlock:s5:0",
          "spouse10:b:d-3:unlock:s4:0"
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
      "id": "spouse10:beat_v2:b:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "doubt",
      "line": "장인댁을 홀대한 사위처럼 보일까 봐 설명을 바로 못 했습니다. 그게 더 나쁘게 만들었죠.",
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
          "spouse10:b:d-3:unlock:s4:0",
          "spouse10:b:d-3:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse10:b:d-3:denial:0"
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
      "id": "spouse10:beat_v2:a:d-4:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "저는 공유캘린더에 적어 두었으니 어느 정도는 미리 말해 둔 셈이라고 생각했습니다. 배우자 확인이 아주 없었던 건 아니라고 봤어요.",
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
          "spouse10:a:d-4:denial:0",
          "spouse10:a:d-4:threshold:1"
        ],
        "forbidAtomIds": [
          "spouse10:a:d-4:admission:5",
          "spouse10:a:d-4:shame:4"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:pressure:timeline",
      "coverageKey": "a:d-4:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-4:surface:timeline_pressed"
      ],
      "requiresFlags": [],
      "tags": [
        "hot",
        "core_truth"
      ]
    },
    {
      "id": "spouse10:beat_v2:a:d-4:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "저도 친정 선물 예약을 하면서 기현 씨에게 다시 최종 확인을 보내지 않았습니다.",
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
          "spouse10:a:d-4:admission:2",
          "spouse10:a:d-4:counter:3"
        ],
        "forbidAtomIds": [
          "spouse10:a:d-4:admission:5"
        ]
      },
      "weight": 6,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:pressure:responsibility",
      "coverageKey": "a:d-4:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-4:motive:responsibility_pressed"
      ],
      "requiresFlags": [
        "d-4:surface:timeline_pressed"
      ],
      "tags": [
        "mid",
        "core_truth"
      ]
    },
    {
      "id": "spouse10:beat_v2:a:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "emotional",
      "line": "정작 배우자보다 양가 눈치를 먼저 본 게 부끄러웠어요. 그 부끄러움 때문에 더 따지는 식으로 말했습니다.",
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
          "spouse10:a:d-4:shame:4",
          "spouse10:a:d-4:admission:5"
        ],
        "forbidAtomIds": [
          "spouse10:a:d-4:denial:0"
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
        "d-4:motive:responsibility_pressed"
      ],
      "tags": [
        "late",
        "core_truth"
      ]
    },
    {
      "id": "spouse10:beat_v2:b:d-4:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "저는 대충이라도 얘기된 줄 알고 준비한 겁니다. 배우자 확인이 그렇게까지 늦었다고는 처음엔 생각 못 했어요.",
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
          "spouse10:b:d-4:denial:0",
          "spouse10:b:d-4:threshold:1"
        ],
        "forbidAtomIds": [
          "spouse10:b:d-4:admission:5",
          "spouse10:b:d-4:shame:4"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:surface:pressure:timeline",
      "coverageKey": "b:d-4:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-4:surface:timeline_pressed"
      ],
      "requiresFlags": [],
      "tags": [
        "hot",
        "core_truth"
      ]
    },
    {
      "id": "spouse10:beat_v2:b:d-4:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "과일상자 예약부터 한 건 제가 먼저였습니다. 배우자 확인보다 부모님 준비가 앞선 건 인정합니다.",
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
          "spouse10:b:d-4:admission:2",
          "spouse10:b:d-4:counter:3"
        ],
        "forbidAtomIds": [
          "spouse10:b:d-4:admission:5"
        ]
      },
      "weight": 6,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:motive:pressure:responsibility",
      "coverageKey": "b:d-4:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-4:motive:responsibility_pressed"
      ],
      "requiresFlags": [
        "d-4:surface:timeline_pressed"
      ],
      "tags": [
        "mid",
        "core_truth"
      ]
    },
    {
      "id": "spouse10:beat_v2:b:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "emotional",
      "line": "양가 체면을 다 맞추려다가 정작 수아랑 확인하는 순서를 망쳤습니다. 그게 제일 창피해요.",
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
          "spouse10:b:d-4:shame:4",
          "spouse10:b:d-4:admission:5"
        ],
        "forbidAtomIds": [
          "spouse10:b:d-4:denial:0"
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
        "d-4:motive:responsibility_pressed"
      ],
      "tags": [
        "late",
        "core_truth"
      ]
    },
    {
      "id": "spouse10:beat_v2:a:d-5:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "처음엔 이번 파행이 거의 기현 씨의 일방 확정 때문에 벌어진 일이라고 봤습니다. 저는 악의가 없었다는 말이 잘 안 받아들여졌어요.",
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
          "spouse10:a:d-5:denial:0",
          "spouse10:a:d-5:threshold:1"
        ],
        "forbidAtomIds": [
          "spouse10:a:d-5:unlock:s5:0",
          "spouse10:a:d-5:unlock:s4:0"
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
      "id": "spouse10:beat_v2:a:d-5:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "제 ‘본가’와 ‘가까운 쪽 먼저’라는 표현이 서로 다른 동선을 허용한 건 맞습니다.",
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
          "spouse10:a:d-5:unlock:s2:0",
          "spouse10:a:d-5:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse10:a:d-5:unlock:s5:0"
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
      "id": "spouse10:beat_v2:a:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "emotional",
      "line": "명절 서열 문제처럼 보일까 봐 원인 설명보다 비난을 먼저 세웠어요. 친정과 시댁 사이에서 제가 무시당한 사람처럼 보이는 게 싫었습니다.",
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
          "spouse10:a:d-5:unlock:s4:0",
          "spouse10:a:d-5:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse10:a:d-5:denial:0"
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
      "id": "spouse10:beat_v2:b:d-5:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "크게 누가 일부러 그런 건 아니고 그냥 길이랑 타이밍이 꼬인 정도라고 생각했습니다. 굳이 원인을 크게 만들고 싶지 않았어요.",
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
          "spouse10:b:d-5:denial:0",
          "spouse10:b:d-5:self_justification:1"
        ],
        "forbidAtomIds": [
          "spouse10:b:d-5:unlock:s5:0",
          "spouse10:b:d-5:unlock:s4:0"
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
      "id": "spouse10:beat_v2:b:d-5:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "사실은 단순 지연만은 아니었습니다. 저도 너무 급하게 이해했고, 서로 다른 확정안을 동시에 믿고 있었습니다.",
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
          "spouse10:b:d-5:unlock:s2:0",
          "spouse10:b:d-5:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse10:b:d-5:unlock:s5:0"
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
      "id": "spouse10:beat_v2:b:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "emotional",
      "line": "싸움을 더 키우기 싫어서 ‘별일 아니었다’는 식으로 눙쳤습니다. 사실은 제가 관계를 지키려다 원인을 숨긴 거예요.",
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
          "spouse10:b:d-5:unlock:s4:0",
          "spouse10:b:d-5:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse10:b:d-5:denial:0"
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
      "id": "spouse10:beat_v2:b:d-1:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "impeach",
      "line": "단톡이랑 픽업 예약이 이어지면 제가 어머니 쪽엔 꽤 확정처럼 움직인 게 맞네요.",
      "behaviorHint": "증거를 보자 바로 시선이 아래로 떨어진다.",
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
          "spouse10:b:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse10:b:d-1:denial:0"
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
      "id": "spouse10:beat_v2:a:d-2:surface:evidence:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "establish",
      "line": "캘린더 원본을 보니 제가 친정이라고 풀어 쓰지 않은 건 부인 못 하겠네요.",
      "behaviorHint": "화면을 본 뒤 목소리가 한 톤 낮아진다.",
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
          "spouse10:a:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse10:a:d-2:unlock:s5:0",
          "spouse10:a:d-2:unlock:s4:0"
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
      "id": "spouse10:beat_v2:a:d-3:surface:trap:identity:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "reframe",
      "line": "교통 기록은 의도적 외면보다 서로 다른 출발안을 사실로 믿고 움직인 흐름을 보여 줍니다.",
      "behaviorHint": "증거에 밀리자 방어 논리를 짧게 다시 세운다.",
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
          "spouse10:a:d-3:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse10:a:d-3:unlock:s5:0",
          "spouse10:a:d-3:unlock:s4:0"
        ]
      },
      "weight": 6,
      "priority": 35,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:identity",
      "coverageKey": "a:d-3:surface:early:trap:identity",
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
      "id": "spouse10:beat_v2:a:d-3:surface:evidence:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "establish",
      "line": "동선 기록까지 보면 고의라고 단정하긴 어렵네요. 제가 너무 세게 본 것 같아요.",
      "behaviorHint": "자료를 오래 본 뒤 한 발 물러선다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
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
          "spouse10:a:d-3:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse10:a:d-3:unlock:s5:0",
          "spouse10:a:d-3:unlock:s4:0"
        ]
      },
      "weight": 6,
      "priority": 35,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:evidence:timeline",
      "coverageKey": "a:d-3:surface:early:evidence:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-3:surface:timeline_evidence_shown"
      ],
      "tags": [
        "cold",
        "evidence",
        "shared_misconception"
      ],
      "sourceEvidenceIds": [
        "e-4"
      ]
    },
    {
      "id": "spouse10:beat_v2:a:d-2:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "impeach",
      "line": "제가 같은 뜻으로 읽힐 거라고 단정한 게 실수였어요. 그건 제 책임입니다.",
      "behaviorHint": "어깨 힘이 빠지며 문장을 짧게 정리한다.",
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
          "spouse10:a:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse10:a:d-2:quote:0"
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
        "e-5"
      ]
    },
    {
      "id": "spouse10:beat_v2:a:d-4:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "impeach",
      "line": "저도 친정 선물 예약을 하면서 기현 씨에게 다시 최종 확인을 보내지 않았습니다.",
      "behaviorHint": "증거가 제시되자 사실 하나를 인정하되 곧바로 해석을 붙인다.",
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
          "spouse10:a:d-4:admission:2"
        ],
        "forbidAtomIds": [
          "spouse10:a:d-4:denial:0"
        ]
      },
      "weight": 6,
      "priority": 35,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:evidence:context",
      "coverageKey": "a:d-4:motive:mid:evidence:context",
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
        "e-6"
      ]
    },
    {
      "id": "spouse10:beat_v2:b:d-1:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "irritate",
      "line": "같은 대목은 이미 답했습니다. 어머니께 먼저 간다고 말한 건 맞고, 선물 픽업도 잡았습니다. 다만 그땐 수아도 비슷하게 알고 있는 줄 알았습니다.",
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
          "spouse10:b:d-1:unlock:s2:0",
          "spouse10:b:d-1:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse10:b:d-1:unlock:s5:0"
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
      "id": "spouse10:beat_v2:b:d-1:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "stonewall",
      "line": "더는 그 질문 방식으로는 못 갑니다. 수아가 ‘본가’라고만 적고 ‘가까운 쪽 먼저’라고 하니까 저는 우리 집 점심이 먼저인 줄로 굳어졌습니다.",
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
          "spouse10:b:d-1:unlock:s2:0",
          "spouse10:b:d-1:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse10:b:d-1:unlock:s5:0"
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
      "id": "spouse10:beat_v2:b:d-1:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "retaliate",
      "line": "계속 그 문제만 떼어내면 판이 틀어집니다. 수아가 ‘본가’라고만 적고 ‘가까운 쪽 먼저’라고 하니까 저는 우리 집 점심이 먼저인 줄로 굳어졌습니다.",
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
          "spouse10:b:d-1:unlock:s2:0",
          "spouse10:b:d-1:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse10:b:d-1:unlock:s5:0"
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
      "id": "spouse10:beat_v2:a:d-2:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "irritate",
      "line": "같은 대목은 이미 답했습니다. 제가 ‘친정’이라고 명시하지도 않았고, 기현 씨에게 따로 확인 문자를 보낸 것도 없었습니다.",
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
          "spouse10:a:d-2:unlock:s2:0",
          "spouse10:a:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse10:a:d-2:unlock:s5:0"
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
      "id": "spouse10:beat_v2:a:d-2:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "stonewall",
      "line": "더는 그 질문 방식으로는 못 갑니다. 그래도 애매했다면 기현 씨가 한 번만 물어봤어야죠. 혼자 점심을 먼저로 굳힌 건 결국 그쪽 판단이었으니까요.",
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
          "spouse10:a:d-2:unlock:s2:0",
          "spouse10:a:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse10:a:d-2:unlock:s5:0"
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
      "id": "spouse10:beat_v2:a:d-2:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "retaliate",
      "line": "계속 그 문제만 떼어내면 판이 틀어집니다. 그래도 애매했다면 기현 씨가 한 번만 물어봤어야죠. 혼자 점심을 먼저로 굳힌 건 결국 그쪽 판단이었으니까요.",
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
          "spouse10:a:d-2:unlock:s2:0",
          "spouse10:a:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse10:a:d-2:unlock:s5:0"
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
      "id": "spouse10:beat_v2:b:d-1:core:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "answer",
      "line": "제가 수아와 확인도 안 하고 어머니께 토요일 점심처럼 전달한 게 맞습니다. 그게 첫 단추를 잘못 끼운 거예요.",
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
          "spouse10:a:d-1:responsibility:2",
          "spouse10:b:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse10:b:d-1:denial:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:pressure:context",
      "coverageKey": "b:d-1:core:late:pressure:context",
      "variantTarget": 3,
      "setFlags": [
        "d-1:core:context_free_opened"
      ],
      "requiresFlags": [],
      "tags": [
        "late",
        "free_question",
        "core_truth"
      ],
      "hookId": "fq:d-1:confirmation_path"
    },
    {
      "id": "spouse10:beat_v2:a:d-2:core:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "answer",
      "line": "제 ‘본가’ 표기와 직접 확인 누락이 오해를 키운 건 맞습니다. 제 표현을 상대도 자동으로 같은 뜻으로 읽을 거라고 믿은 게 실수였어요.",
      "behaviorHint": "정면 대답을 피하지 않으려 하지만, 이유나 감정의 의미를 먼저 고른 뒤 천천히 꺼낸다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "core",
      "issueRole": "core_truth",
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
          "spouse10:a:d-2:unlock:s2:0",
          "spouse10:b:d-2:admission:2"
        ],
        "forbidAtomIds": [
          "spouse10:a:d-2:quote:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:core:pressure:identity",
      "coverageKey": "a:d-2:core:late:pressure:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-2:core:identity_free_opened"
      ],
      "requiresFlags": [],
      "tags": [
        "late",
        "free_question",
        "core_truth"
      ],
      "hookId": "fq:d-2:home_label"
    },
    {
      "id": "spouse10:beat_v2:a:d-3:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "reflect",
      "line": "기현 씨가 장인댁을 일부러 무시한 건 아니었던 것 같습니다. 서로 다른 일정을 머리에 넣고 움직인 걸 제가 고의로 받아들인 거예요.",
      "behaviorHint": "정면 대답을 피하지 않으려 하지만, 이유나 감정의 의미를 먼저 고른 뒤 천천히 꺼낸다.",
      "applicableStates": [
        "S3",
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "shared_misconception",
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
          "spouse10:a:d-3:unlock:s2:0",
          "spouse10:b:d-3:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse10:a:d-3:denial:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:motive:motive",
      "coverageKey": "a:d-3:core:late:motive:motive",
      "variantTarget": 3,
      "setFlags": [
        "d-3:core:motive_free_opened"
      ],
      "requiresFlags": [],
      "tags": [
        "late",
        "free_question",
        "shared_misconception"
      ],
      "hookId": "fq:d-3:intent_vs_result"
    },
    {
      "id": "spouse10:beat_v2:b:d-4:core:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "answer",
      "line": "둘 다 부모 쪽 준비가 배우자 확인보다 빨랐습니다. 다만 제가 먼저 부모님께 점심처럼 말한 탓에 더 크게 꼬였습니다.",
      "behaviorHint": "정면 대답을 피하지 않으려 하지만, 이유나 감정의 의미를 먼저 고른 뒤 천천히 꺼낸다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "timeline",
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
          "spouse10:a:d-4:admission:2",
          "spouse10:b:d-4:admission:2"
        ],
        "forbidAtomIds": [
          "spouse10:b:d-4:denial:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:core:pressure:timeline",
      "coverageKey": "b:d-4:core:late:pressure:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-4:core:timeline_free_opened"
      ],
      "requiresFlags": [],
      "tags": [
        "late",
        "free_question",
        "core_truth"
      ],
      "hookId": "fq:d-4:last_call_timing"
    },
    {
      "id": "spouse10:beat_v2:a:d-5:core:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "answer",
      "line": "지금은 악의보다 모호한 표현과 이동시간 오판이 더 큰 원인이었다고 봅니다. 서로 자기 머릿속 계획을 사실처럼 믿고 있었어요.",
      "behaviorHint": "정면 대답을 피하지 않으려 하지만, 이유나 감정의 의미를 먼저 고른 뒤 천천히 꺼낸다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "core",
      "issueRole": "sub_truth",
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
          "spouse10:a:d-5:unlock:s2:0",
          "spouse10:b:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse10:a:d-5:denial:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:pressure:context",
      "coverageKey": "a:d-5:core:late:pressure:context",
      "variantTarget": 3,
      "setFlags": [
        "d-5:core:context_free_opened"
      ],
      "requiresFlags": [],
      "tags": [
        "late",
        "free_question",
        "sub_truth"
      ],
      "hookId": "fq:d-5:route_feasibility"
    },
    {
      "id": "spouse10:beat_v2:b:d-5:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "reflect",
      "line": "이번 일의 핵심은 악의보다 모호한 표현과 이동시간 오판이었습니다. 제가 그걸 단순 지연처럼 덮으려 한 것도 잘못이었어요.",
      "behaviorHint": "정면 대답을 피하지 않으려 하지만, 이유나 감정의 의미를 먼저 고른 뒤 천천히 꺼낸다.",
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
          "spouse10:a:d-5:unlock:s2:0",
          "spouse10:b:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse10:b:d-5:denial:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:rapport:emotion",
      "coverageKey": "b:d-5:core:late:rapport:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-5:core:emotion_free_opened"
      ],
      "requiresFlags": [],
      "tags": [
        "late",
        "free_question",
        "sub_truth"
      ],
      "hookId": "fq:d-5:face_loss"
    },
    {
      "id": "spouse10:beat_v2:a:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "저는 그날 친정에 뭐라고 설명해야 할지부터 막막했어요.",
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
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse10:a:d-3:unlock:s4:0",
          "spouse10:a:d-3:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse10:a:d-3:denial:0"
        ]
      },
      "weight": 5,
      "priority": 31,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:interjection_emotional_only_allow"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only",
        "red_herring"
      ]
    },
    {
      "id": "spouse10:beat_v2:a:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "제가 쓴 말을 왜 그렇게까지 다르게 읽냐는 생각이 들어 더 세게 말했어요.",
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
          "spouse10:a:d-2:unlock:s4:0",
          "spouse10:a:d-2:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse10:a:d-2:quote:0"
        ]
      },
      "weight": 5,
      "priority": 31,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-2:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 2,
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
      "id": "spouse10:beat_v2:b:d-1:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "한번 말 꺼낸 걸 다시 뒤집으면 제가 양가 눈치만 보는 사람처럼 보이잖아요.",
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
          "spouse10:b:d-1:unlock:s4:0",
          "spouse10:b:d-1:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse10:b:d-1:denial:0"
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
      "id": "spouse10:beat_v2:b:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "무시하려던 게 아니었어요. 그렇게 보였다는 것까지는 인정하지만 의도는 아니었어요.",
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
          "spouse10:b:d-3:unlock:s4:0",
          "spouse10:b:d-3:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse10:b:d-3:denial:0"
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
      "id": "spouse10:beat_v2:b:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "배우자에게는 미확정이라 하면서 어머니 쪽에는 식사 준비가 가능한 수준으로 전달했습니다.",
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
          "spouse10:b:d-1:unlock:s2:0",
          "spouse10:b:d-1:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse10:b:d-1:unlock:s5:0"
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
      "id": "spouse10:beat_v2:a:d-2:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "캘린더와 음성 모두 집 이름이 빠져 있어, '당연히 읽혔어야 한다'는 설명과 기록의 구체성이 어긋납니다.",
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
          "spouse10:a:d-2:unlock:s2:0",
          "spouse10:a:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse10:a:d-2:unlock:s5:0"
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
      "id": "spouse10:beat_v2:a:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "교통 기록은 의도적 외면보다 서로 다른 출발안을 사실로 믿고 움직인 흐름을 보여 줍니다.",
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
          "spouse10:a:d-3:unlock:s2:0",
          "spouse10:a:d-3:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse10:a:d-3:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 31,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-3:surface:mid:interjection:detail_rebuttal:block",
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
      "id": "spouse10:beat_v2:b:d-4:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "interject",
      "line": "단순 지연이었다면 양가 선물 준비와 메시지 해석이 이렇게 서로 다른 계획으로 갈라질 이유가 없습니다.",
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
          "spouse10:b:d-4:admission:2",
          "spouse10:b:d-4:counter:3"
        ],
        "forbidAtomIds": [
          "spouse10:b:d-4:admission:5"
        ]
      },
      "weight": 5,
      "priority": 31,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-4:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 2,
      "setFlags": [
        "d-4:surface:interjection_detail_rebuttal_block"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "spouse10:beat_v2:a:d-3:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "그날 친정 연락이 계속 뒤로 밀린 걸 보면, 저는 기현 씨가 우리 집 약속을 일부러 가볍게 본 줄 알았습니다.",
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
          "spouse10:a:d-3:unlock:s2:0",
          "spouse10:a:d-3:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse10:a:d-3:unlock:s5:0"
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
      "id": "spouse10:beat_v2:b:d-3:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "장인어른 댁을 일부러 무시한 건 아닙니다. 저는 그날 우리 집 점심을 먼저로 알고 움직였을 뿐이에요.",
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
          "spouse10:b:d-3:unlock:s2:0",
          "spouse10:b:d-3:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse10:b:d-3:unlock:s5:0"
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
      "beliefMode": "knows"
    },
    {
      "id": "spouse10:beat_v2:a:d-3:surface:mid:interjection:allow:03",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "그날 친정 연락이 계속 뒤로 밀린 걸 보면, 저는 기현 씨가 우리 집 약속을 일부러 가볍게 본 줄 알았습니다.",
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
          "spouse10:a:d-3:unlock:s2:0",
          "spouse10:a:d-3:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse10:a:d-3:unlock:s5:0"
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
      "id": "spouse10:beat_v2:b:d-3:surface:mid:interjection:block:03",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "장인어른 댁을 일부러 무시한 건 아닙니다. 저는 그날 우리 집 점심을 먼저로 알고 움직였을 뿐이에요.",
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
          "spouse10:b:d-3:unlock:s2:0",
          "spouse10:b:d-3:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse10:b:d-3:unlock:s5:0"
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
      "beliefMode": "knows"
    }
  ]
} as const;

export default spouse10BeatsV2Full;
