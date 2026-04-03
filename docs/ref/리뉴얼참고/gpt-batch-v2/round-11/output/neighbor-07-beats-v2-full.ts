export const neighbor-07BeatsV2Full = {
  "caseId": "neighbor-07",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 56,
    "byActionFamily": {
      "question": 30,
      "evidence": 4,
      "fatigue": 6,
      "free_question": 4,
      "interjection": 12
    },
    "byResponseIntent": {
      "pressure_response": 18,
      "motive_response": 6,
      "rapport_response": 10,
      "evidence_response": 4,
      "fatigue_response": 6,
      "trap_confusion_response": 12
    },
    "byParty": {
      "a": 28,
      "b": 28
    },
    "byDispute": {
      "d-1": 20,
      "d-2": 20,
      "d-5": 2,
      "d-3": 8,
      "d-4": 6
    },
    "interjectionBreakdown": {
      "emotional_only": 4,
      "detail_rebuttal": 4,
      "misbelief_escalation": 2,
      "trap_signal": 2
    },
    "fatigueDisputes": [
      "d-1",
      "d-2"
    ],
    "coverageKeys": 52
  },
  "beats": [
    {
      "id": "neighbor-07:beat_v2:a:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "죄송한데 그때는 잠금함이 비어 있는 줄 알아서 열쇠가 맞는지만 본 거고, 오래 점유하려던 건 아니었어요.",
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
          "neighbor-07:a:d-1:act:0",
          "neighbor-07:a:d-1:responsibility:1"
        ],
        "forbidAtomIds": [
          "neighbor-07:a:d-1:admission:50",
          "neighbor-07:a:d-1:unlock:s5:0"
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
      "id": "neighbor-07:beat_v2:a:d-1:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "전 세입자가 남긴 말과 표시를 보고 잠깐 써도 되는 줄 알았을 뿐이고, 규정을 무시하겠다는 뜻은 아니었어요.",
      "behaviorHint": "대상이나 표식을 집어 말하며 특정성을 강조한다.",
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
          "neighbor-07:a:d-1:act:0",
          "neighbor-07:a:d-1:responsibility:1"
        ],
        "forbidAtomIds": [
          "neighbor-07:a:d-1:admission:50",
          "neighbor-07:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:identity",
      "coverageKey": "a:d-1:surface:early:pressure:identity",
      "variantTarget": 1,
      "setFlags": [
        "d-1:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "neighbor-07:beat_v2:a:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "열쇠를 써서 문을 연 건 맞아요. 다만 그 봉투와 메모를 믿고 이삿짐을 잠깐 비켜 둔 거였어요.",
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
          "neighbor-07:a:d-1:admission:30",
          "neighbor-07:a:d-1:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "neighbor-07:a:d-1:admission:50",
          "neighbor-07:a:d-1:unlock:s5:0"
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
      "id": "neighbor-07:beat_v2:a:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "관리실 확인보다 먼저 연 건 제 잘못이에요. 그래도 이사 첫날이라 유모차랑 박스를 당장 치워야 해서 판단이 짧았어요.",
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
          "neighbor-07:a:d-1:motive:31",
          "neighbor-07:a:d-1:context:21"
        ],
        "forbidAtomIds": [
          "neighbor-07:a:d-1:admission:50",
          "neighbor-07:a:d-1:unlock:s5:0"
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
        "d-1:surface:identity_pressed"
      ]
    },
    {
      "id": "neighbor-07:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "저도 겁나서 그랬던 거예요, 처음부터 남의 걸 빼앗으려던 게 아니에요.",
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
          "neighbor-07:a:d-1:fear:40",
          "neighbor-07:a:d-1:unlock:s4:0"
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
      "id": "neighbor-07:beat_v2:b:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "그쪽이 남의 열쇠 비슷한 걸로 문을 열고 짐을 넣었으니 문제가 시작된 겁니다. 피난 통로, 공용물품, 무단 열쇠, 이 세 개면 충분해요.",
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
          "neighbor-07:b:d-1:timeline:10",
          "neighbor-07:b:d-1:act:0"
        ],
        "forbidAtomIds": [
          "neighbor-07:b:d-1:admission:50",
          "neighbor-07:b:d-1:unlock:s5:0"
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
      "id": "neighbor-07:beat_v2:b:d-1:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "관리실 확인 전이든 뭐든, 먼저 열고 넣은 쪽이 있었으니 저는 그걸 막아야 한다고 본 겁니다.",
      "behaviorHint": "대상이나 표식을 집어 말하며 특정성을 강조한다.",
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
          "neighbor-07:b:d-1:act:0",
          "neighbor-07:b:d-1:rule:1"
        ],
        "forbidAtomIds": [
          "neighbor-07:b:d-1:admission:50",
          "neighbor-07:b:d-1:unlock:s5:0"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:identity",
      "coverageKey": "b:d-1:surface:early:pressure:identity",
      "variantTarget": 1,
      "setFlags": [
        "d-1:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "neighbor-07:beat_v2:b:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "박나리 씨가 먼저 연 건 영상으로도 보이죠. 다만 제가 그걸 보고 과거 일까지 겹쳐 더 위험하게 본 건 있습니다.",
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
          "neighbor-07:b:d-1:counter:30",
          "neighbor-07:b:d-1:context:21"
        ],
        "forbidAtomIds": [
          "neighbor-07:b:d-1:admission:50",
          "neighbor-07:b:d-1:unlock:s5:0"
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
      "id": "neighbor-07:beat_v2:b:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "먼저 위반한 쪽이 있었다는 판단은 유지합니다. 하지만 제가 과거 사례를 끌어와 지금 사람까지 한데 묶은 건 과했을 수 있죠.",
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
          "neighbor-07:b:d-1:context:21",
          "neighbor-07:b:d-1:evidence:20"
        ],
        "forbidAtomIds": [
          "neighbor-07:b:d-1:admission:50",
          "neighbor-07:b:d-1:unlock:s5:0"
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
        "d-1:surface:identity_pressed"
      ]
    },
    {
      "id": "neighbor-07:beat_v2:b:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "그 자리를 또 그렇게 두면 결국 누가 치웁니까, 저는 그 꼴을 이미 봤어요.",
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
          "neighbor-07:b:d-1:emotion:41",
          "neighbor-07:b:d-1:responsibility:51"
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
      "id": "neighbor-07:beat_v2:a:d-2:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "제가 먼저 몰아붙인 게 아니라, 권성호 씨가 관리실 답도 나오기 전에 자물쇠를 걸고 공개 경고부터 올린 거예요.",
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
          "neighbor-07:a:d-2:timeline:1",
          "neighbor-07:a:d-2:act:0"
        ],
        "forbidAtomIds": [
          "neighbor-07:a:d-2:admission:50",
          "neighbor-07:a:d-2:unlock:s5:0"
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
      "id": "neighbor-07:beat_v2:a:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "규정이 걱정되셨다는 건 알겠지만, 저를 특정한 글을 먼저 올리고 직접 잠근 건 절차를 건너뛴 거라고 봐요.",
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
          "neighbor-07:a:d-2:act:0",
          "neighbor-07:a:d-2:timeline:1"
        ],
        "forbidAtomIds": [
          "neighbor-07:a:d-2:admission:50",
          "neighbor-07:a:d-2:unlock:s5:0"
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
      "id": "neighbor-07:beat_v2:a:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "자물쇠를 단 시점과 공개 글이 관리실보다 먼저였다는 건 분명해요. 다만 제가 먼저 물건을 넣은 뒤라서 일이 더 세게 번진 건 맞아요.",
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
          "neighbor-07:a:d-2:counter:30",
          "neighbor-07:a:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "neighbor-07:a:d-2:admission:50",
          "neighbor-07:a:d-2:unlock:s5:0"
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
      "id": "neighbor-07:beat_v2:a:d-2:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "제가 먼저 잘못한 부분이 있어도, 권성호 씨가 직접 잠그고 단지앱에 올린 건 별개의 과한 대응이었어요.",
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
          "neighbor-07:a:d-2:admission:21",
          "neighbor-07:a:d-2:evidence:20"
        ],
        "forbidAtomIds": [
          "neighbor-07:a:d-2:admission:50",
          "neighbor-07:a:d-2:unlock:s5:0"
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
      "id": "neighbor-07:beat_v2:a:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "첫날부터 제가 문제 세대처럼 올라간 기분이 얼마나 창피했는지 아세요?",
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
          "neighbor-07:a:d-2:relationship:41",
          "neighbor-07:a:d-2:shame:40"
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
      "id": "neighbor-07:beat_v2:b:d-2:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "내가 한 건 봉쇄가 아니라 임시 안전조치입니다. 관리실이 오기 전까지 또 넘어가면 안 되니까 잠깐 막아 둔 거예요.",
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
          "neighbor-07:b:d-2:act:0",
          "neighbor-07:b:d-2:rule:11"
        ],
        "forbidAtomIds": [
          "neighbor-07:b:d-2:admission:50",
          "neighbor-07:b:d-2:unlock:s5:0"
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
      "id": "neighbor-07:beat_v2:b:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "공개 글도 사람을 망신주려던 게 아니라 다른 세대에 상황을 알리려던 겁니다. 규정은 규정이니까요.",
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
          "neighbor-07:b:d-2:act:0",
          "neighbor-07:b:d-2:motive:1"
        ],
        "forbidAtomIds": [
          "neighbor-07:b:d-2:admission:50",
          "neighbor-07:b:d-2:unlock:s5:0"
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
      "id": "neighbor-07:beat_v2:b:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "자물쇠를 내가 먼저 건 건 맞습니다. 다만 그때는 관리실 답이 늦고, 내가 안 막으면 또 그대로 굳어질 거라고 봤어요.",
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
          "neighbor-07:b:d-2:harm:31",
          "neighbor-07:b:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "neighbor-07:b:d-2:admission:50",
          "neighbor-07:b:d-2:unlock:s5:0"
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
      "id": "neighbor-07:beat_v2:b:d-2:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "사실 관리실보다 내 판단이 먼저 나간 건 인정합니다. 공개 글까지 올린 건 선을 넘은 대응으로 보일 수 있죠.",
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
          "neighbor-07:b:d-2:self_justification:21",
          "neighbor-07:b:d-2:admission:20"
        ],
        "forbidAtomIds": [
          "neighbor-07:b:d-2:admission:50",
          "neighbor-07:b:d-2:unlock:s5:0"
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
      "id": "neighbor-07:beat_v2:b:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "내가 안 막았으면 또 넘어갔습니다, 가만히 보라고만 할 수는 없었어요.",
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
          "neighbor-07:b:d-2:emotion:41",
          "neighbor-07:b:d-2:fear:40"
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
      "id": "neighbor-07:beat_v2:a:d-5:motive:pressure:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "관리실이 먼저라는 걸 알면서도, 유모차랑 박스를 먼저 넣어 둔 건 맞아요. 그때는 곧 확인하면 된다고 안일하게 봤어요.",
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
          "neighbor-07:a:d-5:admission:20",
          "neighbor-07:a:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor-07:a:d-5:admission:50",
          "neighbor-07:a:d-5:unlock:s5:0"
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
      "id": "neighbor-07:beat_v2:b:d-5:motive:pressure:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "관리실 답보다 제 조치가 먼저 간 건 맞습니다. 그때는 공개 글까지 올려야 다른 세대도 경계할 거라고 생각했습니다.",
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
          "neighbor-07:b:d-5:admission:30",
          "neighbor-07:b:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor-07:b:d-5:admission:50",
          "neighbor-07:b:d-5:unlock:s5:0"
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
      "id": "neighbor-07:beat_v2:a:d-1:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "counter",
      "line": "잠금함을 확인만 했다면서, 영상엔 유모차와 박스를 넣는 동선이 남습니다.",
      "behaviorHint": "제시된 자료를 힐끗 확인한 뒤 상황 전체를 손짓으로 그리듯 설명한다.",
      "applicableStates": [
        "S0",
        "S1"
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
          "neighbor-07:a:d-1:responsibility:1",
          "neighbor-07:a:d-1:context:10"
        ],
        "forbidAtomIds": [
          "neighbor-07:a:d-1:admission:50",
          "neighbor-07:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 6,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:evidence:context",
      "coverageKey": "a:d-1:surface:early:evidence:context",
      "variantTarget": 1,
      "setFlags": [
        "d-1:surface:evidence_pressed"
      ],
      "tags": [
        "evidence"
      ],
      "evidenceIds": [
        "e-2"
      ]
    },
    {
      "id": "neighbor-07:beat_v2:a:d-3:surface:evidence:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "counter",
      "line": "그 메모가 허가서라면, 왜 승인대장과 퇴거 반납 공지엔 종료 기록만 남아 있습니까?",
      "behaviorHint": "제시된 자료를 힐끗 확인한 뒤 변명과 이유가 섞이며 문장이 길어진다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
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
          "neighbor-07:a:d-3:relationship:11",
          "neighbor-07:a:d-3:identity:0"
        ],
        "forbidAtomIds": [
          "neighbor-07:a:d-3:admission:50",
          "neighbor-07:a:d-3:unlock:s5:0"
        ]
      },
      "weight": 6,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:evidence:motive",
      "coverageKey": "a:d-3:surface:early:evidence:motive",
      "variantTarget": 1,
      "setFlags": [
        "d-3:surface:evidence_pressed"
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
      "id": "neighbor-07:beat_v2:b:d-2:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "안전조치라면서 관리실 답보다 자물쇠와 공개 글이 먼저였습니다.",
      "behaviorHint": "제시된 자료를 힐끗 확인한 뒤 약속·규정·절차를 꺼내며 선을 긋는다.",
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
          "neighbor-07:b:d-2:harm:31",
          "neighbor-07:b:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "neighbor-07:b:d-2:admission:50",
          "neighbor-07:b:d-2:unlock:s5:0"
        ]
      },
      "weight": 6,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:evidence:legality",
      "coverageKey": "b:d-2:motive:mid:evidence:legality",
      "variantTarget": 1,
      "setFlags": [
        "d-2:motive:evidence_pressed"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-2:surface:timeline_pressed"
      ],
      "evidenceIds": [
        "e-4",
        "e-5"
      ]
    },
    {
      "id": "neighbor-07:beat_v2:b:d-3:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "전 세입자 음성은 기억일 뿐이고, 관리기록은 한시 허가 종료를 가리킵니다.",
      "behaviorHint": "제시된 자료를 힐끗 확인한 뒤 상황 전체를 손짓으로 그리듯 설명한다.",
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
          "neighbor-07:b:d-3:context:21",
          "neighbor-07:b:d-3:responsibility:31"
        ],
        "forbidAtomIds": [
          "neighbor-07:b:d-3:admission:50",
          "neighbor-07:b:d-3:unlock:s5:0"
        ]
      },
      "weight": 6,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:evidence:context",
      "coverageKey": "b:d-3:motive:mid:evidence:context",
      "variantTarget": 1,
      "setFlags": [
        "d-3:motive:evidence_pressed"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-3:surface:timeline_pressed"
      ],
      "evidenceIds": [
        "e-3",
        "e-6"
      ]
    },
    {
      "id": "neighbor-07:beat_v2:a:d-1:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "fatigue",
      "line": "옛 열쇠 건은 이미 말씀드렸습니다. 같은 시점만 반복해서 묻는다고 순서가 달라지진 않습니다.",
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
          "neighbor-07:a:d-1:unlock:s3:0",
          "neighbor-07:a:d-1:admission:20"
        ],
        "forbidAtomIds": [
          "neighbor-07:a:d-1:admission:50",
          "neighbor-07:a:d-1:unlock:s5:0"
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
      "id": "neighbor-07:beat_v2:a:d-1:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "fatigue",
      "line": "제 쪽 책임만 떼어 묻지 마세요. 옛 열쇠 문제는 전체 흐름으로 같이 봐야 합니다.",
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
          "neighbor-07:a:d-1:admission:30",
          "neighbor-07:a:d-1:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "neighbor-07:a:d-1:admission:50",
          "neighbor-07:a:d-1:unlock:s5:0"
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
      "id": "neighbor-07:beat_v2:a:d-1:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "fatigue",
      "line": "지금처럼 몰아붙이면 저도 차분하게만은 못 답합니다. 옛 열쇠를 한쪽 잘못처럼 정리하는 건 받아들이기 어렵습니다.",
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
          "neighbor-07:a:d-1:admission:30",
          "neighbor-07:a:d-1:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "neighbor-07:a:d-1:admission:50",
          "neighbor-07:a:d-1:unlock:s5:0"
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
      "id": "neighbor-07:beat_v2:b:d-2:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "fatigue",
      "line": "사적 자물쇠 건은 이미 말씀드렸습니다. 같은 시점만 반복해서 묻는다고 순서가 달라지진 않습니다.",
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
          "neighbor-07:b:d-2:admission:30",
          "neighbor-07:b:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor-07:b:d-2:admission:50",
          "neighbor-07:b:d-2:unlock:s5:0"
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
      "id": "neighbor-07:beat_v2:b:d-2:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "fatigue",
      "line": "제 쪽 책임만 떼어 묻지 마세요. 사적 자물쇠 문제는 전체 흐름으로 같이 봐야 합니다.",
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
          "neighbor-07:b:d-2:harm:31",
          "neighbor-07:b:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "neighbor-07:b:d-2:admission:50",
          "neighbor-07:b:d-2:unlock:s5:0"
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
      "id": "neighbor-07:beat_v2:b:d-2:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "fatigue",
      "line": "지금처럼 몰아붙이면 저도 차분하게만은 못 답합니다. 사적 자물쇠를 한쪽 잘못처럼 정리하는 건 받아들이기 어렵습니다.",
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
          "neighbor-07:b:d-2:harm:31",
          "neighbor-07:b:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "neighbor-07:b:d-2:admission:50",
          "neighbor-07:b:d-2:unlock:s5:0"
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
      "id": "neighbor-07:beat_v2:a:d-1:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "이사 첫날 관리실 확인 전에 전 세입자 열쇠로 8층 잠금함을 열고 유모차와 박스를 넣어 둔 건 제 판단 미스였어요.",
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
          "neighbor-07:a:d-1:fear:40",
          "neighbor-07:a:d-1:unlock:s4:0"
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
      "id": "neighbor-07:beat_v2:a:d-1:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "저도 겁나서 그랬던 거예요, 처음부터 남의 걸 빼앗으려던 게 아니에요.",
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
          "neighbor-07:a:d-1:fear:40",
          "neighbor-07:a:d-1:unlock:s4:0"
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
      "id": "neighbor-07:beat_v2:b:d-2:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "내가 관리실 조치 전에 자물쇠를 추가로 걸고 공개 경고까지 올린 건 맞습니다. 안전을 걱정한 건 사실이지만, 그걸 이유로 절차를 건너뛴 건 내 책임입니다.",
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
          "neighbor-07:b:d-2:emotion:41",
          "neighbor-07:b:d-2:unlock:s4:0"
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
      "id": "neighbor-07:beat_v2:b:d-2:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "내가 안 막았으면 또 넘어갔습니다, 가만히 보라고만 할 수는 없었어요.",
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
          "neighbor-07:b:d-2:emotion:41",
          "neighbor-07:b:d-2:fear:40"
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
      "id": "neighbor-07:beat_v2:a:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "문 안쪽 표시도 그렇고 전 세입자도 그렇게 말해서, 저는 그 잠금함이 803호가 이어 쓰던 칸인 줄 알았어요.",
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
          "neighbor-07:a:d-3:identity:0",
          "neighbor-07:a:d-3:relationship:11"
        ],
        "forbidAtomIds": [
          "neighbor-07:a:d-3:admission:50",
          "neighbor-07:a:d-3:unlock:s5:0"
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
      "id": "neighbor-07:beat_v2:b:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "그 잠금함은 원래 803 쪽이 쓰던 자리로 봐야 합니다. 전 세입자 때부터 그렇게 굴러왔으니까요.",
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
          "neighbor-07:b:d-3:legacy_sentence:1",
          "neighbor-07:b:d-3:context:10"
        ],
        "forbidAtomIds": [
          "neighbor-07:b:d-3:admission:50",
          "neighbor-07:b:d-3:unlock:s5:0"
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
      "id": "neighbor-07:beat_v2:a:d-3:core:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "새집에서 뭘 하나 잘못 집으면 바로 무단 점유한 사람처럼 보일까 봐, 눈앞의 표시를 사실상 허가처럼 붙잡고 있었어요.",
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
          "neighbor-07:a:d-3:responsibility:31",
          "neighbor-07:a:d-3:unlock:s3:0"
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
      "id": "neighbor-07:beat_v2:b:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "그 자리를 또 그렇게 두면 결국 누가 치웁니까, 저는 그 꼴을 이미 봤어요.",
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
          "neighbor-07:b:d-3:emotion:41",
          "neighbor-07:b:d-3:fear:40"
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
      "id": "neighbor-07:beat_v2:a:d-4:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "메모랑 '803' 표시가 안쪽에 붙어 있었으니 저는 그게 사실상 허락 표시인 줄 알았어요.",
      "behaviorHint": "대상이나 표식을 집어 말하며 특정성을 강조한다.",
      "applicableStates": [
        "S0",
        "S1",
        "S2"
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
          "neighbor-07:a:d-4:identity:0",
          "neighbor-07:a:d-4:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor-07:a:d-4:admission:50",
          "neighbor-07:a:d-4:unlock:s5:0"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:trap:identity",
      "coverageKey": "a:d-4:surface:early:trap:identity",
      "variantTarget": 1,
      "setFlags": [
        "d-4:surface:misbelief_rattled"
      ],
      "tags": [
        "red_herring",
        "hot"
      ]
    },
    {
      "id": "neighbor-07:beat_v2:b:d-4:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "메모 한 장하고 '803' 스티커가 무슨 공식 허가입니까. 그런 건 개인 흔적이지 관리실 승인 표시가 아니죠.",
      "behaviorHint": "상황 전체를 손짓으로 그리듯 설명한다.",
      "applicableStates": [
        "S0",
        "S1",
        "S2"
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
          "neighbor-07:b:d-4:admission:21",
          "neighbor-07:b:d-4:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor-07:b:d-4:admission:50",
          "neighbor-07:b:d-4:unlock:s5:0"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:surface:trap:context",
      "coverageKey": "b:d-4:surface:early:trap:context",
      "variantTarget": 1,
      "setFlags": [
        "d-4:surface:misbelief_rattled"
      ],
      "tags": [
        "red_herring",
        "hot"
      ]
    },
    {
      "id": "neighbor-07:beat_v2:a:d-4:core:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "저도 겁나서 그랬던 거예요, 처음부터 남의 걸 빼앗으려던 게 아니에요.",
      "behaviorHint": "상황 전체를 손짓으로 그리듯 설명한다.",
      "applicableStates": [
        "S3",
        "S4",
        "S5"
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
          "neighbor-07:a:d-4:shame:41",
          "neighbor-07:a:d-4:unlock:s3:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:core:trap:context",
      "coverageKey": "a:d-4:core:late:trap:context",
      "variantTarget": 1,
      "setFlags": [
        "d-4:core:misbelief_softened"
      ],
      "tags": [
        "red_herring",
        "late"
      ],
      "requiresFlags": [
        "d-4:surface:misbelief_rattled"
      ]
    },
    {
      "id": "neighbor-07:beat_v2:b:d-4:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "이런 흔적은 늘 문제를 부릅니다. 그래서 차분히 확인하기보다 '또 시작이네' 하고 세게 나갔습니다.",
      "behaviorHint": "호흡이 짧아지고 표정이 무너진다.",
      "applicableStates": [
        "S3",
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "red_herring",
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
          "neighbor-07:b:d-4:emotion:31",
          "neighbor-07:b:d-4:emotion:41"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:core:trap:emotion",
      "coverageKey": "b:d-4:core:late:trap:emotion",
      "variantTarget": 1,
      "setFlags": [
        "d-4:core:misbelief_softened"
      ],
      "tags": [
        "red_herring",
        "late"
      ],
      "requiresFlags": [
        "d-4:surface:misbelief_rattled"
      ]
    },
    {
      "id": "neighbor-07:beat_v2:a:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "저도 겁나서 그랬던 거예요, 처음부터 남의 걸 빼앗으려던 게 아니에요.",
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
          "neighbor-07:a:d-1:fear:40",
          "neighbor-07:a:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-1:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 4,
      "setFlags": [],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "neighbor-07:beat_v2:a:d-1:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
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
          "neighbor-07:a:d-1:fear:40",
          "neighbor-07:a:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-1:surface:mid:interjection:emotional_only:block",
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
      "id": "neighbor-07:beat_v2:b:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "내가 안 막았으면 또 넘어갔습니다, 가만히 보라고만 할 수는 없었어요.",
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
          "neighbor-07:b:d-2:emotion:41",
          "neighbor-07:b:d-2:fear:40"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-2:surface:mid:interjection:emotional_only:allow",
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
      "id": "neighbor-07:beat_v2:b:d-2:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
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
          "neighbor-07:b:d-2:emotion:41",
          "neighbor-07:b:d-2:fear:40"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-2:surface:mid:interjection:emotional_only:block",
      "variantTarget": 4,
      "setFlags": [],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "neighbor-07:beat_v2:a:d-1:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "잠금함을 확인만 했다면서, 영상엔 유모차와 박스를 넣는 동선이 남습니다.",
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
          "neighbor-07:a:d-1:context:21",
          "neighbor-07:a:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor-07:a:d-1:admission:50",
          "neighbor-07:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-1:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 4,
      "setFlags": [],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "neighbor-07:beat_v2:a:d-1:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "옛 열쇠와 8층 잠금함부터 바로 보죠. 흐린 표현으로 넘길 문제는 아닙니다.",
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
          "neighbor-07:a:d-1:context:21",
          "neighbor-07:a:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor-07:a:d-1:admission:50",
          "neighbor-07:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
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
      "id": "neighbor-07:beat_v2:b:d-2:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "안전조치라면서 관리실 답보다 자물쇠와 공개 글이 먼저였습니다.",
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
          "neighbor-07:b:d-2:admission:20",
          "neighbor-07:b:d-2:self_justification:21"
        ],
        "forbidAtomIds": [
          "neighbor-07:b:d-2:admission:50",
          "neighbor-07:b:d-2:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-2:surface:mid:interjection:detail_rebuttal:allow",
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
      "id": "neighbor-07:beat_v2:b:d-2:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "지금은 사적 자물쇠와 공개 경고 같은 구체 디테일부터 바로잡아야 합니다.",
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
          "neighbor-07:b:d-2:admission:20",
          "neighbor-07:b:d-2:self_justification:21"
        ],
        "forbidAtomIds": [
          "neighbor-07:b:d-2:admission:50",
          "neighbor-07:b:d-2:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-2:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 4,
      "setFlags": [],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "neighbor-07:beat_v2:a:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "공용 비상물품함 같은 한 조각만 붙잡으면 오해가 더 커집니다. 그 전제부터 다시 흔들어야 합니다.",
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
          "neighbor-07:a:d-3:context:21",
          "neighbor-07:a:d-3:admission:20"
        ],
        "forbidAtomIds": [
          "neighbor-07:a:d-3:admission:50",
          "neighbor-07:a:d-3:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 4,
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
      "id": "neighbor-07:beat_v2:b:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "803 전용 아님 하나만으로 몰고 가면 더 꼬입니다. 그 전제부터 다시 묻는 건 아직 이릅니다.",
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
          "neighbor-07:b:d-3:admission:30",
          "neighbor-07:b:d-3:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "neighbor-07:b:d-3:admission:50",
          "neighbor-07:b:d-3:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 4,
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
      "id": "neighbor-07:beat_v2:a:d-4:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "interject",
      "line": "'승인 주체와 기간이 빠진 메모다' 같은 단서만으로는 아직 부족합니다. 그걸 사실처럼 밀면 본안이 더 어그러집니다.",
      "behaviorHint": "말을 끊고 상체를 앞으로 숙이며 짧게 치고 들어온다.",
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
        "misconceptionStates": [
          "M1",
          "M2"
        ],
        "trapStates": [
          "trap_suspected"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor-07:a:d-4:admission:20",
          "neighbor-07:a:d-4:unlock:s2:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-4:surface:mid:interjection:trap_signal:allow",
      "variantTarget": 4,
      "setFlags": [],
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
      "id": "neighbor-07:beat_v2:b:d-4:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-07",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "interject",
      "line": "'스티커는 사적 인수인계 흔적일 뿐이다' 같은 빈칸이 남은 자료로 단정하면 안 됩니다. 지금 단계에선 함정 신호에 가깝습니다.",
      "behaviorHint": "말을 끊고 상체를 앞으로 숙이며 짧게 치고 들어온다.",
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
          "M1",
          "M2"
        ],
        "trapStates": [
          "trap_suspected"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor-07:b:d-4:admission:21",
          "neighbor-07:b:d-4:unlock:s2:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-4:surface:mid:interjection:trap_signal:block",
      "variantTarget": 4,
      "setFlags": [],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "trap_signal",
        "red_herring"
      ],
      "beliefMode": "suspects"
    }
  ]
} as const;

export default neighbor-07BeatsV2Full;
