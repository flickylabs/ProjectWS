# Session A: 이중 구조 정리 미션

> 발신: CT
> 수신: Session A (별도 스레드)
> 일시: 2026-04-06
> 선행 조건: Codex 엔진 감사 보고서 (codex-engine-audit-report.md) 읽을 것

---

## 배경

Codex 엔진 감사에서 **끼어들기/쟁점 발현/강제 판결에 이중~3중 구조**가 발견됨.
Phase 2(재미 증대)를 시작하기 전에 기반을 정리해야 함.

**핵심 원칙**: 새 기능 추가 금지. 기존 코드 정리만. canonical을 고정하고 legacy를 제거.

---

## 미션 1: 끼어들기 이중 구조 정리

### 현재 상태 (3중)
1. **Legacy**: `pendingInterjection` + `CourtLayout.tsx`
2. **V2**: `pendingInterjectionV2` + `GameEventModal.tsx`
3. **V3**: `pendingGameEvent(type='interjection')` + `GameEventModal.tsx`

### 결정: V2를 canonical로

### 작업
1. `src/hooks/useActionDispatch.ts`에서 `pendingInterjection` (V1) 설정 경로 → `pendingInterjectionV2`로 통합
2. `src/components/layout/CourtLayout.tsx`에서 `pendingInterjection` 관련 UI/로직 제거
3. `src/store/useGameStore.ts` 또는 slices에서 `pendingInterjection` 상태 필드가 있으면 제거 (V2 필드만 유지)
4. `src/engine/gameEventTriggerEngine.ts`에서 interjection을 `pendingGameEvent`로 보내는 경로가 있으면 V2 경로로 통합
5. `GameEventModal.tsx`에서 V2 + V3 양쪽에서 interjection을 처리하는 부분이 있으면 V2로 통일

### 확인 방법
- grep `pendingInterjection[^V]` → 0건이어야 함 (V2가 아닌 legacy 참조 없음)
- 게임 진행 중 끼어들기가 정상 작동하는지 (GameEventModal에서 표시)

---

## 미션 2: 쟁점 발현 이중 구조 정리

### 현재 상태 (2중)
1. **Discovery**: `pendingEmergence` + `DisputeEmergenceModal.tsx`
2. **EventTrigger**: `pendingGameEvent(type='dispute_emergence')` + 인라인 모달

### 결정: Discovery를 canonical로

### 작업
1. `src/engine/gameEventTriggerEngine.ts`의 `checkDisputeEmergence()`가 `pendingGameEvent`에 쓰는 경로 → `discoverySlice`의 `pendingEmergence`로 리다이렉트 (또는 discovery 경로만 남기고 event trigger ���로 제거)
2. `src/hooks/useDiscoveryIntegration.ts`의 `checkEmergence()` / `emergeDispute()`가 canonical 경로
3. `GameEventModal.tsx`에서 `dispute_emergence` 타입 이벤트 처리 → `DisputeEmergenceModal.tsx`로 위임되도록 확인
4. 인라인 모달이 있으면 제거하고 `DisputeEmergenceModal.tsx`로 통일

### 확인 방법
- grep `dispute_emergence` → GameEventModal에서 직접 처리하지 않고 DisputeEmergenceModal로 위임
- `pendingEmergence` 경로만 살아있어야 함

---

## 미션 3: 강제 판결 이중 구조 정리

### 현재 상태 (2중)
1. `src/engine/readinessEngine.ts`의 `checkForcedVerdict()` — **구현됨 but 미호출**
2. `src/store/slices/phaseSlice.ts`에서 MAX_TURNS 직접 비교 — **실제 가동 중**

### 결정: 통합 (readinessEngine을 canonical로)

### 작업
1. `readinessEngine.ts`의 `checkForcedVerdict()` 함수 시그니처와 로직 확인
2. `phaseSlice.ts`의 MAX_TURNS 비교 로직을 `checkForcedVerdict()` 호출로 교체
3. 강제 판결 조건을 readinessEngine 한 곳에서 관리하도록

### 확인 방법
- phaseSlice에서 MAX_TURNS 직접 비교 코드 제거됨
- readinessEngine.checkForcedVerdict()가 실제 호출됨

---

## 공통 주의사항

1. **새 기능 추가 금지** — 정리만
2. **기존 동작 보존** — 정리 후 게임 동작이 달라지면 안 됨
3. **테스트**:
   - `npx tsc --noEmit` PASS
   - `npx vite build` PASS
   - grep으로 legacy 참조 0건 확인
4. **참조 문서**: `docs/ref/리뉴얼참고/codex-engine-audit-report.md` — Codex 감사 보고서
5. **CLAUDE.md** 먼저 읽어서 프로젝트 구조 파악

---

## 산출물

1. 수정된 코드 파일들
2. 종료 보고:
   ```
   ## Session A 종료 보고
   - 변경 파일: [목록]
   - 바뀐 UX: 없음 (내부 정리만)
   - 남은 리스크: [있으면]
   - 다음 체크포인트: [무엇을 확인해야 하는가]
   ```

---

## 전달 메시지

> 너는 솔로몬 법정 게임의 **Session A (품질 잠금)** 세션이야.
>
> **먼저 읽을 파일 2개:**
> 1. `CLAUDE.md` — 프로젝트 전체 구조
> 2. `docs/ref/리뉴얼참고/codex-engine-audit-report.md` — Codex 엔진 감사 보고서
>
> **미션**: `docs/ref/리뉴얼참고/session-A-dual-structure-cleanup.md` 읽고 실행
>
> 끼어들기(3중→V2), 쟁점 발현(2중→Discovery), 강제 판결(2중→readinessEngine) 정리.
> 새 기능 추가 금지. 기존 동작 보존. 정리만.
> 완료 후 빌드 검증(tsc + vite build) 필수.
