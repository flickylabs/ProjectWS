export const family04BeatsV2Full = {
  "caseId": "family-04",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 54,
    "byActionFamily": {
      "question": 29,
      "evidence": 5,
      "fatigue": 6,
      "free_question": 2,
      "interjection": 12
    },
    "byResponseIntent": {
      "trap_confusion_response": 8,
      "pressure_response": 23,
      "rapport_response": 8,
      "evidence_response": 5,
      "fatigue_response": 6,
      "motive_response": 4
    },
    "byDispute": {
      "d-1": 8,
      "d-2": 19,
      "d-3": 17,
      "d-4": 5,
      "d-5": 5
    },
    "interjectionInfoLevels": {
      "misbelief_escalation": 4,
      "emotional_only": 4,
      "detail_rebuttal": 4
    },
    "fatigueByDispute": {
      "d-2": 3,
      "d-3": 3
    }
  },
  "beats": [
    {
      "id": "family04:beat_v2:a:d-1:motive:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "그 단서는 맥락을 빼면 바로 오해로 갑니다. 지금 보면 돈이 어디로 갔는지보다, 민규가 먼저 만든 폴더 맥락이 오해를 키운 건 맞습니다.",
      "behaviorHint": "책임선을 구분하려고 문장을 짧게 끊고 근거를 붙인다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
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
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.unlock.s2.a.context_0",
          "family04:a:d-1:s2:atom0"
        ],
        "forbidAtomIds": [
          "family04:a:d-1:s5:atom0"
        ]
      },
      "weight": 4,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:trap:context",
      "coverageKey": "a:d-1:motive:mid:trap:context",
      "variantTarget": 2,
      "setFlags": [
        "d-1:motive:context_pressed"
      ],
      "tags": [
        "mid",
        "red_herring"
      ],
      "beliefMode": "misbelief"
    },
    {
      "id": "family04:beat_v2:a:d-1:motive:trap:context:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "보이는 장면보다 앞뒤 문맥이 더 큽니다. 다만 그 단계에서도 저는 형제 계좌가 아닌 제3의 용처 가능성을 충분히 열어두지 않았습니다.",
      "behaviorHint": "책임선을 구분하려고 문장을 짧게 끊고 근거를 붙인다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
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
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d1.unlock.s2.a.context_0",
          "family04:a:d-1:s2:atom0"
        ],
        "forbidAtomIds": [
          "family04:a:d-1:s5:atom0"
        ]
      },
      "weight": 4,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:trap:context",
      "coverageKey": "a:d-1:motive:mid:trap:context",
      "variantTarget": 2,
      "setFlags": [
        "d-1:motive:context_pressed"
      ],
      "tags": [
        "mid",
        "red_herring"
      ],
      "beliefMode": "misbelief"
    },
    {
      "id": "family04:beat_v2:b:d-1:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "오해가 풀리기 시작하니 남는 건 감정뿐입니다. 저는 늘 '가까이 사는 민규'부터 의심받는다고 느껴서, 이번에도 누나를 먼저 지목해야 버틸 수 있다고 생각했습니다.",
      "behaviorHint": "울먹이기 직전 한 박자 멈추며 상처를 전면에 둔다.",
      "applicableStates": [
        "S3",
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
          "breaking"
        ],
        "trustWindowBands": [
          "opening",
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
          "d1.unlock.s4.b.emotion_0",
          "family04:b:d-1:s4:atom0"
        ],
        "forbidAtomIds": [
          "family04:b:d-1:s0:atom0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:trap:emotion",
      "coverageKey": "b:d-1:core:late:trap:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:emotion_window"
      ],
      "tags": [
        "late",
        "red_herring"
      ],
      "requiresFlags": [
        "d-1:motive:context_pressed"
      ],
      "beliefMode": "misbelief"
    },
    {
      "id": "family04:beat_v2:b:d-1:core:trap:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "이쯤 되면 확신보다 부끄러움이 먼저 남습니다. 억울함이 커질수록 사실 확인보다 누나의 통제성을 먼저 공격했습니다.",
      "behaviorHint": "울먹이기 직전 한 박자 멈추며 상처를 전면에 둔다.",
      "applicableStates": [
        "S3",
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
          "breaking"
        ],
        "trustWindowBands": [
          "opening",
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
          "d1.unlock.s4.b.emotion_0",
          "family04:b:d-1:s4:atom0"
        ],
        "forbidAtomIds": [
          "family04:b:d-1:s0:atom0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:trap:emotion",
      "coverageKey": "b:d-1:core:late:trap:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:emotion_window"
      ],
      "tags": [
        "late",
        "red_herring"
      ],
      "requiresFlags": [
        "d-1:motive:context_pressed"
      ],
      "beliefMode": "misbelief"
    },
    {
      "id": "family04:beat_v2:a:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "겉으로만 보면 그렇게 보일 수 있어도 맥락은 다릅니다. 제가 민규에게 보낸 건 확인을 위한 잔액 화면이었지, 이체 메모를 숨기려는 조작은 아니었습니다.",
      "behaviorHint": "날짜와 자료 순서를 먼저 말하며 감정을 뒤로 민다.",
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
          "family04:a:d-2:s1:atom0",
          "d2.unlock.s2.a.context_0"
        ],
        "forbidAtomIds": [
          "family04:a:d-2:s5:atom0"
        ]
      },
      "weight": 6,
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
      "id": "family04:beat_v2:a:d-2:surface:pressure:context:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "한 장면만 떼면 제가 제일 나빠 보입니다. 당시에는 잔액이 비어 있다는 사실 자체가 급했고, 화면 전체를 정리할 여유가 없었습니다.",
      "behaviorHint": "날짜와 자료 순서를 먼저 말하며 감정을 뒤로 민다.",
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
          "family04:a:d-2:s1:atom0",
          "d2.unlock.s2.a.context_0"
        ],
        "forbidAtomIds": [
          "family04:a:d-2:s5:atom0"
        ]
      },
      "weight": 6,
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
      "id": "family04:beat_v2:a:d-2:surface:pressure:context:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "배경을 빼고 묻는 질문에는 답이 반쪽이 됩니다. 그 시점만 보면 잔액 확인이 우선이었고, 메모란은 아래까지 다 보이지 않는 상태였습니다.",
      "behaviorHint": "날짜와 자료 순서를 먼저 말하며 감정을 뒤로 민다.",
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
          "family04:a:d-2:s1:atom0",
          "d2.unlock.s2.a.context_0"
        ],
        "forbidAtomIds": [
          "family04:a:d-2:s5:atom0"
        ]
      },
      "weight": 6,
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
      "id": "family04:beat_v2:a:d-2:surface:pressure:context:04",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "그 부분은 상황까지 같이 붙여서 봐야 합니다. 부분 캡처였다는 지적은 가능해도, 그걸 곧바로 악의로 읽는 건 과합니다.",
      "behaviorHint": "날짜와 자료 순서를 먼저 말하며 감정을 뒤로 민다.",
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
          "family04:a:d-2:s1:atom0",
          "d2.unlock.s2.a.context_0"
        ],
        "forbidAtomIds": [
          "family04:a:d-2:s5:atom0"
        ]
      },
      "weight": 6,
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
      "id": "family04:beat_v2:a:d-2:surface:pressure:context:05",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "겉으로만 보면 그렇게 보일 수 있어도 맥락은 다릅니다. 제가 민규에게 보낸 건 확인을 위한 잔액 화면이었지, 이체 메모를 숨기려는 조작은 아니었습니다.",
      "behaviorHint": "날짜와 자료 순서를 먼저 말하며 감정을 뒤로 민다.",
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
          "family04:a:d-2:s1:atom0",
          "d2.unlock.s2.a.context_0"
        ],
        "forbidAtomIds": [
          "family04:a:d-2:s5:atom0"
        ]
      },
      "weight": 6,
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
      "id": "family04:beat_v2:a:d-2:surface:pressure:context:06",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "한 장면만 떼면 제가 제일 나빠 보입니다. 당시에는 잔액이 비어 있다는 사실 자체가 급했고, 화면 전체를 정리할 여유가 없었습니다.",
      "behaviorHint": "날짜와 자료 순서를 먼저 말하며 감정을 뒤로 민다.",
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
          "family04:a:d-2:s1:atom0",
          "d2.unlock.s2.a.context_0"
        ],
        "forbidAtomIds": [
          "family04:a:d-2:s5:atom0"
        ]
      },
      "weight": 6,
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
      "id": "family04:beat_v2:a:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "책임을 피하려는 건 아니지만 비중은 구분돼야 합니다. 네, 잘린 캡처를 따로 저장해서 보낸 건 맞습니다.",
      "behaviorHint": "책임선을 구분하려고 문장을 짧게 끊고 근거를 붙인다.",
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
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.unlock.s3.a.responsibility_0",
          "family04:a:d-2:s3:atom1"
        ],
        "forbidAtomIds": [
          "family04:a:d-2:s5:atom1"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:pressure:responsibility",
      "coverageKey": "a:d-2:motive:mid:pressure:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-2:surface:context_pressed"
      ]
    },
    {
      "id": "family04:beat_v2:a:d-2:motive:pressure:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "잘못이 없다는 말이 아니라, 누구 책임이 어디까지인지 나눠야 합니다. 다만 그때 제 목적은 민규를 범인으로 확정하는 것보다, 이상 징후를 빨리 짚는 데 있었다고 생각했습니다.",
      "behaviorHint": "책임선을 구분하려고 문장을 짧게 끊고 근거를 붙인다.",
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
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.unlock.s3.a.responsibility_0",
          "family04:a:d-2:s3:atom1"
        ],
        "forbidAtomIds": [
          "family04:a:d-2:s5:atom1"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:pressure:responsibility",
      "coverageKey": "a:d-2:motive:mid:pressure:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-2:surface:context_pressed"
      ]
    },
    {
      "id": "family04:beat_v2:a:d-2:motive:pressure:responsibility:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "같은 사건이라도 제 몫과 상대 몫은 다르게 봐야 합니다. 원본 거래내역을 보고도 잘린 화면을 먼저 보낸 건 제 선택이었습니다.",
      "behaviorHint": "책임선을 구분하려고 문장을 짧게 끊고 근거를 붙인다.",
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
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.unlock.s3.a.responsibility_0",
          "family04:a:d-2:s3:atom1"
        ],
        "forbidAtomIds": [
          "family04:a:d-2:s5:atom1"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:pressure:responsibility",
      "coverageKey": "a:d-2:motive:mid:pressure:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-2:surface:context_pressed"
      ]
    },
    {
      "id": "family04:beat_v2:a:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "지금은 변명보다 감정을 먼저 말씀드리는 게 맞겠습니다. 제가 그 화면을 고른 건, 부모 재산 정리에서 제가 방심했다는 말을 듣기 싫어서였습니다.",
      "behaviorHint": "처음으로 목소리의 단단함이 무너지지만 서류식 어조를 완전히 버리진 않는다.",
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
          "breaking"
        ],
        "trustWindowBands": [
          "opening",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.unlock.s4.a.emotion_0",
          "family04:a:d-2:s4:atom0"
        ],
        "forbidAtomIds": [
          "family04:a:d-2:s0:atom0"
        ]
      },
      "weight": 5,
      "priority": 23,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:core:rapport:emotion",
      "coverageKey": "a:d-2:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-2:core:emotion_window"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-2:motive:responsibility_named"
      ]
    },
    {
      "id": "family04:beat_v2:a:d-2:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "여기까지 오면 사실보다 먼저 남는 감정이 있습니다. 욕심 많은 딸처럼 보이지 않으려 했는데, 오히려 가장 공격적인 방식으로 움직였습니다.",
      "behaviorHint": "처음으로 목소리의 단단함이 무너지지만 서류식 어조를 완전히 버리진 않는다.",
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
          "breaking"
        ],
        "trustWindowBands": [
          "opening",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.unlock.s4.a.emotion_0",
          "family04:a:d-2:s4:atom0"
        ],
        "forbidAtomIds": [
          "family04:a:d-2:s0:atom0"
        ]
      },
      "weight": 5,
      "priority": 23,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:core:rapport:emotion",
      "coverageKey": "a:d-2:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-2:core:emotion_window"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-2:motive:responsibility_named"
      ]
    },
    {
      "id": "family04:beat_v2:a:d-2:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "잘린 캡처 기준으로 보면 사람과 경로를 다시 나눠야 합니다. 네, 잘린 캡처를 따로 저장해서 보낸 건 맞습니다.",
      "behaviorHint": "제시된 자료를 바로 받아 적듯 반응하며 범위를 좁혀 말한다.",
      "applicableStates": [
        "S1",
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
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.unlock.s3.a.responsibility_0",
          "d2.unlock.s2.a.context_0"
        ],
        "forbidAtomIds": [
          "family04:a:d-2:s5:atom0"
        ]
      },
      "weight": 4,
      "priority": 34,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:evidence:identity",
      "coverageKey": "a:d-2:motive:mid:evidence:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:evidence_shown"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-2:surface:context_pressed"
      ]
    },
    {
      "id": "family04:beat_v2:a:d-2:motive:evidence:identity:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "원본 거래내역이 나오면 누가 무엇을 했는지 범위를 줄일 수 있습니다. 다만 그때 제 목적은 민규를 범인으로 확정하는 것보다, 이상 징후를 빨리 짚는 데 있었다고 생각했습니다.",
      "behaviorHint": "제시된 자료를 바로 받아 적듯 반응하며 범위를 좁혀 말한다.",
      "applicableStates": [
        "S1",
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
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.unlock.s3.a.responsibility_0",
          "d2.unlock.s2.a.context_0"
        ],
        "forbidAtomIds": [
          "family04:a:d-2:s5:atom0"
        ]
      },
      "weight": 4,
      "priority": 34,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:evidence:identity",
      "coverageKey": "a:d-2:motive:mid:evidence:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:evidence_shown"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-2:surface:context_pressed"
      ]
    },
    {
      "id": "family04:beat_v2:a:d-2:motive:evidence:identity:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "confess",
      "line": "잘린 캡처 앞에서는 이름을 섞어 말하기 어렵습니다. 원본 거래내역을 보고도 잘린 화면을 먼저 보낸 건 제 선택이었습니다.",
      "behaviorHint": "제시된 자료를 바로 받아 적듯 반응하며 범위를 좁혀 말한다.",
      "applicableStates": [
        "S1",
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
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.unlock.s3.a.responsibility_0",
          "d2.unlock.s2.a.context_0"
        ],
        "forbidAtomIds": [
          "family04:a:d-2:s5:atom0"
        ]
      },
      "weight": 4,
      "priority": 34,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:evidence:identity",
      "coverageKey": "a:d-2:motive:mid:evidence:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:evidence_shown"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-2:surface:context_pressed"
      ]
    },
    {
      "id": "family04:beat_v2:a:d-2:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "같은 순서 질문을 몇 번이나 더 해야 합니까. 네, 잘린 캡처를 따로 저장해서 보낸 건 맞습니다.",
      "behaviorHint": "같은 질문에 수치와 순서를 다시 읊다가 짜증이 목소리에 묻어난다.",
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
          "opening"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.unlock.s2.a.context_0"
        ],
        "forbidAtomIds": [
          "family04:a:d-2:s5:atom0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:fatigue:timeline",
      "coverageKey": "a:d-2:surface:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:fatigue_2_seen"
      ],
      "tags": [
        "fatigue",
        "second_pass"
      ]
    },
    {
      "id": "family04:beat_v2:a:d-2:surface:fatigue:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "계속 시점만 반복되면 저도 지칠 수밖에 없습니다. 다만 그때 제 목적은 민규를 범인으로 확정하는 것보다, 이상 징후를 빨리 짚는 데 있었다고 생각했습니다.",
      "behaviorHint": "같은 질문에 수치와 순서를 다시 읊다가 짜증이 목소리에 묻어난다.",
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
          "opening"
        ],
        "fatigueLevels": [
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.unlock.s2.a.context_0"
        ],
        "forbidAtomIds": [
          "family04:a:d-2:s5:atom0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:fatigue:timeline",
      "coverageKey": "a:d-2:surface:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:fatigue_3_seen"
      ],
      "tags": [
        "fatigue",
        "third_pass"
      ]
    },
    {
      "id": "family04:beat_v2:a:d-2:surface:fatigue:timeline:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "그 부분은 이미 여러 번 말했습니다. 원본 거래내역을 보고도 잘린 화면을 먼저 보낸 건 제 선택이었습니다.",
      "behaviorHint": "같은 질문에 수치와 순서를 다시 읊다가 짜증이 목소리에 묻어난다.",
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
          "strained",
          "breaking"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d2.unlock.s2.a.context_0"
        ],
        "forbidAtomIds": [
          "family04:a:d-2:s5:atom0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:fatigue:timeline",
      "coverageKey": "a:d-2:surface:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:fatigue_spike_seen"
      ],
      "tags": [
        "fatigue",
        "high_fatigue"
      ]
    },
    {
      "id": "family04:beat_v2:b:d-3:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "시점부터 바로잡겠습니다. 저는 원본을 훔쳐 간 게 아니라 잠깐 안전한 데 옮겨 둔 겁니다.",
      "behaviorHint": "희생 목록을 먼저 꺼내며 억울한 사람의 자리를 선점한다.",
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
          "family04:b:d-3:s0:atom0",
          "family04:b:d-3:s2:atom0"
        ],
        "forbidAtomIds": [
          "family04:b:d-3:s5:atom0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:pressure:timeline",
      "coverageKey": "b:d-3:surface:early:pressure:timeline",
      "variantTarget": 4,
      "setFlags": [
        "d-3:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "family04:beat_v2:b:d-3:surface:pressure:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "그때 순서를 잘못 잡으면 전부 다르게 보입니다. 누나가 먼저 뭘 진행할까 봐 불안했을 뿐, 제 걸 만들려는 의도는 없었습니다.",
      "behaviorHint": "희생 목록을 먼저 꺼내며 억울한 사람의 자리를 선점한다.",
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
          "family04:b:d-3:s0:atom0",
          "family04:b:d-3:s2:atom0"
        ],
        "forbidAtomIds": [
          "family04:b:d-3:s5:atom0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:pressure:timeline",
      "coverageKey": "b:d-3:surface:early:pressure:timeline",
      "variantTarget": 4,
      "setFlags": [
        "d-3:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "family04:beat_v2:b:d-3:surface:pressure:timeline:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "날짜만 떼어 놓고 몰아가면 안 됩니다. 그날 집에 두는 것보다 제 금고가 안전하다고 판단했습니다.",
      "behaviorHint": "희생 목록을 먼저 꺼내며 억울한 사람의 자리를 선점한다.",
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
          "family04:b:d-3:s0:atom0",
          "family04:b:d-3:s2:atom0"
        ],
        "forbidAtomIds": [
          "family04:b:d-3:s5:atom0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:pressure:timeline",
      "coverageKey": "b:d-3:surface:early:pressure:timeline",
      "variantTarget": 4,
      "setFlags": [
        "d-3:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "family04:beat_v2:b:d-3:surface:pressure:timeline:04",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "그 시점에는 그렇게 움직일 수밖에 없었습니다. 바로 알리진 못했지만, 숨기려 했다기보다는 싸움이 커질까 봐 미룬 겁니다.",
      "behaviorHint": "희생 목록을 먼저 꺼내며 억울한 사람의 자리를 선점한다.",
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
          "family04:b:d-3:s0:atom0",
          "family04:b:d-3:s2:atom0"
        ],
        "forbidAtomIds": [
          "family04:b:d-3:s5:atom0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:pressure:timeline",
      "coverageKey": "b:d-3:surface:early:pressure:timeline",
      "variantTarget": 4,
      "setFlags": [
        "d-3:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "family04:beat_v2:b:d-3:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "책임을 피하려는 건 아니지만 비중은 구분돼야 합니다. 네, 제가 인감과 등기 원본을 작업실 금고로 옮긴 건 맞습니다.",
      "behaviorHint": "자기 고생을 끌어와 책임선을 흐리려다 중간에 감정이 새어 나온다.",
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
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.unlock.s5.b.truth_0",
          "d3.unlock.s3.b.responsibility_0"
        ],
        "forbidAtomIds": [
          "family04:b:d-3:s5:atom0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:pressure:responsibility",
      "coverageKey": "b:d-3:motive:mid:pressure:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-3:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-3:surface:timeline_pressed"
      ]
    },
    {
      "id": "family04:beat_v2:b:d-3:motive:pressure:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "잘못이 없다는 말이 아니라, 누구 책임이 어디까지인지 나눠야 합니다. 다만 그건 누나가 먼저 건드릴까 봐 겁이 나서 한 보관 행동이지, 제 이익을 위한 이동은 아니었습니다.",
      "behaviorHint": "자기 고생을 끌어와 책임선을 흐리려다 중간에 감정이 새어 나온다.",
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
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.unlock.s5.b.truth_0",
          "d3.unlock.s3.b.responsibility_0"
        ],
        "forbidAtomIds": [
          "family04:b:d-3:s5:atom0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:pressure:responsibility",
      "coverageKey": "b:d-3:motive:mid:pressure:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-3:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-3:surface:timeline_pressed"
      ]
    },
    {
      "id": "family04:beat_v2:b:d-3:motive:pressure:responsibility:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "같은 사건이라도 제 몫과 상대 몫은 다르게 봐야 합니다. 제가 그 서류를 사흘간 제 작업실에 둔 건 절차상 명백히 잘못이었습니다.",
      "behaviorHint": "자기 고생을 끌어와 책임선을 흐리려다 중간에 감정이 새어 나온다.",
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
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.unlock.s5.b.truth_0",
          "d3.unlock.s3.b.responsibility_0"
        ],
        "forbidAtomIds": [
          "family04:b:d-3:s5:atom0"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:pressure:responsibility",
      "coverageKey": "b:d-3:motive:mid:pressure:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-3:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-3:surface:timeline_pressed"
      ]
    },
    {
      "id": "family04:beat_v2:b:d-3:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "emotional",
      "line": "지금은 변명보다 감정을 먼저 말씀드리는 게 맞겠습니다. 저는 가까이 산다는 이유로 늘 의심받는다고 느껴서, 서류만큼은 제 손에 둬야 안심됐습니다.",
      "behaviorHint": "울먹이기 직전 한 박자 멈추며 상처를 전면에 둔다.",
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
          "breaking"
        ],
        "trustWindowBands": [
          "opening",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family04:b:d-3:s4:atom0",
          "d3.unlock.s4.b.emotion_0"
        ],
        "forbidAtomIds": [
          "family04:b:d-3:s0:atom0"
        ]
      },
      "weight": 5,
      "priority": 23,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:rapport:emotion",
      "coverageKey": "b:d-3:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-3:core:emotion_window"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-3:motive:responsibility_named"
      ]
    },
    {
      "id": "family04:beat_v2:b:d-3:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "emotional",
      "line": "여기까지 오면 사실보다 먼저 남는 감정이 있습니다. 그 불안이 결국 무단 반출이라는 잘못으로 나온 겁니다.",
      "behaviorHint": "울먹이기 직전 한 박자 멈추며 상처를 전면에 둔다.",
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
          "breaking"
        ],
        "trustWindowBands": [
          "opening",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family04:b:d-3:s4:atom0",
          "d3.unlock.s4.b.emotion_0"
        ],
        "forbidAtomIds": [
          "family04:b:d-3:s0:atom0"
        ]
      },
      "weight": 5,
      "priority": 23,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:rapport:emotion",
      "coverageKey": "b:d-3:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-3:core:emotion_window"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-3:motive:responsibility_named"
      ]
    },
    {
      "id": "family04:beat_v2:b:d-3:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "도어락·금고 기록을 기준으로 보면 허용된 선과 넘은 선이 갈립니다. 네, 제가 인감과 등기 원본을 작업실 금고로 옮긴 건 맞습니다.",
      "behaviorHint": "증거가 나오면 한숨을 길게 쉬고, 자신이 떠안은 장면을 덧붙인다.",
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
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.unlock.s5.b.truth_0",
          "d3.unlock.s3.b.responsibility_0"
        ],
        "forbidAtomIds": [
          "family04:b:d-3:s5:atom0"
        ]
      },
      "weight": 4,
      "priority": 34,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:evidence:legality",
      "coverageKey": "b:d-3:motive:mid:evidence:legality",
      "variantTarget": 2,
      "setFlags": [
        "d-3:motive:evidence_shown"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-3:surface:timeline_pressed"
      ]
    },
    {
      "id": "family04:beat_v2:b:d-3:motive:evidence:legality:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "도어락·금고 기록이 나오면 절차 위반을 피해 가긴 어렵습니다. 다만 그건 누나가 먼저 건드릴까 봐 겁이 나서 한 보관 행동이지, 제 이익을 위한 이동은 아니었습니다.",
      "behaviorHint": "증거가 나오면 한숨을 길게 쉬고, 자신이 떠안은 장면을 덧붙인다.",
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
          "agitated",
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.unlock.s5.b.truth_0",
          "d3.unlock.s3.b.responsibility_0"
        ],
        "forbidAtomIds": [
          "family04:b:d-3:s5:atom0"
        ]
      },
      "weight": 4,
      "priority": 34,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:evidence:legality",
      "coverageKey": "b:d-3:motive:mid:evidence:legality",
      "variantTarget": 2,
      "setFlags": [
        "d-3:motive:evidence_shown"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-3:surface:timeline_pressed"
      ]
    },
    {
      "id": "family04:beat_v2:b:d-3:surface:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "계속 같은 책임 질문이면 저도 방어적으로 나올 수밖에 없습니다. 네, 제가 인감과 등기 원본을 작업실 금고로 옮긴 건 맞습니다.",
      "behaviorHint": "지친 표정으로 같은 얘기를 반복당한 억울함을 전면에 올린다.",
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
          "opening"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.unlock.s5.b.truth_0"
        ],
        "forbidAtomIds": [
          "family04:b:d-3:s5:atom0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:fatigue:responsibility",
      "coverageKey": "b:d-3:surface:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-3:surface:fatigue_2_seen"
      ],
      "tags": [
        "fatigue",
        "second_pass"
      ]
    },
    {
      "id": "family04:beat_v2:b:d-3:surface:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "잘못이 없다는 뜻이 아니라, 같은 지점을 또 찌르면 말문이 막힙니다. 다만 그건 누나가 먼저 건드릴까 봐 겁이 나서 한 보관 행동이지, 제 이익을 위한 이동은 아니었습니다.",
      "behaviorHint": "지친 표정으로 같은 얘기를 반복당한 억울함을 전면에 올린다.",
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
          "opening"
        ],
        "fatigueLevels": [
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.unlock.s5.b.truth_0"
        ],
        "forbidAtomIds": [
          "family04:b:d-3:s5:atom0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:fatigue:responsibility",
      "coverageKey": "b:d-3:surface:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-3:surface:fatigue_3_seen"
      ],
      "tags": [
        "fatigue",
        "third_pass"
      ]
    },
    {
      "id": "family04:beat_v2:b:d-3:surface:fatigue:responsibility:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "더 몰아붙여도 책임선이 달라지진 않습니다. 제가 그 서류를 사흘간 제 작업실에 둔 건 절차상 명백히 잘못이었습니다.",
      "behaviorHint": "지친 표정으로 같은 얘기를 반복당한 억울함을 전면에 올린다.",
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
          "strained",
          "breaking"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d3.unlock.s5.b.truth_0"
        ],
        "forbidAtomIds": [
          "family04:b:d-3:s5:atom0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:fatigue:responsibility",
      "coverageKey": "b:d-3:surface:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-3:surface:fatigue_spike_seen"
      ],
      "tags": [
        "fatigue",
        "high_fatigue"
      ]
    },
    {
      "id": "family04:beat_v2:a:d-4:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "책임을 피하려는 건 아니지만 비중은 구분돼야 합니다. 네, 저는 공동 폴더에 원본 대신 잘린 캡처를 먼저 올렸고 설명도 충분히 달지 않았습니다.",
      "behaviorHint": "책임선을 구분하려고 문장을 짧게 끊고 근거를 붙인다.",
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
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family04:a:d-4:s3:atom0",
          "d4.unlock.s5.a.truth_0"
        ],
        "forbidAtomIds": [
          "family04:a:d-4:s5:atom1"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:pressure:responsibility",
      "coverageKey": "a:d-4:motive:mid:pressure:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-4:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "family04:beat_v2:a:d-4:motive:pressure:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "잘못이 없다는 말이 아니라, 누구 책임이 어디까지인지 나눠야 합니다. 그 점은 원칙 위반으로 볼 수 있습니다.",
      "behaviorHint": "책임선을 구분하려고 문장을 짧게 끊고 근거를 붙인다.",
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
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family04:a:d-4:s3:atom0",
          "d4.unlock.s5.a.truth_0"
        ],
        "forbidAtomIds": [
          "family04:a:d-4:s5:atom1"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:pressure:responsibility",
      "coverageKey": "a:d-4:motive:mid:pressure:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-4:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "family04:beat_v2:a:d-4:motive:pressure:responsibility:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "같은 사건이라도 제 몫과 상대 몫은 다르게 봐야 합니다. 제 위반은 제 위반이고, 민규가 기부 자료 파일명을 '정리본'처럼 바꾼 것도 별도의 위반입니다.",
      "behaviorHint": "책임선을 구분하려고 문장을 짧게 끊고 근거를 붙인다.",
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
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "family04:a:d-4:s3:atom0",
          "d4.unlock.s5.a.truth_0"
        ],
        "forbidAtomIds": [
          "family04:a:d-4:s5:atom1"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:pressure:responsibility",
      "coverageKey": "a:d-4:motive:mid:pressure:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-4:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "family04:beat_v2:a:d-5:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "제가 왜 그 해석을 붙들었는지까지는 들어보셔야 합니다. 저는 민규가 예전 차용금을 아직 다 정리하지 못한 점이 떠올라, 혹시 같은 방식으로 돈을 움직인 건 아닌지 외부 조언을 구했습니다.",
      "behaviorHint": "책임선을 구분하려고 문장을 짧게 끊고 근거를 붙인다.",
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
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d5.unlock.s2.a.context_0",
          "family04:a:d-5:s3:atom1"
        ],
        "forbidAtomIds": [
          "family04:a:d-5:s5:atom1"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:motive:motive",
      "coverageKey": "a:d-5:motive:mid:motive:motive",
      "variantTarget": 2,
      "setFlags": [
        "d-5:motive:motive_opened"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "family04:beat_v2:a:d-5:motive:motive:motive:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "의도만 따로 떼면 더 나쁘게 보일 수 있지만, 제 동기는 이랬습니다. 그렇다고 해도 부모님보다 외부 지인에게 먼저 물은 순서는 변명하기 어렵습니다.",
      "behaviorHint": "책임선을 구분하려고 문장을 짧게 끊고 근거를 붙인다.",
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
          "strained"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d5.unlock.s2.a.context_0",
          "family04:a:d-5:s3:atom1"
        ],
        "forbidAtomIds": [
          "family04:a:d-5:s5:atom1"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:motive:motive",
      "coverageKey": "a:d-5:motive:mid:motive:motive",
      "variantTarget": 2,
      "setFlags": [
        "d-5:motive:motive_opened"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "family04:beat_v2:b:d-5:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confess",
      "line": "그 질문이라면 더 숨기지 않겠습니다. 저는 가까이 산다는 이유로 또 제가 몰릴까 봐, 이번엔 누나를 먼저 의심해야 덜 무너질 것 같았습니다.",
      "behaviorHint": "주저하다가도 감정 질문에는 의외로 빨리 무너진다.",
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
          "breaking"
        ],
        "trustWindowBands": [
          "opening",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d5.unlock.s5.b.truth_0",
          "d5.unlock.s4.b.emotion_0"
        ],
        "forbidAtomIds": [
          "family04:b:d-5:s0:atom0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:motive:motive",
      "coverageKey": "b:d-5:core:late:motive:motive",
      "variantTarget": 2,
      "setFlags": [
        "d-5:core:motive_opened"
      ],
      "tags": [
        "free_question",
        "late"
      ],
      "requiresFlags": [
        "d-5:motive:motive_opened"
      ]
    },
    {
      "id": "family04:beat_v2:b:d-5:core:motive:motive:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confess",
      "line": "돌려 말하지 않고 동기부터 말씀드리겠습니다. 그래서 부모님께 묻기보다 밖에서 먼저 확인받고 싶었습니다.",
      "behaviorHint": "주저하다가도 감정 질문에는 의외로 빨리 무너진다.",
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
          "breaking"
        ],
        "trustWindowBands": [
          "opening",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "d5.unlock.s5.b.truth_0",
          "d5.unlock.s4.b.emotion_0"
        ],
        "forbidAtomIds": [
          "family04:b:d-5:s0:atom0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:motive:motive",
      "coverageKey": "b:d-5:core:late:motive:motive",
      "variantTarget": 2,
      "setFlags": [
        "d-5:core:motive_opened"
      ],
      "tags": [
        "free_question",
        "late"
      ],
      "requiresFlags": [
        "d-5:motive:motive_opened"
      ]
    },
    {
      "id": "family04:beat_v2:a:d-1:surface:mid:interjection:allow:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "한 줄이나 한 장면만 붙들면 오해가 더 굳습니다. 돈이 민규 개인계좌로 간 증거는 없었는데, 저는 정황을 이어 횡령처럼 말했습니다.",
      "behaviorHint": "파일이나 날짜를 짚으며 짧고 단정하게 끼어든다.",
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
          "closed",
          "narrow"
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
          "d1.unlock.s2.a.context_0"
        ],
        "forbidAtomIds": [
          "family04:a:d-1:s5:atom0"
        ]
      },
      "weight": 5,
      "priority": 38,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-1:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 3,
      "setFlags": [
        "d-1:surface:interjection_misbelief_escalation_allow"
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
      "id": "family04:beat_v2:a:d-1:surface:mid:interjection:block:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "막는다고 해서 그 해석이 사실이 되진 않습니다. 3,200만원은 민규의 횡령이 아니라 부모님이 향토장학재단에 기부한 돈이었습니다.",
      "behaviorHint": "파일이나 날짜를 짚으며 짧고 단정하게 끼어든다.",
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
          "closed",
          "narrow"
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
          "d1.unlock.s2.a.context_0"
        ],
        "forbidAtomIds": [
          "family04:a:d-1:s5:atom0"
        ]
      },
      "weight": 5,
      "priority": 38,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-1:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 3,
      "setFlags": [
        "d-1:surface:interjection_misbelief_escalation_block"
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
      "id": "family04:beat_v2:b:d-1:surface:mid:interjection:allow:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "한 줄이나 한 장면만 붙들면 오해가 더 굳습니다. 누나가 돈을 가져갔다는 증거는 없었는데, 저는 서류 통제 이미지에 기대어 그렇게 몰아갔습니다.",
      "behaviorHint": "말을 끊으며 억울함과 보호 본능을 함께 밀어 넣는다.",
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
          "closed",
          "narrow"
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
          "d1.unlock.s2.b.context_0"
        ],
        "forbidAtomIds": [
          "family04:b:d-1:s5:atom0"
        ]
      },
      "weight": 5,
      "priority": 38,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-1:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 3,
      "setFlags": [
        "d-1:surface:interjection_misbelief_escalation_allow"
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
      "id": "family04:beat_v2:b:d-1:surface:mid:interjection:block:03",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "막는다고 해서 그 해석이 사실이 되진 않습니다. 3,200만원은 누나나 제가 빼돌린 돈이 아니라 부모님이 향토장학재단에 낸 기부금이었습니다.",
      "behaviorHint": "말을 끊으며 억울함과 보호 본능을 함께 밀어 넣는다.",
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
          "closed",
          "narrow"
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
          "d1.unlock.s2.b.context_0"
        ],
        "forbidAtomIds": [
          "family04:b:d-1:s5:atom0"
        ]
      },
      "weight": 5,
      "priority": 38,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-1:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 3,
      "setFlags": [
        "d-1:surface:interjection_misbelief_escalation_block"
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
      "id": "family04:beat_v2:a:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "잠깐만요, 제가 그 화면을 고른 건, 부모 재산 정리에서 제가 방심했다는 말을 듣기 싫어서였습니다.",
      "behaviorHint": "파일이나 날짜를 짚으며 짧고 단정하게 끼어든다.",
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
          "closed",
          "narrow"
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
          "d2.unlock.s4.a.emotion_0"
        ],
        "forbidAtomIds": [
          "family04:a:d-2:s0:atom0"
        ]
      },
      "weight": 5,
      "priority": 38,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-2:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 3,
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
      "id": "family04:beat_v2:a:d-2:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "세부를 끊어도 숫자와 로그는 안 없어집니다. 다만 그때 제 목적은 민규를 범인으로 확정하는 것보다, 이상 징후를 빨리 짚는 데 있었다고 생각했습니다.",
      "behaviorHint": "파일이나 날짜를 짚으며 짧고 단정하게 끼어든다.",
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
          "closed",
          "narrow"
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
          "d2.unlock.s2.a.context_0"
        ],
        "forbidAtomIds": [
          "family04:a:d-2:s5:atom0"
        ]
      },
      "weight": 5,
      "priority": 38,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-2:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 3,
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
      "id": "family04:beat_v2:b:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "emotional",
      "line": "잠깐만요, 저는 가까이 산다는 이유로 늘 의심받는다고 느껴서, 서류만큼은 제 손에 둬야 안심됐습니다.",
      "behaviorHint": "말을 끊으며 억울함과 보호 본능을 함께 밀어 넣는다.",
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
          "closed",
          "narrow"
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
          "family04:b:d-3:s4:atom0"
        ],
        "forbidAtomIds": [
          "family04:b:d-3:s0:atom0"
        ]
      },
      "weight": 5,
      "priority": 38,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-3:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 3,
      "setFlags": [
        "d-3:surface:interjection_emotional_only_allow"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "family04:beat_v2:b:d-3:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "금액과 시각부터 다시 보셔야 합니다. 다만 그건 누나가 먼저 건드릴까 봐 겁이 나서 한 보관 행동이지, 제 이익을 위한 이동은 아니었습니다.",
      "behaviorHint": "말을 끊으며 억울함과 보호 본능을 함께 밀어 넣는다.",
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
          "closed",
          "narrow"
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
          "d3.unlock.s2.b.context_0"
        ],
        "forbidAtomIds": [
          "family04:b:d-3:s5:atom0"
        ]
      },
      "weight": 5,
      "priority": 38,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-3:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 3,
      "setFlags": [
        "d-3:surface:interjection_detail_rebuttal_allow"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "family04:beat_v2:b:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "emotional",
      "line": "그렇게 끊으셔도 감정이 사라지진 않습니다. 저는 가까이 산다는 이유로 늘 의심받는다고 느껴서, 서류만큼은 제 손에 둬야 안심됐습니다.",
      "behaviorHint": "말을 끊으며 억울함과 보호 본능을 함께 밀어 넣는다.",
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
          "closed",
          "narrow"
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
          "family04:b:d-3:s4:atom0"
        ],
        "forbidAtomIds": [
          "family04:b:d-3:s0:atom0"
        ]
      },
      "weight": 5,
      "priority": 38,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:emotional_only:block",
      "variantTarget": 3,
      "setFlags": [
        "d-3:surface:interjection_emotional_only_block"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "family04:beat_v2:a:d-4:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "금액과 시각부터 다시 보셔야 합니다. 그 점은 원칙 위반으로 볼 수 있습니다.",
      "behaviorHint": "파일이나 날짜를 짚으며 짧고 단정하게 끼어든다.",
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
          "closed",
          "narrow"
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
          "d4.unlock.s3.a.context_0"
        ],
        "forbidAtomIds": [
          "family04:a:d-4:s5:atom0"
        ]
      },
      "weight": 5,
      "priority": 38,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-4:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 3,
      "setFlags": [
        "d-4:surface:interjection_detail_rebuttal_allow"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "family04:beat_v2:b:d-4:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "세부를 끊어도 숫자와 로그는 안 없어집니다. 그건 공동 폴더 원칙에 어긋났고, 누나가 오해할 여지를 준 행동이었습니다.",
      "behaviorHint": "말을 끊으며 억울함과 보호 본능을 함께 밀어 넣는다.",
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
          "closed",
          "narrow"
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
          "family04:b:d-4:s2:atom1"
        ],
        "forbidAtomIds": [
          "family04:b:d-4:s5:atom0"
        ]
      },
      "weight": 5,
      "priority": 38,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-4:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 3,
      "setFlags": [
        "d-4:surface:interjection_detail_rebuttal_block"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "family04:beat_v2:a:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "emotional",
      "line": "그렇게 끊으셔도 감정이 사라지진 않습니다. 제가 그렇게 먼저 물어본 건, 민규의 예전 빚이 다시 부모 재산을 건드리는 장면으로 이어질까 무서웠기 때문입니다.",
      "behaviorHint": "파일이나 날짜를 짚으며 짧고 단정하게 끼어든다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
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
          "closed",
          "narrow"
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
          "d5.unlock.s4.a.emotion_0"
        ],
        "forbidAtomIds": [
          "family04:a:d-5:s1:atom0"
        ]
      },
      "weight": 5,
      "priority": 38,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-5:surface:mid:interjection:emotional_only:block",
      "variantTarget": 3,
      "setFlags": [
        "d-5:surface:interjection_emotional_only_block"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    }
  ]
} as const;

export default family04BeatsV2Full;
