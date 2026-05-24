# 04 — w-2 / dc-3 / combine-3 Authority reword spec

**대상 파일**: `src/data/coreCases/friend-01.case.ts`
**변경 본질**: e-5 reframe 영향 영역 정합 reword

---

## 1. w-2 (박준혁) 확장

**위치**: `friend-01.case.ts` line 2167 ~ 2200 영역

### unlockedByDossier 확장

**Before**:
```typescript
unlockedByDossier: ['dc-2'],
```

**After**:
```typescript
unlockedByDossier: ['dc-2', 'dc-3'],
```

**Rationale**: w-2가 d-3 영역에서도 호출 가능. dc-3 등재 후에도 증인 호출 자격 확보.

⚠️ **주의**: narrative wrapper 없이 mechanical 호출은 정책 위반 ([[feedback_new_dispute_evidence_narrative_justification]]). 본 변경 적용 시 다음 Cycle 8b에서 **w-2의 d-3 영역 호출 narrative trigger 추가 필수**.

→ Cycle 8b 진입 시 `friend-01.narrative.ts`에 `w2NarrativeTriggers`의 dc-3 영역 trigger 추가 (또는 `w2d3NarrativeTriggers` 신규).

### relatedDisputes 확장

**Before**:
```typescript
relatedDisputes: ['d-2'],
```

**After**:
```typescript
relatedDisputes: ['d-2', 'd-3'],
```

### testimony.byDispute['d-3'] 신규 추가

**Before**:
```typescript
testimony: {
  byDispute: {
    'd-2': {
      canProve: [
        ko('예비신랑이 사적 자리에서 최수민에게 먼저 접근하려 했다는 사실.'),
        ko('예비신랑이 메시지 송신 직후 자기 말을 어떻게 자랑했는지.'),
      ],
      cannotDisprove: [
        ko('두 사람 사이 모든 메시지를 직접 본 것은 아님.'),
        ko('최수민이 거절했는지는 본인 진술 기준.'),
      ],
    },
  },
},
```

**After**:
```typescript
testimony: {
  byDispute: {
    'd-2': {
      canProve: [
        ko('예비신랑이 사적 자리에서 최수민에게 먼저 접근하려 했다는 사실.'),
        ko('예비신랑이 메시지 송신 직후 자기 말을 어떻게 자랑했는지.'),
      ],
      cannotDisprove: [
        ko('두 사람 사이 모든 메시지를 직접 본 것은 아님.'),
        ko('최수민이 거절했는지는 본인 진술 기준.'),
      ],
    },
    'd-3': {
      canProve: [
        ko('예비신랑이 회사 동료 단톡방에서 "다은이 아버지가 결혼 자금 좀 도와달래" 토로한 시점.'),
        ko('그 토로 직후 본인이 최수민에게 알린 사실.'),
      ],
      cannotDisprove: [
        ko('실제 송다은 아버지가 예비신랑에게 보낸 직접 메시지는 본인이 본 영역 밖.'),
        ko('최수민과 예비신랑의 1:1 메시지 전체는 모름.'),
      ],
    },
  },
},
```

### knowledgeScope — 변경 없음

Cycle 7에서 사용자 확정 ("회사에서 예비신랑이 떠벌린 이야기를 우연히 듣고 최수민에게 알린 적이 있다"). e-5 reframe의 핵심 chain 증언자 영역으로 자연 정합.

### address / hiddenAgenda / bias / distortionRisk — 변경 없음

모두 그대로 유지.

---

## 2. dc-3 (단서 "같은 부탁") reword

**위치**: `friend-01.case.ts` line 2398 ~ 2464 영역

### label — 변경 없음

```typescript
label: ko('같은 부탁'),
```

사용자 권위 확정 ("같은 부탁" 현 유지 OK).

### description

**Before**:
```typescript
description: ko('현재 문자와 과거 송금 흐름을 붙여 아버지의 반복 패턴을 확정하는 카드.'),
```

**After**:
```typescript
description: ko('예비신랑이 떠벌린 흔적과 과거 송금 흐름을 붙여 아버지의 반복 시도 패턴을 확정하는 카드.'),
```

### noteText

**Before**:
```typescript
noteText: ko(
  '송다은 아버지가 예비신랑에게 보낸 문자와 과거 최수민에게 보낸 송금 부탁이 거의 동일한 흐름이다.',
),
```

**After**:
```typescript
noteText: ko(
  '송다은 아버지가 예비신랑에게 결혼 자금 명목으로 시도한 흐름이 과거 최수민에게 보낸 송금 부탁과 거의 동일하다.',
),
```

### successConditionSummary — 변경 없음

`['e-5가 Original 이상', 'e-6이 Original 이상', 'd-2가 S3 이상']` 그대로 유지.

### successEffects

**Before**:
```typescript
successEffects: [
  ko('송다은 아버지의 현재 접근이 과거와 연결됨'),
  ko('d-4 해금에 필요한 반복 패턴 확정'),
],
```

