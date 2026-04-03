// Generated from V2 batch source data
export const tenant08BeatsV2Full = {
  "caseId": "tenant-08",
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
      "d-3": 10,
      "d-4": 5
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
      "id": "tenant08:beat_v2:a:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "보내신 캡처는 원본처럼 안 보입니다. 합계 줄이랑 잘린 부분부터 이상합니다.",
      "behaviorHint": "엑셀 셀 하나를 집어 보여주듯 금액 차이를 짚으며 상대가 의도적으로 속였다는 프레임을 빠르게 만든다.",
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
          "tenant08:a:d-1:timeline:1",
          "tenant08:a:d-1:evidence:0"
        ],
        "forbidAtomIds": [
          "tenant08:a:d-1:unlock:s5:0",
          "tenant08:a:d-1:rule:5"
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
      "id": "tenant08:beat_v2:b:d-1:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "캡처든 PDF든 항목과 합계는 같습니다. 형식만 다시 맞춘 겁니다.",
      "behaviorHint": "문서 위조라는 말이 나오면 '양식만 다시 만든 것'이라고 반복해 편집과 허위 작성의 경계를 흐린다.",
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
          "tenant08:b:d-1:denial:0",
          "tenant08:b:d-1:self_justification:1"
        ],
        "forbidAtomIds": [
          "tenant08:b:d-1:unlock:s5:0",
          "tenant08:b:d-1:admission:5"
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
      "id": "tenant08:beat_v2:a:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "캡처와 PDF 생성 시각이 공식 고지 시점보다 늦고 서로 붙어 있어서, 원본 추출본으로는 안 보입니다.",
      "behaviorHint": "엑셀 셀 하나를 집어 보여주듯 금액 차이를 짚으며 상대가 의도적으로 속였다는 프레임을 빠르게 만든다.",
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
          "tenant08:a:d-1:timeline:2"
        ],
        "forbidAtomIds": [
          "tenant08:a:d-1:unlock:s5:0",
          "tenant08:a:d-1:rule:5"
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
      "id": "tenant08:beat_v2:b:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "보기 좋게 행 순서를 바꾼 건 맞아도, 허위로 새로 만든 건 아니라고 봅니다.",
      "behaviorHint": "문서 위조라는 말이 나오면 '양식만 다시 만든 것'이라고 반복해 편집과 허위 작성의 경계를 흐린다.",
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
          "tenant08:b:d-1:act:2"
        ],
        "forbidAtomIds": [
          "tenant08:b:d-1:unlock:s5:0",
          "tenant08:b:d-1:denial:0"
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
      "id": "tenant08:beat_v2:a:d-1:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "impeach",
      "line": "캡처와 PDF 생성 시각이 공식 고지 시점보다 늦고 서로 붙어 있어서, 원본 추출본으로는 안 보입니다. 호준이 보낸 관리비 상세 캡처까지 같이 놓고 보면 그 흐름이 더 선명해집니다.",
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
          "tenant08:a:d-1:timeline:2",
          "tenant08:a:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "tenant08:a:d-1:unlock:s5:0",
          "tenant08:a:d-1:rule:5"
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
      "id": "tenant08:beat_v2:b:d-1:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "reframe",
      "line": "보기 좋게 행 순서를 바꾼 건 맞아도, 허위로 새로 만든 건 아니라고 봅니다. 관리대행 원본 고지 양식과 파일 메타데이터 비교표까지 같이 놓고 보면 그 흐름이 더 선명해집니다.",
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
          "tenant08:b:d-1:act:2"
        ],
        "forbidAtomIds": [
          "tenant08:b:d-1:unlock:s5:0",
          "tenant08:b:d-1:denial:0"
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
      "id": "tenant08:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "도장까지 붙은 순간 저는 금액보다도 '나를 속이려 한다'는 느낌이 먼저 들었습니다. 그 부분은 이제 숨길 생각이 없습니다.",
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
          "tenant08:a:d-1:emotion:4",
          "tenant08:a:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "tenant08:a:d-1:unlock:s5:0",
          "tenant08:a:d-1:timeline:1"
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
        "d-5:core:document_authenticity_broken"
      ]
    },
    {
      "id": "tenant08:beat_v2:b:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confess",
      "line": "원본이 아니라 제가 다시 만든 파일이었고, 원본처럼 받아들여지게 한 책임은 제게 있습니다.",
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
          "tenant08:b:d-1:motive:4",
          "tenant08:b:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "tenant08:b:d-1:denial:0",
          "tenant08:b:d-1:unlock:s5:0"
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
        "d-5:core:document_authenticity_broken"
      ]
    },
    {
      "id": "tenant08:beat_v2:b:d-1:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "irritated",
      "line": "관리비 상세 캡처 쪽은 이미 여러 번 답했습니다. 같은 축으로만 밀면 오히려 핵심 순서가 흐려집니다.",
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
          "tenant08:b:d-1:act:2",
          "tenant08:b:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "tenant08:b:d-1:unlock:s5:0",
          "tenant08:b:d-1:denial:0"
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
      "id": "tenant08:beat_v2:b:d-1:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "shut_down",
      "line": "지금은 관리비 상세 캡처을 그 방식으로 더 반복해 답하지 않겠습니다. 자료 순서부터 바로잡고 가죠.",
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
          "tenant08:b:d-1:act:2"
        ],
        "forbidAtomIds": [
          "tenant08:b:d-1:unlock:s5:0",
          "tenant08:b:d-1:denial:0"
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
      "id": "tenant08:beat_v2:b:d-1:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "counterstrike",
      "line": "계속 관리비 상세 캡처만 몰아붙이면, 반대편 누락과 연결 고리까지 같이 봐야 한다는 점도 분명해집니다.",
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
          "tenant08:b:d-1:act:2"
        ],
        "forbidAtomIds": [
          "tenant08:b:d-1:unlock:s5:0",
          "tenant08:b:d-1:denial:0"
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
      "id": "tenant08:beat_v2:a:d-5:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "관리실 도장과 파일 생성기록이 공식문서처럼 보이게 꾸며졌습니다.",
      "behaviorHint": "엑셀 셀 하나를 집어 보여주듯 금액 차이를 짚으며 상대가 의도적으로 속였다는 프레임을 빠르게 만든다.",
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
          "tenant08:a:d-5:evidence:0",
          "tenant08:a:d-5:authenticity:1"
        ],
        "forbidAtomIds": [
          "tenant08:a:d-5:unlock:s5:0",
          "tenant08:a:d-5:rule:5"
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
      "id": "tenant08:beat_v2:b:d-5:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "파일 생성기록이 다르다고 해서 허위 문서가 되는 건 아닙니다.",
      "behaviorHint": "문서 위조라는 말이 나오면 '양식만 다시 만든 것'이라고 반복해 편집과 허위 작성의 경계를 흐린다.",
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
          "tenant08:b:d-5:denial:0",
          "tenant08:b:d-5:counter:1"
        ],
        "forbidAtomIds": [
          "tenant08:b:d-5:unlock:s5:0",
          "tenant08:b:d-5:admission:5"
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
      "id": "tenant08:beat_v2:a:d-5:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "예전 PDF 도장을 떼어 붙인 흔적이 보이고, 생성 프로그램도 다릅니다.",
      "behaviorHint": "엑셀 셀 하나를 집어 보여주듯 금액 차이를 짚으며 상대가 의도적으로 속였다는 프레임을 빠르게 만든다.",
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
          "tenant08:a:d-5:act:2"
        ],
        "forbidAtomIds": [
          "tenant08:a:d-5:unlock:s5:0",
          "tenant08:a:d-5:rule:5"
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
      "id": "tenant08:beat_v2:b:d-5:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "공식 발행처럼 보일 수 있다는 점은 생각이 짧았습니다.",
      "behaviorHint": "문서 위조라는 말이 나오면 '양식만 다시 만든 것'이라고 반복해 편집과 허위 작성의 경계를 흐린다.",
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
          "tenant08:b:d-5:act:2"
        ],
        "forbidAtomIds": [
          "tenant08:b:d-5:unlock:s5:0",
          "tenant08:b:d-5:denial:0"
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
      "id": "tenant08:beat_v2:a:d-5:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "impeach",
      "line": "예전 PDF 도장을 떼어 붙인 흔적이 보이고, 생성 프로그램도 다릅니다. 호준이 보낸 관리비 상세 캡처까지 같이 놓고 보면 그 흐름이 더 선명해집니다.",
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
          "tenant08:a:d-5:act:2",
          "tenant08:a:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "tenant08:a:d-5:unlock:s5:0",
          "tenant08:a:d-5:rule:5"
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
        "e-2"
      ]
    },
    {
      "id": "tenant08:beat_v2:b:d-5:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "reframe",
      "line": "공식 발행처럼 보일 수 있다는 점은 생각이 짧았습니다. 건물 회계장부까지 같이 놓고 보면 그 흐름이 더 선명해집니다.",
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
          "tenant08:b:d-5:act:2"
        ],
        "forbidAtomIds": [
          "tenant08:b:d-5:unlock:s5:0",
          "tenant08:b:d-5:denial:0"
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
        "e-6"
      ]
    },
    {
      "id": "tenant08:beat_v2:a:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "emotional",
      "line": "이건 금액보다 신뢰를 무너뜨린 문제라 더 예민했습니다. 그 부분은 이제 숨길 생각이 없습니다.",
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
          "tenant08:a:d-5:harm:4",
          "tenant08:a:d-5:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "tenant08:a:d-5:unlock:s5:0",
          "tenant08:a:d-5:rule:5"
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
        "d-5:core:document_authenticity_broken"
      ]
    },
    {
      "id": "tenant08:beat_v2:b:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confess",
      "line": "도장 이미지와 파일 형식을 공식 고지처럼 꾸민 건 제 잘못입니다.",
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
          "tenant08:b:d-5:institution:4",
          "tenant08:b:d-5:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "tenant08:b:d-5:denial:0",
          "tenant08:b:d-5:counter:1"
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
        "d-5:core:document_authenticity_broken"
      ]
    },
    {
      "id": "tenant08:beat_v2:b:d-5:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "irritated",
      "line": "관리실 도장 쪽은 이미 여러 번 답했습니다. 같은 축으로만 밀면 오히려 핵심 순서가 흐려집니다.",
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
          "tenant08:b:d-5:act:2",
          "tenant08:b:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "tenant08:b:d-5:unlock:s5:0",
          "tenant08:b:d-5:denial:0"
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
      "id": "tenant08:beat_v2:b:d-5:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "shut_down",
      "line": "지금은 관리실 도장을 그 방식으로 더 반복해 답하지 않겠습니다. 자료 순서부터 바로잡고 가죠.",
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
          "tenant08:b:d-5:act:2"
        ],
        "forbidAtomIds": [
          "tenant08:b:d-5:unlock:s5:0",
          "tenant08:b:d-5:denial:0"
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
      "id": "tenant08:beat_v2:b:d-5:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "counterstrike",
      "line": "계속 관리실 도장만 몰아붙이면, 반대편 누락과 연결 고리까지 같이 봐야 한다는 점도 분명해집니다.",
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
          "tenant08:b:d-5:act:2"
        ],
        "forbidAtomIds": [
          "tenant08:b:d-5:unlock:s5:0",
          "tenant08:b:d-5:denial:0"
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
      "id": "tenant08:beat_v2:a:d-2:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "제 전기사용이 그렇게까지 튄 건 아닙니다. 그 총액을 제 장비 탓으로 돌리는 건 과해요.",
      "behaviorHint": "자신에게 불리한 사용량 이야기는 '그건 뒤에 말씀드릴게요'라며 미뤘다가 막판에 한꺼번에 인정한다.",
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
          "tenant08:a:d-2:denial:0"
        ],
        "forbidAtomIds": [
          "tenant08:a:d-2:unlock:s5:0",
          "tenant08:a:d-2:admission:5"
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
      "id": "tenant08:beat_v2:b:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "작업 장비와 제습기 사용이 늘어난 시점이 검침 증가와 겹칩니다.",
      "behaviorHint": "목소리가 흔들리면 다시 숫자와 합계만 읽어 내려가며 대화를 표 계산 문제처럼 되돌린다.",
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
          "tenant08:b:d-2:act:0"
        ],
        "forbidAtomIds": [
          "tenant08:b:d-2:unlock:s5:0",
          "tenant08:b:d-2:admission:5"
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
      "id": "tenant08:beat_v2:a:d-2:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "밤샘 렌더링이 길게 간 주간은 있었어요. 그래도 그게 전체 금액 전부는 아닙니다.",
      "behaviorHint": "자신에게 불리한 사용량 이야기는 '그건 뒤에 말씀드릴게요'라며 미뤘다가 막판에 한꺼번에 인정한다.",
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
          "tenant08:a:d-2:context:3",
          "tenant08:a:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "tenant08:a:d-2:unlock:s5:0",
          "tenant08:a:d-2:denial:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:motive:motive",
      "coverageKey": "a:d-2:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-2:motive:motive_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "tenant08:beat_v2:b:d-2:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "reframe",
      "line": "다만 총액 전부를 그 세대 사용만으로 설명하긴 어렵습니다. 전력회사 원시 계량 로그까지 같이 놓고 보면 그 흐름이 더 선명해집니다.",
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
          "tenant08:b:d-2:evidence:2",
          "tenant08:b:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "tenant08:b:d-2:unlock:s5:0",
          "tenant08:b:d-2:admission:5"
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
        "e-3"
      ]
    },
    {
      "id": "tenant08:beat_v2:a:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "제가 먼저 그 얘길 하면 '관리비도 안 내는 세입자'라고 찍힐까 봐 무서웠습니다. 그 부분은 이제 숨길 생각이 없습니다.",
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
          "tenant08:a:d-2:shame:4",
          "tenant08:a:d-2:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "tenant08:a:d-2:denial:0",
          "tenant08:a:d-2:unlock:s5:0"
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
        "d-2:motive:external_costs_split"
      ]
    },
    {
      "id": "tenant08:beat_v2:a:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confused",
      "line": "공실 상가 전기료 하나만 앞세우면 결국 전체 책임이 한쪽에만 덮어씌워집니다. 누수 점검비까지 같이 봐야 합니다.",
      "behaviorHint": "엑셀 셀 하나를 집어 보여주듯 금액 차이를 짚으며 상대가 의도적으로 속였다는 프레임을 빠르게 만든다.",
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
          "tenant08:a:d-3:self_justification:3",
          "tenant08:a:d-3:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "tenant08:a:d-3:unlock:s5:0",
          "tenant08:a:d-3:admission:5"
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
        "d-3:surface:identity_pressed"
      ],
      "tags": [
        "hot",
        "trap"
      ]
    },
    {
      "id": "tenant08:beat_v2:b:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confused",
      "line": "지금 보이는 장면만으로는 공실 상가 전기료의 앞뒤가 비어 있습니다. 누수 점검비 맥락을 빼면 해석이 과해집니다.",
      "behaviorHint": "자신이 넣은 항목을 따지는 질문이 나오면 건물 전체 유지비라는 말로 세대별 책임을 넓게 섞어 설명한다.",
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
          "tenant08:b:d-3:act:2"
        ],
        "forbidAtomIds": [
          "tenant08:b:d-3:unlock:s5:0",
          "tenant08:b:d-3:admission:5"
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
        "d-3:surface:context_pressed"
      ],
      "tags": [
        "hot",
        "trap"
      ]
    },
    {
      "id": "tenant08:beat_v2:a:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confused",
      "line": "처음 해석이 그렇게 굳어져 있던 탓에, 공실 상가 전기료 문제는 사실 판단을 넘어 감정의 상처로 남았습니다.",
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
          "tenant08:a:d-3:fear:4",
          "tenant08:a:d-3:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "tenant08:a:d-3:denial:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:trap:emotion",
      "coverageKey": "a:d-3:core:late:trap:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-3:core:emotion_opened"
      ],
      "tags": [
        "cold",
        "trap"
      ],
      "requiresFlags": [
        "d-3:motive:misbelief_named",
        "d-2:motive:external_costs_split"
      ]
    },
    {
      "id": "tenant08:beat_v2:b:d-3:core:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confused",
      "line": "이제는 공실 상가 전기료만 떼지 말고 누수 점검비까지 같이 놓고 다시 정리해야 합니다.",
      "behaviorHint": "목소리가 흔들리면 다시 숫자와 합계만 읽어 내려가며 대화를 표 계산 문제처럼 되돌린다.",
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
          "tenant08:b:d-3:admission:5",
          "tenant08:b:d-3:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "tenant08:b:d-3:rule:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:trap:context",
      "coverageKey": "b:d-3:core:late:trap:context",
      "variantTarget": 3,
      "setFlags": [
        "d-3:core:context_opened"
      ],
      "tags": [
        "cold",
        "trap"
      ],
      "requiresFlags": [
        "d-3:motive:misbelief_named",
        "d-2:motive:external_costs_split"
      ]
    },
    {
      "id": "tenant08:beat_v2:a:d-3:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "reframe",
      "line": "전력회사 로그를 보니 공용부와 빈 상가 구간이 따로 튄 건 보입니다. 전력회사 원시 계량 로그까지 같이 놓고 보면 그 흐름이 더 선명해집니다.",
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
          "tenant08:a:d-3:evidence:2"
        ],
        "forbidAtomIds": [
          "tenant08:a:d-3:unlock:s5:0",
          "tenant08:a:d-3:denial:0"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:evidence:context",
      "coverageKey": "a:d-3:motive:mid:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-3:motive:context_evidence_seen"
      ],
      "tags": [
        "cold",
        "evidence"
      ],
      "requiresFlags": [
        "d-3:surface:timeline_pressed"
      ],
      "evidenceIds": [
        "e-3"
      ]
    },
    {
      "id": "tenant08:beat_v2:b:d-3:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confess",
      "line": "빈 상가 전기료와 누수 점검비를 지현 씨 관리비에 섞은 건 제 책임입니다. 그 부분은 이제 숨길 생각이 없습니다.",
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
          "tenant08:b:d-3:fear:4",
          "tenant08:b:d-3:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "tenant08:b:d-3:unlock:s5:0",
          "tenant08:b:d-3:rule:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:rapport:emotion",
      "coverageKey": "b:d-3:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-3:core:emotion_volunteered"
      ],
      "tags": [
        "late",
        "free"
      ],
      "requiresFlags": [
        "d-3:motive:misbelief_named",
        "d-2:motive:external_costs_split"
      ]
    },
    {
      "id": "tenant08:beat_v2:a:d-4:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "원본도 안 주는데 그 금액을 그대로 낼 수는 없었습니다.",
      "behaviorHint": "자신에게 불리한 사용량 이야기는 '그건 뒤에 말씀드릴게요'라며 미뤘다가 막판에 한꺼번에 인정한다.",
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
          "tenant08:a:d-4:self_justification:0",
          "tenant08:a:d-4:uncertainty:1"
        ],
        "forbidAtomIds": [
          "tenant08:a:d-4:unlock:s5:0",
          "tenant08:a:d-4:admission:5"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:pressure:timeline",
      "coverageKey": "a:d-4:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-4:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "tenant08:beat_v2:b:d-4:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "이의가 있어도 인정분까지 끊은 건 사실입니다.",
      "behaviorHint": "목소리가 흔들리면 다시 숫자와 합계만 읽어 내려가며 대화를 표 계산 문제처럼 되돌린다.",
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
          "tenant08:b:d-4:rule:1",
          "tenant08:b:d-4:act:0"
        ],
        "forbidAtomIds": [
          "tenant08:b:d-4:unlock:s5:0",
          "tenant08:b:d-4:admission:5"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:surface:pressure:context",
      "coverageKey": "b:d-4:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-4:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "tenant08:beat_v2:a:d-4:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "자동이체를 두 달 다 막은 건 맞습니다.",
      "behaviorHint": "자신에게 불리한 사용량 이야기는 '그건 뒤에 말씀드릴게요'라며 미뤘다가 막판에 한꺼번에 인정한다.",
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
          "tenant08:a:d-4:context:3",
          "tenant08:a:d-4:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "tenant08:a:d-4:unlock:s5:0",
          "tenant08:a:d-4:self_justification:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:pressure:responsibility",
      "coverageKey": "a:d-4:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-4:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "tenant08:beat_v2:b:d-4:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "reframe",
      "line": "다만 제가 원본 요구를 제대로 응답하지 않은 채 독촉부터 보낸 건 사실입니다. 관리비 자동이체 내역과 독촉 문자까지 같이 놓고 보면 그 흐름이 더 선명해집니다.",
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
          "tenant08:b:d-4:counter:3",
          "tenant08:b:d-4:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "tenant08:b:d-4:unlock:s5:0",
          "tenant08:b:d-4:admission:5"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:motive:evidence:legality",
      "coverageKey": "b:d-4:motive:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-4:motive:legality_evidence_seen"
      ],
      "tags": [
        "cold",
        "evidence"
      ],
      "requiresFlags": [
        "d-4:surface:timeline_pressed"
      ],
      "evidenceIds": [
        "e-1"
      ]
    },
    {
      "id": "tenant08:beat_v2:a:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "emotional",
      "line": "사기당하는 기분이 들어서 아예 전액을 세웠습니다. 그 부분은 이제 숨길 생각이 없습니다.",
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
          "tenant08:a:d-4:emotion:4",
          "tenant08:a:d-4:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "tenant08:a:d-4:uncertainty:1",
          "tenant08:a:d-4:self_justification:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:core:rapport:emotion",
      "coverageKey": "a:d-4:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-4:core:emotion_volunteered"
      ],
      "tags": [
        "late",
        "free"
      ],
      "requiresFlags": [
        "d-4:motive:responsibility_named",
        "d-4:motive:withholding_context_changed"
      ]
    },
    {
      "id": "tenant08:beat_v2:a:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "형식이 아니라 속인 거잖아요. 제가 숫자 하나 몰라서 그냥 낼 사람처럼 보였습니까?",
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
          "tenant08:a:d-1:timeline:2"
        ],
        "forbidAtomIds": [
          "tenant08:a:d-1:unlock:s5:0",
          "tenant08:a:d-1:rule:5"
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
      "id": "tenant08:beat_v2:b:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "위조라는 말은 너무 큽니다. 다만 공식처럼 보였다는 점까지는, 이제 부인하지 않겠습니다.",
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
          "tenant08:b:d-1:act:2"
        ],
        "forbidAtomIds": [
          "tenant08:b:d-1:unlock:s5:0",
          "tenant08:b:d-1:denial:0"
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
      "id": "tenant08:beat_v2:a:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "interject",
      "line": "관리실 도장을 감정으로만 밀지 마세요. 지금은 누가 먼저 무엇을 했는지부터 분리해야 합니다.",
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
          "tenant08:a:d-5:act:2"
        ],
        "forbidAtomIds": [
          "tenant08:a:d-5:unlock:s5:0",
          "tenant08:a:d-5:rule:5"
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
      "id": "tenant08:beat_v2:b:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "interject",
      "line": "관리실 도장을 감정으로만 밀지 마세요. 지금은 누가 먼저 무엇을 했는지부터 분리해야 합니다.",
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
          "tenant08:b:d-5:act:2"
        ],
        "forbidAtomIds": [
          "tenant08:b:d-5:unlock:s5:0",
          "tenant08:b:d-5:denial:0"
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
      "id": "tenant08:beat_v2:a:d-5:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "interject",
      "line": "관리실 도장, 도장 합성 같은 디테일은 한 줄로 뭉갤 수 없습니다. 그 순서와 범위를 정확히 다시 보셔야 합니다.",
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
          "tenant08:a:d-5:evidence:3",
          "tenant08:a:d-5:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "tenant08:a:d-5:unlock:s5:0",
          "tenant08:a:d-5:rule:5"
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
      "id": "tenant08:beat_v2:b:d-5:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "interject",
      "line": "관리실 도장, 도장 합성 같은 디테일은 한 줄로 뭉갤 수 없습니다. 그 순서와 범위를 정확히 다시 보셔야 합니다.",
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
          "tenant08:b:d-5:context:3",
          "tenant08:b:d-5:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "tenant08:b:d-5:unlock:s5:0",
          "tenant08:b:d-5:denial:0"
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
      "id": "tenant08:beat_v2:a:d-1:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "관리비 상세 캡처만 크게 읽으면 안 됩니다. 숫자와 시간, 위치를 따로 끊어 다시 답해 주세요.",
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
          "tenant08:a:d-1:evidence:3",
          "tenant08:a:d-1:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "tenant08:a:d-1:unlock:s5:0",
          "tenant08:a:d-1:rule:5"
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
      "id": "tenant08:beat_v2:b:d-1:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "관리비 상세 캡처만 크게 읽으면 안 됩니다. 숫자와 시간, 위치를 따로 끊어 다시 답해 주세요.",
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
          "tenant08:b:d-1:context:3",
          "tenant08:b:d-1:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "tenant08:b:d-1:unlock:s5:0",
          "tenant08:b:d-1:denial:0"
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
      "id": "tenant08:beat_v2:a:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "지금 그 해석은 공실 상가 전기료을 거의 확정 사실처럼 굳혀 말하고 있습니다. 그래서 오해가 더 커지는 겁니다.",
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
          "tenant08:a:d-3:self_justification:3",
          "tenant08:a:d-3:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "tenant08:a:d-3:unlock:s5:0",
          "tenant08:a:d-3:denial:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:interjection_allow_misbelief_escalation"
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
      "id": "tenant08:beat_v2:b:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "지금 그 해석은 공실 상가 전기료을 거의 확정 사실처럼 굳혀 말하고 있습니다. 그래서 오해가 더 커지는 겁니다.",
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
          "tenant08:b:d-3:act:2"
        ],
        "forbidAtomIds": [
          "tenant08:b:d-3:unlock:s5:0",
          "tenant08:b:d-3:admission:5"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:interjection_allow_misbelief_escalation"
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
      "id": "tenant08:beat_v2:a:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "공실 상가 전기료을 그렇게 단정하면 누수 점검비 쪽 맥락은 사라집니다. 그 확신부터 잠깐 멈춰야 합니다.",
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
          "tenant08:a:d-3:self_justification:3",
          "tenant08:a:d-3:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "tenant08:a:d-3:unlock:s5:0",
          "tenant08:a:d-3:denial:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:interjection_block_misbelief_escalation"
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
      "id": "tenant08:beat_v2:b:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-08",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "공실 상가 전기료을 그렇게 단정하면 누수 점검비 쪽 맥락은 사라집니다. 그 확신부터 잠깐 멈춰야 합니다.",
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
          "tenant08:b:d-3:act:2"
        ],
        "forbidAtomIds": [
          "tenant08:b:d-3:unlock:s5:0",
          "tenant08:b:d-3:admission:5"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:interjection_block_misbelief_escalation"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "misbelief_escalation"
      ],
      "beliefMode": "misbelief"
    }
  ]
} as const;
