export const neighbor11BeatsV2Full = {
  "caseId": "neighbor-11",
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
      "d-1": 20,
      "d-3": 20,
      "d-4": 12,
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
      "id": "neighbor11:beat_v2:a:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "저는 무단 침입을 한 게 아니라 공용 설비 상태를 확인하려고 4층 창고 쪽에 잠깐 들어간 겁니다.",
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
          "neighbor11:a:d-1:denial:0",
          "neighbor11:a:d-1:timeline:0"
        ],
        "forbidAtomIds": [
          "neighbor11:a:d-1:admission:0",
          "neighbor11:a:d-1:shame:0"
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
      "id": "neighbor11:beat_v2:a:d-1:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "출입기록을 보시면 짧은 시간 열렸다 닫혔고, 그때는 장비 습도와 덕트 상태를 확인할 필요가 있었습니다.",
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
          "neighbor11:a:d-1:denial:0",
          "neighbor11:a:d-1:timeline:0"
        ],
        "forbidAtomIds": [
          "neighbor11:a:d-1:admission:0",
          "neighbor11:a:d-1:shame:0"
        ]
      },
      "weight": 6,
      "priority": 30,
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
      "id": "neighbor11:beat_v2:a:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "counter",
      "line": "창고 불이 켜져 있었고 안쪽 동선도 이미 맞춰져 있었으니, 그 장면을 저 혼자 만든 것처럼 볼 수는 없습니다.",
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
          "neighbor11:a:d-1:act:0",
          "neighbor11:a:d-1:responsibility:0",
          "neighbor11:a:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor11:a:d-1:admission:0",
          "neighbor11:a:d-1:unlock:s5:0"
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
      "id": "neighbor11:beat_v2:a:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "복제 흔적이 남았다면 문을 연 방식은 제 책임이지만, 그때 실제 누수 피해를 확인하려던 것도 사실입니다.",
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
          "neighbor11:a:d-1:act:0",
          "neighbor11:a:d-1:responsibility:0",
          "neighbor11:a:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor11:a:d-1:admission:0",
          "neighbor11:a:d-1:unlock:s5:0"
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
      "id": "neighbor11:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "정식 권한 없이 복제 태그를 쓴 건 선을 넘은 행동이었습니다. 밤에 남의 점포를 드나드는 사람처럼 보일까 봐 더 버텼습니다.",
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
          "neighbor11:a:d-1:shame:0",
          "neighbor11:a:d-1:admission:0",
          "neighbor11:a:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor11:a:d-1:denial:0",
          "neighbor11:a:d-1:timeline:0"
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
      "id": "neighbor11:beat_v2:a:d-1:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confess",
      "line": "굳이 더 말하자면, 제가 휴대폰으로 야간관리 태그를 복제해 4층 서비스도어를 열었고, 그 출입 장면을 보상 압박의 시작점으로 썼습니다.",
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
          "neighbor11:a:d-1:shame:0",
          "neighbor11:a:d-1:admission:0",
          "neighbor11:a:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor11:a:d-1:denial:0",
          "neighbor11:a:d-1:timeline:0"
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
      "id": "neighbor11:beat_v2:b:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "그날 밤 성재 씨가 제 창고 쪽으로 내려온 건 제가 보기에도 침입처럼 느껴졌고, 저는 창고 안전부터 걱정했습니다.",
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
          "neighbor11:b:d-1:fear:0",
          "neighbor11:b:d-1:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor11:b:d-1:relationship:0",
          "neighbor11:b:d-1:shame:0"
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
      "id": "neighbor11:beat_v2:b:d-1:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "문이 어떻게 열린 건지는 몰랐고, 저는 심야에 창고 안쪽이 흔들린 정황만 본 겁니다.",
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
          "neighbor11:b:d-1:fear:0",
          "neighbor11:b:d-1:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor11:b:d-1:relationship:0",
          "neighbor11:b:d-1:shame:0"
        ]
      },
      "weight": 6,
      "priority": 30,
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
      "id": "neighbor11:beat_v2:b:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "counter",
      "line": "복제 태그를 쓰는 방식과 서비스도어 경로는 성재 씨 판단이었고, 저는 그 장면을 피해처럼 보이게 돌린 책임이 있습니다.",
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
          "neighbor11:b:d-1:admission:0",
          "neighbor11:b:d-1:responsibility:0",
          "neighbor11:b:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor11:b:d-1:relationship:0",
          "neighbor11:b:d-1:unlock:s5:0"
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
      "id": "neighbor11:beat_v2:b:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "창고에 들어오는 장면 자체는 미리 알았지만, 야간관리 태그를 복제해서 열 줄은 그때 몰랐습니다.",
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
          "neighbor11:b:d-1:admission:0",
          "neighbor11:b:d-1:responsibility:0",
          "neighbor11:b:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor11:b:d-1:relationship:0",
          "neighbor11:b:d-1:unlock:s5:0"
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
      "id": "neighbor11:beat_v2:b:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "제가 사실상 허락해 놓고도 나중에는 완전한 침입처럼 말한 건 분명 잘못이었습니다.",
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
          "neighbor11:b:d-1:shame:0",
          "neighbor11:b:d-1:relationship:0",
          "neighbor11:b:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor11:b:d-1:fear:0",
          "neighbor11:b:d-1:uncertainty:0"
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
      "id": "neighbor11:beat_v2:b:d-1:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confess",
      "line": "굳이 더 말하자면, 저는 성재 씨와 창고 출입 장면을 만들기로 합의했고, 복제 태그로 문이 열린 뒤에도 그 장면을 침입 피해처럼 돌렸습니다.",
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
          "neighbor11:b:d-1:shame:0",
          "neighbor11:b:d-1:relationship:0",
          "neighbor11:b:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor11:b:d-1:fear:0",
          "neighbor11:b:d-1:uncertainty:0"
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
      "id": "neighbor11:beat_v2:a:d-3:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "저와 라은 씨는 같은 하자를 겪은 임차인일 뿐이고, 상층·하층 갈등을 짜 맞춘 적은 없습니다.",
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
          "neighbor11:a:d-3:denial:0",
          "neighbor11:a:d-3:relationship:0"
        ],
        "forbidAtomIds": [
          "neighbor11:a:d-3:admission:0",
          "neighbor11:a:d-3:emotion:0"
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
      "id": "neighbor11:beat_v2:a:d-3:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "자료를 맞춰 본 건 있지만, 그건 민원 타이밍과 보상 항목을 정리한 수준이지 갈등 연출은 아니었습니다.",
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
          "neighbor11:a:d-3:denial:0",
          "neighbor11:a:d-3:relationship:0"
        ],
        "forbidAtomIds": [
          "neighbor11:a:d-3:admission:0",
          "neighbor11:a:d-3:emotion:0"
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
      "id": "neighbor11:beat_v2:a:d-3:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "counter",
      "line": "보상 요구 금액과 문구를 맞춘 건 사실이고, 싸우는 그림이 보여야 움직인다고 본 것도 둘 다였습니다.",
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
          "neighbor11:a:d-3:context:0",
          "neighbor11:a:d-3:responsibility:0",
          "neighbor11:a:d-3:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor11:a:d-3:admission:0",
          "neighbor11:a:d-3:unlock:s5:0"
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
      "id": "neighbor11:beat_v2:a:d-3:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "메시지를 주고받은 건 맞습니다. 다만 그때도 저는 하자 보상을 받기 위한 공동 대응이라고만 생각했습니다.",
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
          "neighbor11:a:d-3:context:0",
          "neighbor11:a:d-3:responsibility:0",
          "neighbor11:a:d-3:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor11:a:d-3:admission:0",
          "neighbor11:a:d-3:unlock:s5:0"
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
      "id": "neighbor11:beat_v2:a:d-3:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "emotional",
      "line": "하자 보상을 받아야 한다는 생각이 맞더라도, 제가 그걸 갈등 설계로 바꿔 버린 순간부터는 다른 문제가 됐습니다.",
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
          "neighbor11:a:d-3:emotion:0",
          "neighbor11:a:d-3:admission:0",
          "neighbor11:a:d-3:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor11:a:d-3:denial:0",
          "neighbor11:a:d-3:relationship:0"
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
      "id": "neighbor11:beat_v2:a:d-3:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confess",
      "line": "정형 질문이 아니라면 하자 보상을 받아야 한다는 생각이 맞더라도, 제가 그걸 갈등 설계로 바꿔 버린 순간부터는 다른 문제가 됐습니다.",
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
          "neighbor11:a:d-3:emotion:0",
          "neighbor11:a:d-3:admission:0",
          "neighbor11:a:d-3:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor11:a:d-3:denial:0",
          "neighbor11:a:d-3:relationship:0"
        ]
      },
      "weight": 4,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:rapport:emotion",
      "coverageKey": "a:d-3:core:late:rapport:emotion",
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
      "id": "neighbor11:beat_v2:b:d-3:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "저와 성재 씨는 둘 다 같은 하자에 당한 사람들이지, 갈등을 꾸민 공모자는 아닙니다.",
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
          "neighbor11:b:d-3:relationship:0",
          "neighbor11:b:d-3:timeline:0"
        ],
        "forbidAtomIds": [
          "neighbor11:b:d-3:admission:0",
          "neighbor11:b:d-3:emotion:0"
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
      "id": "neighbor11:beat_v2:b:d-3:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "우리가 한 건 공동 민원 이야기를 나눈 정도예요. 언제 말할지, 얼마나 손해 봤는지 맞춰 본 수준이었죠.",
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
          "neighbor11:b:d-3:relationship:0",
          "neighbor11:b:d-3:timeline:0"
        ],
        "forbidAtomIds": [
          "neighbor11:b:d-3:admission:0",
          "neighbor11:b:d-3:emotion:0"
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
      "id": "neighbor11:beat_v2:b:d-3:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "counter",
      "line": "결국 저희는 싸우는 그림이 나와야 건물주가 움직인다고 봤고, 그 판단을 성재 씨와 같이 밀어붙였습니다.",
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
          "neighbor11:b:d-3:context:0",
          "neighbor11:b:d-3:quote:0",
          "neighbor11:b:d-3:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor11:b:d-3:admission:0",
          "neighbor11:b:d-3:unlock:s5:0"
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
      "id": "neighbor11:beat_v2:b:d-3:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "메신저로 보상 요구 시점과 금액을 이야기한 건 맞아요. 그래도 그때는 같이 버티는 방법을 찾는다고 생각했어요.",
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
          "neighbor11:b:d-3:context:0",
          "neighbor11:b:d-3:quote:0",
          "neighbor11:b:d-3:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor11:b:d-3:admission:0",
          "neighbor11:b:d-3:unlock:s5:0"
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
      "id": "neighbor11:beat_v2:b:d-3:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "emotional",
      "line": "제가 '우리 둘 다 당한 사람'이라고 말한 건 사실 공모를 공동 피해 언어로 덮으려는 표현이었습니다.",
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
          "neighbor11:b:d-3:emotion:0",
          "neighbor11:b:d-3:admission:0",
          "neighbor11:b:d-3:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor11:b:d-3:relationship:0",
          "neighbor11:b:d-3:timeline:0"
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
      "id": "neighbor11:beat_v2:b:d-3:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confess",
      "line": "정형 질문이 아니라면 제가 '우리 둘 다 당한 사람'이라고 말한 건 사실 공모를 공동 피해 언어로 덮으려는 표현이었습니다.",
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
          "neighbor11:b:d-3:emotion:0",
          "neighbor11:b:d-3:admission:0",
          "neighbor11:b:d-3:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor11:b:d-3:relationship:0",
          "neighbor11:b:d-3:timeline:0"
        ]
      },
      "weight": 4,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:rapport:emotion",
      "coverageKey": "b:d-3:core:late:rapport:emotion",
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
      "id": "neighbor11:beat_v2:a:d-4:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "mistaken",
      "line": "건물주 쪽은 그때까지 보수나 임대료 감면을 검토한 적이 전혀 없다고 봤습니다.",
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
          "neighbor11:a:d-4:institution:0",
          "neighbor11:a:d-4:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor11:a:d-4:admission:0",
          "neighbor11:a:d-4:emotion:0"
        ]
      },
      "weight": 5,
      "priority": 25,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:trap:identity",
      "coverageKey": "a:d-4:surface:early:trap:identity",
      "variantTarget": 4,
      "setFlags": [
        "d-4:surface:misbelief_named"
      ],
      "tags": [
        "misbelief",
        "trap"
      ]
    },
    {
      "id": "neighbor11:beat_v2:a:d-4:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "mistaken",
      "line": "적어도 저희에게 공식 통지는 없었고, 그래서 현장에서는 아무 검토도 안 하는 걸로 보였습니다.",
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
          "neighbor11:a:d-4:institution:0",
          "neighbor11:a:d-4:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor11:a:d-4:admission:0",
          "neighbor11:a:d-4:emotion:0"
        ]
      },
      "weight": 5,
      "priority": 25,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:trap:context",
      "coverageKey": "a:d-4:surface:early:trap:context",
      "variantTarget": 4,
      "setFlags": [
        "d-4:surface:misbelief_named"
      ],
      "tags": [
        "misbelief",
        "trap"
      ]
    },
    {
      "id": "neighbor11:beat_v2:a:d-4:core:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "doubt",
      "line": "전날 밤 초안이 있었다면 제 '전혀 검토 안 했다'는 말은 과했지만, 몇 달 동안 지연된 불신이 그 단정을 키운 겁니다.",
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
          "neighbor11:a:d-4:emotion:0",
          "neighbor11:a:d-4:admission:0",
          "neighbor11:a:d-4:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor11:a:d-4:institution:0",
          "neighbor11:a:d-4:uncertainty:0"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:core:trap:context",
      "coverageKey": "a:d-4:core:late:trap:context",
      "variantTarget": 3,
      "setFlags": [
        "d-4:core:misbelief_cracked"
      ],
      "tags": [
        "misbelief",
        "trap"
      ]
    },
    {
      "id": "neighbor11:beat_v2:a:d-4:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "clarify",
      "line": "보상안이 이미 돌고 있었다는 걸 이제야 들으니, 제가 버텼던 전제가 많이 흔들립니다.",
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
          "neighbor11:a:d-4:emotion:0",
          "neighbor11:a:d-4:admission:0",
          "neighbor11:a:d-4:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor11:a:d-4:institution:0",
          "neighbor11:a:d-4:uncertainty:0"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:core:trap:emotion",
      "coverageKey": "a:d-4:core:late:trap:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-4:core:clarity_opened"
      ],
      "tags": [
        "misbelief",
        "trap"
      ]
    },
    {
      "id": "neighbor11:beat_v2:b:d-4:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "mistaken",
      "line": "건물주 쪽은 끝까지 저희를 무시했고, 보상안 같은 건 애초에 검토하지도 않았다고 생각했습니다.",
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
          "neighbor11:b:d-4:institution:0",
          "neighbor11:b:d-4:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor11:b:d-4:admission:0",
          "neighbor11:b:d-4:emotion:0"
        ]
      },
      "weight": 5,
      "priority": 25,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:surface:trap:identity",
      "coverageKey": "b:d-4:surface:early:trap:identity",
      "variantTarget": 4,
      "setFlags": [
        "d-4:surface:misbelief_named"
      ],
      "tags": [
        "misbelief",
        "trap"
      ]
    },
    {
      "id": "neighbor11:beat_v2:b:d-4:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "mistaken",
      "line": "답을 받은 적이 없으니 없는 줄 알았어요. 현장에서는 진짜 아무것도 안 움직이는 것처럼 보였거든요.",
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
          "neighbor11:b:d-4:institution:0",
          "neighbor11:b:d-4:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor11:b:d-4:admission:0",
          "neighbor11:b:d-4:emotion:0"
        ]
      },
      "weight": 5,
      "priority": 25,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:surface:trap:context",
      "coverageKey": "b:d-4:surface:early:trap:context",
      "variantTarget": 4,
      "setFlags": [
        "d-4:surface:misbelief_named"
      ],
      "tags": [
        "misbelief",
        "trap"
      ]
    },
    {
      "id": "neighbor11:beat_v2:b:d-4:core:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "doubt",
      "line": "이미 검토 중이었다면 제 '전혀 안 봤다'는 말은 틀린 거예요. 다만 그만큼 쌓인 무시의 감정이 컸습니다.",
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
          "neighbor11:b:d-4:emotion:0",
          "neighbor11:b:d-4:admission:0",
          "neighbor11:b:d-4:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor11:b:d-4:institution:0",
          "neighbor11:b:d-4:uncertainty:0"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:core:trap:context",
      "coverageKey": "b:d-4:core:late:trap:context",
      "variantTarget": 3,
      "setFlags": [
        "d-4:core:misbelief_cracked"
      ],
      "tags": [
        "misbelief",
        "trap"
      ]
    },
    {
      "id": "neighbor11:beat_v2:b:d-4:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "clarify",
      "line": "전날 밤 이미 감면안 초안이 있었다는 말을 들으니, 제가 붙들고 있던 피해 서사가 한 번에 무너지는 느낌입니다.",
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
          "neighbor11:b:d-4:emotion:0",
          "neighbor11:b:d-4:admission:0",
          "neighbor11:b:d-4:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor11:b:d-4:institution:0",
          "neighbor11:b:d-4:uncertainty:0"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:core:trap:emotion",
      "coverageKey": "b:d-4:core:late:trap:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-4:core:clarity_opened"
      ],
      "tags": [
        "misbelief",
        "trap"
      ]
    },
    {
      "id": "neighbor11:beat_v2:a:d-2:surface:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "rebut",
      "line": "31초 편집 클립를 봐도 31초만 돌린 건 압니다. 다만 실제 누수와 냉방 장애로 손실이 있었던 것도 사실이라 그 선을 제가 흐렸습니다.",
      "behaviorHint": "증거를 보고 잠깐 멈칫한 뒤 해석 범위를 좁히려 한다.",
      "applicableStates": [
        "S1",
        "S2"
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
          "neighbor11:a:d-2:evidence:0",
          "neighbor11:a:d-2:context:0",
          "neighbor11:a:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor11:a:d-2:admission:0",
          "neighbor11:a:d-2:emotion:0"
        ]
      },
      "weight": 7,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:evidence:identity",
      "coverageKey": "a:d-2:surface:early:evidence:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:evidence_shown"
      ],
      "tags": [
        "sub_evidence",
        "evidence"
      ]
    },
    {
      "id": "neighbor11:beat_v2:b:d-2:surface:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "rebut",
      "line": "31초 편집 클립를 봐도 맞아요, 앞뒤를 잘라 돌렸고 박스도 더 눈에 띄게 다시 놨습니다. 그래도 실제 피해가 있었으니 완전한 허구는 아니라고 버텼습니다.",
      "behaviorHint": "증거를 보고 잠깐 멈칫한 뒤 해석 범위를 좁히려 한다.",
      "applicableStates": [
        "S1",
        "S2"
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
          "neighbor11:b:d-2:evidence:0",
          "neighbor11:b:d-2:harm:0",
          "neighbor11:b:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor11:b:d-2:responsibility:0",
          "neighbor11:b:d-2:shame:0"
        ]
      },
      "weight": 7,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:evidence:identity",
      "coverageKey": "b:d-2:surface:early:evidence:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:evidence_shown"
      ],
      "tags": [
        "sub_evidence",
        "evidence"
      ]
    },
    {
      "id": "neighbor11:beat_v2:a:d-5:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "rebut",
      "line": "31초 편집 클립까지 나오면 공개 압박 문구는 라은 씨 쪽 표현이 더 셌고, 저는 그 흐름을 말리지 않은 책임이 있습니다.",
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
          "neighbor11:a:d-5:motive:0",
          "neighbor11:a:d-5:responsibility:0",
          "neighbor11:a:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor11:a:d-5:admission:0",
          "neighbor11:a:d-5:unlock:s5:0"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:evidence:legality",
      "coverageKey": "a:d-5:motive:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-5:motive:evidence_shown"
      ],
      "tags": [
        "sub_evidence",
        "evidence"
      ]
    },
    {
      "id": "neighbor11:beat_v2:b:d-5:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "rebut",
      "line": "31초 편집 클립까지 나오면 그 압박은 저 혼자 한 게 아니라 성재 씨와 같이 타이밍을 맞춘 거예요. 저도 피해자 자리를 지키려고 더 세게 밀었습니다.",
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
          "neighbor11:b:d-5:motive:0",
          "neighbor11:b:d-5:responsibility:0",
          "neighbor11:b:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor11:b:d-5:admission:0",
          "neighbor11:b:d-5:unlock:s5:0"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:evidence:legality",
      "coverageKey": "b:d-5:motive:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-5:motive:evidence_shown"
      ],
      "tags": [
        "sub_evidence",
        "evidence"
      ]
    },
    {
      "id": "neighbor11:beat_v2:a:d-1:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "irritation",
      "line": "NFC 태그 복제와 창고 침입 연출 얘기는 이미 했습니다. 복제 흔적이 남았다면 문을 연 방식은 제 책임이지만, 그때 실제 누수 피해를 확인하려던 것도 사실입니다. 같은 순서를 또 돌리시면 저도 짜증부터 납니다.",
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
          "neighbor11:a:d-1:act:0",
          "neighbor11:a:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "neighbor11:a:d-1:admission:0",
          "neighbor11:a:d-1:unlock:s5:0"
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
      "id": "neighbor11:beat_v2:a:d-1:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "block",
      "line": "같은 책임 질문만 반복하시면 더는 넓게 답하지 않겠습니다. 지금은 NFC 태그 복제와 창고 침입 연출의 핵심만 정리하고 싶습니다.",
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
          "neighbor11:a:d-1:act:0",
          "neighbor11:a:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "neighbor11:a:d-1:admission:0",
          "neighbor11:a:d-1:unlock:s5:0"
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
      "id": "neighbor11:beat_v2:a:d-1:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "counterattack",
      "line": "계속 저만 몰지 마세요. 창고 불이 켜져 있었고 안쪽 동선도 이미 맞춰져 있었으니, 그 장면을 저 혼자 만든 것처럼 볼 수는 없습니다.",
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
          "neighbor11:a:d-1:act:0",
          "neighbor11:a:d-1:responsibility:0",
          "neighbor11:a:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor11:a:d-1:admission:0",
          "neighbor11:a:d-1:unlock:s5:0"
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
      "id": "neighbor11:beat_v2:b:d-1:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "irritation",
      "line": "NFC 태그 복제와 창고 침입 연출 얘기는 이미 했습니다. 창고에 들어오는 장면 자체는 미리 알았지만, 야간관리 태그를 복제해서 열 줄은 그때 몰랐습니다. 같은 순서를 또 돌리시면 저도 짜증부터 납니다.",
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
          "neighbor11:b:d-1:admission:0",
          "neighbor11:b:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "neighbor11:b:d-1:relationship:0",
          "neighbor11:b:d-1:unlock:s5:0"
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
      "id": "neighbor11:beat_v2:b:d-1:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "block",
      "line": "같은 책임 질문만 반복하시면 더는 넓게 답하지 않겠습니다. 지금은 NFC 태그 복제와 창고 침입 연출의 핵심만 정리하고 싶습니다.",
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
          "neighbor11:b:d-1:admission:0",
          "neighbor11:b:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "neighbor11:b:d-1:relationship:0",
          "neighbor11:b:d-1:unlock:s5:0"
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
      "id": "neighbor11:beat_v2:b:d-1:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "counterattack",
      "line": "계속 저만 몰지 마세요. 복제 태그를 쓰는 방식과 서비스도어 경로는 성재 씨 판단이었고, 저는 그 장면을 피해처럼 보이게 돌린 책임이 있습니다.",
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
          "neighbor11:b:d-1:admission:0",
          "neighbor11:b:d-1:responsibility:0",
          "neighbor11:b:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor11:b:d-1:relationship:0",
          "neighbor11:b:d-1:unlock:s5:0"
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
      "id": "neighbor11:beat_v2:a:d-3:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "irritation",
      "line": "상·하층 분쟁 자체가 공모인가 얘기는 이미 했습니다. 메시지를 주고받은 건 맞습니다. 다만 그때도 저는 하자 보상을 받기 위한 공동 대응이라고만 생각했습니다. 같은 순서를 또 돌리시면 저도 짜증부터 납니다.",
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
          "neighbor11:a:d-3:context:0",
          "neighbor11:a:d-3:responsibility:0"
        ],
        "forbidAtomIds": [
          "neighbor11:a:d-3:admission:0",
          "neighbor11:a:d-3:unlock:s5:0"
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
      "id": "neighbor11:beat_v2:a:d-3:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "block",
      "line": "같은 책임 질문만 반복하시면 더는 넓게 답하지 않겠습니다. 지금은 상·하층 분쟁 자체가 공모인가의 핵심만 정리하고 싶습니다.",
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
          "neighbor11:a:d-3:context:0",
          "neighbor11:a:d-3:responsibility:0"
        ],
        "forbidAtomIds": [
          "neighbor11:a:d-3:admission:0",
          "neighbor11:a:d-3:unlock:s5:0"
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
      "id": "neighbor11:beat_v2:a:d-3:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "counterattack",
      "line": "계속 저만 몰지 마세요. 보상 요구 금액과 문구를 맞춘 건 사실이고, 싸우는 그림이 보여야 움직인다고 본 것도 둘 다였습니다.",
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
          "neighbor11:a:d-3:context:0",
          "neighbor11:a:d-3:responsibility:0",
          "neighbor11:a:d-3:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor11:a:d-3:admission:0",
          "neighbor11:a:d-3:unlock:s5:0"
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
      "id": "neighbor11:beat_v2:b:d-3:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "irritation",
      "line": "상·하층 분쟁 자체가 공모인가 얘기는 이미 했습니다. 메신저로 보상 요구 시점과 금액을 이야기한 건 맞아요. 그래도 그때는 같이 버티는 방법을 찾는다고 생각했어요. 같은 순서를 또 돌리시면 저도 짜증부터 납니다.",
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
          "neighbor11:b:d-3:context:0",
          "neighbor11:b:d-3:quote:0"
        ],
        "forbidAtomIds": [
          "neighbor11:b:d-3:admission:0",
          "neighbor11:b:d-3:unlock:s5:0"
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
      "id": "neighbor11:beat_v2:b:d-3:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "block",
      "line": "같은 책임 질문만 반복하시면 더는 넓게 답하지 않겠습니다. 지금은 상·하층 분쟁 자체가 공모인가의 핵심만 정리하고 싶습니다.",
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
          "neighbor11:b:d-3:context:0",
          "neighbor11:b:d-3:quote:0"
        ],
        "forbidAtomIds": [
          "neighbor11:b:d-3:admission:0",
          "neighbor11:b:d-3:unlock:s5:0"
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
      "id": "neighbor11:beat_v2:b:d-3:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "counterattack",
      "line": "계속 저만 몰지 마세요. 결국 저희는 싸우는 그림이 나와야 건물주가 움직인다고 봤고, 그 판단을 성재 씨와 같이 밀어붙였습니다.",
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
          "neighbor11:b:d-3:context:0",
          "neighbor11:b:d-3:quote:0",
          "neighbor11:b:d-3:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor11:b:d-3:admission:0",
          "neighbor11:b:d-3:unlock:s5:0"
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
      "id": "neighbor11:beat_v2:a:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "burst",
      "line": "정식 권한 없이 복제 태그를 쓴 건 선을 넘은 행동이었습니다. 밤에 남의 점포를 드나드는 사람처럼 보일까 봐 더 버텼습니다.",
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
          "neighbor11:a:d-1:act:0",
          "neighbor11:a:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "neighbor11:a:d-1:admission:0",
          "neighbor11:a:d-1:unlock:s5:0"
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
      "id": "neighbor11:beat_v2:b:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "burst",
      "line": "제가 사실상 허락해 놓고도 나중에는 완전한 침입처럼 말한 건 분명 잘못이었습니다.",
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
          "neighbor11:b:d-1:admission:0",
          "neighbor11:b:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "neighbor11:b:d-1:relationship:0",
          "neighbor11:b:d-1:unlock:s5:0"
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
      "id": "neighbor11:beat_v2:a:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "burst",
      "line": "그 감정은 알겠지만, 지금은 상·하층 분쟁 자체가 공모인가라는 쟁점부터 분리해서 보셔야 합니다.",
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
          "neighbor11:a:d-3:context:0",
          "neighbor11:a:d-3:responsibility:0"
        ],
        "forbidAtomIds": [
          "neighbor11:a:d-3:admission:0",
          "neighbor11:a:d-3:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-3:surface:mid:interjection:emotional_only:block",
      "variantTarget": 1,
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "neighbor11:beat_v2:b:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "burst",
      "line": "그 감정은 알겠지만, 지금은 상·하층 분쟁 자체가 공모인가라는 쟁점부터 분리해서 보셔야 합니다.",
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
          "neighbor11:b:d-3:context:0",
          "neighbor11:b:d-3:quote:0"
        ],
        "forbidAtomIds": [
          "neighbor11:b:d-3:admission:0",
          "neighbor11:b:d-3:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:emotional_only:block",
      "variantTarget": 1,
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "neighbor11:beat_v2:a:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "rebuttal",
      "line": "박스 배열이나 직원 쪽 멘트는 라은 씨가 더 적극적으로 만든 부분이고, 저는 실제 하자 자료와 섞이는 걸 막지 못했습니다.",
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
          "neighbor11:a:d-2:counter:0",
          "neighbor11:a:d-2:self_justification:0"
        ],
        "forbidAtomIds": [
          "neighbor11:a:d-2:admission:0",
          "neighbor11:a:d-2:unlock:s5:0"
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
      "id": "neighbor11:beat_v2:b:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "rebuttal",
      "line": "실제 누수와 냉방 장애가 계속됐으니, 저는 그 피해가 무시되지 않게 보이도록 더 세게 꾸민 겁니다.",
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
          "neighbor11:b:d-2:admission:0",
          "neighbor11:b:d-2:self_justification:0"
        ],
        "forbidAtomIds": [
          "neighbor11:b:d-2:responsibility:0",
          "neighbor11:b:d-2:unlock:s5:0"
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
      "id": "neighbor11:beat_v2:a:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "rebuttal",
      "line": "숫자나 장면을 한 조각만 떼어 말하지 마세요. 31초 편집 클립까지 같이 봐야 관리대행사 확인 전 공개 압박라는 쟁점이 정리됩니다.",
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
          "neighbor11:a:d-5:motive:0",
          "neighbor11:a:d-5:responsibility:0"
        ],
        "forbidAtomIds": [
          "neighbor11:a:d-5:admission:0",
          "neighbor11:a:d-5:unlock:s5:0"
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
      "id": "neighbor11:beat_v2:b:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "rebuttal",
      "line": "숫자나 장면을 한 조각만 떼어 말하지 마세요. 31초 편집 클립까지 같이 봐야 관리대행사 확인 전 공개 압박라는 쟁점이 정리됩니다.",
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
          "neighbor11:b:d-5:motive:0",
          "neighbor11:b:d-5:responsibility:0"
        ],
        "forbidAtomIds": [
          "neighbor11:b:d-5:admission:0",
          "neighbor11:b:d-5:unlock:s5:0"
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
      "id": "neighbor11:beat_v2:a:d-4:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "misbelief_push",
      "line": "건물주 쪽은 그때까지 보수나 임대료 감면을 검토한 적이 전혀 없다고 봤습니다.",
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
          "neighbor11:a:d-4:counter:0",
          "neighbor11:a:d-4:threshold:0",
          "neighbor11:a:d-4:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor11:a:d-4:admission:0",
          "neighbor11:a:d-4:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-4:surface:mid:interjection:misbelief_escalation:allow",
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
      "id": "neighbor11:beat_v2:b:d-4:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "misbelief_push",
      "line": "그렇게 단정하면 오히려 더 멀어집니다. 전날 밤 이미 감면안 초안이 있었다는 말을 들으니, 제가 붙들고 있던 피해 서사가 한 번에 무너지는 느낌입니다.",
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
          "neighbor11:b:d-4:counter:0",
          "neighbor11:b:d-4:threshold:0",
          "neighbor11:b:d-4:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor11:b:d-4:admission:0",
          "neighbor11:b:d-4:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-4:surface:mid:interjection:misbelief_escalation:block",
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
      "id": "neighbor11:beat_v2:a:d-4:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "warning",
      "line": "초안 이메일이 빠진 채 보면 정말 아무도 안 움직인 것처럼 느껴집니다. 그 착시가 우리 판단을 밀어준 건 맞습니다.",
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
          "neighbor11:a:d-4:counter:0",
          "neighbor11:a:d-4:threshold:0",
          "neighbor11:a:d-4:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor11:a:d-4:admission:0",
          "neighbor11:a:d-4:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-4:surface:mid:interjection:trap_signal:allow",
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
      "id": "neighbor11:beat_v2:b:d-4:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "warning",
      "line": "그 문구는 앞뒤가 잘렸어요. 초안 메일과 보류 사유까지 같이 보지 않으면 무시로 단정하면 안 됩니다.",
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
          "neighbor11:b:d-4:counter:0",
          "neighbor11:b:d-4:threshold:0",
          "neighbor11:b:d-4:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor11:b:d-4:admission:0",
          "neighbor11:b:d-4:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-4:surface:mid:interjection:trap_signal:block",
      "variantTarget": 1,
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

export default neighbor11BeatsV2Full;
