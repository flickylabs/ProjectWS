export const neighbor10BeatsV2Full = {
  "caseId": "neighbor-10",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 60,
    "byActionFamily": {
      "question": 28,
      "free_question": 4,
      "evidence": 4,
      "fatigue": 12,
      "interjection": 12
    },
    "byResponseIntent": {
      "pressure_response": 16,
      "motive_response": 6,
      "rapport_response": 10,
      "trap_confusion_response": 12,
      "evidence_response": 4,
      "fatigue_response": 12
    },
    "byIssueRole": {
      "core_truth": 40,
      "shared_misconception": 12,
      "sub_truth": 8
    },
    "byDisputeId": {
      "d-1": 20,
      "d-4": 20,
      "d-3": 12,
      "d-2": 4,
      "d-5": 4
    },
    "interjectionByInfoLevel": {
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
      "evidence_early_or_mid_context_identity_legality": true,
      "fatigue_mid_responsibility_or_timeline": true,
      "free_question_late_motive_or_emotion": true,
      "interjection_emotional_only_allow_block": true,
      "interjection_detail_rebuttal_allow_block": true,
      "interjection_misbelief_or_trap_if_needed": true,
      "trap_early_identity_or_context": true,
      "trap_late_context_or_emotion": true
    }
  },
  "beats": [
    {
      "id": "neighbor10:beat_v2:a:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "저는 민우를 도둑으로 단정한 게 아니라, 하윤이 울면서 들어와서 같이 확인해 달라는 뜻으로 글을 올렸어요.",
      "behaviorHint": "즉답보다 순서와 표현을 길게 늘어놓으며 핵심을 늦춘다.",
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
          "neighbor10:a:d-1:act:0",
          "neighbor10:a:d-1:denial:0",
          "neighbor10:a:d-1:timeline:0"
        ],
        "forbidAtomIds": [
          "neighbor10:a:d-1:admission:0",
          "neighbor10:a:d-1:relationship:1"
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
      "id": "neighbor10:beat_v2:a:d-1:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "이름을 적은 건 맞지만, 그때는 너무 급했고 의심 상황을 공유한 거였어요.",
      "behaviorHint": "즉답보다 순서와 표현을 길게 늘어놓으며 핵심을 늦춘다.",
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
          "neighbor10:a:d-1:act:0",
          "neighbor10:a:d-1:denial:0",
          "neighbor10:a:d-1:timeline:0"
        ],
        "forbidAtomIds": [
          "neighbor10:a:d-1:admission:0",
          "neighbor10:a:d-1:relationship:1"
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
        "d-1:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "neighbor10:beat_v2:a:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "counter",
      "line": "제가 서두른 건 맞지만, 정훈 씨도 바로 사실 설명을 해주지 않았잖아요. 그 공백이 더 불안을 키웠어요.",
      "behaviorHint": "부분 인정과 반발을 섞어 책임선을 다시 그으려 든다.",
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
          "neighbor10:a:d-1:responsibility:0",
          "neighbor10:a:d-1:emotion:0",
          "neighbor10:a:d-1:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor10:a:d-1:admission:0",
          "neighbor10:a:d-1:relationship:1"
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
        "d-1:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "neighbor10:beat_v2:a:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "네, 공개 글이 먼저 나간 건 제 불찰이에요. 하지만 그 순간엔 하윤이 정말 가져간 줄 알고 있었습니다.",
      "behaviorHint": "부분 인정과 반발을 섞어 책임선을 다시 그으려 든다.",
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
          "neighbor10:a:d-1:responsibility:0",
          "neighbor10:a:d-1:emotion:0",
          "neighbor10:a:d-1:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor10:a:d-1:admission:0",
          "neighbor10:a:d-1:relationship:1"
        ]
      },
      "weight": 5,
      "priority": 26,
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
      ]
    },
    {
      "id": "neighbor10:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "하윤이 울던 얼굴이 너무 크게 남았어요. 확인보다 아이를 보호해야 한다는 생각이 먼저 튀어나왔습니다.",
      "behaviorHint": "버티다가 감정이 먼저 새어 나오고 목소리가 낮아진다.",
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
          "neighbor10:a:d-1:emotion:1",
          "neighbor10:a:d-1:relationship:0",
          "neighbor10:a:d-1:admission:0"
        ],
        "forbidAtomIds": [
          "neighbor10:a:d-1:act:0",
          "neighbor10:a:d-1:denial:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-1:core:emotion_opened"
      ],
      "tags": [
        "late"
      ]
    },
    {
      "id": "neighbor10:beat_v2:a:d-1:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confess",
      "line": "굳이 더 말하자면, 직접 확인보다 공개 글이 먼저였고, 그건 제 책임입니다. 의심이라고 써도 민우에게는 공개 절도 암시가 됐습니다.",
      "behaviorHint": "정형 질문보다 더 사적인 속내를 조심스럽게 꺼낸다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "motive_response",
      "angleTag": "motive",
      "actionFamily": "free_question",
      "questionTypes": [],
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
          "neighbor10:a:d-1:emotion:1",
          "neighbor10:a:d-1:relationship:0",
          "neighbor10:a:d-1:admission:0"
        ],
        "forbidAtomIds": [
          "neighbor10:a:d-1:act:0",
          "neighbor10:a:d-1:denial:0"
        ]
      },
      "weight": 4,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:motive:motive",
      "coverageKey": "a:d-1:core:late:motive:motive",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:free_disclosed"
      ],
      "tags": [
        "late_probe",
        "free_question"
      ]
    },
    {
      "id": "neighbor10:beat_v2:b:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "소연 씨가 우리 애를 공개적으로 몰아간 건 분명합니다. 의심이라고 적었어도 다들 민우 이름부터 봤어요.",
      "behaviorHint": "즉답보다 순서와 표현을 길게 늘어놓으며 핵심을 늦춘다.",
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
          "neighbor10:b:d-1:harm:0",
          "neighbor10:b:d-1:fear:0",
          "neighbor10:b:d-1:identity:0"
        ],
        "forbidAtomIds": [
          "neighbor10:b:d-1:admission:0",
          "neighbor10:b:d-1:relationship:1"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:timeline",
      "coverageKey": "b:d-1:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "neighbor10:beat_v2:b:d-1:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "'의심'이라고 써도 실명과 한정판 종류가 같이 돌면 이미 공개 지목입니다.",
      "behaviorHint": "즉답보다 순서와 표현을 길게 늘어놓으며 핵심을 늦춘다.",
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
          "neighbor10:b:d-1:harm:0",
          "neighbor10:b:d-1:fear:0",
          "neighbor10:b:d-1:identity:0"
        ],
        "forbidAtomIds": [
          "neighbor10:b:d-1:admission:0",
          "neighbor10:b:d-1:relationship:1"
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
        "d-1:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "neighbor10:beat_v2:b:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "counter",
      "line": "그 글이 먼저였기에 저도 예민해졌습니다. 우리 애 평판을 바로 막아야 한다고 느꼈어요.",
      "behaviorHint": "부분 인정과 반발을 섞어 책임선을 다시 그으려 든다.",
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
          "neighbor10:b:d-1:evidence:0",
          "neighbor10:b:d-1:responsibility:0",
          "neighbor10:b:d-1:beneficiary:0"
        ],
        "forbidAtomIds": [
          "neighbor10:b:d-1:admission:0",
          "neighbor10:b:d-1:relationship:1"
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
        "d-1:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "neighbor10:beat_v2:b:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "채팅 캡처를 보면 우리 애가 먼저 특정된 건 부정할 수 없죠.",
      "behaviorHint": "부분 인정과 반발을 섞어 책임선을 다시 그으려 든다.",
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
          "neighbor10:b:d-1:evidence:0",
          "neighbor10:b:d-1:responsibility:0",
          "neighbor10:b:d-1:beneficiary:0"
        ],
        "forbidAtomIds": [
          "neighbor10:b:d-1:admission:0",
          "neighbor10:b:d-1:relationship:1"
        ]
      },
      "weight": 5,
      "priority": 26,
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
      "id": "neighbor10:beat_v2:b:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "우리 애 이름이 먼저 돈 순간, 저는 그게 제일 무서웠습니다. 민우가 사실보다 이미지로 남을까 봐요.",
      "behaviorHint": "버티다가 감정이 먼저 새어 나오고 목소리가 낮아진다.",
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
          "neighbor10:b:d-1:emotion:0",
          "neighbor10:b:d-1:relationship:0",
          "neighbor10:b:d-1:admission:0"
        ],
        "forbidAtomIds": [
          "neighbor10:b:d-1:harm:0",
          "neighbor10:b:d-1:fear:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:rapport:emotion",
      "coverageKey": "b:d-1:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-1:core:emotion_opened"
      ],
      "tags": [
        "late"
      ]
    },
    {
      "id": "neighbor10:beat_v2:b:d-1:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confess",
      "line": "굳이 더 말하자면, 소연 씨 공개 글이 먼저였고 그건 분명 잘못이지만, 그걸 핑계로 제 대응까지 정당화할 수는 없습니다.",
      "behaviorHint": "정형 질문보다 더 사적인 속내를 조심스럽게 꺼낸다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "motive_response",
      "angleTag": "motive",
      "actionFamily": "free_question",
      "questionTypes": [],
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
          "neighbor10:b:d-1:emotion:0",
          "neighbor10:b:d-1:relationship:0",
          "neighbor10:b:d-1:admission:0"
        ],
        "forbidAtomIds": [
          "neighbor10:b:d-1:harm:0",
          "neighbor10:b:d-1:fear:0"
        ]
      },
      "weight": 4,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:motive:motive",
      "coverageKey": "b:d-1:core:late:motive:motive",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:free_disclosed"
      ],
      "tags": [
        "late_probe",
        "free_question"
      ]
    },
    {
      "id": "neighbor10:beat_v2:a:d-4:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "규칙 오해만으로 저렇게 울 일이었는지는 아직 잘 모르겠습니다. 그땐 더 나쁜 일이 있었던 줄 알았어요.",
      "behaviorHint": "즉답보다 순서와 표현을 길게 늘어놓으며 핵심을 늦춘다.",
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
          "neighbor10:a:d-4:uncertainty:0",
          "neighbor10:a:d-4:fear:0",
          "neighbor10:a:d-4:rule:0"
        ],
        "forbidAtomIds": [
          "neighbor10:a:d-4:admission:0",
          "neighbor10:a:d-4:relationship:1"
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
        "d-4:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "neighbor10:beat_v2:a:d-4:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "규칙 얘기가 있었을 수는 있죠. 그래도 그 순간엔 민우 쪽이 더 세게 밀어붙인 줄 알았습니다.",
      "behaviorHint": "즉답보다 순서와 표현을 길게 늘어놓으며 핵심을 늦춘다.",
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
          "neighbor10:a:d-4:uncertainty:0",
          "neighbor10:a:d-4:fear:0",
          "neighbor10:a:d-4:rule:0"
        ],
        "forbidAtomIds": [
          "neighbor10:a:d-4:admission:0",
          "neighbor10:a:d-4:relationship:1"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:pressure:context",
      "coverageKey": "a:d-4:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-4:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "neighbor10:beat_v2:a:d-4:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "counter",
      "line": "다만 그런 오해가 쌓이게 된 건 부모가 규칙을 제대로 정리해 주지 않은 탓도 있습니다.",
      "behaviorHint": "부분 인정과 반발을 섞어 책임선을 다시 그으려 든다.",
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
          "neighbor10:a:d-4:institution:0",
          "neighbor10:a:d-4:context:0",
          "neighbor10:a:d-4:responsibility:0"
        ],
        "forbidAtomIds": [
          "neighbor10:a:d-4:admission:0",
          "neighbor10:a:d-4:relationship:1"
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
        "d-4:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "neighbor10:beat_v2:a:d-4:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "교사 메모를 보니 둘이 규칙을 다르게 이해한 건 맞네요.",
      "behaviorHint": "부분 인정과 반발을 섞어 책임선을 다시 그으려 든다.",
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
          "neighbor10:a:d-4:institution:0",
          "neighbor10:a:d-4:context:0",
          "neighbor10:a:d-4:responsibility:0"
        ],
        "forbidAtomIds": [
          "neighbor10:a:d-4:admission:0",
          "neighbor10:a:d-4:relationship:1"
        ]
      },
      "weight": 5,
      "priority": 26,
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
      "id": "neighbor10:beat_v2:a:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "emotional",
      "line": "하윤이 한정판에 예민했고, 저는 그 예민함을 불안으로만 읽었습니다. 그래서 규칙 오해 설명이 늦었어요.",
      "behaviorHint": "버티다가 감정이 먼저 새어 나오고 목소리가 낮아진다.",
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
          "neighbor10:a:d-4:emotion:0",
          "neighbor10:a:d-4:shame:0",
          "neighbor10:a:d-4:admission:0"
        ],
        "forbidAtomIds": [
          "neighbor10:a:d-4:uncertainty:0",
          "neighbor10:a:d-4:fear:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:core:rapport:emotion",
      "coverageKey": "a:d-4:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-4:core:emotion_opened"
      ],
      "tags": [
        "late"
      ]
    },
    {
      "id": "neighbor10:beat_v2:a:d-4:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confess",
      "line": "정형 질문이 아니라면 하윤이 한정판에 예민했고, 저는 그 예민함을 불안으로만 읽었습니다. 그래서 규칙 오해 설명이 늦었어요.",
      "behaviorHint": "정형 질문보다 더 사적인 속내를 조심스럽게 꺼낸다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "free_question",
      "questionTypes": [],
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
          "neighbor10:a:d-4:emotion:0",
          "neighbor10:a:d-4:shame:0",
          "neighbor10:a:d-4:admission:0"
        ],
        "forbidAtomIds": [
          "neighbor10:a:d-4:uncertainty:0",
          "neighbor10:a:d-4:fear:0"
        ]
      },
      "weight": 4,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:core:rapport:emotion",
      "coverageKey": "a:d-4:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-4:core:free_disclosed"
      ],
      "tags": [
        "late_probe",
        "free_question"
      ]
    },
    {
      "id": "neighbor10:beat_v2:b:d-4:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "오해라고 보기엔 하윤 쪽이 먼저 교환이 끝난 것처럼 받아들인 겁니다. 민우는 자기 기준대로 보고 있었어요.",
      "behaviorHint": "즉답보다 순서와 표현을 길게 늘어놓으며 핵심을 늦춘다.",
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
          "neighbor10:b:d-4:denial:0",
          "neighbor10:b:d-4:beneficiary:0",
          "neighbor10:b:d-4:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor10:b:d-4:admission:0",
          "neighbor10:b:d-4:relationship:0"
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
        "d-4:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "neighbor10:beat_v2:b:d-4:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "규칙을 다르게 이해했을 가능성은 있겠죠. 그래도 먼저 울음으로 번진 쪽은 하윤이었습니다.",
      "behaviorHint": "즉답보다 순서와 표현을 길게 늘어놓으며 핵심을 늦춘다.",
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
          "neighbor10:b:d-4:denial:0",
          "neighbor10:b:d-4:beneficiary:0",
          "neighbor10:b:d-4:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor10:b:d-4:admission:0",
          "neighbor10:b:d-4:relationship:0"
        ]
      },
      "weight": 6,
      "priority": 30,
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
      "id": "neighbor10:beat_v2:b:d-4:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "counter",
      "line": "그래도 하윤 쪽이 규칙을 자주 바꾼다고 느낀 누적이 있었어요. 이번 일만 뚝 떼서 보면 민우도 억울합니다.",
      "behaviorHint": "부분 인정과 반발을 섞어 책임선을 다시 그으려 든다.",
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
          "neighbor10:b:d-4:institution:0",
          "neighbor10:b:d-4:beneficiary:1",
          "neighbor10:b:d-4:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor10:b:d-4:admission:0",
          "neighbor10:b:d-4:relationship:0"
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
        "d-4:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "neighbor10:beat_v2:b:d-4:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "교사 메모대로 서로 다르게 받아들인 건 맞습니다. 다만 민우 입장에선 갑자기 판이 바뀐 느낌이었을 거예요.",
      "behaviorHint": "부분 인정과 반발을 섞어 책임선을 다시 그으려 든다.",
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
          "neighbor10:b:d-4:institution:0",
          "neighbor10:b:d-4:beneficiary:1",
          "neighbor10:b:d-4:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor10:b:d-4:admission:0",
          "neighbor10:b:d-4:relationship:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:motive:motive:motive",
      "coverageKey": "b:d-4:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-4:motive:motive_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "neighbor10:beat_v2:b:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "emotional",
      "line": "민우가 도둑처럼 찍힐까 봐 저도 규칙 설명보다 방어를 먼저 했습니다.",
      "behaviorHint": "버티다가 감정이 먼저 새어 나오고 목소리가 낮아진다.",
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
          "neighbor10:b:d-4:fear:0",
          "neighbor10:b:d-4:responsibility:0",
          "neighbor10:b:d-4:admission:0"
        ],
        "forbidAtomIds": [
          "neighbor10:b:d-4:denial:0",
          "neighbor10:b:d-4:beneficiary:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:core:rapport:emotion",
      "coverageKey": "b:d-4:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-4:core:emotion_opened"
      ],
      "tags": [
        "late"
      ]
    },
    {
      "id": "neighbor10:beat_v2:b:d-4:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confess",
      "line": "정형 질문이 아니라면 민우가 도둑처럼 찍힐까 봐 저도 규칙 설명보다 방어를 먼저 했습니다.",
      "behaviorHint": "정형 질문보다 더 사적인 속내를 조심스럽게 꺼낸다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "free_question",
      "questionTypes": [],
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
          "neighbor10:b:d-4:fear:0",
          "neighbor10:b:d-4:responsibility:0",
          "neighbor10:b:d-4:admission:0"
        ],
        "forbidAtomIds": [
          "neighbor10:b:d-4:denial:0",
          "neighbor10:b:d-4:beneficiary:0"
        ]
      },
      "weight": 4,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:core:rapport:emotion",
      "coverageKey": "b:d-4:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-4:core:free_disclosed"
      ],
      "tags": [
        "late_probe",
        "free_question"
      ]
    },
    {
      "id": "neighbor10:beat_v2:a:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "mistaken",
      "line": "빈 칸이 있었고 하윤도 민우가 가져갔다고 했어요. 그 상황이면 없어졌다고 볼 수밖에 없었습니다.",
      "behaviorHint": "즉답보다 순서와 표현을 길게 늘어놓으며 핵심을 늦춘다.",
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
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor10:a:d-3:act:0",
          "neighbor10:a:d-3:fear:0",
          "neighbor10:a:d-3:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor10:a:d-3:admission:0",
          "neighbor10:a:d-3:context:0"
        ]
      },
      "weight": 5,
      "priority": 25,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:identity",
      "coverageKey": "a:d-3:surface:early:trap:identity",
      "variantTarget": 4,
      "setFlags": [
        "d-3:surface:misbelief_named"
      ],
      "tags": [
        "misbelief",
        "trap"
      ]
    },
    {
      "id": "neighbor10:beat_v2:a:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "mistaken",
      "line": "완전히 확인했다는 뜻은 아니지만, 그때는 가져간 쪽으로 보였어요.",
      "behaviorHint": "즉답보다 순서와 표현을 길게 늘어놓으며 핵심을 늦춘다.",
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
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor10:a:d-3:act:0",
          "neighbor10:a:d-3:fear:0",
          "neighbor10:a:d-3:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor10:a:d-3:admission:0",
          "neighbor10:a:d-3:context:0"
        ]
      },
      "weight": 5,
      "priority": 25,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:context",
      "coverageKey": "a:d-3:surface:early:trap:context",
      "variantTarget": 4,
      "setFlags": [
        "d-3:surface:misbelief_named"
      ],
      "tags": [
        "misbelief",
        "trap"
      ]
    },
    {
      "id": "neighbor10:beat_v2:a:d-3:core:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "doubt",
      "line": "민우가 훔친 건 아닐 수 있어도, 둘이 잡아당기며 상황을 키운 건 사실이잖아요. 그 혼란 때문에 제가 더 확신해 버렸어요.",
      "behaviorHint": "버티다가 감정이 먼저 새어 나오고 목소리가 낮아진다.",
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
        "evidence_present"
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
          "neighbor10:a:d-3:emotion:0",
          "neighbor10:a:d-3:shame:0",
          "neighbor10:a:d-3:admission:0"
        ],
        "forbidAtomIds": [
          "neighbor10:a:d-3:act:0",
          "neighbor10:a:d-3:fear:0"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:trap:context",
      "coverageKey": "a:d-3:core:late:trap:context",
      "variantTarget": 3,
      "setFlags": [
        "d-3:core:misbelief_cracked"
      ],
      "tags": [
        "misbelief",
        "trap"
      ]
    },
    {
      "id": "neighbor10:beat_v2:a:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "clarify",
      "line": "빈 칸이랑 하윤이 울던 얼굴이 같이 떠오르니까, 제 머릿속에선 그게 거의 절도처럼 굳어졌어요.",
      "behaviorHint": "버티다가 감정이 먼저 새어 나오고 목소리가 낮아진다.",
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
          "neighbor10:a:d-3:emotion:0",
          "neighbor10:a:d-3:shame:0",
          "neighbor10:a:d-3:admission:0"
        ],
        "forbidAtomIds": [
          "neighbor10:a:d-3:act:0",
          "neighbor10:a:d-3:fear:0"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:trap:emotion",
      "coverageKey": "a:d-3:core:late:trap:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-3:core:clarity_opened"
      ],
      "tags": [
        "misbelief",
        "trap"
      ]
    },
    {
      "id": "neighbor10:beat_v2:b:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "mistaken",
      "line": "민우는 안 훔쳤습니다. 애가 울었다고 바로 절도가 되는 건 아니에요.",
      "behaviorHint": "즉답보다 순서와 표현을 길게 늘어놓으며 핵심을 늦춘다.",
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
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor10:b:d-3:denial:0",
          "neighbor10:b:d-3:counter:0",
          "neighbor10:b:d-3:evidence:0"
        ],
        "forbidAtomIds": [
          "neighbor10:b:d-3:admission:0",
          "neighbor10:b:d-3:responsibility:0"
        ]
      },
      "weight": 5,
      "priority": 25,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:identity",
      "coverageKey": "b:d-3:surface:early:trap:identity",
      "variantTarget": 4,
      "setFlags": [
        "d-3:surface:misbelief_named"
      ],
      "tags": [
        "misbelief",
        "trap"
      ]
    },
    {
      "id": "neighbor10:beat_v2:b:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "mistaken",
      "line": "울었다는 장면과 빈 칸만으로는 부족합니다. 확인되지 않은 추정이 먼저 앞선 거죠.",
      "behaviorHint": "즉답보다 순서와 표현을 길게 늘어놓으며 핵심을 늦춘다.",
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
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor10:b:d-3:denial:0",
          "neighbor10:b:d-3:counter:0",
          "neighbor10:b:d-3:evidence:0"
        ],
        "forbidAtomIds": [
          "neighbor10:b:d-3:admission:0",
          "neighbor10:b:d-3:responsibility:0"
        ]
      },
      "weight": 5,
      "priority": 25,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:context",
      "coverageKey": "b:d-3:surface:early:trap:context",
      "variantTarget": 4,
      "setFlags": [
        "d-3:surface:misbelief_named"
      ],
      "tags": [
        "misbelief",
        "trap"
      ]
    },
    {
      "id": "neighbor10:beat_v2:b:d-3:core:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "doubt",
      "line": "규칙이 헷갈린 상황을 절도로 몰아간 게 문제입니다. 사건의 이름 자체가 잘못 붙었어요.",
      "behaviorHint": "버티다가 감정이 먼저 새어 나오고 목소리가 낮아진다.",
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
        "evidence_present"
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
          "neighbor10:b:d-3:emotion:0",
          "neighbor10:b:d-3:relationship:0",
          "neighbor10:b:d-3:admission:0"
        ],
        "forbidAtomIds": [
          "neighbor10:b:d-3:denial:0",
          "neighbor10:b:d-3:counter:0"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:trap:context",
      "coverageKey": "b:d-3:core:late:trap:context",
      "variantTarget": 3,
      "setFlags": [
        "d-3:core:misbelief_cracked"
      ],
      "tags": [
        "misbelief",
        "trap"
      ]
    },
    {
      "id": "neighbor10:beat_v2:b:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "clarify",
      "line": "우리 애가 도둑 취급받은 충격이 커서, 저는 규칙 얘기보다 무고를 먼저 막으려 했습니다.",
      "behaviorHint": "버티다가 감정이 먼저 새어 나오고 목소리가 낮아진다.",
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
          "neighbor10:b:d-3:emotion:0",
          "neighbor10:b:d-3:relationship:0",
          "neighbor10:b:d-3:admission:0"
        ],
        "forbidAtomIds": [
          "neighbor10:b:d-3:denial:0",
          "neighbor10:b:d-3:counter:0"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:trap:emotion",
      "coverageKey": "b:d-3:core:late:trap:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-3:core:clarity_opened"
      ],
      "tags": [
        "misbelief",
        "trap"
      ]
    },
    {
      "id": "neighbor10:beat_v2:a:d-2:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "rebut",
      "line": "46초 음성과 1:1 캡처까지 나오면 제가 공개 글을 먼저 올렸다고 해도, 하윤이를 '원래 그런 애'로 돌려 말한 건 다른 문제입니다.",
      "behaviorHint": "증거를 보고 잠깐 멈칫한 뒤 해석 범위를 좁히려 한다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
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
          "neighbor10:a:d-2:evidence:0",
          "neighbor10:a:d-2:identity:0",
          "neighbor10:a:d-2:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor10:a:d-2:admission:0",
          "neighbor10:a:d-2:relationship:1"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:evidence:identity",
      "coverageKey": "a:d-2:motive:mid:evidence:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:evidence_shown"
      ],
      "tags": [
        "sub_evidence",
        "evidence"
      ]
    },
    {
      "id": "neighbor10:beat_v2:b:d-2:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "rebut",
      "line": "46초 음성과 1:1 캡처까지 나오면 그런데 하윤이가 평소에도 기준을 자주 바꿔서 애들이 헷갈린 건 사실 아닙니까. 그 맥락을 말한 거예요.",
      "behaviorHint": "증거를 보고 잠깐 멈칫한 뒤 해석 범위를 좁히려 한다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
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
          "neighbor10:b:d-2:evidence:0",
          "neighbor10:b:d-2:quote:0",
          "neighbor10:b:d-2:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor10:b:d-2:admission:0",
          "neighbor10:b:d-2:relationship:0"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:evidence:identity",
      "coverageKey": "b:d-2:motive:mid:evidence:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:evidence_shown"
      ],
      "tags": [
        "sub_evidence",
        "evidence"
      ]
    },
    {
      "id": "neighbor10:beat_v2:a:d-5:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "rebut",
      "line": "부모방 캡처를 봐도 네, 부모끼리 먼저 보자던 약속보다 단체방 글이 먼저였어요. 다만 그만큼 제가 하윤 말을 급하게 믿었던 겁니다.",
      "behaviorHint": "증거를 보고 잠깐 멈칫한 뒤 해석 범위를 좁히려 한다.",
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
          "neighbor10:a:d-5:denial:0",
          "neighbor10:a:d-5:timeline:0",
          "neighbor10:a:d-5:denial:1"
        ],
        "forbidAtomIds": [
          "neighbor10:a:d-5:admission:0",
          "neighbor10:a:d-5:beneficiary:0"
        ]
      },
      "weight": 7,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:evidence:context",
      "coverageKey": "a:d-5:surface:early:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-5:surface:evidence_shown"
      ],
      "tags": [
        "sub_evidence",
        "evidence"
      ]
    },
    {
      "id": "neighbor10:beat_v2:b:d-5:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "rebut",
      "line": "부모방 캡처를 봐도 네, 다른 부모들에게 먼저 말한 건 맞습니다. 그때는 민우가 도둑으로 굳어질까 봐 눈앞이 좁아졌어요.",
      "behaviorHint": "증거를 보고 잠깐 멈칫한 뒤 해석 범위를 좁히려 한다.",
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
          "neighbor10:b:d-5:denial:0",
          "neighbor10:b:d-5:beneficiary:0",
          "neighbor10:b:d-5:timeline:0"
        ],
        "forbidAtomIds": [
          "neighbor10:b:d-5:admission:0",
          "neighbor10:b:d-5:beneficiary:1"
        ]
      },
      "weight": 7,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:evidence:context",
      "coverageKey": "b:d-5:surface:early:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-5:surface:evidence_shown"
      ],
      "tags": [
        "sub_evidence",
        "evidence"
      ]
    },
    {
      "id": "neighbor10:beat_v2:a:d-1:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "irritation",
      "line": "소연의 공개 절도 지목 얘기는 이미 했습니다. 네, 공개 글이 먼저 나간 건 제 불찰이에요. 하지만 그 순간엔 하윤이 정말 가져간 줄 알고 있었습니다. 같은 순서를 또 돌리시면 저도 짜증부터 납니다.",
      "behaviorHint": "같은 순서를 반복해서 묻자 신경질이 앞선다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
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
          "neighbor10:a:d-1:responsibility:0",
          "neighbor10:a:d-1:emotion:0",
          "neighbor10:a:d-1:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor10:a:d-1:admission:0",
          "neighbor10:a:d-1:relationship:1"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:fatigue:timeline",
      "coverageKey": "a:d-1:surface:mid:fatigue:timeline",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:fatigue_2hit"
      ],
      "tags": [
        "fatigue",
        "repeat_2"
      ]
    },
    {
      "id": "neighbor10:beat_v2:a:d-1:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "block",
      "line": "같은 책임 질문만 반복하시면 더는 넓게 답하지 않겠습니다. 지금은 소연의 공개 절도 지목의 핵심만 정리하고 싶습니다.",
      "behaviorHint": "반복 압박에 짜증이 쌓여 말을 끊거나 되받아친다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
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
          "neighbor10:a:d-1:responsibility:0",
          "neighbor10:a:d-1:emotion:0",
          "neighbor10:a:d-1:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor10:a:d-1:admission:0",
          "neighbor10:a:d-1:relationship:1"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:fatigue:responsibility",
      "coverageKey": "a:d-1:surface:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:fatigue_3hit"
      ],
      "tags": [
        "fatigue",
        "repeat_3"
      ]
    },
    {
      "id": "neighbor10:beat_v2:a:d-1:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "counterattack",
      "line": "계속 저만 몰지 마세요. 제가 서두른 건 맞지만, 정훈 씨도 바로 사실 설명을 해주지 않았잖아요. 그 공백이 더 불안을 키웠어요.",
      "behaviorHint": "반복 압박에 짜증이 쌓여 말을 끊거나 되받아친다.",
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
          "neighbor10:a:d-1:responsibility:0",
          "neighbor10:a:d-1:emotion:0",
          "neighbor10:a:d-1:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor10:a:d-1:admission:0",
          "neighbor10:a:d-1:relationship:1"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:responsibility",
      "coverageKey": "a:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:fatigue_counter"
      ],
      "tags": [
        "fatigue",
        "high"
      ]
    },
    {
      "id": "neighbor10:beat_v2:b:d-1:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "irritation",
      "line": "소연의 공개 절도 지목 얘기는 이미 했습니다. 채팅 캡처를 보면 우리 애가 먼저 특정된 건 부정할 수 없죠. 같은 순서를 또 돌리시면 저도 짜증부터 납니다.",
      "behaviorHint": "같은 순서를 반복해서 묻자 신경질이 앞선다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
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
          "neighbor10:b:d-1:evidence:0",
          "neighbor10:b:d-1:responsibility:0",
          "neighbor10:b:d-1:beneficiary:0"
        ],
        "forbidAtomIds": [
          "neighbor10:b:d-1:admission:0",
          "neighbor10:b:d-1:relationship:1"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:fatigue:timeline",
      "coverageKey": "b:d-1:surface:mid:fatigue:timeline",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:fatigue_2hit"
      ],
      "tags": [
        "fatigue",
        "repeat_2"
      ]
    },
    {
      "id": "neighbor10:beat_v2:b:d-1:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "block",
      "line": "같은 책임 질문만 반복하시면 더는 넓게 답하지 않겠습니다. 지금은 소연의 공개 절도 지목의 핵심만 정리하고 싶습니다.",
      "behaviorHint": "반복 압박에 짜증이 쌓여 말을 끊거나 되받아친다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
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
          "neighbor10:b:d-1:evidence:0",
          "neighbor10:b:d-1:responsibility:0",
          "neighbor10:b:d-1:beneficiary:0"
        ],
        "forbidAtomIds": [
          "neighbor10:b:d-1:admission:0",
          "neighbor10:b:d-1:relationship:1"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:fatigue:responsibility",
      "coverageKey": "b:d-1:surface:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:fatigue_3hit"
      ],
      "tags": [
        "fatigue",
        "repeat_3"
      ]
    },
    {
      "id": "neighbor10:beat_v2:b:d-1:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "counterattack",
      "line": "계속 저만 몰지 마세요. 그 글이 먼저였기에 저도 예민해졌습니다. 우리 애 평판을 바로 막아야 한다고 느꼈어요.",
      "behaviorHint": "반복 압박에 짜증이 쌓여 말을 끊거나 되받아친다.",
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
          "neighbor10:b:d-1:evidence:0",
          "neighbor10:b:d-1:responsibility:0",
          "neighbor10:b:d-1:beneficiary:0"
        ],
        "forbidAtomIds": [
          "neighbor10:b:d-1:admission:0",
          "neighbor10:b:d-1:relationship:1"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:fatigue:responsibility",
      "coverageKey": "b:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:fatigue_counter"
      ],
      "tags": [
        "fatigue",
        "high"
      ]
    },
    {
      "id": "neighbor10:beat_v2:a:d-4:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "irritation",
      "line": "싸움의 원인: 절도인가 규칙 오해인가 얘기는 이미 했습니다. 교사 메모를 보니 둘이 규칙을 다르게 이해한 건 맞네요. 같은 순서를 또 돌리시면 저도 짜증부터 납니다.",
      "behaviorHint": "같은 순서를 반복해서 묻자 신경질이 앞선다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
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
          "neighbor10:a:d-4:institution:0",
          "neighbor10:a:d-4:context:0",
          "neighbor10:a:d-4:responsibility:0"
        ],
        "forbidAtomIds": [
          "neighbor10:a:d-4:admission:0",
          "neighbor10:a:d-4:relationship:1"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:fatigue:timeline",
      "coverageKey": "a:d-4:surface:mid:fatigue:timeline",
      "variantTarget": 2,
      "setFlags": [
        "d-4:surface:fatigue_2hit"
      ],
      "tags": [
        "fatigue",
        "repeat_2"
      ]
    },
    {
      "id": "neighbor10:beat_v2:a:d-4:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "block",
      "line": "같은 책임 질문만 반복하시면 더는 넓게 답하지 않겠습니다. 지금은 싸움의 원인: 절도인가 규칙 오해인가의 핵심만 정리하고 싶습니다.",
      "behaviorHint": "반복 압박에 짜증이 쌓여 말을 끊거나 되받아친다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
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
          "neighbor10:a:d-4:institution:0",
          "neighbor10:a:d-4:context:0",
          "neighbor10:a:d-4:responsibility:0"
        ],
        "forbidAtomIds": [
          "neighbor10:a:d-4:admission:0",
          "neighbor10:a:d-4:relationship:1"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:fatigue:responsibility",
      "coverageKey": "a:d-4:surface:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-4:surface:fatigue_3hit"
      ],
      "tags": [
        "fatigue",
        "repeat_3"
      ]
    },
    {
      "id": "neighbor10:beat_v2:a:d-4:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "counterattack",
      "line": "계속 저만 몰지 마세요. 다만 그런 오해가 쌓이게 된 건 부모가 규칙을 제대로 정리해 주지 않은 탓도 있습니다.",
      "behaviorHint": "반복 압박에 짜증이 쌓여 말을 끊거나 되받아친다.",
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
          "neighbor10:a:d-4:institution:0",
          "neighbor10:a:d-4:context:0",
          "neighbor10:a:d-4:responsibility:0"
        ],
        "forbidAtomIds": [
          "neighbor10:a:d-4:admission:0",
          "neighbor10:a:d-4:relationship:1"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:fatigue:responsibility",
      "coverageKey": "a:d-4:motive:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-4:surface:fatigue_counter"
      ],
      "tags": [
        "fatigue",
        "high"
      ]
    },
    {
      "id": "neighbor10:beat_v2:b:d-4:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "irritation",
      "line": "싸움의 원인: 절도인가 규칙 오해인가 얘기는 이미 했습니다. 교사 메모대로 서로 다르게 받아들인 건 맞습니다. 다만 민우 입장에선 갑자기 판이 바뀐 느낌이었을 거예요. 같은 순서를 또 돌리시면 저도 짜증부터 납니다.",
      "behaviorHint": "같은 순서를 반복해서 묻자 신경질이 앞선다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
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
          "neighbor10:b:d-4:institution:0",
          "neighbor10:b:d-4:beneficiary:1",
          "neighbor10:b:d-4:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor10:b:d-4:admission:0",
          "neighbor10:b:d-4:relationship:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:surface:fatigue:timeline",
      "coverageKey": "b:d-4:surface:mid:fatigue:timeline",
      "variantTarget": 2,
      "setFlags": [
        "d-4:surface:fatigue_2hit"
      ],
      "tags": [
        "fatigue",
        "repeat_2"
      ]
    },
    {
      "id": "neighbor10:beat_v2:b:d-4:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "block",
      "line": "같은 책임 질문만 반복하시면 더는 넓게 답하지 않겠습니다. 지금은 싸움의 원인: 절도인가 규칙 오해인가의 핵심만 정리하고 싶습니다.",
      "behaviorHint": "반복 압박에 짜증이 쌓여 말을 끊거나 되받아친다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
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
          "neighbor10:b:d-4:institution:0",
          "neighbor10:b:d-4:beneficiary:1",
          "neighbor10:b:d-4:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor10:b:d-4:admission:0",
          "neighbor10:b:d-4:relationship:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:surface:fatigue:responsibility",
      "coverageKey": "b:d-4:surface:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-4:surface:fatigue_3hit"
      ],
      "tags": [
        "fatigue",
        "repeat_3"
      ]
    },
    {
      "id": "neighbor10:beat_v2:b:d-4:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "counterattack",
      "line": "계속 저만 몰지 마세요. 그래도 하윤 쪽이 규칙을 자주 바꾼다고 느낀 누적이 있었어요. 이번 일만 뚝 떼서 보면 민우도 억울합니다.",
      "behaviorHint": "반복 압박에 짜증이 쌓여 말을 끊거나 되받아친다.",
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
          "neighbor10:b:d-4:institution:0",
          "neighbor10:b:d-4:beneficiary:1",
          "neighbor10:b:d-4:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor10:b:d-4:admission:0",
          "neighbor10:b:d-4:relationship:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:motive:fatigue:responsibility",
      "coverageKey": "b:d-4:motive:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-4:surface:fatigue_counter"
      ],
      "tags": [
        "fatigue",
        "high"
      ]
    },
    {
      "id": "neighbor10:beat_v2:a:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "burst",
      "line": "하윤이 울던 얼굴이 너무 크게 남았어요. 확인보다 아이를 보호해야 한다는 생각이 먼저 튀어나왔습니다.",
      "behaviorHint": "참고 있던 감정이 불쑥 튀어나온다.",
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
          "neighbor10:a:d-1:responsibility:0",
          "neighbor10:a:d-1:emotion:0",
          "neighbor10:a:d-1:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor10:a:d-1:admission:0",
          "neighbor10:a:d-1:relationship:1"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-1:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 1,
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "neighbor10:beat_v2:b:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "burst",
      "line": "우리 애 이름이 먼저 돈 순간, 저는 그게 제일 무서웠습니다. 민우가 사실보다 이미지로 남을까 봐요.",
      "behaviorHint": "참고 있던 감정이 불쑥 튀어나온다.",
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
          "neighbor10:b:d-1:evidence:0",
          "neighbor10:b:d-1:responsibility:0",
          "neighbor10:b:d-1:beneficiary:0"
        ],
        "forbidAtomIds": [
          "neighbor10:b:d-1:admission:0",
          "neighbor10:b:d-1:relationship:1"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-1:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 1,
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "neighbor10:beat_v2:a:d-4:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "burst",
      "line": "그 감정은 알겠지만, 지금은 싸움의 원인: 절도인가 규칙 오해인가라는 쟁점부터 분리해서 보셔야 합니다.",
      "behaviorHint": "참고 있던 감정이 불쑥 튀어나온다.",
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
          "neighbor10:a:d-4:institution:0",
          "neighbor10:a:d-4:context:0",
          "neighbor10:a:d-4:responsibility:0"
        ],
        "forbidAtomIds": [
          "neighbor10:a:d-4:admission:0",
          "neighbor10:a:d-4:relationship:1"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-4:surface:mid:interjection:emotional_only:block",
      "variantTarget": 1,
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "neighbor10:beat_v2:b:d-4:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "burst",
      "line": "그 감정은 알겠지만, 지금은 싸움의 원인: 절도인가 규칙 오해인가라는 쟁점부터 분리해서 보셔야 합니다.",
      "behaviorHint": "참고 있던 감정이 불쑥 튀어나온다.",
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
          "neighbor10:b:d-4:institution:0",
          "neighbor10:b:d-4:beneficiary:1",
          "neighbor10:b:d-4:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor10:b:d-4:admission:0",
          "neighbor10:b:d-4:relationship:0"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-4:surface:mid:interjection:emotional_only:block",
      "variantTarget": 1,
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "neighbor10:beat_v2:a:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "rebuttal",
      "line": "제가 공개 글을 먼저 올렸다고 해도, 하윤이를 '원래 그런 애'로 돌려 말한 건 다른 문제입니다.",
      "behaviorHint": "짧고 날카롭게 숫자나 순서를 끊어 친다.",
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
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor10:a:d-2:evidence:0",
          "neighbor10:a:d-2:identity:0",
          "neighbor10:a:d-2:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor10:a:d-2:admission:0",
          "neighbor10:a:d-2:relationship:1"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-2:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 1,
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "neighbor10:beat_v2:b:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "rebuttal",
      "line": "그런데 하윤이가 평소에도 기준을 자주 바꿔서 애들이 헷갈린 건 사실 아닙니까. 그 맥락을 말한 거예요.",
      "behaviorHint": "짧고 날카롭게 숫자나 순서를 끊어 친다.",
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
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor10:b:d-2:evidence:0",
          "neighbor10:b:d-2:quote:0",
          "neighbor10:b:d-2:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor10:b:d-2:admission:0",
          "neighbor10:b:d-2:relationship:0"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-2:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 1,
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "neighbor10:beat_v2:a:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "rebuttal",
      "line": "숫자나 장면을 한 조각만 떼어 말하지 마세요. 부모방 캡처까지 같이 봐야 부모 간 직접 확인 약속 파기라는 쟁점이 정리됩니다.",
      "behaviorHint": "짧고 날카롭게 숫자나 순서를 끊어 친다.",
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
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor10:a:d-5:responsibility:0",
          "neighbor10:a:d-5:emotion:0",
          "neighbor10:a:d-5:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor10:a:d-5:admission:0",
          "neighbor10:a:d-5:beneficiary:0"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-5:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 1,
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "neighbor10:beat_v2:b:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "rebuttal",
      "line": "숫자나 장면을 한 조각만 떼어 말하지 마세요. 부모방 캡처까지 같이 봐야 부모 간 직접 확인 약속 파기라는 쟁점이 정리됩니다.",
      "behaviorHint": "짧고 날카롭게 숫자나 순서를 끊어 친다.",
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
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor10:b:d-5:responsibility:0",
          "neighbor10:b:d-5:fear:0",
          "neighbor10:b:d-5:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor10:b:d-5:admission:0",
          "neighbor10:b:d-5:beneficiary:1"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-5:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 1,
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "neighbor10:beat_v2:a:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "misbelief_push",
      "line": "빈 칸이 있었고 하윤도 민우가 가져갔다고 했어요. 그 상황이면 없어졌다고 볼 수밖에 없었습니다.",
      "behaviorHint": "잘못된 해석을 더 밀어붙이거나 급히 막아 세운다.",
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
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor10:a:d-3:evidence:0",
          "neighbor10:a:d-3:self_justification:0",
          "neighbor10:a:d-3:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor10:a:d-3:admission:0",
          "neighbor10:a:d-3:context:0"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 1,
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
      "id": "neighbor10:beat_v2:b:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "misbelief_push",
      "line": "민우는 안 훔쳤습니다. 애가 울었다고 바로 절도가 되는 건 아니에요.",
      "behaviorHint": "잘못된 해석을 더 밀어붙이거나 급히 막아 세운다.",
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
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor10:b:d-3:evidence:1",
          "neighbor10:b:d-3:identity:0",
          "neighbor10:b:d-3:rule:0"
        ],
        "forbidAtomIds": [
          "neighbor10:b:d-3:admission:0",
          "neighbor10:b:d-3:responsibility:0"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 1,
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
      "id": "neighbor10:beat_v2:a:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "misbelief_push",
      "line": "그렇게 단정하면 오히려 더 멀어집니다. 빈 칸이랑 하윤이 울던 얼굴이 같이 떠오르니까, 제 머릿속에선 그게 거의 절도처럼 굳어졌어요.",
      "behaviorHint": "잘못된 해석을 더 밀어붙이거나 급히 막아 세운다.",
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
          "M2",
          "M3"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor10:a:d-3:evidence:0",
          "neighbor10:a:d-3:self_justification:0",
          "neighbor10:a:d-3:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor10:a:d-3:admission:0",
          "neighbor10:a:d-3:context:0"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 1,
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
      "id": "neighbor10:beat_v2:b:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "misbelief_push",
      "line": "그렇게 단정하면 오히려 더 멀어집니다. 우리 애가 도둑 취급받은 충격이 커서, 저는 규칙 얘기보다 무고를 먼저 막으려 했습니다.",
      "behaviorHint": "잘못된 해석을 더 밀어붙이거나 급히 막아 세운다.",
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
          "M2",
          "M3"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor10:b:d-3:evidence:1",
          "neighbor10:b:d-3:identity:0",
          "neighbor10:b:d-3:rule:0"
        ],
        "forbidAtomIds": [
          "neighbor10:b:d-3:admission:0",
          "neighbor10:b:d-3:responsibility:0"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 1,
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

export default neighbor10BeatsV2Full;
