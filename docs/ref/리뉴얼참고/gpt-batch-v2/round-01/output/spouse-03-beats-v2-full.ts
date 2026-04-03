export const spouse03BeatsV2Full = {
  "caseId": "spouse-03",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 57,
    "byActionFamily": {
      "question": 20,
      "evidence": 5,
      "free_question": 5,
      "fatigue": 15,
      "interjection": 12
    },
    "byParty": {
      "a": 22,
      "b": 35
    },
    "byIssueRole": {
      "core_truth": 22,
      "sub_truth": 11,
      "red_herring": 13,
      "shared_misconception": 11
    },
    "beatsPerDispute": {
      "d-1": 11,
      "d-2": 11,
      "d-3": 13,
      "d-4": 11,
      "d-5": 11
    },
    "fatiguePerDispute": {
      "d-1": 3,
      "d-2": 3,
      "d-3": 3,
      "d-4": 3,
      "d-5": 3
    },
    "interjectionInfoLevels": {
      "emotional_only": 4,
      "detail_rebuttal": 4,
      "misbelief_escalation": 2,
      "trap_signal": 2
    }
  },
  "beats": [
    {
      "id": "spouse03:beat_v2:a:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "일단 결론부터, 큰 사고 날 인출은 아니었어. 새 회사 시작하면서 잠깐 메꾼 돈 정도였지 비상금을 없앤 건 아니야.",
      "behaviorHint": "'160만원이 아니라 159만 8천원이었어.",
      "applicableStates": [
        "S0"
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
          "spouse03:a:d-1:act:0",
          "spouse03:a:d-1:motive:0"
        ],
        "forbidAtomIds": [
          "spouse03:a:d-1:admission:1",
          "spouse03:a:d-1:rule:1"
        ]
      },
      "weight": 6,
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
      "id": "spouse03:beat_v2:a:d-1:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "세부 금액은 159만 8천원 정도였고 대부분 출근 준비비였어. 미리 말 못 한 건 맞지만 다음 급여 들어오면 바로 채울 생각이었어.",
      "behaviorHint": "'160만원이 아니라 159만 8천원이었어.",
      "applicableStates": [
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
          "spouse03:a:d-1:timeline:0",
          "spouse03:a:d-1:self_justification:0"
        ],
        "forbidAtomIds": [
          "spouse03:a:d-1:admission:1",
          "spouse03:a:d-1:rule:1"
        ]
      },
      "weight": 6,
      "priority": 32,
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
      "id": "spouse03:beat_v2:a:d-1:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "공동 비상금에서 뺀 건 맞아. 그래도 사치하려고 쓴 게 아니라 수습 시작 비용을 먼저 막으려던 거였어.",
      "behaviorHint": "'잠깐 메꾼 거야', '며칠만 쓰려던 거야.",
      "applicableStates": [
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:a:d-1:context:0",
          "spouse03:a:d-1:unlock:s2:0",
          "spouse03:a:d-1:admission:0"
        ],
        "forbidAtomIds": [
          "spouse03:a:d-1:admission:1",
          "spouse03:a:d-1:rule:1"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:evidence:context",
      "coverageKey": "a:d-1:surface:mid:evidence:context",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:evidence_shown"
      ],
      "tags": [
        "cold"
      ]
    },
    {
      "id": "spouse03:beat_v2:a:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "counter",
      "line": "정장, 구두, 3개월 정기권이 첫 주에 한꺼번에 겹쳤어. 당신이 괜히 불안해할까 봐 설명을 미룬 것도 있어.",
      "behaviorHint": "'잠깐 메꾼 거야', '며칠만 쓰려던 거야.",
      "applicableStates": [
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
          "calm",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:a:d-1:fear:0",
          "spouse03:a:d-1:unlock:s3:0",
          "spouse03:a:d-1:context:1"
        ],
        "forbidAtomIds": [
          "spouse03:a:d-1:admission:1",
          "spouse03:a:d-1:rule:1"
        ]
      },
      "weight": 5,
      "priority": 27,
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
      ],
      "requiresFlags": [
        "d-1:surface:evidence_shown"
      ]
    },
    {
      "id": "spouse03:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "emotion",
      "line": "새 직장에서 허술해 보일까 너무 조급했어. 그래서 규칙보다 적응부터 챙겼고 그게 더 미안해.",
      "behaviorHint": "'왜 미리 말 안 했어?",
      "applicableStates": [
        "S4"
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
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:a:d-1:emotion:0",
          "spouse03:a:d-1:unlock:s4:0",
          "spouse03:a:d-1:rule:0"
        ],
        "forbidAtomIds": [
          "spouse03:a:d-1:admission:1",
          "spouse03:a:d-1:rule:1"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-1:core:emotion_named"
      ],
      "tags": [
        "cold"
      ],
      "requiresFlags": [
        "d-1:motive:motive_named"
      ]
    },
    {
      "id": "spouse03:beat_v2:a:d-1:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confess",
      "line": "160만원을 미리 상의 없이 인출한 건 내 잘못이야. 필요한 비용이었다 해도 공동 비상금을 혼자 결정한 건 변명할 수 없어.",
      "behaviorHint": "'왜 미리 말 안 했어?",
      "applicableStates": [
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
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:a:d-1:rule:1",
          "spouse03:a:d-1:admission:1",
          "spouse03:a:d-1:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse03:a:d-1:admission:1",
          "spouse03:a:d-1:rule:1"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:emotion_named"
      ],
      "tags": [
        "cold"
      ],
      "requiresFlags": [
        "d-1:core:emotion_named"
      ]
    },
    {
      "id": "spouse03:beat_v2:a:d-1:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "fatigue_irritation",
      "line": "같은 160만원 얘기만 반복하시면 저도 답이 거칠어집니다. 방금 말한 공동 비상금부터 정리해 주세요.",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
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
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:a:d-1:context:1",
          "spouse03:a:d-1:fear:0",
          "spouse03:a:d-1:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse03:a:d-1:admission:1",
          "spouse03:a:d-1:rule:1"
        ]
      },
      "weight": 3,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:timeline",
      "coverageKey": "a:d-1:motive:mid:fatigue:timeline",
      "variantTarget": 1,
      "setFlags": [
        "d-1:motive:fatigue_warned"
      ],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "spouse03:beat_v2:a:d-1:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "fatigue_block",
      "line": "160만원를 세 번째 같은 톤으로 묻는 건 답을 짜내는 방식처럼 들립니다. 지금은 더는 같은 방식으로 답하지 않겠습니다.",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
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
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:a:d-1:context:1",
          "spouse03:a:d-1:fear:0",
          "spouse03:a:d-1:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse03:a:d-1:admission:1",
          "spouse03:a:d-1:rule:1"
        ]
      },
      "weight": 3,
      "priority": 16,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:responsibility",
      "coverageKey": "a:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-1:motive:fatigue_blocked"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-1:motive:fatigue_warned"
      ]
    },
    {
      "id": "spouse03:beat_v2:a:d-1:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "fatigue_counter",
      "line": "계속 이렇게 몰아붙이면 저도 되묻고 싶습니다. 왜 공동 비상금 맥락은 빼고 160만원만 확대하십니까?",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "S4",
        "S5"
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
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:a:d-1:rule:0",
          "spouse03:a:d-1:emotion:0",
          "spouse03:a:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "spouse03:a:d-1:admission:1",
          "spouse03:a:d-1:rule:1"
        ]
      },
      "weight": 3,
      "priority": 14,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:responsibility",
      "coverageKey": "a:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-1:motive:fatigue_countered"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-1:motive:fatigue_blocked"
      ]
    },
    {
      "id": "spouse03:beat_v2:b:d-2:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "내가 적금을 없앤 것도 아니고 잠깐 텀 준 거야. 생활비 숨통 트이게 하려던 상식적인 조정이었지.",
      "behaviorHint": "'건조기도 질투하네~', '빨래가 나한테 고마워할 걸?",
      "applicableStates": [
        "S0"
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
          "spouse03:b:d-2:act:0",
          "spouse03:b:d-2:motive:0"
        ],
        "forbidAtomIds": [
          "spouse03:b:d-2:admission:1",
          "spouse03:b:d-2:rule:1"
        ]
      },
      "weight": 6,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:timeline",
      "coverageKey": "b:d-2:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse03:beat_v2:b:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "두 달만 멈춘 거고 다시 채울 생각이었어. 내가 살림 모르냐, 그냥 버티려고 돌린 거야.",
      "behaviorHint": "'건조기도 질투하네~', '빨래가 나한테 고마워할 걸?",
      "applicableStates": [
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
          "spouse03:b:d-2:timeline:0",
          "spouse03:b:d-2:self_justification:0"
        ],
        "forbidAtomIds": [
          "spouse03:b:d-2:admission:1",
          "spouse03:b:d-2:rule:1"
        ]
      },
      "weight": 6,
      "priority": 32,
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
      "id": "spouse03:beat_v2:b:d-2:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "자동이체를 정지한 건 맞아. 그날 현금이 비어 보여서 먼저 돌려쓴 거야.",
      "behaviorHint": "'이 정도는 다들 해.",
      "applicableStates": [
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
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:b:d-2:admission:0",
          "spouse03:b:d-2:context:0",
          "spouse03:b:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse03:b:d-2:admission:1",
          "spouse03:b:d-2:rule:1"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:evidence:legality",
      "coverageKey": "b:d-2:surface:mid:evidence:legality",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:evidence_shown"
      ],
      "tags": [
        "cold"
      ]
    },
    {
      "id": "spouse03:beat_v2:b:d-2:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "counter",
      "line": "건조기 초회금까지 겹쳐서 더 급했어. 말하면 바로 반대할까 봐 혼자 계산했지.",
      "behaviorHint": "'이 정도는 다들 해.",
      "applicableStates": [
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
          "calm",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:b:d-2:fear:0",
          "spouse03:b:d-2:unlock:s3:0",
          "spouse03:b:d-2:context:1"
        ],
        "forbidAtomIds": [
          "spouse03:b:d-2:admission:1",
          "spouse03:b:d-2:rule:1"
        ]
      },
      "weight": 5,
      "priority": 27,
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
      ],
      "requiresFlags": [
        "d-2:surface:evidence_shown"
      ]
    },
    {
      "id": "spouse03:beat_v2:b:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "emotion",
      "line": "가계를 못 버티는 사람처럼 보일까 무서웠어. 그래서 더 짧게 끊어 말하고 버틴 거야.",
      "behaviorHint": "'그래 건조기 84만원, 인정해.",
      "applicableStates": [
        "S4"
      ],
      "layer": "core",
      "issueRole": "sub_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "question",
      "questionTypes": [
        "empathy_approach"
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
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:b:d-2:emotion:0",
          "spouse03:b:d-2:unlock:s4:0",
          "spouse03:b:d-2:rule:0"
        ],
        "forbidAtomIds": [
          "spouse03:b:d-2:admission:1",
          "spouse03:b:d-2:rule:1"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:core:rapport:emotion",
      "coverageKey": "b:d-2:core:late:rapport:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-2:core:emotion_named"
      ],
      "tags": [
        "cold"
      ],
      "requiresFlags": [
        "d-2:motive:motive_named"
      ]
    },
    {
      "id": "spouse03:beat_v2:b:d-2:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confess",
      "line": "적금 자동이체를 두 달 멈추고 숨긴 건 내 잘못이야. 생활비 압박이 이유였어도 같이 정했어야 했어.",
      "behaviorHint": "'그래 건조기 84만원, 인정해.",
      "applicableStates": [
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
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:b:d-2:rule:1",
          "spouse03:b:d-2:admission:1",
          "spouse03:b:d-2:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse03:b:d-2:admission:1",
          "spouse03:b:d-2:rule:1"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:core:rapport:emotion",
      "coverageKey": "b:d-2:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-2:core:emotion_named"
      ],
      "tags": [
        "cold"
      ],
      "requiresFlags": [
        "d-2:core:emotion_named"
      ]
    },
    {
      "id": "spouse03:beat_v2:b:d-2:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "fatigue_irritation",
      "line": "같은 적금 두 달 얘기만 반복하시면 저도 답이 거칠어집니다. 방금 말한 자동이체 중단부터 정리해 주세요.",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "sub_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "timeline",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:b:d-2:context:1",
          "spouse03:b:d-2:fear:0",
          "spouse03:b:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse03:b:d-2:admission:1",
          "spouse03:b:d-2:rule:1"
        ]
      },
      "weight": 3,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:fatigue:timeline",
      "coverageKey": "b:d-2:motive:mid:fatigue:timeline",
      "variantTarget": 1,
      "setFlags": [
        "d-2:motive:fatigue_warned"
      ],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "spouse03:beat_v2:b:d-2:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "fatigue_block",
      "line": "적금 두 달를 세 번째 같은 톤으로 묻는 건 답을 짜내는 방식처럼 들립니다. 지금은 더는 같은 방식으로 답하지 않겠습니다.",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "S3",
        "S4"
      ],
      "layer": "motive",
      "issueRole": "sub_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:b:d-2:context:1",
          "spouse03:b:d-2:fear:0",
          "spouse03:b:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse03:b:d-2:admission:1",
          "spouse03:b:d-2:rule:1"
        ]
      },
      "weight": 3,
      "priority": 16,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:fatigue:responsibility",
      "coverageKey": "b:d-2:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-2:motive:fatigue_blocked"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-2:motive:fatigue_warned"
      ]
    },
    {
      "id": "spouse03:beat_v2:b:d-2:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "fatigue_counter",
      "line": "계속 이렇게 몰아붙이면 저도 되묻고 싶습니다. 왜 자동이체 중단 맥락은 빼고 적금 두 달만 확대하십니까?",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "motive",
      "issueRole": "sub_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:b:d-2:rule:0",
          "spouse03:b:d-2:emotion:0",
          "spouse03:b:d-2:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "spouse03:b:d-2:admission:1",
          "spouse03:b:d-2:rule:1"
        ]
      },
      "weight": 3,
      "priority": 14,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:fatigue:responsibility",
      "coverageKey": "b:d-2:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-2:motive:fatigue_countered"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-2:motive:fatigue_blocked"
      ]
    },
    {
      "id": "spouse03:beat_v2:b:d-3:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "그 알림만 보면 누가 봐도 백화점 쇼핑처럼 보였어. 내가 사치라고 느낀 게 이상한 건 아니지.",
      "behaviorHint": "'건조기도 질투하네~', '빨래가 나한테 고마워할 걸?",
      "applicableStates": [
        "M0"
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
          "spouse03:b:d-3:context:0",
          "spouse03:b:d-3:responsibility:0"
        ],
        "forbidAtomIds": [
          "spouse03:b:d-3:admission:1",
          "spouse03:b:d-3:context:1"
        ]
      },
      "weight": 6,
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
        "red_herring"
      ]
    },
    {
      "id": "spouse03:beat_v2:b:d-3:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "잘린 정보였던 건 맞아도 큰 결제라 의심할 수밖에 없었어. 적어도 설명은 먼저 해줬어야 한다고 봤지.",
      "behaviorHint": "'건조기도 질투하네~', '빨래가 나한테 고마워할 걸?",
      "applicableStates": [
        "M1"
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
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:b:d-3:evidence:0",
          "spouse03:b:d-3:rule:0"
        ],
        "forbidAtomIds": [
          "spouse03:b:d-3:admission:1",
          "spouse03:b:d-3:context:1"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:pressure:identity",
      "coverageKey": "b:d-3:surface:early:pressure:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-3:surface:identity_pressed"
      ],
      "tags": [
        "hot",
        "red_herring"
      ]
    },
    {
      "id": "spouse03:beat_v2:b:d-3:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "복장 기준 때문에 산 물건이 많았다는 건 인정해. 승인 알림만으로 다 사치라고 단정한 건 내가 성급했어.",
      "behaviorHint": "'이 정도는 다들 해.",
      "applicableStates": [
        "M2",
        "M3"
      ],
      "layer": "surface",
      "issueRole": "red_herring",
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
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:b:d-3:unlock:s2:0",
          "spouse03:b:d-3:evidence:1",
          "spouse03:b:d-3:admission:0"
        ],
        "forbidAtomIds": [
          "spouse03:b:d-3:admission:1",
          "spouse03:b:d-3:context:1"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:evidence:context",
      "coverageKey": "b:d-3:surface:mid:evidence:context",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:evidence_shown"
      ],
      "tags": [
        "cold",
        "red_herring"
      ]
    },
    {
      "id": "spouse03:beat_v2:b:d-3:motive:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "counter",
      "line": "내가 새 회사 사정을 안 묻고 결제 상호만 보고 판단했어. 그게 결국 유진을 더 몰아세운 거지.",
      "behaviorHint": "'이 정도는 다들 해.",
      "applicableStates": [
        "M3"
      ],
      "layer": "motive",
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
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:b:d-3:relationship:0",
          "spouse03:b:d-3:unlock:s3:0",
          "spouse03:b:d-3:emotion:0"
        ],
        "forbidAtomIds": [
          "spouse03:b:d-3:admission:1",
          "spouse03:b:d-3:context:1"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:pressure:context",
      "coverageKey": "b:d-3:motive:mid:pressure:context",
      "variantTarget": 4,
      "setFlags": [
        "d-3:motive:context_named"
      ],
      "tags": [
        "mid",
        "red_herring"
      ],
      "requiresFlags": [
        "d-3:surface:evidence_shown"
      ]
    },
    {
      "id": "spouse03:beat_v2:b:d-3:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "emotion",
      "line": "솔직히 내가 가장 노릇 못 하는 사람처럼 보일까 더 날카롭게 굴었어. 그래서 소비 문제로 먼저 찍어 버렸어.",
      "behaviorHint": "'그래 건조기 84만원, 인정해.",
      "applicableStates": [
        "M4"
      ],
      "layer": "core",
      "issueRole": "red_herring",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "question",
      "questionTypes": [
        "empathy_approach"
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
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:b:d-3:emotion:1",
          "spouse03:b:d-3:unlock:s4:0",
          "spouse03:b:d-3:shame:0"
        ],
        "forbidAtomIds": [
          "spouse03:b:d-3:admission:1",
          "spouse03:b:d-3:context:1"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:rapport:emotion",
      "coverageKey": "b:d-3:core:late:rapport:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-3:core:emotion_named"
      ],
      "tags": [
        "cold",
        "red_herring"
      ],
      "requiresFlags": [
        "d-3:motive:context_named"
      ]
    },
    {
      "id": "spouse03:beat_v2:b:d-3:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confess",
      "line": "백화점 결제가 전부 사치는 아니었어. 알림만 보고 단정하고 몰아붙인 건 내 잘못이야.",
      "behaviorHint": "'그래 건조기 84만원, 인정해.",
      "applicableStates": [
        "M4"
      ],
      "layer": "core",
      "issueRole": "red_herring",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "free_question",
      "questionTypes": [
        "empathy_approach"
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
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:b:d-3:context:1",
          "spouse03:b:d-3:admission:1",
          "spouse03:b:d-3:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse03:b:d-3:admission:1",
          "spouse03:b:d-3:context:1"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:rapport:emotion",
      "coverageKey": "b:d-3:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-3:core:emotion_named"
      ],
      "tags": [
        "cold",
        "red_herring"
      ],
      "requiresFlags": [
        "d-3:core:emotion_named"
      ]
    },
    {
      "id": "spouse03:beat_v2:b:d-3:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "fatigue_irritation",
      "line": "같은 백화점 승인 알림 얘기만 반복하시면 저도 답이 거칠어집니다. 방금 말한 정장 필수부터 정리해 주세요.",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "M1",
        "M2"
      ],
      "layer": "motive",
      "issueRole": "red_herring",
      "responseIntent": "fatigue_response",
      "angleTag": "timeline",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:b:d-3:emotion:0",
          "spouse03:b:d-3:relationship:0",
          "spouse03:b:d-3:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse03:b:d-3:admission:1",
          "spouse03:b:d-3:context:1"
        ]
      },
      "weight": 3,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:fatigue:timeline",
      "coverageKey": "b:d-3:motive:mid:fatigue:timeline",
      "variantTarget": 1,
      "setFlags": [
        "d-3:motive:fatigue_warned"
      ],
      "tags": [
        "fatigue",
        "red_herring"
      ]
    },
    {
      "id": "spouse03:beat_v2:b:d-3:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "fatigue_block",
      "line": "백화점 승인 알림를 세 번째 같은 톤으로 묻는 건 답을 짜내는 방식처럼 들립니다. 지금은 더는 같은 방식으로 답하지 않겠습니다.",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "M2",
        "M3"
      ],
      "layer": "motive",
      "issueRole": "red_herring",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:b:d-3:emotion:0",
          "spouse03:b:d-3:relationship:0",
          "spouse03:b:d-3:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse03:b:d-3:admission:1",
          "spouse03:b:d-3:context:1"
        ]
      },
      "weight": 3,
      "priority": 16,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:fatigue:responsibility",
      "coverageKey": "b:d-3:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-3:motive:fatigue_blocked"
      ],
      "tags": [
        "fatigue",
        "red_herring"
      ],
      "requiresFlags": [
        "d-3:motive:fatigue_warned"
      ]
    },
    {
      "id": "spouse03:beat_v2:b:d-3:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "fatigue_counter",
      "line": "계속 이렇게 몰아붙이면 저도 되묻고 싶습니다. 왜 정장 필수 맥락은 빼고 백화점 승인 알림만 확대하십니까?",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "M3",
        "M4"
      ],
      "layer": "motive",
      "issueRole": "red_herring",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:b:d-3:shame:0",
          "spouse03:b:d-3:emotion:1",
          "spouse03:b:d-3:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "spouse03:b:d-3:admission:1",
          "spouse03:b:d-3:context:1"
        ]
      },
      "weight": 3,
      "priority": 14,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:fatigue:responsibility",
      "coverageKey": "b:d-3:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-3:motive:fatigue_countered"
      ],
      "tags": [
        "fatigue",
        "red_herring"
      ],
      "requiresFlags": [
        "d-3:motive:fatigue_blocked"
      ]
    },
    {
      "id": "spouse03:beat_v2:a:d-4:surface:pressure:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "규칙을 먼저 무겁게 깬 건 건조기 할부 쪽이라고 봐. 내 쪽은 급한 적응비를 잠깐 돌린 경우였어.",
      "behaviorHint": "'160만원이 아니라 159만 8천원이었어.",
      "applicableStates": [
        "S0"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "legality",
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
          "spouse03:a:d-4:counter:0",
          "spouse03:a:d-4:responsibility:0"
        ],
        "forbidAtomIds": [
          "spouse03:a:d-4:admission:1",
          "spouse03:a:d-4:rule:2"
        ]
      },
      "weight": 6,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:pressure:legality",
      "coverageKey": "a:d-4:surface:early:pressure:legality",
      "variantTarget": 6,
      "setFlags": [
        "d-4:surface:legality_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse03:beat_v2:a:d-4:surface:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "내 인출도 기준선 위인 건 맞지만 성격이 달랐어. 생활 유지비와 편의성 지출을 같은 선에 놓긴 어렵다고 생각했어.",
      "behaviorHint": "'160만원이 아니라 159만 8천원이었어.",
      "applicableStates": [
        "S1"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "responsibility",
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
          "spouse03:a:d-4:threshold:0",
          "spouse03:a:d-4:context:0"
        ],
        "forbidAtomIds": [
          "spouse03:a:d-4:admission:1",
          "spouse03:a:d-4:rule:2"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:pressure:responsibility",
      "coverageKey": "a:d-4:surface:early:pressure:responsibility",
      "variantTarget": 6,
      "setFlags": [
        "d-4:surface:responsibility_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse03:beat_v2:a:d-4:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "금액 기준만 보면 나도 규칙을 어긴 건 맞아. 다만 그때는 내 사정을 예외처럼 보고 싶었어.",
      "behaviorHint": "'잠깐 메꾼 거야', '며칠만 쓰려던 거야.",
      "applicableStates": [
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
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:a:d-4:admission:0",
          "spouse03:a:d-4:unlock:s2:0",
          "spouse03:a:d-4:context:1"
        ],
        "forbidAtomIds": [
          "spouse03:a:d-4:admission:1",
          "spouse03:a:d-4:rule:2"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:evidence:legality",
      "coverageKey": "a:d-4:surface:mid:evidence:legality",
      "variantTarget": 2,
      "setFlags": [
        "d-4:surface:evidence_shown"
      ],
      "tags": [
        "cold"
      ]
    },
    {
      "id": "spouse03:beat_v2:a:d-4:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "counter",
      "line": "결국 둘 다 사전 상의 규칙을 비워 버린 셈이야. 서로 안심시키겠다고 숨긴 방식만 달랐지.",
      "behaviorHint": "'잠깐 메꾼 거야', '며칠만 쓰려던 거야.",
      "applicableStates": [
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
          "calm",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:a:d-4:rule:0",
          "spouse03:a:d-4:relationship:0",
          "spouse03:a:d-4:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse03:a:d-4:admission:1",
          "spouse03:a:d-4:rule:2"
        ]
      },
      "weight": 5,
      "priority": 27,
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
      ],
      "requiresFlags": [
        "d-4:surface:evidence_shown"
      ]
    },
    {
      "id": "spouse03:beat_v2:a:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "emotion",
      "line": "솔직히 내가 예외라고 우긴 것도 체면 때문이었어. 규칙을 지켰다고 말할 수 없다는 걸 알고 있었거든.",
      "behaviorHint": "'왜 미리 말 안 했어?",
      "applicableStates": [
        "S4"
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
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:a:d-4:shame:0",
          "spouse03:a:d-4:unlock:s4:0",
          "spouse03:a:d-4:rule:1"
        ],
        "forbidAtomIds": [
          "spouse03:a:d-4:admission:1",
          "spouse03:a:d-4:rule:2"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:core:rapport:emotion",
      "coverageKey": "a:d-4:core:late:rapport:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-4:core:emotion_named"
      ],
      "tags": [
        "cold"
      ],
      "requiresFlags": [
        "d-4:motive:responsibility_named"
      ]
    },
    {
      "id": "spouse03:beat_v2:a:d-4:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confess",
      "line": "50만원 이상 사전 상의 규칙은 나도 어겼어. 적응비라는 사정이 있어도 먼저 말했어야 했어.",
      "behaviorHint": "'왜 미리 말 안 했어?",
      "applicableStates": [
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
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:a:d-4:admission:1",
          "spouse03:a:d-4:rule:2",
          "spouse03:a:d-4:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse03:a:d-4:admission:1",
          "spouse03:a:d-4:rule:2"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:core:motive:motive",
      "coverageKey": "a:d-4:core:late:motive:motive",
      "variantTarget": 2,
      "setFlags": [
        "d-4:core:motive_named"
      ],
      "tags": [
        "cold"
      ],
      "requiresFlags": [
        "d-4:core:emotion_named"
      ]
    },
    {
      "id": "spouse03:beat_v2:a:d-4:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "fatigue_irritation",
      "line": "같은 50만원 약속 얘기만 반복하시면 저도 답이 거칠어집니다. 방금 말한 사전 상의부터 정리해 주세요.",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
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
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:a:d-4:relationship:0",
          "spouse03:a:d-4:rule:0",
          "spouse03:a:d-4:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse03:a:d-4:admission:1",
          "spouse03:a:d-4:rule:2"
        ]
      },
      "weight": 3,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:fatigue:timeline",
      "coverageKey": "a:d-4:motive:mid:fatigue:timeline",
      "variantTarget": 1,
      "setFlags": [
        "d-4:motive:fatigue_warned"
      ],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "spouse03:beat_v2:a:d-4:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "fatigue_block",
      "line": "50만원 약속를 세 번째 같은 톤으로 묻는 건 답을 짜내는 방식처럼 들립니다. 지금은 더는 같은 방식으로 답하지 않겠습니다.",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
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
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:a:d-4:rule:0",
          "spouse03:a:d-4:relationship:0",
          "spouse03:a:d-4:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse03:a:d-4:admission:1",
          "spouse03:a:d-4:rule:2"
        ]
      },
      "weight": 3,
      "priority": 16,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:fatigue:responsibility",
      "coverageKey": "a:d-4:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-4:motive:fatigue_blocked"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-4:motive:fatigue_warned"
      ]
    },
    {
      "id": "spouse03:beat_v2:a:d-4:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "fatigue_counter",
      "line": "계속 이렇게 몰아붙이면 저도 되묻고 싶습니다. 왜 사전 상의 맥락은 빼고 50만원 약속만 확대하십니까?",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "S4",
        "S5"
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
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:a:d-4:rule:1",
          "spouse03:a:d-4:shame:0",
          "spouse03:a:d-4:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "spouse03:a:d-4:admission:1",
          "spouse03:a:d-4:rule:2"
        ]
      },
      "weight": 3,
      "priority": 14,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:fatigue:responsibility",
      "coverageKey": "a:d-4:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-4:motive:fatigue_countered"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-4:motive:fatigue_blocked"
      ]
    },
    {
      "id": "spouse03:beat_v2:b:d-5:surface:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "생활비 구멍은 솔직히 유진 쪽 백화점 결제랑 비상금 인출이 더 크게 보였어. 내 조정까지 다 같은 무게로 보긴 싫었지.",
      "behaviorHint": "'건조기도 질투하네~', '빨래가 나한테 고마워할 걸?",
      "applicableStates": [
        "M0"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "responsibility",
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
          "spouse03:b:d-5:responsibility:0",
          "spouse03:b:d-5:context:0"
        ],
        "forbidAtomIds": [
          "spouse03:b:d-5:admission:1",
          "spouse03:b:d-5:relationship:1"
        ]
      },
      "weight": 6,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:pressure:responsibility",
      "coverageKey": "b:d-5:surface:early:pressure:responsibility",
      "variantTarget": 6,
      "setFlags": [
        "d-5:surface:responsibility_pressed"
      ],
      "tags": [
        "hot",
        "red_herring"
      ]
    },
    {
      "id": "spouse03:beat_v2:b:d-5:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "내 조정이 영향 없었다고는 안 해도 시작은 유진 지출이라고 봤어. 그래서 나부터 몰리는 게 억울했어.",
      "behaviorHint": "'건조기도 질투하네~', '빨래가 나한테 고마워할 걸?",
      "applicableStates": [
        "M1"
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
          "spouse03:b:d-5:timeline:0",
          "spouse03:b:d-5:responsibility:1"
        ],
        "forbidAtomIds": [
          "spouse03:b:d-5:admission:1",
          "spouse03:b:d-5:relationship:1"
        ]
      },
      "weight": 6,
      "priority": 32,
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
        "red_herring"
      ]
    },
    {
      "id": "spouse03:beat_v2:b:d-5:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "적금 중단과 건조기 할부도 구멍을 키운 건 맞아. 다만 첫 급여일이 밀리면서 더 크게 터져 보인 거야.",
      "behaviorHint": "'이 정도는 다들 해.",
      "applicableStates": [
        "M2",
        "M3"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
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
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:b:d-5:context:1",
          "spouse03:b:d-5:unlock:s2:0",
          "spouse03:b:d-5:admission:0"
        ],
        "forbidAtomIds": [
          "spouse03:b:d-5:admission:1",
          "spouse03:b:d-5:relationship:1"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:evidence:context",
      "coverageKey": "b:d-5:surface:mid:evidence:context",
      "variantTarget": 2,
      "setFlags": [
        "d-5:surface:evidence_shown"
      ],
      "tags": [
        "cold",
        "red_herring"
      ]
    },
    {
      "id": "spouse03:beat_v2:b:d-5:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "counter",
      "line": "결국 둘 다 숨겼다는 점에선 내 탓도 절반이야. 그때는 내가 가장 노릇 못 한 사람처럼 보일까 버텼어.",
      "behaviorHint": "'이 정도는 다들 해.",
      "applicableStates": [
        "M3"
      ],
      "layer": "motive",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "responsibility",
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
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:b:d-5:responsibility:2",
          "spouse03:b:d-5:emotion:0",
          "spouse03:b:d-5:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse03:b:d-5:admission:1",
          "spouse03:b:d-5:relationship:1"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:pressure:responsibility",
      "coverageKey": "b:d-5:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:responsibility_named"
      ],
      "tags": [
        "mid",
        "red_herring"
      ],
      "requiresFlags": [
        "d-5:surface:evidence_shown"
      ]
    },
    {
      "id": "spouse03:beat_v2:b:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "emotion",
      "line": "한 사람 탓으로 몰아야 내 체면이 덜 깨질 것 같았어. 그래서 더 세게 밀어붙였지.",
      "behaviorHint": "'그래 건조기 84만원, 인정해.",
      "applicableStates": [
        "M4"
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
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:b:d-5:emotion:1",
          "spouse03:b:d-5:unlock:s4:0",
          "spouse03:b:d-5:relationship:0"
        ],
        "forbidAtomIds": [
          "spouse03:b:d-5:admission:1",
          "spouse03:b:d-5:relationship:1"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:rapport:emotion",
      "coverageKey": "b:d-5:core:late:rapport:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-5:core:emotion_named"
      ],
      "tags": [
        "cold",
        "red_herring"
      ],
      "requiresFlags": [
        "d-5:motive:responsibility_named"
      ]
    },
    {
      "id": "spouse03:beat_v2:b:d-5:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confess",
      "line": "생활비 공백은 내 조정과 유진의 인출이 겹친 결과였어. 한 사람 탓으로 몰던 태도부터 내가 거둬야 해.",
      "behaviorHint": "'그래 건조기 84만원, 인정해.",
      "applicableStates": [
        "M4"
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
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:b:d-5:relationship:1",
          "spouse03:b:d-5:admission:1",
          "spouse03:b:d-5:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "spouse03:b:d-5:admission:1",
          "spouse03:b:d-5:relationship:1"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:rapport:emotion",
      "coverageKey": "b:d-5:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-5:core:emotion_named"
      ],
      "tags": [
        "cold",
        "red_herring"
      ],
      "requiresFlags": [
        "d-5:core:emotion_named"
      ]
    },
    {
      "id": "spouse03:beat_v2:b:d-5:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "fatigue_irritation",
      "line": "같은 가계 공백 얘기만 반복하시면 저도 답이 거칠어집니다. 방금 말한 첫 급여 3주 지연부터 정리해 주세요.",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "M1",
        "M2"
      ],
      "layer": "motive",
      "issueRole": "shared_misconception",
      "responseIntent": "fatigue_response",
      "angleTag": "timeline",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:b:d-5:unlock:s3:0",
          "spouse03:b:d-5:emotion:0",
          "spouse03:b:d-5:responsibility:2"
        ],
        "forbidAtomIds": [
          "spouse03:b:d-5:admission:1",
          "spouse03:b:d-5:relationship:1"
        ]
      },
      "weight": 3,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:fatigue:timeline",
      "coverageKey": "b:d-5:motive:mid:fatigue:timeline",
      "variantTarget": 1,
      "setFlags": [
        "d-5:motive:fatigue_warned"
      ],
      "tags": [
        "fatigue",
        "red_herring"
      ]
    },
    {
      "id": "spouse03:beat_v2:b:d-5:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "fatigue_block",
      "line": "가계 공백를 세 번째 같은 톤으로 묻는 건 답을 짜내는 방식처럼 들립니다. 지금은 더는 같은 방식으로 답하지 않겠습니다.",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "M2",
        "M3"
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
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:b:d-5:responsibility:2",
          "spouse03:b:d-5:emotion:0",
          "spouse03:b:d-5:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse03:b:d-5:admission:1",
          "spouse03:b:d-5:relationship:1"
        ]
      },
      "weight": 3,
      "priority": 16,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:fatigue:responsibility",
      "coverageKey": "b:d-5:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-5:motive:fatigue_blocked"
      ],
      "tags": [
        "fatigue",
        "red_herring"
      ],
      "requiresFlags": [
        "d-5:motive:fatigue_warned"
      ]
    },
    {
      "id": "spouse03:beat_v2:b:d-5:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "fatigue_counter",
      "line": "계속 이렇게 몰아붙이면 저도 되묻고 싶습니다. 왜 첫 급여 3주 지연 맥락은 빼고 가계 공백만 확대하십니까?",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "M3",
        "M4"
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
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:b:d-5:relationship:0",
          "spouse03:b:d-5:emotion:1",
          "spouse03:b:d-5:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "spouse03:b:d-5:admission:1",
          "spouse03:b:d-5:relationship:1"
        ]
      },
      "weight": 3,
      "priority": 14,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:fatigue:responsibility",
      "coverageKey": "b:d-5:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-5:motive:fatigue_countered"
      ],
      "tags": [
        "fatigue",
        "red_herring"
      ],
      "requiresFlags": [
        "d-5:motive:fatigue_blocked"
      ]
    },
    {
      "id": "spouse03:beat_v2:a:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interjection_allow",
      "line": "정장과 구두 이야기를 꺼낼 때마다 먼저 떠오른 건 체면이었습니다. 허술해 보이고 싶지 않아서 더 숨었습니다.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
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
          "spouse03:a:d-1:emotion:0",
          "spouse03:a:d-1:unlock:s4:0",
          "spouse03:a:d-1:rule:1"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-1:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 1,
      "setFlags": [
        "d-1:surface:interjection_emotional_only"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "spouse03:beat_v2:a:d-1:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interjection_block",
      "line": "체면 이야기를 길게 해도 160만원 무단 인출은 그대로 남습니다. 필요비였는지와 상의 위반인지부터 분리합시다.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
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
          "spouse03:a:d-1:emotion:0",
          "spouse03:a:d-1:unlock:s4:0",
          "spouse03:a:d-1:rule:1"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-1:surface:mid:interjection:emotional_only:block",
      "variantTarget": 1,
      "setFlags": [
        "d-1:surface:interjection_emotional_only"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "spouse03:beat_v2:b:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interjection_allow",
      "line": "살림 못 굴리는 남편처럼 보일까 봐 적금 정지를 농담으로 덮었습니다. 그 순간엔 버티는 척이라도 해야 했습니다.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
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
          "spouse03:b:d-2:emotion:0",
          "spouse03:b:d-2:unlock:s4:0",
          "spouse03:b:d-2:rule:1"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-2:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 1,
      "setFlags": [
        "d-2:surface:interjection_emotional_only"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "spouse03:beat_v2:b:d-2:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interjection_block",
      "line": "농담과 자존심 뒤로 숨으면 자동이체 중단과 건조기 초회금이 흐려집니다. 계산된 조정이었다는 부분부터 인정하세요.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
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
          "spouse03:b:d-2:emotion:0",
          "spouse03:b:d-2:unlock:s4:0",
          "spouse03:b:d-2:rule:1"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-2:surface:mid:interjection:emotional_only:block",
      "variantTarget": 1,
      "setFlags": [
        "d-2:surface:interjection_emotional_only"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "spouse03:beat_v2:b:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interjection_allow",
      "line": "백화점 알림엔 상호와 금액만 있었고 품목도 보전 여부도 없었습니다. 그 화면만 보고 사치를 단정한 건 근거가 얇았습니다.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "surface",
      "issueRole": "red_herring",
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
          "spouse03:b:d-3:relationship:0",
          "spouse03:b:d-3:unlock:s2:0",
          "spouse03:b:d-3:evidence:1"
        ],
        "forbidAtomIds": [
          "spouse03:b:d-3:admission:1",
          "spouse03:b:d-3:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-3:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 1,
      "setFlags": [
        "d-3:surface:interjection_detail_rebuttal"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal",
        "red_herring"
      ]
    },
    {
      "id": "spouse03:beat_v2:b:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interjection_block",
      "line": "알림이 잘렸다는 말만으로 끝낼 수는 없습니다. 회사 복장 가이드와 보전 공지를 보고도 같은 표현을 유지하는지 답해야 합니다.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "surface",
      "issueRole": "red_herring",
      "responseIntent": "pressure_response",
      "angleTag": "identity",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:b:d-3:admission:0",
          "spouse03:b:d-3:emotion:0",
          "spouse03:b:d-3:evidence:1"
        ],
        "forbidAtomIds": [
          "spouse03:b:d-3:admission:1",
          "spouse03:b:d-3:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 1,
      "setFlags": [
        "d-3:surface:interjection_detail_rebuttal"
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
      "id": "spouse03:beat_v2:a:d-4:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "interjection_allow",
      "line": "유진 인출과 인호 할부는 성격이 달라도 둘 다 50만원 선을 넘었습니다. 예외를 주장하는 쪽이 오히려 규칙을 비운 셈입니다.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "legality",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:a:d-4:rule:0",
          "spouse03:a:d-4:admission:0",
          "spouse03:a:d-4:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse03:a:d-4:admission:1",
          "spouse03:a:d-4:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-4:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 1,
      "setFlags": [
        "d-4:surface:interjection_detail_rebuttal"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "spouse03:beat_v2:a:d-4:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "interjection_block",
      "line": "성격 차이를 말해도 결과는 무단 결정입니다. '필요비였다'는 이유로 규칙 위반을 면제받을 수는 없습니다.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "responsibility",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:a:d-4:admission:0",
          "spouse03:a:d-4:rule:0",
          "spouse03:a:d-4:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse03:a:d-4:admission:1",
          "spouse03:a:d-4:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-4:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 1,
      "setFlags": [
        "d-4:surface:interjection_detail_rebuttal"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "spouse03:beat_v2:b:d-5:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "interjection_allow",
      "line": "가계 구멍을 한 사람 탓으로 세우면 제 체면은 잠깐 편해집니다. 그래서 더 쉽게 유진 지출 쪽만 확대해 봤습니다.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
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
          "spouse03:b:d-5:context:1",
          "spouse03:b:d-5:timeline:0",
          "spouse03:b:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse03:b:d-5:admission:1",
          "spouse03:b:d-5:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-5:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 1,
      "setFlags": [
        "d-5:surface:interjection_misbelief_escalation"
      ],
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
      "id": "spouse03:beat_v2:b:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "interjection_block",
      "line": "체면의 방어막을 인정했다면 이제 한 사람 탓 프레임을 내려놔야 합니다. 같은 주의 적금 정지와 급여 지연도 함께 보죠.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
      "applicableStates": [
        "M1",
        "M2"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "responsibility",
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
          "spouse03:b:d-5:admission:0",
          "spouse03:b:d-5:responsibility:1",
          "spouse03:b:d-5:responsibility:2"
        ],
        "forbidAtomIds": [
          "spouse03:b:d-5:admission:1",
          "spouse03:b:d-5:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-5:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 1,
      "setFlags": [
        "d-5:surface:interjection_misbelief_escalation"
      ],
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
      "id": "spouse03:beat_v2:b:d-3:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interjection_allow",
      "line": "잠금 화면 승인 알림은 원래 결과만 남깁니다. 품목, 보전 여부, 회사 기준은 전부 화면 바깥에 있습니다.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
      "applicableStates": [
        "M1",
        "M2"
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
          "M1",
          "M2"
        ],
        "trapStates": [
          "cropped_capture",
          "result_only_notice"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:b:d-3:relationship:0",
          "spouse03:b:d-3:unlock:s2:0",
          "spouse03:b:d-3:evidence:1"
        ],
        "forbidAtomIds": [
          "spouse03:b:d-3:admission:1",
          "spouse03:b:d-3:context:1"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-3:surface:mid:interjection:trap_signal:allow",
      "variantTarget": 1,
      "setFlags": [
        "d-3:surface:interjection_trap_signal"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "trap_signal",
        "red_herring"
      ],
      "beliefMode": "misbelief"
    },
    {
      "id": "spouse03:beat_v2:b:d-3:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interjection_block",
      "line": "이 함정은 상호명만 보고 사치라고 읽는 데 있습니다. 화면 바깥의 복장 가이드를 보지 않으면 같은 함정에 다시 빠집니다.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
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
        ],
        "trapStates": [
          "cropped_capture",
          "result_only_notice"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse03:b:d-3:admission:0",
          "spouse03:b:d-3:emotion:0",
          "spouse03:b:d-3:evidence:1"
        ],
        "forbidAtomIds": [
          "spouse03:b:d-3:admission:1",
          "spouse03:b:d-3:context:1"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:trap_signal:block",
      "variantTarget": 1,
      "setFlags": [
        "d-3:surface:interjection_trap_signal"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "trap_signal",
        "red_herring"
      ],
      "beliefMode": "misbelief"
    }
  ]
} as const;

export default spouse03BeatsV2Full;
