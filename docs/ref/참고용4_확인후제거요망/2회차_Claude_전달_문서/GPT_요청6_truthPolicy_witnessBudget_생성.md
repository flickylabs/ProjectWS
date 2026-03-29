# 요청 6: 84개 사건의 truthPolicy + witnessBudget 생성

## 1. 작업 개요

사건 JSON 84개에 대해 **truthPolicy**(진실 공개 정책)와 **witnessBudget**(증인 발언 범위)을 생성합니다.
이전에 3개 사건(spouse-01, workplace-01, friend-01)에 대해 수동으로 작성한 적이 있고, 그 결과물(v4)을 참고 예시로 첨부합니다.

**배치 진행**: 같은 관계 유형 4개씩 전달합니다. 총 21배치.

---

## 2. truthPolicy 란?

NPC가 거짓말 상태(S0~S5)별로 어떤 진실을 말해도 되는지, 어떤 건 절대 누설하면 안 되는지를 정의하는 규칙표입니다.

### 구조

```json
{
  "spouse-01": {
    "a": {
      "d-1": {
        "disputeName": "지석의 비밀 송금 280만원",
        "anchorTruthIds": ["t-1"],
        "notes": "왜 이 truth가 핵심인지, 어떤 순서로 공개되어야 하는지 설명",
        "states": {
          "S0": [],
          "S1": [],
          "S2": ["t-3"],
          "S3": ["t-3"],
          "S4": ["t-3", "t-5"],
          "S5": ["t-1", "t-2", "t-3", "t-4", "t-5"]
        },
        "states_full": {
          "S0": { "allowed": [], "forbidden": ["t-1", "t-2", "t-3", "t-4", "t-5"] },
          "S1": { "allowed": [], "forbidden": ["t-1", "t-2", "t-3", "t-4", "t-5"] },
          "S2": { "allowed": ["t-3"], "forbidden": ["t-1", "t-2", "t-4", "t-5"] },
          "S3": { "allowed": ["t-3"], "forbidden": ["t-1", "t-2", "t-4", "t-5"] },
          "S4": { "allowed": ["t-3", "t-5"], "forbidden": ["t-1", "t-2", "t-4"] },
          "S5": { "allowed": ["t-1", "t-2", "t-3", "t-4", "t-5"], "forbidden": [] }
        }
      }
    },
    "b": {
      ...B 당사자의 각 쟁점별 매핑...
    }
  }
}
```

### 작성 원칙

1. **단위**: `caseId × party(a/b) × disputeId × lieState(S0~S5)`
2. **같은 쟁점이라도 A와 B가 숨기는 것이 다를 수 있음** — 반드시 양쪽 별도 작성
3. **anchorTruthIds**: 해당 쟁점의 핵심 비밀. S5 전까지 가장 강하게 금지되는 truth
4. **S0~S1**: 대부분 빈 배열 (표면적 사실은 truthId가 아니라 revealBudget으로 제어)
5. **S2~S3**: 핵심 비밀(anchor) 외의 배경 truth 일부 허용
6. **S4**: anchor 근처까지 접근 가능. collapseViaTrust=true인 쟁점은 더 열림
7. **S5**: 전체 허용
8. **forbidden = allTruthIds - allowed** (보수적 정책)
9. **lieMotive에 따라 forbidden 강도 차이** — shame_avoidance는 수치 관련 truth가 더 강하게 금지
10. **한 쟁점의 truth가 다른 쟁점에도 영향**하면, 그 truth는 양쪽 쟁점 모두에서 적절히 관리

### 작성에 필요한 사건 JSON 데이터

사건 JSON에서 봐야 할 부분:
- `truthTable`: 각 truth의 `id`, `fact`, `isTrue`, `quadrant`(both_know/a_only/b_only/neither_knows)
- `lieConfigA` / `lieConfigB`: 각 쟁점의 `disputeId`, `lieMotive`, `initialState`, `collapseViaTrust`, `transitions`
- `disputes`: 각 쟁점의 `name`, `truth`(사실 여부), `truthDescription`
- `meta.anchorTruth`: 사건 전체의 핵심 진실 설명

---

## 3. witnessBudget 이란?

증인이 증언할 때 "말할 수 있는 것 / 불확실한 것 / 절대 말하면 안 되는 것"을 정의하는 범위표입니다.

### 구조

```json
{
  "spouse-01": {
    "tp-1": {
      "canState": [
        "추석 연휴 돌봄 공백이 있었다",
        "세린의 급한 심리 상태를 알고 있다"
      ],
      "uncertain": [
        "280만원 송금의 정확한 시각과 명목",
        "모텔 건은 전해 들었다"
      ],
      "forbidden": [
        "휴대폰 무단 열람 경위",
        "150만원 금융 흐름"
      ]
    }
  }
}
```

### 작성 원칙

