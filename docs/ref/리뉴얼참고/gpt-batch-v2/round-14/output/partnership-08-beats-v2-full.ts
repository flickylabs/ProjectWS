export const partnership08BeatsV2Full = {
  "caseId": "partnership-08",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 64,
    "byActionFamily": {
      "evidence": 10,
      "fatigue": 6,
      "free_question": 2,
      "interjection": 12,
      "question": 34
    },
    "byDispute": {
      "d-1": 25,
      "d-2": 25,
      "d-3": 10,
      "d-4": 2,
      "d-5": 2
    },
    "byIssueRole": {
      "core_truth": 50,
      "shared_misconception": 10,
      "sub_truth": 4
    },
    "byResponseIntent": {
      "evidence_response": 8,
      "fatigue_response": 6,
      "motive_response": 5,
      "pressure_response": 24,
      "rapport_response": 11,
      "trap_confusion_response": 10
    },
    "byStage": {
      "early": 22,
      "late": 10,
      "mid": 32
    },
    "interjectionInfoLevels": {
      "detail_rebuttal": 4,
      "emotional_only": 4,
      "misbelief_escalation": 4
    },
    "requiredMatrixSatisfied": {
      "question early timeline": true,
      "question early identity/context": true,
      "question mid responsibility": true,
      "question mid motive": true,
      "question late emotion": true,
      "evidence early/mid context/identity/legality": true,
      "fatigue mid resp/timeline": true,
      "free_question late motive/emotion": true,
      "misbelief early": true,
      "misbelief late": true
    }
  },
  "beats": [
    {
      "id": "partnership08:beat_v2:a:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "끊은 게 아니라 잠깐 세운 겁니다. 현금보유액 확인 전엔 못 움직여요.",
      "behaviorHint": "말은 차갑지만 핵심 감정을 건드리지 않으려 서류와 수치부터 꺼낸다.",
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
          "partnership-08:a:d-1:denial:0",
          "partnership-08:a:d-1:rule:0"
        ],
        "forbidAtomIds": [
          "partnership-08:a:d-1:admission:1",
          "partnership-08:a:d-1:emotion:0"
        ]
      },
      "weight": 7,
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
        "hot"
      ]
    },
    {
      "id": "partnership08:beat_v2:a:d-1:surface:pressure:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "먼저 시간순으로 보면, 가계약을 끊은 게 아니라 숫자 확인을 위해 잠깐 멈춘 것뿐입니다.",
      "behaviorHint": "말은 차갑지만 핵심 감정을 건드리지 않으려 서류와 수치부터 꺼낸다.",
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
          "partnership-08:a:d-1:denial:0",
          "partnership-08:a:d-1:rule:0"
        ],
        "forbidAtomIds": [
          "partnership-08:a:d-1:admission:1",
          "partnership-08:a:d-1:emotion:0"
        ]
      },
      "weight": 7,
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
        "hot"
      ]
    },
    {
      "id": "partnership08:beat_v2:a:d-1:surface:pressure:timeline:03",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "먼저 시간순으로 보면, 무조건 취소가 아니라 조건이 확인될 때까지 보류한 겁니다.",
      "behaviorHint": "말은 차갑지만 핵심 감정을 건드리지 않으려 서류와 수치부터 꺼낸다.",
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
          "partnership-08:a:d-1:denial:0",
          "partnership-08:a:d-1:rule:0"
        ],
        "forbidAtomIds": [
          "partnership-08:a:d-1:admission:1",
          "partnership-08:a:d-1:emotion:0"
        ]
      },
      "weight": 7,
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
        "hot"
      ]
    },
    {
      "id": "partnership08:beat_v2:a:d-1:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "counter",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 가계약을 끊은 게 아니라 숫자 확인을 위해 잠깐 멈춘 것뿐입니다.",
      "behaviorHint": "말은 차갑지만 핵심 감정을 건드리지 않으려 서류와 수치부터 꺼낸다.",
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
          "partnership-08:a:d-1:denial:0",
          "partnership-08:a:d-1:rule:0"
        ],
        "forbidAtomIds": [
          "partnership-08:a:d-1:admission:1",
          "partnership-08:a:d-1:emotion:0"
        ]
      },
      "weight": 6,
      "priority": 29,
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
      "id": "partnership08:beat_v2:a:d-1:surface:pressure:context:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 무조건 취소가 아니라 조건이 확인될 때까지 보류한 겁니다.",
      "behaviorHint": "말은 차갑지만 핵심 감정을 건드리지 않으려 서류와 수치부터 꺼낸다.",
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
          "partnership-08:a:d-1:denial:0",
          "partnership-08:a:d-1:rule:0"
        ],
        "forbidAtomIds": [
          "partnership-08:a:d-1:admission:1",
          "partnership-08:a:d-1:emotion:0"
        ]
      },
      "weight": 6,
      "priority": 29,
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
      "id": "partnership08:beat_v2:a:d-1:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "counter",
      "line": "누가 무엇을 결정했는지부터 분리해야 합니다. 무조건 취소가 아니라 조건이 확인될 때까지 보류한 겁니다.",
      "behaviorHint": "말은 차갑지만 핵심 감정을 건드리지 않으려 서류와 수치부터 꺼낸다.",
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
          "partnership-08:a:d-1:denial:0",
          "partnership-08:a:d-1:rule:0"
        ],
        "forbidAtomIds": [
          "partnership-08:a:d-1:admission:1",
          "partnership-08:a:d-1:emotion:0"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:identity",
      "coverageKey": "a:d-1:surface:early:pressure:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-1:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership08:beat_v2:a:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 최종 미팅 없이 처리한 건 절차상 제 잘못입니다. 다만 그 직전 수치가 버티지 못했고 누군가는 멈춰야 했습니다.",
      "behaviorHint": "정당화 논리를 또박또박 정리하지만 끝부분에서 미세하게 속도가 늦어진다.",
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-08:a:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "partnership-08:a:d-1:admission:1"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:pressure:responsibility",
      "coverageKey": "a:d-1:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-1:motive:responsibility_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "partnership08:beat_v2:a:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "justify",
      "line": "제가 그렇게 말하거나 움직인 데엔 이유가 있었습니다. 제가 먼저 멈춘 건 맞지만 현금성 자산과 리스 부담을 보고 위험하다고 본 겁니다.",
      "behaviorHint": "정당화 논리를 또박또박 정리하지만 끝부분에서 미세하게 속도가 늦어진다.",
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-08:a:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "partnership-08:a:d-1:admission:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:motive:motive",
      "coverageKey": "a:d-1:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-1:motive:motive_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "partnership08:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "저를 무조건 약속 파기한 사람으로만 만들지 마세요. 저는 회사를 다시 적자에 빠뜨릴까 봐 버틴 겁니다.",
      "behaviorHint": "처음으로 계산을 내려놓듯 말이 느려지고 표정이 풀린다.",
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
          "partnership-08:a:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-08:a:d-1:denial:0",
          "partnership-08:a:d-1:rule:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-1:core:hurt_exposed"
      ],
      "tags": [
        "late"
      ]
    },
    {
      "id": "partnership08:beat_v2:a:d-1:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confess",
      "line": "이제는 숨기지 않겠습니다. 네, 저는 마지막 조율도 없이 홀드를 놓았고 그 방식이 배신처럼 들릴 걸 알았습니다. 조건 미충족은 사실이지만 처리 방식은 제 책임입니다.",
      "behaviorHint": "처음으로 계산을 내려놓듯 말이 느려지고 표정이 풀린다.",
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
          "partnership-08:a:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-08:a:d-1:denial:0",
          "partnership-08:a:d-1:rule:0"
        ]
      },
      "weight": 4,
      "priority": 23,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-1:core:hurt_exposed"
      ],
      "tags": [
        "late"
      ]
    },
    {
      "id": "partnership08:beat_v2:a:d-1:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "cornered",
      "line": "잠깐 멈춘 결정이었다면 왜 공동대표 최종 조율 없이 홀드 포기 통보가 먼저 나갔습니까.",
      "behaviorHint": "증거 문구를 확인하듯 짧게 되뇌며 방어선을 다시 세운다.",
      "applicableStates": [
        "S1",
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
          "partnership-08:a:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "partnership-08:a:d-1:denial:0"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:evidence:context",
      "coverageKey": "a:d-1:surface:early:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-1:surface:evidence_seen"
      ],
      "tags": [
        "evidence"
      ]
    },
    {
      "id": "partnership08:beat_v2:a:d-1:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "그 자료를 봐도, 제가 먼저 멈춘 건 맞지만 현금성 자산과 리스 부담을 보고 위험하다고 본 겁니다.",
      "behaviorHint": "증거 문구를 확인하듯 짧게 되뇌며 방어선을 다시 세운다.",
      "applicableStates": [
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-08:a:d-1:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "partnership-08:a:d-1:denial:0",
          "partnership-08:a:d-1:rule:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:evidence:legality",
      "coverageKey": "a:d-1:motive:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:responsibility_named"
      ],
      "tags": [
        "evidence"
      ]
    },
    {
      "id": "partnership08:beat_v2:a:d-1:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "irritate",
      "line": "같은 성수 2호점 이야기를 또 반복해야 합니까. 이미 제가 왜 그렇게 움직였는지는 설명했습니다.",
      "behaviorHint": "짧고 건조하게 끊어 말하며 피로를 숨기지 못한다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
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
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-08:a:d-1:admission:0",
          "partnership-08:a:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "partnership-08:a:d-1:admission:1"
        ]
      },
      "weight": 3,
      "priority": 20,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:timeline",
      "coverageKey": "a:d-1:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:fatigue_warning_2"
      ],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "partnership08:beat_v2:a:d-1:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "block",
      "line": "좋습니다. 그럼 핵심만 말하죠. 책임을 묻고 싶다면 앞뒤 흐름까지 같이 보셔야 합니다.",
      "behaviorHint": "짧고 건조하게 끊어 말하며 피로를 숨기지 못한다.",
      "applicableStates": [
        "S2",
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
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-08:a:d-1:responsibility:0",
          "partnership-08:a:d-1:admission:0"
        ],
        "forbidAtomIds": [
          "partnership-08:a:d-1:admission:1"
        ]
      },
      "weight": 3,
      "priority": 20,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:responsibility",
      "coverageKey": "a:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:fatigue_block_3"
      ],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "partnership08:beat_v2:a:d-1:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "counter_fatigue",
      "line": "계속 저만 몰아가면 남는 건 방어뿐입니다. 왜 그 판단이 나왔는지까지 같이 물어야 공정합니다.",
      "behaviorHint": "짧고 건조하게 끊어 말하며 피로를 숨기지 못한다.",
      "applicableStates": [
        "S2",
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
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-08:a:d-1:responsibility:0",
          "partnership-08:a:d-1:admission:0"
        ],
        "forbidAtomIds": [
          "partnership-08:a:d-1:admission:1"
        ]
      },
      "weight": 3,
      "priority": 20,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:responsibility",
      "coverageKey": "a:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-1:core:fatigue_counter_ready"
      ],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "partnership08:beat_v2:a:d-1:surface:pressure:timeline:04",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "transition",
      "line": "메일은 제가 보낸 게 맞습니다. 다만 그 시점엔 후보지를 그냥 밀 수가 없다고 봤어요.",
      "behaviorHint": "질문의 전제를 다시 정의하려는 듯 문장을 고쳐 세운다.",
      "applicableStates": [
        "S1",
        "S2"
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
          "partnership-08:a:d-1:denial:0",
          "partnership-08:a:d-1:rule:0"
        ],
        "forbidAtomIds": [
          "partnership-08:a:d-1:admission:1",
          "partnership-08:a:d-1:emotion:0"
        ]
      },
      "weight": 4,
      "priority": 25,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:timeline",
      "coverageKey": "a:d-1:surface:early:pressure:timeline",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "transition"
      ]
    },
    {
      "id": "partnership08:beat_v2:b:d-1:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 시원이 갑자기 2호점을 접어버린 겁니다.",
      "behaviorHint": "현재 장면을 과거 상처와 겹쳐 말하며 자기방어를 먼저 세운다.",
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
          "partnership-08:b:d-1:context:0",
          "partnership-08:b:d-1:denial:0"
        ],
        "forbidAtomIds": [
          "partnership-08:b:d-1:emotion:0",
          "partnership-08:b:d-1:admission:1"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:context",
      "coverageKey": "b:d-1:surface:early:pressure:context",
      "variantTarget": 4,
      "setFlags": [
        "d-1:surface:counter_seen"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership08:beat_v2:b:d-1:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "counter",
      "line": "누가 무엇을 결정했는지부터 분리해야 합니다. 적어도 저한테는 올해 여름 2호점이 가는 흐름으로 들렸어요.",
      "behaviorHint": "현재 장면을 과거 상처와 겹쳐 말하며 자기방어를 먼저 세운다.",
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
          "partnership-08:b:d-1:denial:0",
          "partnership-08:b:d-1:context:0"
        ],
        "forbidAtomIds": [
          "partnership-08:b:d-1:emotion:0",
          "partnership-08:b:d-1:admission:1"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:surface:pressure:identity",
      "coverageKey": "b:d-1:surface:early:pressure:identity",
      "variantTarget": 4,
      "setFlags": [
        "d-1:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership08:beat_v2:b:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "justify",
      "line": "제가 그렇게 말하거나 움직인 데엔 이유가 있었습니다. 보류 통보가 단독이었던 건 맞고, 그래서 저는 약속이 깨졌다고 느꼈어요.",
      "behaviorHint": "피해 서사를 발판으로 책임의 비율을 다시 배치한다.",
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-08:b:d-1:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "partnership-08:b:d-1:admission:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:motive:motive",
      "coverageKey": "b:d-1:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-1:motive:counter_motive_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "partnership08:beat_v2:b:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "emotional",
      "line": "저한테 5주년은 그냥 행사 문구가 아니었어요. 제가 5년 동안 만든 성장의 약속처럼 들렸다고요.",
      "behaviorHint": "상처와 억울함이 한꺼번에 올라와 감정 표현이 길어진다.",
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
          "partnership-08:b:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-08:b:d-1:denial:0",
          "partnership-08:b:d-1:context:0"
        ]
      },
      "weight": 4,
      "priority": 23,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:core:rapport:emotion",
      "coverageKey": "b:d-1:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-1:core:counter_hurt_exposed"
      ],
      "tags": [
        "late"
      ]
    },
    {
      "id": "partnership08:beat_v2:b:d-1:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "잠깐 멈춘 결정이었다면 왜 공동대표 최종 조율 없이 홀드 포기 통보가 먼저 나갔습니까.",
      "behaviorHint": "증거보다 왜 그렇게 느꼈는지를 먼저 끌어와 방어한다.",
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-08:b:d-1:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "partnership-08:b:d-1:denial:0",
          "partnership-08:b:d-1:context:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-1:motive:evidence:identity",
      "coverageKey": "b:d-1:motive:mid:evidence:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:counter_evidence_seen"
      ],
      "tags": [
        "evidence"
      ]
    },
    {
      "id": "partnership08:beat_v2:b:d-2:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "독립을 확정한 게 아니라 불안해서 도망칠 길을 떠올린 거였어요.",
      "behaviorHint": "현재 장면을 과거 상처와 겹쳐 말하며 자기방어를 먼저 세운다.",
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
          "partnership-08:b:d-2:denial:0",
          "partnership-08:b:d-2:privacy:0"
        ],
        "forbidAtomIds": [
          "partnership-08:b:d-2:admission:1",
          "partnership-08:b:d-2:emotion:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:timeline",
      "coverageKey": "b:d-2:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership08:beat_v2:b:d-2:surface:pressure:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "먼저 시간순으로 보면, 저는 따로 스튜디오를 차리려던 게 아니라 숨통을 찾으려던 거였어요.",
      "behaviorHint": "현재 장면을 과거 상처와 겹쳐 말하며 자기방어를 먼저 세운다.",
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
          "partnership-08:b:d-2:denial:0",
          "partnership-08:b:d-2:privacy:0"
        ],
        "forbidAtomIds": [
          "partnership-08:b:d-2:admission:1",
          "partnership-08:b:d-2:emotion:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:timeline",
      "coverageKey": "b:d-2:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership08:beat_v2:b:d-2:surface:pressure:timeline:03",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "먼저 시간순으로 보면, 그 DM도 맥락이 잘린 거예요. 힘든 강사에게 한 말이 다예요.",
      "behaviorHint": "현재 장면을 과거 상처와 겹쳐 말하며 자기방어를 먼저 세운다.",
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
          "partnership-08:b:d-2:denial:0",
          "partnership-08:b:d-2:privacy:0"
        ],
        "forbidAtomIds": [
          "partnership-08:b:d-2:admission:1",
          "partnership-08:b:d-2:emotion:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:timeline",
      "coverageKey": "b:d-2:surface:early:pressure:timeline",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership08:beat_v2:b:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "counter",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 저는 따로 스튜디오를 차리려던 게 아니라 숨통을 찾으려던 거였어요.",
      "behaviorHint": "현재 장면을 과거 상처와 겹쳐 말하며 자기방어를 먼저 세운다.",
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
          "partnership-08:b:d-2:denial:0",
          "partnership-08:b:d-2:privacy:0"
        ],
        "forbidAtomIds": [
          "partnership-08:b:d-2:admission:1",
          "partnership-08:b:d-2:emotion:0"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:context",
      "coverageKey": "b:d-2:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership08:beat_v2:b:d-2:surface:pressure:context:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 그 DM도 맥락이 잘린 거예요. 힘든 강사에게 한 말이 다예요.",
      "behaviorHint": "현재 장면을 과거 상처와 겹쳐 말하며 자기방어를 먼저 세운다.",
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
          "partnership-08:b:d-2:denial:0",
          "partnership-08:b:d-2:privacy:0"
        ],
        "forbidAtomIds": [
          "partnership-08:b:d-2:admission:1",
          "partnership-08:b:d-2:emotion:0"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:context",
      "coverageKey": "b:d-2:surface:early:pressure:context",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:context_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership08:beat_v2:b:d-2:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "counter",
      "line": "누가 무엇을 결정했는지부터 분리해야 합니다. 그 DM도 맥락이 잘린 거예요. 힘든 강사에게 한 말이 다예요.",
      "behaviorHint": "현재 장면을 과거 상처와 겹쳐 말하며 자기방어를 먼저 세운다.",
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
          "partnership-08:b:d-2:denial:0",
          "partnership-08:b:d-2:privacy:0"
        ],
        "forbidAtomIds": [
          "partnership-08:b:d-2:admission:1",
          "partnership-08:b:d-2:emotion:0"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:identity",
      "coverageKey": "b:d-2:surface:early:pressure:identity",
      "variantTarget": 6,
      "setFlags": [
        "d-2:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership08:beat_v2:b:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 제가 비밀스럽게 움직인 건 맞아요. 그런데 시원이 언제든 끊을 수 있다는 불안이 너무 컸어요.",
      "behaviorHint": "피해 서사를 발판으로 책임의 비율을 다시 배치한다.",
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-08:b:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "partnership-08:b:d-2:admission:1"
        ]
      },
      "weight": 5,
      "priority": 27,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:pressure:responsibility",
      "coverageKey": "b:d-2:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-2:motive:backup_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "partnership08:beat_v2:b:d-2:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "justify",
      "line": "제가 그렇게 말하거나 움직인 데엔 이유가 있었습니다. 불안해서 백업처럼 생각한 적은 있어요. 그래도 바로 독립 확정은 아니었어요.",
      "behaviorHint": "피해 서사를 발판으로 책임의 비율을 다시 배치한다.",
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-08:b:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "partnership-08:b:d-2:admission:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:motive:motive",
      "coverageKey": "b:d-2:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-2:motive:motive_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "partnership08:beat_v2:b:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "네, 저도 숨을 곳을 찾았어요. 그런데 그걸 찾게 만든 불안이 없었던 것처럼 말하진 마세요.",
      "behaviorHint": "상처와 억울함이 한꺼번에 올라와 감정 표현이 길어진다.",
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
          "partnership-08:b:d-2:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-08:b:d-2:denial:0",
          "partnership-08:b:d-2:privacy:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:core:rapport:emotion",
      "coverageKey": "b:d-2:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-2:core:fear_exposed"
      ],
      "tags": [
        "late"
      ]
    },
    {
      "id": "partnership08:beat_v2:b:d-2:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confess",
      "line": "이제는 숨기지 않겠습니다. 네, 별도 스튜디오 준비를 실제로 했습니다. 상처를 이유로 정당화했지만 회사 밖 판까지 짜고 있었어요.",
      "behaviorHint": "상처와 억울함이 한꺼번에 올라와 감정 표현이 길어진다.",
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
          "partnership-08:b:d-2:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-08:b:d-2:denial:0",
          "partnership-08:b:d-2:privacy:0"
        ]
      },
      "weight": 4,
      "priority": 23,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:core:rapport:emotion",
      "coverageKey": "b:d-2:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-2:core:fear_exposed"
      ],
      "tags": [
        "late"
      ]
    },
    {
      "id": "partnership08:beat_v2:b:d-2:surface:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "cornered",
      "line": "순수한 피해자라면 왜 별도 법인 초안과 강사 합류 시트가 보류 통보 전부터 준비돼 있었습니까.",
      "behaviorHint": "증거보다 왜 그렇게 느꼈는지를 먼저 끌어와 방어한다.",
      "applicableStates": [
        "S1",
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
          "partnership-08:b:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "partnership-08:b:d-2:denial:0"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:evidence:context",
      "coverageKey": "b:d-2:surface:early:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:evidence_seen"
      ],
      "tags": [
        "evidence"
      ]
    },
    {
      "id": "partnership08:beat_v2:b:d-2:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "그 자료를 봐도, 불안해서 백업처럼 생각한 적은 있어요. 그래도 바로 독립 확정은 아니었어요.",
      "behaviorHint": "증거보다 왜 그렇게 느꼈는지를 먼저 끌어와 방어한다.",
      "applicableStates": [
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-08:b:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "partnership-08:b:d-2:denial:0",
          "partnership-08:b:d-2:privacy:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:evidence:legality",
      "coverageKey": "b:d-2:motive:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:backup_named"
      ],
      "tags": [
        "evidence"
      ]
    },
    {
      "id": "partnership08:beat_v2:b:d-2:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "irritate",
      "line": "같은 별도 스튜디오 이야기를 또 반복해야 합니까. 이미 제가 왜 그렇게 움직였는지는 설명했습니다.",
      "behaviorHint": "지친 기색 속에서도 억울함을 놓지 않고 감정선을 늘인다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
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
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-08:b:d-2:admission:0",
          "partnership-08:b:d-2:responsibility:0"
        ],
        "forbidAtomIds": [
          "partnership-08:b:d-2:admission:1"
        ]
      },
      "weight": 3,
      "priority": 20,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:fatigue:timeline",
      "coverageKey": "b:d-2:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:fatigue_warning_2"
      ],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "partnership08:beat_v2:b:d-2:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "block",
      "line": "좋습니다. 그럼 핵심만 말하죠. 책임을 묻고 싶다면 앞뒤 흐름까지 같이 보셔야 합니다.",
      "behaviorHint": "지친 기색 속에서도 억울함을 놓지 않고 감정선을 늘인다.",
      "applicableStates": [
        "S2",
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
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-08:b:d-2:responsibility:0",
          "partnership-08:b:d-2:admission:0"
        ],
        "forbidAtomIds": [
          "partnership-08:b:d-2:admission:1"
        ]
      },
      "weight": 3,
      "priority": 20,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:fatigue:responsibility",
      "coverageKey": "b:d-2:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:fatigue_block_3"
      ],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "partnership08:beat_v2:b:d-2:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "counter_fatigue",
      "line": "계속 저만 몰아가면 남는 건 방어뿐입니다. 왜 그 판단이 나왔는지까지 같이 물어야 공정합니다.",
      "behaviorHint": "지친 기색 속에서도 억울함을 놓지 않고 감정선을 늘인다.",
      "applicableStates": [
        "S2",
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
          "raw"
        ],
        "trustWindowBands": [
          "closed",
          "narrow"
        ],
        "fatigueLevels": [
          "wary",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-08:b:d-2:responsibility:0",
          "partnership-08:b:d-2:admission:0"
        ],
        "forbidAtomIds": [
          "partnership-08:b:d-2:admission:1"
        ]
      },
      "weight": 3,
      "priority": 20,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:fatigue:responsibility",
      "coverageKey": "b:d-2:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-2:core:fatigue_counter_ready"
      ],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "partnership08:beat_v2:b:d-2:surface:pressure:timeline:04",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "transition",
      "line": "그 캡처만 보면 그렇게 보일 수 있다는 건 알아요. 저도 그 말을 가볍게 한 건 아니었어요.",
      "behaviorHint": "상처의 흐름을 다시 꺼내며 질문의 무게중심을 바꾼다.",
      "applicableStates": [
        "S1",
        "S2"
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
          "partnership-08:b:d-2:denial:0",
          "partnership-08:b:d-2:privacy:0"
        ],
        "forbidAtomIds": [
          "partnership-08:b:d-2:admission:1",
          "partnership-08:b:d-2:emotion:0"
        ]
      },
      "weight": 4,
      "priority": 25,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:timeline",
      "coverageKey": "b:d-2:surface:early:pressure:timeline",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:identity_pressed"
      ],
      "tags": [
        "transition"
      ]
    },
    {
      "id": "partnership08:beat_v2:a:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 지아는 이미 따로 나갈 준비를 하고 있었습니다.",
      "behaviorHint": "말은 차갑지만 핵심 감정을 건드리지 않으려 서류와 수치부터 꺼낸다.",
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
          "partnership-08:a:d-2:context:0",
          "partnership-08:a:d-2:act:0"
        ],
        "forbidAtomIds": [
          "partnership-08:a:d-2:admission:1",
          "partnership-08:a:d-2:emotion:0"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:pressure:context",
      "coverageKey": "a:d-2:surface:early:pressure:context",
      "variantTarget": 4,
      "setFlags": [
        "d-2:surface:counter_seen"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership08:beat_v2:a:d-2:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "counter",
      "line": "누가 무엇을 결정했는지부터 분리해야 합니다. 적어도 전 헤드강사와 별도 공간 얘기가 오간 건 분명합니다.",
      "behaviorHint": "말은 차갑지만 핵심 감정을 건드리지 않으려 서류와 수치부터 꺼낸다.",
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
          "partnership-08:a:d-2:act:0",
          "partnership-08:a:d-2:context:0"
        ],
        "forbidAtomIds": [
          "partnership-08:a:d-2:admission:1",
          "partnership-08:a:d-2:emotion:0"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:surface:pressure:identity",
      "coverageKey": "a:d-2:surface:early:pressure:identity",
      "variantTarget": 4,
      "setFlags": [
        "d-2:surface:identity_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership08:beat_v2:a:d-2:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "justify",
      "line": "제가 그렇게 말하거나 움직인 데엔 이유가 있었습니다. DM만으로는 다 못 박지 못하지만, 법인 초안과 강사 시트까지 있으면 백업 플랜 수준은 아니죠.",
      "behaviorHint": "정당화 논리를 또박또박 정리하지만 끝부분에서 미세하게 속도가 늦어진다.",
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-08:a:d-2:unlock:s2:0"
        ],
        "forbidAtomIds": [
          "partnership-08:a:d-2:admission:1"
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
        "d-2:motive:counter_motive_named"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "partnership08:beat_v2:a:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "emotional",
      "line": "그 자료를 보고 나서야 지아가 상처만 받은 쪽은 아니었다고 확신했습니다.",
      "behaviorHint": "처음으로 계산을 내려놓듯 말이 느려지고 표정이 풀린다.",
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
          "partnership-08:a:d-2:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-08:a:d-2:act:0",
          "partnership-08:a:d-2:context:0"
        ]
      },
      "weight": 4,
      "priority": 23,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:core:rapport:emotion",
      "coverageKey": "a:d-2:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-2:core:counter_hurt_exposed"
      ],
      "tags": [
        "late"
      ]
    },
    {
      "id": "partnership08:beat_v2:a:d-2:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "순수한 피해자라면 왜 별도 법인 초안과 강사 합류 시트가 보류 통보 전부터 준비돼 있었습니까.",
      "behaviorHint": "증거 문구를 확인하듯 짧게 되뇌며 방어선을 다시 세운다.",
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
          "agitated"
        ],
        "trustWindowBands": [
          "narrow"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-08:a:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "partnership-08:a:d-2:act:0",
          "partnership-08:a:d-2:context:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-2:motive:evidence:identity",
      "coverageKey": "a:d-2:motive:mid:evidence:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:counter_evidence_seen"
      ],
      "tags": [
        "evidence"
      ]
    },
    {
      "id": "partnership08:beat_v2:a:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "misbelief",
      "line": "앞뒤 맥락을 빼면 안 됩니다. 지아를 순수한 피해자라고 보는 건 과장입니다. 본인도 이미 다른 판을 보고 있었어요.",
      "behaviorHint": "맥락 복원에 집착하며 잘린 단서의 위험을 냉정하게 지적한다.",
      "applicableStates": [
        "M0",
        "M1",
        "M2"
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
          "partnership-08:a:d-3:context:0",
          "partnership-08:a:d-3:denial:0"
        ],
        "forbidAtomIds": [
          "partnership-08:a:d-3:admission:1",
          "partnership-08:a:d-3:emotion:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:context",
      "coverageKey": "a:d-3:surface:early:trap:context",
      "variantTarget": 3,
      "setFlags": [
        "d-3:surface:hurt_named"
      ],
      "tags": [
        "misbelief",
        "shared_misconception"
      ]
    },
    {
      "id": "partnership08:beat_v2:b:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "misbelief",
      "line": "누가 무엇을 결정했는지부터 분리해야 합니다. 저는 정말 일방적으로 약속을 깨진 사람입니다.",
      "behaviorHint": "잘린 단서를 붙들며 자신이 왜 그렇게 믿게 됐는지부터 말한다.",
      "applicableStates": [
        "M0",
        "M1",
        "M2"
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
          "partnership-08:b:d-3:denial:0",
          "partnership-08:b:d-3:timeline:0"
        ],
        "forbidAtomIds": [
          "partnership-08:b:d-3:admission:1",
          "partnership-08:b:d-3:emotion:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:identity",
      "coverageKey": "b:d-3:surface:early:trap:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-3:surface:hurt_named"
      ],
      "tags": [
        "misbelief",
        "shared_misconception"
      ]
    },
    {
      "id": "partnership08:beat_v2:a:d-3:core:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "clarify",
      "line": "이제는 숨기지 않겠습니다. 솔직히 저는 '배신자'로만 남기 싫어서 지아의 준비 정황만 더 세게 말했습니다.",
      "behaviorHint": "처음으로 계산을 내려놓듯 말이 느려지고 표정이 풀린다.",
      "applicableStates": [
        "M3",
        "M4"
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
          "agitated",
          "raw"
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
          "partnership-08:a:d-3:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-08:a:d-3:denial:0",
          "partnership-08:a:d-3:context:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:trap:context",
      "coverageKey": "a:d-3:core:late:trap:context",
      "variantTarget": 2,
      "setFlags": [
        "d-3:core:misbelief_unwound"
      ],
      "tags": [
        "misbelief",
        "shared_misconception"
      ]
    },
    {
      "id": "partnership08:beat_v2:b:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "clarify",
      "line": "이제는 숨기지 않겠습니다. 제가 저를 너무 피해자 쪽으로만 말한 건 알아요. 그렇게 말해야 제 행동이 덜 나쁘게 들릴 것 같았어요.",
      "behaviorHint": "상처와 억울함이 한꺼번에 올라와 감정 표현이 길어진다.",
      "applicableStates": [
        "M3",
        "M4"
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
          "agitated",
          "raw"
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
          "partnership-08:b:d-3:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-08:b:d-3:denial:0",
          "partnership-08:b:d-3:timeline:0"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:trap:emotion",
      "coverageKey": "b:d-3:core:late:trap:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-3:core:misbelief_unwound"
      ],
      "tags": [
        "misbelief",
        "shared_misconception"
      ]
    },
    {
      "id": "partnership08:beat_v2:a:d-3:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "reframe",
      "line": "잠깐 멈춘 결정이었다면 왜 공동대표 최종 조율 없이 홀드 포기 통보가 먼저 나갔습니까.",
      "behaviorHint": "증거 문구를 확인하듯 짧게 되뇌며 방어선을 다시 세운다.",
      "applicableStates": [
        "M1",
        "M2",
        "M3"
      ],
      "layer": "motive",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated"
        ],
        "trustWindowBands": [
          "narrow"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-08:a:d-3:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "partnership-08:a:d-3:denial:0",
          "partnership-08:a:d-3:context:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:evidence:context",
      "coverageKey": "a:d-3:motive:mid:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-3:motive:pure_victim_shaken"
      ],
      "tags": [
        "evidence",
        "misbelief"
      ]
    },
    {
      "id": "partnership08:beat_v2:b:d-3:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "reframe",
      "line": "순수한 피해자라면 왜 별도 법인 초안과 강사 합류 시트가 보류 통보 전부터 준비돼 있었습니까.",
      "behaviorHint": "증거보다 왜 그렇게 느꼈는지를 먼저 끌어와 방어한다.",
      "applicableStates": [
        "M1",
        "M2",
        "M3"
      ],
      "layer": "motive",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "identity",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated"
        ],
        "trustWindowBands": [
          "narrow"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-08:b:d-3:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "partnership-08:b:d-3:denial:0",
          "partnership-08:b:d-3:timeline:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:evidence:identity",
      "coverageKey": "b:d-3:motive:mid:evidence:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-3:motive:pure_victim_shaken"
      ],
      "tags": [
        "evidence",
        "misbelief"
      ]
    },
    {
      "id": "partnership08:beat_v2:a:d-4:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "같은 합의문을 들고 있으면서 왜 본인의 별도 준비가 그 틀을 벗어난 사실은 제외합니까.",
      "behaviorHint": "증거 문구를 확인하듯 짧게 되뇌며 방어선을 다시 세운다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "sub_truth",
      "responseIntent": "evidence_response",
      "angleTag": "legality",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated"
        ],
        "trustWindowBands": [
          "narrow"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-08:a:d-4:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "partnership-08:a:d-4:denial:0",
          "partnership-08:a:d-4:rule:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:evidence:legality",
      "coverageKey": "a:d-4:motive:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-4:motive:agreement_named"
      ],
      "tags": [
        "evidence"
      ]
    },
    {
      "id": "partnership08:beat_v2:b:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "free_probe",
      "line": "직접 묻는다면 이렇게 답할 수밖에 없습니다. 네, 저도 숨을 곳을 찾았어요. 그런데 그걸 찾게 만든 불안이 없었던 것처럼 말하진 마세요.",
      "behaviorHint": "자기 상처를 정면으로 꺼내며 서술이 길어진다.",
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
          "partnership-08:b:d-4:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-08:b:d-4:denial:0",
          "partnership-08:b:d-4:rule:0"
        ]
      },
      "weight": 4,
      "priority": 23,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:core:rapport:emotion",
      "coverageKey": "b:d-4:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-4:core:shared_breach_named"
      ],
      "tags": [
        "free_question",
        "late"
      ]
    },
    {
      "id": "partnership08:beat_v2:a:d-5:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "조건이 안 된 것은 사실이어도, 그 조건을 다시 선명히 공유하지 않은 책임까지 사라지는 것은 아닙니다.",
      "behaviorHint": "증거 문구를 확인하듯 짧게 되뇌며 방어선을 다시 세운다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "sub_truth",
      "responseIntent": "evidence_response",
      "angleTag": "legality",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated"
        ],
        "trustWindowBands": [
          "narrow"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-08:a:d-5:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "partnership-08:a:d-5:denial:0",
          "partnership-08:a:d-5:rule:0"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:evidence:legality",
      "coverageKey": "a:d-5:motive:mid:evidence:legality",
      "variantTarget": 3,
      "setFlags": [
        "d-5:motive:numbers_checked"
      ],
      "tags": [
        "evidence"
      ]
    },
    {
      "id": "partnership08:beat_v2:b:d-5:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "free_probe",
      "line": "직접 묻는다면 이렇게 답할 수밖에 없습니다. 저한테 5주년은 그냥 행사 문구가 아니었어요. 제가 5년 동안 만든 성장의 약속처럼 들렸다고요.",
      "behaviorHint": "자기 상처를 정면으로 꺼내며 서술이 길어진다.",
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
          "agitated",
          "raw"
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
          "partnership-08:b:d-5:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-08:b:d-5:denial:0",
          "partnership-08:b:d-5:context:0"
        ]
      },
      "weight": 4,
      "priority": 23,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:motive:motive",
      "coverageKey": "b:d-5:core:late:motive:motive",
      "variantTarget": 2,
      "setFlags": [
        "d-5:core:threshold_not_shield"
      ],
      "tags": [
        "free_question",
        "late"
      ]
    },
    {
      "id": "partnership08:beat_v2:a:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "저를 무조건 약속 파기한 사람으로만 만들지 마세요. 저는 회사를 다시 적자에 빠뜨릴까 봐 버틴 겁니다.",
      "behaviorHint": "한 문장씩 또렷하게 끊어 말하며 흐름을 붙잡으려 한다.",
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
          "partnership-08:a:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-08:a:d-1:denial:0",
          "partnership-08:a:d-1:rule:0"
        ]
      },
      "weight": 4,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-1:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:hurt_exposed"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "partnership08:beat_v2:b:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "네, 저도 숨을 곳을 찾았어요. 그런데 그걸 찾게 만든 불안이 없었던 것처럼 말하진 마세요.",
      "behaviorHint": "감정이 먼저 튀어나와 상대 말의 빈칸을 곧바로 찌른다.",
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
          "partnership-08:b:d-2:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-08:b:d-2:denial:0",
          "partnership-08:b:d-2:privacy:0"
        ]
      },
      "weight": 4,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-2:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-2:core:fear_exposed"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "partnership08:beat_v2:a:d-1:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "알겠습니다. 감정부터 앞세운 건 제 실수였습니다. 그래도 왜 그렇게까지 흔들렸는지는 빼지 말아 주세요.",
      "behaviorHint": "한 문장씩 또렷하게 끊어 말하며 흐름을 붙잡으려 한다.",
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
          "partnership-08:a:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-08:a:d-1:denial:0",
          "partnership-08:a:d-1:rule:0"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-1:surface:mid:interjection:emotional_only:block",
      "variantTarget": 2,
      "setFlags": [
        "d-1:core:hurt_exposed"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "partnership08:beat_v2:b:d-2:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "좋습니다. 그럼 감정 표현은 줄이겠습니다. 대신 그 결정이 왜 그렇게 컸는지는 남겨 두겠습니다.",
      "behaviorHint": "감정이 먼저 튀어나와 상대 말의 빈칸을 곧바로 찌른다.",
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
          "partnership-08:b:d-2:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-08:b:d-2:denial:0",
          "partnership-08:b:d-2:privacy:0"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-2:surface:mid:interjection:emotional_only:block",
      "variantTarget": 2,
      "setFlags": [
        "d-2:core:fear_exposed"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "partnership08:beat_v2:a:d-1:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "잠깐 멈춘 결정이었다면 왜 공동대표 최종 조율 없이 홀드 포기 통보가 먼저 나갔습니까.",
      "behaviorHint": "한 문장씩 또렷하게 끊어 말하며 흐름을 붙잡으려 한다.",
      "applicableStates": [
        "S1",
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
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-08:a:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-08:a:d-1:denial:0",
          "partnership-08:a:d-1:rule:0"
        ]
      },
      "weight": 4,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-1:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:detail_rebuttal_seen"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "partnership08:beat_v2:b:d-2:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "순수한 피해자라면 왜 별도 법인 초안과 강사 합류 시트가 보류 통보 전부터 준비돼 있었습니까.",
      "behaviorHint": "감정이 먼저 튀어나와 상대 말의 빈칸을 곧바로 찌른다.",
      "applicableStates": [
        "S1",
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
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-08:b:d-2:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-08:b:d-2:denial:0",
          "partnership-08:b:d-2:privacy:0"
        ]
      },
      "weight": 4,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-2:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:detail_rebuttal_seen"
      ],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "partnership08:beat_v2:a:d-1:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "그 세부 반박은 들었습니다. 요지는 인정 범위와 승인선으로 한정해 말하겠습니다.",
      "behaviorHint": "한 문장씩 또렷하게 끊어 말하며 흐름을 붙잡으려 한다.",
      "applicableStates": [
        "S1",
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
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-08:a:d-1:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-08:a:d-1:denial:0",
          "partnership-08:a:d-1:rule:0"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-1:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:detail_rebuttal_seen"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "partnership08:beat_v2:b:d-2:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "세부 디테일은 정리됐습니다. 이제 누가 어떤 권한 없이 움직였는지만 답하겠습니다.",
      "behaviorHint": "감정이 먼저 튀어나와 상대 말의 빈칸을 곧바로 찌른다.",
      "applicableStates": [
        "S1",
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
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-08:b:d-2:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-08:b:d-2:denial:0",
          "partnership-08:b:d-2:privacy:0"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-2:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:detail_rebuttal_seen"
      ],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "partnership08:beat_v2:a:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "지금은 한쪽만 배신자이고 다른 한쪽은 순수한 피해자라는 믿음을 더 세게 말하고 싶을 수 있습니다. 하지만 그 결론을 밀려면 빠진 맥락까지 같이 버텨야 합니다.",
      "behaviorHint": "한 문장씩 또렷하게 끊어 말하며 흐름을 붙잡으려 한다.",
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
          "partnership-08:a:d-3:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-08:a:d-3:denial:0",
          "partnership-08:a:d-3:context:0"
        ]
      },
      "weight": 4,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:hurt_named"
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
      "id": "partnership08:beat_v2:b:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "잘린 단서만 붙들면 한쪽만 배신자이고 다른 한쪽은 순수한 피해자라는 믿음이 더 또렷해 보입니다. 그래서 더 위험한 겁니다.",
      "behaviorHint": "감정이 먼저 튀어나와 상대 말의 빈칸을 곧바로 찌른다.",
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
          "allow_last_turn"
        ],
        "misconceptionStates": [
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-08:b:d-3:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-08:b:d-3:denial:0",
          "partnership-08:b:d-3:timeline:0"
        ]
      },
      "weight": 4,
      "priority": 18,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:hurt_named"
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
      "id": "partnership08:beat_v2:a:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "좋습니다. 더 몰아붙이지는 않겠습니다. 대신 왜 그 오해가 그렇게 쉽게 굳었는지는 남겨 두겠습니다.",
      "behaviorHint": "한 문장씩 또렷하게 끊어 말하며 흐름을 붙잡으려 한다.",
      "applicableStates": [
        "M2",
        "M3"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "context",
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
          "partnership-08:a:d-3:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-08:a:d-3:denial:0",
          "partnership-08:a:d-3:context:0"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:hurt_named"
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
      "id": "partnership08:beat_v2:b:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "그 결론을 잠깐 접겠습니다. 지금은 누락된 경로와 바깥 변수를 먼저 보겠습니다.",
      "behaviorHint": "감정이 먼저 튀어나와 상대 말의 빈칸을 곧바로 찌른다.",
      "applicableStates": [
        "M2",
        "M3"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
      "responseIntent": "trap_confusion_response",
      "angleTag": "emotion",
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
          "partnership-08:b:d-3:unlock:s4:0"
        ],
        "forbidAtomIds": [
          "partnership-08:b:d-3:denial:0",
          "partnership-08:b:d-3:timeline:0"
        ]
      },
      "weight": 4,
      "priority": 17,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:hurt_named"
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

export default partnership08BeatsV2Full;
