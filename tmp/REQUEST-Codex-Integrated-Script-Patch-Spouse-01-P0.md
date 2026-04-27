> ## ⚠️ SUPERSEDED — 2026-04-28
>
> 본 의뢰서는 다음 commit chain에 의해 superseded 되었습니다 (final P0 closing trace):
>
> - `3973ac6` docs(handoff): add all-cases P0 integrated script patch v2 — spouse-01 단일 영역 → All-Cases sweep 14,931 variants 확장
> - `7eaad2e` docs(handoff): add Stage 1 application request and patched output — Stage 1 (P0-evidence-stage-gate 122 → 0)
> - `2c062dd` docs(handoff): add Stage 2 application request and patched output (87 → 0) — Stage 2 (P0-disclosure-gate)
> - `a7aaec3` fix(scripts): close P0-disclosure-gate findings (87 → 0) — Final P0 closing / `baseline-pre-policy-v3` 발행
>
> Final P0 closing 완료 (P0 232 → 0). 본 자료는 역사 / 추적 목적으로 보존.
> 신규 트랙은 [`tmp/REQUEST-Codex-Integrated-Script-Patch-AllCases-P0-v2.md`](REQUEST-Codex-Integrated-Script-Patch-AllCases-P0-v2.md) 또는 [`docs/release-runbook.md`](../docs/release-runbook.md) 참조.

---

# REQUEST — Codex-Dev Integrated Script Patch (Spouse-01 P0 영역 — Gate Phase A + Script Polish Audit 통합)

**의뢰일**: 2026-04-27
**요청자**: ClaudeCode CT-Main (사용자 결정 영역 정합 영역 — Phase B family/friend 확장 영역 전 영역 본질)
**우선순위**: **P0 출시 차단 영역** (Gate Phase A `af937da` 영역 + Script Polish Audit `ea6ff31` 영역 통합 영역 / spouse-01 P0 patch path 영역 우선 영역)
**병렬**: Phase B (family-01 / friend-01 확장) 영역 = 본 patch 영역 영역 후 영역 영역 (사용자 결정 영역)

---

## 1. 본질 (사용자 명시 영역)

기존 영역 = Gate Phase A spike 영역 검출 + Script Polish Audit 영역 read/report only 영역.
본 영역 = **통합 Script Patch 의뢰서 영역** — root cause 영역 영역 영역 spouse-01 P0 영역 영역 영역 통합 영역 영역.

