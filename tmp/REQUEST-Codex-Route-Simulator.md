# REQUEST — Codex-Dev Route Simulator (P1 — lightweight QA harness)

**의뢰일**: 2026-04-27
**요청자**: ClaudeCode CT-Main
**우선순위**: P1 (Script Polish Audit / Release QA 보조 영역)
**병렬**: Release QA / Script Polish Audit / UI Drawer Consistency Fix — 영역 충돌 X (read 영역 + 신규 script + 신규 tmp만)

---

## 1. 목표

**Lightweight route simulator MVP**. 핵심 루트에 대해 action sequence 실행 + transcript + state delta + surface output 기록 + anomaly candidate 추출.

- 자동 pass/fail X / **anomaly candidate 추출** 본질
- Script Polish Audit / Release QA 보조 영역
- 출시 전 영역 (browser full playthrough harness 보류)

우선 범위: **spouse-01 핵심 루트 20~30**. 이후 family-01 / friend-01 확장.

---

## 2. 진입 조건

- HEAD: `6ed551a` (또는 그 이후 main 최신)
- baseline anchor: `baseline-pre-policy-v1` / `v2` 보존
- working tree: tracked clean
- `npm run check:all` PASS / `npm run build` PASS / `npx tsc -b --force` PASS

---

## 3. 분담

| 영역 | 담당 |
|---|---|
| 정책 / scope / 검출 영역 | CT-Main |
| **이 세션 (Codex-Dev Route Simulator)** | **신규 시뮬레이터 + manifest + transcript + anomaly summary** |
| Script Polish Audit | 별도 트랙 — 본 세션 anomaly 후보 list 입력 |
| Release QA | 별도 트랙 — 본 세션 결과 정합 영역 |
| 사용자 | 최종 anomaly 우선순위 결정 |

---

## 4. 정독 자료 (필수)

| 우선순위 | 파일 |
|---|---|
| P0 | `tmp/REQUEST-Codex-Route-Simulator.md` (의뢰서) |
| P0 | `docs/spot-check-format.md` (8필드 + 분류 카테고리) |
| P0 | `docs/disclosure-policy.md` (진실 누설 정책) |
| P0 | `docs/information-surface-policy.md` v1.1 (7 표면 위상 / surface output 영역) |
| P0 | `CLAUDE.md` (게임 핵심 원칙 / 한국어 품질 / Phase 8단계) |
| P1 | `src/store/useGameStore.ts` + 슬라이스 13개 (state delta 영역) |
| P1 | `src/hooks/useActionDispatch.ts` (action dispatch 영역) |
| P1 | 핵심 engine — `lieStateMachine.ts` / `judgeQuestionEngine.ts` / `evidenceEngine.ts` / `atomSelectionEngine.ts` / `presentationEngine.ts` / `gameEventTriggerEngine.ts` |
| P1 | `src/engine/scriptedTextLoader.ts` |
| P1 | `src/data/scriptedText/{spouse-01,family-01,friend-01}.json` |
| P1 | `src/data/cases/generated/{spouse-01,family-01,friend-01}.json` |
| P2 | `src/engine/cutsceneTriggerEngine.ts` / `vfxHierarchyEngine.ts` (P0-E·F 영역) |
| P2 | `src/engine/disclosureGuard.ts` (P0 정합) |

---

## 5. 사전 audit 결과 (CT 영역)

### 5.1 store / dispatch / engine 영역 위치

| 영역 | 위치 |
|---|---|
| Store | `src/store/useGameStore.ts` + 13 슬라이스 (`phaseSlice` / `dialogueSlice` / `evidenceSlice` / `judgeNotebookSlice` / `judgeObservationSlice` / `eventFeedbackSlice` / `discoverySlice` / `verdictSlice` / etc.) |
| Dispatch | `src/hooks/useActionDispatch.ts` (97KB — React hook 영역 / Node 직접 import 어려움) |
| Engine 60+ 파일 | `src/engine/*.ts` (대부분 .ts pure function — Node import 가능 영역) |
| ScriptedText | `src/data/scriptedText/{caseId}.json` |
| caseData | `src/data/cases/generated/{caseId}.json` |
| LLM | `src/engine/llmClient.ts` / `llmDialogueResolver.ts` (시뮬레이터에서는 **호출 X / mock 또는 fallback** 영역) |

### 5.2 기존 harness 영역 — 미존재

`tests/` 디렉토리에 `.cjs` 영역 없음. CLAUDE.md에 언급된 `tests/stage1-deep-audit.cjs` / `tests/run-84-headless.cjs` 영역은 _LEGACY 영역 또는 폐기 영역. **신규 영역 작성**.

