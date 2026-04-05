# v2-atoms S3+ slots 보충 작업

## 역할
너는 솔로몬 법정 게임의 v2-atoms 데이터 보충 전문가다.
아래 6건의 사건에서 S3/S4/S5 state의 claimAtoms slots가 불완전하다(empty `{}`).
각 사건의 anchorTruth(진실)과 기존 채워진 slots 패턴을 참고하여, empty slots에 구체적 값을 채워줘.

---

## Truth Throttle 규칙

| State | 금액 | 인물 | 기관 | 시각 |
|-------|------|------|------|------|
| S3 | `rounded`("280만원") | `fullName`(실명), `judgeRef`("OO 씨") | 약칭 허용 | `dateExact`, `period` 허용 |
| S4 | 전체 허용 | 전체 허용 | 전체 허용 | 전체 허용 |
| S5 | 전체 허용 — `rounded` 우선, `exact`("2,800,000원") 미사용 | 전체 허용 | 전체 허용 | 전체 허용 |

### slot 키 종류 (참고)
```
amount:  { exact, rounded, neutral }
person:  { exact, fullName, judgeRef, neutral, role? }
time:    { exact, dateExact, period, neutral }
document/file/channel/quote 등: { exact, neutral }
institution: { exact, fullName, neutral, judgeRef? }
```

---

## 판단 규칙

1. **empty slots(`{}`)인 atom만 대상** — 이미 값이 있는 atom은 절대 건드리지 마
2. factText를 읽고, 해당 atom이 참조하는 사실(인물/금액/시각/문서/장소 등)을 anchorTruth에서 찾아 slot에 채워
3. factText가 감정/관계/공포/자기반성 중심이라 구체적 사실 참조가 없는 atom은 **slots를 `{}` 그대로 유지**하고 `"skip": true` 표시
4. neutral 값은 항상 포함 — "그 사람", "해당 금액", "그때" 등 모호한 표현
5. S3에서는 fullName + judgeRef까지, S4/S5에서는 role/dateExact/rounded 등 최대한 구체적으로
6. **기존 채워진 같은 dispute의 다른 atom slots를 참고**하여 일관된 명칭 사용

---

## 출력 형식

사건별로 아래 JSON 배열을 출력해줘:

```json
{
  "caseId": "spouse-08",
  "fixes": [
    {
      "path": "a.d-1.S3.claimAtoms[0].slots",
      "factText": "겉보기와 달리 실제 제출·신고는 없었다는 반박",
      "action": "fill",
      "newSlots": {
        "procedure": {
          "exact": "법무사 CRM 접수 번호",
          "neutral": "그 절차"
        }
      }
    },
    {
      "path": "a.d-1.S4.claimAtoms[0].slots",
      "factText": "업로드 직후 다시 설명하지 않은 책임을...",
      "action": "skip",
      "reason": "감정/반성 중심, 구체적 사실 참조 없음"
    }
  ]
}
```

- `action: "fill"` — slots에 값을 채움
- `action: "skip"` — 구체적 사실 참조 없어서 empty 유지

---

## 대상 사건 6건

아래 data-*.md 파일을 순서대로 받을 거야. 각 파일에 다음이 포함됨:
1. duo 이름 (partyA/B)
2. disputes 목록 (id, name, truthDescription)
3. truthTable (진실 5개)
4. S3+ empty-slots atom 목록 (path + factText + tags)
5. 같은 dispute의 이미 채워진 slots (참고용)

### 사건 목록
1. `data-spouse-08.md` — 한서진 vs 류현석 (39개 empty atoms)
2. `data-spouse-12.md` — 문세아 vs 최재우 (13개 empty atoms)
3. `data-family-08.md` — 이세라 vs 이준호 (42개 empty atoms)
4. `data-neighbor-08.md` — 황민석 vs 주하린 (1개 empty atom)
5. `data-partnership-07.md` — 문태경 vs 서유나 (7개 empty atoms)
6. `data-partnership-10.md` — 오준서 vs 박혜린 (6개 empty atoms)

총 108개 empty atoms 중, 감정/반성 중심은 skip하고 사실 참조가 있는 것만 fill.

---

## 작업 순서

1. 이 프롬프트를 먼저 읽어
2. data-*.md를 하나씩 보내줄게
3. 각 사건마다 위 JSON 형식으로 응답해줘
4. 6건 모두 끝나면 통계 요약(fill 몇 개 / skip 몇 개)도 해줘
