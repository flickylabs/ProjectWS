export const partnership06BeatsV2Full = {
  "caseId": "partnership-06",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 64,
    "byActionFamily": {
      "evidence": 10,
      "fatigue": 6,
      "free_question": 2,
      "interjection": 12,
      "question": 34
    },
    "byDispute": {
      "d-1": 25,
      "d-2": 25,
      "d-3": 2,
      "d-4": 10,
      "d-5": 2
    },
    "byIssueRole": {
      "core_truth": 50,
      "shared_misconception": 10,
      "sub_truth": 4
    },
    "byResponseIntent": {
      "evidence_response": 8,
      "fatigue_response": 6,
      "motive_response": 5,
      "pressure_response": 24,
      "rapport_response": 11,
      "trap_confusion_response": 10
    },
    "byStage": {
      "early": 22,
      "late": 10,
      "mid": 32
    },
    "interjectionInfoLevels": {
      "detail_rebuttal": 4,
      "emotional_only": 4,
      "misbelief_escalation": 4
    },
    "requiredMatrixSatisfied": {
      "question early timeline": true,
      "question early identity/context": true,
      "question mid responsibility": true,
      "question mid motive": true,
      "question late emotion": true,
      "evidence early/mid context/identity/legality": true,
      "fatigue mid resp/timeline": true,
      "free_question late motive/emotion": true,
      "misbelief early": true,
      "misbelief late": true
    }
  },
  "beats": [
    {
      "id": "partnership06:beat_v2:a:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "그걸 월권으로만 부르면 현장 사정을 놓칩니다. 저는 우선 납기부터 확인한 겁니다.",
      "behaviorHint": "답이 빠르고 단정적이며 상대 책임을 먼저 잘라 말한다.",
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
          "partnership-06:a:d-1:evidence:3",
          "partnership-06:a:d-1:context:0"
        ],
        "forbidAtomIds": [
          "partnership-06:a:d-1:admission:5",
          "partnership-06:a:d-1:act:2"
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
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership06:beat_v2:a:d-1:surface:pressure:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "먼저 시간순으로 보면, 제가 임의로 확정한 게 아닙니다. 그날은 안 움직이면 오픈이 밀리는 상황이라 선택지만 먼저 잡아둔 겁니다.",
      "behaviorHint": "답이 빠르고 단정적이며 상대 책임을 먼저 잘라 말한다.",
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
          "partnership-06:a:d-1:evidence:3",
          "partnership-06:a:d-1:context:0"
        ],
        "forbidAtomIds": [
          "partnership-06:a:d-1:admission:5",
          "partnership-06:a:d-1:act:2"
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
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership06:beat_v2:a:d-1:surface:pressure:timeline:03",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "먼저 시간순으로 보면, 현장에서 납기 확인을 돌린 건 맞지만, 최종 발주처럼 몰아가면 과합니다.",
      "behaviorHint": "답이 빠르고 단정적이며 상대 책임을 먼저 잘라 말한다.",
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
          "partnership-06:a:d-1:evidence:3",
          "partnership-06:a:d-1:context:0"
        ],
        "forbidAtomIds": [
          "partnership-06:a:d-1:admission:5",
          "partnership-06:a:d-1:act:2"
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
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership06:beat_v2:a:d-1:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "counter",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 제가 임의로 확정한 게 아닙니다. 그날은 안 움직이면 오픈이 밀리는 상황이라 선택지만 먼저 잡아둔 겁니다.",
      "behaviorHint": "답이 빠르고 단정적이며 상대 책임을 먼저 잘라 말한다.",
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
          "partnership-06:a:d-1:context:0",
          "partnership-06:a:d-1:denial:1"
        ],
        "forbidAtomIds": [
          "partnership-06:a:d-1:admission:5",
          "partnership-06:a:d-1:act:2"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:context",
      "coverageKey": "a:d-1:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership06:beat_v2:a:d-1:surface:pressure:context:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 피드백이 그때 왔으면 그렇게까지 안 갔습니다.",
      "behaviorHint": "답이 빠르고 단정적이며 상대 책임을 먼저 잘라 말한다.",
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
          "partnership-06:a:d-1:context:0",
          "partnership-06:a:d-1:denial:1"
        ],
        "forbidAtomIds": [
          "partnership-06:a:d-1:admission:5",
          "partnership-06:a:d-1:act:2"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:context",
      "coverageKey": "a:d-1:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership06:beat_v2:a:d-1:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "counter",
      "line": "누가 무엇을 결정했는지부터 분리해야 합니다. 현장에서 납기 확인을 돌린 건 맞지만, 최종 발주처럼 몰아가면 과합니다.",
      "behaviorHint": "답이 빠르고 단정적이며 상대 책임을 먼저 잘라 말한다.",
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
          "partnership-06:a:d-1:context:0",
          "partnership-06:a:d-1:denial:1"
        ],
        "forbidAtomIds": [
          "partnership-06:a:d-1:admission:5",
          "partnership-06:a:d-1:act:2"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:identity",
      "coverageKey": "a:d-1:surface:early:pressure:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership06:beat_v2:a:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 제가 선을 넘은 부분이 없다고는 안 하겠습니다.",
      "behaviorHint": "방어와 역공이 섞여 한 문장 안에서 책임을 되돌린다.",
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-06:a:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "partnership-06:a:d-1:act:2",
          "partnership-06:a:d-1:admission:5"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:pressure:responsibility",
      "coverageKey": "a:d-1:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-1:motive:rule_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "partnership06:beat_v2:a:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "justify",
      "line": "제가 그렇게 말하거나 움직인 데엔 이유가 있었습니다. 하지만 그건 재오픈을 맞추려던 판단이었지, 브랜드를 무시하려던 건 아니었습니다.",
      "behaviorHint": "방어와 역공이 섞여 한 문장 안에서 책임을 되돌린다.",
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-06:a:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "partnership-06:a:d-1:act:2",
          "partnership-06:a:d-1:admission:5"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:motive:motive",
      "coverageKey": "a:d-1:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-1:motive:motive_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "partnership06:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "제가 멈칫했으면 그 매장은 더 오래 닫혀 있었어요. 그 압박은 현장에 있던 사람만 압니다.",
      "behaviorHint": "감정이 먼저 올라와 목소리가 순간적으로 높아진다.",
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
          "partnership-06:a:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-06:a:d-1:context:0",
          "partnership-06:a:d-1:denial:1"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-1:core:fear_exposed"
      ],
      "tags": [
        "late"
      ]
    },
    {
      "id": "partnership06:beat_v2:a:d-1:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confess",
      "line": "이제는 숨기지 않겠습니다. 맞습니다. 보라 최종 확인 없이 집기와 조명 일부를 대체 발주했습니다.",
      "behaviorHint": "감정이 먼저 올라와 목소리가 순간적으로 높아진다.",
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
          "partnership-06:a:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-06:a:d-1:context:0",
          "partnership-06:a:d-1:denial:1"
        ]
      },
      "weight": 4,
      "priority": 23,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-1:core:fear_exposed"
      ],
      "tags": [
        "late"
      ]
    },
    {
      "id": "partnership06:beat_v2:a:d-1:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "cornered",
      "line": "옵션만 잡아둔 것이라면 왜 통화 직후 발주서와 PM 로그에 대체 모델 코드가 연속 반영돼 있습니까?",
      "behaviorHint": "증거가 나오면 즉각 반박 포인트를 집어 되받아친다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
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
          "partnership-06:a:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "partnership-06:a:d-1:context:0",
          "partnership-06:a:d-1:denial:1"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:evidence:context",
      "coverageKey": "a:d-1:surface:early:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-1:surface:evidence_seen"
      ],
      "tags": [
        "evidence"
      ]
    },
    {
      "id": "partnership06:beat_v2:a:d-1:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "그 자료를 봐도, 대체 모델 얘기를 꺼낸 건 맞습니다.",
      "behaviorHint": "증거가 나오면 즉각 반박 포인트를 집어 되받아친다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "evidence_response",
      "angleTag": "legality",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated"
        ],
        "trustWindowBands": [
          "narrow"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-06:a:d-1:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "partnership-06:a:d-1:denial:1",
          "partnership-06:a:d-1:context:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:evidence:legality",
      "coverageKey": "a:d-1:motive:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:rule_named"
      ],
      "tags": [
        "evidence"
      ]
    },
    {
      "id": "partnership06:beat_v2:a:d-1:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "irritate",
      "line": "같은 집기 대체 이야기를 또 반복해야 합니까. 이미 제가 왜 그렇게 움직였는지는 설명했습니다.",
      "behaviorHint": "말끝이 짧아지고 짜증이 표면으로 드러난다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
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
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-06:a:d-1:act:2",
          "partnership-06:a:d-1:evidence:3"
        ],
        "forbidAtomIds": [
          "partnership-06:a:d-1:admission:5",
          "partnership-06:a:d-1:act:2"
        ]
      },
      "weight": 3,
      "priority": 20,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:timeline",
      "coverageKey": "a:d-1:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:fatigue_warning_2"
      ],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "partnership06:beat_v2:a:d-1:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "block",
      "line": "좋습니다. 그럼 핵심만 말하죠. 책임을 묻고 싶다면 앞뒤 흐름까지 같이 보셔야 합니다.",
      "behaviorHint": "말끝이 짧아지고 짜증이 표면으로 드러난다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
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
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-06:a:d-1:act:2",
          "partnership-06:a:d-1:context:0"
        ],
        "forbidAtomIds": [
          "partnership-06:a:d-1:admission:5",
          "partnership-06:a:d-1:act:2"
        ]
      },
      "weight": 3,
      "priority": 20,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:responsibility",
      "coverageKey": "a:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:fatigue_block_3"
      ],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "partnership06:beat_v2:a:d-1:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "counter_fatigue",
      "line": "계속 저만 몰아가면 남는 건 방어뿐입니다. 왜 그 판단이 나왔는지까지 같이 물어야 공정합니다.",
      "behaviorHint": "말끝이 짧아지고 짜증이 표면으로 드러난다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
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
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-06:a:d-1:act:2",
          "partnership-06:a:d-1:context:0"
        ],
        "forbidAtomIds": [
          "partnership-06:a:d-1:admission:5",
          "partnership-06:a:d-1:act:2"
        ]
      },
      "weight": 3,
      "priority": 20,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:responsibility",
      "coverageKey": "a:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-1:core:fatigue_counter_ready"
      ],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "partnership06:beat_v2:a:d-1:surface:pressure:timeline:04",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "transition",
      "line": "로그가 그렇게 남아 있다면 대체 모델 얘기를 꺼낸 것 자체는 부정하지 않겠습니다.",
      "behaviorHint": "질문을 끊어 세우며 흐름을 자기 쪽으로 돌리려 한다.",
      "applicableStates": [
        "S1",
        "S2"
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
          "partnership-06:a:d-1:evidence:3",
          "partnership-06:a:d-1:context:0"
        ],
        "forbidAtomIds": [
          "partnership-06:a:d-1:admission:5",
          "partnership-06:a:d-1:act:2"
        ]
      },
      "weight": 4,
      "priority": 25,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:timeline",
      "coverageKey": "a:d-1:surface:early:pressure:timeline",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "transition"
      ]
    },
    {
      "id": "partnership06:beat_v2:b:d-1:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 가람이 승인된 디자인을 운영 판단으로 바꾼 겁니다.",
      "behaviorHint": "말은 차갑지만 핵심 감정을 건드리지 않으려 서류와 수치부터 꺼낸다.",
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
          "partnership-06:b:d-1:act:0",
          "partnership-06:b:d-1:evidence:1"
        ],
        "forbidAtomIds": [
          "partnership-06:b:d-1:harm:3",
          "partnership-06:b:d-1:rule:4"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:context",
      "coverageKey": "b:d-1:surface:early:pressure:context",
      "variantTarget": 4,
      "setFlags": [
        "d-1:surface:counter_seen"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership06:beat_v2:b:d-1:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "counter",
      "line": "누가 무엇을 결정했는지부터 분리해야 합니다. 그 변경은 단순 납기 대응이 아니라 브랜드 포인트를 건드린 발주였습니다.",
      "behaviorHint": "말은 차갑지만 핵심 감정을 건드리지 않으려 서류와 수치부터 꺼낸다.",
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
          "partnership-06:b:d-1:evidence:1",
          "partnership-06:b:d-1:motive:2"
        ],
        "forbidAtomIds": [
          "partnership-06:b:d-1:harm:3",
          "partnership-06:b:d-1:rule:4"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:identity",
      "coverageKey": "b:d-1:surface:early:pressure:identity",
      "variantTarget": 4,
      "setFlags": [
        "d-1:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership06:beat_v2:b:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "justify",
      "line": "제가 그렇게 말하거나 움직인 데엔 이유가 있었습니다. 다만 저도 그 뒤 설계 지시를 더 밀어붙였습니다.",
      "behaviorHint": "정당화 논리를 또박또박 정리하지만 끝부분에서 미세하게 속도가 늦어진다.",
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-06:b:d-1:motive:2",
          "partnership-06:b:d-1:act:0"
        ],
        "forbidAtomIds": [
          "partnership-06:b:d-1:rule:4",
          "partnership-06:b:d-1:act:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:motive:motive",
      "coverageKey": "b:d-1:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-1:motive:counter_motive_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "partnership06:beat_v2:b:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "저는 그 구역 완성도가 무너지는 게 너무 싫어서 가람의 월권을 더 크게 말했습니다.",
      "behaviorHint": "처음으로 계산을 내려놓듯 말이 느려지고 표정이 풀린다.",
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
          "partnership-06:b:d-1:harm:3",
          "partnership-06:b:d-1:evidence:1"
        ],
        "forbidAtomIds": [
          "partnership-06:b:d-1:act:0",
          "partnership-06:b:d-1:evidence:1"
        ]
      },
      "weight": 4,
      "priority": 23,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:rapport:emotion",
      "coverageKey": "b:d-1:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-1:core:counter_hurt_exposed"
      ],
      "tags": [
        "late"
      ]
    },
    {
      "id": "partnership06:beat_v2:b:d-1:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "옵션만 잡아둔 것이라면 왜 통화 직후 발주서와 PM 로그에 대체 모델 코드가 연속 반영돼 있습니까?",
      "behaviorHint": "증거 문구를 확인하듯 짧게 되뇌며 방어선을 다시 세운다.",
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-06:b:d-1:evidence:1",
          "partnership-06:b:d-1:harm:3"
        ],
        "forbidAtomIds": [
          "partnership-06:b:d-1:act:0",
          "partnership-06:b:d-1:motive:2"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:evidence:identity",
      "coverageKey": "b:d-1:motive:mid:evidence:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:counter_evidence_seen"
      ],
      "tags": [
        "evidence"
      ]
    },
    {
      "id": "partnership06:beat_v2:b:d-2:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "카운터 위치는 브랜드 구조의 일부였습니다. 저는 그 범주에서 말하고 있다고 생각했습니다.",
      "behaviorHint": "말은 차갑지만 핵심 감정을 건드리지 않으려 서류와 수치부터 꺼낸다.",
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
          "partnership-06:b:d-2:denial:0",
          "partnership-06:b:d-2:motive:2"
        ],
        "forbidAtomIds": [
          "partnership-06:b:d-2:admission:5",
          "partnership-06:b:d-2:act:1"
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
        "d-2:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership06:beat_v2:b:d-2:surface:pressure:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "먼저 시간순으로 보면, 저는 위치와 동선에 대한 디자인 조정을 말한 겁니다.",
      "behaviorHint": "말은 차갑지만 핵심 감정을 건드리지 않으려 서류와 수치부터 꺼낸다.",
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
          "partnership-06:b:d-2:denial:0",
          "partnership-06:b:d-2:motive:2"
        ],
        "forbidAtomIds": [
          "partnership-06:b:d-2:admission:5",
          "partnership-06:b:d-2:act:1"
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
        "d-2:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership06:beat_v2:b:d-2:surface:pressure:timeline:03",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "먼저 시간순으로 보면, 카운터 위치는 브랜드 구조의 일부입니다.",
      "behaviorHint": "말은 차갑지만 핵심 감정을 건드리지 않으려 서류와 수치부터 꺼낸다.",
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
          "partnership-06:b:d-2:denial:0",
          "partnership-06:b:d-2:motive:2"
        ],
        "forbidAtomIds": [
          "partnership-06:b:d-2:admission:5",
          "partnership-06:b:d-2:act:1"
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
        "d-2:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership06:beat_v2:b:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "counter",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 철거 일정까지 제가 결정했다는 표현은 과합니다.",
      "behaviorHint": "말은 차갑지만 핵심 감정을 건드리지 않으려 서류와 수치부터 꺼낸다.",
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
          "partnership-06:b:d-2:denial:0",
          "partnership-06:b:d-2:motive:2"
        ],
        "forbidAtomIds": [
          "partnership-06:b:d-2:admission:5",
          "partnership-06:b:d-2:act:1"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:context",
      "coverageKey": "b:d-2:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership06:beat_v2:b:d-2:surface:pressure:context:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 공정 판단은 현장과 시공팀이 가져가는 영역이었습니다.",
      "behaviorHint": "말은 차갑지만 핵심 감정을 건드리지 않으려 서류와 수치부터 꺼낸다.",
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
          "partnership-06:b:d-2:denial:0",
          "partnership-06:b:d-2:motive:2"
        ],
        "forbidAtomIds": [
          "partnership-06:b:d-2:admission:5",
          "partnership-06:b:d-2:act:1"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:context",
      "coverageKey": "b:d-2:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership06:beat_v2:b:d-2:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "counter",
      "line": "누가 무엇을 결정했는지부터 분리해야 합니다. 카운터 위치는 브랜드 구조의 일부입니다.",
      "behaviorHint": "말은 차갑지만 핵심 감정을 건드리지 않으려 서류와 수치부터 꺼낸다.",
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
          "partnership-06:b:d-2:denial:0",
          "partnership-06:b:d-2:motive:2"
        ],
        "forbidAtomIds": [
          "partnership-06:b:d-2:admission:5",
          "partnership-06:b:d-2:act:1"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:identity",
      "coverageKey": "b:d-2:surface:early:pressure:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership06:beat_v2:b:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 문제를 디자인 범주로 잘게 나눠 말한 건 사실입니다.",
      "behaviorHint": "정당화 논리를 또박또박 정리하지만 끝부분에서 미세하게 속도가 늦어진다.",
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-06:b:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "partnership-06:b:d-2:act:1",
          "partnership-06:b:d-2:admission:5"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:pressure:responsibility",
      "coverageKey": "b:d-2:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-2:motive:scope_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "partnership06:beat_v2:b:d-2:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "justify",
      "line": "제가 그렇게 말하거나 움직인 데엔 이유가 있었습니다. 당시엔 브랜드 일관성이 깨진다고 봤습니다.",
      "behaviorHint": "정당화 논리를 또박또박 정리하지만 끝부분에서 미세하게 속도가 늦어진다.",
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-06:b:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "partnership-06:b:d-2:act:1",
          "partnership-06:b:d-2:admission:5"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:motive:motive",
      "coverageKey": "b:d-2:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-2:motive:motive_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "partnership06:beat_v2:b:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "카운터 위치 하나가 아니라 브랜드 첫 인상 전체였어요. 그걸 운영 편의처럼 밀어버린 게 더 큰 문제였죠.",
      "behaviorHint": "처음으로 계산을 내려놓듯 말이 느려지고 표정이 풀린다.",
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
          "partnership-06:b:d-2:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-06:b:d-2:denial:0",
          "partnership-06:b:d-2:motive:2"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:core:rapport:emotion",
      "coverageKey": "b:d-2:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-2:core:control_fear_exposed"
      ],
      "tags": [
        "late"
      ]
    },
    {
      "id": "partnership06:beat_v2:b:d-2:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confess",
      "line": "이제는 숨기지 않겠습니다. 맞습니다. 저는 가람과 다시 확인하지 않은 채 카운터 위치와 철거 순서를 바꾸라고 말했습니다.",
      "behaviorHint": "처음으로 계산을 내려놓듯 말이 느려지고 표정이 풀린다.",
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
          "partnership-06:b:d-2:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-06:b:d-2:denial:0",
          "partnership-06:b:d-2:motive:2"
        ]
      },
      "weight": 4,
      "priority": 23,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:core:rapport:emotion",
      "coverageKey": "b:d-2:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-2:core:control_fear_exposed"
      ],
      "tags": [
        "late"
      ]
    },
    {
      "id": "partnership06:beat_v2:b:d-2:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "cornered",
      "line": "디자인 조정이라고 하셨지만, 댓글에는 철거 순서를 먼저 바꾸라는 문구까지 함께 남아 있습니다.",
      "behaviorHint": "증거 문구를 확인하듯 짧게 되뇌며 방어선을 다시 세운다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
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
          "partnership-06:b:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "partnership-06:b:d-2:denial:0"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:evidence:context",
      "coverageKey": "b:d-2:surface:early:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:evidence_seen"
      ],
      "tags": [
        "evidence"
      ]
    },
    {
      "id": "partnership06:beat_v2:b:d-2:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "그 자료를 봐도, 네, 제가 카운터 이동과 철거 순서에 함께 손댄 건 맞습니다.",
      "behaviorHint": "증거 문구를 확인하듯 짧게 되뇌며 방어선을 다시 세운다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "evidence_response",
      "angleTag": "legality",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated"
        ],
        "trustWindowBands": [
          "narrow"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-06:b:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "partnership-06:b:d-2:denial:0",
          "partnership-06:b:d-2:motive:2"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:evidence:legality",
      "coverageKey": "b:d-2:motive:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:scope_named"
      ],
      "tags": [
        "evidence"
      ]
    },
    {
      "id": "partnership06:beat_v2:b:d-2:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "irritate",
      "line": "같은 카운터 위치 이야기를 또 반복해야 합니까. 이미 제가 왜 그렇게 움직였는지는 설명했습니다.",
      "behaviorHint": "짧고 건조하게 끊어 말하며 피로를 숨기지 못한다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
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
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-06:b:d-2:act:1",
          "partnership-06:b:d-2:evidence:3"
        ],
        "forbidAtomIds": [
          "partnership-06:b:d-2:admission:5",
          "partnership-06:b:d-2:act:1"
        ]
      },
      "weight": 3,
      "priority": 20,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:fatigue:timeline",
      "coverageKey": "b:d-2:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:fatigue_warning_2"
      ],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "partnership06:beat_v2:b:d-2:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "block",
      "line": "좋습니다. 그럼 핵심만 말하죠. 책임을 묻고 싶다면 앞뒤 흐름까지 같이 보셔야 합니다.",
      "behaviorHint": "짧고 건조하게 끊어 말하며 피로를 숨기지 못한다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
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
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-06:b:d-2:act:1",
          "partnership-06:b:d-2:evidence:3"
        ],
        "forbidAtomIds": [
          "partnership-06:b:d-2:admission:5",
          "partnership-06:b:d-2:act:1"
        ]
      },
      "weight": 3,
      "priority": 20,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:fatigue:responsibility",
      "coverageKey": "b:d-2:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:fatigue_block_3"
      ],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "partnership06:beat_v2:b:d-2:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "counter_fatigue",
      "line": "계속 저만 몰아가면 남는 건 방어뿐입니다. 왜 그 판단이 나왔는지까지 같이 물어야 공정합니다.",
      "behaviorHint": "짧고 건조하게 끊어 말하며 피로를 숨기지 못한다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
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
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-06:b:d-2:act:1",
          "partnership-06:b:d-2:evidence:3"
        ],
        "forbidAtomIds": [
          "partnership-06:b:d-2:admission:5",
          "partnership-06:b:d-2:act:1"
        ]
      },
      "weight": 3,
      "priority": 20,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:fatigue:responsibility",
      "coverageKey": "b:d-2:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-2:core:fatigue_counter_ready"
      ],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "partnership06:beat_v2:b:d-2:surface:pressure:timeline:04",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "transition",
      "line": "댓글과 도면이 그렇게 남아 있다면, 위치와 순서에 함께 손댄 건 인정하겠습니다.",
      "behaviorHint": "질문의 전제를 다시 정의하려는 듯 문장을 고쳐 세운다.",
      "applicableStates": [
        "S1",
        "S2"
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
          "partnership-06:b:d-2:denial:0",
          "partnership-06:b:d-2:motive:2"
        ],
        "forbidAtomIds": [
          "partnership-06:b:d-2:admission:5",
          "partnership-06:b:d-2:act:1"
        ]
      },
      "weight": 4,
      "priority": 25,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:timeline",
      "coverageKey": "b:d-2:surface:early:pressure:timeline",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:identity_pressed"
      ],
      "tags": [
        "transition"
      ]
    },
    {
      "id": "partnership06:beat_v2:a:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 카운터 위치랑 철거 순서를 먼저 흔든 건 보라 쪽입니다.",
      "behaviorHint": "답이 빠르고 단정적이며 상대 책임을 먼저 잘라 말한다.",
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
          "partnership-06:a:d-2:evidence:1",
          "partnership-06:a:d-2:act:0"
        ],
        "forbidAtomIds": [
          "partnership-06:a:d-2:harm:3",
          "partnership-06:a:d-2:motive:2"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:pressure:context",
      "coverageKey": "a:d-2:surface:early:pressure:context",
      "variantTarget": 4,
      "setFlags": [
        "d-2:surface:counter_seen"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership06:beat_v2:a:d-2:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "counter",
      "line": "누가 무엇을 결정했는지부터 분리해야 합니다. 제가 뒤늦게 맞춰본 거지 먼저 흔든 건 아닙니다.",
      "behaviorHint": "답이 빠르고 단정적이며 상대 책임을 먼저 잘라 말한다.",
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
          "partnership-06:a:d-2:act:0",
          "partnership-06:a:d-2:relationship:4"
        ],
        "forbidAtomIds": [
          "partnership-06:a:d-2:harm:3",
          "partnership-06:a:d-2:motive:2"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:pressure:identity",
      "coverageKey": "a:d-2:surface:early:pressure:identity",
      "variantTarget": 4,
      "setFlags": [
        "d-2:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership06:beat_v2:a:d-2:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "justify",
      "line": "제가 그렇게 말하거나 움직인 데엔 이유가 있었습니다. 다만 제가 그걸 멈추기보다 현장식으로 덮으려 한 건 있습니다.",
      "behaviorHint": "방어와 역공이 섞여 한 문장 안에서 책임을 되돌린다.",
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-06:a:d-2:motive:2",
          "partnership-06:a:d-2:act:0"
        ],
        "forbidAtomIds": [
          "partnership-06:a:d-2:harm:3",
          "partnership-06:a:d-2:act:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:motive:motive",
      "coverageKey": "a:d-2:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-2:motive:counter_motive_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "partnership06:beat_v2:a:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "현장 사진도 안 보고 완성도만 말하면 끝입니까? 매장 문 여는 사람은 결국 저였어요.",
      "behaviorHint": "감정이 먼저 올라와 목소리가 순간적으로 높아진다.",
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
          "partnership-06:a:d-2:harm:3",
          "partnership-06:a:d-2:motive:2"
        ],
        "forbidAtomIds": [
          "partnership-06:a:d-2:relationship:4",
          "partnership-06:a:d-2:act:0"
        ]
      },
      "weight": 4,
      "priority": 23,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:core:rapport:emotion",
      "coverageKey": "a:d-2:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-2:core:counter_hurt_exposed"
      ],
      "tags": [
        "late"
      ]
    },
    {
      "id": "partnership06:beat_v2:a:d-2:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "디자인 조정이라고 하셨지만, 댓글에는 철거 순서를 먼저 바꾸라는 문구까지 함께 남아 있습니다.",
      "behaviorHint": "증거가 나오면 즉각 반박 포인트를 집어 되받아친다.",
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-06:a:d-2:motive:2",
          "partnership-06:a:d-2:act:0"
        ],
        "forbidAtomIds": [
          "partnership-06:a:d-2:act:0",
          "partnership-06:a:d-2:relationship:4"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:evidence:identity",
      "coverageKey": "a:d-2:motive:mid:evidence:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:counter_evidence_seen"
      ],
      "tags": [
        "evidence"
      ]
    },
    {
      "id": "partnership06:beat_v2:a:d-4:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "misbelief",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 지연이 길어진 건 보라가 카운터랑 철거 순서를 늦게 뒤집었기 때문입니다.",
      "behaviorHint": "단정과 흔들림이 번갈아 나오며 오해를 더 세게 밀어붙인다.",
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
          "partnership-06:a:d-4:counter:0",
          "partnership-06:a:d-4:act:1"
        ],
        "forbidAtomIds": [
          "partnership-06:a:d-4:admission:4",
          "partnership-06:a:d-4:fear:3"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:trap:context",
      "coverageKey": "a:d-4:surface:early:trap:context",
      "variantTarget": 3,
      "setFlags": [
        "d-4:surface:delay_trace_named"
      ],
      "tags": [
        "misbelief",
        "shared_misconception"
      ]
    },
    {
      "id": "partnership06:beat_v2:b:d-4:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "misbelief",
      "line": "누가 무엇을 결정했는지부터 분리해야 합니다. 지연의 핵심 원인은 가람의 재발주였습니다.",
      "behaviorHint": "맥락 복원에 집착하며 잘린 단서의 위험을 냉정하게 지적한다.",
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
          "partnership-06:b:d-4:counter:0",
          "partnership-06:b:d-4:act:1"
        ],
        "forbidAtomIds": [
          "partnership-06:b:d-4:admission:4",
          "partnership-06:b:d-4:act:1"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:surface:trap:identity",
      "coverageKey": "b:d-4:surface:early:trap:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-4:surface:delay_trace_named"
      ],
      "tags": [
        "misbelief",
        "shared_misconception"
      ]
    },
    {
      "id": "partnership06:beat_v2:a:d-4:core:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "clarify",
      "line": "이제는 숨기지 않겠습니다. 그때는 누가 먼저 넘었느냐보다 다시 문을 여는 게 더 무서웠습니다.",
      "behaviorHint": "감정이 먼저 올라와 목소리가 순간적으로 높아진다.",
      "applicableStates": [
        "M3",
        "M4"
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
          "agitated",
          "raw"
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
          "partnership-06:a:d-4:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-06:a:d-4:counter:0",
          "partnership-06:a:d-4:act:1"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:core:trap:context",
      "coverageKey": "a:d-4:core:late:trap:context",
      "variantTarget": 2,
      "setFlags": [
        "d-4:core:joint_delay_named"
      ],
      "tags": [
        "misbelief",
        "shared_misconception"
      ]
    },
    {
      "id": "partnership06:beat_v2:b:d-4:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "clarify",
      "line": "이제는 숨기지 않겠습니다. 그날 저는 브랜드 완성도를 지키려다 현장의 이미 무너진 순서를 보지 못했습니다.",
      "behaviorHint": "처음으로 계산을 내려놓듯 말이 느려지고 표정이 풀린다.",
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
          "partnership-06:b:d-4:admission:4",
          "partnership-06:b:d-4:evidence:2"
        ],
        "forbidAtomIds": [
          "partnership-06:b:d-4:counter:0",
          "partnership-06:b:d-4:act:1"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:core:trap:emotion",
      "coverageKey": "b:d-4:core:late:trap:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-4:core:joint_delay_named"
      ],
      "tags": [
        "misbelief",
        "shared_misconception"
      ]
    },
    {
      "id": "partnership06:beat_v2:a:d-4:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "reframe",
      "line": "옵션만 잡아둔 것이라면 왜 통화 직후 발주서와 PM 로그에 대체 모델 코드가 연속 반영돼 있습니까?",
      "behaviorHint": "증거가 나오면 즉각 반박 포인트를 집어 되받아친다.",
      "applicableStates": [
        "M1",
        "M2",
        "M3"
      ],
      "layer": "motive",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated"
        ],
        "trustWindowBands": [
          "narrow"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-06:a:d-4:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "partnership-06:a:d-4:counter:0",
          "partnership-06:a:d-4:act:1"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:evidence:context",
      "coverageKey": "a:d-4:motive:mid:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-4:motive:single_blame_shaken"
      ],
      "tags": [
        "evidence",
        "misbelief"
      ]
    },
    {
      "id": "partnership06:beat_v2:b:d-4:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "reframe",
      "line": "디자인 조정이라고 하셨지만, 댓글에는 철거 순서를 먼저 바꾸라는 문구까지 함께 남아 있습니다.",
      "behaviorHint": "증거 문구를 확인하듯 짧게 되뇌며 방어선을 다시 세운다.",
      "applicableStates": [
        "M1",
        "M2",
        "M3"
      ],
      "layer": "motive",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "identity",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated"
        ],
        "trustWindowBands": [
          "narrow"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-06:b:d-4:act:1",
          "partnership-06:b:d-4:evidence:2"
        ],
        "forbidAtomIds": [
          "partnership-06:b:d-4:counter:0",
          "partnership-06:b:d-4:act:1"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:motive:evidence:identity",
      "coverageKey": "b:d-4:motive:mid:evidence:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-4:motive:single_blame_shaken"
      ],
      "tags": [
        "evidence",
        "misbelief"
      ]
    },
    {
      "id": "partnership06:beat_v2:a:d-3:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "그 자료를 봐도, 문서에 적힌 원칙이 있었다는 건 압니다.",
      "behaviorHint": "증거가 나오면 즉각 반박 포인트를 집어 되받아친다.",
      "applicableStates": [
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-06:a:d-3:admission:2",
          "partnership-06:a:d-3:rule:0"
        ],
        "forbidAtomIds": [
          "partnership-06:a:d-3:rule:0",
          "partnership-06:a:d-3:self_justification:1"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:evidence:legality",
      "coverageKey": "a:d-3:motive:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-3:motive:threshold_named"
      ],
      "tags": [
        "evidence"
      ]
    },
    {
      "id": "partnership06:beat_v2:b:d-3:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "free_probe",
      "line": "직접 묻는다면 이렇게 답할 수밖에 없습니다. 브랜드 영역을 지키겠다는 마음이 컸지만, 그게 규칙을 가볍게 보는 핑계가 됐습니다.",
      "behaviorHint": "직설을 피하지 않지만 감정선을 조심스럽게 꺼낸다.",
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
          "partnership-06:b:d-3:admission:4",
          "partnership-06:b:d-3:context:3"
        ],
        "forbidAtomIds": [
          "partnership-06:b:d-3:self_justification:1",
          "partnership-06:b:d-3:context:3"
        ]
      },
      "weight": 4,
      "priority": 23,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:rapport:emotion",
      "coverageKey": "b:d-3:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-3:core:rule_breach_seen"
      ],
      "tags": [
        "free_question",
        "late"
      ]
    },
    {
      "id": "partnership06:beat_v2:a:d-5:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "정리하려고 보냈다는 메시지가 실제로는 외부 기관 기록과 현장일지에서도 별도 최종안처럼 작동한 흔적과 맞물립니다.",
      "behaviorHint": "증거가 나오면 즉각 반박 포인트를 집어 되받아친다.",
      "applicableStates": [
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-06:a:d-5:act:1",
          "partnership-06:a:d-5:counter:2"
        ],
        "forbidAtomIds": [
          "partnership-06:a:d-5:counter:2",
          "partnership-06:a:d-5:denial:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:evidence:legality",
      "coverageKey": "a:d-5:motive:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-5:motive:double_final_named"
      ],
      "tags": [
        "evidence"
      ]
    },
    {
      "id": "partnership06:beat_v2:b:d-5:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "free_probe",
      "line": "직접 묻는다면 이렇게 답할 수밖에 없습니다. 정리되지 않은 지시를 '현장판'이라고 부르면 다 최종안이 됩니다. 그래서 팀이 무너진 거예요.",
      "behaviorHint": "직설을 피하지 않지만 감정선을 조심스럽게 꺼낸다.",
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
          "partnership-06:b:d-5:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-06:b:d-5:denial:0",
          "partnership-06:b:d-5:act:1"
        ]
      },
      "weight": 4,
      "priority": 23,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:motive:motive",
      "coverageKey": "b:d-5:core:late:motive:motive",
      "variantTarget": 2,
      "setFlags": [
        "d-5:core:message_lane_seen"
      ],
      "tags": [
        "free_question",
        "late"
      ]
    },
    {
      "id": "partnership06:beat_v2:a:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "제가 멈칫했으면 그 매장은 더 오래 닫혀 있었어요. 그 압박은 현장에 있던 사람만 압니다.",
      "behaviorHint": "끼어들 때도 속도를 늦추지 않고 감정선을 밀어 올린다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
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
          "partnership-06:a:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-06:a:d-1:context:0",
          "partnership-06:a:d-1:denial:1"
        ]
      },
      "weight": 4,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-1:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:fear_exposed"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "partnership06:beat_v2:b:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "카운터 위치 하나가 아니라 브랜드 첫 인상 전체였어요. 그걸 운영 편의처럼 밀어버린 게 더 큰 문제였죠.",
      "behaviorHint": "한 문장씩 또렷하게 끊어 말하며 흐름을 붙잡으려 한다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
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
          "partnership-06:b:d-2:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-06:b:d-2:denial:0",
          "partnership-06:b:d-2:motive:2"
        ]
      },
      "weight": 4,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-2:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-2:core:control_fear_exposed"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "partnership06:beat_v2:a:d-1:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "알겠습니다. 감정부터 앞세운 건 제 실수였습니다. 그래도 왜 그렇게까지 흔들렸는지는 빼지 말아 주세요.",
      "behaviorHint": "끼어들 때도 속도를 늦추지 않고 감정선을 밀어 올린다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
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
          "partnership-06:a:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-06:a:d-1:context:0",
          "partnership-06:a:d-1:denial:1"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-1:surface:mid:interjection:emotional_only:block",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:fear_exposed"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "partnership06:beat_v2:b:d-2:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "좋습니다. 그럼 감정 표현은 줄이겠습니다. 대신 그 결정이 왜 그렇게 컸는지는 남겨 두겠습니다.",
      "behaviorHint": "한 문장씩 또렷하게 끊어 말하며 흐름을 붙잡으려 한다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
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
          "partnership-06:b:d-2:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-06:b:d-2:denial:0",
          "partnership-06:b:d-2:motive:2"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-2:surface:mid:interjection:emotional_only:block",
      "variantTarget": 2,
      "setFlags": [
        "d-2:core:control_fear_exposed"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "partnership06:beat_v2:a:d-1:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "옵션만 잡아둔 것이라면 왜 통화 직후 발주서와 PM 로그에 대체 모델 코드가 연속 반영돼 있습니까?",
      "behaviorHint": "끼어들 때도 속도를 늦추지 않고 감정선을 밀어 올린다.",
      "applicableStates": [
        "S1",
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
          "partnership-06:a:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-06:a:d-1:context:0",
          "partnership-06:a:d-1:denial:1"
        ]
      },
      "weight": 4,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-1:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:detail_rebuttal_seen"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "partnership06:beat_v2:b:d-2:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "디자인 조정이라고 하셨지만, 댓글에는 철거 순서를 먼저 바꾸라는 문구까지 함께 남아 있습니다.",
      "behaviorHint": "한 문장씩 또렷하게 끊어 말하며 흐름을 붙잡으려 한다.",
      "applicableStates": [
        "S1",
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
          "partnership-06:b:d-2:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-06:b:d-2:denial:0",
          "partnership-06:b:d-2:motive:2"
        ]
      },
      "weight": 4,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-2:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:detail_rebuttal_seen"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "partnership06:beat_v2:a:d-1:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "그 세부 반박은 들었습니다. 요지는 인정 범위와 승인선으로 한정해 말하겠습니다.",
      "behaviorHint": "끼어들 때도 속도를 늦추지 않고 감정선을 밀어 올린다.",
      "applicableStates": [
        "S1",
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
          "partnership-06:a:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-06:a:d-1:context:0",
          "partnership-06:a:d-1:denial:1"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-1:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:detail_rebuttal_seen"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "partnership06:beat_v2:b:d-2:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "세부 디테일은 정리됐습니다. 이제 누가 어떤 권한 없이 움직였는지만 답하겠습니다.",
      "behaviorHint": "한 문장씩 또렷하게 끊어 말하며 흐름을 붙잡으려 한다.",
      "applicableStates": [
        "S1",
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
          "partnership-06:b:d-2:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-06:b:d-2:denial:0",
          "partnership-06:b:d-2:motive:2"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-2:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:detail_rebuttal_seen"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "partnership06:beat_v2:a:d-4:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "interject",
      "line": "지금은 리뉴얼 지연이 상대 한 사람의 월권만으로 생겼다는 믿음을 더 세게 말하고 싶을 수 있습니다. 하지만 그 결론을 밀려면 빠진 맥락까지 같이 버텨야 합니다.",
      "behaviorHint": "끼어들 때도 속도를 늦추지 않고 감정선을 밀어 올린다.",
      "applicableStates": [
        "M1",
        "M2"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
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
          "partnership-06:a:d-4:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-06:a:d-4:counter:0",
          "partnership-06:a:d-4:act:1"
        ]
      },
      "weight": 4,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-4:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-4:surface:delay_trace_named"
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
      "id": "partnership06:beat_v2:b:d-4:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "interject",
      "line": "잘린 단서만 붙들면 리뉴얼 지연이 상대 한 사람의 월권만으로 생겼다는 믿음이 더 또렷해 보입니다. 그래서 더 위험한 겁니다.",
      "behaviorHint": "한 문장씩 또렷하게 끊어 말하며 흐름을 붙잡으려 한다.",
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
          "partnership-06:b:d-4:act:1",
          "partnership-06:b:d-4:fear:3"
        ],
        "forbidAtomIds": [
          "partnership-06:b:d-4:counter:0",
          "partnership-06:b:d-4:act:1"
        ]
      },
      "weight": 4,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-4:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-4:surface:delay_trace_named"
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
      "id": "partnership06:beat_v2:a:d-4:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "interject",
      "line": "좋습니다. 더 몰아붙이지는 않겠습니다. 대신 왜 그 오해가 그렇게 쉽게 굳었는지는 남겨 두겠습니다.",
      "behaviorHint": "끼어들 때도 속도를 늦추지 않고 감정선을 밀어 올린다.",
      "applicableStates": [
        "M2",
        "M3"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
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
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-06:a:d-4:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-06:a:d-4:counter:0",
          "partnership-06:a:d-4:act:1"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-4:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 2,
      "setFlags": [
        "d-4:surface:delay_trace_named"
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
      "id": "partnership06:beat_v2:b:d-4:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-06",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "interject",
      "line": "그 결론을 잠깐 접겠습니다. 지금은 누락된 경로와 바깥 변수를 먼저 보겠습니다.",
      "behaviorHint": "한 문장씩 또렷하게 끊어 말하며 흐름을 붙잡으려 한다.",
      "applicableStates": [
        "M2",
        "M3"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "emotion",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
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
          "partnership-06:b:d-4:act:1",
          "partnership-06:b:d-4:fear:3"
        ],
        "forbidAtomIds": [
          "partnership-06:b:d-4:counter:0",
          "partnership-06:b:d-4:act:1"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-4:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 2,
      "setFlags": [
        "d-4:surface:delay_trace_named"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "misbelief_escalation",
        "red_herring"
      ],
      "beliefMode": "weaponizes"
    }
  ]
} as const;

export default partnership06BeatsV2Full;
