# GPT Pro 배치 프롬프트: v2-atoms S0-S2 neutral화 교정

> 용도: gpt-batch에서 생성된 v2-atoms JSON을 Stage-1 품질 기준으로 교정
> 대상: 82건 (family-02~12, friend-01~12, neighbor-01~12, partnership-01~12, spouse-02~12, tenant-01~12, workplace-01~12)
> 참조: spouse-01-v2-atoms.json (교정 완료 기준본)

---

## 역할

너는 솔로몬 법정 게임의 **v2-atoms 데이터 교정 전문가**다.
각 사건의 v2-atoms JSON을 받아서, Truth Throttle 규칙에 맞게 slots의 추상화 수준을 교정한다.

---

## 핵심 원칙

**"진실은 플레이어가 증거+심문으로 직접 밝혀낸다. 어떤 채널도 플레이어보다 먼저 답을 말하면 안 된다."**

---

## 교정 규칙

### 1. State별 slots 추상화 수준

| State | 금액(amount) | 인물(person) | 기관(beneficiary) | 시각(time) | 행동(action) |
|-------|-------------|-------------|------------------|-----------|-------------|
| **S0** | exact/rounded/neutral 모두 → `"해당 금액"` | fullName → `"그 사람"`, judgeRef → `"그 사람"`, directRef → `"그 사람"`, role → `"관계자"` | fullName → `"그곳"`, neutral → `"그곳"` | dateExact/timeExact → `"그날"`, period → 유지 가능 | exact → neutral 수준으로 |
| **S1** | exact/rounded → `"적지 않은 돈"` 또는 `"해당 금액"`, neutral → `"그 돈"` | fullName → 성씨만(`"최 씨"`, `"이 씨"`), role → 제거 또는 `"관계자"` | 기관명 제거 → `"기관"` 또는 `"그곳"` | dateExact → 날짜까지만(`"9월 20일"`), 시각 허용 | neutral 수준 유지 |
| **S2** | rounded → `"200만원대"` 수준(10만 단위 반올림), exact 금지 | fullName → 성씨만, role → 직종만(`"상담사"`) | 기관명 일부 허용(`"돌봄센터"` 수준), 정식명칭 금지 | 날짜+시간대 허용 | 대략적 행동 허용 |
| **S3** | rounded 허용(`"280만원"`), exact 금지 | fullName 허용, role 허용 | 기관명 허용 | 전체 허용 | 구체적 행동 허용 |
| **S4-S5** | 전체 허용 — rounded(`"280만원"`) 우선, exact(`"2,800,000원"`) 미사용 | fullName + role + 직함 전체 | 정식 기관명 전체 | 전체 허용 | 전체 허용 |

### 2. fallbackPublicClaim ↔ slots 동기화 (규칙 1)

- `fallbackPublicClaim` 텍스트에 해당 state에서 숨겨야 하는 정보가 포함되면 **위반**.
- 예: S0 atom의 fallbackPublicClaim에 기관명 `"재가돌봄센터"` → 위반. `"그곳"` 또는 `"기관"`으로 교체.
- 예: S1 atom의 fallbackPublicClaim에 정확한 금액 `"280만원"` → 위반. `"적지 않은 돈"`으로 교체.

### 3. publicClaim / privateKnowledge / suppressions 교정

- **publicClaim**: 해당 state의 slots 추상화 수준을 따름. S0에서 구체적 인물명/기관명/금액 금지.
- **privateKnowledge**: NPC가 속으로 알고 있는 것. 구체적 정보를 포함할 수 있으나, 이것이 직접 플레이어에게 노출되지 않음.
- **suppressions**: NPC가 의도적으로 숨기는 것. 구체적 정보 포함 가능.

### 4. 금액 표기 규칙

- **자연어 형식 필수**: `"280만원"`, `"1800만원"`, `"50만원"`.
- **금지**: `"2,800,000원"`, `"18,000,000원"`.
- S0-S1: `"해당 금액"`, `"적지 않은 돈"`, `"큰돈"`, `"그 돈"` 등 추상적 표현.

