export const friend06BeatsV2Full = {
  "caseId": "friend-06",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 58,
    "byActionFamily": {
      "question": 28,
      "evidence": 8,
      "fatigue": 6,
      "free_question": 4,
      "interjection": 12
    },
    "byIssueRole": {
      "core_truth": 46,
      "shared_misconception": 10,
      "sub_truth": 2
    },
    "byParty": {
      "b": 29,
      "a": 29
    },
    "interjectionCount": 12,
    "fatigueCount": 6,
    "coverageKeys": [
      "a:d-1:core:late:motive:motive",
      "a:d-1:core:late:rapport:emotion",
      "a:d-1:motive:mid:evidence:identity",
      "a:d-1:motive:mid:motive:motive",
      "a:d-1:motive:mid:pressure:responsibility",
      "a:d-1:surface:early:pressure:context",
      "a:d-1:surface:early:pressure:identity",
      "a:d-1:surface:early:pressure:timeline",
      "a:d-1:surface:mid:interjection:detail_rebuttal:block",
      "a:d-1:surface:mid:interjection:emotional_only:block",
      "a:d-2:core:late:rapport:emotion",
      "a:d-2:core:mid:fatigue:responsibility",
      "a:d-2:motive:mid:fatigue:responsibility",
      "a:d-2:motive:mid:fatigue:timeline",
      "a:d-2:motive:mid:motive:motive",
      "a:d-2:motive:mid:pressure:responsibility",
      "a:d-2:surface:early:evidence:context",
      "a:d-2:surface:early:pressure:context",
      "a:d-2:surface:early:pressure:identity",
      "a:d-2:surface:early:pressure:timeline",
      "a:d-2:surface:mid:interjection:detail_rebuttal:allow",
      "a:d-2:surface:mid:interjection:emotional_only:allow",
      "a:d-3:core:late:trap:context",
      "a:d-3:surface:early:evidence:context",
      "a:d-3:surface:early:trap:identity",
      "a:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "a:d-4:motive:mid:evidence:context",
      "b:d-1:core:late:rapport:emotion",
      "b:d-1:core:mid:fatigue:responsibility",
      "b:d-1:motive:mid:fatigue:responsibility",
      "b:d-1:motive:mid:fatigue:timeline",
      "b:d-1:motive:mid:motive:motive",
      "b:d-1:motive:mid:pressure:responsibility",
      "b:d-1:surface:early:evidence:context",
      "b:d-1:surface:early:pressure:context",
      "b:d-1:surface:early:pressure:identity",
      "b:d-1:surface:early:pressure:timeline",
      "b:d-1:surface:mid:interjection:detail_rebuttal:allow",
      "b:d-1:surface:mid:interjection:emotional_only:allow",
      "b:d-2:core:late:motive:motive",
      "b:d-2:core:late:rapport:emotion",
      "b:d-2:motive:mid:evidence:identity",
      "b:d-2:motive:mid:motive:motive",
      "b:d-2:motive:mid:pressure:responsibility",
      "b:d-2:surface:early:pressure:context",
      "b:d-2:surface:early:pressure:identity",
      "b:d-2:surface:early:pressure:timeline",
      "b:d-2:surface:mid:interjection:detail_rebuttal:block",
      "b:d-2:surface:mid:interjection:emotional_only:block",
      "b:d-3:core:late:trap:emotion",
      "b:d-3:motive:mid:evidence:identity",
      "b:d-3:surface:early:trap:context",
      "b:d-3:surface:mid:interjection:misbelief_escalation:block",
      "b:d-4:surface:early:evidence:legality"
    ]
  },
  "beats": [
    {
      "id": "friend06:beat_v2:b:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "순서부터 다시 보면 이 말로 가요. 나는 광고 표기와 가격 문구를 맞추느라 본문과 설명란을 정리한 거지 채널을 접수하려던 게 아니다.",
      "behaviorHint": "짧게 끊어 묻듯 응수하고, 상대가 길어지면 핵심 단어를 다시 세운다.",
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
          "friend06:b:d-1:s0:denial:0",
          "friend06:b:d-1:s0:justify:1"
        ],
        "forbidAtomIds": [
          "friend06:b:d-1:s5:confession:0"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:timeline",
      "coverageKey": "b:d-1:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:edit_range_named"
      ],
      "tags": [
        "hot",
        "timeline"
      ]
    },
    {
      "id": "friend06:beat_v2:b:d-1:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "그 말은 결국 자기 자리를 지키려는 쪽으로 들려요. 그때는 브랜드 요청이 급해서 공개 상태를 먼저 살려야 한다고 봤다.",
      "behaviorHint": "짧게 끊어 묻듯 응수하고, 상대가 길어지면 핵심 단어를 다시 세운다.",
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
          "friend06:b:d-1:s1:uncertainty:0",
          "friend06:b:d-1:s1:technical:1"
        ],
        "forbidAtomIds": [
          "friend06:b:d-1:s5:confession:0"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:identity",
      "coverageKey": "b:d-1:surface:early:pressure:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:edit_range_named"
      ],
      "tags": [
        "hot",
        "identity"
      ]
    },
    {
      "id": "friend06:beat_v2:b:d-1:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "앞뒤를 떼면 다르게 들려요. 직접 들어가 손본 건 맞지만 그걸 무단 점령처럼 부르는 건 과하다고 느꼈다. 그때는 브랜드 요청이 급해서 공개 상태를 먼저 살려야 한다고 봤다.",
      "behaviorHint": "짧게 끊어 묻듯 응수하고, 상대가 길어지면 핵심 단어를 다시 세운다.",
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
          "friend06:b:d-1:s1:uncertainty:0",
          "friend06:b:d-1:s1:technical:1"
        ],
        "forbidAtomIds": [
          "friend06:b:d-1:s5:confession:0"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:context",
      "coverageKey": "b:d-1:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:edit_range_named"
      ],
      "tags": [
        "hot",
        "context"
      ]
    },
    {
      "id": "friend06:beat_v2:a:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "순서부터 다시 보면 이 말로 가요. 다솔이 추가 확인 없이 블로그 본문과 유튜브 설명란을 직접 고쳤다.",
      "behaviorHint": "짧게 끊어 묻듯 응수하고, 상대가 길어지면 핵심 단어를 다시 세운다.",
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
          "friend06:a:d-1:s0:act:0",
          "friend06:a:d-1:s0:rule:1"
        ],
        "forbidAtomIds": [
          "friend06:a:d-1:s5:admission:0"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:timeline",
      "coverageKey": "a:d-1:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:edit_range_named"
      ],
      "tags": [
        "hot",
        "timeline"
      ]
    },
    {
      "id": "friend06:beat_v2:a:d-1:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "앞뒤를 떼면 다르게 들려요. 하지만 핀댓글 삭제까지 같이 일어난 건 단순 정정 범위를 벗어난다.",
      "behaviorHint": "짧게 끊어 묻듯 응수하고, 상대가 길어지면 핵심 단어를 다시 세운다.",
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
          "friend06:a:d-1:s1:context:0",
          "friend06:a:d-1:s1:act:1"
        ],
        "forbidAtomIds": [
          "friend06:a:d-1:s5:admission:0"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:context",
      "coverageKey": "a:d-1:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:edit_range_named"
      ],
      "tags": [
        "hot",
        "context"
      ]
    },
    {
      "id": "friend06:beat_v2:a:d-1:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "그 말은 결국 자기 자리를 지키려는 쪽으로 들려요. 광고 표기와 가격 문구가 급했다는 사정 자체는 안다. 하지만 핀댓글 삭제까지 같이 일어난 건 단순 정정 범위를 벗어난다.",
      "behaviorHint": "짧게 끊어 묻듯 응수하고, 상대가 길어지면 핵심 단어를 다시 세운다.",
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
          "friend06:a:d-1:s1:context:0",
          "friend06:a:d-1:s1:act:1"
        ],
        "forbidAtomIds": [
          "friend06:a:d-1:s5:admission:0"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:identity",
      "coverageKey": "a:d-1:surface:early:pressure:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:edit_range_named"
      ],
      "tags": [
        "hot",
        "identity"
      ]
    },
    {
      "id": "friend06:beat_v2:b:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "결국 그 선택 책임은 남아요. 본문과 설명란을 직접 수정한 건 맞다.",
      "behaviorHint": "짧게 끊어 묻듯 응수하고, 상대가 길어지면 핵심 단어를 다시 세운다.",
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
          "friend06:b:d-1:s2:admission:0",
          "friend06:b:d-1:s2:motive:1"
        ],
        "forbidAtomIds": [
          "friend06:b:d-1:s5:confession:0"
        ]
      },
      "weight": 6,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:pressure:responsibility",
      "coverageKey": "b:d-1:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-1:motive:control_loss_named"
      ],
      "tags": [
        "mid",
        "responsibility"
      ],
      "requiresFlags": [
        "d-1:surface:edit_range_named"
      ]
    },
    {
      "id": "friend06:beat_v2:b:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "explain",
      "line": "왜 그렇게 했는지는 이미 보이거든요. 핀댓글 삭제까지 같은 세션에서 일어난 건 내 쪽 작업 책임으로 봐야 한다.",
      "behaviorHint": "말끝을 늦추며 속내를 꺼내려다 스스로 정당화를 덧붙인다.",
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
          "friend06:b:d-1:s3:counter:0",
          "friend06:b:d-1:s3:scope:1"
        ],
        "forbidAtomIds": [
          "friend06:b:d-1:s5:confession:0"
        ]
      },
      "weight": 6,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:motive:motive",
      "coverageKey": "b:d-1:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-1:motive:control_loss_named"
      ],
      "tags": [
        "mid",
        "motive"
      ],
      "requiresFlags": [
        "d-1:surface:edit_range_named"
      ]
    },
    {
      "id": "friend06:beat_v2:a:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "결국 그 선택 책임은 남아요. 내가 바로 회신하지 못한 공백이 있었던 건 맞다.",
      "behaviorHint": "짧게 끊어 묻듯 응수하고, 상대가 길어지면 핵심 단어를 다시 세운다.",
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
          "friend06:a:d-1:s2:context:0",
          "friend06:a:d-1:s2:rule:1"
        ],
        "forbidAtomIds": [
          "friend06:a:d-1:s5:admission:0"
        ]
      },
      "weight": 6,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:pressure:responsibility",
      "coverageKey": "a:d-1:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-1:motive:control_loss_named"
      ],
      "tags": [
        "mid",
        "responsibility"
      ],
      "requiresFlags": [
        "d-1:surface:edit_range_named"
      ]
    },
    {
      "id": "friend06:beat_v2:a:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "explain",
      "line": "왜 그렇게 했는지는 이미 보이거든요. 같은 세션에서 제목·설명란·핀댓글이 연속으로 바뀐 화면은 채널이 통째로 건드려진 것처럼 보였다.",
      "behaviorHint": "말끝을 늦추며 속내를 꺼내려다 스스로 정당화를 덧붙인다.",
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
          "friend06:a:d-1:s3:rule:0",
          "friend06:a:d-1:s3:harm:1"
        ],
        "forbidAtomIds": [
          "friend06:a:d-1:s5:admission:0"
        ]
      },
      "weight": 6,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:motive:motive",
      "coverageKey": "a:d-1:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-1:motive:control_loss_named"
      ],
      "tags": [
        "mid",
        "motive"
      ],
      "requiresFlags": [
        "d-1:surface:edit_range_named"
      ]
    },
    {
      "id": "friend06:beat_v2:b:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "지금은 감정도 같이 남아 있어요. 밤새 수습한 사람처럼 느껴졌고 그래서 선을 넘는 순간을 스스로 못 봤다.",
      "behaviorHint": "목소리가 약간 낮아지고, 버티던 표정 사이로 감정이 먼저 새어 나온다.",
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
          "raw"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend06:b:d-1:s4:emotion:0",
          "friend06:b:d-1:s4:fear:1"
        ],
        "forbidAtomIds": [
          "friend06:b:d-1:s0:denial:0"
        ]
      },
      "weight": 5,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:rapport:emotion",
      "coverageKey": "b:d-1:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:direct_edit_open"
      ],
      "tags": [
        "late",
        "emotion"
      ],
      "requiresFlags": [
        "d-1:surface:edit_range_named",
        "d-1:motive:control_loss_named"
      ]
    },
    {
      "id": "friend06:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "지금은 감정도 같이 남아 있어요. 핀댓글이 사라진 화면을 본 순간 누가 내 채널 중심을 밀어낸 것처럼 느꼈다.",
      "behaviorHint": "목소리가 약간 낮아지고, 버티던 표정 사이로 감정이 먼저 새어 나온다.",
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
          "raw"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend06:a:d-1:s4:emotion:0",
          "friend06:a:d-1:s4:fear:1"
        ],
        "forbidAtomIds": [
          "friend06:a:d-1:s0:act:0"
        ]
      },
      "weight": 5,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:direct_edit_open"
      ],
      "tags": [
        "late",
        "emotion"
      ],
      "requiresFlags": [
        "d-1:surface:edit_range_named",
        "d-1:motive:control_loss_named"
      ]
    },
    {
      "id": "friend06:beat_v2:a:d-2:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "순서부터 다시 보면 이 말로 가요. 단톡에 올린 건 공개 비난이라기보다 이상 징후 공유였다.",
      "behaviorHint": "짧게 끊어 묻듯 응수하고, 상대가 길어지면 핵심 단어를 다시 세운다.",
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
          "friend06:a:d-2:s0:denial:0",
          "friend06:a:d-2:s0:justify:1"
        ],
        "forbidAtomIds": [
          "friend06:a:d-2:s5:confession:0"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:pressure:timeline",
      "coverageKey": "a:d-2:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:public_callout_named"
      ],
      "tags": [
        "hot",
        "timeline"
      ]
    },
    {
      "id": "friend06:beat_v2:a:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "앞뒤를 떼면 다르게 들려요. 접근권 회수도 감정 폭발이 아니라 손상 확산을 막는 임시 조치라고 여겼다.",
      "behaviorHint": "짧게 끊어 묻듯 응수하고, 상대가 길어지면 핵심 단어를 다시 세운다.",
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
          "friend06:a:d-2:s1:uncertainty:0",
          "friend06:a:d-2:s1:technical:1"
        ],
        "forbidAtomIds": [
          "friend06:a:d-2:s5:confession:0"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:pressure:context",
      "coverageKey": "a:d-2:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:public_callout_named"
      ],
      "tags": [
        "hot",
        "context"
      ]
    },
    {
      "id": "friend06:beat_v2:a:d-2:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "그 말은 결국 자기 자리를 지키려는 쪽으로 들려요. 비교 캡처를 올린 건 맞지만 다솔을 확정적으로 매도하려던 의도는 아니었다. 접근권 회수도 감정 폭발이 아니라 손상 확산을 막는 임시 조치라고 여겼다.",
      "behaviorHint": "짧게 끊어 묻듯 응수하고, 상대가 길어지면 핵심 단어를 다시 세운다.",
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
          "friend06:a:d-2:s1:uncertainty:0",
          "friend06:a:d-2:s1:technical:1"
        ],
        "forbidAtomIds": [
          "friend06:a:d-2:s5:confession:0"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:pressure:identity",
      "coverageKey": "a:d-2:surface:early:pressure:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:public_callout_named"
      ],
      "tags": [
        "hot",
        "identity"
      ]
    },
    {
      "id": "friend06:beat_v2:b:d-2:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "순서부터 다시 보면 이 말로 가요. 해온은 내 역할 권한부터 확인하지 않고 업계 단톡에 비교 캡처를 올려 나를 공개적으로 몰았다.",
      "behaviorHint": "짧게 끊어 묻듯 응수하고, 상대가 길어지면 핵심 단어를 다시 세운다.",
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
          "friend06:b:d-2:s0:act:0",
          "friend06:b:d-2:s0:rule:1"
        ],
        "forbidAtomIds": [
          "friend06:b:d-2:s5:admission:0"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:timeline",
      "coverageKey": "b:d-2:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:public_callout_named"
      ],
      "tags": [
        "hot",
        "timeline"
      ]
    },
    {
      "id": "friend06:beat_v2:b:d-2:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "그 말은 결국 자기 자리를 지키려는 쪽으로 들려요. 그래도 권한 확인 전에 단톡부터 올린 건 절차보다 낙인을 먼저 건 행동이다.",
      "behaviorHint": "짧게 끊어 묻듯 응수하고, 상대가 길어지면 핵심 단어를 다시 세운다.",
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
          "friend06:b:d-2:s1:context:0",
          "friend06:b:d-2:s1:act:1"
        ],
        "forbidAtomIds": [
          "friend06:b:d-2:s5:admission:0"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:identity",
      "coverageKey": "b:d-2:surface:early:pressure:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:public_callout_named"
      ],
      "tags": [
        "hot",
        "identity"
      ]
    },
    {
      "id": "friend06:beat_v2:b:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "앞뒤를 떼면 다르게 들려요. 바뀐 화면이 해온 눈엔 침범처럼 보였을 수 있다는 건 안다. 그래도 권한 확인 전에 단톡부터 올린 건 절차보다 낙인을 먼저 건 행동이다.",
      "behaviorHint": "짧게 끊어 묻듯 응수하고, 상대가 길어지면 핵심 단어를 다시 세운다.",
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
          "friend06:b:d-2:s1:context:0",
          "friend06:b:d-2:s1:act:1"
        ],
        "forbidAtomIds": [
          "friend06:b:d-2:s5:admission:0"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:context",
      "coverageKey": "b:d-2:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:public_callout_named"
      ],
      "tags": [
        "hot",
        "context"
      ]
    },
    {
      "id": "friend06:beat_v2:a:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "결국 그 선택 책임은 남아요. 권한 범위를 확인하기 전에 비교 캡처부터 단톡에 올린 건 맞다.",
      "behaviorHint": "짧게 끊어 묻듯 응수하고, 상대가 길어지면 핵심 단어를 다시 세운다.",
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
          "friend06:a:d-2:s2:admission:0",
          "friend06:a:d-2:s2:motive:1"
        ],
        "forbidAtomIds": [
          "friend06:a:d-2:s5:confession:0"
        ]
      },
      "weight": 6,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:pressure:responsibility",
      "coverageKey": "a:d-2:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-2:motive:face_panic_named"
      ],
      "tags": [
        "mid",
        "responsibility"
      ],
      "requiresFlags": [
        "d-2:surface:public_callout_named"
      ]
    },
    {
      "id": "friend06:beat_v2:a:d-2:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "explain",
      "line": "왜 그렇게 했는지는 이미 보이거든요. 회수는 문제 게시물 하나가 아니라 블로그와 채널 전체에 걸렸다.",
      "behaviorHint": "말끝을 늦추며 속내를 꺼내려다 스스로 정당화를 덧붙인다.",
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
          "friend06:a:d-2:s3:counter:0",
          "friend06:a:d-2:s3:scope:1"
        ],
        "forbidAtomIds": [
          "friend06:a:d-2:s5:confession:0"
        ]
      },
      "weight": 6,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:motive:motive",
      "coverageKey": "a:d-2:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-2:motive:face_panic_named"
      ],
      "tags": [
        "mid",
        "motive"
      ],
      "requiresFlags": [
        "d-2:surface:public_callout_named"
      ]
    },
    {
      "id": "friend06:beat_v2:b:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "결국 그 선택 책임은 남아요. 내가 공동 스레드 없이 직접 수정한 문제가 있었던 건 맞다.",
      "behaviorHint": "짧게 끊어 묻듯 응수하고, 상대가 길어지면 핵심 단어를 다시 세운다.",
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
          "friend06:b:d-2:s2:context:0",
          "friend06:b:d-2:s2:rule:1"
        ],
        "forbidAtomIds": [
          "friend06:b:d-2:s5:admission:0"
        ]
      },
      "weight": 6,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:pressure:responsibility",
      "coverageKey": "b:d-2:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-2:motive:face_panic_named"
      ],
      "tags": [
        "mid",
        "responsibility"
      ],
      "requiresFlags": [
        "d-2:surface:public_callout_named"
      ]
    },
    {
      "id": "friend06:beat_v2:b:d-2:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "explain",
      "line": "왜 그렇게 했는지는 이미 보이거든요. 그 메시지는 내가 남의 채널에 기어든 사람처럼 읽히게 만들었다.",
      "behaviorHint": "말끝을 늦추며 속내를 꺼내려다 스스로 정당화를 덧붙인다.",
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
          "friend06:b:d-2:s3:rule:0",
          "friend06:b:d-2:s3:harm:1"
        ],
        "forbidAtomIds": [
          "friend06:b:d-2:s5:admission:0"
        ]
      },
      "weight": 6,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:motive:motive",
      "coverageKey": "b:d-2:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-2:motive:face_panic_named"
      ],
      "tags": [
        "mid",
        "motive"
      ],
      "requiresFlags": [
        "d-2:surface:public_callout_named"
      ]
    },
    {
      "id": "friend06:beat_v2:a:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "지금은 감정도 같이 남아 있어요. 업계방에서 내가 채널도 못 지키는 창작자로 보일까 봐 겁이 났다.",
      "behaviorHint": "목소리가 약간 낮아지고, 버티던 표정 사이로 감정이 먼저 새어 나온다.",
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
          "raw"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend06:a:d-2:s4:emotion:0",
          "friend06:a:d-2:s4:fear:1"
        ],
        "forbidAtomIds": [
          "friend06:a:d-2:s0:denial:0"
        ]
      },
      "weight": 5,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:core:rapport:emotion",
      "coverageKey": "a:d-2:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-2:core:shaming_open"
      ],
      "tags": [
        "late",
        "emotion"
      ],
      "requiresFlags": [
        "d-2:surface:public_callout_named",
        "d-2:motive:face_panic_named"
      ]
    },
    {
      "id": "friend06:beat_v2:b:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "지금은 감정도 같이 남아 있어요. 단톡에 이름이 오르내리는 순간 내 선의가 통째로 침입으로 번역된 느낌이었다.",
      "behaviorHint": "목소리가 약간 낮아지고, 버티던 표정 사이로 감정이 먼저 새어 나온다.",
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
          "raw"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend06:b:d-2:s4:emotion:0",
          "friend06:b:d-2:s4:fear:1"
        ],
        "forbidAtomIds": [
          "friend06:b:d-2:s0:act:0"
        ]
      },
      "weight": 5,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:core:rapport:emotion",
      "coverageKey": "b:d-2:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-2:core:shaming_open"
      ],
      "tags": [
        "late",
        "emotion"
      ],
      "requiresFlags": [
        "d-2:surface:public_callout_named",
        "d-2:motive:face_panic_named"
      ]
    },
    {
      "id": "friend06:beat_v2:b:d-1:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "clarify",
      "line": "이 기록을 붙이면 빠진 맥락이 보여요. 직접 들어가 손본 건 맞지만 그걸 무단 점령처럼 부르는 건 과하다고 느꼈다. 그때는 브랜드 요청이 급해서 공개 상태를 먼저 살려야 한다고 봤다.",
      "behaviorHint": "기록 쪽을 힐끗 보고 난 뒤 변명보다 해석을 먼저 붙인다.",
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
          "friend06:b:d-1:s1:uncertainty:0",
          "friend06:b:d-1:s1:technical:1"
        ],
        "forbidAtomIds": [
          "friend06:b:d-1:s5:confession:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:evidence:context",
      "coverageKey": "b:d-1:surface:early:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-1:surface:edit_range_named"
      ],
      "tags": [
        "evidence",
        "context"
      ]
    },
    {
      "id": "friend06:beat_v2:a:d-1:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "clarify",
      "line": "화면만이 아니라 누가 어떤 자리를 지키려 했는지도 드러나요. 내가 바로 회신하지 못한 공백이 있었던 건 맞다. 그래도 공동 스레드에 먼저 남기고 최종 확인을 받는 순서는 지켰어야 했다.",
      "behaviorHint": "기록 쪽을 힐끗 보고 난 뒤 변명보다 해석을 먼저 붙인다.",
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
          "friend06:a:d-1:s2:context:0",
          "friend06:a:d-1:s2:rule:1"
        ],
        "forbidAtomIds": [
          "friend06:a:d-1:s5:admission:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:evidence:identity",
      "coverageKey": "a:d-1:motive:mid:evidence:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:control_loss_named"
      ],
      "tags": [
        "evidence",
        "identity"
      ],
      "requiresFlags": [
        "d-1:surface:edit_range_named"
      ]
    },
    {
      "id": "friend06:beat_v2:a:d-2:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "clarify",
      "line": "이 기록을 붙이면 빠진 맥락이 보여요. 비교 캡처를 올린 건 맞지만 다솔을 확정적으로 매도하려던 의도는 아니었다. 접근권 회수도 감정 폭발이 아니라 손상 확산을 막는 임시 조치라고 여겼다.",
      "behaviorHint": "기록 쪽을 힐끗 보고 난 뒤 변명보다 해석을 먼저 붙인다.",
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
          "friend06:a:d-2:s1:uncertainty:0",
          "friend06:a:d-2:s1:technical:1"
        ],
        "forbidAtomIds": [
          "friend06:a:d-2:s5:confession:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:evidence:context",
      "coverageKey": "a:d-2:surface:early:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:public_callout_named"
      ],
      "tags": [
        "evidence",
        "context"
      ]
    },
    {
      "id": "friend06:beat_v2:b:d-2:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "clarify",
      "line": "화면만이 아니라 누가 어떤 자리를 지키려 했는지도 드러나요. 내가 공동 스레드 없이 직접 수정한 문제가 있었던 건 맞다. 그렇다고 바로 업계방 비교 캡처와 전체 접근권 회수가 정당화되진 않는다.",
      "behaviorHint": "기록 쪽을 힐끗 보고 난 뒤 변명보다 해석을 먼저 붙인다.",
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
          "friend06:b:d-2:s2:context:0",
          "friend06:b:d-2:s2:rule:1"
        ],
        "forbidAtomIds": [
          "friend06:b:d-2:s5:admission:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:evidence:identity",
      "coverageKey": "b:d-2:motive:mid:evidence:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:face_panic_named"
      ],
      "tags": [
        "evidence",
        "identity"
      ],
      "requiresFlags": [
        "d-2:surface:public_callout_named"
      ]
    },
    {
      "id": "friend06:beat_v2:a:d-3:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "clarify",
      "line": "이 기록을 붙이면 빠진 맥락이 보여요. 형식상 편집자나 매니저로 보일 수는 있어도 실제 운용 범위는 훨씬 좁게 이해했다. 모바일의 '함께 수정' 같은 라벨이 제안권처럼 읽혀서 그렇게 받아들였다.",
      "behaviorHint": "기록 쪽을 힐끗 보고 난 뒤 변명보다 해석을 먼저 붙인다.",
      "applicableStates": [
        "S0",
        "S1"
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
          "friend06:a:d-3:s1:uncertainty:0",
          "friend06:a:d-3:s1:technical:1"
        ],
        "forbidAtomIds": [
          "friend06:a:d-3:s5:confession:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:evidence:context",
      "coverageKey": "a:d-3:surface:early:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-3:surface:role_scope_named"
      ],
      "tags": [
        "evidence",
        "context"
      ]
    },
    {
      "id": "friend06:beat_v2:b:d-3:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "clarify",
      "line": "화면만이 아니라 누가 어떤 자리를 지키려 했는지도 드러나요. 브랜드가 여섯 시간째 답을 못 받자 내게 직접 연락한 상황도 있었다. 그래도 공동 스레드 없이 라이브 게시물에 바로 들어간 건 범위 확인 절차를 건너뛴 행동이다.",
      "behaviorHint": "기록 쪽을 힐끗 보고 난 뒤 변명보다 해석을 먼저 붙인다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "shared_misconception",
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
          "friend06:b:d-3:s2:context:0",
          "friend06:b:d-3:s2:rule:1"
        ],
        "forbidAtomIds": [
          "friend06:b:d-3:s5:admission:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:evidence:identity",
      "coverageKey": "b:d-3:motive:mid:evidence:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-3:motive:boundary_gap_named"
      ],
      "tags": [
        "evidence",
        "identity"
      ],
      "requiresFlags": [
        "d-3:surface:role_scope_named"
      ]
    },
    {
      "id": "friend06:beat_v2:b:d-4:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "clarify",
      "line": "문서와 로그를 같이 보면 규칙선이 분명해져요. 요청서에 그 항목이 직접 적히진 않았지만 결과를 살리려면 연결해서 보정해야 한다고 느꼈다. 나는 그걸 새 창작이라기보다 게시물 정리라고 스스로 불렀다.",
      "behaviorHint": "기록 쪽을 힐끗 보고 난 뒤 변명보다 해석을 먼저 붙인다.",
      "applicableStates": [
        "S0",
        "S1"
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
          "friend06:b:d-4:s1:uncertainty:0",
          "friend06:b:d-4:s1:technical:1"
        ],
        "forbidAtomIds": [
          "friend06:b:d-4:s5:confession:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:surface:evidence:legality",
      "coverageKey": "b:d-4:surface:early:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-4:surface:request_scope_named"
      ],
      "tags": [
        "evidence",
        "legality"
      ]
    },
    {
      "id": "friend06:beat_v2:a:d-4:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "clarify",
      "line": "이 기록을 붙이면 빠진 맥락이 보여요. 내가 여섯 시간째 회신을 못 한 공백은 있었다. 그럴수록 공동 스레드에 요청 원문을 붙여 두고 범위를 확인했어야 했다.",
      "behaviorHint": "기록 쪽을 힐끗 보고 난 뒤 변명보다 해석을 먼저 붙인다.",
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
          "friend06:a:d-4:s2:context:0",
          "friend06:a:d-4:s2:rule:1"
        ],
        "forbidAtomIds": [
          "friend06:a:d-4:s5:admission:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:evidence:context",
      "coverageKey": "a:d-4:motive:mid:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-4:motive:result_first_named"
      ],
      "tags": [
        "evidence",
        "context"
      ],
      "requiresFlags": [
        "d-4:surface:request_scope_named"
      ]
    },
    {
      "id": "friend06:beat_v2:b:d-1:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "irritated",
      "line": "같은 대답을 몇 번이나 반복하게 하지 마. 본문과 설명란을 직접 수정한 건 맞다.",
      "behaviorHint": "호흡이 거칠어지고 같은 설명을 반복하는 피로가 드러난다.",
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
          "friend06:b:d-1:s2:admission:0",
          "friend06:b:d-1:s2:motive:1"
        ],
        "forbidAtomIds": [
          "friend06:b:d-1:s5:confession:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:fatigue:timeline",
      "coverageKey": "b:d-1:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:control_loss_named"
      ],
      "tags": [
        "fatigue",
        "timeline"
      ],
      "requiresFlags": [
        "d-1:surface:edit_range_named"
      ]
    },
    {
      "id": "friend06:beat_v2:b:d-1:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "block",
      "line": "그 얘기 세 번째야. 더 돌려 말하고 싶지 않아. 핀댓글 삭제까지 같은 세션에서 일어난 건 내 쪽 작업 책임으로 봐야 한다.",
      "behaviorHint": "호흡이 거칠어지고 같은 설명을 반복하는 피로가 드러난다.",
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
          "friend06:b:d-1:s3:counter:0",
          "friend06:b:d-1:s3:scope:1"
        ],
        "forbidAtomIds": [
          "friend06:b:d-1:s5:confession:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:fatigue:responsibility",
      "coverageKey": "b:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:control_loss_named"
      ],
      "tags": [
        "fatigue",
        "responsibility"
      ],
      "requiresFlags": [
        "d-1:surface:edit_range_named"
      ]
    },
    {
      "id": "friend06:beat_v2:b:d-1:core:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "counter",
      "line": "같은 대답을 몇 번이나 반복하게 하지 마. 밤새 수습한 사람처럼 느껴졌고 그래서 선을 넘는 순간을 스스로 못 봤다.",
      "behaviorHint": "호흡이 거칠어지고 같은 설명을 반복하는 피로가 드러난다.",
      "applicableStates": [
        "S3",
        "S4"
      ],
      "layer": "core",
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
          "friend06:b:d-1:s4:emotion:0",
          "friend06:b:d-1:s4:fear:1"
        ],
        "forbidAtomIds": [
          "friend06:b:d-1:s5:confession:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:fatigue:responsibility",
      "coverageKey": "b:d-1:core:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-1:core:direct_edit_open"
      ],
      "tags": [
        "fatigue",
        "responsibility"
      ],
      "requiresFlags": [
        "d-1:surface:edit_range_named",
        "d-1:motive:control_loss_named"
      ]
    },
    {
      "id": "friend06:beat_v2:a:d-2:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "irritated",
      "line": "같은 대답을 몇 번이나 반복하게 하지 마. 권한 범위를 확인하기 전에 비교 캡처부터 단톡에 올린 건 맞다.",
      "behaviorHint": "호흡이 거칠어지고 같은 설명을 반복하는 피로가 드러난다.",
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
          "friend06:a:d-2:s2:admission:0",
          "friend06:a:d-2:s2:motive:1"
        ],
        "forbidAtomIds": [
          "friend06:a:d-2:s5:confession:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:fatigue:timeline",
      "coverageKey": "a:d-2:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:face_panic_named"
      ],
      "tags": [
        "fatigue",
        "timeline"
      ],
      "requiresFlags": [
        "d-2:surface:public_callout_named"
      ]
    },
    {
      "id": "friend06:beat_v2:a:d-2:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "block",
      "line": "그 얘기 세 번째야. 더 돌려 말하고 싶지 않아. 회수는 문제 게시물 하나가 아니라 블로그와 채널 전체에 걸렸다.",
      "behaviorHint": "호흡이 거칠어지고 같은 설명을 반복하는 피로가 드러난다.",
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
          "friend06:a:d-2:s3:counter:0",
          "friend06:a:d-2:s3:scope:1"
        ],
        "forbidAtomIds": [
          "friend06:a:d-2:s5:confession:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:fatigue:responsibility",
      "coverageKey": "a:d-2:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:face_panic_named"
      ],
      "tags": [
        "fatigue",
        "responsibility"
      ],
      "requiresFlags": [
        "d-2:surface:public_callout_named"
      ]
    },
    {
      "id": "friend06:beat_v2:a:d-2:core:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "counter",
      "line": "같은 대답을 몇 번이나 반복하게 하지 마. 업계방에서 내가 채널도 못 지키는 창작자로 보일까 봐 겁이 났다.",
      "behaviorHint": "호흡이 거칠어지고 같은 설명을 반복하는 피로가 드러난다.",
      "applicableStates": [
        "S3",
        "S4"
      ],
      "layer": "core",
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
          "friend06:a:d-2:s4:emotion:0",
          "friend06:a:d-2:s4:fear:1"
        ],
        "forbidAtomIds": [
          "friend06:a:d-2:s5:confession:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:core:fatigue:responsibility",
      "coverageKey": "a:d-2:core:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-2:core:shaming_open"
      ],
      "tags": [
        "fatigue",
        "responsibility"
      ],
      "requiresFlags": [
        "d-2:surface:public_callout_named",
        "d-2:motive:face_panic_named"
      ]
    },
    {
      "id": "friend06:beat_v2:b:d-1:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "open_up",
      "line": "감정까지 묻는다면 여기서 숨기진 않을게요. 밤새 수습한 사람처럼 느껴졌고 그래서 선을 넘는 순간을 스스로 못 봤다.",
      "behaviorHint": "목소리가 약간 낮아지고, 버티던 표정 사이로 감정이 먼저 새어 나온다.",
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
          "raw"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend06:b:d-1:s4:emotion:0",
          "friend06:b:d-1:s4:fear:1"
        ],
        "forbidAtomIds": [
          "friend06:b:d-1:s0:denial:0"
        ]
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:rapport:emotion",
      "coverageKey": "b:d-1:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:direct_edit_open"
      ],
      "tags": [
        "free_question",
        "emotion"
      ],
      "requiresFlags": [
        "d-1:surface:edit_range_named",
        "d-1:motive:control_loss_named"
      ]
    },
    {
      "id": "friend06:beat_v2:a:d-1:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confess",
      "line": "직접 묻는다면 돌리지 않고 말할게요. 광고 수정 압박이 있었다는 점은 알지만 직접 수정과 핀댓글 삭제 책임은 다솔 쪽이 더 크다.",
      "behaviorHint": "말끝을 늦추며 속내를 꺼내려다 스스로 정당화를 덧붙인다.",
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
          "raw"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend06:a:d-1:s5:admission:0",
          "friend06:a:d-1:s5:resolution:1"
        ],
        "forbidAtomIds": [
          "friend06:a:d-1:s0:act:0"
        ]
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:motive:motive",
      "coverageKey": "a:d-1:core:late:motive:motive",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:direct_edit_open"
      ],
      "tags": [
        "free_question",
        "motive"
      ],
      "requiresFlags": [
        "d-1:surface:edit_range_named",
        "d-1:motive:control_loss_named"
      ]
    },
    {
      "id": "friend06:beat_v2:a:d-2:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "open_up",
      "line": "감정까지 묻는다면 여기서 숨기진 않을게요. 업계방에서 내가 채널도 못 지키는 창작자로 보일까 봐 겁이 났다.",
      "behaviorHint": "목소리가 약간 낮아지고, 버티던 표정 사이로 감정이 먼저 새어 나온다.",
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
          "raw"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend06:a:d-2:s4:emotion:0",
          "friend06:a:d-2:s4:fear:1"
        ],
        "forbidAtomIds": [
          "friend06:a:d-2:s0:denial:0"
        ]
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:core:rapport:emotion",
      "coverageKey": "a:d-2:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-2:core:shaming_open"
      ],
      "tags": [
        "free_question",
        "emotion"
      ],
      "requiresFlags": [
        "d-2:surface:public_callout_named",
        "d-2:motive:face_panic_named"
      ]
    },
    {
      "id": "friend06:beat_v2:b:d-2:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confess",
      "line": "직접 묻는다면 돌리지 않고 말할게요. 내 직접 수정 문제와 별개로 공개 비난과 전면 차단 책임은 해온 쪽이 더 크다.",
      "behaviorHint": "말끝을 늦추며 속내를 꺼내려다 스스로 정당화를 덧붙인다.",
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
          "raw"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend06:b:d-2:s5:admission:0",
          "friend06:b:d-2:s5:resolution:1"
        ],
        "forbidAtomIds": [
          "friend06:b:d-2:s0:act:0"
        ]
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:core:motive:motive",
      "coverageKey": "b:d-2:core:late:motive:motive",
      "variantTarget": 2,
      "setFlags": [
        "d-2:core:shaming_open"
      ],
      "tags": [
        "free_question",
        "motive"
      ],
      "requiresFlags": [
        "d-2:surface:public_callout_named",
        "d-2:motive:face_panic_named"
      ]
    },
    {
      "id": "friend06:beat_v2:a:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "misread",
      "line": "그 말은 결국 자기 자리를 지키려는 쪽으로 들려요. 다솔에게 공개 수정까지 허용한 적은 없었다.",
      "behaviorHint": "확신과 혼란이 뒤섞여 같은 포인트를 붙잡고 버틴다.",
      "applicableStates": [
        "S0",
        "S1"
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
          "friend06:a:d-3:s0:denial:0",
          "friend06:a:d-3:s0:justify:1"
        ],
        "forbidAtomIds": [
          "friend06:a:d-3:s5:confession:0"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:identity",
      "coverageKey": "a:d-3:surface:early:trap:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-3:surface:role_scope_named"
      ],
      "tags": [
        "hot",
        "identity",
        "shared_misconception"
      ],
      "beliefMode": "misbelief"
    },
    {
      "id": "friend06:beat_v2:b:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "misread",
      "line": "앞뒤를 떼면 다르게 들려요. 다만 그 권한이 어디까지 허용되는지는 나도 정확히 읽지 못했다. 모바일의 '함께 수정' 같은 표시를 공개 수정 가능으로 받아들인 건 내 쪽 오독이었다.",
      "behaviorHint": "확신과 혼란이 뒤섞여 같은 포인트를 붙잡고 버틴다.",
      "applicableStates": [
        "S0",
        "S1"
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
          "friend06:b:d-3:s1:uncertainty:0",
          "friend06:b:d-3:s1:admission:1"
        ],
        "forbidAtomIds": [
          "friend06:b:d-3:s5:admission:0"
        ]
      },
      "weight": 7,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:context",
      "coverageKey": "b:d-3:surface:early:trap:context",
      "variantTarget": 6,
      "setFlags": [
        "d-3:surface:role_scope_named"
      ],
      "tags": [
        "hot",
        "context",
        "shared_misconception"
      ],
      "beliefMode": "misbelief"
    },
    {
      "id": "friend06:beat_v2:a:d-3:core:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "doubt",
      "line": "앞뒤를 떼면 다르게 들려요. 내가 준 권한도 정확히 모른 채 무단 침입이라고 몰아간 모양새가 제일 창피하다.",
      "behaviorHint": "확신과 혼란이 뒤섞여 같은 포인트를 붙잡고 버틴다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "question",
      "questionTypes": [
        "motive_search"
      ],
      "conditions": {
        "emotionTiers": [
          "strained",
          "raw"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ],
        "misconceptionStates": [
          "M3",
          "M4"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend06:a:d-3:s4:emotion:0",
          "friend06:a:d-3:s4:fear:1"
        ],
        "forbidAtomIds": [
          "friend06:a:d-3:s0:denial:0"
        ]
      },
      "weight": 5,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:trap:context",
      "coverageKey": "a:d-3:core:late:trap:context",
      "variantTarget": 2,
      "setFlags": [
        "d-3:core:permission_reset"
      ],
      "tags": [
        "late",
        "context",
        "shared_misconception"
      ],
      "requiresFlags": [
        "d-3:surface:role_scope_named",
        "d-3:motive:boundary_gap_named"
      ],
      "beliefMode": "misbelief"
    },
    {
      "id": "friend06:beat_v2:b:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "clarify",
      "line": "지금은 감정도 같이 남아 있어요. 무단 침입은 아니었지만 권한 범위를 확인하지 않은 채 직접 수정한 책임은 내게 있다.",
      "behaviorHint": "확신과 혼란이 뒤섞여 같은 포인트를 붙잡고 버틴다.",
      "applicableStates": [
        "S4",
        "S5"
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
          "raw"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ],
        "misconceptionStates": [
          "M3",
          "M4"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend06:b:d-3:s5:admission:0",
          "friend06:b:d-3:s5:resolution:1"
        ],
        "forbidAtomIds": [
          "friend06:b:d-3:s0:identity:0"
        ]
      },
      "weight": 5,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:trap:emotion",
      "coverageKey": "b:d-3:core:late:trap:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-3:core:permission_reset"
      ],
      "tags": [
        "late",
        "emotion",
        "shared_misconception"
      ],
      "requiresFlags": [
        "d-3:surface:role_scope_named",
        "d-3:motive:boundary_gap_named"
      ],
      "beliefMode": "misbelief"
    },
    {
      "id": "friend06:beat_v2:b:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "잠깐만, 그 말은 너무 쉽게 지나가요. 밤새 수습한 사람처럼 느껴졌고 그래서 선을 넘는 순간을 스스로 못 봤다.",
      "behaviorHint": "본선 대사 사이를 끊고 끼어들며, 감정과 사실선이 순간적으로 튀어나온다.",
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
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend06:b:d-1:s4:emotion:0",
          "friend06:b:d-1:s4:fear:1"
        ],
        "forbidAtomIds": [
          "friend06:b:d-1:s5:confession:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-1:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:edit_range_named"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "friend06:beat_v2:a:d-1:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "감정부터 던지면 사실이 흐려져. 그래도 공동 스레드에 먼저 남기고 최종 확인을 받는 순서는 지켰어야 했다.",
      "behaviorHint": "본선 대사 사이를 끊고 끼어들며, 감정과 사실선이 순간적으로 튀어나온다.",
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
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend06:a:d-1:s3:rule:0",
          "friend06:a:d-1:s3:harm:1"
        ],
        "forbidAtomIds": [
          "friend06:a:d-1:s5:admission:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-1:surface:mid:interjection:emotional_only:block",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:edit_range_named"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "friend06:beat_v2:a:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "잠깐만, 그 말은 너무 쉽게 지나가요. 업계방에서 내가 채널도 못 지키는 창작자로 보일까 봐 겁이 났다.",
      "behaviorHint": "본선 대사 사이를 끊고 끼어들며, 감정과 사실선이 순간적으로 튀어나온다.",
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
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend06:a:d-2:s4:emotion:0",
          "friend06:a:d-2:s4:fear:1"
        ],
        "forbidAtomIds": [
          "friend06:a:d-2:s5:confession:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-2:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:public_callout_named"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "friend06:beat_v2:b:d-2:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "감정부터 던지면 사실이 흐려져. 그렇다고 바로 업계방 비교 캡처와 전체 접근권 회수가 정당화되진 않는다.",
      "behaviorHint": "본선 대사 사이를 끊고 끼어들며, 감정과 사실선이 순간적으로 튀어나온다.",
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
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend06:b:d-2:s3:rule:0",
          "friend06:b:d-2:s3:harm:1"
        ],
        "forbidAtomIds": [
          "friend06:b:d-2:s5:admission:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-2:surface:mid:interjection:emotional_only:block",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:public_callout_named"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "friend06:beat_v2:b:d-1:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "세부를 바로잡아야 해. 다만 해온이 바로 답을 줬다면 나는 거기까지 안 갔을 거다.",
      "behaviorHint": "본선 대사 사이를 끊고 끼어들며, 감정과 사실선이 순간적으로 튀어나온다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "timeline",
      "actionFamily": "interjection",
      "questionTypes": [],
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
        ],
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend06:b:d-1:s3:counter:0",
          "friend06:b:d-1:s3:scope:1"
        ],
        "forbidAtomIds": [
          "friend06:b:d-1:s5:confession:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-1:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:edit_range_named"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "friend06:beat_v2:a:d-1:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "디테일을 흩뿌려도 핵심은 안 바뀌어. 내가 바로 회신하지 못한 공백이 있었던 건 맞다.",
      "behaviorHint": "본선 대사 사이를 끊고 끼어들며, 감정과 사실선이 순간적으로 튀어나온다.",
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
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend06:a:d-1:s2:context:0",
          "friend06:a:d-1:s2:rule:1"
        ],
        "forbidAtomIds": [
          "friend06:a:d-1:s5:admission:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-1:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:edit_range_named"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "friend06:beat_v2:a:d-2:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "세부를 바로잡아야 해. 다만 다솔이 공동 스레드만 지켰다면 내가 업계 단톡까지 끌고 갈 일도 줄었을 거다.",
      "behaviorHint": "본선 대사 사이를 끊고 끼어들며, 감정과 사실선이 순간적으로 튀어나온다.",
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
        ],
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend06:a:d-2:s3:counter:0",
          "friend06:a:d-2:s3:scope:1"
        ],
        "forbidAtomIds": [
          "friend06:a:d-2:s5:confession:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-2:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:public_callout_named"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "friend06:beat_v2:b:d-2:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "디테일을 흩뿌려도 핵심은 안 바뀌어. 내가 공동 스레드 없이 직접 수정한 문제가 있었던 건 맞다.",
      "behaviorHint": "본선 대사 사이를 끊고 끼어들며, 감정과 사실선이 순간적으로 튀어나온다.",
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
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend06:b:d-2:s2:context:0",
          "friend06:b:d-2:s2:rule:1"
        ],
        "forbidAtomIds": [
          "friend06:b:d-2:s5:admission:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-2:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:public_callout_named"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "friend06:beat_v2:a:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "그 오해가 지금 더 커지고 있어. 블로그 편집자 초대와 유튜브 매니저 권한이 실제로 부여된 건 맞다.",
      "behaviorHint": "본선 대사 사이를 끊고 끼어들며, 감정과 사실선이 순간적으로 튀어나온다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "interjection",
      "questionTypes": [],
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
        ],
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
          "friend06:a:d-3:s2:admission:0",
          "friend06:a:d-3:s2:motive:1"
        ],
        "forbidAtomIds": [
          "friend06:a:d-3:s5:confession:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:role_scope_named"
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
      "id": "friend06:beat_v2:b:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "그 해석부터 멈춰. 브랜드가 여섯 시간째 답을 못 받자 내게 직접 연락한 상황도 있었다.",
      "behaviorHint": "본선 대사 사이를 끊고 끼어들며, 감정과 사실선이 순간적으로 튀어나온다.",
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
        ],
        "interjectionStates": [
          "block_last_turn"
        ],
        "misconceptionStates": [
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend06:b:d-3:s2:context:0",
          "friend06:b:d-3:s2:rule:1"
        ],
        "forbidAtomIds": [
          "friend06:b:d-3:s5:admission:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:role_scope_named"
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
      "id": "friend06:beat_v2:a:d-3:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "그 오해가 지금 더 커지고 있어. 그래도 브랜드 요청이 오면 공동 스레드부터 열어서 범위를 맞췄어야 했다.",
      "behaviorHint": "본선 대사 사이를 끊고 끼어들며, 감정과 사실선이 순간적으로 튀어나온다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "interjection",
      "questionTypes": [],
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
        ],
        "interjectionStates": [
          "allow_last_turn"
        ],
        "misconceptionStates": [
          "M2",
          "M3"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend06:a:d-3:s3:counter:0",
          "friend06:a:d-3:s3:scope:1"
        ],
        "forbidAtomIds": [
          "friend06:a:d-3:s5:confession:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:role_scope_named"
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
      "id": "friend06:beat_v2:b:d-3:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "그 해석부터 멈춰. 내가 가진 권한을 증명해야 하는 순간 자체가 이미 침입자 취급처럼 느껴졌다.",
      "behaviorHint": "본선 대사 사이를 끊고 끼어들며, 감정과 사실선이 순간적으로 튀어나온다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "emotion",
      "actionFamily": "interjection",
      "questionTypes": [],
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
        ],
        "interjectionStates": [
          "block_last_turn"
        ],
        "misconceptionStates": [
          "M3",
          "M4"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "friend06:b:d-3:s4:emotion:0",
          "friend06:b:d-3:s4:fear:1"
        ],
        "forbidAtomIds": [
          "friend06:b:d-3:s5:admission:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:role_scope_named"
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

export default friend06BeatsV2Full;
