export const family12BeatsV2Full = {
  "caseId": "family-12",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 52,
    "byActionFamily": {
      "question": 25,
      "evidence": 5,
      "fatigue": 6,
      "free_question": 4,
      "interjection": 12
    },
    "byResponseIntent": {
      "pressure_response": 16,
      "motive_response": 6,
      "rapport_response": 10,
      "evidence_response": 5,
      "trap_confusion_response": 9,
      "fatigue_response": 6
    },
    "byIssueRole": {
      "core_truth": 28,
      "sub_truth": 14,
      "red_herring": 10
    },
    "byStage": {
      "early": 10,
      "mid": 32,
      "late": 10
    },
    "interjectionDistribution": {
      "emotional_only": 4,
      "detail_rebuttal": 4,
      "misbelief_escalation": 2,
      "trap_signal": 2
    },
    "questionTypeCounts": {
      "fact_pursuit": 20,
      "motive_search": 8,
      "empathy_approach": 7,
      "evidence_present": 5
    }
  },
  "beats": [
    {
      "id": "family12:beat_v2:a:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "저는 가족방에 잠깐 사실 확인을 요청한 것뿐이고, 현우를 공개적으로 망신 주려던 건 아닙니다. 그 순서를 자꾸 뒤틀어 묻지 마세요.",
      "behaviorHint": "도덕적 비난 프레임을 먼저 세워 공세의 주도권을 잡으려 한다.",
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
          "irritated"
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
          "family12:a:d-1:s0:atom:0"
        ],
        "forbidAtomIds": [
          "family12:a:d-1:s5:atom:0"
        ]
      },
      "weight": 7,
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
      "id": "family12:beat_v2:b:d-1:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "제가 상처 준 문장이 일부 있었어도 공개 망신까지 갈 일은 아니었습니다. 마치 제가 혼자 판을 짠 사람처럼 몰아가진 마세요.",
      "behaviorHint": "기록과 순서를 차례로 대며 감정 개입을 최대한 억누른다.",
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
          "irritated"
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
          "family12:b:d-1:s1:atom:1"
        ],
        "forbidAtomIds": [
          "family12:b:d-1:s5:atom:0"
        ]
      },
      "weight": 7,
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
      "id": "family12:beat_v2:a:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "그때 제 눈에는 현우 말이 너무 잔인하게 들렸습니다. 제 몫이 있더라도 책임 전부를 여기로 모는 건 과합니다.",
      "behaviorHint": "명분을 앞세워 공개 대응과 확산 선택을 정당화한다.",
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
          "irritated",
          "agitated"
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
          "family12:a:d-1:s2:atom:1"
        ],
        "forbidAtomIds": [
          "family12:a:d-1:s5:atom:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:pressure:responsibility",
      "coverageKey": "a:d-1:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-1:motive:responsibility_pressed"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "family12:beat_v2:a:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "그때 제 눈에는 현우 말이 너무 잔인하게 들렸습니다. 왜 그렇게 움직였는지의 배경까지 봐야 합니다.",
      "behaviorHint": "명분을 앞세워 공개 대응과 확산 선택을 정당화한다.",
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
          "irritated",
          "agitated"
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
          "family12:a:d-1:s2:atom:1"
        ],
        "forbidAtomIds": [
          "family12:a:d-1:s5:atom:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:motive:motive",
      "coverageKey": "a:d-1:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-1:motive:motive_opened"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "family12:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "그래서 한 방에서 끝내지 못하고 사람들한테 먼저 보여 버렸습니다. 그때는 이미 감정이 무너져 있어서 판단이 좁아졌습니다.",
      "behaviorHint": "공격성 아래 눌린 두려움과 수치가 고백 쪽으로 기운다.",
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
          "agitated",
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
          "family12:a:d-1:s4:atom:1"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-1:core:emotion_opened"
      ],
      "tags": [
        "late"
      ]
    },
    {
      "id": "family12:beat_v2:a:d-1:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "그때 제 눈에는 현우 말이 너무 잔인하게 들렸습니다. 그 자료를 함께 보면 앞뒤 맥락도 같이 드러납니다.",
      "behaviorHint": "자료가 제시되자 부인 범위를 줄이며 문장 속도를 낮춘다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
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
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "fresh",
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family12:a:d-1:s2:atom:1"
        ],
        "forbidAtomIds": [
          "family12:a:d-1:s5:atom:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:evidence:context",
      "coverageKey": "a:d-1:motive:mid:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:context_evidence_seen"
      ],
      "tags": [
        "evidence",
        "cold",
        "e-5"
      ],
      "evidenceId": "e-5"
    },
    {
      "id": "family12:beat_v2:b:d-2:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "몇 줄 물어본 건 맞지만, 불만이라고 할 정도는 아닙니다. 그 순서를 자꾸 뒤틀어 묻지 마세요.",
      "behaviorHint": "기록과 순서를 차례로 대며 감정 개입을 최대한 억누른다.",
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
          "irritated"
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
          "family12:b:d-2:s1:atom:1"
        ],
        "forbidAtomIds": [
          "family12:b:d-2:s5:atom:1"
        ]
      },
      "weight": 7,
      "priority": 30,
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
      "id": "family12:beat_v2:a:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "제가 예민했던 게 아니라 시기와 태도가 무심했습니다. 앞뒤 사정을 빼면 제가 더 나쁘게 들립니다.",
      "behaviorHint": "도덕적 비난 프레임을 먼저 세워 공세의 주도권을 잡으려 한다.",
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
          "irritated"
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
          "family12:a:d-2:s1:atom:1"
        ],
        "forbidAtomIds": [
          "family12:a:d-2:s5:atom:1"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:pressure:context",
      "coverageKey": "a:d-2:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "family12:beat_v2:b:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "말투가 건조했고 애도 중 타이밍도 나빴지만, 누나를 도둑 취급하려던 건 아니었습니다. 제 몫이 있더라도 책임 전부를 여기로 모는 건 과합니다.",
      "behaviorHint": "로그와 규칙을 근거로 책임 비율을 다시 계산하듯 답한다.",
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
          "irritated",
          "agitated"
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
          "family12:b:d-2:s3:atom:1"
        ],
        "forbidAtomIds": [
          "family12:b:d-2:s5:atom:1"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:pressure:responsibility",
      "coverageKey": "b:d-2:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-2:motive:responsibility_pressed"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "family12:beat_v2:b:d-2:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "다만 저는 정산 정확도를 확인하려던 거였고, 시기가 장례 중이라 무심하게 들릴 수 있었다는 건 압니다. 왜 그렇게 움직였는지의 배경까지 봐야 합니다.",
      "behaviorHint": "로그와 규칙을 근거로 책임 비율을 다시 계산하듯 답한다.",
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
          "irritated",
          "agitated"
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
          "family12:b:d-2:s2:atom:1"
        ],
        "forbidAtomIds": [
          "family12:b:d-2:s5:atom:1"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:motive:motive",
      "coverageKey": "b:d-2:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-2:motive:motive_opened"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "family12:beat_v2:b:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "그래도 상중에 그런 식으로 물으면 차갑게 들릴 수밖에 없었습니다. 그때는 이미 감정이 무너져 있어서 판단이 좁아졌습니다.",
      "behaviorHint": "차갑게 쌓던 논리 틈에서 억눌린 불안과 피로가 드러난다.",
      "applicableStates": [
        "S4",
        "S5"
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
          "family12:b:d-2:s4:atom:1"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:core:rapport:emotion",
      "coverageKey": "b:d-2:core:late:rapport:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-2:core:emotion_opened"
      ],
      "tags": [
        "late"
      ]
    },
    {
      "id": "family12:beat_v2:b:d-2:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "말투가 건조했고 애도 중 타이밍도 나빴지만, 누나를 도둑 취급하려던 건 아니었습니다. 그 자료를 함께 보면 앞뒤 맥락도 같이 드러납니다.",
      "behaviorHint": "자료가 제시되자 부인 범위를 줄이며 문장 속도를 낮춘다.",
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
          "calm",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "fresh",
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family12:b:d-2:s3:atom:1"
        ],
        "forbidAtomIds": [
          "family12:b:d-2:s5:atom:1"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:evidence:context",
      "coverageKey": "b:d-2:motive:mid:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:context_evidence_seen"
      ],
      "tags": [
        "evidence",
        "cold",
        "e-2"
      ],
      "evidenceId": "e-2"
    },
    {
      "id": "family12:beat_v2:a:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "그래도 현우가 어머니 통장 얘기까지 꺼낸 것처럼 받아들일 만한 흐름은 있었습니다. 지금 보이는 장면만으로 단정하면 오해가 더 커집니다.",
      "behaviorHint": "도덕적 비난 프레임을 먼저 세워 공세의 주도권을 잡으려 한다.",
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
          "irritated"
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
          "family12:a:d-3:s1:atom:1"
        ],
        "forbidAtomIds": [
          "family12:a:d-3:s5:atom:0"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:identity",
      "coverageKey": "a:d-3:surface:early:trap:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-3:surface:misbelief_opened"
      ],
      "tags": [
        "hot",
        "trap",
        "red_herring"
      ]
    },
    {
      "id": "family12:beat_v2:b:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "저는 비용 중복만 물었지 어머니 통장을 들먹이지 않았습니다. 지금 보이는 장면만으로 단정하면 오해가 더 커집니다.",
      "behaviorHint": "기록과 순서를 차례로 대며 감정 개입을 최대한 억누른다.",
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
          "irritated"
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
          "family12:b:d-3:s1:atom:1"
        ],
        "forbidAtomIds": [
          "family12:b:d-3:s5:atom:0"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:context",
      "coverageKey": "b:d-3:surface:early:trap:context",
      "variantTarget": 6,
      "setFlags": [
        "d-3:surface:misbelief_opened"
      ],
      "tags": [
        "hot",
        "trap",
        "red_herring"
      ]
    },
    {
      "id": "family12:beat_v2:a:d-3:motive:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "다만 비용과 정산을 먼저 본 태도 자체는 현우 대화에 분명히 있었습니다. 그 믿음이 흔들리기 시작하면 해석도 같이 달라집니다.",
      "behaviorHint": "명분을 앞세워 공개 대응과 확산 선택을 정당화한다.",
      "applicableStates": [
        "M2",
        "M3"
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
          "irritated",
          "agitated"
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
          "M2",
          "M3"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family12:a:d-3:s2:atom:1"
        ],
        "forbidAtomIds": [
          "family12:a:d-3:s5:atom:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:trap:context",
      "coverageKey": "a:d-3:motive:mid:trap:context",
      "variantTarget": 4,
      "setFlags": [
        "d-3:motive:misbelief_opened"
      ],
      "tags": [
        "mid",
        "trap",
        "red_herring"
      ]
    },
    {
      "id": "family12:beat_v2:a:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "그 불안이 사실보다 센 표현을 만들었습니다. 끝까지 붙들고 있던 믿음이 깨지면 제가 했던 말도 달라집니다.",
      "behaviorHint": "공격성 아래 눌린 두려움과 수치가 고백 쪽으로 기운다.",
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
          "agitated",
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
          "family12:a:d-3:s4:atom:1"
        ],
        "forbidAtomIds": [
          "family12:a:d-3:s5:atom:0"
        ]
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:trap:emotion",
      "coverageKey": "a:d-3:core:late:trap:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-3:core:misbelief_opened"
      ],
      "tags": [
        "late",
        "trap",
        "red_herring"
      ]
    },
    {
      "id": "family12:beat_v2:b:d-3:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "하지만 문제 캡처처럼 장례와 어머니 통장을 묶은 모욕 문장은 제 대화에 없습니다. 그 자료를 함께 보면 앞뒤 맥락도 같이 드러납니다.",
      "behaviorHint": "자료가 제시되자 부인 범위를 줄이며 문장 속도를 낮춘다.",
      "applicableStates": [
        "M2",
        "M3"
      ],
      "layer": "motive",
      "issueRole": "red_herring",
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
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "fresh",
          "wary",
          "tired"
        ],
        "misconceptionStates": [
          "M2",
          "M3"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family12:b:d-3:s2:atom:1"
        ],
        "forbidAtomIds": [
          "family12:b:d-3:s5:atom:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:evidence:identity",
      "coverageKey": "b:d-3:motive:mid:evidence:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-3:motive:identity_evidence_seen"
      ],
      "tags": [
        "evidence",
        "cold",
        "trap",
        "red_herring",
        "e-2"
      ],
      "evidenceId": "e-2"
    },
    {
      "id": "family12:beat_v2:b:d-3:core:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "저는 숫자를 먼저 보는 사람처럼 굴었고, 그게 누나 눈엔 비정해 보였을 겁니다. 끝까지 붙들고 있던 믿음이 깨지면 제가 했던 말도 달라집니다.",
      "behaviorHint": "차갑게 쌓던 논리 틈에서 억눌린 불안과 피로가 드러난다.",
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
        "motive_search"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
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
          "family12:b:d-3:s4:atom:0"
        ],
        "forbidAtomIds": [
          "family12:b:d-3:s5:atom:0"
        ]
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:trap:context",
      "coverageKey": "b:d-3:core:late:trap:context",
      "variantTarget": 3,
      "setFlags": [
        "d-3:core:misbelief_opened"
      ],
      "tags": [
        "late",
        "trap",
        "red_herring"
      ]
    },
    {
      "id": "family12:beat_v2:a:d-4:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "핵심 취지는 현우 원문에서 벗어나지 않았습니다. 그 순서를 자꾸 뒤틀어 묻지 마세요.",
      "behaviorHint": "도덕적 비난 프레임을 먼저 세워 공세의 주도권을 잡으려 한다.",
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
          "irritated"
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
          "family12:a:d-4:s1:atom:1"
        ],
        "forbidAtomIds": [
          "family12:a:d-4:s5:atom:0"
        ]
      },
      "weight": 7,
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
      "id": "family12:beat_v2:b:d-4:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "최소한 동일 대화 캡처는 아닙니다. 마치 제가 혼자 판을 짠 사람처럼 몰아가진 마세요.",
      "behaviorHint": "기록과 순서를 차례로 대며 감정 개입을 최대한 억누른다.",
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
          "irritated"
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
          "family12:b:d-4:s1:atom:1"
        ],
        "forbidAtomIds": [
          "family12:b:d-4:s5:atom:0"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:surface:pressure:identity",
      "coverageKey": "b:d-4:surface:early:pressure:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-4:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "family12:beat_v2:a:d-4:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "하지만 당시 저는 사실을 요약한 거라고 생각했습니다. 제 몫이 있더라도 책임 전부를 여기로 모는 건 과합니다.",
      "behaviorHint": "명분을 앞세워 공개 대응과 확산 선택을 정당화한다.",
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
          "irritated",
          "agitated"
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
          "family12:a:d-4:s2:atom:1"
        ],
        "forbidAtomIds": [
          "family12:a:d-4:s5:atom:0"
        ]
      },
      "weight": 5,
      "priority": 24,
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
      "id": "family12:beat_v2:a:d-4:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "하지만 당시 저는 사실을 요약한 거라고 생각했습니다. 왜 그렇게 움직였는지의 배경까지 봐야 합니다.",
      "behaviorHint": "명분을 앞세워 공개 대응과 확산 선택을 정당화한다.",
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
          "irritated",
          "agitated"
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
          "family12:a:d-4:s2:atom:1"
        ],
        "forbidAtomIds": [
          "family12:a:d-4:s5:atom:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:motive:motive",
      "coverageKey": "a:d-4:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-4:motive:motive_opened"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "family12:beat_v2:a:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "제가 직접 문장을 만들어 끼워 넣었다는 건 정말 부끄럽습니다. 그때는 이미 감정이 무너져 있어서 판단이 좁아졌습니다.",
      "behaviorHint": "공격성 아래 눌린 두려움과 수치가 고백 쪽으로 기운다.",
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
          "agitated",
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
          "family12:a:d-4:s4:atom:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:core:rapport:emotion",
      "coverageKey": "a:d-4:core:late:rapport:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-4:core:emotion_opened"
      ],
      "tags": [
        "late"
      ]
    },
    {
      "id": "family12:beat_v2:a:d-4:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "하지만 당시 저는 사실을 요약한 거라고 생각했습니다. 그 자료를 함께 보면 앞뒤 맥락도 같이 드러납니다.",
      "behaviorHint": "자료가 제시되자 부인 범위를 줄이며 문장 속도를 낮춘다.",
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
          "calm",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "fresh",
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family12:a:d-4:s2:atom:1"
        ],
        "forbidAtomIds": [
          "family12:a:d-4:s5:atom:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:evidence:identity",
      "coverageKey": "a:d-4:motive:mid:evidence:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-4:motive:identity_evidence_seen"
      ],
      "tags": [
        "evidence",
        "cold",
        "e-3"
      ],
      "evidenceId": "e-3"
    },
    {
      "id": "family12:beat_v2:a:d-5:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "저는 어머니 보호 차원에서 예외적으로 알린 겁니다. 그 순서를 자꾸 뒤틀어 묻지 마세요.",
      "behaviorHint": "도덕적 비난 프레임을 먼저 세워 공세의 주도권을 잡으려 한다.",
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
          "irritated"
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
          "family12:a:d-5:s1:atom:1"
        ],
        "forbidAtomIds": [
          "family12:a:d-5:s4:atom:1"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:pressure:timeline",
      "coverageKey": "a:d-5:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-5:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "family12:beat_v2:b:d-5:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "저는 시트 숫자만 점검했고 공개방 얘기는 누나 쪽에서 시작됐습니다. 앞뒤 사정을 빼면 제가 더 나쁘게 들립니다.",
      "behaviorHint": "기록과 순서를 차례로 대며 감정 개입을 최대한 억누른다.",
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
          "irritated"
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
          "family12:b:d-5:s1:atom:1"
        ],
        "forbidAtomIds": [
          "family12:b:d-5:s4:atom:1"
        ]
      },
      "weight": 7,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:pressure:context",
      "coverageKey": "b:d-5:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-5:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "family12:beat_v2:a:d-5:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "저는 장례 정산 맡은 사람으로 의심이 커지는 걸 막고 싶었습니다. 제 몫이 있더라도 책임 전부를 여기로 모는 건 과합니다.",
      "behaviorHint": "명분을 앞세워 공개 대응과 확산 선택을 정당화한다.",
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
          "irritated",
          "agitated"
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
          "family12:a:d-5:s2:atom:1"
        ],
        "forbidAtomIds": [
          "family12:a:d-5:s5:atom:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:pressure:responsibility",
      "coverageKey": "a:d-5:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:responsibility_pressed"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "family12:beat_v2:b:d-5:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "그래도 저는 제한된 범위에서 확인하려 했고, 공개 망신까지 갈 생각은 없었습니다. 왜 그렇게 움직였는지의 배경까지 봐야 합니다.",
      "behaviorHint": "로그와 규칙을 근거로 책임 비율을 다시 계산하듯 답한다.",
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
          "irritated",
          "agitated"
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
          "family12:b:d-5:s2:atom:1"
        ],
        "forbidAtomIds": [
          "family12:b:d-5:s5:atom:0"
        ]
      },
      "weight": 5,
      "priority": 24,
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
      "id": "family12:beat_v2:a:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "누가 나를 믿지 않는다는 공포가 예외를 핑계로 만들었습니다. 그때는 이미 감정이 무너져 있어서 판단이 좁아졌습니다.",
      "behaviorHint": "공격성 아래 눌린 두려움과 수치가 고백 쪽으로 기운다.",
      "applicableStates": [
        "S4",
        "S5"
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
          "family12:a:d-5:s4:atom:1"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:rapport:emotion",
      "coverageKey": "a:d-5:core:late:rapport:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-5:core:emotion_opened"
      ],
      "tags": [
        "late"
      ]
    },
    {
      "id": "family12:beat_v2:b:d-5:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "그래도 저는 제한된 범위에서 확인하려 했고, 공개 망신까지 갈 생각은 없었습니다. 그 자료를 함께 보면 앞뒤 맥락도 같이 드러납니다.",
      "behaviorHint": "자료가 제시되자 부인 범위를 줄이며 문장 속도를 낮춘다.",
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
          "calm",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "fresh",
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family12:b:d-5:s2:atom:1"
        ],
        "forbidAtomIds": [
          "family12:b:d-5:s5:atom:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:evidence:context",
      "coverageKey": "b:d-5:motive:mid:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-5:motive:context_evidence_seen"
      ],
      "tags": [
        "evidence",
        "cold",
        "e-6"
      ],
      "evidenceId": "e-6"
    },
    {
      "id": "family12:beat_v2:a:d-1:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "fatigue",
      "line": "같은 부분을 몇 번이나 돌리시네요. 장녀로서 어머니가 뒤늦게 듣고 더 상처받는 게 싫었습니다.",
      "behaviorHint": "같은 압박이 반복되자 짜증이 먼저 올라와 말끝이 짧아진다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family12:a:d-1:s2:atom:1"
        ],
        "forbidAtomIds": [
          "family12:a:d-1:s5:atom:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:fatigue:timeline",
      "coverageKey": "a:d-1:surface:mid:fatigue:timeline",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:fatigue_2x_irritated"
      ],
      "tags": [
        "fatigue",
        "mid"
      ]
    },
    {
      "id": "family12:beat_v2:a:d-1:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "fatigue",
      "line": "그 질문은 이미 답했습니다. 제가 여러 방에 올린 건 인정합니다. 그런데 현우가 장례 중에 비용 불만을 흘린 건 사실이라 그냥 덮을 수 없었습니다. 더 밀어붙이면 저는 그 대목에서 멈추겠습니다.",
      "behaviorHint": "같은 질문을 차단하려고 선을 긋고 답변 범위를 좁힌다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family12:a:d-1:s2:atom:1"
        ],
        "forbidAtomIds": [
          "family12:a:d-1:s5:atom:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:responsibility",
      "coverageKey": "a:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-1:motive:fatigue_3x_block"
      ],
      "tags": [
        "fatigue",
        "mid"
      ]
    },
    {
      "id": "family12:beat_v2:a:d-1:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "fatigue",
      "line": "계속 저만 몰아세우면 다른 쪽은 빠져나갑니다. 가족방과 고모방에 올린 건 맞습니다. 다만 제사준비방은 내용 공유 차원이었지 현우를 공격하려던 건 아니었습니다.",
      "behaviorHint": "피로가 누적되자 오히려 상대 책임을 되묻는 반격성 톤으로 꺾는다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family12:a:d-1:s2:atom:1"
        ],
        "forbidAtomIds": [
          "family12:a:d-1:s5:atom:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:responsibility",
      "coverageKey": "a:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-1:motive:fatigue_spike_counter"
      ],
      "tags": [
        "fatigue",
        "mid"
      ]
    },
    {
      "id": "family12:beat_v2:a:d-4:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "fatigue",
      "line": "같은 부분을 몇 번이나 돌리시네요. 그래도 그 순간엔 현우 말의 잔인함을 보여 주는 방식이라고 스스로 합리화했습니다.",
      "behaviorHint": "같은 압박이 반복되자 짜증이 먼저 올라와 말끝이 짧아진다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family12:a:d-4:s2:atom:1"
        ],
        "forbidAtomIds": [
          "family12:a:d-4:s5:atom:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:fatigue:timeline",
      "coverageKey": "a:d-4:surface:mid:fatigue:timeline",
      "variantTarget": 2,
      "setFlags": [
        "d-4:surface:fatigue_2x_irritated"
      ],
      "tags": [
        "fatigue",
        "mid"
      ]
    },
    {
      "id": "family12:beat_v2:a:d-4:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "fatigue",
      "line": "그 질문은 이미 답했습니다. 그래도 그 순간엔 현우 말의 잔인함을 보여 주는 방식이라고 스스로 합리화했습니다. 더 밀어붙이면 저는 그 대목에서 멈추겠습니다.",
      "behaviorHint": "같은 질문을 차단하려고 선을 긋고 답변 범위를 좁힌다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family12:a:d-4:s2:atom:1"
        ],
        "forbidAtomIds": [
          "family12:a:d-4:s5:atom:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:fatigue:responsibility",
      "coverageKey": "a:d-4:motive:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-4:motive:fatigue_3x_block"
      ],
      "tags": [
        "fatigue",
        "mid"
      ]
    },
    {
      "id": "family12:beat_v2:a:d-4:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "fatigue",
      "line": "계속 저만 몰아세우면 다른 쪽은 빠져나갑니다. 그래도 그 순간엔 현우 말의 잔인함을 보여 주는 방식이라고 스스로 합리화했습니다.",
      "behaviorHint": "피로가 누적되자 오히려 상대 책임을 되묻는 반격성 톤으로 꺾는다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family12:a:d-4:s2:atom:1"
        ],
        "forbidAtomIds": [
          "family12:a:d-4:s5:atom:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:fatigue:responsibility",
      "coverageKey": "a:d-4:motive:mid:fatigue:responsibility",
      "variantTarget": 2,
      "setFlags": [
        "d-4:motive:fatigue_spike_counter"
      ],
      "tags": [
        "fatigue",
        "mid"
      ]
    },
    {
      "id": "family12:beat_v2:a:d-1:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "그래서 한 방에서 끝내지 못하고 사람들한테 먼저 보여 버렸습니다. 그 마음을 빼고는 제가 왜 그렇게 움직였는지 설명이 안 됩니다.",
      "behaviorHint": "정해진 질문 카드 밖으로 들어오자 숨기던 정서와 동기를 더 직접적으로 흘린다.",
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
          "family12:a:d-1:s4:atom:1"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:motive:motive",
      "coverageKey": "a:d-1:core:late:motive:motive",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:free_motive_opened"
      ],
      "tags": [
        "free_question",
        "late",
        "late"
      ]
    },
    {
      "id": "family12:beat_v2:a:d-1:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "그래서 한 방에서 끝내지 못하고 사람들한테 먼저 보여 버렸습니다. 그 감정을 빼면 제가 왜 그렇게 굳어졌는지 설명이 안 됩니다.",
      "behaviorHint": "정해진 질문 카드 밖으로 들어오자 숨기던 정서와 동기를 더 직접적으로 흘린다.",
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
          "agitated",
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
          "family12:a:d-1:s4:atom:1"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:free_emotion_opened"
      ],
      "tags": [
        "free_question",
        "late",
        "late"
      ]
    },
    {
      "id": "family12:beat_v2:a:d-4:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "제가 직접 문장을 만들어 끼워 넣었다는 건 정말 부끄럽습니다. 그 마음을 빼고는 제가 왜 그렇게 움직였는지 설명이 안 됩니다.",
      "behaviorHint": "정해진 질문 카드 밖으로 들어오자 숨기던 정서와 동기를 더 직접적으로 흘린다.",
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
          "family12:a:d-4:s4:atom:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:core:motive:motive",
      "coverageKey": "a:d-4:core:late:motive:motive",
      "variantTarget": 2,
      "setFlags": [
        "d-4:core:free_motive_opened"
      ],
      "tags": [
        "free_question",
        "late",
        "late"
      ]
    },
    {
      "id": "family12:beat_v2:a:d-4:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "제가 직접 문장을 만들어 끼워 넣었다는 건 정말 부끄럽습니다. 그 감정을 빼면 제가 왜 그렇게 굳어졌는지 설명이 안 됩니다.",
      "behaviorHint": "정해진 질문 카드 밖으로 들어오자 숨기던 정서와 동기를 더 직접적으로 흘린다.",
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
          "agitated",
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
          "family12:a:d-4:s4:atom:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:core:rapport:emotion",
      "coverageKey": "a:d-4:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-4:core:free_emotion_opened"
      ],
      "tags": [
        "free_question",
        "late",
        "late"
      ]
    },
    {
      "id": "family12:beat_v2:a:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interjection_allow",
      "line": "잠깐만요, 그 말은 너무합니다. 가족방 이야기가 나오면 그때 감정이 먼저 올라옵니다.",
      "behaviorHint": "감정이 먼저 튀어나오며 억울함과 긴장이 말끝을 끊는다.",
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
          "family12:a:d-1:s2:atom:1"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
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
      "id": "family12:beat_v2:b:d-1:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interjection_block",
      "line": "감정만 더 키우는 말은 여기서 끊죠. 가족방 건은 숨을 고르고 다시 말합시다.",
      "behaviorHint": "감정 과열을 제지하려고 말을 끊고 호흡을 다잡는다.",
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
          "family12:b:d-1:s2:atom:1"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
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
      "id": "family12:beat_v2:b:d-4:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "interjection_allow",
      "line": "잠깐만요, 그 말은 너무합니다. 포렌식 감정서 이야기가 나오면 그때 감정이 먼저 올라옵니다.",
      "behaviorHint": "감정이 먼저 튀어나오며 억울함과 긴장이 말끝을 끊는다.",
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
          "family12:b:d-4:s2:atom:1"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-4:surface:mid:interjection:emotional_only:allow",
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
      "id": "family12:beat_v2:a:d-4:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "interjection_block",
      "line": "감정만 더 키우는 말은 여기서 끊죠. 포렌식 감정서 건은 숨을 고르고 다시 말합시다.",
      "behaviorHint": "감정 과열을 제지하려고 말을 끊고 호흡을 다잡는다.",
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
          "family12:a:d-4:s2:atom:1"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-4:surface:mid:interjection:emotional_only:block",
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
      "id": "family12:beat_v2:a:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "interjection_allow",
      "line": "아니요, 핵심은 장례 사흘째 밤보다 화환 수량 순서예요. 그 디테일을 빼면 그림이 달라집니다.",
      "behaviorHint": "숫자·시간·순서를 콕 집어 끼어들며 디테일을 바로잡으려 한다.",
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
          "family12:a:d-2:s3:atom:1"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-2:surface:mid:interjection:detail_rebuttal:allow",
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
      "id": "family12:beat_v2:b:d-2:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interjection_block",
      "line": "장례 사흘째 밤만 떼어 오면 맥락이 비뚤어집니다. 화환 수량까지 같이 봐야 합니다.",
      "behaviorHint": "조각난 디테일만으로 몰아가는 흐름을 잘라 세운다.",
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
          "family12:b:d-2:s3:atom:1"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-2:surface:mid:interjection:detail_rebuttal:block",
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
      "id": "family12:beat_v2:b:d-4:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "interjection_allow",
      "line": "아니요, 핵심은 포렌식 감정서보다 PC 카카오 캐시 순서예요. 그 디테일을 빼면 그림이 달라집니다.",
      "behaviorHint": "숫자·시간·순서를 콕 집어 끼어들며 디테일을 바로잡으려 한다.",
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
          "family12:b:d-4:s2:atom:1"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
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
      "id": "family12:beat_v2:a:d-4:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "interjection_block",
      "line": "포렌식 감정서만 떼어 오면 맥락이 비뚤어집니다. PC 카카오 캐시까지 같이 봐야 합니다.",
      "behaviorHint": "조각난 디테일만으로 몰아가는 흐름을 잘라 세운다.",
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
          "family12:a:d-4:s2:atom:1"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
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
      "id": "family12:beat_v2:a:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interjection_allow",
      "line": "그 장면만 보면 저도 그렇게 믿게 됩니다. 상갓집도 결국 정산 쪽만 먼저 보이면 오해가 더 세집니다.",
      "behaviorHint": "잘못 믿는 장면을 더 세게 밀어붙이며 오해를 굳혀 버린다.",
      "applicableStates": [
        "M1",
        "M2",
        "M3"
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
          "M2",
          "M3"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family12:a:d-3:s2:atom:1"
        ],
        "forbidAtomIds": []
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 1,
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
      "beliefMode": "weaponizes"
    },
    {
      "id": "family12:beat_v2:b:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interjection_block",
      "line": "지금 그 믿음이 더 커지는 순간입니다. 상갓집도 결국 정산만 붙들면 다른 맥락이 다 지워집니다.",
      "behaviorHint": "오해가 커지는 순간을 감지하고 방향을 꺾으려 든다.",
      "applicableStates": [
        "M1",
        "M2",
        "M3"
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
          "M2",
          "M3"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family12:b:d-3:s2:atom:1"
        ],
        "forbidAtomIds": []
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 1,
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
      "beliefMode": "knows"
    },
    {
      "id": "family12:beat_v2:a:d-3:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interjection_allow",
      "line": "그 자료, 원본 느낌이 아닙니다. 상갓집도 결국 정산만 크게 남아 있으면 함정일 수 있어요.",
      "behaviorHint": "자료의 이상한 결을 눈치채고 함정 냄새를 경고처럼 던진다.",
      "applicableStates": [
        "M1",
        "M2",
        "M3"
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
          "M2",
          "M3"
        ],
        "trapStates": [
          "possible_cropped_capture"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family12:a:d-3:s2:atom:1"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:trap_signal:allow",
      "variantTarget": 1,
      "setFlags": [],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "trap_signal",
        "red_herring"
      ],
      "beliefMode": "weaponizes"
    },
    {
      "id": "family12:beat_v2:b:d-3:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interjection_block",
      "line": "잠깐, 그건 덫이에요. 상갓집도 결국 정산만 강조된 자료로 밀면 사건이 틀어집니다.",
      "behaviorHint": "가짜 단서에 휘말리지 않으려며 노골적으로 제동을 건다.",
      "applicableStates": [
        "M1",
        "M2",
        "M3"
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
          "M2",
          "M3"
        ],
        "trapStates": [
          "possible_cropped_capture"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family12:b:d-3:s2:atom:1"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:trap_signal:block",
      "variantTarget": 1,
      "setFlags": [],
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

export default family12BeatsV2Full;