### 5.3 기술 영역 결정 (Phase A에서 Codex-Dev 결정)

`.ts` 영역 import 본질:
- (A) `scripts/qa-core-route-simulator.cjs` (CommonJS) + `.ts` 영역 직접 import X / `.json` 영역 + 자체 시뮬 본질
- (B) `scripts/qa-core-route-simulator.mjs` (ESM) + ts-node 영역 / vite-node 영역
- (C) Vitest 환경 (`vitest run --reporter=...`) + 시뮬레이터 영역 vitest test 영역
- (D) 별도 build (`vite build --mode test`) + Node 영역 실행

**Codex-Dev 영역 결정** — Phase A에서 옵션 선택 + CT-Main 보고.

권장: (A) 또는 (C) — 가장 lightweight.

---

## 6. Scope

### 6.1 신규 영역 (write OK)

- `scripts/qa-core-route-simulator.{cjs,mjs,ts}` (Phase A에서 결정)
- `tmp/qa-route-simulator-manifests/{caseId}.json` (route manifest 영역)
- `tmp/qa-route-simulator-results/` (산출물)
- 필요 시 helper script 영역 (예: `scripts/qa-route-simulator-helpers/*.cjs`)

### 6.2 read 영역 (touch X)

- `src/store/*` — state slice 영역 read
- `src/engine/*` — engine 영역 함수 import 또는 자체 시뮬 영역
- `src/hooks/useActionDispatch.ts` — action dispatch 영역 read (직접 호출 어려움 — 자체 시뮬)
- `src/data/*` — ScriptedText / caseData JSON read

### 6.3 절대 touch X (사용자 명시)

- ScriptedText / caseData 직접 수정 X
- gameplay runtime 대형 리팩터 X
- **actual OpenAI 호출 X**
- LLM sampling harness X
- browser full playthrough harness X
- Release QA 산출물 (`tmp/qa-release-results/`)과 섞기 X
- Script Polish Audit 산출물 (`tmp/qa-script-polish-audit-results/`)과 섞기 X
- `src/app/pc.css` touch X (UI 서브 영역)
- baseline anchor / feature flag global default X

### 6.4 action 종류 (사용자 명시 8영역)

| # | action | engine 영역 |
|---|---|---|
| 1·2·3 | `judge_question` 3종 (`fact_pursuit` / `motive_search` / `empathy_approach`) | `judgeQuestionEngine.ts` / `questionEffectEngine.ts` |
| 4·5·6 | `evidence_present` / `evidence_combine` / `evidence_investigate` | `evidenceEngine.ts` / `evidenceChallengeEngine.ts` / `combinationLabSlice.ts` |
| 7 | `contradiction_pursuit` | `contradictionEngine.ts` / `lieStateMachine.ts` |
| 8·9 | `witness_summon` / `witness_question` | `witnessEngine.ts` / `witnessTestimonyResolver.ts` |
| 10 | `dossier` 사용 | `meterStagingV2.ts` / `judgeNotebookSlice.ts` |
| 11 | `verdict` / `result` (가능하면) | `verdictEngine.ts` / `aftermathResolver.ts` / `aftermathLLMGenerator.ts` |

### 6.5 검출 영역 (사용자 명시 7영역)

| # | 검출 |
|---|---|
| 1 | 응답 누락 (NPC 답변 빈 / `...` / 1단어) |
| 2 | fallback / generic fallback (캐릭터 archetype 무관 / lieState 무관) |
| 3 | target 무관 답변 (다른 NPC tone / 다른 사건) |
| 4 | action 후 state delta 없음 (`stateDeltaCount = 0`) |
| 5 | lieState / truthStage 변화가 UI surface로 드러나지 않음 (관찰·수첩·발언노트·이벤트 영역 미동작) |
| 6 | unlock 발생 / feedback 없음 (evidence·witness·dispute unlock 후 surface 영역 0) |
| 7 | 판결 / 후일담 누락 또는 너무 일반적 문장 |

### 6.6 spouse-01 핵심 루트 20~30 (사용자 명시)

manifest 영역 (`tmp/qa-route-simulator-manifests/spouse-01.json`):

```json
{
  "caseId": "spouse-01",
  "routes": [
    {
      "id": "p3-fact-d1-a",
      "phase": 3,
      "actions": [
        { "type": "fact_pursuit", "target": "a", "disputeId": "d-1" },
        { "type": "fact_pursuit", "target": "a", "disputeId": "d-1" }
      ],
      "expectedSurfaces": ["chat", "observation"],
      "expectedStateDelta": ["lieState"]
    },
    ...
  ]
}
```

→ Phase B에서 manifest 작성 + 시뮬 실행.

