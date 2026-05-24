# 03 — d-3 Authority reword spec

**대상 파일**: `src/data/coreCases/friend-01.case.ts` (line 940 ~ 1231 영역)
**변경 본질**: e-5 reframe에 따른 d-3 truthDescription / verdictOptions / truthStages.b 정합 reword

---

## name / judgmentStatement / mediationLink — 변경 없음

| Field | Value (유지) | Rationale |
|---|---|---|
| `name` | `'아버지의 돈 접근 패턴'` | "접근"이 "시도+완료" 둘 다 포괄 |
| `judgmentStatement` | `'송다은 아버지의 돈 접근 패턴은 과거와 현재가 같았다.'` | 동일 |
| `mediationLink` | `'송다은 아버지의 돈 접근 패턴'` | 동일 |
| `requiredEvidence` | `['e-5']` | 동일 |
| `quadrant` | `'b_only'` | 동일 |
| `weight` | `'high'` | 동일 |
| `ambiguity` | `'low'` | 동일 |
| `legitimacyIssue` | `false` | 동일 |
| `hidden` | `true` | 동일 |
| `correctResponsibility` | `{ a: 65, b: 35 }` | 동일 |
| `lieConfig` / `unlockCondition` / `channelExposure` | 동일 | 변경 없음 |

---

## truthDescription

**Before**:
```typescript
truthDescription: ko(
  '송다은 아버지가 예비신랑에게 돈 얘기를 꺼내고 있었고, 최수민은 과거에 같은 패턴을 당한 적이 있어 예비신랑에게 경고하려 했다.',
),
```

**After**:
```typescript
truthDescription: ko(
  '송다은 아버지가 예비신랑에게 결혼 자금 명목으로 접근을 시도하려 하고 있었고, 최수민은 과거에 같은 일을 당한 적이 있어 결혼 자체가 위기에 빠질까 봐 예비신랑에게 직접 연락해 막으려 했다.',
),
```

---

## verdictOptions

**Before**:
```typescript
verdictOptions: {
  wrong: ko('송다은 아버지는 예비신랑에게 인사차 안부를 전했을 뿐이다.'),
  partial: ko('돈 이야기가 오간 것 같지만 구체적 내용은 확인이 안 된다.'),
  truth: ko('송다은 아버지가 예비신랑에게 돈을 빌려달라고 접근했고, 최수민은 과거 같은 패턴을 겪은 적이 있다.'),
  defer: ko('대화의 실체를 확인할 수 없다. 유보한다.'),
},
```

**After**:
```typescript
verdictOptions: {
  wrong: ko('송다은 아버지는 예비신랑에게 인사차 안부를 전했을 뿐이다.'),
  partial: ko('돈 이야기가 시도된 정황은 있지만 구체적 내용은 확인이 안 된다.'),
  truth: ko('송다은 아버지가 예비신랑에게 결혼 자금 명목으로 접근을 시도했고, 최수민은 과거 같은 일을 겪었기에 결혼 위기를 막으려 직접 연락했다.'),
  defer: ko('대화의 실체를 확인할 수 없다. 유보한다.'),
},
```

**변경 영역**:
- `wrong`: 유지
- `partial`: "오간 것 같지만" → "시도된 정황은 있지만"
- `truth`: "돈을 빌려달라고 접근했고, 최수민은 과거 같은 패턴을 겪은 적이 있다" → "결혼 자금 명목으로 접근을 시도했고, 최수민은 과거 같은 일을 겪었기에 결혼 위기를 막으려 직접 연락했다"
- `defer`: 유지

---

## truthStages.b reword (단계별)

### S0.b — 변경 없음

`admittedFact`, `allowedKeywords`, `forbiddenKeywords`, `answerFrame` 모두 유지 ("아버지 쪽 이야기는 본인이 단정해 말할 영역이 아니다" frame strict).

### S1.b — 변경 없음

`admittedFact`, `allowedKeywords`, `forbiddenKeywords`, `answerFrame`, `transitionBeat` 모두 유지 ("과거와 닮은 흐름이 보였다는 점은 인정한다. 다만 단정하지는 않는다" frame).

### S2.b — admittedFact + transitionBeat reword

