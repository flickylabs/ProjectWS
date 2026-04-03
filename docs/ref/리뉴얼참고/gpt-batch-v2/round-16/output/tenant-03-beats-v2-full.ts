export const tenant03BeatsV2Full = {
  "caseId": "tenant-03",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 58,
    "byActionFamily": {
      "question": 24,
      "evidence": 6,
      "fatigue": 6,
      "free_question": 10,
      "interjection": 12
    },
    "byIssueRole": {
      "core_truth": 27,
      "shared_misconception": 10,
      "red_herring": 10,
      "sub_truth": 11
    },
    "byParty": {
      "a": 29,
      "b": 29
    },
    "interjectionCount": 12,
    "fatigueCount": 6
  },
  "beats": [
    {
      "id": "tenant03:beat_v2:a:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "한별이 앞단에서 문구를 만들었더라도 최신 채무 구조를 직접 확인시킬 책임은 태수 씨에게 있었습니다. 저는 그 설명이 집주인 뜻과 같다고 받아들였습니다.",
      "behaviorHint": "출처를 고정하려고 '누가 먼저 말했냐'는 식으로 되묻는다. 호흡을 고르고 문장 끝을 또렷하게 끊는다.",
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
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:a:d-1:responsibility:0",
          "tenant03:a:d-1:responsibility:1"
        ],
        "forbidAtomIds": [
          "tenant03:a:d-1:admission:2"
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
        "d-1:motive:opened"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-1:surface:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:a:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "태수 씨는 선순위 채무를 줄여 말했고 저는 그 수치를 믿고 계약을 밀었습니다. 계약 직전 추가된 대출 얘기는 저는 직접 들은 적이 없습니다.",
      "behaviorHint": "출처를 고정하려고 '누가 먼저 말했냐'는 식으로 되묻는다. PDF나 캡처를 먼저 보여주며 감정 설명을 뒤로 미룬다.",
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
          "tenant03:a:d-1:counter:1",
          "tenant03:a:d-1:admission:0"
        ],
        "forbidAtomIds": [
          "tenant03:a:d-1:fear:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:timeline",
      "coverageKey": "a:d-1:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:opened",
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "tenant03:beat_v2:b:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "한별이 앞에서 서류를 돌리며 괜찮다고 한 데 기대서 저도 책임을 미뤘습니다. 추가 담보가 생긴 이상 제가 직접 최신 잔액과 순서를 다시 말했어야 했습니다.",
      "behaviorHint": "'중개사가 그렇게 하자고 했다'는 문장으로 본인 결정을 흐린다. 길게 한숨을 쉬고 피해를 본 사람 같은 톤으로 다시 시작한다.",
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
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:b:d-1:responsibility:0",
          "tenant03:b:d-1:responsibility:1"
        ],
        "forbidAtomIds": [
          "tenant03:b:d-1:admission:2"
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
        "d-1:motive:opened"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-1:surface:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:b:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "브리지대출이 그렇게 문제 될 정도는 아니었고 큰 틀은 기존 설명과 같았습니다. 잔금일에 말소만 되면 되는 거라 굳이 다시 길게 말할 사안이 아니었다고 봤습니다.",
      "behaviorHint": "'저도 죽을 맛이었다'는 식으로 사정부터 길게 깐다. '중개사가 그렇게 하자고 했다'는 문장으로 본인 결정을 흐린다.",
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
          "tenant03:b:d-1:denial:1",
          "tenant03:b:d-1:admission:0"
        ],
        "forbidAtomIds": [
          "tenant03:b:d-1:shame:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:timeline",
      "coverageKey": "b:d-1:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:opened",
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "tenant03:beat_v2:a:d-2:motive:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "처음 안심 문구는 한별이 꺼냈고 저는 그걸 태수 씨 발언과 거의 같은 무게로 들었습니다. 태수 씨가 정정하지 않은 책임도 남습니다.",
      "behaviorHint": "출처를 고정하려고 '누가 먼저 말했냐'는 식으로 되묻는다. 호흡을 고르고 문장 끝을 또렷하게 끊는다.",
      "applicableStates": [
        "S2",
        "S3"
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
          "shaken"
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
          "M3"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:a:d-2:responsibility:0",
          "tenant03:a:d-2:responsibility:1"
        ],
        "forbidAtomIds": [
          "tenant03:a:d-2:admission:2"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:trap:context",
      "coverageKey": "a:d-2:motive:mid:trap:context",
      "variantTarget": 4,
      "setFlags": [
        "d-2:surface:evidence_seen"
      ],
      "tags": [
        "red_herring"
      ],
      "requiresFlags": [
        "d-2:surface:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:a:d-2:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "대화 첫머리를 누가 열었는지까지는 헷갈렸지만 결과적으로 태수 씨도 제지하지 않았습니다. 그래서 저는 집주인도 같은 뜻으로 받아들였습니다.",
      "behaviorHint": "출처를 고정하려고 '누가 먼저 말했냐'는 식으로 되묻는다. PDF나 캡처를 먼저 보여주며 감정 설명을 뒤로 미룬다.",
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
          "tenant03:a:d-2:self_justification:1",
          "tenant03:a:d-2:admission:0"
        ],
        "forbidAtomIds": [
          "tenant03:a:d-2:fear:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:trap:context",
      "coverageKey": "a:d-2:surface:early:trap:context",
      "variantTarget": 6,
      "setFlags": [
        "d-2:motive:opened"
      ],
      "tags": [
        "red_herring"
      ],
      "requiresFlags": [
        "d-2:surface:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:a:d-2:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "저는 태수 씨가 보험 된다는 뜻으로 말한 줄 알았습니다. 중개사 말인지 일반론인지 구분할 여지가 없을 만큼 다들 같은 방향으로 말했습니다.",
      "behaviorHint": "출처를 고정하려고 '누가 먼저 말했냐'는 식으로 되묻는다. PDF나 캡처를 먼저 보여주며 감정 설명을 뒤로 미룬다.",
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
          "tenant03:a:d-2:denial:0",
          "tenant03:a:d-2:denial:1"
        ],
        "forbidAtomIds": [
          "tenant03:a:d-2:fear:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:trap:identity",
      "coverageKey": "a:d-2:surface:early:trap:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:opened",
        "d-2:surface:identity_pressed"
      ],
      "tags": [
        "red_herring"
      ]
    },
    {
      "id": "tenant03:beat_v2:b:d-2:motive:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "한별이 출발점이었지만 제가 끊지 않은 순간부터 서윤 씨에겐 제 책임도 같이 붙었습니다. 저는 그 오해를 이용해 계약을 밀었습니다.",
      "behaviorHint": "'중개사가 그렇게 하자고 했다'는 문장으로 본인 결정을 흐린다. 길게 한숨을 쉬고 피해를 본 사람 같은 톤으로 다시 시작한다.",
      "applicableStates": [
        "S2",
        "S3"
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
          "shaken"
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
          "M3"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:b:d-2:responsibility:0",
          "tenant03:b:d-2:responsibility:1"
        ],
        "forbidAtomIds": [
          "tenant03:b:d-2:admission:2"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:trap:context",
      "coverageKey": "b:d-2:motive:mid:trap:context",
      "variantTarget": 4,
      "setFlags": [
        "d-2:surface:evidence_seen"
      ],
      "tags": [
        "red_herring"
      ],
      "requiresFlags": [
        "d-2:surface:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:b:d-2:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "누가 먼저 그 말을 했는지는 대화마다 섞여 있었고 저는 중개사 설명을 따라간 정도였습니다. 다만 제가 단호하게 선을 긋진 못했습니다.",
      "behaviorHint": "'저도 죽을 맛이었다'는 식으로 사정부터 길게 깐다. '중개사가 그렇게 하자고 했다'는 문장으로 본인 결정을 흐린다.",
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
          "tenant03:b:d-2:uncertainty:1",
          "tenant03:b:d-2:admission:0"
        ],
        "forbidAtomIds": [
          "tenant03:b:d-2:fear:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:trap:context",
      "coverageKey": "b:d-2:surface:early:trap:context",
      "variantTarget": 6,
      "setFlags": [
        "d-2:motive:opened"
      ],
      "tags": [
        "red_herring"
      ],
      "requiresFlags": [
        "d-2:surface:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:b:d-2:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "보험 된다는 말은 제가 확답한 게 아니라 중개사가 한 일반적 설명이었습니다. 저를 그 출처처럼 몰아가는 건 억울합니다.",
      "behaviorHint": "'저도 죽을 맛이었다'는 식으로 사정부터 길게 깐다. '중개사가 그렇게 하자고 했다'는 문장으로 본인 결정을 흐린다.",
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
          "tenant03:b:d-2:counter:0",
          "tenant03:b:d-2:counter:1"
        ],
        "forbidAtomIds": [
          "tenant03:b:d-2:fear:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:trap:identity",
      "coverageKey": "b:d-2:surface:early:trap:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:opened",
        "d-2:surface:identity_pressed"
      ],
      "tags": [
        "red_herring"
      ]
    },
    {
      "id": "tenant03:beat_v2:a:d-3:motive:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "실수령자는 한별 쪽으로 보이지만 저는 당시 그 비용이 집주인 뜻이라고 받아들였습니다. 태수 씨가 전혀 몰랐다고만 하면 설명이 비어 있습니다.",
      "behaviorHint": "출처를 고정하려고 '누가 먼저 말했냐'는 식으로 되묻는다. 호흡을 고르고 문장 끝을 또렷하게 끊는다.",
      "applicableStates": [
        "S2",
        "S3"
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
          "agitated",
          "shaken"
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
          "M3"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:a:d-3:responsibility:0",
          "tenant03:a:d-3:responsibility:1"
        ],
        "forbidAtomIds": [
          "tenant03:a:d-3:admission:2"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:trap:context",
      "coverageKey": "a:d-3:motive:mid:trap:context",
      "variantTarget": 4,
      "setFlags": [
        "d-3:surface:evidence_seen"
      ],
      "tags": [
        "red_herring"
      ],
      "requiresFlags": [
        "d-3:surface:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:a:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "적어도 태수 씨가 그 돈의 성격은 알고 있었다고 봤습니다. 누구 계좌로 최종 귀속됐는지는 그때 단정만 했습니다.",
      "behaviorHint": "출처를 고정하려고 '누가 먼저 말했냐'는 식으로 되묻는다. PDF나 캡처를 먼저 보여주며 감정 설명을 뒤로 미룬다.",
      "applicableStates": [
        "S0",
        "S1"
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
        "allowAtomIds": [
          "tenant03:a:d-3:admission:0",
          "tenant03:a:d-3:admission:1"
        ],
        "forbidAtomIds": [
          "tenant03:a:d-3:fear:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:context",
      "coverageKey": "a:d-3:surface:early:trap:context",
      "variantTarget": 6,
      "setFlags": [
        "d-3:motive:opened"
      ],
      "tags": [
        "red_herring"
      ],
      "requiresFlags": [
        "d-3:surface:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:a:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "180만원이 개인 계좌로 빠졌다면 결국 집주인 쪽으로 가는 돈이라고 생각했습니다. 그래서 저는 태수 씨가 모른다고는 믿기 어려웠습니다.",
      "behaviorHint": "출처를 고정하려고 '누가 먼저 말했냐'는 식으로 되묻는다. PDF나 캡처를 먼저 보여주며 감정 설명을 뒤로 미룬다.",
      "applicableStates": [
        "S0",
        "S1"
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
          "tenant03:a:d-3:admission:0",
          "tenant03:a:d-3:admission:1"
        ],
        "forbidAtomIds": [
          "tenant03:a:d-3:fear:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:identity",
      "coverageKey": "a:d-3:surface:early:trap:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-3:surface:opened",
        "d-3:surface:identity_pressed"
      ],
      "tags": [
        "red_herring"
      ]
    },
    {
      "id": "tenant03:beat_v2:b:d-3:motive:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "한별이 개인 계좌로 받은 구조였다면 저는 그걸 알아차리고도 계약만 되면 된다는 식으로 느슨하게 넘겼습니다. 책임을 중개사 뒤로만 미루긴 어렵습니다.",
      "behaviorHint": "'중개사가 그렇게 하자고 했다'는 문장으로 본인 결정을 흐린다. 길게 한숨을 쉬고 피해를 본 사람 같은 톤으로 다시 시작한다.",
      "applicableStates": [
        "S2",
        "S3"
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
          "agitated",
          "shaken"
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
          "M3"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:b:d-3:responsibility:0",
          "tenant03:b:d-3:responsibility:1"
        ],
        "forbidAtomIds": [
          "tenant03:b:d-3:admission:2"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:trap:context",
      "coverageKey": "b:d-3:motive:mid:trap:context",
      "variantTarget": 4,
      "setFlags": [
        "d-3:surface:evidence_seen"
      ],
      "tags": [
        "red_herring"
      ],
      "requiresFlags": [
        "d-3:surface:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:b:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "정식 중개보수 외 금액이 있었다는 얘기는 들었지만 세부 수납은 중개사 사무실이 알아서 하는 줄 알았습니다. 제가 직접 챙긴 돈은 아닙니다.",
      "behaviorHint": "'저도 죽을 맛이었다'는 식으로 사정부터 길게 깐다. '중개사가 그렇게 하자고 했다'는 문장으로 본인 결정을 흐린다.",
      "applicableStates": [
        "S0",
        "S1"
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
        "allowAtomIds": [
          "tenant03:b:d-3:admission:0",
          "tenant03:b:d-3:admission:1"
        ],
        "forbidAtomIds": [
          "tenant03:b:d-3:shame:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:context",
      "coverageKey": "b:d-3:surface:early:trap:context",
      "variantTarget": 6,
      "setFlags": [
        "d-3:motive:opened"
      ],
      "tags": [
        "red_herring"
      ],
      "requiresFlags": [
        "d-3:surface:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:b:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "180만원은 제 돈이 아닙니다. 그런 항목은 중개사 쪽 정산이라 저는 받은 게 없습니다. 저를 개인 수납이랑 엮는 건 너무 나간 말입니다.",
      "behaviorHint": "'저도 죽을 맛이었다'는 식으로 사정부터 길게 깐다. '중개사가 그렇게 하자고 했다'는 문장으로 본인 결정을 흐린다.",
      "applicableStates": [
        "S0",
        "S1"
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
          "tenant03:b:d-3:admission:0",
          "tenant03:b:d-3:admission:1"
        ],
        "forbidAtomIds": [
          "tenant03:b:d-3:shame:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:identity",
      "coverageKey": "b:d-3:surface:early:trap:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-3:surface:opened",
        "d-3:surface:identity_pressed"
      ],
      "tags": [
        "red_herring"
      ]
    },
    {
      "id": "tenant03:beat_v2:a:d-4:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "일정 지연 자체는 제 선택이었습니다. 하지만 그 선택은 새로 드러난 담보와 흐릿한 설명이 만든 방어 행동이었습니다.",
      "behaviorHint": "출처를 고정하려고 '누가 먼저 말했냐'는 식으로 되묻는다. 호흡을 고르고 문장 끝을 또렷하게 끊는다.",
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
          "shaken"
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
          "tenant03:a:d-4:responsibility:0",
          "tenant03:a:d-4:responsibility:1"
        ],
        "forbidAtomIds": [
          "tenant03:a:d-4:admission:2"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:pressure:responsibility",
      "coverageKey": "a:d-4:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-4:motive:opened"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-4:surface:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:a:d-4:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "저는 잔금을 고의로 미룬 게 아니라 확인이 조금 늦어진 것뿐입니다. 전입도 큰 문제 없이 이어질 줄 알았습니다.",
      "behaviorHint": "출처를 고정하려고 '누가 먼저 말했냐'는 식으로 되묻는다. PDF나 캡처를 먼저 보여주며 감정 설명을 뒤로 미룬다.",
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
          "tenant03:a:d-4:denial:0",
          "tenant03:a:d-4:denial:1"
        ],
        "forbidAtomIds": [
          "tenant03:a:d-4:shame:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:pressure:timeline",
      "coverageKey": "a:d-4:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-4:surface:opened",
        "d-4:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "tenant03:beat_v2:b:d-4:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "일정 지연은 서윤 씨 결정이었지만 그 결정을 밀어낸 건 추가 담보와 흐린 설명이었습니다. 저는 피해만 말하고 그 배경을 너무 빼고 있었습니다.",
      "behaviorHint": "'중개사가 그렇게 하자고 했다'는 문장으로 본인 결정을 흐린다. 길게 한숨을 쉬고 피해를 본 사람 같은 톤으로 다시 시작한다.",
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
          "shaken"
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
          "tenant03:b:d-4:responsibility:0",
          "tenant03:b:d-4:responsibility:1"
        ],
        "forbidAtomIds": [
          "tenant03:b:d-4:admission:2"
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
        "d-4:motive:opened"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-4:surface:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:b:d-4:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "서윤 씨가 잔금을 제때 안 넣어서 전입도 늦어진 건 명백합니다. 그 여파로 제 대출 상환 일정까지 흔들렸습니다.",
      "behaviorHint": "'저도 죽을 맛이었다'는 식으로 사정부터 길게 깐다. '중개사가 그렇게 하자고 했다'는 문장으로 본인 결정을 흐린다.",
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
          "tenant03:b:d-4:counter:0",
          "tenant03:b:d-4:counter:1"
        ],
        "forbidAtomIds": [
          "tenant03:b:d-4:harm:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:surface:pressure:timeline",
      "coverageKey": "b:d-4:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-4:surface:opened",
        "d-4:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "tenant03:beat_v2:a:d-5:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "저는 최신 말소 확인 전 잔금을 멈춰 원칙을 흔들었고 태수 씨는 최신 대출 구조를 직접 제시하지 않아 그 원칙을 더 무너뜨렸습니다. 둘 다 계약서 문장을 실제 행동으로 못 옮겼습니다.",
      "behaviorHint": "출처를 고정하려고 '누가 먼저 말했냐'는 식으로 되묻는다. 호흡을 고르고 문장 끝을 또렷하게 끊는다.",
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
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:a:d-5:responsibility:0",
          "tenant03:a:d-5:responsibility:1"
        ],
        "forbidAtomIds": [
          "tenant03:a:d-5:admission:2"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:pressure:responsibility",
      "coverageKey": "a:d-5:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:opened"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-5:surface:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:a:d-5:surface:pressure:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "당일 확인 원칙을 깨뜨린 건 거의 태수 씨 쪽이었습니다. 저는 최신 말소만 확인되면 바로 움직일 생각이었습니다.",
      "behaviorHint": "출처를 고정하려고 '누가 먼저 말했냐'는 식으로 되묻는다. PDF나 캡처를 먼저 보여주며 감정 설명을 뒤로 미룬다.",
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
          "tenant03:a:d-5:denial:0",
          "tenant03:a:d-5:denial:1"
        ],
        "forbidAtomIds": [
          "tenant03:a:d-5:shame:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:pressure:legality",
      "coverageKey": "a:d-5:surface:early:pressure:legality",
      "variantTarget": 6,
      "setFlags": [
        "d-5:surface:opened",
        "d-5:surface:legality_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "tenant03:beat_v2:b:d-5:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "한별 말에 기대며 저는 집주인 확인 의무를 비웠고 서윤 씨는 확인 전 잔금을 멈춰 서로 원칙을 흔들었습니다. 처음엔 제 몫을 너무 작게 말했습니다.",
      "behaviorHint": "'중개사가 그렇게 하자고 했다'는 문장으로 본인 결정을 흐린다. 길게 한숨을 쉬고 피해를 본 사람 같은 톤으로 다시 시작한다.",
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
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:b:d-5:responsibility:0",
          "tenant03:b:d-5:responsibility:1"
        ],
        "forbidAtomIds": [
          "tenant03:b:d-5:admission:2"
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
        "d-5:motive:opened"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-5:surface:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:b:d-5:surface:pressure:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "당일 확인 원칙은 저는 지키려 했고 서윤 씨가 잔금을 멈추면서 틀어진 겁니다. 저를 같은 선상에 두는 건 억울합니다.",
      "behaviorHint": "'저도 죽을 맛이었다'는 식으로 사정부터 길게 깐다. '중개사가 그렇게 하자고 했다'는 문장으로 본인 결정을 흐린다.",
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
          "tenant03:b:d-5:denial:0",
          "tenant03:b:d-5:denial:1"
        ],
        "forbidAtomIds": [
          "tenant03:b:d-5:shame:0"
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
        "d-5:surface:opened",
        "d-5:surface:legality_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "tenant03:beat_v2:a:d-1:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "자료를 같이 놓고 보면, 최신 수치를 먼저 흐리게 만든 건 중개사 설명이었을 수 있습니다. 그래도 집주인인 태수 씨가 추가 브리지대출을 직접 다시 말했어야 했습니다.",
      "behaviorHint": "출처를 고정하려고 '누가 먼저 말했냐'는 식으로 되묻는다. 호흡을 고르고 문장 끝을 또렷하게 끊는다.",
      "applicableStates": [
        "S2",
        "S3"
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
          "agitated",
          "shaken"
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
          "tenant03:a:d-1:admission:0",
          "tenant03:a:d-1:admission:1"
        ],
        "forbidAtomIds": [
          "tenant03:a:d-1:admission:2"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:evidence:legality",
      "coverageKey": "a:d-1:surface:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-1:surface:evidence_seen"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-1:surface:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:b:d-1:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "자료를 같이 놓고 보면, 추가 브리지대출은 있었지만 잔금으로 바로 상환될 거라 큰 차이 없다고 생각했습니다. 최신 수치를 직접 다시 말하지 않은 건 제 판단 미스였습니다.",
      "behaviorHint": "'중개사가 그렇게 하자고 했다'는 문장으로 본인 결정을 흐린다. 길게 한숨을 쉬고 피해를 본 사람 같은 톤으로 다시 시작한다.",
      "applicableStates": [
        "S2",
        "S3"
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
          "agitated",
          "shaken"
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
          "tenant03:b:d-1:admission:0",
          "tenant03:b:d-1:admission:1"
        ],
        "forbidAtomIds": [
          "tenant03:b:d-1:admission:2"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:evidence:legality",
      "coverageKey": "b:d-1:surface:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-1:surface:evidence_seen"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-1:surface:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:a:d-4:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "자료를 같이 놓고 보면, 네, 제가 잔금 일부를 이틀 보류한 건 맞습니다. 그때는 추가 담보와 보험 문제 때문에 멈추지 않으면 더 위험하다고 봤습니다.",
      "behaviorHint": "출처를 고정하려고 '누가 먼저 말했냐'는 식으로 되묻는다. 호흡을 고르고 문장 끝을 또렷하게 끊는다.",
      "applicableStates": [
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
          "agitated",
          "shaken"
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
          "tenant03:a:d-4:admission:0",
          "tenant03:a:d-4:admission:1"
        ],
        "forbidAtomIds": [
          "tenant03:a:d-4:admission:2"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:evidence:context",
      "coverageKey": "a:d-4:surface:mid:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-4:surface:evidence_seen"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-4:surface:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:b:d-4:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "자료를 같이 놓고 보면, 서윤 씨가 잔금 일부를 보류하고 전입을 늦춘 건 사실입니다. 다만 그렇게까지 불안해지게 만든 배경에 제 설명 부족도 있었습니다.",
      "behaviorHint": "'중개사가 그렇게 하자고 했다'는 문장으로 본인 결정을 흐린다. 길게 한숨을 쉬고 피해를 본 사람 같은 톤으로 다시 시작한다.",
      "applicableStates": [
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
          "agitated",
          "shaken"
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
          "tenant03:b:d-4:admission:0",
          "tenant03:b:d-4:admission:1"
        ],
        "forbidAtomIds": [
          "tenant03:b:d-4:admission:2"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:surface:evidence:context",
      "coverageKey": "b:d-4:surface:mid:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-4:surface:evidence_seen"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-4:surface:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:a:d-5:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "계약서에 적힌 당일 확인 순서를 끝까지 실행하지 못한 건 맞습니다. 다만 최신 말소 자료가 없으니 제 쪽 절차도 멈출 수밖에 없었습니다.",
      "behaviorHint": "출처를 고정하려고 '누가 먼저 말했냐'는 식으로 되묻는다. 호흡을 고르고 문장 끝을 또렷하게 끊는다.",
      "applicableStates": [
        "S2",
        "S3"
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
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:a:d-5:admission:0",
          "tenant03:a:d-5:admission:1"
        ],
        "forbidAtomIds": [
          "tenant03:a:d-5:admission:2"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:evidence:context",
      "coverageKey": "a:d-5:surface:mid:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-5:surface:evidence_seen"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-5:surface:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:b:d-5:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "자료를 같이 놓고 보면, 네, 제가 최신 말소 증빙과 대출 구조를 직접 보여주지 못한 건 맞습니다. 그래도 당일 절차를 먼저 끊은 건 서윤 씨 쪽이었습니다.",
      "behaviorHint": "'중개사가 그렇게 하자고 했다'는 문장으로 본인 결정을 흐린다. 길게 한숨을 쉬고 피해를 본 사람 같은 톤으로 다시 시작한다.",
      "applicableStates": [
        "S2",
        "S3"
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
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:b:d-5:admission:0",
          "tenant03:b:d-5:admission:1"
        ],
        "forbidAtomIds": [
          "tenant03:b:d-5:admission:2"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:evidence:context",
      "coverageKey": "b:d-5:surface:mid:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-5:surface:evidence_seen"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-5:surface:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:b:d-1:motive:fatigue:responsibility:03",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "fatigue_counter",
      "line": "지금은 저만 몰아세우는 식으로 들려요. 브리지대출만 보지 말고 최신 잔액도 같이 보셔야 해요.",
      "behaviorHint": "'중개사가 그렇게 하자고 했다'는 문장으로 본인 결정을 흐린다. 길게 한숨을 쉬고 피해를 본 사람 같은 톤으로 다시 시작한다. 같은 질문이 누적돼 방어 톤이 거칠어진다.",
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
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:b:d-1:responsibility:0",
          "tenant03:b:d-1:responsibility:1"
        ],
        "forbidAtomIds": [
          "tenant03:b:d-1:admission:2"
        ]
      },
      "weight": 5,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:fatigue:responsibility",
      "coverageKey": "b:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:fatigue_3"
      ],
      "tags": [
        "fatigue",
        "high_fatigue_counter"
      ],
      "requiresFlags": [
        "d-1:surface:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:b:d-1:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "fatigue_irritation",
      "line": "그 얘기는 아까도 말씀드렸어요. 추가 브리지대출은 있었지만 잔금으로 바로 상환될 거라 큰 차이 없다고 생각했습니다. 최신 수치를 직접 다시 말하지 않은 건 제 판단 미스였습니다. 이제 브리지대출만 계속 돌리시면 곤란해요.",
      "behaviorHint": "'중개사가 그렇게 하자고 했다'는 문장으로 본인 결정을 흐린다. 길게 한숨을 쉬고 피해를 본 사람 같은 톤으로 다시 시작한다. 같은 질문이 누적돼 방어 톤이 거칠어진다.",
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
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:b:d-1:responsibility:0",
          "tenant03:b:d-1:responsibility:1"
        ],
        "forbidAtomIds": [
          "tenant03:b:d-1:admission:2"
        ]
      },
      "weight": 5,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:fatigue:timeline",
      "coverageKey": "b:d-1:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:fatigue_1"
      ],
      "tags": [
        "fatigue",
        "turn2_irritation"
      ],
      "requiresFlags": [
        "d-1:surface:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:b:d-1:motive:fatigue:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "fatigue_block",
      "line": "같은 질문을 또 받으면 더는 할 말이 없습니다. 브리지대출하고 최신 잔액부터 정리해 오셔야 해요.",
      "behaviorHint": "'중개사가 그렇게 하자고 했다'는 문장으로 본인 결정을 흐린다. 길게 한숨을 쉬고 피해를 본 사람 같은 톤으로 다시 시작한다. 같은 질문이 누적돼 방어 톤이 거칠어진다.",
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
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:b:d-1:responsibility:0",
          "tenant03:b:d-1:responsibility:1"
        ],
        "forbidAtomIds": [
          "tenant03:b:d-1:admission:2"
        ]
      },
      "weight": 5,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:fatigue:timeline",
      "coverageKey": "b:d-1:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:fatigue_2"
      ],
      "tags": [
        "fatigue",
        "turn3_block"
      ],
      "requiresFlags": [
        "d-1:surface:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:a:d-4:motive:fatigue:responsibility:03",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "fatigue_counter",
      "line": "지금은 저만 몰아세우는 식으로 들려요. 이틀 보류만 보지 말고 분할 송금도 같이 보셔야 해요.",
      "behaviorHint": "출처를 고정하려고 '누가 먼저 말했냐'는 식으로 되묻는다. 호흡을 고르고 문장 끝을 또렷하게 끊는다. 같은 질문이 누적돼 방어 톤이 거칠어진다.",
      "applicableStates": [
        "S2",
        "S3"
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
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:a:d-4:responsibility:0",
          "tenant03:a:d-4:responsibility:1"
        ],
        "forbidAtomIds": [
          "tenant03:a:d-4:admission:2"
        ]
      },
      "weight": 5,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:fatigue:responsibility",
      "coverageKey": "a:d-4:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-4:motive:fatigue_3"
      ],
      "tags": [
        "fatigue",
        "high_fatigue_counter"
      ],
      "requiresFlags": [
        "d-4:surface:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:a:d-4:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "fatigue_irritation",
      "line": "그 얘기는 아까도 말씀드렸어요. 네, 제가 잔금 일부를 이틀 보류한 건 맞습니다. 그때는 추가 담보와 보험 문제 때문에 멈추지 않으면 더 위험하다고 봤습니다. 이제 이틀 보류만 계속 돌리시면 곤란해요.",
      "behaviorHint": "출처를 고정하려고 '누가 먼저 말했냐'는 식으로 되묻는다. 호흡을 고르고 문장 끝을 또렷하게 끊는다. 같은 질문이 누적돼 방어 톤이 거칠어진다.",
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
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:a:d-4:responsibility:0",
          "tenant03:a:d-4:responsibility:1"
        ],
        "forbidAtomIds": [
          "tenant03:a:d-4:admission:2"
        ]
      },
      "weight": 5,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:fatigue:timeline",
      "coverageKey": "a:d-4:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-4:motive:fatigue_1"
      ],
      "tags": [
        "fatigue",
        "turn2_irritation"
      ],
      "requiresFlags": [
        "d-4:surface:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:a:d-4:motive:fatigue:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "fatigue_block",
      "line": "같은 질문을 또 받으면 더는 할 말이 없습니다. 이틀 보류하고 분할 송금부터 정리해 오셔야 해요.",
      "behaviorHint": "출처를 고정하려고 '누가 먼저 말했냐'는 식으로 되묻는다. 호흡을 고르고 문장 끝을 또렷하게 끊는다. 같은 질문이 누적돼 방어 톤이 거칠어진다.",
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
          "shaken"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:a:d-4:responsibility:0",
          "tenant03:a:d-4:responsibility:1"
        ],
        "forbidAtomIds": [
          "tenant03:a:d-4:admission:2"
        ]
      },
      "weight": 5,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:fatigue:timeline",
      "coverageKey": "a:d-4:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-4:motive:fatigue_2"
      ],
      "tags": [
        "fatigue",
        "turn3_block"
      ],
      "requiresFlags": [
        "d-4:surface:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "저는 추가 담보를 본 순간 가족 돈까지 날아갈까 봐 태수 씨가 숨긴 거라고 느꼈습니다. 그 공포를 만든 건 최신 수치를 직접 말하지 않은 태도였습니다.",
      "behaviorHint": "호흡을 고르고 문장 끝을 또렷하게 끊는다. PDF나 캡처를 먼저 보여주며 감정 설명을 뒤로 미룬다.",
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
          "shaken",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "frayed"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:a:d-1:fear:0",
          "tenant03:a:d-1:fear:1"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:opened"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-1:motive:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:b:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "추가 브리지대출과 최신 상환 잔액을 알면서도 직접 다시 설명하지 않았습니다. 기존 안내가 계속 통하는 것처럼 둔 건 제 책임입니다.",
      "behaviorHint": "길게 한숨을 쉬고 피해를 본 사람 같은 톤으로 다시 시작한다. '저도 죽을 맛이었다'는 식으로 사정부터 길게 깐다.",
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
          "shaken",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "frayed"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:b:d-1:admission:2",
          "tenant03:b:d-1:admission:3"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:rapport:emotion",
      "coverageKey": "b:d-1:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:opened"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-1:motive:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:a:d-2:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "가족 돈이 걸려 있다 보니 저는 '된다'는 말을 붙잡고 싶어서 누가 먼저 말했는지보다 안심받았다는 감정에 매달렸습니다. 그래서 태수 씨 책임을 실제보다 더 크게 말했습니다.",
      "behaviorHint": "호흡을 고르고 문장 끝을 또렷하게 끊는다. PDF나 캡처를 먼저 보여주며 감정 설명을 뒤로 미룬다.",
      "applicableStates": [
        "S4",
        "S5"
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
          "open",
          "frayed"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ],
        "misconceptionStates": [
          "M4"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:a:d-2:fear:0",
          "tenant03:a:d-2:fear:1"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:core:trap:emotion",
      "coverageKey": "a:d-2:core:late:trap:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-2:core:opened"
      ],
      "tags": [
        "red_herring"
      ],
      "requiresFlags": [
        "d-2:motive:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:b:d-2:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "저도 죽을 맛이라 계약이 깨질까 봐 '그건 중개사 말입니다'라는 한마디를 못 했습니다. 그 침묵이 결국 안심 확답처럼 들리게 만들었습니다.",
      "behaviorHint": "길게 한숨을 쉬고 피해를 본 사람 같은 톤으로 다시 시작한다. '저도 죽을 맛이었다'는 식으로 사정부터 길게 깐다.",
      "applicableStates": [
        "S4",
        "S5"
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
          "open",
          "frayed"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ],
        "misconceptionStates": [
          "M4"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:b:d-2:fear:0",
          "tenant03:b:d-2:fear:1"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:core:trap:emotion",
      "coverageKey": "b:d-2:core:late:trap:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-2:core:opened"
      ],
      "tags": [
        "red_herring"
      ],
      "requiresFlags": [
        "d-2:motive:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:a:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "개인 계좌로 돈이 빠진 순간 저는 보증금까지 흔들릴 것 같아 태수 씨도 연결돼 있다고 믿고 싶지 않았습니다. 그 불안이 제 추정을 더 단정적으로 만들었습니다.",
      "behaviorHint": "호흡을 고르고 문장 끝을 또렷하게 끊는다. PDF나 캡처를 먼저 보여주며 감정 설명을 뒤로 미룬다.",
      "applicableStates": [
        "S4",
        "S5"
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
          "open",
          "frayed"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ],
        "misconceptionStates": [
          "M4"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:a:d-3:fear:0",
          "tenant03:a:d-3:fear:1"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:trap:emotion",
      "coverageKey": "a:d-3:core:late:trap:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-3:core:opened"
      ],
      "tags": [
        "red_herring"
      ],
      "requiresFlags": [
        "d-3:motive:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:b:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "그때 저는 이자랑 공사비 막느라 눈앞이 급했고 추가비용이 어디로 새는지 따져 묻는 걸 일부러 늦췄습니다. 제 통장으로 안 왔다는 말 뒤에 숨은 겁니다.",
      "behaviorHint": "길게 한숨을 쉬고 피해를 본 사람 같은 톤으로 다시 시작한다. '저도 죽을 맛이었다'는 식으로 사정부터 길게 깐다.",
      "applicableStates": [
        "S4",
        "S5"
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
          "open",
          "frayed"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ],
        "misconceptionStates": [
          "M4"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:b:d-3:shame:0",
          "tenant03:b:d-3:shame:1"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:trap:emotion",
      "coverageKey": "b:d-3:core:late:trap:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-3:core:opened"
      ],
      "tags": [
        "red_herring"
      ],
      "requiresFlags": [
        "d-3:motive:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:a:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "저는 사기 의심 뒤 잔금 일부를 이틀 보류했고 전입과 확정일자도 늦췄습니다. 의심 사유는 있었지만 일정 지연이라는 사실 자체는 제 책임으로 인정합니다.",
      "behaviorHint": "호흡을 고르고 문장 끝을 또렷하게 끊는다. PDF나 캡처를 먼저 보여주며 감정 설명을 뒤로 미룬다.",
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
          "open",
          "frayed"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:a:d-4:admission:2",
          "tenant03:a:d-4:admission:3"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:core:rapport:emotion",
      "coverageKey": "a:d-4:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-4:core:opened"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-4:motive:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:b:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "그 사람이 가족 돈까지 묶여 겁먹었다는 건 이제 이해합니다. 그래도 그날 잔금이 멈추며 제 쪽 일정도 무너졌다는 감정은 남아 있습니다.",
      "behaviorHint": "길게 한숨을 쉬고 피해를 본 사람 같은 톤으로 다시 시작한다. '저도 죽을 맛이었다'는 식으로 사정부터 길게 깐다.",
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
          "open",
          "frayed"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:b:d-4:harm:0",
          "tenant03:b:d-4:harm:1"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:core:rapport:emotion",
      "coverageKey": "b:d-4:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-4:core:opened"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-4:motive:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:a:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "그날 저는 원칙을 지킨 사람이 아니라 무너지기 직전의 원칙에 매달리다 끝내 절차를 끊은 사람이었습니다. 무섭고 창피해서 그걸 바로 말 못 했습니다.",
      "behaviorHint": "호흡을 고르고 문장 끝을 또렷하게 끊는다. PDF나 캡처를 먼저 보여주며 감정 설명을 뒤로 미룬다.",
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
          "shaken",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "frayed"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:a:d-5:shame:0",
          "tenant03:a:d-5:shame:1"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:rapport:emotion",
      "coverageKey": "a:d-5:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-5:core:opened"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-5:motive:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:b:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "당일 확인 원칙은 서윤 씨만 아니라 저도 무너뜨렸습니다. 저는 최신 대출 구조와 말소 증빙을 직접 제시하지 않은 채 중개사 설명에 기대었습니다.",
      "behaviorHint": "길게 한숨을 쉬고 피해를 본 사람 같은 톤으로 다시 시작한다. '저도 죽을 맛이었다'는 식으로 사정부터 길게 깐다.",
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
          "shaken",
          "raw"
        ],
        "trustWindowBands": [
          "open",
          "frayed"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:b:d-5:admission:2",
          "tenant03:b:d-5:admission:3"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:rapport:emotion",
      "coverageKey": "b:d-5:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-5:core:opened"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-5:motive:opened"
      ]
    },
    {
      "id": "tenant03:beat_v2:a:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interjection",
      "line": "그렇게 몰아가시면 저도 더 흔들려요. 브리지대출 얘기부터 차근히 봐 주세요.",
      "behaviorHint": "출처를 고정하려고 '누가 먼저 말했냐'는 식으로 되묻는다. 호흡을 고르고 문장 끝을 또렷하게 끊는다. 말이 먼저 튀어나오듯 끼어든다.",
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
          "tired"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:a:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant03:a:d-1:admission:2"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
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
      "id": "tenant03:beat_v2:a:d-1:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interjection",
      "line": "숫자와 시각이 다 적혀 있는데 뭉뚱그리면 안 됩니다. 브리지대출하고 최신 잔액부터 나눠 주세요.",
      "behaviorHint": "출처를 고정하려고 '누가 먼저 말했냐'는 식으로 되묻는다. 호흡을 고르고 문장 끝을 또렷하게 끊는다. 구체 숫자와 순서를 끌어와 즉시 반박한다.",
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
          "shaken"
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
          "tenant03:a:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant03:a:d-1:admission:2"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-1:surface:mid:interjection:detail_rebuttal:block",
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
      "id": "tenant03:beat_v2:b:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interjection",
      "line": "정확히는 브리지대출하고 최신 잔액가 다릅니다. 그 순서부터 바로잡아야 해요.",
      "behaviorHint": "'중개사가 그렇게 하자고 했다'는 문장으로 본인 결정을 흐린다. 길게 한숨을 쉬고 피해를 본 사람 같은 톤으로 다시 시작한다. 구체 숫자와 순서를 끌어와 즉시 반박한다.",
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
          "shaken"
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
          "tenant03:b:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant03:b:d-1:admission:2"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
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
      "id": "tenant03:beat_v2:b:d-1:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interjection",
      "line": "지금 그 말은 감정만 키워요. 브리지대출부터 분리해서 말해 주세요.",
      "behaviorHint": "'중개사가 그렇게 하자고 했다'는 문장으로 본인 결정을 흐린다. 길게 한숨을 쉬고 피해를 본 사람 같은 톤으로 다시 시작한다. 말이 먼저 튀어나오듯 끼어든다.",
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
          "tired"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:b:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant03:b:d-1:admission:2"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
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
      "id": "tenant03:beat_v2:a:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "interjection",
      "line": "지금 다들 보험 된다만 붙잡고 계신데, 그 해석이 더 큰 오해일 수 있어요.",
      "behaviorHint": "출처를 고정하려고 '누가 먼저 말했냐'는 식으로 되묻는다. 호흡을 고르고 문장 끝을 또렷하게 끊는다. 오해가 커지는 순간 급히 끼어든다.",
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
          "shaken"
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
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:a:d-2:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant03:a:d-2:admission:2"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-2:surface:mid:interjection:misbelief_escalation:allow",
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
      "id": "tenant03:beat_v2:b:d-2:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interjection",
      "line": "그 오해를 사실처럼 밀어붙이면 핵심이 흐려집니다. 보험 된다을 확정처럼 말하지 마세요.",
      "behaviorHint": "'중개사가 그렇게 하자고 했다'는 문장으로 본인 결정을 흐린다. 길게 한숨을 쉬고 피해를 본 사람 같은 톤으로 다시 시작한다. 오해가 커지는 순간 급히 끼어든다.",
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
          "shaken"
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
          "M2",
          "M3"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:b:d-2:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant03:b:d-2:admission:2"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-2:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 2,
      "setFlags": [],
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
      "id": "tenant03:beat_v2:a:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interjection",
      "line": "잘린 캡처나 단독 장면만 보면 오해가 커집니다. 180만원 원본까지 같이 봐야 해요.",
      "behaviorHint": "출처를 고정하려고 '누가 먼저 말했냐'는 식으로 되묻는다. 호흡을 고르고 문장 끝을 또렷하게 끊는다. 가짜 단서가 커지기 전에 선을 긋는다.",
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
          "shaken"
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
        ],
        "trapStates": [
          "cropped_context",
          "timestamp_drift"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:a:d-3:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant03:a:d-3:admission:2"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
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
      "id": "tenant03:beat_v2:b:d-3:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interjection",
      "line": "그 자료는 함정일 수 있습니다. 180만원만 떼어 말하면 결론이 달라져요.",
      "behaviorHint": "'중개사가 그렇게 하자고 했다'는 문장으로 본인 결정을 흐린다. 길게 한숨을 쉬고 피해를 본 사람 같은 톤으로 다시 시작한다. 가짜 단서가 커지기 전에 선을 긋는다.",
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
          "shaken"
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
        ],
        "trapStates": [
          "cropped_context",
          "timestamp_drift"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:b:d-3:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant03:b:d-3:admission:2"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
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
      "beliefMode": "suspects"
    },
    {
      "id": "tenant03:beat_v2:a:d-5:surface:mid:interjection:allow:03",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "interjection",
      "line": "그렇게 몰아가시면 저도 더 흔들려요. 당일 확인 원칙 얘기부터 차근히 봐 주세요.",
      "behaviorHint": "출처를 고정하려고 '누가 먼저 말했냐'는 식으로 되묻는다. 호흡을 고르고 문장 끝을 또렷하게 끊는다. 말이 먼저 튀어나오듯 끼어든다.",
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
          "tired"
        ],
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:a:d-5:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant03:a:d-5:admission:2"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-5:surface:mid:interjection:emotional_only:allow",
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
      "id": "tenant03:beat_v2:a:d-5:surface:mid:interjection:block:04",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "interjection",
      "line": "숫자와 시각이 다 적혀 있는데 뭉뚱그리면 안 됩니다. 당일 확인 원칙하고 말소 확인부터 나눠 주세요.",
      "behaviorHint": "출처를 고정하려고 '누가 먼저 말했냐'는 식으로 되묻는다. 호흡을 고르고 문장 끝을 또렷하게 끊는다. 구체 숫자와 순서를 끌어와 즉시 반박한다.",
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
          "shaken"
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
          "tenant03:a:d-5:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant03:a:d-5:admission:2"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-5:surface:mid:interjection:detail_rebuttal:block",
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
      "id": "tenant03:beat_v2:b:d-5:surface:mid:interjection:allow:03",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "interjection",
      "line": "정확히는 당일 확인 원칙하고 말소 확인가 다릅니다. 그 순서부터 바로잡아야 해요.",
      "behaviorHint": "'중개사가 그렇게 하자고 했다'는 문장으로 본인 결정을 흐린다. 길게 한숨을 쉬고 피해를 본 사람 같은 톤으로 다시 시작한다. 구체 숫자와 순서를 끌어와 즉시 반박한다.",
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
          "shaken"
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
          "tenant03:b:d-5:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant03:b:d-5:admission:2"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-5:surface:mid:interjection:detail_rebuttal:allow",
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
      "id": "tenant03:beat_v2:b:d-5:surface:mid:interjection:block:04",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "interjection",
      "line": "지금 그 말은 감정만 키워요. 당일 확인 원칙부터 분리해서 말해 주세요.",
      "behaviorHint": "'중개사가 그렇게 하자고 했다'는 문장으로 본인 결정을 흐린다. 길게 한숨을 쉬고 피해를 본 사람 같은 톤으로 다시 시작한다. 말이 먼저 튀어나오듯 끼어든다.",
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
          "tired"
        ],
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant03:b:d-5:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant03:b:d-5:admission:2"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
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
    }
  ]
} as const;

export default tenant03BeatsV2Full;
