# 02 — e-5 Authority 전체 재구성 spec

**대상 파일**: `src/data/coreCases/friend-01.case.ts` (line 1995 ~ 2035 영역)
**변경 본질**: e-5 자료 자체 교체 (시안 S1)

---

## Field별 before/after

### name

**Before**:
```typescript
name: ko('송다은 아버지와 예비신랑의 문자'),
```

**After**:
```typescript
name: ko('예비신랑 회사 단톡 떠벌림과 최수민의 9일간 차단 연락'),
```

---

### surfaceName

**Before**:
```typescript
surfaceName: ko('아버지와 예비신랑의 문자'),
```

**After**:
```typescript
surfaceName: ko('떠벌림 흔적과 9일간 메시지'),
```

---

### description

**Before**:
```typescript
description: ko('송다은 아버지가 예비신랑에게 "결혼 전에 잠깐만 도와주면 금방 돌려준다", "다은이한테는 아직 말하지 마"라고 보낸 문자 기록.'),
```

**After**:
```typescript
description: ko('예비신랑 김태윤이 회사 동료 단톡방에서 "다은이 아버지가 결혼 자금 좀 도와달래"라며 토로한 캡처와, 그 시점 직후 최수민이 예비신랑에게 보낸 9일간의 차단 메시지 원본.'),
```

---

### surfaceDescription

**Before**:
```typescript
surfaceDescription: ko('송다은 아버지가 예비신랑에게 돈 이야기를 꺼낸 문자.'),
```

**After**:
```typescript
surfaceDescription: ko('예비신랑이 회사에서 떠벌린 단톡방 캡처와 최수민의 9일간 메시지.'),
```

---

### subjectParty

**Before**:
```typescript
subjectParty: 'both',
```

**After**:
```typescript
subjectParty: 'b',
```

**Rationale**: B의 메시지가 중심 자료 (떠벌림 캡처는 부속 영역).

---

### partyContext

**Before**:
```typescript
partyContext: {
  a: {
    questionAngle: ko('아버지의 이 문자를 알고 있었는지'),
    implication: ko('인지·방관 여부.'),
  },
  b: {
    questionAngle: ko('이 문자를 보고 무엇을 떠올렸는지'),
    implication: ko('과거 동일 패턴 인식.'),
  },
},
```

**After**:
```typescript
partyContext: {
  a: {
    questionAngle: ko('아버지가 예비신랑에게 결혼 자금을 시도했다는 사실을 알고 있었는지'),
    implication: ko('인지·방관 여부.'),
  },
  b: {
    questionAngle: ko('9일간 연락의 실제 의도는 무엇이었는지'),
    implication: ko('결혼 위기 차단 시도 + 과거 동일 패턴 인식.'),
  },
},
```

---

### depthStages

**Before**:
```typescript
depthStages: [
  { id: 'stub', summary: ko('아버지가 예비신랑에게 보낸 문자 1건 존재 표시.') },
  { id: 'excerpt', summary: ko('"결혼 전에 잠깐만 도와주면 금방 돌려준다" 발췌만 보임.') },
  { id: 'original', summary: ko('"사위 될 사람이면 이 정도는 믿어야지" 추가 + 발송 시각 모두 확인.') },
  { id: 'context', summary: ko('최수민의 9일간 연락 시기와 정확히 겹친다는 흐름 복원.') },
  { id: 'established', summary: ko('송다은 아버지가 결혼 자금 명목으로 돈을 꺼내려 했다고 공식기록 채택.') },
],
```

**After**:
```typescript
depthStages: [
  { id: 'stub', summary: ko('예비신랑 회사 단톡 캡처 1건 + 최수민 메시지 1건 존재 표시.') },
  { id: 'excerpt', summary: ko('"다은이 아버지가 결혼 자금 좀 도와달래" 토로 일부 + 최수민 첫 메시지만 보임.') },
  { id: 'original', summary: ko('단톡 전체 + 최수민의 9일간 메시지 원본 확인. "결혼 전에 한 번 얘기해요" 직접 frame까지 포함.') },
  { id: 'context', summary: ko('예비신랑이 단톡 토로 직후 박준혁이 최수민에게 알린 시점 흐름 복원.') },
  { id: 'established', summary: ko('송다은 아버지가 결혼 자금 시도를 했고 그로 인해 최수민이 결혼 위기를 막으려 직접 연락한 것임이 공식기록 채택.') },
],
```

