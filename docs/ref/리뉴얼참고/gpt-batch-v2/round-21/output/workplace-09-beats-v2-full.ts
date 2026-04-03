export const workplace09BeatsV2Full = {
  "caseId": "workplace-09",
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
      "a": 31,
      "b": 27
    },
    "byIssueRole": {
      "core_truth": 29,
      "sub_truth": 19,
      "shared_misconception": 10
    },
    "byDispute": {
      "d-1": 19,
      "d-2": 10,
      "d-5": 13,
      "d-4": 6,
      "d-3": 10
    },
    "interjectionLevels": {
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
      "interjection_misbelief_escalation": true
    },
    "coverageKeys": [
      "a:d-1:core:late:rapport:emotion",
      "a:d-1:motive:mid:fatigue:timeline",
      "a:d-1:surface:early:evidence:legality",
      "a:d-1:surface:early:pressure:timeline",
      "a:d-1:surface:mid:interjection:emotional_only:allow",
      "a:d-3:surface:early:trap:context",
      "a:d-3:surface:early:trap:identity",
      "a:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "a:d-3:surface:mid:interjection:misbelief_escalation:block",
      "a:d-4:motive:mid:pressure:responsibility",
      "a:d-4:surface:mid:interjection:detail_rebuttal:allow",
      "a:d-4:surface:mid:interjection:detail_rebuttal:block",
      "a:d-5:core:late:motive:motive",
      "a:d-5:surface:mid:interjection:emotional_only:block",
      "b:d-1:core:late:rapport:emotion",
      "b:d-1:surface:mid:interjection:emotional_only:allow",
      "b:d-2:motive:mid:evidence:identity",
      "b:d-2:motive:mid:fatigue:responsibility",
      "b:d-2:surface:early:pressure:identity",
      "b:d-2:surface:mid:interjection:detail_rebuttal:allow",
      "b:d-2:surface:mid:interjection:detail_rebuttal:block",
      "b:d-3:core:late:trap:context",
      "b:d-3:core:late:trap:emotion",
      "b:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "b:d-3:surface:mid:interjection:misbelief_escalation:block",
      "b:d-5:motive:mid:evidence:context",
      "b:d-5:motive:mid:motive:motive",
      "b:d-5:surface:early:pressure:context",
      "b:d-5:surface:mid:interjection:emotional_only:block"
    ]
  },
  "beats": [
    {
      "id": "workplace09:beat_v2:a:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "저는 유은채 씨를 누설자로 단정한 적 없습니다. 그 계정은 한 번만 삐끗해도 끝나는 상황이라 우선 거래처 리스크만 관리하려 했습니다.",
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
          "workplace-09:a:d-1:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:a:d-1:act:0"
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
      "id": "workplace09:beat_v2:a:d-1:surface:pressure:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deflect",
      "line": "저는 유은채 씨를 누설자로 단정한 적 없습니다.",
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
          "workplace-09:a:d-1:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:a:d-1:act:0"
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
      "id": "workplace09:beat_v2:a:d-1:surface:pressure:timeline:03",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "minimize",
      "line": "그 계정은 한 번만 삐끗해도 끝나는 상황이라 우선 거래처 리스크만 관리하려 했습니다.",
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
          "workplace-09:a:d-1:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:a:d-1:act:0"
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
      "id": "workplace09:beat_v2:a:d-1:surface:pressure:timeline:04",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "유은채 씨를 잠깐 뺀 겁니다만, 그건 임시로 정리한 대응이었다고 생각했습니다. 매출 리스크가 커 보여 순서를 그렇게 잡았을 뿐입니다.",
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
          "workplace-09:a:d-1:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:a:d-1:act:0"
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
      "id": "workplace09:beat_v2:a:d-1:surface:pressure:timeline:05",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "reframe",
      "line": "유은채 씨를 잠깐 뺀 겁니다만, 그건 임시로 정리한 대응이었다고 생각했습니다.",
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
          "workplace-09:a:d-1:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:a:d-1:act:0"
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
      "id": "workplace09:beat_v2:a:d-1:surface:pressure:timeline:06",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "counter",
      "line": "매출 리스크가 커 보여 순서를 그렇게 잡았을 뿐입니다.",
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
          "workplace-09:a:d-1:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:a:d-1:act:0"
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
      "id": "workplace09:beat_v2:b:d-2:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "저는 외부에 내부 비난을 퍼뜨린 적 없습니다. 문서 제목과 발신 시각을 확인하려고 최소한으로 물어본 겁니다.",
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
          "workplace-09:b:d-2:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:b:d-2:harm:3"
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
      "id": "workplace09:beat_v2:b:d-2:surface:pressure:identity:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deflect",
      "line": "저는 외부에 내부 비난을 퍼뜨린 적 없습니다.",
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
          "workplace-09:b:d-2:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:b:d-2:harm:3"
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
      "id": "workplace09:beat_v2:b:d-2:surface:pressure:identity:03",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "문서 제목과 발신 시각을 확인하려고 최소한으로 물어본 겁니다.",
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
          "workplace-09:b:d-2:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:b:d-2:harm:3"
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
      "id": "workplace09:beat_v2:b:d-5:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "저는 제3자를 통해 소문을 돌린 게 아닙니다. 문서 제목과 발신 시각을 확인하려고 외부 파트너에게 사실관계만 물은 겁니다.",
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
          "workplace-09:b:d-5:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:b:d-5:shame:3"
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
      "id": "workplace09:beat_v2:b:d-5:surface:pressure:context:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "counter",
      "line": "저는 제3자를 통해 소문을 돌린 게 아닙니다.",
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
          "workplace-09:b:d-5:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:b:d-5:shame:3"
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
      "id": "workplace09:beat_v2:b:d-5:surface:pressure:context:03",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "문서 제목과 발신 시각을 확인하려고 외부 파트너에게 사실관계만 물은 겁니다.",
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
          "workplace-09:b:d-5:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:b:d-5:shame:3"
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
      "id": "workplace09:beat_v2:a:d-4:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "CRM 역할을 줄이고 리스크 메모를 입력한 건 맞습니다. 다만 저는 실제 유출 여부가 불명확한 상태에서 운영상 안전장치를 건다고 생각했습니다.",
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
          "workplace-09:a:d-4:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:a:d-4:responsibility:4"
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
      "id": "workplace09:beat_v2:a:d-4:motive:pressure:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "justify",
      "line": "CRM 역할을 줄이고 리스크 메모를 입력한 건 맞습니다.",
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
          "workplace-09:a:d-4:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:a:d-4:responsibility:4"
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
      "id": "workplace09:beat_v2:a:d-4:motive:pressure:responsibility:03",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "counter",
      "line": "다만 저는 실제 유출 여부가 불명확한 상태에서 운영상 안전장치를 건다고 생각했습니다.",
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
          "workplace-09:a:d-4:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:a:d-4:responsibility:4"
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
      "id": "workplace09:beat_v2:a:d-4:motive:pressure:responsibility:04",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "admit",
      "line": "제가 너무 빨랐던 건 인정합니다. 그래도 자료선이 흔들린 상황이었고, 유은채 씨 쪽도 외부 설명을 바로 정리하지 못한 부분이 있어 더 보수적으로 간 겁니다.",
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
          "workplace-09:a:d-4:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:a:d-4:responsibility:4"
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
      "id": "workplace09:beat_v2:b:d-5:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "justify",
      "line": "제가 강소라 씨에게 내부 책임 소재를 암시한 건 맞습니다. 다만 참조에서 빠진 직후라 저 자신이 희생양인지 확인받고 싶었습니다.",
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
          "workplace-09:b:d-5:motive:2"
        ],
        "forbidAtomIds": [
          "workplace-09:b:d-5:responsibility:4"
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
      "id": "workplace09:beat_v2:b:d-5:motive:motive:motive:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "제가 강소라 씨에게 내부 책임 소재를 암시한 건 맞습니다.",
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
          "workplace-09:b:d-5:motive:2"
        ],
        "forbidAtomIds": [
          "workplace-09:b:d-5:responsibility:4"
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
      "id": "workplace09:beat_v2:b:d-5:motive:motive:motive:03",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "explain",
      "line": "다만 참조에서 빠진 직후라 저 자신이 희생양인지 확인받고 싶었습니다.",
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
          "workplace-09:b:d-5:motive:2"
        ],
        "forbidAtomIds": [
          "workplace-09:b:d-5:responsibility:4"
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
      "id": "workplace09:beat_v2:b:d-5:motive:motive:motive:04",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "crack",
      "line": "제가 내부 채널보다 밖에 먼저 물은 건 잘못입니다. 그래도 준석 씨 쪽도 거래처와 에이전시에 자료관리 이슈를 풍겨 놓은 상태라 추측전은 한쪽만의 문제는 아니었습니다.",
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
          "workplace-09:b:d-5:motive:2"
        ],
        "forbidAtomIds": [
          "workplace-09:b:d-5:responsibility:4"
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
      "id": "workplace09:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "그 계정이 무너지면 팀 전체 매출이 흔들린다는 생각에 제가 겁을 먹었습니다. 그래서 유은채 씨를 임시로 정리한 조치처럼 포장하며 책임 판단을 뒤로 미뤘습니다.",
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
          "workplace-09:a:d-1:context:2"
        ],
        "forbidAtomIds": [
          "workplace-09:a:d-1:act:0"
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
      "id": "workplace09:beat_v2:a:d-1:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "emotion_open",
      "line": "그 계정이 무너지면 팀 전체 매출이 흔들린다는 생각에 제가 겁을 먹었습니다.",
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
          "workplace-09:a:d-1:context:2"
        ],
        "forbidAtomIds": [
          "workplace-09:a:d-1:act:0"
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
      "id": "workplace09:beat_v2:a:d-1:core:rapport:emotion:03",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "shame",
      "line": "그래서 유은채 씨를 임시로 정리한 조치처럼 포장하며 책임 판단을 뒤로 미뤘습니다.",
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
          "workplace-09:a:d-1:context:2"
        ],
        "forbidAtomIds": [
          "workplace-09:a:d-1:act:0"
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
      "id": "workplace09:beat_v2:a:d-1:core:rapport:emotion:04",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "repair",
      "line": "제가 사실확인 전에 유은채 씨를 원인처럼 보고 후속 메일과 계정 회의에서 배제했습니다. 그건 제 잘못이고, 계정 리스크를 핑계로 성급한 낙인을 찍은 제 책임입니다.",
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
          "workplace-09:a:d-1:context:2"
        ],
        "forbidAtomIds": [
          "workplace-09:a:d-1:act:0"
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
      "id": "workplace09:beat_v2:a:d-1:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "참조 제거와 리스크 메모가 모두 사실확인 전에 들어갔는데도 '단정은 아니었다'는 진술이 스스로 충돌합니다.",
      "behaviorHint": "증거를 힐끗 보고 바로 시선을 피한다.",
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
          "workplace-09:a:d-1:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:a:d-1:act:0"
        ]
      },
      "weight": 3,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:evidence:legality",
      "coverageKey": "a:d-1:surface:early:evidence:legality",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:legality_seen"
      ],
      "tags": [
        "cold",
        "evidence"
      ]
    },
    {
      "id": "workplace09:beat_v2:a:d-1:surface:evidence:legality:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "cornered",
      "line": "그 계정이 한 번만 삐끗해도 끝날 수 있어서 먼저 매출 리스크부터 봤어요. 유은채 씨를 바로 문제 삼으려던 건 아니고 잠깐 정리한 거라고 생각했어요.",
      "behaviorHint": "자료 끝을 손가락으로 두드리며 부정의 속도를 늦춘다.",
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
          "workplace-09:a:d-1:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:a:d-1:act:0"
        ]
      },
      "weight": 3,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:evidence:legality",
      "coverageKey": "a:d-1:surface:early:evidence:legality",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:legality_seen"
      ],
      "tags": [
        "cold",
        "evidence"
      ]
    },
    {
      "id": "workplace09:beat_v2:b:d-2:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "내부 화면과 책임 추정 문구가 함께 나갔는데 '확인만 했다'는 설명은 대외 노출 범위와 맞지 않습니다.",
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
          "workplace-09:b:d-2:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:b:d-2:harm:3"
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
      "id": "workplace09:beat_v2:b:d-2:motive:evidence:identity:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "rebut",
      "line": "e-2를 보면 제가 내부 화면을 보낸 건 맞습니다. 다만 그 당시에는 결백을 확인받으려는 확인 요청으로 판단했습니다.",
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
          "workplace-09:b:d-2:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:b:d-2:harm:3"
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
      "id": "workplace09:beat_v2:b:d-5:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "내부 화면과 책임 추정 문구가 함께 나갔는데 '확인만 했다'는 설명은 대외 노출 범위와 맞지 않습니다.",
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
          "workplace-09:b:d-5:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:b:d-5:shame:3"
        ]
      },
      "weight": 3,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:evidence:context",
      "coverageKey": "b:d-5:motive:mid:evidence:context",
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
      "id": "workplace09:beat_v2:b:d-5:motive:evidence:context:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "rebut",
      "line": "참조에서 빠진 직후 강소라 씨에게 물은 건 맞습니다. 다만 제가 희생양인지 확인받고 싶었던 것입니다.",
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
          "workplace-09:b:d-5:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:b:d-5:shame:3"
        ]
      },
      "weight": 3,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:evidence:context",
      "coverageKey": "b:d-5:motive:mid:evidence:context",
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
      "id": "workplace09:beat_v2:a:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "mistaken_certainty",
      "line": "클라이언트 도메인에서 '공유본_팔콘'을 연 로그가 있었기 때문에 저는 실제 유출 정황이 있다고 봤습니다. 그쪽에서 연 문서가 내부 준비본일 가능성을 배제하기 어려웠습니다.",
      "behaviorHint": "확신하던 표정이 미세하게 흔들린다.",
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
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-09:a:d-3:evidence:0"
        ],
        "forbidAtomIds": [
          "workplace-09:a:d-3:admission:4"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:identity",
      "coverageKey": "a:d-3:surface:early:trap:identity",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:misbelief_seen"
      ],
      "tags": [
        "trap"
      ]
    },
    {
      "id": "workplace09:beat_v2:a:d-3:surface:trap:identity:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confused_rebuttal",
      "line": "클라이언트 도메인에서 '공유본_팔콘'을 연 로그가 있었기 때문에 저는 실제 유출 정황이 있다고 봤습니다.",
      "behaviorHint": "같은 말을 반복하다가 특정 단어에서 멈칫한다.",
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
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-09:a:d-3:evidence:0"
        ],
        "forbidAtomIds": [
          "workplace-09:a:d-3:admission:4"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:identity",
      "coverageKey": "a:d-3:surface:early:trap:identity",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:misbelief_seen"
      ],
      "tags": [
        "trap"
      ]
    },
    {
      "id": "workplace09:beat_v2:a:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "mistaken_certainty",
      "line": "클라이언트 도메인에서 '공유본_팔콘'을 연 로그가 있었기 때문에 저는 실제 유출 정황이 있다고 봤습니다. 그쪽에서 연 문서가 내부 준비본일 가능성을 배제하기 어려웠습니다.",
      "behaviorHint": "확신하던 표정이 미세하게 흔들린다.",
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
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-09:a:d-3:evidence:0"
        ],
        "forbidAtomIds": [
          "workplace-09:a:d-3:admission:4"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:context",
      "coverageKey": "a:d-3:surface:early:trap:context",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:context_checked"
      ],
      "tags": [
        "trap"
      ]
    },
    {
      "id": "workplace09:beat_v2:a:d-3:surface:trap:context:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confused_rebuttal",
      "line": "클라이언트 도메인에서 '공유본_팔콘'을 연 로그가 있었기 때문에 저는 실제 유출 정황이 있다고 봤습니다.",
      "behaviorHint": "같은 말을 반복하다가 특정 단어에서 멈칫한다.",
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
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-09:a:d-3:evidence:0"
        ],
        "forbidAtomIds": [
          "workplace-09:a:d-3:admission:4"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:context",
      "coverageKey": "a:d-3:surface:early:trap:context",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:context_checked"
      ],
      "tags": [
        "trap"
      ]
    },
    {
      "id": "workplace09:beat_v2:b:d-3:core:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "doubt",
      "line": "중복 제목 구조가 핵심이었다는 건 인정합니다. 그래도 그 구조를 만든 건 준석 씨의 '공유본' 지시와 문서명 운용이었기 때문에 제가 더 세게 의심한 겁니다.",
      "behaviorHint": "확신하던 표정이 미세하게 흔들린다.",
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
          "workplace-09:b:d-3:context:1"
        ],
        "forbidAtomIds": [
          "workplace-09:b:d-3:admission:4"
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
      "id": "workplace09:beat_v2:b:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "clarify",
      "line": "중복 제목 구조가 핵심이었다는 건 인정합니다. 그래도 그 구조를 만든 건 준석 씨의 '공유본' 지시와 문서명 운용이었기 때문에 제가 더 세게 의심한 겁니다.",
      "behaviorHint": "확신하던 표정이 미세하게 흔들린다.",
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
          "workplace-09:b:d-3:emotion:5"
        ],
        "forbidAtomIds": [
          "workplace-09:b:d-3:admission:4"
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
      "id": "workplace09:beat_v2:a:d-1:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "fatigue_irritation",
      "line": "제가 겁먹어서 일을 더 키운 건 알아요. 그런데 그 계정이 날아갈까 봐 정말 무서웠어요.",
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
          "workplace-09:a:d-1:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:a:d-1:act:0"
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
      "id": "workplace09:beat_v2:a:d-1:motive:fatigue:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "fatigue_block",
      "line": "유은채 씨를 후속 메일 참조에서 뺀 건 맞습니다. 다만 저는 그 계정을 멈추지 않게 하려는 운영상 판단이라고 봤습니다.",
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
          "workplace-09:a:d-1:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:a:d-1:act:0"
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
      "id": "workplace09:beat_v2:a:d-1:motive:fatigue:timeline:03",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "fatigue_counter",
      "line": "유은채 씨를 후속 메일 참조에서 뺀 건 맞습니다.",
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
          "workplace-09:a:d-1:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:a:d-1:act:0"
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
      "id": "workplace09:beat_v2:b:d-2:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "fatigue_irritation",
      "line": "문서 제목이 어떻든 저는 누설자로 몰린 채 잘린 사람처럼 서 있었어요. 그 상태에서 차분하기만 하긴 어려웠어요.",
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
          "workplace-09:b:d-2:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:b:d-2:harm:3"
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
      "id": "workplace09:beat_v2:b:d-2:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "fatigue_block",
      "line": "내부 화면 일부를 보낸 건 맞습니다. 다만 그건 제가 자료를 흘렸다는 의심을 풀기 위한 확인 요청이라고 생각했습니다.",
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
          "workplace-09:b:d-2:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:b:d-2:harm:3"
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
      "id": "workplace09:beat_v2:b:d-2:motive:fatigue:responsibility:03",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "fatigue_counter",
      "line": "내부 화면 일부를 보낸 건 맞습니다.",
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
          "workplace-09:b:d-2:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:b:d-2:harm:3"
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
      "id": "workplace09:beat_v2:a:d-5:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "open_answer",
      "line": "그 계정이 무너지면 끝이라는 압박 때문에 내부 확인보다 외부 반응을 먼저 읽으려 했습니다. 그게 제3자를 끼운 추측전으로 보였다는 점은 압니다.",
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
          "workplace-09:a:d-5:motive:2"
        ],
        "forbidAtomIds": [
          "workplace-09:a:d-5:responsibility:4"
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
      "id": "workplace09:beat_v2:a:d-5:core:motive:motive:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "open_answer",
      "line": "그 계정이 무너지면 끝이라는 압박 때문에 내부 확인보다 외부 반응을 먼저 읽으려 했습니다.",
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
          "workplace-09:a:d-5:motive:2"
        ],
        "forbidAtomIds": [
          "workplace-09:a:d-5:responsibility:4"
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
      "id": "workplace09:beat_v2:b:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "emotional_open",
      "line": "저는 계정에서 빠진 순간 이미 누설자 취급이 시작됐다고 느꼈습니다. 그 억울함 때문에 이후 판단도 더 날카로워졌습니다.",
      "behaviorHint": "잠깐 침묵한 뒤 더 돌리지 않고 핵심만 꺼낸다.",
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
          "workplace-09:b:d-1:harm:2"
        ],
        "forbidAtomIds": [
          "workplace-09:b:d-1:harm:2"
        ]
      },
      "weight": 3,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:rapport:emotion",
      "coverageKey": "b:d-1:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [],
      "tags": [
        "free_question"
      ]
    },
    {
      "id": "workplace09:beat_v2:b:d-1:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "emotional_open",
      "line": "저는 계정에서 빠진 순간 이미 누설자 취급이 시작됐다고 느꼈습니다.",
      "behaviorHint": "질문의 의도를 인정하듯 짧게 한숨을 쉬고 답한다.",
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
          "workplace-09:b:d-1:harm:2"
        ],
        "forbidAtomIds": [
          "workplace-09:b:d-1:harm:2"
        ]
      },
      "weight": 3,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:rapport:emotion",
      "coverageKey": "b:d-1:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [],
      "tags": [
        "free_question"
      ]
    },
    {
      "id": "workplace09:beat_v2:a:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject_allow",
      "line": "그 계정이 날아가면 팀 전체가 흔들린다고 느꼈습니다. 그래서 더 매달렸어요.",
      "behaviorHint": "말을 허용받자 숨을 크게 내쉬며 불안을 먼저 드러낸다.",
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
          "workplace-09:a:d-1:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:a:d-1:act:0"
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
      "id": "workplace09:beat_v2:b:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interject_allow",
      "line": "임시라고 불러도 저는 먼저 잘려 나간 사람으로 남았습니다. 그 모멸감이 아직도 남아 있어요.",
      "behaviorHint": "참고 있던 감정을 꺼내듯 낮게 시작해 끝에서 힘이 실린다.",
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
          "workplace-09:b:d-1:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:b:d-1:harm:2"
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
      "id": "workplace09:beat_v2:a:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "interject_block",
      "line": "계정 하나 지키려다 사람부터 놓친 건 압니다. 그래도 그 압박을 무시한 건 아니었습니다.",
      "behaviorHint": "말이 끊긴 뒤에도 짧게 문장을 밀어 넣듯 덧붙인다.",
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
          "workplace-09:a:d-5:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:a:d-5:responsibility:4"
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
      "id": "workplace09:beat_v2:b:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "interject_block",
      "line": "저를 먼저 누설자처럼 세워 놓고 침착하길 바랐던 건 너무 가혹했습니다.",
      "behaviorHint": "잘린 호흡으로 억울함을 눌러 담는다.",
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
          "workplace-09:b:d-5:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:b:d-5:shame:3"
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
      "id": "workplace09:beat_v2:a:d-4:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "interject_allow",
      "line": "CRM 메모가 먼저 들어간 건 맞습니다. 하지만 그 문구는 사실확인 전 경고선이라는 의미였지 최종 낙인이라는 뜻은 아니었습니다.",
      "behaviorHint": "메모 문구와 시점을 또박또박 분리해 말한다.",
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
          "workplace-09:a:d-4:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:a:d-4:responsibility:4"
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
      "id": "workplace09:beat_v2:b:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject_allow",
      "line": "강소라 씨에게 보낸 건 슬랙 전체가 아니라 일부 캡처였습니다. 다만 일부였다고 해서 밖에 나간 책임이 사라진다는 말은 아닙니다.",
      "behaviorHint": "세부 범위를 짚으면서도 스스로의 한계를 일부 인정한다.",
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
          "workplace-09:b:d-2:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:b:d-2:harm:3"
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
      "id": "workplace09:beat_v2:a:d-4:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "interject_block",
      "line": "역할 축소와 메모 입력 시각을 같이 보셔야 합니다. 순서를 빼면 제가 한 말도 전부 달라집니다.",
      "behaviorHint": "끊긴 직후라 숫자와 순서를 짧게 밀어붙인다.",
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
          "workplace-09:a:d-4:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:a:d-4:responsibility:4"
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
      "id": "workplace09:beat_v2:b:d-2:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject_block",
      "line": "DM 한 줄로 정리하지 마세요. 화면, 발신 시각, 질문 문구가 같이 가야 왜 그랬는지가 보입니다.",
      "behaviorHint": "말을 자르려는 흐름에 맞서 구체 항목을 빠르게 나열한다.",
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
          "workplace-09:b:d-2:act:0"
        ],
        "forbidAtomIds": [
          "workplace-09:b:d-2:harm:3"
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
      "id": "workplace09:beat_v2:a:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject_allow",
      "line": "제목이 같고 거래처 도메인에서 열람이 찍혔으면 누구라도 실제 유출로 읽었을 겁니다. 저는 그 오해를 사실처럼 붙든 쪽이었어요.",
      "behaviorHint": "확신을 놓지 않으려다 마지막 문장에서만 미세하게 흔들린다.",
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
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-09:a:d-3:evidence:0"
        ],
        "forbidAtomIds": [
          "workplace-09:a:d-3:admission:4"
        ]
      },
      "weight": 5,
      "priority": 25,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:allow",
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
      "id": "workplace09:beat_v2:b:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject_allow",
      "line": "같은 제목 문서가 둘이었다는 걸 그때 누가 바로 설명했습니까. 저는 프레임 안에서 밀려난 사람으로 그 로그를 볼 수밖에 없었습니다.",
      "behaviorHint": "스스로의 오해를 설명하면서도 방어적 확신을 유지한다.",
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
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-09:b:d-3:evidence:0"
        ],
        "forbidAtomIds": [
          "workplace-09:b:d-3:admission:4"
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
      "beliefMode": "misbelief"
    },
    {
      "id": "workplace09:beat_v2:a:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject_block",
      "line": "문서 ID가 빠졌다는 걸 이제는 압니다. 그렇다고 그때 제가 본 장면까지 없던 일인 것처럼 말할 수는 없습니다.",
      "behaviorHint": "잘린 말 뒤에 확신과 후퇴가 한 문장 안에서 섞인다.",
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
          "workplace-09:a:d-3:evidence:0"
        ],
        "forbidAtomIds": [
          "workplace-09:a:d-3:admission:4"
        ]
      },
      "weight": 5,
      "priority": 23,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:block",
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
      "id": "workplace09:beat_v2:b:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject_block",
      "line": "중복 제목이 핵심이었다면 왜 저는 먼저 잘려 나간 뒤에야 그 얘길 들었습니까. 그 순서가 오해를 더 굳혔습니다.",
      "behaviorHint": "반문으로 시작해 오해가 굳어진 감정을 세게 남긴다.",
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
          "workplace-09:b:d-3:evidence:0"
        ],
        "forbidAtomIds": [
          "workplace-09:b:d-3:admission:4"
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
      "beliefMode": "misbelief"
    }
  ]
} as const;

export default workplace09BeatsV2Full;
