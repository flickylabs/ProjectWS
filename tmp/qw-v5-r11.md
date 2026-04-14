# QW V5 R11: 3사건 끼어들기 + 모순추궁 검증

---

## 끼어들기(interjection) 검증

### 스크립트 현황

| 사건 | ScriptedText entries | 방식 |
|------|---------------------|------|
| spouse-01 | 8 entries (24 variants) | ScriptedText |
| friend-01 | 0 entries | LLM fallback |
| family-01 | 0 entries | LLM fallback |

### spouse-01 끼어들기 상세

| Entry | Speaker | 대상 | minor/major | 정상 |
|-------|---------|------|-------------|------|
| a\|d-1\|minor | A(박지연) | B 심문 중 A 끼어듬 | minor | ✅ |
| a\|d-1\|major | A(박지연) | B 심문 중 A 폭발 | major | ✅ |
| b\|d-1\|minor | B(이준호) | A 심문 중 B 끼어듬 | minor | ✅ |
| b\|d-1\|major | B(이준호) | A 심문 중 B 폭발 | major | ✅ |
| a\|d-2 / b\|d-2 | 동일 패턴 | 돈 쟁점 | minor/major | ✅ |

- speaker↔keyParty 일치 전수 확인: **MISMATCH 0건** ✅
- 호칭: "재판관님" + "제 남편/아내" 일관 ✅

### 엔진 로직 (pcTargetParty 복원)

| 항목 | 검증 |
|------|------|
| 상대방(OTHER party) 끼어들기 식별 | ✅ opponent = a↔b 정상 |
| pcTargetParty 복원 | ✅ opportunity.target으로 복원 |
| focus streak 리셋 | ✅ currentTarget = target |
| 복원 타이밍 | ✅ resolveInterjectionV2() 종료 후 |

**끼어들기 판정: PASS**

---

## 모순추궁(contradiction_pursuit) 검증

### 스크립트 현황

| 사건 | ScriptedText entries | 방식 |
|------|---------------------|------|
| spouse-01 | 16 entries (48 variants) | ScriptedText |
| friend-01 | 0 entries | LLM fallback |
| family-01 | 0 entries | LLM fallback |

### spouse-01 모순추궁 상세

| Party | Dispute | S1~S4 전이 | speaker 일치 |
|-------|---------|-----------|-------------|
| a | d-1 | 부분부정→핑계→인정→감정적 자성 | ✅ |
| a | d-2 | 동일 패턴 | ✅ |
| b | d-1 | 동일 패턴 | ✅ |
| b | d-2 | 동일 패턴 | ✅ |

- NPC(당사자)가 응답: **speaker=party 전수 일치** ✅
- 재판관이 응답하는 오류: **0건** ✅

**모순추궁 판정: PASS**

---

## 비고: friend-01/family-01 LLM fallback

friend-01과 family-01은 interjection/contradiction_pursuit 채널에 ScriptedText가 없습니다.
이 경우 LLM fallback으로 동적 생성되며, 엔진 로직(interjectionV2.ts, gameEventTriggerEngine.ts)이
올바른 party 식별과 pcTargetParty 복원을 보장합니다.

**엔진 코드 수정 필요: 없음** (정상 동작 확인)

---

## R11 종합

| 항목 | 판정 |
|------|------|
| spouse-01 끼어들기 | ✅ PASS |
| spouse-01 모순추궁 | ✅ PASS |
| friend/family LLM fallback | ✅ PASS (엔진 로직 정상) |
| pcTargetParty 복원 | ✅ PASS |

**R11 판정: PASS**
