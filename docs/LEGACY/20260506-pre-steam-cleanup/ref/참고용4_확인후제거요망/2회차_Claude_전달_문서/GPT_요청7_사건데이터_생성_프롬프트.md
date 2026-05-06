# 솔로몬 84개 사건 데이터 보강 생성

## 작업 개요

84개 사건 JSON에 대해 아래 9종의 데이터를 생성합니다.
관계 유형별 12개씩, 총 7배치로 진행합니다.

첫 배치(spouse 12개)를 테스트로 실행하고, 퀄리티를 확인한 후 나머지 6배치를 진행합니다.

---

## 배치 순서

| 배치 | 관계 유형 | 사건 | 파일 |
|------|----------|------|------|
| 1 (테스트) | spouse | spouse-01 ~ spouse-12 | 12개 |
| 2 | family | family-01 ~ family-12 | 12개 |
| 3 | friend | friend-01 ~ friend-12 | 12개 |
| 4 | workplace | workplace-01 ~ workplace-12 | 12개 |
| 5 | neighbor | neighbor-01 ~ neighbor-12 | 12개 |
| 6 | partnership | partnership-01 ~ partnership-12 | 12개 |
| 7 | tenant | tenant-01 ~ tenant-12 | 12개 |

---

## 생성할 데이터 9종

### 1. truthPolicies (기존 요청 6과 동일)
쟁점×당사자×S0~S5별 allowedTruthIds / forbiddenTruthIds

```json
{
  "spouse-01": {
    "a": {
      "d-1": {
        "disputeName": "지석의 비밀 송금 280만원",
        "anchorTruthIds": ["t-1"],
        "notes": "설명",
        "states_full": {
          "S0": { "allowed": [], "forbidden": ["t-1","t-2","t-3","t-4","t-5"] },
          ...
          "S5": { "allowed": ["t-1","t-2","t-3","t-4","t-5"], "forbidden": [] }
        }
      }
    },
    "b": { ... }
  }
}
```

**원칙**:
- 단위: caseId × party(a/b) × disputeId × lieState(S0~S5)
- 같은 쟁점이라도 A와 B가 숨기는 것이 다름
- S0~S1: 대부분 빈 배열 (보수적)
- S5: 전체 허용
- forbidden = allTruthIds - allowed
- lieMotive에 따라 forbidden 강도 차이

### 2. witnessBudgets (기존 요청 6과 동일)
증인별 canState / uncertain / forbidden

```json
{
  "spouse-01": {
    "tp-1": {
      "canState": ["추석 연휴 돌봄 공백이 있었다"],
      "uncertain": ["280만원 송금의 정확한 시각"],
      "forbidden": ["휴대폰 무단 열람 경위"]
    }
  }
}
```

### 3. personalityTags (신규)
캐릭터당 3~5개의 성향 태그

```json
{
  "spouse-01": {
    "a": ["avoidant", "shame_sensitive", "timeline_padding"],
    "b": ["confrontational", "selective_quote", "face_sensitive"]
  }
}
```

**허용 태그** (이 목록에서만 선택):
avoidant, confrontational, victimizing, cold_logical, shame_sensitive, face_sensitive, retaliation_sensitive, privacy_sensitive, relationship_preserving, third_party_protective, fairness_obsessed, timeline_padding, counter_attack, selective_quote

### 4. contentTags (신규)
쟁점당 2~4개의 특성 태그

```json
{
  "spouse-01": {
    "d-1": ["financial", "secret_keeping", "family_care"],
    "d-2": ["privacy", "trust_breach"]
  }
}
```

**허용 태그**:
financial, family_care, privacy, career, intimacy_suspicion, promise_violation, secret_keeping, third_party_risk, misleading_soft_evidence, hard_evidence_available, sequence_sensitive, trust_breach, role_failure, reputation_risk

### 5. truthCategory (신규)
각 truth의 카테고리 (fact / motive / emotion 중 1개)

```json
{
  "spouse-01": {
    "t-1": "fact",
    "t-2": "emotion",
    "t-3": "motive"
  }
}
```

- fact: 날짜, 금액, 행위 여부 등 객관적 사실
- motive: 왜 그랬는지, 숨긴 이유, 자기정당화
- emotion: 감정, 두려움, 수치심, 관계 감정

### 6. actionAffinity (신규)
쟁점별 액션 상성표

```json
{
  "spouse-01": {
    "d-1": {
      "bestAction": "empathy_approach",
      "worstAction": "fact_pursuit",
      "actionScores": {
        "fact_pursuit": 0.85,
        "motive_search": 1.10,
        "empathy_approach": 1.25,
        "evidence_present": 1.05,
        "separation": 1.00,
        "confidential_protection": 1.15
      },
      "bestActionHint": "간병비를 숨긴 수치심이 핵심 — 공감이 고백을 유도",
      "worstActionReaction": "사실만 추궁하면 숫자로 도망치며 더 강하게 방어"
    }
  }
}
```

