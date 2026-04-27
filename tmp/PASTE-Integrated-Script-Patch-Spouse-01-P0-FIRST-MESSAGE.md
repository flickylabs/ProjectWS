# 세션 시작 — Integrated Script Patch (Spouse-01 P0 영역 — Gate Phase A + Script Polish Audit 통합 영역)

ClaudeCode CT-Main에서 의뢰합니다 (사용자 결정 영역 정합 영역 / Phase B family/friend 확장 영역 전 영역 본질).

⚠️ **본질**: Gate Phase A `af937da` 영역 + Script Polish Audit `ea6ff31` 영역 통합 영역 / **spouse-01 P0 영역 우선 영역**. Phase B (family/friend 확장) 영역 = 본 patch 영역 영역 후 영역 사용자 결정 영역.

---

## 1. git pull + 진입 조건 검사

```bash
git pull origin main
git log --oneline -5                     # 최신 main HEAD 영역 확인 — `90a9130` 영역 또는 그 후 영역
git status --short --branch              # tracked dirty 0 영역 정합 영역
git diff --quiet && git diff --cached --quiet && echo "tracked clean"
npm run check:all                        # PASS — hard 0
npm run build:pc                         # PASS
npx tsc -b --force                       # PASS
```

PASS 후 진행. tracked dirty / hard > 0 / build fail → 즉시 중단 + CT-Main 보고.

**untracked 영역 보존 영역** (사용자 명시 영역 — rm/stash/discard X):
- `tmp/CODEX-MAIN-HANDOFF-20260427-P0-PARALLEL.md`
- `tmp/PASTE-Codex-Spouse-01-Phase2-Finalize-FIRST-MESSAGE.md`
- `tmp/PASTE-Codex-Runtime-Gate-Commit-Request.md`
- 본 PASTE 메시지 영역 (`PASTE-Integrated-Script-Patch-Spouse-01-P0-FIRST-MESSAGE.md`)

---

## 2. 필수 정독

