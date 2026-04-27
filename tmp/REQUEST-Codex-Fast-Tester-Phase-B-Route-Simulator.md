# REQUEST — Fast Tester Phase B: Route/Runtime Simulator 고도화

**의뢰일**: 2026-04-27
**요청자**: ClaudeCode CT-Main
**우선순위**: P0 출시 차단 (Stage 1/2/3 patch와 **병행 가능 별도 트랙**)
**기준 SHA**: `10f5aed` (Stage 1 의뢰서 commit) / runner 시작점 `439cb5b`
**상위 정책**: `tmp/REQUEST-Codex-Integrated-Script-Patch-AllCases-P0-v2.md` (commit `3973ac6`) — Stage 1/2/3는 본 의뢰서와 별개로 진행

---

## 1. 본질

현재 `scripts/qa-runtime-gate.cjs` 기본 모드는 **static / facsimile scan**입니다. 14,931 variants를 정적으로 검사해서 1,914 findings를 산출했지만, 다음 항목은 정적 모드에서 검출 불가입니다:

- 실제 dispatch 실행 시 `evidence_investigate`가 system 발화만 만들고 NPC 응답이 없어지는 route-runtime 결함 (Phase A audit RC4)
- 질문 순서·증거 해금·lieState·evidenceStage 조합에 따른 응답 정합 (`Q-A mismatch`의 실행 차원)
- safe fallback 매칭 / 상황별 fallback 누락
- emergence event 트리거 후 후속 발화 정합

`--legacy-route` 옵션에 Phase A spike runner가 보존되어 있지만, 단일 manifest(`tmp/qa-runtime-gate-manifests/spouse-01.json`) / 3 routes / 10 actions 한정입니다. **이를 Phase B로 승격해 3 사건 × 다중 route × 다중 조합으로 확장**합니다.

본 의뢰서는 **Stage 1/2/3 patch와 병행 가능한 별도 트랙**입니다. patch 흐름(`tmp/REQUEST-Codex-Integrated-Script-Patch-AllCases-P0-v2.md`)과 **runner / 산출물 / 산출 위치 모두 분리**하여 두 시스템이 공존합니다.

---

## 2. 선행 / 진입 조건

```bash
git pull origin main
git log --oneline -1                    # HEAD = 10f5aed 또는 그 이후
git status --short --branch             # tracked dirty 0
git diff --quiet && git diff --cached --quiet && echo "tracked clean"
npm run check:all                       # PASS
npm run build:pc                        # PASS
npx tsc -b --force                      # PASS
```

PASS 후 진행. tracked dirty / hard > 0 / build fail 시 즉시 중단 + CT-Main 보고.

baseline anchor `baseline-pre-policy-v1` / `v2`는 보존합니다. v3 anchor는 Stage 1/2/3 patch 트랙에서 단계적으로 추가되며 **본 의뢰서는 anchor 생성하지 않습니다**.

---

## 3. 분담

| 역할 | 담당 |
|---|---|
| 정책 / scope / 의뢰서 / Gate spec 결정 정리 | CT-Main |
| **본 의뢰서 구현 (Phase B-1 ~ B-5)** | **Codex-Dev** |
| Gate spec 옵션 최종 선택 | 사용자 (Codex-Dev가 옵션 보고 → CT-Main 정리 → 사용자 결정) |
| Stage 1/2/3 patch 트랙 (병행) | 별도 흐름 (`v2` 의뢰서) |

---

## 4. 입력 자료

### 4.1 기존 자산 (`439cb5b` / `10f5aed`)
- `scripts/qa-runtime-gate.cjs` (line 79 `--legacy-route` 분기 / line 87 `runAllCasesFastQa` / `RESPONSE_REQUIRED_ACTIONS` / `SAFE_CONTEXT_FALLBACKS` / `valueArg('--case'|'--route')` 옵션 구조)
- `tmp/qa-runtime-gate-manifests/spouse-01.json` (Phase A spike manifest — 3 routes / 10 actions)
- `tmp/qa-runtime-gate-results/route-transcripts/spouse-01-phase2-*.md` (Phase A 3 transcript — 본 트랙 baseline 참고)
- `tmp/qa-runtime-gate-results/action-by-action-trace.json` / `resolver-path-summary.md` / `source-path-summary.md` (Phase A 산출물 — 새 산출물의 schema 참고)

