# REQUEST — Codex-Dev Script Runtime QA Gate (v2 — P0 승격 / Route Simulator → Gate)

**의뢰일**: 2026-04-27 (v2 — P1 보조 툴 → **P0 Script Runtime QA Gate** 승격)
**요청자**: ClaudeCode CT-Main (사용자 명시 영역)
**우선순위**: **P0 출시 차단 영역** (사용자 spot check 의존 영역 중단 본질 / Script Patch 대량 영역 진입 전 본 Gate 구축 본질)
**병렬**: #1 Spoiler Cascade Finalize 완료 후 진입 영역 / Script Polish Audit 영역 정합 / Free Question Hygiene 영역 후속

---

## 1. 본질 변화 (사용자 명시)

기존 영역 = "Lightweight route simulator" P1 보조 툴 영역.
v2 영역 = **"Script Runtime QA Gate"** P0 승격 영역.

본질:
- 사용자 직접 P0 누설 / 무응답 / Q-A 불일치 발견 영역 **중단**
- 자동 검출 영역 본질 (4 검출 영역 hard fail 영역)
- root cause + resolver path + source path 영역 추적
- Gate 결과 영역 → 통합 Script Patch 의뢰서 영역 입력 영역 본질

---

## 2. 진입 조건

- HEAD: 최신 main (#1 Spoiler Cascade Finalize commit + push 완료 영역 후)
- baseline anchor: `baseline-pre-policy-v1` / `v2` 보존
- working tree: tracked clean (#1 Finalize 완료 영역 정합)
- `npm run check:all` PASS / `npm run build:pc` PASS / `npx tsc -b --force` PASS

---

## 3. 분담

| 영역 | 담당 |
|---|---|
| 정책 / scope / 검출 기준 | CT-Main |
| **이 세션 (Codex-Dev Script Runtime QA Gate)** | **Gate 구축 + 4 검출 영역 자동 + 출력 영역 + spouse-01 우선 영역** |
| 통합 Script Patch | 후속 영역 (Gate 결과 영역 입력 영역) |
| 사용자 | 최종 P0/P1 영역 우선순위 결정 영역 |

---

## 4. 사전 audit 결과 (CT 영역 — 기존 Route Simulator audit 영역 정합)

### 4.1 store / dispatch / engine 영역 위치 (이전 영역 정합)
- Store: `src/store/useGameStore.ts` + 13 슬라이스
- Dispatch: `src/hooks/useActionDispatch.ts` (97KB — read only)
- Engine 60+ 파일 — `lieStateMachine.ts` / `judgeQuestionEngine.ts` / `evidenceEngine.ts` / `atomSelectionEngine.ts` / `presentationEngine.ts` / `gameEventTriggerEngine.ts` / `discoveryEngine.ts` / `meterStagingV2.ts` / `disclosureGuard.ts` / `disclosurePolicyLoader.ts` / freeInterrogation/ 영역
- ScriptedText: `src/data/scriptedText/{caseId}.json`
- caseData: `src/data/cases/generated/{caseId}.json`
- Disclosure: `src/data/disclosurePolicy/{caseId}.json`
- emergenceHooks: `src/data/emergenceHooks.ts`

### 4.2 기술 영역 (Phase A에서 결정 / v1 영역 정합)
- (A) `.cjs` (CommonJS) + JSON read + 자체 시뮬 / read engine 함수 일부 영역
- (B) `.mjs` + ts-node / vite-node
- (C) Vitest 환경
- (D) 별도 build

권장 영역: (A) 또는 (C) — lightweight Gate 영역 본질.

---

## 5. Scope (사용자 명시 4 검출 / 출력 / 원칙 / 우선 대상)

### 5.1 핵심 루트 자동 실행 영역
- 우선: **spouse-01 핵심 루트** (특히 Phase 2 영역 — `fact_pursuit` 반복 / evidence unlock / dispute emergence / NPC B response cascade 영역 본질)
- 후속: family-01 / friend-01

### 5.2 action 이후 영역 trace 기록
각 action 영역에 다음 영역 기록:
- dialogue delta (NPC 응답 영역)
- state delta (lieState / truthStage / meter / unlock 영역)
- surface delta (채팅창 / 관찰 / 수첩 / 발언노트 / VFX / UI 배지 영역)
- **resolver path** — `scripted` / `LLM` / `fallback` / `event hook` 영역
- **source path** — `scriptedText key` / `emergenceHook id` / `evidence id` / `discovery trigger id` 영역

### 5.3 4 검출 영역 (필수 / hard fail)

#### 검출 1 — 응답 누락 (hard fail)
다음 action 영역 후 NPC 응답 또는 명시적 safe fallback 영역 0건이면 **hard fail**:
- judge_question (`fact_pursuit` / `motive_search` / `empathy_approach`)
- evidence_present / evidence_combine / evidence_investigate
- contradiction_pursuit
- witness_summon / witness_question
- dossier 사용
- discovery / emergence event

#### 검출 2 — Q-A 불일치 (candidate 추출)
다음 영역 비교:
- action type / questionType / disputeId / target / evidenceId vs NPC response focus
- 다른 쟁점 답변 / 다른 인물 답변 / 엉뚱한 돈/관계/동기 답변 영역 candidate 추출
- intent classifier / contextMapper 영역 정합 (P0-A·B / Hygiene Fast Fix v2 영역 정합)

#### 검출 3 — 스포일러 (hard fail)
다음 영역 위반 시 **hard fail**:
- `docs/disclosure-policy.md` truth lexeme 영역 노출 (§4.1·4.2·4.3 / §13 audit 패턴)
- locked evidence `name` 영역 노출 (`surfaceName` 영역 정합 영역 X)
- evidenceStage 이전 영역 truthDescription / hidden evidence 영역 노출
- S0~S2 영역 NPC full truth 발화

#### 검출 4 — 엉뚱한 이야기 / fallback 품질 (candidate 추출)
- generic fallback ("네, 그렇습니다" / "잘 모르겠습니다" 류 캐릭터 무관 영역)
- 캐릭터 archetype 무관 답변
- active dispute 강제 매핑 (Hygiene Fast Fix v2 §5.3 영역 정합)
- 내부 label `[LLM]` / `[SCRIPT]` / `[FALLBACK]` UI 노출 (Spoiler Cascade #1 §5.4 영역 정합)
- 내부 용어 노출 (`intent` / `classifier` / `guard` / `policy` / `누설` 영역)

### 5.4 출력 영역 (사용자 명시)

```
tmp/qa-runtime-gate-results/
├── findings.json                       (8필드 + severity + category + resolver/source path)
├── route-transcripts/
│   ├── spouse-01-{routeId}.md          (action-by-action trace)
│   ├── family-01-{routeId}.md
│   └── friend-01-{routeId}.md
├── action-by-action-trace.json         (action 영역별 dialogue/state/surface delta)
├── resolver-path-summary.md            (scripted / LLM / fallback / event hook 영역 통계)
├── source-path-summary.md              (scriptedText key / emergenceHook id / evidence id / discovery trigger id)
├── 20260427-spouse-01-summary.md
├── 20260427-family-01-summary.md
├── 20260427-friend-01-summary.md
└── 20260427-overall-summary.md         (severity P0/P1/P2 + patch priority)
```

### 5.5 우선 대상 영역 (사용자 명시)
- **spouse-01 Phase 2 영역 우선** — `fact_pursuit` 반복 / evidence unlock / dispute emergence / NPC B response cascade
- 이후 family-01 / friend-01 영역 확장

### 5.6 원칙 (사용자 명시)
1. **개별 문장만 덮어쓰는 patch X** (Script Patch 영역 X)
2. **root cause 없이 ScriptedText 수정 X**
3. **공통 경로 고정** — surface label resolver / gating / disclosure guard / response coverage 영역
4. **Route Simulator 결과 없이 Script Patch 대량 진행 X**

---

## 6. Write Scope (이 의뢰서 영역)

### 6.1 신규 영역 (write OK)
- `scripts/qa-runtime-gate.{cjs,mjs,ts}` (Phase A에서 결정)
- `scripts/qa-runtime-gate-helpers/*.cjs` (필요 영역만)
- `tmp/qa-runtime-gate-manifests/{caseId}.json` (route manifest 영역)
- `tmp/qa-runtime-gate-results/` (산출물 영역)

### 6.2 read 영역 (touch X)
- `src/store/*` / `src/engine/*` / `src/hooks/*` (read only — 함수 import 또는 자체 시뮬)
- `src/data/*` (ScriptedText / caseData / disclosurePolicy / emergenceHooks 영역 read)

### 6.3 절대 touch X (사용자 명시 + CT 영역)
- ScriptedText / caseData / 정책 영역 직접 수정 X
- gameplay runtime 대형 리팩터 X
- **actual OpenAI 호출 X** (mock / fallback 영역만 / `VITE_OPENAI_API_KEY` 참조 X / `OPENAI_API_KEY` 참조 X)
- LLM sampling harness X (별도 영역)
- browser full playthrough harness X (별도 영역)
- Release QA 산출물 (`tmp/qa-release-results/`)과 섞기 X
- Script Polish Audit 산출물 (`tmp/qa-script-polish-audit-results/`)과 섞기 X
- Spoiler Cascade Finalize 산출물 (`tmp/qa-spouse-01-phase2-spoiler-cascade-results/`)과 섞기 X
- `src/app/pc.css` touch X
- baseline anchor / feature flag global default X
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` / `llmDialogueResolver.ts` 본체 변경 X (read only)
- secret / 실제 키 / 사용자 PII 영역 출력 X
- **개별 문장 덮어쓰는 patch X** (사용자 명시)
- **root cause 없이 ScriptedText 수정 X** (사용자 명시)

---

## 7. 진행 순서

### Phase A — 기술 영역 결정 + spike
1. 기술 영역 옵션 (.cjs / .mjs / Vitest / build) 결정 — CT-Main 보고
2. spouse-01 Phase 2 영역 1~3 routes spike (fact_pursuit 반복 영역)
3. action 1~3종 영역 + 4 검출 영역 1차 검증
4. resolver path / source path 추적 영역 영역 정식 영역
5. 산출물: `tmp/qa-runtime-gate-results/20260427-spike-summary.md`
6. CT-Main 보고

### Phase B — spouse-01 MVP (핵심 루트)
1. manifest 작성 (`tmp/qa-runtime-gate-manifests/spouse-01.json` — 핵심 routes 영역)
2. Gate 정식 (action 영역 + 4 검출 영역 + 출력 영역)
3. **Phase 2 영역 우선** (`fact_pursuit` 반복 / evidence unlock / dispute emergence / NPC B response cascade 영역)
4. findings.json + transcripts + traces + resolver/source path
5. 산출물: `tmp/qa-runtime-gate-results/20260427-spouse-01-summary.md`
6. CT-Main 보고

### Phase C — family-01 / friend-01 확장 (사용자 결정 후)
1. spouse-01 결과 영역 정합 영역 후 진입
2. 동일 절차

### Phase D — 통합 보고
1. 3 사건 통합 findings + 동형 패턴 영역 추출
2. P0/P1/P2 영역 patch priority 영역
3. **통합 Script Patch 의뢰서 영역 입력 영역**
4. 산출물: `tmp/qa-runtime-gate-results/20260427-overall-summary.md`
5. CT-Main 보고

---

## 8. 종료 조건

- [ ] Phase A 기술 영역 결정 + spike 영역
- [ ] Phase B spouse-01 manifest + 핵심 루트 + Phase 2 우선 영역 + 4 검출 영역
- [ ] Phase C family-01 / friend-01 영역 (사용자 결정 후)
- [ ] Phase D 통합 보고
- [ ] findings.json + transcripts + traces + resolver/source path
- [ ] severity P0/P1/P2 + patch priority
- [ ] `npm run check:all` PASS
- [ ] `npm run build:pc` PASS
- [ ] `npx tsc -b --force` PASS
- [ ] commit + push
- [ ] CT-Main 보고

---

## 9. 산출물

```
scripts/
└── qa-runtime-gate.{cjs|mjs|ts}        (Phase A 결정)

tmp/qa-runtime-gate-manifests/
├── spouse-01.json                       (Phase B)
├── family-01.json                       (Phase C)
└── friend-01.json                       (Phase C)

tmp/qa-runtime-gate-results/
├── 20260427-spike-summary.md            (Phase A)
├── 20260427-spouse-01-summary.md        (Phase B)
├── 20260427-family-01-summary.md        (Phase C)
├── 20260427-friend-01-summary.md        (Phase C)
├── 20260427-overall-summary.md          (Phase D)
├── findings.json                        (8필드 + severity + resolver/source path)
├── route-transcripts/
│   ├── spouse-01-{routeId}.md
│   ├── family-01-{routeId}.md
│   └── friend-01-{routeId}.md
├── action-by-action-trace.json
├── resolver-path-summary.md             (scripted / LLM / fallback / event hook 영역 통계)
└── source-path-summary.md               (scriptedText key / emergenceHook id / evidence id / discovery trigger id)
```

---

## 10. 후속 영역 — 통합 Script Patch 의뢰서

본 Gate 결과 영역을 입력 영역으로 **통합 Script Patch 의뢰서** 영역 작성 본질 (CT-Main 영역):
- Gate findings.json + Script Polish Audit findings.json + Spoiler Cascade Finalize 결과 영역 통합
- 동형 패턴 영역 추출 (잘못 패턴 #11 영역 정합)
- 9차원 의미 정확성 영역 정합 (잘못 패턴 #6)
- root cause 영역 우선 / 개별 문장 patch 영역 X
- 공통 경로 영역 정합 (resolver / gating / guard / coverage 영역)

---

## 11. 관련 자료

- `docs/disclosure-policy.md` (truth lexeme / §13 audit 패턴 / §3.2 evidenceStage / §3.3 매트릭스)
- `docs/information-surface-policy.md` v1.1 (§2.1·2.6 surface-only 채널 / §5.1·5.5 자유심문 노출 / §6.3 길이)
- `docs/spot-check-format.md` (8필드 + 분류 카테고리)
- `CLAUDE.md` (게임 핵심 / 한국어 품질 / Phase 8단계)
- `tmp/REQUEST-Codex-Spouse-01-Phase2-Spoiler-Cascade-Fast-Fix.md` (#1 영역 — Gate가 같은 영역 자동 검출 영역 본질)
- `tmp/REQUEST-Codex-FreeQuestion-LLM-Hygiene-Fast-Fix.md` v2 (#2 영역 정합)
- `tmp/qa-script-polish-audit-results/findings.json` (Script Polish Audit 25 findings 영역 — 통합 patch 영역 입력)
- `tmp/qa-release-results/` (Release QA 영역 정합)
- 본 세션 진입 메시지: `tmp/Route-Simulator-NEXT-START-MESSAGE.md` (v2)

---

**상태**: v2 P0 승격 영역 작성 완료. **#1 Spoiler Cascade Finalize commit + push 완료 후** 진입 영역.
