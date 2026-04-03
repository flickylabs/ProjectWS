export const spouse02BeatsV2Full = {
  "caseId": "spouse-02",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 57,
    "byActionFamily": {
      "question": 20,
      "evidence": 5,
      "free_question": 5,
      "fatigue": 15,
      "interjection": 12
    },
    "byParty": {
      "b": 33,
      "a": 24
    },
    "byIssueRole": {
      "core_truth": 22,
      "sub_truth": 22,
      "shared_misconception": 13
    },
    "beatsPerDispute": {
      "d-1": 11,
      "d-2": 11,
      "d-3": 11,
      "d-4": 11,
      "d-5": 13
    },
    "fatiguePerDispute": {
      "d-1": 3,
      "d-2": 3,
      "d-3": 3,
      "d-4": 3,
      "d-5": 3
    },
    "interjectionInfoLevels": {
      "emotional_only": 4,
      "detail_rebuttal": 4,
      "misbelief_escalation": 4
    }
  },
  "beats": [
    {
      "id": "spouse02:beat_v2:b:d-1:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "나는 학교에 희주 상담 기록을 보낸 적 없다. 그런 식으로 배우자 자료를 들고 갈 만큼 무리한 사람은 아니다.",
      "behaviorHint": "'예방접종도 혼자 데려갔고 유치원 상담도 제가 갔고 설명회도…' 희생 목록을 쌓아올려 의심을 누른다.",
      "applicableStates": [
        "S0"
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
          "spouse02:b:d-1:denial:0",
          "spouse02:b:d-1:fear:0"
        ],
        "forbidAtomIds": [
          "spouse02:b:d-1:admission:2",
          "spouse02:b:d-1:harm:0"
        ]
      },
      "weight": 6,
      "priority": 34,
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
      "id": "spouse02:beat_v2:b:d-1:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "걱정을 한 적은 있어도 실제 전달까지 한 건 아니다. 희주 상태를 학교가 알아야 하나 고민만 했지 실행했다고 볼 일은 아니다.",
      "behaviorHint": "'예방접종도 혼자 데려갔고 유치원 상담도 제가 갔고 설명회도…' 희생 목록을 쌓아올려 의심을 누른다.",
      "applicableStates": [
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
          "spouse02:b:d-1:uncertainty:0",
          "spouse02:b:d-1:self_justification:0"
        ],
        "forbidAtomIds": [
          "spouse02:b:d-1:admission:2",
          "spouse02:b:d-1:harm:0"
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
      "id": "spouse02:beat_v2:b:d-1:surface:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "집에서 그 서류가 스캔된 건 맞다. 하지만 그건 아이 학교 문제를 대비해 참고하려던 정리였지 바로 넘기려던 건 아니었다.",
      "behaviorHint": "본론 전에 '이런 말 또 해야 하네…'라며 한숨을 먼저 쉰다.",
      "applicableStates": [
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:b:d-1:admission:0",
          "spouse02:b:d-1:motive:0"
        ],
        "forbidAtomIds": [
          "spouse02:b:d-1:admission:2",
          "spouse02:b:d-1:harm:0"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:evidence:identity",
      "coverageKey": "b:d-1:surface:mid:evidence:identity",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:evidence_shown"
      ],
      "tags": [
        "cold"
      ]
    },
    {
      "id": "spouse02:beat_v2:b:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "counter",
      "line": "내가 한 행동이 공격으로 보인다면 억울한 면도 있다. 나는 아이가 학교에서 문제를 겪기 전에 미리 방어한다고 생각했다.",
      "behaviorHint": "본론 전에 '이런 말 또 해야 하네…'라며 한숨을 먼저 쉰다.",
      "applicableStates": [
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
          "calm",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:b:d-1:admission:1",
          "spouse02:b:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "spouse02:b:d-1:admission:2",
          "spouse02:b:d-1:harm:0"
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
        "d-1:motive:motive_named"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-1:surface:evidence_shown"
      ]
    },
    {
      "id": "spouse02:beat_v2:b:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "emotion",
      "line": "보조 계정을 쓴 건 맞다. 들키면 배신처럼 보일 줄 알았지만 그때는 아이 안전을 먼저 챙긴다고 스스로 믿었다.",
      "behaviorHint": "'그건 보호였지 공격이 아니야.",
      "applicableStates": [
        "S4"
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
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:b:d-1:emotion:0",
          "spouse02:b:d-1:fear:1",
          "spouse02:b:d-1:self_justification:1"
        ],
        "forbidAtomIds": [
          "spouse02:b:d-1:admission:2",
          "spouse02:b:d-1:harm:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:rapport:emotion",
      "coverageKey": "b:d-1:core:late:rapport:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-1:core:emotion_named"
      ],
      "tags": [
        "cold"
      ],
      "requiresFlags": [
        "d-1:motive:motive_named"
      ]
    },
    {
      "id": "spouse02:beat_v2:b:d-1:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confess",
      "line": "나는 희주 동의 없이 상담 종결서 일부를 학교 학부모지원 담당 쪽에 전달했다. 아이를 지킨다는 명분을 붙였지만 배우자의 기록을 무기화한 책임은 내 쪽에 있다.",
      "behaviorHint": "'그건 보호였지 공격이 아니야.",
      "applicableStates": [
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
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:b:d-1:relationship:0",
          "spouse02:b:d-1:harm:0",
          "spouse02:b:d-1:admission:2"
        ],
        "forbidAtomIds": [
          "spouse02:b:d-1:admission:2",
          "spouse02:b:d-1:harm:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:rapport:emotion",
      "coverageKey": "b:d-1:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:emotion_named"
      ],
      "tags": [
        "cold"
      ],
      "requiresFlags": [
        "d-1:core:emotion_named"
      ]
    },
    {
      "id": "spouse02:beat_v2:b:d-1:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "fatigue_irritation",
      "line": "같은 상담 종결서 얘기만 반복하시면 저도 답이 거칠어집니다. 방금 말한 학교 메일부터 정리해 주세요.",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "timeline",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:b:d-1:admission:1",
          "spouse02:b:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "spouse02:b:d-1:admission:2",
          "spouse02:b:d-1:harm:0"
        ]
      },
      "weight": 3,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:fatigue:timeline",
      "coverageKey": "b:d-1:motive:mid:fatigue:timeline",
      "variantTarget": 1,
      "setFlags": [
        "d-1:motive:fatigue_warned"
      ],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "spouse02:beat_v2:b:d-1:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "fatigue_block",
      "line": "상담 종결서를 세 번째 같은 톤으로 묻는 건 답을 짜내는 방식처럼 들립니다. 지금은 더는 같은 방식으로 답하지 않겠습니다.",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "S3",
        "S4"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:b:d-1:responsibility:0",
          "spouse02:b:d-1:admission:1"
        ],
        "forbidAtomIds": [
          "spouse02:b:d-1:admission:2",
          "spouse02:b:d-1:harm:0"
        ]
      },
      "weight": 3,
      "priority": 16,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:fatigue:responsibility",
      "coverageKey": "b:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-1:motive:fatigue_blocked"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-1:motive:fatigue_warned"
      ]
    },
    {
      "id": "spouse02:beat_v2:b:d-1:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "fatigue_counter",
      "line": "계속 이렇게 몰아붙이면 저도 되묻고 싶습니다. 왜 학교 메일 맥락은 빼고 상담 종결서만 확대하십니까?",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:b:d-1:self_justification:1",
          "spouse02:b:d-1:emotion:0",
          "spouse02:b:d-1:fear:1"
        ],
        "forbidAtomIds": [
          "spouse02:b:d-1:admission:2",
          "spouse02:b:d-1:harm:0"
        ]
      },
      "weight": 3,
      "priority": 14,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:fatigue:responsibility",
      "coverageKey": "b:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-1:motive:fatigue_countered"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-1:motive:fatigue_blocked"
      ]
    },
    {
      "id": "spouse02:beat_v2:a:d-2:surface:pressure:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "저는 학교에 실제로 뭘 보낸 적 없습니다. 연락망에서 도윤을 빼달라는 조치를 실행한 적도 없습니다.",
      "behaviorHint": "'그 메일은 — 아니, 정확히는 초안이에요.",
      "applicableStates": [
        "S0"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "legality",
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
          "spouse02:a:d-2:fear:0",
          "spouse02:a:d-2:denial:0"
        ],
        "forbidAtomIds": [
          "spouse02:a:d-2:admission:2",
          "spouse02:a:d-2:harm:0"
        ]
      },
      "weight": 6,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:pressure:legality",
      "coverageKey": "a:d-2:surface:early:pressure:legality",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:legality_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse02:beat_v2:a:d-2:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "초안 비슷한 건 있었어도 감정을 정리한 메모에 가까웠습니다. 아니, 정확히는 확인을 한 거지 정식 열람이나 발송을 한 건 아니라는 뜻입니다.",
      "behaviorHint": "'그 메일은 — 아니, 정확히는 초안이에요.",
      "applicableStates": [
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
          "spouse02:a:d-2:self_justification:0",
          "spouse02:a:d-2:uncertainty:0"
        ],
        "forbidAtomIds": [
          "spouse02:a:d-2:admission:2",
          "spouse02:a:d-2:harm:0"
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
      "id": "spouse02:beat_v2:a:d-2:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "출력은 제가 했습니다. 다만 익명 글을 본 직후 너무 불안해서 학교에 보낼 말을 정리만 해본 수준이었고 실제 발송은 하지 않았습니다.",
      "behaviorHint": "'열어본 게 아니라 확인한 거예요.",
      "applicableStates": [
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
          "calm",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:a:d-2:admission:0",
          "spouse02:a:d-2:motive:0",
          "spouse02:a:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse02:a:d-2:admission:2",
          "spouse02:a:d-2:harm:0"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:evidence:legality",
      "coverageKey": "a:d-2:surface:mid:evidence:legality",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:evidence_shown"
      ],
      "tags": [
        "cold"
      ]
    },
    {
      "id": "spouse02:beat_v2:a:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "counter",
      "line": "도윤 계정을 본 건 맞습니다. 익명 글과 학교 반응의 출발점을 확인하지 않고는 버틸 수가 없어서 선을 넘었습니다.",
      "behaviorHint": "'열어본 게 아니라 확인한 거예요.",
      "applicableStates": [
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
          "calm",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:a:d-2:responsibility:0",
          "spouse02:a:d-2:admission:1",
          "spouse02:a:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse02:a:d-2:admission:2",
          "spouse02:a:d-2:harm:0"
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
        "d-2:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-2:surface:evidence_shown"
      ]
    },
    {
      "id": "spouse02:beat_v2:a:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "emotion",
      "line": "무단 열람은 제 잘못입니다. 그래도 먼저 밖으로 제 기록이 흘러나간 이유를 확인하지 않고는 아이를 맡길 수 없다는 공포가 있었습니다.",
      "behaviorHint": "답하기 전 눈에 띄게 숨을 고른다 — 세 번.",
      "applicableStates": [
        "S4"
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
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:a:d-2:emotion:0",
          "spouse02:a:d-2:fear:1",
          "spouse02:a:d-2:self_justification:1"
        ],
        "forbidAtomIds": [
          "spouse02:a:d-2:admission:2",
          "spouse02:a:d-2:harm:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:core:rapport:emotion",
      "coverageKey": "a:d-2:core:late:rapport:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-2:core:emotion_named"
      ],
      "tags": [
        "cold"
      ],
      "requiresFlags": [
        "d-2:motive:responsibility_named"
      ]
    },
    {
      "id": "spouse02:beat_v2:a:d-2:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "confess",
      "line": "저는 도윤 계정과 프린터 기록을 무단 확인했고, 학교 연락망에서 빼달라는 초안도 작성했습니다. 발송하지는 않았지만 사생활 경계를 넘은 행동이었고 불안과 자기방어로 한 일입니다.",
      "behaviorHint": "답하기 전 눈에 띄게 숨을 고른다 — 세 번.",
      "applicableStates": [
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
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:a:d-2:relationship:0",
          "spouse02:a:d-2:harm:0",
          "spouse02:a:d-2:admission:2"
        ],
        "forbidAtomIds": [
          "spouse02:a:d-2:admission:2",
          "spouse02:a:d-2:harm:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:core:rapport:emotion",
      "coverageKey": "a:d-2:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-2:core:emotion_named"
      ],
      "tags": [
        "cold"
      ],
      "requiresFlags": [
        "d-2:core:emotion_named"
      ]
    },
    {
      "id": "spouse02:beat_v2:a:d-2:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "fatigue_irritation",
      "line": "같은 공유 노트북 얘기만 반복하시면 저도 답이 거칠어집니다. 방금 말한 37분 뒤부터 정리해 주세요.",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "sub_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "timeline",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:a:d-2:unlock:s3:0",
          "spouse02:a:d-2:admission:1",
          "spouse02:a:d-2:responsibility:0"
        ],
        "forbidAtomIds": [
          "spouse02:a:d-2:admission:2",
          "spouse02:a:d-2:harm:0"
        ]
      },
      "weight": 3,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:fatigue:timeline",
      "coverageKey": "a:d-2:motive:mid:fatigue:timeline",
      "variantTarget": 1,
      "setFlags": [
        "d-2:motive:fatigue_warned"
      ],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "spouse02:beat_v2:a:d-2:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "fatigue_block",
      "line": "공유 노트북를 세 번째 같은 톤으로 묻는 건 답을 짜내는 방식처럼 들립니다. 지금은 더는 같은 방식으로 답하지 않겠습니다.",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "S3",
        "S4"
      ],
      "layer": "motive",
      "issueRole": "sub_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:a:d-2:responsibility:0",
          "spouse02:a:d-2:admission:1",
          "spouse02:a:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse02:a:d-2:admission:2",
          "spouse02:a:d-2:harm:0"
        ]
      },
      "weight": 3,
      "priority": 16,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:fatigue:responsibility",
      "coverageKey": "a:d-2:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-2:motive:fatigue_blocked"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-2:motive:fatigue_warned"
      ]
    },
    {
      "id": "spouse02:beat_v2:a:d-2:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "fatigue_counter",
      "line": "계속 이렇게 몰아붙이면 저도 되묻고 싶습니다. 왜 37분 뒤 맥락은 빼고 공유 노트북만 확대하십니까?",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "motive",
      "issueRole": "sub_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:a:d-2:self_justification:1",
          "spouse02:a:d-2:emotion:0",
          "spouse02:a:d-2:fear:1"
        ],
        "forbidAtomIds": [
          "spouse02:a:d-2:admission:2",
          "spouse02:a:d-2:harm:0"
        ]
      },
      "weight": 3,
      "priority": 14,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:fatigue:responsibility",
      "coverageKey": "a:d-2:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-2:motive:fatigue_countered"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-2:motive:fatigue_blocked"
      ]
    },
    {
      "id": "spouse02:beat_v2:b:d-3:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "학부모방 익명 글은 누군가 과민하게 퍼뜨린 소문일 뿐이다. 나와 직접 연결할 근거는 없다.",
      "behaviorHint": "'예방접종도 혼자 데려갔고 유치원 상담도 제가 갔고 설명회도…' 희생 목록을 쌓아올려 의심을 누른다.",
      "applicableStates": [
        "S0"
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
          "spouse02:b:d-3:denial:0",
          "spouse02:b:d-3:fear:0"
        ],
        "forbidAtomIds": [
          "spouse02:b:d-3:admission:2",
          "spouse02:b:d-3:harm:0"
        ]
      },
      "weight": 6,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:pressure:identity",
      "coverageKey": "b:d-3:surface:early:pressure:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-3:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse02:beat_v2:b:d-3:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "캡처는 잘린 화면이라 출처를 단정하기 어렵다. 외부 학부모가 과장해서 올렸을 가능성도 충분하다.",
      "behaviorHint": "'예방접종도 혼자 데려갔고 유치원 상담도 제가 갔고 설명회도…' 희생 목록을 쌓아올려 의심을 누른다.",
      "applicableStates": [
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
          "spouse02:b:d-3:uncertainty:0",
          "spouse02:b:d-3:self_justification:0"
        ],
        "forbidAtomIds": [
          "spouse02:b:d-3:admission:2",
          "spouse02:b:d-3:harm:0"
        ]
      },
      "weight": 6,
      "priority": 32,
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
      "id": "spouse02:beat_v2:b:d-3:surface:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "그 글이 올라온 건 봤다. 하지만 누가 올렸는지, 누가 자료를 붙였는지까지 내가 안다고 볼 수는 없다.",
      "behaviorHint": "본론 전에 '이런 말 또 해야 하네…'라며 한숨을 먼저 쉰다.",
      "applicableStates": [
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:b:d-3:unlock:s2:0",
          "spouse02:b:d-3:admission:0",
          "spouse02:b:d-3:motive:0"
        ],
        "forbidAtomIds": [
          "spouse02:b:d-3:admission:2",
          "spouse02:b:d-3:harm:0"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:evidence:identity",
      "coverageKey": "b:d-3:surface:mid:evidence:identity",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:evidence_shown"
      ],
      "tags": [
        "cold"
      ]
    },
    {
      "id": "spouse02:beat_v2:b:d-3:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "counter",
      "line": "집에서 서류를 스캔한 기록은 있다. 다만 그걸 학부모방에 직접 올렸다기보다 학교가 미리 알았으면 좋겠다고 생각한 쪽에 가까웠다.",
      "behaviorHint": "본론 전에 '이런 말 또 해야 하네…'라며 한숨을 먼저 쉰다.",
      "applicableStates": [
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
          "calm",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:b:d-3:responsibility:0",
          "spouse02:b:d-3:admission:1",
          "spouse02:b:d-3:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse02:b:d-3:admission:2",
          "spouse02:b:d-3:harm:0"
        ]
      },
      "weight": 5,
      "priority": 27,
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
      ],
      "requiresFlags": [
        "d-3:surface:evidence_shown"
      ]
    },
    {
      "id": "spouse02:beat_v2:b:d-3:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "emotion",
      "line": "보조 계정과 스캔 파일이 같은 방향을 가리킨다는 건 이제 부정하기 어렵다. 난 아이 생각만 했다고 덮으려 했지만 그 말로는 비겁함까지 지워지지 않는다.",
      "behaviorHint": "'그건 보호였지 공격이 아니야.",
      "applicableStates": [
        "S4"
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
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:b:d-3:emotion:0",
          "spouse02:b:d-3:fear:1",
          "spouse02:b:d-3:self_justification:1"
        ],
        "forbidAtomIds": [
          "spouse02:b:d-3:admission:2",
          "spouse02:b:d-3:harm:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:rapport:emotion",
      "coverageKey": "b:d-3:core:late:rapport:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-3:core:emotion_named"
      ],
      "tags": [
        "cold"
      ],
      "requiresFlags": [
        "d-3:motive:responsibility_named"
      ]
    },
    {
      "id": "spouse02:beat_v2:b:d-3:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confess",
      "line": "익명 학부모방 경고글과 첨부 파일의 실질적 출처는 내 보조 계정과 집 안 스캔 기록으로 이어진다. 외부 오해처럼 보이게 꾸몄지만 실제로는 내가 희주의 과거를 유통시킨 흐름이었다.",
      "behaviorHint": "'그건 보호였지 공격이 아니야.",
      "applicableStates": [
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
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:b:d-3:relationship:0",
          "spouse02:b:d-3:harm:0",
          "spouse02:b:d-3:admission:2"
        ],
        "forbidAtomIds": [
          "spouse02:b:d-3:admission:2",
          "spouse02:b:d-3:harm:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:rapport:emotion",
      "coverageKey": "b:d-3:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-3:core:emotion_named"
      ],
      "tags": [
        "cold"
      ],
      "requiresFlags": [
        "d-3:core:emotion_named"
      ]
    },
    {
      "id": "spouse02:beat_v2:b:d-3:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "fatigue_irritation",
      "line": "같은 학부모방 얘기만 반복하시면 저도 답이 거칠어집니다. 방금 말한 익명 경고글부터 정리해 주세요.",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "timeline",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:b:d-3:admission:1",
          "spouse02:b:d-3:responsibility:0",
          "spouse02:b:d-3:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse02:b:d-3:admission:2",
          "spouse02:b:d-3:harm:0"
        ]
      },
      "weight": 3,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:fatigue:timeline",
      "coverageKey": "b:d-3:motive:mid:fatigue:timeline",
      "variantTarget": 1,
      "setFlags": [
        "d-3:motive:fatigue_warned"
      ],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "spouse02:beat_v2:b:d-3:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "fatigue_block",
      "line": "학부모방를 세 번째 같은 톤으로 묻는 건 답을 짜내는 방식처럼 들립니다. 지금은 더는 같은 방식으로 답하지 않겠습니다.",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "S3",
        "S4"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:b:d-3:responsibility:0",
          "spouse02:b:d-3:admission:1",
          "spouse02:b:d-3:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse02:b:d-3:admission:2",
          "spouse02:b:d-3:harm:0"
        ]
      },
      "weight": 3,
      "priority": 16,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:fatigue:responsibility",
      "coverageKey": "b:d-3:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-3:motive:fatigue_blocked"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-3:motive:fatigue_warned"
      ]
    },
    {
      "id": "spouse02:beat_v2:b:d-3:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "fatigue_counter",
      "line": "계속 이렇게 몰아붙이면 저도 되묻고 싶습니다. 왜 익명 경고글 맥락은 빼고 학부모방만 확대하십니까?",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:b:d-3:self_justification:1",
          "spouse02:b:d-3:emotion:0",
          "spouse02:b:d-3:fear:1"
        ],
        "forbidAtomIds": [
          "spouse02:b:d-3:admission:2",
          "spouse02:b:d-3:harm:0"
        ]
      },
      "weight": 3,
      "priority": 14,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:fatigue:responsibility",
      "coverageKey": "b:d-3:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-3:motive:fatigue_countered"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-3:motive:fatigue_blocked"
      ]
    },
    {
      "id": "spouse02:beat_v2:a:d-4:surface:pressure:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "저는 학교에 과거 상처를 공식 사실처럼 올린 적은 없습니다. 약속을 먼저 깬 쪽은 제 상담 기록을 꺼낸 도윤이라고 봅니다.",
      "behaviorHint": "'그 메일은 — 아니, 정확히는 초안이에요.",
      "applicableStates": [
        "S0"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "legality",
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
          "spouse02:a:d-4:denial:0",
          "spouse02:a:d-4:relationship:0"
        ],
        "forbidAtomIds": [
          "spouse02:a:d-4:admission:1",
          "spouse02:a:d-4:rule:0"
        ]
      },
      "weight": 6,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:pressure:legality",
      "coverageKey": "a:d-4:surface:early:pressure:legality",
      "variantTarget": 6,
      "setFlags": [
        "d-4:surface:legality_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "spouse02:beat_v2:a:d-4:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "초안에 감정 섞인 표현이 조금 있었던 건 맞습니다. 그래도 실제로 내보낸 말과 머릿속에서 적어 본 말은 구분돼야 한다고 생각했습니다.",
      "behaviorHint": "'그 메일은 — 아니, 정확히는 초안이에요.",
      "applicableStates": [
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
          "spouse02:a:d-4:self_justification:0",
          "spouse02:a:d-4:uncertainty:0"
        ],
        "forbidAtomIds": [
          "spouse02:a:d-4:admission:1",
          "spouse02:a:d-4:rule:0"
        ]
      },
      "weight": 6,
      "priority": 32,
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
      "id": "spouse02:beat_v2:a:d-4:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "예전 별거 위기 발언을 초안에 적은 건 사실입니다. 보내지는 않았지만 저도 과거를 현재 분쟁에 끌어올릴 문턱까지 갔습니다.",
      "behaviorHint": "'열어본 게 아니라 확인한 거예요.",
      "applicableStates": [
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
          "calm",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:a:d-4:admission:0",
          "spouse02:a:d-4:unlock:s2:0",
          "spouse02:a:d-4:responsibility:0"
        ],
        "forbidAtomIds": [
          "spouse02:a:d-4:admission:1",
          "spouse02:a:d-4:rule:0"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:evidence:legality",
      "coverageKey": "a:d-4:surface:mid:evidence:legality",
      "variantTarget": 2,
      "setFlags": [
        "d-4:surface:evidence_shown"
      ],
      "tags": [
        "cold"
      ]
    },
    {
      "id": "spouse02:beat_v2:a:d-4:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "counter",
      "line": "도윤이 먼저 상담 기록을 무기화했기 때문에 저도 방어적으로 과거를 꺼냈습니다. 그렇다고 해도 약속을 깼다는 사실 자체가 사라지지는 않습니다.",
      "behaviorHint": "'열어본 게 아니라 확인한 거예요.",
      "applicableStates": [
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
          "calm",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:a:d-4:responsibility:1",
          "spouse02:a:d-4:relationship:1"
        ],
        "forbidAtomIds": [
          "spouse02:a:d-4:admission:1",
          "spouse02:a:d-4:rule:0"
        ]
      },
      "weight": 5,
      "priority": 27,
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
      ],
      "requiresFlags": [
        "d-4:surface:evidence_shown"
      ]
    },
    {
      "id": "spouse02:beat_v2:a:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "emotion",
      "line": "우리가 다시는 꺼내지 말자고 했던 칼을 둘 다 다시 집은 셈입니다. 도윤이 더 크게 선을 넘었지만 저도 초안 안에서 같은 문을 열었습니다.",
      "behaviorHint": "답하기 전 눈에 띄게 숨을 고른다 — 세 번.",
      "applicableStates": [
        "S4"
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
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:a:d-4:fear:0",
          "spouse02:a:d-4:emotion:0",
          "spouse02:a:d-4:shame:0"
        ],
        "forbidAtomIds": [
          "spouse02:a:d-4:admission:1",
          "spouse02:a:d-4:rule:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:core:rapport:emotion",
      "coverageKey": "a:d-4:core:late:rapport:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-4:core:emotion_named"
      ],
      "tags": [
        "cold"
      ],
      "requiresFlags": [
        "d-4:motive:responsibility_named"
      ]
    },
    {
      "id": "spouse02:beat_v2:a:d-4:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confess",
      "line": "도윤은 상담 기록을 실제로 유포했고, 저는 예전 별거 위기 발언을 학교 초안에 적어 넣었습니다. 크기와 실행 정도는 달라도 두 사람 모두 과거 상처를 새 싸움의 무기로 쓰지 않겠다는 약속을 훼손했습니다.",
      "behaviorHint": "답하기 전 눈에 띄게 숨을 고른다 — 세 번.",
      "applicableStates": [
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
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:a:d-4:admission:1",
          "spouse02:a:d-4:harm:0",
          "spouse02:a:d-4:rule:0"
        ],
        "forbidAtomIds": [
          "spouse02:a:d-4:admission:1",
          "spouse02:a:d-4:rule:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:core:motive:motive",
      "coverageKey": "a:d-4:core:late:motive:motive",
      "variantTarget": 2,
      "setFlags": [
        "d-4:core:motive_named"
      ],
      "tags": [
        "cold"
      ],
      "requiresFlags": [
        "d-4:core:emotion_named"
      ]
    },
    {
      "id": "spouse02:beat_v2:a:d-4:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "fatigue_irritation",
      "line": "같은 2023년 약속 얘기만 반복하시면 저도 답이 거칠어집니다. 방금 말한 과거 기록 비무기화부터 정리해 주세요.",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "sub_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "timeline",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:a:d-4:relationship:1",
          "spouse02:a:d-4:responsibility:1"
        ],
        "forbidAtomIds": [
          "spouse02:a:d-4:admission:1",
          "spouse02:a:d-4:rule:0"
        ]
      },
      "weight": 3,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:fatigue:timeline",
      "coverageKey": "a:d-4:motive:mid:fatigue:timeline",
      "variantTarget": 1,
      "setFlags": [
        "d-4:motive:fatigue_warned"
      ],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "spouse02:beat_v2:a:d-4:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "fatigue_block",
      "line": "2023년 약속를 세 번째 같은 톤으로 묻는 건 답을 짜내는 방식처럼 들립니다. 지금은 더는 같은 방식으로 답하지 않겠습니다.",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "S3",
        "S4"
      ],
      "layer": "motive",
      "issueRole": "sub_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:a:d-4:responsibility:1",
          "spouse02:a:d-4:relationship:1"
        ],
        "forbidAtomIds": [
          "spouse02:a:d-4:admission:1",
          "spouse02:a:d-4:rule:0"
        ]
      },
      "weight": 3,
      "priority": 16,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:fatigue:responsibility",
      "coverageKey": "a:d-4:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-4:motive:fatigue_blocked"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-4:motive:fatigue_warned"
      ]
    },
    {
      "id": "spouse02:beat_v2:a:d-4:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "fatigue_counter",
      "line": "계속 이렇게 몰아붙이면 저도 되묻고 싶습니다. 왜 과거 기록 비무기화 맥락은 빼고 2023년 약속만 확대하십니까?",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "motive",
      "issueRole": "sub_truth",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:a:d-4:emotion:0",
          "spouse02:a:d-4:fear:0",
          "spouse02:a:d-4:shame:0"
        ],
        "forbidAtomIds": [
          "spouse02:a:d-4:admission:1",
          "spouse02:a:d-4:rule:0"
        ]
      },
      "weight": 3,
      "priority": 14,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:fatigue:responsibility",
      "coverageKey": "a:d-4:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-4:motive:fatigue_countered"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-4:motive:fatigue_blocked"
      ]
    },
    {
      "id": "spouse02:beat_v2:b:d-5:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "입학 파일이 묶인 건 학교가 희주 쪽 불안을 민감하게 본 탓이라고 생각했다. 익명 제보와 보호자 연락처 문제가 곧바로 영향을 줬다고 믿었다.",
      "behaviorHint": "'예방접종도 혼자 데려갔고 유치원 상담도 제가 갔고 설명회도…' 희생 목록을 쌓아올려 의심을 누른다.",
      "applicableStates": [
        "M0"
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
          "spouse02:b:d-5:uncertainty:0",
          "spouse02:b:d-5:fear:0"
        ],
        "forbidAtomIds": [
          "spouse02:b:d-5:admission:0",
          "spouse02:b:d-5:responsibility:1"
        ]
      },
      "weight": 6,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:pressure:context",
      "coverageKey": "b:d-5:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-5:surface:context_pressed"
      ],
      "tags": [
        "hot",
        "red_herring"
      ]
    },
    {
      "id": "spouse02:beat_v2:b:d-5:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "학교가 말끝을 흐리는 방식 때문에 더 그렇게 받아들였다. 내가 보기에 보류는 행정 실수보다 보호자 신뢰 문제에 가까워 보였다.",
      "behaviorHint": "'예방접종도 혼자 데려갔고 유치원 상담도 제가 갔고 설명회도…' 희생 목록을 쌓아올려 의심을 누른다.",
      "applicableStates": [
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
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:b:d-5:uncertainty:1",
          "spouse02:b:d-5:motive:0"
        ],
        "forbidAtomIds": [
          "spouse02:b:d-5:admission:0",
          "spouse02:b:d-5:responsibility:1"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:pressure:identity",
      "coverageKey": "b:d-5:surface:early:pressure:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-5:surface:identity_pressed"
      ],
      "tags": [
        "hot",
        "red_herring"
      ]
    },
    {
      "id": "spouse02:beat_v2:b:d-5:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "보류 메모 시각이 익명 메일보다 앞서 있다면 내가 짚은 원인은 틀린 거다. 직접 원인은 다른 행정 오류였다고 봐야 한다.",
      "behaviorHint": "본론 전에 '이런 말 또 해야 하네…'라며 한숨을 먼저 쉰다.",
      "applicableStates": [
        "M2",
        "M3"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
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
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:b:d-5:evidence:0",
          "spouse02:b:d-5:responsibility:0",
          "spouse02:b:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse02:b:d-5:admission:0",
          "spouse02:b:d-5:responsibility:1"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:evidence:context",
      "coverageKey": "b:d-5:surface:mid:evidence:context",
      "variantTarget": 2,
      "setFlags": [
        "d-5:surface:evidence_shown"
      ],
      "tags": [
        "cold",
        "red_herring"
      ]
    },
    {
      "id": "spouse02:beat_v2:b:d-5:motive:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "counter",
      "line": "주소 확인 오류가 직접 원인이면 우리는 엉뚱한 상대만 공격한 셈이다. 내 제보는 보류 원인이 아니라 사후 혼란을 키운 일로 남는다.",
      "behaviorHint": "본론 전에 '이런 말 또 해야 하네…'라며 한숨을 먼저 쉰다.",
      "applicableStates": [
        "M3"
      ],
      "layer": "motive",
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
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:b:d-5:context:0",
          "spouse02:b:d-5:harm:0"
        ],
        "forbidAtomIds": [
          "spouse02:b:d-5:admission:0",
          "spouse02:b:d-5:responsibility:1"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:pressure:context",
      "coverageKey": "b:d-5:motive:mid:pressure:context",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:context_named"
      ],
      "tags": [
        "mid",
        "red_herring"
      ],
      "requiresFlags": [
        "d-5:surface:evidence_shown"
      ]
    },
    {
      "id": "spouse02:beat_v2:b:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "emotion",
      "line": "아이 문제를 배우자 흠결 입증 싸움으로 바꾼 게 제일 부끄럽다. 보류의 직접 원인을 모르면서도 나는 이미 희주를 원인으로 확정해버렸다.",
      "behaviorHint": "'그건 보호였지 공격이 아니야.",
      "applicableStates": [
        "M4"
      ],
      "layer": "core",
      "issueRole": "shared_misconception",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "question",
      "questionTypes": [
        "empathy_approach"
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
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:b:d-5:shame:0",
          "spouse02:b:d-5:fear:1",
          "spouse02:b:d-5:relationship:0"
        ],
        "forbidAtomIds": [
          "spouse02:b:d-5:admission:0",
          "spouse02:b:d-5:responsibility:1"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:rapport:emotion",
      "coverageKey": "b:d-5:core:late:rapport:emotion",
      "variantTarget": 3,
      "setFlags": [
        "d-5:core:emotion_named"
      ],
      "tags": [
        "cold",
        "red_herring"
      ],
      "requiresFlags": [
        "d-5:motive:context_named"
      ]
    },
    {
      "id": "spouse02:beat_v2:b:d-5:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confess",
      "line": "입학 파일 보류의 직접 원인은 관리사무소의 구 동호수 기재 오류였다. 내 익명 제보와 유포는 최초 원인은 아니었지만 그 뒤 혼선과 상처를 키운 일로 남는다.",
      "behaviorHint": "'그건 보호였지 공격이 아니야.",
      "applicableStates": [
        "M4"
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
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:b:d-5:responsibility:1",
          "spouse02:b:d-5:context:1",
          "spouse02:b:d-5:admission:0"
        ],
        "forbidAtomIds": [
          "spouse02:b:d-5:admission:0",
          "spouse02:b:d-5:responsibility:1"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:rapport:emotion",
      "coverageKey": "b:d-5:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-5:core:emotion_named"
      ],
      "tags": [
        "cold",
        "red_herring"
      ],
      "requiresFlags": [
        "d-5:core:emotion_named"
      ]
    },
    {
      "id": "spouse02:beat_v2:b:d-5:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "fatigue_irritation",
      "line": "같은 입학 파일 보류 얘기만 반복하시면 저도 답이 거칠어집니다. 방금 말한 구 동호수부터 정리해 주세요.",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "M1",
        "M2"
      ],
      "layer": "motive",
      "issueRole": "shared_misconception",
      "responseIntent": "fatigue_response",
      "angleTag": "timeline",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "wary",
          "strained"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:b:d-5:context:0",
          "spouse02:b:d-5:harm:0"
        ],
        "forbidAtomIds": [
          "spouse02:b:d-5:admission:0",
          "spouse02:b:d-5:responsibility:1"
        ]
      },
      "weight": 3,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:fatigue:timeline",
      "coverageKey": "b:d-5:motive:mid:fatigue:timeline",
      "variantTarget": 1,
      "setFlags": [
        "d-5:motive:fatigue_warned"
      ],
      "tags": [
        "fatigue",
        "red_herring"
      ]
    },
    {
      "id": "spouse02:beat_v2:b:d-5:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "fatigue_block",
      "line": "입학 파일 보류를 세 번째 같은 톤으로 묻는 건 답을 짜내는 방식처럼 들립니다. 지금은 더는 같은 방식으로 답하지 않겠습니다.",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "M2",
        "M3"
      ],
      "layer": "motive",
      "issueRole": "shared_misconception",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "strained",
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:b:d-5:harm:0",
          "spouse02:b:d-5:context:0"
        ],
        "forbidAtomIds": [
          "spouse02:b:d-5:admission:0",
          "spouse02:b:d-5:responsibility:1"
        ]
      },
      "weight": 3,
      "priority": 16,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:fatigue:responsibility",
      "coverageKey": "b:d-5:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-5:motive:fatigue_blocked"
      ],
      "tags": [
        "fatigue",
        "red_herring"
      ],
      "requiresFlags": [
        "d-5:motive:fatigue_warned"
      ]
    },
    {
      "id": "spouse02:beat_v2:b:d-5:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "fatigue_counter",
      "line": "계속 이렇게 몰아붙이면 저도 되묻고 싶습니다. 왜 구 동호수 맥락은 빼고 입학 파일 보류만 확대하십니까?",
      "behaviorHint": "목소리가 짧아지고, 같은 결의 질문엔 즉답을 거부하며 방어적으로 되묻는다.",
      "applicableStates": [
        "M3",
        "M4"
      ],
      "layer": "motive",
      "issueRole": "shared_misconception",
      "responseIntent": "fatigue_response",
      "angleTag": "responsibility",
      "actionFamily": "fatigue",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "exhausted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:b:d-5:relationship:0",
          "spouse02:b:d-5:fear:1",
          "spouse02:b:d-5:shame:0"
        ],
        "forbidAtomIds": [
          "spouse02:b:d-5:admission:0",
          "spouse02:b:d-5:responsibility:1"
        ]
      },
      "weight": 3,
      "priority": 14,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:fatigue:responsibility",
      "coverageKey": "b:d-5:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-5:motive:fatigue_countered"
      ],
      "tags": [
        "fatigue",
        "red_herring"
      ],
      "requiresFlags": [
        "d-5:motive:fatigue_blocked"
      ]
    },
    {
      "id": "spouse02:beat_v2:b:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interjection_allow",
      "line": "아이를 지킨다는 말 뒤에 제가 먼저 깔아 둔 건 두려움과 체면이었습니다. 그래서 더 비겁하게 보조 계정으로 숨었습니다.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
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
          "spouse02:b:d-1:emotion:0",
          "spouse02:b:d-1:fear:1",
          "spouse02:b:d-1:relationship:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-1:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 1,
      "setFlags": [
        "d-1:surface:interjection_emotional_only"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "spouse02:beat_v2:b:d-1:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interjection_block",
      "line": "아이 보호라는 말로 시작하면 유출의 폭력이 흐려집니다. 동의 없이 상담 기록을 보낸 사실부터 놓지 말아야 합니다.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
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
          "spouse02:b:d-1:emotion:0",
          "spouse02:b:d-1:fear:1",
          "spouse02:b:d-1:relationship:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-1:surface:mid:interjection:emotional_only:block",
      "variantTarget": 1,
      "setFlags": [
        "d-1:surface:interjection_emotional_only"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "spouse02:beat_v2:a:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "interjection_allow",
      "line": "익명 글을 본 뒤 저는 엄마 자격이 무너지는 기분이었습니다. 그래서 확인과 침해의 선을 스스로 지우고 말았습니다.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
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
          "spouse02:a:d-2:emotion:0",
          "spouse02:a:d-2:fear:1",
          "spouse02:a:d-2:relationship:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-2:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 1,
      "setFlags": [
        "d-2:surface:interjection_emotional_only"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "spouse02:beat_v2:a:d-2:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "interjection_block",
      "line": "공포를 이해해도 공유 노트북 접속과 초안 작성은 따로 남습니다. 감정만 앞세우면 미발송 여부라는 중요한 차이도 흐려집니다.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
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
          "spouse02:a:d-2:emotion:0",
          "spouse02:a:d-2:fear:1",
          "spouse02:a:d-2:relationship:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-2:surface:mid:interjection:emotional_only:block",
      "variantTarget": 1,
      "setFlags": [
        "d-2:surface:interjection_emotional_only"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "spouse02:beat_v2:b:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interjection_allow",
      "line": "보조 계정, 첨부 해시, 집 복합기 스캔 로그가 같은 방향을 가리킵니다. 외부 학부모의 우연한 캡처로 설명되기 어렵습니다.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "identity",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:b:d-3:unlock:s2:0",
          "spouse02:b:d-3:admission:0",
          "spouse02:b:d-3:admission:1"
        ],
        "forbidAtomIds": [
          "spouse02:b:d-3:admission:2",
          "spouse02:b:d-3:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-3:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 1,
      "setFlags": [
        "d-3:surface:interjection_detail_rebuttal"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "spouse02:beat_v2:b:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interjection_block",
      "line": "정황을 쌓아도 작성자 특정은 헤더와 파일 경로까지 맞아야 합니다. '학교가 알아야 했다'는 표현이 직접 흔적이라는 점을 피하지 마세요.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
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
          "spouse02:b:d-3:responsibility:0",
          "spouse02:b:d-3:unlock:s2:0",
          "spouse02:b:d-3:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "spouse02:b:d-3:admission:2",
          "spouse02:b:d-3:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 1,
      "setFlags": [
        "d-3:surface:interjection_detail_rebuttal"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "spouse02:beat_v2:a:d-4:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "interjection_allow",
      "line": "초안엔 별거 위기 문장이 있었지만 실제 발송은 없었습니다. 실행과 문턱까지 간 시도를 구분해야 약속 파기 정도가 정확해집니다.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "legality",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:a:d-4:admission:0",
          "spouse02:a:d-4:unlock:s2:0",
          "spouse02:a:d-4:relationship:1"
        ],
        "forbidAtomIds": [
          "spouse02:a:d-4:admission:1",
          "spouse02:a:d-4:rule:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-4:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 1,
      "setFlags": [
        "d-4:surface:interjection_detail_rebuttal"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "spouse02:beat_v2:a:d-4:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "interjection_block",
      "line": "미발송이라 해도 약속을 건드린 건 사실입니다. 상담 기록 유포를 방패로 삼아 초안 안의 공격성을 지워선 안 됩니다.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "responsibility",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "spouse02:a:d-4:admission:0",
          "spouse02:a:d-4:responsibility:0",
          "spouse02:a:d-4:responsibility:1"
        ],
        "forbidAtomIds": [
          "spouse02:a:d-4:admission:1",
          "spouse02:a:d-4:rule:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-4:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 1,
      "setFlags": [
        "d-4:surface:interjection_detail_rebuttal"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "spouse02:beat_v2:b:d-5:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "interjection_allow",
      "line": "보류 메모가 익명 메일보다 앞섰다는 한 줄이 나오기 전까진 저도 희주 문제라고 믿었습니다. 그만큼 학교 반응이 모호했습니다.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
      "applicableStates": [
        "M1",
        "M2"
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
          "spouse02:b:d-5:context:0",
          "spouse02:b:d-5:evidence:0",
          "spouse02:b:d-5:responsibility:0"
        ],
        "forbidAtomIds": [
          "spouse02:b:d-5:responsibility:1",
          "spouse02:b:d-5:admission:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-5:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 1,
      "setFlags": [
        "d-5:surface:interjection_misbelief_escalation"
      ],
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
      "id": "spouse02:beat_v2:b:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "interjection_block",
      "line": "학교의 모호함을 이유로 배우자 흠결로 곧장 뛰면 행정 오류 확인이 더 늦어집니다. 원인과 사후 혼란을 분리해야 합니다.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
      "applicableStates": [
        "M1",
        "M2"
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
          "spouse02:b:d-5:context:0",
          "spouse02:b:d-5:uncertainty:1",
          "spouse02:b:d-5:evidence:0"
        ],
        "forbidAtomIds": [
          "spouse02:b:d-5:responsibility:1",
          "spouse02:b:d-5:admission:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-5:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 1,
      "setFlags": [
        "d-5:surface:interjection_misbelief_escalation"
      ],
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
      "id": "spouse02:beat_v2:a:d-5:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "interjection_allow",
      "line": "저 역시 보류를 도윤의 제보 탓으로 붙잡고 싶었습니다. 아이 문제를 둘 중 하나의 가해자 찾기로 좁힌 셈입니다.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
      "applicableStates": [
        "M1",
        "M2"
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
          "spouse02:a:d-5:context:0",
          "spouse02:a:d-5:evidence:0",
          "spouse02:a:d-5:responsibility:0"
        ],
        "forbidAtomIds": [
          "spouse02:a:d-5:responsibility:1",
          "spouse02:a:d-5:admission:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-5:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 1,
      "setFlags": [
        "d-5:surface:interjection_misbelief_escalation"
      ],
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
      "id": "spouse02:beat_v2:a:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "spouse-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "interjection_block",
      "line": "억울함을 말하는 사이에도 보류 원인은 주소 오류로 남아 있습니다. 오해를 감정으로 덮지 말고 보류 메모 시각을 보죠.",
      "behaviorHint": "상대 말을 자르듯 짧게 들어오며, 선택에 따라 감정 또는 반박을 압축해서 던진다.",
      "applicableStates": [
        "M1",
        "M2"
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
          "spouse02:a:d-5:context:0",
          "spouse02:a:d-5:uncertainty:1",
          "spouse02:a:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "spouse02:a:d-5:responsibility:1",
          "spouse02:a:d-5:admission:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-5:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 1,
      "setFlags": [
        "d-5:surface:interjection_misbelief_escalation"
      ],
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

export default spouse02BeatsV2Full;
