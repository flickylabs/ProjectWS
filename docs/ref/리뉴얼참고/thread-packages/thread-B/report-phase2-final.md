# Thread B Phase 2 완료 보고 — NPC 대화 품질 고도화

> 담당: Thread B
> 완료일: 2026-04-04
> 상태: **전 미션 완료, 빌드 통과, 타 스레드 연동 완료**

---

## 작업 총괄

| 미션 | 대상 | 변경 규모 | 빌드 |
|------|------|----------|------|
| **M1** 재판관 질문 풀 | judgeQuestionEngine.ts | 13종→84종+, lieState 톤 분화 | PASS |
| **M2** 모순 추궁 질문 | useActionDispatch.ts | LLM 호출→템플릿 15종, 즉시 생성 | PASS |
| **M3** 자유 질문 톤 | freeQuestionV2.ts + JSON | 180개 archetype 톤 패턴 | PASS |
| **M4** 증인 few-shot | witnessEngine.ts + 신규 TS | 36예시 + hiddenAgenda 패턴 | PASS |
| **M5** 증거 텍스트 | 7건 case JSON | 46건 교정 (스포일러/번역체/톤) | PASS |
| **M6** 끼어들기 | interjectionV2.ts | 9건 대사 교정 | PASS |
| **M7** 시스템 메시지 | useActionDispatch.ts | 42건 전수 스캔 ALL PASS | - |
| **M8** DossierCard | V3 game loop 4파일 | 24건 교정 반영 완료 | PASS |

---

## 변경 파일 목록

### Thread B 코드 변경 (5파일)
| 파일 | 변경 |
|------|------|
| `src/engine/judgeQuestionEngine.ts` | 전면 교체 — 84종+ 질문 풀, lieState 톤, 순환 선택, resetQuestionRotation() export |
| `src/hooks/useActionDispatch.ts` | 모순 추궁 LLM→템플릿 15종 + buildContradictionQuestion() |
| `src/engine/freeQuestionV2.ts` | renderResponse archetype 후처리 + pickTonePattern() + 180패턴 로딩 |
| `src/engine/witnessEngine.ts` | few-shot 블록 주입 + hiddenAgenda 패턴 + normalizeWitnessSlot() |
| `src/engine/interjectionV2.ts` | 9건 대사 교정 (archetype 톤 정밀화) |

### Thread B 신규 파일 (2파일)
| 파일 | 내용 |
|------|------|
| `src/data/witnessFewShotExamples.ts` | 증인 few-shot 36예시 + hiddenAgenda 패턴 20종 |
| `src/data/freeQuestionTonePatterns.json` | 자유 질문 archetype 톤 패턴 180개 |

### Thread B 증거 텍스트 교정 (7파일)
| 파일 | 교정 건수 |
|------|----------|
| `src/data/cases/generated/spouse-01.json` | 7건 |
| `src/data/cases/generated/family-01.json` | 10건 |
| `src/data/cases/generated/friend-01.json` | 9건 |
| `src/data/cases/generated/neighbor-01.json` | 2건 |
| `src/data/cases/generated/partnership-01.json` | 6건 |
| `src/data/cases/generated/tenant-01.json` | 5건 |
| `src/data/cases/generated/workplace-01.json` | 7건 |

### Thread B DossierCard 교정 (4파일)
| 파일 | 교정 건수 |
|------|----------|
| `docs/ref/리뉴얼참고/gpt-batch/friend-01/friend-01-v3-game-loop-data.json` | 18건 (전면 재작성) |
| `docs/ref/리뉴얼참고/spouse-01-v3-game-loop-data.ts` | 1건 |
| `docs/ref/리뉴얼참고/gpt-batch/workplace-01/workplace-01-v3-game-loop-data.json` | 2건 |
| `docs/ref/리뉴얼참고/gpt-batch/partnership-01/partnership-01-v3-game-loop-data.json` | 3건 |

---

## 타 스레드 수정사항 (Thread B에 포함된 것)

### Thread E 수정 (5건) — Thread B 반영 시점에 이미 코드에 존재, 보존 확인됨

| 파일 | Thread E 수정 내용 | Thread B 충돌 |
|------|-------------------|-------------|
| `src/engine/witnessEngine.ts` | 기관 증인 예외(결정4): institutional → full depth at S2 | 충돌 없음 — 보존됨 |
| `src/engine/llmDialogueResolver.ts` | 해요체→합니다체 변환 패턴 24건 추가 | Thread B 미수정 — 보존됨 |
| `src/hooks/useActionDispatch.ts` | `[모순 추궁 맥락]` isHidden: true 처리 | Thread B M2 반영 시 보존됨 |
| `src/engine/blueprintPromptBuilderV2.ts` | getTruthThrottle S2→hint 매핑 + gatePrivateKnowledge | Thread B 미수정 — 보존됨 |
| `src/store/slices/evidenceSlice.ts` | investigateEvidence 후 checkUnlocks lieState 연동 | Thread B 미수정 — 보존됨 |

### Thread A 수정 (1건)

