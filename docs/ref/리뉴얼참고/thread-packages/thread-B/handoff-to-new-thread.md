# Thread B 이관 문서 — 신규 스레드용

> 이관일: 2026-04-05
> 이유: 컨텍스트 용량 한계
> 신규 스레드 제목: **Thread-B**

---

## 1. 너는 누구인가

너는 **"스레드 B — 심문/NPC 대화 품질 관리"** 담당이다.
솔로몬 게임(한국 민사 분쟁 재판 시뮬레이션)의 NPC 대화 품질을 전담한다.

### 역할 범위
- NPC 심문 대사의 한국어 품질 관리
- 재판관 질문 엔진 유지보수
- 증인/자유 질문/끼어들기 등 대화 시스템 전반
- v2-atoms 데이터의 Progressive Truth Throttle 준수 검증
- GPT Pro 5.4와의 협업 (설계는 GPT Pro, 한국어 검수 + 코드 반영은 너)

### 다른 스레드와의 관계
- **Thread A** (엔진/데이터): 엔진 구조 변경, store 연결 등. 너의 코드가 엔진에 연결될 때 협조.
- **Thread C** (데이터 생성): 84건 사건 데이터 생성. 너의 품질 기준이 데이터에 적용됨.
- **Thread D** (기획): 게임 설계. 너는 기획 변경 없이 품질 고도화만 수행.
- **Thread E** (통합검증): 전체 코드 검증. 너의 변경사항을 검증하고 피드백.
- **컨트롤 타워**: 전체 조율. 미션 배정, 스레드 간 전달 중계.

---

## 2. 완료된 작업 (건드리지 마라)

### Phase 1 — Progressive Truth Throttle 교정 (완료)
- v2-atoms 7건 S0-S2 교정 (320건+ 위반 → 전부 교정)
- judgeQuestionEngine.ts extractDisputeSubject() 스포일러 방지 (15패턴)
- useActionDispatch.ts 시스템 메시지 6건 중립화
- **상세:** `thread-packages/thread-B/report-to-control-tower.md`

### Phase 2 — NPC 대화 품질 고도화 (완료)

| 미션 | 내용 | 상태 |
|------|------|------|
| M1 재판관 질문 | 13종→84종+ 질문 풀, lieState soft/hard 톤, 순환 선택 | ✅ 완료 |
| M2 모순 추궁 | LLM→템플릿 15종 즉시 생성, 3단계 강도 | ✅ 완료 |
| M3 자유 질문 톤 | 6 archetype × 5 angleTag × 180패턴 | ✅ 완료 |
| M4 증인 few-shot | 4유형 × 3depth × 36예시 + hiddenAgenda 20패턴 | ✅ 완료 |
| M5 증거 텍스트 | 168건 검수, 46건 교정, 7파일 반영 | ✅ 완료 |
| M6 끼어들기 | interjectionV2.ts 9건 대사 교정 | ✅ 완료 |
| M7 시스템 메시지 | 42건 전수 스캔 ALL PASS | ✅ 완료 |
| M8 DossierCard | 126건 검수, 24건 교정 (friend-01 18건 재작성) | ✅ 완료 |

- **상세:** `thread-packages/thread-B/report-phase2-final.md`

### 핫픽스 — 테스트 피드백 3건 (완료)
1. "미리 말씀드리지 못한" 클리셰 차단 + 7종 변형 리스트
2. 금전 무관 사건 동적 가드 (workplace hallucination 방지)
3. S5 자백 감정 강화 + 보고서 톤 명시 금지
- **상세:** `thread-packages/thread-B/message-to-control-tower-hotfix.md`

### 타 스레드 연동 (전부 완료)
- Thread A: family-01 requiredLieState 보완 ✅ + resetQuestionRotation store 연결 ✅
- Thread E: FAIL 2건 + WARN 2건 해소 ✅ + 교정 5건 보존 확인 ✅

---

## 3. 변경된 파일 목록 (현재 상태)

### 코드 파일 (Thread B가 수정/생성)
| 파일 | 변경 내용 |
|------|----------|
| `src/engine/judgeQuestionEngine.ts` | V2 전면 교체 — 84종+ 질문 풀, lieState 톤, 순환 선택, resetQuestionRotation() |
| `src/hooks/useActionDispatch.ts` | 모순 추궁 템플릿 15종 + buildContradictionQuestion() |
| `src/engine/freeQuestionV2.ts` | archetype 톤 후처리 + pickTonePattern() + 180패턴 로딩 |
| `src/engine/witnessEngine.ts` | few-shot 블록 주입 + hiddenAgenda 패턴 + normalizeWitnessSlot() |
| `src/engine/interjectionV2.ts` | 9건 대사 교정 |
| `src/engine/blueprintPromptBuilderV2.ts` | 핫픽스 3건 (사과 클리셰/금전 가드/S5 감정) |
| `src/data/witnessFewShotExamples.ts` | 신규 — 증인 few-shot 36예시 + hiddenAgenda 20패턴 |
| `src/data/freeQuestionTonePatterns.json` | 신규 — archetype 톤 패턴 180개 |

### 데이터 파일 (Thread B가 교정)
| 파일 | 내용 |
|------|------|
| `src/data/cases/generated/*.json` (7건) | 증거 텍스트 46건 교정 |
| `src/data/claimPolicies/spouse-01-v2-atoms.json` | Phase 1 atom 교정 |
| `docs/ref/리뉴얼참고/gpt-batch/*/v2-atoms.json` (6건) | Phase 1 atom 교정 |
| `docs/ref/리뉴얼참고/gpt-batch/*/v3-game-loop-data.json` (3건) | DossierCard 교정 |
| `docs/ref/리뉴얼참고/spouse-01-v3-game-loop-data.ts` | DossierCard 1건 교정 |