### 4.2 Phase A audit (RC4 root cause)
- `tmp/qa-codex-spouse-01-p0-patch-results/20260427-phase-a-audit.md` (§Root Cause 4 Spike — runtime contract 충돌 분석)
- `tmp/qa-codex-spouse-01-p0-patch-results/baseline-anchor-v3-proposal.md`

### 4.3 Static sweep 결과 (read-only — 비교 baseline)
- `tmp/qa-runtime-gate-results/findings.json` (1,914 findings)
- `tmp/qa-runtime-gate-results/20260427-all-cases-summary.md`
- `tmp/qa-runtime-gate-results/{spouse-01,family-01,friend-01}-summary.md`
- `tmp/qa-runtime-gate-results/channel-summary.md` / `patch-priority.md`

### 4.4 Runtime 코드 (read-only / dispatch 모방 정합 확인용)
- `src/hooks/useActionDispatch.ts` (특히 `handleEvidenceInvestigate` / `handleJudgeQuestion` / `handleEvidencePresent` / `handleContradictionPursuit` / `handleWitnessSummon` / dossier · emergence 처리)
- `src/store/*` (slice 단위 — interrogation / evidence / lieState / emotion / dossier / emergence / witness / score)
- `src/engine/lieStateMachine.ts` / `meterStagingV2.ts` / `evidenceEngine.ts` / `judgeQuestionEngine.ts` / `gameEventTriggerEngine.ts` / `emotionEngine.ts` / `discoveryEngine.ts`
- `src/data/scriptedText/*.json` / `src/data/cases/generated/*.json` / `src/data/disclosurePolicy/*.json` / `src/data/emergenceHooks.ts`

### 4.5 정책
- `docs/disclosure-policy.md` v1.1
- `docs/information-surface-policy.md` v1.1
- `docs/spot-check-format.md`
- `CLAUDE.md` (게임 핵심 / 한국어 품질)

### 4.6 메모리 / 잘못 패턴 (운영 Claude memory 참조 — repo-local 파일 X)

> 본 의뢰서 적용 시 CT-Main이 본문 동봉.

