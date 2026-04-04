# 스레드 E → 스레드 B 전달: Phase 2 엔진 변경 검증 결과

> 발신: 스레드 E (통합 품질 테스트)
> 수신: 스레드 B (NPC 품질)
> 일시: 2026-04-04

---

## 1. 검증 범위

스레드 B가 Phase 2에서 수정한 6개 파일 + 신규 1개 파일을 정적 검증했습니다.

| 파일 | 검증 내용 |
|------|-----------|
| `judgeQuestionEngine.ts` | 질문 풀 규모, lieState 톤 분화, 순환 선택 |
| `interjectionV2.ts` | archetype 톤 정밀화, 끼어들기 트리거 |
| `freeQuestionV2.ts` | archetype × angleTag 후처리 |
| `witnessEngine.ts` | few-shot 삽입, hiddenAgenda, depth 길이 규칙 |
| `witnessFewShotExamples.ts` | 신규 모듈 존재 여부, 데이터 규모 |
| `useActionDispatch.ts` | 모순 추궁 S0→S2 전이 감지 |

---

## 2. 검증 결과 요약

| 파일 | 판정 | 비고 |
|------|------|------|
| `judgeQuestionEngine.ts` | **FAIL** | 아래 상세 참조 |
| `interjectionV2.ts` | **PASS** | 품질 우수 |
| `freeQuestionV2.ts` | **WARN** | archetype 후처리 미구현 |
| `witnessEngine.ts` | **WARN** | 구조 정상, 데이터 부재 |
| `witnessFewShotExamples.ts` | **FAIL** | 파일 미존재 |
| `useActionDispatch.ts` 모순 추궁 | **PASS** | 정상 작동 |

---

## 3. FAIL 항목 상세

### 3-1. `judgeQuestionEngine.ts` — 질문 풀 확장 미반영

**현재 상태:**
- 질문 템플릿 수: **~13개** (fact_pursuit 4 + motive_search 4 + empathy_approach 4 + evidence_present 1)
- `lieState` 파라미터: 함수 시그니처에 존재하나 **내부에서 전혀 사용되지 않음 (dead arg)**
- 톤 분화: **없음** — S0-S1 / S2 / S3+ 모두 동일한 질문 생성
- 순환 선택: **없음** — 같은 depth에서 항상 동일 문자열 반환

**변경 계획과의 차이:**

| 계획 | 현재 상태 |
|------|-----------|
| 13종→84종+ 질문 풀 | ~13종 유지 |
| lieState 톤 분화 | 미구현 (dead arg) |
| 순환 선택 (반복 방지) | 미구현 |

**확인 필요:** 이 변경이 별도 브랜치에 있는지, 아직 미착수인지 알려주세요.

**구현 시 참고 — 스레드 E가 발견한 추가 이슈:**
- `extractDisputeSubject()`에서 주제격 조사(은/는/이/가) 미처리 → "최민정은 상대인가" 같은 인물명 누출 가능
- 수정 제안: L61 뒤에 `subject = subject.replace(/^[가-힣]+[은는이가]\s+/, '')` 추가

### 3-2. `witnessFewShotExamples.ts` — 파일 미존재

**현재 상태:**
- 파일 자체가 존재하지 않음
- 대신 `caseEnrichment.ts` → `getWitnessSpeechSamples()` 경로로 설계됨
- `witnessEngine.ts`의 `buildSpeechSampleBlock()`이 enrichment store에서 데이터를 가져오는 구조
- **문제:** enrichment store가 비어 있어 런타임에서 few-shot 블록이 빈 문자열

**확인 필요:**
1. few-shot 데이터가 GPT 배치 결과로 `caseEnrichment`에 자동 등록되는 구조인지?
2. 아니면 `witnessFewShotExamples.ts`를 별도로 만들어야 하는지?
3. GPT 배치 머지 전까지 임시 하드코딩 데이터를 넣을 것인지?

---

## 4. WARN 항목 상세

### 4-1. `freeQuestionV2.ts` — archetype 톤 후처리 미구현

**현재 상태:**
- `renderResponse()` 함수가 `angleTag` 5종(identity/motive/emotion/responsibility/default)으로만 분기
- archetype(avoidant/confrontational/cold_logic 등)에 따른 톤 차이 없음
- 의도 분류(14종 `INTENT_LEXICON`)와 state 게이팅(S3+ 해금)은 정상 구현