**Before** (line ~1067):
```typescript
admittedFact: ko('결혼 직전 돈 얘기가 반복되는 게 걱정돼 예비신랑에게 확인하려 했다.'),
allowedKeywords: koKeywords('결혼 직전 돈 얘기', '걱정', '확인하려'),
// ...
transitionBeat: {
  line: ko('최수민은 "예비신랑에게 확인하려 했다"고 밝힌다.'),
  behaviorHint: ko('말의 속도가 늦어진다.'),
},
```

**After**:
```typescript
admittedFact: ko('결혼 직전 돈 얘기가 시도되는 게 걱정돼 예비신랑에게 직접 막아보려 연락했다.'),
allowedKeywords: koKeywords('결혼 직전 돈 얘기', '걱정', '직접 막아보려'),
// ...
transitionBeat: {
  line: ko('최수민은 "예비신랑에게 직접 막아보려 했다"고 밝힌다.'),
  behaviorHint: ko('말의 속도가 늦어진다.'),
},
```

**변경 영역**:
- "반복되는 게" → "시도되는 게"
- "확인하려" → "직접 막아보려 연락했다"
- allowedKeywords의 "확인하려" → "직접 막아보려"
- transitionBeat.line의 "확인하려" → "직접 막아보려"

`forbiddenKeywords` 영역 유지 (`'아버지의 사기'`, `'같은 패턴 반복'`, `'과거 손절 = A 아버지 원인'` — 그룹 2/3/4 영역 보존).

`answerFrame` 유지 ("B는 돈 얘기 반복 + 확인 동기 인정. 사기/패턴 반복은 회피.") — **단 "확인 동기" → "차단 동기"로 정합 검토 권장**:

```typescript
answerFrame: ko('B는 돈 얘기 시도 + 차단 동기 인정. 사기/패턴 반복은 회피.'),
```

### S3.b — admittedFact + transitionBeat reword

**Before** (line ~1101):
```typescript
admittedFact: ko('과거에 본인이 같은 흐름을 겪었기에 이번 패턴을 알아봤다. 그래서 예비신랑에게 경고하려 했다.'),
allowedKeywords: koKeywords('과거에 같은 흐름', '패턴 인식', '경고하려'),
// ...
transitionBeat: {
  line: ko('최수민은 "예전부터 같은 말을 들어 봤다"며 숨을 삼킨다.'),
  behaviorHint: ko('어깨가 살짝 움츠러들고, 문장 중간에서 목소리가 갈라진다.'),
},
```

**After**:
```typescript
admittedFact: ko('과거에 본인이 같은 흐름을 겪었기에 이번 패턴을 알아봤다. 결혼이 위기에 빠질까 봐 예비신랑에게 직접 연락해 막으려 했다.'),
allowedKeywords: koKeywords('과거에 같은 흐름', '패턴 인식', '직접 연락해 막으려'),
// ...
transitionBeat: {
  line: ko('최수민은 "예전부터 같은 말을 들어 봤다"며 숨을 삼킨다.'),
  behaviorHint: ko('어깨가 살짝 움츠러들고, 문장 중간에서 목소리가 갈라진다.'),
},
```

**변경 영역**:
- "그래서 예비신랑에게 경고하려 했다" → "결혼이 위기에 빠질까 봐 예비신랑에게 직접 연락해 막으려 했다"
- allowedKeywords의 "경고하려" → "직접 연락해 막으려"
- transitionBeat 유지 (B character 자제 톤 — 그대로 영역 자연)

`forbiddenKeywords` 유지.

`answerFrame` reword:
- Before: "B는 같은 흐름·경고 의도 인정. 과거 손절 원인·사기는 회피."
- After: "B는 같은 흐름·차단 의도 인정. 과거 손절 원인·사기는 회피."

### S4.b — admittedFact 유지

**Before** (line ~1130):
```typescript
admittedFact: ko('송다은 아버지에게 돈을 잃었던 과거 경험이 있어 같은 수법을 알아봤다. 결혼 자금이 표적이 될 수 있다고 봤다.'),
```

**유지** (과거 사기 + 표적 영역, e-5 reframe과 무관).

### S5.b — admittedFact reword

**Before** (line ~1154):
```typescript
admittedFact: ko(
  '송다은 아버지가 예비신랑에게 결혼 자금 명목으로 돈을 빌려달라고 접근했고, 본인은 과거 같은 흐름을 겪었기에 패턴을 알아봤다. 그래서 예비신랑에게 경고하려 했다.',
),
allowedKeywords: koKeywords('아버지의 돈 접근', '같은 패턴 반복', '경고 의도'),
// ...
```

