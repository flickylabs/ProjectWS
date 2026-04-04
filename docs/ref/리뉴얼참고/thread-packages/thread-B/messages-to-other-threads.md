# Thread B → 다른 스레드 전달 메시지

> 발신: Thread B (NPC 대화 품질)
> 일시: 2026-04-04
> 건: Phase 2 검수 중 발견한 타 스레드 소관 이슈

---

## → Thread A (엔진/데이터) 전달

### 이슈 1: family-01 DossierCard requiredLieState 누락

**현상:** family-01의 V3 game loop data에서 DossierChallengeQuestion 18건 **전부**에 `requiredLieState`가 없음.
- 다른 6건(spouse, workplace, friend, neighbor, partnership, tenant)은 q1=없음, q2=S2, q3=S3으로 정상 설정
- family-01만 전 질문이 처음부터 해금 → Progressive Truth Throttle 미적용

**파일 위치:** `docs/ref/리뉴얼참고/gpt-session2/output/family-01-v3-game-loop-data.json`

**필요 작업:** 각 DossierCard의 질문에 requiredLieState 추가
```
q1: (없음) — 처음부터 해금
q2: "S2"
q3: "S3"
```

**참고:** 텍스트 자체는 양호함. 구조 데이터만 보완하면 됨.

---

### 이슈 2: judgeQuestionEngine.v2.ts의 rotationState 리셋

**현상:** GPT Pro가 만든 새 엔진에 질문 순환 선택용 `rotationState` (Map)이 모듈 레벨에 있으나, 게임 세션 간 리셋 함수가 없음.

**필요 작업:** 게임 초기화 시 `resetRotationState()`를 호출하는 로직 추가 (store 초기화 흐름에서).
나는 함수만 export하고, 호출 위치는 Thread A가 판단해서 연결해 주세요.

---

## → Thread E (통합검증) 전달

### 이슈 1: `[모순 추궁 맥락]` 시스템 메시지 UI 필터링 확인

**현상:** `useActionDispatch.ts` L2129에서 모순 추궁 시 LLM 프롬프트용 시스템 메시지를 삽입:
```typescript
text: `[모순 추궁 맥락] 이전: "${previousClaim.slice(0, 60)}" → 현재: "${currentClaim.slice(0, 60)}". 이 모순에 대해 해명해야 합니다.`
```

이것은 **LLM 컨텍스트용**이지 플레이어에게 보여서는 안 됨.

**확인 필요:** UI 채팅 렌더러에서 `[모순 추궁 맥락]` 접두어가 붙은 system 메시지를 필터링/숨김 처리하는지 확인. 미처리 시 플레이어에게 내부 메커닉이 노출됨.

**파일 위치:**
- 메시지 생성: `src/hooks/useActionDispatch.ts` L2129
- 렌더링: `src/components/` 내 채팅 컴포넌트 (DialoguePanel 등)

---

### 이슈 2: Phase 2 전체 변경 사항 통합 검증 요청

Thread B Phase 2에서 변경된 파일 목록:

| 파일 | 변경 내용 |
|------|----------|
| `src/engine/judgeQuestionEngine.ts` | 13종→84종+ 질문 풀, lieState 톤 분화, 순환 선택 |
| `src/engine/interjectionV2.ts` | 끼어들기 대사 9건 교정 (archetype 톤 정밀화) |
| `src/engine/freeQuestionV2.ts` | 6 archetype × 5 angleTag 캐릭터 톤 후처리 |
| `src/engine/witnessEngine.ts` | few-shot 36예시 삽입 + hiddenAgenda 패턴 + depth 길이 규칙 |
| `src/data/witnessFewShotExamples.ts` | 신규: 증인 few-shot 데이터 모듈 |
| 7건 case JSON | evidence 텍스트 교정 (45건) |
| 7건 V3 game loop JSON | DossierCard 질문 교정 (24건, GPT 대기중) |

**검증 요청:**
1. spouse-01 또는 workplace-01로 **S0→S5 풀 플레이스루** — 재판관 질문 변형/톤 변화 확인
2. 증인 소환 테스트 — few-shot 톤이 실제 적용되는지
3. 자유 질문 테스트 — archetype별 톤 차이 확인
4. 모순 추궁 테스트 — S0→S2 전이 시 추궁 질문 생성 확인

---

## → Thread C (데이터 생성) — 해당 없음

현재 Thread C에 전달할 이슈 없음.
DossierCard 교정은 GPT Pro를 통해 Thread B에서 직접 처리 중.

---

## → Thread D (기획) — 해당 없음

현재 Thread D에 전달할 이슈 없음.
Phase 2 변경은 기존 설계 내 품질 고도화이므로 기획 변경 없음.
