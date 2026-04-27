# 세션 시작 — Script Runtime QA Gate (v2 — P0 승격 / 사용자 spot check 의존 영역 중단 본질)

ClaudeCode CT-Main에서 의뢰합니다 (v2 — Route Simulator → **P0 Script Runtime QA Gate** 승격).

⚠️ **사용자 명시 영역**:
- P1 보조 툴 → **P0 Script Runtime QA Gate** 영역 본질
- 사용자 spot check 의존 영역 중단 → 자동 검출 영역 본질
- 4 검출 영역 자동 (응답 누락 / Q-A 불일치 / 스포일러 / 엉뚱한 이야기·fallback 품질)
- resolver path + source path 추적
- Gate 결과 → 통합 Script Patch 의뢰서 영역 입력

⚠️ **#1 Spoiler Cascade Finalize 영역 commit + push 완료 영역 후만 진입**.

---

## 1. git pull + 진입 조건 검사

```bash
git pull origin main
git log --oneline -1                     # #1 Finalize commit + push 완료 영역 확인
git status --short --branch
git diff --quiet && git diff --cached --quiet && echo "tracked clean"
npm run check:all
npm run build:pc
npx tsc -b --force
```

PASS 후 진행. tracked dirty / hard > 0 / build fail → 즉시 중단 + CT-Main 보고.

**#1 Finalize commit + push 영역 미완료 영역 → 진입 X / 사용자 영역 결정 받기**.

---

## 2. 필수 정독

1. `tmp/Route-Simulator-NEXT-START-MESSAGE.md` (진입 메시지 v2)
2. `tmp/REQUEST-Codex-Route-Simulator.md` v2 (**의뢰서 — 4 검출 / 출력 / 원칙 / 우선 대상**)
3. `docs/disclosure-policy.md` (truth lexeme / §13 / §3.2·3.3)
4. `docs/information-surface-policy.md` v1.1 §2.1·2.6·5.1·5.5·6.3
5. `docs/spot-check-format.md` (8필드 + 분류)
6. `CLAUDE.md` (게임 핵심 / Phase 8단계)
7. `src/store/useGameStore.ts` + 13 슬라이스
8. 핵심 engine 영역 (lieStateMachine / judgeQuestionEngine / evidenceEngine / atomSelectionEngine / presentationEngine / gameEventTriggerEngine / discoveryEngine / meterStagingV2 / disclosureGuard / disclosurePolicyLoader)
9. `src/data/{scriptedText,cases/generated,disclosurePolicy,emergenceHooks}` 영역

---

## 3. 작업 본질

### 4 검출 영역 (필수)
1. 응답 누락 — action 7종 후 NPC 응답 또는 safe fallback 0건 → **hard fail**
2. Q-A 불일치 — action type/questionType/disputeId/target/evidenceId vs response focus
3. 스포일러 — truth lexeme / `name` / evidenceStage 이전 / S0~S2 full → **hard fail**
4. 엉뚱한 이야기 / fallback 품질 — generic / archetype 무관 / active 강제 / 내부 label·용어

### 출력 영역
- findings.json + route transcript + action-by-action trace + resolver path + source path + severity + patch priority

### 우선 대상
- **spouse-01 Phase 2** 우선 (fact_pursuit 반복 / evidence unlock / dispute emergence / NPC B cascade)
- 이후 family/friend

### 원칙
- 개별 문장 patch X
- root cause 없이 ScriptedText 수정 X
- 공통 경로 (resolver / gating / guard / coverage) 고정
- Gate 결과 없이 Script Patch 대량 X

---

## 4. 진행 순서

Phase A (기술 + spouse-01 Phase 2 spike) → 보고
→ Phase B (spouse-01 핵심 루트 MVP) → 보고
→ Phase C (family/friend 확장) → 보고
→ Phase D (통합 + Script Patch 의뢰서 입력) → commit + push + 보고

---

## 5. 산출물 위치

```
scripts/qa-runtime-gate.*
tmp/qa-runtime-gate-manifests/{caseId}.json
tmp/qa-runtime-gate-results/
├── findings.json
├── route-transcripts/
├── action-by-action-trace.json
├── resolver-path-summary.md
├── source-path-summary.md
└── 20260427-{spouse-01,family-01,friend-01,overall}-summary.md
```

---

## 6. 절대 회피선

### 사용자 명시
- 개별 문장 patch X / root cause 없이 ScriptedText 수정 X / Script Patch 대량 진입 X

### CT 영역
- ScriptedText / caseData / 정책 / pc.css / baseline anchor / feature flag global default X
- gameplay runtime 대형 리팩터 X
- **actual OpenAI 호출 X** (mock / fallback만 / VITE_*·OPENAI_API_KEY 참조 X)
- LLM sampling harness X / browser full playthrough harness X
- Release QA / Script Polish / Spoiler Cascade 산출물 영역 섞기 X
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` / `llmDialogueResolver.ts` 본체 변경 X (read only)
- secret / 실제 키 / 사용자 PII 영역 출력 X

---

**시작 영역**: 진입 조건 검사 → #1 Finalize commit 확인 → 정독 → Phase A 기술 + spike → CT-Main 보고 → Phase B·C·D.
