# 스레드 B 완료 보고 — 심문/NPC 대화 품질 관리

> 담당: 스레드 B (NPC 대화 품질)
> 완료일: 2026-04-04
> 상태: **전 작업 완료, 원본 반영 완료, 빌드 통과**

---

## 작업 요약

| 작업 | 대상 | 결과 |
|------|------|------|
| v2-atoms 진실 조기 노출 교정 | 7건 전체 | **교정 완료 + 검증 통과** |
| 재판관 질문 엔진 수정 | judgeQuestionEngine.ts | **코드 수정 완료** |
| 시스템 메시지 스포일러 제거 | useActionDispatch.ts | **6건 수정 완료** |

---

## 1. v2-atoms Progressive Truth Throttle 교정 (7건)

### 발견된 문제
전 7건의 v2-atoms에서 S0~S2 상태의 atoms가 Progressive Truth Throttle을 위반하고 있었음.
총 **320건 이상**의 개별 위반:
- `slots`의 `fullName`, `exact`, `role`, `institution` 등이 S0부터 S5까지 동일한 값으로 들어있어, 초기 상태에서 인물 실명/기관명/구체적 금액이 그대로 노출
- `factText`에 구체적 진실이 직접 기재 (예: "PDF상 박서윤이 23시 48분 최종 수정자")
- `suppressions`에서 숨기라고 명시한 정보가 같은 상태의 `slots`에 그대로 노출되는 모순

### 교정 내용

**1차 교정 (GPT Pro 7 세션 병렬)**
- 7건 전체의 `claimAtoms` (factText + slots) 교정
- S0-S1: fullName→neutral, exact→neutral, role→"관계자", institution→"해당 기관"
- S2: fullName→neutral, judgeRef→성씨만, exact→rounded 수준
- S3+ 원본 보존

**2차 교정 (GPT Pro 1 세션)**
- 4건(workplace-01, partnership-01, friend-01, family-01)의 narrative 필드 교정
- `publicClaim`, `privateKnowledge`, `suppressions`에 남아있던 실명/금액/기관명 제거
- family-01의 어색한 문장 3건 추가 수동 교정

### 검증 결과

| 사건 | 1차 교정 | 2차 교정 | 최종 |
|------|---------|---------|------|
| spouse-01 | ALL PASS | 불필요 | **PASS** |
| workplace-01 | atom PASS, narrative FAIL | ALL PASS | **PASS** |
| partnership-01 | atom PASS, narrative FAIL | ALL PASS | **PASS** |
| neighbor-01 | ALL PASS | 불필요 | **PASS** |
| friend-01 | atom PASS, narrative FAIL | ALL PASS | **PASS** |
| family-01 | atom PASS, narrative FAIL | ALL PASS + 수동 3건 | **PASS** |
| tenant-01 | ALL PASS | 불필요 | **PASS** |

검증 항목: JSON 유효성, 구조 보존, S3+ 미변경, S0-S1 금지어 부재, S2 금지어 부재, suppression 모순 해소, 의미 일관성

### 반영 위치

| 사건 | 파일 경로 |
|------|----------|
| spouse-01 | `src/data/claimPolicies/spouse-01-v2-atoms.json` |
| family-01 | `docs/ref/리뉴얼참고/gpt-session2/output/family-01-v2-atoms.json` |
| friend-01 | `docs/ref/리뉴얼참고/gpt-batch/friend-01/friend-01-v2-atoms.json` |
| neighbor-01 | `docs/ref/리뉴얼참고/gpt-batch/neighbor-01/neighbor-01-v2-atoms.json` |
| partnership-01 | `docs/ref/리뉴얼참고/gpt-batch/partnership-01/partnership-01-v2-atoms.json` |
| tenant-01 | `docs/ref/리뉴얼참고/gpt-batch/tenant-01/tenant-01-v2-atoms.json` |
| workplace-01 | `docs/ref/리뉴얼참고/gpt-batch/workplace-01/workplace-01-v2-atoms.json` |

---

## 2. 재판관 질문 엔진 수정

**파일:** `src/engine/judgeQuestionEngine.ts`

### 문제
`extractDisputeSubject()`가 dispute name에서 소유격/금액만 제거하므로, "외도 상대인가", "비밀 송금" 같은 스포일러 소재가 재판관 질문에 그대로 노출.