1. `tmp/REQUEST-Codex-Integrated-Script-Patch-Spouse-01-P0.md` (**의뢰서 — 4 root cause + 동형 영역 / 검출 알고리즘 / 진행 순서**)
2. `tmp/qa-runtime-gate-results/findings.json` (Gate Phase A — 3 P0 / `af937da`)
3. `tmp/qa-runtime-gate-results/20260427-spike-summary.md`
4. `tmp/qa-script-polish-audit-results/findings.json` (Audit — 25 findings / `ea6ff31`)
5. `tmp/qa-script-polish-audit-results/pattern-extraction.md`
6. `tmp/qa-script-polish-audit-results/recommended-patch-priority.md`
7. `docs/disclosure-policy.md` v1.1 (§4.1 spouse-01 매핑 / §13.1·13.2 audit 패턴 / §3.2·3.3 매트릭스 / §5.2 spouse lieState)
8. `docs/information-surface-policy.md` v1.1 (§2.1 surface-only 영역)
9. `CLAUDE.md` (게임 핵심 / 한국어 품질)
10. `memory/feedback_revision_meaning_over_form.md` (#6 9차원 의미 정확성)
11. `memory/feedback_truth_leak_prohibition.md` (#9 진실 누설 금지)
12. `memory/feedback_broad_homologous_detection.md` (#11 동형 광범위 검출)
13. `memory/feedback_baseline_anchor_scripted_text.md` (ScriptedText baseline 영역)
14. `memory/feedback_wrapper_baseline_is_head.md` (wrapper 본질)

---

## 3. 작업 본질 (4 root cause 영역)

### root cause 1 — Surface-only judge truth lexeme (P0 disclosure-gate)
- 위반 채널: judge_question / judge_contradiction / judge_evidence_combo / judge_witness_summon
- spouse-01 sample 영역 (Audit):
  - `judgeq-d-1-motive_search-2-v1` (`형 이야기를`)
  - `judgecombo-dc-2-b-q1-hard-v1` (`가족 사정`, `가족 안의 갈등`)
  - `judgec-d-1-hard-v1` (`그 가족` + `가족라는` 조사 영역)
- 동형 영역: 14,931 variants 영역 영역 영역 모든 surface-only judge 채널 영역 영역 truth lexeme grep 영역 (`docs/disclosure-policy.md` §4.1 spouse-01 globalTruthLexemes 정합)

### root cause 2 — Early/gated evidence truth leak (P0 disclosure-gate)
- 위반 채널: evidence_present (early/stage1/stage2) + evidence_discovery
- spouse-01 sample 영역:
  - `b-e-4-early-self-v1` (Audit + Gate 동일 영역 — `형한테 온 문자 맞습니다`)
  - `b-e-5-early-self-v1` (`비자금에서 뺀` P1)
  - `a-e-1-early-stage2-v1` (`학용품`)
- 동형 영역: 14,931 variants 영역 영역 evidence_present (early/stage1/stage2) + evidence_discovery 영역 truth lexeme grep

### root cause 3 — NPC S0~S2 truth leak (P0 disclosure-gate)
- 위반 채널: interrogation / contradiction_pursuit 영역 NPC S0~S2 lieState
- spouse-01 sample 영역:
  - `b-d-2-S2-fact-pursuit-v7` (`가족을 돕는 일이 급` paraphrase 우회 영역)
  - 관련: `b-d-2-S2-motive-search-v7`
- 동형 영역: NPC interrogation / contradiction_pursuit 영역 영역 S0/S1/S2 영역 영역 truth lexeme + paraphrase 우회 lexeme grep

### root cause 4 — Runtime response coverage (P0 runtime-response-coverage)
- 위반 영역 (Gate QARG-0003): `evidence.e-1.investigationResults.request_original` 영역 영역 NPC 응답 / safe fallback 영역 0건
- **사용자 결정 영역 (이번 patch 영역 영역 영역 — 본 의뢰서 영역 강제 영역)**:
  - **옵션 (a) 기본 영역 우선 영역 — caseData spouse-01.json:`evidence.e-1.investigationResults.request_original` 영역 영역 NPC 응답 영역 추가 영역 (caseData coverage 보강 본질)**
  - **옵션 (b) runtime safe fallback (useActionDispatch / evidenceEngine 영역) — 이번 patch 영역 기본 금지 영역**
  - **공통 runtime 경로 결함 영역** (Phase A 영역 spike 영역 영역 caseData 누락 X / runtime 결함 영역 영역 영역 확인 영역) → **runtime 수정 X / 즉시 중단 + CT-Main 보고 영역 본질**
- 동형 영역: spouse-01 영역 영역 모든 caseData investigationResults 영역 영역 NPC 응답 / safe fallback 영역 정합 영역 검증 영역 (caseData write 영역만)

### root cause 5 — Korean polish (P2 영역 영역 / 사용자 결정 영역 = 이번 patch 영역 영역 포함 허용 영역)
- **사용자 결정 영역**: 이번 spouse-01 P0 patch 영역 **포함 허용 영역**
- **scope 영역 영역**: **spouse-01 영역 영역 동형 검출 영역 제한 영역**
- **family-01 / friend-01 영역 영역 변경 X** (Phase B 영역 영역 후속 영역)
- spouse-01 sample 영역:
  - `b-e-4-mid-stage2-v1` (`이유은` 조사 영역 + `때문입니다` 중복)
  - `b-e-5-late-stage2-v4` (`때문입니다, 제가` comma splice + `b-e-4-late-stage2-v4` 동형)
  - `judgec-d-1-hard-v1` (`그 가족라는` — root cause 1 영역 영역 같이)
- 동형 영역: **spouse-01 영역 영역 ScriptedText 영역 영역** 한국어 조사 오류 / comma splice 영역 영역 grep

---

## 4. 진행 순서

```
Phase A — 사전 audit + 동형 광범위 검출 + spike
   ├─ root cause 1/2/3/5 영역 동형 광범위 검출 (spouse-01 영역 영역 제한)
   ├─ root cause 4 spike — 옵션 (a) 기본 영역 우선 (caseData 누락 영역 확인 영역) / runtime 결함 영역 → 즉시 중단 + CT-Main 보고 영역 본질 (옵션 b runtime safe fallback 영역 = 기본 금지)
   ├─ 9차원 의미 정확성 spike (잘못 패턴 #6)
   ├─ baseline anchor v3 생성 방식 영역 제안 영역 (사용자 결정 영역 정합 영역 — 본 단계 영역 제안 영역 / Phase C 영역 검증 영역 확정 영역)
   ├─ 산출물: 20260427-phase-a-audit.md + baseline-anchor-v3-proposal.md
   └─ CT-Main 보고 → Phase B 진입 결정

Phase B — 4 root cause 보정 + Korean polish (root cause 5 / spouse-01 영역 영역 제한)
   ├─ 산출물: 20260427-phase-b-fix-summary.md + patched-variants.json
   └─ Phase C 진입

Phase C — 검증 + 새 baseline anchor v3 영역 확정 + commit + push
   ├─ Gate 재실행 hard 0 / 4 root cause 0건
   ├─ disclosure-policy §13 grep 0건
   ├─ wrapper 회귀 검사 PASS
   ├─ build / tsc PASS
   ├─ 새 baseline anchor v3 영역 확정 영역 (Phase A 제안 영역 영역 영역 본 단계 영역 영역 검증 영역 영역 확정 영역)
   ├─ commit + push
   └─ 산출물: 20260427-phase-c-verification.md + baseline-anchor-v3-decision.md

Phase D — Gate 재실행 + 영역 영역 0건 확인 + CT-Main 보고
   ├─ Gate Phase A 재실행 / Audit 25 findings 동형 영역 0건
   ├─ 산출물: 20260427-phase-d-gate-rerun.md + 20260427-summary.md
   └─ CT-Main 보고 → Phase B family/friend 진입 결정
```

---

## 5. 산출물 위치

```
tmp/qa-codex-spouse-01-p0-patch-results/
├── 20260427-phase-a-audit.md
├── 20260427-phase-b-fix-summary.md
├── 20260427-phase-c-verification.md
├── 20260427-phase-d-gate-rerun.md
├── 20260427-summary.md
├── patched-variants.json
├── homologous-detection-summary.md
└── baseline-anchor-v3-decision.md
```

---

## 6. Write Scope

### 6.1 write OK 영역
- `src/data/scriptedText/spouse-01.json` (variant text 영역 보정 영역)
- `src/data/cases/generated/spouse-01.json` (root cause 4 영역 영역 결정 영역)
- `tmp/qa-codex-spouse-01-p0-patch-results/` (산출물)
- `tmp/codex-recovery-v3/` 또는 동등 영역 (새 baseline anchor — Codex-Dev 결정)

### 6.2 read only
- `src/data/scriptedText/family-01.json` / `friend-01.json` (Phase B 영역 영역 / 변경 X)
- `src/data/cases/generated/family-01.json` / `friend-01.json`
- `src/data/disclosurePolicy/spouse-01.json` (정책 영역 / 변경 X)
- `src/engine/*` / `src/hooks/*` / `src/components/*` (read only — runtime 본체 영역 변경 X)
- `src/app/pc.css` (touch X)

---

## 7. 절대 회피선

### 사용자 명시 영역
- CT 직접 runtime/script edit X — Codex-Dev 영역 본질
- **개별 문장 patch X** — root cause 영역 + 동형 영역 광범위 영역 검출 영역 우선
- root cause 우선 — 4 root cause 영역 본질
- baseline anchor (v1·v2) 회귀 X — 새 anchor v3 영역 영역 생성 영역
- spouse-01 P0 patch path 우선 — Phase B (family-01/friend-01) 변경 X

### CT 영역 영역
- ScriptedText / caseData (family-01·friend-01) / 정책 / pc.css / feature flag global default X
- VITE_OPENAI_API_KEY / OPENAI_API_KEY X (Proxy `596d235` 정합)
- API proxy 구조 변경 X
- useActionDispatch.ts / judgeQuestionEngine.ts / scriptedTextLoader.ts / llmDialogueResolver.ts 본체 영역 변경 X (read only)
- emergenceHooks / discoveryEngine / meterStagingV2 / gameEventTriggerEngine 본체 영역 변경 X
- 7 intent taxonomy 변경 X
- Spoiler Cascade Finalize / Free Question Hygiene / Release QA / Script Polish Audit / Runtime Gate 산출물 영역 섞기 X
- secret / 실제 키 / 사용자 PII 영역 X
- 진실 누설 (`docs/disclosure-policy.md` §1) — surface 영역 표현 영역 보존 / NPC 자백 전 영역 진실 lexeme X (잘못 패턴 #9)

### 9차원 의미 정확성 (잘못 패턴 #6)
- 글자수 ±5자 OK / 의미 손상 X
- archetype voice 영역 정량 정합 (박지연 victim_cosplay / 이준호 avoidant)
- lieState 영역 정합 (S0~S2 영역 진실 노출 X / S3+ 영역 점진 영역)
- 추궁 차원 영역 정합 (정보 / 동기 / 책임 / 인지 단계)
- 단순 어휘 교체 X — 표면 surface 표현 영역으로 추상화 영역 + 의미 영역 보존 영역

### 동형 광범위 검출 (잘못 패턴 #11)
- 사용자 사례 = 시작점 / 14,931 variants 영역 전수 영역 grep 영역 강제 영역
- 합산 목표 명시 영역 (root cause 1 영역 영역 영역 영역 합산 / root cause 2 영역 영역 영역 영역 영역 등)
- 사용자 sample 영역 영역 영역만 처리 X / 동형 영역 영역 영역 영역 영역 영역 영역 영역 영역 영역 영역 영역 강제 영역

### 정적 분석 한계 (잘못 패턴 #12)
- 정적 PASS = 완료 X 영역 본질
- D1 LieState Flow / D2 Evidence Unlock / D3 Archetype Quant / D4 Meter Timing 영역 영역 영역 별도 검증 영역 (필요 영역 영역 후속 영역)

### 운영 영역
- 같은 shared worktree 영역 tracked dirty 0 진입 영역 정합
- `git pull origin main` 진입 조건 영역 정합
- ephemeral 영역 .gitignore 사전 영역 정합

---

## 8. 검출 알고리즘 (잘못 패턴 #11 정합 — Codex-Dev 영역 영역 spike 영역 영역 영역 영역 영역)

```
# Surface-only judge 채널 (root cause 1) — disclosure-policy §4.1 정합
spouse_judge_truth_lexemes:
  형|친형|조카|조카딸|중2|중학생 조카|돌봄|가족을 돌본|가족 사정|가족 안의 갈등|
  가족 지원|위임장 조작|투자 사기|형 빚|형의 오피스텔|형 명의|형에게 전달|
  학용품|조카 학교 알림|가족을 돕는|가족을 도운

# Early/gated evidence (root cause 2) — disclosure-policy §3.2 + §4.1 정합
spouse_evidence_truth_lexemes:
  학용품|비자금|형|조카|위임장 조작|투자 사기|개인회생|친 가족|혈육|친 혈육

# NPC S0~S2 (root cause 3) — disclosure-policy §3.3 + §4.1 paraphrase 정합
spouse_npc_S0S2_lexemes:
  가족을 돕는 일이 급|돌봐 드|생필품을 사다|가족을 돕는|빚 대신|따로 모은 돈|
  몰래 마련한 돈|어린 친척|친 가족|혈육|혈육이 다른

# Korean polish (root cause 5)
korean_polish_patterns:
  /이유은/|/때문입니다, 제가/|/그 가족라는/|/X을 ~하는 것 → X을 ~한 것 형태/
```

**검출 명령 영역**:
```bash
# Gate 재실행 영역 (root cause 1/2/3/4 영역 0건 영역 본질)
node scripts/qa-runtime-gate.cjs

# disclosure-policy §13 audit 패턴 영역 광범위 영역 검출 영역 (Codex-Dev 결정 영역)
# (Tier 2 wrapper 영역 부재 영역 영역 grep 영역 영역 본질)
```

---

## 9. 후속 영역

본 patch 영역 영역 closure 영역 후 CT-Main 영역 후속:
1. Phase B (family-01 / friend-01 통합 patch) 영역 사용자 결정 영역 후 진입
   - family-01 영역 = Audit 9 findings (P0 5 / P1 3 / P2 1)
   - friend-01 영역 = Audit 7 findings (P0 4 / P1 3 / P2 1)
2. Domain 4 Manual QA (사용자 직접) 결과 review
3. 자유 질문 / LLM spot 재검증

---

**시작 영역**: 진입 조건 검사 → HEAD `90a9130` 또는 그 후 영역 확인 → 정독 → Phase A (사전 audit + 동형 검출 + spike + 9차원 의미 정확성 spike) → CT-Main 보고 → Phase B 보정 → Phase C 검증 + 새 anchor v3 + commit + push → Phase D Gate 재실행 + CT-Main 보고.
