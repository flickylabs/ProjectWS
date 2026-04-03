export const spouse05BeatsV2Full = {
  "caseId": "spouse-05",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 54,
    "byActionFamily": {
      "question": 23,
      "evidence": 6,
      "interjection": 12,
      "free_question": 7,
      "fatigue": 6
    },
    "byParty": {
      "a": 27,
      "b": 27
    },
    "byIssueRole": {
      "sub_truth": 20,
      "core_truth": 18,
      "shared_misconception": 16
    },
    "byDispute": {
      "d-2": 7,
      "d-4": 9,
      "d-5": 13,
      "d-1": 9,
      "d-3": 16
    },
    "byStage": {
      "early": 18,
      "mid": 27,
      "late": 9
    },
    "interjectionDistribution": {
      "emotional_only": 4,
      "detail_rebuttal": 4,
      "misbelief_escalation": 4
    },
    "fatigueDisputes": [
      "d-1",
      "d-4"
    ]
  },
  "beats": [
    {
      "id": "spouse05:beat_v2:a:d-2:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "서재 출입 얘기가 나오면 전 일단 보안 프로토콜부터 설명하게 됩니다. 그때도 권한 조정일 뿐이라고 생각했습니다. 순서대로 놓고 보면 그렇게 단순한 장면은 아닙니다.",
      "behaviorHint": "시선을 옆으로 빼고 일정표를 먼저 펼친다.",
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
          "guarded"
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
          "spouse05:a:d-2:denial:0"
        ],
        "forbidAtomIds": [
          "spouse05:a:d-2:admission:1",
          "spouse05:a:d-2:relationship:0"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:pressure:timeline",
      "coverageKey": "a:d-2:surface:early:pressure:timeline",
      "variantTarget": 7,
      "requiresFlags": [],
      "setFlags": [
        "d-2:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse05:beat_v2:a:d-4:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "그 파일이 왜 그렇게 정리됐는지부터 설명하고 싶습니다. 당시엔 원본성보다 전달력이 먼저라고 여겼어요. 그걸 곧바로 누구를 겨냥한 뜻으로만 잠그면 제 말이 비뚤어집니다.",
      "behaviorHint": "말의 주어를 흐리며 설명의 필요성을 앞세운다.",
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
          "guarded"
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
          "spouse05:a:d-4:denial:0"
        ],
        "forbidAtomIds": [
          "spouse05:a:d-4:admission:1",
          "spouse05:a:d-4:relationship:0"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:pressure:identity",
      "coverageKey": "a:d-4:surface:early:pressure:identity",
      "variantTarget": 7,
      "requiresFlags": [],
      "setFlags": [
        "d-4:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse05:beat_v2:a:d-5:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "처음엔 침범만 보였는데, 집 안 작업이 정면충돌한 구조를 묻자 좀 달리 보입니다. 그때 상황까지 같이 보면 결이 달라집니다.",
      "behaviorHint": "굳은 표정이 잠깐 풀리며 말속도가 늦어진다.",
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
          "guarded"
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
          "spouse05:a:d-5:context:0"
        ],
        "forbidAtomIds": [
          "spouse05:a:d-5:responsibility:1",
          "spouse05:a:d-5:unlock:s5:0"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:pressure:context",
      "coverageKey": "a:d-5:surface:early:pressure:context",
      "variantTarget": 7,
      "requiresFlags": [],
      "setFlags": [
        "d-5:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse05:beat_v2:b:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "처음엔 '잠깐이었다'고 줄여 말하고 싶었습니다. 허락 없이 들어갔다는 말을 바로 하기 싫었으니까요. 순서대로 놓고 보면 그렇게 단순한 장면은 아닙니다.",
      "behaviorHint": "손가락으로 짧은 시간을 표시하며 시선을 피한다.",
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
          "guarded"
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
          "spouse05:b:d-1:denial:0"
        ],
        "forbidAtomIds": [
          "spouse05:b:d-1:admission:1",
          "spouse05:b:d-1:relationship:0"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:timeline",
      "coverageKey": "b:d-1:surface:early:pressure:timeline",
      "variantTarget": 7,
      "requiresFlags": [],
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse05:beat_v2:b:d-3:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "문제의 문장은 책상 배치와 백업 파일 공유 문제로 욱해서 나온 불평이지, 실제 방해 예고가 아니었습니다. 그걸 곧바로 누구를 겨냥한 뜻으로만 잠그면 제 말이 비뚤어집니다.",
      "behaviorHint": "말끝을 짧게 끊고 핵심 사실만 먼저 방어한다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "pressure_response",
      "angleTag": "identity",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "guarded"
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
          "spouse05:b:d-3:context:0"
        ],
        "forbidAtomIds": [
          "spouse05:b:d-3:admission:1",
          "spouse05:b:d-3:unlock:s5:0"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:pressure:identity",
      "coverageKey": "b:d-3:surface:early:pressure:identity",
      "variantTarget": 7,
      "requiresFlags": [],
      "setFlags": [
        "d-3:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse05:beat_v2:b:d-5:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "처음엔 불공정만 떠올랐어요. 그런데 일정표 이야기가 나오면 제 선택도 같이 보게 됩니다. 그때 상황까지 같이 보면 결이 달라집니다.",
      "behaviorHint": "흥분이 가라앉고 계산하듯 단어를 고른다.",
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
          "guarded"
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
          "spouse05:b:d-5:threshold:0"
        ],
        "forbidAtomIds": [
          "spouse05:b:d-5:responsibility:1",
          "spouse05:b:d-5:unlock:s5:0"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:pressure:context",
      "coverageKey": "b:d-5:surface:early:pressure:context",
      "variantTarget": 7,
      "requiresFlags": [],
      "setFlags": [
        "d-5:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse05:beat_v2:a:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "클라이언트 보안 요구가 갑자기 강해져 서재와 장비를 묶어 관리할 필요가 있었습니다. 그때 상황까지 같이 보면 결이 달라집니다.",
      "behaviorHint": "시선을 옆으로 빼고 일정표를 먼저 펼친다.",
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
          "guarded"
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
          "spouse05:a:d-2:self_justification:0"
        ],
        "forbidAtomIds": [
          "spouse05:a:d-2:admission:1",
          "spouse05:a:d-2:relationship:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:pressure:context",
      "coverageKey": "a:d-2:surface:early:pressure:context",
      "variantTarget": 6,
      "requiresFlags": [],
      "setFlags": [
        "d-2:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse05:beat_v2:a:d-4:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "그때는 전후 맥락보다 핵심 문장만 들려주면 제 입장이 전달된다고 생각했습니다. 그때 상황까지 같이 보면 결이 달라집니다.",
      "behaviorHint": "말의 주어를 흐리며 설명의 필요성을 앞세운다.",
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
          "guarded"
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
          "spouse05:a:d-4:self_justification:0"
        ],
        "forbidAtomIds": [
          "spouse05:a:d-4:admission:1",
          "spouse05:a:d-4:relationship:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:pressure:context",
      "coverageKey": "a:d-4:surface:early:pressure:context",
      "variantTarget": 6,
      "requiresFlags": [],
      "setFlags": [
        "d-4:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse05:beat_v2:a:d-5:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "저는 여전히 원인을 출입 위반 쪽에 더 많이 묶어 두려 합니다. 그걸 곧바로 누구를 겨냥한 뜻으로만 잠그면 제 말이 비뚤어집니다.",
      "behaviorHint": "굳은 표정이 잠깐 풀리며 말속도가 늦어진다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "identity",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "guarded"
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
          "spouse05:a:d-5:counter:0"
        ],
        "forbidAtomIds": [
          "spouse05:a:d-5:responsibility:1",
          "spouse05:a:d-5:unlock:s5:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:pressure:identity",
      "coverageKey": "a:d-5:surface:early:pressure:identity",
      "variantTarget": 6,
      "requiresFlags": [],
      "setFlags": [
        "d-5:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse05:beat_v2:b:d-1:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "그때는 거실 회선이 흔들려서 다른 선택지가 거의 없었습니다. 그때 상황까지 같이 보면 결이 달라집니다.",
      "behaviorHint": "손가락으로 짧은 시간을 표시하며 시선을 피한다.",
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
          "guarded"
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
          "spouse05:b:d-1:self_justification:0"
        ],
        "forbidAtomIds": [
          "spouse05:b:d-1:admission:1",
          "spouse05:b:d-1:relationship:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:context",
      "coverageKey": "b:d-1:surface:early:pressure:context",
      "variantTarget": 6,
      "requiresFlags": [],
      "setFlags": [
        "d-1:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse05:beat_v2:b:d-3:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "문제의 문장은 책상 배치와 백업 파일 공유 문제로 욱해서 나온 불평이지, 실제 방해 예고가 아니었습니다. 그때 상황까지 같이 보면 결이 달라집니다.",
      "behaviorHint": "시선을 한 번 피하고 경위를 덧붙인다.",
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
          "guarded"
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
          "spouse05:b:d-3:context:0"
        ],
        "forbidAtomIds": [
          "spouse05:b:d-3:admission:1",
          "spouse05:b:d-3:unlock:s5:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:pressure:context",
      "coverageKey": "b:d-3:surface:early:pressure:context",
      "variantTarget": 6,
      "requiresFlags": [],
      "setFlags": [
        "d-3:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse05:beat_v2:b:d-5:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "저는 여전히 출입 자체보다 환경 압박을 더 크게 말하고 싶어 합니다. 그걸 곧바로 누구를 겨냥한 뜻으로만 잠그면 제 말이 비뚤어집니다.",
      "behaviorHint": "흥분이 가라앉고 계산하듯 단어를 고른다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "identity",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "guarded"
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
          "spouse05:b:d-5:counter:1"
        ],
        "forbidAtomIds": [
          "spouse05:b:d-5:responsibility:1",
          "spouse05:b:d-5:unlock:s5:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:pressure:identity",
      "coverageKey": "b:d-5:surface:early:pressure:identity",
      "variantTarget": 6,
      "requiresFlags": [],
      "setFlags": [
        "d-5:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse05:beat_v2:a:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "counter",
      "line": "1분 12초 파일 안에 회의를 무너뜨리겠다는 취지의 문장이 연속으로 담겨 있다고 봤습니다. 그때 상황까지 같이 보면 결이 달라집니다.",
      "behaviorHint": "해석을 바로잡으려 하지만 말투에 억울함이 먼저 묻어난다.",
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
          "guarded"
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
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:a:d-3:evidence:0"
        ],
        "forbidAtomIds": [
          "spouse05:a:d-3:admission:1",
          "spouse05:a:d-3:fear:0"
        ]
      },
      "weight": 5,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:context",
      "coverageKey": "a:d-3:surface:early:trap:context",
      "variantTarget": 4,
      "setFlags": [
        "d-3:surface:context_pressed"
      ],
      "tags": [
        "misconception",
        "red_herring"
      ]
    },
    {
      "id": "spouse05:beat_v2:a:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "counter",
      "line": "그 녹취에서 들리는 '회의 망쳐버릴까'라는 말은 당시 제 일정에 대한 직접적 위협으로 들렸습니다. 그걸 곧바로 누구를 겨냥한 뜻으로만 잠그면 제 말이 비뚤어집니다.",
      "behaviorHint": "해석을 바로잡으려 하지만 말투에 억울함이 먼저 묻어난다.",
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
          "guarded"
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
          "M1"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:a:d-3:quote:0"
        ],
        "forbidAtomIds": [
          "spouse05:a:d-3:admission:1",
          "spouse05:a:d-3:fear:0"
        ]
      },
      "weight": 5,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:identity",
      "coverageKey": "a:d-3:surface:early:trap:identity",
      "variantTarget": 4,
      "setFlags": [
        "d-3:surface:identity_pressed"
      ],
      "tags": [
        "misconception",
        "red_herring"
      ]
    },
    {
      "id": "spouse05:beat_v2:b:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "counter",
      "line": "문제의 문장은 책상 배치와 백업 파일 공유 문제로 욱해서 나온 불평이지, 실제 방해 예고가 아니었습니다. 그때 상황까지 같이 보면 결이 달라집니다.",
      "behaviorHint": "해석을 바로잡으려 하지만 말투에 억울함이 먼저 묻어난다.",
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
          "guarded"
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
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:b:d-3:context:0"
        ],
        "forbidAtomIds": [
          "spouse05:b:d-3:admission:1",
          "spouse05:b:d-3:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:context",
      "coverageKey": "b:d-3:surface:early:trap:context",
      "variantTarget": 4,
      "setFlags": [
        "d-3:surface:context_pressed"
      ],
      "tags": [
        "misconception",
        "red_herring"
      ]
    },
    {
      "id": "spouse05:beat_v2:a:d-2:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "권한 변경 알림과 블록 기록이 같이 남아 있으면, 제가 혼자 움직인 건 숨기기 어렵군요. 겉에 드러난 말보다 이유가 더 컸습니다.",
      "behaviorHint": "짧게 숨을 들이쉬고 말끝을 삼킨다.",
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:a:d-2:context:1"
        ],
        "forbidAtomIds": [
          "spouse05:a:d-2:relationship:0",
          "spouse05:a:d-2:fear:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:motive:motive",
      "coverageKey": "a:d-2:motive:mid:motive:motive",
      "variantTarget": 5,
      "requiresFlags": [
        "d-2:surface:timeline_pressed"
      ],
      "setFlags": [
        "d-2:motive:motive_opened"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "spouse05:beat_v2:a:d-4:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "편집 앱 export 파일이라는 점까지 나오면, '그냥 들리게 한 것'만으론 부족하겠네요. 제 몫이 전혀 없다는 말은 아니지만, 전부를 그렇게 묶을 수도 없습니다.",
      "behaviorHint": "입술을 깨물고 문장을 짧게 줄인다.",
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:a:d-4:responsibility:0"
        ],
        "forbidAtomIds": [
          "spouse05:a:d-4:relationship:0",
          "spouse05:a:d-4:fear:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:pressure:responsibility",
      "coverageKey": "a:d-4:motive:mid:pressure:responsibility",
      "variantTarget": 5,
      "requiresFlags": [
        "d-4:surface:identity_pressed"
      ],
      "setFlags": [
        "d-4:motive:responsibility_pressed"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "spouse05:beat_v2:a:d-5:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "장애 접수와 일정표가 같이 나오면 단순한 규칙 위반만은 아니었네요. 제 몫이 전혀 없다는 말은 아니지만, 전부를 그렇게 묶을 수도 없습니다.",
      "behaviorHint": "문자 기록과 달력을 번갈아 본다.",
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:a:d-5:admission:0"
        ],
        "forbidAtomIds": [
          "spouse05:a:d-5:fear:0",
          "spouse05:a:d-5:harm:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:pressure:responsibility",
      "coverageKey": "a:d-5:motive:mid:pressure:responsibility",
      "variantTarget": 5,
      "requiresFlags": [
        "d-5:surface:context_pressed"
      ],
      "setFlags": [
        "d-5:motive:responsibility_pressed"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "spouse05:beat_v2:b:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "출입기록이랑 와이파이 접속이 같이 뜨면, 실제로 들어가서 심사 준비를 한 건 인정해야겠네요. 겉에 드러난 말보다 이유가 더 컸습니다.",
      "behaviorHint": "입술을 깨물고 천천히 고개를 끄덕인다.",
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:b:d-1:context:1"
        ],
        "forbidAtomIds": [
          "spouse05:b:d-1:relationship:0",
          "spouse05:b:d-1:fear:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:motive:motive",
      "coverageKey": "b:d-1:motive:mid:motive:motive",
      "variantTarget": 5,
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "setFlags": [
        "d-1:motive:motive_opened"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "spouse05:beat_v2:b:d-3:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "화가 나서 거친 말을 한 건 맞지만, 녹취 속 두 문장은 같은 날 같은 맥락이 아닙니다. 겉에 드러난 말보다 이유가 더 컸습니다.",
      "behaviorHint": "방어선이 느슨해지며 이유와 계산을 섞어 말한다.",
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:b:d-3:admission:0"
        ],
        "forbidAtomIds": [
          "spouse05:b:d-3:harm:0",
          "spouse05:b:d-3:shame:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:motive:motive",
      "coverageKey": "b:d-3:motive:mid:motive:motive",
      "variantTarget": 5,
      "requiresFlags": [
        "d-3:surface:identity_pressed"
      ],
      "setFlags": [
        "d-3:motive:motive_opened"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "spouse05:beat_v2:b:d-5:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "맞아요, 마감이 급해서 더 거칠게 움직였습니다. 제 조급함이 선택을 밀었습니다. 제 몫이 전혀 없다는 말은 아니지만, 전부를 그렇게 묶을 수도 없습니다.",
      "behaviorHint": "숫자를 세듯 말하다가 마지막에 멈춘다.",
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:b:d-5:admission:0"
        ],
        "forbidAtomIds": [
          "spouse05:b:d-5:harm:0",
          "spouse05:b:d-5:shame:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:pressure:responsibility",
      "coverageKey": "b:d-5:motive:mid:pressure:responsibility",
      "variantTarget": 5,
      "requiresFlags": [
        "d-5:surface:context_pressed"
      ],
      "setFlags": [
        "d-5:motive:responsibility_pressed"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "spouse05:beat_v2:a:d-2:core:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "clarify",
      "line": "그 자료는 봤습니다. 결국 10시간 전용 블록과 읽기 전용 전환이 겹치면서 서재가 공동 공간이 아니라 제 작업실처럼 보이게 됐습니다. 형식상 거칠어 보여도 그걸 곧바로 최종 실행으로 읽는 건 과합니다.",
      "behaviorHint": "짧게 숨을 들이쉬고 말끝을 삼킨다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "core",
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:a:d-2:responsibility:0",
          "spouse05:a:d-2:admission:0"
        ],
        "forbidAtomIds": [
          "spouse05:a:d-2:relationship:0",
          "spouse05:a:d-2:fear:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:core:evidence:legality",
      "coverageKey": "a:d-2:core:mid:evidence:legality",
      "variantTarget": 3,
      "requiresFlags": [
        "d-2:surface:context_pressed"
      ],
      "setFlags": [
        "d-2:core:evidence_seen"
      ],
      "tags": [
        "cold",
        "evidence"
      ]
    },
    {
      "id": "spouse05:beat_v2:a:d-4:surface:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "counter",
      "line": "그 자료는 봤습니다. 원본을 조작한 게 아니라 설명이 들리게 잡음만 정리한 요약 클립이었습니다. 그 자료만으로 의도와 대상을 한 줄로 묶는 건 무리입니다.",
      "behaviorHint": "입술을 깨물고 문장을 짧게 줄인다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "evidence_response",
      "angleTag": "identity",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "guarded"
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
          "spouse05:a:d-4:denial:0",
          "spouse05:a:d-4:self_justification:0"
        ],
        "forbidAtomIds": [
          "spouse05:a:d-4:admission:1",
          "spouse05:a:d-4:relationship:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:evidence:identity",
      "coverageKey": "a:d-4:surface:early:evidence:identity",
      "variantTarget": 3,
      "requiresFlags": [
        "d-4:surface:context_pressed"
      ],
      "setFlags": [
        "d-4:surface:evidence_seen"
      ],
      "tags": [
        "cold",
        "evidence"
      ]
    },
    {
      "id": "spouse05:beat_v2:a:d-5:core:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "clarify",
      "line": "그 자료는 봤습니다. 그럼에도 저는 여전히 제 보안 불안을 앞세워 책임 비율을 줄이고 싶어 합니다. 자료 형식이 차갑게 보여도 배경까지 잘라내진 못합니다.",
      "behaviorHint": "문자 기록과 달력을 번갈아 본다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "core",
      "issueRole": "sub_truth",
      "responseIntent": "evidence_response",
      "angleTag": "context",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:a:d-5:context:1",
          "spouse05:a:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse05:a:d-5:fear:0",
          "spouse05:a:d-5:harm:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:evidence:context",
      "coverageKey": "a:d-5:core:mid:evidence:context",
      "variantTarget": 3,
      "requiresFlags": [
        "d-5:surface:identity_pressed"
      ],
      "setFlags": [
        "d-5:core:evidence_seen"
      ],
      "tags": [
        "cold",
        "evidence"
      ]
    },
    {
      "id": "spouse05:beat_v2:b:d-1:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "counter",
      "line": "그 자료는 봤습니다. 그때는 거실 회선이 흔들려서 다른 선택지가 거의 없었습니다. 자료 형식이 차갑게 보여도 배경까지 잘라내진 못합니다.",
      "behaviorHint": "입술을 깨물고 천천히 고개를 끄덕인다.",
      "applicableStates": [
        "S1",
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
          "guarded"
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
          "spouse05:b:d-1:self_justification:0",
          "spouse05:b:d-1:context:0"
        ],
        "forbidAtomIds": [
          "spouse05:b:d-1:admission:1",
          "spouse05:b:d-1:relationship:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:evidence:context",
      "coverageKey": "b:d-1:surface:early:evidence:context",
      "variantTarget": 3,
      "requiresFlags": [
        "d-1:surface:context_pressed"
      ],
      "setFlags": [
        "d-1:surface:evidence_seen"
      ],
      "tags": [
        "cold",
        "evidence"
      ]
    },
    {
      "id": "spouse05:beat_v2:b:d-3:core:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "clarify",
      "line": "그 자료는 봤습니다. 제 말투가 날카로워 오해를 부를 수 있었다는 점은 인정하지만, 고의 업무방해 의도까지는 아니었습니다. 그 자료만으로 의도와 대상을 한 줄로 묶는 건 무리입니다.",
      "behaviorHint": "자료를 훑은 뒤 반 박자 늦게 답한다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "core",
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:b:d-3:counter:0",
          "spouse05:b:d-3:admission:0"
        ],
        "forbidAtomIds": [
          "spouse05:b:d-3:harm:0",
          "spouse05:b:d-3:shame:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:evidence:identity",
      "coverageKey": "b:d-3:core:mid:evidence:identity",
      "variantTarget": 3,
      "requiresFlags": [
        "d-3:surface:context_pressed"
      ],
      "setFlags": [
        "d-3:core:evidence_seen"
      ],
      "tags": [
        "cold",
        "evidence"
      ]
    },
    {
      "id": "spouse05:beat_v2:b:d-5:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "counter",
      "line": "그 자료는 봤습니다. 저는 여전히 출입 자체보다 환경 압박을 더 크게 말하고 싶어 합니다. 자료 형식이 차갑게 보여도 배경까지 잘라내진 못합니다.",
      "behaviorHint": "숫자를 세듯 말하다가 마지막에 멈춘다.",
      "applicableStates": [
        "S1",
        "S2"
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
          "calm",
          "guarded"
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
          "spouse05:b:d-5:threshold:0",
          "spouse05:b:d-5:counter:0"
        ],
        "forbidAtomIds": [
          "spouse05:b:d-5:responsibility:1",
          "spouse05:b:d-5:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:evidence:context",
      "coverageKey": "b:d-5:surface:early:evidence:context",
      "variantTarget": 3,
      "requiresFlags": [
        "d-5:surface:identity_pressed"
      ],
      "setFlags": [
        "d-5:surface:evidence_seen"
      ],
      "tags": [
        "cold",
        "evidence"
      ]
    },
    {
      "id": "spouse05:beat_v2:a:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "집에서 일하는 게 다 같은 무게가 아니라고 누가 정했습니까, 하지만 그 방 장비 책임은 결국 제 몫이었어요.",
      "behaviorHint": "말허리를 잘라 들어오며 감정만 먼저 터뜨린다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "emotion",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:a:d-2:fear:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 3,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-2:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "spouse05:beat_v2:a:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "emotional",
      "line": "클라이언트 리뷰 직전에 들은 말이라 객관적 검증보다 공포가 먼저 작동했습니다. 그래서 이건 규정이나 숫자보다 더 깊게 남았습니다.",
      "behaviorHint": "확신이 흔들리며 감정과 설명이 함께 튀어나온다.",
      "applicableStates": [
        "S3",
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
          "agitated",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "frayed",
          "exhausted"
        ],
        "misconceptionStates": [
          "M4"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:a:d-3:fear:0",
          "spouse05:a:d-3:harm:0"
        ],
        "forbidAtomIds": [
          "spouse05:a:d-3:evidence:0",
          "spouse05:a:d-3:quote:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:trap:emotion",
      "coverageKey": "a:d-3:core:late:trap:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-3:core:emotion_opened"
      ],
      "tags": [
        "misconception",
        "red_herring"
      ]
    },
    {
      "id": "spouse05:beat_v2:a:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "interject",
      "line": "방금 끊으셔도요, 시간이 짧았다는 게 허락 없이 들어온 사실을 지우진 않잖아요.",
      "behaviorHint": "말이 막히자 더 짧고 날카롭게 끼어든다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "emotion",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:a:d-5:admission:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 3,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-5:surface:mid:interjection:emotional_only:block",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "spouse05:beat_v2:b:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "잠깐 들어간 선택이 잘못인 건 알아요, 그렇다고 제 일을 망치려 했던 사람처럼 몰지는 마세요.",
      "behaviorHint": "말허리를 잘라 들어오며 감정만 먼저 터뜨린다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "emotion",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:b:d-1:fear:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 3,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-1:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "spouse05:beat_v2:b:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "emotional",
      "line": "그래서 저는 무단 출입 문제보다도 '고의 방해범'으로 박제된 느낌에 더 크게 반응했습니다. 그래서 이건 규정이나 숫자보다 더 깊게 남았습니다.",
      "behaviorHint": "확신이 흔들리며 감정과 설명이 함께 튀어나온다.",
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
        "empathy_approach"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "frayed",
          "exhausted"
        ],
        "misconceptionStates": [
          "M3",
          "M4"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:b:d-3:harm:0"
        ],
        "forbidAtomIds": [
          "spouse05:b:d-3:denial:0",
          "spouse05:b:d-3:uncertainty:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:trap:emotion",
      "coverageKey": "b:d-3:core:late:trap:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-3:core:emotion_opened"
      ],
      "tags": [
        "misconception",
        "red_herring"
      ]
    },
    {
      "id": "spouse05:beat_v2:b:d-3:motive:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "거친 문장을 따질수록 원본 날짜와 상황을 같이 놓고 봐야 합니다. 그때 상황까지 같이 보면 결이 달라집니다.",
      "behaviorHint": "확신이 흔들리며 감정과 설명이 함께 튀어나온다.",
      "applicableStates": [
        "S3",
        "S4",
        "S5"
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
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "frayed",
          "exhausted"
        ],
        "misconceptionStates": [
          "M3"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:b:d-3:relationship:0"
        ],
        "forbidAtomIds": [
          "spouse05:b:d-3:denial:0",
          "spouse05:b:d-3:uncertainty:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:trap:context",
      "coverageKey": "b:d-3:motive:late:trap:context",
      "variantTarget": 3,
      "setFlags": [
        "d-3:motive:context_pressed"
      ],
      "tags": [
        "misconception",
        "red_herring"
      ]
    },
    {
      "id": "spouse05:beat_v2:b:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "interject",
      "line": "방금 끊으셔도요, 그러니까 또 제 일은 밀려도 되는 일이라는 식으로 들리잖아요.",
      "behaviorHint": "말이 막히자 더 짧고 날카롭게 끼어든다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "emotion",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:b:d-5:motive:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 3,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-5:surface:mid:interjection:emotional_only:block",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "spouse05:beat_v2:a:d-2:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "rebuttal",
      "line": "제 말 막아도 23시 47분하고 10시간 블록는 그대로 남습니다. 디테일부터 틀린 쪽이 먼저 있잖아요.",
      "behaviorHint": "잘린 말 대신 숫자와 순서를 먼저 밀어 넣는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "timeline",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:a:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 3,
      "priority": 23,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-2:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "spouse05:beat_v2:a:d-4:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "rebuttal",
      "line": "오한결하고 병합 export만 다시 보세요. 디테일을 맞춰 보면 제가 그렇게까지 단순하게 말한 건 아닙니다.",
      "behaviorHint": "시간표나 로그처럼 구체 디테일을 손가락으로 짚듯 말한다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "timeline",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:a:d-4:admission:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 3,
      "priority": 23,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-4:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "spouse05:beat_v2:b:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "rebuttal",
      "line": "1분 12초 파일하고 회의 망쳐버릴까만 다시 보세요. 디테일을 맞춰 보면 제가 그렇게까지 단순하게 말한 건 아닙니다.",
      "behaviorHint": "시간표나 로그처럼 구체 디테일을 손가락으로 짚듯 말한다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:b:d-3:context:1"
        ],
        "forbidAtomIds": []
      },
      "weight": 3,
      "priority": 23,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-3:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "spouse05:beat_v2:b:d-5:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "rebuttal",
      "line": "제 말 막아도 거실 회선 장애하고 13시 41분는 그대로 남습니다. 디테일부터 틀린 쪽이 먼저 있잖아요.",
      "behaviorHint": "잘린 말 대신 숫자와 순서를 먼저 밀어 넣는다.",
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
        "emotionTiers": [
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:b:d-5:context:1"
        ],
        "forbidAtomIds": []
      },
      "weight": 3,
      "priority": 23,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-5:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "spouse05:beat_v2:a:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "결국 통제권을 쥐려는 쪽으로 기울었습니다. 공동 공간을 제 작업실처럼 굴린 책임을 인정합니다. 그래서 이건 규정이나 숫자보다 더 깊게 남았습니다.",
      "behaviorHint": "어깨가 내려가고 시선이 정면으로 돌아온다.",
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
          "agitated",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "frayed",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:a:d-2:fear:0"
        ],
        "forbidAtomIds": [
          "spouse05:a:d-2:denial:0",
          "spouse05:a:d-2:self_justification:0"
        ]
      },
      "weight": 3,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:core:rapport:emotion",
      "coverageKey": "a:d-2:core:late:rapport:emotion",
      "variantTarget": 2,
      "requiresFlags": [
        "d-2:motive:motive_opened"
      ],
      "setFlags": [
        "d-2:core:emotion_opened"
      ],
      "tags": [
        "late",
        "free"
      ]
    },
    {
      "id": "spouse05:beat_v2:a:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "escalate",
      "line": "편집 앱 export 흔적과 오한결 지시, 렌더 로그가 붙으면 '의미는 안 바꿨다'는 설명이 자료 형식 자체와 충돌합니다.",
      "behaviorHint": "오해가 굳어질수록 말속 확신과 조급함이 함께 올라온다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ],
        "misconceptionStates": [
          "M0",
          "M1"
        ]
      },
      "beliefMode": "weaponizes",
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:a:d-3:context:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 3,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "misbelief_escalation",
        "red_herring"
      ]
    },
    {
      "id": "spouse05:beat_v2:a:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "escalate",
      "line": "제 말 잘라도, 편집 앱 export 흔적과 오한결 지시, 렌더 로그가 붙으면 '의미는 안 바꿨다'는 설명이 자료 형식 자체와 충돌합니다.",
      "behaviorHint": "끊긴 반발이 다시 튀어나오며 확신을 세게 붙든다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ],
        "interjectionStates": [
          "block_last_turn"
        ],
        "misconceptionStates": [
          "M2",
          "M3"
        ]
      },
      "beliefMode": "weaponizes",
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:a:d-3:context:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 3,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "misbelief_escalation",
        "red_herring"
      ]
    },
    {
      "id": "spouse05:beat_v2:a:d-4:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "emotional",
      "line": "오한결 씨 지시 내역까지 붙으면 더는 변명할 수 없습니다. 제가 편집본을 원본처럼 내민 겁니다. 겉에 드러난 말보다 이유가 더 컸습니다.",
      "behaviorHint": "눈을 감았다가 뜨며 단정적으로 인정한다.",
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
          "agitated",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "frayed",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:a:d-4:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "spouse05:a:d-4:denial:0",
          "spouse05:a:d-4:self_justification:0"
        ]
      },
      "weight": 3,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:core:motive:motive",
      "coverageKey": "a:d-4:core:late:motive:motive",
      "variantTarget": 2,
      "requiresFlags": [
        "d-4:motive:responsibility_pressed"
      ],
      "setFlags": [
        "d-4:core:motive_opened"
      ],
      "tags": [
        "late",
        "free"
      ]
    },
    {
      "id": "spouse05:beat_v2:a:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "emotional",
      "line": "이제는 소담 씨 탓만 할 수 없습니다. 봉쇄와 회선 문제까지 함께 인정해야 합니다. 그래서 이건 규정이나 숫자보다 더 깊게 남았습니다.",
      "behaviorHint": "문장을 끊지 않고 끝까지 책임을 말한다.",
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
          "agitated",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "frayed",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:a:d-5:fear:0"
        ],
        "forbidAtomIds": [
          "spouse05:a:d-5:counter:0",
          "spouse05:a:d-5:counter:1"
        ]
      },
      "weight": 3,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:rapport:emotion",
      "coverageKey": "a:d-5:core:late:rapport:emotion",
      "variantTarget": 2,
      "requiresFlags": [
        "d-5:motive:responsibility_pressed"
      ],
      "setFlags": [
        "d-5:core:emotion_opened"
      ],
      "tags": [
        "late",
        "free"
      ]
    },
    {
      "id": "spouse05:beat_v2:b:d-1:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "회선 문제와 일정 압박이 있었다고 해도 무단 출입 책임이 사라지진 않아요. 그건 제가 안고 가야 합니다. 겉에 드러난 말보다 이유가 더 컸습니다.",
      "behaviorHint": "어깨를 낮추고 목소리를 단단히 잡는다.",
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
          "agitated",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "frayed",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:b:d-1:fear:0"
        ],
        "forbidAtomIds": [
          "spouse05:b:d-1:denial:0",
          "spouse05:b:d-1:self_justification:0"
        ]
      },
      "weight": 3,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:motive:motive",
      "coverageKey": "b:d-1:core:late:motive:motive",
      "variantTarget": 2,
      "requiresFlags": [
        "d-1:motive:motive_opened"
      ],
      "setFlags": [
        "d-1:core:motive_opened"
      ],
      "tags": [
        "late",
        "free"
      ]
    },
    {
      "id": "spouse05:beat_v2:b:d-3:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "emotional",
      "line": "그래서 저는 무단 출입 문제보다도 '고의 방해범'으로 박제된 느낌에 더 크게 반응했습니다. 그래서 이건 규정이나 숫자보다 더 깊게 남았습니다.",
      "behaviorHint": "숨을 고르고 감정이 실린 문장을 내놓는다.",
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
        "empathy_approach"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "frayed",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:b:d-3:harm:0"
        ],
        "forbidAtomIds": [
          "spouse05:b:d-3:denial:0",
          "spouse05:b:d-3:uncertainty:0"
        ]
      },
      "weight": 3,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:rapport:emotion",
      "coverageKey": "b:d-3:core:late:rapport:emotion",
      "variantTarget": 2,
      "requiresFlags": [
        "d-3:motive:motive_opened"
      ],
      "setFlags": [
        "d-3:core:emotion_opened"
      ],
      "tags": [
        "late",
        "free"
      ]
    },
    {
      "id": "spouse05:beat_v2:b:d-3:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "escalate",
      "line": "제 분노 한 조각만 떼어 붙여 놓고 저를 그런 사람으로 만든 거잖아요.",
      "behaviorHint": "오해가 굳어질수록 말속 확신과 조급함이 함께 올라온다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ],
        "misconceptionStates": [
          "M1",
          "M2"
        ]
      },
      "beliefMode": "misbelief",
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:b:d-3:context:1"
        ],
        "forbidAtomIds": []
      },
      "weight": 3,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "misbelief_escalation",
        "red_herring"
      ]
    },
    {
      "id": "spouse05:beat_v2:b:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "escalate",
      "line": "제 말 잘라도, 제 분노 한 조각만 떼어 붙여 놓고 저를 그런 사람으로 만든 거잖아요.",
      "behaviorHint": "끊긴 반발이 다시 튀어나오며 확신을 세게 붙든다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ],
        "interjectionStates": [
          "block_last_turn"
        ],
        "misconceptionStates": [
          "M3",
          "M4"
        ]
      },
      "beliefMode": "misbelief",
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:b:d-3:context:1"
        ],
        "forbidAtomIds": []
      },
      "weight": 3,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "misbelief_escalation",
        "red_herring"
      ]
    },
    {
      "id": "spouse05:beat_v2:b:d-5:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "emotional",
      "line": "이제는 제 침범도, 민재 씨의 봉쇄도 둘 다 말해야 공정합니다. 이번 파국은 한쪽만의 잘못이 아니에요. 겉에 드러난 말보다 이유가 더 컸습니다.",
      "behaviorHint": "눈을 정면으로 들고 또렷하게 정리한다.",
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
        "motive_search"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "frayed",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:b:d-5:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "spouse05:b:d-5:counter:0",
          "spouse05:b:d-5:counter:1"
        ]
      },
      "weight": 3,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:motive:motive",
      "coverageKey": "b:d-5:core:late:motive:motive",
      "variantTarget": 2,
      "requiresFlags": [
        "d-5:motive:responsibility_pressed"
      ],
      "setFlags": [
        "d-5:core:motive_opened"
      ],
      "tags": [
        "late",
        "free"
      ]
    },
    {
      "id": "spouse05:beat_v2:a:d-4:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "irritate",
      "line": "그 얘기 또 해야 합니까. 편집 앱에서 내보낸 파일인 건 맞고, 두 원본에서 필요한 부분을 추린 것도 맞습니다.",
      "behaviorHint": "같은 질문이 반복되자 짜증이 먼저 새어 나온다.",
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
          "guarded",
          "agitated"
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
          "spouse05:a:d-4:admission:0"
        ],
        "forbidAtomIds": [
          "spouse05:a:d-4:relationship:0",
          "spouse05:a:d-4:fear:0"
        ]
      },
      "weight": 4,
      "priority": 19,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:fatigue:timeline",
      "coverageKey": "a:d-4:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-4:motive:timeline_fatigue_seen"
      ],
      "tags": [
        "fatigue",
        "repeat_2"
      ]
    },
    {
      "id": "spouse05:beat_v2:b:d-1:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "irritate",
      "line": "그 얘기 또 해야 합니까. 구 관리자 코드를 써서 서재에 들어간 건 맞지만, 해외 화상심사를 놓치지 않으려던 목적이었습니다.",
      "behaviorHint": "같은 질문이 반복되자 짜증이 먼저 새어 나온다.",
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
          "guarded",
          "agitated"
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
          "spouse05:b:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse05:b:d-1:relationship:0",
          "spouse05:b:d-1:fear:0"
        ]
      },
      "weight": 4,
      "priority": 19,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:fatigue:timeline",
      "coverageKey": "b:d-1:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:timeline_fatigue_seen"
      ],
      "tags": [
        "fatigue",
        "repeat_2"
      ]
    },
    {
      "id": "spouse05:beat_v2:a:d-4:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "block",
      "line": "세 번째쯤 되면 저도 같은 말을 더 곱게 못 합니다. 결과적으로 서로 다른 날짜의 음성을 하나의 연속 녹취처럼 만들었고, 그걸 원본처럼 쓰는 쪽으로 흘렀습니다.",
      "behaviorHint": "질문을 중간에 끊고 더는 같은 말을 반복하기 싫다는 태도를 보인다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:a:d-4:responsibility:0"
        ],
        "forbidAtomIds": [
          "spouse05:a:d-4:relationship:0",
          "spouse05:a:d-4:fear:0"
        ]
      },
      "weight": 4,
      "priority": 18,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:fatigue:responsibility",
      "coverageKey": "a:d-4:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-4:motive:responsibility_fatigue_seen"
      ],
      "tags": [
        "fatigue",
        "repeat_3"
      ]
    },
    {
      "id": "spouse05:beat_v2:b:d-1:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "block",
      "line": "세 번째쯤 되면 저도 같은 말을 더 곱게 못 합니다. 제가 들어간 시간대가 민재 씨 예약 블록이었다는 점은 알고 있었고, 그래서 더 방어적으로 굴었습니다.",
      "behaviorHint": "질문을 중간에 끊고 더는 같은 말을 반복하기 싫다는 태도를 보인다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:b:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "spouse05:b:d-1:relationship:0",
          "spouse05:b:d-1:fear:0"
        ]
      },
      "weight": 4,
      "priority": 18,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:fatigue:responsibility",
      "coverageKey": "b:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:responsibility_fatigue_seen"
      ],
      "tags": [
        "fatigue",
        "repeat_3"
      ]
    },
    {
      "id": "spouse05:beat_v2:a:d-4:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "retaliate",
      "line": "지금은 설명보다 반발이 먼저 올라옵니다. 클라이언트와 임대인 앞에서 제가 통제를 잃은 사람으로 보일까 봐 제 입장을 입증할 도구를 만들고 싶었습니다.",
      "behaviorHint": "피로가 높아져 방어보다 역질문이 먼저 튀어나온다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:a:d-4:fear:0"
        ],
        "forbidAtomIds": [
          "spouse05:a:d-4:denial:0",
          "spouse05:a:d-4:self_justification:0"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:fatigue:responsibility",
      "coverageKey": "a:d-4:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-4:motive:responsibility_fatigue_seen"
      ],
      "tags": [
        "fatigue",
        "high_fatigue"
      ]
    },
    {
      "id": "spouse05:beat_v2:b:d-1:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "retaliate",
      "line": "지금은 설명보다 반발이 먼저 올라옵니다. 그 순간 가장 크게 든 생각은 제 일이 늘 뒤로 밀려도 되는 일로 취급된다는 서러움이었습니다.",
      "behaviorHint": "피로가 높아져 방어보다 역질문이 먼저 튀어나온다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse05:b:d-1:fear:0"
        ],
        "forbidAtomIds": [
          "spouse05:b:d-1:denial:0",
          "spouse05:b:d-1:self_justification:0"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:fatigue:responsibility",
      "coverageKey": "b:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:responsibility_fatigue_seen"
      ],
      "tags": [
        "fatigue",
        "high_fatigue"
      ]
    }
  ]
} as const;

export default spouse05BeatsV2Full;
