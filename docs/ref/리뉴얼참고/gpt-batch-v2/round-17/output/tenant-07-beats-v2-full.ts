// Generated from V2 batch source data
export const tenant07BeatsV2Full = {
  "caseId": "tenant-07",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 51,
    "byActionFamily": {
      "question": 21,
      "evidence": 7,
      "free_question": 5,
      "fatigue": 6,
      "interjection": 12
    },
    "byDispute": {
      "d-1": 15,
      "d-5": 15,
      "d-2": 10,
      "d-3": 5,
      "d-4": 6
    },
    "byIssueRole": {
      "core_truth": 30,
      "red_herring": 10,
      "sub_truth": 5,
      "shared_misconception": 6
    },
    "interjectionInfoLevels": {
      "emotional_only": 4,
      "detail_rebuttal": 4,
      "misbelief_escalation": 2,
      "trap_signal": 2
    },
    "requiredCoverage": {
      "question_early_timeline": true,
      "question_early_identity_context": true,
      "question_mid_responsibility": true,
      "question_mid_motive": true,
      "question_late_emotion": true,
      "evidence_mid_context_identity_legality": true,
      "fatigue_mid_resp_timeline": true,
      "free_late_motive_emotion": true,
      "interjection_emotional_only": true,
      "interjection_detail_rebuttal": true,
      "interjection_misbelief": true,
      "interjection_trap_signal": true
    },
    "allRequiredCoverageSatisfied": true
  },
  "beats": [
    {
      "id": "tenant07:beat_v2:a:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "그날은 사실상 4% 인상 재계약으로 끝난 자리였습니다.",
      "behaviorHint": "상대가 말을 돌리면 '그 표현 누가 먼저 썼죠'라고 끊으며 출처를 고정하려 한다.",
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
          "tenant07:a:d-1:act:0",
          "tenant07:a:d-1:act:1"
        ],
        "forbidAtomIds": [
          "tenant07:a:d-1:unlock:s5:0",
          "tenant07:a:d-1:rule:5"
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
        "core"
      ]
    },
    {
      "id": "tenant07:beat_v2:b:d-1:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "저는 그때도 시장 상황을 더 봐야 한다고 생각했습니다.",
      "behaviorHint": "불리해지면 '요즘 시장이 다 그렇다'는 말로 자신의 선택을 외부 시세 탓으로 넓혀 버린다.",
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
          "tenant07:b:d-1:act:0"
        ],
        "forbidAtomIds": [
          "tenant07:b:d-1:responsibility:2",
          "tenant07:b:d-1:responsibility:5"
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
        "d-1:surface:context_pressed"
      ],
      "tags": [
        "hot",
        "core"
      ]
    },
    {
      "id": "tenant07:beat_v2:a:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "네, 서명은 남아 있었지만 4% 방향 자체는 이미 서로 확인한 상태였습니다.",
      "behaviorHint": "상대가 말을 돌리면 '그 표현 누가 먼저 썼죠'라고 끊으며 출처를 고정하려 한다.",
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
          "heated"
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
          "tenant07:a:d-1:rule:2",
          "tenant07:a:d-1:act:3"
        ],
        "forbidAtomIds": [
          "tenant07:a:d-1:unlock:s5:0",
          "tenant07:a:d-1:rule:1"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:pressure:responsibility",
      "coverageKey": "a:d-1:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-1:motive:responsibility_named"
      ],
      "tags": [
        "mid",
        "core"
      ]
    },
    {
      "id": "tenant07:beat_v2:b:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "그런데 진우가 더 높은 문의를 가져오고 서명도 늦어지니 제가 마음을 바꿨죠.",
      "behaviorHint": "불리해지면 '요즘 시장이 다 그렇다'는 말로 자신의 선택을 외부 시세 탓으로 넓혀 버린다.",
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
          "heated"
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
          "tenant07:b:d-1:motive:0",
          "tenant07:b:d-1:motive:1"
        ],
        "forbidAtomIds": [
          "tenant07:b:d-1:responsibility:1",
          "tenant07:b:d-1:motive:4"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:motive:motive",
      "coverageKey": "b:d-1:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-1:motive:motive_named"
      ],
      "tags": [
        "mid",
        "core"
      ]
    },
    {
      "id": "tenant07:beat_v2:a:d-1:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "impeach",
      "line": "네, 서명은 남아 있었지만 4% 방향 자체는 이미 서로 확인한 상태였습니다. 중개사 3자 카카오톡 캡처까지 같이 놓고 보면 그 흐름이 더 선명해집니다.",
      "behaviorHint": "자료를 손가락으로 짚으며 순서를 고정하고, 말의 범위를 좁혀 답한다.",
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
          "guarded",
          "heated"
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
          "tenant07:a:d-1:rule:3",
          "tenant07:a:d-1:rule:2"
        ],
        "forbidAtomIds": [
          "tenant07:a:d-1:unlock:s5:0",
          "tenant07:a:d-1:rule:1"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:evidence:legality",
      "coverageKey": "a:d-1:motive:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:legality_evidence_seen"
      ],
      "tags": [
        "cold",
        "evidence",
        "core"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "evidenceIds": [
        "e-2"
      ]
    },
    {
      "id": "tenant07:beat_v2:b:d-1:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "reframe",
      "line": "그런데 진우가 더 높은 문의를 가져오고 서명도 늦어지니 제가 마음을 바꿨죠. 중개사 상담 녹음 요약과 일정표까지 같이 놓고 보면 그 흐름이 더 선명해집니다.",
      "behaviorHint": "자료를 손가락으로 짚으며 순서를 고정하고, 말의 범위를 좁혀 답한다.",
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
          "guarded",
          "heated"
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
          "tenant07:b:d-1:responsibility:2"
        ],
        "forbidAtomIds": [
          "tenant07:b:d-1:responsibility:1",
          "tenant07:b:d-1:motive:4"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:evidence:identity",
      "coverageKey": "b:d-1:motive:mid:evidence:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:identity_evidence_seen"
      ],
      "tags": [
        "cold",
        "evidence",
        "core"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "evidenceIds": [
        "e-5"
      ]
    },
    {
      "id": "tenant07:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "저도 사흘 지연이 약점이 된다는 건 알았습니다. 그 부분은 이제 숨길 생각이 없습니다.",
      "behaviorHint": "경계가 조금 풀리며 목소리가 낮아지지만, 불리한 표현은 조심스럽게 고른다.",
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
        "free_question"
      ],
      "conditions": {
        "emotionTiers": [
          "heated",
          "cracked"
        ],
        "trustWindowBands": [
          "open",
          "volatile"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant07:a:d-1:act:4",
          "tenant07:a:d-1:context:2"
        ],
        "forbidAtomIds": [
          "tenant07:a:d-1:rule:1",
          "tenant07:a:d-1:rule:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:emotion_volunteered"
      ],
      "tags": [
        "late",
        "free",
        "core"
      ],
      "requiresFlags": [
        "d-1:motive:responsibility_named",
        "d-5:core:prior_agreement_confirmed"
      ]
    },
    {
      "id": "tenant07:beat_v2:b:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confess",
      "line": "제가 서명 지연과 시세 문의를 핑계로 그 합의의 무게를 깎아 말했습니다.",
      "behaviorHint": "감정을 눌러 담으려 하지만 특정 표현에서 목소리가 잠깐 흔들린다.",
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
          "heated",
          "cracked"
        ],
        "trustWindowBands": [
          "open",
          "volatile"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant07:b:d-1:act:4",
          "tenant07:b:d-1:motive:2"
        ],
        "forbidAtomIds": [
          "tenant07:b:d-1:responsibility:1",
          "tenant07:b:d-1:responsibility:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:rapport:emotion",
      "coverageKey": "b:d-1:core:late:rapport:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-1:core:emotion_opened"
      ],
      "tags": [
        "cold",
        "core"
      ],
      "requiresFlags": [
        "d-1:motive:responsibility_named",
        "d-5:core:prior_agreement_confirmed"
      ]
    },
    {
      "id": "tenant07:beat_v2:b:d-1:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "irritated",
      "line": "4% 인상 쪽은 이미 여러 번 답했습니다. 같은 축으로만 밀면 오히려 핵심 순서가 흐려집니다.",
      "behaviorHint": "같은 축의 질문이 누적돼 한숨이 길어지고, 말끝이 짧아진다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "timeline",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "heated"
        ],
        "trustWindowBands": [
          "narrow",
          "volatile"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant07:b:d-1:act:2",
          "tenant07:b:d-1:act:3"
        ],
        "forbidAtomIds": [
          "tenant07:b:d-1:responsibility:1",
          "tenant07:b:d-1:motive:4"
        ]
      },
      "weight": 5,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:fatigue:timeline",
      "coverageKey": "b:d-1:surface:mid:fatigue:timeline",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:fatigue_irritated"
      ],
      "tags": [
        "fatigue",
        "core"
      ]
    },
    {
      "id": "tenant07:beat_v2:b:d-1:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "shut_down",
      "line": "지금은 4% 인상을 그 방식으로 더 반복해 답하지 않겠습니다. 자료 순서부터 바로잡고 가죠.",
      "behaviorHint": "같은 축의 질문이 누적돼 한숨이 길어지고, 말끝이 짧아진다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "heated"
        ],
        "trustWindowBands": [
          "narrow",
          "volatile"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant07:b:d-1:responsibility:2",
          "tenant07:b:d-1:responsibility:3"
        ],
        "forbidAtomIds": [
          "tenant07:b:d-1:responsibility:1",
          "tenant07:b:d-1:motive:4"
        ]
      },
      "weight": 5,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:fatigue:responsibility",
      "coverageKey": "b:d-1:surface:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:fatigue_block"
      ],
      "tags": [
        "fatigue",
        "core"
      ]
    },
    {
      "id": "tenant07:beat_v2:b:d-1:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "counterstrike",
      "line": "계속 4% 인상만 몰아붙이면, 반대편 누락과 연결 고리까지 같이 봐야 한다는 점도 분명해집니다.",
      "behaviorHint": "같은 축의 질문이 누적돼 한숨이 길어지고, 말끝이 짧아진다.",
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
          "heated"
        ],
        "trustWindowBands": [
          "narrow",
          "volatile"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant07:b:d-1:responsibility:2",
          "tenant07:b:d-1:responsibility:3"
        ],
        "forbidAtomIds": [
          "tenant07:b:d-1:responsibility:1",
          "tenant07:b:d-1:motive:4"
        ]
      },
      "weight": 5,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:fatigue:responsibility",
      "coverageKey": "b:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:fatigue_counter"
      ],
      "tags": [
        "fatigue",
        "core"
      ]
    },
    {
      "id": "tenant07:beat_v2:a:d-5:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "12% 인상에 주차비 별도, 부분 도배 선납까지는 처음 합의 범위를 넘는 요구였습니다.",
      "behaviorHint": "상대가 말을 돌리면 '그 표현 누가 먼저 썼죠'라고 끊으며 출처를 고정하려 한다.",
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
          "tenant07:a:d-5:act:1",
          "tenant07:a:d-5:act:0"
        ],
        "forbidAtomIds": [
          "tenant07:a:d-5:rule:5",
          "tenant07:a:d-5:fear:4"
        ]
      },
      "weight": 7,
      "priority": 34,
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
        "core"
      ]
    },
    {
      "id": "tenant07:beat_v2:b:d-5:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "제가 제시한 추가 조건은 손해를 줄이기 위한 최소한이었습니다.",
      "behaviorHint": "불리해지면 '요즘 시장이 다 그렇다'는 말로 자신의 선택을 외부 시세 탓으로 넓혀 버린다.",
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
          "tenant07:b:d-5:self_justification:0"
        ],
        "forbidAtomIds": [
          "tenant07:b:d-5:unlock:s5:0",
          "tenant07:b:d-5:self_justification:5"
        ]
      },
      "weight": 7,
      "priority": 34,
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
        "core"
      ]
    },
    {
      "id": "tenant07:beat_v2:a:d-5:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "제가 사흘 늦은 건 맞지만, 그 뒤 나온 12%와 별도 조건은 여전히 과했습니다.",
      "behaviorHint": "상대가 말을 돌리면 '그 표현 누가 먼저 썼죠'라고 끊으며 출처를 고정하려 한다.",
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
          "heated"
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
          "tenant07:a:d-5:rule:2",
          "tenant07:a:d-5:act:3"
        ],
        "forbidAtomIds": [
          "tenant07:a:d-5:rule:1",
          "tenant07:a:d-5:fear:4"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:pressure:responsibility",
      "coverageKey": "a:d-5:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:responsibility_named"
      ],
      "tags": [
        "mid",
        "core"
      ]
    },
    {
      "id": "tenant07:beat_v2:b:d-5:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "저는 새 문의와 예전 불만을 핑계로 제 부담을 세입자 쪽에 넘기려 했습니다.",
      "behaviorHint": "불리해지면 '요즘 시장이 다 그렇다'는 말로 자신의 선택을 외부 시세 탓으로 넓혀 버린다.",
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
          "heated"
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
          "tenant07:b:d-5:fear:1",
          "tenant07:b:d-5:self_justification:2"
        ],
        "forbidAtomIds": [
          "tenant07:b:d-5:unlock:s5:0",
          "tenant07:b:d-5:self_justification:1"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:motive:motive",
      "coverageKey": "b:d-5:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:motive_named"
      ],
      "tags": [
        "mid",
        "core"
      ]
    },
    {
      "id": "tenant07:beat_v2:a:d-5:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "reframe",
      "line": "제가 사흘 늦은 건 맞지만, 그 뒤 나온 12%와 별도 조건은 여전히 과했습니다. 기존 임대차계약서까지 같이 놓고 보면 그 흐름이 더 선명해집니다.",
      "behaviorHint": "자료를 손가락으로 짚으며 순서를 고정하고, 말의 범위를 좁혀 답한다.",
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
          "guarded",
          "heated"
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
          "tenant07:a:d-5:rule:3",
          "tenant07:a:d-5:rule:2"
        ],
        "forbidAtomIds": [
          "tenant07:a:d-5:rule:1",
          "tenant07:a:d-5:fear:4"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:evidence:legality",
      "coverageKey": "a:d-5:motive:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-5:motive:legality_evidence_seen"
      ],
      "tags": [
        "cold",
        "evidence",
        "core"
      ],
      "requiresFlags": [
        "d-5:surface:timeline_pressed"
      ],
      "evidenceIds": [
        "e-1"
      ]
    },
    {
      "id": "tenant07:beat_v2:b:d-5:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "reframe",
      "line": "저는 새 문의와 예전 불만을 핑계로 제 부담을 세입자 쪽에 넘기려 했습니다. 중개사 상담 녹음 요약과 일정표까지 같이 놓고 보면 그 흐름이 더 선명해집니다.",
      "behaviorHint": "자료를 손가락으로 짚으며 순서를 고정하고, 말의 범위를 좁혀 답한다.",
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
          "guarded",
          "heated"
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
          "tenant07:b:d-5:fear:0",
          "tenant07:b:d-5:fear:1"
        ],
        "forbidAtomIds": [
          "tenant07:b:d-5:unlock:s5:0",
          "tenant07:b:d-5:self_justification:1"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:evidence:identity",
      "coverageKey": "b:d-5:motive:mid:evidence:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-5:motive:identity_evidence_seen"
      ],
      "tags": [
        "cold",
        "evidence",
        "core"
      ],
      "requiresFlags": [
        "d-5:surface:timeline_pressed"
      ],
      "evidenceIds": [
        "e-5"
      ]
    },
    {
      "id": "tenant07:beat_v2:a:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "그 통보를 받았을 때 저는 당장 쫓겨나는 느낌이 들어서 모든 걸 악의로만 해석했습니다. 그 부분은 이제 숨길 생각이 없습니다.",
      "behaviorHint": "경계가 조금 풀리며 목소리가 낮아지지만, 불리한 표현은 조심스럽게 고른다.",
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
        "free_question"
      ],
      "conditions": {
        "emotionTiers": [
          "heated",
          "cracked"
        ],
        "trustWindowBands": [
          "open",
          "volatile"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant07:a:d-5:fear:3",
          "tenant07:a:d-5:fear:4"
        ],
        "forbidAtomIds": [
          "tenant07:a:d-5:rule:1",
          "tenant07:a:d-5:rule:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:rapport:emotion",
      "coverageKey": "a:d-5:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-5:core:emotion_volunteered"
      ],
      "tags": [
        "late",
        "free",
        "core"
      ],
      "requiresFlags": [
        "d-5:motive:responsibility_named",
        "d-5:core:prior_agreement_confirmed"
      ]
    },
    {
      "id": "tenant07:beat_v2:b:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confess",
      "line": "그건 기존 합의를 넘어서는 일방 변경이었고, 저는 손해를 피하려고 그 사실을 축소해 말했습니다.",
      "behaviorHint": "감정을 눌러 담으려 하지만 특정 표현에서 목소리가 잠깐 흔들린다.",
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
          "heated",
          "cracked"
        ],
        "trustWindowBands": [
          "open",
          "volatile"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant07:b:d-5:fear:3",
          "tenant07:b:d-5:fear:4"
        ],
        "forbidAtomIds": [
          "tenant07:b:d-5:self_justification:1",
          "tenant07:b:d-5:self_justification:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:rapport:emotion",
      "coverageKey": "b:d-5:core:late:rapport:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-5:core:emotion_opened"
      ],
      "tags": [
        "cold",
        "core"
      ],
      "requiresFlags": [
        "d-5:motive:responsibility_named",
        "d-5:core:prior_agreement_confirmed"
      ]
    },
    {
      "id": "tenant07:beat_v2:b:d-5:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "irritated",
      "line": "12% 인상 쪽은 이미 여러 번 답했습니다. 같은 축으로만 밀면 오히려 핵심 순서가 흐려집니다.",
      "behaviorHint": "같은 축의 질문이 누적돼 한숨이 길어지고, 말끝이 짧아진다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "timeline",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "heated"
        ],
        "trustWindowBands": [
          "narrow",
          "volatile"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant07:b:d-5:unlock:s2:0",
          "tenant07:b:d-5:act:2"
        ],
        "forbidAtomIds": [
          "tenant07:b:d-5:unlock:s5:0",
          "tenant07:b:d-5:self_justification:1"
        ]
      },
      "weight": 5,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:fatigue:timeline",
      "coverageKey": "b:d-5:surface:mid:fatigue:timeline",
      "variantTarget": 2,
      "setFlags": [
        "d-5:surface:fatigue_irritated"
      ],
      "tags": [
        "fatigue",
        "core"
      ]
    },
    {
      "id": "tenant07:beat_v2:b:d-5:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "shut_down",
      "line": "지금은 12% 인상을 그 방식으로 더 반복해 답하지 않겠습니다. 자료 순서부터 바로잡고 가죠.",
      "behaviorHint": "같은 축의 질문이 누적돼 한숨이 길어지고, 말끝이 짧아진다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "heated"
        ],
        "trustWindowBands": [
          "narrow",
          "volatile"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant07:b:d-5:self_justification:3",
          "tenant07:b:d-5:self_justification:2"
        ],
        "forbidAtomIds": [
          "tenant07:b:d-5:unlock:s5:0",
          "tenant07:b:d-5:self_justification:1"
        ]
      },
      "weight": 5,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:fatigue:responsibility",
      "coverageKey": "b:d-5:surface:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-5:surface:fatigue_block"
      ],
      "tags": [
        "fatigue",
        "core"
      ]
    },
    {
      "id": "tenant07:beat_v2:b:d-5:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "counterstrike",
      "line": "계속 12% 인상만 몰아붙이면, 반대편 누락과 연결 고리까지 같이 봐야 한다는 점도 분명해집니다.",
      "behaviorHint": "같은 축의 질문이 누적돼 한숨이 길어지고, 말끝이 짧아진다.",
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
          "heated"
        ],
        "trustWindowBands": [
          "narrow",
          "volatile"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant07:b:d-5:self_justification:3",
          "tenant07:b:d-5:self_justification:2"
        ],
        "forbidAtomIds": [
          "tenant07:b:d-5:unlock:s5:0",
          "tenant07:b:d-5:self_justification:1"
        ]
      },
      "weight": 5,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:fatigue:responsibility",
      "coverageKey": "b:d-5:motive:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-5:surface:fatigue_counter"
      ],
      "tags": [
        "fatigue",
        "core"
      ]
    },
    {
      "id": "tenant07:beat_v2:a:d-2:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "confused",
      "line": "12% 문의 하나만 앞세우면 결국 전체 책임이 한쪽에만 덮어씌워집니다. 권진우까지 같이 봐야 합니다.",
      "behaviorHint": "상대가 말을 돌리면 '그 표현 누가 먼저 썼죠'라고 끊으며 출처를 고정하려 한다.",
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
          "guarded",
          "heated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant07:a:d-2:fear:0",
          "tenant07:a:d-2:fear:1"
        ],
        "forbidAtomIds": [
          "tenant07:a:d-2:fear:4",
          "tenant07:a:d-2:counter:5"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:trap:identity",
      "coverageKey": "a:d-2:surface:early:trap:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:identity_pressed"
      ],
      "tags": [
        "hot",
        "trap",
        "red_herring"
      ]
    },
    {
      "id": "tenant07:beat_v2:b:d-2:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confused",
      "line": "지금 보이는 장면만으로는 12% 문의의 앞뒤가 비어 있습니다. 권진우 맥락을 빼면 해석이 과해집니다.",
      "behaviorHint": "불리해지면 '요즘 시장이 다 그렇다'는 말로 자신의 선택을 외부 시세 탓으로 넓혀 버린다.",
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
          "guarded",
          "heated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant07:b:d-2:context:2",
          "tenant07:b:d-2:fear:0"
        ],
        "forbidAtomIds": [
          "tenant07:b:d-2:unlock:s5:0",
          "tenant07:b:d-2:self_justification:5"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:trap:context",
      "coverageKey": "b:d-2:surface:early:trap:context",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:context_pressed"
      ],
      "tags": [
        "hot",
        "trap",
        "red_herring"
      ]
    },
    {
      "id": "tenant07:beat_v2:a:d-2:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "confused",
      "line": "처음 해석이 그렇게 굳어져 있던 탓에, 12% 문의 문제는 사실 판단을 넘어 감정의 상처로 남았습니다.",
      "behaviorHint": "감정을 눌러 담으려 하지만 특정 표현에서 목소리가 잠깐 흔들린다.",
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
          "heated",
          "cracked"
        ],
        "trustWindowBands": [
          "open",
          "volatile"
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
          "tenant07:a:d-2:fear:3",
          "tenant07:a:d-2:fear:4"
        ],
        "forbidAtomIds": [
          "tenant07:a:d-2:counter:1",
          "tenant07:a:d-2:counter:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:core:trap:emotion",
      "coverageKey": "a:d-2:core:late:trap:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-2:core:emotion_opened"
      ],
      "tags": [
        "cold",
        "trap",
        "red_herring"
      ],
      "requiresFlags": [
        "d-2:motive:misbelief_named",
        "d-5:motive:alternative_offer_deflated"
      ]
    },
    {
      "id": "tenant07:beat_v2:b:d-2:core:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confused",
      "line": "이제는 12% 문의만 떼지 말고 권진우까지 같이 놓고 다시 정리해야 합니다.",
      "behaviorHint": "현재 질문을 받으면 몇 년 전 경고까지 날짜를 붙여 나열해 상대의 신뢰 문제처럼 다시 포장한다.",
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
          "heated",
          "cracked"
        ],
        "trustWindowBands": [
          "open",
          "volatile"
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
          "tenant07:b:d-2:context:5",
          "tenant07:b:d-2:context:4"
        ],
        "forbidAtomIds": [
          "tenant07:b:d-2:self_justification:1",
          "tenant07:b:d-2:self_justification:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:core:trap:context",
      "coverageKey": "b:d-2:core:late:trap:context",
      "variantTarget": 3,
      "setFlags": [
        "d-2:core:context_opened"
      ],
      "tags": [
        "cold",
        "trap",
        "red_herring"
      ],
      "requiresFlags": [
        "d-2:motive:misbelief_named",
        "d-5:motive:alternative_offer_deflated"
      ]
    },
    {
      "id": "tenant07:beat_v2:a:d-2:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "reframe",
      "line": "나중에 보니 실제로는 가능 금액을 묻는 수준이더군요. 진우-중개사 문자까지 같이 놓고 보면 그 흐름이 더 선명해집니다.",
      "behaviorHint": "자료를 손가락으로 짚으며 순서를 고정하고, 말의 범위를 좁혀 답한다.",
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
          "guarded",
          "heated"
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
          "tenant07:a:d-2:context:3",
          "tenant07:a:d-2:context:2"
        ],
        "forbidAtomIds": [
          "tenant07:a:d-2:fear:4",
          "tenant07:a:d-2:counter:5"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:evidence:context",
      "coverageKey": "a:d-2:motive:mid:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:context_evidence_seen"
      ],
      "tags": [
        "cold",
        "evidence"
      ],
      "requiresFlags": [
        "d-2:surface:timeline_pressed"
      ],
      "evidenceIds": [
        "e-4"
      ]
    },
    {
      "id": "tenant07:beat_v2:b:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confess",
      "line": "저는 그걸 체면을 지키려는 카드로 크게 부풀려 하나 씨를 압박했습니다. 그 부분은 이제 숨길 생각이 없습니다.",
      "behaviorHint": "경계가 조금 풀리며 목소리가 낮아지지만, 불리한 표현은 조심스럽게 고른다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "red_herring",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "free_question",
      "questionTypes": [
        "free_question"
      ],
      "conditions": {
        "emotionTiers": [
          "heated",
          "cracked"
        ],
        "trustWindowBands": [
          "open",
          "volatile"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant07:b:d-2:fear:3",
          "tenant07:b:d-2:fear:2"
        ],
        "forbidAtomIds": [
          "tenant07:b:d-2:self_justification:1",
          "tenant07:b:d-2:self_justification:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:core:rapport:emotion",
      "coverageKey": "b:d-2:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-2:core:emotion_volunteered"
      ],
      "tags": [
        "late",
        "free"
      ],
      "requiresFlags": [
        "d-2:motive:misbelief_named",
        "d-5:motive:alternative_offer_deflated"
      ]
    },
    {
      "id": "tenant07:beat_v2:a:d-3:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "서명본이 크게 늦었다고 볼 정도는 아니었습니다.",
      "behaviorHint": "상대가 말을 돌리면 '그 표현 누가 먼저 썼죠'라고 끊으며 출처를 고정하려 한다.",
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
          "tenant07:a:d-3:timeline:1",
          "tenant07:a:d-3:timeline:0"
        ],
        "forbidAtomIds": [
          "tenant07:a:d-3:unlock:s5:0",
          "tenant07:a:d-3:shame:4"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:pressure:timeline",
      "coverageKey": "a:d-3:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-3:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "tenant07:beat_v2:b:d-3:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "저는 그걸 재계약 의사가 흔들리는 신호로 봤습니다.",
      "behaviorHint": "불리해지면 '요즘 시장이 다 그렇다'는 말로 자신의 선택을 외부 시세 탓으로 넓혀 버린다.",
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
          "tenant07:b:d-3:timeline:0"
        ],
        "forbidAtomIds": [
          "tenant07:b:d-3:timeline:5",
          "tenant07:b:d-3:self_justification:5"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:pressure:context",
      "coverageKey": "b:d-3:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-3:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "tenant07:beat_v2:a:d-3:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "네, 중개사가 원하는 시점보다 사흘 늦게 보낸 건 맞습니다.",
      "behaviorHint": "상대가 말을 돌리면 '그 표현 누가 먼저 썼죠'라고 끊으며 출처를 고정하려 한다.",
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
          "heated"
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
          "tenant07:a:d-3:shame:1",
          "tenant07:a:d-3:shame:0"
        ],
        "forbidAtomIds": [
          "tenant07:a:d-3:unlock:s5:0",
          "tenant07:a:d-3:timeline:5"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:motive:motive",
      "coverageKey": "a:d-3:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-3:motive:motive_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "tenant07:beat_v2:b:d-3:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "reframe",
      "line": "이미 새 문의 얘기에 마음이 흔들린 상태였으니까요. 기존 임대차계약서까지 같이 놓고 보면 그 흐름이 더 선명해집니다.",
      "behaviorHint": "자료를 손가락으로 짚으며 순서를 고정하고, 말의 범위를 좁혀 답한다.",
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
          "guarded",
          "heated"
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
          "tenant07:b:d-3:self_justification:3"
        ],
        "forbidAtomIds": [
          "tenant07:b:d-3:timeline:5",
          "tenant07:b:d-3:timeline:0"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:evidence:legality",
      "coverageKey": "b:d-3:motive:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-3:motive:legality_evidence_seen"
      ],
      "tags": [
        "cold",
        "evidence"
      ],
      "requiresFlags": [
        "d-3:surface:timeline_pressed"
      ],
      "evidenceIds": [
        "e-1"
      ]
    },
    {
      "id": "tenant07:beat_v2:a:d-3:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "서명본이 늦어진 건 사실이고, 그게 제 입장을 약하게 만든다는 것도 알았습니다. 그 부분은 이제 숨길 생각이 없습니다.",
      "behaviorHint": "경계가 조금 풀리며 목소리가 낮아지지만, 불리한 표현은 조심스럽게 고른다.",
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
          "heated",
          "cracked"
        ],
        "trustWindowBands": [
          "open",
          "volatile"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant07:a:d-3:shame:2",
          "tenant07:a:d-3:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "tenant07:a:d-3:timeline:1",
          "tenant07:a:d-3:timeline:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:rapport:emotion",
      "coverageKey": "a:d-3:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-3:core:emotion_volunteered"
      ],
      "tags": [
        "late",
        "free"
      ],
      "requiresFlags": [
        "d-3:motive:responsibility_named",
        "d-1:motive:delay_gap_named"
      ]
    },
    {
      "id": "tenant07:beat_v2:a:d-4:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confused",
      "line": "복도 자전거 하나만 앞세우면 결국 전체 책임이 한쪽에만 덮어씌워집니다. 분리배출 경고까지 같이 봐야 합니다.",
      "behaviorHint": "상대가 말을 돌리면 '그 표현 누가 먼저 썼죠'라고 끊으며 출처를 고정하려 한다.",
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
          "guarded",
          "heated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant07:a:d-4:shame:0",
          "tenant07:a:d-4:shame:1"
        ],
        "forbidAtomIds": [
          "tenant07:a:d-4:shame:4",
          "tenant07:a:d-4:unlock:s5:0"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:trap:identity",
      "coverageKey": "a:d-4:surface:early:trap:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-4:surface:identity_pressed"
      ],
      "tags": [
        "hot",
        "trap"
      ]
    },
    {
      "id": "tenant07:beat_v2:b:d-4:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confused",
      "line": "지금 보이는 장면만으로는 복도 자전거의 앞뒤가 비어 있습니다. 분리배출 경고 맥락을 빼면 해석이 과해집니다.",
      "behaviorHint": "불리해지면 '요즘 시장이 다 그렇다'는 말로 자신의 선택을 외부 시세 탓으로 넓혀 버린다.",
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
          "guarded",
          "heated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant07:b:d-4:context:2",
          "tenant07:b:d-4:fear:0"
        ],
        "forbidAtomIds": [
          "tenant07:b:d-4:unlock:s5:0",
          "tenant07:b:d-4:self_justification:5"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:surface:trap:context",
      "coverageKey": "b:d-4:surface:early:trap:context",
      "variantTarget": 6,
      "setFlags": [
        "d-4:surface:context_pressed"
      ],
      "tags": [
        "hot",
        "trap"
      ]
    },
    {
      "id": "tenant07:beat_v2:a:d-4:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confused",
      "line": "처음 해석이 그렇게 굳어져 있던 탓에, 복도 자전거 문제는 사실 판단을 넘어 감정의 상처로 남았습니다.",
      "behaviorHint": "감정을 눌러 담으려 하지만 특정 표현에서 목소리가 잠깐 흔들린다.",
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
          "heated",
          "cracked"
        ],
        "trustWindowBands": [
          "open",
          "volatile"
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
          "tenant07:a:d-4:shame:2",
          "tenant07:a:d-4:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "tenant07:a:d-4:counter:1",
          "tenant07:a:d-4:counter:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:core:trap:emotion",
      "coverageKey": "a:d-4:core:late:trap:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-4:core:emotion_opened"
      ],
      "tags": [
        "cold",
        "trap"
      ],
      "requiresFlags": [
        "d-4:motive:misbelief_named",
        "d-5:motive:legacy_issue_separated"
      ]
    },
    {
      "id": "tenant07:beat_v2:b:d-4:core:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confused",
      "line": "이제는 복도 자전거만 떼지 말고 분리배출 경고까지 같이 놓고 다시 정리해야 합니다.",
      "behaviorHint": "현재 질문을 받으면 몇 년 전 경고까지 날짜를 붙여 나열해 상대의 신뢰 문제처럼 다시 포장한다.",
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
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "heated",
          "cracked"
        ],
        "trustWindowBands": [
          "open",
          "volatile"
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
          "tenant07:b:d-4:context:4",
          "tenant07:b:d-4:context:5"
        ],
        "forbidAtomIds": [
          "tenant07:b:d-4:self_justification:1",
          "tenant07:b:d-4:self_justification:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:core:trap:context",
      "coverageKey": "b:d-4:core:late:trap:context",
      "variantTarget": 3,
      "setFlags": [
        "d-4:core:context_opened"
      ],
      "tags": [
        "cold",
        "trap"
      ],
      "requiresFlags": [
        "d-4:motive:misbelief_named",
        "d-5:motive:legacy_issue_separated"
      ]
    },
    {
      "id": "tenant07:beat_v2:a:d-4:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "reframe",
      "line": "네, 2년 전 자전거와 분리배출로 한 차례 안내를 받은 건 맞습니다. 관리사무소 과거 민원 종결 기록까지 같이 놓고 보면 그 흐름이 더 선명해집니다.",
      "behaviorHint": "자료를 손가락으로 짚으며 순서를 고정하고, 말의 범위를 좁혀 답한다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "shared_misconception",
      "responseIntent": "evidence_response",
      "angleTag": "context",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "guarded",
          "heated"
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
          "tenant07:a:d-4:unlock:s3:0",
          "tenant07:a:d-4:counter:3"
        ],
        "forbidAtomIds": [
          "tenant07:a:d-4:unlock:s5:0",
          "tenant07:a:d-4:shame:4"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:evidence:context",
      "coverageKey": "a:d-4:motive:mid:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-4:motive:context_evidence_seen"
      ],
      "tags": [
        "cold",
        "evidence"
      ],
      "requiresFlags": [
        "d-4:surface:timeline_pressed"
      ],
      "evidenceIds": [
        "e-3"
      ]
    },
    {
      "id": "tenant07:beat_v2:b:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confess",
      "line": "저는 그 종결된 민원을 현재 인상 요구의 뒷받침처럼 다시 꺼내며 과장했습니다. 그 부분은 이제 숨길 생각이 없습니다.",
      "behaviorHint": "경계가 조금 풀리며 목소리가 낮아지지만, 불리한 표현은 조심스럽게 고른다.",
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
        "free_question"
      ],
      "conditions": {
        "emotionTiers": [
          "heated",
          "cracked"
        ],
        "trustWindowBands": [
          "open",
          "volatile"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant07:b:d-4:fear:3",
          "tenant07:b:d-4:fear:4"
        ],
        "forbidAtomIds": [
          "tenant07:b:d-4:self_justification:1",
          "tenant07:b:d-4:self_justification:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:core:rapport:emotion",
      "coverageKey": "b:d-4:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-4:core:emotion_volunteered"
      ],
      "tags": [
        "late",
        "free"
      ],
      "requiresFlags": [
        "d-4:motive:misbelief_named",
        "d-5:motive:legacy_issue_separated"
      ]
    },
    {
      "id": "tenant07:beat_v2:a:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "저는 숫자 하나 바뀌면 바로 이사 걱정부터 해야 합니다. 이미 4%로 얘기해 놓고 왜 갑자기 살던 사람부터 밀어내는 쪽으로 갑니까.",
      "behaviorHint": "감정이 먼저 튀어나오지만 한두 문장 안에서 쟁점을 붙잡으려 한다.",
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
          "tenant07:a:d-1:rule:2"
        ],
        "forbidAtomIds": [
          "tenant07:a:d-1:unlock:s5:0",
          "tenant07:a:d-1:rule:1"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-1:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:interjection_allow_emotional_only"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "tenant07:beat_v2:b:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "저도 봐줄 만큼 봐줬습니다. 사흘이나 답이 없는데 집주인이 아무 판단도 안 합니까?",
      "behaviorHint": "감정이 먼저 튀어나오지만 한두 문장 안에서 쟁점을 붙잡으려 한다.",
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
          "tenant07:b:d-1:responsibility:2"
        ],
        "forbidAtomIds": [
          "tenant07:b:d-1:responsibility:1",
          "tenant07:b:d-1:motive:4"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-1:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:interjection_allow_emotional_only"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "tenant07:beat_v2:a:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "interject",
      "line": "12% 인상을 감정으로만 밀지 마세요. 지금은 누가 먼저 무엇을 했는지부터 분리해야 합니다.",
      "behaviorHint": "감정이 먼저 튀어나오지만 한두 문장 안에서 쟁점을 붙잡으려 한다.",
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
          "tenant07:a:d-5:fear:0",
          "tenant07:a:d-5:fear:1"
        ],
        "forbidAtomIds": [
          "tenant07:a:d-5:rule:1",
          "tenant07:a:d-5:fear:4"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-5:surface:mid:interjection:emotional_only:block",
      "variantTarget": 2,
      "setFlags": [
        "d-5:surface:interjection_block_emotional_only"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "tenant07:beat_v2:b:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "interject",
      "line": "12% 인상을 감정으로만 밀지 마세요. 지금은 누가 먼저 무엇을 했는지부터 분리해야 합니다.",
      "behaviorHint": "감정이 먼저 튀어나오지만 한두 문장 안에서 쟁점을 붙잡으려 한다.",
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
          "tenant07:b:d-5:fear:0",
          "tenant07:b:d-5:fear:1"
        ],
        "forbidAtomIds": [
          "tenant07:b:d-5:unlock:s5:0",
          "tenant07:b:d-5:self_justification:1"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-5:surface:mid:interjection:emotional_only:block",
      "variantTarget": 2,
      "setFlags": [
        "d-5:surface:interjection_block_emotional_only"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "tenant07:beat_v2:a:d-5:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "interject",
      "line": "12% 인상, 주차비 별도 같은 디테일은 한 줄로 뭉갤 수 없습니다. 그 순서와 범위를 정확히 다시 보셔야 합니다.",
      "behaviorHint": "말을 끊고 손가락으로 숫자나 시각을 짚듯 짧고 또렷하게 반박한다.",
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
          "tenant07:a:d-5:rule:3",
          "tenant07:a:d-5:rule:2"
        ],
        "forbidAtomIds": [
          "tenant07:a:d-5:rule:1",
          "tenant07:a:d-5:fear:4"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-5:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-5:surface:interjection_allow_detail_rebuttal"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "tenant07:beat_v2:b:d-5:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "interject",
      "line": "12% 인상, 주차비 별도 같은 디테일은 한 줄로 뭉갤 수 없습니다. 그 순서와 범위를 정확히 다시 보셔야 합니다.",
      "behaviorHint": "말을 끊고 손가락으로 숫자나 시각을 짚듯 짧고 또렷하게 반박한다.",
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
          "tenant07:b:d-5:fear:0",
          "tenant07:b:d-5:self_justification:3"
        ],
        "forbidAtomIds": [
          "tenant07:b:d-5:unlock:s5:0",
          "tenant07:b:d-5:self_justification:1"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-5:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-5:surface:interjection_allow_detail_rebuttal"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "tenant07:beat_v2:a:d-1:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "4% 인상만 크게 읽으면 안 됩니다. 숫자와 시간, 위치를 따로 끊어 다시 답해 주세요.",
      "behaviorHint": "말을 끊고 손가락으로 숫자나 시각을 짚듯 짧고 또렷하게 반박한다.",
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
          "tenant07:a:d-1:rule:3",
          "tenant07:a:d-1:rule:2"
        ],
        "forbidAtomIds": [
          "tenant07:a:d-1:unlock:s5:0",
          "tenant07:a:d-1:rule:1"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-1:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:interjection_block_detail_rebuttal"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "tenant07:beat_v2:b:d-1:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "4% 인상만 크게 읽으면 안 됩니다. 숫자와 시간, 위치를 따로 끊어 다시 답해 주세요.",
      "behaviorHint": "말을 끊고 손가락으로 숫자나 시각을 짚듯 짧고 또렷하게 반박한다.",
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
          "tenant07:b:d-1:motive:0",
          "tenant07:b:d-1:responsibility:3"
        ],
        "forbidAtomIds": [
          "tenant07:b:d-1:responsibility:1",
          "tenant07:b:d-1:motive:4"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-1:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:interjection_block_detail_rebuttal"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "tenant07:beat_v2:a:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "지금 그 해석은 12% 문의을 거의 확정 사실처럼 굳혀 말하고 있습니다. 그래서 오해가 더 커지는 겁니다.",
      "behaviorHint": "상대 해석이 굳는 지점을 바로 끊어 세우며, 말투가 단단해진다.",
      "applicableStates": [
        "S2",
        "S3"
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
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant07:a:d-2:fear:0",
          "tenant07:a:d-2:fear:1"
        ],
        "forbidAtomIds": [
          "tenant07:a:d-2:fear:4",
          "tenant07:a:d-2:counter:5"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-2:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:interjection_allow_misbelief_escalation"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "misbelief_escalation",
        "red_herring"
      ],
      "beliefMode": "suspects"
    },
    {
      "id": "tenant07:beat_v2:b:d-2:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "12% 문의을 그렇게 단정하면 권진우 쪽 맥락은 사라집니다. 그 확신부터 잠깐 멈춰야 합니다.",
      "behaviorHint": "상대 해석이 굳는 지점을 바로 끊어 세우며, 말투가 단단해진다.",
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
          "tenant07:b:d-2:context:2",
          "tenant07:b:d-2:fear:0"
        ],
        "forbidAtomIds": [
          "tenant07:b:d-2:unlock:s5:0",
          "tenant07:b:d-2:self_justification:1"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-2:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:interjection_block_misbelief_escalation"
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
      "id": "tenant07:beat_v2:a:d-2:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "12% 문의 자료는 앞뒤가 잘리거나 출처가 흔들릴 여지가 있습니다. 그걸 곧바로 결론처럼 쓰면 안 됩니다.",
      "behaviorHint": "자료 출처를 의심하는 표정으로 시선을 낮추고, 함정 가능성을 짚는다.",
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
        "interjectionStates": [
          "allow_last_turn"
        ],
        "trapStates": [
          "cropped_capture",
          "ambiguous_source"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant07:a:d-2:context:3",
          "tenant07:a:d-2:context:2"
        ],
        "forbidAtomIds": [
          "tenant07:a:d-2:fear:4",
          "tenant07:a:d-2:counter:5"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-2:surface:mid:interjection:trap_signal:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:interjection_allow_trap_signal"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "trap_signal",
        "red_herring"
      ]
    },
    {
      "id": "tenant07:beat_v2:b:d-2:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "12% 문의만으로는 함정이 될 수 있습니다. 출처와 전체 맥락 없이 밀어붙이지 마세요.",
      "behaviorHint": "자료 출처를 의심하는 표정으로 시선을 낮추고, 함정 가능성을 짚는다.",
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
        "interjectionStates": [
          "block_last_turn"
        ],
        "trapStates": [
          "cropped_capture",
          "ambiguous_source"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant07:b:d-2:context:2",
          "tenant07:b:d-2:fear:0"
        ],
        "forbidAtomIds": [
          "tenant07:b:d-2:unlock:s5:0",
          "tenant07:b:d-2:self_justification:1"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-2:surface:mid:interjection:trap_signal:block",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:interjection_block_trap_signal"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "trap_signal",
        "red_herring"
      ]
    }
  ]
} as const;
