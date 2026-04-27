# Codex-Dev Route Simulator 진입 메시지 (P1 — lightweight harness MVP)

**세션 영역**: Lightweight route simulator (Script Polish Audit / Release QA 보조 영역)
**병렬**: Release QA / Script Polish Audit / UI Drawer Consistency Fix — 영역 충돌 X
**의뢰서 본문**: `tmp/REQUEST-Codex-Route-Simulator.md`

---

## 1. 진입 조건 (먼저 실행)

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

| 우선순위 | 파일 |
|---|---|
| P0 | `tmp/REQUEST-Codex-Route-Simulator.md` (의뢰서 — 사전 audit §5 / scope §6 / 회피선 §7) |
| P0 | `docs/spot-check-format.md` (8필드 + 분류 카테고리) |
| P0 | `docs/disclosure-policy.md` |
| P0 | `docs/information-surface-policy.md` v1.1 |
| P0 | `CLAUDE.md` (게임 핵심 원칙 / Phase 8단계) |
| P1 | `src/store/useGameStore.ts` + 13 슬라이스 |
| P1 | `src/hooks/useActionDispatch.ts` (97KB — React 영역 / 직접 호출 어려움) |
| P1 | 핵심 engine — `lieStateMachine.ts` / `judgeQuestionEngine.ts` / `evidenceEngine.ts` / `atomSelectionEngine.ts` / `presentationEngine.ts` |
| P1 | `src/data/scriptedText/{caseId}.json` / `src/data/cases/generated/{caseId}.json` |
| P2 | `src/engine/cutsceneTriggerEngine.ts` / `vfxHierarchyEngine.ts` (P0-E·F 정합) |
| P2 | `src/engine/disclosureGuard.ts` (P0 정합) |

---

## 3. 작업 본질

### action 8영역 (사용자 명시)
- judge_question 3종 (fact / motive / empathy)
- evidence_present / evidence_combine / evidence_investigate
- contradiction_pursuit
- witness_summon / witness_question
- dossier 사용
- verdict / result (가능하면)

### 검출 7영역 (사용자 명시)
1. 응답 누락
2. fallback / generic fallback
3. target 무관 답변
4. action 후 state delta 없음
5. lieState / truthStage 변화가 UI surface로 드러나지 않음
6. unlock 발생 / feedback 없음
7. 판결 / 후일담 누락 또는 너무 일반적

### 본질
- **자동 pass/fail X / anomaly candidate 추출**
- spouse-01 20~30 routes → family/friend 확장
- transcript + state delta + surface output 기록
- Script Polish Audit / Release QA 보조 영역

### 기술 영역 결정 (Phase A)
- (A) `.cjs` (CommonJS) + JSON read + 자체 시뮬
- (B) `.mjs` + ts-node / vite-node
- (C) Vitest 환경
- (D) 별도 build
→ 권장 (A) 또는 (C) lightweight 영역 / Codex-Dev 결정 + 보고

---

## 4. 진행 순서

Phase A (기술 영역 결정 + spouse-01 1~3 routes spike) → commit + push + CT-Main 보고
→ Phase B (spouse-01 manifest + 20~30 routes MVP + anomaly summary) → commit + push + 보고
→ Phase C (family-01 / friend-01 확장 — 사용자 결정 후) → commit + push + 보고
→ Phase D (통합 보고) → commit + push + 보고

---

## 5. 절대 회피선

- ScriptedText / caseData 직접 수정 X
- gameplay runtime 대형 리팩터 X
- **actual OpenAI 호출 X** (mock / fallback만)
- LLM sampling harness X (별도 영역)
- browser full playthrough harness X (별도 영역)
- Release QA 산출물 / Script Polish Audit 산출물 영역 섞기 X
- `src/app/pc.css` touch X
- baseline anchor / feature flag global default X
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` / `llmDialogueResolver.ts` 본체 변경 X (read only)
- secret / 실제 키 / 사용자 PII 영역 출력 X

---

## 6. 산출물 위치

```
scripts/qa-core-route-simulator.{cjs|mjs|ts}
tmp/qa-route-simulator-manifests/{caseId}.json
tmp/qa-route-simulator-results/
├── findings.json
├── transcripts (case별)
├── anomaly summary
└── script-polish-candidates.md
```

---

## 7. 종료 조건

- [ ] Phase A·B·C·D 완료
- [ ] action 8영역 + 검출 7영역 적용
- [ ] anomaly candidate 추출 + Script Polish 후보 list
- [ ] check:all / build / tsc PASS
- [ ] commit + push
- [ ] CT-Main 보고

---

**시작 영역**: 진입 조건 검사 → 정독 → Phase A 기술 영역 결정 + spike → CT-Main 보고.
