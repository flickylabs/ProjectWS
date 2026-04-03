export const spouse07BeatsV2Full = {
  "caseId": "spouse-07",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 54,
    "byActionFamily": {
      "question": 23,
      "evidence": 6,
      "interjection": 12,
      "free_question": 7,
      "fatigue": 6
    },
    "byParty": {
      "a": 24,
      "b": 30
    },
    "byIssueRole": {
      "sub_truth": 13,
      "core_truth": 22,
      "shared_misconception": 19
    },
    "byDispute": {
      "d-2": 7,
      "d-4": 6,
      "d-5": 13,
      "d-1": 9,
      "d-3": 19
    },
    "byStage": {
      "early": 18,
      "mid": 27,
      "late": 9
    },
    "interjectionDistribution": {
      "emotional_only": 4,
      "detail_rebuttal": 4,
      "misbelief_escalation": 4
    },
    "fatigueDisputes": [
      "d-1",
      "d-3"
    ]
  },
  "beats": [
    {
      "id": "spouse07:beat_v2:a:d-2:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "그건 편집이라기보다 제가 맡은 쪽을 따로 본 겁니다. 다 보여 주자는 얘기는 아니었어요. 순서대로 놓고 보면 그렇게 단순한 장면은 아닙니다.",
      "behaviorHint": "말을 고르며 범위를 좁혀 말한다.",
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
          "spouse07:a:d-2:denial:0"
        ],
        "forbidAtomIds": [
          "spouse07:a:d-2:responsibility:5",
          "spouse07:a:d-2:unlock:s5:0"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:pressure:timeline",
      "coverageKey": "a:d-2:surface:early:pressure:timeline",
      "variantTarget": 7,
      "requiresFlags": [],
      "setFlags": [
        "d-2:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse07:beat_v2:a:d-4:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "제가 먼저 점수판을 꺼낸 건 아니지만, 정산하려고 적기 시작한 건 맞습니다. 순서대로 놓고 보면 그렇게 단순한 장면은 아닙니다.",
      "behaviorHint": "자신도 모르게 손가락으로 횟수를 세는 듯 움직인다.",
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
          "spouse07:a:d-4:denial:0"
        ],
        "forbidAtomIds": [
          "spouse07:a:d-4:responsibility:5",
          "spouse07:a:d-4:unlock:s5:0"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:pressure:timeline",
      "coverageKey": "a:d-4:surface:early:pressure:timeline",
      "variantTarget": 7,
      "requiresFlags": [],
      "setFlags": [
        "d-4:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse07:beat_v2:a:d-5:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "다혜 씨 말이 불을 붙인 건 맞지만, 그 주간 일정이 유난히 꼬였던 것도 있습니다. 그때 상황까지 같이 보면 결이 달라집니다.",
      "behaviorHint": "비난과 설명 사이를 오가며 손을 모은다.",
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
          "spouse07:a:d-5:context:1"
        ],
        "forbidAtomIds": [
          "spouse07:a:d-5:responsibility:5",
          "spouse07:a:d-5:unlock:s5:0"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:pressure:context",
      "coverageKey": "a:d-5:surface:early:pressure:context",
      "variantTarget": 7,
      "requiresFlags": [],
      "setFlags": [
        "d-5:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse07:beat_v2:b:d-1:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "제가 그렇게 말한 건 아침이 정말 전쟁 같았기 때문이에요. 표현이 세긴 했을 수 있어요. 그때 상황까지 같이 보면 결이 달라집니다.",
      "behaviorHint": "당시 장면을 길게 풀어놓으며 속도를 늦춘다.",
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
          "spouse07:b:d-1:context:1"
        ],
        "forbidAtomIds": [
          "spouse07:b:d-1:responsibility:5",
          "spouse07:b:d-1:unlock:s5:0"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:context",
      "coverageKey": "b:d-1:surface:early:pressure:context",
      "variantTarget": 7,
      "requiresFlags": [],
      "setFlags": [
        "d-1:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse07:beat_v2:b:d-3:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "단정하려던 건 아니어도, 적어도 아침과 행사 쪽은 제가 거의 다 뛰었다고 느꼈어요. 그걸 곧바로 누구를 겨냥한 뜻으로만 잠그면 제 말이 비뚤어집니다.",
      "behaviorHint": "한 장면을 반복해서 세세히 묘사한다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
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
          "spouse07:b:d-3:denial:0"
        ],
        "forbidAtomIds": [
          "spouse07:b:d-3:relationship:4",
          "spouse07:b:d-3:unlock:s4:0"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:pressure:identity",
      "coverageKey": "b:d-3:surface:early:pressure:identity",
      "variantTarget": 7,
      "requiresFlags": [],
      "setFlags": [
        "d-3:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse07:beat_v2:b:d-5:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "태준 씨 대응이 느렸다고 느낀 건 맞지만, 일정이 한꺼번에 꼬였던 것도 사실이에요. 그때 상황까지 같이 보면 결이 달라집니다.",
      "behaviorHint": "손을 펼쳤다 접으며 말을 정리한다.",
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
          "spouse07:b:d-5:context:1"
        ],
        "forbidAtomIds": [
          "spouse07:b:d-5:emotion:4",
          "spouse07:b:d-5:unlock:s4:0"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:pressure:context",
      "coverageKey": "b:d-5:surface:early:pressure:context",
      "variantTarget": 7,
      "requiresFlags": [],
      "setFlags": [
        "d-5:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse07:beat_v2:a:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "억울함을 보여 주려는 명분으로 맥락 삭제를 합리화한다. 그때 상황까지 같이 보면 결이 달라집니다.",
      "behaviorHint": "말을 고르며 범위를 좁혀 말한다.",
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
          "spouse07:a:d-2:context:1"
        ],
        "forbidAtomIds": [
          "spouse07:a:d-2:responsibility:5",
          "spouse07:a:d-2:unlock:s5:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:pressure:context",
      "coverageKey": "a:d-2:surface:early:pressure:context",
      "variantTarget": 6,
      "requiresFlags": [],
      "setFlags": [
        "d-2:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse07:beat_v2:a:d-4:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "정산이라는 이름으로 점수판 언어를 완곡화한다. 그때 상황까지 같이 보면 결이 달라집니다.",
      "behaviorHint": "자신도 모르게 손가락으로 횟수를 세는 듯 움직인다.",
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
          "spouse07:a:d-4:context:1"
        ],
        "forbidAtomIds": [
          "spouse07:a:d-4:responsibility:5",
          "spouse07:a:d-4:unlock:s5:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:pressure:context",
      "coverageKey": "a:d-4:surface:early:pressure:context",
      "variantTarget": 6,
      "requiresFlags": [],
      "setFlags": [
        "d-4:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse07:beat_v2:a:d-5:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "갈등 붕괴의 원인을 상대의 태도에 우선 귀속한다. 그걸 곧바로 누구를 겨냥한 뜻으로만 잠그면 제 말이 비뚤어집니다.",
      "behaviorHint": "비난과 설명 사이를 오가며 손을 모은다.",
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
          "spouse07:a:d-5:responsibility:0"
        ],
        "forbidAtomIds": [
          "spouse07:a:d-5:responsibility:5",
          "spouse07:a:d-5:unlock:s5:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:pressure:identity",
      "coverageKey": "a:d-5:surface:early:pressure:identity",
      "variantTarget": 6,
      "requiresFlags": [],
      "setFlags": [
        "d-5:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse07:beat_v2:b:d-1:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "아침 비중을 전체 기여처럼 말해도 괜찮다고 스스로 정당화한다. 그걸 곧바로 누구를 겨냥한 뜻으로만 잠그면 제 말이 비뚤어집니다.",
      "behaviorHint": "당시 장면을 길게 풀어놓으며 속도를 늦춘다.",
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
          "spouse07:b:d-1:denial:0"
        ],
        "forbidAtomIds": [
          "spouse07:b:d-1:responsibility:5",
          "spouse07:b:d-1:unlock:s5:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:identity",
      "coverageKey": "b:d-1:surface:early:pressure:identity",
      "variantTarget": 6,
      "requiresFlags": [],
      "setFlags": [
        "d-1:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse07:beat_v2:b:d-3:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "체감상 버틴 강도를 근거로 상대 기여를 낮게 잡아도 된다고 느낀다. 그때 상황까지 같이 보면 결이 달라집니다.",
      "behaviorHint": "한 장면을 반복해서 세세히 묘사한다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
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
          "spouse07:b:d-3:denial:0"
        ],
        "forbidAtomIds": [
          "spouse07:b:d-3:relationship:4",
          "spouse07:b:d-3:unlock:s4:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:pressure:context",
      "coverageKey": "b:d-3:surface:early:pressure:context",
      "variantTarget": 6,
      "requiresFlags": [],
      "setFlags": [
        "d-3:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse07:beat_v2:b:d-5:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "최근 붕괴의 원인을 상대의 반응 방식에 우선 귀속한다. 그걸 곧바로 누구를 겨냥한 뜻으로만 잠그면 제 말이 비뚤어집니다.",
      "behaviorHint": "손을 펼쳤다 접으며 말을 정리한다.",
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
          "spouse07:b:d-5:responsibility:0"
        ],
        "forbidAtomIds": [
          "spouse07:b:d-5:emotion:4",
          "spouse07:b:d-5:unlock:s4:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:pressure:identity",
      "coverageKey": "b:d-5:surface:early:pressure:identity",
      "variantTarget": 6,
      "requiresFlags": [],
      "setFlags": [
        "d-5:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse07:beat_v2:a:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "counter",
      "line": "보이는 아침 노동과 보이지 않는 생활행정을 같은 층위로 봐야 한다고 주장한다. 그때 상황까지 같이 보면 결이 달라집니다.",
      "behaviorHint": "해석을 바로잡으려 하지만 말투에 억울함이 먼저 묻어난다.",
      "applicableStates": [
        "S0",
        "S1",
        "S2"
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
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:a:d-3:context:1"
        ],
        "forbidAtomIds": [
          "spouse07:a:d-3:responsibility:5",
          "spouse07:a:d-3:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:context",
      "coverageKey": "a:d-3:surface:early:trap:context",
      "variantTarget": 4,
      "setFlags": [
        "d-3:surface:context_pressed"
      ],
      "tags": [
        "misconception",
        "red_herring"
      ]
    },
    {
      "id": "spouse07:beat_v2:a:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "counter",
      "line": "자신의 기여가 보이지 않게 분산되어 있을 뿐 거의 안 한 것은 아니라고 본다. 그걸 곧바로 누구를 겨냥한 뜻으로만 잠그면 제 말이 비뚤어집니다.",
      "behaviorHint": "해석을 바로잡으려 하지만 말투에 억울함이 먼저 묻어난다.",
      "applicableStates": [
        "S0",
        "S1",
        "S2"
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
          "M1"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:a:d-3:denial:0"
        ],
        "forbidAtomIds": [
          "spouse07:a:d-3:responsibility:5",
          "spouse07:a:d-3:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:identity",
      "coverageKey": "a:d-3:surface:early:trap:identity",
      "variantTarget": 4,
      "setFlags": [
        "d-3:surface:identity_pressed"
      ],
      "tags": [
        "misconception",
        "red_herring"
      ]
    },
    {
      "id": "spouse07:beat_v2:b:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "counter",
      "line": "체감상 버틴 강도를 근거로 상대 기여를 낮게 잡아도 된다고 느낀다. 그때 상황까지 같이 보면 결이 달라집니다.",
      "behaviorHint": "해석을 바로잡으려 하지만 말투에 억울함이 먼저 묻어난다.",
      "applicableStates": [
        "S0",
        "S1",
        "S2"
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
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:b:d-3:denial:0"
        ],
        "forbidAtomIds": [
          "spouse07:b:d-3:relationship:4",
          "spouse07:b:d-3:unlock:s4:0"
        ]
      },
      "weight": 5,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:context",
      "coverageKey": "b:d-3:surface:early:trap:context",
      "variantTarget": 4,
      "setFlags": [
        "d-3:surface:context_pressed"
      ],
      "tags": [
        "misconception",
        "red_herring"
      ]
    },
    {
      "id": "spouse07:beat_v2:a:d-2:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "원본까지 같이 보면 제가 밤·주말만 뽑은 건 맞습니다. 다만 안 보이는 일을 보여 주고 싶었습니다. 겉에 드러난 말보다 이유가 더 컸습니다.",
      "behaviorHint": "짧게 인정하고 바로 이유를 붙인다.",
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
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:a:d-2:self_justification:3"
        ],
        "forbidAtomIds": [
          "spouse07:a:d-2:fear:4",
          "spouse07:a:d-2:unlock:s4:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:motive:motive",
      "coverageKey": "a:d-2:motive:mid:motive:motive",
      "variantTarget": 5,
      "requiresFlags": [
        "d-2:surface:timeline_pressed"
      ],
      "setFlags": [
        "d-2:motive:motive_opened"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "spouse07:beat_v2:a:d-4:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "메모와 대화가 남아 있으니 부인하긴 어렵네요. 저도 숫자로 대응했습니다. 겉에 드러난 말보다 이유가 더 컸습니다.",
      "behaviorHint": "고개를 한 번 숙였다 든다.",
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
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:a:d-4:self_justification:3"
        ],
        "forbidAtomIds": [
          "spouse07:a:d-4:shame:4",
          "spouse07:a:d-4:unlock:s4:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:motive:motive",
      "coverageKey": "a:d-4:motive:mid:motive:motive",
      "variantTarget": 5,
      "requiresFlags": [
        "d-4:surface:timeline_pressed"
      ],
      "setFlags": [
        "d-4:motive:motive_opened"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "spouse07:beat_v2:a:d-5:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "병원 예약과 생활행정이 몰린 걸 보면, 이걸 한 사람 태만으로만 보긴 어렵겠습니다. 제 몫이 전혀 없다는 말은 아니지만, 전부를 그렇게 묶을 수도 없습니다.",
      "behaviorHint": "자료를 보고 나서야 문장 끝 힘이 빠진다.",
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
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:a:d-5:admission:2"
        ],
        "forbidAtomIds": [
          "spouse07:a:d-5:emotion:4",
          "spouse07:a:d-5:unlock:s4:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:pressure:responsibility",
      "coverageKey": "a:d-5:motive:mid:pressure:responsibility",
      "variantTarget": 5,
      "requiresFlags": [
        "d-5:surface:context_pressed"
      ],
      "setFlags": [
        "d-5:motive:responsibility_pressed"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "spouse07:beat_v2:b:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "사진과 단톡이 같이 나오면, 제가 평일 전체처럼 들리게 말한 건 인정해요. 제 몫이 전혀 없다는 말은 아니지만, 전부를 그렇게 묶을 수도 없습니다.",
      "behaviorHint": "고개를 끄덕이면서도 손은 꼭 쥔다.",
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
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:b:d-1:admission:2"
        ],
        "forbidAtomIds": [
          "spouse07:b:d-1:shame:4",
          "spouse07:b:d-1:unlock:s4:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:pressure:responsibility",
      "coverageKey": "b:d-1:motive:mid:pressure:responsibility",
      "variantTarget": 5,
      "requiresFlags": [
        "d-1:surface:context_pressed"
      ],
      "setFlags": [
        "d-1:motive:responsibility_pressed"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "spouse07:beat_v2:b:d-3:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "등하원 기록까지 보면 제가 너무 크게 말한 건 맞네요. 아침 강도를 전체처럼 말했습니다. 겉에 드러난 말보다 이유가 더 컸습니다.",
      "behaviorHint": "말끝이 약해지며 기록을 다시 본다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "shared_misconception",
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
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:b:d-3:admission:2"
        ],
        "forbidAtomIds": [
          "spouse07:b:d-3:relationship:4",
          "spouse07:b:d-3:unlock:s4:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:motive:motive",
      "coverageKey": "b:d-3:motive:mid:motive:motive",
      "variantTarget": 5,
      "requiresFlags": [
        "d-3:surface:identity_pressed"
      ],
      "setFlags": [
        "d-3:motive:motive_opened"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "spouse07:beat_v2:b:d-5:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "도우미 종료 뒤 야근이 겹친 걸 보면, 이걸 한 사람 게으름으로만 몰긴 어렵네요. 제 몫이 전혀 없다는 말은 아니지만, 전부를 그렇게 묶을 수도 없습니다.",
      "behaviorHint": "캘린더를 보며 목소리가 한 톤 내려간다.",
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
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:b:d-5:admission:2"
        ],
        "forbidAtomIds": [
          "spouse07:b:d-5:emotion:4",
          "spouse07:b:d-5:unlock:s4:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:pressure:responsibility",
      "coverageKey": "b:d-5:motive:mid:pressure:responsibility",
      "variantTarget": 5,
      "requiresFlags": [
        "d-5:surface:context_pressed"
      ],
      "setFlags": [
        "d-5:motive:responsibility_pressed"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "spouse07:beat_v2:a:d-2:core:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "clarify",
      "line": "그 자료는 봤습니다. 선택 편집을 인정하지만 목적을 보이지 않는 노동의 가시화로 설명한다. 자료 형식이 차갑게 보여도 배경까지 잘라내진 못합니다.",
      "behaviorHint": "짧게 인정하고 바로 이유를 붙인다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "core",
      "issueRole": "sub_truth",
      "responseIntent": "evidence_response",
      "angleTag": "context",
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
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:a:d-2:admission:2",
          "spouse07:a:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse07:a:d-2:fear:4",
          "spouse07:a:d-2:unlock:s4:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:core:evidence:context",
      "coverageKey": "a:d-2:core:mid:evidence:context",
      "variantTarget": 3,
      "requiresFlags": [
        "d-2:surface:context_pressed"
      ],
      "setFlags": [
        "d-2:core:evidence_seen"
      ],
      "tags": [
        "cold",
        "evidence"
      ]
    },
    {
      "id": "spouse07:beat_v2:a:d-4:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "counter",
      "line": "그 자료는 봤습니다. 정산이라는 이름으로 점수판 언어를 완곡화한다. 자료 형식이 차갑게 보여도 배경까지 잘라내진 못합니다.",
      "behaviorHint": "고개를 한 번 숙였다 든다.",
      "applicableStates": [
        "S1",
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
          "spouse07:a:d-4:context:1",
          "spouse07:a:d-4:denial:0"
        ],
        "forbidAtomIds": [
          "spouse07:a:d-4:responsibility:5",
          "spouse07:a:d-4:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:evidence:context",
      "coverageKey": "a:d-4:surface:early:evidence:context",
      "variantTarget": 3,
      "requiresFlags": [
        "d-4:surface:context_pressed"
      ],
      "setFlags": [
        "d-4:surface:evidence_seen"
      ],
      "tags": [
        "cold",
        "evidence"
      ]
    },
    {
      "id": "spouse07:beat_v2:a:d-5:core:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "clarify",
      "line": "그 자료는 봤습니다. 외부 구조 요인이 한꺼번에 몰렸는데 그 압박을 상대 탓으로 단순화했다. 자료 형식이 차갑게 보여도 배경까지 잘라내진 못합니다.",
      "behaviorHint": "자료를 보고 나서야 문장 끝 힘이 빠진다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "evidence_response",
      "angleTag": "context",
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
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:a:d-5:context:3",
          "spouse07:a:d-5:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse07:a:d-5:emotion:4",
          "spouse07:a:d-5:unlock:s4:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:evidence:context",
      "coverageKey": "a:d-5:core:mid:evidence:context",
      "variantTarget": 3,
      "requiresFlags": [
        "d-5:surface:identity_pressed"
      ],
      "setFlags": [
        "d-5:core:evidence_seen"
      ],
      "tags": [
        "cold",
        "evidence"
      ]
    },
    {
      "id": "spouse07:beat_v2:b:d-1:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "counter",
      "line": "그 자료는 봤습니다. 아침 비중을 전체 기여처럼 말해도 괜찮다고 스스로 정당화한다. 형식상 거칠어 보여도 그걸 곧바로 최종 실행으로 읽는 건 과합니다.",
      "behaviorHint": "고개를 끄덕이면서도 손은 꼭 쥔다.",
      "applicableStates": [
        "S1",
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
          "spouse07:b:d-1:denial:0",
          "spouse07:b:d-1:context:1"
        ],
        "forbidAtomIds": [
          "spouse07:b:d-1:responsibility:5",
          "spouse07:b:d-1:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:evidence:legality",
      "coverageKey": "b:d-1:surface:early:evidence:legality",
      "variantTarget": 3,
      "requiresFlags": [
        "d-1:surface:identity_pressed"
      ],
      "setFlags": [
        "d-1:surface:evidence_seen"
      ],
      "tags": [
        "cold",
        "evidence"
      ]
    },
    {
      "id": "spouse07:beat_v2:b:d-3:core:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "clarify",
      "line": "그 자료는 봤습니다. 아침의 강도를 전체 돌봄 평가로 확장한 건 과했다고 인정한다. 그 자료만으로 의도와 대상을 한 줄로 묶는 건 무리입니다.",
      "behaviorHint": "말끝이 약해지며 기록을 다시 본다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "core",
      "issueRole": "shared_misconception",
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
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:b:d-3:admission:2",
          "spouse07:b:d-3:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse07:b:d-3:relationship:4",
          "spouse07:b:d-3:unlock:s4:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:evidence:identity",
      "coverageKey": "b:d-3:core:mid:evidence:identity",
      "variantTarget": 3,
      "requiresFlags": [
        "d-3:surface:context_pressed"
      ],
      "setFlags": [
        "d-3:core:evidence_seen"
      ],
      "tags": [
        "cold",
        "evidence"
      ]
    },
    {
      "id": "spouse07:beat_v2:b:d-5:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "counter",
      "line": "그 자료는 봤습니다. 상대 대응의 문제와 구조 압박이 같이 있었다고 본다. 자료 형식이 차갑게 보여도 배경까지 잘라내진 못합니다.",
      "behaviorHint": "캘린더를 보며 목소리가 한 톤 내려간다.",
      "applicableStates": [
        "S1",
        "S2"
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
          "spouse07:b:d-5:context:1",
          "spouse07:b:d-5:responsibility:0"
        ],
        "forbidAtomIds": [
          "spouse07:b:d-5:emotion:4",
          "spouse07:b:d-5:unlock:s4:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:evidence:context",
      "coverageKey": "b:d-5:surface:early:evidence:context",
      "variantTarget": 3,
      "requiresFlags": [
        "d-5:surface:identity_pressed"
      ],
      "setFlags": [
        "d-5:surface:evidence_seen"
      ],
      "tags": [
        "cold",
        "evidence"
      ]
    },
    {
      "id": "spouse07:beat_v2:a:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "밤·주말 PDF 얘기만 나오면 제가 제일 먼저 밀려난 사람 같아집니다.",
      "behaviorHint": "말허리를 잘라 들어오며 감정만 먼저 터뜨린다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "emotion",
      "actionFamily": "interjection",
      "questionTypes": [],
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
          "frayed"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:a:d-2:fear:4"
        ],
        "forbidAtomIds": []
      },
      "weight": 3,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-2:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "spouse07:beat_v2:a:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "emotional",
      "line": "좋은 아빠인지에 대한 불안이 공격적 해명 아래 깔려 있었다. 그래서 이건 규정이나 숫자보다 더 깊게 남았습니다.",
      "behaviorHint": "확신이 흔들리며 감정과 설명이 함께 튀어나온다.",
      "applicableStates": [
        "S3",
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
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
          "frayed",
          "exhausted"
        ],
        "misconceptionStates": [
          "M4"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:a:d-3:fear:4",
          "spouse07:a:d-3:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "spouse07:a:d-3:denial:0",
          "spouse07:a:d-3:context:1"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:trap:emotion",
      "coverageKey": "a:d-3:core:late:trap:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-3:core:emotion_opened"
      ],
      "tags": [
        "misconception",
        "red_herring"
      ]
    },
    {
      "id": "spouse07:beat_v2:a:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "interject",
      "line": "방금 제 말을 막으셔도 야간 도우미 종료에서 받은 감정은 그대로 남아 있습니다.",
      "behaviorHint": "말이 막히자 더 짧고 날카롭게 끼어든다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "emotion",
      "actionFamily": "interjection",
      "questionTypes": [],
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
          "frayed"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:a:d-5:admission:2"
        ],
        "forbidAtomIds": []
      },
      "weight": 3,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-5:surface:mid:interjection:emotional_only:block",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "spouse07:beat_v2:b:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "그날 아침이 얼마나 전쟁이었는지 아세요? 그걸 버틴 사람도 결국 인정받고 싶을 수 있잖아요.",
      "behaviorHint": "말허리를 잘라 들어오며 감정만 먼저 터뜨린다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "emotion",
      "actionFamily": "interjection",
      "questionTypes": [],
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
          "frayed"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:b:d-1:shame:4"
        ],
        "forbidAtomIds": []
      },
      "weight": 3,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-1:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "spouse07:beat_v2:b:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "emotional",
      "line": "관계를 지키고 싶은 마음과 인정 욕구가 동시에 작동해 표현을 왜곡했다. 그래서 이건 규정이나 숫자보다 더 깊게 남았습니다.",
      "behaviorHint": "확신이 흔들리며 감정과 설명이 함께 튀어나온다.",
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
          "agitated",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "frayed",
          "exhausted"
        ],
        "misconceptionStates": [
          "M3",
          "M4"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:b:d-3:relationship:4"
        ],
        "forbidAtomIds": [
          "spouse07:b:d-3:denial:0",
          "spouse07:b:d-3:context:1"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:trap:emotion",
      "coverageKey": "b:d-3:core:late:trap:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-3:core:emotion_opened"
      ],
      "tags": [
        "misconception",
        "red_herring"
      ]
    },
    {
      "id": "spouse07:beat_v2:b:d-3:motive:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "관계를 지키고 싶은 마음과 인정 욕구가 동시에 작동해 표현을 왜곡했다. 그때 상황까지 같이 보면 결이 달라집니다.",
      "behaviorHint": "확신이 흔들리며 감정과 설명이 함께 튀어나온다.",
      "applicableStates": [
        "S3",
        "S4",
        "S5"
      ],
      "layer": "motive",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "question",
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
          "frayed",
          "exhausted"
        ],
        "misconceptionStates": [
          "M3"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:b:d-3:relationship:4"
        ],
        "forbidAtomIds": [
          "spouse07:b:d-3:denial:0",
          "spouse07:b:d-3:context:1"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:trap:context",
      "coverageKey": "b:d-3:motive:late:trap:context",
      "variantTarget": 3,
      "setFlags": [
        "d-3:motive:context_pressed"
      ],
      "tags": [
        "misconception",
        "red_herring"
      ]
    },
    {
      "id": "spouse07:beat_v2:b:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "interject",
      "line": "방금 끊으셔도요, 숫자만 들이밀면 그날 아침이 얼마나 전쟁이었는지는 또 사라지죠.",
      "behaviorHint": "말이 막히자 더 짧고 날카롭게 끼어든다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "emotion",
      "actionFamily": "interjection",
      "questionTypes": [],
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
          "frayed"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:b:d-5:unlock:s3:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 3,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-5:surface:mid:interjection:emotional_only:block",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "spouse07:beat_v2:a:d-2:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "rebuttal",
      "line": "제 말 막아도 밤·주말 PDF하고 22분 뒤 내보내기는 그대로 남습니다. 디테일부터 틀린 쪽이 먼저 있잖아요.",
      "behaviorHint": "잘린 말 대신 숫자와 순서를 먼저 밀어 넣는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "timeline",
      "actionFamily": "interjection",
      "questionTypes": [],
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
          "frayed"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:a:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 3,
      "priority": 23,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-2:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "spouse07:beat_v2:a:d-4:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "rebuttal",
      "line": "오늘만 4번하고 17건 중 9건만 다시 보세요. 디테일을 맞춰 보면 제가 그렇게까지 단순하게 말한 건 아닙니다.",
      "behaviorHint": "시간표나 로그처럼 구체 디테일을 손가락으로 짚듯 말한다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "timeline",
      "actionFamily": "interjection",
      "questionTypes": [],
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
          "frayed"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:a:d-4:unlock:s3:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 3,
      "priority": 23,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-4:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "spouse07:beat_v2:b:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "rebuttal",
      "line": "소아과 8건하고 세탁 12건만 다시 보세요. 디테일을 맞춰 보면 제가 그렇게까지 단순하게 말한 건 아닙니다.",
      "behaviorHint": "시간표나 로그처럼 구체 디테일을 손가락으로 짚듯 말한다.",
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
          "frayed"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:b:d-3:unlock:s3:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 3,
      "priority": 23,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-3:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "spouse07:beat_v2:b:d-5:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "rebuttal",
      "line": "제 말 막아도 야간 도우미 종료하고 야근 겹침는 그대로 남습니다. 디테일부터 틀린 쪽이 먼저 있잖아요.",
      "behaviorHint": "잘린 말 대신 숫자와 순서를 먼저 밀어 넣는다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:b:d-5:context:3"
        ],
        "forbidAtomIds": []
      },
      "weight": 3,
      "priority": 23,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-5:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "spouse07:beat_v2:a:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "결국 선택 편집이었죠. 제 불안을 자료로 막으려다 맥락을 잘랐습니다. 그래서 이건 규정이나 숫자보다 더 깊게 남았습니다.",
      "behaviorHint": "파일을 내려놓고 시선을 내린다.",
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
          "frayed",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:a:d-2:fear:4"
        ],
        "forbidAtomIds": [
          "spouse07:a:d-2:denial:0",
          "spouse07:a:d-2:context:1"
        ]
      },
      "weight": 3,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:core:rapport:emotion",
      "coverageKey": "a:d-2:core:late:rapport:emotion",
      "variantTarget": 2,
      "requiresFlags": [
        "d-2:motive:motive_opened"
      ],
      "setFlags": [
        "d-2:core:emotion_opened"
      ],
      "tags": [
        "late",
        "free"
      ]
    },
    {
      "id": "spouse07:beat_v2:a:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "escalate",
      "line": "원본에는 아침 루틴도 다수 있는데, 내보내기 파일에는 밤·주말만 남아 있습니다. 맥락을 복원하려는 자료가 왜 먼저 맥락을 잘랐습니까?",
      "behaviorHint": "오해가 굳어질수록 말속 확신과 조급함이 함께 올라온다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ],
        "misconceptionStates": [
          "M0",
          "M1"
        ]
      },
      "beliefMode": "knows",
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:a:d-3:evidence:2"
        ],
        "forbidAtomIds": []
      },
      "weight": 3,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "misbelief_escalation",
        "red_herring"
      ]
    },
    {
      "id": "spouse07:beat_v2:a:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "escalate",
      "line": "제 말 잘라도, 원본에는 아침 루틴도 다수 있는데, 내보내기 파일에는 밤·주말만 남아 있습니다. 맥락을 복원하려는 자료가 왜 먼저 맥락을 잘랐습니까?",
      "behaviorHint": "끊긴 반발이 다시 튀어나오며 확신을 세게 붙든다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ],
        "interjectionStates": [
          "block_last_turn"
        ],
        "misconceptionStates": [
          "M2",
          "M3"
        ]
      },
      "beliefMode": "knows",
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:a:d-3:evidence:2"
        ],
        "forbidAtomIds": []
      },
      "weight": 3,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "misbelief_escalation",
        "red_herring"
      ]
    },
    {
      "id": "spouse07:beat_v2:a:d-4:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "emotional",
      "line": "반박이라는 이유로 버틴 거지, 결국 저도 아이와 가족 앞에서 점수판을 꺼낸 겁니다. 겉에 드러난 말보다 이유가 더 컸습니다.",
      "behaviorHint": "어깨가 내려앉고 말끝이 흐려진다.",
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
          "agitated",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "frayed",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:a:d-4:shame:4"
        ],
        "forbidAtomIds": [
          "spouse07:a:d-4:denial:0",
          "spouse07:a:d-4:context:1"
        ]
      },
      "weight": 3,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:core:motive:motive",
      "coverageKey": "a:d-4:core:late:motive:motive",
      "variantTarget": 2,
      "requiresFlags": [
        "d-4:motive:motive_opened"
      ],
      "setFlags": [
        "d-4:core:motive_opened"
      ],
      "tags": [
        "late",
        "free"
      ]
    },
    {
      "id": "spouse07:beat_v2:a:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "emotional",
      "line": "맞습니다. 최근 붕괴는 구조 문제였고, 저는 그걸 다혜 씨 책임으로 몰아 더 키웠습니다. 그래서 이건 규정이나 숫자보다 더 깊게 남았습니다.",
      "behaviorHint": "한숨 뒤에 차분히 시인한다.",
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
          "agitated",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "frayed",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:a:d-5:emotion:4"
        ],
        "forbidAtomIds": [
          "spouse07:a:d-5:responsibility:0",
          "spouse07:a:d-5:context:1"
        ]
      },
      "weight": 3,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:rapport:emotion",
      "coverageKey": "a:d-5:core:late:rapport:emotion",
      "variantTarget": 2,
      "requiresFlags": [
        "d-5:motive:responsibility_pressed"
      ],
      "setFlags": [
        "d-5:core:emotion_opened"
      ],
      "tags": [
        "late",
        "free"
      ]
    },
    {
      "id": "spouse07:beat_v2:b:d-1:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "상담과 단톡에서 제가 공을 너무 단수형으로 말했습니다. 같은 자리에서 다시 바로잡아야 했어요. 겉에 드러난 말보다 이유가 더 컸습니다.",
      "behaviorHint": "짧게 숨을 들이마시고 또렷하게 시인한다.",
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
          "frayed",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:b:d-1:shame:4"
        ],
        "forbidAtomIds": [
          "spouse07:b:d-1:denial:0",
          "spouse07:b:d-1:context:1"
        ]
      },
      "weight": 3,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:motive:motive",
      "coverageKey": "b:d-1:core:late:motive:motive",
      "variantTarget": 2,
      "requiresFlags": [
        "d-1:motive:responsibility_pressed"
      ],
      "setFlags": [
        "d-1:core:motive_opened"
      ],
      "tags": [
        "late",
        "free"
      ]
    },
    {
      "id": "spouse07:beat_v2:b:d-3:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "emotional",
      "line": "병원과 세탁 기록까지 보니 더 분명해요. 제가 보이는 아침 전쟁을 전체로 말했습니다. 그래서 이건 규정이나 숫자보다 더 깊게 남았습니다.",
      "behaviorHint": "눈시울이 젖지만 끝까지 문장을 마친다.",
      "applicableStates": [
        "S4",
        "S5"
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
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "frayed",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:b:d-3:relationship:4"
        ],
        "forbidAtomIds": [
          "spouse07:b:d-3:denial:0",
          "spouse07:b:d-3:context:1"
        ]
      },
      "weight": 3,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:rapport:emotion",
      "coverageKey": "b:d-3:core:late:rapport:emotion",
      "variantTarget": 2,
      "requiresFlags": [
        "d-3:motive:motive_opened"
      ],
      "setFlags": [
        "d-3:core:emotion_opened"
      ],
      "tags": [
        "late",
        "free"
      ]
    },
    {
      "id": "spouse07:beat_v2:b:d-3:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "escalate",
      "line": "등원 비중이 높았다는 사실과, 태준의 긴급연락 대응·하원 변경 기록이 반복된다는 사실은 동시에 성립합니다. 그런데 왜 공개 표현에서는 뒤쪽이 사라졌습니까?",
      "behaviorHint": "오해가 굳어질수록 말속 확신과 조급함이 함께 올라온다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ],
        "misconceptionStates": [
          "M1",
          "M2"
        ]
      },
      "beliefMode": "misbelief",
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:b:d-3:unlock:s3:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 3,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "misbelief_escalation",
        "red_herring"
      ]
    },
    {
      "id": "spouse07:beat_v2:b:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "escalate",
      "line": "제 말 잘라도, 등원 비중이 높았다는 사실과, 태준의 긴급연락 대응·하원 변경 기록이 반복된다는 사실은 동시에 성립합니다. 그런데 왜 공개 표현에서는 뒤쪽이 사라졌습니까?",
      "behaviorHint": "끊긴 반발이 다시 튀어나오며 확신을 세게 붙든다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ],
        "interjectionStates": [
          "block_last_turn"
        ],
        "misconceptionStates": [
          "M3",
          "M4"
        ]
      },
      "beliefMode": "misbelief",
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:b:d-3:unlock:s3:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 3,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "misbelief_escalation",
        "red_herring"
      ]
    },
    {
      "id": "spouse07:beat_v2:b:d-5:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "emotional",
      "line": "결국 최근 붕괴는 구조 문제였고, 제가 그 압박을 사람 문제처럼 말해 갈등을 키운 겁니다. 겉에 드러난 말보다 이유가 더 컸습니다.",
      "behaviorHint": "천천히 고개를 끄덕이며 수긍한다.",
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
          "frayed",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:b:d-5:emotion:4"
        ],
        "forbidAtomIds": [
          "spouse07:b:d-5:responsibility:0",
          "spouse07:b:d-5:context:1"
        ]
      },
      "weight": 3,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:motive:motive",
      "coverageKey": "b:d-5:core:late:motive:motive",
      "variantTarget": 2,
      "requiresFlags": [
        "d-5:motive:responsibility_pressed"
      ],
      "setFlags": [
        "d-5:core:motive_opened"
      ],
      "tags": [
        "late",
        "free"
      ]
    },
    {
      "id": "spouse07:beat_v2:b:d-1:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "irritate",
      "line": "그 얘기 또 해야 합니까. 보이는 아침 비중과 평일 전체 표현을 혼동했다는 부분을 인정한다.",
      "behaviorHint": "같은 질문이 반복되자 짜증이 먼저 새어 나온다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "timeline",
      "actionFamily": "fatigue",
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
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:b:d-1:admission:2"
        ],
        "forbidAtomIds": [
          "spouse07:b:d-1:shame:4",
          "spouse07:b:d-1:unlock:s4:0"
        ]
      },
      "weight": 4,
      "priority": 19,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:fatigue:timeline",
      "coverageKey": "b:d-1:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:timeline_fatigue_seen"
      ],
      "tags": [
        "fatigue",
        "repeat_2"
      ]
    },
    {
      "id": "spouse07:beat_v2:b:d-3:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "irritate",
      "line": "그 얘기 또 해야 합니까. 아침의 강도를 전체 돌봄 평가로 확장한 건 과했다고 인정한다.",
      "behaviorHint": "같은 질문이 반복되자 짜증이 먼저 새어 나온다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "shared_misconception",
      "responseIntent": "fatigue_response",
      "angleTag": "timeline",
      "actionFamily": "fatigue",
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
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:b:d-3:admission:2"
        ],
        "forbidAtomIds": [
          "spouse07:b:d-3:relationship:4",
          "spouse07:b:d-3:unlock:s4:0"
        ]
      },
      "weight": 4,
      "priority": 19,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:fatigue:timeline",
      "coverageKey": "b:d-3:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-3:motive:timeline_fatigue_seen"
      ],
      "tags": [
        "fatigue",
        "repeat_2"
      ]
    },
    {
      "id": "spouse07:beat_v2:b:d-1:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "block",
      "line": "세 번째쯤 되면 저도 같은 말을 더 곱게 못 합니다. 보이는 아침 비중과 평일 전체 표현을 혼동했다는 부분을 인정한다.",
      "behaviorHint": "질문을 중간에 끊고 더는 같은 말을 반복하기 싫다는 태도를 보인다.",
      "applicableStates": [
        "S2",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:b:d-1:admission:2"
        ],
        "forbidAtomIds": [
          "spouse07:b:d-1:shame:4",
          "spouse07:b:d-1:unlock:s4:0"
        ]
      },
      "weight": 4,
      "priority": 18,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:fatigue:responsibility",
      "coverageKey": "b:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:responsibility_fatigue_seen"
      ],
      "tags": [
        "fatigue",
        "repeat_3"
      ]
    },
    {
      "id": "spouse07:beat_v2:b:d-3:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "block",
      "line": "세 번째쯤 되면 저도 같은 말을 더 곱게 못 합니다. 아침의 강도를 전체 돌봄 평가로 확장한 건 과했다고 인정한다.",
      "behaviorHint": "질문을 중간에 끊고 더는 같은 말을 반복하기 싫다는 태도를 보인다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "shared_misconception",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
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
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:b:d-3:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse07:b:d-3:relationship:4",
          "spouse07:b:d-3:unlock:s4:0"
        ]
      },
      "weight": 4,
      "priority": 18,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:fatigue:responsibility",
      "coverageKey": "b:d-3:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-3:motive:responsibility_fatigue_seen"
      ],
      "tags": [
        "fatigue",
        "repeat_3"
      ]
    },
    {
      "id": "spouse07:beat_v2:b:d-1:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "retaliate",
      "line": "지금은 설명보다 반발이 먼저 올라옵니다. 인정받고 싶은 마음이 상대 기여 누락을 외면하게 만들었다.",
      "behaviorHint": "피로가 높아져 방어보다 역질문이 먼저 튀어나온다.",
      "applicableStates": [
        "S2",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:b:d-1:shame:4"
        ],
        "forbidAtomIds": [
          "spouse07:b:d-1:denial:0",
          "spouse07:b:d-1:context:1"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:fatigue:responsibility",
      "coverageKey": "b:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:responsibility_fatigue_seen"
      ],
      "tags": [
        "fatigue",
        "high_fatigue"
      ]
    },
    {
      "id": "spouse07:beat_v2:b:d-3:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "retaliate",
      "line": "지금은 설명보다 반발이 먼저 올라옵니다. 관계를 지키고 싶은 마음과 인정 욕구가 동시에 작동해 표현을 왜곡했다.",
      "behaviorHint": "피로가 높아져 방어보다 역질문이 먼저 튀어나온다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "shared_misconception",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
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
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse07:b:d-3:relationship:4"
        ],
        "forbidAtomIds": [
          "spouse07:b:d-3:denial:0",
          "spouse07:b:d-3:context:1"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:fatigue:responsibility",
      "coverageKey": "b:d-3:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-3:motive:responsibility_fatigue_seen"
      ],
      "tags": [
        "fatigue",
        "high_fatigue"
      ]
    }
  ]
} as const;

export default spouse07BeatsV2Full;
