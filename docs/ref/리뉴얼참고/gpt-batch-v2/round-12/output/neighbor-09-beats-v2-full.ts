export const neighbor09BeatsV2Full = {
  "caseId": "neighbor-09",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 60,
    "byActionFamily": {
      "question": 28,
      "free_question": 4,
      "evidence": 4,
      "fatigue": 12,
      "interjection": 12
    },
    "byResponseIntent": {
      "pressure_response": 16,
      "motive_response": 6,
      "rapport_response": 10,
      "trap_confusion_response": 12,
      "evidence_response": 4,
      "fatigue_response": 12
    },
    "byIssueRole": {
      "core_truth": 40,
      "shared_misconception": 12,
      "sub_truth": 8
    },
    "byDisputeId": {
      "d-1": 20,
      "d-5": 20,
      "d-3": 12,
      "d-2": 4,
      "d-4": 4
    },
    "interjectionByInfoLevel": {
      "emotional_only": 4,
      "detail_rebuttal": 4,
      "misbelief_escalation": 4
    },
    "matrixChecks": {
      "question_early_timeline": true,
      "question_early_identity_or_context": true,
      "question_mid_responsibility": true,
      "question_mid_motive": true,
      "question_late_emotion": true,
      "evidence_early_or_mid_context_identity_legality": true,
      "fatigue_mid_responsibility_or_timeline": true,
      "free_question_late_motive_or_emotion": true,
      "interjection_emotional_only_allow_block": true,
      "interjection_detail_rebuttal_allow_block": true,
      "interjection_misbelief_or_trap_if_needed": true,
      "trap_early_identity_or_context": true,
      "trap_late_context_or_emotion": true
    }
  },
  "beats": [
    {
      "id": "neighbor09:beat_v2:a:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "공사 전 관리사무소 중재 자리에서 잔여 공사비는 반반으로 간다고 들었습니다.",
      "behaviorHint": "즉답보다 순서와 표현을 길게 늘어놓으며 핵심을 늦춘다.",
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
          "neighbor09:a:d-1:rule:0",
          "neighbor09:a:d-1:threshold:0"
        ],
        "forbidAtomIds": [
          "neighbor09:a:d-1:admission:0",
          "neighbor09:a:d-1:emotion:0"
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
      "id": "neighbor09:beat_v2:a:d-1:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "제 이해로는 200만 원 안이면 다시 따로 합의하지 않고 그대로 가는 구조였습니다.",
      "behaviorHint": "즉답보다 순서와 표현을 길게 늘어놓으며 핵심을 늦춘다.",
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
          "neighbor09:a:d-1:rule:0",
          "neighbor09:a:d-1:threshold:0"
        ],
        "forbidAtomIds": [
          "neighbor09:a:d-1:admission:0",
          "neighbor09:a:d-1:emotion:0"
        ]
      },
      "weight": 6,
      "priority": 30,
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
      "id": "neighbor09:beat_v2:a:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "counter",
      "line": "시공이 끝난 뒤에는 지훈 씨가 '내 바닥 구간만 계산하자'고 하면서 처음 기준을 바꿨습니다.",
      "behaviorHint": "부분 인정과 반발을 섞어 책임선을 다시 그으려 든다.",
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
          "neighbor09:a:d-1:institution:0",
          "neighbor09:a:d-1:responsibility:0",
          "neighbor09:a:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor09:a:d-1:admission:0",
          "neighbor09:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:pressure:responsibility",
      "coverageKey": "a:d-1:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-1:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "neighbor09:beat_v2:a:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "저는 그 기준이 확인됐기 때문에 방학 전 공사를 진행해도 된다고 판단했습니다.",
      "behaviorHint": "부분 인정과 반발을 섞어 책임선을 다시 그으려 든다.",
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
          "neighbor09:a:d-1:institution:0",
          "neighbor09:a:d-1:responsibility:0",
          "neighbor09:a:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor09:a:d-1:admission:0",
          "neighbor09:a:d-1:unlock:s5:0"
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
      "id": "neighbor09:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "공사가 다 끝난 뒤에 약속이 바뀌니까 제가 참아 온 시간과 기록이 통째로 부정되는 기분이었습니다.",
      "behaviorHint": "버티다가 감정이 먼저 새어 나오고 목소리가 낮아진다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor09:a:d-1:emotion:0",
          "neighbor09:a:d-1:admission:0",
          "neighbor09:a:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor09:a:d-1:rule:0",
          "neighbor09:a:d-1:threshold:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-1:core:emotion_opened"
      ],
      "tags": [
        "late"
      ]
    },
    {
      "id": "neighbor09:beat_v2:a:d-1:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confess",
      "line": "굳이 더 말하자면, 반반 합의는 분명했고, 30만 원만 보내겠다는 메시지로 지훈 씨가 그 약속을 실제로 뒤집은 게 맞습니다.",
      "behaviorHint": "정형 질문보다 더 사적인 속내를 조심스럽게 꺼낸다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "motive_response",
      "angleTag": "motive",
      "actionFamily": "free_question",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "strained",
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor09:a:d-1:emotion:0",
          "neighbor09:a:d-1:admission:0",
          "neighbor09:a:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor09:a:d-1:rule:0",
          "neighbor09:a:d-1:threshold:0"
        ]
      },
      "weight": 4,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:motive:motive",
      "coverageKey": "a:d-1:core:late:motive:motive",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:free_disclosed"
      ],
      "tags": [
        "late_probe",
        "free_question"
      ]
    },
    {
      "id": "neighbor09:beat_v2:b:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "반반으로 확정한 게 아니라 일단 상황을 보자는 취지였습니다.",
      "behaviorHint": "즉답보다 순서와 표현을 길게 늘어놓으며 핵심을 늦춘다.",
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
          "neighbor09:b:d-1:denial:0",
          "neighbor09:b:d-1:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor09:b:d-1:admission:0",
          "neighbor09:b:d-1:fear:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:timeline",
      "coverageKey": "b:d-1:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "neighbor09:beat_v2:b:d-1:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "제 기억에는 200만 원 안이면 다시 보자는 정도였지 바로 확정으로 못 박은 건 아니었습니다.",
      "behaviorHint": "즉답보다 순서와 표현을 길게 늘어놓으며 핵심을 늦춘다.",
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
          "neighbor09:b:d-1:denial:0",
          "neighbor09:b:d-1:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor09:b:d-1:admission:0",
          "neighbor09:b:d-1:fear:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:context",
      "coverageKey": "b:d-1:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "neighbor09:beat_v2:b:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "counter",
      "line": "아랫집 천장 요구가 붙으면서 처음 이야기와 달라졌다고 느껴서 제 바닥 구간만 계산하자고 한 겁니다.",
      "behaviorHint": "부분 인정과 반발을 섞어 책임선을 다시 그으려 든다.",
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
          "neighbor09:b:d-1:context:0",
          "neighbor09:b:d-1:counter:0",
          "neighbor09:b:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor09:b:d-1:admission:0",
          "neighbor09:b:d-1:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:pressure:responsibility",
      "coverageKey": "b:d-1:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-1:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "neighbor09:beat_v2:b:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "반반 얘기가 나온 건 맞지만 추가 항목 없이 처음 계획대로 끝난다는 전제가 깔린 줄 알았습니다.",
      "behaviorHint": "부분 인정과 반발을 섞어 책임선을 다시 그으려 든다.",
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
          "neighbor09:b:d-1:context:0",
          "neighbor09:b:d-1:counter:0",
          "neighbor09:b:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor09:b:d-1:admission:0",
          "neighbor09:b:d-1:unlock:s5:0"
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
        "d-1:motive:motive_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "neighbor09:beat_v2:b:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "공사가 다 끝난 뒤 금액이 커 보이니까 겁이 나서 선뜻 인정하지 못했습니다.",
      "behaviorHint": "버티다가 감정이 먼저 새어 나오고 목소리가 낮아진다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor09:b:d-1:fear:0",
          "neighbor09:b:d-1:admission:0",
          "neighbor09:b:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor09:b:d-1:denial:0",
          "neighbor09:b:d-1:uncertainty:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:rapport:emotion",
      "coverageKey": "b:d-1:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-1:core:emotion_opened"
      ],
      "tags": [
        "late"
      ]
    },
    {
      "id": "neighbor09:beat_v2:b:d-1:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confess",
      "line": "굳이 더 말하자면, 원래 반반 합의가 있었는데 제가 30만 원만 보내며 사실상 그 약속을 뒤집은 게 맞습니다.",
      "behaviorHint": "정형 질문보다 더 사적인 속내를 조심스럽게 꺼낸다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "motive_response",
      "angleTag": "motive",
      "actionFamily": "free_question",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "strained",
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor09:b:d-1:fear:0",
          "neighbor09:b:d-1:admission:0",
          "neighbor09:b:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor09:b:d-1:denial:0",
          "neighbor09:b:d-1:uncertainty:0"
        ]
      },
      "weight": 4,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:motive:motive",
      "coverageKey": "b:d-1:core:late:motive:motive",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:free_disclosed"
      ],
      "tags": [
        "late_probe",
        "free_question"
      ]
    },
    {
      "id": "neighbor09:beat_v2:a:d-5:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "저는 공식 공지 전에 일을 키우려던 게 아니라 답이 너무 늦어서 상황을 적은 정도였습니다.",
      "behaviorHint": "즉답보다 순서와 표현을 길게 늘어놓으며 핵심을 늦춘다.",
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
          "neighbor09:a:d-5:self_justification:0",
          "neighbor09:a:d-5:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor09:a:d-5:admission:0",
          "neighbor09:a:d-5:emotion:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:pressure:timeline",
      "coverageKey": "a:d-5:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-5:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "neighbor09:beat_v2:a:d-5:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "순서를 어긴 건 맞아도 그 글이 그렇게 큰 압박으로 번질 줄은 몰랐습니다.",
      "behaviorHint": "즉답보다 순서와 표현을 길게 늘어놓으며 핵심을 늦춘다.",
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
          "neighbor09:a:d-5:self_justification:0",
          "neighbor09:a:d-5:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor09:a:d-5:admission:0",
          "neighbor09:a:d-5:emotion:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:pressure:context",
      "coverageKey": "a:d-5:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-5:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "neighbor09:beat_v2:a:d-5:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "counter",
      "line": "제 글이 먼저 올라간 건 사실이지만 그 무렵 지훈 씨도 공지 전에 30만 원만 보내고 버티고 있었습니다.",
      "behaviorHint": "부분 인정과 반발을 섞어 책임선을 다시 그으려 든다.",
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
          "neighbor09:a:d-5:context:0",
          "neighbor09:a:d-5:counter:0",
          "neighbor09:a:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor09:a:d-5:admission:0",
          "neighbor09:a:d-5:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:pressure:responsibility",
      "coverageKey": "a:d-5:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "neighbor09:beat_v2:a:d-5:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "공지 전에 글을 올린 건 사실이지만 관리실 안내가 또 밀릴까 봐 불안해서 그랬습니다.",
      "behaviorHint": "부분 인정과 반발을 섞어 책임선을 다시 그으려 든다.",
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
          "neighbor09:a:d-5:context:0",
          "neighbor09:a:d-5:counter:0",
          "neighbor09:a:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor09:a:d-5:admission:0",
          "neighbor09:a:d-5:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:motive:motive",
      "coverageKey": "a:d-5:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:motive_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "neighbor09:beat_v2:a:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "emotional",
      "line": "녹음 일정이 계속 밀리니까 더 기다리면 또 묻힐까 봐 겁이 나서 글을 올렸습니다.",
      "behaviorHint": "버티다가 감정이 먼저 새어 나오고 목소리가 낮아진다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor09:a:d-5:emotion:0",
          "neighbor09:a:d-5:admission:0",
          "neighbor09:a:d-5:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor09:a:d-5:self_justification:0",
          "neighbor09:a:d-5:uncertainty:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:rapport:emotion",
      "coverageKey": "a:d-5:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-5:core:emotion_opened"
      ],
      "tags": [
        "late"
      ]
    },
    {
      "id": "neighbor09:beat_v2:a:d-5:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confess",
      "line": "정형 질문이 아니라면 녹음 일정이 계속 밀리니까 더 기다리면 또 묻힐까 봐 겁이 나서 글을 올렸습니다.",
      "behaviorHint": "정형 질문보다 더 사적인 속내를 조심스럽게 꺼낸다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "free_question",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "strained",
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor09:a:d-5:emotion:0",
          "neighbor09:a:d-5:admission:0",
          "neighbor09:a:d-5:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor09:a:d-5:self_justification:0",
          "neighbor09:a:d-5:uncertainty:0"
        ]
      },
      "weight": 4,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:rapport:emotion",
      "coverageKey": "a:d-5:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-5:core:free_disclosed"
      ],
      "tags": [
        "late_probe",
        "free_question"
      ]
    },
    {
      "id": "neighbor09:beat_v2:b:d-5:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "관리실 공지 전에는 저도 최종 금액을 인정한 적 없고, 30만 원은 일단 제 구간만 보낸 겁니다.",
      "behaviorHint": "즉답보다 순서와 표현을 길게 늘어놓으며 핵심을 늦춘다.",
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
          "neighbor09:b:d-5:denial:0",
          "neighbor09:b:d-5:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor09:b:d-5:admission:0",
          "neighbor09:b:d-5:fear:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:pressure:timeline",
      "coverageKey": "b:d-5:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-5:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "neighbor09:beat_v2:b:d-5:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "공지가 늦으니 일부라도 보낸 건데 그걸 바로 지급 거부로만 보는 건 억울했습니다.",
      "behaviorHint": "즉답보다 순서와 표현을 길게 늘어놓으며 핵심을 늦춘다.",
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
          "neighbor09:b:d-5:denial:0",
          "neighbor09:b:d-5:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor09:b:d-5:admission:0",
          "neighbor09:b:d-5:fear:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:pressure:context",
      "coverageKey": "b:d-5:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-5:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "neighbor09:beat_v2:b:d-5:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "counter",
      "line": "하지만 그 전에 연우 씨가 주민앱에 먼저 글을 올려 버려서 저도 방어적으로 굴었습니다.",
      "behaviorHint": "부분 인정과 반발을 섞어 책임선을 다시 그으려 든다.",
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
          "neighbor09:b:d-5:act:0",
          "neighbor09:b:d-5:counter:0",
          "neighbor09:b:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor09:b:d-5:admission:0",
          "neighbor09:b:d-5:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:pressure:responsibility",
      "coverageKey": "b:d-5:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "neighbor09:beat_v2:b:d-5:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "제가 공식 공지 19분 전에 30만 원을 보낸 건 맞습니다.",
      "behaviorHint": "부분 인정과 반발을 섞어 책임선을 다시 그으려 든다.",
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
          "neighbor09:b:d-5:act:0",
          "neighbor09:b:d-5:counter:0",
          "neighbor09:b:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor09:b:d-5:admission:0",
          "neighbor09:b:d-5:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:motive:motive",
      "coverageKey": "b:d-5:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:motive_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "neighbor09:beat_v2:b:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "emotional",
      "line": "아이 얘기까지 퍼질까 봐 겁나서 전액 송금을 더 미뤘습니다.",
      "behaviorHint": "버티다가 감정이 먼저 새어 나오고 목소리가 낮아진다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor09:b:d-5:fear:0",
          "neighbor09:b:d-5:admission:0",
          "neighbor09:b:d-5:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor09:b:d-5:denial:0",
          "neighbor09:b:d-5:uncertainty:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:rapport:emotion",
      "coverageKey": "b:d-5:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-5:core:emotion_opened"
      ],
      "tags": [
        "late"
      ]
    },
    {
      "id": "neighbor09:beat_v2:b:d-5:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confess",
      "line": "정형 질문이 아니라면 아이 얘기까지 퍼질까 봐 겁나서 전액 송금을 더 미뤘습니다.",
      "behaviorHint": "정형 질문보다 더 사적인 속내를 조심스럽게 꺼낸다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "free_question",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "strained",
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor09:b:d-5:fear:0",
          "neighbor09:b:d-5:admission:0",
          "neighbor09:b:d-5:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor09:b:d-5:denial:0",
          "neighbor09:b:d-5:uncertainty:0"
        ]
      },
      "weight": 4,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:rapport:emotion",
      "coverageKey": "b:d-5:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-5:core:free_disclosed"
      ],
      "tags": [
        "late_probe",
        "free_question"
      ]
    },
    {
      "id": "neighbor09:beat_v2:a:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "mistaken",
      "line": "문제의 시작은 윗집 바닥 충격이고 제 천장은 그냥 피해를 받는 쪽이라고 생각했습니다.",
      "behaviorHint": "즉답보다 순서와 표현을 길게 늘어놓으며 핵심을 늦춘다.",
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
          "neighbor09:a:d-3:denial:0",
          "neighbor09:a:d-3:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor09:a:d-3:admission:0",
          "neighbor09:a:d-3:fear:0"
        ]
      },
      "weight": 5,
      "priority": 25,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:identity",
      "coverageKey": "a:d-3:surface:early:trap:identity",
      "variantTarget": 4,
      "setFlags": [
        "d-3:surface:misbelief_named"
      ],
      "tags": [
        "misbelief",
        "trap"
      ]
    },
    {
      "id": "neighbor09:beat_v2:a:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "mistaken",
      "line": "공진 얘기가 아예 없었던 건 아니지만 처음부터 체감된 건 윗집 소음이라 그렇게 본 겁니다.",
      "behaviorHint": "즉답보다 순서와 표현을 길게 늘어놓으며 핵심을 늦춘다.",
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
          "neighbor09:a:d-3:denial:0",
          "neighbor09:a:d-3:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor09:a:d-3:admission:0",
          "neighbor09:a:d-3:fear:0"
        ]
      },
      "weight": 5,
      "priority": 25,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:context",
      "coverageKey": "a:d-3:surface:early:trap:context",
      "variantTarget": 4,
      "setFlags": [
        "d-3:surface:misbelief_named"
      ],
      "tags": [
        "misbelief",
        "trap"
      ]
    },
    {
      "id": "neighbor09:beat_v2:a:d-3:core:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "doubt",
      "line": "그래도 그 공진이 커진 건 윗집 충격이 반복됐기 때문이라 제 쪽 구조만 따로 떼어 탓할 일은 아니라고 봅니다.",
      "behaviorHint": "버티다가 감정이 먼저 새어 나오고 목소리가 낮아진다.",
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
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "strained",
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor09:a:d-3:fear:0",
          "neighbor09:a:d-3:admission:0",
          "neighbor09:a:d-3:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor09:a:d-3:denial:0",
          "neighbor09:a:d-3:uncertainty:0"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:trap:context",
      "coverageKey": "a:d-3:core:late:trap:context",
      "variantTarget": 3,
      "setFlags": [
        "d-3:core:misbelief_cracked"
      ],
      "tags": [
        "misbelief",
        "trap"
      ]
    },
    {
      "id": "neighbor09:beat_v2:a:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "clarify",
      "line": "예민한 아래층으로만 보일까 봐 제 구조 문제 얘기를 먼저 못 꺼냈습니다.",
      "behaviorHint": "버티다가 감정이 먼저 새어 나오고 목소리가 낮아진다.",
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
          "strained",
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor09:a:d-3:fear:0",
          "neighbor09:a:d-3:admission:0",
          "neighbor09:a:d-3:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor09:a:d-3:denial:0",
          "neighbor09:a:d-3:uncertainty:0"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:trap:emotion",
      "coverageKey": "a:d-3:core:late:trap:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-3:core:clarity_opened"
      ],
      "tags": [
        "misbelief",
        "trap"
      ]
    },
    {
      "id": "neighbor09:beat_v2:b:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "mistaken",
      "line": "소음을 전부 제 바닥 문제로만 몰아가는 건 과하다고 봤습니다.",
      "behaviorHint": "즉답보다 순서와 표현을 길게 늘어놓으며 핵심을 늦춘다.",
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
          "neighbor09:b:d-3:denial:0",
          "neighbor09:b:d-3:evidence:0"
        ],
        "forbidAtomIds": [
          "neighbor09:b:d-3:admission:0",
          "neighbor09:b:d-3:fear:0"
        ]
      },
      "weight": 5,
      "priority": 25,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:identity",
      "coverageKey": "b:d-3:surface:early:trap:identity",
      "variantTarget": 4,
      "setFlags": [
        "d-3:surface:misbelief_named"
      ],
      "tags": [
        "misbelief",
        "trap"
      ]
    },
    {
      "id": "neighbor09:beat_v2:b:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "mistaken",
      "line": "측정표를 보면 아래층 특정 천장 줄이 같이 울리는 걸로 찍혀 있었습니다.",
      "behaviorHint": "즉답보다 순서와 표현을 길게 늘어놓으며 핵심을 늦춘다.",
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
          "neighbor09:b:d-3:denial:0",
          "neighbor09:b:d-3:evidence:0"
        ],
        "forbidAtomIds": [
          "neighbor09:b:d-3:admission:0",
          "neighbor09:b:d-3:fear:0"
        ]
      },
      "weight": 5,
      "priority": 25,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:context",
      "coverageKey": "b:d-3:surface:early:trap:context",
      "variantTarget": 4,
      "setFlags": [
        "d-3:surface:misbelief_named"
      ],
      "tags": [
        "misbelief",
        "trap"
      ]
    },
    {
      "id": "neighbor09:beat_v2:b:d-3:core:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "doubt",
      "line": "제 생활소음 책임은 인정하지만 구조 공진까지 제 단독 과실로 볼 수는 없습니다.",
      "behaviorHint": "버티다가 감정이 먼저 새어 나오고 목소리가 낮아진다.",
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
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "strained",
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor09:b:d-3:fear:0",
          "neighbor09:b:d-3:admission:0",
          "neighbor09:b:d-3:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor09:b:d-3:denial:0",
          "neighbor09:b:d-3:evidence:0"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:trap:context",
      "coverageKey": "b:d-3:core:late:trap:context",
      "variantTarget": 3,
      "setFlags": [
        "d-3:core:misbelief_cracked"
      ],
      "tags": [
        "misbelief",
        "trap"
      ]
    },
    {
      "id": "neighbor09:beat_v2:b:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "clarify",
      "line": "아이 발소리 문제로만 찍히는 게 싫어서 구조 얘기를 더 세게 하게 됐습니다.",
      "behaviorHint": "버티다가 감정이 먼저 새어 나오고 목소리가 낮아진다.",
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
          "strained",
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor09:b:d-3:fear:0",
          "neighbor09:b:d-3:admission:0",
          "neighbor09:b:d-3:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor09:b:d-3:denial:0",
          "neighbor09:b:d-3:evidence:0"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:trap:emotion",
      "coverageKey": "b:d-3:core:late:trap:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-3:core:clarity_opened"
      ],
      "tags": [
        "misbelief",
        "trap"
      ]
    },
    {
      "id": "neighbor09:beat_v2:a:d-2:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "rebut",
      "line": "측정표와 현장 사진를 봐도 공진이 특히 심한 줄이 있어서 침실 천장 쪽 한 줄 보완을 요청한 건 사실입니다.",
      "behaviorHint": "증거를 보고 잠깐 멈칫한 뒤 해석 범위를 좁히려 한다.",
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
          "neighbor09:a:d-2:self_justification:0",
          "neighbor09:a:d-2:uncertainty:0",
          "neighbor09:a:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor09:a:d-2:admission:0",
          "neighbor09:a:d-2:emotion:0"
        ]
      },
      "weight": 7,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:evidence:legality",
      "coverageKey": "a:d-2:surface:early:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:evidence_shown"
      ],
      "tags": [
        "sub_evidence",
        "evidence"
      ]
    },
    {
      "id": "neighbor09:beat_v2:b:d-2:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "rebut",
      "line": "측정표와 현장 사진를 봐도 그 추가 요청 때문에 자재와 인건비가 18만 원 더 들어간 건 맞습니다.",
      "behaviorHint": "증거를 보고 잠깐 멈칫한 뒤 해석 범위를 좁히려 한다.",
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
          "neighbor09:b:d-2:act:0",
          "neighbor09:b:d-2:context:0",
          "neighbor09:b:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor09:b:d-2:admission:0",
          "neighbor09:b:d-2:emotion:0"
        ]
      },
      "weight": 7,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:evidence:legality",
      "coverageKey": "b:d-2:surface:early:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:evidence_shown"
      ],
      "tags": [
        "sub_evidence",
        "evidence"
      ]
    },
    {
      "id": "neighbor09:beat_v2:a:d-4:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "rebut",
      "line": "정산서와 보전금 전표까지 나오면 그래서 각 세대 92만 원이 계산상 맞고, 이미 보낸 돈이 있으면 거기서 차감하면 된다고 봤습니다.",
      "behaviorHint": "증거를 보고 잠깐 멈칫한 뒤 해석 범위를 좁히려 한다.",
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
          "neighbor09:a:d-4:evidence:0",
          "neighbor09:a:d-4:rule:0",
          "neighbor09:a:d-4:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor09:a:d-4:admission:0",
          "neighbor09:a:d-4:unlock:s5:0"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:evidence:legality",
      "coverageKey": "a:d-4:motive:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-4:motive:evidence_shown"
      ],
      "tags": [
        "sub_evidence",
        "evidence"
      ]
    },
    {
      "id": "neighbor09:beat_v2:b:d-4:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "rebut",
      "line": "정산서와 보전금 전표까지 나오면 그래도 그 안에는 아래층 추가 요청 몫이 섞여 있다고 생각해서 그대로 92만 원을 내기 싫었습니다.",
      "behaviorHint": "증거를 보고 잠깐 멈칫한 뒤 해석 범위를 좁히려 한다.",
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
          "neighbor09:b:d-4:evidence:0",
          "neighbor09:b:d-4:counter:0",
          "neighbor09:b:d-4:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor09:b:d-4:admission:0",
          "neighbor09:b:d-4:unlock:s5:0"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:motive:evidence:legality",
      "coverageKey": "b:d-4:motive:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-4:motive:evidence_shown"
      ],
      "tags": [
        "sub_evidence",
        "evidence"
      ]
    },
    {
      "id": "neighbor09:beat_v2:a:d-1:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "irritation",
      "line": "지훈의 반반 분담 번복 얘기는 이미 했습니다. 저는 그 기준이 확인됐기 때문에 방학 전 공사를 진행해도 된다고 판단했습니다. 같은 순서를 또 돌리시면 저도 짜증부터 납니다.",
      "behaviorHint": "같은 순서를 반복해서 묻자 신경질이 앞선다.",
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
          "neighbor09:a:d-1:institution:0",
          "neighbor09:a:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "neighbor09:a:d-1:admission:0",
          "neighbor09:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:fatigue:timeline",
      "coverageKey": "a:d-1:surface:mid:fatigue:timeline",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:fatigue_2hit"
      ],
      "tags": [
        "fatigue",
        "repeat_2"
      ]
    },
    {
      "id": "neighbor09:beat_v2:a:d-1:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "block",
      "line": "같은 책임 질문만 반복하시면 더는 넓게 답하지 않겠습니다. 지금은 지훈의 반반 분담 번복의 핵심만 정리하고 싶습니다.",
      "behaviorHint": "반복 압박에 짜증이 쌓여 말을 끊거나 되받아친다.",
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
          "neighbor09:a:d-1:institution:0",
          "neighbor09:a:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "neighbor09:a:d-1:admission:0",
          "neighbor09:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:fatigue:responsibility",
      "coverageKey": "a:d-1:surface:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:fatigue_3hit"
      ],
      "tags": [
        "fatigue",
        "repeat_3"
      ]
    },
    {
      "id": "neighbor09:beat_v2:a:d-1:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "counterattack",
      "line": "계속 저만 몰지 마세요. 시공이 끝난 뒤에는 지훈 씨가 '내 바닥 구간만 계산하자'고 하면서 처음 기준을 바꿨습니다.",
      "behaviorHint": "반복 압박에 짜증이 쌓여 말을 끊거나 되받아친다.",
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
          "neighbor09:a:d-1:institution:0",
          "neighbor09:a:d-1:responsibility:0",
          "neighbor09:a:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor09:a:d-1:admission:0",
          "neighbor09:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:responsibility",
      "coverageKey": "a:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:fatigue_counter"
      ],
      "tags": [
        "fatigue",
        "high"
      ]
    },
    {
      "id": "neighbor09:beat_v2:b:d-1:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "irritation",
      "line": "지훈의 반반 분담 번복 얘기는 이미 했습니다. 반반 얘기가 나온 건 맞지만 추가 항목 없이 처음 계획대로 끝난다는 전제가 깔린 줄 알았습니다. 같은 순서를 또 돌리시면 저도 짜증부터 납니다.",
      "behaviorHint": "같은 순서를 반복해서 묻자 신경질이 앞선다.",
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
          "neighbor09:b:d-1:context:0",
          "neighbor09:b:d-1:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor09:b:d-1:admission:0",
          "neighbor09:b:d-1:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:fatigue:timeline",
      "coverageKey": "b:d-1:surface:mid:fatigue:timeline",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:fatigue_2hit"
      ],
      "tags": [
        "fatigue",
        "repeat_2"
      ]
    },
    {
      "id": "neighbor09:beat_v2:b:d-1:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "block",
      "line": "같은 책임 질문만 반복하시면 더는 넓게 답하지 않겠습니다. 지금은 지훈의 반반 분담 번복의 핵심만 정리하고 싶습니다.",
      "behaviorHint": "반복 압박에 짜증이 쌓여 말을 끊거나 되받아친다.",
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
          "neighbor09:b:d-1:context:0",
          "neighbor09:b:d-1:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor09:b:d-1:admission:0",
          "neighbor09:b:d-1:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:fatigue:responsibility",
      "coverageKey": "b:d-1:surface:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:fatigue_3hit"
      ],
      "tags": [
        "fatigue",
        "repeat_3"
      ]
    },
    {
      "id": "neighbor09:beat_v2:b:d-1:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "counterattack",
      "line": "계속 저만 몰지 마세요. 아랫집 천장 요구가 붙으면서 처음 이야기와 달라졌다고 느껴서 제 바닥 구간만 계산하자고 한 겁니다.",
      "behaviorHint": "반복 압박에 짜증이 쌓여 말을 끊거나 되받아친다.",
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
          "neighbor09:b:d-1:context:0",
          "neighbor09:b:d-1:counter:0",
          "neighbor09:b:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor09:b:d-1:admission:0",
          "neighbor09:b:d-1:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:fatigue:responsibility",
      "coverageKey": "b:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:fatigue_counter"
      ],
      "tags": [
        "fatigue",
        "high"
      ]
    },
    {
      "id": "neighbor09:beat_v2:a:d-5:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "irritation",
      "line": "공지 전 공개 압박과 지급 거부 얘기는 이미 했습니다. 공지 전에 글을 올린 건 사실이지만 관리실 안내가 또 밀릴까 봐 불안해서 그랬습니다. 같은 순서를 또 돌리시면 저도 짜증부터 납니다.",
      "behaviorHint": "같은 순서를 반복해서 묻자 신경질이 앞선다.",
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
          "neighbor09:a:d-5:context:0",
          "neighbor09:a:d-5:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor09:a:d-5:admission:0",
          "neighbor09:a:d-5:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:fatigue:timeline",
      "coverageKey": "a:d-5:surface:mid:fatigue:timeline",
      "variantTarget": 2,
      "setFlags": [
        "d-5:surface:fatigue_2hit"
      ],
      "tags": [
        "fatigue",
        "repeat_2"
      ]
    },
    {
      "id": "neighbor09:beat_v2:a:d-5:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "block",
      "line": "같은 책임 질문만 반복하시면 더는 넓게 답하지 않겠습니다. 지금은 공지 전 공개 압박과 지급 거부의 핵심만 정리하고 싶습니다.",
      "behaviorHint": "반복 압박에 짜증이 쌓여 말을 끊거나 되받아친다.",
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
          "neighbor09:a:d-5:context:0",
          "neighbor09:a:d-5:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor09:a:d-5:admission:0",
          "neighbor09:a:d-5:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:fatigue:responsibility",
      "coverageKey": "a:d-5:surface:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-5:surface:fatigue_3hit"
      ],
      "tags": [
        "fatigue",
        "repeat_3"
      ]
    },
    {
      "id": "neighbor09:beat_v2:a:d-5:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "counterattack",
      "line": "계속 저만 몰지 마세요. 제 글이 먼저 올라간 건 사실이지만 그 무렵 지훈 씨도 공지 전에 30만 원만 보내고 버티고 있었습니다.",
      "behaviorHint": "반복 압박에 짜증이 쌓여 말을 끊거나 되받아친다.",
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
          "neighbor09:a:d-5:context:0",
          "neighbor09:a:d-5:counter:0",
          "neighbor09:a:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor09:a:d-5:admission:0",
          "neighbor09:a:d-5:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:fatigue:responsibility",
      "coverageKey": "a:d-5:motive:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-5:surface:fatigue_counter"
      ],
      "tags": [
        "fatigue",
        "high"
      ]
    },
    {
      "id": "neighbor09:beat_v2:b:d-5:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "irritation",
      "line": "공지 전 공개 압박과 지급 거부 얘기는 이미 했습니다. 제가 공식 공지 19분 전에 30만 원을 보낸 건 맞습니다. 같은 순서를 또 돌리시면 저도 짜증부터 납니다.",
      "behaviorHint": "같은 순서를 반복해서 묻자 신경질이 앞선다.",
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
          "neighbor09:b:d-5:act:0",
          "neighbor09:b:d-5:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor09:b:d-5:admission:0",
          "neighbor09:b:d-5:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:fatigue:timeline",
      "coverageKey": "b:d-5:surface:mid:fatigue:timeline",
      "variantTarget": 2,
      "setFlags": [
        "d-5:surface:fatigue_2hit"
      ],
      "tags": [
        "fatigue",
        "repeat_2"
      ]
    },
    {
      "id": "neighbor09:beat_v2:b:d-5:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "block",
      "line": "같은 책임 질문만 반복하시면 더는 넓게 답하지 않겠습니다. 지금은 공지 전 공개 압박과 지급 거부의 핵심만 정리하고 싶습니다.",
      "behaviorHint": "반복 압박에 짜증이 쌓여 말을 끊거나 되받아친다.",
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
          "neighbor09:b:d-5:act:0",
          "neighbor09:b:d-5:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor09:b:d-5:admission:0",
          "neighbor09:b:d-5:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:fatigue:responsibility",
      "coverageKey": "b:d-5:surface:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-5:surface:fatigue_3hit"
      ],
      "tags": [
        "fatigue",
        "repeat_3"
      ]
    },
    {
      "id": "neighbor09:beat_v2:b:d-5:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "counterattack",
      "line": "계속 저만 몰지 마세요. 하지만 그 전에 연우 씨가 주민앱에 먼저 글을 올려 버려서 저도 방어적으로 굴었습니다.",
      "behaviorHint": "반복 압박에 짜증이 쌓여 말을 끊거나 되받아친다.",
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
          "neighbor09:b:d-5:act:0",
          "neighbor09:b:d-5:counter:0",
          "neighbor09:b:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor09:b:d-5:admission:0",
          "neighbor09:b:d-5:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:fatigue:responsibility",
      "coverageKey": "b:d-5:motive:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-5:surface:fatigue_counter"
      ],
      "tags": [
        "fatigue",
        "high"
      ]
    },
    {
      "id": "neighbor09:beat_v2:a:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "burst",
      "line": "공사가 다 끝난 뒤에 약속이 바뀌니까 제가 참아 온 시간과 기록이 통째로 부정되는 기분이었습니다.",
      "behaviorHint": "참고 있던 감정이 불쑥 튀어나온다.",
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
          "neighbor09:a:d-1:institution:0",
          "neighbor09:a:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "neighbor09:a:d-1:admission:0",
          "neighbor09:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-1:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 1,
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "neighbor09:beat_v2:b:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "burst",
      "line": "공사가 다 끝난 뒤 금액이 커 보이니까 겁이 나서 선뜻 인정하지 못했습니다.",
      "behaviorHint": "참고 있던 감정이 불쑥 튀어나온다.",
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
          "neighbor09:b:d-1:context:0",
          "neighbor09:b:d-1:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor09:b:d-1:admission:0",
          "neighbor09:b:d-1:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-1:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 1,
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "neighbor09:beat_v2:a:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "burst",
      "line": "그 감정은 알겠지만, 지금은 공지 전 공개 압박과 지급 거부라는 쟁점부터 분리해서 보셔야 합니다.",
      "behaviorHint": "참고 있던 감정이 불쑥 튀어나온다.",
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
          "neighbor09:a:d-5:context:0",
          "neighbor09:a:d-5:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor09:a:d-5:admission:0",
          "neighbor09:a:d-5:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-5:surface:mid:interjection:emotional_only:block",
      "variantTarget": 1,
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "neighbor09:beat_v2:b:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "burst",
      "line": "그 감정은 알겠지만, 지금은 공지 전 공개 압박과 지급 거부라는 쟁점부터 분리해서 보셔야 합니다.",
      "behaviorHint": "참고 있던 감정이 불쑥 튀어나온다.",
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
          "neighbor09:b:d-5:act:0",
          "neighbor09:b:d-5:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor09:b:d-5:admission:0",
          "neighbor09:b:d-5:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-5:surface:mid:interjection:emotional_only:block",
      "variantTarget": 1,
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "neighbor09:beat_v2:a:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "rebuttal",
      "line": "추가된 건 맞지만 처음 바닥 보강만으로 끝날 구조가 아니어서 그때는 그 판단이 필요하다고 봤습니다.",
      "behaviorHint": "짧고 날카롭게 숫자나 순서를 끊어 친다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
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
          "neighbor09:a:d-2:act:0",
          "neighbor09:a:d-2:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor09:a:d-2:admission:0",
          "neighbor09:a:d-2:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-2:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 1,
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "neighbor09:beat_v2:b:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "rebuttal",
      "line": "그래서 그 부분까지 제가 똑같이 떠안을 일은 아니라고 본 겁니다.",
      "behaviorHint": "짧고 날카롭게 숫자나 순서를 끊어 친다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
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
          "neighbor09:b:d-2:threshold:0",
          "neighbor09:b:d-2:responsibility:0"
        ],
        "forbidAtomIds": [
          "neighbor09:b:d-2:admission:0",
          "neighbor09:b:d-2:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-2:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 1,
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "neighbor09:beat_v2:a:d-4:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "rebuttal",
      "line": "숫자나 장면을 한 조각만 떼어 말하지 마세요. 정산서와 보전금 전표까지 같이 봐야 잔여 184만 원의 분담 계산라는 쟁점이 정리됩니다.",
      "behaviorHint": "짧고 날카롭게 숫자나 순서를 끊어 친다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
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
          "neighbor09:a:d-4:evidence:0",
          "neighbor09:a:d-4:rule:0"
        ],
        "forbidAtomIds": [
          "neighbor09:a:d-4:admission:0",
          "neighbor09:a:d-4:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-4:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 1,
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "neighbor09:beat_v2:b:d-4:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "rebuttal",
      "line": "숫자나 장면을 한 조각만 떼어 말하지 마세요. 정산서와 보전금 전표까지 같이 봐야 잔여 184만 원의 분담 계산라는 쟁점이 정리됩니다.",
      "behaviorHint": "짧고 날카롭게 숫자나 순서를 끊어 친다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
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
          "neighbor09:b:d-4:evidence:0",
          "neighbor09:b:d-4:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor09:b:d-4:admission:0",
          "neighbor09:b:d-4:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-4:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 1,
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "neighbor09:beat_v2:a:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "misbelief_push",
      "line": "문제의 시작은 윗집 바닥 충격이고 제 천장은 그냥 피해를 받는 쪽이라고 생각했습니다.",
      "behaviorHint": "잘못된 해석을 더 밀어붙이거나 급히 막아 세운다.",
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
          "neighbor09:a:d-3:evidence:0",
          "neighbor09:a:d-3:counter:0",
          "neighbor09:a:d-3:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor09:a:d-3:admission:0",
          "neighbor09:a:d-3:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 1,
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
      "id": "neighbor09:beat_v2:b:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "misbelief_push",
      "line": "소음을 전부 제 바닥 문제로만 몰아가는 건 과하다고 봤습니다.",
      "behaviorHint": "잘못된 해석을 더 밀어붙이거나 급히 막아 세운다.",
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
          "neighbor09:b:d-3:act:0",
          "neighbor09:b:d-3:responsibility:0",
          "neighbor09:b:d-3:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor09:b:d-3:admission:0",
          "neighbor09:b:d-3:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 1,
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
      "id": "neighbor09:beat_v2:a:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "misbelief_push",
      "line": "그렇게 단정하면 오히려 더 멀어집니다. 예민한 아래층으로만 보일까 봐 제 구조 문제 얘기를 먼저 못 꺼냈습니다.",
      "behaviorHint": "잘못된 해석을 더 밀어붙이거나 급히 막아 세운다.",
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
          "neighbor09:a:d-3:evidence:0",
          "neighbor09:a:d-3:counter:0",
          "neighbor09:a:d-3:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor09:a:d-3:admission:0",
          "neighbor09:a:d-3:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 1,
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
      "id": "neighbor09:beat_v2:b:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "misbelief_push",
      "line": "그렇게 단정하면 오히려 더 멀어집니다. 아이 발소리 문제로만 찍히는 게 싫어서 구조 얘기를 더 세게 하게 됐습니다.",
      "behaviorHint": "잘못된 해석을 더 밀어붙이거나 급히 막아 세운다.",
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
          "neighbor09:b:d-3:act:0",
          "neighbor09:b:d-3:responsibility:0",
          "neighbor09:b:d-3:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor09:b:d-3:admission:0",
          "neighbor09:b:d-3:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 1,
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

export default neighbor09BeatsV2Full;