**After**:
```typescript
successEffects: [
  ko('송다은 아버지의 현재 시도가 과거와 연결됨'),
  ko('d-4 해금에 필요한 반복 패턴 확정'),
],
```

**변경 영역**: "현재 접근" → "현재 시도"

### challenges.b.q1

**Before**:
```typescript
challenges: {
  b: {
    questions: [
      {
        id: 'dc-3.b.q1',
        text: ko('같은 돈 부탁을 다시 봤다면, 왜 이번에도 혼자 막는 쪽을 택했습니까?'),
        lockedHint: ko('현재 문자와 과거 송금 흐름이 함께 열려야 보입니다.'),
        // ...
      },
    ],
  },
},
```

**After**:
```typescript
challenges: {
  b: {
    questions: [
      {
        id: 'dc-3.b.q1',
        text: ko('같은 돈 부탁을 다시 봤다면, 왜 이번에도 혼자 막는 쪽을 택했습니까?'),
        lockedHint: ko('떠벌림 흔적과 과거 송금 흐름이 함께 열려야 보입니다.'),
        // ...
      },
    ],
  },
},
```

**변경 영역**: `lockedHint` "현재 문자와" → "떠벌림 흔적과"

`text` 유지 (B character 자제 톤 + 차단 동기 정합).

### leadLine / interpretationChoices — 변경 없음

`L-3` Beneficiary Lead 영역 모두 유지. `L-3-A/B/C` 모두 frame 그대로 유효.

### linkedEvidence — 변경 없음

`['e-5', 'e-6']` 유지.

### effects / judgeHint — 변경 없음

모두 그대로 유지.

---

## 3. combine-3 reword

**위치**: `friend-01.case.ts` line 2628 ~ 2641 영역

### discoveryText

**Before**:
```typescript
discoveryText: ko('송다은 아버지가 예비신랑에게 보낸 문자와 과거 최수민에게 보낸 송금 부탁 흐름이 거의 동일하다.'),
```

**After**:
```typescript
discoveryText: ko('예비신랑이 회사에서 떠벌린 아버지의 결혼 자금 요청과 과거 최수민에게 보낸 송금 부탁이 거의 동일한 흐름이다.'),
```

### surfaceFallback

**Before**:
```typescript
surfaceFallback: ko('과거와 현재 자금 부탁 흐름을 대조 중.'),
```

**After**:
```typescript
surfaceFallback: ko('과거 송금 흐름과 현재 떠벌림 흔적을 대조 중.'),
```

### inputs / outputId / cost / route / gate — 변경 없음

`['e-5', 'e-6']` / `'dc-3'` / `1` / `'evidence_combine'` / gate 영역 모두 유지.

---

## 4. combine-5 검토 (변경 가능성 영역)

**위치**: `friend-01.case.ts` line 2659 ~ 영역

combine-5 = e-4 + e-7 → dc-1 (Line D 영역). e-5 reframe과 직접 무관.

`discoveryText: ko('예비신랑의 접근과 대조표를 합치면, 최수민의 연락이 경고였다는 결론이 강화된다.')` — **"경고"** 단어 사용. d-3 영역 reword 정책 ("경고" → "차단/직접 연락해 막으려")과 정합 검토 권장.

**검토 권장 변경**:
```typescript
discoveryText: ko('예비신랑의 접근과 대조표를 합치면, 최수민의 연락이 결혼 위기 차단이었다는 결론이 강화된다.'),
```

CT 세션 적용 시 본 변경 포함 여부 사용자에게 확인 권장 (combine-5는 Line D 영역이라 본 의뢰서 영역 경계).

---

## 5. d-3.lieConfig — 검토 (변경 가능성 영역)

`d-3.lieConfig.b.lieMotive = 'third_party_protection'` — B의 거짓 동기가 "제3자 보호". e-5 reframe 후에도 유효 ("결혼 위기 차단" = 제3자(예비신랑+다은이) 보호).

→ **변경 없음**.

A의 `lieMotive = 'third_party_protection'` (아버지 보호) — 변경 없음.

---

## 적용 후 검증

- `npx tsc --noEmit` PASS
- `npm run build` PASS — derived layer 자동 sync (`build-core-case.mjs` 실행)
- `npm run -s qa:fast` PASS

---

## CT 세션 적용 순서 권장

1. `02-authority-e5-spec.md` (e-5 전체 재구성) 적용
2. `03-authority-d3-spec.md` (d-3 reword) 적용
3. `04-authority-w2-dc3-combine3-spec.md` (본 문서, w-2 + dc-3 + combine-3) 적용
4. `npx tsc --noEmit` 확인
5. `npm run build` (build-core-case.mjs 자동 실행으로 cases/generated/derived 4 layer sync)
6. `npm run -s qa:fast` 확인 — RELEASE READY 보장
7. 그 다음 `05-scriptedtext-affected-areas.md` 가이드로 ScriptedText KO 영역 reword 진행
8. 다시 검증 + commit + 다국어 sync 영역 식별
