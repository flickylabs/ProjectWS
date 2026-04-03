export const neighbor12BeatsV2Full = {
  "caseId": "neighbor-12",
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
      "red_herring": 12,
      "sub_truth": 8
    },
    "byDisputeId": {
      "d-3": 20,
      "d-4": 20,
      "d-1": 12,
      "d-2": 4,
      "d-5": 4
    },
    "interjectionByInfoLevel": {
      "emotional_only": 4,
      "detail_rebuttal": 4,
      "misbelief_escalation": 2,
      "trap_signal": 2
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
      "id": "neighbor12:beat_v2:a:d-3:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "작년 돈이 이번에 섞였다는 말은 과장입니다. 저는 그때그때 맞추려고 잠깐 옮겨 둔 거예요.",
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
          "neighbor12:a:d-3:denial:0",
          "neighbor12:a:d-3:emotion:1",
          "neighbor12:a:d-3:self_justification:0"
        ],
        "forbidAtomIds": [
          "neighbor12:a:d-3:responsibility:0",
          "neighbor12:a:d-3:harm:1"
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
        "d-3:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "neighbor12:beat_v2:a:d-3:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "개인계좌로 들어온 건 맞지만 공동구매 돈을 먹으려던 건 아니었어요. 계속 돌려막듯 맞추다 보니 경계가 흐려진 겁니다.",
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
          "neighbor12:a:d-3:denial:0",
          "neighbor12:a:d-3:emotion:1",
          "neighbor12:a:d-3:self_justification:0"
        ],
        "forbidAtomIds": [
          "neighbor12:a:d-3:responsibility:0",
          "neighbor12:a:d-3:harm:1"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:pressure:context",
      "coverageKey": "a:d-3:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-3:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "neighbor12:beat_v2:a:d-3:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "counter",
      "line": "도윤 씨도 그 구조를 몰랐던 건 아니잖아요. 저 혼자 만든 구멍은 아니지만, 제가 먼저 손댄 건 인정합니다.",
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
          "neighbor12:a:d-3:admission:0",
          "neighbor12:a:d-3:timeline:1",
          "neighbor12:a:d-3:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor12:a:d-3:responsibility:0",
          "neighbor12:a:d-3:harm:1"
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
        "d-3:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "neighbor12:beat_v2:a:d-3:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "작년 캐시백 41만 원이랑 반품차액 21만 원을 따로 닫지 못한 건 맞아요. 그래서 이번 금액을 보면서 그 빈칸부터 메워야 한다고 생각했습니다.",
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
          "neighbor12:a:d-3:admission:0",
          "neighbor12:a:d-3:timeline:1",
          "neighbor12:a:d-3:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor12:a:d-3:responsibility:0",
          "neighbor12:a:d-3:harm:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:motive:motive",
      "coverageKey": "a:d-3:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-3:motive:motive_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "neighbor12:beat_v2:a:d-3:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "emotional",
      "line": "제가 참가자 돈을 안전하게 지키는 사람처럼 보이고 싶어서, 작년 62만 원 문제를 제때 못 꺼냈습니다. 그래서 이번 돈으로 메우면 잠깐 버틸 수 있다고 스스로 합리화했어요.",
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
          "neighbor12:a:d-3:fear:0",
          "neighbor12:a:d-3:shame:1",
          "neighbor12:a:d-3:responsibility:0"
        ],
        "forbidAtomIds": [
          "neighbor12:a:d-3:denial:0",
          "neighbor12:a:d-3:emotion:1"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:rapport:emotion",
      "coverageKey": "a:d-3:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-3:core:emotion_opened"
      ],
      "tags": [
        "late"
      ]
    },
    {
      "id": "neighbor12:beat_v2:a:d-3:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confess",
      "line": "굳이 더 말하자면, 실제 재정 은닉의 출발은 제 쪽이었습니다. 작년 62만 원을 닫지 않은 채 개인계좌에 남겨 두고, 이번 참가금 일부로 그 구멍을 메우려 했습니다.",
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
          "neighbor12:a:d-3:fear:0",
          "neighbor12:a:d-3:shame:1",
          "neighbor12:a:d-3:responsibility:0"
        ],
        "forbidAtomIds": [
          "neighbor12:a:d-3:denial:0",
          "neighbor12:a:d-3:emotion:1"
        ]
      },
      "weight": 4,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:motive:motive",
      "coverageKey": "a:d-3:core:late:motive:motive",
      "variantTarget": 2,
      "setFlags": [
        "d-3:core:free_disclosed"
      ],
      "tags": [
        "late_probe",
        "free_question"
      ]
    },
    {
      "id": "neighbor12:beat_v2:b:d-3:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "작년 62만 원 문제는 제 카드취소랑 별개입니다. 배지연 씨 쪽 계좌에서 시작된 일이지 제가 만든 빈칸이 아닙니다.",
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
          "neighbor12:b:d-3:act:0",
          "neighbor12:b:d-3:emotion:1",
          "neighbor12:b:d-3:evidence:0"
        ],
        "forbidAtomIds": [
          "neighbor12:b:d-3:responsibility:0",
          "neighbor12:b:d-3:harm:1"
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
        "d-3:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "neighbor12:beat_v2:b:d-3:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "작년 캐시백 41만 원, 반품차액 21만 원이 닫히지 않은 채 남아 있었어요. 저는 그게 이번 숫자를 흐리게 만든 핵심이라고 봅니다.",
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
          "neighbor12:b:d-3:act:0",
          "neighbor12:b:d-3:emotion:1",
          "neighbor12:b:d-3:evidence:0"
        ],
        "forbidAtomIds": [
          "neighbor12:b:d-3:responsibility:0",
          "neighbor12:b:d-3:harm:1"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:pressure:context",
      "coverageKey": "b:d-3:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-3:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "neighbor12:beat_v2:b:d-3:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "counter",
      "line": "배지연 씨가 먼저 구멍을 만든 건 맞습니다. 다만 제가 그 위험을 알고도 '이번 건부터 보자'고 하며 연결을 끊은 건 제 잘못이죠.",
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
          "neighbor12:b:d-3:context:0",
          "neighbor12:b:d-3:timeline:1",
          "neighbor12:b:d-3:admission:0"
        ],
        "forbidAtomIds": [
          "neighbor12:b:d-3:responsibility:0",
          "neighbor12:b:d-3:harm:1"
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
        "d-3:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "neighbor12:beat_v2:b:d-3:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "이번 분쟁의 출발점이 제 환불 은닉이 아니라는 점은 분명합니다. 작년 62만 원이 개인계좌에 남아 있었고, 이번 참가금 일부가 거기로 섞여 들어간 정황이 있습니다.",
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
          "neighbor12:b:d-3:context:0",
          "neighbor12:b:d-3:timeline:1",
          "neighbor12:b:d-3:admission:0"
        ],
        "forbidAtomIds": [
          "neighbor12:b:d-3:responsibility:0",
          "neighbor12:b:d-3:harm:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:motive:motive",
      "coverageKey": "b:d-3:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-3:motive:motive_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "neighbor12:beat_v2:b:d-3:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "emotional",
      "line": "솔직히 저는 그 62만 원 문제를 예전부터 찜찜하게 봤습니다. 그런데 이번 정산만 숫자로 맞추면 넘어갈 수 있다고 저도 편하게 생각했습니다.",
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
          "neighbor12:b:d-3:emotion:0",
          "neighbor12:b:d-3:fear:1",
          "neighbor12:b:d-3:responsibility:0"
        ],
        "forbidAtomIds": [
          "neighbor12:b:d-3:act:0",
          "neighbor12:b:d-3:emotion:1"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:rapport:emotion",
      "coverageKey": "b:d-3:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-3:core:emotion_opened"
      ],
      "tags": [
        "late"
      ]
    },
    {
      "id": "neighbor12:beat_v2:b:d-3:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confess",
      "line": "굳이 더 말하자면, 실제 재정 은닉의 출발점은 배지연 씨 쪽 62만 원 미정산이 맞습니다. 동시에 그 구조를 알고도 제가 강하게 중단시키지 않은 책임도 인정합니다.",
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
          "neighbor12:b:d-3:emotion:0",
          "neighbor12:b:d-3:fear:1",
          "neighbor12:b:d-3:responsibility:0"
        ],
        "forbidAtomIds": [
          "neighbor12:b:d-3:act:0",
          "neighbor12:b:d-3:emotion:1"
        ]
      },
      "weight": 4,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:motive:motive",
      "coverageKey": "b:d-3:core:late:motive:motive",
      "variantTarget": 2,
      "setFlags": [
        "d-3:core:free_disclosed"
      ],
      "tags": [
        "late_probe",
        "free_question"
      ]
    },
    {
      "id": "neighbor12:beat_v2:a:d-4:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "제 눈에는 94만 원이 그냥 사라진 돈이었어요. 그 숫자가 왜 나왔는지 따질 겨를도 없었습니다.",
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
          "neighbor12:a:d-4:act:0",
          "neighbor12:a:d-4:emotion:1",
          "neighbor12:a:d-4:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor12:a:d-4:responsibility:0",
          "neighbor12:a:d-4:harm:1"
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
      "id": "neighbor12:beat_v2:a:d-4:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "그 숫자는 빈칸을 메우다 보니 잡힌 총액이었어요. 당장 환불할 돈과 이전 정산이 섞였는지는 저도 정확히 못 봤습니다.",
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
          "neighbor12:a:d-4:act:0",
          "neighbor12:a:d-4:emotion:1",
          "neighbor12:a:d-4:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor12:a:d-4:responsibility:0",
          "neighbor12:a:d-4:harm:1"
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
      "id": "neighbor12:beat_v2:a:d-4:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "counter",
      "line": "제가 숫자를 섞은 건 맞지만, 그만큼 장부가 엉켜 있었다는 뜻이기도 해요. 도윤 씨가 정산 원본을 더 빨리 열어줬다면 이런 혼합도 오래 안 갔을 겁니다.",
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
          "neighbor12:a:d-4:context:0",
          "neighbor12:a:d-4:timeline:1",
          "neighbor12:a:d-4:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor12:a:d-4:responsibility:0",
          "neighbor12:a:d-4:harm:1"
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
      "id": "neighbor12:beat_v2:a:d-4:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "지금 보니 94만 원 전부가 이번 환불금은 아니었습니다. 이번 32만 원이랑 작년 금액이 한 칸에 섞여 있었어요.",
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
          "neighbor12:a:d-4:context:0",
          "neighbor12:a:d-4:timeline:1",
          "neighbor12:a:d-4:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor12:a:d-4:responsibility:0",
          "neighbor12:a:d-4:harm:1"
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
      "id": "neighbor12:beat_v2:a:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "emotional",
      "line": "94만 원이라는 말은 사실 제 불안과 창피함이 만든 숫자였어요. 이번 32만 원과 작년 62만 원을 분리해서 말했어야 했는데, 저는 그걸 한 덩어리처럼 밀어붙였습니다.",
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
          "neighbor12:a:d-4:emotion:0",
          "neighbor12:a:d-4:fear:1",
          "neighbor12:a:d-4:responsibility:0"
        ],
        "forbidAtomIds": [
          "neighbor12:a:d-4:act:0",
          "neighbor12:a:d-4:emotion:1"
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
      "id": "neighbor12:beat_v2:a:d-4:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confess",
      "line": "정형 질문이 아니라면 94만 원이라는 말은 사실 제 불안과 창피함이 만든 숫자였어요. 이번 32만 원과 작년 62만 원을 분리해서 말했어야 했는데, 저는 그걸 한 덩어리처럼 밀어붙였습니다.",
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
          "neighbor12:a:d-4:emotion:0",
          "neighbor12:a:d-4:fear:1",
          "neighbor12:a:d-4:responsibility:0"
        ],
        "forbidAtomIds": [
          "neighbor12:a:d-4:act:0",
          "neighbor12:a:d-4:emotion:1"
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
      "id": "neighbor12:beat_v2:b:d-4:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "94만 원이라는 숫자 자체가 틀렸습니다. 이번 라운드에서 제가 쥐고 있던 환급 가능 금액은 32만 원뿐이었습니다.",
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
          "neighbor12:b:d-4:act:0",
          "neighbor12:b:d-4:emotion:1",
          "neighbor12:b:d-4:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor12:b:d-4:responsibility:0",
          "neighbor12:b:d-4:harm:1"
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
      "id": "neighbor12:beat_v2:b:d-4:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "94만 원은 이번 환급금이 아니라 다른 금액이 섞인 숫자예요. 다만 그 혼입분이 정확히 어디서 왔는지는 그때 바로 펼쳐 설명하지 못했습니다.",
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
          "neighbor12:b:d-4:act:0",
          "neighbor12:b:d-4:emotion:1",
          "neighbor12:b:d-4:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor12:b:d-4:responsibility:0",
          "neighbor12:b:d-4:harm:1"
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
      "id": "neighbor12:beat_v2:b:d-4:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "counter",
      "line": "제가 94만 원이 틀렸다고만 말한 건 부족했습니다. 32만 원과 62만 원이 뒤섞였다는 구조까지 같이 열었어야 했어요.",
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
          "neighbor12:b:d-4:context:0",
          "neighbor12:b:d-4:timeline:1",
          "neighbor12:b:d-4:admission:0"
        ],
        "forbidAtomIds": [
          "neighbor12:b:d-4:responsibility:0",
          "neighbor12:b:d-4:harm:1"
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
      "id": "neighbor12:beat_v2:b:d-4:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "수입사 최종 정산서상 현재 라운드 환급분은 32만 원입니다. 94만 원은 이 32만 원에 작년 미정산 금액이 겹쳐진 숫자라고 보는 게 맞습니다.",
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
          "neighbor12:b:d-4:context:0",
          "neighbor12:b:d-4:timeline:1",
          "neighbor12:b:d-4:admission:0"
        ],
        "forbidAtomIds": [
          "neighbor12:b:d-4:responsibility:0",
          "neighbor12:b:d-4:harm:1"
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
      "id": "neighbor12:beat_v2:b:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "emotional",
      "line": "저는 숫자만 맞으면 된다고 생각해, 왜 94만 원이 나왔는지 사람 말로 풀어 설명하지 않았습니다. 그래서 제 말도 변명처럼 들렸을 겁니다.",
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
          "neighbor12:b:d-4:emotion:0",
          "neighbor12:b:d-4:fear:1",
          "neighbor12:b:d-4:responsibility:0"
        ],
        "forbidAtomIds": [
          "neighbor12:b:d-4:act:0",
          "neighbor12:b:d-4:emotion:1"
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
      "id": "neighbor12:beat_v2:b:d-4:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confess",
      "line": "정형 질문이 아니라면 저는 숫자만 맞으면 된다고 생각해, 왜 94만 원이 나왔는지 사람 말로 풀어 설명하지 않았습니다. 그래서 제 말도 변명처럼 들렸을 겁니다.",
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
          "neighbor12:b:d-4:emotion:0",
          "neighbor12:b:d-4:fear:1",
          "neighbor12:b:d-4:responsibility:0"
        ],
        "forbidAtomIds": [
          "neighbor12:b:d-4:act:0",
          "neighbor12:b:d-4:emotion:1"
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
      "id": "neighbor12:beat_v2:a:d-1:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "mistaken",
      "line": "제가 괜히 그런 말을 한 게 아니에요. 그때는 94만 원이 비는 것처럼 보였고 참가자들이 바로 환불 일정을 물었어요.",
      "behaviorHint": "즉답보다 순서와 표현을 길게 늘어놓으며 핵심을 늦춘다.",
      "applicableStates": [
        "M0",
        "M1",
        "M2"
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
          "neighbor12:a:d-1:act:0",
          "neighbor12:a:d-1:emotion:1",
          "neighbor12:a:d-1:evidence:0"
        ],
        "forbidAtomIds": [
          "neighbor12:a:d-1:responsibility:0",
          "neighbor12:a:d-1:harm:1"
        ]
      },
      "weight": 5,
      "priority": 25,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:trap:identity",
      "coverageKey": "a:d-1:surface:early:trap:identity",
      "variantTarget": 4,
      "setFlags": [
        "d-1:surface:misbelief_named"
      ],
      "tags": [
        "misbelief",
        "trap"
      ]
    },
    {
      "id": "neighbor12:beat_v2:a:d-1:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "mistaken",
      "line": "숨겼다고 단정한 건 아니고, 비어 보인다고 적은 거예요. 제가 본 표에는 빈칸이 있었어요.",
      "behaviorHint": "즉답보다 순서와 표현을 길게 늘어놓으며 핵심을 늦춘다.",
      "applicableStates": [
        "M0",
        "M1",
        "M2"
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
          "neighbor12:a:d-1:act:0",
          "neighbor12:a:d-1:emotion:1",
          "neighbor12:a:d-1:evidence:0"
        ],
        "forbidAtomIds": [
          "neighbor12:a:d-1:responsibility:0",
          "neighbor12:a:d-1:harm:1"
        ]
      },
      "weight": 5,
      "priority": 25,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:trap:context",
      "coverageKey": "a:d-1:surface:early:trap:context",
      "variantTarget": 4,
      "setFlags": [
        "d-1:surface:misbelief_named"
      ],
      "tags": [
        "misbelief",
        "trap"
      ]
    },
    {
      "id": "neighbor12:beat_v2:a:d-1:core:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "doubt",
      "line": "도윤 씨가 사흘만 빨리 알려줬어도 제가 그런 글까지 안 갔을 거예요. 책임이 전혀 없다고는 못 하지만 시작은 그쪽 침묵이었어요.",
      "behaviorHint": "버티다가 감정이 먼저 새어 나오고 목소리가 낮아진다.",
      "applicableStates": [
        "M3",
        "M4"
      ],
      "layer": "core",
      "issueRole": "red_herring",
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
          "neighbor12:a:d-1:shame:0",
          "neighbor12:a:d-1:fear:1",
          "neighbor12:a:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "neighbor12:a:d-1:act:0",
          "neighbor12:a:d-1:emotion:1"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:trap:context",
      "coverageKey": "a:d-1:core:late:trap:context",
      "variantTarget": 3,
      "setFlags": [
        "d-1:core:misbelief_cracked"
      ],
      "tags": [
        "misbelief",
        "trap"
      ]
    },
    {
      "id": "neighbor12:beat_v2:a:d-1:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "clarify",
      "line": "그 방에서 제가 먼저 이름을 꺼낸 건 정말 감정적이었어요. 참가자들 재촉이 무서워서 제가 피해자인 척 먼저 자리를 잡으려 했던 것도 있습니다.",
      "behaviorHint": "버티다가 감정이 먼저 새어 나오고 목소리가 낮아진다.",
      "applicableStates": [
        "M3",
        "M4"
      ],
      "layer": "core",
      "issueRole": "red_herring",
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
          "neighbor12:a:d-1:shame:0",
          "neighbor12:a:d-1:fear:1",
          "neighbor12:a:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "neighbor12:a:d-1:act:0",
          "neighbor12:a:d-1:emotion:1"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:trap:emotion",
      "coverageKey": "a:d-1:core:late:trap:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-1:core:clarity_opened"
      ],
      "tags": [
        "misbelief",
        "trap"
      ]
    },
    {
      "id": "neighbor12:beat_v2:b:d-1:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "mistaken",
      "line": "제가 94만 원을 숨긴 적은 없습니다. 배지연 씨가 확인도 전에 공개방에 올린 겁니다.",
      "behaviorHint": "즉답보다 순서와 표현을 길게 늘어놓으며 핵심을 늦춘다.",
      "applicableStates": [
        "M0",
        "M1",
        "M2"
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
          "neighbor12:b:d-1:denial:0",
          "neighbor12:b:d-1:emotion:1",
          "neighbor12:b:d-1:evidence:0"
        ],
        "forbidAtomIds": [
          "neighbor12:b:d-1:responsibility:0",
          "neighbor12:b:d-1:harm:1"
        ]
      },
      "weight": 5,
      "priority": 25,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:trap:identity",
      "coverageKey": "b:d-1:surface:early:trap:identity",
      "variantTarget": 4,
      "setFlags": [
        "d-1:surface:misbelief_named"
      ],
      "tags": [
        "misbelief",
        "trap"
      ]
    },
    {
      "id": "neighbor12:beat_v2:b:d-1:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "mistaken",
      "line": "빈칸처럼 보였을 수는 있어도, 숨김이라고 단정할 근거는 없었습니다. 적어도 제게 원본을 다 받아본 뒤 말했어야죠.",
      "behaviorHint": "즉답보다 순서와 표현을 길게 늘어놓으며 핵심을 늦춘다.",
      "applicableStates": [
        "M0",
        "M1",
        "M2"
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
          "neighbor12:b:d-1:denial:0",
          "neighbor12:b:d-1:emotion:1",
          "neighbor12:b:d-1:evidence:0"
        ],
        "forbidAtomIds": [
          "neighbor12:b:d-1:responsibility:0",
          "neighbor12:b:d-1:harm:1"
        ]
      },
      "weight": 5,
      "priority": 25,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:trap:context",
      "coverageKey": "b:d-1:surface:early:trap:context",
      "variantTarget": 4,
      "setFlags": [
        "d-1:surface:misbelief_named"
      ],
      "tags": [
        "misbelief",
        "trap"
      ]
    },
    {
      "id": "neighbor12:beat_v2:b:d-1:core:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "doubt",
      "line": "저를 횡령한 사람처럼 몰아간 건 과했죠. 하지만 그 틈을 만든 제 지연 고지까지 없던 일처럼 할 수는 없습니다.",
      "behaviorHint": "버티다가 감정이 먼저 새어 나오고 목소리가 낮아진다.",
      "applicableStates": [
        "M3",
        "M4"
      ],
      "layer": "core",
      "issueRole": "red_herring",
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
          "neighbor12:b:d-1:emotion:0",
          "neighbor12:b:d-1:fear:1",
          "neighbor12:b:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "neighbor12:b:d-1:denial:0",
          "neighbor12:b:d-1:emotion:1"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:trap:context",
      "coverageKey": "b:d-1:core:late:trap:context",
      "variantTarget": 3,
      "setFlags": [
        "d-1:core:misbelief_cracked"
      ],
      "tags": [
        "misbelief",
        "trap"
      ]
    },
    {
      "id": "neighbor12:beat_v2:b:d-1:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "clarify",
      "line": "그 방 글을 봤을 때 정말 모욕감이 컸습니다. 그래서 더 숫자만 읽으며 방어했는데, 제가 바로 설명하지 않은 책임도 그 안에 있습니다.",
      "behaviorHint": "버티다가 감정이 먼저 새어 나오고 목소리가 낮아진다.",
      "applicableStates": [
        "M3",
        "M4"
      ],
      "layer": "core",
      "issueRole": "red_herring",
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
          "neighbor12:b:d-1:emotion:0",
          "neighbor12:b:d-1:fear:1",
          "neighbor12:b:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "neighbor12:b:d-1:denial:0",
          "neighbor12:b:d-1:emotion:1"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:trap:emotion",
      "coverageKey": "b:d-1:core:late:trap:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-1:core:clarity_opened"
      ],
      "tags": [
        "misbelief",
        "trap"
      ]
    },
    {
      "id": "neighbor12:beat_v2:a:d-2:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "rebut",
      "line": "카드취소 알림까지 나오면 제가 흥분한 건 제 몫이지만, 사흘 늦은 고지가 불씨였던 건 맞아요. 운영자라면 미확정 항목이라도 먼저 공지했어야죠.",
      "behaviorHint": "증거를 보고 잠깐 멈칫한 뒤 해석 범위를 좁히려 한다.",
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
          "neighbor12:a:d-2:context:0",
          "neighbor12:a:d-2:timeline:1",
          "neighbor12:a:d-2:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor12:a:d-2:responsibility:0",
          "neighbor12:a:d-2:harm:1"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:evidence:legality",
      "coverageKey": "a:d-2:motive:mid:evidence:legality",
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
      "id": "neighbor12:beat_v2:b:d-2:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "rebut",
      "line": "카드취소 알림까지 나오면 사흘 지연이 짧다고만 말할 일은 아니었습니다. 그래도 그 지연이 곧 환불금 은닉이라는 뜻은 아니고, 판단은 제가 너무 건조하게 했습니다.",
      "behaviorHint": "증거를 보고 잠깐 멈칫한 뒤 해석 범위를 좁히려 한다.",
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
          "neighbor12:b:d-2:admission:0",
          "neighbor12:b:d-2:timeline:1",
          "neighbor12:b:d-2:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor12:b:d-2:responsibility:0",
          "neighbor12:b:d-2:harm:1"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:evidence:legality",
      "coverageKey": "b:d-2:motive:mid:evidence:legality",
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
      "id": "neighbor12:beat_v2:a:d-5:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "rebut",
      "line": "계좌이체 원장를 봐도 원칙대로라면 지난 라운드부터 끊었어야 했어요. 그런데 제가 계속 제 계좌를 쓰자고 밀어붙인 건 맞습니다.",
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
          "neighbor12:a:d-5:legacy_sentence:0",
          "neighbor12:a:d-5:emotion:1",
          "neighbor12:a:d-5:self_justification:0"
        ],
        "forbidAtomIds": [
          "neighbor12:a:d-5:responsibility:0",
          "neighbor12:a:d-5:harm:1"
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
      "id": "neighbor12:beat_v2:b:d-5:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "rebut",
      "line": "계좌이체 원장를 봐도 같은 계좌를 다시 쓴 건 잘못이었습니다. 제가 반대 의사를 더 분명히 하고 서면 종료를 먼저 요구했어야 했습니다.",
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
          "neighbor12:b:d-5:legacy_sentence:0",
          "neighbor12:b:d-5:emotion:1",
          "neighbor12:b:d-5:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor12:b:d-5:responsibility:0",
          "neighbor12:b:d-5:harm:1"
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
      "id": "neighbor12:beat_v2:a:d-3:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "irritation",
      "line": "재정 은닉의 실제 출발점 얘기는 이미 했습니다. 작년 캐시백 41만 원이랑 반품차액 21만 원을 따로 닫지 못한 건 맞아요. 그래서 이번 금액을 보면서 그 빈칸부터 메워야 한다고 생각했습니다. 같은 순서를 또 돌리시면 저도 짜증부터 납니다.",
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
          "neighbor12:a:d-3:admission:0",
          "neighbor12:a:d-3:timeline:1",
          "neighbor12:a:d-3:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor12:a:d-3:responsibility:0",
          "neighbor12:a:d-3:harm:1"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:fatigue:timeline",
      "coverageKey": "a:d-3:surface:mid:fatigue:timeline",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:fatigue_2hit"
      ],
      "tags": [
        "fatigue",
        "repeat_2"
      ]
    },
    {
      "id": "neighbor12:beat_v2:a:d-3:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "block",
      "line": "같은 책임 질문만 반복하시면 더는 넓게 답하지 않겠습니다. 지금은 재정 은닉의 실제 출발점의 핵심만 정리하고 싶습니다.",
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
          "neighbor12:a:d-3:admission:0",
          "neighbor12:a:d-3:timeline:1",
          "neighbor12:a:d-3:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor12:a:d-3:responsibility:0",
          "neighbor12:a:d-3:harm:1"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:fatigue:responsibility",
      "coverageKey": "a:d-3:surface:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:fatigue_3hit"
      ],
      "tags": [
        "fatigue",
        "repeat_3"
      ]
    },
    {
      "id": "neighbor12:beat_v2:a:d-3:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "counterattack",
      "line": "계속 저만 몰지 마세요. 도윤 씨도 그 구조를 몰랐던 건 아니잖아요. 저 혼자 만든 구멍은 아니지만, 제가 먼저 손댄 건 인정합니다.",
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
          "neighbor12:a:d-3:admission:0",
          "neighbor12:a:d-3:timeline:1",
          "neighbor12:a:d-3:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor12:a:d-3:responsibility:0",
          "neighbor12:a:d-3:harm:1"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:fatigue:responsibility",
      "coverageKey": "a:d-3:motive:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:fatigue_counter"
      ],
      "tags": [
        "fatigue",
        "high"
      ]
    },
    {
      "id": "neighbor12:beat_v2:b:d-3:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "irritation",
      "line": "재정 은닉의 실제 출발점 얘기는 이미 했습니다. 이번 분쟁의 출발점이 제 환불 은닉이 아니라는 점은 분명합니다. 작년 62만 원이 개인계좌에 남아 있었고, 이번 참가금 일부가 거기로 섞여 들어간 정황이 있습니다. 같은 순서를 또 돌리시면 저도 짜증부터 납니다.",
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
          "neighbor12:b:d-3:context:0",
          "neighbor12:b:d-3:timeline:1",
          "neighbor12:b:d-3:admission:0"
        ],
        "forbidAtomIds": [
          "neighbor12:b:d-3:responsibility:0",
          "neighbor12:b:d-3:harm:1"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:fatigue:timeline",
      "coverageKey": "b:d-3:surface:mid:fatigue:timeline",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:fatigue_2hit"
      ],
      "tags": [
        "fatigue",
        "repeat_2"
      ]
    },
    {
      "id": "neighbor12:beat_v2:b:d-3:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "block",
      "line": "같은 책임 질문만 반복하시면 더는 넓게 답하지 않겠습니다. 지금은 재정 은닉의 실제 출발점의 핵심만 정리하고 싶습니다.",
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
          "neighbor12:b:d-3:context:0",
          "neighbor12:b:d-3:timeline:1",
          "neighbor12:b:d-3:admission:0"
        ],
        "forbidAtomIds": [
          "neighbor12:b:d-3:responsibility:0",
          "neighbor12:b:d-3:harm:1"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:fatigue:responsibility",
      "coverageKey": "b:d-3:surface:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:fatigue_3hit"
      ],
      "tags": [
        "fatigue",
        "repeat_3"
      ]
    },
    {
      "id": "neighbor12:beat_v2:b:d-3:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "counterattack",
      "line": "계속 저만 몰지 마세요. 배지연 씨가 먼저 구멍을 만든 건 맞습니다. 다만 제가 그 위험을 알고도 '이번 건부터 보자'고 하며 연결을 끊은 건 제 잘못이죠.",
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
          "neighbor12:b:d-3:context:0",
          "neighbor12:b:d-3:timeline:1",
          "neighbor12:b:d-3:admission:0"
        ],
        "forbidAtomIds": [
          "neighbor12:b:d-3:responsibility:0",
          "neighbor12:b:d-3:harm:1"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:fatigue:responsibility",
      "coverageKey": "b:d-3:motive:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:fatigue_counter"
      ],
      "tags": [
        "fatigue",
        "high"
      ]
    },
    {
      "id": "neighbor12:beat_v2:a:d-4:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "irritation",
      "line": "'사라진 94만 원'의 실제 구성 얘기는 이미 했습니다. 지금 보니 94만 원 전부가 이번 환불금은 아니었습니다. 이번 32만 원이랑 작년 금액이 한 칸에 섞여 있었어요. 같은 순서를 또 돌리시면 저도 짜증부터 납니다.",
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
          "neighbor12:a:d-4:context:0",
          "neighbor12:a:d-4:timeline:1",
          "neighbor12:a:d-4:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor12:a:d-4:responsibility:0",
          "neighbor12:a:d-4:harm:1"
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
      "id": "neighbor12:beat_v2:a:d-4:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "block",
      "line": "같은 책임 질문만 반복하시면 더는 넓게 답하지 않겠습니다. 지금은 '사라진 94만 원'의 실제 구성의 핵심만 정리하고 싶습니다.",
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
          "neighbor12:a:d-4:context:0",
          "neighbor12:a:d-4:timeline:1",
          "neighbor12:a:d-4:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor12:a:d-4:responsibility:0",
          "neighbor12:a:d-4:harm:1"
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
      "id": "neighbor12:beat_v2:a:d-4:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "counterattack",
      "line": "계속 저만 몰지 마세요. 제가 숫자를 섞은 건 맞지만, 그만큼 장부가 엉켜 있었다는 뜻이기도 해요. 도윤 씨가 정산 원본을 더 빨리 열어줬다면 이런 혼합도 오래 안 갔을 겁니다.",
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
          "neighbor12:a:d-4:context:0",
          "neighbor12:a:d-4:timeline:1",
          "neighbor12:a:d-4:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor12:a:d-4:responsibility:0",
          "neighbor12:a:d-4:harm:1"
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
      "id": "neighbor12:beat_v2:b:d-4:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "irritation",
      "line": "'사라진 94만 원'의 실제 구성 얘기는 이미 했습니다. 수입사 최종 정산서상 현재 라운드 환급분은 32만 원입니다. 94만 원은 이 32만 원에 작년 미정산 금액이 겹쳐진 숫자라고 보는 게 맞습니다. 같은 순서를 또 돌리시면 저도 짜증부터 납니다.",
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
          "neighbor12:b:d-4:context:0",
          "neighbor12:b:d-4:timeline:1",
          "neighbor12:b:d-4:admission:0"
        ],
        "forbidAtomIds": [
          "neighbor12:b:d-4:responsibility:0",
          "neighbor12:b:d-4:harm:1"
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
      "id": "neighbor12:beat_v2:b:d-4:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "block",
      "line": "같은 책임 질문만 반복하시면 더는 넓게 답하지 않겠습니다. 지금은 '사라진 94만 원'의 실제 구성의 핵심만 정리하고 싶습니다.",
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
          "neighbor12:b:d-4:context:0",
          "neighbor12:b:d-4:timeline:1",
          "neighbor12:b:d-4:admission:0"
        ],
        "forbidAtomIds": [
          "neighbor12:b:d-4:responsibility:0",
          "neighbor12:b:d-4:harm:1"
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
      "id": "neighbor12:beat_v2:b:d-4:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "counterattack",
      "line": "계속 저만 몰지 마세요. 제가 94만 원이 틀렸다고만 말한 건 부족했습니다. 32만 원과 62만 원이 뒤섞였다는 구조까지 같이 열었어야 했어요.",
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
          "neighbor12:b:d-4:context:0",
          "neighbor12:b:d-4:timeline:1",
          "neighbor12:b:d-4:admission:0"
        ],
        "forbidAtomIds": [
          "neighbor12:b:d-4:responsibility:0",
          "neighbor12:b:d-4:harm:1"
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
      "id": "neighbor12:beat_v2:a:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "burst",
      "line": "제가 참가자 돈을 안전하게 지키는 사람처럼 보이고 싶어서, 작년 62만 원 문제를 제때 못 꺼냈습니다. 그래서 이번 돈으로 메우면 잠깐 버틸 수 있다고 스스로 합리화했어요.",
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
          "neighbor12:a:d-3:admission:0",
          "neighbor12:a:d-3:timeline:1",
          "neighbor12:a:d-3:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor12:a:d-3:responsibility:0",
          "neighbor12:a:d-3:harm:1"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 1,
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "neighbor12:beat_v2:b:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "burst",
      "line": "솔직히 저는 그 62만 원 문제를 예전부터 찜찜하게 봤습니다. 그런데 이번 정산만 숫자로 맞추면 넘어갈 수 있다고 저도 편하게 생각했습니다.",
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
          "neighbor12:b:d-3:context:0",
          "neighbor12:b:d-3:timeline:1",
          "neighbor12:b:d-3:admission:0"
        ],
        "forbidAtomIds": [
          "neighbor12:b:d-3:responsibility:0",
          "neighbor12:b:d-3:harm:1"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-3:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 1,
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "neighbor12:beat_v2:a:d-4:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "burst",
      "line": "그 감정은 알겠지만, 지금은 '사라진 94만 원'의 실제 구성라는 쟁점부터 분리해서 보셔야 합니다.",
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
          "neighbor12:a:d-4:context:0",
          "neighbor12:a:d-4:timeline:1",
          "neighbor12:a:d-4:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor12:a:d-4:responsibility:0",
          "neighbor12:a:d-4:harm:1"
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
      "id": "neighbor12:beat_v2:b:d-4:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "burst",
      "line": "그 감정은 알겠지만, 지금은 '사라진 94만 원'의 실제 구성라는 쟁점부터 분리해서 보셔야 합니다.",
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
          "neighbor12:b:d-4:context:0",
          "neighbor12:b:d-4:timeline:1",
          "neighbor12:b:d-4:admission:0"
        ],
        "forbidAtomIds": [
          "neighbor12:b:d-4:responsibility:0",
          "neighbor12:b:d-4:harm:1"
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
      "id": "neighbor12:beat_v2:a:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "rebuttal",
      "line": "제가 흥분한 건 제 몫이지만, 사흘 늦은 고지가 불씨였던 건 맞아요. 운영자라면 미확정 항목이라도 먼저 공지했어야죠.",
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
          "neighbor12:a:d-2:context:0",
          "neighbor12:a:d-2:timeline:1",
          "neighbor12:a:d-2:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor12:a:d-2:responsibility:0",
          "neighbor12:a:d-2:harm:1"
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
      "id": "neighbor12:beat_v2:b:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "rebuttal",
      "line": "사흘 지연이 짧다고만 말할 일은 아니었습니다. 그래도 그 지연이 곧 환불금 은닉이라는 뜻은 아니고, 판단은 제가 너무 건조하게 했습니다.",
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
          "neighbor12:b:d-2:admission:0",
          "neighbor12:b:d-2:timeline:1",
          "neighbor12:b:d-2:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor12:b:d-2:responsibility:0",
          "neighbor12:b:d-2:harm:1"
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
      "id": "neighbor12:beat_v2:a:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "rebuttal",
      "line": "숫자나 장면을 한 조각만 떼어 말하지 마세요. 계좌이체 원장까지 같이 봐야 작년 정산 미마감과 계좌 재사용라는 쟁점이 정리됩니다.",
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
          "neighbor12:a:d-5:admission:0",
          "neighbor12:a:d-5:timeline:1",
          "neighbor12:a:d-5:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor12:a:d-5:responsibility:0",
          "neighbor12:a:d-5:harm:1"
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
      "id": "neighbor12:beat_v2:b:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "rebuttal",
      "line": "숫자나 장면을 한 조각만 떼어 말하지 마세요. 계좌이체 원장까지 같이 봐야 작년 정산 미마감과 계좌 재사용라는 쟁점이 정리됩니다.",
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
          "neighbor12:b:d-5:admission:0",
          "neighbor12:b:d-5:timeline:1",
          "neighbor12:b:d-5:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor12:b:d-5:responsibility:0",
          "neighbor12:b:d-5:harm:1"
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
      "id": "neighbor12:beat_v2:a:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "misbelief_push",
      "line": "제가 괜히 그런 말을 한 게 아니에요. 그때는 94만 원이 비는 것처럼 보였고 참가자들이 바로 환불 일정을 물었어요.",
      "behaviorHint": "잘못된 해석을 더 밀어붙이거나 급히 막아 세운다.",
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
          "neighbor12:a:d-1:admission:0",
          "neighbor12:a:d-1:timeline:1",
          "neighbor12:a:d-1:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor12:a:d-1:responsibility:0",
          "neighbor12:a:d-1:harm:1"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-1:surface:mid:interjection:misbelief_escalation:allow",
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
      "id": "neighbor12:beat_v2:b:d-1:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "misbelief_push",
      "line": "그렇게 단정하면 오히려 더 멀어집니다. 그 방 글을 봤을 때 정말 모욕감이 컸습니다. 그래서 더 숫자만 읽으며 방어했는데, 제가 바로 설명하지 않은 책임도 그 안에 있습니다.",
      "behaviorHint": "잘못된 해석을 더 밀어붙이거나 급히 막아 세운다.",
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
          "neighbor12:b:d-1:admission:0",
          "neighbor12:b:d-1:timeline:1",
          "neighbor12:b:d-1:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor12:b:d-1:responsibility:0",
          "neighbor12:b:d-1:harm:1"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-1:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 1,
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "misbelief_escalation",
        "red_herring"
      ],
      "beliefMode": "knows"
    },
    {
      "id": "neighbor12:beat_v2:a:d-1:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "warning",
      "line": "잘린 표만 보면 정말 94만 원이 통째로 비는 것처럼 보였어요. 그 착시에 제가 먼저 올라탄 것도 맞습니다.",
      "behaviorHint": "자료의 잘린 부분이나 함정을 짚으며 경계한다.",
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
        "trapStates": [
          "signal_seen"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor12:a:d-1:admission:0",
          "neighbor12:a:d-1:timeline:1",
          "neighbor12:a:d-1:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor12:a:d-1:responsibility:0",
          "neighbor12:a:d-1:harm:1"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-1:surface:mid:interjection:trap_signal:allow",
      "variantTarget": 1,
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
      "id": "neighbor12:beat_v2:b:d-1:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-12",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "warning",
      "line": "그 캡처는 수식 셀과 이전 라운드 행이 잘려 있습니다. 원본 없이 그 숫자를 현재 환급금처럼 몰면 안 됩니다.",
      "behaviorHint": "자료의 잘린 부분이나 함정을 짚으며 경계한다.",
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
        "trapStates": [
          "signal_seen"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor12:b:d-1:admission:0",
          "neighbor12:b:d-1:timeline:1",
          "neighbor12:b:d-1:counter:0"
        ],
        "forbidAtomIds": [
          "neighbor12:b:d-1:responsibility:0",
          "neighbor12:b:d-1:harm:1"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-1:surface:mid:interjection:trap_signal:block",
      "variantTarget": 1,
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "trap_signal",
        "red_herring"
      ],
      "beliefMode": "knows"
    }
  ]
} as const;

export default neighbor12BeatsV2Full;