### 다른 스레드가 수정 (Thread B가 보존 확인한 것)
| 파일 | 수정 주체 | 내용 |
|------|----------|------|
| `src/engine/llmDialogueResolver.ts` | Thread E | 해요체→합니다체 24패턴 |
| `src/engine/blueprintPromptBuilderV2.ts` | Thread E | getTruthThrottle S2→hint |
| `src/store/slices/evidenceSlice.ts` | Thread E | checkUnlocks lieState 연동 |
| `src/store/useGameStore.ts` | Thread A | resetQuestionRotation() 호출 연결 |
| `docs/ref/.../family-01-v3-game-loop-data.json` | Thread A | requiredLieState 12건 추가 |

---

## 4. 남은 사항

| 항목 | 설명 | 긴급도 |
|------|------|--------|
| freeQuestionV2 archetype 전달 | renderResponse에 archetype? 파라미터 추가됨. 호출부에서 NPC archetype을 넘기면 톤 패턴 활성화. 현재는 fallback(기존 로직)으로 정상 동작. | 낮음 |
| partnership-01 + workplace-01 재테스트 | 핫픽스 3건 적용 후 재테스트 필요. Thread E에 요청하면 됨. | 중간 |
| 런타임 풀 플레이스루 | spouse-01 S0→S5 전체 흐름 검증. Thread E가 실행 가능 상태. | 권장 |

---

## 5. 품질 기준 (너의 판단 기준)

### 한국어 품질 6항목
1. **의미**: 질문과 답변이 논리적으로 맞아야 함
2. **내용**: 사건 맥락에 맞는 구체적 내용
3. **맥락**: 이전 대화 흐름과 연결
4. **호칭**: 재판관/당사자/증인 간 호칭 규칙 (씨, 재판관님)
5. **경어**: 합니다체 통일 (emotional/confession만 해요체 예외)
6. **어법**: 번역체 0건, 자연스러운 한국어, 법정 분위기

### 금지 표현 (클리셰)
- "미리 말씀드리지 못한" → 7종 변형 사용
- "적지 않은 돈" / "상당한 금액" → 최대 1회, 이후 "그 돈", "큰돈"
- "해당 ~" → "그 ~", "이번 ~"
- "~된 것으로 생각됩니다" → 자연스럽게
- "여러 가지 상황이 얽혀" → 구체적 1가지
- "입장을 밝혀 주십시오" → 변형 사용
- "당신" → 재판관은 절대 사용 금지 ("이름 + 씨")

### Progressive Truth Throttle
- S0-S1: 기관명/인물 실명/직함/서비스명/구체 금액/날짜 절대 금지
- S2: "가족 일"/"개인 사정" 수준, 성씨만 허용
- S3+: 점진적 허용
- S4-S5: 전체 허용

---

## 6. GPT Pro 협업 패턴

### 역할 분담
- **GPT Pro 5.4**: 구조 설계, 템플릿 패턴, 변형 구조, 대량 텍스트 생성
- **Thread B (너)**: 한국어 톤/자연스러움 검수, 코드 반영, 빌드 확인

### GPT Pro 세션 원칙
- 한 세션에 한 미션만
- 현재 코드 + 품질 기준 + 기대 산출물 명시
- 산출물은 반드시 **JSON 파일**로 요청 (코드/스크립트 아님)
- 참고용 예시 파일 첨부하면 품질 향상

### GPT Pro 세션 기록
`docs/ref/리뉴얼참고/thread-packages/thread-B/gpt-pro-sessions/` 아래에 세션별 폴더로 보존.

---

## 7. 문서 위치

| 문서 | 경로 |
|------|------|
| Phase 1 미션 | `thread-packages/thread-B/mission.md` |
| Phase 2 미션 | `thread-packages/thread-B/mission-phase2.md` |
| Phase 1 보고서 | `thread-packages/thread-B/report-to-control-tower.md` |
| Phase 2 보고서 | `thread-packages/thread-B/report-phase2-final.md` |
| 핫픽스 보고서 | `thread-packages/thread-B/message-to-control-tower-hotfix.md` |
| 타 스레드 전달 | `thread-packages/thread-B/messages-to-other-threads.md` |
| Thread A 응답 | `thread-packages/thread-B/reply-to-thread-A.md` |
| Thread E 응답 | `thread-packages/thread-B/reply-to-thread-E.md` |
| M6/7/8 보고서 | `thread-packages/thread-B/report-phase2-missions678.md` |
| GPT Pro 세션 | `thread-packages/thread-B/gpt-pro-sessions/` |
| Phase 1 atom 교정 | `thread-packages/thread-B/gpt-session-B-atoms/` |
| 이 문서 | `thread-packages/thread-B/handoff-to-new-thread.md` |

---

## 8. 주의사항

1. **blueprintPromptBuilderV2.ts는 건드리지 마라** (mission-phase2.md에 명시) — 단, 핫픽스처럼 프롬프트 텍스트만 조정하는 것은 허용.
2. **스레드 E 수정사항 5건은 보존해야 한다** — witnessEngine, llmDialogueResolver, useActionDispatch, blueprintPromptBuilderV2, evidenceSlice에 대한 스레드 E 수정을 덮어쓰면 안 됨.
3. **코드 반영 시 반드시 빌드 확인** — `npx tsc --noEmit` 에러 0건이어야 함.
4. **GPT Pro 결과는 반드시 전수 검수** — 자동 반영 금지. 한국어 품질 6항목 + 클리셰 + 스포일러 확인.
5. **에이전트를 적극 활용하라** — 검수, 코드 반영, 빌드 확인 등을 에이전트로 병렬 처리.
