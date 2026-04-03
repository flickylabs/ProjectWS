export const workplace10BeatsV2Full = {
  "caseId": "workplace-10",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 58,
    "byActionFamily": {
      "question": 30,
      "evidence": 6,
      "fatigue": 6,
      "free_question": 4,
      "interjection": 12
    },
    "byParty": {
      "a": 28,
      "b": 30
    },
    "byIssueRole": {
      "core_truth": 25,
      "sub_truth": 23,
      "red_herring": 10
    },
    "byDispute": {
      "d-1": 15,
      "d-2": 10,
      "d-5": 15,
      "d-4": 8,
      "d-3": 10
    },
    "interjectionLevels": {
      "emotional_only": 4,
      "detail_rebuttal": 4,
      "misbelief_escalation": 2,
      "trap_signal": 2
    },
    "matrixChecks": {
      "question_early_timeline": true,
      "question_early_identity_or_context": true,
      "question_mid_responsibility": true,
      "question_mid_motive": true,
      "question_late_emotion": true,
      "evidence_context_identity_legality": true,
      "fatigue_mid_timeline": true,
      "fatigue_mid_responsibility": true,
      "free_question_late_motive_or_emotion": true,
      "trap_early_identity": true,
      "trap_early_context": true,
      "trap_late_context": true,
      "trap_late_emotion": true,
      "interjection_emotional_only": true,
      "interjection_detail_rebuttal": true,
      "interjection_misbelief_escalation": true,
      "interjection_trap_signal": true
    },
    "coverageKeys": [
      "a:d-1:core:late:rapport:emotion",
      "a:d-1:motive:mid:fatigue:timeline",
      "a:d-1:surface:early:pressure:timeline",
      "a:d-1:surface:mid:interjection:emotional_only:allow",
      "a:d-3:surface:mid:interjection:trap_signal:allow",
      "a:d-4:motive:mid:pressure:responsibility",
      "a:d-4:surface:early:evidence:legality",
      "a:d-4:surface:mid:interjection:detail_rebuttal:allow",
      "a:d-4:surface:mid:interjection:detail_rebuttal:block",
      "a:d-5:core:late:motive:motive",
      "a:d-5:motive:mid:evidence:context",
      "a:d-5:surface:mid:interjection:emotional_only:block",
      "b:d-1:surface:mid:interjection:emotional_only:allow",
      "b:d-2:motive:mid:evidence:identity",
      "b:d-2:motive:mid:fatigue:responsibility",
      "b:d-2:surface:early:pressure:identity",
      "b:d-2:surface:mid:interjection:detail_rebuttal:allow",
      "b:d-2:surface:mid:interjection:detail_rebuttal:block",
      "b:d-3:core:late:trap:context",
      "b:d-3:core:late:trap:emotion",
      "b:d-3:surface:early:trap:context",
      "b:d-3:surface:early:trap:identity",
      "b:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "b:d-3:surface:mid:interjection:misbelief_escalation:block",
      "b:d-3:surface:mid:interjection:trap_signal:block",
      "b:d-5:core:late:rapport:emotion",
      "b:d-5:motive:mid:motive:motive",
      "b:d-5:surface:early:pressure:context",
      "b:d-5:surface:mid:interjection:emotional_only:block"
    ]
  },
  "beats": [
    {
      "id": "workplace10:beat_v2:a:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "저는 혜린 씨에게 정규직 전환을 확정 약속으로 말한 적이 없습니다. 헤드카운트와 예산이 정해지지 않은 상태에서 검토 가능성만 언급한 것입니다.",
      "behaviorHint": "말끝을 길게 끌며 책임보다 상황을 먼저 설명한다.",
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
          "workplace-10:a:d-1:denial:0"
        ],
        "forbidAtomIds": [
          "workplace-10:a:d-1:admission:1"
        ]
      },
      "weight": 6,
      "priority": 30,
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
      "id": "workplace10:beat_v2:a:d-1:surface:pressure:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deflect",
      "line": "저는 혜린 씨에게 정규직 전환을 확정 약속으로 말한 적이 없습니다.",
      "behaviorHint": "시선을 잠깐 피했다가 다시 정면을 본다.",
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
          "workplace-10:a:d-1:denial:0"
        ],
        "forbidAtomIds": [
          "workplace-10:a:d-1:admission:1"
        ]
      },
      "weight": 6,
      "priority": 30,
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
      "id": "workplace10:beat_v2:a:d-1:surface:pressure:timeline:03",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "minimize",
      "line": "헤드카운트와 예산이 정해지지 않은 상태에서 검토 가능성만 언급한 것입니다.",
      "behaviorHint": "손끝으로 책상 모서리를 건드리며 방어적으로 버틴다.",
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
          "workplace-10:a:d-1:denial:0"
        ],
        "forbidAtomIds": [
          "workplace-10:a:d-1:admission:1"
        ]
      },
      "weight": 6,
      "priority": 30,
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
      "id": "workplace10:beat_v2:a:d-1:surface:pressure:timeline:04",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "제가 혜린 씨를 기대하게 했을 수는 있습니다. 다만 '올려 보겠다'는 취지였지 확정 통보는 아니었습니다.",
      "behaviorHint": "한 문장 안에서 해명과 축소를 섞어 말한다.",
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
          "workplace-10:a:d-1:denial:0"
        ],
        "forbidAtomIds": [
          "workplace-10:a:d-1:admission:1"
        ]
      },
      "weight": 6,
      "priority": 30,
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
      "id": "workplace10:beat_v2:a:d-1:surface:pressure:timeline:05",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "reframe",
      "line": "제가 혜린 씨를 기대하게 했을 수는 있습니다.",
      "behaviorHint": "말끝을 길게 끌며 책임보다 상황을 먼저 설명한다.",
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
          "workplace-10:a:d-1:denial:0"
        ],
        "forbidAtomIds": [
          "workplace-10:a:d-1:admission:1"
        ]
      },
      "weight": 6,
      "priority": 30,
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
      "id": "workplace10:beat_v2:a:d-1:surface:pressure:timeline:06",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "counter",
      "line": "다만 '올려 보겠다'는 취지였지 확정 통보는 아니었습니다.",
      "behaviorHint": "시선을 잠깐 피했다가 다시 정면을 본다.",
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
          "workplace-10:a:d-1:denial:0"
        ],
        "forbidAtomIds": [
          "workplace-10:a:d-1:admission:1"
        ]
      },
      "weight": 6,
      "priority": 30,
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
      "id": "workplace10:beat_v2:b:d-2:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "저는 타사와 겹치는 고정 근무를 한 적이 없습니다. 있었다면 생계 불안 때문에 대비용으로 검토한 수준이지, 병행을 숨긴 건 아닙니다.",
      "behaviorHint": "말끝을 길게 끌며 책임보다 상황을 먼저 설명한다.",
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
          "workplace-10:b:d-2:denial:0"
        ],
        "forbidAtomIds": [
          "workplace-10:b:d-2:admission:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:identity",
      "coverageKey": "b:d-2:surface:early:pressure:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:identity_checked"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "workplace10:beat_v2:b:d-2:surface:pressure:identity:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deflect",
      "line": "저는 타사와 겹치는 고정 근무를 한 적이 없습니다.",
      "behaviorHint": "시선을 잠깐 피했다가 다시 정면을 본다.",
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
          "workplace-10:b:d-2:denial:0"
        ],
        "forbidAtomIds": [
          "workplace-10:b:d-2:admission:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:identity",
      "coverageKey": "b:d-2:surface:early:pressure:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:identity_checked"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "workplace10:beat_v2:b:d-2:surface:pressure:identity:03",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "있었다면 생계 불안 때문에 대비용으로 검토한 수준이지, 병행을 숨긴 건 아닙니다.",
      "behaviorHint": "손끝으로 책상 모서리를 건드리며 방어적으로 버틴다.",
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
          "workplace-10:b:d-2:denial:0"
        ],
        "forbidAtomIds": [
          "workplace-10:b:d-2:admission:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:identity",
      "coverageKey": "b:d-2:surface:early:pressure:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:identity_checked"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "workplace10:beat_v2:b:d-5:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "저는 약속을 확인하며 버틴 것이지, 숨긴 사실 위에서 관계를 굴린 건 아닙니다.",
      "behaviorHint": "말끝을 길게 끌며 책임보다 상황을 먼저 설명한다.",
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
          "workplace-10:b:d-5:denial:0"
        ],
        "forbidAtomIds": [
          "workplace-10:b:d-5:admission:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:pressure:context",
      "coverageKey": "b:d-5:surface:early:pressure:context",
      "variantTarget": 3,
      "setFlags": [
        "d-5:surface:context_checked"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "workplace10:beat_v2:b:d-5:surface:pressure:context:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "counter",
      "line": "저는 전환 약속이 정리되면 다른 계약도 정리할 수 있다고 봤습니다. 그래서 disclosure 시점을 늦춘 것이지, 관계 자체를 이용하려던 건 아닙니다.",
      "behaviorHint": "시선을 잠깐 피했다가 다시 정면을 본다.",
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
          "workplace-10:b:d-5:denial:0"
        ],
        "forbidAtomIds": [
          "workplace-10:b:d-5:admission:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:pressure:context",
      "coverageKey": "b:d-5:surface:early:pressure:context",
      "variantTarget": 3,
      "setFlags": [
        "d-5:surface:context_checked"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "workplace10:beat_v2:b:d-5:surface:pressure:context:03",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "저는 전환 약속이 정리되면 다른 계약도 정리할 수 있다고 봤습니다.",
      "behaviorHint": "손끝으로 책상 모서리를 건드리며 방어적으로 버틴다.",
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
          "workplace-10:b:d-5:denial:0"
        ],
        "forbidAtomIds": [
          "workplace-10:b:d-5:admission:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:pressure:context",
      "coverageKey": "b:d-5:surface:early:pressure:context",
      "variantTarget": 3,
      "setFlags": [
        "d-5:surface:context_checked"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "workplace10:beat_v2:a:d-4:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "제가 예산과 헤드카운트 얘기만 앞세운 건 맞습니다. 다만 그때도 보류와 재요청 가능이 섞여 있었고, 최종 결론은 남아 있었습니다.",
      "behaviorHint": "인정과 변명이 섞여 손동작이 커진다.",
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
          "frayed"
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
          "workplace-10:a:d-4:responsibility:0"
        ],
        "forbidAtomIds": [
          "workplace-10:a:d-4:admission:1"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:pressure:responsibility",
      "coverageKey": "a:d-4:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-4:motive:responsibility_pressed"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "workplace10:beat_v2:a:d-4:motive:pressure:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "justify",
      "line": "제가 예산과 헤드카운트 얘기만 앞세운 건 맞습니다.",
      "behaviorHint": "자기 이유를 꺼낼 때만 목소리가 빨라진다.",
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
          "frayed"
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
          "workplace-10:a:d-4:responsibility:0"
        ],
        "forbidAtomIds": [
          "workplace-10:a:d-4:admission:1"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:pressure:responsibility",
      "coverageKey": "a:d-4:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-4:motive:responsibility_pressed"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "workplace10:beat_v2:a:d-4:motive:pressure:responsibility:03",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "counter",
      "line": "다만 그때도 보류와 재요청 가능이 섞여 있었고, 최종 결론은 남아 있었습니다.",
      "behaviorHint": "상대를 보다가도 결국 자기 사정을 더 길게 말한다.",
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
          "frayed"
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
          "workplace-10:a:d-4:responsibility:0"
        ],
        "forbidAtomIds": [
          "workplace-10:a:d-4:admission:1"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:pressure:responsibility",
      "coverageKey": "a:d-4:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-4:motive:responsibility_pressed"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "workplace10:beat_v2:a:d-4:motive:pressure:responsibility:04",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "admit",
      "line": "제가 메모를 먼저 남긴 건 맞습니다. 다만 당시에는 혜린 씨의 잔류 여부와 팀 운영까지 함께 봐야 한다고 생각했습니다.",
      "behaviorHint": "한숨을 삼킨 뒤 변명과 고백을 번갈아 놓는다.",
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
          "frayed"
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
          "workplace-10:a:d-4:responsibility:0"
        ],
        "forbidAtomIds": [
          "workplace-10:a:d-4:admission:1"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:pressure:responsibility",
      "coverageKey": "a:d-4:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-4:motive:responsibility_pressed"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "workplace10:beat_v2:b:d-5:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "justify",
      "line": "제가 보험처럼 잡아 둔 계약을 숨긴 채 버틴 건 맞습니다. 다만 반복된 약속 때문에 곧 정리될 거라고 본 겁니다.",
      "behaviorHint": "인정과 변명이 섞여 손동작이 커진다.",
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
          "frayed"
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
          "workplace-10:b:d-5:timeline:0"
        ],
        "forbidAtomIds": [
          "workplace-10:b:d-5:admission:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:motive:motive",
      "coverageKey": "b:d-5:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:motive_opened"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "workplace10:beat_v2:b:d-5:motive:motive:motive:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "제가 보험처럼 잡아 둔 계약을 숨긴 채 버틴 건 맞습니다.",
      "behaviorHint": "자기 이유를 꺼낼 때만 목소리가 빨라진다.",
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
          "frayed"
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
          "workplace-10:b:d-5:timeline:0"
        ],
        "forbidAtomIds": [
          "workplace-10:b:d-5:admission:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:motive:motive",
      "coverageKey": "b:d-5:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:motive_opened"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "workplace10:beat_v2:b:d-5:motive:motive:motive:03",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "explain",
      "line": "다만 반복된 약속 때문에 곧 정리될 거라고 본 겁니다.",
      "behaviorHint": "상대를 보다가도 결국 자기 사정을 더 길게 말한다.",
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
          "frayed"
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
          "workplace-10:b:d-5:timeline:0"
        ],
        "forbidAtomIds": [
          "workplace-10:b:d-5:admission:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:motive:motive",
      "coverageKey": "b:d-5:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:motive_opened"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "workplace10:beat_v2:b:d-5:motive:motive:motive:04",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "crack",
      "line": "제가 정보를 다 열지 않은 건 맞습니다. 다만 도현 씨도 구두 약속으로 기대를 붙잡아 두면서 이 관계를 계속 굴렸습니다.",
      "behaviorHint": "한숨을 삼킨 뒤 변명과 고백을 번갈아 놓는다.",
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
          "frayed"
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
          "workplace-10:b:d-5:timeline:0"
        ],
        "forbidAtomIds": [
          "workplace-10:b:d-5:admission:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:motive:motive",
      "coverageKey": "b:d-5:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:motive_opened"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "workplace10:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "그 시기 저는 전환보다 런칭 공백을 먼저 막으려 했습니다. 그래서 불확실한 상태를 알면서도 기대를 접지 못하게 했습니다.",
      "behaviorHint": "말을 마친 뒤 짧게 숨을 고르며 표정이 흔들린다.",
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
          "frayed",
          "exposed"
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
          "workplace-10:a:d-1:fear:0"
        ],
        "forbidAtomIds": [
          "workplace-10:a:d-1:admission:1"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-1:core:emotion_opened"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "workplace10:beat_v2:a:d-1:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "emotion_open",
      "line": "그 시기 저는 전환보다 런칭 공백을 먼저 막으려 했습니다.",
      "behaviorHint": "마지막 문장에서만 힘이 빠지고 시선이 내려간다.",
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
          "frayed",
          "exposed"
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
          "workplace-10:a:d-1:fear:0"
        ],
        "forbidAtomIds": [
          "workplace-10:a:d-1:admission:1"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-1:core:emotion_opened"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "workplace10:beat_v2:a:d-1:core:rapport:emotion:03",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "shame",
      "line": "그래서 불확실한 상태를 알면서도 기대를 접지 못하게 했습니다.",
      "behaviorHint": "감정을 눌러 보려다 끝내 목소리의 떨림이 남는다.",
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
          "frayed",
          "exposed"
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
          "workplace-10:a:d-1:fear:0"
        ],
        "forbidAtomIds": [
          "workplace-10:a:d-1:admission:1"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-1:core:emotion_opened"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "workplace10:beat_v2:a:d-1:core:rapport:emotion:04",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "repair",
      "line": "제가 혜린 씨를 붙잡아 두기 위해 전환안을 올리겠다는 말을 반복했습니다. 막판에 기준과 시점을 바꿔 기대를 무너뜨린 건 제 책임입니다.",
      "behaviorHint": "체념과 인정이 섞인 표정으로 답을 끝낸다.",
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
          "frayed",
          "exposed"
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
          "workplace-10:a:d-1:fear:0"
        ],
        "forbidAtomIds": [
          "workplace-10:a:d-1:admission:1"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-1:core:emotion_opened"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "workplace10:beat_v2:a:d-4:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "보류 캡처만으로는 막힌 것처럼 보이지만, HR 원본 이력에는 재요청 가능 상태와 선행 코멘트가 함께 남아 있습니다. 예산 탓만으로 정리하기 어렵습니다.",
      "behaviorHint": "증거를 힐끗 보고 바로 시선을 피한다.",
      "applicableStates": [
        "S1",
        "S2"
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
          "workplace-10:a:d-4:denial:0"
        ],
        "forbidAtomIds": [
          "workplace-10:a:d-4:admission:1"
        ]
      },
      "weight": 3,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:evidence:legality",
      "coverageKey": "a:d-4:surface:early:evidence:legality",
      "variantTarget": 2,
      "setFlags": [
        "d-4:surface:legality_seen"
      ],
      "tags": [
        "cold",
        "evidence"
      ]
    },
    {
      "id": "workplace10:beat_v2:a:d-4:surface:evidence:legality:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "cornered",
      "line": "헤드카운트와 예산 때문에 제가 그렇게 말한 건 맞지만, 그때는 마지막 결정 전이라 보류 화면을 먼저 설명한 겁니다.",
      "behaviorHint": "자료 끝을 손가락으로 두드리며 부정의 속도를 늦춘다.",
      "applicableStates": [
        "S1",
        "S2"
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
          "workplace-10:a:d-4:denial:0"
        ],
        "forbidAtomIds": [
          "workplace-10:a:d-4:admission:1"
        ]
      },
      "weight": 3,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:evidence:legality",
      "coverageKey": "a:d-4:surface:early:evidence:legality",
      "variantTarget": 2,
      "setFlags": [
        "d-4:surface:legality_seen"
      ],
      "tags": [
        "cold",
        "evidence"
      ]
    },
    {
      "id": "workplace10:beat_v2:b:d-2:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "타사 계약서와 온보딩 메일, 겹치는 로그가 이미 존재합니다. 약속 파기의 피해와 별개로 숨긴 계약 책임이 빠져 있습니다.",
      "behaviorHint": "증거를 힐끗 보고 바로 시선을 피한다.",
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
          "frayed"
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
          "workplace-10:b:d-2:act:0"
        ],
        "forbidAtomIds": [
          "workplace-10:b:d-2:admission:0"
        ]
      },
      "weight": 3,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:evidence:identity",
      "coverageKey": "b:d-2:motive:mid:evidence:identity",
      "variantTarget": 2,
      "setFlags": [
        "d-2:motive:evidence_aired"
      ],
      "tags": [
        "cold",
        "evidence"
      ]
    },
    {
      "id": "workplace10:beat_v2:b:d-2:motive:evidence:identity:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "rebut",
      "line": "보험이라면 대기 자료에 그쳐야 하지만, 실제로는 평일 시간대의 출입·VPN 기록이 계약 기간과 맞물립니다. 준비를 넘은 병행 정황이 보입니다.",
      "behaviorHint": "자료 끝을 손가락으로 두드리며 부정의 속도를 늦춘다.",
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
          "frayed"
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
          "workplace-10:b:d-2:act:0"
        ],
        "forbidAtomIds": [
          "workplace-10:b:d-2:admission:0"
        ]
      },
      "weight": 3,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:evidence:identity",
      "coverageKey": "b:d-2:motive:mid:evidence:identity",
      "variantTarget": 2,
      "setFlags": [
        "d-2:motive:evidence_aired"
      ],
      "tags": [
        "cold",
        "evidence"
      ]
    },
    {
      "id": "workplace10:beat_v2:a:d-5:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "이번 한 번이 아니라 지난 두 차례 연장 메일과 1:1 문서까지 같은 방향의 잔류 유인이 반복됩니다. 단발성 격려로 보기 어렵습니다.",
      "behaviorHint": "증거를 힐끗 보고 바로 시선을 피한다.",
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
          "frayed"
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
          "workplace-10:a:d-5:act:0"
        ],
        "forbidAtomIds": [
          "workplace-10:a:d-5:admission:0"
        ]
      },
      "weight": 3,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:evidence:context",
      "coverageKey": "a:d-5:motive:mid:evidence:context",
      "variantTarget": 2,
      "setFlags": [
        "d-5:motive:evidence_aired"
      ],
      "tags": [
        "cold",
        "evidence"
      ]
    },
    {
      "id": "workplace10:beat_v2:a:d-5:motive:evidence:context:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "rebut",
      "line": "계약연장 메일이 반복된 건 인정합니다. 다만 마지막 결정이 없던 시기라 제가 관계를 유지하려고 말을 더 길게 한 겁니다.",
      "behaviorHint": "자료 끝을 손가락으로 두드리며 부정의 속도를 늦춘다.",
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
          "frayed"
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
          "workplace-10:a:d-5:act:0"
        ],
        "forbidAtomIds": [
          "workplace-10:a:d-5:admission:0"
        ]
      },
      "weight": 3,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:evidence:context",
      "coverageKey": "a:d-5:motive:mid:evidence:context",
      "variantTarget": 2,
      "setFlags": [
        "d-5:motive:evidence_aired"
      ],
      "tags": [
        "cold",
        "evidence"
      ]
    },
    {
      "id": "workplace10:beat_v2:b:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "mistaken_certainty",
      "line": "저는 약속 파기의 피해자입니다. 다른 선택지를 검토했다는 이유만으로 그 피해가 사라지지는 않습니다.",
      "behaviorHint": "확신하던 표정이 미세하게 흔들린다.",
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
          "workplace-10:b:d-3:identity:0"
        ],
        "forbidAtomIds": [
          "workplace-10:b:d-3:admission:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:identity",
      "coverageKey": "b:d-3:surface:early:trap:identity",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:misbelief_seen"
      ],
      "tags": [
        "trap"
      ]
    },
    {
      "id": "workplace10:beat_v2:b:d-3:surface:trap:identity:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confused_rebuttal",
      "line": "저는 약속 파기의 피해자입니다.",
      "behaviorHint": "같은 말을 반복하다가 특정 단어에서 멈칫한다.",
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
          "workplace-10:b:d-3:identity:0"
        ],
        "forbidAtomIds": [
          "workplace-10:b:d-3:admission:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:identity",
      "coverageKey": "b:d-3:surface:early:trap:identity",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:misbelief_seen"
      ],
      "tags": [
        "trap"
      ]
    },
    {
      "id": "workplace10:beat_v2:b:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "mistaken_certainty",
      "line": "저는 약속 파기의 피해자입니다. 다른 선택지를 검토했다는 이유만으로 그 피해가 사라지지는 않습니다.",
      "behaviorHint": "확신하던 표정이 미세하게 흔들린다.",
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
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-10:b:d-3:harm:0"
        ],
        "forbidAtomIds": [
          "workplace-10:b:d-3:admission:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:context",
      "coverageKey": "b:d-3:surface:early:trap:context",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:context_checked"
      ],
      "tags": [
        "trap"
      ]
    },
    {
      "id": "workplace10:beat_v2:b:d-3:surface:trap:context:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confused_rebuttal",
      "line": "저는 약속 파기의 피해자입니다.",
      "behaviorHint": "같은 말을 반복하다가 특정 단어에서 멈칫한다.",
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
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-10:b:d-3:harm:0"
        ],
        "forbidAtomIds": [
          "workplace-10:b:d-3:admission:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:context",
      "coverageKey": "b:d-3:surface:early:trap:context",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:context_checked"
      ],
      "tags": [
        "trap"
      ]
    },
    {
      "id": "workplace10:beat_v2:b:d-3:core:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "doubt",
      "line": "전환 무산 전에 다른 회사 계약이 있었다는 점은 맞습니다. 다만 그 계약을 들고 가게 만든 시작점은 반복된 약속과 지연이었습니다.",
      "behaviorHint": "확신하던 표정이 미세하게 흔들린다.",
      "applicableStates": [
        "M3",
        "M4"
      ],
      "layer": "core",
      "issueRole": "red_herring",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "frayed",
          "exposed"
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
          "workplace-10:b:d-3:timeline:0"
        ],
        "forbidAtomIds": [
          "workplace-10:b:d-3:admission:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:trap:context",
      "coverageKey": "b:d-3:core:late:trap:context",
      "variantTarget": 1,
      "setFlags": [
        "d-3:motive:misbelief_shaken"
      ],
      "tags": [
        "trap"
      ]
    },
    {
      "id": "workplace10:beat_v2:b:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "clarify",
      "line": "전환 무산 전에 다른 회사 계약이 있었다는 점은 맞습니다. 다만 그 계약을 들고 가게 만든 시작점은 반복된 약속과 지연이었습니다.",
      "behaviorHint": "확신하던 표정이 미세하게 흔들린다.",
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
          "frayed",
          "exposed"
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
          "workplace-10:b:d-3:counter:1"
        ],
        "forbidAtomIds": [
          "workplace-10:b:d-3:admission:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:trap:emotion",
      "coverageKey": "b:d-3:core:late:trap:emotion",
      "variantTarget": 1,
      "setFlags": [
        "d-3:core:clarified"
      ],
      "tags": [
        "trap"
      ]
    },
    {
      "id": "workplace10:beat_v2:a:d-1:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "fatigue_irritation",
      "line": "팀이 무너지기 직전이었어요. 그때 사람 하나 더 빠지면 진짜 런칭이 터졌습니다, 그래서 말을 바로 못 끊었습니다.",
      "behaviorHint": "짧게 끊어 말하며 피로와 짜증이 섞인다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-10:a:d-1:act:0"
        ],
        "forbidAtomIds": [
          "workplace-10:a:d-1:admission:1"
        ]
      },
      "weight": 3,
      "priority": 18,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:timeline",
      "coverageKey": "a:d-1:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "workplace10:beat_v2:a:d-1:motive:fatigue:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "fatigue_block",
      "line": "제가 기대를 키운 건 맞습니다. 다만 그 표현은 전환안을 올려 보겠다는 뜻이었고, 최종 승인은 남아 있었습니다.",
      "behaviorHint": "자세가 무너지고 목소리가 날카로워진다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-10:a:d-1:act:0"
        ],
        "forbidAtomIds": [
          "workplace-10:a:d-1:admission:1"
        ]
      },
      "weight": 3,
      "priority": 18,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:timeline",
      "coverageKey": "a:d-1:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "workplace10:beat_v2:a:d-1:motive:fatigue:timeline:03",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "fatigue_counter",
      "line": "제가 기대를 키운 건 맞습니다.",
      "behaviorHint": "말끝이 거칠어졌다가 곧바로 닫힌다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-10:a:d-1:act:0"
        ],
        "forbidAtomIds": [
          "workplace-10:a:d-1:admission:1"
        ]
      },
      "weight": 3,
      "priority": 18,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:timeline",
      "coverageKey": "a:d-1:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "workplace10:beat_v2:b:d-2:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "fatigue_irritation",
      "line": "제가 숨긴 건 맞아요. 그런데 그 숨김만 남기고 약속 파기를 다 지우려 하면, 저는 끝까지 이용만 당한 사람처럼 느껴집니다.",
      "behaviorHint": "짧게 끊어 말하며 피로와 짜증이 섞인다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-10:b:d-2:act:0"
        ],
        "forbidAtomIds": [
          "workplace-10:b:d-2:admission:0"
        ]
      },
      "weight": 3,
      "priority": 18,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:fatigue:responsibility",
      "coverageKey": "b:d-2:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "workplace10:beat_v2:b:d-2:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "fatigue_block",
      "line": "제가 다른 회사 계약서를 잡아 둔 건 맞습니다. 다만 그때는 전환이 될 수도 있다고 믿어서 실제 충돌을 가볍게 봤습니다.",
      "behaviorHint": "자세가 무너지고 목소리가 날카로워진다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-10:b:d-2:act:0"
        ],
        "forbidAtomIds": [
          "workplace-10:b:d-2:admission:0"
        ]
      },
      "weight": 3,
      "priority": 18,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:fatigue:responsibility",
      "coverageKey": "b:d-2:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "workplace10:beat_v2:b:d-2:motive:fatigue:responsibility:03",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "fatigue_counter",
      "line": "제가 다른 회사 계약서를 잡아 둔 건 맞습니다.",
      "behaviorHint": "말끝이 거칠어졌다가 곧바로 닫힌다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-10:b:d-2:act:0"
        ],
        "forbidAtomIds": [
          "workplace-10:b:d-2:admission:0"
        ]
      },
      "weight": 3,
      "priority": 18,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:fatigue:responsibility",
      "coverageKey": "b:d-2:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "workplace10:beat_v2:a:d-5:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "open_answer",
      "line": "저는 혜린 씨가 불안해한다는 걸 알면서도 구두 약속을 끊지 못했습니다. 그 말이 관계 유지 수단이라는 걸 알면서도 팀이 먼저라고 스스로 합리화했습니다.",
      "behaviorHint": "잠깐 침묵한 뒤 더 돌리지 않고 핵심만 꺼낸다.",
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
        "free_question"
      ],
      "conditions": {
        "emotionTiers": [
          "frayed",
          "exposed"
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
          "workplace-10:a:d-5:fear:0"
        ],
        "forbidAtomIds": [
          "workplace-10:a:d-5:admission:0"
        ]
      },
      "weight": 3,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:motive:motive",
      "coverageKey": "a:d-5:core:late:motive:motive",
      "variantTarget": 2,
      "setFlags": [],
      "tags": [
        "free_question"
      ]
    },
    {
      "id": "workplace10:beat_v2:a:d-5:core:motive:motive:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "open_answer",
      "line": "저는 혜린 씨가 불안해한다는 걸 알면서도 구두 약속을 끊지 못했습니다.",
      "behaviorHint": "질문의 의도를 인정하듯 짧게 한숨을 쉬고 답한다.",
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
        "free_question"
      ],
      "conditions": {
        "emotionTiers": [
          "frayed",
          "exposed"
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
          "workplace-10:a:d-5:fear:0"
        ],
        "forbidAtomIds": [
          "workplace-10:a:d-5:admission:0"
        ]
      },
      "weight": 3,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:motive:motive",
      "coverageKey": "a:d-5:core:late:motive:motive",
      "variantTarget": 2,
      "setFlags": [],
      "tags": [
        "free_question"
      ]
    },
    {
      "id": "workplace10:beat_v2:b:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "emotional_open",
      "line": "저는 약속이 또 미뤄질까 두려워 disclosure를 계속 뒤로 미뤘습니다. 그게 결국 관계를 연명시키는 방식이 됐다는 것도 알고 있습니다.",
      "behaviorHint": "잠깐 침묵한 뒤 더 돌리지 않고 핵심만 꺼낸다.",
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
        "free_question"
      ],
      "conditions": {
        "emotionTiers": [
          "frayed",
          "exposed"
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
          "workplace-10:b:d-5:fear:1"
        ],
        "forbidAtomIds": [
          "workplace-10:b:d-5:admission:0"
        ]
      },
      "weight": 3,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:rapport:emotion",
      "coverageKey": "b:d-5:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [],
      "tags": [
        "free_question"
      ]
    },
    {
      "id": "workplace10:beat_v2:b:d-5:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "emotional_open",
      "line": "저는 약속이 또 미뤄질까 두려워 disclosure를 계속 뒤로 미뤘습니다.",
      "behaviorHint": "질문의 의도를 인정하듯 짧게 한숨을 쉬고 답한다.",
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
        "free_question"
      ],
      "conditions": {
        "emotionTiers": [
          "frayed",
          "exposed"
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
          "workplace-10:b:d-5:fear:1"
        ],
        "forbidAtomIds": [
          "workplace-10:b:d-5:admission:0"
        ]
      },
      "weight": 3,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:rapport:emotion",
      "coverageKey": "b:d-5:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [],
      "tags": [
        "free_question"
      ]
    },
    {
      "id": "workplace10:beat_v2:a:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject_allow",
      "line": "팀 공백이 바로 눈앞이었고, 저는 그 공백을 막는 말부터 골랐습니다. 그게 약속처럼 들린다는 걸 알면서도요.",
      "behaviorHint": "허용받자 체면보다 불안을 먼저 꺼내며 속도를 늦춘다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "opening"
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
          "workplace-10:a:d-1:act:0"
        ],
        "forbidAtomIds": [
          "workplace-10:a:d-1:admission:1"
        ]
      },
      "weight": 5,
      "priority": 25,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-1:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 1,
      "setFlags": [],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "workplace10:beat_v2:b:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interject_allow",
      "line": "저는 그 문장을 믿고 밤 교육과 인수인계를 버텼습니다. 끝에 가서 기준이 바뀐 순간이 제일 견디기 어려웠어요.",
      "behaviorHint": "일정을 떠올리듯 손끝을 떨다가 마지막 문장에서 목소리가 깊어진다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "opening"
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
          "workplace-10:b:d-1:context:0"
        ],
        "forbidAtomIds": [
          "workplace-10:b:d-1:threshold:0"
        ]
      },
      "weight": 5,
      "priority": 25,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-1:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 1,
      "setFlags": [],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "workplace10:beat_v2:a:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "interject_block",
      "line": "제가 붙잡아 둔 건 압니다. 그렇다고 그 기간 내내 저만 계산하고 있었던 것처럼 말하면 버티기 어렵습니다.",
      "behaviorHint": "말이 잘린 뒤 억울함이 섞인 숨을 한번 밀어낸다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "opening"
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
          "workplace-10:a:d-5:act:0"
        ],
        "forbidAtomIds": [
          "workplace-10:a:d-5:admission:0"
        ]
      },
      "weight": 5,
      "priority": 23,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-5:surface:mid:interjection:emotional_only:block",
      "variantTarget": 1,
      "setFlags": [],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "workplace10:beat_v2:b:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "interject_block",
      "line": "제가 숨긴 사정이 있었다고 해도, 불안을 이용당했다는 느낌까지 사라지는 건 아닙니다.",
      "behaviorHint": "끊긴 말 위로 감정이 한 번 더 겹쳐진다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "opening"
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
          "workplace-10:b:d-5:privacy:0"
        ],
        "forbidAtomIds": [
          "workplace-10:b:d-5:admission:0"
        ]
      },
      "weight": 5,
      "priority": 23,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-5:surface:mid:interjection:emotional_only:block",
      "variantTarget": 1,
      "setFlags": [],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "workplace10:beat_v2:a:d-4:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "interject_allow",
      "line": "보류 캡처만 본 건 맞지만, 그 시점의 슬롯 상태와 코멘트 흐름을 같이 봐야 합니다. 단순 폐쇄처럼만 읽히진 않았습니다.",
      "behaviorHint": "상태값과 코멘트 순서를 또박또박 짚는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "identity",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "frayed"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "opening"
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
          "workplace-10:a:d-4:evidence:1"
        ],
        "forbidAtomIds": [
          "workplace-10:a:d-4:admission:1"
        ]
      },
      "weight": 4,
      "priority": 25,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-4:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 1,
      "setFlags": [],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "workplace10:beat_v2:b:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject_allow",
      "line": "계약 체결일과 실제 겹침 시간대는 구분해서 보셔야 합니다. 숨긴 책임과 실제 병행 범위가 완전히 같은 말은 아닙니다.",
      "behaviorHint": "날짜와 범위를 선 긋듯 분리해 말한다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "identity",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "frayed"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "opening"
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
          "workplace-10:b:d-2:act:0"
        ],
        "forbidAtomIds": [
          "workplace-10:b:d-2:admission:0"
        ]
      },
      "weight": 4,
      "priority": 25,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-2:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 1,
      "setFlags": [],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "workplace10:beat_v2:a:d-4:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "interject_block",
      "line": "추가요청 가능이 살아 있었다는 건 압니다. 그래서 더더욱 제 코멘트가 먼저 들어간 순서를 봐야 합니다.",
      "behaviorHint": "말을 끊긴 직후 시점 하나를 집요하게 붙든다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "identity",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "frayed"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "opening"
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
          "workplace-10:a:d-4:evidence:1"
        ],
        "forbidAtomIds": [
          "workplace-10:a:d-4:admission:1"
        ]
      },
      "weight": 4,
      "priority": 23,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-4:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 1,
      "setFlags": [],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "workplace10:beat_v2:b:d-2:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject_block",
      "line": "VPN 겹침이 있다고 바로 근무 전체를 덮어쓰지 마세요. 그 시간대별 실제 작업량과 계약 범위를 같이 봐야 합니다.",
      "behaviorHint": "짧고 단단하게 반박하며 범위 축소를 시도한다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "identity",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "frayed"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "opening"
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
          "workplace-10:b:d-2:act:0"
        ],
        "forbidAtomIds": [
          "workplace-10:b:d-2:admission:0"
        ]
      },
      "weight": 4,
      "priority": 23,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-2:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 1,
      "setFlags": [],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "workplace10:beat_v2:b:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject_allow",
      "line": "그때 제 위치에선 전환을 믿고 버틴 피해자 말고 다른 서사를 꺼낼 여유가 없었습니다. 그래서 더 강하게 그 자리로 숨었습니다.",
      "behaviorHint": "피해 서사를 붙들며 스스로의 왜곡을 일부 드러낸다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "red_herring",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "frayed"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "opening"
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
          "workplace-10:b:d-3:counter:0"
        ],
        "forbidAtomIds": [
          "workplace-10:b:d-3:admission:0"
        ]
      },
      "weight": 5,
      "priority": 25,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 1,
      "setFlags": [],
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
      "id": "workplace10:beat_v2:b:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject_block",
      "line": "숨긴 계약이 있다고 해서 제가 받은 약속 피해까지 가벼워지는 건 아니라고 계속 믿고 있었습니다. 그 믿음이 너무 단단했습니다.",
      "behaviorHint": "끊긴 직후에도 피해 프레임을 놓지 못하는 태도가 남는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "red_herring",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "frayed"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "opening"
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
          "workplace-10:b:d-3:counter:0"
        ],
        "forbidAtomIds": [
          "workplace-10:b:d-3:admission:0"
        ]
      },
      "weight": 5,
      "priority": 23,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 1,
      "setFlags": [],
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
      "id": "workplace10:beat_v2:a:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject_allow",
      "line": "잘린 보류 화면 하나만 보면 누구라도 “어쩔 수 없었다”는 쪽으로 기울 수 있습니다. 그게 이 사건의 가장 위험한 착시입니다.",
      "behaviorHint": "자료 한 장의 프레임 효과를 조심스럽게 경고한다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "red_herring",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "frayed"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "opening"
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
          "M1"
        ],
        "trapStates": [
          "cropped_capture",
          "missing_comment"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-10:a:d-3:counter:0"
        ],
        "forbidAtomIds": [
          "workplace-10:a:d-3:threshold:0"
        ]
      },
      "weight": 5,
      "priority": 25,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:trap_signal:allow",
      "variantTarget": 1,
      "setFlags": [],
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
      "id": "workplace10:beat_v2:b:d-3:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-10",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject_block",
      "line": "구두 약속만 길게 읽히면 저 역시 순수 피해자로만 보일 겁니다. 그 장면도 사실은 덜 보여 준 일부였습니다.",
      "behaviorHint": "자르려는 흐름 속에서 자기 서사도 함정이 될 수 있음을 인정한다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "red_herring",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "frayed"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "opening"
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
        ],
        "trapStates": [
          "promise_only_frame"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-10:b:d-3:counter:0"
        ],
        "forbidAtomIds": [
          "workplace-10:b:d-3:admission:0"
        ]
      },
      "weight": 5,
      "priority": 23,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:trap_signal:block",
      "variantTarget": 1,
      "setFlags": [],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "trap_signal",
        "red_herring"
      ],
      "beliefMode": "weaponizes"
    }
  ]
} as const;

export default workplace10BeatsV2Full;