- `feedback_static_analysis_limit` (#12 정적 분석 한계 — **본 트랙 핵심 근거**)
- `feedback_broad_homologous_detection` (#11)
- `feedback_truth_leak_prohibition` (#9)
- `feedback_ct_audit_before_request` (코드 spot audit)

---

## 5. Scope

### 5.1 목표 (사용자 명시 6항목)

1. **`evidence_investigate` 포함 실제 route trace 생성** — dispatch 모방으로 system 발화 + 후속 NPC 질문 발화 흐름까지 기록
2. **response missing 검출 복원** — `RESPONSE_REQUIRED_ACTIONS`에 `evidence_investigate`가 남아 있을지, 또는 새 detector(`evidence_investigate_no_npc_followup` 등)로 대체할지 §10 결정안에 따름
3. **질문 순서 / 증거 해금 순서 / lieState / evidenceStage 조합 반복 실행** — manifest 단위로 multi-route, 각 route는 사전 정의된 action 시퀀스
4. **trace JSON 및 coverage summary 산출** — per-route trace + per-case coverage + 전체 coverage
5. **static all-cases gate와 별도 runner로 유지** — 실행 명령·산출 위치·schema 모두 분리
6. **Runtime contract 문제 시 Gate spec 결정안 포함** — Phase A audit 3옵션을 본 의뢰서 §10에 통합, Codex-Dev가 spike 결과로 옵션 검증 + 권장안 보고 → 사용자 결정

### 5.2 비목표 (본 의뢰서 X)

- ScriptedText / caseData / disclosurePolicy 텍스트 변경 (Stage 1/2/3 patch 트랙 영역)
- runtime 본체 코드 변경 — 단, **§10 Gate spec 결정 후 별도 Phase B-6 commit으로 분리** 가능 (사용자 승인 시)
- Static sweep runner(`runAllCasesFastQa`) 변경 — read-only / 분리 유지
- baseline anchor v3 생성 / tagging
- LLM 실호출 / browser full playthrough harness
- `_LEGACY_84CASES_DO_NOT_REFERENCE/` 자료 참조

---

## 6. Runner 설계

### 6.1 분리 정책 (사용자 명시)

| 항목 | Static all-cases gate | Route/Runtime simulator (본 트랙) |
|---|---|---|
| 진입 | `node scripts/qa-runtime-gate.cjs` (default) | `node scripts/qa-route-simulator.cjs` (신규) |
| 모드 | static / facsimile scan | route runtime simulation |
| 입력 | scriptedText / caseData / disclosurePolicy 정적 read | manifest + dispatch 모방 |
| 출력 | `tmp/qa-runtime-gate-results/*` | `tmp/qa-route-simulator-results/*` |
| Detector 영역 | truth leak / Q-A mismatch (정적) / fallback / surface 정합 | response missing 복원 / route 시퀀스 정합 / coverage |

> 두 runner는 **같은 source data를 read하지만 별개 파일·별개 산출 위치**입니다. 공유 헬퍼는 `scripts/qa-runner-shared/*.cjs`로 분리해서 둘이 require 가능하나, runtime 본체 import는 X (read-only).

### 6.2 신규 entry point — `scripts/qa-route-simulator.cjs`

#### 6.2.1 CLI
```
node scripts/qa-route-simulator.cjs                           # 모든 case × 모든 route
node scripts/qa-route-simulator.cjs --case spouse-01          # 단일 case
node scripts/qa-route-simulator.cjs --case spouse-01 --route phase2-fact-repeat-b-d1-e4-present
node scripts/qa-route-simulator.cjs --coverage-only           # finding 생략, coverage summary만
```

#### 6.2.2 입력 manifest

위치: `tmp/qa-route-simulator-manifests/{caseId}.json`

각 manifest는 1 case에 대해 **3~5 routes** 정의. 각 route는 action 시퀀스로 구성.

```jsonc
{
  "caseId": "spouse-01",
  "routes": [
    {
      "id": "phase3-baseline",
      "summary": "Phase 3 기본 진행 — d-1 fact_pursuit 4회 + e-1 evidence_present + dossier 사용",
      "phase": "phase3",
      "initialState": { "lieState": "S0", "trustChannel": 0 },
      "actions": [
        { "type": "judge_question", "subAction": "fact_pursuit", "disputeId": "d-1" },
        { "type": "judge_question", "subAction": "fact_pursuit", "disputeId": "d-1" },
        { "type": "evidence_present", "evidenceId": "e-1", "lieBand": "early" },
        { "type": "evidence_investigate", "evidenceId": "e-1", "subAction": "request_original" },
        { "type": "judge_question", "subAction": "motive_search", "disputeId": "d-1" },
        { "type": "contradiction_pursuit", "disputeId": "d-1" }
      ]
    }
    // ... routes
  ]
}
```

#### 6.2.3 Dispatch 모방 (read-only / 본체 import X)

`useActionDispatch.ts`의 핸들러 의미를 별도 모듈로 재구현 (실제 코드 import 없이 정합 모방):
- `handleJudgeQuestion` → judgeQuestionEngine 모방 + atom 선택 모방 + system 메시지 + NPC 응답 발화 trace
- `handleEvidencePresent` → 증거 unlock 상태 / lieState 영향 / NPC 응답 trace
- `handleEvidenceInvestigate` → `investigationResults[subAction]` system 발화 + (옵션) NPC 후속 — Gate spec 결정 결과 반영
- `handleContradictionPursuit` → 모순 토큰 / lieState 전이 trace
- `handleWitnessSummon` / `handleWitnessQuestion` → 증인 발화 trace
- dossier 카드 / emergence 이벤트 / discovery 트리거 trace

각 action 처리 시 **state 전이 + 발화 시퀀스**를 trace에 기록 (speaker / channel / textField / variantId / lieState before-after / evidenceStage / 트리거 이벤트 등).

> ⚠️ runtime 본체(`src/hooks/useActionDispatch.ts` 등) **import 금지**. dispatch 의미를 별도 helper에서 재구현 — runtime 변경에 자동 동기화되지 않음 → 정합 검증은 spot test 단위에서 진행 (§11).

### 6.3 공유 헬퍼 — `scripts/qa-runner-shared/*.cjs`

신규 헬퍼 (필요 시):
- `scripts/qa-runner-shared/lexeme-detection.cjs` (truth lexeme 매칭 — static gate와 공유)
- `scripts/qa-runner-shared/case-loader.cjs` (case data / scripted text / disclosure policy load)
- `scripts/qa-runner-shared/postposition.cjs` (한국어 조사 정합 — `koreanPostposition.ts` 의미 모방)

기존 `scripts/qa-runtime-gate.cjs`에서 분리 가능한 함수가 있으면 헬퍼로 이동 후 양쪽 require — 단, **Static gate 동작 변경 X / 결과 동일성 검증 PASS 후에만 분리**.

---

## 7. Manifest / Route 정의 (Codex-Dev 작성)

각 case별 manifest에 **3~5 routes**. routes는 다음 매트릭스를 골고루 커버:

| 차원 | 값 |
|---|---|
| Phase | phase2 / phase3 / phase4 / phase5 |
| 주 action | judge_question (3 subAction) / evidence_present / evidence_investigate / evidence_combine / contradiction_pursuit / witness_summon / dossier 사용 |
| lieState 시작 | S0 / S2 / S3 |
| 조합 패턴 | linear (단일 dispute) / branching (multi dispute) / cascading (evidence 연쇄) / interrogation-heavy / evidence-heavy |
| 종료 lieState | S3 / S4 / S5 |

**총 route 수**: 3 사건 × 4 routes ≒ 12 routes. CT-Main이 사용자 결정에 따라 ±2 조정 가능.

각 route는 **결정적**이어야 함 (random 없음 / fixed seed). 동일 manifest로 동일 trace 산출 보장.

---

## 8. Detector 복원 / 확장

### 8.1 복원 (Phase A spike에서 작동)
- `response_missing` (Phase A QARG-0003 영역) — Gate spec 결정안에 따라 다음 중 하나:
  - (i) `evidence_investigate`를 `RESPONSE_REQUIRED_ACTIONS`에 유지 + NPC follow-up 응답 데이터 추가 정책 (caseData 또는 scriptedText)
  - (ii) `evidence_investigate`를 `RESPONSE_REQUIRED_ACTIONS`에서 제외 + 새 detector `evidence_investigate_no_npc_followup` (P1 informational)
  - (iii) `investigationStages[].scriptedNpcResponses` 필드를 caseData에 wire + runner가 그것을 read

### 8.2 신규 detector (route 차원 전용)
- `route_action_unhandled` — manifest action을 dispatcher가 처리 못하는 case
- `qa_mismatch_runtime` — 실제 trace에서 다른 dispute / 다른 인물 응답 (정적 sweep의 `qa_mismatch_candidate` 822건 중 실행 차원 검증)
- `lie_state_regression` — lieState가 부당하게 역행 (정책 위반)
- `evidence_stage_skip` — evidenceStage가 단계 건너뜀
- `truth_leak_runtime` — 실행 시점에 plain truth lexeme이 NPC 발화로 노출 (정적 sweep과 별도 — runtime variant 선택 결과)
- `safe_fallback_used` — SAFE_CONTEXT_FALLBACKS가 실제 사용된 경우 (informational, P2)

### 8.3 detector severity 매트릭스

| detector | severity | 비고 |
|---|---|---|
| route_action_unhandled | P0 | 본질적 결함 |
| response_missing | (Gate spec 결정에 따라) P0 또는 P1 |
| qa_mismatch_runtime | P0 | 실행 차원이라 정적보다 강한 신호 |
| lie_state_regression | P0 | 정책 위반 |
| evidence_stage_skip | P0 | Truth Throttle 위반 |
| truth_leak_runtime | P0 | `feedback #9` 게임 핵심 |
| safe_fallback_used | P2 | informational |

---

## 9. 산출물

```
scripts/
├── qa-route-simulator.cjs                              (신규 entry point)
└── qa-runner-shared/                                   (신규 / 공유 헬퍼)
    ├── lexeme-detection.cjs
    ├── case-loader.cjs
    └── postposition.cjs

tmp/qa-route-simulator-manifests/
├── spouse-01.json                                      (3~5 routes)
├── family-01.json                                      (3~5 routes)
└── friend-01.json                                      (3~5 routes)

tmp/qa-route-simulator-results/
├── findings.json                                       (route 차원 P0/P1/P2)
├── coverage-summary.md                                 (action / lieState / evidenceStage / phase coverage)
├── 20260427-phase-b-spike-summary.md                   (Phase B-1 spike 결과)
├── 20260427-all-routes-summary.md                      (Phase B-2 이후 전체)
├── {caseId}-route-summary.md                           (3 파일)
├── route-transcripts/
│   ├── {caseId}-{routeId}.md                           (route별 transcript / Phase A schema 확장)
│   └── ...
└── action-by-action-trace.json                         (per route × per action / Phase A schema 확장)
```

> Phase A spike 산출물은 `tmp/qa-runtime-gate-results/` 영역에 보존되어 있으며 **본 트랙은 별도 위치**(`qa-route-simulator-results/`)를 사용.

---

## 10. Gate Spec 결정안 (RC4 통합)

### 10.1 Phase A audit 3 옵션 (보존)

| 옵션 | 설명 | runner 영향 | data 영향 |
|---|---|---|---|
| (i) | `evidence_investigate`에 NPC follow-up 응답을 caseData/scriptedText에 추가 + dispatch가 그걸 read | runner 변경 X (response_missing 유지) | data scope ↑ |
| (ii) | Gate 재정의 — `evidence_investigate` system-only를 response-required에서 제외 | `RESPONSE_REQUIRED_ACTIONS`에서 제거 + 새 P1 informational detector | data 변경 X |
| (iii) | `investigationStages[].scriptedNpcResponses` 신규 필드를 runtime + Gate 양쪽에 wire | runner read 로직 추가 | type 추가 + data scope ↑ |

### 10.2 Codex-Dev가 Phase B-1 spike 단계에서 검증할 항목

각 옵션에 대해:
- runner 변경량 추정 (LOC / 영향 면적)
- data 추가 필요 여부 (caseData 영역 / scriptedText 영역)
- runtime 본체 영향 (옵션 i / iii는 dispatch 변경 필요)
- player UX 의도 정합 (CLAUDE.md "NPC는 명시적 질문 시에만 발언" 원칙)
- player 추리 흐름 영향 ("진실은 플레이어가 직접 밝혀낸다" 정합)

### 10.3 보고 schema

Codex-Dev → CT-Main 보고:
```jsonc
{
  "phaseB1Spike": {
    "spouse01_phase3_baseline": "trace ...",
    "evidenceInvestigateActions": 3,
    "responseMissingFindings": 3
  },
  "gateSpecOptions": [
    { "id": "i", "runnerLoc": 50, "dataChanges": "caseData NPC field add", "runtimeImpact": "dispatch read", "uxFit": "약함 — 자동 NPC 발언 위반 우려", "recommendation": "..." },
    { "id": "ii", "runnerLoc": 20, "dataChanges": "none", "runtimeImpact": "none", "uxFit": "강함", "recommendation": "..." },
    { "id": "iii", "runnerLoc": 80, "dataChanges": "investigationStages.scriptedNpcResponses add", "runtimeImpact": "dispatch + judgeQuestionEngine integration", "uxFit": "중간", "recommendation": "..." }
  ],
  "ctRecommendation": "..."
}
```

CT-Main이 보고 받아 사용자에게 정리·전달 → 사용자 결정 → 결정에 따라 Phase B-3 detector 영역 확정.

### 10.4 결정 후 수행 영역

- 옵션 (ii) 선택 시: runner 단독 변경 + 본 의뢰서 Phase B-3에서 처리 (data·runtime 변경 X)
- 옵션 (i) / (iii) 선택 시: 본 의뢰서 Phase B-6로 분리, **별도 사용자 승인** 후 진행 (data 또는 runtime 변경 발생). 의뢰서 split.

---

## 11. 진행 절차

### Phase B-1 — Runner 골격 + spouse-01 1 route spike

1. `scripts/qa-route-simulator.cjs` 신규 entry + 최소 dispatch 모방 (judge_question / evidence_present / evidence_investigate)
2. `tmp/qa-route-simulator-manifests/spouse-01.json` 1 route 작성 (`phase3-baseline`)
3. trace JSON + transcript MD 산출 schema 확정
4. `--legacy-route` runner 결과와 행동 정합 spot 비교 (3 hard finding 영역)
5. CT-Main 보고: spike 결과 + Gate spec 옵션 검증(§10.2) + 권장안

### Phase B-1.5 — 사용자 Gate spec 결정

1. CT-Main이 §10.3 보고 받아 정리·전달
2. 사용자 결정 → CT-Main이 본 의뢰서 §8 detector 영역 확정 (옵션 i/ii/iii)
3. 옵션 (i)/(iii) 선택 시 Phase B-6 분리 의뢰서 작성

### Phase B-2 — 3 사건 × 3~5 routes 확장

1. spouse-01 / family-01 / friend-01 각각 manifest 작성 (3~5 routes)
2. dispatch 모방 확장 (contradiction_pursuit / witness_summon / dossier / emergence)
3. 모든 route 실행 + trace 산출

### Phase B-3 — Detector 보강

1. §8 detector 7종 구현 (severity 매트릭스 정합)
2. coverage summary 산출 (action / lieState / evidenceStage / phase 차원)
3. 정적 sweep `qa_mismatch_candidate` 822건 중 실행 차원 교차 검증 → `qa_mismatch_runtime` finding 생성

### Phase B-4 — Coverage summary + per-case route summary

1. `tmp/qa-route-simulator-results/coverage-summary.md`
2. case별 route summary (3 파일)
3. 전체 summary

### Phase B-5 — 검증 + commit + push

1. `node --check scripts/qa-route-simulator.cjs` PASS
2. `npx eslint scripts/qa-route-simulator.cjs` PASS
3. `node scripts/qa-route-simulator.cjs` PASS — 산출물 생성 확인
4. `node scripts/qa-runtime-gate.cjs` 재실행 → static sweep 결과 동일성 (회귀 0)
5. `npm run check:all` / `npm run build:pc` / `npx tsc -b --force` PASS
6. commit `feat(scripts): add Fast Tester Phase B route/runtime simulator`
7. push + CT-Main 보고

### Phase B-6 (조건부) — Gate spec 옵션 (i)/(iii) 적용

- 사용자가 옵션 (i) 또는 (iii) 선택한 경우만 진행
- 별도 의뢰서로 split (data / runtime 변경 영역) — CT-Main이 Phase B-5 closing 후 작성

---

## 12. Write Scope

### 12.1 변경 OK
- `scripts/qa-route-simulator.cjs` (신규)
- `scripts/qa-runner-shared/*.cjs` (신규 — 분리 시 static gate 결과 동일성 검증 PASS 후)
- `tmp/qa-route-simulator-manifests/{caseId}.json` (3 신규)
- `tmp/qa-route-simulator-results/*` (산출물)
- `package.json` `scripts` 항목에 신규 npm script 추가 가능 (예: `"qa:route": "node scripts/qa-route-simulator.cjs"`)

### 12.2 read-only
- `scripts/qa-runtime-gate.cjs` (단, §6.3 헬퍼 분리 시 static gate 동작 동일성 검증 PASS 후에만 변경 OK — 결과 동일성 깨지면 즉시 원복)
- `src/data/scriptedText/*.json` / `src/data/cases/generated/*.json` / `src/data/disclosurePolicy/*.json` / `src/data/emergenceHooks.ts`
- `src/hooks/*` / `src/store/*` / `src/engine/*` / `src/components/*`
- 정책 docs / `pc.css` / API proxy / `VITE_OPENAI_API_KEY` 참조

### 12.3 변경 X (절대)
- runtime 본체 코드 (옵션 i/iii는 Phase B-6 별도 의뢰서로 분리)
- Static sweep runner의 default 동작 (`runAllCasesFastQa`)
- `tmp/qa-runtime-gate-results/*` (Phase A spike + static sweep 산출물 영역 — 본 트랙은 `qa-route-simulator-results/` 사용)
- baseline anchor v1 / v2 / v3
- Stage 1/2/3 patch 트랙 산출물 / 의뢰서

---

## 13. 절대 회피선

### 사용자 명시
- Static all-cases gate와 합쳐 단일 runner로 만들지 X — 분리 정책 유지
- runtime 본체 import X — dispatch 의미는 별도 모듈에서 재구현
- LLM 실호출 X — fallback / mock 영역만
- 정적 sweep 결과 변경 X — read-only baseline

### CT 영역
- `_LEGACY_84CASES_DO_NOT_REFERENCE/` 자료 참조 X
- ScriptedText / caseData / 정책 docs / pc.css / baseline anchor / feature flag 변경 X (§12 변경 X)
- VITE_OPENAI_API_KEY / OPENAI_API_KEY 참조 X
- API proxy 구조 변경 X
- secret / 실제 키 / 사용자 PII 출력 X
- browser full playthrough harness X

### 운영
- Phase B-5 closing 전에 Phase B-6 진입 X (옵션 i/iii는 별도 의뢰서)
- Static gate 결과 동일성 검증 없이 공유 헬퍼 분리 X
- 산출물 위치 `tmp/qa-route-simulator-results/`에서 벗어나기 X (Phase A spike 영역과 섞기 X)

---

## 14. 종료 조건 (Phase B-5)

- [ ] `scripts/qa-route-simulator.cjs` 신규 entry 작성
- [ ] 3 case × 3~5 routes manifest 완성
- [ ] dispatch 모방 7+ action type 처리
- [ ] §8 detector 7종 구현 (Gate spec 결정 결과 반영)
- [ ] `tmp/qa-route-simulator-results/` 모든 산출물 생성
- [ ] coverage summary (action / lieState / evidenceStage / phase 차원)
- [ ] static sweep runner 결과 동일성 (회귀 0)
- [ ] `node --check` / `npx eslint` / 실행 / `npm run check:all` / `build:pc` / `tsc -b --force` PASS
- [ ] commit `feat(scripts): add Fast Tester Phase B route/runtime simulator` + push
- [ ] CT-Main 보고 (commit hash + coverage summary + Gate spec 결정 권장안)

---

## 15. 후속

1. **Phase B-6 (조건부)**: Gate spec 옵션 (i) 또는 (iii) 선택 시 별도 의뢰서로 진행 (data / runtime 변경 영역).
2. **`qa_mismatch_candidate` 822건 → `qa_mismatch_runtime` 교차 검증 결과**: P1-script-focus-review 의뢰서 작성 시 본 트랙 산출물 입력으로 사용.
3. **Stage 1/2/3 patch closing 후 회귀 검증**: 본 트랙 runner로 patch 적용 결과 행동 정합 확인.
4. **emergence event / discovery / dossier 트리거 차원 확장**: Phase B-2 manifest로 부분 커버 후, 필요 시 Phase C 의뢰서로 별도.
5. **LLM 실호출 sampling harness**: 본 트랙 외 별도 트랙 (Codex-Dev 영역 X / 사용자 정책 결정 영역).

---

## 16. 관련 자료

### 트랙 분리
- 본 트랙: Fast Tester Phase B — Route/Runtime Simulator
- 별 트랙(병행): `tmp/REQUEST-Codex-Integrated-Script-Patch-AllCases-P0-v2.md` (commit `3973ac6`) → Stage 1: `tmp/REQUEST-GPT-Pro-Stage1-P0-Evidence-Stage-Gate.md` (commit `10f5aed`)

### Detection / audit
- `tmp/qa-runtime-gate-results/findings.json` (1,914 findings / 정적 baseline)
- `tmp/qa-runtime-gate-results/20260427-all-cases-summary.md`
- `tmp/qa-runtime-gate-results/route-transcripts/` (Phase A 3 transcript / schema 참고)
- `tmp/qa-runtime-gate-results/action-by-action-trace.json` (Phase A schema)
- `tmp/qa-codex-spouse-01-p0-patch-results/20260427-phase-a-audit.md` (RC4 root cause + 3 옵션)
- `tmp/qa-codex-spouse-01-p0-patch-results/baseline-anchor-v3-proposal.md`

### 정책
- `docs/disclosure-policy.md` v1.1
- `docs/information-surface-policy.md` v1.1
- `docs/spot-check-format.md`
- `CLAUDE.md`

### 메모리 (운영 Claude memory — repo-local 파일 X)
- `feedback_static_analysis_limit` (#12 — 본 트랙 핵심 근거)
- `feedback_broad_homologous_detection` (#11)
- `feedback_truth_leak_prohibition` (#9)
- `feedback_ct_audit_before_request`
- `feedback_use_gpt_pro` (본 트랙은 GPT Pro 영역 X — runner 코드는 Codex-Dev 직접)

---

**상태**: Fast Tester Phase B 의뢰서 v1 작성 완료. CT-Main 검토 / 사용자 승인 / commit 대기.

**다음 단계 옵션**:
- (1) 본 의뢰서 commit + Codex-Dev 진입 PASTE 작성 (Stage 1 patch와 병행 진입)
- (2) 의뢰서 보강 / scope 조정 (특히 §6 runner 분리 정책 / §10 Gate spec 옵션 검증 절차)
- (3) 본 의뢰서 commit + Stage 1 patch closing 후 진입 (병행 X / 직렬)
