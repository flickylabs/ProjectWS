export const tenant01BeatsV2Full = {
  "caseId": "tenant-01",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 58,
    "byActionFamily": {
      "question": 22,
      "evidence": 8,
      "fatigue": 6,
      "free_question": 10,
      "interjection": 12
    },
    "byIssueRole": {
      "sub_truth": 19,
      "red_herring": 12,
      "core_truth": 27
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
      "id": "tenant01:beat_v2:a:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "제 실수로 5일 늦었습니다. 그래도 같은 주에 월세와 관리비를 정리했고, 일부러 미룬 건 아니었어요.",
      "behaviorHint": "목소리를 낮추고 짧게 한숨 쉬며 대답을 미룬다.",
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
          "tenant01:a:d-1:responsibility:0",
          "tenant01:a:d-1:motive:0"
        ],
        "forbidAtomIds": [
          "tenant01:a:d-1:admission:1"
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
      "id": "tenant01:beat_v2:a:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "월세를 크게 밀린 건 아니에요. 그 주 안에 정리됐고 그냥 며칠 어긋난 정도였습니다.",
      "behaviorHint": "휴대폰 자료를 먼저 펼치며 직접 답을 늦춘다. 손으로 범위를 좁히듯 '그 부분'만 강조한다.",
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
          "tenant01:a:d-1:denial:0",
          "tenant01:a:d-1:self_justification:0"
        ],
        "forbidAtomIds": [
          "tenant01:a:d-1:fear:0"
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
      "id": "tenant01:beat_v2:b:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "길게 끈 연체는 아니었지만, 제가 공제 범위를 넓게 잡는 데 그 일이 영향을 줬습니다.",
      "behaviorHint": "표정을 거의 바꾸지 않고 숫자만 반복한다.",
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
          "tenant01:b:d-1:motive:0",
          "tenant01:b:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant01:b:d-1:admission:1"
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
      "id": "tenant01:beat_v2:b:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "월세는 약정일을 넘겼습니다. 원칙상 늦으면 늦은 겁니다.",
      "behaviorHint": "계약 특약 문구를 거의 그대로 외워 읽듯 말한다. '영수증 있습니까'부터 묻는 톤으로 자료 신빙성을 압박한다.",
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
          "tenant01:b:d-1:timeline:0",
          "tenant01:b:d-1:rule:0"
        ],
        "forbidAtomIds": [
          "tenant01:b:d-1:fear:0"
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
      "id": "tenant01:beat_v2:a:d-2:motive:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "긁힌 한 면은 인정하지만, 나머지 변색과 들뜸까지 제 탓으로 묶이는 건 억울해요. 입주 전 상태를 같이 봐야 합니다.",
      "behaviorHint": "손으로 범위를 좁히듯 '그 부분'만 강조한다. 목소리를 낮추고 짧게 한숨 쉬며 대답을 미룬다.",
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
          "tenant01:a:d-2:responsibility:0",
          "tenant01:a:d-2:evidence:1"
        ],
        "forbidAtomIds": [
          "tenant01:a:d-2:admission:1"
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
      "id": "tenant01:beat_v2:a:d-2:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "문제 되는 건 딱 그 부분 정도였어요. 나머지는 입주 때 사진에도 이미 보여요.",
      "behaviorHint": "휴대폰 자료를 먼저 펼치며 직접 답을 늦춘다. 손으로 범위를 좁히듯 '그 부분'만 강조한다.",
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
          "tenant01:a:d-2:context:0",
          "tenant01:a:d-2:admission:0"
        ],
        "forbidAtomIds": [
          "tenant01:a:d-2:fear:0"
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
      "id": "tenant01:beat_v2:a:d-2:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "사진 보시면 알아요. 벽지는 원래부터 뜨고 변색된 데가 있어서 제가 전부 망가뜨린 것처럼 볼 일은 아니에요.",
      "behaviorHint": "휴대폰 자료를 먼저 펼치며 직접 답을 늦춘다. 손으로 범위를 좁히듯 '그 부분'만 강조한다.",
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
          "tenant01:a:d-2:evidence:0",
          "tenant01:a:d-2:admission:0"
        ],
        "forbidAtomIds": [
          "tenant01:a:d-2:fear:0"
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
      "id": "tenant01:beat_v2:b:d-2:motive:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "전면 교체가 유일한 답은 아닐 수 있습니다. 다만 반려동물 손상은 다음 세입자 기준으로 민감하게 본 겁니다.",
      "behaviorHint": "표정을 거의 바꾸지 않고 숫자만 반복한다.",
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
          "tenant01:b:d-2:admission:1",
          "tenant01:b:d-2:beneficiary:0"
        ],
        "forbidAtomIds": [
          "tenant01:b:d-2:responsibility:1"
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
      "id": "tenant01:beat_v2:b:d-2:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "사진만으로는 범위를 단정하기 어렵고, 벽지는 연결 면이라 한 곳만 손보면 색이 뜹니다.",
      "behaviorHint": "계약 특약 문구를 거의 그대로 외워 읽듯 말한다. '영수증 있습니까'부터 묻는 톤으로 자료 신빙성을 압박한다.",
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
          "tenant01:b:d-2:uncertainty:0",
          "tenant01:b:d-2:rule:1"
        ],
        "forbidAtomIds": [
          "tenant01:b:d-2:fear:0"
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
      "id": "tenant01:beat_v2:b:d-2:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "반려동물 흔적이 보이면 다음 임차인을 생각해 전면 정비를 검토할 수밖에 없습니다.",
      "behaviorHint": "계약 특약 문구를 거의 그대로 외워 읽듯 말한다. '영수증 있습니까'부터 묻는 톤으로 자료 신빙성을 압박한다.",
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
          "tenant01:b:d-2:rule:0",
          "tenant01:b:d-2:admission:0"
        ],
        "forbidAtomIds": [
          "tenant01:b:d-2:fear:0"
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
      "id": "tenant01:beat_v2:a:d-3:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "제가 미룬 책임은 조금 있지만, 본수리를 미룬 건 임대인 쪽이었어요.",
      "behaviorHint": "목소리를 낮추고 짧게 한숨 쉬며 대답을 미룬다.",
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
          "tenant01:a:d-3:responsibility:0",
          "tenant01:a:d-3:counter:0"
        ],
        "forbidAtomIds": [
          "tenant01:a:d-3:admission:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:pressure:responsibility",
      "coverageKey": "a:d-3:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-3:motive:opened"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-3:surface:opened"
      ]
    },
    {
      "id": "tenant01:beat_v2:a:d-3:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "수전은 제가 험하게 써서 그런 게 아니라 계속 새던 문제였어요.",
      "behaviorHint": "휴대폰 자료를 먼저 펼치며 직접 답을 늦춘다. 목소리를 낮추고 짧게 한숨 쉬며 대답을 미룬다.",
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
          "tenant01:a:d-3:context:0",
          "tenant01:a:d-3:evidence:0"
        ],
        "forbidAtomIds": [
          "tenant01:a:d-3:fear:1"
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
        "d-3:surface:opened",
        "d-3:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "tenant01:beat_v2:b:d-3:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "입주 전부터 노후가 있었고 본수리를 미룬 건 제 쪽입니다. 다만 재통지가 늦어진 점까지 완전히 없는 일로 볼 순 없습니다.",
      "behaviorHint": "표정을 거의 바꾸지 않고 숫자만 반복한다.",
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
          "tenant01:b:d-3:responsibility:1",
          "tenant01:b:d-3:motive:0"
        ],
        "forbidAtomIds": [
          "tenant01:b:d-3:admission:2"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:pressure:responsibility",
      "coverageKey": "b:d-3:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-3:motive:opened"
      ],
      "tags": [
        "mid"
      ],
      "requiresFlags": [
        "d-3:surface:opened"
      ]
    },
    {
      "id": "tenant01:beat_v2:b:d-3:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "수전 누수는 거주 중 관리 문제로 커진 겁니다. 세입자가 바로 말했으면 이렇게 안 됐습니다.",
      "behaviorHint": "계약 특약 문구를 거의 그대로 외워 읽듯 말한다. '영수증 있습니까'부터 묻는 톤으로 자료 신빙성을 압박한다.",
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
          "tenant01:b:d-3:denial:0",
          "tenant01:b:d-3:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant01:b:d-3:motive:1"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:pressure:context",
      "coverageKey": "b:d-3:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-3:surface:opened",
        "d-3:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "tenant01:beat_v2:a:d-4:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "제가 급해서 '당일 반환'만 크게 받아들였어요. 조건이 있다는 것도 알았지만, 전면 공제 통보가 나올 줄은 몰랐습니다.",
      "behaviorHint": "목소리를 낮추고 짧게 한숨 쉬며 대답을 미룬다.",
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
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant01:a:d-4:motive:0",
          "tenant01:a:d-4:admission:0"
        ],
        "forbidAtomIds": [
          "tenant01:a:d-4:quote:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:motive:motive",
      "coverageKey": "a:d-4:motive:mid:motive:motive",
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
      "id": "tenant01:beat_v2:a:d-4:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "중개사 있는 데서 퇴거 당일 보내주신다고 하셨어요.",
      "behaviorHint": "휴대폰 자료를 먼저 펼치며 직접 답을 늦춘다. 목소리를 낮추고 짧게 한숨 쉬며 대답을 미룬다.",
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
          "tenant01:a:d-4:quote:0",
          "tenant01:a:d-4:privacy:0"
        ],
        "forbidAtomIds": [
          "tenant01:a:d-4:fear:1"
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
      "id": "tenant01:beat_v2:b:d-4:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "말을 짧게 해서 기대를 키운 건 있습니다. 중개사 있는 자리라 더 단정적으로 들렸을 수 있습니다.",
      "behaviorHint": "표정을 거의 바꾸지 않고 숫자만 반복한다.",
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
          "tired"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant01:b:d-4:admission:1",
          "tenant01:b:d-4:motive:0"
        ],
        "forbidAtomIds": [
          "tenant01:b:d-4:quote:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:motive:motive:motive",
      "coverageKey": "b:d-4:motive:mid:motive:motive",
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
      "id": "tenant01:beat_v2:b:d-4:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "보증금은 정산 끝나야 나가는 겁니다. 제가 무조건 당일 송금하겠다고 한 적은 없습니다.",
      "behaviorHint": "계약 특약 문구를 거의 그대로 외워 읽듯 말한다. '영수증 있습니까'부터 묻는 톤으로 자료 신빙성을 압박한다.",
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
          "tenant01:b:d-4:rule:0",
          "tenant01:b:d-4:admission:0"
        ],
        "forbidAtomIds": [
          "tenant01:b:d-4:fear:0"
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
      "id": "tenant01:beat_v2:a:d-5:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "제가 부담할 부분이 아예 없다는 뜻은 아니에요. 다만 부분 보수로 끝날 항목과 노후 설비까지 한꺼번에 공제한 게 문제였어요.",
      "behaviorHint": "손으로 범위를 좁히듯 '그 부분'만 강조한다. 목소리를 낮추고 짧게 한숨 쉬며 대답을 미룬다.",
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
          "tenant01:a:d-5:admission:0",
          "tenant01:a:d-5:counter:1"
        ],
        "forbidAtomIds": [
          "tenant01:a:d-5:responsibility:1"
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
      "id": "tenant01:beat_v2:a:d-5:surface:pressure:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "처음엔 거의 다 공제하겠다는 식으로 들렸어요.",
      "behaviorHint": "손으로 범위를 좁히듯 '그 부분'만 강조한다. 휴대폰 자료를 먼저 펼치며 직접 답을 늦춘다.",
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
          "tenant01:a:d-5:counter:0",
          "tenant01:a:d-5:fear:0"
        ],
        "forbidAtomIds": [
          "tenant01:a:d-5:fear:1"
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
      "id": "tenant01:beat_v2:b:d-5:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "계약상 세입자 부담이 아닌 항목까지 일단 넣은 건 사실입니다. 협상 여지를 남기려 넓게 잡았습니다.",
      "behaviorHint": "표정을 거의 바꾸지 않고 숫자만 반복한다.",
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
          "tenant01:b:d-5:admission:1",
          "tenant01:b:d-5:motive:0"
        ],
        "forbidAtomIds": [
          "tenant01:b:d-5:admission:2"
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
      "id": "tenant01:beat_v2:b:d-5:surface:pressure:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "공제 통보는 보수적으로 넓게 잡는 게 원칙입니다. 전면 도배와 수전 교체까지 검토한 건 이상한 일이 아닙니다.",
      "behaviorHint": "계약 특약 문구를 거의 그대로 외워 읽듯 말한다. '영수증 있습니까'부터 묻는 톤으로 자료 신빙성을 압박한다.",
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
          "tenant01:b:d-5:rule:0",
          "tenant01:b:d-5:context:0"
        ],
        "forbidAtomIds": [
          "tenant01:b:d-5:fear:0"
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
      "id": "tenant01:beat_v2:a:d-1:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "자료를 같이 놓고 보면, 네, 월세가 5일 늦은 건 맞아요. 다만 자동이체 한도 문제였고 장기 미납처럼 끌진 않았습니다.",
      "behaviorHint": "손으로 범위를 좁히듯 '그 부분'만 강조한다. 목소리를 낮추고 짧게 한숨 쉬며 대답을 미룬다.",
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
          "tenant01:a:d-1:admission:0",
          "tenant01:a:d-1:self_justification:1"
        ],
        "forbidAtomIds": [
          "tenant01:a:d-1:admission:1"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:evidence:context",
      "coverageKey": "a:d-1:surface:mid:evidence:context",
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
      "id": "tenant01:beat_v2:b:d-1:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "자료를 같이 놓고 보면, 상습 미납으로 본 건 아닙니다. 다만 마지막 달에 늦으면 정산 신뢰가 떨어지는 건 사실입니다.",
      "behaviorHint": "계약 특약 문구를 거의 그대로 외워 읽듯 말한다. 표정을 거의 바꾸지 않고 숫자만 반복한다.",
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
          "tenant01:b:d-1:admission:0",
          "tenant01:b:d-1:context:0"
        ],
        "forbidAtomIds": [
          "tenant01:b:d-1:admission:1"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:evidence:context",
      "coverageKey": "b:d-1:surface:mid:evidence:context",
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
      "id": "tenant01:beat_v2:a:d-3:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "관리실 기록까지 보면 입주 전부터 이어진 문제더라고요. 제가 다시 세게 말한 건 늦었지만, 원인은 제 사용 습관이 아니었습니다.",
      "behaviorHint": "휴대폰 자료를 먼저 펼치며 직접 답을 늦춘다. 목소리를 낮추고 짧게 한숨 쉬며 대답을 미룬다.",
      "applicableStates": [
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
          "tenant01:a:d-3:evidence:0",
          "tenant01:a:d-3:admission:0"
        ],
        "forbidAtomIds": [
          "tenant01:a:d-3:admission:1"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:evidence:legality",
      "coverageKey": "a:d-3:surface:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-3:surface:evidence_seen"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-3:surface:opened"
      ]
    },
    {
      "id": "tenant01:beat_v2:b:d-3:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "관리실 기록을 보니 예전 접수 흔적이 있는 건 맞더군요. 그래도 하림 씨가 다시 강하게 알린 시점은 늦었습니다.",
      "behaviorHint": "계약 특약 문구를 거의 그대로 외워 읽듯 말한다. 표정을 거의 바꾸지 않고 숫자만 반복한다.",
      "applicableStates": [
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
          "tenant01:b:d-3:admission:0",
          "tenant01:b:d-3:counter:1"
        ],
        "forbidAtomIds": [
          "tenant01:b:d-3:admission:2"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:evidence:legality",
      "coverageKey": "b:d-3:surface:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-3:surface:evidence_seen"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-3:surface:opened"
      ]
    },
    {
      "id": "tenant01:beat_v2:a:d-4:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "자료를 같이 놓고 보면, 네, 정확히는 미납 월세와 실제 복구비를 정산하면 나머지를 그날 주겠다는 말이었어요. 제가 그 조건을 앞보다 날짜만 크게 말한 건 맞습니다.",
      "behaviorHint": "휴대폰 자료를 먼저 펼치며 직접 답을 늦춘다. 목소리를 낮추고 짧게 한숨 쉬며 대답을 미룬다.",
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
          "tenant01:a:d-4:admission:0",
          "tenant01:a:d-4:self_justification:0"
        ],
        "forbidAtomIds": [
          "tenant01:a:d-4:quote:1"
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
      "id": "tenant01:beat_v2:b:d-4:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "자료를 같이 놓고 보면, 같은 날 정산이 되면 그날 보내겠다는 취지로 말한 건 맞습니다. 다만 조건 없이 전액을 준다는 뜻은 아니었습니다.",
      "behaviorHint": "계약 특약 문구를 거의 그대로 외워 읽듯 말한다. 표정을 거의 바꾸지 않고 숫자만 반복한다.",
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
          "tenant01:b:d-4:admission:0",
          "tenant01:b:d-4:counter:1"
        ],
        "forbidAtomIds": [
          "tenant01:b:d-4:quote:0"
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
      "id": "tenant01:beat_v2:a:d-5:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "자료를 같이 놓고 보면, 실제 필요한 범위보다 넓은 항목이 같이 들어왔습니다. 계약 특약상 제 부담은 고의·과실 손상과 미납액까지라고 이해했어요.",
      "behaviorHint": "휴대폰 자료를 먼저 펼치며 직접 답을 늦춘다. 손으로 범위를 좁히듯 '그 부분'만 강조한다.",
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
          "tenant01:a:d-5:context:0",
          "tenant01:a:d-5:rule:1"
        ],
        "forbidAtomIds": [
          "tenant01:a:d-5:responsibility:1"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:evidence:legality",
      "coverageKey": "a:d-5:surface:mid:evidence:legality",
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
      "id": "tenant01:beat_v2:b:d-5:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "자료를 같이 놓고 보면, 부분 보수 견적이 더 직접적인 기준인 건 맞습니다. 그래도 저는 다음 임차인 일정 때문에 넓게 통보해 둔 겁니다.",
      "behaviorHint": "계약 특약 문구를 거의 그대로 외워 읽듯 말한다. 표정을 거의 바꾸지 않고 숫자만 반복한다.",
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
          "tenant01:b:d-5:admission:0",
          "tenant01:b:d-5:beneficiary:0"
        ],
        "forbidAtomIds": [
          "tenant01:b:d-5:admission:2"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:evidence:legality",
      "coverageKey": "b:d-5:surface:mid:evidence:legality",
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
      "id": "tenant01:beat_v2:a:d-1:motive:fatigue:responsibility:03",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "fatigue_counter",
      "line": "지금은 저만 몰아세우는 식으로 들려요. 5일만 보지 말고 월세 지연도 같이 보셔야 해요.",
      "behaviorHint": "목소리를 낮추고 짧게 한숨 쉬며 대답을 미룬다. 같은 질문이 누적돼 방어 톤이 거칠어진다.",
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
          "tenant01:a:d-1:responsibility:0",
          "tenant01:a:d-1:motive:0"
        ],
        "forbidAtomIds": [
          "tenant01:a:d-1:admission:1"
        ]
      },
      "weight": 5,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:responsibility",
      "coverageKey": "a:d-1:motive:mid:fatigue:responsibility",
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
      "id": "tenant01:beat_v2:a:d-1:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "fatigue_irritation",
      "line": "그 얘기는 아까도 말씀드렸어요. 네, 월세가 5일 늦은 건 맞아요. 다만 자동이체 한도 문제였고 장기 미납처럼 끌진 않았습니다. 이제 5일만 계속 돌리시면 곤란해요.",
      "behaviorHint": "목소리를 낮추고 짧게 한숨 쉬며 대답을 미룬다. 같은 질문이 누적돼 방어 톤이 거칠어진다.",
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
          "tenant01:a:d-1:responsibility:0",
          "tenant01:a:d-1:motive:0"
        ],
        "forbidAtomIds": [
          "tenant01:a:d-1:admission:1"
        ]
      },
      "weight": 5,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:timeline",
      "coverageKey": "a:d-1:motive:mid:fatigue:timeline",
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
      "id": "tenant01:beat_v2:a:d-1:motive:fatigue:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "fatigue_block",
      "line": "같은 질문을 또 받으면 더는 할 말이 없습니다. 5일하고 월세 지연부터 정리해 오셔야 해요.",
      "behaviorHint": "목소리를 낮추고 짧게 한숨 쉬며 대답을 미룬다. 같은 질문이 누적돼 방어 톤이 거칠어진다.",
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
          "tenant01:a:d-1:responsibility:0",
          "tenant01:a:d-1:motive:0"
        ],
        "forbidAtomIds": [
          "tenant01:a:d-1:admission:1"
        ]
      },
      "weight": 5,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:timeline",
      "coverageKey": "a:d-1:motive:mid:fatigue:timeline",
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
      "id": "tenant01:beat_v2:b:d-5:motive:fatigue:responsibility:03",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "fatigue_counter",
      "line": "지금은 저만 몰아세우는 식으로 들려요. 전면 공제만 보지 말고 노후 수전 교체도 같이 보셔야 해요.",
      "behaviorHint": "표정을 거의 바꾸지 않고 숫자만 반복한다. 같은 질문이 누적돼 방어 톤이 거칠어진다.",
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
          "tenant01:b:d-5:admission:1",
          "tenant01:b:d-5:motive:0"
        ],
        "forbidAtomIds": [
          "tenant01:b:d-5:admission:2"
        ]
      },
      "weight": 5,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:fatigue:responsibility",
      "coverageKey": "b:d-5:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-5:motive:fatigue_3"
      ],
      "tags": [
        "fatigue",
        "high_fatigue_counter"
      ],
      "requiresFlags": [
        "d-5:surface:opened"
      ]
    },
    {
      "id": "tenant01:beat_v2:b:d-5:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "fatigue_irritation",
      "line": "그 얘기는 아까도 말씀드렸어요. 부분 보수 견적이 더 직접적인 기준인 건 맞습니다. 그래도 저는 다음 임차인 일정 때문에 넓게 통보해 둔 겁니다. 이제 전면 공제만 계속 돌리시면 곤란해요.",
      "behaviorHint": "표정을 거의 바꾸지 않고 숫자만 반복한다. 같은 질문이 누적돼 방어 톤이 거칠어진다.",
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
          "tenant01:b:d-5:admission:1",
          "tenant01:b:d-5:motive:0"
        ],
        "forbidAtomIds": [
          "tenant01:b:d-5:admission:2"
        ]
      },
      "weight": 5,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:fatigue:timeline",
      "coverageKey": "b:d-5:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-5:motive:fatigue_1"
      ],
      "tags": [
        "fatigue",
        "turn2_irritation"
      ],
      "requiresFlags": [
        "d-5:surface:opened"
      ]
    },
    {
      "id": "tenant01:beat_v2:b:d-5:motive:fatigue:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "fatigue_block",
      "line": "같은 질문을 또 받으면 더는 할 말이 없습니다. 전면 공제하고 노후 수전 교체부터 정리해 오셔야 해요.",
      "behaviorHint": "표정을 거의 바꾸지 않고 숫자만 반복한다. 같은 질문이 누적돼 방어 톤이 거칠어진다.",
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
          "tenant01:b:d-5:admission:1",
          "tenant01:b:d-5:motive:0"
        ],
        "forbidAtomIds": [
          "tenant01:b:d-5:admission:2"
        ]
      },
      "weight": 5,
      "priority": 20,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:fatigue:timeline",
      "coverageKey": "b:d-5:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-5:motive:fatigue_2"
      ],
      "tags": [
        "fatigue",
        "turn3_block"
      ],
      "requiresFlags": [
        "d-5:surface:opened"
      ]
    },
    {
      "id": "tenant01:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "월세는 제 실수로 정확히 5일 늦었습니다. 자동이체 한도를 못 챙겼고, 같은 주에 바로 정리했지만 그 책임은 제가 집니다.",
      "behaviorHint": "목소리를 낮추고 짧게 한숨 쉬며 대답을 미룬다.",
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
          "tenant01:a:d-1:admission:1",
          "tenant01:a:d-1:responsibility:1"
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
      "id": "tenant01:beat_v2:b:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "솔직히 마지막 달 지연을 보고 '이번 정산도 흐려지겠구나' 하는 경계심이 커졌습니다.",
      "behaviorHint": "표정을 거의 바꾸지 않고 숫자만 반복한다.",
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
          "tenant01:b:d-1:fear:0",
          "tenant01:b:d-1:self_justification:1"
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
      "id": "tenant01:beat_v2:a:d-2:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "반려묘 얘기가 나오면 제가 다 망가뜨린 사람처럼 보일까 봐 겁났어요. 그래서 '딱 거기만'이라고만 말했는데, 실제로 인정하는 범위도 그 한 면 보수까지예요.",
      "behaviorHint": "손으로 범위를 좁히듯 '그 부분'만 강조한다. 목소리를 낮추고 짧게 한숨 쉬며 대답을 미룬다.",
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
          "tenant01:a:d-2:fear:0",
          "tenant01:a:d-2:self_justification:0"
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
      "id": "tenant01:beat_v2:b:d-2:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "한 번 느슨하게 보이면 이후 관리가 무너진다고 생각해 범위를 넓게 잡았습니다.",
      "behaviorHint": "표정을 거의 바꾸지 않고 숫자만 반복한다.",
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
          "tenant01:b:d-2:fear:0",
          "tenant01:b:d-2:self_justification:1"
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
      "id": "tenant01:beat_v2:a:d-3:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "곧 나갈 집이라 괜히 예민한 세입자로 보일까 참은 것도 있어요. 그래서 늦게 다시 말한 건 제 몫이지만, 노후 설비 책임까지 떠안을 순 없어요.",
      "behaviorHint": "목소리를 낮추고 짧게 한숨 쉬며 대답을 미룬다.",
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
          "tenant01:a:d-3:fear:1",
          "tenant01:a:d-3:counter:1"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:rapport:emotion",
      "coverageKey": "a:d-3:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-3:core:opened"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-3:motive:opened"
      ]
    },
    {
      "id": "tenant01:beat_v2:b:d-3:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "수전 누수의 주된 원인은 노후 부품이었습니다. 하림 씨 재통지가 늦은 부분은 있어도, 주된 수리 책임은 제게 있습니다.",
      "behaviorHint": "표정을 거의 바꾸지 않고 숫자만 반복한다.",
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
          "tenant01:b:d-3:admission:2",
          "tenant01:b:d-3:responsibility:2"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:rapport:emotion",
      "coverageKey": "b:d-3:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-3:core:opened"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-3:motive:opened"
      ]
    },
    {
      "id": "tenant01:beat_v2:a:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "그날 돈이 꼭 필요해서 조건보다 날짜만 붙잡았어요. 그래서 약속을 말할 때도 제게 유리한 부분만 먼저 꺼냈습니다.",
      "behaviorHint": "목소리를 낮추고 짧게 한숨 쉬며 대답을 미룬다.",
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
          "tenant01:a:d-4:fear:1",
          "tenant01:a:d-4:shame:0"
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
      "id": "tenant01:beat_v2:b:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "제가 한 말은 '미납 월세와 실제 복구비만 정산하면 나머지는 이사 당일 보내겠다'는 취지였습니다. 그 약속을 뒤집을 정도로 범위를 넓힌 건 제 판단이었습니다.",
      "behaviorHint": "표정을 거의 바꾸지 않고 숫자만 반복한다.",
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
          "tenant01:b:d-4:quote:0",
          "tenant01:b:d-4:responsibility:0"
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
      "id": "tenant01:beat_v2:a:d-5:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "보증금이 급해서 더 크게 느껴진 것도 있지만, 범위를 넓혀 통보받았다는 불안은 실제였어요.",
      "behaviorHint": "목소리를 낮추고 짧게 한숨 쉬며 대답을 미룬다.",
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
          "tenant01:a:d-5:fear:1",
          "tenant01:a:d-5:context:0"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:motive:motive",
      "coverageKey": "a:d-5:core:late:motive:motive",
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
      "id": "tenant01:beat_v2:b:d-5:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "전면 도배와 노후 수전 교체까지 한꺼번에 공제 항목에 넣은 건 과했습니다. 실제 필요한 범위와 계약 특약을 넘은 통보였습니다.",
      "behaviorHint": "표정을 거의 바꾸지 않고 숫자만 반복한다.",
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
          "tenant01:b:d-5:admission:2",
          "tenant01:b:d-5:rule:2"
        ],
        "forbidAtomIds": []
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:motive:motive",
      "coverageKey": "b:d-5:core:late:motive:motive",
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
      "id": "tenant01:beat_v2:a:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "interjection",
      "line": "지금 다들 거실 한 면만 붙잡고 계신데, 그 해석이 더 큰 오해일 수 있어요.",
      "behaviorHint": "손으로 범위를 좁히듯 '그 부분'만 강조한다. 목소리를 낮추고 짧게 한숨 쉬며 대답을 미룬다. 오해가 커지는 순간 급히 끼어든다.",
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
          "tenant01:a:d-2:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant01:a:d-2:admission:1"
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
      "beliefMode": "knows"
    },
    {
      "id": "tenant01:beat_v2:a:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "interjection",
      "line": "잘린 캡처나 단독 장면만 보면 오해가 커집니다. 거실 한 면 원본까지 같이 봐야 해요.",
      "behaviorHint": "손으로 범위를 좁히듯 '그 부분'만 강조한다. 목소리를 낮추고 짧게 한숨 쉬며 대답을 미룬다. 가짜 단서가 커지기 전에 선을 긋는다.",
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
          "tenant01:a:d-2:responsibility:0"
        ],
        "forbidAtomIds": [
          "tenant01:a:d-2:admission:1"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-2:surface:mid:interjection:trap_signal:allow",
      "variantTarget": 2,
      "setFlags": [],
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
      "id": "tenant01:beat_v2:b:d-2:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interjection",
      "line": "그 오해를 사실처럼 밀어붙이면 핵심이 흐려집니다. 거실 한 면을 확정처럼 말하지 마세요.",
      "behaviorHint": "표정을 거의 바꾸지 않고 숫자만 반복한다. 오해가 커지는 순간 급히 끼어든다.",
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
          "M2",
          "M3"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "tenant01:b:d-2:admission:1"
        ],
        "forbidAtomIds": [
          "tenant01:b:d-2:responsibility:1"
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
      "id": "tenant01:beat_v2:b:d-2:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interjection",
      "line": "그 자료는 함정일 수 있습니다. 거실 한 면만 떼어 말하면 결론이 달라져요.",
      "behaviorHint": "표정을 거의 바꾸지 않고 숫자만 반복한다. 가짜 단서가 커지기 전에 선을 긋는다.",
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
          "tenant01:b:d-2:admission:1"
        ],
        "forbidAtomIds": [
          "tenant01:b:d-2:responsibility:1"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-2:surface:mid:interjection:trap_signal:block",
      "variantTarget": 2,
      "setFlags": [],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "trap_signal",
        "red_herring"
      ],
      "beliefMode": "misbelief"
    },
    {
      "id": "tenant01:beat_v2:a:d-4:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "interjection",
      "line": "그렇게 몰아가시면 저도 더 흔들려요. 이사 당일 얘기부터 차근히 봐 주세요.",
      "behaviorHint": "목소리를 낮추고 짧게 한숨 쉬며 대답을 미룬다. 말이 먼저 튀어나오듯 끼어든다.",
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
          "tenant01:a:d-4:motive:0"
        ],
        "forbidAtomIds": [
          "tenant01:a:d-4:quote:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-4:surface:mid:interjection:emotional_only:allow",
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
      "id": "tenant01:beat_v2:a:d-4:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "interjection",
      "line": "숫자와 시각이 다 적혀 있는데 뭉뚱그리면 안 됩니다. 이사 당일하고 보증금 반환부터 나눠 주세요.",
      "behaviorHint": "목소리를 낮추고 짧게 한숨 쉬며 대답을 미룬다. 구체 숫자와 순서를 끌어와 즉시 반박한다.",
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
          "tenant01:a:d-4:motive:0"
        ],
        "forbidAtomIds": [
          "tenant01:a:d-4:quote:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-4:surface:mid:interjection:detail_rebuttal:block",
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
      "id": "tenant01:beat_v2:b:d-4:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "interjection",
      "line": "정확히는 이사 당일하고 보증금 반환가 다릅니다. 그 순서부터 바로잡아야 해요.",
      "behaviorHint": "표정을 거의 바꾸지 않고 숫자만 반복한다. 구체 숫자와 순서를 끌어와 즉시 반박한다.",
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
          "tenant01:b:d-4:admission:1"
        ],
        "forbidAtomIds": [
          "tenant01:b:d-4:quote:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-4:surface:mid:interjection:detail_rebuttal:allow",
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
      "id": "tenant01:beat_v2:b:d-4:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "interjection",
      "line": "지금 그 말은 감정만 키워요. 이사 당일부터 분리해서 말해 주세요.",
      "behaviorHint": "표정을 거의 바꾸지 않고 숫자만 반복한다. 말이 먼저 튀어나오듯 끼어든다.",
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
          "tenant01:b:d-4:admission:1"
        ],
        "forbidAtomIds": [
          "tenant01:b:d-4:quote:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-4:surface:mid:interjection:emotional_only:block",
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
      "id": "tenant01:beat_v2:a:d-5:surface:mid:interjection:allow:03",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "interjection",
      "line": "그렇게 몰아가시면 저도 더 흔들려요. 전면 공제 얘기부터 차근히 봐 주세요.",
      "behaviorHint": "손으로 범위를 좁히듯 '그 부분'만 강조한다. 목소리를 낮추고 짧게 한숨 쉬며 대답을 미룬다. 말이 먼저 튀어나오듯 끼어든다.",
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
          "tenant01:a:d-5:admission:0"
        ],
        "forbidAtomIds": [
          "tenant01:a:d-5:responsibility:1"
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
      "id": "tenant01:beat_v2:a:d-5:surface:mid:interjection:block:04",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "interjection",
      "line": "숫자와 시각이 다 적혀 있는데 뭉뚱그리면 안 됩니다. 전면 공제하고 노후 수전 교체부터 나눠 주세요.",
      "behaviorHint": "손으로 범위를 좁히듯 '그 부분'만 강조한다. 목소리를 낮추고 짧게 한숨 쉬며 대답을 미룬다. 구체 숫자와 순서를 끌어와 즉시 반박한다.",
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
          "tenant01:a:d-5:admission:0"
        ],
        "forbidAtomIds": [
          "tenant01:a:d-5:responsibility:1"
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
      "id": "tenant01:beat_v2:b:d-5:surface:mid:interjection:allow:03",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "interjection",
      "line": "정확히는 전면 공제하고 노후 수전 교체가 다릅니다. 그 순서부터 바로잡아야 해요.",
      "behaviorHint": "표정을 거의 바꾸지 않고 숫자만 반복한다. 구체 숫자와 순서를 끌어와 즉시 반박한다.",
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
          "tenant01:b:d-5:admission:1"
        ],
        "forbidAtomIds": [
          "tenant01:b:d-5:admission:2"
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
      "id": "tenant01:beat_v2:b:d-5:surface:mid:interjection:block:04",
      "schemaVersion": "beat_v2",
      "caseId": "tenant-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "interjection",
      "line": "지금 그 말은 감정만 키워요. 전면 공제부터 분리해서 말해 주세요.",
      "behaviorHint": "표정을 거의 바꾸지 않고 숫자만 반복한다. 말이 먼저 튀어나오듯 끼어든다.",
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
          "tenant01:b:d-5:admission:1"
        ],
        "forbidAtomIds": [
          "tenant01:b:d-5:admission:2"
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

export default tenant01BeatsV2Full;
