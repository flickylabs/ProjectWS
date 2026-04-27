# 세션 시작 — Route Simulator (P1 — lightweight QA harness MVP)

ClaudeCode CT-Main에서 의뢰합니다. **Lightweight route simulator** 영역입니다. browser full playthrough harness 보류 / **anomaly candidate 추출** 본질.

---

## 1. git pull + 진입 조건 검사

```bash
git pull origin main
git log --oneline -1
git status --short --branch
git diff --quiet && git diff --cached --quiet && echo "tracked clean"
npm run check:all
npm run build
npx tsc -b --force
```

PASS 후 진행. 어느 하나 fail → 즉시 중단 + CT-Main 보고.

---

## 2. 필수 정독

1. `tmp/Route-Simulator-NEXT-START-MESSAGE.md` (진입 메시지)
2. `tmp/REQUEST-Codex-Route-Simulator.md` (**의뢰서 본문 — 사전 audit / scope / 회피선 / Phase A·B·C·D**)
3. `docs/spot-check-format.md` (8필드 + 분류)
4. `docs/disclosure-policy.md`
5. `docs/information-surface-policy.md` v1.1
6. `CLAUDE.md` (Phase 8단계 / 한국어 품질)
7. `src/store/useGameStore.ts` + 13 슬라이스 (state delta)
8. 핵심 engine 영역 (lieStateMachine / judgeQuestionEngine / evidenceEngine / atomSelectionEngine / presentationEngine)

---

## 3. 작업 본질

### action 8영역
judge_question 3종 / evidence 3종 / contradiction_pursuit / witness 2종 / dossier / verdict·result

### 검출 7영역
응답 누락 / fallback / target 무관 / state delta 0 / lieState·truthStage UI surface 미동작 / unlock feedback 0 / 판결·후일담 누락·일반

### 본질
- **자동 pass/fail X / anomaly candidate 추출**
- spouse-01 20~30 routes → family/friend 확장
- transcript + state delta + surface output 기록

### 기술 영역 (Phase A 결정)
.cjs / .mjs / Vitest / 별도 build — 권장 lightweight (.cjs 또는 Vitest)

---

## 4. 진행 순서

Phase A (기술 결정 + spouse-01 1~3 routes spike) → 보고
→ Phase B (manifest + 20~30 routes MVP) → 보고
→ Phase C (family/friend 확장 — 사용자 결정) → 보고
→ Phase D (통합) → 보고

---

## 5. 산출물 위치

```
scripts/qa-core-route-simulator.*
tmp/qa-route-simulator-manifests/{caseId}.json
tmp/qa-route-simulator-results/
├── findings.json
├── transcripts
├── anomaly summary
└── script-polish-candidates.md  (Script Polish Audit 입력)
```

---

## 6. 절대 회피선

- ScriptedText / caseData 직접 수정 X
- gameplay runtime 대형 리팩터 X
- **actual OpenAI 호출 X** (mock / fallback만 / VITE_*·OPENAI_API_KEY 참조 X)
- LLM sampling harness X
- browser full playthrough harness X
- Release QA / Script Polish Audit 산출물 영역 섞기 X
- `src/app/pc.css` touch X
- baseline anchor / feature flag global default X
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` / `llmDialogueResolver.ts` 본체 변경 X
- secret / 실제 키 / 사용자 PII 영역 출력 X

---

**시작 영역**: 진입 조건 검사 → 정독 → Phase A 기술 영역 결정 + spike → CT-Main 보고.
