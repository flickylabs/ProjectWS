export const neighbor02BeatsV2Full = {
  "caseId": "neighbor-02",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 61,
    "byActionFamily": {
      "question": 34,
      "evidence": 5,
      "fatigue": 6,
      "free_question": 4,
      "interjection": 12
    },
    "byParty": {
      "a": 29,
      "b": 32
    },
    "byDispute": {
      "d-1": 13,
      "d-4": 8,
      "d-5": 20,
      "d-2": 13,
      "d-3": 7
    },
    "interjectionCount": 12,
    "fatigueCount": 6,
    "freeQuestionCount": 4,
    "coverageKeyCount": 59,
    "coverageKeys": [
      "a:d-1:core:late:motive:motive",
      "a:d-1:core:late:rapport:emotion",
      "a:d-1:motive:mid:fatigue:responsibility",
      "a:d-1:motive:mid:motive:motive",
      "a:d-1:motive:mid:pressure:responsibility",
      "a:d-1:surface:early:pressure:context",
      "a:d-1:surface:early:pressure:identity",
      "a:d-1:surface:early:pressure:timeline",
      "a:d-1:surface:mid:evidence:identity",
      "a:d-1:surface:mid:fatigue:responsibility",
      "a:d-1:surface:mid:fatigue:timeline",
      "a:d-1:surface:mid:interjection:detail_rebuttal:allow",
      "a:d-1:surface:mid:interjection:emotional_only:allow",
      "a:d-4:core:late:trap:emotion",
      "a:d-4:motive:late:trap:context",
      "a:d-4:surface:early:trap:context",
      "a:d-4:surface:early:trap:identity",
      "a:d-4:surface:mid:interjection:misbelief_escalation:allow",
      "a:d-4:surface:mid:interjection:trap_signal:block",
      "a:d-5:core:late:rapport:emotion",
      "a:d-5:motive:mid:motive:motive",
      "a:d-5:motive:mid:pressure:responsibility",
      "a:d-5:surface:early:pressure:context",
      "a:d-5:surface:early:pressure:identity",
      "a:d-5:surface:early:pressure:timeline",
      "a:d-5:surface:mid:evidence:legality",
      "a:d-5:surface:mid:interjection:detail_rebuttal:block",
      "a:d-5:surface:mid:interjection:emotional_only:block",
      "b:d-2:core:late:motive:motive",
      "b:d-2:core:late:rapport:emotion",
      "b:d-2:motive:mid:fatigue:responsibility",
      "b:d-2:motive:mid:motive:motive",
      "b:d-2:motive:mid:pressure:responsibility",
      "b:d-2:surface:early:pressure:context",
      "b:d-2:surface:early:pressure:identity",
      "b:d-2:surface:early:pressure:timeline",
      "b:d-2:surface:mid:evidence:identity",
      "b:d-2:surface:mid:fatigue:responsibility",
      "b:d-2:surface:mid:fatigue:timeline",
      "b:d-2:surface:mid:interjection:detail_rebuttal:allow",
      "b:d-2:surface:mid:interjection:emotional_only:allow",
      "b:d-3:core:late:rapport:emotion",
      "b:d-3:motive:mid:motive:motive",
      "b:d-3:motive:mid:pressure:responsibility",
      "b:d-3:surface:early:pressure:context",
      "b:d-3:surface:early:pressure:identity",
      "b:d-3:surface:early:pressure:timeline",
      "b:d-3:surface:mid:evidence:context",
      "b:d-4:surface:mid:interjection:misbelief_escalation:block",
      "b:d-4:surface:mid:interjection:trap_signal:allow",
      "b:d-5:core:late:rapport:emotion",
      "b:d-5:motive:mid:motive:motive",
      "b:d-5:motive:mid:pressure:responsibility",
      "b:d-5:surface:early:pressure:context",
      "b:d-5:surface:early:pressure:identity",
      "b:d-5:surface:early:pressure:timeline",
      "b:d-5:surface:mid:evidence:legality",
      "b:d-5:surface:mid:interjection:detail_rebuttal:block",
      "b:d-5:surface:mid:interjection:emotional_only:block"
    ]
  },
  "beats": [
    {
      "id": "neighbor02:beat_v2:a:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "제가 무슨 유포를 한 것처럼 말씀하시는데, 그날 택배실에서 이상한 장면을 보고 너무 불안해서 가까운 사람 둘한테 물어본 정도였어요.",
      "behaviorHint": "답을 짧게 끊고 장면 순서만 남기려 든다.",
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
          "neighbor02:a:d-1:act:0"
        ],
        "forbidAtomIds": [
          "neighbor02:a:d-1:admission:0",
          "neighbor02:a:d-1:unlock:s4:0",
          "neighbor02:a:d-1:emotion:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:timeline",
      "coverageKey": "a:d-1:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot",
        "hot"
      ]
    },
    {
      "id": "neighbor02:beat_v2:a:d-1:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "제가 무슨 여론전을 한 것처럼 보시는데, 그냥 너무 찜찜해서 물어본 정도였어요.",
      "behaviorHint": "답을 짧게 끊고 장면 순서만 남기려 든다.",
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
          "neighbor02:a:d-1:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor02:a:d-1:admission:0",
          "neighbor02:a:d-1:unlock:s4:0",
          "neighbor02:a:d-1:emotion:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:context",
      "coverageKey": "a:d-1:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:context_pressed"
      ],
      "tags": [
        "hot",
        "hot"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ]
    },
    {
      "id": "neighbor02:beat_v2:a:d-1:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 유포는 아니었고, 반상회 바로 다음 날 너무 찜찜해서 '이 장면 어떻게 보이세요'라고 묻기만 했어요.",
      "behaviorHint": "답을 짧게 끊고 장면 순서만 남기려 든다.",
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
          "neighbor02:a:d-1:uncertainty:0"
        ],
        "forbidAtomIds": [
          "neighbor02:a:d-1:admission:0",
          "neighbor02:a:d-1:unlock:s4:0",
          "neighbor02:a:d-1:emotion:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:identity",
      "coverageKey": "a:d-1:surface:early:pressure:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:identity_pressed"
      ],
      "tags": [
        "hot",
        "hot"
      ]
    },
    {
      "id": "neighbor02:beat_v2:a:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "보낸 건 맞아요. 그런데 절도라고 단정한 건 아니고, 이상하다고 느껴서 조심하라고 한 거예요.",
      "behaviorHint": "책임선을 좁히며 상대 해석을 밀어낸다.",
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
          "neighbor02:a:d-1:evidence:0",
          "neighbor02:a:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor02:a:d-1:admission:0",
          "neighbor02:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:pressure:responsibility",
      "coverageKey": "a:d-1:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-1:motive:responsibility_named"
      ],
      "tags": [],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ]
    },
    {
      "id": "neighbor02:beat_v2:a:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "justify",
      "line": "그때 이미 오배송이니 문 앞 박스니 쌓인 게 있었어요. 저만 예민한 사람처럼 몰렸으니까요.",
      "behaviorHint": "정당화와 섭섭함을 섞어 동기 설명으로 미끄러진다.",
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
          "neighbor02:a:d-1:motive:0",
          "neighbor02:a:d-1:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "neighbor02:a:d-1:admission:0",
          "neighbor02:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:motive:motive",
      "coverageKey": "a:d-1:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-1:motive:motive_named"
      ],
      "tags": [],
      "requiresFlags": [
        "d-1:surface:context_pressed"
      ]
    },
    {
      "id": "neighbor02:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "저도 이용당한 건 맞지만, 그래서 제 잘못이 없어지는 건 아니라는 말이 제일 아프네요.",
      "behaviorHint": "목소리가 낮아지며 수치심이나 불안을 먼저 내비친다.",
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
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor02:a:d-1:emotion:0",
          "neighbor02:a:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor02:a:d-1:uncertainty:0",
          "neighbor02:a:d-1:act:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:emotion_named"
      ],
      "tags": [
        "late",
        "late"
      ],
      "requiresFlags": [
        "d-1:motive:motive_named"
      ]
    },
    {
      "id": "neighbor02:beat_v2:a:d-1:surface:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "admit",
      "line": "보낸 건 맞아요. 그런데 절도라고 단정한 건 아니고, 이상하다고 느껴서 조심하라고 한 거예요.",
      "behaviorHint": "자료를 흘끗 본 뒤 인정 범위를 계산해 말을 고른다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "fresh",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor02:a:d-1:evidence:0",
          "neighbor02:a:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor02:a:d-1:admission:0",
          "neighbor02:a:d-1:unlock:s4:0",
          "neighbor02:a:d-1:emotion:0"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:evidence:identity",
      "coverageKey": "a:d-1:surface:mid:evidence:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-1:surface:evidence_landed"
      ],
      "tags": [
        "evidence",
        "evidence"
      ]
    },
    {
      "id": "neighbor02:beat_v2:a:d-4:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "mistaken",
      "line": "겉으로 보인 건 분명 그쪽이었습니다. 오배송 정리였다는 설명은 나중에 들었고, 그 전엔 그 정지 화면 말고는 없었어요. 제가 의심할 만한 사정은 있었죠.",
      "behaviorHint": "겉으로 보인 단서를 진실처럼 움켜쥔 채 해석을 반복한다.",
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
          "guarded"
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
          "neighbor02:a:d-4:act:0",
          "neighbor02:a:d-4:context:0"
        ],
        "forbidAtomIds": [
          "neighbor02:a:d-4:unlock:s5:0",
          "neighbor02:a:d-4:emotion:0",
          "neighbor02:a:d-4:admission:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:trap:identity",
      "coverageKey": "a:d-4:surface:early:trap:identity",
      "variantTarget": 4,
      "setFlags": [
        "d-4:surface:misbelief_identity"
      ],
      "tags": [
        "trap",
        "red_herring"
      ],
      "beliefMode": "misbelief"
    },
    {
      "id": "neighbor02:beat_v2:a:d-4:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "mistaken",
      "line": "겉으로 보인 건 분명 그쪽이었습니다. 오배송 정리였다는 설명은 나중에 들었고, 그 전엔 그 정지 화면 말고는 없었어요. 제가 의심할 만한 사정은 있었죠.",
      "behaviorHint": "겉으로 보인 단서를 진실처럼 움켜쥔 채 해석을 반복한다.",
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
          "guarded"
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
          "neighbor02:a:d-4:act:0",
          "neighbor02:a:d-4:context:0"
        ],
        "forbidAtomIds": [
          "neighbor02:a:d-4:unlock:s5:0",
          "neighbor02:a:d-4:emotion:0",
          "neighbor02:a:d-4:admission:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:trap:context",
      "coverageKey": "a:d-4:surface:early:trap:context",
      "variantTarget": 4,
      "setFlags": [
        "d-4:surface:misbelief_shaken"
      ],
      "tags": [
        "trap",
        "red_herring"
      ],
      "beliefMode": "misbelief"
    },
    {
      "id": "neighbor02:beat_v2:a:d-4:motive:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "doubt",
      "line": "그 장면만 떼면 몰라도, 제 쪽에서는 경비원 요청이 있었다면 제가 먼저 확인했어야 했죠. 여름부터 문 앞 박스 문제로 쌓인 감정을 절도 의심으로 이어 붙였던 건 인정해요.",
      "behaviorHint": "겉으로 보인 단서를 진실처럼 움켜쥔 채 해석을 반복한다.",
      "applicableStates": [
        "M3",
        "M4"
      ],
      "layer": "motive",
      "issueRole": "red_herring",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "question",
      "questionTypes": [
        "evidence_present"
      ],
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
          "neighbor02:a:d-4:motive:0",
          "neighbor02:a:d-4:emotion:0",
          "neighbor02:a:d-4:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor02:a:d-4:act:0",
          "neighbor02:a:d-4:context:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:trap:context",
      "coverageKey": "a:d-4:motive:late:trap:context",
      "variantTarget": 2,
      "setFlags": [
        "d-4:motive:context_reframed"
      ],
      "tags": [
        "trap",
        "late",
        "red_herring"
      ],
      "beliefMode": "misbelief"
    },
    {
      "id": "neighbor02:beat_v2:a:d-4:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "clarify",
      "line": "솔직히 말하면 사실 절도라는 말이 돌면 큰일인 줄 알면서도, 저한테는 그 사람이 계속 제 공간을 보는 사람처럼 느껴졌어요. 그 두려움 때문에 사실과 의심을 섞었어요.",
      "behaviorHint": "겉으로 보인 단서를 진실처럼 움켜쥔 채 해석을 반복한다.",
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
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
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
          "neighbor02:a:d-4:motive:0",
          "neighbor02:a:d-4:emotion:0",
          "neighbor02:a:d-4:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor02:a:d-4:act:0",
          "neighbor02:a:d-4:context:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:core:trap:emotion",
      "coverageKey": "a:d-4:core:late:trap:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-4:core:emotion_reframed"
      ],
      "tags": [
        "trap",
        "late",
        "red_herring",
        "late"
      ],
      "beliefMode": "misbelief"
    },
    {
      "id": "neighbor02:beat_v2:a:d-5:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "예전 약속은 공개 글 올리지 말자는 거였지, 제가 그날 공개적으로 호수를 박제한 건 아니에요.",
      "behaviorHint": "답을 짧게 끊고 장면 순서만 남기려 든다.",
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
          "neighbor02:a:d-5:rule:0"
        ],
        "forbidAtomIds": [
          "neighbor02:a:d-5:emotion:0",
          "neighbor02:a:d-5:unlock:s4:0",
          "neighbor02:a:d-5:admission:1"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:pressure:timeline",
      "coverageKey": "a:d-5:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-5:surface:timeline_pressed"
      ],
      "tags": [
        "hot",
        "hot"
      ]
    },
    {
      "id": "neighbor02:beat_v2:a:d-5:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "공개 글 올리지 말자는 약속인 건 알았어요. 다만 그날은 너무 불안해서 사적으로만 물어본 거라고 생각했죠.",
      "behaviorHint": "답을 짧게 끊고 장면 순서만 남기려 든다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "identity",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
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
          "neighbor02:a:d-5:rule:1"
        ],
        "forbidAtomIds": [
          "neighbor02:a:d-5:emotion:0",
          "neighbor02:a:d-5:unlock:s4:0",
          "neighbor02:a:d-5:admission:1"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:pressure:identity",
      "coverageKey": "a:d-5:surface:early:pressure:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-5:surface:identity_pressed"
      ],
      "tags": [
        "hot",
        "hot"
      ],
      "requiresFlags": [
        "d-5:surface:timeline_pressed"
      ]
    },
    {
      "id": "neighbor02:beat_v2:a:d-5:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 관리사무소 확인을 먼저 하자는 건 알았지만, 그날은 너무 불안해서 사적인 상담처럼 보낸 거예요.",
      "behaviorHint": "답을 짧게 끊고 장면 순서만 남기려 든다.",
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
          "neighbor02:a:d-5:rule:1"
        ],
        "forbidAtomIds": [
          "neighbor02:a:d-5:emotion:0",
          "neighbor02:a:d-5:unlock:s4:0",
          "neighbor02:a:d-5:admission:1"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:pressure:context",
      "coverageKey": "a:d-5:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-5:surface:context_pressed"
      ],
      "tags": [
        "hot",
        "hot"
      ]
    },
    {
      "id": "neighbor02:beat_v2:a:d-5:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "절차를 지키지 못한 건 맞아요. 그래도 제가 바로 공개 글을 올린 건 아니었어요.",
      "behaviorHint": "책임선을 좁히며 상대 해석을 밀어낸다.",
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
          "guarded",
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
          "neighbor02:a:d-5:admission:0",
          "neighbor02:a:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor02:a:d-5:unlock:s5:0",
          "neighbor02:a:d-5:admission:1"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:pressure:responsibility",
      "coverageKey": "a:d-5:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:responsibility_named"
      ],
      "tags": [],
      "requiresFlags": [
        "d-5:surface:timeline_pressed"
      ]
    },
    {
      "id": "neighbor02:beat_v2:a:d-5:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "justify",
      "line": "저도 약속을 완전히 지킨 건 아니지만, 여러 대화방으로 번진 건 민규 씨 쪽이 더 컸다고 생각했어요.",
      "behaviorHint": "정당화와 섭섭함을 섞어 동기 설명으로 미끄러진다.",
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
          "guarded",
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
          "neighbor02:a:d-5:responsibility:0",
          "neighbor02:a:d-5:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "neighbor02:a:d-5:unlock:s5:0",
          "neighbor02:a:d-5:admission:1"
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
        "d-5:motive:motive_named"
      ],
      "tags": [],
      "requiresFlags": [
        "d-5:surface:identity_pressed"
      ]
    },
    {
      "id": "neighbor02:beat_v2:a:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "emotional",
      "line": "저도 이용당한 건 맞지만, 그래서 제 잘못이 없어지는 건 아니라는 말이 제일 아프네요.",
      "behaviorHint": "목소리가 낮아지며 수치심이나 불안을 먼저 내비친다.",
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
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor02:a:d-5:emotion:0",
          "neighbor02:a:d-5:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor02:a:d-5:rule:0",
          "neighbor02:a:d-5:rule:1"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:rapport:emotion",
      "coverageKey": "a:d-5:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-5:core:emotion_named"
      ],
      "tags": [
        "late",
        "late"
      ],
      "requiresFlags": [
        "d-5:motive:motive_named"
      ]
    },
    {
      "id": "neighbor02:beat_v2:a:d-5:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "admit",
      "line": "절차를 지키지 못한 건 맞아요. 그래도 제가 바로 공개 글을 올린 건 아니었어요.",
      "behaviorHint": "자료를 흘끗 본 뒤 인정 범위를 계산해 말을 고른다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "fresh",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor02:a:d-5:admission:0",
          "neighbor02:a:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor02:a:d-5:emotion:0",
          "neighbor02:a:d-5:unlock:s4:0",
          "neighbor02:a:d-5:admission:1"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:evidence:legality",
      "coverageKey": "a:d-5:surface:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-5:surface:evidence_landed"
      ],
      "tags": [
        "evidence",
        "evidence"
      ]
    },
    {
      "id": "neighbor02:beat_v2:b:d-2:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "악취 민원 얘기는 제가 만든 게 아니라 이미 나와 있던 표현을 전달한 수준입니다. 특정 세대를 단정한 건 아닙니다.",
      "behaviorHint": "답을 짧게 끊고 장면 순서만 남기려 든다.",
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
          "neighbor02:b:d-2:rule:0"
        ],
        "forbidAtomIds": [
          "neighbor02:b:d-2:unlock:s5:0",
          "neighbor02:b:d-2:unlock:s4:0",
          "neighbor02:b:d-2:admission:1"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:timeline",
      "coverageKey": "b:d-2:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:timeline_pressed"
      ],
      "tags": [
        "hot",
        "hot"
      ]
    },
    {
      "id": "neighbor02:beat_v2:b:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "반상회 직후 주민들이 냄새 원인을 물었고, 저는 기존 민원 문구를 인용한 겁니다. 단정은 피하려 했습니다.",
      "behaviorHint": "답을 짧게 끊고 장면 순서만 남기려 든다.",
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
          "neighbor02:b:d-2:quote:0"
        ],
        "forbidAtomIds": [
          "neighbor02:b:d-2:unlock:s5:0",
          "neighbor02:b:d-2:unlock:s4:0",
          "neighbor02:b:d-2:admission:1"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:context",
      "coverageKey": "b:d-2:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:context_pressed"
      ],
      "tags": [
        "hot",
        "hot"
      ],
      "requiresFlags": [
        "d-2:surface:timeline_pressed"
      ]
    },
    {
      "id": "neighbor02:beat_v2:b:d-2:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 반상회 직후 주민들이 냄새 원인을 묻길래 기존 민원 문구를 인용한 겁니다. 확인 전 단정은 피하려 했습니다.",
      "behaviorHint": "답을 짧게 끊고 장면 순서만 남기려 든다.",
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
          "neighbor02:b:d-2:quote:0"
        ],
        "forbidAtomIds": [
          "neighbor02:b:d-2:unlock:s5:0",
          "neighbor02:b:d-2:unlock:s4:0",
          "neighbor02:b:d-2:admission:1"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:identity",
      "coverageKey": "b:d-2:surface:early:pressure:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:identity_pressed"
      ],
      "tags": [
        "hot",
        "hot"
      ]
    },
    {
      "id": "neighbor02:beat_v2:b:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "같은 표현을 여러 대화방에 보낸 건 맞습니다. 다만 민원에 기초한 말이었습니다.",
      "behaviorHint": "책임선을 좁히며 상대 해석을 밀어낸다.",
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
          "neighbor02:b:d-2:admission:0",
          "neighbor02:b:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor02:b:d-2:unlock:s5:0",
          "neighbor02:b:d-2:admission:1"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:pressure:responsibility",
      "coverageKey": "b:d-2:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-2:motive:responsibility_named"
      ],
      "tags": [],
      "requiresFlags": [
        "d-2:surface:timeline_pressed"
      ]
    },
    {
      "id": "neighbor02:beat_v2:b:d-2:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "justify",
      "line": "그 장면만 떼면 몰라도, 제 쪽에서는 그때 저는 반상회에서 공개적으로 면박을 받은 직후였고, 그래서 냄새 문제를 더 공격적으로 받아 적었습니다. 감정이 섞인 전달이었던 건 인정합니다.",
      "behaviorHint": "정당화와 섭섭함을 섞어 동기 설명으로 미끄러진다.",
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
          "neighbor02:b:d-2:motive:0",
          "neighbor02:b:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "neighbor02:b:d-2:unlock:s5:0",
          "neighbor02:b:d-2:admission:1"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:motive:motive",
      "coverageKey": "b:d-2:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-2:motive:motive_named"
      ],
      "tags": [],
      "requiresFlags": [
        "d-2:surface:context_pressed"
      ]
    },
    {
      "id": "neighbor02:beat_v2:b:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "맞습니다, 화가 났습니다. 도둑으로 몰린 직후였으니까요. 그렇다고 사실 확인 없이 말한 건 결국 제 실수였습니다.",
      "behaviorHint": "목소리가 낮아지며 수치심이나 불안을 먼저 내비친다.",
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
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor02:b:d-2:emotion:0",
          "neighbor02:b:d-2:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor02:b:d-2:quote:0",
          "neighbor02:b:d-2:rule:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:core:rapport:emotion",
      "coverageKey": "b:d-2:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-2:core:emotion_named"
      ],
      "tags": [
        "late",
        "late"
      ],
      "requiresFlags": [
        "d-2:motive:motive_named"
      ]
    },
    {
      "id": "neighbor02:beat_v2:b:d-2:surface:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "admit",
      "line": "같은 표현을 여러 대화방에 보낸 건 맞습니다. 다만 민원에 기초한 말이었습니다.",
      "behaviorHint": "자료를 흘끗 본 뒤 인정 범위를 계산해 말을 고른다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "fresh",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor02:b:d-2:admission:0",
          "neighbor02:b:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor02:b:d-2:unlock:s5:0",
          "neighbor02:b:d-2:unlock:s4:0",
          "neighbor02:b:d-2:admission:1"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:evidence:identity",
      "coverageKey": "b:d-2:surface:mid:evidence:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:evidence_landed"
      ],
      "tags": [
        "evidence",
        "evidence"
      ]
    },
    {
      "id": "neighbor02:beat_v2:b:d-3:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "익명 전단과 첫 문구의 출처는 서유나 씨 쪽일 가능성이 높다고 봤습니다. 반상회 직후 그쪽이 먼저 움직였습니다.",
      "behaviorHint": "답을 짧게 끊고 장면 순서만 남기려 든다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "identity",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
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
          "neighbor02:b:d-3:identity:0"
        ],
        "forbidAtomIds": [
          "neighbor02:b:d-3:unlock:s4:0",
          "neighbor02:b:d-3:emotion:0",
          "neighbor02:b:d-3:identity:1"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:pressure:identity",
      "coverageKey": "b:d-3:surface:early:pressure:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-3:surface:identity_pressed"
      ],
      "tags": [
        "hot",
        "hot"
      ]
    },
    {
      "id": "neighbor02:beat_v2:b:d-3:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "반상회 뒤 시차가 너무 짧았습니다. 당시엔 유나 씨나 그 지인 쪽에서 문구를 정리한 줄 알았습니다.",
      "behaviorHint": "답을 짧게 끊고 장면 순서만 남기려 든다.",
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
          "neighbor02:b:d-3:timeline:0"
        ],
        "forbidAtomIds": [
          "neighbor02:b:d-3:unlock:s4:0",
          "neighbor02:b:d-3:emotion:0",
          "neighbor02:b:d-3:identity:1"
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
        "hot",
        "hot"
      ],
      "requiresFlags": [
        "d-3:surface:identity_pressed"
      ]
    },
    {
      "id": "neighbor02:beat_v2:b:d-3:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 반상회 뒤 시차가 너무 짧았습니다. 당시엔 유나 씨나 그 지인 쪽에서 문구를 정리한 줄 알았습니다.",
      "behaviorHint": "답을 짧게 끊고 장면 순서만 남기려 든다.",
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
          "neighbor02:b:d-3:timeline:0"
        ],
        "forbidAtomIds": [
          "neighbor02:b:d-3:unlock:s4:0",
          "neighbor02:b:d-3:emotion:0",
          "neighbor02:b:d-3:identity:1"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:pressure:timeline",
      "coverageKey": "b:d-3:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-3:surface:timeline_pressed"
      ],
      "tags": [
        "hot",
        "hot"
      ]
    },
    {
      "id": "neighbor02:beat_v2:b:d-3:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "녹음을 보니 회의 중 표현이 먼저 있었고, 전단은 그걸 베낀 흔적이 있네요. 출처를 단정하긴 어렵겠습니다.",
      "behaviorHint": "책임선을 좁히며 상대 해석을 밀어낸다.",
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
          "guarded",
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
          "neighbor02:b:d-3:evidence:0",
          "neighbor02:b:d-3:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor02:b:d-3:identity:1",
          "neighbor02:b:d-3:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:pressure:responsibility",
      "coverageKey": "b:d-3:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-3:motive:responsibility_named"
      ],
      "tags": [],
      "requiresFlags": [
        "d-3:surface:identity_pressed"
      ]
    },
    {
      "id": "neighbor02:beat_v2:b:d-3:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "justify",
      "line": "누군가 회의 표현을 가공해 외부로 뺀 정황이 보입니다. 제가 유나 씨를 배후처럼 몬 건 과했습니다.",
      "behaviorHint": "정당화와 섭섭함을 섞어 동기 설명으로 미끄러진다.",
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
          "guarded",
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
          "neighbor02:b:d-3:admission:0",
          "neighbor02:b:d-3:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "neighbor02:b:d-3:identity:1",
          "neighbor02:b:d-3:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:motive:motive",
      "coverageKey": "b:d-3:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-3:motive:motive_named"
      ],
      "tags": [],
      "requiresFlags": [
        "d-3:surface:context_pressed"
      ]
    },
    {
      "id": "neighbor02:beat_v2:b:d-3:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "emotional",
      "line": "솔직히 말하면 공용프린터 얘기까지 나오니, 저도 이용당한 쪽이었다는 생각이 듭니다. 다만 그 문구를 다시 퍼뜨린 건 결국 제 손이었습니다.",
      "behaviorHint": "목소리가 낮아지며 수치심이나 불안을 먼저 내비친다.",
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
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor02:b:d-3:emotion:0",
          "neighbor02:b:d-3:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor02:b:d-3:identity:0",
          "neighbor02:b:d-3:timeline:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:rapport:emotion",
      "coverageKey": "b:d-3:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-3:core:emotion_named"
      ],
      "tags": [
        "late",
        "late"
      ],
      "requiresFlags": [
        "d-3:motive:motive_named"
      ]
    },
    {
      "id": "neighbor02:beat_v2:b:d-3:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "admit",
      "line": "녹음을 보니 회의 중 표현이 먼저 있었고, 전단은 그걸 베낀 흔적이 있네요. 출처를 단정하긴 어렵겠습니다.",
      "behaviorHint": "자료를 흘끗 본 뒤 인정 범위를 계산해 말을 고른다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "fresh",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor02:b:d-3:evidence:0",
          "neighbor02:b:d-3:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor02:b:d-3:unlock:s4:0",
          "neighbor02:b:d-3:emotion:0",
          "neighbor02:b:d-3:identity:1"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:evidence:context",
      "coverageKey": "b:d-3:surface:mid:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-3:surface:evidence_landed"
      ],
      "tags": [
        "evidence",
        "evidence"
      ]
    },
    {
      "id": "neighbor02:beat_v2:b:d-5:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "약속은 공개 게시 자제를 뜻했지, 기존 민원 표현을 사실확인 차원에서 전달하지 말자는 취지는 아니었습니다.",
      "behaviorHint": "답을 짧게 끊고 장면 순서만 남기려 든다.",
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
          "neighbor02:b:d-5:rule:0"
        ],
        "forbidAtomIds": [
          "neighbor02:b:d-5:unlock:s4:0",
          "neighbor02:b:d-5:admission:2",
          "neighbor02:b:d-5:emotion:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:pressure:timeline",
      "coverageKey": "b:d-5:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-5:surface:timeline_pressed"
      ],
      "tags": [
        "hot",
        "hot"
      ]
    },
    {
      "id": "neighbor02:beat_v2:b:d-5:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "관리사무소 확인을 먼저 하자는 취지는 알았습니다. 다만 저는 민원 문구를 인용한 수준이라고 봤습니다.",
      "behaviorHint": "답을 짧게 끊고 장면 순서만 남기려 든다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "identity",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
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
          "neighbor02:b:d-5:quote:0"
        ],
        "forbidAtomIds": [
          "neighbor02:b:d-5:unlock:s4:0",
          "neighbor02:b:d-5:admission:2",
          "neighbor02:b:d-5:emotion:0"
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
        "hot"
      ],
      "requiresFlags": [
        "d-5:surface:timeline_pressed"
      ]
    },
    {
      "id": "neighbor02:beat_v2:b:d-5:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 저는 관리사무소 민원에 있는 문구를 인용한 겁니다. 성급했을 수는 있어도 약속 자체를 파기한 건 과장입니다.",
      "behaviorHint": "답을 짧게 끊고 장면 순서만 남기려 든다.",
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
          "neighbor02:b:d-5:quote:0"
        ],
        "forbidAtomIds": [
          "neighbor02:b:d-5:unlock:s4:0",
          "neighbor02:b:d-5:admission:2",
          "neighbor02:b:d-5:emotion:0"
        ]
      },
      "weight": 6,
      "priority": 32,
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
        "hot"
      ]
    },
    {
      "id": "neighbor02:beat_v2:b:d-5:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "확인 절차 전에 말한 건 맞습니다. 그래도 당시엔 캡처 유포에 대응하는 차원이라고 생각했습니다.",
      "behaviorHint": "책임선을 좁히며 상대 해석을 밀어낸다.",
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
          "guarded",
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
          "neighbor02:b:d-5:admission:0",
          "neighbor02:b:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor02:b:d-5:admission:2",
          "neighbor02:b:d-5:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:pressure:responsibility",
      "coverageKey": "b:d-5:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:responsibility_named"
      ],
      "tags": [],
      "requiresFlags": [
        "d-5:surface:timeline_pressed"
      ]
    },
    {
      "id": "neighbor02:beat_v2:b:d-5:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "justify",
      "line": "결국 저도 약속 취지를 지키지 못했습니다. 규정과 절차를 말하면서도 감정이 앞섰습니다.",
      "behaviorHint": "정당화와 섭섭함을 섞어 동기 설명으로 미끄러진다.",
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
          "guarded",
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
          "neighbor02:b:d-5:admission:1",
          "neighbor02:b:d-5:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "neighbor02:b:d-5:admission:2",
          "neighbor02:b:d-5:unlock:s5:0"
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
        "d-5:motive:motive_named"
      ],
      "tags": [],
      "requiresFlags": [
        "d-5:surface:identity_pressed"
      ]
    },
    {
      "id": "neighbor02:beat_v2:b:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "emotional",
      "line": "맞습니다, 화가 났습니다. 도둑으로 몰린 직후였으니까요. 그렇다고 사실 확인 없이 말한 건 결국 제 실수였습니다.",
      "behaviorHint": "목소리가 낮아지며 수치심이나 불안을 먼저 내비친다.",
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
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor02:b:d-5:emotion:0",
          "neighbor02:b:d-5:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "neighbor02:b:d-5:rule:0",
          "neighbor02:b:d-5:quote:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:rapport:emotion",
      "coverageKey": "b:d-5:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-5:core:emotion_named"
      ],
      "tags": [
        "late",
        "late"
      ],
      "requiresFlags": [
        "d-5:motive:motive_named"
      ]
    },
    {
      "id": "neighbor02:beat_v2:b:d-5:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "admit",
      "line": "확인 절차 전에 말한 건 맞습니다. 그래도 당시엔 캡처 유포에 대응하는 차원이라고 생각했습니다.",
      "behaviorHint": "자료를 흘끗 본 뒤 인정 범위를 계산해 말을 고른다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "fresh",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor02:b:d-5:admission:0",
          "neighbor02:b:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor02:b:d-5:unlock:s4:0",
          "neighbor02:b:d-5:admission:2",
          "neighbor02:b:d-5:emotion:0"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:evidence:legality",
      "coverageKey": "b:d-5:surface:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-5:surface:evidence_landed"
      ],
      "tags": [
        "evidence",
        "evidence"
      ]
    },
    {
      "id": "neighbor02:beat_v2:a:d-1:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "irritated",
      "line": "그때 이미 오배송 얘기나 택배실 문제로 마음이 쌓여 있었어요. 제가 과하게 말한 건 인정하지만 먼저 불안을 만든 건 그쪽 행동이었죠.",
      "behaviorHint": "같은 질문이 반복되자 표정이 굳고 말수가 눈에 띄게 줄어든다.",
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
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:fatigue:timeline",
      "coverageKey": "a:d-1:surface:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-1:surface:fatigue_warned"
      ],
      "tags": [
        "fatigue",
        "fatigue"
      ]
    },
    {
      "id": "neighbor02:beat_v2:a:d-1:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "block",
      "line": "택배실 캡처 얘기는 이미 했습니다. 같은 식으로 몰아붙이면 여기서 더 길게 답하지 않겠습니다.",
      "behaviorHint": "같은 질문이 반복되자 표정이 굳고 말수가 눈에 띄게 줄어든다.",
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
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:fatigue:responsibility",
      "coverageKey": "a:d-1:surface:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-1:surface:fatigue_blocked"
      ],
      "tags": [
        "fatigue",
        "fatigue"
      ]
    },
    {
      "id": "neighbor02:beat_v2:a:d-1:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "retaliate",
      "line": "저도 이용당한 건 맞지만, 그래서 제 잘못이 없어지는 건 아니라는 말이 제일 아프네요.",
      "behaviorHint": "같은 질문이 반복되자 표정이 굳고 말수가 눈에 띄게 줄어든다.",
      "applicableStates": [
        "S3",
        "S4",
        "S5"
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
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:responsibility",
      "coverageKey": "a:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:fatigue_countered"
      ],
      "tags": [
        "fatigue",
        "fatigue"
      ],
      "requiresFlags": [
        "d-1:surface:fatigue_warned"
      ]
    },
    {
      "id": "neighbor02:beat_v2:b:d-2:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "irritated",
      "line": "그때 저는 반상회에서 공개적으로 면박을 받은 직후였고, 그래서 냄새 문제를 더 공격적으로 받아 적었습니다. 감정이 섞인 전달이었던 건 인정합니다.",
      "behaviorHint": "같은 질문이 반복되자 표정이 굳고 말수가 눈에 띄게 줄어든다.",
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
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:fatigue:timeline",
      "coverageKey": "b:d-2:surface:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:fatigue_warned"
      ],
      "tags": [
        "fatigue",
        "fatigue"
      ]
    },
    {
      "id": "neighbor02:beat_v2:b:d-2:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "block",
      "line": "307호 개봉투 냄새 얘기는 이미 했습니다. 같은 식으로 몰아붙이면 여기서 더 길게 답하지 않겠습니다.",
      "behaviorHint": "같은 질문이 반복되자 표정이 굳고 말수가 눈에 띄게 줄어든다.",
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
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:fatigue:responsibility",
      "coverageKey": "b:d-2:surface:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:fatigue_blocked"
      ],
      "tags": [
        "fatigue",
        "fatigue"
      ]
    },
    {
      "id": "neighbor02:beat_v2:b:d-2:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "retaliate",
      "line": "맞습니다, 화가 났습니다. 도둑으로 몰린 직후였으니까요. 그렇다고 사실 확인 없이 말한 건 결국 제 실수였습니다.",
      "behaviorHint": "같은 질문이 반복되자 표정이 굳고 말수가 눈에 띄게 줄어든다.",
      "applicableStates": [
        "S3",
        "S4",
        "S5"
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
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 20,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:fatigue:responsibility",
      "coverageKey": "b:d-2:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:fatigue_countered"
      ],
      "tags": [
        "fatigue",
        "fatigue"
      ],
      "requiresFlags": [
        "d-2:surface:fatigue_warned"
      ]
    },
    {
      "id": "neighbor02:beat_v2:a:d-1:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "disclose",
      "line": "서유나는 집에서 일하고 반려견을 키운다는 이유로 찍힐까 두려워, 사실 확인보다 주변의 공감과 지지를 먼저 얻으려 했다.",
      "behaviorHint": "정당화와 섭섭함을 섞어 동기 설명으로 미끄러진다.",
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
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor02:a:d-1:unlock:s4:0",
          "neighbor02:a:d-1:unlock:s5:0",
          "neighbor02:a:d-1:emotion:0"
        ],
        "forbidAtomIds": [
          "neighbor02:a:d-1:uncertainty:0",
          "neighbor02:a:d-1:act:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:motive:motive",
      "coverageKey": "a:d-1:core:late:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-1:core:free_motive_opened"
      ],
      "tags": [
        "late",
        "free_question",
        "late"
      ]
    },
    {
      "id": "neighbor02:beat_v2:a:d-5:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "disclose",
      "line": "서유나는 CCTV 캡처를 돌린 순간 이미 관리사무소 확인 전 비난 금지 약속을 깼고, 서로의 평판 훼손을 키웠다고 인정한다.",
      "behaviorHint": "목소리가 낮아지며 수치심이나 불안을 먼저 내비친다.",
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
          "agitated",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor02:a:d-5:unlock:s4:0",
          "neighbor02:a:d-5:unlock:s5:0",
          "neighbor02:a:d-5:emotion:0"
        ],
        "forbidAtomIds": [
          "neighbor02:a:d-5:rule:0",
          "neighbor02:a:d-5:rule:1"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:rapport:emotion",
      "coverageKey": "a:d-5:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-5:core:free_emotion_opened"
      ],
      "tags": [
        "late",
        "free_question",
        "late"
      ]
    },
    {
      "id": "neighbor02:beat_v2:b:d-2:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "disclose",
      "line": "도둑 취급 직후의 체면 손상과 분노가 장민규 안에서 보복 심리로 바뀌어 유나 관련 소문 전파에 섞였다.",
      "behaviorHint": "정당화와 섭섭함을 섞어 동기 설명으로 미끄러진다.",
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
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor02:b:d-2:unlock:s4:0",
          "neighbor02:b:d-2:unlock:s5:0",
          "neighbor02:b:d-2:emotion:0"
        ],
        "forbidAtomIds": [
          "neighbor02:b:d-2:quote:0",
          "neighbor02:b:d-2:rule:0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:core:motive:motive",
      "coverageKey": "b:d-2:core:late:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-2:core:free_motive_opened"
      ],
      "tags": [
        "late",
        "free_question",
        "late"
      ]
    },
    {
      "id": "neighbor02:beat_v2:b:d-5:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "disclose",
      "line": "장민규는 관리사무소 확인 전 유나를 특정하는 말을 퍼뜨려 약속을 깼고, 결국 서로 절차보다 평판 싸움을 먼저 택했다고 인정한다.",
      "behaviorHint": "목소리가 낮아지며 수치심이나 불안을 먼저 내비친다.",
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
          "agitated",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor02:b:d-5:unlock:s4:0",
          "neighbor02:b:d-5:unlock:s5:0",
          "neighbor02:b:d-5:emotion:0"
        ],
        "forbidAtomIds": [
          "neighbor02:b:d-5:rule:0",
          "neighbor02:b:d-5:quote:0"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:rapport:emotion",
      "coverageKey": "b:d-5:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-5:core:free_emotion_opened"
      ],
      "tags": [
        "late",
        "free_question",
        "late"
      ]
    },
    {
      "id": "neighbor02:beat_v2:a:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interjection",
      "line": "저도 이용당한 건 맞지만, 그래서 제 잘못이 없어지는 건 아니라는 말이 제일 아프네요.",
      "behaviorHint": "본 질문 흐름을 끊고 감정이나 디테일만 날카롭게 던진다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "emotion",
      "actionFamily": "interjection",
      "questionTypes": [
        "fact_pursuit"
      ],
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
          "tired"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor02:a:d-1:evidence:0",
          "neighbor02:a:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor02:a:d-1:admission:0",
          "neighbor02:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-1:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:emotional_only_allow"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "neighbor02:beat_v2:b:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interjection",
      "line": "맞습니다, 화가 났습니다. 도둑으로 몰린 직후였으니까요. 그렇다고 사실 확인 없이 말한 건 결국 제 실수였습니다.",
      "behaviorHint": "본 질문 흐름을 끊고 감정이나 디테일만 날카롭게 던진다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "emotion",
      "actionFamily": "interjection",
      "questionTypes": [
        "fact_pursuit"
      ],
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
          "tired"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor02:b:d-2:admission:0",
          "neighbor02:b:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor02:b:d-2:unlock:s5:0",
          "neighbor02:b:d-2:admission:1"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-2:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:emotional_only_allow"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "neighbor02:beat_v2:a:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "interjection",
      "line": "감정만 세게 올리지 마시고 선확인 약속부터 차분히 말해 주세요. 울분으로 순서를 덮으면 더 꼬입니다.",
      "behaviorHint": "본 질문 흐름을 끊고 감정이나 디테일만 날카롭게 던진다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "emotion",
      "actionFamily": "interjection",
      "questionTypes": [
        "fact_pursuit"
      ],
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
          "tired"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor02:a:d-5:admission:0",
          "neighbor02:a:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor02:a:d-5:unlock:s5:0",
          "neighbor02:a:d-5:admission:1"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-5:surface:mid:interjection:emotional_only:block",
      "variantTarget": 2,
      "setFlags": [
        "d-5:surface:emotional_only_block"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "neighbor02:beat_v2:b:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "interjection",
      "line": "감정만 세게 올리지 마시고 선확인 약속부터 차분히 말해 주세요. 울분으로 순서를 덮으면 더 꼬입니다.",
      "behaviorHint": "본 질문 흐름을 끊고 감정이나 디테일만 날카롭게 던진다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "emotion",
      "actionFamily": "interjection",
      "questionTypes": [
        "fact_pursuit"
      ],
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
          "tired"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor02:b:d-5:admission:0",
          "neighbor02:b:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor02:b:d-5:admission:2",
          "neighbor02:b:d-5:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-5:surface:mid:interjection:emotional_only:block",
      "variantTarget": 2,
      "setFlags": [
        "d-5:surface:emotional_only_block"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "neighbor02:beat_v2:a:d-1:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interjection",
      "line": "택배실 캡처 하나만 떼서 보면 안 됩니다. 남의 박스 앞하고 반상회 다음 날까지 붙여야 그날 흐름이 맞습니다.",
      "behaviorHint": "본 질문 흐름을 끊고 감정이나 디테일만 날카롭게 던진다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "responsibility",
      "actionFamily": "interjection",
      "questionTypes": [
        "fact_pursuit"
      ],
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
          "tired"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor02:a:d-1:evidence:0",
          "neighbor02:a:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor02:a:d-1:admission:0",
          "neighbor02:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-1:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:detail_rebuttal_allow"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "neighbor02:beat_v2:b:d-2:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interjection",
      "line": "307호 개봉투 냄새 하나만 떼서 보면 안 됩니다. 14시간 전파하고 단체방까지 붙여야 그날 흐름이 맞습니다.",
      "behaviorHint": "본 질문 흐름을 끊고 감정이나 디테일만 날카롭게 던진다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "responsibility",
      "actionFamily": "interjection",
      "questionTypes": [
        "fact_pursuit"
      ],
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
          "tired"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor02:b:d-2:admission:0",
          "neighbor02:b:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor02:b:d-2:unlock:s5:0",
          "neighbor02:b:d-2:admission:1"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-2:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:detail_rebuttal_allow"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "neighbor02:beat_v2:a:d-5:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "interjection",
      "line": "선확인 약속 숫자나 한 컷만 들이대지 마세요. 캡처 전달가 빠지면 또 다른 결론으로 미끄러집니다.",
      "behaviorHint": "본 질문 흐름을 끊고 감정이나 디테일만 날카롭게 던진다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "responsibility",
      "actionFamily": "interjection",
      "questionTypes": [
        "fact_pursuit"
      ],
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
          "tired"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor02:a:d-5:admission:0",
          "neighbor02:a:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor02:a:d-5:unlock:s5:0",
          "neighbor02:a:d-5:admission:1"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-5:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 2,
      "setFlags": [
        "d-5:surface:detail_rebuttal_block"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "neighbor02:beat_v2:b:d-5:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "interjection",
      "line": "선확인 약속 숫자나 한 컷만 들이대지 마세요. 캡처 전달가 빠지면 또 다른 결론으로 미끄러집니다.",
      "behaviorHint": "본 질문 흐름을 끊고 감정이나 디테일만 날카롭게 던진다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "responsibility",
      "actionFamily": "interjection",
      "questionTypes": [
        "fact_pursuit"
      ],
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
          "tired"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor02:b:d-5:admission:0",
          "neighbor02:b:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor02:b:d-5:admission:2",
          "neighbor02:b:d-5:unlock:s5:0"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-5:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 2,
      "setFlags": [
        "d-5:surface:detail_rebuttal_block"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "neighbor02:beat_v2:a:d-4:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "interjection",
      "line": "그때 보인 장면만으로는 누구라도 민규가 남의 택배를 뒤졌다는 오해고 받아들였을 겁니다. 그래서 저도 그 해석을 놓지 못했습니다.",
      "behaviorHint": "본 질문 흐름을 끊고 감정이나 디테일만 날카롭게 던진다.",
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
      "questionTypes": [
        "fact_pursuit"
      ],
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
          "tired"
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
          "neighbor02:a:d-4:evidence:0",
          "neighbor02:a:d-4:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor02:a:d-4:unlock:s5:0",
          "neighbor02:a:d-4:admission:0"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-4:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-4:surface:misbelief_escalation_allow"
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
      "id": "neighbor02:beat_v2:b:d-4:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "interjection",
      "line": "지금 그 해석이 바로 문제입니다. 민규가 남의 택배를 뒤졌다는 오해 쪽으로만 몰리게 하는 단서가 빠져 있잖아요.",
      "behaviorHint": "본 질문 흐름을 끊고 감정이나 디테일만 날카롭게 던진다.",
      "applicableStates": [
        "M2",
        "M3"
      ],
      "layer": "surface",
      "issueRole": "red_herring",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "interjection",
      "questionTypes": [
        "fact_pursuit"
      ],
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
          "tired"
        ],
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
          "neighbor02:b:d-4:evidence:0",
          "neighbor02:b:d-4:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor02:b:d-4:unlock:s5:0",
          "neighbor02:b:d-4:evidence:1"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-4:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 2,
      "setFlags": [
        "d-4:surface:misbelief_escalation_block"
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
      "id": "neighbor02:beat_v2:b:d-4:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "interjection",
      "line": "택배 절도 의심만 먼저 던지면 또 같은 오해가 납니다. 잘린 단서가 결정타처럼 보이기 시작하거든요.",
      "behaviorHint": "본 질문 흐름을 끊고 감정이나 디테일만 날카롭게 던진다.",
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
      "questionTypes": [
        "fact_pursuit"
      ],
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
          "tired"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ],
        "misconceptionStates": [
          "M1",
          "M2",
          "M3"
        ],
        "trapStates": [
          "trap_live"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor02:b:d-4:evidence:0",
          "neighbor02:b:d-4:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor02:b:d-4:unlock:s5:0",
          "neighbor02:b:d-4:evidence:1"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-4:surface:mid:interjection:trap_signal:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-4:surface:trap_signal_allow"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "trap_signal",
        "red_herring"
      ],
      "beliefMode": "knows"
    },
    {
      "id": "neighbor02:beat_v2:a:d-4:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "neighbor-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "interjection",
      "line": "택배 절도 의심 하나로 끝난 것처럼 말하지 마세요. 앞뒤 맥락이 비어 있는 자료는 덫이 되기 쉽습니다.",
      "behaviorHint": "본 질문 흐름을 끊고 감정이나 디테일만 날카롭게 던진다.",
      "applicableStates": [
        "M2",
        "M3",
        "M4"
      ],
      "layer": "surface",
      "issueRole": "red_herring",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "interjection",
      "questionTypes": [
        "fact_pursuit"
      ],
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
          "tired"
        ],
        "interjectionStates": [
          "block_last_turn"
        ],
        "misconceptionStates": [
          "M2",
          "M3",
          "M4"
        ],
        "trapStates": [
          "trap_live",
          "trap_exposed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "neighbor02:a:d-4:evidence:0",
          "neighbor02:a:d-4:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "neighbor02:a:d-4:unlock:s5:0",
          "neighbor02:a:d-4:admission:0"
        ]
      },
      "weight": 4,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-4:surface:mid:interjection:trap_signal:block",
      "variantTarget": 2,
      "setFlags": [
        "d-4:surface:trap_signal_block"
      ],
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

export default neighbor02BeatsV2Full;
