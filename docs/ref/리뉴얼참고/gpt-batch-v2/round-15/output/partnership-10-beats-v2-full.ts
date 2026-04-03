export const partnership10BeatsV2Full = {
  "caseId": "partnership-10",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": {
    "totalBeats": 58,
    "byActionFamily": {
      "question": 26,
      "evidence": 8,
      "fatigue": 6,
      "free_question": 6,
      "interjection": 12
    },
    "byIssueRole": {
      "core_truth": 38,
      "shared_misconception": 12,
      "sub_truth": 8
    },
    "byParty": {
      "a": 29,
      "b": 29
    },
    "byDispute": {
      "d-1": 19,
      "d-2": 19,
      "d-3": 12,
      "d-4": 4,
      "d-5": 4
    },
    "stageCoverage": {
      "early": 16,
      "mid": 30,
      "late": 12
    },
    "interjectionInfoLevels": {
      "emotional_only": 4,
      "detail_rebuttal": 4,
      "misbelief_escalation": 4
    },
    "requiredMatrixNotes": [
      "early question timeline / identity / context covered on core disputes",
      "mid question responsibility / motive covered on core disputes",
      "late question emotion covered on core disputes",
      "evidence response context / legality covered on core and sub disputes",
      "fatigue 3 variants included on each core dispute",
      "free_question late motive / emotion included",
      "shared misconception trap beats cover M0~M4",
      "interjection emotional_only / detail_rebuttal / misbelief_escalation distribution satisfied"
    ]
  },
  "beats": [
    {
      "id": "partnership10:beat_v2:a:d-1:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "민서에게 보낸 건 최종 채용 확정이 아니라 주말 공백을 메우기 위한 체험근무 안내였다. 순서를 보면 그걸 바로 확정이라고 부를 단계는 아니었습니다.",
      "behaviorHint": "일정과 숫자부터 꺼내며 감정을 잘라낸다.",
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
          "guarded",
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
          "partnership-10:a:d-1:denial:0"
        ],
        "forbidAtomIds": [
          "partnership-10:a:d-1:emotion:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:timeline",
      "coverageKey": "a:d-1:surface:early:pressure:timeline",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership10:beat_v2:a:d-1:surface:pressure:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "그날은 승인선을 넘으려던 게 아니라 '이번 주부터 한번 같이 돌아보자'는 말을 체험 시작 신호로 받아들여 먼저 준비를 걸어둔 수준이었다. 그 시점만 떼면 독단처럼 보이지만, 흐름 전체는 달랐습니다.",
      "behaviorHint": "일정과 숫자부터 꺼내며 감정을 잘라낸다.",
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
          "guarded",
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
          "partnership-10:a:d-1:denial:0"
        ],
        "forbidAtomIds": [
          "partnership-10:a:d-1:emotion:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:timeline",
      "coverageKey": "a:d-1:surface:early:pressure:timeline",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership10:beat_v2:a:d-1:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "민서에게 보낸 건 최종 채용 확정이 아니라 주말 공백을 메우기 위한 체험근무 안내였다. 처음부터 저를 가해자로 고정해 읽을 일은 아닙니다.",
      "behaviorHint": "일정과 숫자부터 꺼내며 감정을 잘라낸다.",
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
          "guarded",
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
          "partnership-10:a:d-1:denial:0"
        ],
        "forbidAtomIds": [
          "partnership-10:a:d-1:emotion:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:identity",
      "coverageKey": "a:d-1:surface:early:pressure:identity",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:identity_checked"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership10:beat_v2:a:d-1:surface:pressure:identity:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "그날은 승인선을 넘으려던 게 아니라 '이번 주부터 한번 같이 돌아보자'는 말을 체험 시작 신호로 받아들여 먼저 준비를 걸어둔 수준이었다. 누가 먼저 선을 넘었다는 인상만으로 저를 못 박을 수는 없습니다.",
      "behaviorHint": "일정과 숫자부터 꺼내며 감정을 잘라낸다.",
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
          "guarded",
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
          "partnership-10:a:d-1:denial:0"
        ],
        "forbidAtomIds": [
          "partnership-10:a:d-1:emotion:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:identity",
      "coverageKey": "a:d-1:surface:early:pressure:identity",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:identity_checked"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership10:beat_v2:a:d-1:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "민서에게 보낸 건 최종 채용 확정이 아니라 주말 공백을 메우기 위한 체험근무 안내였다. 그 앞뒤 사정을 빼면 의도가 완전히 달라 보입니다.",
      "behaviorHint": "일정과 숫자부터 꺼내며 감정을 잘라낸다.",
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
          "guarded",
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
          "partnership-10:a:d-1:denial:0"
        ],
        "forbidAtomIds": [
          "partnership-10:a:d-1:emotion:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:context",
      "coverageKey": "a:d-1:surface:early:pressure:context",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:context_checked"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership10:beat_v2:a:d-1:surface:pressure:context:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "그날은 승인선을 넘으려던 게 아니라 '이번 주부터 한번 같이 돌아보자'는 말을 체험 시작 신호로 받아들여 먼저 준비를 걸어둔 수준이었다. 맥락을 같이 보면 그건 단순한 은폐나 독단으로만 남지 않습니다.",
      "behaviorHint": "일정과 숫자부터 꺼내며 감정을 잘라낸다.",
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
          "guarded",
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
          "partnership-10:a:d-1:denial:0"
        ],
        "forbidAtomIds": [
          "partnership-10:a:d-1:emotion:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:pressure:context",
      "coverageKey": "a:d-1:surface:early:pressure:context",
      "variantTarget": 2,
      "setFlags": [
        "d-1:surface:context_checked"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership10:beat_v2:a:d-1:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "정식 오퍼 형식의 메일이 나간 건 맞다. 다만 제 기준에선 체험근무를 먼저 굴리기 위한 임시 세팅이었다. 제 책임을 묻더라도 구조 전체를 같이 봐야 합니다.",
      "behaviorHint": "일정과 숫자부터 꺼내며 감정을 잘라낸다.",
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
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:a:d-1:admission:0"
        ],
        "forbidAtomIds": [
          "partnership-10:a:d-1:admission:1"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:pressure:responsibility",
      "coverageKey": "a:d-1:motive:mid:pressure:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-1:motive:responsibility_named"
      ],
      "tags": [
        "warm"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ]
    },
    {
      "id": "partnership10:beat_v2:a:d-1:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "counter",
      "line": "급여표와 공동 final message가 비어 있었던 건 제 실수지만, 혜린 씨의 표현이 최종 승인처럼 들린 것도 사실이었다. 왜 그렇게 밀어붙였는지까지 보면 얘기가 달라집니다.",
      "behaviorHint": "일정과 숫자부터 꺼내며 감정을 잘라낸다.",
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
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:a:d-1:self_justification:1"
        ],
        "forbidAtomIds": [
          "partnership-10:a:d-1:admission:1"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:motive:motive",
      "coverageKey": "a:d-1:motive:mid:motive:motive",
      "variantTarget": 1,
      "setFlags": [
        "d-1:motive:motive_named"
      ],
      "tags": [
        "warm"
      ],
      "requiresFlags": [
        "d-1:surface:context_checked"
      ]
    },
    {
      "id": "partnership10:beat_v2:a:d-1:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "admit",
      "line": "후보자 이탈이 무서워서 승인 확인을 건너뛰었다. 그걸 일정 문제처럼 축소해 설명한 건 제 방어였다. 결국 그때 저를 움직인 건 두려움과 상처였습니다.",
      "behaviorHint": "일정과 숫자부터 꺼내며 감정을 잘라낸다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:a:d-1:emotion:0"
        ],
        "forbidAtomIds": [
          "partnership-10:a:d-1:denial:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:rapport:emotion",
      "coverageKey": "a:d-1:core:late:rapport:emotion",
      "variantTarget": 1,
      "setFlags": [
        "d-1:core:emotion_opened"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-1:motive:motive_named"
      ]
    },
    {
      "id": "partnership10:beat_v2:a:d-1:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "원본을 같이 놓고 보면 정식 오퍼 형식의 메일이 나간 건 맞다. 다만 제 기준에선 체험근무를 먼저 굴리기 위한 임시 세팅이었다.",
      "behaviorHint": "자료 명칭을 확인한 뒤, 계산된 문장으로 책임 범위를 좁힌다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
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
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:a:d-1:self_justification:1"
        ],
        "forbidAtomIds": [
          "partnership-10:a:d-1:admission:1"
        ]
      },
      "weight": 6,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:evidence:context",
      "coverageKey": "a:d-1:motive:mid:evidence:context",
      "variantTarget": 1,
      "setFlags": [
        "d-1:surface:evidence_seen"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-1:surface:context_checked"
      ]
    },
    {
      "id": "partnership10:beat_v2:a:d-1:motive:evidence:legality:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "문서 기준으로 보면 급여표와 공동 final message가 비어 있었던 건 제 실수지만, 혜린 씨의 표현이 최종 승인처럼 들린 것도 사실이었다.",
      "behaviorHint": "자료 명칭을 확인한 뒤, 계산된 문장으로 책임 범위를 좁힌다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:a:d-1:admission:0"
        ],
        "forbidAtomIds": [
          "partnership-10:a:d-1:admission:1"
        ]
      },
      "weight": 6,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:evidence:legality",
      "coverageKey": "a:d-1:motive:mid:evidence:legality",
      "variantTarget": 1,
      "setFlags": [
        "d-1:motive:record_locked"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-1:surface:identity_checked"
      ]
    },
    {
      "id": "partnership10:beat_v2:a:d-1:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "irritated",
      "line": "같은 질문을 반복해도 답이 달라지진 않습니다. 정식 오퍼 형식의 메일이 나간 건 맞다. 다만 제 기준에선 체험근무를 먼저 굴리기 위한 임시 세팅이었다.",
      "behaviorHint": "목소리가 딱딱해지고 순서를 숫자로 반복한다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:a:d-1:admission:0"
        ],
        "forbidAtomIds": [
          "partnership-10:a:d-1:admission:1"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:fatigue:timeline",
      "coverageKey": "a:d-1:surface:mid:fatigue:timeline",
      "variantTarget": 1,
      "setFlags": [
        "d-1:surface:fatigue_warned"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-1:surface:timeline_pressed"
      ]
    },
    {
      "id": "partnership10:beat_v2:a:d-1:surface:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "block",
      "line": "그 순서를 몇 번 더 묻더라도 지금 답은 같습니다. 급여표와 공동 final message가 비어 있었던 건 제 실수지만, 혜린 씨의 표현이 최종 승인처럼 들린 것도 사실이었다.",
      "behaviorHint": "목소리가 딱딱해지고 순서를 숫자로 반복한다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:a:d-1:admission:0"
        ],
        "forbidAtomIds": [
          "partnership-10:a:d-1:admission:1"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:surface:fatigue:responsibility",
      "coverageKey": "a:d-1:surface:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-1:surface:fatigue_blocked"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-1:surface:fatigue_warned"
      ]
    },
    {
      "id": "partnership10:beat_v2:a:d-1:motive:fatigue:responsibility:03",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "retaliate",
      "line": "계속 몰아붙이면 저도 숨기던 방어를 접겠습니다. 후보자 이탈이 무서워서 승인 확인을 건너뛰었다. 그걸 일정 문제처럼 축소해 설명한 건 제 방어였다.",
      "behaviorHint": "목소리가 딱딱해지고 순서를 숫자로 반복한다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:a:d-1:admission:0"
        ],
        "forbidAtomIds": [
          "partnership-10:a:d-1:admission:1"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:motive:fatigue:responsibility",
      "coverageKey": "a:d-1:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-1:motive:fatigue_retaliation"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-1:surface:fatigue_blocked"
      ]
    },
    {
      "id": "partnership10:beat_v2:a:d-1:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confess",
      "line": "돌려 말하지 않겠습니다. 최종 공동 승인 없이 정식 오퍼와 온보딩 서류를 먼저 보낸 건 제 잘못이다. 체험근무라는 말로 이름을 바꿔도 절차 위반은 남는다.",
      "behaviorHint": "한 템포 쉬고 방어를 내려놓지만 끝까지 구조로 설명한다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:a:d-1:fear:0"
        ],
        "forbidAtomIds": [
          "partnership-10:a:d-1:denial:0"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-1:core:motive:motive",
      "coverageKey": "a:d-1:core:late:motive:motive",
      "variantTarget": 1,
      "setFlags": [
        "d-1:core:free_opened"
      ],
      "tags": [
        "late",
        "free_question"
      ],
      "requiresFlags": [
        "d-1:core:emotion_opened"
      ]
    },
    {
      "id": "partnership10:beat_v2:b:d-2:surface:pressure:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "저는 사고를 막으려고 멈춘 겁니다. 없던 사실을 퍼뜨리려던 게 아닙니다. 순서를 보면 그걸 바로 확정이라고 부를 단계는 아니었습니다.",
      "behaviorHint": "결론 문장을 먼저 던지고 상대를 압박한다.",
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
          "guarded",
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
          "partnership-10:b:d-2:self_justification:0"
        ],
        "forbidAtomIds": [
          "partnership-10:b:d-2:emotion:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:timeline",
      "coverageKey": "b:d-2:surface:early:pressure:timeline",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership10:beat_v2:b:d-2:surface:pressure:timeline:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "오퍼 메일 한 시간 뒤에라도 제가 보류를 안 걸었으면 현장에 바로 이름이 굳었을 겁니다. 그때는 수습이 먼저였어요. 그 시점만 떼면 독단처럼 보이지만, 흐름 전체는 달랐습니다.",
      "behaviorHint": "결론 문장을 먼저 던지고 상대를 압박한다.",
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
          "guarded",
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
          "partnership-10:b:d-2:self_justification:0"
        ],
        "forbidAtomIds": [
          "partnership-10:b:d-2:emotion:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:timeline",
      "coverageKey": "b:d-2:surface:early:pressure:timeline",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:timeline_pressed"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership10:beat_v2:b:d-2:surface:pressure:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "저는 사고를 막으려고 멈춘 겁니다. 없던 사실을 퍼뜨리려던 게 아닙니다. 처음부터 저를 가해자로 고정해 읽을 일은 아닙니다.",
      "behaviorHint": "결론 문장을 먼저 던지고 상대를 압박한다.",
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
          "guarded",
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
          "partnership-10:b:d-2:denial:0"
        ],
        "forbidAtomIds": [
          "partnership-10:b:d-2:emotion:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:identity",
      "coverageKey": "b:d-2:surface:early:pressure:identity",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:identity_checked"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership10:beat_v2:b:d-2:surface:pressure:identity:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "오퍼 메일 한 시간 뒤에라도 제가 보류를 안 걸었으면 현장에 바로 이름이 굳었을 겁니다. 그때는 수습이 먼저였어요. 누가 먼저 선을 넘었다는 인상만으로 저를 못 박을 수는 없습니다.",
      "behaviorHint": "결론 문장을 먼저 던지고 상대를 압박한다.",
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
          "guarded",
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
          "partnership-10:b:d-2:denial:0"
        ],
        "forbidAtomIds": [
          "partnership-10:b:d-2:emotion:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:identity",
      "coverageKey": "b:d-2:surface:early:pressure:identity",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:identity_checked"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership10:beat_v2:b:d-2:surface:pressure:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "저는 사고를 막으려고 멈춘 겁니다. 없던 사실을 퍼뜨리려던 게 아닙니다. 그 앞뒤 사정을 빼면 의도가 완전히 달라 보입니다.",
      "behaviorHint": "결론 문장을 먼저 던지고 상대를 압박한다.",
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
          "guarded",
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
          "partnership-10:b:d-2:self_justification:0"
        ],
        "forbidAtomIds": [
          "partnership-10:b:d-2:emotion:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:context",
      "coverageKey": "b:d-2:surface:early:pressure:context",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:context_checked"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership10:beat_v2:b:d-2:surface:pressure:context:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "오퍼 메일 한 시간 뒤에라도 제가 보류를 안 걸었으면 현장에 바로 이름이 굳었을 겁니다. 그때는 수습이 먼저였어요. 맥락을 같이 보면 그건 단순한 은폐나 독단으로만 남지 않습니다.",
      "behaviorHint": "결론 문장을 먼저 던지고 상대를 압박한다.",
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
          "guarded",
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
          "partnership-10:b:d-2:self_justification:0"
        ],
        "forbidAtomIds": [
          "partnership-10:b:d-2:emotion:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:pressure:context",
      "coverageKey": "b:d-2:surface:early:pressure:context",
      "variantTarget": 2,
      "setFlags": [
        "d-2:surface:context_checked"
      ],
      "tags": [
        "hot"
      ]
    },
    {
      "id": "partnership10:beat_v2:b:d-2:motive:pressure:responsibility:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "민서 씨와 직원들에게 '아직 채용 확정 아님'이라고 먼저 알린 건 맞습니다. 하지만 그 직전에 준서 씨가 정식 오퍼처럼 보이는 걸 이미 보내 놓은 상태였습니다. 제 책임을 묻더라도 구조 전체를 같이 봐야 합니다.",
      "behaviorHint": "결론 문장을 먼저 던지고 상대를 압박한다.",
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
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:b:d-2:admission:0"
        ],
        "forbidAtomIds": [
          "partnership-10:b:d-2:admission:1"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:pressure:responsibility",
      "coverageKey": "b:d-2:motive:mid:pressure:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-2:motive:responsibility_named"
      ],
      "tags": [
        "warm"
      ],
      "requiresFlags": [
        "d-2:surface:timeline_pressed"
      ]
    },
    {
      "id": "partnership10:beat_v2:b:d-2:motive:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "counter",
      "line": "품질 걱정이 있었다고 해도 저는 재확인 없이 보류 통보와 내부 공지를 먼저 돌렸습니다. 그 과정에서 준서가 몰래 사람을 앉히려 했다는 취지까지 실어 보낸 건 제 과장이었습니다. 왜 그렇게 밀어붙였는지까지 보면 얘기가 달라집니다.",
      "behaviorHint": "결론 문장을 먼저 던지고 상대를 압박한다.",
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
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:b:d-2:admission:0"
        ],
        "forbidAtomIds": [
          "partnership-10:b:d-2:admission:1"
        ]
      },
      "weight": 6,
      "priority": 29,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:motive:motive",
      "coverageKey": "b:d-2:motive:mid:motive:motive",
      "variantTarget": 1,
      "setFlags": [
        "d-2:motive:motive_named"
      ],
      "tags": [
        "warm"
      ],
      "requiresFlags": [
        "d-2:surface:context_checked"
      ]
    },
    {
      "id": "partnership10:beat_v2:b:d-2:core:rapport:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "admit",
      "line": "사실 저는 멈추려던 것보다 먼저 단정하려던 쪽에 가까웠습니다. 제 영역이 무시됐다는 감정이 들어서 의심을 확인 전에 퍼뜨렸습니다. 결국 그때 저를 움직인 건 두려움과 상처였습니다.",
      "behaviorHint": "결론 문장을 먼저 던지고 상대를 압박한다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:b:d-2:emotion:0"
        ],
        "forbidAtomIds": [
          "partnership-10:b:d-2:denial:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:core:rapport:emotion",
      "coverageKey": "b:d-2:core:late:rapport:emotion",
      "variantTarget": 1,
      "setFlags": [
        "d-2:core:emotion_opened"
      ],
      "tags": [
        "late"
      ],
      "requiresFlags": [
        "d-2:motive:motive_named"
      ]
    },
    {
      "id": "partnership10:beat_v2:b:d-2:motive:evidence:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "원본을 같이 놓고 보면 민서 씨와 직원들에게 '아직 채용 확정 아님'이라고 먼저 알린 건 맞습니다. 하지만 그 직전에 준서 씨가 정식 오퍼처럼 보이는 걸 이미 보내 놓은 상태였습니다.",
      "behaviorHint": "증거 한 줄을 크게 확대해 의도를 묻는다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
      ],
      "layer": "motive",
      "issueRole": "core_truth",
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
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:b:d-2:admission:0"
        ],
        "forbidAtomIds": [
          "partnership-10:b:d-2:admission:1"
        ]
      },
      "weight": 6,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:evidence:context",
      "coverageKey": "b:d-2:motive:mid:evidence:context",
      "variantTarget": 1,
      "setFlags": [
        "d-2:surface:evidence_seen"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-2:surface:context_checked"
      ]
    },
    {
      "id": "partnership10:beat_v2:b:d-2:motive:evidence:legality:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "문서 기준으로 보면 품질 걱정이 있었다고 해도 저는 재확인 없이 보류 통보와 내부 공지를 먼저 돌렸습니다. 그 과정에서 준서가 몰래 사람을 앉히려 했다는 취지까지 실어 보낸 건 제 과장이었습니다.",
      "behaviorHint": "증거 한 줄을 크게 확대해 의도를 묻는다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:b:d-2:admission:0"
        ],
        "forbidAtomIds": [
          "partnership-10:b:d-2:admission:1"
        ]
      },
      "weight": 6,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:evidence:legality",
      "coverageKey": "b:d-2:motive:mid:evidence:legality",
      "variantTarget": 1,
      "setFlags": [
        "d-2:motive:record_locked"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-2:surface:identity_checked"
      ]
    },
    {
      "id": "partnership10:beat_v2:b:d-2:surface:fatigue:timeline:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "irritated",
      "line": "같은 질문을 반복해도 답이 달라지진 않습니다. 민서 씨와 직원들에게 '아직 채용 확정 아님'이라고 먼저 알린 건 맞습니다. 하지만 그 직전에 준서 씨가 정식 오퍼처럼 보이는 걸 이미 보내 놓은 상태였습니다.",
      "behaviorHint": "반복 질문에 표정이 굳고 같은 결론을 더 세게 되풀이한다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:b:d-2:admission:0"
        ],
        "forbidAtomIds": [
          "partnership-10:b:d-2:admission:1"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:fatigue:timeline",
      "coverageKey": "b:d-2:surface:mid:fatigue:timeline",
      "variantTarget": 1,
      "setFlags": [
        "d-2:surface:fatigue_warned"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-2:surface:timeline_pressed"
      ]
    },
    {
      "id": "partnership10:beat_v2:b:d-2:surface:fatigue:responsibility:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "block",
      "line": "그 순서를 몇 번 더 묻더라도 지금 답은 같습니다. 품질 걱정이 있었다고 해도 저는 재확인 없이 보류 통보와 내부 공지를 먼저 돌렸습니다. 그 과정에서 준서가 몰래 사람을 앉히려 했다는 취지까지 실어 보낸 건 제 과장이었습니다.",
      "behaviorHint": "반복 질문에 표정이 굳고 같은 결론을 더 세게 되풀이한다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:b:d-2:admission:0"
        ],
        "forbidAtomIds": [
          "partnership-10:b:d-2:admission:1"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:surface:fatigue:responsibility",
      "coverageKey": "b:d-2:surface:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-2:surface:fatigue_blocked"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-2:surface:fatigue_warned"
      ]
    },
    {
      "id": "partnership10:beat_v2:b:d-2:motive:fatigue:responsibility:03",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "retaliate",
      "line": "계속 몰아붙이면 저도 숨기던 방어를 접겠습니다. 사실 저는 멈추려던 것보다 먼저 단정하려던 쪽에 가까웠습니다. 제 영역이 무시됐다는 감정이 들어서 의심을 확인 전에 퍼뜨렸습니다.",
      "behaviorHint": "반복 질문에 표정이 굳고 같은 결론을 더 세게 되풀이한다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:b:d-2:admission:0"
        ],
        "forbidAtomIds": [
          "partnership-10:b:d-2:admission:1"
        ]
      },
      "weight": 4,
      "priority": 22,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:motive:fatigue:responsibility",
      "coverageKey": "b:d-2:motive:mid:fatigue:responsibility",
      "variantTarget": 1,
      "setFlags": [
        "d-2:motive:fatigue_retaliation"
      ],
      "tags": [
        "fatigue"
      ],
      "requiresFlags": [
        "d-2:surface:fatigue_blocked"
      ]
    },
    {
      "id": "partnership10:beat_v2:b:d-2:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confess",
      "line": "돌려 말하지 않겠습니다. 재확인 없이 후보자와 직원들에게 보류를 먼저 알리고, 준서 씨 의도를 사실처럼 퍼뜨린 건 제 잘못입니다. 품질 우려가 있어도 그렇게 처리하면 안 됐습니다.",
      "behaviorHint": "감정이 먼저 올라오고 나서야 사실을 꺼낸다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:b:d-2:emotion:0"
        ],
        "forbidAtomIds": [
          "partnership-10:b:d-2:denial:0"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-2:core:motive:motive",
      "coverageKey": "b:d-2:core:late:motive:motive",
      "variantTarget": 1,
      "setFlags": [
        "d-2:core:free_opened"
      ],
      "tags": [
        "late",
        "free_question"
      ],
      "requiresFlags": [
        "d-2:core:emotion_opened"
      ]
    },
    {
      "id": "partnership10:beat_v2:a:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "저는 혜린 씨를 속여 사람을 몰래 앉히려 한 적 없습니다. 그때는 그렇게 읽을 수밖에 없었습니다.",
      "behaviorHint": "일정과 숫자부터 꺼내며 감정을 잘라낸다.",
      "applicableStates": [
        "M0",
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
          "guarded",
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
          "M1"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:a:d-3:denial:0"
        ],
        "forbidAtomIds": [
          "partnership-10:a:d-3:fear:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:identity",
      "coverageKey": "a:d-3:surface:early:trap:identity",
      "variantTarget": 1,
      "setFlags": [
        "d-3:surface:trap_seen"
      ],
      "tags": [
        "trap",
        "red_herring",
        "hot"
      ]
    },
    {
      "id": "partnership10:beat_v2:a:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "크롭된 캡처만 보면 제가 승인 문장을 떼어먹은 사람처럼 보일 수 있다. 그런데 원본엔 '트라이얼로'가 있었고, 민서 씨도 3일 가능 시간표만 보냈다. 핵심은 그 한 장만으로는 전체 경로를 못 확정한다는 점입니다.",
      "behaviorHint": "일정과 숫자부터 꺼내며 감정을 잘라낸다.",
      "applicableStates": [
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
          "guarded",
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
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:a:d-3:timeline:0"
        ],
        "forbidAtomIds": [
          "partnership-10:a:d-3:fear:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:surface:trap:context",
      "coverageKey": "a:d-3:surface:early:trap:context",
      "variantTarget": 1,
      "setFlags": [
        "d-3:surface:misbelief_named"
      ],
      "tags": [
        "trap",
        "red_herring",
        "hot"
      ]
    },
    {
      "id": "partnership10:beat_v2:a:d-3:motive:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "상대가 저를 배신자로 본 이유는 이해합니다. 다만 그 오해는 제 은폐보다 모호한 승인 표현과 시스템 문구가 겹쳐 생긴 쪽에 가깝습니다. 원문과 경로가 보이니 제 확신도 흔들리기 시작합니다.",
      "behaviorHint": "일정과 숫자부터 꺼내며 감정을 잘라낸다.",
      "applicableStates": [
        "M3"
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
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "spent"
        ],
        "misconceptionStates": [
          "M3"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:a:d-3:counter:0"
        ],
        "forbidAtomIds": [
          "partnership-10:a:d-3:denial:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:motive:trap:context",
      "coverageKey": "a:d-3:motive:late:trap:context",
      "variantTarget": 1,
      "setFlags": [
        "d-3:surface:misbelief_shaken"
      ],
      "tags": [
        "trap",
        "red_herring",
        "late"
      ],
      "requiresFlags": [
        "d-3:surface:misbelief_named"
      ]
    },
    {
      "id": "partnership10:beat_v2:a:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confess",
      "line": "계획적인 독단 채용은 아니었지만, 제가 확인 없이 승인으로 해석해 움직인 탓에 속인 것처럼 보이게 만든 책임은 인정합니다. 오해를 붙들고 있던 제 감정도 인정합니다.",
      "behaviorHint": "일정과 숫자부터 꺼내며 감정을 잘라낸다.",
      "applicableStates": [
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
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "spent"
        ],
        "misconceptionStates": [
          "M4"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:a:d-3:admission:0"
        ],
        "forbidAtomIds": [
          "partnership-10:a:d-3:denial:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-3:core:trap:emotion",
      "coverageKey": "a:d-3:core:late:trap:emotion",
      "variantTarget": 1,
      "setFlags": [
        "d-3:core:truth_window_open"
      ],
      "tags": [
        "trap",
        "red_herring",
        "late"
      ],
      "requiresFlags": [
        "d-3:surface:misbelief_shaken"
      ]
    },
    {
      "id": "partnership10:beat_v2:b:d-3:surface:trap:identity:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "그때 제 눈엔 준서 씨가 저를 건너뛰고 사람을 넣은 걸로 보였습니다. 그때는 그렇게 읽을 수밖에 없었습니다.",
      "behaviorHint": "결론 문장을 먼저 던지고 상대를 압박한다.",
      "applicableStates": [
        "M0",
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
          "guarded",
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
          "M1"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:b:d-3:identity:0"
        ],
        "forbidAtomIds": [
          "partnership-10:b:d-3:fear:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:identity",
      "coverageKey": "b:d-3:surface:early:trap:identity",
      "variantTarget": 1,
      "setFlags": [
        "d-3:surface:trap_seen"
      ],
      "tags": [
        "trap",
        "red_herring",
        "hot"
      ]
    },
    {
      "id": "partnership10:beat_v2:b:d-3:surface:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "크롭된 캡처만 보면 제가 그렇게 믿은 이유는 설명됩니다. 하지만 원본을 보니 '트라이얼로'가 붙어 있었고, 민서 씨도 3일 가능한 시간만 보냈더군요. 핵심은 그 한 장만으로는 전체 경로를 못 확정한다는 점입니다.",
      "behaviorHint": "결론 문장을 먼저 던지고 상대를 압박한다.",
      "applicableStates": [
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
          "guarded",
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
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:b:d-3:evidence:1"
        ],
        "forbidAtomIds": [
          "partnership-10:b:d-3:fear:0"
        ]
      },
      "weight": 7,
      "priority": 32,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:surface:trap:context",
      "coverageKey": "b:d-3:surface:early:trap:context",
      "variantTarget": 1,
      "setFlags": [
        "d-3:surface:misbelief_named"
      ],
      "tags": [
        "trap",
        "red_herring",
        "hot"
      ]
    },
    {
      "id": "partnership10:beat_v2:b:d-3:motive:trap:context:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "저는 그 장면을 독단 채용 증거처럼 확대해 읽었습니다. 실제로는 모호한 trial 표현과 제 경계심이 합쳐져 그렇게 보이게 만든 면이 있었습니다. 원문과 경로가 보이니 제 확신도 흔들리기 시작합니다.",
      "behaviorHint": "결론 문장을 먼저 던지고 상대를 압박한다.",
      "applicableStates": [
        "M3"
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
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "spent"
        ],
        "misconceptionStates": [
          "M3"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:b:d-3:legacy_sentence:0"
        ],
        "forbidAtomIds": [
          "partnership-10:b:d-3:identity:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:motive:trap:context",
      "coverageKey": "b:d-3:motive:late:trap:context",
      "variantTarget": 1,
      "setFlags": [
        "d-3:surface:misbelief_shaken"
      ],
      "tags": [
        "trap",
        "red_herring",
        "late"
      ],
      "requiresFlags": [
        "d-3:surface:misbelief_named"
      ]
    },
    {
      "id": "partnership10:beat_v2:b:d-3:core:trap:emotion:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confess",
      "line": "지금은 계획적인 독단 채용이었다고까지는 말할 수 없습니다. 승인 표현과 자동 일정, 그리고 제 과잉 해석이 겹친 오해였다고 보겠습니다. 오해를 붙들고 있던 제 감정도 인정합니다.",
      "behaviorHint": "결론 문장을 먼저 던지고 상대를 압박한다.",
      "applicableStates": [
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
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "spent"
        ],
        "misconceptionStates": [
          "M4"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:b:d-3:admission:0"
        ],
        "forbidAtomIds": [
          "partnership-10:b:d-3:identity:0"
        ]
      },
      "weight": 5,
      "priority": 24,
      "cooldownTurns": 3,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-3:core:trap:emotion",
      "coverageKey": "b:d-3:core:late:trap:emotion",
      "variantTarget": 1,
      "setFlags": [
        "d-3:core:truth_window_open"
      ],
      "tags": [
        "trap",
        "red_herring",
        "late"
      ],
      "requiresFlags": [
        "d-3:surface:misbelief_shaken"
      ]
    },
    {
      "id": "partnership10:beat_v2:a:d-4:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "문서를 같이 놓고 보면 체크리스트가 끝나기 전에 오퍼가 나간 건 제 위반이다. 다만 혜린 씨도 공동 메시지 대신 별도 보류를 먼저 보냈다.",
      "behaviorHint": "자료 명칭을 확인한 뒤, 계산된 문장으로 책임 범위를 좁힌다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:a:d-4:admission:0"
        ],
        "forbidAtomIds": [
          "partnership-10:a:d-4:admission:1"
        ]
      },
      "weight": 6,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:evidence:legality",
      "coverageKey": "a:d-4:motive:mid:evidence:legality",
      "variantTarget": 1,
      "setFlags": [
        "d-4:surface:record_seen"
      ],
      "tags": [
        "evidence"
      ]
    },
    {
      "id": "partnership10:beat_v2:a:d-4:motive:evidence:context:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "원본 흐름까지 보면 체험평가표, 급여 시트, 공동 final message 세 단계가 다 비어 있었는데도 제가 먼저 움직였다. 그 뒤 혜린 씨가 별도 공지를 올리면서 절차는 완전히 찢어졌다.",
      "behaviorHint": "자료 명칭을 확인한 뒤, 계산된 문장으로 책임 범위를 좁힌다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:a:d-4:admission:0"
        ],
        "forbidAtomIds": [
          "partnership-10:a:d-4:admission:1"
        ]
      },
      "weight": 6,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-4:motive:evidence:context",
      "coverageKey": "a:d-4:motive:mid:evidence:context",
      "variantTarget": 1,
      "setFlags": [
        "d-4:motive:context_locked"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-4:surface:record_seen"
      ]
    },
    {
      "id": "partnership10:beat_v2:b:d-4:motive:evidence:legality:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "문서를 같이 놓고 보면 준서 씨가 오퍼를 먼저 보낸 게 출발점이지만, 저도 공동 메시지 대신 별도 보류를 돌렸습니다.",
      "behaviorHint": "증거 한 줄을 크게 확대해 의도를 묻는다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:b:d-4:admission:0"
        ],
        "forbidAtomIds": [
          "partnership-10:b:d-4:admission:1"
        ]
      },
      "weight": 6,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:motive:evidence:legality",
      "coverageKey": "b:d-4:motive:mid:evidence:legality",
      "variantTarget": 1,
      "setFlags": [
        "d-4:surface:record_seen"
      ],
      "tags": [
        "evidence"
      ]
    },
    {
      "id": "partnership10:beat_v2:b:d-4:motive:evidence:context:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "원본 흐름까지 보면 체험평가표, 급여 시트, 공동 final message 셋 다 안 끝난 상태였는데 저는 내부 공지로, 준서 씨는 오퍼로 먼저 움직였습니다.",
      "behaviorHint": "증거 한 줄을 크게 확대해 의도를 묻는다.",
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
          "guarded",
          "agitated"
        ],
        "trustWindowBands": [
          "closed",
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:b:d-4:admission:0"
        ],
        "forbidAtomIds": [
          "partnership-10:b:d-4:admission:1"
        ]
      },
      "weight": 6,
      "priority": 31,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-4:motive:evidence:context",
      "coverageKey": "b:d-4:motive:mid:evidence:context",
      "variantTarget": 1,
      "setFlags": [
        "d-4:motive:context_locked"
      ],
      "tags": [
        "evidence"
      ],
      "requiresFlags": [
        "d-4:surface:record_seen"
      ]
    },
    {
      "id": "partnership10:beat_v2:a:d-5:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "돌려 말하지 않겠습니다. 저는 일정 알림이 뜬 걸 보고 마음속으로 '이제 되는구나' 쪽으로 기울었습니다. 공백 압박이 커서 시스템 문구를 제 편한 해석으로 붙잡았습니다.",
      "behaviorHint": "한 템포 쉬고 방어를 내려놓지만 끝까지 구조로 설명한다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "sub_truth",
      "responseIntent": "motive_response",
      "angleTag": "motive",
      "actionFamily": "free_question",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:a:d-5:fear:0"
        ],
        "forbidAtomIds": [
          "partnership-10:a:d-5:institution:0"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:motive:motive",
      "coverageKey": "a:d-5:core:late:motive:motive",
      "variantTarget": 1,
      "setFlags": [
        "d-5:surface:risk_seen"
      ],
      "tags": [
        "late",
        "free_question"
      ]
    },
    {
      "id": "partnership10:beat_v2:a:d-5:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confess",
      "line": "이제는 감정까지 포함해 말하겠습니다. 자동 캘린더 발송이 오해를 키운 건 사실이지만, 그 설정을 모른 채 온보딩 단계에 넣고 멈추지 않은 제 책임도 분명합니다.",
      "behaviorHint": "한 템포 쉬고 방어를 내려놓지만 끝까지 구조로 설명한다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:a:d-5:fear:0"
        ],
        "forbidAtomIds": [
          "partnership-10:a:d-5:institution:0"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "a:d-5:core:rapport:emotion",
      "coverageKey": "a:d-5:core:late:rapport:emotion",
      "variantTarget": 1,
      "setFlags": [
        "d-5:core:repair_named"
      ],
      "tags": [
        "late",
        "free_question"
      ],
      "requiresFlags": [
        "d-5:surface:risk_seen"
      ]
    },
    {
      "id": "partnership10:beat_v2:b:d-5:core:motive:motive:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "돌려 말하지 않겠습니다. 솔직히 저는 그 일정 제목을 보는 순간 확인할 생각보다 배신으로 이름 붙일 생각이 먼저 들었습니다. 제 승인권이 무시됐다는 공포가 컸습니다.",
      "behaviorHint": "감정이 먼저 올라오고 나서야 사실을 꺼낸다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "layer": "core",
      "issueRole": "sub_truth",
      "responseIntent": "motive_response",
      "angleTag": "motive",
      "actionFamily": "free_question",
      "questionTypes": [],
      "conditions": {
        "emotionTiers": [
          "agitated",
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:b:d-5:fear:0"
        ],
        "forbidAtomIds": [
          "partnership-10:b:d-5:institution:0"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:motive:motive",
      "coverageKey": "b:d-5:core:late:motive:motive",
      "variantTarget": 1,
      "setFlags": [
        "d-5:surface:risk_seen"
      ],
      "tags": [
        "late",
        "free_question"
      ]
    },
    {
      "id": "partnership10:beat_v2:b:d-5:core:rapport:emotion:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confess",
      "line": "이제는 감정까지 포함해 말하겠습니다. 자동 캘린더 초대가 최종 채용처럼 보이게 만든 건 기술적 문제였고, 저는 그걸 의도 증거처럼 과하게 읽었습니다.",
      "behaviorHint": "감정이 먼저 올라오고 나서야 사실을 꺼낸다.",
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
          "frayed"
        ],
        "trustWindowBands": [
          "narrow",
          "open"
        ],
        "fatigueLevels": [
          "wary",
          "spent"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:b:d-5:fear:0"
        ],
        "forbidAtomIds": [
          "partnership-10:b:d-5:institution:0"
        ]
      },
      "weight": 4,
      "priority": 21,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "b:d-5:core:rapport:emotion",
      "coverageKey": "b:d-5:core:late:rapport:emotion",
      "variantTarget": 1,
      "setFlags": [
        "d-5:core:repair_named"
      ],
      "tags": [
        "late",
        "free_question"
      ],
      "requiresFlags": [
        "d-5:surface:risk_seen"
      ]
    },
    {
      "id": "partnership10:beat_v2:a:d-1:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "잠깐, 지금은 '정식 오퍼'보다 제 쪽 긴장과 억울함이 먼저 올라옵니다. 그 순간엔 그렇게 버틸 수밖에 없었습니다.",
      "behaviorHint": "짧고 날카롭게 끊어 말하며 핵심 수치만 박아 넣는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
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
          "partnership-10:a:d-1:self_justification:1"
        ],
        "forbidAtomIds": [
          "partnership-10:a:d-1:admission:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-1:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 3,
      "setFlags": [],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "partnership10:beat_v2:a:d-1:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "감정 얘기로 핵심을 흐리지 마세요. 지금은 '정식 오퍼'하고 '온보딩 문서'부터 먼저 정리해야 합니다.",
      "behaviorHint": "짧고 날카롭게 끊어 말하며 핵심 수치만 박아 넣는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
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
          "partnership-10:a:d-1:self_justification:1"
        ],
        "forbidAtomIds": [
          "partnership-10:a:d-1:admission:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-1:surface:mid:interjection:emotional_only:block",
      "variantTarget": 3,
      "setFlags": [],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "partnership10:beat_v2:b:d-2:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "잠깐, 지금은 '채용은 없던 일'보다 제 쪽 긴장과 억울함이 먼저 올라옵니다. 그 순간엔 그렇게 버틸 수밖에 없었습니다.",
      "behaviorHint": "말을 끊고 즉각 반박하며 질문을 되받아친다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
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
          "partnership-10:b:d-2:self_justification:0"
        ],
        "forbidAtomIds": [
          "partnership-10:b:d-2:admission:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-2:surface:mid:interjection:emotional_only:allow",
      "variantTarget": 3,
      "setFlags": [],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "partnership10:beat_v2:b:d-2:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "감정 얘기로 핵심을 흐리지 마세요. 지금은 '채용은 없던 일'하고 '보류 통보'부터 먼저 정리해야 합니다.",
      "behaviorHint": "말을 끊고 즉각 반박하며 질문을 되받아친다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "layer": "surface",
      "issueRole": "core_truth",
      "responseIntent": "pressure_response",
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
          "partnership-10:b:d-2:self_justification:0"
        ],
        "forbidAtomIds": [
          "partnership-10:b:d-2:admission:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-2:surface:mid:interjection:emotional_only:block",
      "variantTarget": 3,
      "setFlags": [],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "emotional_only"
      ]
    },
    {
      "id": "partnership10:beat_v2:a:d-1:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "아니요, '정식 오퍼'이랑 '온보딩 문서' 순서를 보면 그 설명은 안 맞습니다. 그 디테일을 빼면 사실이 틀어집니다.",
      "behaviorHint": "짧고 날카롭게 끊어 말하며 핵심 수치만 박아 넣는다.",
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
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:a:d-1:self_justification:1"
        ],
        "forbidAtomIds": [
          "partnership-10:a:d-1:admission:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-1:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 3,
      "setFlags": [],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "partnership10:beat_v2:a:d-1:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "interject",
      "line": "'정식 오퍼' 하나만 떼서 말하지 마세요. '온보딩 문서'랑 '계좌정보 요청'까지 같이 봐야 합니다.",
      "behaviorHint": "짧고 날카롭게 끊어 말하며 핵심 수치만 박아 넣는다.",
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
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:a:d-1:self_justification:1"
        ],
        "forbidAtomIds": [
          "partnership-10:a:d-1:admission:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-1:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 3,
      "setFlags": [],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "partnership10:beat_v2:b:d-2:surface:mid:interjection:allow:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "아니요, '채용은 없던 일'이랑 '보류 통보' 순서를 보면 그 설명은 안 맞습니다. 그 디테일을 빼면 사실이 틀어집니다.",
      "behaviorHint": "말을 끊고 즉각 반박하며 질문을 되받아친다.",
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
        "interjectionStates": [
          "allow_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:b:d-2:self_justification:0"
        ],
        "forbidAtomIds": [
          "partnership-10:b:d-2:admission:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-2:surface:mid:interjection:detail_rebuttal:allow",
      "variantTarget": 3,
      "setFlags": [],
      "tags": [
        "interjection",
        "allow",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "partnership10:beat_v2:b:d-2:surface:mid:interjection:block:02",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "interject",
      "line": "'채용은 없던 일' 하나만 떼서 말하지 마세요. '보류 통보'랑 '트레이너 단톡'까지 같이 봐야 합니다.",
      "behaviorHint": "말을 끊고 즉각 반박하며 질문을 되받아친다.",
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
        "interjectionStates": [
          "block_last_turn"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:b:d-2:self_justification:0"
        ],
        "forbidAtomIds": [
          "partnership-10:b:d-2:admission:1"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-2:surface:mid:interjection:detail_rebuttal:block",
      "variantTarget": 3,
      "setFlags": [],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "detail_rebuttal"
      ]
    },
    {
      "id": "partnership10:beat_v2:a:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "그 화면만 보면 저라도 그렇게 의심했을 겁니다. 문제는 '트라이얼로' 프레임이 너무 그럴듯하게 보였다는 겁니다.",
      "behaviorHint": "짧고 날카롭게 끊어 말하며 핵심 수치만 박아 넣는다.",
      "applicableStates": [
        "M1",
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
          "allow_last_turn"
        ],
        "misconceptionStates": [
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:a:d-3:timeline:0"
        ],
        "forbidAtomIds": [
          "partnership-10:a:d-3:admission:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 3,
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
      "id": "partnership10:beat_v2:a:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "그 한 줄만으로 의도까지 못 박지 마세요. 지금 가진 건 '트라이얼로' 프레임 한 장뿐이고 아직 원문이 닫혀 있습니다.",
      "behaviorHint": "짧고 날카롭게 끊어 말하며 핵심 수치만 박아 넣는다.",
      "applicableStates": [
        "M1",
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
          "partnership-10:a:d-3:timeline:0"
        ],
        "forbidAtomIds": [
          "partnership-10:a:d-3:admission:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.a",
      "coverageKey": "a:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 3,
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
      "id": "partnership10:beat_v2:b:d-3:surface:mid:interjection:allow:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "그 화면만 보면 저라도 그렇게 의심했을 겁니다. 문제는 '트라이얼로' 프레임이 너무 그럴듯하게 보였다는 겁니다.",
      "behaviorHint": "말을 끊고 즉각 반박하며 질문을 되받아친다.",
      "applicableStates": [
        "M1",
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
          "allow_last_turn"
        ],
        "misconceptionStates": [
          "M1",
          "M2"
        ]
      },
      "truthEnvelope": {
        "allowAtomIds": [
          "partnership-10:b:d-3:evidence:1"
        ],
        "forbidAtomIds": [
          "partnership-10:b:d-3:admission:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.allow.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:allow",
      "variantTarget": 3,
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
      "id": "partnership10:beat_v2:b:d-3:surface:mid:interjection:block:01",
      "schemaVersion": "beat_v2",
      "caseId": "partnership-10",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "interject",
      "line": "그 한 줄만으로 의도까지 못 박지 마세요. 지금 가진 건 '트라이얼로' 프레임 한 장뿐이고 아직 원문이 닫혀 있습니다.",
      "behaviorHint": "말을 끊고 즉각 반박하며 질문을 되받아친다.",
      "applicableStates": [
        "M1",
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
          "partnership-10:b:d-3:evidence:1"
        ],
        "forbidAtomIds": [
          "partnership-10:b:d-3:admission:0"
        ]
      },
      "weight": 5,
      "priority": 26,
      "cooldownTurns": 2,
      "maxUsesPerCase": 1,
      "antiRepeatGroup": "interjection.block.b",
      "coverageKey": "b:d-3:surface:mid:interjection:misbelief_escalation:block",
      "variantTarget": 3,
      "setFlags": [],
      "tags": [
        "interjection",
        "block",
        "event_lane",
        "misbelief_escalation",
        "red_herring"
      ],
      "beliefMode": "weaponizes"
    }
  ]
} as const;

export default partnership10BeatsV2Full;
