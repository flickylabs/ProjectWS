export const friend05BeatsV2Full = {
  "caseId": "friend-05",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 58,
    "byActionFamily": {
      "question": 28,
      "evidence": 8,
      "fatigue": 6,
      "free_question": 4,
      "interjection": 12
    },
    "byIssueRole": {
      "core_truth": 46,
      "shared_misconception": 10,
      "sub_truth": 2
    },
    "byParty": {
      "b": 29,
      "a": 29
    },
    "interjectionCount": 12,
    "fatigueCount": 6,
    "coverageKeys": [
      "a:d-1:core:late:motive:motive",
      "a:d-1:core:late:rapport:emotion",
      "a:d-1:motive:mid:evidence:identity",
      "a:d-1:motive:mid:motive:motive",
      "a:d-1:motive:mid:pressure:responsibility",
      "a:d-1:surface:early:pressure:context",
      "a:d-1:surface:early:pressure:identity",
      "a:d-1:surface:early:pressure:timeline",
      "a:d-1:surface:mid:interjection:detail_rebuttal:block",
      "a:d-1:surface:mid:interjection:emotional_only:block",
      "a:d-2:core:late:rapport:emotion",
      "a:d-2:core:mid:fatigue:responsibility",
      "a:d-2:motive:mid:fatigue:responsibility",
      "a:d-2:motive:mid:fatigue:timeline",
      "a:d-2:motive:mid:motive:motive",
      "a:d-2:motive:mid:pressure:responsibility",
      "a:d-2:surface:early:evidence:context",
      "a:d-2:surface:early:pressure:context",
      "a:d-2:surface:early:pressure:identity",
      "a:d-2:surface:early:pressure:timeline",
      "a:d-2:surface:mid:interjection:detail_rebuttal:allow",
      "a:d-2:surface:mid:interjection:emotional_only:allow",
      "a:d-3:core:late:trap:context",
      "a:d-3:surface:early:evidence:context",
      "a:d-3:surface:early:trap:identity",
      "a:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "a:d-4:motive:mid:evidence:context",
      "b:d-1:core:late:rapport:emotion",
      "b:d-1:core:mid:fatigue:responsibility",
      "b:d-1:motive:mid:fatigue:responsibility",
      "b:d-1:motive:mid:fatigue:timeline",
      "b:d-1:motive:mid:motive:motive",
      "b:d-1:motive:mid:pressure:responsibility",
      "b:d-1:surface:early:evidence:context",
      "b:d-1:surface:early:pressure:context",
      "b:d-1:surface:early:pressure:identity",
      "b:d-1:surface:early:pressure:timeline",
      "b:d-1:surface:mid:interjection:detail_rebuttal:allow",
      "b:d-1:surface:mid:interjection:emotional_only:allow",
      "b:d-2:core:late:motive:motive",
      "b:d-2:core:late:rapport:emotion",
      "b:d-2:motive:mid:evidence:identity",
      "b:d-2:motive:mid:motive:motive",
      "b:d-2:motive:mid:pressure:responsibility",
      "b:d-2:surface:early:pressure:context",
      "b:d-2:surface:early:pressure:identity",
      "b:d-2:surface:early:pressure:timeline",
      "b:d-2:surface:mid:interjection:detail_rebuttal:block",
      "b:d-2:surface:mid:interjection:emotional_only:block",
      "b:d-3:core:late:trap:emotion",
      "b:d-3:motive:mid:evidence:identity",
      "b:d-3:surface:early:trap:context",
      "b:d-3:surface:mid:interjection:misbelief_escalation:block",
      "b:d-4:surface:early:evidence:legality"
    ]
  },
  "beats": [
    {
      "id": "friend05:beat_v2:b:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "순서부터 다시 보면 이 말로 가요. 48만원 받은 건 맞지만 지금 당장 떼먹는 사람처럼 말할 단계는 아니라는 주장이다.",
      "behaviorHint": "짧게 끊어 묻듯 응수하고, 상대가 길어지면 핵심 단어를 다시 세운다.",
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
          "friend-05:b:d-1:s0:core",
          "friend-05:b:d-1:s0:frame"
        ],
        "forbidAtomIds": [
          "friend-05:b:d-1:s5:core"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:timeline",
      "coverageKey": "b:d-1:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot",
        "timeline"
      ]
    },
    {
      "id": "friend05:beat_v2:b:d-1:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "그 말은 결국 자기 자리를 지키려는 쪽으로 들려요. 현재 답이 늦어진 건 맞아도 그냥 먹튀하려던 건 아니라며 관계를 먼저 살리려 한다.",
      "behaviorHint": "짧게 끊어 묻듯 응수하고, 상대가 길어지면 핵심 단어를 다시 세운다.",
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
          "friend-05:b:d-1:s1:core",
          "friend-05:b:d-1:s1:frame"
        ],
        "forbidAtomIds": [
          "friend-05:b:d-1:s5:core"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:identity",
      "coverageKey": "b:d-1:surface:early:pressure:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot",
        "identity"
      ]
    },
    {
      "id": "friend05:beat_v2:b:d-1:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "앞뒤를 떼면 다르게 들려요. 다음 월급 주간 약속은 했지만 사정이 밀렸다고 말하며 기한의 명확성을 흐린다. 현재 답이 늦어진 건 맞아도 그냥 먹튀하려던 건 아니라며 관계를 먼저 살리려 한다.",
      "behaviorHint": "짧게 끊어 묻듯 응수하고, 상대가 길어지면 핵심 단어를 다시 세운다.",
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
          "friend-05:b:d-1:s1:core",
          "friend-05:b:d-1:s1:frame"
        ],
        "forbidAtomIds": [
          "friend-05:b:d-1:s5:core"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:context",
      "coverageKey": "b:d-1:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot",
        "context"
      ]
    },
    {
      "id": "friend05:beat_v2:a:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "순서부터 다시 보면 이 말로 가요. 민태오는 반려견 야간 병원비로 빌린 48만원을 아직 따로 돌려주지 않았다.",
      "behaviorHint": "짧게 끊어 묻듯 응수하고, 상대가 길어지면 핵심 단어를 다시 세운다.",
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
          "friend-05:a:d-1:s0:core",
          "friend-05:a:d-1:s0:frame"
        ],
        "forbidAtomIds": [
          "friend-05:a:d-1:s5:core"
        ]
      },
      "weight": 7,
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
        "hot",
        "timeline"
      ]
    },
    {
      "id": "friend05:beat_v2:a:d-1:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "앞뒤를 떼면 다르게 들려요. 상대 설명이 길어지면 날짜 순서로 다시 끊어 현재 미반환만 남긴다.",
      "behaviorHint": "짧게 끊어 묻듯 응수하고, 상대가 길어지면 핵심 단어를 다시 세운다.",
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
          "friend-05:a:d-1:s1:core",
          "friend-05:a:d-1:s1:frame"
        ],
        "forbidAtomIds": [
          "friend-05:a:d-1:s5:core"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:context",
      "coverageKey": "a:d-1:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot",
        "context"
      ]
    },
    {
      "id": "friend05:beat_v2:a:d-1:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "그 말은 결국 자기 자리를 지키려는 쪽으로 들려요. 48만원 미상환 자체는 분명하고, 다른 정산은 별도 문제라고 말한다. 상대 설명이 길어지면 날짜 순서로 다시 끊어 현재 미반환만 남긴다.",
      "behaviorHint": "짧게 끊어 묻듯 응수하고, 상대가 길어지면 핵심 단어를 다시 세운다.",
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
          "friend-05:a:d-1:s1:core",
          "friend-05:a:d-1:s1:frame"
        ],
        "forbidAtomIds": [
          "friend-05:a:d-1:s5:core"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:identity",
      "coverageKey": "a:d-1:surface:early:pressure:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot",
        "identity"
      ]
    },
    {
      "id": "friend05:beat_v2:b:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "결국 그 선택 책임은 남아요. 별도 송금 못 한 건 맞다고 인정하면서도, 예전 남은 돈이 계속 마음에 걸렸다고 덧붙인다.",
      "behaviorHint": "짧게 끊어 묻듯 응수하고, 상대가 길어지면 핵심 단어를 다시 세운다.",
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
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend-05:b:d-1:s2:core",
          "friend-05:b:d-1:s2:frame"
        ],
        "forbidAtomIds": [
          "friend-05:b:d-1:s5:core"
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
        "d-1:motive:betrayal_named"
      ],
      "tags": [
        "mid",
        "responsibility"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ]
    },
    {
      "id": "friend05:beat_v2:b:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "explain",
      "line": "왜 그렇게 했는지는 이미 보이거든요. 오래된 돈을 다시 꺼내면 내가 더 옹졸해 보일까 봐 입을 닫았다고 관계를 앞세운다.",
      "behaviorHint": "말끝을 늦추며 속내를 꺼내려다 스스로 정당화를 덧붙인다.",
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
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend-05:b:d-1:s3:core",
          "friend-05:b:d-1:s3:frame"
        ],
        "forbidAtomIds": [
          "friend-05:b:d-1:s5:core"
        ]
      },
      "weight": 6,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:motive:motive",
      "coverageKey": "b:d-1:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-1:motive:betrayal_named"
      ],
      "tags": [
        "mid",
        "motive"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ]
    },
    {
      "id": "friend05:beat_v2:a:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "결국 그 선택 책임은 남아요. 예전 보증금 얘기가 남아 있어도 현재 48만원은 따로 갚았어야 한다고 주장한다.",
      "behaviorHint": "짧게 끊어 묻듯 응수하고, 상대가 길어지면 핵심 단어를 다시 세운다.",
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
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend-05:a:d-1:s2:core",
          "friend-05:a:d-1:s2:frame"
        ],
        "forbidAtomIds": [
          "friend-05:a:d-1:s5:core"
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
        "d-1:motive:betrayal_named"
      ],
      "tags": [
        "mid",
        "responsibility"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ]
    },
    {
      "id": "friend05:beat_v2:a:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "explain",
      "line": "왜 그렇게 했는지는 이미 보이거든요. 말 대신 잠수와 미루기로 처리한 태도에 배신감을 드러낸다.",
      "behaviorHint": "말끝을 늦추며 속내를 꺼내려다 스스로 정당화를 덧붙인다.",
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
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend-05:a:d-1:s3:core",
          "friend-05:a:d-1:s3:frame"
        ],
        "forbidAtomIds": [
          "friend-05:a:d-1:s5:core"
        ]
      },
      "weight": 6,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:motive:motive",
      "coverageKey": "a:d-1:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-1:motive:betrayal_named"
      ],
      "tags": [
        "mid",
        "motive"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ]
    },
    {
      "id": "friend05:beat_v2:b:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "지금은 감정도 같이 남아 있어요. 겉으로는 미룬 게 아니라 계산하고 있었다며, 사실상 상계 생각을 품고 있었다고 드러낸다.",
      "behaviorHint": "목소리가 약간 낮아지고, 버티던 표정 사이로 감정이 먼저 새어 나온다.",
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
          "raw"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend-05:b:d-1:s4:core",
          "friend-05:b:d-1:s4:frame"
        ],
        "forbidAtomIds": [
          "friend-05:b:d-1:s0:core"
        ]
      },
      "weight": 5,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:rapport:emotion",
      "coverageKey": "b:d-1:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:debt_split_open"
      ],
      "tags": [
        "late",
        "emotion"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed",
        "d-1:motive:betrayal_named"
      ]
    },
    {
      "id": "friend05:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "지금은 감정도 같이 남아 있어요. 친구에게 급히 빌려준 밤이 아직도 억울하게 남아 있다고 감정을 섞는다.",
      "behaviorHint": "목소리가 약간 낮아지고, 버티던 표정 사이로 감정이 먼저 새어 나온다.",
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
          "raw"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend-05:a:d-1:s4:core",
          "friend-05:a:d-1:s4:frame"
        ],
        "forbidAtomIds": [
          "friend-05:a:d-1:s0:core"
        ]
      },
      "weight": 5,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:debt_split_open"
      ],
      "tags": [
        "late",
        "emotion"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed",
        "d-1:motive:betrayal_named"
      ]
    },
    {
      "id": "friend05:beat_v2:a:d-2:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "순서부터 다시 보면 이 말로 가요. 나는 그냥 답답해서 몇 장 보여준 것뿐이지, 태오를 낙인찍으려 한 건 아니라는 주장이다.",
      "behaviorHint": "짧게 끊어 묻듯 응수하고, 상대가 길어지면 핵심 단어를 다시 세운다.",
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
          "friend-05:a:d-2:s0:core",
          "friend-05:a:d-2:s0:frame"
        ],
        "forbidAtomIds": [
          "friend-05:a:d-2:s5:core"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:pressure:timeline",
      "coverageKey": "a:d-2:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:spread_frame_named"
      ],
      "tags": [
        "hot",
        "timeline"
      ]
    },
    {
      "id": "friend05:beat_v2:a:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "앞뒤를 떼면 다르게 들려요. 내가 숨긴 게 아니라 지금 필요한 장면만 먼저 보여준 것뿐이라고 버틴다.",
      "behaviorHint": "짧게 끊어 묻듯 응수하고, 상대가 길어지면 핵심 단어를 다시 세운다.",
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
          "friend-05:a:d-2:s1:core",
          "friend-05:a:d-2:s1:frame"
        ],
        "forbidAtomIds": [
          "friend-05:a:d-2:s5:core"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:pressure:context",
      "coverageKey": "a:d-2:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:spread_frame_named"
      ],
      "tags": [
        "hot",
        "context"
      ]
    },
    {
      "id": "friend05:beat_v2:a:d-2:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "그 말은 결국 자기 자리를 지키려는 쪽으로 들려요. 단체방이랑 스토리에 올리긴 했지만 그건 답이 없어서 순간적으로 그런 거였다고 말한다. 내가 숨긴 게 아니라 지금 필요한 장면만 먼저 보여준 것뿐이라고 버틴다.",
      "behaviorHint": "짧게 끊어 묻듯 응수하고, 상대가 길어지면 핵심 단어를 다시 세운다.",
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
          "friend-05:a:d-2:s1:core",
          "friend-05:a:d-2:s1:frame"
        ],
        "forbidAtomIds": [
          "friend-05:a:d-2:s5:core"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:pressure:identity",
      "coverageKey": "a:d-2:surface:early:pressure:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:spread_frame_named"
      ],
      "tags": [
        "hot",
        "identity"
      ]
    },
    {
      "id": "friend05:beat_v2:b:d-2:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "순서부터 다시 보면 이 말로 가요. 서윤이 보여준 장면이 전부는 아니지만, 지금 바로 공격하고 싶진 않다고 말한다.",
      "behaviorHint": "짧게 끊어 묻듯 응수하고, 상대가 길어지면 핵심 단어를 다시 세운다.",
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
          "friend-05:b:d-2:s0:core",
          "friend-05:b:d-2:s0:frame"
        ],
        "forbidAtomIds": [
          "friend-05:b:d-2:s5:core"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:timeline",
      "coverageKey": "b:d-2:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:spread_frame_named"
      ],
      "tags": [
        "hot",
        "timeline"
      ]
    },
    {
      "id": "friend05:beat_v2:b:d-2:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "그 말은 결국 자기 자리를 지키려는 쪽으로 들려요. 내가 침묵한 탓에 서윤이 완전한 피해자처럼 보였다고 조심스럽게 선을 긋는다.",
      "behaviorHint": "짧게 끊어 묻듯 응수하고, 상대가 길어지면 핵심 단어를 다시 세운다.",
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
          "friend-05:b:d-2:s1:core",
          "friend-05:b:d-2:s1:frame"
        ],
        "forbidAtomIds": [
          "friend-05:b:d-2:s5:core"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:identity",
      "coverageKey": "b:d-2:surface:early:pressure:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:spread_frame_named"
      ],
      "tags": [
        "hot",
        "identity"
      ]
    },
    {
      "id": "friend05:beat_v2:b:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "앞뒤를 떼면 다르게 들려요. 공통 친구들 앞에서는 현재 48만원만 남게 잘린 느낌이었다고 말한다. 내가 침묵한 탓에 서윤이 완전한 피해자처럼 보였다고 조심스럽게 선을 긋는다.",
      "behaviorHint": "짧게 끊어 묻듯 응수하고, 상대가 길어지면 핵심 단어를 다시 세운다.",
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
          "friend-05:b:d-2:s1:core",
          "friend-05:b:d-2:s1:frame"
        ],
        "forbidAtomIds": [
          "friend-05:b:d-2:s5:core"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:context",
      "coverageKey": "b:d-2:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:spread_frame_named"
      ],
      "tags": [
        "hot",
        "context"
      ]
    },
    {
      "id": "friend05:beat_v2:a:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "결국 그 선택 책임은 남아요. 캡처가 현재 독촉 장면 위주였던 건 맞지만, 그때는 정말 내가 당한 쪽처럼 느껴졌다고 말한다.",
      "behaviorHint": "짧게 끊어 묻듯 응수하고, 상대가 길어지면 핵심 단어를 다시 세운다.",
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
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend-05:a:d-2:s2:core",
          "friend-05:a:d-2:s2:frame"
        ],
        "forbidAtomIds": [
          "friend-05:a:d-2:s5:core"
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
        "d-2:motive:victim_slot_named"
      ],
      "tags": [
        "mid",
        "responsibility"
      ],
      "requiresFlags": [
        "d-2:surface:spread_frame_named"
      ]
    },
    {
      "id": "friend05:beat_v2:a:d-2:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "explain",
      "line": "왜 그렇게 했는지는 이미 보이거든요. 태오를 바로 공격하려던 것보다, 내가 혼자 손해 본 사람처럼 느껴진 분노가 먼저였다고 해명한다.",
      "behaviorHint": "말끝을 늦추며 속내를 꺼내려다 스스로 정당화를 덧붙인다.",
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
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend-05:a:d-2:s3:core",
          "friend-05:a:d-2:s3:frame"
        ],
        "forbidAtomIds": [
          "friend-05:a:d-2:s5:core"
        ]
      },
      "weight": 6,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:motive:motive",
      "coverageKey": "a:d-2:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-2:motive:victim_slot_named"
      ],
      "tags": [
        "mid",
        "motive"
      ],
      "requiresFlags": [
        "d-2:surface:spread_frame_named"
      ]
    },
    {
      "id": "friend05:beat_v2:b:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "결국 그 선택 책임은 남아요. 과거 큰 잔액이 빠진 채 퍼진 건 사실이라고 분명히 한다.",
      "behaviorHint": "짧게 끊어 묻듯 응수하고, 상대가 길어지면 핵심 단어를 다시 세운다.",
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
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend-05:b:d-2:s2:core",
          "friend-05:b:d-2:s2:frame"
        ],
        "forbidAtomIds": [
          "friend-05:b:d-2:s5:core"
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
        "d-2:motive:victim_slot_named"
      ],
      "tags": [
        "mid",
        "responsibility"
      ],
      "requiresFlags": [
        "d-2:surface:spread_frame_named"
      ]
    },
    {
      "id": "friend05:beat_v2:b:d-2:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "explain",
      "line": "왜 그렇게 했는지는 이미 보이거든요. 그래도 서윤이 맥락을 뺀 채 퍼뜨린 건 분명히 부당했다고 말한다.",
      "behaviorHint": "말끝을 늦추며 속내를 꺼내려다 스스로 정당화를 덧붙인다.",
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
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend-05:b:d-2:s3:core",
          "friend-05:b:d-2:s3:frame"
        ],
        "forbidAtomIds": [
          "friend-05:b:d-2:s5:core"
        ]
      },
      "weight": 6,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:motive:motive",
      "coverageKey": "b:d-2:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-2:motive:victim_slot_named"
      ],
      "tags": [
        "mid",
        "motive"
      ],
      "requiresFlags": [
        "d-2:surface:spread_frame_named"
      ]
    },
    {
      "id": "friend05:beat_v2:a:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "지금은 감정도 같이 남아 있어요. 내가 억울하다는 감정이 너무 커서, 상대를 설명할 여지를 일부러 안 남겼다고 털어놓는다.",
      "behaviorHint": "목소리가 약간 낮아지고, 버티던 표정 사이로 감정이 먼저 새어 나온다.",
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
          "raw"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend-05:a:d-2:s4:core",
          "friend-05:a:d-2:s4:frame"
        ],
        "forbidAtomIds": [
          "friend-05:a:d-2:s0:core"
        ]
      },
      "weight": 5,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:core:rapport:emotion",
      "coverageKey": "a:d-2:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-2:core:omission_admitted"
      ],
      "tags": [
        "late",
        "emotion"
      ],
      "requiresFlags": [
        "d-2:surface:spread_frame_named",
        "d-2:motive:victim_slot_named"
      ]
    },
    {
      "id": "friend05:beat_v2:b:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "지금은 감정도 같이 남아 있어요. 옛돈을 꺼내는 순간 내가 계산적인 사람처럼 보일까 두려웠다고 털어놓는다.",
      "behaviorHint": "목소리가 약간 낮아지고, 버티던 표정 사이로 감정이 먼저 새어 나온다.",
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
          "raw"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend-05:b:d-2:s4:core",
          "friend-05:b:d-2:s4:frame"
        ],
        "forbidAtomIds": [
          "friend-05:b:d-2:s0:core"
        ]
      },
      "weight": 5,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:core:rapport:emotion",
      "coverageKey": "b:d-2:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-2:core:omission_admitted"
      ],
      "tags": [
        "late",
        "emotion"
      ],
      "requiresFlags": [
        "d-2:surface:spread_frame_named",
        "d-2:motive:victim_slot_named"
      ]
    },
    {
      "id": "friend05:beat_v2:b:d-1:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "clarify",
      "line": "이 기록을 붙이면 빠진 맥락이 보여요. 다음 월급 주간 약속은 했지만 사정이 밀렸다고 말하며 기한의 명확성을 흐린다. 현재 답이 늦어진 건 맞아도 그냥 먹튀하려던 건 아니라며 관계를 먼저 살리려 한다.",
      "behaviorHint": "기록 쪽을 힐끗 보고 난 뒤 변명보다 해석을 먼저 붙인다.",
      "applicableStates": [
        "S0",
        "S1"
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
          "friend-05:b:d-1:s1:core",
          "friend-05:b:d-1:s1:frame"
        ],
        "forbidAtomIds": [
          "friend-05:b:d-1:s5:core"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:evidence:context",
      "coverageKey": "b:d-1:surface:early:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "evidence",
        "context"
      ]
    },
    {
      "id": "friend05:beat_v2:a:d-1:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "clarify",
      "line": "화면만이 아니라 누가 어떤 자리를 지키려 했는지도 드러나요. 예전 보증금 얘기가 남아 있어도 현재 48만원은 따로 갚았어야 한다고 주장한다. 상계 합의가 없었다는 점을 핵심으로 밀기 시작한다.",
      "behaviorHint": "기록 쪽을 힐끗 보고 난 뒤 변명보다 해석을 먼저 붙인다.",
      "applicableStates": [
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
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend-05:a:d-1:s2:core",
          "friend-05:a:d-1:s2:frame"
        ],
        "forbidAtomIds": [
          "friend-05:a:d-1:s5:core"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:evidence:identity",
      "coverageKey": "a:d-1:motive:mid:evidence:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:betrayal_named"
      ],
      "tags": [
        "evidence",
        "identity"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ]
    },
    {
      "id": "friend05:beat_v2:a:d-2:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "clarify",
      "line": "이 기록을 붙이면 빠진 맥락이 보여요. 단체방이랑 스토리에 올리긴 했지만 그건 답이 없어서 순간적으로 그런 거였다고 말한다. 내가 숨긴 게 아니라 지금 필요한 장면만 먼저 보여준 것뿐이라고 버틴다.",
      "behaviorHint": "기록 쪽을 힐끗 보고 난 뒤 변명보다 해석을 먼저 붙인다.",
      "applicableStates": [
        "S0",
        "S1"
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
          "friend-05:a:d-2:s1:core",
          "friend-05:a:d-2:s1:frame"
        ],
        "forbidAtomIds": [
          "friend-05:a:d-2:s5:core"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:evidence:context",
      "coverageKey": "a:d-2:surface:early:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:spread_frame_named"
      ],
      "tags": [
        "evidence",
        "context"
      ]
    },
    {
      "id": "friend05:beat_v2:b:d-2:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "clarify",
      "line": "화면만이 아니라 누가 어떤 자리를 지키려 했는지도 드러나요. 과거 큰 잔액이 빠진 채 퍼진 건 사실이라고 분명히 한다. 다만 그걸 내가 바로잡지 못한 책임도 있다고 말한다.",
      "behaviorHint": "기록 쪽을 힐끗 보고 난 뒤 변명보다 해석을 먼저 붙인다.",
      "applicableStates": [
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
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend-05:b:d-2:s2:core",
          "friend-05:b:d-2:s2:frame"
        ],
        "forbidAtomIds": [
          "friend-05:b:d-2:s5:core"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:evidence:identity",
      "coverageKey": "b:d-2:motive:mid:evidence:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:victim_slot_named"
      ],
      "tags": [
        "evidence",
        "identity"
      ],
      "requiresFlags": [
        "d-2:surface:spread_frame_named"
      ]
    },
    {
      "id": "friend05:beat_v2:a:d-3:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "clarify",
      "line": "이 기록을 붙이면 빠진 맥락이 보여요. 정확히 얼마가 남았는지는 기억이 흐리지만 크게 남지 않았다고 말한다. 현금으로 갚은 것 말고도 서로 주고받은 도움을 다 빼면 거의 비슷해졌다는 식으로 흐린다.",
      "behaviorHint": "기록 쪽을 힐끗 보고 난 뒤 변명보다 해석을 먼저 붙인다.",
      "applicableStates": [
        "S0",
        "S1"
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
          "friend-05:a:d-3:s1:core",
          "friend-05:a:d-3:s1:frame"
        ],
        "forbidAtomIds": [
          "friend-05:a:d-3:s5:core"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:evidence:context",
      "coverageKey": "a:d-3:surface:early:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-3:surface:balance_recheck"
      ],
      "tags": [
        "evidence",
        "context"
      ]
    },
    {
      "id": "friend05:beat_v2:b:d-3:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "clarify",
      "line": "화면만이 아니라 누가 어떤 자리를 지키려 했는지도 드러나요. 보증금 대납 기록과 부분 상환 기록이 있어 미정산 사실을 인정받기 시작한다. 끝난 줄 알았다는 서윤의 말은 이해해도, 문서상으론 남은 칸이 있었다고 말한다.",
      "behaviorHint": "기록 쪽을 힐끗 보고 난 뒤 변명보다 해석을 먼저 붙인다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "shared_misconception",
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
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend-05:b:d-3:s2:core",
          "friend-05:b:d-3:s2:frame"
        ],
        "forbidAtomIds": [
          "friend-05:b:d-3:s5:core"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:evidence:identity",
      "coverageKey": "b:d-3:motive:mid:evidence:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-3:motive:misbelief_named"
      ],
      "tags": [
        "evidence",
        "identity"
      ],
      "requiresFlags": [
        "d-3:surface:balance_recheck"
      ]
    },
    {
      "id": "friend05:beat_v2:b:d-4:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "clarify",
      "line": "문서와 로그를 같이 보면 규칙선이 분명해져요. 말은 안 했지만 굳이 다시 상처내지 않으려고 혼자 정리하려 했다고 말한다. 예전 돈을 다시 꺼내는 것보다 조용히 계산하는 편이 덜 나쁠 줄 알았다고 흐린다.",
      "behaviorHint": "기록 쪽을 힐끗 보고 난 뒤 변명보다 해석을 먼저 붙인다.",
      "applicableStates": [
        "S0",
        "S1"
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
          "friend-05:b:d-4:s1:core",
          "friend-05:b:d-4:s1:frame"
        ],
        "forbidAtomIds": [
          "friend-05:b:d-4:s5:core"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:surface:evidence:legality",
      "coverageKey": "b:d-4:surface:early:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-4:surface:consent_line_named"
      ],
      "tags": [
        "evidence",
        "legality"
      ]
    },
    {
      "id": "friend05:beat_v2:a:d-4:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "clarify",
      "line": "이 기록을 붙이면 빠진 맥락이 보여요. 과거 잔액이 있다는 맥락은 인정하지만, 그래서 더더욱 현재 48만원을 따로 말했어야 했다고 말한다. 하린에게만 상계 얘기를 먼저 한 건 나를 당사자에서 빼놓은 행동이라고 짚는다.",
      "behaviorHint": "기록 쪽을 힐끗 보고 난 뒤 변명보다 해석을 먼저 붙인다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "sub_truth",
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
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend-05:a:d-4:s2:core",
          "friend-05:a:d-4:s2:frame"
        ],
        "forbidAtomIds": [
          "friend-05:a:d-4:s5:core"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:evidence:context",
      "coverageKey": "a:d-4:motive:mid:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-4:motive:offset_named"
      ],
      "tags": [
        "evidence",
        "context"
      ],
      "requiresFlags": [
        "d-4:surface:consent_line_named"
      ]
    },
    {
      "id": "friend05:beat_v2:b:d-1:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "irritated",
      "line": "같은 대답을 몇 번이나 반복하게 하지 마. 별도 송금 못 한 건 맞다고 인정하면서도, 예전 남은 돈이 계속 마음에 걸렸다고 덧붙인다.",
      "behaviorHint": "호흡이 거칠어지고 같은 설명을 반복하는 피로가 드러난다.",
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
          "friend-05:b:d-1:s2:core",
          "friend-05:b:d-1:s2:frame"
        ],
        "forbidAtomIds": [
          "friend-05:b:d-1:s5:core"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:fatigue:timeline",
      "coverageKey": "b:d-1:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:betrayal_named"
      ],
      "tags": [
        "fatigue",
        "timeline"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ]
    },
    {
      "id": "friend05:beat_v2:b:d-1:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "block",
      "line": "그 얘기 세 번째야. 더 돌려 말하고 싶지 않아. 오래된 돈을 다시 꺼내면 내가 더 옹졸해 보일까 봐 입을 닫았다고 관계를 앞세운다.",
      "behaviorHint": "호흡이 거칠어지고 같은 설명을 반복하는 피로가 드러난다.",
      "applicableStates": [
        "S2",
        "S3"
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
          "friend-05:b:d-1:s3:core",
          "friend-05:b:d-1:s3:frame"
        ],
        "forbidAtomIds": [
          "friend-05:b:d-1:s5:core"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:fatigue:responsibility",
      "coverageKey": "b:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:betrayal_named"
      ],
      "tags": [
        "fatigue",
        "responsibility"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ]
    },
    {
      "id": "friend05:beat_v2:b:d-1:core:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "counter",
      "line": "같은 대답을 몇 번이나 반복하게 하지 마. 겉으로는 미룬 게 아니라 계산하고 있었다며, 사실상 상계 생각을 품고 있었다고 드러낸다.",
      "behaviorHint": "호흡이 거칠어지고 같은 설명을 반복하는 피로가 드러난다.",
      "applicableStates": [
        "S3",
        "S4"
      ],
      "layer": "core",
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
          "friend-05:b:d-1:s4:core",
          "friend-05:b:d-1:s4:frame"
        ],
        "forbidAtomIds": [
          "friend-05:b:d-1:s5:core"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:fatigue:responsibility",
      "coverageKey": "b:d-1:core:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-1:core:debt_split_open"
      ],
      "tags": [
        "fatigue",
        "responsibility"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed",
        "d-1:motive:betrayal_named"
      ]
    },
    {
      "id": "friend05:beat_v2:a:d-2:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "irritated",
      "line": "같은 대답을 몇 번이나 반복하게 하지 마. 캡처가 현재 독촉 장면 위주였던 건 맞지만, 그때는 정말 내가 당한 쪽처럼 느껴졌다고 말한다.",
      "behaviorHint": "호흡이 거칠어지고 같은 설명을 반복하는 피로가 드러난다.",
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
          "friend-05:a:d-2:s2:core",
          "friend-05:a:d-2:s2:frame"
        ],
        "forbidAtomIds": [
          "friend-05:a:d-2:s5:core"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:fatigue:timeline",
      "coverageKey": "a:d-2:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:victim_slot_named"
      ],
      "tags": [
        "fatigue",
        "timeline"
      ],
      "requiresFlags": [
        "d-2:surface:spread_frame_named"
      ]
    },
    {
      "id": "friend05:beat_v2:a:d-2:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "block",
      "line": "그 얘기 세 번째야. 더 돌려 말하고 싶지 않아. 태오를 바로 공격하려던 것보다, 내가 혼자 손해 본 사람처럼 느껴진 분노가 먼저였다고 해명한다.",
      "behaviorHint": "호흡이 거칠어지고 같은 설명을 반복하는 피로가 드러난다.",
      "applicableStates": [
        "S2",
        "S3"
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
          "friend-05:a:d-2:s3:core",
          "friend-05:a:d-2:s3:frame"
        ],
        "forbidAtomIds": [
          "friend-05:a:d-2:s5:core"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:fatigue:responsibility",
      "coverageKey": "a:d-2:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:victim_slot_named"
      ],
      "tags": [
        "fatigue",
        "responsibility"
      ],
      "requiresFlags": [
        "d-2:surface:spread_frame_named"
      ]
    },
    {
      "id": "friend05:beat_v2:a:d-2:core:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "counter",
      "line": "같은 대답을 몇 번이나 반복하게 하지 마. 내가 억울하다는 감정이 너무 커서, 상대를 설명할 여지를 일부러 안 남겼다고 털어놓는다.",
      "behaviorHint": "호흡이 거칠어지고 같은 설명을 반복하는 피로가 드러난다.",
      "applicableStates": [
        "S3",
        "S4"
      ],
      "layer": "core",
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
          "friend-05:a:d-2:s4:core",
          "friend-05:a:d-2:s4:frame"
        ],
        "forbidAtomIds": [
          "friend-05:a:d-2:s5:core"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:core:fatigue:responsibility",
      "coverageKey": "a:d-2:core:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-2:core:omission_admitted"
      ],
      "tags": [
        "fatigue",
        "responsibility"
      ],
      "requiresFlags": [
        "d-2:surface:spread_frame_named",
        "d-2:motive:victim_slot_named"
      ]
    },
    {
      "id": "friend05:beat_v2:b:d-1:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "open_up",
      "line": "감정까지 묻는다면 여기서 숨기진 않을게요. 겉으로는 미룬 게 아니라 계산하고 있었다며, 사실상 상계 생각을 품고 있었다고 드러낸다.",
      "behaviorHint": "목소리가 약간 낮아지고, 버티던 표정 사이로 감정이 먼저 새어 나온다.",
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
          "strained",
          "raw"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend-05:b:d-1:s4:core",
          "friend-05:b:d-1:s4:frame"
        ],
        "forbidAtomIds": [
          "friend-05:b:d-1:s0:core"
        ]
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:rapport:emotion",
      "coverageKey": "b:d-1:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:debt_split_open"
      ],
      "tags": [
        "free_question",
        "emotion"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed",
        "d-1:motive:betrayal_named"
      ]
    },
    {
      "id": "friend05:beat_v2:a:d-1:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confess",
      "line": "직접 묻는다면 돌리지 않고 말할게요. 현재 48만원 미상환은 사실이고, 동시에 내 쪽 과거 채무도 숨기면 안 됐다고 인정한다.",
      "behaviorHint": "말끝을 늦추며 속내를 꺼내려다 스스로 정당화를 덧붙인다.",
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
          "strained",
          "raw"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend-05:a:d-1:s5:core",
          "friend-05:a:d-1:s5:frame"
        ],
        "forbidAtomIds": [
          "friend-05:a:d-1:s0:core"
        ]
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:motive:motive",
      "coverageKey": "a:d-1:core:late:motive:motive",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:debt_split_open"
      ],
      "tags": [
        "free_question",
        "motive"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed",
        "d-1:motive:betrayal_named"
      ]
    },
    {
      "id": "friend05:beat_v2:a:d-2:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "open_up",
      "line": "감정까지 묻는다면 여기서 숨기진 않을게요. 내가 억울하다는 감정이 너무 커서, 상대를 설명할 여지를 일부러 안 남겼다고 털어놓는다.",
      "behaviorHint": "목소리가 약간 낮아지고, 버티던 표정 사이로 감정이 먼저 새어 나온다.",
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
          "strained",
          "raw"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend-05:a:d-2:s4:core",
          "friend-05:a:d-2:s4:frame"
        ],
        "forbidAtomIds": [
          "friend-05:a:d-2:s0:core"
        ]
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:core:rapport:emotion",
      "coverageKey": "a:d-2:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-2:core:omission_admitted"
      ],
      "tags": [
        "free_question",
        "emotion"
      ],
      "requiresFlags": [
        "d-2:surface:spread_frame_named",
        "d-2:motive:victim_slot_named"
      ]
    },
    {
      "id": "friend05:beat_v2:b:d-2:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confess",
      "line": "직접 묻는다면 돌리지 않고 말할게요. 서윤은 현재 48만원만 부각해 더 큰 과거 채무를 숨기고 퍼뜨렸고, 나는 그 오해를 바로잡지 못했다.",
      "behaviorHint": "말끝을 늦추며 속내를 꺼내려다 스스로 정당화를 덧붙인다.",
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
          "strained",
          "raw"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend-05:b:d-2:s5:core",
          "friend-05:b:d-2:s5:frame"
        ],
        "forbidAtomIds": [
          "friend-05:b:d-2:s0:core"
        ]
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:core:motive:motive",
      "coverageKey": "b:d-2:core:late:motive:motive",
      "variantTarget": 2,
      "setFlags": [
        "d-2:core:omission_admitted"
      ],
      "tags": [
        "free_question",
        "motive"
      ],
      "requiresFlags": [
        "d-2:surface:spread_frame_named",
        "d-2:motive:victim_slot_named"
      ]
    },
    {
      "id": "friend05:beat_v2:a:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "misread",
      "line": "그 말은 결국 자기 자리를 지키려는 쪽으로 들려요. 2년 전 186만원은 거의 끝난 돈이고, 중간에 현금이랑 내가 해준 일들까지 보면 사실상 정리됐다는 주장이다.",
      "behaviorHint": "확신과 혼란이 뒤섞여 같은 포인트를 붙잡고 버틴다.",
      "applicableStates": [
        "S0",
        "S1"
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
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend-05:a:d-3:s0:core",
          "friend-05:a:d-3:s0:frame"
        ],
        "forbidAtomIds": [
          "friend-05:a:d-3:s5:core"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:identity",
      "coverageKey": "a:d-3:surface:early:trap:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-3:surface:balance_recheck"
      ],
      "tags": [
        "hot",
        "identity",
        "shared_misconception"
      ],
      "beliefMode": "misbelief"
    },
    {
      "id": "friend05:beat_v2:b:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "misread",
      "line": "앞뒤를 떼면 다르게 들려요. 정확한 남은 액수는 시트를 다시 봐야 하지만 '끝난 돈'은 아니었다고 말한다. 현금 상환 두 번 외의 도움은 상환으로 적힌 적이 없었다는 점을 슬쩍 얹는다.",
      "behaviorHint": "확신과 혼란이 뒤섞여 같은 포인트를 붙잡고 버틴다.",
      "applicableStates": [
        "S0",
        "S1"
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
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend-05:b:d-3:s1:core",
          "friend-05:b:d-3:s1:frame"
        ],
        "forbidAtomIds": [
          "friend-05:b:d-3:s5:core"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:context",
      "coverageKey": "b:d-3:surface:early:trap:context",
      "variantTarget": 6,
      "setFlags": [
        "d-3:surface:balance_recheck"
      ],
      "tags": [
        "hot",
        "context",
        "shared_misconception"
      ],
      "beliefMode": "suspects"
    },
    {
      "id": "friend05:beat_v2:a:d-3:core:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "doubt",
      "line": "앞뒤를 떼면 다르게 들려요. 숫자로 다시 적는 게 너무 수치스러워 일부러 확인을 안 했다고 감정을 섞는다.",
      "behaviorHint": "확신과 혼란이 뒤섞여 같은 포인트를 붙잡고 버틴다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "question",
      "questionTypes": [
        "motive_search"
      ],
      "conditions": {
        "emotionTiers": [
          "strained",
          "raw"
        ],
        "trustWindowBands": [
          "narrow",
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
          "friend-05:a:d-3:s4:core",
          "friend-05:a:d-3:s4:frame"
        ],
        "forbidAtomIds": [
          "friend-05:a:d-3:s0:core"
        ]
      },
      "weight": 5,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:trap:context",
      "coverageKey": "a:d-3:core:late:trap:context",
      "variantTarget": 2,
      "setFlags": [
        "d-3:core:old_debt_open"
      ],
      "tags": [
        "late",
        "context",
        "shared_misconception"
      ],
      "requiresFlags": [
        "d-3:surface:balance_recheck",
        "d-3:motive:misbelief_named"
      ],
      "beliefMode": "misbelief"
    },
    {
      "id": "friend05:beat_v2:b:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "clarify",
      "line": "지금은 감정도 같이 남아 있어요. 186만원 보증금은 완전히 정산된 돈이 아니었고, 끝난 척 놔둔 내 책임도 있다.",
      "behaviorHint": "확신과 혼란이 뒤섞여 같은 포인트를 붙잡고 버틴다.",
      "applicableStates": [
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
          "raw"
        ],
        "trustWindowBands": [
          "narrow",
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
          "friend-05:b:d-3:s5:core",
          "friend-05:b:d-3:s5:frame"
        ],
        "forbidAtomIds": [
          "friend-05:b:d-3:s0:core"
        ]
      },
      "weight": 5,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:trap:emotion",
      "coverageKey": "b:d-3:core:late:trap:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-3:core:old_debt_open"
      ],
      "tags": [
        "late",
        "emotion",
        "shared_misconception"
      ],
      "requiresFlags": [
        "d-3:surface:balance_recheck",
        "d-3:motive:misbelief_named"
      ],
      "beliefMode": "suspects"
    },
    {
      "id": "friend05:beat_v2:b:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "잠깐만, 그 말은 너무 쉽게 지나가요. 겉으로는 미룬 게 아니라 계산하고 있었다며, 사실상 상계 생각을 품고 있었다고 드러낸다.",
      "behaviorHint": "본선 대사 사이를 끊고 끼어들며, 감정과 사실선이 순간적으로 튀어나온다.",
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
          "friend-05:b:d-1:s4:core",
          "friend-05:b:d-1:s4:frame"
        ],
        "forbidAtomIds": [
          "friend-05:b:d-1:s5:core"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-1:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "friend05:beat_v2:a:d-1:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "감정부터 던지면 사실이 흐려져. 과거 큰돈을 꺼내고 싶지 않았던 건 맞지만, 그래서 더더욱 먼저 말했어야 했다고 몰아세운다.",
      "behaviorHint": "본선 대사 사이를 끊고 끼어들며, 감정과 사실선이 순간적으로 튀어나온다.",
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
          "friend-05:a:d-1:s3:core",
          "friend-05:a:d-1:s3:frame"
        ],
        "forbidAtomIds": [
          "friend-05:a:d-1:s5:core"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-1:surface:mid:interjection:emotional_only:block",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "friend05:beat_v2:a:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "잠깐만, 그 말은 너무 쉽게 지나가요. 내가 억울하다는 감정이 너무 커서, 상대를 설명할 여지를 일부러 안 남겼다고 털어놓는다.",
      "behaviorHint": "본선 대사 사이를 끊고 끼어들며, 감정과 사실선이 순간적으로 튀어나온다.",
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
          "friend-05:a:d-2:s4:core",
          "friend-05:a:d-2:s4:frame"
        ],
        "forbidAtomIds": [
          "friend-05:a:d-2:s5:core"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-2:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:spread_frame_named"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "friend05:beat_v2:b:d-2:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "감정부터 던지면 사실이 흐려져. 그 오해를 내가 바로잡지 못해 태오만 안 갚는 사람처럼 굳었다고 상처를 드러낸다.",
      "behaviorHint": "본선 대사 사이를 끊고 끼어들며, 감정과 사실선이 순간적으로 튀어나온다.",
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
          "friend-05:b:d-2:s3:core",
          "friend-05:b:d-2:s3:frame"
        ],
        "forbidAtomIds": [
          "friend-05:b:d-2:s5:core"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-2:surface:mid:interjection:emotional_only:block",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:spread_frame_named"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "friend05:beat_v2:b:d-1:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "세부를 바로잡아야 해. 약속을 어긴 건 맞지만 일부러 먹튀하려던 건 아니었다고 말한다.",
      "behaviorHint": "본선 대사 사이를 끊고 끼어들며, 감정과 사실선이 순간적으로 튀어나온다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "timeline",
      "actionFamily": "interjection",
      "questionTypes": [],
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
          "wary",
          "tired"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend-05:b:d-1:s3:core",
          "friend-05:b:d-1:s3:frame"
        ],
        "forbidAtomIds": [
          "friend-05:b:d-1:s5:core"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-1:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "friend05:beat_v2:a:d-1:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "디테일을 흩뿌려도 핵심은 안 바뀌어. 예전 보증금 얘기가 남아 있어도 현재 48만원은 따로 갚았어야 한다고 주장한다.",
      "behaviorHint": "본선 대사 사이를 끊고 끼어들며, 감정과 사실선이 순간적으로 튀어나온다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "responsibility",
      "actionFamily": "interjection",
      "questionTypes": [],
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
          "wary",
          "tired"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend-05:a:d-1:s2:core",
          "friend-05:a:d-1:s2:frame"
        ],
        "forbidAtomIds": [
          "friend-05:a:d-1:s5:core"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-1:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "friend05:beat_v2:a:d-2:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "세부를 바로잡아야 해. 과거 잔액을 빼면 사람들이 내 얘기를 더 바로 믿을 거라는 건 알고 있었다고 고개를 낮춘다.",
      "behaviorHint": "본선 대사 사이를 끊고 끼어들며, 감정과 사실선이 순간적으로 튀어나온다.",
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
          "friend-05:a:d-2:s3:core",
          "friend-05:a:d-2:s3:frame"
        ],
        "forbidAtomIds": [
          "friend-05:a:d-2:s5:core"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-2:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:spread_frame_named"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "friend05:beat_v2:b:d-2:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "디테일을 흩뿌려도 핵심은 안 바뀌어. 과거 큰 잔액이 빠진 채 퍼진 건 사실이라고 분명히 한다.",
      "behaviorHint": "본선 대사 사이를 끊고 끼어들며, 감정과 사실선이 순간적으로 튀어나온다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "responsibility",
      "actionFamily": "interjection",
      "questionTypes": [],
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
          "wary",
          "tired"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend-05:b:d-2:s2:core",
          "friend-05:b:d-2:s2:frame"
        ],
        "forbidAtomIds": [
          "friend-05:b:d-2:s5:core"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-2:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:spread_frame_named"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "friend05:beat_v2:a:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "그 오해가 지금 더 커지고 있어. 보증금 186만원 대납 자체는 인정하되, 체감상 거의 정리된 줄 알았다고 말한다.",
      "behaviorHint": "본선 대사 사이를 끊고 끼어들며, 감정과 사실선이 순간적으로 튀어나온다.",
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
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend-05:a:d-3:s2:core",
          "friend-05:a:d-3:s2:frame"
        ],
        "forbidAtomIds": [
          "friend-05:a:d-3:s5:core"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:balance_recheck"
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
      "id": "friend05:beat_v2:b:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "그 해석부터 멈춰. 보증금 대납 기록과 부분 상환 기록이 있어 미정산 사실을 인정받기 시작한다.",
      "behaviorHint": "본선 대사 사이를 끊고 끼어들며, 감정과 사실선이 순간적으로 튀어나온다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "identity",
      "actionFamily": "interjection",
      "questionTypes": [],
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
          "wary",
          "tired"
        ],
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
          "friend-05:b:d-3:s2:core",
          "friend-05:b:d-3:s2:frame"
        ],
        "forbidAtomIds": [
          "friend-05:b:d-3:s5:core"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:balance_recheck"
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
      "id": "friend05:beat_v2:a:d-3:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "그 오해가 지금 더 커지고 있어. 현금 두 번 갚은 것 말고 꽃장식이나 부탁성 도움을 상환처럼 느낀 건 내 쪽 해석이었다고 인정한다.",
      "behaviorHint": "본선 대사 사이를 끊고 끼어들며, 감정과 사실선이 순간적으로 튀어나온다.",
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
          "M2",
          "M3"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend-05:a:d-3:s3:core",
          "friend-05:a:d-3:s3:frame"
        ],
        "forbidAtomIds": [
          "friend-05:a:d-3:s5:core"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:balance_recheck"
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
      "id": "friend05:beat_v2:b:d-3:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "그 해석부터 멈춰. 예전 큰돈을 다시 꺼내는 게 치사해 보일까 봐 나도 묻어둔 건 맞다고 인정한다.",
      "behaviorHint": "본선 대사 사이를 끊고 끼어들며, 감정과 사실선이 순간적으로 튀어나온다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "emotion",
      "actionFamily": "interjection",
      "questionTypes": [],
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
          "friend-05:b:d-3:s4:core",
          "friend-05:b:d-3:s4:frame"
        ],
        "forbidAtomIds": [
          "friend-05:b:d-3:s5:core"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:balance_recheck"
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

export default friend05BeatsV2Full;
