export const friend02BeatsV2Full = {
  "caseId": "friend-02",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 56,
    "byActionFamily": {
      "question": 26,
      "evidence": 6,
      "free_question": 6,
      "fatigue": 6,
      "interjection": 12
    },
    "byParty": {
      "b": 28,
      "a": 28
    },
    "byIssueRole": {
      "core_truth": 28,
      "shared_misconception": 16,
      "sub_truth": 12
    },
    "byDispute": {
      "d-1": 14,
      "d-2": 14,
      "d-3": 16,
      "d-4": 6,
      "d-5": 6
    },
    "interjectionBreakdown": {
      "emotional_only": 4,
      "detail_rebuttal": 4,
      "misbelief_escalation": 4
    }
  },
  "beats": [
    {
      "id": "friend02:beat_v2:b:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "박서후에게 가은 비밀을 넘겼다는 식의 표현은 과하다.",
      "behaviorHint": "'내가 중간에서 달래고 일정도 맞추고'처럼 자신이 감당한 수고를 길게 나열해 핵심 질문을 늦춘다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "timeline",
      "actionFamily": "question",
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
          "friend02:b:d-1:s0:0",
          "friend02:b:d-1:s0:1"
        ],
        "forbidAtomIds": [
          "friend02:b:d-1:s4:0",
          "friend02:b:d-1:s4:1"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:timeline",
      "coverageKey": "b:d-1:surface:early:pressure:timeline",
      "variantTarget": 6,
      "tags": [
        "hot",
        "timeline"
      ],
      "questionTypes": [
        "fact_pursuit"
      ],
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ]
    },
    {
      "id": "friend02:beat_v2:b:d-1:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "배신이라는 말 하나로만 묶이면 억울한 부분도 있다.",
      "behaviorHint": "'내가 중간에서 달래고 일정도 맞추고'처럼 자신이 감당한 수고를 길게 나열해 핵심 질문을 늦춘다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "identity",
      "actionFamily": "question",
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
          "friend02:b:d-1:s0:0",
          "friend02:b:d-1:s0:1"
        ],
        "forbidAtomIds": [
          "friend02:b:d-1:s4:0",
          "friend02:b:d-1:s4:1"
        ]
      },
      "weight": 6,
      "priority": 33,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:identity",
      "coverageKey": "b:d-1:surface:early:pressure:identity",
      "variantTarget": 6,
      "tags": [
        "hot",
        "identity"
      ],
      "questionTypes": [
        "fact_pursuit"
      ],
      "setFlags": [
        "d-1:surface:identity_pressed"
      ]
    },
    {
      "id": "friend02:beat_v2:b:d-1:motive:motive:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "음성메모와 요약 대화를 보낸 건 맞다.",
      "behaviorHint": "답하기 전 길게 숨을 멈추고 상처받은 표정을 만든 뒤 말을 잇는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "motive_response",
      "angleTag": "responsibility",
      "actionFamily": "question",
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
          "friend02:b:d-1:s2:0",
          "friend02:b:d-1:s2:1"
        ],
        "forbidAtomIds": [
          "friend02:b:d-1:s4:0",
          "friend02:b:d-1:s4:1"
        ]
      },
      "weight": 6,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:motive:responsibility",
      "coverageKey": "b:d-1:motive:mid:motive:responsibility",
      "variantTarget": 4,
      "tags": [
        "mid",
        "responsibility"
      ],
      "questionTypes": [
        "motive_search"
      ],
      "setFlags": [
        "d-1:motive:responsibility_opened"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ]
    },
    {
      "id": "friend02:beat_v2:b:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "justify",
      "line": "첫 전달과 이후 조작은 구분해서 봐야 한다.",
      "behaviorHint": "답하기 전 길게 숨을 멈추고 상처받은 표정을 만든 뒤 말을 잇는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "motive_response",
      "angleTag": "motive",
      "actionFamily": "question",
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
          "friend02:b:d-1:s2:0",
          "friend02:b:d-1:s2:1"
        ],
        "forbidAtomIds": [
          "friend02:b:d-1:s4:0",
          "friend02:b:d-1:s4:1"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:motive:motive",
      "coverageKey": "b:d-1:motive:mid:motive:motive",
      "variantTarget": 4,
      "tags": [
        "mid",
        "motive"
      ],
      "questionTypes": [
        "motive_search"
      ],
      "setFlags": [
        "d-1:motive:motive_opened"
      ],
      "requiresFlags": [
        "d-1:surface:identity_pressed"
      ]
    },
    {
      "id": "friend02:beat_v2:b:d-1:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "cornered",
      "line": "민재-박서후 메신저 포워드 내역 얘기가 나오면, 그때는 익명글까지 번질 줄은 정말 몰랐다.",
      "behaviorHint": "자신이 난처했던 시간을 길게 설명하며 먼저 상처 입은 사람의 자리를 잡는다",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "evidence_response",
      "angleTag": "legality",
      "actionFamily": "evidence",
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
          "friend02:b:d-1:s0:0",
          "friend02:b:d-1:s0:1"
        ],
        "forbidAtomIds": [
          "friend02:b:d-1:s4:0",
          "friend02:b:d-1:s4:1"
        ]
      },
      "weight": 5,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:evidence:legality",
      "coverageKey": "b:d-1:motive:early:evidence:legality",
      "variantTarget": 3,
      "tags": [
        "evidence",
        "early",
        "legality"
      ],
      "questionTypes": [
        "evidence_present"
      ],
      "setFlags": [
        "d-1:motive:evidence_seen"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ]
    },
    {
      "id": "friend02:beat_v2:b:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "솔직히 그날 나는 혼자 감당하지 못했다.",
      "behaviorHint": "비밀 유출을 묻으면 '망치려던 게 아니라 막으려던 거야'라고 도덕적 의도로 재포장한다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "question",
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
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend02:b:d-1:s4:0",
          "friend02:b:d-1:s4:1"
        ],
        "forbidAtomIds": [
          "friend02:b:d-1:s2:0",
          "friend02:b:d-1:s2:1"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:rapport:emotion",
      "coverageKey": "b:d-1:core:late:rapport:emotion",
      "variantTarget": 4,
      "tags": [
        "late",
        "emotion"
      ],
      "questionTypes": [
        "empathy_approach"
      ],
      "setFlags": [
        "d-1:core:emotion_exposed"
      ],
      "requiresFlags": [
        "d-1:motive:motive_opened"
      ]
    },
    {
      "id": "friend02:beat_v2:b:d-1:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "candid",
      "line": "직접 익명글을 쓰지 않았더라도 신뢰를 깬 출발점의 책임은 내가 진다.",
      "behaviorHint": "비밀 유출을 묻으면 '망치려던 게 아니라 막으려던 거야'라고 도덕적 의도로 재포장한다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "free_question",
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
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend02:b:d-1:s4:0",
          "friend02:b:d-1:s4:1"
        ],
        "forbidAtomIds": [
          "friend02:b:d-1:s2:0",
          "friend02:b:d-1:s2:1"
        ]
      },
      "weight": 4,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:rapport:emotion",
      "coverageKey": "b:d-1:core:late:rapport:emotion",
      "variantTarget": 2,
      "tags": [
        "free_question",
        "emotion"
      ],
      "questionTypes": [
        "empathy_approach"
      ],
      "setFlags": [
        "d-1:core:repair_named"
      ],
      "requiresFlags": [
        "d-1:core:emotion_exposed"
      ]
    },
    {
      "id": "friend02:beat_v2:b:d-1:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "irritated",
      "line": "그 얘기 아까도 말했잖아. 음성메모와 요약 대화를 보낸 건 맞다.",
      "behaviorHint": "목이 잠기고 문장 끝에서 숨을 삼킨다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "timeline",
      "actionFamily": "fatigue",
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
          "friend02:b:d-1:s2:0",
          "friend02:b:d-1:s2:1"
        ],
        "forbidAtomIds": [
          "friend02:b:d-1:s4:0",
          "friend02:b:d-1:s4:1"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:fatigue:timeline",
      "coverageKey": "b:d-1:surface:mid:fatigue:timeline",
      "variantTarget": 3,
      "tags": [
        "fatigue",
        "turn2"
      ],
      "setFlags": [
        "d-1:surface:fatigue_annoyed"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ]
    },
    {
      "id": "friend02:beat_v2:b:d-1:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "blocked",
      "line": "같은 데만 계속 찌르지 마. 내가 먼저 보낸 건 잘못이지만, 그걸 키우고 비틀어 퍼뜨린 건 다른 사람이었다.",
      "behaviorHint": "목이 잠기고 문장 끝에서 숨을 삼킨다.",
      "applicableStates": [
        "S3"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
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
          "friend02:b:d-1:s2:0",
          "friend02:b:d-1:s2:1"
        ],
        "forbidAtomIds": [
          "friend02:b:d-1:s4:0",
          "friend02:b:d-1:s4:1"
        ]
      },
      "weight": 5,
      "priority": 30,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:fatigue:responsibility",
      "coverageKey": "b:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "tags": [
        "fatigue",
        "turn3",
        "block"
      ],
      "setFlags": [
        "d-1:motive:fatigue_blocked"
      ],
      "requiresFlags": [
        "d-1:motive:responsibility_opened"
      ]
    },
    {
      "id": "friend02:beat_v2:b:d-1:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "counterattack",
      "line": "박민재: '제가 잘못 안 했다는 게 아니라, 제가 다 했다는 식으로는 못 버팁니다.'",
      "behaviorHint": "목이 잠기고 문장 끝에서 숨을 삼킨다.",
      "applicableStates": [
        "S3",
        "S4"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "timeline",
      "actionFamily": "fatigue",
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
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend02:b:d-1:s4:0",
          "friend02:b:d-1:s4:1"
        ],
        "forbidAtomIds": [
          "friend02:b:d-1:s2:0",
          "friend02:b:d-1:s2:1"
        ]
      },
      "weight": 5,
      "priority": 31,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:fatigue:timeline",
      "coverageKey": "b:d-1:motive:late:fatigue:timeline",
      "variantTarget": 3,
      "tags": [
        "fatigue",
        "high"
      ],
      "setFlags": [
        "d-1:motive:fatigue_countered"
      ],
      "requiresFlags": [
        "d-1:motive:evidence_seen"
      ]
    },
    {
      "id": "friend02:beat_v2:a:d-2:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "태블릿을 뒤졌다는 표현은 과하다.",
      "behaviorHint": "불리한 행동을 설명할 때 '본 건 확인이지 열람은 아니고'처럼 행위의 이름을 잘게 나눠 수위를 낮춘다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "timeline",
      "actionFamily": "question",
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
          "friend02:a:d-2:s0:0",
          "friend02:a:d-2:s0:1"
        ],
        "forbidAtomIds": [
          "friend02:a:d-2:s4:0",
          "friend02:a:d-2:s4:1"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:pressure:timeline",
      "coverageKey": "a:d-2:surface:early:pressure:timeline",
      "variantTarget": 6,
      "tags": [
        "hot",
        "timeline"
      ],
      "questionTypes": [
        "fact_pursuit"
      ],
      "setFlags": [
        "d-2:surface:timeline_pressed"
      ]
    },
    {
      "id": "friend02:beat_v2:a:d-2:surface:pressure:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "의도적으로 캐내려 한 행동으로만 보긴 어렵다.",
      "behaviorHint": "불리한 행동을 설명할 때 '본 건 확인이지 열람은 아니고'처럼 행위의 이름을 잘게 나눠 수위를 낮춘다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "legality",
      "actionFamily": "question",
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
          "friend02:a:d-2:s0:0",
          "friend02:a:d-2:s0:1"
        ],
        "forbidAtomIds": [
          "friend02:a:d-2:s4:0",
          "friend02:a:d-2:s4:1"
        ]
      },
      "weight": 6,
      "priority": 33,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:pressure:legality",
      "coverageKey": "a:d-2:surface:early:pressure:legality",
      "variantTarget": 6,
      "tags": [
        "hot",
        "legality"
      ],
      "questionTypes": [
        "fact_pursuit"
      ],
      "setFlags": [
        "d-2:surface:legality_pressed"
      ]
    },
    {
      "id": "friend02:beat_v2:a:d-2:motive:motive:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "채팅 목록을 잠깐 넘긴 건 맞다.",
      "behaviorHint": "상대가 한 말을 짧게 따옴표처럼 반복하며 자신의 해석이 아니라 상대 표현이라는 인상을 만든다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "motive_response",
      "angleTag": "responsibility",
      "actionFamily": "question",
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
          "friend02:a:d-2:s2:0",
          "friend02:a:d-2:s2:1"
        ],
        "forbidAtomIds": [
          "friend02:a:d-2:s4:0",
          "friend02:a:d-2:s4:1"
        ]
      },
      "weight": 6,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:motive:responsibility",
      "coverageKey": "a:d-2:motive:mid:motive:responsibility",
      "variantTarget": 4,
      "tags": [
        "mid",
        "responsibility"
      ],
      "questionTypes": [
        "motive_search"
      ],
      "setFlags": [
        "d-2:motive:responsibility_opened"
      ],
      "requiresFlags": [
        "d-2:surface:timeline_pressed"
      ]
    },
    {
      "id": "friend02:beat_v2:a:d-2:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "justify",
      "line": "내 스토리는 공격이라기보다 그 배신에 대한 반응이었다.",
      "behaviorHint": "상대가 한 말을 짧게 따옴표처럼 반복하며 자신의 해석이 아니라 상대 표현이라는 인상을 만든다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "motive_response",
      "angleTag": "motive",
      "actionFamily": "question",
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
          "friend02:a:d-2:s2:0",
          "friend02:a:d-2:s2:1"
        ],
        "forbidAtomIds": [
          "friend02:a:d-2:s4:0",
          "friend02:a:d-2:s4:1"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:motive:motive",
      "coverageKey": "a:d-2:motive:mid:motive:motive",
      "variantTarget": 4,
      "tags": [
        "mid",
        "motive"
      ],
      "questionTypes": [
        "motive_search"
      ],
      "setFlags": [
        "d-2:motive:motive_opened"
      ],
      "requiresFlags": [
        "d-2:surface:legality_pressed"
      ]
    },
    {
      "id": "friend02:beat_v2:a:d-2:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "cornered",
      "line": "가은의 인스타 친한친구 스토리 보관본 얘기가 나오면, 그때는 이미 내 비밀이 밖으로 샌다고 확신하고 있었다.",
      "behaviorHint": "말을 할 때 추정과 확인 사실을 분리하려 애쓴다",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "evidence_response",
      "angleTag": "identity",
      "actionFamily": "evidence",
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
          "friend02:a:d-2:s2:0",
          "friend02:a:d-2:s2:1"
        ],
        "forbidAtomIds": [
          "friend02:a:d-2:s4:0",
          "friend02:a:d-2:s4:1"
        ]
      },
      "weight": 5,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:evidence:identity",
      "coverageKey": "a:d-2:motive:mid:evidence:identity",
      "variantTarget": 3,
      "tags": [
        "evidence",
        "mid",
        "identity"
      ],
      "questionTypes": [
        "evidence_present"
      ],
      "setFlags": [
        "d-2:motive:evidence_seen"
      ],
      "requiresFlags": [
        "d-2:surface:timeline_pressed"
      ]
    },
    {
      "id": "friend02:beat_v2:a:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "배신감 때문에 멈추지 못했고, 그래서 확인도 하고 바로 스토리도 올렸다.",
      "behaviorHint": "감정이 올라오면 목소리를 오히려 낮추고 단어 사이 간격을 길게 둔다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "question",
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
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend02:a:d-2:s4:0",
          "friend02:a:d-2:s4:1"
        ],
        "forbidAtomIds": [
          "friend02:a:d-2:s2:0",
          "friend02:a:d-2:s2:1"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:core:rapport:emotion",
      "coverageKey": "a:d-2:core:late:rapport:emotion",
      "variantTarget": 4,
      "tags": [
        "late",
        "emotion"
      ],
      "questionTypes": [
        "empathy_approach"
      ],
      "setFlags": [
        "d-2:core:emotion_exposed"
      ],
      "requiresFlags": [
        "d-2:motive:motive_opened"
      ]
    },
    {
      "id": "friend02:beat_v2:a:d-2:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "candid",
      "line": "배신감을 이유로 디지털 경계를 무너뜨린 책임은 내가 진다.",
      "behaviorHint": "감정이 올라오면 목소리를 오히려 낮추고 단어 사이 간격을 길게 둔다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "free_question",
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
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend02:a:d-2:s4:0",
          "friend02:a:d-2:s4:1"
        ],
        "forbidAtomIds": [
          "friend02:a:d-2:s2:0",
          "friend02:a:d-2:s2:1"
        ]
      },
      "weight": 4,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:core:rapport:emotion",
      "coverageKey": "a:d-2:core:late:rapport:emotion",
      "variantTarget": 2,
      "tags": [
        "free_question",
        "emotion"
      ],
      "questionTypes": [
        "empathy_approach"
      ],
      "setFlags": [
        "d-2:core:repair_named"
      ],
      "requiresFlags": [
        "d-2:core:emotion_exposed"
      ]
    },
    {
      "id": "friend02:beat_v2:a:d-2:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "irritated",
      "line": "그 얘기 아까도 말했잖아. 채팅 목록을 잠깐 넘긴 건 맞다.",
      "behaviorHint": "볼륨은 낮아지는데 단어 사이 간격이 길어지고 시선은 흔들리지 않는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "timeline",
      "actionFamily": "fatigue",
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
          "friend02:a:d-2:s2:0",
          "friend02:a:d-2:s2:1"
        ],
        "forbidAtomIds": [
          "friend02:a:d-2:s4:0",
          "friend02:a:d-2:s4:1"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:fatigue:timeline",
      "coverageKey": "a:d-2:surface:mid:fatigue:timeline",
      "variantTarget": 3,
      "tags": [
        "fatigue",
        "turn2"
      ],
      "setFlags": [
        "d-2:surface:fatigue_annoyed"
      ],
      "requiresFlags": [
        "d-2:surface:timeline_pressed"
      ]
    },
    {
      "id": "friend02:beat_v2:a:d-2:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "blocked",
      "line": "같은 데만 계속 찌르지 마. 먼저 선을 넘은 건 민재 쪽이라고 판단했다.",
      "behaviorHint": "볼륨은 낮아지는데 단어 사이 간격이 길어지고 시선은 흔들리지 않는다.",
      "applicableStates": [
        "S3"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
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
          "friend02:a:d-2:s2:0",
          "friend02:a:d-2:s2:1"
        ],
        "forbidAtomIds": [
          "friend02:a:d-2:s4:0",
          "friend02:a:d-2:s4:1"
        ]
      },
      "weight": 5,
      "priority": 30,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:fatigue:responsibility",
      "coverageKey": "a:d-2:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "tags": [
        "fatigue",
        "turn3",
        "block"
      ],
      "setFlags": [
        "d-2:motive:fatigue_blocked"
      ],
      "requiresFlags": [
        "d-2:motive:responsibility_opened"
      ]
    },
    {
      "id": "friend02:beat_v2:a:d-2:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "counterattack",
      "line": "윤가은: '조언이면 내 이름과 목소리가 왜 남의 손에 가 있죠. 그건 배려가 아니라 선택이잖아요.'",
      "behaviorHint": "볼륨은 낮아지는데 단어 사이 간격이 길어지고 시선은 흔들리지 않는다.",
      "applicableStates": [
        "S3",
        "S4"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "timeline",
      "actionFamily": "fatigue",
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
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend02:a:d-2:s4:0",
          "friend02:a:d-2:s4:1"
        ],
        "forbidAtomIds": [
          "friend02:a:d-2:s2:0",
          "friend02:a:d-2:s2:1"
        ]
      },
      "weight": 5,
      "priority": 31,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:fatigue:timeline",
      "coverageKey": "a:d-2:motive:late:fatigue:timeline",
      "variantTarget": 3,
      "tags": [
        "fatigue",
        "high"
      ],
      "setFlags": [
        "d-2:motive:fatigue_countered"
      ],
      "requiresFlags": [
        "d-2:motive:evidence_seen"
      ]
    },
    {
      "id": "friend02:beat_v2:a:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confused",
      "line": "표현과 타이밍, 내용 범위가 다 민재 쪽과 겹쳤다.",
      "behaviorHint": "불리한 행동을 설명할 때 '본 건 확인이지 열람은 아니고'처럼 행위의 이름을 잘게 나눠 수위를 낮춘다.",
      "applicableStates": [
        "M0",
        "M1"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "identity",
      "actionFamily": "question",
      "conditions": {
        "emotionTiers": [
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
          "friend02:a:d-3:s0:0",
          "friend02:a:d-3:s0:1"
        ],
        "forbidAtomIds": [
          "friend02:a:d-3:s4:0",
          "friend02:a:d-3:s4:1"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:identity",
      "coverageKey": "a:d-3:surface:early:trap:identity",
      "variantTarget": 4,
      "tags": [
        "misbelief",
        "identity"
      ],
      "questionTypes": [
        "fact_pursuit"
      ],
      "setFlags": [
        "d-3:surface:identity_pressed"
      ]
    },
    {
      "id": "friend02:beat_v2:a:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "mistaken",
      "line": "그래도 그 당시엔 민재 외의 가능성이 거의 보이지 않았다.",
      "behaviorHint": "상대가 한 말을 짧게 따옴표처럼 반복하며 자신의 해석이 아니라 상대 표현이라는 인상을 만든다.",
      "applicableStates": [
        "M1",
        "M2"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "question",
      "conditions": {
        "emotionTiers": [
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
          "friend02:a:d-3:s0:0",
          "friend02:a:d-3:s0:1"
        ],
        "forbidAtomIds": [
          "friend02:a:d-3:s4:0",
          "friend02:a:d-3:s4:1"
        ]
      },
      "weight": 6,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:context",
      "coverageKey": "a:d-3:surface:early:trap:context",
      "variantTarget": 4,
      "tags": [
        "misbelief",
        "context"
      ],
      "questionTypes": [
        "fact_pursuit"
      ],
      "setFlags": [
        "d-3:surface:context_pressed"
      ]
    },
    {
      "id": "friend02:beat_v2:a:d-3:motive:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "stuck",
      "line": "캡처만으로 단정이 완벽하진 않다는 것도 알고 있었다.",
      "behaviorHint": "상대가 한 말을 짧게 따옴표처럼 반복하며 자신의 해석이 아니라 상대 표현이라는 인상을 만든다.",
      "applicableStates": [
        "M2",
        "M3"
      ],
      "layer": "motive",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "question",
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
          "friend02:a:d-3:s2:0",
          "friend02:a:d-3:s2:1"
        ],
        "forbidAtomIds": [
          "friend02:a:d-3:s4:0",
          "friend02:a:d-3:s4:1"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:trap:context",
      "coverageKey": "a:d-3:motive:mid:trap:context",
      "variantTarget": 4,
      "tags": [
        "misbelief",
        "mid"
      ],
      "questionTypes": [
        "motive_search"
      ],
      "setFlags": [
        "d-3:motive:misbelief_opened"
      ],
      "requiresFlags": [
        "d-3:surface:identity_pressed"
      ]
    },
    {
      "id": "friend02:beat_v2:a:d-3:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "reframe",
      "line": "온라인 커뮤니티 익명 폭로글과 댓글 캡처 얘기가 나오면, 그래도 나는 민재가 직접 작성했다고 믿을 근거가 충분하다고 여겼다.",
      "behaviorHint": "말을 할 때 추정과 확인 사실을 분리하려 애쓴다",
      "applicableStates": [
        "M2",
        "M3"
      ],
      "layer": "motive",
      "issueRole": "shared_misconception",
      "responseIntent": "evidence_response",
      "angleTag": "identity",
      "actionFamily": "evidence",
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
          "friend02:a:d-3:s2:0",
          "friend02:a:d-3:s2:1"
        ],
        "forbidAtomIds": [
          "friend02:a:d-3:s4:0",
          "friend02:a:d-3:s4:1"
        ]
      },
      "weight": 5,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:evidence:identity",
      "coverageKey": "a:d-3:motive:mid:evidence:identity",
      "variantTarget": 3,
      "tags": [
        "evidence",
        "misbelief",
        "identity"
      ],
      "questionTypes": [
        "evidence_present"
      ],
      "setFlags": [
        "d-3:motive:evidence_seen"
      ],
      "requiresFlags": [
        "d-3:surface:context_pressed"
      ]
    },
    {
      "id": "friend02:beat_v2:a:d-3:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "wavering",
      "line": "솔직히 누군가를 바로 지목하고 싶었다.",
      "behaviorHint": "감정이 올라오면 목소리를 오히려 낮추고 단어 사이 간격을 길게 둔다.",
      "applicableStates": [
        "M3",
        "M4"
      ],
      "layer": "core",
      "issueRole": "shared_misconception",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "question",
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
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend02:a:d-3:s4:0",
          "friend02:a:d-3:s4:1"
        ],
        "forbidAtomIds": [
          "friend02:a:d-3:s2:0",
          "friend02:a:d-3:s2:1"
        ]
      },
      "weight": 4,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:rapport:emotion",
      "coverageKey": "a:d-3:core:late:rapport:emotion",
      "variantTarget": 3,
      "tags": [
        "late",
        "emotion",
        "misbelief"
      ],
      "questionTypes": [
        "empathy_approach"
      ],
      "setFlags": [
        "d-3:core:emotion_exposed"
      ],
      "requiresFlags": [
        "d-3:motive:misbelief_opened"
      ]
    },
    {
      "id": "friend02:beat_v2:a:d-3:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "clarifying",
      "line": "나는 배신의 출발점과 실제 작성자를 같은 사람으로 섞어 판단했다.",
      "behaviorHint": "감정이 올라오면 목소리를 오히려 낮추고 단어 사이 간격을 길게 둔다.",
      "applicableStates": [
        "M4"
      ],
      "layer": "core",
      "issueRole": "shared_misconception",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "free_question",
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
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend02:a:d-3:s4:0",
          "friend02:a:d-3:s4:1"
        ],
        "forbidAtomIds": [
          "friend02:a:d-3:s2:0",
          "friend02:a:d-3:s2:1"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:rapport:emotion",
      "coverageKey": "a:d-3:core:late:rapport:emotion",
      "variantTarget": 2,
      "tags": [
        "free_question",
        "emotion",
        "misbelief"
      ],
      "questionTypes": [
        "empathy_approach"
      ],
      "setFlags": [
        "d-3:core:clarity_named"
      ],
      "requiresFlags": [
        "d-3:core:emotion_exposed"
      ]
    },
    {
      "id": "friend02:beat_v2:b:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confused",
      "line": "그 익명글과 댓글을 내가 직접 썼다는 건 아니다.",
      "behaviorHint": "'내가 중간에서 달래고 일정도 맞추고'처럼 자신이 감당한 수고를 길게 나열해 핵심 질문을 늦춘다.",
      "applicableStates": [
        "M0",
        "M1"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "identity",
      "actionFamily": "question",
      "conditions": {
        "emotionTiers": [
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
          "friend02:b:d-3:s0:0",
          "friend02:b:d-3:s0:1"
        ],
        "forbidAtomIds": [
          "friend02:b:d-3:s4:0",
          "friend02:b:d-3:s4:1"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:identity",
      "coverageKey": "b:d-3:surface:early:trap:identity",
      "variantTarget": 4,
      "tags": [
        "misbelief",
        "identity"
      ],
      "questionTypes": [
        "fact_pursuit"
      ],
      "setFlags": [
        "d-3:surface:identity_pressed"
      ]
    },
    {
      "id": "friend02:beat_v2:b:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "mistaken",
      "line": "그래도 직접 작성자까지 나로 고정하는 건 억울하다.",
      "behaviorHint": "답하기 전 길게 숨을 멈추고 상처받은 표정을 만든 뒤 말을 잇는다.",
      "applicableStates": [
        "M1",
        "M2"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "question",
      "conditions": {
        "emotionTiers": [
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
          "friend02:b:d-3:s0:0",
          "friend02:b:d-3:s0:1"
        ],
        "forbidAtomIds": [
          "friend02:b:d-3:s4:0",
          "friend02:b:d-3:s4:1"
        ]
      },
      "weight": 6,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:context",
      "coverageKey": "b:d-3:surface:early:trap:context",
      "variantTarget": 4,
      "tags": [
        "misbelief",
        "context"
      ],
      "questionTypes": [
        "fact_pursuit"
      ],
      "setFlags": [
        "d-3:surface:context_pressed"
      ]
    },
    {
      "id": "friend02:beat_v2:b:d-3:motive:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "stuck",
      "line": "익명글과 댓글을 내가 입력한 건 아니다.",
      "behaviorHint": "답하기 전 길게 숨을 멈추고 상처받은 표정을 만든 뒤 말을 잇는다.",
      "applicableStates": [
        "M2",
        "M3"
      ],
      "layer": "motive",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "question",
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
          "friend02:b:d-3:s2:0",
          "friend02:b:d-3:s2:1"
        ],
        "forbidAtomIds": [
          "friend02:b:d-3:s4:0",
          "friend02:b:d-3:s4:1"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:trap:context",
      "coverageKey": "b:d-3:motive:mid:trap:context",
      "variantTarget": 4,
      "tags": [
        "misbelief",
        "mid"
      ],
      "questionTypes": [
        "motive_search"
      ],
      "setFlags": [
        "d-3:motive:misbelief_opened"
      ],
      "requiresFlags": [
        "d-3:surface:identity_pressed"
      ]
    },
    {
      "id": "friend02:beat_v2:b:d-3:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "reframe",
      "line": "온라인 커뮤니티 익명 폭로글과 댓글 캡처 얘기가 나오면, 다만 내 쪽에서 흘러간 말이 재료가 됐을 수는 있다.",
      "behaviorHint": "자신이 난처했던 시간을 길게 설명하며 먼저 상처 입은 사람의 자리를 잡는다",
      "applicableStates": [
        "M2",
        "M3"
      ],
      "layer": "motive",
      "issueRole": "shared_misconception",
      "responseIntent": "evidence_response",
      "angleTag": "identity",
      "actionFamily": "evidence",
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
          "friend02:b:d-3:s2:0",
          "friend02:b:d-3:s2:1"
        ],
        "forbidAtomIds": [
          "friend02:b:d-3:s4:0",
          "friend02:b:d-3:s4:1"
        ]
      },
      "weight": 5,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:evidence:identity",
      "coverageKey": "b:d-3:motive:mid:evidence:identity",
      "variantTarget": 3,
      "tags": [
        "evidence",
        "misbelief",
        "identity"
      ],
      "questionTypes": [
        "evidence_present"
      ],
      "setFlags": [
        "d-3:motive:evidence_seen"
      ],
      "requiresFlags": [
        "d-3:surface:context_pressed"
      ]
    },
    {
      "id": "friend02:beat_v2:b:d-3:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "wavering",
      "line": "그때 바로 아니라고 세게 끊지 못한 건, 자료를 넘긴 사실까지 드러날까 봐 겁났기 때문이다.",
      "behaviorHint": "비밀 유출을 묻으면 '망치려던 게 아니라 막으려던 거야'라고 도덕적 의도로 재포장한다.",
      "applicableStates": [
        "M3",
        "M4"
      ],
      "layer": "core",
      "issueRole": "shared_misconception",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "question",
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
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend02:b:d-3:s4:0",
          "friend02:b:d-3:s4:1"
        ],
        "forbidAtomIds": [
          "friend02:b:d-3:s2:0",
          "friend02:b:d-3:s2:1"
        ]
      },
      "weight": 4,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:rapport:emotion",
      "coverageKey": "b:d-3:core:late:rapport:emotion",
      "variantTarget": 3,
      "tags": [
        "late",
        "emotion",
        "misbelief"
      ],
      "questionTypes": [
        "empathy_approach"
      ],
      "setFlags": [
        "d-3:core:emotion_exposed"
      ],
      "requiresFlags": [
        "d-3:motive:misbelief_opened"
      ]
    },
    {
      "id": "friend02:beat_v2:b:d-3:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "clarifying",
      "line": "작성자가 아니어도 의심이 나에게 굳도록 만든 책임은 인정한다.",
      "behaviorHint": "비밀 유출을 묻으면 '망치려던 게 아니라 막으려던 거야'라고 도덕적 의도로 재포장한다.",
      "applicableStates": [
        "M4"
      ],
      "layer": "core",
      "issueRole": "shared_misconception",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "free_question",
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
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend02:b:d-3:s4:0",
          "friend02:b:d-3:s4:1"
        ],
        "forbidAtomIds": [
          "friend02:b:d-3:s2:0",
          "friend02:b:d-3:s2:1"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:rapport:emotion",
      "coverageKey": "b:d-3:core:late:rapport:emotion",
      "variantTarget": 2,
      "tags": [
        "free_question",
        "emotion",
        "misbelief"
      ],
      "questionTypes": [
        "empathy_approach"
      ],
      "setFlags": [
        "d-3:core:clarity_named"
      ],
      "requiresFlags": [
        "d-3:core:emotion_exposed"
      ]
    },
    {
      "id": "friend02:beat_v2:b:d-4:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "박서후를 바로 배후라고 찍는 건 너무 간다고 생각했다.",
      "behaviorHint": "'내가 중간에서 달래고 일정도 맞추고'처럼 자신이 감당한 수고를 길게 나열해 핵심 질문을 늦춘다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "timeline",
      "actionFamily": "question",
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
          "friend02:b:d-4:s0:0",
          "friend02:b:d-4:s0:1"
        ],
        "forbidAtomIds": [
          "friend02:b:d-4:s4:0",
          "friend02:b:d-4:s4:1"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:surface:pressure:timeline",
      "coverageKey": "b:d-4:surface:early:pressure:timeline",
      "variantTarget": 5,
      "tags": [
        "hot",
        "timeline"
      ],
      "questionTypes": [
        "fact_pursuit"
      ],
      "setFlags": [
        "d-4:surface:timeline_pressed"
      ]
    },
    {
      "id": "friend02:beat_v2:b:d-4:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "counter",
      "line": "이름을 찍어 말하면 일이 더 커질까 봐 피하고 있었다.",
      "behaviorHint": "'내가 중간에서 달래고 일정도 맞추고'처럼 자신이 감당한 수고를 길게 나열해 핵심 질문을 늦춘다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "identity",
      "actionFamily": "question",
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
          "friend02:b:d-4:s0:0",
          "friend02:b:d-4:s0:1"
        ],
        "forbidAtomIds": [
          "friend02:b:d-4:s4:0",
          "friend02:b:d-4:s4:1"
        ]
      },
      "weight": 6,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:surface:pressure:identity",
      "coverageKey": "b:d-4:surface:early:pressure:identity",
      "variantTarget": 5,
      "tags": [
        "hot",
        "identity"
      ],
      "questionTypes": [
        "fact_pursuit"
      ],
      "setFlags": [
        "d-4:surface:identity_pressed"
      ]
    },
    {
      "id": "friend02:beat_v2:b:d-4:motive:motive:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "내가 넘긴 뒤 박서후가 자료를 더 들여다본 건 맞다.",
      "behaviorHint": "답하기 전 길게 숨을 멈추고 상처받은 표정을 만든 뒤 말을 잇는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "sub_truth",
      "responseIntent": "motive_response",
      "angleTag": "responsibility",
      "actionFamily": "question",
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
          "friend02:b:d-4:s2:0",
          "friend02:b:d-4:s2:1"
        ],
        "forbidAtomIds": [
          "friend02:b:d-4:s4:0",
          "friend02:b:d-4:s4:1"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:motive:motive:responsibility",
      "coverageKey": "b:d-4:motive:mid:motive:responsibility",
      "variantTarget": 4,
      "tags": [
        "mid",
        "responsibility"
      ],
      "questionTypes": [
        "motive_search"
      ],
      "setFlags": [
        "d-4:motive:responsibility_opened"
      ],
      "requiresFlags": [
        "d-4:surface:timeline_pressed"
      ]
    },
    {
      "id": "friend02:beat_v2:b:d-4:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "reframe",
      "line": "온라인 커뮤니티 운영자 보존로그와 보조계정 복구정보 얘기가 나오면, 그때 나는 그걸 단순 중재로 믿으려 했다.",
      "behaviorHint": "자신이 난처했던 시간을 길게 설명하며 먼저 상처 입은 사람의 자리를 잡는다",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "sub_truth",
      "responseIntent": "evidence_response",
      "angleTag": "context",
      "actionFamily": "evidence",
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
          "friend02:b:d-4:s2:0",
          "friend02:b:d-4:s2:1"
        ],
        "forbidAtomIds": [
          "friend02:b:d-4:s4:0",
          "friend02:b:d-4:s4:1"
        ]
      },
      "weight": 5,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:motive:evidence:context",
      "coverageKey": "b:d-4:motive:mid:evidence:context",
      "variantTarget": 3,
      "tags": [
        "evidence",
        "context"
      ],
      "questionTypes": [
        "evidence_present"
      ],
      "setFlags": [
        "d-4:motive:evidence_seen"
      ],
      "requiresFlags": [
        "d-4:surface:identity_pressed"
      ]
    },
    {
      "id": "friend02:beat_v2:b:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "emotional",
      "line": "내가 먼저 자료를 넘긴 탓에, 박서후 이름까지 나오면 전부 내 탓이 될까 봐 숨겼다.",
      "behaviorHint": "비밀 유출을 묻으면 '망치려던 게 아니라 막으려던 거야'라고 도덕적 의도로 재포장한다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "sub_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "question",
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
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend02:b:d-4:s4:0",
          "friend02:b:d-4:s4:1"
        ],
        "forbidAtomIds": [
          "friend02:b:d-4:s2:0",
          "friend02:b:d-4:s2:1"
        ]
      },
      "weight": 4,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:core:rapport:emotion",
      "coverageKey": "b:d-4:core:late:rapport:emotion",
      "variantTarget": 3,
      "tags": [
        "late",
        "emotion"
      ],
      "questionTypes": [
        "empathy_approach"
      ],
      "setFlags": [
        "d-4:core:emotion_exposed"
      ],
      "requiresFlags": [
        "d-4:motive:responsibility_opened"
      ]
    },
    {
      "id": "friend02:beat_v2:b:d-4:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "candid",
      "line": "그 이름을 늦게 숨기고 버틴 책임까지 포함해 내가 말하겠다.",
      "behaviorHint": "비밀 유출을 묻으면 '망치려던 게 아니라 막으려던 거야'라고 도덕적 의도로 재포장한다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "sub_truth",
      "responseIntent": "motive_response",
      "angleTag": "motive",
      "actionFamily": "free_question",
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
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend02:b:d-4:s4:0",
          "friend02:b:d-4:s4:1"
        ],
        "forbidAtomIds": [
          "friend02:b:d-4:s2:0",
          "friend02:b:d-4:s2:1"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:core:motive:motive",
      "coverageKey": "b:d-4:core:late:motive:motive",
      "variantTarget": 2,
      "tags": [
        "free_question",
        "motive"
      ],
      "questionTypes": [
        "motive_search"
      ],
      "setFlags": [
        "d-4:core:repair_named"
      ],
      "requiresFlags": [
        "d-4:core:emotion_exposed"
      ]
    },
    {
      "id": "friend02:beat_v2:a:d-5:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "약속을 먼저 깬 건 민재 쪽이라고 본다.",
      "behaviorHint": "불리한 행동을 설명할 때 '본 건 확인이지 열람은 아니고'처럼 행위의 이름을 잘게 나눠 수위를 낮춘다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "timeline",
      "actionFamily": "question",
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
          "friend02:a:d-5:s0:0",
          "friend02:a:d-5:s0:1"
        ],
        "forbidAtomIds": [
          "friend02:a:d-5:s4:0",
          "friend02:a:d-5:s4:1"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:pressure:timeline",
      "coverageKey": "a:d-5:surface:early:pressure:timeline",
      "variantTarget": 5,
      "tags": [
        "hot",
        "timeline"
      ],
      "questionTypes": [
        "fact_pursuit"
      ],
      "setFlags": [
        "d-5:surface:timeline_pressed"
      ]
    },
    {
      "id": "friend02:beat_v2:a:d-5:surface:pressure:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "counter",
      "line": "그래도 제3자에게 비밀을 넘긴 것과는 같은 무게가 아니라고 생각했다.",
      "behaviorHint": "불리한 행동을 설명할 때 '본 건 확인이지 열람은 아니고'처럼 행위의 이름을 잘게 나눠 수위를 낮춘다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "legality",
      "actionFamily": "question",
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
          "friend02:a:d-5:s0:0",
          "friend02:a:d-5:s0:1"
        ],
        "forbidAtomIds": [
          "friend02:a:d-5:s4:0",
          "friend02:a:d-5:s4:1"
        ]
      },
      "weight": 6,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:pressure:legality",
      "coverageKey": "a:d-5:surface:early:pressure:legality",
      "variantTarget": 5,
      "tags": [
        "hot",
        "legality"
      ],
      "questionTypes": [
        "fact_pursuit"
      ],
      "setFlags": [
        "d-5:surface:legality_pressed"
      ]
    },
    {
      "id": "friend02:beat_v2:a:d-5:motive:motive:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "이름을 쓰지 않았어도 지목성은 있었다.",
      "behaviorHint": "상대가 한 말을 짧게 따옴표처럼 반복하며 자신의 해석이 아니라 상대 표현이라는 인상을 만든다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "sub_truth",
      "responseIntent": "motive_response",
      "angleTag": "responsibility",
      "actionFamily": "question",
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
          "friend02:a:d-5:s2:0",
          "friend02:a:d-5:s2:1"
        ],
        "forbidAtomIds": [
          "friend02:a:d-5:s4:0",
          "friend02:a:d-5:s4:1"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:motive:responsibility",
      "coverageKey": "a:d-5:motive:mid:motive:responsibility",
      "variantTarget": 4,
      "tags": [
        "mid",
        "responsibility"
      ],
      "questionTypes": [
        "motive_search"
      ],
      "setFlags": [
        "d-5:motive:responsibility_opened"
      ],
      "requiresFlags": [
        "d-5:surface:timeline_pressed"
      ]
    },
    {
      "id": "friend02:beat_v2:a:d-5:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "reframe",
      "line": "민재-박서후 메신저 포워드 내역 얘기가 나오면, 약속 취지로만 보면 내 쪽도 완전히 깨끗하진 않다.",
      "behaviorHint": "말을 할 때 추정과 확인 사실을 분리하려 애쓴다",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "sub_truth",
      "responseIntent": "evidence_response",
      "angleTag": "context",
      "actionFamily": "evidence",
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
          "friend02:a:d-5:s2:0",
          "friend02:a:d-5:s2:1"
        ],
        "forbidAtomIds": [
          "friend02:a:d-5:s4:0",
          "friend02:a:d-5:s4:1"
        ]
      },
      "weight": 5,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:evidence:context",
      "coverageKey": "a:d-5:motive:mid:evidence:context",
      "variantTarget": 3,
      "tags": [
        "evidence",
        "context"
      ],
      "questionTypes": [
        "evidence_present"
      ],
      "setFlags": [
        "d-5:motive:evidence_seen"
      ],
      "requiresFlags": [
        "d-5:surface:legality_pressed"
      ]
    },
    {
      "id": "friend02:beat_v2:a:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "emotional",
      "line": "맞다, 나도 약속을 붙잡지 못했다.",
      "behaviorHint": "감정이 올라오면 목소리를 오히려 낮추고 단어 사이 간격을 길게 둔다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "sub_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "question",
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
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend02:a:d-5:s4:0",
          "friend02:a:d-5:s4:1"
        ],
        "forbidAtomIds": [
          "friend02:a:d-5:s2:0",
          "friend02:a:d-5:s2:1"
        ]
      },
      "weight": 4,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:rapport:emotion",
      "coverageKey": "a:d-5:core:late:rapport:emotion",
      "variantTarget": 3,
      "tags": [
        "late",
        "emotion"
      ],
      "questionTypes": [
        "empathy_approach"
      ],
      "setFlags": [
        "d-5:core:emotion_exposed"
      ],
      "requiresFlags": [
        "d-5:motive:responsibility_opened"
      ]
    },
    {
      "id": "friend02:beat_v2:a:d-5:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "candid",
      "line": "다만 위반의 방식과 책임 비중은 나눠서 계산돼야 한다.",
      "behaviorHint": "감정이 올라오면 목소리를 오히려 낮추고 단어 사이 간격을 길게 둔다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "sub_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "free_question",
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
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend02:a:d-5:s4:0",
          "friend02:a:d-5:s4:1"
        ],
        "forbidAtomIds": [
          "friend02:a:d-5:s2:0",
          "friend02:a:d-5:s2:1"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:rapport:emotion",
      "coverageKey": "a:d-5:core:late:rapport:emotion",
      "variantTarget": 2,
      "tags": [
        "free_question",
        "emotion"
      ],
      "questionTypes": [
        "empathy_approach"
      ],
      "setFlags": [
        "d-5:core:repair_named"
      ],
      "requiresFlags": [
        "d-5:core:emotion_exposed"
      ]
    },
    {
      "id": "friend02:beat_v2:b:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "'제가 잘못 안 했다는 게 아니라, 제가 다 했다는 식으로는 못 버팁니다.'",
      "behaviorHint": "숨을 크게 들이마신 뒤 억울함을 앞세워 시선을 재판관에게 돌린다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "interjection",
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated",
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed",
          "spent"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend02:b:d-1:s2:0"
        ],
        "forbidAtomIds": [
          "friend02:b:d-1:s4:0"
        ]
      },
      "weight": 5,
      "priority": 29,
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
      "id": "friend02:beat_v2:a:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "'조언이면 내 이름과 목소리가 왜 남의 손에 가 있죠. 그건 배려가 아니라 선택이잖아요.'",
      "behaviorHint": "말수를 줄이고 손가락으로 순서를 셈하듯 탁탁 짚는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "interjection",
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated",
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed",
          "spent"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend02:a:d-2:s2:0"
        ],
        "forbidAtomIds": [
          "friend02:a:d-2:s4:0"
        ]
      },
      "weight": 5,
      "priority": 29,
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
      "id": "friend02:beat_v2:b:d-1:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "감정만 먼저 던지지 말고, 비밀 음성메모부터 끊어서 답해.",
      "behaviorHint": "숨을 크게 들이마신 뒤 억울함을 앞세워 시선을 재판관에게 돌린다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "emotion",
      "actionFamily": "interjection",
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated",
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed",
          "spent"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend02:b:d-1:s2:0"
        ],
        "forbidAtomIds": [
          "friend02:b:d-1:s4:0"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-1:surface:mid:interjection:emotional_only:block",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "friend02:beat_v2:a:d-2:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "감정만 먼저 던지지 말고, 자동 로그인 태블릿부터 끊어서 답해.",
      "behaviorHint": "말수를 줄이고 손가락으로 순서를 셈하듯 탁탁 짚는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "emotion",
      "actionFamily": "interjection",
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated",
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed",
          "spent"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend02:a:d-2:s2:0"
        ],
        "forbidAtomIds": [
          "friend02:a:d-2:s4:0"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-2:surface:mid:interjection:emotional_only:block",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "friend02:beat_v2:b:d-1:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "'저만 끝까지 범인인 그림으로 가는 거잖아요?'",
      "behaviorHint": "숨을 크게 들이마신 뒤 억울함을 앞세워 시선을 재판관에게 돌린다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "context",
      "actionFamily": "interjection",
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated",
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed",
          "spent"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend02:b:d-1:s2:0"
        ],
        "forbidAtomIds": [
          "friend02:b:d-1:s4:0"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-1:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "friend02:beat_v2:a:d-2:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "'의도 말고요. 실제로 한 행동 순서부터 말해 주세요.'",
      "behaviorHint": "말수를 줄이고 손가락으로 순서를 셈하듯 탁탁 짚는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "context",
      "actionFamily": "interjection",
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated",
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed",
          "spent"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend02:a:d-2:s2:0"
        ],
        "forbidAtomIds": [
          "friend02:a:d-2:s4:0"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-2:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "friend02:beat_v2:b:d-1:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "세부 얘기로 돌리지 말고, 지금은 비밀 음성메모 핵심부터 말해.",
      "behaviorHint": "숨을 크게 들이마신 뒤 억울함을 앞세워 시선을 재판관에게 돌린다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "context",
      "actionFamily": "interjection",
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated",
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed",
          "spent"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend02:b:d-1:s2:0"
        ],
        "forbidAtomIds": [
          "friend02:b:d-1:s4:0"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-1:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "friend02:beat_v2:a:d-2:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "세부 얘기로 돌리지 말고, 지금은 자동 로그인 태블릿 핵심부터 말해.",
      "behaviorHint": "말수를 줄이고 손가락으로 순서를 셈하듯 탁탁 짚는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "context",
      "actionFamily": "interjection",
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated",
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed",
          "spent"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend02:a:d-2:s2:0"
        ],
        "forbidAtomIds": [
          "friend02:a:d-2:s4:0"
        ]
      },
      "weight": 5,
      "priority": 29,
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
      "id": "friend02:beat_v2:a:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "그래도 익명 폭로글만 보면 너무 분명해 보여. 그걸 그냥 오해였다고 하긴 어렵잖아.",
      "behaviorHint": "말수를 줄이고 손가락으로 순서를 셈하듯 탁탁 짚는다.",
      "applicableStates": [
        "M0",
        "M1",
        "M2"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "interjection",
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated",
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed",
          "spent"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend02:a:d-3:s2:0"
        ],
        "forbidAtomIds": [
          "friend02:a:d-3:s4:0"
        ]
      },
      "weight": 5,
      "priority": 29,
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
      ],
      "beliefMode": "misbelief"
    },
    {
      "id": "friend02:beat_v2:b:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "그 단서 하나로 확정하면 안 돼. 말투 캡처 전체 맥락을 같이 봐야 해.",
      "behaviorHint": "숨을 크게 들이마신 뒤 억울함을 앞세워 시선을 재판관에게 돌린다.",
      "applicableStates": [
        "M0",
        "M1",
        "M2"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "identity",
      "actionFamily": "interjection",
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated",
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed",
          "spent"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend02:b:d-3:s2:0"
        ],
        "forbidAtomIds": [
          "friend02:b:d-3:s4:0"
        ]
      },
      "weight": 5,
      "priority": 29,
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
      ],
      "beliefMode": "knows"
    },
    {
      "id": "friend02:beat_v2:a:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "익명 폭로글 정도면 이미 답 나온 거 아니야? 자꾸 맥락으로 흐리지 마.",
      "behaviorHint": "말수를 줄이고 손가락으로 순서를 셈하듯 탁탁 짚는다.",
      "applicableStates": [
        "M2",
        "M3",
        "M4"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "interjection",
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated",
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed",
          "spent"
        ],
        "interjectionStates": [
          "block_last_turn"
        ],
        "misconceptionStates": [
          "M2",
          "M3",
          "M4"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend02:a:d-3:s2:0"
        ],
        "forbidAtomIds": [
          "friend02:a:d-3:s4:0"
        ]
      },
      "weight": 5,
      "priority": 29,
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
      ],
      "beliefMode": "misbelief"
    },
    {
      "id": "friend02:beat_v2:b:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "그 단서만 계속 붙들지 마. 말투 캡처까지 같이 보면 해석이 달라져.",
      "behaviorHint": "숨을 크게 들이마신 뒤 억울함을 앞세워 시선을 재판관에게 돌린다.",
      "applicableStates": [
        "M2",
        "M3",
        "M4"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "identity",
      "actionFamily": "interjection",
      "conditions": {
        "emotionTiers": [
          "guarded",
          "agitated",
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "frayed",
          "spent"
        ],
        "interjectionStates": [
          "block_last_turn"
        ],
        "misconceptionStates": [
          "M2",
          "M3",
          "M4"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend02:b:d-3:s2:0"
        ],
        "forbidAtomIds": [
          "friend02:b:d-3:s4:0"
        ]
      },
      "weight": 5,
      "priority": 29,
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
      ],
      "beliefMode": "knows"
    }
  ]
} as const;

export default friend02BeatsV2Full;
