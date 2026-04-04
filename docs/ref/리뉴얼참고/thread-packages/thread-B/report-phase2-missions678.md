# Phase 2 미션 6/7/8 완료 보고 (GPT 대기 중 병렬 수행)

> 수행일: 2026-04-04
> 상태: **미션 6 수정 완료, 미션 7 PASS, 미션 8 문제 발견 (보고)**

---

## 미션 6: 끼어들기 대사 실전 품질 검증

**대상:** `src/engine/interjectionV2.ts` — ARCHETYPE_LINES 24종 + 고감정 변형 13종 + fallback 4종 = **41건**

### 검수 결과: 9건 수정 완료

| # | archetype | level | 문제 | 수정 전 → 수정 후 |
|---|-----------|-------|------|------------------|
| 1 | avoidant | emotional_only | cold_logic 톤 침범 ("맥락") | "제가 알고 있는 맥락과 좀 다릅니다" → "제가 아는 것과 좀 다른 것 같습니다" |
| 2 | avoidant | misbelief_escalation | 논리적 선언 톤 (avoidant답지 않음) | "순서대로 말씀드리겠습니다" → "제 이야기도 좀 들어주십시오" |
| 3 | confrontational | trap_signal | fallback과 표현 중복 | "엉뚱한 쪽으로 갑니다" → "그런 식으로 읽으면 곤란합니다" |
| 4 | cold_logic | trap_signal | 번역체/논문체 | "제시된 자료의 해석에 논리적 오류" → "그 자료를 잘못 읽고 계십니다" |
| 5 | cold_logic | misbelief_escalation | avoidant과 구조 유사 | "정리해서 말씀드리겠습니다" → "사실관계가 틀렸습니다. 정정하겠습니다" |
| 6 | premature_summary | emotional_only | "본 건" 관료적 | "본 건에서" → "지금 이 문제에서" |
| 7 | premature_summary | trap_signal | "본질과 관계가 없습니다" 번역체 | → "핵심이 아닙니다. 엉뚱한 데 시간 쓰지 마시고" |
| 8 | confrontational (고감정) | misbelief_escalation | 재판관 직무 공격 | "왜 가만히 듣고 계십니까" → "왜 그냥 넘어갑니까! 제가 증명하겠습니다!" |
| 9 | fallback | misbelief_escalation | 맥락 없이 추상적 | "그 조합이면 누가 봐도" → "지금 그 말씀은 사실과 다릅니다" |

**빌드: PASS** (`tsc --noEmit` 에러 없음)

---

## 미션 7: 시스템 메시지 전수 검토

**대상:** `src/hooks/useActionDispatch.ts` — addDialogue({speaker:'system'|'judge'}) 전수

### 검수 결과: **42건 전부 PASS**

- 진실 노출: 0건
- 유죄 전제: 0건
- 메커닉 직접 노출: 0건
- dispute.name 노출: 0건
- Phase 1 수정 6건: 모두 정상 유지 확인

### 사소한 관찰 2건 (수정 불필요)
1. **L1945** `"모순의 핵심을 놓쳤다..."` — 약간 딱딱하나 내레이터 톤으로 허용 범위
2. **L2129** `"[모순 추궁 맥락]"` — LLM 프롬프트용 시스템 메시지. UI에서 필터링되는지 확인 필요 (Thread C/E에 전달)

---

## 미션 8: DossierCard 텍스트 검수

**대상:** 7건 V3 game loop data의 DossierChallengeQuestion.text — **126건**

### 검수 결과 요약

| 사건 | 검수 건수 | 문제 | 심각도 |
|------|----------|------|--------|
| spouse-01 | 18 | 1건 (시점 혼동) | Low |
| workplace-01 | 18 | 2건 (스포일러+해요체) | Medium |
| **friend-01** | **18** | **전 18건 반말/당신체** | **CRITICAL** |
| neighbor-01 | 18 | 0건 | CLEAN |
| partnership-01 | 18 | 3건 (당신+해요체+스포일러) | Medium |
| tenant-01 | 18 | 0건 | CLEAN |
| family-01 | 18 | 구조적 (requiredLieState 누락) | Medium |

### CRITICAL: friend-01 전면 재작성 필요

friend-01의 모든 질문이 **"당신"**을 사용하고 "씨"를 생략:
```
현재: "서도윤, 당신은 18만4천원이 최종액이 아니라고 말합니다..."
필요: "서도윤 씨, 이 금액이 최종 정산액이 아니라는 입장이십니까?"
```
→ **GPT Pro에 재작성 요청 필요** (또는 직접 수정)

### 개별 문제 상세

**spouse-01 d3.a.q1:** "제 아내의" — 재판관이 당사자 시점 채택. "상대방의"로 교체 필요

**workplace-01 d2.b.q3:** "그 심리까지 설명해 보십시오" — 심리분석 요구, 재판관 톤 일탈
**workplace-01 d3.a.q2:** "선행 위반을 가리기 위해" — 위반을 전제 (스포일러)

**partnership-01 d1.b.q1:** "당신도" — 당신 사용
**partnership-01 d2.a.q3:** "가담한 것 아닌가요" — 해요체 + 가담 전제 (스포일러)
**partnership-01 d3.a.q3:** "당신이" — 당신 사용

**family-01:** 텍스트 자체는 양호하나, 모든 질문에 `requiredLieState`가 없어 Progressive Truth Throttle 미적용

### 다음 스레드에 전달할 것
- **Thread C/GPT**: friend-01 DossierCard 질문 18건 전면 재작성
- **Thread A/엔진**: family-01 requiredLieState 구조 보완
- spouse-01, workplace-01, partnership-01: 개별 텍스트 교정 6건

---

## 수정된 파일 목록

| 파일 | 미션 | 변경 |
|------|------|------|
| `src/engine/interjectionV2.ts` | 미션 6 | 9건 대사 교정 |
| (미션 7, 8은 코드 수정 없음 — 보고만) | | |