### 6.7 출력 영역 (사용자 명시)

- `findings.json` (8필드 + severity + anomaly 분류 영역)
- case별 transcript markdown (`tmp/qa-route-simulator-results/spouse-01-transcripts.md`)
- anomaly summary (`tmp/qa-route-simulator-results/20260427-anomaly-summary.md`)
- Script Polish Audit 후보 list (`tmp/qa-route-simulator-results/script-polish-candidates.md`)

---

## 7. 절대 회피선

- ScriptedText / caseData 직접 수정 X
- gameplay runtime 대형 리팩터 X
- **actual OpenAI 호출 X** (mock / fallback 영역만 / `VITE_OPENAI_API_KEY` 참조 X / `OPENAI_API_KEY` 참조 X)
- LLM sampling harness X (별도 영역)
- browser full playthrough harness X (별도 영역)
- Release QA 산출물 영역 섞기 X
- Script Polish Audit 산출물 영역 섞기 X
- `src/app/pc.css` touch X
- baseline anchor / feature flag global default 변경 X
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` / `llmDialogueResolver.ts` 본체 변경 X (read only)
- secret / 실제 키 / 사용자 PII 영역 출력 X

---

## 8. 진행 순서

### Phase A — 기술 영역 결정 + spike
1. 기술 영역 옵션 (.cjs / .mjs / Vitest / build) 결정 — CT-Main 보고
2. spouse-01 1~3 routes spike
3. action 1~3종 영역만 (예: `judge_question` × 1~3)
4. transcript + state delta + surface output 시뮬 검증
5. 산출물: `tmp/qa-route-simulator-results/20260427-spike-summary.md`
6. CT-Main 보고

### Phase B — spouse-01 MVP (20~30 routes)
1. manifest 작성 (`tmp/qa-route-simulator-manifests/spouse-01.json`)
2. 시뮬레이터 정식 (action 8종 + 검출 7영역)
3. transcript + anomaly summary
4. findings.json + Script Polish Audit 후보 list
5. 산출물: `tmp/qa-route-simulator-results/20260427-spouse-01-summary.md`
6. CT-Main 보고

### Phase C — family-01 / friend-01 확장
1. 사용자 결정 영역 (Phase B 결과 후)
2. 동일 절차

### Phase D — 통합 보고
1. 3 사건 통합 anomaly summary
2. Script Polish Audit 후보 list (CT-Main → 별도 patch 의뢰서 입력)
3. 산출물 commit + push
4. CT-Main 보고

---

## 9. 종료 조건

- [ ] Phase A 기술 영역 결정 + spike 산출물
- [ ] Phase B spouse-01 manifest + 20~30 routes 시뮬 + anomaly summary
- [ ] Phase C family-01 / friend-01 (사용자 결정 후)
- [ ] Phase D 통합 보고
- [ ] findings.json + transcript markdown + anomaly summary + Script Polish 후보 list
- [ ] `npm run check:all` PASS
- [ ] `npm run build` PASS
- [ ] `npx tsc -b --force` PASS
- [ ] commit + push
- [ ] CT-Main 보고

---

## 10. 산출물

```
scripts/
└── qa-core-route-simulator.{cjs|mjs|ts}    (Phase A 결정)

tmp/qa-route-simulator-manifests/
├── spouse-01.json
├── family-01.json                           (Phase C)
└── friend-01.json                           (Phase C)

tmp/qa-route-simulator-results/
├── 20260427-spike-summary.md                (Phase A)
├── 20260427-spouse-01-summary.md            (Phase B)
├── 20260427-family-01-summary.md            (Phase C)
├── 20260427-friend-01-summary.md            (Phase C)
├── 20260427-overall-summary.md              (Phase D)
├── findings.json                            (8필드 + severity + anomaly)
├── spouse-01-transcripts.md
├── family-01-transcripts.md
├── friend-01-transcripts.md
├── 20260427-anomaly-summary.md
└── script-polish-candidates.md              (Script Polish Audit 입력)
```

---

## 11. 관련 자료

- `docs/spot-check-format.md` (8필드 + 분류)
- `docs/disclosure-policy.md`
- `docs/information-surface-policy.md` v1.1
- `CLAUDE.md`
- `src/store/useGameStore.ts` + 13 슬라이스
- `src/engine/*.ts` (60+ 파일)
- `tmp/REQUEST-Script-Polish-Audit.md` (보조 영역 본질)
- 본 세션 진입 메시지: `tmp/Route-Simulator-NEXT-START-MESSAGE.md`

---

**상태**: 초안 작성 완료. Codex-Dev Route Simulator 검토 + Phase A 진입 대기.
