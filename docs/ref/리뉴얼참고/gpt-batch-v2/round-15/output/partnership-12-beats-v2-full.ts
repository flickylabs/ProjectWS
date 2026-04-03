export const partnership12BeatsV2Full = {
  "caseId": "partnership-12",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 58,
    "byActionFamily": {
      "question": 26,
      "evidence": 8,
      "fatigue": 6,
      "free_question": 6,
      "interjection": 12
    },
    "byIssueRole": {
      "core_truth": 38,
      "shared_misconception": 12,
      "sub_truth": 8
    },
    "byParty": {
      "a": 29,
      "b": 29
    },
    "byDispute": {
      "d-1": 19,
      "d-2": 19,
      "d-3": 12,
      "d-4": 4,
      "d-5": 4
    },
    "stageCoverage": {
      "early": 16,
      "mid": 30,
      "late": 12
    },
    "interjectionInfoLevels": {
      "emotional_only": 4,
      "detail_rebuttal": 4,
      "misbelief_escalation": 4
    },
    "requiredMatrixNotes": [
      "early question timeline / identity / context covered on core disputes",
      "mid question responsibility / motive covered on core disputes",
      "late question emotion covered on core disputes",
      "evidence response context / legality covered on core and sub disputes",
      "fatigue 3 variants included on each core dispute",
      "free_question late motive / emotion included",
      "shared misconception trap beats cover M0~M4",
      "interjection emotional_only / detail_rebuttal / misbelief_escalation distribution satisfied"
    ]
  },
  "beats": [
    {
      "id": "partnership12:beat_v2:a:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "저는 장수진 대표를 깎아내리려는 말을 한 적이 없습니다. 그때 정리한 건 샘플 승인 시각과 출고 가능 수량보다 앞서 약속이 나간다고 느낀 압박 같은 운영 혼선뿐입니다. 순서를 보면 그걸 바로 확정이라고 부를 단계는 아니었습니다.",
      "behaviorHint": "일정과 숫자부터 꺼내며 감정을 잘라낸다.",
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
          "guarded",
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
          "partnership-12:a:d-1:act:0"
        ],
        "forbidAtomIds": [
          "partnership-12:a:d-1:responsibility:1"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:timeline",
      "coverageKey": "a:d-1:surface:early:pressure:timeline",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership12:beat_v2:a:d-1:surface:pressure:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "홍세진에게 납기 약속 문제를 말한 건 맞지만, 사람을 험담한 건 아닙니다. 그걸 대외 평판 문제로 곧장 키우는 건 과합니다. 그 시점만 떼면 독단처럼 보이지만, 흐름 전체는 달랐습니다.",
      "behaviorHint": "일정과 숫자부터 꺼내며 감정을 잘라낸다.",
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
          "guarded",
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
          "partnership-12:a:d-1:act:0"
        ],
        "forbidAtomIds": [
          "partnership-12:a:d-1:responsibility:1"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:timeline",
      "coverageKey": "a:d-1:surface:early:pressure:timeline",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership12:beat_v2:a:d-1:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "저는 장수진 대표를 깎아내리려는 말을 한 적이 없습니다. 그때 정리한 건 샘플 승인 시각과 출고 가능 수량보다 앞서 약속이 나간다고 느낀 압박 같은 운영 혼선뿐입니다. 처음부터 저를 가해자로 고정해 읽을 일은 아닙니다.",
      "behaviorHint": "일정과 숫자부터 꺼내며 감정을 잘라낸다.",
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
          "guarded",
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
          "partnership-12:a:d-1:act:0"
        ],
        "forbidAtomIds": [
          "partnership-12:a:d-1:responsibility:1"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:identity",
      "coverageKey": "a:d-1:surface:early:pressure:identity",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:identity_checked"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership12:beat_v2:a:d-1:surface:pressure:identity:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "홍세진에게 납기 약속 문제를 말한 건 맞지만, 사람을 험담한 건 아닙니다. 그걸 대외 평판 문제로 곧장 키우는 건 과합니다. 누가 먼저 선을 넘었다는 인상만으로 저를 못 박을 수는 없습니다.",
      "behaviorHint": "일정과 숫자부터 꺼내며 감정을 잘라낸다.",
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
          "guarded",
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
          "partnership-12:a:d-1:act:0"
        ],
        "forbidAtomIds": [
          "partnership-12:a:d-1:responsibility:1"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:identity",
      "coverageKey": "a:d-1:surface:early:pressure:identity",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:identity_checked"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership12:beat_v2:a:d-1:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "저는 장수진 대표를 깎아내리려는 말을 한 적이 없습니다. 그때 정리한 건 샘플 승인 시각과 출고 가능 수량보다 앞서 약속이 나간다고 느낀 압박 같은 운영 혼선뿐입니다. 그 앞뒤 사정을 빼면 의도가 완전히 달라 보입니다.",
      "behaviorHint": "일정과 숫자부터 꺼내며 감정을 잘라낸다.",
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
          "guarded",
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
          "partnership-12:a:d-1:act:0"
        ],
        "forbidAtomIds": [
          "partnership-12:a:d-1:responsibility:1"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:context",
      "coverageKey": "a:d-1:surface:early:pressure:context",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:context_checked"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership12:beat_v2:a:d-1:surface:pressure:context:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "홍세진에게 납기 약속 문제를 말한 건 맞지만, 사람을 험담한 건 아닙니다. 그걸 대외 평판 문제로 곧장 키우는 건 과합니다. 맥락을 같이 보면 그건 단순한 은폐나 독단으로만 남지 않습니다.",
      "behaviorHint": "일정과 숫자부터 꺼내며 감정을 잘라낸다.",
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
          "guarded",
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
          "partnership-12:a:d-1:act:0"
        ],
        "forbidAtomIds": [
          "partnership-12:a:d-1:responsibility:1"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:context",
      "coverageKey": "a:d-1:surface:early:pressure:context",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:context_checked"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership12:beat_v2:a:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "네, 외부 채널에서 장수진 대표 관련 불만을 말했습니다. 다만 바이어에게 돌리려던 건 아니고, 저는 그걸 실무 하소연으로 낮춰 생각했습니다. 제 책임을 묻더라도 구조 전체를 같이 봐야 합니다.",
      "behaviorHint": "일정과 숫자부터 꺼내며 감정을 잘라낸다.",
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
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:a:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "partnership-12:a:d-1:admission:1"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:pressure:responsibility",
      "coverageKey": "a:d-1:motive:mid:pressure:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-1:motive:responsibility_named"
      ],
      "tags": [
        "warm"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ]
    },
    {
      "id": "partnership12:beat_v2:a:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "counter",
      "line": "그날은 샘플 승인 시각과 출고 가능 수량보다 앞서 약속이 나간다고 느낀 압박 때문에 생산 부담이 한쪽으로 몰렸습니다. 그 압박이 밖으로 새면 안 됐는데, 저는 그 배경을 먼저 말하고 싶었습니다. 왜 그렇게 밀어붙였는지까지 보면 얘기가 달라집니다.",
      "behaviorHint": "일정과 숫자부터 꺼내며 감정을 잘라낸다.",
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
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:a:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "partnership-12:a:d-1:admission:1"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:motive:motive",
      "coverageKey": "a:d-1:motive:mid:motive:motive",
      "variantTarget": 1,
      "setFlags": [
        "d-1:motive:motive_named"
      ],
      "tags": [
        "warm"
      ],
      "requiresFlags": [
        "d-1:surface:context_checked"
      ]
    },
    {
      "id": "partnership12:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "admit",
      "line": "실무라는 말로 눌러도 결국 외부 사람 앞에서 상대 불만을 꺼낸 겁니다. 그 순간부터 평판 손상의 재료를 제가 만든 셈입니다. 결국 그때 저를 움직인 건 두려움과 상처였습니다.",
      "behaviorHint": "일정과 숫자부터 꺼내며 감정을 잘라낸다.",
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
          "wary",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:a:d-1:emotion:0"
        ],
        "forbidAtomIds": [
          "partnership-12:a:d-1:act:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 1,
      "setFlags": [
        "d-1:core:emotion_opened"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-1:motive:motive_named"
      ]
    },
    {
      "id": "partnership12:beat_v2:a:d-1:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "원본을 같이 놓고 보면 네, 외부 채널에서 장수진 대표 관련 불만을 말했습니다. 다만 바이어에게 돌리려던 건 아니고, 저는 그걸 실무 하소연으로 낮춰 생각했습니다.",
      "behaviorHint": "자료 명칭을 확인한 뒤, 계산된 문장으로 책임 범위를 좁힌다.",
      "applicableStates": [
        "S1",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:a:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "partnership-12:a:d-1:admission:1"
        ]
      },
      "weight": 6,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:evidence:context",
      "coverageKey": "a:d-1:motive:mid:evidence:context",
      "variantTarget": 1,
      "setFlags": [
        "d-1:surface:evidence_seen"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-1:surface:context_checked"
      ]
    },
    {
      "id": "partnership12:beat_v2:a:d-1:motive:evidence:legality:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "문서 기준으로 보면 그날은 샘플 승인 시각과 출고 가능 수량보다 앞서 약속이 나간다고 느낀 압박 때문에 생산 부담이 한쪽으로 몰렸습니다. 그 압박이 밖으로 새면 안 됐는데, 저는 그 배경을 먼저 말하고 싶었습니다.",
      "behaviorHint": "자료 명칭을 확인한 뒤, 계산된 문장으로 책임 범위를 좁힌다.",
      "applicableStates": [
        "S1",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:a:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "partnership-12:a:d-1:admission:1"
        ]
      },
      "weight": 6,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:evidence:legality",
      "coverageKey": "a:d-1:motive:mid:evidence:legality",
      "variantTarget": 1,
      "setFlags": [
        "d-1:motive:record_locked"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-1:surface:identity_checked"
      ]
    },
    {
      "id": "partnership12:beat_v2:a:d-1:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "irritated",
      "line": "같은 질문을 반복해도 답이 달라지진 않습니다. 네, 외부 채널에서 장수진 대표 관련 불만을 말했습니다. 다만 바이어에게 돌리려던 건 아니고, 저는 그걸 실무 하소연으로 낮춰 생각했습니다.",
      "behaviorHint": "목소리가 딱딱해지고 순서를 숫자로 반복한다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "timeline",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:a:d-1:admission:0"
        ],
        "forbidAtomIds": [
          "partnership-12:a:d-1:admission:1"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:fatigue:timeline",
      "coverageKey": "a:d-1:surface:mid:fatigue:timeline",
      "variantTarget": 1,
      "setFlags": [
        "d-1:surface:fatigue_warned"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ]
    },
    {
      "id": "partnership12:beat_v2:a:d-1:surface:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "block",
      "line": "그 순서를 몇 번 더 묻더라도 지금 답은 같습니다. 그날은 샘플 승인 시각과 출고 가능 수량보다 앞서 약속이 나간다고 느낀 압박 때문에 생산 부담이 한쪽으로 몰렸습니다. 그 압박이 밖으로 새면 안 됐는데, 저는 그 배경을 먼저 말하고 싶었습니다.",
      "behaviorHint": "목소리가 딱딱해지고 순서를 숫자로 반복한다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:a:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "partnership-12:a:d-1:admission:1"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:fatigue:responsibility",
      "coverageKey": "a:d-1:surface:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-1:surface:fatigue_blocked"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-1:surface:fatigue_warned"
      ]
    },
    {
      "id": "partnership12:beat_v2:a:d-1:motive:fatigue:responsibility:03",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "retaliate",
      "line": "계속 몰아붙이면 저도 숨기던 방어를 접겠습니다. 실무라는 말로 눌러도 결국 외부 사람 앞에서 상대 불만을 꺼낸 겁니다. 그 순간부터 평판 손상의 재료를 제가 만든 셈입니다.",
      "behaviorHint": "목소리가 딱딱해지고 순서를 숫자로 반복한다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:a:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "partnership-12:a:d-1:admission:1"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:responsibility",
      "coverageKey": "a:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-1:motive:fatigue_retaliation"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-1:surface:fatigue_blocked"
      ]
    },
    {
      "id": "partnership12:beat_v2:a:d-1:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confess",
      "line": "돌려 말하지 않겠습니다. 저는 외부 인력에게 장수진 대표 불만을 흘렸습니다. 직접 바이어 험담은 아니어도 상호 비방 금지 원칙을 어긴 책임은 제게 있습니다.",
      "behaviorHint": "한 템포 쉬고 방어를 내려놓지만 끝까지 구조로 설명한다.",
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
          "agitated",
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:a:d-1:responsibility:1"
        ],
        "forbidAtomIds": [
          "partnership-12:a:d-1:act:0"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:motive:motive",
      "coverageKey": "a:d-1:core:late:motive:motive",
      "variantTarget": 1,
      "setFlags": [
        "d-1:core:free_opened"
      ],
      "tags": [
        "late",
        "free_question"
      ],
      "requiresFlags": [
        "d-1:core:emotion_opened"
      ]
    },
    {
      "id": "partnership12:beat_v2:b:d-2:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "저는 류선우 대표를 깎아내리려고 밖에서 판을 벌인 적 없습니다. 현장 설명이었지, 뒤에서 사람 하나 찍어내리려던 건 아닙니다. 순서를 보면 그걸 바로 확정이라고 부를 단계는 아니었습니다.",
      "behaviorHint": "결론 문장을 먼저 던지고 상대를 압박한다.",
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
          "guarded",
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
          "partnership-12:b:d-2:act:0"
        ],
        "forbidAtomIds": [
          "partnership-12:b:d-2:responsibility:1"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:timeline",
      "coverageKey": "b:d-2:surface:early:pressure:timeline",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership12:beat_v2:b:d-2:surface:pressure:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "보조 스태프랑 홍세진에게 답답하다고 말한 건 맞아요. 그래도 그걸 바로 평판 훼손 의도라고 몰아가는 건 순서를 건너뛴 겁니다. 그 시점만 떼면 독단처럼 보이지만, 흐름 전체는 달랐습니다.",
      "behaviorHint": "결론 문장을 먼저 던지고 상대를 압박한다.",
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
          "guarded",
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
          "partnership-12:b:d-2:act:0"
        ],
        "forbidAtomIds": [
          "partnership-12:b:d-2:responsibility:1"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:timeline",
      "coverageKey": "b:d-2:surface:early:pressure:timeline",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership12:beat_v2:b:d-2:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "저는 류선우 대표를 깎아내리려고 밖에서 판을 벌인 적 없습니다. 현장 설명이었지, 뒤에서 사람 하나 찍어내리려던 건 아닙니다. 처음부터 저를 가해자로 고정해 읽을 일은 아닙니다.",
      "behaviorHint": "결론 문장을 먼저 던지고 상대를 압박한다.",
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
          "guarded",
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
          "partnership-12:b:d-2:act:0"
        ],
        "forbidAtomIds": [
          "partnership-12:b:d-2:responsibility:1"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:identity",
      "coverageKey": "b:d-2:surface:early:pressure:identity",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:identity_checked"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership12:beat_v2:b:d-2:surface:pressure:identity:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "보조 스태프랑 홍세진에게 답답하다고 말한 건 맞아요. 그래도 그걸 바로 평판 훼손 의도라고 몰아가는 건 순서를 건너뛴 겁니다. 누가 먼저 선을 넘었다는 인상만으로 저를 못 박을 수는 없습니다.",
      "behaviorHint": "결론 문장을 먼저 던지고 상대를 압박한다.",
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
          "guarded",
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
          "partnership-12:b:d-2:act:0"
        ],
        "forbidAtomIds": [
          "partnership-12:b:d-2:responsibility:1"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:identity",
      "coverageKey": "b:d-2:surface:early:pressure:identity",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:identity_checked"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership12:beat_v2:b:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "저는 류선우 대표를 깎아내리려고 밖에서 판을 벌인 적 없습니다. 현장 설명이었지, 뒤에서 사람 하나 찍어내리려던 건 아닙니다. 그 앞뒤 사정을 빼면 의도가 완전히 달라 보입니다.",
      "behaviorHint": "결론 문장을 먼저 던지고 상대를 압박한다.",
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
          "guarded",
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
          "partnership-12:b:d-2:act:0"
        ],
        "forbidAtomIds": [
          "partnership-12:b:d-2:responsibility:1"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:context",
      "coverageKey": "b:d-2:surface:early:pressure:context",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:context_checked"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership12:beat_v2:b:d-2:surface:pressure:context:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "보조 스태프랑 홍세진에게 답답하다고 말한 건 맞아요. 그래도 그걸 바로 평판 훼손 의도라고 몰아가는 건 순서를 건너뛴 겁니다. 맥락을 같이 보면 그건 단순한 은폐나 독단으로만 남지 않습니다.",
      "behaviorHint": "결론 문장을 먼저 던지고 상대를 압박한다.",
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
          "guarded",
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
          "partnership-12:b:d-2:act:0"
        ],
        "forbidAtomIds": [
          "partnership-12:b:d-2:responsibility:1"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:context",
      "coverageKey": "b:d-2:surface:early:pressure:context",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:context_checked"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership12:beat_v2:b:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "네, 밖에서 류선우 대표 승인 지연과 출고 문제 얘기를 꺼냈습니다. 하지만 바이어한테 직접 던진 건 아니고, 그때 저는 현장 수습이라고 생각했어요. 제 책임을 묻더라도 구조 전체를 같이 봐야 합니다.",
      "behaviorHint": "결론 문장을 먼저 던지고 상대를 압박한다.",
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
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:b:d-2:responsibility:0"
        ],
        "forbidAtomIds": [
          "partnership-12:b:d-2:admission:1"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:pressure:responsibility",
      "coverageKey": "b:d-2:motive:mid:pressure:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-2:motive:responsibility_named"
      ],
      "tags": [
        "warm"
      ],
      "requiresFlags": [
        "d-2:surface:timeline_pressed"
      ]
    },
    {
      "id": "partnership12:beat_v2:b:d-2:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "counter",
      "line": "그날 상담 직전마다 승인 지연과 출고 문제가 막히니까 누군가는 왜 오더가 흔들리는지 설명해야 했습니다. 제가 선을 넘은 건 맞지만, 원인 쪽 책임까지 지워지진 않습니다. 왜 그렇게 밀어붙였는지까지 보면 얘기가 달라집니다.",
      "behaviorHint": "결론 문장을 먼저 던지고 상대를 압박한다.",
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
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:b:d-2:responsibility:0"
        ],
        "forbidAtomIds": [
          "partnership-12:b:d-2:admission:1"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:motive:motive",
      "coverageKey": "b:d-2:motive:mid:motive:motive",
      "variantTarget": 1,
      "setFlags": [
        "d-2:motive:motive_named"
      ],
      "tags": [
        "warm"
      ],
      "requiresFlags": [
        "d-2:surface:context_checked"
      ]
    },
    {
      "id": "partnership12:beat_v2:b:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "admit",
      "line": "결국 제 말도 밖에서 재료가 됐죠. 배신처럼 느껴져서 더 세게 말했지만, 규칙을 어긴 건 저도 같습니다. 결국 그때 저를 움직인 건 두려움과 상처였습니다.",
      "behaviorHint": "결론 문장을 먼저 던지고 상대를 압박한다.",
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
          "wary",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:b:d-2:emotion:0"
        ],
        "forbidAtomIds": [
          "partnership-12:b:d-2:act:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:core:rapport:emotion",
      "coverageKey": "b:d-2:core:late:rapport:emotion",
      "variantTarget": 1,
      "setFlags": [
        "d-2:core:emotion_opened"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-2:motive:motive_named"
      ]
    },
    {
      "id": "partnership12:beat_v2:b:d-2:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "원본을 같이 놓고 보면 네, 밖에서 류선우 대표 승인 지연과 출고 문제 얘기를 꺼냈습니다. 하지만 바이어한테 직접 던진 건 아니고, 그때 저는 현장 수습이라고 생각했어요.",
      "behaviorHint": "증거 한 줄을 크게 확대해 의도를 묻는다.",
      "applicableStates": [
        "S1",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:b:d-2:responsibility:0"
        ],
        "forbidAtomIds": [
          "partnership-12:b:d-2:admission:1"
        ]
      },
      "weight": 6,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:evidence:context",
      "coverageKey": "b:d-2:motive:mid:evidence:context",
      "variantTarget": 1,
      "setFlags": [
        "d-2:surface:evidence_seen"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-2:surface:context_checked"
      ]
    },
    {
      "id": "partnership12:beat_v2:b:d-2:motive:evidence:legality:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "문서 기준으로 보면 그날 상담 직전마다 승인 지연과 출고 문제가 막히니까 누군가는 왜 오더가 흔들리는지 설명해야 했습니다. 제가 선을 넘은 건 맞지만, 원인 쪽 책임까지 지워지진 않습니다.",
      "behaviorHint": "증거 한 줄을 크게 확대해 의도를 묻는다.",
      "applicableStates": [
        "S1",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:b:d-2:responsibility:0"
        ],
        "forbidAtomIds": [
          "partnership-12:b:d-2:admission:1"
        ]
      },
      "weight": 6,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:evidence:legality",
      "coverageKey": "b:d-2:motive:mid:evidence:legality",
      "variantTarget": 1,
      "setFlags": [
        "d-2:motive:record_locked"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-2:surface:identity_checked"
      ]
    },
    {
      "id": "partnership12:beat_v2:b:d-2:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "irritated",
      "line": "같은 질문을 반복해도 답이 달라지진 않습니다. 네, 밖에서 류선우 대표 승인 지연과 출고 문제 얘기를 꺼냈습니다. 하지만 바이어한테 직접 던진 건 아니고, 그때 저는 현장 수습이라고 생각했어요.",
      "behaviorHint": "반복 질문에 표정이 굳고 같은 결론을 더 세게 되풀이한다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "timeline",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:b:d-2:admission:0"
        ],
        "forbidAtomIds": [
          "partnership-12:b:d-2:admission:1"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:fatigue:timeline",
      "coverageKey": "b:d-2:surface:mid:fatigue:timeline",
      "variantTarget": 1,
      "setFlags": [
        "d-2:surface:fatigue_warned"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-2:surface:timeline_pressed"
      ]
    },
    {
      "id": "partnership12:beat_v2:b:d-2:surface:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "block",
      "line": "그 순서를 몇 번 더 묻더라도 지금 답은 같습니다. 그날 상담 직전마다 승인 지연과 출고 문제가 막히니까 누군가는 왜 오더가 흔들리는지 설명해야 했습니다. 제가 선을 넘은 건 맞지만, 원인 쪽 책임까지 지워지진 않습니다.",
      "behaviorHint": "반복 질문에 표정이 굳고 같은 결론을 더 세게 되풀이한다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:b:d-2:responsibility:0"
        ],
        "forbidAtomIds": [
          "partnership-12:b:d-2:admission:1"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:fatigue:responsibility",
      "coverageKey": "b:d-2:surface:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-2:surface:fatigue_blocked"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-2:surface:fatigue_warned"
      ]
    },
    {
      "id": "partnership12:beat_v2:b:d-2:motive:fatigue:responsibility:03",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "retaliate",
      "line": "계속 몰아붙이면 저도 숨기던 방어를 접겠습니다. 결국 제 말도 밖에서 재료가 됐죠. 배신처럼 느껴져서 더 세게 말했지만, 규칙을 어긴 건 저도 같습니다.",
      "behaviorHint": "반복 질문에 표정이 굳고 같은 결론을 더 세게 되풀이한다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:b:d-2:responsibility:0"
        ],
        "forbidAtomIds": [
          "partnership-12:b:d-2:admission:1"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:fatigue:responsibility",
      "coverageKey": "b:d-2:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-2:motive:fatigue_retaliation"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-2:surface:fatigue_blocked"
      ]
    },
    {
      "id": "partnership12:beat_v2:b:d-2:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confess",
      "line": "돌려 말하지 않겠습니다. 저도 외부 인력에게 류선우 대표 불만을 흘렸습니다. 직접 바이어에게 험담한 건 아니어도 금지 원칙을 깬 책임은 인정합니다.",
      "behaviorHint": "감정이 먼저 올라오고 나서야 사실을 꺼낸다.",
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
          "agitated",
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:b:d-2:responsibility:1"
        ],
        "forbidAtomIds": [
          "partnership-12:b:d-2:act:0"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:core:motive:motive",
      "coverageKey": "b:d-2:core:late:motive:motive",
      "variantTarget": 1,
      "setFlags": [
        "d-2:core:free_opened"
      ],
      "tags": [
        "late",
        "free_question"
      ],
      "requiresFlags": [
        "d-2:core:emotion_opened"
      ]
    },
    {
      "id": "partnership12:beat_v2:a:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "당시엔 장수진 대표가 바이어에게 직접 제 얘길 흘렸다고 봤습니다. 크롭 전사랑 거래처 반응이 그쪽으로 읽혔습니다. 그때는 그렇게 읽을 수밖에 없었습니다.",
      "behaviorHint": "일정과 숫자부터 꺼내며 감정을 잘라낸다.",
      "applicableStates": [
        "M0",
        "M1"
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
          "guarded",
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
          "M1"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:a:d-3:counter:0"
        ],
        "forbidAtomIds": [
          "partnership-12:a:d-3:admission:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:identity",
      "coverageKey": "a:d-3:surface:early:trap:identity",
      "variantTarget": 1,
      "setFlags": [
        "d-3:surface:trap_seen"
      ],
      "tags": [
        "trap",
        "red_herring",
        "hot"
      ]
    },
    {
      "id": "partnership12:beat_v2:a:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "지금 보면 그 캡처만으로는 수신자가 바이어인지 외부 스태프인지 확정할 수 없습니다. 문장 앞뒤도 빠져 있습니다. 핵심은 그 한 장만으로는 전체 경로를 못 확정한다는 점입니다.",
      "behaviorHint": "일정과 숫자부터 꺼내며 감정을 잘라낸다.",
      "applicableStates": [
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
          "guarded",
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
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:a:d-3:context:0"
        ],
        "forbidAtomIds": [
          "partnership-12:a:d-3:admission:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:context",
      "coverageKey": "a:d-3:surface:early:trap:context",
      "variantTarget": 1,
      "setFlags": [
        "d-3:surface:misbelief_named"
      ],
      "tags": [
        "trap",
        "red_herring",
        "hot"
      ]
    },
    {
      "id": "partnership12:beat_v2:a:d-3:motive:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "그래도 행사 직후 반응을 겪은 입장에선 누군가 의도적으로 그 인상을 만들었다고 느꼈습니다. 제 판단이 완전히 식지는 않았습니다. 원문과 경로가 보이니 제 확신도 흔들리기 시작합니다.",
      "behaviorHint": "일정과 숫자부터 꺼내며 감정을 잘라낸다.",
      "applicableStates": [
        "M3"
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
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "spent"
        ],
        "misconceptionStates": [
          "M3"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:a:d-3:emotion:1"
        ],
        "forbidAtomIds": [
          "partnership-12:a:d-3:counter:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:trap:context",
      "coverageKey": "a:d-3:motive:late:trap:context",
      "variantTarget": 1,
      "setFlags": [
        "d-3:surface:misbelief_shaken"
      ],
      "tags": [
        "trap",
        "red_herring",
        "late"
      ],
      "requiresFlags": [
        "d-3:surface:misbelief_named"
      ]
    },
    {
      "id": "partnership12:beat_v2:a:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confess",
      "line": "장수진 대표가 바이어에게 직접 험담한 건 아니었습니다. 홍세진이 양쪽 불만을 섞어 buyer recap으로 과장한 게 핵심이었습니다. 오해를 붙들고 있던 제 감정도 인정합니다.",
      "behaviorHint": "일정과 숫자부터 꺼내며 감정을 잘라낸다.",
      "applicableStates": [
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
          "agitated",
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "spent"
        ],
        "misconceptionStates": [
          "M4"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:a:d-3:admission:1"
        ],
        "forbidAtomIds": [
          "partnership-12:a:d-3:counter:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:trap:emotion",
      "coverageKey": "a:d-3:core:late:trap:emotion",
      "variantTarget": 1,
      "setFlags": [
        "d-3:core:truth_window_open"
      ],
      "tags": [
        "trap",
        "red_herring",
        "late"
      ],
      "requiresFlags": [
        "d-3:surface:misbelief_shaken"
      ]
    },
    {
      "id": "partnership12:beat_v2:b:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "결국 류선우 대표가 바이어 앞에서 제 평판을 깎았다고 믿었습니다. 그 캡처 한 줄이랑 반응이 딱 그렇게 붙었으니까요. 그때는 그렇게 읽을 수밖에 없었습니다.",
      "behaviorHint": "결론 문장을 먼저 던지고 상대를 압박한다.",
      "applicableStates": [
        "M0",
        "M1"
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
          "guarded",
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
          "M1"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:b:d-3:counter:0"
        ],
        "forbidAtomIds": [
          "partnership-12:b:d-3:admission:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:identity",
      "coverageKey": "b:d-3:surface:early:trap:identity",
      "variantTarget": 1,
      "setFlags": [
        "d-3:surface:trap_seen"
      ],
      "tags": [
        "trap",
        "red_herring",
        "hot"
      ]
    },
    {
      "id": "partnership12:beat_v2:b:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "지금은 압니다. 그 캡처만으론 수신자도, 문장 앞뒤도 안 보입니다. 그 한 장으로는 직접 험담을 못 박을 수 없어요. 핵심은 그 한 장만으로는 전체 경로를 못 확정한다는 점입니다.",
      "behaviorHint": "결론 문장을 먼저 던지고 상대를 압박한다.",
      "applicableStates": [
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
          "guarded",
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
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:b:d-3:context:0"
        ],
        "forbidAtomIds": [
          "partnership-12:b:d-3:admission:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:context",
      "coverageKey": "b:d-3:surface:early:trap:context",
      "variantTarget": 1,
      "setFlags": [
        "d-3:surface:misbelief_named"
      ],
      "tags": [
        "trap",
        "red_herring",
        "hot"
      ]
    },
    {
      "id": "partnership12:beat_v2:b:d-3:motive:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "그래도 그 시점의 저는 누가 제 이름을 건너뛰어 설명했다고 느꼈고, 그래서 더 몰아붙였습니다. 배신감이 너무 먼저 왔어요. 원문과 경로가 보이니 제 확신도 흔들리기 시작합니다.",
      "behaviorHint": "결론 문장을 먼저 던지고 상대를 압박한다.",
      "applicableStates": [
        "M3"
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
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "spent"
        ],
        "misconceptionStates": [
          "M3"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:b:d-3:emotion:1"
        ],
        "forbidAtomIds": [
          "partnership-12:b:d-3:counter:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:trap:context",
      "coverageKey": "b:d-3:motive:late:trap:context",
      "variantTarget": 1,
      "setFlags": [
        "d-3:surface:misbelief_shaken"
      ],
      "tags": [
        "trap",
        "red_herring",
        "late"
      ],
      "requiresFlags": [
        "d-3:surface:misbelief_named"
      ]
    },
    {
      "id": "partnership12:beat_v2:b:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confess",
      "line": "류선우 대표가 바이어에게 직접 험담한 건 아니었습니다. 홍세진이 양쪽 불만을 섞어 과장한 요약을 돌린 겁니다. 오해를 붙들고 있던 제 감정도 인정합니다.",
      "behaviorHint": "결론 문장을 먼저 던지고 상대를 압박한다.",
      "applicableStates": [
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
          "agitated",
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "spent"
        ],
        "misconceptionStates": [
          "M4"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:b:d-3:admission:1"
        ],
        "forbidAtomIds": [
          "partnership-12:b:d-3:counter:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:trap:emotion",
      "coverageKey": "b:d-3:core:late:trap:emotion",
      "variantTarget": 1,
      "setFlags": [
        "d-3:core:truth_window_open"
      ],
      "tags": [
        "trap",
        "red_herring",
        "late"
      ],
      "requiresFlags": [
        "d-3:surface:misbelief_shaken"
      ]
    },
    {
      "id": "partnership12:beat_v2:a:d-4:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "문서를 같이 놓고 보면 네, 외부 인력 앞에서 상대 불만을 꺼낸 순간 규칙 위반이 됩니다. 그 점은 부인하기 어렵습니다.",
      "behaviorHint": "자료 명칭을 확인한 뒤, 계산된 문장으로 책임 범위를 좁힌다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:a:d-4:admission:0"
        ],
        "forbidAtomIds": [
          "partnership-12:a:d-4:admission:2"
        ]
      },
      "weight": 6,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:evidence:legality",
      "coverageKey": "a:d-4:motive:mid:evidence:legality",
      "variantTarget": 1,
      "setFlags": [
        "d-4:surface:record_seen"
      ],
      "tags": [
        "evidence"
      ]
    },
    {
      "id": "partnership12:beat_v2:a:d-4:motive:evidence:context:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "원본 흐름까지 보면 그 원칙은 양쪽 모두 깼습니다. 제 잘못이 줄진 않지만, 사건 구조는 그쪽이 맞습니다.",
      "behaviorHint": "자료 명칭을 확인한 뒤, 계산된 문장으로 책임 범위를 좁힌다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:a:d-4:responsibility:0"
        ],
        "forbidAtomIds": [
          "partnership-12:a:d-4:admission:2"
        ]
      },
      "weight": 6,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:evidence:context",
      "coverageKey": "a:d-4:motive:mid:evidence:context",
      "variantTarget": 1,
      "setFlags": [
        "d-4:motive:context_locked"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-4:surface:record_seen"
      ]
    },
    {
      "id": "partnership12:beat_v2:b:d-4:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "문서를 같이 놓고 보면 맞아요. 외부 인력 앞에서 상대 얘기를 꺼낸 순간 이미 규칙 위반입니다. 그 선을 제가 넘었습니다.",
      "behaviorHint": "증거 한 줄을 크게 확대해 의도를 묻는다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:b:d-4:admission:0"
        ],
        "forbidAtomIds": [
          "partnership-12:b:d-4:admission:2"
        ]
      },
      "weight": 6,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:motive:evidence:legality",
      "coverageKey": "b:d-4:motive:mid:evidence:legality",
      "variantTarget": 1,
      "setFlags": [
        "d-4:surface:record_seen"
      ],
      "tags": [
        "evidence"
      ]
    },
    {
      "id": "partnership12:beat_v2:b:d-4:motive:evidence:context:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "원본 흐름까지 보면 저만 어긴 건 아닙니다. 선우 대표도 같은 선을 넘었고, 그래서 소문 재료가 양쪽에서 생겼어요.",
      "behaviorHint": "증거 한 줄을 크게 확대해 의도를 묻는다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:b:d-4:responsibility:0"
        ],
        "forbidAtomIds": [
          "partnership-12:b:d-4:admission:2"
        ]
      },
      "weight": 6,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:motive:evidence:context",
      "coverageKey": "b:d-4:motive:mid:evidence:context",
      "variantTarget": 1,
      "setFlags": [
        "d-4:motive:context_locked"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-4:surface:record_seen"
      ]
    },
    {
      "id": "partnership12:beat_v2:a:d-5:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "돌려 말하지 않겠습니다. 밖에 말을 남긴 순간 해석권을 넘겼다는 사실이 가장 아픕니다. 그때부터 누가 문장을 대신 써도 막기 어려웠습니다.",
      "behaviorHint": "한 템포 쉬고 방어를 내려놓지만 끝까지 구조로 설명한다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "sub_truth",
      "responseIntent": "motive_response",
      "angleTag": "motive",
      "actionFamily": "free_question",
      "questionTypes": [],
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
          "wary",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:a:d-5:emotion:0"
        ],
        "forbidAtomIds": [
          "partnership-12:a:d-5:counter:0"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:motive:motive",
      "coverageKey": "a:d-5:core:late:motive:motive",
      "variantTarget": 1,
      "setFlags": [
        "d-5:surface:risk_seen"
      ],
      "tags": [
        "late",
        "free_question"
      ]
    },
    {
      "id": "partnership12:beat_v2:a:d-5:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confess",
      "line": "이제는 감정까지 포함해 말하겠습니다. 문제의 문장은 애프터파티 후 홍세진 계정의 buyer recap에서 처음 등장했습니다. 제 발화도, 장수진 대표 발화도 그 문장 자체는 아니었습니다.",
      "behaviorHint": "한 템포 쉬고 방어를 내려놓지만 끝까지 구조로 설명한다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "sub_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "free_question",
      "questionTypes": [],
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
          "wary",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:a:d-5:emotion:0"
        ],
        "forbidAtomIds": [
          "partnership-12:a:d-5:counter:0"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:rapport:emotion",
      "coverageKey": "a:d-5:core:late:rapport:emotion",
      "variantTarget": 1,
      "setFlags": [
        "d-5:core:repair_named"
      ],
      "tags": [
        "late",
        "free_question"
      ],
      "requiresFlags": [
        "d-5:surface:risk_seen"
      ]
    },
    {
      "id": "partnership12:beat_v2:b:d-5:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "돌려 말하지 않겠습니다. 제가 밖에서 불만을 말한 순간 누가 결론을 대신 써버릴 틈을 준 셈입니다. 그게 제일 뼈아파요.",
      "behaviorHint": "감정이 먼저 올라오고 나서야 사실을 꺼낸다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "sub_truth",
      "responseIntent": "motive_response",
      "angleTag": "motive",
      "actionFamily": "free_question",
      "questionTypes": [],
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
          "wary",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:b:d-5:emotion:0"
        ],
        "forbidAtomIds": [
          "partnership-12:b:d-5:counter:0"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:motive:motive",
      "coverageKey": "b:d-5:core:late:motive:motive",
      "variantTarget": 1,
      "setFlags": [
        "d-5:surface:risk_seen"
      ],
      "tags": [
        "late",
        "free_question"
      ]
    },
    {
      "id": "partnership12:beat_v2:b:d-5:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confess",
      "line": "이제는 감정까지 포함해 말하겠습니다. 소문의 첫 문장은 홍세진 buyer recap이었습니다. 직접 험담이 아니라, 외부로 샌 불만이 제3자 요약에서 과장된 거예요.",
      "behaviorHint": "감정이 먼저 올라오고 나서야 사실을 꺼낸다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "sub_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "free_question",
      "questionTypes": [],
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
          "wary",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:b:d-5:emotion:0"
        ],
        "forbidAtomIds": [
          "partnership-12:b:d-5:counter:0"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:rapport:emotion",
      "coverageKey": "b:d-5:core:late:rapport:emotion",
      "variantTarget": 1,
      "setFlags": [
        "d-5:core:repair_named"
      ],
      "tags": [
        "late",
        "free_question"
      ],
      "requiresFlags": [
        "d-5:surface:risk_seen"
      ]
    },
    {
      "id": "partnership12:beat_v2:a:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "잠깐, 지금은 '홍세진'보다 제 쪽 긴장과 억울함이 먼저 올라옵니다. 그 순간엔 그렇게 버틸 수밖에 없었습니다.",
      "behaviorHint": "짧고 날카롭게 끊어 말하며 핵심 수치만 박아 넣는다.",
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
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:a:d-1:self_justification:1"
        ],
        "forbidAtomIds": [
          "partnership-12:a:d-1:admission:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
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
      "id": "partnership12:beat_v2:a:d-1:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "감정 얘기로 핵심을 흐리지 마세요. 지금은 '홍세진'하고 '개인 카톡'부터 먼저 정리해야 합니다.",
      "behaviorHint": "짧고 날카롭게 끊어 말하며 핵심 수치만 박아 넣는다.",
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
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:a:d-1:self_justification:1"
        ],
        "forbidAtomIds": [
          "partnership-12:a:d-1:admission:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
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
      "id": "partnership12:beat_v2:b:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "잠깐, 지금은 '보조 스태프'보다 제 쪽 긴장과 억울함이 먼저 올라옵니다. 그 순간엔 그렇게 버틸 수밖에 없었습니다.",
      "behaviorHint": "말을 끊고 즉각 반박하며 질문을 되받아친다.",
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
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:b:d-2:self_justification:1"
        ],
        "forbidAtomIds": [
          "partnership-12:b:d-2:admission:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
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
      "id": "partnership12:beat_v2:b:d-2:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "감정 얘기로 핵심을 흐리지 마세요. 지금은 '보조 스태프'하고 '승인 지연'부터 먼저 정리해야 합니다.",
      "behaviorHint": "말을 끊고 즉각 반박하며 질문을 되받아친다.",
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
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-12:b:d-2:self_justification:1"
        ],
        "forbidAtomIds": [
          "partnership-12:b:d-2:admission:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
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
      "id": "partnership12:beat_v2:a:d-1:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "아니요, '홍세진'이랑 '개인 카톡' 순서를 보면 그 설명은 안 맞습니다. 그 디테일을 빼면 사실이 틀어집니다.",
      "behaviorHint": "짧고 날카롭게 끊어 말하며 핵심 수치만 박아 넣는다.",
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
          "partnership-12:a:d-1:self_justification:1"
        ],
        "forbidAtomIds": [
          "partnership-12:a:d-1:admission:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
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
      "id": "partnership12:beat_v2:a:d-1:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "'홍세진' 하나만 떼서 말하지 마세요. '개인 카톡'랑 '음성메모'까지 같이 봐야 합니다.",
      "behaviorHint": "짧고 날카롭게 끊어 말하며 핵심 수치만 박아 넣는다.",
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
          "partnership-12:a:d-1:self_justification:1"
        ],
        "forbidAtomIds": [
          "partnership-12:a:d-1:admission:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
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
      "id": "partnership12:beat_v2:b:d-2:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "아니요, '보조 스태프'이랑 '승인 지연' 순서를 보면 그 설명은 안 맞습니다. 그 디테일을 빼면 사실이 틀어집니다.",
      "behaviorHint": "말을 끊고 즉각 반박하며 질문을 되받아친다.",
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
          "partnership-12:b:d-2:self_justification:1"
        ],
        "forbidAtomIds": [
          "partnership-12:b:d-2:admission:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
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
      "id": "partnership12:beat_v2:b:d-2:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "'보조 스태프' 하나만 떼서 말하지 마세요. '승인 지연'랑 '출고 불안정'까지 같이 봐야 합니다.",
      "behaviorHint": "말을 끊고 즉각 반박하며 질문을 되받아친다.",
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
          "partnership-12:b:d-2:self_justification:1"
        ],
        "forbidAtomIds": [
          "partnership-12:b:d-2:admission:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
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
      "id": "partnership12:beat_v2:a:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "그 화면만 보면 저라도 그렇게 의심했을 겁니다. 문제는 '크롭 전사' 프레임이 너무 그럴듯하게 보였다는 겁니다.",
      "behaviorHint": "짧고 날카롭게 끊어 말하며 핵심 수치만 박아 넣는다.",
      "applicableStates": [
        "M1",
        "M2",
        "M3"
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
          "partnership-12:a:d-3:context:0"
        ],
        "forbidAtomIds": [
          "partnership-12:a:d-3:admission:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
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
      "id": "partnership12:beat_v2:a:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "그 한 줄만으로 의도까지 못 박지 마세요. 지금 가진 건 '크롭 전사' 프레임 한 장뿐이고 아직 원문이 닫혀 있습니다.",
      "behaviorHint": "짧고 날카롭게 끊어 말하며 핵심 수치만 박아 넣는다.",
      "applicableStates": [
        "M1",
        "M2",
        "M3"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
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
          "partnership-12:a:d-3:context:0"
        ],
        "forbidAtomIds": [
          "partnership-12:a:d-3:admission:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
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
      "beliefMode": "weaponizes"
    },
    {
      "id": "partnership12:beat_v2:b:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "그 화면만 보면 저라도 그렇게 의심했을 겁니다. 문제는 '크롭 전사' 프레임이 너무 그럴듯하게 보였다는 겁니다.",
      "behaviorHint": "말을 끊고 즉각 반박하며 질문을 되받아친다.",
      "applicableStates": [
        "M1",
        "M2",
        "M3"
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
          "partnership-12:b:d-3:context:0"
        ],
        "forbidAtomIds": [
          "partnership-12:b:d-3:admission:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
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
      "id": "partnership12:beat_v2:b:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "그 한 줄만으로 의도까지 못 박지 마세요. 지금 가진 건 '크롭 전사' 프레임 한 장뿐이고 아직 원문이 닫혀 있습니다.",
      "behaviorHint": "말을 끊고 즉각 반박하며 질문을 되받아친다.",
      "applicableStates": [
        "M1",
        "M2",
        "M3"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
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
          "partnership-12:b:d-3:context:0"
        ],
        "forbidAtomIds": [
          "partnership-12:b:d-3:admission:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
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
      "beliefMode": "weaponizes"
    }
  ]
} as const;

export default partnership12BeatsV2Full;