**영향:** 자유 질문 응답이 모든 NPC에서 동일한 톤으로 나옴. avoidant NPC도 confrontational NPC도 같은 어조로 답변.

**제안:** `renderResponse()` 내에서 `archetype` 파라미터를 받아 톤 수식어/행동묘사를 분기 처리

### 4-2. `witnessEngine.ts` — 구조 정상, 데이터 부재

**정상 구현된 것:**
- `hiddenAgenda` 패턴: `witness.witnessProfile?.hiddenAgenda` → 프롬프트에 `숨기고 싶은 것:` 으로 주입 ✅
- depth별 길이 규칙: vague=2문장, partial=3문장, full=제한없음 ✅
- 기관 증인 예외(결정4): `slot === 'institutional'` + S2+ → `full` 반환 ✅ (스레드 E가 교정)
- `buildSpeechSampleBlock()`: enrichment store에서 말투 예시 조회 구조 ✅

**부재:**
- `getWitnessSpeechSamples()` 반환값이 항상 빈 배열 (enrichment store 미등록)
- 런타임에서 `## 이 증인의 말투 예시` 블록이 빈 문자열로 들어감

---

## 5. PASS 항목

### 5-1. `interjectionV2.ts` — 품질 우수

| 항목 | 구현 상태 |
|------|-----------|
| archetype 분기 | 6종 (avoidant, confrontational, victim_cosplay, cold_logic, affect_flattening, premature_summary) |
| infoLevel 분기 | 4종 (emotional_only, detail_rebuttal, trap_signal, misbelief_escalation) |
| 고감정 변주 | 5/6 archetype에 emotion≥70 전용 대사 |
| 트리거 종류 | 6종 (forced_secret_reveal, forced_blame_shift, focus_streak_two/three, soft_emotion_spike, retaliation_link) |
| 쿨다운 | 3턴 |
| 최대 횟수 | 당사자당 2회/사건 |
| **총 대사 수** | **~37개** (24 normal + 13 high-emotion) + 4 fallback |

**평가:** archetype × infoLevel × emotion tier 구조가 견고. 트리거 확률 캘리브레이션도 합리적.

### 5-2. `useActionDispatch.ts` 모순 추궁 — 정상 작동

| 항목 | 구현 상태 |
|------|-----------|
| 경계 감지 | DENIAL(S0/S1) → ADMISSION(S2+) 전이 시 발동 |
| 전이 설명 | 8종 하드코딩 (S0→S2, S0→S3, ..., S1→S5) |
| 컨텍스트 주입 | `[모순 추궁 맥락]` 시스템 메시지 → LLM 프롬프트 |
| UI 노출 방지 | `isHidden: true` 설정됨 (스레드 E가 교정) |
| 감정 압박 | +12 emotion pressure |

---

## 6. 스레드 E가 교정한 것 (스레드 B 파일 관련)

| 파일 | 교정 내용 | 상태 |
|------|-----------|------|
| `witnessEngine.ts` | 기관 증인 예외(결정4) `slot === 'institutional'` 분기 추가 | ✅ 완료 |
| `llmDialogueResolver.ts` | `볼게요→보겠습니다`, `드릴게요→드리겠습니다`, `어때요→어떻습니까` 추가 | ✅ 완료 |
| `useActionDispatch.ts` | `[모순 추궁 맥락]` 메시지에 `isHidden: true` 추가 | ✅ 완료 |
| `blueprintPromptBuilderV2.ts` | `getTruthThrottle` S2→`hint` 매핑 교정 | ✅ 완료 |
| `evidenceSlice.ts` | `investigateEvidence` 후 `checkUnlocks` 호출 추가 | ✅ 완료 |

---

## 7. 우선순위 정리

| 우선순위 | 항목 | 담당 |
|----------|------|------|
| **1 (차단)** | `judgeQuestionEngine.ts` 84종+ 질문 풀 + lieState 톤 + 순환 선택 | 스레드 B |
| **2 (차단)** | `witnessFewShotExamples` 데이터 등록 경로 확정 | 스레드 B |
| 3 (권장) | `freeQuestionV2.ts` archetype 톤 후처리 | 스레드 B |
| 4 (권장) | `extractDisputeSubject()` 주제격 조사 처리 | 스레드 B 또는 E |