### 5. 번역체 금지 9패턴

다음 표현이 factText/publicClaim/fallbackPublicClaim에 포함되면 교정:
- `"~된 것으로 생각됩니다"` → 직접 말하라
- `"~인 측면이 있었습니다"` → `"~한 점은 있습니다"`
- `"여러 가지 상황이 얽혀"` → 구체적 상황 1가지만
- `"관련 사항을 간과하게 된"` → `"놓쳤습니다"`
- `"부득이하게"` → `"어쩔 수 없이"` 또는 `"급해서"`
- `"해당 건에 대해서는"` → `"그 일은"`
- `"~하는 바입니다"` → 금지
- `"인지하고 있습니다"` → `"알고 있습니다"`
- `"~에 기인합니다"` → `"~ 때문입니다"`

### 6. "특정 X" 패턴 금지 (규칙 5)

- `"특정 기관"` → `"기관"` 또는 `"그곳"`
- `"특정인"` → `"그 사람"` 또는 성씨
- `"특정 금액"` → `"해당 금액"` 또는 `"적지 않은 돈"`

### 7. 후일담 번역체 금지 명시 (규칙 7)

- factText에서 `"~된 것으로 판단됩니다"`, `"~인 측면이 있었습니다"` 등 명시적 금지.

---

## 입력 형식

```json
{
  "caseId": "family-02",
  "claimPolicies": {
    "a": {
      "d-1": {
        "S0": { ... },
        "S1": { ... },
        ...
      }
    },
    "b": { ... }
  }
}
```

## 출력 형식

교정된 JSON을 그대로 출력. 변경 사항이 있는 atom마다 `"_corrections"` 배열을 추가하여 뭘 바꿨는지 기록:

```json
{
  "id": "d1.movement_only",
  "factText": "...",
  "slots": { ... },
  "_corrections": [
    "S0: amount.exact '280만원' → '해당 금액'",
    "S0: person.fullName '최민정' → '그 사람'"
  ]
}
```

---

## 검증 체크리스트 (출력 전 반드시 확인)

- [ ] S0-S1 atom의 slots에 fullName/exact/role/institution 값이 중립화되었는가
- [ ] S2 atom의 slots가 성씨/rounded 10만 단위 수준까지인가
- [ ] S3+ atom의 slots에 fullName, rounded, dateExact, role이 보존되었는가
- [ ] fallbackPublicClaim이 해당 state의 slots 추상화 수준을 따르는가
- [ ] publicClaim에 해당 state에서 금지된 정보가 없는가
- [ ] amount.rounded가 자연어 형식("280만원")인가
- [ ] 번역체 9패턴이 0건인가
- [ ] "특정 X" 패턴이 0건인가
- [ ] "사전 상의/협의" 패턴이 0건인가

---

## 작업 단위

**한 번에 최대 7건 처리** (품질 유지).
카테고리 단위로 묶어서 처리하는 것이 좋음:
- 1회차: family-02 ~ family-08
- 2회차: family-09 ~ family-12, friend-01 ~ friend-03
- ...

---

## 참고: Stage-1 교정 완료 기준본

spouse-01-v2-atoms.json의 S0 atom 예시:

```json
{
  "id": "d1.movement_only",
  "factText": "공동계좌 금액 이동 사실만 인정",
  "slots": {
    "amount": {
      "exact": "해당 금액",
      "rounded": "해당 금액",
      "neutral": "해당 금액"
    },
    "time": {
      "dateExact": "그날",
      "timeExact": "그날",
      "dateTimeExact": "그날",
      "period": "추석 연휴 직전",
      "neutral": "그날"
    },
    "action": {
      "exact": "공동계좌 송금",
      "neutral": "그 송금"
    }
  }
}
```

spouse-01의 S4-S5 atom 예시 (구체적 값 보존):
```json
{
  "slots": {
    "amount": {
      "rounded": "280만원",
      "neutral": "적지 않은 돈"
    },
    "person": {
      "fullName": "최민정",
      "judgeRef": "최 씨",
      "role": "재가돌봄센터 상담팀장"
    }
  }
}
```
