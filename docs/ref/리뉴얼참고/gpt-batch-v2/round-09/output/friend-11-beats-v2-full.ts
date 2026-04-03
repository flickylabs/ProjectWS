export const friend11BeatsV2Full = {
  "caseId": "friend-11",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 58,
    "byActionFamily": {
      "question": 28,
      "evidence": 8,
      "fatigue": 6,
      "interjection": 12,
      "free_question": 4
    },
    "byIssueRole": {
      "core_truth": 38,
      "shared_misconception": 6,
      "sub_truth": 8,
      "red_herring": 6
    },
    "byParty": {
      "b": 29,
      "a": 29
    },
    "byDispute": {
      "d-1": 19,
      "d-2": 19,
      "d-3": 6,
      "d-4": 8,
      "d-5": 6
    },
    "interjectionCount": 12,
    "fatigueCount": 6,
    "freeQuestionCount": 4
  },
  "beats": [
    {
      "id": "friend11:beat_v2:b:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "급하게 보안 대응을 하느라 말이 짧았던 건 맞지만, 일방 차단만 남기려던 건 아닙니다.",
      "behaviorHint": "단어를 교정하듯 말하면서도 설명 부족은 살짝 인정한다.",
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
          "friend11:b:d-1:s0:denial:0",
          "friend11:b:d-1:s0:denial:1"
        ],
        "forbidAtomIds": [
          "friend11:b:d-1:unlock:s4:01",
          "friend11:b:d-1:unlock:s5:01"
        ]
      },
      "weight": 6,
      "priority": 32,
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
      "id": "friend11:beat_v2:b:d-1:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "누가 직접 그 선을 넘었다고까지는 못 하겠어요. 그건 차단이 아니라 복구 후 접근 정리였습니다. 보안 문제를 수습하는 데 필요한 단계였어요.",
      "behaviorHint": "보안 알림 시각과 기기 변경 순서를 차갑게 읊으며 감정을 억누른다.",
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
          "friend11:b:d-1:s0:denial:0",
          "friend11:b:d-1:s0:denial:1"
        ],
        "forbidAtomIds": [
          "friend11:b:d-1:unlock:s4:01",
          "friend11:b:d-1:unlock:s5:01"
        ]
      },
      "weight": 6,
      "priority": 32,
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
      "id": "friend11:beat_v2:b:d-1:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "앞뒤를 같이 보면, 그건 차단이 아니라 복구 후 접근 정리였습니다. 보안 문제를 수습하는 데 필요한 단계였어요. 프로필도 없애려던 게 아니라 공유 흔적을 정돈한 겁니다.",
      "behaviorHint": "보안 알림 시각과 기기 변경 순서를 차갑게 읊으며 감정을 억누른다.",
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
          "friend11:b:d-1:s0:denial:0",
          "friend11:b:d-1:s0:denial:1"
        ],
        "forbidAtomIds": [
          "friend11:b:d-1:unlock:s4:01",
          "friend11:b:d-1:unlock:s5:01"
        ]
      },
      "weight": 6,
      "priority": 32,
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
      "id": "friend11:beat_v2:b:d-1:surface:pressure:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "그 시점만 놓고 보면, 그건 차단이 아니라 복구 후 접근 정리였습니다. 보안 문제를 수습하는 데 필요한 단계였어요.",
      "behaviorHint": "보안 알림 시각과 기기 변경 순서를 차갑게 읊으며 감정을 억누른다.",
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
          "friend11:b:d-1:s0:denial:0",
          "friend11:b:d-1:s0:denial:1"
        ],
        "forbidAtomIds": [
          "friend11:b:d-1:unlock:s4:01",
          "friend11:b:d-1:unlock:s5:01"
        ]
      },
      "weight": 6,
      "priority": 32,
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
      "id": "friend11:beat_v2:b:d-1:surface:pressure:identity:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "행위 주체를 한쪽으로만 묶기엔 아직 이릅니다. 프로필도 없애려던 게 아니라 공유 흔적을 정돈한 겁니다.",
      "behaviorHint": "보안 알림 시각과 기기 변경 순서를 차갑게 읊으며 감정을 억누른다.",
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
          "friend11:b:d-1:s0:denial:0",
          "friend11:b:d-1:s0:denial:1"
        ],
        "forbidAtomIds": [
          "friend11:b:d-1:unlock:s4:01",
          "friend11:b:d-1:unlock:s5:01"
        ]
      },
      "weight": 6,
      "priority": 32,
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
      "id": "friend11:beat_v2:b:d-1:surface:pressure:timeline:03",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "순서를 그렇게 곧장 못 박을 수는 없어요. 프로필도 없애려던 게 아니라 공유 흔적을 정돈한 겁니다.",
      "behaviorHint": "보안 알림 시각과 기기 변경 순서를 차갑게 읊으며 감정을 억누른다.",
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
          "friend11:b:d-1:s0:denial:0",
          "friend11:b:d-1:s0:denial:1"
        ],
        "forbidAtomIds": [
          "friend11:b:d-1:unlock:s4:01",
          "friend11:b:d-1:unlock:s5:01"
        ]
      },
      "weight": 6,
      "priority": 32,
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
      "id": "friend11:beat_v2:b:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "민우가 왜 추방처럼 느꼈는지도 지금은 압니다.",
      "behaviorHint": "기술 설명이 막히고 관계적 추방감이라는 표현이 처음 스친다.",
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
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend11:b:d-1:unlock:s2:01",
          "friend11:b:d-1:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:b:d-1:unlock:s4:01",
          "friend11:b:d-1:unlock:s5:01"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:pressure:responsibility",
      "coverageKey": "b:d-1:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-1:motive:responsibility_open"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-1:surface:evidence_seen"
      ]
    },
    {
      "id": "friend11:beat_v2:b:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "왜 그렇게 굴었느냐고 묻는다면, 그리고 프로필까지 한 번에 정리한 건 결과적으로 과했습니다.",
      "behaviorHint": "차단을 \"접근 정리\"라 부르며 조치의 차가움을 용어로 희석한다.",
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
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend11:b:d-1:unlock:s2:01",
          "friend11:b:d-1:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:b:d-1:unlock:s4:01",
          "friend11:b:d-1:unlock:s5:01"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:motive:motive",
      "coverageKey": "b:d-1:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-1:motive:motive_open"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-1:surface:evidence_seen"
      ]
    },
    {
      "id": "friend11:beat_v2:b:d-1:motive:pressure:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "여기서 갈리는 건 결국 책임선입니다. 접근권을 회수한 건 맞습니다.",
      "behaviorHint": "차단을 \"접근 정리\"라 부르며 조치의 차가움을 용어로 희석한다.",
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
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend11:b:d-1:unlock:s2:01",
          "friend11:b:d-1:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:b:d-1:unlock:s4:01",
          "friend11:b:d-1:unlock:s5:01"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:pressure:responsibility",
      "coverageKey": "b:d-1:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-1:motive:responsibility_open"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-1:surface:evidence_seen"
      ]
    },
    {
      "id": "friend11:beat_v2:b:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confess",
      "line": "감정까지 묻는다면, 민우가 제 정보를 다시 쓴 걸 보고 화가 나서, 복구 명분 이상으로 차갑게 밀어붙였습니다.",
      "behaviorHint": "필요 이상으로 잘라 낸 모양새가 부담되지만 로그 설명을 놓지 않는다.",
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
          "shaken",
          "raw"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "frayed",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend11:b:d-1:unlock:s4:01",
          "friend11:b:d-1:unlock:s5:01"
        ],
        "forbidAtomIds": [
          "friend11:b:d-1:s0:denial:0",
          "friend11:b:d-1:s0:denial:1"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:rapport:emotion",
      "coverageKey": "b:d-1:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:emotion_revealed"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-1:motive:responsibility_open"
      ]
    },
    {
      "id": "friend11:beat_v2:b:d-1:surface:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "접근권을 회수한 건 맞습니다. 그리고 프로필까지 한 번에 정리한 건 결과적으로 과했습니다.",
      "behaviorHint": "로그 시각을 짚다가 마지막에 짧게 고개를 끄덕인다.",
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
          "agitated",
          "shaken"
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
          "friend11:b:d-1:unlock:s2:01",
          "friend11:b:d-1:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:b:d-1:unlock:s4:01",
          "friend11:b:d-1:unlock:s5:01"
        ]
      },
      "weight": 5,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:evidence:identity",
      "coverageKey": "b:d-1:surface:mid:evidence:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-1:surface:evidence_seen"
      ],
      "tags": [
        "cold",
        "evidence"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ]
    },
    {
      "id": "friend11:beat_v2:b:d-1:core:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confess",
      "line": "민우의 무단 재인증에 대응할 명분은 있었지만, 제가 설명 없이 기기를 끊고 공유 프로필을 정리한 건 제 잘못입니다. 복구는 필요했어도 방식은 일방적이었습니다.",
      "behaviorHint": "보고서를 내려놓고 변명 없이 '방식은 잘못됐다'는 요지만 남긴다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "evidence_response",
      "angleTag": "legality",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "shaken",
          "raw"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "frayed",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend11:b:d-1:unlock:s4:01",
          "friend11:b:d-1:unlock:s5:01"
        ],
        "forbidAtomIds": [
          "friend11:b:d-1:s0:denial:0",
          "friend11:b:d-1:s0:denial:1"
        ]
      },
      "weight": 5,
      "priority": 30,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:evidence:legality",
      "coverageKey": "b:d-1:core:late:evidence:legality",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:legality_revealed"
      ],
      "tags": [
        "late",
        "evidence"
      ],
      "requiresFlags": [
        "d-1:motive:responsibility_open"
      ]
    },
    {
      "id": "friend11:beat_v2:b:d-1:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "fatigue",
      "line": "접근차단이랑 프로필초기화 얘기까지 이미 했어요. 같은 책임 질문만 계속 돌리면 저도 짜증이 납니다.",
      "behaviorHint": "같은 추궁이 이어지자 시각과 로그를 더 세게 낭독하며 방어한다.",
      "applicableStates": [
        "S2"
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
          "shaken"
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
          "friend11:b:d-1:unlock:s2:01",
          "friend11:b:d-1:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:b:d-1:unlock:s4:01",
          "friend11:b:d-1:unlock:s5:01"
        ]
      },
      "weight": 4,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:fatigue:responsibility",
      "coverageKey": "b:d-1:surface:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-1:surface:fatigue_warning"
      ],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "friend11:beat_v2:b:d-1:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "fatigue",
      "line": "지금은 로그인실패 순서만 붙들고 계시잖아요. 제가 말한 앞뒤 맥락도 같이 들어주셔야죠.",
      "behaviorHint": "설명보다 기록 화면을 앞세우며 질문 자체를 무미건조하게 밀어낸다.",
      "applicableStates": [
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
          "shaken"
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
          "friend11:b:d-1:unlock:s2:01",
          "friend11:b:d-1:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:b:d-1:unlock:s4:01",
          "friend11:b:d-1:unlock:s5:01"
        ]
      },
      "weight": 4,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:fatigue:timeline",
      "coverageKey": "b:d-1:surface:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-1:surface:fatigue_block"
      ],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "friend11:beat_v2:b:d-1:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "fatigue",
      "line": "계속 그렇게 몰아가면 저도 제일 아픈 쪽부터 말할 수밖에 없어요. 감정까지 묻는다면, 민우가 제 정보를 다시 쓴 걸 보고 화가 나서, 복구 명분 이상으로 차갑게 밀어붙였습니다.",
      "behaviorHint": "짧게 숨을 끊고, 설명 대신 절차를 먼저 둔 자신의 냉정을 마지못해 인정한다.",
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
          "shaken"
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
          "friend11:b:d-1:unlock:s2:01",
          "friend11:b:d-1:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:b:d-1:unlock:s4:01",
          "friend11:b:d-1:unlock:s5:01"
        ]
      },
      "weight": 4,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:fatigue:responsibility",
      "coverageKey": "b:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:fatigue_counter"
      ],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "friend11:beat_v2:b:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interjection",
      "line": "먼저 바뀐 건 제 로그인이 아니라 관리자 구조예요. 제 정보가 다시 들어간 뒤였다고요.",
      "behaviorHint": "숨을 짧게 끊고 시간순 단어만 유독 단단하게 발음한다.",
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
          "frayed"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend11:b:d-1:unlock:s2:01",
          "friend11:b:d-1:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:b:d-1:unlock:s4:01",
          "friend11:b:d-1:unlock:s5:01"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-1:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:interjection_emotional_only_allow"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "friend11:beat_v2:b:d-1:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interjection",
      "line": "지금 그 감정선으로 더 말하면 저도 선을 넘습니다. 여기서 끊죠.",
      "behaviorHint": "입술을 깨물고 말을 끊으며 더 길게 새지 않으려 한다.",
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
          "frayed"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend11:b:d-1:unlock:s2:01",
          "friend11:b:d-1:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:b:d-1:unlock:s4:01",
          "friend11:b:d-1:unlock:s5:01"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-1:surface:mid:interjection:emotional_only:block",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:interjection_emotional_only_block"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "friend11:beat_v2:b:d-1:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interjection",
      "line": "접근차단만 떼 오면 그렇게 들리죠. 그런데 프로필초기화이랑 로그인실패까지 같이 보면 얘기가 달라집니다.",
      "behaviorHint": "구체적인 디테일을 빠르게 짚는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "responsibility",
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
          "frayed"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend11:b:d-1:unlock:s2:01",
          "friend11:b:d-1:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:b:d-1:unlock:s4:01",
          "friend11:b:d-1:unlock:s5:01"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-1:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:interjection_detail_rebuttal_allow"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "friend11:beat_v2:b:d-1:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interjection",
      "line": "접근차단 하나로 답을 잘라 버리면 더 말해도 소용없어요. 그 질문은 여기서 끊겠습니다.",
      "behaviorHint": "질문 형식 자체를 문제 삼으며 답을 잘라 낸다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "responsibility",
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
          "frayed"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend11:b:d-1:unlock:s2:01",
          "friend11:b:d-1:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:b:d-1:unlock:s4:01",
          "friend11:b:d-1:unlock:s5:01"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-1:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:interjection_detail_rebuttal_block"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "friend11:beat_v2:a:d-2:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "지워야 했던 건 맞는데 정리가 안 된 상태였을 뿐, 일부러 다시 쓰려고 붙잡아 둔 건 아니었습니다.",
      "behaviorHint": "피해 호소를 앞에 두려다가 본인확인 이야기에서만 속도가 느려진다.",
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
          "friend11:a:d-2:s0:denial:0",
          "friend11:a:d-2:s0:act:1"
        ],
        "forbidAtomIds": [
          "friend11:a:d-2:unlock:s4:01",
          "friend11:a:d-2:unlock:s5:01"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:pressure:timeline",
      "coverageKey": "a:d-2:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "friend11:beat_v2:a:d-2:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "누가 직접 그 선을 넘었다고까지는 못 하겠어요. 예전 자료를 새로 훔쳐 쓴 건 아닙니다. 재인증 과정에서 남아 있던 정보가 그냥 맞아들어간 겁니다.",
      "behaviorHint": "사라진 프로필과 시즌패스 손실을 먼저 말하며 피해자 자리를 선점한다.",
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
          "friend11:a:d-2:s0:denial:0",
          "friend11:a:d-2:s0:act:1"
        ],
        "forbidAtomIds": [
          "friend11:a:d-2:unlock:s4:01",
          "friend11:a:d-2:unlock:s5:01"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:pressure:identity",
      "coverageKey": "a:d-2:surface:early:pressure:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "friend11:beat_v2:a:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "앞뒤를 같이 보면, 예전 자료를 새로 훔쳐 쓴 건 아닙니다. 재인증 과정에서 남아 있던 정보가 그냥 맞아들어간 겁니다. 관리자 메일이 제 쪽으로 바뀐 것도 계정을 살리려다 그렇게 된 거지, 준석 걸 뺏으려던 건 아닙니다.",
      "behaviorHint": "사라진 프로필과 시즌패스 손실을 먼저 말하며 피해자 자리를 선점한다.",
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
          "friend11:a:d-2:s0:denial:0",
          "friend11:a:d-2:s0:act:1"
        ],
        "forbidAtomIds": [
          "friend11:a:d-2:unlock:s4:01",
          "friend11:a:d-2:unlock:s5:01"
        ]
      },
      "weight": 6,
      "priority": 32,
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
      "id": "friend11:beat_v2:a:d-2:surface:pressure:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "그 시점만 놓고 보면, 예전 자료를 새로 훔쳐 쓴 건 아닙니다. 재인증 과정에서 남아 있던 정보가 그냥 맞아들어간 겁니다.",
      "behaviorHint": "사라진 프로필과 시즌패스 손실을 먼저 말하며 피해자 자리를 선점한다.",
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
          "friend11:a:d-2:s0:denial:0",
          "friend11:a:d-2:s0:act:1"
        ],
        "forbidAtomIds": [
          "friend11:a:d-2:unlock:s4:01",
          "friend11:a:d-2:unlock:s5:01"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:pressure:timeline",
      "coverageKey": "a:d-2:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "friend11:beat_v2:a:d-2:surface:pressure:identity:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "행위 주체를 한쪽으로만 묶기엔 아직 이릅니다. 관리자 메일이 제 쪽으로 바뀐 것도 계정을 살리려다 그렇게 된 거지, 준석 걸 뺏으려던 건 아닙니다.",
      "behaviorHint": "사라진 프로필과 시즌패스 손실을 먼저 말하며 피해자 자리를 선점한다.",
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
          "friend11:a:d-2:s0:denial:0",
          "friend11:a:d-2:s0:act:1"
        ],
        "forbidAtomIds": [
          "friend11:a:d-2:unlock:s4:01",
          "friend11:a:d-2:unlock:s5:01"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:pressure:identity",
      "coverageKey": "a:d-2:surface:early:pressure:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "friend11:beat_v2:a:d-2:surface:pressure:timeline:03",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "순서를 그렇게 곧장 못 박을 수는 없어요. 관리자 메일이 제 쪽으로 바뀐 것도 계정을 살리려다 그렇게 된 거지, 준석 걸 뺏으려던 건 아닙니다.",
      "behaviorHint": "사라진 프로필과 시즌패스 손실을 먼저 말하며 피해자 자리를 선점한다.",
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
          "friend11:a:d-2:s0:denial:0",
          "friend11:a:d-2:s0:act:1"
        ],
        "forbidAtomIds": [
          "friend11:a:d-2:unlock:s4:01",
          "friend11:a:d-2:unlock:s5:01"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:pressure:timeline",
      "coverageKey": "a:d-2:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "friend11:beat_v2:a:d-2:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "그래도 영구히 독점하려던 게 아니라, 먼저 제 쪽에서 안정시킨 뒤 얘기하려고 했습니다.",
      "behaviorHint": "로그 시각을 본 뒤 말끝에서 '안정시키려 했다'는 변명이 따라붙는다.",
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
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend11:a:d-2:unlock:s2:01",
          "friend11:a:d-2:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:a:d-2:unlock:s4:01",
          "friend11:a:d-2:unlock:s5:01"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:motive:motive",
      "coverageKey": "a:d-2:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-2:motive:motive_open"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-2:surface:evidence_seen"
      ]
    },
    {
      "id": "friend11:beat_v2:a:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "여기서 갈리는 건 결국 책임선입니다. 예전 자료가 남아 있었고, 제가 그걸 입력한 건 맞습니다.",
      "behaviorHint": "행위보다 결과 손실을 반복해 책임 순서를 흐리려 한다.",
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
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend11:a:d-2:unlock:s2:01",
          "friend11:a:d-2:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:a:d-2:unlock:s4:01",
          "friend11:a:d-2:unlock:s5:01"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:pressure:responsibility",
      "coverageKey": "a:d-2:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-2:motive:responsibility_open"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-2:surface:evidence_seen"
      ]
    },
    {
      "id": "friend11:beat_v2:a:d-2:motive:motive:motive:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "왜 그렇게 굴었느냐고 묻는다면, 다만 저는 그걸 준석 정보를 훔쳐 썼다기보다 계정을 살리려 한 행동으로 생각했습니다.",
      "behaviorHint": "행위보다 결과 손실을 반복해 책임 순서를 흐리려 한다.",
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
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend11:a:d-2:unlock:s2:01",
          "friend11:a:d-2:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:a:d-2:unlock:s4:01",
          "friend11:a:d-2:unlock:s5:01"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:motive:motive",
      "coverageKey": "a:d-2:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-2:motive:motive_open"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-2:surface:evidence_seen"
      ]
    },
    {
      "id": "friend11:beat_v2:a:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "confess",
      "line": "감정까지 묻는다면, 준석이 또 갑자기 선을 그을까 봐 불안해서, 예전에 알고 있던 정보로 먼저 재인증을 밀어붙였습니다.",
      "behaviorHint": "억울함 속에서도 결국 먼저 건드린 부분이 있었다는 고백이 따라 나온다.",
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
          "shaken",
          "raw"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "frayed",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend11:a:d-2:unlock:s4:01",
          "friend11:a:d-2:unlock:s5:01"
        ],
        "forbidAtomIds": [
          "friend11:a:d-2:s0:denial:0",
          "friend11:a:d-2:s0:act:1"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:core:rapport:emotion",
      "coverageKey": "a:d-2:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-2:core:emotion_revealed"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-2:motive:motive_open"
      ]
    },
    {
      "id": "friend11:beat_v2:a:d-2:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "예전 자료가 남아 있었고, 제가 그걸 입력한 건 맞습니다. 다만 저는 그걸 준석 정보를 훔쳐 썼다기보다 계정을 살리려 한 행동으로 생각했습니다.",
      "behaviorHint": "친구방 캡처가 더는 방패가 안 되자 한숨 뒤에 짧은 인정 문장이 붙는다.",
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
          "agitated",
          "shaken"
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
          "friend11:a:d-2:unlock:s2:01",
          "friend11:a:d-2:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:a:d-2:unlock:s4:01",
          "friend11:a:d-2:unlock:s5:01"
        ]
      },
      "weight": 5,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:evidence:context",
      "coverageKey": "a:d-2:surface:mid:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:evidence_seen"
      ],
      "tags": [
        "cold",
        "evidence"
      ],
      "requiresFlags": [
        "d-2:surface:timeline_pressed"
      ]
    },
    {
      "id": "friend11:beat_v2:a:d-2:core:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "confess",
      "line": "제가 작년에 받은 준석의 본인확인 정보와 청구지 캡처를 지우지 않고 보관했다가, 이번 가족요금제 재인증에 다시 썼습니다. 그 결과 주 관리자 메일까지 제 쪽으로 바뀌었고, 출발점 책임은 제게 있습니다.",
      "behaviorHint": "갤러리 폴더와 메모 앱을 본 순간 변명보다 체념이 먼저 얼굴에 뜬다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "evidence_response",
      "angleTag": "legality",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "shaken",
          "raw"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "frayed",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend11:a:d-2:unlock:s4:01",
          "friend11:a:d-2:unlock:s5:01"
        ],
        "forbidAtomIds": [
          "friend11:a:d-2:s0:denial:0",
          "friend11:a:d-2:s0:act:1"
        ]
      },
      "weight": 5,
      "priority": 30,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:core:evidence:legality",
      "coverageKey": "a:d-2:core:late:evidence:legality",
      "variantTarget": 2,
      "setFlags": [
        "d-2:core:legality_revealed"
      ],
      "tags": [
        "late",
        "evidence"
      ],
      "requiresFlags": [
        "d-2:motive:motive_open"
      ]
    },
    {
      "id": "friend11:beat_v2:a:d-2:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "fatigue",
      "line": "재인증이랑 청구지캡처 얘기까지 이미 했어요. 같은 책임 질문만 계속 돌리면 저도 짜증이 납니다.",
      "behaviorHint": "같은 질문이 반복되자 손해 항목을 두세 번 되풀이하며 신경질적으로 반응한다.",
      "applicableStates": [
        "S2"
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
          "shaken"
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
          "friend11:a:d-2:unlock:s2:01",
          "friend11:a:d-2:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:a:d-2:unlock:s4:01",
          "friend11:a:d-2:unlock:s5:01"
        ]
      },
      "weight": 4,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:fatigue:responsibility",
      "coverageKey": "a:d-2:surface:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:fatigue_warning"
      ],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "friend11:beat_v2:a:d-2:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "fatigue",
      "line": "지금은 생년월일 순서만 붙들고 계시잖아요. 제가 말한 앞뒤 맥락도 같이 들어주셔야죠.",
      "behaviorHint": "행위 책임을 묻는 질문을 피해 \"계정을 살리려던 것\"이었다고 의도로 뒤집는다.",
      "applicableStates": [
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
          "shaken"
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
          "friend11:a:d-2:unlock:s2:01",
          "friend11:a:d-2:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:a:d-2:unlock:s4:01",
          "friend11:a:d-2:unlock:s5:01"
        ]
      },
      "weight": 4,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:fatigue:timeline",
      "coverageKey": "a:d-2:surface:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:fatigue_block"
      ],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "friend11:beat_v2:a:d-2:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "fatigue",
      "line": "계속 그렇게 몰아가면 저도 제일 아픈 쪽부터 말할 수밖에 없어요. 감정까지 묻는다면, 준석이 또 갑자기 선을 그을까 봐 불안해서, 예전에 알고 있던 정보로 먼저 재인증을 밀어붙였습니다.",
      "behaviorHint": "짧은 한숨 뒤에 피해 프레임을 붙잡고 있었음을 부끄럽게 인정하기 시작한다.",
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
          "shaken"
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
          "friend11:a:d-2:unlock:s2:01",
          "friend11:a:d-2:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:a:d-2:unlock:s4:01",
          "friend11:a:d-2:unlock:s5:01"
        ]
      },
      "weight": 4,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:fatigue:responsibility",
      "coverageKey": "a:d-2:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:fatigue_counter"
      ],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "friend11:beat_v2:a:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "interjection",
      "line": "그럼 제가 본 그 빈 슬롯하고 사라진 시즌패스는 다 뭐였는데요? 저는 진짜로 다 날아간 줄 알았어요!",
      "behaviorHint": "의자에서 반쯤 몸을 일으키며 손실 항목을 빠르게 두 번 반복한다.",
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
          "frayed"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend11:a:d-2:unlock:s2:01",
          "friend11:a:d-2:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:a:d-2:unlock:s4:01",
          "friend11:a:d-2:unlock:s5:01"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-2:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:interjection_emotional_only_allow"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "friend11:beat_v2:a:d-2:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "interjection",
      "line": "됐어요. 그 얘기까지 열면 감정만 더 커져요. 지금은 여기까지 하겠습니다.",
      "behaviorHint": "입술을 깨물고 말을 끊으며 더 길게 새지 않으려 한다.",
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
          "frayed"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend11:a:d-2:unlock:s2:01",
          "friend11:a:d-2:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:a:d-2:unlock:s4:01",
          "friend11:a:d-2:unlock:s5:01"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-2:surface:mid:interjection:emotional_only:block",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:interjection_emotional_only_block"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "friend11:beat_v2:a:d-2:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "interjection",
      "line": "재인증만 떼 오면 그렇게 들리죠. 그런데 청구지캡처이랑 생년월일까지 같이 보면 얘기가 달라집니다.",
      "behaviorHint": "구체적인 디테일을 빠르게 짚는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "responsibility",
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
          "frayed"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend11:a:d-2:unlock:s2:01",
          "friend11:a:d-2:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:a:d-2:unlock:s4:01",
          "friend11:a:d-2:unlock:s5:01"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-2:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:interjection_detail_rebuttal_allow"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "friend11:beat_v2:a:d-2:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "interjection",
      "line": "재인증 하나로 답을 잘라 버리면 더 말해도 소용없어요. 그 질문은 여기서 끊겠습니다.",
      "behaviorHint": "질문 형식 자체를 문제 삼으며 답을 잘라 낸다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "responsibility",
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
          "frayed"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend11:a:d-2:unlock:s2:01",
          "friend11:a:d-2:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:a:d-2:unlock:s4:01",
          "friend11:a:d-2:unlock:s5:01"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-2:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:interjection_detail_rebuttal_block"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "friend11:beat_v2:a:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "순서까지 정확히 따진 건 아니고, 제가 본 결과가 먼저라 그렇게 말한 겁니다.",
      "behaviorHint": "질문을 정면으로 못 받치고 잠금 화면 체감으로 화제를 옮긴다.",
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
          "friend11:a:d-3:s0:denial:0",
          "friend11:a:d-3:s0:evidence:1"
        ],
        "forbidAtomIds": [
          "friend11:a:d-3:unlock:s4:01",
          "friend11:a:d-3:unlock:s5:01"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:identity",
      "coverageKey": "a:d-3:surface:early:trap:identity",
      "variantTarget": 4,
      "setFlags": [
        "d-3:surface:identity_pressed"
      ],
      "tags": [
        "misbelief"
      ]
    },
    {
      "id": "friend11:beat_v2:a:d-3:motive:trap:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "clarify",
      "line": "그런데 저는 잠금 결과만 붙잡고 준석이 먼저 친 것처럼 말했습니다.",
      "behaviorHint": "시간 표현이 나올수록 목소리가 낮아지고 문장이 짧아진다.",
      "applicableStates": [
        "M2",
        "M3"
      ],
      "layer": "motive",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
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
          "frayed"
        ],
        "misconceptionStates": [
          "M2",
          "M3"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend11:a:d-3:unlock:s2:01",
          "friend11:a:d-3:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:a:d-3:unlock:s4:01",
          "friend11:a:d-3:unlock:s5:01"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:trap:responsibility",
      "coverageKey": "a:d-3:motive:mid:trap:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-3:motive:responsibility_open"
      ],
      "tags": [
        "misbelief"
      ],
      "requiresFlags": [
        "d-3:surface:misbelief_seeded"
      ]
    },
    {
      "id": "friend11:beat_v2:a:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "제가 먼저 손댄 부분이 있었다고 해도, 화면으로는 준석이 문 닫은 쪽처럼 보였습니다. 그래서 저는 그때 준석 선공이라고 믿고 말했습니다.",
      "behaviorHint": "캡처를 보며 시선이 흔들리고 '그때는 그렇게 보였다'는 말이 나온다.",
      "applicableStates": [
        "M1",
        "M2"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
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
          "frayed"
        ],
        "misconceptionStates": [
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend11:a:d-3:unlock:s2:01",
          "friend11:a:d-3:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:a:d-3:unlock:s4:01",
          "friend11:a:d-3:unlock:s5:01"
        ]
      },
      "weight": 5,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:context",
      "coverageKey": "a:d-3:surface:mid:trap:context",
      "variantTarget": 3,
      "setFlags": [
        "d-3:surface:misbelief_seeded"
      ],
      "tags": [
        "misbelief",
        "evidence"
      ],
      "requiresFlags": [
        "d-3:surface:identity_pressed"
      ]
    },
    {
      "id": "friend11:beat_v2:a:d-3:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "clarify",
      "line": "계정 탈취의 출발점은 준석의 선공 독점이 아니라, 제가 먼저 재인증으로 관리자 구조를 바꾼 행동이었습니다. 준석의 차단은 그 뒤 대응이었고, 저는 그 순서를 뒤집어 말했습니다.",
      "behaviorHint": "친구방에 먼저 던진 캡처를 떠올리며 창피함이 전면에 올라온다.",
      "applicableStates": [
        "M3",
        "M4"
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
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "frayed",
          "spent"
        ],
        "misconceptionStates": [
          "M3",
          "M4"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend11:a:d-3:unlock:s4:01",
          "friend11:a:d-3:unlock:s5:01"
        ],
        "forbidAtomIds": [
          "friend11:a:d-3:s0:denial:0",
          "friend11:a:d-3:s0:evidence:1"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:rapport:emotion",
      "coverageKey": "a:d-3:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:misbelief_shaken"
      ],
      "tags": [
        "late",
        "misbelief"
      ],
      "requiresFlags": [
        "d-3:motive:responsibility_open"
      ]
    },
    {
      "id": "friend11:beat_v2:a:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interjection",
      "line": "지금 그 그림이 세게 남는 건 알아요. 하지만 잠금 화면만 보면 준석 선공처럼 보인다.",
      "behaviorHint": "오해의 프레임을 지적하거나 그 틀에 기대는 태도가 순간적으로 드러난다.",
      "applicableStates": [
        "M1",
        "M2",
        "M3"
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
          "frayed"
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
          "friend11:a:d-3:unlock:s2:01",
          "friend11:a:d-3:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:a:d-3:unlock:s4:01",
          "friend11:a:d-3:unlock:s5:01"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 4,
      "setFlags": [
        "d-3:surface:interjection_misbelief_escalation_allow"
      ],
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
      "id": "friend11:beat_v2:b:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interjection",
      "line": "그 프레임을 그대로 밀면 사실보다 오해가 더 커집니다. 친구방 캡처가 앞선 재인증 맥락을 잘라낸다.",
      "behaviorHint": "오해의 프레임을 지적하거나 그 틀에 기대는 태도가 순간적으로 드러난다.",
      "applicableStates": [
        "M1",
        "M2",
        "M3"
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
          "frayed"
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
          "friend11:b:d-3:unlock:s2:01",
          "friend11:b:d-3:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:b:d-3:unlock:s4:01",
          "friend11:b:d-3:unlock:s5:01"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 4,
      "setFlags": [
        "d-3:surface:interjection_misbelief_escalation_block"
      ],
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
      "id": "friend11:beat_v2:a:d-4:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "규칙을 정면으로 어겼다고 보긴 어렵고, 예전 흔적을 제대로 치우지 못한 쪽이었습니다.",
      "behaviorHint": "규칙 문구를 들은 직후 시선을 피하고 실수 어휘가 늘어난다.",
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
          "friend11:a:d-4:s0:rule:0",
          "friend11:a:d-4:s0:denial:1"
        ],
        "forbidAtomIds": [
          "friend11:a:d-4:unlock:s4:01",
          "friend11:a:d-4:unlock:s5:01"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:pressure:context",
      "coverageKey": "a:d-4:surface:early:pressure:context",
      "variantTarget": 3,
      "setFlags": [
        "d-4:surface:context_pressed"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "friend11:beat_v2:a:d-4:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "그 규칙은 '귀찮아도 다시 묻자'는 약속이었는데, 저는 조용히 넘기려 했습니다.",
      "behaviorHint": "방어 자세가 느슨해지며 변명보다 불안 감정이 먼저 나온다.",
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
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend11:a:d-4:unlock:s2:01",
          "friend11:a:d-4:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:a:d-4:unlock:s4:01",
          "friend11:a:d-4:unlock:s5:01"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:motive:motive",
      "coverageKey": "a:d-4:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-4:motive:motive_open"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-4:surface:evidence_seen"
      ]
    },
    {
      "id": "friend11:beat_v2:a:d-4:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "삭제 약속을 지키지 못한 건 맞습니다. 예전 본인확인 자료를 그대로 두고 있었다는 점에서 제가 규칙을 먼저 흔든 건 인정합니다.",
      "behaviorHint": "말 앞머리가 짧아지고 인정 문장이 처음으로 끼어든다.",
      "applicableStates": [
        "S1",
        "S2"
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
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend11:a:d-4:unlock:s2:01",
          "friend11:a:d-4:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:a:d-4:unlock:s4:01",
          "friend11:a:d-4:unlock:s5:01"
        ]
      },
      "weight": 5,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:evidence:legality",
      "coverageKey": "a:d-4:surface:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-4:surface:evidence_seen"
      ],
      "tags": [
        "cold",
        "evidence"
      ],
      "requiresFlags": [
        "d-4:surface:context_pressed"
      ]
    },
    {
      "id": "friend11:beat_v2:a:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "clarify",
      "line": "작년 합의는 '한 번만 쓰고 지운다'였고, 저는 그걸 어겼습니다. 자료를 보관했고, 이번 재인증에도 다시 써서 규칙 파기의 책임이 제게 있습니다.",
      "behaviorHint": "규칙 문구를 스스로 반복한 뒤 고개를 끄덕인다.",
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
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "frayed",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend11:a:d-4:unlock:s4:01",
          "friend11:a:d-4:unlock:s5:01"
        ],
        "forbidAtomIds": [
          "friend11:a:d-4:s0:rule:0",
          "friend11:a:d-4:s0:denial:1"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:core:rapport:emotion",
      "coverageKey": "a:d-4:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-4:core:emotion_revealed"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-4:motive:motive_open"
      ]
    },
    {
      "id": "friend11:beat_v2:b:d-4:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "제가 같은 방에서 바로 말하지 않은 건 사실이지만, 그걸 규칙 파기와 같은 선상으로 보긴 어렵습니다.",
      "behaviorHint": "문장 구조가 길어지며 자기 몫을 작게 분리해 말한다.",
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
          "friend11:b:d-4:s0:denial:0",
          "friend11:b:d-4:s0:denial:1"
        ],
        "forbidAtomIds": [
          "friend11:b:d-4:unlock:s4:01",
          "friend11:b:d-4:unlock:s5:01"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:surface:pressure:context",
      "coverageKey": "b:d-4:surface:early:pressure:context",
      "variantTarget": 3,
      "setFlags": [
        "d-4:surface:context_pressed"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "friend11:beat_v2:b:d-4:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "민우에게 직접 말하지 않은 건 사실을 숨기려서가 아니라, 상처를 주고도 덜 흔들리고 싶어서였습니다.",
      "behaviorHint": "호흡이 짧아지고 기술 용어 대신 감정 단어가 처음 섞인다.",
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
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend11:b:d-4:unlock:s2:01",
          "friend11:b:d-4:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:b:d-4:unlock:s4:01",
          "friend11:b:d-4:unlock:s5:01"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:motive:motive:motive",
      "coverageKey": "b:d-4:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-4:motive:motive_open"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-4:surface:evidence_seen"
      ]
    },
    {
      "id": "friend11:beat_v2:b:d-4:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "민우가 삭제 약속을 깨뜨린 건 맞지만, 저도 설명 절차를 건너뛴 건 맞습니다. 같은 채팅방 원칙을 제대로 지킨 건 아니었습니다.",
      "behaviorHint": "규칙 문구를 따라 읽은 뒤 입술을 다물고 다음 말을 고른다.",
      "applicableStates": [
        "S1",
        "S2"
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
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend11:b:d-4:unlock:s2:01",
          "friend11:b:d-4:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:b:d-4:unlock:s4:01",
          "friend11:b:d-4:unlock:s5:01"
        ]
      },
      "weight": 5,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:surface:evidence:legality",
      "coverageKey": "b:d-4:surface:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-4:surface:evidence_seen"
      ],
      "tags": [
        "cold",
        "evidence"
      ],
      "requiresFlags": [
        "d-4:surface:context_pressed"
      ]
    },
    {
      "id": "friend11:beat_v2:b:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "clarify",
      "line": "삭제 합의를 먼저 깬 건 민우지만, 저는 같은 방 공유 원칙과 사전 설명 책임을 깼습니다. 그래서 이 규칙 파기는 한쪽만의 문제가 아니었습니다.",
      "behaviorHint": "자기 책임 문장을 먼저 말하고 나서야 민우 책임을 덧붙인다.",
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
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "frayed",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend11:b:d-4:unlock:s4:01",
          "friend11:b:d-4:unlock:s5:01"
        ],
        "forbidAtomIds": [
          "friend11:b:d-4:s0:denial:0",
          "friend11:b:d-4:s0:denial:1"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:core:rapport:emotion",
      "coverageKey": "b:d-4:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-4:core:emotion_revealed"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-4:motive:motive_open"
      ]
    },
    {
      "id": "friend11:beat_v2:a:d-5:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "interjection",
      "line": "잘린 장면만 보면 그렇게 읽히죠. 그런데 빈 슬롯과 사라진 시즌패스만 보면 절취처럼 보인다.",
      "behaviorHint": "잘린 장면과 전체 맥락의 차이를 강하게 경고한다.",
      "applicableStates": [
        "M0",
        "M1",
        "M2"
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
          "frayed"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ],
        "trapStates": [
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend11:a:d-5:unlock:s2:01",
          "friend11:a:d-5:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:a:d-5:unlock:s4:01",
          "friend11:a:d-5:unlock:s5:01"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-5:surface:mid:interjection:trap_signal:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-5:surface:interjection_trap_signal_allow"
      ],
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
      "id": "friend11:beat_v2:b:d-5:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "도난은 아니지만 복구 과정에서 슬롯과 귀속이 바뀔 수는 있습니다.",
      "behaviorHint": "짧은 부정 뒤에 기술 용어를 하나씩 덧붙이며 완충한다.",
      "applicableStates": [
        "M0",
        "M1"
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
          "M1"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend11:b:d-5:s0:denial:0",
          "friend11:b:d-5:s0:denial:1"
        ],
        "forbidAtomIds": [
          "friend11:b:d-5:unlock:s4:01",
          "friend11:b:d-5:unlock:s5:01"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:trap:context",
      "coverageKey": "b:d-5:surface:early:trap:context",
      "variantTarget": 4,
      "setFlags": [
        "d-5:surface:context_pressed"
      ],
      "tags": [
        "misbelief"
      ]
    },
    {
      "id": "friend11:beat_v2:b:d-5:motive:trap:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "clarify",
      "line": "저는 '안 가져갔다'는 말만 버티고 결과 혼란은 그대로 두었습니다.",
      "behaviorHint": "기술 설명을 늘어놓다가 중간에 스스로 말을 끊고 정리한다.",
      "applicableStates": [
        "M2",
        "M3"
      ],
      "layer": "motive",
      "issueRole": "red_herring",
      "responseIntent": "trap_confusion_response",
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
          "frayed"
        ],
        "misconceptionStates": [
          "M2",
          "M3"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend11:b:d-5:unlock:s2:01",
          "friend11:b:d-5:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:b:d-5:unlock:s4:01",
          "friend11:b:d-5:unlock:s5:01"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:trap:responsibility",
      "coverageKey": "b:d-5:motive:mid:trap:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:responsibility_open"
      ],
      "tags": [
        "misbelief"
      ],
      "requiresFlags": [
        "d-5:surface:misbelief_seeded"
      ]
    },
    {
      "id": "friend11:beat_v2:b:d-5:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "제가 손댄 게 아니라 시스템 재귀속과 부분 환불이 같이 돈 겁니다. 민우가 본 손실 장면은 실제로 있었지만, 그 방식이 제 절취를 뜻하진 않습니다.",
      "behaviorHint": "표정은 굳어 있지만 '그렇게 보였을 수 있다'는 문장이 나온다.",
      "applicableStates": [
        "M1",
        "M2"
      ],
      "layer": "surface",
      "issueRole": "red_herring",
      "responseIntent": "trap_confusion_response",
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
          "frayed"
        ],
        "misconceptionStates": [
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend11:b:d-5:unlock:s2:01",
          "friend11:b:d-5:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:b:d-5:unlock:s4:01",
          "friend11:b:d-5:unlock:s5:01"
        ]
      },
      "weight": 5,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:trap:identity",
      "coverageKey": "b:d-5:surface:mid:trap:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-5:surface:misbelief_seeded"
      ],
      "tags": [
        "misbelief",
        "evidence"
      ],
      "requiresFlags": [
        "d-5:surface:context_pressed"
      ]
    },
    {
      "id": "friend11:beat_v2:b:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "clarify",
      "line": "저는 시즌패스 아이템이나 저장 파일을 개인적으로 가져가진 않았습니다. 하지만 제 복구 신청 뒤 시스템 복원·재귀속·부분 환불이 겹치면서 민우에게는 도난처럼 보였고, 그 혼란을 제가 바로 설명하지 않았습니다.",
      "behaviorHint": "숫자를 다시 확인한 뒤 한숨 없이 건조하게 시인한다.",
      "applicableStates": [
        "M3",
        "M4"
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
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "frayed",
          "spent"
        ],
        "misconceptionStates": [
          "M3",
          "M4"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend11:b:d-5:unlock:s4:01",
          "friend11:b:d-5:unlock:s5:01"
        ],
        "forbidAtomIds": [
          "friend11:b:d-5:s0:denial:0",
          "friend11:b:d-5:s0:denial:1"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:rapport:emotion",
      "coverageKey": "b:d-5:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-5:surface:misbelief_shaken"
      ],
      "tags": [
        "late",
        "misbelief"
      ],
      "requiresFlags": [
        "d-5:motive:responsibility_open"
      ]
    },
    {
      "id": "friend11:beat_v2:b:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "interjection",
      "line": "그 함정 그림에 더는 안 끌려가겠습니다. 복원·환불 보고서를 보기 전에는 재귀속 과정을 오해하기 쉽다.",
      "behaviorHint": "잘린 장면과 전체 맥락의 차이를 강하게 경고한다.",
      "applicableStates": [
        "M0",
        "M1",
        "M2"
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
          "frayed"
        ],
        "interjectionStates": [
          "block_last_turn"
        ],
        "trapStates": [
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend11:b:d-5:unlock:s2:01",
          "friend11:b:d-5:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend11:b:d-5:unlock:s4:01",
          "friend11:b:d-5:unlock:s5:01"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-5:surface:mid:interjection:trap_signal:block",
      "variantTarget": 2,
      "setFlags": [
        "d-5:surface:interjection_trap_signal_block"
      ],
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

export default friend11BeatsV2Full;
