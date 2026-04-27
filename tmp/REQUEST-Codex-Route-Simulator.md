# REQUEST — Codex-Dev Script Runtime QA Gate (v3 — Phase A MVP fast simulator 영역 좁힘 / 사용자 결정 영역)

**의뢰일**: 2026-04-27 (v3 — Phase A 영역 MVP fast simulator 영역 좁힘 / 사용자 결정 영역)
**v2 영역**: 2026-04-27 (P1 보조 툴 → **P0 Script Runtime QA Gate** 승격)
**요청자**: ClaudeCode CT-Main (사용자 명시 영역)
**우선순위**: **P0 출시 차단 영역** (사용자 spot check 의존 영역 중단 본질 / Script Patch 대량 영역 진입 전 본 Gate 구축 본질)
**병렬**: #1 Spoiler Cascade Finalize + #2 Free Question Hygiene v2 완료 영역 후 진입 영역 / Script Polish Audit 영역 정합

---

## 1. 본질 변화 (사용자 명시)

기존 영역 = "Lightweight route simulator" P1 보조 툴 영역.
v2 영역 = **"Script Runtime QA Gate"** P0 승격 영역.
**v3 영역 (현재) = Phase A 영역만 MVP fast simulator 영역 좁힘 영역 (사용자 결정 영역).**

본질:
- 사용자 직접 P0 누설 / 무응답 / Q-A 불일치 발견 영역 **중단**
- 자동 검출 영역 본질 (4 검출 영역 hard fail 영역)
- root cause + resolver path + source path 영역 추적
- Gate 결과 영역 → 통합 Script Patch 의뢰서 영역 입력 영역 본질

**v3 영역 좁힘 영역 (사용자 결정 영역)**:
- 전체 Gate 영역 한 번에 완성 영역 X
- **Phase A 영역 = lightweight script QA simulator MVP 영역 본질**
- 목적 = 스크립트 체크 속도 빠르게 끌어올리는 것
- 검출 도구 + 결과 영역 본질 (patch 영역 X / 후속 영역)
- spouse-01 Phase 2 영역 끝까지 → CT-Main 보고 → family-01 / friend-01 확장 영역 후속 (사용자 결정)

---

## 2. 진입 조건

