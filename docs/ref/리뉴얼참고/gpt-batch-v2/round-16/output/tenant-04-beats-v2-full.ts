export const tenant04BeatsV2Full = {
  "caseId": "tenant-04",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 58,
    "byActionFamily": {
      "question": 22,
      "evidence": 8,
      "fatigue": 6,
      "free_question": 10,
      "interjection": 12
    },
    "byIssueRole": {
      "shared_misconception": 16,
      "core_truth": 23,
      "sub_truth": 19
    },
    "byParty": {
      "a": 29,
      "b": 29
    },
    "interjectionCount": 12,
    "fatigueCount": 6
  },
  "beats": [
    {
      "id": "tenant04:beat_v2:a:d-1:motive:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "저도 성급했던 건 맞지만, 먼저 조건을 숨긴 쪽이 있어서 더 확정처럼 믿게 됐습니다.",
      "behaviorHint": "과거 메시지를 연달아 보여주며 답을 길게 늘린다. '느낌상', '거의' 같은 단서를 붙이며 기억의 책임을 흐린다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
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
          "shaken"
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
          "M3"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant04:a:d-1:responsibility:0",
          "tenant04:a:d-1:admission:0"
        ],
        "forbidAtomIds": [
          "tenant04:a:d-1:admission:1"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:trap:context",
      "coverageKey": "a:d-1:motive:mid:trap:context",
      "variantTarget": 4,
      "setFlags": [
        "d-1:surface:evidence_seen"
      ],
      "tags": [
        "red_herring"
      ],
      "requiresFlags": [
        "d-1:surface:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:a:d-1:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "계약서까지는 아니어도 거의 정리된 줄 알았고, 그래서 다음 단계 준비를 했습니다.",
      "behaviorHint": "'느낌상', '거의' 같은 단서를 붙이며 기억의 책임을 흐린다. 과거 메시지를 연달아 보여주며 답을 길게 늘린다.",
      "applicableStates": [
        "S0",
        "S1"
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
          "tenant04:a:d-1:uncertainty:0",
          "tenant04:a:d-1:admission:0"
        ],
        "forbidAtomIds": [
          "tenant04:a:d-1:fear:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:trap:context",
      "coverageKey": "a:d-1:surface:early:trap:context",
      "variantTarget": 6,
      "setFlags": [
        "d-1:motive:opened"
      ],
      "tags": [
        "red_herring"
      ],
      "requiresFlags": [
        "d-1:surface:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:a:d-1:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "저는 월세를 전세로 바꾸는 얘기가 이미 되는 쪽으로 정리됐다고 들었습니다.",
      "behaviorHint": "'느낌상', '거의' 같은 단서를 붙이며 기억의 책임을 흐린다. 과거 메시지를 연달아 보여주며 답을 길게 늘린다.",
      "applicableStates": [
        "S0",
        "S1"
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
          "tenant04:a:d-1:denial:0",
          "tenant04:a:d-1:admission:0"
        ],
        "forbidAtomIds": [
          "tenant04:a:d-1:fear:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:trap:identity",
      "coverageKey": "a:d-1:surface:early:trap:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:opened",
        "d-1:surface:identity_pressed"
      ],
      "tags": [
        "red_herring"
      ]
    },
    {
      "id": "tenant04:beat_v2:b:d-1:motive:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "다은 씨가 확정처럼 움직인 속도도 오해를 키웠습니다. 상담과 송금이 먼저 들어오면서 저도 수습이 늦었습니다.",
      "behaviorHint": "처음엔 말하지 않았던 전제조건을 뒤늦게 하나씩 붙인다. '문서가 없잖아요'라는 식으로 서류 단계를 다시 세운다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
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
          "shaken"
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
          "M3"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant04:b:d-1:responsibility:0",
          "tenant04:b:d-1:admission:0"
        ],
        "forbidAtomIds": [
          "tenant04:b:d-1:admission:1"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:trap:context",
      "coverageKey": "b:d-1:motive:mid:trap:context",
      "variantTarget": 4,
      "setFlags": [
        "d-1:surface:evidence_seen"
      ],
      "tags": [
        "red_herring"
      ],
      "requiresFlags": [
        "d-1:surface:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:b:d-1:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "초안이 오간 건 맞지만, 초안은 어디까지나 초안이고 시작일·총액·서명란이 다 비어 있었습니다.",
      "behaviorHint": "'문서가 없잖아요'라는 식으로 서류 단계를 다시 세운다. 금액과 날짜를 다시 읊으며 대화를 수치 문제로 재설정한다.",
      "applicableStates": [
        "S0",
        "S1"
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
          "tenant04:b:d-1:context:0",
          "tenant04:b:d-1:admission:0"
        ],
        "forbidAtomIds": [
          "tenant04:b:d-1:fear:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:trap:context",
      "coverageKey": "b:d-1:surface:early:trap:context",
      "variantTarget": 6,
      "setFlags": [
        "d-1:motive:opened"
      ],
      "tags": [
        "red_herring"
      ],
      "requiresFlags": [
        "d-1:surface:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:b:d-1:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "확정된 전세 전환은 아니었습니다. 저는 방향만 얘기했고, 서명이나 금액은 끝난 적이 없습니다.",
      "behaviorHint": "'문서가 없잖아요'라는 식으로 서류 단계를 다시 세운다. 금액과 날짜를 다시 읊으며 대화를 수치 문제로 재설정한다.",
      "applicableStates": [
        "S0",
        "S1"
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
          "tenant04:b:d-1:act:0",
          "tenant04:b:d-1:admission:0"
        ],
        "forbidAtomIds": [
          "tenant04:b:d-1:fear:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:trap:identity",
      "coverageKey": "b:d-1:surface:early:trap:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:opened",
        "d-1:surface:identity_pressed"
      ],
      "tags": [
        "red_herring"
      ]
    },
    {
      "id": "tenant04:beat_v2:a:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "그 조건을 미리 분명히 들었으면 저는 송금이나 대출 상담을 그렇게 서두르지 않았을 겁니다.",
      "behaviorHint": "과거 메시지를 연달아 보여주며 답을 길게 늘린다. '느낌상', '거의' 같은 단서를 붙이며 기억의 책임을 흐린다.",
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
          "shaken"
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
          "tenant04:a:d-2:responsibility:0",
          "tenant04:a:d-2:evidence:0"
        ],
        "forbidAtomIds": [
          "tenant04:a:d-2:admission:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:pressure:responsibility",
      "coverageKey": "a:d-2:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-2:motive:opened"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-2:surface:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:a:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "공동명의 서명이나 대출 비용이 핵심 조건이라는 말은 처음엔 듣지 못했습니다.",
      "behaviorHint": "'느낌상', '거의' 같은 단서를 붙이며 기억의 책임을 흐린다. 과거 메시지를 연달아 보여주며 답을 길게 늘린다.",
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
          "tenant04:a:d-2:rule:0",
          "tenant04:a:d-2:evidence:0"
        ],
        "forbidAtomIds": [
          "tenant04:a:d-2:emotion:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:pressure:context",
      "coverageKey": "a:d-2:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:opened",
        "d-2:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "tenant04:beat_v2:b:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "상대도 전세대출을 알아볼 정도였으면 기본 서류가 더 필요하다는 건 짐작할 수 있었을 겁니다.",
      "behaviorHint": "처음엔 말하지 않았던 전제조건을 뒤늦게 하나씩 붙인다. '문서가 없잖아요'라는 식으로 서류 단계를 다시 세운다.",
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
          "shaken"
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
          "tenant04:b:d-2:responsibility:0",
          "tenant04:b:d-2:admission:0"
        ],
        "forbidAtomIds": [
          "tenant04:b:d-2:admission:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:pressure:responsibility",
      "coverageKey": "b:d-2:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-2:motive:opened"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-2:surface:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:b:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "공동명의 서명과 대출 비용은 원래 당연한 전제였고, 굳이 숨긴 사안은 아닙니다.",
      "behaviorHint": "'문서가 없잖아요'라는 식으로 서류 단계를 다시 세운다. 금액과 날짜를 다시 읊으며 대화를 수치 문제로 재설정한다.",
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
          "tenant04:b:d-2:denial:0",
          "tenant04:b:d-2:admission:0"
        ],
        "forbidAtomIds": [
          "tenant04:b:d-2:fear:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:context",
      "coverageKey": "b:d-2:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:opened",
        "d-2:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "tenant04:beat_v2:a:d-3:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "저 혼자 멈춘 건 맞지만, 상대가 월세를 계속 내라고 분명히 선을 긋지도 않았습니다.",
      "behaviorHint": "과거 메시지를 연달아 보여주며 답을 길게 늘린다. '느낌상', '거의' 같은 단서를 붙이며 기억의 책임을 흐린다.",
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
          "shaken"
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
          "tenant04:a:d-3:responsibility:0",
          "tenant04:a:d-3:admission:0"
        ],
        "forbidAtomIds": [
          "tenant04:a:d-3:admission:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:pressure:responsibility",
      "coverageKey": "a:d-3:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-3:motive:opened"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-3:surface:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:a:d-3:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "저는 월세를 끊은 게 아니라, 다음 달부터는 전환금으로 넘어가는 줄 알고 보류한 거였습니다.",
      "behaviorHint": "'느낌상', '거의' 같은 단서를 붙이며 기억의 책임을 흐린다. 과거 메시지를 연달아 보여주며 답을 길게 늘린다.",
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
          "tenant04:a:d-3:denial:0",
          "tenant04:a:d-3:admission:0"
        ],
        "forbidAtomIds": [
          "tenant04:a:d-3:shame:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:pressure:timeline",
      "coverageKey": "a:d-3:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-3:surface:opened",
        "d-3:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "tenant04:beat_v2:b:d-3:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "다은 씨가 먼저 월세를 멈추지만 않았어도 제가 다른 정산을 바로 꺼낼 일은 없었습니다.",
      "behaviorHint": "처음엔 말하지 않았던 전제조건을 뒤늦게 하나씩 붙인다. '문서가 없잖아요'라는 식으로 서류 단계를 다시 세운다.",
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
          "shaken"
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
          "tenant04:b:d-3:responsibility:0",
          "tenant04:b:d-3:evidence:0"
        ],
        "forbidAtomIds": [
          "tenant04:b:d-3:admission:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:pressure:responsibility",
      "coverageKey": "b:d-3:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-3:motive:opened"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-3:surface:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:b:d-3:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "월세는 기존 계약대로 계속 들어와야 했고, 저는 멈추라는 동의를 한 적이 없습니다.",
      "behaviorHint": "'문서가 없잖아요'라는 식으로 서류 단계를 다시 세운다. 금액과 날짜를 다시 읊으며 대화를 수치 문제로 재설정한다.",
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
          "tenant04:b:d-3:rule:0",
          "tenant04:b:d-3:evidence:0"
        ],
        "forbidAtomIds": [
          "tenant04:b:d-3:emotion:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:pressure:timeline",
      "coverageKey": "b:d-3:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-3:surface:opened",
        "d-3:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "tenant04:beat_v2:a:d-4:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "제가 월세를 잘못 멈춘 건 별개로, 그걸 이유로 바로 다른 사람을 들이기 전에 제게 먼저 정리했어야 했습니다.",
      "behaviorHint": "과거 메시지를 연달아 보여주며 답을 길게 늘린다. '느낌상', '거의' 같은 단서를 붙이며 기억의 책임을 흐린다.",
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
          "shaken"
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
          "tenant04:a:d-4:responsibility:0",
          "tenant04:a:d-4:evidence:0"
        ],
        "forbidAtomIds": [
          "tenant04:a:d-4:admission:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:pressure:responsibility",
      "coverageKey": "a:d-4:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-4:motive:opened"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-4:surface:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:a:d-4:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "저는 협의가 아직 살아 있다고 믿는 상태에서 갑자기 다른 사람에게 집을 보여준 걸 알았습니다.",
      "behaviorHint": "'느낌상', '거의' 같은 단서를 붙이며 기억의 책임을 흐린다. 과거 메시지를 연달아 보여주며 답을 길게 늘린다.",
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
          "tenant04:a:d-4:act:0",
          "tenant04:a:d-4:evidence:0"
        ],
        "forbidAtomIds": [
          "tenant04:a:d-4:emotion:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:pressure:timeline",
      "coverageKey": "a:d-4:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-4:surface:opened",
        "d-4:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "tenant04:beat_v2:b:d-4:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "다만 다은 씨가 월세를 멈춘 상황에서 제가 공실을 비워 둘 수는 없었습니다.",
      "behaviorHint": "처음엔 말하지 않았던 전제조건을 뒤늦게 하나씩 붙인다. '문서가 없잖아요'라는 식으로 서류 단계를 다시 세운다.",
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
          "shaken"
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
          "tenant04:b:d-4:responsibility:0",
          "tenant04:b:d-4:admission:0"
        ],
        "forbidAtomIds": [
          "tenant04:b:d-4:admission:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:motive:pressure:responsibility",
      "coverageKey": "b:d-4:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-4:motive:opened"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-4:surface:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:b:d-4:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "저는 이미 협의가 사실상 흐트러졌다고 봤고, 다른 임차인 일정을 잡는 건 당연한 수순이었습니다.",
      "behaviorHint": "'문서가 없잖아요'라는 식으로 서류 단계를 다시 세운다. 금액과 날짜를 다시 읊으며 대화를 수치 문제로 재설정한다.",
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
          "tenant04:b:d-4:denial:0",
          "tenant04:b:d-4:admission:0"
        ],
        "forbidAtomIds": [
          "tenant04:b:d-4:fear:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:surface:pressure:timeline",
      "coverageKey": "b:d-4:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-4:surface:opened",
        "d-4:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "tenant04:beat_v2:a:d-5:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "정산 기준을 처음부터 적어 줬다면 저도 이렇게 밀어붙이지 않았을 텐데, 그 기준이 비어 있었어요.",
      "behaviorHint": "과거 메시지를 연달아 보여주며 답을 길게 늘린다. '느낌상', '거의' 같은 단서를 붙이며 기억의 책임을 흐린다.",
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
          "shaken"
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
          "tenant04:a:d-5:responsibility:0",
          "tenant04:a:d-5:admission:0"
        ],
        "forbidAtomIds": [
          "tenant04:a:d-5:admission:1"
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
        "d-5:motive:opened"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-5:surface:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:a:d-5:surface:pressure:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "2천만원은 전세로 바꾸기 위해 넣은 돈이니 거의 그대로 돌아와야 한다고 생각했습니다.",
      "behaviorHint": "'느낌상', '거의' 같은 단서를 붙이며 기억의 책임을 흐린다. 과거 메시지를 연달아 보여주며 답을 길게 늘린다.",
      "applicableStates": [
        "S0",
        "S1"
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
          "tenant04:a:d-5:denial:0",
          "tenant04:a:d-5:admission:0"
        ],
        "forbidAtomIds": [
          "tenant04:a:d-5:shame:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:pressure:legality",
      "coverageKey": "a:d-5:surface:early:pressure:legality",
      "variantTarget": 6,
      "setFlags": [
        "d-5:surface:opened",
        "d-5:surface:legality_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "tenant04:beat_v2:b:d-5:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "다은 씨가 먼저 월세를 멈추고 확정처럼 움직인 부분은 정산에서 반영돼야 합니다.",
      "behaviorHint": "처음엔 말하지 않았던 전제조건을 뒤늦게 하나씩 붙인다. '문서가 없잖아요'라는 식으로 서류 단계를 다시 세운다.",
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
          "shaken"
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
          "tenant04:b:d-5:responsibility:0",
          "tenant04:b:d-5:admission:0"
        ],
        "forbidAtomIds": [
          "tenant04:b:d-5:admission:1"
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
        "d-5:motive:opened"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-5:surface:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:b:d-5:surface:pressure:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "2천만원은 협의가 틀어진 이상 그냥 돌려줄 성격의 돈이 아닙니다.",
      "behaviorHint": "'문서가 없잖아요'라는 식으로 서류 단계를 다시 세운다. 금액과 날짜를 다시 읊으며 대화를 수치 문제로 재설정한다.",
      "applicableStates": [
        "S0",
        "S1"
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
          "tenant04:b:d-5:denial:0",
          "tenant04:b:d-5:admission:0"
        ],
        "forbidAtomIds": [
          "tenant04:b:d-5:emotion:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:pressure:legality",
      "coverageKey": "b:d-5:surface:early:pressure:legality",
      "variantTarget": 6,
      "setFlags": [
        "d-5:surface:opened",
        "d-5:surface:legality_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "tenant04:beat_v2:a:d-2:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "자료를 같이 놓고 보면, 등기부와 상환예상서를 보고 나서야, 그게 실제로 전환 여부를 가르는 조건이었다는 걸 알았습니다.",
      "behaviorHint": "과거 메시지를 연달아 보여주며 답을 길게 늘린다. '느낌상', '거의' 같은 단서를 붙이며 기억의 책임을 흐린다.",
      "applicableStates": [
        "S2",
        "S3"
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
          "agitated",
          "shaken"
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
          "tenant04:a:d-2:evidence:0",
          "tenant04:a:d-2:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant04:a:d-2:admission:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:evidence:legality",
      "coverageKey": "a:d-2:surface:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:evidence_seen"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-2:surface:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:b:d-2:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "자료를 같이 놓고 보면, 등기와 상환예상서를 보면 아실 겁니다. 비용과 공동명의 문제를 제가 먼저 선명하게 말하지 않은 건 맞습니다.",
      "behaviorHint": "처음엔 말하지 않았던 전제조건을 뒤늦게 하나씩 붙인다. '문서가 없잖아요'라는 식으로 서류 단계를 다시 세운다.",
      "applicableStates": [
        "S2",
        "S3"
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
          "agitated",
          "shaken"
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
          "tenant04:b:d-2:admission:0",
          "tenant04:b:d-2:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant04:b:d-2:admission:1"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:evidence:legality",
      "coverageKey": "b:d-2:surface:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:evidence_seen"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-2:surface:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:a:d-3:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "자료를 같이 놓고 보면, 제가 한 달치를 안 낸 건 맞지만, 그때는 2천만원이 이미 들어갔고 전환이 이어진다고 믿었습니다.",
      "behaviorHint": "과거 메시지를 연달아 보여주며 답을 길게 늘린다. '느낌상', '거의' 같은 단서를 붙이며 기억의 책임을 흐린다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
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
          "shaken"
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
          "tenant04:a:d-3:admission:0",
          "tenant04:a:d-3:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant04:a:d-3:admission:1"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:evidence:context",
      "coverageKey": "a:d-3:surface:mid:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-3:surface:evidence_seen"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-3:surface:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:b:d-3:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "자료를 같이 놓고 보면, 2천만원이 들어온 건 사실이지만, 메모에는 '전환 준비금'만 적혀 있어 월세 대체 합의로 보긴 어렵습니다.",
      "behaviorHint": "처음엔 말하지 않았던 전제조건을 뒤늦게 하나씩 붙인다. '문서가 없잖아요'라는 식으로 서류 단계를 다시 세운다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
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
          "shaken"
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
          "tenant04:b:d-3:evidence:0",
          "tenant04:b:d-3:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant04:b:d-3:admission:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:evidence:context",
      "coverageKey": "b:d-3:surface:mid:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-3:surface:evidence_seen"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-3:surface:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:a:d-4:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "자료를 같이 놓고 보면, 카톡 문맥을 다시 봐도, 보여주기 전에 '이 협의는 끝났다'는 말은 없었습니다.",
      "behaviorHint": "과거 메시지를 연달아 보여주며 답을 길게 늘린다. '느낌상', '거의' 같은 단서를 붙이며 기억의 책임을 흐린다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
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
          "shaken"
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
          "tenant04:a:d-4:evidence:0",
          "tenant04:a:d-4:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant04:a:d-4:admission:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:evidence:context",
      "coverageKey": "a:d-4:surface:mid:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-4:surface:evidence_seen"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-4:surface:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:b:d-4:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "자료를 같이 놓고 보면, 카톡을 다시 보면 제가 직접 끝났다고 쓰진 않았습니다. 그 부분은 인정합니다.",
      "behaviorHint": "처음엔 말하지 않았던 전제조건을 뒤늦게 하나씩 붙인다. '문서가 없잖아요'라는 식으로 서류 단계를 다시 세운다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
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
          "shaken"
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
          "tenant04:b:d-4:admission:0",
          "tenant04:b:d-4:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant04:b:d-4:admission:1"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:surface:evidence:context",
      "coverageKey": "b:d-4:surface:mid:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-4:surface:evidence_seen"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-4:surface:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:a:d-5:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "자료를 같이 놓고 보면, 지금 보면 확정된 전세금 일부라고 단정하긴 어렵지만, 그렇다고 전액을 깎일 돈도 아니라고 생각합니다.",
      "behaviorHint": "과거 메시지를 연달아 보여주며 답을 길게 늘린다. '느낌상', '거의' 같은 단서를 붙이며 기억의 책임을 흐린다.",
      "applicableStates": [
        "S2",
        "S3"
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
          "agitated",
          "shaken"
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
          "tenant04:a:d-5:admission:0",
          "tenant04:a:d-5:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant04:a:d-5:admission:1"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:evidence:legality",
      "coverageKey": "a:d-5:surface:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-5:surface:evidence_seen"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-5:surface:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:b:d-5:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "자료를 같이 놓고 보면, 다만 메모를 보면 확정 전세금도 아니고, 그렇다고 위약금이라고 적힌 것도 아닙니다.",
      "behaviorHint": "처음엔 말하지 않았던 전제조건을 뒤늦게 하나씩 붙인다. '문서가 없잖아요'라는 식으로 서류 단계를 다시 세운다.",
      "applicableStates": [
        "S2",
        "S3"
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
          "agitated",
          "shaken"
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
          "tenant04:b:d-5:admission:0",
          "tenant04:b:d-5:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant04:b:d-5:admission:1"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:evidence:legality",
      "coverageKey": "b:d-5:surface:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-5:surface:evidence_seen"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-5:surface:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:b:d-2:motive:fatigue:responsibility:03",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "fatigue_counter",
      "line": "지금은 저만 몰아세우는 식으로 들려요. 공동명의 서명만 보지 말고 중도상환수수료도 같이 보셔야 해요.",
      "behaviorHint": "처음엔 말하지 않았던 전제조건을 뒤늦게 하나씩 붙인다. '문서가 없잖아요'라는 식으로 서류 단계를 다시 세운다. 같은 질문이 누적돼 방어 톤이 거칠어진다.",
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
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant04:b:d-2:responsibility:0",
          "tenant04:b:d-2:admission:0"
        ],
        "forbidAtomIds": [
          "tenant04:b:d-2:admission:1"
        ]
      },
      "weight": 5,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:fatigue:responsibility",
      "coverageKey": "b:d-2:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:fatigue_3"
      ],
      "tags": [
        "fatigue",
        "high_fatigue_counter"
      ],
      "requiresFlags": [
        "d-2:surface:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:b:d-2:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "fatigue_irritation",
      "line": "그 얘기는 아까도 말씀드렸어요. 등기와 상환예상서를 보면 아실 겁니다. 비용과 공동명의 문제를 제가 먼저 선명하게 말하지 않은 건 맞습니다. 이제 공동명의 서명만 계속 돌리시면 곤란해요.",
      "behaviorHint": "처음엔 말하지 않았던 전제조건을 뒤늦게 하나씩 붙인다. '문서가 없잖아요'라는 식으로 서류 단계를 다시 세운다. 같은 질문이 누적돼 방어 톤이 거칠어진다.",
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
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant04:b:d-2:responsibility:0",
          "tenant04:b:d-2:admission:0"
        ],
        "forbidAtomIds": [
          "tenant04:b:d-2:admission:1"
        ]
      },
      "weight": 5,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:fatigue:timeline",
      "coverageKey": "b:d-2:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:fatigue_1"
      ],
      "tags": [
        "fatigue",
        "turn2_irritation"
      ],
      "requiresFlags": [
        "d-2:surface:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:b:d-2:motive:fatigue:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "fatigue_block",
      "line": "같은 질문을 또 받으면 더는 할 말이 없습니다. 공동명의 서명하고 중도상환수수료부터 정리해 오셔야 해요.",
      "behaviorHint": "처음엔 말하지 않았던 전제조건을 뒤늦게 하나씩 붙인다. '문서가 없잖아요'라는 식으로 서류 단계를 다시 세운다. 같은 질문이 누적돼 방어 톤이 거칠어진다.",
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
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant04:b:d-2:responsibility:0",
          "tenant04:b:d-2:admission:0"
        ],
        "forbidAtomIds": [
          "tenant04:b:d-2:admission:1"
        ]
      },
      "weight": 5,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:fatigue:timeline",
      "coverageKey": "b:d-2:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:fatigue_2"
      ],
      "tags": [
        "fatigue",
        "turn3_block"
      ],
      "requiresFlags": [
        "d-2:surface:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:a:d-3:motive:fatigue:responsibility:03",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "fatigue_counter",
      "line": "지금은 저만 몰아세우는 식으로 들려요. 월세 한 달만 보지 말고 전환 준비금도 같이 보셔야 해요.",
      "behaviorHint": "과거 메시지를 연달아 보여주며 답을 길게 늘린다. '느낌상', '거의' 같은 단서를 붙이며 기억의 책임을 흐린다. 같은 질문이 누적돼 방어 톤이 거칠어진다.",
      "applicableStates": [
        "S2",
        "S3"
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
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant04:a:d-3:responsibility:0",
          "tenant04:a:d-3:admission:0"
        ],
        "forbidAtomIds": [
          "tenant04:a:d-3:admission:1"
        ]
      },
      "weight": 5,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:fatigue:responsibility",
      "coverageKey": "a:d-3:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-3:motive:fatigue_3"
      ],
      "tags": [
        "fatigue",
        "high_fatigue_counter"
      ],
      "requiresFlags": [
        "d-3:surface:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:a:d-3:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "fatigue_irritation",
      "line": "그 얘기는 아까도 말씀드렸어요. 제가 한 달치를 안 낸 건 맞지만, 그때는 2천만원이 이미 들어갔고 전환이 이어진다고 믿었습니다. 이제 월세 한 달만 계속 돌리시면 곤란해요.",
      "behaviorHint": "과거 메시지를 연달아 보여주며 답을 길게 늘린다. '느낌상', '거의' 같은 단서를 붙이며 기억의 책임을 흐린다. 같은 질문이 누적돼 방어 톤이 거칠어진다.",
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
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant04:a:d-3:responsibility:0",
          "tenant04:a:d-3:admission:0"
        ],
        "forbidAtomIds": [
          "tenant04:a:d-3:admission:1"
        ]
      },
      "weight": 5,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:fatigue:timeline",
      "coverageKey": "a:d-3:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-3:motive:fatigue_1"
      ],
      "tags": [
        "fatigue",
        "turn2_irritation"
      ],
      "requiresFlags": [
        "d-3:surface:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:a:d-3:motive:fatigue:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "fatigue_block",
      "line": "같은 질문을 또 받으면 더는 할 말이 없습니다. 월세 한 달하고 전환 준비금부터 정리해 오셔야 해요.",
      "behaviorHint": "과거 메시지를 연달아 보여주며 답을 길게 늘린다. '느낌상', '거의' 같은 단서를 붙이며 기억의 책임을 흐린다. 같은 질문이 누적돼 방어 톤이 거칠어진다.",
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
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant04:a:d-3:responsibility:0",
          "tenant04:a:d-3:admission:0"
        ],
        "forbidAtomIds": [
          "tenant04:a:d-3:admission:1"
        ]
      },
      "weight": 5,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:fatigue:timeline",
      "coverageKey": "a:d-3:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-3:motive:fatigue_2"
      ],
      "tags": [
        "fatigue",
        "turn3_block"
      ],
      "requiresFlags": [
        "d-3:surface:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:a:d-1:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "결혼 날짜와 대출 일정이 돌아가고 있어서, 저는 그 약속이 무너지면 다시 집을 잃는다고 느꼈습니다.",
      "behaviorHint": "잠깐 조용해졌다가 참아 온 서운함을 길게 쏟아낸다. 과거 메시지를 연달아 보여주며 답을 길게 늘린다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "emotion",
      "actionFamily": "free_question",
      "questionTypes": [
        "empathy_approach"
      ],
      "conditions": {
        "emotionTiers": [
          "shaken",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "frayed"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ],
        "misconceptionStates": [
          "M4"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant04:a:d-1:fear:0",
          "tenant04:a:d-1:admission:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:trap:emotion",
      "coverageKey": "a:d-1:core:late:trap:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:opened"
      ],
      "tags": [
        "red_herring"
      ],
      "requiresFlags": [
        "d-1:motive:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:b:d-1:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "저도 좋게 말하다가 선을 늦게 그었습니다. 괜히 말 한마디로 끌려다니는 집주인처럼 보일까 봐 더 딱 잘라 말하지 못했습니다.",
      "behaviorHint": "금액과 날짜를 다시 읊으며 대화를 수치 문제로 재설정한다. 처음엔 말하지 않았던 전제조건을 뒤늦게 하나씩 붙인다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "emotion",
      "actionFamily": "free_question",
      "questionTypes": [
        "empathy_approach"
      ],
      "conditions": {
        "emotionTiers": [
          "shaken",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "frayed"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ],
        "misconceptionStates": [
          "M4"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant04:b:d-1:fear:0",
          "tenant04:b:d-1:admission:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:trap:emotion",
      "coverageKey": "b:d-1:core:late:trap:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:opened"
      ],
      "tags": [
        "red_herring"
      ],
      "requiresFlags": [
        "d-1:motive:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:a:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "저는 결혼 준비 때문에 일정이 한 번 밀리면 집도, 대출도 다 무너질까 봐 더 배신처럼 느꼈습니다.",
      "behaviorHint": "잠깐 조용해졌다가 참아 온 서운함을 길게 쏟아낸다. 과거 메시지를 연달아 보여주며 답을 길게 늘린다.",
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
          "shaken",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "frayed"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant04:a:d-2:emotion:0",
          "tenant04:a:d-2:evidence:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:core:rapport:emotion",
      "coverageKey": "a:d-2:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-2:core:opened"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-2:motive:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:b:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "네, 공동명의 서명과 대출 비용은 전환의 핵심 조건이었고, 그걸 제가 초기에 충분히 공개하지 않았습니다.",
      "behaviorHint": "금액과 날짜를 다시 읊으며 대화를 수치 문제로 재설정한다. 처음엔 말하지 않았던 전제조건을 뒤늦게 하나씩 붙인다.",
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
          "shaken",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "frayed"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant04:b:d-2:admission:1",
          "tenant04:b:d-2:admission:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:core:rapport:emotion",
      "coverageKey": "b:d-2:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-2:core:opened"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-2:motive:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:a:d-3:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "네, 저는 추가 보증금이 들어간 뒤 한 달치 월세를 실제로 내지 않았습니다. 그 판단은 성급했습니다.",
      "behaviorHint": "잠깐 조용해졌다가 참아 온 서운함을 길게 쏟아낸다. 과거 메시지를 연달아 보여주며 답을 길게 늘린다.",
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
          "shaken",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "frayed"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant04:a:d-3:admission:1",
          "tenant04:a:d-3:admission:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:rapport:emotion",
      "coverageKey": "a:d-3:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-3:core:opened"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-3:motive:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:b:d-3:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "솔직히 월세가 끊긴 순간, 집주인인 제가 상황을 끌려다닌다는 느낌이 들어 더 강하게 원칙을 들이댔습니다.",
      "behaviorHint": "금액과 날짜를 다시 읊으며 대화를 수치 문제로 재설정한다. 처음엔 말하지 않았던 전제조건을 뒤늦게 하나씩 붙인다.",
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
          "shaken",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "frayed"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant04:b:d-3:emotion:0",
          "tenant04:b:d-3:evidence:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:rapport:emotion",
      "coverageKey": "b:d-3:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-3:core:opened"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-3:motive:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:a:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "저는 그때 '아, 나는 이미 밀려난 사람이구나'라는 느낌이 들어서 더 크게 무너졌습니다.",
      "behaviorHint": "잠깐 조용해졌다가 참아 온 서운함을 길게 쏟아낸다. 과거 메시지를 연달아 보여주며 답을 길게 늘린다.",
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
          "shaken",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "frayed"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant04:a:d-4:emotion:0",
          "tenant04:a:d-4:evidence:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:core:rapport:emotion",
      "coverageKey": "a:d-4:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-4:core:opened"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-4:motive:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:b:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "네, 저는 협의 결렬을 다은 씨에게 분명히 통지하기 전에 다른 예비 임차인에게 집을 보여줬습니다.",
      "behaviorHint": "금액과 날짜를 다시 읊으며 대화를 수치 문제로 재설정한다. 처음엔 말하지 않았던 전제조건을 뒤늦게 하나씩 붙인다.",
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
          "shaken",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "frayed"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant04:b:d-4:admission:1",
          "tenant04:b:d-4:admission:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:core:rapport:emotion",
      "coverageKey": "b:d-4:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-4:core:opened"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-4:motive:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:a:d-5:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "그 돈을 돌려달라고 바로 말하는 것도, 제가 월세를 안 낸 상태라 더 미안하고 창피했습니다.",
      "behaviorHint": "잠깐 조용해졌다가 참아 온 서운함을 길게 쏟아낸다. 과거 메시지를 연달아 보여주며 답을 길게 늘린다.",
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
          "shaken",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "frayed"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant04:a:d-5:shame:0",
          "tenant04:a:d-5:admission:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:motive:motive",
      "coverageKey": "a:d-5:core:late:motive:motive",
      "variantTarget": 2,
      "setFlags": [
        "d-5:core:opened"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-5:motive:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:b:d-5:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "그 돈을 바로 돌려주면 제 대출 정리와 공실 손해를 제가 전부 떠안는 셈이라, 솔직히 붙들고 싶었습니다.",
      "behaviorHint": "금액과 날짜를 다시 읊으며 대화를 수치 문제로 재설정한다. 처음엔 말하지 않았던 전제조건을 뒤늦게 하나씩 붙인다.",
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
          "shaken",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "frayed"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant04:b:d-5:emotion:0",
          "tenant04:b:d-5:admission:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:motive:motive",
      "coverageKey": "b:d-5:core:late:motive:motive",
      "variantTarget": 2,
      "setFlags": [
        "d-5:core:opened"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-5:motive:opened"
      ]
    },
    {
      "id": "tenant04:beat_v2:a:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interjection",
      "line": "그렇게 몰아가시면 저도 더 흔들려요. 거의 됐다 얘기부터 차근히 봐 주세요.",
      "behaviorHint": "과거 메시지를 연달아 보여주며 답을 길게 늘린다. '느낌상', '거의' 같은 단서를 붙이며 기억의 책임을 흐린다. 말이 먼저 튀어나오듯 끼어든다.",
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
        "emotionTiers": [
          "agitated",
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
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
          "tenant04:a:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant04:a:d-1:admission:1"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-1:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 2,
      "setFlags": [],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "tenant04:beat_v2:a:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interjection",
      "line": "지금 다들 거의 됐다만 붙잡고 계신데, 그 해석이 더 큰 오해일 수 있어요.",
      "behaviorHint": "과거 메시지를 연달아 보여주며 답을 길게 늘린다. '느낌상', '거의' 같은 단서를 붙이며 기억의 책임을 흐린다. 오해가 커지는 순간 급히 끼어든다.",
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
        "emotionTiers": [
          "agitated",
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ],
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
          "tenant04:a:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant04:a:d-1:admission:1"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-1:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 2,
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
      "id": "tenant04:beat_v2:a:d-1:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interjection",
      "line": "숫자와 시각이 다 적혀 있는데 뭉뚱그리면 안 됩니다. 거의 됐다하고 가자는 방향부터 나눠 주세요.",
      "behaviorHint": "과거 메시지를 연달아 보여주며 답을 길게 늘린다. '느낌상', '거의' 같은 단서를 붙이며 기억의 책임을 흐린다. 구체 숫자와 순서를 끌어와 즉시 반박한다.",
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
        "emotionTiers": [
          "agitated",
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
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
          "tenant04:a:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant04:a:d-1:admission:1"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-1:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 2,
      "setFlags": [],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "tenant04:beat_v2:a:d-1:surface:mid:interjection:block:04",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interjection",
      "line": "그 오해를 사실처럼 밀어붙이면 핵심이 흐려집니다. 거의 됐다을 확정처럼 말하지 마세요.",
      "behaviorHint": "과거 메시지를 연달아 보여주며 답을 길게 늘린다. '느낌상', '거의' 같은 단서를 붙이며 기억의 책임을 흐린다. 오해가 커지는 순간 급히 끼어든다.",
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
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ],
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
          "tenant04:a:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant04:a:d-1:admission:1"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-1:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 2,
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
      "id": "tenant04:beat_v2:b:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interjection",
      "line": "정확히는 거의 됐다하고 가자는 방향가 다릅니다. 그 순서부터 바로잡아야 해요.",
      "behaviorHint": "처음엔 말하지 않았던 전제조건을 뒤늦게 하나씩 붙인다. '문서가 없잖아요'라는 식으로 서류 단계를 다시 세운다. 구체 숫자와 순서를 끌어와 즉시 반박한다.",
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
        "emotionTiers": [
          "agitated",
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
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
          "tenant04:b:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant04:b:d-1:admission:1"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-1:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 2,
      "setFlags": [],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "tenant04:beat_v2:b:d-1:surface:mid:interjection:allow:03",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interjection",
      "line": "지금 다들 거의 됐다만 붙잡고 계신데, 그 해석이 더 큰 오해일 수 있어요.",
      "behaviorHint": "처음엔 말하지 않았던 전제조건을 뒤늦게 하나씩 붙인다. '문서가 없잖아요'라는 식으로 서류 단계를 다시 세운다. 오해가 커지는 순간 급히 끼어든다.",
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
        "emotionTiers": [
          "agitated",
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ],
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
          "tenant04:b:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant04:b:d-1:admission:1"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-1:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 2,
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
      "id": "tenant04:beat_v2:b:d-1:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interjection",
      "line": "지금 그 말은 감정만 키워요. 거의 됐다부터 분리해서 말해 주세요.",
      "behaviorHint": "처음엔 말하지 않았던 전제조건을 뒤늦게 하나씩 붙인다. '문서가 없잖아요'라는 식으로 서류 단계를 다시 세운다. 말이 먼저 튀어나오듯 끼어든다.",
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
        "emotionTiers": [
          "agitated",
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
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
          "tenant04:b:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant04:b:d-1:admission:1"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-1:surface:mid:interjection:emotional_only:block",
      "variantTarget": 2,
      "setFlags": [],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "tenant04:beat_v2:b:d-1:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interjection",
      "line": "그 오해를 사실처럼 밀어붙이면 핵심이 흐려집니다. 거의 됐다을 확정처럼 말하지 마세요.",
      "behaviorHint": "처음엔 말하지 않았던 전제조건을 뒤늦게 하나씩 붙인다. '문서가 없잖아요'라는 식으로 서류 단계를 다시 세운다. 오해가 커지는 순간 급히 끼어든다.",
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
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ],
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
          "tenant04:b:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant04:b:d-1:admission:1"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-1:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 2,
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
      "id": "tenant04:beat_v2:a:d-5:surface:mid:interjection:allow:03",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "interjection",
      "line": "그렇게 몰아가시면 저도 더 흔들려요. 2천만원 얘기부터 차근히 봐 주세요.",
      "behaviorHint": "과거 메시지를 연달아 보여주며 답을 길게 늘린다. '느낌상', '거의' 같은 단서를 붙이며 기억의 책임을 흐린다. 말이 먼저 튀어나오듯 끼어든다.",
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
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
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
          "tenant04:a:d-5:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant04:a:d-5:admission:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-5:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 2,
      "setFlags": [],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "tenant04:beat_v2:a:d-5:surface:mid:interjection:block:04",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "interjection",
      "line": "숫자와 시각이 다 적혀 있는데 뭉뚱그리면 안 됩니다. 2천만원하고 전환 준비금부터 나눠 주세요.",
      "behaviorHint": "과거 메시지를 연달아 보여주며 답을 길게 늘린다. '느낌상', '거의' 같은 단서를 붙이며 기억의 책임을 흐린다. 구체 숫자와 순서를 끌어와 즉시 반박한다.",
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
        "emotionTiers": [
          "agitated",
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
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
          "tenant04:a:d-5:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant04:a:d-5:admission:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-5:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 2,
      "setFlags": [],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "tenant04:beat_v2:b:d-5:surface:mid:interjection:allow:03",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "interjection",
      "line": "정확히는 2천만원하고 전환 준비금가 다릅니다. 그 순서부터 바로잡아야 해요.",
      "behaviorHint": "처음엔 말하지 않았던 전제조건을 뒤늦게 하나씩 붙인다. '문서가 없잖아요'라는 식으로 서류 단계를 다시 세운다. 구체 숫자와 순서를 끌어와 즉시 반박한다.",
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
        "emotionTiers": [
          "agitated",
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
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
          "tenant04:b:d-5:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant04:b:d-5:admission:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-5:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 2,
      "setFlags": [],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "tenant04:beat_v2:b:d-5:surface:mid:interjection:block:04",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "interjection",
      "line": "지금 그 말은 감정만 키워요. 2천만원부터 분리해서 말해 주세요.",
      "behaviorHint": "처음엔 말하지 않았던 전제조건을 뒤늦게 하나씩 붙인다. '문서가 없잖아요'라는 식으로 서류 단계를 다시 세운다. 말이 먼저 튀어나오듯 끼어든다.",
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
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
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
          "tenant04:b:d-5:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant04:b:d-5:admission:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-5:surface:mid:interjection:emotional_only:block",
      "variantTarget": 2,
      "setFlags": [],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    }
  ]
} as const;

export default tenant04BeatsV2Full;
