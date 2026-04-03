export const tenant11BeatsV2Full = {
  "caseId": "tenant-11",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 56,
    "byActionFamily": {
      "question": 26,
      "evidence": 6,
      "fatigue": 6,
      "free_question": 6,
      "interjection": 12
    },
    "byIssueRole": {
      "core_truth": 25,
      "red_herring": 13,
      "sub_truth": 18
    },
    "byResponseIntent": {
      "pressure_response": 20,
      "motive_response": 5,
      "evidence_response": 6,
      "rapport_response": 13,
      "fatigue_response": 6,
      "trap_confusion_response": 6
    },
    "interjectionInfoLevels": {
      "emotional_only": 4,
      "detail_rebuttal": 4,
      "misbelief_escalation": 2,
      "trap_signal": 2
    },
    "fatigueBeats": 6,
    "freeQuestionBeats": 6
  },
  "beats": [
    {
      "id": "tenant11:beat_v2:a:d-2:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "제가 한 건 구조 변경이 아니라 작업하기 편하게 정리한 정도였어요. 문짝이나 상부장도 다시 달 수 있는 수준이라고 생각했어요.",
      "behaviorHint": "질문을 받자마자 순서와 문구를 붙잡아 버티려 한다.",
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
          "tenant11:a:d-2:uncertainty:1",
          "tenant11:a:d-2:rule:1"
        ],
        "forbidAtomIds": [
          "tenant11:a:d-2:unlock:s5:0",
          "tenant11:a:d-2:admission:0"
        ]
      },
      "weight": 6,
      "priority": 30,
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
      "id": "tenant11:beat_v2:a:d-2:surface:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "고정된 걸 조금 손본 건 있어도 집을 뜯어고친 건 아니에요. 사진 몇 장만 보면 커 보일 뿐, 전체 맥락은 달라요.",
      "behaviorHint": "질문을 받자마자 순서와 문구를 붙잡아 버티려 한다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
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
          "tenant11:a:d-2:uncertainty:1",
          "tenant11:a:d-2:rule:1"
        ],
        "forbidAtomIds": [
          "tenant11:a:d-2:unlock:s5:0",
          "tenant11:a:d-2:admission:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:pressure:responsibility",
      "coverageKey": "a:d-2:surface:early:pressure:responsibility",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:responsibility_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "tenant11:beat_v2:a:d-2:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "화장 공간이 너무 답답해서 바꾼 건 맞지만, 누수 흔적과 기존 가구 상태가 그렇게 만든 원인이었어요. 성필 씨가 처음 상태를 제대로 손봤다면 제가 그렇게까지 안 했을 수도 있어요.",
      "behaviorHint": "잠깐 멈칫한 뒤 이유를 설명하면서도 책임선을 좁히려 한다.",
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
          "tenant11:a:d-2:counter:1",
          "tenant11:a:d-2:motive:1"
        ],
        "forbidAtomIds": [
          "tenant11:a:d-2:unlock:s5:0",
          "tenant11:a:d-2:admission:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:motive:motive",
      "coverageKey": "a:d-2:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-2:motive:motive_pressed"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-2:surface:timeline_pressed"
      ]
    },
    {
      "id": "tenant11:beat_v2:a:d-2:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "붙박이장 문이랑 상부장 일부를 뗀 건 맞아요. 그래도 공간 활용이 훨씬 좋아졌고 완전 파손이라고 보긴 어려워요.",
      "behaviorHint": "증거를 보고 시선을 한 번 피했다가 다시 맞추며 문장을 고쳐 말한다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
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
          "tenant11:a:d-2:rule:1",
          "tenant11:a:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "tenant11:a:d-2:unlock:s5:0",
          "tenant11:a:d-2:admission:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:evidence:legality",
      "coverageKey": "a:d-2:surface:early:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:legality_pressed"
      ],
      "tags": [
        "cold"
      ],
      "requiresFlags": [
        "d-2:surface:responsibility_pressed"
      ]
    },
    {
      "id": "tenant11:beat_v2:a:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "confess",
      "line": "촬영 준비할 공간이 없어 조급했고, 제 돈 들여 바꾸면 다 해결될 줄 알았어요. 그때는 무단 구조 변경으로 찍힐 생각보다 당장 살 수 있는 공간이 더 급했어요.",
      "behaviorHint": "끝문장에서 감정과 체면이 함께 새어 나온다.",
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
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "depleted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant11:a:d-2:unlock:s4:0",
          "tenant11:a:d-2:harm:1"
        ],
        "forbidAtomIds": [
          "tenant11:a:d-2:unlock:s5:0",
          "tenant11:a:d-2:admission:0"
        ]
      },
      "weight": 5,
      "priority": 22,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:core:rapport:emotion",
      "coverageKey": "a:d-2:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-2:core:emotion_pressed"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-2:surface:timeline_pressed"
      ]
    },
    {
      "id": "tenant11:beat_v2:a:d-3:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "430만원은 제가 실제로 쓴 돈이고, 다 이 집 때문에 나간 비용이에요. 그걸 통째로 빼버리면 제가 본 손해가 사라져요.",
      "behaviorHint": "질문을 받자마자 순서와 문구를 붙잡아 버티려 한다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "red_herring",
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
          "tenant11:a:d-3:uncertainty:1",
          "tenant11:a:d-3:context:0"
        ],
        "forbidAtomIds": [
          "tenant11:a:d-3:unlock:s5:0",
          "tenant11:a:d-3:admission:0"
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
      "id": "tenant11:beat_v2:a:d-3:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "세부 품목이 좀 섞였어도 전부 공간을 살리려고 든 돈이었어요. 딱 잘라 의미 없는 비용으로 볼 수는 없잖아요.",
      "behaviorHint": "질문을 받자마자 순서와 문구를 붙잡아 버티려 한다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "red_herring",
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
          "tenant11:a:d-3:uncertainty:1",
          "tenant11:a:d-3:rule:1"
        ],
        "forbidAtomIds": [
          "tenant11:a:d-3:unlock:s5:0",
          "tenant11:a:d-3:admission:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:pressure:identity",
      "coverageKey": "a:d-3:surface:early:pressure:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-3:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "tenant11:beat_v2:a:d-3:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "품목을 세세히 나누면 빠질 게 있지만, 그렇게 섞어 쓴 건 집 상태가 워낙 심했기 때문이에요. 적어도 고정 개선비까지 통째로 깎이는 건 부당해요.",
      "behaviorHint": "잠깐 멈칫한 뒤 이유를 설명하면서도 책임선을 좁히려 한다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "red_herring",
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
          "tenant11:a:d-3:counter:1",
          "tenant11:a:d-3:motive:1"
        ],
        "forbidAtomIds": [
          "tenant11:a:d-3:unlock:s5:0",
          "tenant11:a:d-3:admission:0"
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
        "d-3:motive:motive_pressed"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-3:surface:context_pressed"
      ]
    },
    {
      "id": "tenant11:beat_v2:a:d-3:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "이동식 가구나 소품이 일부 섞인 건 맞아요. 그래도 페인트, 조명, 선반처럼 집에 남는 지출이 핵심이었어요.",
      "behaviorHint": "증거를 보고 시선을 한 번 피했다가 다시 맞추며 문장을 고쳐 말한다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "red_herring",
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
          "tenant11:a:d-3:unlock:s2:0",
          "tenant11:a:d-3:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "tenant11:a:d-3:unlock:s5:0",
          "tenant11:a:d-3:admission:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:evidence:context",
      "coverageKey": "a:d-3:motive:mid:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-3:motive:context_pressed"
      ],
      "tags": [
        "cold"
      ],
      "requiresFlags": [
        "d-3:surface:identity_pressed"
      ]
    },
    {
      "id": "tenant11:beat_v2:a:d-3:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confess",
      "line": "제가 쓴 돈을 증명하고 싶어서 다 묶어 말한 건 있어요. 한 항목씩 설명하면 제 기여가 너무 작아 보일까 봐 겁났어요.",
      "behaviorHint": "끝문장에서 감정과 체면이 함께 새어 나온다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "red_herring",
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
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "depleted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant11:a:d-3:unlock:s4:0",
          "tenant11:a:d-3:harm:1"
        ],
        "forbidAtomIds": [
          "tenant11:a:d-3:unlock:s5:0",
          "tenant11:a:d-3:admission:0"
        ]
      },
      "weight": 5,
      "priority": 22,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:rapport:emotion",
      "coverageKey": "a:d-3:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-3:core:emotion_pressed"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-3:surface:context_pressed"
      ]
    },
    {
      "id": "tenant11:beat_v2:a:d-1:surface:pressure:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "성필 씨가 처음부터 분위기 바꾸는 건 괜찮다고 했어요. 붙박이장 문이나 상부장까지 문제 삼을 줄은 몰랐어요.",
      "behaviorHint": "질문을 받자마자 순서와 문구를 붙잡아 버티려 한다.",
      "applicableStates": [
        "S0",
        "S1"
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
          "tenant11:a:d-1:uncertainty:1",
          "tenant11:a:d-1:rule:1"
        ],
        "forbidAtomIds": [
          "tenant11:a:d-1:unlock:s5:0",
          "tenant11:a:d-1:admission:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:legality",
      "coverageKey": "a:d-1:surface:early:pressure:legality",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:legality_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "tenant11:beat_v2:a:d-1:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "'크게만 안 건드리면 된다'는 말을 저는 꽤 넓게 들었어요. 낡은 상태를 같이 봤으니 그 정도 손보는 건 허용된다고 생각했죠.",
      "behaviorHint": "질문을 받자마자 순서와 문구를 붙잡아 버티려 한다.",
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
          "tenant11:a:d-1:uncertainty:1",
          "tenant11:a:d-1:context:0"
        ],
        "forbidAtomIds": [
          "tenant11:a:d-1:unlock:s5:0",
          "tenant11:a:d-1:admission:0"
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
      "id": "tenant11:beat_v2:a:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "허용 범위가 모호했던 건 사실이고, 말을 애매하게 한 쪽도 성필 씨예요. 저만 단독으로 밀어붙였다고 보기엔 처음 설명이 너무 느슨했어요.",
      "behaviorHint": "잠깐 멈칫한 뒤 이유를 설명하면서도 책임선을 좁히려 한다.",
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
          "tenant11:a:d-1:unlock:s2:0",
          "tenant11:a:d-1:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "tenant11:a:d-1:unlock:s5:0",
          "tenant11:a:d-1:admission:0"
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
        "d-1:motive:responsibility_pressed"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-1:surface:legality_pressed"
      ]
    },
    {
      "id": "tenant11:beat_v2:a:d-1:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "문제가 될 수 있는 선이 있다는 건 알았지만, 누수 자국과 어두운 수납 때문에 그 정도 손은 봐야 한다고 생각했어요. 성필 씨도 집이 좋아진 건 알고 있었잖아요.",
      "behaviorHint": "증거를 보고 시선을 한 번 피했다가 다시 맞추며 문장을 고쳐 말한다.",
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
          "tenant11:a:d-1:context:0",
          "tenant11:a:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "tenant11:a:d-1:unlock:s5:0",
          "tenant11:a:d-1:admission:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:evidence:context",
      "coverageKey": "a:d-1:surface:early:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-1:surface:context_pressed"
      ],
      "tags": [
        "cold"
      ],
      "requiresFlags": [
        "d-1:surface:context_pressed"
      ]
    },
    {
      "id": "tenant11:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confess",
      "line": "처음 집 상태가 너무 심해서 '이 정도는 괜찮겠지' 하고 넘긴 게 있어요. 예쁘게 만들어 놓고도 무단 개조한 세입자로만 남을까 봐 겁났어요.",
      "behaviorHint": "끝문장에서 감정과 체면이 함께 새어 나온다.",
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
          "strained",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "depleted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant11:a:d-1:unlock:s4:0",
          "tenant11:a:d-1:harm:1"
        ],
        "forbidAtomIds": [
          "tenant11:a:d-1:unlock:s5:0",
          "tenant11:a:d-1:admission:0"
        ]
      },
      "weight": 5,
      "priority": 22,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-1:core:emotion_pressed"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-1:surface:legality_pressed"
      ]
    },
    {
      "id": "tenant11:beat_v2:b:d-4:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "모집글은 집 상태를 설명한 거지 세입자 공을 훔친 게 아닙니다. 사진은 현재 상태를 보여준 것뿐이에요.",
      "behaviorHint": "질문을 받자마자 순서와 문구를 붙잡아 버티려 한다.",
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
          "tenant11:b:d-4:uncertainty:1",
          "tenant11:b:d-4:rule:1"
        ],
        "forbidAtomIds": [
          "tenant11:b:d-4:unlock:s5:0",
          "tenant11:b:d-4:admission:0"
        ]
      },
      "weight": 6,
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
      "id": "tenant11:beat_v2:b:d-4:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "조명 몇 개와 선반이 남아 있었다고 해서 그걸 공로 가로채기라고 볼 일은 아니죠. 새 임차인 모집엔 보이는 상태를 적는 수밖에 없습니다.",
      "behaviorHint": "질문을 받자마자 순서와 문구를 붙잡아 버티려 한다.",
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
          "tenant11:b:d-4:uncertainty:1",
          "tenant11:b:d-4:context:0"
        ],
        "forbidAtomIds": [
          "tenant11:b:d-4:unlock:s5:0",
          "tenant11:b:d-4:admission:0"
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
      "id": "tenant11:beat_v2:b:d-4:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "임대인은 결국 현재 집 상태를 기준으로 광고합니다. 다만 표현을 집주인 중심으로 적은 건 내 쪽 실수라고 볼 수 있어요.",
      "behaviorHint": "잠깐 멈칫한 뒤 이유를 설명하면서도 책임선을 좁히려 한다.",
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
          "tenant11:b:d-4:unlock:s2:0",
          "tenant11:b:d-4:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "tenant11:b:d-4:unlock:s5:0",
          "tenant11:b:d-4:admission:0"
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
        "d-4:motive:responsibility_pressed"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-4:surface:identity_pressed"
      ]
    },
    {
      "id": "tenant11:beat_v2:b:d-4:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "문구가 과장돼 보일 수는 있어요. 그래도 모집글의 핵심은 공실 안내였지 세입자 도용이 목적은 아니었습니다.",
      "behaviorHint": "증거를 보고 시선을 한 번 피했다가 다시 맞추며 문장을 고쳐 말한다.",
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
          "tenant11:b:d-4:unlock:s2:0",
          "tenant11:b:d-4:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "tenant11:b:d-4:unlock:s5:0",
          "tenant11:b:d-4:admission:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:motive:evidence:context",
      "coverageKey": "b:d-4:motive:mid:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-4:motive:context_pressed"
      ],
      "tags": [
        "cold"
      ],
      "requiresFlags": [
        "d-4:surface:context_pressed"
      ]
    },
    {
      "id": "tenant11:beat_v2:b:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confess",
      "line": "새 임차인 문의가 급해서 눈에 좋아 보이는 사진부터 쓴 건 사실입니다. 그 과정에서 누가 손본 건지 선을 흐린 건 썩 떳떳하진 않아요.",
      "behaviorHint": "끝문장에서 감정과 체면이 함께 새어 나온다.",
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
          "strained",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "depleted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant11:b:d-4:unlock:s4:0",
          "tenant11:b:d-4:harm:1"
        ],
        "forbidAtomIds": [
          "tenant11:b:d-4:unlock:s5:0",
          "tenant11:b:d-4:admission:0"
        ]
      },
      "weight": 5,
      "priority": 22,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:core:rapport:emotion",
      "coverageKey": "b:d-4:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-4:core:emotion_pressed"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-4:surface:identity_pressed"
      ]
    },
    {
      "id": "tenant11:beat_v2:b:d-5:surface:pressure:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "원상복구는 원상복구예요. 원래대로 돌리려면 480만원이 듭니다. 집주인 입장에선 전면 정리가 맞아요.",
      "behaviorHint": "질문을 받자마자 순서와 문구를 붙잡아 버티려 한다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
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
          "tenant11:b:d-5:uncertainty:1",
          "tenant11:b:d-5:rule:1"
        ],
        "forbidAtomIds": [
          "tenant11:b:d-5:unlock:s5:0",
          "tenant11:b:d-5:admission:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:pressure:legality",
      "coverageKey": "b:d-5:surface:early:pressure:legality",
      "variantTarget": 6,
      "setFlags": [
        "d-5:surface:legality_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "tenant11:beat_v2:b:d-5:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "한 군데만 손보면 색 차이와 자국이 남아서 전체 작업이 필요했습니다. 안전 문제까지 생각하면 크게 볼 수밖에 없어요.",
      "behaviorHint": "질문을 받자마자 순서와 문구를 붙잡아 버티려 한다.",
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
          "tenant11:b:d-5:uncertainty:1",
          "tenant11:b:d-5:context:0"
        ],
        "forbidAtomIds": [
          "tenant11:b:d-5:unlock:s5:0",
          "tenant11:b:d-5:admission:0"
        ]
      },
      "weight": 6,
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
      "id": "tenant11:beat_v2:b:d-5:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "내가 크게 잡은 건 추가 하자나 분쟁을 한 번에 막으려는 자기보호도 있었습니다. 그렇다고 모든 항목을 세입자에게 넘기는 계산이 정당해지는 건 아니라는 건 알아요.",
      "behaviorHint": "잠깐 멈칫한 뒤 이유를 설명하면서도 책임선을 좁히려 한다.",
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
          "tenant11:b:d-5:unlock:s2:0",
          "tenant11:b:d-5:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "tenant11:b:d-5:unlock:s5:0",
          "tenant11:b:d-5:admission:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:pressure:responsibility",
      "coverageKey": "b:d-5:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:responsibility_pressed"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-5:surface:legality_pressed"
      ]
    },
    {
      "id": "tenant11:beat_v2:b:d-5:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "부분복구 견적이 있는 건 압니다. 그래도 남은 흔적과 공실 일정까지 고려하면 넉넉히 잡아야 한다고 봤어요.",
      "behaviorHint": "증거를 보고 시선을 한 번 피했다가 다시 맞추며 문장을 고쳐 말한다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
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
          "tenant11:b:d-5:rule:1",
          "tenant11:b:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "tenant11:b:d-5:unlock:s5:0",
          "tenant11:b:d-5:admission:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:evidence:legality",
      "coverageKey": "b:d-5:surface:early:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-5:surface:legality_pressed"
      ],
      "tags": [
        "cold"
      ],
      "requiresFlags": [
        "d-5:surface:context_pressed"
      ]
    },
    {
      "id": "tenant11:beat_v2:b:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confess",
      "line": "새 임차인 일정이 밀리면 손해가 커져서 비용을 보수적으로 잡았습니다. 지금 보면 규정과 불안을 한꺼번에 얹어 부른 면이 있어요.",
      "behaviorHint": "끝문장에서 감정과 체면이 함께 새어 나온다.",
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
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "depleted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant11:b:d-5:unlock:s4:0",
          "tenant11:b:d-5:harm:1"
        ],
        "forbidAtomIds": [
          "tenant11:b:d-5:unlock:s5:0",
          "tenant11:b:d-5:admission:0"
        ]
      },
      "weight": 5,
      "priority": 22,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:rapport:emotion",
      "coverageKey": "b:d-5:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-5:core:emotion_pressed"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-5:surface:legality_pressed"
      ]
    },
    {
      "id": "tenant11:beat_v2:b:d-1:surface:pressure:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "나는 페인트랑 조명 정도만 말했지 구조를 손대라는 말은 한 적이 없어요. 허용 범위는 계약대로 분명했습니다.",
      "behaviorHint": "질문을 받자마자 순서와 문구를 붙잡아 버티려 한다.",
      "applicableStates": [
        "S0",
        "S1"
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
          "tenant11:b:d-1:uncertainty:1",
          "tenant11:b:d-1:rule:1"
        ],
        "forbidAtomIds": [
          "tenant11:b:d-1:unlock:s5:0",
          "tenant11:b:d-1:admission:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:legality",
      "coverageKey": "b:d-1:surface:early:pressure:legality",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:legality_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "tenant11:beat_v2:b:d-1:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "좋게 꾸미라는 말은 했어도 되돌릴 수 있는 선을 전제로 한 겁니다. 상식적으로 붙박이장 문을 떼는 건 포함되지 않아요.",
      "behaviorHint": "질문을 받자마자 순서와 문구를 붙잡아 버티려 한다.",
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
          "tenant11:b:d-1:uncertainty:1",
          "tenant11:b:d-1:context:0"
        ],
        "forbidAtomIds": [
          "tenant11:b:d-1:unlock:s5:0",
          "tenant11:b:d-1:admission:0"
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
      "id": "tenant11:beat_v2:b:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "집 상태가 낡았던 건 맞지만 그래서 더더욱 선을 지켰어야 했습니다. 내가 말을 애매하게 한 책임이 조금 있다고 해도 승인 범위 자체가 바뀌는 건 아니죠.",
      "behaviorHint": "잠깐 멈칫한 뒤 이유를 설명하면서도 책임선을 좁히려 한다.",
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
          "tenant11:b:d-1:unlock:s2:0",
          "tenant11:b:d-1:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "tenant11:b:d-1:unlock:s5:0",
          "tenant11:b:d-1:admission:0"
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
        "d-1:motive:responsibility_pressed"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-1:surface:legality_pressed"
      ]
    },
    {
      "id": "tenant11:beat_v2:b:d-1:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "내 말이 넓게 들릴 수는 있었겠지만 계약서 특약은 분명했습니다. 구두로 분위기 좋게 말한 걸 승인으로 받아들이면 곤란해요.",
      "behaviorHint": "증거를 보고 시선을 한 번 피했다가 다시 맞추며 문장을 고쳐 말한다.",
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
          "tenant11:b:d-1:unlock:s2:0",
          "tenant11:b:d-1:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "tenant11:b:d-1:unlock:s5:0",
          "tenant11:b:d-1:admission:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:evidence:context",
      "coverageKey": "b:d-1:motive:mid:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:context_pressed"
      ],
      "tags": [
        "cold"
      ],
      "requiresFlags": [
        "d-1:surface:context_pressed"
      ]
    },
    {
      "id": "tenant11:beat_v2:b:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confess",
      "line": "그때 공실을 줄이려는 마음에 말을 부드럽게 한 건 있어요. 하지만 그게 구조 변경까지 허용했다는 뜻은 아니었습니다.",
      "behaviorHint": "끝문장에서 감정과 체면이 함께 새어 나온다.",
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
          "strained",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "depleted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant11:b:d-1:unlock:s4:0",
          "tenant11:b:d-1:harm:1"
        ],
        "forbidAtomIds": [
          "tenant11:b:d-1:unlock:s5:0",
          "tenant11:b:d-1:admission:0"
        ]
      },
      "weight": 5,
      "priority": 22,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:rapport:emotion",
      "coverageKey": "b:d-1:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-1:core:emotion_pressed"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-1:surface:legality_pressed"
      ]
    },
    {
      "id": "tenant11:beat_v2:a:d-2:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "fatigue",
      "line": "붙박이장 문이랑 상부장 일부를 뗀 건 맞아요. 그래도 공간 활용이 훨씬 좋아졌고 완전 파손이라고 보긴 어려워요. 같은 축은 이미 설명했습니다. 똑같은 질문을 계속 돌리지 마세요.",
      "behaviorHint": "같은 축 추궁이 이어지자 짜증이 먼저 올라온다.",
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
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "closed"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant11:a:d-2:act:0",
          "tenant11:a:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "tenant11:a:d-2:unlock:s5:0",
          "tenant11:a:d-2:admission:0"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:fatigue:timeline",
      "coverageKey": "a:d-2:surface:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:timeline_fatigue"
      ],
      "tags": [
        "fatigue",
        "repeat2"
      ]
    },
    {
      "id": "tenant11:beat_v2:a:d-2:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "fatigue",
      "line": "붙박이장 문이랑 상부장 일부를 뗀 건 맞아요. 그래도 공간 활용이 훨씬 좋아졌고 완전 파손이라고 보긴 어려워요. 더는 같은 질문에 같은 답을 반복하지 않겠습니다.",
      "behaviorHint": "대답을 끊어 치며 더는 같은 질문을 받지 않겠다는 태도를 보인다.",
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
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "closed"
        ],
        "fatigueLevels": [
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant11:a:d-2:act:0",
          "tenant11:a:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "tenant11:a:d-2:unlock:s5:0",
          "tenant11:a:d-2:admission:0"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:fatigue:responsibility",
      "coverageKey": "a:d-2:surface:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:responsibility_fatigue"
      ],
      "tags": [
        "fatigue",
        "repeat3",
        "block"
      ]
    },
    {
      "id": "tenant11:beat_v2:a:d-2:surface:fatigue:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "fatigue",
      "line": "화장 공간이 너무 답답해서 바꾼 건 맞지만, 누수 흔적과 기존 가구 상태가 그렇게 만든 원인이었어요. 성필 씨가 처음 상태를 제대로 손봤다면 제가 그렇게까지 안 했을 수도 있어요. 계속 이렇게 몰아가면 저도 받아칠 수밖에 없습니다.",
      "behaviorHint": "피로가 누적돼 방어 대신 맞받아치는 말투가 된다.",
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
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "closed"
        ],
        "fatigueLevels": [
          "depleted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant11:a:d-2:unlock:s3:0",
          "tenant11:a:d-2:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant11:a:d-2:unlock:s5:0",
          "tenant11:a:d-2:admission:0"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:fatigue:timeline",
      "coverageKey": "a:d-2:surface:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:timeline_fatigue"
      ],
      "tags": [
        "fatigue",
        "high_fatigue",
        "counter"
      ]
    },
    {
      "id": "tenant11:beat_v2:b:d-5:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "fatigue",
      "line": "부분복구 견적이 있는 건 압니다. 그래도 남은 흔적과 공실 일정까지 고려하면 넉넉히 잡아야 한다고 봤어요. 같은 축은 이미 설명했습니다. 똑같은 질문을 계속 돌리지 마세요.",
      "behaviorHint": "같은 축 추궁이 이어지자 짜증이 먼저 올라온다.",
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
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "closed"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant11:b:d-5:act:0",
          "tenant11:b:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "tenant11:b:d-5:unlock:s5:0",
          "tenant11:b:d-5:admission:0"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:fatigue:timeline",
      "coverageKey": "b:d-5:surface:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-5:surface:timeline_fatigue"
      ],
      "tags": [
        "fatigue",
        "repeat2"
      ]
    },
    {
      "id": "tenant11:beat_v2:b:d-5:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "fatigue",
      "line": "부분복구 견적이 있는 건 압니다. 그래도 남은 흔적과 공실 일정까지 고려하면 넉넉히 잡아야 한다고 봤어요. 더는 같은 질문에 같은 답을 반복하지 않겠습니다.",
      "behaviorHint": "대답을 끊어 치며 더는 같은 질문을 받지 않겠다는 태도를 보인다.",
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
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "closed"
        ],
        "fatigueLevels": [
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant11:b:d-5:act:0",
          "tenant11:b:d-5:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "tenant11:b:d-5:unlock:s5:0",
          "tenant11:b:d-5:admission:0"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:fatigue:responsibility",
      "coverageKey": "b:d-5:surface:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-5:surface:responsibility_fatigue"
      ],
      "tags": [
        "fatigue",
        "repeat3",
        "block"
      ]
    },
    {
      "id": "tenant11:beat_v2:b:d-5:surface:fatigue:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "fatigue",
      "line": "내가 크게 잡은 건 추가 하자나 분쟁을 한 번에 막으려는 자기보호도 있었습니다. 그렇다고 모든 항목을 세입자에게 넘기는 계산이 정당해지는 건 아니라는 건 알아요. 계속 이렇게 몰아가면 저도 받아칠 수밖에 없습니다.",
      "behaviorHint": "피로가 누적돼 방어 대신 맞받아치는 말투가 된다.",
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
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "closed"
        ],
        "fatigueLevels": [
          "depleted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant11:b:d-5:unlock:s3:0",
          "tenant11:b:d-5:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant11:b:d-5:unlock:s5:0",
          "tenant11:b:d-5:admission:0"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:fatigue:timeline",
      "coverageKey": "b:d-5:surface:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-5:surface:timeline_fatigue"
      ],
      "tags": [
        "fatigue",
        "high_fatigue",
        "counter"
      ]
    },
    {
      "id": "tenant11:beat_v2:a:d-1:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confess",
      "line": "탈착 가능한 수준까지만 허용됐다는 건 이제 알아요. 제가 허용선을 넘은 부분은 인정하지만, 그 선을 더 분명히 말해줬다면 달랐을 거예요.",
      "behaviorHint": "정형 문답에서 벗어나자 숨기던 이유를 더 직접적으로 드러낸다.",
      "applicableStates": [
        "S4",
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
          "strained",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "depleted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant11:a:d-1:unlock:s4:0",
          "tenant11:a:d-1:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "tenant11:a:d-1:admission:0"
        ]
      },
      "weight": 3,
      "priority": 18,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:motive:motive",
      "coverageKey": "a:d-1:core:late:motive:motive",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:motive_pressed"
      ],
      "tags": [
        "free_question"
      ],
      "requiresFlags": [
        "d-1:motive:responsibility_pressed"
      ]
    },
    {
      "id": "tenant11:beat_v2:a:d-2:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "confess",
      "line": "붙박이장 문 두 짝과 상부장, 앵커, 배선을 건드린 건 제 판단이었어요. 개선이라는 이름으로 넘은 선이 있었다는 건 인정해요.",
      "behaviorHint": "정형 문답에서 벗어나자 숨기던 이유를 더 직접적으로 드러낸다.",
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
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "depleted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant11:a:d-2:unlock:s4:0",
          "tenant11:a:d-2:harm:1"
        ],
        "forbidAtomIds": [
          "tenant11:a:d-2:unlock:s5:0",
          "tenant11:a:d-2:admission:0"
        ]
      },
      "weight": 3,
      "priority": 18,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:core:rapport:emotion",
      "coverageKey": "a:d-2:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-2:core:emotion_pressed"
      ],
      "tags": [
        "free_question"
      ],
      "requiresFlags": [
        "d-2:motive:motive_pressed"
      ]
    },
    {
      "id": "tenant11:beat_v2:a:d-3:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confess",
      "line": "430만원 전액을 공간 가치 상승비로 보긴 어려워요. 남는 고정 개선비와 개인용 가구·소품·지인 인건비는 나눠서 봐야 해요.",
      "behaviorHint": "정형 문답에서 벗어나자 숨기던 이유를 더 직접적으로 드러낸다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "red_herring",
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
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "depleted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant11:a:d-3:unlock:s4:0",
          "tenant11:a:d-3:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "tenant11:a:d-3:admission:0"
        ]
      },
      "weight": 3,
      "priority": 18,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:motive:motive",
      "coverageKey": "a:d-3:core:late:motive:motive",
      "variantTarget": 2,
      "setFlags": [
        "d-3:core:motive_pressed"
      ],
      "tags": [
        "free_question"
      ],
      "requiresFlags": [
        "d-3:motive:motive_pressed"
      ]
    },
    {
      "id": "tenant11:beat_v2:a:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confess",
      "line": "제가 규칙을 어긴 부분이 있어도 제 개선 성과를 본인 리뉴얼처럼 쓴 건 사실이에요. 기여 인정과 원상복구 책임은 따로 나눠야 해요.",
      "behaviorHint": "정형 문답에서 벗어나자 숨기던 이유를 더 직접적으로 드러낸다.",
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
          "strained",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "depleted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant11:a:d-4:unlock:s4:0",
          "tenant11:a:d-4:harm:1"
        ],
        "forbidAtomIds": [
          "tenant11:a:d-4:unlock:s5:0",
          "tenant11:a:d-4:admission:0"
        ]
      },
      "weight": 3,
      "priority": 18,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:core:rapport:emotion",
      "coverageKey": "a:d-4:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-4:core:emotion_pressed"
      ],
      "tags": [
        "free_question"
      ],
      "requiresFlags": [
        "d-4:motive:responsibility_pressed"
      ]
    },
    {
      "id": "tenant11:beat_v2:a:d-5:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confess",
      "line": "정산 가능한 건 부분복구 범위예요. 전면복구 480만원 전액은 실제 필요한 원상복구를 넘어요.",
      "behaviorHint": "정형 문답에서 벗어나자 숨기던 이유를 더 직접적으로 드러낸다.",
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
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "depleted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant11:a:d-5:unlock:s4:0",
          "tenant11:a:d-5:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "tenant11:a:d-5:admission:0"
        ]
      },
      "weight": 3,
      "priority": 18,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:motive:motive",
      "coverageKey": "a:d-5:core:late:motive:motive",
      "variantTarget": 2,
      "setFlags": [
        "d-5:core:motive_pressed"
      ],
      "tags": [
        "free_question"
      ],
      "requiresFlags": [
        "d-5:motive:responsibility_pressed"
      ]
    },
    {
      "id": "tenant11:beat_v2:a:d-2:core:rapport:emotion:03",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "confess",
      "line": "붙박이장 문 두 짝과 상부장, 앵커, 배선을 건드린 건 제 판단이었어요. 개선이라는 이름으로 넘은 선이 있었다는 건 인정해요.",
      "behaviorHint": "정형 문답에서 벗어나자 숨기던 이유를 더 직접적으로 드러낸다.",
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
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "depleted"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant11:a:d-2:unlock:s4:0",
          "tenant11:a:d-2:harm:1"
        ],
        "forbidAtomIds": [
          "tenant11:a:d-2:unlock:s5:0",
          "tenant11:a:d-2:admission:0"
        ]
      },
      "weight": 3,
      "priority": 18,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:core:rapport:emotion",
      "coverageKey": "a:d-2:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-2:core:emotion_pressed"
      ],
      "tags": [
        "free_question"
      ],
      "requiresFlags": [
        "d-2:motive:motive_pressed"
      ]
    },
    {
      "id": "tenant11:beat_v2:a:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "세부 품목이 좀 섞였어도 전부 공간을 살리려고 든 돈이었어요. 딱 잘라 의미 없는 비용으로 볼 수는 없잖아요.",
      "behaviorHint": "질문을 받자마자 순서와 문구를 붙잡아 버티려 한다.",
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
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [],
        "forbidAtomIds": [
          "tenant11:a:d-3:unlock:s5:0",
          "tenant11:a:d-3:admission:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:context",
      "coverageKey": "a:d-3:surface:early:trap:context",
      "variantTarget": 6,
      "setFlags": [
        "d-3:surface:context_pressed"
      ],
      "tags": [
        "red_herring"
      ],
      "beliefMode": "misbelief"
    },
    {
      "id": "tenant11:beat_v2:a:d-3:motive:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "emotional",
      "line": "제가 쓴 돈을 증명하고 싶어서 다 묶어 말한 건 있어요. 한 항목씩 설명하면 제 기여가 너무 작아 보일까 봐 겁났어요.",
      "behaviorHint": "끝문장에서 감정과 체면이 함께 새어 나온다.",
      "applicableStates": [
        "M3",
        "M4"
      ],
      "layer": "motive",
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
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "fragile"
        ],
        "fatigueLevels": [
          "tired",
          "depleted"
        ],
        "misconceptionStates": [
          "M3",
          "M4"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [],
        "forbidAtomIds": [
          "tenant11:a:d-3:unlock:s5:0",
          "tenant11:a:d-3:admission:0"
        ]
      },
      "weight": 5,
      "priority": 22,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:trap:emotion",
      "coverageKey": "a:d-3:motive:late:trap:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-3:motive:emotion_pressed"
      ],
      "tags": [
        "red_herring"
      ],
      "beliefMode": "misbelief"
    },
    {
      "id": "tenant11:beat_v2:a:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "제가 제 돈으로 곰팡이 집 사람 살 데처럼 만들어 놨는데, 지금 와서 아무 가치도 없었다고 하면 정말 허무하죠.",
      "behaviorHint": "감정을 참지 못하고 질문 사이로 끼어든다.",
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
          "tenant11:a:d-2:unlock:s2:0",
          "tenant11:a:d-2:counter:1"
        ],
        "forbidAtomIds": [
          "tenant11:a:d-2:unlock:s5:0",
          "tenant11:a:d-2:admission:0"
        ]
      },
      "weight": 4,
      "priority": 28,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-2:surface:mid:interjection:emotional_only:allow",
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
      "id": "tenant11:beat_v2:b:d-5:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "interject",
      "line": "붙박이장 떼고 배선 건드린 걸 '분위기'라고만 하면 집주인은 뭘 기준으로 정산합니까.",
      "behaviorHint": "감정을 참지 못하고 질문 사이로 끼어든다.",
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
          "tenant11:b:d-5:unlock:s2:0",
          "tenant11:b:d-5:counter:1"
        ],
        "forbidAtomIds": [
          "tenant11:b:d-5:unlock:s5:0",
          "tenant11:b:d-5:admission:0"
        ]
      },
      "weight": 4,
      "priority": 28,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-5:surface:mid:interjection:emotional_only:allow",
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
      "id": "tenant11:beat_v2:a:d-2:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "잘못만 남고 제가 한 건 다 지워지면, 그 시간과 돈은 도대체 뭐였냐는 말이에요.",
      "behaviorHint": "말이 잘리자 짧게 항의하고 숨을 고른다.",
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
          "tenant11:a:d-2:unlock:s2:0",
          "tenant11:a:d-2:counter:1"
        ],
        "forbidAtomIds": [
          "tenant11:a:d-2:unlock:s5:0",
          "tenant11:a:d-2:admission:0"
        ]
      },
      "weight": 4,
      "priority": 28,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-2:surface:mid:interjection:emotional_only:block",
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
      "id": "tenant11:beat_v2:b:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "interject",
      "line": "집주인이 집 상태를 광고한 걸 전부 도둑질로 몰아가면, 관리 책임은 누가 집니까.",
      "behaviorHint": "말이 잘리자 짧게 항의하고 숨을 고른다.",
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
          "tenant11:b:d-5:unlock:s2:0",
          "tenant11:b:d-5:counter:1"
        ],
        "forbidAtomIds": [
          "tenant11:b:d-5:unlock:s5:0",
          "tenant11:b:d-5:admission:0"
        ]
      },
      "weight": 4,
      "priority": 28,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-5:surface:mid:interjection:emotional_only:block",
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
      "id": "tenant11:beat_v2:a:d-2:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "사진에는 사라진 문짝과 상부장, 앵커 자국이 남아 있고 비용 자료엔 시공 범위가 드러납니다. '정리 수준'이라는 설명과 실제 작업 규모가 맞지 않습니다.",
      "behaviorHint": "구체 디테일을 끌어와 즉시 반박한다.",
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
          "tenant11:a:d-2:unlock:s2:0",
          "tenant11:a:d-2:counter:1"
        ],
        "forbidAtomIds": [
          "tenant11:a:d-2:unlock:s5:0",
          "tenant11:a:d-2:admission:0"
        ]
      },
      "weight": 4,
      "priority": 28,
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
      "id": "tenant11:beat_v2:b:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "개선된 사진 위에 '집주인 감성 리뉴얼 완료'라는 문구를 붙이면 현재 상태 설명을 넘어 공로 귀속까지 바뀝니다. 홍보와 가로채기 사이의 선이 여기서 드러납니다.",
      "behaviorHint": "구체 디테일을 끌어와 즉시 반박한다.",
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
          "tenant11:b:d-1:unlock:s2:0",
          "tenant11:b:d-1:counter:1"
        ],
        "forbidAtomIds": [
          "tenant11:b:d-1:unlock:s5:0",
          "tenant11:b:d-1:admission:0"
        ]
      },
      "weight": 4,
      "priority": 28,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-1:surface:mid:interjection:detail_rebuttal:allow",
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
      "id": "tenant11:beat_v2:a:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "원본 견적과 톡에는 이동식 거울장, 소품, 지인 도움비가 따로 보입니다. 총지출과 공간 가치 상승액을 같은 선에 놓을 수 없습니다.",
      "behaviorHint": "세부 반박이 막히자 끝말만 날카롭게 남긴다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "red_herring",
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
          "tenant11:a:d-3:unlock:s2:0",
          "tenant11:a:d-3:counter:1"
        ],
        "forbidAtomIds": [
          "tenant11:a:d-3:unlock:s5:0",
          "tenant11:a:d-3:admission:0"
        ]
      },
      "weight": 4,
      "priority": 28,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-3:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 2,
      "setFlags": [],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal",
        "red_herring"
      ]
    },
    {
      "id": "tenant11:beat_v2:b:d-5:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "interject",
      "line": "비교 견적은 일부 고정 가구와 패널 복원만으로도 복구가 가능하다고 말합니다. 집 전체 전면 철거를 전제로 한 청구는 실제 복구 범위를 넘습니다.",
      "behaviorHint": "세부 반박이 막히자 끝말만 날카롭게 남긴다.",
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
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant11:b:d-5:unlock:s2:0",
          "tenant11:b:d-5:counter:1"
        ],
        "forbidAtomIds": [
          "tenant11:b:d-5:unlock:s5:0",
          "tenant11:b:d-5:admission:0"
        ]
      },
      "weight": 4,
      "priority": 28,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-5:surface:mid:interjection:detail_rebuttal:block",
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
      "id": "tenant11:beat_v2:a:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "세부 품목이 좀 섞였어도 전부 공간을 살리려고 든 돈이었어요. 딱 잘라 의미 없는 비용으로 볼 수는 없잖아요.",
      "behaviorHint": "확신에 찬 어조로 오해를 더 굳힌다.",
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
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant11:a:d-3:unlock:s2:0",
          "tenant11:a:d-3:counter:1"
        ],
        "forbidAtomIds": [
          "tenant11:a:d-3:unlock:s5:0",
          "tenant11:a:d-3:admission:0"
        ]
      },
      "weight": 4,
      "priority": 28,
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
      "beliefMode": "misbelief"
    },
    {
      "id": "tenant11:beat_v2:b:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "나도 숫자만 보고 밀어붙이려 했던 건 있습니다. 하지만 금액을 나눠 보지 않으면 어느 쪽도 정산이 안 돼요.",
      "behaviorHint": "오해가 흔들리자 짧게 버티며 말을 아낀다.",
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
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant11:b:d-3:unlock:s2:0",
          "tenant11:b:d-3:counter:1"
        ],
        "forbidAtomIds": [
          "tenant11:b:d-3:unlock:s5:0",
          "tenant11:b:d-3:admission:0"
        ]
      },
      "weight": 4,
      "priority": 28,
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
      "id": "tenant11:beat_v2:a:d-3:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "430만원 총액만 크게 보지 마세요. 전체 흐름을 붙여 보면 다른 뜻이 나옵니다.",
      "behaviorHint": "가짜 단서 냄새를 맡고 조심스럽게 경고한다.",
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
          "M3",
          "M4"
        ],
        "trapStates": [
          "trap_open"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant11:a:d-3:unlock:s2:0",
          "tenant11:a:d-3:counter:1"
        ],
        "forbidAtomIds": [
          "tenant11:a:d-3:unlock:s5:0",
          "tenant11:a:d-3:admission:0"
        ]
      },
      "weight": 4,
      "priority": 28,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:trap_signal:allow",
      "variantTarget": 2,
      "setFlags": [],
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
      "id": "tenant11:beat_v2:b:d-3:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "소품 영수증 하나로 결론 내리면 오히려 핵심을 놓칩니다.",
      "behaviorHint": "말을 막히자 불길한 지점만 짧게 남긴다.",
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
          "M2",
          "M3",
          "M4"
        ],
        "trapStates": [
          "trap_warning"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant11:b:d-3:unlock:s2:0",
          "tenant11:b:d-3:counter:1"
        ],
        "forbidAtomIds": [
          "tenant11:b:d-3:unlock:s5:0",
          "tenant11:b:d-3:admission:0"
        ]
      },
      "weight": 4,
      "priority": 28,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:trap_signal:block",
      "variantTarget": 2,
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

export default tenant11BeatsV2Full;