- HEAD: 최신 main (`59a26d4` 영역 — #2 Free Question Hygiene v2 commit + push 완료 영역 정합)
- baseline anchor: `baseline-pre-policy-v1` / `v2` 보존
- working tree: tracked clean (untracked 보존 OK — `tmp/CODEX-MAIN-HANDOFF-20260427-P0-PARALLEL.md` / `tmp/PASTE-Codex-Spouse-01-Phase2-Finalize-FIRST-MESSAGE.md` 영역)
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

## 7. 진행 순서 (v3 영역 — 사용자 결정 영역 정합)

### Phase A — MVP fast simulator (spouse-01 Phase 2 끝까지)

**목적**: 스크립트 체크 속도 빠르게 끌어올림 — 검출 도구 + 결과 본질.

**우선 범위 (사용자 명시 5 영역)**:
- actual OpenAI 호출 X
- browser full playthrough X
- src runtime 본체 수정 X
- ScriptedText / caseData / disclosurePolicy / emergenceHooks **read-only**
- 신규 write 영역 = `scripts/qa-runtime-gate.*` / `tmp/qa-runtime-gate-manifests/*` / `tmp/qa-runtime-gate-results/*` 영역만

**MVP 기능 (사용자 명시 6 영역)**:
1. **manifest 영역** — spouse-01 Phase 2 route manifest 영역 read 또는 minimal create (`tmp/qa-runtime-gate-manifests/spouse-01.json` 영역)
2. **transcript 영역** — scriptedText / caseData / disclosurePolicy / emergenceHooks read → action-by-action transcript 생성
3. **빠른 검출 8 영역**:
   - (a) 응답 누락
   - (b) `[SCRIPT]` / `[FALLBACK]` / `[LLM]` 내부 label 노출
   - (c) locked evidence `name` 노출
   - (d) `surfaceName` 대신 truth `name` 노출
   - (e) S0~S2 truth lexeme 노출 (`docs/disclosure-policy.md` §4.1·4.2·4.3 영역 정합)
   - (f) `evidenceStage` 이전 hidden / truth description 노출
   - (g) 명백한 Q-A mismatch 후보 (action type / disputeId / target / evidenceId vs response focus)
   - (h) generic fallback / archetype 무관 fallback 후보
4. **findings.json 영역** — `tmp/qa-runtime-gate-results/findings.json` (8필드 + severity + category)
5. **route transcript 영역** — `tmp/qa-runtime-gate-results/route-transcripts/spouse-01-phase2-fast.md` (action-by-action 영역)
6. **spike summary 영역** — `tmp/qa-runtime-gate-results/20260427-spike-summary.md` (한계 + 다음 확장 계획 영역 명시)

**진행**:
1. spouse-01 Phase 2 영역 끝까지 돌림 (fact_pursuit 반복 / evidence unlock / dispute emergence / NPC B response cascade 영역)
2. CT-Main 영역 보고
3. family-01 / friend-01 확장 영역 = **사용자 결정 영역 후 진입** (Phase B 영역)

**원칙 영역 (사용자 명시)**:
- 개별 문장 patch X
- root cause 없이 ScriptedText 수정 X
- "검출 도구 + 결과"가 목적 영역 본질 (patch 영역 X / 후속 영역)

### Phase B — family-01 / friend-01 확장 (사용자 결정 후)

spouse-01 MVP 영역 결과 영역 보고 + 사용자 결정 영역 후 진입.

1. family-01 / friend-01 manifest 영역 (`tmp/qa-runtime-gate-manifests/{caseId}.json`)
2. Phase A 영역 동일 절차 영역 (8 검출 영역 / transcript 영역 / findings 영역)
3. 산출물 영역: `tmp/qa-runtime-gate-results/20260427-{family-01,friend-01}-summary.md`
4. CT-Main 영역 보고

### Phase C — 통합 보고 (사용자 결정 후)

1. 3 사건 영역 통합 findings + 동형 패턴 영역 추출 (잘못 패턴 #11 정합)
2. P0/P1/P2 영역 patch priority 영역
3. **통합 Script Patch 의뢰서 영역 입력 영역**
4. 산출물: `tmp/qa-runtime-gate-results/20260427-overall-summary.md`
5. CT-Main 보고

---

## 8. 종료 조건 (v3 영역 — Phase A MVP 영역만)

### Phase A 종료 조건 (이번 세션 영역)
- [ ] spouse-01 Phase 2 manifest 영역 (read 또는 minimal create)
- [ ] action-by-action transcript 영역
- [ ] 8 검출 영역 (응답 누락 / 내부 label / locked name / surface vs truth name / S0~S2 truth lexeme / evidenceStage 이전 / Q-A mismatch / generic·archetype 무관 fallback)
- [ ] `tmp/qa-runtime-gate-results/findings.json` 영역
- [ ] `tmp/qa-runtime-gate-results/route-transcripts/spouse-01-phase2-fast.md` 영역
- [ ] `tmp/qa-runtime-gate-results/20260427-spike-summary.md` 영역 (한계 + 다음 확장 계획)
- [ ] `npm run check:all` PASS
- [ ] `npm run build:pc` PASS
- [ ] `npx tsc -b --force` PASS
- [ ] commit + push
- [ ] CT-Main 보고

### Phase B / C 종료 조건 (사용자 결정 후 진입 영역)
- Phase A 영역 보고 영역 후 사용자 결정 영역 진입

---

## 9. 산출물 (v3 영역)

### Phase A 영역 (이번 세션 영역 — MVP fast simulator)

```
scripts/
└── qa-runtime-gate.{cjs|mjs|ts}                      (기술 영역 Codex-Dev 결정)

tmp/qa-runtime-gate-manifests/
└── spouse-01.json                                    (Phase 2 영역 minimal manifest)

tmp/qa-runtime-gate-results/
├── findings.json                                     (8필드 + severity + category)
├── route-transcripts/
│   └── spouse-01-phase2-fast.md                     (action-by-action 영역)
└── 20260427-spike-summary.md                         (한계 + 다음 확장 계획)
```

### Phase B / C 영역 (사용자 결정 후 영역 — 후속)

```
tmp/qa-runtime-gate-manifests/
├── family-01.json                                    (Phase B)
└── friend-01.json                                    (Phase B)

tmp/qa-runtime-gate-results/
├── 20260427-family-01-summary.md                     (Phase B)
├── 20260427-friend-01-summary.md                     (Phase B)
├── 20260427-overall-summary.md                       (Phase C)
├── route-transcripts/
│   ├── family-01-{routeId}.md
│   └── friend-01-{routeId}.md
├── action-by-action-trace.json                       (옵션 영역 — 확장 시)
├── resolver-path-summary.md                          (옵션 영역 — 확장 시)
└── source-path-summary.md                            (옵션 영역 — 확장 시)
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

**상태**: v3 영역 (Phase A MVP fast simulator 영역 좁힘 영역 / 사용자 결정 영역) 작성 완료.

진입 영역 정합:
- HEAD `59a26d4` (#2 Free Question Hygiene v2 commit + push 완료 영역)
- main == origin/main / tracked clean
- untracked 2개 보존 (사용자 명시 영역 — rm/stash/discard X)
- Phase A MVP 영역 = spouse-01 Phase 2 영역 끝까지 → CT-Main 보고 → Phase B/C 사용자 결정 영역 후 진입