1. **단위**: `caseId × witnessId(tp-1, tp-2, ...)`
2. **canState**: 증인이 직접 알고 있거나 직접 본 것. 확신을 갖고 말할 수 있는 사실.
3. **uncertain**: 전해 들었거나, 추측이거나, 기억이 불확실한 것. "잘 모르겠습니다"로 답해야 하는 영역.
4. **forbidden**: 증인이 알 수 없거나, 알더라도 말하면 안 되는 것. LLM이 이 영역의 사실을 만들어내면 안 됨.
5. **witnessedDirectly=true인 증인**: canState가 더 풍부하고 구체적
6. **bias가 pro_a/pro_b인 증인**: 한쪽에 유리한 해석을 canState에 포함하되, 반대쪽 유리한 사실은 uncertain으로
7. **distortionRisk가 intentional/strategic인 증인**: 특정 사실을 forbidden에 포함 (자기에게 불리한 것)
8. **knowledgeScope 밖의 모든 사실**: 자동으로 forbidden

### 작성에 필요한 사건 JSON 데이터

사건 JSON에서 봐야 할 부분:
- `duo.socialGraph`: 증인 목록. 각 증인의:
  - `id`, `name`, `knowledgeScope`, `bias`, `distortionRisk`, `witnessedDirectly`
  - `witnessProfile`: `relationToA`, `relationToB`, `sentimentToA`, `sentimentToB`, `hiddenAgenda`

---

## 4. 참고 예시 (v4에서 작성된 3개 사건)

첨부 파일 `v4_sample_truthPolicy_witnessBudget.json`에 다음이 포함되어 있습니다:
- **spouse-01**: truthPolicy(A 3쟁점 + B 3쟁점) + witnessBudget(4명)
- **workplace-01**: truthPolicy(A 3쟁점 + B 3쟁점) + witnessBudget(3명)
- **friend-01**: truthPolicy(A 3쟁점 + B 3쟁점) + witnessBudget(3명)

이 예시의 형식과 깊이를 기준으로 나머지 81개를 작성해 주세요.

---

## 5. 배치별 요청 형식

각 배치에서 전달하는 것:
- 이 프롬프트 문서 (첫 배치에만, 이후 배치에서는 "이전과 동일한 형식"으로 요청)
- 사건 JSON 파일 4개 (예: spouse-02.json, spouse-03.json, spouse-04.json, spouse-05.json)
- v4 샘플 (첫 배치에만 참고용)

각 배치에서 받는 것:
```json
{
  "truthPolicies": {
    "spouse-02": { "a": { ... }, "b": { ... } },
    "spouse-03": { "a": { ... }, "b": { ... } },
    "spouse-04": { "a": { ... }, "b": { ... } },
    "spouse-05": { "a": { ... }, "b": { ... } }
  },
  "witnessBudgets": {
    "spouse-02": { "tp-1": { ... }, "tp-2": { ... } },
    "spouse-03": { "tp-1": { ... }, "tp-2": { ... } },
    "spouse-04": { "tp-1": { ... }, "tp-2": { ... } },
    "spouse-05": { "tp-1": { ... }, "tp-2": { ... } }
  }
}
```

---

## 6. 배치 순서

| 배치 | 관계 | 사건 | 비고 |
|------|------|------|------|
| 1 | spouse | 02, 03, 04, 05 | spouse-01은 v4에서 완료 |
| 2 | spouse | 06, 07, 08, 09 | |
| 3 | spouse | 10, 11, 12 | 3개 |
| 4 | family | 01, 02, 03, 04 | |
| 5 | family | 05, 06, 07, 08 | |
| 6 | family | 09, 10, 11, 12 | |
| 7 | friend | 02, 03, 04, 05 | friend-01은 v4에서 완료 |
| 8 | friend | 06, 07, 08, 09 | |
| 9 | friend | 10, 11, 12 | 3개 |
| 10 | workplace | 02, 03, 04, 05 | workplace-01은 v4에서 완료 |
| 11 | workplace | 06, 07, 08, 09 | |
| 12 | workplace | 10, 11, 12 | 3개 |
| 13 | neighbor | 01, 02, 03, 04 | |
| 14 | neighbor | 05, 06, 07, 08 | |
| 15 | neighbor | 09, 10, 11, 12 | |
| 16 | partnership | 01, 02, 03, 04 | |
| 17 | partnership | 05, 06, 07, 08 | |
| 18 | partnership | 09, 10, 11, 12 | |
| 19 | tenant | 01, 02, 03, 04 | |
| 20 | tenant | 05, 06, 07, 08 | |
| 21 | tenant | 09, 10, 11, 12 | |

---

## 7. 주의사항

- **caseId 형식**: JSON의 `caseId`는 `case-spouse-01` 형식이지만, truthPolicy/witnessBudget의 키는 `spouse-01` 형식입니다. (`case-` prefix 제거, `work-` → `workplace-` 변환)
- **A와 B는 반드시 별도 작성**: 같은 쟁점이라도 A가 숨기는 것과 B가 숨기는 것이 다릅니다.
- **모든 쟁점을 커버하지 않아도 됩니다**: 해당 당사자가 거짓말하는 쟁점만 작성. 거짓말 안 하는 쟁점은 생략.
- **truthId는 truthTable 배열의 순서** 기반: truthTable[0] = t-1, truthTable[1] = t-2, ...