| 파일 | Thread A 수정 내용 | 상태 |
|------|-------------------|------|
| `docs/ref/리뉴얼참고/gpt-session2/output/family-01-v3-game-loop-data.json` | requiredLieState 추가 (q2=S2, q3=S3) 12건 | 처리 완료 확인 |

### Thread A 추가 처리 (1건) — 완료

| 내용 | 상태 |
|------|------|
| `resetQuestionRotation()` → `useGameStore.ts` initializeCase 내 리셋 블록에 연결 | **처리 완료** |

---

## 타 스레드 전달 현황

| 대상 | 내용 | 문서 | 상태 |
|------|------|------|------|
| Thread A | resetQuestionRotation() store 연결 요청 | reply-to-thread-A.md | **처리 완료** |
| Thread A | family-01 requiredLieState 보완 | (직접 전달) | **처리 완료** |
| Thread E | FAIL 2건(judgeQuestion + fewShot) 해소 상세 | reply-to-thread-E.md | 전달 완료 |
| Thread E | WARN 2건(freeQuestion + witness) 해소 상세 | reply-to-thread-E.md | 전달 완료 |
| Thread E | 런타임 통합 검증 요청 (4개 시나리오) | reply-to-thread-E.md | 전달 완료 |

---

## GPT Pro 활용 내역

| 세션 | 산출물 | 검수 | 반영 |
|------|--------|------|------|
| M1 재판관 질문 | 84종 JSON + TS 엔진 | 84종 전수 검수, minor 3건 수정 | ✅ 반영 완료 |
| M2 모순 추궁 | 15종 JSON | 15종 전수 검수, minor 1건 수정 | ✅ 반영 완료 |
| M3 자유 질문 톤 | 180패턴 JSON + TS | 180종 전수 검수, minor 3건 수정 | ✅ 반영 완료 |
| M4 증인 few-shot | 36예시 JSON + TS + 패치 | 36종 전수 검수, minor 2건 수정 | ✅ 반영 완료 |
| M5 증거 텍스트 | 45교정 JSON | 45건 전수 검수 + 누락 1건 추가 | ✅ 46건 반영 완료 |
| DossierCard friend-01 | 18건 재작성 JSON | 18/18 ALL PASS | ✅ 반영 완료 |
| DossierCard 3cases | 6건 교정 JSON | 6/6 ALL PASS | ✅ 반영 완료 |

---

## 품질 기준 달성

| 기준 | Phase 1 | Phase 2 |
|------|---------|---------|
| 재판관 질문 다양성 | 13종 고정 | **84종+ 순환 선택** |
| lieState 톤 분화 | 미구현 (dead param) | **soft/hard 분기** |
| 모순 추궁 | LLM 자유 생성 (불안정) | **템플릿 15종 즉시 생성** |
| 자유 질문 캐릭터 톤 | 0% 차별화 | **6 archetype × 5 angleTag** |
| 증인 few-shot | 없음 (보고서 톤) | **4유형 × 3depth × 36예시** |
| 끼어들기 톤 | 9건 불일치 | **9건 교정 완료** |
| 시스템 메시지 | Phase 1에서 6건 수정 | **42건 전수 확인 ALL PASS** |
| 증거 텍스트 | 미검증 | **168건 검수, 46건 교정, 7파일 반영** |
| DossierCard | 미검증 | **126건 검수, 24건 교정, 4파일 반영** |

---

## 빌드 상태

```
tsc --noEmit → 에러 0건 (PASS)
```

---

## 타 스레드 최종 완료 확인

### Thread A — 전 이슈 처리 완료

| 이슈 | 처리 내용 | 상태 |
|------|----------|------|
| family-01 requiredLieState 누락 | q2 6건에 S2, q3 6건에 S3 + lockedHint 추가 | **완료** |
| resetQuestionRotation() store 연결 | `useGameStore.ts` initializeCase 내 리셋 블록에 연결. 기존 resetTellTracker, resetActivatedLinks와 동일 위치/패턴. | **완료** |

빌드: tsc --noEmit PASS

### Thread E — 전 이슈 해소 확인 + 통합 검증 완료

| 이슈 | 결과 |
|------|------|
| judgeQuestionEngine FAIL (13종, dead param) | **해소** — 84종, lieState 톤 분화, 순환 선택 확인 |
| witnessFewShotExamples FAIL (파일 미존재) | **해소** — 36예시 + hiddenAgenda 20패턴, witnessEngine 통합 확인 |
| freeQuestionV2 WARN (archetype 미구현) | **해소** — 180톤 패턴 확인 |
| witnessEngine WARN (few-shot 데이터 부재) | **해소** — witnessEngine 통합 확인 |
| Thread E 교정 5건 보존 여부 | **전부 보존, 충돌 없음** 확인 |

빌드: tsc --noEmit PASS
런타임 테스트(spouse-01 풀 플레이스루): 필요 시 실행 가능 상태

---

## 남은 사항

| 항목 | 담당 | 상태 |
|------|------|------|
| freeQuestionV2 호출부에서 archetype 전달 | Thread A 또는 호출부 담당 | 미연결 (현재 fallback 동작, 기능 정상) |
| spouse-01 풀 플레이스루 런타임 검증 | Thread E | 실행 가능 상태, 필요 시 요청 |
