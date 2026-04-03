// Generated from V2 batch source data
export const tenant05BeatsV2Full = {
  "caseId": "tenant-05",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 50,
    "byActionFamily": {
      "question": 20,
      "evidence": 7,
      "free_question": 5,
      "fatigue": 6,
      "interjection": 12
    },
    "byDispute": {
      "d-1": 15,
      "d-5": 15,
      "d-2": 5,
      "d-3": 5,
      "d-4": 10
    },
    "byIssueRole": {
      "core_truth": 30,
      "sub_truth": 10,
      "shared_misconception": 10
    },
    "interjectionInfoLevels": {
      "emotional_only": 4,
      "detail_rebuttal": 4,
      "misbelief_escalation": 4
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
      "interjection_misbelief": true
    },
    "allRequiredCoverageSatisfied": true
  },
  "beats": [
    {
      "id": "tenant05:beat_v2:a:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "그분이 저를 '문제 세입자'처럼 말하고 다닌 게 먼저였습니다.",
      "behaviorHint": "상대가 한 말이 불리하다고 느끼면 그 문장을 거의 그대로 반복해 되물으며 말꼬리를 잡는다.",
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
          "tenant05:a:d-1:context:0",
          "tenant05:a:d-1:act:0"
        ],
        "forbidAtomIds": [
          "tenant05:a:d-1:counter:0",
          "tenant05:a:d-1:evidence:0"
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
      "id": "tenant05:beat_v2:b:d-1:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "건물 평판을 지켜야 하는 입장도 있지 않습니까.",
      "behaviorHint": "불리해지면 '새로 들어올 분들이 먼저 걱정해서'라고 말해 자신이 주도했다는 인상을 줄인다.",
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
          "tenant05:b:d-1:context:0"
        ],
        "forbidAtomIds": [
          "tenant05:b:d-1:unlock:s5:0",
          "tenant05:b:d-1:admission:0"
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
      "id": "tenant05:beat_v2:a:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "제가 모든 수신자를 직접 본 건 아니어도, 캡처랑 종결 메모를 같이 보면 말이 과장됐다는 건 분명합니다.",
      "behaviorHint": "책임을 묻는 질문이 나오면 설명보다 먼저 계좌 캡처와 사진첩을 빠르게 넘겨 보인다.",
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
          "tenant05:a:d-1:counter:0"
        ],
        "forbidAtomIds": [
          "tenant05:a:d-1:evidence:0",
          "tenant05:a:d-1:context:0"
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
      "id": "tenant05:beat_v2:b:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "말이 길어지다 보니 한 문장으로 묶였을 뿐입니다.",
      "behaviorHint": "한 번의 옛 사건도 여러 번 있었던 것처럼 날짜를 길게 나열하며 현재 분쟁과 묶는다.",
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
          "tenant05:b:d-1:motive:0",
          "tenant05:b:d-1:fear:0"
        ],
        "forbidAtomIds": [
          "tenant05:b:d-1:unlock:s5:0",
          "tenant05:b:d-1:denial:0"
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
      "id": "tenant05:beat_v2:a:d-1:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "impeach",
      "line": "제가 모든 수신자를 직접 본 건 아니어도, 캡처랑 종결 메모를 같이 보면 말이 과장됐다는 건 분명합니다. 입주 예정자까지 같이 놓고 보면 그 흐름이 더 선명해집니다.",
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
          "tenant05:a:d-1:evidence:0",
          "tenant05:a:d-1:counter:0"
        ],
        "forbidAtomIds": [
          "tenant05:a:d-1:context:0"
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
      "id": "tenant05:beat_v2:b:d-1:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "reframe",
      "line": "말이 길어지다 보니 한 문장으로 묶였을 뿐입니다. 과거 옥상 민원 종결 메모까지 같이 놓고 보면 그 흐름이 더 선명해집니다.",
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
          "tenant05:b:d-1:motive:0",
          "tenant05:b:d-1:fear:0"
        ],
        "forbidAtomIds": [
          "tenant05:b:d-1:unlock:s5:0",
          "tenant05:b:d-1:denial:0"
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
        "e-6"
      ]
    },
    {
      "id": "tenant05:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "돈보다 더 아픈 건, 제가 새 동네에서까지 ‘문제 세입자’로 불렸다는 점이에요. 그 부분은 이제 숨길 생각이 없습니다.",
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
          "tenant05:a:d-1:harm:0",
          "tenant05:a:d-1:act:0"
        ],
        "forbidAtomIds": [
          "tenant05:a:d-1:evidence:0",
          "tenant05:a:d-1:context:0"
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
        "d-5:core:reputation_and_deduction_split"
      ]
    },
    {
      "id": "tenant05:beat_v2:b:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "선우 씨를 문제 세입자처럼 말한 표현은 정정해야 합니다.",
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
          "tenant05:b:d-1:fear:0",
          "tenant05:b:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "tenant05:b:d-1:denial:0",
          "tenant05:b:d-1:unlock:s5:0"
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
        "d-5:core:reputation_and_deduction_split"
      ]
    },
    {
      "id": "tenant05:beat_v2:b:d-1:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "irritated",
      "line": "문제 세입자 쪽은 이미 여러 번 답했습니다. 같은 축으로만 밀면 오히려 핵심 순서가 흐려집니다.",
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
          "tenant05:b:d-1:evidence:0",
          "tenant05:b:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "tenant05:b:d-1:unlock:s5:0",
          "tenant05:b:d-1:denial:0"
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
      "id": "tenant05:beat_v2:b:d-1:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "shut_down",
      "line": "지금은 문제 세입자을 그 방식으로 더 반복해 답하지 않겠습니다. 자료 순서부터 바로잡고 가죠.",
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
          "tenant05:b:d-1:unlock:s3:0",
          "tenant05:b:d-1:motive:0"
        ],
        "forbidAtomIds": [
          "tenant05:b:d-1:unlock:s5:0",
          "tenant05:b:d-1:denial:0"
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
      "id": "tenant05:beat_v2:b:d-1:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "counterstrike",
      "line": "계속 문제 세입자만 몰아붙이면, 반대편 누락과 연결 고리까지 같이 봐야 한다는 점도 분명해집니다.",
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
          "tenant05:b:d-1:unlock:s3:0",
          "tenant05:b:d-1:motive:0"
        ],
        "forbidAtomIds": [
          "tenant05:b:d-1:unlock:s5:0",
          "tenant05:b:d-1:denial:0"
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
      "id": "tenant05:beat_v2:a:d-5:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "그 보증금 공제 통보는 처음부터 과했습니다.",
      "behaviorHint": "상대가 한 말이 불리하다고 느끼면 그 문장을 거의 그대로 반복해 되물으며 말꼬리를 잡는다.",
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
          "tenant05:a:d-5:rule:0",
          "tenant05:a:d-5:denial:0"
        ],
        "forbidAtomIds": [
          "tenant05:a:d-5:admission:0",
          "tenant05:a:d-5:unlock:s5:0"
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
      "id": "tenant05:beat_v2:b:d-5:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "그래서 저는 그 비용을 공제 범위에 넣은 겁니다.",
      "behaviorHint": "불리해지면 '새로 들어올 분들이 먼저 걱정해서'라고 말해 자신이 주도했다는 인상을 줄인다.",
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
          "tenant05:b:d-5:denial:0",
          "tenant05:b:d-5:rule:0"
        ],
        "forbidAtomIds": [
          "tenant05:b:d-5:admission:0",
          "tenant05:b:d-5:unlock:s5:0"
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
      "id": "tenant05:beat_v2:a:d-5:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "소액 정산이 일부 있을 수는 있어도, 지금 통보된 공제 규모는 전혀 다른 이야기예요.",
      "behaviorHint": "책임을 묻는 질문이 나오면 설명보다 먼저 계좌 캡처와 사진첩을 빠르게 넘겨 보인다.",
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
          "tenant05:a:d-5:admission:0",
          "tenant05:a:d-5:evidence:0"
        ],
        "forbidAtomIds": [
          "tenant05:a:d-5:unlock:s5:0",
          "tenant05:a:d-5:denial:0"
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
      "id": "tenant05:beat_v2:b:d-5:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "제가 모든 부담을 먼저 떠안아야 하는 입장도 고려해 주셔야죠.",
      "behaviorHint": "대답 전에 길게 숨을 내쉬고, 마치 자신이 먼저 상처받은 사람처럼 느린 톤으로 다시 말을 시작한다.",
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
          "tenant05:b:d-5:rule:0",
          "tenant05:b:d-5:fear:0"
        ],
        "forbidAtomIds": [
          "tenant05:b:d-5:unlock:s5:0",
          "tenant05:b:d-5:denial:0"
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
      "id": "tenant05:beat_v2:a:d-5:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "reframe",
      "line": "소액 정산이 일부 있을 수는 있어도, 지금 통보된 공제 규모는 전혀 다른 이야기예요. 임대차계약서까지 같이 놓고 보면 그 흐름이 더 선명해집니다.",
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
          "tenant05:a:d-5:rule:0",
          "tenant05:a:d-5:evidence:0"
        ],
        "forbidAtomIds": [
          "tenant05:a:d-5:unlock:s5:0",
          "tenant05:a:d-5:denial:0"
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
      "id": "tenant05:beat_v2:b:d-5:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "reframe",
      "line": "제가 모든 부담을 먼저 떠안아야 하는 입장도 고려해 주셔야죠. 복도 CCTV까지 같이 놓고 보면 그 흐름이 더 선명해집니다.",
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
          "tenant05:b:d-5:rule:0",
          "tenant05:b:d-5:fear:0"
        ],
        "forbidAtomIds": [
          "tenant05:b:d-5:unlock:s5:0",
          "tenant05:b:d-5:denial:0"
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
        "e-4"
      ]
    },
    {
      "id": "tenant05:beat_v2:a:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "이사하자마자 돈도 급했고, 이미 소문까지 돌아서 솔직히 더 움츠러들었습니다. 그 부분은 이제 숨길 생각이 없습니다.",
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
          "tenant05:a:d-5:harm:0",
          "tenant05:a:d-5:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "tenant05:a:d-5:denial:0",
          "tenant05:a:d-5:unlock:s5:0"
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
        "d-5:core:damage_origin_shifted"
      ]
    },
    {
      "id": "tenant05:beat_v2:b:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "장롱문 교체비와 탈취비까지 넣은 통보는 제가 과하게 잡은 겁니다.",
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
          "tenant05:b:d-5:fear:0",
          "tenant05:b:d-5:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "tenant05:b:d-5:denial:0",
          "tenant05:b:d-5:unlock:s5:0"
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
        "d-5:core:damage_origin_shifted"
      ]
    },
    {
      "id": "tenant05:beat_v2:b:d-5:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "irritated",
      "line": "보증금 공제 쪽은 이미 여러 번 답했습니다. 같은 축으로만 밀면 오히려 핵심 순서가 흐려집니다.",
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
          "tenant05:b:d-5:context:0",
          "tenant05:b:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "tenant05:b:d-5:unlock:s5:0",
          "tenant05:b:d-5:denial:0"
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
      "id": "tenant05:beat_v2:b:d-5:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "shut_down",
      "line": "지금은 보증금 공제을 그 방식으로 더 반복해 답하지 않겠습니다. 자료 순서부터 바로잡고 가죠.",
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
          "tenant05:b:d-5:rule:0",
          "tenant05:b:d-5:context:0"
        ],
        "forbidAtomIds": [
          "tenant05:b:d-5:unlock:s5:0",
          "tenant05:b:d-5:denial:0"
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
      "id": "tenant05:beat_v2:b:d-5:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "counterstrike",
      "line": "계속 보증금 공제만 몰아붙이면, 반대편 누락과 연결 고리까지 같이 봐야 한다는 점도 분명해집니다.",
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
          "tenant05:b:d-5:rule:0",
          "tenant05:b:d-5:context:0"
        ],
        "forbidAtomIds": [
          "tenant05:b:d-5:unlock:s5:0",
          "tenant05:b:d-5:denial:0"
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
      "id": "tenant05:beat_v2:a:d-2:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "제가 나갈 때는 장롱문도 걸레받이도 멀쩡했습니다.",
      "behaviorHint": "상대가 한 말이 불리하다고 느끼면 그 문장을 거의 그대로 반복해 되물으며 말꼬리를 잡는다.",
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
          "tenant05:a:d-2:timeline:0",
          "tenant05:a:d-2:uncertainty:0"
        ],
        "forbidAtomIds": [
          "tenant05:b:d-2:unlock:s5:0"
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
        "d-2:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "tenant05:beat_v2:b:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "새 입주자 보여주기 전에 상태를 보러 간 것뿐입니다.",
      "behaviorHint": "불리해지면 '새로 들어올 분들이 먼저 걱정해서'라고 말해 자신이 주도했다는 인상을 줄인다.",
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
          "tenant05:b:d-2:context:0"
        ],
        "forbidAtomIds": [
          "tenant05:b:d-2:unlock:s5:0",
          "tenant05:b:d-2:admission:0"
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
        "d-2:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "tenant05:beat_v2:a:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "CCTV랑 도어락 로그를 보면 제가 나간 뒤에 사다리 들고 들어간 흐름이 있잖아요.",
      "behaviorHint": "책임을 묻는 질문이 나오면 설명보다 먼저 계좌 캡처와 사진첩을 빠르게 넘겨 보인다.",
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
          "tenant05:a:d-2:timeline:0",
          "tenant05:a:d-2:harm:0"
        ],
        "forbidAtomIds": [
          "tenant05:a:d-2:uncertainty:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:pressure:responsibility",
      "coverageKey": "a:d-2:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-2:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "tenant05:beat_v2:b:d-2:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "reframe",
      "line": "저도 그때는 상태가 이미 좋지 않다고 본 겁니다. 복도 CCTV까지 같이 놓고 보면 그 흐름이 더 선명해집니다.",
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
          "tenant05:b:d-2:evidence:0",
          "tenant05:b:d-2:self_justification:0"
        ],
        "forbidAtomIds": [
          "tenant05:b:d-2:unlock:s5:0",
          "tenant05:b:d-2:denial:0"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:evidence:legality",
      "coverageKey": "b:d-2:motive:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:legality_evidence_seen"
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
      "id": "tenant05:beat_v2:a:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "제가 만든 손상도 아닌데 그걸 안고 새집으로 와야 했다는 게 너무 억울했습니다. 그 부분은 이제 숨길 생각이 없습니다.",
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
          "tenant05:a:d-2:harm:0"
        ],
        "forbidAtomIds": [
          "tenant05:a:d-2:uncertainty:0",
          "tenant05:a:d-2:timeline:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:core:rapport:emotion",
      "coverageKey": "a:d-2:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-2:core:emotion_volunteered"
      ],
      "tags": [
        "late",
        "free"
      ],
      "requiresFlags": [
        "d-2:motive:responsibility_named",
        "d-5:core:damage_origin_shifted"
      ]
    },
    {
      "id": "tenant05:beat_v2:a:d-3:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "그건 아직 정산이 안 끝난 문제였고, 일부러 숨긴 건 아니었습니다.",
      "behaviorHint": "상대가 한 말이 불리하다고 느끼면 그 문장을 거의 그대로 반복해 되물으며 말꼬리를 잡는다.",
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
          "tenant05:a:d-3:motive:0",
          "tenant05:a:d-3:act:0"
        ],
        "forbidAtomIds": [
          "tenant05:a:d-3:admission:0",
          "tenant05:a:d-3:unlock:s5:0"
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
      "id": "tenant05:beat_v2:b:d-3:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "카드 반납이나 미납 항목은 그냥 넘길 수 없었습니다.",
      "behaviorHint": "불리해지면 '새로 들어올 분들이 먼저 걱정해서'라고 말해 자신이 주도했다는 인상을 줄인다.",
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
          "tenant05:b:d-3:counter:0",
          "tenant05:b:d-3:rule:0"
        ],
        "forbidAtomIds": [
          "tenant05:b:d-3:act:0"
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
      "id": "tenant05:beat_v2:a:d-3:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "계약상 정산 대상일 수는 있어도, 최종 점검 때 같이 처리하려고 했던 겁니다.",
      "behaviorHint": "책임을 묻는 질문이 나오면 설명보다 먼저 계좌 캡처와 사진첩을 빠르게 넘겨 보인다.",
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
          "tenant05:a:d-3:motive:0",
          "tenant05:a:d-3:shame:0"
        ],
        "forbidAtomIds": [
          "tenant05:a:d-3:unlock:s5:0",
          "tenant05:a:d-3:admission:0"
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
      "id": "tenant05:beat_v2:b:d-3:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "reframe",
      "line": "이 항목을 근거로 평판 문제나 큰 손상 책임까지 밀어붙이는 건 과합니다. 임대차계약서까지 같이 놓고 보면 그 흐름이 더 선명해집니다.",
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
          "tenant05:b:d-3:evidence:0",
          "tenant05:b:d-3:rule:0"
        ],
        "forbidAtomIds": [
          "tenant05:a:d-3:unlock:s5:0"
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
      "id": "tenant05:beat_v2:a:d-3:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "솔직히 말하면, 그 작은 누락까지 들키면 또 ‘문제 세입자’ 소리 들을까 봐 먼저 말을 못 꺼냈어요. 그 부분은 이제 숨길 생각이 없습니다.",
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
          "tenant05:a:d-3:shame:0",
          "tenant05:a:d-3:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "tenant05:a:d-3:unlock:s5:0"
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
        "d-5:motive:small_items_isolated"
      ]
    },
    {
      "id": "tenant05:beat_v2:a:d-4:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confused",
      "line": "2년 전 여름 하나만 앞세우면 결국 전체 책임이 한쪽에만 덮어씌워집니다. 옥상 민원 1회까지 같이 봐야 합니다.",
      "behaviorHint": "상대가 한 말이 불리하다고 느끼면 그 문장을 거의 그대로 반복해 되물으며 말꼬리를 잡는다.",
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
          "tenant05:a:d-4:shame:0",
          "tenant05:a:d-4:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "tenant05:a:d-4:admission:0",
          "tenant05:a:d-4:unlock:s5:0"
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
      "id": "tenant05:beat_v2:b:d-4:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confused",
      "line": "지금 보이는 장면만으로는 2년 전 여름의 앞뒤가 비어 있습니다. 옥상 민원 1회 맥락을 빼면 해석이 과해집니다.",
      "behaviorHint": "대답 전에 길게 숨을 내쉬고, 마치 자신이 먼저 상처받은 사람처럼 느린 톤으로 다시 말을 시작한다.",
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
          "tenant05:b:d-4:legacy_sentence:0",
          "tenant05:b:d-4:context:0"
        ],
        "forbidAtomIds": [
          "tenant05:b:d-4:admission:0",
          "tenant05:b:d-4:self_justification:0"
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
      "id": "tenant05:beat_v2:a:d-4:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confused",
      "line": "처음 해석이 그렇게 굳어져 있던 탓에, 2년 전 여름 문제는 사실 판단을 넘어 감정의 상처로 남았습니다.",
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
          "tenant05:a:d-4:shame:0",
          "tenant05:a:d-4:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "tenant05:a:d-4:denial:0",
          "tenant05:a:d-4:unlock:s5:0"
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
        "d-1:motive:legacy_overuse_seen"
      ]
    },
    {
      "id": "tenant05:beat_v2:b:d-4:core:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confused",
      "line": "이제는 2년 전 여름만 떼지 말고 옥상 민원 1회까지 같이 놓고 다시 정리해야 합니다.",
      "behaviorHint": "대답 전에 길게 숨을 내쉬고, 마치 자신이 먼저 상처받은 사람처럼 느린 톤으로 다시 말을 시작한다.",
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
          "tenant05:b:d-4:context:0",
          "tenant05:b:d-4:admission:0"
        ],
        "forbidAtomIds": [
          "tenant05:b:d-4:self_justification:0",
          "tenant05:b:d-4:legacy_sentence:0"
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
        "d-1:motive:legacy_overuse_seen"
      ]
    },
    {
      "id": "tenant05:beat_v2:a:d-4:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "impeach",
      "line": "과거에 한 번 있었던 옥상 일까지는 인정할 수 있어요. 입주 예정자까지 같이 놓고 보면 그 흐름이 더 선명해집니다.",
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
          "tenant05:a:d-4:counter:0",
          "tenant05:a:d-4:context:0"
        ],
        "forbidAtomIds": [
          "tenant05:a:d-4:unlock:s5:0",
          "tenant05:a:d-4:denial:0"
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
        "e-2"
      ]
    },
    {
      "id": "tenant05:beat_v2:b:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "그걸 상습 문제나 실내 흡연처럼 말한 건 제 과장이었습니다. 그 부분은 이제 숨길 생각이 없습니다.",
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
          "tenant05:b:d-4:fear:0"
        ],
        "forbidAtomIds": [
          "tenant05:b:d-4:self_justification:0",
          "tenant05:b:d-4:legacy_sentence:0"
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
        "d-1:motive:legacy_overuse_seen"
      ]
    },
    {
      "id": "tenant05:beat_v2:a:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "그 말 한마디로 제가 새 동네에서까지 어떤 사람으로 보였는지 아세요.",
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
          "tenant05:a:d-1:harm:0",
          "tenant05:a:d-1:act:0"
        ],
        "forbidAtomIds": [
          "tenant05:a:d-1:evidence:0",
          "tenant05:a:d-1:context:0"
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
      "id": "tenant05:beat_v2:b:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "저도 건물 비워 두면 다 제 책임입니다. 그 압박을 누가 대신 감당합니까.",
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
          "tenant05:b:d-1:fear:0",
          "tenant05:b:d-1:motive:0"
        ],
        "forbidAtomIds": [
          "tenant05:b:d-1:unlock:s5:0",
          "tenant05:b:d-1:denial:0"
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
      "id": "tenant05:beat_v2:a:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "interject",
      "line": "보증금 공제을 감정으로만 밀지 마세요. 지금은 누가 먼저 무엇을 했는지부터 분리해야 합니다.",
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
          "tenant05:a:d-5:motive:0"
        ],
        "forbidAtomIds": [
          "tenant05:a:d-5:unlock:s5:0",
          "tenant05:a:d-5:denial:0"
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
      "id": "tenant05:beat_v2:b:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "interject",
      "line": "보증금 공제을 감정으로만 밀지 마세요. 지금은 누가 먼저 무엇을 했는지부터 분리해야 합니다.",
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
          "tenant05:b:d-5:fear:0"
        ],
        "forbidAtomIds": [
          "tenant05:b:d-5:unlock:s5:0",
          "tenant05:b:d-5:denial:0"
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
      "id": "tenant05:beat_v2:a:d-5:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "interject",
      "line": "보증금 공제, 장롱문 교체비 같은 디테일은 한 줄로 뭉갤 수 없습니다. 그 순서와 범위를 정확히 다시 보셔야 합니다.",
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
          "tenant05:a:d-5:evidence:0",
          "tenant05:a:d-5:admission:0"
        ],
        "forbidAtomIds": [
          "tenant05:a:d-5:unlock:s5:0",
          "tenant05:a:d-5:denial:0"
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
      "id": "tenant05:beat_v2:b:d-5:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "interject",
      "line": "보증금 공제, 장롱문 교체비 같은 디테일은 한 줄로 뭉갤 수 없습니다. 그 순서와 범위를 정확히 다시 보셔야 합니다.",
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
          "tenant05:b:d-5:denial:0",
          "tenant05:b:d-5:rule:0"
        ],
        "forbidAtomIds": [
          "tenant05:b:d-5:unlock:s5:0"
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
      "id": "tenant05:beat_v2:a:d-1:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "문제 세입자만 크게 읽으면 안 됩니다. 숫자와 시간, 위치를 따로 끊어 다시 답해 주세요.",
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
          "tenant05:a:d-1:context:0",
          "tenant05:a:d-1:counter:0"
        ],
        "forbidAtomIds": [
          "tenant05:a:d-1:evidence:0"
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
      "id": "tenant05:beat_v2:b:d-1:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "문제 세입자만 크게 읽으면 안 됩니다. 숫자와 시간, 위치를 따로 끊어 다시 답해 주세요.",
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
          "tenant05:b:d-1:unlock:s3:0",
          "tenant05:b:d-1:context:0"
        ],
        "forbidAtomIds": [
          "tenant05:b:d-1:unlock:s5:0",
          "tenant05:b:d-1:denial:0"
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
      "id": "tenant05:beat_v2:a:d-4:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "interject",
      "line": "지금 그 해석은 2년 전 여름을 거의 확정 사실처럼 굳혀 말하고 있습니다. 그래서 오해가 더 커지는 겁니다.",
      "behaviorHint": "상대 해석이 굳는 지점을 바로 끊어 세우며, 말투가 단단해진다.",
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
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant05:a:d-4:shame:0",
          "tenant05:a:d-4:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "tenant05:a:d-4:unlock:s5:0",
          "tenant05:a:d-4:denial:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-4:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-4:surface:interjection_allow_misbelief_escalation"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "misbelief_escalation"
      ],
      "beliefMode": "misbelief"
    },
    {
      "id": "tenant05:beat_v2:b:d-4:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "interject",
      "line": "지금 그 해석은 2년 전 여름을 거의 확정 사실처럼 굳혀 말하고 있습니다. 그래서 오해가 더 커지는 겁니다.",
      "behaviorHint": "상대 해석이 굳는 지점을 바로 끊어 세우며, 말투가 단단해진다.",
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
          "tenant05:b:d-4:legacy_sentence:0",
          "tenant05:b:d-4:context:0"
        ],
        "forbidAtomIds": [
          "tenant05:b:d-4:admission:0",
          "tenant05:b:d-4:self_justification:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-4:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-4:surface:interjection_allow_misbelief_escalation"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "misbelief_escalation"
      ],
      "beliefMode": "weaponizes"
    },
    {
      "id": "tenant05:beat_v2:a:d-4:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "interject",
      "line": "2년 전 여름을 그렇게 단정하면 옥상 민원 1회 쪽 맥락은 사라집니다. 그 확신부터 잠깐 멈춰야 합니다.",
      "behaviorHint": "상대 해석이 굳는 지점을 바로 끊어 세우며, 말투가 단단해진다.",
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
          "tenant05:a:d-4:shame:0",
          "tenant05:a:d-4:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "tenant05:a:d-4:unlock:s5:0",
          "tenant05:a:d-4:denial:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-4:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 2,
      "setFlags": [
        "d-4:surface:interjection_block_misbelief_escalation"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "misbelief_escalation"
      ],
      "beliefMode": "misbelief"
    },
    {
      "id": "tenant05:beat_v2:b:d-4:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "interject",
      "line": "2년 전 여름을 그렇게 단정하면 옥상 민원 1회 쪽 맥락은 사라집니다. 그 확신부터 잠깐 멈춰야 합니다.",
      "behaviorHint": "상대 해석이 굳는 지점을 바로 끊어 세우며, 말투가 단단해진다.",
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
          "tenant05:b:d-4:legacy_sentence:0",
          "tenant05:b:d-4:context:0"
        ],
        "forbidAtomIds": [
          "tenant05:b:d-4:admission:0",
          "tenant05:b:d-4:self_justification:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-4:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 2,
      "setFlags": [
        "d-4:surface:interjection_block_misbelief_escalation"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "misbelief_escalation"
      ],
      "beliefMode": "weaponizes"
    }
  ]
} as const;
