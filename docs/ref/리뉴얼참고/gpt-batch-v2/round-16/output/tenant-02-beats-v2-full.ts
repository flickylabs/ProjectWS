export const tenant02BeatsV2Full = {
  "caseId": "tenant-02",
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
      "core_truth": 30,
      "sub_truth": 16,
      "red_herring": 12
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
      "id": "tenant02:beat_v2:a:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "누수가 급했어도 제가 거절한 뒤 먼저 들어온 건 별개 문제입니다.",
      "behaviorHint": "유리한 캡처를 먼저 내밀며 상대 말을 끊을 타이밍을 노린다. 질문 끝을 기다리지 못하고 톤이 한 단계씩 올라간다.",
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
          "tenant02:a:d-1:act:6",
          "tenant02:a:d-1:privacy:7"
        ],
        "forbidAtomIds": [
          "tenant02:a:d-1:act:10"
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
        "d-1:motive:opened"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-1:surface:opened"
      ]
    },
    {
      "id": "tenant02:beat_v2:a:d-1:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "저는 그때 이미 합의 전 출입이 있었다고 봤습니다. 안 된다고 한 날 이후 집 안 흔적이 바뀌었거든요.",
      "behaviorHint": "유리한 캡처를 먼저 내밀며 상대 말을 끊을 타이밍을 노린다. '안 된다고 했다'는 취지의 문장을 여러 번 반복한다.",
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
          "tenant02:a:d-1:privacy:1",
          "tenant02:a:d-1:act:4"
        ],
        "forbidAtomIds": [
          "tenant02:a:d-1:act:8"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:identity",
      "coverageKey": "a:d-1:surface:early:pressure:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:opened",
        "d-1:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "tenant02:beat_v2:b:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "예전 말 한마디를 제가 넓게 받아들인 건 있을 수 있습니다. 그래도 누수 번짐이 무서워 선확인을 택했습니다.",
      "behaviorHint": "'협조만 했어도'라는 말을 되돌리며 책임을 다시 넘긴다. 그동안 자신이 처리한 민원과 일정을 길게 열거한다.",
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
          "tenant02:b:d-1:act:6",
          "tenant02:b:d-1:fear:7"
        ],
        "forbidAtomIds": [
          "tenant02:b:d-1:act:10"
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
        "d-1:motive:opened"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-1:surface:opened"
      ]
    },
    {
      "id": "tenant02:beat_v2:b:d-1:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "그건 무단 출입이 아니라 누수 확인이었습니다.",
      "behaviorHint": "그동안 자신이 처리한 민원과 일정을 길게 열거한다. '협조만 했어도'라는 말을 되돌리며 책임을 다시 넘긴다.",
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
          "tenant02:b:d-1:fear:1",
          "tenant02:b:d-1:act:4"
        ],
        "forbidAtomIds": [
          "tenant02:b:d-1:act:8"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:identity",
      "coverageKey": "b:d-1:surface:early:pressure:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:opened",
        "d-1:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "tenant02:beat_v2:a:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "누수가 먼저였더라도 제 쪽 대응이 사태를 편하게 만들진 못했습니다.",
      "behaviorHint": "유리한 캡처를 먼저 내밀며 상대 말을 끊을 타이밍을 노린다. 질문 끝을 기다리지 못하고 톤이 한 단계씩 올라간다.",
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
          "tenant02:a:d-2:context:6",
          "tenant02:a:d-2:fear:7"
        ],
        "forbidAtomIds": [
          "tenant02:a:d-2:context:10"
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
      "id": "tenant02:beat_v2:a:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "곰팡이는 건물 쪽 누수 때문이지 제 생활 습관 때문이 아닙니다.",
      "behaviorHint": "유리한 캡처를 먼저 내밀며 상대 말을 끊을 타이밍을 노린다. '안 된다고 했다'는 취지의 문장을 여러 번 반복한다.",
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
          "tenant02:a:d-2:context:0",
          "tenant02:a:d-2:fear:1"
        ],
        "forbidAtomIds": [
          "tenant02:a:d-2:context:8"
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
      "id": "tenant02:beat_v2:b:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "1차 원인은 배관 누수였고, 세입자 짐 적치와 지연은 악화 요인 정도로 보입니다.",
      "behaviorHint": "'협조만 했어도'라는 말을 되돌리며 책임을 다시 넘긴다. 그동안 자신이 처리한 민원과 일정을 길게 열거한다.",
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
          "tenant02:b:d-2:context:6",
          "tenant02:b:d-2:responsibility:7"
        ],
        "forbidAtomIds": [
          "tenant02:b:d-2:context:10"
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
      "id": "tenant02:beat_v2:b:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "곰팡이는 환기 안 하고 짐을 쌓아 둔 탓이 컸습니다.",
      "behaviorHint": "그동안 자신이 처리한 민원과 일정을 길게 열거한다. '협조만 했어도'라는 말을 되돌리며 책임을 다시 넘긴다.",
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
          "tenant02:b:d-2:context:0",
          "tenant02:b:d-2:responsibility:1"
        ],
        "forbidAtomIds": [
          "tenant02:b:d-2:context:8"
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
      "id": "tenant02:beat_v2:a:d-3:motive:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "예약금 흐름까지 보면 사진이 먼저 있고 합의된 날은 나중 설명처럼 붙었습니다.",
      "behaviorHint": "유리한 캡처를 먼저 내밀며 상대 말을 끊을 타이밍을 노린다. 질문 끝을 기다리지 못하고 톤이 한 단계씩 올라간다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "red_herring",
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
          "tenant02:a:d-3:evidence:6",
          "tenant02:a:d-3:emotion:7"
        ],
        "forbidAtomIds": [
          "tenant02:a:d-3:evidence:10"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:trap:context",
      "coverageKey": "a:d-3:motive:mid:trap:context",
      "variantTarget": 4,
      "setFlags": [
        "d-3:surface:evidence_seen"
      ],
      "tags": [
        "red_herring"
      ],
      "requiresFlags": [
        "d-3:surface:opened"
      ]
    },
    {
      "id": "tenant02:beat_v2:a:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "캡처에 보이는 날짜만으로 합의된 점검일 촬영이라고 믿기 어렵습니다.",
      "behaviorHint": "유리한 캡처를 먼저 내밀며 상대 말을 끊을 타이밍을 노린다. '안 된다고 했다'는 취지의 문장을 여러 번 반복한다.",
      "applicableStates": [
        "S0",
        "S1"
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
          "tenant02:a:d-3:emotion:3",
          "tenant02:a:d-3:evidence:4"
        ],
        "forbidAtomIds": [
          "tenant02:a:d-3:evidence:8"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:context",
      "coverageKey": "a:d-3:surface:early:trap:context",
      "variantTarget": 6,
      "setFlags": [
        "d-3:motive:opened"
      ],
      "tags": [
        "red_herring"
      ],
      "requiresFlags": [
        "d-3:surface:opened"
      ]
    },
    {
      "id": "tenant02:beat_v2:a:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "저 사진 날짜는 처음부터 너무 절묘해서 오히려 이상했습니다.",
      "behaviorHint": "유리한 캡처를 먼저 내밀며 상대 말을 끊을 타이밍을 노린다. '안 된다고 했다'는 취지의 문장을 여러 번 반복한다.",
      "applicableStates": [
        "S0",
        "S1"
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
          "tenant02:a:d-3:evidence:4",
          "tenant02:a:d-3:emotion:5"
        ],
        "forbidAtomIds": [
          "tenant02:a:d-3:evidence:8"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:identity",
      "coverageKey": "a:d-3:surface:early:trap:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-3:surface:opened",
        "d-3:surface:identity_pressed"
      ],
      "tags": [
        "red_herring"
      ]
    },
    {
      "id": "tenant02:beat_v2:b:d-3:motive:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "원본은 있었고 제출용 캡처를 따로 만든 것도 맞습니다. 보기 좋게 정리하려다 선을 넘었습니다.",
      "behaviorHint": "'협조만 했어도'라는 말을 되돌리며 책임을 다시 넘긴다. 그동안 자신이 처리한 민원과 일정을 길게 열거한다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "red_herring",
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
          "tenant02:b:d-3:evidence:6",
          "tenant02:b:d-3:shame:7"
        ],
        "forbidAtomIds": [
          "tenant02:b:d-3:evidence:10"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:trap:context",
      "coverageKey": "b:d-3:motive:mid:trap:context",
      "variantTarget": 4,
      "setFlags": [
        "d-3:surface:evidence_seen"
      ],
      "tags": [
        "red_herring"
      ],
      "requiresFlags": [
        "d-3:surface:opened"
      ]
    },
    {
      "id": "tenant02:beat_v2:b:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "원본 시간과 화면 표시가 다르게 보일 수는 있습니다.",
      "behaviorHint": "그동안 자신이 처리한 민원과 일정을 길게 열거한다. '협조만 했어도'라는 말을 되돌리며 책임을 다시 넘긴다.",
      "applicableStates": [
        "S0",
        "S1"
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
          "tenant02:b:d-3:shame:3",
          "tenant02:b:d-3:evidence:4"
        ],
        "forbidAtomIds": [
          "tenant02:b:d-3:evidence:8"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:context",
      "coverageKey": "b:d-3:surface:early:trap:context",
      "variantTarget": 6,
      "setFlags": [
        "d-3:motive:opened"
      ],
      "tags": [
        "red_herring"
      ],
      "requiresFlags": [
        "d-3:surface:opened"
      ]
    },
    {
      "id": "tenant02:beat_v2:b:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "사진 시각은 제가 바꾼 게 아닙니다. 보이는 화면 그대로 냈습니다.",
      "behaviorHint": "그동안 자신이 처리한 민원과 일정을 길게 열거한다. '협조만 했어도'라는 말을 되돌리며 책임을 다시 넘긴다.",
      "applicableStates": [
        "S0",
        "S1"
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
          "tenant02:b:d-3:evidence:4",
          "tenant02:b:d-3:shame:5"
        ],
        "forbidAtomIds": [
          "tenant02:b:d-3:evidence:8"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:identity",
      "coverageKey": "b:d-3:surface:early:trap:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-3:surface:opened",
        "d-3:surface:identity_pressed"
      ],
      "tags": [
        "red_herring"
      ]
    },
    {
      "id": "tenant02:beat_v2:a:d-4:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "일정을 민 건 맞지만, 먼저 선을 넘은 쪽이 있었으니 제가 겁먹은 겁니다.",
      "behaviorHint": "유리한 캡처를 먼저 내밀며 상대 말을 끊을 타이밍을 노린다. 질문 끝을 기다리지 못하고 톤이 한 단계씩 올라간다.",
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
          "tenant02:a:d-4:act:6",
          "tenant02:a:d-4:responsibility:7"
        ],
        "forbidAtomIds": [
          "tenant02:a:d-4:act:10"
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
      "id": "tenant02:beat_v2:a:d-4:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "제가 수리를 막았다는 건 왜곡입니다. 확인 없는 방문을 거절했을 뿐입니다.",
      "behaviorHint": "유리한 캡처를 먼저 내밀며 상대 말을 끊을 타이밍을 노린다. '안 된다고 했다'는 취지의 문장을 여러 번 반복한다.",
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
          "tenant02:a:d-4:responsibility:1",
          "tenant02:a:d-4:act:4"
        ],
        "forbidAtomIds": [
          "tenant02:a:d-4:act:8"
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
      "id": "tenant02:beat_v2:b:d-4:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "지연은 세입자 쪽이 직접 만들었지만, 그 불신을 키운 배경에는 제 행동도 있었습니다.",
      "behaviorHint": "'협조만 했어도'라는 말을 되돌리며 책임을 다시 넘긴다. 그동안 자신이 처리한 민원과 일정을 길게 열거한다.",
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
          "tenant02:b:d-4:act:6",
          "tenant02:b:d-4:act:4"
        ],
        "forbidAtomIds": [
          "tenant02:b:d-4:act:10"
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
      "id": "tenant02:beat_v2:b:d-4:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "민석 씨가 이틀 동안 기사 방문을 막아 일정이 밀렸습니다.",
      "behaviorHint": "그동안 자신이 처리한 민원과 일정을 길게 열거한다. '협조만 했어도'라는 말을 되돌리며 책임을 다시 넘긴다.",
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
          "tenant02:b:d-4:act:4",
          "tenant02:b:d-4:counter:5"
        ],
        "forbidAtomIds": [
          "tenant02:b:d-4:act:8"
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
      "id": "tenant02:beat_v2:a:d-5:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "저도 한 번의 급한 확인 여지는 압니다. 하지만 그래서 무단 촬영까지 받아들일 수는 없었습니다.",
      "behaviorHint": "유리한 캡처를 먼저 내밀며 상대 말을 끊을 타이밍을 노린다. 질문 끝을 기다리지 못하고 톤이 한 단계씩 올라간다.",
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
          "tenant02:a:d-5:rule:6",
          "tenant02:a:d-5:privacy:7"
        ],
        "forbidAtomIds": [
          "tenant02:a:d-5:rule:10"
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
      "id": "tenant02:beat_v2:a:d-5:surface:pressure:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "그 조항은 긴급 상황이어도 제 확인 없는 출입을 열어 준다고 보지 않았습니다.",
      "behaviorHint": "유리한 캡처를 먼저 내밀며 상대 말을 끊을 타이밍을 노린다. '안 된다고 했다'는 취지의 문장을 여러 번 반복한다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
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
          "tenant02:a:d-5:rule:0",
          "tenant02:a:d-5:rule:4"
        ],
        "forbidAtomIds": [
          "tenant02:a:d-5:rule:8"
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
      "id": "tenant02:beat_v2:b:d-5:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "지금 보니 제가 그 조항을 넓게 붙잡고 있었던 건 맞습니다. 그래도 급박함이 있었습니다.",
      "behaviorHint": "'협조만 했어도'라는 말을 되돌리며 책임을 다시 넘긴다. 그동안 자신이 처리한 민원과 일정을 길게 열거한다.",
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
          "tenant02:b:d-5:rule:6",
          "tenant02:b:d-5:rule:4"
        ],
        "forbidAtomIds": [
          "tenant02:b:d-5:rule:10"
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
      "id": "tenant02:beat_v2:b:d-5:surface:pressure:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "긴급 하자 조항이면 먼저 들어가 확인하고 기록할 수 있다고 봤습니다.",
      "behaviorHint": "그동안 자신이 처리한 민원과 일정을 길게 열거한다. '협조만 했어도'라는 말을 되돌리며 책임을 다시 넘긴다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
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
          "tenant02:b:d-5:rule:0",
          "tenant02:b:d-5:self_justification:1"
        ],
        "forbidAtomIds": [
          "tenant02:b:d-5:rule:8"
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
      "id": "tenant02:beat_v2:a:d-1:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "카톡 시각과 사진 흐름을 보면 합의된 날보다 먼저 들어온 정황이 선명합니다.",
      "behaviorHint": "유리한 캡처를 먼저 내밀며 상대 말을 끊을 타이밍을 노린다. 질문 끝을 기다리지 못하고 톤이 한 단계씩 올라간다.",
      "applicableStates": [
        "S2",
        "S3"
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
          "tenant02:a:d-1:act:4",
          "tenant02:a:d-1:privacy:5"
        ],
        "forbidAtomIds": [
          "tenant02:a:d-1:act:10"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:evidence:context",
      "coverageKey": "a:d-1:surface:mid:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-1:surface:evidence_seen"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-1:surface:opened"
      ]
    },
    {
      "id": "tenant02:beat_v2:b:d-1:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "자료를 같이 놓고 보면, 합의된 날보다 먼저 들어간 건 맞습니다. 하지만 상황이 급하다고 봤습니다.",
      "behaviorHint": "그동안 자신이 처리한 민원과 일정을 길게 열거한다. '협조만 했어도'라는 말을 되돌리며 책임을 다시 넘긴다.",
      "applicableStates": [
        "S2",
        "S3"
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
          "tenant02:b:d-1:act:4",
          "tenant02:b:d-1:fear:5"
        ],
        "forbidAtomIds": [
          "tenant02:b:d-1:act:10"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:evidence:context",
      "coverageKey": "b:d-1:surface:mid:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-1:surface:evidence_seen"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-1:surface:opened"
      ]
    },
    {
      "id": "tenant02:beat_v2:a:d-2:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "관리기록이 맞다면 배관 문제가 먼저였던 건 분명합니다.",
      "behaviorHint": "유리한 캡처를 먼저 내밀며 상대 말을 끊을 타이밍을 노린다. 질문 끝을 기다리지 못하고 톤이 한 단계씩 올라간다.",
      "applicableStates": [
        "S2",
        "S3"
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
          "tenant02:a:d-2:context:4",
          "tenant02:a:d-2:fear:5"
        ],
        "forbidAtomIds": [
          "tenant02:a:d-2:context:10"
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
      "id": "tenant02:beat_v2:b:d-2:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "관리기록을 보니 배관 쪽 흔적이 먼저 있었던 건 인정해야겠군요.",
      "behaviorHint": "그동안 자신이 처리한 민원과 일정을 길게 열거한다. '협조만 했어도'라는 말을 되돌리며 책임을 다시 넘긴다.",
      "applicableStates": [
        "S2",
        "S3"
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
          "tenant02:b:d-2:context:4",
          "tenant02:b:d-2:responsibility:5"
        ],
        "forbidAtomIds": [
          "tenant02:b:d-2:context:10"
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
      "id": "tenant02:beat_v2:a:d-4:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "자료를 같이 놓고 보면, 네, 그 이틀은 제가 기사 방문을 끊었습니다.",
      "behaviorHint": "유리한 캡처를 먼저 내밀며 상대 말을 끊을 타이밍을 노린다. 질문 끝을 기다리지 못하고 톤이 한 단계씩 올라간다.",
      "applicableStates": [
        "S2",
        "S3"
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
          "tenant02:a:d-4:act:4",
          "tenant02:a:d-4:responsibility:5"
        ],
        "forbidAtomIds": [
          "tenant02:a:d-4:act:10"
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
      "id": "tenant02:beat_v2:b:d-4:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "자료를 같이 놓고 보면, 실제로는 무단 출입 의심이 커진 뒤 거절이 굳어진 것으로 보입니다.",
      "behaviorHint": "그동안 자신이 처리한 민원과 일정을 길게 열거한다. '협조만 했어도'라는 말을 되돌리며 책임을 다시 넘긴다.",
      "applicableStates": [
        "S2",
        "S3"
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
          "tenant02:b:d-4:act:4",
          "tenant02:b:d-4:counter:5"
        ],
        "forbidAtomIds": [
          "tenant02:b:d-4:act:10"
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
      "id": "tenant02:beat_v2:a:d-5:surface:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "자료를 같이 놓고 보면, 특약상 1회 긴급 확인은 열려 있어도, 즉시 통지와 보관 고지는 별개입니다.",
      "behaviorHint": "유리한 캡처를 먼저 내밀며 상대 말을 끊을 타이밍을 노린다. 질문 끝을 기다리지 못하고 톤이 한 단계씩 올라간다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "evidence_response",
      "angleTag": "identity",
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
          "tenant02:a:d-5:rule:4",
          "tenant02:a:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "tenant02:a:d-5:rule:10"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:evidence:identity",
      "coverageKey": "a:d-5:surface:mid:evidence:identity",
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
      "id": "tenant02:beat_v2:b:d-5:surface:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "자료를 같이 놓고 보면, 무제한 면책은 아니어도 긴급 확인과 촬영은 함께 갈 수 있다고 생각했습니다.",
      "behaviorHint": "그동안 자신이 처리한 민원과 일정을 길게 열거한다. '협조만 했어도'라는 말을 되돌리며 책임을 다시 넘긴다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "evidence_response",
      "angleTag": "identity",
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
          "tenant02:b:d-5:rule:4",
          "tenant02:b:d-5:self_justification:5"
        ],
        "forbidAtomIds": [
          "tenant02:b:d-5:rule:10"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:evidence:identity",
      "coverageKey": "b:d-5:surface:mid:evidence:identity",
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
      "id": "tenant02:beat_v2:b:d-1:motive:fatigue:responsibility:03",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "fatigue_counter",
      "line": "지금은 저만 몰아세우는 식으로 들려요. 마스터키만 보지 말고 합의 전 출입도 같이 보셔야 해요.",
      "behaviorHint": "'협조만 했어도'라는 말을 되돌리며 책임을 다시 넘긴다. 그동안 자신이 처리한 민원과 일정을 길게 열거한다. 같은 질문이 누적돼 방어 톤이 거칠어진다.",
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
          "tenant02:b:d-1:act:6",
          "tenant02:b:d-1:fear:7"
        ],
        "forbidAtomIds": [
          "tenant02:b:d-1:act:10"
        ]
      },
      "weight": 5,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:fatigue:responsibility",
      "coverageKey": "b:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:fatigue_3"
      ],
      "tags": [
        "fatigue",
        "high_fatigue_counter"
      ],
      "requiresFlags": [
        "d-1:surface:opened"
      ]
    },
    {
      "id": "tenant02:beat_v2:b:d-1:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "fatigue_irritation",
      "line": "그 얘기는 아까도 말씀드렸어요. 합의된 날보다 먼저 들어간 건 맞습니다. 하지만 상황이 급하다고 봤습니다. 이제 마스터키만 계속 돌리시면 곤란해요.",
      "behaviorHint": "'협조만 했어도'라는 말을 되돌리며 책임을 다시 넘긴다. 그동안 자신이 처리한 민원과 일정을 길게 열거한다. 같은 질문이 누적돼 방어 톤이 거칠어진다.",
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
          "tenant02:b:d-1:act:6",
          "tenant02:b:d-1:fear:7"
        ],
        "forbidAtomIds": [
          "tenant02:b:d-1:act:10"
        ]
      },
      "weight": 5,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:fatigue:timeline",
      "coverageKey": "b:d-1:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:fatigue_1"
      ],
      "tags": [
        "fatigue",
        "turn2_irritation"
      ],
      "requiresFlags": [
        "d-1:surface:opened"
      ]
    },
    {
      "id": "tenant02:beat_v2:b:d-1:motive:fatigue:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "fatigue_block",
      "line": "같은 질문을 또 받으면 더는 할 말이 없습니다. 마스터키하고 합의 전 출입부터 정리해 오셔야 해요.",
      "behaviorHint": "'협조만 했어도'라는 말을 되돌리며 책임을 다시 넘긴다. 그동안 자신이 처리한 민원과 일정을 길게 열거한다. 같은 질문이 누적돼 방어 톤이 거칠어진다.",
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
          "tenant02:b:d-1:act:6",
          "tenant02:b:d-1:fear:7"
        ],
        "forbidAtomIds": [
          "tenant02:b:d-1:act:10"
        ]
      },
      "weight": 5,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:fatigue:timeline",
      "coverageKey": "b:d-1:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:fatigue_2"
      ],
      "tags": [
        "fatigue",
        "turn3_block"
      ],
      "requiresFlags": [
        "d-1:surface:opened"
      ]
    },
    {
      "id": "tenant02:beat_v2:a:d-4:motive:fatigue:responsibility:03",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "fatigue_counter",
      "line": "지금은 저만 몰아세우는 식으로 들려요. 이틀 거부만 보지 말고 수리기사도 같이 보셔야 해요.",
      "behaviorHint": "유리한 캡처를 먼저 내밀며 상대 말을 끊을 타이밍을 노린다. 질문 끝을 기다리지 못하고 톤이 한 단계씩 올라간다. 같은 질문이 누적돼 방어 톤이 거칠어진다.",
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
          "tenant02:a:d-4:act:6",
          "tenant02:a:d-4:responsibility:7"
        ],
        "forbidAtomIds": [
          "tenant02:a:d-4:act:10"
        ]
      },
      "weight": 5,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:fatigue:responsibility",
      "coverageKey": "a:d-4:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-4:motive:fatigue_3"
      ],
      "tags": [
        "fatigue",
        "high_fatigue_counter"
      ],
      "requiresFlags": [
        "d-4:surface:opened"
      ]
    },
    {
      "id": "tenant02:beat_v2:a:d-4:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "fatigue_irritation",
      "line": "그 얘기는 아까도 말씀드렸어요. 네, 그 이틀은 제가 기사 방문을 끊었습니다. 이제 이틀 거부만 계속 돌리시면 곤란해요.",
      "behaviorHint": "유리한 캡처를 먼저 내밀며 상대 말을 끊을 타이밍을 노린다. 질문 끝을 기다리지 못하고 톤이 한 단계씩 올라간다. 같은 질문이 누적돼 방어 톤이 거칠어진다.",
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
          "tenant02:a:d-4:act:6",
          "tenant02:a:d-4:responsibility:7"
        ],
        "forbidAtomIds": [
          "tenant02:a:d-4:act:10"
        ]
      },
      "weight": 5,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:fatigue:timeline",
      "coverageKey": "a:d-4:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-4:motive:fatigue_1"
      ],
      "tags": [
        "fatigue",
        "turn2_irritation"
      ],
      "requiresFlags": [
        "d-4:surface:opened"
      ]
    },
    {
      "id": "tenant02:beat_v2:a:d-4:motive:fatigue:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "fatigue_block",
      "line": "같은 질문을 또 받으면 더는 할 말이 없습니다. 이틀 거부하고 수리기사부터 정리해 오셔야 해요.",
      "behaviorHint": "유리한 캡처를 먼저 내밀며 상대 말을 끊을 타이밍을 노린다. 질문 끝을 기다리지 못하고 톤이 한 단계씩 올라간다. 같은 질문이 누적돼 방어 톤이 거칠어진다.",
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
          "tenant02:a:d-4:act:6",
          "tenant02:a:d-4:responsibility:7"
        ],
        "forbidAtomIds": [
          "tenant02:a:d-4:act:10"
        ]
      },
      "weight": 5,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:fatigue:timeline",
      "coverageKey": "a:d-4:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-4:motive:fatigue_2"
      ],
      "tags": [
        "fatigue",
        "turn3_block"
      ],
      "requiresFlags": [
        "d-4:surface:opened"
      ]
    },
    {
      "id": "tenant02:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "제 작업실 같은 집에 허락도 없이 들어온 순간부터 저는 사람을 못 믿게 됐습니다.",
      "behaviorHint": "질문 끝을 기다리지 못하고 톤이 한 단계씩 올라간다. '안 된다고 했다'는 취지의 문장을 여러 번 반복한다.",
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
          "tenant02:a:d-1:act:8",
          "tenant02:a:d-1:act:4"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:opened"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-1:motive:opened"
      ]
    },
    {
      "id": "tenant02:beat_v2:b:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "네, 저는 합의 전 먼저 들어가 사진을 찍었습니다. 급했다는 사정이 있어도 사전 동의 없는 출입이었습니다.",
      "behaviorHint": "말끝을 길게 늘이며 먼저 상처받은 사람처럼 들리게 한다. '협조만 했어도'라는 말을 되돌리며 책임을 다시 넘긴다.",
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
          "tenant02:b:d-1:act:10",
          "tenant02:b:d-1:fear:11"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:rapport:emotion",
      "coverageKey": "b:d-1:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:opened"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-1:motive:opened"
      ]
    },
    {
      "id": "tenant02:beat_v2:a:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "장비가 젖거나 파일이 날아갈까 봐 집 상태를 인정하는 말도 쉽게 못 했습니다.",
      "behaviorHint": "질문 끝을 기다리지 못하고 톤이 한 단계씩 올라간다. '안 된다고 했다'는 취지의 문장을 여러 번 반복한다.",
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
          "tenant02:a:d-2:context:8",
          "tenant02:a:d-2:fear:9"
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
      "id": "tenant02:beat_v2:b:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "1차 원인은 공용배관 연결부 누수였고, 세입자 쪽 적치와 지연은 악화 요인이었습니다.",
      "behaviorHint": "말끝을 길게 늘이며 먼저 상처받은 사람처럼 들리게 한다. '협조만 했어도'라는 말을 되돌리며 책임을 다시 넘긴다.",
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
          "tenant02:b:d-2:context:10",
          "tenant02:b:d-2:responsibility:11"
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
      "id": "tenant02:beat_v2:a:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "그 날짜 하나 때문에 제가 괜히 예민한 세입자처럼 보였다는 게 제일 화가 납니다.",
      "behaviorHint": "질문 끝을 기다리지 못하고 톤이 한 단계씩 올라간다. '안 된다고 했다'는 취지의 문장을 여러 번 반복한다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "red_herring",
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
          "tenant02:a:d-3:evidence:8",
          "tenant02:a:d-3:emotion:9"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:trap:emotion",
      "coverageKey": "a:d-3:core:late:trap:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-3:core:opened"
      ],
      "tags": [
        "red_herring"
      ],
      "requiresFlags": [
        "d-3:motive:opened"
      ]
    },
    {
      "id": "tenant02:beat_v2:b:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "그 날짜가 다르게 보인다고 해서 제가 다 거짓인 사람처럼 되는 게 제일 두려웠습니다.",
      "behaviorHint": "말끝을 길게 늘이며 먼저 상처받은 사람처럼 들리게 한다. '협조만 했어도'라는 말을 되돌리며 책임을 다시 넘긴다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "red_herring",
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
          "tenant02:b:d-3:evidence:8",
          "tenant02:b:d-3:shame:9"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:trap:emotion",
      "coverageKey": "b:d-3:core:late:trap:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-3:core:opened"
      ],
      "tags": [
        "red_herring"
      ],
      "requiresFlags": [
        "d-3:motive:opened"
      ]
    },
    {
      "id": "tenant02:beat_v2:a:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "무단 출입 의심이 계기였어도, 제가 이틀간 협조를 멈춰 일정이 밀린 건 인정합니다.",
      "behaviorHint": "질문 끝을 기다리지 못하고 톤이 한 단계씩 올라간다. '안 된다고 했다'는 취지의 문장을 여러 번 반복한다.",
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
          "tenant02:a:d-4:act:10",
          "tenant02:a:d-4:responsibility:11"
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
      "id": "tenant02:beat_v2:b:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "돈 넣고 기사 돌리고 다시 부른 입장에서 화가 컸습니다. 그래서 세입자 지연만 더 크게 말했습니다.",
      "behaviorHint": "말끝을 길게 늘이며 먼저 상처받은 사람처럼 들리게 한다. '협조만 했어도'라는 말을 되돌리며 책임을 다시 넘긴다.",
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
          "tenant02:b:d-4:act:8",
          "tenant02:b:d-4:act:4"
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
      "id": "tenant02:beat_v2:a:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "그 문구를 볼 때마다 계약 문제가 아니라 제 방이 열렸다는 감정이 먼저 올라왔습니다.",
      "behaviorHint": "질문 끝을 기다리지 못하고 톤이 한 단계씩 올라간다. '안 된다고 했다'는 취지의 문장을 여러 번 반복한다.",
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
          "tenant02:a:d-5:rule:8",
          "tenant02:a:d-5:rule:4"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:rapport:emotion",
      "coverageKey": "a:d-5:core:late:rapport:emotion",
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
      "id": "tenant02:beat_v2:b:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "긴급출입 조항은 1회 확인과 즉시 통지 정도만 허용할 뿐, 반복 촬영과 보관, 날짜 문제까지 면책하지 않습니다.",
      "behaviorHint": "말끝을 길게 늘이며 먼저 상처받은 사람처럼 들리게 한다. '협조만 했어도'라는 말을 되돌리며 책임을 다시 넘긴다.",
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
          "tenant02:b:d-5:rule:10",
          "tenant02:b:d-5:rule:4"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:rapport:emotion",
      "coverageKey": "b:d-5:core:late:rapport:emotion",
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
      "id": "tenant02:beat_v2:a:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interjection",
      "line": "그렇게 몰아가시면 저도 더 흔들려요. 마스터키 얘기부터 차근히 봐 주세요.",
      "behaviorHint": "유리한 캡처를 먼저 내밀며 상대 말을 끊을 타이밍을 노린다. 질문 끝을 기다리지 못하고 톤이 한 단계씩 올라간다. 말이 먼저 튀어나오듯 끼어든다.",
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
          "tenant02:a:d-1:act:6"
        ],
        "forbidAtomIds": [
          "tenant02:a:d-1:act:10"
        ]
      },
      "weight": 5,
      "priority": 26,
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
      "id": "tenant02:beat_v2:a:d-1:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interjection",
      "line": "숫자와 시각이 다 적혀 있는데 뭉뚱그리면 안 됩니다. 마스터키하고 합의 전 출입부터 나눠 주세요.",
      "behaviorHint": "유리한 캡처를 먼저 내밀며 상대 말을 끊을 타이밍을 노린다. 질문 끝을 기다리지 못하고 톤이 한 단계씩 올라간다. 구체 숫자와 순서를 끌어와 즉시 반박한다.",
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
          "tenant02:a:d-1:act:6"
        ],
        "forbidAtomIds": [
          "tenant02:a:d-1:act:10"
        ]
      },
      "weight": 5,
      "priority": 26,
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
      "id": "tenant02:beat_v2:b:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interjection",
      "line": "정확히는 마스터키하고 합의 전 출입가 다릅니다. 그 순서부터 바로잡아야 해요.",
      "behaviorHint": "'협조만 했어도'라는 말을 되돌리며 책임을 다시 넘긴다. 그동안 자신이 처리한 민원과 일정을 길게 열거한다. 구체 숫자와 순서를 끌어와 즉시 반박한다.",
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
          "tenant02:b:d-1:act:6"
        ],
        "forbidAtomIds": [
          "tenant02:b:d-1:act:10"
        ]
      },
      "weight": 5,
      "priority": 26,
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
      "id": "tenant02:beat_v2:b:d-1:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interjection",
      "line": "지금 그 말은 감정만 키워요. 마스터키부터 분리해서 말해 주세요.",
      "behaviorHint": "'협조만 했어도'라는 말을 되돌리며 책임을 다시 넘긴다. 그동안 자신이 처리한 민원과 일정을 길게 열거한다. 말이 먼저 튀어나오듯 끼어든다.",
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
          "tenant02:b:d-1:act:6"
        ],
        "forbidAtomIds": [
          "tenant02:b:d-1:act:10"
        ]
      },
      "weight": 5,
      "priority": 26,
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
      "id": "tenant02:beat_v2:a:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interjection",
      "line": "지금 다들 표시 시각만 붙잡고 계신데, 그 해석이 더 큰 오해일 수 있어요.",
      "behaviorHint": "유리한 캡처를 먼저 내밀며 상대 말을 끊을 타이밍을 노린다. 질문 끝을 기다리지 못하고 톤이 한 단계씩 올라간다. 오해가 커지는 순간 급히 끼어든다.",
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
          "tenant02:a:d-3:evidence:6"
        ],
        "forbidAtomIds": [
          "tenant02:a:d-3:evidence:10"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 2,
      "setFlags": [],
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
      "id": "tenant02:beat_v2:a:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interjection",
      "line": "잘린 캡처나 단독 장면만 보면 오해가 커집니다. 표시 시각 원본까지 같이 봐야 해요.",
      "behaviorHint": "유리한 캡처를 먼저 내밀며 상대 말을 끊을 타이밍을 노린다. 질문 끝을 기다리지 못하고 톤이 한 단계씩 올라간다. 가짜 단서가 커지기 전에 선을 긋는다.",
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
          "M2"
        ],
        "trapStates": [
          "cropped_context",
          "timestamp_drift"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant02:a:d-3:evidence:6"
        ],
        "forbidAtomIds": [
          "tenant02:a:d-3:evidence:10"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:trap_signal:allow",
      "variantTarget": 2,
      "setFlags": [],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "trap_signal",
        "red_herring"
      ],
      "beliefMode": "suspects"
    },
    {
      "id": "tenant02:beat_v2:b:d-3:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interjection",
      "line": "그 오해를 사실처럼 밀어붙이면 핵심이 흐려집니다. 표시 시각을 확정처럼 말하지 마세요.",
      "behaviorHint": "'협조만 했어도'라는 말을 되돌리며 책임을 다시 넘긴다. 그동안 자신이 처리한 민원과 일정을 길게 열거한다. 오해가 커지는 순간 급히 끼어든다.",
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
          "tenant02:b:d-3:evidence:6"
        ],
        "forbidAtomIds": [
          "tenant02:b:d-3:evidence:10"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 2,
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
      "id": "tenant02:beat_v2:b:d-3:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interjection",
      "line": "그 자료는 함정일 수 있습니다. 표시 시각만 떼어 말하면 결론이 달라져요.",
      "behaviorHint": "'협조만 했어도'라는 말을 되돌리며 책임을 다시 넘긴다. 그동안 자신이 처리한 민원과 일정을 길게 열거한다. 가짜 단서가 커지기 전에 선을 긋는다.",
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
          "M2"
        ],
        "trapStates": [
          "cropped_context",
          "timestamp_drift"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant02:b:d-3:evidence:6"
        ],
        "forbidAtomIds": [
          "tenant02:b:d-3:evidence:10"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:trap_signal:block",
      "variantTarget": 2,
      "setFlags": [],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "trap_signal",
        "red_herring"
      ],
      "beliefMode": "weaponizes"
    },
    {
      "id": "tenant02:beat_v2:a:d-4:surface:mid:interjection:allow:03",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "interjection",
      "line": "그렇게 몰아가시면 저도 더 흔들려요. 이틀 거부 얘기부터 차근히 봐 주세요.",
      "behaviorHint": "유리한 캡처를 먼저 내밀며 상대 말을 끊을 타이밍을 노린다. 질문 끝을 기다리지 못하고 톤이 한 단계씩 올라간다. 말이 먼저 튀어나오듯 끼어든다.",
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
          "tenant02:a:d-4:act:6"
        ],
        "forbidAtomIds": [
          "tenant02:a:d-4:act:10"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-4:surface:mid:interjection:emotional_only:allow",
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
      "id": "tenant02:beat_v2:a:d-4:surface:mid:interjection:block:04",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "interjection",
      "line": "숫자와 시각이 다 적혀 있는데 뭉뚱그리면 안 됩니다. 이틀 거부하고 수리기사부터 나눠 주세요.",
      "behaviorHint": "유리한 캡처를 먼저 내밀며 상대 말을 끊을 타이밍을 노린다. 질문 끝을 기다리지 못하고 톤이 한 단계씩 올라간다. 구체 숫자와 순서를 끌어와 즉시 반박한다.",
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
          "tenant02:a:d-4:act:6"
        ],
        "forbidAtomIds": [
          "tenant02:a:d-4:act:10"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-4:surface:mid:interjection:detail_rebuttal:block",
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
      "id": "tenant02:beat_v2:b:d-4:surface:mid:interjection:allow:03",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "interjection",
      "line": "정확히는 이틀 거부하고 수리기사가 다릅니다. 그 순서부터 바로잡아야 해요.",
      "behaviorHint": "'협조만 했어도'라는 말을 되돌리며 책임을 다시 넘긴다. 그동안 자신이 처리한 민원과 일정을 길게 열거한다. 구체 숫자와 순서를 끌어와 즉시 반박한다.",
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
          "tenant02:b:d-4:act:6"
        ],
        "forbidAtomIds": [
          "tenant02:b:d-4:act:10"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-4:surface:mid:interjection:detail_rebuttal:allow",
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
      "id": "tenant02:beat_v2:b:d-4:surface:mid:interjection:block:04",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-02",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "interjection",
      "line": "지금 그 말은 감정만 키워요. 이틀 거부부터 분리해서 말해 주세요.",
      "behaviorHint": "'협조만 했어도'라는 말을 되돌리며 책임을 다시 넘긴다. 그동안 자신이 처리한 민원과 일정을 길게 열거한다. 말이 먼저 튀어나오듯 끼어든다.",
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
          "tenant02:b:d-4:act:6"
        ],
        "forbidAtomIds": [
          "tenant02:b:d-4:act:10"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-4:surface:mid:interjection:emotional_only:block",
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

export default tenant02BeatsV2Full;