**기본 계수 참고** (lieMotive 기반, 여기서 ±0.10 범위로 사건 맥락에 맞게 조정):
- self_protection: fact 1.20 / motive 0.95 / empathy 0.75 / evidence 1.25
- face_saving: fact 0.85 / motive 1.20 / empathy 0.90 / confidential 1.10
- shame_avoidance: fact 0.70 / motive 0.95 / empathy 1.25 / confidential 1.25
- relationship_maintenance: fact 0.80 / motive 0.95 / empathy 1.20 / confidential 1.20
- revenge: fact 1.15 / motive 0.90 / empathy 0.60 / evidence 1.10
- third_party_protection: fact 0.75 / motive 0.95 / empathy 1.10 / separation 1.20 / confidential 1.30
- career_preservation: fact 1.05 / motive 0.95 / empathy 0.70 / evidence 1.25

점수 범위: 0.70~1.30 (clamp)

### 7. optimalPath (신규)
**전 쟁점(5개 모두)**의 최적 심문 경로

```json
{
  "spouse-01": {
    "d-1": {
      "requiredActions": ["fact_pursuit", "evidence_present:e-1"],
      "bonusActions": ["motive_search", "separation"],
      "pathBonus": 8
    },
    "d-2": {
      "requiredActions": ["fact_pursuit"],
      "bonusActions": ["empathy_approach", "confidential_protection"],
      "pathBonus": 6
    }
  }
}
```

- requiredActions: 이 쟁점을 제대로 해결하기 위해 반드시 거쳐야 하는 액션
- bonusActions: 추가로 거치면 더 깊은 이해를 보여주는 액션 (스킬 포함 가능: separation, confidential_protection)
- pathBonus: 이 경로를 모두 밟았을 때의 추가 점수 (6~10)
- evidence_present:e-1 형식으로 특정 증거 제시도 포함 가능

### 8. narrativeExpansion (신규)
high-weight dispute에만 (사건당 1~2개)

```json
{
  "spouse-01": {
    "d-3": {
      "category": "motive",
      "deeperReveal": "외도 의혹을 풀 수 있었지만, 처가 돌봄 문제와 재정 무능력 이미지가 한꺼번에 터질까 봐 설명을 미뤘다.",
      "unlockHint": "empathy_approach 또는 confidential_protection + 현재 쟁점 S3 이상",
      "impactDisputes": ["d-1", "d-5"]
    }
  }
}
```

- 판결 truth를 뒤집는 새 사실이 아님. motive/emotion/context 확장만 허용.
- category: motive 또는 emotion
- unlockHint: 어떤 조건에서 이 확장이 해금되는지
- impactDisputes: 이 확장이 다른 쟁점의 해석을 바꾸는지

### 9. witnessSpeechSample (신규)
증인당 예시 증언 1~2개

```json
{
  "spouse-01": {
    "tp-1": [
      "그때 우리 세린이가 전화해서 막 울면서... 추석인데 간병은 누가 하냐고... 저도 걱정이 됐죠.",
      "지석 씨가 어떤 사정이 있었는지까지는 잘 모르겠습니다만, 세린이가 많이 힘들어한 건 확실합니다."
    ],
    "tp-3": [
      "9월 20일 14시에 예약금 280만원을 수납했습니다. 상담은 비대면으로 진행됐고, 예약자 명의는 한지석 씨였습니다."
    ]
  }
}
```

- 증인의 speechStyle, bias, distortionRisk를 반영한 자연스러운 한국어
- 기관 담당자는 건조하게, 가족은 감정적으로, 친구는 편하게

---

## 절대 규칙

1. 기존 disputes.truth, truthTable, lieConfig, evidence.proves와 **모순되면 안 된다**.
2. **새로운 binary truth를 발명하지 마라.** 기존 truthTable에 있는 것만 사용.
3. narrativeExpansion은 **판결 truth를 뒤집는 새 사실이 아니라** motive/emotion/context 확장만.
4. personalityTags, contentTags는 **허용 태그 목록에서만** 선택.
5. truthCategory는 truth마다 **1개만**: fact | motive | emotion
6. actionAffinity 점수 범위는 **0.70~1.30**.
7. optimalPath는 **전 쟁점(5개 모두)** 작성.
8. 출력은 **JSON 객체만**. 설명문 금지.

---

## caseId 변환 규칙

사건 JSON의 caseId는 `case-spouse-01` 형식이지만, 출력 JSON의 키는 `spouse-01` 형식입니다.
- `case-` prefix 제거
- `case-work-01` → `workplace-01`

---

## 출력 형식

```json
{
  "truthPolicies": { "spouse-01": { ... }, "spouse-02": { ... }, ... },
  "witnessBudgets": { "spouse-01": { ... }, ... },
  "personalityTags": { "spouse-01": { "a": [...], "b": [...] }, ... },
  "contentTags": { "spouse-01": { "d-1": [...], ... }, ... },
  "truthCategory": { "spouse-01": { "t-1": "fact", ... }, ... },
  "actionAffinity": { "spouse-01": { "d-1": { ... }, ... }, ... },
  "optimalPath": { "spouse-01": { "d-1": { ... }, ... }, ... },
  "narrativeExpansion": { "spouse-01": { "d-3": { ... } }, ... },
  "witnessSpeechSample": { "spouse-01": { "tp-1": [...], ... }, ... }
}
```

---

## 참고 예시

첨부된 `v4_sample_3cases.json`에 spouse-01, workplace-01, friend-01의 truthPolicies와 witnessBudgets 예시가 있습니다. 나머지 7종(tags, affinity, path 등)은 이번에 처음 생성합니다.

---

## 첫 배치

첨부 파일: spouse-01.json ~ spouse-12.json (12개)
참고 예시: v4_sample_3cases.json
