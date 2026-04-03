export const workplace11BeatsV2Full = {
  "caseId": "workplace-11",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 58,
    "byActionFamily": {
      "question": 30,
      "evidence": 6,
      "fatigue": 6,
      "free_question": 4,
      "interjection": 12
    },
    "byParty": {
      "a": 33,
      "b": 25
    },
    "byIssueRole": {
      "core_truth": 25,
      "sub_truth": 23,
      "shared_misconception": 10
    },
    "byDispute": {
      "d-1": 15,
      "d-2": 10,
      "d-5": 15,
      "d-4": 8,
      "d-3": 10
    },
    "interjectionLevels": {
      "emotional_only": 4,
      "detail_rebuttal": 4,
      "misbelief_escalation": 4
    },
    "matrixChecks": {
      "question_early_timeline": true,
      "question_early_identity_or_context": true,
      "question_mid_responsibility": true,
      "question_mid_motive": true,
      "question_late_emotion": true,
      "evidence_context_identity_legality": true,
      "fatigue_mid_timeline": true,
      "fatigue_mid_responsibility": true,
      "free_question_late_motive_or_emotion": true,
      "trap_early_identity": true,
      "trap_early_context": true,
      "trap_late_context": true,
      "trap_late_emotion": true,
      "interjection_emotional_only": true,
      "interjection_detail_rebuttal": true,
      "interjection_misbelief_escalation": true
    },
    "coverageKeys": [
      "a:d-1:core:late:rapport:emotion",
      "a:d-1:motive:mid:fatigue:timeline",
      "a:d-1:surface:early:pressure:timeline",
      "a:d-1:surface:mid:interjection:emotional_only:allow",
      "a:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "a:d-3:surface:mid:interjection:misbelief_escalation:block",
      "a:d-4:motive:mid:pressure:responsibility",
      "a:d-4:surface:early:evidence:legality",
      "a:d-4:surface:mid:interjection:detail_rebuttal:allow",
      "a:d-4:surface:mid:interjection:detail_rebuttal:block",
      "a:d-5:core:late:motive:motive",
      "a:d-5:motive:mid:evidence:context",
      "a:d-5:motive:mid:motive:motive",
      "a:d-5:surface:mid:interjection:emotional_only:block",
      "b:d-1:surface:mid:interjection:emotional_only:allow",
      "b:d-2:motive:mid:evidence:identity",
      "b:d-2:motive:mid:fatigue:responsibility",
      "b:d-2:surface:early:pressure:identity",
      "b:d-2:surface:mid:interjection:detail_rebuttal:allow",
      "b:d-2:surface:mid:interjection:detail_rebuttal:block",
      "b:d-3:core:late:trap:context",
      "b:d-3:core:late:trap:emotion",
      "b:d-3:surface:early:trap:context",
      "b:d-3:surface:early:trap:identity",
      "b:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "b:d-3:surface:mid:interjection:misbelief_escalation:block",
      "b:d-5:core:late:rapport:emotion",
      "b:d-5:surface:early:pressure:context",
      "b:d-5:surface:mid:interjection:emotional_only:block"
    ]
  },
  "beats": [
    {
      "id": "workplace11:beat_v2:a:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "발명자 표기와 대표 브리핑은 다른 층위이고, 잠정출원 직전 정리 과정에서 제가 노서린 씨 이름을 의도적으로 지운 건 아닙니다.",
      "behaviorHint": "말끝을 길게 끌며 책임보다 상황을 먼저 설명한다.",
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
          "workplace-11:a:d-1:context:1"
        ],
        "forbidAtomIds": [
          "workplace-11:a:d-1:admission:5"
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
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "workplace11:beat_v2:a:d-1:surface:pressure:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deflect",
      "line": "기획, 실험, 청구항을 구분해 대표 표기를 맞춘 것이지, 노서린 씨 공로 자체를 없애려 한 건 아니라고 봅니다.",
      "behaviorHint": "시선을 잠깐 피했다가 다시 정면을 본다.",
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
          "workplace-11:a:d-1:context:1"
        ],
        "forbidAtomIds": [
          "workplace-11:a:d-1:admission:5"
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
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "workplace11:beat_v2:a:d-1:surface:pressure:timeline:03",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "minimize",
      "line": "발명자 기준과 발표 대표는 분리해서 보셔야 합니다. 그 단계에서는 정리의 문제였지, 노서린 씨를 배제하려는 조치는 아니었습니다.",
      "behaviorHint": "손끝으로 책상 모서리를 건드리며 방어적으로 버틴다.",
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
          "workplace-11:a:d-1:context:1"
        ],
        "forbidAtomIds": [
          "workplace-11:a:d-1:admission:5"
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
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "workplace11:beat_v2:a:d-1:surface:pressure:timeline:04",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "버전 이력이 나오면 제 계정에서 열을 본 사실은 부인하지 못합니다. 다만 청구항 정리와 회사 자산 기준을 먼저 맞추려 한 것이라고 말씀드리겠습니다.",
      "behaviorHint": "한 문장 안에서 해명과 축소를 섞어 말한다.",
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
          "workplace-11:a:d-1:context:1"
        ],
        "forbidAtomIds": [
          "workplace-11:a:d-1:admission:5"
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
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "workplace11:beat_v2:a:d-1:surface:pressure:timeline:05",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "reframe",
      "line": "발명자 표기와 대표 브리핑은 다른 층위이고, 잠정출원 직전 정리 과정에서 제가 노서린 씨 이름을 의도적으로 지운 건 아닙니다. 그때는 그렇게 보는 쪽이 먼저였습니다.",
      "behaviorHint": "말끝을 길게 끌며 책임보다 상황을 먼저 설명한다.",
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
          "workplace-11:a:d-1:context:1"
        ],
        "forbidAtomIds": [
          "workplace-11:a:d-1:admission:5"
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
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "workplace11:beat_v2:a:d-1:surface:pressure:timeline:06",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "counter",
      "line": "기획, 실험, 청구항을 구분해 대표 표기를 맞춘 것이지, 노서린 씨 공로 자체를 없애려 한 건 아니라고 봅니다. 그때는 그렇게 보는 쪽이 먼저였습니다.",
      "behaviorHint": "시선을 잠깐 피했다가 다시 정면을 본다.",
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
          "workplace-11:a:d-1:context:1"
        ],
        "forbidAtomIds": [
          "workplace-11:a:d-1:admission:5"
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
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "workplace11:beat_v2:b:d-2:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "제가 보낸 건 전체 패키지가 아니라 정리본이었고, 승인 없는 판매 같은 건 아니었어요.",
      "behaviorHint": "말끝을 길게 끌며 책임보다 상황을 먼저 설명한다.",
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
          "workplace-11:b:d-2:denial:0"
        ],
        "forbidAtomIds": [
          "workplace-11:b:d-2:emotion:4"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:identity",
      "coverageKey": "b:d-2:surface:early:pressure:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:identity_checked"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "workplace11:beat_v2:b:d-2:surface:pressure:identity:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deflect",
      "line": "아이디어 설명용 정리본을 외부 변리사 쪽 검토처럼 생각한 거지, 청구항과 실험 요약을 넘겨 돈 얘기까지 한 건 아니라는 입장이에요.",
      "behaviorHint": "시선을 잠깐 피했다가 다시 정면을 본다.",
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
          "workplace-11:b:d-2:denial:0"
        ],
        "forbidAtomIds": [
          "workplace-11:b:d-2:emotion:4"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:identity",
      "coverageKey": "b:d-2:surface:early:pressure:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:identity_checked"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "workplace11:beat_v2:b:d-2:surface:pressure:identity:03",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "정리본 정도는 확인받을 수 있다고 생각했어요. 그때는 외부 변리사 의견 비슷한 걸 기대한 거예요.",
      "behaviorHint": "손끝으로 책상 모서리를 건드리며 방어적으로 버틴다.",
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
          "workplace-11:b:d-2:denial:0"
        ],
        "forbidAtomIds": [
          "workplace-11:b:d-2:emotion:4"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:identity",
      "coverageKey": "b:d-2:surface:early:pressure:identity",
      "variantTarget": 3,
      "setFlags": [
        "d-2:surface:identity_checked"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "workplace11:beat_v2:b:d-5:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "저희가 일부러 싸움을 꾸며서 공모를 숨겼다는 말은 너무 과해요. 제 억울함은 실제였어요.",
      "behaviorHint": "말끝을 길게 끌며 책임보다 상황을 먼저 설명한다.",
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
          "workplace-11:b:d-5:denial:0"
        ],
        "forbidAtomIds": [
          "workplace-11:b:d-5:admission:5"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:pressure:context",
      "coverageKey": "b:d-5:surface:early:pressure:context",
      "variantTarget": 3,
      "setFlags": [
        "d-5:surface:context_checked"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "workplace11:beat_v2:b:d-5:surface:pressure:context:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "counter",
      "line": "제가 먼저 지워졌고 몇 달을 참았다는 건 사실이고, 그 감정이 있었다고 해서 싸움 전체를 연출이라고 단정할 수는 없어요.",
      "behaviorHint": "시선을 잠깐 피했다가 다시 정면을 본다.",
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
          "workplace-11:b:d-5:denial:0"
        ],
        "forbidAtomIds": [
          "workplace-11:b:d-5:admission:5"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:pressure:context",
      "coverageKey": "b:d-5:surface:early:pressure:context",
      "variantTarget": 3,
      "setFlags": [
        "d-5:surface:context_checked"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "workplace11:beat_v2:b:d-5:surface:pressure:context:03",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "억울함은 진짜였어요. 그래서 그 싸움이 전부 연출이었다는 말은 바로 못 받아들였어요.",
      "behaviorHint": "손끝으로 책상 모서리를 건드리며 방어적으로 버틴다.",
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
          "workplace-11:b:d-5:denial:0"
        ],
        "forbidAtomIds": [
          "workplace-11:b:d-5:admission:5"
        ]
      },
      "weight": 6,
      "priority": 30,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:surface:pressure:context",
      "coverageKey": "b:d-5:surface:early:pressure:context",
      "variantTarget": 3,
      "setFlags": [
        "d-5:surface:context_checked"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "workplace11:beat_v2:a:d-4:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "포렌식 전에 위험 코멘트를 먼저 입력한 건 맞지만, 다만 발표 리스크를 줄이려는 선제 대응이라고 생각했습니다.",
      "behaviorHint": "인정과 변명이 섞여 손동작이 커진다.",
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
          "workplace-11:a:d-4:responsibility:3"
        ],
        "forbidAtomIds": [
          "workplace-11:a:d-4:emotion:4"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:pressure:responsibility",
      "coverageKey": "a:d-4:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-4:motive:responsibility_pressed"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "workplace11:beat_v2:a:d-4:motive:pressure:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "justify",
      "line": "제가 먼저 코멘트를 넣은 책임은 있으나, 노서린 씨 쪽도 개인 보관 습관과 외부 접촉 정황으로 의심을 키웠습니다.",
      "behaviorHint": "자기 이유를 꺼낼 때만 목소리가 빨라진다.",
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
          "workplace-11:a:d-4:responsibility:3"
        ],
        "forbidAtomIds": [
          "workplace-11:a:d-4:emotion:4"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:pressure:responsibility",
      "coverageKey": "a:d-4:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-4:motive:responsibility_pressed"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "workplace11:beat_v2:a:d-4:motive:pressure:responsibility:03",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "counter",
      "line": "초기 입력본이 나오면 제가 먼저 메모한 사실은 인정합니다. 다만 발표 리스크를 줄이려는 선제 대응이라고 여겼습니다.",
      "behaviorHint": "상대를 보다가도 결국 자기 사정을 더 길게 말한다.",
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
          "workplace-11:a:d-4:responsibility:3"
        ],
        "forbidAtomIds": [
          "workplace-11:a:d-4:emotion:4"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:pressure:responsibility",
      "coverageKey": "a:d-4:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-4:motive:responsibility_pressed"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "workplace11:beat_v2:a:d-4:motive:pressure:responsibility:04",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "admit",
      "line": "승진 심사와 투자사 데모 압박 때문에 통제를 서둘렀습니다. 사실 확인보다 관리가 앞선 건 사실입니다.",
      "behaviorHint": "한숨을 삼킨 뒤 변명과 고백을 번갈아 놓는다.",
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
          "workplace-11:a:d-4:responsibility:3"
        ],
        "forbidAtomIds": [
          "workplace-11:a:d-4:emotion:4"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:pressure:responsibility",
      "coverageKey": "a:d-4:motive:mid:pressure:responsibility",
      "variantTarget": 4,
      "setFlags": [
        "d-4:motive:responsibility_pressed"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "workplace11:beat_v2:a:d-5:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "justify",
      "line": "분쟁이 외부 시선을 돌리는 효과가 있다는 점은 알았지만, 다만 처음부터 은폐용 각본으로 짠 건 아니라고 생각했습니다.",
      "behaviorHint": "인정과 변명이 섞여 손동작이 커진다.",
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
          "workplace-11:a:d-5:context:1"
        ],
        "forbidAtomIds": [
          "workplace-11:a:d-5:emotion:4"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:motive:motive",
      "coverageKey": "a:d-5:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:motive_opened"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "workplace11:beat_v2:a:d-5:motive:motive:motive:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "제가 갈등 구도를 이용한 책임은 있어도, 노서린 씨 쪽도 브로커 수수료와 추가 청구항 전달을 먼저 실무로 굴렸습니다.",
      "behaviorHint": "자기 이유를 꺼낼 때만 목소리가 빨라진다.",
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
          "workplace-11:a:d-5:context:1"
        ],
        "forbidAtomIds": [
          "workplace-11:a:d-5:emotion:4"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:motive:motive",
      "coverageKey": "a:d-5:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:motive_opened"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "workplace11:beat_v2:a:d-5:motive:motive:motive:03",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "explain",
      "line": "서린 씨의 외부 접촉 흔적이 나와도, 다만 저는 그 분쟁이 시선을 돌릴 수 있다는 정도만 인식했습니다.",
      "behaviorHint": "상대를 보다가도 결국 자기 사정을 더 길게 말한다.",
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
          "workplace-11:a:d-5:context:1"
        ],
        "forbidAtomIds": [
          "workplace-11:a:d-5:emotion:4"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:motive:motive",
      "coverageKey": "a:d-5:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:motive_opened"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "workplace11:beat_v2:a:d-5:motive:motive:motive:04",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "crack",
      "line": "수수료 흐름까지 보면 제 설명이 가벼웠다는 건 압니다. 그래도 노서린 씨 쪽 실무가 먼저 굴러간 면도 있습니다.",
      "behaviorHint": "한숨을 삼킨 뒤 변명과 고백을 번갈아 놓는다.",
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
          "workplace-11:a:d-5:context:1"
        ],
        "forbidAtomIds": [
          "workplace-11:a:d-5:emotion:4"
        ]
      },
      "weight": 4,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:motive:motive",
      "coverageKey": "a:d-5:motive:mid:motive:motive",
      "variantTarget": 4,
      "setFlags": [
        "d-5:motive:motive_opened"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "workplace11:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "조직 소유라는 말 뒤에 숨어 제가 공로 압박을 밀어붙였고, 그 과정에서 노서린 씨 이름이 빠져도 된다고 스스로 합리화했습니다.",
      "behaviorHint": "말을 마친 뒤 짧게 숨을 고르며 표정이 흔들린다.",
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
          "frayed",
          "exposed"
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
          "workplace-11:a:d-1:emotion:4"
        ],
        "forbidAtomIds": [
          "workplace-11:a:d-1:admission:5"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-1:core:emotion_opened"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "workplace11:beat_v2:a:d-1:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "emotion_open",
      "line": "제가 노서린 씨의 청구항 기여를 알고도 발명자 표기에서 빼고 제 대표 성과처럼 제시했습니다. 제 책임입니다.",
      "behaviorHint": "마지막 문장에서만 힘이 빠지고 시선이 내려간다.",
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
          "frayed",
          "exposed"
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
          "workplace-11:a:d-1:emotion:4"
        ],
        "forbidAtomIds": [
          "workplace-11:a:d-1:admission:5"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-1:core:emotion_opened"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "workplace11:beat_v2:a:d-1:core:rapport:emotion:03",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "shame",
      "line": "네, 제가 이름을 빼고 제 성과처럼 보이게 만들었습니다. 조직 소유라는 말로 숨겼지만 제 책임입니다.",
      "behaviorHint": "감정을 눌러 보려다 끝내 목소리의 떨림이 남는다.",
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
          "frayed",
          "exposed"
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
          "workplace-11:a:d-1:emotion:4"
        ],
        "forbidAtomIds": [
          "workplace-11:a:d-1:admission:5"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-1:core:emotion_opened"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "workplace11:beat_v2:a:d-1:core:rapport:emotion:04",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "repair",
      "line": "제가 다 훔쳐 간 관리자처럼만 몰아가시면 안 됩니다. 그 주간엔 출원, 투자사, 보안 감사가 한꺼번에 밀려왔습니다.",
      "behaviorHint": "체념과 인정이 섞인 표정으로 답을 끝낸다.",
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
          "frayed",
          "exposed"
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
          "workplace-11:a:d-1:emotion:4"
        ],
        "forbidAtomIds": [
          "workplace-11:a:d-1:admission:5"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 4,
      "setFlags": [
        "d-1:core:emotion_opened"
      ],
      "tags": [
        "mid"
      ]
    },
    {
      "id": "workplace11:beat_v2:a:d-4:surface:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "그 자료 초기 입력본의 시간순서는 반대입니다. 포렌식 결과보다 먼저 위험 코멘트와 발표 제외 흔적이 들어가 있습니다.",
      "behaviorHint": "증거를 힐끗 보고 바로 시선을 피한다.",
      "applicableStates": [
        "S1",
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
          "workplace-11:a:d-4:rule:0"
        ],
        "forbidAtomIds": [
          "workplace-11:a:d-4:admission:5"
        ]
      },
      "weight": 3,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:evidence:legality",
      "coverageKey": "a:d-4:surface:early:evidence:legality",
      "variantTarget": 2,
      "setFlags": [
        "d-4:surface:legality_seen"
      ],
      "tags": [
        "cold",
        "evidence"
      ]
    },
    {
      "id": "workplace11:beat_v2:a:d-4:surface:evidence:legality:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "cornered",
      "line": "위험 메모는 예방 기록이었습니다. 인사 낙인으로 보실 건 아니고, 보안 감사 일정 때문이었습니다.",
      "behaviorHint": "자료 끝을 손가락으로 두드리며 부정의 속도를 늦춘다.",
      "applicableStates": [
        "S1",
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
          "workplace-11:a:d-4:rule:0"
        ],
        "forbidAtomIds": [
          "workplace-11:a:d-4:admission:5"
        ]
      },
      "weight": 3,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:surface:evidence:legality",
      "coverageKey": "a:d-4:surface:early:evidence:legality",
      "variantTarget": 2,
      "setFlags": [
        "d-4:surface:legality_seen"
      ],
      "tags": [
        "cold",
        "evidence"
      ]
    },
    {
      "id": "workplace11:beat_v2:b:d-2:motive:evidence:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "정리본이라는 표현과 달리 첨부 범위에는 청구항 문장과 실험 요약이 함께 들어 있습니다. 수수료 대화까지 이어져 단순 설명으로 보기 어렵습니다.",
      "behaviorHint": "증거를 힐끗 보고 바로 시선을 피한다.",
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
          "workplace-11:b:d-2:context:1"
        ],
        "forbidAtomIds": [
          "workplace-11:b:d-2:emotion:4"
        ]
      },
      "weight": 3,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:evidence:identity",
      "coverageKey": "b:d-2:motive:mid:evidence:identity",
      "variantTarget": 2,
      "setFlags": [
        "d-2:motive:evidence_aired"
      ],
      "tags": [
        "cold",
        "evidence"
      ]
    },
    {
      "id": "workplace11:beat_v2:b:d-2:motive:evidence:identity:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "rebut",
      "line": "발명자 기여 변경 시점과 외부 브로커 전달 시점이 가까워 두 갈등이 서로를 가리는 장치처럼 작동합니다.",
      "behaviorHint": "자료 끝을 손가락으로 두드리며 부정의 속도를 늦춘다.",
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
          "workplace-11:b:d-2:context:1"
        ],
        "forbidAtomIds": [
          "workplace-11:b:d-2:emotion:4"
        ]
      },
      "weight": 3,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:evidence:identity",
      "coverageKey": "b:d-2:motive:mid:evidence:identity",
      "variantTarget": 2,
      "setFlags": [
        "d-2:motive:evidence_aired"
      ],
      "tags": [
        "cold",
        "evidence"
      ]
    },
    {
      "id": "workplace11:beat_v2:a:d-5:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "잘린 DLP 캡처만으로는 단독 유출을 확정할 수 없습니다. 그 자료 원본 로그를 열면 재전송 경로와 외부 세션이 따로 보입니다.",
      "behaviorHint": "증거를 힐끗 보고 바로 시선을 피한다.",
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
          "workplace-11:a:d-5:context:1"
        ],
        "forbidAtomIds": [
          "workplace-11:a:d-5:emotion:4"
        ]
      },
      "weight": 3,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:evidence:context",
      "coverageKey": "a:d-5:motive:mid:evidence:context",
      "variantTarget": 2,
      "setFlags": [
        "d-5:motive:evidence_aired"
      ],
      "tags": [
        "cold",
        "evidence"
      ]
    },
    {
      "id": "workplace11:beat_v2:a:d-5:motive:evidence:context:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "rebut",
      "line": "서린 씨의 외부 접촉 흔적이 나와도, 다만 저는 그 분쟁이 시선을 돌릴 수 있다는 정도만 인식했습니다.",
      "behaviorHint": "자료 끝을 손가락으로 두드리며 부정의 속도를 늦춘다.",
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
          "workplace-11:a:d-5:context:1"
        ],
        "forbidAtomIds": [
          "workplace-11:a:d-5:emotion:4"
        ]
      },
      "weight": 3,
      "priority": 28,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:motive:evidence:context",
      "coverageKey": "a:d-5:motive:mid:evidence:context",
      "variantTarget": 2,
      "setFlags": [
        "d-5:motive:evidence_aired"
      ],
      "tags": [
        "cold",
        "evidence"
      ]
    },
    {
      "id": "workplace11:beat_v2:b:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "mistaken_certainty",
      "line": "저는 브로커 한 곳에 설명용으로만 보낸다고 생각했고, 제3자 자문 폴더까지 퍼질 거라고는 전혀 몰랐어요.",
      "behaviorHint": "확신하던 표정이 미세하게 흔들린다.",
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
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-11:b:d-3:evidence:1"
        ],
        "forbidAtomIds": [
          "workplace-11:b:d-3:emotion:4"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:identity",
      "coverageKey": "b:d-3:surface:early:trap:identity",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:misbelief_seen"
      ],
      "tags": [
        "trap"
      ]
    },
    {
      "id": "workplace11:beat_v2:b:d-3:surface:trap:identity:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confused_rebuttal",
      "line": "DLP 캡처만 보면 제가 다 한 것처럼 보이지만, 그 자료만으로 외부 도달 범위를 단정하는 건 무리라고 생각해요.",
      "behaviorHint": "같은 말을 반복하다가 특정 단어에서 멈칫한다.",
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
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-11:b:d-3:evidence:1"
        ],
        "forbidAtomIds": [
          "workplace-11:b:d-3:emotion:4"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:identity",
      "coverageKey": "b:d-3:surface:early:trap:identity",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:misbelief_seen"
      ],
      "tags": [
        "trap"
      ]
    },
    {
      "id": "workplace11:beat_v2:b:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "mistaken_certainty",
      "line": "저는 브로커 한 곳에 설명용으로만 보낸다고 생각했고, 제3자 자문 폴더까지 퍼질 거라고는 전혀 몰랐어요.",
      "behaviorHint": "확신하던 표정이 미세하게 흔들린다.",
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
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-11:b:d-3:denial:0"
        ],
        "forbidAtomIds": [
          "workplace-11:b:d-3:admission:5"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:context",
      "coverageKey": "b:d-3:surface:early:trap:context",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:context_checked"
      ],
      "tags": [
        "trap"
      ]
    },
    {
      "id": "workplace11:beat_v2:b:d-3:surface:trap:context:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confused_rebuttal",
      "line": "DLP 캡처만 보면 제가 다 한 것처럼 보이지만, 그 자료만으로 외부 도달 범위를 단정하는 건 무리라고 생각해요.",
      "behaviorHint": "같은 말을 반복하다가 특정 단어에서 멈칫한다.",
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
        ],
        "misconceptionStates": [
          "M0",
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-11:b:d-3:denial:0"
        ],
        "forbidAtomIds": [
          "workplace-11:b:d-3:admission:5"
        ]
      },
      "weight": 4,
      "priority": 24,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:context",
      "coverageKey": "b:d-3:surface:early:trap:context",
      "variantTarget": 2,
      "setFlags": [
        "d-3:surface:context_checked"
      ],
      "tags": [
        "trap"
      ]
    },
    {
      "id": "workplace11:beat_v2:b:d-3:core:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "doubt",
      "line": "제가 링크를 느슨하게 다룬 책임은 있지만, 브로커 쪽도 다시 돌렸고 권태준 팀장 쪽도 제한적 공유라는 말로 안심시켰어요.",
      "behaviorHint": "확신하던 표정이 미세하게 흔들린다.",
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
          "frayed",
          "exposed"
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
          "workplace-11:b:d-3:admission:2"
        ],
        "forbidAtomIds": [
          "workplace-11:b:d-3:admission:5"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:trap:context",
      "coverageKey": "b:d-3:core:late:trap:context",
      "variantTarget": 1,
      "setFlags": [
        "d-3:motive:misbelief_shaken"
      ],
      "tags": [
        "trap"
      ]
    },
    {
      "id": "workplace11:beat_v2:b:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "clarify",
      "line": "제가 링크를 느슨하게 다룬 책임은 있지만, 브로커 쪽도 다시 돌렸고 권태준 팀장 쪽도 제한적 공유라는 말로 안심시켰어요.",
      "behaviorHint": "확신하던 표정이 미세하게 흔들린다.",
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
          "frayed",
          "exposed"
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
          "workplace-11:b:d-3:emotion:4"
        ],
        "forbidAtomIds": [
          "workplace-11:b:d-3:admission:5"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:trap:emotion",
      "coverageKey": "b:d-3:core:late:trap:emotion",
      "variantTarget": 1,
      "setFlags": [
        "d-3:core:clarified"
      ],
      "tags": [
        "trap"
      ]
    },
    {
      "id": "workplace11:beat_v2:a:d-1:motive:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "fatigue_irritation",
      "line": "제가 다 훔쳐 간 관리자처럼만 몰아가시면 안 됩니다. 그 주간엔 출원, 투자사, 보안 감사가 한꺼번에 밀려왔습니다.",
      "behaviorHint": "짧게 끊어 말하며 피로와 짜증이 섞인다.",
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
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-11:a:d-1:context:1"
        ],
        "forbidAtomIds": [
          "workplace-11:a:d-1:admission:5"
        ]
      },
      "weight": 3,
      "priority": 18,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:timeline",
      "coverageKey": "a:d-1:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "workplace11:beat_v2:a:d-1:motive:fatigue:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "fatigue_block",
      "line": "최종 버전에서 제 계정으로 이름 열을 확인한 건 맞지만, 다만 회사 자산 기준에 맞춰 대표 표기를 단순화한 것이라고 생각했습니다.",
      "behaviorHint": "자세가 무너지고 목소리가 날카로워진다.",
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
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-11:a:d-1:context:1"
        ],
        "forbidAtomIds": [
          "workplace-11:a:d-1:admission:5"
        ]
      },
      "weight": 3,
      "priority": 18,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:timeline",
      "coverageKey": "a:d-1:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "workplace11:beat_v2:a:d-1:motive:fatigue:timeline:03",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "fatigue_counter",
      "line": "대표 슬라이드를 제가 단독 성과처럼 보이게 만든 책임은 있습니다만, 노서린 씨 쪽도 외부 검토 리스크를 숨긴 채 공로만 앞세워 혼선을 키웠습니다.",
      "behaviorHint": "말끝이 거칠어졌다가 곧바로 닫힌다.",
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
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-11:a:d-1:context:1"
        ],
        "forbidAtomIds": [
          "workplace-11:a:d-1:admission:5"
        ]
      },
      "weight": 3,
      "priority": 18,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:timeline",
      "coverageKey": "a:d-1:motive:mid:fatigue:timeline",
      "variantTarget": 3,
      "setFlags": [],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "workplace11:beat_v2:b:d-2:motive:fatigue:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "fatigue_irritation",
      "line": "네, 제가 버틴 것도 알아요. 그런데 먼저 빼앗겼다는 생각이 너무 컸고, 그 분노를 잘못된 데 썼어요.",
      "behaviorHint": "짧게 끊어 말하며 피로와 짜증이 섞인다.",
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
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-11:b:d-2:responsibility:3"
        ],
        "forbidAtomIds": [
          "workplace-11:b:d-2:emotion:4"
        ]
      },
      "weight": 3,
      "priority": 18,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:fatigue:responsibility",
      "coverageKey": "b:d-2:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "workplace11:beat_v2:b:d-2:motive:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "fatigue_block",
      "line": "개인메일과 텔레그램을 쓴 건 맞아요. 다만 제가 먼저 지워졌고 몇 달을 참은 끝에 정리본 정도는 확인받아도 된다고 스스로 합리화했어요.",
      "behaviorHint": "자세가 무너지고 목소리가 날카로워진다.",
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
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-11:b:d-2:responsibility:3"
        ],
        "forbidAtomIds": [
          "workplace-11:b:d-2:emotion:4"
        ]
      },
      "weight": 3,
      "priority": 18,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:fatigue:responsibility",
      "coverageKey": "b:d-2:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "workplace11:beat_v2:b:d-2:motive:fatigue:responsibility:03",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "fatigue_counter",
      "line": "제가 선을 넘은 책임은 있지만, 권태준 팀장 쪽도 내부 채널을 막고 발명자 문제를 틀어쥔 채 저를 밖으로 밀어낸 면이 있어요.",
      "behaviorHint": "말끝이 거칠어졌다가 곧바로 닫힌다.",
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
          "tired",
          "frayed"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-11:b:d-2:responsibility:3"
        ],
        "forbidAtomIds": [
          "workplace-11:b:d-2:emotion:4"
        ]
      },
      "weight": 3,
      "priority": 18,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:fatigue:responsibility",
      "coverageKey": "b:d-2:motive:mid:fatigue:responsibility",
      "variantTarget": 3,
      "setFlags": [],
      "tags": [
        "fatigue"
      ]
    },
    {
      "id": "workplace11:beat_v2:a:d-5:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "open_answer",
      "line": "서로 다투는 모양을 만들면 조직과 감사 시선이 갈라질 거라고 기대했고, 그 계산을 제가 멈추지 않았습니다.",
      "behaviorHint": "잠깐 침묵한 뒤 더 돌리지 않고 핵심만 꺼낸다.",
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
        "free_question"
      ],
      "conditions": {
        "emotionTiers": [
          "frayed",
          "exposed"
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
          "workplace-11:a:d-5:emotion:4"
        ],
        "forbidAtomIds": [
          "workplace-11:a:d-5:emotion:4"
        ]
      },
      "weight": 3,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:motive:motive",
      "coverageKey": "a:d-5:core:late:motive:motive",
      "variantTarget": 2,
      "setFlags": [],
      "tags": [
        "free_question"
      ]
    },
    {
      "id": "workplace11:beat_v2:a:d-5:core:motive:motive:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "open_answer",
      "line": "제가 노서린 씨와 발명자 다툼을 연출해 외부 브로커 공모를 가리려 했습니다. 제 잘못입니다.",
      "behaviorHint": "질문의 의도를 인정하듯 짧게 한숨을 쉬고 답한다.",
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
        "free_question"
      ],
      "conditions": {
        "emotionTiers": [
          "frayed",
          "exposed"
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
          "workplace-11:a:d-5:emotion:4"
        ],
        "forbidAtomIds": [
          "workplace-11:a:d-5:emotion:4"
        ]
      },
      "weight": 3,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:motive:motive",
      "coverageKey": "a:d-5:core:late:motive:motive",
      "variantTarget": 2,
      "setFlags": [],
      "tags": [
        "free_question"
      ]
    },
    {
      "id": "workplace11:beat_v2:b:d-5:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "emotional_open",
      "line": "제가 먼저 지워졌다는 피해감과 복수심 때문에, 정리본과 외부 변리사 얘기 뒤에 공모 흔적을 숨기려 든 건 사실이에요.",
      "behaviorHint": "잠깐 침묵한 뒤 더 돌리지 않고 핵심만 꺼낸다.",
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
        "free_question"
      ],
      "conditions": {
        "emotionTiers": [
          "frayed",
          "exposed"
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
          "workplace-11:b:d-5:emotion:4"
        ],
        "forbidAtomIds": [
          "workplace-11:b:d-5:admission:5"
        ]
      },
      "weight": 3,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:rapport:emotion",
      "coverageKey": "b:d-5:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [],
      "tags": [
        "free_question"
      ]
    },
    {
      "id": "workplace11:beat_v2:b:d-5:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "emotional_open",
      "line": "제가 권태준 팀장과 갈등을 일부러 키워 공모를 가렸습니다. 제 책임이고, 복수심까지 섞여 있었습니다.",
      "behaviorHint": "질문의 의도를 인정하듯 짧게 한숨을 쉬고 답한다.",
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
        "free_question"
      ],
      "conditions": {
        "emotionTiers": [
          "frayed",
          "exposed"
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
          "workplace-11:b:d-5:emotion:4"
        ],
        "forbidAtomIds": [
          "workplace-11:b:d-5:admission:5"
        ]
      },
      "weight": 3,
      "priority": 22,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:rapport:emotion",
      "coverageKey": "b:d-5:core:late:rapport:emotion",
      "variantTarget": 2,
      "setFlags": [],
      "tags": [
        "free_question"
      ]
    },
    {
      "id": "workplace11:beat_v2:a:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject_allow",
      "line": "출원, 투자사, 보안 감사가 한꺼번에 밀리던 주간이었습니다. 저는 제 대표성과 자리부터 지키려는 쪽으로 기울었습니다.",
      "behaviorHint": "허용받자 감정보다 압박의 무게를 먼저 고백한다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "opening"
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
          "workplace-11:a:d-1:context:1"
        ],
        "forbidAtomIds": [
          "workplace-11:a:d-1:admission:5"
        ]
      },
      "weight": 5,
      "priority": 25,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-1:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 1,
      "setFlags": [],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "workplace11:beat_v2:b:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "interject_allow",
      "line": "제 이름이 빠진 문서를 본 순간 저는 이미 지워진 사람처럼 느꼈습니다. 그 감정이 뒤에 한 선택들을 더 나쁘게 만들었어요.",
      "behaviorHint": "상처를 눌러 말하다가 마지막에만 미세하게 흔들린다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "opening"
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
          "workplace-11:b:d-1:evidence:1"
        ],
        "forbidAtomIds": [
          "workplace-11:b:d-1:emotion:4"
        ]
      },
      "weight": 5,
      "priority": 25,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-1:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 1,
      "setFlags": [],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "workplace11:beat_v2:a:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "interject_block",
      "line": "저 혼자 꾸민 일처럼 남는 건 두렵습니다. 서로 위험한 합리화를 붙잡고 있었다는 점은 같이 보셔야 합니다.",
      "behaviorHint": "말이 잘린 뒤에도 공범 의식을 부정하지 못한 채 버틴다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "opening"
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
          "workplace-11:a:d-5:context:1"
        ],
        "forbidAtomIds": [
          "workplace-11:a:d-5:emotion:4"
        ]
      },
      "weight": 5,
      "priority": 23,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-5:surface:mid:interjection:emotional_only:block",
      "variantTarget": 1,
      "setFlags": [],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "workplace11:beat_v2:b:d-5:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "interject_block",
      "line": "제가 먼저 지워졌다고 느낀 건 사실입니다. 그렇다고 그 감정을 공모의 변명으로 끝까지 쓸 수는 없다는 것도 압니다.",
      "behaviorHint": "분노와 체념이 한 문장 안에서 겹친다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "opening"
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
          "workplace-11:b:d-5:context:1"
        ],
        "forbidAtomIds": [
          "workplace-11:b:d-5:emotion:4"
        ]
      },
      "weight": 5,
      "priority": 23,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-5:surface:mid:interjection:emotional_only:block",
      "variantTarget": 1,
      "setFlags": [],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "workplace11:beat_v2:a:d-4:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "interject_allow",
      "line": "포렌식 전에 메모가 들어간 건 맞습니다. 다만 그 시점엔 발표 권한과 보안 리스크를 같은 관리 선상에서 보려 했습니다.",
      "behaviorHint": "인사 조치와 보안 명분을 하나씩 분해해 말한다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "identity",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "frayed"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "opening"
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
          "workplace-11:a:d-4:context:1"
        ],
        "forbidAtomIds": [
          "workplace-11:a:d-4:emotion:4"
        ]
      },
      "weight": 4,
      "priority": 25,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-4:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 1,
      "setFlags": [],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "workplace11:beat_v2:b:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject_allow",
      "line": "정리본이라고 불렀지만 첨부 안에 청구항과 실험 요약이 함께 있었습니다. 범위를 줄여 말한 제 책임도 분리하긴 어렵습니다.",
      "behaviorHint": "디테일을 짚으면서도 스스로의 축소 진술을 인정한다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "identity",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "frayed"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "opening"
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
          "workplace-11:b:d-2:context:1"
        ],
        "forbidAtomIds": [
          "workplace-11:b:d-2:emotion:4"
        ]
      },
      "weight": 4,
      "priority": 25,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-2:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 1,
      "setFlags": [],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "workplace11:beat_v2:a:d-4:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "interject_block",
      "line": "위험 메모, 발표 제외, 브리핑 정리 시각을 같이 보십시오. 그 셋이 따로 움직인 게 아니라는 지적은 피하기 어렵습니다.",
      "behaviorHint": "끊긴 직후에도 시각과 조치를 연속으로 못 박는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "sub_truth",
      "responseIntent": "pressure_response",
      "angleTag": "identity",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "frayed"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "opening"
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
          "workplace-11:a:d-4:context:1"
        ],
        "forbidAtomIds": [
          "workplace-11:a:d-4:emotion:4"
        ]
      },
      "weight": 4,
      "priority": 23,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-4:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 1,
      "setFlags": [],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "workplace11:beat_v2:b:d-2:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject_block",
      "line": "개인메일, 텔레그램, ZIP 범위를 한 줄로 줄이지 마세요. 어떤 파일이 갔는지, 대가를 어떻게 불렀는지까지 같이 봐야 합니다.",
      "behaviorHint": "세부 항목을 빠르게 던지며 범위를 감추지 못한 표정이 섞인다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
      "angleTag": "identity",
      "actionFamily": "interjection",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "frayed"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "opening"
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
          "workplace-11:b:d-2:context:1"
        ],
        "forbidAtomIds": [
          "workplace-11:b:d-2:emotion:4"
        ]
      },
      "weight": 4,
      "priority": 23,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-2:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 1,
      "setFlags": [],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "workplace11:beat_v2:a:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject_allow",
      "line": "저는 브로커 한 건으로 끝날 거라 믿는 쪽에 기대고 있었습니다. 그 믿음이 잘린 DLP 캡처를 더 유용한 자료처럼 보이게 했습니다.",
      "behaviorHint": "자기 오해가 전략과 섞였음을 불편하게 인정한다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "opening"
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
          "M1"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-11:a:d-3:evidence:1"
        ],
        "forbidAtomIds": [
          "workplace-11:a:d-3:admission:5"
        ]
      },
      "weight": 5,
      "priority": 25,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 1,
      "setFlags": [],
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
      "id": "workplace11:beat_v2:b:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject_allow",
      "line": "브로커만 보면 끝날 일이라고 생각했습니다. 재공유 링크 하나가 이렇게 멀리 갈 수 있다는 감각 자체가 없었습니다.",
      "behaviorHint": "자기 판단의 좁은 범위를 뒤늦게 되새긴다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "opening"
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
          "M1"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "workplace-11:b:d-3:evidence:1"
        ],
        "forbidAtomIds": [
          "workplace-11:b:d-3:emotion:4"
        ]
      },
      "weight": 5,
      "priority": 25,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 1,
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
      "id": "workplace11:beat_v2:a:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject_block",
      "line": "원본 로그를 보고도 처음엔 “그래도 시작은 서린 쪽 아니냐”는 생각을 버리지 못했습니다. 그게 제 오해의 마지막 저항이었습니다.",
      "behaviorHint": "자르려는 흐름 속에서도 잘못된 확신이 남아 있다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "opening"
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
          "workplace-11:a:d-3:evidence:1"
        ],
        "forbidAtomIds": [
          "workplace-11:a:d-3:admission:5"
        ]
      },
      "weight": 5,
      "priority": 23,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 1,
      "setFlags": [],
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
      "id": "workplace11:beat_v2:b:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "workplace-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject_block",
      "line": "브로커 한 건이면 설명이 끝난다고 믿었기에 링크 설정을 끝까지 보지 않았습니다. 그 안일함이 너무 컸습니다.",
      "behaviorHint": "짧은 반박 안에 뒤늦은 깨달음이 배어든다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "opening"
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
          "workplace-11:b:d-3:evidence:1"
        ],
        "forbidAtomIds": [
          "workplace-11:b:d-3:emotion:4"
        ]
      },
      "weight": 5,
      "priority": 23,
      "cooldownTurns": 1,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 1,
      "setFlags": [],
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

export default workplace11BeatsV2Full;
