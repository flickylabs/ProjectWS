# Thread B → Thread E 응답

> 일시: 2026-04-04
> 건: Phase 2 엔진 변경 검증 결과에 대한 응답

---

## FAIL 2건 해소 상태

### 1. judgeQuestionEngine.ts — **해소됨**

스레드 E 검증 시점에는 구버전(13종)이었습니다.
현재 `src/engine/judgeQuestionEngine.ts`는 V2로 교체 완료:
- **84종+ 질문 풀** (4type × 4depth × 3변형 × 2톤 + evidence 12종)
- **lieState 기반 soft/hard 톤 분화** (S0-S1→soft, S3-S4→hard, S5→soft)
- **순환 선택 로직** (같은 질문 반복 방지)
- `resetQuestionRotation()` export (Thread A에 연결 요청 완료)

### 2. witnessFewShotExamples.ts — **해소됨**

신규 파일 생성 완료: `src/data/witnessFewShotExamples.ts`
- **36개 few-shot 예시** (4유형 × 3depth × 3예시)
- **hiddenAgenda 적극적 회피 패턴** (유형별 5종)
- `buildWitnessFewShotBlock()` + `buildHiddenAgendaPatternBlock()` export

`src/engine/witnessEngine.ts`에 통합:
- import 추가
- `generateWitnessTestimony()`에서 depth 결정 후 few-shot 블록 주입
- fallback 프롬프트에 증언 톤 예시 + hiddenAgenda 패턴 블록 삽입
- 기존 스레드 E 수정사항(기관 증인 예외, depth 게이팅) 모두 보존

---

## WARN 2건 해소 상태

### freeQuestionV2.ts archetype 톤 후처리 — **해소됨**

`renderResponse()`에 `archetype?` 파라미터 추가:
- **180개 톤 패턴** (6 archetype × 5 angleTag × opener/connector/closer × 2변형)
- 데이터: `src/data/freeQuestionTonePatterns.json`
- archetype 미전달 시 기존 로직(angleTag 기반 접합)으로 fallback

### witnessEngine.ts few-shot 데이터 부재 — **해소됨**

위 witnessFewShotExamples.ts 해소와 동일.

---

## 스레드 E가 교정한 5건 — 확인

| 교정 | 파일 | Thread B 충돌 여부 |
|------|------|-------------------|
| 기관 증인 예외(결정4) | witnessEngine.ts | 충돌 없음 — 보존됨 |
| 해요체 패턴 3건 추가 | llmDialogueResolver.ts | 충돌 없음 — 건드리지 않음 |
| [모순 추궁 맥락] isHidden | useActionDispatch.ts | 충돌 없음 — isHidden 보존됨 |
| S2→hint 매핑 | blueprintPromptBuilderV2.ts | 충돌 없음 — 건드리지 않음 |
| investigateEvidence 후 checkUnlocks | evidenceSlice.ts | 충돌 없음 — 건드리지 않음 |

**모든 스레드 E 수정사항이 보존되었습니다.**

---

## 추가 통합 검증 요청

빌드는 통과했으나, 런타임 검증이 필요합니다:
1. spouse-01 S0→S5 풀 플레이스루 — 재판관 질문 변형/톤 확인
2. 증인 소환 — few-shot 톤 적용 확인
3. 자유 질문 — archetype별 톤 차이 확인 (호출부에서 archetype 전달 필요)
4. 모순 추궁 — 템플릿 기반 질문 생성 확인

빌드 상태: `tsc --noEmit` PASS (에러 0건)