본질:
- Gate Phase A 영역 영역 3 P0 (root cause 2: disclosure-gate / runtime-response-coverage)
- Script Polish Audit 영역 영역 25 findings (P0 14 / P1 7 / P2 4) — spouse 9 영역 영역 동형 영역
- **spouse-01 P0 영역 우선** — Phase B family/friend 확장 영역 = 본 patch 영역 영역 후 영역 영역
- root cause 영역 우선 (개별 문장 patch X)
- 동형 패턴 영역 14,931 variants 영역 영역 광범위 검출 영역 (잘못 패턴 #11)
- 9차원 의미 정확성 영역 (잘못 패턴 #6 — 단순 어휘 교체 X)
- baseline anchor 영역 회귀 영역 안전 영역 (새 anchor v3 영역 영역 생성 영역)

---

## 2. 진입 조건

- HEAD: `90a9130` (CT v3 archive commit) 또는 그 후 영역
- main == origin/main / tracked clean
- baseline anchor: `baseline-pre-policy-v1` / `v2` 보존 (새 anchor v3 영역 영역 후속 영역)
- `npm run check:all` PASS / `npm run build:pc` PASS / `npx tsc -b --force` PASS

---

## 3. 분담

| 영역 | 담당 |
|---|---|
| 정책 / scope / patch path 영역 / 새 baseline anchor 영역 결정 / 검증 결과 영역 review | CT-Main |
| **이 세션 (Codex-Dev 영역)** | **ScriptedText / caseData 영역 보정 + 동형 영역 광범위 영역 검출 + 새 baseline anchor v3 영역 + 회귀 검증** |
| Gate 재실행 영역 (검증 영역) | Codex-Dev 영역 또는 CT-Main 영역 |
| Phase B (family/friend 확장) | 본 patch 영역 영역 후 영역 사용자 결정 영역 |
| 사용자 | 최종 결정 영역 (새 baseline anchor 영역 / Phase B 진입 영역) |

---

## 4. 입력 영역 (정독)

### 4.1 검출 결과 영역
- `tmp/qa-runtime-gate-results/findings.json` (Gate Phase A `af937da` — 3 P0 / 2 root cause 영역)
- `tmp/qa-runtime-gate-results/20260427-spike-summary.md`
- `tmp/qa-runtime-gate-results/route-transcripts/` (3 transcript 영역)
- `tmp/qa-runtime-gate-results/resolver-path-summary.md` / `source-path-summary.md`
- `tmp/qa-script-polish-audit-results/findings.json` (Audit `ea6ff31` — 25 findings)
- `tmp/qa-script-polish-audit-results/pattern-extraction.md`
- `tmp/qa-script-polish-audit-results/recommended-patch-priority.md`

### 4.2 정책 영역
- `docs/disclosure-policy.md` v1.1 (§4.1 spouse-01 surface ↔ truth 매핑 / §13.1·13.2 audit 검출 패턴 / §3.2·3.3 매트릭스)
- `docs/information-surface-policy.md` v1.1 (§2.1 surface-only / §2.6 VFX 위계)
- `docs/spot-check-format.md` (8필드)
- `CLAUDE.md` (게임 핵심 / 한국어 품질)

### 4.3 잘못 패턴 영역
- `memory/feedback_revision_meaning_over_form.md` (#6 9차원 의미 정확성)
- `memory/feedback_truth_leak_prohibition.md` (#9 진실 누설 금지)
- `memory/feedback_broad_homologous_detection.md` (#11 동형 광범위 검출)
- `memory/feedback_static_analysis_limit.md` (#12 정적 분석 한계)
- `memory/feedback_baseline_anchor_scripted_text.md` (ScriptedText 영역 baseline 영역)
- `memory/feedback_wrapper_baseline_is_head.md` (wrapper 본질)

### 4.4 코드 영역 (read-only)
- `src/data/scriptedText/spouse-01.json` (variant text 영역 보정 영역 본질)
- `src/data/cases/generated/spouse-01.json` (`evidence.e-1.investigationResults.request_original` 영역 NPC 응답 영역 본질)
- `src/data/disclosurePolicy/spouse-01.json` (truth lexeme / surface map / lieState gate 영역)
- `src/data/emergenceHooks.ts` (read 영역만)
- `scripts/qa-runtime-gate.cjs` (Gate 재실행 영역)
- `tmp/codex-recovery-v3/recovery-v3.cjs` (wrapper baseline 영역)

---

## 5. Scope (사용자 명시 — spouse-01 우선 영역)

### 5.1 4 root cause 영역 (통합 영역)

**root cause 1 — P0-disclosure-gate (Surface-only judge 채널 truth lexeme 영역 노출)**
- 위반 채널 (4): `judge_question` / `judge_contradiction` / `judge_evidence_combo` / `judge_witness_summon`
- spouse-01 영역 영역 P0 (Audit 영역 영역 3건 + 동형 영역):
  - `judgeq-d-1-motive_search-2-v1` (`형 이야기를`)
  - `judgecombo-dc-2-b-q1-hard-v1` (`가족 사정`, `가족 안의 갈등`)
  - `judgec-d-1-hard-v1` (`그 가족` + `가족라는` 조사 영역)
- 동형 영역: 14,931 variants 영역 영역 영역 모든 surface-only judge 채널 영역 영역 truth lexeme grep 영역 본질 (잘못 패턴 #11)
- 정책 영역: `docs/disclosure-policy.md` §4.1 spouse-01 globalTruthLexemes (`형` / `친형` / `조카` / `가족 사정` / `가족 안의 갈등` 등) + §13.1 audit 패턴 영역 정합

**root cause 2 — P0-disclosure-gate (Early/gated evidence_present truth leak)**
- 위반 채널: `evidence_present` (early / stage1 / stage2 — late 영역 영역 X) + `evidence_discovery`
- spouse-01 영역 영역 P0 + P1 (Audit + Gate 영역 영역 4건):
  - `b-e-4-early-self-v1` (Audit SPA-SP-002 + Gate QARG-0001/2 영역 동일 source — `형한테 온 문자 맞습니다`)
  - `b-e-5-early-self-v1` (Audit SPA-SP-003 P1 — `비자금에서 뺀`)
  - `a-e-1-early-stage2-v1` (Audit SPA-SP-004 — `학용품`)
- 동형 영역: 14,931 variants 영역 영역 영역 모든 evidence_present (early/stage1/stage2) + evidence_discovery 영역 영역 truth lexeme grep 영역
- 정책 영역: `docs/disclosure-policy.md` §3.2 evidenceStage 정합 + §4.1 영역 description 진실어 영역 + §13.2 audit 패턴 영역 정합

**root cause 3 — P0-disclosure-gate (NPC S0~S2 truth leak)**
- 위반 채널: `interrogation` / `contradiction_pursuit` 영역 NPC S0~S2 lieState 영역 truth lexeme 영역 노출
- spouse-01 영역 영역 P0 (Audit 영역 영역 1건 + 영역 관련 영역):
  - `b-d-2-S2-fact-pursuit-v7` (`가족을 돕는 일이 급` — paraphrase 우회 lexeme)
  - 관련: `b-d-2-S2-motive-search-v7` (relatedVariantIds)
- 동형 영역: NPC interrogation / contradiction_pursuit 영역 영역 S0/S1/S2 영역 영역 truth lexeme + paraphrase 우회 lexeme grep 영역
- 정책 영역: `docs/disclosure-policy.md` §3.3 매트릭스 + §5.2 spouse-01 lieState 정책 + §4.1 paraphrase 우회 lexeme set 영역 정합

**root cause 4 — P0-runtime-response-coverage (NPC 응답 / safe fallback 영역 0건)**
- 위반 영역 (Gate QARG-0003): `evidence.e-1.investigationResults.request_original` 영역 영역 NPC 응답 / safe fallback 영역 0건 (visible outputs 1 / speakers=system 영역만)
- **사용자 결정 영역 (이번 patch 영역 영역 영역 — 본 의뢰서 영역 강제 영역)**:
  - **옵션 (a) 기본 영역 우선 영역** — caseData `spouse-01.json:evidence.e-1.investigationResults.request_original` 영역 영역 **NPC 응답 영역 추가 (caseData coverage 보강 영역 본질)**
  - **옵션 (b) runtime safe fallback (useActionDispatch / evidenceEngine 영역) — 이번 patch 영역 영역 기본 금지 영역**
  - **공통 runtime 경로 결함 영역** (Phase A 영역 spike 영역 영역 영역 caseData 누락 X 영역 / 공통 runtime 결함 영역 영역 영역 확인 영역) → **runtime 수정 X / 즉시 중단 + CT-Main 보고 영역 본질**
- 동형 영역: spouse-01 영역 영역 모든 caseData investigationResults 영역 영역 NPC 응답 영역 / safe fallback 영역 정합 영역 검증 영역 (caseData write 영역만)

### 5.2 5번째 영역 — Korean polish (P2 영역 영역 / 사용자 결정 영역 = 이번 patch 영역 영역 포함 허용 영역)
- **사용자 결정 영역**: 이번 spouse-01 P0 patch 영역 영역 **포함 허용 영역**
- **scope 영역 영역**: **spouse-01 영역 영역 동형 검출 영역 제한 영역**
- **family-01 / friend-01 영역 영역 변경 X** (Phase B 영역 영역 영역 후속 영역 / 본 patch 영역 영역 영역 변경 X)
- spouse-01 영역 영역 (Audit 영역 영역 3건):
  - `b-e-4-mid-stage2-v1` (`이유은` 조사 영역 + `때문입니다` 중복)
  - `b-e-5-late-stage2-v4` (`때문입니다, 제가` comma splice + 동형 `b-e-4-late-stage2-v4`)
  - `judgec-d-1-hard-v1` (`그 가족라는` — root cause 1 영역 영역 영역 영역 영역 같이 영역)
- 동형 영역: **spouse-01 영역 영역 ScriptedText 영역 영역** 한국어 조사 오류 / comma splice 영역 영역 grep 영역 본질
- 정책 영역: `CLAUDE.md` 한국어 품질 규칙 영역 정합

### 5.3 동형 검출 영역 알고리즘 (잘못 패턴 #11 정합)
사용자 사례 영역 = 시작점 영역 / 14,931 variants 전수 영역 영역 광범위 검출 영역 본질.

**spouse-01 영역 검출 키워드 영역 영역**:
```
# Surface-only judge 채널 (root cause 1) — disclosure-policy §4.1 정합
spouse_judge_truth_lexemes: 형|친형|조카|조카딸|중2|중학생 조카|돌봄|가족을 돌본|가족 사정|가족 안의 갈등|가족 지원|위임장 조작|투자 사기|형 빚|형의 오피스텔|형 명의|형에게 전달|학용품|조카 학교 알림|가족을 돕는|가족을 도운

# Early/gated evidence (root cause 2) — disclosure-policy §3.2 정합
spouse_evidence_truth_lexemes: 학용품|비자금|형|조카|위임장 조작|투자 사기|개인회생|친 가족|혈육|친 혈육

# NPC S0~S2 (root cause 3) — disclosure-policy §3.3 + §4.1 paraphrase 영역 정합
spouse_npc_S0S2_lexemes: 가족을 돕는 일이 급|돌봐 드|생필품을 사다|가족을 돕는|빚 대신|따로 모은 돈|몰래 마련한 돈|어린 친척|친 가족|혈육

# Korean polish (root cause 5)
korean_polish_patterns: /이유은/|/때문입니다, 제가/|/그 가족라는/|/X을 ~하는 것 → X을 ~한 것 형태/
```

**검출 명령 영역 (Codex-Dev spike 영역 영역 본질)**:
```bash
# Gate 재실행 영역 (root cause 1/2/3/4 영역 0건 영역 본질)
node scripts/qa-runtime-gate.cjs

# disclosure-policy §13 audit 패턴 영역 광범위 영역 검출 영역 (Tier 2 wrapper 영역 영역 본질 — 부재 영역 영역 grep 영역 본질)
# (Codex-Dev 영역 spike 영역 영역에서 결정 영역)
```

---

## 6. 절대 회피선 (사용자 명시 영역 + CT 영역)

### 6.1 사용자 명시 영역
- **CT 직접 runtime/script edit X** — Codex-Dev 영역 영역 본질
- **개별 문장 patch X** — root cause 영역 + 동형 영역 광범위 영역 검출 영역 우선
- **root cause 우선** — 개별 finding 영역 영역 X / root cause 4 영역 영역 본질
- **baseline anchor / regression 검증 포함** — `baseline-pre-policy-v1` / `v2` 회귀 영역 X / 새 anchor v3 영역 영역 생성 영역
- **spouse-01 P0 patch path 우선** — Phase B family/friend 확장 영역 = 본 patch 영역 영역 후 영역

### 6.2 CT 영역 영역
- ScriptedText 영역 / caseData 영역 / 정책 영역 / pc.css 영역 / baseline anchor 영역 / feature flag global default 영역 X
- 9차원 의미 정확성 영역 (잘못 패턴 #6) — 글자수 영역 ±5자 영역 OK / 의미 영역 손상 영역 X
- VITE_OPENAI_API_KEY / OPENAI_API_KEY 참조 X (Proxy `596d235` 정합)
- API proxy (`api/llm/*`) 구조 영역 변경 X
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` / `llmDialogueResolver.ts` 본체 영역 변경 X (read only)
- `emergenceHooks.ts` / `discoveryEngine.ts` / `meterStagingV2.ts` / `gameEventTriggerEngine.ts` 영역 본체 영역 변경 X
- 7 intent taxonomy 영역 변경 X (P0-A 영역 정합)
- Spoiler Cascade Finalize / Free Question Hygiene / Release QA / Script Polish Audit / Runtime Gate 영역 산출물 영역 섞기 X
- Phase B 영역 영역 (family-01 / friend-01) 영역 변경 X (본 patch 영역 영역 후 영역 사용자 결정 영역)
- secret / 실제 키 / 사용자 PII 영역 출력 X
- 진실 누설 영역 (`docs/disclosure-policy.md` §1 게임 핵심 원칙 영역) — surface 영역 표현 영역 보존 영역 / NPC 자백 전 영역 영역 진실 lexeme X (잘못 패턴 #9)

### 6.3 운영 영역
- 같은 shared worktree 영역 영역 tracked dirty 0 영역 진입 영역 (사용자 명시 영역 정합 — `feedback_shared_worktree_no_parallel_with_dirty.md`)
- read/report only 영역 X — 본 영역 = write 영역 (ScriptedText 영역 + caseData 영역 + scripts 영역 + tmp 영역)
- `git pull origin main` 진입 조건 영역 영역 (`feedback_git_pull_in_entry_check.md` 정합)
- ephemeral 영역 .gitignore 사전 영역 (`feedback_ephemeral_artifacts_gitignore.md` 정합)

---

## 7. 진행 순서

### Phase A — 사전 audit + 동형 영역 광범위 검출 + spike 영역
1. 정독 영역 (`§4` 영역 영역 영역)
2. spouse-01 영역 영역 동형 영역 광범위 검출 (`§5.3` 영역 영역 영역)
   - Surface-only judge truth lexeme 영역 grep
   - Early/gated evidence truth lexeme 영역 grep
   - NPC S0~S2 truth lexeme 영역 grep
   - Korean polish patterns grep (spouse-01 영역 영역 제한 영역)
3. **runtime response coverage 영역 spike** (root cause 4 영역 영역 — **사용자 결정 영역 정합 영역**):
   - **옵션 (a) 기본 영역 우선 영역** — caseData `evidence.e-1.investigationResults.request_original` 영역 누락 영역 영역 확인 영역 → caseData 영역 NPC 응답 영역 추가 영역 (Phase B 영역 영역)
   - **공통 runtime 경로 결함 영역** (caseData 누락 X 영역 / runtime 결함 영역 영역) 영역 → **runtime 수정 X / 즉시 중단 + CT-Main 보고 영역 본질**
   - 옵션 (b) runtime safe fallback 영역 영역 영역 = 이번 patch 영역 영역 기본 금지 영역
4. 9차원 의미 정확성 영역 spike (잘못 패턴 #6) — 메인 잘못 패턴 sample 영역 영역 영역 후 영역 사용자 patch 영역 모범 영역 영역 영역 (PATCH 1~4 영역 영역 영역)
5. **baseline anchor v3 영역 생성 방식 영역 제안 영역** (사용자 결정 영역 정합 영역) — Codex-Dev 영역 영역 spike 영역 영역 후 영역 영역 영역 영역 영역 영역 영역 (예: `baseline-pre-policy-v3` SHA / wrapper 영역 영역 영역 / `tmp/codex-recovery-v*` 영역 영역 영역 / Markdown rollback 영역 영역 영역) — Phase A 보고 영역 영역 명시 영역 / Phase C 영역 영역 검증 영역 영역 확정 영역
6. 산출물: `tmp/qa-codex-spouse-01-p0-patch-results/20260427-phase-a-audit.md` (+ `baseline-anchor-v3-proposal.md`)
7. CT-Main 영역 보고 영역 (Phase A 영역 영역 결과 영역 + Phase B 진입 영역 결정 영역 본질)

### Phase B — 보정 적용 (4 root cause 영역)
1. **root cause 1**: surface-only judge channel (`judge_question` / `judge_contradiction` / `judge_evidence_combo` / `judge_witness_summon`) 영역 영역 truth lexeme 영역 보정 영역 (동형 영역 영역)
2. **root cause 2**: early/gated evidence_present + evidence_discovery 영역 영역 truth lexeme 영역 보정 영역 (동형 영역 영역)
3. **root cause 3**: NPC S0~S2 interrogation / contradiction_pursuit 영역 영역 truth lexeme 영역 보정 영역 (동형 영역 영역)
4. **root cause 4**: caseData investigationResults 영역 NPC 응답 영역 추가 영역 또는 runtime safe fallback 영역 추가 영역 (옵션 a / b / c 영역 영역 결정 영역)
5. **Korean polish (선택 영역 영역)**: 한국어 조사 / comma splice 영역 영역 영역 동형 영역 영역
6. 산출물: `tmp/qa-codex-spouse-01-p0-patch-results/20260427-phase-b-fix-summary.md` + `patched-variants.json`

### Phase C — 검증 + 새 baseline anchor + commit
1. **Gate 재실행 영역**: `node scripts/qa-runtime-gate.cjs` → 4 root cause 영역 hard 0 (Gate findings.json 영역 0건 영역 정합 — Audit 25 findings 영역 영역 동형 영역 영역 영역 0건 영역 정합)
2. **disclosure-policy §13 audit 검출 패턴 영역 grep 영역**: 0건 (CT 영역 후속 영역 영역 검증 영역)
3. **wrapper 회귀 검사**: `npm run check:all` PASS — 새 baseline anchor (`baseline-pre-policy-v3` 영역 영역) 영역 영역 정합 영역 영역
4. **build / tsc**: `npm run build:pc` PASS / `npx tsc -b --force` PASS
5. **새 baseline anchor v3 영역 확정 영역** (사용자 결정 영역 정합 영역 — Phase A 영역 영역 제안 영역 영역 영역 본 단계 영역 영역 영역 검증 영역 영역 영역 확정 영역): `baseline-pre-policy-v3` 영역 영역 생성 영역 + Phase A 영역 영역 제안 영역 영역 (wrapper 영역 영역 영역 정합 영역 / `tmp/codex-recovery-v*` 영역 영역 영역 / Markdown rollback 영역 영역 영역 영역 영역) 영역 영역 영역 정합 영역 영역 검증 영역
6. commit + push (단일 commit 영역 또는 단계별 영역 — Codex-Dev 결정)
7. 산출물: `tmp/qa-codex-spouse-01-p0-patch-results/20260427-phase-c-verification.md` + `baseline-anchor-v3-decision.md`

### Phase D — Gate 재실행 + 영역 영역 0건 영역 확인 + CT-Main 보고
1. Gate Phase A 영역 영역 재실행 영역 hard 0 / 3 root cause 영역 영역 영역 0건 영역
2. Audit 25 findings 영역 영역 동형 영역 영역 영역 영역 0건 (homologous-detection-summary.md 영역 영역 영역)
3. spouse-01 P0 patch path 영역 영역 영역 영역 closure 영역 영역 본질
4. 산출물: `tmp/qa-codex-spouse-01-p0-patch-results/20260427-phase-d-gate-rerun.md` + `20260427-summary.md`
5. CT-Main 영역 보고 영역 (Phase B family/friend 진입 영역 영역 결정 영역 본질)

---

## 8. 종료 조건

- [ ] **root cause 1** (surface-only judge truth lexeme) 영역 영역 동형 영역 0건 (전수 grep 영역 0)
- [ ] **root cause 2** (early/gated evidence truth lexeme) 영역 영역 동형 영역 0건
- [ ] **root cause 3** (NPC S0~S2 truth lexeme) 영역 영역 동형 영역 0건
- [ ] **root cause 4** (runtime response coverage) 영역 영역 0건
- [ ] **Korean polish** (root cause 5) 영역 영역 동형 영역 영역 (선택 영역 영역 영역 — 통합 영역 영역 영역 OK)
- [ ] Gate Phase A 재실행 hard 0 / 3 P0 영역 영역 0건
- [ ] Script Polish Audit 25 findings 영역 영역 동형 영역 영역 영역 영역 0건 (homologous-detection-summary.md 영역 영역 영역)
- [ ] disclosure-policy §13 audit 검출 패턴 영역 grep 0건
- [ ] `npm run check:all` PASS (새 baseline anchor v3 영역 영역 정합 영역)
- [ ] `npm run build:pc` PASS
- [ ] `npx tsc -b --force` PASS
- [ ] 새 baseline anchor v3 영역 영역 생성 영역 (Codex-Dev 결정 영역)
- [ ] commit + push
- [ ] CT-Main 영역 보고

---

## 9. 산출물

```
tmp/qa-codex-spouse-01-p0-patch-results/
├── 20260427-phase-a-audit.md              (Phase A — 동형 영역 검출 + spike + 9차원 의미 정확성 영역)
├── 20260427-phase-b-fix-summary.md        (Phase B — 4 root cause 보정 + 동형 영역 영역)
├── 20260427-phase-c-verification.md       (Phase C — Gate 재실행 + wrapper 검사 + 새 anchor)
├── 20260427-phase-d-gate-rerun.md         (Phase D — Gate / Audit / policy §13 영역 0건 영역 영역)
├── 20260427-summary.md                    (종합)
├── patched-variants.json                  (보정 영역 variant 영역 list — variantId + before/after text + reason + root cause)
├── homologous-detection-summary.md        (동형 영역 영역 영역 영역 영역 영역 영역 영역 영역 영역 grep 결과 영역)
└── baseline-anchor-v3-decision.md         (새 baseline anchor 영역 결정 영역)
```

---

## 10. Write Scope

### 10.1 신규 영역 (write OK)
- `src/data/scriptedText/spouse-01.json` (variant text 영역 보정 영역 본질 — `feedback_baseline_anchor_scripted_text.md` 정합 영역으로 새 anchor v3 영역 영역 생성 영역)
- `src/data/cases/generated/spouse-01.json` (root cause 4 영역 영역 NPC 응답 영역 추가 영역 영역 영역 — Codex-Dev 결정 영역)
- `tmp/qa-codex-spouse-01-p0-patch-results/` (산출물 영역)
- `tmp/codex-recovery-v3/` 또는 동등 영역 (새 baseline anchor 영역 본질 — Codex-Dev 결정 영역)

### 10.2 read 영역 (touch X)
- `src/data/scriptedText/family-01.json` / `friend-01.json` (Phase B 영역 영역)
- `src/data/cases/generated/family-01.json` / `friend-01.json` (Phase B 영역 영역)
- `src/data/disclosurePolicy/spouse-01.json` (정책 영역 — 변경 X)
- `src/engine/*` / `src/hooks/*` / `src/components/*` (read only — runtime 본체 영역 영역 변경 X)
- `src/app/pc.css` (touch X)

### 10.3 절대 touch X
- 6 절대 회피선 영역 영역 영역 모두 영역 영역 정합 영역
- baseline anchor v1 / v2 영역 영역 회귀 X (새 anchor v3 영역 영역 영역 정합 영역)

---

## 11. 후속 영역

본 patch 영역 영역 영역 closure 영역 후 CT-Main 영역 영역 후속:

1. Phase B (family-01 / friend-01 통합 영역 patch) 영역 영역 영역 사용자 결정 영역 후 영역 진입 영역
   - family-01 영역 = Audit 9 findings (P0 5 / P1 3 / P2 1)
   - friend-01 영역 = Audit 7 findings (P0 4 / P1 3 / P2 1)
   - 동일 4 root cause 영역 영역 정합 영역 영역 통합 영역 영역
2. Domain 4 Manual QA (사용자 직접 영역) 결과 영역 영역 review (사용자 영역 보고 영역 후 영역)
3. 자유 질문 / LLM spot 재검증 (#2 + Gate 결과 후 영역)
4. 출시 전 영역 종합 영역 closure 영역 영역

---

## 12. 관련 자료

- `tmp/qa-runtime-gate-results/findings.json` (Gate Phase A — `af937da`)
- `tmp/qa-runtime-gate-results/20260427-spike-summary.md`
- `tmp/qa-script-polish-audit-results/findings.json` (Audit — `ea6ff31`)
- `tmp/qa-script-polish-audit-results/pattern-extraction.md`
- `tmp/qa-script-polish-audit-results/recommended-patch-priority.md`
- `docs/disclosure-policy.md` v1.1 (§4.1 / §13.1·13.2)
- `docs/information-surface-policy.md` v1.1
- `CLAUDE.md` (게임 핵심 / 한국어 품질 / Phase 8단계)
- `memory/feedback_revision_meaning_over_form.md` (#6 9차원 의미 정확성)
- `memory/feedback_truth_leak_prohibition.md` (#9 진실 누설 금지)
- `memory/feedback_broad_homologous_detection.md` (#11 동형 광범위 검출)
- `memory/feedback_baseline_anchor_scripted_text.md` (ScriptedText baseline 영역)
- `memory/feedback_wrapper_baseline_is_head.md` (wrapper 본질)
- 본 세션 진입 메시지: `tmp/PASTE-Integrated-Script-Patch-Spouse-01-P0-FIRST-MESSAGE.md`

---

**상태**: 의뢰서 영역 영역 v1 영역 작성 완료. 사용자 결정 영역 받기 영역:
- (a) 의뢰서 영역 commit + push 영역 → Codex-Dev 영역 진입 영역
- (b) 의뢰서 영역 영역 review 영역 영역 영역 추가 영역 / 보정 영역 / scope 영역 결정 영역
- (c) 보류 영역 — 다른 영역 우선 영역
