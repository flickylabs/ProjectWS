export const spouse11BeatsV2Full = {
  "caseId": "spouse-11",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 56,
    "byActionFamily": {
      "question": 26,
      "evidence": 6,
      "fatigue": 6,
      "free_question": 6,
      "interjection": 12
    },
    "byIssueRole": {
      "core_truth": 38,
      "red_herring": 18
    },
    "byParty": {
      "a": 29,
      "b": 27
    },
    "byDispute": {
      "d-1": 12,
      "d-2": 14,
      "d-3": 12,
      "d-4": 12,
      "d-5": 6
    },
    "interjectionInfoLevels": {
      "emotional_only": 4,
      "detail_rebuttal": 4,
      "misbelief_escalation": 2,
      "trap_signal": 2
    },
    "coverageMatrix": {
      "question:early:identity": 2,
      "question:mid:responsibility": 4,
      "question:late:emotion": 6,
      "question:early:timeline": 2,
      "red_herring:early:context": 4,
      "red_herring:late:emotion": 4,
      "question:early:context": 2,
      "question:mid:motive": 2,
      "evidence:early:timeline": 2,
      "evidence:early:identity": 1,
      "evidence:mid:context": 3,
      "fatigue:mid:timeline": 2,
      "fatigue:mid:responsibility": 4,
      "free_question:late:identity": 1,
      "free_question:late:timeline": 1,
      "free_question:late:context": 1,
      "free_question:late:motive": 1,
      "free_question:late:legality": 1,
      "free_question:late:emotion": 1,
      "interjection:surface:mid:emotional_only:allow": 2,
      "interjection:surface:mid:emotional_only:block": 2,
      "interjection:surface:mid:detail_rebuttal:allow": 2,
      "interjection:surface:mid:detail_rebuttal:block": 2,
      "interjection:surface:mid:misbelief_escalation:allow": 1,
      "interjection:surface:mid:misbelief_escalation:block": 1,
      "interjection:surface:mid:trap_signal:allow": 1,
      "interjection:surface:mid:trap_signal:block": 1
    },
    "coverageChecks": {
      "question early timeline": true,
      "question early identity/context": true,
      "question mid responsibility": true,
      "question mid motive": true,
      "question late emotion": true,
      "evidence early|mid context|identity|legality": true,
      "fatigue mid responsibility|timeline": true,
      "free_question late motive|emotion": true,
      "red_herring M0~M2 identity|context": true,
      "red_herring M3~M4 context|emotion": true
    }
  },
  "beats": [
    {
      "id": "spouse11:beat_v2:a:d-1:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "나는 현장 정리 때문에 자료를 본 거지, 남의 권한을 털어 공사를 흔든 사람은 아니야.",
      "behaviorHint": "핵심 사실을 부정하거나 범위를 잘게 쪼개며, 순서와 단어 정의에 매달린다.",
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
          "spouse11:a:d-1:act:0",
          "spouse11:a:d-1:evidence:0"
        ],
        "forbidAtomIds": [
          "spouse11:a:d-1:unlock:s5:0",
          "spouse11:a:d-1:unlock:s4:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:identity",
      "coverageKey": "a:d-1:surface:early:pressure:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:identity_pressed"
      ],
      "requiresFlags": [],
      "tags": [
        "hot",
        "core_truth"
      ]
    },
    {
      "id": "spouse11:beat_v2:a:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "로그인한 건 인정해. 그런데 그때 나는 이미 꼬인 현장을 기록으로 붙잡으려 했어.",
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
          "spouse11:a:d-1:unlock:s2:0",
          "spouse11:a:d-1:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse11:a:d-1:unlock:s5:0"
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
        "d-1:surface:identity_pressed"
      ],
      "tags": [
        "mid",
        "core_truth"
      ]
    },
    {
      "id": "spouse11:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "완공 일정이 무너지고 예산이 새는 걸 보면서, 내가 통제권을 잃는다는 공포가 있었어.",
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
          "spouse11:a:d-1:unlock:s4:0",
          "spouse11:a:d-1:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse11:a:d-1:act:0"
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
      "id": "spouse11:beat_v2:b:d-1:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "유림이 내 계정으로 들어간 건 선 넘은 행동이야.",
      "behaviorHint": "핵심 사실을 부정하거나 범위를 잘게 쪼개며, 순서와 단어 정의에 매달린다.",
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
          "spouse11:b:d-1:act:0",
          "spouse11:b:d-1:relationship:0"
        ],
        "forbidAtomIds": [
          "spouse11:b:d-1:admission:2",
          "spouse11:b:d-1:shame:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:identity",
      "coverageKey": "b:d-1:surface:early:pressure:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:identity_pressed"
      ],
      "requiresFlags": [],
      "tags": [
        "hot",
        "core_truth"
      ]
    },
    {
      "id": "spouse11:beat_v2:b:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "유림의 무단 접속은 사실이지만, 계정과 도어락 권한을 느슨하게 공유한 채 둔 책임은 나한테도 있어.",
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
          "spouse11:b:d-1:admission:0",
          "spouse11:b:d-1:counter:1"
        ],
        "forbidAtomIds": [
          "spouse11:b:d-1:admission:2"
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
        "d-1:surface:identity_pressed"
      ],
      "tags": [
        "mid",
        "core_truth"
      ]
    },
    {
      "id": "spouse11:beat_v2:b:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "집도 못 지키고 권한도 못 지켰다는 말을 듣는 게 너무 싫었어.",
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
          "spouse11:b:d-1:shame:0",
          "spouse11:b:d-1:admission:2"
        ],
        "forbidAtomIds": [
          "spouse11:b:d-1:act:0"
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
      "id": "spouse11:beat_v2:a:d-2:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "제습이랑 건조를 늦춘 건 승호야. 그건 내가 자료를 본 문제랑 섞을 일이 아니야.",
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
          "spouse11:a:d-2:act:0",
          "spouse11:a:d-2:timeline:0"
        ],
        "forbidAtomIds": [
          "spouse11:a:d-2:admission:2",
          "spouse11:a:d-2:fear:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:pressure:timeline",
      "coverageKey": "a:d-2:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:timeline_pressed"
      ],
      "requiresFlags": [],
      "tags": [
        "hot",
        "core_truth"
      ]
    },
    {
      "id": "spouse11:beat_v2:a:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "건조가 늦어진 걸 알고도 바로 막지 못한 건 있어. 그래도 전원을 끄고 권한을 묶은 결정은 승호 쪽이었어.",
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
          "spouse11:a:d-2:evidence:0",
          "spouse11:a:d-2:motive:0"
        ],
        "forbidAtomIds": [
          "spouse11:a:d-2:admission:2"
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
        "d-2:surface:timeline_pressed"
      ],
      "tags": [
        "mid",
        "core_truth"
      ]
    },
    {
      "id": "spouse11:beat_v2:a:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "입주가 밀리고 돈이 새는 상황에서 누가 먼저 멈추자고 말하느냐가 너무 무서웠어.",
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
          "spouse11:a:d-2:fear:0",
          "spouse11:a:d-2:admission:2"
        ],
        "forbidAtomIds": [
          "spouse11:a:d-2:act:0"
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
      "id": "spouse11:beat_v2:b:d-2:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "그때는 현장이 급했어. 일부러 피해를 키우려고 건조를 늦춘 건 아니야.",
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
          "spouse11:b:d-2:act:0",
          "spouse11:b:d-2:threshold:0"
        ],
        "forbidAtomIds": [
          "spouse11:b:d-2:unlock:s5:0",
          "spouse11:b:d-2:unlock:s4:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:timeline",
      "coverageKey": "b:d-2:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:timeline_pressed"
      ],
      "requiresFlags": [],
      "tags": [
        "hot",
        "core_truth"
      ]
    },
    {
      "id": "spouse11:beat_v2:b:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "방문을 다음 날로 미루고 권한을 내 쪽으로 묶은 건 맞아.",
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
          "spouse11:b:d-2:unlock:s2:0",
          "spouse11:b:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse11:b:d-2:unlock:s5:0"
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
        "d-2:surface:timeline_pressed"
      ],
      "tags": [
        "mid",
        "core_truth"
      ]
    },
    {
      "id": "spouse11:beat_v2:b:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "가장 노릇도 못 하고 집까지 망친 사람처럼 보일까 봐 무서웠어.",
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
          "spouse11:b:d-2:unlock:s4:0",
          "spouse11:b:d-2:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse11:b:d-2:act:0"
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
      "id": "spouse11:beat_v2:a:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "misbelief",
      "line": "큰 손상은 기본적으로 시공사 하자에서 시작된 거야.",
      "behaviorHint": "부분 단서와 상징을 근거로 오해를 굳히며, 의심의 초점을 더 날카롭게 만든다.",
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
          "spouse11:a:d-3:rule:0",
          "spouse11:a:d-3:evidence:0"
        ],
        "forbidAtomIds": [
          "spouse11:a:d-3:unlock:s5:0",
          "spouse11:a:d-3:unlock:s4:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:context",
      "coverageKey": "a:d-3:surface:early:trap:context",
      "variantTarget": 6,
      "setFlags": [
        "d-3:surface:context_misread"
      ],
      "requiresFlags": [],
      "tags": [
        "hot",
        "red_herring"
      ]
    },
    {
      "id": "spouse11:beat_v2:a:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "doubt",
      "line": "기획한 집이 망가졌다는 말을 듣는 게 너무 수치스러웠어.",
      "behaviorHint": "잘못된 해석이 풀리며 감정과 후회를 섞어 말하기 시작한다.",
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
          "spouse11:a:d-3:unlock:s4:0",
          "spouse11:a:d-3:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse11:a:d-3:rule:0"
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
        "d-3:surface:context_misread"
      ],
      "tags": [
        "late",
        "red_herring"
      ]
    },
    {
      "id": "spouse11:beat_v2:b:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "misbelief",
      "line": "큰 손상은 시공사 하자에서 시작된 거지, 우리가 키운 건 아니야.",
      "behaviorHint": "부분 단서와 상징을 근거로 오해를 굳히며, 의심의 초점을 더 날카롭게 만든다.",
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
          "spouse11:b:d-3:rule:0",
          "spouse11:b:d-3:context:0"
        ],
        "forbidAtomIds": [
          "spouse11:b:d-3:unlock:s5:0",
          "spouse11:b:d-3:unlock:s4:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:context",
      "coverageKey": "b:d-3:surface:early:trap:context",
      "variantTarget": 6,
      "setFlags": [
        "d-3:surface:context_misread"
      ],
      "requiresFlags": [],
      "tags": [
        "hot",
        "red_herring"
      ]
    },
    {
      "id": "spouse11:beat_v2:b:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "doubt",
      "line": "내가 먼저 막고 설명은 나중에 붙이는 버릇이 이번엔 집까지 망치는 쪽으로 갔어.",
      "behaviorHint": "잘못된 해석이 풀리며 감정과 후회를 섞어 말하기 시작한다.",
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
          "spouse11:b:d-3:unlock:s4:0",
          "spouse11:b:d-3:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse11:b:d-3:rule:0"
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
        "d-3:surface:context_misread"
      ],
      "tags": [
        "late",
        "red_herring"
      ]
    },
    {
      "id": "spouse11:beat_v2:a:d-4:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "보험금 얘기는 막막하니까 한숨처럼 꺼낸 거지, 공모라고 부를 일은 아니야.",
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
          "spouse11:a:d-4:motive:0",
          "spouse11:a:d-4:threshold:0"
        ],
        "forbidAtomIds": [
          "spouse11:a:d-4:unlock:s5:0",
          "spouse11:a:d-4:unlock:s4:0"
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
      "id": "spouse11:beat_v2:a:d-4:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "메신저에서 계산을 주고받은 건 인정해. 그때는 예산 구멍을 어떻게든 메워야 한다는 생각뿐이었어.",
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
          "spouse11:a:d-4:unlock:s2:0",
          "spouse11:a:d-4:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse11:a:d-4:unlock:s5:0"
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
      "id": "spouse11:beat_v2:a:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "emotional",
      "line": "입주가 밀리고 카드대금이 쌓인 상황에서 내가 기획한 공간까지 잃는다고 생각하니 너무 다급했어.",
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
          "spouse11:a:d-4:unlock:s4:0",
          "spouse11:a:d-4:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse11:a:d-4:motive:0"
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
      "id": "spouse11:beat_v2:b:d-4:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "보험 얘긴 막힌 돈줄 때문에 한 소리지, 둘이 짜고 판을 만든 건 아니야.",
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
          "spouse11:b:d-4:motive:0",
          "spouse11:b:d-4:threshold:0"
        ],
        "forbidAtomIds": [
          "spouse11:b:d-4:unlock:s5:0",
          "spouse11:b:d-4:unlock:s4:0"
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
      "id": "spouse11:beat_v2:b:d-4:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "예산 메모랑 메신저 대화가 남아 있는 건 인정해.",
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
          "spouse11:b:d-4:unlock:s2:0",
          "spouse11:b:d-4:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse11:b:d-4:unlock:s5:0"
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
      "id": "spouse11:beat_v2:b:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "emotional",
      "line": "돈 때문에 집을 지키려다 사기 가까운 계산까지 했다는 걸 인정하기가 너무 수치스러웠어.",
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
          "spouse11:b:d-4:unlock:s4:0",
          "spouse11:b:d-4:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse11:b:d-4:motive:0"
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
      "id": "spouse11:beat_v2:a:d-5:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "misbelief",
      "line": "보험금이 멈춘 건 홍대성이 우리를 찍어서 그런 거라고 봤어.",
      "behaviorHint": "부분 단서와 상징을 근거로 오해를 굳히며, 의심의 초점을 더 날카롭게 만든다.",
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
          "spouse11:a:d-5:counter:0",
          "spouse11:a:d-5:uncertainty:0"
        ],
        "forbidAtomIds": [
          "spouse11:a:d-5:unlock:s5:0",
          "spouse11:a:d-5:unlock:s4:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:trap:context",
      "coverageKey": "a:d-5:surface:early:trap:context",
      "variantTarget": 6,
      "setFlags": [
        "d-5:surface:context_misread"
      ],
      "requiresFlags": [],
      "tags": [
        "hot",
        "red_herring"
      ]
    },
    {
      "id": "spouse11:beat_v2:a:d-5:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "doubt",
      "line": "내가 먼저 자료를 모으고 서사를 만든 탓에, 보험사 판단도 결국 우리가 만든 흐름으로 돌아올까 두려웠어.",
      "behaviorHint": "잘못된 해석이 풀리며 감정과 후회를 섞어 말하기 시작한다.",
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
          "spouse11:a:d-5:unlock:s4:0",
          "spouse11:a:d-5:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse11:a:d-5:counter:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:trap:emotion",
      "coverageKey": "a:d-5:core:late:trap:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-5:surface:trap_disarmed",
        "d-5:core:emotion_clarified"
      ],
      "requiresFlags": [
        "d-5:surface:context_misread"
      ],
      "tags": [
        "late",
        "red_herring"
      ]
    },
    {
      "id": "spouse11:beat_v2:b:d-5:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "misbelief",
      "line": "보험금이 막힌 건 홍대성이 보복성으로 신고해서 그런 거라고 봤어.",
      "behaviorHint": "부분 단서와 상징을 근거로 오해를 굳히며, 의심의 초점을 더 날카롭게 만든다.",
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
          "spouse11:b:d-5:counter:0",
          "spouse11:b:d-5:uncertainty:0"
        ],
        "forbidAtomIds": [
          "spouse11:b:d-5:unlock:s5:0",
          "spouse11:b:d-5:unlock:s4:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:trap:context",
      "coverageKey": "b:d-5:surface:early:trap:context",
      "variantTarget": 6,
      "setFlags": [
        "d-5:surface:context_misread"
      ],
      "requiresFlags": [],
      "tags": [
        "hot",
        "red_herring"
      ]
    },
    {
      "id": "spouse11:beat_v2:b:d-5:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "doubt",
      "line": "내 로그가 보험사 눈에 먼저 걸렸다는 걸 인정하는 순간 내가 집을 더 망친 사람이 되는 것 같았어.",
      "behaviorHint": "잘못된 해석이 풀리며 감정과 후회를 섞어 말하기 시작한다.",
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
          "spouse11:b:d-5:unlock:s4:0",
          "spouse11:b:d-5:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse11:b:d-5:counter:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:trap:emotion",
      "coverageKey": "b:d-5:core:late:trap:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-5:surface:trap_disarmed",
        "d-5:core:emotion_clarified"
      ],
      "requiresFlags": [
        "d-5:surface:context_misread"
      ],
      "tags": [
        "late",
        "red_herring"
      ]
    },
    {
      "id": "spouse11:beat_v2:a:d-1:surface:evidence:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "establish",
      "line": "로그가 이렇게 남아 있으면 더는 확인용이었다고만 못 하겠네요. 로그인 자체는 인정할게요.",
      "behaviorHint": "감사로그를 보며 손끝이 멈춘다.",
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
          "spouse11:a:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse11:a:d-1:unlock:s5:0",
          "spouse11:a:d-1:unlock:s4:0"
        ]
      },
      "weight": 6,
      "priority": 35,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:evidence:timeline",
      "coverageKey": "a:d-1:surface:early:evidence:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-1:surface:timeline_evidence_shown"
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
      "id": "spouse11:beat_v2:b:d-2:surface:evidence:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "establish",
      "line": "로그가 뜨면 인정할 수밖에 없지. 방문을 미루고 권한을 묶은 건 내가 했어.",
      "behaviorHint": "스마트플러그 시간대를 손끝으로 따라간다.",
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
          "spouse11:b:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse11:b:d-2:unlock:s5:0",
          "spouse11:b:d-2:unlock:s4:0"
        ]
      },
      "weight": 6,
      "priority": 35,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:evidence:timeline",
      "coverageKey": "b:d-2:surface:early:evidence:timeline",
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
      "id": "spouse11:beat_v2:a:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "reframe",
      "line": "원본이 아니라는 건 알아요. 그래도 그 장면이 시공사 쪽 이상을 제일 강하게 보여 준다고 생각했어요.",
      "behaviorHint": "캡처 파일을 닫지 못한 채 시선을 피한다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "red_herring",
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
          "spouse11:a:d-3:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse11:a:d-3:unlock:s5:0",
          "spouse11:a:d-3:unlock:s4:0"
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
        "red_herring"
      ],
      "sourceEvidenceIds": [
        "e-3"
      ]
    },
    {
      "id": "spouse11:beat_v2:a:d-4:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "impeach",
      "line": "대화가 복원되면 그냥 가능성 얘기였다고만 못 하겠네요. 계산을 주고받은 건 사실이에요.",
      "behaviorHint": "복원된 메신저를 보며 입술을 다문다.",
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
          "spouse11:a:d-4:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse11:a:d-4:motive:0"
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
        "e-4"
      ]
    },
    {
      "id": "spouse11:beat_v2:a:d-4:motive:evidence:context:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "finish",
      "line": "네, 그건 공모였습니다. 손상 확대를 사실상 멈추지 않고 보험금 사용처까지 함께 짰어요.",
      "behaviorHint": "두 손을 모은 채 한 문장씩 또렷하게 말한다.",
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
          "spouse11:a:d-4:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse11:a:d-4:motive:0"
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
        "e-5"
      ]
    },
    {
      "id": "spouse11:beat_v2:b:d-5:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "finish",
      "line": "잠깐 미룬 수준이라기엔 제습기 전원이 6시간 이상 꺼져 있었고, 보험사도 그 로그를 핵심 사유로 적시합니다.",
      "behaviorHint": "증거에 밀리자 방어 논리를 짧게 다시 세운다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "red_herring",
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
          "spouse11:b:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse11:b:d-5:counter:0"
        ]
      },
      "weight": 6,
      "priority": 35,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:evidence:context",
      "coverageKey": "b:d-5:motive:mid:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-5:motive:context_evidence_shown"
      ],
      "tags": [
        "cold",
        "evidence",
        "red_herring"
      ],
      "sourceEvidenceIds": [
        "e-6"
      ]
    },
    {
      "id": "spouse11:beat_v2:a:d-1:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "irritate",
      "line": "같은 대목은 이미 답했습니다. 로그인한 건 인정해. 그런데 그때 나는 이미 꼬인 현장을 기록으로 붙잡으려 했어.",
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
          "spouse11:a:d-1:unlock:s2:0",
          "spouse11:a:d-1:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse11:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:fatigue:timeline",
      "coverageKey": "a:d-1:surface:mid:fatigue:timeline",
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
      "id": "spouse11:beat_v2:a:d-1:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "stonewall",
      "line": "더는 그 질문 방식으로는 못 갑니다. 공사중지 요청이 나간 건 내 손에서 시작됐을 수 있어도, 이미 현장은 서로 숨기는 상태였어.",
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
          "spouse11:a:d-1:unlock:s2:0",
          "spouse11:a:d-1:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse11:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:fatigue:responsibility",
      "coverageKey": "a:d-1:surface:mid:fatigue:responsibility",
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
      "id": "spouse11:beat_v2:a:d-1:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "retaliate",
      "line": "계속 그 문제만 떼어내면 판이 틀어집니다. 공사중지 요청이 나간 건 내 손에서 시작됐을 수 있어도, 이미 현장은 서로 숨기는 상태였어.",
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
          "spouse11:a:d-1:unlock:s2:0",
          "spouse11:a:d-1:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse11:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:responsibility",
      "coverageKey": "a:d-1:motive:mid:fatigue:responsibility",
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
      "id": "spouse11:beat_v2:b:d-2:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "irritate",
      "line": "같은 대목은 이미 답했습니다. 방문을 다음 날로 미루고 권한을 내 쪽으로 묶은 건 맞아.",
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
          "spouse11:b:d-2:unlock:s2:0",
          "spouse11:b:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse11:b:d-2:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:fatigue:timeline",
      "coverageKey": "b:d-2:surface:mid:fatigue:timeline",
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
      "id": "spouse11:beat_v2:b:d-2:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "stonewall",
      "line": "더는 그 질문 방식으로는 못 갑니다. 사실은 손상 범위가 조금 더 보이면 보험 협상도 달라질 수 있다는 생각을 완전히 버리진 못했어.",
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
          "spouse11:b:d-2:unlock:s2:0",
          "spouse11:b:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse11:b:d-2:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:fatigue:responsibility",
      "coverageKey": "b:d-2:surface:mid:fatigue:responsibility",
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
      "id": "spouse11:beat_v2:b:d-2:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "retaliate",
      "line": "계속 그 문제만 떼어내면 판이 틀어집니다. 사실은 손상 범위가 조금 더 보이면 보험 협상도 달라질 수 있다는 생각을 완전히 버리진 못했어.",
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
          "spouse11:b:d-2:unlock:s2:0",
          "spouse11:b:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse11:b:d-2:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:fatigue:responsibility",
      "coverageKey": "b:d-2:motive:mid:fatigue:responsibility",
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
      "id": "spouse11:beat_v2:a:d-1:core:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "answer",
      "line": "나는 승호 계정과 도어락 관리자 권한을 무단으로 써서 공사중지 요청과 CCTV 반출을 이어서 처리했어.",
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
          "spouse11:a:d-1:unlock:s2:0",
          "spouse11:b:d-1:admission:0"
        ],
        "forbidAtomIds": [
          "spouse11:a:d-1:act:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:pressure:identity",
      "coverageKey": "a:d-1:core:late:pressure:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-1:core:identity_free_opened"
      ],
      "requiresFlags": [],
      "tags": [
        "late",
        "free_question",
        "core_truth"
      ],
      "hookId": "fq:d-1:admin_access_scope"
    },
    {
      "id": "spouse11:beat_v2:b:d-2:core:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "answer",
      "line": "나는 제습기 스마트플러그를 꺼 두고 긴급건조 방문을 다음 날로 미뤘고, 도어락과 현장 알림 권한도 내 쪽으로 다시 묶었어.",
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
          "spouse11:a:d-2:evidence:0",
          "spouse11:b:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse11:b:d-2:act:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:core:pressure:timeline",
      "coverageKey": "b:d-2:core:late:pressure:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-2:core:timeline_free_opened"
      ],
      "requiresFlags": [],
      "tags": [
        "late",
        "free_question",
        "core_truth"
      ],
      "hookId": "fq:d-2:drying_gap"
    },
    {
      "id": "spouse11:beat_v2:a:d-3:core:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "answer",
      "line": "초기 누수는 시공사 하자와 맞닿아 있었지만, 천장과 마루 손상이 크게 번진 건 우리 지연 대응과 선택적 자료 제시 때문이야.",
      "behaviorHint": "정면 대답을 피하지 않으려 하지만, 이유나 감정의 의미를 먼저 고른 뒤 천천히 꺼낸다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "core",
      "issueRole": "red_herring",
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
          "spouse11:a:d-3:unlock:s2:0",
          "spouse11:b:d-3:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse11:a:d-3:rule:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:pressure:context",
      "coverageKey": "a:d-3:core:late:pressure:context",
      "variantTarget": 3,
      "setFlags": [
        "d-3:core:context_free_opened"
      ],
      "requiresFlags": [],
      "tags": [
        "late",
        "free_question",
        "red_herring"
      ],
      "hookId": "fq:d-3:clip_context"
    },
    {
      "id": "spouse11:beat_v2:b:d-4:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "reflect",
      "line": "우리는 보험금으로 천장, 마루, 붙박이장 비용까지 메울 수 있는지 함께 계산했고, 손상 확대를 멈추지 않는 쪽으로 사실상 뜻을 맞췄어.",
      "behaviorHint": "정면 대답을 피하지 않으려 하지만, 이유나 감정의 의미를 먼저 고른 뒤 천천히 꺼낸다.",
      "applicableStates": [
        "S3",
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
          "spouse11:a:d-4:unlock:s2:0",
          "spouse11:b:d-4:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse11:b:d-4:motive:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:core:motive:motive",
      "coverageKey": "b:d-4:core:late:motive:motive",
      "variantTarget": 3,
      "setFlags": [
        "d-4:core:motive_free_opened"
      ],
      "requiresFlags": [],
      "tags": [
        "late",
        "free_question",
        "core_truth"
      ],
      "hookId": "fq:d-4:insurance_scope"
    },
    {
      "id": "spouse11:beat_v2:a:d-5:core:pressure:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "answer",
      "line": "보험금 지급 보류의 직접 원인은 홍대성의 보복 신고가 아니라 제습 지연, 수분센서 이상 곡선, 사진 순서 불일치 같은 손상 확대 정황이었어.",
      "behaviorHint": "정면 대답을 피하지 않으려 하지만, 이유나 감정의 의미를 먼저 고른 뒤 천천히 꺼낸다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "core",
      "issueRole": "red_herring",
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
          "spouse11:a:d-5:unlock:s2:0",
          "spouse11:b:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse11:a:d-5:counter:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:pressure:legality",
      "coverageKey": "a:d-5:core:late:pressure:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-5:core:legality_free_opened"
      ],
      "requiresFlags": [],
      "tags": [
        "late",
        "free_question",
        "red_herring"
      ],
      "hookId": "fq:d-5:hold_reason"
    },
    {
      "id": "spouse11:beat_v2:b:d-4:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "reflect",
      "line": "우리는 보험금으로 천장, 마루, 붙박이장 비용까지 메울 수 있는지 함께 계산했고, 손상 확대를 멈추지 않는 쪽으로 사실상 뜻을 맞췄어.",
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
          "spouse11:a:d-4:unlock:s2:0",
          "spouse11:b:d-4:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse11:b:d-4:motive:0"
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
        "d-4:core:emotion_free_opened"
      ],
      "requiresFlags": [],
      "tags": [
        "late",
        "free_question",
        "core_truth"
      ],
      "hookId": "fq:d-4:budget_pressure"
    },
    {
      "id": "spouse11:beat_v2:a:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "내가 망치려고 한 게 아니에요. 다 무너지는 걸 보고만 있으라는 말이었습니까?",
      "behaviorHint": "대답 순서를 끊고, 감정이나 세부 반박을 옆에서 밀어 넣는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "red_herring",
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
          "spouse11:a:d-3:unlock:s4:0",
          "spouse11:a:d-3:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse11:a:d-3:rule:0"
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
      "id": "spouse11:beat_v2:a:d-4:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "interject",
      "line": "지웠다고 다 사기가 되는 건 아니잖아요. 그때는 진짜 버틸 돈이 없었어요.",
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
          "spouse11:a:d-4:unlock:s4:0",
          "spouse11:a:d-4:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse11:a:d-4:motive:0"
        ]
      },
      "weight": 5,
      "priority": 31,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-4:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 2,
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
      "id": "spouse11:beat_v2:b:d-2:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "집을 살리려고 버틴 건데 왜 내가 일부러 망친 사람처럼만 말합니까?",
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
          "spouse11:b:d-2:unlock:s4:0",
          "spouse11:b:d-2:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse11:b:d-2:act:0"
        ]
      },
      "weight": 5,
      "priority": 31,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-2:surface:mid:interjection:emotional_only:block",
      "variantTarget": 2,
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
      "id": "spouse11:beat_v2:b:d-2:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "그 로그 하나로 다 끝난 것처럼 말하지 마세요. 현장에선 내가 혼자 다 막고 있었어요.",
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
          "spouse11:b:d-2:unlock:s4:0",
          "spouse11:b:d-2:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse11:b:d-2:act:0"
        ]
      },
      "weight": 5,
      "priority": 31,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-2:surface:mid:interjection:emotional_only:block",
      "variantTarget": 2,
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
      "id": "spouse11:beat_v2:a:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "저장만 했다면서 공사중지 요청과 CCTV 내보내기가 같은 세션에서 연속 실행됐습니다.",
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
          "spouse11:a:d-1:unlock:s2:0",
          "spouse11:a:d-1:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse11:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 31,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-1:surface:mid:interjection:detail_rebuttal:allow",
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
      "id": "spouse11:beat_v2:b:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "잠깐 미룬 수준이라기엔 제습기 전원이 6시간 이상 꺼져 있었고, 보험사도 그 로그를 핵심 사유로 적시합니다.",
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
          "spouse11:b:d-2:unlock:s2:0",
          "spouse11:b:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse11:b:d-2:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 31,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-2:surface:mid:interjection:detail_rebuttal:allow",
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
      "id": "spouse11:beat_v2:a:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "잘린 캡처는 타인 과실을 강하게 보이지만, 센서 곡선과 사진 순서는 손상 확대가 부부 쪽 지연과 맞물렸음을 보여 줍니다.",
      "behaviorHint": "대답 순서를 끊고, 감정이나 세부 반박을 옆에서 밀어 넣는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "red_herring",
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
          "spouse11:a:d-3:unlock:s2:0",
          "spouse11:a:d-3:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse11:a:d-3:unlock:s5:0"
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
      "id": "spouse11:beat_v2:b:d-4:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "interject",
      "line": "살 길을 찾았다는 말과 달리, 복원된 대화와 청구 초안은 이미 사용처와 손상 서사를 함께 계산한 흔적을 남깁니다.",
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
          "spouse11:b:d-4:unlock:s2:0",
          "spouse11:b:d-4:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse11:b:d-4:unlock:s5:0"
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
      "id": "spouse11:beat_v2:a:d-3:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "큰 손상은 기본적으로 시공사 하자에서 시작된 거야.",
      "behaviorHint": "대답 순서를 끊고, 감정이나 세부 반박을 옆에서 밀어 넣는다.",
      "applicableStates": [
        "M1",
        "M2"
      ],
      "layer": "surface",
      "issueRole": "red_herring",
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
          "spouse11:a:d-3:unlock:s2:0",
          "spouse11:a:d-3:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse11:a:d-3:unlock:s5:0"
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
      "beliefMode": "weaponizes"
    },
    {
      "id": "spouse11:beat_v2:b:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "큰 손상은 시공사 하자에서 시작된 거지, 우리가 키운 건 아니야.",
      "behaviorHint": "대답 순서를 끊고, 감정이나 세부 반박을 옆에서 밀어 넣는다.",
      "applicableStates": [
        "M1",
        "M2"
      ],
      "layer": "surface",
      "issueRole": "red_herring",
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
          "spouse11:b:d-3:unlock:s2:0",
          "spouse11:b:d-3:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse11:b:d-3:unlock:s5:0"
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
      "beliefMode": "suspects"
    },
    {
      "id": "spouse11:beat_v2:a:d-3:surface:mid:interjection:allow:03",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "앞뒤 11초가 잘린 CCTV만으로는 결론이 나지 않습니다.",
      "behaviorHint": "대답 순서를 끊고, 감정이나 세부 반박을 옆에서 밀어 넣는다.",
      "applicableStates": [
        "M2",
        "M3"
      ],
      "layer": "surface",
      "issueRole": "red_herring",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "interjectionStates": [
          "allow_last_turn"
        ],
        "misconceptionStates": [
          "M2",
          "M3"
        ],
        "trapStates": [
          "trap_hint"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse11:a:d-3:unlock:s2:0",
          "spouse11:a:d-3:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse11:a:d-3:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 31,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:trap_signal:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:interjection_trap_signal_allow"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "trap_signal",
        "red_herring"
      ],
      "beliefMode": "weaponizes"
    },
    {
      "id": "spouse11:beat_v2:b:d-3:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "심야 재출입만 남긴 선택 캡처만으로는 결론이 나지 않습니다.",
      "behaviorHint": "대답 순서를 끊고, 감정이나 세부 반박을 옆에서 밀어 넣는다.",
      "applicableStates": [
        "M2",
        "M3"
      ],
      "layer": "surface",
      "issueRole": "red_herring",
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
        ],
        "trapStates": [
          "trap_exposed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse11:b:d-3:unlock:s2:0",
          "spouse11:b:d-3:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse11:b:d-3:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 31,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:trap_signal:block",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:interjection_trap_signal_block"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "trap_signal",
        "red_herring"
      ],
      "beliefMode": "suspects"
    }
  ]
} as const;

export default spouse11BeatsV2Full;
