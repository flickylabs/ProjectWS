export const workplace05BeatsV2Full = {
  "caseId": "workplace-05",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 58,
    "byActionFamily": {
      "question": 29,
      "evidence": 5,
      "fatigue": 6,
      "free_question": 6,
      "interjection": 12
    },
    "byResponseIntent": {
      "pressure_response": 23,
      "evidence_response": 5,
      "rapport_response": 12,
      "motive_response": 4,
      "fatigue_response": 6,
      "trap_confusion_response": 8
    },
    "byParty": {
      "a": 31,
      "b": 27
    },
    "byDispute": {
      "d-1": 18,
      "d-4": 6,
      "d-5": 14,
      "d-2": 5,
      "d-3": 15
    },
    "byAngleTag": {
      "timeline": 10,
      "identity": 8,
      "context": 13,
      "responsibility": 8,
      "emotion": 14,
      "motive": 4,
      "legality": 1
    },
    "requiredMatrixStatus": {
      "questionEarlyTimeline": true,
      "questionEarlyIdentityOrContext": true,
      "questionMidResponsibility": true,
      "questionMidMotive": true,
      "questionLateEmotion": true,
      "evidenceContextIdentityLegality": true,
      "fatigueMidResponsibilityOrTimeline": true,
      "freeQuestionLateMotiveOrEmotion": true,
      "misconceptionCoverage": true,
      "interjectionBase": true,
      "interjectionMisbeliefOrTrap": true
    },
    "interjectionBreakdown": {
      "emotional_only": 4,
      "detail_rebuttal": 4,
      "misbelief_escalation": 4
    },
    "coverageKeys": [
      "a:d-1:core:late:motive:motive",
      "a:d-1:core:late:rapport:emotion",
      "a:d-1:motive:mid:evidence:responsibility",
      "a:d-1:motive:mid:fatigue:responsibility",
      "a:d-1:motive:mid:fatigue:timeline",
      "a:d-1:motive:mid:pressure:responsibility",
      "a:d-1:surface:early:pressure:context",
      "a:d-1:surface:early:pressure:identity",
      "a:d-1:surface:early:pressure:responsibility",
      "a:d-1:surface:early:pressure:timeline",
      "a:d-1:surface:mid:interjection:detail_rebuttal:allow",
      "a:d-1:surface:mid:interjection:emotional_only:allow",
      "a:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "a:d-3:surface:mid:interjection:misbelief_escalation:block",
      "a:d-4:core:late:pressure:timeline",
      "a:d-4:core:late:rapport:emotion",
      "a:d-4:motive:mid:evidence:timeline",
      "a:d-4:motive:mid:motive:motive",
      "a:d-4:surface:early:pressure:context",
      "a:d-4:surface:mid:interjection:detail_rebuttal:block",
      "a:d-5:core:late:rapport:emotion",
      "a:d-5:motive:mid:evidence:identity",
      "a:d-5:motive:mid:pressure:context",
      "a:d-5:surface:early:pressure:context",
      "a:d-5:surface:mid:interjection:emotional_only:block",
      "b:d-1:surface:mid:interjection:emotional_only:allow",
      "b:d-2:core:late:rapport:emotion",
      "b:d-2:motive:mid:evidence:timeline",
      "b:d-2:motive:mid:pressure:timeline",
      "b:d-2:surface:early:pressure:legality",
      "b:d-2:surface:mid:interjection:detail_rebuttal:block",
      "b:d-3:core:late:pressure:responsibility",
      "b:d-3:core:late:rapport:emotion",
      "b:d-3:core:late:trap:context",
      "b:d-3:core:late:trap:emotion",
      "b:d-3:motive:mid:evidence:context",
      "b:d-3:motive:mid:pressure:context",
      "b:d-3:surface:early:pressure:context",
      "b:d-3:surface:early:trap:context",
      "b:d-3:surface:early:trap:identity"
    ]
  },
  "beats": [
    {
      "id": "workplace05:beat_v2:a:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "발표 전날 순서를 보면 이번 승진 브리핑은 제가 최종 발표 책임자로 정리한 안건일 뿐이고, 공동기획 표기를 일부러 지운 적은 없습니다.",
      "behaviorHint": "질문 순서를 다시 세우듯 손가락을 천천히 접는다.",
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
          "workplace-05:a:d-1:context:0",
          "workplace-05:a:d-1:denial:0"
        ],
        "forbidAtomIds": [
          "workplace-05:a:d-1:unlock:s4:0",
          "workplace-05:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 7,
      "priority": 40,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:timeline",
      "coverageKey": "a:d-1:surface:early:pressure:timeline",
      "variantTarget": 7,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot",
        "extra_hot"
      ]
    },
    {
      "id": "workplace05:beat_v2:a:d-1:surface:pressure:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "순서만 따라가면 그건 팀 자산화된 안건이라 개인 표기를 앞세울 사안이 아니며, 기획과 발표의 층위도 다릅니다.",
      "behaviorHint": "기록의 앞뒤를 짚듯 메모 가장자리를 두드린다.",
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
          "workplace-05:a:d-1:context:0",
          "workplace-05:a:d-1:denial:0"
        ],
        "forbidAtomIds": [
          "workplace-05:a:d-1:unlock:s4:0",
          "workplace-05:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 7,
      "priority": 40,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:timeline",
      "coverageKey": "a:d-1:surface:early:pressure:timeline",
      "variantTarget": 7,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot",
        "extra_hot"
      ]
    },
    {
      "id": "workplace05:beat_v2:a:d-1:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "문가은 이름만 떼어 놓고 보면 공격처럼 들리겠지만, 이번 승진 브리핑은 제가 최종 발표 책임자로 정리한 안건일 뿐이고, 공동기획 표기를 일부러 지운 적은 없습니다.",
      "behaviorHint": "상대 이름이 나오자 시선이 잠깐 흔들린다.",
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
          "workplace-05:a:d-1:denial:0",
          "workplace-05:a:d-1:context:0"
        ],
        "forbidAtomIds": [
          "workplace-05:a:d-1:unlock:s5:0",
          "workplace-05:a:d-1:admission:0"
        ]
      },
      "weight": 7,
      "priority": 40,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:identity",
      "coverageKey": "a:d-1:surface:early:pressure:identity",
      "variantTarget": 7,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot",
        "extra_hot"
      ]
    },
    {
      "id": "workplace05:beat_v2:a:d-1:surface:pressure:identity:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "누가 앞에 적히느냐보다 왜 그렇게 정리됐는지를 보셔야 합니다. 그건 팀 자산화된 안건이라 개인 표기를 앞세울 사안이 아니며, 기획과 발표의 층위도 다릅니다.",
      "behaviorHint": "주어를 천천히 바꿔 가며 표현을 다듬는다.",
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
          "workplace-05:a:d-1:denial:0",
          "workplace-05:a:d-1:context:0"
        ],
        "forbidAtomIds": [
          "workplace-05:a:d-1:unlock:s5:0",
          "workplace-05:a:d-1:admission:0"
        ]
      },
      "weight": 7,
      "priority": 40,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:identity",
      "coverageKey": "a:d-1:surface:early:pressure:identity",
      "variantTarget": 7,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot",
        "extra_hot"
      ]
    },
    {
      "id": "workplace05:beat_v2:a:d-1:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "맥락을 자르면 몰아붙이는 말처럼 들리겠지만, 이번 승진 브리핑은 제가 최종 발표 책임자로 정리한 안건일 뿐이고, 공동기획 표기를 일부러 지운 적은 없습니다.",
      "behaviorHint": "조직 맥락을 설명하듯 서류를 다시 가지런히 맞춘다.",
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
          "workplace-05:a:d-1:context:0",
          "workplace-05:a:d-1:denial:0"
        ],
        "forbidAtomIds": [
          "workplace-05:a:d-1:unlock:s4:0",
          "workplace-05:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 7,
      "priority": 40,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:context",
      "coverageKey": "a:d-1:surface:early:pressure:context",
      "variantTarget": 7,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot",
        "extra_hot"
      ]
    },
    {
      "id": "workplace05:beat_v2:a:d-1:surface:pressure:context:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "당시 전체 흐름에서 보면 그건 팀 자산화된 안건이라 개인 표기를 앞세울 사안이 아니며, 기획과 발표의 층위도 다릅니다.",
      "behaviorHint": "한 문장을 끝내고 잠깐 숨을 고르며 배경 설명을 붙인다.",
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
          "workplace-05:a:d-1:context:0",
          "workplace-05:a:d-1:denial:0"
        ],
        "forbidAtomIds": [
          "workplace-05:a:d-1:unlock:s4:0",
          "workplace-05:a:d-1:unlock:s5:0"
        ]
      },
      "weight": 7,
      "priority": 40,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:context",
      "coverageKey": "a:d-1:surface:early:pressure:context",
      "variantTarget": 7,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot",
        "extra_hot"
      ]
    },
    {
      "id": "workplace05:beat_v2:a:d-1:surface:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deflect",
      "line": "공동기획 표기라는 말은 너무 단선적입니다. 팀 자산화된 안건이고, 우선은 발표 책임 기준으로 보셔야 합니다.",
      "behaviorHint": "서류를 반듯하게 맞추며 설명 범위를 스스로 정한다.",
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
          "workplace-05:a:d-1:context:0",
          "workplace-05:a:d-1:denial:0"
        ],
        "forbidAtomIds": [
          "workplace-05:a:d-1:unlock:s5:0",
          "workplace-05:a:d-1:admission:0"
        ]
      },
      "weight": 7,
      "priority": 38,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:responsibility",
      "coverageKey": "a:d-1:surface:early:pressure:responsibility",
      "variantTarget": 7,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "transition",
        "warm"
      ],
      "sourceTransitionId": "workplace-05:transition:a:d-1:s0_s1"
    },
    {
      "id": "workplace05:beat_v2:a:d-1:motive:evidence:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "impeached",
      "line": "문가은 씨 초안이 들어간 건 맞습니다. 다만 구조 초안과 최종 브리핑 책임을 같은 층위로 보긴 어렵습니다.",
      "behaviorHint": "버전 이력을 본 뒤 짧게 인정하고 곧바로 기준 설명을 붙인다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
      "responseIntent": "evidence_response",
      "angleTag": "responsibility",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated",
          "frayed"
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
          "workplace-05:a:d-1:unlock:s3:0",
          "workplace-05:a:d-1:act:0"
        ],
        "forbidAtomIds": [
          "workplace-05:a:d-1:unlock:s5:0",
          "workplace-05:a:d-1:admission:0"
        ]
      },
      "weight": 6,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:evidence:responsibility",
      "coverageKey": "a:d-1:motive:mid:evidence:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:responsibility_named"
      ],
      "tags": [
        "transition",
        "cold"
      ],
      "sourceTransitionId": "workplace-05:transition:a:d-1:s1_s2",
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ]
    },
    {
      "id": "workplace05:beat_v2:a:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "제가 공동기획 문구를 뺀 건 맞습니다. 그래도 승진위원회 자료는 단일 발표 책임 체계로 정리하려 했습니다.",
      "behaviorHint": "고개를 한번 숙였다가 다시 들어 방어 논리를 이어 간다.",
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
          "calm",
          "agitated",
          "frayed"
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
          "workplace-05:a:d-1:act:0",
          "workplace-05:a:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "workplace-05:a:d-1:unlock:s5:0",
          "workplace-05:a:d-1:admission:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:pressure:responsibility",
      "coverageKey": "a:d-1:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-1:motive:responsibility_named"
      ],
      "tags": [
        "transition",
        "warm"
      ],
      "sourceTransitionId": "workplace-05:transition:a:d-1:s2_s3",
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ]
    },
    {
      "id": "workplace05:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confess",
      "line": "결국 제가 제 성과처럼 보이게 만들려 한 겁니다. 제 잘못이고 문가은 씨 기여를 지운 책임이 제게 있습니다.",
      "behaviorHint": "책상 위 손을 떼지 못한 채 인정 문장을 또렷하게 말한다.",
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
          "frayed",
          "exposed"
        ],
        "trustWindowBands": [
          "opening",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-05:a:d-1:emotion:0",
          "workplace-05:a:d-1:admission:0"
        ],
        "forbidAtomIds": [
          "workplace-05:a:d-1:context:0",
          "workplace-05:a:d-1:denial:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [],
      "tags": [
        "transition",
        "cold"
      ],
      "sourceTransitionId": "workplace-05:transition:a:d-1:s3_s5",
      "requiresFlags": [
        "d-1:motive:responsibility_named"
      ]
    },
    {
      "id": "workplace05:beat_v2:a:d-4:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "그 메모는 인사 판단이 아니라 리스크 정리라고 봐 주십시오. 아직 판단을 내려 달라고 한 단계는 아니었습니다.",
      "behaviorHint": "말속도가 빨라지며 메모의 성격만 반복한다.",
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
          "workplace-05:a:d-4:context:0",
          "workplace-05:a:d-4:denial:0"
        ],
        "forbidAtomIds": [
          "workplace-05:a:d-4:unlock:s4:0",
          "workplace-05:a:d-4:unlock:s5:0"
        ]
      },
      "weight": 7,
      "priority": 38,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:pressure:context",
      "coverageKey": "a:d-4:surface:early:pressure:context",
      "variantTarget": 7,
      "setFlags": [
        "d-4:surface:note_origin_named"
      ],
      "tags": [
        "transition",
        "warm"
      ],
      "sourceTransitionId": "workplace-05:transition:a:d-4:s0_s1"
    },
    {
      "id": "workplace05:beat_v2:a:d-4:motive:evidence:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "impeached",
      "line": "메모를 먼저 넣은 건 맞습니다. 다만 그때는 출처 이슈가 바로 승진 변수로 번질까 우려했습니다.",
      "behaviorHint": "메모 입력 시각을 확인한 뒤 낮게 한숨을 쉰다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "layer": "motive",
      "issueRole": "sub_truth",
      "responseIntent": "evidence_response",
      "angleTag": "timeline",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated",
          "frayed"
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
          "workplace-05:a:d-4:unlock:s3:0",
          "workplace-05:a:d-4:act:0"
        ],
        "forbidAtomIds": [
          "workplace-05:a:d-4:unlock:s5:0",
          "workplace-05:a:d-4:admission:0"
        ]
      },
      "weight": 6,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:evidence:timeline",
      "coverageKey": "a:d-4:motive:mid:evidence:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-4:motive:retaliation_named"
      ],
      "tags": [
        "transition",
        "cold"
      ],
      "sourceTransitionId": "workplace-05:transition:a:d-4:s1_s2",
      "requiresFlags": [
        "d-4:surface:note_origin_named"
      ]
    },
    {
      "id": "workplace05:beat_v2:a:d-4:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "counter",
      "line": "솔직히 말씀드리면, 관리자로서 아무 말도 안 한 사람으로 보이고 싶지 않았습니다. 그래서 사실확인보다 먼저 방어적으로 움직였습니다.",
      "behaviorHint": "잠깐 침묵한 뒤 처음으로 감정이 섞인 설명을 꺼낸다.",
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
          "calm",
          "agitated",
          "frayed"
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
          "workplace-05:a:d-4:act:0",
          "workplace-05:a:d-4:responsibility:0"
        ],
        "forbidAtomIds": [
          "workplace-05:a:d-4:unlock:s5:0",
          "workplace-05:a:d-4:admission:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:motive:motive",
      "coverageKey": "a:d-4:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-4:motive:retaliation_named"
      ],
      "tags": [
        "transition",
        "warm"
      ],
      "sourceTransitionId": "workplace-05:transition:a:d-4:s2_s4",
      "requiresFlags": [
        "d-4:surface:note_origin_named"
      ]
    },
    {
      "id": "workplace05:beat_v2:a:d-4:core:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confess",
      "line": "그 결과 문가은 씨 발표 순서와 평판에 영향을 줬습니다. 제 판단이었고 제 책임입니다.",
      "behaviorHint": "등받이에서 등을 떼고 몸을 앞으로 숙인다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "timeline",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "frayed",
          "exposed"
        ],
        "trustWindowBands": [
          "opening",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-05:a:d-4:admission:0",
          "workplace-05:a:d-4:emotion:0"
        ],
        "forbidAtomIds": [
          "workplace-05:a:d-4:context:0",
          "workplace-05:a:d-4:denial:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:core:pressure:timeline",
      "coverageKey": "a:d-4:core:late:pressure:timeline",
      "variantTarget": 2,
      "setFlags": [],
      "tags": [
        "transition",
        "cold"
      ],
      "sourceTransitionId": "workplace-05:transition:a:d-4:s4_s5",
      "requiresFlags": [
        "d-4:motive:retaliation_named"
      ]
    },
    {
      "id": "workplace05:beat_v2:a:d-5:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deflect",
      "line": "그 일은 공식 분쟁으로 키우지 않으려 했을 뿐입니다. 당시엔 내부 정리로 끝내는 게 낫다고 봤습니다.",
      "behaviorHint": "과거 사건을 현재와 분리하려는 듯 손을 작게 젓는다.",
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
          "workplace-05:a:d-5:context:0",
          "workplace-05:a:d-5:denial:0"
        ],
        "forbidAtomIds": [
          "workplace-05:a:d-5:admission:0",
          "workplace-05:a:d-5:emotion:0"
        ]
      },
      "weight": 7,
      "priority": 38,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:surface:pressure:context",
      "coverageKey": "a:d-5:surface:early:pressure:context",
      "variantTarget": 7,
      "setFlags": [
        "d-5:surface:pattern_pressed"
      ],
      "tags": [
        "transition",
        "warm"
      ],
      "sourceTransitionId": "workplace-05:transition:a:d-5:s0_s1"
    },
    {
      "id": "workplace05:beat_v2:a:d-5:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "impeached",
      "line": "배수진 씨 이름을 내부 공유로만 남기자는 회신을 제가 한 건 맞습니다. 문제를 밖으로 키우지 않으려 했습니다.",
      "behaviorHint": "옛 이메일 문장을 눈으로 따라 읽고 인정한다.",
      "applicableStates": [
        "S1",
        "S2"
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
          "calm",
          "agitated",
          "frayed"
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
          "workplace-05:a:d-5:unlock:s2:0",
          "workplace-05:a:d-5:act:0"
        ],
        "forbidAtomIds": [
          "workplace-05:a:d-5:unlock:s5:0",
          "workplace-05:a:d-5:admission:0"
        ]
      },
      "weight": 6,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:evidence:identity",
      "coverageKey": "a:d-5:motive:mid:evidence:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-5:motive:legacy_named"
      ],
      "tags": [
        "transition",
        "cold"
      ],
      "sourceTransitionId": "workplace-05:transition:a:d-5:s1_s2",
      "requiresFlags": [
        "d-5:surface:pattern_pressed"
      ]
    },
    {
      "id": "workplace05:beat_v2:a:d-5:motive:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "counter",
      "line": "외부 기여를 공식 기록에서 뺀 건 사실입니다. 다만 문가은 씨도 그 흐름을 알고 있었고 저 혼자만의 판단은 아니었습니다.",
      "behaviorHint": "책임을 나누듯 손바닥을 펼쳐 보인다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
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
          "agitated",
          "frayed"
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
          "workplace-05:a:d-5:act:0",
          "workplace-05:a:d-5:responsibility:0"
        ],
        "forbidAtomIds": [
          "workplace-05:a:d-5:admission:0",
          "workplace-05:a:d-5:unlock:s5:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:pressure:context",
      "coverageKey": "a:d-5:motive:mid:pressure:context",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:legacy_named"
      ],
      "tags": [
        "transition",
        "warm"
      ],
      "sourceTransitionId": "workplace-05:transition:a:d-5:s2_s3",
      "requiresFlags": [
        "d-5:surface:pattern_pressed"
      ]
    },
    {
      "id": "workplace05:beat_v2:a:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "open",
      "line": "결국 제가 덮었습니다. 그때 만든 침묵의 방식이 이번 반복까지 불렀고, 그 책임이 제게 있습니다.",
      "behaviorHint": "과거 메일 제목을 되뇌듯 낮게 말한다.",
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
          "frayed",
          "exposed"
        ],
        "trustWindowBands": [
          "opening",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-05:a:d-5:emotion:0",
          "workplace-05:a:d-5:admission:0"
        ],
        "forbidAtomIds": [
          "workplace-05:a:d-5:context:0",
          "workplace-05:a:d-5:denial:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:rapport:emotion",
      "coverageKey": "a:d-5:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [],
      "tags": [
        "transition",
        "cold"
      ],
      "sourceTransitionId": "workplace-05:transition:a:d-5:s3_s5",
      "requiresFlags": [
        "d-5:motive:legacy_named"
      ]
    },
    {
      "id": "workplace05:beat_v2:b:d-2:surface:pressure:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deflect",
      "line": "남아 있던 권한으로 본 건 맞지만, 그걸 무단 확보라고만 부르면 제가 처한 상황은 빠져요.",
      "behaviorHint": "어깨를 웅크린 채 억울함을 먼저 드러낸다.",
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
          "workplace-05:b:d-2:context:0",
          "workplace-05:b:d-2:denial:0"
        ],
        "forbidAtomIds": [
          "workplace-05:b:d-2:unlock:s5:0",
          "workplace-05:b:d-2:admission:0"
        ]
      },
      "weight": 7,
      "priority": 38,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:legality",
      "coverageKey": "b:d-2:surface:early:pressure:legality",
      "variantTarget": 7,
      "setFlags": [
        "d-2:surface:procedure_pressed"
      ],
      "tags": [
        "transition",
        "warm"
      ],
      "sourceTransitionId": "workplace-05:transition:b:d-2:s0_s1"
    },
    {
      "id": "workplace05:beat_v2:b:d-2:motive:evidence:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "impeached",
      "line": "내려받은 건 맞아요. 그때는 정식 채널보다 먼저 증거를 붙잡아야 한다는 생각뿐이었어요.",
      "behaviorHint": "로그를 본 뒤 빠르게 인정하고 숨을 고른다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "layer": "motive",
      "issueRole": "sub_truth",
      "responseIntent": "evidence_response",
      "angleTag": "timeline",
      "actionFamily": "evidence",
      "questionTypes": [
        "evidence_present"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated",
          "frayed"
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
          "workplace-05:b:d-2:unlock:s2:0",
          "workplace-05:b:d-2:unlock:s3:0"
        ],
        "forbidAtomIds": [
          "workplace-05:b:d-2:unlock:s5:0",
          "workplace-05:b:d-2:admission:0"
        ]
      },
      "weight": 6,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:evidence:timeline",
      "coverageKey": "b:d-2:motive:mid:evidence:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-2:motive:breach_named"
      ],
      "tags": [
        "transition",
        "cold"
      ],
      "sourceTransitionId": "workplace-05:transition:b:d-2:s1_s2",
      "requiresFlags": [
        "d-2:surface:procedure_pressed"
      ]
    },
    {
      "id": "workplace05:beat_v2:b:d-2:motive:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "멘토방과 동료에게 보낸 것도 맞아요. 저는 또 지워질까 봐 누군가 먼저 알아야 한다고 생각했어요.",
      "behaviorHint": "눈가가 젖지만 끝내 울지는 않는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
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
          "agitated",
          "frayed"
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
          "workplace-05:b:d-2:act:0",
          "workplace-05:b:d-2:responsibility:0"
        ],
        "forbidAtomIds": [
          "workplace-05:b:d-2:unlock:s5:0",
          "workplace-05:b:d-2:admission:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:pressure:timeline",
      "coverageKey": "b:d-2:motive:mid:pressure:timeline",
      "variantTarget": 4,
      "setFlags": [
        "d-2:motive:breach_named"
      ],
      "tags": [
        "transition",
        "warm"
      ],
      "sourceTransitionId": "workplace-05:transition:b:d-2:s2_s3",
      "requiresFlags": [
        "d-2:surface:procedure_pressed"
      ]
    },
    {
      "id": "workplace05:beat_v2:b:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confess",
      "line": "권한이 남아 있었다고 해도 제가 선을 넘은 건 맞아요. 제 잘못이고 제 책임이에요.",
      "behaviorHint": "양손을 모은 채 짧게 고개를 끄덕인다.",
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
          "frayed",
          "exposed"
        ],
        "trustWindowBands": [
          "opening",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-05:b:d-2:emotion:0",
          "workplace-05:b:d-2:admission:0"
        ],
        "forbidAtomIds": [
          "workplace-05:b:d-2:context:0",
          "workplace-05:b:d-2:denial:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:core:rapport:emotion",
      "coverageKey": "b:d-2:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [],
      "tags": [
        "transition",
        "cold"
      ],
      "sourceTransitionId": "workplace-05:transition:b:d-2:s3_s5",
      "requiresFlags": [
        "d-2:motive:breach_named"
      ]
    },
    {
      "id": "workplace05:beat_v2:b:d-3:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deflect",
      "line": "제가 만든 부분이 분명히 있었어요. 그래서 참고한 흐름이 있어도 제 안이라고 더 세게 말했어요.",
      "behaviorHint": "피해를 호소하던 톤에서 조금 낮아진 설명 톤으로 이동한다.",
      "applicableStates": [
        "S0",
        "S1"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
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
          "workplace-05:b:d-3:context:0",
          "workplace-05:b:d-3:denial:0"
        ],
        "forbidAtomIds": [
          "workplace-05:b:d-3:admission:0",
          "workplace-05:b:d-3:emotion:0"
        ]
      },
      "weight": 7,
      "priority": 38,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:pressure:context",
      "coverageKey": "b:d-3:surface:early:pressure:context",
      "variantTarget": 7,
      "setFlags": [
        "d-3:surface:source_doubt_named"
      ],
      "tags": [
        "transition",
        "warm"
      ],
      "sourceTransitionId": "workplace-05:transition:b:d-3:s0_s1"
    },
    {
      "id": "workplace05:beat_v2:b:d-3:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "impeached",
      "line": "노트와 화이트보드 문장이 제 손에서 다시 정리된 건 맞아요. 다만 그때도 저는 참고였다고 믿고 있었어요.",
      "behaviorHint": "개인 노트 쪽으로 손을 내밀며 반쯤 인정한다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "layer": "motive",
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
          "agitated",
          "frayed"
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
          "workplace-05:b:d-3:unlock:s3:0",
          "workplace-05:b:d-3:responsibility:0"
        ],
        "forbidAtomIds": [
          "workplace-05:b:d-3:admission:0",
          "workplace-05:b:d-3:unlock:s5:0"
        ]
      },
      "weight": 6,
      "priority": 34,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:evidence:context",
      "coverageKey": "b:d-3:motive:mid:evidence:context",
      "variantTarget": 3,
      "setFlags": [
        "d-3:motive:misbelief_cracked"
      ],
      "tags": [
        "transition",
        "cold"
      ],
      "sourceTransitionId": "workplace-05:transition:b:d-3:s1_s2",
      "requiresFlags": [
        "d-3:surface:source_doubt_named"
      ]
    },
    {
      "id": "workplace05:beat_v2:b:d-3:motive:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "counter",
      "line": "보류안까지 보니 더는 완전한 순수 창작이라고 말할 수 없어요. 제가 원출처를 숨긴 채 제 안처럼 밀어붙였어요.",
      "behaviorHint": "말끝이 떨리며 시선이 아래로 떨어진다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "shared_misconception",
      "responseIntent": "pressure_response",
      "angleTag": "context",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "calm",
          "agitated",
          "frayed"
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
          "workplace-05:b:d-3:responsibility:0",
          "workplace-05:b:d-3:act:0"
        ],
        "forbidAtomIds": [
          "workplace-05:b:d-3:admission:0",
          "workplace-05:b:d-3:unlock:s5:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:pressure:context",
      "coverageKey": "b:d-3:motive:mid:pressure:context",
      "variantTarget": 4,
      "setFlags": [
        "d-3:motive:misbelief_cracked"
      ],
      "tags": [
        "transition",
        "warm"
      ],
      "sourceTransitionId": "workplace-05:transition:b:d-3:s2_s4",
      "requiresFlags": [
        "d-3:surface:source_doubt_named"
      ]
    },
    {
      "id": "workplace05:beat_v2:b:d-3:core:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confess",
      "line": "네, 제가 순수 창작이라고 주장한 건 거짓이었어요. 제 잘못이고 원출처를 지운 책임이 제게 있어요.",
      "behaviorHint": "눈을 감았다 뜬 뒤 짧게 사실을 확정한다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "shared_misconception",
      "responseIntent": "pressure_response",
      "angleTag": "responsibility",
      "actionFamily": "question",
      "questionTypes": [
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "frayed",
          "exposed"
        ],
        "trustWindowBands": [
          "opening",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-05:b:d-3:admission:0",
          "workplace-05:b:d-3:emotion:0"
        ],
        "forbidAtomIds": [
          "workplace-05:b:d-3:context:0",
          "workplace-05:b:d-3:denial:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:pressure:responsibility",
      "coverageKey": "b:d-3:core:late:pressure:responsibility",
      "variantTarget": 2,
      "setFlags": [],
      "tags": [
        "transition",
        "cold"
      ],
      "sourceTransitionId": "workplace-05:transition:b:d-3:s4_s5",
      "requiresFlags": [
        "d-3:motive:misbelief_cracked"
      ]
    },
    {
      "id": "workplace05:beat_v2:b:d-5:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deflect",
      "line": "그때도 저는 조용히 있는 쪽을 택했어요. 반복이라고 부르면 싫었지만, 같은 냄새가 난다는 건 알고 있었어요.",
      "behaviorHint": "반발하듯 시작했다가 끝에서 목소리가 작아진다.",
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
          "workplace-05:b:d-5:context:0",
          "workplace-05:b:d-5:denial:0"
        ],
        "forbidAtomIds": [
          "workplace-05:b:d-5:admission:0",
          "workplace-05:b:d-5:emotion:0"
        ]
      },
      "weight": 7,
      "priority": 38,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:pressure:context",
      "coverageKey": "b:d-5:surface:early:pressure:context",
      "variantTarget": 7,
      "setFlags": [
        "d-5:surface:pattern_pressed"
      ],
      "tags": [
        "transition",
        "warm"
      ],
      "sourceTransitionId": "workplace-05:transition:b:d-5:s0_s1"
    },
    {
      "id": "workplace05:beat_v2:b:d-5:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "맞아요, 또 지워질까 봐 겁났어요. 그래서 예전처럼 원출처를 먼저 꺼내지 못했어요.",
      "behaviorHint": "한숨과 함께 첫 두려움을 인정한다.",
      "applicableStates": [
        "S1",
        "S2"
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
          "agitated",
          "frayed"
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
          "workplace-05:b:d-5:act:0",
          "workplace-05:b:d-5:responsibility:0"
        ],
        "forbidAtomIds": [
          "workplace-05:b:d-5:unlock:s5:0",
          "workplace-05:b:d-5:admission:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:motive:motive",
      "coverageKey": "b:d-5:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:legacy_named"
      ],
      "tags": [
        "transition",
        "warm"
      ],
      "sourceTransitionId": "workplace-05:transition:b:d-5:s1_s2",
      "requiresFlags": [
        "d-5:surface:pattern_pressed"
      ]
    },
    {
      "id": "workplace05:beat_v2:b:d-5:motive:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "배수진 씨 이름을 끝까지 밀지 못한 것도 맞고, 이번에도 그 회색지대를 제가 이용한 것도 맞아요. 그래도 오상혁 씨도 그 방식을 알고 있었어요.",
      "behaviorHint": "시선을 피하다가 마지막 문장에서 상대를 잠깐 본다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "motive",
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
          "agitated",
          "frayed"
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
          "workplace-05:b:d-5:act:0",
          "workplace-05:b:d-5:responsibility:0"
        ],
        "forbidAtomIds": [
          "workplace-05:b:d-5:unlock:s5:0",
          "workplace-05:b:d-5:admission:0"
        ]
      },
      "weight": 6,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:pressure:identity",
      "coverageKey": "b:d-5:motive:mid:pressure:identity",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:legacy_named"
      ],
      "tags": [
        "transition",
        "warm"
      ],
      "sourceTransitionId": "workplace-05:transition:b:d-5:s2_s3",
      "requiresFlags": [
        "d-5:surface:pattern_pressed"
      ]
    },
    {
      "id": "workplace05:beat_v2:b:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "open",
      "line": "결국 제가 반복에 올라탔어요. 되갚고 싶은 마음까지 섞였고, 그 책임을 피할 수 없어요.",
      "behaviorHint": "울음을 삼키듯 멈칫한 뒤 인정한다.",
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
          "frayed",
          "exposed"
        ],
        "trustWindowBands": [
          "opening",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-05:b:d-5:emotion:0",
          "workplace-05:b:d-5:admission:0"
        ],
        "forbidAtomIds": [
          "workplace-05:b:d-5:context:0",
          "workplace-05:b:d-5:denial:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:rapport:emotion",
      "coverageKey": "b:d-5:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [],
      "tags": [
        "transition",
        "cold"
      ],
      "sourceTransitionId": "workplace-05:transition:b:d-5:s3_s5",
      "requiresFlags": [
        "d-5:motive:legacy_named"
      ]
    },
    {
      "id": "workplace05:beat_v2:a:d-1:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "irritated",
      "line": "같은 시점 질문은 이미 여러 번 들었습니다. 공동기획 문구를 제가 뺀 건 맞지만, 승진위원회용 브리핑은 팀장 단위로 정리해야 한다고 판단했습니다.",
      "behaviorHint": "서류를 닫았다 다시 열며 짜증을 누른다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-05:a:d-1:act:0",
          "workplace-05:a:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "workplace-05:a:d-1:unlock:s5:0",
          "workplace-05:a:d-1:admission:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:timeline",
      "coverageKey": "a:d-1:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:responsibility_named"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "fatigue",
        "mid"
      ]
    },
    {
      "id": "workplace05:beat_v2:a:d-1:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "block",
      "line": "이 부분은 반복해도 답이 달라지지 않습니다. 공동기획 문구를 제가 뺀 건 맞지만, 승진위원회용 브리핑은 팀장 단위로 정리해야 한다고 판단했습니다.",
      "behaviorHint": "턱을 굳히고 대답 길이를 의도적으로 줄인다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-05:a:d-1:act:0",
          "workplace-05:a:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "workplace-05:a:d-1:unlock:s5:0",
          "workplace-05:a:d-1:admission:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:responsibility",
      "coverageKey": "a:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:responsibility_named"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "fatigue",
        "mid"
      ]
    },
    {
      "id": "workplace05:beat_v2:a:d-1:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "fatigued_counter",
      "line": "계속 몰아붙이면 저도 방어적으로 굴 수밖에 없습니다. 문가은 씨 기여가 분명했는데도 제가 공동기획 표기를 지웠고, 승진 국면에서 제 성과로 더 선명하게 보이게 하려는 마음이 있었습니다.",
      "behaviorHint": "어깨가 굳고 시선이 거칠어진다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-05:a:d-1:act:0",
          "workplace-05:a:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "workplace-05:a:d-1:unlock:s5:0",
          "workplace-05:a:d-1:admission:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:responsibility",
      "coverageKey": "a:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-1:motive:responsibility_named"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "fatigue",
        "mid"
      ]
    },
    {
      "id": "workplace05:beat_v2:b:d-5:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "irritated",
      "line": "그 시기 이야기를 또 돌리면 저도 점점 거칠어집니다. 이번에도 원출처를 먼저 꺼내지 않은 건 맞아요, 그래도 오상혁 씨 쪽도 그 방식을 알면서 계속 써 온 거예요.",
      "behaviorHint": "입술을 깨물며 시간을 벌 듯 시선을 피한다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-05:b:d-5:act:0",
          "workplace-05:b:d-5:responsibility:0"
        ],
        "forbidAtomIds": [
          "workplace-05:b:d-5:unlock:s5:0",
          "workplace-05:b:d-5:admission:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:fatigue:timeline",
      "coverageKey": "b:d-5:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [
        "d-5:motive:legacy_named"
      ],
      "requiresFlags": [
        "d-5:surface:pattern_pressed"
      ],
      "tags": [
        "fatigue",
        "mid"
      ]
    },
    {
      "id": "workplace05:beat_v2:b:d-5:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "block",
      "line": "이미 제 몫이 있다는 말은 했어요. 같은 책임 질문만 반복하지 마세요. 이번에도 원출처를 먼저 꺼내지 않은 건 맞아요, 그래도 오상혁 씨 쪽도 그 방식을 알면서 계속 써 온 거예요.",
      "behaviorHint": "영수증이나 파일 가장자리를 세게 쥔다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-05:b:d-5:act:0",
          "workplace-05:b:d-5:responsibility:0"
        ],
        "forbidAtomIds": [
          "workplace-05:b:d-5:unlock:s5:0",
          "workplace-05:b:d-5:admission:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:fatigue:responsibility",
      "coverageKey": "b:d-5:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-5:motive:legacy_named"
      ],
      "requiresFlags": [
        "d-5:surface:pattern_pressed"
      ],
      "tags": [
        "fatigue",
        "mid"
      ]
    },
    {
      "id": "workplace05:beat_v2:b:d-5:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "fatigued_counter",
      "line": "계속 그 부분만 파고들면 결국 서로 미루는 말만 남습니다. 제가 과거에 덮인 방식을 이번에도 관성처럼 따라간 건 사실이에요",
      "behaviorHint": "숨을 길게 내쉬고 마지막 문장을 날카롭게 자른다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "opening"
        ],
        "fatigueLevels": [
          "wary",
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-05:b:d-5:act:0",
          "workplace-05:b:d-5:responsibility:0"
        ],
        "forbidAtomIds": [
          "workplace-05:b:d-5:unlock:s5:0",
          "workplace-05:b:d-5:admission:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:motive:fatigue:responsibility",
      "coverageKey": "b:d-5:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [
        "d-5:motive:legacy_named"
      ],
      "requiresFlags": [
        "d-5:surface:pattern_pressed"
      ],
      "tags": [
        "fatigue",
        "mid"
      ]
    },
    {
      "id": "workplace05:beat_v2:a:d-1:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "candid",
      "line": "제가 고객회복 랩을 제 단독 성과처럼 보이게 만들려고 공동기획 표기를 삭제했습니다",
      "behaviorHint": "질문을 곱씹은 뒤 숨길 표현을 덜어 내고 짧게 답한다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "motive_response",
      "angleTag": "motive",
      "actionFamily": "free_question",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "frayed",
          "exposed"
        ],
        "trustWindowBands": [
          "opening",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-05:a:d-1:unlock:s4:0",
          "workplace-05:a:d-1:emotion:0"
        ],
        "forbidAtomIds": [
          "workplace-05:a:d-1:context:0",
          "workplace-05:a:d-1:denial:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:motive:motive",
      "coverageKey": "a:d-1:core:late:motive:motive",
      "variantTarget": 2,
      "requiresFlags": [
        "d-1:motive:responsibility_named"
      ],
      "tags": [
        "late",
        "free_question"
      ]
    },
    {
      "id": "workplace05:beat_v2:a:d-1:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "candid",
      "line": "문가은 씨 기여가 분명했는데도 제가 공동기획 표기를 지웠고, 승진 국면에서 제 성과로 더 선명하게 보이게 하려는 마음이 있었습니다.",
      "behaviorHint": "시선을 피하지 않고 감정이 밴 문장을 그대로 내놓는다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "free_question",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "frayed",
          "exposed"
        ],
        "trustWindowBands": [
          "opening",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-05:a:d-1:unlock:s4:0",
          "workplace-05:a:d-1:emotion:0"
        ],
        "forbidAtomIds": [
          "workplace-05:a:d-1:context:0",
          "workplace-05:a:d-1:denial:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 2,
      "requiresFlags": [
        "d-1:motive:responsibility_named"
      ],
      "tags": [
        "late",
        "free_question"
      ]
    },
    {
      "id": "workplace05:beat_v2:b:d-3:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "candid",
      "line": "핵심 구조가 2년 전 보류안에서 온 건 사실이에요",
      "behaviorHint": "시선을 피하지 않고 감정이 밴 문장을 그대로 내놓는다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "shared_misconception",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "free_question",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "frayed",
          "exposed"
        ],
        "trustWindowBands": [
          "opening",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-05:b:d-3:unlock:s4:0",
          "workplace-05:b:d-3:emotion:0"
        ],
        "forbidAtomIds": [
          "workplace-05:b:d-3:context:0",
          "workplace-05:b:d-3:denial:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:rapport:emotion",
      "coverageKey": "b:d-3:core:late:rapport:emotion",
      "variantTarget": 2,
      "requiresFlags": [
        "d-3:motive:misbelief_cracked"
      ],
      "tags": [
        "late",
        "free_question"
      ]
    },
    {
      "id": "workplace05:beat_v2:a:d-4:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "candid",
      "line": "사실관계 확인 전에 제가 먼저 문가은 씨를 위험 인원처럼 적어 넣었고, 그 메모가 승진위원회에 어떻게 읽힐지 알면서도 그렇게 했습니다.",
      "behaviorHint": "시선을 피하지 않고 감정이 밴 문장을 그대로 내놓는다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "sub_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "free_question",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "frayed",
          "exposed"
        ],
        "trustWindowBands": [
          "opening",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-05:a:d-4:unlock:s4:0",
          "workplace-05:a:d-4:unlock:s5:0"
        ],
        "forbidAtomIds": [
          "workplace-05:a:d-4:context:0",
          "workplace-05:a:d-4:denial:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:core:rapport:emotion",
      "coverageKey": "a:d-4:core:late:rapport:emotion",
      "variantTarget": 2,
      "requiresFlags": [
        "d-4:motive:retaliation_named"
      ],
      "tags": [
        "late",
        "free_question"
      ]
    },
    {
      "id": "workplace05:beat_v2:b:d-5:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "candid",
      "line": "제가 2년 전 잘못된 방식에 기대 이번에도 원출처를 숨긴 채 움직였어요",
      "behaviorHint": "질문을 곱씹은 뒤 숨길 표현을 덜어 내고 짧게 답한다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "motive_response",
      "angleTag": "motive",
      "actionFamily": "free_question",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "frayed",
          "exposed"
        ],
        "trustWindowBands": [
          "opening",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-05:b:d-5:unlock:s4:0",
          "workplace-05:b:d-5:emotion:0"
        ],
        "forbidAtomIds": [
          "workplace-05:b:d-5:context:0",
          "workplace-05:b:d-5:denial:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:motive:motive",
      "coverageKey": "b:d-5:core:late:motive:motive",
      "variantTarget": 2,
      "requiresFlags": [
        "d-5:motive:legacy_named"
      ],
      "tags": [
        "late",
        "free_question"
      ]
    },
    {
      "id": "workplace05:beat_v2:b:d-5:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "candid",
      "line": "제가 과거에 덮인 방식을 이번에도 관성처럼 따라간 건 사실이에요",
      "behaviorHint": "시선을 피하지 않고 감정이 밴 문장을 그대로 내놓는다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "core_truth",
      "responseIntent": "rapport_response",
      "angleTag": "emotion",
      "actionFamily": "free_question",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "frayed",
          "exposed"
        ],
        "trustWindowBands": [
          "opening",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-05:b:d-5:unlock:s4:0",
          "workplace-05:b:d-5:emotion:0"
        ],
        "forbidAtomIds": [
          "workplace-05:b:d-5:context:0",
          "workplace-05:b:d-5:denial:0"
        ]
      },
      "weight": 5,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:rapport:emotion",
      "coverageKey": "b:d-5:core:late:rapport:emotion",
      "variantTarget": 2,
      "requiresFlags": [
        "d-5:motive:legacy_named"
      ],
      "tags": [
        "late",
        "free_question"
      ]
    },
    {
      "id": "workplace05:beat_v2:b:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "mistaken_counter",
      "line": "지금 보이는 모양만 붙잡으면 저는 이미 두 번 뺏겼어요",
      "behaviorHint": "잘못 짚은 실마리를 끝까지 놓지 않으려는 표정이다.",
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
          "workplace-05:b:d-3:unlock:s2:0",
          "workplace-05:b:d-3:act:0"
        ],
        "forbidAtomIds": [
          "workplace-05:b:d-3:unlock:s5:0",
          "workplace-05:b:d-3:admission:0"
        ]
      },
      "weight": 7,
      "priority": 39,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:identity",
      "coverageKey": "b:d-3:surface:early:trap:identity",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:source_doubt_named"
      ],
      "tags": [
        "trap",
        "misconception"
      ]
    },
    {
      "id": "workplace05:beat_v2:b:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "mistaken_counter",
      "line": "지금 보이는 모양만 붙잡으면 저는 이미 두 번 뺏겼어요",
      "behaviorHint": "잘못 짚은 실마리를 끝까지 놓지 않으려는 표정이다.",
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
          "workplace-05:b:d-3:context:0",
          "workplace-05:b:d-3:denial:0"
        ],
        "forbidAtomIds": [
          "workplace-05:b:d-3:admission:0",
          "workplace-05:b:d-3:emotion:0"
        ]
      },
      "weight": 7,
      "priority": 39,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:context",
      "coverageKey": "b:d-3:surface:early:trap:context",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:source_doubt_named"
      ],
      "tags": [
        "trap",
        "misconception"
      ]
    },
    {
      "id": "workplace05:beat_v2:b:d-3:core:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "clarify",
      "line": "증거가 들어오자 균열이 생기지만, 배수진 씨 안을 참고한 부분은 있어요, 그래도 제가 고객 데이터에 맞게 다시 짜면서 제 아이디어가 된 거라고 믿었어요.",
      "behaviorHint": "처음의 확신이 흔들리며 문장 사이 공백이 길어진다.",
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
        "fact_pursuit"
      ],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "frayed",
          "exposed"
        ],
        "trustWindowBands": [
          "opening",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-05:b:d-3:admission:0",
          "workplace-05:b:d-3:emotion:0"
        ],
        "forbidAtomIds": [
          "workplace-05:b:d-3:context:0",
          "workplace-05:b:d-3:denial:0"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:trap:context",
      "coverageKey": "b:d-3:core:late:trap:context",
      "variantTarget": 2,
      "setFlags": [
        "d-3:motive:misbelief_cracked"
      ],
      "tags": [
        "trap",
        "late"
      ],
      "requiresFlags": [
        "d-3:surface:source_doubt_named"
      ]
    },
    {
      "id": "workplace05:beat_v2:b:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "clarify",
      "line": "증거가 들어오자 균열이 생기지만, 핵심 구조가 2년 전 보류안에서 온 건 사실이에요",
      "behaviorHint": "확신이 흔들린 채 말을 고르며 뒤늦게 감정을 드러낸다.",
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
          "frayed",
          "exposed"
        ],
        "trustWindowBands": [
          "opening",
          "open"
        ],
        "fatigueLevels": [
          "tired",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-05:b:d-3:unlock:s4:0",
          "workplace-05:b:d-3:emotion:0"
        ],
        "forbidAtomIds": [
          "workplace-05:b:d-3:context:0",
          "workplace-05:b:d-3:denial:0"
        ]
      },
      "weight": 5,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:trap:emotion",
      "coverageKey": "b:d-3:core:late:trap:emotion",
      "variantTarget": 2,
      "setFlags": [
        "d-3:motive:misbelief_cracked"
      ],
      "tags": [
        "trap",
        "late"
      ],
      "requiresFlags": [
        "d-3:surface:source_doubt_named"
      ]
    },
    {
      "id": "workplace05:beat_v2:a:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject_allow",
      "line": "그 표현은 받아들일 수 없습니다. 제가 관리자로서 선을 넘은 건 맞아도, 통째로 훔친 사람처럼 몰아붙이진 마십시오.",
      "behaviorHint": "감정이 먼저 튀어나오며 오상혁이 '아이디어 도둑'이라는 표현을 직접 들을 때…라는 분위기를 만든다.",
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
          "workplace-05:a:d-1:act:0",
          "workplace-05:a:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "workplace-05:a:d-1:unlock:s5:0",
          "workplace-05:a:d-1:admission:0"
        ]
      },
      "weight": 5,
      "priority": 30,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-1:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "workplace05:beat_v2:a:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "interject_block",
      "line": "그때는 본부 전체가 흔들릴 상황이었습니다.",
      "behaviorHint": "감정이 먼저 튀어나오며 2년 전 은폐 메일을 읽고도 계속 회피한다는 지적을 받을 …라는 분위기를 만든다.",
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
          "workplace-05:a:d-5:act:0",
          "workplace-05:a:d-5:responsibility:0"
        ],
        "forbidAtomIds": [
          "workplace-05:a:d-5:unlock:s5:0",
          "workplace-05:a:d-5:admission:0"
        ]
      },
      "weight": 5,
      "priority": 30,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-5:surface:mid:interjection:emotional_only:block",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "workplace05:beat_v2:b:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interject_allow",
      "line": "또 그 얘기만 하시네요. 제가 선 넘은 건 맞아도, 왜 제가 지워진 사람이라는 사실은 자꾸 뒤로 밀리죠?",
      "behaviorHint": "감정이 먼저 튀어나오며 문가은이 무단 다운로드만 부각되고 현재 기여가 지워진다고 …라는 분위기를 만든다.",
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
          "workplace-05:b:d-1:counter:0",
          "workplace-05:b:d-1:evidence:0"
        ],
        "forbidAtomIds": [
          "workplace-05:b:d-1:responsibility:0"
        ]
      },
      "weight": 5,
      "priority": 30,
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
      "id": "workplace05:beat_v2:b:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject_block",
      "line": "네, 저도 숨겼어요.",
      "behaviorHint": "감정이 먼저 튀어나오며 문가은이 순수 창작 거짓을 정면으로 인정해야 하는 순간…라는 분위기를 만든다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
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
          "workplace-05:b:d-3:act:0",
          "workplace-05:b:d-3:responsibility:0"
        ],
        "forbidAtomIds": [
          "workplace-05:b:d-3:unlock:s5:0",
          "workplace-05:b:d-3:admission:0"
        ]
      },
      "weight": 5,
      "priority": 30,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:emotional_only:block",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only",
        "red_herring"
      ]
    },
    {
      "id": "workplace05:beat_v2:a:d-1:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "detail_allow",
      "line": "버전 이력상 삭제된 건 디자인 요소가 아니라 공동기획 표기 그 한 줄입니다. 오상혁 씨 설명은 수정 목적과 삭제 대상이 어긋납니다.",
      "behaviorHint": "구체 디테일 하나를 집어 물고 늘어지듯 반박한다.",
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
          "workplace-05:a:d-1:act:0",
          "workplace-05:a:d-1:responsibility:0"
        ],
        "forbidAtomIds": [
          "workplace-05:a:d-1:unlock:s5:0",
          "workplace-05:a:d-1:admission:0"
        ]
      },
      "weight": 5,
      "priority": 32,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-1:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "workplace05:beat_v2:b:d-2:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "detail_block",
      "line": "확인만 했다는 말과 달리 다운로드 직후 링크 전송이 이어집니다.",
      "behaviorHint": "구체 디테일 하나를 집어 물고 늘어지듯 반박한다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "timeline",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-05:b:d-2:act:0",
          "workplace-05:b:d-2:responsibility:0"
        ],
        "forbidAtomIds": [
          "workplace-05:b:d-2:unlock:s5:0",
          "workplace-05:b:d-2:admission:0"
        ]
      },
      "weight": 5,
      "priority": 32,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-2:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "workplace05:beat_v2:b:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "detail_allow",
      "line": "현재 노트의 핵심 표현이 2년 전 보류안과 과거 메일 체인에서 이미 확인됩니다. '완전한 처음'이라는 말은 원출처 기록과 충돌합니다.",
      "behaviorHint": "구체 디테일 하나를 집어 물고 늘어지듯 반박한다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "surface",
      "issueRole": "shared_misconception",
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
          "workplace-05:b:d-3:responsibility:0",
          "workplace-05:b:d-3:act:0"
        ],
        "forbidAtomIds": [
          "workplace-05:b:d-3:admission:0",
          "workplace-05:b:d-3:unlock:s5:0"
        ]
      },
      "weight": 5,
      "priority": 32,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-3:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal",
        "red_herring"
      ]
    },
    {
      "id": "workplace05:beat_v2:a:d-4:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "detail_block",
      "line": "사실확인 전날 밤 입력된 메모와 발표 순서 변경 로그가 연결됩니다.",
      "behaviorHint": "구체 디테일 하나를 집어 물고 늘어지듯 반박한다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "timeline",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-05:a:d-4:act:0",
          "workplace-05:a:d-4:responsibility:0"
        ],
        "forbidAtomIds": [
          "workplace-05:a:d-4:unlock:s5:0",
          "workplace-05:a:d-4:admission:0"
        ]
      },
      "weight": 5,
      "priority": 32,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-4:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 2,
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "workplace05:beat_v2:a:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "misbelief_allow",
      "line": "제가 말씀드리는 건 현재 개선 기여를 부정하자는 게 아니라, 원출처를 지운 채 순수 창작으로만 말하는 건 다르다는 겁니다.",
      "behaviorHint": "확신을 밀어붙이거나 흔들리는 확신을 억지로 붙잡는 반응이다.",
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
          "workplace-05:a:d-3:context:0",
          "workplace-05:a:d-3:emotion:0"
        ],
        "forbidAtomIds": [
          "workplace-05:a:d-3:responsibility:0",
          "workplace-05:a:d-3:relationship:0"
        ]
      },
      "weight": 6,
      "priority": 34,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 2,
      "beliefMode": "knows",
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "misbelief_escalation",
        "red_herring"
      ]
    },
    {
      "id": "workplace05:beat_v2:a:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "misbelief_block",
      "line": "날짜가 잘린 노트 사진만으로 결론을 굳히면 오해가 더 세집니다.",
      "behaviorHint": "확신을 밀어붙이거나 흔들리는 확신을 억지로 붙잡는 반응이다.",
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
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-05:a:d-3:context:0",
          "workplace-05:a:d-3:emotion:0"
        ],
        "forbidAtomIds": [
          "workplace-05:a:d-3:responsibility:0",
          "workplace-05:a:d-3:relationship:0"
        ]
      },
      "weight": 6,
      "priority": 34,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 2,
      "beliefMode": "knows",
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "misbelief_escalation",
        "red_herring"
      ]
    },
    {
      "id": "workplace05:beat_v2:b:d-3:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "misbelief_allow",
      "line": "화이트보드 캡처 시점 절삭만으로 결론을 굳히면 오해가 더 세집니다. 그 해석이 맞는지부터 다시 봐야 합니다.",
      "behaviorHint": "확신을 밀어붙이거나 흔들리는 확신을 억지로 붙잡는 반응이다.",
      "applicableStates": [
        "M3",
        "M4"
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
          "M3",
          "M4"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-05:b:d-3:admission:0",
          "workplace-05:b:d-3:emotion:0"
        ],
        "forbidAtomIds": [
          "workplace-05:b:d-3:context:0",
          "workplace-05:b:d-3:denial:0"
        ]
      },
      "weight": 6,
      "priority": 34,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 2,
      "beliefMode": "misbelief",
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "misbelief_escalation",
        "red_herring"
      ]
    },
    {
      "id": "workplace05:beat_v2:a:d-3:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "misbelief_block",
      "line": "현재 기여와 원출처 혼용만으로 결론을 굳히면 오해가 더 세집니다.",
      "behaviorHint": "확신을 밀어붙이거나 흔들리는 확신을 억지로 붙잡는 반응이다.",
      "applicableStates": [
        "M3",
        "M4"
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
          "M3",
          "M4"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-05:a:d-3:relationship:0",
          "workplace-05:a:d-3:responsibility:0"
        ],
        "forbidAtomIds": [
          "workplace-05:a:d-3:context:0",
          "workplace-05:a:d-3:emotion:0"
        ]
      },
      "weight": 6,
      "priority": 34,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 2,
      "beliefMode": "knows",
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "misbelief_escalation",
        "red_herring"
      ]
    }
  ]
} as const;

export default workplace05BeatsV2Full;