---

### trustStates

**Before**:
```typescript
trustStates: [
  { id: 'submitted', summary: ko('최수민 또는 재판관 측 포착.') },
  { id: 'verifying', summary: ko('예비신랑 휴대폰 원본 확인.') },
  { id: 'authenticated', summary: ko('발신자 + 시각이 모두 일치.') },
  { id: 'challenged', summary: ko('송다은이 단순 인사 frame을 주장.') },
  { id: 'misread', summary: ko('자료는 인증되지만 사기 인지 영역은 봉인 단계.') },
],
```

**After**:
```typescript
trustStates: [
  { id: 'submitted', summary: ko('최수민 또는 박준혁이 단톡 캡처 + 메시지 원본 제출.') },
  { id: 'verifying', summary: ko('단톡 발화 시각 + 메신저 원본 대조.') },
  { id: 'authenticated', summary: ko('발화자 + 시각 모두 일치.') },
  { id: 'challenged', summary: ko('송다은이 단톡 발화는 농담 frame을 주장.') },
  { id: 'misread', summary: ko('자료는 인증되지만 아버지 시도 인지 영역은 봉인 단계.') },
],
```

---

### sensitiveSealTargets — **신규 추가** (현 e-5에는 없음)

```typescript
sensitiveSealTargets: {
  labels: [ko('회사 동료 실명'), ko('최수민 메시지의 사적 톤')],
  recommendedTiming: [
    ko('d-3 S2 이상 도달 시 핵심 영역만 조건부 노출'),
    ko('dc-3 직전'),
  ],
  risks: [
    ko('회사 동료 실명 노출은 박준혁(증인) 신원 보호 영역과 충돌'),
    ko('최수민 메시지의 사적 톤 노출은 B character 보호 약화'),
  ],
},
```

**Rationale**: 새 e-5의 두 영역(회사 단톡 동료 / B 메시지 사적 톤)이 sensitive seal 대상. 현 e-5는 sensitiveSealTargets 없으나 새 e-5는 신원 보호 + character 보호 영역으로 필요.

---

## 변경 없는 field (그대로 유지)

| Field | Value | Rationale |
|---|---|---|
| `id` | `'e-5'` | id 유지 |
| `type` | `'chat'` | 단톡 캡처 + 1:1 메시지 모두 chat |
| `reliability` | `'hard'` | 원본 메시지 + 캡처 모두 hard |
| `completeness` | `'original'` | 원본 자료 |
| `provenance` | `'self_possessed'` | B + w-2 경유 self_possessed |
| `legitimacy` | `'lawful'` | lawful |
| `proves` | `['d-3']` | 유지 |
| `isTrap` | `false` | 유지 |
| `requires` | `['e-1']` | e-1 (B 연락 기록 메타) → e-5 (원본 + 떠벌림) 자연 chain |
| `requiredLieState` | `'S2'` | sealing 유지 |

---

## 적용 후 검증

- `npx tsc --noEmit` PASS (type 영역 변경 없음, 단순 ko() text)
- `npm run build` PASS
- `npm run -s qa:fast` PASS — RELEASE READY 확인 (static P0=0, route P0=0)
  - 특히 truth-leak-matrix gate가 새 e-5 description/depthStages에서 그룹 2 keyword (아버지의 사기/투자 명목 사기/미상환) 미검출 확인 필수
  - 새 단어 "결혼 자금 시도" / "떠벌림" / "차단 연락"은 그룹 2 forbiddenKeywords가 아니라 OK

## 다국어 sync

KO 적용 commit 후 Codex 다국어 sync 의뢰서 별도 작성. 본 변경 영역의 EN/JA/ZH-CN 4언어 sync.

다국어 검토 영역:
- 새 단어 "떠벌림" → EN/JA/ZH-CN 적절 표현 (EN: "blurted out" / JA: "口走った" / ZH-CN: "脱口而出")
- "차단 메시지" / "차단 연락" → EN: "intervention messages" / JA: "歯止め" 또는 "止めようとした" / ZH-CN: "试图阻止的消息"
- "결혼 위기" → EN: "wedding-jeopardy" / JA: "結婚の危機" / ZH-CN: "婚姻危机"
