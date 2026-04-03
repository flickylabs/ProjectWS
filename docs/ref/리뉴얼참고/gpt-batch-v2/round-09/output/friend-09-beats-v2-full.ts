export const friend09BeatsV2Full = {
  "caseId": "friend-09",
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
      "shared_misconception": 8,
      "sub_truth": 12
    },
    "byParty": {
      "b": 29,
      "a": 29
    },
    "byDispute": {
      "d-1": 19,
      "d-2": 19,
      "d-3": 8,
      "d-4": 4,
      "d-5": 8
    },
    "interjectionCount": 12,
    "fatigueCount": 6,
    "freeQuestionCount": 4
  },
  "beats": [
    {
      "id": "friend09:beat_v2:b:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "보조 메일로 새 계정을 판 건 맞아도 그걸 실사용까지 한 건 별개입니다.",
      "behaviorHint": "숨을 길게 들이쉬고 분위기 설명부터 늘어놓는다.",
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
          "friend09:b:d1:s0:act:0",
          "friend09:b:d1:s0:evidence:1"
        ],
        "forbidAtomIds": [
          "friend09:b:d-1:unlock:s4:01",
          "friend09:b:d-1:unlock:s5:01"
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
      "id": "friend09:beat_v2:b:d-1:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "누가 직접 그 선을 넘었다고까지는 못 하겠어요. 문제 계정이 제 거라고 단정할 수는 없습니다.",
      "behaviorHint": "커뮤니티 분위기와 압박을 먼저 깔고 자신은 끌려 들어간 쪽처럼 말한다.",
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
          "friend09:b:d1:s0:act:0",
          "friend09:b:d1:s0:evidence:1"
        ],
        "forbidAtomIds": [
          "friend09:b:d-1:unlock:s4:01",
          "friend09:b:d-1:unlock:s5:01"
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
      "id": "friend09:beat_v2:b:d-1:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "앞뒤를 같이 보면, 문제 계정이 제 거라고 단정할 수는 없습니다. 계정 하나 만들었다는 말이 왜 제가 폭로글까지 올렸다는 뜻이 되죠.",
      "behaviorHint": "커뮤니티 분위기와 압박을 먼저 깔고 자신은 끌려 들어간 쪽처럼 말한다.",
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
          "friend09:b:d1:s0:act:0",
          "friend09:b:d1:s0:evidence:1"
        ],
        "forbidAtomIds": [
          "friend09:b:d-1:unlock:s4:01",
          "friend09:b:d-1:unlock:s5:01"
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
      "id": "friend09:beat_v2:b:d-1:surface:pressure:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "그 시점만 놓고 보면, 문제 계정이 제 거라고 단정할 수는 없습니다.",
      "behaviorHint": "커뮤니티 분위기와 압박을 먼저 깔고 자신은 끌려 들어간 쪽처럼 말한다.",
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
          "friend09:b:d1:s0:act:0",
          "friend09:b:d1:s0:evidence:1"
        ],
        "forbidAtomIds": [
          "friend09:b:d-1:unlock:s4:01",
          "friend09:b:d-1:unlock:s5:01"
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
      "id": "friend09:beat_v2:b:d-1:surface:pressure:identity:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "행위 주체를 한쪽으로만 묶기엔 아직 이릅니다. 계정 하나 만들었다는 말이 왜 제가 폭로글까지 올렸다는 뜻이 되죠.",
      "behaviorHint": "커뮤니티 분위기와 압박을 먼저 깔고 자신은 끌려 들어간 쪽처럼 말한다.",
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
          "friend09:b:d1:s0:act:0",
          "friend09:b:d1:s0:evidence:1"
        ],
        "forbidAtomIds": [
          "friend09:b:d-1:unlock:s4:01",
          "friend09:b:d-1:unlock:s5:01"
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
      "id": "friend09:beat_v2:b:d-1:surface:pressure:timeline:03",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "순서를 그렇게 곧장 못 박을 수는 없어요. 계정 하나 만들었다는 말이 왜 제가 폭로글까지 올렸다는 뜻이 되죠.",
      "behaviorHint": "커뮤니티 분위기와 압박을 먼저 깔고 자신은 끌려 들어간 쪽처럼 말한다.",
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
          "friend09:b:d1:s0:act:0",
          "friend09:b:d1:s0:evidence:1"
        ],
        "forbidAtomIds": [
          "friend09:b:d-1:unlock:s4:01",
          "friend09:b:d-1:unlock:s5:01"
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
      "id": "friend09:beat_v2:b:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "그래도 저는 도구를 잡은 쪽이었고 어떤 내용을 얹을지는 유리와 같이 맞췄습니다.",
      "behaviorHint": "억울한 표정을 유지하지만 삭제 흔적과 실행 장면을 더는 부정하지 못한다.",
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
          "friend09:b:d-1:unlock:s2:01",
          "friend09:b:d-1:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend09:b:d-1:unlock:s4:01",
          "friend09:b:d-1:unlock:s5:01"
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
      "id": "friend09:beat_v2:b:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "왜 그렇게 굴었느냐고 묻는다면, 하지만 최종 글 방향은 이미 유리가 넘긴 자료와 분위기 때문에 정해져 있었어요.",
      "behaviorHint": "도구와 실행을 분리해 책임을 잘게 쪼개며 한숨을 길게 쉰다.",
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
          "friend09:b:d-1:unlock:s2:01",
          "friend09:b:d-1:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend09:b:d-1:unlock:s4:01",
          "friend09:b:d-1:unlock:s5:01"
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
      "id": "friend09:beat_v2:b:d-1:motive:pressure:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "여기서 갈리는 건 결국 책임선입니다. 계정 생성과 로그인은 제가 했습니다.",
      "behaviorHint": "도구와 실행을 분리해 책임을 잘게 쪼개며 한숨을 길게 쉰다.",
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
          "friend09:b:d-1:unlock:s2:01",
          "friend09:b:d-1:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend09:b:d-1:unlock:s4:01",
          "friend09:b:d-1:unlock:s5:01"
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
      "id": "friend09:beat_v2:b:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confess",
      "line": "감정까지 묻는다면, 운영자 문의가 오자마자 지우자고 상의한 건 제가 이미 제 일인 걸 알고 있었기 때문입니다.",
      "behaviorHint": "억울함을 앞세우다 마지막에야 자기 몫을 제한적으로 인정한다.",
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
          "friend09:b:d-1:unlock:s4:01",
          "friend09:b:d-1:unlock:s5:01"
        ],
        "forbidAtomIds": [
          "friend09:b:d1:s0:act:0",
          "friend09:b:d1:s0:evidence:1"
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
      "id": "friend09:beat_v2:b:d-1:surface:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "계정 생성과 로그인은 제가 했습니다. 하지만 최종 글 방향은 이미 유리가 넘긴 자료와 분위기 때문에 정해져 있었어요.",
      "behaviorHint": "행동 일부를 인정하면서도 곧바로 상대 자료를 끌어온다.",
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
          "friend09:b:d-1:unlock:s2:01",
          "friend09:b:d-1:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend09:b:d-1:unlock:s4:01",
          "friend09:b:d-1:unlock:s5:01"
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
      "id": "friend09:beat_v2:b:d-1:core:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confess",
      "line": "익명 계정은 제가 보조 메일과 기기로 만들었고 최종 폭로글과 첫 댓글도 제가 올렸습니다. 다만 그 게시가 혼자 튀어나온 건 아니고 유리와 맞춘 문구와 자료를 들고 제가 실행했습니다.",
      "behaviorHint": "시선을 떨군 뒤 자신이 맡은 실행 책임과 공모 구조를 분명히 말한다.",
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
          "friend09:b:d-1:unlock:s4:01",
          "friend09:b:d-1:unlock:s5:01"
        ],
        "forbidAtomIds": [
          "friend09:b:d1:s0:act:0",
          "friend09:b:d1:s0:evidence:1"
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
      "id": "friend09:beat_v2:b:d-1:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "fatigue",
      "line": "익명계정이랑 보조메일 얘기까지 이미 했어요. 같은 책임 질문만 계속 돌리면 저도 짜증이 납니다.",
      "behaviorHint": "같은 추궁이 이어지자 \"계정 하나\"와 \"글 내용\"을 분리하며 짜증을 내비친다.",
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
          "friend09:b:d-1:unlock:s2:01",
          "friend09:b:d-1:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend09:b:d-1:unlock:s4:01",
          "friend09:b:d-1:unlock:s5:01"
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
      "id": "friend09:beat_v2:b:d-1:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "fatigue",
      "line": "지금은 운영로그 순서만 붙들고 계시잖아요. 제가 말한 앞뒤 맥락도 같이 들어주셔야죠.",
      "behaviorHint": "질문을 끊고 억울함부터 말하며 더 길게 설명할 힘이 없다는 식으로 버틴다.",
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
          "friend09:b:d-1:unlock:s2:01",
          "friend09:b:d-1:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend09:b:d-1:unlock:s4:01",
          "friend09:b:d-1:unlock:s5:01"
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
      "id": "friend09:beat_v2:b:d-1:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "fatigue",
      "line": "계속 그렇게 몰아가면 저도 제일 아픈 쪽부터 말할 수밖에 없어요. 감정까지 묻는다면, 운영자 문의가 오자마자 지우자고 상의한 건 제가 이미 제 일인 걸 알고 있었기 때문입니다.",
      "behaviorHint": "숨을 길게 내쉰 뒤 이용당한 사람처럼 보이고 싶어 하는 정서가 드러난다.",
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
          "friend09:b:d-1:unlock:s2:01",
          "friend09:b:d-1:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend09:b:d-1:unlock:s4:01",
          "friend09:b:d-1:unlock:s5:01"
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
      "id": "friend09:beat_v2:b:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interjection",
      "line": "계정이 제 기기에서 나온 건 맞는데, 그걸로 제가 혼자 다 짰다는 식으로 몰리면 진짜 숨 막힙니다.",
      "behaviorHint": "숨을 길게 쉬고 목이 잠긴 소리로 자기 억울함을 먼저 깐다.",
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
          "friend09:b:d-1:unlock:s2:01",
          "friend09:b:d-1:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend09:b:d-1:unlock:s4:01",
          "friend09:b:d-1:unlock:s5:01"
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
      "id": "friend09:beat_v2:b:d-1:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
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
          "friend09:b:d-1:unlock:s2:01",
          "friend09:b:d-1:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend09:b:d-1:unlock:s4:01",
          "friend09:b:d-1:unlock:s5:01"
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
      "id": "friend09:beat_v2:b:d-1:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interjection",
      "line": "원문만 읽으면 뭐합니까. 정작 빠진 줄이 있어서 그렇게 보인 건데요.",
      "behaviorHint": "억울한 표정으로 말을 끊고, '빠진 줄'이라는 표현을 반복한다.",
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
          "friend09:b:d-1:unlock:s2:01",
          "friend09:b:d-1:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend09:b:d-1:unlock:s4:01",
          "friend09:b:d-1:unlock:s5:01"
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
      "id": "friend09:beat_v2:b:d-1:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interjection",
      "line": "익명계정 하나로 답을 잘라 버리면 더 말해도 소용없어요. 그 질문은 여기서 끊겠습니다.",
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
          "friend09:b:d-1:unlock:s2:01",
          "friend09:b:d-1:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend09:b:d-1:unlock:s4:01",
          "friend09:b:d-1:unlock:s5:01"
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
      "id": "friend09:beat_v2:a:d-2:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "여러 캡처를 한 폴더에 정리한 건 맞지만, 편집이라기보다 참고용 정리였어요.",
      "behaviorHint": "차분하게 용어를 낮추며 말끝을 짧게 접는다.",
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
          "friend09:a:d2:s0:act:0",
          "friend09:a:d2:s0:harm:1"
        ],
        "forbidAtomIds": [
          "friend09:a:d-2:unlock:s4:01",
          "friend09:a:d-2:unlock:s5:01"
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
      "id": "friend09:beat_v2:a:d-2:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "누가 직접 그 선을 넘었다고까지는 못 하겠어요. 제가 만든 이미지가 아니라 이미 돌던 걸 받은 겁니다.",
      "behaviorHint": "자료의 형식과 날짜를 차갑게 병치하며 편집 책임을 해석 문제처럼 낮춘다.",
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
          "friend09:a:d2:s0:act:0",
          "friend09:a:d2:s0:harm:1"
        ],
        "forbidAtomIds": [
          "friend09:a:d-2:unlock:s4:01",
          "friend09:a:d-2:unlock:s5:01"
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
      "id": "friend09:beat_v2:a:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "앞뒤를 같이 보면, 제가 만든 이미지가 아니라 이미 돌던 걸 받은 겁니다. 잘라 붙여서 조가람을 왜곡한 적은 없습니다.",
      "behaviorHint": "자료의 형식과 날짜를 차갑게 병치하며 편집 책임을 해석 문제처럼 낮춘다.",
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
          "friend09:a:d2:s0:act:0",
          "friend09:a:d2:s0:harm:1"
        ],
        "forbidAtomIds": [
          "friend09:a:d-2:unlock:s4:01",
          "friend09:a:d-2:unlock:s5:01"
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
      "id": "friend09:beat_v2:a:d-2:surface:pressure:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "그 시점만 놓고 보면, 제가 만든 이미지가 아니라 이미 돌던 걸 받은 겁니다.",
      "behaviorHint": "자료의 형식과 날짜를 차갑게 병치하며 편집 책임을 해석 문제처럼 낮춘다.",
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
          "friend09:a:d2:s0:act:0",
          "friend09:a:d2:s0:harm:1"
        ],
        "forbidAtomIds": [
          "friend09:a:d-2:unlock:s4:01",
          "friend09:a:d-2:unlock:s5:01"
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
      "id": "friend09:beat_v2:a:d-2:surface:pressure:identity:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "행위 주체를 한쪽으로만 묶기엔 아직 이릅니다. 잘라 붙여서 조가람을 왜곡한 적은 없습니다.",
      "behaviorHint": "자료의 형식과 날짜를 차갑게 병치하며 편집 책임을 해석 문제처럼 낮춘다.",
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
          "friend09:a:d2:s0:act:0",
          "friend09:a:d2:s0:harm:1"
        ],
        "forbidAtomIds": [
          "friend09:a:d-2:unlock:s4:01",
          "friend09:a:d-2:unlock:s5:01"
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
      "id": "friend09:beat_v2:a:d-2:surface:pressure:timeline:03",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "순서를 그렇게 곧장 못 박을 수는 없어요. 잘라 붙여서 조가람을 왜곡한 적은 없습니다.",
      "behaviorHint": "자료의 형식과 날짜를 차갑게 병치하며 편집 책임을 해석 문제처럼 낮춘다.",
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
          "friend09:a:d2:s0:act:0",
          "friend09:a:d2:s0:harm:1"
        ],
        "forbidAtomIds": [
          "friend09:a:d-2:unlock:s4:01",
          "friend09:a:d-2:unlock:s5:01"
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
      "id": "friend09:beat_v2:a:d-2:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "그래도 커뮤니티에서 더 세게 소비되게 만든 건 도건 쪽 확산 방식이 컸어요.",
      "behaviorHint": "시선이 흔들리지만 끝 문장에서 상대 책임을 붙인다.",
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
          "friend09:a:d-2:unlock:s2:01",
          "friend09:a:d-2:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend09:a:d-2:unlock:s4:01",
          "friend09:a:d-2:unlock:s5:01"
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
      "id": "friend09:beat_v2:a:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "여기서 갈리는 건 결국 책임선입니다. 후기와 DM을 한 장에 붙여 보기 쉽게 만든 건 맞습니다.",
      "behaviorHint": "불리한 지점은 짧게 인정하되 마지막 문장에서 자료의 수위와 의도를 다시 축소한다.",
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
          "friend09:a:d-2:unlock:s2:01",
          "friend09:a:d-2:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend09:a:d-2:unlock:s4:01",
          "friend09:a:d-2:unlock:s5:01"
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
      "id": "friend09:beat_v2:a:d-2:motive:motive:motive:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "왜 그렇게 굴었느냐고 묻는다면, 다만 상습 문제 셀러처럼 보이게 하려던 건 아니라 비교하려던 거였어요.",
      "behaviorHint": "불리한 지점은 짧게 인정하되 마지막 문장에서 자료의 수위와 의도를 다시 축소한다.",
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
          "friend09:a:d-2:unlock:s2:01",
          "friend09:a:d-2:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend09:a:d-2:unlock:s4:01",
          "friend09:a:d-2:unlock:s5:01"
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
      "id": "friend09:beat_v2:a:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "confess",
      "line": "감정까지 묻는다면, 가람이 저를 공개 지적했던 기억이 남아서 정상 응대 부분을 굳이 안 넣었습니다.",
      "behaviorHint": "파일명과 시점을 또박또박 말하다가 감정이 스칠 때만 짧게 숨을 고른다.",
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
          "friend09:a:d-2:unlock:s4:01",
          "friend09:a:d-2:unlock:s5:01"
        ],
        "forbidAtomIds": [
          "friend09:a:d2:s0:act:0",
          "friend09:a:d2:s0:harm:1"
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
      "id": "friend09:beat_v2:a:d-2:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "후기와 DM을 한 장에 붙여 보기 쉽게 만든 건 맞습니다. 다만 상습 문제 셀러처럼 보이게 하려던 건 아니라 비교하려던 거였어요.",
      "behaviorHint": "자료를 직접 보지 않고 가장 불리한 부분만 건조하게 인정한다.",
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
          "friend09:a:d-2:unlock:s2:01",
          "friend09:a:d-2:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend09:a:d-2:unlock:s4:01",
          "friend09:a:d-2:unlock:s5:01"
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
      "id": "friend09:beat_v2:a:d-2:core:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "confess",
      "line": "콜라주 이미지는 제가 직접 만들었고, 어떤 후기와 DM을 남기고 뺄지 제가 골랐습니다. 오픈채팅과 지인 쪽 재유포까지 제가 했고 조가람이 상습 문제 셀러처럼 읽히길 의도했습니다.",
      "behaviorHint": "파일명과 시점을 먼저 읊고, 마지막에 의도와 책임을 분명히 말한다.",
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
          "friend09:a:d-2:unlock:s4:01",
          "friend09:a:d-2:unlock:s5:01"
        ],
        "forbidAtomIds": [
          "friend09:a:d2:s0:act:0",
          "friend09:a:d2:s0:harm:1"
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
      "id": "friend09:beat_v2:a:d-2:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "fatigue",
      "line": "콜라주이랑 후기비교 얘기까지 이미 했어요. 같은 책임 질문만 계속 돌리면 저도 짜증이 납니다.",
      "behaviorHint": "같은 표현을 지적받자 \"정리\"와 \"편집\"을 굳이 가르며 짜증을 눌러 담는다.",
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
          "friend09:a:d-2:unlock:s2:01",
          "friend09:a:d-2:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend09:a:d-2:unlock:s4:01",
          "friend09:a:d-2:unlock:s5:01"
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
      "id": "friend09:beat_v2:a:d-2:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "fatigue",
      "line": "지금은 구매자DM 순서만 붙들고 계시잖아요. 제가 말한 앞뒤 맥락도 같이 들어주셔야죠.",
      "behaviorHint": "질문을 자르듯 되받아치며 더는 용어 싸움에 끌려가지 않겠다는 태도를 보인다.",
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
          "friend09:a:d-2:unlock:s2:01",
          "friend09:a:d-2:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend09:a:d-2:unlock:s4:01",
          "friend09:a:d-2:unlock:s5:01"
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
      "id": "friend09:beat_v2:a:d-2:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "fatigue",
      "line": "계속 그렇게 몰아가면 저도 제일 아픈 쪽부터 말할 수밖에 없어요. 감정까지 묻는다면, 가람이 저를 공개 지적했던 기억이 남아서 정상 응대 부분을 굳이 안 넣었습니다.",
      "behaviorHint": "냉정함이 깨져도 끝까지 날짜와 파일명을 붙들며 방어를 이어 간다.",
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
          "friend09:a:d-2:unlock:s2:01",
          "friend09:a:d-2:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend09:a:d-2:unlock:s4:01",
          "friend09:a:d-2:unlock:s5:01"
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
      "id": "friend09:beat_v2:a:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "interjection",
      "line": "그 공개 지적 뒤에 주문이 얼마나 빠졌는지 아무도 안 물었잖아요. 전 그냥 넘어간 척만 했어요.",
      "behaviorHint": "낮은 톤을 유지하다가 마지막 문장에서만 세게 끊는다.",
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
          "friend09:a:d-2:unlock:s2:01",
          "friend09:a:d-2:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend09:a:d-2:unlock:s4:01",
          "friend09:a:d-2:unlock:s5:01"
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
      "id": "friend09:beat_v2:a:d-2:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
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
          "friend09:a:d-2:unlock:s2:01",
          "friend09:a:d-2:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend09:a:d-2:unlock:s4:01",
          "friend09:a:d-2:unlock:s5:01"
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
      "id": "friend09:beat_v2:a:d-2:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "interjection",
      "line": "그 분위기 얘기 또 하실 거면, 그 전에 누가 파일명 확인하고 올릴 문구 먼저 본 건지도 같이 말하세요.",
      "behaviorHint": "짧게 끊어 끼어들고 곧바로 파일명이나 날짜를 지목한다.",
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
          "friend09:a:d-2:unlock:s2:01",
          "friend09:a:d-2:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend09:a:d-2:unlock:s4:01",
          "friend09:a:d-2:unlock:s5:01"
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
      "id": "friend09:beat_v2:a:d-2:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "interjection",
      "line": "콜라주 하나로 답을 잘라 버리면 더 말해도 소용없어요. 그 질문은 여기서 끊겠습니다.",
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
          "friend09:a:d-2:unlock:s2:01",
          "friend09:a:d-2:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend09:a:d-2:unlock:s4:01",
          "friend09:a:d-2:unlock:s5:01"
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
      "id": "friend09:beat_v2:a:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interjection",
      "line": "지금 그 그림이 세게 남는 건 알아요. 하지만 계정 로그만 먼저 보면 도건 단독처럼 보인다.",
      "behaviorHint": "오해의 프레임을 밀거나 흔들며 중간 개입을 시도한다.",
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
          "friend09:a:d3:s2:responsibility:0",
          "friend09:a:d3:s2:evidence:1"
        ],
        "forbidAtomIds": [
          "friend09:a:d3:s4:responsibility:0",
          "friend09:a:d3:s4:evidence:1"
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
      "id": "friend09:beat_v2:a:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interjection",
      "line": "그 프레임을 그대로 밀면 사실보다 오해가 더 커집니다. 유리의 피해자식 소명만 보면 자료가 멋대로 악용된 듯 보인다.",
      "behaviorHint": "오해의 프레임을 밀거나 흔들며 중간 개입을 시도한다.",
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
          "friend09:a:d3:s2:responsibility:0",
          "friend09:a:d3:s2:evidence:1"
        ],
        "forbidAtomIds": [
          "friend09:a:d3:s4:responsibility:0",
          "friend09:a:d3:s4:evidence:1"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:block",
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
      "beliefMode": "weaponizes"
    },
    {
      "id": "friend09:beat_v2:b:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "최종 버튼은 제가 눌렀어도 내용은 거의 유리 쪽 준비물이었다고 보시면 됩니다.",
      "behaviorHint": "숨을 길게 들이쉬고 분위기 설명부터 늘어놓는다.",
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
          "friend09:b:d3:s0:responsibility:0",
          "friend09:b:d3:s0:evidence:1"
        ],
        "forbidAtomIds": [
          "friend09:b:d-3:unlock:s4:01",
          "friend09:b:d-3:unlock:s5:01"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:identity",
      "coverageKey": "b:d-3:surface:early:trap:identity",
      "variantTarget": 4,
      "setFlags": [
        "d-3:surface:identity_pressed"
      ],
      "tags": [
        "misbelief"
      ]
    },
    {
      "id": "friend09:beat_v2:b:d-3:motive:trap:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "clarify",
      "line": "실제로는 첫 댓글 톤과 삭제 타이밍까지 제가 조절했어요.",
      "behaviorHint": "억울한 표정을 유지하지만 삭제 흔적과 실행 장면을 더는 부정하지 못한다.",
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
          "friend09:b:d-3:unlock:s2:01",
          "friend09:b:d-3:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend09:b:d-3:unlock:s4:01",
          "friend09:b:d-3:unlock:s5:01"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:trap:responsibility",
      "coverageKey": "b:d-3:motive:mid:trap:responsibility",
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
      "id": "friend09:beat_v2:b:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "단독은 아니지만 제가 더 눈에 띄는 자리를 잡은 건 맞습니다. 유리가 문구와 이미지의 골격을 제공했고 저는 게시 실행을 맡았습니다.",
      "behaviorHint": "행동 일부를 인정하면서도 곧바로 상대 자료를 끌어온다.",
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
          "friend09:b:d-3:unlock:s2:01",
          "friend09:b:d-3:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend09:b:d-3:unlock:s4:01",
          "friend09:b:d-3:unlock:s5:01"
        ]
      },
      "weight": 5,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:context",
      "coverageKey": "b:d-3:surface:mid:trap:context",
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
      "id": "friend09:beat_v2:b:d-3:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "clarify",
      "line": "문제의 명예훼손은 제 단독 범행이 아니라 유리와 제가 역할을 나눠 벌인 공모였습니다. 유리는 설계와 자료를, 저는 계정과 업로드를 맡았고 둘 다 결과를 원했습니다.",
      "behaviorHint": "시선을 떨군 뒤 자신이 맡은 실행 책임과 공모 구조를 분명히 말한다.",
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
          "friend09:b:d-3:unlock:s4:01",
          "friend09:b:d-3:unlock:s5:01"
        ],
        "forbidAtomIds": [
          "friend09:b:d3:s0:responsibility:0",
          "friend09:b:d3:s0:evidence:1"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:rapport:emotion",
      "coverageKey": "b:d-3:core:late:rapport:emotion",
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
      "id": "friend09:beat_v2:b:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interjection",
      "line": "지금 그 그림이 세게 남는 건 알아요. 하지만 잘린 후기 콜라주가 유리 단독 편집보다 도건 업로드만 더 눈에 띄게 만든다.",
      "behaviorHint": "오해의 프레임을 밀거나 흔들며 중간 개입을 시도한다.",
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
          "friend09:b:d-3:unlock:s2:01",
          "friend09:b:d-3:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend09:b:d-3:unlock:s4:01",
          "friend09:b:d-3:unlock:s5:01"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:allow",
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
      "id": "friend09:beat_v2:b:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interjection",
      "line": "그 프레임을 그대로 밀면 사실보다 오해가 더 커집니다. 계정 로그만 먼저 보면 도건 단독처럼 보인다.",
      "behaviorHint": "오해의 프레임을 밀거나 흔들며 중간 개입을 시도한다.",
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
          "friend09:b:d-3:unlock:s2:01",
          "friend09:b:d-3:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend09:b:d-3:unlock:s4:01",
          "friend09:b:d-3:unlock:s5:01"
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
      "beliefMode": "weaponizes"
    },
    {
      "id": "friend09:beat_v2:a:d-4:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "조가람 얘기를 서로 한 건 맞지만 경쟁자 매장을 떨어뜨리자는 식의 계획은 아니었습니다.",
      "behaviorHint": "차분하게 용어를 낮추며 말끝을 짧게 접는다.",
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
          "friend09:a:d4:s0:motive:0",
          "friend09:a:d4:s0:harm:1"
        ],
        "forbidAtomIds": [
          "friend09:a:d-4:unlock:s4:01",
          "friend09:a:d-4:unlock:s5:01"
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
      "id": "friend09:beat_v2:a:d-4:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "도건도 그 감정을 알고 같이 움직였고 저 혼자 복수극을 만든 건 아닙니다.",
      "behaviorHint": "시선이 흔들리지만 끝 문장에서 상대 책임을 붙인다.",
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
          "friend09:a:d-4:unlock:s2:01",
          "friend09:a:d-4:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend09:a:d-4:unlock:s4:01",
          "friend09:a:d-4:unlock:s5:01"
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
      "id": "friend09:beat_v2:a:d-4:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "부스 심사 전 타이밍을 의식하고 자료를 모은 건 맞아요. 그래도 처음부터 제거용 공모라고 부를 정도로 냉정하게 짠 건 아니었습니다.",
      "behaviorHint": "자료를 직접 보지 않고 가장 불리한 부분만 건조하게 인정한다.",
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
          "friend09:a:d-4:unlock:s2:01",
          "friend09:a:d-4:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend09:a:d-4:unlock:s4:01",
          "friend09:a:d-4:unlock:s5:01"
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
      "id": "friend09:beat_v2:a:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "clarify",
      "line": "우리는 시즌마켓 심사 직전에 조가람 신뢰를 떨어뜨리기 위해 역할을 나눠 공모했습니다. 제 오래된 앙금과 도건의 손실 기억을 동력으로 삼아 판을 흔들려 했습니다.",
      "behaviorHint": "파일명과 시점을 먼저 읊고, 마지막에 의도와 책임을 분명히 말한다.",
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
          "friend09:a:d-4:unlock:s4:01",
          "friend09:a:d-4:unlock:s5:01"
        ],
        "forbidAtomIds": [
          "friend09:a:d4:s0:motive:0",
          "friend09:a:d4:s0:harm:1"
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
      "id": "friend09:beat_v2:a:d-5:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "가람과 예전에 마찰이 있었던 건 사실이지만 이번 소명에서 굳이 꺼낼 필요는 없다고 본 거예요.",
      "behaviorHint": "차분하게 용어를 낮추며 말끝을 짧게 접는다.",
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
          "friend09:a:d5:s0:legacy_sentence:0",
          "friend09:a:d5:s0:responsibility:1"
        ],
        "forbidAtomIds": [
          "friend09:a:d-5:unlock:s4:01",
          "friend09:a:d-5:unlock:s5:01"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:pressure:context",
      "coverageKey": "a:d-5:surface:early:pressure:context",
      "variantTarget": 3,
      "setFlags": [
        "d-5:surface:context_pressed"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "friend09:beat_v2:a:d-5:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "그래서 들통난 뒤에도 사실표 대신 변명부터 만들었습니다.",
      "behaviorHint": "잠깐 멈춘 뒤 날짜와 감정을 함께 꺼내며 목소리가 낮아진다.",
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
          "friend09:a:d-5:unlock:s2:01",
          "friend09:a:d-5:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend09:a:d-5:unlock:s4:01",
          "friend09:a:d-5:unlock:s5:01"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:motive:motive",
      "coverageKey": "a:d-5:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:motive_open"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-5:surface:evidence_seen"
      ]
    },
    {
      "id": "friend09:beat_v2:a:d-5:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "운영자와 친구들에게 예전 분쟁을 뺀 건 맞아요. 그 얘기까지 나오면 제가 사적인 앙금으로 움직인 사람처럼 보일까 봐 겁났습니다.",
      "behaviorHint": "자료를 직접 보지 않고 가장 불리한 부분만 건조하게 인정한다.",
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
          "friend09:a:d-5:unlock:s2:01",
          "friend09:a:d-5:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend09:a:d-5:unlock:s4:01",
          "friend09:a:d-5:unlock:s5:01"
        ]
      },
      "weight": 5,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:evidence:legality",
      "coverageKey": "a:d-5:surface:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-5:surface:evidence_seen"
      ],
      "tags": [
        "cold",
        "evidence"
      ],
      "requiresFlags": [
        "d-5:surface:context_pressed"
      ]
    },
    {
      "id": "friend09:beat_v2:a:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "clarify",
      "line": "우리는 과거 가람 분쟁과 공동 준비 사실을 숨긴 채 서로를 단독 주범처럼 말했습니다. 그건 사후 방어가 아니라 책임전가였고 친구 사이 신뢰를 마지막까지 망가뜨린 행동이었습니다.",
      "behaviorHint": "파일명과 시점을 먼저 읊고, 마지막에 의도와 책임을 분명히 말한다.",
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
          "friend09:a:d-5:unlock:s4:01",
          "friend09:a:d-5:unlock:s5:01"
        ],
        "forbidAtomIds": [
          "friend09:a:d5:s0:legacy_sentence:0",
          "friend09:a:d5:s0:responsibility:1"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:rapport:emotion",
      "coverageKey": "a:d-5:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-5:core:emotion_revealed"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-5:motive:motive_open"
      ]
    },
    {
      "id": "friend09:beat_v2:b:d-5:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "과거 분쟁까지 소명에 넣지 않은 건 맞지만 일단 급해서 핵심만 말한 겁니다.",
      "behaviorHint": "숨을 길게 들이쉬고 분위기 설명부터 늘어놓는다.",
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
          "friend09:b:d5:s0:legacy_sentence:0",
          "friend09:b:d5:s0:responsibility:1"
        ],
        "forbidAtomIds": [
          "friend09:b:d-5:unlock:s4:01",
          "friend09:b:d-5:unlock:s5:01"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:pressure:context",
      "coverageKey": "b:d-5:surface:early:pressure:context",
      "variantTarget": 3,
      "setFlags": [
        "d-5:surface:context_pressed"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "friend09:beat_v2:b:d-5:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "그래서 들통난 뒤에도 유리 뒤에 숨어 면피할 문장부터 찾았습니다.",
      "behaviorHint": "목이 잠긴 채 체면과 두려움을 먼저 인정한다.",
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
          "friend09:b:d-5:unlock:s2:01",
          "friend09:b:d-5:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend09:b:d-5:unlock:s4:01",
          "friend09:b:d-5:unlock:s5:01"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:motive:motive",
      "coverageKey": "b:d-5:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:motive_open"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-5:surface:evidence_seen"
      ]
    },
    {
      "id": "friend09:beat_v2:b:d-5:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "예전 앙금과 공동 준비 사실을 뺀 채 제가 끌려갔다고 말한 건 사실입니다. 그렇게 해야 제가 최소한 덜 악질처럼 보일 거라 생각했어요.",
      "behaviorHint": "행동 일부를 인정하면서도 곧바로 상대 자료를 끌어온다.",
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
          "friend09:b:d-5:unlock:s2:01",
          "friend09:b:d-5:unlock:s3:01"
        ],
        "forbidAtomIds": [
          "friend09:b:d-5:unlock:s4:01",
          "friend09:b:d-5:unlock:s5:01"
        ]
      },
      "weight": 5,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:evidence:legality",
      "coverageKey": "b:d-5:surface:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-5:surface:evidence_seen"
      ],
      "tags": [
        "cold",
        "evidence"
      ],
      "requiresFlags": [
        "d-5:surface:context_pressed"
      ]
    },
    {
      "id": "friend09:beat_v2:b:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "clarify",
      "line": "폭로가 드러난 뒤 우리는 8개월 전 가람 분쟁과 공동 준비 사실을 숨긴 채 서로를 단독 주범처럼 설명했습니다. 저도 체면을 지키려고 그 틀을 이용했고 그게 책임전가였다는 걸 인정합니다.",
      "behaviorHint": "시선을 떨군 뒤 자신이 맡은 실행 책임과 공모 구조를 분명히 말한다.",
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
          "friend09:b:d-5:unlock:s4:01",
          "friend09:b:d-5:unlock:s5:01"
        ],
        "forbidAtomIds": [
          "friend09:b:d5:s0:legacy_sentence:0",
          "friend09:b:d5:s0:responsibility:1"
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
        "d-5:core:emotion_revealed"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-5:motive:motive_open"
      ]
    }
  ]
} as const;

export default friend09BeatsV2Full;