### 수정 내용

**`extractDisputeSubject()` 강화:**
- 스포일러 단어 15개 패턴 추가 제거: `외도|횡령|착복|사기|배임|도박|폭행|학대|불륜|간통|위조|은닉|유용|탈세|비밀`
- 금액 패턴 강화: `[\d,]+만?\s*원` 제거
- 날짜/시간 패턴 추가: `\d+월\s*\d+일`, `\d+시` 제거
- 빈 결과 시 "해당 사안" fallback

**질문 템플릿 한국어 개선:**
- `"X 건에 대해"` 반복 → `"X에 대해"`, `"X과 관련하여"` 등 자연스러운 조사로 변경
- fact_pursuit, motive_search, empathy_approach 3개 함수 모두 적용

---

## 3. 시스템 메시지 스포일러 제거

**파일:** `src/hooks/useActionDispatch.ts`

| 위치 | Before | After | 문제 유형 |
|------|--------|-------|----------|
| L495 | `"${truth.fact}"` 직접 출력 | `"새로운 단서가 확인되었습니다. 증거 게시판을 확인해 보십시오."` | 진실 내용 직접 노출 |
| L1740 | `"${dispute.name}": ${intensityLabel}` | `${intensityLabel}` | dispute name 스포일러 |
| L1802 | `"사실 확인 — ${truth?.fact}"` | `"결정적 진술이 확보되었습니다. 증거 게시판에서 확인하십시오."` | 진실 내용 직접 노출 |
| L1897 | `"거짓말은 무너졌지만"` | `"방어가 무너졌지만"` | 유죄 전제 표현 |
| L1912 | `"— "${dispute?.name}"` | 제거 | dispute name 스포일러 |
| L1926 | `"거짓말 상태가 변했다"` | `"진술 태도에 변화가 감지된다"` | 내부 메커닉 직접 노출 |

---

## 4. 빌드 상태

```
tsc --noEmit → 에러 없음 (PASS)
```

---

## 5. 다른 스레드에 영향을 주는 사항

### 스레드 A (엔진/데이터)에 전달
- v2-atoms 7건의 S0-S2 slots가 변경됨 → `blueprintPromptBuilder`에서 slot 선택 로직이 neutral/exact를 구분하는지 확인 필요
- 현재 slots 구조: S0-S1에서는 `fullName`과 `exact` 값이 `neutral`과 동일하게 설정됨. 엔진이 S0-S1에서 `exact`를 읽어도 안전하지만, 향후 엔진 측에서 `visibleSlotKeys` 같은 구조적 게이팅을 추가하면 더 견고해짐.

### 스레드 C (증거/UI)에 전달
- 시스템 메시지가 변경됨: 진실 발견 시 구체 내용 대신 "증거 게시판을 확인하십시오"로 유도. 증거 게시판 UI에서 해당 진실을 표시하는 흐름이 정상 동작하는지 확인 필요.

### 스레드 D (플레이테스트)에 전달
- 7건의 atom 데이터 + 재판관 질문 + 시스템 메시지가 모두 변경됨. spouse-01 또는 workplace-01로 S0→S5 풀 플레이스루 테스트 권장.

---

## 6. 작업 산출물 전체 목록

```
코드 수정 (2파일):
  src/engine/judgeQuestionEngine.ts
  src/hooks/useActionDispatch.ts

데이터 교정 (7파일):
  src/data/claimPolicies/spouse-01-v2-atoms.json
  docs/ref/리뉴얼참고/gpt-session2/output/family-01-v2-atoms.json
  docs/ref/리뉴얼참고/gpt-batch/friend-01/friend-01-v2-atoms.json
  docs/ref/리뉴얼참고/gpt-batch/neighbor-01/neighbor-01-v2-atoms.json
  docs/ref/리뉴얼참고/gpt-batch/partnership-01/partnership-01-v2-atoms.json
  docs/ref/리뉴얼참고/gpt-batch/tenant-01/tenant-01-v2-atoms.json
  docs/ref/리뉴얼참고/gpt-batch/workplace-01/workplace-01-v2-atoms.json

GPT 작업 문서 (참고용):
  docs/ref/리뉴얼참고/thread-packages/thread-B/gpt-session-B-atoms/
```