**After**:
```typescript
admittedFact: ko(
  '송다은 아버지가 예비신랑에게 결혼 자금 명목으로 접근을 시도하고 있었고, 본인은 과거 같은 일을 겪었기에 패턴을 알아봤다. 결혼 자체가 위기에 빠질까 봐 예비신랑에게 직접 연락해 막으려 했다.',
),
allowedKeywords: koKeywords('아버지의 돈 접근', '같은 패턴 반복', '차단 의도'),
// ...
```

**변경 영역**:
- "결혼 자금 명목으로 돈을 빌려달라고 접근했고" → "결혼 자금 명목으로 접근을 시도하고 있었고"
- "과거 같은 흐름을 겪었기에 패턴을 알아봤다. 그래서 예비신랑에게 경고하려 했다" → "과거 같은 일을 겪었기에 패턴을 알아봤다. 결혼 자체가 위기에 빠질까 봐 예비신랑에게 직접 연락해 막으려 했다"
- allowedKeywords의 "경고 의도" → "차단 의도"
- answerFrame: "경고 의도" → "차단 의도"
- transitionBeat 유지

---

## truthStages.a reword (단계별)

### S0.a / S1.a / S2.a / S3.a / S4.a — 변경 없음

A 영역은 "아버지 돈 접근" frame이 그대로 유효. e-5 reframe과 무관. forbiddenKeywords 유지.

### S5.a — admittedFact 일부 reword

**Before** (line ~1143):
```typescript
admittedFact: ko('아버지가 예비신랑에게 결혼 자금 명목으로 돈을 꺼낼 흐름을 본인이 알고 있었다. 멈추지 못한 책임이 있다.'),
```

**After**:
```typescript
admittedFact: ko('아버지가 예비신랑에게 결혼 자금 명목으로 접근을 시도하는 흐름을 본인이 알고 있었다. 멈추지 못한 책임이 있다.'),
```

**변경 영역**:
- "돈을 꺼낼 흐름" → "접근을 시도하는 흐름"

`allowedKeywords` 유지 ("돈 접근", "알고 있었음", "멈추지 못한 책임").
`answerFrame` 유지 ("A는 진실 완전 인정. 인지·방관 책임 직접 진술.").

---

## progressionStages — 변경 없음

`S0` ~ `S5`의 `surfaceClaim` / `hiddenTruth` / `validActions` / `requiredEvidence` 모두 frame은 유효. 단 `S2.surfaceClaim`에서 "확인하려 함" → "차단하려 함" 검토 권장:

**Before** (line ~1199):
```typescript
S2: {
  surfaceClaim: ko('투자 얘기 민감 / 확인하려 함'),
  ...
},
```

**After**:
```typescript
S2: {
  surfaceClaim: ko('투자 얘기 민감 / 차단하려 함'),
  ...
},
```

`S3.surfaceClaim` 유지 ("돈 접근 사실 + 결혼 자금 명목 / 과거에 같은 흐름").
`S4.surfaceClaim` 유지 ("인지·방관 / 같은 수법 + 결혼 자금 표적").
`S5.surfaceClaim` 유지 ("진실 완전 인정").

---

## 적용 후 검증

- `npx tsc --noEmit` PASS (type 영역 변경 없음)
- `npm run build` PASS
- `npm run -s qa:fast` PASS — RELEASE READY 확인
  - 새 단어 "차단 의도" / "직접 연락해 막으려"가 그룹 2/3/4 forbiddenKeywords와 겹치지 않는지 확인
  - 단, "직접 연락해 막으려" 는 그룹 3 ("B 경고 의도")의 reframe된 표현 — d-3 S3+ surface에서만 등장해야 함 (이미 S3 이상에서만 등장)
- truth-leak-matrix는 cases/generated에서 derive되므로 build-core-case.mjs 자동 sync 영역

---

## anchorTruth reword 검토 (사용자 결정 영역)

`meta.anchorTruth` (line ~78):

**Before**:
> "최수민의 9일간 연락은 집착이 아니라 송다은 아버지의 돈 접근 패턴을 결혼 직전 예비신랑에게 경고하려던 것이었다. ..."

**After 후보**:
> "최수민의 9일간 연락은 집착이 아니라 송다은 아버지가 결혼 직전 예비신랑에게 돈 접근을 시도하는 흐름을 차단하려던 것이었다. ..."

CT 세션 적용 시 사용자에게 확인 권장.
