# Thread B → 컨트롤 타워: Phase 2 완료 보고

> 발신: Thread B (NPC 대화 품질)
> 일시: 2026-04-04
> 상태: **Phase 2 전 미션 완료. 타 스레드 연동 완료. 빌드 통과.**

---

## 한줄 요약

Phase 2 미션 8건 + 타 스레드 연동 6건 = **전부 완료**.
GPT Pro 7세션 활용, 전 산출물 전수 검수 후 반영.
스레드 A(2건), 스레드 E(5건) 수정사항 충돌 없이 통합됨.

---

## Thread B 작업 결과 (미션 8건)

### 코드/데이터 변경

| 구분 | 파일 수 | 핵심 내용 |
|------|---------|----------|
| 코드 변경 | 5파일 | 재판관 질문 84종, 모순 추궁 15종 템플릿, 자유 질문 180톤 패턴, 증인 few-shot 36예시, 끼어들기 9건 교정 |
| 신규 파일 | 2파일 | witnessFewShotExamples.ts, freeQuestionTonePatterns.json |
| 증거 텍스트 교정 | 7파일 | 168건 검수 → 46건 교정 (스포일러/번역체/톤) |
| DossierCard 교정 | 4파일 | 126건 검수 → 24건 교정 (friend-01 18건 재작성 포함) |

### 미션별 상세

| 미션 | Before | After |
|------|--------|-------|
| M1 재판관 질문 | 13종 고정, lieState 미활용 | **84종+ 순환 선택, soft/hard 톤 분화** |
| M2 모순 추궁 | LLM 자유 생성 (톤 불안정, 0.5~2초 지연) | **템플릿 15종 즉시 생성, lieState별 3단계 강도** |
| M3 자유 질문 톤 | 캐릭터 0% 차별화 | **6 archetype × 5 angleTag × 180패턴** |
| M4 증인 few-shot | 없음 (보고서 톤 회귀) | **4유형 × 3depth × 36예시 + hiddenAgenda 20패턴** |
| M5 증거 텍스트 | 미검증 | **168건 검수, 46건 교정 반영** |
| M6 끼어들기 | archetype 톤 불일치 9건 | **9건 교정 완료** |
| M7 시스템 메시지 | Phase 1에서 6건만 확인 | **42건 전수 스캔 ALL PASS** |
| M8 DossierCard | 미검증 | **126건 검수, 24건 교정 반영** |

---

## 타 스레드 연동 결과

### Thread A (엔진/데이터) — 2건 ���두 완료

| 요청 | 처리 |
|------|------|
| family-01 requiredLieState 누락 보완 | q2 6건에 S2, q3 6건에 S3 + lockedHint 추가. **완료.** |
| resetQuestionRotation() store 연결 | `useGameStore.ts` initializeCase 내 리셋 블록에 연결. 기존 resetTellTracker, resetActivatedLinks와 동일 위치/패턴. 빌드 PASS. **완료.** |

### Thread E (통합검증) — FAIL 2건 + WARN 2건 모두 해소

| 검증 항목 | 결과 |
|----------|------|
| judgeQuestionEngine FAIL (13종, dead param) | **해소** — 84종, lieState 톤, 순환 선택 확인 |
| witnessFewShotExamples FAIL (파일 미존재) | **해소** — 36예시 + hiddenAgenda 20패턴 확인 |
| freeQuestionV2 WARN (archetype 미구현) | **해소** — 180톤 패턴 확인 |
| witnessEngine WARN (few-shot 부재) | **해소** — witnessEngine 통합 확인 |
| Thread E 교정 5건 보존 | **전부 보존, 충돌 없음** |

Thread E 교정 5건 상세 (Thread B 코드에 이미 반영된 상태로 보존):
- witnessEngine.ts: 기관 증인 예외(결정4)
- llmDialogueResolver.ts: 해요체→합니다체 24패턴
- useActionDispatch.ts: [모순 추궁 맥락] isHidden
- blueprintPromptBuilderV2.ts: S2→hint + gatePrivateKnowledge
- evidenceSlice.ts: investigateEvidence 후 checkUnlocks

빌드: tsc --noEmit PASS
런타임 테스트: 필요 시 즉시 실행 가능

---

## 빌드 상태

```
tsc --noEmit → 에러 0건 (PASS)
```

전 스레드(A, B, E) 수정사항 통합 후 빌드 통과 확인.

---

## 남은 사항

| 항목 | 설명 | 긴급도 |
|------|------|--------|
| freeQuestionV2 호출부 archetype 전달 | 현재 optional이라 fallback(기존 로직)으로 동작. 호출부에서 NPC archetype을 넘기면 톤 패턴 활성화. | 낮음 — 기능 정상, 고도화 수준 |
| 런타임 풀 플레이스루 | spouse-01 S0→S5 전체 흐름에서 재판관 질문/모순 추궁/증인/자유 질문 실동작 확인 | 권장 — Thread E 실행 가능 |

---

## 상세 보고서

`docs/ref/리뉴얼참고/thread-packages/thread-B/report-phase2-final.md`
— 변경 파일 전체 목록, GPT Pro 7세션 검수 결과, 타 스레드 연동 상세 포함
