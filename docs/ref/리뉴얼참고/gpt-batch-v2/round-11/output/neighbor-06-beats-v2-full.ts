export const neighbor-06BeatsV2Full = {
  "caseId": "neighbor-06",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 54,
    "byActionFamily": {
      "question": 28,
      "evidence": 4,
      "fatigue": 6,
      "free_question": 4,
      "interjection": 12
    },
    "byResponseIntent": {
      "pressure_response": 20,
      "motive_response": 6,
      "rapport_response": 10,
      "evidence_response": 4,
      "fatigue_response": 6,
      "trap_confusion_response": 8
    },
    "byParty": {
      "a": 27,
      "b": 27
    },
    "byDispute": {
      "d-1": 20,
      "d-2": 20,
      "d-4": 3,
      "d-5": 3,
      "d-3": 8
    },
    "interjectionBreakdown": {
      "emotional_only": 4,
      "detail_rebuttal": 4,
      "misbelief_escalation": 4
    },
    "fatigueDisputes": [
      "d-1",
      "d-2"
    ],
    "coverageKeys": 50
  },
  "beats": [
    {
      "id": "neighbor-06:beat_v2:a:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "저는 실제보다 더 받으려던 게 아니라 견적서 기준으로 반씩 말씀드린 겁니다. 급해서 먼저 90,000원만 적어 보낸 거지 숨긴 금액은 없었습니다.",
      "behaviorHint": "시각과 순서를 또박또박 짚다가 마지막에 말을 흐린다.",
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
          "neighbor-06:a:d-1:evidence:0",
          "neighbor-06:a:d-1:act:0"
        ],
        "forbidAtomIds": [
          "neighbor-06:a:d-1:admission:1",
          "neighbor-06:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:timeline",
      "coverageKey": "a:d-1:surface:early:pressure:timeline",
      "variantTarget": 1,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:a:d-1:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "보전금 반영 전후가 바로 정리된 줄은 알았지만, 우선 견적 기준으로 금액을 잡아 본 겁니다. 최종 계산서가 오면 다시 맞출 생각이었지 과다 청구를 확정한 건 아니었습니다.",
      "behaviorHint": "상황 전체를 손짓으로 그리듯 설명한다.",
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
          "neighbor-06:a:d-1:act:0",
          "neighbor-06:a:d-1:evidence:0"
        ],
        "forbidAtomIds": [
          "neighbor-06:a:d-1:admission:1",
          "neighbor-06:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:context",
      "coverageKey": "a:d-1:surface:early:pressure:context",
      "variantTarget": 1,
      "setFlags": [
        "d-1:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:a:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "보전금 얘기를 바로 안 한 건 맞습니다. 그래도 저는 아직 세부가 다 정리되기 전이라 생각해서 견적 절반을 먼저 말한 거였습니다.",
      "behaviorHint": "상대를 가리켰다가 곧 자기 방어로 되돌아온다.",
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
          "neighbor-06:a:d-1:counter:0",
          "neighbor-06:a:d-1:admission:0"
        ],
        "forbidAtomIds": [
          "neighbor-06:a:d-1:admission:1",
          "neighbor-06:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:pressure:responsibility",
      "coverageKey": "a:d-1:motive:mid:pressure:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-1:motive:responsibility_opened",
        "d-1:motive:opened"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:a:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "제가 먼저 돈 얘기를 꺼낸 건 맞지만, 인호 씨도 금액만 붙잡고 확인을 같이 안 했습니다. 혼자 다 처리한 사람 입장에선 빨리 정산하려는 마음이 있었던 겁니다.",
      "behaviorHint": "변명과 이유가 섞이며 문장이 길어진다.",
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
          "neighbor-06:a:d-1:self_justification:1",
          "neighbor-06:a:d-1:self_justification:2"
        ],
        "forbidAtomIds": [
          "neighbor-06:a:d-1:admission:1",
          "neighbor-06:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:motive:motive",
      "coverageKey": "a:d-1:motive:mid:motive:motive",
      "variantTarget": 1,
      "setFlags": [
        "d-1:motive:motive_opened",
        "d-1:motive:opened"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-1:surface:context_pressed"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "제가 돈 몇 만 원 더 받자고 이 난리를 만든 사람처럼 보이십니까? 저는 그 문 소리부터 멈추고 싶었습니다.",
      "behaviorHint": "호흡이 짧아지고 표정이 무너진다.",
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
          "neighbor-06:a:d-1:emotion:0",
          "neighbor-06:a:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:emotion_opened"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-1:motive:opened"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:b:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "세영 씨가 저한테 90,000원을 보내라 한 건 아예 더 받아내려는 걸로 들렸습니다. 최종 계산서도 없이 그런 숫자를 먼저 보내면 당연히 부풀린 걸로 보입니다.",
      "behaviorHint": "시각과 순서를 또박또박 짚다가 마지막에 말을 흐린다.",
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
          "neighbor-06:b:d-1:counter:0",
          "neighbor-06:b:d-1:evidence:0"
        ],
        "forbidAtomIds": [
          "neighbor-06:b:d-1:admission:1",
          "neighbor-06:b:d-1:admission:0"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:timeline",
      "coverageKey": "b:d-1:surface:early:pressure:timeline",
      "variantTarget": 1,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:b:d-1:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "제가 의심한 이유는 최종 계산서가 아니라 견적 캡처만 왔기 때문입니다. 그 상황에서 90,000원을 실제 제 몫처럼 받는 건 받아들이기 어려웠습니다.",
      "behaviorHint": "상황 전체를 손짓으로 그리듯 설명한다.",
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
          "neighbor-06:b:d-1:evidence:0",
          "neighbor-06:b:d-1:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor-06:b:d-1:admission:1",
          "neighbor-06:b:d-1:admission:0"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:context",
      "coverageKey": "b:d-1:surface:early:pressure:context",
      "variantTarget": 1,
      "setFlags": [
        "d-1:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:b:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "보전 전 금액을 기준으로 보낸 건 맞고, 그래서 제가 과다 청구로 의심한 겁니다. 적어도 숫자 제시는 세영 씨 쪽이 잘못됐다고 봅니다.",
      "behaviorHint": "상대를 가리켰다가 곧 자기 방어로 되돌아온다.",
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
          "neighbor-06:b:d-1:responsibility:0",
          "neighbor-06:b:d-1:counter:1"
        ],
        "forbidAtomIds": [
          "neighbor-06:b:d-1:admission:1",
          "neighbor-06:b:d-1:admission:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:pressure:responsibility",
      "coverageKey": "b:d-1:motive:mid:pressure:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-1:motive:responsibility_opened",
        "d-1:motive:opened"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:b:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "설명 없이 송금부터 요구한 건 세영 씨 책임이 더 큽니다. 제가 화를 냈어도 먼저 숫자를 잘못 꺼낸 쪽은 그 사람입니다.",
      "behaviorHint": "변명과 이유가 섞이며 문장이 길어진다.",
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
          "neighbor-06:b:d-1:denial:0",
          "neighbor-06:b:d-1:evidence:1"
        ],
        "forbidAtomIds": [
          "neighbor-06:b:d-1:admission:1",
          "neighbor-06:b:d-1:admission:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:motive:motive",
      "coverageKey": "b:d-1:motive:mid:motive:motive",
      "variantTarget": 1,
      "setFlags": [
        "d-1:motive:motive_opened",
        "d-1:motive:opened"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-1:surface:context_pressed"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:b:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "저는 최종 금액도 모르는데 돈부터 내라는 말에 바로 화가 났습니다. 숫자만 붙들고 버틴 건 저도 인정하지만 그때는 억울함이 먼저였습니다.",
      "behaviorHint": "호흡이 짧아지고 표정이 무너진다.",
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
          "neighbor-06:b:d-1:emotion:0",
          "neighbor-06:b:d-1:admission:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:rapport:emotion",
      "coverageKey": "b:d-1:core:late:rapport:emotion",
      "variantTarget": 1,
      "setFlags": [
        "d-1:core:emotion_opened"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-1:motive:opened"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:a:d-2:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "인호 씨가 접이식 카트나 박스로 문을 받친 쪽이 더 문제였다고 봅니다. 저는 그 사람 사용부터 확인해야 한다고 생각했습니다.",
      "behaviorHint": "시각과 순서를 또박또박 짚다가 마지막에 말을 흐린다.",
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
          "neighbor-06:a:d-2:evidence:0",
          "neighbor-06:a:d-2:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor-06:a:d-2:admission:1",
          "neighbor-06:a:d-2:relationship:0"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:pressure:timeline",
      "coverageKey": "a:d-2:surface:early:pressure:timeline",
      "variantTarget": 1,
      "setFlags": [
        "d-2:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:a:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "적어도 인호 씨도 잠깐씩은 문을 받친 게 맞습니다. 그래서 그분 책임을 빼고 말하는 건 공정하지 않다고 본 겁니다.",
      "behaviorHint": "상황 전체를 손짓으로 그리듯 설명한다.",
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
          "neighbor-06:a:d-2:responsibility:0",
          "neighbor-06:a:d-2:evidence:0"
        ],
        "forbidAtomIds": [
          "neighbor-06:a:d-2:admission:1",
          "neighbor-06:a:d-2:relationship:0"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:pressure:context",
      "coverageKey": "a:d-2:surface:early:pressure:context",
      "variantTarget": 1,
      "setFlags": [
        "d-2:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:a:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "저도 손수레를 쓴 건 맞지만, 인호 씨 카트도 반복됐습니다. 한쪽만 빼고 말하면 실제 흐름이 달라집니다.",
      "behaviorHint": "상대를 가리켰다가 곧 자기 방어로 되돌아온다.",
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
          "neighbor-06:a:d-2:context:0",
          "neighbor-06:a:d-2:counter:2"
        ],
        "forbidAtomIds": [
          "neighbor-06:a:d-2:admission:1",
          "neighbor-06:a:d-2:relationship:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:pressure:responsibility",
      "coverageKey": "a:d-2:motive:mid:pressure:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-2:motive:responsibility_opened",
        "d-2:motive:opened"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-2:surface:timeline_pressed"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:a:d-2:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "서로 편의상 쓴 건 맞아도 인호 씨가 자기 몫을 너무 빼려고 합니다. 적어도 본인 카트 책임은 더 분명히 인정해야 합니다.",
      "behaviorHint": "변명과 이유가 섞이며 문장이 길어진다.",
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
          "neighbor-06:a:d-2:denial:0",
          "neighbor-06:a:d-2:admission:0"
        ],
        "forbidAtomIds": [
          "neighbor-06:a:d-2:admission:1",
          "neighbor-06:a:d-2:relationship:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:motive:motive",
      "coverageKey": "a:d-2:motive:mid:motive:motive",
      "variantTarget": 1,
      "setFlags": [
        "d-2:motive:motive_opened",
        "d-2:motive:opened"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-2:surface:context_pressed"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:a:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "문이 세게 닫힐 때마다 저도 신경이 쓰였는데 결국 둘 다 편의로 넘겼습니다. 그래서 인호 씨 탓만 하기도 찔리는 건 사실입니다.",
      "behaviorHint": "호흡이 짧아지고 표정이 무너진다.",
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
          "neighbor-06:a:d-2:emotion:0",
          "neighbor-06:a:d-2:relationship:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:core:rapport:emotion",
      "coverageKey": "a:d-2:core:late:rapport:emotion",
      "variantTarget": 1,
      "setFlags": [
        "d-2:core:emotion_opened"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-2:motive:opened"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:b:d-2:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "저는 문을 거의 받쳐 둔 적이 없습니다. 있어도 짐 옮길 때 잠깐이었지 그게 고장 원인이라고 보긴 어렵습니다.",
      "behaviorHint": "시각과 순서를 또박또박 짚다가 마지막에 말을 흐린다.",
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
          "neighbor-06:b:d-2:denial:0",
          "neighbor-06:b:d-2:uncertainty:1"
        ],
        "forbidAtomIds": [
          "neighbor-06:b:d-2:admission:2",
          "neighbor-06:b:d-2:unlock:s5:0"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:timeline",
      "coverageKey": "b:d-2:surface:early:pressure:timeline",
      "variantTarget": 1,
      "setFlags": [
        "d-2:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:b:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "짐이 있을 때 문을 세운 적은 있어도 아주 잠깐이었습니다. 그 정도 사용까지 공동 책임으로 묶는 건 과하다고 생각합니다.",
      "behaviorHint": "상황 전체를 손짓으로 그리듯 설명한다.",
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
          "neighbor-06:b:d-2:uncertainty:0",
          "neighbor-06:b:d-2:uncertainty:1"
        ],
        "forbidAtomIds": [
          "neighbor-06:b:d-2:admission:2",
          "neighbor-06:b:d-2:unlock:s5:0"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:context",
      "coverageKey": "b:d-2:surface:early:pressure:context",
      "variantTarget": 1,
      "setFlags": [
        "d-2:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:b:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "카트나 박스로 문을 받친 적이 아예 없진 않습니다. 그래도 세영 씨 손수레처럼 반복 원인으로 보기엔 제 쪽은 짧았다고 생각했습니다.",
      "behaviorHint": "상대를 가리켰다가 곧 자기 방어로 되돌아온다.",
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
          "neighbor-06:b:d-2:counter:1",
          "neighbor-06:b:d-2:counter:2"
        ],
        "forbidAtomIds": [
          "neighbor-06:b:d-2:admission:2",
          "neighbor-06:b:d-2:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:pressure:responsibility",
      "coverageKey": "b:d-2:motive:mid:pressure:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-2:motive:responsibility_opened",
        "d-2:motive:opened"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-2:surface:timeline_pressed"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:b:d-2:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "그래도 더 자주 쓰고 더 오래 건 쪽은 세영 씨라고 봅니다. 제 사용이 있었다고 해도 전체 원인을 같게 보긴 어렵습니다.",
      "behaviorHint": "변명과 이유가 섞이며 문장이 길어진다.",
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
          "neighbor-06:b:d-2:denial:1",
          "neighbor-06:b:d-2:admission:0"
        ],
        "forbidAtomIds": [
          "neighbor-06:b:d-2:admission:2",
          "neighbor-06:b:d-2:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:motive:motive",
      "coverageKey": "b:d-2:motive:mid:motive:motive",
      "variantTarget": 1,
      "setFlags": [
        "d-2:motive:motive_opened",
        "d-2:motive:opened"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-2:surface:context_pressed"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:b:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "제가 쓴 건 잠깐이라 생각했습니다. 그런데 저까지 똑같이 책임지라니 억울한 건 사실입니다.",
      "behaviorHint": "호흡이 짧아지고 표정이 무너진다.",
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
          "neighbor-06:b:d-2:emotion:0",
          "neighbor-06:b:d-2:admission:2"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:core:rapport:emotion",
      "coverageKey": "b:d-2:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-2:core:emotion_opened"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-2:motive:opened"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:a:d-4:motive:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "공식 자료를 보면 주민 부담 총액이 120,000원까지 줄어든 건 맞습니다. 다만 저는 그걸 바로 두 집이 60,000원씩이라고 정리하지 못했습니다.",
      "behaviorHint": "상황 전체를 손짓으로 그리듯 설명한다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "context",
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
          "neighbor-06:a:d-4:uncertainty:2",
          "neighbor-06:a:d-4:evidence:0"
        ],
        "forbidAtomIds": [
          "neighbor-06:a:d-4:counter:0",
          "neighbor-06:a:d-4:emotion:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:pressure:context",
      "coverageKey": "a:d-4:motive:mid:pressure:context",
      "variantTarget": 1,
      "setFlags": [
        "d-4:motive:context_opened",
        "d-4:motive:opened"
      ],
      "tags": [
        "subtruth",
        "mid"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:b:d-4:motive:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "공식 자료를 보니 주민 부담 총액이 120,000원이라는 건 이해됩니다. 다만 그걸 바로 제 책임분으로 받아들이는 데는 아직 걸렸습니다.",
      "behaviorHint": "상황 전체를 손짓으로 그리듯 설명한다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "context",
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
          "neighbor-06:b:d-4:uncertainty:1",
          "neighbor-06:b:d-4:evidence:0"
        ],
        "forbidAtomIds": [
          "neighbor-06:b:d-4:admission:0",
          "neighbor-06:b:d-4:counter:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:motive:pressure:context",
      "coverageKey": "b:d-4:motive:mid:pressure:context",
      "variantTarget": 1,
      "setFlags": [
        "d-4:motive:context_opened",
        "d-4:motive:opened"
      ],
      "tags": [
        "subtruth",
        "mid"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:a:d-5:motive:pressure:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "예전 원칙보다 먼저 돈 얘기를 꺼낸 건 맞습니다. 문 소리와 수리 일정 때문에 빨리 끝내고 싶어 절차를 당겼습니다.",
      "behaviorHint": "약속·규정·절차를 꺼내며 선을 긋는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "legality",
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
          "neighbor-06:a:d-5:admission:0",
          "neighbor-06:a:d-5:rule:1"
        ],
        "forbidAtomIds": [
          "neighbor-06:a:d-5:admission:1",
          "neighbor-06:a:d-5:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:pressure:legality",
      "coverageKey": "a:d-5:motive:mid:pressure:legality",
      "variantTarget": 1,
      "setFlags": [
        "d-5:motive:legality_opened",
        "d-5:motive:opened"
      ],
      "tags": [
        "subtruth",
        "mid"
      ],
      "requiresFlags": [
        "d-5:surface:timeline_pressed"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:b:d-5:motive:pressure:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "돌아보면 제가 화가 나서 전액 거부처럼 말한 부분은 있습니다. 다만 그때는 먼저 돈부터 보내라는 식이라 제 책임분도 확인하기 싫었습니다.",
      "behaviorHint": "약속·규정·절차를 꺼내며 선을 긋는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "legality",
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
          "neighbor-06:b:d-5:unlock:s2:0",
          "neighbor-06:b:d-5:counter:1"
        ],
        "forbidAtomIds": [
          "neighbor-06:b:d-5:admission:2",
          "neighbor-06:b:d-5:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:pressure:legality",
      "coverageKey": "b:d-5:motive:mid:pressure:legality",
      "variantTarget": 1,
      "setFlags": [
        "d-5:motive:legality_opened",
        "d-5:motive:opened"
      ],
      "tags": [
        "subtruth",
        "mid"
      ],
      "requiresFlags": [
        "d-5:surface:timeline_pressed"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:a:d-1:surface:evidence:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "counter",
      "line": "견적 캡처만 보냈다고 해도 최종 정산서는 이미 있었습니다. 그런데도 왜 인호 씨 몫보다 30,000원 많은 90,000원을 요구했습니까?",
      "behaviorHint": "제시된 자료를 힐끗 확인한 뒤 변명과 이유가 섞이며 문장이 길어진다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "evidence_response",
      "angleTag": "motive",
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
          "neighbor-06:a:d-1:self_justification:0",
          "neighbor-06:a:d-1:motive:0"
        ],
        "forbidAtomIds": [
          "neighbor-06:a:d-1:admission:1",
          "neighbor-06:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 6,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:evidence:motive",
      "coverageKey": "a:d-1:surface:early:evidence:motive",
      "variantTarget": 1,
      "setFlags": [
        "d-1:surface:evidence_pressed"
      ],
      "tags": [
        "evidence"
      ],
      "evidenceIds": [
        "e-1",
        "e-3"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:b:d-2:surface:evidence:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "counter",
      "line": "잠깐이었다면 왜 CCTV와 점검보고서가 반복 사용 흔적을 함께 가리킵니까? 짧았다는 말과 반복됐다는 기록이 동시에 참일 수는 없습니다.",
      "behaviorHint": "제시된 자료를 힐끗 확인한 뒤 변명과 이유가 섞이며 문장이 길어진다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "evidence_response",
      "angleTag": "motive",
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
          "neighbor-06:b:d-2:uncertainty:0",
          "neighbor-06:b:d-2:denial:0"
        ],
        "forbidAtomIds": [
          "neighbor-06:b:d-2:admission:2",
          "neighbor-06:b:d-2:unlock:s5:0"
        ]
      },
      "weight": 6,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:evidence:motive",
      "coverageKey": "b:d-2:surface:early:evidence:motive",
      "variantTarget": 1,
      "setFlags": [
        "d-2:surface:evidence_pressed"
      ],
      "tags": [
        "evidence"
      ],
      "evidenceIds": [
        "e-2",
        "e-4"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:a:d-5:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "작년 합의는 최종 계산서 확인 후 분담이었습니다. 그런데 이번엔 왜 관리사무소 확인보다 계좌번호가 먼저 갔습니까?",
      "behaviorHint": "제시된 자료를 힐끗 확인한 뒤 약속·규정·절차를 꺼내며 선을 긋는다.",
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
          "neighbor-06:a:d-5:admission:0",
          "neighbor-06:a:d-5:rule:1"
        ],
        "forbidAtomIds": [
          "neighbor-06:a:d-5:admission:1",
          "neighbor-06:a:d-5:unlock:s5:0"
        ]
      },
      "weight": 6,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:evidence:legality",
      "coverageKey": "a:d-5:motive:mid:evidence:legality",
      "variantTarget": 1,
      "setFlags": [
        "d-5:motive:evidence_pressed"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-5:surface:timeline_pressed"
      ],
      "evidenceIds": [
        "e-5"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:b:d-4:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "최종 금액이 불명확했다는 불만과 별개로, 본인 책임분 확인도 없이 전액 거부부터 한 순서는 기록으로 남아 있습니다. 절차를 지켰다는 말과 맞지 않습니다.",
      "behaviorHint": "제시된 자료를 힐끗 확인한 뒤 약속·규정·절차를 꺼내며 선을 긋는다.",
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
          "neighbor-06:b:d-4:counter:0",
          "neighbor-06:b:d-4:evidence:0"
        ],
        "forbidAtomIds": [
          "neighbor-06:b:d-4:admission:0",
          "neighbor-06:b:d-4:counter:0"
        ]
      },
      "weight": 6,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:motive:evidence:legality",
      "coverageKey": "b:d-4:motive:mid:evidence:legality",
      "variantTarget": 1,
      "setFlags": [
        "d-4:motive:evidence_pressed"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-4:surface:timeline_pressed"
      ],
      "evidenceIds": [
        "e-5",
        "e-3"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:a:d-1:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "fatigue",
      "line": "9만원 건은 이미 말씀드렸습니다. 같은 시점만 반복해서 묻는다고 순서가 달라지진 않습니다.",
      "behaviorHint": "질문이 반복되자 한숨을 삼키며 시각과 순서를 또박또박 짚다가 마지막에 말을 흐린다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
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
          "neighbor-06:a:d-1:unlock:s3:0",
          "neighbor-06:a:d-1:admission:0"
        ],
        "forbidAtomIds": [
          "neighbor-06:a:d-1:admission:1",
          "neighbor-06:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:timeline",
      "coverageKey": "a:d-1:motive:mid:fatigue:timeline",
      "variantTarget": 1,
      "setFlags": [
        "d-1:motive:fatigue_irritated"
      ],
      "tags": [
        "fatigue_turn2",
        "fatigue"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:a:d-1:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "fatigue",
      "line": "제 쪽 책임만 떼어 묻지 마세요. 9만원 문제는 전체 흐름으로 같이 봐야 합니다.",
      "behaviorHint": "질문이 반복되자 한숨을 삼키며 상대를 가리켰다가 곧 자기 방어로 되돌아온다.",
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
          "neighbor-06:a:d-1:counter:0",
          "neighbor-06:a:d-1:admission:0"
        ],
        "forbidAtomIds": [
          "neighbor-06:a:d-1:admission:1",
          "neighbor-06:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:responsibility",
      "coverageKey": "a:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-1:motive:fatigue_blocked"
      ],
      "tags": [
        "fatigue_turn3",
        "fatigue"
      ],
      "requiresFlags": [
        "d-1:motive:fatigue_irritated"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:a:d-1:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "fatigue",
      "line": "지금처럼 몰아붙이면 저도 차분하게만은 못 답합니다. 9만원을 한쪽 잘못처럼 정리하는 건 받아들이기 어렵습니다.",
      "behaviorHint": "질문이 반복되자 한숨을 삼키며 상대를 가리켰다가 곧 자기 방어로 되돌아온다.",
      "applicableStates": [
        "S3",
        "S4"
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
          "neighbor-06:a:d-1:counter:0",
          "neighbor-06:a:d-1:self_justification:2"
        ],
        "forbidAtomIds": [
          "neighbor-06:a:d-1:admission:1",
          "neighbor-06:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:responsibility",
      "coverageKey": "a:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-1:motive:fatigue_countered"
      ],
      "tags": [
        "fatigue_high",
        "fatigue"
      ],
      "requiresFlags": [
        "d-1:motive:fatigue_blocked"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:b:d-2:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "fatigue",
      "line": "접이식 카트 건은 이미 말씀드렸습니다. 같은 시점만 반복해서 묻는다고 순서가 달라지진 않습니다.",
      "behaviorHint": "질문이 반복되자 한숨을 삼키며 시각과 순서를 또박또박 짚다가 마지막에 말을 흐린다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
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
          "neighbor-06:b:d-2:unlock:s2:0",
          "neighbor-06:b:d-2:admission:0"
        ],
        "forbidAtomIds": [
          "neighbor-06:b:d-2:admission:2",
          "neighbor-06:b:d-2:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:fatigue:timeline",
      "coverageKey": "b:d-2:motive:mid:fatigue:timeline",
      "variantTarget": 1,
      "setFlags": [
        "d-2:motive:fatigue_irritated"
      ],
      "tags": [
        "fatigue_turn2",
        "fatigue"
      ],
      "requiresFlags": [
        "d-2:surface:timeline_pressed"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:b:d-2:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "fatigue",
      "line": "제 쪽 책임만 떼어 묻지 마세요. 접이식 카트 문제는 전체 흐름으로 같이 봐야 합니다.",
      "behaviorHint": "질문이 반복되자 한숨을 삼키며 상대를 가리켰다가 곧 자기 방어로 되돌아온다.",
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
          "neighbor-06:b:d-2:counter:1",
          "neighbor-06:b:d-2:counter:2"
        ],
        "forbidAtomIds": [
          "neighbor-06:b:d-2:admission:2",
          "neighbor-06:b:d-2:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:fatigue:responsibility",
      "coverageKey": "b:d-2:motive:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-2:motive:fatigue_blocked"
      ],
      "tags": [
        "fatigue_turn3",
        "fatigue"
      ],
      "requiresFlags": [
        "d-2:motive:fatigue_irritated"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:b:d-2:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "fatigue",
      "line": "지금처럼 몰아붙이면 저도 차분하게만은 못 답합니다. 접이식 카트를 한쪽 잘못처럼 정리하는 건 받아들이기 어렵습니다.",
      "behaviorHint": "질문이 반복되자 한숨을 삼키며 상대를 가리켰다가 곧 자기 방어로 되돌아온다.",
      "applicableStates": [
        "S3",
        "S4"
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
          "neighbor-06:b:d-2:counter:2",
          "neighbor-06:b:d-2:admission:1"
        ],
        "forbidAtomIds": [
          "neighbor-06:b:d-2:admission:2",
          "neighbor-06:b:d-2:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:fatigue:responsibility",
      "coverageKey": "b:d-2:motive:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-2:motive:fatigue_countered"
      ],
      "tags": [
        "fatigue_high",
        "fatigue"
      ],
      "requiresFlags": [
        "d-2:motive:fatigue_blocked"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:a:d-1:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "관리사무소 보전금 60,000원이 반영돼 주민 부담 총액이 120,000원이라는 걸 알고도 제가 90,000원을 요구했습니다. 인호 씨 몫은 60,000원이었는데 실제 부담액을 숨기고 더 받으려 한 건 제 잘못입니다.",
      "behaviorHint": "준비되지 않은 질문이라 잠시 멈칫한 뒤 변명과 이유가 섞이며 문장이 길어진다.",
      "applicableStates": [
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
          "neighbor-06:a:d-1:shame:0",
          "neighbor-06:a:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:motive:motive",
      "coverageKey": "a:d-1:core:late:motive:motive",
      "variantTarget": 1,
      "setFlags": [
        "d-1:core:free_question_opened"
      ],
      "tags": [
        "late_free",
        "free"
      ],
      "requiresFlags": [
        "d-1:core:emotion_opened"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:a:d-1:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "제가 돈 몇 만 원 더 받자고 이 난리를 만든 사람처럼 보이십니까? 저는 그 문 소리부터 멈추고 싶었습니다.",
      "behaviorHint": "준비되지 않은 질문이라 잠시 멈칫한 뒤 호흡이 짧아지고 표정이 무너진다.",
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
          "neighbor-06:a:d-1:emotion:0",
          "neighbor-06:a:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:free_question_opened"
      ],
      "tags": [
        "late_free",
        "free"
      ],
      "requiresFlags": [
        "d-1:core:emotion_opened"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:b:d-2:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "제 접이식 카트와 박스 사용도 방화문 손상을 키운 공동 책임에 포함됩니다. 그 점에서 제 잘못도 분명히 있습니다.",
      "behaviorHint": "준비되지 않은 질문이라 잠시 멈칫한 뒤 변명과 이유가 섞이며 문장이 길어진다.",
      "applicableStates": [
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
          "neighbor-06:b:d-2:emotion:0",
          "neighbor-06:b:d-2:unlock:s4:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:core:motive:motive",
      "coverageKey": "b:d-2:core:late:motive:motive",
      "variantTarget": 1,
      "setFlags": [
        "d-2:core:free_question_opened"
      ],
      "tags": [
        "late_free",
        "free"
      ],
      "requiresFlags": [
        "d-2:core:emotion_opened"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:b:d-2:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "제가 쓴 건 잠깐이라 생각했습니다. 그런데 저까지 똑같이 책임지라니 억울한 건 사실입니다.",
      "behaviorHint": "준비되지 않은 질문이라 잠시 멈칫한 뒤 호흡이 짧아지고 표정이 무너진다.",
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
          "neighbor-06:b:d-2:emotion:0",
          "neighbor-06:b:d-2:admission:2"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:core:rapport:emotion",
      "coverageKey": "b:d-2:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-2:core:free_question_opened"
      ],
      "tags": [
        "late_free",
        "free"
      ],
      "requiresFlags": [
        "d-2:core:emotion_opened"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:a:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "도어클로저가 제 손수레 하나 때문에 망가졌다는 말은 과합니다. 저는 잠깐 지나가는 정도였고 문이 원래부터 세게 닫히고 있었습니다.",
      "behaviorHint": "대상이나 표식을 집어 말하며 특정성을 강조한다.",
      "applicableStates": [
        "S0",
        "S1",
        "S2"
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
          "neighbor-06:a:d-3:admission:0",
          "neighbor-06:a:d-3:context:0"
        ],
        "forbidAtomIds": [
          "neighbor-06:a:d-3:admission:1",
          "neighbor-06:a:d-3:unlock:s5:0"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:identity",
      "coverageKey": "a:d-3:surface:early:trap:identity",
      "variantTarget": 1,
      "setFlags": [
        "d-3:surface:misbelief_rattled"
      ],
      "tags": [
        "red_herring",
        "hot"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:b:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "도어클로저는 거의 세영 씨 손수레 때문에 망가진 거라고 봤습니다. 제 쪽 사용은 있어도 그 정도로 큰 원인이라고 생각하지 않았습니다.",
      "behaviorHint": "상황 전체를 손짓으로 그리듯 설명한다.",
      "applicableStates": [
        "S0",
        "S1",
        "S2"
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
          "neighbor-06:b:d-3:context:0",
          "neighbor-06:b:d-3:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor-06:b:d-3:admission:2",
          "neighbor-06:b:d-3:unlock:s5:0"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:context",
      "coverageKey": "b:d-3:surface:early:trap:context",
      "variantTarget": 1,
      "setFlags": [
        "d-3:surface:misbelief_rattled"
      ],
      "tags": [
        "red_herring",
        "hot"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:a:d-3:core:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "손수레 썼다고 저 혼자 범인처럼 몰지 마세요. 그 문은 이미 오래전부터 이상했어요.",
      "behaviorHint": "상황 전체를 손짓으로 그리듯 설명한다.",
      "applicableStates": [
        "S3",
        "S4",
        "S5"
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
        ],
        "misconceptionStates": [
          "M3",
          "M4"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor-06:a:d-3:responsibility:0",
          "neighbor-06:a:d-3:counter:2"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:trap:context",
      "coverageKey": "a:d-3:core:late:trap:context",
      "variantTarget": 1,
      "setFlags": [
        "d-3:core:misbelief_softened"
      ],
      "tags": [
        "red_herring",
        "late"
      ],
      "requiresFlags": [
        "d-3:surface:misbelief_rattled"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:b:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "제가 쓴 건 잠깐이라 생각했습니다. 그런데 저까지 똑같이 책임지라니 억울한 건 사실입니다.",
      "behaviorHint": "호흡이 짧아지고 표정이 무너진다.",
      "applicableStates": [
        "S3",
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "emotion",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
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
        ],
        "misconceptionStates": [
          "M3",
          "M4"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor-06:b:d-3:emotion:0",
          "neighbor-06:b:d-3:unlock:s4:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:trap:emotion",
      "coverageKey": "b:d-3:core:late:trap:emotion",
      "variantTarget": 1,
      "setFlags": [
        "d-3:core:misbelief_softened"
      ],
      "tags": [
        "red_herring",
        "late"
      ],
      "requiresFlags": [
        "d-3:surface:misbelief_rattled"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:a:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "제가 돈 몇 만 원 더 받자고 이 난리를 만든 사람처럼 보이십니까? 저는 그 문 소리부터 멈추고 싶었습니다.",
      "behaviorHint": "말을 끊고 상체를 앞으로 숙이며 짧게 치고 들어온다.",
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
          "neighbor-06:a:d-1:emotion:0",
          "neighbor-06:a:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-1:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 3,
      "setFlags": [],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:a:d-1:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "그 말은 그렇게 잘라서 못 듣겠습니다. 지금은 제 불안과 수치심부터 분리해서 들어 주세요.",
      "behaviorHint": "말을 끊고 상체를 앞으로 숙이며 짧게 치고 들어온다.",
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
          "neighbor-06:a:d-1:emotion:0",
          "neighbor-06:a:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-1:surface:mid:interjection:emotional_only:block",
      "variantTarget": 3,
      "setFlags": [],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:b:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "제가 쓴 건 잠깐이라 생각했습니다. 그런데 저까지 똑같이 책임지라니 억울한 건 사실입니다.",
      "behaviorHint": "말을 끊고 상체를 앞으로 숙이며 짧게 치고 들어온다.",
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
          "neighbor-06:b:d-2:emotion:0",
          "neighbor-06:b:d-2:admission:2"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-2:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 3,
      "setFlags": [],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:b:d-2:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "지금처럼 몰아붙이면 방어적으로 말할 수밖에 없습니다. 제 억울함도 함께 봐 주세요.",
      "behaviorHint": "말을 끊고 상체를 앞으로 숙이며 짧게 치고 들어온다.",
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
          "neighbor-06:b:d-2:emotion:0",
          "neighbor-06:b:d-2:admission:2"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-2:surface:mid:interjection:emotional_only:block",
      "variantTarget": 3,
      "setFlags": [],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:a:d-1:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "견적 캡처만 보냈다고 해도 최종 정산서는 이미 있었습니다. 그런데도 왜 인호 씨 몫보다 30,000원 많은 90,000원을 요구했습니까?",
      "behaviorHint": "말을 끊고 상체를 앞으로 숙이며 짧게 치고 들어온다.",
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
          "neighbor-06:a:d-1:unlock:s2:0",
          "neighbor-06:a:d-1:self_justification:1"
        ],
        "forbidAtomIds": [
          "neighbor-06:a:d-1:admission:1",
          "neighbor-06:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-1:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 3,
      "setFlags": [],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:a:d-1:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "9만원과 18만원 견적부터 바로 보죠. 흐린 표현으로 넘길 문제는 아닙니다.",
      "behaviorHint": "말을 끊고 상체를 앞으로 숙이며 짧게 치고 들어온다.",
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
          "neighbor-06:a:d-1:unlock:s2:0",
          "neighbor-06:a:d-1:self_justification:1"
        ],
        "forbidAtomIds": [
          "neighbor-06:a:d-1:admission:1",
          "neighbor-06:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-1:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 3,
      "setFlags": [],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:b:d-2:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "잠깐이었다면 왜 CCTV와 점검보고서가 반복 사용 흔적을 함께 가리킵니까? 짧았다는 말과 반복됐다는 기록이 동시에 참일 수는 없습니다.",
      "behaviorHint": "말을 끊고 상체를 앞으로 숙이며 짧게 치고 들어온다.",
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
          "neighbor-06:b:d-2:unlock:s2:0",
          "neighbor-06:b:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "neighbor-06:b:d-2:admission:2",
          "neighbor-06:b:d-2:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-2:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 3,
      "setFlags": [],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:b:d-2:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "지금은 접이식 카트와 꽃 손수레 같은 구체 디테일부터 바로잡아야 합니다.",
      "behaviorHint": "말을 끊고 상체를 앞으로 숙이며 짧게 치고 들어온다.",
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
          "neighbor-06:b:d-2:unlock:s2:0",
          "neighbor-06:b:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "neighbor-06:b:d-2:admission:2",
          "neighbor-06:b:d-2:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-2:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 3,
      "setFlags": [],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "neighbor-06:beat_v2:a:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "단독 책임이라는 말만으로 한쪽만 범인처럼 밀 수는 없습니다.",
      "behaviorHint": "말을 끊고 상체를 앞으로 숙이며 짧게 치고 들어온다.",
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
          "M2",
          "M3"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor-06:a:d-3:admission:0",
          "neighbor-06:a:d-3:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "neighbor-06:a:d-3:admission:1",
          "neighbor-06:a:d-3:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 3,
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
      "id": "neighbor-06:beat_v2:a:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "같은 장면만 붙잡지 마세요. 도어클로저까지 같이 봐야 합니다.",
      "behaviorHint": "말을 끊고 상체를 앞으로 숙이며 짧게 치고 들어온다.",
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
          "M1",
          "M2",
          "M3"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor-06:a:d-3:counter:1",
          "neighbor-06:a:d-3:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor-06:a:d-3:admission:1",
          "neighbor-06:a:d-3:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 3,
      "setFlags": [],
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
      "id": "neighbor-06:beat_v2:b:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "짧았다는 말로는 부족합니다. 오일 누유 같은 흔적이 이미 쌓여 있습니다.",
      "behaviorHint": "말을 끊고 상체를 앞으로 숙이며 짧게 치고 들어온다.",
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
          "M2",
          "M3"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor-06:b:d-3:admission:0",
          "neighbor-06:b:d-3:context:0"
        ],
        "forbidAtomIds": [
          "neighbor-06:b:d-3:admission:2",
          "neighbor-06:b:d-3:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 3,
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
      "id": "neighbor-06:beat_v2:b:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-06",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "그 오해를 계속 키우면 정산과 책임선이 더 흐려집니다.",
      "behaviorHint": "말을 끊고 상체를 앞으로 숙이며 짧게 치고 들어온다.",
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
          "M1",
          "M2",
          "M3"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor-06:b:d-3:context:0",
          "neighbor-06:b:d-3:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor-06:b:d-3:admission:2",
          "neighbor-06:b:d-3:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 3,
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

export default neighbor-06BeatsV2Full;
