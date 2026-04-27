# Codex-Dev Script Runtime QA Gate 진입 메시지 (v2 — P0 승격 / Route Simulator → Gate)

**세션 영역**: P0 Script Runtime QA Gate 구축 (사용자 spot check 의존 영역 중단 본질)
**병렬**: #1 Spoiler Cascade Finalize 완료 후 진입 영역
**의뢰서 본문**: `tmp/REQUEST-Codex-Route-Simulator.md` (v2 — P0 승격)

⚠️ **사용자 명시 영역**:
- 기존 P1 보조 툴 → **P0 Script Runtime QA Gate** 승격
- 4 검출 영역 자동 (응답 누락 / Q-A 불일치 / 스포일러 / 엉뚱한 이야기·fallback 품질)
- resolver path + source path 영역 추적
- Gate 결과 영역 → 통합 Script Patch 의뢰서 영역 입력

---

## 1. 진입 조건 (먼저 실행)

```bash
git pull origin main
git log --oneline -1                     # #1 Finalize commit + push 완료 영역 확인
git status --short --branch
git diff --quiet && git diff --cached --quiet && echo "tracked clean"
npm run check:all
npm run build:pc
npx tsc -b --force
```

PASS 후 진행. 어느 하나 fail → 즉시 중단 + CT-Main 보고.

**#1 Spoiler Cascade Finalize 영역 commit + push 완료 영역 확인 본질** — 그 이전 진입 X.

---

## 2. 필수 정독

| 우선순위 | 파일 |
|---|---|
| P0 | `tmp/REQUEST-Codex-Route-Simulator.md` v2 (의뢰서 — 4 검출 / 출력 / 원칙 / 우선 대상) |
| P0 | `docs/disclosure-policy.md` (truth lexeme / §13 audit 패턴 / §3.2 evidenceStage / §3.3) |
| P0 | `docs/information-surface-policy.md` v1.1 §2.1·2.6·5.1·5.5·6.3 |
| P0 | `docs/spot-check-format.md` (8필드 + 분류) |
| P0 | `CLAUDE.md` (게임 핵심 / 한국어 / Phase 8단계) |
| P1 | `src/store/useGameStore.ts` + 13 슬라이스 (state delta) |
| P1 | 핵심 engine — `lieStateMachine.ts` / `judgeQuestionEngine.ts` / `evidenceEngine.ts` / `atomSelectionEngine.ts` / `presentationEngine.ts` / `gameEventTriggerEngine.ts` / `discoveryEngine.ts` / `meterStagingV2.ts` / `disclosureGuard.ts` / `disclosurePolicyLoader.ts` |
| P1 | `src/data/scriptedText/{caseId}.json` / `src/data/cases/generated/{caseId}.json` / `src/data/disclosurePolicy/{caseId}.json` / `src/data/emergenceHooks.ts` |
| P2 | `tmp/qa-spouse-01-phase2-spoiler-cascade-results/` (#1 Finalize 산출물 — 같은 영역 검증 영역 본질) |
| P2 | `tmp/qa-script-polish-audit-results/findings.json` (Script Polish Audit 25 findings 영역) |

---

## 3. 작업 본질

### 4 검출 영역 (필수)
1. **응답 누락 (hard fail)** — judge_question / evidence 3종 / contradiction_pursuit / witness 2종 / dossier / discovery·emergence 영역 후 NPC 응답 또는 safe fallback 0건
2. **Q-A 불일치 (candidate)** — action type / questionType / disputeId / target / evidenceId vs NPC response focus 비교
3. **스포일러 (hard fail)** — truth lexeme / locked evidence `name` / evidenceStage 이전 hidden / S0~S2 full truth
4. **엉뚱한 이야기 / fallback 품질 (candidate)** — generic / 캐릭터 무관 / active dispute 강제 / 내부 label / 내부 용어

### 출력 영역 (사용자 명시)
- findings.json (8필드 + severity + resolver/source path)
- route transcript (action-by-action trace)
- action-by-action trace
- resolver path (scripted / LLM / fallback / event hook)
- source path (scriptedText key / emergenceHook id / evidence id / discovery trigger id)
- severity P0/P1/P2
- patch priority

### 우선 대상 (사용자 명시)
- **spouse-01 Phase 2 영역 우선** (`fact_pursuit` 반복 / evidence unlock / dispute emergence / NPC B response cascade)
- 이후 family-01 / friend-01

### 원칙 (사용자 명시)
- 개별 문장 덮어쓰기 patch X
- root cause 없이 ScriptedText 수정 X
- 공통 경로 고정 (resolver / gating / guard / coverage)
- Gate 결과 없이 Script Patch 대량 X

---

## 4. 진행 순서

Phase A (기술 결정 + spouse-01 Phase 2 1~3 routes spike + 4 검출 1차) → 보고
→ Phase B (spouse-01 manifest + 핵심 루트 + Phase 2 우선 + MVP) → 보고
→ Phase C (family/friend 확장 — 사용자 결정 후) → 보고
→ Phase D (통합 + Script Patch 의뢰서 영역 입력) → commit + push + 보고

---

## 5. 절대 회피선

### 사용자 명시
- 개별 문장 덮어쓰기 patch X
- root cause 없이 ScriptedText 수정 X
- Script Patch 대량 진입 X (Gate 결과 영역 입력 영역 본질)

### CT 영역
- ScriptedText / caseData / 정책 영역 직접 수정 X
- gameplay runtime 대형 리팩터 X
- **actual OpenAI 호출 X** (mock / fallback만)
- LLM sampling harness X / browser full playthrough harness X
- Release QA / Script Polish Audit / Spoiler Cascade 산출물 영역 섞기 X
- `src/app/pc.css` touch X
- baseline anchor / feature flag global default X
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` / `llmDialogueResolver.ts` 본체 변경 X
- secret / 실제 키 / 사용자 PII 영역 출력 X

---

## 6. 산출물 위치

```
scripts/qa-runtime-gate.{cjs|mjs|ts}
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

## 7. 종료 조건

- [ ] Phase A·B·C·D 완료
- [ ] 4 검출 영역 자동 적용
- [ ] resolver path + source path 영역 추적
- [ ] severity P0/P1/P2 + patch priority
- [ ] check:all / build:pc / tsc PASS
- [ ] commit + push
- [ ] CT-Main 보고 → 통합 Script Patch 의뢰서 영역 진입 가능 안내

---

**시작 영역**: 진입 조건 검사 → #1 Finalize commit 영역 확인 → 정독 → Phase A 기술 영역 결정 + spouse-01 Phase 2 spike → CT-Main 보고 → Phase B·C·D.
