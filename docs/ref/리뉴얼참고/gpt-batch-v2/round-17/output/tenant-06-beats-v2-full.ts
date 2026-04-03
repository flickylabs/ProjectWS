// Generated from V2 batch source data
export const tenant06BeatsV2Full = {
  "caseId": "tenant-06",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 53,
    "byActionFamily": {
      "question": 23,
      "evidence": 7,
      "free_question": 5,
      "fatigue": 6,
      "interjection": 12
    },
    "byDispute": {
      "d-1": 23,
      "d-3": 15,
      "d-2": 5,
      "d-4": 5,
      "d-5": 5
    },
    "byIssueRole": {
      "shared_misconception": 23,
      "core_truth": 15,
      "sub_truth": 15
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
      "id": "tenant06:beat_v2:a:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "기성이 처음에 편하게 쓰라고 해서 저는 그 공간을 계속 써도 되는 줄 알았다는 입장, 그리고 적어도 전면 금지나 전용 불가라는 선을 분명히 들은 기억은 없다는 주장.",
      "behaviorHint": "정확한 문구를 묻는 질문엔 '대충 그런 뉘앙스였다'며 기억을 둥글게 만든다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
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
          "tenant06:a:d-1:quote:1",
          "tenant06:a:d-1:rule:1"
        ],
        "forbidAtomIds": [
          "tenant06:a:d-1:unlock:s5:0",
          "tenant06:a:d-1:admission:0"
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
        "hot"
      ]
    },
    {
      "id": "tenant06:beat_v2:b:d-1:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "옥상은 단시간 건조, 지하는 한 칸 보관 정도라는 전제가 처음부터 있었다는 설명, 그리고 문서로 박아 두지 않았다고 해서 제한이 없던 건 아니라는 말.",
      "behaviorHint": "자신의 말이 불리해지면 '문서로 확정된 건 아니잖아요'라는 문장을 반복해 구두 허용의 무게를 줄인다.",
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
          "tenant06:b:d-1:rule:1",
          "tenant06:b:d-1:denial:0"
        ],
        "forbidAtomIds": [
          "tenant06:b:d-1:unlock:s5:0",
          "tenant06:b:d-1:admission:0"
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
        "hot"
      ]
    },
    {
      "id": "tenant06:beat_v2:a:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "뒤에 안전과 사전 고지 조건이 붙어 있었던 건 이제 인정하지만 저는 그걸 상시 금지로 읽진 않았다는 해명, 그리고 문자 한 줄의 분위기와 계약 특약을 같은 무게로 보지 않았다는 취지의 답변.",
      "behaviorHint": "설명 대신 같은 각도의 사진 여러 장을 빠르게 보여주며 자기 해석이 맞다는 분위기를 만든다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "shared_misconception",
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
          "tenant06:a:d-1:counter:1",
          "tenant06:a:d-1:context:0"
        ],
        "forbidAtomIds": [
          "tenant06:a:d-1:unlock:s5:0",
          "tenant06:a:d-1:denial:0"
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
        "mid"
      ]
    },
    {
      "id": "tenant06:beat_v2:b:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "다만 카카오톡에선 먼저 편하게 쓰라고 보낸 뒤 조건을 덧붙여 오해 여지를 남긴 건 인정한다는 말, 그리고 그 애매함을 바로 정리하지 않고 뒤늦게 조건을 보태 말한 건 자신의 실수라는 해명.",
      "behaviorHint": "처음엔 말하지 않았던 '잠깐만' '한 칸만' 같은 조건을 나중에 덧붙인다.",
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
          "tenant06:b:d-1:self_justification:1",
          "tenant06:b:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant06:b:d-1:unlock:s5:0",
          "tenant06:b:d-1:denial:0"
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
        "mid"
      ]
    },
    {
      "id": "tenant06:beat_v2:a:d-1:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "reframe",
      "line": "뒤에 안전과 사전 고지 조건이 붙어 있었던 건 이제 인정하지만 저는 그걸 상시 금지로 읽진 않았다는 해명, 그리고 문자 한 줄의 분위기와 계약 특약을 같은 무게로 보지 않았다는 취지의 답변. 임대차계약서까지 같이 놓고 보면 그 흐름이 더 선명해집니다.",
      "behaviorHint": "자료를 손가락으로 짚으며 순서를 고정하고, 말의 범위를 좁혀 답한다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "shared_misconception",
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
          "tenant06:a:d-1:context:0",
          "tenant06:a:d-1:counter:1"
        ],
        "forbidAtomIds": [
          "tenant06:a:d-1:unlock:s5:0",
          "tenant06:a:d-1:denial:0"
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
        "evidence"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "evidenceIds": [
        "e-1"
      ]
    },
    {
      "id": "tenant06:beat_v2:b:d-1:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "reframe",
      "line": "다만 카카오톡에선 먼저 편하게 쓰라고 보낸 뒤 조건을 덧붙여 오해 여지를 남긴 건 인정한다는 말, 그리고 그 애매함을 바로 정리하지 않고 뒤늦게 조건을 보태 말한 건 자신의 실수라는 해명. 주민센터 상담 메모까지 같이 놓고 보면 그 흐름이 더 선명해집니다.",
      "behaviorHint": "자료를 손가락으로 짚으며 순서를 고정하고, 말의 범위를 좁혀 답한다.",
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
          "tenant06:b:d-1:context:0",
          "tenant06:b:d-1:counter:1"
        ],
        "forbidAtomIds": [
          "tenant06:b:d-1:unlock:s5:0",
          "tenant06:b:d-1:denial:0"
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
        "evidence"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "evidenceIds": [
        "e-6"
      ]
    },
    {
      "id": "tenant06:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "결혼 시즌 물건이 몰리자 저는 공용 공간을 사실상 제 작업 보조 공간처럼 기대고 있었다는 고백, 그리고 다시 물어보면 안 된다는 눈치를 스스로 만들며 애매한 허용을 편의 쪽으로만 잡았다는 토로. 그 부분은 이제 숨길 생각이 없습니다.",
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
          "tenant06:a:d-1:unlock:s4:0",
          "tenant06:a:d-1:emotion:0"
        ],
        "forbidAtomIds": [
          "tenant06:a:d-1:uncertainty:0",
          "tenant06:a:d-1:quote:1"
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
        "free"
      ],
      "requiresFlags": [
        "d-1:motive:misbelief_named",
        "d-2:motive:range_misread_confirmed"
      ]
    },
    {
      "id": "tenant06:beat_v2:b:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confess",
      "line": "실제로는 전용 허용도 전면 금지도 아니었고 제가 조건을 분명히 남기지 않아 해석 싸움을 키웠다는 시인, 그리고 유진이 넓게 해석한 책임과 별개로 애매한 안내를 만든 책임이 제게도 있다는 정리.",
      "behaviorHint": "감정을 눌러 담으려 하지만 특정 표현에서 목소리가 잠깐 흔들린다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "shared_misconception",
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
          "tenant06:b:d-1:emotion:0",
          "tenant06:b:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "tenant06:b:d-1:uncertainty:0",
          "tenant06:b:d-1:quote:1"
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
        "cold"
      ],
      "requiresFlags": [
        "d-1:motive:misbelief_named",
        "d-2:motive:range_misread_confirmed"
      ]
    },
    {
      "id": "tenant06:beat_v2:a:d-1:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confused",
      "line": "편하게 쓰세요 하나만 앞세우면 결국 전체 책임이 한쪽에만 덮어씌워집니다. 안전하게만까지 같이 봐야 합니다.",
      "behaviorHint": "설명 대신 같은 각도의 사진 여러 장을 빠르게 보여주며 자기 해석이 맞다는 분위기를 만든다.",
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
          "tenant06:a:d-1:context:0",
          "tenant06:a:d-1:counter:1"
        ],
        "forbidAtomIds": [
          "tenant06:a:d-1:unlock:s5:0",
          "tenant06:a:d-1:admission:0"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:trap:identity",
      "coverageKey": "a:d-1:surface:early:trap:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:identity_pressed"
      ],
      "tags": [
        "hot",
        "trap"
      ]
    },
    {
      "id": "tenant06:beat_v2:b:d-1:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confused",
      "line": "지금 보이는 장면만으로는 편하게 쓰세요의 앞뒤가 비어 있습니다. 안전하게만 맥락을 빼면 해석이 과해집니다.",
      "behaviorHint": "처음엔 말하지 않았던 '잠깐만' '한 칸만' 같은 조건을 나중에 덧붙인다.",
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
          "tenant06:b:d-1:context:0",
          "tenant06:b:d-1:counter:1"
        ],
        "forbidAtomIds": [
          "tenant06:b:d-1:unlock:s5:0",
          "tenant06:b:d-1:admission:0"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:trap:context",
      "coverageKey": "b:d-1:surface:early:trap:context",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:context_pressed"
      ],
      "tags": [
        "hot",
        "trap"
      ]
    },
    {
      "id": "tenant06:beat_v2:a:d-1:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confused",
      "line": "처음 해석이 그렇게 굳어져 있던 탓에, 편하게 쓰세요 문제는 사실 판단을 넘어 감정의 상처로 남았습니다.",
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
          "tenant06:a:d-1:unlock:s4:0",
          "tenant06:a:d-1:emotion:0"
        ],
        "forbidAtomIds": [
          "tenant06:a:d-1:uncertainty:0",
          "tenant06:a:d-1:quote:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:trap:emotion",
      "coverageKey": "a:d-1:core:late:trap:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-1:core:emotion_opened"
      ],
      "tags": [
        "cold",
        "trap"
      ],
      "requiresFlags": [
        "d-1:motive:misbelief_named",
        "d-2:motive:range_misread_confirmed"
      ]
    },
    {
      "id": "tenant06:beat_v2:b:d-1:core:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confused",
      "line": "이제는 편하게 쓰세요만 떼지 말고 안전하게만까지 같이 놓고 다시 정리해야 합니다.",
      "behaviorHint": "감정이 격해질수록 날짜, 칸 수, 통로 폭 같은 숫자를 다시 읽으며 대화를 수치 문제로 재설정한다.",
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
          "tenant06:b:d-1:legacy_sentence:1",
          "tenant06:b:d-1:admission:0"
        ],
        "forbidAtomIds": [
          "tenant06:b:d-1:uncertainty:0",
          "tenant06:b:d-1:quote:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:trap:context",
      "coverageKey": "b:d-1:core:late:trap:context",
      "variantTarget": 3,
      "setFlags": [
        "d-1:core:context_opened"
      ],
      "tags": [
        "cold",
        "trap"
      ],
      "requiresFlags": [
        "d-1:motive:misbelief_named",
        "d-2:motive:range_misread_confirmed"
      ]
    },
    {
      "id": "tenant06:beat_v2:a:d-1:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "irritated",
      "line": "편하게 쓰세요 쪽은 이미 여러 번 답했습니다. 같은 축으로만 밀면 오히려 핵심 순서가 흐려집니다.",
      "behaviorHint": "같은 축의 질문이 누적돼 한숨이 길어지고, 말끝이 짧아진다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
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
          "tenant06:a:d-1:context:0",
          "tenant06:a:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "tenant06:a:d-1:unlock:s5:0",
          "tenant06:a:d-1:denial:0"
        ]
      },
      "weight": 5,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:fatigue:timeline",
      "coverageKey": "a:d-1:surface:mid:fatigue:timeline",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:fatigue_irritated"
      ],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "tenant06:beat_v2:a:d-1:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "shut_down",
      "line": "지금은 편하게 쓰세요을 그 방식으로 더 반복해 답하지 않겠습니다. 자료 순서부터 바로잡고 가죠.",
      "behaviorHint": "같은 축의 질문이 누적돼 한숨이 길어지고, 말끝이 짧아진다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
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
          "tenant06:a:d-1:counter:1",
          "tenant06:a:d-1:context:0"
        ],
        "forbidAtomIds": [
          "tenant06:a:d-1:unlock:s5:0",
          "tenant06:a:d-1:denial:0"
        ]
      },
      "weight": 5,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:fatigue:responsibility",
      "coverageKey": "a:d-1:surface:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:fatigue_block"
      ],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "tenant06:beat_v2:a:d-1:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "counterstrike",
      "line": "계속 편하게 쓰세요만 몰아붙이면, 반대편 누락과 연결 고리까지 같이 봐야 한다는 점도 분명해집니다.",
      "behaviorHint": "같은 축의 질문이 누적돼 한숨이 길어지고, 말끝이 짧아진다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "shared_misconception",
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
          "tenant06:a:d-1:counter:1",
          "tenant06:a:d-1:context:0"
        ],
        "forbidAtomIds": [
          "tenant06:a:d-1:unlock:s5:0",
          "tenant06:a:d-1:denial:0"
        ]
      },
      "weight": 5,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:responsibility",
      "coverageKey": "a:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:fatigue_counter"
      ],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "tenant06:beat_v2:a:d-3:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "기성이 상의도 없이 비밀번호를 바꾸고 제 박스를 복도로 빼놓았다는 주장을 바로 세우는 말, 그리고 문자는 이미 다 끝난 뒤에 와서 저는 통보받은 것이 아니라 나중에 알게 됐다는 지적.",
      "behaviorHint": "정확한 문구를 묻는 질문엔 '대충 그런 뉘앙스였다'며 기억을 둥글게 만든다.",
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
          "tenant06:a:d-3:uncertainty:0",
          "tenant06:a:d-3:denial:0"
        ],
        "forbidAtomIds": [
          "tenant06:a:d-3:admission:0",
          "tenant06:a:d-3:rule:1"
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
        "hot",
        "core"
      ]
    },
    {
      "id": "tenant06:beat_v2:b:d-3:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "문자 안내도 했고 복도로 잠시 뺀 것이지 빼앗거나 버린 게 아니라는 해명, 그리고 당시에는 급해서 그렇게 처리할 수밖에 없었다는 변명.",
      "behaviorHint": "자신의 말이 불리해지면 '문서로 확정된 건 아니잖아요'라는 문장을 반복해 구두 허용의 무게를 줄인다.",
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
          "tenant06:b:d-3:rule:1",
          "tenant06:b:d-3:uncertainty:0"
        ],
        "forbidAtomIds": [
          "tenant06:b:d-3:unlock:s5:0",
          "tenant06:b:d-3:admission:0"
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
        "hot",
        "core"
      ]
    },
    {
      "id": "tenant06:beat_v2:a:d-3:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "문자와 사진만 봐도 조치가 먼저, 안내가 나중이라는 순서는 분명하다는 말, 그리고 필요한 정리였더라도 절차 없이 한 일괄 이동은 무단으로 느껴질 수밖에 없었다는 주장.",
      "behaviorHint": "설명 대신 같은 각도의 사진 여러 장을 빠르게 보여주며 자기 해석이 맞다는 분위기를 만든다.",
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
          "tenant06:a:d-3:counter:1",
          "tenant06:a:d-3:self_justification:1"
        ],
        "forbidAtomIds": [
          "tenant06:a:d-3:denial:0",
          "tenant06:a:d-3:admission:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:pressure:responsibility",
      "coverageKey": "a:d-3:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-3:motive:responsibility_named"
      ],
      "tags": [
        "mid",
        "core"
      ]
    },
    {
      "id": "tenant06:beat_v2:b:d-3:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "박스를 한꺼번에 옮기며 개별 동의를 받지 않은 건 사실이지만 유진 적치가 계속돼 폭이 좁아졌다는 점을 다시 드는 말, 그리고 절차상 거칠었어도 원인은 유진 쪽 사용 방식에도 있었다는 책임 전가.",
      "behaviorHint": "처음엔 말하지 않았던 '잠깐만' '한 칸만' 같은 조건을 나중에 덧붙인다.",
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
          "tenant06:b:d-3:self_justification:1",
          "tenant06:b:d-3:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant06:b:d-3:unlock:s5:0",
          "tenant06:b:d-3:denial:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:motive:motive",
      "coverageKey": "b:d-3:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-3:motive:motive_named"
      ],
      "tags": [
        "mid",
        "core"
      ]
    },
    {
      "id": "tenant06:beat_v2:a:d-3:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "reframe",
      "line": "문자와 사진만 봐도 조치가 먼저, 안내가 나중이라는 순서는 분명하다는 말, 그리고 필요한 정리였더라도 절차 없이 한 일괄 이동은 무단으로 느껴질 수밖에 없었다는 주장. 비밀번호 변경 문자까지 같이 놓고 보면 그 흐름이 더 선명해집니다.",
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
          "tenant06:a:d-3:counter:1",
          "tenant06:a:d-3:context:0"
        ],
        "forbidAtomIds": [
          "tenant06:a:d-3:denial:0",
          "tenant06:a:d-3:admission:0"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:evidence:legality",
      "coverageKey": "a:d-3:motive:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-3:motive:legality_evidence_seen"
      ],
      "tags": [
        "cold",
        "evidence",
        "core"
      ],
      "requiresFlags": [
        "d-3:surface:timeline_pressed"
      ],
      "evidenceIds": [
        "e-3"
      ]
    },
    {
      "id": "tenant06:beat_v2:b:d-3:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "reframe",
      "line": "박스를 한꺼번에 옮기며 개별 동의를 받지 않은 건 사실이지만 유진 적치가 계속돼 폭이 좁아졌다는 점을 다시 드는 말, 그리고 절차상 거칠었어도 원인은 유진 쪽 사용 방식에도 있었다는 책임 전가. 지하 복도 CCTV까지 같이 놓고 보면 그 흐름이 더 선명해집니다.",
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
          "tenant06:b:d-3:context:0"
        ],
        "forbidAtomIds": [
          "tenant06:b:d-3:unlock:s5:0",
          "tenant06:b:d-3:denial:0"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:evidence:identity",
      "coverageKey": "b:d-3:motive:mid:evidence:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-3:motive:identity_evidence_seen"
      ],
      "tags": [
        "cold",
        "evidence",
        "core"
      ],
      "requiresFlags": [
        "d-3:surface:timeline_pressed"
      ],
      "evidenceIds": [
        "e-5"
      ]
    },
    {
      "id": "tenant06:beat_v2:a:d-3:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "문이 안 열리고 박스가 복도에 나온 걸 봤을 때 저는 민폐 취급당한 기분이 한꺼번에 올라왔다는 토로, 그리고 한마디 상의 없이 제 물건이 움직여졌다는 감각이 서운함을 넘어서 모욕처럼 남았다는 고백. 그 부분은 이제 숨길 생각이 없습니다.",
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
          "tenant06:a:d-3:emotion:0",
          "tenant06:a:d-3:fear:1"
        ],
        "forbidAtomIds": [
          "tenant06:a:d-3:uncertainty:0",
          "tenant06:a:d-3:quote:1"
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
        "free",
        "core"
      ],
      "requiresFlags": [
        "d-3:motive:responsibility_named",
        "d-5:core:move_caused_damage"
      ]
    },
    {
      "id": "tenant06:beat_v2:b:d-3:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confess",
      "line": "실제로는 사전 합의 없이 비밀번호를 바꾸고 박스를 먼저 옮긴 뒤 문자로 알린 것이 맞다는 시인, 그리고 관리 필요가 있었더라도 그 절차를 건너뛴 책임은 제게 있다는 정리.",
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
          "tenant06:b:d-3:emotion:0",
          "tenant06:b:d-3:fear:1"
        ],
        "forbidAtomIds": [
          "tenant06:b:d-3:uncertainty:0",
          "tenant06:b:d-3:quote:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:rapport:emotion",
      "coverageKey": "b:d-3:core:late:rapport:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-3:core:emotion_opened"
      ],
      "tags": [
        "cold",
        "core"
      ],
      "requiresFlags": [
        "d-3:motive:responsibility_named",
        "d-5:core:move_caused_damage"
      ]
    },
    {
      "id": "tenant06:beat_v2:b:d-3:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "irritated",
      "line": "비밀번호 교체 쪽은 이미 여러 번 답했습니다. 같은 축으로만 밀면 오히려 핵심 순서가 흐려집니다.",
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
          "tenant06:b:d-3:context:0",
          "tenant06:b:d-3:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "tenant06:b:d-3:unlock:s5:0",
          "tenant06:b:d-3:denial:0"
        ]
      },
      "weight": 5,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:fatigue:timeline",
      "coverageKey": "b:d-3:surface:mid:fatigue:timeline",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:fatigue_irritated"
      ],
      "tags": [
        "fatigue",
        "core"
      ]
    },
    {
      "id": "tenant06:beat_v2:b:d-3:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "shut_down",
      "line": "지금은 비밀번호 교체을 그 방식으로 더 반복해 답하지 않겠습니다. 자료 순서부터 바로잡고 가죠.",
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
          "tenant06:b:d-3:counter:1",
          "tenant06:b:d-3:context:0"
        ],
        "forbidAtomIds": [
          "tenant06:b:d-3:unlock:s5:0",
          "tenant06:b:d-3:denial:0"
        ]
      },
      "weight": 5,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:fatigue:responsibility",
      "coverageKey": "b:d-3:surface:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:fatigue_block"
      ],
      "tags": [
        "fatigue",
        "core"
      ]
    },
    {
      "id": "tenant06:beat_v2:b:d-3:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "counterstrike",
      "line": "계속 비밀번호 교체만 몰아붙이면, 반대편 누락과 연결 고리까지 같이 봐야 한다는 점도 분명해집니다.",
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
          "tenant06:b:d-3:counter:1",
          "tenant06:b:d-3:context:0"
        ],
        "forbidAtomIds": [
          "tenant06:b:d-3:unlock:s5:0",
          "tenant06:b:d-3:denial:0"
        ]
      },
      "weight": 5,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:fatigue:responsibility",
      "coverageKey": "b:d-3:motive:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:fatigue_counter"
      ],
      "tags": [
        "fatigue",
        "core"
      ]
    },
    {
      "id": "tenant06:beat_v2:a:d-2:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "옥상에 둔 건 작업 중 잠깐 말리거나 정리하려고 둔 것일 뿐 상시 적치는 아니라는 주장, 그리고 통로를 막거나 배수를 해칠 정도는 아니었다고 선을 긋는 말.",
      "behaviorHint": "정확한 문구를 묻는 질문엔 '대충 그런 뉘앙스였다'며 기억을 둥글게 만든다.",
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
          "tenant06:a:d-2:uncertainty:0",
          "tenant06:a:d-2:denial:0"
        ],
        "forbidAtomIds": [
          "tenant06:a:d-2:unlock:s5:0",
          "tenant06:a:d-2:admission:0"
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
      "id": "tenant06:beat_v2:b:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "계속 같은 물건이 남아 있었고 그게 단기 사용이 아니라 상시 적치로 보였다는 설명, 그리고 안전상 그냥 넘길 수 없었다는 관리 책임을 내세우는 답변.",
      "behaviorHint": "자신의 말이 불리해지면 '문서로 확정된 건 아니잖아요'라는 문장을 반복해 구두 허용의 무게를 줄인다.",
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
          "tenant06:b:d-2:rule:1",
          "tenant06:b:d-2:quote:1"
        ],
        "forbidAtomIds": [
          "tenant06:b:d-2:admission:0",
          "tenant06:b:d-2:responsibility:0"
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
      "id": "tenant06:beat_v2:a:d-2:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "몇몇 물건이 예상보다 오래 남아 있었던 건 인정하지만 완전 봉쇄처럼 말하는 건 과하다는 답변, 그리고 점검 사진도 일부 위험만 보여 줄 뿐 전면 금지 수준은 아니었다는 반박.",
      "behaviorHint": "설명 대신 같은 각도의 사진 여러 장을 빠르게 보여주며 자기 해석이 맞다는 분위기를 만든다.",
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
          "tenant06:a:d-2:self_justification:1",
          "tenant06:a:d-2:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant06:a:d-2:unlock:s5:0",
          "tenant06:a:d-2:denial:0"
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
      "id": "tenant06:beat_v2:b:d-2:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "impeach",
      "line": "점검 자료 기준으로는 일부 구간 정리 필요 수준이었는데 저는 그걸 더 급한 위반처럼 말한 면이 있다는 인정, 그리고 그래도 몇 주 적치가 반복된 만큼 관리자로서 제지할 이유는 있었다는 주장. 초기 카카오톡과 중개사 전달 메시지까지 같이 놓고 보면 그 흐름이 더 선명해집니다.",
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
          "tenant06:b:d-2:counter:1",
          "tenant06:b:d-2:self_justification:1"
        ],
        "forbidAtomIds": [
          "tenant06:b:d-2:denial:0",
          "tenant06:b:d-2:admission:0"
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
        "e-2"
      ]
    },
    {
      "id": "tenant06:beat_v2:a:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "결혼 시즌 물량이 쏟아져 옥상을 사실상 완충 공간처럼 쓰면서도 저는 그 불편을 축소해 말했다는 고백, 그리고 민폐로 보이기 싫어서 통로가 좁아진 정도를 제 스스로도 덜 보려 했다는 토로. 그 부분은 이제 숨길 생각이 없습니다.",
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
          "tenant06:a:d-2:emotion:0",
          "tenant06:a:d-2:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "tenant06:a:d-2:uncertainty:0",
          "tenant06:a:d-2:quote:1"
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
        "d-2:motive:range_misread_confirmed"
      ]
    },
    {
      "id": "tenant06:beat_v2:a:d-4:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "옥상과 지하 사용이 실제로는 별문제 없었고 기성이 위험을 너무 크게 말한다는 주장, 그리고 사람이 지날 수 있었으니 위반이라고 볼 정도는 아니라는 말.",
      "behaviorHint": "정확한 문구를 묻는 질문엔 '대충 그런 뉘앙스였다'며 기억을 둥글게 만든다.",
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
          "tenant06:a:d-4:denial:0",
          "tenant06:a:d-4:uncertainty:0"
        ],
        "forbidAtomIds": [
          "tenant06:a:d-4:admission:0",
          "tenant06:a:d-4:responsibility:0"
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
      "id": "tenant06:beat_v2:b:d-4:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "사람이 지나간다고 해서 안전한 건 아니고 점검 지적만 받아도 충분히 문제라는 설명, 그리고 그래서 강하게 말할 수밖에 없었다는 정당화.",
      "behaviorHint": "자신의 말이 불리해지면 '문서로 확정된 건 아니잖아요'라는 문장을 반복해 구두 허용의 무게를 줄인다.",
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
          "tenant06:b:d-4:rule:1",
          "tenant06:b:d-4:quote:1"
        ],
        "forbidAtomIds": [
          "tenant06:b:d-4:admission:0",
          "tenant06:b:d-4:responsibility:0"
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
      "id": "tenant06:beat_v2:a:d-4:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "사진상 일부 폭이 줄고 배수 주변에 물건이 있었던 건 인정하지만 즉시 전면 금지 수준은 아니라는 수정, 그리고 위험의 존재와 과장된 경고는 구분해야 한다는 주장.",
      "behaviorHint": "설명 대신 같은 각도의 사진 여러 장을 빠르게 보여주며 자기 해석이 맞다는 분위기를 만든다.",
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
          "tenant06:a:d-4:self_justification:1",
          "tenant06:a:d-4:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant06:a:d-4:denial:0",
          "tenant06:a:d-4:admission:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:motive:motive",
      "coverageKey": "a:d-4:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-4:motive:motive_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "tenant06:beat_v2:b:d-4:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "reframe",
      "line": "자료상으로는 일부 정리 필요 수준이었는데 저는 통제 근거를 만들려고 더 심각하게 표현한 면이 있다는 인정, 그리고 그래도 위험이 전혀 없었다는 유진 말 역시 사실과 다르다는 반박. 소방점검 사진과 관리실 순찰기록까지 같이 놓고 보면 그 흐름이 더 선명해집니다.",
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
          "tenant06:b:d-4:context:0",
          "tenant06:b:d-4:counter:1"
        ],
        "forbidAtomIds": [
          "tenant06:b:d-4:denial:0",
          "tenant06:b:d-4:admission:0"
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
        "e-4"
      ]
    },
    {
      "id": "tenant06:beat_v2:a:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "비가 오고 작업이 겹치던 시기라 저는 위험 신호를 보고도 문제 없다고 믿고 싶어 했다는 고백, 그리고 조금만 치우면 된다는 생각으로 통로와 배수 부담을 스스로 축소했다는 토로. 그 부분은 이제 숨길 생각이 없습니다.",
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
          "tenant06:a:d-4:emotion:0",
          "tenant06:a:d-4:fear:1"
        ],
        "forbidAtomIds": [
          "tenant06:a:d-4:uncertainty:0",
          "tenant06:a:d-4:quote:1"
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
        "d-4:core:risk_not_zero"
      ]
    },
    {
      "id": "tenant06:beat_v2:a:d-5:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "젖은 가방과 사라진 호스는 거의 전부 기성의 갑작스러운 이동 때문에 생긴 일이라는 주장, 그리고 제 포장 상태를 문제 삼을 건 아니라는 선 긋기.",
      "behaviorHint": "정확한 문구를 묻는 질문엔 '대충 그런 뉘앙스였다'며 기억을 둥글게 만든다.",
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
          "tenant06:a:d-5:denial:0",
          "tenant06:a:d-5:uncertainty:0"
        ],
        "forbidAtomIds": [
          "tenant06:a:d-5:admission:0",
          "tenant06:a:d-5:unlock:s5:0"
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
        "hot"
      ]
    },
    {
      "id": "tenant06:beat_v2:b:d-5:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "복도로 잠깐 옮겼다고 해서 곧바로 손상 책임이 생기는 건 아니라는 해명, 그리고 유진 쪽 보관 방식 자체가 불안정했다는 점을 내세우는 답변.",
      "behaviorHint": "자신의 말이 불리해지면 '문서로 확정된 건 아니잖아요'라는 문장을 반복해 구두 허용의 무게를 줄인다.",
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
          "tenant06:b:d-5:rule:1",
          "tenant06:b:d-5:quote:1"
        ],
        "forbidAtomIds": [
          "tenant06:b:d-5:admission:0",
          "tenant06:b:d-5:unlock:s5:0"
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
        "hot"
      ]
    },
    {
      "id": "tenant06:beat_v2:a:d-5:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "문자와 사진 시점만 봐도 이동 뒤에 문제 제기가 이어졌으니 직접 계기는 이동이라고 보는 말, 그리고 다만 물건 상태를 제가 완벽히 챙기진 못했다는 부분은 아직 작게 남겨 두는 해명.",
      "behaviorHint": "설명 대신 같은 각도의 사진 여러 장을 빠르게 보여주며 자기 해석이 맞다는 분위기를 만든다.",
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
          "tenant06:a:d-5:self_justification:1",
          "tenant06:a:d-5:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant06:a:d-5:unlock:s5:0",
          "tenant06:a:d-5:denial:0"
        ]
      },
      "weight": 6,
      "priority": 30,
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
      "id": "tenant06:beat_v2:b:d-5:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "reframe",
      "line": "다만 제가 일괄 이동을 하면서 물건 보호를 세밀하게 보지 못한 건 사실이고 그 점은 일부 책임이라는 인정, 그리고 그래도 손상 전체를 제 이동만으로 계산하는 건 과하다는 반박. 비밀번호 변경 문자까지 같이 놓고 보면 그 흐름이 더 선명해집니다.",
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
          "tenant06:b:d-5:context:0",
          "tenant06:b:d-5:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "tenant06:b:d-5:unlock:s5:0",
          "tenant06:b:d-5:denial:0"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:evidence:legality",
      "coverageKey": "b:d-5:motive:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-5:motive:legality_evidence_seen"
      ],
      "tags": [
        "cold",
        "evidence"
      ],
      "requiresFlags": [
        "d-5:surface:timeline_pressed"
      ],
      "evidenceIds": [
        "e-3"
      ]
    },
    {
      "id": "tenant06:beat_v2:a:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "그날 이후 저는 손상 자체보다도 남의 손으로 제 보관물을 건드렸다는 사실에 더 예민해졌다는 고백, 그리고 그래서 포장 미흡 가능성은 알면서도 처음엔 전부 상대 탓으로 말하고 싶었다는 토로. 그 부분은 이제 숨길 생각이 없습니다.",
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
          "tenant06:a:d-5:emotion:0",
          "tenant06:a:d-5:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "tenant06:a:d-5:uncertainty:0",
          "tenant06:a:d-5:quote:1"
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
        "free"
      ],
      "requiresFlags": [
        "d-5:motive:responsibility_named",
        "d-5:core:move_caused_damage"
      ]
    },
    {
      "id": "tenant06:beat_v2:a:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "호의라고만 하시면 저는 처음부터 믿고 쓴 사람만 되는 거잖아요. 그 말이 왜 그렇게 들렸는지도 같이 봐 주세요.",
      "behaviorHint": "감정이 먼저 튀어나오지만 한두 문장 안에서 쟁점을 붙잡으려 한다.",
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
          "tenant06:a:d-1:context:0"
        ],
        "forbidAtomIds": [
          "tenant06:a:d-1:unlock:s5:0",
          "tenant06:a:d-1:denial:0"
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
      "id": "tenant06:beat_v2:b:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "집주인이 공용 공간 위험을 보고도 가만있으면 그 책임은 누가 집니까. 관리자가 선을 그어야 할 순간이 있었습니다.",
      "behaviorHint": "감정이 먼저 튀어나오지만 한두 문장 안에서 쟁점을 붙잡으려 한다.",
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
          "tenant06:b:d-1:context:0"
        ],
        "forbidAtomIds": [
          "tenant06:b:d-1:unlock:s5:0",
          "tenant06:b:d-1:denial:0"
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
      "id": "tenant06:beat_v2:a:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "비밀번호 교체을 감정으로만 밀지 마세요. 지금은 누가 먼저 무엇을 했는지부터 분리해야 합니다.",
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
          "tenant06:a:d-3:context:0"
        ],
        "forbidAtomIds": [
          "tenant06:a:d-3:denial:0",
          "tenant06:a:d-3:admission:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-3:surface:mid:interjection:emotional_only:block",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:interjection_block_emotional_only"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "tenant06:beat_v2:b:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "비밀번호 교체을 감정으로만 밀지 마세요. 지금은 누가 먼저 무엇을 했는지부터 분리해야 합니다.",
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
          "tenant06:b:d-3:context:0"
        ],
        "forbidAtomIds": [
          "tenant06:b:d-3:unlock:s5:0",
          "tenant06:b:d-3:denial:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:emotional_only:block",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:interjection_block_emotional_only"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "tenant06:beat_v2:a:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "비밀번호 교체, 박스 이동 같은 디테일은 한 줄로 뭉갤 수 없습니다. 그 순서와 범위를 정확히 다시 보셔야 합니다.",
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
          "tenant06:a:d-3:context:0",
          "tenant06:a:d-3:counter:1"
        ],
        "forbidAtomIds": [
          "tenant06:a:d-3:denial:0",
          "tenant06:a:d-3:admission:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:interjection_allow_detail_rebuttal"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "tenant06:beat_v2:b:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "비밀번호 교체, 박스 이동 같은 디테일은 한 줄로 뭉갤 수 없습니다. 그 순서와 범위를 정확히 다시 보셔야 합니다.",
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
          "tenant06:b:d-3:context:0",
          "tenant06:b:d-3:counter:1"
        ],
        "forbidAtomIds": [
          "tenant06:b:d-3:unlock:s5:0",
          "tenant06:b:d-3:denial:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-3:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:interjection_allow_detail_rebuttal"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "tenant06:beat_v2:a:d-1:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "편하게 쓰세요만 크게 읽으면 안 됩니다. 숫자와 시간, 위치를 따로 끊어 다시 답해 주세요.",
      "behaviorHint": "말을 끊고 손가락으로 숫자나 시각을 짚듯 짧고 또렷하게 반박한다.",
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
          "tenant06:a:d-1:context:0",
          "tenant06:a:d-1:counter:1"
        ],
        "forbidAtomIds": [
          "tenant06:a:d-1:unlock:s5:0",
          "tenant06:a:d-1:denial:0"
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
      "id": "tenant06:beat_v2:b:d-1:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "편하게 쓰세요만 크게 읽으면 안 됩니다. 숫자와 시간, 위치를 따로 끊어 다시 답해 주세요.",
      "behaviorHint": "말을 끊고 손가락으로 숫자나 시각을 짚듯 짧고 또렷하게 반박한다.",
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
          "tenant06:b:d-1:context:0",
          "tenant06:b:d-1:counter:1"
        ],
        "forbidAtomIds": [
          "tenant06:b:d-1:unlock:s5:0",
          "tenant06:b:d-1:denial:0"
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
      "id": "tenant06:beat_v2:a:d-1:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "지금 그 해석은 편하게 쓰세요을 거의 확정 사실처럼 굳혀 말하고 있습니다. 그래서 오해가 더 커지는 겁니다.",
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
          "tenant06:a:d-1:context:0",
          "tenant06:a:d-1:counter:1"
        ],
        "forbidAtomIds": [
          "tenant06:a:d-1:unlock:s5:0",
          "tenant06:a:d-1:denial:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-1:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:interjection_allow_misbelief_escalation"
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
      "id": "tenant06:beat_v2:b:d-1:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "지금 그 해석은 편하게 쓰세요을 거의 확정 사실처럼 굳혀 말하고 있습니다. 그래서 오해가 더 커지는 겁니다.",
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
          "tenant06:b:d-1:context:0",
          "tenant06:b:d-1:counter:1"
        ],
        "forbidAtomIds": [
          "tenant06:b:d-1:unlock:s5:0",
          "tenant06:b:d-1:denial:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-1:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:interjection_allow_misbelief_escalation"
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
      "id": "tenant06:beat_v2:a:d-1:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "편하게 쓰세요을 그렇게 단정하면 안전하게만 쪽 맥락은 사라집니다. 그 확신부터 잠깐 멈춰야 합니다.",
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
          "tenant06:a:d-1:context:0"
        ],
        "forbidAtomIds": [
          "tenant06:a:d-1:unlock:s5:0",
          "tenant06:a:d-1:denial:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-1:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:interjection_block_misbelief_escalation"
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
      "id": "tenant06:beat_v2:b:d-1:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "편하게 쓰세요을 그렇게 단정하면 안전하게만 쪽 맥락은 사라집니다. 그 확신부터 잠깐 멈춰야 합니다.",
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
          "tenant06:b:d-1:context:0",
          "tenant06:b:d-1:counter:1"
        ],
        "forbidAtomIds": [
          "tenant06:b:d-1:unlock:s5:0",
          "tenant06:b:d-1:denial:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-1:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:interjection_block_misbelief_escalation"
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
